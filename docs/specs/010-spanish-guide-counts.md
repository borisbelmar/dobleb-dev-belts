# Spec 010: Contador de Guías en Español

**State:** draft

## Context

Los contadores de guías en las cards de belts y páginas de belt están en inglés (`"1 guide"` / `"X guides"`). El proyecto es en español para el público hispanohablante, así que deben estar en español.

## What

Actualizar todos los contadores de guías en el sitio para que usen español (`"1 guía"` / `"X guías"`) y estén posicionados en la esquina inferior izquierda del contenedor.

## Includes

- `src/components/BeltCard.astro` — Cambiar texto a español y mover a la esquina inferior izquierda
- `src/pages/[belt].astro` — Cambiar texto a español y mover a la esquina inferior izquierda
- Cualquier otro lugar donde se muestre conteo de guías

## Excludes

- Cambios al layout general de las cards (solo texto y posición del contador)
- Cambios a otros componentes no relacionados

## Files

| File | Action |
|------|--------|
| `src/components/BeltCard.astro` | update |
| `src/pages/[belt].astro` | update |

## Done

- [ ] BeltCard muestra `"1 guía"` / `"X guías"` en español en la esquina inferior izquierda
- [ ] Página de belt (`/:belt`) muestra el contador en español en la esquina inferior izquierda
- [ ] `pnpm build` genera sin errores
- [ ] No hay regresiones visuales en otras partes del sitio

## Technical Notes

Para posicionar en la esquina inferior izquierda, se puede usar un badge con `absolute bottom-4 left-4` dentro de un contenedor `relative`, o reorganizar el flex de la card.
