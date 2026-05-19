---
title: "Next.js: rendering en el servidor y arquitecturas híbridas"
description: "SSR, SSG, ISR, RSC: los modos de rendering de Next.js y cuándo usar cada uno."
belt: black-belt
tags: [nextjs, ssr, ssg, rendering, react, servidor]
order: 4
published: true
lastRevision: "2026-05-19"
---

React renderiza en el cliente. Next.js te da opciones: renderizar en el servidor, en build time, o híbrido. Cada modo tiene trade-offs de performance, SEO y complejidad.

En esta guía vas a entender los modos de rendering de Next.js 15 (App Router) y elegir el correcto para cada caso.

---

## Setup

```bash
pnpm create next-app@latest mi-app
# React 19, App Router, TypeScript
```

---

## Modos de rendering

### 1. Server Components (default)

```tsx
// app/page.tsx — Server Component por defecto
export default async function Page() {
    const data = await fetch("https://api.ejemplo.com/data");
    const json = await data.json();

    return <h1>{json.title}</h1>;
}
```

Los Server Components se ejecutan en el servidor. No envían JS al cliente. Pueden hacer fetch directo.

### 2. Client Components

```tsx
"use client";  // Directiva al inicio

import { useState } from "react";

export default function Contador() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

Necesitan `"use client"` para usar hooks, eventos o estado.

### 3. Static (SSG) — default

```tsx
// Se genera en build time
export default function Page() {
    return <h1>Página estática</h1>;
}
```

Sin `fetch` dinámico, Next.js genera HTML estático en build time.

### 4. Dynamic (SSR)

```tsx
// app/page.tsx
export const dynamic = "force-dynamic";

export default async function Page() {
    const data = await fetch("https://api.ejemplo.com/data", {
        cache: "no-store",  // No cachear
    });
    // Se ejecuta en cada request
}
```

### 5. ISR (Incremental Static Regeneration)

```tsx
export default async function Page() {
    const data = await fetch("https://api.ejemplo.com/data", {
        next: { revalidate: 60 },  // Regenerar cada 60 segundos
    });
    // ...
}
```

HTML estático que se regenera periódicamente.

---

## Cuándo usar cada modo

| Modo | Cuándo | Ejemplo |
|------|--------|---------|
| **Static** | Contenido que no cambia | Blog, docs, landing pages |
| **SSR** | Datos en tiempo real | Dashboard, feed personalizado |
| **ISR** | Contenido que cambia poco | Catálogo de productos, noticias |
| **Client** | Interactividad | Formularios, animaciones, estado |

---

## Por qué importa

Elegir el modo de rendering correcto afecta performance, SEO y costo de servidor.

---

## La IA y Next.js

### Lo bueno
- **Generar componentes:** la IA crea Server y Client Components correctamente.
- **Sugerir modo de rendering:** describe tu caso y la IA recomienda el modo.

### Lo que no debes hacer
- **No hagas todo Client Component.** Pierdes las ventajas del server rendering.
- **No ignores `cache` en fetches.** Sin caché, cada request consulta la API.

---

## Desafío: app con modos mixtos

**Objetivo:** crear una app Next.js con diferentes modos de rendering.

**Tu tarea:**
1. Página estática (Home)
2. Página SSR (Dashboard con datos del usuario)
3. Página ISR (Blog que se regenera cada 5 min)
4. Componente cliente (Contador interactivo)

**Bonus:** agrega streaming con Suspense boundaries.

---

## Para seguir explorar

- **[Next.js Docs](https://nextjs.org/docs)**

---

## Resumen

- **Server Components** (default): se ejecutan en servidor, no envían JS al cliente.
- **Client Components** (`"use client"`): necesitan hooks, eventos o estado.
- **Static (SSG):** genera HTML en build time.
- **Dynamic (SSR):** genera HTML en cada request.
- **ISR:** HTML estático que se regenera periódicamente.

En la próxima guía: **TSDD: Thin Spec Driven Development en la práctica** — specs antes de código.
