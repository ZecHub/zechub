#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Sitio web oficial](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs es un equipo de visionarios dedicado a mejorar la experiencia humana. Creemos que la tecnología debe beneficiar a la humanidad y que prosperamos mediante interacciones consensuadas. Estamos identificando los patrones que hacen esto posible.

Zingo Lab Cyan opera como una DAO blindada. Guardamos nuestros fondos en una tesorería donde cada miembro tiene una clave de visualización. Los fondos se gastan de la tesorería cuando los miembros votan a favor de una propuesta.

## Proyectos

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet es una wallet de Zcash con todas las funciones, diseñada para facilitar su uso, aunque incluye algunas características avanzadas para usuarios más experimentados. Admite pools transparentes, Sapling y Ironwood, cuenta con una libreta de direcciones para pagos recurrentes y está disponible en varios idiomas. Fue la primera wallet compatible con Orchard e implementar formatos NU5.

Una de las principales características de Zingo! es su capacidad de usar el campo Memo para ofrecer información valiosa sobre tus transacciones.

Zingo! está disponible para dispositivos móviles y PC. Encontrarás todas las descargas [aquí](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Una API y aplicación de prueba que expone la funcionalidad de Zcash para que las aplicaciones la consuman. Zingolib ofrece tanto una biblioteca para zingo-mobile como una aplicación cli incluida llamada zingo-cli, una wallet ligera de línea de comandos que se comunica con un indexador de cadena como [Zaino](/zcash-tech/zaino).

### Indexador de Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino es un indexador de Rust para la blockchain de Zcash, desarrollado por el equipo de Zingo. Es el indexador de la [pila Z3](/zcash-tech/z3-stack): indexa datos de cadena desde un validador de [Zebra](/zcash-tech/zebra-full-node) y sirve a wallets, exploradores y otros clientes. Es la vía sucesora de lightwalletd.

Zaino ofrece características esenciales tanto para clientes ligeros, como wallets y aplicaciones que no requieren el historial completo de la blockchain, como para clientes completos o wallets. También admite exploradores de bloques, otorgando acceso tanto a la blockchain finalizada como a la mejor cadena no finalizada y al mempool administrados por un validador completo de Zebra.

`zcashd` alcanzó su parada de fin de soporte el 18 de julio de 2026 en el bloque 3,417,100 y no admite Ironwood (NU6.3). Zaino lee un validador de Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Un conjunto de utilidades que inicia y administra procesos de Zcash. Se utiliza para pruebas de integración en el desarrollo de:
- clientes ligeros
- indexadores
- validadores

Su objetivo es ofrecer un entorno de pruebas altamente adaptable y sólido para nodos centrales (validadores) como Zebra, indexadores como Zaino y wallets de clientes ligeros como zingo-cli.

La pila predeterminada que inicia es Zebrad, zainod y zcash-devtool. Los procesos heredados de `zcashd` y lightwalletd se encuentran detrás de una característica de `legacy-stack` no admitida y está prevista su eliminación.

Además de proporcionar herramientas para iniciar, almacenar en caché y cargar datos de cadena de Zcash (para mainnet, testnet y regtest), zcash-local-net se utiliza desde la suite de pruebas de Zaino para evaluar los servicios Lightwallet RPC alojados en Zaino (consulta la documentación de pruebas de [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
