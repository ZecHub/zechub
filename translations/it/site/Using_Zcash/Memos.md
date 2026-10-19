<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Memo

## In breve

* Un memo è una breve nota che alleghi a un pagamento inviato a un indirizzo schermato. È crittografato, quindi le persone che osservano la blockchain non possono leggerlo.
* Il campo memo contiene fino a 512 byte di testo.
* Le persone usano i memo per indicare chi ha inviato un pagamento e a cosa serviva, oppure per inviare un messaggio privato.
* I pagamenti a indirizzi trasparenti non possono contenere un memo.
* Un [link di richiesta di pagamento](/using-zcash/payment-request-uris) può compilare il memo al posto tuo, così un negozio può contrassegnare ogni ordine.

## Spiegazione di base

### Invio di memo crittografati

Quando invii una transazione Z2Z (da schermato a schermato), puoi includere un memo (messaggio) nella transazione. Questo memo può essere usato per diverse finalità.

### Firma delle transazioni

I memo vengono utilizzati principalmente per firmare i pagamenti. Poiché le transazioni schermate crittografano i tuoi dati, non puoi vedere chi ti ha inviato ZEC e a cosa potrebbe essere servito ZEC. Gli utenti possono usare il campo memo per firmare con il proprio nome o pseudonimo, facendo sapere alla controparte da chi proveniva la transazione. Possono anche descrivere a cosa serviva la transazione.

### Invio di un messaggio

Un altro caso d'uso del memo crittografato è inviare un messaggio a qualcuno con uno z-addr. Questi messaggi possono riguardare qualsiasi cosa, che si tratti di un [promemoria per un amico](https://twitter.com/iansagstette/status/1542142468505870336) o di un [messaggio sensibile che deve rimanere il più privato possibile](https://twitter.com/InsideZcash/status/1545800146352578560).

### Lettere d'amore sulla blockchain

Una persona inviò al proprio partner una lettera d'amore in uno dei primi blocchi della blockchain Zcash. Qualcuno scoprì che il proprio partner gli aveva inviato un file tramite un memo Zcash. Questo file era un biglietto per un evento speciale all'estero, al quale lei e il suo amante lontano parlavano di partecipare insieme. Il memo era una lettera d'amore.

## Visualizzazione / analogia

Pensa a un pagamento schermato come a una busta sigillata con denaro all'interno. Il memo è un biglietto piegato insieme al denaro.

La blockchain è l'ufficio postale. Trasporta la busta e registra che è arrivata, senza mai aprirla. La persona che apre la busta legge il biglietto. Un pagamento trasparente è una cartolina, quindi non c'è alcuna busta in cui piegare un biglietto.

## Approfondimento

### Cosa può contenere un memo

Il campo memo è sempre di esattamente 512 byte. Un memo testuale più breve viene riempito con byte zero prima di essere crittografato, quindi ogni memo appare della stessa dimensione on-chain.

La maggior parte dei memo è testo semplice UTF-8. [ZIP 302](https://zips.z.cash/zip-0302) riserva inoltre i memo che iniziano con un byte pari a `0xF5` o superiore per altri tipi di dati, e un memo composto da `0xF6` seguito da zeri significa "nessun memo".

Ogni output schermato in una transazione contiene il proprio memo, quindi una transazione che paga più persone può includere una nota diversa per ciascuna di esse.

### Avanzato

> **Storico. Questa demo non funziona più come descritta.**
>
> La demo seguente usa zcashd e il suo [script di ricezione](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) legge i memo tramite `zcash-cli`. zcashd ha raggiunto l'interruzione automatica del supporto il 18 luglio 2026, quindi quello script non può raggiungere un nodo in esecuzione e non è stato convertito.
>
> Leggere memo schermati dalla riga di comando funziona ancora su Zallet: `zallet rpc z_listunspent` restituisce ogni nota schermata ricevuta con lo stesso campo `memoStr` letto dallo script. Consulta la [Zallet Guida rapida di riferimento](/using-zcash/zallet-quick-reference-guide) per il comando e la [guida alla migrazione verso Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) per spostare un nodo da zcashd. Zallet è ancora in beta.
>
> Questa sezione viene mantenuta come archivio storico della demo Magic-Wormhole.

Ecco come usare i Zcash memo schermati con la CLI Magic-Wormhole e zcashd per inviare file in modo sicuro da un computer a un altro!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Trasferimento di file crittografato con Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Pagine correlate

- [URI di richiesta di pagamento](/using-zcash/payment-request-uris): inserisci un memo in un link `zcash:` o in un codice QR.
- [Transazioni](/using-zcash/transactions): tipi di transazione schermati e trasparenti.
- [Pool schermate](/using-zcash/shielded-pools): dove risiedono le note schermate che contengono memo.
- [Portafogli](/using-zcash/wallets): usa il filtro Shielded Memo per trovare portafogli che supportano i memo.
- [Zallet Guida rapida di riferimento](/using-zcash/zallet-quick-reference-guide): leggi i memo ricevuti dalla riga di comando.
- [Zcash Strumenti per creatori](/using-zcash/creators-and-tips): strumenti per mance che inviano un messaggio insieme alla mancia.

### Risorse

[Il campo memo crittografato](https://electriccoin.co/blog/encrypted-memo-field/)

**Ultimo aggiornamento:** ottobre 2026
