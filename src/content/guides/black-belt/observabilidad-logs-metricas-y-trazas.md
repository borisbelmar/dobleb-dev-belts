---
title: "Observabilidad: logs, métricas y trazas"
description: "Los tres pilares de la observabilidad: saber qué pasa, por qué pasa y dónde falla en producción."
belt: black-belt
tags: [observabilidad, logs, metricas, trazas, monitoreo, produccion]
order: 9
published: true
lastRevision: "2026-05-19"
---

Tu app está lenta. Los usuarios se quejan. ¿Dónde está el problema? ¿La base de datos? ¿El backend? ¿El frontend? ¿La red? Sin observabilidad, estás adivinando. Con observabilidad, sabes exactamente dónde mirar.

---

## Los tres pilares

### 1. Logs: qué pasó

Registro de eventos con timestamp:

```json
{"timestamp": "2026-05-19T10:30:00Z", "level": "error", "message": "Query timeout", "query": "SELECT * FROM tareas", "duration_ms": 30000, "userId": 42}
```

**Herramientas:** CloudWatch Logs, Loki, Datadog Logs.

### 2. Métricas: cómo está el sistema

Números agregados en el tiempo:

```
CPU: 75%
Memoria: 2.1GB / 4GB
Latencia p99: 450ms
Requests/seg: 1200
Error rate: 0.5%
```

**Herramientas:** Prometheus + Grafana, CloudWatch Metrics, Datadog.

### 3. Trazas: cómo fluye una request

Seguimiento completo de una petición a través de servicios:

```
Trace ID: abc123
├── API Gateway → 5ms
├── Lambda (auth) → 12ms
├── Lambda (tareas) → 200ms
│   ├── Query DB → 180ms
│   └── Cache miss → 5ms
└── Response → 3ms
Total: 220ms
```

**Herramientas:** Jaeger, AWS X-Ray, Datadog APM.

---

## Implementación práctica

### Logging estructurado

```typescript
// En vez de console.log
import pino from "pino";

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport: { target: "pino-pretty" },
});

logger.info({ userId: 42, action: "create_task" }, "Tarea creada");
logger.error({ error: err, query: sql }, "Query falló");
```

### Métricas con Prometheus

```typescript
import { Registry, Counter, Histogram } from "prom-client";

const requestCount = new Counter({
    name: "http_requests_total",
    help: "Total de requests HTTP",
    labelNames: ["method", "path", "status"],
});

const requestDuration = new Histogram({
    name: "http_request_duration_seconds",
    help: "Duración de requests en segundos",
    labelNames: ["method", "path"],
    buckets: [0.1, 0.5, 1, 2, 5],
});

// Middleware
app.use("*", async (c, next) => {
    const start = Date.now();
    await next();
    const duration = (Date.now() - start) / 1000;
    requestCount.labels({ method: c.req.method, path: c.req.path, status: c.res.status }).inc();
    requestDuration.labels({ method: c.req.method, path: c.req.path }).observe(duration);
});
```

### Trazas distribuidas

```typescript
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("mi-api");

app.post("/tareas", async (c) => {
    return tracer.startActiveSpan("crear-tarea", async (span) => {
        span.setAttribute("user.id", userId);

        const result = await tracer.startActiveSpan("db-insert", async (dbSpan) => {
            dbSpan.setAttribute("db.query", "INSERT INTO tareas");
            return await db.tareas.create({ data });
        });

        span.setAttribute("tarea.id", result.id);
        return c.json(result, 201);
    });
});
```

---

## Alertas inteligentes

```yaml
# Alertas basadas en SLOs
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.01
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Error rate > 1% por 5 minutos"

- alert: HighLatency
  expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 1
  for: 10m
  labels:
    severity: warning
  annotations:
    summary: "P99 latency > 1s por 10 minutos"
```

---

## Por qué importa

Sin observabilidad, estás operando a ciegas. Con observabilidad, sabes exactamente qué pasa, dónde y por qué.

---

## La IA y observabilidad

### Lo bueno
- **Analizar logs:** la IA encuentra patrones en logs que tú no ves.
- **Sugerir alertas:** la IA recomienda thresholds basados en tu tráfico normal.
- **Explicar trazas:** la_IA identifica el bottleneck en una traza distribuida.

### Lo que no debes hacer
- **No loguees datos sensibles.** Emails, passwords, tokens nunca en logs.
- **No alertes por todo.** Alert fatigue es real — solo alerta lo que requiere acción.

---

## Desafío: instrumenta tu app

**Objetivo:** agregar observabilidad a tu proyecto.

**Tu tarea:**
1. Agrega logging estructurado con pino o similar
2. Agrega métricas de requests (count, duration, errors)
3. Configura un dashboard con las métricas clave
4. Crea al menos una alerta inteligente

**Bonus:** agrega trazas distribuidas con OpenTelemetry.

---

## Para seguir explorar

- **[OpenTelemetry](https://opentelemetry.io/)**

---

## Resumen

- **Logs:** qué pasó — eventos con timestamp y contexto.
- **Métricas:** cómo está el sistema — números agregados en el tiempo.
- **Trazas:** cómo fluye una request — seguimiento a través de servicios.
- **Alertas inteligentes:** basadas en SLOs, no en thresholds arbitrarios.
- **No loguees datos sensibles** — nunca passwords, tokens o emails en logs.

En la próxima guía: **Continuidad operacional y manejo de incidentes** — qué hacer cuando todo se rompe.
