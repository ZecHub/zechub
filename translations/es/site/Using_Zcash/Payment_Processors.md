<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Procesadores de pago [Payment Processors] de Zcash

Formas de aceptar ZEC como comerciante, comparadas lado a lado. Cada entrada se verificó con el propio sitio y la API del proveedor el **29 de julio de 2026**, salvo Zcash Payment Service, añadida el **1 de noviembre de 2026**.

La compatibilidad con activos de privacidad [privacy] cambia con frecuencia, por lo que cada fila incluye su propia fecha de verificación. Si estás leyendo esto meses después, consulta el sitio del proveedor antes de integrarlo.

<div class="processor-table">

| Procesador [Processor] | Custodia [Custody] | Blindado [Shielded] ZEC | Autoalojamiento [Self-host] | Tarifa del comerciante [Merchant fee] | Regiones / KYC | Verificado [Verified] |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Sin custodia [Non-custodial] | Sí, Orchard mediante Direcciones Unificadas | Sí, código abierto | 1% por pago, gratis si se autoaloja | Sin KYC, regiones no indicadas | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Sin custodia, solo clave de visualización | Sí, solo blindado (Sapling, Orchard, UA) | Sí, código abierto | Ninguna, solo pagas las tarifas de red | Global, sin KYC | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | Sin custodia, solo clave de visualización entrante | Sí, solo blindado (Sapling y Orchard) | Sí, solo autoalojado, código abierto | Ninguna, solo pagas las tarifas de red | Sin cuenta, sin KYC | 2026-11-01 |
| [ZGo](https://zgo.cash/) | Sin custodia | Sí, Sapling y Orchard | No, servicio alojado | Sesión prepagada, precio no publicado | No se indica KYC, regiones no indicadas | 2026-07-29 |
| [Flexa](https://flexa.co/) | Autocustodia del cliente, el comerciante liquida en moneda fiduciaria | El cliente gasta fondos blindados, el lado receptor no está documentado | No | 1% por pago | EE. UU. y 37 países SEPA, ZEC en la UE sin confirmar | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Sin custodia de forma predeterminada | No, solo dirección [address] transparente | No | 0,5%, o 1% con conversión | Global salvo donde esté prohibido, sin KYC para empezar | 2026-07-29 |
| [Plisio — pagos suspendidos](https://plisio.net/) | En custodia [Custodial], pese a su marketing | No documentado | No | 0,5% API, 1,5% white label | Sin KYC para recibir | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | En custodia, off-chain | No, se rechazan los depósitos blindados | No | Billetera [wallet] a billetera gratis, 0,8% en pagos salientes | Con restricciones geográficas, ZEC excluido de la lista en FR, ES, IT, PL | 2026-07-29 |

</div>

### Qué significan las columnas

**Custodia** indica si el procesador conserva tu ZEC. Sin custodia significa que va a una billetera que controlas.

**ZEC blindado** indica si puedes recibir pagos en el pool blindado [pool]. Solo transparente significa que el importe y las direcciones son públicos en la blockchain.

**Autoalojamiento** indica si puedes ejecutar el software tú mismo, sin ninguna empresa de por medio.

**Tarifa del comerciante** excluye las tarifas de red de Zcash, que alguien paga en todos los casos.

Cuando un proveedor no publica algo, la entrada dice «no indicado» o «no documentado» en vez de suponerlo. Eso no equivale a «no».

### Cuál elegir

Para obtener la máxima privacidad y control, usa **BTCPay Server**, un **CipherPay** autoalojado o **Zcash Payment Service** si puedes añadir un poco de código a tu sitio. Los tres son blindados, de código abierto y no retienen fondos por ti.

Para aceptar pagos en una tienda en vez de en línea, usa **Flexa**.

Para una pasarela alojada donde los pagos transparentes sean aceptables, usa **NOWPayments** o **Plisio**.

Conviene repetir una advertencia: un procesador que solo admite pagos transparentes publica cada importe y dirección de pago en la blockchain. Y con cualquier procesador alojado sin custodia entregas tu clave de visualización, por lo que la empresa puede ver tus pagos aunque no pueda gastarlos. El autoalojamiento es la única forma de evitarlo.

<div class="processor-note">

**Advertencia de servicio de ZGo, 29 de julio de 2026.** El backend de ZGo en api.zgo.cash devolvió HTTP 503 en todos los endpoints mientras se verificaba esta página. El proyecto no está abandonado y su mantenedor estuvo activo en la comunidad este mes, pero confirma que el servicio esté funcionando antes de depender de él.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Tipo de compatibilidad**: Blindado (Orchard, mediante Direcciones Unificadas)
- **Descripción**: Acepta Zcash en minutos, sin custodia, sin datos del comprador y sin intermediarios.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Le das a CipherPay una clave de solo visualización, por lo que los pagos van directamente a tu propia billetera y nunca retiene fondos. Utiliza una dirección nueva para cada factura.

Solo Orchard. No hay compatibilidad con Sapling ni con pagos transparentes, aunque el README del repositorio menciona Sapling.

Cuesta un 1% por pago, y nada en absoluto si lo ejecutas tú mismo. Todo es de código abierto, como binario de Rust con SQLite o como imagen de Docker. No hay KYC y los compradores no necesitan una cuenta.

Las integraciones incluyen Shopify, WooCommerce, una API REST, checkout alojado, enlaces de pago y QR presencial.

Hay dos aspectos que valorar. Se lanzó en febrero de 2026 y no tiene una auditoría de seguridad publicada. Además, en el nivel alojado el operador conserva tu clave de visualización, por lo que puede ver tus pagos. El autoalojamiento elimina eso. Los pagos blindados también son definitivos, así que para un reembolso el comprador debe darte una dirección.

**Última verificación:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Tipo de compatibilidad**: Solo blindado (Sapling, Orchard, Dirección Unificada)
- **Descripción**: BTCPay Server es un procesador de pagos de criptomonedas de código abierto y autoalojado.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Es la opción más sólida respecto a la custodia. Su backend de billetera es de solo visualización y no conserva ninguna semilla ni clave secreta, por lo que ni siquiera un servidor comprometido puede gastar tu dinero.

Solo blindado, cubre Sapling, Orchard y Direcciones Unificadas. No existe una alternativa transparente, así que no planifiques contando con una.

Para instalarlo necesitas el fork de Docker de btcpay-zcash en la rama feat/zec, además de una clave de visualización exportada desde una billetera como Zkool o Zingo. De forma predeterminada se comunica con un lightwalletd remoto, o puedes ejecutar Zebra y lightwalletd tú mismo.

Una limitación que debes conocer: el plugin utiliza una única billetera de Zcash para cada tienda de una instancia, así que no lo ejecutes en un servidor compartido. Se está trabajando en billeteras por tienda.

No hay tarifa para el software en sí. Pagas las tarifas de red de Zcash y lo que cueste tu alojamiento.

**Última verificación:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **Tipo de compatibilidad**: Solo blindado (Sapling y Orchard)
- **Descripción**: Un procesador de pagos de Zcash gratuito y autoalojado para comerciantes en línea, ejecutado como un contenedor Docker o integrado como una crate Rust.
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Un procesador [processor] gratuito y de código abierto (MIT), creado por Andrew Arnott, quien ya lo usa para pagos reales en su propia aplicación.

Solo conserva una clave de visualización entrante [incoming viewing key] (una UIVK). Puede ver llegar los pagos, pero no puede gastarlos, por lo que ni siquiera un servidor comprometido puede mover tus fondos. La clave permanece en tu propio servidor, así que ninguna empresa ve tus pagos tampoco.

Cada proceso de pago recibe una nueva dirección unificada [unified address] con receptores Sapling y Orchard, y ninguno transparente. Los pagos van directamente a tu propia billetera [wallet].

No hay tarifa [fee], ni cuenta ni medidor de uso. Pagas las tarifas de red de Zcash y tu alojamiento.

Solo funciona de forma autoalojada [self-hosted]: un contenedor Docker o un crate Rust dentro de una aplicación que ya ejecutas. Lee la red [chain] desde un servidor lightwalletd que elijas, por lo que no necesitas un nodo completo [full node].

Configurarlo requiere código, no un complemento [plugin]. En el proceso de pago, tu sitio solicita al servicio una dirección [address] de pago [payment] y un código QR, y el servicio informa a tu sitio cuando llega el dinero mediante webhooks firmados. Hay un cliente npm para JavaScript y backends TypeScript, y una [tienda de demostración](https://github.com/nerdcash/zcash-payment-demo-store) de código abierto para tomar como referencia. No existe un complemento para Shopify ni WooCommerce, por lo que necesitas controlar el código de tu sitio o contar con un desarrollador que lo haga.

Aspectos a considerar [Things to weigh]. Es nuevo: el repositorio comenzó en junio de 2026, el cliente npm está en la versión 0.1, aún no hay lanzamientos etiquetados y no existe una auditoría de seguridad publicada. Su API no tiene inicio de sesión propio, así que mantenlo en una red privada y nunca lo expongas a internet. Y, como ocurre con cualquier pago blindado [shielded payment], un reembolso necesita que el comprador te proporcione una dirección.

**Última verificación [Last verified]:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Tipo de compatibilidad**: Blindado (Sapling y Orchard)
- **Descripción**: ZGo es una plataforma de pagos electrónicos que va directamente de tu cliente a ti, sin terceros involucrados.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Una caja registradora que ejecutas en un navegador, por lo que una laptop, tableta o teléfono se convierte en el checkout. También hay un plugin de WooCommerce y una API REST. Fue creada por Vergara Technologies y financiada por Zcash Community Grants, incluida la migración de zcashd a Zebra.

Los fondos van del cliente directamente a tu billetera, sin nadie en medio.

Es blindado, cubre Sapling y Orchard mediante Direcciones Unificadas, y sigue ZIP 321. Ninguna fuente actual indica que gestione direcciones transparentes, así que esta página ya no afirma que lo haga.

En realidad no puedes autoalojarlo. ZGo ejecuta la infraestructura de Zcash por ti y no publica ninguna guía de despliegue. Sin embargo, el código fuente es público en el propio servidor Git del mantenedor, aunque la copia de GitLab que suele encontrar la gente es un espejo desactualizado de 2022.

Tampoco es gratis. ZGo vende sesiones prepagadas y necesita una sesión Pro para WooCommerce, pero la página de precios no está disponible actualmente, así que aquí no se cita ninguna cifra.

**Última verificación:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Tipo de compatibilidad**: El cliente gasta fondos blindados, el lado receptor no está documentado
- **Descripción**: Flexa es una red de pagos que permite a los clientes gastar activos digitales, incluido Zcash, en establecimientos minoristas desde una billetera de autocustodia.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa no es una pasarela de checkout, así que no es un sustituto de los demás aquí. El cliente abre una billetera habilitada para Flexa, como Zodl, muestra un código de un solo uso y la tienda lo escanea. No hay factura de ZEC ni plugin de comercio electrónico.

El cliente conserva sus propias monedas hasta el momento del pago. Tú, como comerciante, nunca recibes ZEC. Flexa liquida contigo en la moneda que elijas, por lo que ellos gestionan la parte cripto.

El anuncio propio de Flexa describe la integración de Zcash como un pago con ZEC blindado. No se publica en ninguna parte qué tipo de dirección recibe Flexa.

La tarifa es del 1% por pago, con conversión y custodia incluidas sin coste adicional.

Funciona en Estados Unidos y, desde julio de 2026, en 37 países y territorios SEPA. No se indica si ZEC en particular puede gastarse en Europa.

**Última verificación:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Tipo de compatibilidad**: Solo transparente
- **Descripción**: NOWPayments es una pasarela de pagos cripto que permite a los comerciantes aceptar fácilmente pagos y donaciones de Zcash.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

No admite pagos blindados. Su documentación te indica configurar una dirección transparente para Zcash, y ZEC es la única moneda que destaca de ese modo. Todos los pagos que recibas son públicos en la blockchain.

Sin custodia de forma predeterminada. Sus preguntas frecuentes indican que no almacenan fondos ni conservan claves privadas. Hay un saldo opcional en custodia, así que consulta la configuración de tu cuenta si necesitas asegurarte.

Las tarifas son del 0,5% para un pago directo, o del 1% para pagos multidivisa, de tipo de cambio fijo o «tarifa pagada por el usuario», más las tarifas de red.

Disponible globalmente salvo donde la ley lo prohíba. No necesitas KYC para comenzar a aceptar criptomonedas, solo para retirar moneda fiduciaria.

**Última verificación:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />

> **Pagos suspendidos [Payments suspended] — comprobado el 12 de noviembre de 2026.** La [página de inicio](https://plisio.net/) de Plisio indica que los pagos entrantes y salientes están suspendidos temporalmente mientras se realizan trabajos de restauración. Consulta con el proveedor antes de enviar fondos. Su página específica para Zcash devuelve actualmente un error 404; esto no demuestra que ZEC haya sido excluido de la lista. Los detalles sobre la tarifa [fee], la custodia [custody] y la compatibilidad con direcciones [address-support] que aparecen a continuación se revisaron por última vez el 29 de julio de 2026 y no se han vuelto a verificar.

- **Tipo de soporte**: Transparente [Transparent] (no documentado)
- **Descripción**: Plisio es una pasarela de pago [payment gateway] de criptomonedas que ha incluido soporte para Zcash. El procesamiento de pagos está suspendido actualmente; consulta el aviso fechado arriba.
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Trátalo como un servicio en custodia. El marketing de Plisio lo llama sin custodia, pero sus propias páginas de ayuda describen saldos conservados en la plataforma, almacenamiento en frío y un proceso de retirada. No se pudo confirmar la afirmación de que no tiene custodia.

Plisio nunca indica qué tipos de dirección de Zcash utiliza, así que considera que son transparentes hasta que alguien confirme lo contrario.

La billetera es gratuita, la pasarela y la API cuestan un 0,5%, y White Label cuesta un 1,5%. White Label es una reedición de su servicio alojado, no autoalojamiento.

No necesitas KYC para recibir pagos y no se publica ninguna lista de países restringidos.

**Última verificación:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Tipo de compatibilidad**: Solo transparente, se rechazan los depósitos blindados
- **Descripción**: Binance Pay es una plataforma de pagos con criptomonedas que admite pagos de Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance rechaza ZEC enviados desde direcciones blindadas. Ese rechazo es el motivo por el que se crearon las direcciones TEX.

Está completamente en custodia. Los pagos se mueven off-chain entre billeteras de Binance Pay, y necesitas una cuenta verificada de Binance.

Las transferencias de billetera a billetera son gratuitas, los pagos salientes para comerciantes cuestan un 0,8% con un máximo de 5 USD, y los comerciantes de Mini Program pagan un 1%.

Comprueba la disponibilidad donde estés antes de depender de él. Binance Pay no se ofrece en algunos países e industrias, ZEC fue excluido de la lista para usuarios de Francia, España, Italia y Polonia desde 2023, y el servicio en el EEE se ha visto interrumpido bajo MiCA.

**Última verificación:** 2026-07-29

---

### Ya no aceptan ZEC

Ambos estaban listados aquí antes. La lista de monedas activa de cada proveedor se verificó el 29 de julio de 2026 y Zcash ya no aparece en ninguna de las dos.

**CoinPayments** no incluye ZEC en su lista de monedas v2, su lista heredada ni su API de monedas activas, y su artículo de Zcash ahora redirige a la página principal.

**CoinGate** no incluye ZEC en su página de monedas compatibles ni en su API pública. No se anunció ninguna exclusión de la lista, por lo que se desconocen el motivo y la fecha.

Si cualquiera de ellos vuelve a incluir Zcash, añádelo de nuevo con una fecha de verificación actualizada.

### Cómo mantener esta página precisa

La compatibilidad con monedas de privacidad cambia, así que esta página solo es tan buena como su última comprobación. Cuando la revises:

1. Consulta la propia lista de monedas o API del proveedor. Las listas de terceros estaban desactualizadas para ambos procesadores eliminados anteriormente.
2. Comprueba qué tipos de dirección de Zcash son compatibles. «Admite Zcash» normalmente significa solo direcciones transparentes.
3. Actualiza la fecha de verificación en la tabla y en la sección de ese proveedor.
