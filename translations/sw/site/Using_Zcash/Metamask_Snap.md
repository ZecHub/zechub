<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Mwongozo wa Uunganishaji wa MetaMask Zcash Snap

> Hifadhi na utume ZEC za faragha kutoka kwenye kiendelezi cha kivinjari cha MetaMask, ukitumia Zcash Snap ya ChainSafe na pochi ya wavuti ya WebZjs.

## Muhtasari

* ChainSafe Zcash Snap huongeza ZEC za faragha kwenye MetaMask kwenye kompyuta za mezani (Chrome, Edge, Firefox). Hakuna programu tofauti ya Zcash inayohitajika.
* Funguo zako za Zcash zinatokana na maneno yako ya kurejesha pochi ya MetaMask. Maneno hayo hayo sasa hulinda ETH yako na ZEC yako.
* Unadhibiti ZEC kupitia pochi ya WebZjs katika webzjs.chainsafe.dev, wala si kwenye orodha ya mali ya MetaMask yenyewe.
* Akaunti yako hupata anwani iliyounganishwa, kwa hivyo watumaji hukulipa kupitia bwawa la faragha zaidi linaloungwa mkono nao.
* Ipe fedha kwa kubadilisha (kwa mfano ETH kuwa ZEC) au kwa kutoa ZEC kutoka kwenye soko la kubadilishana sarafu na kuzituma kwenye anwani yako ya faragha.
* Urejeshaji: sakinisha tena MetaMask na Snap, kisha uingize maneno yako ya awali ya kurejesha pochi.

## Maelezo ya Msingi

MetaMask Snap ni programu jalizi ndogo iliyowekwa kwenye mazingira yaliyotengwa, inayofundisha MetaMask blockchain mpya. Zcash Snap, iliyoundwa na ChainSafe na kukaguliwa na Hacken, huwezesha MetaMask kupata funguo za Zcash kutokana na maneno yako ya awali ya kurejesha pochi na kusaini miamala ya Zcash.

MetaMask yenyewe haionyeshi salio la ZEC. Badala yake, pochi ya wavuti ya WebZjs huunganishwa na Snap, husawazisha data na mtandao wa Zcash kupitia seva ya lightwalletd, na kuonyesha anwani na salio lako. Mathibitisho ya faragha hukokotolewa kwenye kivinjari chako kwa kutumia WebAssembly, ndiyo maana kutuma kunaweza kuchukua muda mfupi.

Hatua zilizo hapa chini zinaeleza jinsi ya kusakinisha Snap, kuunganisha WebZjs, kuweka fedha kwenye pochi, kutuma na kupokea, na kuangalia sehemu za anwani yako iliyounganishwa.

## Mwongozo Kamili

Kwa maelekezo kamili ya hatua kwa hatua na maelezo ya picha, tazama mwongozo huu wa [**YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask sasa inaunga mkono **Zcash za faragha (ZEC)** kupitia **ChainSafe Zcash Snap iliyotengenezwa**, hivyo hukuwezesha kutuma, kupokea na kudhibiti ZEC za faragha moja kwa moja kwenye pochi ya kivinjari chako. Imekaguliwa na **Hacken** na kuorodheshwa kwenye **Orodha Rasmi ya Snaps ya MetaMask**, na haihitaji **programu tofauti ya Zcash**—unahitaji tu MetaMask na Snap.

---

## **Mahitaji ya Awali**


> [**Kiendelezi cha MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (kompyuta za mezani pekee) - Chrome, Edge au Firefox.
> Akaunti ya MetaMask - Maneno ya kurejesha pochi yamehifadhiwa salama; Snap hupata funguo za Zcash kutokana nayo.  
> Muunganisho Imara wa Intaneti - Kwa kusawazisha data na mtandao wa Zcash.  
> Fedha - ETH ya kubadilisha kuwa ZEC au ZEC kutoka kwenye soko la kubadilishana sarafu.

> **Kidokezo:** Linda maneno yako ya kurejesha pochi ya MetaMask - yanadhibiti ETH yako na ZEC.

---

## **1. Sakinisha Zcash Snap**

1. Nenda kwenye [**Orodha ya Snaps ya MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Tafuta [**"Pochi ya Zcash WebZjs"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) au [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Bofya **Sakinisha/Ongeza kwenye MetaMask**.
4. Idhinisha ruhusa kama vile:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Si lazima) Ongeza Mtandao wa Zcash**

Katika MetaMask, chagua **Ongeza Mtandao** na uweke:

Kwa **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Hii huwasha maelezo ya mtandao na viungo vya kichunguzi.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Kwa **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` ni seva ya lightwalletd inayooana na WebZjs (gRPC-web), inayoendeshwa na [zec.rocks](https://zec.rocks) (@emersonian). Kwa testnet, tumia `https://zjs.zec.rocks/testnet`. Ukiendesha pochi ya wavuti ya WebZjs wewe mwenyewe, hili ndilo thamani ya kuweka kama `LIGHTWALLETD_PROXY`.

---

## **3. Unganisha Pochi ya ChainSafe WebZjs**

1. Tembelea [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Bofya **Unganisha MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Idhinisha muunganisho.  
4. Tazama muhtasari wa akaunti yako ya Zcash, unaojumuisha:
   - Anwani zilizounganishwa na anwani ya Uwazi

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Subiri usawazishaji wa data ukamilike.




---

## **4. Weka Fedha kwenye Pochi Yako**

> **Badilisha ETH -> ZEC** - Tumia huduma kama **LeoDex** na utume fedha kwenye anwani yako ya faragha.  
> **Utoaji kutoka Soko la Kubadilishana Sarafu** - Toa ZEC ulizonunua na kuzituma kwenye anwani yako ya faragha ya WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Tumia anwani za faragha (z) ili kupata **faragha kamili**.

---

## **5. Tuma / Pokea ZEC**

1. Katika **WebZjs**, nenda kwenye **Hamisha Salio**.  
2. Weka:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Thibitisha muamala katika MetaMask (saini muamala).  
5. Fedha zilizopokelewa zitaonekana katika WebZjs baada ya uthibitisho.

---

## **6. Thibitisha / Tatua Matatizo**

> Angalia **WebZjs** ili kuona salio lililosasishwa **(MetaMask haijaorodhesha ZEC moja kwa moja)** .  
> Matatizo yakitokea:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Kidokezo cha Usalama:** Sakinisha tu **ChainSafe Snap zilizokaguliwa**; kagua ruhusa kabla ya kuidhinisha.

---

## **7. Kagua Vipengele vya Anwani**

1. Nenda kwenye sehemu ya **Pokea** - Anwani yako Iliyounganishwa itaonyeshwa kwa chaguomsingi.  
2. Nakili Anwani Iliyounganishwa na tembelea [Zcash Kichunguzi cha Block](https://mainnet.zcashexplorer.app/).  
3. Bandika Anwani yako Iliyounganishwa kwenye upau wa utafutaji.  
4. Sasa utaona vipengele vyote vya Anwani Iliyounganishwa, ambavyo ni:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Maelezo ya Ziada**

> Tumia [**toleo la hivi punde la MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - toleo la umma linaunga mkono Snaps.  
> Mathibitisho ya faragha yanaweza kuchukua muda; WebAssembly hushughulikia ukokotoaji ndani ya kivinjari.  
> Urejeshaji ni rahisi, sakinisha MetaMask na Snap, kisha uingize maneno yako ya awali ya kurejesha pochi.  
> Snap hutumia ZEC za faragha kama chaguomsingi; anwani za uwazi **si lengo kuu**.  
> Tumia [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) ili kuthibitisha miamala.
