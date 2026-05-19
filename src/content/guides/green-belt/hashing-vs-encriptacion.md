---
title: "Cómo guardar información sensible: hashing vs encriptación"
description: "La diferencia entre hashing y encriptación, cuándo usar cada uno, y cómo proteger contraseñas y datos sensibles de tus usuarios."
belt: green-belt
tags: [seguridad, hashing, encriptacion, criptografia, backend]
order: 7
published: true
lastRevision: "2026-05-19"
---

Guardas contraseñas en texto plano en tu base de datos. Un día alguien hackea tu servidor. Ahora tiene las contraseñas de todos tus usuarios — y como la gente reutiliza contraseñas, también tiene acceso a sus emails, bancos y redes sociales.

Este no es un escenario hipotético. Pasa todos los días. La buena noticia: es completamente prevenible si entiendes la diferencia entre **hashing** y **encriptación**.

---

## Hashing: unidireccional

Un **hash** transforma datos de cualquier tamaño en una cadena de longitud fija. Es **unidireccional**: no puedes revertirlo.

```
"mi_contraseña_secreta" → SHA-256 → "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
```

### Propiedades del hash

- **Determinista:** mismo input → mismo hash siempre
- **Unidireccional:** no puedes obtener el input desde el hash
- **Resistente a colisiones:** dos inputs diferentes no deben producir el mismo hash
- **Efecto avalancha:** cambiar un carácter del input cambia completamente el hash

### Hashing de contraseñas

```typescript
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const hash = await scryptAsync(password, salt, 64) as Buffer;
    return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(stored: string, candidate: string): Promise<boolean> {
    const [salt, key] = stored.split(":");
    const hashBuffer = await scryptAsync(candidate, salt, 64) as Buffer;
    return timingSafeEqual(Buffer.from(key, "hex"), hashBuffer);
}

// Uso
const hashed = await hashPassword("mi_contraseña");
// "a1b2c3d4...:e5f6a7b8..."

const isValid = await verifyPassword(hashed, "mi_contraseña");  // true
const isWrong = await verifyPassword(hashed, "otra_contraseña"); // false
```

### Por qué necesitas salt

Un **salt** es un valor aleatorio que se agrega a la contraseña antes de hashear. Sin salt, dos usuarios con la misma contraseña tendrían el mismo hash — y los atacantes podrían usar **rainbow tables** (tablas precomputadas de hashes) para revertirlos.

### Algoritmos recomendados

| Algoritmo | Uso | Recomendado |
|-----------|-----|-------------|
| **bcrypt** | Contraseñas | ✅ Sí |
| **scrypt** | Contraseñas | ✅ Sí |
| **Argon2** | Contraseñas | ✅ Mejor opción |
| **PBKDF2** | Contraseñas | ✅ Aceptable |
| **SHA-256** | Integridad de datos | ❌ No para contraseñas |
| **MD5** | Nada | ❌ Roto |

---

## Encriptación: bidireccional

La **encriptación** transforma datos para que solo quien tenga la clave pueda leerlos. Es **bidireccional**: puedes desencriptar.

```
"datos_sensibles" + clave → AES-256 → "x7k2m9p4..." (cifrado)
"x7k2m9p4..." + clave → AES-256 decrypt → "datos_sensibles" (original)
```

### Cuándo usar encriptación

- **Datos que necesitas leer:** números de tarjeta, información médica, documentos
- **Comunicación:** TLS/HTTPS encripta datos en tránsito
- **Archivos:** encriptar backups, discos duros

### Encriptación simétrica vs asimétrica

```typescript
// Simétrica: misma clave para encriptar y desencriptar
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const key = randomBytes(32);  // 256 bits para AES-256
const iv = randomBytes(16);   // Initialization vector

function encrypt(text: string): { cipher: string; iv: string } {
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { cipher: encrypted, iv: iv.toString("hex") };
}

function decrypt(cipher: string, iv: string): string {
    const decipher = createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(cipher, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
```

**Simétrica (AES):** rápida, misma clave para ambos lados. Ideal para datos en reposo.
**Asimétrica (RSA):** par de claves (pública/privada). Ideal para comunicación segura.

---

## Regla de oro

| ¿Necesitas recuperar el valor original? | Usa |
|------------------------------------------|-----|
| **No** (contraseñas) | Hashing (bcrypt, scrypt, Argon2) |
| **Sí** (datos sensibles) | Encriptación (AES-256) |

**Nunca encriptes contraseñas.** Hashéalas. **Nunca hashees datos que necesites leer.** Encriptalos.

---

## Por qué importa

- **Contraseñas hasheadas:** si tu BD se filtra, los atacantes no pueden recuperar las contraseñas originales.
- **Datos encriptados:** si alguien accede a tu almacenamiento, no puede leer la información sensible.
- **Cumplimiento legal:** GDPR, HIPAA y otras regulaciones requieren protección de datos sensibles.

---

## La IA y criptografía

### Lo bueno
- **Explicar algoritmos:** la IA explica bcrypt, AES, RSA con ejemplos.
- **Generar código de hashing:** la IA genera funciones de hash con salt.

### Lo que no debes hacer
- **No implementes tu propia criptografía.** Usa bibliotecas probadas como `bcrypt` o `crypto` de Node.js.
- **No uses algoritmos deprecated** (MD5, SHA-1 para contraseñas, DES).
- **No hardcodees claves de encriptación** en el código.

---

## Desafío: sistema de auth seguro

**Objetivo:** implementar registro y login con hashing seguro.

**Tu tarea:**
1. Crea funciones `hashPassword` y `verifyPassword` con scrypt o bcrypt
2. Crea un endpoint POST `/register` que hashee la contraseña antes de guardar
3. Crea un endpoint POST `/login` que verifique la contraseña hasheada
4. Nunca almacenes ni loguees contraseñas en texto plano

**Bonus:** implementa rate limiting en el endpoint de login para prevenir brute force.

---

## Para seguir explorar

- **[OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)**

---

## Resumen

- **Hashing** es unidireccional: ideal para contraseñas (bcrypt, scrypt, Argon2).
- **Encriptación** es bidireccional: ideal para datos que necesitas leer (AES-256).
- **Salt** previene rainbow tables: siempre usa salt con hashing de contraseñas.
- **Nunca** almacenes contraseñas en texto plano ni uses SHA-256 directo para contraseñas.
- **Nunca** implementes tu propia criptografía — usa bibliotecas probadas.

En la próxima guía: **Autenticación y sesiones: JWT y cookies** — cómo mantener sesiones de usuario de forma segura.
