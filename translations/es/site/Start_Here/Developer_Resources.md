<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para desarrolladores

Los recursos que necesitas para desarrollar sobre Zcash, agrupados según para qué sirve cada uno en lugar de listados todos juntos.

La pila cambió muchísimo en 2026. zcashd, que ejecutó la red durante la mayor parte de su historia, llegó a su fin de vida el 18 de julio de 2026 en la altura de bloque 3417100, y todos los nodos sin modificar se apagaron en esa altura y se negarán a reiniciarse. Las guías escritas para zcashd ahora son historia más que un punto de partida, así que esta página está organizada en torno a lo que lo reemplazó.

## La pila de un vistazo

| Capa | Qué usar | Empezar con |
|:--|:--|:--|
| Nodo completo | Zebra o Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet de nodo completo | Zallet, en beta | [The Zallet Book](https://zcash.github.io/zallet/) |
| Servidor de wallet ligera | Zaino o lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas de wallet | Los crates de librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Móvil | SDK de Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificación | Especificación del protocolo y ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nodos

Un nodo valida el consenso y mantiene la cadena. Hay dos implementaciones en desarrollo activo.

[Zebra](/zcash-tech/zebra-full-node) es el nodo de Zcash Foundation, escrito en Rust, y es el que la mayoría de las guías ahora asumen. [The Zebra Book](https://zebra.zfnd.org/) cubre su instalación y ejecución, y el [repositorio](https://github.com/ZcashFoundation/zebra) es donde ocurre el desarrollo.

[Zakura](/zcash-tech/zakura-node) es un nodo más nuevo, descrito por sus autores como un "consensus-compatible Zcash full node, built for scale", con sincronización más rápida, poda de bloques y un modo de compatibilidad con zcashd. Está liderado por Sean Bowe, cofundador de Zcash, y Dev Ojha. Es de código abierto bajo Apache 2.0 en [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub tiene una página de [Nodos completos](/zcash-tech/full-nodes) que cubre las compensaciones entre ellos.

## La wallet de nodo completo

zcashd incluía una wallet junto con el nodo. Esa wallet ya no existe, y [Zallet](https://github.com/zcash/zallet) es su reemplazo. The Zallet Book la describe como "a full-node Zcash wallet written in Rust" que está "built as a replacement for the zcashd wallet".

Lee la advertencia de seguridad antes de depender de ella. Zallet está en beta, "has not been fully reviewed", pueden ocurrir cambios incompatibles "may occur at any time, requiring you to delete and recreate your Zallet wallet", y todavía no se han portado todos los métodos RPC de zcashd.

Si estás migrando una configuración existente, ZecHub tiene una [guía de migración de zcashd a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) y una [referencia rápida de Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de wallet ligera

La mayoría de las wallets no ejecutan un nodo. Se conectan a un servidor que mantiene la cadena y les devuelve una vista compacta de ella.

[lightwalletd](https://github.com/zcash/lightwalletd) es el servicio original, escrito en Go, descrito como "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain". [Zaino](/zcash-tech/zaino) es el indexador más nuevo, escrito en Rust, y lee desde un validador completo en lugar de mantener su propia copia de la cadena.

La documentación de [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) cubre el protocolo en sí. La página de [Nodos de wallet ligera](/zcash-tech/lightwallet-nodes) cubre qué pueden y qué no pueden ver estos servidores sobre un usuario, algo que conviene entender antes de elegir uno.

## Crear una wallet

La mayor parte del trabajo de wallet ocurre en los crates de Rust bajo [librustzcash](https://github.com/zcash/librustzcash), sobre los que se construyen los SDK móviles y varias wallets de escritorio. Cada crate está documentado en [docs.rs](https://docs.rs).

| Crate | Para qué sirve |
|:--|:--|
| zcash_client_backend | "APIs for creating shielded Zcash light clients", incluyendo sincronización y construcción de transacciones |
| zcash_client_sqlite | "An SQLite-based Zcash light client", la capa de almacenamiento para lo anterior |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", usado para firmas con hardware y múltiples dispositivos |
| zip321 | URI de solicitudes de pago, como se especifica en ZIP 321 |

Para móvil, el [SDK de Android](https://github.com/zcash/zcash-android-wallet-sdk) y el [SDK de iOS](https://github.com/zcash/zcash-swift-wallet-sdk) envuelven esas bibliotecas. El repositorio de iOS antes se llamaba ZcashLightClientKit, por lo que los enlaces y artículos más antiguos usan ese nombre.

## Especificación y criptografía

La [especificación del protocolo](https://zips.z.cash/protocol/protocol.pdf) es la autoridad sobre cómo funciona Zcash, incluidas las [codificaciones de direcciones y claves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Los [ZIPs](https://zips.z.cash) son donde se proponen y especifican los cambios, y el índice muestra cuáles son borradores y cuáles son finales. Los cambios de consenso se publican en network upgrades, y ZecHub los sigue en la página de [Network Upgrades](/start-here/network-upgrades).

Para la criptografía subyacente, lee [The halo2 Book](https://zcash.github.io/halo2/index.html) y [The Orchard Book](https://zcash.github.io/orchard/), junto con la documentación de los crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) y [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) cubre las firmas de umbral, y ZecHub tiene una página sobre [FROST](/zcash-tech/frost).

## Testnet

Testnet es una cadena separada con monedas sin valor, llamadas TAZ. Tanto Zebra como Zakura pueden ejecutarse en ella, y la [guía de testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) cubre la configuración del nodo.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) es un explorador de bloques funcional de testnet, con su contraparte de mainnet en [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Conseguir TAZ es la parte incómoda. Los faucets públicos aparecen y desaparecen, y los enlazados desde documentación antigua no respondían cuando se escribió esta página. La vía fiable es preguntar en el Discord de Zcash R&D, que es lo que sugiere la propia documentación de Zcash.

## Documentación general

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) sigue siendo la fuente única más amplia, y cubre conceptos del protocolo, integración y minería. Léela con algo de cuidado. Está versionada respecto a zcashd, por lo que partes de ella describen un nodo que ya no funciona, mientras que las secciones de protocolo y cliente ligero siguen siendo útiles. [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que se encuentra allí, vale la pena leerlo antes de diseñar cualquier cosa que toque la privacidad del usuario.

Si eres nuevo en blockchain en general, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) es la recomendación habitual para los fundamentos compartidos, y se puede leer completo gratis. No cubre transacciones blindadas.

## Otras herramientas que desarrolladores han mencionado

[Arti](https://docs.rs/arti/latest/arti/) es la implementación de Tor en Rust, utilizada por zcash_client_backend para enrutar el tráfico de wallet. [Tailscale](https://github.com/tailscale/tailscale) aparece para conectarse a un nodo que ejecutas tú mismo. [warp2](https://github.com/hhanh00/warp2) es una implementación de sincronización rápida de Hanh, aunque no se actualiza desde 2023.

## Comunidad y eventos

El [Discord de Zcash R&D](https://discord.gg/6AK7keWFaK) es donde se discute el desarrollo del protocolo y de wallets, y el [Foro de la Comunidad Zcash](https://forum.zcashcommunity.com/) contiene propuestas más largas e hilos de soporte.

Los resultados recientes de hackathons dan una buena idea de lo que la gente está construyendo: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) y el [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos retirados

Se mantienen porque artículos antiguos enlazan a ellos, y porque siguen siendo la referencia de cómo se comportaba el nodo retirado. No empieces aquí.

[The Zcashd Book](https://zcash.github.io/zcash/) y la [referencia RPC de zcashd](https://zcash.github.io/rpc/) documentan software que llegó a su [fin de vida](https://zcash.github.io/zcash/user/end-of-life.html) en julio de 2026. El repositorio [zcash/zcash](https://github.com/zcash/zcash) está archivado.

Si tienes un recurso que añadir, o ves aquí algo que se haya quedado desactualizado, abre un issue o un pull request. Los equipos no siempre tienen capacidad para mantener todo al día, y señalar con qué te encontraste ayuda a orientar las guías.

**Última actualización:** agosto de 2026
