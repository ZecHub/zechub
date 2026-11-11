<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Nodo completo [Full Node]

## Resumen

- Zebra (`zebrad`) es el nodo completo [full node] de Zcash escrito en Rust y mantenido por la Zcash Foundation.
- Valida bloques [blocks] y transacciones [transactions], conserva el estado de la red [chain] y se comunica con otros nodos [nodes] mediante la red peer-to-peer.
- Zebra y zcashd implementaron el mismo protocolo y podían interoperar. Desde la retirada de zcashd, Zebra desempeña la función de consenso [consensus].
- Dos formas de ejecutarlo: la imagen `zfnd/zebra` Docker o una compilación desde el código fuente.
- El hardware recomendado es de 4 núcleos de CPU, 16 GB de RAM y 300 GB de disco. El mínimo es de 2 núcleos y 4 GB de RAM, con los mismos 300 GB de disco.

## Explicación principal

Zebra es el primer nodo de Zcash escrito completamente en Rust. Se encuentra en la red peer-to-peer de Zcash, donde valida y retransmite transacciones y conserva el estado de la blockchain [blockchain]. Tener una segunda implementación independiente hace que la infraestructura de red dependa menos de una única base de código.

### Zebra y zcashd

El nodo original de Zcash, zcashd, fue desarrollado por la Electric Coin Company a partir de la base de código de Bitcoin. Zebra se escribió desde cero en Rust, un lenguaje seguro para la memoria, con un enfoque en la seguridad y la eficiencia.

Ambas implementaciones siguen el mismo protocolo, por lo que podían comunicarse e interoperar. zcashd alcanzó su detención de fin de soporte el 18 de julio de 2026 y ya no se inicia, lo que deja a Zebra y Zakura como las implementaciones de nodo en uso. Consulte [Nodos completos](/zcash-tech/full-nodes) para obtener una visión más amplia.

## Ejecución de Zebra

Puede ejecutar Zebra usando la imagen Docker o compilarlo manualmente. Consulte la sección Requisitos del sistema.

### Uso de Docker

Para ejecutar la versión más reciente y sincronizarla con la punta, ejecute el siguiente comando:

```

docker run zfnd/zebra:latest

```

