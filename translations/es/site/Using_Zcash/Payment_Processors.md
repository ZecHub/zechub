---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Procesadores de pago de Zcash

Formas de aceptar ZEC como comerciante, comparadas lado a lado. Cada entrada fue verificada con el propio sitio y la API del proveedor el **29 de julio de 2026**.

El soporte para activos de privacidad cambia con frecuencia, por lo que cada fila lleva su propia fecha de verificación. Si estás leyendo esto meses después, revisa el sitio del proveedor antes de integrarlo.

<div class="processor-table">

| Procesador | Custodia | ZEC blindado | Autoalojado | Comisión del comerciante | Regiones / KYC | Verificado |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Sin custodia | Sí, Orchard mediante Unified Addresses | Sí, código abierto | 1% por pago, gratis si es autoalojado | Sin KYC, regiones no indicadas | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Sin custodia, solo viewing key | Sí, solo blindado (Sapling, Orchard, UA) | Sí, código abierto | Ninguna, solo pagas las comisiones de red | Global, sin KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Sin custodia | Sí, Sapling y Orchard | No, servicio alojado | Sesión prepaga, precio no publicado | Sin KYC indicado, regiones no indicadas | 2026-07-29 |
| [Flexa](https://flexa.co/) | Autocustodia del cliente, el comerciante liquida en fiat | El cliente gasta blindado, lado receptor no documentado | No | 1% por pago | EE. UU. y 37 países SEPA, ZEC en la UE sin confirmar | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Sin custodia por defecto | No, solo dirección transparente | No | 0.5%, o 1% con conversión | Global excepto donde esté prohibido, sin KYC al inicio | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Con custodia, pese al marketing | No documentado | No | 0.5% API, 1.5% white label | Sin KYC para recibir | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Con custodia, off-chain | No, los depósitos blindados se rechazan | No | Gratis de wallet a wallet, 0.8% en pagos salientes | Restringido geográficamente, ZEC excluido en FR, ES, IT, PL | 2026-07-29 |

</div>

### Qué significan las columnas

**Custodia** indica si el procesador mantiene tu ZEC. Sin custodia significa que va a una wallet que controlas.

**ZEC blindado** indica si puedes recibir pagos en el pool blindado. Solo transparente significa que el monto y las direcciones son públicos en la blockchain.

**Autoalojado** indica si puedes ejecutar el software tú mismo, sin una empresa en medio.

**Comisión del comerciante** excluye las comisiones de red de Zcash, que alguien paga en todos los casos.

Cuando un proveedor no publica algo, la entrada dice "no indicado" o "no documentado" en lugar de adivinar. Eso no es lo mismo que "no".

### Cuál elegir

Para obtener la mayor privacidad y control, usa **BTCPay Server** o **CipherPay** autoalojado. Ambos son blindados, de código abierto y no mantienen fondos por ti.

Para aceptar pagos en una tienda física en lugar de online, usa **Flexa**.

Para una pasarela alojada donde los pagos transparentes sean aceptables, usa **NOWPayments** o **Plisio**.

Hay una advertencia que vale la pena repetir: un procesador solo transparente publica cada monto de pago y dirección en la blockchain. Y con cualquier procesador alojado sin custodia entregas tu viewing key, así que la empresa puede ver tus pagos aunque no pueda gastarlos. El autoalojamiento es la única manera de evitar eso.

<div class="processor-note">

**Advertencia sobre el servicio ZGo, 29 de julio de 2026.** El backend de ZGo en api.zgo.cash devolvió HTTP 503 en todos los endpoints mientras se verificaba esta página. El proyecto no está abandonado y su mantenedor estuvo activo en la comunidad este mes, pero confirma que el servicio esté funcionando antes de depender de él.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Tipo de soporte**: Blindado (Orchard, mediante Unified Addresses)
- **Descripción**: Acepta Zcash en minutos, sin custodia, cero datos del comprador, sin intermediarios.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Le das a CipherPay una viewing key de solo lectura, por lo que los pagos van directamente a tu propia wallet y nunca mantiene fondos. Usa una dirección nueva para cada factura.

Solo Orchard. No hay soporte para Sapling ni transparente, aunque el README del repositorio menciona Sapling.

Cuesta 1% por pago, y nada en absoluto si lo ejecutas tú mismo. Todo es de código abierto, como binario en Rust con SQLite o como imagen de Docker. No hay KYC, y los compradores no necesitan una cuenta.

Las integraciones cubren Shopify, WooCommerce, una API REST, checkout alojado, enlaces de pago y QR en persona.

Hay dos cosas a considerar. Se lanzó en febrero de 2026 y no tiene una auditoría de seguridad publicada. Y en el nivel alojado el operador mantiene tu viewing key, por lo que puede ver tus pagos. El autoalojamiento elimina eso. Los pagos blindados también son finales, así que un reembolso requiere que el comprador te dé una dirección.

**Última verificación:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Tipo de soporte**: Solo blindado (Sapling, Orchard, Unified Address)
- **Descripción**: BTCPay Server es un procesador de pagos de criptomonedas de código abierto y autoalojado.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

La opción más sólida en custodia. Su backend de wallet es solo de lectura y no mantiene seed ni clave secreta, así que ni siquiera un servidor comprometido puede gastar tu dinero.

Solo blindado, cubriendo Sapling, Orchard y Unified Addresses. No hay alternativa transparente, así que no planifiques contando con una.

Para instalarlo necesitas el fork Docker btcpay-zcash en la rama feat/zec, además de una viewing key exportada desde una wallet como Ywallet o Zingo. Por defecto se comunica con un lightwalletd remoto, o puedes ejecutar Zebra y lightwalletd tú mismo.

Una limitación importante: el plugin usa una sola wallet de Zcash para cada tienda en una instancia, así que no lo ejecutes en un servidor compartido. Se está trabajando en wallets por tienda.

No hay comisión del propio software. Pagas las comisiones de red de Zcash y el costo de tu hosting.

**Última verificación:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Tipo de soporte**: Blindado (Sapling y Orchard)
- **Descripción**: ZGo es una plataforma de pagos electrónicos que va directamente de tu cliente a ti, sin terceros involucrados.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Una caja registradora que ejecutas en un navegador, de modo que una laptop, tablet o teléfono se convierte en el checkout. También hay un plugin para WooCommerce y una API REST. Fue desarrollado por Vergara Technologies y financiado por Zcash Community Grants, incluida la migración de zcashd a Zebra.

Los fondos van del cliente directamente a tu wallet, sin nadie en medio.

Blindado, cubre Sapling y Orchard mediante Unified Addresses, y sigue ZIP 321. Ninguna fuente actual dice que maneje direcciones transparentes, así que esta página ya no afirma que lo haga.

Realmente no puedes autoalojarlo. ZGo ejecuta la infraestructura de Zcash por ti y no publica ninguna guía de despliegue. El código fuente es público en el propio servidor Git del mantenedor, aunque la copia en GitLab que la gente suele encontrar es un mirror obsoleto de 2022.

Tampoco es gratis. ZGo vende sesiones prepagas y necesita una sesión Pro para WooCommerce, pero la página de precios actualmente no es accesible, así que aquí no se cita ninguna cifra.

**Última verificación:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Tipo de soporte**: El cliente gasta blindado, lado receptor no documentado
- **Descripción**: Flexa es una red de pagos que permite a los clientes gastar activos digitales, incluido Zcash, en comercios minoristas desde una wallet de autocustodia.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa no es una pasarela de checkout, así que no sustituye a las demás de aquí. El cliente abre una wallet compatible con Flexa como Zodl, muestra un código de un solo uso y la tienda lo escanea. No hay factura en ZEC ni plugin de e-commerce.

El cliente conserva sus propias monedas hasta el momento de pagar. Tú, como comerciante, nunca recibes ZEC. Flexa liquida contigo en la moneda que elijas, así que ellos gestionan la parte cripto.

El propio anuncio de Flexa describe la integración de Zcash como pagos con ZEC blindado. No se publica en ningún lugar qué tipo de dirección recibe Flexa.

La comisión es del 1% por pago, con conversión y custodia incluidas sin costo adicional.

Funciona en Estados Unidos y, desde julio de 2026, en 37 países y territorios SEPA. No se indica si ZEC en particular puede gastarse en Europa.

**Última verificación:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Tipo de soporte**: Solo transparente
- **Descripción**: NOWPayments es una pasarela de pagos cripto que permite a los comerciantes aceptar pagos y donaciones en Zcash fácilmente.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Sin soporte blindado. Su documentación te indica configurar una dirección transparente para Zcash, y ZEC es la única moneda que destacan de esa manera. Cada pago que recibes es público en la blockchain.

Sin custodia por defecto. Su FAQ dice que no almacenan fondos y nunca mantienen claves privadas. Hay un balance opcional con custodia, así que revisa la configuración de tu cuenta si necesitas estar seguro.

Las comisiones son 0.5% para un pago directo, o 1% para pagos en múltiples monedas, a tipo fijo o con "comisión pagada por el usuario", con las comisiones de red aparte.

Disponible globalmente excepto donde la ley lo prohíba. No necesitas KYC para empezar a aceptar cripto, solo para retirar fiat.

**Última verificación:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Tipo de soporte**: Transparente (no documentado)
- **Descripción**: Plisio es una pasarela de pagos de criptomonedas que permite a las empresas aceptar pagos en Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Trátalo como custodial. El marketing de Plisio lo llama sin custodia, pero sus propias páginas de ayuda describen balances mantenidos en la plataforma, almacenamiento en frío y un proceso de retiro. No se pudo confirmar la afirmación de que sea sin custodia.

Plisio nunca dice qué tipos de dirección de Zcash usa, así que asume transparente hasta que alguien confirme lo contrario.

La wallet es gratis, la pasarela y la API cuestan 0.5%, y White Label 1.5%. White Label es un rebranding de su servicio alojado, no autoalojamiento.

No necesitas KYC para recibir pagos, y no se publica ninguna lista de países restringidos.

**Última verificación:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Tipo de soporte**: Solo transparente, los depósitos blindados se rechazan
- **Descripción**: Binance Pay es una plataforma de pagos con criptomonedas que admite pagos en Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance rechaza ZEC enviado desde direcciones blindadas. Ese rechazo es la razón por la que se crearon las direcciones TEX.

Es totalmente custodial. Los pagos se mueven off-chain entre wallets de Binance Pay, y necesitas una cuenta de Binance verificada.

Las transferencias de wallet a wallet son gratis, los pagos salientes para comerciantes cuestan 0.8% con tope de 5 USD, y los comerciantes de Mini Program pagan 1%.

Revisa la disponibilidad donde estás antes de depender de ello. Binance Pay no se ofrece en algunos países e industrias, ZEC fue excluido para usuarios en Francia, España, Italia y Polonia desde 2023, y el servicio en el EEE se ha visto afectado bajo MiCA.

**Última verificación:** 2026-07-29

---

### Ya no aceptan ZEC

Ambos estaban listados aquí antes. La lista de monedas en vivo de cada proveedor se verificó el 29 de julio de 2026 y Zcash ya no aparece en ninguno de los dos.

**CoinPayments** no lista ZEC en su lista de monedas v2, su lista heredada ni su API de monedas en vivo, y su artículo sobre Zcash ahora redirige a la página principal.

**CoinGate** no lista ZEC en su página de monedas admitidas ni en su API pública. No se anunció ninguna exclusión, así que la razón y la fecha son desconocidas.

Si cualquiera de los dos vuelve a incorporar Zcash, añádelo de nuevo con una fecha de verificación actualizada.

### Mantener esta página precisa

El soporte para privacy coins cambia, así que esta página solo es tan buena como su última verificación. Cuando la revises:

1. Revisa la propia lista de monedas o API del proveedor. Las listas de terceros estaban desactualizadas para ambos procesadores eliminados arriba.
2. Revisa qué tipos de dirección de Zcash son compatibles. "Compatible con Zcash" normalmente significa solo direcciones transparentes.
3. Actualiza la fecha de verificación en la tabla y en la sección de ese proveedor.
