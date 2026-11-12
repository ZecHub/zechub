<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guía de integración de MetaMask Zcash Snap

> Guarda y envía ZEC blindado [shielded] desde la extensión de navegador MetaMask, usando ChainSafe Zcash Snap y la billetera web WebZjs.

## Resumen

* El ChainSafe Zcash Snap añade ZEC blindado a MetaMask en computadoras de escritorio (Chrome, Edge, Firefox). No se necesita software Zcash independiente.
* Tus claves Zcash se derivan de tu frase de recuperación MetaMask. Esa única frase ahora protege tanto tu ETH como tu ZEC.
* Gestionas ZEC mediante la billetera WebZjs en webzjs.chainsafe.dev, no en la propia lista de activos de MetaMask.
* Tu cuenta obtiene una dirección unificada, por lo que los remitentes te pagan en el pool más privado que admitan.
* Fínanciala realizando un swap (por ejemplo, de ETH a ZEC) o retirando ZEC de un exchange a tu dirección blindada.
* Recuperación: reinstala MetaMask y Snap, después importa tu frase de recuperación existente.

## Explicación principal

Un MetaMask Snap es un pequeño complemento aislado que enseña a MetaMask una nueva blockchain. El Zcash Snap, desarrollado por ChainSafe y auditado por Hacken, permite que MetaMask derive claves Zcash de tu frase de recuperación existente y firme transacciones Zcash.

MetaMask no muestra por sí mismo un saldo ZEC. En cambio, la billetera web WebZjs se conecta a Snap, se sincroniza con la red Zcash a través de un servidor lightwalletd y muestra tus direcciones y saldo. Las pruebas blindadas se calculan en tu navegador con WebAssembly, por lo que los envíos pueden tardar un momento.

Los pasos a continuación cubren la instalación de Snap, la conexión de WebZjs, la financiación de la billetera, el envío y la recepción, y la verificación de las partes de tu dirección unificada.

## Guía completa

Para obtener un recorrido completo y una explicación visual, mira esta [**guía de YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Cómo usar ZEC en Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     
MetaMask ahora admite **Zcash blindado [shielded] (ZEC)** mediante el **Zcash Snap desarrollado por ChainSafe**, lo que te permite enviar, recibir y gestionar ZEC privados directamente en tu billetera [wallet] del navegador. Auditado por **Hacken** e incluido en el **directorio oficial de Snaps de MetaMask**, no requiere **software de Zcash independiente**: solo MetaMask y el Snap.

---

## **Requisitos previos**


> Extensión [**MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (solo computadoras de escritorio) - Chrome, Edge o Firefox.
> Cuenta de MetaMask - Frase semilla protegida; Snap deriva de ella las claves Zcash.  
> Conexión a Internet estable - Para sincronizar con la red Zcash.  
> Fondos - ETH para intercambiar por ZEC o ZEC desde un exchange.

> **Consejo:** Protege tu frase de recuperación MetaMask: controla tanto ETH como ZEC.

---

## **1. Instala Zcash Snap**

1. Ve al [**Directorio de Snaps de MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Busca [**«Zcash Shielded Wallet»**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) o [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Haz clic en **Instalar/Añadir a MetaMask**.
4. Aprueba permisos como:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opcional) Añade la red Zcash**

En MetaMask, selecciona **Añadir red** e introduce:

Para **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Esto habilita información de red y enlaces al explorador.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Para la **Mainnet de Zcash**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` es un servidor lightwalletd compatible con WebZjs (gRPC-web), gestionado por [zec.rocks](https://zec.rocks) (@emersonian). Para testnet, usa `https://zjs.zec.rocks/testnet`. Si ejecutas tú mismo la billetera web WebZjs, este es el valor que debes establecer como `LIGHTWALLETD_PROXY`.

---

## **3. Conéctate a la billetera ChainSafe WebZjs**

1. Visita [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Haz clic en **Conectar MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Aprueba la conexión.  
4. Consulta el resumen de tu cuenta Zcash, que incluye:
   - Direcciones unificadas y dirección transparente

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Espera a que finalice la sincronización.




---

## **4. Financia tu billetera**

> **Swap de ETH -> ZEC** - Usa servicios como **LeoDex** y envía a tu dirección blindada.  
> **Retiro desde exchange** - Retira los ZEC adquiridos a tu dirección blindada WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Usa direcciones blindadas (z) para **privacidad total**.

---

## **5. Envía / recibe ZEC**

1. En **WebZjs**, ve a **Transferir saldo**.  
2. Introduce:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Confirma la transacción en MetaMask (firma la transacción).  
5. Los fondos recibidos aparecerán en WebZjs tras la confirmación.

---

## **6. Verifica / soluciona problemas**

> Revisa **WebZjs** para ver los saldos actualizados **(MetaMask no ha incluido ZEC directamente)** .  
> Si surgen problemas:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Consejo de seguridad:** Instala únicamente ChainSafe Snap **auditado**; revisa los permisos antes de aprobarlos.

---

## **7. Verifica los componentes de la dirección**

1. Ve a la sección **Recibir**: tu dirección unificada se mostrará de forma predeterminada.  
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

> Usa la [**versión más reciente de MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en): la versión pública admite Snaps.  
> Las pruebas blindadas pueden tardar; WebAssembly gestiona el cálculo en el navegador.  
> La recuperación es sencilla: instala MetaMask y Snap, después importa tu semilla existente.  
> Snap usa de forma predeterminada ZEC **blindado**; las direcciones transparentes **no son el enfoque**.  
> Usa [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) para confirmar transacciones.
