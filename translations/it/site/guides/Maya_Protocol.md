<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Exchange decentralizzato Maya

> Maya Protocol è un DEX cross-chain per scambi nativi (per esempio da ETH o BTC a ZEC) senza token wrapped, account o KYC.

## In breve

* Maya scambia monete native tra blockchain: invii un asset e ne ricevi un altro sulla sua chain. Nessun token wrapped, nessun account, nessun KYC.
* È un fork di THORChain, realizzato con l'SDK Cosmos e protetto da operatori dei nodi che vincolano capitale (Proof of Bond).
* Il suo token nativo è $CACAO. Chi fornisce liquidità guadagna commissioni sugli scambi e beneficia della protezione contro la perdita impermanente (ILP) dopo 50 giorni.
* Maya è un backend: lo usi tramite un frontend o un portafoglio come THORWallet, CacaoSwap, Asgardex, Ctrl Wallet o KeepKey.
* Il video tutorial mostra uno scambio da ETH a ZEC su LeoDex, uno di questi frontend.
* Maya supporta depositi di ZEC schermati/unificati tramite SwapKit (output di valore trasparente più un memo schermato), così alcuni frontend possono inviare ZEC direttamente a un indirizzo unificato. Se il tuo frontend invia i fondi a un indirizzo trasparente (t1), schermali nel tuo portafoglio in seguito per tutelare la privacy.
* Maya non è l'unica opzione per gli scambi nativi di ZEC: anche THORChain ha una pool nativa di ZEC.

## Spiegazione principale

Un exchange centralizzato detiene le tue monete e ha bisogno della tua identità. Maya usa invece una rete di nodi che controllano i vault su ogni chain supportata. Invii monete a un vault Maya, almeno due terzi dei nodi confermano il deposito e l'asset corrispondente viene inviato da un altro vault al tuo indirizzo sulla chain di destinazione.

Gli operatori dei nodi mettono a vincolo una somma che può essere confiscata se si comportano male, dando loro un incentivo finanziario a restare onesti. Maya aggiunge funzionalità a THORChain, come i nodi di liquidità e un proprio design delle riserve, e funziona anche come seconda rete indipendente al suo fianco.

Le sezioni seguenti spiegano come funziona Maya, la prova di vincolo, in cosa si differenzia da THORChain e quali portafogli lo supportano.

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Cos'è Maya Protocol?

