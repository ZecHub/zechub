# Zcash Libreria

Un glossario completo dei termini, dei concetti e delle risorse chiave relativi a Zcash. Questa è la libreria di riferimento per cercare termini nelle note di rilascio, nelle discussioni del forum o nei changelog dei portafogli.

### Navigazione rapida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Termine | Definizione |
|------|-----------|
| Actions | Invece di creare diverse prove individuali per ogni Spend e Output, il protocollo Orchard le unisce in una singola Action. |
| Addresses | Zcash ha indirizzi schermati (zaddr) e trasparenti (taddr). Gli indirizzi unificati (UA) raggruppano diversi tipi di receiver, così il portafoglio mittente può scegliere quello migliore supportato da entrambe le parti. Specificati in [ZIP 316](https://zips.z.cash/zip-0316). [Indirizzi unificati](/zcash-tech/unified-addresses) |
| Arborist Call | Una chiamata bisettimanale che tratta gli aggiornamenti sullo sviluppo del protocollo e della ricerca di Zcash. Si tiene sul forum della community di Zcash e su Discord. [Note della riunione](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Annunci sul forum](https://forum.zcashcommunity.com) |
| Auto-shielding | Consente agli utenti, più precisamente ai loro portafogli, di spostare automaticamente i fondi da un indirizzo trasparente alla pool schermata più recente di ZEC. |

## B

| Termine | Definizione |
|------|-----------|
| Benchmarking | I miner possono inviare metriche sull'efficienza dei diversi hardware usati per minare Zcash. [Visualizza qui](https://zcashbenchmarks.info) |
| Block | Un blocco è un record nella blockchain di Zcash che contiene un insieme di transazioni inviate sulla rete. In media, circa ogni 25 secondi viene aggiunto un nuovo blocco alla blockchain (75 secondi prima dell'attivazione di NU7 nel novembre 2026). |
| Block Explorer | Uno strumento online per visualizzare tutte le transazioni, passate e presenti, sulla blockchain. [Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (precedentemente Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Newsletter](https://zechub.substack.com/) |
| Blossom | Il 3º aggiornamento di rete principale per Zcash. [Ulteriori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Termine | Definizione |
|------|-----------|
| Canopy | Il 5º aggiornamento di rete principale per Zcash. [Ulteriori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Consente a chi effettua il commitment di impegnarsi su un polinomio con una stringa breve, che un verificatore può usare per confermare le valutazioni dichiarate del polinomio. È utile per ridurre i costi di comunicazione nel protocollo Zcash. |
| Community | [Il forum ufficiale della community di Zcash](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Un progetto di consenso ibrido proposto, che affiancherebbe il proof of stake al proof of work già esistente di Zcash. Shielded Labs coordina il lavoro e gestisce una rete di test, la Feature Net, dal repository `crosslink_monolith`. Il precedente repository del prototipo `zebra-crosslink` è stato ritirato nel novembre 2026. Oggi Crosslink non fa parte di Zcash. [Protocollo Crosslink](/zcash-tech/crosslink-protocol) |
| CrossPay | Una funzionalità del portafoglio ZODL che ti consente di spendere ZEC schermati mentre il destinatario riceve il pagamento nell'asset e sulla chain che preferisce, tramite NEAR Intents anziché un exchange centralizzato. |
| Cypherpunk Zero | Un universo creativo e un progetto collaborativo tra ECC, l'illustratore Stranger Wolf, Mighty Jaxx e alcuni partner dell'ecosistema. [Cypherpunk Zero sui social](https://x.com/cypherpunkZero) / [OpenSea Collezione](https://opensea.io/collection/cypherpunk-zero) |

## D

| Termine | Definizione |
|------|-----------|
| DeFi | Progetti che integrano ZEC con la DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Indica una transazione inviata da uno zaddr (indirizzo schermato) a un taddr (indirizzo trasparente). L'origine della transazione non è visibile, ma i fondi entrano in una pool di valore visibile pubblicamente. |
| Developer Resources | [Risorse per sviluppatori](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentazione ufficiale](https://zcash.readthedocs.io/en/latest/) |

## E

| Termine | Definizione |
|------|-----------|
| ECC | La Electric Coin Company, il team che ha lanciato il protocollo Zcash, precedentemente noto come Zcash Company. Tutto il team di ingegneria si è dimesso nel gennaio 2026 in seguito a una disputa sulla governance con il consiglio di Bootstrap, per poi fondare ZODL. |
| ECDSA | L'algoritmo di firma digitale a curva ellittica è uno schema di firma digitale sicuro dal punto di vista crittografico. L'algoritmo di firma e verifica ECDSA si basa sulla moltiplicazione dei punti su curva ellittica. |
| Education | Video didattici che spiegano Zcash [qui](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Un campo aggiuntivo per le transazioni inviate a indirizzi schermati, visibile al destinatario di un pagamento. Il memo crittografato è visibile solo al mittente e al destinatario. |
| Equihash | L'algoritmo di mining proof-of-work a elevato uso di memoria utilizzato su Zcash. |
| Events | Il calendario degli eventi relativi a Zcash è disponibile su [Luma](https://luma.com/zcash) e [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Elenco degli exchange che supportano Zcash](https://z.cash/exchanges/) |

## F

| Termine | Definizione |
|------|-----------|
| Fiat-Shamir | Una tecnica che trasforma una prova interattiva di conoscenza in una firma digitale basata su di essa. In questo modo, puoi dimostrare pubblicamente un fatto, per esempio la conoscenza di un segreto, senza rivelare le informazioni sottostanti. |
| Formal Verification | Dimostrare matematicamente che un sistema si comporta esattamente come specificato, anziché affidarsi solo ai test. Il circuito Action di Ironwood è stato verificato in questo modo da collaboratori di zkSecurity e ZODL usando il dimostratore di teoremi Lean, per dimostrare l'assenza di bug di soundness. |
| Founders Reward | La ricompensa dei fondatori rappresenta il 20 percento della ricompensa totale per blocco: viene detratta dal valore di ogni blocco e distribuita in modo trasparente per promuovere lo sviluppo e la crescita del protocollo. |
| Free2Z | Uno strumento per contenuti anonimi e donazioni private basato su Zcash. [Free2Z](https://free2z.com) |
| FROST | Schema di firma a soglia Flexible Round-Optimized Schnorr. [Articolo di ricerca](https://eprint.iacr.org/2020/852) |

## G

| Termine | Definizione |
|------|-----------|
| Governance | Le decisioni del processo ZIP vengono incorporate nella specifica Zcash e nel software che gestisce la rete. Le modifiche sono ratificate on-chain quando la maggioranza della rete adotta l'aggiornamento senza compromettere il consenso. [Cronologia completa del protocollo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Termine | Definizione |
|------|-----------|
| Halo | Consente di aggiornare i circuiti senza ricorrere a trusted setup, rendendo il protocollo schermato Zcash più flessibile per futuri miglioramenti ed estensioni. [Spiegazione tecnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | I portafogli deterministici gerarchici generano una serie di coppie di chiavi a partire da un singolo seed, offrendo praticità, semplicità di gestione e un elevato livello di sicurezza. |
| Heartwood | Il 4º aggiornamento di rete principale di Zcash. [Ulteriori informazioni](https://z.cash/upgrade/heartwood/) |

## I

| Termine | Definizione |
|------|-----------|
| Index | L'indice ZCX di CoinDesk rappresenta il tasso spot in tempo reale, equivalente in USD, di Zcash. [Indice dei prezzi](https://www.coindesk.com/indices/zcx/) |
| Integrations | Puoi accettare pagamenti in Zcash tramite diversi fornitori di terze parti. [Servizi di elaborazione dei pagamenti](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Una macchina astratta che modella il calcolo come scambio di messaggi tra due parti: un Prover e un Verifier. |
| Investment | Sono disponibili diverse opzioni finanziarie per investitori istituzionali o family office che vogliono esporsi a Zcash. [Elenco completo](https://z.cash/investors/) |
| Ironwood | Aggiornamento di rete NU6.3, attivo sulla mainnet dal blocco 3.428.143 del 28 luglio 2026. Ironwood introduce una nuova pool schermata basata sul circuito Orchard corretto e chiude la pool Orchard originale, così chiunque può verificare che l'offerta circolante sia corretta. Le regole di consenso sono specificate in [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Termine | Definizione |
|------|-----------|
| JubJub | Una curva ellittica progettata per essere implementata in modo efficiente nei circuiti zk-SNARK. |

## K

| Termine | Definizione |
|------|-----------|
| Keystone Wallet | Un portafoglio hardware air-gapped con supporto nativo a Zcash (Orchard schermato), compatibile con ZODL per la firma offline. [Keystone](https://keyst.one) |

## L

| Termine | Definizione |
|------|-----------|
| Layer-1 | Indica una rete di base e la relativa infrastruttura sottostante. Le blockchain Layer-1 possono convalidare e finalizzare le transazioni senza bisogno di un'altra rete. Zcash è una blockchain L1. |
| librustzcash | Uno spazio di lavoro Rust che contiene tutte le crate e le dipendenze necessarie per lavorare con Zcash. [repository](https://github.com/zcash/librustzcash) |
| lightwalletd | Un server stateless che fornisce ai light client informazioni sulla blockchain. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Termine | Definizione |
|------|-----------|
| Metrics | Le metriche della rete sono disponibili [qui](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Dati generati insieme alla transazione di Zcash di un utente. Possono includere l'altezza del blocco, la versione della transazione o l'altezza di scadenza e così via. |
| Mobile SDK | Un SDK leggero che collega Android a Zcash, consentendo alle app Android di terze parti di inviare e ricevere transazioni schermate. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Il processo in cui, per ogni blocco, i nodi della rete Zcash competono eseguendo complessi calcoli matematici per trovare una soluzione basata su una difficoltà che si adegua automaticamente. [Guida](https://z.cash/mining-zcash/) |
| Multisignature | Un indirizzo che richiede più firme di chiavi private per spendere i fondi. Attualmente, la funzionalità multisig è supportata solo dagli indirizzi trasparenti. |

## N

| Termine | Definizione |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Una proposta di Shielded Labs per bruciare una parte delle commissioni di transazione, in modo che il budget di sicurezza a lungo termine del protocollo non dipenda interamente dall'emissione. Specificato in ZIP 234, in fase di revisione nel 2026. |
| Nighthawk | Un ex portafoglio mobile Zcash di Nighthawk Apps. I suoi portafogli Zcash non sono più mantenuti e Nighthawk Wallet 3.0 è stato sviluppato per DarkFi. Per spostare i fondi da un vecchio seed Nighthawk, consulta [Recupero dei fondi](/using-zcash/recovering-funds). |
| Noir Wallet | Un portafoglio sotto forma di estensione per browser Zcash, supportato da Zcash Community Grants, progettato per collegare direttamente gli ZEC schermati alle applicazioni del browser, senza affidarsi a codici QR e trasferimenti manuali. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Il 6º aggiornamento di rete principale per Zcash, che introduce la pool schermata Orchard e gli indirizzi unificati. [Ulteriori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Il 7º aggiornamento di rete principale per Zcash, che modifica il sussidio per blocco per finanziare il programma Zcash Community Grants e il Deferred Dev Fund Lockbox. Attivato a fine 2024. [Ulteriori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | L'aggiornamento di rete successivo a Ironwood, attivato sulla mainnet all'altezza 3.543.405 il 6 novembre 2026 (UTC). Secondo [ZIP 259](https://zips.z.cash/zip-0259), introduce blocchi di 25 secondi (ZIP 218), il Meccanismo di sostenibilità della rete con riciclo delle commissioni (ZIP 235 e 237) e la fine delle transazioni di versione 4, che rende impossibile spendere i fondi Sprout (ZIP 2003). Non introduce nuovi formati di transazione; Tachyon e gli Shielded Assets di Zcash non ne fanno parte. |

## O

| Termine | Definizione |
|------|-----------|
| Oblivious Synchronization | Un metodo in fase di sviluppo nel progetto Tachyon che permette a un portafoglio di richiedere i dati di cui ha bisogno a un server non attendibile senza rivelare quali note sta cercando. Il server non scopre mai i tuoi nullifier, perché il protocollo li fa evolvere in modo non collegabile. [Approfondimento](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | La pool schermata introdotta in NU5. Ironwood l'ha sigillata dopo che è stato scoperto un bug di soundness, quindi non puoi più inviare o ricevere all'interno di Orchard. I fondi escono solo attraverso il turnstile (tornello). [Pool schermate](/using-zcash/shielded-pools) |
| Overwinter | Il primo aggiornamento di rete per Zcash. [Maggiori informazioni](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Termine | Definizione |
|------|-----------|
| Payments | Puoi usare Zcash per gli acquisti quotidiani tramite diversi fornitori di servizi di pagamento. [App di pagamento](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Una primitiva in cui i dati viaggiano insieme a una prova della loro correttezza, così combinare i dati significa combinare anche le prove. Il progetto Tachyon ricostruisce il protocollo schermato attorno a PCD, consentendo a ogni portafoglio di contenere una prova ricorsiva della correttezza del proprio saldo, invece di dover scansionare nuovamente la chain. L'implementazione Zcash è [Ragu](https://github.com/tachyon-zcash/ragu), segue Halo e non richiede trusted setup. |
| Peer-to-Peer Network | Le reti P2P si basano sul concetto di decentralizzazione. Sono l'architettura fondamentale della tecnologia blockchain. |
| PIR (Private Information Retrieval) | Tecniche che ti consentono di recuperare un record da un server senza che il server sappia quale record hai richiesto. È un ambito di ricerca attiva per Zcash, per consentire ai portafogli leggeri di recuperare ciò che serve senza rivelare cosa stanno cercando. |
| Podcast | [Radiolab (cerimonia Zcash)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Termine | Definizione |
|------|-----------|
| QR Code | Codice leggibile da una macchina, usato per codificare gli indirizzi Zcash e facilitarne la scansione. Gli indirizzi unificati (UA) vengono in genere condivisi tramite codici QR nei moderni portafogli Zcash. |
| Quantum Recoverability | Proprietà delle note Ironwood, specificata in [ZIP 2005](https://zips.z.cash/zip-2005), che permette di recuperare il record on-chain di una moneta se in futuro un computer quantistico compromette la crittografia che la protegge oggi. È una via di recupero, non una forma di resistenza quantistica, e si applica alle note Ironwood, non ai fondi Sprout, Sapling o Orchard esistenti. |

## R

| Termine | Definizione |
|------|-----------|
| Recovery Phrase | Sequenza di 12 o 24 lettere e numeri usata per fare il backup e ripristinare un portafoglio. In Zcash, questa frase rigenera le chiavi di spesa e di visualizzazione, quindi è fondamentale per recuperare i fondi e garantirne la sicurezza. |

## S

| Termine | Definizione |
|------|-----------|
| Sapling | Importante aggiornamento di rete che ha introdotto notevoli miglioramenti di efficienza per le transazioni schermate e ha aperto la strada all'adozione sui dispositivi mobili. Attivato al blocco 419200. |
| Selective Disclosure | Permette al proprietario di un indirizzo schermato di condividere selettivamente chiavi di visualizzazione o dettagli dei pagamenti con terze parti, mantenendo privati i dati per tutti gli altri. |
| Shielded Address | Chiamato anche zaddr. Inizia con z. Nasconde mittente, destinatario, importo e memo usando zk-SNARKs. |
| Shielded Labs | Organizzazione indipendente che lavora sull'economia del protocollo Zcash e sul consenso. Attualmente guida Crosslink e il Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Transazione tra soli indirizzi schermati. Completamente privata sulla blockchain. |
| Sol/s | Soluzioni al secondo: misura le prestazioni del mining di Equihash. |
| Spending Key | Chiavi private che permettono di spendere da un indirizzo schermato (e anche di visualizzare il saldo e la cronologia). |
| Sprout | La versione originale del protocollo schermato di Zcash (lanciata nel 2016). |

## T

| Termine | Definizione |
|------|-----------|
| Tachyon | Il programma di scalabilità di Zcash. Non fa parte di NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e non ha una data di attivazione. Sposta i portafogli dalla scansione di ogni blocco verso uno stato del portafoglio corredato di prove, la sincronizzazione cieca (Oblivious Synchronization) e lo stato potabile dei nodi, con l'obiettivo di raggiungere migliaia di transazioni al secondo per le transazioni schermate. [Sito del progetto](https://tachyon.z.cash/overview/) |
| TAZ | Zcash della testnet (valuta di test senza valore). |
| Testnet | Blockchain separata per provare aggiornamenti e funzionalità prima che arrivino sulla mainnet. |
| Trailing Finality Layer (TFL) | Ricerca sull'aggiunta di un livello di finalità dietro la chain proof-of-work di Zcash, affinché i blocchi recenti possano essere finalizzati senza sostituire il mining. Crosslink è il design che ne è derivato. |
| Transaction | Pagamento tra utenti, inviato alla rete e infine confermato in un blocco. |
| Transaction Expiry | Limite di altezza del blocco entro il quale un pagamento non minato può essere incluso. Un pagamento ordinario con altezza di scadenza N diversa da zero può essere minato nel blocco N o in uno precedente, ma non in N+1. Un'altezza pari a 0 disattiva la scadenza. Non si tratta di un timer per il rimborso automatico. [ZIP 203](https://zips.z.cash/zip-0203) |
| Transaction Fee | La commissione predefinita è 0,0001 ZEC. Le commissioni più alte danno priorità, mentre quelle molto basse possono causare ritardi o la scadenza. |
| Transparent Address | Chiamato anche taddr. Inizia con t. È completamente pubblico (come Bitcoin). |
| Transparent Transaction | Transazione tra soli indirizzi trasparenti: tutto è visibile pubblicamente. |
| Turnstile | Regola contabile che tiene traccia del valore che entra ed esce da ogni pool schermata, così nessuna pool può rilasciare più valore di quello che vi è entrato. È stato usato a ogni passaggio tra pool nella storia di Zcash e ora protegge la migrazione da Orchard a Ironwood. [Maggiori informazioni](/zcash-tech/the-turnstile) |

## U

| Termine | Definizione |
|------|-----------|
| Unified Address | Formato di indirizzo moderno (introdotto in NU5) che permette pagamenti trasparenti e schermati con un'unica stringa. |
| Upgrade Activation | Altezza specifica del blocco alla quale si attiva automaticamente un aggiornamento di rete (ad esempio NU5, NU6). |

## V

| Termine | Definizione |
|------|-----------|
| Viewing Key | Chiave privata che permette di visualizzare il saldo e la cronologia delle transazioni di un indirizzo schermato senza poter spendere i fondi. |

## W

| Termine | Definizione |
|------|-----------|
| Wallet | Software o dispositivo hardware che conserva le chiavi private e ti permette di inviare e ricevere ZEC. Tra i portafogli attivi ci sono ZODL (iOS/Android), Zingo! (dispositivi mobili/desktop), Zkool (dispositivi mobili/desktop), Zallet (portafoglio full node, in beta) e Keystone (hardware). Per un elenco completo, consulta [Zcash Portafogli dell'ecosistema](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | Il primo SDK JavaScript per Zcash, realizzato da ChainSafe per gli ambienti browser. È alla base dello snap Zcash Shielded Wallet, che ha portato i ZEC schermati su MetaMask. |

## X

| Termine | Definizione |
|------|-----------|
| XZC | Vecchio simbolo ticker di Zcash, usato su alcuni exchange legacy. Il ticker ufficiale è ZEC. |

## Y

| Termine | Definizione |
|------|-----------|
| YWallet | Portafoglio Zcash incentrato sulla privacy, compatibile con Orchard, Sapling e gli indirizzi trasparenti, noto per la sincronizzazione rapida. Non è più mantenuto: il suo sviluppatore ha confermato che non verrà aggiornato per Ironwood, quindi non può più seguire la rete. Zkool, dello stesso sviluppatore, è il successore mantenuto. |

## Z

| Termine | Definizione |
|------|-----------|
| Zcash | Criptovaluta incentrata sulla privacy che usa zk-SNARKs. Unisce i pagamenti trasparenti (stile Bitcoin) a quelli completamente schermati. |
| Zcash Foundation | Organizzazione non profit indipendente che sostiene l'ecosistema di Zcash, finanzia lo sviluppo e promuove la privacy. |
| Zcash Network | Rete peer-to-peer di nodi che convalida le transazioni e mantiene la blockchain. |
| ZEC | Codice valuta ufficiale di Zcash (alcuni exchange mostrano ancora XZC). |
| Z3 stack | I tre programmi che insieme sostituiscono zcashd: Zebra per il nodo, Zaino per l'indicizzazione, Zallet per il portafoglio. [Stack Z3](/zcash-tech/z3-stack) |
| Zerocash | Protocollo accademico del 2014 su cui si basa Zcash. |
| Zaino | Indicizzatore che fornisce i dati del portafoglio da un nodo Zebra, scritto in Rust da Zingo Labs. Si occupa dell'indicizzazione che zcashd svolgeva per i portafogli leggeri. [Zaino](/zcash-tech/zaino) |
| Zakura | Full node Zcash indipendente, progettato per la scalabilità e guidato da Sean Bowe e Dev Ojha. Si sincronizza più rapidamente, elimina i blocchi in modo nativo e può eseguire zcashd al suo interno per i software che dipendono ancora da esso. [Zakura nodo](/zcash-tech/zakura-node) |
| Zallet | Il portafoglio che sostituisce il portafoglio zcashd. Trasferisci un `wallet.dat` esistente invece di ricominciare da capo. [Zallet](/zcash-tech/zallet) e la guida rapida di [Zallet](/using-zcash/zallet-quick-reference-guide) |
| Zebra | Il full node che sostituisce zcashd, mantenuto da Zcash Foundation. Eseguilo se ti serve un nodo validatore. [Zebra full node](/zcash-tech/zebra-full-node) |
| zcashd | Il full node e portafoglio originale di Zcash, ormai ritirato. La versione 6.20.0 si è arrestata al blocco 3417100 il 18 luglio 2026 e non ha mai supportato NU6.3. Usa lo stack Z3 o Zakura. [Guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Proposta di miglioramento Zcash: processo di governance della community usato per proporre e ratificare modifiche al protocollo. [ZIP Repository](https://github.com/zcash/zips) |
| ZODL | Open Development Lab Zcash. Organizzazione indipendente fondata all'inizio del 2026 da Josh Swihart e dal precedente team di ingegneria Electric Coin Company, dopo le dimissioni dovute a una disputa sulla governance con Bootstrap. Nel marzo 2026 ha raccolto oltre 25 milioni di dollari in finanziamenti seed e mantiene il portafoglio ZODL, rinominato da Zashi nel febbraio 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Argomenti di conoscenza succinti, non interattivi e a conoscenza zero: la crittografia alla base delle transazioni schermate di Zcash. Permettono di dimostrare un'affermazione (ad esempio, una spesa valida) senza rivelare informazioni segrete. |
| ZSA (Zcash Shielded Assets) | Token emessi dagli utenti che ereditano la privacy schermata di Zcash e consentono ad asset diversi da ZEC di circolare privatamente sulla rete. Specificati in [ZIP 226](https://zips.z.cash/zip-0226). Non fanno parte di NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e non hanno una data di attivazione. |

---

**Ultimo aggiornamento:** ottobre 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
