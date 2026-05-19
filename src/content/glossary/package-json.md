---
term: "package.json"
definition: "El archivo de identidad de un proyecto Node.js que define nombre, versión, dependencias, scripts y configuración del proyecto."
relatedGuides:
  - yellow-belt/introduccion-a-nodejs
  - yellow-belt/introduccion-a-docker
tags: [nodejs, npm, pnpm, configuracion]
lastRevision: "2026-05-19"
---

El **`package.json`** es el archivo central de cualquier proyecto Node.js. Contiene:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Descripción del proyecto",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "packageManager": "pnpm@10.0.0"
}
```

Campos clave:
- **`dependencies`**: paquetes necesarios en producción
- **`devDependencies`**: paquetes solo para desarrollo (tests, linters, TypeScript)
- **`scripts`**: comandos ejecutables con `npm run` o `pnpm run`
- **`packageManager`**: define qué gestor y versión usar (Corepack)

## Ver también

- [Introducción a Node.js, npm y pnpm](/guides/yellow-belt/introduccion-a-nodejs)
- [Introducción a Docker: contenedores sin miedo](/guides/yellow-belt/introduccion-a-docker)
