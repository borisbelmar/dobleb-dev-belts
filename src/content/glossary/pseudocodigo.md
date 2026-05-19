---
term: "Pseudocódigo"
definition: "Forma informal de escribir algoritmos usando lenguaje natural estructurado, sin preocuparse por la sintaxis de un lenguaje de programación específico."
relatedGuides:
  - white-belt/logica-y-pensamiento-computacional
tags: [fundamentos, algoritmos, practica]
lastRevision: "2026-05-19"
---

El pseudocódigo es el puente entre pensar un problema y escribir código real. Te permite concentrarte en la lógica sin distraerte con paréntesis, puntos y comas o reglas específicas del lenguaje. Una vez que tenés el pseudocódigo, traducirlo a cualquier lenguaje es casi mecánico.

## Ejemplo

```
FUNCION encontrarMaximo(lista):
    SI lista está vacía:
        RETORNAR error
    maximo = primer elemento
    PARA CADA numero EN lista:
        SI numero > maximo:
            maximo = numero
    RETORNAR maximo
```

Este pseudocódigo se traduce casi idéntico a Python, JavaScript, Java o cualquier otro lenguaje.

## Ver también

- [Lógica y pensamiento computacional](/guides/white-belt/logica-y-pensamiento-computacional)
