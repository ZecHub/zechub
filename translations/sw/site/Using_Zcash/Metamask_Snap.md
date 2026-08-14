# MetaMask Zcash Snap Mwongozo wa Ushirikiano

Kwa kutembea kamili na maelezo ya kuona, kuangalia hii [** YouTube mwongozo**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>
     

MetaMask now supports **shielded Zcash (ZEC)** via the **ChainSafe-developed Zcash Snap**, allowing you to send, receive, and manage private ZEC directly in your browser wallet. Audited by **Hacken** and listed in the **official MetaMask Snaps Directory**, it requires **no separate Zcash software** - only MetaMask and the Snap.

---

## ** Masharti ya awali **


> [** MetaMask Upanuzi**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (desktop tu) - Chrome, makali, au Firefox.
> Akaunti ya MetaMask - neno la mbegu limehifadhiwa; Snap hupata funguo za Zcash kutoka kwake. 
> Stable Internet Connection - Kwa kusawazisha na mtandao Zcash. 
> Fedha - ETH swap kwa ZEC au ZEC kutoka kubadilishana.

> ** Kidokezo:** Kulinda yako MetaMask ahueni kifungu - ni udhibiti wote ETH na ZEC.

---

## ** 1. Sakinisha Zcash Snap **

1. Nenda kwa [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Tafuta [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) au [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Bonyeza **Install/Add to MetaMask**.
4. Kubali ruhusa kama vile:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

[Zcash-snap-kuweka](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Hiari) Ongeza Mtandao wa Zcash**

Katika MetaMask, chagua ** Ongeza Mtandao ** na ingiza:

Kwa **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Hii inawezesha mtandao habari na explorer viungo.
[Ongeza-a-Custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Kwa ** Zcash Mainnet **;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## ** 3. Unganisha kwa ChainSafe WebZjs Wallet **

1. Tembelea [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Bonyeza ** Unganisha MetaMask Snap **. 

[Zcash-mtandao-mkoba](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Kubali uhusiano huo. 
4. Angalia muhtasari wa akaunti yako ya Zcash, ikiwa ni pamoja na:
   - Unified anwani na Uwazi anwani

![Kifupisho cha akaunti-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Kusubiri usawazishaji kukamilika.




---

## **4. Weka Fedha Katika Mkoba Wako**

> **Swap ETH -> ZEC** - Tumia huduma kama **LeoDex** na kutuma kwa anwani yako ulinzi. 
> ** Kubadilishana Kuondoa ** - Kuondoa kununuliwa ZEC kwa anwani yako WebZjs kulindwa. 

[LEODEX-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Matumizi ya ulinzi (z) anwani kwa ** faragha kamili **.

---

## ** 5. Tuma / Kupokea ZEC **

1. Katika **WebZjs**, nenda kwa **Transfer Balance**. 
2. Ingiza:
```
   - Shielded recipient address  
   - Amount
```
   [Uhamisho-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Thibitisha shughuli katika MetaMask (saini shughuli). 
5. Fedha kupokea itaonekana katika WebZjs baada ya uthibitisho.

---

## ** 6. Kuthibitisha / Troubleshoot **

> Angalia **WebZjs** kwa mizani iliyosasishwa **(MetaMask haijaorodhesha ZEC moja kwa moja) **. 
> Kama matatizo kutokea:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Ushauri wa usalama:** Kuweka tu ** ChainSafe Snap iliyochunguzwa**; angalia ruhusa kabla ya idhini.

---

## ** 7. Angalia Anwani Components **

1. Go to the **Receive** section - your Unified Address will be displayed by default.  
2. Copy the Unified Address and visit the [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Paste your Unified Address into the search bar.  
4. You will now see all the components of the Unified Address, which include:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

[Anwani-sehemu](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Maelezo ya ziada**

> Tumia [** latest MetaMask version**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - kutolewa kwa umma inasaidia Snaps. 
> Shielded uthibitisho inaweza kuchukua muda, WebAssembly hushughulikia hesabu katika kivinjari. 
> Recovery ni rahisi, kufunga MetaMask na Snap, kisha kuagiza mbegu yako zilizopo. 
> Snap defaults kwa ** shielded ZEC **, anwani uwazi ni ** si lengo **. 
> Matumizi [zcashblockexplorer.com](https://zcashblockexplorer.com) kwa uthibitisho wa shughuli.











