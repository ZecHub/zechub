<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zaino Indexer

## En resumen

* **Zebra** valida la cadena de Zcash.
* **Zaino** indexa los datos de la cadena de Zebra y ofrece API para los clientes.
* **Zallet** es el componente de billetera de la pila Z3. En la configuración predeterminada de Z3, Zallet se conecta directamente a Zebra y no necesita el servicio independiente Zaino.
* El servicio independiente Zaino es útil cuando los operadores necesitan un endpoint gRPC compatible con lightwalletd, un proxy JSON-RPC o infraestructura para billeteras ligeras, exploradores, faucets y servicios similares.
* Zaino es una infraestructura activa, pero antes de ejecutarla en producción, los operadores deben consultar el Zaino oficial y la documentación de Z3 para conocer los detalles de implementación actuales.

## Explicación principal

Zaino es un indexador de Rust para la blockchain de Zcash. Lee los datos de la cadena desde un nodo completo de Zebra. Proporciona los datos que necesitan las billeteras, los exploradores, los faucets y otros servicios, sin que Zebra tenga que encargarse de todos los índices que necesitan los clientes.

### Qué hace Zaino

Zaino se sitúa entre Zebra y el software cliente. Zebra es el nodo de consenso: descarga, verifica y sigue la blockchain de Zcash. Zaino utiliza Zebra como fuente de datos de la cadena y prepara vistas indexadas que las aplicaciones cliente pueden consultar de forma eficiente.

Esta separación mantiene claros los roles:

| Componente | Función |
|:--|:--|
| Zebra | Nodo completo y validador |
| Zaino | Indexador y servicio de API para clientes |
| Zallet | Servicio de billetera |
| lightwalletd | Servidor antiguo para billeteras ligeras que Zaino está diseñado para reemplazar o complementar |

Zaino ofrece funciones para clientes ligeros, clientes completos o billeteras, y exploradores de bloques. Permite acceder a la cadena finalizada, a la mejor cadena no finalizada y a los datos de la mempool que mantiene Zebra.

### Cómo encaja en la Zcash Stack actual

La pila Z3 actual se basa en Zebra, Zallet y Zaino opcional.

En la implementación predeterminada de Z3, Zebra y Zallet se ejecutan juntos. Zallet se conecta directamente a Zebra, por lo que un operador que solo ejecute una pila de billetera local no necesita iniciar el servicio independiente Zaino.

Zaino se añade cuando el operador quiere atender a clientes externos. En Z3, se ejecuta detrás del perfil de Compose `indexer` y añade:

* un endpoint gRPC compatible con lightwalletd para clientes de billeteras ligeras
* un proxy JSON-RPC para exploradores, faucets y sistemas backend de servicios
* una base de datos del indexador separada del estado de la cadena de Zebra

Por eso, Zaino es especialmente relevante para los sistemas backend de billeteras, los operadores de infraestructura pública, los exploradores, los faucets y los desarrolladores que prueban servicios que necesitan datos indexados de la cadena de Zcash.

### Zaino y lightwalletd

lightwalletd es el servidor original para billeteras ligeras. Zaino es la alternativa sucesora basada en Rust para esta función. Su objetivo es ofrecer API compatibles siempre que sea posible, para que las billeteras y los servicios puedan migrar sin tener que reescribirse por completo de una sola vez.

Eso no significa que todas las implementaciones de lightwalletd ya hayan migrado a Zaino. Los operadores deben considerar Zaino parte de la pila actual basada en Zebra y consultar la documentación, las versiones y los paneles de servicio más recientes del proyecto antes de decidir qué ejecutar.

## Analogía / Cómo se ve

Imagina que la blockchain de Zcash es un enorme archivo de páginas contables.

Zebra es el archivista. Recibe cada página nueva, comprueba que cumpla las reglas y la archiva en el lugar adecuado.

Zaino es el mostrador de consulta frente al archivo. Lee lo que Zebra ha archivado, crea catálogos para encontrar información rápidamente y responde a los visitantes con agilidad. Las billeteras ligeras, los exploradores y los faucets acuden a este mostrador con preguntas como «¿qué contiene este bloque?» o «¿qué transacciones están esperando en la mempool?». El mostrador nunca decide qué páginas son auténticas. Esa tarea le corresponde al archivista.

Zallet, en la configuración predeterminada de Z3, trabaja en el mismo edificio y va directamente al archivista. No necesita el mostrador de consulta.

### Algunos diagramas que muestran cómo funciona Zaino

#### Arquitectura interna de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Arquitectura del servicio en funcionamiento de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Arquitectura del sistema de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Análisis detallado

### Notas para operadores

La forma más sencilla y autorizada de implementar el servicio es mediante el repositorio de Z3. Z3 incluye Zaino como servicio opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Primero ejecuta la configuración normal de Z3 y espera a que Zebra se sincronice antes de iniciar los servicios dependientes en mainnet o testnet.

Zaino ofrece dos tipos de servicios de red. El servicio gRPC es la API para billeteras ligeras. El servicio JSON-RPC está pensado para conexiones loopback o redes privadas de confianza, salvo que otra capa proporcione protección. No expongas a internet un endpoint JSON-RPC sin autenticación ni cifrado.

## Errores comunes

**Tratar Zaino como un nodo completo.** Zaino no es el validador. Zebra valida la cadena; Zaino indexa los datos de Zebra.

**Suponer que toda implementación de Z3 necesita el servicio independiente Zaino.** En la pila predeterminada de Z3, Zallet puede conectarse directamente a Zebra. Inicia Zaino cuando necesites el servicio de indexador independiente para clientes externos.

**Presentar funciones previstas como si ya estuvieran implementadas.** Zaino está en desarrollo activo, así que consulta las notas de la versión y la documentación actuales antes de afirmar que una función está disponible.

**Exponer JSON-RPC sin cuidado.** La interfaz JSON-RPC de Zaino está pensada para conexiones loopback o redes privadas de confianza, salvo que otra capa la proteja.

## Páginas relacionadas

- [Nodos de Lightwallet](/zcash-tech/lightwallet-nodes): los servidores a los que se conectan las billeteras ligeras, lightwalletd y Zaino, y cómo alternar entre ellos.
- [Zinder](/zcash-tech/zinder), otro indexador de Rust, de Zcash Foundation (alfa)
- [Zebra Nodo completo](/zcash-tech/zebra-full-node): el nodo del que Zaino lee los datos de la cadena.
- [Zallet](/zcash-tech/zallet): la billetera para nodos completos de la pila Z3.
- [Pila Z3](/zcash-tech/z3-stack): Zebra, Zallet y el indexador opcional Zaino, empaquetados juntos.
- [Pruebas de rendimiento de indexadores: Zaino frente a Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): una comparación reproducible de dos indexadores para lightwallet.
- [Nodos completos](/zcash-tech/full-nodes): descripción general del software de nodo completo de Zcash.
- [Zcash Sincronización de billeteras](/zcash-tech/zcash-wallet-syncing): por qué las billeteras blindadas necesitan un proceso de sincronización.

### Recursos

* Repositorio de [Zaino GitHub](https://github.com/zingolabs/zaino)
* Versiones de [Zaino](https://github.com/zingolabs/zaino/releases)
* Documentación generada de [Zaino](https://zingolabs.github.io/zaino/)
* [Repositorio de implementación de Z3](https://github.com/ZcashFoundation/z3)
* Documentación de [Zebra](https://zebra.zfnd.org/)
* Debate sobre subvenciones y proyectos de [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última actualización:** noviembre de 2026
