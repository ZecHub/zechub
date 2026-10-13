<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pool di valore di Zcash

## TL;DR

- Zcash ha attualmente **5 pool di valore**: Sprout (legacy), Sapling, Orchard (solo-spesa), Ironwood e Transparent.
- **Ironwood** è l’attuale pool schermata principale, attiva dall’aggiornamento NU6.3 del 28 luglio 2026.
- **Orchard** è ora **solo-spesa**: nessun nuovo valore può entrarvi e i fondi esistenti migrano verso Ironwood.
- **Sapling** (z-address che iniziano con `zs`) rimane ampiamente supportato e continua a proteggere una quantità significativa di ZEC schermati.
- Gli indirizzi **Transparent** (t...) non offrono alcuna privacy delle transazioni e funzionano in modo simile a Bitcoin.
- **Sprout** è una pool schermata legacy che è stata ritirata dall’uso attivo.
- La migrazione da Orchard a Ironwood è **in corso** ed è verificata pubblicamente dal turnstile (tornello).
- Per le garanzie di privacy più forti, gli utenti dovrebbero continuare a preferire, quando possibile, transazioni **schermato-schermato (z → z)**.


<br/>

## Comprendere le pool di valore di Zcash

Zcash separa i fondi in sistemi contabili distinti noti come pool di valore. Ogni pool ha le proprie regole crittografiche e proprietà di privacy, mentre il protocollo tiene traccia del valore totale che si sposta tra di essi.

Oggi, la rete contiene cinque pool di valore principali:

- Transparent — Pubblico e completamente visibile on-chain.
- Sapling — La prima moderna pool schermata ampiamente adottata, ancora attiva.
- Orchard — La precedente pool schermata principale, ora solo per la spesa.
- Ironwood — L’attuale pool schermata principale, introdotta da NU6.3.
- Sprout — La pool schermata originale lanciata con Zcash nel 2016.
  


Con l’evoluzione di Zcash, potrebbero essere introdotte nuove pool schermate per migliorare sicurezza, privacy, usabilità e verificabilità, mantenendo al contempo la compatibilità con i fondi esistenti.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: un grafico che mostra le tre pool schermate (Sprout, Sapling e Orchard) fino al 29 ottobre 2025, prima dell’attivazione di Ironwood

<br/>

## Le pool schermate 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood è l’attuale pool schermata principale. Si è attivata il 28 luglio 2026 al blocco 3,428,143 come parte dell’aggiornamento di rete NU6.3, ed è lì che ora si trova il nuovo valore schermato.

Esiste perché a maggio 2026 è stata trovata una vulnerabilità nel sistema di proving di Orchard. Non ci sono prove che sia mai stata sfruttata, ma la falla impediva che la quantità di monete nella pool schermata potesse essere verificata come valida esclusivamente tramite le prove stesse. Invece di correggerla sul posto, la rete ha creato una nuova pool con un circuito corretto e ha spostato il valore attraverso un turnstile che conta pubblicamente ogni moneta. È questa contabilità che ripristina la garanzia che la quantità di monete nella pool schermata sia completamente coperta.

Ironwood riutilizza il modello Action di Orchard e i proof Halo 2, quindi nel funzionamento quotidiano si comporta allo stesso modo. Ci sono due novità: le transazioni usano il formato v6 e le note di Ironwood sono **recuperabili in caso quantistico** secondo [ZIP 2005](https://zips.z.cash/zip-2005), il che significa che il record on-chain di una moneta resta recuperabile se in futuro un computer quantistico dovesse compromettere la crittografia odierna. Si tratta di un percorso di recupero, non di resistenza quantistica, e non si applica alle pool più vecchie.

Non hai bisogno di un nuovo indirizzo. Gli indirizzi unificati raggruppano diversi ricevitori, e i portafogli scelgono per te la pool corretta.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: un grafico che mostra la pool Orchard fino al 29 ottobre 2025, prima dell’attivazione di Ironwood

<br/>

La pool schermata Orchard è stata attivata il 31 maggio 2022 come parte dell’aggiornamento di rete NU5. Orchard ha introdotto un nuovo protocollo schermato che ha eliminato la necessità di un trusted setup ed è diventata la pool schermata principale usata dagli indirizzi unificati (UA).

Orchard ha migliorato significativamente usabilità, efficienza e privacy riducendo la perdita di metadati delle transazioni e introducendo un modello di transazione più flessibile basato su Action anziché sui tradizionali input e output schermati.

Da quando l’aggiornamento Ironwood è stato attivato il 28 luglio 2026, **Orchard è solo per la spesa**. Nessun nuovo valore può entrare nella pool. I fondi già presenti possono ancora essere spesi e stanno migrando verso Ironwood attraverso il turnstile. I portafogli gestiscono questo processo per te, anche se la maggior parte ti offre un certo controllo sul ritmo.

Se possiedi fondi in Orchard, vedi [Ironwood](/zcash-tech/ironwood) per capire cosa significa in pratica la migrazione.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: un grafico che mostra la pool Sapling fino al 29 ottobre 2025, prima dell’attivazione di Ironwood

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) è stato un aggiornamento del protocollo Zcash introdotto il 28 ottobre 2018. Rappresenta un importante miglioramento rispetto alla versione precedente nota come Sprout, che presentava alcune limitazioni in termini di privacy, efficienza e usabilità. 

