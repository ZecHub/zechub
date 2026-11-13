# Zcash Biblioteca [Library]

Un glosario completo de términos, conceptos y recursos clave relacionados con Zcash. Esta es la biblioteca única para buscar términos de notas de lanzamiento, hilos de foros o registros de cambios de billeteras [wallet changelogs].

### Navegación rápida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Término | Definición |
|------|-----------|
| Actions | En lugar de crear varias pruebas [proofs] individuales para cada gasto [Spend] y salida [Output], el protocolo Orchard las fusiona en una única Acción [Action]. |
| Addresses | Zcash tiene direcciones blindadas [Shielded] (zaddr) y transparentes [Transparent] (taddr). Las direcciones unificadas [Unified addresses] (UA) agrupan varios tipos de receptores para que una billetera remitente pueda elegir el mejor compatible con ambas partes. Se especifican en [ZIP 316](https://zips.z.cash/zip-0316). [Direcciones unificadas](/zcash-tech/unified-addresses) |
| Arborist Call | Una llamada quincenal que cubre las actualizaciones del desarrollo del protocolo y la investigación de Zcash. Se celebra en el Foro comunitario de Zcash y Discord. [Notas de la reunión](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Anuncios del foro](https://forum.zcashcommunity.com) |
| Auto-shielding | Permite a los usuarios, más específicamente a sus billeteras, mover automáticamente fondos desde una dirección transparente al pool blindado ZEC más reciente. |

## B

| Término | Definición |
|------|-----------|
| Benchmarking | Los mineros pueden enviar métricas sobre la eficiencia de diversos hardware utilizados para minar Zcash. [Ver aquí](https://zcashbenchmarks.info) |
| Block | Un bloque es un registro en la blockchain Zcash que contiene un conjunto de transacciones enviadas en la red. Aproximadamente cada 75 segundos, en promedio, se añade un nuevo bloque a la blockchain. |
| Block Explorer | Una herramienta en línea para ver todas las transacciones, pasadas y actuales, en la blockchain. [Zcash Explorador de bloques](https://zcashexplorer.app/) |
| Blogs | Blog de [ZODL (anteriormente Electric Coin Co)](https://zodl.com/blog/) / Blog de [Zcash Foundation](https://zfnd.org/blog/) / Boletín de [ZecHub](https://zechub.substack.com/) |
| Blossom | La 3.ª actualización principal de red para Zcash. [Más información](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Término | Definición |
|------|-----------|
| Canopy | La 5.ª actualización principal de red para Zcash. [Más información](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Permite a quien se compromete comprometerse con un polinomio mediante una cadena corta que puede ser utilizada por un verificador para confirmar las evaluaciones declaradas del polinomio comprometido. Es útil para reducir los costes de comunicación en el protocolo Zcash. |
| Community | [El foro comunitario oficial de Zcash](https://forum.zcashcommunity.com) / Comunidad de [Zcash Discord](https://discord.com/channels/669694001464737815/669694001921654794) / I+D de [Zcash Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Un diseño híbrido de consenso propuesto que ejecutaría proof of stake junto con el proof of work existente de Zcash. Shielded Labs dirige el trabajo y mantiene un prototipo en el repositorio `zebra-crosslink`. Crosslink no forma parte de Zcash actualmente. [Crosslink protocolo](/zcash-tech/crosslink-protocol) |
| CrossPay | Una función de la billetera ZODL que permite gastar ZEC blindado mientras el destinatario recibe el pago en el activo y la cadena que prefiera, encaminado mediante NEAR Intents en vez de un exchange centralizado. |
| Cypherpunk Zero | Un universo creativo y esfuerzo colaborativo entre ECC, el ilustrador Stranger Wolf, Mighty Jaxx y socios seleccionados del ecosistema. [Redes sociales de Cypherpunk Zero](https://x.com/cypherpunkZero) / Colección de [OpenSea](https://opensea.io/collection/cypherpunk-zero) |

## D

| Término | Definición |
|------|-----------|
| DeFi | Proyectos que integran ZEC con DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Se refiere a una transacción enviada desde una zaddr (dirección blindada) a una taddr (dirección transparente). El origen de la transacción no es visible; sin embargo, los fondos entran en un pool de valor visible públicamente. |
| Developer Resources | [Recursos para desarrolladores](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentación oficial](https://zcash.readthedocs.io/en/latest/) |

## E

| Término | Definición |
|------|-----------|
| ECC | Electric Coin Company, el equipo que lanzó el protocolo Zcash, conocido anteriormente como la empresa Zcash. Todo su equipo de ingeniería dimitió en enero de 2026 tras una disputa de gobernanza con la junta de Bootstrap, y posteriormente formó ZODL. |
| ECDSA | El algoritmo de firma digital de curva elíptica es un esquema de firma digital criptográficamente seguro. El algoritmo de firma/verificación ECDSA se basa en la multiplicación de puntos de curva elíptica. |
| Education | Videos orientados al aprendizaje que explican Zcash [aquí](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Un campo adicional para transacciones enviadas a direcciones blindadas que es visible para el destinatario de un pago. El memo cifrado solo es visible para el remitente y el destinatario. |
| Equihash | El algoritmo de minado proof-of-work orientado a la memoria que se utiliza en Zcash. |
| Events | El calendario de eventos relacionados con Zcash puede verse en [Luma](https://luma.com/zcash) y [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Lista de exchanges compatibles con Zcash](https://z.cash/exchanges/) |

## F

| Término | Definición |
|------|-----------|
| Fiat-Shamir | Una técnica para tomar una prueba interactiva de conocimiento y crear una firma digital basada en ella. De esta manera, un hecho, por ejemplo el conocimiento de un secreto, puede demostrarse públicamente sin revelar la información subyacente. |
| Formal Verification | Demostrar matemáticamente que un sistema se comporta exactamente como se especifica, en lugar de depender únicamente de pruebas. El circuito Action de Ironwood fue verificado de esta manera por colaboradores de zkSecurity y ZODL mediante el demostrador de teoremas Lean, para demostrar la ausencia de errores de solidez. |
| Founders Reward | La recompensa de los fundadores representa el 20 por ciento de la recompensa total por bloque, se deduce del valor de cada bloque y se distribuye de forma transparente para impulsar el desarrollo y crecimiento del protocolo. |
| Free2Z | Una herramienta para contenido anónimo y donaciones privadas impulsada por Zcash. [Free2Z](https://free2z.com) |
| FROST | Esquema de firma de umbral Schnorr flexible y optimizado por rondas. [Artículo de investigación](https://eprint.iacr.org/2020/852) |

## G

| Término | Definición |
|------|-----------|
| Governance | Las decisiones del proceso ZIP se incorporan a la especificación Zcash, así como al software que ejecuta la red. Los cambios se ratifican on-chain cuando la mayoría de la red adopta la actualización y no rompe el consenso. [Historial completo del protocolo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Término | Definición |
|------|-----------|
| Halo | Permite actualizaciones de circuitos sin necesidad de configuraciones confiables, lo que hace que el protocolo blindado Zcash sea más ágil para futuras mejoras y extensiones. [Explicación técnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Las billeteras deterministas jerárquicas generan una serie de pares de claves a partir de una semilla, proporcionando comodidad y facilidad de gestión, además de seguridad de alto nivel. |
| Heartwood | La 4.ª actualización principal de red de Zcash. [Más información](https://z.cash/upgrade/heartwood/) |

## I

| Término | Definición |
|------|-----------|
| Index | El índice ZCX de CoinDesk representa una cotización al contado en tiempo real equivalente en USD para Zcash. [Índice de precios](https://www.coindesk.com/indices/zcx/) |
| Integrations | Puedes aceptar pagos de Zcash mediante varios proveedores externos. [Procesadores de pagos](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Una máquina abstracta que modela la computación como el intercambio de mensajes entre dos partes: un demostrador y un verificador. |
| Investment | Hay varias opciones financieras disponibles para inversores institucionales u oficinas familiares que quieran obtener exposición a Zcash. [Lista completa](https://z.cash/investors/) |
| Ironwood | Actualización de red NU6.3, activa en mainnet desde el bloque 3.428.143 el 28 de julio de 2026. Ironwood añade un nuevo pool blindado construido sobre el circuito corregido Orchard y sella el pool original Orchard, para que cualquiera pueda comprobar que el suministro circulante es íntegro. Sus reglas de consenso se especifican en [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Término | Definición |
|------|-----------|
| JubJub | Una curva elíptica diseñada para poder implementarse eficientemente en circuitos zk-SNARK. |

## K

| Término | Definición |
|------|-----------|
| Keystone Wallet | Una hardware wallet aislada de la red con soporte nativo para Zcash (blindado Orchard), compatible con ZODL para firma en frío. [Keystone](https://keyst.one) |

## L

| Término | Definición |
|------|-----------|
| Layer-1 | Se refiere a una red base y su infraestructura subyacente. Las blockchains de capa 1 pueden validar y finalizar transacciones sin necesidad de otra red. Zcash es una blockchain L1. |
| librustzcash | Un espacio de trabajo Rust que contiene todos los crates y dependencias para trabajar con Zcash. [repositorio](https://github.com/zcash/librustzcash) |
| lightwalletd | Un servidor sin estado que proporciona a clientes ligeros información de blockchain. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Término | Definición |
|------|-----------|
| Metrics | Las métricas de la red están disponibles [aquí](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Datos que se generan junto con una transacción del usuario de Zcash. Esto puede incluir la altura del bloque, la versión de la transacción o la altura de expiración, etc. |
| Mobile SDK | Un SDK ligero que conecta Android con Zcash, permitiendo a aplicaciones externas de Android enviar y recibir transacciones blindadas. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | El proceso en el que, para cada bloque, los nodos de la red Zcash compiten realizando cálculos matemáticos complejos para encontrar una solución basada en una dificultad que se ajusta automáticamente. [Guía](https://z.cash/mining-zcash/) |
| Multisignature | Una dirección que requiere las firmas de varias claves privadas para gastar fondos. Actualmente, la funcionalidad multisig solo es compatible con direcciones transparentes. |

## N

| Término | Definición |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Una propuesta de Shielded Labs para quemar una parte de las tarifas de transacción, de modo que el presupuesto de seguridad a largo plazo del protocolo no dependa por completo de la emisión. Se especifica en ZIP 234 y está en revisión en 2026. |
| Nighthawk | Una billetera móvil para Zcash. [Sitio web](https://nighthawkwallet.com) |
| Noir Wallet | Una billetera de extensión de navegador Zcash compatible con Zcash Community Grants, creada para conectar ZEC blindado directamente con aplicaciones de navegador en vez de depender de códigos QR y transferencias manuales. [zknoir.com](https://www.zknoir.com/) |
| NU5 | La 6.ª actualización principal de red para Zcash, que introduce el pool blindado Orchard y las direcciones unificadas. [Más información](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | La 7.ª actualización principal de red para Zcash, que ajusta la subvención de bloque para financiar el programa Zcash Community Grants y el Deferred Dev Fund Lockbox. Se activó a finales de 2024. [Más información](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | La actualización de red posterior a Ironwood, prevista para mainnet el 5 de noviembre de 2026. Según [ZIP 259](https://zips.z.cash/zip-0259), incorpora bloques de 25 segundos (ZIP 218), el Mecanismo de sostenibilidad de la red con reciclaje de tarifas (ZIPs 235 y 237) y el fin de las transacciones de versión 4, lo que deja los fondos Sprout imposibles de gastar (ZIP 2003). No añade ningún formato de transacción nuevo; Tachyon y los Shielded Assets de Zcash no forman parte de ella. |

## O

| Término | Definición |
|------|-----------|
| Oblivious Synchronization | Un método en desarrollo en el proyecto Tachyon que permite a una billetera solicitar los datos que necesita de un servidor no confiable sin revelar sobre qué notas está preguntando. El servidor nunca conoce tus anuladores, porque el protocolo hace que evolucionen de una forma invinculable. [Documento explicativo](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | El pool blindado introducido en NU5. Ironwood lo selló tras descubrirse un error de solidez, por lo que ya no puedes enviar ni recibir dentro de Orchard. Los fondos solo salen mediante el turnstile. [Pools blindados](/using-zcash/shielded-pools) |
| Overwinter | La 1.ª actualización de red para Zcash. [Más información](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Término | Definición |
|------|-----------|
| Payments | Es posible utilizar Zcash para compras cotidianas mediante varios proveedores de pago diferentes. [Aplicaciones de pago](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Una primitiva en la que los datos viajan junto a una prueba de su propia corrección, de modo que combinar los datos también combina las pruebas. El proyecto Tachyon reconstruye el protocolo blindado en torno a PCD, permitiendo que cada billetera lleve una prueba recursiva de que su propio saldo es correcto en vez de volver a escanear la red. La implementación Zcash es [Ragu](https://github.com/tachyon-zcash/ragu), que sigue Halo y no necesita una configuración confiable. |
| Peer-to-Peer Network | Las redes P2P se basan en el concepto de descentralización. Son la arquitectura fundamental de la tecnología blockchain. |
| PIR (Private Information Retrieval) | Técnicas que te permiten obtener un registro de un servidor sin que este sepa qué registro solicitaste. Está bajo investigación activa para Zcash como una forma de que las billeteras ligeras recuperen lo que necesitan sin filtrar lo que buscan. |
| Podcast | [Radiolab (ceremonia Zcash)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Término | Definición |
|------|-----------|
| QR Code | Un código legible por máquina utilizado para codificar direcciones Zcash para facilitar su escaneo. Las direcciones unificadas (UA) normalmente se comparten mediante códigos QR en las billeteras Zcash modernas. |
| Quantum Recoverability | Una propiedad de las notas Ironwood, especificada en [ZIP 2005](https://zips.z.cash/zip-2005), que mantiene recuperable el registro on-chain de una moneda si una futura computadora cuántica rompe la criptografía que la protege hoy. Es una vía de recuperación en lugar de resistencia cuántica, y se aplica a las notas Ironwood, no a los fondos existentes Sprout, Sapling o Orchard. |

## R

| Término | Definición |
|------|-----------|
| Recovery Phrase | Una secuencia de 12 o 24 letras y números utilizada para respaldar y restaurar una billetera. En Zcash, esta frase regenera las claves de gasto y de visualización, lo que la hace fundamental para la recuperación y seguridad de los fondos. |

## S

| Término | Definición |
|------|-----------|
| Sapling | Una importante actualización de red que introdujo mejoras significativas de eficiencia para las transacciones blindadas y allanó el camino para la adopción móvil. Se activó en el bloque 419200. |
| Selective Disclosure | Permite al propietario de una dirección blindada compartir selectivamente claves de visualización o divulgaciones de pago con terceros, mientras mantiene los datos privados para todos los demás. |
| Shielded Address | También llamada zaddr. Comienza con z. Oculta el remitente, el destinatario, el importe y el memo mediante zk-SNARKs. |
| Shielded Labs | Una organización independiente que trabaja en la economía y el consenso del protocolo Zcash. Actualmente lidera Crosslink y el Mecanismo de Sostenibilidad de la Red. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Una transacción exclusivamente entre direcciones blindadas. Totalmente privada en la blockchain. |
| Sol/s | Soluciones por segundo: mide el rendimiento de minado de Equihash. |
| Spending Key | La clave privada que permite gastar desde una dirección blindada (también permite ver el saldo y el historial). |
| Sprout | La versión original del protocolo blindado de Zcash (lanzada en 2016). |

## T

| Término | Definición |
|------|-----------|
| Tachyon | El programa de escalabilidad de Zcash. No forma parte de NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) y no tiene fecha de activación. Aleja a las billeteras del escaneo de cada bloque hacia un estado de billetera con pruebas, sincronización inconsciente y estado de nodo podable, con el objetivo de alcanzar un rendimiento blindado de miles de transacciones por segundo. [Sitio del proyecto](https://tachyon.z.cash/overview/) |
| TAZ | Zcash de testnet (moneda de prueba sin valor). |
| Testnet | Una blockchain separada para probar actualizaciones y características antes de mainnet. |
| Trailing Finality Layer (TFL) | Investigación sobre añadir una capa de finalidad detrás de la cadena de prueba de trabajo de Zcash para que los bloques recientes puedan finalizarse sin reemplazar el minado. Crosslink es el diseño que surgió de ello. |
| Transaction | Un pago entre usuarios, enviado a la red y finalmente confirmado en un bloque. |
| Transaction Expiry | Un límite de altura de bloque [block-height] para determinar cuándo puede incluirse un pago sin minar. Un pago ordinario con una altura de caducidad distinta de cero N puede minarse en el bloque N o antes, pero no en N+1. Una altura de 0 desactiva la caducidad. Esto no es un temporizador de reembolso automático. [ZIP 203](https://zips.z.cash/zip-0203) |
| Transaction Fee | La tarifa predeterminada es de 0,0001 ZEC. Las tarifas más altas reciben prioridad; las tarifas muy bajas pueden causar retrasos o caducidad. |
| Transparent Address | También llamada taddr. Comienza con t. Totalmente pública (como Bitcoin). |
| Transparent Transaction | Una transacción exclusivamente entre direcciones transparentes: todo es visible públicamente. |
| Turnstile | La regla contable que rastrea cuánto valor entra y sale de cada pool, de modo que ningún pool pueda liberar más de lo que ingresó en él. Se utiliza en cada transición de pool en la historia de Zcash y actualmente protege la migración de Orchard a Ironwood. [Más información](/zcash-tech/the-turnstile) |

## U

| Término | Definición |
|------|-----------|
| Unified Address | Formato de dirección moderno (introducido en NU5) que funciona tanto para pagos transparentes como blindados en una sola cadena. |
| Upgrade Activation | La altura específica de bloque en la que una actualización de red (p. ej., NU5, NU6) se activa automáticamente. |

## V

| Término | Definición |
|------|-----------|
| Viewing Key | Una clave privada que permite ver el saldo y el historial de transacciones de una dirección blindada sin poder gastar los fondos. |

## W

| Término | Definición |
|------|-----------|
| Wallet | Software o hardware que almacena claves privadas y permite enviar/recibir ZEC. Entre las billeteras activas se incluyen ZODL (iOS/Android), Zingo! (móvil/escritorio), Nighthawk (Android), Zkool (móvil/escritorio), Zallet (próximamente) y Keystone (hardware). Para ver una lista completa, consulta [Zcash Billeteras del ecosistema](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | El primer SDK JavaScript para Zcash, creado por ChainSafe para entornos de navegador. Sustenta el snap Shielded Wallet de Zcash que llevó ZEC blindado a MetaMask. |

## X

| Término | Definición |
|------|-----------|
| XZC | Un símbolo de ticker antiguo para Zcash utilizado en algunos exchanges heredados. El ticker oficial es ZEC. |

## Y

| Término | Definición |
|------|-----------|
| YWallet | Una billetera Zcash centrada en la privacidad que admite direcciones Orchard, Sapling y transparentes, conocida por su sincronización rápida. Ya no recibe mantenimiento: su desarrollador ha confirmado que no se actualizará para Ironwood, por lo que ya no puede seguir la red. Zkool, del mismo desarrollador, es la sucesora mantenida. |

## Z

| Término | Definición |
|------|-----------|
| Zcash | Criptomoneda centrada en la privacidad que utiliza zk-SNARKs. Conecta pagos transparentes (al estilo Bitcoin) y totalmente blindados. |
| Zcash Foundation | Organización sin fines de lucro independiente que respalda el ecosistema Zcash, financia el desarrollo y promueve la privacidad. |
| Zcash Network | Red peer-to-peer de nodos que valida transacciones y mantiene la blockchain. |
| ZEC | El código de moneda oficial para Zcash (algunos exchanges todavía muestran XZC). |
| Z3 stack | Los tres programas que juntos reemplazan zcashd: Zebra para el nodo, Zaino para la indexación, Zallet para la billetera. [Pila Z3](/zcash-tech/z3-stack) |
| Zerocash | El protocolo académico (2014) en el que se basa Zcash. |
| Zaino | Un indexador que sirve datos de billetera desde un nodo Zebra, escrito en Rust por Zingo Labs. Asume el trabajo de indexación que zcashd solía realizar para las billeteras ligeras. [Zaino](/zcash-tech/zaino) |
| Zakura | Un nodo completo Zcash separado, creado para la escalabilidad y liderado por Sean Bowe y Dev Ojha. Se sincroniza más rápido, poda bloques de forma nativa y puede ejecutar zcashd sobre sí mismo para software que todavía depende de él. [Zakura nodo](/zcash-tech/zakura-node) |
| Zallet | La billetera que reemplaza la billetera zcashd. Mueve una `wallet.dat` existente en lugar de empezar de nuevo. [Zallet](/zcash-tech/zallet) y la referencia rápida de [Zallet](/using-zcash/zallet-quick-reference-guide) |
| Zebra | El nodo completo que reemplaza zcashd, mantenido por Zcash Foundation. Ejecútalo si necesitas un nodo de validación. [Zebra nodo completo](/zcash-tech/zebra-full-node) |
| zcashd | El nodo completo y billetera originales de Zcash, ahora retirados. La versión 6.20.0 se apagó en el bloque 3417100 el 18 de julio de 2026 y nunca admitió NU6.3. Ejecuta la pila Z3 o Zakura en su lugar. [Guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Propuesta de mejora de Zcash: el proceso de gobernanza comunitaria utilizado para proponer y ratificar cambios de protocolo. [ZIP Repositorio](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. La organización independiente fundada a principios de 2026 por Josh Swihart y el antiguo equipo de ingeniería de Electric Coin Company después de que renunciaran debido a una disputa de gobernanza con Bootstrap. Recaudó más de 25 millones de dólares en financiación inicial en marzo de 2026 y mantiene la billetera ZODL, que pasó a llamarse desde Zashi en febrero de 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Argumentos de conocimiento sucintos no interactivos de zero-knowledge: la criptografía que impulsa las transacciones blindadas de Zcash. Permite demostrar una afirmación (p. ej., un gasto válido) sin revelar ninguna información secreta. |
| ZSA (Zcash Shielded Assets) | Tokens emitidos por usuarios que heredan la privacidad blindada de Zcash, permitiendo que activos distintos de ZEC se muevan de forma privada por la red. Especificados en [ZIP 226](https://zips.z.cash/zip-0226). No forman parte de NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) y no tienen fecha de activación. |

---

**Última actualización:** Octubre de 2026
**¿Quieres contribuir?** [Edita esta página en GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
