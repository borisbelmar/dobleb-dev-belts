---
title: "Introducción a Docker: contenedores sin miedo"
description: "Empaqueta tu aplicación para que corra igual en cualquier máquina. Docker explicado simple, sin jerga de DevOps."
belt: yellow-belt
tags: [docker, contenedores, devops, deployment, infraestructura]
order: 13
published: true
lastRevision: "2026-05-19"
---

"En mi máquina funciona." Es la frase más famosa (y frustrante) del desarrollo de software. Tu app corre perfecto en tu laptop, pero cuando la subes al servidor, explota. Versiones diferentes de Node, dependencias faltantes, variables de entorno distintas.

**Docker** resuelve esto empaquetando tu aplicación con todo lo que necesita: runtime, dependencias, configuración. Si corre en tu Docker, corre en cualquier Docker.

En esta guía vas a entender qué son los contenedores, crear tu primer Dockerfile y dockerizar tu API de Hono.

---

## ¿Qué es Docker?

Docker es una plataforma para crear y ejecutar **contenedores**. Un contenedor es como una mini-computadora dentro de tu computadora: tiene su propio sistema de archivos, sus propias variables de entorno, sus propios procesos. Pero comparte el kernel del sistema operativo host, lo que lo hace mucho más ligero que una máquina virtual.

### Contenedor vs Máquina Virtual

```
┌─────────────────────────┐     ┌─────────────────────────┐
│    Máquina Virtual      │     │      Contenedor         │
├─────────────────────────┤     ├─────────────────────────┤
│       App + Deps        │     │       App + Deps        │
│       Sistema Operativo │     │    Docker Engine        │
│       Hypervisor        │     ├─────────────────────────┤
├─────────────────────────┤     │    Host OS Kernel       │
│       Host OS           │     └─────────────────────────┘
└─────────────────────────┘
```

- **Máquina virtual:** incluye un SO completo (GBs de disco, minutos de boot)
- **Contenedor:** comparte el kernel del host (MBs de disco, segundos de boot)

---

## Conceptos clave

### Imagen

Una **imagen** es una receta empaquetada de tu aplicación. Es inmutable (no cambia) y sirve como plantilla para crear contenedores.

### Contenedor

Un **contenedor** es una instancia en ejecución de una imagen. Puedes crear múltiples contenedores de la misma imagen.

### Dockerfile

Un **Dockerfile** es la receta que le dice a Docker cómo construir la imagen.

### Registry

Un **registry** es donde se guardan las imágenes. El más popular es **Docker Hub** (como npm pero para imágenes).

---

## Tu primer Dockerfile

```dockerfile
# Usar una imagen base de Node.js
FROM node:22-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm y dependencias
RUN corepack enable && pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN pnpm build

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar
CMD ["node", "dist/index.js"]
```

### Explicación línea por línea

- **`FROM node:22-alpine`** — la base es Node.js 22 en Alpine Linux (versión mínima, ~5MB vs ~200MB)
- **`WORKDIR /app`** — crea y entra al directorio `/app`
- **`COPY`** — copia archivos de tu máquina a la imagen
- **`RUN`** — ejecuta comandos durante la construcción
- **`EXPOSE`** — documenta qué puerto usa la app
- **`CMD`** — el comando que se ejecuta al iniciar el contenedor

---

## Construir y ejecutar

```bash
# Construir la imagen
docker build -t api-tareas .

# Ejecutar el contenedor
docker run -p 3000:3000 api-tareas

# Ejecutar en segundo plano
docker run -d -p 3000:3000 --name mi-api api-tareas

# Ver logs
docker logs mi-api

# Detener
docker stop mi-api

# Eliminar
docker rm mi-api
```

**`-p 3000:3000`** mapea el puerto 3000 del contenedor al puerto 3000 de tu máquina.

---

## Docker Compose: múltiples contenedores

Tu API necesita PostgreSQL. En vez de instalar Postgres manualmente, usa **Docker Compose** para definir ambos servicios:

```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:secreta@db:5432/api_tareas
      PORT: "3000"
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_PASSWORD: secreta
      POSTGRES_DB: api_tareas
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

```bash
# Levantar todo
docker compose up

# Levantar en segundo plano
docker compose up -d

# Ver logs
docker compose logs -f

# Detener todo
docker compose down

