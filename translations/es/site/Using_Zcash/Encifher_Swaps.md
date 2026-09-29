# **Intercambio de SOL/USDC -> ZEC usando Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Intercambia desde Solana hacia Zcash, con el paso cross-chain enrutado mediante Near Intents.*  

---

###  Introducción  
[**encrypt.trade**](https://encrypt.trade/zec) es una aplicación de Solana gestionada por JMD Labs Inc. Te permite intercambiar **SOL o USDC** en Solana por **Zcash (ZEC)**. Tus tokens primero se envuelven en versiones cifradas para ocultar los importes en Solana y luego se intercambian por ZEC mediante Near Intents.

El intercambio es privado en algunos aspectos, pero no en todos. La documentación propia de la aplicación, [docs](https://docs.encifher.io/docs), indica que tu interacción con la cadena no es anónima: las personas pueden ver que tu wallet usó la aplicación, pero no cuánto moviste. El ZEC también llega a una dirección transparente, por lo que permanece visible en la cadena de Zcash hasta que lo blindes.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Qué debes saber antes de intercambiar  
- **Lado de Solana.** El wrapping oculta los importes, pero la dirección de tu wallet y su uso de la aplicación son públicos. Sus [mejores prácticas](https://docs.encifher.io/docs/best-practices) advierten que un simple wrap, swap y unwrap hace que tu transacción sea vinculable.
- **Cifrado.** Los saldos cifrados se procesan off-chain dentro de un enclave de hardware (TEE). El [documento](https://eprint.iacr.org/2026/1504) de los desarrolladores indica que esto depende de la integridad del TEE, de una gestión honesta de claves de umbral y de la raíz de atestación en la nube, no solo de la criptografía.
- **Paso cross-chain.** El intercambio a ZEC se enruta mediante Near Intents, donde solucionadores independientes ejecutan la orden.
- **Lado de Zcash.** Near Intents incluye ZEC como compatible únicamente con [direcciones transparentes](https://docs.near-intents.org/resources/chain-support), y el campo ZEC de encrypt.trade solo aceptaba direcciones transparentes (t1 o t3) cuando se revisó esta guía en septiembre de 2026. Una dirección transparente muestra públicamente su saldo y las transferencias entrantes hasta que blindes los fondos.
- **Evaluación.** La aplicación verifica las wallets que se conectan mediante bases de datos como TRM y Chainalysis, y su [página de cumplimiento](https://docs.encifher.io/docs/compliance) indica que los registros cifrados pueden revisarse si existe una causa legal legítima. Near Intents también realiza su propia [evaluación](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Paso 1: Conecta tu wallet de Solana  
Visita [encrypt.trade](https://encrypt.trade/zec) usando **Chrome o Firefox** y conecta tu wallet **Phantom**, **Solflare** o **Slope**. Asegúrate de que tu wallet tenga suficiente **SOL** para las comisiones de gas y los tokens que deseas intercambiar. Una vez conectado, estarás listo para envolver tus activos.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Paso 2: Envuelve tus tokens  
Ve a la sección **Wrap**. Elige **SOL** o **USDC**, introduce el importe y confirma. La aplicación bloquea tus activos y emite **versiones cifradas (eSOL o eUSDC)**. Envolver un importe diferente del que intercambias dificulta relacionar ambos por el importe, pero no oculta que tu wallet utilizó la aplicación.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Paso 3: Prepara tu wallet de ZODL  
Descarga [**ZODL**](https://zodl.com), la wallet de Zcash mantenida por ZODL. En la pantalla Recibir, copia tu **dirección transparente de Zcash** (comienza con t1). Actualmente, encrypt.trade no acepta direcciones blindadas ni unificadas para ZEC. Guarda tu frase semilla de forma segura antes de continuar.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Paso 4: Intercambia  
De vuelta en **encrypt.trade**, ve a **Swap**. Selecciona **eSOL/eUSDC -> ZEC**, pega tu dirección transparente de ZODL, revisa los detalles y confirma.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** gestiona el enrutamiento cross-chain y envía los **ZEC** a tu wallet de ZODL. Puede tardar unos minutos. Near Intents recomienda permitir hasta 15 minutos para los intercambios cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Paso 5: Blinda tu ZEC  
Una vez que llegue el ZEC, usa la opción **Shield** de ZODL para moverlo al [pool blindado](/using-zcash/shielded-pools). Hasta entonces, permanece en una dirección transparente donde cualquiera puede ver el saldo. Blindar protege lo que hagas después, pero la transferencia entrante y la transacción de blindaje siguen siendo visibles en la cadena. Verifica siempre los enlaces, evita reutilizar direcciones y prueba primero con importes pequeños.  

---

###  Quién participa y dónde obtener ayuda  
- **encrypt.trade** es la aplicación, gestionada por JMD Labs Inc. Su [política de privacidad](https://encrypt.trade/privacy) indica que recopila datos técnicos como IP, navegador y detalles del dispositivo, envía la dirección de tu wallet, el historial reciente y los saldos a proveedores de cumplimiento antes de un intercambio, y puede conservar registros y resultados de evaluación AML durante hasta cinco años. Sus [términos](https://encrypt.trade/terms) prohíben usar una VPN o proxy para ocultar tu ubicación. Soporte: help@encifher.io o el grupo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) enlazado desde la aplicación.
- **Near Intents** enruta el paso cross-chain y entrega el ZEC. Consulta sus [términos de la API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) y la política de privacidad en near.com/privacy, rastrea los intercambios en el [explorador de Near Intents](https://explorer.near-intents.org) y pide ayuda en el [Near Intents Telegram](https://t.me/near_intents).

Los términos y las direcciones compatibles pueden cambiar, así que consulta las versiones vigentes antes de realizar un intercambio grande. Para conocer mejor el contexto general, consulta [Exchanges no custodiados](/using-zcash/non-custodial-exchanges).

---

Al combinar **Solana**, **Zcash** y **Near Intents**, **encrypt.trade** te ofrece una ruta rápida desde SOL o USDC hacia ZEC. Oculta los importes en Solana, pero no es privado de extremo a extremo, así que blinda tu ZEC una vez que llegue.
