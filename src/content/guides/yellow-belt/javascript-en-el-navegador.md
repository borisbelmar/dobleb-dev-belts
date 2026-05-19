---
title: "JavaScript en el navegador: DOM y eventos básicos"
description: "Dale vida a tus páginas HTML con JavaScript. Aprende a manipular el DOM, responder a clicks y crear interactividad real."
belt: yellow-belt
tags: [javascript, dom, eventos, navegador, frontend]
order: 3
published: true
lastRevision: "2026-05-19"
---

Hasta ahora tienes páginas HTML con estilos CSS. Se ven bien, pero no hacen nada. Un botón no responde al click. Un formulario no valida datos. Nada cambia. **JavaScript** es lo que transforma documentos estáticos en experiencias interactivas.

En esta guía vas a aprender a manipular el DOM, escuchar eventos del usuario y crear páginas que responden a las acciones de quien las visita.

---

## ¿Qué es JavaScript?

JavaScript es un lenguaje de programación que se ejecuta en el navegador. A diferencia de HTML (estructura) y CSS (estilo), JavaScript puede:

- **Modificar** cualquier elemento de la página en tiempo real
- **Responder** a clicks, teclas, movimientos del mouse, scroll
- **Enviar y recibir datos** de servidores sin recargar la página
- **Validar** formularios antes de enviarlos
- **Animar** elementos visualmente

JavaScript fue creado por **Brendan Eich** en **1995** en solo 10 días para Netscape. Originalmente se llamaba Mocha, luego LiveScript, y finalmente JavaScript (un nombre elegido por marketing para aprovechar la popularidad de Java, a pesar de que los lenguajes no tienen relación).

---

## Agregar JavaScript a tu página

```html
<!-- Opción 1: inline (no recomendado) -->
<button onclick="alert('Hola!')">Click</button>

<!-- Opción 2: script en el HTML -->
<script>
    console.log("Hola desde JavaScript");
</script>

<!-- Opción 3: archivo externo (recomendado) -->
<script src="app.js"></script>

<!-- Opción 4: archivo externo con defer (mejor para performance) -->
<script src="app.js" defer></script>
```

**`defer`** le dice al navegador: "descarga este script pero no lo ejecutes hasta que el HTML esté completamente parseado". Esto evita que el JavaScript bloquee el renderizado de la página.

---

## El DOM: tu interfaz con la página

El **DOM** (Document Object Model) es la representación de tu HTML como un árbol de objetos que JavaScript puede leer y modificar.

### Seleccionar elementos

```javascript
// Por ID (devuelve un solo elemento)
const titulo = document.getElementById("titulo");

// Por selector CSS (devuelve el primero)
const primerParrafo = document.querySelector("p");
const destacado = document.querySelector(".destacado");
const menu = document.querySelector("#nav a:first-child");

// Por selector CSS (devuelve TODOS los que coinciden)
const todosLosParrafos = document.querySelectorAll("p");
const items = document.querySelectorAll(".item");

// Recorrer una NodeList
items.forEach(item => {
    console.log(item.textContent);
});
```

`querySelector` y `querySelectorAll` son los más versátiles porque aceptan cualquier selector CSS.

### Modificar elementos

```javascript
const titulo = document.querySelector("h1");

// Cambiar texto
titulo.textContent = "Nuevo título";

// Cambiar HTML interno
titulo.innerHTML = "Nuevo <em>título</em>";

// Cambiar atributos
const link = document.querySelector("a");
link.href = "https://nueva-url.com";
link.setAttribute("target", "_blank");

// Cambiar estilos
titulo.style.color = "blue";
titulo.style.fontSize = "2rem";

// Agregar/quitar clases (la forma recomendada)
titulo.classList.add("activo");
titulo.classList.remove("oculto");
titulo.classList.toggle("visible");  // agrega si no tiene, quita si tiene
```

### Crear y eliminar elementos

