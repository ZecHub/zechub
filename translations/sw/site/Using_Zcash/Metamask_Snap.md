<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Mwongozo wa Ujumuishaji wa MetaMask Zcash Snap

> Hifadhi na tuma ZEC ya faragha [shielded] kutoka kwenye kiendelezi cha kivinjari cha MetaMask, ukitumia ChainSafe ya Zcash Snap na pochi ya wavuti ya WebZjs.

## Kwa Ufupi

* ChainSafe Zcash Snap huongeza ZEC ya faragha kwenye MetaMask kwenye kompyuta ya mezani (Chrome, Edge, Firefox). Hakuna programu tofauti ya Zcash inayohitajika.
* Funguo zako za Zcash hutokana na maneno yako ya kurejesha pochi [recovery phrase] ya MetaMask. Maneno hayo moja sasa hulinda ETH yako na ZEC yako.
* Unasimamia ZEC kupitia pochi ya WebZjs katika webzjs.chainsafe.dev, si katika orodha ya mali za MetaMask.
* Akaunti yako hupata anwani iliyounganishwa, hivyo watumaji hukulipa katika bwawa la faragha zaidi linalotumika kwao.
* Iwekeze kwa kubadilisha (kwa mfano ETH kuwa ZEC) au kwa kutoa ZEC kutoka soko la kubadilishana sarafu hadi anwani yako ya faragha.
* Urejeshaji: sakinisha upya MetaMask na Snap, kisha ingiza maneno yako yaliyopo ya kurejesha pochi.

## Maelezo ya Msingi

MetaMask Snap ni nyongeza ndogo, iliyotengwa, inayofundisha MetaMask blockchain mpya. Zcash Snap, iliyoundwa na ChainSafe na kukaguliwa na Hacken, huwezesha MetaMask kupata funguo za Zcash kutoka kwenye maneno yako yaliyopo ya kurejesha pochi na kutia sahihi miamala ya Zcash.

MetaMask yenyewe haionyeshi salio la ZEC. Badala yake, pochi ya wavuti ya WebZjs huunganishwa na Snap, husawazisha na mtandao wa Zcash kupitia seva ya lightwalletd, na huonyesha anwani na salio lako. Mathibitisho ya faragha huhesabiwa katika kivinjari chako kwa kutumia WebAssembly, ndiyo sababu kutuma kunaweza kuchukua muda mfupi.

Hatua zilizo hapa chini zinahusu kusakinisha Snap, kuunganisha WebZjs, kuweka fedha kwenye pochi, kutuma na kupokea, na kuangalia sehemu za anwani yako iliyounganishwa.

## Mwongozo Kamili

Kwa maelekezo kamili na ufafanuzi wa kuona, tazama mwongozo huu wa [**YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Jinsi ya kutumia ZEC kwenye Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask sasa inasaidia **Zcash ya faragha (ZEC)** kupitia **ChainSafe Zcash Snap iliyotengenezwa**, ikikuruhusu kutuma, kupokea, na kusimamia ZEC za faragha moja kwa moja katika pochi yako ya kivinjari. Imekaguliwa na **Hacken** na kuorodheshwa katika **Orodha rasmi ya Snaps ya MetaMask**, haihitaji **programu tofauti ya Zcash** - ni MetaMask na Snap pekee.

---

## **Mahitaji ya Awali**


> Kiendelezi cha [**MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (kompyuta ya mezani pekee) - Chrome, Edge, au Firefox.
> Akaunti ya MetaMask - Maneno ya kurejesha pochi yamelindwa; Snap hupata funguo za Zcash kutoka kwayo.  
> Muunganisho thabiti wa Intaneti - Kwa kusawazisha na mtandao wa Zcash.  
> Fedha - ETH ya kubadilisha kuwa ZEC au ZEC kutoka soko la kubadilishana sarafu.

> **Dokezo:** Linda maneno yako ya kurejesha pochi ya MetaMask - yanadhibiti ETH na ZEC zako.

---

## **1. Sakinisha Zcash Snap**

1. Nenda kwenye [**Orodha ya Snaps ya MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Tafuta [**"Pochi ya Faragha ya Zcash"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) au [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Bofya **Sakinisha/Ongeza kwenye MetaMask**.
4. Idhinisha ruhusa kama vile:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Si Lazima) Ongeza Mtandao wa Zcash**

Katika MetaMask, chagua **Ongeza Mtandao** na uingize:

Kwa **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Hii huwezesha taarifa za mtandao na viungo vya kichunguzi.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Kwa **Mainnet ya Zcash**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` ni seva ya WebZjs inayooana na (gRPC-web) lightwalletd inayoendeshwa na [zec.rocks](https://zec.rocks) (@emersonian). Kwa testnet, tumia `https://zjs.zec.rocks/testnet`. Ikiwa unaendesha pochi ya wavuti ya WebZjs mwenyewe, hii ndiyo thamani ya kuweka kama `LIGHTWALLETD_PROXY`.

---

## **3. Unganisha kwenye Pochi ya ChainSafe WebZjs**

1. Tembelea [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Bofya **Unganisha MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Idhinisha muunganisho.  
4. Tazama muhtasari wa akaunti yako ya Zcash, ikijumuisha:
   - Anwani zilizounganishwa na Anwani ya Uwazi

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Subiri usawazishaji ukamilike.




---

## **4. Weka Fedha Kwenye Pochi Yako**

> **Badilisha ETH -> ZEC** - Tumia huduma kama **LeoDex** na utume kwenye anwani yako ya faragha.  
> **Utoaji kutoka Soko la Kubadilishana Sarafu** - Toa ZEC uliyonunua hadi anwani yako ya faragha ya WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Tumia anwani za faragha (z) kwa **faragha kamili**.

---

## **5. Tuma / Pokea ZEC**

1. Katika **WebZjs**, nenda kwenye **Hamisha Salio**.  
2. Ingiza:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Thibitisha muamala katika MetaMask (tia sahihi muamala).  
5. Fedha zilizopokelewa zitaonekana katika WebZjs baada ya uthibitisho.

---

## **6. Thibitisha / Tatua Hitilafu**

> Angalia **WebZjs** kwa salio lililosasishwa **(MetaMask haijaorodhesha ZEC moja kwa moja)** .  
> Matatizo yakitokea:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Dokezo la Usalama:** Sakinisha tu **ChainSafe Snap iliyokaguliwa**; kagua ruhusa kabla ya kuidhinisha.

---

## **7. Angalia Vipengele vya Anwani**

1. Nenda kwenye sehemu ya **Pokea** - Anwani yako Iliyounganishwa itaonyeshwa kwa chaguo-msingi.  
2. Nakili Anwani Iliyounganishwa na utembelee Kichunguzi cha block cha [Zcash](https://mainnet.zcashexplorer.app/).  
3. Bandika Anwani yako Iliyounganishwa kwenye upau wa utafutaji.  
4. Sasa utaona vipengele vyote vya Anwani Iliyounganishwa, vinavyojumuisha:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Maelezo ya Ziada**

> Tumia [**toleo jipya zaidi la MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - toleo la umma linaunga mkono Snaps.  
> Mathibitisho ya faragha yanaweza kuchukua muda, WebAssembly hushughulikia ukokotoaji katika kivinjari.  
> Urejeshaji ni rahisi, sakinisha MetaMask na Snap, kisha ingiza maneno yako ya kurejesha pochi yaliyopo.  
> Snap hutumia kwa chaguo-msingi **ZEC ya faragha**, anwani za uwazi **si lengo kuu**.  
> Tumia [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) kwa uthibitisho wa miamala.
