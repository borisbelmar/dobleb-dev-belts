# Spec 006: Tag Pages

**State:** draft

## Context

Los tags existen en el frontmatter de las guías y se muestran como links en `TagList.astro`, pero las páginas de tag aún no existen. Este spec cierra ese gap — cada tag debe llevar a una página que liste todas las guías con ese tag.

See proposal: `docs/proposal/mvp-devbelts.md`
See spec: `004-guide-pages.md` (los tags ya se muestran como links)

## What

Páginas de tag (`/tag/:name`) que listan todas las guías publicadas con ese tag, agrupadas por belt.

## Includes

- `src/pages/tag/[name].astro` — Página de tag:
  - `getStaticPaths` genera una ruta por cada tag único en las guías publicadas
  - Lista de guías con ese tag, agrupadas por belt
  - Cada guía mostrada como `GuideCard` (componente existente)
  - Link de vuelta al home o breadcrumb
  - Título del tag como H1
- Tags en `TagList.astro` ya linkean a `/tag/:name` (verificar/actualizar si no lo hacen)
- Tags en páginas de glosario también linkean a `/tag/:name`

## Excludes

- Página de listado de todos los tags (`/tag`) — no en MVP
- Tags en el glosario no generan páginas propias (solo referencian guías)
- Búsqueda o filtrado avanzado por tags

## Files

| File | Action |
|------|--------|
| `src/pages/tag/[name].astro` | create |
| `src/components/TagList.astro` | update (verificar links) |

## Done

- [ ] `/tag/javascript` muestra todas las guías con tag "javascript"
- [ ] Guías agrupadas por belt en la página de tag
- [ ] Cada guía usa `GuideCard` consistente con el resto del sitio
- [ ] `pnpm build` genera todas las rutas de tags
- [ ] Links desde guías a páginas de tag funcionan
- [ ] Breadcrumb navega correctamente
- [ ] Tags del glosario también linkean a páginas de tag

## Technical Notes

### 1. Tags únicos de guías publicadas

`getStaticPaths` debe iterar solo sobre guías con `published: true`. Tags duplicados se deduplican con `Set`.

### 2. Slug del tag

El tag se usa directamente como slug en la URL (ej: `/tag/javascript`). No necesita transformación especial si los tags ya están en lowercase.

### 3. Agrupación por belt

Usar `Array.groupBy()` o reducir por `belt` para agrupar guías. Mostrar belts en orden: white → yellow → green → black.
