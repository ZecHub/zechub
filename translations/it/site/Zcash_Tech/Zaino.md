# Zaino Indexer

Zaino è un Indexer, sviluppato in Rust dal team di Zingo, che punta a sostituire lightwalletd e a portare avanti il progetto di deprecazione di zcashd.

Zaino offre funzionalità essenziali sia per i light client, come wallet e applicazioni che non richiedono l'intera cronologia della blockchain, sia per i client completi o wallet. Supporta anche i block explorer, dando accesso sia alla blockchain finalizzata che alla miglior catena non finalizzata e alla mempool gestiti da un validatore completo Zebra o Zcashd.

## Perché un nuovo Indexer?

Il motivo principale è prepararsi per il futuro. Zcashd e lightwalletd sono stati creati nel 2016 come fork del codice di bitcoind, usando C plus. La piattaforma e il codice usati per costruire entrambi i servizi stanno iniziando a diventare vecchi, difficili da scalare, mantenere e su cui costruire funzionalità moderne.

Rust è un linguaggio moderno, robusto e sicuro che permette a Zcash di essere pronta per lo sviluppo futuro, invitando nuovi sviluppatori a costruire tante nuove funzionalità su e intorno all'ecosistema Zcash.

Inoltre, Zaino mira a essere retrocompatibile dove possibile, fornendo API e interfacce che aiutano a ridurre gli attriti nell'adozione e assicurano che l'ecosistema Zcash più ampio possa beneficiare dei miglioramenti di Zaino senza riscritture significative o curve di apprendimento.

Inoltre, Zaino permetterà di separare le funzionalità del light client dal nodo completo, tramite accesso RPC e una libreria client completa, consentendo agli sviluppatori di integrare Zaino e accedere ai dati della catena direttamente dalla loro applicazione light client, mantenendo i dati sensibili del nodo Zebra isolati e sicuri.

## Alcuni diagrammi che mostrano come funziona Zaino

### Architettura Interna di Zaino
![Architettura Interna di Zaino](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Architettura del Servizio Live di Zaino
![Architettura del Servizio Live di Zebra](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Architettura di Sistema di Zaino
![Architettura di Sistema di Zaino](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Dove posso saperne di più?
Puoi leggere di più su Zaino Indexer nel [thread ufficiale del forum della comunità Zcash](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) o nella sua [pagina Github ufficiale](https://github.com/zingolabs/zaino)
