---
title: "JSON y manejo de datos"
description: "El formato de datos universal de la web: qué es JSON, cómo se estructura, cómo validarlo y manipularlo en JavaScript y TypeScript."
belt: yellow-belt
tags: [json, datos, javascript, api, validacion]
order: 8
published: true
lastRevision: "2026-05-19"
---

Si HTTP es el idioma en el que hablan los servidores, **JSON** es el formato en el que se escriben sus mensajes. Cada API que consumes, cada configuración que lees, cada respuesta que recibes — probablemente está en JSON.

En esta guía vas a dominar JSON: su estructura, cómo manipularlo en JavaScript, cómo validarlo y los errores más comunes que encontrarás.

---

## ¿Qué es JSON?

**JSON** (JavaScript Object Notation) es un formato de texto para representar datos estructurados. Fue derivado de la sintaxis de objetos de JavaScript, pero hoy es independiente de cualquier lenguaje.

```json
{
    "nombre": "Ada Lovelace",
    "edad": 36,
    "activo": true,
    "hobbies": ["matemáticas", "programación", "música"],
    "direccion": {
        "calle": "Main St 42",
        "ciudad": "Londres"
    },
    "proyectos": null
}
```

### Tipos de valores en JSON

| Tipo | Ejemplo | Descripción |
|------|---------|-------------|
| **String** | `"hola"` | Texto entre comillas dobles |
| **Number** | `42`, `3.14` | Enteros y decimales |
| **Boolean** | `true`, `false` | Verdadero o falso |
| **null** | `null` | Valor nulo/ausente |
| **Array** | `[1, 2, 3]` | Lista ordenada de valores |
| **Object** | `{"clave": "valor"}` | Pares clave-valor |

**Lo que NO puede ser JSON:**
- Funciones
- `undefined`
- Fechas (se usan strings: `"2026-05-19T10:30:00Z"`)
- Comentarios

---

## JSON en JavaScript

### Parsear: de string a objeto

```javascript
const texto = '{"nombre": "Ada", "edad": 36}';
const datos = JSON.parse(texto);

console.log(datos.nombre);  // "Ada"
console.log(datos.edad);    // 36
```

### Serializar: de objeto a string

```javascript
const usuario = {
    nombre: "Ada",
    edad: 36,
    activo: true,
};

const texto = JSON.stringify(usuario);
// '{"nombre":"Ada","edad":36,"activo":true}'

// Con formato legible (indentación de 2 espacios)
const bonito = JSON.stringify(usuario, null, 2);
```

### Manejar errores de parseo

```javascript
const textoInvalido = '{nombre: "Ada"}';  // JSON inválido (keys sin comillas)

try {
    const datos = JSON.parse(textoInvalido);
} catch (error) {
    console.error("JSON inválido:", error.message);
}
```

---

## JSON en la práctica

### Leer un archivo JSON en Node.js

```javascript
// Forma simple (sincrónica)
const datos = JSON.parse(fs.readFileSync("datos.json", "utf-8"));

// Forma async
const contenido = await fs.promises.readFile("datos.json", "utf-8");
const datos = JSON.parse(contenido);

// Forma directa (Node.js cachea el resultado)
const datos = require("./datos.json");
```

### Escribir un archivo JSON

```javascript
const datos = { usuarios: [{ nombre: "Ada" }, { nombre: "Alan" }] };
fs.writeFileSync("usuarios.json", JSON.stringify(datos, null, 2));
```

### JSON en el navegador

```javascript
// Enviar JSON en una petición
const respuesta = await fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre: "Ada", email: "ada@ejemplo.com" }),
});

// Leer JSON de una respuesta
const datos = await respuesta.json();
```

---

## Manipulación de datos

### Acceder a valores

```javascript
const usuario = {
    nombre: "Ada",
    direccion: { ciudad: "Londres", pais: "UK" },
    hobbies: ["matemáticas", "programación"],
};

// Acceso directo
usuario.nombre;           // "Ada"
usuario["nombre"];        // "Ada"

// Acceso anidado
usuario.direccion.ciudad;  // "Londres"

// Acceso seguro (optional chaining)
usuario.trabajo?.empresa;  // undefined (no existe, no crashea)
usuario.direccion?.pais;   // "UK"
```

### Destructuring

