# Spec 004: Guide Pages

**State:** done

## Context

Es la pieza central del sitio — donde el usuario consume el contenido. Sin esto, los belts listan guías pero no hay forma de leerlas.

See proposal: `docs/proposal/mvp-devbelts.md`
See spec: `003-home-and-belt-pages.md`

## What

Páginas individuales de guías (`/guides/:belt/:slug`) con renderizado de Markdown, navegación entre guías, tags y guías relacionadas.

## Includes

- `src/pages/guides/[belt]/[slug].astro` — Página individual:
  - `getStaticPaths` genera todas las rutas de guías publicadas
  - Renderiza el contenido Markdown con `render(entry)` de `astro:content`
  - Navegación: "guía anterior" y "guía siguiente" dentro del mismo belt
  - Tags de la guía como links
  - Guías relacionadas basadas en tags compartidos
  - Breadcrumb: `Home > Belt > Título de la guía`
- `src/components/TagList.astro` — Lista de tags con links
- `src/components/RelatedGuides.astro` — Lista de guías relacionadas
- `src/components/MarkdownRenderer.astro` — Wrapper para `set:html` (quedó como utilidad, no se usa directamente)

## Excludes

- Páginas de tag (spec 006) — los tags existen como links pero las páginas se hacen después
- Glosario (spec 005)

## Files

| File | Action |
|------|--------|
| `src/pages/guides/[belt]/[slug].astro` | create |
| `src/components/MarkdownRenderer.astro` | create |
| `src/components/TagList.astro` | create |
| `src/components/RelatedGuides.astro` | create |

## Done

- [x] `/guides/white-belt/variables-and-types` renderiza el contenido Markdown
- [x] Todas las guías publicadas generan rutas estáticas
- [x] Navegación anterior/siguiente funciona dentro del mismo belt
- [x] Tags se muestran como links
- [x] Guías relacionadas aparecen al final (basadas en tags compartidos)
- [x] Breadcrumb navega correctamente
- [x] `pnpm build` genera todas las rutas de guías
- [x] Code blocks con sintaxis highlighting (Shiki css-variables theme)
- [x] Tipografía terminal para contenido Markdown (`.guide-content`)
- [x] Code blocks con header de lenguaje estilo ventana

## Course Corrections

### 1. `guide.render()` vs `render(guide)`

En Astro 6, `entry.render()` no existe. Se importa `render` de `astro:content` y se llama como `render(entry)`, que devuelve `{ Content, headings }` donde `Content` es un componente Astro.

### 2. `Content` es componente, no string

No se puede pasar `<Content />` como prop a otro componente. Debe usarse directamente en el template.

### 3. `guide.id` incluye el prefijo del belt

`guide.id` es `"white-belt/variables-and-types"`. Para URLs se usa `guide.id` directamente con `/guides/${guide.id}`. El route `[belt]/[slug]` ya parsea correctamente.

### 4. Shiki css-variables theme

Para que los code blocks usen los colores del tema terminal:
- `astro.config.mjs`: `markdown.shikiConfig.theme: 'css-variables'`
- CSS variables: `--astro-code-foreground`, `--astro-code-background`, `--astro-code-token-*`
- No confundir con `--astro-code-color-text`/`--astro-code-color-background` (Astro/Shiki usa `--*-foreground`/`--*-background`)

### 5. `getEntry` retorna `CollectionEntry | undefined`

Usar non-null assertion `(await getEntry(...))!` ya que las rutas vienen de `getStaticPaths` y siempre existen.
