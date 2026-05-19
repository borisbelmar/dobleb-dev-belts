---
title: "Diagramas de arquitectura: C4, dominio y contexto"
description: "Visualiza sistemas complejos con el modelo C4: Context, Containers, Components y Code."
belt: black-belt
tags: [c4, diagramas, arquitectura, documentacion, visualizacion]
order: 2
published: true
lastRevision: "2026-05-19"
---

Un diagrama de arquitectura debe responder: ¿qué es este sistema? ¿Cómo se compone? ¿Cómo se comunican las partes? El **modelo C4** responde estas preguntas en cuatro niveles de zoom.

---

## El modelo C4

### Nivel 1: System Context

```
┌──────────────────────────────────────────┐
│           Mi App de Tareas               │
│                                          │
│  Sistema que permite gestionar tareas    │
│  personales con categorías y recordatorios│
└──────────────────────────────────────────┘
         ↑                    ↑
         │                    │
    ┌────────┐          ┌────────┐
    │ Usuario │          │ Email  │
    │ (Persona)│         │ Service│
    └────────┘          └────────┘
```

¿Quién usa el sistema? ¿Qué sistemas externos interactúan?

### Nivel 2: Containers

```
┌──────────────────────────────────────────┐
│           Mi App de Tareas               │
│                                          │
│  ┌─────────┐    HTTP    ┌─────────┐     │
│  │  React  │ ─────────→ │  Hono   │     │
│  │   SPA   │ ←───────── │  API    │     │
│  │ (Browser)│   JSON    │ (Node)  │     │
│  └─────────┘           └────┬────┘     │
│                              │ SQL      │
│                       ┌──────▼──────┐   │
│                       │ PostgreSQL  │   │
│                       │   (Database) │   │
│                       └─────────────┘   │
└──────────────────────────────────────────┘
```

¿Qué tecnologías usa cada parte? ¿Cómo se comunican?

### Nivel 3: Components

```
┌─────────────────────────────────┐
│           Hono API              │
│                                 │
│  ┌──────────┐  ┌─────────────┐ │
│  │  Routes  │→ │  Services   │ │
│  │ (HTTP)   │  │ (Business)  │ │
│  └──────────┘  └──────┬──────┘ │
│                        │        │
│                 ┌──────▼──────┐ │
│                 │ Repositories│ │
│                 │  (Data Acc) │ │
│                 └─────────────┘ │
└─────────────────────────────────┘
```

¿Cómo se organiza el código dentro de cada contenedor?

### Nivel 4: Code

Diagramas de clases o secuencia para componentes críticos. Solo cuando vale la pena.

---

## Herramientas

- **Mermaid:** diagramas como código (se renderiza en GitHub)
- **Structurizr:** herramienta oficial del C4
- **Draw.io:** diagramas manuales

---

## Por qué importa

Los diagramas C4 comunican arquitectura a diferentes niveles de detalle según la audiencia.

---

## La IA y diagramas C4

### Lo bueno
- **Generar Mermaid:** describe tu arquitectura y la IA genera el diagrama C4 en Mermaid.
- **Identificar niveles:** la IA sugiere qué va en cada nivel C4.

### Lo que no debes hacer
- **No diagramas todo el código.** El nivel 4 (Code) rara vez vale la pena.
- **No mantengas diagramas desactualizados.** Un diagrama viejo es peor que ninguno.

---

## Desafío: diagrama tu sistema

**Objetivo:** crear diagramas C4 para tu proyecto.

**Tu tarea:**
1. Diagrama el System Context de tu app
2. Diagrama los Containers con tecnologías
3. Diagrama los Components del backend

**Bonus:** escribe los diagramas en Mermaid y agrégalos a tu repo.

---

## Para seguir explorar

- **[C4 Model](https://c4model.com/)** — sitio oficial.

---

## Resumen

- **C4** tiene 4 niveles: Context, Containers, Components, Code.
- **Context:** quién usa el sistema y qué sistemas externos interactúan.
- **Containers:** tecnologías y comunicación entre partes.
- **Components:** organización interna del código.
- **Code:** solo para componentes críticos.

En la próxima guía: **Polyrepo vs Monorepo: trade-offs reales** — cómo organizar tus repositorios.
