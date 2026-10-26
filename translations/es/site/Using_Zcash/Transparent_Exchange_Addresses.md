<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ¿Qué son las direcciones TEX de Zcash?

## TL;DR

* Una dirección TEX es una dirección transparente de Zcash escrita en un formato diferente. Comienza con `tex1` y está definida en [ZIP 320](https://zips.z.cash/zip-0320).
* Le indica una cosa a tu wallet: paga esta dirección únicamente con fondos transparentes.
* Si tu saldo está blindado, un wallet compatible realiza dos pasos por ti. Mueve el importe a una dirección transparente temporal y luego lo envía a la dirección TEX.
* En 2023, Binance pidió a la comunidad de Zcash una forma de rechazar depósitos blindados y devolverlos. Las direcciones TEX son la respuesta, y Binance es el exchange de la lista de ZecHub [Exchanges con custodia](/using-zcash/custodial-exchanges) que acepta depósitos TEX.
* El soporte también ha crecido en el lado de los envíos: Coinbase permite a sus usuarios enviar ZEC a direcciones TEX, y los kits de herramientas para wallets han ido añadiendo soporte para ZIP 320.
* Un pago a una dirección TEX es público en la blockchain, como cualquier pago transparente. El resto de tu saldo blindado permanece privado.

## Explicación básica

Una dirección TEX de Zcash es un tipo especial de dirección de recepción. TEX significa «Transparent Exchange». Es una recodificación Bech32m de una única dirección transparente p2pkh. Las direcciones TEX comienzan con `tex1` y son un tipo distinto de las direcciones unificadas.

Una dirección TEX indica a un wallet compatible que realice una transacción solo transparente (T -> T). 

La lógica es la siguiente: cuando un wallet compatible detecta una dirección TEX, la decodifica para obtener el receptor transparente que contiene. A continuación, el wallet envía los fondos necesarios para la transacción desde el pool blindado a una dirección transparente efímera, independiente y controlada por el usuario (Z -> T). Después envía esos fondos al receptor transparente decodificado de la dirección TEX (T -> T).  

La propuesta técnica para las direcciones TEX se describe en Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define un tipo de dirección exclusivamente para recibir fondos desde direcciones transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### ¿Qué tan utilizadas están las direcciones TEX?

La adopción sigue siendo parcial, pero ya no se limita a un solo exchange. Conviene distinguir dos funciones diferentes:

* **Emitir direcciones TEX para depósitos.** Binance es el exchange de nuestra lista de [Exchanges con custodia](/using-zcash/custodial-exchanges) que proporciona una dirección TEX para depósitos, de modo que los fondos lleguen desde una fuente transparente ([ZIP 320, Antecedentes](https://zips.z.cash/zip-0320#background)). ZIP 320 no espera que otros exchanges emitan direcciones TEX, salvo que necesiten saber de qué dirección provino un pago.
* **Enviar a direcciones TEX.** Este es el lado que ha crecido. En octubre de 2024, Coinbase anunció que los usuarios de Coinbase.com pueden enviar Zcash a direcciones TEX ([anuncio de Coinbase Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Los kits de herramientas para wallets también han ido añadiendo soporte para ZIP 320: KeepKey añadió firma para transacciones TEX en el firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), y la biblioteca `zcash-js` de XChainJS fue corregida después de que rechazara destinatarios válidos de `tex1` (más información a continuación).

Por tanto, las direcciones TEX no son universales, pero un lector ya no debería asumir que Binance es el único lugar donde aparecen.

### Cuándo necesito una dirección TEX

#### Necesitas una dirección TEX cuando envías fondos a una dirección transparente usando un wallet que no permite enviar directamente a una dirección transparente.

Algunos wallets no permiten enviar directamente a una dirección transparente, y es posible que el destinatario no proporcione un equivalente TEX. Por tanto, a veces puede ser necesario convertir una dirección transparente en una dirección TEX. Esto puede lograrse manualmente ejecutando la implementación de referencia descrita en [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Necesitas una dirección TEX cuando envías fondos a un exchange centralizado que exige que esos fondos provengan de una fuente transparente.

[Binance](https://www.binance.com/) es la razón por la que existen las direcciones TEX. En noviembre de 2023, informó a la comunidad de Zcash que ZEC podría dejar de cotizarse a menos que existiera una forma de rechazar depósitos desde direcciones blindadas y devolverlos al depositante ([ZIP 320, Antecedentes](https://zips.z.cash/zip-0320#background)). ZIP 320 no espera que otros exchanges emitan direcciones TEX, salvo que necesiten saber de qué dirección provino un pago. Binance es el exchange de nuestra lista de [Exchanges con custodia](/using-zcash/custodial-exchanges) que acepta depósitos en una dirección TEX.
Las direcciones TEX informan a un wallet compatible de que todos los fondos enviados a esa dirección deben ser transparentes y excluyen el envío de cualquier valor blindado a dicha dirección.
Si un exchange como Binance rechaza el valor enviado, dispone de los medios necesarios para devolver ese valor a la dirección de la que provino. También ayuda a entidades como Binance a cumplir las leyes y normativas impuestas por gobiernos u otras autoridades.

### ¿Qué wallets admiten direcciones TEX?

Puedes consultar la lista más actualizada en nuestra página de [wallets](/using-zcash/wallets). Usa el filtro TEX Address.

## Visual / Analogía

Piensa en tu saldo blindado como dinero en una caja fuerte cerrada en casa. Nadie de fuera puede ver cuánto hay dentro.

Un exchange como Binance tiene un cartel en su mostrador: pagos aceptados únicamente en un sobre transparente, para que el cajero pueda ver de dónde vino el dinero y devolverlo si hace falta. La dirección TEX es ese cartel.

Cuando tu wallet ve el cartel, saca el importe de la caja fuerte, lo coloca en un sobre transparente con tu dirección de devolución escrita en él (la dirección transparente temporal) y lleva el sobre al mostrador. La caja fuerte permanece cerrada, y nadie sabe qué más hay dentro.

## Análisis detallado

### Cómo se construye una dirección TEX

Una dirección transparente normal que comienza con `t1` contiene un hash de clave de 20 bytes, escrito en Base58Check. Una dirección TEX contiene los mismos 20 bytes, recodificados en Bech32m con el prefijo `tex` (`textest` en testnet). Convertir una en la otra requiere unas pocas líneas de código, que ZIP 320 muestra en su implementación de referencia.

El diseño sencillo era un requisito de Binance: la conversión tenía que funcionar solo con las bibliotecas Base58Check y Bech32m en el código frontend del exchange. Un borrador anterior de ZIP 320 integraba la idea en las direcciones unificadas, y esa versión se descartó por este motivo.

Las direcciones TEX toman la codificación Bech32m del formato Unified Address, pero conservan muy poca de su estructura. Si no conoces Bech32m ni cómo se validan las direcciones de Zcash, la página de [Direcciones unificadas](/using-zcash/unified-addresses) explica los conceptos básicos en [ZIP 316](https://zips.z.cash/zip-0316). Una dirección TEX se diferencia de una Unified Address de cuatro formas concretas:

| | Unified Address (ZIP 316) | Dirección TEX (ZIP 320) |
|---|---|---|
| Qué contiene | varios receptores agrupados | un único receptor transparente P2PKH |
| Prefijo legible para humanos (HRP) | `u` (mainnet) | `tex` (`textest` en testnet) |
| Ofuscación F4Jumble | sí | no |
| Códigos de tipo para cada receptor | sí | no |

En resumen, una dirección TEX es el envoltorio Bech32m más simple posible: un hash de clave transparente, un prefijo `tex` y nada más.

### Reglas de manejo para wallets e integradores

Esta es la parte que las implementaciones han estado haciendo mal, por lo que conviene expresarla claramente. Al detectar una dirección TEX, un wallet o integrador **no debe gastar directamente desde el pool blindado hacia el destino TEX.** ZIP 320 exige que cada entrada de un pago TEX sea transparente, por lo que el pago se construye en dos pasos:

1. **Desblindar.** Mueve el importe desde el pool blindado a una dirección transparente efímera, nueva y controlada por el usuario que pertenece al wallet (Z -> T).
2. **Enviar de transparente a transparente.** Gasta esa salida efímera en el receptor P2PKH decodificado dentro de la dirección TEX (T -> T).

Unas cuantas reglas hacen que esto sea seguro, todas procedentes de ZIP 320:

* La dirección efímera debe derivarse de tu frase semilla, para que, si el exchange devuelve los fondos, tu wallet aún pueda encontrarlos y gastarlos.
* Debe utilizarse una dirección efímera nueva cada vez, para que no se puedan vincular pagos separados entre sí.
* La segunda transacción debe gastar únicamente entradas transparentes, de modo que el exchange vea un depósito limpio de transparente a transparente.

La conversión y el flujo de dos pasos se muestran en la [implementación de referencia de ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Hacerlo mal es un problema real y reciente: en octubre de 2026, la biblioteca `zcash-js` de XChainJS rechazaba destinatarios válidos de `tex1` con un error «Invalid 'to' address», porque su validador solo aceptaba el formato Base58Check `t1`, lo que impedía depósitos de ZEC en servicios que publican una dirección `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Se corrigió enseñando al validador a aceptar la codificación de ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Qué revela un envío TEX

Un pago TEX es un pago transparente, así que es público, pero vale la pena precisar qué puede y qué no puede ver un observador.

Lo que es **visible** en la cadena:

* La dirección transparente efímera, ya que aparece como la salida del paso de desblindaje y la entrada del envío final.
* Ambos importes: el valor que salió del pool blindado en el paso Z -> T y el valor entregado en el paso T -> T.
* El receptor transparente del exchange, que es la dirección P2PKH codificada en la dirección TEX.

Lo que permanece **oculto**:

* El resto de tu saldo blindado y qué notas blindadas concretas financiaron el pago. El paso de desblindaje revela que *algún* valor salió del pool hacia la dirección efímera, no de qué parte del pool procedía.

Por tanto, un observador puede vincular la dirección efímera al pago del exchange (los mismos fondos, de transparente a transparente) y puede ver que fue recargada desde un retiro blindado. No puede conectarla con tus otros fondos o actividad blindados. Nada en la cadena marca realmente el pago como un envío «TEX»: como señala ZIP 320, un pago a una dirección TEX es indistinguible de un pago a la dirección `t1` correspondiente, porque las reglas de consenso no cambian y toda la regla reside en el wallet.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Qué muestra la blockchain

La regla TEX reside en los wallets. Los nodos no la verifican, por lo que las reglas de consenso permanecen iguales. En la cadena, un pago a una dirección TEX tiene el mismo aspecto que un pago a la dirección `t1` correspondiente. El importe, la dirección efímera y la dirección del exchange son públicos, como en cualquier transacción transparente.

## Páginas relacionadas

- [Direcciones unificadas](/using-zcash/unified-addresses): el formato de dirección `u1` bajo ZIP 316 y los fundamentos de Bech32m que reutiliza una dirección TEX.
- [Exchanges con custodia](/using-zcash/custodial-exchanges): qué exchanges aceptan qué tipos de direcciones, incluidos los depósitos TEX de Binance.
- [Wallets](/using-zcash/wallets): usa el filtro TEX Address para encontrar wallets que puedan pagar a una dirección TEX.
- [Pools blindados](/using-zcash/shielded-pools): donde se encuentra tu saldo privado antes de que un pago TEX saque una parte de él.
- [Quién puede ver tu pago de Zcash](/start-here/who-can-see-your-zcash-payment): qué se vuelve visible una vez que los fondos salen del pool blindado.
- [Qué puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see): cómo aparece un pago transparente en la cadena.
- [Zcash URI de solicitudes de pago](/using-zcash/payment-request-uris): otro estándar de wallet para pagos precompletados.

**Última actualización:** octubre de 2026
