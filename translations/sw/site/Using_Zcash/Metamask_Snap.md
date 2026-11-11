# MetaMask Zcash Mwongozo wa Ujumuishaji wa Snap

Kwa maelezo kamili na ufafanuzi wa kuona, tazama [**mwongozo huu wa YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask sasa inasaidia **Zcash za faragha [shielded] (ZEC)** kupitia **Snap ya Zcash iliyotengenezwa na ChainSafe**, ikikuwezesha kutuma, kupokea, na kusimamia ZEC za faragha moja kwa moja katika pochi yako [wallet] ya kivinjari. Ikiwa imekaguliwa na **Hacken** na kuorodheshwa katika **Orodha rasmi ya Snaps ya MetaMask**, haihitaji **programu tofauti ya Zcash** - ni MetaMask na Snap pekee.

---

## **Masharti ya Awali**


> [**Kiendelezi cha MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (kompyuta ya mezani pekee) - Chrome, Edge, au Firefox.
> Akaunti ya MetaMask - Maneno ya kurejesha pochi yamelindwa; Snap hupata funguo za Zcash kutoka kwayo.  
> Muunganisho Imara wa Intaneti - Kwa kusawazisha na mtandao wa Zcash.  
> Fedha - ETH ya kubadilisha [swap] kwa ZEC au kununua ZEC kutoka soko la kubadilishana sarafu [exchange].

> **Dokezo:** Linda maneno yako ya kurejesha pochi ya MetaMask - yanadhibiti ETH na ZEC zote mbili.

---

## **1. Sakinisha Snap ya Zcash**

1. Nenda kwenye [**Orodha ya Snaps ya MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Tafuta [**"Pochi ya Zcash ya Faragha"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) au [**"Snap ya WebZjs Zcash"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Bofya **Sakinisha/Ongeza kwenye MetaMask**.
4. Idhinisha ruhusa kama vile:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Hiari) Ongeza Mtandao wa Zcash**

Katika MetaMask, chagua **Ongeza Mtandao** na uweke:

Kwa **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Hii huwezesha maelezo ya mtandao na viungo vya kichunguzi.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Kwa **Mainnet ya Zcash**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` ni seva ya lightwalletd inayooana na WebZjs (gRPC-web) inayoendeshwa na [zec.rocks](https://zec.rocks) (@emersonian). Kwa testnet, tumia `https://zjs.zec.rocks/testnet`. Ukiendesha mwenyewe pochi ya wavuti ya WebZjs, hiki ndicho thamani ya kuweka kama `LIGHTWALLETD_PROXY`.

---

## **3. Unganisha kwenye Pochi ya ChainSafe WebZjs**

1. Tembelea [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Bofya **Unganisha MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Idhinisha muunganisho.  
4. Tazama muhtasari wa akaunti yako ya Zcash, ikijumuisha:
   - Anwani zilizounganishwa na anwani ya uwazi [transparent]

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Subiri usawazishaji ukamilike.




---

## **4. Weka Fedha kwenye Pochi Yako**

> **Badilisha ETH -> ZEC** - Tumia huduma kama **LeoDex** na utume kwenye anwani yako ya faragha.  
> **Utoaji kutoka Soko la Kubadilishana Sarafu** - Toa ZEC uliyonunua kwenda kwenye anwani yako ya faragha ya WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Tumia anwani za faragha (z) kwa **faragha kamili [privacy]**.

---

## **5. Tuma / Pokea ZEC**

1. Katika **WebZjs**, nenda kwenye **Hamisha Salio**.  
2. Weka:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Thibitisha muamala [transaction] katika MetaMask (tia saini muamala).  
5. Fedha zilizopokelewa zitaonekana katika WebZjs baada ya uthibitisho.

---

## **6. Thibitisha / Tatua Matatizo**

> Angalia **WebZjs** kwa masalio yaliyosasishwa **(MetaMask haijaorodhesha ZEC moja kwa moja)** .  
> Matatizo yakitokea:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Dokezo la Usalama:** Sakinisha **Snap ya ChainSafe iliyokaguliwa** pekee; kagua ruhusa kabla ya kuidhinisha.

---

## **7. Angalia Vipengele vya Anwani**

1. Nenda kwenye sehemu ya **Pokea** - Anwani yako Iliyounganishwa itaonyeshwa kwa chaguo-msingi.  
2. Nakili Anwani Iliyounganishwa na utembelee [Kichunguzi cha Block cha Zcash](https://mainnet.zcashexplorer.app/).  
3. Bandika Anwani yako Iliyounganishwa katika upau wa utafutaji.  
4. Sasa utaona vipengele vyote vya Anwani Iliyounganishwa, ambavyo vinajumuisha:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Maelezo ya Ziada**

> Tumia [**toleo la hivi karibuni la MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - toleo la umma linaunga mkono Snaps.  
> Mathibitisho ya faragha [shielded proofs] yanaweza kuchukua muda; WebAssembly hushughulikia ukokotoaji katika kivinjari.  
> Urejeshaji ni rahisi, sakinisha MetaMask na Snap, kisha leta maneno yako ya kurejesha pochi yaliyopo.  
> Snap hutumia **ZEC za faragha** kwa chaguo-msingi; anwani za uwazi **si lengo kuu**.  
> Tumia [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) kwa uthibitisho wa miamala.
