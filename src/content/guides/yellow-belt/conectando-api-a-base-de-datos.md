---
title: "Conectando tu API a una base de datos"
description: "Deja los arrays en memoria: conecta tu API de Hono a PostgreSQL y haz que los datos persistan de verdad."
belt: yellow-belt
tags: [api, postgresql, database, hono, backend, practica]
order: 11
published: true
lastRevision: "2026-05-19"
---

Hasta ahora tu API guarda datos en arrays en memoria. Funciona para probar, pero cuando reinicias el servidor, todo se pierde. Es hora de conectar tu API a una base de datos real para que los datos persistan.

En esta guía vas a conectar tu API de Hono a PostgreSQL usando consultas SQL directas, sin ORM. Entenderás qué pasa por debajo antes de abstraer con herramientas como Prisma.

---

## ¿Por qué sin ORM primero?

Los ORMs (como Prisma) son geniales, pero esconden lo que realmente pasa. Si nunca escribiste SQL a mano, no entiendes qué hace el ORM por ti. Vamos a hacer la conexión directa primero para que:

- Entienda cómo funciona un **pool de conexiones**
- Veas cómo se **parametrizan** las queries (SQL injection)
- Comprendas el **mapeo** entre filas de la BD y objetos de JavaScript
- Aprecies lo que un ORM hace por ti después

---

## Setup del proyecto

```bash
mkdir api-con-db && cd api-con-db
pnpm init
pnpm add hono @hono/node-server
pnpm add -D typescript @types/node tsx

# Driver de PostgreSQL para Node.js
pnpm add postgres
```

`postgres` es un cliente ligero y moderno para PostgreSQL desde Node.js.

### Configurar la base de datos

```sql
-- En psql:
CREATE DATABASE api_tareas;
\c api_tareas

CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT DEFAULT '',
    completada BOOLEAN DEFAULT false,
    creada_en TIMESTAMP DEFAULT NOW()
);
```

### Variables de entorno

```
# .env
DATABASE_URL=postgres://postgres:password@localhost:5432/api_tareas
PORT=3000
```

---

## Conectar a la base de datos

```typescript
// src/db.ts
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
    max: 10,  // Máximo 10 conexiones en el pool
    idle_timeout: 20,  // Cerrar conexiones inactivas después de 20s
});

export default sql;
```

Un **pool de conexiones** mantiene varias conexiones abiertas y las reutiliza. Crear una conexión nueva para cada consulta es lento. El pool las mantiene listas.

---

## Implementar el CRUD con SQL

```typescript
// src/index.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import sql from "./db";

const app = new Hono();
app.use("/*", cors());

// GET /tareas — listar todas
app.get("/tareas", async (c) => {
    const completada = c.req.query("completada");

    let query = "SELECT * FROM tareas";
    let params: any[] = [];

    if (completada !== undefined) {
        query += " WHERE completada = $1";
        params.push(completada === "true");
    }

    query += " ORDER BY creada_en DESC";

    const tareas = await sql.unsafe(query, params);
    return c.json({ datos: tareas, total: tareas.length });
});

// GET /tareas/:id — obtener una
app.get("/tareas/:id", async (c) => {
    const id = parseInt(c.req.param("id"));

    const [tarea] = await sql`SELECT * FROM tareas WHERE id = ${id}`;

    if (!tarea) {
        return c.json({ error: "Tarea no encontrada" }, 404);
    }

    return c.json(tarea);
});

// POST /tareas — crear
app.post("/tareas", async (c) => {
    const body = await c.req.json();

    if (!body.titulo?.trim()) {
        return c.json({ error: "El título es obligatorio" }, 400);
    }

    const [nueva] = await sql`
        INSERT INTO tareas (titulo, descripcion)
        VALUES (${body.titulo.trim()}, ${body.descripcion || ""})
        RETURNING *
    `;

    return c.json(nueva, 201);
});

// PATCH /tareas/:id — actualizar
app.patch("/tareas/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();

    // Verificar que existe
    const [existente] = await sql`SELECT id FROM tareas WHERE id = ${id}`;
    if (!existente) {
        return c.json({ error: "Tarea no encontrada" }, 404);
    }

    // Construir update dinámico
    const campos: string[] = [];
    const valores: any[] = [];
    let paramIndex = 1;

    if (body.titulo !== undefined) {
        campos.push(`titulo = $${paramIndex++}`);
        valores.push(body.titulo.trim());
    }
    if (body.descripcion !== undefined) {
        campos.push(`descripcion = $${paramIndex++}`);
        valores.push(body.descripcion);
    }
    if (body.completada !== undefined) {
        campos.push(`completada = $${paramIndex++}`);
        valores.push(body.completada);
    }

    if (campos.length === 0) {
        return c.json({ error: "No hay campos para actualizar" }, 400);
    }

    valores.push(id);
    const query = `UPDATE tareas SET ${campos.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    const [actualizada] = await sql.unsafe(query, valores);

    return c.json(actualizada);
});

// DELETE /tareas/:id — eliminar
app.delete("/tareas/:id", async (c) => {
    const id = parseInt(c.req.param("id"));

    const result = await sql`DELETE FROM tareas WHERE id = ${id}`;

    if (result.count === 0) {
        return c.json({ error: "Tarea no encontrada" }, 404);
    }

    return c.body(null, 204);
});

serve({ fetch: app.fetch, port: parseInt(process.env.PORT || "3000") }, () => {
    console.log("API con base de datos corriendo en http://localhost:3000");
});

