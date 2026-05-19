---
title: "Context Engineering: cómo trabajar bien con IA en tu flujo de desarrollo"
description: "Más allá de los prompts básicos: cómo estructurar contexto, crear sistemas de IA y automatizar tu flujo de desarrollo con asistentes inteligentes."
belt: yellow-belt
tags: [ia, context-engineering, prompts, automatizacion, flujo-trabajo]
order: 16
published: true
lastRevision: "2026-05-19"
---

Ya sabes usar la IA para explicar conceptos y generar código básico. Pero hay un nivel superior: **Context Engineering**. No se trata de escribir mejores prompts — se trata de diseñar **sistemas** donde la IA tiene el contexto correcto, en el momento correcto, con las restricciones correctas.

En esta guía vas a aprender a estructurar contexto para IA, crear flujos de trabajo repetibles y automatizar partes de tu desarrollo con asistentes inteligentes.

---

## ¿Qué es Context Engineering?

**Context Engineering** es la disciplina de diseñar, estructurar y gestionar la información que le das a un modelo de IA para que produzca resultados consistentes y de alta calidad.

Un prompt aislado es como una conversación con un desconocido. Context Engineering es como trabajar con un colega que conoce tu proyecto, tus convenciones, tu arquitectura y tus restricciones.

### Los cuatro pilares

1. **Contexto del proyecto:** estructura, tecnologías, convenciones
2. **Contexto de la tarea:** qué estás intentando hacer, qué ya probaste
3. **Contexto del dominio:** reglas de negocio, restricciones técnicas
4. **Contexto de calidad:** estándares, patrones, anti-patrones a evitar

---

## El problema del contexto limitado

Los LLMs tienen un **context window** finito: la cantidad de texto que pueden procesar en una sola conversación. Si tu proyecto tiene 50 archivos y 10,000 líneas de código, no puedes pegarlo todo en un prompt.

### Estrategias para manejar contexto limitado

#### 1. Archivos de contexto

Crea un archivo `CONTEXT.md` o `AGENTS.md` en la raíz de tu proyecto:

```markdown
# Mi Proyecto — Contexto

## Stack
- Frontend: React + TypeScript + Tailwind
- Backend: Hono + TypeScript + PostgreSQL
- Testing: Vitest + Playwright

## Convenciones
- Funciones en inglés, contenido en español
- Programación funcional preferida sobre OOP
- Tailwind para estilos, sin CSS separado
- CVA + cn para componentes

## Estructura
src/
├── components/   # Componentes UI reutilizables
├── pages/        # Rutas y páginas
├── lib/          # Utilidades y configuraciones
└── content/      # Contenido Markdown
```

Copia este archivo al inicio de cada conversación con IA.

#### 2. Contexto por archivo

En vez de pegar todo el proyecto, pega solo los archivos relevantes:

```
Estoy trabajando en src/components/LoginForm.tsx.
Aquí está el código actual:

[pegar archivo]

Necesito agregar validación con Zod.
Aquí está el schema que ya tengo en src/schemas/auth.ts:

[pegar schema]
```

#### 3. Contexto incremental

Empieza con lo general y ve agregando detalle según la IA lo necesite:

```
1. "Tengo una API de tareas con Hono y PostgreSQL"
2. [La IA responde]
3. "Aquí está el endpoint que estoy modificando:" [pegar código]
4. [La IA responde]
5. "El error que me da es:" [pegar error]
```

---

## Sistemas de prompts reutilizables

### Templates de prompts

Crea templates para tareas recurrentes:

```
## Template: Code Review

Revisa este código y evalúa:
1. ¿Hay bugs potenciales?
2. ¿Se pueden mejorar los nombres?
3. ¿Hay código duplicado que se puede extraer?
4. ¿El manejo de errores es adecuado?

Código:
[pegar código]

---

## Template: Generar Tests

Genera tests unitarios para esta función.
Incluye: casos normales, edge cases, casos de error.

Función:
[pegar función]

Framework de testing: [Vitest/Jest/etc]
```

### Prompts de sistema

Algunos LLMs permiten configurar un **system prompt** que se aplica a toda la conversación:

```
Eres un desarrollador senior especializado en TypeScript y PostgreSQL.
Tu estilo es directo y pragmático.
Siempre explica el POR QUÉ, no solo el CÓMO.
Si ves un problema de diseño, menciónalo aunque no te lo pregunten.
Prefiere soluciones simples sobre arquitecturas complejas.
```

---

## Herramientas de Context Engineering

### Cursor / Copilot / Claude Code

Estos editores con IA integrada tienen acceso a tu códigobase:

- **Cursor:** indexa tu proyecto y puede buscar archivos relevantes automáticamente
- **GitHub Copilot:** sugiere código basado en el archivo actual y archivos abiertos
- **Claude Code:** agente CLI que puede leer, editar y ejecutar código en tu proyecto

### Reglas de proyecto

Muchos editores permiten configurar reglas que se aplican automáticamente:

```json
// .cursorrules o .github/copilot-instructions.md
- Usar TypeScript estricto
- Preferir funciones puras sobre clases
- Tailwind para estilos
- Nunca usar any
- Validar inputs con Zod
```

