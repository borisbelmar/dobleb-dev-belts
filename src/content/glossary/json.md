---
term: "JSON (JavaScript Object Notation)"
definition: "Un formato de texto ligero para representar datos estructurados, independiente del lenguaje, basado en la sintaxis de objetos de JavaScript."
relatedGuides:
  - yellow-belt/json-y-manejo-de-datos
  - yellow-belt/apis-rest
tags: [json, datos, intercambio, web]
lastRevision: "2026-05-19"
---

**JSON** es el formato de intercambio de datos más usado en la web. Soporta 6 tipos de valores:

- **String:** `"hola"` (siempre comillas dobles)
- **Number:** `42`, `3.14` (sin comillas)
- **Boolean:** `true`, `false`
- **null:** `null`
- **Array:** `[1, "dos", true]`
- **Object:** `{"clave": "valor"}`

No soporta: funciones, `undefined`, comentarios, fechas (se usan strings ISO).

```javascript
// Parsear: string → objeto
const datos = JSON.parse('{"nombre": "Ada"}');

// Serializar: objeto → string
const texto = JSON.stringify({ nombre: "Ada" }, null, 2);
```

Popularizado por **Douglas Crockford** en 2001 como alternativa a XML.

## Ver también

- [JSON y manejo de datos](/guides/yellow-belt/json-y-manejo-de-datos)
- [APIs REST: qué son y cómo se diseñan](/guides/yellow-belt/apis-rest)
