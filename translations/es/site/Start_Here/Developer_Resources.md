<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para desarrolladores

Los recursos que necesitas para desarrollar sobre Zcash, agrupados según el propósito de cada uno en lugar de enumerados en un solo montón.

El stack cambió considerablemente en 2026. zcashd, que operó la red durante la mayor parte de su historia, llegó al final de su vida útil el 18 de julio de 2026 a la altura de bloque 3417100, y todos los nodos sin modificar se apagaron a esa altura y se negarán a reiniciarse. Las guías escritas para zcashd son ahora historia en lugar de un punto de partida, por lo que esta página está organizada en torno a lo que lo reemplazó.

## El stack de un vistazo

| Capa | Qué usar | Comienza con |
|:--|:--|:--|
| Nodo completo | Zebra o Zakura | [El libro de Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet de nodo completo | Zallet, en beta | [El libro de Zallet](https://zcash.github.io/zallet/) |
| Servidor de wallet ligera | Zaino o lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas de wallet | Los crates de librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Móvil | SDK para Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificación | Especificación del protocolo y ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nodos

Un nodo valida el consenso y almacena la cadena. Hay dos implementaciones en desarrollo activo.

[Zebra](/zcash-tech/zebra-full-node) es el nodo de Zcash Foundation, escrito en Rust, y es el que la mayoría de las guías asumen ahora. [El libro de Zebra](https://zebra.zfnd.org/) explica cómo instalarlo y ejecutarlo, y el [repositorio](https://github.com/ZcashFoundation/zebra) es donde tiene lugar el desarrollo.

[Zakura](/zcash-tech/zakura-node) es un nodo más reciente, descrito por sus autores como un "nodo completo de Zcash compatible con el consenso, creado para escalar", con sincronización más rápida, poda de bloques y un modo de compatibilidad con zcashd. Está liderado por Sean Bowe, cofundador de Zcash, y Dev Ojha. Es de código abierto bajo Apache 2.0 en [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub tiene una página de [Nodos completos](/zcash-tech/full-nodes) que cubre las ventajas y desventajas entre ellos.

## La wallet de nodo completo

zcashd incluía una wallet con el nodo. Esa wallet ya no existe, y [Zallet](https://github.com/zcash/zallet) es su reemplazo. El libro de Zallet lo describe como "una wallet de Zcash de nodo completo escrita en Rust" que está "siendo creada como reemplazo de la wallet de zcashd".

Lee la advertencia de seguridad antes de depender de ella. Zallet está en beta, "no ha sido revisada por completo", pueden ocurrir cambios incompatibles "en cualquier momento, que requerirán que elimines y recrees tu wallet Zallet", y todavía no se ha migrado cada método RPC de zcashd.

Si estás migrando una configuración existente, ZecHub tiene una [guía de migración de zcashd a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) y una [referencia rápida de Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de wallets ligeras

La mayoría de las wallets no ejecutan un nodo. Se comunican con un servidor que conserva la cadena y devuelve una vista compacta de ella.

[lightwalletd](https://github.com/zcash/lightwalletd) es el servicio original, escrito en Go, descrito como "un servicio de backend que proporciona una interfaz eficiente en ancho de banda para la blockchain de Zcash". [Zaino](/zcash-tech/zaino) es el indexador más reciente, escrito en Rust, y lee desde un validador completo en lugar de mantener su propia copia de la cadena.

La documentación del [Protocolo de cliente ligero](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) cubre el protocolo en sí. La página de [Nodos Lightwallet](/zcash-tech/lightwallet-nodes) explica qué pueden y qué no pueden ver estos servidores sobre un usuario, algo que vale la pena entender antes de elegir uno.

## Crear una wallet

La mayor parte del trabajo con wallets ocurre en los crates de Rust bajo [librustzcash](https://github.com/zcash/librustzcash), sobre los que se construyen los SDK móviles y varias wallets de escritorio. Cada crate está documentado en [docs.rs](https://docs.rs).

| Crate | Para qué sirve |
|:--|:--|
| zcash_client_backend | "APIs para crear clientes ligeros blindados de Zcash", incluida la sincronización y la construcción de transacciones |
| zcash_client_sqlite | "Un cliente ligero de Zcash basado en SQLite", la capa de almacenamiento para el anterior |
| zcash_keys | "Gestión de claves y direcciones de Zcash" |
| zcash_primitives | "Implementaciones en Rust de las primitivas de Zcash" |
| zcash_protocol | "Constantes de red y tipos de valor del protocolo Zcash" |
| orchard | "El protocolo de transacciones blindadas Orchard" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Herramientas para trabajar con transacciones de Zcash parcialmente creadas", utilizadas para firmas de hardware y de múltiples dispositivos |
| zip321 | URI de solicitudes de pago, según se especifica en ZIP 321 |

Para móviles, el [SDK de Android](https://github.com/zcash/zcash-android-wallet-sdk) y el [SDK de iOS](https://github.com/zcash/zcash-swift-wallet-sdk) envuelven esas bibliotecas. El repositorio de iOS se llamaba anteriormente ZcashLightClientKit, por lo que los enlaces y artículos más antiguos usan ese nombre.

## Especificación y criptografía

La [especificación del protocolo](https://zips.z.cash/protocol/protocol.pdf) es la autoridad sobre cómo funciona Zcash, incluidas las [codificaciones de direcciones y claves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Los [ZIPs](https://zips.z.cash) son donde se proponen y especifican los cambios, y el índice muestra cuáles son borradores y cuáles son definitivos. Los cambios de consenso se publican en actualizaciones de red, y ZecHub realiza su seguimiento en la página de [Actualizaciones de red](/start-here/network-upgrades).

Para la criptografía subyacente, lee [El libro de halo2](https://zcash.github.io/halo2/index.html) y [El libro de Orchard](https://zcash.github.io/orchard/), junto con la documentación de los crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) y [orchard](https://docs.rs/orchard/latest/orchard/). [El libro de FROST](https://frost.zfnd.org/) cubre las firmas de umbral, y ZecHub tiene una página de [FROST](/zcash-tech/frost).

## Red de prueba

La red de prueba es una cadena separada con monedas sin valor, llamadas TAZ. Tanto Zebra como Zakura pueden ejecutarse contra ella, y la [guía de red de prueba](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) cubre la configuración de nodos.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) es un explorador de bloques de red de prueba funcional, con una contraparte de red principal en [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obtener TAZ es la parte incómoda. Los faucets públicos aparecen y desaparecen, y los enlazados desde documentación más antigua no respondían cuando se escribió esta página. La vía fiable es preguntar en el Discord de I+D de Zcash, que es lo que su propia documentación sugiere.

## Documentación general

[Documentación de Zcash](https://zcash.readthedocs.io/en/latest/) sigue siendo la fuente única más amplia, y cubre conceptos del protocolo, integración y minería. Léela con cierto cuidado. Está versionada respecto a zcashd, por lo que partes de ella describen un nodo que ya no funciona, mientras que las secciones de protocolo y cliente ligero siguen siendo útiles. El [modelo de amenazas de la aplicación de wallet de Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) que se encuentra allí vale la pena leerlo antes de diseñar cualquier cosa que afecte la privacidad de los usuarios.

Si eres nuevo en las blockchains en general, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) es la recomendación habitual para los fundamentos compartidos y puede leerse gratuitamente en su totalidad. No cubre las transacciones blindadas.

## Otras herramientas que han mencionado los desarrolladores

[Arti](https://docs.rs/arti/latest/arti/) es la implementación en Rust de Tor, utilizada por zcash_client_backend para enrutar el tráfico de wallets. [Tailscale](https://github.com/tailscale/tailscale) surge para conectarse a un nodo que ejecutas tú mismo. [warp2](https://github.com/hhanh00/warp2) es una implementación de sincronización rápida de Hanh, aunque no se ha actualizado desde 2023.

## Comunidad y eventos

El [Discord de I+D de Zcash](https://discord.gg/6AK7keWFaK) es donde se discute el desarrollo de protocolos y wallets, y el [Foro de la comunidad Zcash](https://forum.zcashcommunity.com/) contiene propuestas más extensas e hilos de soporte.

Los resultados recientes de hackatones ofrecen una buena imagen de lo que la gente está creando: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) y el [Hackathon Zypherpunk 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos retirados

Se conservan porque los artículos más antiguos enlazan a ellos y porque siguen siendo la referencia sobre cómo se comportaba el nodo retirado. No comiences aquí.

[El libro de Zcashd](https://zcash.github.io/zcash/) y la [referencia RPC de zcashd](https://zcash.github.io/rpc/) documentan software que llegó al [final de su vida útil](https://zcash.github.io/zcash/user/end-of-life.html) en julio de 2026. El repositorio [zcash/zcash](https://github.com/zcash/zcash) está archivado.

Si tienes un recurso que añadir o detectas algo aquí que ha quedado desactualizado, abre un issue o una pull request. Los equipos no siempre tienen capacidad para mantener todo actualizado, y señalar lo que encontraste ayuda a orientar las guías.

**Última actualización:** agosto de 2026
