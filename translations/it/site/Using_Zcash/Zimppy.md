<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** è un'infrastruttura di pagamento privacy-first per agenti AI che utilizza il Machine Payment Protocol (MPP) di Zcash
- **Deposita una volta** sulla catena (~75 secondi), quindi effettua **richieste istantanee illimitate** senza interazione con la blockchain per ogni richiesta
- Supporta i pagamenti **fully shielded Zcash (Orchard)** - il mittente, il destinatario, l'importo e il memo sono tutti crittografati
- Funziona con **TypeScript e Rust SDKs** per una facile integrazione in pipeline AI e server API
- Perfetto per **LLM API, mercati di dati, server di strumenti MCP** e qualsiasi caso d'uso di pagamento M2M

---

> **Zimppy** è il metodo di pagamento Machine Payment Protocol (MPP) per Zcash che supporta sia pagamenti shielded che Transparent. Deposita una volta sulla catena, poi fai richieste istantanee illimitate al portatore senza alcuna interazione con la catena per ogni richiesta.

---

## Indice dei contenuti

1. [Cos'è Zimppy.xyz? ](#what-is-zimppyxyz)
2. [Perché i pagamenti Shielded per gli agenti AI? ](#why-shielded-payments-for-ai-agents)
3. [Protocollo di pagamento automatico (MPP)](#machine-payment-protocol-mpp)
4. [Come funziona Zimppy Works](#how-zimppy-works)
   - [Sessioni (consigliate)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Casi d'uso e Examples](#use-cases--examples)
6. [Installation](#installation)
7. [Impostazione di Zimppy Wallet](#setting-up-the-zimppy-wallet)
8. [Integrazione Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (Shielded)](#typescript-server--shielded)
   - [Server (Transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Integrazione di Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [CLI Reference](#cli-reference)
11. [Chiave Features](#key-features)
12. [Architecture](#architecture)
13. [Esempi e Demos](#examples--demos)

---

## Cos'è Zimppy.xyz?

**Zimppy.xyz** è un'infrastruttura di pagamento privacy-first progettata appositamente per gli agenti AI e i flussi di lavoro automatizzati machine-to-machine (M2M). Implementa il **Machine Payment Protocol (MPP)** utilizzando **Zcash** come valuta sottostante, consentendo modalità di pagamento sia shielded (completamente private) che trasparenti.

A differenza dei sistemi di pagamento blockchain tradizionali, in cui ogni transazione è visibile pubblicamente sulla catena, Zimppy è progettato intorno a un'architettura basata su sessioni che elimina la latenza per richiesta preservando la privacy crittografica. Questo lo rende particolarmente adatto agli agenti di intelligenza artificiale che devono pagare API, dati, calcolo o strumenti di intelligenza artificiale in modo programmatico, senza far trapelare i metadati comportamentali.

### Proprietà principali

- **Deposito una volta** sulla catena (~75 secondi per la conferma di Zcash)
- **Richieste istantanee illimitate** dopo l'apertura della sessione, zero interazioni con la catena per ogni richiesta
- **Pagamenti Shielded** crittografano il mittente, il destinatario, l'importo e il memo utilizzando il protocollo Orchard di Zcash
- **Pagamenti trasparenti** utilizzano indirizzi T per sfida per prevenire il replay senza una privacy completa
- **Conforme alle specifiche**, sfide HMAC-SHA256, errori RFC 9457, scoperta `/.well-known/payment`

---

## Perché i pagamenti Shielded per gli agenti AI?

Per gli agenti di intelligenza artificiale che gestiscono flussi di lavoro sensibili, ricerche legali, domande mediche, analisi finanziarie, informazioni sulla concorrenza, **ogni pagamento pubblico è una fuga di metadati**. Zimppy è l'unico metodo di pagamento MPP che è **privato per impostazione predefinita**.

### Tabella di confronto della privacy

| Proprietà | Catene pubbliche (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |

| **Mittente** | Visibile | Crittografato | Visibile |
| **Ricevitore** | Visibile | Crittografato | Per-challenge (non collegabile) |
| **Ammontare** | Visibile | Crittografato | Visibile |
| **Memo** | Visibile | Crittografato | N/D |
| **Protezione da replay** | Nessuno | Legame con Memo | Indirizzo T per-challenge |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### Il problema della latenza, risolto dalle sessioni

> *"Ma Zcash ha tempi di blocco di 75 secondi "*

**Le sessioni risolvono questo problema ** L'attesa sulla catena avviene esattamente **una volta** al momento del deposito. Ogni richiesta successiva è istantanea.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Paghi una volta, chiami istantaneamente e ricevi il resto.** La latenza per richiesta è pari a zero.

---

## Protocollo di pagamento automatico (MPP)

Il **Machine Payment Protocol (MPP)** è un protocollo standardizzato che consente agli agenti software autonomi (agenti AI, bot, script) di scoprire, negoziare e soddisfare i requisiti di pagamento per l'accesso alle API, senza alcun intervento umano.

### Come l'MPP si integra con le API

MPP segue il flusso HTTP **402 Payment Required**:

1. **L'agente richiede** una risorsa da un endpoint API a pagamento.
2. **Il server risponde** con `402 Payment Required` + una sfida firmata (importo, destinatario, memo).
3. **L'agente paga** utilizzando un metodo di pagamento compatibile (ad esempio, Zcashed Shielded).
4. **L'agente ritenta** la richiesta con `Authorization: Payment {txid}`.
5. **Il server verifica** il pagamento in modo crittografico (decrittazione IVK di Orchard, importo + controllo memo).
6. **Il server risponde** con `200 OK` + un'intestazione `Payment-Receipt`.

### Conformità alle specifiche

- **HMAC-SHA256** firma di sfida
- **RFC 9457** risposte di errore strutturate
- **`/.well-known/payment`** endpoint per la scoperta automatica dei metodi di pagamento
- **Orchard IVK** (Incoming Viewing Key) per la verifica dei pagamenti lato server senza esporre le chiavi di spesa

---

## Come funziona Zimppy

### Sessioni (consigliate)

Le sessioni sono il modello di interazione principale. L'agente deposita una volta un saldo sulla catena, riceve un token al portatore e lo utilizza per tutte le richieste successive a latenza zero.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Il migliore per:** Chiamate API ad alta frequenza, inferenza LLM, interrogazioni ripetute di dati.

---

### Streaming

Contenuto a pagamento per token erogato tramite **Server-Sent Events (SSE)**. Il server detrae dal saldo della sessione ogni parola o token trasmesso in streaming.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideale per:** risposte in streaming LLM, feed di dati in tempo reale, strumenti AI pay-per-token.

---

### Carica

Un singolo pagamento Shielded per richiesta. Il flusso HTTP 402 completo viene eseguito per ogni chiamata. Adatto quando le richieste sono poco frequenti o di alto valore.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideale per:** Richieste una tantum di alto valore, chiamate API poco frequenti, endpoint di dati premium.

---

## Casi d'uso ed esempi

### 1. Agente AI

Un agente AI legale interroga un database di giurisprudenza a pagamento. Utilizzando le sessioni schermate di Zimppy, né l'identità dello studio legale né le query specifiche sono visibili sulla catena - proteggendo il segreto professionale a livello di infrastruttura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente AI per la pipeline di query mediche

Un agente di diagnostica medica interroga diversi database clinici. I pagamenti Shielded assicurano che i modelli di query dei pazienti non siano collegabili tra i vari fornitori.

### 3. Agente per l'analisi finanziaria

Un agente di trading algoritmico paga per le API dei dati di mercato in tempo reale. I pagamenti Transparent utilizzano nuovi indirizzi T per ogni sfida, impedendo la correlazione dei modelli di utilizzo tra i vari fornitori di dati.

### 4. Server di strumenti MCP, strumenti AI a pagamento

Un server MCP (Model Context Protocol) espone strumenti di intelligenza artificiale a pagamento. Ogni invocazione di uno strumento comporta un addebito da parte di Zimppy, consentendo un mercato di funzionalità AI monetizzate.

### 5. Riassuntore LLM, Pay-Per-Token

Un servizio di riepilogo LLM addebita agli agenti un costo per token di output tramite streaming SSE, con deduzione automatica del saldo e rimborso del saldo prepagato non utilizzato.

---

## Installazione

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Impostazione del portafoglio Zimppy

La CLI di Zimppy fornisce un'interfaccia completa per il portafoglio. Tutti i comandi sono disponibili su `npx zimppy`.

### Passo 1: Creare un portafoglio

```bash
npx zimppy wallet create
```

Genera chiavi crittografiche e visualizza la tua **frase iniziale**. Conservala in modo sicuro: non può essere recuperata se viene persa.

### Fase 2: Verifica il tuo indirizzo e il tuo saldo

```bash
npx zimppy wallet whoami
```

Mostra il tuo **Unified Address (UA)**, il **T-address**, il saldo attuale e la rete attiva.

```bash
npx zimppy wallet balance --all
```

Mostra la ripartizione del saldo per conto di tutti gli account ZIP-32.

### Fase 3: Finanziare il portafoglio

Invia ZEC al tuo Unified Address da qualsiasi portafoglio o exchange compatibile con Zcash. I depositi Shielded vanno direttamente sul tuo conto Orchard.

### Fase 4: Inviare e scudare i fondi

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### Passo 5: Effettuare una richiesta di pagamento automatico

```bash
npx zimppy request <url>
```

Gestisce automaticamente il flusso completo 402 -> paga -> riprova. Le sessioni vengono aperte e gestite in modo trasparente.

---

## Integrazione di Zimppy - SDK TypeScript

### Server TypeScript - Shielded

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**Punti chiave:**
- `zcash({ wallet: 'server' })` carica il portafoglio Shielded del server
- `mppx.charge()` gestisce l'intero ciclo di vita della sfida/verifica 402
- `result.withReceipt()` allega alla risposta la ricevuta di pagamento crittografata

---

### Server TypeScript - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ogni sfida genera un **indirizzo T nuovo**, rendendo le richieste di pagamento non collegabili tra le varie sessioni.

---

### Client TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Il client intercetta le risposte di `402`, apre automaticamente una sessione e riprova la richiesta - il codice chiamante non richiede alcuna logica specifica per il pagamento.

---

## Integrazione di Zimppy - Rust SDK

### Server Rust (Axum)

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**Punti chiave:**
- `MppCharge<Price>` è un estrattore Axum che verifica il pagamento prima che il gestore venga eseguito
- `WithReceipt` avvolge la risposta con una ricevuta di pagamento crittografata
- `ChargeConfig` definisce la logica dei prezzi, che può essere dinamica in base ai parametri della richiesta

---

### Client Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` estende qualsiasi client HTTP con la gestione automatica di 402, la gestione delle sessioni e l'esecuzione di pagamenti Zcash.

---

## Riferimento CLI

| Comando | Descrizione |
|---|---|
| `npx zimppy wallet create` | Genera chiavi e visualizza la frase di partenza |
| `npx zimppy wallet whoami` | Mostra indirizzo (UA + T-addr), saldo, rete |
| `npx zimppy wallet balance --all` | Ripartizione del saldo per account |
| `npx zimppy wallet send <addr> <zat>` | Invia ZEC schermati o trasparenti |
| `npx zimppy wallet transfer <from> <to> <zat>` | Trasferimento interno a più conti |
| `npx zimppy wallet shield` | Spostare fondi trasparenti in Orchard (schermati) |
| `npx zimppy wallet use <name>` | Cambia identità del portafoglio attivo |
| `npx zimppy request <url>` | Richiesta automatica 402 -> paga -> riprova |

---

## Caratteristiche principali

### Portafogli nativi di agenti

I portafogli Zimppy sono progettati per essere utilizzati in modo programmatico da agenti AI, non da estensioni del browser gestite dall'uomo. Le chiavi sono gestite tramite CLI o SDK, gli account possono essere ruotati tramite **ZIP-32 account derivation** e il portafoglio supporta flussi di pagamento completamente automatizzati senza l'approvazione umana per ogni transazione.

### Supporto multi-agente

Più agenti possono operare dallo stesso portafoglio grazie alla **rotazione dei conti ZIP-32**: ogni agente ha un proprio conto con tracciamento del saldo isolato, possibilità di trasferimento tra conti e reportistica sul saldo per conto. In questo modo è possibile gestire una flotta di agenti da un'unica infrastruttura di portafoglio.

### Transazioni Zcash completamente Shielded (Orchard)

I pagamenti Shielded utilizzano il protocollo **Orchard** di Zcash, il più recente e sicuro pool schermato. Il server verifica i pagamenti utilizzando una **Incoming Viewing Key (IVK)**, che può decriptare le banconote ricevute senza esporre la chiave di spesa. Gli attacchi di replay sono impediti dal **memo binding**: ogni sfida contiene un promemoria unico `zimppy:{challenge_id}` che viene verificato crittograficamente.

### Sessioni, zero latenza per richiesta

L'architettura a sessioni disaccoppia l'attesa di conferma sulla catena dalla latenza per richiesta. Dopo un singolo deposito (~75 secondi), tutte le successive richieste di bearer-token vengono servite istantaneamente senza alcuna interazione con la blockchain fino alla chiusura della sessione.

### Streaming , Pay-Per-Token

Il supporto nativo **SSE (Server-Sent Events)** consente di offrire contenuti a pagamento per token. Ideale per le API di inferenza LLM in cui la lunghezza dell'output è variabile e la fatturazione deve riflettere il consumo effettivo.

### Conformità alle specifiche

- le sfide firmate **HMAC-SHA256** impediscono la falsificazione
- **RFC 9457** formato di errore strutturato per la gestione interoperabile degli errori
- **`/.well-known/payment`** per la scoperta automatica del metodo di pagamento da parte di qualsiasi agente conforme a MPP

---

## Architettura

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### Responsabilità dei componenti

**`zimppy-core`** - Il nucleo crittografico. Gestisce la decodifica delle note di Orchard utilizzando l'IVK del server, il parsing dei memo, la logica di protezione replay e la verifica delle sfide. Scritto in Rust per garantire prestazioni e correttezza.

**`zimppy-wallet`** - Un portafoglio Zcash nativo gestito da `zingolib`. Gestisce le chiavi, i conti, i saldi shielded/trasparenti e l'invio delle transazioni.

**`zimppy-rs`** - L'SDK di Rust. Fornisce i tratti `ChargeMethod`, `SessionMethod` e `PaymentProvider`, oltre agli estrattori Axum (`MppCharge`, `WithReceipt`) per un'integrazione ergonomica dei server.

**`zimppy-napi`** - Legami NAPI-RS che espongono il nucleo di Rust a Node.js, consentendo all'SDK TypeScript di utilizzare lo stesso motore crittografico senza dover reimplementare le primitive di Zcash in JavaScript.

**`zimppy-ts`** - L'SDK TypeScript. Avvolge i binding NAPI con API async/await idiomatiche per i flussi di carica, sessione e streaming SSE.

**`zimppy-cli`** - Lo strumento di richiesta e portafoglio a riga di comando. Supporta il pagamento automatico (402 -> paga -> riprova), la gestione della sessione e tutte le operazioni del portafoglio.

---

## Esempi e demo

| Esempio | Descrizione |
|---|---|
| `examples/fortune-teller/` | Demo di addebito, sessione e streaming - Rust server + client |
| `examples/llm-summarizer/` | Demo di streaming LLM pay-per-token |
| `examples/mcp-server/` | Server di strumenti MCP con strumenti AI a pagamento |
| `examples/ts-server/` | Implementazione di riferimento del server MPP in TypeScript |

---

## Cosa è incluso - Riassunto delle funzionalità

| Funzionalità | Descrizione |
|---|---|
| **Sessioni** | Deposito una volta, richieste istantanee al portatore, rimborso alla chiusura |
| **Streaming** | Contenuto misurato pay-per-token su SSE |
| **Charge** | Pagamento Shielded o trasparente per richiesta HTTP (flusso 402) |
| **Transparent Payments** | Indirizzi T con prevenzione del replay per-challenge + comando Shielded |
| **Multi-Account** | Rotazione degli account ZIP-32, trasferimenti tra account, saldi per account |
| **CLI Wallet** | Invia, scudo, trasferimento, saldo --all, whoami, auto-pay |
| **Dual SDK** | TypeScript and Rust |
| **Spec-Compliant** | Sfide HMAC-SHA256, errori RFC 9457, `/.well-known/payment` discovery |

---

*Per maggiori informazioni, visita il sito [zimppy.xyz](https://zimppy.xyz)*

---

## Pagine correlate

- [Wallets](/using-zcash/wallets) - Portafogli Zcash che supportano transazioni Shielded
- [Shielded Pools](/using-zcash/shielded-pools) - Come le transazioni Orchard shielded proteggono i dati di pagamento
- [Payment Processors](/using-zcash/payment-processors) - Altri modi per accettare pagamenti in Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Le ZSA e il futuro della programmabilità di Zcash
- [Community Projects](/zcash-community/community-projects) - Altri progetti dell'ecosistema Zcash
