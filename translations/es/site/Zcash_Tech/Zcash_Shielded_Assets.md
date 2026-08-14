<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Activos Blindados de Zcash

## Resumen rápido

Los Activos Blindados de Zcash (ZSA) son una extensión propuesta del protocolo que permitiría que activos **distintos de ZEC** — stablecoins, tokens de gobernanza o cualquier activo personalizado — existan dentro del pool blindado de Zcash, manteniendo privados al remitente, al destinatario y al monto.

- **Qué es:** activos personalizados al estilo ERC-20, pero blindados por defecto.
- **Quién lo está desarrollando:** [QEDIT](https://qed-it.com/), bajo una subvención de la Zcash Foundation, en colaboración con Electric Coin Company.
- **Cómo se especifica:** [ZIP 226](https://zips.z.cash/zip-0226) (transferencia y quema) junto con [ZIP 227](https://zips.z.cash/zip-0227) (emisión).
- **Estado:** aún no está activo en la red principal. Está previsto que el protocolo ZSA se implemente en la Actualización de Red 7 (NU7).
- **Comisiones:** siempre se pagan en ZEC, independientemente del activo que se esté moviendo.

---

## Explicación central

Los Activos Blindados de Zcash (ZSA) son una mejora propuesta para el protocolo de Zcash que permitiría la creación, transferencia y quema de activos personalizados en la cadena de Zcash.

Si estás familiarizado con el estándar de tokens [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) en la blockchain de Ethereum, los ZSA son para Zcash lo que los tokens ERC-20 son para Ethereum.

Los Activos Blindados de Zcash permitirían la creación de tokens personalizados en la blockchain de Zcash, lo que permitiría que tokens distintos de [ZEC](/guides/using-zec-privately) se beneficien del anonimato y la privacidad de las transacciones blindadas en la blockchain de Zcash.

Un uso potencial importante de los ZSA sería emitir stablecoins en el protocolo de Zcash. Las stablecoins son criptomonedas que vinculan su valor a una moneda fiduciaria, como el dólar estadounidense o el euro. Actualmente, algunas de las stablecoins con mayor circulación son tokens ERC-20 como [USDC](https://www.circle.com/en/usdc) y [Dai](https://docs.makerdao.com/).

Otro uso potencial de los ZSA sería la emisión de tokens de gobernanza. Por ejemplo, Zechub (el editor de esta wiki) es una Organización Autónoma Descentralizada (DAO) y podría crear y emitir a sus miembros un ZSA para votar propuestas y decisiones de gobernanza.

Los ZSA están siendo desarrollados por [QEDIT](https://qed-it.com/), bajo una importante subvención de la [Zcash Foundation](/zcash-organizations/zcash-foundation) en colaboración con [Electric Coin Company](/zcash-organizations/electric-coin-company). Como este proyecto aún está en desarrollo activo, las actualizaciones se publican en [este hilo](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) del foro de Zcash. La [solicitud de subvención de ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) de QEDIT está disponible en el sitio web de subvenciones de la Zcash Foundation.

---

## Visual / Analogía

### El sobre sellado

Imagina una transacción blindada de Zcash como un sobre simple y sellado depositado en un buzón público. Cualquiera puede ver que se envió un sobre. Nadie puede ver quién lo envió, quién lo recoge ni qué hay dentro, y todos los sobres se ven idénticos entre sí.

Hoy, un sobre en la red de Zcash solo puede llevar una cosa: ZEC.

ZSA no cambia el sobre. Cambia **lo que está permitido poner dentro**. Después de ZSA, el mismo sobre sellado podría llevar una stablecoin, un token de gobernanza de una DAO o un punto de fidelidad de una empresa, y desde fuera seguiría viéndose exactamente igual que cualquier otro sobre de la red.

Hay un detalle que vale la pena recordar: **el franqueo siempre se paga en ZEC**, sin importar qué haya dentro del sobre.

### Lo que puede ver un observador externo

| Un observador puede ver... | ERC-20 en Ethereum | ZSA en Zcash |
| --- | --- | --- |
| Quién lo envió | Público | Blindado |
| Quién lo recibió | Público | Blindado |
| Cuánto se movió | Público | Blindado |
| Saldos individuales | Público | Blindado |
| Oferta total del activo | Público | **Pública — deliberadamente** |
| Moneda en la que se paga la comisión | ETH | ZEC |

### Por qué la fila de la oferta no es un error

Las dos últimas filas de la tabla son donde ZSA se vuelve interesante.

ZIP 227 mantiene deliberadamente **la emisión transparente**, de modo que la oferta circulante de cada activo pueda rastrearse on-chain. Las tenencias individuales y los pagos individuales siguen siendo privados; el número total de tokens en existencia no.

Para un emisor de stablecoins, esa combinación es el objetivo más que un compromiso. Las reservas pueden auditarse frente a una oferta verificable públicamente, mientras que las personas que realmente usan el token mantienen sus saldos y pagos en privado.

### Un activo, una identidad

Cada activo recibe un **Identificador de Activo** único, derivado de la clave de emisión del emisor junto con una descripción textual del activo. Dos emisores distintos no pueden producir el mismo identificador, y acuñar o modificar un activo requiere autorización criptográfica de su emisor. En términos del sobre: cualquiera puede enviar un sobre, pero solo la casa de moneda que posee un activo determinado puede imprimir más.

---

## Análisis en profundidad

### Demo de ZSA en Zebra

[![Miniatura del video](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**¡Ejecuta la demo por tu cuenta!**

Clona el repositorio zcash-tx-tool: <https://github.com/QED-it/zcash_tx_tool>

### Propuestas de Mejora de Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Transferencia y Quema de Activos Blindados de Zcash
- [ZIP 227](https://zips.z.cash/zip-0227): Emisión de Activos Blindados de Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Formato de Transacción Versión 6

> **Nota sobre ZIP 230:** ZIP 230 fue retirado posteriormente y no será implementado. La versión 6 de transacción ahora está definida por [ZIP 229](https://zips.z.cash/zip-0229). Consulta el aviso en la parte superior de la página de [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 define el protocolo OrchardZSA — una extensión del protocolo Orchard que incorpora la transferencia y la quema de activos personalizados. ZIP 227 define cómo se crean esos activos en primer lugar y solo debe implementarse junto con ZIP 226.

### Propuesta de subvención de ZSA

La propuesta ZSA para Activos Blindados (ZSA/UDA) fue presentada por el equipo de [QEDIT](https://qed-it.com/) para construir activos blindados genéricos en la blockchain de Zcash. Estos suelen denominarse User Defined Assets (UDA) o Zcash Shielded Assets (ZSA).

Con esta propuesta, el equipo de [QEDIT](https://qed-it.com/) planea llevar DeFi al ecosistema de Zcash y, al mismo tiempo, permitir el uso de la mejor tecnología de privacidad dentro del ecosistema DeFi existente. En una encuesta, el equipo preguntó y la comunidad respondió que [los activos blindados genéricos (ZSA/UDA) son la característica más solicitada en este momento](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Estas propuestas se adhieren técnicamente a la especificación de [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) y están definidas en ZIP 226 y ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transferencia y Quema de Activos Blindados de Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227): Emisión de Activos Blindados de Zcash

---

## Implicaciones prácticas

**Si posees o usas ZEC**

- Los ZSA están definidos como una extensión de Orchard ("OrchardZSA"), por lo que compartirían la infraestructura blindada que ZEC ya usa. Tu wallet necesitará compatibilidad explícita con ZSA antes de poder almacenarlos o enviarlos.
- Siempre necesitarás tener algo de ZEC disponible. Las comisiones por emitir y transferir un ZSA se pagan en ZEC, no en el propio activo.
- Nada cambia en tus transacciones existentes de ZEC.

**Si eres un posible emisor — una stablecoin, una DAO, una empresa**

- Emitir un activo requiere autorización criptográfica vinculada a una clave de emisión, por lo que solo tú puedes acuñar o modificar los atributos de tu propio activo.
- La oferta circulante de tu activo es auditable públicamente, mientras que los saldos y las transferencias de tus usuarios no lo son. Para un emisor regulado, normalmente esta es exactamente la combinación necesaria.
- Una sola transacción de emisión puede crear más de un activo a la vez.

**Para el ecosistema**

- Debido a que cada comisión de ZSA está denominada en ZEC, la actividad de cualquier activo futuro emitido en Zcash genera demanda para el propio ZEC.

---

## Errores comunes

| Creencia común | Lo que realmente ocurre |
| --- | --- |
| "Los ZSA ya están activos en Zcash hoy." | No lo están. Está previsto que ZSA se implemente en la Actualización de Red 7 (NU7) y aún está en revisión y pruebas. |
| "ZSA lleva los smart contracts a Zcash." | ZSA especifica la emisión, transferencia y quema de activos. No es una capa de contratos programables de propósito general. |
| "Puedes pagar las comisiones de ZSA con el propio token ZSA." | Las comisiones se pagan en ZEC. |
| "Si está blindado, la oferta del token también debe ser secreta." | ZIP 227 hace que la emisión sea transparente a propósito, para que la oferta de cada activo pueda rastrearse públicamente. Los saldos y las transferencias siguen siendo privados; la oferta no. |
| "ZIP 230 es el formato actual de transacción versión 6." | ZIP 230 ha sido retirado. La versión 6 ahora está definida por ZIP 229. |

---

## Páginas relacionadas

- [Halo](/zcash-tech/halo) — el sistema de pruebas detrás de Orchard, el protocolo que ZSA extiende
- [Zk-SNARKs](/zcash-tech/zk-snarks) — las pruebas de conocimiento cero que permiten verificar una transferencia blindada sin revelarla
- [Shielded Pools](/using-zcash/shielded-pools) — donde los ZSA existirían junto con ZEC
- [Transactions](/using-zcash/transactions) — cómo se compone una transacción de Zcash
- [Zebra Full Node](/zcash-tech/zebra-full-node) — la implementación de nodo usada en la demo de ZSA anterior
