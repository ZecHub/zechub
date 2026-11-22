<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Swap de SOL/USDC a ZEC usando encrypt.trade

> Haz swap de SOL o USDC en Solana a ZEC, con el paso cross-chain enrutado a través de NEAR Intents.

![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


---

## Resumen (TL;DR)

* [encrypt.trade](https://encrypt.trade/zec) envuelve SOL o USDC en tokens cifrados (eSOL/eUSDC) y luego hace el swap a ZEC a través de NEAR Intents.
* Los montos están ocultos en Solana, pero la dirección de tu billetera y su uso de la aplicación son públicos.
* ZEC se entrega solo a una dirección transparente (t1/t3), por lo que es visible en la red de Zcash hasta que lo blindes.
* Blinda los ZEC en tu billetera en cuanto lleguen.
* Tanto la aplicación como NEAR Intents revisan las billeteras por motivos de cumplimiento normativo.

---

## Explicación principal
[**encrypt.trade**](https://encrypt.trade/zec) es una app de Solana gestionada por JMD Labs Inc. Te permite hacer swap de **SOL o USDC** en Solana a **Zcash (ZEC)**. Primero, tus tokens se envuelven en versiones cifradas para que los importes queden ocultos en Solana, y luego se intercambian por ZEC a través de NEAR Intents.

El swap ofrece privacidad [privacy] en algunos aspectos, pero no en todos. La documentación de la propia app [docs](https://docs.encifher.io/docs) indica que tu interacción con la cadena [chain] no es anónima: las personas pueden ver que tu billetera [wallet] usó la app, pero no cuánto moviste. El ZEC también llega a una dirección transparente [transparent], por lo que permanece visible en la red Zcash hasta que lo blindes.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Lo Que Debes Saber Antes de Hacer Swap  
- **Lado de Solana.** El envoltorio oculta los importes, pero la dirección de tu billetera y su uso de la app son públicos. Sus [mejores prácticas](https://docs.encifher.io/docs/best-practices) advierten que un simple envoltorio, swap y desenvoltorio hace que tu transacción [transaction] sea vinculable.
- **Cifrado [encryption].** Los saldos cifrados se procesan off-chain dentro de un enclave de hardware (TEE). El [documento](https://eprint.iacr.org/2026/1504) de los desarrolladores indica que esto depende de la integridad del TEE, de una gestión honesta de claves de umbral y de la raíz de certificación de la nube, no solo de la criptografía.
- **Paso cross-chain.** El swap a ZEC se enruta a través de NEAR Intents, donde solucionadores independientes ejecutan la orden.
- **Lado de Zcash.** NEAR Intents incluye ZEC como compatible solo con [direcciones transparentes](https://docs.near-intents.org/resources/chain-support), y el campo ZEC de encrypt.trade solo aceptaba direcciones transparentes (t1 o t3) cuando se revisó esta guía en septiembre de 2026. Una dirección transparente muestra públicamente su saldo y las transferencias entrantes hasta que blindas los fondos.
- **Verificación.** La app comprueba las billeteras que se conectan frente a bases de datos como TRM y Chainalysis, y su [página de cumplimiento](https://docs.encifher.io/docs/compliance) indica que los registros cifrados pueden revisarse si existe una causa legal legítima. NEAR Intents también realiza su propia [verificación](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Paso 1: Conecta Tu Billetera de Solana  
Visita [encrypt.trade](https://encrypt.trade/zec) con **Chrome o Firefox** y conecta tu billetera **Phantom**, **Solflare** o **Slope**. Asegúrate de que tu billetera tenga suficiente **SOL** para las tarifas de gas y los tokens que deseas intercambiar. Una vez conectada, estarás listo para envolver tus activos.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Paso 2: Envuelve Tus Tokens  
Ve a la sección **Wrap**. Elige **SOL** o **USDC**, introduce el importe y confirma. La app bloquea tus activos y emite **versiones cifradas (eSOL o eUSDC)**. Envolver un importe distinto del que intercambias dificulta relacionar ambos por el importe, pero no oculta que tu billetera usó la app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Paso 3: Prepara Tu Billetera de ZODL  
Descarga [**ZODL**](https://zodl.com), la billetera de Zcash mantenida por ZODL. En la pantalla de recepción, copia tu **dirección transparente de Zcash** (empieza con t1). Actualmente, encrypt.trade no acepta direcciones blindadas ni unificadas para ZEC. Guarda tu frase semilla [seed phrase] de forma segura antes de continuar.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Paso 4: Haz Swap  
De vuelta en **encrypt.trade**, ve a **Swap**. Selecciona **eSOL/eUSDC -> ZEC**, pega tu dirección transparente de ZODL, revisa los detalles y confirma.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents** gestiona el enrutamiento cross-chain y envía el **ZEC** a tu billetera de ZODL. Puede tardar unos minutos. NEAR Intents sugiere esperar hasta 15 minutos para los swaps cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Paso 5: Blinda Tu ZEC  
Una vez que llegue el ZEC, usa la opción **Shield** de ZODL para moverlo al [pool blindado](/using-zcash/shielded-pools). Hasta entonces, permanece en una dirección transparente donde cualquiera puede ver el saldo. El blindaje protege lo que hagas después, pero la transferencia entrante y la transacción de blindaje permanecen visibles on-chain. Verifica siempre los enlaces, evita reutilizar direcciones y prueba primero con importes pequeños.  

---

###  Quién Participa y Dónde Obtener Ayuda  
- **encrypt.trade** es la app, gestionada por JMD Labs Inc. Su [política de privacidad](https://encrypt.trade/privacy) indica que recopila datos técnicos como IP, navegador y detalles del dispositivo, envía la dirección de tu billetera, el historial reciente y los saldos a proveedores de cumplimiento antes de un swap, y puede conservar registros y resultados de verificaciones AML hasta cinco años. Sus [términos](https://encrypt.trade/terms) prohíben usar una VPN o un proxy para ocultar tu ubicación. Soporte: help@encifher.io o el grupo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) enlazado desde la app.
- **NEAR Intents** enruta el paso cross-chain y entrega el ZEC. Consulta sus [términos de la API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) y la política de privacidad en near.com/privacy, sigue los swaps en el explorador [NEAR Intents](https://explorer.near-intents.org) y solicita ayuda en [NEAR Intents Telegram](https://t.me/near_intents).

Los términos y las direcciones compatibles pueden cambiar, así que revisa las versiones actuales antes de un swap grande. Para conocer mejor el panorama general, consulta [Exchanges sin custodia](/using-zcash/non-custodial-exchanges).

---

Al combinar **Solana**, **Zcash** y **NEAR Intents**, **encrypt.trade** te ofrece una ruta rápida de SOL o USDC a ZEC. Oculta los importes en Solana, pero no ofrece privacidad de extremo a extremo, así que blinda tu ZEC cuando llegue.
