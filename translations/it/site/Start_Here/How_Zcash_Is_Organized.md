# Come è organizzato Zcash

## TL;DR

- Zcash non è costruito da un'unica azienda, ma da molte organizzazioni indipendenti che possiedono ciascuna una parte diversa del lavoro
- Per la maggior parte della sua storia, due organizzazioni hanno guidato lo sviluppo, Electric Coin Company e Zcash Foundation
- Nel gennaio 2026 l'intero team di Electric Coin Company si è dimesso dopo una disputa sulla governance, e l'ecosistema si è riorganizzato in diversi team indipendenti
- Oggi il protocollo, il software dei nodi, i wallet, la ricerca, la scalabilità e i finanziamenti sono gestiti da gruppi separati
- Nessuna singola organizzazione controlla Zcash, la rete è open source e permissionless, e ha continuato a funzionare normalmente durante ogni cambiamento

<br/>

## Per chi è questa pagina

- Nuovi arrivati che cercano di capire chi costruisce e mantiene davvero Zcash
- Chiunque sia confuso dai molti nomi di organizzazioni nell'ecosistema
- Collaboratori che devono decidere con chi lavorare o a chi inviare una proposta

<br/>

## Perché è importante

Comprendere la struttura rende tutto il resto più facile. Ti dice chi mantiene il codice da cui dipendi, a chi rivolgerti per una grant e chi è responsabile della parte della rete che ti interessa. Rivela anche uno dei punti di forza meno appariscenti di Zcash: poiché il lavoro è distribuito tra gruppi indipendenti, nessun singolo punto di fallimento può catturare o bloccare il progetto.

Questa pagina è una mappa. Per ogni organizzazione che ha già una pagina completa su questo wiki, troverai una breve nota e un link per approfondire, invece di una ripetizione di quanto già scritto lì.

<br/>

## Come funzionava prima

Per la maggior parte della storia di Zcash, due organizzazioni hanno indicato la strada.

Electric Coin Company ha lanciato Zcash nel 2016 e impiegava gran parte del team di sviluppo principale. Era supervisionata da Bootstrap, un consiglio nonprofit creato per supportare Zcash. Zcash Foundation lavorava al suo fianco come nonprofit indipendente, concentrandosi sulla stewardship del protocollo e sulla costruzione di un nodo indipendente. Entrambe erano finanziate in larga misura da una porzione della block reward riservata allo sviluppo.

Questa struttura a due pilastri ha retto per anni, ma dipendeva da quel finanziamento condiviso e dal fatto che le due organizzazioni restassero allineate. Con l'evolversi del finanziamento originario dello sviluppo e con il suo futuro a lungo termine diventato meno certo, la questione di come pagare il lavoro continuativo è diventata più urgente. Questa domanda sul finanziamento è sullo sfondo di gran parte di ciò che è cambiato in seguito, ed è parte del motivo per cui alcuni team oggi raccolgono capitali esterni mentre altri si affidano alle grant.

<br/>

## La riorganizzazione del 2026

Nel gennaio 2026 la struttura è cambiata bruscamente. Il 7 gennaio, Josh Swihart, amministratore delegato di Electric Coin Company, ha annunciato su X che l'intero team dell'azienda si era dimesso.

Bootstrap era una nonprofit creata nel 2020 per governare Electric Coin Company, che ne era diventata una controllata interamente posseduta. Il disaccordo tra il team dell'azienda e questo consiglio si è accumulato nel tempo e ha toccato diverse questioni, tra cui la direzione dell'organizzazione, come finanziare lo sviluppo e il futuro del wallet Zashi, che il team voleva trasferire in una società privata per raccogliere capitali esterni. Swihart ha descritto l'uscita come un constructive discharge, un termine legale che significa che le condizioni erano state cambiate in modo così grave da rendere di fatto forzate le dimissioni, e ha affermato che una maggioranza del consiglio si era disallineata dalla missione di Zcash.

