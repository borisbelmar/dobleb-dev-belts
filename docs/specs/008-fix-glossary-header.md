# Spec 008: Fix Glossary Header Duplicado

**State:** done

## Context

Las páginas del glosario (`/glossary` y `/glossary/:slug`) renderizan el header del sitio dos veces: una vez por el `<Header>` incluido en `BaseLayout` y otra vez por un `<nav>` inline con el logo `$ devBelts` escrito directamente en cada página.

See spec: `005-glossary.md`

## What

Remover los `<nav>` inline de las páginas del glosario para que solo usen el `<Header>` de `BaseLayout`, eliminando la duplicación visual.

## Includes

- `src/pages/glossary/index.astro` — Remover el `<nav>` inline (líneas 39-47) que duplica el header
- `src/pages/glossary/[slug].astro` — Remover el `<nav>` inline (líneas 40-56) que duplica el header
- Mantener el breadcrumb de navegación que está debajo del nav

## Excludes

- Cambios al componente `Header` o `BaseLayout`
- Cambios al contenido o estructura del glosario

## Files

| File | Action |
|------|--------|
| `src/pages/glossary/index.astro` | update |
| `src/pages/glossary/[slug].astro` | update |

## Done

- [ ] `/glossary` muestra un solo header (el de `BaseLayout`)
- [ ] `/glossary/:slug` muestra un solo header (el de `BaseLayout`)
- [ ] El breadcrumb de navegación se mantiene visible debajo del header
- [ ] `pnpm build` genera sin errores

## Technical Notes

`BaseLayout` ya incluye `<Header currentPath={currentPath} />` que renderiza el logo `$ devBelts` y la navegación. Los `<nav>` inline en las páginas del glosario fueron un error anterior — probablemente copiados de una versión antes de que existiera `BaseLayout`. El breadcrumb (`home / glossary / term`) es navegación contextual y debe mantenerse.
