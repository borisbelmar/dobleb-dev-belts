---
term: "Scope (Ámbito)"
definition: "La región del código donde una variable es accesible. Las variables locales solo existen dentro de su función, mientras que las globales son accesibles desde cualquier parte."
relatedGuides:
  - white-belt/control-de-flujo-funciones-y-modulos
tags: [python, variables, fundamentos]
lastRevision: "2026-05-19"
---

El scope determina dónde puedes usar una variable. En Python hay dos niveles principales:

## Scope local

Variables creadas dentro de una función. Solo existen mientras la función se ejecuta:

```python
def mi_funcion():
    x = 10  # variable local
    print(x)

mi_funcion()  # 10
print(x)  # Error: x no está definida fuera de la función
```

## Scope global

Variables definidas fuera de cualquier función. Son accesibles desde cualquier parte del archivo:

```python
PI = 3.14159  # variable global

def area_circulo(radio):
    return PI * radio ** 2
```

## Buena práctica

Evita modificar variables globales desde dentro de funciones. Pasa los valores como parámetros y devuelve resultados con `return`.

## Ver también

- [Control de flujo, funciones y módulos en Python](/guides/white-belt/control-de-flujo-funciones-y-modulos)
