---
title: "Kubernetes vs Serverless: orquestación y escala"
description: "Cuándo necesitas Kubernetes y cuándo Serverless es suficiente. Trade-offs reales, no hype."
belt: black-belt
tags: [kubernetes, serverless, orquestacion, escala, devops]
order: 8
published: true
lastRevision: "2026-05-19"
---

Kubernetes es la herramienta más poderosa para deployar aplicaciones. También es la más compleja. ¿La necesitas? Probablemente no. ¿Cuándo sí? Cuando Serverless no alcanza.

---

## Kubernetes: orquestación de contenedores

Kubernetes (K8s) automatiza el deployment, scaling y operación de contenedores.

### Conceptos clave

```
Cluster
├── Node (servidor)
│   ├── Pod (grupo de contenedores)
│   │   └── Container (tu app)
│   └── Container
├── Service (IP estable para pods)
├── Deployment (gestiona réplicas)
└── Ingress (routing HTTP)
```

### Ejemplo: Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mi-api
  template:
    metadata:
      labels:
        app: mi-api
    spec:
      containers:
        - name: api
          image: mi-registry/mi-api:v1.2.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
```

### Cuándo usar Kubernetes

- **Múltiples servicios** que necesitan orquestación
- **Auto-scaling** granular (por métricas custom)
- **Multi-cloud** o hybrid cloud
- **Equipos de DevOps** dedicados
- **Miles de pods** gestionando

### Cuándo NO usar Kubernetes

- **Un solo servicio:** un servidor o Lambda es suficiente
- **Equipo pequeño:** no tienes quien gestione K8s
- **Presupuesto limitado:** K8s requiere recursos significativos
- **Producto temprano:** valida primero, escala después

---

## Serverless: sin infraestructura

Lambda, Cloud Functions, Cloudflare Workers — código sin gestionar servidores.

### Cuándo usar Serverless

- **Tráfico impredecible:** picos esporádicos
- **Eventos:** webhooks, procesamiento de archivos
- **APIs simples:** CRUD básico
- **Sin equipo de DevOps:** no quieres gestionar infraestructura

### Cuándo NO usar Serverless

- **Latencia crítica:** cold starts agregan 100ms-2s
- **Procesamiento largo:** Lambda tiene límite de 15 min
- **Costo a escala:** con tráfico constante, es más caro que servidores
- **Vendor lock-in:** cada provider tiene su API

---

## Comparación directa

| | Kubernetes | Serverless |
|---|---|---|
| **Complejidad** | Muy alta | Baja |
| **Control** | Total | Limitado |
| **Scaling** | Granular | Automático |
| **Cold starts** | No | Sí |
| **Costo bajo tráfico** | Alto | Bajo |
| **Costo alto tráfico** | Medio | Alto |
| **Team necesario** | DevOps dedicado | Cualquiera |
| **Vendor lock-in** | Bajo | Alto |

---

## Por qué importa

Elegir entre K8s y Serverless determina tu complejidad operativa y costo por años.

---

## La IA y Kubernetes

### Lo bueno
- **Generar manifests:** la IA crea YAMLs de Deployment, Service, Ingress.
- **Debuggear pods:** la IA explica por qué un pod está en CrashLoopBackOff.

### Lo que no debes hacer
- **No uses K8s porque está de moda.** La complejidad es real.
- **No ignores los resource limits.** Sin limits, un pod puede consumir todo el cluster.

---

## Desafío: elige tu infraestructura

**Objetivo:** elegir entre K8s y Serverless para tu proyecto.

**Tu tarea:**
1. Evalúa tu tráfico esperado, equipo y presupuesto
2. Elige una opción con argumentos
3. Escribe un ADR con tu decisión
4. Diseña la arquitectura de deployment

**Bonus:** crea los manifests de K8s o las funciones serverless para tu app.

---

## Para seguir explorar

- **[Kubernetes Docs](https://kubernetes.io/docs/)**
- **[Serverless Framework](https://www.serverless.com/)**

---

## Resumen

- **Kubernetes** orquesta contenedores con control total pero alta complejidad.
- **Serverless** ejecuta código sin infraestructura pero con cold starts y vendor lock-in.
- K8s para múltiples servicios con equipo de DevOps; Serverless para APIs simples y eventos.
- La mayoría de proyectos no necesitan Kubernetes.

En la próxima guía: **Observabilidad: logs, métricas y trazas** — saber qué pasa en producción.
