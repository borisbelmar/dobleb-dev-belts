---
term: "Evento (DOM)"
definition: "Una acción del usuario o del navegador (click, submit, keydown) a la que JavaScript puede responder mediante un event listener."
relatedGuides:
  - yellow-belt/javascript-en-el-navegador
  - yellow-belt/typescript-desde-cero
tags: [javascript, dom, eventos, interactividad]
lastRevision: "2026-05-19"
---

Los **eventos del DOM** son señales que el navegador emite cuando ocurre una acción. JavaScript puede "escuchar" estos eventos y ejecutar código en respuesta:

```javascript
elemento.addEventListener("click", (evento) => {
    console.log("Click en:", evento.target);
    evento.preventDefault();  // Detiene el comportamiento por defecto
});
```

Eventos comunes: `click`, `dblclick`, `mouseenter`, `mouseleave`, `keydown`, `keyup`, `submit`, `input`, `change`, `scroll`, `load`.

El objeto `evento` pasado al callback contiene información sobre lo que ocurrió: `target` (elemento que disparó el evento), `clientX/Y` (posición del mouse), `key` (tecla presionada), etc.

## Ver también

- [JavaScript en el navegador: DOM y eventos básicos](/guides/yellow-belt/javascript-en-el-navegador)
- [TypeScript desde cero: tipado que salva vidas](/guides/yellow-belt/typescript-desde-cero)
