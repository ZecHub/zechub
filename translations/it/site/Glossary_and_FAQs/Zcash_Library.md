# Biblioteca di Zcash

Un glossario completo di termini chiave, concetti e risorse relativi a Zcash. Questa è l'unica biblioteca per consultare i termini presenti nelle note di rilascio, nei thread del forum o nei changelog dei portafogli.

### Navigazione rapida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Termine | Definizione |
|------|-----------|
| Actions | Invece di creare più prove individuali per ogni Spend e Output, il protocollo Orchard le unisce in una singola Action. |
| Addresses | Zcash ha indirizzi schermati (zaddr) e trasparenti (taddr). Gli indirizzi unificati (UA) raggruppano più tipi di receiver, così che un portafoglio mittente possa scegliere quello migliore supportato da entrambe le parti. Specificati in [ZIP 316](https://zips.z.cash/zip-0316). [Indirizzi unificati](/zcash-tech/unified-addresses) |
| Arborist Call | Una chiamata ogni due settimane che copre gli aggiornamenti del protocollo Zcash e dello sviluppo della ricerca. Ospitata sul Zcash Community Forum e su Discord. [Note delle riunioni](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Annunci del forum](https://forum.zcashcommunity.com) |
| Auto-shielding | Permette agli utenti (o più precisamente ai loro portafogli) di spostare automaticamente i fondi da un indirizzo trasparente all'ultima pool schermata ZEC. |

## B

| Termine | Definizione |
|------|-----------|
| Benchmarking | I miner possono inviare metriche sull'efficienza dei vari hardware usati per minare Zcash. [Visualizza qui](https://zcashbenchmarks.info) |
| Block | Un blocco è un record nella blockchain di Zcash che contiene un insieme di transazioni inviate sulla rete. In media, un nuovo blocco viene aggiunto alla blockchain all'incirca ogni 25 secondi (75 secondi prima dell'attivazione di NU7 a novembre 2026). |
| Block Explorer | Uno strumento online per visualizzare tutte le transazioni, passate e attuali, sulla blockchain. [Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (precedentemente Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Newsletter](https://zechub.substack.com/) |
| Blossom | Il 3° grande aggiornamento di rete per Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Termine | Definizione |
|------|-----------|
| Canopy | Il 5° grande aggiornamento di rete per Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Permette a un committer di impegnare un polinomio tramite una stringa breve che un verificatore può usare per confermare le valutazioni dichiarate del polinomio impegnato. Utile per ridurre i costi di comunicazione nel protocollo Zcash. |
| Community | [Il forum ufficiale della community di Zcash](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Un progetto di consenso ibrido proposto, che affiancherebbe il proof of stake al proof of work già esistente di Zcash. Shielded Labs coordina il lavoro e gestisce una rete di test, la Feature Net, dal repository `crosslink_monolith`. Il precedente repository del prototipo `zebra-crosslink` è stato ritirato nel novembre 2026. Oggi Crosslink non fa parte di Zcash. [Protocollo Crosslink](/zcash-tech/crosslink-protocol) |
| CrossPay | Una funzione del portafoglio ZODL che ti permette di effettuare spese schermate in ZEC mentre il destinatario viene pagato nell'asset e nella chain che preferisce, con instradamento tramite NEAR Intents invece che attraverso un exchange centralizzato. |
| Cypherpunk Zero | Un Creative Universe e uno sforzo collaborativo tra ECC, l'illustratore Stranger Wolf, Mighty Jaxx e alcuni partner selezionati dell'ecosistema. [Cypherpunk Zero Social](https://x.com/cypherpunkZero) / [Collezione OpenSea](https://opensea.io/collection/cypherpunk-zero) |

## D

| Termine | Definizione |
|------|-----------|
| DeFi | Progetti che integrano ZEC con DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Indica una transazione inviata da uno zaddr (indirizzo schermato) a un taddr (indirizzo trasparente). L'origine della transazione non è visibile, tuttavia i fondi entrano in una pool di valore pubblicamente visibile. |
| Developer Resources | [Risorse per sviluppatori](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentazione ufficiale](https://zcash.readthedocs.io/en/latest/) |

## E

| Termine | Definizione |
|------|-----------|
| ECC | Electric Coin Company, il team che ha lanciato il protocollo Zcash, in precedenza noto come Zcash Company. L'intero team di ingegneri si è dimesso a gennaio 2026 in seguito a una disputa sulla governance con il consiglio di amministrazione di Bootstrap, per poi formare ZODL. |
| ECDSA | L'Elliptic Curve Digital Signature Algorithm è uno schema di firma digitale crittograficamente sicuro. L'algoritmo di firma/verifica ECDSA si basa sulla moltiplicazione di punti sulle curve ellittiche. |
| Education | Video divulgativi che spiegano Zcash [qui](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Un campo aggiuntivo per le transazioni inviate a indirizzi schermati, visibile al destinatario di un pagamento. Il memo crittografato è visibile solo al mittente e al destinatario. |
| Equihash | L'algoritmo di mining proof-of-work orientato alla memoria usato su Zcash. |
| Events | Il calendario degli eventi legati a Zcash è consultabile su [Luma](https://luma.com/zcash) e su [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Elenco degli exchange che supportano Zcash](https://z.cash/exchanges/) |

## F

| Termine | Definizione |
|------|-----------|
| Fiat-Shamir | Una tecnica per prendere una prova interattiva di conoscenza e creare una firma digitale basata su di essa. In questo modo, un dato fatto (ad esempio la conoscenza di un segreto) può essere dimostrato pubblicamente senza rivelare le informazioni sottostanti. |
| Formal Verification | Dimostrare matematicamente che un sistema si comporta esattamente come specificato, invece di affidarsi solo ai test. Il circuito Action di Ironwood è stato verificato in questo modo da contributori di zkSecurity e ZODL usando il dimostratore di teoremi Lean, per dimostrare l'assenza di bug di soundness. |
| Founders Reward | La Founder Reward rappresenta il 20 percento della ricompensa totale per blocco, viene dedotta dal valore di ogni blocco e distribuita in modo trasparente per favorire lo sviluppo e la crescita del protocollo. |
| Free2Z | Uno strumento per contenuti anonimi e donazioni private basato su Zcash. [Free2Z](https://free2z.com) |
| FROST | Schema di firma a soglia Flexible Round-Optimized Schnorr. [Articolo di ricerca](https://eprint.iacr.org/2020/852) |

## G

| Termine | Definizione |
|------|-----------|
| Governance | Le decisioni del processo ZIP vengono scritte nella specifica Zcash, così come nel software che esegue la rete. Le modifiche vengono ratificate on-chain quando la maggioranza della rete adotta l'aggiornamento e non rompe il consenso. [Storia completa del protocollo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Termine | Definizione |
|------|-----------|
| Halo | Consente di aggiornare i circuiti senza la necessità di trusted setup, rendendo il protocollo schermato Zcash più agile per miglioramenti ed estensioni future. [Spiegazione tecnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | I portafogli gerarchici deterministici generano una serie di coppie di chiavi da un solo seed, offrendo praticità e gestibilità oltre a un livello elevato di sicurezza. |
| Heartwood | Il 4° grande aggiornamento di rete di Zcash. [Maggiori informazioni](https://z.cash/upgrade/heartwood/) |

## I

| Termine | Definizione |
|------|-----------|
| Index | Lo ZCX Index di CoinDesk rappresenta un tasso spot in tempo reale, equivalente in USD, per Zcash. [Indice dei prezzi](https://www.coindesk.com/indices/zcx/) |
| Integrations | Puoi accettare pagamenti in Zcash tramite diversi fornitori di terze parti. [Processori di pagamento](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Una macchina astratta che modella il calcolo come uno scambio di messaggi tra due parti: un Prover e un Verifier. |
| Investment | Diverse opzioni finanziarie sono disponibili per investitori istituzionali o family office che vogliono ottenere esposizione a Zcash. [Elenco completo](https://z.cash/investors/) |
| Ironwood | L'aggiornamento di rete NU6.3, attivo sulla mainnet dal blocco 3.428.143 del 28 luglio 2026. Ironwood aggiunge una nuova pool schermata costruita sul circuito Orchard corretto e sigilla la pool originale Orchard, così che chiunque possa verificare che l'offerta circolante sia onesta. Le sue regole di consenso sono specificate in [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Termine | Definizione |
|------|-----------|
| JubJub | Una curva ellittica progettata per essere implementabile in modo efficiente nei circuiti zk-SNARK. |

## K

| Termine | Definizione |
|------|-----------|
| Keystone Wallet | Un portafoglio hardware air-gapped con supporto nativo per Zcash (Orchard schermato), compatibile con ZODL per la firma a freddo. [Keystone](https://keyst.one) |

## L

| Termine | Definizione |
|------|-----------|
| Layer-1 | Indica una rete di base e la sua infrastruttura sottostante. Le blockchain Layer-1 possono validare e finalizzare le transazioni senza bisogno di un'altra rete. Zcash è una blockchain L1. |
| librustzcash | Un workspace Rust che contiene tutte le crate e le dipendenze per lavorare con Zcash. [repo](https://github.com/zcash/librustzcash) |
| lightwalletd | Un server stateless che fornisce ai light client le informazioni sulla blockchain. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Termine | Definizione |
|------|-----------|
| Metrics | Le metriche di rete sono disponibili [qui](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Dati generati insieme a una transazione Zcash di un utente. Possono includere l'altezza del blocco, la versione della transazione o l'altezza di scadenza, ecc. |
| Mobile SDK | Un SDK leggero che collega Android a Zcash, permettendo alle app Android di terze parti di inviare e ricevere transazioni schermate. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Il processo in cui, per ogni blocco, i nodi della rete di Zcash competono eseguendo complessi calcoli matematici per trovare una soluzione in base a una difficoltà auto-regolantesi. [Guida](https://z.cash/mining-zcash/) |
| Multisignature | Un indirizzo che richiede più firme con chiavi private per spendere i fondi. Attualmente, la funzionalità multisig è supportata solo dagli indirizzi trasparenti. |

## N

| Termine | Definizione |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Una proposta di Shielded Labs per bruciare una quota delle commissioni di transazione, così che il budget di sicurezza a lungo termine del protocollo non riposi interamente sull'emissione. Specificata in ZIP 234, in revisione nel 2026. |
| Nighthawk | Un ex portafoglio mobile per Zcash di Nighthawk Apps. I suoi portafogli Zcash non sono più mantenuti, e Nighthawk Wallet 3.0 è invece costruito per DarkFi. Per spostare i fondi da un vecchio seed di Nighthawk, vedi [Recupero dei fondi](/using-zcash/recovering-funds). |
| Noir Wallet | Un portafoglio come estensione browser Zcash supportato da Zcash Community Grants, creato per collegare ZEC schermati direttamente alle applicazioni browser invece di fare affidamento su codici QR e trasferimenti manuali. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Il 6° grande aggiornamento di rete per Zcash, che introduce la pool schermata Orchard e gli indirizzi unificati. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Il 7° grande aggiornamento di rete per Zcash, che adegua il sussidio di blocco per finanziare il programma Zcash Community Grants e la Deferred Dev Fund Lockbox. Attivato a fine 2024. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | L'aggiornamento di rete successivo a Ironwood, attivato sulla mainnet all'altezza 3.543.405 il 6 novembre 2026 (UTC). Come da [ZIP 259](https://zips.z.cash/zip-0259) porta blocchi da 25 secondi (ZIP 218), il Network Sustainability Mechanism con riciclo delle commissioni (ZIP 235 e 237) e la fine delle transazioni di versione 4, il che rende non spendibili i fondi Sprout (ZIP 2003). Non aggiunge alcun nuovo formato di transazione; Tachyon e Zcash Shielded Assets non ne fanno parte. |

## O

| Termine | Definizione |
|------|-----------|
| Oblivious Synchronization | Un metodo in fase di sviluppo nel Progetto Tachyon che permette a un portafoglio di richiedere a un server non fidato i dati di cui ha bisogno senza rivelare su quali note stia chiedendo informazioni. Il server non viene mai a conoscenza dei tuoi nullifier, perché il protocollo li fa evolvere in modo non collegabile. [Approfondimento](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | La pool schermata introdotta con NU5. Ironwood l'ha sigillata dopo che è stato trovato un bug di soundness, quindi non è più possibile inviare o ricevere all'interno di Orchard. I fondi escono solo tramite il turnstile (tornello). [Pool schermate](/using-zcash/shielded-pools) |
| Overwinter | Il 1° aggiornamento di rete per Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Termine | Definizione |
|------|-----------|
| Payments | È possibile usare Zcash per gli acquisti quotidiani tramite diversi fornitori di pagamento. [App di pagamento](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Una primitiva in cui i dati viaggiano insieme a una prova della loro stessa correttezza, così che combinare i dati significa anche combinare le prove. Il Progetto Tachyon ricostruisce il protocollo schermato attorno alla PCD, permettendo a ogni portafoglio di portare con sé una prova ricorsiva che il proprio saldo sia corretto, invece di riscansionare la chain. L'implementazione Zcash è [Ragu](https://github.com/tachyon-zcash/ragu), che segue Halo e non richiede trusted setup. |
| Peer-to-Peer Network | Le reti P2P si basano sul concetto di decentralizzazione. L'architettura fondante della tecnologia blockchain. |
| PIR (Private Information Retrieval) | Tecniche che ti permettono di recuperare un record da un server senza che il server venga a sapere quale record hai richiesto. Sono oggetto di ricerca attiva per Zcash come modo per i portafogli leggeri di recuperare ciò di cui hanno bisogno senza rivelare ciò che stanno cercando. |
| Podcast | [Radiolab (Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Termine | Definizione |
|------|-----------|
| QR Code | Un codice leggibile da macchina usato per codificare gli indirizzi Zcash per una scansione facile. Gli indirizzi unificati (UA) sono in genere condivisi tramite codici QR nei moderni portafogli Zcash. |
| Quantum Recoverability | Una proprietà delle note Ironwood, specificata in [ZIP 2005](https://zips.z.cash/zip-2005), che mantiene recuperabile la registrazione on-chain di una moneta se un futuro computer quantistico viola la crittografia che oggi la protegge. È un percorso di recupero piuttosto che una resistenza quantistica, e si applica alle note Ironwood, non ai fondi esistenti Sprout, Sapling o Orchard. |

## R

| Termine | Definizione |
|------|-----------|
| Recovery Phrase | Una sequenza di 12 o 24 lettere e numeri usata per eseguire il backup di un portafoglio e ripristinarlo. In Zcash, questa frase rigenera le chiavi di spesa e le chiavi di visualizzazione, il che la rende fondamentale per il recupero dei fondi e per la sicurezza. |

## S

| Termine | Definizione |
|------|-----------|
| Sapling | Un aggiornamento di rete fondamentale che ha introdotto significativi miglioramenti di efficienza per le transazioni schermate e ha aperto la strada all'adozione mobile. Attivato al blocco 419200. |
| Selective Disclosure | Consente al proprietario di un indirizzo schermato di condividere selettivamente le chiavi di visualizzazione o le divulgazioni di pagamenti con terzi, mantenendo i dati privati rispetto a tutti gli altri. |
| Shielded Address | Chiamato anche zaddr. Inizia con z. Nasconde mittente, destinatario, importo e memo usando zk-SNARKs. |
| Shielded Labs | Un'organizzazione indipendente che lavora all'economia del protocollo di Zcash e al consenso. Attualmente guida Crosslink e il Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Una transazione esclusivamente tra indirizzi schermati. Completamente privata sulla blockchain. |
| Sol/s | Soluzioni al secondo - misura le prestazioni di mining di Equihash. |
| Spending Key | La chiave privata che consente di spendere da un indirizzo schermato (permette anche di visualizzare saldo e cronologia). |
| Sprout | La versione originaria del protocollo schermato di Zcash (lanciata nel 2016). |

## T

| Termine | Definizione |
|------|-----------|
| Tachyon | Il programma di scalabilità di Zcash. Non fa parte di NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e non ha una data di attivazione. Sposta i portafogli dalla scansione di ogni blocco verso uno stato del portafoglio che trasporta le prove, la sincronizzazione cieca (Oblivious Synchronization) e uno stato del nodo soggetto a pruning, puntando a un throughput schermato di migliaia di transazioni al secondo. [Sito del progetto](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (valuta di test senza valore). |
| Testnet | Una blockchain separata per testare aggiornamenti e funzionalità prima del mainnet. |
| Trailing Finality Layer (TFL) | Ricerca sull'aggiunta di uno strato di finalità dietro la chain proof-of-work di Zcash, così che i blocchi recenti possano essere finalizzati senza sostituire il mining. Crosslink è il design che ne è derivato. |
| Transaction | Un pagamento tra utenti, inviato alla rete ed eventualmente confermato in un blocco. |
| Transaction Expiry | Un limite di altezza di blocco su quando un pagamento non ancora minato può essere incluso. Un pagamento ordinario con un'altezza di scadenza diversa da zero N può essere minato nel blocco N o prima, ma non in N+1. Un'altezza di 0 disattiva la scadenza. Non si tratta di un timer di rimborso automatico. [ZIP 203](https://zips.z.cash/zip-0203) |
| Transaction Fee | La commissione predefinita è 0,0001 ZEC. Le commissioni più alte hanno la precedenza; commissioni molto basse possono causare ritardi o scadenza. |
| Transparent Address | Chiamato anche taddr. Inizia con t. Completamente pubblico (come Bitcoin). |
| Transparent Transaction | Una transazione esclusivamente tra indirizzi trasparenti - tutto è pubblicamente visibile. |
| Turnstile | Il turnstile (tornello) è la regola contabile che tiene traccia di quanto valore entra ed esce da ciascuna pool schermata, così che nessuna pool possa rilasciare più di quanto vi sia entrato. Usato a ogni transizione di pool nella storia di Zcash, e attualmente a guardia della migrazione da Orchard a Ironwood. [Maggiori informazioni](/zcash-tech/the-turnstile) |

## U

| Termine | Definizione |
|------|-----------|
| Unified Address | Formato di indirizzo moderno (introdotto in NU5) che funziona sia per i pagamenti trasparenti sia per quelli schermati in un'unica stringa. |
| Upgrade Activation | L'altezza di blocco specifica alla quale un aggiornamento di rete (ad esempio NU5, NU6) si attiva automaticamente. |

## V

| Termine | Definizione |
|------|-----------|
| Viewing Key | Una chiave privata che ti consente di visualizzare il saldo e la cronologia delle transazioni di un indirizzo schermato senza poter spendere i fondi. |

## W

| Termine | Definizione |
|------|-----------|
| Wallet | Software o dispositivo hardware che conserva le chiavi private e ti permette di inviare e ricevere ZEC. Tra i portafogli attivi ci sono ZODL (iOS/Android), Zingo! (dispositivi mobili/desktop), Zkool (dispositivi mobili/desktop), Zallet (portafoglio full node, in beta) e Keystone (hardware). Per un elenco completo, consulta [Portafogli dell'ecosistema di Zcash](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | Il primo SDK JavaScript per Zcash, creato da ChainSafe per gli ambienti browser. È alla base della snap Zcash Shielded Wallet che ha portato gli ZEC schermati su MetaMask. |

## X

| Termine | Definizione |
|------|-----------|
| XZC | Un simbolo ticker più vecchio per Zcash, usato su alcuni exchange legacy. Il ticker ufficiale è ZEC. |

## Y

| Termine | Definizione |
|------|-----------|
| YWallet | Un portafoglio Zcash incentrato sulla privacy che supporta gli indirizzi Orchard, Sapling e trasparenti, noto per la sincronizzazione rapida. Non più mantenuto: lo sviluppatore ha confermato che non verrà aggiornato per Ironwood, quindi non può più seguire la rete. Zkool, dello stesso sviluppatore, è il successore mantenuto. |

## Z

| Termine | Definizione |
|------|-----------|
| Zcash | Criptovaluta incentrata sulla privacy che usa zk-SNARKs. Collega i pagamenti trasparenti (in stile Bitcoin) a quelli completamente schermati. |
| Zcash Foundation | Organizzazione non profit indipendente che supporta l'ecosistema di Zcash, finanzia lo sviluppo e promuove la privacy. |
| Zcash Network | Rete peer-to-peer di nodi che valida le transazioni e mantiene la blockchain. |
| ZEC | Il codice valuta ufficiale di Zcash (alcuni exchange mostrano ancora XZC). |
| Z3 stack | I tre programmi che insieme sostituiscono zcashd: Zebra per il nodo, Zaino per l'indicizzazione e Zallet per il portafoglio. [Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | Il protocollo accademico (2014) su cui si basa Zcash. |
| Zaino | Un indexer che serve i dati del portafoglio da un nodo Zebra, scritto in Rust da Zingo Labs. Assume il lavoro di indicizzazione che zcashd svolgeva per i light wallet. [Zaino](/zcash-tech/zaino) |
| Zakura | Un Zcash full node separato, costruito per la scalabilità, guidato da Sean Bowe e Dev Ojha. Si sincronizza più velocemente, esegue il pruning dei blocchi in modo nativo e può eseguire zcashd sopra di sé per il software che dipende ancora da esso. [nodo Zakura](/zcash-tech/zakura-node) |
| Zallet | Il portafoglio che sostituisce il portafoglio zcashd. Trasferisci un `wallet.dat` esistente invece di ripartire da zero. [Zallet](/zcash-tech/zallet) e la [guida di riferimento rapida di Zallet](/using-zcash/zallet-quick-reference-guide) |
| Zebra | Il full node che sostituisce zcashd, mantenuto dalla Zcash Foundation. Eseguilo se ti serve un nodo di validazione. [full node di Zebra](/zcash-tech/zebra-full-node) |
| zcashd | Il full node e il portafoglio originali di Zcash, ormai ritirati. La versione 6.20.0 si è spenta da sola al blocco 3417100 il 18 luglio 2026 e non ha mai supportato NU6.3. Esegui invece lo Z3 stack o Zakura. [Guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash Improvement Proposal - il processo di governance della community usato per proporre e ratificare le modifiche al protocollo. [ZIP Repository](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. L'organizzazione indipendente fondata all'inizio del 2026 da Josh Swihart e dall'ex team di ingegneria di Electric Coin Company, dimessosi a causa di una disputa di governance con Bootstrap. Ha raccolto oltre 25 milioni di dollari in finanziamenti seed a marzo 2026 e mantiene il portafoglio ZODL, rinominato da Zashi a febbraio 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — la crittografia che alimenta le transazioni schermate di Zcash. Permette di dimostrare un'affermazione (ad esempio, una spesa valida) senza rivelare alcuna informazione segreta. |
| ZSA (Zcash Shielded Assets) | Token emessi dagli utenti che ereditano la privacy schermata di Zcash, consentendo ad asset diversi da ZEC di spostarsi privatamente sulla rete. Specificati in [ZIP 226](https://zips.z.cash/zip-0226). Non fanno parte di NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e non hanno una data di attivazione. |

---

**Ultimo aggiornamento:** ottobre 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
