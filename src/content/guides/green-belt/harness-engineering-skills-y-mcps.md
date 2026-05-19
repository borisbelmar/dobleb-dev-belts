---
title: "Harness Engineering, Skills y MCPs: IA integrada al desarrollo"
description: "El futuro del desarrollo: agentes de IA que leen tu código, ejecutan comandos y usan herramientas externas via MCP."
belt: green-belt
tags: [ia, harness, skills, mcp, agentes, automatizacion]
order: 18
published: true
lastRevision: "2026-05-19"
---

Hasta ahora usaste IA como chat: escribes un prompt, recibes una respuesta. Pero hay un nivel superior: **Harness Engineering**, donde la IA no solo conversa — **actúa**. Lee tu código, ejecuta comandos, busca en documentación y usa herramientas externas.

En esta guía vas a entender cómo funcionan los agentes de IA, los Skills y el Model Context Protocol (MCP).

---

## Harness Engineering

Un **harness** es el entorno que rodea al modelo de IA: las herramientas que puede usar, las reglas que sigue, el contexto que tiene acceso.

### Componentes de un harness

```
┌─────────────────────────────────────┐
│           HARNESS                   │
│                                     │
│  ┌───────────┐  ┌───────────────┐  │
│  │  Context  │  │    Skills     │  │
│  │  (código, │  │ (instrucciones│  │
│  │  docs)    │  │  especializ.) │  │
│  └───────────┘  └───────────────┘  │
│                                     │
│  ┌───────────┐  ┌───────────────┐  │
│  │    MCP    │  │   Permisos    │  │
│  │ (tools,   │  │ (qué puede/   │  │
│  │  servers) │  │  no hacer)    │  │
│  └───────────┘  └───────────────┘  │
│                                     │
│         ┌──────────┐               │
│         │   LLM    │               │
│         │ (modelo) │               │
│         └──────────┘               │
└─────────────────────────────────────┘
```

---

## Skills: instrucciones especializadas

Un **Skill** es un conjunto de instrucciones que le dice a la IA cómo comportarse para una tarea específica:

```markdown
# Skill: Database Migration

Cuando el usuario pida crear una migración:
1. Leer el schema actual de Prisma
2. Identificar los cambios necesarios
3. Generar el SQL de la migración
4. Explicar los riesgos (datos existentes, downtime)
5. Nunca ejecutar migraciones en producción sin confirmación
```

Los Skills se guardan en archivos `.md` que el harness lee automáticamente.

---

## MCP: Model Context Protocol

**MCP** es un protocolo estándar que permite a los modelos de IA usar herramientas externas de forma segura:

### Herramientas MCP comunes

- **Filesystem:** leer y escribir archivos
- **GitHub:** crear issues, PRs, revisar código
- **Database:** ejecutar queries SQL
- **Browser:** navegar páginas web
- **Terminal:** ejecutar comandos

### Ejemplo de servidor MCP

```typescript
// Un MCP server que permite consultar documentación
import { McpServer } from "@modelcontextprotocol/sdk";

const server = new McpServer({
    name: "doc-search",
    version: "1.0.0",
});

server.tool("search-docs", {
    query: z.string(),
    library: z.string(),
}, async ({ query, library }) => {
    const docs = await searchDocumentation(library, query);
    return { content: [{ type: "text", text: docs }] };
});
```

---

## Agentes de IA en tu editor

Herramientas como **Cursor**, **Claude Code** y **GitHub Copilot Agent** son harnesses en acción:

- **Leen tu código:** indexan tu proyecto para tener contexto
- **Ejecutan comandos:** `pnpm test`, `git commit`, `docker build`
- **Editan archivos:** aplican cambios directamente en tu código
- **Usan MCP:** consultan documentación, ejecutan queries, navegan web

---

## Por qué importa

Harness Engineering es el futuro del desarrollo. Los developers que entiendan cómo configurar y usar agentes de IA serán significativamente más productivos.

---

## La IA y Harness Engineering

### Lo bueno
- **Automatizar tareas repetitivas:** la IA puede ejecutar flujos completos.
- **Buscar documentación:** MCP permite consultar docs sin salir del editor.
- **Revisar código:** la IA puede analizar PRs automáticamente.

### Lo que no debes hacer
- **No des permos irrestrictos.** Define qué puede y no puede hacer el agente.
- **No confíes ciegamente.** Revisa siempre los cambios que hace el agente.
- **No expongas secrets.** El agente no debe tener acceso a credenciales de producción.

---

## Desafío: configura tu harness

**Objetivo:** crear un Skill personalizado para tu proyecto.

**Tu tarea:**
1. Crea un archivo `SKILL.md` con instrucciones para tu IA
2. Define reglas de código (estilo, convenciones, anti-patrones)
3. Configura un MCP server para consultar documentación de tu stack
4. Prueba el Skill pidiéndole a la IA que realice una tarea

**Bonus:** crea un agente que revise automáticamente los PRs de tu repo.

---

## Para seguir explorar

- **[Model Context Protocol](https://modelcontextprotocol.io/)**
- **[Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)**

---

## Resumen

- **Harness Engineering** es configurar el entorno de IA: contexto, herramientas, reglas.
- **Skills** son instrucciones especializadas para tareas específicas.
- **MCP** permite a la IA usar herramientas externas (filesystem, GitHub, DB, browser).
- **Agentes** leen código, ejecutan comandos y editan archivos automáticamente.
- **Permisos** son esenciales: define qué puede y no puede hacer el agente.

Con esto completas el Green Belt. En el Black Belt vamos a arquitectura, operaciones y negocio: decisiones técnicas que duran años.
