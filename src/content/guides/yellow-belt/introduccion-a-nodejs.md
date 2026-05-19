---
title: "Introducción a Node.js, npm y pnpm"
description: "Ejecuta JavaScript fuera del navegador, instala paquetes de otros y gestiona dependencias como un profesional."
belt: yellow-belt
tags: [nodejs, npm, pnpm, paquetes, backend]
order: 4
published: true
lastRevision: "2026-05-19"
---

JavaScript nació en el navegador. Pero en **2009**, **Ryan Dahl** tuvo una idea: ¿y si JavaScript pudiera ejecutarse en el servidor? Tomó el motor de JavaScript de Chrome (V8), le agregó acceso al sistema de archivos, redes y procesos, y creó **Node.js**.

Hoy Node.js es la base del ecosistema JavaScript moderno. npm (el gestor de paquetes de Node) es el repositorio de paquetes más grande del mundo. Y pnpm es la evolución de npm: más rápido, más eficiente en disco, más confiable.

En esta guía vas a instalar Node.js, crear tu primer script de servidor, y aprender a gestionar paquetes como un profesional.

---

## ¿Qué es Node.js?

Node.js es un **entorno de ejecución** (runtime) para JavaScript fuera del navegador. En el navegador, JavaScript no puede leer archivos ni abrir conexiones de red directamente. Node.js le da esas capacidades.

### Diferencias clave con JavaScript en el navegador

| | Navegador | Node.js |
|---|---|---|
| **Motor** | V8, SpiderMonkey, JavaScriptCore | V8 (Google) |
| **DOM** | ✅ Sí | ❌ No |
| **Sistema de archivos** | ❌ No | ✅ Sí |
| **Redes (servidores)** | ❌ Limitado | ✅ Sí |
| **Módulos** | `<script>` o ES modules | `require()` o `import` |
| **Objeto global** | `window` | `global` |

### Tu primer script de Node.js

```javascript
// hola-node.js
console.log("Hola desde Node.js!");

// Acceder al sistema de archivos
const fs = require("fs");
fs.writeFileSync("saludo.txt", "¡Hola desde Node.js!");
console.log("Archivo creado!");
```

Ejecútalo:

```bash
node hola-node.js
# Hola desde Node.js!
# Archivo creado!
```

### Crear un servidor web

```javascript
// servidor.js
const http = require("http");

const servidor = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
        <h1>Mi primer servidor Node.js</h1>
        <p>URL solicitada: ${req.url}</p>
        <p>Método: ${req.method}</p>
    `);
});

servidor.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
```

Ejecuta `node servidor.js` y abre `http://localhost:3000` en tu navegador.

---

## npm: el gestor de paquetes

**npm** (Node Package Manager) viene incluido con Node.js. Es la herramienta que te permite instalar bibliotecas de otros desarrolladores y publicar las tuyas.

### Inicializar un proyecto

```bash
mkdir mi-proyecto
cd mi-proyecto
npm init -y
```

Esto crea un archivo `package.json`:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

El `package.json` es la **identidad de tu proyecto**: nombre, versión, dependencias, scripts.

### Instalar paquetes

```bash
# Instalar una dependencia de producción
npm install express

# Instalar una dependencia de desarrollo
npm install --save-dev nodemon

# Instalar globalmente
npm install -g typescript
```

Esto crea:
- **`node_modules/`** — donde se instalan los paquetes (puede ser enorme)
- **`package-lock.json`** — congela las versiones exactas para reproducibilidad

### Scripts de npm

Los scripts son comandos que puedes ejecutar con `npm run`:

```json
{
  "scripts": {
    "dev": "nodemon servidor.js",
    "start": "node servidor.js",
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint src/"
  }
}
```

```bash
npm run dev      # Ejecuta nodemon servidor.js
npm start        # Ejecuta node servidor.js (start es especial, no necesita run)
npm run build    # Ejecuta tsc
```

---

## pnpm: la evolución de npm

**pnpm** (performant npm) resuelve los problemas de npm y yarn:

### El problema de npm

npm instala cada paquete en cada proyecto, duplicando archivos. Si tienes 10 proyectos que usan `express`, tienes 10 copias de `express` en disco. Además, `node_modules` puede tener decenas de miles de archivos, lo que lo hace lento.

### La solución de pnpm

