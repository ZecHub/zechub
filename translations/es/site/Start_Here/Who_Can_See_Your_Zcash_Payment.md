<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ¿Quién puede ver tu pago de Zcash?

## Resumen rápido

- Zcash te ofrece **dos tipos de dirección**: transparentes (`t`) y blindadas (`z` o `u`).
- Cuánto puede ver el público depende de entre qué tipos se mueve tu pago.
- Solo un pago **de blindada a blindada** oculta al remitente, al destinatario y el monto.
- Una dirección blindada no es una sola clave. Es un pequeño conjunto de claves, y puedes dar **acceso de solo lectura sin ceder la capacidad de gastar**.
- Una viewing key **no puede retirarse** una vez que la compartes.

---

## Lo primero que hay que entender

En la mayoría de las blockchains no hay elección posible. Todo lo que envías es público, para siempre, para cualquiera que mire.

Zcash te da una elección en su lugar. Esa elección se hace dos veces: **una cuando eliges a qué dirección enviar, y otra cuando decides quién recibe una clave para leer tu historial.**

La imagen de abajo cubre ambas.

![Tipos de claves de Zcash y lo que un explorador de bloques puede ver para cada una de las cuatro rutas de transacción](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Primera elección: qué dirección

Cada pago de Zcash se mueve entre dos direcciones, y cada una puede ser transparente o blindada. Eso da cuatro rutas, y cada una filtra una cantidad distinta de información.

El patrón es más simple de lo que parece: **todo lo que toca una dirección transparente se vuelve público.** Un pago que permanece dentro del pool blindado todo el tiempo no revela nada excepto la comisión.

Esto importa especialmente cuando retiras desde un exchange. Muchos exchanges solo envían a direcciones transparentes, por lo que el retiro es público. Blinda los fondos tú mismo en cuanto lleguen, antes de gastarlos.

Para una explicación más profunda de qué lee exactamente un explorador, consulta [Qué puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see).

---

## Segunda elección: quién recibe una clave

Una privacidad que nunca puedes levantar no es útil. A veces necesitas demostrar algo a un contador, un auditor o una oficina tributaria. Zcash resuelve esto sin pedirte que renuncies al control.

**Spending key.** Ve todo y mueve fondos. Este es el dinero. Se queda contigo y nunca se comparte con nadie, por ninguna razón.

**Full viewing key.** Solo lectura. Muestra actividad entrante y saliente y saldos, pero no puede gastar ni un solo zatoshi. Esto es lo que entregas a un auditor o contador.

**Incoming viewing key.** Aún más limitada: muestra solo los pagos que llegan. Un exchange o un comerciante puede usarla para confirmar que tu depósito llegó, mientras la spending key permanece en hardware que nunca toca internet.

El orden importa. Entrega la clave más limitada que haga el trabajo, no la más amplia que tengas a mano.

---

## La parte que los principiantes pasan por alto

**Una viewing key no puede revocarse.** No existe un botón de "deshacer compartir". Una vez que alguien la tiene, puede leer esa dirección durante todo el tiempo que exista. Si necesitas cortar el acceso, mueves tus fondos a una nueva dirección.

**Las comisiones son públicas incluso en un pago totalmente blindado.** El monto está oculto; la comisión, no.

**Lo público es permanente.** Todo lo que la cadena muestra hoy, lo mostrará dentro de veinte años. Decidir blindar un pago *después* de haberlo enviado no es algo que puedas hacer.

---

## Ponlo en práctica

- Usa una wallet que blinde por defecto, como [Zodl](https://zodl.com) o [Ywallet](https://ywallet.app/).
- Blinda los fondos en cuanto lleguen desde un exchange, antes de gastarlos.
- Paga a direcciones blindadas siempre que el receptor admita una.
- Antes de compartir una viewing key, pregunta cuál es la clave más pequeña que responde a la pregunta que se está haciendo.

---

## Recursos

- [Explicación de las viewing keys (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgación selectiva y viewing keys (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing keys](https://zips.z.cash/zip-0310)
- [Cómo funciona la tecnología de Zcash](https://z.cash/technology/)

## Páginas relacionadas

- [Conceptos básicos de Zcash](/start-here/what-is-zec-and-zcash)
- [Guía para nuevos usuarios de Zcash](/start-here/new-user-guide)
- [Qué puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Transacciones](/using-zcash/transactions)

---

*Si deseas añadir o sugerir ediciones a esta página del wiki, dirígete al [repositorio de GitHub de ZecHub](https://github.com/ZecHub/zechub) y envía un pull request.*