Para obtener instrucciones completas, consulte la documentación de [Docker](https://zebra.zfnd.org/user/docker.html).

### Compilación de Zebra

La compilación de Zebra requiere Rust, libclang y un compilador de C++.

- Asegúrese de tener instalada la versión estable más reciente de Rust, ya que Zebra se prueba exclusivamente con ella.
- Las dependencias de compilación necesarias incluyen:
  - libclang (también conocido como libclang-dev o llvm-dev)
  - clang u otro compilador de C++ (como g++ para todas las plataformas o Xcode para macOS)
  - protoc (compilador de Protocol Buffers) con el indicador *--experimental_allow_proto3_optional*, introducido en Protocol Buffers v3.12.0 (publicado el 16 de mayo de 2020).

### Instalar e iniciar

En Linux x86_64 o aarch64 con glibc 2.34 o una versión posterior (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), puede omitir las dependencias de compilación e instalar un binario precompilado firmado:

```
cargo binstall zebrad
```

Los mismos binarios se adjuntan a cada versión de GitHub como `zebrad-<version>-<target>.tar.gz`, cada uno con una suma de comprobación SHA-256, una certificación de procedencia de compilación de Sigstore y una firma de Cosign. En plataformas más antiguas, use la imagen Docker o compile desde el código fuente.

Para compilar desde el código fuente, obtenga el código y compile el binario de lanzamiento:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Inicie el nodo con:

```
target/release/zebrad start
```

Guía de instalación: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Configuraciones y funciones opcionales

### Inicialización del archivo de configuración

  - Genere un archivo de configuración usando el comando:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - El archivo *zebrad.toml* generado se colocará en el directorio de preferencias predeterminado de Linux. Para conocer ubicaciones predeterminadas alternativas según el sistema operativo, consulte la documentación.

### Configuración de las barras de progreso

  - Configure *tracing.progress_bar* en su archivo *zebrad.toml* para mostrar métricas clave en la terminal mediante barras de progreso. Nota: Existe un problema conocido por el que las estimaciones de las barras de progreso pueden llegar a ser excesivamente grandes.

### Configuración del minado [Mining]

  - Zebra puede configurarse para el minado especificando una *MINER_ADDRESS* y el mapeo de puertos en Docker. Puede encontrar más detalles en la documentación de [Compatibilidad con minado](https://zebra.zfnd.org/user/mining-docker.html).

### Funciones de compilación personalizadas

  - Amplíe la funcionalidad de Zebra con funciones adicionales de Cargo, como métricas de Prometheus, supervisión de Sentry, compatibilidad experimental con Elasticsearch y más.

  - Combine varias funciones enumerándolas como parámetros del indicador `--features` durante la instalación.

  - Algunas funciones de depuración y supervisión están deshabilitadas en las compilaciones de lanzamiento para optimizar el rendimiento. Para consultar la lista completa de funciones experimentales y para desarrolladores [developers], consulte la documentación de la API de [](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Requisitos del sistema y configuración de red

### Requisitos recomendados

- CPU: 4 núcleos de CPU
- RAM: 16 GB
- Espacio en disco: 300 GB de espacio disponible en disco para compilar binarios y almacenar el estado de red en caché
- Red: conexión de red de 100 Mbps con un mínimo de 300 GB de cargas y descargas al mes

### Requisitos mínimos

- CPU: 2 núcleos de CPU
- RAM: 4 GB
- Espacio en disco: 300 GB de espacio disponible en disco

La suite de pruebas de Zebra puede tardar más de una hora en completarse, según las especificaciones de su equipo. Los sistemas más lentos pueden compilar y ejecutar Zebra. Los límites precisos de rendimiento no se han establecido mediante pruebas.

### Requisitos de disco

- Zebra utiliza aproximadamente 300 GB para los datos de Mainnet en caché y 10 GB para los datos de Testnet en caché. Espere que el uso de disco aumente con el tiempo.
- La base de datos se limpia periódicamente, así como al apagarse o reiniciarse. Los cambios se confirman mediante transacciones de base de datos. Los cambios incompletos causados por una finalización forzada o un pánico se revierten la próxima vez que se inicie Zebra.

### Requisitos de red y puertos

- Zebra utiliza los siguientes puertos TCP para conexiones entrantes y salientes:
  - 8233 para Mainnet
  - 18233 para Testnet
- Configurar Zebra con un listen_addr específico anuncia esta dirección [address] para las conexiones entrantes. Las conexiones salientes son necesarias para la sincronización; las conexiones entrantes son opcionales.
- Es necesario acceder a los seeders DNS de Zcash mediante el resolvedor DNS del sistema operativo (normalmente, el puerto 53).
- Zebra puede realizar conexiones salientes en cualquier puerto. zcashd prefiere pares en puertos predeterminados para evitar que se utilice para ataques DDoS contra otras redes.

### Uso típico de red de Mainnet

- Sincronización inicial: Se requiere una descarga de 300 GB para la sincronización inicial, y se espera que esta cifra aumente.
- Actualizaciones continuas: Cargas y descargas diarias de entre 10 MB y 10 GB, según los tamaños de las transacciones de los usuarios y las solicitudes de pares.
- Zebra inicia una sincronización inicial en cada cambio de versión de la base de datos interna, lo que puede implicar una descarga completa de la red durante las actualizaciones de versión.
- Se prefieren pares con una latencia de ida y vuelta de 2 segundos o menos. Si la latencia supera este umbral, abra un ticket en el repositorio de Zebra.

## Errores comunes

- Dimensionar el disco para las necesidades actuales. El estado de Mainnet en caché ya ronda los 300 GB y sigue creciendo.
- Esperar RPC de billetera [wallet] de `zebrad`. Las claves y los saldos se encuentran en [Zallet](https://github.com/zcash/zallet), un programa independiente.
- Ejecutar solo `zebrad` y esperar que se conecten las billeteras ligeras. Esa ruta necesita un indexador, ya sea lightwalletd o [Zaino](/zcash-tech/zaino).
- Considerar una resincronización inesperada como un fallo. Un cambio de versión de la base de datos activa una por diseño.

## Páginas relacionadas

- [Nodos completos](/zcash-tech/full-nodes) - qué hace un nodo completo y qué implementaciones existen
- [Zakura Nodo](/zcash-tech/zakura-node) - un nodo bifurcado de Zebra con sincronización y poda más rápidas
- [Zaino](/zcash-tech/zaino) - el indexador de Rust que sirve a las billeteras ligeras
- [Nodos de billeteras ligeras](/zcash-tech/lightwallet-nodes) - los servidores que consultan las billeteras ligeras
- [Zcash Guía de minado](/using-zcash/zcash-mining-guide) - minado contra su propio nodo

## Aprendizaje adicional

- [El libro de Zebra](https://zebra.zfnd.org)
- [Zebra en GitHub](https://github.com/ZcashFoundation/zebra/)
- [Requisitos del sistema](https://zebra.zfnd.org/user/requirements.html)
