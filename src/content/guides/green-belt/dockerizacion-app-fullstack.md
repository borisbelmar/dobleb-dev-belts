---
title: "Dockerización de una app fullstack"
description: "Contenedores para frontend, backend y base de datos: docker-compose multi-stage para producción."
belt: green-belt
tags: [docker, fullstack, deployment, compose, produccion]
order: 14
published: true
lastRevision: "2026-05-19"
---

Ya dockerizaste una API simple. Ahora vamos al siguiente nivel: una app fullstack con frontend React, backend Hono, base de datos PostgreSQL y todo orquestado con Docker Compose.

En esta guía vas a crear Dockerfiles de producción para cada servicio y un docker-compose que los levante todos.

---

## Estructura del proyecto

```
mi-app-fullstack/
├── frontend/           # React + Vite
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── backend/            # Hono + Prisma
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── docker-compose.yml
└── .env
```

---

## Frontend Dockerfile (multi-stage)

```dockerfile
# frontend/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# frontend/nginx.conf
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://backend:3000/;
        proxy_set_header Host $host;
    }
}
```

Nginx sirve los archivos estáticos y hace proxy de `/api/` al backend.

---

## Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm exec prisma generate
RUN pnpm build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Docker Compose

```yaml
# docker-compose.yml
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:secreta@db:5432/app
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_PASSWORD: secreta
      POSTGRES_DB: app
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

---

## Variables de entorno en producción

```
# .env (no commitear)
JWT_SECRET=super-secreto-generado-con-openssl-rand-hex-32
DATABASE_URL=postgres://postgres:secreta@db:5432/app
```

```bash
# Generar JWT_SECRET seguro
openssl rand -hex 32
```

---

## Por qué importa

Dockerizar una app fullstack te da consistencia total: mismo entorno en desarrollo, staging y producción.

---

## La IA y Docker fullstack

### Lo bueno
- **Generar Dockerfiles:** la IA crea multi-stage builds para cada servicio.
- **Crear docker-compose:** la IA orquesta múltiples servicios con healthchecks.

### Lo que no debes hacer
- **No commitees .env con secretos.** Usa variables de entorno del sistema o un secrets manager.
- **No expongas puertos de BD en producción.** El `ports: "5432:5432"` es solo para desarrollo.

---

## Desafío: dockeriza tu app fullstack

**Objetivo:** crear Dockerfiles y docker-compose para tu app.

**Tu tarea:**
1. Crea Dockerfile multi-stage para el frontend con Nginx
2. Crea Dockerfile multi-stage para el backend
3. Crea docker-compose con frontend, backend y PostgreSQL
4. Verifica que todo funcione con `docker compose up`

**Bonus:** agrega Redis para caching y un servicio de migraciones.

---

## Para seguir explorando

- **[Docker Compose Docs](https://docs.docker.com/compose/)**

---

## Resumen

- **Multi-stage builds** producen imágenes de producción pequeñas.
- **Nginx** sirve archivos estáticos y hace proxy al backend.
- **Docker Compose** orquesta múltiples servicios con dependencias y healthchecks.
- **Variables de entorno** se gestionan con `.env` (no commitear).
- **Healthchecks** aseguran que los servicios dependientes estén listos antes de iniciar.

En la próxima guía: **Testing: unitario, integración y E2E** — cómo asegurar que tu código funciona.
