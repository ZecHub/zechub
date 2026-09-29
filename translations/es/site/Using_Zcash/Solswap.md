# **Cómo intercambiar por ZEC en Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **¿ZEC nativo o un token ZEC?**

"ZEC" en Phantom puede referirse a dos activos diferentes, así que debes saber por cuál estás pagando.

- El botón integrado **Swap** de Phantom te da una representación tokenizada de ZEC en Solana (u otra red compatible con Phantom). No es ZEC nativo. Está en tu dirección de Phantom, no tiene funcionalidad blindada de Zcash y una wallet Zcash no puede verlo ni blindarlo.
- El ZEC nativo solo existe en la blockchain de Zcash y se envía a una dirección Zcash. Para obtenerlo, necesitas un servicio que solicite tu dirección Zcash, como un intercambio dentro de [ZODL](https://zodl.com), una de las opciones de la página DEX de [](/dex), o solswap.org seguido de un retiro a tu wallet Zcash (Paso 8).

### Comprueba antes de pagar

- **Red:** el ZEC que recibas debe estar en la red **Zcash**. Si dice Solana, Ethereum o Base, es un token.
- **Activo:** el ZEC nativo no tiene contrato de token ni dirección de mint. Si el tuyo muestra una, es un token. También hay muchos tokens "ZEC" parecidos en Solana, así que no te guíes solo por el nombre.
- **Dirección:** el ZEC nativo va a una dirección Zcash, que comienza con `t1`, `u1` o `zs`. Si el ZEC se envía a tu dirección de Phantom, estás recibiendo un token.

---

##  **Paso 1: Abre la interfaz de intercambio**  
Inicia la **app de Phantom** y visita **[solswap.org](https://solswap.org/)** desde el navegador de Phantom. El sitio funciona con Near Intents y puede enviar ZEC a una dirección Zcash.  

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

##  **Paso 3: Introduce el importe y revisa la cotización**  
- Introduce el importe que deseas intercambiar.  
- Phantom mostrará un **importe estimado a recibir** después de las comisiones.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Paso 4: Comprueba el gas y las comisiones**  
- Para los **intercambios en la misma cadena**, asegúrate de tener suficiente token nativo para el gas (*ETH para Ethereum, SOL para Solana*).  
- Los **intercambios entre cadenas** requieren gas tanto en la cadena de origen como en la de destino.  
- Revisa el desglose de comisiones:  
  - Comisión de Phantom: **0.85%**  
  - Gas de red  
  - Comisiones del proveedor de bridge (~**0.3%**)  
  
  
---

##  **Paso 5: Ajusta la configuración (opcional)**  
Toca **Swap Settings** para:  
- Ajustar el **deslizamiento** (valor predeterminado: **0.3%**, ajustable hasta el 30%).  
- Aumentar las **comisiones de prioridad** en redes congestionadas.  

---

##  **Paso 6: Confirma el intercambio**  
- Revisa todos los detalles del intercambio.  
- Toca **Swap Now** para iniciar la transacción.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Paso 7: Supervisa el estado**  
- Sigue tu intercambio en la pestaña **Recent Activity**.  
- Para intercambios entre cadenas, utiliza tu **ID de transacción** con **Li.Fi Scanner** para recibir actualizaciones en tiempo real. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Paso 8: Retira ZEC nativo a tu wallet Zcash**  
Después del intercambio, tu ZEC aparece en el saldo de tu **Account** de solswap.org. Aún no está en la red Zcash ni tampoco en Phantom. Para moverlo:  
- Abre una wallet Zcash como [ZODL](https://zodl.com) y copia tu dirección de recepción. El formulario de retiro acepta una dirección transparente (`t1`) o unificada (`u1`).  
- En solswap.org, ve a **Account** y toca **Withdraw**.  
- Elige **ZEC**, establece la red en **Zcash**, pega tu dirección y revísala dos veces antes de confirmar.  

---

## **Próximos pasos**  
Una vez que el ZEC nativo esté en tu wallet Zcash, puedes blindarlo con [esta guía](/guides/using-zec-privately).  

Un token ZEC comprado con el botón Swap de Phantom no puede blindarse de esta manera, porque no está en la red Zcash. Primero tendrías que intercambiarlo por ZEC nativo enviado a una dirección Zcash.
