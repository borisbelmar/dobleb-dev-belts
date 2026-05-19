---
title: "Autenticación y sesiones: JWT y cookies"
description: "Cómo mantener sesiones de usuario: JWT stateless vs cookies con sesión, pros, contras y cuándo usar cada enfoque."
belt: green-belt
tags: [autenticacion, jwt, sesiones, cookies, seguridad]
order: 8
published: true
lastRevision: "2026-05-19"
---

Tu API ya registra usuarios con contraseñas hasheadas. Ahora necesitas que inicien sesión y mantengan su sesión activa mientras navegan. Hay dos enfoques principales: **JWT stateless** y **cookies con sesión en servidor**.

En esta guía vas a implementar ambos, entender sus trade-offs y elegir el correcto para tu caso.

---

## JWT: autenticación stateless

El **JWT** (JSON Web Token) contiene la identidad del usuario firmada criptográficamente. El servidor no guarda estado — cada petición lleva el token.

```typescript
import { Hono } from "hono";
import { jwt, sign, verify } from "hono/jwt";

const app = new Hono();
const JWT_SECRET = process.env.JWT_SECRET!;

// Login
app.post("/auth/login", async (c) => {
    const { email, password } = await c.req.json();

    // Verificar credenciales (simplificado)
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!user || !verifyPassword(password, user.password_hash)) {
        return c.json({ error: "Credenciales inválidas" }, 401);
    }

    // Generar token
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 3600,  // 1 hora
    };
    const token = await sign(payload, JWT_SECRET, "HS256");

    return c.json({ token });
});

// Proteger rutas
app.use("/api/*", jwt({ secret: JWT_SECRET, alg: "HS256" }));

app.get("/api/profile", (c) => {
    const payload = c.var.jwtPayload;
    return c.json({ userId: payload.sub, email: payload.email });
});
```

### Ventajas del JWT
- **Stateless:** el servidor no guarda sesiones, escala horizontalmente fácil
- **Multi-plataforma:** mismo token para web, mobile, APIs de terceros
- **Expiración controlada:** el token expira automáticamente

### Desventajas del JWT
- **No se puede revocar fácilmente:** hasta que expire, el token es válido
- **Tamaño:** los tokens son más grandes que un session ID
- **Almacenamiento seguro:** guardarlo en localStorage es vulnerable a XSS

---

## Cookies con sesión en servidor

El servidor genera un **session ID** aleatorio, lo guarda en una cookie HttpOnly, y mantiene el estado de la sesión en memoria o base de datos.

```typescript
import { Hono } from "hono";
import { sessionMiddleware } from "hono/session"; // o similar

const app = new Hono();

// Login con cookie
app.post("/auth/login", async (c) => {
    const { email, password } = await c.req.json();

    const user = await verifyCredentials(email, password);
    if (!user) return c.json({ error: "Credenciales inválidas" }, 401);

    // Generar session ID
    const sessionId = crypto.randomUUID();

    // Guardar sesión (en Redis, DB, o memoria)
    await sessions.set(sessionId, { userId: user.id, role: user.role });

    // Set cookie HttpOnly + Secure + SameSite
    c.header("Set-Cookie", `session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`);

    return c.json({ message: "Login exitoso" });
});

// Middleware de autenticación
app.use("/api/*", async (c, next) => {
    const sessionId = c.req.cookie("session");
    if (!sessionId) return c.json({ error: "No autenticado" }, 401);

    const session = await sessions.get(sessionId);
    if (!session) return c.json({ error: "Sesión expirada" }, 401);

    c.set("user", session);
    await next();
});
```

### Ventajas de cookies
- **Revocación inmediata:** borrar la sesión del servidor invalida al instante
- **HttpOnly:** no accesible desde JavaScript (protege contra XSS)
- **Simple:** el servidor controla completamente las sesiones

### Desventajas de cookies
- **Stateful:** el servidor debe guardar sesiones (problema para escalar horizontalmente)
- **CSRF:** necesita protección contra Cross-Site Request Forgery
- **Dominio:** las cookies están atadas al dominio

---

## Comparación directa

| | JWT | Cookies |
|---|---|---|
| **Estado** | Stateless | Stateful |
| **Revocación** | Difícil (hasta expiración) | Inmediata |
| **XSS** | Vulnerable (si está en localStorage) | Protegido (HttpOnly) |
| **CSRF** | Inmune | Necesita protección |
| **Escalabilidad** | Fácil (sin estado) | Requiere Redis/session store compartido |
| **Multi-dominio** | ✅ Sí | ❌ No |
| **Tamaño** | Mayor (~200-500 bytes) | Menor (~36 bytes UUID) |

### Cuándo usar cada uno

- **JWT:** APIs para múltiples clientes (web + mobile + terceros), microservicios
- **Cookies:** aplicación web tradicional, seguridad prioritaria, revocación importante

---

## Por qué importa

La autenticación es la puerta de entrada a tu aplicación. Elegir mal el mecanismo puede significar sesiones secuestradas, datos expuestos o imposibilidad de escalar.

---

## La IA y autenticación

### Lo bueno
- **Generar middleware de auth:** la IA crea guards de autenticación para tu framework.
- **Explicar vulnerabilidades:** la IA explica XSS, CSRF, session fixation.

### Lo que no debes hacer
- **No implementes tu propia criptografía de tokens.** Usa `hono/jwt` o `jsonwebtoken`.
- **No guardes JWT en localStorage** si tu app es vulnerable a XSS.
- **No olvides SameSite y Secure** en las cookies.

---

## Desafío: sistema de auth completo

**Objetivo:** implementar login con JWT y cookies, comparando ambos.

**Tu tarea:**
1. Implementa login con JWT usando `hono/jwt`
2. Implementa login con cookies HttpOnly
3. Crea un middleware que proteja rutas en ambos casos
4. Implementa logout (invalidar sesión para cookies, limpiar token para JWT)

**Bonus:** implementa refresh tokens para JWT.

---

## Para seguir explorando

- **[OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)**

---

## Resumen

- **JWT** es stateless: el token contiene la identidad del usuario, firmado criptográficamente.
- **Cookies** son stateful: el servidor guarda la sesión y la cookie solo tiene un ID.
- JWT escala fácil pero es difícil de revocar; cookies se revocan fácil pero requieren estado.
- **HttpOnly + Secure + SameSite** son esenciales para cookies seguras.
- **No guardes JWT en localStorage** — es vulnerable a XSS.

En la próxima guía: **ORMs con Prisma: tu base de datos en TypeScript** — type-safe queries sin escribir SQL a mano.
