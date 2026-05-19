# Spec 005: Glossary

**State:** draft

## Context

El glosario es una colección separada de términos técnicos con referencias cruzadas a guías relacionadas. Da contexto al usuario cuando encuentra términos que no conoce mientras lee las guías.

See proposal: `docs/proposal/mvp-devbelts.md`
See spec: `002-content-collections.md` (define el schema de glossary)

## What

Página de listado de glosario (`/glossary`) con navegación alfabética, búsqueda básica y páginas individuales por término (`/glossary/:term`).

## Includes

- `src/pages/glossary/index.astro` — Página de listado:
  - Todos los términos ordenados alfabéticamente
  - Agrupados por letra inicial (A, B, C...)
  - Cada término con su definición corta y links a guías relacionadas
  - Navegación por letras (A-Z) como anclas
- `src/pages/glossary/[slug].astro` — Página individual de término:
  - Renderiza el contenido Markdown del término
  - Muestra guías relacionadas como links clickeables
  - Link de vuelta al listado de glosario
- `src/components/GlossaryNav.astro` — Navegación alfabética (A-Z)
- `src/components/GlossaryEntry.astro` — Card individual para un término en el listado
- Las guías pueden linkear a términos del glosario con `/glossary/:slug`

## Excludes

- Búsqueda full-text (no en MVP)
- Glosario interactivo con filtros avanzados
- Traducción o internacionalización

## Files

| File | Action |
|------|--------|
| `src/pages/glossary/index.astro` | create |
| `src/pages/glossary/[slug].astro` | create |
| `src/components/GlossaryNav.astro` | create |
| `src/components/GlossaryEntry.astro` | create |

## Done

- [ ] `/glossary` muestra todos los términos ordenados alfabéticamente
- [ ] Términos agrupados por letra inicial con anclas navegables
- [ ] Cada término en el listado muestra definición corta y guías relacionadas
- [ ] `/glossary/:slug` renderiza contenido Markdown del término
- [ ] Página individual muestra guías relacionadas como links
- [ ] `pnpm build` genera todas las rutas del glosario
- [ ] Links desde guías a términos del glosario funcionan
- [ ] Navegación A-Z funciona como anclas internas

## Technical Notes

### 1. Slug del término

El slug se deriva del `term` del frontmatter (ej: "Variable" → `variable`). Usar `entry.id` que viene del nombre del archivo `.md` sin extensión.

### 2. Definición corta vs contenido completo

El campo `definition` del schema es la definición corta para el listado. El contenido Markdown del archivo es la explicación completa. Ambos se usan en contextos distintos.

### 3. `relatedGuides` usa IDs de colección

Los valores en `relatedGuides` son IDs de la colección guides (ej: `white-belt/variables-and-types`). Se resuelven con `getEntry('guides', id)`.
