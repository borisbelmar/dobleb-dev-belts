# Spec 003: Home and Belt Pages

**State:** done

## Context

El usuario necesita ver el progreso de belts y navegar a las guías. Es la estructura de navegación principal del sitio.

See proposal: `docs/proposal/mvp-devbelts.md`
See spec: `002-content-collections.md`

## What

Página principal (`/`) con los 4 cinturones y páginas de listado por cinturón (`/:belt`) con las guías de cada uno.

## Includes

- `src/pages/index.astro` — Landing page con grid de 4 belts (nombre, descripción, cantidad de guías)
- `src/pages/[belt].astro` — Página de listado por cinturón con guías ordenadas por `order`
- `src/layouts/BaseLayout.astro` — Layout base con HTML structure y Tailwind
- `src/components/BeltCard.astro` — Card reutilizable para belts
- `src/components/GuideCard.astro` — Card reutilizable para guías
- `getStaticPaths` genera las 4 rutas de belts estáticamente
- Navegación entre belts en cada página de belt

## Excludes

- Páginas individuales de guías (spec 004)
- Glosario (spec 005)
- Páginas de tags (spec 006)
- Estilos visuales completos (spec 007)

## Files

| File | Action |
|------|--------|
| `src/pages/index.astro` | update |
| `src/pages/[belt].astro` | create |
| `src/layouts/BaseLayout.astro` | create |
| `src/components/BeltCard.astro` | create |
| `src/components/GuideCard.astro` | create |

## Done

- [x] `/` muestra los 4 belts con cantidad de guías
- [x] `/white-belt` muestra las guías del white belt ordenadas
- [x] `/yellow-belt`, `/green-belt`, `/black-belt` generan estáticamente
- [x] Cada guía en el listado es un link a `/guides/:belt/:slug`
- [x] Navegación entre belts funciona
- [x] `pnpm build` genera todas las rutas estáticas (5 pages)

## Notes

- Import paths en `[belt].astro` eran `../layouts/` y `../components/` (no `../../`)
- BeltCard usa un mapa de colores para bordes y hover states por belt
- Guía de prueba `variables-and-types.md` aparece en `/white-belt/`
