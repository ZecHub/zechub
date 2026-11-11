# MetaMask Zcash Snap ƒe ƒoƒo ƒe mɔfia

Ne nàdi mɔfia bliboa kple nukpɔkpɔ ƒe gɔmeɖeɖe la, kpɔ [**YouTube mɔfia**](https://www.youtube.com/watch?v=UJh9Ilkohdw) sia: 

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
     

MetaMask doa alɔ ɖe **ɣaɣla [shielded] Zcash (ZEC)** dzi fifia to **ChainSafe wɔ Zcash Snap** la me, eye wòate ŋu aɖo, naxɔ, eye nàdzra ZEC siwo nye ame ƒe nusiwo le eme kple wò browser gakotoku [wallet] me tɔxɛ. **Hacken** wɔ dɔmeɖeɖe le eŋu eye woɖe eƒe ŋkɔ ɖe **oficial MetaMask Snaps Directory** la me; ehiã be nàtsɔ Zcash ƒe software bubu aɖeke o - MetaMask kple Snap koe nàhiã.

---

## **Nusiwo wòhia ɖoɖo**

> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (desktop koe) - Chrome, Edge, alo Firefox.
> MetaMask Account - Wò gadzraɖoɖi nya [seed phrase] nanɔ dzidzedze; Snap la atsa Zcash ƒe keys tso eŋu.  
> Internet ƒoɖoɖo si le te - Be wòawɔ sync kple Zcash network la.  
> Ga - ETH si nàtsɔ awɔ ɖɔli ɖɔli [swap] na ZEC alo ZEC tso gatrɔƒe [exchange] aɖe me.

> **Nuxlɔ̃ame:** Léa ŋkuléle nyuie ɖe wò MetaMask recovery phrase ŋu - Eyae kpɔa ETH kple ZEC siaa dzi.

---

## **1. Ɖo Zcash Snap**

1. Yi ɖe [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) la dzi.  
2. Di [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) alo [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Zi **Install/Add to MetaMask** dzi.
4. Ɖe asi ɖe mɔ naɖeɖe siwo ƒe kpɔɖeŋuwoe nye:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Ne èdi) Tsɔ Zcash Network kpee**

Le MetaMask me la, tia **Add Network** eye nàŋlɔ esiawo:

Na **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Esia ana network ƒe nyatakakawo kple explorer ƒe linkwo nava.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Na **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` nye WebZjs-compatible (gRPC-web) lightwalletd server si [zec.rocks](https://zec.rocks) (@emersonian) wɔ. Na testnet la, zã `https://zjs.zec.rocks/testnet`. Ne èwɔ WebZjs web gakotoku la wò ŋutɔ la, esiae nye asixɔxɔ si nàɖo abe `LIGHTWALLETD_PROXY` ene.

---

## **3. Ƒo ƒome kple ChainSafe WebZjs Wallet**

1. Yi ɖe [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Zi **Connect MetaMask Snap** dzi.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Ɖe asi ɖe ƒoƒo la ŋu.  
4. Kpɔ wò Zcash account ƒe nyatakaka bliboa, si me nusiawo le:
   - Unified addresses kple Transparent address

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Lala va se ɖe sync wɔwɔ ƒe nuwuwu.




---

## **4. Tsɔ Ga Ɖe Wò Gakotoku Me**

> **Wɔ ETH -> ZEC Ɖɔli Ɖɔli** - Zã dɔwɔƒewo abe **LeoDex** ene eye nàɖo ga la ɖe wò ɣaɣla gaɖoƒe ƒe dzesi [address] dzi.  
> **Gatrɔƒe ƒe Ga Ɖeɖe** - Ɖe ZEC si nèxɔ la ɖe wò WebZjs ɣaɣla gaɖoƒe ƒe dzesi dzi.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Zã ɣaɣla (z) gaɖoƒe ƒe dzesiwo ne nàxɔ **ɣaɣla [privacy] bliboa**.

---

## **5. Ɖo / Xɔ ZEC**

1. Le **WebZjs** me la, yi ɖe **Transfer Balance**.  
2. Ŋlɔ:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Ɖe asi ɖe gaɖoɖo [transaction] la ŋu le MetaMask me (de asi ɖe gaɖoɖo la ŋu).  
5. Ga si nèxɔ la ava WebZjs me le ƒoɖoɖo megbe.

---

## **6. Ɖe Kpɔ / Ɖo Kuxiwo Ɖa**

> Kpɔ **WebZjs** me be balance siwo woɖe yeyee le **(MetaMask menya ZEC tɔxɛ haɖe o)** .  
> Ne kuxi aɖe va:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Dedienɔnɔ ƒe Nuxlɔ̃ame:** Ɖo **ChainSafe Snap si woɖe kpɔ** la koe; kpɔ mɔ naɖeɖewo me hafi nàɖe asi.

---

## **7. Kpɔ Gaɖoƒe Ƒe Dzeƒewo**

1. Yi ɖe **Receive** ƒe akpa - Wò Unified Address ana woɖe afia wò le gɔmedzedze me.  
2. Kɔpi Unified Address eye nàyi ɖe [Zcash Block Explorer](https://mainnet.zcashexplorer.app/) la dzi.  
3. Ɖe wò Unified Address ɖe didi ƒe afea me.  
4. Fifia àkpɔ Unified Address la ƒe dzeƒe siawo katã, siwo nye:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Nyalɛŋlɔ Kpeɖeŋu Bubuwo**

> Zã [**MetaMask ƒe version yeye**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - public release la doa alɔ ɖe Snaps ŋu.  
> Ɣeaɖewo la, ɣaɣla ɖaseɖigbalɛ [proof] wo ate ŋu axɔ gaƒoƒo; WebAssembly wɔ akɔnta le browser la me.  
> Gaxɔxɔ le bɔbɔe, ɖo MetaMask kple Snap la, eye nàtsɔ wò gadzraɖoɖi nya si le asixɔxɔ xɔe va.  
> Snap la ƒe gɔmedzedze nye **ɣaɣla ZEC**, nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe ƒe dzesiwo **menye esi woɖo ŋku ɖo o**.  
> Zã [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) na gaɖoɖo ƒe ƒoɖoɖo.
