<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ¿Qué son las direcciones TEX de Zcash?

## TL;DR

* Una dirección TEX es una dirección Zcash transparente escrita en un formato diferente. Comienza con `tex1` y está definida en [ZIP 320](https://zips.z.cash/zip-0320).
* Le indica una cosa a tu wallet: paga esta dirección únicamente con fondos transparentes.
* Si tu saldo está blindado, un wallet compatible realiza dos pasos por ti. Mueve el monto a una dirección transparente temporal y luego lo envía a la dirección TEX.
* En 2023, Binance pidió a la comunidad de Zcash una forma de rechazar depósitos blindados y devolverlos. Las direcciones TEX son la respuesta, y Binance es el exchange de la lista de ZecHub [Exchanges custodiales](/using-zcash/custodial-exchanges) que acepta depósitos TEX.
* Un pago a una dirección TEX es público en la blockchain, como cualquier pago transparente. El resto de tu saldo blindado permanece privado.

## Explicación principal

Una dirección TEX de Zcash es un tipo especial de dirección de recepción. TEX significa «intercambio transparente». Es una recodificación Bech32m de una única dirección transparente p2pkh. Las direcciones TEX comienzan con `tex1` y son un tipo separado de las direcciones unificadas.

Una dirección TEX le indica a un wallet compatible que realice una transacción solo transparente (T -> T). 

La lógica es la siguiente: cuando un wallet compatible detecta una dirección TEX, la decodifica para obtener el receptor transparente que contiene. Luego, el wallet envía los fondos requeridos para la transacción desde el pool blindado a una dirección transparente efímera, separada y controlada por el usuario (Z -> T). Después, envía esos fondos al receptor transparente decodificado de la dirección TEX (T -> T).  

La propuesta técnica para las direcciones TEX se describe en Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define un tipo de dirección exclusivamente para recibir fondos de direcciones transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Las direcciones TEX aún no son ampliamente adoptadas. Es posible que los usuarios de Zcash tengan que utilizarlas en el futuro.

### Cuándo necesito una dirección TEX

#### Necesitas una dirección TEX al enviar fondos a una dirección transparente usando un wallet que no admite enviar directamente a una dirección transparente.

Ciertos wallets no permiten enviar directamente a una dirección transparente, y el destinatario puede no proporcionar un equivalente TEX. Por lo tanto, a veces puede ser necesario convertir una dirección transparente en una dirección TEX. Esto puede lograrse manualmente ejecutando la implementación de referencia descrita en [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Necesitas una dirección TEX al enviar fondos a un exchange centralizado que requiere que esos fondos procedan de una fuente transparente.

[Binance](https://www.binance.com/) es la razón por la que existen las direcciones TEX. En noviembre de 2023, informó a la comunidad de Zcash que ZEC podría ser excluido de la lista a menos que hubiera una forma de rechazar depósitos procedentes de direcciones blindadas y devolverlos al depositante ([ZIP 320, Antecedentes](https://zips.z.cash/zip-0320#background)). ZIP 320 no espera que otros exchanges emitan direcciones TEX a menos que necesiten saber de qué dirección provino un pago. Binance es el exchange de nuestra lista de [Exchanges custodiales](/using-zcash/custodial-exchanges) que acepta depósitos a una dirección TEX.
Las direcciones TEX informan a un wallet compatible de que todos los fondos enviados a esa dirección deben ser transparentes y excluyen todo valor blindado de ser enviado a dicha dirección.
Si un exchange como Binance rechaza el valor enviado, cuenta con los medios necesarios para devolver ese valor a la dirección de la que provino. También ayuda a entidades como Binance a cumplir las leyes y regulaciones impuestas por gobiernos u otras autoridades.

### ¿Qué wallets admiten direcciones TEX?

Puedes consultar la lista más actualizada en nuestra página de [wallets](/using-zcash/wallets). Usa el filtro Dirección TEX.

## Visual / Analogía

Piensa en tu saldo blindado como dinero en una caja fuerte cerrada en casa. Nadie fuera puede ver cuánto hay dentro.

Un exchange como Binance tiene un cartel en su mostrador: pagos aceptados únicamente en un sobre transparente, para que el cajero pueda ver de dónde vino el dinero y devolverlo si es necesario. La dirección TEX es ese cartel.

Cuando tu wallet ve el cartel, saca el monto de la caja fuerte, lo coloca en un sobre transparente con tu dirección de devolución (la dirección transparente temporal) y lleva el sobre al mostrador. La caja fuerte permanece cerrada y nadie descubre qué más contiene.

## Análisis detallado

### Cómo se construye una dirección TEX

Una dirección transparente normal que comienza con `t1` contiene un hash de clave de 20 bytes, escrito en Base58Check. Una dirección TEX contiene los mismos 20 bytes, recodificados en Bech32m con el prefijo `tex` (`textest` en testnet). Convertir una en la otra requiere unas pocas líneas de código, que ZIP 320 muestra en su implementación de referencia.

El diseño simple era un requisito de Binance: la conversión debía ejecutarse únicamente con las bibliotecas Base58Check y Bech32m en el código frontend del exchange. Un borrador anterior de ZIP 320 integraba la idea en las direcciones unificadas, y esa versión se descartó por esta razón.

### Pagar una dirección TEX desde un saldo blindado

ZIP 320 exige que un wallet compatible construya dos transacciones aquí. La primera mueve los fondos desde tu saldo blindado a una nueva dirección transparente efímera. La segunda los envía desde esa dirección a la dirección TEX.

Si el exchange rechaza el depósito, devuelve los fondos a la dirección efímera. Tu wallet debe poder encontrarlos y gastarlos, por lo que ZIP 320 pide a los wallets que deriven direcciones efímeras de tu frase semilla. También pide a los wallets que utilicen una dirección efímera nueva cada vez, para que los pagos separados no puedan vincularse entre sí.

### Lo que muestra la blockchain

La regla TEX está en los wallets. Los nodos no la verifican, por lo que las reglas de consenso permanecen iguales. En la cadena, un pago a una dirección TEX se ve igual que un pago a la dirección `t1` correspondiente. El monto, la dirección efímera y la dirección del exchange son públicos, como en cualquier transacción transparente.

## Páginas relacionadas

- [Exchanges custodiales](/using-zcash/custodial-exchanges): qué exchanges aceptan qué tipos de direcciones, incluidos los depósitos TEX de Binance.
- [Wallets](/using-zcash/wallets): usa el filtro Dirección TEX para encontrar wallets que puedan pagar a una dirección TEX.
- [Pools blindados](/using-zcash/shielded-pools): dónde se encuentra tu saldo privado antes de que un pago TEX saque parte de él.
- [Quién puede ver tu pago de Zcash](/start-here/who-can-see-your-zcash-payment): qué se vuelve visible una vez que los fondos abandonan el pool blindado.
- [Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see): cómo aparece un pago transparente en la cadena.
- [URI de solicitud de pago de Zcash](/using-zcash/payment-request-uris): otro estándar de wallet para pagos prellenados.

**Última actualización:** octubre de 2026
