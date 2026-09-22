<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Prueba de pago blindada y divulgaciones de pago

## TL;DR

- Un ID de transacción identifica una transacción, pero no revela un destinatario blindado, importe ni memo.
- Una divulgación de pago está diseñada para permitir que el remitente pruebe detalles seleccionados de un pago sin exponer el resto del historial de su wallet.
- Una clave de visualización concede acceso continuo de lectura a una dirección o cuenta. Úsala para auditorías continuas, no para una disputa sobre un único pago.
- Una divulgación de pago no puede probar la entrega de bienes, identificar por sí sola a una persona, revertir un pago ni reemplazar las comprobaciones de confirmación.
- [ZIP 311](https://zips.z.cash/zip-0311) sigue siendo un **Borrador**. Su texto actual deja sin terminar la compatibilidad con Orchard, la compatibilidad con entradas transparentes, la codificación, el versionado y las reglas de interfaz de usuario.

## Por qué un ID de transacción no es suficiente

Cualquiera puede inspeccionar los detalles públicos de un pago transparente de Zcash. Un explorador de bloques puede mostrar sus direcciones, importes y estado de confirmación.

Un pago blindado funciona de manera diferente. La cadena demuestra que la transacción siguió las reglas de Zcash, pero no publica el remitente, destinatario, importe ni memo blindados. Compartir el ID de transacción puede mostrar que una transacción fue minada, pero no puede demostrar a un comerciante o tercero qué pago privado contenía.

Esto crea un problema práctico. Un cliente puede necesitar resolver una disputa con un comerciante, un exchange puede necesitar demostrar que procesó un retiro, o un donante puede querer demostrar una contribución. Compartir una clave de visualización completa revelaría mucho más de lo que cualquiera de estos casos requiere.

[ZIP 311: Zcash Divulgaciones de pago](https://zips.z.cash/zip-0311) propone una respuesta más limitada: divulgar y autenticar información seleccionada de una transacción.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Cómo funciona una divulgación de pago

El flujo básico es:

1. El verificador proporciona al remitente un desafío o referencia únicos, cuando resulta apropiada una prueba interactiva.
2. El remitente selecciona la transacción y la salida o salidas blindadas que divulgará.
3. Un software de wallet compatible crea una divulgación de pago vinculada a esa transacción y, opcionalmente, al desafío.
4. El remitente entrega la divulgación al verificador.
5. El verificador obtiene la transacción real de un nodo Zcash de confianza, comprueba que fue minada y verifica la divulgación con respecto a ella.
6. Un resultado válido confirma únicamente las afirmaciones contenidas en esa divulgación.

El diseño de ZIP de Sapling utiliza una clave de cifrado saliente para recuperar cada salida seleccionada. Esto puede revelar el destinatario, importe y memo de la salida. También requiere una prueba de autoridad de gasto para al menos una entrada de la transacción, de modo que una persona que simplemente ve la transacción no pueda crear una divulgación válida como si la hubiera enviado.

Una divulgación de pago de Sapling no tiene que revelar una dirección del remitente. La autoridad de gasto puede controlar muchas direcciones diversificadas, por lo que demostrar el control del gasto no identifica automáticamente una dirección. ZIP 311 incluye una prueba de dirección opcional para los casos en que sea necesario vincular la prueba a una dirección conocida del remitente.

## ¿Divulgación de pago o clave de visualización?

| Método | Mejor uso | Qué revela | ¿Acceso continuo? | ¿Está vinculada criptográficamente al pago? |
| --- | --- | --- | --- | --- |
| ID de transacción | Comprobar que una transacción fue minada | Datos públicos de la transacción y confirmaciones | No | Sí, pero los detalles del pago blindado permanecen ocultos |
| Captura de pantalla o recibo | Gestión informal de registros | Lo que el remitente elija mostrar | No | No; la imagen se puede editar |
| Divulgación de pago | Probar detalles seleccionados de un pago | Salidas de transacción seleccionadas y cualquier prueba incluida de remitente o desafío | No, pero la prueba compartida se puede copiar | Sí |
| Incoming Viewing Key | Supervisar los pagos recibidos por una cuenta | Actividad entrante cubierta por la clave | Sí | Descifra los pagos entrantes coincidentes |
| Full Viewing Key | Contabilidad o auditoría de una cuenta | Actividad entrante y saliente, importes, memos y saldos cubiertos por la clave | Sí | Descifra la actividad coincidente de la cuenta |

Utiliza la divulgación más pequeña que responda a la pregunta. Una disputa con un comerciante sobre un pago no suele justificar acceso a todos los pagos de una cuenta. Un contador que debe revisar un período de informes completo puede necesitar una clave de visualización en su lugar.

Ninguno de los métodos concede permiso para gastar. Nunca compartas una frase semilla, clave de gasto, clave privada o copia de seguridad de la wallet como prueba de pago.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## ¿Qué puedo usar hoy?

No se identifica aquí ninguna wallet actual que implemente la creación o verificación de divulgaciones de pago de ZIP 311. ZIP sigue siendo un borrador y enumera su implementación de referencia como "TBD". Las siguientes herramientas mantenidas aún pueden ayudar al remitente, destinatario o auditor autorizado a inspeccionar los registros disponibles hoy:

| Aplicación | Útil hoy para | Límite importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Ver metadatos detallados de transacciones, importes, entradas y salidas de pools, y memos; importar claves de visualización Unified o Sapling en cuentas de solo visualización | No anuncia la creación ni verificación de divulgaciones de ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Revisar el historial de transacciones blindadas y memos; importar una Full Viewing Key Unified en modo de solo lectura | Un registro de wallet o cuenta de solo lectura no es una divulgación de pago con alcance selectivo |
| [Zallet](https://zcash.github.io/zallet/) | Flujos de trabajo de operadores que usan `z_viewtransaction`, `z_exportviewingkey` y `z_importviewingkey` | Software beta; sus RPC de claves de visualización y transacciones son registros más amplios o locales, no pruebas de ZIP 311 |

Utiliza primero la wallet que envió o recibió el pago. Comprueba sus detalles de transacción, memo, ID de transacción y confirmaciones; después, pide a la otra parte que compare esos detalles con sus propios registros. No instales una wallet nueva ni introduzcas una frase semilla únicamente para producir evidencia. Si un auditor necesita visibilidad continua, considera una cuenta compatible de solo visualización y comprende el alcance de la clave de visualización antes de compartirla.

Estas aplicaciones son alternativas prácticas para comprobar registros, no prueba de que haya una divulgación de pago estandarizada disponible. Una captura de pantalla puede ayudar a las personas a comparar registros, pero es editable y no constituye prueba criptográfica.

## Dónde se aplican las divulgaciones de pago

### Disputas con comerciantes

Un cliente podría demostrar que se envió un importe específico a la dirección blindada del comerciante. La prueba no establece que se entregaron bienes, que se deba un reembolso ni que la persona que la presenta tenga una identidad legal determinada. Esas cuestiones siguen dependiendo del registro del pedido y del acuerdo entre las partes.

### Retiros blindados

ZIP 311 enumera los retiros blindados como un caso de uso objetivo: un exchange demostraría el destinatario y el importe sin publicar esos detalles en la cadena. Su prueba de entradas transparentes sigue sin terminar, por lo que este aún no es un flujo de trabajo estandarizado completo. El cliente también debe comprobar de manera independiente el estado de confirmación de la transacción.

### Donaciones

Un donante o una campaña podrían demostrar una contribución específica mientras mantienen privados los pagos no relacionados. Publicar la divulgación hace públicos sus detalles seleccionados para cualquiera que reciba una copia, por lo que un canal de verificación privado es más seguro cuando la prueba pública no es necesaria.

### Contabilidad

Utiliza una divulgación de pago cuando un contador necesite evidencia de una transacción. Utiliza la clave de visualización adecuada más limitada cuando el contador necesite acceso continuo a muchas transacciones o a un período de informes completo.

## Un flujo de trabajo seguro para la privacidad

ZIP 311 aún no es un estándar de wallet terminado y ampliamente implementable. Cuando haya herramientas compatibles para remitente y verificador, utiliza esta lista de comprobación:

1. **Confirma primero la compatibilidad.** Ambas herramientas deben admitir el mismo formato de divulgación y el pool blindado utilizado por el pago.
2. **Resuelve primero los problemas ordinarios.** Comprueba la sincronización de la wallet, el ID de transacción, el número de confirmaciones, el estado de vencimiento y los registros del destinatario antes de revelar detalles privados.
3. **Solicita un desafío.** Para una disputa, el verificador debería proporcionar un número de pedido reciente o un desafío aleatorio para que la divulgación quede vinculada a esa solicitud.
4. **Selecciona solo la salida necesaria.** No incluyas salidas no relacionadas de la misma transacción.
5. **Previsualiza cada campo revelado.** Comprueba el destinatario, importe, memo, prueba de dirección del remitente y desafío antes de exportar.
6. **Comparte mediante un canal privado.** Una divulgación no es una clave secreta de gasto, pero cualquiera que la reciba puede conservar o redistribuir la información que revela.
7. **Verifica contra la cadena.** El verificador debe obtener la transacción exacta de un nodo de confianza, confirmar que está en la red y bloque previstos, y luego validar la divulgación.
8. **Registra el resultado, no secretos adicionales.** Conserva únicamente lo que requiera el proceso de disputa, retiro, donación o contabilidad.

Si la wallet no puede generar una divulgación, no sustituyas una clave de visualización completa sin comprender su alcance más amplio y permanente. Pregunta si el destinatario puede confirmar el pago desde los registros de su propia wallet o aceptar en su lugar un registro menos sensible.

## Lo que una divulgación válida no demuestra

Una verificación exitosa no demuestra:

- Que la transacción tenga suficientes confirmaciones para la política de riesgo del verificador
- Que una reorganización de la cadena no pueda eliminar una transacción reciente
- Que se entregaron bienes o servicios
- Que sea necesario un reembolso o una devolución de cargo
- Que el remitente controle una dirección determinada, salvo que se incluya una prueba de dirección apropiada
- Que la persona que presenta la divulgación tenga una identidad real reclamada
- Que las salidas no divulgadas, otras transacciones o el saldo de la wallet tengan un valor determinado
- Que la divulgación permanezca privada después de compartirse

El verificador debe comprobar por separado la inclusión en la cadena y el estado de confirmación. El procedimiento de verificación de ZIP 311 asume que el solicitante ya ha obtenido la transacción minada y su altura de bloque.

## Limitaciones actuales

Trata ZIP 311 como un estándar propuesto, no como una promesa de que una wallet actual tenga un botón funcional de **Probar pago**.

El borrador especifica actualmente gastos y salidas de Sapling, pero todavía contiene elementos sin terminar para Orchard, entradas transparentes, la codificación de la divulgación, el versionado y cómo deberían mostrar las wallets distintos niveles de validez. Su implementación de referencia también aparece como "TBD". Tal como está redactado, no define divulgaciones de pago para pagos de Orchard o Ironwood.

El remitente también puede no poder divulgar una salida si la transacción se creó deliberadamente sin una clave de visualización saliente para esa salida. ZIP 311 preserva esa elección de privacidad en lugar de crear una nueva vía de recuperación.

La documentación anterior describe los comandos experimentales `z_getpaymentdisclosure` y `z_validatepaymentdisclosure` en `zcashd`. Esos comandos admitían **solo salidas Sprout JoinSplit**, no el diseño de Sapling en ZIP 311, y quedaron obsoletos. `zcashd` alcanzó su detención final de fin de soporte en julio de 2026. No utilices esa guía heredada como instrucciones para fondos actuales.

Estas carencias no hacen que la idea sea inútil. Explican por qué una guía cuidadosa debe separar el modelo de privacidad y los casos de uso del software que está listo para usuarios comunes.

## Preguntas frecuentes

### ¿Puedo demostrar un pago blindado solo con el ID de transacción?

No. El ID puede identificar la transacción y su estado de confirmación, pero el destinatario blindado, importe y memo no son públicos.

### ¿Una divulgación de pago es lo mismo que una clave de visualización?

No. Una divulgación se limita a detalles seleccionados de una transacción. Una clave de visualización puede revelar actividad coincidente para una dirección o cuenta a lo largo del tiempo.

### ¿Puede el destinatario crear la prueba del remitente?

No según el diseño de ZIP 311. Una divulgación válida debe demostrar autoridad de gasto para al menos una entrada. El destinatario puede confirmar un pago utilizando los registros de su propia wallet, pero esa es una afirmación diferente.

### ¿Puedo revocar una divulgación después de compartirla?

No. No concede acceso futuro a la cuenta como una clave de visualización, pero los datos revelados y la prueba se pueden copiar. Compártela con el mismo cuidado que cualquier registro financiero privado.

### ¿La verificación mueve o bloquea algún ZEC?

No. Crear o verificar una divulgación no gasta, reembolsa, congela ni revierte fondos.

### ¿Qué debo usar hoy si mi wallet no tiene una función de divulgación?

Empieza con los registros de la wallet del destinatario, el ID de transacción y el estado de confirmación, una referencia de factura en el memo cifrado u otro recibo mutuamente aceptado. Utiliza una clave de visualización solo cuando su alcance más amplio sea realmente necesario y comprendido.

## Recursos

- [ZIP 311: Zcash Divulgaciones de pago](https://zips.z.cash/zip-0311) - el diseño preliminar, requisitos, proceso de verificación y consideraciones de privacidad
- [ZIP 310: Propiedades de seguridad de las claves de visualización de Sapling](https://zips.z.cash/zip-0310) - qué revelan las claves de visualización y qué garantías proporcionan
- [ZIP 304: Sapling Firmas de direcciones](https://zips.z.cash/zip-0304) - el mecanismo opcional de prueba de dirección al que hace referencia ZIP 311
- [Zcash especificación del protocolo](https://zips.z.cash/protocol/protocol.pdf) - cifrado de notas de Sapling, claves de visualización salientes y autorización de gasto
- [Documento archivado de divulgación de pagos de zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementación histórica solo para Sprout, no una guía actual
- [zcashd funciones obsoletas](https://zcash.github.io/zcash/user/deprecation.html) - estado de los antiguos comandos experimentales de divulgación

## Páginas relacionadas

- [Transacciones](/using-zcash/transactions) - pagos blindados, confirmaciones y solución de problemas de transacciones
- [Claves de visualización](/zcash-tech/viewing-keys) - acceso continuo de solo lectura y opciones actuales de exportación
- [Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see) - campos públicos y privados de transacciones
- [Mantener registros con ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - contabilidad sin publicar el historial de la wallet
