[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada Logo](https://i.ibb.co/BZcZHS1/logo.png)


## Cos'è Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explained: Namada-Zcash Strategic Alliance"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocol funge da piattaforma Layer 1 basata sul consenso proof-of-stake, progettata per fornire una privacy interchain agnostica rispetto agli asset. Attraverso il protocollo Inter-Blockchain Communication (IBC), Namada si integra perfettamente con chain a finalità rapida, abilitando una fluida interoperabilità. Inoltre, Namada stabilisce un bridge bidirezionale trustless con Ethereum, facilitando una comunicazione sicura e affidabile tra le due reti.

Namada dà priorità alla privacy implementando un'iterazione potenziata del circuito Multi-Asset Shielded Pool (MASP). Questa versione aggiornata consente a tutti i tipi di asset, inclusi token sia fungibili sia non fungibili, di utilizzare uno shielded set condiviso esattamente come quello di Zcash. Di conseguenza, l'atto di trasferire asset supportati su Namada diventa indistinguibile, poiché diventa difficile da identificare a causa dell'elevato livello di privacy coinvolto. Inoltre, l'ultimo aggiornamento del circuito Multi Asset Shielded Pool abilita le shielded set reward, una funzionalità o incentivo rivoluzionario che alloca risorse per promuovere la privacy come bene pubblico.

## Compatibile con Ethereum Bridge + IBC

L'integrazione dell'Ethereum bridge in Namada elimina la necessità di un protocollo separato, in quanto diventa parte integrante dell'ecosistema Namada. I validatori all'interno di Namada hanno il compito di gestire il bridge insieme al protocollo core di Namada. Questi validatori fungono anche da relayer quando si tratta di trasferire asset verso Namada, rendendo non necessario il coinvolgimento di attori aggiuntivi. D'altra parte, quando si trasferiscono asset verso Ethereum, sono coinvolte parti esterne (note come relayer), sebbene non abbiano alcuna responsabilità nel validare o mettere in sicurezza il bridge.

![Ethereum Bridge Diagram](https://i.ibb.co/wKds5RP/image.jpg)

Namada Protocol ha anche la capacità di connettersi perfettamente con qualsiasi chain a finalità rapida che supporti il protocollo Inter-Blockchain Communication (IBC). Quando si tratta di interoperare con Ethereum, Namada implementa un Ethereum bridge specializzato e sicuro che opera in modo trustless. Questo bridge è attentamente progettato per dare priorità alla sicurezza imponendo controlli di flusso per tutte le connessioni del bridge e trattando qualsiasi trasferimento Ethereum difettoso come un grave illecito che può comportare penalità di slashing.

## Shielded Set Rewards

Nell'ultimo aggiornamento del [Namada Protocol](https://blog.namada.net/what-is-namada/), gli utenti che detengono asset schermati sono incentivati a partecipare attivamente allo shielded set condiviso. Questo è reso possibile attraverso l'integrazione del circuito MASP aggiornato, che ora include l'innovativo Convert Circuit. Sfruttando questa nuova funzionalità, Namada incoraggia gli utenti a contribuire allo shielded set condiviso detenendo asset schermati.

In Namada, lo shielded set è considerato un bene pubblico non esclusivo e anti-rivale. Questo significa che man mano che più individui utilizzano i trasferimenti schermati, il livello delle garanzie di privacy migliora per ciascun partecipante. Il protocollo riconosce l'importanza dell'adozione e della partecipazione collettiva nel migliorare la privacy per tutti gli utenti. Pertanto, incentivando gli utenti a detenere asset schermati e a contribuire allo shielded set condiviso, Namada favorisce un ecosistema della privacy più forte e robusto.

## Transazione di asset schermati

Quando si tratta di trasferimenti schermati, sia che coinvolgano un non-fungible token (NFT) Ethereum, ATOM o NAM, sono indistinguibili l'uno dall'altro. Questo significa che le caratteristiche di tutela della privacy fornite dal MASP (Modified Accumulator Sapling Protocol), una versione potenziata del circuito Sapling di Zcash, si applicano in modo uniforme a tutti i tipi di asset. Il circuito MASP consente a tutti gli asset all'interno dell'ecosistema Namada di condividere lo stesso shielded set. Questo approccio garantisce che le garanzie di privacy non siano frammentate tra i singoli asset. Indipendentemente dal volume di transazioni associato a un particolare asset, la protezione della privacy rimane coerente e indipendente.

![Shielded Assets Transaction Diagram](https://i.ibb.co/7CDmWk6/image-1.png)

Unificando lo shielded set tra diversi asset, Namada garantisce che la privacy sia mantenuta in modo uniforme, indipendentemente dallo specifico tipo di asset coinvolto in un trasferimento schermato. Questo approccio promuove un framework di privacy coeso all'interno del protocollo e migliora la riservatezza delle transazioni che coinvolgono NFT Ethereum, ATOM, NAM e altri asset supportati. Namada abilita anche il trasferimento privato di token fungibili e non fungibili usando nuovi zk-SNARKs, garantendo la riservatezza per i token nativi e non nativi proprio come avviene su Zcash.

## Commissioni inferiori e transazioni veloci

Namada combina due elementi chiave per offrire velocità e finalità rapida delle transazioni: la generazione rapida delle prove e il moderno consenso Byzantine Fault Tolerant (BFT). Queste due caratteristiche consentono a Namada di raggiungere una velocità di elaborazione delle transazioni paragonabile a Visa, una nota rete di pagamenti riconosciuta per le sue elevate capacità di throughput. La generazione rapida delle prove si riferisce alla produzione efficiente di prove crittografiche che validano la correttezza e l'integrità delle transazioni sulla Blockchain. Impiegando tecniche e ottimizzazioni avanzate, Namada Protocol minimizza l'overhead computazionale necessario per generare queste prove, risultando in una verifica e conferma rapida delle transazioni.

Inoltre, Namada utilizza moderni algoritmi di consenso BFT, che garantiscono l'integrità e l'accordo delle transazioni in tutta la rete. Questi meccanismi di consenso consentono a Namada di raggiungere un consenso sull'ordine e la validità delle transazioni, fornendo una forte garanzia di finalità. Con la finalità, le transazioni sono considerate irreversibili, riducendo il rischio di double-spending o rollback delle transazioni. Namada segue un approccio simile ad Anoma, un altro protocollo noto per le sue soluzioni di scalabilità. Namada adotta istanze frattali, che consentono la creazione di chain annidate all'interno della blockchain principale. Questa struttura frattale abilita lo scaling orizzontale distribuendo il carico su più istanze, migliorando la capacità e le prestazioni complessive della rete.

## Alleanza strategica tra Namada e Zcash

Secondo una recente pubblicazione che può essere trovata sul [Blog di Namada Protocol](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/), il team dietro Namada Protocol è entusiasta di presentare una proposta e una request-for-comment (RFC) per un'alleanza strategica tra gli asset, le chain e le community di Namada e Zcash.

![Namada-Zcash Strategic Alliance Diagram](https://i.ibb.co/FqsmkMb/image-2.png)

L'alleanza proposta comprende tre elementi principali. In primo luogo, verrà creato un pool di grant per fornire finanziamenti a progetti che apportino vantaggi sia a Zcash sia a Namada. In secondo luogo, un airdrop di token NAM sarà allocato ai detentori di ZEC. Infine, è previsto un piano per stabilire un bridge a fiducia minimizzata che colleghi Zcash e Namada. Una volta implementato, questo bridge consentirà ai detentori di ZEC, chiamati Zolder, di utilizzare i loro ZEC su Namada. Inoltre, gli Zolder avranno l'opportunità di accedere ai più ampi ecosistemi Cosmos ed Ethereum attraverso Namada. Puoi saperne di più sull'alleanza strategica sul [Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Link di riferimento

- [Video ufficiale di Namada Protocol](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Sito web ufficiale di Namada Protocol](https://namada.net/)
- [Namada Blog](https://blog.namada.net/)
- [Namada Docs](https://docs.namada.net/)
