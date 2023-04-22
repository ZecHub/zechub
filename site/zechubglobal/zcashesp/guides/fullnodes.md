# Nodos completos

Un Nodo Completo es un software que ejecuta una copia completa de la blockchain de cualquier criptomoneda, brindando acceso a las características del protocolo.

Mantiene un registro completo de cada transacción que ha ocurrido desde el genesis y, por lo tanto, puede verificar la validez de las nuevas transacciones y bloques que se agregan a la blockchain.

## Zcashd

Zcashd es actualmente la implementación principal de Nodo Completo utilizada por Zcash, desarrollada y mantenida por la Electric Coin Company.

Zcashd expone un conjunto de APIs a través de su interfaz RPC. Estas APIs proporcionan funciones que permiten que aplicaciones externas interactúen con el nodo.

Lightwalletd es un ejemplo de aplicación que utiliza un nodo completo para permitir a los desarrolladores construir y mantener billeteras ligeras blindadas amigables para móviles sin tener que interactuar directamente con Zcashd.

[Lista completa](https://zcash.github.io/rpc/)

[The Zcashd book](https://zcash.github.io/zcash/)


### Iniciando un Nodo (Linux)

- Instalar Dependencias

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clonar la última versión, verificar, configurar y construir:
    
      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)
     
- Sincronizar la Blockchain (puede llevar varias horas)

    Para iniciar el nodo, ejecutar:

      ./src/zcashd
      
- Las claves privadas se almacenan en ~/.zcash/wallet.dat

[Guía para Zcashd en Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra es una implementación independiente de Nodo Completo para el Protocolo Zcash creada por la Zcash Foundation.

Actualmente se encuentra en proceso de prueba y aún es experimental.

Existen dos componentes principales de Zebra. El componente cliente que es responsable de escanear la blockchain y de la prueba de descifrado de transacciones.

La segunda parte es la herramienta de línea de comandos de Zebra. Esta herramienta administra las claves de gasto, direcciones y se comunica con el componente Cliente en Zebrad para proporcionar una funcionalidad básica de billetera.

Cualquier persona interesada en probar Zebra para minar bloques está invitada a unirse al servidor R&D de Discord. Asegúrese de leer también el libro de Zebra para obtener instrucciones de configuración.

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## La Red

Al ejecutar un nodo completo, ayudas a fortalecer la red de Zcash al apoyar su descentralización.

Esto ayuda a evitar el control adversario y mantener la resiliencia de la red ante algunas formas de interrupción.

Los sembradores de DNS exponen una lista de otros nodos confiables a través de un servidor incorporado. Esto permite que las transacciones se propaguen en toda la red.

### Estadísticas de la Red

Estas son algunas plataformas que permiten el acceso a los datos de la red de Zcash:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

También puedes contribuir al desarrollo de la red mediante la realización de pruebas o proponiendo nuevas mejoras y proporcionando métricas.



### Minería

Los mineros requieren nodos completos para acceder a todas las API relacionadas con la minería, como getblocktemplate y getmininginfo.

Zcashd también permite la minería del coinbase blindado. Los mineros y los grupos de minería tienen la opción de minar directamente para acumular ZEC blindado en una dirección z de manera predeterminada.

Lee la [Guía de Minería](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) o únete a la página del Foro de la Comunidad para [Mineros de Zcash](https://forum.zcashcommunity.com/c/mining/13).


### Privacidad

Ejecutar un nodo completo te permite verificar de manera independiente todas las transacciones y bloques en la red de Zcash.

Ejecutar un nodo completo evita algunos riesgos de privacidad asociados con el uso de servicios de terceros para verificar transacciones en tu nombre.

Usar tu propio nodo también permite conectarte a la red a través de [Tor](https://zcash.github.io/zcash/user/tor.html).
Esto tiene la ventaja adicional de permitir que otros usuarios se conecten a tu dirección .onion de forma privada.

**¿Necesitas ayuda?**

Lee la [Documentación de Soporte](https://zcash.readthedocs.io/en/latest/)

Únete a nuestro [Servidor de Discord](https://discord.gg/zcash) o contáctanos en [Twitter](https://twitter.com/ZecHub)