```javascript
// Crear un nuevo elemento
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Soy un párrafo nuevo";
nuevoParrafo.classList.add("destacado");

// Agregarlo al DOM
document.querySelector("main").appendChild(nuevoParrafo);

// O insertarlo en una posición específica
const referencia = document.querySelector("#referencia");
referencia.before(nuevoParrafo);    // antes del elemento
referencia.after(nuevoParrafo);     // después del elemento

// Eliminar un elemento
const viejo = document.querySelector(".viejo");
viejo.remove();
```

![Diagrama del DOM tree mostrando cómo JavaScript puede seleccionar nodos, modificar atributos, crear nuevos elementos y eliminar existentes, con flechas de acción](/content/guides/javascript-en-el-navegador/01-dom-manipulation.png)

*JavaScript interactúa con el DOM: seleccionar, modificar, crear y eliminar elementos en tiempo real.*

---

## Eventos: responder al usuario

Los **eventos** son acciones del usuario (o del navegador) a las que tu código puede responder.

### Escuchar eventos

```javascript
// Forma recomendada: addEventListener
const boton = document.querySelector("#mi-boton");

boton.addEventListener("click", () => {
    alert("¡Hiciste click!");
});

// Con acceso al evento
boton.addEventListener("click", (evento) => {
    console.log("Click en:", evento.target);
    console.log("Posición X:", evento.clientX);
    console.log("Posición Y:", evento.clientY);
});
```

### Eventos comunes

| Evento | Cuándo se dispara |
|--------|-------------------|
| `click` | Click en un elemento |
| `dblclick` | Doble click |
| `mouseenter` | El mouse entra al elemento |
| `mouseleave` | El mouse sale del elemento |
| `keydown` | Se presiona una tecla |
| `keyup` | Se suelta una tecla |
| `submit` | Se envía un formulario |
| `input` | Cambia el valor de un input |
| `change` | Cambia el valor y pierde el foco |
| `scroll` | El usuario hace scroll |
| `load` | La página terminó de cargar |

