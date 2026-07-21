# Zaino Indexer

Zaino es un Indexer, desarrollado en Rust por el equipo de Zingo, que tiene como objetivo reemplazar lightwalletd e impulsar el proyecto de desuso de zcashd.

Zaino ofrece funciones esenciales tanto para clientes ligeros, como billeteras y aplicaciones que no requieren el historial completo de la blockchain, como para clientes completos o billeteras. También es compatible con exploradores de bloques, otorgando acceso tanto a la blockchain finalizada como a la mejor cadena no finalizada y al mempool gestionados por un validador completo de Zebra o Zcashd.

## ¿Por qué un nuevo Indexer?

La razón principal es prepararse para el futuro. Zcashd y lightwalletd fueron construidos en 2016 a partir de un fork del código de bitcoind, usando C plus. La plataforma y el código utilizados para construir ambos servicios están empezando a quedarse antiguos, ser difíciles de escalar, mantener y de desarrollar funciones modernas sobre ellos.

Rust es un lenguaje moderno, robusto y seguro que permite que Zcash esté preparado para el desarrollo futuro, invitando a nuevos desarrolladores a construir una gran cantidad de nuevas funcionalidades dentro y alrededor del ecosistema de Zcash.

Aun así, Zaino busca ser retrocompatible cuando sea posible, proporcionando APIs e interfaces que ayuden a reducir la fricción en la adopción y aseguren que el ecosistema más amplio de Zcash pueda beneficiarse de las mejoras de Zaino sin reescrituras significativas ni curvas de aprendizaje.

Además, Zaino permitirá separar la funcionalidad del cliente ligero del nodo completo, mediante acceso RPC y una biblioteca de cliente completa, permitiendo a los desarrolladores integrar Zaino y acceder a los datos de la cadena directamente desde su aplicación de cliente ligero, manteniendo los datos sensibles del nodo Zebra aislados y seguros.

## Algunos diagramas que muestran cómo funciona Zaino

### Arquitectura interna de Zaino
![Arquitectura interna de Zaino](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Arquitectura del servicio en vivo de Zaino
![Arquitectura del servicio en vivo de Zebra](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Arquitectura del sistema de Zaino
![Arquitectura del sistema de Zaino](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## ¿Dónde puedo aprender más?
Puedes leer más sobre Zaino Indexer en el [hilo oficial del Foro de la Comunidad Zcash](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) o en su [página oficial de Github](https://github.com/zingolabs/zaino)
