---
title: "TSDD: Thin Spec Driven Development en la práctica"
description: "Especificar antes de implementar: specs delgados, alive, y el ciclo de spec → código → validación → cierre."
belt: black-belt
tags: [tsdd, specs, metodologia, desarrollo, proceso]
order: 5
published: true
lastRevision: "2026-05-19"
---

Escribir código sin spec es como construir una casa sin planos. Puedes terminar con algo que se parece a lo que querías, o con un desastre. **TSDD** (Thin Spec Driven Development) es escribir specs delgados antes de implementar, actualizarlos cuando la realidad cambia, y cerrar el ciclo con artefactos post-implementación.

---

## Los principios TSDD

### 1. Spec-first

Escribir el spec **antes** de implementar. No después. No "mientras". Antes.

```markdown
# Spec 021: Sistema de notificaciones

**Estado:** proposed
**Fecha:** 2026-05-19

## Problema
Los usuarios no saben cuándo se actualizan sus tareas. Necesitan notificaciones en tiempo real.

## Solución
Agregar WebSockets al backend y un sistema de notificaciones en el frontend.

## Alcance
- WebSocket server en Hono
- Notificaciones de: tarea creada, tarea actualizada, tarea eliminada
- UI de notificaciones en React
- **Fuera de alcance:** notificaciones push, email, SMS

## Criterios de aceptación
- [ ] Cuando se crea una tarea, todos los clientes conectados reciben la notificación
- [ ] Las notificaciones se muestran en un dropdown en el header
- [ ] Las notificaciones no leídas se marcan con un badge
```

### 2. Spec is alive

El spec se actualiza cuando la implementación revela nueva información. No es un documento sagrado — es una guía viva.

### 3. Human in the loop

No trabajar autónomamente. Colaborar en el spec, preguntar, proponer, iterar.

### 4. Thin specs

No repetir contexto del proyecto. No sobre-documentar. Solo lo necesario para guiar la implementación.

### 5. Close at the repo

Cada spec termina con commit, artefactos (ADRs, diagramas) y spec marcado como `done`.

---

## El ciclo TSDD

```
1. Propuesta → ¿Qué problema resolvemos?
2. Spec → ¿Cómo lo resolvemos? (alcance, criterios)
3. Implementación → Código siguiendo el spec
4. Validación → ¿Cumple los criterios de aceptación?
5. Artefactos → ADRs, diagramas, documentación
6. Cierre → Spec done, commit, merge
```

---

## Estructura de specs

```
docs/
├── specs/
│   ├── 001-setup-proyecto.md
│   ├── 002-api-tareas.md
│   ├── 003-frontend-react.md
│   └── ...
└── proposals/
    └── 004-notificaciones.md
```

Cada spec tiene:
- **Estado:** proposed, in-progress, review, done
- **Fecha:** cuándo se escribió
- **Problema:** qué resolvemos
- **Solución:** cómo lo resolvemos
- **Alcance:** qué entra y qué no
- **Criterios de aceptación:** cómo sabemos que está listo

---

## Por qué importa

TSDD previene:
- **Scope creep:** el spec define qué entra y qué no
- **Malentendidos:** el spec es acuerdo compartido
- **Código sin dirección:** el spec guía la implementación
- **Documentación perdida:** el spec + artefactos = memoria del proyecto

---

## La IA y TSDD

### Lo bueno
- **Generar borradores de specs:** describe el problema y la IA genera el spec.
- **Identificar criterios:** la IA sugiere acceptance criteria que no consideraste.
- **Generar artefactos:** la IA crea ADRs y diagramas post-implementación.

### Lo que no debes hacer
- **No dejes que la IA escriba specs sola.** El spec requiere tu juicio técnico.
- **No implementes sin spec.** La IA puede generar código sin dirección.

---

## Desafío: spec para tu proyecto

**Objetivo:** escribir un spec TSDD para una funcionalidad nueva.

**Tu tarea:**
1. Identifica un problema en tu proyecto
2. Escribe un spec con problema, solución, alcance y criterios
3. Implementa siguiendo el spec
4. Cierra el spec con artefactos

**Bonus:** crea un índice de specs con estado y fecha.

---

## Para seguir explorar

- Este proyecto usa TSDD — mira `docs/specs/` para ejemplos reales.

---

## Resumen

- **Spec-first:** escribir spec antes de implementar.
- **Spec is alive:** actualizar cuando la realidad cambia.
- **Human in the loop:** colaborar, no trabajar autónomamente.
- **Thin specs:** solo lo necesario, sin repetir contexto.
- **Close at the repo:** commit, artefactos, spec done.

En la próxima guía: **Monolito vs Microservicios vs Serverless: cuándo usar qué** — decisiones arquitectónicas de escala.
