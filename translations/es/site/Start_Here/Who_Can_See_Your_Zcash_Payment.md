<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ¿Quién puede ver tu pago [payment] de Zcash?

## En resumen

- Zcash te ofrece **dos tipos de dirección [address]**: transparente [transparent] (`t`) y blindada [shielded] (`z` o `u`).
- Cuánto ve el público depende de entre qué tipos se mueve tu pago.
- Solo un pago **de blindada a blindada** oculta al remitente, al destinatario y el importe.
- Una dirección blindada no es una sola clave. Es un pequeño conjunto de claves, y puedes otorgar **acceso de solo lectura sin ceder la capacidad de gastar**.
- Una clave de visualización [viewing key] **no puede retirarse** una vez que la compartes.

---

## Lo primero que debes entender

En la mayoría de las blockchains [blockchain] no hay ninguna elección que hacer. Todo lo que envías es público, para siempre, para cualquiera que mire.

Zcash te ofrece una elección. Esa elección se toma dos veces: **una al elegir a qué dirección enviar y otra al decidir quién recibe una clave para leer tu historial.**

La imagen siguiente abarca ambas.

![Zcash key types and what a block explorer can see for each of the four transaction paths](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## Primera elección: qué dirección

Cada pago de Zcash se mueve entre dos direcciones, y cada una puede ser transparente o blindada. Esto da cuatro rutas, y cada una filtra una cantidad distinta de información.

El patrón es más sencillo de lo que parece: **todo lo que toca una dirección transparente se hace público.** Un pago que permanece dentro del pool [pool] blindado durante todo el trayecto no revela nada salvo la tarifa [fee].

Esto es especialmente importante cuando retiras fondos de un exchange [exchange]. Muchos exchanges solo envían a direcciones transparentes, por lo que el retiro es público. Blinda los fondos tú mismo cuando lleguen, antes de gastarlos.

Para un análisis más detallado de lo que lee exactamente un explorador de bloques, consulta [Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see).

---

## Segunda elección: quién recibe una clave

La privacidad [privacy] que nunca puedes levantar no es útil. A veces necesitas demostrar algo a un contador, un auditor o una oficina tributaria. Zcash gestiona esto sin pedirte que renuncies al control.

**Clave de gasto [spending key].** Ve todo y mueve fondos. Este es el dinero. Permanece contigo y nunca se comparte con nadie, por ningún motivo.

**Full Viewing Key.** De solo lectura. Muestra la actividad entrante y saliente, así como los saldos, pero no puede gastar ni un solo zatoshi. Esto es lo que entregas a un auditor o contador.

**Incoming Viewing Key.** Más limitada todavía: muestra únicamente los pagos que llegan. Un exchange o comerciante puede ejecutar esto para confirmar que tu depósito llegó, mientras la clave de gasto permanece en hardware que nunca toca internet.

El orden importa. Entrega la clave más limitada que haga el trabajo, no la más amplia que tengas.

---

## La parte que los principiantes no perciben

**Una clave de visualización no puede revocarse.** No existe un botón para «deshacer compartir». Una vez que alguien la tiene, puede leer esa dirección mientras exista. Si necesitas cortar el acceso, mueve tus fondos a una dirección nueva.

**Las tarifas son públicas incluso en un pago totalmente blindado.** El importe está oculto; la tarifa no.

**Lo público es permanente.** Todo lo que muestra la red [chain] hoy, lo mostrará dentro de veinte años. Decidir blindar un pago *después* de enviarlo no es algo que puedas hacer.

---

## Ponlo en práctica

- Usa una billetera [wallet] que blinde de forma predeterminada, como [ZODL](https://zodl.com) o [Zingo!](https://www.zingolabs.org/).
- Blinda los fondos en cuanto lleguen desde un exchange, antes de gastarlos.
- Paga a direcciones blindadas siempre que el destinatario admita una.
- Antes de compartir una clave de visualización, pregunta qué clave es la más limitada que responde a la pregunta planteada.

---

## Recursos

- [Explicación de las claves de visualización (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgación selectiva [selective disclosure] y claves de visualización (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Claves de visualización](https://zips.z.cash/zip-0310)
- [Cómo funciona la tecnología de Zcash](https://z.cash/technology/)

## Páginas relacionadas

- [Conceptos básicos de Zcash](/start-here/what-is-zec-and-zcash)
- [Guía para nuevos usuarios de Zcash](/start-here/new-user-guide)
- [Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see)
- [Claves de visualización](/zcash-tech/viewing-keys)
- [Transacciones](/using-zcash/transactions)

---

*Si deseas añadir o sugerir modificaciones a esta página wiki, dirígete al repositorio [ZecHub GitHub](https://github.com/ZecHub/zechub) y envía una pull request.*
