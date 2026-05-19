---
title: "SOLID y Clean Code: escribir código que se entiende"
description: "Principios de diseño de software y prácticas de código limpio que hacen tu código mantenible, testeable y profesional."
belt: yellow-belt
tags: [solid, clean-code, principios, diseño, buenas-practicas]
order: 14
published: true
lastRevision: "2026-05-19"
---

Escribir código que funciona es fácil. Escribir código que otro programador (o tu yo de dentro de 6 meses) pueda entender, modificar y extender sin romper todo — eso es el arte.

**SOLID** son cinco principios de diseño de software que guían cómo estructurar clases y módulos. **Clean Code** es un conjunto de prácticas para escribir código legible. Juntos forman la base de lo que separa código amateur de código profesional.

En esta guía vas a aprender cada principio con ejemplos prácticos en TypeScript.

---

## Clean Code: lo básico antes de SOLID

### Nombres que significan algo

```typescript
// ❌ Malo
function d(a, b) { return a * b; }
const x = 86400;

// ✅ Bueno
function calcularDistancia(kilometros, millas) { return kilometros * millas; }
const SEGUNDOS_POR_DIA = 86400;
```

Los nombres deben responder: ¿qué es? ¿para qué sirve? Si necesitas un comentario para explicar qué hace una función, el nombre es malo.

### Funciones que hacen una cosa

```typescript
// ❌ Hace tres cosas
function procesarUsuario(usuario) {
    validarEmail(usuario.email);
    const hash = await hashPassword(usuario.password);
    await db.save({ ...usuario, password: hash });
    await enviarEmailBienvenida(usuario.email);
}

// ✅ Cada función hace una cosa
function validarUsuario(usuario) { /* ... */ }
function crearUsuario(usuario) { /* ... */ }
function notificarUsuario(usuario) { /* ... */ }

// Composición
async function registrarUsuario(usuario) {
    validarUsuario(usuario);
    await crearUsuario(usuario);
    await notificarUsuario(usuario);
}
```

### Early return: evita nesting innecesario

```typescript
// ❌ Pyramid of doom
function procesarPago(pago) {
    if (pago.monto > 0) {
        if (pago.tarjeta) {
            if (pago.tarjeta.valida) {
                // lógica de pago
            }
        }
    }
}

// ✅ Early returns
function procesarPago(pago) {
    if (pago.monto <= 0) throw new Error("Monto inválido");
    if (!pago.tarjeta) throw new Error("Tarjeta requerida");
    if (!pago.tarjeta.valida) throw new Error("Tarjeta inválida");

    // lógica de pago, sin nesting
}
```

---

## SOLID

### S — Single Responsibility Principle

**Una clase o módulo debe tener una sola razón para cambiar.**

```typescript
// ❌ Hace todo: valida, guarda y envía emails
class UsuarioService {
    validar(usuario) { /* ... */ }
    guardar(usuario) { /* ... */ }
    enviarEmailBienvenida(usuario) { /* ... */ }
}

// ✅ Cada clase tiene una responsabilidad
class UsuarioValidator {
    validar(usuario) { /* ... */ }
}

class UsuarioRepository {
    guardar(usuario) { /* ... */ }
}

class EmailService {
    enviarBienvenida(usuario) { /* ... */ }
}
```

Si cambia la validación, solo toca `UsuarioValidator`. Si cambia la BD, solo `UsuarioRepository`.

### O — Open/Closed Principle

**Abierto para extensión, cerrado para modificación.**

```typescript
// ❌ Modificar para agregar cada nuevo tipo de pago
class ProcesadorPago {
    procesar(tipo, monto) {
        if (tipo === "tarjeta") { /* ... */ }
        else if (tipo === "paypal") { /* ... */ }
        else if (tipo === "crypto") { /* ... */ }
        // Cada nuevo tipo requiere modificar esta clase
    }
}

// ✅ Extender sin modificar
interface MetodoPago {
    procesar(monto: number): void;
}

class PagoTarjeta implements MetodoPago {
    procesar(monto: number) { /* ... */ }
}

class PagoPaypal implements MetodoPago {
    procesar(monto: number) { /* ... */ }
}

class PagoCrypto implements MetodoPago {
    procesar(monto: number) { /* ... */ }
}

// Agregar un nuevo método no requiere cambiar ProcesadorPago
class ProcesadorPago {
    constructor(private metodo: MetodoPago) {}
    procesar(monto: number) {
        this.metodo.procesar(monto);
    }
}
```

### L — Liskov Substitution Principle

**Las subclases deben poder reemplazar a sus clases base sin cambiar el comportamiento correcto del programa.**

```typescript
// ❌ RectanguloCuadrado viola LSP
class Rectangulo {
    constructor(public ancho: number, public alto: number) {}
    area() { return this.ancho * this.alto; }
}

class Cuadrado extends Rectangulo {
    constructor(lado: number) {
        super(lado, lado);
    }
    // Si alguien cambia ancho o alto, el cuadrado se rompe
}

function redimensionar(rect: Rectangulo) {
    rect.ancho = 5;
    rect.alto = 10;
    console.log(rect.area()); // Espera 50
}

redimensionar(new Cuadrado(4)); // 50? No, porque Cuadrado fuerza ancho === alto
```

La solución: no heredar cuando la subclase cambia el comportamiento fundamental. Composición sobre herencia.

### I — Interface Segregation Principle

**Es mejor muchas interfaces específicas que una interfaz general.**

