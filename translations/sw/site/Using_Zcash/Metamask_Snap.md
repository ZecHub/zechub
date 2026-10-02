# Mwongozo wa Ujumuishaji wa MetaMask Zcash Snap

Kwa maelezo kamili na maelezo ya kuona, tazama hii [**YouTube guide**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask sasa inasaidia **Zcash iliyolindwa (ZEC)** kupitia **Zcash Snap** iliyotengenezwa na ChainSafe, inayokuruhusu kutuma, kupokea, na kudhibiti ZEC ya kibinafsi moja kwa moja kwenye pochi yako ya kivinjari. Imekaguliwa na **Hacken** na kuorodheshwa katika **Saraka rasmi MetaMask Snaps**, inahitaji **hakuna programu tofauti Zcash** - MetaMask na Snap pekee.

---

## **Masharti**


> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (kompyuta pekee) - Chrome, Edge, au Firefox.
> Akaunti MetaMask - Kifungu cha mbegu kimelindwa; Snap hupata funguo za Zcash kutoka humo. 
> Muunganisho wa Intaneti Ulio imara - Kwa ajili ya kusawazisha na mtandao wa Zcash. 
> Fedha - ETH ya kubadilishana na ZEC au ZEC kutoka kwa soko la kubadilishana.

> **Ushauri:** Linda kifungu chako cha urejeshaji MetaMask - kinadhibiti ETH na ZEC.

---

## **1. Sakinisha Zcash Snap**

1. Nenda kwenye [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Tafuta [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) or [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Bonyeza **Sakinisha/Ongeza kwenye MetaMask**.
4. Idhinisha ruhusa kama vile:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Si lazima) Ongeza Mtandao wa Zcash**

Katika MetaMask, chagua **Ongeza Mtandao** na uingize:

Kwa **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Hii huwezesha taarifa za mtandao na viungo vya wachunguzi.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Kwa **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` ni seva lightwalletd inayooana na WebZjs (gRPC-web) inayoendeshwa na [zec.rocks](https://zec.rocks) (@emersonian). Kwa testnet, tumia `https://zjs.zec.rocks/testnet`Ukiendesha pochi ya wavuti ya WebZjs mwenyewe, hii ndiyo thamani ya kuweka kama `LIGHTWALLETD_PROXY`.

---

## **3. Unganisha kwenye Pochi ya ChainSafe WebZjs**

1. Tembelea [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Bonyeza **Unganisha MetaMask Snap**. 

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Idhinisha muunganisho. 
4. Tazama muhtasari wa akaunti yako Zcash, ikijumuisha:
   - Anwani zilizounganishwa na anwani ya uwazi

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Subiri usawazishaji ukamilike.




---

## **4. Weka Pesa kwenye Pochi Yako**

> **Badilisha ETH -> ZEC** - Tumia huduma kama **LeoDex** na utume kwa anwani yako iliyolindwa. 
> **Kutoa Pesa** - Toa pesa kutoka ZEC uliyonunua kwenye anwani yako iliyolindwa ya WebZjs. 

![LEODEX-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Tumia anwani zilizolindwa (z) kwa **faragha kamili**.

---

## **5. Tuma / Pokea ZEC**

1. Katika **WebZjs**, nenda kwenye **Salio la Uhamisho**. 
2. Ingiza:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Thibitisha muamala katika MetaMask (saini muamala). 
5. Pesa zilizopokelewa zitaonekana katika WebZjs baada ya uthibitisho.

---

## **6. Thibitisha / Tatua Matatizo**

> Angalia **WebZjs** kwa salio zilizosasishwa **(MetaMask haijaorodhesha ZEC moja kwa moja)**. 
> Ikiwa matatizo yatatokea:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Ushauri wa Usalama:** Sakinisha tu **ChainSafe Snap** iliyokaguliwa; kagua ruhusa kabla ya kuidhinishwa.

---

## **7. Angalia Vipengele vya Anwani**

1. Nenda kwenye sehemu ya **Pokea** - Unified Address itaonyeshwa kwa chaguo-msingi. 
2. Nakili Unified Address na utembelee [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Bandika Unified Address kwenye upau wa utafutaji. 
4. Sasa utaona vipengele vyote vya Unified Address, ambavyo ni pamoja na:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Maelezo ya Ziada**

> Tumia [**toleo jipya zaidi MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - toleo la umma linaunga mkono Snaps. 
> Uthibitishaji uliolindwa unaweza kuchukua muda, WebAssembly hushughulikia hesabu ndani ya kivinjari. 
> Urejeshaji ni rahisi, sakinisha MetaMask na Snap, kisha ingiza mbegu yako iliyopo. 
> Snap hubadilika kuwa **ZEC**, anwani zinazoonekana sio **lengo**. 
> Tumia [zcashblockexplorer.com](https://zcashblockexplorer.com) kwa uthibitisho wa miamala.











