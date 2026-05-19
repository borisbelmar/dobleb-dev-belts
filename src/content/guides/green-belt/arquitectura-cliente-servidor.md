---
title: "Arquitectura cliente–servidor en la práctica"
description: "Cómo se comunican realmente frontend y backend: request/response, CORS, WebSockets, y patrones de comunicación modernos."
belt: green-belt
tags: [arquitectura, cliente-servidor, http, websockets, api]
order: 10
published: true
lastRevision: "2026-05-19"
---

Sabes hacer peticiones HTTP y crear APIs. Pero ¿qué pasa realmente cuando tu React app habla con tu servidor Hono? ¿Por qué CORS bloquea tus requests? ¿Cuándo usar WebSockets en vez de HTTP?

En esta guía vas a entender la arquitectura cliente-servidor en la práctica real, no en teoría abstracta.

---

## El modelo cliente-servidor

```
┌──────────────┐     HTTP/JSON     ┌──────────────┐
│   CLIENTE    │ ────────────────→ │   SERVIDOR   │
│   (React)    │ ←──────────────── │   (Hono)     │
│              │    Response JSON   │              │
│  UI + Estado │                   │  Lógica + BD │
└──────────────┘                   └──────────────┘
```

- **Cliente:** renderiza UI, maneja estado local, envía requests
- **Servidor:** procesa requests, ejecuta lógica, consulta BD, devuelve respuestas
- **HTTP/JSON:** el protocolo de comunicación

---

## CORS: el guardián del navegador

**CORS** (Cross-Origin Resource Sharing) es una política del navegador que bloquea requests entre dominios diferentes.

```
Tu frontend: http://localhost:5173
Tu backend:  http://localhost:3000
→ Mismo localhost, DIFERENTE puerto → Cross-origin → BLOQUEADO sin CORS
```

### Configurar CORS en Hono

```typescript
import { cors } from "hono/cors";

app.use("/api/*", cors({
    origin: ["http://localhost:5173", "https://miapp.com"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Permitir cookies
}));
```

### Errores comunes de CORS

```
❌ Access to fetch at 'http://localhost:3000/api' from origin 'http://localhost:5173'
   has been blocked by CORS policy

✅ Solución: agregar el origen del frontend al CORS del backend
```

---

## WebSockets: comunicación bidireccional

HTTP es request-response: el cliente pide, el servidor responde. ¿Qué pasa cuando el servidor necesita enviar datos al cliente sin que este pida?

**WebSockets** crean un canal bidireccional persistente:

```typescript
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

const clients = new Set<WebSocket>();

app.get("/ws", upgradeWebSocket((c) => ({
    onOpen: (event, ws) => {
        clients.add(ws);
    },
    onMessage: (event, ws) => {
        // Broadcast a todos
        for (const client of clients) {
            client.send(event.data);
        }
    },
    onClose: (event, ws) => {
        clients.delete(ws);
    },
})));
```

### Cuándo usar WebSockets

- **Chat en tiempo real**
- **Notificaciones push**
- **Juegos multiplayer**
- **Dashboards con datos en vivo**

### Cuándo NO usar WebSockets

- **CRUD normal:** HTTP es suficiente
- **Datos que cambian poco:** polling o Server-Sent Events
- **APIs públicas:** HTTP es más simple y universal

---

## Patrones de comunicación

### Request/Response (HTTP)
```
Cliente → GET /api/tareas → Servidor
Cliente ← JSON: { datos: [...] } ← Servidor
```

### Polling
```
Cliente → GET /api/tareas → cada 5 segundos
Cliente ← datos actualizados
```

### Server-Sent Events (SSE)
```
Servidor → stream de eventos → Cliente
(text/event-stream, unidireccional)
```

### WebSockets
```
Cliente ↔ Servidor (bidireccional, persistente)
```

---

## Por qué importa

Entender cómo se comunican cliente y servidor te permite elegir el protocolo correcto, debuggear problemas de CORS y diseñar APIs eficientes.

---

## La IA y arquitectura

### Lo bueno
- **Diseñar APIs:** la IA sugiere endpoints y patrones de comunicación.
- **Debuggear CORS:** la IA explica por qué tu request está bloqueado.

### Lo que no debes hacer
- **No expongas endpoints internos al frontend.** La validación siempre en el servidor.
- **No confíes en datos del cliente.** Siempre valida en el backend.

---

## Desafío: app en tiempo real

**Objetivo:** agregar WebSockets a tu API para notificaciones en tiempo real.

**Tu tarea:**
1. Configura WebSockets en tu servidor Hono
2. Cuando se crea una tarea, notifica a todos los clientes conectados
3. En el frontend, recibe y muestra las notificaciones en tiempo real

**Bonus:** implementa rooms por usuario para notificaciones privadas.

---

## Para seguir explorando

- **[MDN CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)**

---

## Resumen

- **Cliente-servidor:** el cliente renderiza UI, el servidor procesa lógica y datos.
- **CORS** bloquea requests entre orígenes diferentes; configúralo en el backend.
- **WebSockets** permiten comunicación bidireccional en tiempo real.
- **HTTP** es suficiente para CRUD; **WebSockets** para tiempo real.
- **Nunca confíes en datos del cliente** — siempre valida en el servidor.

En la próxima guía: **Arquitectura monolítica: cuándo y cómo** — un solo deploy para todo tu stack.
