# Spec 012: Belt Navigator en Belt Page

**State:** done

## Context

La página de belt (`/[belt].astro`) muestra las guías de un cinturón pero no permite navegar a los demás belts. El home page ya tiene `BeltCard` con los colores por belt. El belt page ya recibe `allBelts` en props pero no lo usa.

See spec: `003-home-and-belt-pages.md`

## What

Agregar una navegación compacta de belts arriba del título en la belt page, mostrando los 4 belts como píldoras pequeñas con Level + color dot + nombre corto. El belt actual se muestra como `<span>` no clickable, los otros como links.

## Includes

- Navegación en píldoras horizontales arriba del `<header>`
- Cada píldora muestra: color dot + Level 0X + nombre del belt (ej: "Level 01 · White")
- El belt actual se renderiza como `<span>` con borde verde (`border-terminal-green`)
- Los otros belts son links a `/[slug]` con hover a verde
- Colores de dot inline (white/yellow/green/black según belt)
- Datos tomados de `allBelts` (ya disponible en props)

## Excludes

- Cambios a `BeltCard.astro` (no se reutiliza)
- Navegación en otras páginas
- Cambios en el home page
- Contadores de guías en la navegación

## Files

| File | Action |
|------|--------|
| `src/pages/[belt].astro` | update — agregar `<nav>` compacto arriba del header |

## Done

- [x] `/white-belt` muestra navegación compacta arriba del título
- [x] White Belt aparece como etiqueta no clickable con borde verde
- [x] Los otros 3 belts son links clickeables a sus páginas
- [x] Mismo comportamiento en yellow-belt, green-belt, black-belt
- [x] `pnpm astro check` sin errores
- [x] `pnpm build` exitoso

## Technical notes

- No se modificó `BeltCard.astro` — la navegación usa elementos inline con colores mapeados manualmente
- `beltCounts` se eliminó de `getStaticPaths` porque no se necesita para la navegación compacta
- Los `<span class="w-2 h-2 rounded-full">` usan colores: `bg-white border border-gray-600` (white), `bg-yellow-500` (yellow), `bg-green-500` (green), `bg-gray-900 border border-gray-600` (black)
