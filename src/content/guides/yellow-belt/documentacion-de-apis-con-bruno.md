---
title: "Documentación de APIs con Bruno"
description: "Aprende a probar, documentar y compartir colecciones de APIs con Bruno, la alternativa open source a Postman."
belt: yellow-belt
tags: [bruno, api, documentacion, testing, herramientas]
order: 12
published: true
lastRevision: "2026-05-19"
---

Construir una API es solo la mitad del trabajo. La otra mitad es **documentarla** para que otros (o tu yo del futuro) sepan cómo usarla. **Bruno** es una herramienta open source para probar, documentar y compartir colecciones de APIs — y a diferencia de Postman, guarda todo en archivos locales que puedes versionar con Git.

En esta guía vas a aprender a usar Bruno para probar tus endpoints, crear colecciones organizadas y documentar tus APIs de forma que todo tu equipo pueda usarlas.

---

## ¿Qué es Bruno?

Bruno es un cliente de API similar a Postman e Insomnia, pero con una diferencia fundamental: **guarda las colecciones como archivos en tu repositorio**. No hay nube, no hay sync obligatorio, no hay vendor lock-in.

### Por qué Bruno sobre Postman

| | Bruno | Postman |
|---|---|---|
| **Almacenamiento** | Archivos locales (Git-friendly) | Nube (requiere cuenta) |
| **Precio** | Gratuito y open source | Freemium, funciones pagas |
| **Privacidad** | Todo local | Datos en servidores de Postman |
| **Colaboración** | Git (pull requests, branches) | Sync de Postman |
| **Offline** | ✅ Siempre | ⚠️ Limitado |

---

## Instalación

### macOS
```bash
brew install bruno
```

