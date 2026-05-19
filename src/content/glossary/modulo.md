---
term: "Módulo"
definition: "Archivo de Python que contiene código reutilizable (funciones, clases, variables) que puede ser importado y usado en otros programas."
relatedGuides:
  - white-belt/control-de-flujo-funciones-y-modulos
tags: [python, modulos, organizacion]
lastRevision: "2026-05-19"
---

Un módulo es simplemente un archivo `.py` que agrupa código relacionado. Python incluye una **biblioteca estándar** con decenas de módulos listos para usar.

## Módulos estándar comunes

| Módulo | Propósito |
|---|---|
| `math` | Funciones matemáticas (pi, sqrt, ceil, floor) |
| `random` | Números y selecciones aleatorias |
| `os` | Interacción con el sistema operativo |
| `datetime` | Manejo de fechas y horas |
| `json` | Leer y escribir datos JSON |

## Importar módulos

```python
# Importar todo el módulo
import math
print(math.sqrt(16))  # 4.0

# Importar solo lo necesario
from random import choice
colores = ["rojo", "verde", "azul"]
print(choice(colores))
```

## Crear tu propio módulo

Crea un archivo `utils.py` y úsalo desde otro archivo con `from utils import ...`.

## Ver también

- [Control de flujo, funciones y módulos en Python](/guides/white-belt/control-de-flujo-funciones-y-modulos)
