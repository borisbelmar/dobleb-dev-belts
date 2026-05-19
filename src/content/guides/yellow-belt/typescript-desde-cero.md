---
title: "TypeScript desde cero: tipado que salva vidas"
description: "Agrega tipos a tu JavaScript y detecta errores antes de ejecutar el código. El estándar de la industria para escribir software confiable."
belt: yellow-belt
tags: [typescript, tipado, javascript, fundamentos]
order: 5
published: true
lastRevision: "2026-05-19"
---

JavaScript es un lenguaje sin tipos: puedes sumar un string con un número, pasar un objeto donde se espera un array, y el error solo aparece cuando el código se ejecuta. En producción. A las 3 de la mañana.

**TypeScript** soluciona esto agregando tipos a JavaScript. No es un lenguaje nuevo — es JavaScript con superpoderes. El compilador de TypeScript verifica los tipos antes de que el código se ejecute, atrapando errores que en JavaScript solo descubrirías en producción.

En esta guía vas a aprender los fundamentos de TypeScript: tipos básicos, interfaces, generics y cómo configurar un proyecto desde cero.

---

## ¿Qué es TypeScript?

TypeScript es un **superset tipado** de JavaScript. Esto significa que:

- **Todo JavaScript válido es TypeScript válido**
- TypeScript agrega **anotaciones de tipo** opcionales
- El compilador (`tsc`) **transpila** TypeScript a JavaScript puro
- Los tipos **desaparecen en runtime** — solo existen durante la compilación

```typescript
// JavaScript (sin tipos)
function sumar(a, b) {
    return a + b;
}
sumar(2, 3);       // 5
sumar("2", 3);     // "23" — bug silencioso

// TypeScript (con tipos)
function sumar(a: number, b: number): number {
    return a + b;
}
sumar(2, 3);       // ✅ OK
sumar("2", 3);     // ❌ Error en compilación: Argument of type 'string' is not assignable to parameter of type 'number'
```

El error se detecta **antes de ejecutar**, no en producción.

---

## Instalación y setup

```bash
# Crear proyecto
mkdir mi-app-ts && cd mi-app-ts
pnpm init

# Instalar TypeScript
pnpm add -D typescript

# Inicializar configuración
pnpm exec tsc --init
```

Esto genera un `tsconfig.json` — la configuración del compilador:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**`"strict": true`** activa todas las verificaciones estrictas. Actívalo siempre.

### Compilar y ejecutar

```bash
# Compilar TypeScript a JavaScript
pnpm exec tsc

# Los archivos .ts de src/ se compilan a .js en dist/
# Ejecutar el resultado
node dist/index.js
```

### Modo desarrollo con watch

```bash
pnpm exec tsc --watch
# Recompila automáticamente al guardar
```

---

## Tipos básicos

```typescript
// Tipos primitivos
let nombre: string = "Ada";
let edad: number = 25;
let activo: boolean = true;

// Arrays
let numeros: number[] = [1, 2, 3];
let nombres: Array<string> = ["Ada", "Alan"];  // Sintaxis genérica

// Tuplas (array con tipos fijos por posición)
let coordenada: [number, number] = [10, 20];

// Any (evitarlo — desactiva la verificación de tipos)
let cualquiera: any = "hola";
cualquiera = 42;  // No da error, pero pierdes la protección

// Unknown (mejor que any — requiere verificar antes de usar)
let desconocido: unknown = "hola";
if (typeof desconocido === "string") {
    console.log(desconocido.toUpperCase());  // ✅ OK
}

// Void (función que no retorna nada)
function log(msg: string): void {
    console.log(msg);
}

// Never (función que nunca retorna — siempre lanza error)
function error(msg: string): never {
    throw new Error(msg);
}
```

### Uniones e intersecciones

```typescript
// Union: puede ser uno U otro
let id: string | number;
id = "abc";  // ✅
id = 123;    // ✅
id = true;   // ❌ Error

// Type narrowing: verificar el tipo antes de usar
function procesar(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());  // TypeScript sabe que es string
    } else {
        console.log(id.toFixed(2));     // TypeScript sabe que es number
    }
}

// Literales: valores específicos
type MetodoHTTP = "GET" | "POST" | "PUT" | "DELETE";
let metodo: MetodoHTTP = "GET";  // ✅
metodo = "PATCH";  // ❌ Error
```

---

## Interfaces y tipos

### Interfaces

Las **interfaces** definen la forma de un objeto:

