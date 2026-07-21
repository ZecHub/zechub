<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

## Introducción al nodo Zebra

Presentamos Zebra: revolucionando la infraestructura de nodos de Zcash con Rust

Conoce Zebra, un logro innovador como el nodo de Zcash inaugural creado completamente en Rust. Integrado sin problemas en la red peer-to-peer de Zcash, Zebra sirve como una herramienta fundamental que fortalece la resiliencia de la red. A través de sus funciones principales de validar y difundir transacciones, y de mantener meticulosamente el estado de la blockchain de Zcash, Zebra contribuye a una infraestructura de red más descentralizada.

## Ventajas sobre la implementación del nodo Zcashd
A diferencia del nodo original de Zcash, zcashd, que remonta su linaje al código base fundacional de Bitcoin y es desarrollado por Electric Coin Company, nuestra implementación se presenta como una entidad autónoma. Desarrollado desde cero con un enfoque en la seguridad y la eficiencia, Zebra aprovecha la potencia del lenguaje Rust, seguro en memoria.

A pesar de sus orígenes distintos, tanto zcashd como Zebra se adhieren al mismo protocolo, lo que facilita una comunicación e interoperabilidad fluidas entre ambos. Esta innovación no solo amplía el ecosistema de Zcash, sino que también establece un nuevo estándar para el desarrollo de nodos de blockchain.

## Instrucciones para Zebra Launcher

Puedes ejecutar Zebra usando nuestra imagen de Docker o puedes compilarlo manualmente. Consulta la sección de Requisitos del sistema.

### Uso de Docker:

Para ejecutar fácilmente nuestra versión más reciente y sincronizarla hasta la punta de la cadena, ejecuta el siguiente comando:

```

docker run zfnd/zebra:latest

```

Para obtener instrucciones más completas e información detallada, consulta nuestra [documentación de Docker](https://zebra.zfnd.org/user/docker.html).

### Compilación de Zebra:

La compilación de Zebra requiere Rust, libclang y un compilador de C++.

- Asegúrate de tener instalada la versión estable más reciente de Rust, ya que Zebra se prueba exclusivamente con ella.
- Las dependencias de compilación necesarias incluyen:
  - libclang (también conocido como libclang-dev o llvm-dev)
  - clang u otro compilador de C++ (como g++ para todas las plataformas o Xcode para macOS)
  - protoc (compilador de Protocol Buffers) con la bandera *--experimental_allow_proto3_optional*, introducida en Protocol Buffers v3.12.0 (publicada el 16 de mayo de 2020).



### Dependencias en Arch:

Después de asegurarte de que se cumplen las dependencias, procede a compilar e instalar Zebra usando el siguiente comando:

```

cargo install --locked zebrad

```

Inicia Zebra ejecutando:

```
zebrad start

```


## Configuraciones y funciones opcionales:


### - Inicialización del archivo de configuración:

  - Genera un archivo de configuración usando el comando:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - El archivo *zebrad.toml* generado se colocará en el directorio predeterminado de preferencias de Linux. Para ubicaciones predeterminadas en otros sistemas operativos, consulta nuestra documentación.



### - Configuración de las barras de progreso:

  - Configura *tracing.progress_bar* en tu *zebrad.toml* para mostrar métricas cruciales en la terminal mediante barras de progreso. Nota: Existe un problema conocido por el cual las estimaciones de la barra de progreso pueden volverse excesivamente grandes.



### - Configuración de la minería:

  - Zebra puede adaptarse para minería especificando una *MINER_ADDRESS* y un mapeo de puertos en Docker. Puedes encontrar más detalles en nuestra [documentación de soporte para minería](https://zebra.zfnd.org/user/mining-docker.html).


### - Funciones de compilación personalizadas:

  - Amplía la funcionalidad de Zebra con funciones adicionales de Cargo como métricas de Prometheus, monitoreo con Sentry, soporte experimental para Elasticsearch y más.

  - Combina varias funciones enumerándolas como parámetros de la bandera `--features` durante la instalación.


### Nota: Algunas funciones de depuración y monitoreo están deshabilitadas en las compilaciones de lanzamiento para optimizar el rendimiento.

Para obtener una lista completa de funciones experimentales y para desarrolladores, consulta nuestra [documentación de API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Requisitos del sistema y configuración de red para Zebra

Para garantizar un rendimiento y una fiabilidad óptimos, recomendamos los siguientes requisitos del sistema para compilar y ejecutar zebrad, el revolucionario nodo de Zcash construido completamente en Rust:

### Requisitos del sistema:
- CPU: 4 núcleos de CPU
- RAM: 16 GB
- Espacio en disco: 300 GB de espacio disponible para compilar binarios y almacenar en caché el estado de la cadena
- Red: conexión de red de 100 Mbps con un mínimo de 300 GB de subidas y descargas al mes


Ten en cuenta que la suite de pruebas de Zebra puede tardar más de una hora en completarse dependiendo de las especificaciones de tu máquina. Aunque los sistemas más lentos pueden ser capaces de compilar y ejecutar Zebra, todavía no hemos establecido límites de rendimiento precisos mediante pruebas.


### Requisitos de disco:
- Zebra utiliza aproximadamente 300 GB para los datos de Mainnet en caché y 10 GB para los datos de Testnet en caché. Espera que el uso de disco aumente con el tiempo.
- La base de datos se limpia regularmente, especialmente durante apagados o reinicios, lo que garantiza la integridad de los datos. Los cambios incompletos debido a terminaciones forzadas o pánicos se revierten al reiniciar Zebra.


### Requisitos de red y puertos:
- Zebra emplea los siguientes puertos TCP para conexiones entrantes y salientes:
  - 8233 para Mainnet
  - 18233 para Testnet
- Configurar Zebra con una listen_addr específica permite anunciar esta dirección para conexiones entrantes. Aunque las conexiones salientes son esenciales para la sincronización, las conexiones entrantes son opcionales.
- Es necesario acceder a los DNS seeders de Zcash mediante el resolvedor DNS del sistema operativo (normalmente en el puerto 53).
- Aunque Zebra puede establecer conexiones salientes en cualquier puerto, zcashd prefiere pares en los puertos predeterminados para mitigar ataques DDoS en otras redes.


### Uso típico de la red Mainnet:
- Sincronización inicial: Se requiere una descarga de 300 GB para la sincronización inicial, con un crecimiento previsto en las descargas posteriores.
- Actualizaciones continuas: Espera subidas y descargas diarias que van de 10 MB a 10 GB, según el tamaño de las transacciones de los usuarios y las solicitudes de los pares.
- Zebra inicia una sincronización inicial con cada cambio de versión de la base de datos interna, lo que puede requerir descargas completas de la cadena durante las actualizaciones de versión.
- Se prefieren pares con una latencia de ida y vuelta de 2 segundos o menos. Si la latencia supera este umbral, envía un ticket para recibir ayuda.


Si sigues estas recomendaciones y configuraciones, puedes maximizar la eficiencia y la eficacia de Zebra dentro de la red de Zcash. Si encuentras algún problema o necesitas ayuda adicional, nuestro equipo de soporte está disponible para orientarte.


Aquí está el enlace a la guía de instalación del nodo Zebra:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