Tra i miglioramenti introdotti vi sono prestazioni migliori per gli indirizzi schermati, chiavi di visualizzazione migliorate per consentire agli utenti di visualizzare le transazioni in entrata e in uscita senza esporre le chiavi private dell’utente e chiavi a conoscenza zero indipendenti per i portafogli hardware durante la firma delle transazioni. 

Zcash Sapling consente agli utenti di effettuare transazioni private in pochi secondi rispetto ai tempi più lunghi richiesti dalla serie Sprout. 

La schermatura delle transazioni migliora la privacy, rendendo impossibile per terze parti collegare le transazioni e determinare la quantità di ZEC trasferita. Sapling migliora anche l’usabilità riducendo i requisiti computazionali necessari per generare transazioni private, rendendole più accessibili agli utenti.

Gli indirizzi dei portafogli Sapling iniziano con "zs" e questo si può osservare in tutti i portafogli schermati Zcash supportati (Zkool, Zingo Wallet, Nighthawk ecc.) che hanno indirizzi Sapling integrati. Zcash Sapling rappresenta un importante sviluppo tecnologico in termini di privacy ed efficienza delle transazioni, che rende Zcash una criptovaluta pratica ed efficace per gli utenti che danno valore a privacy e sicurezza.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: un grafico che mostra la pool Sprout fino al 29 ottobre 2025, prima dell’attivazione di Ironwood

Sprout è stato il primo protocollo di privacy Zero Knowledge aperto e permissionless mai lanciato. È stato lanciato il 28 ottobre 2016.

Gli indirizzi Sprout sono identificati dalle loro prime due lettere, che sono sempre "zc". Fu chiamato "Sprout" soprattutto per sottolineare che il software era giovane, una blockchain nascente con grande potenziale di crescita e aperta allo sviluppo. 

Sprout fu usato come strumento iniziale per il [mining slow start di Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), che portò alla distribuzione di ZEC e delle ricompense di blocco ai miner. 

Con la continua espansione dell’ecosistema Zcash e l’aumento del numero di transazioni schermate, si osservò che la serie Zcash Sprout diventava limitata e meno efficiente in termini di privacy degli utenti, scalabilità delle transazioni ed elaborazione. Questo portò alla modifica della rete e all’aggiornamento Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: un grafico che mostra la pool trasparente fino al 29 ottobre 2025, prima dell’attivazione di Ironwood

<br/>

La pool trasparente di Zcash è non schermata e non privata. Gli indirizzi dei portafogli trasparenti su Zcash iniziano con la lettera "t"; il livello di privacy è molto basso quando si usa questo tipo di indirizzo per le transazioni.

Le transazioni Transparent in Zcash sono simili alle transazioni di Bitcoin, supportano transazioni multifirma e utilizzano indirizzi pubblici standard.

Gli indirizzi Transparent di Zcash sono usati per lo più dagli exchange centralizzati per garantire elevata trasparenza e conferma della rete nell’invio e nella ricezione di ZEC tra utenti.

È anche importante notare che, mentre gli indirizzi schermati di Zcash forniscono un’elevata privacy durante le transazioni, richiedono anche più risorse computazionali per elaborarle. Pertanto, alcuni utenti possono adottare indirizzi Transparent per transazioni che non richiedono lo stesso livello di privacy.

<br/>

## Pratiche consigliate per i trasferimenti tra pool

Quando si considera un alto livello di privacy durante una transazione sulla rete Zcash, è consigliabile seguire le pratiche riportate di seguito;

Le transazioni che avvengono tra portafogli "z to z" sulla blockchain di Zcash sono per lo più schermate e talvolta vengono chiamate transazioni private per l’elevato livello di privacy generato. Questo è di solito il modo migliore e più raccomandato per inviare e ricevere $ZEC quando è richiesta privacy. 

---

