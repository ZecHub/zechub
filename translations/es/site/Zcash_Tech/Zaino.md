# Zaino Indexador [Indexer]

Zaino es un indexador [indexer] de Rust para la blockchain Zcash. Lee datos de la red [chain data] desde un nodo completo [full node] Zebra y proporciona los datos que necesitan las billeteras, los exploradores, los faucets y otros servicios sin hacer que Zebra sea responsable de cada índice orientado al cliente.

## TL;DR

* **Zebra** valida la red Zcash.
* **Zaino** indexa los datos de la red de Zebra y expone API orientadas al cliente.
* **Zallet** es el componente de billetera de la pila Z3. En la configuración predeterminada de Z3, Zallet se comunica directamente con Zebra y no requiere el servicio independiente Zaino.
* El servicio independiente Zaino es útil cuando los operadores necesitan un endpoint gRPC compatible con lightwalletd, un proxy JSON-RPC o infraestructura para billeteras ligeras, exploradores, faucets y servicios similares.
* Zaino es infraestructura activa, pero los operadores deben consultar la documentación oficial de Zaino y de Z3 para conocer los detalles actuales de implementación antes de ejecutarlo en producción.

## Qué hace Zaino

Zaino se sitúa entre Zebra y el software cliente. Zebra es el nodo de consenso: descarga, verifica y sigue la blockchain Zcash. Zaino utiliza Zebra como fuente de datos de la red y luego prepara vistas indexadas que las aplicaciones cliente pueden consultar de manera eficiente.

Esta separación mantiene claras las funciones:

| Componente | Función |
|:--|:--|
| Zebra | Nodo completo y validador |
| Zaino | Indexador y servicio de API orientado al cliente |
| Zallet | Servicio de billetera |
| lightwalletd | Servidor de billetera ligera más antiguo que Zaino está diseñado para reemplazar o complementar |

Zaino proporciona funcionalidad para clientes ligeros, clientes completos o billeteras, y exploradores de bloques. Da acceso a la red finalizada, a la mejor red no finalizada y a los datos del mempool mantenidos por Zebra.

## Cómo encaja en la pila actual de Zcash

La pila actual de Z3 se construye en torno a Zebra, Zallet y el opcional Zaino.

En la implementación predeterminada de Z3, Zebra y Zallet se ejecutan juntos. Zallet accede directamente a Zebra, por lo que un operador que ejecute solo una pila de billetera local no necesita iniciar el servicio independiente Zaino.

Zaino se añade cuando el operador quiere atender a clientes externos. En Z3, se ejecuta detrás del perfil Compose de `indexer` y añade:

* un endpoint gRPC compatible con lightwalletd para clientes de billetera ligera
* un proxy JSON-RPC para exploradores, faucets y backends de servicios
* una base de datos de indexador independiente del estado de la red de Zebra

Esto hace que Zaino sea especialmente relevante para backends de billeteras, operadores de infraestructura pública, exploradores, faucets y desarrolladores que prueban servicios que necesitan datos indexados de la red Zcash.

## Zaino y lightwalletd

lightwalletd es el servidor original de billetera ligera. Zaino es la vía sucesora basada en Rust para esta función. Su objetivo es proporcionar API compatibles cuando sea posible para que las billeteras y los servicios puedan migrar sin tener que reescribirse por completo de una vez.

Eso no significa que cada implementación de lightwalletd ya se haya trasladado a Zaino. Los operadores deben tratar Zaino como parte de la pila actual basada en Zebra y consultar la documentación, las versiones y los paneles de servicios más recientes del proyecto antes de elegir qué ejecutar.

## Notas para operadores

La vía de implementación autorizada más sencilla es el repositorio Z3. Z3 incluye Zaino como servicio opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Ejecute primero la configuración normal de Z3 y espere a que Zebra se sincronice antes de iniciar servicios dependientes en mainnet o testnet.

Zaino expone dos tipos de servicio de red. El servicio gRPC es la API orientada a lightwallet. El servicio JSON-RPC está destinado a loopback o redes privadas de confianza, salvo que una capa externa proporcione protección. No exponga un endpoint JSON-RPC sin autenticación ni cifrado a la internet pública.

## Algunos diagramas que muestran cómo funciona Zaino

### Arquitectura interna de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Arquitectura del servicio activo de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Arquitectura del sistema de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Errores comunes

**Tratar Zaino como un nodo completo.** Zaino no es el validador. Zebra valida la red; Zaino indexa datos de Zebra.

**Suponer que toda implementación de Z3 necesita Zaino independiente.** Zallet puede acceder directamente a Zebra en la pila predeterminada de Z3. Inicie Zaino cuando necesite el servicio de indexador independiente para clientes externos.

**Presentar funciones planificadas como si ya estuvieran implementadas.** Zaino se desarrolla activamente, así que consulte las notas de la versión y la documentación actuales antes de describir una función como disponible.

**Exponer JSON-RPC sin cuidado.** La interfaz JSON-RPC de Zaino es para loopback o redes privadas de confianza, salvo que esté protegida por otra capa.

## ¿Dónde puedo obtener más información?

* [Repositorio de Zaino GitHub](https://github.com/zingolabs/zaino)
* [Versiones de Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentación generada de Zaino](https://zingolabs.github.io/zaino/)
* [Repositorio de implementación de Z3](https://github.com/ZcashFoundation/z3)
* [Documentación de Zebra](https://zebra.zfnd.org/)
* [Subvención y discusión del proyecto Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última actualización:** Agosto de 2026
