---
term: "localStorage"
definition: "Una API del navegador que permite guardar datos en formato string que persisten incluso después de cerrar y reabrir el navegador."
relatedGuides:
  - yellow-belt/javascript-en-el-navegador
  - yellow-belt/json-y-manejo-de-datos
tags: [javascript, almacenamiento, navegador, datos]
lastRevision: "2026-05-19"
---

**`localStorage`** es un almacenamiento clave-valor disponible en todos los navegadores modernos. Los datos persisten entre sesiones y no tienen fecha de expiración.

```javascript
// Guardar (solo strings)
localStorage.setItem("clave", "valor");

// Leer
const valor = localStorage.getItem("clave");  // "valor"

// Guardar objetos (serializar a JSON)
localStorage.setItem("usuario", JSON.stringify({ nombre: "Ada", rol: "admin" }));
const usuario = JSON.parse(localStorage.getItem("usuario"));

// Eliminar
localStorage.removeItem("clave");
localStorage.clear();  // Eliminar todo
```

Limitaciones: solo strings, ~5-10MB por dominio, sincrónico (bloquea el hilo principal), no se envía al servidor (a diferencia de las cookies). Para datos sensibles, usar `sessionStorage` (se borra al cerrar la pestaña) o cookies con flags de seguridad.

## Ver también

- [JavaScript en el navegador: DOM y eventos básicos](/guides/yellow-belt/javascript-en-el-navegador)
- [JSON y manejo de datos](/guides/yellow-belt/json-y-manejo-de-datos)
