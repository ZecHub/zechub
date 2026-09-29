<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## In breve

- **Zimppy** è un'infrastruttura di pagamento che mette la privacy al primo posto per agenti AI e utilizza il Machine Payment Protocol (MPP) di Zcash
- **Deposita una volta sola** on-chain (~75 secondi), poi effettua **richieste istantanee illimitate** senza interazione con la blockchain per ogni richiesta
- Supporta pagamenti **Zcash completamente schermati (Orchard)** — mittente, destinatario, importo e memo sono tutti crittografati
- Funziona con gli SDK **TypeScript e Rust** per una facile integrazione in pipeline AI e server API
- Perfetto per **API LLM, marketplace di dati, server di strumenti MCP** e qualsiasi caso d'uso di pagamento M2M

---

> **Zimppy** è il metodo di pagamento Machine Payment Protocol (MPP) per Zcash che supporta sia pagamenti schermati sia trasparenti. Deposita una volta sola on-chain, poi effettua richieste al portatore istantanee illimitate senza interazione con la chain per ogni richiesta.

---

## Indice

1. [Cos'è Zimppy.xyz?](#what-is-zimppyxyz)
2. [Perché pagamenti schermati per gli agenti AI?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Come funziona Zimppy](#how-zimppy-works)
   - [Sessioni (consigliato)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Addebito](#charge)
5. [Casi d'uso ed esempi](#use-cases--examples)
6. [Installazione](#installation)
7. [Configurare il wallet Zimppy](#setting-up-the-zimppy-wallet)
8. [Integrare Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (schermato)](#typescript-server--shielded)
   - [Server (trasparente)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Integrare Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [Riferimento CLI](#cli-reference)
11. [Funzionalità principali](#key-features)
12. [Architettura](#architecture)
13. [Esempi e demo](#examples--demos)

---

## Cos'è Zimppy.xyz?

**Zimppy.xyz** è un'infrastruttura di pagamento che mette la privacy al primo posto, progettata specificamente per agenti AI e flussi di lavoro automatizzati machine-to-machine (M2M). Implementa il **Machine Payment Protocol (MPP)** utilizzando **Zcash** come valuta sottostante, abilitando modalità di pagamento sia schermate (completamente private) sia trasparenti.

A differenza dei sistemi di pagamento blockchain tradizionali, in cui ogni transazione è pubblicamente visibile on-chain, Zimppy è progettato attorno a un'architettura basata sulle sessioni che elimina la latenza per richiesta preservando al contempo la privacy crittografica. Questo lo rende particolarmente adatto agli agenti AI che devono pagare programmaticamente API, dati, capacità di calcolo o strumenti AI, senza rivelare metadati comportamentali.

### Proprietà principali

- **Deposita una volta sola** on-chain (~75 secondi per la conferma di Zcash)
- **Richieste istantanee illimitate** dopo l'apertura della sessione, zero interazione con la chain per richiesta
- I **pagamenti schermati** crittografano mittente, destinatario, importo e memo tramite il protocollo Orchard di Zcash
- I **pagamenti trasparenti** utilizzano T-address per challenge per prevenire i replay senza privacy completa
- **Conforme alle specifiche**, challenge HMAC-SHA256, errori RFC 9457, discovery `/.well-known/payment`

---

## Perché pagamenti schermati per gli agenti AI?

Per gli agenti AI che gestiscono flussi di lavoro sensibili, ricerche legali, richieste mediche, analisi finanziarie e intelligence competitiva, **ogni pagamento pubblico è una perdita di metadati**. Zimppy è l'unico metodo di pagamento MPP **privato per impostazione predefinita**.

### Tabella di confronto della privacy

| Proprietà | Chain pubbliche (USDC, ETH) | Zimppy schermato | Zimppy trasparente |
|---|---|---|---|
| **Mittente** | Visibile | Crittografato | Visibile |
| **Destinatario** | Visibile | Crittografato | Per challenge (non collegabile) |
| **Importo** | Visibile | Crittografato | Visibile |
| **Memo** | Visibile | Crittografato | N/D |
| **Protezione dai replay** | Nessuna | Associazione del memo | T-address per challenge |
| **Modello di utilizzo del servizio** | Collegabile | Privato | Non collegabile (indirizzo nuovo) |

### Il problema della latenza, risolto dalle sessioni

> *"Ma Zcash ha tempi di blocco di 75 secondi."*

**Le sessioni risolvono questo problema.** L'attesa on-chain avviene esattamente **una volta** al deposito. Ogni richiesta successiva è istantanea.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Paga una volta, chiama istantaneamente, ricevi il resto.** La latenza per richiesta è zero.

---

## Machine Payment Protocol (MPP)

Il **Machine Payment Protocol (MPP)** è un protocollo standardizzato che consente ad agenti software autonomi (agenti AI, bot, script) di individuare, negoziare e soddisfare i requisiti di pagamento per l'accesso alle API, il tutto senza intervento umano.

### Come MPP si integra con le API

MPP segue il flusso HTTP **402 Payment Required**:

1. **L'agente richiede** una risorsa da un endpoint API a pagamento.
2. **Il server risponde** con `402 Payment Required` + una challenge firmata (importo, destinatario, memo).
3. **L'agente paga** utilizzando un metodo di pagamento compatibile (ad esempio, Zcash schermato di Zimppy).
4. **L'agente riprova** la richiesta con `Authorization: Payment {txid}`.
5. **Il server verifica** crittograficamente il pagamento (decrittazione Orchard IVK, controllo di importo + memo).
6. **Il server risponde** con `200 OK` + un header `Payment-Receipt`.

### Conformità alle specifiche

- Firma delle challenge **HMAC-SHA256**
- Risposte di errore strutturate **RFC 9457**
- Endpoint **`/.well-known/payment`** per l'individuazione automatica del metodo di pagamento
- **Orchard IVK** (Incoming Viewing Key) per la verifica dei pagamenti lato server senza esporre le chiavi di spesa

---

## Come funziona Zimppy

### Sessioni (consigliato)

Le sessioni sono il modello di interazione principale. L'agente deposita un saldo on-chain una sola volta, riceve un token al portatore e lo utilizza per tutte le richieste successive a latenza zero.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ideale per:** chiamate API ad alta frequenza, inferenza LLM, query di dati ripetute.

---

### Streaming

Contenuti a consumo per token erogati tramite **Server-Sent Events (SSE)**. Il server detrae dal saldo della sessione per ogni parola o token trasmesso.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideale per:** risposte LLM in streaming, feed di dati in tempo reale, strumenti AI con pagamento per token.

---

### Addebito

Un singolo pagamento schermato per richiesta. Il flusso HTTP 402 completo viene eseguito per ogni chiamata. Adatto quando le richieste sono poco frequenti o di alto valore.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideale per:** richieste una tantum di alto valore, chiamate API poco frequenti, endpoint di dati premium.

---

## Casi d'uso ed esempi

### 1. Agente AI

Un agente AI legale interroga un database a pagamento di giurisprudenza. Usando sessioni schermate di Zimppy, né l'identità dello studio legale né le query specifiche sono visibili on-chain, proteggendo il segreto professionale avvocato-cliente a livello di infrastruttura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente AI per pipeline di query mediche

Un agente diagnostico medico interroga più database clinici. I pagamenti schermati assicurano che i modelli di query dei pazienti non siano collegabili tra diversi fornitori.

### 3. Agente di analisi finanziaria

Un agente di trading algoritmico paga per API di dati di mercato in tempo reale. I pagamenti trasparenti utilizzano T-address nuove per ogni challenge, impedendo la correlazione dei modelli di utilizzo tra i fornitori di dati.

### 4. Server di strumenti MCP, strumenti AI a pagamento

Un server MCP (Model Context Protocol) espone strumenti AI a pagamento. Ogni invocazione di uno strumento attiva un addebito Zimppy, consentendo un marketplace di funzionalità AI monetizzate.

### 5. Riassuntore LLM, pagamento per token

Un servizio di riassunto LLM addebita gli agenti per ogni token in output tramite streaming SSE, con detrazione automatica del saldo e rimborso del saldo prepagato inutilizzato.

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

## Configurare il wallet Zimppy

La CLI di Zimppy offre un'interfaccia wallet completa. Tutti i comandi sono disponibili tramite `npx zimppy`.

### Passaggio 1 : creare un wallet

```bash
npx zimppy wallet create
```

Genera chiavi crittografiche e mostra la tua **seed phrase**. Conservala al sicuro: non può essere recuperata se viene persa.

### Passaggio 2 : controllare indirizzo e saldo

```bash
npx zimppy wallet whoami
```

Mostra il tuo **Unified Address (UA)**, **T-address**, saldo attuale e rete attiva.

```bash
npx zimppy wallet balance --all
```

Mostra una ripartizione del saldo per account tra tutti gli account ZIP-32.

### Passaggio 3 : finanziare il wallet

Invia ZEC al tuo Unified Address da qualsiasi wallet o exchange compatibile con Zcash. I depositi schermati arrivano direttamente al tuo account Orchard.

### Passaggio 4 : inviare e schermare fondi

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

### Passaggio 5 : effettuare una richiesta con pagamento automatico

```bash
npx zimppy request <url>
```

Gestisce automaticamente il flusso completo 402 -> pagamento -> nuovo tentativo. Le sessioni vengono aperte e gestite in modo trasparente.

---

## Integrare Zimppy - SDK TypeScript

### Server TypeScript - schermato

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
- `zcash({ wallet: 'server' })` carica il wallet schermato del server
- `mppx.charge()` gestisce l'intero ciclo di vita di challenge/verifica 402
- `result.withReceipt()` allega la ricevuta di pagamento crittografica alla risposta

---

### Server TypeScript - trasparente

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ogni challenge genera una **T-address nuova**, rendendo le richieste di pagamento non collegabili tra le sessioni.

---

### Client TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Il client intercetta le risposte `402`, apre automaticamente una sessione e ritenta la richiesta: il codice chiamante non richiede logica specifica per i pagamenti.

---

## Integrare Zimppy - SDK Rust

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
- `MppCharge<Price>` è un estrattore Axum che verifica il pagamento prima dell'esecuzione dell'handler
- `WithReceipt` avvolge la risposta con una ricevuta di pagamento crittografica
- `ChargeConfig` definisce la logica di prezzo: può essere dinamica in base ai parametri della richiesta

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

`send_with_payment` estende qualsiasi client HTTP con gestione automatica del 402, gestione delle sessioni e completamento dei pagamenti Zcash.

---

## Riferimento CLI

| Comando | Descrizione |
|---|---|
| `npx zimppy wallet create` | Genera chiavi e mostra la seed phrase |
| `npx zimppy wallet whoami` | Mostra indirizzo (UA + T-addr), saldo, rete |
| `npx zimppy wallet balance --all` | Ripartizione del saldo per account |
| `npx zimppy wallet send <addr> <zat>` | Invia ZEC schermato o trasparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Trasferimento interno tra account |
| `npx zimppy wallet shield` | Sposta fondi trasparenti in Orchard (schermato) |
| `npx zimppy wallet use <name>` | Cambia l'identità del wallet attivo |
| `npx zimppy request <url>` | Richiesta automatica 402 -> pagamento -> nuovo tentativo |

---

## Funzionalità principali

### Wallet nativi per agenti

I wallet Zimppy sono progettati per l'uso programmatico da parte di agenti AI, non per estensioni del browser gestite da persone. Le chiavi vengono gestite tramite CLI o SDK, gli account possono essere ruotati tramite **derivazione degli account ZIP-32**, e il wallet supporta flussi di pagamento completamente automatizzati senza approvazione umana per ogni transazione.

### Supporto multi-agente

Più agenti possono operare dallo stesso wallet utilizzando la **rotazione degli account ZIP-32**: ogni agente riceve il proprio account con monitoraggio del saldo isolato, capacità di trasferimento tra account e report del saldo per account. Ciò consente la gestione di flotte di molti agenti da una singola infrastruttura wallet.

### Transazioni Zcash completamente schermate (Orchard)

I pagamenti schermati utilizzano il **protocollo Orchard** di Zcash, il pool schermato più recente e sicuro. Il server verifica i pagamenti mediante una **Incoming Viewing Key (IVK)**, che può decrittografare le note ricevute senza esporre la chiave di spesa. Gli attacchi replay vengono prevenuti tramite **associazione del memo**: ogni challenge incorpora un memo univoco `zimppy:{challenge_id}` verificato crittograficamente.

### Sessioni, latenza zero per richiesta

L'architettura delle sessioni separa l'attesa della conferma on-chain dalla latenza per richiesta. Dopo un singolo deposito (~75 secondi), tutte le successive richieste con token al portatore vengono servite istantaneamente senza interazione con la blockchain fino alla chiusura della sessione.

### Streaming, pagamento per token

Il supporto nativo per **SSE (Server-Sent Events)** abilita contenuti a consumo per token. Ideale per API di inferenza LLM in cui la lunghezza dell'output è variabile e la fatturazione dovrebbe riflettere il consumo effettivo.

### Conformità alle specifiche

- Le challenge firmate con **HMAC-SHA256** prevengono le falsificazioni
- Formato di errore strutturato **RFC 9457** per una gestione interoperabile degli errori
- **`/.well-known/payment`** per l'individuazione automatica del metodo di pagamento da parte di qualsiasi agente conforme a MPP

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

**`zimppy-core`** - Il nucleo crittografico. Gestisce la decrittazione delle note Orchard utilizzando l'IVK del server, il parsing dei memo, la logica di protezione dai replay e la verifica delle challenge. Scritto in Rust per prestazioni e correttezza.

**`zimppy-wallet`** - Un wallet Zcash nativo basato su `zingolib`. Gestisce chiavi, account, saldi schermati/trasparenti e invio delle transazioni.

**`zimppy-rs`** - L'SDK Rust. Fornisce i trait `ChargeMethod`, `SessionMethod` e `PaymentProvider`, oltre agli estrattori Axum (`MppCharge`, `WithReceipt`) per un'integrazione ergonomica del server.

**`zimppy-napi`** - Binding NAPI-RS che espongono il nucleo Rust a Node.js, consentendo all'SDK TypeScript di utilizzare lo stesso motore crittografico senza reimplementare le primitive Zcash in JavaScript.

**`zimppy-ts`** - L'SDK TypeScript. Avvolge i binding NAPI con API async/await idiomatiche per i flussi di addebito, sessione e streaming SSE.

**`zimppy-cli`** - Il wallet da riga di comando e strumento per richieste. Supporta il pagamento automatico (402 -> pagamento -> nuovo tentativo), la gestione delle sessioni e tutte le operazioni del wallet.

---

## Esempi e demo

| Esempio | Descrizione |
|---|---|
| `examples/fortune-teller/` | Demo di addebito, sessione e streaming - server + client Rust |
| `examples/llm-summarizer/` | Demo di streaming LLM con pagamento per token |
| `examples/mcp-server/` | Server di strumenti MCP con strumenti AI a pagamento |
| `examples/ts-server/` | Implementazione di riferimento del server MPP TypeScript |

---

## Cosa include - Riepilogo delle funzionalità

| Funzionalità | Descrizione |
|---|---|
| **Sessioni** | Deposita una volta sola, richieste al portatore istantanee, rimborso alla chiusura |
| **Streaming** | Contenuti a consumo per token tramite SSE |
| **Addebito** | Pagamento schermato o trasparente per richiesta HTTP (flusso 402) |
| **Pagamenti trasparenti** | T-address con protezione dai replay per challenge + comando shield |
| **Multi-account** | Rotazione degli account ZIP-32, trasferimenti tra account, saldi per account |
| **Wallet CLI** | Invia, scherma, trasferisci, saldo --all, whoami, pagamento automatico |
| **Doppio SDK** | TypeScript e Rust |
| **Conforme alle specifiche** | Challenge HMAC-SHA256, errori RFC 9457, discovery `/.well-known/payment` |

---

*Per maggiori informazioni, visita [zimppy.xyz](https://zimppy.xyz)*

---

## Pagine correlate

- [Wallet](/using-zcash/wallets) — Wallet Zcash che supportano transazioni schermate
- [Pool schermati](/using-zcash/shielded-pools) — Come le transazioni schermate Orchard proteggono i dati di pagamento
- [Elaboratori di pagamento](/using-zcash/payment-processors) — Altri modi per accettare pagamenti Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA e il futuro della programmabilità di Zcash
- [Progetti della community](/zcash-community/community-projects) — Altri progetti dell'ecosistema Zcash
