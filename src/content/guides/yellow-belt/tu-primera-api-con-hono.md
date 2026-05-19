---
title: "Tu primera API con Hono y TypeScript"
description: "Construye una API REST completa desde cero con Hono, el framework ligero de TypeScript que es rápido, simple y moderno."
belt: yellow-belt
tags: [hono, typescript, api, backend, practica]
order: 7
published: true
lastRevision: "2026-05-19"
---

Ya sabes qué es REST y cómo se diseñan APIs. Ahora es hora de construir una de verdad. Vamos a usar **Hono**, un framework web de TypeScript que es rápido, ligero y funciona en cualquier runtime (Node.js, Bun, Cloudflare Workers).

En esta guía vas a crear una API completa de gestión de tareas con endpoints CRUD, validación de datos y middleware, todo en TypeScript.

---

## ¿Por qué Hono?

Hono es una alternativa moderna a Express. Comparado con Express:

- **Más rápido:** hasta 3x más rápido que Express en benchmarks
- **TypeScript nativo:** tipos de primera clase, no como parche
- **Más ligero:** ~14KB vs ~300KB de Express
- **Multi-runtime:** funciona en Node.js, Bun, Deno, Cloudflare Workers, Vercel Edge
- **API familiar:** si conoces Express, Hono te resulta inmediato

---

## Setup del proyecto

```bash
# Crear proyecto
mkdir api-tareas && cd api-tareas
pnpm init

# Instalar dependencias
pnpm add hono
pnpm add -D typescript @types/node tsx

# Inicializar TypeScript
pnpm exec tsc --init
```

Configura `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

Agrega scripts al `package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

`tsx` es un ejecutor de TypeScript que no requiere compilar primero. `tsx watch` reinicia automáticamente al cambiar el código.

---

## Tu primer endpoint

```typescript
// src/index.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
    return c.json({ mensaje: "Bienvenido a la API de tareas" });
});

app.get("/health", (c) => {
    return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
    console.log(`Servidor corriendo en http://localhost:${info.port}`);
});
```

Ejecuta:

```bash
pnpm dev
```

Abre `http://localhost:3000` en tu navegador. Deberías ver el JSON de bienvenida.

---

## Definir los tipos

```typescript
// src/types.ts
export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    completada: boolean;
    creadaEn: string;
}

export type CrearTarea = {
    titulo: string;
    descripcion?: string;
};

export type ActualizarTarea = {
    titulo?: string;
    descripcion?: string;
    completada?: boolean;
};
```

---

## Implementar el CRUD completo

```typescript
// src/index.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { Tarea, CrearTarea, ActualizarTarea } from "./types";

const app = new Hono();

// "Base de datos" en memoria
const tareas: Tarea[] = [];
let nextId = 1;

// GET /tareas — listar todas
app.get("/tareas", (c) => {
    const completada = c.req.query("completada");

    let resultado = tareas;
    if (completada !== undefined) {
        const filtro = completada === "true";
        resultado = tareas.filter(t => t.completada === filtro);
    }

    return c.json({
        datos: resultado,
        total: resultado.length,
    });
});

// GET /tareas/:id — obtener una tarea
app.get("/tareas/:id", (c) => {
    const id = parseInt(c.req.param("id"));
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return c.json({ error: "Tarea no encontrada", codigo: "TAREA_NO_ENCONTRADA" }, 404);
    }

    return c.json(tarea);
});

// POST /tareas — crear una tarea
app.post("/tareas", async (c) => {
    const body = await c.req.json<CrearTarea>();

    // Validación básica
    if (!body.titulo || body.titulo.trim().length === 0) {
        return c.json({ error: "El título es obligatorio", codigo: "TITULO_OBLIGATORIO" }, 400);
    }

    if (body.titulo.length > 100) {
        return c.json({ error: "El título no puede tener más de 100 caracteres", codigo: "TITULO_MUY_LARGO" }, 400);
    }

    const nueva: Tarea = {
        id: nextId++,
        titulo: body.titulo.trim(),
        descripcion: body.descripcion?.trim() || "",
        completada: false,
        creadaEn: new Date().toISOString(),
    };

    tareas.push(nueva);
    return c.json(nueva, 201);
});

// PATCH /tareas/:id — actualizar una tarea
app.patch("/tareas/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return c.json({ error: "Tarea no encontrada", codigo: "TAREA_NO_ENCONTRADA" }, 404);
    }

    const body = await c.req.json<ActualizarTarea>();

    if (body.titulo !== undefined) {
        if (body.titulo.trim().length === 0) {
            return c.json({ error: "El título no puede estar vacío", codigo: "TITULO_VACIO" }, 400);
        }
        tarea.titulo = body.titulo.trim();
    }

    if (body.descripcion !== undefined) {
        tarea.descripcion = body.descripcion.trim();
    }

    if (body.completada !== undefined) {
        tarea.completada = body.completada;
    }

    return c.json(tarea);
});

// DELETE /tareas/:id — eliminar una tarea
app.delete("/tareas/:id", (c) => {
    const id = parseInt(c.req.param("id"));
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
        return c.json({ error: "Tarea no encontrada", codigo: "TAREA_NO_ENCONTRADA" }, 404);
    }

    tareas.splice(index, 1);
    return c.body(null, 204);
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
    console.log(`🚀 API corriendo en http://localhost:${info.port}`);
});

export default app;
```

---

## Middleware: lógica compartida

Los **middleware** son funciones que se ejecutan antes o después de cada petición. Útiles para logging, autenticación, CORS, etc.

### Logger middleware

```typescript
// src/middleware/logger.ts
import type { MiddlewareHandler } from "hono";

