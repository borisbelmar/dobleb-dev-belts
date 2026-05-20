---
title: "TSDD: Thin Spec Driven Development"
description: "Una metodología para especificar antes de implementar: specs delgados, vivos, y el ciclo completo de spec → código → artefactos → commit."
belt: black-belt
tags: [tsdd, specs, metodologia, desarrollo, proceso]
order: 5
published: true
lastRevision: "2026-05-19"
---

Escribir código sin spec es como construir una casa sin planos. Puedes terminar con algo que se parece a lo que querías, o con un desastre. **TSDD** (Thin Spec Driven Development) es una metodología que pone el spec en el centro del proceso de desarrollo — delgado, vivo, y ejecutable.

---

## Por qué existe TSDD

TSDD nació de una frustración concreta: los frameworks de especificación existentes eran **demasiado rígidos y llenos de artefactos inservibles**. BMAD, Spec Kit, y otras metodologías del mercado imponían ceremonias pesadas, plantillas interminables y documentación que nadie leía. El resultado era siempre el mismo: el equipo abandonaba la metodología después de dos semanas porque el overhead superaba el beneficio.

TSDD se creó con un objetivo claro: **hacer la adopción de specs simple y práctica**. No es un framework. No tiene CLI que instalar. No requiere plantillas obligatorias. Es una brújula — un conjunto de principios y etapas que guían al equipo desde la idea hasta el repositorio. Cada equipo lo implementa como le haga sentido: con agentes de IA, con archivos Markdown, con notas adhesivas. El tooling es irrelevante. El pensamiento es lo que importa.

> **Un spec existe para darle a un agente — humano o IA — todo lo que necesita para ejecutar una tarea correctamente, sin ambigüedad y sin preguntar dos veces.**

---

## Filosofía central

TSDD toma prestado de **Lean Thinking**: eliminar desperdicio, entregar valor temprano, decidir lo más tarde posible pero responsablemente. Un spec lleno de verbosidad de negocio es desperdicio. Un spec lleno de trivia de implementación también lo es. Una decisión que nadie registró es un incidente futuro.

### Principios fundamentales

1. **Human in the loop — siempre.** El desarrollador no es un aprobador al final. Es un colaborador en cada etapa. El agente ejecuta; el humano dirige, refina y valida.

2. **El spec sirve al equipo, no al proceso.** Ningún artefacto de spec debería existir solo para satisfacer una metodología. Si no ayuda al equipo a construir mejor o más rápido, elimínalo.

3. **Decidir lo más tarde posible, pero responsablemente.** No documentes decisiones antes de tener suficiente información para tomarlas bien. La Proposal explora. El Spec decide. Los Artefactos registran.

4. **El ciclo cierra en el repositorio.** Un workflow que termina antes del commit está incompleto. Código, decisiones e historia pertenecen juntos.

5. **Modularidad sobre prescripción.** No cada feature necesita User Stories. No cada tarea necesita un ADR. Las etapas de TSDD son bloques de construcción — usa los que encajen con el contexto.

6. **Los artefactos reflejan la realidad.** Los artefactos generados (diagramas, ADRs, specs) deben describir lo que realmente se construyó, no lo que se imaginó al inicio.

7. **El contexto es infraestructura.** Un Project Context limpio y bien mantenido, y un harness bien diseñado, son prerequisitos, no pensamientos posteriores.

---

## Prerequisitos

TSDD funciona mejor cuando dos disciplinas de ingeniería están en su lugar:

### Context Engineering

Todo agente opera en dos capas distintas:

