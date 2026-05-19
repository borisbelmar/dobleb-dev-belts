# Spec 009: Página About

**State:** draft

## Context

El sitio necesita una página que explique la motivación detrás del proyecto devBelts — por qué se creó, qué problema resuelve, y la filosofía detrás de los cinturones de programación. Es una página de tipo landing/creativa, no una guía técnica.

See proposal: `docs/proposal/mvp-devbelts.md`

## What

Página estática `/about` con contenido sobre la motivación del proyecto. Diseño más creativo que las páginas de guías, con un enfoque en storytelling visual. Usa `BaseLayout` para consistencia con el resto del sitio.

## Includes

- `src/pages/about.astro` — Página estática con:
  - Header con título creativo (no el layout estándar de guías)
  - Secciones: motivación personal, filosofía de los cinturones, cómo usar el sitio
  - Diseño con elementos visuales decorativos (líneas de terminal, bloques de código estilizados, citas)
  - Usa `BaseLayout` para header/footer consistente con el resto del sitio
- `src/components/Header.astro` — Agregar link "About" en la navegación principal

## Excludes

- Contenido en Markdown (es página Astro directa, sin Content Collection)
- Páginas de tags, glosario u otras secciones

## Files

| File | Action |
|------|--------|
| `src/pages/about.astro` | create |
| `src/components/Header.astro` | update |

## Done

- [ ] `/about` es accesible y renderiza correctamente
- [ ] La página tiene un diseño creativo/distintivo (no genérico, con storytelling visual)
- [ ] El link "About" aparece en el header de navegación principal
- [ ] Usa `BaseLayout` para consistencia (Header + Footer)
- [ ] `pnpm build` genera la ruta estáticamente
- [ ] Responsive en mobile

## Technical Notes

La página debe sentirse más personal y creativa que las guías técnicas. Se pueden usar elementos como:
- Bloques de código decorativos con mensajes motivacionales
- Líneas de terminal estilizadas
- Citas destacadas
- Tipografía más expresiva
- Espaciado generoso para lectura cómoda
