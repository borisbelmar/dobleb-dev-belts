---
title: "Paradigmas: programación funcional vs orientada a objetos"
description: "Entiende los dos paradigmas dominantes de programación, sus fortalezas, debilidades y cuándo usar cada uno."
belt: green-belt
tags: [paradigmas, funcional, oop, diseño, fundamentos]
order: 1
published: true
lastRevision: "2026-05-19"
---

No hay una forma "correcta" de programar. Hay **paradigmas** — marcos de pensamiento que determinan cómo estructuras tu código, cómo manejas datos y cómo resuelves problemas. Los dos dominantes son la **programación orientada a objetos** (OOP) y la **programación funcional** (FP).

En esta guía vas a entender ambos paradigmas, ver ejemplos comparativos y aprender cuándo cada uno brilla.

---

## Programación Orientada a Objetos (OOP)

La OOP organiza el código alrededor de **objetos** que combinan datos (estado) y comportamiento (métodos).

### Los cuatro pilares

```typescript
// 1. Encapsulamiento: estado privado, interfaz pública
class CuentaBancaria {
    private saldo: number;

    constructor(saldoInicial: number) {
        this.saldo = saldoInicial;
    }

    depositar(monto: number): void {
        if (monto <= 0) throw new Error("Monto inválido");
        this.saldo += monto;
    }

    retirar(monto: number): void {
        if (monto > this.saldo) throw new Error("Fondos insuficientes");
        this.saldo -= monto;
    }

    getSaldo(): number {
        return this.saldo;
    }
}

// 2. Herencia: reutilizar comportamiento
class CuentaAhorro extends CuentaBancaria {
    private tasaInteres: number;

    constructor(saldo: number, tasa: number) {
        super(saldo);
        this.tasaInteres = tasa;
    }

    aplicarInteres(): void {
        const interes = this.getSaldo() * this.tasaInteres;
        this.depositar(interes);
    }
}

// 3. Polimorfismo: misma interfaz, diferente implementación
interface Notificador {
    enviar(mensaje: string): void;
}

class EmailNotificador implements Notificador {
    enviar(mensaje: string) { console.log(`Email: ${mensaje}`); }
}

class SMSNotificador implements Notificador {
    enviar(mensaje: string) { console.log(`SMS: ${mensaje}`); }
}

function notificar(notif: Notificador, msg: string) {
    notif.enviar(msg);  // Funciona con cualquier Notificador
}

// 4. Abstracción: ocultar complejidad
abstract class Repository<T> {
    abstract findById(id: number): T | undefined;
    abstract save(entity: T): void;
    abstract delete(id: number): void;
}
```

### Cuándo brilla OOP

- **Dominios complejos con estado:** sistemas bancarios, juegos, simulaciones
- **Frameworks y librerías:** React (componentes como clases), Angular
- **Equipos grandes:** interfaces claras, encapsulamiento protege el estado
- **Modelado del mundo real:** objetos que representan entidades del dominio

---

## Programación Funcional (FP)

La FP organiza el código alrededor de **funciones puras** que transforman datos inmutables.

### Los principios

```typescript
// 1. Funciones puras: mismo input → mismo output, sin efectos secundarios
function sumar(a: number, b: number): number {
    return a + b;  // Siempre 5 para (2, 3). No modifica nada externo.
}

// ❌ Impura: depende de estado externo
let contador = 0;
function incrementar() {
    contador++;  // Efecto secundario
    return contador;
}

// 2. Inmutabilidad: los datos no se modifican, se transforman
interface Usuario {
    nombre: string;
    activo: boolean;
}

// ❌ Mutación
function desactivar(usuario: Usuario) {
    usuario.activo = false;  // Modifica el original
    return usuario;
}

// ✅ Inmutable
function desactivar(usuario: Usuario): Usuario {
    return { ...usuario, activo: false };  // Nuevo objeto
}

// 3. Funciones de orden superior: funciones que reciben/devuelven funciones
function multiplicarPor(factor: number): (n: number) => number {
    return (n: number) => n * factor;
}

const duplicar = multiplicarPor(2);
const triplicar = multiplicarPor(3);

console.log(duplicar(5));  // 10
console.log(triplicar(5)); // 15

// 4. Composición: combinar funciones simples en complejas
const pipe = <A, B, C>(f: (a: A) => B, g: (b: B) => C) => (x: A): C => g(f(x));

const toUpperCase = (s: string) => s.toUpperCase();
const exclaim = (s: string) => s + "!";
const shout = pipe(toUpperCase, exclaim);

console.log(shout("hola"));  // "HOLA!"

// 5. Manejo de errores con tipos, no excepciones
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function dividir(a: number, b: number): Result<number> {
    if (b === 0) return { ok: false, error: new Error("División por cero") };
    return { ok: true, value: a / b };
}

const resultado = dividir(10, 2);
if (resultado.ok) {
    console.log(resultado.value);  // 5
}
```

### Cuándo brilla FP

