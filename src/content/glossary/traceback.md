---
term: "Traceback"
definition: "El rastro que muestra Python cuando ocurre un error, indicando la cadena de llamadas que llevaron al fallo."
relatedGuides:
  - white-belt/manejo-de-errores-y-debugging
tags: [python, errores, debugging]
lastRevision: "2026-05-19"
---

Un **traceback** (también llamado "stack trace" o "trace") es el informe que genera Python cuando una excepción no manejada detiene la ejecución. Muestra cada función que fue llamada, desde la más reciente hasta la más antigua, junto con el archivo y número de línea donde ocurrió cada llamada.

## Estructura de un traceback

```
Traceback (most recent call last):
  File "programa.py", line 10, in <module>
    procesar(datos)
  File "programa.py", line 6, in procesar
    resultado = calcular(valor)
  File "programa.py", line 3, in calcular
    return 10 / divisor
ZeroDivisionError: division by zero
```

La **última línea** siempre muestra el tipo de error y la descripción. Las líneas anteriores muestran el camino que siguió el código hasta llegar al error.

## Ver también

- [Manejo de errores y debugging básico](/guides/white-belt/manejo-de-errores-y-debugging)
