[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocollo Namada

![Namada Logo](/content-images/logo-2067e2533d.webp)


## Cos'è Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Spiegazione di Zcash: alleanza strategica tra Namada e Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Il protocollo Namada è una piattaforma Layer 1 basata sul consenso proof-of-stake, progettata per offrire privacy interchain indipendente dagli asset. Attraverso il protocollo Inter-Blockchain Communication (IBC), Namada si integra perfettamente con chain a finalità rapida, consentendo un'interoperabilità fluida. Inoltre, Namada stabilisce un bridge bidirezionale trustless con Ethereum, facilitando una comunicazione sicura e affidabile tra le due reti.

Namada dà priorità alla privacy implementando una versione migliorata del circuito Multi-Asset Shielded Pool (MASP). Questa versione aggiornata consente a tutti i tipi di asset, inclusi token fungibili e non fungibili, di utilizzare un insieme schermato condiviso proprio come quello di Zcash. Di conseguenza, il trasferimento degli asset supportati su Namada diventa difficilmente identificabile grazie all'elevato livello di privacy coinvolto. Inoltre, l'ultimo aggiornamento del circuito Multi Asset Shielded Pool abilita le ricompense dell'insieme schermato, una funzionalità o un incentivo rivoluzionario che assegna risorse per promuovere la privacy come bene pubblico.

## Bridge Ethereum + compatibile con IBC

L'integrazione del bridge Ethereum in Namada elimina la necessità di un protocollo separato, poiché diventa parte integrante dell'ecosistema di Namada. Ai validatori all'interno di Namada è affidata l'esecuzione del bridge insieme al protocollo centrale di Namada. Questi validatori fungono anche da relayer quando trasferiscono asset verso Namada, rendendo superfluo il coinvolgimento di attori aggiuntivi. D'altra parte, quando gli asset vengono trasferiti verso Ethereum, sono coinvolte parti esterne, note come relayer, sebbene non abbiano alcuna responsabilità nella convalida o nella protezione del bridge.

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

Il protocollo Namada è inoltre in grado di connettersi perfettamente a qualsiasi chain a finalità rapida che supporti il protocollo Inter-Blockchain Communication (IBC). Per quanto riguarda l'interoperabilità con Ethereum, Namada implementa un bridge Ethereum specializzato e sicuro che opera in modo trustless. Questo bridge è progettato attentamente per dare priorità alla sicurezza, imponendo controlli di flusso per tutte le connessioni bridge e trattando qualsiasi trasferimento Ethereum difettoso come una grave infrazione che può comportare penalità di slashing.

## Ricompense dell'insieme schermato

Nell'ultimo aggiornamento del protocollo [Namada](https://namada.net/blog/what-is-namada), gli utenti che detengono asset schermati sono incentivati a partecipare attivamente all'insieme schermato condiviso. Ciò è possibile grazie all'integrazione del circuito MASP aggiornato, che ora include l'innovativo Convert Circuit. Sfruttando questa nuova funzionalità, Namada incoraggia gli utenti a contribuire all'insieme schermato condiviso detenendo asset schermati.

In Namada, l'insieme schermato è considerato un bene pubblico non esclusivo e non rivale. Ciò significa che, man mano che più persone utilizzano trasferimenti schermati, il livello delle garanzie di privacy migliora per ciascun partecipante. Il protocollo riconosce l'importanza dell'adozione e della partecipazione collettive per migliorare la privacy di tutti gli utenti. Pertanto, incentivando gli utenti a detenere asset schermati e a contribuire all'insieme schermato condiviso, Namada favorisce un ecosistema della privacy più forte e robusto.

## Transazione di asset schermati

Il MASP ([Multi-Asset Shielded Pool](https://docs.namada.net/users/shielded-accounts)) estende il circuito Sapling di Zcash per supportare trasferimenti schermati di asset nativi e non nativi. Condividere una pool non significa che la privacy sia indipendente dall'uso di un asset. La documentazione di Namada spiega che gli asset dello stesso tipo condividono un insieme di anonimato e che gli schemi pubblici di schermatura e de-schermatura possono comunque rivelare l'origine di un asset.

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

Ad esempio, se un solo account scherma BTC e in seguito li preleva verso lo stesso account, quei punti di ingresso e di uscita pubblici possono essere collegati anche se i fondi si sono spostati privatamente all'interno della MASP. Quando sono più account a schermare BTC, un prelievo successivo potrebbe invece appartenere a uno qualsiasi di quegli account. Contano la partecipazione e lo schema delle transazioni; la dimensione della pool condivisa da sola non garantisce la stessa privacy per ogni asset.

## Meno commissioni e transazioni rapide

Namada combina due elementi chiave per offrire velocità e finalità delle transazioni: la generazione rapida delle prove e il moderno consenso Byzantine Fault Tolerant (BFT). Queste due funzionalità consentono a Namada di raggiungere una velocità di elaborazione delle transazioni paragonabile a Visa, una nota rete di pagamento riconosciuta per le sue elevate capacità di throughput. La generazione rapida delle prove si riferisce alla produzione efficiente di prove crittografiche che convalidano la correttezza e l'integrità delle transazioni sulla blockchain. Utilizzando tecniche e ottimizzazioni avanzate, il protocollo Namada riduce al minimo il sovraccarico computazionale necessario per generare queste prove, ottenendo una verifica e una conferma rapide delle transazioni.

Inoltre, Namada utilizza moderni algoritmi di consenso BFT, che garantiscono l'integrità e l'accordo sulle transazioni nell'intera rete. Questi meccanismi di consenso consentono a Namada di raggiungere il consenso sull'ordine e sulla validità delle transazioni, fornendo una solida garanzia di finalità. Con la finalità, le transazioni sono considerate irreversibili, riducendo il rischio di doppia spesa o annullamento delle transazioni. Namada segue un approccio simile ad Anoma, un altro protocollo noto per le sue soluzioni di scalabilità. Namada adotta istanze frattali, che consentono la creazione di chain annidate all'interno della blockchain principale. Questa struttura frattale consente la scalabilità orizzontale distribuendo il carico tra più istanze, migliorando la capacità e le prestazioni complessive della rete.

## Alleanza strategica tra Namada e Zcash

Secondo una recente pubblicazione disponibile sul [blog del protocollo Namada](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash), il team dietro il protocollo Namada è lieto di presentare una proposta e una richiesta di commenti (RFC) per un'alleanza strategica tra gli asset, le chain e le community di Namada e Zcash.

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

L'alleanza proposta comprende tre elementi principali. Innanzitutto, verrà creata una pool di finanziamenti per finanziare progetti che portino vantaggi sia a Zcash sia a Namada. In secondo luogo, un airdrop di token NAM verrà assegnato ai detentori di ZEC. Infine, è previsto un piano per stabilire un bridge con fiducia ridotta che colleghi Zcash e Namada. Una volta implementato, questo bridge consentirà ai detentori di ZEC, chiamati Zolders, di utilizzare i propri ZEC su Namada. Inoltre, gli Zolders avranno l'opportunità di accedere agli ecosistemi più ampi di Cosmos ed Ethereum attraverso Namada. Puoi scoprire di più sull'alleanza strategica nel [forum della community di Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Link di riferimento

- [Video ufficiale del protocollo Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Sito web ufficiale del protocollo Namada](https://namada.net/)
- [Blog di Namada](https://namada.net/blog)
- [Documentazione di Namada](https://docs.namada.net/)
