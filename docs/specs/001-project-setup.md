# Spec 001: Project Setup

**State:** done

## Context

Primer spec del proyecto. Sin esto no hay base para los demás. Todo el contenido y las páginas dependen de que el proyecto esté configurado correctamente.

See proposal: `docs/proposal/mvp-devbelts.md`

## What

Inicialización del proyecto Astro 6+ con pnpm, Tailwind CSS v4, TypeScript estricto, y estructura de carpetas según AGENTS.md.

## Includes

- `pnpm` como package manager (v11.1.3)
- Astro 6.3.5 con template minimal
- Tailwind CSS v4 via `@tailwindcss/vite`
- TypeScript estricto (`tsconfig.json`)
- Estructura de directorios:
  - `src/content/guides/{white-belt,yellow-belt,green-belt,black-belt}/`
  - `src/content/glossary/`
  - `src/layouts/`
  - `src/components/`
  - `src/pages/`
  - `src/styles/`
- `public/favicon.svg` (copiado de `docs/references/dev-belts-favicon.svg`)
- Scripts: `dev`, `build`, `preview`, `astro`

## Excludes

- Content collections schemas (spec 002)
- Páginas (specs 003-007)
- Componentes UI (spec 007)
- Diseño visual (solo se configura Tailwind, no se implementa el diseño aún)

## Files

| File | Action |
|------|--------|
| `package.json` | create |
| `tsconfig.json` | create (via Astro) |
| `astro.config.mjs` | create (via Astro + tailwind plugin) |
| `src/styles/global.css` | scaffold (via Astro) |
| `.gitignore` | create (via Astro) |
| `.vscode/` | create (via Astro) |
| `public/favicon.svg` | copy from references |

## Done

- [x] `pnpm install` ejecuta sin errores
- [x] `pnpm dev` levanta el servidor en localhost
- [x] `pnpm build` genera HTML estático sin errores (1 page built)
- [x] `tsconfig.json` tiene `strict: true`
- [x] Tailwind está configurado y funcional (`@tailwindcss/vite`)
- [x] Estructura de directorios creada según AGENTS.md
- [x] Favicon copiado a `public/`

## Notes

- Tailwind v4 usa `@tailwindcss/vite` como plugin de Vite, no requiere `tailwind.config.ts` por defecto
- Node >= 24.0.0 requerido (definido en `package.json` engines)
- Build scripts de `esbuild` y `sharp` requirieron `pnpm approve-builds`