### Linux
Descarga el AppImage desde [usebruno.com](https://www.usebruno.com/).

### Windows
Descarga el instalador desde la web oficial.

---

## Tu primera colección

### Crear una colección

1. Abre Bruno
2. Click en **"Create Collection"**
3. Nombre: `API Tareas`
4. Location: selecciona una carpeta en tu proyecto (ej: `docs/api/`)
5. Bruno crea un archivo `bruno.json` y una carpeta para la colección

```
docs/api/api-tareas/
├── bruno.json
└── tareas/
    ├── get-tareas.bru
    ├── post-tarea.bru
    └── ...
```

Cada endpoint es un archivo `.bru` que puedes commitear a Git.

### Crear un request

Click derecho en la colección → **New Request** → "Listar tareas".

```bru
# docs/api/api-tareas/tareas/get-tareas.bru

meta {
    name: Listar tareas
    method: GET
    url: {{baseUrl}}/tareas
}

query {
    completada: false
}

body:json {}
```

**`{{baseUrl}}`** es una variable de entorno que defines en Bruno:
- Click en el selector de ambientes (arriba a la derecha)
- "Manage Environments"
- Crear "Development": `baseUrl = http://localhost:3000`
- Crear "Production": `baseUrl = https://api.miaplicacion.com`

---

## Probar endpoints

### GET — Listar tareas

```bru
meta {
    name: Listar todas las tareas
    method: GET
    url: {{baseUrl}}/tareas
}

body:json {}
```

Click en **Send**. Deberías ver la respuesta JSON abajo.

### POST — Crear tarea

```bru
meta {
    name: Crear nueva tarea
    method: POST
    url: {{baseUrl}}/tareas
}

headers {
    Content-Type: application/json
}

body:json {
    "titulo": "Aprender Bruno",
    "descripcion": "Documentar mi API con colecciones"
}
```

### PATCH — Actualizar tarea

```bru
meta {
    name: Marcar tarea como completada
    method: PATCH
    url: {{baseUrl}}/tareas/1
}

headers {
    Content-Type: application/json
}

body:json {
    "completada": true
}
```

### DELETE — Eliminar tarea

```bru
meta {
    name: Eliminar tarea
    method: DELETE
    url: {{baseUrl}}/tareas/1
}

body:json {}
```

---

## Variables y scripts

### Variables de entorno

```
# Environment: Development
baseUrl = http://localhost:3000
apiKey = dev-key-123

# Environment: Production
baseUrl = https://api.ejemplo.com
apiKey = prod-key-456
```

Uso en requests: `{{baseUrl}}`, `{{apiKey}}`.

### Capturar valores de respuestas

```bru
# En un request de login
meta {
    name: Login
    method: POST
    url: {{baseUrl}}/auth/login
}

body:json {
    "email": "admin@ejemplo.com",
    "password": "secreta"
}

# Capturar el token de la respuesta
tests {
    const body = res.getBody();
    bru.setEnvVar("authToken", body.token);
}
```

Ahora `{{authToken}}` está disponible en otros requests:

```bru
headers {
    Authorization: Bearer {{authToken}}
}
```

### Assertions (tests)

```bru
tests {
    const status = res.getStatus();
    const body = res.getBody();

    test("Status es 200", function() {
        expect(status).to.equal(200);
    });

    test("Respuesta tiene datos", function() {
        expect(body.datos).to.be.an.array;
    });

    test("Total es correcto", function() {
        expect(body.total).to.equal(body.datos.length);
    });
}
```

---

## Organizar colecciones

### Estructura recomendada

```
docs/api/
├── api-tareas/
│   ├── bruno.json
│   ├── auth/
│   │   ├── login.bru
│   │   └── register.bru
│   ├── tareas/
│   │   ├── get-tareas.bru
│   │   ├── get-tarea-by-id.bru
│   │   ├── post-tarea.bru
│   │   ├── patch-tarea.bru
│   │   └── delete-tarea.bru
│   └── categorias/
│       ├── get-categorias.bru
│       └── post-categoria.bru
└── README.md
```

### Request con documentación inline

```bru
# docs/api/api-tareas/tareas/get-tareas.bru

# Listar todas las tareas
#
# Query params opcionales:
# - completada: boolean — filtra por estado
# - categoria: string — filtra por categoría
# - pagina: number — página (default: 1)
# - limite: number — items por página (default: 20)
#
# Response 200:
# { "datos": [...], "total": 10 }

meta {
    name: Listar tareas
    method: GET
    url: {{baseUrl}}/tareas
}

query {
    pagina: 1
    limite: 20
}

body:json {}
```

---

## Ejecutar colecciones completas

Bruno permite ejecutar todos los requests de una colección:

1. Click en **"Run"** en la barra lateral
2. Selecciona la colección
3. Click en **"Run Collection"**
4. Ve los resultados de cada request y sus tests

Esto es útil para **smoke tests**: verificar que todos los endpoints responden correctamente después de un deploy.

---

## Exportar a documentación

Como las colecciones son archivos de texto, puedes:

- **Versionarlas con Git:** cada cambio queda registrado en el historial
- **Revisar en PRs:** tu equipo puede revisar cambios a la API en el PR
- **Generar docs:** herramientas como [Bruno CLI](https://www.usebruno.com/bruno-cli) generan Markdown o HTML desde las colecciones

---

## Por qué importa

Documentar y probar APIs no es opcional:

- **Sin documentación,** nadie sabe cómo usar tu API
- **Sin pruebas manuales,** no sabes si los endpoints funcionan
- **Sin colecciones versionadas,** la documentación se desactualiza
- **Bruno** resuelve todo esto con archivos locales que viven en tu repo

---

## La IA y Bruno

### Lo bueno

- **Generar archivos .bru:** describe el endpoint y la IA genera el archivo Bruno.
- **Crear tests:** la IA genera assertions para validar respuestas.
- **Convertir OpenAPI a Bruno:** la IA convierte specs OpenAPI en colecciones.

### Lo que no debes hacer

- **No commitees tokens reales o API keys en los archivos .bru.** Usa variables de entorno.
- **No confíes en tests generados por IA sin entenderlos.** Un test que siempre pasa no sirve.

---

## Desafío: documenta tu API

**Objetivo:** crear una colección completa de Bruno para tu API de tareas.

**Tu tarea:**

1. Instala Bruno y crea una colección para tu API
2. Crea requests para todos los endpoints (GET, POST, PATCH, DELETE)
3. Configura ambientes Development y Production
4. Agrega assertions para verificar respuestas exitosas
5. Crea un request de login que capture el token y lo use en requests autenticados
6. Ejecuta toda la colección y verifica que todos los tests pasen

**Bonus:** agrega un README.md en la carpeta de la colección explicando cómo usarla.

---

## Para seguir explorando

- **[Bruno Documentation](https://docs.usebruno.com/)** — docs oficiales.
- **[Bruno GitHub](https://github.com/usebruno/bruno)** — código fuente.
- **[OpenAPI Specification](https://swagger.io/specification/)** — el estándar para documentar APIs.

---

## Resumen

- **Bruno** es un cliente de API open source que guarda colecciones como archivos locales.
- Cada request es un archivo `.bru` que se puede versionar con Git.
- Las **variables de entorno** (`{{baseUrl}}`) permiten cambiar entre Development y Production.
- Los **scripts** (`tests {}`) permiten capturar valores de respuestas y hacer assertions.
- Bruno es una alternativa a Postman que prioriza **privacidad, offline y Git-first**.
- Las colecciones organizadas por carpetas (auth/, tareas/, categorias/) facilitan el mantenimiento.

En la próxima guía vamos a empaquetar todo: **Introducción a Docker: contenedores sin miedo** — cómo hacer que tu app corra igual en cualquier máquina.
