<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Risorse per sviluppatori

Le risorse di cui hai bisogno per costruire su Zcash, raggruppate in base a ciò a cui servono invece di essere elencate tutte insieme.

Lo stack è cambiato molto nel 2026. zcashd, che ha gestito la rete per gran parte della sua storia, ha raggiunto la fine del suo ciclo di vita il 18 luglio 2026 all'altezza di blocco 3417100, e ogni nodo non modificato si è spento a quell'altezza e si rifiuterà di riavviarsi. Le guide scritte per zcashd ormai sono storia più che un punto di partenza, quindi questa pagina è organizzata intorno a ciò che lo ha sostituito.

## Lo stack in sintesi

| Livello | Cosa usare | Inizia da |
|:--|:--|:--|
| Nodo completo | Zebra o Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet per nodo completo | Zallet, in beta | [The Zallet Book](https://zcash.github.io/zallet/) |
| Server per wallet light | Zaino o lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Librerie per wallet | I crate di librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDK Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Specifica | Specifica del protocollo e ZIP | [zips.z.cash](https://zips.z.cash) |

## Nodi

Un nodo valida il consenso e conserva la chain. Ci sono due implementazioni sviluppate attivamente.

[Zebra](/zcash-tech/zebra-full-node) è il nodo della Zcash Foundation, scritto in Rust, ed è quello che la maggior parte delle guide ormai presuppone. [The Zebra Book](https://zebra.zfnd.org/) spiega come installarlo ed eseguirlo, e il [repository](https://github.com/ZcashFoundation/zebra) è il luogo in cui avviene lo sviluppo.

[Zakura](/zcash-tech/zakura-node) è un nodo più recente, descritto dai suoi autori come un "consensus-compatible Zcash full node, built for scale", con sincronizzazione più veloce, potatura dei blocchi e una modalità di compatibilità con zcashd. È guidato da Sean Bowe, cofondatore di Zcash, e Dev Ojha. È open source con licenza Apache 2.0 su [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub ha una pagina [Full Nodes](/zcash-tech/full-nodes) che copre i compromessi tra i due.

## Il wallet per nodo completo

zcashd includeva un wallet insieme al nodo. Quel wallet non c'è più, e [Zallet](https://github.com/zcash/zallet) è il suo sostituto. The Zallet Book lo descrive come "a full-node Zcash wallet written in Rust" in fase di costruzione "built as a replacement for the zcashd wallet".

Leggi l'avvertenza di sicurezza prima di farci affidamento. Zallet è in beta, "has not been fully reviewed", cambiamenti incompatibili "may occur at any time, requiring you to delete and recreate your Zallet wallet", e non tutti i metodi RPC di zcashd sono ancora stati portati.

Se stai migrando una configurazione esistente, ZecHub ha una [guida di migrazione da zcashd a Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e un [riferimento rapido a Zallet](/using-zcash/zallet-quick-reference-guide).

## Server per wallet light

La maggior parte dei wallet non esegue un nodo. Si collegano a un server che conserva la chain e ne restituisce una vista compatta.

[lightwalletd](https://github.com/zcash/lightwalletd) è il servizio originale, scritto in Go, descritto come "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain". [Zaino](/zcash-tech/zaino) è l'indicizzatore più recente, scritto in Rust, e legge da un validatore completo invece di mantenere una propria copia della chain.

La documentazione del [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) copre il protocollo stesso. La pagina [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) spiega cosa questi server possono e non possono vedere di un utente, e vale la pena capirlo prima di sceglierne uno.

## Costruire un wallet

La maggior parte del lavoro sui wallet avviene nei crate Rust sotto [librustzcash](https://github.com/zcash/librustzcash), su cui si basano gli SDK mobile e diversi wallet desktop. Ogni crate è documentato su [docs.rs](https://docs.rs).

| Crate | A cosa serve |
|:--|:--|
| zcash_client_backend | "APIs for creating shielded Zcash light clients", inclusi sincronizzazione e costruzione delle transazioni |
| zcash_client_sqlite | "An SQLite-based Zcash light client", il livello di archiviazione per quanto sopra |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", usato per firme hardware e multi-dispositivo |
| zip321 | URI di richiesta di pagamento, come specificato in ZIP 321 |

Per il mobile, l'[SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) e l'[SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) incapsulano queste librerie. In precedenza il repository iOS si chiamava ZcashLightClientKit, quindi i link e gli articoli più vecchi usano quel nome.

## Specifica e crittografia

La [specifica del protocollo](https://zips.z.cash/protocol/protocol.pdf) è l'autorità su come funziona Zcash, comprese le [codifiche di indirizzi e chiavi](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Gli [ZIP](https://zips.z.cash) sono il luogo in cui i cambiamenti vengono proposti e specificati, e l'indice mostra quali sono bozze e quali sono finali. I cambiamenti di consenso vengono distribuiti negli aggiornamenti di rete, e ZecHub li tiene traccia nella pagina [Network Upgrades](/start-here/network-upgrades).

Per la crittografia sottostante, leggi [The halo2 Book](https://zcash.github.io/halo2/index.html) e [The Orchard Book](https://zcash.github.io/orchard/), insieme alla documentazione dei crate [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) copre le firme a soglia, e ZecHub ha una pagina su [FROST](/zcash-tech/frost).

## Testnet

La testnet è una chain separata con coin senza valore, chiamate TAZ. Sia Zebra sia Zakura possono funzionare su di essa, e la [guida alla testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) copre la configurazione del nodo.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) è un block explorer testnet funzionante, con una controparte mainnet su [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Ottenere TAZ è la parte scomoda. I faucet pubblici appaiono e scompaiono, e quelli collegati dalla documentazione più vecchia non rispondevano quando questa pagina è stata scritta. La via affidabile è chiedere nel Discord R&D di Zcash, che è anche ciò che suggerisce la stessa documentazione di Zcash.

## Documentazione generale

La [documentazione di Zcash](https://zcash.readthedocs.io/en/latest/) è ancora la fonte unica più ampia e copre concetti del protocollo, integrazione e mining. Va letta con una certa attenzione. È versionata rispetto a zcashd, quindi alcune parti descrivono un nodo che non è più in esecuzione, mentre le sezioni sul protocollo e sui light client restano utili. Vale la pena leggere [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), che si trova lì, prima di progettare qualunque cosa tocchi la privacy degli utenti.

Se sei nuovo alle blockchain in generale, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) è la raccomandazione abituale per i fondamenti condivisi, ed è leggibile gratuitamente per intero. Non copre le transazioni shielded.

## Altri strumenti menzionati dagli sviluppatori

[Arti](https://docs.rs/arti/latest/arti/) è l'implementazione Rust di Tor, usata da zcash_client_backend per instradare il traffico dei wallet. [Tailscale](https://github.com/tailscale/tailscale) viene citato per connettersi a un nodo che esegui tu stesso. [warp2](https://github.com/hhanh00/warp2) è un'implementazione di sincronizzazione veloce di Hanh, anche se non viene aggiornata dal 2023.

## Community ed eventi

Il [Discord R&D di Zcash](https://discord.gg/6AK7keWFaK) è il luogo in cui si discute dello sviluppo del protocollo e dei wallet, mentre il [Forum della Community di Zcash](https://forum.zcashcommunity.com/) ospita proposte più lunghe e thread di supporto.

I risultati recenti degli hackathon danno una buona immagine di ciò che le persone stanno costruendo: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e lo [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Risorse ritirate

Conservate perché articoli più vecchi le collegano, e perché restano ancora il riferimento per il comportamento del nodo ritirato. Non iniziare da qui.

[The Zcashd Book](https://zcash.github.io/zcash/) e il [riferimento RPC di zcashd](https://zcash.github.io/rpc/) documentano software che ha raggiunto la [fine del ciclo di vita](https://zcash.github.io/zcash/user/end-of-life.html) nel luglio 2026. Il repository [zcash/zcash](https://github.com/zcash/zcash) è archiviato.

Se hai una risorsa da aggiungere, o noti qualcosa qui che non è più aggiornato, apri una issue o una pull request. I team non sempre hanno la capacità di mantenere tutto aggiornato, e segnalare ciò in cui ti sei imbattuto aiuta a indirizzare le guide.

**Ultimo aggiornamento:** agosto 2026
