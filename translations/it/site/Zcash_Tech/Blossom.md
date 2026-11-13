<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom è stato attivato sulla mainnet di Zcash al blocco 653.600 (11 dicembre 2019 UTC).

Cosa imparerai: come Blossom ha fatto arrivare i blocchi di Zcash circa il doppio più velocemente senza cambiare la quantità di ZEC che la rete crea nel tempo.

Blossom è un [aggiornamento di rete](../start-here/network-upgrades) di Zcash. È stato distribuito tramite [ZIP 206](https://zips.z.cash/zip-0206), e il suo principale cambiamento di consenso è definito in [ZIP 208](https://zips.z.cash/zip-0208). Blossom è stato un aggiornamento di scalabilità: ha ridotto il tempo obiettivo tra i blocchi da 150 secondi a 75 secondi, quindi i blocchi arrivano circa il doppio delle volte. Electric Coin Company ha guidato e annunciato Blossom.

Perché è importante. Quando invii ZEC, aspetti che la rete lo confermi in un blocco. Se i blocchi sono lenti, aspetti di più. Prima di Blossom, ci si aspettava un nuovo blocco circa ogni 150 secondi. Blossom ha dimezzato questo obiettivo, portandolo a 75 secondi, così le conferme arrivano prima e la chain può gestire più transazioni nello stesso intervallo di tempo. Lo ha fatto senza creare più ZEC né spostare la tempistica dei futuri halving.

## TL;DR

- Blossom è stato il terzo aggiornamento di rete di Zcash, attivato al blocco 653.600 della mainnet (11 dicembre 2019 UTC), distribuito tramite ZIP 206 con il suo cambiamento principale in ZIP 208.
- Ha ridotto l'intervallo obiettivo tra i blocchi da 150 secondi a 75 secondi: i blocchi arrivano circa due volte più spesso, quindi le prime conferme arrivano prima e il throughput all'incirca raddoppia.
- Per mantenere costante l'emissione, ha dimezzato la ricompensa per blocco e raddoppiato l'intervallo di halving da 840.000 a 1.680.000 blocchi.
- La quantità totale di ZEC creata per unità di tempo e la tempistica reale dei futuri halving non sono cambiate.
- È stato un cambiamento bilaterale obbligatorio: ogni nodo ha dovuto aggiornarsi per restare sulla chain.

## Analogia visiva

Blossom è come una rete di autobus che raddoppia le partenze. Ora gli autobus passano ogni 75 secondi invece che ogni 150, quindi aspetti la metà del tempo (conferme più rapide) e la rete trasporta il doppio dei passeggeri (capacità di elaborazione). Per lasciare invariata la spesa per gli stipendi degli autisti, la paga di ogni autista per singola corsa viene dimezzata: la spesa totale per gli stipendi resta la stessa, ma viene distribuita su un numero di corse doppio.

## Blocchi più veloci

Il cambiamento principale di Blossom è semplice. Lo spacing obiettivo dei blocchi di Zcash, cioè il tempo che la rete punta ad avere tra un blocco e il successivo, è sceso da 150 secondi a 75 secondi ([ZIP 208](https://zips.z.cash/zip-0208)). I blocchi vengono trovati tramite proof of work, quindi l'intervallo reale tra loro varia, ma ora la rete punta a un blocco circa ogni 75 secondi invece che ogni 150.

Ne conseguono due cose:

1. I blocchi arrivano circa il doppio delle volte, quindi la chain può gestire all'incirca il doppio delle transazioni per unità di tempo.
2. La tua transazione riceve la sua prima conferma prima, perché non devi aspettare così a lungo il blocco successivo.

![Prima di Blossom l'obiettivo dei blocchi era di 150 secondi, con conferme più lente e throughput inferiore. Dopo Blossom l'obiettivo è di 75 secondi, con conferme più rapide e throughput circa doppio](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Mantenere stabile l'emissione

Blocchi più veloci sollevano una domanda. Se Zcash producesse il doppio dei blocchi e ogni blocco pagasse ancora la stessa ricompensa, la rete creerebbe ZEC al doppio della velocità. Blossom evita questo effetto. Ha dimezzato la ricompensa pagata per blocco e ha raddoppiato l'intervallo di halving della ricompensa dei blocchi da 840.000 a 1.680.000 blocchi ([ZIP 208](https://zips.z.cash/zip-0208)). Il doppio dei blocchi, ciascuno dei quali paga la metà, equivale alla stessa quantità di ZEC creata per unità di tempo. Il programma dell'offerta totale e la tempistica dei futuri halving, misurata nel tempo reale, non sono cambiati.

![Come Blossom mantiene stabile l'emissione: i blocchi da 75 secondi arrivano il doppio delle volte, la ricompensa per blocco viene dimezzata, l'intervallo di halving viene raddoppiato, quindi l'emissione totale nel tempo resta invariata](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Un aggiornamento obbligatorio

Blossom è stato un cambiamento di consenso bilaterale, il che significa che ogni nodo doveva aggiornarsi per continuare a seguire la chain ([ZIP 206](https://zips.z.cash/zip-0206)). Non era facoltativo per un operatore di nodi che volesse restare sincronizzato. Blossom si è attivato al blocco 653.600 della mainnet e ha un proprio consensus branch id, un'etichetta che permette ai nodi e alle transazioni di confermare che stanno seguendo le regole di Blossom. L'aggiornamento ha usato il meccanismo standard di aggiornamento di rete di Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Dove si colloca Blossom

Blossom è stato il terzo aggiornamento di rete di Zcash. È arrivato dopo Overwinter e Sapling, e prima di Heartwood e Canopy. A differenza di Sapling, che ha rielaborato la crittografia schermata di Zcash, Blossom era focalizzato su scalabilità e velocità. Il suo compito principale era la tempistica dei blocchi, non nuove funzionalità per la privacy.

## Errori comuni

- **Pensare che blocchi più rapidi significassero più ZEC.** Dimezzare la ricompensa per blocco raddoppiando la frequenza dei blocchi mantiene l'emissione esattamente uguale per unità di tempo.
- **Dare per scontato che gli halving avvengano prima in tempo reale.** L'intervallo di halving è raddoppiato da 840.000 a 1.680.000 blocchi, quindi le date degli halving in tempo reale non sono cambiate.
- **Interpretare "75 secondi" come una garanzia.** È un obiettivo del proof of work, e gli intervalli effettivi tra i blocchi variano intorno a questo valore.
- **Considerare Blossom un aggiornamento della privacy.** Il suo compito riguardava i tempi dei blocchi e la scalabilità. A differenza di Sapling, non ha modificato alcuna crittografia.
- **Pensare che gli operatori dei nodi potessero ignorarlo.** Blossom era una modifica bilaterale del consenso, e un nodo non aggiornato si separa dalla rete con un fork.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Block target spacing | Il tempo che la rete punta ad avere tra un blocco e il successivo |
| Block reward | I nuovi ZEC creati e distribuiti ogni volta che viene minato un blocco |
| Halving interval | Quanti blocchi passano tra un halving e il successivo della ricompensa del blocco |
| Consensus branch id | Un'etichetta che indica quale insieme di regole di rete sta seguendo un nodo o una transazione |
| Bilateral consensus change | Un cambiamento di regole che ogni nodo deve adottare per restare sulla rete |
| Network upgrade (NU) | Un cambiamento coordinato alle regole di consenso di Zcash, attivato a una determinata altezza di blocco |

## FAQ

Blossom cambia la quantità di ZEC esistente o quando avvengono gli halving? No. La ricompensa per blocco è stata dimezzata e l'intervallo di halving è stato raddoppiato allo stesso tempo, quindi la quantità di ZEC creata per unità di tempo, e la tempistica dei futuri halving, sono rimaste le stesse.

Blossom cambia i miei ZEC o la mia privacy? No. Blossom ha cambiato la tempistica dei blocchi e il calcolo delle ricompense. Non ha toccato i tuoi saldi né le tue transazioni schermate.

Che cosa significano davvero 75 secondi? È un obiettivo, non una garanzia. I blocchi vengono trovati tramite proof of work, quindi l'intervallo reale tra i blocchi varia. La rete punta ad averne uno circa ogni 75 secondi invece che ogni 150.

Ho dovuto fare qualcosa quando Blossom si è attivato? Se eseguivi un full node (nodo completo), dovevi aggiornarlo, perché Blossom era obbligatorio. Se usavi un portafoglio, ti serviva una versione che supportasse le nuove regole.

Perché dimezzare la ricompensa del blocco? Perché ora i blocchi arrivano il doppio delle volte. Dimezzare la ricompensa per blocco impedisce alla rete di creare ZEC al doppio della velocità.

Quando si è attivato Blossom? Al blocco 653.600 della mainnet, l'11 dicembre 2019 UTC.

## Verifica la tua comprensione

Blossom ha fatto arrivare i blocchi di Zcash circa il doppio delle volte. Perché questo non ha raddoppiato il ritmo con cui vengono creati nuovi ZEC?

<details>
<summary>Risposta</summary>

Perché Blossom ha anche dimezzato la ricompensa pagata per blocco e raddoppiato l'intervallo di halving da 840.000 a 1.680.000 blocchi. Il doppio dei blocchi, ciascuno dei quali paga la metà, equivale alla stessa quantità di ZEC per unità di tempo, quindi il programma di emissione misurato nel tempo reale non è cambiato.
</details>

### Risorse

[ZIP 208: Spacing obiettivo dei blocchi più breve](https://zips.z.cash/zip-0208)

[ZIP 206: Distribuzione dell'aggiornamento di rete Blossom](https://zips.z.cash/zip-0206)

[Aggiornamento di rete Blossom](https://z.cash/upgrade/blossom/)

[L'aggiornamento Blossom migliora velocità, scalabilità e capacità (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Politica monetaria di Zcash](../start-here/zcash-monetary-policy)

[Che cosa sono ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Full node](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Pagine correlate

- [Sapling](./Sapling.md) — l'aggiornamento precedente (crittografia, non tempistiche)
- [Heartwood](./Heartwood.md) — l'aggiornamento successivo della serie
- [Full node](./Full_Nodes.md) — cosa comporta gestire un nodo attraverso gli aggiornamenti obbligatori
- [Indice degli aggiornamenti di rete](../start-here/network-upgrades) — la cronologia completa degli aggiornamenti

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Sapling](../zcash-tech/sapling) · Successivo: [Heartwood](../zcash-tech/heartwood)
