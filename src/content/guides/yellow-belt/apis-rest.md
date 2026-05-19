---
title: "APIs REST: qué son y cómo se diseñan"
description: "Aprende los principios detrás de las APIs REST, cómo diseñar endpoints intuitivos y por qué la consistencia importa más que la perfección."
belt: yellow-belt
tags: [api, rest, http, backend, diseño]
order: 6
published: true
lastRevision: "2026-05-19"
---

Cada vez que tu app del clima muestra la temperatura, que Instagram carga fotos nuevas, o que Spotify reproduce una canción, hay una **API** trabajando detrás. Una API es la forma en que un programa le pide datos a otro. Y **REST** es el estilo de diseño más popular para construir APIs en la web.

En esta guía vas a entender qué es REST, cómo diseñar endpoints que otros desarrolladores puedan usar sin documentación, y los principios que hacen que una API sea buena.

---

## ¿Qué es una API?

**API** (Application Programming Interface) es la interfaz que permite que dos programas se comuniquen. En el contexto web, una API es un servidor que recibe peticiones HTTP y devuelve datos (generalmente JSON).

Piensa en una API como el **mesero de un restaurante**:

- Tú (el cliente/frontend) miras el menú (la documentación de la API)
- Le dices al mesero qué quieres (envías una petición HTTP)
- El mesero lleva tu pedido a la cocina (el servidor procesa la petición)
- La cocina prepara la comida (la base de datos, la lógica de negocio)
- El mesero te trae la comida (la respuesta con los datos)

---

## ¿Qué es REST?

**REST** (Representational State Transfer) es un **estilo arquitectónico** para diseñar APIs web. No es una tecnología ni un framework — es un conjunto de principios.

Una API es RESTful cuando sigue estos principios:

### 1. Recursos, no acciones

Los **recursos** son las "cosas" de tu sistema: usuarios, productos, tareas. Se identifican con URLs, no con verbos.

```
❌ Malo: /obtenerUsuarios, /crearUsuario, /eliminarUsuario
✅ Bueno: /usuarios, /usuarios, /usuarios/42
```

La acción la define el **método HTTP**, no la URL.

### 2. Métodos HTTP semánticos

| Método | Acción | Ejemplo |
|--------|--------|---------|
| `GET` | Leer recursos | `GET /usuarios` → lista todos |
| `POST` | Crear recurso | `POST /usuarios` → crea uno nuevo |
| `PUT` | Reemplazar recurso | `PUT /usuarios/42` → reemplaza todo |
| `PATCH` | Actualizar parcialmente | `PATCH /usuarios/42` → actualiza algunos campos |
| `DELETE` | Eliminar recurso | `DELETE /usuarios/42` → elimina |

### 3. Stateless (sin estado)

Cada petición debe contener toda la información necesaria. El servidor no guarda estado entre peticiones. Si necesitas autenticación, envías el token en cada petición.

### 4. Respuestas consistentes

```json
// GET /usuarios/42 — 200 OK
{
    "id": 42,
    "nombre": "Ada Lovelace",
    "email": "ada@ejemplo.com"
}

// GET /usuarios — 200 OK (lista)
[
    { "id": 1, "nombre": "Ada", "email": "ada@ejemplo.com" },
    { "id": 2, "nombre": "Alan", "email": "alan@ejemplo.com" }
]

// POST /usuarios — 201 Created
{
    "id": 3,
    "nombre": "Grace",
    "email": "grace@ejemplo.com"
}

// Error — 404 Not Found
{
    "error": "Usuario no encontrado",
    "codigo": "USUARIO_NO_ENCONTRADO"
}
```

---

## Diseño de endpoints

### Colecciones y elementos individuales

```
GET    /articulos          → Lista de artículos
POST   /articulos          → Crear artículo
GET    /articulos/15       → Artículo específico
PUT    /articulos/15       → Reemplazar artículo
PATCH  /articulos/15       → Actualizar parcialmente
DELETE /articulos/15       → Eliminar artículo
```

### Sub-recursos (relaciones)

```
GET    /articulos/15/comentarios        → Comentarios del artículo
POST   /articulos/15/comentarios        → Agregar comentario
GET    /articulos/15/comentarios/3      → Comentario específico
DELETE /articulos/15/comentarios/3      → Eliminar comentario
```

### Filtrado, orden y paginación

```
GET /articulos?categoria=tech&orden=-fecha&pagina=2&limite=10
```

