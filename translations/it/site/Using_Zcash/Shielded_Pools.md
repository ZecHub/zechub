# Le pool di valori di Zcash

## In breve

- Zcash dispone di **4 pool di valori**: Sprout (legacy), Sapling, Orchard e Transparent
- **Orchard** (Unified Address / indirizzi-z che iniziano con `u1`) è la Shielded pool attualmente consigliata
- **Sapling** (indirizzi-z che iniziano con `zs`) è la precedente Shielded pool, tuttora ampiamente supportata
- **Transparent** (indirizzi-t) non offre alcuna privacy — in modo analogo a Bitcoin
- Prediligi sempre le transazioni **z → z** (shielded-to-shielded) per la massima privacy

---

Attualmente esistono 4 [pool di valori](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) in Zcash: Sprout, Sapling, Orchard e Transparent.

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)


## Shielded Pools


### Orchard


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)


L'Orchard Shielded Pool è stata lanciata il 31 maggio 2022 come parte del network upgrade NU5. Gli indirizzi Orchard sono noti anche come Unified Address (UA).

Orchard non ha richiesto alcun trusted setup ed è quindi tra i sistemi di pagamento a conoscenza zero più avanzati, sicuri e verificabili, grazie alla svolta tecnologica realizzata da Sean Bowe e dagli ingegneri della Electric Coin Company.

Poiché gli Unified Address combinano i receiver per gli indirizzi Orchard, Sapling e Transparent, si prevede che la quantità di fondi custoditi nella pool schermata aumenti in modo significativo. Non è possibile distinguere tra i fondi inviati alle pool Transparent e quelli inviati alle pool Shielded.

L'Orchard Shielded Pool rappresenta un miglioramento significativo rispetto alle pool esistenti. Costituisce un insieme di anonimato (anonymity set) separato rispetto alle Shielded pool Sprout e Sapling.

Le transazioni all'interno di Orchard miglioreranno la riduzione dei metadati di transazione e l'anonimato grazie alle "Action" di Orchard, in alternativa agli input e output UTXO.

I [wallet Zcash Shielded](/using-zcash/wallets) supportano ora Orchard.

____

### Sapling


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)


[Zcash Sapling](https://z.cash/upgrade/sapling) è stato un aggiornamento del protocollo Zcash introdotto il 28 ottobre 2018. Si tratta di un importante miglioramento rispetto alla versione precedente, nota come Sprout, che presentava alcune limitazioni in termini di privacy, efficienza e usabilità.

Alcuni degli aggiornamenti includono prestazioni migliorate per gli indirizzi schermati, chiavi di visualizzazione migliorate che consentono agli utenti di vedere le transazioni in entrata e in uscita senza esporre le proprie chiavi private, e chiavi a conoscenza zero indipendenti per la firma delle transazioni con wallet hardware.

Zcash Sapling consente agli utenti di effettuare transazioni private in pochi secondi, rispetto ai tempi più lunghi richiesti dalla serie Sprout.

La schermatura delle transazioni migliora la privacy, rendendo impossibile a terzi collegare le transazioni e determinare la quantità di ZEC trasferita. Sapling migliora anche l'usabilità riducendo i requisiti computazionali necessari per generare transazioni private, rendendole più accessibili agli utenti.

Gli indirizzi Sapling iniziano con "zs" e sono integrati in tutti i wallet Zcash Shielded supportati (YWallet, Zingo Wallet, Nighthawk, ecc.). Zcash Sapling rappresenta uno sviluppo tecnologico significativo in termini di privacy ed efficienza delle transazioni, che rende Zcash una criptovaluta pratica ed efficace per gli utenti che tengono alla privacy e alla sicurezza.

____

### Sprout


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)


Sprout è stato il primo protocollo di privacy a conoscenza zero, aperto e permissionless, mai lanciato. È stato lanciato il 28 ottobre 2016.

Gli indirizzi Sprout sono identificati dalle prime due lettere, sempre "zc". È stato chiamato "Sprout" (germoglio) per sottolineare che il software era una blockchain giovane e in crescita, con un grande potenziale di sviluppo e aperta a nuove implementazioni.

Sprout è stato utilizzato come strumento iniziale per il [mining a lento avvio di Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), che ha portato alla distribuzione di ZEC e delle ricompense di blocco per i miner.