Maya è un sistema di [exchange decentralizzato](https://nym.com/blog/what-is-dex) (DEX) che abilita lo scambio di criptovalute tra diverse blockchain. Puoi, ad esempio, scambiare Bitcoin (BTC) sulla blockchain Bitcoin con Ethereum (ETH) sulla blockchain Ethereum in modo semplice, senza detenere gli asset né coinvolgere alcuna autorità centralizzata o procedure Know Your Customer (KYC).

Maya Protocol è stato sviluppato usando il Cosmos Software Development Kit (Cosmos SDK) e opera su un meccanismo di consenso Proof of Bond (PoB). Il protocollo è sostenuto dai "Node Operator", che mettono in staking del capitale nel sistema e guadagnano rendimenti come ricompensa per il loro contributo e i loro sforzi. In sostanza, i nodi sono computer che eseguono software che valida gli swap degli utenti e supervisiona gli asset in indirizzi designati su diverse blockchain.

Per completare uno swap, la criptovaluta supportata deve essere ricevuta in uno degli indirizzi di Maya, inviata da un utente, e poi un importo equivalente viene inviato da un altro degli indirizzi di Maya su una blockchain diversa. Questo processo è gestito e approvato da almeno due terzi dei nodi, assicurandosi in particolare che i fondi siano stati correttamente ricevuti.

In questo modo, gli utenti possono inviare un tipo di token su una blockchain e riceverne uno diverso su un'altra blockchain, il tutto in modo nativo e senza usare token wrapped.

## Cos'è Proof of Bond?

La Proof of Bond (PoB) è un meccanismo di consenso in cui gli operatori dei nodi devono impegnare un vincolo (di solito sotto forma del token nativo della rete) per partecipare alla rete. Questo vincolo funge da forma di sicurezza economica, assicurando che i nodi agiscano onestamente e mantengano l'integrità della rete. Se un nodo tenta di agire in modo malevolo o non adempie ai propri compiti, il suo vincolo può essere ridotto, ossia una parte viene sottratta come penalità.

In Maya Protocol, questo meccanismo aiuta a produrre valore economico dalle risorse messe in staking dagli operatori di nodo, aumentando l'efficienza del capitale. Allo stesso modo, in THORChain, gli operatori di nodo vincolano (bond) RUNE (il token nativo) per mettere in sicurezza la rete e garantire la cooperazione tra i partecipanti.

## Differenze tra Maya e THORChain

Maya è un fork di THORChain, ma arricchito con alcune nuove caratteristiche e funzionalità che ne fanno un'ottima alternativa. Le più importanti sono

### Liquidity Node

Anziché seguire il modello Pure Bond, Maya sta valutando un passaggio a un modello a Liquidity Node. In questo sistema, i nodi sono abilitati a contribuire direttamente liquidità, vincolandola alla rete. Questo approccio comporta che gli operatori di nodo affrontino un rischio significativo: se usano impropriamente i fondi, subiscono perdite, fungendo da potente deterrente. Di conseguenza, gli operatori di nodo usano le Liquidity Unit delle Liquidity Pool, che forniscono simultaneamente liquidità e rafforzano la sicurezza della rete.

### Protezione dall'Impermanent Loss

Un sistema che protegge i fornitori di liquidità (LP) dalla perdita temporanea che possono subire fornendo liquidità, a causa delle continue oscillazioni dei prezzi degli asset crypto.
ILP detiene il 10% dell'offerta di $CACAO (10 milioni di $CACAO) e viene continuamente rifornito con il 10% delle commissioni del protocollo. ILP si attiva 50 giorni dopo un deposito di liquidità, con una copertura massima del 100%.

La durata della copertura ILP dipende dalla performance dell'ASSET e di $CACAO. La copertura completa si raggiunge dopo 150 giorni se l'ASSET ha una performance migliore, e dopo 450 giorni se $CACAO ha una performance migliore. L'ILP viene sia pagata che azzerata in caso di prelievo completo, ma non è influenzata dai prelievi parziali. In caso di ricariche (top-up), l'ILP viene azzerata ma non pagata.

### Un modello di allocazione diverso

La Liquidity Auction è stato un evento di 21 giorni progettato per distribuire i token $CACAO tra i partecipanti. Durante l'evento, gli utenti depositavano asset supportati a un indirizzo specifico. Alla conclusione dell'asta, il 90% dei token $CACAO è stato allocato ai partecipanti in proporzione ai loro contributi di liquidità, mentre il restante 10% è stato allocato alla riserva ILP. I partecipanti sono diventati fornitori di liquidità, con i loro asset depositati e i token $CACAO inseriti nelle pool di Maya, consentendo loro di guadagnare una quota delle commissioni generate.

### Un modo diverso di gestire le riserve

Alla genesi di Maya Protocol, le riserve di CACAO disponibili erano solo il 10% della fornitura totale, rispetto al 44% di THORChain, ed erano principalmente destinate alla protezione dall'Impermanent Loss (ILP). Maya non ha emissioni di blocco; e se verranno implementate la Protocol Owned Liquidity e il Lending, avranno un design diverso, poiché in THORChain questi aspetti sono strettamente integrati con le Riserve.

Ciononostante, nonostante le sue differenze, Maya funge anche da soluzione complementare a THORChain, offrendo ridondanza, estensione e validazione, e integrando nuove reti non presenti nell'attuale implementazione di THORChain.

Inoltre, l'obiettivo di Maya è diventare un *backend* su cui altri servizi possano basarsi, nella speranza di vedere molti nuovi *frontend* o servizi DEX basati sull'infrastruttura di Maya.

## Integrazione del portafoglio Maya Protocol

In qualità di *backend*, Maya deve essere supportata da diverse UI e portafogli per poter essere usata. 
Ecco un elenco con alcuni dei servizi che già supportano Maya:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: non è più online, il suo dominio non si risolve.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: non è più online, il suo dominio non viene risolto.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): un portafoglio in autocustodia multi-ecosistema con supporto per oltre 30 blockchain native e tutte le chain EVM e Cosmos, tra cui Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON e altre.

[KeepKey ](https://keepkey.com/): un portafoglio hardware per conservare in modo sicuro gli asset digitali.
