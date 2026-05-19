---
term: "Semántica HTML"
definition: "El uso de etiquetas HTML que describen el significado y rol del contenido (header, nav, article, footer) en vez de solo su apariencia."
relatedGuides:
  - yellow-belt/html-y-css
  - yellow-belt/javascript-en-el-navegador
tags: [html, accesibilidad, seo, semantica]
lastRevision: "2026-05-19"
---

La **semántica HTML** se refiere al uso de etiquetas que comunican el **significado** del contenido, no solo su apariencia visual. En vez de usar `<div>` para todo, se usan etiquetas que describen qué es cada sección:

```html
<!-- Sin semántica -->
<div class="header">...</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- Con semántica -->
<header>...</header>
<main>...</main>
<footer>...</footer>
```

Beneficios:
- **Accesibilidad:** lectores de pantalla navegan por landmarks semánticos
- **SEO:** motores de búsqueda entienden la estructura de la página
- **Mantenimiento:** código más legible para desarrolladores

Etiquetas semánticas principales: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<mark>`.

## Ver también

- [HTML y CSS: estructura y estilos](/guides/yellow-belt/html-y-css)
- [JavaScript en el navegador: DOM y eventos básicos](/guides/yellow-belt/javascript-en-el-navegador)