- **Transformación de datos:** pipelines de ETL, procesamiento de listas
- **Concurrencia:** sin estado mutable, no hay race conditions
- **Testing:** funciones puras son trivialmente testeables
- **React:** componentes funcionales + hooks son el estándar moderno
- **TypeScript:** el sistema de tipos se integra naturalmente con FP

---

## Comparación directa

### Mismo problema, dos enfoques

**Problema:** calcular el total de un carrito de compras con descuento e impuesto.

```typescript
// OOP: comportamiento encapsulado en objetos
class Carrito {
    private items: Item[] = [];

    agregar(item: Item) { this.items.push(item); }

    subtotal(): number {
        return this.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    total(descuento: number, impuesto: number): number {
        const sub = this.subtotal();
        const conDescuento = sub * (1 - descuento);
        return conDescuento * (1 + impuesto);
    }
}

// FP: pipeline de transformaciones
interface Item { precio: number; cantidad: number; }

const subtotal = (items: Item[]): number =>
    items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

const aplicarDescuento = (descuento: number) => (total: number) =>
    total * (1 - descuento);

const aplicarImpuesto = (impuesto: number) => (total: number) =>
    total * (1 + impuesto);

const calcularTotal = (items: Item[], descuento: number, impuesto: number): number =>
    pipe(
        () => subtotal(items),
        aplicarDescuento(descuento),
        aplicarImpuesto(impuesto),
    )(undefined as never);
```

---

## El enfoque práctico: mezclar ambos

En la práctica, el mejor código usa **ambos paradigmas**:

```typescript
// FP para lógica de negocio (funciones puras, inmutables)
function calcularPrecio(items: Item[], descuento: number): number {
    // ... lógica pura
}

// OOP para infraestructura (encapsulamiento de estado externo)
class DatabaseConnection {
    private pool: Pool;
    connect() { /* ... */ }
    query(sql: string) { /* ... */ }
    close() { /* ... */ }
}
```

---

## Por qué importa

Entender ambos paradigmas te permite:

- **Elegir la herramienta correcta** para cada problema
- **Leer código de otros** que usa un paradigma diferente al tuyo
- **Combinar lo mejor de ambos** en vez de ser dogmático
- **Entender frameworks:** React es funcional, Angular es orientado a objetos

---

## La IA y los paradigmas

### Lo bueno

- **Convertir entre paradigmas:** la IA puede refactorizar código OOP a FP y viceversa.
- **Explicar patrones:** la IA explica Factory, Strategy, Monad con ejemplos.
- **Sugerir el paradigma correcto:** describe tu problema y la IA recomienda el enfoque.

### Lo que no debes hacer

- **No mezcles paradigmas sin criterio.** Tener clases mutables Y funciones puras en el mismo módulo sin organización es caos.
- **No uses FP dogmáticamente.** A veces una clase con estado es la solución más simple.
- **No uses OOP dogmáticamente.** No todo necesita una jerarquía de herencia.

---

## Desafío: refactoriza entre paradigmas

**Objetivo:** convertir código entre OOP y FP.

**Tu tarea:**

1. Toma esta clase OOP y conviértela a FP:
```typescript
class ProcesadorTexto {
    private texto: string;
    constructor(texto: string) { this.texto = texto; }
    toUpperCase() { this.texto = this.texto.toUpperCase(); }
    removeVowels() { this.texto = this.texto.replace(/[aeiou]/gi, ''); }
    wordCount() { return this.texto.split(/\s+/).filter(Boolean).length; }
}
```

2. Toma estas funciones FP y organízalas en clases OOP:
```typescript
function crearUsuario(nombre: string, email: string) { /* ... */ }
function validarUsuario(usuario: Usuario) { /* ... */ }
function guardarUsuario(usuario: Usuario) { /* ... */ }
function enviarEmailBienvenida(usuario: Usuario) { /* ... */ }
```

**Bonus:** implementa el mismo problema (sistema de inventario) usando ambos paradigmas y compara.

---

## Para seguir explorando

- **[Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbook.io/mostly-adequate-guide)** — FP en JavaScript.
- **[Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)** — la biblia de patrones OOP.
- **[Functional Programming Jargon](https://github.com/hemanth/functional-programming-jargon)** — diccionario de términos FP.

---

## Resumen

- **OOP** organiza código en objetos que combinan estado y comportamiento (encapsulamiento, herencia, polimorfismo, abstracción).
- **FP** organiza código en funciones puras que transforman datos inmutables (pureza, inmutabilidad, composición, funciones de orden superior).
- **OOP brilla** en dominios con estado complejo, frameworks y modelado del mundo real.
- **FP brilla** en transformación de datos, concurrencia, testing y React.
- El **enfoque práctico** mezcla ambos: FP para lógica de negocio, OOP para infraestructura.
- El dogmatismo de paradigma es contraproducente — usa lo que resuelva el problema.

En la próxima guía vamos a construir interfaces modernas: **React desde cero: componentes, props y estado** — la librería de UI más popular del mundo.
