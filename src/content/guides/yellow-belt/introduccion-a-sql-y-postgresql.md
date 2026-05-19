---
title: "Introducción a SQL y PostgreSQL"
description: "El lenguaje para hablar con bases de datos relacionales: consultas, inserciones, joins y diseño de tablas con PostgreSQL."
belt: yellow-belt
tags: [sql, postgresql, base-de-datos, queries, backend]
order: 10
published: true
lastRevision: "2026-05-19"
---

Las aplicaciones sin datos son como libros sin palabras. Todo lo que construyes — una API, una web, una app — necesita guardar y recuperar información. Y la forma más robusta, probada y eficiente de hacerlo es con una **base de datos relacional** y **SQL**.

En esta guía vas a aprender SQL desde cero usando **PostgreSQL**, la base de datos open source más avanzada del mundo.

---

## ¿Qué es una base de datos relacional?

Una base de datos relacional organiza datos en **tablas** con filas y columnas. Cada tabla representa una entidad (usuarios, productos, pedidos) y las tablas se conectan entre sí mediante **relaciones**.

```
Tabla: usuarios
┌────┬──────────┬───────────────────┬────────────┐
│ id │ nombre   │ email             │ creado_en  │
├────┼──────────┼───────────────────┼────────────┤
│ 1  │ Ada      │ ada@ejemplo.com   │ 2026-01-15 │
│ 2  │ Alan     │ alan@ejemplo.com  │ 2026-02-20 │
│ 3  │ Grace    │ grace@ejemplo.com │ 2026-03-10 │
└────┴──────────┴───────────────────┴────────────┘
```

**SQL** (Structured Query Language) es el lenguaje para consultar y manipular estos datos.

---

## Instalar PostgreSQL

### macOS
```bash
brew install postgresql@17
brew services start postgresql@17
```

