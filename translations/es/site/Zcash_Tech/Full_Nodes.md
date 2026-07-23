---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Nodos completos

Un nodo completo es un software que ejecuta una copia completa de la blockchain de cualquier criptomoneda, dando acceso a las funciones del protocolo.

Mantiene un registro completo de cada transacción que ha ocurrido desde el bloque génesis y, por lo tanto, puede verificar la validez de las nuevas transacciones y bloques que se añaden a la blockchain.

## Zcashd

> **Nota:** zcashd está siendo descontinuado. Electric Coin Company ha [anunciado formalmente](https://z.cash/support/zcashd-deprecation/) que zcashd será retirado, con su función de nodo completo reemplazada por [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) y su función de wallet por [Zallet](https://github.com/zcash/zallet). Para nuevas implementaciones, usa Zebra (ver abajo). Si ya ejecutas un nodo zcashd, sigue la [Guía de migración: zcashd a Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd fue la implementación original de nodo completo para Zcash, desarrollada y mantenida por Electric Coin Company. Las instrucciones de compilación que aparecen abajo se conservan como referencia y para operadores que estén migrando fuera de zcashd.

Zcashd expone un conjunto de API a través de su interfaz RPC. Estas API proporcionan funciones que permiten a aplicaciones externas interactuar con el nodo.

[Lightwalletd](https://github.com/zcash/lightwalletd) es un ejemplo de una aplicación que utiliza un nodo completo para permitir que los desarrolladores creen y mantengan wallets ligeras blindadas, compatibles con móviles, sin tener que interactuar directamente con Zcashd.

[Lista completa de comandos RPC compatibles](https://zcash.github.io/rpc/)

[El libro de Zcashd](https://zcash.github.io/zcash/)


### Iniciar un nodo (Linux)

- Instalar dependencias 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clonar la última versión, cambiar a esa versión, configurar y compilar:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronizar la blockchain (puede tardar varias horas)

    Para iniciar el nodo, ejecuta:

      ./src/zcashd

- Las claves privadas se almacenan en ~/.zcash/wallet.dat

[Guía de Zcashd en Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra es una implementación independiente de nodo completo del protocolo Zcash, lista para producción, creada por Zcash Foundation y escrita en Rust. A medida que zcashd es retirado, Zebra (`zebrad`) es el nodo completo recomendado para nuevas implementaciones.

Zebra valida bloques y transacciones, participa en la red peer-to-peer y expone una interfaz RPC para aplicaciones. La wallet ahora es un componente separado: [Zallet](https://github.com/zcash/zallet) se ejecuta sobre un nodo Zebra y gestiona claves y saldos. Esto reemplaza a zcashd, que integraba el nodo y la wallet en un solo proceso.

Para dar servicio a wallets ligeras blindadas, el nodo se ejecuta junto con un indexador, ya sea el consolidado [lightwalletd](https://github.com/zcash/lightwalletd) o el más reciente [Zaino](https://zechub.wiki/zaino).

Asegúrate de leer el libro de Zebra para obtener instrucciones de configuración y únete al servidor de Discord de I+D para recibir soporte. 

[Github](https://github.com/ZcashFoundation/zebra/)

[El libro de Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## La red

Al ejecutar un nodo completo, ayudas a fortalecer la red de zcash al apoyar su descentralización. 

Esto ayuda a prevenir el control adversario y a mantener la red resiliente frente a algunas formas de interrupción.

Los seeders DNS exponen una lista de otros nodos confiables mediante un servidor integrado. Esto permite que las transacciones se propaguen a través de toda la red. 

### Estadísticas de la red

Estas son plataformas de ejemplo que permiten acceder a datos de la red de Zcash:

[Explorador de bloques de Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

También puedes contribuir al desarrollo de la red ejecutando pruebas o proponiendo nuevas mejoras y proporcionando métricas. 



### Minería

Los mineros requieren nodos completos para acceder a todos los rpc relacionados con la minería, como getblocktemplate y getmininginfo. 

Zcashd también permite la minería hacia coinbase blindada. Los mineros y los pools de minería tienen la opción de minar directamente para acumular ZEC blindado en una z-address por defecto. 

Lee la [Guía de minería](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) o únete a la página del foro comunitario para [Mineros de Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacidad 

Ejecutar un nodo completo te permite verificar de forma independiente todas las transacciones y bloques de la red Zcash.

Ejecutar un nodo completo evita algunos riesgos de privacidad asociados con el uso de servicios de terceros para verificar transacciones en tu nombre.

Usar tu propio nodo también permite conectarte a la red mediante [Tor](https://zcash.github.io/zcash/user/tor.html).
Esto tiene la ventaja adicional de permitir que otros usuarios se conecten de forma privada a la dirección .onion de tu nodo.


**¿Necesitas ayuda?**

Lee la [Documentación de soporte](https://zcash.readthedocs.io/en/latest/)

Únete a nuestro [Servidor de Discord](https://discord.gg/zcash) o contáctanos en [twitter](https://twitter.com/ZecHub)
