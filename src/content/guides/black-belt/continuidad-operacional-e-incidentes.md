---
title: "Continuidad operacional y manejo de incidentes"
description: "Qué hacer cuando todo se rompe: runbooks, post-mortems, y mantener el sistema vivo a las 3 AM."
belt: black-belt
tags: [incidentes, post-mortem, runbooks, continuidad, operaciones]
order: 10
published: true
lastRevision: "2026-05-19"
---

Son las 3 AM. Tu teléfono suena. La base de datos está al 100% de CPU. Los usuarios no pueden acceder. ¿Qué haces?

Si tienes un plan, resuelves en 15 minutos. Si no, pasas 2 horas en pánico. El **manejo de incidentes** es la disciplina de responder a problemas de producción de forma estructurada.

---

## El ciclo de incidentes

### 1. Detectar

Alertas inteligentes (no alert fatigue):

```
✅ BUENA: "Error rate > 5% por 10 minutos" → requiere acción
❌ MALA: "CPU > 90%" → puede ser normal durante deploys
```

### 2. Responder

```
# Runbook: Base de datos al 100% CPU

1. Verificar queries activas: SELECT * FROM pg_stat_activity WHERE state = 'active';
2. Identificar queries lentas: SELECT query, duration FROM pg_stat_statements ORDER BY duration DESC LIMIT 5;
3. Si hay query rogue: SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE query LIKE '%rogue%';
4. Si no: escalar a DBA
```

### 3. Resolver

- **Rollback:** revertir el deploy que causó el problema
- **Mitigar:** aplicar workaround mientras se resuelve
- **Escalar:** llamar a alguien con más conocimiento

### 4. Aprender

**Post-mortem** sin culpa:

```markdown
# Post-Mortem: Incidente INC-2026-042

**Fecha:** 2026-05-19 03:15 UTC
**Duración:** 45 minutos
**Impacto:** 200 usuarios afectados, 15% de requests fallaron

## Qué pasó
Un deploy de la API introdujo una query sin índice en la tabla de tareas (500K filas).

## Por qué pasó
La migración agregó una columna nueva pero no el índice correspondiente. Los tests no cubrieron este caso porque usaron datos de prueba pequeños.

## Cómo lo resolvimos
1. Identificamos la query lenta en pg_stat_statements
2. Agregamos el índice manualmente
3. CPU volvió a niveles normales en 5 minutos

## Cómo prevenirlo
- [ ] Agregar EXPLAIN ANALYZE en el CI para queries nuevas
- [ ] Tests con dataset de producción (anonymizado)
- [ ] Review de migraciones por DBA antes de deploy
```

---

## Runbooks: guías de emergencia

Un **runbook** es una guía paso a paso para resolver problemas comunes:

```markdown
# Runbook: API no responde

## Síntomas
- Health check falla
- 502 Bad Gateway en CloudFront

## Pasos
1. Verificar si el proceso está corriendo: `pm2 status`
2. Si no: `pm2 restart api`
3. Verificar logs: `pm2 logs api --lines 100`
4. Si hay error de BD: verificar conexión `psql -h db -U postgres -c "SELECT 1"`
5. Si DB no responde: reiniciar RDS desde AWS Console
6. Si nada funciona: rollback al deploy anterior

## Escalamiento
- Si no se resuelve en 15 min → llamar a [Nombre]
- Si afecta a > 50% de usuarios → declarar incidente crítico
```

---

## SLA, SLO y SLI

| Término | Qué es | Ejemplo |
|---------|--------|---------|
| **SLI** | Métrica actual | Latencia p99 = 200ms |
| **SLO** | Objetivo | Latencia p99 < 500ms |
| **SLA** | Contrato con usuario | 99.9% uptime mensual |

### Error Budget

```
SLO: 99.9% uptime = 43 minutos de downtime permitido por mes
Downtime usado: 15 minutos
Error budget restante: 28 minutos
```

Si el error budget se acaba, se congela el deploy de nuevas features hasta mejorar la estabilidad.

---

## Por qué importa

Los incidentes son inevitables. La diferencia entre un incidente de 15 minutos y uno de 4 horas es tener procesos definidos.

---

## La IA y manejo de incidentes

### Lo bueno
- **Generar runbooks:** describe el problema y la IA genera el runbook.
- **Analizar post-mortems:** la IA identifica patrones en incidentes pasados.
- **Sugerir acciones:** durante un incidente, la_IA sugiere pasos basados en los síntomas.

### Lo que no debes hacer
- **No confíes en la IA durante un incidente crítico.** Sigue tus runbooks.
- **No escribas post-mortems con IA sin revisar.** El contexto humano es esencial.

---

## Desafío: prepara tu plan de incidentes

**Objetivo:** crear runbooks y post-mortems para tu proyecto.

**Tu tarea:**
1. Escribe un runbook para "API no responde"
2. Escribe un runbook para "Base de datos lenta"
3. Simula un incidente y escribe un post-mortem
4. Define SLIs y SLOs para tu app

**Bonus:** configura alertas basadas en error budget.

---

## Para seguir explorar

- **[Google SRE Book](https://sre.google/sre-book/table-of-contents/)** — gratuito online.

---

## Resumen

- **Detectar → Responder → Resolver → Aprender** es el ciclo de incidentes.
- **Runbooks** son guías paso a paso para problemas comunes.
- **Post-mortems** sin culpa documentan qué pasó y cómo prevenirlo.
- **SLI** es la métrica, **SLO** es el objetivo, **SLA** es el contrato.
- **Error budget** determina cuánto downtime puedes permitirte.

En la próxima guía: **Seguridad aplicada: OWASP, secretos y buenas prácticas** — proteger tu app de ataques reales.
