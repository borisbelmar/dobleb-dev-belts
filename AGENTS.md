# DevBelts — dev-belts.dobleb.cl

## Project Context

**What we're building:** DevBelts es un sitio web de guías de programación organizadas en 4 niveles tipo cinturones (White, Yellow, Green, Black). Cada guía es un archivo Markdown con frontmatter. El sitio usa Astro para generar páginas estáticas rápidas con mínimo JavaScript.

**Stack:**
- **Runtime:** Node 24 LTS (via Corepack + pnpm)
- **Framework:** Astro 6+
- **Language:** TypeScript
- **Content:** Markdown con frontmatter, validado via Astro Content Collections
- **Styling:** Tailwind CSS
- **Package manager:** pnpm

**Team:** Solo developer (proyecto personal)

**Content structure:** 4 belts · 58 guides total
- ⬜ White Belt: Fundamentos (10 guías)
- 🟡 Yellow Belt: La Web y las APIs (16 guías)
- 🟢 Green Belt: Aplicaciones Fullstack (18 guías)
- ⚫ Black Belt: Arquitectura y Operaciones (14 guías)

## Language

- **Commits:** Inglés (Conventional Commits)
- **Docs, specs, proposals:** Español
- **Código fuente:** Inglés (variables, funciones, componentes)
- **Contenido de guías:** Español neutro. **Evitar el voceo** ("podés", "tenés", "hacé") — usar "puedes", "tienes", "haz". Ocasionalmente se permite una palabra chilena ("bacán", "al tiro", "fome"), pero sin exagerar.

## Folder Structure

```
src/
├── content/
│   └── guides/           # Guías Markdown organizadas por cinturón
│       ├── white-belt/
│       ├── yellow-belt/
│       ├── green-belt/
│       └── black-belt/
├── layouts/              # Layouts Astro reutilizables
├── components/           # Componentes UI
├── pages/                # Rutas y páginas estáticas
└── styles/               # Estilos globales Tailwind
docs/
├── proposal/             # Proposals del proyecto
├── specs/                # Specs de implementación
└── artifacts/            # Artefactos generados (ADRs, diagramas)
```

## Conventions

- **Programación funcional** preferida sobre OOP y abstracciones complejas
- **TDD** — escribir tests antes de implementación
- **Tailwind CSS** para estilos, sin CSS separado
- **CVA + cn** para componentes — usar `class-variance-authority` para variantes y `cn()` (de `src/lib/utils.ts`) para class merging, estilo shadcn
- **Conventional Commits** — `feat:`, `fix:`, `docs:`, `chore:`, etc.
- **Content Collections** — toda guía debe tener schema Zod validado en `src/content.config.ts`
- **Mínimo JavaScript** al cliente — usar Astro islands solo donde se necesite interactividad
- **Accesibilidad** — semántica HTML correcta, aria labels donde aplique
- **Playwright screenshots** — guardar PNGs en `.playwright-mcp/`, no en el project root

## TSDD Workflow

Este proyecto sigue Thin Spec Driven Development (TSDD):

- **Spec-first:** Escribir o actualizar spec antes de implementar. Specs viven en `docs/specs/`.
- **Spec is alive:** Actualizar spec cuando la implementación revela nueva información.
- **Human in the loop:** No trabajar autónomamente en specs — colaborar. Preguntar, proponer, iterar.
- **Context separation:** Specs nunca repiten contexto del proyecto. Asumen este archivo.
- **Artifacts post-implementation:** Generar ADRs, diagramas y contratos después de construir, no antes.
- **Close at the repo:** Cada tarea termina con commit referenciando spec y artefactos.

## Harness Boundaries

### ✅ Always (do without asking)
- Leer archivos del codebase para entender contexto
- Sugerir mejoras a specs durante implementación
- Actualizar comentarios y documentación inline
- Proponer modificar o agregar docs
- Ejecutar `pnpm astro check` y `pnpm build` antes de hacer commit para verificar que no haya errores de tipo ni de compilación

### ⚠️ Ask first (pause and confirm)
- Agregar una nueva dependencia (npm/pnpm)
- Modificar la estructura de `docs/`
- Cambiar configuración de Astro o TypeScript
- Crear un nuevo directorio en el project root

### 🚫 Never (hard stop)
- Agregar dependencias sin aprobación explícita
- Hacer commit sin preguntar primero
- Commit secrets o API keys
- Modificar `.gitignore` sin preguntar
- Force-push o reescribir historial
- Eliminar specs o ADRs existentes sin instrucción explícita
- Marcar un spec como `done` sin que el usuario lo revise y lo diga explícitamente