pnpm usa un **almacén global** en tu disco. Los paquetes se guardan una sola vez y se referencian con **hard links** desde cada proyecto. Si 10 proyectos usan `express`, hay una sola copia en disco.

```bash
# Instalar pnpm
npm install -g pnpm

# Usar pnpm en vez de npm
pnpm init                    # En vez de npm init
pnpm add express             # En vez de npm install express
pnpm add -D vitest           # En vez de npm install --save-dev vitest
pnpm run dev                 # Igual que npm run dev
```

### Comparación

| | npm | yarn | pnpm |
|---|---|---|---|
| **Velocidad** | Lento | Medio | Rápido |
| **Espacio en disco** | Duplica todo | Duplica todo | Comparte |
| **node_modules** | Plano (phantom deps) | Plano | Estructurado (sin phantom deps) |
| **Reproducibilidad** | package-lock.json | yarn.lock | pnpm-lock.yaml |

**Phantom dependencies:** en npm/yarn, puedes importar un paquete que no está en tu `package.json` pero sí en `node_modules` de otra dependencia. pnpm evita esto con una estructura estricta.

### Corepack: usar pnpm sin instalarlo globalmente

Node.js moderno incluye **Corepack**, que gestiona gestores de paquetes automáticamente:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Ahora `pnpm` funciona sin instalarlo globalmente. El `packageManager` field en `package.json` define qué versión usar:

```json
{
  "packageManager": "pnpm@10.0.0"
}
```

---

## Estructura de un proyecto Node.js

```
mi-proyecto/
├── node_modules/        # Dependencias instaladas (NO commitear)
├── src/                 # Código fuente
│   ├── index.js         # Punto de entrada
│   └── utils/           # Utilidades
├── package.json         # Identidad y dependencias
├── package-lock.json    # Versiones congeladas (npm)
├── pnpm-lock.yaml       # Versiones congeladas (pnpm)
├── .gitignore           # Excluir node_modules
└── README.md            # Documentación
```

### El .gitignore esencial para Node.js

```
node_modules/
.env
dist/
*.log
.DS_Store
```

**Nunca commitees `node_modules/`.** Es enorme, depende del sistema operativo, y se puede regenerar con `pnpm install`.

---

## Módulos: organizar tu código

### CommonJS (el sistema clásico de Node.js)

```javascript
// math.js
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }

module.exports = { sumar, restar };

// app.js
const math = require("./math");
console.log(math.sumar(2, 3));  // 5
```

### ES Modules (el estándar moderno)

```javascript
// math.mjs
export function sumar(a, b) { return a + b; }
export function restar(a, b) { return a - b; }

// app.mjs
import { sumar } from "./math.mjs";
console.log(sumar(2, 3));  // 5
```

Para usar ES Modules en Node.js, agrega `"type": "module"` en `package.json` o usa extensión `.mjs`.

---

## Variables de entorno

Las **variables de entorno** configuran tu aplicación sin hardcodear valores:

