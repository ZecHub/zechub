# Zcash Testnet

## Cos'è la Zcash Testnet?

**Zcash Testnet** è una blockchain parallela alla vera rete principale di Zcash (Mainnet) che replica l'esatto protocollo, le regole e la logica delle transazioni, ma con due differenze fondamentali:

1. **Le monete non hanno un valore monetario reale** - si chiamano **TAZ**, non ZEC, e sono utilizzate solo per i test.  
2. **Gli aggiornamenti della rete, gli strumenti e il software vengono testati qui** prima di essere distribuiti sulla vera blockchain Zcash.  

In altre parole, la Testnet è come una **sandbox o un ambiente sperimentale** dove sviluppatori, revisori e costruttori possono provare idee senza rischiare denaro reale.


## Perché esiste Testnet?

Testnet è fondamentale per lo sviluppo della blockchain perché **le blockchain reali come Zcash sono immutabili**: una volta che le transazioni sono confermate sulla rete principale, non possono essere annullate. Testnet fornisce una **replica sicura** per sperimentare, testare e debuggare le funzionalità prima di distribuirle su Mainnet.

### Usi di Testnet

#### 1. Sviluppo e integrazione del software

Gli sviluppatori che creano portafogli, exchange, software di mining o strumenti per la privacy possono testarli in tutta sicurezza su Testnet. Le funzionalità includono:

- Invio e ricezione di transazioni
- Mining di nuovi blocchi con monete TAZ a valore zero
- Creazione di interfacce utente e API
- Testare le caratteristiche di privacy delle transazioni (Transparent vs Shielded)

**Esempio:**
Strumenti come [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) utilizzano Testnet per generare transazioni e testare le funzionalità di Zcash shielded.  

**Scenario del mondo reale
Lo sviluppatore di un portafoglio può collegare il software a un endpoint RPC di Testnet e simulare l'intero ciclo di vita - creazione di indirizzi, invio di transazioni schermate e convalida dei saldi - prima di andare in onda su Mainnet.

#### 2. Testare gli aggiornamenti della rete

Zcash aggiorna periodicamente il suo protocollo principale (ad esempio Nu5, Nu6). La Testnet attiva i nuovi aggiornamenti **prima della Mainnet**, permettendo agli sviluppatori e alla comunità di identificare e risolvere i bug.

**Esempio
Una nuova regola di consenso o un nuovo tipo di transazione vengono prima inviati a Testnet. Dopo aver superato i test, viene attivata su Mainnet a un'altezza di blocco predeterminata.

#### 3. Test delle implementazioni dei nodi

Zcash supporta diverse implementazioni software dei nodi: `zcashd` e **Zebra** (nodo basato su Rust e gestito dalla Zcash Foundation). Testnet consente di testare i nodi in condizioni reali senza rischi finanziari.  

Gli sviluppatori di nodi possono:

- Convalidare la propagazione dei blocchi
- Testare le interfacce RPC
- Osservare il comportamento del nodo sotto carico
- Testare le interazioni del software di mining

#### 4. Apprendimento e formazione

I principianti possono imparare le funzioni di Zcash come il mining, la creazione di transazioni Shielded e l'uso degli Unified Address.  
I tutorial e la documentazione della comunità forniscono l'accesso a **Testnet faucet, explorer e guide**.


## Casi d'uso reali di Testnet

### 1. Test degli sviluppatori (portafoglio/app)

- Connettersi a Zcash Testnet
- Richiedi TAZ da un faucet
- Inviare transazioni Shielded
- Verifica la privacy e la stabilità dell'interfaccia utente

Anche in caso di errori non si perde alcun ZEC reale.

### 2. Test di integrazione dello scambio

- Esegui un nodo Testnet
- Utilizza gli endpoint JSON-RPC di Zebrad per elaborare le transazioni
- Testare la logica di deposito/prelievo automatizzato

Garantisce la sicurezza del codice di produzione e previene le perdite finanziarie.

### 3. Prove di configurazione del mining

- Utilizzo di modelli di mining
- Prova la convalida dei blocchi
- Osserva i premi del mining (solo TAZ)
- Ottimizzare le prestazioni del mining

Previene i tempi di inattività o la perdita di guadagni quando si passa a Mainnet.

### 4. Ricerca accademica / Protocollo

