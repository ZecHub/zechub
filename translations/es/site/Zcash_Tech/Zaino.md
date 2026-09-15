# Zaino Indexador

Zaino es un indexador en Rust para la blockchain de Zcash. Lee los datos de la cadena desde un nodo completo de Zebra y ofrece los datos que wallets, exploradores, faucets y otros servicios necesitan sin hacer que Zebra sea responsable de cada índice orientado al cliente.

## TL;DR

* **Zebra** valida la cadena de Zcash.
* **Zaino** indexa los datos de cadena de Zebra y expone APIs orientadas al cliente.
* **Zallet** es el componente de wallet de la pila Z3. En la configuración predeterminada de Z3, Zallet se comunica directamente con Zebra y no requiere el servicio independiente Zaino.
* El servicio independiente Zaino es útil cuando los operadores necesitan un endpoint gRPC compatible con lightwalletd, un proxy JSON-RPC o infraestructura para wallets ligeras, exploradores, faucets y servicios similares.
* Zaino es infraestructura activa, pero los operadores deben consultar la documentación oficial de Zaino y de Z3 para conocer los detalles actuales de implementación antes de ejecutarlo en producción.

## Qué hace Zaino

Zaino se sitúa entre Zebra y el software cliente. Zebra es el nodo de consenso: descarga, verifica y sigue la blockchain de Zcash. Zaino utiliza Zebra como fuente de datos de cadena y luego prepara vistas indexadas que las aplicaciones cliente pueden consultar eficientemente.

Esta separación mantiene claras las funciones:

| Componente | Función |
|:--|:--|
| Zebra | Nodo completo y validador |
| Zaino | Indexador y servicio de API orientado al cliente |
| Zallet | Servicio de wallet |
| lightwalletd | Servidor de wallet ligera anterior que Zaino está diseñado para sustituir o complementar |

Zaino proporciona funcionalidad para clientes ligeros, clientes completos o wallets, y exploradores de bloques. Da acceso a la cadena finalizada, a la mejor cadena no finalizada y a los datos de mempool mantenidos por Zebra.

## Cómo encaja en la pila actual de Zcash

La pila actual de Z3 está construida en torno a Zebra, Zallet y el opcional Zaino.

En la implementación predeterminada de Z3, Zebra y Zallet se ejecutan juntos. Zallet accede directamente a Zebra, por lo que un operador que ejecute solo una pila local de wallet no necesita iniciar el servicio independiente Zaino.

Zaino se añade cuando el operador desea atender a clientes externos. En Z3, se ejecuta detrás del perfil Compose de `indexer` y añade:

* un endpoint gRPC compatible con lightwalletd para clientes de wallet ligera
* un proxy JSON-RPC para exploradores, faucets y backends de servicios
* una base de datos de indexador separada del estado de cadena de Zebra

Esto hace que Zaino sea especialmente relevante para backends de wallet, operadores de infraestructura pública, exploradores, faucets y desarrolladores que prueban servicios que necesitan datos indexados de la cadena de Zcash.

## Zaino y lightwalletd

lightwalletd es el servidor original de wallet ligera. Zaino es la vía sucesora basada en Rust para esta función. Su objetivo es proporcionar APIs compatibles cuando sea posible para que las wallets y los servicios puedan migrar sin tener que reescribirse completamente de una vez.

Eso no significa que cada implementación de lightwalletd ya se haya trasladado a Zaino. Los operadores deben considerar Zaino como parte de la pila actual basada en Zebra y consultar la documentación más reciente del proyecto, las versiones y los paneles de servicios antes de decidir qué ejecutar.

## Notas para operadores

La vía de implementación autorizada más sencilla es el repositorio Z3. Z3 incluye Zaino como servicio opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Ejecuta primero la configuración normal de Z3 y espera a que Zebra se sincronice antes de iniciar servicios dependientes en mainnet o testnet.

Zaino expone dos tipos de servicio de red. El servicio gRPC es la API orientada a lightwallet. El servicio JSON-RPC está pensado para loopback o redes privadas de confianza, salvo que una capa externa proporcione protección. No expongas a internet público un endpoint JSON-RPC sin autenticación ni cifrado.

## Algunos diagramas que muestran cómo funciona Zaino

### Arquitectura interna de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Arquitectura del servicio en vivo de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Arquitectura del sistema de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Errores comunes

**Tratar Zaino como un nodo completo.** Zaino no es el validador. Zebra valida la cadena; Zaino indexa datos de Zebra.

**Suponer que cada implementación de Z3 necesita Zaino independiente.** Zallet puede acceder directamente a Zebra en la pila predeterminada de Z3. Inicia Zaino cuando necesites el servicio de indexador independiente para clientes externos.

**Presentar funciones planificadas como si ya estuvieran implementadas.** Zaino se desarrolla activamente, así que consulta las notas de la versión actual y la documentación antes de describir una función como disponible.

**Exponer JSON-RPC sin cuidado.** La interfaz JSON-RPC de Zaino es para loopback o redes privadas de confianza, salvo que esté protegida por otra capa.

## ¿Dónde puedo obtener más información?

* [Repositorio de GitHub de Zaino](https://github.com/zingolabs/zaino)
* [versiones de Zaino](https://github.com/zingolabs/zaino/releases)
* [documentación generada de Zaino](https://zingolabs.github.io/zaino/)
* [Repositorio de implementación de Z3](https://github.com/ZcashFoundation/z3)
* [documentación de Zebra](https://zebra.zfnd.org/)
* [subvención y discusión del proyecto de Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última actualización:** agosto de 2026