```typescript
// ❌ Una interfaz gigante
interface Trabajador {
    trabajar(): void;
    comer(): void;
    dormir(): void;
}

class Humano implements Trabajador {
    trabajar() { /* ... */ }
    comer() { /* ... */ }
    dormir() { /* ... */ }
}

class Robot implements Trabajador {
    trabajar() { /* ... */ }
    comer() { /* No come */ throw new Error("No aplica"); }
    dormir() { /* No duerme */ throw new Error("No aplica"); }
}

// ✅ Interfaces segregadas
interface Trabajable {
    trabajar(): void;
}

interface Alimentable {
    comer(): void;
}

interface Descansable {
    dormir(): void;
}

class Humano implements Trabajable, Alimentable, Descansable { /* ... */ }
class Robot implements Trabajable { /* solo trabajar */ }
```

### D — Dependency Inversion Principle

**Depender de abstracciones, no de concreciones.**

```typescript
// ❌ Depende de implementación concreta
class PedidoService {
    private db = new MySQLDatabase();  // Hardcodeado

    crear(pedido) {
        this.db.save(pedido);
    }
}

// ✅ Depende de abstracción
interface Database {
    save(data: any): void;
}

class PedidoService {
    constructor(private db: Database) {}  // Inyectado

    crear(pedido) {
        this.db.save(pedido);
    }
}

// Puedes usar MySQL, PostgreSQL, SQLite, o un mock para tests
const service = new PedidoService(new PostgreSQLDatabase());
const testService = new PedidoService(new MockDatabase());
```

---

## Clean Code en la práctica

### Evitar comentarios que repiten el código

```typescript
// ❌ El comentario repite lo obvio
// Incrementar contador en 1
contador++;

// ✅ Mejor: el código se explica solo
intentosRestantes--;

// ✅ Comentario útil: explica el POR QUÉ, no el QUÉ
// Esperar 100ms porque la API rate-limited rechaza peticiones muy rápidas
await sleep(100);
```

### Código consistente

```typescript
// ❌ Inconsistente
function getUser() { }
function crear_pedido() { }
const EmailValido = true;

// ✅ Consistente (camelCase para funciones/variables)
function getUser() { }
function crearPedido() { }
const emailValido = true;
```

### Manejo de errores explícito

```typescript
// ❌ Silenciar errores
try {
    await guardarDatos();
} catch (e) {
    // Ignorar
}

// ✅ Manejar explícitamente
try {
    await guardarDatos();
} catch (error) {
    logger.error("Error al guardar datos", { error, datos });
    throw new Error("No se pudieron guardar los datos");
}
```

---

## Por qué importa

SOLID y Clean Code no son reglas religiosas — son herramientas pragmáticas:

- **Código legible** se mantiene más barato y se debuggea más rápido.
- **Principios SOLID** hacen tu código testeable y extensible.
- **Nombres claros** eliminan la necesidad de documentación externa.
- **Funciones pequeñas** son más fáciles de testear y reutilizar.

---

## La IA y Clean Code

### Lo bueno

- **Sugerir mejores nombres:** muéstrale una función y la IA sugiere nombres más descriptivos.
- **Refactorizar:** la IA extrae funciones, aplica SOLID, simplifica condiciones.
- **Revisar código:** la IA identifica violaciones de principios y sugiere mejoras.

### Lo que no debes hacer

- **No apliques SOLID dogmáticamente.** No todo necesita 15 clases. A veces un archivo simple es mejor.
- **No aceptes refactorings que compliquen sin necesidad.** La sobre-abstracción es tan mala como el código espagueti.
- **No uses nombres en inglés si tu equipo trabaja en español.** La consistencia con tu equipo importa más que el idioma.

---

## Desafío: refactoriza código sucio

**Objetivo:** aplicar Clean Code y SOLID a código problemático.

**Tu tarea:**

Refactoriza este código aplicando los principios que aprendiste:

```typescript
class UserManager {
    async doStuff(u, p, e, a) {
        if (u != null && u.length > 0 && p != null && p.length >= 8 && e != null && e.includes("@")) {
            let x = await require("crypto").randomBytes(16).toString("hex");
            let d = require("pg").Pool;
            let pool = new d({ connectionString: process.env.DB });
            let c = await pool.connect();
            try {
                await c.query("INSERT INTO users (name, pass, email, age) VALUES ($1, $2, $3, $4)", [u, x, e, a]);
                await require("nodemailer").createTransport({ host: "smtp.ejemplo.com" }).sendMail({
                    from: "noreply@ejemplo.com", to: e, subject: "Bienvenido", text: `Hola ${u}`
                });
            } finally { c.release(); }
        }
    }
}
```

**Bonus:** escribe tests unitarios para el código refactorizado.

---

## Para seguir explorando

- **[Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)** — libro de Robert C. Martin.
- **[Agile Software Development: Principles, Patterns, and Practices](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445)** — SOLID explicado por Uncle Bob.
- **[Refactoring Guru](https://refactoring.guru/)** — patrones de diseño y refactoring visual.

---

## Resumen

- **Clean Code:** nombres significativos, funciones que hacen una cosa, early returns, consistencia.
- **S — Single Responsibility:** una clase, una razón para cambiar.
- **O — Open/Closed:** extender sin modificar.
- **L — Liskov Substitution:** las subclases deben reemplazar a sus bases sin cambiar comportamiento.
- **I — Interface Segregation:** interfaces pequeñas y específicas.
- **D — Dependency Inversion:** depender de abstracciones, no de concreciones.
- Los principios son guías, no dogmas. Aplícalos con criterio.

En la próxima guía vamos a estilizar con propósito: **Tailwind CSS: estilos utilitarios en la práctica** — CSS moderno sin archivos separados.