### Linux (Ubuntu)
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows
Descarga el instalador desde [postgresql.org](https://www.postgresql.org/download/windows/).

### Conectar
```bash
psql -U postgres
```

---

## Crear tu primera base de datos y tabla

```sql
-- Crear una base de datos
CREATE DATABASE mi_app;

-- Conectar a la base de datos
\c mi_app

-- Crear una tabla
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    edad INTEGER CHECK (edad >= 0),
    creado_en TIMESTAMP DEFAULT NOW()
);
```

### Tipos de datos comunes

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `SERIAL` | Entero auto-incremental | `id SERIAL PRIMARY KEY` |
| `VARCHAR(n)` | Texto de longitud máxima | `nombre VARCHAR(100)` |
| `TEXT` | Texto sin límite | `descripcion TEXT` |
| `INTEGER` | Entero | `edad INTEGER` |
| `DECIMAL(10,2)` | Número decimal | `precio DECIMAL(10,2)` |
| `BOOLEAN` | Verdadero/falso | `activo BOOLEAN` |
| `TIMESTAMP` | Fecha y hora | `creado_en TIMESTAMP` |
| `DATE` | Solo fecha | `fecha_nacimiento DATE` |
| `UUID` | Identificador único | `id UUID DEFAULT gen_random_uuid()` |

### Restricciones (constraints)

| Restricción | Qué hace |
|-------------|----------|
| `PRIMARY KEY` | Identificador único, no nulo |
| `NOT NULL` | El campo no puede ser nulo |
| `UNIQUE` | El valor no puede repetirse |
| `CHECK` | Valida una condición |
| `DEFAULT` | Valor por defecto |
| `REFERENCES` | Foreign key a otra tabla |

---

## CRUD con SQL

### CREATE: insertar datos

```sql
-- Insertar una fila
INSERT INTO usuarios (nombre, email, edad)
VALUES ('Ada Lovelace', 'ada@ejemplo.com', 36);

-- Insertar múltiples filas
INSERT INTO usuarios (nombre, email, edad) VALUES
    ('Alan Turing', 'alan@ejemplo.com', 41),
    ('Grace Hopper', 'grace@ejemplo.com', 85);

-- Devolver la fila insertada
INSERT INTO usuarios (nombre, email)
VALUES ('Tim Berners-Lee', 'tim@ejemplo.com')
RETURNING *;
```

### READ: consultar datos

```sql
-- Todos los registros
SELECT * FROM usuarios;

-- Columnas específicas
SELECT nombre, email FROM usuarios;

-- Con filtro
SELECT * FROM usuarios WHERE edad > 30;

-- Con orden
SELECT * FROM usuarios ORDER BY nombre ASC;
SELECT * FROM usuarios ORDER BY creado_en DESC;

-- Limitar resultados
SELECT * FROM usuarios LIMIT 10;

-- Paginación
SELECT * FROM usuarios LIMIT 10 OFFSET 20;  -- Página 3 (de 10)

-- Búsqueda con LIKE
SELECT * FROM usuarios WHERE nombre LIKE '%Ada%';

-- Valores únicos
SELECT DISTINCT edad FROM usuarios;

-- Contar registros
SELECT COUNT(*) FROM usuarios;
SELECT COUNT(*) FROM usuarios WHERE edad > 30;

-- Agrupar y agregar
SELECT edad, COUNT(*) as cantidad
FROM usuarios
GROUP BY edad
ORDER BY cantidad DESC;
```

### UPDATE: modificar datos

```sql
-- Actualizar con condición
UPDATE usuarios
SET edad = 37
WHERE nombre = 'Ada Lovelace';

-- Actualizar múltiples campos
UPDATE usuarios
SET nombre = 'Ada King', edad = 37
WHERE email = 'ada@ejemplo.com';

-- Devolver la fila actualizada
UPDATE usuarios
SET activo = true
WHERE id = 1
RETURNING *;
```

**⚠️ Siempre usa `WHERE` en UPDATE.** Sin `WHERE`, actualizas TODAS las filas.

### DELETE: eliminar datos

```sql
-- Eliminar con condición
DELETE FROM usuarios WHERE id = 3;

-- Eliminar todos (cuidado)
DELETE FROM usuarios;

-- Devolver la fila eliminada
DELETE FROM usuarios WHERE id = 2
RETURNING *;
```

**⚠️ Siempre usa `WHERE` en DELETE.** Sin `WHERE`, borras TODA la tabla.

---

## JOINS: conectar tablas

```sql
-- Tabla de artículos
CREATE TABLE articulos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT,
    autor_id INTEGER REFERENCES usuarios(id),
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Insertar artículos
INSERT INTO articulos (titulo, contenido, autor_id) VALUES
    ('Mi primer artículo', 'Contenido...', 1),
    ('Aprendiendo SQL', 'Contenido...', 1),
    ('Guía de PostgreSQL', 'Contenido...', 2);
```

### INNER JOIN: solo coincidencias

```sql
-- Artículos con su autor
SELECT articulos.titulo, usuarios.nombre as autor
FROM articulos
INNER JOIN usuarios ON articulos.autor_id = usuarios.id;

-- Resultado:
┌─────────────────────┬───────────────┐
│ titulo              │ autor         │
├─────────────────────┼───────────────┤
│ Mi primer artículo  │ Ada Lovelace  │
│ Aprendiendo SQL     │ Ada Lovelace  │
│ Guía de PostgreSQL  │ Alan Turing   │
└─────────────────────┴───────────────┘
```

### LEFT JOIN: todos los de la izquierda + coincidencias

```sql
-- Todos los usuarios, incluso si no tienen artículos
SELECT usuarios.nombre, articulos.titulo
FROM usuarios
LEFT JOIN articulos ON usuarios.id = articulos.autor_id;

-- Resultado:
┌───────────────┬─────────────────────┐
│ nombre        │ titulo              │
├───────────────┼─────────────────────┤
│ Ada Lovelace  │ Mi primer artículo  │
│ Ada Lovelace  │ Aprendiendo SQL     │
│ Alan Turing   │ Guía de PostgreSQL  │
│ Grace Hopper  │ NULL                │
└───────────────┴─────────────────────┘
```

### COUNT con JOIN

```sql
-- Cantidad de artículos por autor
SELECT usuarios.nombre, COUNT(articulos.id) as total
FROM usuarios
LEFT JOIN articulos ON usuarios.id = articulos.autor_id
GROUP BY usuarios.nombre;
```

---

## Índices: hacer las consultas rápidas

```sql
-- Crear un índice
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_articulos_autor ON articulos(autor_id);

-- Índice compuesto
CREATE INDEX idx_articulos_autor_fecha ON articulos(autor_id, creado_en DESC);
```

Los índices aceleran las consultas pero ralentizan las inserciones. Indexa las columnas que usas frecuentemente en `WHERE`, `JOIN` y `ORDER BY`.

---

## Transacciones: todo o nada

```sql
BEGIN;

UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;

COMMIT;  -- Confirma ambos cambios
-- o
ROLLBACK;  -- Deshace todo si algo falló
```

Las transacciones garantizan que múltiples operaciones se ejecutan **todas o ninguna**. Esencial para operaciones financieras y cualquier dato que deba mantenerse consistente.

---

## Un poco de historia: de Edgar Codd a PostgreSQL

![Ilustración de Edgar Codd con su modelo relacional de fondo mostrando tablas conectadas, junto a una imagen del grupo de Berkeley que creó Postgres](/content/guides/introduccion-a-sql-y-postgresql/01-edgar-codd-postgres.png)

*Edgar Codd: el padre del modelo relacional que revolucionó el manejo de datos.*

En **1970**, **Edgar Codd**, investigador de IBM, publicó *"A Relational Model of Data for Large Shared Data Banks"*. Antes de Codd, las bases de datos eran jerárquicas o en red — estructuras rígidas y complejas. Codd propuso organizar datos en **tablas relacionales**, un concepto tan simple como revolucionario.

IBM no vio el potencial inmediatamente. Fueron otros quienes construyeron las primeras bases de datos relacionales comerciales: **Oracle** (1979) y **Ingres** en UC Berkeley (1977).

**PostgreSQL** nació de Ingres. En **1986**, **Michael Stonebraker** y su equipo en Berkeley empezaron un proyecto post-Ingres que agregara tipos de datos personalizados y reglas. Lo llamaron **Postgres**. En **1996**, le agregaron SQL y lo renombraron **PostgreSQL**.

Hoy PostgreSQL es considerada la base de datos open source más avanzada: soporta JSON, full-text search, geospatial (PostGIS), y es la elección por defecto para startups y empresas modernas.

---

## Por qué importa

SQL es una de las habilidades más duraderas en tecnología:

- **Universal:** casi toda aplicación seria usa una base de datos relacional.
- **Estable:** SQL tiene 50+ años y sigue siendo relevante.
- **Poderoso:** consultas complejas que en código requerían cientos de líneas.
- **Transferible:** lo que aprendes en PostgreSQL aplica a MySQL, SQLite, SQL Server.

Un programador que sabe SQL tiene una ventaja enorme sobre uno que solo sabe código.

---

## La IA y SQL

### Lo bueno

- **Generar queries:** describe lo que necesitas y la IA escribe el SQL.
- **Explicar queries complejos:** pega un JOIN múltiple y la IA lo explica paso a paso.
- **Optimizar queries:** la IA sugiere índices y reestructuraciones.
- **Convertir entre dialectos:** PostgreSQL → MySQL → SQLite.

### Lo que no debes hacer

- **No ejecutes queries generadas por IA en producción sin revisar.** Un `DELETE` sin `WHERE` es catastrófico.
- **No confíes en queries complejos sin entenderlos.** Si no entiendes el JOIN, no lo uses.
- **No expongas queries directamente al usuario.** Siempre usa parámetros para evitar SQL injection.

---

## Desafío: tu primera base de datos

**Objetivo:** crear y consultar una base de datos de biblioteca.

**Tu tarea:**

1. Crea una base de datos `biblioteca`
2. Crea las tablas:
   - `autores`: id, nombre, nacionalidad, fecha_nacimiento
   - `libros`: id, titulo, isbn, año_publicacion, autor_id (FK), disponible (boolean)
   - `prestamos`: id, libro_id (FK), usuario_nombre, fecha_prestamo, fecha_devolucion
3. Inserta al menos 5 autores y 10 libros
4. Responde estas consultas:
   - ¿Cuántos libros hay por autor?
   - ¿Qué libros están disponibles?
   - ¿Qué autor tiene más libros?
   - ¿Cuáles préstamos están activos (sin fecha_devolucion)?
5. Crea índices para las búsquedas más comunes

**Bonus:** escribe una consulta que devuelva un reporte con: nombre del autor, título del libro, y estado (disponible/prestado).

---

## Para seguir explorando

- **[PostgreSQL Documentation](https://www.postgresql.org/docs/)** — docs oficiales, excelentes.
- **[SQLBolt](https://sqlbolt.com/)** — tutorial interactivo de SQL.
- **[Use The Index, Luke!](https://use-the-index-luke.com/)** — guía práctica de índices.
- **[PgExercises](https://pgexercises.com/)** — ejercicios de PostgreSQL.

---

## Resumen

- **SQL** es el lenguaje para consultar bases de datos relacionales.
- **PostgreSQL** es la base de datos open source más avanzada, creada a partir de Postgres en Berkeley (1986).
- El **modelo relacional** fue propuesto por **Edgar Codd** en 1970.
- **CRUD:** INSERT (crear), SELECT (leer), UPDATE (modificar), DELETE (eliminar).
- **JOINs** conectan tablas: INNER JOIN (coincidencias), LEFT JOIN (todos + coincidencias).
- **Índices** aceleran consultas pero ralentizan inserciones.
- **Transacciones** (BEGIN/COMMIT/ROLLBACK) garantizan consistencia: todo o nada.
- Siempre usa `WHERE` en UPDATE y DELETE para no afectar toda la tabla.

En la próxima guía vamos a conectar todo: **Conectando tu API a una base de datos** — cómo tu backend de Hono habla con PostgreSQL.
