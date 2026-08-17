<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Nodos de Lightwallet de Zcash

## Introducción

La mayoría de las personas usan Zcash a través de una light wallet, que no descarga toda la blockchain. En su lugar, se comunica con un servidor que ya ha hecho ese trabajo. Esta página explica qué son esos servidores, qué pueden y no pueden ver sobre ti, cómo enrutar tu conexión a través de Tor y cómo cambiar el servidor que usa tu wallet.

Hoy en día, dos piezas de software dan servicio a las light wallets. **lightwalletd** es el servicio original, escrito en Go. **Zaino** es un indexador más reciente escrito en Rust, desarrollado como parte del trabajo de deprecación de zcashd.

## Qué hace un servidor de light wallet

Un servidor de light wallet se sitúa entre tu wallet y la blockchain de Zcash y le ofrece una vista de la cadena eficiente en ancho de banda. Hace tres cosas por ti.

Sirve bloques compactos. En lugar de bloques completos, envía una forma compacta que contiene solo lo que una wallet necesita para detectar un pago a su dirección shielded, detectar un gasto de sus notas y actualizar sus witnesses.

Retransmite tus transacciones. Cuando envías, tu wallet entrega la transacción terminada al servidor, que la difunde a la red.

Responde consultas sobre la cadena, como la altura actual y la información de comisiones que tu wallet necesita.

Tu wallet sigue haciendo el trabajo privado localmente. Guarda tus claves, prueba a descifrar bloques para encontrar tus notas y construye y firma transacciones en tu dispositivo.

## Qué puede y qué no puede ver el servidor

Esta es la parte en la que es fácil equivocarse. Tus claves nunca salen de tu dispositivo, pero eso no significa que el servidor no aprenda nada sobre ti.

