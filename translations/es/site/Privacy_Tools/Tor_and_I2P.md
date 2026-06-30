<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Por qué importa la privacidad

En la era digital, proteger tu [privacy](https://www.privacyguides.org/en/) se ha vuelto cada vez más vital. Aunque algunos puedan considerar la privacidad como una causa perdida, no lo es. Tu privacidad está en juego y debería ser una preocupación. La privacidad tiene un valor significativo porque está relacionada con el poder, y garantizar que ese poder se ejerza de manera responsable es crucial.

## Tecnologías Tor e I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) es una herramienta proxy que utiliza la red Tor para establecer conexiones para aplicaciones. Torbot logra esto al enrutar su tráfico a través de Tor, mejorando así la [privacidad y el anonimato](https://www.torproject.org/) de estas aplicaciones.

## Red I2P

La red I2P, también conocida como el [Invisible Internet Project](https://geti2p.net/en/about/intro), es una red superpuesta peer-to-peer completamente cifrada. Garantiza que el contenido, el origen y el destino de los mensajes permanezcan ocultos para los observadores. En otras palabras, nadie puede ver el origen ni el destino del tráfico, ni el contenido real de los mensajes que se transmiten. El cifrado utilizado en I2P garantiza un alto nivel de privacidad y anonimato para sus usuarios.

## Tor e I2P comparten características comunes, pero también tienen diferencias significativas. 

Tanto Tor como I2P son redes peer-to-peer descentralizadas y anónimas, pero I2P proporciona niveles de seguridad más altos en comparación con Tor. Sin embargo, I2P está diseñado principalmente para acceder a servicios como correo electrónico, chat y torrenting dentro de su red y no puede usarse para acceder al internet convencional. Por otro lado, Tor permite a los usuarios acceder a la deep web, al igual que I2P, pero también funciona como un navegador normal para acceder a sitios web en la surface web.

*Nota: Para más información sobre las similitudes y diferencias entre Tor e I2P visita [aquí](https://geti2p.net/en/comparison/tor)*

## Integración de Tor con Ywallet en smartphone

Orbot es una red privada virtual (VPN) gratuita diseñada para smartphones que dirige el tráfico de todas las aplicaciones de tu dispositivo a través de la red Tor.

Sigue estas instrucciones a continuación para conectar Tor a Zcash Wallet *(Ywallet)*:

1.  Descarga e instala *Orbot* desde la tienda de aplicaciones.

2.  Después de la instalación, aparecerá un mensaje de bienvenida. Continúa a la página principal de *Orbot* y haz clic en *'Tor Enabled Apps'.*              

3. Esto mostrará una página en la pantalla con las aplicaciones compatibles con Tor. Busca la aplicación *Ywallet* y asegúrate de que esté seleccionada.

4. Aparecerá una solicitud de conexión para configurar una VPN, lo que permitirá que *Orbot* supervise el tráfico de red. *Orbot* se inicializará una vez que este permiso haya sido aprobado. 

5. Revisa la barra de tareas o la página principal de Orbot para verificar que Tor esté en ejecución; esto se confirma cuando veas 'Connected to the Tor network'.

* Para ver un video tutorial mira [aquí](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Nota: Si Tor está bloqueado por tu red móvil, puedes usar un Bridge Server como forma alternativa de conexión.*


## Cómo configurar una billetera de Zcash con Torbot en PC/escritorio

## ¿Soporte de Tor en Zcash?

* El navegador Tor puede descargarse desde el sitio web oficial; puedes acceder al enlace [aquí](https://www.torproject.org/download/).

 La forma más conveniente de instalar Tor es mediante el paquete Tor Browser Bundle. Si prefieres instalaciones sin interfaz gráfica, puedes optar por instalar el daemon de Tor por separado. 

*Nota: De forma predeterminada, Tor Browser Bundle expone un listener SOCKS en tcp/9150 y el daemon de Tor expone el listener SOCKS en tcp/9050.*

* Consulta las [instrucciones](https://support.torproject.org/apt/) de instalación específicas para tu sistema operativo proporcionadas por el Tor Project.

## Instalar la billetera Zcashd

Zcashd es la billetera oficial de nodo completo basada en Linux, actualizada y mantenida por desarrolladores principales de Electric Coin Company. Está destinada a usuarios que deseen minar y validar transacciones de Zcash, así como enviar y recibir Zcash.

* El sitio web oficial para descargar la billetera Zcashd se puede encontrar [aquí](https://electriccoin.co/zcashd/) 

* Instalar la billetera: enlace al video tutorial [aquí](https://www.youtube.com/watch?v=hTKL0jPu7X0) proporcionado por los desarrolladores de la billetera Zcash.

##  Ejecutar Zcashd sobre Tor 

* Para configurar Zcashd para usar el proxy SOCKS de Tor, puedes añadir el argumento de línea de comandos -proxy al comando del daemon.

 Por ejemplo:

  $ zcashd -proxy=127.0.0.1:9050
      
Alternativamente, añade la siguiente línea al archivo zcash.conf:

  proxy=127.0.0.1:9050

Para que los cambios de configuración surtan efecto, se recomienda reiniciar zcashd.

Ten en cuenta que esto asume que se está utilizando el daemon de Tor. En caso de que se esté usando Tor Browser Bundle, reemplaza 9050 por 9150.

Además, puedes añadir el argumento de línea de comandos -listenonion para hacer que el daemon genere una dirección .onion en la que tu nodo pueda ser alcanzado.
