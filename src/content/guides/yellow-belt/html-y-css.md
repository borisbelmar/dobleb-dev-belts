---
title: "HTML y CSS: estructura y estilos"
description: "Aprende a crear documentos web con HTML y darles estilo con CSS. La base de absolutamente todo lo que ves en un navegador."
belt: yellow-belt
tags: [html, css, web, frontend, fundamentos]
order: 2
published: true
lastRevision: "2026-05-19"
---

Cada página web que has visitado — desde Google hasta tu red social favorita — está construida sobre dos tecnologías fundamentales: **HTML** para la estructura y **CSS** para la apariencia. No importa si usa React, Vue, Astro o cualquier framework moderno. Al final, todo se convierte en HTML y CSS que el navegador puede entender.

En esta guía vas a aprender a crear documentos web desde cero, entender la semántica HTML y darles estilo con CSS moderno.

---

## HTML: el esqueleto de la web

**HTML** (HyperText Markup Language) no es un lenguaje de programación. Es un **lenguaje de marcado**: define la estructura y el significado del contenido, no la lógica.

### Tu primera página HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi primera página</title>
</head>
<body>
    <h1>¡Hola, mundo!</h1>
    <p>Esta es mi primera página web.</p>
</body>
</html>
```

Guarda esto como `index.html` y ábrelo en tu navegador. ¡Ya tienes una página web!

### Anatomía del documento

- **`<!DOCTYPE html>`** — le dice al navegador que es HTML5 (la versión actual)
- **`<html lang="es">`** — el elemento raíz, con el idioma del contenido
- **`<head>`** — metadatos: título, charset, viewport, links a CSS
- **`<body>`** — el contenido visible de la página

### Elementos y etiquetas

HTML usa **etiquetas** (`tags`) que envuelven contenido:

```html
<etiqueta atributo="valor">contenido</etiqueta>
```

Algunas etiquetas son **autocerradas** (no tienen contenido):

```html
<img src="foto.jpg" alt="Descripción">
<br>
<hr>
<input type="text" name="nombre">
```

### Elementos de texto

```html
<h1>Título principal</h1>      <!-- Solo uno por página -->
<h2>Subtítulo</h2>
<h3>Sub-subtítulo</h3>
<h4>Hasta h6</h4>

<p>Este es un párrafo de texto.</p>

<strong>Texto importante (negrita semántica)</strong>
<em>Texto enfatizado (cursiva semántica)</em>

<a href="https://ejemplo.com">Enlace a ejemplo.com</a>
<a href="/contacto">Enlace interno</a>

<ul>
    <li>Elemento de lista desordenada</li>
    <li>Otro elemento</li>
</ul>

<ol>
    <li>Primer elemento de lista ordenada</li>
    <li>Segundo elemento</li>
</ol>
```

### Elementos estructurales (semánticos)

HTML5 introdujo etiquetas semánticas que describen **qué es** el contenido, no solo cómo se ve:

```html
<header>
    <nav>
        <a href="/">Inicio</a>
        <a href="/about">Acerca de</a>
    </nav>
</header>

<main>
    <article>
        <h2>Título del artículo</h2>
        <p>Contenido del artículo...</p>
    </article>

    <aside>
        <h3>Barra lateral</h3>
        <p>Contenido relacionado</p>
    </aside>
</main>

<footer>
    <p>&copy; 2026 Mi sitio web</p>
</footer>
```

![Diagrama de la estructura semántica HTML5 mostrando header, nav, main, article, aside, footer como bloques coloreados organizados en un layout de página típico](/content/guides/html-y-css/01-html-semantics.png)

*Estructura semántica HTML5: cada etiqueta describe el rol del contenido, no su apariencia.*

**¿Por qué importa la semántica?**
- **Accesibilidad:** los lectores de pantalla usan las etiquetas semánticas para navegar
- **SEO:** Google entiende mejor tu página
- **Mantenimiento:** el código es más legible para otros desarrolladores

### Formularios

```html
<form action="/enviar" method="POST">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="mensaje">Mensaje:</label>
    <textarea id="mensaje" name="mensaje" rows="4"></textarea>

    <label>
        <input type="checkbox" name="aceptar"> Acepto los términos
    </label>

    <button type="submit">Enviar</button>
</form>
```

### Tablas

```html
<table>
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Ciudad</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ada</td>
            <td>25</td>
            <td>Santiago</td>
        </tr>
        <tr>
            <td>Alan</td>
            <td>30</td>
            <td>Londres</td>
        </tr>
    </tbody>
</table>
```

---

## CSS: la piel de la web

**CSS** (Cascading Style Sheets) controla la apariencia visual de los elementos HTML: colores, tamaños, posiciones, animaciones.

### Tres formas de aplicar CSS

```html
<!-- 1. Inline (no recomendado) -->
<h1 style="color: red;">Título</h1>

<!-- 2. Interno en el <head> -->
<style>
    h1 { color: red; }
</style>

