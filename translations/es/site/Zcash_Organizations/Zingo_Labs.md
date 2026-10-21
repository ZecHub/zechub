#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Texto Alternativo" width="50"/> ZingoLabs

[Sitio Web Oficial](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs es un equipo de visionarios dedicado a mejorar la experiencia humana. Creemos que la tecnología debe beneficiar a la humanidad y que prosperamos a través de interacciones consensuadas. Estamos identificando los patrones que hacen esto posible.

Zingo Lab Cyan opera como una Shielded DAO. Almacenamos nuestros fondos en una tesorería donde cada miembro tiene una Viewing Key. Los fondos se gastan desde la tesorería cuando los miembros votan a favor de una propuesta.

## Proyectos

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet es una billetera de Zcash con todas las funciones, diseñada para ser fácil de usar, aunque incluye algunas funciones avanzadas para usuarios más experimentados. Es compatible con los pools transparent, Sapling y Orchard, tiene una libreta de direcciones para pagos recurrentes y está disponible en varios idiomas. Fue la primera billetera en ser compatible con Orchard y en implementar los formatos NU5.

Una de las principales características de Zingo! es su capacidad para usar el campo Memo para ofrecer información valiosa sobre tus transacciones.

Zingo! está disponible para dispositivos móviles y PCs. Encontrarás todas las descargas [aquí](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Una API y una aplicación de prueba que exponen la funcionalidad de zcash para el consumo por parte de aplicaciones. Zingolib proporciona tanto una biblioteca para zingo-mobile como una aplicación cli incluida para interactuar con zcashd a través de lightwalletd llamada zingo-cli, un cliente proxy de lightwalletd de línea de comandos.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino es un Indexer desarrollado en Rust por el equipo de Zingo, que tiene como objetivo reemplazar lightwalletd e impulsar el proyecto de desuso de zcashd.

Zaino ofrece funciones esenciales tanto para clientes ligeros, como billeteras y aplicaciones que no requieren el historial completo de la blockchain, como para clientes completos o billeteras. También es compatible con exploradores de bloques, otorgando acceso tanto a la blockchain finalizada como a la mejor cadena no finalizada y a la mempool gestionadas por un validador completo Zebra o zcashd.

###  ZLN (zcash-local-net) ([GitHub](https://.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Un conjunto de utilidades que inicia y gestiona procesos de Zcash. Se utiliza para pruebas de integración en el desarrollo de:
- clientes ligeros
- indexadores
- validadores

Su objetivo es ofrecer un entorno de pruebas altamente adaptable y sólido para nodos centrales (validadores) como zcash y zebra, indexadores como lightwallet y zaino y, como mínimo, zingo-cli como billetera de cliente ligero.

Este repositorio está diseñado para comparar la funcionalidad de varios validadores (como zcashd y Zebrad) e indexadores (como lightwalletd y Zaino) para facilitar la migración durante el proceso de desuso de zcashd.

Además de proporcionar herramientas para iniciar, almacenar en caché y cargar datos de la cadena de Zcash (para mainnet, testnet y regtest), zcash-local-net incluye una serie de pruebas para comparar las capacidades de lightwalletd y Zaino en todos los servicios Lightwallet RPC. Estas pruebas pueden ejecutarse directamente desde Zaino (consulta [https://.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)) para evaluar los servicios Lightwallet RPC alojados en Zaino.
