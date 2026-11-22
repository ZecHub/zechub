# Guida per sviluppatori JS di Zcash

**zcash.js** (`@zcashlabs/zcash.js`) è uno SDK sperimentale per TypeScript/JavaScript rilasciato da Zcash Labs il 26 ottobre 2026. Permette agli sviluppatori di creare portafogli, light client, dashboard e applicazioni che interagiscono con la rete di Zcash da Node.js e dal browser.

> **Stato**: sperimentale (v0.1.1). I portafogli Node persistenti richiedono attualmente Linux + `flock`. L'invio e la ricezione completi dal browser in tempo reale e la migrazione dei database dei portafogli storici non sono ancora pienamente qualificati. Controlla sempre la documentazione ufficiale prima dell'uso in produzione.

## Cosa fornisce l'SDK

- `createPublicClient` — query JSON-RPC senza stato e osservazione delle transazioni
- `createLightClient` — query e stream lightwallet (gRPC nativo su Node, gRPC-Web nel browser)
- `createWalletClient` — account locali, scansione, proposte, firma, invio e recupero dei pagamenti registrati
- Importi esatti in `bigint`, validazione della rete, strumenti di visualizzazione/indirizzi e utilità PCZT
- Motore di portafoglio di base incluso, worker e asset di proving Sapling locali (non è richiesta un'installazione separata di Rust)

## Installazione

Usa **Node.js 22.23.4** (la versione bloccata dal pacchetto).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Preferisci TypeScript con ESM (`"type": "module"` in `package.json`).
- Le applicazioni browser funzionano tramite un bundler ESM moderno. Il bundler genererà asset WASM lazy, worker e asset di proving — questi devono essere distribuiti insieme alla tua applicazione.

## Prima query sulla chain (senza portafoglio)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Se ometti l'opzione `network`, viene usata mainnet per impostazione predefinita (fornisci un endpoint corrispondente).
- Per un utilizzo puro di JSON-RPC è disponibile anche `createPublicClient`.

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

| Ambiente         | Opzione di archiviazione                            |
|------------------|-----------------------------------------------------|
| Node (persistente) | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser          | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Temporaneo       | `{ kind: 'memory' }`                                |

**Impostazioni predefinite importanti** (alla v0.1.1):

- La spesa e il resto usano solo Ironwood per impostazione predefinita
- Regola delle commissioni: ZIP-317
- Conferme: 3 fidate / 3 non fidate
- Chiama sempre `wallet.sync()` prima di proporre un pagamento

## Flusso di lavoro del portafoglio di alto livello

1. Crea o importa un account mnemonico e associa un signer
2. Chiama `wallet.sync()`
3. Richiedi un indirizzo di ricezione (preferisci Unified / Ironwood)
4. Crea una proposta → esaminala → chiama `wallet.send()`
5. Attendi la conferma oppure usa le operazioni registrate per il recupero dopo un riavvio

I byte del mnemonic appartengono all'applicazione. Cancellali dalla memoria quando non servono più. Presenta sempre una UI di approvazione chiara che mostra ogni destinatario, importo, commissione, pool e scadenza.

Vedi la procedura ufficiale [del portafoglio](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) per un esempio completo e funzionante.

## Note sulla piattaforma e limitazioni attuali

| Funzionalità          | Node                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Pacchetto             | Node 22.23.4 + ESM                | Bundler ESM moderno + WebAssembly |
| Query lightwallet     | gRPC nativo                       | gRPC-Web + CORS                  |
| Archiviazione persistente | solo Linux + `flock`          | OPFS (contesto sicuro)          |
| Archiviazione temporanea | memoria                        | memoria                          |

Limitazioni aggiuntive:

- L'archiviazione Node persistente è attualmente limitata a Linux
- Nessun vault di segreti gestito, servizio di proving remoto o integrazione di signer hardware per ora
- L'archiviazione **non** è dichiarata come crittografata a riposo
- Non aprire contemporaneamente la stessa archiviazione del portafoglio da più processi o schede del browser
- Chiudi sempre il portafoglio in modo pulito con `await wallet.close()`

## Prossimi passi

- Installazione ufficiale e prima richiesta: [Installazione](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Apertura e configurazione di un portafoglio: [Aprire un portafoglio](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Flusso di lavoro completo: [Procedura dettagliata del portafoglio](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Riferimento API: [Riferimento API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Limiti della piattaforma: [Configurazione di Node e del browser](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Risorse ufficiali

- Libro per sviluppatori: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Repository di GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Pacchetto npm: `@zcashlabs/zcash.js`


---

*Questa guida è basata su `@zcashlabs/zcash.js@0.1.1` (ottobre 2026). L'SDK è in fase di sviluppo attivo — fai sempre riferimento alla documentazione ufficiale per l'API e le limitazioni più recenti.*
