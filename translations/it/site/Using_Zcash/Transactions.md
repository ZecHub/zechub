---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica Pagina"/>
</a>


# Transazioni

ZEC è un asset digitale ampiamente utilizzato per i pagamenti, che offre solide funzionalità di privacy e lo rende adatto a varie transazioni come pagare gli amici, fare acquisti o effettuare donazioni. Per massimizzare privacy e sicurezza, è essenziale comprendere come funzionano i diversi tipi di transazioni all'interno di Zcash.

## TL;DR

- Zcash supporta due tipi di transazione: **shielded**, che mantengono privati i dettagli, e **transparent**, che li registrano pubblicamente.
- Gli indirizzi shielded iniziano con `u` o `z`. Gli indirizzi transparent iniziano con `t` e si comportano in modo molto simile a un indirizzo Bitcoin.
- La scelta spetta a te per ogni pagamento. La privacy è un'opzione che Zcash ti offre, non un'impostazione che qualcun altro decide per te.
- Il prelievo da un exchange è il punto in cui più spesso le persone perdono privacy. Se l'exchange supporta solo prelievi transparent, proteggi tu stesso i fondi una volta arrivati.
- Le commissioni seguono [ZIP 317](https://zips.z.cash/zip-0317) e crescono con la dimensione della transazione. I wallet che inviano ancora la vecchia commissione fissa possono vedere le loro transazioni ritardate.

## Transazioni Shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Le transazioni shielded avvengono quando sposti ZEC nel tuo wallet shielded. L'indirizzo del tuo wallet shielded inizia con una U o una Z. Quando invii transazioni shielded, fai in modo che tu e le persone con cui stai effettuando transazioni manteniate un livello di privacy non possibile su altre reti di pagamento P2P. Inviare una transazione shielded è molto facile, devi solo assicurarti di due cose. La prima è usare il tipo di wallet corretto. Il modo più semplice per assicurarti di utilizzare il tipo di wallet giusto è scaricare un [wallet](https://zechub.wiki/wallets). La seconda cosa importante è spostare ZEC in un wallet shielded. Quando prelevi ZEC da un exchange, devi sapere se l'exchange supporta prelievi shielded o transparent. Se supporta i prelievi shielded, puoi semplicemente prelevare ZEC sul tuo indirizzo shielded. Se l'exchange supporta solo prelievi transparent, allora devi usare YWallet e fare autoshield dei tuoi ZEC una volta ricevuti. Usare solo transazioni shielded per inviare e ricevere fondi è il modo migliore per mantenere la privacy e ridurre il rischio di perdita di dati

## Transazioni Transparent

Le transazioni transparent funzionano in modo simile ma non hanno protezioni della privacy, rendendo i dettagli della transazione visibili pubblicamente sulla blockchain. Le transazioni transparent dovrebbero essere evitate quando la privacy è una priorità. Nota: i wallet transparent possono incontrare problemi a causa di ZIP-317, che richiede commissioni proporzionali alla complessità della transazione. Le commissioni predefinite possono portare a rifiuti o ritardi, rendendo cruciale la personalizzazione delle commissioni.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Un Modo Semplice per Immaginarlo

Una transazione transparent è una cartolina. Il postino la consegna, ma chiunque la maneggi lungo il percorso può leggere il messaggio, vedere chi l'ha inviata e vedere chi la riceve.

Una transazione shielded è una busta sigillata. Il servizio postale conferma comunque che una lettera reale con un'affrancatura reale è passata attraverso il sistema, e nessuno può falsificarne una o inviare la stessa lettera due volte. Quello che contiene la busta resta tra mittente e destinatario.

La parte importante è che Zcash ti permette di decidere quale delle due inviare, pagamento per pagamento.

## Gestire le Commissioni per le Transazioni Transparent

Linee guida ZIP-317: la struttura delle commissioni si adatta alla complessità della transazione, richiedendo aggiustamenti oltre la commissione standard di 0.00001 ZEC.
Esempio di calcolo: una semplice transazione con una nota potrebbe richiedere una commissione di 0.0001 ZEC, aumentando di circa 0.00005 ZEC per ogni nota aggiuntiva.

Modifica delle commissioni nei wallet

Trust Wallet: accedi alle impostazioni avanzate toccando l'icona dell'ingranaggio mentre crei una transazione. Regola con attenzione i campi Miner Tip Gwei e Max Fee Gwei per evitare il fallimento della transazione. Trust Wallet addebita solo le commissioni di rete.
Coinomi Wallet: offre tre opzioni di commissione dinamica Low, Normal, High in base alle condizioni della rete. Per regolazioni manuali, seleziona Custom sulle coin supportate oppure usa Change Fee nell'angolo in alto a destra. Gli utenti possono impostare le commissioni per byte o per kilobyte, influenzando i tempi di conferma. Si consiglia di usare le opzioni dinamiche in caso di dubbi.

## Errori Comuni

- **Presumere che qualsiasi wallet che elenca ZEC possa inviarlo privatamente.** Diversi wallet multi-coin supportano solo il lato transparent di Zcash. Controlla i pool supportati dal wallet prima di farvi affidamento per la privacy. La pagina [Wallet](https://zechub.wiki/using-zcash/wallets) lo indica per ogni opzione.
- **Prelevare verso un indirizzo transparent e lasciare lì i fondi.** Il prelievo stesso è pubblico, e ogni movimento successivo da quell'indirizzo resta pubblico. Proteggi i fondi una volta arrivati.
- **Trattare la privacy come qualcosa che attivi una volta sola.** Ogni transazione è una scelta separata. Inviare shielded oggi non annulla un pagamento transparent che hai effettuato la settimana scorsa.
- **Riutilizzare un indirizzo transparent per tutto.** Poiché l'attività transparent è visibile in modo permanente, un singolo indirizzo riutilizzato collega gradualmente pagamenti che non avevano motivo di essere connessi.
- **Inviare con una commissione predefinita obsoleta.** I wallet che non hanno adottato ZIP 317 potrebbero ancora inviare la vecchia commissione fissa, il che può lasciare una transazione in attesa senza conferma.

## Nota

Tieni presente che il modo più sicuro di usare ZEC è utilizzare solo transazioni shielded. Alcuni wallet stanno implementando gli [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) che consentono a utenti ed exchange di combinare insieme indirizzi transparent e shielded.

## Risorse

[ZIPS](https://zips.z.cash/)

## Pagine Correlate

- [Wallet](/using-zcash/wallets) — quali wallet supportano l'invio shielded e quali sono solo transparent
- [Pool Shielded](/using-zcash/shielded-pools) — Sapling e Orchard, i pool in cui si trovano i tuoi fondi shielded
- [Memo](/using-zcash/memos) — messaggi cifrati che possono accompagnare una transazione shielded
- [Indirizzi Transparent degli Exchange](/using-zcash/transparent-exchange-addresses) — indirizzi TEX e perché gli exchange li usano
- [Exchange Custodial](/using-zcash/custodial-exchanges) — quali exchange supportano i prelievi shielded

## Convertitore da ZEC a ZAT
