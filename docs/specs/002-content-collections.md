# Spec 002: Content Collections

**State:** done

## Context

Astro Content Collections es la capa de contenido del sitio. Sin schemas validados, no hay garantía de que el frontmatter de las 58 guías esté bien formado. Los schemas son la base para todas las páginas que renderizan contenido.

See proposal: `docs/proposal/mvp-devbelts.md`
See spec: `001-project-setup.md`

## What

Schemas Zod para las dos colecciones de contenido: `guides` y `glossary`. Validación de frontmatter en cada guía y término del glosario.

## Includes

- `src/content.config.ts` con dos colecciones:
  - `guides` — schema con: `title`, `description`, `belt` (enum: white-belt/yellow-belt/green-belt/black-belt), `tags` (array), `order` (number), `published` (boolean, default true)
  - `glossary` — schema con: `term`, `definition`, `relatedGuides` (array de refs), `tags` (array)
- Validación de que `belt` coincida con los 4 niveles definidos
- `order` para ordenar guías dentro de cada belt
- `tags` compartidos entre guides y glossary
- Guías de prueba: `white-belt/variables-and-types.md`
- Término de glosario de prueba: `variable.md`

## Excludes

- Renderizado de páginas (specs siguientes)
- Creación de las 58 guías markdown (contenido real)
- Páginas de tags (spec 006)

## Files

| File | Action |
|------|--------|
| `src/content.config.ts` | create |
| `src/content/guides/white-belt/variables-and-types.md` | create (test) |
| `src/content/glossary/variable.md` | create (test) |

## Done

- [x] `pnpm build` compila sin errores de validación
- [x] Schema `guide` rechaza frontmatter con `belt` inválido
- [x] Schema `guide` requiere `title`, `description`, `belt`
- [x] Schema `glossary` requiere `term`, `definition`
- [x] Una guía de prueba con frontmatter válido se parsea correctamente
- [x] Un término de glosario de prueba se parsea correctamente

## Notes

- Astro 6 usa `glob` loader de `astro/loaders` en lugar del sistema legacy de `contentDirectory`
- Schema import: `z` viene de `astro/zod`, no de `zod` directamente
- `relatedGuides` en glossary son strings con formato `belt/slug` — la validación de existencia real se hará en las páginas

## Course corrections

Durante la implementación del spec 003 se detectaron los siguientes problemas de infraestructura que se corrigieron y documentan aquí:

**1. Falta de import del CSS en layout.**
`BaseLayout` no importaba `src/styles/global.css`, por lo que Tailwind nunca se cargaba en las páginas. El CSS se generaba correctamente pero nunca se inyectaba en el HTML.

**Solución:** `src/layouts/BaseLayout.astro` ahora importa `../styles/global.css` en el frontmatter.

**2. Tailwind v4 `@theme` vs config file.**
Tailwind v4 no usa `tailwind.config.ts`. Los colores y fuentes personalizados se definen en `global.css` con la directiva `@theme`. Sin esto, las clases `bg-terminal-black`, `text-terminal-green`, etc. no resuelven a nada.

**Solución:** `src/styles/global.css` usa `@theme` con `--color-terminal-*` y `--font-family-*`.

**3. Utilidades de componentes: `cn()` + CVA.**
Se instalaron `tailwind-merge`, `clsx` y `class-variance-authority` para seguir el patrón shadcn de manejo de clases. Se creó `src/lib/utils.ts` con la función `cn()`.

**Archivos creados/modificados:**

| File | Action |
|------|--------|
| `src/layouts/BaseLayout.astro` | update — import de `global.css` |
| `src/styles/global.css` | update — `@theme` con colores y fuentes |
| `src/lib/utils.ts` | create — función `cn()` |
| `package.json` | update — + `tailwind-merge`, `clsx`, `class-variance-authority` |
| `AGENTS.md` | update — convención CVA + cn |
