---
title: "ORMs con Prisma: tu base de datos en TypeScript"
description: "Type-safe database queries sin escribir SQL a mano: modelos, migraciones, relaciones y queries complejas con Prisma ORM."
belt: green-belt
tags: [prisma, orm, typescript, database, postgresql]
order: 9
published: true
lastRevision: "2026-05-19"
---

Escribir SQL a mano es poderoso pero propenso a errores: typos en columnas, joins incorrectos, SQL injection si no parametrizas bien. **Prisma** es un ORM que te da queries type-safe con autocompletado, migraciones automáticas y un schema declarativo.

En esta guía vas a configurar Prisma con PostgreSQL, definir modelos, crear migraciones y hacer queries complejas con total type safety.

---

## Setup

```bash
pnpm add prisma @prisma/client
pnpm exec prisma init
```

```
# .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/api_tareas?schema=public"
```

---

## Schema

```prisma
// prisma/schema.prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

model Usuario {
    id        Int      @id @default(autoincrement())
    nombre    String   @db.VarChar(100)
    email     String   @unique
    password  String   @db.VarChar(255)
    createdAt DateTime @default(now())
    tareas    Tarea[]
}

model Tarea {
    id          Int      @id @default(autoincrement())
    titulo      String   @db.VarChar(200)
    descripcion String?  @db.Text
    completada  Boolean  @default(false)
    createdAt   DateTime @default(now())
    autorId     Int
    autor       Usuario  @relation(fields: [autorId], references: [id])
    categoriaId Int?
    categoria   Categoria? @relation(fields: [categoriaId], references: [id])
}

model Categoria {
    id      Int     @id @default(autoincrement())
    nombre  String  @unique
    tareas  Tarea[]
}
```

---

## Migraciones

```bash
pnpm exec prisma migrate dev --name init
```

Esto crea la migración SQL y la ejecuta en tu base de datos.

---

## Queries type-safe

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Crear
const usuario = await prisma.usuario.create({
    data: { nombre: "Ada", email: "ada@ejemplo.com", password: "hashed123" },
});

// Leer
const tareas = await prisma.tarea.findMany({
    where: { completada: false },
    include: { autor: true, categoria: true },
    orderBy: { createdAt: "desc" },
    take: 20,
});

// Actualizar
await prisma.tarea.update({
    where: { id: 1 },
    data: { completada: true },
});

// Eliminar
await prisma.tarea.delete({ where: { id: 1 } });

// Query compleja con relaciones
const stats = await prisma.usuario.findMany({
    select: {
        nombre: true,
        _count: { select: { tareas: true } },
    },
    orderBy: { tareas: { _count: "desc" } },
});
```

El autocompletado de TypeScript sabe exactamente qué campos existen, sus tipos y las relaciones disponibles.

---

## Por qué importa

Prisma elimina errores de SQL, da autocompletado para toda tu base de datos y hace las migraciones triviales.

---

## La IA y Prisma

### Lo bueno
- **Generar modelos:** describe tus entidades y la IA genera el schema.prisma.
- **Crear queries complejas:** la IA genera includes, selects y filters.

### Lo que no debes hacer
- **No ignores N+1 queries.** Prisma puede generar queries ineficientes con includes anidados.
- **No uses Prisma para queries analíticas complejas.** SQL directo es mejor para agregaciones pesadas.

---

## Desafío: modela tu BD con Prisma

**Objetivo:** definir el schema de Prisma para tu app.

**Tu tarea:**
1. Define modelos para Usuario, Tarea y Categoria con relaciones
2. Genera y ejecuta la migración
3. Implementa CRUD con Prisma Client
4. Crea una query que devuelva usuarios con count de tareas

**Bonus:** agrega transacciones con `prisma.$transaction`.

---

## Para seguir explorando

- **[Prisma Docs](https://www.prisma.io/docs)**

---

## Resumen

- **Prisma** es un ORM type-safe con schema declarativo y migraciones automáticas.
- El **schema.prisma** define modelos, tipos y relaciones.
- **`prisma migrate dev`** crea y ejecuta migraciones.
- Las queries son **type-safe**: autocompletado para campos, tipos y relaciones.
- **`include`** carga relaciones; **`select`** elige campos específicos.

En la próxima guía: **Arquitectura cliente–servidor en la práctica** — cómo se comunican frontend y backend realmente.