- **Filtrado:** `?categoria=tech&activo=true`
- **Orden:** `?orden=nombre` (ascendente), `?orden=-fecha` (descendente)
- **Paginación:** `?pagina=2&limite=20`
- **Búsqueda:** `?q=typescript`

### Respuesta paginada

```json
{
    "datos": [
        { "id": 21, "titulo": "Artículo 21" },
        { "id": 22, "titulo": "Artículo 22" }
    ],
    "paginacion": {
        "pagina": 2,
        "limite": 20,
        "total": 150,
        "paginas": 8
    }
}
```

---

## Códigos de estado en APIs REST

| Código | Cuándo usarlo |
|--------|---------------|
| **200 OK** | Petición exitosa (GET, PUT, PATCH) |
| **201 Created** | Recurso creado exitosamente (POST) |
| **204 No Content** | Éxito sin cuerpo (DELETE exitoso) |
| **400 Bad Request** | El cliente envió datos inválidos |
| **401 Unauthorized** | No autenticado |
| **403 Forbidden** | Autenticado pero sin permiso |
| **404 Not Found** | El recurso no existe |
| **409 Conflict** | Conflicto (ej: email ya registrado) |
| **422 Unprocessable Entity** | Datos válidos pero semánticamente incorrectos |
| **500 Internal Server Error** | Error del servidor |

---

## Versionado de APIs

Cuando cambias tu API, no puedes romper a los clientes existentes. El versionado te permite evolucionar:

### Versionado en la URL (más común)

```
GET /api/v1/usuarios
GET /api/v2/usuarios
```

### Versionado en headers

```
GET /api/usuarios
Accept: application/vnd.miaplicacion.v2+json
```

**Regla:** nunca hagas cambios breaking sin cambiar la versión. Agregar campos es OK; eliminar o renombrar campos requiere nueva versión.

---

## Autenticación en APIs

### API Keys

```
GET /api/usuarios
Authorization: Bearer sk-abc123def456
```

Simple pero limitado. Bueno para servicio-a-servicio.

### JWT (JSON Web Tokens)

```typescript
import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";

const app = new Hono();

// Login: generar token
app.post("/api/login", async (c) => {
    const { email } = await c.req.json();
    const payload = { sub: email, exp: Math.floor(Date.now() / 1000) + 3600 };
    const token = await sign(payload, process.env.JWT_SECRET!, "HS256");
    return c.json({ token });
});

// Proteger rutas
app.use("/api/protected/*", jwt({ secret: process.env.JWT_SECRET!, alg: "HS256" }));

app.get("/api/protected/profile", (c) => {
    const payload = c.var.jwtPayload;
    return c.json({ email: payload.sub });
});
```

---

## Ejemplo completo: API de tareas

```typescript
// Con Hono (framework ligero de TypeScript)
import { Hono } from "hono";

interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
}

const app = new Hono();
let tareas: Tarea[] = [];
let nextId = 1;

// GET /tareas — listar todas
app.get("/tareas", (c) => {
    return c.json(tareas);
});

// GET /tareas/:id — obtener una
app.get("/tareas/:id", (c) => {
    const id = parseInt(c.req.param("id"));
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return c.json({ error: "No encontrada" }, 404);
    return c.json(tarea);
});

// POST /tareas — crear
app.post("/tareas", async (c) => {
    const body = await c.req.json();
    const nueva: Tarea = {
        id: nextId++,
        titulo: body.titulo,
        completada: false,
    };
    tareas.push(nueva);
    return c.json(nueva, 201);
});

// PATCH /tareas/:id — actualizar
app.patch("/tareas/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return c.json({ error: "No encontrada" }, 404);
    if (body.titulo) tarea.titulo = body.titulo;
    if (body.completada !== undefined) tarea.completada = body.completada;
    return c.json(tarea);
});

// DELETE /tareas/:id — eliminar
app.delete("/tareas/:id", (c) => {
    const id = parseInt(c.req.param("id"));
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) return c.json({ error: "No encontrada" }, 404);
    tareas.splice(index, 1);
    return c.body(null, 204);
});

export default app;
```

---

## Un poco de historia: Roy Fielding y la web programable

![Retrato de Roy Fielding con diagramas de arquitectura REST de fondo, mostrando los principios de recursos, métodos HTTP y statelessness](/content/guides/apis-rest/01-roy-fielding-rest.png)

