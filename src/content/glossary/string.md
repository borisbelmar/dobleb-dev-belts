---
term: "String"
definition: "Tipo de dato que representa una secuencia de caracteres (texto). En Python se escribe entre comillas simples o dobles y es inmutable."
relatedGuides:
  - white-belt/tu-primer-programa-en-python
tags: [python, tipos-de-dato, texto]
lastRevision: "2026-05-19"
---

Los strings (cadenas de texto) son el tipo de dato más común para representar información legible por humanos. En Python se pueden crear con comillas simples `'hola'`, dobles `"hola"`, o triples para textos multilínea.

```python
nombre = "Ada"
saludo = f"Hola, {nombre}"  # f-string
multilinea = """Esto es
un texto de
varias líneas"""
```

## f-strings

Introducidos en Python 3.6, los f-strings permiten insertar variables y expresiones directamente dentro del texto usando `{}`. Son la forma preferida de formatear strings por su legibilidad y rendimiento.

## Ver también

- [Tu primer programa en Python](/guides/white-belt/tu-primer-programa-en-python)