Per correttezza, conta anche l'altra versione dei fatti. Bootstrap ha presentato il conflitto come una questione di governance e di conformità legale nonprofit. Il fondatore di Zcash, Zooko Wilcox, ha difeso pubblicamente i membri del consiglio nominati nella disputa, dicendo di aver lavorato con loro per molti anni e di considerarli persone di alta integrità, chiarendo al tempo stesso di non schierarsi sul disaccordo in sé.

Due cose non erano oggetto di disputa. Nessuna parte ha denunciato condotte criminali, quindi si trattava di un disaccordo societario e di governance piuttosto che di un caso legale. E la rete Zcash stessa non ne è stata influenzata: è rimasta open source, permissionless, sicura e pienamente operativa per tutto il tempo, un punto che sia Swihart sia Wilcox hanno sottolineato agli utenti.

Ciò che è seguito è stata una riorganizzazione, non un collasso. L'ex team dell'azienda ha poi formato ZODL più avanti nel 2026 e, separatamente, tre ex membri del consiglio di Bootstrap hanno formato Sovright. Lo sviluppo si è assestato in una forma più distribuita tra diversi team indipendenti.

Le dichiarazioni qui descritte sono state rese pubblicamente su X il 7 gennaio 2026 da Josh Swihart (@jswihart) e Zooko Wilcox (@zooko), dove i post originali possono essere letti integralmente.

<br/>

## Chi costruisce Zcash oggi

Oggi il lavoro è distribuito tra organizzazioni indipendenti, ognuna con una responsabilità chiara.

### Le due organizzazioni nate dalla scissione del 2026

