# FROST & Claves de visualización: informe de investigación sobre interoperabilidad entre Zcash y Dash

*Preparado para ZecHub · Revisado el 27 de septiembre de 2026 · Todas las afirmaciones tienen fuentes incluidas*

## Resumen ejecutivo

ZecHub planteó esta pregunta tras añadir DASH blindado como opción de donación de la wiki: ¿podrían las claves de visualización al estilo de Zcash, o las firmas de umbral de FROST, trasladarse a Dash?

La investigación replanteó la cuestión. Las claves de visualización no son una pregunta abierta: Dash incorporó el grupo blindado [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) a su cadena Evolution, y la jerarquía de claves de Orchard incluye claves de visualización por diseño. La [hoja de ruta](https://www.dash.org/roadmap/) de Dash las posiciona para la divulgación a auditores y el cumplimiento de la Travel Rule. Esa mitad está desplegada, no es hipotética.

**FROST es donde se encuentra la verdadera brecha.** Dash ya ejecuta firmas de umbral BLS mediante [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), pero estas sirven al consenso a nivel de red: ChainLocks y InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) apunta a algo diferente: autorización de gasto por umbral sobre una sola cuenta blindada mantenida por un pequeño grupo de titulares de claves individuales. Las dos no son intercambiables. Y dado que ZIP 312 sigue siendo **Draft**, no existe una implementación de referencia en ninguna de las dos cadenas que se pueda portar, por lo que sería un trabajo novedoso independientemente de qué lado lo construyera.

---

## Cronología: por qué esta comparación es inusual en este momento

Dos acontecimientos relativos a grupos blindados ocurrieron con semanas de diferencia a mediados de 2026.

**Zcash abandonó Orchard.** El investigador Taylor Hornby reveló una vulnerabilidad de circuito en Orchard que podía explotarse para inflar el suministro de manera indetectable. Zcash respondió activando **Ironwood (NU6.3)** el **28 de julio de 2026**, introduciendo un nuevo grupo blindado con un mecanismo de migración de turnstile.