```typescript
interface Usuario {
    nombre: string;
    email: string;
    edad: number;
    activo?: boolean;  // Propiedad opcional
}

const ada: Usuario = {
    nombre: "Ada Lovelace",
    email: "ada@ejemplo.com",
    edad: 36,
};  // ✅ activo es opcional

// Las interfaces se pueden extender
interface Admin extends Usuario {
    rol: "admin" | "superadmin";
    permisos: string[];
}

const admin: Admin = {
    nombre: "Grace",
    email: "grace@ejemplo.com",
    edad: 85,
    rol: "admin",
    permisos: ["leer", "escribir", "eliminar"],
};
```

### Type aliases

Los **type aliases** son similares pero más flexibles:

```typescript
type ID = string | number;
type Callback = (data: string) => void;

type Resultado<T> = {
    exito: true;
    datos: T;
} | {
    exito: false;
    error: string;
};

function buscar(id: ID): Resultado<Usuario> {
    // ...
}
```

### Interfaces vs Type aliases

| | Interface | Type alias |
|---|---|---|
| Extender | `extends` | `&` (intersección) |
| Uniones | ❌ No | ✅ Sí |
| Declaration merging | ✅ Sí | ❌ No |
| Primitivos | ❌ No | ✅ Sí |

**Regla práctica:** usa `interface` para objetos y `type` para uniones, literales y tipos genéricos.

---

## Funciones tipadas

```typescript
// Función con tipos en parámetros y retorno
function saludar(nombre: string): string {
    return `Hola, ${nombre}!`;
}

// Función con parámetro opcional
function sumar(a: number, b: number, redondear: boolean = false): number {
    const resultado = a + b;
    return redondear ? Math.round(resultado) : resultado;
}

// Función que acepta otra función (callback)
function procesarArray<T>(arr: T[], fn: (item: T) => void): void {
    arr.forEach(fn);
}

procesarArray([1, 2, 3], (n) => console.log(n));
```

---

## Generics: tipos reutilizables

Los **generics** permiten crear funciones y tipos que trabajan con múltiples tipos sin perder la información de tipo:

```typescript
// Sin generics: pierdes el tipo
function primero(arr: any[]): any {
    return arr[0];
}
const resultado = primero([1, 2, 3]);  // any — no sabes qué es

// Con generics: mantienes el tipo
function primero<T>(arr: T[]): T {
    return arr[0];
}
const num = primero([1, 2, 3]);     // number
const str = primero(["a", "b"]);    // string

// Generics con restricciones
function obtenerPropiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const usuario = { nombre: "Ada", edad: 36 };
obtenerPropiedad(usuario, "nombre");  // ✅ string
obtenerPropiedad(usuario, "email");   // ❌ Error: "email" no existe en Usuario
```

---

## Enums

Los **enums** definen un conjunto de valores nombrados:

```typescript
enum Estado {
    Pendiente = "pendiente",
    EnProgreso = "en_progreso",
    Completado = "completado",
}

let tarea: Estado = Estado.Pendiente;

// Enums numéricos (por defecto)
enum Rol {
    Viewer,    // 0
    Editor,    // 1
    Admin,     // 2
}
```

Alternativa moderna con `as const`:

```typescript
const Estado = {
    Pendiente: "pendiente",
    EnProgreso: "en_progreso",
    Completado: "completado",
} as const;

type Estado = typeof Estado[keyof typeof Estado];
// "pendiente" | "en_progreso" | "completado"
```

---

## TypeScript con Node.js y Express

```typescript
// src/index.ts
import express, { Request, Response } from "express";

interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
}

const app = express();
app.use(express.json());

let tareas: Tarea[] = [];
let nextId = 1;

app.get("/tareas", (_req: Request, res: Response): void => {
    res.json(tareas);
});

app.post("/tareas", (req: Request, res: Response): void => {
    const { titulo }: { titulo: string } = req.body;
    const nueva: Tarea = { id: nextId++, titulo, completada: false };
    tareas.push(nueva);
    res.status(201).json(nueva);
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
```

---

## Un poco de historia: Anders Hejlsberg y la apuesta de Microsoft

![Ilustración de Anders Hejlsberg en Microsoft presentando TypeScript, con código JavaScript transformándose en código tipado en una pantalla](/content/guides/typescript-desde-cero/01-anders-hejlsberg.png)

*Anders Hejlsberg: el creador de TypeScript y antes de C# y Turbo Pascal.*

TypeScript fue creado por **Anders Hejlsberg** en Microsoft y lanzado en **2012**. Hejlsberg ya era legendario: creó **Turbo Pascal**, fue el arquitecto principal de **C#** en .NET, y trabajó en **Delphi**.

