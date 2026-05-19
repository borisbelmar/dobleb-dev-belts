---
term: "Docker Compose"
definition: "Una herramienta de Docker que define y ejecuta aplicaciones multi-contenedor usando un archivo YAML."
relatedGuides:
  - yellow-belt/introduccion-a-docker
  - green-belt/dockerizacion-app-fullstack
tags: [docker, compose, multi-contenedor, devops]
lastRevision: "2026-05-19"
---

**Docker Compose** permite definir múltiples servicios contenerizados en un solo archivo `docker-compose.yml`:

```yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://postgres:secreta@db:5432/api
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_PASSWORD: secreta
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Comandos: `docker compose up` (levantar), `docker compose down` (detener), `docker compose logs -f` (ver logs).

## Ver también

- [Introducción a Docker: contenedores sin miedo](/guides/yellow-belt/introduccion-a-docker)
- [Dockerización de una app fullstack](/guides/green-belt/dockerizacion-app-fullstack)
