---
term: "DOM (Document Object Model)"
definition: "La representación en forma de árbol de todos los elementos de una página HTML que el navegador construye al parsear el documento."
relatedGuides:
  - yellow-belt/como-funciona-la-web
  - yellow-belt/javascript-en-el-navegador
tags: [dom, navegador, javascript, html]
lastRevision: "2026-05-19"
---

El **DOM** (Document Object Model) es un árbol de objetos que representa la estructura de un documento HTML. Cada etiqueta HTML se convierte en un **nodo** del árbol:

```html
<html>
  <head>
    <title>Mi página</title>
  </head>
  <body>
    <h1>Hola</h1>
    <p>Texto</p>
  </body>
</html>
```

Se convierte en:
```
html
├── head
│   └── title → "Mi página"
└── body
    ├── h1 → "Hola"
    └── p → "Texto"
```

JavaScript puede modificar el DOM en tiempo real: agregar, eliminar o cambiar elementos. El DOM se combina con el **CSSOM** (CSS Object Model) para crear el **Render Tree** que el navegador pinta en pantalla.

## Ver también

- [Cómo funciona la web: HTTP, DNS y navegadores](/guides/yellow-belt/como-funciona-la-web)
- [JavaScript en el navegador: DOM y eventos básicos](/guides/yellow-belt/javascript-en-el-navegador)