export default app;
```

---

## SQL parametrizado vs template literals

El paquete `postgres` ofrece dos formas de escribir queries:

### Template literals (tagged template)

```typescript
const tareas = await sql`SELECT * FROM tareas WHERE id = ${id}`;
```

El paquete automáticamente **parametriza** los valores. `${id}` se convierte en `$1` y el valor se envía por separado. Esto previene **SQL injection**.

### unsafe() con parámetros

```typescript
const tareas = await sql.unsafe("SELECT * FROM tareas WHERE id = $1", [id]);
```

Útil cuando necesitas construir queries dinámicas (como el PATCH de arriba).

### SQL injection: el peligro

```typescript
// ❌ PELIGROSO: concatenar strings directamente
const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
// Si email = "'; DROP TABLE usuarios; --"
// El query se convierte en: SELECT * FROM usuarios WHERE email = ''; DROP TABLE usuarios; --'

// ✅ SEGURO: siempre parametrizar
const usuarios = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
// El valor se envía como parámetro, no como parte del SQL
```

---

## Manejo de errores de base de datos

```typescript
try {
    const [tarea] = await sql`INSERT INTO tareas (titulo) VALUES (${titulo}) RETURNING *`;
} catch (error: any) {
    if (error.code === "23505") {
        // Unique violation
        return c.json({ error: "Ya existe una tarea con ese título" }, 409);
    }
    if (error.code === "23503") {
        // Foreign key violation
        return c.json({ error: "El recurso referenciado no existe" }, 400);
    }
    console.error("Error de base de datos:", error);
    return c.json({ error: "Error interno del servidor" }, 500);
}
```

Los **códigos de error** de PostgreSQL siguen el estándar SQLSTATE:
- `23505`: unique_violation
- `23503`: foreign_key_violation
- `23502`: not_null_violation
- `22P02`: invalid_text_representation

---

## Migraciones: versionar tu esquema

Las **migraciones** son archivos SQL que versionan los cambios en tu base de datos:

```
migrations/
├── 001_create_tareas.sql
├── 002_add_categoria_to_tareas.sql
└── 003_create_usuarios.sql
```

```sql
-- 001_create_tareas.sql
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT DEFAULT '',
    completada BOOLEAN DEFAULT false,
    creada_en TIMESTAMP DEFAULT NOW()
);

-- 002_add_categoria_to_tareas.sql
ALTER TABLE tareas ADD COLUMN categoria VARCHAR(50) DEFAULT 'general';
CREATE INDEX idx_tareas_categoria ON tareas(categoria);
```

Para ejecutar migraciones, usa herramientas como `node-pg-migrate` o `drizzle-kit`.

---

## Por qué importa

Conectar una API a una base de datos es la habilidad central del backend:

- **Persistencia:** los datos sobreviven reinicios del servidor
- **Consultas complejas:** SQL puede hacer en una línea lo que en código serían cientos
- **Concurrencia:** la BD maneja múltiples usuarios accediendo datos simultáneamente
- **Integridad:** constraints y transacciones protegen la consistencia de los datos

---

## La IA y bases de datos

### Lo bueno

- **Generar queries SQL:** describe lo que necesitas y la IA escribe la consulta.
- **Crear migraciones:** la IA genera el SQL para alterar tablas.
- **Optimizar queries:** la IA sugiere índices y reestructuraciones.
- **Debuggear errores:** pega el error de PostgreSQL y la IA lo explica.

### Lo que no debes hacer

- **No ejecutes migraciones en producción sin revisarlas.** Un `DROP COLUMN` es irreversible sin backup.
- **No uses queries sin parametrizar.** SQL injection es una de las vulnerabilidades más comunes.
- **No confíes en ORMs generados por IA sin entender las queries que generan.**

---

## Desafío: conecta tu API

**Objetivo:** migrar tu API de tareas de arrays en memoria a PostgreSQL.

**Tu tarea:**

1. Instala PostgreSQL y crea una base de datos `api_tareas`
2. Crea la tabla `tareas` con el SQL de arriba
3. Instala el paquete `postgres` y conecta tu API
4. Reemplaza todos los arrays por consultas SQL
5. Agrega manejo de errores para códigos SQLSTATE
6. Prueba todos los endpoints con curl o Bruno

**Bonus:** agrega una tabla `categorias` y una relación 1:N desde tareas. Modifica los endpoints para filtrar tareas por categoría.

---

## Para seguir explorando

- **[postgres npm package](https://github.com/porsager/postgres)** — documentación del cliente.
- **[PostgreSQL Error Codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)** — referencia de SQLSTATE.
- **[SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)** — OWASP cheat sheet.

---

## Resumen

- Conectar una API a PostgreSQL requiere un **driver** (`postgres`) y una **connection string**.
- Un **pool de conexiones** reutiliza conexiones abiertas para mejor performance.
- Las queries **parametrizadas** (`sql\`SELECT * WHERE id = ${id}\``) previenen SQL injection.
- Nunca concatenes valores del usuario directamente en un query SQL.
- Los **códigos de error SQLSTATE** (23505, 23503, etc.) permiten manejar errores específicos de la BD.
- Las **migraciones** versionan los cambios en el esquema de la base de datos.
- Entender SQL directo antes de usar un ORM te da una base sólida para debuggear y optimizar.

En la próxima guía vamos a aprender a documentar APIs: **Documentación de APIs con Bruno** — cómo probar y documentar tus endpoints de forma profesional.
