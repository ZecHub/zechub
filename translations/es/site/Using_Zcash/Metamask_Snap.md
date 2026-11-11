# MetaMask Zcash Guía de integración de Snap

Para obtener un recorrido completo y una explicación visual, mira esta [**YouTube guía**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask ahora admite **Zcash blindado [shielded] (ZEC)** mediante el **Snap de Zcash desarrollado por ChainSafe**, lo que te permite enviar, recibir y administrar ZEC privados directamente en la billetera [wallet] de tu navegador. Auditado por **Hacken** e incluido en el **directorio oficial de Snaps de MetaMask**, no requiere software de Zcash independiente, solo MetaMask y el Snap.

---

## **Requisitos previos**


> [**Extensión de MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (solo escritorio) - Chrome, Edge o Firefox.
> Cuenta de MetaMask - Frase semilla [seed phrase] protegida; el Snap deriva las claves de Zcash de ella.  
> Conexión a Internet estable - Para sincronizar con la red [chain] de Zcash.  
> Fondos - ETH para hacer swap por ZEC o ZEC de un exchange [exchange].

> **Consejo:** Protege tu frase de recuperación de MetaMask, ya que controla tanto ETH como ZEC.

---

## **1. Instala el Snap de Zcash**

1. Ve al [**directorio de Snaps de MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Busca [**«Zcash Shielded Wallet»**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) o [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Haz clic en **Instalar/Añadir a MetaMask**.
4. Aprueba permisos como:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opcional) Añade la red de Zcash**

En MetaMask, selecciona **Añadir red** e introduce:

Para **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Esto habilita la información de la red y los enlaces al explorador.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Para **Mainnet de Zcash**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` es un servidor de lightwalletd compatible con WebZjs (gRPC-web) operado por [zec.rocks](https://zec.rocks) (@emersonian). Para testnet, usa `https://zjs.zec.rocks/testnet`. Si ejecutas la billetera web WebZjs por tu cuenta, este es el valor que debes configurar como `LIGHTWALLETD_PROXY`.

---

## **3. Conéctate a la billetera WebZjs de ChainSafe**

1. Visita [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Haz clic en **Conectar MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Aprueba la conexión.  
4. Consulta el resumen de tu cuenta de Zcash, que incluye:
   - Direcciones unificadas y dirección transparente [transparent]

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Espera a que se complete la sincronización.




---

## **4. Financia tu billetera**

> **Haz swap de ETH por ZEC** - Usa servicios como **LeoDex** y envía a tu dirección blindada.  
> **Retiro desde un exchange** - Retira el ZEC adquirido a tu dirección blindada de WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Usa direcciones blindadas (z) para disfrutar de **privacidad [privacy] total**.

---

## **5. Envía / recibe ZEC**

1. En **WebZjs**, ve a **Transferir saldo**.  
2. Introduce:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Confirma la transacción [transaction] en MetaMask (firma la transacción).  
5. Los fondos recibidos aparecerán en WebZjs después de la confirmación.

---

## **6. Verifica / soluciona problemas**

> Consulta **WebZjs** para ver los saldos actualizados **(MetaMask no ha incluido ZEC directamente)** .  
> Si surgen problemas:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Consejo de seguridad:** Instala únicamente el **Snap de ChainSafe auditado**; revisa los permisos antes de aprobarlos.

---

## **7. Comprueba los componentes de la dirección**

1. Ve a la sección **Recibir**; tu dirección unificada se mostrará de forma predeterminada.  
2. Copia la dirección unificada y visita el [Zcash Explorador de bloques](https://mainnet.zcashexplorer.app/).  
3. Pega tu dirección unificada en la barra de búsqueda.  
4. Ahora verás todos los componentes de la dirección unificada, que incluyen:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Notas adicionales**

> Usa la [**última versión de MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en); la versión pública admite Snaps.  
> Las pruebas [proofs] blindadas pueden tardar; WebAssembly gestiona el cálculo en el navegador.  
> La recuperación es sencilla: instala MetaMask y el Snap, luego importa tu semilla existente.  
> El Snap usa de forma predeterminada ZEC **blindado**, las direcciones transparentes **no son el enfoque**.  
> Usa [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) para confirmar transacciones.