Con la continua espansione dell'ecosistema Zcash e il crescente numero di transazioni schermate, si è osservato che la serie Sprout diventava limitata e meno efficiente in termini di privacy degli utenti, scalabilità ed elaborazione delle transazioni. Ciò ha portato alla modifica della rete e all'aggiornamento Sapling.


### Transparent


![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)


La pool Transparent di Zcash non è schermata e non è privata. Gli indirizzi dei wallet Transparent su Zcash iniziano con la lettera "t" e la privacy è molto bassa quando si utilizza questo tipo di indirizzo per le transazioni.

Le transazioni Transparent in Zcash sono simili a quelle di Bitcoin: supportano transazioni multi-firma e fanno uso di indirizzi pubblici standard.

Gli indirizzi Transparent di Zcash sono utilizzati soprattutto dagli exchange centralizzati per garantire elevata trasparenza e conferma di rete nell'invio e nella ricezione di ZEC tra gli utenti.

È inoltre importante notare che, sebbene gli indirizzi Zcash Shielded offrano un'elevata privacy durante le transazioni, richiedono anche maggiori risorse computazionali per elaborarle. Per questo motivo alcuni utenti potrebbero scegliere gli indirizzi Transparent per le transazioni che non richiedono lo stesso livello di privacy.
____


## Pratiche consigliate per il trasferimento tra le pool

Per ottenere un elevato livello di privacy durante le transazioni sulla rete Zcash, si raccomanda di seguire le pratiche descritte di seguito.

Le transazioni che avvengono tra wallet "z → z" sulla blockchain di Zcash sono schermate e vengono talvolta chiamate transazioni private per l'elevato livello di privacy che generano. Questo è in genere il modo migliore e più consigliato per inviare e ricevere $ZEC quando è richiesta la privacy.

---

Quando invii ZEC da un "indirizzo Z" a un "indirizzo T" si tratta di una transazione di Deshielding. In questo tipo di transazione il livello di privacy non è sempre elevato, poiché alcune informazioni saranno visibili sulla blockchain a causa dell'invio di ZEC verso un indirizzo Transparent. La transazione di Deshielding non è sempre consigliata quando è richiesta un'elevata privacy.

---

Il trasferimento di ZEC da un indirizzo Transparent (indirizzo T) a un indirizzo Z è noto come Shielding. In questo tipo di transazione il livello di privacy non è sempre elevato come in una transazione z → z, ma è comunque consigliato quando la privacy è necessaria.

---

L'invio di ZEC da un indirizzo Transparent (indirizzo T) a un altro indirizzo Transparent (transazione T-T) sulla rete Zcash è molto simile a una transazione Bitcoin: per questo le transazioni T-T su Zcash sono sempre chiamate transazioni pubbliche, poiché i dettagli della transazione sia del mittente sia del destinatario diventano visibili al pubblico, rendendo molto basso il livello di privacy.

La maggior parte degli exchange centralizzati di criptovalute utilizza indirizzi Transparent (indirizzi T) per le transazioni sulla blockchain di Zcash, ma questo tipo di transazione (T-T) non avrà alcuna proprietà di privacy.

---

## Errori comuni da evitare

- **Inviare da indirizzo-t a indirizzo-t** — completamente pubblico, nessuna privacy. Scherma sempre i fondi per primi.
- **Confondere gli indirizzi Sapling e Orchard** — gli indirizzi Sapling iniziano con `zs`, gli indirizzi Orchard / Unified Address iniziano con `u1`
- **Lasciare i fondi nella pool Sprout** — Sprout è deprecata; trasferisci i fondi su Orchard
- **Pensare che il t → z (shielding) sia completamente privato** — l'atto di schermare è visibile on-chain; il contenuto invece no

---

## Pagine correlate

- [Wallets](/using-zcash/wallets) — Quali wallet supportano le pool Orchard e Sapling
- [Transazioni](/using-zcash/transactions) — Come inviare transazioni schermate
- [Acquistare ZEC](/using-zcash/buying-zec) — Come ottenere ZEC prima di utilizzarli nelle pool
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Le basi crittografiche delle Shielded pool
- [Cos'è ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Approfondimento sul modello di privacy di Zcash
