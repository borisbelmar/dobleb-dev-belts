---
title: "Arquitectura monolítica: cuándo y cómo"
description: "Un solo deploy para todo tu stack: frontend, backend y base de datos juntos. Simple, efectivo y subestimado."
belt: green-belt
tags: [monolito, arquitectura, deployment, backend, frontend]
order: 11
published: true
lastRevision: "2026-05-19"
---

No necesitas microservicios. No necesitas Kubernetes. No necesitas 15 repositorios. Para el 95% de los proyectos, un **monolito** bien organizado es la mejor arquitectura.

En esta guía vas a aprender a construir un monolito que sirva frontend y backend juntos, con estructura clara y deployment simple.

---

## ¿Qué es un monolito?

Un monolito es una aplicación donde **todo vive en un solo proceso**: frontend, backend, lógica de negocio, acceso a datos.

```
mi-app/
├── src/
│   ├── client/          # React frontend
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── server/          # Hono backend
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   └── shared/          # Tipos compartidos
│       └── types.ts
├── package.json
└── vite.config.ts
```

---

## Servir frontend desde el backend

```typescript
// src/server/index.ts
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// API routes
app.route("/api", apiRouter);

// Frontend static files (producción)
app.use("/*", serveStatic({ root: "./dist/client" }));
app.use("/favicon.ico", serveStatic({ path: "./dist/client/favicon.ico" }));

export default app;
```

En desarrollo, Vite sirve el frontend en `:5173` y Hono el backend en `:3000`. En producción, el build de React va a `dist/client/` y Hono lo sirve como archivos estáticos.

---

## Tipos compartidos

```typescript
// src/shared/types.ts
export interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
}

export type CrearTarea = Omit<Tarea, "id">;
```

```typescript
// Frontend usa los mismos tipos
import type { Tarea } from "../shared/types";

// Backend usa los mismos tipos
import type { Tarea } from "../shared/types";
```

Si cambias un tipo, se rompe en ambos lados — y TypeScript te avisa.

---

## Ventajas del monolito

- **Deploy simple:** un solo `git push`, un solo build, un solo servidor
- **Debugging fácil:** un solo log, un solo proceso
- **Tipos compartidos:** frontend y backend comparten interfaces
- **Testing fácil:** un solo proyecto para testear
- **Costo bajo:** un solo servidor, sin infraestructura compleja

---

## Cuándo salir del monolito

- **Equipos grandes:** más de 10 desarrolladores trabajando en áreas independientes
- **Escalas masivas:** millones de requests por segundo
- **Tecnologías diferentes:** partes del sistema necesitan lenguajes distintos

Si no estás en estos casos, quédate en el monolito.

---

## Por qué importa

El monolito es la arquitectura más subestimada. La mayoría de los proyectos se benefician de su simplicidad.

---

## La IA y monolitos

### Lo bueno
- **Estructurar proyectos:** la IA sugiere organización de carpetas para monolitos.
- **Generar boilerplate:** la IA crea la estructura base con frontend + backend.

### Lo que no debes hacer
- **No mezcles responsabilidades.** Mantén client/ y server/ separados aunque estén en el mismo repo.
- **No expongas tipos internos del servidor al cliente.** Solo comparte lo necesario.

---

## Desafío: monolito fullstack

**Objetivo:** crear una app monolítica con React + Hono + Prisma.

**Tu tarea:**
1. Estructura el proyecto con client/, server/ y shared/
2. Configura Vite para el frontend y Hono para el backend
3. Comparte tipos entre ambos
4. Configura el build de producción para servir el frontend desde Hono

**Bonus:** agrega un script `pnpm dev` que levante ambos simultáneamente.

---

## Para seguir explorando

- **[Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)** — artículo de Martin Fowler.

---

## Resumen

- **Monolito:** todo en un solo proceso — frontend, backend, datos.
- **Ventajas:** deploy simple, debugging fácil, tipos compartidos, costo bajo.
- **Sirve el frontend como archivos estáticos** desde el backend en producción.
- **Tipos compartidos** entre client y server con TypeScript.
- La mayoría de los proyectos no necesitan microservicios.

En la próxima guía: **Patrones N-Layer y Repository** — organización de código backend profesional.
