---
# Guida del builder per l'hackathon di ZecHub

## TL;DR

- Sappi perché stai costruendo prima di scrivere codice, l'utilità vale più della complessità
- Mantienilo semplice, una piccola idea realizzata bene vale più di una grande idea lasciata incompiuta
- Impara presto lo stack infrastrutturale di Zcash, è la parte più ripida della salita
- Se la tua app sposta fondi, deve funzionare su mainnet, sviluppa su testnet, poi dimostralo su mainnet
- La documentazione e una demo chiara possono contare più del prodotto stesso
- Vincere è una linea di partenza, costruisce la tua reputazione e apre porte nella community

<br/>

## Per chi è questa guida

- Builder alle prime armi che partecipano a un hackathon di ZecHub o Zcash
- Sviluppatori di altri ecosistemi che sono nuovi a Zcash
- Chiunque voglia trasformare un progetto da hackathon in qualcosa di duraturo

<br/>

## Inizia dal perché

Prima di aprire il tuo editor, sappi quale problema stai risolvendo e perché dovrebbe importare a qualcuno. Un buon test è semplice: se la cosa che stai costruendo non esistesse, a qualcuno mancherebbe? Costruisci qualcosa che useresti tu stesso. La privacy è il motivo per cui esiste Zcash, quindi capisci perché la privacy è importante per le persone per cui stai costruendo, e lascia che questo dia forma all'intero progetto.

<br/>

## Impara prima lo stack

La sorpresa più comune per i builder provenienti da altre chain è la curva di apprendimento dell'infrastruttura di Zcash, non la programmazione. Concediti il tempo di capire come i pezzi si incastrano prima di progettare la tua app. Parti dallo stack principale, spesso chiamato Z al cubo: zebrad, un light server e un wallet. Poi familiarizza con gli strumenti per sviluppatori:

1. Leggi la pagina per sviluppatori sul wiki su [zechub.wiki/developers](https://zechub.wiki/developers), è la prima tappa consigliata
2. Esplora zingolib e zingo-cli, le cui chiamate coprono la maggior parte di ciò di cui un progetto ha bisogno nei vari track
3. Dai un'occhiata a librustzcash e al wallet di riferimento ZODL per componenti di livello più basso
4. Per un progetto FROST, usa frostd della Zcash Foundation e frost-core da crates.io, e appoggiati all'AI per aiutarti con le definizioni, anche se usare FROST in modo sicuro richiede comunque impegno e tempo reali

<br/>

## Capire cosa significa mainnet

Diversi track richiedono che la tua app interagisca con la mainnet di Zcash. In pratica questo significa che il tuo progetto, o qualcuno che lo usa, incluso un agente AI, invia o riceve fondi reali su mainnet, oppure costruisce e migliora gli strumenti che rendono ciò possibile. Se la tua app effettua transazioni, devi dimostrarle su mainnet nella tua submission.

Sviluppa su testnet mentre lavori. L'attività su mainnet costa ZEC reali e col tempo diventerà solo più costosa, quindi la testnet è il posto consigliato per iterare. Passa alla mainnet per la prova finale. Tieni presente un dettaglio mentre progetti il flusso: quando i fondi arrivano a un indirizzo shielded, il tuo wallet deve scansionarli e trovarli prima che possano essere spesi, e questa scansione richiede un po' di tempo. Integra questa breve attesa nella tua app invece di presumere che i fondi in arrivo siano subito pronti all'uso.

<br/>

## Mantienilo semplice

Un'idea semplice, ben realizzata, ha battuto molte volte una complessa. I giudici hanno visto un concetto basilare vincere su un progetto tecnicamente più ambizioso nello stesso evento, perché risolveva un problema reale ed era facile da capire. Assumiti meno di quanto pensi di riuscire a finire. Trascurare i dettagli, definire un perimetro troppo ampio e saltare la ricerca sono gli errori che costano ai builder i premi. Rendi il tuo progetto facile da capire e facile da eseguire, dal concetto centrale fino al primo comando.

<br/>

## Vinci i primi 30 secondi

I revisori si fanno rapidamente un'impressione forte, quindi presentazione, argomento e immagini hanno un peso reale, insieme a quanto è innovativa la tua soluzione. La documentazione e una demo chiara non sono ripensamenti. Comunicare la tua idea a volte è più importante dell'idea stessa, perché se nessuno capisce cosa hai costruito, non può avere successo. La valutazione tende a bilanciare profondità tecnica, esperienza utente, originalità e utilità pratica, e una documentazione forte valorizza tutti questi aspetti.

<br/>

## Guarda i track più difficili e meno affollati

Se vuoi una competizione meno affollata, i track più difficili spesso hanno meno partecipanti semplicemente perché meno persone ci provano. Il track Accounting è una buona opzione per i principianti che vogliono evitare il lavoro sulle transazioni on-chain. FROST è potente e poco usato, e costituisce una solida base per un progetto. La community non prescrive cosa costruire, quindi basarsi su uno strumento capace che l'ecosistema già possiede, invece di partire da zero, è una mossa intelligente.

<br/>

## Dopo l'hackathon

Vincere non è la fine del percorso. Vincere arricchisce il tuo portfolio e la tua reputazione, apre porte nella community e può portare a finanziamenti tramite proposte.

1. Porta avanti un progetto forte come proposta al DAO di ZecHub o a Zcash Community Grants, con una roadmap, milestone e una motivazione del budget
2. Resta attivo nella community sul forum, Discord e X
3. Unisciti agli incontri R and D di Arborist, pubblica idee e chiedi feedback
4. Continua a costruire anche se non vinci, e tieni d'occhio il prossimo hackathon

<br/>

## Pagine correlate

- [Risorse per sviluppatori](https://zechub.wiki/developers) - la prima tappa per i builder di Zcash
- [Nodo completo Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - il nodo alla base dello stack
- [FROST](https://zechub.wiki/zcash-tech/frost) - firme a soglia per progetti avanzati

<br/>

<small>Questa guida è stata plasmata dagli spunti dei contributori core di ZecHub squirrel, Dismad e Tron.</small>
