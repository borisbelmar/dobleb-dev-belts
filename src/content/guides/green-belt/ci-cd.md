---
title: "CI/CD: integración y despliegue continuo"
description: "Automatiza tests, builds y deploys con GitHub Actions: cada push a main deploya automáticamente."
belt: green-belt
tags: [ci-cd, github-actions, automatizacion, deployment, devops]
order: 17
published: true
lastRevision: "2026-05-19"
---

Cada vez que haces push, alguien (o algo) debería verificar que tu código compila, los tests pasan y el deploy funciona. Si lo haces manualmente, eventualmente te vas a olvidar. **CI/CD** automatiza todo esto.

En esta guía vas a configurar GitHub Actions para tests automáticos en cada PR y deploy automático en cada merge a main.

---

## CI: Integración Continua

Cada push o PR ejecuta tests automáticamente:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - run: pnpm exec prisma generate
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test

      - run: pnpm test
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test

      - run: pnpm build
```

---

## CD: Despliegue Continuo

Después de que los tests pasan, deploya automáticamente:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: test  # Solo si los tests pasan

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to server
        run: |
          # SSH al servidor y deploy
          ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} << 'EOF'
            cd /opt/mi-app
            git pull
            docker compose pull
            docker compose up -d
            docker compose logs --tail=50
          EOF
```

---

## Pipeline completo

```
push → CI (lint + test + build) → ¿Pasa? → CD (deploy) → ¿Funciona? → Notificar
  ↓                                    ↓
  PR con check verde              Rollback automático
```

---

## Por qué importa

CI/CD elimina el factor humano en deploys: sin olvidos, sin errores de copy-paste, sin "en mi máquina funciona".

---

## La IA y CI/CD

### Lo bueno
- **Generar workflows:** describe tu stack y la IA genera el YAML de GitHub Actions.
- **Debuggear pipelines:** la IA explica por qué falló un job.

### Lo que no debes hacer
- **No hardcodees secretos en el YAML.** Usa GitHub Secrets.
- **No deployes sin tests.** CI debe pasar antes que CD.

---

## Desafío: automatiza tu proyecto

**Objetivo:** configurar CI/CD para tu app.

**Tu tarea:**
1. Crea un workflow de CI que ejecute lint, test y build
2. Configura un workflow de CD que deploye al hacer merge
3. Agrega notificaciones de Slack/Discord para deploys

**Bonus:** agrega rollback automático si el health check falla después del deploy.

---

## Para seguir explorar

- **[GitHub Actions Docs](https://docs.github.com/en/actions)**

---

## Resumen

- **CI** ejecuta tests automáticamente en cada push/PR.
- **CD** deploya automáticamente cuando los tests pasan.
- **GitHub Actions** es la herramienta de CI/CD más accesible.
- **Nunca hardcodees secretos** — usa variables de entorno del CI.
- **Deploy sin tests** es un riesgo innecesario.

En la próxima y última guía del Green Belt: **Harness Engineering, Skills y MCPs: IA integrada al desarrollo** — el futuro del desarrollo asistido por IA.