<!-- 3. Externo (recomendado) -->
<link rel="stylesheet" href="styles.css">
```

### La sintaxis de CSS

```css
selector {
    propiedad: valor;
    otra-propiedad: otro-valor;
}
```

### Selectores básicos

```css
/* Por etiqueta */
p { color: gray; }

/* Por clase (.) */
.destacado { background-color: yellow; }

/* Por ID (#) */
#header { height: 60px; }

/* Combinados */
article.destacado h2 { color: blue; }

/* Pseudo-clases */
a:hover { text-decoration: underline; }
li:first-child { font-weight: bold; }
li:nth-child(odd) { background: #f0f0f0; }
```

### El modelo de caja (Box Model)

Cada elemento HTML es una **caja** con cuatro capas:

```
┌─────────────────────────────┐
│         Margin              │
│  ┌───────────────────────┐  │
│  │       Border          │  │
│  │  ┌─────────────────┐  │  │
│  │  │    Padding      │  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  Content  │  │  │  │
│  │  │  │ (width)   │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

```css
.caja {
    width: 300px;          /* Ancho del contenido */
    padding: 20px;         /* Espacio interno */
    border: 2px solid black; /* Borde */
    margin: 10px;          /* Espacio externo */
    box-sizing: border-box;  /* El width incluye padding y border */
}
```

**`box-sizing: border-box`** es fundamental: hace que el `width` incluya padding y border, no solo el contenido. Sin esto, los cálculos de tamaño son un dolor de cabeza.

![Diagrama visual del modelo de caja CSS mostrando content, padding, border y margin como capas concéntricas con medidas y colores diferenciados](/content/guides/html-y-css/02-box-model.png)

*El modelo de caja CSS: cada elemento es una caja con content, padding, border y margin.*

### Flexbox: layout moderno

**Flexbox** es el sistema de layout más usado para alinear elementos en una dimensión (fila o columna):

```css
.contenedor {
    display: flex;
    justify-content: center;    /* Alineación horizontal */
    align-items: center;        /* Alineación vertical */
    gap: 16px;                  /* Espacio entre elementos */
    flex-wrap: wrap;            /* Permite que los elementos salten de línea */
}
```

```css
/* Tarjetas en fila que se adaptan */
.cards {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.card {
    flex: 1 1 300px;  /* crece, se encoge, base 300px */
}
```

### CSS Grid: layout en dos dimensiones

**Grid** es para layouts más complejos que necesitan control en filas y columnas:

```css
.grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 columnas iguales */
    grid-template-rows: auto 1fr auto;      /* header, contenido, footer */
    gap: 20px;
    min-height: 100vh;
}
```

### Responsive design: que se vea bien en todo

```css
/* Mobile first: estilos base para móvil */
.contenedor {
    padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
    .contenedor {
        padding: 32px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .contenedor {
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

---

## Un ejemplo completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Portafolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        header {
            background: #1a1a2e;
            color: white;
            padding: 2rem;
            text-align: center;
        }

        nav {
            display: flex;
            justify-content: center;
            gap: 2rem;
            padding: 1rem;
            background: #16213e;
        }

        nav a {
            color: white;
            text-decoration: none;
        }

        nav a:hover {
            text-decoration: underline;
        }

        main {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .proyectos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 1rem;
        }

        .proyecto {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1.5rem;
        }

        .proyecto h3 {
            margin-bottom: 0.5rem;
        }

        footer {
            text-align: center;
            padding: 2rem;
            background: #f0f0f0;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>Mi Portafolio</h1>
        <p>Desarrollador web en formación</p>
    </header>

    <nav>
        <a href="#proyectos">Proyectos</a>
        <a href="#sobre-mi">Sobre mí</a>
        <a href="#contacto">Contacto</a>
    </nav>

    <main>
        <section id="proyectos">
            <h2>Proyectos</h2>
            <div class="proyectos">
                <article class="proyecto">
                    <h3>Calculadora</h3>
                    <p>Una calculadora simple hecha con JavaScript.</p>
                </article>
                <article class="proyecto">
                    <h3>Lista de tareas</h3>
                    <p>App para gestionar tareas con localStorage.</p>
                </article>
                <article class="proyecto">
                    <h3>Clima App</h3>
                    <p>Muestra el clima usando una API externa.</p>
                </article>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Mi Portafolio</p>
    </footer>
</body>
</html>
```

![Captura de pantalla del portafolio completo mostrando header oscuro, navegación, grid de 3 tarjetas de proyecto y footer gris claro, con diseño responsive](/content/guides/html-y-css/03-complete-portfolio.png)

*El resultado: un portafolio completo con HTML semántico y CSS moderno en un solo archivo.*

---

## Un poco de historia: de los Geocities a CSS moderno

![Ilustración comparativa: a la izquierda una página web estilo Geocities de los 90 con fondos brillantes y texto parpadeante, a la derecha un diseño moderno minimalista con grid y tipografía limpia](/content/guides/html-y-css/04-web-evolution.png)

*La evolución de la web: de las páginas con fondo de estrellas y GIFs animados a diseños limpios con CSS Grid y Flexbox.*

La web original de Tim Berners-Lee era solo texto con enlaces. No había colores, ni fuentes, ni layouts. En **1993**, la web era funcionalmente fea.

En **1994**, **Håkon Wium Lie** propuso CSS como forma de separar contenido (HTML) de presentación (estilos). Antes de CSS, todo el estilo era inline o inexistente. Las páginas de **GeoCities** de los 90 — con fondos de estrellas, texto parpadeante y tablas para layout — eran el resultado de no tener herramientas adecuadas.

CSS se estandarizó en **1996** (CSS1), pero tomó años en ser adoptado. Internet Explorer 6 (2001) fue un desastre para CSS, con bugs que los desarrolladores tuvieron que hackear durante una década.

La revolución llegó con **Flexbox** (2009-2017) y **CSS Grid** (2017), que finalmente permitieron layouts complejos sin hacks con `float` y tablas. Hoy CSS tiene variables nativas (`--mi-variable`), animaciones, container queries y es un lenguaje de estilos sorprendentemente poderoso.

---

## Por qué importa

HTML y CSS son la base de todo en la web. No importa qué framework uses — React, Vue, Svelte, Astro — todo se compila a HTML y CSS. Entender las bases te permite:

- **Debuggear problemas visuales** sin depender de frameworks
- **Escribir HTML accesible** que funciona para todos los usuarios
- **Crear layouts responsive** que se adaptan a cualquier pantalla
- **Entender qué hacen los frameworks** por debajo

Un programador que solo sabe React pero no entiende CSS está limitado. Uno que entiende HTML y CSS puede construir cualquier interfaz, con o sin framework.

---

## La IA y HTML/CSS

### Lo bueno

- **Generar estructura HTML:** describe un componente y la IA genera el markup semántico.
- **Convertir diseños a CSS:** sube un screenshot y la IA genera el CSS aproximado.
- **Explicar propiedades CSS:** "¿qué hace `grid-template-areas`?" — la IA explica con ejemplos.
- **Debuggear layout:** describe el problema ("mi div no se centra") y la IA sugiere soluciones.

### Lo que no debes hacer

- **No copies CSS de la IA sin entenderlo.** Si no sabes qué hace `position: sticky`, no lo uses.
- **No generes HTML sin semántica.** La IA a veces usa `<div>` para todo. Insiste en etiquetas semánticas.
- **No delegues la accesibilidad.** La IA puede olvidar `alt` en imágenes, `label` en formularios, roles ARIA.

---

## Desafío: tu primera página web

**Objetivo:** crear una página web completa desde cero sin frameworks.

**Tu tarea:**

1. Crea un archivo `index.html` con una página sobre ti o un tema que te interese
2. Debe incluir:
   - Un `<header>` con título y subtítulo
   - Un `<nav>` con al menos 3 enlaces
   - Un `<main>` con al menos 2 secciones (`<section>`)
   - Una lista (`<ul>` o `<ol>`)
   - Al menos un enlace externo (`<a>`)
   - Un `<footer>`
3. Agrega CSS (puede ser en un `<style>` en el `<head>` o en un archivo separado) que:
   - Use Flexbox o Grid para el layout
   - Tenga colores coherentes (no más de 3 colores principales)
   - Sea responsive con al menos un `@media` query
   - Use `box-sizing: border-box`
4. Abre el archivo en tu navegador y verifica que se vea bien

**Bonus:** agrega un formulario de contacto con al menos 3 campos y validación HTML (`required`, `type="email"`).

---

## Para seguir explorando

- **[MDN — HTML Basics](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML)** — tutorial completo de HTML en español.
- **[CSS Tricks — Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)** — la referencia definitiva de Flexbox.
- **[CSS Tricks — Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)** — la referencia definitiva de CSS Grid.
- **[Flexbox Froggy](https://flexboxfroggy.com/)** — juego para aprender Flexbox.
- **[Grid Garden](https://cssgridgarden.com/)** — juego para aprender CSS Grid.

---

## Resumen

- **HTML** define la estructura y semántica del contenido; **CSS** controla la apariencia visual.
- Las etiquetas semánticas (`<header>`, `<main>`, `<article>`, `<nav>`) describen **qué es** el contenido, no cómo se ve.
- El **modelo de caja** (Box Model) tiene 4 capas: content, padding, border, margin. Usa `box-sizing: border-box`.
- **Flexbox** alinea elementos en una dimensión (fila o columna). **Grid** controla filas y columnas simultáneamente.
- **Responsive design** usa `@media` queries para adaptar el layout al tamaño de pantalla.
- Los formularios usan `<label>`, `<input>`, `<textarea>`, `<select>` y `<button>`.
- CSS fue propuesto por Håkon Wium Lie en 1994 y estandarizado en 1996.
- Flexbox y Grid eliminaron la necesidad de hacks con `float` y tablas para layout.

En la próxima guía vamos a darle vida a esas páginas: **JavaScript en el navegador: DOM y eventos básicos** — cómo hacer que las páginas respondan a las acciones del usuario.
