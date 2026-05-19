---
title: "Estimación, presupuesto y alcance de proyectos"
description: "Cómo planificar proyectos de software sin adivinar: estimación realista, gestión de alcance y presupuestos que no explotan."
belt: black-belt
tags: [estimacion, presupuesto, alcance, planning, gestion]
order: 13
published: true
lastRevision: "2026-05-19"
---

"¿Cuánto tarda?" — "Dos semanas." — Tres meses después, todavía no está listo.

Estimar software es difícil. No porque seamos malos con los números, sino porque **estimamos lo desconocido**. Pero hay técnicas que mejoran significativamente la precisión.

---

## Por qué las estimaciones fallan

1. **Optimismo:** asumimos que todo saldrá bien
2. **Scope creep:** el alcance crece sin control
3. **Dependencias externas:** APIs de terceros, aprobaciones, infraestructura
4. **Interrupciones:** reuniones, bugs urgentes, context switching
5. **Complejidad oculta:** lo que parece simple tiene edge cases

---

## Técnicas de estimación

### Planning Poker

Cada miembro del equipo estima independientemente con la secuencia de Fibonacci: 1, 2, 3, 5, 8, 13, 21.

```
Historia: "Como usuario, quiero filtrar tareas por categoría"

Ana: 3
Boris: 5
Carlos: 8
Diana: 3

→ Hay discrepancia (3 vs 8). Carlos explica su perspectiva: "Necesitamos crear el modelo de categorías, la relación con tareas, el UI del filtro, y la query del backend."
→ Después de discutir, re-estiman: todos acuerdan en 5.
```

### Three-Point Estimation

```
Optimista (O): 2 días
Probable (M): 5 días
Pesimista (P): 12 días

Estimación = (O + 4M + P) / 6
           = (2 + 20 + 12) / 6
           = 5.67 días
```

### Desglose por tareas

```
Feature: Sistema de notificaciones

- WebSocket server: 3 días
- Frontend notification UI: 2 días
- Database schema: 1 día
- Tests: 2 días
- Deploy: 1 día
- Buffer (20%): 2 días
Total: 11 días
```

---

## Gestión de alcance

### El triángulo de hierro

```
       Alcance
      /       \
     /         \
  Tiempo ─── Costo
```

No puedes cambiar uno sin afectar los otros dos:

- **Más alcance** → más tiempo o más costo
- **Menos tiempo** → menos alcance o más costo
- **Menos costo** → menos alcance o más tiempo

### MoSCoW para priorizar

| Prioridad | Significado | Ejemplo |
|-----------|-------------|---------|
| **Must** | Obligatorio | Login, CRUD de tareas |
| **Should** | Importante pero no crítico | Filtros de búsqueda |
| **Could** | Nice to have | Modo oscuro |
| **Won't** | Fuera de este sprint | Integración con Slack |

---

## Presupuestos

### Cómo calcular

```
Costo = (Días estimados × Tarifa diaria) + Infraestructura + Contingencia

Ejemplo:
- Desarrollo: 20 días × $500/día = $10,000
- Infraestructura: $200/mes × 6 meses = $1,200
- Contingencia (20%): $2,240
Total: $13,440
```

### Reglas de oro

1. **Siempre agrega contingencia** (mínimo 20%)
2. **Estima en rangos**, no en números exactos
3. **Re-estima cada sprint** — las estimaciones mejoran con información
4. **Comunica riesgos temprano** — las malas noticias no mejoran con el tiempo

---

## Por qué importa

Estimar bien no es adivinar — es un skill que se mejora con práctica, datos históricos y técnicas estructuradas.

---

## La IA y estimación

### Lo bueno
- **Desglosar tareas:** la_IA ayuda a identificar sub-tareas que no consideraste.
- **Comparar con históricos:** la IA puede analizar estimaciones pasadas vs reales.

### Lo que no debes hacer
- **No aceptes estimaciones de la IA sin cuestionarlas.** La IA no conoce tu equipo ni tu contexto.
- **No uses estimaciones como compromisos.** Son hipótesis, no promesas.

---

## Desafío: estima tu proyecto

**Objetivo:** estimar el alcance y costo de tu próxima feature.

**Tu tarea:**
1. Desglosa la feature en tareas de máximo 2 días
2. Estima cada tarea con three-point estimation
3. Agrega 20% de contingencia
4. Prioriza con MoSCoW
5. Presenta la estimación como rango, no número exacto

**Bonus:** compara tu estimación con el tiempo real que tomó y ajusta tu modelo.

---

## Para seguir explorar

- **[Software Estimation: Demystifying the Black Art](https://www.amazon.com/Software-Estimation-Demystifying-Developer-Practices/dp/0735605351)** — Steve McConnell.

---

## Resumen

- **Estimar es difícil** porque estimamos lo desconocido.
- **Planning Poker** usa estimación independiente para evitar sesgos de grupo.
- **Three-Point Estimation** considera optimista, probable y pesimista.
- **El triángulo de hierro:** alcance, tiempo y costo — cambia uno, afecta los otros.
- **MoSCoW** prioriza: Must, Should, Could, Won't.
- **Siempre agrega contingencia** (mínimo 20%).
- **Estima en rangos**, no en números exactos.

En la próxima y última guía del Black Belt: **Documentación arquitectónica y entrega de valor al cliente** — cerrar el ciclo del desarrollo profesional.