I ricercatori possono testare innovazioni come la **verifica senza stato**, l'ottimizzazione delle prove a zero conoscenza** o altri esperimenti sui protocolli utilizzando Testnet.  
Gli utenti avanzati possono anche eseguire **testnet personalizzate o ambienti regtest** per esperimenti specializzati.


## Differenze chiave tra Mainnet e Testnet

| Caratteristica | Mainnet | Testnet |
|-----------------------|-----------------|--------------------------|
| Valore delle monete | ZEC reale | TAZ (nessun valore monetario) |
| Rischio | Rischio finanziario | Sicuro per i test |
| Aggiornamenti del protocollo | Produzione | Attivazione anticipata |
| Ricompense per il mining | Emissione reale | Solo ricompensa per i test |
| Utilità di rete | Transazioni in tempo reale | Test e sviluppo |

## Idee sbagliate comuni

- **Le monete di Testnet valgono qualcosa** -> Falso, le TAZ hanno valore zero.  
- **La perdita di monete Testnet è importante** -> Falso, non si perde alcun valore reale.  
- **Testnet e Mainnet sono identici** -> Falso, Testnet si resetta spesso e non è economicamente sicuro come Mainnet.

---

## Cos'è TAZ?

**TAZ** è la versione Testnet delle monete Zcash:

- Non è denaro reale; non può essere scambiato con ZEC o moneta fiat
- Utilizzata per i test, lo sviluppo e l'apprendimento
- Segue tutte le regole di Zcash: può essere inviata, minata e utilizzata in indirizzi Shielded

**Esempio:**
Uno sviluppatore può inviare 100 TAZ da un indirizzo Testnet a un altro per testare una funzione del portafoglio senza rischiare ZEC reali.  

Considera le TAZ come **"denaro di gioco" per la Zcash Testnet**.


## Cosa sono i faucet?

Un **faucet** (in italiano rubinetto) è un servizio che offre monete TAZ gratuite per i test:

- Di solito siti web o API
- Gli utenti forniscono un indirizzo Testnet; il faucet invia una piccola quantità di TAZ
- Evita la necessità di mining manuale di TAZ

**Esempio:**
1. Visita un faucet di Testnet (ad esempio, [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/)])
2. Inserisci il tuo indirizzo Testnet
3. Richiedi TAZ
4. Ricevi immediatamente le TAZ per iniziare i test

**Perché è importante
- Test sicuri senza rischiare lo ZEC
- Accessibilità per principianti e sviluppatori
- Prototipazione rapida per portafogli, borse e app



## Zkool e Zingo! Portafogli

### Zkool

- Portafoglio multi-account per utenti avanzati di Zcash
- Supporta frasi seed, chiavi di visualizzazione, indirizzi trasparenti e schermati
- Può connettersi a Mainnet, Testnet o Regtest tramite nodi completi o server lightwallet

### Zingo!

- Portafoglio mobile incentrato su privacy e semplicità
- Supporta gli indirizzi Shielded e Unified
- Aggiornato per supportare i protocolli Testnet (incluso NU6 Testnet)

## Abilitazione di Testnet nei portafogli

### Portafoglio Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometro; autoplay; clipboard-write; encrypted-media; giroscopio; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Consigli:**
- Il portafoglio potrebbe riavviarsi quando si cambia rete
- Gli account ZEC di Mainnet non sono interessati
- Utilizza un server lightwallet Testnet se richiesto

### Zingo! Portafoglio

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometro; autoplay; clipboard-write; encrypted-media; giroscopio; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Una volta abilitati, i portafogli possono inviare e ricevere TAZ, testare transazioni Shielded e fare esperimenti in tutta sicurezza.


## Dopo aver abilitato Testnet

- Le transazioni si comportano come quelle di Mainnet, ma con TAZ di **valore zero**
- È possibile testare le transazioni Shielded, gli indirizzi multipli e le funzioni di privacy
- Gli sviluppatori possono eseguire il debug e testare le funzionalità senza rischiare un vero ZEC


## Riepilogo rapido

- **Zcash Testnet** è un ambiente sandbox sicuro per costruire, testare e sperimentare
- Casi d'uso: test degli sviluppatori, test dei nodi, integrazione degli scambi, ricerca e istruzione
- le monete **TAZ** sono utilizzate al posto di ZEC e non hanno alcun valore reale
- La Testnet è essenziale prima di distribuire le funzionalità su Mainnet
