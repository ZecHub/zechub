# Biblioteca di Zcash

Un glossario completo dei termini chiave, dei concetti e delle risorse relativi a Zcash. Questa è l'unica raccolta per cercare termini nelle note di rilascio, nelle discussioni del forum o nei changelog dei portafogli.

### Navigazione rapida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Termine | Definizione |
|------|-----------|
| Actions | Invece di creare diverse prove individuali per ogni Spend e Output, il protocollo Orchard le unisce in una singola Action. |
| Addresses | Zcash ha indirizzi schermati (zaddr) e trasparenti (taddr). Gli indirizzi unificati (UA) raggruppano diversi tipi di receiver affinché un portafoglio mittente possa scegliere il migliore supportato da entrambe le parti. Specificati in [ZIP 316](https://zips.z.cash/zip-0316). [Indirizzi unificati](/zcash-tech/unified-addresses) |
| Arborist Call | Una call quindicinale che copre gli aggiornamenti sullo sviluppo del protocollo Zcash e della ricerca. Ospitata sul Forum della Community di Zcash e su Discord. [Note della riunione](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Annunci sul forum](https://forum.zcashcommunity.com) |
| Auto-shielding | Consente agli utenti (più precisamente ai loro portafogli) di spostare automaticamente i fondi da un indirizzo trasparente alla più recente pool schermata di ZEC. |

## B

| Termine | Definizione |
|------|-----------|
| Benchmarking | I miner possono inviare metriche sull'efficienza dei vari hardware usati per minare Zcash. [Vedi qui](https://zcashbenchmarks.info) |
| Block | Un Block è un record nella blockchain di Zcash che contiene un insieme di transazioni inviate sulla rete. In media, circa ogni 75 secondi viene aggiunto un nuovo blocco alla blockchain. |
| Block Explorer | Uno strumento online per visualizzare tutte le transazioni, passate e presenti, sulla blockchain. [Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [Blog di ZODL (ex Electric Coin Co)](https://zodl.com/blog/) / [Blog della Zcash Foundation](https://zfnd.org/blog/) / [Newsletter di ZecHub](https://zechub.substack.com/) |
| Blossom | Il 3° grande aggiornamento di rete di Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Termine | Definizione |
|------|-----------|
| Canopy | Il 5° grande aggiornamento di rete di Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Consente a chi effettua un impegno di vincolarsi a un polinomio con una stringa breve che può essere usata da un verificatore per confermare le valutazioni dichiarate del polinomio vincolato. Utile per ridurre i costi di comunicazione nel protocollo Zcash. |
| Community | [Il forum ufficiale della Community di Zcash](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&S Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Una proposta di meccanismo di consenso ibrido che affiancherebbe il proof-of-stake all'attuale proof-of-work di Zcash. Shielded Labs guida il lavoro e mantiene un prototipo nel repository `zebra-crosslink`. Crosslink oggi non fa parte di Zcash. [Crosslink protocollo](/zcash-tech/crosslink-protocol) |
| CrossPay | Una funzionalità del portafoglio ZODL che ti consente di spendere ZEC schermati mentre il destinatario viene pagato nell'asset e sulla chain che preferisce, instradando l'operazione tramite NEAR Intents invece che attraverso un exchange centralizzato. |
| Cypherpunk Zero | Un universo creativo e uno sforzo collaborativo tra ECC, l'illustratore Stranger Wolf, Mighty Jaxx e partner selezionati dell'ecosistema. [Social di Cypherpunk Zero](https://x.com/cypherpunkZero) / [OpenSea Collezione](https://opensea.io/collection/cypherpunk-zero) |

## D

| Termine | Definizione |
|------|-----------|
| DeFi | Progetti che integrano ZEC con la DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Si riferisce a una transazione inviata da uno zaddr (indirizzo schermato) a un taddr (indirizzo trasparente). L'origine della transazione non è visibile, tuttavia i fondi entrano in una pool di valore visibile pubblicamente. |
| Developer Resources | [Risorse per sviluppatori](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentazione ufficiale](https://zcash.readthedocs.io/en/latest/) |

## E

| Termine | Definizione |
|------|-----------|
| ECC | La Electric Coin Company, il team che ha lanciato il protocollo Zcash, precedentemente noto come Zcash Company. L'intero team di ingegneria si è dimesso nel gennaio 2026 in seguito a una disputa sulla governance con il consiglio di Bootstrap, e ha poi dato vita a ZODL. |
| ECDSA | Elliptic Curve Digital Signature Algorithm è uno schema di firma digitale crittograficamente sicuro. L'algoritmo di firma/verifica ECDSA si basa sulla moltiplicazione di punti su curva ellittica. |
| Education | Video didattici che spiegano Zcash [qui](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Un campo aggiuntivo per le transazioni inviate a indirizzi schermati, visibile al destinatario di un pagamento. Il memo crittografato è visibile solo al mittente e al destinatario. |
| Equihash | L'algoritmo di mining proof-of-work usato da Zcash, progettato per richiedere molta memoria (RAM). |
| Events | Il calendario degli eventi relativi a Zcash può essere consultato su [Luma](https://luma.com/zcash) e [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Elenco degli exchange che supportano Zcash](https://z.cash/exchanges/) |

## F

| Termine | Definizione |
|------|-----------|
| Fiat-Shamir | Una tecnica per prendere una prova interattiva di conoscenza e creare una firma digitale basata su di essa. In questo modo, un certo fatto (ad esempio la conoscenza di un segreto) può essere provato pubblicamente senza rivelare le informazioni sottostanti. |
| Formal Verification | Dimostrare matematicamente che un sistema si comporta esattamente come specificato, invece di basarsi solo sui test. Il circuito Ironwood Action è stato verificato in questo modo da collaboratori di zkSecurity e ZODL con Lean, un dimostratore di teoremi, per escludere la presenza di bug di solidità. |
| Founders Reward | La ricompensa dei fondatori rappresenta il 20 percento della ricompensa totale per blocco ed è detratta dal valore di ogni blocco e distribuita in modo trasparente per sostenere lo sviluppo e la crescita del protocollo. |
| Free2Z | Uno strumento per contenuti anonimi e donazioni private alimentato da Zcash. [Free2Z](https://free2z.com) |
| FROST | Schema di firma Flexible Round-Optimized Schnorr Threshold (firma a soglia Schnorr, flessibile e ottimizzata nel numero di round). [Paper di ricerca](https://eprint.iacr.org/2020/852) |

## G

| Termine | Definizione |
|------|-----------|
| Governance | Le decisioni del processo ZIP vengono scritte nella specifica di Zcash, così come nel software che esegue la rete. Le modifiche vengono ratificate on-chain quando la maggioranza della rete adotta l'aggiornamento senza rompere il consenso. [Storia completa del protocollo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Termine | Definizione |
|------|-----------|
| Halo | Consente aggiornamenti dei circuiti senza la necessità di trusted setup, rendendo il protocollo schermato di Zcash più agile per futuri miglioramenti ed estensioni. [Spiegazione tecnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | I portafogli gerarchici deterministici generano una serie di coppie di chiavi a partire da un unico seed, offrendo praticità e gestibilità oltre a un elevato livello di sicurezza. |
| Heartwood | Il 4° grande aggiornamento di rete di Zcash. [Maggiori informazioni](https://z.cash/upgrade/heartwood/) |

## I

| Termine | Definizione |
|------|-----------|
| Index | L'indice ZCX di CoinDesk rappresenta un tasso spot in tempo reale equivalente in USD per Zcash. [Indice dei prezzi](https://www.coindesk.com/indices/zcx/) |
| Integrations | Puoi accettare pagamenti in Zcash tramite diversi fornitori di terze parti. [Processori di pagamento](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Una macchina astratta che modella il calcolo come uno scambio di messaggi tra due parti: un Prover e un Verifier. |
| Investment | Sono disponibili diverse opzioni finanziarie per investitori istituzionali o family office che vogliono ottenere esposizione a Zcash. [Elenco completo](https://z.cash/investors/) |
| Ironwood | Aggiornamento di rete NU6.3, attivo sulla mainnet dal blocco 3,428,143 del 28 luglio 2026. Ironwood aggiunge una nuova pool schermata basata sul circuito Orchard corretto e sigilla la pool Orchard originale, così chiunque può verificare che l'offerta circolante sia onesta. Le sue regole di consenso sono specificate in [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Termine | Definizione |
|------|-----------|
| JubJub | Una curva ellittica progettata per essere implementata in modo efficiente nei circuiti zk-SNARK. |

## K

| Termine | Definizione |
|------|-----------|
| Keystone Wallet | Un portafoglio hardware air-gapped con supporto nativo per Zcash (Orchard schermata), compatibile con ZODL per la firma a freddo. [Keystone](https://keyst.one) |

## L

| Termine | Definizione |
|------|-----------|
| Layer-1 | Si riferisce a una rete di base e alla sua infrastruttura sottostante. Le blockchain Layer-1 possono validare e finalizzare le transazioni senza la necessità di un'altra rete. Zcash è una blockchain L1. |
| librustzcash | Un workspace Rust che contiene tutti i crate e le dipendenze per lavorare con Zcash. [repo](https://github.com/zcash/librustzcash) |
| lightwalletd | Un server senza stato che fornisce ai client leggeri informazioni sulla blockchain. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Termine | Definizione |
|------|-----------|
| Metrics | Le metriche di rete sono disponibili [qui](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Dati generati insieme a una transazione Zcash di un utente. Possono includere altezza del blocco, versione della transazione o altezza di scadenza, ecc. |
| Mobile SDK | Un SDK leggero che collega Android a Zcash, consentendo ad app Android di terze parti di inviare e ricevere transazioni schermate. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Il processo in cui, per ogni blocco, i nodi della rete Zcash competono eseguendo complessi calcoli matematici per trovare una soluzione basata su una difficoltà che si autoregola. [Guida](https://z.cash/mining-zcash/) |
| Multisignature | Un indirizzo che richiede più firme di chiavi private per poter spendere i fondi. Attualmente, la funzionalità multisig è supportata solo dagli indirizzi trasparenti. |

## N

| Termine | Definizione |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Una proposta di Shielded Labs per bruciare una quota delle commissioni di transazione, così che il budget di sicurezza a lungo termine del protocollo non dipenda interamente dall'emissione. Specificata nello ZIP 234, in fase di revisione nel 2026. |
| Nighthawk | Un portafoglio mobile per Zcash. [Sito web](https://nighthawkwallet.com) |
| Noir Wallet | Un portafoglio Zcash in forma di estensione del browser supportato da Zcash Community Grants, creato per collegare direttamente gli ZEC schermati alle applicazioni del browser invece di affidarsi a codici QR e trasferimenti manuali. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Il 6° grande aggiornamento di rete di Zcash, che introduce la pool schermata Orchard e gli indirizzi unificati. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Il 7° grande aggiornamento di rete di Zcash, che adegua il sussidio per blocco per finanziare il programma Zcash Community Grants e il Deferred Dev Fund Lockbox. Attivato alla fine del 2024. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | L'aggiornamento di rete successivo a Ironwood, previsto per mainnet il 5 novembre 2026. Secondo [ZIP 259](https://zips.z.cash/zip-0259) introduce blocchi da 25 secondi (ZIP 218), il Network Sustainability Mechanism con riciclo delle commissioni (ZIP 235 e 237) e la fine delle transazioni di versione 4, che rende i fondi Sprout non spendibili (ZIP 2003). Non aggiunge alcun nuovo formato di transazione; Tachyon e gli Zcash Shielded Assets non ne fanno parte. |

## O

| Termine | Definizione |
|------|-----------|
| Oblivious Synchronization | Un metodo in fase di sviluppo nel progetto Tachyon che consente a un portafoglio di richiedere a un server non affidabile i dati di cui ha bisogno senza rivelare di quali note sta chiedendo informazioni. Il server non apprende mai i tuoi nullifier, perché il protocollo li fa evolvere in modo non collegabile. [Approfondimento](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | La pool schermata introdotta in NU5. Ironwood l'ha sigillata dopo la scoperta di un bug di solidità, quindi non puoi più inviare o ricevere all'interno di Orchard. I fondi escono solo attraverso il turnstile (tornello). [Pool schermate](/using-zcash/shielded-pools) |
| Overwinter | Il 1° aggiornamento di rete di Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Termine | Definizione |
|------|-----------|
| Payments | È possibile usare Zcash per acquisti quotidiani tramite diversi fornitori di pagamento. [App di pagamento](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Una primitiva in cui i dati viaggiano insieme a una prova della propria correttezza, così che combinando i dati si combinano anche le prove. Project Tachyon ricostruisce il protocollo schermato attorno a PCD, permettendo a ogni portafoglio di portare con sé una prova ricorsiva che il proprio saldo è corretto invece di dover riesaminare la chain. L'implementazione di Zcash è [Ragu](https://github.com/tachyon-zcash/ragu), che segue Halo e non richiede un trusted setup. |
| Peer-to-Peer Network | Le reti P2P si basano sul concetto di decentralizzazione. L'architettura fondamentale della tecnologia blockchain. |
| PIR (Private Information Retrieval) | Tecniche che consentono di recuperare un record da un server senza che il server scopra quale record hai richiesto. Sono oggetto di ricerca attiva per Zcash come modo per consentire ai portafogli light di recuperare ciò di cui hanno bisogno senza rivelare cosa stanno cercando. |
| Podcast | [Radiolab (Cerimonia di Zcash)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Termine | Definizione |
|------|-----------|
| QR Code | Un codice leggibile da una macchina usato per codificare indirizzi Zcash e facilitarne la scansione. Gli indirizzi unificati (UA) vengono tipicamente condivisi tramite codici QR nei moderni portafogli Zcash. |
| Quantum Recoverability | Una proprietà delle note Ironwood, specificata in [ZIP 2005](https://zips.z.cash/zip-2005), che mantiene recuperabile la registrazione on-chain di una moneta se un futuro computer quantistico dovesse compromettere la crittografia che oggi la protegge. Si tratta di un percorso di recupero piuttosto che di resistenza quantistica, e si applica alle note Ironwood, non ai fondi Sprout, Sapling o Orchard esistenti. |

## R

| Termine | Definizione |
|------|-----------|
| Recovery Phrase | Una sequenza di 12 o 24 lettere e numeri usata per eseguire il backup e ripristinare un portafoglio. In Zcash, questa frase rigenera chiavi di spesa e chiavi di visualizzazione, rendendola fondamentale per il recupero dei fondi e la sicurezza. |

## S

| Termine | Definizione |
|------|-----------|
| Sapling | Un importante aggiornamento di rete che ha introdotto notevoli miglioramenti di efficienza per le transazioni schermate e ha aperto la strada all'adozione mobile. Attivato al blocco 419200. |
| Selective Disclosure | Consente al proprietario di un indirizzo schermato di condividere selettivamente chiavi di visualizzazione o divulgazioni di pagamento con terze parti, mantenendo i dati privati per tutti gli altri. |
| Shielded Address | Detto anche zaddr. Inizia con z. Nasconde mittente, destinatario, importo e memo usando zk-SNARKs. |
| Shielded Labs | Un'organizzazione indipendente che lavora sull'economia del protocollo e sul consenso di Zcash. Attualmente guida Crosslink e il Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Una transazione esclusivamente tra indirizzi schermati. Completamente privata sulla blockchain. |
| Sol/s | Soluzioni al secondo - misura le prestazioni di mining di Equihash. |
| Spending Key | La chiave di spesa privata che consente di spendere da un indirizzo schermato (consente anche di visualizzare saldo e cronologia). |
| Sprout | La versione originale del protocollo schermato di Zcash (lanciata nel 2016). |

## T

| Termine | Definizione |
|------|-----------|
| Tachyon | Il programma di scalabilità di Zcash. Non fa parte di NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e non ha una data di attivazione. Allontana i portafogli dalla scansione di ogni blocco verso uno stato del portafoglio corredato di prove, la sincronizzazione cieca (Oblivious Synchronization) e uno stato dei nodi eliminabile, con l'obiettivo di raggiungere un throughput schermato nell'ordine delle migliaia di transazioni al secondo. [Sito del progetto](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (valuta di test senza valore). |
| Testnet | Una blockchain separata per testare aggiornamenti e funzionalità prima della mainnet. |
| Trailing Finality Layer (TFL) | Ricerca sull'aggiunta di un livello di finalità dietro la chain proof-of-work di Zcash, in modo che i blocchi recenti possano essere finalizzati senza sostituire il mining. Crosslink è il design nato da questa ricerca. |
| Transaction | Un pagamento tra utenti, inviato alla rete e infine confermato in un blocco. |
| Transaction Expiry | Le transazioni scadono dopo circa 25 minuti (20 blocchi) se non confermate; i fondi ritornano automaticamente. |
| Transaction Fee | La commissione predefinita è 0,0001 ZEC. Le commissioni più alte hanno priorità; commissioni molto basse possono causare ritardi o scadenza. |
| Transparent Address | Chiamato anche taddr. Inizia con t. Completamente pubblico (come Bitcoin). |
| Transparent Transaction | Una transazione esclusivamente tra indirizzi trasparenti - tutto è visibile pubblicamente. |
| Turnstile | Il turnstile (tornello) è la regola contabile che tiene traccia di quanto valore entra ed esce da ogni pool schermata, così nessuna pool può rilasciare più di quanto vi sia entrato. Utilizzato in ogni transizione di pool nella storia di Zcash, e attualmente a protezione della migrazione da Orchard a Ironwood. [Maggiori informazioni](/zcash-tech/the-turnstile) |

## U

| Termine | Definizione |
|------|-----------|
| Unified Address | Formato di indirizzo moderno (introdotto in NU5) che funziona sia per pagamenti trasparenti sia schermati in un'unica stringa. |
| Upgrade Activation | L'altezza di blocco specifica in cui un aggiornamento di rete (ad es. NU5, NU6) si attiva automaticamente. |

## V

| Termine | Definizione |
|------|-----------|
| Viewing Key | Una chiave di visualizzazione privata che consente di visualizzare il saldo e la cronologia delle transazioni di un indirizzo schermato senza poter spendere i fondi. |

## W

| Termine | Definizione |
|------|-----------|
| Wallet | Software o hardware che conserva le chiavi private e consente di inviare/ricevere ZEC. I portafogli attivi includono ZODL (iOS/Android), Zingo! (mobile/desktop), Nighthawk (Android), Zkool (mobile/desktop), Zallet (in arrivo) e Keystone (hardware). Per un elenco completo, vedi [Portafogli dell'ecosistema Zcash](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | Il primo SDK JavaScript per Zcash, sviluppato da ChainSafe per ambienti del browser. È alla base dello snap Zcash Shielded Wallet che ha portato gli ZEC schermati su MetaMask. |

## X

| Termine | Definizione |
|------|-----------|
| XZC | Un vecchio ticker per Zcash usato su alcuni exchange legacy. Il ticker ufficiale è ZEC. |

## Y

| Termine | Definizione |
|------|-----------|
| YWallet | Un portafoglio Zcash focalizzato sulla privacy che supporta Orchard, Sapling e indirizzi trasparenti, noto per la sincronizzazione rapida. Non è più mantenuto: il suo sviluppatore ha confermato che non verrà aggiornato per Ironwood, quindi non può più seguire la rete. Zkool, dello stesso sviluppatore, è il successore attivamente mantenuto. |

## Z

| Termine | Definizione |
|------|-----------|
| Zcash | Criptovaluta incentrata sulla privacy che utilizza zk-SNARKs. Collega pagamenti trasparenti (in stile Bitcoin) e pagamenti completamente schermati. |
| Zcash Foundation | Organizzazione non profit indipendente che supporta l'ecosistema Zcash, finanzia lo sviluppo e promuove la privacy. |
| Zcash Network | Rete peer-to-peer di nodi che valida le transazioni e mantiene la blockchain. |
| ZEC | Il ticker ufficiale di Zcash (alcuni exchange mostrano ancora XZC). |
| Z3 stack | I tre programmi che insieme sostituiscono zcashd: Zebra per il nodo, Zaino per l'indicizzazione, Zallet per il portafoglio. [stack Z3](/zcash-tech/z3-stack) |
| Zerocash | Il protocollo accademico (2014) su cui si basa Zcash. |
| Zaino | Un indicizzatore che fornisce dati del portafoglio da un nodo Zebra, scritto in Rust da Zingo Labs. Subentra al lavoro di indicizzazione che zcashd svolgeva per i portafogli leggeri. [Zaino](/zcash-tech/zaino) |
| Zakura | Un full node (nodo completo) Zcash separato, progettato per la scalabilità e guidato da Sean Bowe e Dev Ojha. Si sincronizza più velocemente, elimina i blocchi nativamente e può eseguire zcashd sopra di sé per i software che ne dipendono ancora. [Zakura nodo](/zcash-tech/zakura-node) |
| Zallet | Il portafoglio che sostituisce il portafoglio zcashd. Trasferisci un `wallet.dat` esistente invece di ricominciare da capo. [Zallet](/zcash-tech/zallet) e la [Zallet guida rapida](/using-zcash/zallet-quick-reference-guide) |
| Zebra | Il full node che sostituisce zcashd, mantenuto dalla Zcash Foundation. Eseguilo se ti serve un nodo di convalida. [Zebra full node](/zcash-tech/zebra-full-node) |
| zcashd | Il full node e portafoglio originale di Zcash, ora ritirato. La versione 6.20.0 si è arrestata al blocco 3417100 il 18 luglio 2026 e non ha mai supportato NU6.3. Esegui invece lo stack Z3 o Zakura. [Guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash Improvement Proposal - il processo di governance della community utilizzato per proporre e ratificare modifiche al protocollo. [ZIP Repository](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. L'organizzazione indipendente fondata all'inizio del 2026 da Josh Swihart e dall'ex team di ingegneria di Electric Coin Company dopo le dimissioni dovute a una disputa sulla governance con Bootstrap. Ha raccolto oltre 25 milioni di dollari in finanziamenti seed a marzo 2026 e mantiene il portafoglio ZODL, rinominato da Zashi nel febbraio 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — la crittografia che alimenta le transazioni schermate di Zcash. Consente di dimostrare un'affermazione (ad esempio, una spesa valida) senza rivelare alcuna informazione segreta. |
| ZSA (Zcash Shielded Assets) | Token emessi dagli utenti che ereditano la privacy schermata di Zcash, consentendo ad asset diversi da ZEC di spostarsi privatamente sulla rete. Specificati in [ZIP 226](https://zips.z.cash/zip-0226). Non fanno parte di NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e non hanno una data di attivazione. |

---

**Ultimo aggiornamento:** Ottobre 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