### Ejemplo: contador interactivo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Contador</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f0f0f0;
        }
        .contador {
            text-align: center;
            background: white;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .numero {
            font-size: 4rem;
            font-weight: bold;
            margin: 1rem 0;
        }
        .botones {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        button {
            padding: 0.75rem 1.5rem;
            font-size: 1.2rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.1s;
        }
        button:hover { transform: scale(1.05); }
        .incrementar { background: #4CAF50; color: white; }
        .decrementar { background: #f44336; color: white; }
        .reset { background: #2196F3; color: white; }
    </style>
</head>
<body>
    <div class="contador">
        <h1>Contador</h1>
        <div class="numero" id="numero">0</div>
        <div class="botones">
            <button class="decrementar" id="decrementar">−</button>
            <button class="reset" id="reset">Reset</button>
            <button class="incrementar" id="incrementar">+</button>
        </div>
    </div>

    <script>
        let contador = 0;
        const display = document.querySelector("#numero");

        function actualizar() {
            display.textContent = contador;
            // Cambiar color según el valor
            if (contador > 0) display.style.color = "#4CAF50";
            else if (contador < 0) display.style.color = "#f44336";
            else display.style.color = "#333";
        }

        document.querySelector("#incrementar").addEventListener("click", () => {
            contador++;
            actualizar();
        });

        document.querySelector("#decrementar").addEventListener("click", () => {
            contador--;
            actualizar();
        });

        document.querySelector("#reset").addEventListener("click", () => {
            contador = 0;
            actualizar();
        });
    </script>
</body>
</html>
```

![Captura de pantalla del contador interactivo mostrando un número grande central con tres botones debajo: decrementar (rojo), reset (azul), incrementar (verde), con diseño centrado y sombra](/content/guides/javascript-en-el-navegador/02-counter-app.png)

*Contador interactivo: JavaScript modifica el DOM en respuesta a clicks del usuario.*

---

## Formularios y JavaScript

Validar formularios antes de enviarlos es uno de los usos más comunes de JavaScript:

```html
<form id="registro">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" required>

    <label for="email">Email:</label>
    <input type="email" id="email" required>

    <label for="edad">Edad:</label>
    <input type="number" id="edad" min="1" max="120">

    <button type="submit">Registrarse</button>
</form>

<script>
    document.querySelector("#registro").addEventListener("submit", (e) => {
        e.preventDefault();  // Evita que el formulario se envíe normalmente

        const nombre = document.querySelector("#nombre").value;
        const email = document.querySelector("#email").value;
        const edad = document.querySelector("#edad").value;

        // Validación personalizada
        if (edad && (edad < 1 || edad > 120)) {
            alert("La edad debe estar entre 1 y 120");
            return;
        }

        // Enviar datos (aquí iría la lógica real)
        console.log("Datos:", { nombre, email, edad });
        alert(`¡Bienvenido/a, ${nombre}!`);
    });
</script>
```

**`e.preventDefault()`** es crucial: detiene el comportamiento por defecto del evento. En un formulario, evita que la página se recargue al enviar.

---

## Manipular clases para animaciones

JavaScript puede agregar y quitar clases CSS para crear animaciones y transiciones:

```html
<style>
    .modal {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        pointer-events: none;
    }
    .modal.activo {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }
</style>

<div class="modal" id="modal">
    <p>¡Este es un modal!</p>
    <button id="cerrar">Cerrar</button>
</div>
<button id="abrir">Abrir modal</button>

<script>
    const modal = document.querySelector("#modal");

    document.querySelector("#abrir").addEventListener("click", () => {
        modal.classList.add("activo");
    });

    document.querySelector("#cerrar").addEventListener("click", () => {
        modal.classList.remove("activo");
    });
</script>
```

La magia está en el CSS: `transition` anima los cambios de `opacity` y `transform`, y JavaScript solo agrega o quita la clase `.activo`.

---

## localStorage: guardar datos en el navegador

`localStorage` permite guardar datos que persisten incluso después de cerrar el navegador:

```javascript
// Guardar datos (solo strings)
localStorage.setItem("nombre", "Ada");
localStorage.setItem("tema", "oscuro");

// Leer datos
const nombre = localStorage.getItem("nombre");  // "Ada"

// Guardar objetos (convertir a JSON)
const preferencias = { tema: "oscuro", idioma: "es" };
localStorage.setItem("prefs", JSON.stringify(preferencias));

// Leer objetos (parsear JSON)
const prefs = JSON.parse(localStorage.getItem("prefs"));
console.log(prefs.tema);  // "oscuro"

// Eliminar un dato
localStorage.removeItem("nombre");

// Eliminar todo
localStorage.clear();
```

### Contador con persistencia

```javascript
// Leer el valor guardado o empezar en 0
let contador = parseInt(localStorage.getItem("contador")) || 0;

function actualizar() {
    display.textContent = contador;
    localStorage.setItem("contador", contador.toString());
}
```

Ahora el contador recuerda su valor incluso si cierras y reabres el navegador.

---

## Un poco de historia: la guerra de los navegadores

![Ilustración de la guerra de navegadores de los 90: logos de Netscape Navigator e Internet Explorer enfrentados, con JavaScript y JScript como armas, y el W3C intentando poner paz](/content/guides/javascript-en-el-navegador/03-browser-wars.png)

*La guerra de los navegadores: Netscape vs Microsoft, y cómo JavaScript casi se fragmenta para siempre.*

Cuando Brendan Eich creó JavaScript en 1995, Microsoft respondió creando **JScript** para Internet Explorer 3. Era esencialmente el mismo lenguaje con otro nombre, para evitar pagar licencias a Netscape.

Esto creó un caos: los desarrolladores tenían que escribir código diferente para cada navegador. La web se estaba fragmentando.

En **1997**, **ECMA International** estandarizó el lenguaje como **ECMAScript** (de ahí `ES6`, `ES2020`, etc.). Pero la estandarización no resolvió todo. Internet Explorer 6 (2001) tenía su propia interpretación del DOM, con bugs que los desarrolladores tuvieron que hackear durante años.

La paz llegó con **jQuery** (2006), una biblioteca que unificaba las diferencias entre navegadores. Con jQuery, escribías `$("#mi-elemento")` y funcionaba igual en todos lados. jQuery fue tan dominante que durante años fue la biblioteca de JavaScript más usada en la web.

Hoy los navegadores modernos (Chrome, Firefox, Safari, Edge) implementan los estándares de forma bastante consistente, y JavaScript nativo es suficiente para la mayoría de las tareas.

---

## Por qué importa

JavaScript en el navegador es lo que separa una página estática de una aplicación web. Entender el DOM y los eventos te permite:

- **Crear interactividad:** botones que responden, formularios que validan, menús que se abren
- **Manipular contenido dinámico:** agregar, modificar o eliminar elementos sin recargar
- **Guardar datos localmente:** preferencias del usuario, carritos de compra, borradores
- **Entender frameworks:** React, Vue y Svelte son abstracciones sobre el DOM. Sin entender el DOM, no entiendes qué hacen realmente.

---

## La IA y JavaScript en el navegador

### Lo bueno

- **Generar event listeners:** describe la interacción y la IA genera el código del evento.
- **Explicar el DOM:** "¿cómo selecciono el tercer hijo de un div?" — la IA da el selector exacto.
- **Debuggear errores de JavaScript:** pega el error de la consola y la IA lo explica.
- **Convertir jQuery a JavaScript nativo:** la IA moderniza código antiguo.

### Lo que no debes hacer

- **No copies código con `innerHTML` sin sanitizar.** Si el contenido viene del usuario, es un riesgo de XSS.
- **No uses `eval()`** bajo ninguna circunstancia, ni siquiera si la IA lo sugiere.
- **No delegues la comprensión del DOM.** Si no entiendes qué elemento selecciona tu código, no lo uses.

---

## Desafío: lista de tareas interactiva

**Objetivo:** crear una aplicación de lista de tareas (todo list) completamente funcional.

**Tu tarea:**

1. Crea un archivo `todo.html` con:
   - Un input de texto para escribir nuevas tareas
   - Un botón "Agregar"
   - Una lista (`<ul>`) donde se muestran las tareas
2. Con JavaScript, implementa:
   - Al hacer click en "Agregar", crea un nuevo `<li>` con la tarea
   - Cada tarea tiene un botón "Eliminar" que la quita de la lista
   - Al hacer click en el texto de la tarea, se marca como completada (agrega una clase `.completada` con `text-decoration: line-through`)
   - Un contador que muestra cuántas tareas quedan pendientes
3. Usa `localStorage` para que las tareas persistan al recargar la página

**Bonus:** agrega un botón "Limpiar completadas" que elimine todas las tareas marcadas, y un filtro para mostrar "Todas", "Pendientes" o "Completadas".

---

## Para seguir explorando

- **[MDN — DOM Introduction](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction)** — documentación oficial del DOM en español.
- **[JavaScript.info](https://javascript.info/document)** — tutorial moderno y completo de JavaScript.
- **[Eloquent JavaScript](https://eloquentjavascript.net/)** — libro gratuito online, excelente para profundizar.
- **[The Modern JavaScript Tutorial](https://javascript.info/)** — de lo básico a avanzado con ejercicios.

---

## Resumen

- **JavaScript** es el lenguaje de programación del navegador que permite interactividad.
- El **DOM** es el árbol de objetos que representa tu HTML; JavaScript lo puede leer y modificar.
- **`querySelector`** y **`querySelectorAll`** seleccionan elementos usando selectores CSS.
- **`addEventListener`** registra funciones que se ejecutan cuando ocurre un evento (click, submit, keydown).
- **`e.preventDefault()`** detiene el comportamiento por defecto de un evento.
- **`localStorage`** guarda datos en el navegador que persisten entre sesiones (solo strings, usa `JSON.stringify`/`JSON.parse` para objetos).
- JavaScript fue creado por **Brendan Eich** en 1995 en 10 días para Netscape.
- La **guerra de navegadores** (Netscape vs IE) fragmentó JavaScript hasta que ECMA lo estandarizó en 1997.
- **jQuery** (2006) unificó las diferencias entre navegadores y dominó la web durante años.

En la próxima guía vamos a salir del navegador y entrar al servidor: **Introducción a Node.js, npm y pnpm** — cómo ejecutar JavaScript fuera del navegador y gestionar paquetes.
