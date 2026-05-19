# Spec 007: Styling and Layout

**State:** draft

## Context

El layout base existe pero es mínimo — sin header, navegación, footer ni modo claro. El diseño necesita completarse con navegación consistente, responsive design, SEO meta tags, y el toggle dark/light mode según el design system terminal/hacker.

See proposal: `docs/proposal/mvp-devbelts.md`
See design system: `DESIGN.md`

## What

Completar el sistema de layouts y estilos: header con navegación, footer, dark/light mode toggle, SEO meta tags (Open Graph, sitemap), y responsive design mobile-first.

## Includes

- `src/layouts/BaseLayout.astro` — update para incluir:
  - Header con logo y navegación principal
  - Footer con créditos y links
  - SEO meta tags: Open Graph, Twitter Card, canonical URL
  - Soporte para dark/light mode (quitar `class="dark"` hardcodeado)
- `src/components/Header.astro` — Header con:
  - Logo/nombre "devBelts" linkeando al home
  - Links de navegación: Home, Glosario
  - Toggle dark/light mode (sin JS al cliente — usar `<style>` con media query o minimal island)
- `src/components/Footer.astro` — Footer con:
  - Créditos "devBelts"
  - Link al repo si aplica
- `src/components/ThemeToggle.astro` — Toggle dark/light:
  - Astro island con mínimo JavaScript
  - Persiste preferencia en `localStorage`
  - Respeta `prefers-color-scheme` del sistema
- `src/pages/sitemap.xml.ts` — Sitemap generado automáticamente
- `src/styles/global.css` — update para:
  - Variables CSS para light mode (Paper White, Forest Green, Ink Black)
  - Responsive breakpoints (mobile-first)
  - Estilos para header/footer
  - Glitch effect en H1/H2 (sutil)
  - Scanlines opcionales
  - Cursor blink en prompts
- Mobile-first responsive en todos los componentes existentes:
  - `BeltCard.astro` — grid responsive
  - `GuideCard.astro` — full width en mobile
  - `TagList.astro` — wrap en mobile
  - `RelatedGuides.astro` — stack en mobile

## Excludes

- Animaciones complejas o transiciones elaboradas
- Modo alto contraste separado
- Personalización de colores por usuario
- Búsqueda UI (no en MVP)

## Files

| File | Action |
|------|--------|
| `src/layouts/BaseLayout.astro` | update |
| `src/components/Header.astro` | create |
| `src/components/Footer.astro` | create |
| `src/components/ThemeToggle.astro` | create |
| `src/pages/sitemap.xml.ts` | create |
| `src/styles/global.css` | update |
| `src/components/BeltCard.astro` | update (responsive) |
| `src/components/GuideCard.astro` | update (responsive) |
| `src/pages/[belt].astro` | update (responsive grid) |
| `src/pages/index.astro` | update (responsive grid) |

## Done

- [ ] Header visible en todas las páginas con logo y navegación
- [ ] Footer visible en todas las páginas
- [ ] Dark/light mode toggle funciona y persiste preferencia
- [ ] Light mode usa paleta Paper White / Forest Green / Ink Black
- [ ] Open Graph meta tags presentes en todas las páginas
- [ ] `/sitemap.xml` generado con todas las rutas
- [ ] Sitio responsive en mobile (320px minimum)
- [ ] Belt cards en grid responsive (1 col mobile, 2 col tablet, 4 col desktop)
- [ ] Guide cards full width en mobile, 2 col en tablet+
- [ ] Glitch effect sutil en H1/H2
- [ ] `pnpm build` genera sitemap y todas las rutas
- [ ] Lighthouse score > 90 en Performance, Accessibility, SEO

## Technical Notes

### 1. Dark/light mode strategy

Usar `class="dark"` en `<html>` como flag. Tailwind soporta `dark:` variant. El toggle usa un Astro island con JS mínimo que:
- Lee `localStorage` al cargar
- Si no hay preferencia, usa `prefers-color-scheme`
- Toggle añade/quita `class="dark"` y guarda en `localStorage`

### 2. Variables CSS para light mode

Extender `@theme` en `global.css` con valores light:
- `--color-terminal-black` → `#FAFAFA` (Paper White)
- `--color-terminal-green` → `#00802B` (Forest Green)
- `--color-terminal-white` → `#1A1A1A` (Ink Black)

Usar `:root` para light y `:root.dark` para dark, o viceversa según convención.

### 3. Sitemap

Usar `@astrojs/sitemap` si está disponible, o generar manualmente con `getCollection('guides')` filtrando `published: true`.

### 4. Glitch effect

Implementar con CSS `::before`/`::after` pseudo-elements y `clip-path` animations. Debe ser sutil — no distractor. Preferir `prefers-reduced-motion` para desactivar.

### 5. SEO meta tags

Incluir en `BaseLayout`:
- `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`
- `<meta name="twitter:card" content="summary_large_image">`
- `<link rel="canonical">`
- Valores por defecto + override por página via props
