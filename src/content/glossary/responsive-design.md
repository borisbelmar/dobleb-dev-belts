---
term: "Responsive Design"
definition: "El enfoque de diseño web que hace que las páginas se adapten automáticamente a diferentes tamaños de pantalla usando media queries y layouts flexibles."
relatedGuides:
  - yellow-belt/html-y-css
  - yellow-belt/tailwind-css
tags: [css, responsive, mobile, diseño]
lastRevision: "2026-05-19"
---

El **Responsive Design** (diseño responsivo) es la práctica de crear sitios web que se adaptan a cualquier tamaño de pantalla — desde teléfonos hasta monitores ultrawide — usando técnicas como:

- **Media queries:** aplicar estilos condicionales según el ancho de pantalla
- **Layouts flexibles:** Flexbox y Grid en vez de tamaños fijos en píxeles
- **Unidades relativas:** `rem`, `em`, `%`, `vw`, `vh` en vez de `px`
- **Imágenes flexibles:** `max-width: 100%` para que no desborden

```css
/* Mobile first */
.contenedor { padding: 16px; }

/* Tablet y arriba */
@media (min-width: 768px) {
    .contenedor { padding: 32px; display: grid; grid-template-columns: 1fr 1fr; }
}

/* Desktop y arriba */
@media (min-width: 1024px) {
    .contenedor { max-width: 1200px; margin: 0 auto; }
}
```

El enfoque **mobile first** (móvil primero) significa escribir los estilos base para pantallas pequeñas y agregar complejidad con media queries de `min-width`.

## Ver también

- [HTML y CSS: estructura y estilos](/guides/yellow-belt/html-y-css)
- [Tailwind CSS: estilos utilitarios en la práctica](/guides/yellow-belt/tailwind-css)
