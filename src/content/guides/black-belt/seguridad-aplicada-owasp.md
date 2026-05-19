---
title: "Seguridad aplicada: OWASP, secretos y buenas prácticas"
description: "Protege tu app de ataques reales: SQL injection, XSS, CSRF, y gestión segura de secretos."
belt: black-belt
tags: [seguridad, owasp, secretos, vulnerabilidades, buenas-practicas]
order: 11
published: true
lastRevision: "2026-05-19"
---

Tu app funciona. Pero ¿es segura? Un atacante no necesita ser un genio — solo necesita que tú cometas un error. Y los errores más comunes son siempre los mismos.

En esta guía vas a conocer las vulnerabilidades más frecuentes y cómo prevenirlas.

---

## OWASP Top 10

La **OWASP** (Open Web Application Security Project) publica las 10 vulnerabilidades más críticas:

### 1. Broken Access Control

```typescript
// ❌ Inseguro: el usuario puede acceder a datos de otros
app.get("/api/tareas/:id", async (c) => {
    const tarea = await prisma.tarea.findUnique({
        where: { id: parseInt(c.req.param("id")) },
    });
    return c.json(tarea);  // Cualquiera puede ver cualquier tarea
});

// ✅ Seguro: verificar propiedad
app.get("/api/tareas/:id", async (c) => {
    const userId = c.get("user").id;
    const tarea = await prisma.tarea.findUnique({
        where: { id: parseInt(c.req.param("id")), autorId: userId },
    });
    if (!tarea) return c.json({ error: "No encontrada" }, 404);
    return c.json(tarea);
});
```

### 2. Cryptographic Failures

```typescript
// ❌ Contraseñas en texto plano
const user = { password: "mi_contraseña" };

// ❌ Hash débil
const hash = crypto.createHash("md5").update(password).digest("hex");

// ✅ Hash seguro
import bcrypt from "bcrypt";
const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(password, hash);
```

### 3. Injection (SQL, NoSQL, Command)

```typescript
// ❌ SQL Injection
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Query parametrizada
const user = await prisma.user.findUnique({ where: { email } });

// ❌ Command Injection
exec(`convert ${filename} output.png`);

// ✅ Validar input
const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "");
exec(`convert ${safeName} output.png`);
```

### 4. Insecure Design

No es un bug — es un diseño flawed. Ejemplo: permitir resetear contraseña solo con email sin verificación.

### 5. Security Misconfiguration

```
❌ CORS: origin: "*"  (permite cualquier dominio)
❌ Debug mode en producción
❌ Headers de seguridad faltantes
❌ Puertos de BD expuestos a internet
```

### 6. Vulnerable Components

```bash
# Verificar dependencias vulnerables
pnpm audit
npm audit
```

### 7. Authentication Failures

```typescript
// ❌ Sin rate limiting en login
app.post("/auth/login", async (c) => { /* ... */ });

// ✅ Con rate limiting
import { rateLimit } from "hono-rate-limit";

app.post("/auth/login",
    rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }),
    async (c) => { /* ... */ }
);
```

### 8. Software and Data Integrity Failures

No verificar firmas de paquetes, usar imágenes Docker de fuentes desconocidas.

### 9. Security Logging Failures

No loguear intentos de login fallidos, no detectar patrones de ataque.

### 10. Server-Side Request Forgery (SSRF)

```typescript
// ❌ El usuario controla la URL
app.post("/api/fetch", async (c) => {
    const { url } = await c.req.json();
    const res = await fetch(url);  // Puede acceder a servicios internos
    return c.json(await res.json());
});

// ✅ Whitelist de dominios
const ALLOWED_DOMAINS = ["api.ejemplo.com", "cdn.ejemplo.com"];
const parsed = new URL(url);
if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    return c.json({ error: "Dominio no permitido" }, 400);
}
```

---

## Gestión de secretos

```
❌ .env commiteado al repo
❌ API keys en código frontend
❌ Contraseñas hardcodeadas

✅ .env en .gitignore
✅ Variables de entorno del CI/CD
✅ AWS Secrets Manager o similar
✅ Rotación regular de claves
```

---

## Headers de seguridad

```typescript
import { secureHeaders } from "hono/secure-headers";

app.use(secureHeaders({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
    xFrameOptions: "DENY",
    xContentTypeOptions: "nosniff",
    referrerPolicy: "strict-origin-when-cross-origin",
}));
```

---

## Por qué importa

La seguridad no es un feature — es un requisito. Un breach puede destruir la confianza de tus usuarios y tu negocio.

---

## La IA y seguridad

### Lo bueno
- **Auditar código:** la_IA identifica vulnerabilidades comunes.
- **Generar configs:** la IA crea headers de seguridad, CSP, etc.

### Lo que no debes hacer
- **No confíes en la IA para auditorías de seguridad.** Usa herramientas especializadas.
- **No pegues código con secretos en la IA.** Los prompts pueden ser almacenados.

---

## Desafío: audita tu app

**Objetivo:** identificar y corregir vulnerabilidades en tu proyecto.

**Tu tarea:**
1. Ejecuta `pnpm audit` y corrige vulnerabilidades
2. Agrega headers de seguridad
3. Verifica que no hay SQL injection posible
4. Configura rate limiting en endpoints sensibles
5. Verifica que .env está en .gitignore

**Bonus:** configura un escáner de seguridad en CI.

---

## Para seguir explorar

- **[OWASP Top 10](https://owasp.org/www-project-top-ten/)**

---

## Resumen

- **OWASP Top 10** son las vulnerabilidades más críticas de la web.
- **Siempre parametrizar queries** — nunca concatenar strings en SQL.
- **Hash contraseñas con bcrypt/scrypt/Argon2** — nunca texto plano ni MD5.
- **Rate limiting** en endpoints de login y registro.
- **Headers de seguridad** (CSP, X-Frame-Options, etc.) protegen contra XSS y clickjacking.
- **Nunca commitear secretos** — usar variables de entorno y secrets managers.

En la próxima guía: **Lean Thinking: visión de negocio para desarrolladores** — por qué el código importa menos que el valor que entrega.
