# Spec 011: Last Revision Date

**State:** done

## Context

Las guías y términos del glosario necesitan un campo `lastRevision` en el frontmatter para trackear cuándo fue la última revisión del contenido. El campo es obligatorio y debe mostrarse en cards y páginas individuales.

See spec: `002-content-collections.md`, `004-guide-pages.md`, `005-glossary.md`

## What

Añadir campo `lastRevision` (formato `YYYY-MM-DD`, obligatorio) al schema Zod de guides y glossary. Validar el formato de fecha usando la API Temporal de JavaScript (TC39). Mostrar la fecha en:
- `GuideCard`: caja pequeña en la esquina superior derecha
- Página de guía individual: en el header, junto al título
- `GlossaryEntry`: caja pequeña en la esquina superior derecha
- Página de glosario individual: en el header, junto al término

## Includes

- `src/content.config.ts` — Añadir `lastRevision` con validación Temporal al schema Zod
- `src/components/GuideCard.astro` — Añadir prop y mostrar en esquina superior derecha
- `src/components/GlossaryEntry.astro` — Añadir prop y mostrar en esquina superior derecha
- `src/pages/guides/[belt]/[slug].astro` — Mostrar fecha en el header
- `src/pages/glossary/[slug].astro` — Mostrar fecha en el header
- Actualizar contenido existente con `lastRevision`

## Excludes

- Historial de revisiones (solo la última fecha)
- Auto-actualización de fecha
- Internacionalización del formato de fecha

## Files

| File | Action |
|------|--------|
| `src/content.config.ts` | update |
| `src/components/GuideCard.astro` | update |
| `src/components/GlossaryEntry.astro` | update |
| `src/pages/guides/[belt]/[slug].astro` | update |
| `src/pages/glossary/[slug].astro` | update |
| `src/content/guides/**/*.md` | update |
| `src/content/glossary/**/*.md` | update |

## Done

- [ ] Schema de guides incluye `lastRevision` validada con Temporal API
- [ ] Schema de glossary incluye `lastRevision` validada con Temporal API
- [ ] `GuideCard` muestra la fecha en esquina superior derecha
- [ ] `GlossaryEntry` muestra la fecha en esquina superior derecha
- [ ] Página de guía individual muestra la fecha en el header
- [ ] Página de glosario individual muestra la fecha en el header
- [ ] Todo el contenido existente tiene `lastRevision` en el frontmatter
- [ ] `pnpm build` genera sin errores de schema

## Technical Notes

### 1. Validación con Temporal API

Usar `temporal-polyfill` (el polyfill oficial de la propuesta TC39 Temporal, que es el sucesor de `Date`) para validar el formato:

```ts
import { Temporal } from 'temporal-polyfill';

const isValidDate = (dateStr: string) => {
  try {
    Temporal.PlainDate.from(dateStr);
    return true;
  } catch {
    return false;
  }
};
```

Esto valida tanto el formato `YYYY-MM-DD` como que la fecha sea real (ej: `2025-02-30` es inválido).

Instalar: `pnpm add temporal-polyfill`

### 2. Diseño de la caja de fecha

En las cards:
```astro
<span class="font-mono text-xs text-terminal-dim bg-terminal-darker px-2 py-0.5 absolute top-4 right-4">
  2025-01-15
</span>
```

### 3. Actualización de contenido existente

Las guías y términos existentes necesitan `lastRevision` en el frontmatter. Usar la fecha del último commit relacionado al archivo.
