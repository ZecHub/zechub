# Zaino Indexer

Zaino è un indexer Rust per la blockchain Zcash. Legge i dati della chain da un full node (nodo completo) Zebra e fornisce i dati necessari a portafogli, explorer, faucet e altri servizi, senza rendere Zebra responsabile di tutti gli indici rivolti ai client.

## In breve

* **Zebra** valida la chain Zcash.
* **Zaino** indicizza i dati della chain di Zebra ed espone API rivolte ai client.
* **Zallet** è il componente portafoglio dello stack Z3. Nella configurazione predefinita di Z3, Zallet comunica direttamente con Zebra e non richiede il servizio autonomo Zaino.
* Il servizio autonomo Zaino è utile quando gli operatori hanno bisogno di un endpoint gRPC compatibile con lightwalletd, di un proxy JSON-RPC o di un'infrastruttura per portafogli leggeri, explorer, faucet e servizi simili.
* Zaino è un'infrastruttura attiva, ma prima di usarla in produzione gli operatori dovrebbero consultare Zaino ufficiale e la documentazione di Z3 per i dettagli aggiornati sulla distribuzione.

## Cosa fa Zaino

Zaino si trova tra Zebra e il software client. Zebra è il nodo di consenso: scarica, verifica e segue la blockchain Zcash. Zaino usa Zebra come fonte di dati della chain, quindi prepara viste indicizzate che le applicazioni client possono interrogare in modo efficiente.

Questa separazione mantiene chiari i ruoli:

| Componente | Ruolo |
|:--|:--|
| Zebra | Full node e validatore |
| Zaino | Indexer e servizio API rivolto ai client |
| Zallet | Servizio portafoglio |
| lightwalletd | Server per portafogli leggeri meno recente che Zaino è progettato per sostituire o affiancare |

Zaino fornisce funzionalità per light client, client completi o portafogli e block explorer. Consente di accedere alla chain finalizzata, alla best chain non finalizzata e ai dati della mempool conservati da Zebra.

## Come si inserisce nello stack Zcash Stack attuale

Lo stack Z3 attuale è basato su Zebra, Zallet e Zaino facoltativo.

Nella distribuzione predefinita di Z3, Zebra e Zallet vengono eseguiti insieme. Zallet comunica direttamente con Zebra, quindi un operatore che esegue solo uno stack locale per portafogli non deve avviare il servizio autonomo Zaino.

Zaino viene aggiunto quando l'operatore vuole fornire servizi a client esterni. In Z3, viene eseguito tramite il profilo Compose `indexer` e aggiunge:

* un endpoint gRPC compatibile con lightwalletd per i client di portafogli leggeri
* un proxy JSON-RPC per explorer, faucet e backend di servizi
* un database dell'indexer separato dallo stato della chain di Zebra

Per questo Zaino è particolarmente rilevante per i backend di portafogli, gli operatori di infrastrutture pubbliche, gli explorer, i faucet e gli sviluppatori che testano servizi che necessitano di dati della chain Zcash indicizzati.

## Zaino e lightwalletd

lightwalletd è il server originale per portafogli leggeri. Zaino è il percorso successore basato su Rust per questo ruolo. Il suo obiettivo è fornire API compatibili, dove possibile, così che portafogli e servizi possano migrare senza dover essere riscritti completamente tutti insieme.

Questo non significa che tutte le distribuzioni lightwalletd siano già passate a Zaino. Gli operatori dovrebbero considerare Zaino parte dello stack attuale basato su Zebra e consultare la documentazione aggiornata del progetto, le release e i dashboard dei servizi prima di scegliere cosa eseguire.

## Note per gli operatori

Il percorso di distribuzione più semplice e autorevole è il repository di Z3. Z3 include Zaino come servizio facoltativo:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Esegui prima la configurazione standard di Z3 e attendi che Zebra completi la sincronizzazione prima di avviare servizi dipendenti su mainnet o testnet.

Zaino espone due tipi di servizi di rete. Il servizio gRPC è l'API rivolta a lightwallet. Il servizio JSON-RPC è destinato a loopback o reti private fidate, a meno che un livello esterno non fornisca protezione. Non esporre su Internet un endpoint JSON-RPC non autenticato o non cifrato.

## Alcuni diagrammi che mostrano come funziona Zaino

### Architettura interna di Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Architettura del servizio live di Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Architettura di sistema di Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Errori comuni

**Considerare Zaino un full node.** Zaino non è il validatore. Zebra valida la chain; Zaino indicizza i dati provenienti da Zebra.

**Supporre che ogni distribuzione di Z3 richieda Zaino autonomo.** Nello stack Z3 predefinito, Zallet può comunicare direttamente con Zebra. Avvia Zaino quando ti serve il servizio indexer autonomo per client esterni.

**Presentare le funzionalità pianificate come già distribuite.** Zaino è in fase di sviluppo attivo, quindi consulta le note di rilascio e la documentazione aggiornate prima di descrivere una funzionalità come disponibile.

**Esporre JSON-RPC senza le dovute precauzioni.** L'interfaccia JSON-RPC di Zaino è destinata a loopback o reti private fidate, a meno che non sia protetta da un altro livello.

## Dove posso saperne di più?

* [Zaino repository di GitHub](https://github.com/zingolabs/zaino)
* [release di Zaino](https://github.com/zingolabs/zaino/releases)
* [documentazione generata di Zaino](https://zingolabs.github.io/zaino/)
* [repository di distribuzione Z3](https://github.com/ZcashFoundation/z3)
* [documentazione di Zebra](https://zebra.zfnd.org/)
* [discussione su finanziamenti e progetti di Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)
* [Zinder](/zcash-tech/zinder), un altro indexer Rust, da Zcash Foundation (alpha)

**Ultimo aggiornamento:** agosto 2026
