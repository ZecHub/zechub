# Guía del usuario de Ledger Shielded ZEC

El 23 de septiembre de 2026, Ledger añadió soporte nativo para ZEC blindado a Wallet Desktop de Ledger. Una cuenta de Zcash ahora contiene un saldo transparente y un saldo privado en el pool Ironwood de Zcash. Tus claves privadas permanecen en tu Ledger, y cada transacción se revisa y firma en el dispositivo.

**Solo para escritorio.** El anuncio de Ledger indica que ZEC blindado está "disponible únicamente en Wallet Desktop de Ledger. Actualmente no hay soporte para dispositivos móviles, pero llegará pronto". La aplicación de escritorio muestra el mismo aviso. Verificado el 15 de octubre de 2026.

## Preparación

- Un dispositivo Ledger que ejecute la aplicación Zcash: Nano S Plus, Nano X, Stax o Flex. La aplicación actual de Zcash no está diseñada para el Nano S original.
- Wallet Desktop de Ledger 4.21 o posterior, descargado únicamente desde [ledger.com](https://www.ledger.com). Esta guía utilizó la versión 4.24.0.
- La versión más reciente de la aplicación Zcash en tu Ledger (3.9.4 cuando se redactó esta guía).
- Una pequeña cantidad de ZEC para probar. Cada paso a continuación se realizó en mainnet con 0.001 ZEC. Cada transacción tiene una pequeña comisión de red (0.00015 ZEC en nuestra prueba).
- Tu frase de recuperación de 24 palabras debe permanecer en papel. Nunca la escribas en una computadora ni la compartas.

## Guía paso a paso (Wallet Desktop de Ledger)

**1. Instala o actualiza la aplicación Zcash**
- Abre Ledger Wallet, conecta y desbloquea tu Ledger, y abre **Mis Ledger**. Permite la conexión en el dispositivo.
- Busca **Zcash** en el catálogo de aplicaciones y luego haz clic en **Instalar**, o en **Actualizar** si ya está instalada.
- Abre la aplicación Zcash en tu Ledger. La pantalla muestra "La aplicación Zcash está lista". Desplázate a la derecha hasta **Información de la aplicación** para comprobar la versión.

**2. Añade una cuenta de Zcash**
- En Ledger Wallet, selecciona **Añadir cuenta**. En **Seleccionar activo**, busca Zcash y elige **Zcash (ZEC)**, no un token envuelto como Binance-Peg Zcash Token.
- Con la aplicación Zcash abierta en tu Ledger, Ledger Wallet encuentra tu cuenta. Márcala en **Selecciona las cuentas que quieres añadir** y haz clic en **Confirmar**.
- La página de la cuenta muestra **Saldo disponible**, **Saldo transparente** y **Saldo privado**, además de un botón **Activar blindado**.

![Cuenta de Zcash en Ledger Wallet Desktop con aviso exclusivo para escritorio, saldos transparente y privado, y botón «Enable shielded»](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Activa el saldo privado**
- Haz clic en **Activar blindado**. La ventana **Activar saldo privado de Zcash** tiene cuatro pasos: Cumpleaños, UFVK, Dispositivo y Confirmación.
- **Cumpleaños:** para una cuenta nueva, mantén la altura de cumpleaños en la fecha de hoy. Marca "Esta cuenta recibió ZEC blindado en el pasado" solo si sabes que fue así, porque escanear desde el bloque 0 puede tardar mucho tiempo.
- **UFVK y dispositivo:** Ledger Wallet pide a tu Ledger que exporte tu Unified Full Viewing Key (UFVK). Lee las pantallas del dispositivo y aprueba la operación. Si ves "Se perdió la conexión con el dispositivo", asegúrate de que la aplicación Zcash esté abierta, aprueba rápidamente y haz clic en **Reintentar**.
- Cuando veas **UFVK importado correctamente**, haz clic en **Iniciar sincronización**. Cuando termine la sincronización, el botón cambia a **Actualizar saldo** con una hora de "Última sincronización".
- La clave de visualización permanece en tu computadora. Puede encontrar tus fondos blindados, pero no puede gastarlos.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Recibe ZEC y verifica ambas direcciones en tu Ledger**
- Haz clic en **Recibir** y elige tu cuenta Zcash. Ledger Wallet muestra una **Dirección para Zcash 1** (transparente, comienza con t1) y una **Dirección privada para Zcash 1** (comienza con u1). Las direcciones anteriores siguen siendo válidas.
- Tu Ledger muestra "Verificar direcciones de Zcash", la **Dirección privada** en dos páginas y luego la **Dirección pública**. Compara cada carácter con la pantalla antes de compartir cualquiera de las direcciones y, después, confirma en el dispositivo.
- Prefiere la dirección privada; usa la transparente solo cuando el remitente no admita ninguna otra opción.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Mueve ZEC transparente a tu saldo privado**
- Haz clic en **Enviar**. En **Transferencia propia**, elige **Enviar al saldo privado**.
- Introduce un importe o utiliza 25 %, 50 %, 75 % o **Máx.**. Revisa la comisión de red y luego haz clic en **Revisar**.
- En tu Ledger, avanza por: "Revisar transacción para enviar ZEC", "Transferir de dirección pública a privada", el importe, la dirección de salida en dos páginas, la comisión y la altura de vencimiento. Comprueba que la dirección de salida coincida con tu dirección privada del paso 4 y luego pulsa ambos botones en **Firmar transacción**.
- Ledger Wallet muestra **Transacción enviada**. En los detalles de la transacción, el tipo indica **Privada (Ironwood)**.
- Ledger Wallet señala que una transferencia propia vincula tus fondos blindados con tu dirección pública. Recibir directamente en tu dirección privada evita que queden vinculados.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Después de que se confirme la transacción, el saldo transparente baja y el saldo privado sube. Los nuevos fondos blindados aparecen como "en maduración" hasta que tengan suficientes confirmaciones para poder gastarse.

![Cuenta de Zcash tras proteger los fondos: saldo transparente reducido, saldo privado aumentado y mostrado como en proceso de maduración](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Envía ZEC desde tu saldo privado**
- Cuando el saldo privado se pueda gastar, haz clic en **Enviar** y establece **Transferir desde** en **Saldo privado**.
- Pega la dirección del destinatario e introduce el importe. Puedes añadir un **Memo (opcional)** cifrado de hasta 512 bytes, que solo el destinatario puede leer.
- Revisa el destinatario, el importe y la comisión en tu Ledger; después, pulsa ambos botones en **Firmar transacción**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Información útil

- Por ahora, ZEC blindado en Ledger solo está disponible para escritorio (verificado el 15 de octubre de 2026).
- El saldo privado de Ledger Wallet utiliza el pool Ironwood.
- Ledger indica que puedes compartir acceso de solo lectura a tu historial de transacciones con un asesor fiscal. Cualquiera que tenga tu clave de visualización puede ver tu historial blindado, así que compártela solo de forma intencionada.
- Las pantallas del dispositivo de esta guía se capturaron con el emulador Speculos de Ledger (Nano S Plus), ejecutando la aplicación Zcash 3.9.4, conectado a Wallet Desktop de Ledger 4.24.0 en la mainnet de Zcash. Un Ledger físico ejecuta la misma aplicación y muestra las mismas pantallas.

## Ayuda adicional

- [Novedades en Ledger Wallet: soporte nativo para Zcash blindado](https://www.ledger.com/blog-native-shielded-zcash-support) (anuncio de Ledger)
- [Centro de ayuda de Ledger](https://support.ledger.com)
- [Página de wallets de ZecHub](/using-zcash/wallets)
- [Pools blindados](/using-zcash/shielded-pools) y [Claves de visualización](/zcash-tech/viewing-keys) en ZecHub
- Otra opción de wallet de hardware: la [Keystone Guía del usuario de Zashi](/guides/keystone-zashi)
