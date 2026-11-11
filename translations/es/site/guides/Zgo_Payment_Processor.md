<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Procesador de pagos ZGo: Aceptar Zcash sin custodia

ZGo es un procesador de pagos sin custodia para Zcash. Un cliente paga en ZEC desde su propia billetera [wallet], ZGo supervisa la blockchain Zcash en busca de la transacción y los fondos llegan directamente a la billetera del comerciante mediante una transferencia blindada [shielded]. ZGo nunca retiene el dinero durante el proceso.

Esta guía explica cómo funciona el flujo de pago, cómo configurar una cuenta y cómo integrar ZGo con Xero y WooCommerce. También aborda los dos errores que causan la mayoría de los problemas durante la configuración inicial.

## En esta página

1. [Por qué usar ZGo](#why-use-zgo)
2. [Cómo funciona ZGo](#how-zgo-works)
3. [Configuración de una cuenta](#setting-up-an-account)
4. [ZGo con Xero](#zgo-with-xero)
5. [ZGo con WooCommerce](#zgo-with-woocommerce)
6. [Funciones](#features)
7. [Errores comunes](#common-mistakes)
8. [Conclusión](#conclusion)
9. [Recursos](#resources)

## Por qué usar ZGo

La mayoría de los procesadores de pagos con criptomonedas son de custodia. Los fondos llegan primero a la cuenta del procesador y se reenvían al comerciante más tarde, lo que significa que un tercero controla temporalmente el dinero y puede congelarlo, retrasarlo o informar sobre él.

ZGo adopta el enfoque opuesto. Los pagos se mueven directamente desde la billetera del cliente hasta la billetera del comerciante mediante una transacción blindada Zcash. El procesador solo genera la factura y observa la blockchain en busca de confirmación. No existe saldo intermediario, flujo de retiro ni un tercero que pueda retrasar la liquidación.

Para un comerciante, esto significa tres cosas prácticas: custodia total de los ZEC entrantes, privacidad [privacy] de las transacciones blindadas de forma predeterminada y ninguna dependencia de que un proveedor centralizado permanezca en línea o sea solvente.

## Cómo funciona ZGo

El flujo de pago es el mismo independientemente de si ZGo se usa de forma independiente, mediante Xero o mediante WooCommerce:

1. El comerciante genera una solicitud de pago en ZGo, que se muestra como un código QR con el importe, el ID de la factura y una dirección de recepción Zcash.
2. El cliente escanea el QR con una billetera Zcash (Orchard, Sapling y los tipos de dirección Transparent son compatibles con el plugin de WordPress) y aprueba el pago.
3. La transacción se transmite a la red Zcash como una transferencia blindada desde la billetera del cliente hasta la billetera del comerciante.
4. ZGo supervisa la blockchain Zcash en busca de la transacción.
5. Tras cinco confirmaciones, ZGo marca el pago como definitivo y notifica a cualquier integración conectada (Xero, WooCommerce o un webhook).

El umbral de cinco confirmaciones es la cifra clave. Todo lo anterior es un pago en curso, no un pago recibido. El cumplimiento de pedidos, las actualizaciones de inventario y cualquier acción irreversible del lado del comerciante deben esperar al paso 5.

ZGo funciona en cualquier navegador moderno de escritorio o móvil, sin instalación en ninguno de los dos lados. El cliente necesita una billetera Zcash; el comerciante necesita una billetera Zcash y una cuenta ZGo.

<img width="672" height="378" alt="Descripción general de la solicitud de pago ZGo y la supervisión de la blockchain" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Configuración de una cuenta

Para crear una cuenta ZGo, se requiere una billetera Zcash con una pequeña cantidad de ZEC. El pequeño saldo de ZEC cubre la tarifa on-chain de la transacción de inicialización de la cuenta. Cualquier billetera Zcash importante sirve para esto; consulta [ZecHub Billeteras](https://zechub.wiki/wallets) para conocer las opciones actuales.

La configuración básica:

1. Abre [zgo.cash](https://zgo.cash/) en un navegador.
2. Crea una cuenta usando una billetera Zcash bajo el control del comerciante. Esta billetera debe contener las claves. Una dirección de depósito de un exchange no funcionará (consulta [Errores comunes](#common-mistakes)).
3. Verifica la billetera enviando la pequeña transacción de inicialización.
4. Configura la dirección de recepción. Todos los pagos procesados mediante esta cuenta llegarán a esta billetera.

Una vez que la cuenta esté activa, el mismo comerciante puede usar ZGo para pagos únicos (un solo código QR en un evento pop-up) o incorporarlo a una configuración permanente mediante Xero o WooCommerce.

## ZGo con Xero

[Xero](https://www.xero.com/) es una plataforma de contabilidad en la nube utilizada por muchas pequeñas y medianas empresas. La integración entre ZGo y Xero permite a un comerciante emitir una factura en Xero, que el cliente la pague en ZEC y que Xero marque automáticamente la factura como pagada una vez que se confirme la transacción.

Cómo funciona:

1. El comerciante crea una factura en Xero como de costumbre.
2. ZGo añade una opción de pago Zcash a la factura.
3. El cliente paga en ZEC mediante su billetera.
4. ZGo supervisa la blockchain [Zcash](https://z.cash/) en busca de la transacción.
5. Tras cinco confirmaciones, ZGo informa del pago a Xero, que marca la factura como liquidada.

El ZEC llega a la billetera del comerciante, no a ninguna cuenta controlada por ZGo ni por Xero. El registro contable en Xero se mantiene sincronizado automáticamente con la liquidación on-chain.

Para la configuración inicial, sigue la guía específica: [Configuración de la integración con Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo con WooCommerce

Para tiendas en línea que funcionan con [WooCommerce](https://woocommerce.com/) y [WordPress](https://wordpress.org/), ZGo ofrece un plugin específico. El plugin añade Zcash como método de pago al finalizar la compra y gestiona automáticamente el estado del pedido cuando se confirma el pago.

<img width="672" height="378" alt="Flujo de pago y pedido del plugin ZGo WooCommerce" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Flujo integral dentro de una tienda WooCommerce:

1. El cliente llega al pago y selecciona Zcash como método de pago.
2. El plugin genera una solicitud de pago y muestra el código QR en la página de pago.
3. El cliente paga desde su billetera.
4. La transacción se transmite a la red Zcash y ZGo comienza a supervisarla.
5. Tras cinco confirmaciones, ZGo informa al plugin de que el pago es definitivo.
6. El plugin marca el pedido WooCommerce como pagado y actualiza la base de datos de pedidos.

El pedido solo se paga cuando se completa el paso 6. Los estados anteriores (transmisión, primeras confirmaciones) pueden mostrarse al cliente como «pago recibido, pendiente de confirmación», pero el inventario, el cumplimiento y cualquier automatización posterior deben esperar al estado definitivo.

El plugin también instala un panel administrativo dentro de WordPress, donde el comerciante puede supervisar los pedidos y los pagos entrantes en ZEC junto con la vista normal de pedidos WooCommerce. El plugin admite todos los tipos actuales de dirección Zcash: Orchard, Sapling y Transparent. Los clientes que paguen desde cualquier billetera compatible pueden completar la transacción.

## Funciones

**Sin custodia.** Los pagos se mueven directamente desde la billetera del cliente hasta la billetera del comerciante mediante transacciones blindadas. ZGo nunca retiene los fondos durante el proceso, y el comerciante conserva el control total en todo momento.

**Implementación flexible.** ZGo puede utilizarse durante una sola tarde en un mercado pop-up, para una configuración permanente de punto de venta o como backend de una tienda en línea mediante las integraciones con Xero o WooCommerce.

**Basado en navegador.** No requiere instalación ni por parte del cliente ni del comerciante. ZGo funciona en cualquier navegador moderno de escritorio o móvil.

**Compatibilidad con billeteras.** Las principales billeteras Zcash, incluidas aquellas compatibles con los tipos de dirección Orchard, Sapling y Transparent, pueden pagar una factura ZGo sin configuración adicional por parte del cliente.

**Integraciones.** Las integraciones directas con Xero (contabilidad) y WooCommerce (comercio electrónico) cubren de inmediato los dos flujos de trabajo más comunes de los comerciantes.

## Errores comunes

**Tratar el pedido como pagado antes de cinco confirmaciones.** Una transacción transmitida no es lo mismo que un pago confirmado. La transacción aún puede no confirmarse o ser reemplazada. Solo después de cinco confirmaciones ZGo informa el pago como definitivo, y solo entonces se debe marcar el pedido como pagado en los sistemas posteriores. Si un comerciante configura el inventario o el cumplimiento para activarse al evento de transmisión, los pagos fraudulentos o fallidos causarán pérdidas reales.

**Configurar ZGo con una dirección de depósito de un exchange.** Parece una dirección Zcash, pero las direcciones de depósito de los exchanges están controladas por el exchange, no por el comerciante. El exchange tiene las claves, lo que significa que el exchange tiene los fondos, lo cual elimina el motivo para usar un procesador sin custodia. La dirección de billetera configurada en ZGo debe pertenecer a una billetera cuya frase semilla controle directamente el comerciante.

**Tratar ZGo como una billetera.** ZGo es un procesador de pagos, no una billetera. No almacena claves, retiene saldos ni permite al comerciante gastar fondos. Se requiere una billetera Zcash independiente bajo el control del comerciante para recibir el dinero que enruta ZGo.

## Conclusión

ZGo ofrece a los comerciantes una forma de aceptar pagos en Zcash sin renunciar a la custodia, sin depender de un intermediario y sin exponer los detalles de las transacciones en una cadena pública. Las dos integraciones (Xero y WooCommerce) cubren los flujos de trabajo más comunes de los comerciantes; para todo lo demás, ZGo puede utilizarse de forma independiente desde cualquier navegador.

Para la configuración, el proceso es breve: consigue una billetera Zcash, crea una cuenta en [zgo.cash](https://zgo.cash/) y comienza a generar solicitudes de pago directamente o instala la integración correspondiente.

## Recursos

- [Sitio web oficial de ZGo](https://zgo.cash/)
- [Guía de configuración de la integración con Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) y [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Página principal del proyecto Zcash](https://z.cash/)
- [ZecHub Billeteras](https://zechub.wiki/wallets), la lista de billeteras Zcash compatibles
- [Descripción general de procesadores de pagos ZecHub](https://zechub.wiki/payment-processors), ZGo en el contexto de otras opciones de pago Zcash
- [Plugin Zcash de BTCPayServer](https://zechub.wiki/guides/btcpayserver-zcash-plugin), la guía relacionada de ZecHub para una alternativa autohospedada
