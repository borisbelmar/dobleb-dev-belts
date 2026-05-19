---
title: "Astro: sitios rápidos con JavaScript mínimo"
description: "El framework para sitios de contenido: HTML puro al cliente, JavaScript solo donde lo necesitas."
belt: green-belt
tags: [astro, frontend, ssr, performance, static]
order: 13
published: true
lastRevision: "2026-05-19"
---

React envía kilobytes de JavaScript al navegador incluso para una página estática. **Astro** hace lo contrario: envía HTML puro y cero JavaScript por defecto. Solo agrega JS cuando necesitas interactividad, y solo para ese componente específico.

En esta guía vas a crear un sitio con Astro, entender las Astro Islands y aprender cuándo Astro es la herramienta correcta.

---

## ¿Por qué Astro?

| | React/Vue/Next | Astro |
|---|---|---|
| **JS al cliente** | Todo el bundle | Solo lo necesario |
| **Render** | Client-side o SSR | Static-first, SSR opcional |
| **Ideal para** | Apps interactivas | Sitios de contenido |
| **Performance** | Depende del bundle | Casi siempre excelente |

---

## Setup

```bash
pnpm create astro@latest mi-sitio
cd mi-sitio
pnpm dev
```

---

## Tu primera página

```astro
---
// src/pages/index.astro
// Esto se ejecuta en BUILD TIME (o SSR), no en el navegador
const titulo = "Mi sitio con Astro";
---

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{titulo}</title>
</head>
<body>
    <h1>{titulo}</h1>
    <p>HTML puro, cero JavaScript al cliente.</p>
</body>
</html>
```

El resultado es HTML puro. No hay `<script>` en el output.

---

## Astro Islands: interactividad selectiva

```astro
---
// src/pages/dashboard.astro
import Contador from "../components/Contador.jsx";
import Grafico from "../components/Grafico.svelte";
---

<h1>Dashboard</h1>
<p>Este texto es HTML estático.</p>

<!-- Solo este componente tiene JS -->
<Contador client:load />

<!-- Este también, pero con framework diferente -->
<Grafico client:visible />
```

**Directivas de hidratación:**
- `client:load` — hidrata inmediatamente
- `client:idle` — hidrata cuando el navegador está idle
- `client:visible` — hidrata cuando el elemento entra en viewport
- `client:media` — hidrata cuando coincide un media query

---

## Integraciones

```bash
pnpm astro add react
pnpm astro add tailwind
pnpm astro add mdx
```

Astro funciona con React, Vue, Svelte, Preact, Solid — o ninguno.

---

## Content Collections

```typescript
// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
    }),
});

export const collections = { blog };
```

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
---
```

---

## Por qué importa

Astro es el framework más rápido para sitios de contenido: blogs, documentación, portfolios, landing pages.

---

## La IA y Astro

### Lo bueno
- **Generar componentes:** la IA crea Astro components con frontmatter.
- **Convertir HTML a Astro:** la IA convierte markup estático a componentes Astro.

### Lo que no debes hacer
- **No uses Astro para apps complejas.** Si necesitas estado global complejo, usa React/Next.
- **No hidrates todo con `client:load`.** Usa `client:visible` o `client:idle` cuando sea posible.

---

## Desafío: sitio personal con Astro

**Objetivo:** crear un portfolio con Astro.

**Tu tarea:**
1. Crea páginas: Home, About, Projects, Blog
2. Usa Content Collections para el blog
3. Agrega un componente interactivo (contador, toggle de tema)
4. Configura Tailwind para estilos

**Bonus:** agrega RSS feed y sitemap.

---

## Para seguir explorando

- **[Astro Docs](https://docs.astro.build/)**

---

## Resumen

- **Astro** envía HTML puro al cliente, JavaScript solo donde se necesita.
- **Astro Islands** permiten interactividad selectiva con cualquier framework.
- **Content Collections** validan contenido con schemas Zod.
- Ideal para **sitios de contenido**, no para apps complejas.
- **Zero JS by default** = performance casi siempre excelente.

En la próxima guía: **Dockerización de una app fullstack** — contenedores para frontend, backend y base de datos.