*Roy Fielding: el padre de REST y co-fundador de Apache.*

**Roy Fielding** definió REST en su tesis doctoral en **2000** en UC Irvine. Fielding no estaba inventando algo nuevo — estaba describiendo y formalizando lo que ya funcionaba en la web. HTTP, URLs, el modelo cliente-servidor — todo eso ya existía. Fielding le puso nombre y principios.

REST se convirtió en el estándar de APIs web porque es **simple, escalable y usa lo que ya existe** (HTTP). Antes de REST, las APIs usaban SOAP (XML complejo, envelopes, WSDL) que era potente pero difícil de usar.

La popularidad de REST explotó con las APIs de **Twitter, Facebook y Google** en los 2010s, que ofrecían APIs RESTful para que terceros construyeran aplicaciones sobre sus plataformas.

---

## Por qué importa

Diseñar buenas APIs es una de las habilidades más valiosas en desarrollo backend:

- **Tus APIs son tu producto:** si construyes un backend, la API ES la interfaz que usan tus clientes (frontend, mobile, otros servicios).
- **Una API bien diseñada se documenta sola:** los endpoints intuitivos no necesitan explicación.
- **Consistencia > perfección:** es mejor que todos los endpoints sigan el mismo patrón que tener algunos "perfectos" y otros diferentes.
- **Cambiar una API es caro:** los clientes dependen de ella. Diseñar bien desde el inicio ahorra dolor después.

---

## La IA y las APIs REST

### Lo bueno

- **Generar boilerplate de endpoints:** describe el recurso y la IA genera el CRUD completo.
- **Revisar diseño de API:** muéstrale tus endpoints y la IA sugiere mejoras de consistencia.
- **Generar documentación:** la IA crea docs desde OpenAPI/Swagger specs.
- **Crear clientes:** la IA genera código de cliente para tu API en cualquier lenguaje.

### Lo que no debes hacer

- **No expongas endpoints sin autenticación solo porque la IA los generó así.** La seguridad es tu responsabilidad.
- **No copies schemas de validación sin entenderlos.** Validación incorrecta = vulnerabilidades.
- **No diseñes APIs complejas solo con IA.** Piensa en los consumidores de tu API.

---

## Desafío: diseña una API

**Objetivo:** diseñar la API para una aplicación de biblioteca.

**Tu tarea:**

Diseña los endpoints para una API de biblioteca que maneje:
- **Libros:** título, autor, ISBN, año, disponible (booleano)
- **Usuarios:** nombre, email, membresía
- **Préstamos:** libro, usuario, fecha préstamo, fecha devolución

Define:
1. Todos los endpoints con sus métodos HTTP
2. Qué devuelve cada uno (status code + cuerpo JSON)
3. Cómo filtrar libros por autor o disponibilidad
4. Cómo paginar la lista de préstamos
5. Qué errores pueden ocurrir y qué status codes devuelven

**Bonus:** implementa la API con Hono o Express, con datos en memoria (arrays).

---

## Para seguir explorando

- **[REST API Tutorial](https://restfulapi.net/)** — guía completa de REST.
- **[JSON API Specification](https://jsonapi.org/)** — un estándar más formalizado para APIs JSON.
- **[OpenAPI Initiative](https://www.openapis.org/)** — el estándar para documentar APIs.
- **[10 Best Practices for Better RESTful APIs](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-apis/)** — artículo de Stack Overflow.

---

## Resumen

- Una **API** es la interfaz entre dos programas; en la web, recibe peticiones HTTP y devuelve datos.
- **REST** es un estilo arquitectónico basado en recursos, métodos HTTP semánticos y statelessness.
- Las URLs representan **recursos** (sustantivos), no acciones: `GET /usuarios`, no `/obtenerUsuarios`.
- Los **métodos HTTP** definen la acción: GET (leer), POST (crear), PUT (reemplazar), PATCH (actualizar), DELETE (eliminar).
- Las respuestas deben ser **consistentes** en formato y usar los **códigos de estado** correctos.
- El **versionado** (`/api/v1/`) permite evolucionar sin romper clientes existentes.
- **JWT** es el método más común de autenticación para APIs modernas.
- REST fue definido por **Roy Fielding** en 2000, formalizando lo que ya funcionaba en la web.

En la próxima guía vamos a construir una API real: **Tu primera API con Hono y TypeScript** — del concepto al código funcionando.
