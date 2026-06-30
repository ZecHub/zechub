# Guía de integración de MetaMask Zcash Snap

Para un recorrido completo y una explicación visual, mira esta [**guía de YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask ahora admite **Zcash (ZEC) blindado** mediante el **Zcash Snap desarrollado por ChainSafe**, lo que te permite enviar, recibir y gestionar ZEC privado directamente en tu billetera del navegador. Auditado por **Hacken** y listado en el **directorio oficial de MetaMask Snaps**, no requiere **software de Zcash por separado**; solo MetaMask y el Snap.

---

## **Requisitos previos**


> [**Extensión de MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (solo escritorio) - Chrome, Edge o Firefox.
> Cuenta de MetaMask - Frase semilla protegida; el Snap deriva las claves de Zcash a partir de ella.  
> Conexión estable a Internet - Para sincronizar con la red de Zcash.  
> Fondos - ETH para intercambiar por ZEC o ZEC desde un exchange.

> **Consejo:** Protege tu frase de recuperación de MetaMask; controla tanto ETH como ZEC.

---

## **1. Instalar el Zcash Snap**

1. Ve al [**directorio de MetaMask Snaps**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Busca [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) o [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Haz clic en **Instalar/Añadir a MetaMask**.
4. Aprueba permisos como:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Instalación-de-Zcash-snap](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (Opcional) Añadir la red Zcash**

En MetaMask, elige **Añadir red** e introduce:

Para **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Esto habilita la información de red y los enlaces al explorador.
![Añadir-una-red-personalizada....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

Para **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Conectarse a la billetera ChainSafe WebZjs**

1. Visita [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Haz clic en **Connect MetaMask Snap**.  

![Billetera-web-de-Zcash](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Aprueba la conexión.  
4. Consulta el resumen de tu cuenta de Zcash, que incluye:
   - Direcciones unificadas y dirección transparente

![Resumen-de-cuenta-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Espera a que se complete la sincronización.




---

## **4. Financiar tu billetera**

> **Intercambiar ETH -> ZEC** - Usa servicios como **LeoDex** y envía a tu dirección blindada.  
> **Retiro desde exchange** - Retira el ZEC comprado a tu dirección blindada de WebZjs.  

![INTERCAMBIO-LEODEX](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => Usa direcciones blindadas (z) para **privacidad total**.

---

## **5. Enviar / Recibir ZEC**

1. En **WebZjs**, ve a **Transfer Balance**.  
2. Introduce:
```
   - Shielded recipient address  
   - Amount
```
   ![Transferir-saldo](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. Confirma la transacción en MetaMask (firma la transacción).  
5. Los fondos recibidos aparecerán en WebZjs después de la confirmación.

---

## **6. Verificar / Solucionar problemas**

> Revisa **WebZjs** para ver los saldos actualizados **(MetaMask aún no muestra ZEC directamente)** .  
> Si surgen problemas:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Consejo de seguridad:** Instala solo el **ChainSafe Snap auditado**; revisa los permisos antes de aprobarlos.

---

## **7. Revisar los componentes de la dirección**

1. Ve a la sección **Receive**; tu Unified Address se mostrará por defecto.  
2. Copia la Unified Address y visita el [explorador de bloques de Zcash](https://mainnet.zcashexplorer.app/).  
3. Pega tu Unified Address en la barra de búsqueda.  
4. Ahora verás todos los componentes de la Unified Address, que incluyen:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Componentes-de-la-dirección](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **Notas adicionales**

> Usa la [**última versión de MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en); la versión pública admite Snaps.  
> Las pruebas blindadas pueden tardar; WebAssembly gestiona el cómputo en el navegador.  
> La recuperación es sencilla: instala MetaMask y el Snap, luego importa tu semilla existente.  
> El Snap usa por defecto **ZEC blindado**; las direcciones transparentes **no son el enfoque principal**.  
> Usa [zcashblockexplorer.com](https://zcashblockexplorer.com) para confirmar transacciones.
