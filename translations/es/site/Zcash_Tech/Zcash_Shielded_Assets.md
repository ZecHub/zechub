<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Activos blindados [Shielded Assets]

## En resumen

Zcash Los Activos blindados (ZSA) son una extensión de protocolo propuesta que permitiría que activos **distintos de ZEC** — stablecoins, tokens de gobernanza o cualquier activo personalizado — residan dentro del pool blindado de Zcash, manteniendo privados al remitente, al destinatario y el importe.

- **Qué es:** Activos personalizados al estilo ERC-20, pero blindados por defecto.
- **Quién lo está desarrollando:** [QEDIT](https://qed-it.com/), mediante una subvención de la Zcash Foundation, en colaboración con la Electric Coin Company.
- **Cómo se especifica:** [ZIP 226](https://zips.z.cash/zip-0226) (transferencia y quema) junto con [ZIP 227](https://zips.z.cash/zip-0227) (emisión).
- **Estado:** No está activo en mainnet ni forma parte de la Actualización de red 7 (NU7). [ZIP 259](https://zips.z.cash/zip-0259), que enumera todo lo que despliega NU7, no incluye ZIP 226 ni ZIP 227, y no se ha establecido ninguna fecha de activación para los ZSA.
- **Tarifas:** Siempre se pagan en ZEC, independientemente del activo que se transfiera.

---

## Explicación principal

Zcash Los Activos blindados (ZSA) son una mejora propuesta para el protocolo Zcash que permitiría crear, transferir y quemar activos personalizados en la cadena de Zcash.

Si conoce el estándar de token [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) de la blockchain de Ethereum, los ZSA son para Zcash lo que los tokens ERC-20 son para Ethereum.

Zcash Los Activos blindados permitirían crear tokens personalizados en la blockchain de Zcash, posibilitando así que tokens distintos de [ZEC](/guides/using-zec-privately) se beneficien del anonimato y la privacidad de las transacciones blindadas en la blockchain de Zcash.

Un uso potencial importante de los ZSA sería emitir stablecoins en el protocolo Zcash. Las stablecoins son criptomonedas cuyo valor está vinculado a una moneda fiduciaria, como el dólar estadounidense o el euro. Actualmente, algunas de las stablecoins con mayor circulación son tokens ERC-20 como [USDC](https://www.circle.com/en/usdc) y [Dai](https://docs.makerdao.com/).

Otro uso potencial de los ZSA sería la emisión de tokens de gobernanza. Por ejemplo, ZecHub (el editor de esta wiki) es una Organización Autónoma Descentralizada (DAO) y podría crear y emitir a sus miembros un ZSA para votar sobre propuestas y decisiones de gobernanza.

Los ZSA están siendo desarrollados por [QEDIT](https://qed-it.com/), mediante una importante subvención de la [Zcash Foundation](/zcash-organizations/zcash-foundation) en colaboración con la [Electric Coin Company](/zcash-organizations/electric-coin-company). Dado que este proyecto sigue desarrollándose activamente, las actualizaciones se publican en [este hilo](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) del foro Zcash. La [solicitud de subvención para ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) de QEDIT está disponible en el sitio web de subvenciones Zcash Foundation.

---

## Visual / Analogía

### El sobre sellado

Imagine una transacción blindada de Zcash como un sobre sencillo y sellado depositado en un buzón público. Cualquiera puede ver que se envió un sobre. Nadie puede ver quién lo envió, quién lo recoge ni qué contiene, y todos los sobres tienen el mismo aspecto.

Hoy, un sobre en la red Zcash solo puede llevar una cosa: ZEC.

ZSA no cambia el sobre. Cambia **lo que se permite dentro de él**. Después de ZSA, el mismo sobre sellado podría llevar una stablecoin, un token de gobernanza de una DAO o un punto de fidelidad empresarial, y desde fuera seguiría pareciendo exactamente igual que cualquier otro sobre de la red.

Conviene recordar un detalle: **el franqueo siempre se paga en ZEC**, sin importar qué haya dentro del sobre.

### Lo que puede ver un observador externo

| Un observador puede ver... | ERC-20 en Ethereum | ZSA en Zcash |
| --- | --- | --- |
| Quién lo envió | Público | Blindado |
| Quién lo recibió | Público | Blindado |
| Cuánto se transfirió | Público | Blindado |
| Saldos individuales | Públicos | Blindados |
| Suministro total del activo | Público | **Público — deliberadamente** |
| Moneda en la que se paga la tarifa | ETH | ZEC |

### Por qué la fila del suministro no es un error

Las dos últimas filas de la tabla son donde ZSA se vuelve interesante.

ZIP 227 mantiene deliberadamente **transparente la emisión**, de modo que el suministro circulante de cada activo pueda rastrearse on-chain. Las tenencias individuales y los pagos individuales siguen siendo privados; el número total de tokens existentes no lo es.

Para un emisor de stablecoins, esa combinación es el objetivo y no una concesión. Las reservas pueden auditarse frente a un suministro verificable públicamente, mientras que las personas que realmente usan el token mantienen para sí sus saldos y pagos.

### Un activo, una identidad

Cada activo recibe un **Identificador de activo**, derivado de la clave de emisión del emisor junto con una descripción textual del activo. Dos emisores distintos no pueden producir el mismo identificador, y acuñar o modificar un activo requiere autorización criptográfica de su emisor. En términos del sobre: cualquiera puede enviar un sobre, pero solo la casa de moneda propietaria de un activo determinado puede imprimir más.

---

## Análisis detallado

### Demo de ZSA en Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**¡Ejecute la demo usted mismo!**

Clone el repositorio zcash-tx-tool: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Propuestas de mejora de Zcash (ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226): Transferencia y quema de Activos blindados de Zcash
- [ZIP 227](https://zips.z.cash/zip-0227): Emisión de Activos blindados de Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Formato de transacción versión 6

> **Nota sobre ZIP 230:** ZIP 230 se retiró posteriormente y no se desplegará. La versión 6 de las transacciones está definida ahora por [ZIP 229](https://zips.z.cash/zip-0229). Consulte el aviso en la parte superior de la página [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 define el protocolo OrchardZSA, una extensión del protocolo Orchard que permite la transferencia y quema de activos personalizados. ZIP 227 define cómo se crean dichos activos en primer lugar y solo debe implementarse junto con ZIP 226.

### Propuesta de subvención para ZSA

La propuesta ZSA para Activos blindados (ZSA/UDA) fue presentada por el equipo [QEDIT](https://qed-it.com/) para crear activos blindados genéricos en la blockchain de Zcash. Estos suelen denominarse Activos definidos por el usuario (UDA) o Activos blindados de Zcash (ZSA).

Con esta propuesta, el equipo de [QEDIT](https://qed-it.com/) planea llevar DeFi al ecosistema Zcash y, al mismo tiempo, permitir el uso de la mejor tecnología de privacidad dentro del ecosistema DeFi existente. En una encuesta, el equipo preguntó y la comunidad respondió que [los activos blindados genéricos (ZSA/UDA) son la funcionalidad más solicitada actualmente](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Estas propuestas se ajustan técnicamente a la especificación de la Propuesta de mejora de [Zcash (ZIP)](https://zips.z.cash/zip-0000) y se definen en ZIP 226 y ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transferencia y quema de Activos blindados de Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227): Emisión de Activos blindados de Zcash

---

## Implicaciones prácticas

**Si posee o utiliza ZEC**

- Los ZSA se definen como una extensión de Orchard («OrchardZSA»), por lo que compartirían la infraestructura blindada que ZEC ya utiliza. Su billetera necesitará compatibilidad explícita con ZSA antes de poder almacenarlos o enviarlos.
- Siempre necesitará tener algo de ZEC disponible. Las tarifas por emitir y transferir un ZSA se pagan en ZEC, no en el activo mismo.
- Nada cambia en sus transacciones existentes de ZEC.

**Si es un emisor potencial — una stablecoin, una DAO, una empresa**

- La emisión de un activo requiere autorización criptográfica vinculada a una clave de emisión, por lo que solo usted puede acuñar o modificar los atributos de su propio activo.
- El suministro circulante de su activo es auditable públicamente, mientras que los saldos y las transferencias de sus usuarios no lo son. Para un emisor regulado, esta suele ser exactamente la combinación necesaria.
- Una única transacción de emisión puede crear más de un activo a la vez.

**Para el ecosistema**

- Debido a que cada tarifa de ZSA está denominada en ZEC, la actividad en cualquier activo futuro emitido en Zcash genera demanda de ZEC.

---

## Errores comunes

| Creencia común | Lo que realmente ocurre |
| --- | --- |
| «Los ZSA están activos hoy en Zcash». | No lo están. ZSA no forma parte de la Actualización de red 7 (NU7), que [ZIP 259](https://zips.z.cash/zip-0259) define sin ZIP 226 ni ZIP 227, y todavía se encuentra en revisión y pruebas. |
| «ZSA lleva contratos inteligentes a Zcash». | ZSA especifica la emisión, transferencia y quema de activos. No es una capa de contratos programables de propósito general. |
| «Puede pagar las tarifas de ZSA con el propio token ZSA». | Las tarifas se pagan en ZEC. |
| «Si está blindado, el suministro del token también debe ser secreto». | ZIP 227 hace que la emisión sea transparente intencionadamente, para que el suministro de cada activo pueda rastrearse públicamente. Los saldos y las transferencias siguen siendo privados; el suministro no. |
| «ZIP 230 es el formato actual de transacción versión 6». | ZIP 230 se ha retirado. La versión 6 está definida ahora por ZIP 229. |

---

## Páginas relacionadas

- [Halo](/zcash-tech/halo) — el sistema de pruebas detrás de Orchard, el protocolo que ZSA extiende
- [zk-SNARKs](/zcash-tech/zk-snarks) — las pruebas zero-knowledge que permiten verificar una transferencia blindada sin revelarla
- [Pools blindados](/using-zcash/shielded-pools) — donde residirían los ZSA junto con ZEC
- [Transacciones](/using-zcash/transactions) — cómo se compone una transacción de Zcash
- [Zebra Nodo completo](/zcash-tech/zebra-full-node) — la implementación de nodo utilizada en la demo de ZSA anterior
