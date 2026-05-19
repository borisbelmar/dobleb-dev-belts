---
title: "Monolito vs Microservicios vs Serverless: cuándo usar qué"
description: "Tres arquitecturas de deployment, tres trade-offs completamente diferentes. Elige sabiamente."
belt: black-belt
tags: [monolito, microservicios, serverless, arquitectura, deployment]
order: 6
published: true
lastRevision: "2026-05-19"
---

La decisión arquitectónica más importante de tu proyecto no es qué framework usar — es cómo vas a deployar. Monolito, microservicios o serverless determinan tu complejidad operativa, tu costo y tu velocidad de desarrollo por años.

---

## Monolito

Todo en un solo proceso, un solo deploy.

```
┌──────────────────────────────────┐
│         Monolito                 │
│  Frontend + Backend + DB access  │
│         Un deploy                │
└──────────────────────────────────┘
```

**Cuándo:** equipos pequeños (< 10), producto temprano, dominio no completamente entendido.
**Costo:** bajo (un servidor).
**Complejidad:** baja.

---

## Microservicios

Cada servicio es independiente: su propio deploy, su propia BD.

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Auth   │  │ Pedidos │  │  Users  │
│  Service│  │ Service │  │ Service │
│  + DB   │  │  + DB   │  │  + DB   │
└─────────┘  └─────────┘  └─────────┘
```

**Cuándo:** equipos grandes (> 10), servicios con escalas diferentes, dominios bien definidos.
**Costo:** alto (múltiples servidores, infraestructura).
**Complejidad:** alta (service discovery, distributed tracing, eventual consistency).

---

## Serverless

Cada función se ejecuta on-demand, sin gestionar servidores.

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Lambda  │  │  Lambda  │  │  Lambda  │
│  /auth   │  │ /pedidos │  │  /users  │
└──────────┘  └──────────┘  └──────────┘
     ↑             ↑             ↑
         API Gateway
```

**Cuándo:** cargas impredecibles, eventos, procesamiento asíncrono, equipos que no quieren operar infraestructura.
**Costo:** bajo en tráfico bajo, alto en tráfico constante.
**Complejidad:** media (cold starts, debugging difícil, vendor lock-in).

---

## Comparación directa

| | Monolito | Microservicios | Serverless |
|---|---|---|---|
| **Complejidad** | Baja | Alta | Media |
| **Costo bajo tráfico** | Bajo | Alto | Bajo |
| **Costo alto tráfico** | Medio | Alto | Muy alto |
| **Escalabilidad** | Vertical | Horizontal | Automática |
| **Deploy** | Simple | Complejo | Simple |
| **Debugging** | Fácil | Difícil | Difícil |
| **Team size ideal** | 1-10 | 10+ | Cualquiera |
| **Vendor lock-in** | Ninguno | Bajo | Alto |

---

## Regla práctica

1. **Empieza con monolito.** Casi siempre es la respuesta correcta al inicio.
2. **Split cuando duela.** Cuando el monolito sea demasiado grande o lento, splita servicios.
3. **Serverless para eventos.** Webhooks, procesamiento de archivos, tareas programadas.

---

## Por qué importa

Elegir mal la arquitectura de deployment puede significar meses de trabajo en infraestructura que no necesitas, o un monolito que no escala cuando lo necesitas.

---

## La IA y arquitectura

### Lo bueno
- **Evaluar trade-offs:** la IA compara opciones para tu caso específico.
- **Generar configs:** la IA crea infraestructura como código para cualquier opción.

### Lo que no debes hacer
- **No elijas microservicios porque está de moda.** La complejidad es real.
- **No asumas que serverless es más barato.** Con tráfico constante, es más caro.

---

## Desafío: evalúa tu arquitectura

**Objetivo:** elegir la arquitectura correcta para tu proyecto.

**Tu tarea:**
1. Evalúa tu equipo, tráfico esperado y complejidad del dominio
2. Elige una arquitectura con argumentos
3. Escribe un ADR con tu decisión
4. Planifica cómo migrarías si cambias de arquitectura en el futuro

**Bonus:** diseña los límites de servicios si eliges microservicios.

---

## Para seguir explorar

- **[Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)** — Martin Fowler.

---

## Resumen

- **Monolito:** simple, barato, ideal para equipos pequeños y productos tempranos.
- **Microservicios:** escalable, independiente, pero complejo y caro.
- **Serverless:** auto-escalable, sin infraestructura, pero vendor lock-in y caro a escala.
- **Empieza con monolito**, split cuando duela, usa serverless para eventos.

En la próxima guía: **AWS para desarrolladores: los servicios que realmente necesitas** — sin el ruido de los 200+ servicios.
