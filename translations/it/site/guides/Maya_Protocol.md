# Maya Decentralised Exchange

---

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

Proof of Bond (PoB) è un meccanismo di consenso in cui gli operatori di nodo devono impegnare un bond (di solito sotto forma del token nativo della rete) per partecipare alla rete. Questo bond agisce come una forma di sicurezza economica, garantendo che i nodi agiscano onestamente e mantengano l'integrità della rete. Se un nodo cerca di agire in modo malevolo o non riesce a svolgere i propri compiti, il suo bond può essere tagliato (slashed), il che significa che una porzione di esso viene sottratta come penalità.

In Maya Protocol, questo meccanismo aiuta a produrre valore economico dalle risorse messe in staking dagli operatori di nodo, aumentando l'efficienza del capitale. Allo stesso modo, in Thorchain, gli operatori di nodo vincolano (bond) RUNE (il token nativo) per mettere in sicurezza la rete e garantire la cooperazione tra i partecipanti.

## Differenze tra Maya e THORChain

Maya è un fork di THORChain, ma arricchito con alcune nuove caratteristiche e funzionalità che ne fanno un'ottima alternativa. Le più importanti sono

### Liquidity Node

Anziché seguire il modello Pure Bond, Maya sta valutando un passaggio a un modello a Liquidity Node. In questo sistema, i nodi sono abilitati a contribuire direttamente liquidità, vincolandola alla rete. Questo approccio comporta che gli operatori di nodo affrontino un rischio significativo: se usano impropriamente i fondi, subiscono perdite, fungendo da potente deterrente. Di conseguenza, gli operatori di nodo usano le Liquidity Unit delle Liquidity Pool, che forniscono simultaneamente liquidità e rafforzano la sicurezza della rete.

### Protezione dall'Impermanent Loss

Un sistema che protegge i fornitori di liquidità dalla perdita temporanea (LP) che possono subire quando forniscono liquidità, a causa delle costanti fluttuazioni nei prezzi degli asset crypto.
L'ILP detiene il 10% della fornitura di $CACAO (10 milioni di $CACAO) ed è continuamente reintegrata dal 10% delle commissioni del protocollo. L'ILP diventa attiva 50 giorni dopo un deposito di liquidità, con una copertura limitata al 100%.

La durata della copertura ILP dipende dalla performance dell'ASSET e di $CACAO. La copertura completa si raggiunge dopo 150 giorni se l'ASSET ha una performance migliore, e dopo 450 giorni se $CACAO ha una performance migliore. L'ILP viene sia pagata che azzerata in caso di prelievo completo, ma non è influenzata dai prelievi parziali. In caso di ricariche (top-up), l'ILP viene azzerata ma non pagata.

### Un modello di allocazione diverso

La Liquidity Auction è stato un evento di 21 giorni progettato per distribuire i token $CACAO tra i partecipanti. Durante l'evento, gli utenti depositavano asset supportati a un indirizzo specifico. Alla conclusione dell'asta, il 90% dei token $CACAO è stato allocato ai partecipanti in proporzione ai loro contributi di liquidità, mentre il restante 10% è stato allocato alla riserva ILP. I partecipanti sono diventati fornitori di liquidità, con i loro asset depositati e i token $CACAO inseriti nelle pool di Maya, consentendo loro di guadagnare una quota delle commissioni generate.

### Un modo diverso di gestire le riserve

Alla genesi di Maya Protocol, le riserve di CACAO disponibili erano solo il 10% della fornitura totale, rispetto al 44% di THORChain, ed erano principalmente destinate alla protezione dall'Impermanent Loss (ILP). Maya non ha emissioni di blocco; e se verranno implementate la Protocol Owned Liquidity e il Lending, avranno un design diverso, poiché in THORChain questi aspetti sono strettamente integrati con le Riserve.

Ciononostante, nonostante le sue differenze, Maya funge anche da soluzione complementare a THORChain, offrendo ridondanza, estensione e validazione, e integrando nuove reti non presenti nell'attuale implementazione di THORChain.

Inoltre, l'obiettivo di Maya è diventare un *backend* su cui altri servizi possano costruire, nella speranza di vedere numerosi nuovi *frontend*, ossia servizi DEX costruiti sull'infrastruttura di Maya.

## Integrazione dei wallet con Maya Protocol

Agendo come *backend*, Maya ha bisogno di essere supportata da diverse UI e wallet per essere usata. 
Ecco un elenco con alcuni dei servizi che già supportano Maya:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet e Rabby.

[XDEFI](https://www.xdefi.io/): un wallet self-custody multi-ecosistema con supporto per oltre 30 blockchain native e tutte le chain EVM e Cosmos, tra cui Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON e altre.

[KeepKey ](https://keepkey.com/): un hardware wallet per conservare in modo sicuro gli asset digitali.
