---
term: "Breakpoint"
definition: "Un punto de pausa en el código donde el debugger detiene la ejecución para permitir inspeccionar el estado del programa."
relatedGuides:
  - white-belt/manejo-de-errores-y-debugging
tags: [debugging, herramientas, desarrollo]
lastRevision: "2026-05-19"
---

Un **breakpoint** (punto de interrupción) es una marca que colocas en una línea específica de tu código para que el debugger pause la ejecución exactamente ahí. Cuando el programa llega al breakpoint, puedes:

- Inspeccionar el valor de todas las variables
- Ejecutar el código línea por línea (step over / step into)
- Modificar variables en tiempo de ejecución
- Continuar hasta el próximo breakpoint o el final

En Python con `pdb`, se coloca con `pdb.set_trace()`. En VS Code, se hace clic al lado del número de línea.

## Ver también

- [Manejo de errores y debugging básico](/guides/white-belt/manejo-de-errores-y-debugging)
