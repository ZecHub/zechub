<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zakura Nodo

Zakura es una implementación gratuita y de código abierto de un nodo completo para Zcash, creada para escalar. Derivada de [Zebra](Zebra_Full_Node.md) y desarrollada mediante una colaboración entre **Valar Group** y el Proyecto Tachyon, Zakura ofrece una sincronización mucho más rápida, poda nativa de bloques y una capa de compatibilidad para herramientas heredadas de `zcashd`. La versión 1.0.0 se lanzó el 15 de julio de 2026. Desde entonces, los lanzamientos se han sucedido rápidamente: la versión 1.7.0 (22 de octubre de 2026) activó NU7 en Mainnet, y la serie 1.8 llegó en noviembre.

---

## En resumen

- Zakura es un **nodo completo de Zcash compatible con el consenso** — una alternativa a Zebra y zcashd, derivada de Zebra.
- La sincronización de la blockchain es aproximadamente **5× más rápida que Zebra**; el arranque mediante instantánea se completa en **menos de 2 minutos**.
- La **poda nativa de bloques** permite a los operadores ejecutar un nodo completo con mucho menos espacio en disco (~11 GB para una instantánea podada frente a 300 GB para un nodo completo de Zebra).
- Un **modo de compatibilidad RPC de zcashd** permite que las billeteras existentes y las integraciones funcionen sin modificaciones.
- Una **capa de transporte P2P experimental** (desactivada de forma predeterminada) apunta a una propagación de bloques inferior a 500 ms con gossip resistente a DoS.
- Compatible con **Ironwood (NU6.3)**, la actualización de red de Zcash activada a mediados de 2026.
- Sigue a **NU7**: Zakura 1.7.0 es la versión que lo activa en Mainnet. Cada versión también deja de recibir soporte en un bloque de fin de soporte unas semanas después de publicarse, así que planifica actualizar con regularidad (consulta «Antes de ejecutarlo» más abajo).
- **Zakura Common** (v1.3.0, agosto de 2026) acelera la criptografía que usan las billeteras para crear transacciones privadas: de más de 3 segundos a menos de 200 ms en muchos casos, según los benchmarks de Zakura.
- Liderado por **Sean Bowe** (cofundador de Zcash, Proyecto Tachyon) y **Dev Ojha** (Valar Group).

---

## ¿Qué es Zakura?

Zakura es un nodo completo de Zcash diseñado desde cero para estar listo para producción a escala. Aunque comparte compatibilidad de consenso con Zebra —lo que significa que valida y sigue las mismas reglas del protocolo de Zcash—, Zakura introduce mejoras de ingeniería significativas destinadas a reducir la barrera para ejecutar un nodo completo de Zcash.

El proyecto es un esfuerzo conjunto entre el **Proyecto Tachyon** (liderado por Sean Bowe, uno de los ingenieros criptográficos originales de Zcash) y **Valar Group** (liderado por Dev Ojha). Juntos se centran en mejoras de protocolo de próxima generación de Zcash, y Zakura sirve como el nodo de referencia para ese trabajo.

---

## Características principales

### Sincronización de red 5× más rápida

Zakura logra una sincronización de blockchain aproximadamente 5× más rápida en comparación con Zebra. Esto lo hace considerablemente más práctico para los operadores que necesitan poner en marcha un nodo rápidamente o recuperarse de un período de inactividad.

### Arranque mediante instantánea

Zakura publica instantáneas de red prediseñadas que reducen drásticamente el tiempo de sincronización inicial:

| Método de Bootstrap | Tiempo |
|-----------------|------|
| Instantánea de archivo | ~37 minutos |
| Instantánea podada | **Menos de 2 minutos** |
| Zebra (sincronización completa) | ~20 horas |

Las instantáneas podadas ocupan aproximadamente **11 GB**, lo que permite un arranque del nodo **680× más rápido** en comparación con la sincronización desde el génesis.

### Poda nativa de bloques

Zakura admite la poda configurable de bloques, lo que permite a los operadores de nodos definir cuánta historia de la red conservar. Esto hace práctico ejecutar un nodo completo en hardware con almacenamiento limitado, útil para validadores, desarrolladores y proveedores de infraestructura que no necesitan la red histórica completa.

### Modo de compatibilidad RPC de zcashd

Zakura incluye un modo de compatibilidad que reproduce la interfaz JSON-RPC heredada de `zcashd`. Las billeteras, exchanges e integraciones existentes que dependen de los RPC de `zcashd` pueden cambiar a Zakura sin requerir cambios de código.

### Capa de transporte P2P experimental

Zakura se entrega con una capa de transporte peer-to-peer de próxima generación, actualmente **desactivada de forma predeterminada**. Cuando se activa, apunta a:

- Propagación de bloques en el peor caso inferior a 500 ms en toda la red
- Agregación del mempool para una retransmisión de transacciones más eficiente
- Protocolo gossip resistente a DoS para mejorar la resiliencia de la red

Esta capa representa una vista previa de futuras mejoras de Zcash a nivel de red desarrolladas bajo el Proyecto Tachyon.

### Compatible con Ironwood (NU6.3)

Zakura es totalmente compatible con la actualización de red de Ironwood (NU6.3), activada en la red principal de Zcash a mediados de 2026.

### NU7