export const logger: MiddlewareHandler = async (c, next) => {
    const inicio = Date.now();
    await next();
    const duracion = Date.now() - inicio;

    console.log(
        `${c.req.method} ${c.req.path} → ${c.status} (${duracion}ms)`
    );
};

// Usarlo en src/index.ts
import { logger } from "./middleware/logger";

app.use("*", logger);  // Se ejecuta en TODAS las peticiones
```

### CORS middleware

```typescript
import { cors } from "hono/cors";

app.use("/api/*", cors({
    origin: ["http://localhost:5173"],  // Tu frontend
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
}));
```

### Timing middleware

```typescript
import type { MiddlewareHandler } from "hono";

export const timing: MiddlewareHandler = async (c, next) => {
    await next();
    c.header("X-Response-Time", `${Date.now()}ms`);
};
```

---

## Estructura del proyecto

```
api-tareas/
├── src/
│   ├── index.ts              # Punto de entrada, rutas
│   ├── types.ts              # Interfaces y tipos
│   └── middleware/
│       └── logger.ts         # Middleware de logging
├── package.json
├── tsconfig.json
└── .gitignore
```

Para proyectos más grandes, separa las rutas:

```
src/
├── index.ts           # App + middleware
├── types.ts
├── routes/
│   └── tareas.ts      # Rutas de tareas
└── middleware/
    └── logger.ts
```

```typescript
// src/routes/tareas.ts
import { Hono } from "hono";
import type { Tarea } from "../types";

const router = new Hono();
const tareas: Tarea[] = [];

router.get("/", (c) => c.json(tareas));
router.post("/", async (c) => { /* ... */ });

export default router;

// src/index.ts
import tareasRouter from "./routes/tareas";

app.route("/tareas", tareasRouter);
```

---

## Probar la API con curl

```bash
# Crear tarea
curl -X POST http://localhost:3000/tareas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Aprender Hono", "descripcion": "Crear mi primera API"}'

# Listar tareas
curl http://localhost:3000/tareas

# Obtener tarea específica
curl http://localhost:3000/tareas/1

# Actualizar tarea
curl -X PATCH http://localhost:3000/tareas/1 \
  -H "Content-Type: application/json" \
  -d '{"completada": true}'

# Eliminar tarea
curl -X DELETE http://localhost:3000/tareas/1
```

---

## Por qué importa

Construir una API es la habilidad central del desarrollo backend. Hono te da:

- **Simplicidad:** menos boilerplate que Express
- **Tipos:** TypeScript nativo, no como afterthought
- **Performance:** más rápido que alternativas populares
- **Portabilidad:** el mismo código corre en Node, Bun, edge

Una vez que sabes construir una API con Hono, puedes construir cualquier servicio backend.

---

## La IA y Hono

### Lo bueno

- **Generar rutas CRUD:** describe el recurso y la IA genera el router completo.
- **Crear middleware:** la IA genera middleware de autenticación, validación, logging.
- **Convertir Express a Hono:** la IA migra código existente.
- **Generar tests:** la IA crea tests para cada endpoint.

### Lo que no debes hacer

- **No expongas la API sin CORS configurado.** La IA a veces omite CORS en ejemplos simples.
- **No uses datos en memoria para producción.** La IA usa arrays como "base de datos" para simplificar; en producción necesitas PostgreSQL, SQLite, etc.
- **No copies validación sin entenderla.** Validación incorrecta = vulnerabilidades.

---

## Desafío: extiende la API

**Objetivo:** agregar funcionalidades avanzadas a tu API de tareas.

**Tu tarea:**

1. Agrega un endpoint `GET /tareas/stats` que devuelva estadísticas:
   ```json
   { "total": 10, "completadas": 6, "pendientes": 4 }
   ```
2. Agrega paginación a `GET /tareas` con query params `?pagina=1&limite=10`
3. Agrega un middleware que rechace peticiones sin header `Content-Type: application/json` en POST/PATCH
4. Agrega un endpoint `POST /tareas/bulk` que cree múltiples tareas de una vez
5. Agrega búsqueda: `GET /tareas?q=hono` filtra tareas cuyo título o descripción contenga el texto

**Bonus:** agrega un sistema de categorías. Cada tarea puede tener una categoría (`"trabajo"`, `"personal"`, `"estudio"`). Agrega endpoints para listar tareas por categoría.

---

## Para seguir explorando

- **[Hono Documentation](https://hono.dev/docs)** — docs oficiales, excelentes.
- **[Hono GitHub](https://github.com/honojs/hono)** — código fuente y ejemplos.
- **[Awesome Hono](https://github.com/nakasyou/awesome-hono)** — lista de recursos y plugins.

---

## Resumen

- **Hono** es un framework web de TypeScript: rápido, ligero y multi-runtime.
- Se instala con `pnpm add hono` y se ejecuta con `tsx watch src/index.ts`.
- Las rutas usan métodos HTTP: `app.get()`, `app.post()`, `app.patch()`, `app.delete()`.
- `c.req.param("id")` obtiene parámetros de URL; `c.req.query("filtro")` obtiene query params.
- `c.json(datos, status)` devuelve JSON con status code.
- Los **middleware** se agregan con `app.use("*", middleware)` y se ejecutan en cada petición.
- Para proyectos grandes, separa rutas en archivos con `router.route("/path", subRouter)`.
- **CORS** se configura con `hono/cors` para permitir peticiones desde el frontend.

En la próxima guía vamos a aprender a manejar datos estructurados: **JSON y manejo de datos** — el formato universal de la web moderna.