La referencia aquí es el [modelo de amenazas de la app wallet de Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que merece la pena leer completo si esto te importa. Expone varios tipos de adversario. El que importa para esta página es un adversario que puede observar el tráfico entre tu wallet e internet, y entre el servidor e internet. Quienquiera que opere el servidor está inherentemente en parte de esa posición, porque tu wallet se conecta a él directamente.

Empecemos por lo que está protegido. Frente a cualquier adversario del modelo, incluido uno que haya comprometido el servidor, este "no puede aprender nada del material criptográfico de claves del usuario (claves de gasto, Viewing Keys, seed phrase, etc.)", no puede robar tus fondos y no puede hacer que envíes fondos que no pretendías enviar. Las cantidades y memos dentro de transacciones completamente shielded permanecen cifrados.

Luego está lo que no está protegido. El modelo de amenazas enumera estas debilidades conocidas frente a un adversario que observa el tráfico:

| Debilidad | Cómo |
|:--|:--|
| Saber quién eres | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| Saber aproximadamente dónde estás | Buscar tu IP "in a geolocation database to approximate their location" |
| Saber que enviaste o recibiste una transacción shielded, y cuándo ocurrió | Enviar "uses more bandwidth, which is visible even though the connection is encrypted". El modelo señala que el propio servidor puede ver el acto de enviar y recibir |
| Contar cuántas transacciones has hecho a lo largo del tiempo | Los mismos patrones de ancho de banda, observados durante un periodo más largo |
| Detectar patrones de pago recurrentes | Observar cuándo ocurre la actividad |
| Determinar si una dirección es tuya | Un adversario que ya conoce una dirección "could send funds to that address and watch to see if there are bandwidth spikes" cuando tu wallet la obtiene |

El modelo también señala que el caso ordinario asume "a trust relationship between the user and the lightwalletd server operator".

Así que el resumen honesto es este. Un servidor de light wallet no puede gastar tu dinero y no puede leer las cantidades ni los memos de tus transacciones shielded. Lo que sí está bien situado para aprender es tu dirección IP y el momento de tu actividad, y esas dos cosas juntas pueden decir mucho sobre una persona. Las transacciones shielded protegen lo que entra en la blockchain. No ocultan, por sí solas, tu conexión con el servidor.

## Enrutamiento a través de Tor

Tor rompe el vínculo entre tu dirección IP y el tráfico de tu wallet, lo que elimina el identificador más fuerte de la tabla anterior.

Existe soporte en las librerías de Rust sobre las que se construyen muchas wallets de Zcash. zcash_client_backend incluye un módulo Tor basado en [Arti](https://tpo.pages.torproject.net/core/arti/), la implementación de Tor en Rust, de modo que una wallet puede enrutar la sincronización, la difusión de transacciones y las consultas de precios a través de Tor sin incluir un cliente Tor independiente.

Los desarrolladores de Zaino plantean el mismo argumento, citando directamente el modelo de amenazas: existe "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers".

En **ZODL**, Tor es un ajuste dentro de Advanced Settings. Las notas de la versión de la wallet remiten a los usuarios al modo de conexión manual "plus enabling Tor in Advanced Settings" si "prefer to reduce metadata exposure", y la app ofrece activar Tor antes de restaurar una wallet, que es el momento en que una IP nueva podría quedar vinculada a todo el historial de una wallet.

Dos advertencias. Tor oculta tu IP al servidor, pero no cambia lo que el servidor aprende de las solicitudes que haces. Y el onion routing añade latencia, por lo que la sincronización tarda más. Ejecutar tu propio servidor evita la cuestión de la confianza de otra forma, ya que entonces el operador eres tú.

## Zaino, el indexador en Rust

[Zaino](/site/Zcash_Tech/Zaino) es un indexador escrito en Rust por el equipo de Zingo, creado para sustituir a lightwalletd como parte del trabajo de deprecación de zcashd. Da servicio a clientes ligeros, clientes completos y exploradores de bloques, leyendo datos de la cadena alojados por "either a Zebra or Zcashd full validator".

Está en desarrollo activo, con la versión 0.7.0 lanzada en agosto de 2026. Su objetivo es seguir siendo compatible hacia atrás con lightwalletd siempre que sea posible, para que las wallets puedan apuntar a él sin necesidad de ser reescritas.

Zaino tiene su propia página con diagramas de arquitectura, así que esta página solo cubre su papel como servidor de light wallet.

## Lista de servidores

El panel de [hosh.zec.rocks](https://hosh.zec.rocks/zec) rastrea los servidores públicos y su estado, y es el lugar donde comprobar qué está realmente activo. [status.zec.rocks](https://status.zec.rocks/) muestra el estado de los servicios.

Servidores listados en ese panel en el momento de redactar esto:

| Servidor | Notas |
|:--|:--|
| zec.rocks:443 | Los endpoints regionales aparecen junto a este en na.zec.rocks, eu.zec.rocks, ap.zec.rocks y sa.zec.rocks |
| zec-node.cakewallet.com:443 | En el dominio de Cake Wallet |
| zec.0xrpc.io:443 | Operado por 0xRPC, que ofrece endpoints públicos gratuitos para varias cadenas y pide donaciones para cubrir la capacidad |
| zaino.unsafe.zec.rocks:443 | Una instancia de Zaino. Observa el hostname y trátalo como experimental |
| testnet.zec.rocks:443 | Testnet, con una instancia testnet de Zaino listada en zaino.testnet.unsafe.zec.rocks |

Comprueba el panel en lugar de confiar en esta lista. Los operadores van y vienen, y una página como esta envejece.

## Cambiar el servidor en tu wallet

Vale la pena hacerlo si quieres elegir un operador en quien confíes, repartir la actividad entre varios operadores o apuntar al tuyo propio.

Las rutas de menú que aparecen abajo eran correctas cuando se actualizó esta página, pero las interfaces de las wallets cambian, así que tómalas como una orientación y no como una ruta exacta. Busca Advanced Settings o una opción de servidor.

#### ZODL

Antes Zashi. El engranaje de la esquina superior derecha, luego Advanced Settings. Tor está en la misma pantalla. ZODL también ofrece un acceso directo a Switch server cuando un fallo de sincronización está causado por un servidor desactualizado.

#### Ywallet

El engranaje de la esquina superior derecha, luego la pestaña Zcash.

![Configuración del servidor de Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

El menú hamburguesa de la esquina superior izquierda, luego Settings, y después desplázate hacia abajo.

![Configuración del servidor de Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

El menú hamburguesa de la esquina superior izquierda, luego Settings, y después Advanced.

![Configuración del servidor de eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Esas capturas de pantalla se tomaron en marzo de 2025 y desde entonces las apps han publicado nuevas versiones, así que puede que los botones hayan cambiado de sitio.

## Ejecutar el tuyo propio

La opción más fuerte es ser tu propio operador, lo que elimina por completo la cuestión de la confianza. Ambos servidores son open source: [lightwalletd](https://github.com/zcash/lightwalletd) en Go y [Zaino](https://github.com/zingolabs/zaino) en Rust. Ambos leen desde un validador completo, así que también querrás [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Resumen

Las light wallets te dan acceso al pool shielded sin exigir espacio en disco, lo cual es un buen intercambio. Solo hay que tener claro qué estás intercambiando. El servidor no puede quedarse con tus fondos ni leer tus cantidades shielded, pero está en una buena posición para ver tu dirección IP y cuándo realizas transacciones. Enruta a través de Tor, elige deliberadamente a tu operador o ejecuta el tuyo propio.

**Última actualización:** Agosto de 2026
