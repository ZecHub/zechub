<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Nodos de Lightwallet

## TL;DR

* La mayoría de las personas usa Zcash mediante una billetera ligera, que no descarga toda la blockchain. En su lugar, se comunica con un servidor que ya ha realizado ese trabajo.
* Actualmente, tres programas suelen dar servicio a las billeteras ligeras: **lightwalletd** (original, escrito en Go), **Zaino** (indexador de Rust) y ztreamer (indexador de alto rendimiento de Rust, creado por Zcash Labs, que impulsa la red pública fastz.cash).
* Tus claves nunca salen de tu dispositivo, y el servidor no puede gastar tus fondos ni leer los importes y memos de las transacciones completamente blindadas.
* Lo que el servidor puede conocer con facilidad es tu dirección IP y el momento de tu actividad: las transacciones blindadas protegen lo que ocurre en la blockchain, no tu conexión con el servidor.
* Tor elimina el identificador de IP; está disponible en las billeteras basadas en `zcash_client_backend` y, en ZODL, es una opción de Configuración avanzada.
* Puedes cambiar el servidor que usa tu billetera o ejecutar uno propio: lightwalletd, Zaino y ztreamer son de código abierto.

## Explicación principal

La mayoría de las personas usa Zcash mediante una billetera ligera, que no descarga toda la blockchain. En su lugar, se comunica con un servidor que ya ha realizado ese trabajo. Esta página explica qué son esos servidores, qué pueden y no pueden ver sobre ti, cómo enrutar tu conexión mediante Tor y cómo cambiar el servidor que utiliza tu billetera.

Actualmente, tres piezas de software suelen servir a las billeteras ligeras. **lightwalletd** es el servicio original, escrito en Go. **Zaino** es un indexador más reciente escrito en Rust, creado como parte del trabajo de descontinuación de zcashd. **ztreamer** es un indexador Rust de alto rendimiento de Zcash Labs que impulsa la red pública fastz.cash.

### Qué hace un servidor de billetera ligera

Un servidor de billetera ligera se sitúa entre tu billetera y la blockchain de Zcash, y le proporciona una vista de la red eficiente en ancho de banda. Hace tres cosas por ti.

Sirve bloques compactos. En lugar de bloques completos, envía una forma compacta que contiene únicamente lo que una billetera necesita para detectar un pago a su dirección blindada, detectar un gasto de sus notas y actualizar sus testigos.

Retransmite tus transacciones. Cuando envías, tu billetera entrega la transacción terminada al servidor, que la transmite a la red.

Responde consultas de la red, como la altura actual y la información de tarifas que necesita tu billetera.

Tu billetera sigue realizando el trabajo privado localmente. Conserva tus claves, descifra de prueba los bloques para encontrar tus notas, y crea y firma transacciones en tu dispositivo.

### Qué puede y no puede ver el servidor

Esta es la parte en la que es fácil equivocarse. Tus claves nunca salen de tu dispositivo, pero eso no significa que el servidor no aprenda nada sobre ti.

