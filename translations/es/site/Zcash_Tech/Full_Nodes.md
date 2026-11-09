<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodos completos [Full Nodes]

## TL;DR

- Un nodo completo mantiene una copia completa de la blockchain Zcash y verifica cada nuevo bloque y transacción [transaction] conforme a las reglas de consenso [consensus].
- Zebra (`zebrad`) es el nodo que se debe instalar actualmente. Zakura es una segunda implementación, bifurcada de Zebra.
- zcashd está retirado. Su detención de fin de soporte [End-of-Support] se alcanzó el 18 de julio de 2026 a la altura de bloque 3417100, y esos nodos ya no se inician.
- El nodo y la billetera [wallet] ahora son programas independientes. [Zallet](https://github.com/zcash/zallet) se ejecuta con un nodo y guarda las claves.
- Ejecutar tu propio nodo te proporciona verificación independiente y elimina la necesidad de confiar en el servidor de otra persona.

## Explicación principal

Un nodo completo es software que ejecuta una copia completa de la blockchain de una criptomoneda, lo que te da acceso a las funciones del protocolo.

Mantiene un registro completo de cada transacción que ha ocurrido desde el génesis y, por lo tanto, puede verificar la validez de las nuevas transacciones y bloques que se añaden a la blockchain.

## Implementaciones de nodos

### Zebra

Zebra es una implementación independiente y lista para producción de un nodo completo del protocolo Zcash, creada por Zcash Foundation y escrita en Rust. Puesto que zcashd está retirado, Zebra (`zebrad`) es el nodo completo recomendado para nuevos despliegues.

Zebra valida bloques y transacciones, participa en la red peer-to-peer y expone una interfaz RPC para aplicaciones. La billetera es ahora un componente independiente: [Zallet](https://github.com/zcash/zallet) se ejecuta con un nodo Zebra y gestiona las claves y los saldos. Esto sustituye a zcashd, que agrupaba el nodo y la billetera en un único proceso.

Para servir billeteras ligeras blindadas [shielded], el nodo se ejecuta junto a un indexador, ya sea el consolidado [lightwalletd](https://github.com/zcash/lightwalletd) o el más reciente [Zaino](https://zechub.wiki/zcash-tech/zaino).

Asegúrate de leer el libro Zebra para obtener instrucciones de configuración, y únete al servidor de I+D Discord para recibir soporte.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[El libro de Zebra](https://zebra.zfnd.org)

Consulta [Zebra Nodo completo](/zcash-tech/zebra-full-node) para conocer los pasos de instalación, la configuración y los requisitos de hardware.

### Zakura

Zakura es un segundo nodo completo compatible con el consenso, bifurcado de Zebra y desarrollado por Valar Group junto con el proyecto Tachyon. Sigue las mismas reglas del protocolo y añade sincronización más rápida, poda de bloques y una capa de compatibilidad RPC zcashd. Consulta [Zakura Nodo](/zcash-tech/zakura-node).

### zcashd (retirado)

> **Nota:** zcashd ha sido retirado. Electric Coin Company [anunció la descontinuación](https://z.cash/support/zcashd-deprecation/), y la detención automática de fin de soporte se alcanzó el 18 de julio de 2026 a la altura de bloque 3417100. Todos los nodos zcashd 6.20.0 sin modificar se apagaron a esa altura y se niegan a reiniciarse, y el software no es compatible con NU6.3. Utiliza Zebra. Si tienes una billetera zcashd `wallet.dat`, sigue la [Guía de migración: zcashd a zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd fue la implementación original de nodo completo para Zcash, desarrollada y mantenida por Electric Coin Company. Las instrucciones de compilación siguientes se conservan como referencia y para los operadores que migran desde zcashd.

zcashd expone un conjunto de API mediante su interfaz RPC. Estas API proporcionan funciones que permiten a las aplicaciones externas interactuar con el nodo.

[lightwalletd](https://github.com/zcash/lightwalletd) es un ejemplo de una aplicación que utiliza un nodo completo para permitir a los desarrolladores crear y mantener billeteras ligeras blindadas compatibles con dispositivos móviles sin tener que interactuar directamente con zcashd.

[Lista completa de comandos RPC compatibles](https://zcash.github.io/rpc/)

[El libro de zcashd](https://zcash.github.io/zcash/)

#### Iniciar un nodo (Linux)

- Instalar dependencias

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clonar la última versión, seleccionarla, configurar y compilar:

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

[Guía para zcashd en Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implicaciones prácticas

### La red

Al ejecutar un nodo completo, ayudas a fortalecer la red Zcash al apoyar su descentralización [decentralization].

Esto ayuda a prevenir el control adversario y a mantener la red resiliente ante algunas formas de interrupción.

Los seeders DNS exponen una lista de otros nodos fiables mediante un servidor integrado. Esto permite que las transacciones se propaguen por toda la red.

### Estadísticas de la red

Estas son plataformas de ejemplo que permiten acceder a datos de la red Zcash:

[Zcash Explorador de bloques](https://mainnet.zcashexplorer.app)

[Coin Metrics](https://docs.coinmetrics.io/info/assets/zec)

También puedes contribuir al desarrollo de la red ejecutando pruebas o proponiendo nuevas mejoras y proporcionando métricas.

### Minado [Mining]

Los mineros [Miners] requieren nodos completos para acceder a todas las RPC relacionadas con el minado, como getblocktemplate y getmininginfo.

zcashd también permite minar a coinbase blindado. Los mineros y los pools de minado tienen la opción de minar directamente para acumular ZEC blindado en una dirección z de forma predeterminada.

Lee [La guía de minado](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) o únete a la página del foro de la comunidad para [Zcash Mineros](https://forum.zcashcommunity.com/c/mining/13).

### Privacidad [Privacy]

Ejecutar un nodo completo te permite verificar de forma independiente todas las transacciones y los bloques de la red Zcash.

Ejecutar un nodo completo evita algunos riesgos de privacidad asociados con el uso de servicios de terceros para verificar transacciones en tu nombre.

Utilizar tu propio nodo también permite conectarte a la red mediante [Tor](https://zcash.github.io/zcash/user/tor.html).
Esto tiene la ventaja adicional de permitir que otros usuarios se conecten de forma privada a la dirección .onion de tu nodo.

## Errores comunes

- Compilar zcashd siguiendo las instrucciones anteriores y esperar un nodo funcional. Esos binarios se detienen a la altura de descontinuación.
- Ejecutar un nodo y asumir que tu billetera móvil ahora lo utiliza. Una billetera ligera continúa comunicándose con el servidor que tenga configurado hasta que la dirijas al tuyo. Consulta [Nodos de billeteras ligeras](/zcash-tech/lightwallet-nodes).
- Ejecutar solo `zebrad` y esperar que se conecten las billeteras ligeras. El nodo necesita un indexador junto a él, ya sea lightwalletd o [Zaino](/zcash-tech/zaino).
- Buscar RPC de billetera en el nodo. Las claves y los saldos se trasladaron a Zallet.

## Páginas relacionadas

- [Zebra Nodo completo](/zcash-tech/zebra-full-node) - instalar, configurar y ejecutar el nodo recomendado
- [Zakura Nodo](/zcash-tech/zakura-node) - la segunda implementación de nodo, bifurcada de Zebra
- [Nodos de billeteras ligeras](/zcash-tech/lightwallet-nodes) - los servidores que consultan las billeteras ligeras
- [Zaino](/zcash-tech/zaino) - el indexador Rust que sirve a las billeteras ligeras
- [Zcash Sincronización de billeteras](/zcash-tech/zcash-wallet-syncing) - por qué la sincronización funciona de esta manera

## Aprendizaje adicional

Lee [Documentación de soporte](https://zcash.readthedocs.io/en/latest/)

Únete a nuestro servidor [Discord](https://discord.gg/zcash) o contáctanos en [X](https://X.com/ZecHub)
