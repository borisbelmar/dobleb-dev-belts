---
term: "Colección de API"
definition: "Un grupo organizado de requests HTTP guardados como archivos, que documentan y permiten probar todos los endpoints de una API."
relatedGuides:
  - yellow-belt/documentacion-de-apis-con-bruno
  - yellow-belt/apis-rest
tags: [api, documentacion, testing, bruno, postman]
lastRevision: "2026-05-19"
---

Una **colección de API** es un conjunto de requests HTTP organizados que documentan cómo usar una API. Herramientas como Bruno, Postman e Insomnia permiten crear, ejecutar y compartir colecciones.

En Bruno, cada request es un archivo `.bru` con metadata, headers, body y tests opcionales. Las colecciones se almacenan localmente y se versionan con Git, a diferencia de Postman que las guarda en la nube.

Beneficios:
- **Documentación viva:** los requests actualizados reflejan el estado real de la API
- **Testing rápido:** ejecutar toda la colección verifica que los endpoints funcionan
- **Onboarding:** nuevos desarrolladores pueden probar la API sin leer código

## Ver también

- [Documentación de APIs con Bruno](/guides/yellow-belt/documentacion-de-apis-con-bruno)
- [APIs REST: qué son y cómo se diseñan](/guides/yellow-belt/apis-rest)
