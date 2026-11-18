<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# MetaMask Zcash Snap Guía de integración

> Guarda y envía ZEC blindados desde la extensión de navegador MetaMask, usando Zcash Snap de ChainSafe y la billetera web WebZjs.

## En resumen

* ChainSafe Zcash Snap añade ZEC blindadas a MetaMask en computadoras de escritorio (Chrome, Edge, Firefox). No se necesita ningún software Zcash adicional.
* Tus claves de Zcash se derivan de tu frase de recuperación MetaMask. Esa frase ahora protege tanto tu ETH como tus ZEC.
* Gestionas ZEC mediante la billetera WebZjs en webzjs.chainsafe.dev, no en la lista de activos propia de MetaMask.
* Tu cuenta obtiene una dirección unificada, por lo que quienes te envían fondos pagan en el pool más privado que admitan.
* Añade fondos mediante un swap (por ejemplo, de ETH a ZEC) o retirando ZEC de un exchange a tu dirección blindada.
* Recuperación: reinstala MetaMask y Snap, y luego importa tu frase de recuperación actual.

## Explicación esencial

Un MetaMask Snap es un complemento pequeño y aislado que enseña a MetaMask a usar una nueva blockchain. El Zcash Snap, desarrollado por ChainSafe y auditado por Hacken, permite que MetaMask derive claves de Zcash a partir de tu frase de recuperación actual y firme transacciones de Zcash.

MetaMask no muestra por sí mismo un saldo de ZEC. En su lugar, la billetera web WebZjs se conecta a Snap, se sincroniza con la red Zcash mediante un servidor lightwalletd y muestra tus direcciones y saldo. Las pruebas blindadas se calculan en tu navegador con WebAssembly, por eso los envíos pueden tardar un momento.

Los pasos siguientes explican cómo instalar Snap, conectar WebZjs, añadir fondos a la billetera, enviar y recibir, y comprobar los componentes de tu dirección unificada.

## Guía completa

Para ver una explicación visual y una guía paso a paso, mira esta [guía de **YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask ahora admite **Zcash blindadas (ZEC)** mediante la **Zcash Snap desarrollada por ChainSafe**, lo que te permite enviar, recibir y gestionar ZEC privadas directamente en la billetera de tu navegador. Auditada por **Hacken** e incluida en el **directorio oficial de Snaps de MetaMask**, no requiere **software Zcash adicional**: solo MetaMask y Snap.

---

## **Requisitos previos**


> [Extensión de **MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (solo para computadora de escritorio): Chrome, Edge o Firefox.
> Cuenta de MetaMask: frase semilla protegida; Snap deriva de ella las claves de Zcash.  
> Conexión estable a Internet: para sincronizar con la red Zcash.  
> Fondos: ETH para intercambiar por ZEC o ZEC de un exchange.

> **Consejo:** Protege tu frase de recuperación de MetaMask: controla tanto ETH como ZEC.

---

## **1. Instala Zcash Snap**

1. Ve al [directorio de Snaps de **MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Busca [**«Zcash WebZjs Wallet»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) o [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Haz clic en **Instalar/Añadir a MetaMask**.
4. Aprueba permisos como:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opcional) Añade la red Zcash**

En MetaMask, elige **Añadir red** e introduce:

Para **BNB SmartChain**:
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Esto habilita la información de red y los enlaces a exploradores.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Para **la red principal de Zcash**:
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` es un servidor lightwalletd compatible con WebZjs (gRPC-web), operado por [zec.rocks](https://zec.rocks) (@emersonian). Para la red de pruebas, usa `https://zjs.zec.rocks/testnet`. Si ejecutas tú mismo la billetera web WebZjs, este es el valor que debes establecer como `LIGHTWALLETD_PROXY`.

---

## **3. Conéctate a la billetera WebZjs de ChainSafe**

1. Visita [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Haz clic en **Conectar MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Aprueba la conexión.  
4. Consulta el resumen de tu cuenta de Zcash, que incluye:
   - Direcciones unificadas y dirección transparente

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Espera a que termine la sincronización.




---

## **4. Añade fondos a tu billetera**

> **Intercambia ETH por ZEC**: usa servicios como **LeoDex** y envía los fondos a tu dirección blindada.  
> **Retiro de un exchange**: retira ZEC que hayas comprado a tu dirección blindada de WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Usa direcciones blindadas (z) para obtener **privacidad total**.

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
5. Los fondos recibidos aparecerán en WebZjs después de la confirmación.

---

## **6. Verifica / soluciona problemas**

> Consulta **WebZjs** para ver los saldos actualizados **(MetaMask no incluye ZEC directamente en su lista)**.  
> Si surgen problemas:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Consejo de seguridad:** Instala únicamente el **ChainSafe Snap auditado**; revisa los permisos antes de aprobarlos.

---

## **7. Comprueba los componentes de la dirección**

1. Ve a la sección **Recibir**: tu dirección unificada aparecerá de forma predeterminada.  
2. Copia la dirección unificada y visita el [explorador de bloques de Zcash](https://mainnet.zcashexplorer.app/).  
3. Pega tu dirección unificada en la barra de búsqueda.  
4. Ahora verás todos los componentes de la dirección unificada, incluidos:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Notas adicionales**

> Usa la [**versión más reciente de MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en): la versión pública admite Snaps.  
> Las pruebas blindadas pueden tardar; WebAssembly realiza los cálculos en el navegador.  
> La recuperación es sencilla: instala MetaMask y Snap, y luego importa tu frase semilla actual.  
> Snap usa **ZEC blindadas** de forma predeterminada; las direcciones transparentes **no son el objetivo principal**.  
> Usa [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) para confirmar las transacciones.
