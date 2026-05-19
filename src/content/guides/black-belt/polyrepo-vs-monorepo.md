---
title: "Polyrepo vs Monorepo: trade-offs reales"
description: "Un repo para todo o un repo por servicio: cuándo cada estrategia funciona y cuándo te sabotea."
belt: black-belt
tags: [monorepo, polyrepo, repositorios, arquitectura, organizacion]
order: 3
published: true
lastRevision: "2026-05-19"
---

¿Un solo repositorio con frontend, backend, shared, infra? ¿O un repo para cada servicio? No hay respuesta correcta — hay trade-offs.

En esta guía vas a entender cuándo cada estrategia funciona y cómo elegir para tu caso.

---

## Monorepo

Todo en un solo repositorio:

```
mi-empresa/
├── apps/
│   ├── web/           # React frontend
│   ├── api/           # Hono backend
│   └── admin/         # Panel admin
├── packages/
│   ├── shared/        # Tipos compartidos
│   ├── ui/            # Componentes UI
│   └── config/        # Configs compartidas
├── infra/             # Terraform, Docker
└── package.json       # Root workspace
```

### Ventajas
- **Cambios atómicos:** un PR que toca frontend y backend
- **Refactoring fácil:** cambiar un tipo compartido afecta todos los usos
- **Un solo CI:** un pipeline para todo
- **Onboarding:** un `git clone` y tienes todo

### Desventajas
- **Repo gigante:** clone lento, IDE pesado
- **Permisos:** todos ven todo (o nadie ve nada)
- **CI lento:** un cambio pequeño puede triggerar builds innecesarios
- **Herramientas:** necesitas Turborepo, Nx o similar

### Herramientas
- **Turborepo:** caching y ejecución paralela
- **Nx:** graph de dependencias, affected detection
- **pnpm workspaces:** gestión de paquetes

---

## Polyrepo

Un repo por servicio:

```
mi-app-web/      # React frontend
mi-app-api/      # Hono backend
mi-app-admin/    # Panel admin
mi-app-shared/   # Tipos compartidos (npm package)
mi-app-infra/    # Terraform, Docker
```

### Ventajas
- **Independencia:** cada equipo trabaja en su repo
- **Permisos granulares:** acceso por repo
- **CI rápido:** solo se ejecuta lo que cambió
- **Deploy independiente:** deployar API sin tocar frontend

### Desventajas
- **Cambios coordinados:** cambiar un tipo compartido requiere PRs en múltiples repos
- **Versionado:** gestionar versiones de paquetes compartidos
- **Onboarding:** clonar múltiples repos
- **Inconsistencia:** cada repo puede tener configs diferentes

---

## Cuándo elegir

| | Monorepo | Polyrepo |
|---|---|---|
| **Equipo pequeño (1-5)** | ✅ Ideal | ✅ También funciona |
| **Equipo grande (10+)** | ⚠️ Necesita herramientas | ✅ Mejor |
| **Servicios acoplados** | ✅ Ideal | ❌ Doloroso |
| **Servicios independientes** | ⚠️ Overkill | ✅ Ideal |
| **Multi-lenguaje** | ⚠️ Complejo | ✅ Natural |
| **Open source** | ⚠️ Todo público | ✅ Control por repo |

---

## Por qué importa

La elección de repo afecta la velocidad del equipo, la facilidad de deploy y la capacidad de escalar.

---

## La IA y repos

### Lo bueno
- **Generar configs:** la IA crea `turbo.json`, `nx.json`, o configs de CI para polyrepo.
- **Migrar entre estrategias:** la IA ayuda a split un monorepo o consolidar polyrepos.

### Lo que no debes hacer
- **No migres sin razón.** Si funciona, no lo toques.
- **No mezcles estrategias sin criterio.** Tener monorepo Y polyrepo sin razón es caos.

---

## Desafío: elige tu estrategia

**Objetivo:** evaluar y elegir la estrategia de repos para tu proyecto.

**Tu tarea:**
1. Lista los servicios/components de tu proyecto
2. Evalúa acoplamiento entre ellos
3. Decide monorepo o polyrepo con argumentos
4. Escribe un ADR con tu decisión

**Bonus:** configura la estrategia elegida (workspaces para monorepo, CI separado para polyrepo).

---

## Para seguir explorar

- **[Monorepo Tools](https://monorepo.tools/)**

---

## Resumen

- **Monorepo:** todo en un repo, cambios atómicos, refactoring fácil, pero repo grande.
- **Polyrepo:** un repo por servicio, independencia, pero cambios coordinados dolorosos.
- Equipos pequeños → monorepo; equipos grandes → polyrepo.
- Servicios acoplados → monorepo; servicios independientes → polyrepo.
- La migración entre estrategias es cara — elige bien desde el inicio.

En la próxima guía: **Next.js: rendering en el servidor y arquitecturas híbridas** — SSR, SSG, ISR y más.
