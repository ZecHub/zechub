<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# ZGo Payment Processor: aceptar Zcash sin custodia

ZGo es un procesador de pagos sin custodia para Zcash. Un cliente paga en ZEC desde su propia billetera, ZGo monitorea la blockchain de Zcash en busca de la transacción, y los fondos llegan directamente a la billetera del comerciante mediante una transferencia blindada. ZGo nunca retiene el dinero en ningún momento intermedio.

Esta guía explica cómo funciona el flujo de pago, cómo configurar una cuenta y cómo integrar ZGo con Xero y WooCommerce. También cubre los dos errores que causan la mayoría de los problemas en la configuración inicial.

## En esta página

1. [Por qué usar ZGo](#why-use-zgo)
2. [Cómo funciona ZGo](#how-zgo-works)
3. [Configurar una cuenta](#setting-up-an-account)
4. [ZGo con Xero](#zgo-with-xero)
5. [ZGo con WooCommerce](#zgo-with-woocommerce)
6. [Características](#features)
7. [Errores comunes](#common-mistakes)
8. [Conclusión](#conclusion)
9. [Recursos](#resources)

## Por qué usar ZGo

La mayoría de los procesadores de pago de criptomonedas son custodiales. Los fondos primero llegan a la cuenta del procesador y luego se envían al comerciante, lo que significa que un tercero controla temporalmente el dinero y puede congelarlo, retrasarlo o informar sobre él.

ZGo adopta el enfoque opuesto. Los pagos se mueven desde la billetera del cliente directamente a la billetera del comerciante mediante una transacción blindada de Zcash. El procesador solo genera la factura y observa la blockchain para confirmar la transacción. No hay saldo intermediario, no hay flujo de retiro y no hay un tercero que pueda retrasar la liquidación.

Para un comerciante, esto significa tres cosas prácticas: custodia total del ZEC entrante, privacidad de transacciones blindadas por defecto y ninguna dependencia de que un proveedor centralizado permanezca en línea o sea solvente.

## Cómo funciona ZGo

El flujo de pago es el mismo independientemente de si ZGo se usa de forma independiente, mediante Xero o mediante WooCommerce:

1. El comerciante genera una solicitud de pago en ZGo, que se muestra como un código QR con el importe, el ID de la factura y una dirección receptora de Zcash.
2. El cliente escanea el QR con una billetera de Zcash (los tipos de dirección Orchard, Sapling y Transparent son compatibles en el plugin de WordPress) y aprueba el pago.
3. La transacción se transmite a la red de Zcash como una transferencia blindada desde la billetera del cliente a la billetera del comerciante.
4. ZGo monitorea la blockchain de Zcash en busca de la transacción.
5. Después de cinco confirmaciones, ZGo marca el pago como final y notifica a cualquier integración conectada (Xero, WooCommerce o un webhook).

El umbral de cinco confirmaciones es la cifra clave. Cualquier cosa anterior es un pago en curso, no un pago recibido. El cumplimiento del pedido, las actualizaciones de inventario y cualquier acción irreversible por parte del comerciante deben esperar hasta el paso 5.

ZGo funciona en cualquier navegador moderno de escritorio o móvil, sin instalación en ninguno de los dos lados. El cliente necesita una billetera de Zcash; el comerciante necesita una billetera de Zcash y una cuenta de ZGo.

<img width="672" height="378" alt="Resumen de la solicitud de pago de ZGo y del monitoreo de la blockchain" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Configurar una cuenta

Para crear una cuenta de ZGo, se requiere una billetera de Zcash con una pequeña cantidad de ZEC. Ese pequeño saldo de ZEC cubre la comisión on-chain de la transacción de inicialización de la cuenta. Cualquier billetera importante de Zcash sirve para esto; consulta [ZecHub Wallets](https://zechub.wiki/wallets) para ver las opciones actuales.

La configuración básica:

1. Abre [zgo.cash](https://zgo.cash/) en un navegador.
2. Crea una cuenta usando una billetera de Zcash bajo el control del comerciante. Esta billetera debe poseer las claves. Una dirección de depósito de exchange no funcionará (consulta [Errores comunes](#common-mistakes)).
3. Verifica la billetera enviando la pequeña transacción de inicialización.
4. Configura la dirección receptora. Todos los pagos procesados a través de esta cuenta llegarán a esta billetera.

Una vez que la cuenta está activa, el mismo comerciante puede usar ZGo para pagos únicos (un solo código QR en un evento pop-up) o integrarlo en una configuración permanente mediante Xero o WooCommerce.

## ZGo con Xero

[Xero](https://www.xero.com/) es una plataforma de contabilidad en la nube utilizada por muchas pequeñas y medianas empresas. La integración ZGo–Xero permite a un comerciante emitir una factura en Xero, hacer que el cliente la pague en ZEC y que Xero marque automáticamente la factura como pagada una vez que la transacción se confirma.

Cómo funciona:

1. El comerciante crea una factura en Xero como de costumbre.
2. ZGo adjunta una opción de pago con Zcash a la factura.
3. El cliente paga en ZEC mediante su billetera.
4. ZGo monitorea la [blockchain de Zcash](https://z.cash/) en busca de la transacción.
5. Después de cinco confirmaciones, ZGo informa del pago a Xero, que marca la factura como liquidada.

El ZEC llega a la billetera del comerciante, no a ninguna cuenta controlada por ZGo o por Xero. El registro contable en Xero se mantiene sincronizado automáticamente con la liquidación on-chain.

Para la configuración inicial, sigue la guía específica: [Xero Integration Configuration](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo con WooCommerce

Para tiendas en línea que funcionan con [WooCommerce](https://woocommerce.com/) y [WordPress](https://wordpress.org/), ZGo ofrece un plugin específico. El plugin añade Zcash como método de pago al finalizar la compra y gestiona automáticamente el estado del pedido cuando el pago se confirma.

<img width="672" height="378" alt="Flujo de compra y pedido del plugin WooCommerce de ZGo" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Flujo completo dentro de una tienda WooCommerce:

1. El cliente llega a la página de pago y selecciona Zcash como método de pago.
2. El plugin genera una solicitud de pago y muestra el código QR en la página de pago.
3. El cliente paga desde su billetera.
4. La transacción se transmite a la red de Zcash y ZGo comienza a monitorearla.
5. Después de cinco confirmaciones, ZGo informa al plugin que el pago es final.
6. El plugin marca el pedido de WooCommerce como pagado y actualiza la base de datos de pedidos.

El pedido solo se considera pagado cuando se completa el paso 6. Los estados anteriores (transmisión, primeras confirmaciones) pueden mostrarse al cliente como "pago recibido, esperando confirmación", pero el inventario, la preparación del pedido y cualquier automatización posterior deben esperar al estado final.

El plugin también instala un panel administrativo dentro de WordPress, donde el comerciante puede monitorear los pedidos y los pagos entrantes en ZEC junto con la vista normal de pedidos de WooCommerce. El plugin es compatible con todos los tipos actuales de direcciones de Zcash: Orchard, Sapling y Transparent. Los clientes que paguen desde cualquier billetera compatible pueden completar la transacción.

## Características

**Sin custodia.** Los pagos se mueven directamente desde la billetera del cliente a la billetera del comerciante mediante transacciones blindadas. ZGo nunca retiene los fondos en ningún momento intermedio, y el comerciante conserva el control total en todo momento.

**Implementación flexible.** ZGo puede usarse durante una sola tarde en un mercado pop-up, para una configuración permanente en un punto de venta o como backend de una tienda en línea mediante las integraciones con Xero o WooCommerce.

**Basado en navegador.** No requiere instalación ni del lado del cliente ni del comerciante. ZGo funciona en cualquier navegador moderno de escritorio o móvil.

**Compatibilidad con billeteras.** Las principales billeteras de Zcash, incluidas las que admiten los tipos de dirección Orchard, Sapling y Transparent, pueden pagar una factura de ZGo sin configuración adicional del lado del cliente.

**Integraciones.** Las integraciones directas con Xero (contabilidad) y WooCommerce (comercio electrónico) cubren de forma inmediata los dos flujos de trabajo comerciales más comunes.

## Errores comunes

**Tratar el pedido como pagado antes de cinco confirmaciones.** Una transacción transmitida no es lo mismo que un pago confirmado. La transacción aún puede no confirmarse o ser reemplazada. Solo después de cinco confirmaciones ZGo informa que el pago es final, y solo entonces el pedido debe marcarse como pagado en los sistemas posteriores. Si un comerciante configura el inventario o la preparación del pedido para activarse en el evento de transmisión, los pagos fraudulentos o fallidos causarán pérdidas reales.

**Apuntar ZGo a una dirección de depósito de exchange.** Parece una dirección de Zcash, pero las direcciones de depósito de exchange están controladas por el exchange, no por el comerciante. El exchange posee las claves, lo que significa que el exchange posee los fondos, lo cual anula la razón de usar un procesador sin custodia. La dirección de billetera configurada en ZGo debe pertenecer a una billetera cuya frase semilla esté controlada directamente por el comerciante.

**Tratar ZGo como si fuera una billetera.** ZGo es un procesador de pagos, no una billetera. No almacena claves, no mantiene saldos ni permite al comerciante gastar fondos. Se requiere una billetera de Zcash separada, bajo el control del comerciante, para recibir el dinero que ZGo enruta.

## Conclusión

ZGo ofrece a los comerciantes una forma de aceptar pagos en Zcash sin renunciar a la custodia, sin depender de un intermediario y sin exponer los detalles de las transacciones en una cadena pública. Las dos integraciones (Xero y WooCommerce) cubren los flujos de trabajo comerciales más comunes; para todo lo demás, ZGo puede usarse de forma independiente desde cualquier navegador.

Para la configuración, el camino es corto: consigue una billetera de Zcash, crea una cuenta en [zgo.cash](https://zgo.cash/) y empieza a generar solicitudes de pago directamente o instala la integración correspondiente.

## Recursos

- [Sitio web oficial de ZGo](https://zgo.cash/)
- [Guía de Xero Integration Configuration](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) y [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Página principal del proyecto Zcash](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), la lista de billeteras de Zcash compatibles
- [Resumen de procesadores de pago de ZecHub](https://zechub.wiki/payment-processors), ZGo en el contexto de otras opciones de pago con Zcash
- [Plugin de Zcash para BTCPayServer](https://zechub.wiki/guides/btcpayserver-zcash-plugin), la guía relacionada de ZecHub para una alternativa autohospedada
