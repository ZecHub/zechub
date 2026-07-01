#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt Text" width="50"/> ZingoLabs

[Sito ufficiale](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs è un team di visionari dedicato a migliorare l'esperienza umana. Crediamo che la tecnologia debba andare a beneficio dell'umanità e che si prosperi attraverso interazioni consensuali. Stiamo individuando gli schemi che rendono tutto questo possibile.

Zingo Lab Cyan opera come una Shielded DAO. Conserviamo i nostri fondi in una tesoreria in cui ogni membro possiede una view key. I fondi vengono spesi dalla tesoreria quando i membri votano a favore di una proposta.

## Progetti

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet è un wallet Zcash completo, progettato per essere facile da usare, pur includendo alcune funzionalità avanzate per gli utenti più esperti. Supporta i pool transparent, Sapling e Orchard, dispone di una rubrica per i pagamenti ricorrenti ed è disponibile in diverse lingue. È stato il primo wallet a supportare Orchard e a implementare i formati NU5.

Una delle principali funzionalità di Zingo! è la capacità di utilizzare il campo Memo per offrire informazioni preziose sulle tue transazioni.

Zingo! è disponibile per dispositivi mobili e PC. Trovi tutti i download [qui](https://zingolabs.org/)

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
Un'API e un'app di test che espongono le funzionalità di zcash per l'utilizzo da parte delle applicazioni. Zingolib fornisce sia una libreria per zingo-mobile, sia un'applicazione cli inclusa per interagire con zcashd tramite lightwalletd chiamata Zingo-cli, un client proxy-lightwalletd da riga di comando.

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino è un Indexer sviluppato in Rust dal team Zingo, che mira a sostituire lightwalletd e a portare avanti il progetto di deprecazione di zcashd.

Zaino offre funzionalità essenziali sia per i light client, come wallet e applicazioni che non richiedono l'intera cronologia della blockchain, sia per i full client o wallet. Supporta inoltre i block explorer, garantendo l'accesso sia alla blockchain finalizzata sia alla migliore catena non finalizzata e alla mempool gestite da un full validator Zebra o Zcashd.

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
Un insieme di utility che avviano e gestiscono i processi Zcash. Viene utilizzato per i test di integrazione nello sviluppo di:
- lightclient
- indexer
- validator

Il suo obiettivo è offrire un ambiente di test altamente adattabile e robusto per i nodi core (validator) come zcash e zebra, gli indexer come lightwallet e zaino e, come minimo, zingo-cli come light client wallet.

Questo repository è progettato per confrontare le funzionalità di vari validator (come Zcashd e Zebrad) e indexer (come Lightwalletd e Zaino) al fine di facilitare la migrazione durante il processo di deprecazione di Zcashd.

Oltre a fornire strumenti per avviare, memorizzare nella cache e caricare i dati della catena Zcash (per mainnet, testnet e regtest), zcash-zocal-net include una serie di test per confrontare le capacità di Lightwalletd e Zaino su tutti i servizi RPC Lightwallet. Questi test possono essere eseguiti direttamente da Zaino (vedi [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]) per valutare i servizi RPC Lightwallet ospitati in Zaino.
