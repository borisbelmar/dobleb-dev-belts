---
term: "Función"
definition: "Bloque de código reutilizable con un nombre que recibe parámetros de entrada y puede devolver un valor de retorno."
relatedGuides:
  - white-belt/control-de-flujo-funciones-y-modulos
tags: [python, funciones, fundamentos]
lastRevision: "2026-05-19"
---

Una función es un bloque de código con nombre que encapsula una tarea específica. Se define con `def` en Python, puede recibir parámetros y devolver un valor con `return`.

## ¿Por qué usar funciones?

- **Reutilización**: escribes la lógica una vez y la usas donde la necesites.
- **Organización**: divides problemas complejos en piezas manejables.
- **DRY**: evitas repetir el mismo código en múltiples lugares.
- **Testing**: es más fácil probar una función aislada que un programa entero.

## Ejemplo

```python
def calcular_area(base, altura):
    """Calcula el área de un triángulo."""
    return (base * altura) / 2

area = calcular_area(10, 5)  # 25.0
```

## Ver también

- [Control de flujo, funciones y módulos en Python](/guides/white-belt/control-de-flujo-funciones-y-modulos)
