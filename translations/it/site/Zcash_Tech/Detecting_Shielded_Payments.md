# Rilevare i pagamenti schermati: quanto costa la scansione

Un'azienda che accetta pagamenti in Zcash schermati ZEC deve trovare i pagamenti in entrata. Nella pool trasparente basta una ricerca nell'indice. Nelle pool schermate non è possibile indicizzare i pagamenti per indirizzo, quindi il portafoglio o il backend deve verificare ogni output schermato sulla chain con le proprie chiavi. Questa pagina spiega come funziona, quanto costa e come scegliere una struttura degli account che mantenga i costi sotto controllo.

## In breve

* Il costo del rilevamento dei pagamenti schermati cresce con il numero di **chiavi di visualizzazione** che controlli, non con il numero di indirizzi che distribuisci
* Un account può generare un **indirizzo diversificato** nuovo e non collegabile per ogni cliente o fattura senza costi aggiuntivi di scansione
* Una chiave di visualizzazione mostra **l'intero account**. Se un revisore deve vedere un solo cliente, quel cliente deve avere un account proprio e ogni account aggiunge lavoro di scansione per ogni blocco
* Dimensiona lo scanner per i **blocchi pieni**, non per la media. Sulla mainnet si verificano già sequenze di blocchi quasi pieni
* Misura il costo per tentativo sul tuo hardware prima di dimensionare qualsiasi cosa

## Perché i pagamenti schermati non si possono indicizzare

Con gli indirizzi trasparenti, un nodo può leggere l'indirizzo di ogni output e creare un indice dagli indirizzi agli output. Zebra lo rende possibile tramite `getaddressutxos` e `getaddresstxids`.

Un'azione schermata non ha un indirizzo leggibile. Contiene un commitment della nota, una chiave pubblica effimera e una nota crittografata. Nessuno di questi byte indica a chi è destinato il pagamento, quindi né il nodo né un indicizzatore [indexer](Lightwallet_Nodes.md) possono creare un indice degli indirizzi.

La ricerca funziona quindi al contrario. Il portafoglio prende ogni output schermato e chiede "è mio?" provando a decrittarlo. Questa operazione si chiama **decrittazione di prova**. [Viewing keys](Viewing_Keys.md) spiega cosa rivelano le chiavi, mentre [Zcash wallet syncing](Zcash_Wallet_Syncing.md) spiega come i portafogli organizzano il lavoro.

## Come funziona un tentativo

Per il formato delle azioni del protocollo Orchard, usato sia dalla pool Orchard sia dalla pool Ironwood:

1. **Accordo sulle chiavi:** moltiplica la chiave pubblica effimera dell'azione per la tua chiave di visualizzazione in entrata. È una moltiplicazione scalare sulla curva Pallas e costituisce gran parte del costo
2. **Derivazione della chiave:** calcola l'hash del segreto condiviso per ottenere una chiave simmetrica
3. **Decritta i primi 52 byte** della nota: il diversificatore, il valore e `rseed`
4. **Ricostruisci il commitment della nota** a partire da ciò che hai decrittato
5. **Confrontalo** con `cmx` dell'azione. Se corrispondono, la nota è tua

Scopri se la nota è tua solo al passaggio 5, quindi **un tentativo che non va a buon fine costa quasi quanto uno che va a buon fine**. Quasi tutte le azioni sulla chain appartengono a qualcun altro, perciò quasi tutto il lavoro consiste in tentativi non riusciti.

## La formula del costo

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

La formula non include il numero di indirizzi. I portafogli provano sia la chiave esterna (gli indirizzi che distribuisci) sia quella interna (il resto), perciò `I = 2`. Puoi vederlo nei cicli `for scope in [Scope::External, Scope::Internal]` in `zcash_client_backend/src/scanning.rs` di librustzcash.

