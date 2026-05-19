# Proposal: devBelts

## Problema

El aprendizaje de programación está fragmentado. No hay un camino claro que guíe a un principiante desde cero hasta un nivel profesional. Los recursos existen, pero están dispersos, sin orden, sin progresión.

**Para quién:**
- Personas que quieren aprender a programar desde cero
- Desarrolladores junior que buscan estructura en su aprendizaje
- Cualquiera que quiera progresar de forma clara, nivel a nivel

**Qué hacen ahora:**
- Tutoriales sueltos en YouTube, blogs, cursos online
- Sin un hilo conductor, sin saber "qué sigue después"
- Aprendizaje reactivo (buscan cuando necesitan) en vez de progresivo

## Propuesta

DevBelts es un currículum de programación organizado en 4 niveles tipo cinturones (White → Yellow → Green → Black). Cada nivel contiene guías en Markdown con frontmatter que el usuario consume en un sitio web estático construido con Astro.

**Enfoque de aprendizaje:**
- Guías concisas, no exhaustivas — explican el concepto, dan contexto, proponen desafíos
- Aprendizaje guiado por IA — el usuario usa asistentes (Claude, ChatGPT) como compañero de práctica
- Todas las guías abiertas — el usuario elige su propio camino sin desbloqueos

**Contenido de cada guía:**
- Explicación conceptual del tema
- Ejemplos mínimos ilustrativos
- Desafíos propuestos para practicar (no soluciones completas)
- Referencias a herramientas y recursos externos

## Identidad visual

El diseño sigue una estética terminal/hacker con foco en legibilidad. Documento completo en `DESIGN.md`.

- **Paleta dark:** Void Black (#0A0A0A), Phosphor Green (#00FF41), Terminal White (#E0E0E0)
- **Paleta light:** Paper White (#FAFAFA), Forest Green (#00802B), Ink Black (#1A1A1A)
- **Tipografía:** Source Sans 3 (body/UI) + JetBrains Mono (código/elementos terminal)
- **Efectos:** Glitch sutil en H1/H2, scanlines opcionales, cursor blink en prompts
- **Componentes:** Bordes rectos (0px radius), glow verde en hover, title bars estilo terminal en code blocks
- **Preview:** `docs/references/design-preview.html`

## Scope

### Incluido en MVP

| Área | Detalle |
|------|---------|
| **Navegación por belts** | Landing con los 4 cinturones, cada uno con sus guías listadas |
| **Lectura de guías** | Página individual por guía, renderizada desde Markdown |
| **Tags y relaciones** | Sistema de tags en frontmatter + guías relacionadas al final de cada guía |
| **Glosario** | Colección separada de términos técnicos con referencias cruzadas a guías relacionadas |
| **Diseño** | Tailwind CSS, mobile-first, accesible, responsive, modo oscuro/claro |
| **Identidad visual** | Estética terminal/hacker — glitch en títulos, verde fósforo, bordes rectos (ver `DESIGN.md`) |
| **SEO básico** | Meta tags, sitemap, Open Graph |

### Excluido (post-MVP)

- Grafo visual interactivo de relaciones entre guías
- Rutas por rol (posible implementación con DB en el futuro)
- Sistema de progreso del usuario (login, tracking)
- Comentarios o comunidad
- Internacionalización
- Búsqueda full-text (no en MVP)

## Restricciones técnicas

- **Astro 6+** — SSG, mínimo JavaScript al cliente
- **TypeScript** — tipado estricto
- **Content Collections** — schemas Zod para guías, glosario y rutas
- **Tailwind CSS** — estilos utilitarios, mobile-first, sin CSS separado
- **Markdown + frontmatter** — todo el contenido es archivos .md
- **Programación funcional** preferida sobre OOP
- **TDD** — tests antes de implementación
- **Conventional Commits** — `feat:`, `fix:`, `docs:`, `chore:`
- **Node 24 LTS** + pnpm + Corepack

## Diagrama de alto nivel

```
┌─────────────────────────────────────────────────┐
│                   DevBelts Site                  │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Home    │  │  Belt    │  │   Guide       │  │
│  │  /       │  │  /:belt  │  │   /:belt/:slug│  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Glossary │  │  Role    │  │   Tag         │  │
│  │ /glossary│  │  Path    │  │   /tag/:name  │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│                                                  │
│  Content Layer: src/content/                     │
│  ├── guides/     (58 markdown files)             │
│  ├── glossary/   (terms markdown files)          │
│  └── paths/      (role path configs)             │
└─────────────────────────────────────────────────┘
```

## Configuración

| Parámetro | Valor |
|-----------|-------|
| **Runtime** | Node 24 LTS |
| **Package manager** | pnpm (via Corepack) |
| **Framework** | Astro 6+ |
| **Styling** | Tailwind CSS |
| **Content** | Markdown + frontmatter |
| **Idioma contenido** | Español |
| **Idioma commits** | Inglés (Conventional Commits) |
| **Deploy** | Dokploy (push de GitHub) |
| **Dominio** | dev-belts.dobleb.cl |

## Specs planeados

1. `001-project-setup.md` — Inicialización del proyecto Astro, configuración de pnpm, Tailwind, estructura de carpetas
2. `002-content-collections.md` — Schemas Zod para guías y glosario
3. `003-home-and-belt-pages.md` — Página principal y páginas de listado por cinturón
4. `004-guide-pages.md` — Páginas individuales de guías con navegación, tags y relacionadas
5. `005-glossary.md` — Colección y página de glosario de términos
6. `006-tag-pages.md` — Páginas de tag y filtrado por tags
7. `007-styling-and-layout.md` — Layouts base, componentes UI, estilos Tailwind, responsive

## Criterios de éxito

- [ ] El sitio compila y genera HTML estático con `astro build`
- [ ] Las 58 guías se renderizan correctamente desde Markdown
- [ ] La navegación entre belts y guías funciona sin JavaScript
- [ ] Cada guía muestra tags y guías relacionadas
- [ ] El glosario está accesible y enlazado desde las guías
- [ ] Las rutas por rol muestran guías curadas de distintos belts
- [ ] El sitio es responsive y accesible en mobile
- [ ] Lighthouse score > 90 en Performance, Accessibility, SEO

## Decisiones pendientes

1. **Deploy en Dokploy:** Confirmar configuración de build y dominio `dev-belts.dobleb.cl`
2. **Contenido de las 58 guías:** Definir si se escriben antes de los specs o en paralelo

## Assets

| Archivo | Descripción |
|---------|-------------|
| `docs/references/dev-belts-favicon.svg` | Favicon 512x512 — fondo Void Black con marca en Phosphor Green |
| `docs/references/dev-belts-mono-color.svg` | Logo monocromático 356x278 — negro puro, para fondos claros |
| `docs/references/design-preview.html` | Preview HTML del design system |
| `DESIGN.md` | Design system completo |
