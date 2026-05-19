---
term: "Event Loop"
definition: "El mecanismo de Node.js que procesa operaciones asincrónicas en un solo hilo, permitiendo manejar miles de conexiones simultáneas sin bloquearse."
relatedGuides:
  - yellow-belt/introduccion-a-nodejs
  - green-belt/arquitectura-cliente-servidor
tags: [nodejs, asincronia, rendimiento, arquitectura]
lastRevision: "2026-05-19"
---

El **Event Loop** es el corazón de Node.js. En vez de crear un hilo por cada conexión (como Apache), Node.js usa un solo hilo que:

1. Ejecuta código sincrónico
2. Cuando encuentra una operación asincrónica (leer archivo, consultar DB), la delega al sistema operativo
3. Sigue procesando otras cosas sin esperar
4. Cuando la operación termina, el callback se agrega a una cola de eventos
5. El event loop procesa la cola y ejecuta los callbacks

```javascript
console.log("1");
setTimeout(() => console.log("2"), 1000);  // Se delega, no bloquea
console.log("3");
// Output: 1, 3, (espera 1s) 2
```

Esto permite que un solo proceso de Node.js maneje miles de conexiones simultáneas con bajo consumo de memoria.

## Ver también

- [Introducción a Node.js, npm y pnpm](/guides/yellow-belt/introduccion-a-nodejs)
- [Arquitectura cliente–servidor en la práctica](/guides/green-belt/arquitectura-cliente-servidor)
