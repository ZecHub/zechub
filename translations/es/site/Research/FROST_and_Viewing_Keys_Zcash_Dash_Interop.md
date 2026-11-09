# FROST y Claves de visualización [Viewing Keys]: informe de investigación sobre interoperabilidad Zcash/Dash

*Preparado para ZecHub · Revisado el 27 de septiembre de 2026 · Todas las afirmaciones citadas en línea*

## Resumen ejecutivo

ZecHub planteó esta cuestión tras añadir DASH blindado [shielded] como opción de donación para la wiki: ¿podrían las claves de visualización al estilo de Zcash, o las firmas de umbral de FROST, trasladarse a Dash?

La investigación la replanteó. Las claves de visualización no son una cuestión abierta: Dash incorporó el pool [pool] blindado [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) a su red Evolution, y la jerarquía de claves de Orchard incluye claves de visualización por diseño. La [hoja de ruta](https://www.dash.org/roadmap/) propia de Dash las posiciona para la divulgación a auditores y el cumplimiento de la Regla de Viaje. Esa mitad está desplegada, no es hipotética.

**FROST es donde se encuentra la verdadera brecha.** Dash ya ejecuta firmas de umbral BLS mediante [Cuórums de Masternodes de Larga Duración](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), pero estos sirven al consenso a nivel de red: ChainLocks y InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) apunta a algo diferente: autorización de gasto por umbral sobre una única cuenta blindada en poder de un pequeño grupo de titulares de claves individuales. Los dos no son intercambiables. Y, dado que ZIP 312 continúa en estado **Borrador**, no existe una implementación de referencia en ninguna de las dos redes que se pueda portar, por lo que sería trabajo novedoso independientemente de cuál de las partes lo construyera.

---

## Cronología: por qué esta comparación es inusual ahora mismo

Dos acontecimientos relacionados con pools blindados ocurrieron con pocas semanas de diferencia a mediados de 2026.

**Zcash abandonó Orchard.** El investigador Taylor Hornby divulgó una vulnerabilidad de circuito en Orchard que podía explotarse para inflar el suministro de forma indetectable. Zcash respondió activando **Ironwood (NU6.3)** el **28 de julio de 2026**, introduciendo un nuevo pool blindado con un mecanismo de migración turnstile [turnstile].

