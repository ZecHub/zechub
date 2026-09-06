<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Risorse per sviluppatori

Le risorse necessarie per sviluppare su Zcash, raggruppate in base alla funzione di ciascuna anziché elencate tutte insieme.

Lo stack è cambiato molto nel 2026. zcashd, che ha gestito la rete per gran parte della sua storia, ha raggiunto la fine del suo ciclo di vita il 18 luglio 2026 all'altezza del blocco 3417100, e ogni nodo non modificato si è arrestato a tale altezza e rifiuterà di riavviarsi. Le guide scritte per zcashd sono ormai parte della storia anziché un punto di partenza, quindi questa pagina è organizzata attorno a ciò che lo ha sostituito.

## Lo stack in sintesi

| Livello | Cosa usare | Inizia da |
|:--|:--|:--|
| Nodo completo | Zebra o Zakura | [Il libro di Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet per nodo completo | Zallet, in beta | [Il libro di Zallet](https://zcash.github.io/zallet/) |
| Server per wallet leggero | Zaino o lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Librerie per wallet | I crate librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDK Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Specifica | Specifica del protocollo e ZIP | [zips.z.cash](https://zips.z.cash) |

## Nodi

Un nodo convalida il consenso e conserva la catena. Esistono due implementazioni sviluppate attivamente.

[Zebra](/zcash-tech/zebra-full-node) è il nodo della Zcash Foundation, scritto in Rust, ed è quello presupposto dalla maggior parte delle guide attuali. [Il libro di Zebra](https://zebra.zfnd.org/) spiega come installarlo ed eseguirlo, mentre lo [repository](https://github.com/ZcashFoundation/zebra) è dove avviene lo sviluppo.

[Zakura](/zcash-tech/zakura-node) è un nodo più recente, descritto dai suoi autori come un "nodo completo Zcash compatibile con il consenso, costruito per scalare", con sincronizzazione più veloce, potatura dei blocchi e una modalità di compatibilità con zcashd. È guidato da Sean Bowe, cofondatore di Zcash, e Dev Ojha. È open source con licenza Apache 2.0 su [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub dispone di una pagina sui [nodi completi](/zcash-tech/full-nodes) che tratta i compromessi tra di essi.

## Il wallet per nodo completo

zcashd includeva un wallet insieme al nodo. Quel wallet non esiste più e [Zallet](https://github.com/zcash/zallet) è il suo sostituto. Il libro di Zallet lo descrive come "un wallet Zcash per nodo completo scritto in Rust", in fase di realizzazione "come sostituto del wallet zcashd".

Leggi l'avvertenza sulla sicurezza prima di farvi affidamento. Zallet è in beta, "non è stato completamente revisionato", potrebbero verificarsi modifiche incompatibili "in qualsiasi momento, richiedendo l'eliminazione e la ricreazione del tuo wallet Zallet", e non tutti i metodi RPC di zcashd sono stati ancora portati.

Se stai trasferendo una configurazione esistente, ZecHub offre una [guida alla migrazione da zcashd a Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e un [riferimento rapido di Zallet](/using-zcash/zallet-quick-reference-guide).

## Server per wallet leggeri

La maggior parte dei wallet non esegue un nodo. Comunica con un server che conserva la catena e ne restituisce una visualizzazione compatta.

[lightwalletd](https://github.com/zcash/lightwalletd) è il servizio originale, scritto in Go, descritto come "un servizio backend che fornisce un'interfaccia efficiente in termini di larghezza di banda alla blockchain Zcash". [Zaino](/zcash-tech/zaino) è l'indicizzatore più recente, scritto in Rust, e legge da un validatore completo invece di conservare la propria copia della catena.

La documentazione del [protocollo Light Client](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) tratta il protocollo stesso. La pagina sui [nodi Lightwallet](/zcash-tech/lightwallet-nodes) illustra ciò che questi server possono e non possono vedere di un utente, un aspetto importante da comprendere prima di sceglierne uno.

## Creare un wallet

La maggior parte del lavoro sui wallet avviene nei crate Rust sotto [librustzcash](https://github.com/zcash/librustzcash), su cui si basano gli SDK mobili e diversi wallet desktop. Ogni crate è documentato su [docs.rs](https://docs.rs).

| Crate | A cosa serve |
|:--|:--|
| zcash_client_backend | "API per creare client leggeri Zcash schermati", inclusa la sincronizzazione e la costruzione delle transazioni |
| zcash_client_sqlite | "Un client leggero Zcash basato su SQLite", il livello di archiviazione per quanto sopra |
| zcash_keys | "Gestione di chiavi e indirizzi Zcash" |
| zcash_primitives | "Implementazioni Rust delle primitive Zcash" |
| zcash_protocol | "Costanti di rete e tipi di valore del protocollo Zcash" |
| orchard | "Il protocollo di transazione schermata Orchard" |
| sapling-crypto | "Libreria crittografica per Zcash Sapling" |
| pczt | "Strumenti per lavorare con transazioni Zcash create parzialmente", utilizzati per la firma hardware e su più dispositivi |
| zip321 | URI di richieste di pagamento, come specificato in ZIP 321 |

Per il mobile, l'[SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) e l'[SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) racchiudono queste librerie. Il repository iOS in precedenza si chiamava ZcashLightClientKit, quindi i link e gli articoli più vecchi usano quel nome.

## Specifica e crittografia

La [specifica del protocollo](https://zips.z.cash/protocol/protocol.pdf) è l'autorità sul funzionamento di Zcash, comprese le [codifiche di indirizzi e chiavi](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Gli [ZIP](https://zips.z.cash) sono il luogo in cui vengono proposte e specificate le modifiche, e l'indice mostra quali sono bozze e quali definitivi. Le modifiche al consenso vengono distribuite negli aggiornamenti di rete, che ZecHub monitora nella pagina [Aggiornamenti di rete](/start-here/network-upgrades).

Per la crittografia sottostante, leggi [Il libro di halo2](https://zcash.github.io/halo2/index.html) e [Il libro di Orchard](https://zcash.github.io/orchard/), insieme alla documentazione dei crate [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [Il libro di FROST](https://frost.zfnd.org/) tratta le firme a soglia, e ZecHub dispone di una pagina su [FROST](/zcash-tech/frost).

## Testnet

La testnet è una catena separata con monete prive di valore, chiamate TAZ. Sia Zebra sia Zakura possono eseguirla, e la [guida alla testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) tratta la configurazione del nodo.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) è un block explorer testnet funzionante, con una controparte mainnet su [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Ottenere TAZ è la parte scomoda. I faucet pubblici compaiono e scompaiono, e quelli collegati dalla documentazione meno recente non rispondevano quando questa pagina è stata scritta. La via affidabile è chiedere nel Discord R&D di Zcash, come suggerisce la stessa documentazione di Zcash.

## Documentazione generale

La [documentazione Zcash](https://zcash.readthedocs.io/en/latest/) resta la più ampia fonte singola, trattando concetti del protocollo, integrazione e mining. Consultala con una certa attenzione. È versionata rispetto a zcashd, quindi alcune parti descrivono un nodo che non viene più eseguito, mentre le sezioni sul protocollo e sui client leggeri restano utili. Vale la pena leggere [Il modello di minaccia dell'app wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) disponibile lì prima di progettare qualunque cosa che riguardi la privacy degli utenti.

Se sei nuovo alle blockchain in generale, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) è la raccomandazione abituale per i fondamenti condivisi, ed è disponibile gratuitamente per la lettura integrale. Non tratta le transazioni schermate.

## Altri strumenti menzionati dagli sviluppatori

[Arti](https://docs.rs/arti/latest/arti/) è l'implementazione Rust di Tor, utilizzata da zcash_client_backend per instradare il traffico dei wallet. [Tailscale](https://github.com/tailscale/tailscale) viene menzionato per collegarsi a un nodo che esegui personalmente. [warp2](https://github.com/hhanh00/warp2) è un'implementazione di sincronizzazione rapida di Hanh, anche se non viene aggiornata dal 2023.

## Comunità ed eventi

Il [Discord R&D di Zcash](https://discord.gg/6AK7keWFaK) è il luogo in cui si discute dello sviluppo del protocollo e dei wallet, mentre il [Forum della comunità Zcash](https://forum.zcashcommunity.com/) ospita proposte più lunghe e discussioni di supporto.

I risultati dei recenti hackathon offrono una buona immagine di ciò che le persone stanno costruendo: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e l'[hackathon Zypherpunk 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Risorse ritirate

Conservate perché gli articoli meno recenti vi rimandano e perché sono ancora il riferimento per il comportamento del nodo ritirato. Non iniziare da qui.

[Il libro di Zcashd](https://zcash.github.io/zcash/) e il [riferimento RPC di zcashd](https://zcash.github.io/rpc/) documentano software che ha raggiunto la [fine del ciclo di vita](https://zcash.github.io/zcash/user/end-of-life.html) nel luglio 2026. Il repository [zcash/zcash](https://github.com/zcash/zcash) è archiviato.

Se hai una risorsa da aggiungere o noti qualcosa qui che non è più aggiornato, apri una issue o una pull request. I team non hanno sempre la capacità di mantenere tutto aggiornato, e segnalare ciò che hai incontrato aiuta a orientare le guide.

**Ultimo aggiornamento:** agosto 2026
