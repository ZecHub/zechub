# Zcash Guida per sviluppatori JS

**zcash.js** (`@zcashlabs/zcash.js`) è un SDK sperimentale per TypeScript/JavaScript pubblicato da Zcash Labs il 26 ottobre 2026. Consente agli sviluppatori di creare portafogli, light client, dashboard e applicazioni che interagiscono con la rete di Zcash da Node.js e dal browser.

> **Stato**: sperimentale (v0.1.1). I portafogli Node persistenti richiedono attualmente Linux + `flock`. L'invio/ricezione completo nel browser live e la migrazione storica del database del portafoglio non sono ancora pienamente qualificati. Controlla sempre la documentazione ufficiale prima dell'uso in produzione.

## Cosa fornisce l'SDK

- `createPublicClient` — query JSON-RPC senza stato e osservazione delle transazioni
- `createLightClient` — query e stream lightwallet (gRPC nativo su Node, gRPC-Web nel browser)
- `createWalletClient` — account locali, scansione, proposte, firma, invio e recupero dei pagamenti registrati
- Importi `bigint` esatti, convalida della rete, strumenti per viewing/indirizzi e utilità PCZT
- Motore di portafoglio di base incluso, worker e asset locali per la generazione delle prove Sapling (non è richiesta un'installazione separata di Rust)

## Installazione

Usa **Node.js 22.23.4** (la versione fissata dal pacchetto).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Preferisci TypeScript con ESM (`"type": "module"` in `package.json`).
- Le applicazioni browser funzionano tramite un moderno bundler ESM. Il bundler produrrà asset WASM, worker e per la generazione delle prove caricati in modo differito: devi distribuirli insieme alla tua applicazione.

## Prima query della chain (senza portafoglio)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Omettendo l'opzione `network` viene usata mainnet per impostazione predefinita (fornisci un endpoint corrispondente).
- Per l'uso JSON-RPC puro è disponibile anche un `createPublicClient`.

## Apertura di un portafoglio

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Opzioni di archiviazione

| Ambiente     | Opzione di archiviazione                                      |
|-----------------|-----------------------------------------------------|
| Node (durevole)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Temporanea      | `{ kind: 'memory' }`                                |

**Impostazioni predefinite importanti** (alla v0.1.1):

- La spesa e il resto sono solo Ironwood per impostazione predefinita
- Regola delle commissioni: ZIP-317
- Conferme: 3 attendibili / 3 non attendibili
- Chiama sempre `wallet.sync()` prima di proporre un pagamento

## Flusso di lavoro del portafoglio di alto livello

1. Crea o importa un account mnemonico e collega un firmatario
2. Chiama `wallet.sync()`
3. Richiedi un indirizzo di ricezione (preferisci Unified / Ironwood)
4. Crea una proposta → esaminala → chiama `wallet.send()`
5. Attendi la conferma oppure usa le operazioni registrate per il recupero dopo un riavvio

L'applicazione gestisce i byte mnemonici. Cancellali dalla memoria quando non sono più necessari. Mostra sempre un'interfaccia di approvazione chiara che riporti ogni destinatario, importo, commissione, pool e scadenza.

Consulta la procedura ufficiale di [Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) per un esempio completo e funzionante.

## Note sulle piattaforme e limitazioni attuali

| Funzionalità            | Node                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Pacchetto               | Node 22.23.4 + ESM                | Bundler ESM moderno + WebAssembly |
| Query light         | gRPC nativo                       | gRPC-Web + CORS                  |
| Archiviazione durevole       | Linux + `flock` solo              | OPFS (contesto sicuro)            |
| Archiviazione temporanea    | memoria                            | memoria                           |

Limitazioni aggiuntive:

- L'archiviazione persistente su Node è attualmente solo Linux
- Non sono ancora disponibili un archivio gestito dei segreti, un servizio remoto per la generazione delle prove o l'integrazione con firmatari hardware
- L'archiviazione **non** viene dichiarata come crittografata a riposo
- Non aprire contemporaneamente la stessa archiviazione del portafoglio da più processi o schede del browser
- Chiudi sempre correttamente il portafoglio con `await wallet.close()`

## Passaggi successivi

- Installazione ufficiale e prima richiesta: [Installazione](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Apertura e configurazione di un portafoglio: [Apri un portafoglio](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Flusso di lavoro completo: [Procedura del portafoglio](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Riferimento API: [Riferimento API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Limiti delle piattaforme: [Configurazione di Node e browser](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Risorse ufficiali

- Libro per sviluppatori: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Repository di GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Pacchetto npm: `@zcashlabs/zcash.js`


---

*Questa guida si basa su `@zcashlabs/zcash.js@0.1.1` (ottobre 2026). L'SDK è in sviluppo attivo: consulta sempre la documentazione ufficiale per le API e le limitazioni più recenti.*
