<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Pool di Valore di Zcash 

## TL;DR

- Zcash ha attualmente **4 pool di valore**: Sprout (legacy), Sapling, Orchard e Transparent.
- **Orchard** è l'attuale pool schermato principale utilizzato dagli Unified Address (u1...).
- **Sapling** (indirizzi z che iniziano con `zs`) rimane ampiamente supportato e continua a custodire una quantità significativa di ZEC schermati.
- Gli indirizzi **Transparent** (t...) non offrono alcuna privacy delle transazioni e funzionano in modo simile a Bitcoin.
- **Sprout** è un pool schermato legacy che è stato ritirato dall’uso attivo.
- È stato proposto un futuro pool schermato noto come **Ironwood** per rafforzare la fiducia nell’integrità della fornitura di ZEC schermati preservando al contempo la privacy.
- Per le garanzie di privacy più forti, gli utenti dovrebbero continuare a preferire, quando possibile, le transazioni **schermato-a-schermato (z → z)**.


<br/>

## Comprendere i Pool di Valore di Zcash

Zcash separa i fondi in distinti sistemi di contabilizzazione noti come pool di valore. Ogni pool ha le proprie regole crittografiche e proprietà di privacy, mentre il protocollo tiene traccia del valore totale che si sposta tra di essi.

Oggi, la rete contiene quattro pool di valore principali:

- Transparent — Pubblico e completamente visibile on-chain.
- Sapling — Il primo moderno pool schermato ampiamente adottato.
- Orchard — L’attuale pool schermato principale introdotto con gli Unified Address.
- Sprout — Il pool schermato originale lanciato con Zcash nel 2016.
  


Con l’evoluzione di Zcash, nuovi pool schermati potrebbero essere introdotti per migliorare sicurezza, privacy, usabilità e verificabilità, mantenendo al contempo la compatibilità con i fondi esistenti.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig. 1: Un grafico che mostra gli attuali 4 pool a ottobre 2025

<br/>

## I Pool Schermati 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig. 2: Un grafico che mostra il pool Orchard a ottobre 2025

<br/>

Il Pool Schermato Orchard è stato attivato il 31 maggio 2022 come parte dell’aggiornamento di rete NU5. Orchard ha introdotto un nuovo protocollo schermato che ha eliminato la necessità di un trusted setup ed è diventato il pool schermato principale utilizzato dagli Unified Address (UA).

Orchard ha migliorato significativamente usabilità, efficienza e privacy riducendo la fuoriuscita di metadati delle transazioni e introducendo un modello di transazione più flessibile basato sulle Actions anziché sui tradizionali input e output schermati.

Oggi, Orchard rimane il pool schermato principale di Zcash. Tuttavia, la comunità sta valutando una futura migrazione verso un nuovo pool schermato chiamato Ironwood, che fornirebbe ulteriori garanzie riguardo all’integrità della fornitura di ZEC schermati preservando al contempo le garanzie di privacy di Zcash.

I [wallet schermati di Zcash](/wallets) ora supportano Orchard.

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig. 3: Un grafico che mostra il pool Sapling a ottobre 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) è stato un aggiornamento del protocollo Zcash introdotto il 28 ottobre 2018. Si tratta di un importante miglioramento rispetto alla versione precedente nota come Sprout, che presentava alcune limitazioni in termini di privacy, efficienza e usabilità. 

Tra i miglioramenti vi sono prestazioni migliori per gli indirizzi schermati, Viewing Key migliorate per consentire agli utenti di visualizzare le transazioni in entrata e in uscita senza esporre le chiavi private dell’utente e chiavi Zero Knowledge indipendenti per gli hardware wallet durante la firma delle transazioni. 

Zcash Sapling consente agli utenti di effettuare transazioni private in pochi secondi rispetto ai tempi più lunghi richiesti dalla serie Sprout. 

La schermatura delle transazioni migliora la privacy, rendendo impossibile per terze parti collegare le transazioni e determinare l’importo di ZEC trasferito. Sapling migliora anche l’usabilità riducendo i requisiti computazionali necessari per generare transazioni private, rendendole più accessibili agli utenti.

Gli indirizzi dei wallet Sapling iniziano con "zs" e questo può essere osservato in tutti i wallet schermati di Zcash supportati (YWallet, Zingo Wallet, Nighthawk ecc.) che hanno indirizzi Sapling integrati. Zcash Sapling rappresenta uno sviluppo significativo in termini di tecnologia per quanto riguarda la privacy e l’efficienza delle transazioni, il che rende Zcash una criptovaluta pratica ed efficace per gli utenti che apprezzano privacy e sicurezza.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig. 4: Un grafico che mostra il pool Sprout a ottobre 2025

Sprout è stato il primo protocollo di privacy Zero Knowledge open permissionless mai lanciato. È stato lanciato il 28 ottobre 2016.

Gli indirizzi Sprout sono identificati dalle loro prime due lettere, che sono sempre "zc". Fu chiamato "Sprout" con il preciso scopo di sottolineare che il software era giovane, una blockchain nascente con un grande potenziale di crescita e aperta allo sviluppo. 

Sprout fu utilizzato come strumento iniziale per il [slow start del mining di Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), che portò alla distribuzione di ZEC e delle ricompense dei blocchi ai miner. 

