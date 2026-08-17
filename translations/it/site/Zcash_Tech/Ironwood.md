<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Ironwood

> Ironwood si attiva sulla mainnet di Zcash al blocco 3,428,143, previsto intorno al 28 luglio 2026 UTC.

Cosa imparerai: che cosa cambia con Ironwood, perché un bug nel denaro nascosto è grave e come il turnstile permette a chiunque di confermare che non è stato creato alcun ZEC dal nulla.

Ironwood è un [aggiornamento di rete](../start-here/network-upgrades) di Zcash, formalmente NU6.3, che introduce un nuovo pool shielded con lo stesso nome. Un [pool shielded](../using-zcash/shielded-pools) è l’insieme dei fondi i cui importi e proprietari restano nascosti grazie alla [crittografia a conoscenza zero](../zcash-tech/zk-snarks). Ironwood esiste per contenere e verificare un bug di soundness trovato nell’attuale pool shielded Orchard, e per dare alla comunità un modo più solido per controllare che l’offerta totale di ZEC sia corretta. Le sue regole di consenso sono specificate in [ZIP 258](https://zips.z.cash/zip-0258).

Perché è importante. Con denaro trasparente come Bitcoin, chiunque può controllare che non siano state create monete dal nulla leggendo il registro pubblico. Il denaro shielded nasconde gli importi, quindi non basta guardare. Invece, deve essere la crittografia stessa a garantire che nessuno possa creare denaro in segreto. Ironwood è importante perché è stato trovato un bug in questa garanzia per il pool Orchard. L’aggiornamento chiude questa falla e offre a chiunque un modo per confermare che l’offerta totale di ZEC sia ancora corretta.

Nuovo su Zcash? Inizia da [Cos’è ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Pool Shielded](../using-zcash/shielded-pools), poi torna qui.

![Flusso di migrazione del valore di Ironwood: il valore esce dal pool Orchard, passa attraverso il checkpoint del turnstile ed entra nel nuovo pool Ironwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Perché Ironwood era necessario

Alla fine di maggio 2026, il ricercatore indipendente di sicurezza Taylor Hornby, durante un audit del protocollo per [Shielded Labs](../zcash-organizations/shielded-labs), ha segnalato responsabilmente un bug di soundness nel pool shielded Orchard. Orchard era allora il pool shielded più recente di Zcash, e il difetto si trovava in una parte a curva ellittica del suo circuito a conoscenza zero, che utilizza il sistema di proving [Halo](../zcash-tech/halo) 2.

1. Un bug di soundness significa che la matematica che dimostra la validità di una transazione non la garantisce completamente.
2. In teoria, un attaccante avrebbe potuto usare il difetto per creare valore non valido all’interno del pool Orchard e spendere fondi che non erano davvero suoi, senza lasciare tracce che un normale nodo potesse rilevare.
3. Il turnstile di Zcash limitava comunque la quantità di valore che avrebbe mai potuto uscire da Orchard, quindi l’offerta totale non poteva essere gonfiata, ma la crittografia del pool non garantiva più che ogni moneta nascosta al suo interno fosse reale.

![Il bug spiegato: una transazione inserisce 5 ZEC, ma la prova difettosa passa comunque quando ne escono 7 ZEC, creando 2 ZEC dal nulla](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

I numeri sopra sono una rappresentazione semplificata. Il vero difetto si trovava in una parte specifica della matematica del circuito, non in un conteggio letterale delle monete in entrata e in uscita. Il punto fondamentale è solo che un bug di soundness può permettere la creazione di valore all’interno del pool senza essere rilevato.

È importante sottolineare che non ci sono prove che il bug sia mai stato sfruttato, non ci sono prove di impatti sui fondi degli utenti e non ci sono prove che l’offerta totale di ZEC sia cambiata. È stato individuato attraverso la ricerca sulla sicurezza ed è stato corretto prima che si verificasse qualsiasi danno noto.

## La risposta

La comunità Zcash ha distribuito le correzioni in più fasi invece che tutte in una volta.

![Cronologia della risposta di Ironwood: il bug di Orchard viene trovato a maggio 2026, il pool viene messo in pausa a giugno 2026, il circuito viene corretto in NU6.2 e Ironwood si attiva intorno al 28 luglio 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. All’inizio di giugno 2026, una misura temporanea ha disabilitato il pool Orchard mentre veniva preparata una correzione completa.
2. L’aggiornamento NU6.2 ha corretto il circuito Orchard stesso, chiudendo la vulnerabilità di soundness alla radice.
3. L’aggiornamento NU6.3, Ironwood, introduce un nuovo pool shielded e un checkpoint pubblico, così che il valore possa uscire dal vecchio pool Orchard sotto piena verifica.

![La correzione in NU6.2: la prova corretta richiede che gli input siano uguali agli output, quindi un output valido di 5 ZEC passa mentre un tentativo di produrre 7 ZEC viene rifiutato](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Cosa fa il pool Ironwood

NU6.2 ha messo in sicurezza il circuito Orchard per tutte le nuove transazioni, ma il valore creato secondo le vecchie regole si trova ancora nel pool Orchard. Ironwood fornisce a quel valore una destinazione pulita e un modo per verificarlo mentre si sposta.

Il pool Ironwood è un nuovo pool di valore shielded creato quando si attiva NU6.3. È costruito sul circuito corretto e utilizza un formato di nota recuperabile in ambito quantistico (un design che consente di recuperare i fondi se i [computer quantistici](../zcash-tech/post-quantum-security) dovessero un giorno rompere la crittografia di oggi), definito in [ZIP 2005](https://zips.z.cash/zip-2005).

1. Dopo l’attivazione, il vecchio pool Orchard diventa di sola spesa, quindi nessun nuovo valore può entrarvi.
2. Il nuovo valore shielded confluisce invece in Ironwood.
3. Lo ZEC shielded mantiene le stesse forti garanzie di privacy che nascondono mittente, destinatario e importo.

## Il turnstile

L’idea chiave di Ironwood è il turnstile, un checkpoint contabile attraverso il quale ogni moneta deve passare quando si sposta dal vecchio pool Orchard a Ironwood.

> Un turnstile fa per il denaro nascosto ciò che una porta di vetro fa per il caveau di una banca. Non puoi comunque vedere dentro, ma puoi contare con precisione ciò che entra e ciò che esce.

1. I fondi che escono da Orchard vengono conteggiati in un punto di verifica pubblico prima di entrare in Ironwood.
2. Questo permette a chiunque di verificare quanto ZEC migra, rafforzando la fiducia nell’offerta circolante reale.
3. Se fosse stato creato qualche ZEC contraffatto tramite il bug precedente, questa contabilità della migrazione è il punto in cui verrebbe alla luce.

I turnstile non sono una novità per Zcash. La rete li ha già usati in passato, ai confini tra i pool Sprout, Sapling e Orchard, in modo che il valore che si sposta tra pool resti verificabile e che nessun pool possa rilasciare più di quanto vi sia entrato legittimamente.

Le regole di consenso mantengono ogni pool di valore, incluso Ironwood, entro il limite massimo di moneta della rete, quindi i saldi dei pool non possono mai diventare negativi.

## Cosa devono fare gli utenti

I wallet e il software dei nodi gestiscono automaticamente gran parte di questo processo, ma il cambiamento pratico è semplice: nel tempo, sposta i fondi shielded dal vecchio pool Orchard attraverso il turnstile verso il pool Ironwood. Segui le indicazioni del fornitore del tuo wallet e aggiorna sempre a una release supportata prima del blocco di attivazione.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Pool shielded | L’insieme dei fondi i cui importi e proprietari sono nascosti dalla crittografia a conoscenza zero |
| Bug di soundness | Un difetto che permette a una transazione non valida di superare il controllo della prova come se fosse valida |
| Turnstile | Un checkpoint pubblico che conta il valore che si sposta tra i pool affinché l’offerta resti verificabile |
| Di sola spesa | Un pool da cui puoi spendere, ma a cui non puoi aggiungere nuovo valore |
| Aggiornamento di rete (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a un’altezza di blocco prestabilita |
| Nota recuperabile in ambito quantistico | Un formato di nota progettato in modo che i fondi possano essere recuperati se i computer quantistici dovessero un giorno rompere la crittografia di oggi |

## FAQ

Il mio ZEC è stato coinvolto? No. Non ci sono prove che il bug sia mai stato usato, nessun impatto sui fondi degli utenti e nessun cambiamento nell’offerta totale.

Devo fare qualcosa? Mantieni il tuo wallet e il software del tuo nodo aggiornati a una release supportata prima del blocco di attivazione. Il tuo wallet sposta i fondi in Ironwood nel tempo man mano che spendi, quindi non c’è nulla di manuale da fare con urgenza. Segui le indicazioni del fornitore del tuo wallet.

Zcash è ancora privato? Sì. Ironwood mantiene la stessa privacy shielded che nasconde mittente, destinatario e importo. Questo aggiornamento riguarda l’integrità dell’offerta, non la privacy.

Il bug è mai stato sfruttato? Non ci sono prove che lo sia stato. È stato scoperto attraverso la ricerca sulla sicurezza, segnalato responsabilmente e corretto prima che si verificasse qualsiasi danno noto.

Che cosa succede al vecchio pool Orchard? Diventa di sola spesa. Nessun nuovo valore può entrarvi, e il valore esistente si sposta in Ironwood attraverso il turnstile, dove la migrazione viene verificata pubblicamente.

## Metti alla prova la tua comprensione

Se lo ZEC all’interno dei pool shielded è nascosto, come può chiunque confermare che il bug di Orchard non abbia gonfiato segretamente l’offerta totale?

<details>
<summary>Risposta</summary>

Attraverso il turnstile. Ogni moneta che esce dal vecchio pool Orchard viene conteggiata in un checkpoint pubblico mentre entra in Ironwood. Se cercasse di uscire più valore di quanto ne sia entrato legittimamente, la contabilità non tornerebbe, quindi qualsiasi contraffazione che il bug avrebbe potuto creare emergerebbe a quel varco.
</details>

### Risorse

[ZIP 258: Deployment of the NU6.3 Network Upgrade](https://zips.z.cash/zip-0258)

[ZIP 257: Deployment of the Orchard Temporary Vulnerability Mitigation and NU6.2 Network Upgrade](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)

[Ironwood: Un nuovo pool shielded per Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Pool Shielded](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Sicurezza post-quantistica](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Cos’è ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [NU6.2](../zcash-tech/nu6-2)