**Dash se pasó a Orchard.** Dash anunció el plan el [19 de febrero de 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"Esperamos poder lanzar pronto transferencias blindadas, naturalmente pendientes de auditorías de seguridad y una revisión adicional del código."* La [hoja de ruta](https://www.dash.org/roadmap/) de Dash registra los saldos blindados como **completados en julio de 2026** con Dash Platform **v4.0**, y Dash publicó [*"Las transacciones blindadas están activas en la red principal de Dash Evolution"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) el **4 de agosto de 2026**.

> **Una nota sobre el orden.** Algunas coberturas situaron la activación de la red principal de Dash el 17 de julio de 2026, lo que la colocaría antes que Ironwood. Esa fecha parece remontarse a informes de prensa sobre el anuncio, no a una activación. En las propias fuentes de Dash, la función se completó en julio y se anunció como activa el 4 de agosto, después de Ironwood. Las dos cadenas se cruzaron en cuestión de pocas semanas; el orden exacto depende de qué hito se cuente, y este informe no afirma ninguno.

Fundamentalmente, Dash no heredó el error. Su anuncio es explícito: *"implementamos la versión de Orchard sin un error de inflación conocido. La versión anterior contenía un error que podía explotarse para inflar de forma indetectable el suministro de Zcash."*

Así que Dash ejecuta ahora una bifurcación corregida de la criptografía de la que Zcash se ha alejado en la capa base, mientras que el grupo de próxima generación de Zcash (Ironwood) y el esquema de autorización de gasto de próxima generación (FROST) están, respectivamente, recién activos y aún en Draft.

---

## Claves de visualización: desplegadas, no una brecha de investigación

El grupo blindado de Dash es [Orchard](https://zips.z.cash/zip-0224), construido sobre Halo 2 zk-SNARKs sin requerir una configuración de confianza. La jerarquía de claves de Orchard siempre ha incluido Full Viewing Keys e Incoming Viewing Keys como parte de su diseño, no como un añadido; por tanto, la capacidad llegó con el código, no como un port que alguna de las cadenas tuviera que negociar.

La hoja de ruta de Dash expresa directamente la intención:

> *"A diferencia de los sistemas de privacidad obligatoria que han enfrentado exclusiones de exchanges y fricción regulatoria, los saldos blindados admiten divulgación selectiva mediante claves de visualización, lo que permite a usuarios y empresas compartir detalles de transacciones con auditores o cumplir los requisitos de la Travel Rule cuando sea necesario, sin comprometer la privacidad para el uso cotidiano."*

Dos observaciones que vale la pena registrar:

**Dash está posicionando las claves de visualización en torno a un caso de uso de producción más concreto que el que han alcanzado las propias herramientas de Zcash.** Las herramientas de divulgación de pagos de Zcash han permanecido en gran medida experimentales y opcionales entre wallets. Dash está lanzando claves de visualización como función de cumplimiento con casos de uso concretos, en una cadena que también ofrece una liquidación determinista de aproximadamente un segundo y una sincronización de wallet de alrededor de veinte segundos, según su propio anuncio.

**El elemento abierto es la divergencia de compatibilidad, no la capacidad.** Vale la pena seguir si la implementación de claves de visualización de Dash mantiene la compatibilidad de formato con el formato de claves de visualización Zcash de Orchard a medida que ambas cadenas evolucionan independientemente. Es una cuestión de seguimiento, más que un proyecto de investigación.

---

## Derivación de claves: comparación entre Zcash y Dash

Esta sección aborda directamente la pregunta del revisor. La respuesta breve es que los árboles de claves *blindadas* son casi idénticos porque el código es compartido; las diferencias significativas están en cómo cada cadena **enraíza** ese árbol en el espacio de claves de su wallet, y en qué más ocupa ese espacio.

### Zcash

Zcash utiliza [ZIP 32, *Wallets blindadas jerárquicas deterministas*](https://zips.z.cash/zip-0032), que tiene estado **Final**. En lugar de situar las claves blindadas dentro de un único árbol BIP 32, ZIP 32 proporciona a cada grupo blindado su propia clave maestra y su propia ruta:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` se fija en `32'` (0x80000020) según BIP 43, y `coin_type` sigue SLIP 44, con todas las redes de prueba compartiendo el índice `1`.

Dentro de una cuenta de Orchard, la jerarquía es estrictamente unidireccional: cada nivel puede derivar todo lo que está por debajo y nada de lo que está por encima:

| Clave | Puede hacer | Deriva |
|---|---|---|
| Spending key | Gastar notas | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autorizar gastos | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Ver pagos entrantes **y** salientes | IVK, OVK |
| Incoming Viewing Key | Ver solo pagos entrantes | Direcciones diversificadas |
| Outgoing Viewing Key | Recuperar detalles de pagos salientes | — |
| Diversified address | Recibir | — |

Orchard simplificó esto respecto a Sapling: según el [Orchard Book](https://zcash.github.io/orchard/design/keys.html), se eliminó la clave privada de nulificador `nsk`, `nk` se convirtió en un elemento de campo en lugar de un punto de curva y `ovk` se deriva ahora de la clave de visualización completa en vez de mantenerse por separado.

Por encima se encuentra [ZIP 316, *Direcciones unificadas y claves de visualización unificadas*](https://zips.z.cash/zip-0316) — Revisión 0 Active, Revisión 1 Withdrawn, Revisión 2 Draft — que agrupa las claves por grupo en una **Full Viewing Key unificada** ("combina múltiples elementos Full Viewing Key…") y una **Incoming Viewing Key unificada**. La distinción que un desarrollador de wallets debe respetar: una UFVK revela actividad tanto entrante como saliente; una UIVK, solo entrante.

### Dash

Dash enraíza todo en un árbol BIP 32 convencional, con el tipo de moneda SLIP 44 `5'`, y añade dos extensiones de derivación propias.

[DIP-0009, *Rutas de derivación de funcionalidades*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) inserta un nivel de **funcionalidad** que particiona el espacio de claves según una función específica de la moneda:

```
m / purpose' / coin_type' / feature' / *
```

con `purpose` fijado en `9'` (0x80000009) y `coin_type` en `5'` (0x80000005). La motivación declarada del DIP es el aislamiento: *"puede ser deseable mantener fondos mezclados en una ruta aislada de fondos no mezclados."*

[DIP-0014, *Derivación de claves extendidas utilizando enteros sin signo de 256 bits*](https://github.com/dashpay/dips/blob/master/dip-0014.md) va más allá, eliminando el límite de índices de 31 bits de BIP 32 para que los componentes de ruta puedan transportar valores completos de 256 bits. Eso permite rutas derivadas de identidades como:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

donde los dos últimos componentes son hashes de identidad de usuario. Zcash no tiene equivalente: ZIP 32 no contempla derivar una ruta de claves de la identidad de otra parte.

### Dónde difieren realmente las dos

**El subárbol blindado es el mismo.** Las claves blindadas de Dash son claves Orchard, porque el grupo blindado de Dash es Orchard. Un desarrollador de wallets que se mueve entre ambas trabaja con la misma estructura de clave de gasto a clave de visualización.

**El enraizamiento difiere.** Zcash aísla cada grupo blindado bajo su propia clave maestra con el propósito `32'`. Dash cuelga la funcionalidad blindada de un árbol unificado bajo el propósito `9'`, junto a todas las demás funcionalidades. La separación de Zcash es por grupo criptográfico; la de Dash, por funcionalidad de producto.

**El espacio de claves de Dash contiene algo que el de Zcash no: un dominio BLS independiente.** Las claves de operadores de masternodes, las claves de votación y las claves de quórum utilizadas por LLMQs son claves BLS, no claves de la familia Schnorr, y se encuentran completamente fuera del árbol BIP 32 descrito anteriormente. Aquí es precisamente donde reside la firma de umbral existente de Dash, y precisamente por qué no se compone con la autorización de gasto de Orchard, como expone la siguiente sección.

**La derivación vinculada a identidades es exclusiva de Dash.** Las rutas de 256 bits de DIP-0014 existen para derivar claves de relaciones entre identidades. Es un concepto de Dash Platform sin equivalente en Zcash, y constituye el caso más claro de que ambos esquemas de derivación divergieron intencionadamente, no por accidente.

*Véase la Figura 1 para los dos esquemas de enraizamiento que convergen en un subárbol compartido Orchard.*

---

## FROST: la cuestión verdaderamente abierta

Dash dispone de un sistema maduro de firmas de umbral en **LLMQs basados en BLS** (Long-Living Masternode Quorums), utilizados para ChainLocks, InstantSend y el consenso de validadores de Dash Platform.

[ZIP 312, *FROST para multifirmas de autorización de gasto*](https://zips.z.cash/zip-0312), con estado **Draft**, hace otra cosa. Convierte en umbrales las firmas de autorización de gasto basadas en Schnorr ya definidas por Sapling y Orchard — **RedJubjub** y **RedPallas**, respectivamente — para que, en el propio planteamiento de ZIP, *"los usuarios y servicios de terceros que comparten la custodia de una wallet, o un grupo de personas que gestiona fondos compartidos"* puedan exigir aprobación por umbral, como 2 de 3, antes de un gasto. Se clasifica como un ZIP de **Wallet**: produce firmas compatibles con la autorización de gasto existente, en vez de cambiar el consenso. Conserva un rol de Coordinador, que ZIP explícitamente rechaza eliminar, y analiza tanto la generación de claves por un distribuidor de confianza como la generación distribuida de claves.

La distinción importante, y la razón por la que no son sustitutos:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Esquema de firma | BLS | Schnorr — RedJubjub / RedPallas |
| Quién firma | Un quórum de masternodes | Un pequeño grupo de titulares de claves individuales |
| Qué se autoriza | Un hecho de red: un bloqueo de bloque, un bloqueo de transacción | Un gasto desde una cuenta blindada |
| Capa | Consenso | Wallet |
| Espacio de claves | Dominio BLS independiente | La clave de autorización de gasto Orchard/Sapling |
| Estado | Desplegado | Draft, sin implementación de referencia |

Que Dash tenga firmas de umbral BLS **no** significa que tenga, o necesite, FROST. Pero sí significa que los ingenieros de Dash poseen experiencia interna con firmas de umbral, generación distribuida de claves y coordinación de quórums; experiencia genuinamente transferible si eligieran construir esto.

*Véase la Figura 2 para saber qué firma realmente cada esquema.*

### Lo que requeriría FROST en la bifurcación Orchard de Dash, en una primera aproximación

1. **Una ceremonia de DKG y firma de FROST sobre RedPallas**, el esquema de autorización de gasto de Orchard: una variante de Schnorr sobre la curva Pallas. Esto es independiente de la DKG BLS existente de Dash para LLMQs y no puede reducirse a ella.
2. **Soporte de wallet y UX para la firma multipartita de una sola cuenta blindada**, que es un patrón de interacción distinto de las herramientas de quórum de masternodes y requiere un equivalente de Coordinador.
3. **Una decisión sobre la capa.** Lo más probable es que sea solo a nivel de wallet, ya que ZIP 312 se delimita como un esquema de wallet sobre primitivas existentes, no como un cambio de consenso; pero esto debe confirmarse específicamente frente a la bifurcación Orchard de Dash, no asumirse a partir de la delimitación de Zcash.

---

## Recomendación

**Claves de visualización: documentar, no investigar.** La capacidad está disponible en ambas cadenas. Una breve nota de wiki que registre que el grupo blindado de Dash incluye claves de visualización y enlace la hoja de ruta de Dash evita que la audiencia de ZecHub suponga que sigue siendo hipotética. Seguir la compatibilidad del formato a medida que ambas cadenas evolucionan.

**FROST: oportunidad real, bloqueada aguas arriba.** Depende de que ZIP 312 alcance una implementación de referencia, o de que Dash decida desarrollarla en paralelo. ZecHub no puede acelerarlo directamente.

**El siguiente paso de mayor valor es una conversación, no más investigación documental.** Las personas que lo construirían son accesibles. Shielded Labs está impulsando ZIP 312; el equipo de ingeniería de Dash ya ha respondido positivamente al enfoque de "tomado de Zcash" en torno a la integración de Orchard. Un hilo entre comunidades que conecte a ambas revelaría más que otra ronda de lectura, y este informe ha alcanzado el límite de lo que las fuentes públicas pueden resolver.

---

## Figuras

**Figura 1 — Enraizamiento de derivación de claves: Zcash ZIP 32 y Dash DIP-0009/0014, convergiendo en un subárbol compartido Orchard.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figura 2 — Lo que firma cada esquema de umbral: un quórum de masternodes que certifica un hecho de red, frente a un grupo de titulares de claves que autoriza un gasto blindado.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Fuentes

**Zcash — protocolo**
- [ZIP 32: Wallets blindadas jerárquicas deterministas](https://zips.z.cash/zip-0032) — estado Final
- [ZIP 224: Protocolo blindado Orchard](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST para multifirmas de autorización de gasto](https://zips.z.cash/zip-0312) — estado Draft
- [ZIP 316: Direcciones unificadas y claves de visualización unificadas](https://zips.z.cash/zip-0316)
- [The Orchard Book — Claves y direcciones](https://zcash.github.io/orchard/design/keys.html)
- [Especificación del protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) — componentes de clave, §5.6.4

**Dash — protocolo y anuncios**
- [Las transacciones blindadas están activas en la red principal de Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 de agosto de 2026
- [Dash añade transacciones blindadas a Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 de febrero de 2026
- [Hoja de ruta de Dash](https://www.dash.org/roadmap/) — Saldos blindados, completados en julio de 2026, Platform v4.0; actualizada el 12 de septiembre de 2026
- [DIP-0009: Rutas de derivación de funcionalidades](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Derivación de claves extendidas utilizando enteros sin signo de 256 bits](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentación de Dash Core — Quórums de masternodes (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [repositorio dashpay/dips](https://github.com/dashpay/dips)

**Informes contemporáneos**
- [Dash lanza la tecnología Zcash de Orchard en una mejora de privacidad](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash incorpora la privacidad Zcash de Orchard a la cadena Evolution para transacciones blindadas](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Fuentes comprobadas el 27 de septiembre de 2026. Dash Platform y ZIP 312 están ambos en evolución; las figuras y los estados deben verificarse de nuevo antes de volver a publicar.*
