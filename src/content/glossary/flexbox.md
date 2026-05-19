---
term: "Flexbox"
definition: "Un sistema de layout CSS de una dimensión que permite alinear y distribuir elementos dentro de un contenedor de forma flexible."
relatedGuides:
  - yellow-belt/html-y-css
  - yellow-belt/tailwind-css
tags: [css, layout, flexbox, frontend]
lastRevision: "2026-05-19"
---

**Flexbox** (Flexible Box Layout) es un modelo de layout CSS que distribuye elementos en una dimensión — fila o columna — con control preciso sobre alineación, espaciado y orden.

Se activa con `display: flex` en el contenedor padre:

```css
.contenedor {
    display: flex;
    justify-content: space-between;  /* horizontal */
    align-items: center;             /* vertical */
    gap: 16px;                       /* espacio entre items */
    flex-wrap: wrap;                 /* saltar de línea si no caben */
}

.item {
    flex: 1;  /* crecer proporcionalmente */
}
```

Propiedades del contenedor: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap`.
Propiedades de los items: `flex-grow`, `flex-shrink`, `flex-basis`, `order`, `align-self`.

## Ver también

- [HTML y CSS: estructura y estilos](/guides/yellow-belt/html-y-css)
- [Tailwind CSS: estilos utilitarios en la práctica](/guides/yellow-belt/tailwind-css)