La referencia aquí es el modelo de amenazas de la aplicación de billetera [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que vale la pena leer completo si te importa este tema. Expone varios tipos de adversarios. El que importa para esta página es un adversario que puede observar el tráfico entre tu billetera e internet, y entre el servidor e internet. Quienquiera que opere el servidor se encuentra inherentemente en parte de esa posición, porque tu billetera se conecta directamente con él.

Comencemos con lo que está protegido. Frente a cada adversario del modelo, incluido uno que haya comprometido el servidor, «no puede conocer ningún material de claves criptográficas del usuario (claves de gasto, claves de visualización, frase semilla, etc.)», no puede robar tus fondos ni puede hacer que envíes fondos que no pretendías enviar. Los importes y memos dentro de transacciones completamente blindadas permanecen cifrados.

Luego está lo que no está protegido. El modelo de amenazas enumera estas debilidades conocidas frente a un adversario que observa el tráfico:

| Debilidad | Cómo |
|:--|:--|
| Saber quién eres | «El adversario conoce la dirección IP del usuario, lo que podría llevarle a la identidad real del usuario» |
| Saber aproximadamente dónde estás | Buscar tu IP «en una base de datos de geolocalización para aproximar su ubicación» |
| Saber que enviaste o recibiste una transacción blindada y cuándo | Enviar «usa más ancho de banda, lo cual es visible aunque la conexión esté cifrada». El modelo señala que el acto de enviar y recibir es visible para el propio servidor |
| Contar cuántas transacciones has realizado con el tiempo | Los mismos patrones de ancho de banda, observados durante un período más largo |
| Detectar patrones de pago recurrentes | Observar cuándo ocurre la actividad |
| Determinar si una dirección es tuya | Un adversario que ya conoce una dirección «podría enviar fondos a esa dirección y observar si hay picos de ancho de banda» de tu billetera al obtenerla |

El modelo también señala que el caso habitual supone «una relación de confianza entre el usuario y el operador del servidor lightwalletd».

Así que el resumen honesto es este. Un servidor de billetera ligera no puede gastar tu dinero, y no puede leer los importes ni los memos de tus transacciones blindadas. Lo que está bien posicionado para conocer es tu dirección IP y el momento de tu actividad, y esas dos cosas juntas pueden revelar mucho sobre una persona. Las transacciones blindadas protegen lo que sucede en la blockchain. No ocultan, por sí solas, tu conexión con el servidor.

## Visual / Analogía

Piensa en una biblioteca pública que conserva todos los periódicos jamás impresos. Un nodo completo es un lector que se lleva a casa todo el archivo. Una billetera ligera es un lector que pide al bibliotecario un resumen diario en su lugar — una hoja delgada que contiene apenas lo suficiente para detectar si algo le concierne.

El resumen está sellado: el bibliotecario lo prepara sin poder leer qué elementos te importan, y tú lo abres en casa con tu propia clave. Ese es el bloque compacto, y la apertura es el descifrado de prueba en tu dispositivo.

Pero el bibliotecario sigue viendo qué lector entró, a qué hora y qué tan grueso era el paquete que se llevó. Esa es la dirección IP y el momento — visibles desde el mostrador, por muy bien sellado que esté el sobre. Tor equivale a enviar un mensajero anónimo: el bibliotecario sigue entregando el mismo paquete, pero ya no sabe a qué casa va.

## Análisis detallado

### Enrutamiento mediante Tor

Tor rompe el vínculo entre tu dirección IP y el tráfico de tu billetera, lo que elimina el identificador más fuerte de la tabla anterior.

Existe compatibilidad en las bibliotecas de Rust sobre las que se construyen muchas billeteras Zcash. zcash_client_backend incluye un módulo Tor basado en [Arti](https://tpo.pages.torproject.net/core/arti/), la implementación de Rust de Tor, por lo que una billetera puede enrutar la sincronización, la transmisión de transacciones y las consultas de precios mediante Tor sin incluir un cliente Tor independiente.

Los desarrolladores de Zaino plantean el mismo argumento, citando directamente el modelo de amenazas: existe «una necesidad de utilizar protocolos de transporte anónimos (como Nym o Tor) para ocultar las identidades de los clientes frente a los servidores de indexación de Zcash».

En **ZODL**, Tor es una opción de Configuración avanzada. Las notas de lanzamiento de la billetera indican a los usuarios el modo de conexión manual «más habilitar Tor en Configuración avanzada» si «prefieren reducir la exposición de metadatos», y la aplicación ofrece activar Tor antes de restaurar una billetera, que es el momento en que una IP nueva, de otro modo, se asociaría a todo el historial de una billetera.

Dos advertencias. Tor oculta tu IP del servidor, pero no cambia lo que el servidor aprende de las solicitudes que realizas. Y el enrutamiento onion añade latencia, por lo que la sincronización tarda más. Ejecutar tu propio servidor evita la cuestión de confianza de otra forma, ya que entonces tú eres el operador.

### Zaino, el indexador Rust

[Zaino](/zcash-tech/zaino) es un indexador escrito en Rust por el equipo de Zingo, creado para reemplazar lightwalletd como parte del trabajo de descontinuación de zcashd. Sirve a clientes ligeros, clientes completos y exploradores de bloques, leyendo datos de la red almacenados por «un validador completo Zebra o zcashd».

Está en desarrollo activo, con la versión 0.10.1 publicada en septiembre de 2026. Su objetivo es mantener la compatibilidad hacia atrás con lightwalletd cuando sea posible, para que las billeteras puedan apuntar a él sin tener que reescribirse.

Zaino tiene su propia página con diagramas de arquitectura, por lo que esta página solo cubre su función como servidor de billetera ligera.

### ztreamer y fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) es un indexador Zcash de alto rendimiento y un servidor de billeteras ligeras escrito en Rust por Zcash Labs. Está diseñado para ofrecer baja latencia y un alto rendimiento, y es la base de la red pública de indexadores [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) (anunciada el 19 de noviembre de 2026).

fastz.cash ejecuta servidores edge regionales (actualmente en Frankfurt, Londres, Virginia, Oregón, São Paulo, Singapur y Osaka). Cada región tiene su propio nodo completo y un índice local de ztreamer. TLS termina en el nodo. La mediana medida del tiempo hasta la primera respuesta de una llamada GetLatestBlock fue de aproximadamente 35 ms en todo el mundo. Se informa que la sincronización por rangos de bloques es hasta ~3× más rápida que con lightwalletd recientes, con un índice de tamaño reducido (~18 GB) que facilita la incorporación de más ubicaciones edge.

Estado y endpoint más cercano: [status.fastz.cash](https://status.fastz.cash).

**Nota de privacidad:** fastz.cash también ejecuta el servicio wallet-pir de Valar Group. Los usuarios de Vizor ya pueden usarlo para realizar consultas de sincronización privadas que reducen los metadatos que el servidor obtiene sobre las notas o los rangos solicitados. Esta capa adicional de privacidad se suma al modelo de amenazas habitual de las billeteras ligeras descrito arriba; no sustituye a Tor ni a la elección del operador.

ztreamer es de código abierto y puede ejecutarse de forma independiente (en un nodo integrado Zakura o en modo remoto). Al igual que lightwalletd y Zaino, ofrece el protocolo de billetera ligera a través de gRPC. Está en desarrollo activo y se plantea tanto como infraestructura de producción como entorno de pruebas para futuras mejoras del protocolo de billetera ligera.

### Ejecutar el tuyo propio

La opción más sólida es operar tu propio servidor, lo que elimina por completo la cuestión de la confianza. Los tres servidores son de código abierto: [lightwalletd](https://github.com/zcash/lightwalletd) en Go, [Zaino](https://github.com/zingolabs/zaino) en Rust y [ztreamer](https://github.com/zcashlabs/ztreamer) en Rust. Leen datos de un validador completo, así que también necesitarás [Zebra](/zcash-tech/zebra-full-node) o Zakura. Los servidores zec.rocks se implementan con [Zcash Stack](/guides/zcash-stack), un chart de Helm de código abierto y un kit de Compose Docker que ejecuta Zebra y lightwalletd juntos.

## Implicaciones prácticas

### Lista de servidores

El panel de [hosh.zec.rocks](https://hosh.zec.rocks/zec) hace seguimiento de los servidores públicos y su estado, y permite comprobar cuáles están funcionando realmente. [status.zec.rocks](https://status.zec.rocks/) muestra el estado del servicio. Para la red fastz.cash, consulta [status.fastz.cash](https://status.fastz.cash).

Servidores enumerados en ese panel al momento de escribir:

| Servidor | Notas |
|:--|:--|
| zec.rocks:443 | Los endpoints regionales aparecen junto a este en na.zec.rocks, eu.zec.rocks, ap.zec.rocks y sa.zec.rocks |
| zec-node.cakewallet.com:443 | En el dominio de Cake Wallet |
| zec.0xrpc.io:443 | Lo gestiona 0xRPC, que ofrece endpoints públicos gratuitos para varias redes y solicita donaciones para cubrir la capacidad |
| zaino.unsafe.zec.rocks:443 | Una instancia de Zaino. Ten en cuenta el nombre de host y considérala experimental |
| testnet.zec.rocks:443 | Testnet, con una instancia de testnet de Zaino en zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Red pública de ztreamer de Zcash Labs. Consulta status.fastz.cash para ver los endpoints regionales y el estado. |

Consulta los paneles en lugar de confiar en esta lista. Los operadores aparecen y desaparecen, y una página como esta queda desactualizada.

### Cambiar el servidor en tu billetera

Vale la pena hacerlo si quieres elegir un operador en quien confíes, distribuir la actividad entre operadores o apuntar al tuyo propio.

Las rutas de menú siguientes eran correctas cuando se actualizó esta página, pero las interfaces de las billeteras cambian, así que tómalas como una pista y no como una ruta exacta. Busca Configuración avanzada o una opción de servidor.

#### ZODL

Anteriormente Zashi. El engranaje de la esquina superior derecha y luego Configuración avanzada. Tor está en la misma pantalla. ZODL también ofrece un acceso directo para cambiar de servidor cuando un fallo de sincronización se debe a que el servidor está desactualizado.

#### Zkool

El sucesor de Ywallet, del mismo desarrollador (Ywallet ya no recibe mantenimiento y no puede seguir la red después de Ironwood). El icono de engranaje (Abrir configuración) en la parte superior de la pantalla de cuentas y luego el campo Servidor de nodo ligero. El botón de lista que aparece junto a él permite elegir entre los servidores conocidos, y el selector Directo / Tor / Nym / Proxy que aparece debajo establece cómo se conecta la billetera.

#### Zingo

El menú de hamburguesa de la esquina superior izquierda, luego Configuración y después desplázate hacia abajo.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

El menú de hamburguesa de la esquina superior izquierda, luego Configuración y después Avanzado.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Esas capturas de pantalla se tomaron en marzo de 2025, y las aplicaciones han publicado versiones desde entonces, por lo que los botones pueden haberse movido.

## Errores comunes

**Pensar que el servidor puede leer tus transacciones**. No puede. Tus claves permanecen en tu dispositivo, y los importes y memos dentro de transacciones completamente blindadas permanecen cifrados — incluso frente a un adversario que haya comprometido el servidor.

**Interpretar «blindado» como «conexión anónima»**. Las transacciones blindadas protegen lo que sucede en la blockchain. Tu dirección IP y el momento de tu actividad son una capa distinta, y esa capa es exactamente lo que ve el servidor.

**Suponer que Tor elimina todo rastro**. Tor oculta tu IP del servidor, pero no cambia lo que el servidor aprende de las solicitudes que realizas, y añade latencia a la sincronización.

**Confiar en una lista de servidores en una página wiki**. Los operadores van y vienen. Consulta [hosh.zec.rocks](https://hosh.zec.rocks/zec) y [status.fastz.cash](https://status.fastz.cash) para saber qué está funcionando realmente antes de conectar tu billetera a cualquier servicio.

## Resumen

Las billeteras ligeras te ofrecen el pool blindado sin el espacio de disco, lo que es un buen intercambio. Solo ten claro qué estás intercambiando. El servidor no puede tomar tus fondos ni leer tus importes blindados, pero está bien posicionado para ver tu dirección IP y cuándo realizas transacciones. Enruta mediante Tor, elige deliberadamente a tu operador o ejecuta el tuyo propio.

## Páginas relacionadas

- [Quién Puede Ver Tu Pago de Zcash ](/start-here/who-can-see-your-zcash-payment) — una explicación para principiantes de la misma pregunta.
- [Qué Puede Ver un Explorador de Bloques](/zcash-tech/what-a-block-explorer-can-see) — qué es visible on-chain, frente a lo que se ve en el servidor.
- [Zaino](/zcash-tech/zaino) — diagramas de arquitectura y el papel más amplio del indexador Rust.
- [Zinder](/zcash-tech/zinder) — el indexador alfa de Zcash Foundation, que presta servicio a billeteras ligeras mediante un adaptador compatible con lightwalletd.
- [Zebra Nodo Completo](/zcash-tech/zebra-full-node) — el validador del que lee el servidor de una billetera ligera.
- [Zcash Sincronización de la Billetera](/zcash-tech/zcash-wallet-syncing) — cómo procesa tu billetera los bloques compactos que envía un servidor.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — indexador de alto rendimiento Rust utilizado por la red fastz.cash.

**Última actualización:** noviembre de 2026
