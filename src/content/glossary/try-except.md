---
term: "Try/Except"
definition: "La estructura de Python para capturar y manejar excepciones, permitiendo que el programa responda a errores sin detenerse."
relatedGuides:
  - white-belt/manejo-de-errores-y-debugging
tags: [python, errores, excepciones]
lastRevision: "2026-05-19"
---

**`try/except`** es el mecanismo de manejo de excepciones en Python. Permite envolver código que podría fallar y definir qué hacer si ocurre un error específico:

```python
try:
    numero = int(input("Ingresa un número: "))
    resultado = 100 / numero
except ValueError:
    print("Eso no es un número válido.")
except ZeroDivisionError:
    print("No puedes dividir por cero.")
except Exception as e:
    print(f"Error inesperado: {e}")
else:
    # Se ejecuta solo si NO hubo error
    print(f"Resultado: {resultado}")
finally:
    # Se ejecuta SIEMPRE
    print("Proceso terminado.")
```

Los bloques opcionales son:
- **`else`**: se ejecuta solo si no hubo excepción
- **`finally`**: se ejecuta siempre, haya error o no

## Ver también

- [Manejo de errores y debugging básico](/guides/white-belt/manejo-de-errores-y-debugging)