### Skills y agentes

Herramientas más avanzadas permiten crear **skills** — instrucciones especializadas para tareas específicas:

```markdown
# Skill: Database Migration

Cuando el usuario pida crear una migración:
1. Revisar el schema actual de Prisma
2. Identificar los cambios necesarios
3. Generar el SQL de la migración
4. Explicar los riesgos (datos existentes, downtime)
```

---

## Flujo de trabajo con IA

### El ciclo ideal

```
1. Definir la tarea → ¿Qué necesito hacer?
2. Preparar contexto → Archivos relevantes, convenciones, restricciones
3. Prompt inicial → Descripción clara de lo que necesitas
4. Revisar resultado → ¿Funciona? ¿Es correcto? ¿Sigue convenciones?
5. Iterar → Ajustar prompt, agregar contexto, pedir cambios
6. Verificar → Tests, build, lint
7. Integrar → Commit con mensaje descriptivo
```

### Anti-patrones comunes

```
❌ "Hazme una app de tareas"
→ Demasiado vago, sin contexto, sin restricciones

❌ [Pegar 20 archivos sin contexto]
→ La IA no sabe qué mirar ni qué hacer

❌ [Copiar la primera respuesta sin revisar]
→ Puede tener bugs, no seguir convenciones, o ser inseguro

✅ "Necesito agregar autenticación JWT a mi API de Hono.
   Aquí está el archivo de rutas actual y el schema de usuarios.
   Usa el paquete 'hono/jwt'. No modifiques la estructura de la BD."
→ Contexto específico, restricciones claras, archivos relevantes
```

---

## Automatización con IA

### Scripts generados por IA

```bash
# Pídele a la IA que genere scripts para tareas repetitivas
# "Genera un script que encuentre todos los archivos .ts sin tests asociados"

#!/bin/bash
for file in $(find src -name "*.ts" -not -name "*.test.ts"); do
    test_file="${file%.ts}.test.ts"
    if [ ! -f "$test_file" ]; then
        echo "Sin test: $file"
    fi
done
```

### CI/CD asistido por IA

```yaml
# "Genera un workflow de GitHub Actions para mi proyecto Hono + PostgreSQL"
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_PASSWORD: test
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm test
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test
```

---

## Por qué importa

Context Engineering es la diferencia entre:

- **IA como juguete:** "explícame qué es un array" → respuesta genérica
- **IA como herramienta:** "revisa mi implementación de binary search en TypeScript, aquí está el código y los tests que fallan" → feedback específico y accionable

El developer que domina Context Engineering es 5-10x más productivo que el que solo escribe prompts básicos.

---

## La IA y Context Engineering

### Lo bueno

- **La IA puede ayudarte a mejorar tu Context Engineering:** pídele que analice tu proyecto y genere un archivo de contexto.
- **Iteración rápida:** si el contexto no es suficiente, la IA te dice qué más necesita.
- **Automatización:** la IA genera scripts, configs y workflows basados en tu contexto.

### Lo que no debes hacer

- **No compartas contexto con datos sensibles** (API keys, passwords, datos de usuarios).
- **No asumas que la IA recuerda contexto entre sesiones.** Cada conversación empieza de cero.
- **No delegues decisiones arquitectónicas al contexto solo.** El contexto informa, pero tú decides.

---

## Desafío: crea tu sistema de contexto

**Objetivo:** construir un sistema de contexto para tu proyecto.

**Tu tarea:**

1. Crea un archivo `CONTEXT.md` en tu proyecto con:
   - Stack tecnológico
   - Convenciones de código
   - Estructura de carpetas
   - Comandos esenciales
2. Crea 3 templates de prompts para tareas que haces frecuentemente (ej: crear componente, agregar endpoint, escribir tests)
3. Configura reglas de proyecto en tu editor (.cursorrules, copilot-instructions, etc.)
4. Usa tu sistema de contexto en una tarea real y evalúa si mejoró la calidad de las respuestas

**Bonus:** crea un skill personalizado para una tarea específica de tu proyecto.

---

## Para seguir explorando

- **[Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)** — guía sobre agentes de IA.
- **[Prompt Engineering Guide](https://www.promptingguide.ai/)** — técnicas avanzadas de prompting.
- **[Cursor Documentation](https://docs.cursor.com/)** — cómo funciona el contexto en Cursor.

---

## Resumen

- **Context Engineering** es diseñar sistemas de contexto para IA, no solo escribir prompts.
- Los **cuatro pilares** son: contexto del proyecto, de la tarea, del dominio y de calidad.
- **Archivos de contexto** (`CONTEXT.md`, `AGENTS.md`) dan a la IA la información base de tu proyecto.
- Los **templates de prompts** reutilizan estructuras para tareas recurrentes.
- El **contexto incremental** (empezar general, agregar detalle) es más efectivo que pegar todo de una vez.
- **Herramientas como Cursor, Copilot y Claude Code** automatizan la gestión de contexto.
- El developer que domina Context Engineering es significativamente más productivo.

Con esto completas el Yellow Belt. En el Green Belt vamos a construir aplicaciones fullstack reales: frameworks, autenticación, bases de datos, testing y deployment.
