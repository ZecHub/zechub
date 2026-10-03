# **Cómo intercambiar por ZEC en Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

¿Ya tienes ZEC en Solana (por ejemplo, de un token que paga a sus titulares en ZEC)? No lo intercambies. Mueve ese token a una wallet Zcash blindada con [¿Tienes ZEC en Solana? Muévelo a Zcash](/using-zcash/solana-zec-to-shielded) blindado.

---

## **¿ZEC nativo o un token ZEC?**

"ZEC" en Phantom puede referirse a dos activos diferentes, así que debes saber por cuál estás pagando.

- El botón integrado **Swap** de Phantom te da una representación tokenizada de ZEC en Solana (u otra red compatible con Phantom). No es ZEC nativo. Está en tu dirección de Phantom, no tiene funcionalidad blindada de Zcash y una wallet Zcash no puede verlo ni blindarlo.
- El ZEC nativo solo existe en la blockchain de Zcash y se envía a una dirección Zcash. Para obtenerlo, necesitas un servicio que solicite tu dirección Zcash, como un intercambio dentro de [ZODL](https://zodl.com), una de las opciones de la página DEX de [](/dex), o solswap.org seguido de un retiro a tu wallet Zcash (Paso 8).

### Comprueba antes de pagar

- **Red:** el ZEC que recibes debe estar en la red **Zcash**. Si indica Solana, Ethereum o Base, es un token.
- **Activo:** el ZEC nativo no tiene contrato de token ni dirección de mint. Si el tuyo muestra uno, es un token. También hay muchos tokens "ZEC" parecidos en Solana, así que no te guíes solo por el nombre. El token OmniBridge en Solana es `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; sigue siendo un token, no ZEC nativo.
- **Dirección:** el ZEC nativo va a una dirección Zcash, que comienza con `t1`, `u1` o `zs`. Si el ZEC se envía a tu dirección Phantom, estás recibiendo un token.

---

##  **Paso 1: Abre la interfaz de Swap**
Abre la **aplicación Phantom** y visita **[solswap.org](https://solswap.org/)** desde el navegador de Phantom. Escribe tú mismo la dirección. El sitio funciona en NEAR Intents y puede enviar ZEC a una dirección de Zcash.

El propio botón **Swap** de Phantom también muestra ZEC, pero te da el token descrito anteriormente, no ZEC nativo.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Paso 2: Selecciona redes y tokens para depositar**  
- Elige tu **red de origen** (por ejemplo, *Ethereum* o *Solana*) y luego deposita para intercambiar.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Selecciona un token base como **SOL, USDT o USDC**.  
- Elige ZEC como tu **token de destino**.  
- Asegúrate de que Zcash esté disponible mediante la interfaz de intercambio.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Paso 3: Introduce el monto y revisa la cotización**
- Introduce el monto que deseas intercambiar.
- Usa el monto a recibir mostrado en **solswap.org**. Esa cotización es la que se aplica en esta ruta.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Paso 4: Comprueba el gas y las comisiones**
- Mantén suficiente token de gas de la cadena de origen en Phantom para aprobar el depósito (*SOL* en Solana, *ETH* en Ethereum).
- Lee la línea de comisiones en la cotización de solswap antes de confirmar. El Swap integrado de Phantom utiliza su propio esquema de comisiones (históricamente, una comisión de Phantom del 0,85 % más el gas de red y una comisión de bridging). Esas cifras no se aplican a un depósito en solswap.org.

---

##  **Paso 5: Ajustar la configuración (opcional)**
En solswap.org, revisa el deslizamiento y el mínimo cotizado que recibirás en esa pantalla antes de depositar.

Si en cambio estás viendo la pantalla de **Swap** propia de Phantom, estás en la ruta de tokens desde la parte superior de esta página. Ciérrala y abre `solswap.org` en el navegador Phantom.

---

##  **Paso 6: Confirmar el intercambio**
- Revisa todos los detalles del intercambio en solswap.org.
- Confirma el depósito en Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Paso 7: Supervisar el estado**
- Sigue el depósito en la actividad de solswap.org hasta que aparezca como **Completado**.
- El ID de transacción de Solana o de la cadena de origen se encuentra en esa fila de actividad y en el explorador de la red correspondiente.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Paso 8: Retira ZEC nativo a tu wallet Zcash**
Después del swap, tu ZEC aparece en el saldo de tu **Cuenta** de solswap.org. Aún no está en la red Zcash, ni tampoco en Phantom.

1. Abre una wallet de Zcash que el [directorio](/wallets) marque como **Ironwood: Listo**. Copia una `u1` que tu wallet identifique como blindada. Una `t1` también funciona, pero ese depósito es público hasta que lo blindes.
2. En solswap.org, ve a **Cuenta** y toca **Retirar**. Elige **ZEC**, configura la red como **Zcash**, pega la dirección y revisa los primeros y últimos caracteres antes de confirmar.
3. Si **Monto recibido** y **Comisión** se mantienen en "–" y el botón no hace nada, el saldo no se ha perdido. Está en NEAR Intents bajo tu clave Phantom. Termina en [near.com](https://near.com): inicia sesión con la misma wallet Phantom, abre **Mover activos heredados**, toca **Retirar** en la fila de ZEC (no **Mover**), configura la red como **Zcash** y pega la misma `u1`. Phantom te pedirá **Firmar mensaje**. Confirma solo si la solicitud proviene de `near.com` y el mensaje menciona `"verifying_contract": "intents.near"`. Las pantallas completas para esa solución alternativa están en [¿Tienes ZEC en Solana? Muévelo a Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **Próximos pasos**
Una vez que tengas ZEC nativo en tu wallet Zcash, mantenlo protegido al [usar ZEC de forma privada](/guides/using-zec-privately).

Un token ZEC comprado con el botón Swap de Phantom no se puede blindar desde Phantom. Ese token es el activo OmniBridge en Solana. Muévelo con [¿Tienes ZEC en Solana? Muévelo a Zcash blindado](/using-zcash/solana-zec-to-shielded).
