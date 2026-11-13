# **Cómo hacer swap por ZEC en la billetera [wallet] Phantom**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

¿Ya tienes ZEC en Solana (por ejemplo, de un token que paga a los titulares en ZEC)? No hagas swap. Mueve ese token a una billetera Zcash blindada [shielded] con [¿Tienes ZEC en Solana? Muévelo a Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **¿ZEC nativo o un token de ZEC?**

«ZEC» en Phantom puede referirse a dos activos diferentes, así que debes saber cuál estás pagando.

- El **botón Swap integrado de Phantom** te proporciona una representación en token de ZEC en Solana (u otra red que admita Phantom). No es ZEC nativo. Se encuentra en tu dirección Phantom, no tiene funcionalidad blindada de Zcash y una billetera Zcash no puede verlo ni blindarlo.
- El **ZEC nativo** solo existe en la blockchain Zcash y se envía a una dirección Zcash. Para obtenerlo, necesitas un servicio que solicite tu dirección Zcash, como un swap dentro de [ZODL](https://zodl.com), una de las opciones de la página DEX de [](/dex), o solswap.org seguido de un retiro a tu billetera Zcash (Paso 8).

### Comprueba antes de pagar

- **Red:** El ZEC que recibas debe estar en la red **Zcash**. Si dice Solana, Ethereum o Base, es un token.
- **Activo:** El ZEC nativo no tiene contrato de token ni dirección de mint. Si el tuyo muestra uno, es un token. También hay muchos tokens «ZEC» parecidos en Solana, así que no te guíes únicamente por el nombre. El token OmniBridge en Solana es `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; sigue siendo un token, no ZEC nativo.
- **Dirección:** El ZEC nativo se envía a una dirección Zcash, que comienza con `t1`, `u1` o `zs`. Si el ZEC se está enviando a tu dirección Phantom, estás recibiendo un token.

---

##  **Paso 1: Abre la interfaz de swap**
Inicia la **aplicación Phantom** y visita **[solswap.org](https://solswap.org/)** desde el navegador Phantom. Escribe tú mismo la dirección. El sitio funciona en NEAR Intents y puede enviar ZEC a una dirección Zcash.

El propio botón **Swap** de Phantom también muestra ZEC, pero te proporciona el token descrito anteriormente, no ZEC nativo.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Paso 2: Selecciona redes y tokens para el depósito**
- Elige tu **red de origen** (por ejemplo, *Ethereum* o *Solana*) y luego deposita para hacer swap.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Selecciona un token base como **SOL, USDT o USDC**.
- Elige **ZEC** como tu **token de destino**.
- Asegúrate de que Zcash esté disponible a través de la interfaz de swap.

![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Paso 3: Introduce el importe y revisa la cotización**
- Introduce el importe que deseas intercambiar.
- Usa el importe recibido que se muestra en **solswap.org**. Esa cotización es la que se aplica en esta ruta.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Paso 4: Comprueba el gas y las tarifas [fees]**
- Conserva suficiente token de gas de la cadena de origen en Phantom para aprobar el depósito (*SOL* en Solana, *ETH* en Ethereum).
- Lee la línea de tarifa de la cotización de solswap antes de confirmar. El Swap integrado de Phantom usa su propio calendario de tarifas (históricamente, una tarifa de Phantom del 0,85 % más gas de red y una tarifa de bridge). Esas cifras no se aplican a un depósito en solswap.org.

---

##  **Paso 5: Ajusta la configuración (opcional)**
En solswap.org, revisa el deslizamiento y el mínimo cotizado que recibirás en esa pantalla antes de depositar.

Si estás viendo la hoja de **Swap** propia de Phantom, estás en la ruta de token de la parte superior de esta página. Ciérrala y abre `solswap.org` en el navegador Phantom.

---

##  **Paso 6: Confirma el swap**
- Revisa todos los detalles del swap en solswap.org.
- Confirma el depósito en Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Paso 7: Supervisa el estado**
- Sigue el depósito en la actividad de solswap.org hasta que muestre **Completado**.
- El ID de transacción [transaction] de Solana o de la cadena de origen está en esa fila de actividad y en el explorador de la cadena de esa red.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Paso 8: Retira ZEC nativo a tu billetera Zcash**
Después del swap, tu ZEC aparece en el saldo de tu **Cuenta** de solswap.org. Todavía no está en la red Zcash ni tampoco en Phantom.

1. Abre una billetera Zcash que el directorio de [](/wallets) marque como **Ironwood: Lista**. Copia una `u1` que tu billetera identifique como blindada. Una `t1` también funciona, pero ese depósito es público hasta que lo blindes.
2. En solswap.org, ve a **Cuenta** y toca **Retirar**. Elige **ZEC**, configura la red como **Zcash**, pega la dirección y comprueba el primer y el último carácter antes de confirmar.
3. Si **Importe recibido** y **Tarifa** permanecen en «–» y el botón no hace nada, el saldo no se ha perdido. Está en NEAR Intents bajo tu clave Phantom. Termina en [near.com](https://near.com): inicia sesión con la misma billetera Phantom, abre **Mover activos heredados**, toca **Retirar** en la fila ZEC (no **Mover**), configura la red como **Zcash** y pega la misma `u1`. Phantom te pedirá **Firmar mensaje**. Confirma solo si la solicitud procede de `near.com` y el mensaje menciona `"verifying_contract": "intents.near"`. Las pantallas completas para esta solución alternativa están en [¿Tienes ZEC en Solana? Muévelo a Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **Próximos pasos**
Una vez que ZEC nativo esté en tu billetera Zcash, mantenlo blindado con [Usar ZEC de forma privada](/guides/using-zec-privately).

Un token ZEC comprado con el botón Swap de Phantom no puede blindarse desde Phantom. Ese token es el activo OmniBridge en Solana. Muévelo con [¿Tienes ZEC en Solana? Muévelo a Zcash blindado](/using-zcash/solana-zec-to-shielded).