```javascript
const { nombre, edad } = usuario;
console.log(nombre);  // "Ada"

// Con alias
const { nombre: name } = usuario;
console.log(name);  // "Ada"

// Valores por defecto
const { rol = "usuario" } = usuario;
console.log(rol);  // "usuario" (no existe en el objeto)

// En arrays
const [primero, segundo] = [10, 20, 30];
console.log(primero);   // 10
console.log(segundo);   // 20
```

### Spread operator

```javascript
const base = { nombre: "Ada", edad: 36 };
const completo = { ...base, email: "ada@ejemplo.com", activo: true };
// { nombre: "Ada", edad: 36, email: "ada@ejemplo.com", activo: true }

// Merge de objetos (el último gana)
const defaults = { tema: "claro", idioma: "es" };
const prefs = { tema: "oscuro" };
const config = { ...defaults, ...prefs };
// { tema: "oscuro", idioma: "es" }

// En arrays
const todos = [...[1, 2], ...[3, 4]];  // [1, 2, 3, 4]
```

### Métodos de array esenciales

```javascript
const numeros = [1, 2, 3, 4, 5];

// map: transformar cada elemento
numeros.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter: filtrar elementos
numeros.filter(n => n > 3);  // [4, 5]

// find: encontrar el primero que cumple
numeros.find(n => n > 3);  // 4

// some: ¿alguno cumple?
numeros.some(n => n > 10);  // false

// every: ¿todos cumplen?
numeros.every(n => n > 0);  // true

// reduce: acumular valores
numeros.reduce((acc, n) => acc + n, 0);  // 15

// Encadenar métodos
const usuarios = [
    { nombre: "Ada", edad: 36, activo: true },
    { nombre: "Alan", edad: 42, activo: false },
    { nombre: "Grace", edad: 85, activo: true },
];

const nombresActivos = usuarios
    .filter(u => u.activo)
    .map(u => u.nombre);
// ["Ada", "Grace"]
```

---

## Validación de JSON

JSON por sí solo no valida estructura. Si esperas `{ "email": "ada@ejemplo.com" }` y recibes `{ "email": 42 }`, JSON.parse no se queja — es JSON válido. Necesitas **validación**.

### Validación manual

```javascript
function validarUsuario(datos) {
    const errores = [];

    if (typeof datos.nombre !== "string" || datos.nombre.trim().length === 0) {
        errores.push("El nombre es obligatorio y debe ser texto");
    }

    if (typeof datos.email !== "string" || !datos.email.includes("@")) {
        errores.push("El email debe ser una dirección válida");
    }

    if (typeof datos.edad !== "number" || datos.edad < 0) {
        errores.push("La edad debe ser un número positivo");
    }

    return errores;
}

const errores = validarUsuario({ nombre: "", email: "invalido", edad: -5 });
// ["El nombre es obligatorio...", "El email debe ser...", "La edad debe ser..."]
```

### Validación con Zod

**Zod** es la biblioteca de validación más popular en TypeScript:

```bash
pnpm add zod
```

```typescript
import { z } from "zod";

const UsuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Email inválido"),
    edad: z.number().min(0).max(120),
    hobbies: z.array(z.string()).optional(),
});

// Validar
const resultado = UsuarioSchema.safeParse({
    nombre: "Ada",
    email: "ada@ejemplo.com",
    edad: 36,
});

if (resultado.success) {
    console.log("Datos válidos:", resultado.data);
} else {
    console.log("Errores:", resultado.error.errors);
}

// Inferir tipo de TypeScript
type Usuario = z.infer<typeof UsuarioSchema>;
// { nombre: string; email: string; edad: number; hobbies?: string[] }
```

---

## Un poco de historia: Douglas Crockford y el descubrimiento de JSON

![Retrato de Douglas Crockford con la especificación JSON de fondo, mostrando la sintaxis simple de objetos y arrays](/content/guides/json-y-manejo-de-datos/01-douglas-crockford-json.png)

*Douglas Crockford: quien descubrió, nombró y popularizó JSON como formato universal.*

**Douglas Crockford** no inventó JSON — la sintaxis ya existía en JavaScript desde su creación. Pero en **2001**, mientras trabajaba en State Software, Crockford se dio cuenta de que esa sintaxis podía ser un **formato de intercambio de datos** independiente del lenguaje.

