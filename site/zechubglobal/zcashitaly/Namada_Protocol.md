![namBanner](/content-images/5afbd9cf-c352-4f91-8dbc-57f27d2a0047-a78f5a91ef.webp)


Non c'è assolutamente alcun dubbio che la decentralizzazione e la privacy basata su Blockchain siano uno dei sistemi più adottati dalla maggior parte dei progetti Web3 nel mondo delle criptovalute e della tecnologia Blockchain. Nella guida di oggi, parleremo di un protocollo di privacy interchain (o inter-catena) noto come Protocollo Namada, che si preoccupa anche della privacy dell'utente utilizzando il suo Proof-of-Stake di Livello-1 per una privacy agnostica tra asset interchain.

## Che cos'è Namada?
Il Protocollo Namada è una piattaforma di livello 1 (L1) basata sul consenso proof-of-stake, progettata per fornire una privacy agnostica tra asset interchain. Tramite il protocollo Inter-Blockchain Communication (IBC), Namada si integra perfettamente con le catene a rapida finalizzazione, consentendo un'interoperabilità senza problemi. Inoltre, Namada stabilisce un ponte bidirezionale senza fiducia con Ethereum, facilitando una comunicazione sicura e affidabile tra le due reti.

![interchainPriv](/content-images/75ee9db1-976c-4232-8746-103081a9192a-c88a0b6e52.webp)

Namada dà priorità alla privacy implementando una versione avanzata del circuito Multi-Asset Shielded Pool (MASP). Questa versione migliorata consente a tutti i tipi di asset, inclusi token fungibili e non fungibili, di utilizzare un insieme condiviso di set schermati esattamente come avviene su Zcash. Di conseguenza, l'atto di trasferire asset supportati su Namada diventa distintivo poiché diventa difficile da identificare grazie all'alto livello di privacy. Inoltre, l'ultima versione del circuito Multi Asset Shielded Pool consente di ottenere ricompense in set schermati, una funzionalità rivoluzionaria ed un incentivo che assegna risorse per promuovere la privacy come bene pubblico.

## Ethereum Bridge + Compatibilità IBC 
L'integrazione del Ethereum Bridge in Namada elimina la necessità di un protocollo separato, poiché diventa parte integrante dell'ecosistema di Namada. I validatori all'interno di Namada sono incaricati di gestire il bridge insieme al protocollo principale di Namada. Questi validatori fungono anche da intermediari (relayers) quando si tratta di trasferire asset a Namada, rendendo superflua la partecipazione di attori aggiuntivi. Quando invece si tratta di trasferire asset a Ethereum, sono coinvolti soggetti esterni (nooti come relayers), anche se non hanno alcuna responsabilità nella convalida o sicurezza del bridge.

![ethBridge](/content-images/f85cc11b-13bc-4550-bb92-0fa91b17359d-a282297253.webp)


Il Protocollo Namada ha anche la capacità di connettersi senza problemi con qualsiasi catena fast-finality che supporti il protocollo Inter-Blockchain Communication (IBC). Per quanto riguarda l'interoperabilità con Ethereum, Namada implementa un Ethereum bridge specializzato e sicuro che opera in modo privo di fiducia. Questo bridge è stato accuratamente progettato per dare priorità alla sicurezza, applicando il controllo dei flussi per tutte le connessioni del bridge e trattando qualsiasi trasferimento difettoso di Ethereum come un'infrazione grave che può comportare penalità.

## Privacy della Blockchain
Nell'ultima versione del [Protocollo Namada](https://blog.namada.net/what-is-namada/), gli utenti che possiedono asset schermati sono incentivati a partecipare attivamente all'insieme schermato condiviso. Questo è reso possibile grazie all'integrazione del circuito MASP aggiornato, che ora include l'innovativo Convert Circuit. Sfruttando questa nuova funzionalità, Namada incoraggia gli utenti a contribuire all'insieme condiviso schermato detenendo asset schermati.

![blockchainpriv](/content-images/951ac7cb-6cc6-4589-b10a-dd8f612b0512-21429202d4.webp)


In Namada, l'insieme schermato è considerato un bene pubblico non esclusivo e anti-rivalità. Ciò significa che, man mano che più individui utilizzano i trasferimenti schermati, il livello di garanzia della privacy migliora per ogni partecipante. Il protocollo riconosce l'importanza dell'adozione e della partecipazione collettiva per migliorare la privacy di tutti gli utenti. Pertanto, incentivando gli utenti a detenere asset schermati e a contribuire all'insieme condiviso di asset schermati, favorendo così un ecosistema di privacy più solido e robusto.

