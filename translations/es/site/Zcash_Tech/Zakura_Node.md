<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Nodo Zakura

> 🇧🇷 [Versión en portugués](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura es una implementación gratuita y de código abierto de un nodo completo para Zcash, diseñada para escalar. Bifurcado de [Zebra](Zebra_Full_Node.md) y desarrollado mediante una colaboración entre **Valar Group** y **Project Tachyon**, Zakura ofrece una sincronización drásticamente más rápida, poda nativa de bloques y una capa de compatibilidad para las herramientas heredadas de `zcashd`. La versión 1.0.0 fue lanzada el 15 de julio de 2026.

---

## Resumen rápido

- Zakura es un **nodo completo de Zcash compatible con el consenso**: una alternativa a Zebra y zcashd, bifurcado de Zebra.
- La sincronización de la blockchain es aproximadamente **5× más rápida que Zebra**; el arranque mediante snapshot se completa en **menos de 2 minutos**.
- La **poda nativa de bloques** permite a los operadores ejecutar un nodo completo con mucho menos espacio en disco (~11 GB para un snapshot podado frente a 300 GB para un nodo completo de Zebra).
- Un **modo de compatibilidad RPC de zcashd** permite que las wallets e integraciones existentes funcionen sin modificaciones.
- Una **capa de transporte P2P experimental** (desactivada por defecto) apunta a una propagación de bloques de menos de 500 ms con gossip resistente a DoS.
- Compatible con **Ironwood (NU6.3)**, la actualización de red de Zcash activada a mediados de 2026.
- Liderado por **Sean Bowe** (cofundador de Zcash, Project Tachyon) y **Dev Ojha** (Valar Group).

---

## ¿Qué es Zakura?

Zakura es un nodo completo de Zcash diseñado desde cero para estar listo para producción a escala. Aunque comparte compatibilidad de consenso con Zebra —lo que significa que valida y sigue las mismas reglas del protocolo de Zcash— Zakura introduce importantes mejoras de ingeniería orientadas a reducir la barrera para ejecutar un nodo completo de Zcash.

El proyecto es un esfuerzo conjunto entre **Project Tachyon** (dirigido por Sean Bowe, uno de los ingenieros criptográficos originales de Zcash) y **Valar Group** (dirigido por Dev Ojha). Juntos se enfocan en mejoras de próxima generación del protocolo de Zcash, y Zakura sirve como el nodo de referencia para ese trabajo.

---

## Características principales

### Sincronización de la cadena 5× más rápida

Zakura logra una sincronización de la blockchain aproximadamente 5× más rápida en comparación con Zebra. Esto lo hace significativamente más práctico para operadores que necesitan poner en marcha un nodo rápidamente o recuperarse de un tiempo de inactividad.

### Arranque mediante snapshot

Zakura publica snapshots preconstruidos de la cadena que reducen drásticamente el tiempo de sincronización inicial:

| Método de arranque | Tiempo |
|-----------------|------|
| Snapshot de archivo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sincronización completa) | ~20 horas |

Los snapshots podados son de aproximadamente **11 GB**, lo que permite un arranque del nodo **680× más rápido** en comparación con sincronizar desde el génesis.

### Poda nativa de bloques

Zakura admite poda de bloques configurable, lo que permite a los operadores de nodos definir cuánta historia de la cadena conservar. Esto hace práctico ejecutar un nodo completo en hardware con almacenamiento limitado, algo útil para validadores, desarrolladores y proveedores de infraestructura que no necesitan toda la cadena histórica.

### Modo de compatibilidad RPC de zcashd

Zakura incluye un modo de compatibilidad que reproduce la interfaz JSON-RPC heredada de `zcashd`. Las wallets, exchanges e integraciones existentes que dependen de los RPC de `zcashd` pueden cambiar a Zakura sin requerir cambios de código.

### Capa de transporte P2P experimental

Zakura incluye una capa de transporte peer-to-peer de próxima generación, actualmente **desactivada por defecto**. Cuando se activa, apunta a:

- Propagación de bloques con un peor caso inferior a 500 ms en toda la red
- Agregación de mempool para una retransmisión de transacciones más eficiente
- Protocolo gossip resistente a DoS para mejorar la resiliencia de la red

Esta capa representa un adelanto de futuras mejoras a nivel de red de Zcash que se están desarrollando bajo Project Tachyon.

### Compatible con Ironwood (NU6.3)

Zakura es totalmente compatible con la actualización de red Ironwood (NU6.3), activada en la mainnet de Zcash a mediados de 2026.

---

## Cómo se relaciona Zakura con otros nodos de Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Lenguaje | C++ (bifurcado de Bitcoin) | Rust | Rust (bifurcado de Zebra) |
| Estado | Obsoleto | Activo | Activo (v1.0.0, jul 2026) |
| Velocidad de sincronización | Línea base | ~1× | ~5× más rápido |
| Poda de bloques | No | No | Sí |
| Compatibilidad RPC de zcashd | Nativa | Parcial | Sí (modo compat) |
| Arranque por snapshot | No | No | Sí (<2 min) |
| P2P experimental | No | No | Sí (opt-in) |

---

## Primeros pasos

Las opciones de descarga, snapshots y la documentación de configuración están disponibles en:

- **Guía de descarga y configuración:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots de la cadena:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código fuente:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Páginas relacionadas

- [Nodo completo Zebra](Zebra_Full_Node.md) — el nodo completo de Zcash upstream del que se bifurcó Zakura
- [Indexador Zaino](Zaino.md) — un indexador basado en Rust compatible con Zebra y Zakura
- [Nodos completos](Full_Nodes.md) — descripción general de las opciones de nodos completos de Zcash
- [Nodos Lightwallet](Lightwallet_Nodes.md) — alternativas de clientes ligeros

## Recursos

- [Presentamos Zakura — anuncio](https://zakura.com/announcements/introducing-zakura/)
- [GitHub de Zakura](https://github.com/zakura-core/zakura)
- [Sitio web de Zakura](https://zakura.com/)
- [Zakura en X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
