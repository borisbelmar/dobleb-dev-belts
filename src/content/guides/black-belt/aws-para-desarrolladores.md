---
title: "AWS para desarrolladores: los servicios que realmente necesitas"
description: "De los 200+ servicios de AWS, solo necesitas conocer 8 para el 95% de tus proyectos."
belt: black-belt
tags: [aws, cloud, infraestructura, deploy, servicios]
order: 7
published: true
lastRevision: "2026-05-19"
---

AWS tiene más de 200 servicios. La mayoría no los necesitas. Para el 95% de los proyectos, con 8 servicios es suficiente.

En esta guía vas a conocer los servicios esenciales de AWS y cómo usarlos juntos.

---

## Los 8 servicios esenciales

### 1. EC2 — Servidores virtuales

Máquinas virtuales en la nube. Tu servidor Linux tradicional.

```bash
# Conectar a una instancia EC2
ssh -i mi-key.pem ubuntu@ec2-xx-xx-xx-xx.compute-1.amazonaws.com
```

**Cuándo:** servidores de uso constante, aplicaciones que necesitan control total.

### 2. RDS — Bases de datos gestionadas

PostgreSQL, MySQL, MariaDB gestionados por AWS. Backups automáticos, patches, multi-AZ.

```
RDS PostgreSQL:
- Endpoint: mi-db.xxxxxx.us-east-1.rds.amazonaws.com:5432
- Multi-AZ: automático
- Backups: automáticos (retención configurable)
```

**Cuándo:** cualquier base de datos relacional en producción.

### 3. S3 — Almacenamiento de objetos

Archivos, imágenes, backups, assets estáticos.

```bash
# Subir archivos
aws s3 cp mi-imagen.png s3://mi-bucket/assets/

# Servir sitio estático
aws s3 website s3://mi-bucket/ --index-document index.html
```

**Cuándo:** archivos estáticos, uploads de usuarios, backups.

### 4. CloudFront — CDN

Distribuye contenido globalmente con baja latencia.

```
Usuario en Chile → CloudFront Edge (Santiago) → S3 (us-east-1)
Usuario en Japón → CloudFront Edge (Tokio) → S3 (us-east-1)
```

**Cuándo:** servir assets estáticos, videos, APIs con caché.

### 5. Lambda — Funciones serverless

Código que se ejecuta on-demand sin gestionar servidores.

```typescript
// Lambda con Node.js
export const handler = async (event: any) => {
    const body = JSON.parse(event.body);
    // Procesar request
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
```

**Cuándo:** webhooks, procesamiento de archivos, APIs de tráfico impredecible.

### 6. API Gateway — API management

Frontend para tus Lambdas o servicios backend.

```
POST /api/tareas → Lambda (crear tarea)
GET /api/tareas → Lambda (listar tareas)
```

**Cuándo:** APIs serverless, throttling, autenticación a nivel de API.

### 7. CloudWatch — Monitoreo

Logs, métricas y alarmas.

```
Métricas: CPU, memoria, latencia, errores
Logs: todos los logs de tus servicios
Alarmas: "CPU > 80% por 5 min" → notificación
```

**Cuándo:** siempre. Sin monitoreo no sabes cuándo algo falla.

### 8. Route 53 — DNS

Dominios y routing.

```
miapp.com → CloudFront (frontend)
api.miapp.com → ALB o Lambda (backend)
```

**Cuándo:** cualquier dominio en AWS.

---

## Arquitectura típica

```
Usuario → Route 53 → CloudFront → S3 (frontend estático)
                              → API Gateway → Lambda (backend)
                                           → RDS (base de datos)
CloudWatch monitorea todo
```

---

## Por qué importa

AWS es el cloud provider más usado. Conocer los servicios esenciales te permite deployar cualquier proyecto.

---

## La IA y AWS

### Lo bueno
- **Generar configs:** la IA crea CloudFormation, Terraform o CDK para tu infraestructura.
- **Explicar servicios:** la IA explica qué hace cada servicio y cuándo usarlo.

### Lo que no debes hacer
- **No dejes buckets S3 públicos sin intención.** Es el error #1 de seguridad en AWS.
- **No ignores los costos.** EC2 y RDS cuestan aunque no los uses.

---

## Desafío: deploya en AWS

**Objetivo:** deployar tu app fullstack en AWS.

**Tu tarea:**
1. Crea una instancia EC2 o usa Lambda + API Gateway
2. Configura RDS PostgreSQL
3. Sube el frontend a S3 + CloudFront
4. Configura Route 53 con tu dominio
5. Configura CloudWatch para monitoreo

**Bonus:** automatiza el deploy con GitHub Actions.

---

## Para seguir explorar

- **[AWS Free Tier](https://aws.amazon.com/free/)** — 12 meses gratis en servicios básicos.

---

## Resumen

- **EC2:** servidores virtuales.
- **RDS:** bases de datos gestionadas.
- **S3:** almacenamiento de objetos.
- **CloudFront:** CDN global.
- **Lambda:** funciones serverless.
- **API Gateway:** gestión de APIs.
- **CloudWatch:** monitoreo y alertas.
- **Route 53:** DNS y dominios.

En la próxima guía: **Kubernetes vs Serverless: orquestación y escala** — cuándo necesitas orquestar contenedores.