**Dash se trasladó a Orchard.** Dash anunció el plan el [19 de febrero de 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *«Esperamos poder lanzar transferencias blindadas pronto, naturalmente pendientes de auditorías de seguridad y una revisión adicional del código».* La [hoja de ruta](https://www.dash.org/roadmap/) de Dash registra los Saldos Blindados como **completados en julio de 2026** con Dash Platform **v4.0**, y Dash publicó [*«Las transacciones blindadas están activas en la red principal de Dash Evolution»*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) el **4 de agosto de 2026**.

> **Una nota sobre el orden.** Algunas coberturas situaron la activación de la red principal de Dash el 17 de julio de 2026, lo que la colocaría antes de Ironwood. Esa fecha parece proceder de la cobertura de prensa del anuncio, más que de una activación. En las fuentes propias de Dash, la funcionalidad se completó en julio y se anunció como activa el 4 de agosto, después de Ironwood. Las dos redes se cruzaron en cuestión de semanas; el orden exacto depende del hito que se cuente, y este informe no afirma ninguno.

De manera crucial, Dash no heredó el error. Su anuncio es explícito: *«Implementamos la versión de Orchard sin un error de inflación conocido. La versión anterior contenía un error que podía explotarse para inflar de forma indetectable el suministro de Zcash».*

Por tanto, Dash ejecuta ahora una bifurcación corregida de la criptografía de la que Zcash se ha alejado a nivel de capa base, mientras que el pool de próxima generación de Zcash (Ironwood) y el esquema de autorización de gasto de próxima generación (FROST) están, respectivamente, recién activos y todavía en Borrador.

---

## Claves de visualización: desplegadas, no una brecha de investigación

El pool blindado de Dash es [Orchard](https://zips.z.cash/zip-0224), construido sobre Halo 2 zk-SNARKs, que no requiere configuración confiable [trusted setup]. La jerarquía de claves de Orchard siempre ha incluido Claves de Visualización Completas y Claves de Visualización Entrantes como parte de su diseño y no como un añadido; por tanto, la capacidad llegó con el código, no como un port que alguna de las redes tuviera que negociar.

La hoja de ruta de Dash expone directamente la intención:

> *«A diferencia de los sistemas de privacidad obligatoria que han afrontado retiradas de exchanges y fricción regulatoria, los Saldos Blindados admiten divulgación selectiva mediante claves de visualización, lo que permite a usuarios y empresas compartir detalles de transacciones con auditores o cumplir con los requisitos de la Regla de Viaje cuando sea necesario, sin comprometer la privacidad para el uso cotidiano».*

Dos observaciones que conviene registrar:

**Dash está posicionando las claves de visualización en torno a un caso de uso de producción más concreto del que ha alcanzado la propia herramienta de Zcash.** La herramienta de divulgación de pagos de Zcash se ha mantenido en gran medida experimental y opcional en las billeteras. Dash está ofreciendo claves de visualización como función de cumplimiento con casos de uso identificados, en una red que también ofrece una liquidación determinista de aproximadamente un segundo y una sincronización de billetera de unos veinte segundos, según su propio anuncio.

**El elemento abierto es la deriva de compatibilidad, no la capacidad.** Merece seguimiento si la implementación de claves de visualización de Dash sigue siendo compatible a nivel de formato de transmisión con el formato de claves de visualización Orchard de Zcash a medida que ambas redes evolucionan de forma independiente. Es una cuestión de seguimiento, no un proyecto de investigación.

---

## Derivación de claves: comparación entre Zcash y Dash

Esta sección responde directamente a la pregunta del revisor. La respuesta breve es que los árboles de claves *blindados* son casi idénticos porque comparten código; las diferencias significativas están en cómo cada red **enraíza** ese árbol en el espacio de claves de su billetera y en qué más ocupa ese espacio.

### Zcash

Zcash utiliza [ZIP 32, *Billeteras Deterministas Jerárquicas Blindadas*](https://zips.z.cash/zip-0032), que tiene estado **Final**. En lugar de colocar las claves blindadas dentro de un único árbol BIP 32, ZIP 32 da a cada pool blindado su propia clave maestra y su propia ruta:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` está fijado en `32'` (0x80000020) según BIP 43, y `coin_type` sigue SLIP 44, y todas las redes de prueba comparten el índice `1`.

Dentro de una cuenta Orchard, la jerarquía es estrictamente unidireccional: cada nivel puede derivar todo lo que está por debajo y nada de lo que está por encima:

| Clave | Puede hacer | Deriva |
|---|---|---|
| Spending key | Gastar notas | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autorizar gastos | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Ver pagos entrantes **y** salientes | IVK, OVK |
| Incoming Viewing Key | Ver solo pagos entrantes | Direcciones diversificadas |
| Outgoing Viewing Key | Recuperar detalles de pagos salientes | — |
| Diversified address | Recibir | — |

Orchard simplificó esto respecto de Sapling: según el [Orchard Libro](https://zcash.github.io/orchard/design/keys.html), se eliminó la clave privada anuladora `nsk`, `nk` pasó a ser un elemento de campo en vez de un punto de curva, y `ovk` se deriva ahora de la clave de visualización completa en lugar de mantenerse por separado.

Por encima se encuentra [ZIP 316, *Direcciones Unificadas y Claves de Visualización Unificadas*](https://zips.z.cash/zip-0316) — Revisión 0 Activa, Revisión 1 Retirada, Revisión 2 en Borrador — que agrupa claves por pool en una **Full Viewing Key Unificada** («combina múltiples elementos Full Viewing Key…») y una **Incoming Viewing Key Unificada**. La distinción que un desarrollador de billeteras debe respetar: una UFVK revela actividad tanto entrante como saliente; una UIVK, solo entrante.

### Dash

Dash enraíza todo en un árbol BIP 32 convencional, con el tipo de moneda SLIP 44 `5'`, y añade dos extensiones de derivación propias.

[DIP-0009, *Rutas de Derivación de Funciones*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html), inserta un nivel de **función** que divide el espacio de claves por función específica de la moneda:

```
m / purpose' / coin_type' / feature' / *
```

Con `purpose` fijado en `9'` (0x80000009) y `coin_type` en `5'` (0x80000005). La motivación declarada del DIP es el aislamiento: *«Puede ser deseable mantener fondos mezclados en una ruta aislada de los fondos no mezclados».*

[DIP-0014, *Derivación Extendida de Claves mediante Enteros sin Signo de 256 Bits*](https://github.com/dashpay/dips/blob/master/dip-0014.md), va más allá y elimina el límite de índice de 31 bits de BIP 32 para que los componentes de ruta puedan transportar valores completos de 256 bits. Esto permite rutas derivadas de identidad como:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

Donde los dos últimos componentes son hashes de identidad de usuario. Zcash no tiene equivalente: ZIP 32 no tiene concepto de derivar una ruta de clave a partir de la identidad de otra parte.

### Dónde difieren realmente los dos

**El subárbol blindado es el mismo.** Las claves blindadas de Dash son claves de Orchard, porque el pool blindado de Dash es Orchard. Un desarrollador de billeteras que se mueva entre ambas trabaja con la misma estructura de clave de gasto a clave de visualización.

**El enraizamiento difiere.** Zcash aísla cada pool blindado bajo su propia clave maestra con el propósito `32'`. Dash cuelga la función blindada de un árbol unificado bajo el propósito `9'`, junto a todas las demás funciones. La separación de Zcash es por pool criptográfico; la de Dash, por función de producto.

**El espacio de claves de Dash contiene algo que el de Zcash no: un dominio BLS separado.** Las claves de operador de masternode, las claves de votación y las claves de cuórum utilizadas por los LLMQ son claves BLS, no claves de la familia Schnorr, y viven completamente fuera del árbol BIP 32 descrito arriba. Precisamente aquí reside la firma de umbral existente de Dash, y precisamente por eso no se compone con la autorización de gasto de Orchard, como expone la siguiente sección.

**La derivación vinculada a la identidad es exclusiva de Dash.** Las rutas de 256 bits de DIP-0014 existen para derivar claves a partir de relaciones entre identidades. Es un concepto de Dash Platform sin equivalente en Zcash, y es el caso más claro de que los dos esquemas de derivación han divergido deliberadamente y no por accidente.

*Véase la Figura 1 para los dos esquemas de enraizamiento que convergen en un subárbol compartido de Orchard.*

---

## FROST: la cuestión genuinamente abierta

Dash cuenta con un sistema maduro de firmas de umbral en **LLMQ basados en BLS** (Cuórums de Masternodes de Larga Duración), utilizado para ChainLocks, InstantSend y el consenso de validadores de Dash Platform.

[ZIP 312, *FROST para Multifirmas de Autorización de Gasto*](https://zips.z.cash/zip-0312), con estado **Borrador**, hace otra cosa. Convierte en umbral las firmas de autorización de gasto basadas en Schnorr ya definidas por Sapling y Orchard — **RedJubjub** y **RedPallas**, respectivamente — para que, según el propio planteamiento de ZIP, *«los usuarios y servicios de terceros que comparten la custodia de una billetera, o un grupo de personas que gestionan fondos compartidos»* puedan exigir aprobación por umbral, como 2 de 3, antes de un gasto. Se clasifica como un ZIP de **Billetera**: produce firmas compatibles con la autorización de gasto existente en lugar de cambiar el consenso. Conserva un rol de Coordinador, que ZIP se niega explícitamente a eliminar, y analiza tanto la generación de claves por distribuidor de confianza como la generación distribuida de claves.

La distinción que importa, y la razón por la que no son sustitutos:

| | BLS / LLMQ de Dash | Zcash FROST (ZIP 312) |
|---|---|---|
| Esquema de firma | BLS | Schnorr — RedJubjub / RedPallas |
| Quién firma | Un cuórum de masternodes | Un pequeño grupo de titulares de claves individuales |
| Qué se autoriza | Un hecho de red: un bloqueo de bloque, un bloqueo de transacción | Un gasto desde una cuenta blindada |
| Capa | Consenso | Billetera |
| Espacio de claves | Dominio BLS separado | La clave de autorización de gasto Orchard/Sapling |
| Estado | Desplegado | Borrador, sin implementación de referencia |

Que Dash tenga firmas de umbral BLS **no** significa que tenga o necesite FROST. Pero sí significa que los ingenieros de Dash tienen experiencia interna con la firma de umbral, la generación distribuida de claves y la coordinación de cuórums: experiencia genuinamente transferible si eligieran construirlo.

*Véase la Figura 2 para lo que realmente firma cada esquema.*

### Lo que requeriría FROST en la bifurcación Orchard de Dash, en una primera aproximación

1. **Una ceremonia de DKG y firma FROST sobre RedPallas**, el esquema de autorización de gasto de Orchard: una variante Schnorr sobre la curva Pallas. Esto es independiente de la DKG BLS existente de Dash para LLMQ y no puede reducirse a ella.
2. **Soporte de billetera y UX para la firma multipartita de una única cuenta blindada**, que es un patrón de interacción distinto de las herramientas de cuórum de masternodes y necesita un equivalente de Coordinador.
3. **Una decisión sobre la capa.** Lo más probable es que sea solo a nivel de billetera, dado que ZIP 312 se delimita como un esquema de billetera sobre primitivas existentes y no como un cambio de consenso, pero esto debe confirmarse específicamente frente a la bifurcación Orchard de Dash, no asumirse a partir del alcance de Zcash.

---

## Recomendación

**Claves de visualización: documentar, no investigar.** La capacidad está desplegada en ambas redes. Una breve nota de wiki que registre que el pool blindado de Dash incluye claves de visualización y enlace la hoja de ruta de Dash evita que la audiencia de ZecHub suponga que sigue siendo hipotética. Realizar seguimiento de la compatibilidad de formato de transmisión a medida que las dos redes evolucionen.

**FROST: oportunidad real, bloqueada aguas arriba.** Depende de que ZIP 312 alcance una implementación de referencia, o de que Dash elija construir en paralelo. ZecHub no puede acelerarlo directamente.

**El siguiente paso de mayor valor es una conversación, no más investigación documental.** Las personas que lo construirían son accesibles. Shielded Labs está impulsando ZIP 312; el equipo de ingeniería de Dash ya ha respondido positivamente al planteamiento «tomado de Zcash» en torno a la integración de Orchard. Un hilo entre comunidades que conecte a ambas revelaría más que otra ronda de lectura, y este informe ha alcanzado el límite de lo que las fuentes públicas pueden resolver.

---

## Figuras

**Figura 1 — Enraizamiento de la derivación de claves: Zcash ZIP 32 y Dash DIP-0009/0014, convergiendo en un subárbol compartido de Orchard.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figura 2 — Lo que firma cada esquema de umbral: un cuórum de masternodes que certifica un hecho de red, frente a un grupo de titulares de claves que autoriza un gasto blindado.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Fuentes

**Zcash — protocolo**
- [ZIP 32: Billeteras Deterministas Jerárquicas Blindadas](https://zips.z.cash/zip-0032) — estado Final
- [ZIP 224: Protocolo Blindado Orchard](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST para Multifirmas de Autorización de Gasto](https://zips.z.cash/zip-0312) — estado Borrador
- [ZIP 316: Direcciones Unificadas y Claves de Visualización Unificadas](https://zips.z.cash/zip-0316)
- [El Libro de Orchard — Claves y direcciones](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Especificación del Protocolo](https://zips.z.cash/protocol/protocol.pdf) — componentes de claves, §5.6.4

**Dash — protocolo y anuncios**
- [Las transacciones blindadas están activas en la red principal de Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 de agosto de 2026
- [Dash Está Añadiendo Transacciones Blindadas a Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 de febrero de 2026
- [Dash Hoja de Ruta](https://www.dash.org/roadmap/) — Saldos Blindados, completados en julio de 2026, Platform v4.0; actualizada el 12 de septiembre de 2026
- [DIP-0009: Rutas de Derivación de Funciones](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Derivación Extendida de Claves mediante Enteros sin Signo de 256 Bits](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentación Core de Dash — Cuórums de Masternodes (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [repositorio dashpay/dips](https://github.com/dashpay/dips)

**Cobertura contemporánea**
- [Dash lanza la tecnología Orchard de Zcash en una actualización de privacidad](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Lleva la Privacidad Orchard de Zcash a la Cadena Evolution para Transacciones Blindadas](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Fuentes comprobadas el 27 de septiembre de 2026. Dash Platform y ZIP 312 están ambos en evolución; las cifras y los estados deben volver a verificarse antes de republicarse.*
