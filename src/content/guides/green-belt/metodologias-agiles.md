---
title: "Metodologías ágiles: Agile, Scrum y XP en la práctica"
description: "Cómo organizar trabajo en equipo: sprints, backlog, retrospectivas y entrega continua de valor."
belt: green-belt
tags: [agile, scrum, xp, metodologias, equipo]
order: 16
published: true
lastRevision: "2026-05-19"
---

Puedes escribir el mejor código del mundo, pero si entregas la funcionalidad equivocada o seis meses tarde, no sirve de nada. Las metodologías ágiles no son sobre código — son sobre **entregar valor al usuario de forma iterativa**.

En esta guía vas a entender Agile, Scrum y XP en la práctica real, no en teoría de consultora.

---

## Agile: el manifiesto

En **2001**, 17 desarrolladores se reunieron en Utah y escribieron el **Manifiesto Ágil**:

> Valoramos más:
> - **Individuos e interacciones** sobre procesos y herramientas
> - **Software funcionando** sobre documentación exhaustiva
> - **Colaboración con el cliente** sobre negociación contractual
> - **Respuesta al cambio** sobre seguir un plan

No dicen que lo de la derecha no importe. Dicen que lo de la izquierda importa **más**.

---

## Scrum: el framework más popular

### Roles

- **Product Owner:** decide QUÉ construir (prioriza el backlog)
- **Scrum Master:** facilita el proceso (elimina bloqueos)
- **Equipo de desarrollo:** construye el producto (3-9 personas)

### Eventos

| Evento | Duración | Propósito |
|--------|----------|-----------|
| **Sprint** | 1-4 semanas | Iteración de trabajo |
| **Sprint Planning** | 2-4 horas | Planificar el sprint |
| **Daily** | 15 min | Sincronizar equipo |
| **Review** | 1-2 horas | Demostrar lo construido |
| **Retrospectiva** | 1-2 horas | Mejorar el proceso |

### Artefactos

- **Product Backlog:** lista priorizada de todo lo que se podría hacer
- **Sprint Backlog:** lo que el equipo se compromete a hacer en este sprint
- **Incremento:** el software funcionando al final del sprint

---

## XP (Extreme Programming): prácticas técnicas

Scrum dice QUÉ hacer; XP dice CÓMO hacerlo:

- **TDD:** tests antes del código
- **Pair Programming:** dos personas, una computadora
- **Integración continua:** merge varias veces al día
- **Refactoring:** mejorar código sin cambiar comportamiento
- **Simple Design:** la solución más simple que funcione
- **Collective Ownership:** cualquiera puede modificar cualquier código

---

## Agile en la práctica real

### Un sprint típico

```
Lunes (Planning):
- PO presenta las historias prioritarias
- Equipo estima esfuerzo (puntos de historia)
- Se comprometen a X historias para el sprint

Martes-Jueves (Desarrollo):
- Daily de 15 min: ¿qué hice? ¿qué haré? ¿qué me bloquea?
- Desarrollo con TDD, pair programming, CI

Viernes (Review + Retro):
- Demo: mostrar lo construido al PO
- Retro: ¿qué funcionó? ¿qué no? ¿qué cambiamos?
```

### Estimación con puntos de historia

No estimas en horas. Estimas en **complejidad relativa**:

- **1 punto:** trivial (cambiar un texto)
- **2 puntos:** simple (agregar un campo al formulario)
- **3 puntos:** medio (crear un endpoint CRUD)
- **5 puntos:** complejo (sistema de autenticación)
- **8 puntos:** muy complejo (integración con sistema externo)
- **13 puntos:** demasiado grande — hay que dividirlo

La **velocidad** del equipo es cuántos puntos completan por sprint. Si tu velocidad es 20 puntos/sprint y el backlog tiene 100 puntos, necesitas ~5 sprints.

---

## Por qué importa

Agile te ayuda a:
- **Entregar valor temprano:** software funcionando cada 2 semanas
- **Adaptarte al cambio:** si el usuario cambia de opinión, el próximo sprint lo refleja
- **Mejorar continuamente:** la retrospectiva hace que el equipo mejore cada sprint

---

## La IA y metodologías ágiles

### Lo bueno
- **Generar historias de usuario:** describe la funcionalidad y la IA escribe la historia con criterios de aceptación.
- **Sugerir estimaciones:** la IA ayuda a comparar complejidad relativa.
- **Crear agendas de retrospectiva:** la IA sugiere formatos de retro.

### Lo que no debes hacer
- **No dejes que la IA priorice tu backlog.** Solo el PO conoce el negocio.
- **No confundas velocidad con productividad.** Más puntos ≠ más valor.

---

## Desafío: planifica un sprint

**Objetivo:** simular un sprint planning para tu proyecto.

**Tu tarea:**
1. Escribe 5-8 historias de usuario para tu app con criterios de aceptación
2. Estima cada una en puntos de historia
3. Define qué entra en un sprint de 2 semanas basado en tu capacidad
4. Escribe una agenda de retrospectiva

**Bonus:** implementa CI/CD para que cada merge a main deploye automáticamente.

---

## Para seguir explorando

- **[Scrum Guide](https://scrumguides.org/)** — la guía oficial.
- **[Extreme Programming Explained](https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)** — Kent Beck.

---

## Resumen

- **Agile** valora individuos, software funcionando, colaboración y respuesta al cambio.
- **Scrum** organiza trabajo en sprints con roles, eventos y artefactos definidos.
- **XP** define prácticas técnicas: TDD, pair programming, CI, refactoring.
- **Puntos de historia** estiman complejidad relativa, no horas.
- **Velocidad** mide cuántos puntos completa el equipo por sprint.
- **Retrospectiva** es el evento más importante: mejora continua del proceso.

En la próxima guía: **CI/CD: integración y despliegue continuo** — automatiza tu pipeline de entrega.
