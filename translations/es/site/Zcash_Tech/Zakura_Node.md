<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Nodo

> 🇧🇷 [Versión en portugués](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura es una implementación gratuita y de código abierto de un nodo completo para Zcash, creada para escalar. Derivado de [Zebra](Zebra_Full_Node.md) y desarrollado mediante una colaboración entre **Valar Group** y **Project Tachyon**, Zakura ofrece una sincronización considerablemente más rápida, poda de bloques nativa y una capa de compatibilidad para herramientas heredadas de `zcashd`. La versión 1.0.0 se lanzó el 15 de julio de 2026.

---

## En resumen

- Zakura es un **nodo completo de Zcash compatible con el consenso** — una alternativa a Zebra y zcashd, derivado de Zebra.
- La sincronización de la blockchain es aproximadamente **5× más rápida que Zebra**; el inicio mediante snapshot se completa en **menos de 2 minutos**.
- La **poda de bloques nativa** permite a los operadores ejecutar un nodo completo con mucho menos espacio en disco (~11 GB para un snapshot podado frente a 300 GB para un nodo completo de Zebra).
- Un **modo de compatibilidad RPC de zcashd** permite que las wallets e integraciones existentes funcionen sin modificaciones.
- Una **capa de transporte P2P experimental** (desactivada por defecto) busca una propagación de bloques inferior a 500 ms con gossip resistente a DoS.
- Compatible con **Ironwood (NU6.3)**, la actualización de red de Zcash activada a mediados de 2026.
- **Zakura Common** (v1.3.0, agosto de 2026) acelera la criptografía que usan las wallets para crear transacciones privadas: de más de 3 segundos a menos de 200 ms en muchos casos, según los benchmarks de Zakura.
- Liderado por **Sean Bowe** (cofundador de Zcash, Project Tachyon) y **Dev Ojha** (Valar Group).

---

## ¿Qué es Zakura?

Zakura es un nodo completo de Zcash diseñado desde cero para estar listo para producción a escala. Aunque comparte compatibilidad de consenso con Zebra —lo que significa que valida y sigue las mismas reglas del protocolo de Zcash—, Zakura incorpora importantes mejoras de ingeniería destinadas a reducir la barrera para ejecutar un nodo completo de Zcash.

El proyecto es un esfuerzo conjunto entre **Project Tachyon** (liderado por Sean Bowe, uno de los ingenieros criptográficos originales de Zcash) y **Valar Group** (liderado por Dev Ojha). Juntos se centran en mejoras de protocolo de Zcash de próxima generación, y Zakura sirve como nodo de referencia para ese trabajo.

---

## Características principales

### Sincronización de cadena 5× más rápida

Zakura logra una sincronización de blockchain aproximadamente 5× más rápida en comparación con Zebra. Esto lo hace mucho más práctico para operadores que necesitan iniciar rápidamente un nodo o recuperarse de un período de inactividad.

### Inicio mediante snapshot

Zakura publica snapshots de cadena preconstruidos que reducen drásticamente el tiempo de sincronización inicial:

| Método de inicio | Tiempo |
|-----------------|------|
| Snapshot de archivo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sincronización completa) | ~20 horas |

Los snapshots podados ocupan aproximadamente **11 GB**, lo que permite un inicio de nodo **680× más rápido** en comparación con sincronizar desde el génesis.

### Poda de bloques nativa

Zakura admite poda de bloques configurable, lo que permite a los operadores de nodos definir cuánto historial de la cadena conservar. Esto hace práctico ejecutar un nodo completo en hardware con almacenamiento limitado —útil para validadores, desarrolladores y proveedores de infraestructura que no necesitan toda la cadena histórica.

### Modo de compatibilidad RPC de zcashd

Zakura incluye un modo de compatibilidad que reproduce la interfaz JSON-RPC heredada de `zcashd`. Las wallets, exchanges e integraciones existentes que dependen de RPC de `zcashd` pueden cambiar a Zakura sin necesidad de cambios de código.

### Capa de transporte P2P experimental

Zakura incluye una capa de transporte peer-to-peer de próxima generación, actualmente **desactivada por defecto**. Cuando está activada, busca:

- Propagación de bloques en el peor caso inferior a 500 ms en toda la red
- Agregación de mempool para una retransmisión de transacciones más eficiente
- Protocolo gossip resistente a DoS para mejorar la resiliencia de la red

Esta capa representa una vista previa de futuras mejoras a nivel de red de Zcash desarrolladas bajo Project Tachyon.

### Compatible con Ironwood (NU6.3)

Zakura es totalmente compatible con la actualización de red Ironwood (NU6.3), activada en la mainnet de Zcash a mediados de 2026.

---

## Zakura Common: criptografía de wallet más rápida

En agosto de 2026, el equipo de Zakura lanzó Zakura Common, un conjunto de forks acelerados de las bibliotecas criptográficas de las que dependen las wallets y nodos de Zcash. Zakura cambió a la nueva pila en la versión 1.3.0, y Vizor Wallet se encuentra entre las primeras wallets en integrarla.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Según los propios benchmarks de Zakura:

| Operación | Aceleración |
|--|--|
| Generación de pruebas en móvil | más de 14× (escritorio: más de 5×) |
| Hashing Sinsemilla | más de 21× |
| Verificación de zk-SNARK | 4–8× |
| Descifrado de prueba | más de 1,5× |

Para los usuarios, el cambio más visible es el tiempo de espera. Crear una transacción privada solía tomarle a una wallet más de tres segundos. Con Zakura Common puede tomar menos de 200 ms en muchos casos. Este es el tiempo que tu dispositivo dedica a preparar la transacción, no el tiempo que la red necesita para confirmarla.


---

## Cómo se relaciona Zakura con otros nodos de Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Lenguaje | C++ (derivado de Bitcoin) | Rust | Rust (derivado de Zebra) |
| Estado | Obsoleto | Activo | Activo (v1.0.0, jul. 2026) |
| Velocidad de sincronización | Línea base | ~1× | ~5× más rápido |
| Poda de bloques | No | No | Sí |
| Compatibilidad RPC de zcashd | Nativa | Parcial | Sí (modo de compatibilidad) |
| Inicio mediante snapshot | No | No | Sí (menos de 2 min) |
| P2P experimental | No | No | Sí (opcional) |

---

## Primeros pasos

Las opciones de descarga, snapshots y documentación de configuración están disponibles en:

- **Guía de descarga y configuración:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots de cadena:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código fuente:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Páginas relacionadas

- [Zebra Nodo completo](Zebra_Full_Node.md) — el nodo completo ascendente de Zcash del que se derivó Zakura
- [Zaino Indexador](Zaino.md) — un indexador basado en Rust compatible con Zebra y Zakura
- [Nodos completos](Full_Nodes.md) — descripción general de las opciones de nodos completos de Zcash
- [Nodos Lightwallet](Lightwallet_Nodes.md) — alternativas de clientes ligeros

## Recursos

- [Presentamos Zakura — anuncio](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Sitio web](https://zakura.com/)
- [Zakura en X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Anuncio de Zakura Common](https://zakura.com/announcements/zakura-common/)
