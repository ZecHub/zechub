<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Prueba blindada [Shielded proof] de pago [payment] y divulgaciones de pago

## TL;DR

- Un ID de transacción [transaction] identifica una transacción, pero no revela un destinatario blindado [shielded], importe ni memo.
- Una divulgación de pago está diseñada para permitir que el remitente demuestre detalles seleccionados de un pago sin exponer el resto del historial de su billetera [wallet].
- Una clave de visualización [viewing key] concede acceso continuo de lectura a una dirección [address] o cuenta. Úsela para auditorías continuas, no para una disputa sobre un único pago.
- Una divulgación de pago no puede demostrar la entrega de bienes, identificar por sí sola a una persona, revertir un pago ni reemplazar las verificaciones de confirmación.
- [ZIP 311](https://zips.z.cash/zip-0311) sigue siendo un **Borrador**. Su texto actual deja sin terminar la compatibilidad con Orchard, la compatibilidad con entradas transparentes [transparent], la codificación, el versionado y las reglas de interfaz de usuario.

## Por qué un ID de transacción no es suficiente

Cualquiera puede inspeccionar los detalles públicos de un pago Zcash transparente. Un explorador de bloques [block] puede mostrar sus direcciones, importes y estado de confirmación.

Un pago blindado funciona de forma diferente. La red [chain] demuestra que la transacción siguió las reglas de Zcash, pero no publica el remitente blindado, el destinatario, el importe ni el memo. Compartir el ID de la transacción puede mostrar que una transacción fue minada [mining], pero no puede demostrar a un comerciante o tercero qué pago privado contenía.

Esto crea un problema práctico. Un cliente puede necesitar resolver una disputa con un comerciante, un exchange puede necesitar demostrar que procesó un retiro, o un donante puede querer demostrar una contribución. Compartir una clave de visualización completa revelaría mucho más de lo que cualquiera de estos casos requiere.

[ZIP 311: Zcash Divulgaciones de pagos Payment Disclosures](https://zips.z.cash/zip-0311) propone una respuesta más limitada: divulgar y autenticar información seleccionada de una transacción.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Cómo funciona una divulgación de pago

El flujo básico es:

1. El verificador le proporciona al remitente un desafío o referencia únicos, cuando resulta apropiada una prueba [proof] interactiva.
2. El remitente selecciona la transacción [transaction] y la salida blindada [shielded] o las salidas que desea divulgar.
3. Un software de billetera [wallet] compatible crea una divulgación de pago [payment] vinculada a esa transacción y, opcionalmente, al desafío.
4. El remitente entrega la divulgación al verificador.
5. El verificador obtiene la transacción real de un nodo [node] de confianza de Zcash, comprueba que fue minada y verifica la divulgación con respecto a ella.
6. Un resultado válido confirma únicamente las afirmaciones contenidas en esa divulgación.

El diseño de ZIP de Sapling utiliza una clave de cifrado saliente para recuperar cada salida seleccionada. Esto puede revelar el destinatario, el importe y el memo de la salida. También requiere una prueba de autoridad de gasto para al menos una entrada de transacción, de modo que una persona que simplemente vea la transacción no pueda crear una divulgación válida como si la hubiera enviado.

Una divulgación de pago de Sapling no tiene que revelar una dirección de remitente. La autoridad de gasto puede controlar muchas direcciones diversificadas, por lo que demostrar el control del gasto no identifica automáticamente una dirección. ZIP 311 incluye una prueba de dirección opcional para los casos en que sea necesario vincular la prueba a una dirección de remitente conocida.

## ¿Divulgación de pago o clave de visualización?

| Método | Mejor uso | Lo que revela | ¿Acceso continuo? | ¿Vinculado criptográficamente al pago? |
| --- | --- | --- | --- | --- |
| Transaction ID | Comprobar que una transacción fue minada | Datos públicos de la transacción y confirmaciones | No | Sí, pero los detalles del pago blindado permanecen ocultos |
| Screenshot or receipt | Conservación informal de registros | Lo que el remitente elija mostrar | No | No; la imagen puede editarse |
| Payment disclosure | Demostrar detalles seleccionados de un pago | Salidas de transacción seleccionadas y cualquier prueba de remitente o desafío incluida | No, pero la prueba compartida puede copiarse | Sí |
| Incoming Viewing Key | Supervisar los pagos recibidos por una cuenta | Actividad entrante cubierta por la clave | Sí | Descifra los pagos entrantes coincidentes |
| Full Viewing Key | Contabilidad o auditoría de una cuenta | Actividad entrante y saliente, importes, memos y saldos cubiertos por la clave | Sí | Descifra la actividad coincidente de la cuenta |

Use la divulgación más pequeña que responda a la pregunta. Una disputa con un comerciante sobre un pago no justifica normalmente el acceso a todos los pagos de una cuenta. Un contador que deba revisar un período de informes completo puede necesitar una clave de visualización en su lugar.

Ningún método concede permiso para gastar. Nunca comparta una frase semilla [seed phrase], claves de gasto [spending key], clave privada ni copia de seguridad de billetera como prueba de pago.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## ¿Qué puedo usar hoy?

Aquí no se identifica ninguna billetera actual que implemente la creación o verificación de divulgaciones de pago de ZIP 311. ZIP sigue siendo un borrador y enumera su implementación de referencia como «TBD». Las siguientes herramientas [tools] mantenidas aún pueden ayudar al remitente, destinatario o auditor autorizado a inspeccionar los registros disponibles hoy:

| Aplicación | Útil hoy para | Límite importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Ver metadatos detallados de transacciones, importes, entradas y salidas de pool, y memos; importar claves de visualización Unified o Sapling en cuentas de solo lectura | No anuncia la creación ni verificación de divulgaciones de ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Revisar el historial de transacciones blindadas y memos; importar una Full Viewing Key Unified en modo de solo lectura | Un registro de billetera o una cuenta de solo lectura no es una divulgación de pago de alcance selectivo |
| [Zallet](https://zcash.github.io/zallet/) | Flujos de trabajo de operadores que usan `z_viewtransaction`, `z_exportviewingkey` y `z_importviewingkey` | Software beta; sus RPC de clave de visualización y transacción abarcan registros más amplios o locales, no pruebas de ZIP 311 |

Use primero la billetera que envió o recibió el pago. Compruebe sus detalles de transacción, memo, ID de transacción y confirmaciones, y luego pida a la otra parte que compare esos detalles con sus propios registros. No instale una billetera nueva ni introduzca una frase semilla únicamente para producir evidencia. Si un auditor necesita visibilidad continua, considere una cuenta compatible de solo lectura y comprenda el alcance de la clave de visualización antes de compartirla.

Estas aplicaciones son alternativas prácticas para comprobar registros, no una prueba de que esté disponible una divulgación de pago estandarizada. Una captura de pantalla puede ayudar a las personas a comparar registros, pero es editable y no constituye una prueba criptográfica.

## Dónde se aplican las divulgaciones de pago

### Disputas con comerciantes

Un cliente podría demostrar que se envió un importe específico a la dirección blindada del comerciante. La prueba no establece que se entregaron bienes, que se deba un reembolso ni que la persona que la presenta tenga una identidad legal determinada. Estas cuestiones siguen dependiendo del registro del pedido y del acuerdo entre las partes.

### Retiros blindados

ZIP 311 enumera los retiros blindados como un caso de uso objetivo: un exchange demostraría el destinatario y el importe sin publicar esos detalles on-chain. Su prueba de entrada transparente sigue sin terminar, por lo que aún no es un flujo de trabajo estandarizado completo. El cliente también debe comprobar de forma independiente el estado de confirmación de la transacción.

### Donaciones

Un donante o campaña podría demostrar una contribución concreta mientras mantiene privados los pagos no relacionados. Publicar la divulgación hace públicos sus detalles seleccionados para todos los que reciban una copia, por lo que un canal de verificación privado es más seguro cuando no se necesita una prueba pública.

### Contabilidad

Use una divulgación de pago cuando un contador necesite evidencia de una transacción. Use la clave de visualización adecuada más limitada cuando el contador necesite acceso continuo a muchas transacciones o a un período de informes completo.

## Un flujo de trabajo seguro para la privacidad

ZIP 311 aún no es un estándar de billetera terminado y ampliamente implementable. Cuando haya herramientas compatibles para remitentes y verificadores, use esta lista de verificación:

1. **Confirme primero la compatibilidad.** Ambas herramientas deben admitir el mismo formato de divulgación y el pool blindado utilizado por el pago.
2. **Resuelva primero los problemas ordinarios.** Compruebe la sincronización de la billetera, el ID de transacción, el número de confirmaciones, el estado de expiración y los registros del destinatario antes de revelar detalles privados.
3. **Solicite un desafío.** Para una disputa, el verificador debe proporcionar un número de pedido nuevo o un desafío aleatorio para que la divulgación quede vinculada a esa solicitud.
4. **Seleccione solo la salida necesaria.** No incluya salidas no relacionadas de la misma transacción.
5. **Obtenga una vista previa de cada campo revelado.** Compruebe el destinatario, el importe, el memo, la prueba de dirección del remitente y el desafío antes de exportar.
6. **Comparta mediante un canal privado.** Una divulgación no es una clave secreta de gasto, pero cualquiera que la reciba puede conservar o redistribuir la información que revela.
7. **Verifique con respecto a la red.** El verificador debe obtener la transacción exacta de un nodo de confianza, confirmar que está en la red y bloque previstos, y luego validar la divulgación.
8. **Registre el resultado, no secretos adicionales.** Conserve únicamente lo que requiera el proceso de disputa, retiro, donación o contabilidad.

Si la billetera no puede generar una divulgación, no sustituya una clave de visualización completa sin comprender su alcance más amplio y permanente. Pregunte si el destinatario puede confirmar el pago a partir de sus propios registros de billetera o aceptar en su lugar un registro menos sensible.

## Lo que una divulgación válida no demuestra

Una verificación exitosa no demuestra:

- Que la transacción tenga suficientes confirmaciones para la política de riesgo del verificador
- Que una reorganización de la red no pueda eliminar una transacción reciente
- Que se hayan entregado bienes o servicios
- Que se requiera un reembolso o contracargo
- Que el remitente controle una dirección concreta, a menos que se incluya una prueba de dirección adecuada
- Que la persona que presenta la divulgación tenga una identidad real declarada
- Que las salidas no divulgadas, otras transacciones o el saldo de la billetera tengan un valor determinado
- Que la divulgación permanezca privada después de compartirse

El verificador debe comprobar por separado la inclusión en la red y el estado de confirmación. El procedimiento de verificación de ZIP 311 supone que quien llama ya ha obtenido la transacción minada y su altura de bloque.

## Limitaciones actuales

Trate ZIP 311 como un estándar propuesto, no como una promesa de que una billetera actual tenga un botón funcional de **Demostrar pago**.

El borrador especifica actualmente gastos y salidas de Sapling, pero aún contiene elementos sin terminar para Orchard, entradas transparentes, la codificación de la divulgación, el versionado y cómo las billeteras deben mostrar diferentes niveles de validez. Su implementación de referencia también aparece como «TBD». Tal como está redactado, no define divulgaciones de pago para pagos Orchard o Ironwood.

El remitente también puede no ser capaz de divulgar una salida si la transacción se creó deliberadamente sin una clave de visualización saliente para esa salida. ZIP 311 conserva esa elección de privacidad en lugar de crear una nueva vía de recuperación.

La documentación más antigua describe los comandos experimentales `z_getpaymentdisclosure` y `z_validatepaymentdisclosure` en `zcashd`. Esos comandos admitían **solo salidas JoinSplit de Sprout**, no el diseño de Sapling en ZIP 311, y fueron desaprobados. `zcashd` alcanzó su detención final de fin de soporte en julio de 2026. No use esa guía heredada como instrucciones para fondos actuales.

Estas brechas no hacen inútil la idea. Explican por qué una guía cuidadosa debe separar el modelo de privacidad y los casos de uso del software listo para usuarios comunes.

## Preguntas frecuentes

### ¿Puedo demostrar un pago blindado solo con el ID de transacción?

No. El ID puede identificar la transacción y su estado de confirmación, pero el destinatario blindado, el importe y el memo no son públicos.

### ¿Es una divulgación de pago lo mismo que una clave de visualización?

No. Una divulgación tiene un alcance limitado a detalles seleccionados de una transacción. Una clave de visualización puede revelar actividad coincidente de una dirección o cuenta a lo largo del tiempo.

### ¿Puede el destinatario crear la prueba del remitente?

No según el diseño de ZIP 311. Una divulgación válida debe demostrar autoridad de gasto para al menos una entrada. El destinatario puede confirmar un pago usando sus propios registros de billetera, pero esa es una afirmación distinta.

### ¿Puedo revocar una divulgación después de compartirla?

No. No concede acceso futuro a la cuenta como una clave de visualización, pero los datos revelados y la prueba pueden copiarse. Compártala con tanto cuidado como cualquier registro financiero privado.

### ¿La verificación mueve o bloquea algún ZEC?

No. Crear o verificar una divulgación no gasta, reembolsa, congela ni revierte fondos.

### ¿Qué debo usar hoy si mi billetera no tiene una función de divulgación?

Comience con los registros de la billetera del destinatario, el ID de transacción y el estado de confirmación, una referencia de factura en el memo cifrado o otro recibo aceptado mutuamente. Use una clave de visualización solo cuando su alcance más amplio sea realmente necesario y comprendido.

## Recursos

- [ZIP 311: Zcash Divulgaciones de pagos Payment Disclosures](https://zips.z.cash/zip-0311) - el diseño del borrador, los requisitos, el proceso de verificación y las consideraciones de privacidad
- [ZIP 310: Propiedades de seguridad de las Sapling claves de visualización Viewing Keys](https://zips.z.cash/zip-0310) - qué revelan las claves de visualización y qué garantías proporcionan
- [ZIP 304: Sapling Firmas de direcciones Address Signatures](https://zips.z.cash/zip-0304) - el mecanismo opcional de prueba de dirección mencionado por ZIP 311
- [Zcash especificación del protocolo](https://zips.z.cash/protocol/protocol.pdf) - cifrado de notas [note] de Sapling, claves de visualización salientes y autorización de gasto
- [Documento archivado de divulgación de pagos de zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementación histórica solo de Sprout, no una guía actual
- [zcashd funciones desaprobadas](https://zcash.github.io/zcash/user/deprecation.html) - estado de los antiguos comandos experimentales de divulgación

## Páginas relacionadas

- [Transacciones](/using-zcash/transactions) - pagos blindados, confirmaciones y solución de problemas de transacciones
- [Claves de visualización](/zcash-tech/viewing-keys) - acceso continuo de solo lectura y opciones actuales de exportación
- [Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see) - campos públicos y privados de transacciones
- [Conservación de registros con ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - contabilidad sin publicar el historial de la billetera