Quando invii ZEC da "Z-address" a "T-address", ciò indica semplicemente una forma di transazione di deschermatura. In questo tipo di transazione, il livello di privacy non è sempre elevato perché alcune informazioni saranno visibili sulla blockchain a causa dell’invio di ZEC a un Transparent Address. La transazione di deschermatura non è sempre raccomandata quando è richiesta un’elevata privacy. 

---

Trasferire ZEC da un Transparent Address (T-address) a uno Z-address è semplicemente noto come schermatura. In questo tipo di transazione il livello di privacy non è sempre elevato rispetto a quello di una transazione z-z, ma è comunque raccomandato quando è richiesta privacy. 

---

Inviare ZEC da un Transparent Address (T-address) a un altro Transparent Address (T-address) sulla rete Zcash (transazione T-T) è molto simile a una transazione Bitcoin ed è per questo che le transazioni T-T su Zcash vengono sempre chiamate transazioni pubbliche, perché i dettagli della transazione sia del mittente sia del destinatario diventano visibili al pubblico, il che rende il livello di privacy molto basso in questo tipo di transazione. 

La maggior parte degli exchange centralizzati di criptovalute utilizza Transparent Address ("T-address) quando effettua transazioni sulla blockchain di Zcash, ma questo tipo di transazione (T-T) non avrà alcuna proprietà privata.

<br/>

## La migrazione da Orchard a Ironwood

La migrazione è in corso ora. Orchard è chiuso a nuovi depositi, e il valore ancora presente al suo interno si sta spostando in Ironwood una transazione alla volta. Puoi osservare i totali su [ironwood.live](https://ironwood.live/).

Ciò che questo significa dipende da dove si trovano i tuoi fondi:

1. **La nuova attività schermata** entra automaticamente in Ironwood. Non devi fare nulla.
2. **I fondi Orchard esistenti** devono migrare. I portafogli mantenuti lo fanno per te, di solito in fasi invece che tutto in una volta.
3. **Sapling non è interessato** e continua ad accettare fondi. Solo Orchard è stato chiuso.
4. **Il turnstile conta tutto** ciò che passa tra le pool, ed è questo che dimostra che nessuna moneta è stata inventata lungo il percorso.

> **Una precisazione sulla privacy che vale la pena conoscere.** Il turnstile pubblica l’*importo* che attraversa le pool, insieme all’altezza del blocco. Mittente e destinatario restano nascosti come sempre, ma un importo distintivo può essere ricollegato a te. Per questo i portafogli effettuano la migrazione in fasi usando denominazioni standard invece di spostare il tuo saldo in un unico blocco riconoscibile. Lascia che il tuo portafoglio segua il proprio ritmo e valuta l’uso di Tor o di una VPN in modo che il tuo IP non sia associato agli importi che sposti.

Vedi [Ironwood](/zcash-tech/ironwood) per l’aggiornamento in sé, e [The Turnstile](/zcash-tech/the-turnstile) per capire come funziona la contabilità.

<br/>

## Errori comuni da evitare

- **Inviare da t-address a t-address** — completamente pubblico, nessuna privacy. Scherma sempre prima i fondi.
- **Supporre che Orchard accetti ancora fondi** — è solo-spesa dal 28 luglio 2026. Il valore può uscirne, ma non può entrarvi nulla di nuovo
- **Confondere Sapling e indirizzi unificati** — Gli indirizzi Sapling iniziano con `zs`. Gli indirizzi unificati iniziano con `u1` e raggruppano diversi ricevitori, quindi la pool in cui arriva il tuo pagamento dipende da quali ricevitori quell’indirizzo contiene
- **Lasciare fondi nella pool Sprout** — Sprout è stato deprecato da anni; sposta fuori quei fondi
- **Aspettarsi che una migrazione sia completamente invisibile** — l’importo che attraversa il turnstile è pubblico, anche se mittente e destinatario non lo sono
- **Supporre che t → z (schermatura) sia completamente privato** — l’atto stesso della schermatura è visibile on-chain; il contenuto no

---

## Pagine correlate

- [Ironwood](/zcash-tech/ironwood) — L’aggiornamento che ha creato l’attuale pool
- [Il turnstile](/zcash-tech/the-turnstile) — Come viene verificato il valore che si sposta tra le pool
- [Portafogli](/using-zcash/wallets) — Quali portafogli sono mantenuti e pronti per Ironwood
- [Transazioni](/using-zcash/transactions) — Come inviare transazioni schermate
- [Acquistare ZEC](/using-zcash/buying-zec) — Come acquisire ZEC prima di usarlo nelle pool
- [zk-SNARKs](/zcash-tech/zk-snarks) — Il fondamento crittografico delle pool schermate
- [Che cosa sono ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Contesto sulla privacy di Zcash
