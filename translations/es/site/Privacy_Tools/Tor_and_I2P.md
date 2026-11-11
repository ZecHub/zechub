<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Por qué importa la privacidad

## TL;DR

- **Tor** enruta tu tráfico a través de tres relés y funciona tanto para la web normal como para los servicios onion — hoy es la opción práctica predeterminada para anonimizar las conexiones de billeteras [wallet] y la navegación
- **I2P** es una red superpuesta peer-to-peer totalmente cifrada diseñada para sus propios servicios internos; **ningún nodo [node] actual de Zcash habla I2P de forma nativa**
- **En dispositivos móviles:** enruta una billetera Zcash a través de Tor con unos pocos toques mediante Orbot («Tor Enabled Apps»)
- **Ejecutar un nodo Zcash a través de Tor no es posible ahora mismo:** `zcashd` llegó al final de su soporte el 18 de julio de 2026, y la función Tor de Zebra sigue deshabilitada en el código fuente principal
- Tor oculta *dónde estás*, no *lo que haces on-chain* — las transacciones [transactions] transparentes [transparent] siguen siendo públicas

En la era digital, proteger tu [privacidad privacy](https://www.privacyguides.org/en/) se ha vuelto cada vez más vital. Aunque algunos puedan considerar la privacidad una causa perdida, no lo es. Tu privacidad está en juego y debería ser una preocupación. La privacidad tiene un valor significativo, ya que se relaciona con el poder, y asegurar que ese poder se ejerza responsablemente es crucial.

## Tecnologías Tor e I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) es una herramienta proxy que utiliza la red Tor para establecer conexiones para las aplicaciones. Tor lo logra al enrutar su tráfico a través de Tor, mejorando así la [privacidad y el anonimato](https://www.torproject.org/) de estas aplicaciones.

## Red I2P

La red I2P, también conocida como el [Invisible Internet Project](https://geti2p.net/en/about/intro), es una red superpuesta peer-to-peer totalmente cifrada. Garantiza que el contenido, el origen y el destino de los mensajes permanezcan ocultos para los observadores. En otras palabras, nadie puede ver el origen o el destino del tráfico ni el contenido real de los mensajes transmitidos. El cifrado [encryption] utilizado en I2P garantiza un alto nivel de privacidad y anonimato para sus usuarios.

### Instalación de I2P

Hay dos implementaciones. La [Java I2P](https://geti2p.net/en/download) original funciona en Windows, macOS, Linux y Android. [i2pd](https://i2pd.website/), escrita en C++, es más ligera y es la opción habitual en un servidor o una máquina de baja potencia.

Una vez en funcionamiento, I2P expone una consola local en `127.0.0.1:7657` y proxies en `127.0.0.1:4444` (HTTP) y `127.0.0.1:4447` (SOCKS). Espera varios minutos durante el primer inicio: I2P debe construir túneles a través de la red antes de que algo funcione, y se vuelve más rápido cuanto más tiempo permanece en línea.

### Uso de I2P con Zcash

Ten en cuenta que **ningún nodo actual de Zcash habla I2P de forma nativa.** Zebra no tiene soporte para I2P, y zcashd tampoco lo tenía. Si ves una guía que afirma ejecutar un nodo Zcash a través de I2P, describe algo que el software no hace.

Aquí, I2P es realmente útil para todo lo que rodea a la billetera: acceder a un sitio, un foro o un servicio sin revelar tu dirección [address]. Para anonimizar la conexión de la propia billetera, Tor es hoy la opción práctica, y las secciones siguientes la cubren.

## Tor e I2P comparten características comunes, pero también tienen diferencias significativas. 

Tanto Tor como I2P son redes peer-to-peer descentralizadas [decentralized] y anónimas, pero I2P proporciona niveles de seguridad más altos en comparación con Tor. Sin embargo, I2P está diseñada principalmente para acceder a servicios como correo electrónico, chat y torrents dentro de su red, y no puede utilizarse para acceder a Internet normal. Por otro lado, Tor permite a los usuarios acceder a la web profunda, al igual que I2P, pero también funciona como un navegador normal para acceder a sitios web en la web superficial.

*Nota: Para obtener más información sobre las similitudes y diferencias entre Tor e I2P, visita [aquí](https://geti2p.net/en/comparison/tor)*

## Enrutamiento de una billetera móvil a través de Tor con Orbot

Orbot es una red privada virtual (VPN) gratuita diseñada para smartphones que dirige el tráfico de todas las aplicaciones de tu dispositivo a través de la red Tor.

Sigue estas instrucciones para enrutar una billetera Zcash a través de Tor. Ten en cuenta que YWallet, que utilizaban las versiones anteriores de esta guía, ya no recibe mantenimiento y no seguirá la red después de Ironwood, así que elige una billetera mantenida de la página [Billeteras](/using-zcash/wallets).

1.  Descarga e instala *Orbot* desde la tienda de aplicaciones.

2.  Después de la instalación, aparecerá un mensaje de bienvenida. Continúa a la página de inicio de *Orbot* y haz clic en *«Tor Enabled Apps».*              

3. Esto mostrará una página en pantalla con las aplicaciones compatibles con Tor. Busca tu billetera Zcash en la lista y asegúrate de que esté seleccionada.

4. Aparecerá una solicitud de conexión para configurar una VPN, que permitirá a *Orbot* supervisar el tráfico de red. *Orbot* se inicializará una vez aprobada esta autorización. 

5. Revisa la barra de tareas o la página de inicio de Orbot para verificar que Tor se esté ejecutando; esto se confirma cuando veas «Connected to the Tor network».

*Nota: Si Tor está bloqueado por tu red móvil, puedes usar un servidor puente [Bridge Server] como método alternativo para conectarte.*


## Instalación de Tor en PC o escritorio

* El navegador Tor se puede descargar desde el sitio web oficial; puedes acceder al enlace [aquí](https://download.torproject.org/).

 La forma más conveniente de instalar Tor es mediante el Browser Bundle de Tor. Si prefieres instalaciones sin interfaz gráfica, puedes optar por instalar el demonio Tor por separado. 

*Nota: De forma predeterminada, el paquete Browser de Tor expone un receptor SOCKS en tcp/9150 y el demonio Tor expone el receptor SOCKS en tcp/9050.*

* Consulta las [instrucciones](https://support.torproject.org/little-t-tor/getting-started/installing/) de instalación específicas para tu sistema operativo proporcionadas por el Proyecto Tor.

## Ejecución de un nodo a través de Tor

Esta es la parte que más ha cambiado, y la respuesta sincera es que actualmente es más difícil que antes.

**zcashd ha desaparecido.** Llegó al final de su soporte y se detuvo el 18 de julio de 2026 en el bloque [block] 3.417.100. No se reiniciará, su página de descarga devuelve un 404 y el repositorio apt ya no está disponible. Cualquier instrucción que te indique ejecutar `zcashd -proxy=127.0.0.1:9050` ya no se aplica a nada.

**Zebra tampoco puede hacerlo todavía.** Zebra es el nodo mantenido, y su crate de red contiene código de conexión aislada para Tor, pero la función está comentada en `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

La documentación del crate dice claramente lo mismo: *«Las conexiones Tor están actualmente deshabilitadas hasta que se actualice la dependencia `x25519-dalek v1.2.0` de `arti-client`».* La función `connect_isolated_tor` también está comentada junto con ella. Por lo tanto, hoy no existe una forma compatible de ejecutar un nodo Zcash a través de Tor.

Si ahora necesitas anonimato a nivel de nodo, el enfoque viable es colocar toda la máquina detrás de Tor o una VPN a nivel del sistema operativo, en lugar de configurar el propio nodo. Eso protege tu ubicación de red sin depender de funciones de nodo que no están implementadas.

### Lo que aún puedes hacer hoy

- **Enruta tu billetera a través de Tor** con Orbot en dispositivos móviles, como se describió anteriormente. Esta es la opción práctica para la mayoría de las personas y oculta tu IP del servidor lightwalletd con el que se comunica tu billetera
- **Usa el navegador Tor** para exploradores de bloques, foros y cualquier otra cosa donde prefieras no estar vinculado por dirección
- **Recuerda lo que Tor no oculta.** Anonimiza tu ubicación de red, no tu actividad on-chain. Enviar desde una dirección transparente sigue siendo público, y el valor que cruza entre pools [pool] blindados [shielded] sigue publicando la cantidad. Consulta [Pools blindados](/using-zcash/shielded-pools) para saber qué permanece visible

## Páginas relacionadas

- [VPN y DVPN](VPN_and_DVPN.md) — alternativas de VPN y cómo se comparan
- [Navegadores web](Web_Browsers.md) — fortalecimiento del navegador para la privacidad cotidiana
- [Mensajeros seguros](Secure_Messengers.md) — herramientas [tools] de comunicación privada
- [Lo que puede ver un explorador de bloques](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — lo que protege y no protege tu privacidad a nivel de nodo
- [Pools blindados](/using-zcash/shielded-pools) — lo que permanece visible on-chain incluso con anonimato de capa de red
