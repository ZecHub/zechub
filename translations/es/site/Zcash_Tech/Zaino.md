<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Indexador Zaino [Indexer]

## TL;DR

* **Zebra** valida la red Zcash.
* **Zaino** indexa los datos de la red de Zebra y expone API orientadas al cliente.
* **Zallet** es el componente de billetera de la pila Z3. En la configuración predeterminada de Z3, Zallet se comunica directamente con Zebra y no requiere el servicio independiente Zaino.
* El servicio independiente Zaino es útil cuando los operadores necesitan un endpoint gRPC compatible con lightwalletd, un proxy JSON-RPC o infraestructura para billeteras ligeras, exploradores, faucets y servicios similares.
* Zaino es infraestructura activa, pero los operadores deben consultar la documentación oficial de Zaino y de Z3 para conocer los detalles actuales de implementación antes de ejecutarlo en producción.

## Explicación principal

Zaino es un indexador de Rust para la blockchain de Zcash. Lee los datos de la cadena desde un nodo completo de Zebra. Proporciona los datos que necesitan las billeteras, los exploradores, los faucets y otros servicios, sin que Zebra tenga que encargarse de todos los índices que necesitan los clientes.

### Qué hace Zaino

Zaino se sitúa entre Zebra y el software cliente. Zebra es el nodo de consenso: descarga, verifica y sigue la blockchain Zcash. Zaino utiliza Zebra como fuente de datos de la red y luego prepara vistas indexadas que las aplicaciones cliente pueden consultar de manera eficiente.

Esta separación mantiene claras las funciones:

| Componente | Función |
|:--|:--|
| Zebra | Nodo completo y validador |
| Zaino | Indexador y servicio de API orientado al cliente |
| Zallet | Servicio de billetera |
| lightwalletd | Servidor de billetera ligera más antiguo que Zaino está diseñado para reemplazar o complementar |

Zaino ofrece funciones para clientes ligeros, clientes completos o billeteras, y exploradores de bloques. Permite acceder a la cadena finalizada, a la mejor cadena no finalizada y a los datos de la mempool que mantiene Zebra.

### Cómo encaja en la Zcash Stack actual

La pila actual de Z3 se construye en torno a Zebra, Zallet y el opcional Zaino.

En la implementación predeterminada de Z3, Zebra y Zallet se ejecutan juntos. Zallet accede directamente a Zebra, por lo que un operador que ejecute solo una pila de billetera local no necesita iniciar el servicio independiente Zaino.

Zaino se añade cuando el operador quiere atender a clientes externos. En Z3, se ejecuta detrás del perfil Compose de `indexer` y añade:

* un endpoint gRPC compatible con lightwalletd para clientes de billetera ligera
* un proxy JSON-RPC para exploradores, faucets y backends de servicios
* una base de datos de indexador independiente del estado de la red de Zebra

Esto hace que Zaino sea especialmente relevante para backends de billeteras, operadores de infraestructura pública, exploradores, faucets y desarrolladores que prueban servicios que necesitan datos indexados de la red Zcash.

### Zaino y lightwalletd

lightwalletd es el servidor original de billetera ligera. Zaino es la vía sucesora basada en Rust para esta función. Su objetivo es proporcionar API compatibles cuando sea posible para que las billeteras y los servicios puedan migrar sin tener que reescribirse por completo de una vez.

Eso no significa que cada implementación de lightwalletd ya se haya trasladado a Zaino. Los operadores deben tratar Zaino como parte de la pila actual basada en Zebra y consultar la documentación, las versiones y los paneles de servicios más recientes del proyecto antes de elegir qué ejecutar.

## Analogía / Cómo se ve

Imagina que la blockchain de Zcash es un enorme archivo de páginas contables.

Zebra es el archivista. Recibe cada página nueva, comprueba que cumpla las reglas y la archiva en el lugar adecuado.

Zaino es el mostrador de consulta frente al archivo. Lee lo que Zebra ha archivado, crea catálogos para encontrar información rápidamente y responde a los visitantes con agilidad. Las billeteras ligeras, los exploradores y los faucets acuden a este mostrador con preguntas como «¿qué contiene este bloque?» o «¿qué transacciones están esperando en la mempool?». El mostrador nunca decide qué páginas son auténticas. Esa tarea le corresponde al archivista.

Zallet, en la configuración predeterminada de Z3, trabaja en el mismo edificio y va directamente al archivista. No necesita el mostrador de consulta.

### Algunos diagramas que muestran cómo funciona Zaino

#### Arquitectura interna de Zaino

![Arquitectura interna de Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Arquitectura del servicio en funcionamiento de Zaino

![Arquitectura del servicio en vivo de Zebra](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Arquitectura del sistema de Zaino

![Arquitectura del sistema de Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Análisis detallado

### Notas para operadores

La vía de implementación autorizada más sencilla es el repositorio Z3. Z3 incluye Zaino como servicio opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Ejecute primero la configuración normal de Z3 y espere a que Zebra se sincronice antes de iniciar servicios dependientes en mainnet o testnet.

Zaino ofrece dos tipos de servicios de red. El servicio gRPC es la API para billeteras ligeras. El servicio JSON-RPC está pensado para conexiones loopback o redes privadas de confianza, salvo que otra capa proporcione protección. No expongas a internet un endpoint JSON-RPC sin autenticación ni cifrado.

## Errores comunes

**Tratar Zaino como un nodo completo.** Zaino no es el validador. Zebra valida la red; Zaino indexa datos de Zebra.

**Suponer que toda implementación de Z3 necesita Zaino independiente.** Zallet puede acceder directamente a Zebra en la pila predeterminada de Z3. Inicie Zaino cuando necesite el servicio de indexador independiente para clientes externos.

**Presentar funciones planificadas como si ya estuvieran implementadas.** Zaino se desarrolla activamente, así que consulte las notas de la versión y la documentación actuales antes de describir una función como disponible.

**Exponer JSON-RPC sin cuidado.** La interfaz JSON-RPC de Zaino es para loopback o redes privadas de confianza, salvo que esté protegida por otra capa.

## Páginas relacionadas

- [Nodos de Lightwallet](/zcash-tech/lightwallet-nodes): los servidores a los que se conectan las billeteras ligeras, lightwalletd y Zaino, y cómo alternar entre ellos.
- [Zinder](/zcash-tech/zinder), otro indexador de Rust, de Zcash Foundation (alfa)
- [Nodo completo de Zebra](/zcash-tech/zebra-full-node): el nodo del que Zaino lee los datos de la cadena.
- [Zallet](/zcash-tech/zallet): la billetera para nodos completos de la pila Z3.
- [Pila Z3](/zcash-tech/z3-stack): Zebra, Zallet y el indexador opcional Zaino, empaquetados juntos.
- [Pruebas de rendimiento de indexadores: Zaino frente a Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): una comparación reproducible de dos indexadores para lightwallet.
- [Nodos completos](/zcash-tech/full-nodes): descripción general del software de nodo completo de Zcash.
- [Sincronización de billeteras de Zcash](/zcash-tech/zcash-wallet-syncing): por qué las billeteras blindadas necesitan un proceso de sincronización.

### Recursos

* Repositorio de [GitHub de Zaino](https://github.com/zingolabs/zaino)
* Versiones de [Zaino](https://github.com/zingolabs/zaino/releases)
* Documentación generada de [Zaino](https://zingolabs.github.io/zaino/)
* [Repositorio de implementación de Z3](https://github.com/ZcashFoundation/z3)
* Documentación de [Zebra](https://zebra.zfnd.org/)
* Debate sobre subvenciones y proyectos de [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última actualización:** noviembre de 2026