1. ZODL, lo Zcash Open Development Lab, è stato formato dall'ex team di Electric Coin Company ed è guidato da Josh Swihart. Ha raccolto più di venticinque milioni di dollari da investitori esterni e lavora sullo sviluppo del protocollo core, incluso il sistema di proving Halo 2 che alimenta le più recenti transazioni shielded di Zcash, e sul wallet ZODL, un wallet mobile shielded by default precedentemente chiamato Zashi. Vedi [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright è una nonprofit formata da tre ex membri del consiglio di Bootstrap. Si concentra su strumenti e supporto per l'ecosistema e ha costruito Argos, uno strumento per aiutare i primi utenti a recuperare fondi rimasti bloccati in un vecchio wallet non più mantenuto. Vedi [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Stewardship del protocollo, ricerca e software dei nodi

3. Zcash Foundation mantiene Zebra, il nodo Rust che diventerà il nodo principale della rete man mano che il client più vecchio zcashd verrà ritirato. Inoltre cura l'organizzazione GitHub di Zcash, il sito z.cash e l'account principale di Zcash su X, e collabora con ZecHub per aiutare a gestire alcune di queste risorse. Vedi [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs è una nonprofit indipendente con finanziamento tramite donazioni e con sede in Svizzera. Si concentra sulla ricerca e sulla sostenibilità a lungo termine, incluso il meccanismo di sostenibilità della rete che finanzia lo sviluppo futuro e il lavoro Crosslink per aggiungere finalità proof of stake a Zcash, e ha finanziato l'audit di sicurezza che ha scoperto la vulnerabilità del pool Orchard nel 2026. Vedi [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. Electric Coin Company resta parte della storia come l'organizzazione che ha creato e lanciato Zcash nel 2016. Vedi [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Scalabilità e crittografia

6. Project Tachyon è uno sforzo di scalabilità guidato dal crittografo Sean Bowe. Propone un nuovo modo per i wallet di sincronizzarsi con la blockchain, chiamato oblivious synchronization, che riduce le dimensioni delle transazioni e, come effetto collaterale, avvicina Zcash alla privacy post-quantistica. Il suo lavoro è documentato su [tachyon.z.cash](https://tachyon.z.cash/).
7. Il Valar Group è un laboratorio di ricerca e ingegneria crittografica che lavora sul protocollo Zcash per denaro digitale privato e post-quantistico su larga scala. Collabora strettamente con Project Tachyon sul lavoro relativo a scalabilità e quantistica. Maggiori informazioni sul suo lavoro sono disponibili su [valargroup.dev](https://valargroup.dev/).

### Organizzazioni regionali e comunitarie

8. Obscura Labs è un'organizzazione indipendente registrata in Nigeria, focalizzata sull'Africa e sui mercati emergenti, che costruisce infrastrutture e percorsi di adozione. Vedi [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Educazione

9. ZecHub è un hub educativo decentralizzato per Zcash. I membri della comunità lavorano insieme per creare, validare e promuovere contenuti che aiutano le persone a comprendere l'ecosistema e a imparare come partecipare, attraverso tutorial, documentazione wiki, un podcast e una newsletter settimanale. Il wiki che stai leggendo ora fa parte di ZecHub, e Zcash Foundation collabora con esso per aiutare a gestire alcune risorse della comunità.

### Finanziamento

10. Zcash Community Grants finanzia collaboratori indipendenti e progetti della comunità con una porzione della block reward, distribuendo il lavoro tra molti team oltre alle organizzazioni principali. Vedi [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. Financial Privacy Foundation supporta l'ecosistema Zcash e i progetti della comunità. Vedi [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Tutte queste organizzazioni mantengono repository open source, quindi il loro lavoro può essere letto, verificato e sviluppato da chiunque. E le organizzazioni non raccontano l'intera storia. Molti contributi significativi provengono da individui e da aziende sotto contratto finanziate tramite grant, piuttosto che dalle sole organizzazioni principali. Accanto a loro ci sono team di wallet, comunità regionali, sviluppatori indipendenti e investitori che detengono e sostengono ZEC senza costruire il protocollo. L'elenco sopra è la struttura portante, non il quadro completo.

<br/>

## Da dove iniziare se sei un nuovo arrivato

Quale organizzazione conta per te dipende da ciò che vuoi fare.

1. Per usare Zcash, ti serve un wallet, quindi ZODL e il suo wallet sono un punto di partenza naturale.
2. Per gestire un nodo o comprendere il software della rete, guarda a Zcash Foundation e al suo nodo Zebra.
3. Per finanziare un progetto o contribuire con lavoro retribuito, guarda a Zcash Community Grants.
4. Per seguire la ricerca e il futuro del protocollo, segui Shielded Labs, Project Tachyon e il Valar Group.

<br/>

## Continua a imparare

Questo wiki esiste per aiutarti ad approfondire, quindi il miglior passo successivo è continuare a leggerlo. Alcuni buoni argomenti successivi per un nuovo arrivato:

- [Che cosa sono ZEC e Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) per le basi della rete e della moneta
- [Guida per nuovi utenti](https://zechub.wiki/start-here/new-user-guide) per una prima panoramica sull'uso di Zcash
- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) per capire come Zcash mantiene private le transazioni
- [Il turnstile](https://zechub.wiki/zcash-tech/the-turnstile) per capire come l'offerta monetaria resta verificabile
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) per il pool shielded verso cui la rete sta migrando
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) per capire come Zcash cambia nel tempo
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) per la crittografia alla base della privacy

Ogni pagina rimanda ad altre ancora, così puoi seguire il filo quanto vuoi.

<br/>

## Equivoci comuni

- Zcash non è posseduto o controllato da una singola azienda, nessuna organizzazione da sola può cambiare o fermare la rete
- La disputa del 2026 non ha influenzato la rete, i fondi o la privacy, è stato un disaccordo organizzativo, e il protocollo ha funzionato normalmente per tutto il tempo
- L'uscita del team da Electric Coin Company non ha posto fine a Zcash, il lavoro si è spostato verso nuove organizzazioni indipendenti
- Avere molte organizzazioni è un punto di forza, non una debolezza, elimina i singoli punti di fallimento e mantiene il progetto resiliente
- Detenere o promuovere ZEC non è la stessa cosa che costruire Zcash, investitori ed evangelisti fanno parte della comunità ma sono distinti dai team che sviluppano il protocollo

<br/>

## Pagine correlate

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - il laboratorio di sviluppo formato dall'ex team di Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - la nonprofit formata da ex membri del consiglio di Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - custode del protocollo e del nodo Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - ricerca e sostenibilità del protocollo
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - l'azienda che ha lanciato Zcash nel 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infrastruttura e adozione in Africa e nei mercati emergenti
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - finanziamento per collaboratori indipendenti