**Project Context** — conocimiento estable, siempre presente: arquitectura, tech stack, convenciones de código, estructura de carpetas, dependencias, límites del equipo. Vive en `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, o equivalente. Se escribe una vez, se mantiene continuamente. El agente lo lleva a cada tarea.

**Task Context (el Spec)** — contexto específico, temporal, para una sola tarea o feature. Scoped, ligado a la tarea, expira cuando el ciclo cierra.

> **Un Spec nunca repite el Project Context.** Si un Spec explica el stack, el framework o las convenciones del equipo, está cargando grasa que pertenece en otro lugar.

Más allá de estas dos capas, un setup de contexto maduro puede incluir:

| Herramienta | Propósito |
|---|---|
| MCP servers | Dar a los agentes acceso a sistemas externos (repos, docs, databases, APIs) |
| Skills | Comportamientos reutilizables y scoped que el agente puede invocar |
| RAG | Recuperar conocimiento relevante de documentación o codebases grandes |
| Memory banks | Persistir decisiones, patrones y contexto aprendido entre sesiones |
| Artifacts | Outputs de ciclos TSDD previos que informan el siguiente |

> **El contexto es infraestructura. Trátalo como código.** Versionalo, mantenlo, revísalo.

### Harness Engineering

El harness es el cableado que hace el contexto usable. Define:

- **Qué contexto se inyecta** — y cuándo, para qué tipo de tarea
- **Qué herramientas están disponibles** — MCPs, Skills, capacidades scoped por agente o por etapa
- **Límites del agente** — qué puede hacer autónomamente, qué requiere aprobación, qué está prohibido

Un harness práctico usa un modelo de límites de tres niveles:

| Nivel | Significado | Ejemplo |
|---|---|---|
| ✅ Always | Ejecutar sin preguntar | Correr tests antes de commitear |
| ⚠️ Ask first | Pausar y confirmar | Agregar una nueva dependencia, cambiar un schema |
| 🚫 Never | Hard stop | Commitear secrets, modificar CI config, tocar vendor files |

El harness no es parte del Spec. Es parte del entorno operativo del agente — definido una vez a nivel de proyecto, no por tarea.

---

## El workflow

![Diagrama de flujo del workflow TSDD mostrando las 7 etapas: Proposal → User Stories (opcional) → Spec → Implementation → Artifacts → Commit → Merge Request, con el feedback loop de Implementation de vuelta a Spec](/content/guides/tsdd-thin-spec-driven-development/01-tsdd-workflow.png)

*El workflow TSDD: 7 etapas que guían desde la idea hasta el merge. El Spec es el centro — todo fluye hacia él y desde él.*

---

## Las etapas

### 1. Proposal

El punto de partida. Un **artefacto híbrido** — mezcla intención de negocio con pensamiento técnico desde el día uno.

Una Proposal debe responder:
- ¿Qué problema resolvemos, y para quién?
- ¿Cuáles son las principales restricciones técnicas o decisiones pendientes?
- ¿Cómo se ve el sistema a alto nivel? (usar diagramas — Mermaid o equivalente)

Una Proposal **no** es un documento de requisitos. Es un brainstorm estructurado. Termina cuando el equipo tiene suficiente entendimiento compartido para avanzar.

**Output:** Un documento corto con contexto, un diagrama de arquitectura rough, y una lista de decisiones abiertas.

### 2. User Stories *(opcional)*

Usar cuando:
- Un equipo de producto o stakeholders de negocio están involucrados
- El trabajo es suficientemente grande para beneficiarse de descomposición
- Múltiples desarrolladores trabajarán en paralelo

Saltar cuando:
- La tarea es puramente técnica
- El equipo ya comparte contexto completo
- Es un desarrollador solo con un objetivo claro

Estructura:
```
Como [rol], quiero [capacidad], para que [resultado].
Criterios de aceptación: [condiciones testeables]
```

Sin ceremonia. No se requiere Gherkin a menos que el equipo encuentre valor en ello.

### 3. Spec

El **artefacto central** de TSDD. El contrato entre intención y ejecución — escrito para el agente (humano o IA) que lo implementará.

Un Spec bien escrito es:
- **Técnicamente preciso** — define qué necesita construirse a nivel de implementación: estructuras de datos, endpoints, comportamientos, restricciones, edge cases
- **Inequívoco** — un agente leyéndolo no debería necesitar inferir, asumir o hacer preguntas clarificadoras
- **Delimitado** — define scope explícito y exclusiones explícitas
- **Libre de ruido** — sin ensayos de justificación de negocio, sin lenguaje de stakeholder, sin trivia de implementación

Un Spec debe definir:
- **Contexto** — qué problema resuelve y dónde encaja en el sistema (un párrafo máximo)
- **Scope** — qué se construirá, expresado técnicamente
- **Fuera de scope** — exclusiones explícitas para prevenir drift
- **Requisitos técnicos** — modelos de datos, contratos de API, reglas de negocio, restricciones, manejo de errores
- **Criterios de aceptación** — condiciones testeables que definen "done"
- **Preguntas abiertas** — decisiones no resueltas que necesitan tomarse durante la implementación

> **Un Spec no es thin porque sea corto. Es thin porque no carga grasa.**

Un Spec está **vivo**. Se actualiza cuando la implementación revela nueva información. El estado final refleja lo que realmente se construyó — no lo que se imaginó originalmente.

> **Un Spec asume el Project Context. Nunca lo repite.**

**Lo que un Spec no es:**
- Un PRD o documento de requisitos de negocio
- Un documento de diseño con diagramas exhaustivos
- Un resumen de conversación
- Un placeholder para llenar después

### 4. Implementación

Construir contra el Spec. Cuando la realidad diverge del Spec, actualizar el Spec — no abandonarlo en silencio.

Una regla: **mantener el Spec honesto**.

Si la implementación revela que un archivo no listado en el Spec necesita cambios, actualizar la lista de archivos del Spec. Si un criterio de aceptación resulta estar mal, corregirlo. El estado final del Spec debe reflejar lo que realmente se construyó.

### 5. Artefactos

Una vez que la implementación está completa (o en checkpoints significativos), generar artefactos que sirvan al equipo y al futuro.

Los artefactos son **contextuales** — usar lo que la situación pida:

| Situación | Artefacto |
|---|---|
| Se tomó una decisión arquitectónica | ADR (Architecture Decision Record) |
| Se creó un nuevo servicio o módulo | Diagrama de arquitectura |
| Se definió o cambió una API | Contrato de API (OpenAPI, Bruno collection) |
| Se implementó un flujo complejo | Diagrama de secuencia o flujo |
| Decisión de seguridad o compliance | Decision log |

Ninguna situación requiere todos estos. Una puede no requerir ninguno.

### 6. Commit

Escribir un commit message que conecte con el Spec y cualquier artefacto generado.

Seguir [Conventional Commits](https://www.conventionalcommits.org/) o la convención del equipo.

```
feat(auth): implementar rotación de JWT refresh token