Crockford registró el dominio `json.org`, escribió la especificación, y empezó a promoverlo. La adopción fue lenta al principio. XML era el estándar dominante para intercambio de datos, con su complejidad de schemas, namespaces y parsers.

El punto de inflexión llegó cuando **Yahoo!** empezó a ofrecer JSON como alternativa a XML en sus APIs en **2005**, seguido por **Google** y **Twitter**. JSON era más simple, más ligero y más natural para JavaScript.

Crockford también es conocido por crear **JSLint** (el primer linter de JavaScript) y por su libro *"JavaScript: The Good Parts"*, que influyó en toda una generación de desarrolladores.

---

## Por qué importa

JSON es el formato de datos más importante de la web moderna:

- **APIs:** casi todas las APIs REST devuelven JSON
- **Configuración:** `package.json`, `tsconfig.json`, `.eslintrc` — todo es JSON
- **Almacenamiento:** archivos de datos, logs, backups
- **Comunicación:** mensajes entre servicios, eventos, webhooks

Dominar JSON significa dominar cómo se mueven los datos en la web.

---

## La IA y JSON

### Lo bueno

- **Generar schemas de validación:** describe la estructura y la IA genera el schema de Zod.
- **Transformar datos:** "convierte este array de objetos a un objeto indexado por ID" — la IA genera el código.
- **Debuggear JSON inválido:** pega JSON roto y la IA encuentra el error.
- **Convertir entre formatos:** JSON ↔ YAML ↔ XML — la IA convierte.

### Lo que no debes hacer

- **No parses JSON de fuentes no confiables sin validar.** JSON puede contener datos maliciosos.
- **No asumas que los datos tienen la estructura esperada.** Siempre valida antes de usar.
- **No guardes datos sensibles en JSON sin cifrar.** JSON es texto plano.

---

## Desafío: procesador de datos JSON

**Objetivo:** crear un script que lea, valide, transforme y escriba datos JSON.

**Tu tarea:**

1. Crea un archivo `usuarios.json` con un array de al menos 10 usuarios:
   ```json
   [
       { "nombre": "Ada", "email": "ada@ejemplo.com", "edad": 36, "activo": true },
       ...
   ]
   ```
   Incluye al menos 2 usuarios con datos inválidos (email sin @, edad negativa, nombre vacío)

2. Crea un script `procesar.ts` que:
   - Lea el archivo JSON
   - Valide cada usuario con Zod (o validación manual)
   - Separe válidos de inválidos
   - De los válidos, filtre solo los activos
   - Ordene por nombre alfabéticamente
   - Escriba dos archivos: `usuarios_validos.json` y `usuarios_invalidos.json`
   - Imprima un resumen: total, válidos, inválidos, activos

**Bonus:** agrega un endpoint en tu API de Hono que acepte un JSON de usuarios, los valide y devuelva el mismo resumen.

---

## Para seguir explorando

- **[JSON.org](https://www.json.org/json-es.html)** — la especificación oficial en español.
- **[Zod Documentation](https://zod.dev/)** — la biblioteca de validación más popular.
- **[JSON Schema](https://json-schema.org/)** — un estándar más formal para validar JSON.
- **[JSON Crack](https://jsoncrack.com/)** — herramienta visual para explorar JSON complejos.

---

## Resumen

- **JSON** es un formato de texto para datos estructurados con 6 tipos: string, number, boolean, null, array, object.
- **`JSON.parse()`** convierte string a objeto; **`JSON.stringify()`** convierte objeto a string.
- **Optional chaining** (`?.`) accede a propiedades anidadas sin crashear si no existen.
- **Destructuring** extrae valores de objetos y arrays en variables.
- **Spread** (`...`) copia y mergea objetos y arrays.
- Los métodos esenciales de array son: **map**, **filter**, **find**, **reduce**, **some**, **every**.
- JSON no valida estructura — necesitas **Zod** o validación manual para verificar datos.
- JSON fue popularizado por **Douglas Crockford** en 2001, reemplazando a XML como formato de intercambio.

En la próxima guía vamos a aprender a visualizar sistemas: **Diagramas básicos: flujo, casos de uso y MER** — cómo comunicar arquitectura con dibujos.
