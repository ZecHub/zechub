<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# MetaMask Zcash Snap Guida all'integrazione

> Conserva e invia ZEC schermati dall'estensione browser MetaMask, usando il Zcash Snap di ChainSafe e il wallet web WebZjs.

## TL;DR

* Il ChainSafe Zcash Snap aggiunge ZEC schermati a MetaMask su desktop (Chrome, Edge, Firefox). Non serve alcun software Zcash separato.
* Le tue chiavi Zcash derivano dalla frase mnemonica di MetaMask. Quella singola frase ora protegge sia i tuoi ETH sia i tuoi ZEC.
* Gestisci ZEC tramite il wallet WebZjs su webzjs.chainsafe.dev, non nell'elenco di asset di MetaMask.
* Il tuo account riceve un indirizzo unificato, così i mittenti ti pagano nella pool più privata che supportano.
* Procurati fondi tramite uno scambio (ad esempio ETH in ZEC) o prelevando ZEC da un exchange verso il tuo indirizzo schermato.
* Recupero: reinstalla MetaMask e lo Snap, quindi importa la tua frase mnemonica esistente.

## Spiegazione di base

Uno MetaMask Snap è un piccolo componente aggiuntivo isolato che insegna a MetaMask una nuova blockchain. Il Zcash Snap, sviluppato da ChainSafe e sottoposto a audit da Hacken, permette a MetaMask di derivare le chiavi Zcash dalla tua frase mnemonica esistente e di firmare le transazioni Zcash.

MetaMask di per sé non mostra alcun saldo ZEC. Al contrario, il wallet web WebZjs si collega a Snap, si sincronizza con la rete Zcash tramite un server lightwalletd e mostra i tuoi indirizzi e il tuo saldo. Le prove schermate vengono calcolate nel tuo browser con WebAssembly, ecco perché gli invii possono richiedere qualche istante.

I passaggi seguenti coprono l'installazione del Snap, la connessione di WebZjs, il finanziamento del wallet, l'invio e la ricezione e il controllo delle parti del tuo indirizzo unificato.

## Guida completa

Per una procedura dettagliata e una spiegazione visiva, guarda questa [**YouTube guida**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask ora supporta **Zcash schermati (ZEC)** tramite il **Zcash Snap sviluppato da ChainSafe**, permettendoti di inviare, ricevere e gestire ZEC privati direttamente nel wallet del browser. Sottoposto a audit da **Hacken** e presente nella **directory ufficiale degli Snap di MetaMask**, non richiede **nessun software Zcash separato** - solo MetaMask e lo Snap.

---

## **Prerequisiti**


> [**Estensione MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (solo desktop) - Chrome, Edge o Firefox.  
> Account MetaMask - Frase mnemonica messa in sicurezza; Snap deriva le chiavi Zcash da essa.  
> Connessione Internet stabile - Per la sincronizzazione con la rete Zcash.  
> Fondi - ETH da scambiare per ZEC o ZEC da un exchange.

> **Consiglio:** Proteggi la frase mnemonica di MetaMask - controlla sia gli ETH sia ZEC.

---

## **1. Installa il Zcash Snap**

1. Vai alla [**directory degli Snap di MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Cerca [**"Zcash WebZjs Wallet"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) oppure [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Fai clic su **Installa/Aggiungi a MetaMask**.
4. Approva permessi come i seguenti:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opzionale) Aggiungi la rete Zcash**

In MetaMask, scegli **Aggiungi rete** e inserisci:

Per **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Questo abilita le informazioni sulla rete e i link all'explorer.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Per la **mainnet di Zcash**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` è un server lightwalletd compatibile con WebZjs (gRPC-web) gestito da [zec.rocks](https://zec.rocks) (@emersonian). Per la testnet, usa `https://zjs.zec.rocks/testnet`. Se esegui tu il wallet web WebZjs, questo è il valore da impostare come `LIGHTWALLETD_PROXY`.

---

## **3. Connetti al wallet ChainSafe WebZjs**

1. Visita [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Fai clic su **Connetti MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Approva la connessione.  
4. Visualizza il riepilogo del tuo account Zcash, tra cui:
   - Indirizzi unificati e indirizzo trasparente

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Attendi il completamento della sincronizzazione.




---

## **4. Finanzia il tuo wallet**

> **Scambio ETH -> ZEC** - Usa servizi come **LeoDex** e invia al tuo indirizzo schermato.  
> **Prelievo da exchange** - Preleva gli ZEC acquistati verso il tuo indirizzo schermato WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Usa gli indirizzi schermati (z) per la **privacy totale**.

---

## **5. Invia / Ricevi ZEC**

1. In **WebZjs**, vai su **Trasferisci saldo**.  
2. Inserisci:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Conferma la transazione in MetaMask (firma la transazione).  
5. I fondi ricevuti appariranno in WebZjs dopo la conferma.

---

## **6. Verifica / Risoluzione dei problemi**

> Controlla **WebZjs** per i saldi aggiornati **(MetaMask non elenca ZEC direttamente)** .  
> Se si verificano problemi:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Consiglio di sicurezza:** Installa solo il **ChainSafe Snap verificato**; controlla i permessi prima di approvare.

---

## **7. Controlla i componenti dell'indirizzo**

1. Vai alla sezione **Ricevi** - il tuo indirizzo unificato verrà mostrato per impostazione predefinita.  
2. Copia l'indirizzo unificato e visita il [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Incolla il tuo indirizzo unificato nella barra di ricerca.  
4. Ora vedrai tutti i componenti dell'indirizzo unificato, che includono:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Note aggiuntive**

> Usa la [**ultima versione di MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - la versione pubblica supporta gli Snap.  
> Le prove schermate possono richiedere tempo, WebAssembly gestisce il calcolo nel browser.  
> Il recupero è semplice: installa MetaMask e lo Snap, quindi importa la tua frase mnemonica esistente.  
> Il Snap usa **ZEC schermati** per impostazione predefinita, gli indirizzi trasparenti **non sono l'obiettivo**.  
> Usa [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) per le conferme delle transazioni.
