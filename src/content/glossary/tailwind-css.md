---
term: "Tailwind CSS"
definition: "Un framework CSS utilitario que aplica estilos directamente en el HTML con clases predefinidas, eliminando la necesidad de escribir CSS separado."
relatedGuides:
  - yellow-belt/tailwind-css
  - green-belt/shadcn-ui
tags: [tailwind, css, utilitarios, frontend, estilos]
lastRevision: "2026-05-19"
---

**Tailwind CSS** es un framework que proporciona clases utilitarias de bajo nivel para estilizar HTML directamente:

```html
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold text-gray-800">Título</h2>
    <span class="text-sm text-gray-500">Subtítulo</span>
</div>
```

Características:
- **Mobile-first:** responsive con prefijos `sm:`, `md:`, `lg:`, `xl:`
- **Purge en producción:** elimina clases no usadas (~10KB final)
- **Customizable:** `tailwind.config.js` para colores, breakpoints, plugins
- **@apply:** agrupa utilidades en componentes CSS reutilizables

## Ver también

- [Tailwind CSS: estilos utilitarios en la práctica](/guides/yellow-belt/tailwind-css)
- [shadcn/ui: construyendo interfaces profesionales](/guides/green-belt/shadcn-ui)
