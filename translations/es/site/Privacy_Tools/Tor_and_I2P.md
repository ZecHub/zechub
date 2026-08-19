<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Por qué importa la privacidad

En la era digital, proteger tu [privacidad](https://www.privacyguides.org/en/) se ha vuelto cada vez más vital. Aunque algunas personas puedan ver la privacidad como una causa perdida, no lo es. Tu privacidad está en juego y debería ser una preocupación. La privacidad tiene un valor significativo porque se relaciona con el poder, y garantizar que ese poder se ejerza de manera responsable es crucial.

## Tecnologías Tor e I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) es una herramienta proxy que utiliza la red Tor para establecer conexiones para las aplicaciones. Torbot lo logra encaminando su tráfico a través de Tor, mejorando así la [privacidad y el anonimato](https://www.torproject.org/) de estas aplicaciones.

## Red I2P

La red I2P, también conocida como [Invisible Internet Project](https://geti2p.net/en/about/intro), es una red superpuesta peer-to-peer totalmente cifrada. Garantiza que el contenido, el origen y el destino de los mensajes permanezcan ocultos para los observadores. En otras palabras, nadie puede ver el origen o el destino del tráfico ni el contenido real de los mensajes que se transmiten. El cifrado utilizado en I2P garantiza un alto nivel de privacidad y anonimato para sus usuarios.

### Instalación de I2P

Hay dos implementaciones. La [Java I2P](https://geti2p.net/en/download) original funciona en Windows, macOS, Linux y Android. [i2pd](https://i2pd.website/), escrito en C++, es más ligero y suele ser la opción habitual en un servidor o en una máquina de bajos recursos.

Una vez en ejecución, I2P expone una consola local en `127.0.0.1:7657` y proxys en `127.0.0.1:4444` (HTTP) y `127.0.0.1:4447` (SOCKS). Es normal que tarde varios minutos en el primer arranque: I2P tiene que construir túneles a través de la red antes de que nada funcione, y se vuelve más rápido cuanto más tiempo permanece en línea.

### Uso de I2P con Zcash

Ten en cuenta que **ningún nodo actual de Zcash habla I2P de forma nativa.** Zebra no tiene soporte para I2P, y zcashd tampoco lo tenía. Si ves una guía que afirma ejecutar un nodo de Zcash sobre I2P, está describiendo algo que el software no hace.

Para lo que I2P sí es realmente útil aquí es para todo lo que rodea a la wallet: acceder a un sitio, un foro o un servicio sin revelar tu dirección. Para anonimizar la conexión de la wallet en sí, Tor es hoy la opción práctica, y las secciones de abajo lo cubren.

## Tor e I2P comparten características comunes, pero también tienen diferencias significativas. 

Tanto Tor como I2P son redes peer-to-peer descentralizadas y anónimas, pero I2P ofrece niveles de seguridad más altos en comparación con Tor. Sin embargo, I2P está diseñado principalmente para acceder a servicios como correo electrónico, chat y torrenting dentro de su propia red, y no puede usarse para acceder al internet convencional. Por otro lado, Tor permite a los usuarios acceder a la deep web, igual que I2P, pero también funciona como un navegador normal para acceder a sitios web en la superficie de la web.

*Nota: Para más información sobre las similitudes y diferencias entre Tor e I2P visita [aquí](https://geti2p.net/en/comparison/tor)*

## Enrutar una wallet móvil a través de Tor con Orbot

Orbot es una red privada virtual (VPN) gratuita diseñada para smartphones que dirige el tráfico de todas las aplicaciones de tu dispositivo a través de la red Tor.

Sigue estas instrucciones para enrutar una wallet de Zcash a través de Tor. Ten en cuenta que Ywallet, que usaban versiones anteriores de esta guía, ya no tiene mantenimiento y no seguirá la red después de Ironwood, así que elige una wallet con mantenimiento en la página de [Wallets](/using-zcash/wallets).

1.  Descarga e instala *Orbot* desde la tienda de aplicaciones.

2.  Después de la instalación, aparecerá un mensaje de bienvenida. Continúa hasta la página principal de *Orbot* y haz clic en *'Tor Enabled Apps'.*              

3. Esto abrirá una página en la pantalla que muestra las aplicaciones compatibles con Tor. Busca tu wallet de Zcash en la lista y asegúrate de que esté seleccionada.

4. Aparecerá una solicitud de conexión para configurar una VPN, lo que permitirá a *Orbot* supervisar el tráfico de red. *Orbot* se inicializará una vez que se haya aprobado este permiso. 

5. Revisa la barra de tareas o la página principal de Orbot para verificar que Tor esté funcionando; esto se confirma cuando veas 'Connected to the Tor network'.

*Nota: Si Tor está bloqueado por tu red móvil, puedes usar un Bridge Server como forma alternativa de conectarte.*


## Instalación de Tor en PC o escritorio

* Tor Browser puede descargarse desde el sitio web oficial; puedes acceder al enlace [aquí](https://www.torproject.org/download/).

 La forma más conveniente de instalar Tor es mediante el paquete Tor Browser Bundle. Si prefieres instalaciones sin interfaz gráfica, puedes optar por instalar el daemon de Tor por separado. 

*Nota: Por defecto, el paquete Tor Browser expone un listener SOCKS en tcp/9150 y el daemon de Tor expone el listener SOCKS en tcp/9050.*

* Consulta las [instrucciones](https://support.torproject.org/apt/) de instalación específicas para tu sistema operativo proporcionadas por el Tor Project.

## Ejecutar un nodo sobre Tor

Esta es la parte que más ha cambiado, y la respuesta honesta es que actualmente es más difícil de lo que era antes.

**zcashd ya no existe.** Llegó al final de su soporte y se detuvo el 18 de julio de 2026 en el bloque 3,417,100. No volverá a arrancar, su página de descarga devuelve un 404 y el repositorio apt ya no se sirve. Cualquier instrucción que te diga que ejecutes `zcashd -proxy=127.0.0.1:9050` ya no se aplica a nada.

**Zebra tampoco puede hacerlo todavía.** Zebra es el nodo con mantenimiento, y su crate de red sí contiene código de conexión aislada para Tor, pero la función está comentada en `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

La documentación del crate dice lo mismo de forma clara: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* La función `connect_isolated_tor` también está comentada junto con ello. Así que hoy no existe una forma compatible de ejecutar un nodo de Zcash sobre Tor.

Si necesitas anonimato a nivel de nodo ahora mismo, el enfoque funcional es poner toda la máquina detrás de Tor o de una VPN a nivel del sistema operativo, en lugar de configurar el nodo en sí. Eso protege tu ubicación de red sin depender de funciones del nodo que no están implementadas.

### Lo que todavía puedes hacer hoy

- **Enrutar tu wallet a través de Tor** con Orbot en móvil, como se describió arriba. Esta es la opción práctica para la mayoría de las personas, y oculta tu IP al servidor lightwalletd con el que habla tu wallet
- **Usar Tor Browser** para exploradores de bloques, foros y cualquier otra cosa en la que prefieras no quedar vinculado por tu dirección
- **Recuerda lo que Tor no oculta.** Anonimiza tu ubicación de red, no tu actividad on-chain. Enviar desde una dirección transparente sigue siendo público, y el valor que cruza entre pools blindados sigue publicando la cantidad. Consulta [Shielded Pools](/using-zcash/shielded-pools) para ver qué sigue siendo visible
