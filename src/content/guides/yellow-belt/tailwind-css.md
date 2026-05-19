---
title: "Tailwind CSS: estilos utilitarios en la práctica"
description: "CSS moderno sin archivos separados: clases utilitarias, responsive design y componentes reutilizables con Tailwind."
belt: yellow-belt
tags: [tailwind, css, frontend, estilos, utilitarios]
order: 15
published: true
lastRevision: "2026-05-19"
---

Escribir CSS separado es como tener una conversación donde las instrucciones están en otro cuarto. Tailwind CSS cambia el paradigma: en vez de inventar nombres de clases y saltar entre archivos HTML y CSS, aplicas estilos directamente con clases utilitarias.

En esta guía vas a aprender Tailwind desde cero: utilidades básicas, responsive design, componentes con `@apply`, y cómo configurarlo en un proyecto.

---

## ¿Qué es Tailwind CSS?

Tailwind es un **framework de CSS utilitario**. En vez de componentes pre-construidos como Bootstrap, te da clases de bajo nivel que compones:

```html
<!-- CSS tradicional -->
<div class="card">
    <h2 class="card-title">Título</h2>
    <p class="card-text">Contenido</p>
</div>

<!-- Tailwind -->
<div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-2">Título</h2>
    <p class="text-gray-600">Contenido</p>
</div>
```

### Por qué Tailwind

- **No inventas nombres:** no más `.card-wrapper-inner-highlight`
- **CSS mínimo en producción:** Tailwind elimina clases no usadas (~10KB final)
- **Responsive inline:** `md:flex lg:grid` directamente en el HTML
- **Consistencia:** escala de colores, espaciado y tipografía predefinida
- **Customizable:** puedes cambiar todo en `tailwind.config.js`

---

## Setup

```bash
pnpm add -D tailwindcss
pnpm exec tailwindcss init
```

```javascript
// tailwind.config.js
export default {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Utilidades esenciales

### Espaciado

```html
<!-- Padding -->
<div class="p-4">Padding 1rem (16px)</div>
<div class="px-6 py-3">Padding horizontal y vertical</div>
<div class="pt-2 pb-4 pl-3 pr-1">Cada lado individual</div>

<!-- Margin -->
<div class="m-4">Margin 1rem</div>
<div class="mt-8 mb-4">Margin top y bottom</div>
<div class="mx-auto">Centrar horizontalmente</div>

<!-- Gap (en flex/grid) -->
<div class="flex gap-4">Espacio entre hijos</div>
```

La escala: `0`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24` (multiplicado por 0.25rem = 4px).

### Colores

```html
<div class="bg-blue-500 text-white">Fondo azul, texto blanco</div>
<div class="bg-red-100 text-red-800">Fondo rojo claro, texto rojo oscuro</div>
<div class="border border-gray-300">Borde gris</div>
<div class="bg-emerald-500/20">Fondo verde con 20% opacidad</div>
```

La escala de colores va de `50` (más claro) a `950` (más oscuro).

### Tipografía

```html
<h1 class="text-4xl font-bold">Título grande y grueso</h1>
<p class="text-lg text-gray-700 leading-relaxed">Párrafo legible</p>
<span class="text-sm font-medium uppercase tracking-wide">Etiqueta</span>
```

### Layout

```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
    <span>Izquierda</span>
    <span>Derecha</span>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">
    <div>Columna 1</div>
    <div>Columna 2</div>
    <div>Columna 3</div>
</div>

<!-- Centrar -->
<div class="flex items-center justify-center min-h-screen">
    <div>Centrado perfecto</div>
</div>
```

### Bordes y sombras

```html
<div class="rounded-lg shadow-md">Bordes redondeados + sombra</div>
<div class="rounded-full">Círculo (con width/height iguales)</div>
<div class="border-2 border-blue-500 rounded">Borde azul</div>
<div class="ring-2 ring-offset-2 ring-blue-500">Anillo (focus style)</div>
```

---

## Responsive design

Tailwind es **mobile-first**. Las clases sin prefijo aplican a todos los tamaños. Los prefijos agregan estilos desde ese breakpoint hacia arriba:

```html
<!-- Mobile: 1 columna, Tablet: 2, Desktop: 3 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="p-4 bg-white rounded shadow">Tarjeta 1</div>
    <div class="p-4 bg-white rounded shadow">Tarjeta 2</div>
    <div class="p-4 bg-white rounded shadow">Tarjeta 3</div>
</div>

<!-- Mobile: padding pequeño, Desktop: padding grande -->
<div class="p-4 md:p-8 lg:p-12">
    Contenido con padding adaptivo
</div>

<!-- Mobile: columna, Desktop: fila -->
<div class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">Panel 1</div>
    <div class="flex-1">Panel 2</div>
</div>
```

Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.

---

## Estados y hover

```html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
    Hover me
</button>

<input class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded">

<div class="opacity-50 hover:opacity-100 transition-opacity">
    Semi-transparente, opaco en hover
</div>
```

---

## Componentes con @apply

Para evitar repetir clases, usa `@apply` en tu CSS:

```css
@layer components {
    .btn {
        @apply px-4 py-2 rounded font-medium transition-colors;
    }
    .btn-primary {
        @apply btn bg-blue-500 text-white hover:bg-blue-600;
    }
    .btn-secondary {
        @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
    }
    .card {
        @apply bg-white rounded-lg shadow-md p-6;
    }
}
```

```html
<button class="btn-primary">Primario</button>
<button class="btn-secondary">Secundario</button>
<div class="card">Contenido de tarjeta</div>
```

---

## Por qué importa

Tailwind es el framework CSS más popular para proyectos modernos:

- **Velocidad:** no saltas entre archivos HTML y CSS
- **Consistencia:** escala predefinida evita valores arbitrarios
- **Bundle pequeño:** solo las clases que usas van al CSS final
- **Framework-agnostic:** funciona con HTML, React, Vue, Astro, etc.

---

## La IA y Tailwind

### Lo bueno

- **Generar componentes:** describe un UI y la IA genera el HTML con clases Tailwind.
- **Convertir CSS a Tailwind:** pega CSS tradicional y la IA lo convierte.
- **Sugerir utilidades:** "¿cómo hago un grid responsive de 3 columnas?" — la IA da las clases.

### Lo que no debes hacer

- **No copies clases sin entender qué hacen.** `flex items-center justify-between` tiene significado.
- **No abuses de @apply.** Si todo es un componente, pierdes la ventaja de las utilidades.
- **No ignores el archivo de configuración.** Personalizar colores y breakpoints es clave.

---

## Desafío: construye un dashboard

**Objetivo:** crear un dashboard responsive con Tailwind.

**Tu tarea:**

1. Crea una página HTML con Tailwind CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
2. Construye:
   - Un sidebar con navegación (oculto en mobile, visible en desktop)
   - Un header con título y avatar de usuario
   - Un grid de 4 tarjetas de estadísticas
   - Una tabla de datos con al menos 5 filas
   - Un botón de acción flotante
3. Hazlo responsive: mobile-first con breakpoints `md:` y `lg:`
4. Agrega hover states y transiciones

**Bonus:** agrega un modo oscuro con `dark:` classes.

---

## Para seguir explorando

- **[Tailwind Documentation](https://tailwindcss.com/docs)** — excelente, con ejemplos interactivos.
- **[Tailwind Play](https://play.tailwindcss.com/)** — playground online para probar.
- **[Tailwind UI](https://tailwindui.com/)** — componentes premium (de pago).
- **[HyperUI](https://www.hyperui.dev/)** — componentes gratuitos con Tailwind.

---

## Resumen

- **Tailwind CSS** es un framework utilitario que aplica estilos con clases directas en el HTML.
- La escala de espaciado es `0.25rem` (4px) por unidad: `p-4` = `1rem` = `16px`.
- Los colores van de `50` (claro) a `950` (oscuro) con opacidad: `bg-blue-500/20`.
- **Mobile-first:** sin prefijo = todos, `md:` = desde 768px, `lg:` = desde 1024px.
- **`@apply`** agrupa utilidades en componentes reutilizables.
- Tailwind elimina clases no usadas en producción, resultando en ~10KB de CSS.

En la próxima y última guía del Yellow Belt vamos a dominar la IA en tu flujo: **Context Engineering: cómo trabajar bien con IA en tu flujo de desarrollo**.