```javascript
// Acceder en Node.js
const puerto = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

Se definen en un archivo `.env` (que **nunca** se commitea):

```
PORT=3000
DATABASE_URL=postgres://localhost:5432/mi_db
API_KEY=secreta123
```

Para cargar `.env` automáticamente, usa `dotenv`:

```bash
pnpm add dotenv
```

```javascript
import "dotenv/config";
// Ahora process.env tiene las variables del .env
```

---

## Un poco de historia: de Ryan Dahl a la era de los paquetes

![Retrato de Ryan Dahl presentando Node.js en una conferencia de 2010, con el logo de Node.js y V8 engine de fondo](/content/guides/introduccion-a-nodejs/01-ryan-dahl-nodejs.png)

*Ryan Dahl presentando Node.js: la idea de usar JavaScript en el servidor cambió la industria.*

**Ryan Dahl** creó Node.js en 2009 porque estaba frustrado con las limitaciones de los servidores web de la época. Apache manejaba cada conexión con un hilo separado, lo que limitaba la concurrencia. Dahl quería algo que manejara miles de conexiones simultáneas de forma eficiente.

La clave fue el **event loop**: en vez de crear un hilo por conexión, Node.js usa un solo hilo que procesa eventos asincrónicamente. Cuando una operación tarda (leer un archivo, consultar una base de datos), Node.js no se queda esperando — sigue procesando otras cosas y vuelve cuando la operación termina.

npm nació junto con Node.js y rápidamente se convirtió en el ecosistema de paquetes más grande del mundo. Hoy tiene más de **2 millones de paquetes**. La cultura de "instalar todo como paquete" es tanto una fortaleza como un riesgo: dependemos de código escrito por desconocidos.

**Isaac Z. Schlueter** creó npm en 2010 y lo mantuvo hasta 2019. Su visión era que compartir código debería ser trivial, y lo logró.

---

## Por qué importa

Node.js y su ecosistema de paquetes son la base del desarrollo JavaScript moderno:

- **Backend en JavaScript:** mismo lenguaje en frontend y backend
- **Herramientas de desarrollo:** Vite, ESLint, Prettier, TypeScript — todo corre en Node.js
- **Miles de paquetes:** no reinventes la rueda, instala lo que necesitas
- **Scripts de automatización:** tareas de build, deploy, testing

Entender npm/pnpm es entender cómo se gestiona el código compartido en la industria.

---

## La IA y Node.js

### Lo bueno

- **Generar scripts de npm/pnpm:** la IA crea comandos de instalación y scripts de `package.json`.
- **Explicar paquetes:** "¿qué hace `express`?" — la IA explica con ejemplos.
- **Debuggear errores de instalación:** un `npm install` que falla — la IA sugiere soluciones.
- **Sugerir alternativas:** "¿hay un paquete más ligero que lodash para esto?"

### Lo que no debes hacer

- **No instales paquetes sin revisar qué hacen.** Un paquete malicioso puede robar tus variables de entorno.
- **No copies scripts de instalación sin entender las banderas.** `--save` vs `--save-dev` importa.
- **No commitees `node_modules/` ni archivos `.env` con secretos.**

---

## Desafío: tu primer servidor con paquetes

**Objetivo:** crear un servidor web con Node.js que use paquetes externos.

**Tu tarea:**

1. Inicializa un proyecto con `pnpm init`
2. Instala `express` (`pnpm add express`)
3. Crea un servidor Express con estas rutas:
   - `GET /` → devuelve "¡Hola, mundo!"
   - `GET /hora` → devuelve la hora actual
   - `GET /saludar/:nombre` → devuelve "Hola, [nombre]!"
   - `GET /calculadora/:a/:op/:b` → realiza la operación (+, -, *, /) y devuelve el resultado
4. Agrega un script `"dev"` en `package.json` que use `nodemon` para reiniciar automáticamente al cambiar el código
5. Crea un `.gitignore` que excluya `node_modules/` y `.env`

**Bonus:** agrega un middleware que loguee cada petición (método, URL, timestamp) en un archivo `access.log`.

---

## Para seguir explorando

- **[Documentación oficial de Node.js](https://nodejs.org/es/docs)** — docs en español.
- **[pnpm documentation](https://pnpm.io/)** — por qué pnpm y cómo funciona.
- **[npm vs yarn vs pnpm](https://www.bairesdev.com/blog/npm-vs-yarn-vs-pnpm/)** — comparación detallada.
- **[Express.js Guide](https://expressjs.com/)** — el framework web más popular de Node.js.

---

## Resumen

- **Node.js** es JavaScript fuera del navegador, usando el motor V8 de Google.
- Node.js tiene acceso al **sistema de archivos**, **redes** y **procesos** del sistema operativo.
- Usa un **event loop** para manejar miles de conexiones simultáneas en un solo hilo.
- **npm** es el gestor de paquetes más grande del mundo (2M+ paquetes).
- **pnpm** es más rápido y eficiente en disco porque comparte paquetes entre proyectos con hard links.
- **`package.json`** define la identidad del proyecto: nombre, versión, dependencias, scripts.
- **`node_modules/`** nunca se commitea — se regenera con `pnpm install`.
- Los **módulos** organizan el código: CommonJS (`require`) o ES Modules (`import`).
- Las **variables de entorno** (`process.env`) configuran la aplicación sin hardcodear valores.
- Node.js fue creado por **Ryan Dahl** en 2009; npm por **Isaac Z. Schlueter** en 2010.

En la próxima guía vamos a agregar seguridad de tipos a todo este JavaScript: **TypeScript desde cero: tipado que salva vidas** — cómo detectar errores antes de ejecutar el código.