La idea de TypeScript nació de la experiencia de Microsoft construyendo aplicaciones web enormes. JavaScript funcionaba bien para scripts pequeños, pero a escala de miles de archivos, los errores de tipo silenciosos costaban horas de debugging.

TypeScript fue controvertido al principio. Muchos desarrolladores lo vieron como "JavaScript con camisa y corbata" — una forma de Microsoft de imponer su visión sobre un lenguaje comunitario. Pero el tiempo demostró que estaba en lo correcto.

Hoy TypeScript es el estándar de la industria para proyectos serios. React, Angular, Vue, Node.js, Deno — todos tienen soporte nativo o están escritos en TypeScript. El 90% de los proyectos nuevos en JavaScript usan TypeScript.

---

## Por qué importa

TypeScript no es un lujo — es una necesidad en proyectos reales:

- **Detecta errores antes de ejecutar:** tipos incorrectos, propiedades inexistentes, funciones mal llamadas
- **Autocompletado inteligente:** tu editor sabe qué métodos tiene cada objeto
- **Refactorización segura:** renombrar una propiedad actualiza todos los usos
- **Documentación viva:** los tipos documentan qué espera cada función
- **Mejor experiencia con IA:** los asistentes de código entienden mejor TypeScript porque los tipos dan contexto

El costo de aprender TypeScript se paga solo con el primer bug que atrapa antes de llegar a producción.

---

## La IA y TypeScript

### Lo bueno

- **Generar interfaces:** describe un JSON y la IA genera la interface de TypeScript.
- **Sugerir tipos:** muéstrale una función sin tipos y la IA los agrega.
- **Explicar errores de compilación:** los mensajes de TypeScript pueden ser largos; la IA los resume.
- **Convertir JavaScript a TypeScript:** pega código JS y la IA lo tipa.

### Lo que no debes hacer

- **No uses `any` porque la IA lo sugirió para "hacerlo compilar".** `any` anula toda la protección de TypeScript.
- **No aceptes tipos genéricos sin entenderlos.** Los generics pueden ser complejos; asegúrate de entender qué hacen.
- **No ignores los errores del compilador.** Si TypeScript se queja, hay una razón.

---

## Desafío: tipa tu proyecto

**Objetivo:** convertir un proyecto JavaScript a TypeScript.

**Tu tarea:**

1. Crea un archivo `tareas.js` con estas funciones:
   ```javascript
   function crearTarea(titulo, descripcion) {
       return { titulo, descripcion, completada: false };
   }
   function completarTarea(tarea) {
       tarea.completada = true;
       return tarea;
   }
   function filtrarTareas(tareas, completadas) {
       return tareas.filter(t => t.completada === completadas);
   }
   ```
2. Renómbralo a `tareas.ts` y agrega tipos a todas las funciones
3. Crea una interface `Tarea`
4. Agrega una función `buscarTarea(tareas: Tarea[], id: number): Tarea | undefined`
5. Configura `tsconfig.json` con `strict: true` y compila el proyecto
6. Corrige todos los errores que el compilador encuentre

**Bonus:** agrega una función genérica `paginar<T>(items: T[], pagina: number, porPagina: number): T[]` que devuelva las tareas de una página específica.

---

## Para seguir explorando

- **[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)** — la guía oficial, excelente.
- **[Total TypeScript](https://totaltypescript.com/)** — tutoriales avanzados de TypeScript.
- **[Type Challenges](https://type-challenges.github.io/)** — ejercicios para dominar los tipos de TypeScript.
- **[The TypeScript Evolution blog](https://www.stefanjudis.com/today-i-learned/)** — novedades de cada versión.

---

## Resumen

- **TypeScript** es JavaScript con tipos que se verifican en compilación, no en runtime.
- Los tipos **desaparecen** cuando se compila a JavaScript — son solo para desarrollo.
- Tipos básicos: `string`, `number`, `boolean`, `array`, `tuple`, `void`, `never`, `unknown`.
- **Interfaces** definen la forma de objetos; **type aliases** son más flexibles (uniones, literales).
- **Generics** permiten crear funciones y tipos reutilizables sin perder información de tipo.
- **`strict: true`** en `tsconfig.json` activa todas las verificaciones — úsalo siempre.
- TypeScript fue creado por **Anders Hejlsberg** en Microsoft en 2012.
- Hoy es el estándar de la industria para proyectos JavaScript serios.

En la próxima guía vamos a diseñar interfaces de comunicación entre servicios: **APIs REST: qué son y cómo se diseñan** — los principios que hacen que las APIs sean intuitivas y consistentes.
