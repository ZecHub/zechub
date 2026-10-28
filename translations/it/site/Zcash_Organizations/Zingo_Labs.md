#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Sito web ufficiale](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs è un team di visionari dedito a migliorare l'esperienza umana. Crediamo che la tecnologia debba portare benefici all'umanità e che prosperiamo attraverso interazioni consensuali. Stiamo identificando i modelli che rendono possibile tutto questo.

Zingo Lab Cyan opera come una DAO schermata. Conserviamo i nostri fondi in una tesoreria in cui ogni membro ha una chiave di visualizzazione. I fondi vengono spesi dalla tesoreria quando i membri votano a favore di una proposta.

## Progetti

### Zingo! Portafoglio ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet è un portafoglio di Zcash completo progettato per essere facile da usare, sebbene includa alcune funzionalità avanzate per utenti più esperti. Supporta le pool trasparenti, Sapling e Ironwood, dispone di una rubrica per i pagamenti ricorrenti ed è disponibile in varie lingue. È stato il primo portafoglio a supportare Orchard e a implementare i formati NU5.

Una delle funzionalità principali di Zingo! è la sua capacità di usare il campo Memo per offrire informazioni preziose sulle tue transazioni.

Zingo! è disponibile per dispositivi mobili e PC. Troverai tutti i download [qui](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Un'API e un'app di test che espone le funzionalità di zcash per l'utilizzo da parte delle app. Zingolib fornisce sia una libreria per zingo-mobile sia un'applicazione cli inclusa chiamata zingo-cli, un portafoglio light da riga di comando che comunica con un indicizzatore della chain come [Zaino](/zcash-tech/zaino).

### Zaino Indicizzatore ([GitHub](https://github.com/zingolabs/zaino))
Zaino è un indicizzatore Rust per la blockchain di Zcash, sviluppato dal team di Zingo. È l'indicizzatore nello [stack Z3](/zcash-tech/z3-stack): indicizza i dati della chain da un validatore [Zebra](/zcash-tech/zebra-full-node) e serve portafogli, explorer e altri client. È il percorso successore di lightwalletd.

Zaino offre funzionalità essenziali sia per i light client, come portafogli e applicazioni che non richiedono l'intera cronologia della blockchain, sia per client o portafogli completi. Supporta inoltre i block explorer, consentendo l'accesso sia alla blockchain finalizzata sia alla migliore chain non finalizzata e alla mempool gestite da un validatore completo Zebra.

`zcashd` ha raggiunto l'interruzione del supporto il 18 luglio 2026 al blocco 3.417.100 e non supporta Ironwood (NU6.3). Zaino legge un validatore Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Un insieme di utilità che avviano e gestiscono processi di Zcash. Viene utilizzato per i test di integrazione nello sviluppo di:
- light client
- indicizzatori
- validatori

Il suo obiettivo è offrire un ambiente di test altamente adattabile e robusto per nodi principali (validatori) come Zebra, indicizzatori come Zaino e portafogli light client come zingo-cli.

Lo stack predefinito che avvia è Zebrad, zainod e zcash-devtool. I processi legacy `zcashd` e lightwalletd si trovano dietro una funzionalità `legacy-stack` non supportata e sono previsti per la rimozione.

Oltre a fornire strumenti per avviare, memorizzare nella cache e caricare i dati della chain di Zcash (per mainnet, testnet e regtest), zcash-local-net viene utilizzato dalla suite di test di Zaino per valutare i servizi RPC Lightwallet ospitati in Zaino (consulta la documentazione sui test di [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