Con la continua espansione dell’ecosistema Zcash e l’aumento del numero di transazioni schermate, si osservò che la serie Zcash Sprout stava diventando limitata e meno efficiente in termini di privacy per l’utente, scalabilità delle transazioni ed elaborazione. Ciò portò alla modifica della rete e all’aggiornamento Sapling. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig. 5: Un grafico che mostra il pool Transparent a ottobre 2025

<br/>

Il pool Transparent di Zcash è non schermato e non privato. Gli indirizzi wallet Transparent su Zcash iniziano con la lettera "t"; la privacy è molto bassa quando si utilizza questo tipo di indirizzo per le transazioni.

Le transazioni Transparent in Zcash sono simili alle transazioni Bitcoin, supportano transazioni multi-firma e utilizzano indirizzi pubblici standard.

Gli indirizzi Transparent di Zcash sono utilizzati principalmente dagli exchange centralizzati per garantire un’elevata trasparenza e conferma di rete durante l’invio e la ricezione di ZEC tra utenti.

È inoltre importante notare che, mentre gli indirizzi schermati di Zcash offrono un’elevata privacy durante le transazioni, richiedono anche più risorse computazionali per elaborarle. Pertanto, alcuni utenti possono adottare indirizzi Transparent per transazioni che non richiedono lo stesso livello di privacy.

<br/>

## Pratica Consigliata per i Trasferimenti tra Pool

Quando si considera un elevato livello di privacy durante una transazione sulla rete Zcash, si raccomanda di seguire le pratiche seguenti;

Le transazioni che avvengono tra wallet "z to z" sulla blockchain di Zcash sono per lo più schermate e talvolta vengono chiamate transazioni private per via dell’elevato livello di privacy generato. Questo è di solito il modo migliore e più consigliato per inviare e ricevere $ZEC quando è richiesta privacy. 

---

Quando invii ZEC da "Z-address" a "T-address", ciò indica semplicemente una forma di transazione di deschermatura. In questo tipo di transazione, il livello di privacy non è sempre elevato, poiché alcune informazioni saranno visibili sulla blockchain a causa dell’invio di ZEC verso un indirizzo Transparent. La transazione di deschermatura non è sempre consigliata quando è richiesta un’elevata privacy. 

---

Il trasferimento di ZEC da un indirizzo Transparent (T-address) a uno Z-address è semplicemente noto come schermatura. In questo tipo di transazione il livello di privacy non è sempre alto rispetto a quello di una transazione z-z, ma è comunque consigliato quando è richiesta privacy. 

---

Inviare ZEC da un indirizzo Transparent (T-address) a un altro indirizzo Transparent (T-address) sulla rete Zcash (transazione T-T) è molto simile a una transazione Bitcoin, ed è per questo che le transazioni T-T su Zcash sono sempre chiamate transazioni pubbliche, perché i dettagli della transazione sia del mittente sia del destinatario diventano visibili al pubblico, il che rende il livello di privacy molto basso in questo tipo di transazione. 

La maggior parte degli exchange centralizzati di criptovalute utilizza indirizzi Transparent ("T-address) per effettuare transazioni sulla blockchain di Zcash, ma questo tipo di transazione (T-T) non avrà alcuna proprietà di privacy.

<br/>

## Il Futuro: Pool Ironwood

La comunità Zcash sta attualmente valutando un pool schermato proposto chiamato Ironwood.

Ironwood è progettato per affrontare una vulnerabilità recentemente scoperta e corretta nel sistema di proving di Orchard. Sebbene non vi siano prove che la vulnerabilità sia mai stata sfruttata, Ironwood fornirebbe un ulteriore livello di garanzia consentendo una migrazione controllata da Orchard verso un pool schermato di nuova creazione.

L’obiettivo non è sostituire la privacy di Zcash, ma rafforzare la fiducia nell’integrità della fornitura di ZEC schermati.

## In base alla proposta:

1. La nuova attività schermata si sposterebbe gradualmente verso Ironwood.
2. I fondi Orchard esistenti potrebbero essere migrati privatamente.
3. La contabilizzazione pubblica del turnstile fornirebbe prove più solide che tutti i fondi schermati rimangano pienamente coperti.
4. Gli utenti conserverebbero le stesse protezioni della privacy che si aspettano da Zcash.

<br/>
Se attivato tramite futuri aggiornamenti di rete, Ironwood diventerebbe la prossima generazione dell’ecosistema schermato di Zcash preservando al contempo la compatibilità con i fondi schermati esistenti.

<br/>

## Errori Comuni da Evitare

- **Inviare da t-address a t-address** — completamente pubblico, nessuna privacy. Scherma sempre prima i fondi.
- **Confondere gli indirizzi Sapling e Orchard** — gli indirizzi Sapling iniziano con `zs`, gli indirizzi Orchard/Unified iniziano con `u1`
- **Lasciare fondi nel pool Sprout** — Sprout è deprecato; migra i fondi verso Orchard
- **Supporre che t → z (schermatura) sia completamente privato** — l’atto stesso della schermatura è visibile on-chain; il contenuto no

---

## Pagine Correlate

- [Wallet](/using-zcash/wallets) — Quali wallet supportano i pool Orchard e Sapling
- [Transazioni](/using-zcash/transactions) — Come inviare transazioni schermate
- [Acquistare ZEC](/using-zcash/buying-zec) — Acquisire ZEC prima di utilizzarlo nei pool
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Il fondamento crittografico dei pool schermati
- [Che cosa sono ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Contesto sulla privacy di Zcash
