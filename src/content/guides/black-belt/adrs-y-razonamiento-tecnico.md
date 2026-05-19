---
title: "Decisiones arquitectónicas: ADRs y razonamiento técnico"
description: "Documenta por qué tomaste cada decisión técnica con Architecture Decision Records: contexto, opciones y consecuencias."
belt: black-belt
tags: [adr, arquitectura, documentacion, decisiones, equipo]
order: 1
published: true
lastRevision: "2026-05-19"
---

Seis meses después de elegir PostgreSQL sobre MongoDB, un nuevo desarrollador pregunta: "¿por qué usamos Postgres?" Nadie lo recuerda. La persona que tomó la decisión se fue. El equipo pierde horas evaluando si migrar.

Los **ADRs** (Architecture Decision Records) resuelven esto: documentan cada decisión técnica con su contexto, opciones consideradas y consecuencias.

---

## ¿Qué es un ADR?

Un ADR es un documento corto que captura una decisión arquitectónica significativa:

```markdown
# ADR-001: Usar PostgreSQL como base de datos principal

**Estado:** Aceptado
**Fecha:** 2026-01-15
**Contexto:** Necesitamos una base de datos relacional con soporte para transacciones ACID, queries complejas y extensibilidad.

## Opciones consideradas

### PostgreSQL
- ✅ Open source, comunidad activa
- ✅ ACID, transacciones, foreign keys
- ✅ Extensiones (PostGIS, pgvector)
- ❌ Requiere más recursos que SQLite

### MongoDB
- ✅ Schema flexible, bueno para documentos
- ✅ Escala horizontal fácil
- ❌ No ACID por defecto
- ❌ Queries complejas más difíciles

### SQLite
- ✅ Zero config, un archivo
- ✅ Perfecto para desarrollo local
- ❌ No soporta concurrencia alta
- ❌ No escala a producción

## Decisión

PostgreSQL. Necesitamos ACID, concurrencia y la capacidad de escalar. SQLite no escala; MongoDB no garantiza consistencia para nuestro caso de uso (sistema de pagos).

## Consecuencias

- Necesitamos un servidor de BD (costo adicional)
- Migraciones requieren herramienta (Prisma)
- El equipo necesita aprender SQL si no lo sabe
- Beneficio: consistencia de datos garantizada
```

---

## Formato de ADR

```markdown
# ADR-NNN: Título de la decisión

**Estado:** Propuesto | Aceptado | Rechazado | Reemplazado
**Fecha:** YYYY-MM-DD
**Reemplaza:** ADR-NNN (si aplica)
**Contexto:** ¿Qué problema estamos resolviendo? ¿Qué restricciones tenemos?

## Opciones consideradas

### Opción A
- ✅ Pros
- ❌ Contras

### Opción B
- ✅ Pros
- ❌ Contras

## Decisión

Cuál elegimos y por qué.

## Consecuencias

Qué ganamos, qué perdemos, qué riesgos asumimos.
```

---

## Dónde guardar ADRs

```
docs/
└── adr/
    ├── 001-postgresql-como-bd.md
    ├── 002-hono-como-framework.md
    ├── 003-jwt-para-auth.md
    └── 004-monolito-primero.md
```

---

## Cuándo escribir un ADR

- **Cambiar de base de datos**
- **Elegir un framework principal**
- **Decidir entre monolito y microservicios**
- **Cambiar estrategia de autenticación**
- **Adoptar una nueva arquitectura**

**No escribas un ADR para:** nombrar variables, elegir una librería de utilidades, cambiar un color.

---

## Por qué importa

Los ADRs son la memoria institucional de tu equipo. Sin ellos, cada decisión se olvida y se repite el mismo debate años después.

---

## La IA y ADRs

### Lo bueno
- **Generar borradores:** describe la decisión y la IA genera el ADR con opciones y trade-offs.
- **Identificar opciones:** la IA sugiere alternativas que no consideraste.

### Lo que no debes hacer
- **No dejes que la IA decida por ti.** El ADR captura TU decisión con TU razonamiento.
- **No aceptes trade-offs sin verificarlos.** La IA puede inventar desventajas.

---

## Desafío: escribe ADRs para tu proyecto

**Objetivo:** documentar las decisiones arquitectónicas de tu proyecto.

**Tu tarea:**
1. Escribe un ADR para tu elección de base de datos
2. Escribe un ADR para tu framework backend
3. Escribe un ADR para tu estrategia de autenticación
4. Guarda los ADRs en `docs/adr/`

**Bonus:** crea un índice de ADRs con estado y fecha.

---

## Para seguir explorar

- **[ADR GitHub](https://github.com/joelparkerhenderson/architecture-decision-record)** — templates y ejemplos.

---

## Resumen

- **ADRs** documentan decisiones arquitectónicas con contexto, opciones y consecuencias.
- Formato: contexto → opciones → decisión → consecuencias.
- Estados: Propuesto, Aceptado, Rechazado, Reemplazado.
- Se guardan en `docs/adr/` como archivos Markdown.
- Solo para decisiones significativas, no para detalles triviales.

En la próxima guía: **Diagramas de arquitectura: C4, dominio y contexto** — visualizar sistemas complejos.