Spec: docs/specs/auth-refresh.md
ADR: docs/adr/0012-jwt-rotation-strategy.md
```

### 7. Merge Request

La descripción del MR no es un resumen del diff. Es un resumen de la **intención**, las **decisiones tomadas**, y los **artefactos generados**.

Un MR de TSDD referencia:
- El Spec (o User Story) que implementa
- Cualquier artefacto generado durante el proceso
- Preguntas abiertas o tareas de seguimiento

---

## Skills de TSDD en este proyecto

Este proyecto tiene tres skills especializados que implementan las etapas de TSDD:

### `tsdd-init`
Guía la inicialización de un proyecto con TSDD. Investiga el codebase existente, propone estructura de `docs/`, configura `AGENTS.md`, y recomienda herramientas. Es el punto de entrada cuando quieres empezar un proyecto nuevo o adoptar TSDD en uno existente.

### `spec-writer`
Escribe y mantiene specs — el artefacto central que conecta intención con ejecución. Lee el Project Context, entiende el request, escribe el spec siguiendo convenciones del proyecto, y lo presenta para revisión antes de guardar.

### `spec-implement`
Implementa un spec end-to-end: lee el spec, entiende los archivos afectados, planifica y aplica los cambios, corre validación, actualiza el estado del spec, y cierra el ciclo. Mantiene el spec honesto durante toda la implementación.

La separación entre `spec-writer` y `spec-implement` es intencional: **escribir specs e implementarlos son habilidades distintas**. Mezclarlas produce specs que se parecen a código y código que se parece a specs.

---

## Lo que TSDD no es

- **No es un reemplazo de Agile.** Compatible con Scrum, Kanban, o cualquier otro framework. Opera a nivel de tarea y feature, no a nivel de proceso.
- **No es una herramienta.** No hay CLI que instalar, no hay plataforma para registrarse, no hay plantillas obligatorias. Cualquier editor de texto y un repositorio Git son suficientes.
- **No es waterfall.** El Spec está vivo. Los artefactos se generan post-implementación. Las decisiones se toman lo más tarde posible pero responsablemente.
- **Diseñado para desarrollo agent-driven, no dependiente de él.** Funciona con desarrolladores humanos también. La disciplina es la misma.

---

## Comparación

| | Vibe Coding | BMAD / Spec Kit | **TSDD** |
|---|---|---|---|
| Overhead de spec | Ninguno | Alto | Preciso, sin grasa |
| Tooling requerido | Ninguno | Sí | Ninguno |
| Spec agent-ready | No | Sí | Sí |
| Human in the loop | Reactivo | Approval gates | Colaborador activo |
| Context engineering | Ignorado | Bundled en tool | Prerequisito explícito |
| Harness engineering | Ninguno | Parcial | Prerequisito explícito |
| Cierra en repo | No | Parcial | Sí |
| Funciona sin IA | Sí | No | Sí |
| Fit por tamaño de equipo | Solo | Mediano–Grande | Cualquiera |
| Artefactos | Ninguno | Pre-implementación | Post-implementación |
| Filosofía | Explorar | Prescribir | Orientar |

---

## Por qué importa

TSDD previene:
- **Scope creep:** el spec define qué entra y qué no
- **Malentendidos:** el spec es acuerdo compartido
- **Código sin dirección:** el spec guía la implementación
- **Documentación perdida:** el spec + artefactos = memoria del proyecto
- **Overhead innecesario:** specs delgados, sin ceremonias vacías

---

## La IA y TSDD

### Lo bueno
- **Generar borradores de specs:** describe el problema y la IA genera el spec.
- **Identificar criterios:** la IA sugiere acceptance criteria que no consideraste.
- **Generar artefactos:** la IA crea ADRs y diagramas post-implementación.
- **Mantener el spec honesto:** la IA puede actualizar el spec cuando la implementación revela cambios.

### Lo que no debes hacer
- **No dejes que la IA escriba specs sola.** El spec requiere tu juicio técnico.
- **No implementes sin spec.** La IA puede generar código sin dirección.
- **No confundas el spec con un PRD.** El spec es técnico, no de negocio.
- **No saltes la revisión humana.** La IA ejecuta; tú diriges.

---

## Desafío: spec para tu proyecto

**Objetivo:** escribir un spec TSDD para una funcionalidad nueva.

**Tu tarea:**
1. Identifica un problema en tu proyecto
2. Escribe un spec con contexto, scope, fuera de scope, requisitos técnicos y criterios de aceptación
3. Implementa siguiendo el spec
4. Cierra el spec con artefactos y commit referenciando el spec

**Bonus:** crea un índice de specs con estado y fecha, y configura los tres tiers del harness (Always, Ask first, Never) para tu proyecto.

---

## Para seguir explorando

- Este proyecto usa TSDD — mira `docs/specs/` para ejemplos reales.
- Los skills `spec-writer`, `spec-implement` y `tsdd-init` están disponibles en `.agents/skills/`.
- El `AGENTS.md` de este proyecto es un ejemplo de Project Context bien mantenido.

---

## Resumen

- **TSDD** es una metodología, no un framework. Brújula, no mapa.
- **Spec-first:** escribir spec antes de implementar. Delgado, preciso, inequívoco.
- **Spec is alive:** actualizar cuando la realidad cambia. Mantenerlo honesto.
- **Human in the loop:** el agente ejecuta, el humano dirige. Colaboración activa en cada etapa.
- **Context es infraestructura:** Project Context + Task Context (Spec). Nunca repetir uno en el otro.
- **Harness engineering:** tres tiers de límites (Always, Ask first, Never) definen qué puede hacer el agente.
- **Close at the repo:** commit referenciando el spec, artefactos post-implementación, MR con resumen de intención.
- **Sin overhead innecesario:** specs delgados, artefactos solo cuando aportan valor, cero ceremonias vacías.

En la próxima guía: **Monolito vs Microservicios vs Serverless: cuándo usar qué** — decisiones arquitectónicas de escala.