Zakura 1.7.0, publicada el 22 de octubre de 2026, es la versión que activa NU7 en Mainnet ([notas de la versión](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Un nodo necesita la versión 1.7.0 o posterior para seguir la red después de la actualización. [NU7](NU7.md) explica los cambios que introduce la actualización.

---

## Zakura Common: criptografía de billeteras más rápida

En agosto de 2026, el equipo de Zakura lanzó Zakura Common, un conjunto de forks acelerados de las bibliotecas de criptografía de las que dependen las billeteras y nodos de Zcash. Zakura cambió a la nueva pila en la versión 1.3.0, y Vizor Wallet está entre las primeras billeteras en integrarla.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Según los propios benchmarks de Zakura:

| Operación | Aceleración |
|--|--|
| Generación de pruebas en dispositivos móviles | más de 14× (escritorio: más de 5×) |
| Hashing Sinsemilla | más de 21× |
| Verificación de zk-SNARK | 4–8× |
| Descifrado de prueba | más de 1,5× |

Para los usuarios, el cambio más visible es el tiempo de espera. Crear una transacción privada solía tomarle a una billetera más de tres segundos. Con Zakura Common puede tomar menos de 200 ms en muchos casos. Este es el tiempo que tu dispositivo dedica a preparar la transacción, no el tiempo que la red necesita para confirmarla.


---

## Cómo se relaciona Zakura con otros nodos de Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Lenguaje | C++ (bifurcado de Bitcoin) | Rust | Rust (bifurcado de Zebra) |
| Estado | Obsoleto | Activo | Activo (v1.0.0 jul 2026; v1.8.8 nov 2026) |
| Velocidad de sincronización | Referencia | ~1× | ~5× más rápido |
| Poda de bloques | No | No | Sí |
| Compatibilidad con RPC de zcashd | Nativa | Parcial | Sí (modo de compatibilidad) |
| Arranque desde una instantánea | No | No | Sí (menos de 2 min) |
| P2P experimental | No | No | Sí (opcional) |

---

## Primeros pasos

Las opciones de descarga, las instantáneas y la documentación de configuración están disponibles en:

- **Guía de descarga e instalación:** [zakura.com/download](https://zakura.com/download/)
- **Instantáneas de la cadena:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código fuente:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Notas de la versión:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Servicio a billeteras ligeras

Zakura no es un servidor para billeteras ligeras. No implementa `CompactTxStreamer`, el protocolo gRPC que usan billeteras ligeras como Zodl (anteriormente Zashi), así que una billetera no puede conectarse directamente a `zakurad`. Para dar servicio a billeteras ligeras, ejecuta uno de estos delante.

- [Zaino](Zaino.md) (preferido)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), Zcash Labs, indexador y servidor de billetera ligera, que lee la cadena de un nodo Zakura, ya sea integrado en su propio proceso o uno remoto mediante JSON-RPC

El gRPC del indexador propio de Zakura (`indexer_listen_addr` en la sección `[rpc]`, desactivado de forma predeterminada) es una interfaz independiente: ofrece flujos de bloques, mempool y puntas de la cadena para software de confianza que ejecutas tú mismo, no el protocolo de billetera ligera. Solo se permite texto sin cifrar en la interfaz loopback; cualquier otra dirección requiere TLS mutuo ([referencia de configuración](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Antes de ejecutarlo

Algunas cosas de las notas de la versión 1.8 que suelen tomar por sorpresa a los operadores:

- **Las versiones caducan.** Cada versión de Zakura tiene una altura de fin de soporte, y un nodo de Mainnet que la ejecute se detiene en ese bloque. Las versiones 1.8.x tienen soporte en Mainnet hasta el bloque 3,643,309, alrededor del 3 de diciembre de 2026, y las advertencias de actualización llegan unos tres días antes ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Comprueba cuál es la versión más reciente antes de esa fecha y no fijes una versión antigua en scripts o plantillas de implementación sin tener un plan para actualizarla.
- **Requisito de CPU x86-64 desde la versión 1.8.0.** Los binarios de las versiones y las imágenes de Docker usan instrucciones BMI2/ADX, lo que requiere Intel Broadwell, AMD Zen o una versión posterior. En una CPU más antigua, `zakurad` se cierra al iniciarse con un error que indica las extensiones que faltan. Compila desde el código fuente con `--features portable` para ejecutarlo en esas máquinas ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Las configuraciones antiguas generadas y el P2P nativo.** `zakurad generate` solía escribir `peer_memory_budget_bytes = 8589934592` (8 GiB). Desde la versión 1.8.3, eso permite aproximadamente la mitad de conexiones P2P nativas, y con 4 GiB o menos no se inicia un nodo que use P2P nativo. Aumenta `[network.zakura] peer_memory_budget_bytes` a por lo menos 15 GiB, o elimina la línea para usar el nuevo valor predeterminado de 15 GiB ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Las herramientas de estado se trasladaron a `zakurad`.** Desde la versión 1.8.3, ya no se incluyen los binarios independientes `zakura-prune-state` y `zakura-rollback-state`, tampoco en Docker. Usa `zakurad prune-state` y `zakurad rollback-state` en su lugar. Aceptan los mismos argumentos, pero cargan `zakura.toml`, así que pasa `--cache-dir` para indicar un directorio de estado específico.

---

## Páginas relacionadas

- [Nodo completo de Zebra](Zebra_Full_Node.md) — el nodo completo ascendente de Zcash del que se derivó Zakura
- [Indexer de Zaino](Zaino.md) — un indexador basado en Rust compatible con Zebra y Zakura
- [Nodos completos](Full_Nodes.md) — descripción general de las opciones de nodos completos de Zcash
- [Nodos Lightwallet](Lightwallet_Nodes.md) — alternativas de clientes ligeros

## Recursos

- [Presentamos Zakura — anuncio](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Sitio web de Zakura](https://zakura.com/)
- [Zakura en X/Twitter](https://x.com/ZakuraZcash)
- [Proyecto Tachyon](https://electriccoin.co/blog/)
- [Anuncio de Zakura Common](https://zakura.com/announcements/zakura-common/)