# Detener y eliminar volumes (pierdes datos)
docker compose down -v
```

**`depends_on` con `condition: service_healthy`** asegura que la API no arranque hasta que PostgreSQL esté listo.

---

## .dockerignore

Como `.gitignore` pero para Docker. Excluye archivos que no deben ir en la imagen:

```
node_modules
dist
.env
.git
.dockerignore
Dockerfile
docker-compose.yml
*.md
```

---

## Multi-stage builds: imágenes más pequeñas

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

El **multi-stage build** usa una imagen para compilar y otra más pequeña para producción. El resultado no incluye TypeScript, devDependencies ni código fuente.

---

## Un poco de historia: de Solomon Hykes a la revolución de los contenedores

![Ilustración de Solomon Hykes presentando Docker en una conferencia de 2013, con el logo de Docker (ballena con contenedores) y contenedores de envío reales como metáfora visual](/content/guides/introduccion-a-docker/01-solomon-hykes-docker.png)

*Solomon Hykes presentando Docker en 2013: la idea que cambió cómo desplegamos software.*

**Solomon Hykes** fundó dotCloud en 2010, una plataforma de hosting. Internamente, usaban **Linux Containers (LXC)** para aislar las aplicaciones de cada cliente. Pero LXC era complejo de usar.

En **2013**, Hykes y su equipo abrieron el código de su herramienta interna como **Docker**. La idea era simple: un contenedor es como un contenedor de envío estándar. No importa qué lleve dentro (software, dependencias, configuración), el contenedor es siempre igual y se puede mover entre barcos, trenes y camiones (servidores, laptops, cloud).

La metáfora no era casual. La industria del shipping revolucionó el comercio mundial en los 1950s con los contenedores estandarizados. Docker quería hacer lo mismo con el software.

Lo logró. Hoy Docker es el estándar de la industria para desarrollo y deployment.

---

## Por qué importa

Docker resuelve el problema más frustrante del desarrollo:

- **Consistencia:** mismo entorno en desarrollo, staging y producción
- **Onboarding:** `docker compose up` y el proyecto funciona, sin instalar nada
- **Aislamiento:** cada proyecto tiene sus propias dependencias sin conflicto
- **Deploy:** la misma imagen que probaste localmente va a producción

---

## La IA y Docker

### Lo bueno

- **Generar Dockerfiles:** describe tu stack y la IA genera el Dockerfile optimizado.
- **Debuggear errores de build:** pega el error de Docker y la IA lo explica.
- **Optimizar imágenes:** la IA sugiere multi-stage builds y Alpine.
- **Crear docker-compose:** la IA genera compose files con múltiples servicios.

### Lo que no debes hacer

- **No copies Dockerfiles sin entender cada instrucción.** Un `COPY . .` sin .dockerinclude mete secrets a la imagen.
- **No expongas puertos de base de datos en producción.** El `ports: "5432:5432"` en compose es para desarrollo local.
- **No uses `latest` como tag de imagen.** `postgres:17-alpine` es específico y reproducible.

---

## Desafío: dockeriza tu proyecto

**Objetivo:** crear Dockerfile y docker-compose para tu API de tareas.

**Tu tarea:**

1. Crea un `.dockerignore` excluyendo `node_modules`, `.env`, `.git`
2. Crea un `Dockerfile` con multi-stage build para tu API
3. Crea un `docker-compose.yml` con tu API y PostgreSQL
4. Ejecuta `docker compose up` y verifica que la API funciona
5. Prueba los endpoints con Bruno o curl
6. Detén con `docker compose down`

**Bonus:** agrega Redis al docker-compose para caching y un servicio de adminer (interfaz web para PostgreSQL).

---

## Para seguir explorando

- **[Docker Documentation](https://docs.docker.com/)** — docs oficiales.
- **[Docker Hub](https://hub.docker.com/)** — registry de imágenes.
- **[Play with Docker](https://labs.play-with-docker.com/)** — Docker gratis en el navegador.
- **[Docker Curriculum](https://docker-curriculum.com/)** — tutorial completo.

---

## Resumen

- **Docker** empaqueta aplicaciones con sus dependencias en **contenedores** que corren igual en cualquier máquina.
- Un **contenedor** es más ligero que una máquina virtual porque comparte el kernel del host.
- El **Dockerfile** es la receta para construir una imagen.
- **Docker Compose** define y ejecuta múltiples contenedores juntos (API + base de datos).
- **Multi-stage builds** producen imágenes de producción más pequeñas.
- `.dockerignore` excluye archivos innecesarios de la imagen.
- Docker fue creado por **Solomon Hykes** en 2013, inspirado en los contenedores de shipping.

En la próxima guía vamos a escribir código limpio: **SOLID y Clean Code: escribir código que se entiende** — principios que hacen tu código mantenible.
