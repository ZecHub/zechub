---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Overwinter

> Overwinter è stato attivato sulla mainnet di Zcash al blocco 347,500 (26 giugno 2018 UTC).

Cosa imparerai: come Zcash ha imparato a cambiare in sicurezza le proprie regole, e perché quelle basi hanno reso possibile ogni aggiornamento successivo, a partire da Sapling.

Overwinter è un [aggiornamento di rete](../start-here/network-upgrades) di Zcash, il primo dopo il lancio della rete. È definito da diverse Zcash Improvement Proposals: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) e [ZIP 143](https://zips.z.cash/zip-0143). Overwinter non ha aggiunto nuove funzionalità shielded. Ha invece reso più robusto il protocollo affinché gli aggiornamenti futuri potessero essere distribuiti in sicurezza. L’aggiornamento è documentato dalla [Electric Coin Company](../zcash-organizations/electric-coin-company) nella pagina ufficiale degli aggiornamenti di Zcash.

Perché è importante. Cambiare le regole di una blockchain attiva è pericoloso. Se qualcosa va storto, due versioni della rete possono entrare in disaccordo, oppure una transazione pensata per una catena può essere copiata su un’altra. Prima di Overwinter, Zcash non aveva un modo standard e sicuro contro il replay per coordinare un cambiamento delle regole. Overwinter ha risolto questo problema. Ha dato a Zcash un processo formale per gli aggiornamenti e, cosa altrettanto importante, una protezione replay bidirezionale, così che una transazione valida con un insieme di regole non possa essere riprodotta con un altro. Sono proprio queste basi che hanno reso possibile l’attivazione pulita di Sapling e di ogni aggiornamento successivo.

![Prima e dopo Overwinter: prima, nessun percorso standard di aggiornamento e nessuna protezione replay. Dopo, un meccanismo di aggiornamento della rete con protezione replay bidirezionale e aggiornamenti futuri sicuri](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Il meccanismo di aggiornamento

Overwinter ha introdotto il Network Upgrade Mechanism, definito in [ZIP 200](https://zips.z.cash/zip-0200). Ogni aggiornamento ora definisce due elementi: un consensus branch id che identifica l’insieme corrente di regole, e un’altezza di attivazione, cioè il blocco in cui le nuove regole entrano in vigore. Questo offre a tutti coloro che eseguono software Zcash una finestra chiara per aggiornarsi prima del passaggio.

Overwinter stesso si è attivato sulla mainnet al blocco 347,500.

[ZIP 201](https://zips.z.cash/zip-0201) gestisce il modo in cui i nodi si trattano a vicenda attorno a un aggiornamento. Prima dell’attivazione, i nodi preferiscono connettersi a peer che eseguono la stessa versione. Al momento dell’attivazione, un nodo si disconnette dai peer che si trovano su un consensus branch diverso, così la rete si separa in modo pulito secondo le nuove regole invece di creare confusione.

## Protezione replay

Un replay avviene quando qualcuno prende una transazione valida su una catena e la ritrasmette su un’altra. Overwinter chiude questa possibilità con un nuovo schema di firma, definito in [ZIP 143](https://zips.z.cash/zip-0143). Quando un wallet firma una transazione, la firma ora si vincola al consensus branch id della catena corrente. Una transazione firmata per un branch semplicemente non è valida su nessun altro branch, in nessuna delle due direzioni. Questo è il significato di protezione replay bidirezionale.

Questo funziona insieme al nuovo formato di transazione versione 3 di [ZIP 202](https://zips.z.cash/zip-0202), talvolta chiamato formato Overwintered. Aggiunge un flag fOverwintered e un version group id che chiariscono a quale insieme di regole di consenso appartiene una transazione. Come beneficio collaterale, il nuovo schema di firma ha anche migliorato la velocità di validazione delle transazioni transparent.

![Come funziona la protezione replay: un wallet firma una transazione vincolandola al consensus branch id corrente, così la transazione non può essere riprodotta su nessun altro branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Scadenza delle transazioni

[ZIP 203](https://zips.z.cash/zip-0203) ha aggiunto la scadenza delle transazioni. Una transazione ora può impostare un’altezza di blocco di scadenza. Se non è stata inclusa in un blocco entro quell’altezza, i nodi la rimuovono dalla mempool, la sala d’attesa delle transazioni non confermate. Prima di questo cambiamento, una transazione poteva restare non confermata per molto tempo. La scadenza fa sì che una transazione bloccata venga infine eliminata da sola, riducendo l’incertezza per te e impedendo che la mempool si riempia di transazioni vecchie e non incluse in un blocco.

## Dove si colloca

Overwinter è stato il primo aggiornamento di rete di Zcash dopo il lancio della mainnet nell’ottobre 2016, ed è stato distribuito deliberatamente prima di Sapling. Il suo compito era infrastrutturale, non funzionale. Installando prima il meccanismo di aggiornamento e l’infrastruttura di protezione replay, ha fornito a ogni aggiornamento successivo (Sapling, Blossom, Heartwood, Canopy, NU5 e quelli dopo) un percorso sicuro per l’attivazione.

![Cronologia dal lancio di Sprout nell’ottobre 2016, attraverso il periodo dal 2016 al 2018 senza un framework di aggiornamento, fino a Overwinter nel giugno 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Aggiornamento di rete (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a un’altezza di blocco prestabilita |
| Consensus branch id | Un identificatore breve che dà un nome all’insieme corrente di regole di consenso |
| Altezza di attivazione | Il blocco in cui le nuove regole di un aggiornamento di rete entrano in vigore |
| Protezione replay | Una regola che impedisce a una transazione valida su una catena di essere riutilizzata su un’altra |
| Mempool | L’insieme delle transazioni che sono state trasmesse ma non ancora incluse in un blocco |
| Scadenza della transazione | Un’altezza di blocco di scadenza oltre la quale una transazione non inclusa in un blocco viene rimossa |

## FAQ

Overwinter ha cambiato i miei ZEC o la mia privacy? No. Overwinter non ha aggiunto nuove funzionalità e non ha toccato le transazioni shielded. Era un’infrastruttura per rendere sicuri gli aggiornamenti futuri. I tuoi fondi e la tua privacy non sono stati influenzati.

Overwinter ha aggiunto Sapling o gli indirizzi shielded? No. Overwinter non ha aggiunto funzionalità shielded. Ha preparato il terreno affinché Sapling potesse attivarsi in sicurezza in seguito.

Che cos’è un consensus branch id? È una breve etichetta che identifica l’insieme corrente di regole. Le transazioni vi si vincolano quando vengono firmate, ed è questo che fornisce a Zcash la sua protezione replay.

Perché alcune fonti indicano il 25 giugno e altre il 26 giugno? Overwinter si è attivato alle 01:37 UTC del 26 giugno 2018. È appena dopo la mezzanotte UTC, quindi in molti fusi orari occidentali l’orologio locale segnava ancora il 25 giugno. Si tratta dello stesso blocco e dello stesso momento.

A cosa serve la scadenza delle transazioni? Significa che una transazione che non viene mai inclusa in un blocco non rimarrà in sospeso per sempre. Dopo la sua altezza di scadenza, i nodi la rimuovono, così non resti nell’incertezza per un pagamento bloccato.

Devo fare qualcosa? No. Overwinter si è attivato nel 2018. Qualsiasi wallet o nodo Zcash attuale segue già queste regole.

## Metti alla prova la tua comprensione

Overwinter non ha aggiunto nuove funzionalità shielded. Allora perché è considerato uno degli aggiornamenti più importanti nella storia di Zcash?

<details>
<summary>Risposta</summary>

Perché ha costruito l’infrastruttura da cui dipende ogni aggiornamento successivo. Overwinter ha introdotto il Network Upgrade Mechanism e la protezione replay bidirezionale, dando a Zcash un modo standard e sicuro per cambiare le proprie regole di consenso. Senza queste basi, Sapling e gli aggiornamenti successivi non avrebbero potuto attivarsi in modo pulito.
</details>

### Risorse

[ZIP 200: Meccanismo di aggiornamento della rete](https://zips.z.cash/zip-0200)

[ZIP 201: Gestione dei peer di rete per Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Formato di transazione versione 3 per Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Scadenza delle transazioni](https://zips.z.cash/zip-0203)

[ZIP 143: Validazione della firma delle transazioni per Overwinter](https://zips.z.cash/zip-0143)

[Aggiornamento di rete Overwinter](https://z.cash/upgrade/overwinter/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Pool shielded](../using-zcash/shielded-pools)

[Nodi completi](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Che cosa sono ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Sprout](../zcash-tech/sprout) · Successivo: [Sapling](../zcash-tech/sapling)