## Transazioni di asset schermati
Quando si tratta di trasferimenti schermati, che riguardano dei token non fungibili (NFT) di Ethereum, ATOM o NAM, essi sono indistinguibili l'uno dall'altro. Ciò significa che le caratteristiche di preservazione della privacy fornite dal MASP (Modified Accumulator Sapling Protocol), una versione migliorata del circuito Sapling di Zcash, si applicano uniformemente a tutti i tipi di asset. Il circuito MASP consente a tutti gli asset dell'ecosistema Namada di condividere lo stesso set schermato. Questo approccio assicura che le garanzie di privacy non siano frammentate tra i singoli asset. Indipendentemente dal volume delle transazioni associate a un particolare asset, la protezione della privacy rimane coerente e indipendente.

![shieldedAssets](/content-images/0dc64bd2-ecf1-4822-a040-61e0eff8d0e7-319fe667cc.webp)


Unificando l'insieme degli asset schermati tra i diversi asset, Namada assicura che la privacy sia garantita in modo uniforme, indipendentemente dal tipo di asset specifico coinvolto in un trasferimento schermato. Questo approccio promuove un quadro di privacy coeso all'interno del protocollo e migliora la riservatezza delle transazioni che coinvolgono Ethereum NFTs, ATOM, NAM e altri asset supportati. Namada consente inoltre il trasferimento privato di token fungibili e non fungibili utilizzando i nuovi zk-SNARK, garantendo la riservatezza per i token nativi e non nativi proprio come avviene su Zcash.

## Commissioni Ridotte e Transazioni Veloci
Namada combina due elementi chiave per garantire la velocità e la finalizzazione delle transazioni: la generazione rapida a prova di errore e il moderno consenso Byzantine Fault Tolerant (BFT). Queste due caratteristiche consentono a Namada di raggiungere una velocità di elaborazione delle transazioni paragonabile a quella di Visa, una nota rete di pagamento riconosciuta per le sue elevate capacità di throughput. 
La generazione rapida di prove si riferisce all'efficiente generazione di prove crittografiche che convalidano la correttezza e l'integrità delle transazioni sulla Blockchain. Utilizzando tecniche avanzate e ottimizzazioni, il Protocollo Namada riduce al minimo l'onere computazionale necessario per generare queste prove, risultando in una verifica rapida e una conferma delle transazioni.

![lesserFee](/content-images/5a9d9076-f12d-4965-a570-0b0c9b8a1f47-8846e0f093.webp)

Inoltre, Namada utilizza i moderni algoritmi di consenso BFT, che garantiscono l'integrità e l'accordo delle transazioni in tutta la rete. Questi meccanismi di consenso consentono a Namada di raggiungere un consenso sull'ordine e la validità delle transazioni, fornendo una forte garanzia di finalità. Con la finalità, le transazioni sono considerate irreversibili, riducendo il rischio di double-spending o annullamento delle transazioni. Namada segue un approccio simile ad Anoma, un altro protocollo noto per le sue soluzioni di scalabilità. Namada adotta istanze frattali, che consentono la creazione di catene nidificate all'interno della blockchain principale. Questa struttura frattale consente la scalabilità orizzontale distribuendo il carico su molteplici istanze, migliorando la capacità complessiva e le prestazioni della rete.

## Alleanza strategica tra Namada e Zcash

Secondo una recente pubblicazione che si può trovare sul [Namada Protocol Blog](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/), il team dietro al protocollo Namada è entusiasta di presentare una proposta e una richiesta di commento (RFC) per un'alleanza strategica tra gli asset, le catene e le comunità Namada e Zcash.

![namANDzcash](/content-images/b365bfd1-0c97-4fe1-8a17-eeeeb16599d9-dd4f4bf224.webp)


L'alleanza proposta comprende tre elementi principali. In primo luogo, viene creato un fondo di sovvenzioni per finanziare i progetti che portano vantaggi sia a Zcash che a Namada. In secondo luogo, un airdrop di token NAM sarà assegnato ai titolari di ZEC. Infine, è in atto un piano per la creazione di un ponte di collegamento tra Zcash e Namada, minimizzato dal punto di vista della fiducia. Una volta implementato, questo ponte consentirà ai titolari di ZEC, denominati Zolders, di utilizzare i loro ZEC su Namada. Inoltre, gli Zolders avranno l'opportunità di accedere ai più ampi ecosistemi Cosmos ed Ethereum attraverso Namada. Per saperne di più sull'alleanza strategica è possibile consultare il [Forum della comunità ZCash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372) 


## Link di riferimento 
È possibile saperne di più sul protocollo Namada tramite i seguenti link 👇👇

https://www.youtube.com/watch?v=Wg_WtPdBig0

[Sito web ufficiale del Protocollo Namada](https://namada.net/) 

[Blog di Namada](https://blog.namada.net/) 

[Documenti di Namada](https://docs.namada.net/)