[ZIP 218](https://zips.z.cash/zip-0218) limita le azioni schermate a **330 per blocco**, quindi `A` è al massimo 330.

## Indirizzi diversificati: tanti indirizzi, una chiave

Un indirizzo del protocollo Orchard è composto da un diversificatore `d` (11 byte) e da una chiave di trasmissione derivata dalla stessa chiave di visualizzazione in entrata. [ZIP 32](https://zips.z.cash/zip-0032) ricava ogni diversificatore da un indice a 88 bit con la crittografia FF1, quindi un account ha **2^88 indirizzi**, tutti validi per il protocollo Orchard.

Questo offre due vantaggi a un backend per i pagamenti:

* **Gli indirizzi non sono collegabili tra loro.** Senza la chiave di visualizzazione, due indirizzi diversificati dello stesso account sembrano appartenere a due portafogli diversi
* **Puoi associare i pagamenti alle fatture senza una tabella di ricerca.** Quando un tentativo di decrittazione va a buon fine, la nota decrittata contiene `d`. La chiave di diversificazione dell'account decritta `d` e restituisce il relativo indice; se l'indice corrisponde al numero della fattura, sai quale fattura è stata pagata

Prima di mostrarlo a un cliente, inserisci ogni indirizzo in un [unified address](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)).

## Il limite: una chiave di visualizzazione mostra l'intero account

Non puoi limitare una chiave di visualizzazione a un solo indirizzo diversificato, perché tutti gli indirizzi dell'account usano la stessa chiave. L'account è quindi anche l'unità di divulgazione. Chiunque ottenga la chiave di visualizzazione di un account può vedere tutti i pagamenti ricevuti a tutti gli indirizzi che contiene.

Per questo, tre aspetti dipendono dalla stessa scelta:

| Struttura | Costo di scansione | Cosa può vedere un revisore |
|:--|:--|:--|
| Un account con un indirizzo diversificato per cliente | Una chiave, a prescindere dal numero di clienti | Tutto o niente |
| Un account per cliente | Una chiave per cliente, a ogni blocco | Un cliente alla volta |
| Un account per cliente e periodo | Una chiave per cliente e periodo | Un cliente per un periodo |

Scegli la struttura degli account fin dall'inizio. In seguito, dividere un account significa trasferirne i fondi a nuovi account, pagando commissioni e creando uno schema visibile.

## Quanto costa in pratica

Questi dati sono stati raccolti usando un core di un laptop (Apple M3 Pro, build di rilascio), con `try_compact_note_decryption` di `zcash_note_encryption` 0.5.1 e azioni Ironwood reali della testnet:

| Misurazione | Valore |
|:--|:--|
| Un tentativo, una chiave alla volta | circa 82 µs |
| Un tentativo, in batch su 10 o 100 chiavi | circa 42 µs |

L'elaborazione in batch dimezza circa il costo, e per lo stesso motivo lo scanner di librustzcash elabora le chiavi in batch.

Con `t = 42 µs` e blocchi pieni da 330 azioni:

| Account controllati | Tempo core per blocco pieno | Core necessari per stare al passo con i blocchi pieni |
|:--|:--|:--|
| 1 | 28 ms | 0,001 |
| 1.000.000 (uno per cliente) | 7,7 ore | circa 1.109 |

Gli stessi 1.000.000 di clienti, usando indirizzi diversificati in un solo account, costano 28 ms per blocco pieno. Cambia solo il punto in cui si trova il confine tra gli account.

## Dimensiona per i picchi, non per la media

Sui 5.000 blocchi della mainnet fino all'altezza 3.582.677 (campionati il 17 novembre 2026):

* Il 62% dei blocchi non aveva output schermati e la mediana era zero
* La media era di 12,3 output schermati per blocco
* 153 blocchi, tra le altezze 3.579.935 e 3.580.346 — circa tre ore di chain — avevano ciascuno più di 250 output, spesso uno dopo l'altro. Contenevano il 75% di tutti gli output del campione

Uno scanner dimensionato sulla media resta indietro durante una sequenza del genere. Lascia un margine (per esempio, pianifica di usare metà dell'intervallo di 25 secondi di ogni blocco) e dimensiona per il limite massimo.

## I blocchi compatti riducono la banda, non il numero di tentativi

I portafogli leggeri scansionano i blocchi compatti ricevuti da un server lightwallet. Un'azione compatta occupa 148 byte, contro gli 820 dell'azione completa. Include solo ciò che serve a un tentativo: la chiave effimera, i primi 52 byte del testo cifrato, il nullifier e `cmx`. I dati trasparenti vengono inviati solo se il client li richiede.

I blocchi compatti riducono la quantità da scaricare. Non riducono il numero di tentativi, perché ogni azione deve comunque essere verificata con ogni chiave.

## Lista di controllo per un backend di pagamento

* Decidi chi potrà vedere cosa prima di creare gli account
* Quando la divulgazione lo consente, genera un indirizzo diversificato per ogni fattura dallo stesso account
* Misura `t` sul tuo hardware con l'elaborazione in batch attiva
* Dimensiona la scansione della punta della chain per 330 azioni per blocco, lasciando un margine
* Dividi le nuove scansioni per intervalli di altezze tra più worker. La cronologia è fissa, quindi puoi parallelizzare facilmente il lavoro
* Ricorda che ogni nuovo account deve essere scansionato anche a partire dalla propria altezza di creazione

## Per saperne di più

* [ZIP 218: intervallo obiettivo di 25 secondi tra i blocchi](https://zips.z.cash/zip-0218), inclusi i limiti di azioni per blocco
* [ZIP 32: portafogli gerarchici deterministici schermati](https://zips.z.cash/zip-0032)
* [ZIP 316: indirizzi unificati e chiavi di visualizzazione unificate](https://zips.z.cash/zip-0316)
* [Protocollo lightwallet: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): scansione `zcash_client_backend` e `zcash_note_encryption`
* [Una chiave di visualizzazione, un milione di clienti](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): misurazioni complete e codice di laboratorio per riprodurle
