#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Sitio web oficial](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs es un equipo de visionarios dedicado a mejorar la experiencia humana. Creemos que la tecnología debe beneficiar a la humanidad y que prosperamos mediante interacciones consensuadas. Estamos identificando los patrones que hacen esto posible.

Zingo Lab Cyan opera como una DAO blindada [Shielded DAO]. Guardamos nuestros fondos en una tesorería [treasury] donde cada miembro tiene claves de visualización [viewing key]. Los fondos se gastan desde la tesorería cuando los miembros votan a favor de una propuesta.

## Proyectos

### Zingo! Billetera [Wallet] ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Billetera es una billetera [wallet] Zcash con todas las funciones diseñada para ser fácil de usar, aunque incluye algunas funciones avanzadas para usuarios más experimentados. Admite pools [pools] transparentes [transparent], Sapling y Ironwood, cuenta con una libreta de direcciones para pagos [payments] recurrentes y está disponible en varios idiomas. Fue la primera billetera en admitir Orchard e implementar formatos NU5.

Una de las principales características de Zingo! es su capacidad para utilizar el campo Memo [Memo field] para ofrecer información valiosa sobre tus transacciones [transactions].

Zingo! está disponible para dispositivos móviles y PC. Encontrarás todas las descargas [aquí](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Una API y una aplicación de prueba que expone funcionalidades de Zcash para el uso por parte de aplicaciones. Zingolib proporciona tanto una biblioteca para zingo-mobile como una aplicación cli incluida llamada zingo-cli, una billetera ligera [light wallet] de línea de comandos que se comunica con un indexador de cadena como [Zaino](/zcash-tech/zaino).

### Indexador Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino es un indexador Rust para la blockchain [blockchain] Zcash, desarrollado por el equipo Zingo. Es el indexador de la [pila Z3](/zcash-tech/z3-stack): indexa datos de la cadena [chain] procedentes de un validador [Zebra](/zcash-tech/zebra-full-node) y presta servicio a billeteras, exploradores y otros clientes. Es la vía sucesora de lightwalletd.

Zaino ofrece funciones esenciales tanto para clientes ligeros [light clients], como billeteras y aplicaciones que no requieren el historial completo de la blockchain, como para clientes completos o billeteras. También admite exploradores de bloques [block explorers], otorgando acceso tanto a la blockchain finalizada como a la mejor cadena no finalizada y al mempool gestionado por un validador completo [full validator] Zebra.

`zcashd` alcanzó su detención de fin de soporte [End-of-Support halt] el 18 de julio de 2026 en el bloque [block] 3,417,100 y no admite Ironwood (NU6.3). Zaino lee un validador Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Un conjunto de utilidades que inicia y administra procesos Zcash. Esto se utiliza para pruebas de integración en el desarrollo de:
- clientes ligeros
- indexadores
- validadores

Su objetivo es ofrecer un entorno de pruebas muy adaptable y sólido para nodos centrales [core nodes] (validadores) como Zebra, indexadores como Zaino y billeteras de clientes ligeros como zingo-cli.

La pila predeterminada que inicia es Zebrad, zainod y zcash-devtool. Los procesos heredados `zcashd` y lightwalletd se encuentran detrás de una función `legacy-stack` no compatible y está previsto eliminarlos.

Además de proporcionar herramientas [tools] para iniciar, almacenar en caché y cargar datos de la cadena Zcash (para mainnet, testnet y regtest), zcash-local-net se utiliza desde la suite de pruebas de Zaino para evaluar los servicios RPC de Lightwallet alojados en Zaino (consulta la documentación de pruebas [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
