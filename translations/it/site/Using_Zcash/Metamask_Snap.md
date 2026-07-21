# Guida all'integrazione Zcash Snap di Metamask

Per una guida completa e una spiegazione visiva, guarda questa [**guida YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask ora supporta **Zcash (ZEC) schermati** tramite lo **Zcash Snap sviluppato da ChainSafe**, che ti permette di inviare, ricevere e gestire ZEC privati direttamente nel tuo portafoglio del browser. Controllato da **Hacken** e inserito nella **directory ufficiale degli Snap di MetaMask**, non richiede **alcun software Zcash separato** - solo MetaMask e lo Snap.

---

## **Prerequisiti**


> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (solo desktop) - Chrome, Edge o Firefox.
> Account MetaMask - Frase seed protetta; lo Snap deriva le chiavi Zcash da essa.  
> Connessione Internet stabile - Per la sincronizzazione con la rete Zcash.  
> Fondi - ETH da scambiare per ZEC o ZEC da un exchange.

> **Suggerimento:** Proteggi la tua frase di recupero di MetaMask - controlla sia ETH che ZEC.

---

## **1. Installa lo Zcash Snap**

1. Vai alla [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Cerca [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) o [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Clicca **Installa/Aggiungi a MetaMask**.
4. Approva i permessi come:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (Opzionale) Aggiungi la rete Zcash**

In MetaMask, scegli **Aggiungi Rete** e inserisci:

Per **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Questo abilita le informazioni di rete e i link per l'explorer.
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

Per **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Connettiti al Wallet WebZjs di ChainSafe**

1. Visita [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Clicca **Connetti MetaMask Snap**.  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Approva la connessione.  
4. Visualizza il riepilogo del tuo account Zcash, inclusi:
   - Unified Address e Transparent address

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Attendi il completamento della sincronizzazione.




---

## **4. Finanzia il tuo Wallet**

> **Scambia ETH -> ZEC** - Utilizza servizi come **LeoDex** e invia al tuo indirizzo schermato.  
> **Prelievo da Exchange** - Preleva ZEC acquistati verso il tuo indirizzo schermato di WebZjs.  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => Usa indirizzi schermati (z) per la **privacy completa**.

---

## **5. Invia / Ricevi ZEC**

1. In **WebZjs**, vai a **Trasferisci Saldo**.  
2. Inserisci:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. Conferma la transazione in MetaMask (firma la transazione).  
5. I fondi ricevuti appariranno in WebZjs dopo la conferma.

---

## **6. Verifica / Risoluzione dei problemi**

> Controlla **WebZjs** per i saldi aggiornati **(MetaMask non ha elencato ZEC direttamente)**.  
> Se si verificano problemi:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Consiglio di sicurezza:** Installa solo lo **Snap ChainSafe controllato**; rivedi i permessi prima dell'approvazione.

---

## **7. Controlla i componenti dell'indirizzo**

1. Vai alla sezione **Ricevi** - il tuo Unified Address sarà visualizzato per impostazione predefinita.  
2. Copia il Unified Address e visita il [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Incolla il tuo Unified Address nella barra di ricerca.  
4. Ora vedrai tutti i componenti dell'Unified Address, che includono:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **Note aggiuntive**

> Usa l'[**ultima versione di MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - la versione pubblica supporta gli Snap.  
> Le prove schermate potrebbero richiedere tempo, WebAssembly gestisce il calcolo nel browser.  
> Il ripristino è semplice, installa MetaMask e lo Snap, poi importa la tua seed esistente.  
> Lo Snap predefinito è **ZEC schermati**, gli indirizzi Transparent **non sono il focus**.  
> Usa [zcashblockexplorer.com](https://zcashblockexplorer.com) per le conferme delle transazioni.
