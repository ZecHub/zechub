<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** ist eine datenschutzorientierte Zahlungsinfrastruktur für AI-Agenten, die das Machine Payment Protocol (MPP) von Zcash nutzt
- **Einmal on-chain einzahlen** (~75 Sekunden), dann **unbegrenzt sofortige Anfragen** ohne Blockchain-Interaktion pro Anfrage stellen
- Unterstützt **vollständig abgeschirmte Zcash (Orchard)**-Zahlungen — Sender, Empfänger, Betrag und Memo sind alle verschlüsselt
- Funktioniert mit **TypeScript- und Rust-SDKs** für eine einfache Integration in AI-Pipelines und API-Server
- Perfekt für **LLM-APIs, Datenmarktplätze, MCP-Tool-Server** und jeden M2M-Zahlungsanwendungsfall

---

> **Zimppy** ist die Machine Payment Protocol (MPP)-Zahlungsmethode für Zcash und unterstützt sowohl abgeschirmte als auch transparente Zahlungen. Einmal on-chain einzahlen, dann unbegrenzt sofortige Bearer-Anfragen ohne Chain-Interaktion pro Anfrage ausführen.

---

## Inhaltsverzeichnis

1. [Was ist Zimppy.xyz?](#what-is-zimppyxyz)
2. [Warum abgeschirmte Zahlungen für AI-Agenten?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Wie Zimppy funktioniert](#how-zimppy-works)
   - [Sessions (Empfohlen)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Anwendungsfälle & Beispiele](#use-cases--examples)
6. [Installation](#installation)
7. [Einrichten der Zimppy Wallet](#setting-up-the-zimppy-wallet)
8. [Integration von Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (abgeschirmt)](#typescript-server--shielded)
   - [Server (transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Integration von Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [CLI-Referenz](#cli-reference)
11. [Hauptfunktionen](#key-features)
12. [Architektur](#architecture)
13. [Beispiele & Demos](#examples--demos)

---

## Was ist Zimppy.xyz?

**Zimppy.xyz** ist eine datenschutzorientierte Zahlungsinfrastruktur, die speziell für AI-Agenten und automatisierte Machine-to-Machine-(M2M)-Workflows entwickelt wurde. Sie implementiert das **Machine Payment Protocol (MPP)** unter Verwendung von **Zcash** als zugrunde liegender Währung und ermöglicht sowohl abgeschirmte (vollständig private) als auch transparente Zahlungsmodi.

Im Gegensatz zu traditionellen Blockchain-Zahlungssystemen, bei denen jede Transaktion öffentlich on-chain sichtbar ist, basiert Zimppy auf einer sitzungsbasierten Architektur, die die Latenz pro Anfrage eliminiert und gleichzeitig kryptografische Privatsphäre bewahrt. Dadurch eignet es sich besonders für AI-Agenten, die programmgesteuert für APIs, Daten, Rechenleistung oder AI-Tools bezahlen müssen, ohne Verhaltensmetadaten offenzulegen.

### Kerneigenschaften

- **Einmal on-chain einzahlen** (~75 Sekunden für die Zcash-Bestätigung)
- **Unbegrenzte sofortige Anfragen** nach dem Öffnen einer Session, ohne Chain-Interaktion pro Anfrage
- **Abgeschirmte Zahlungen** verschlüsseln Sender, Empfänger, Betrag und Memo mithilfe des Orchard-Protokolls von Zcash
- **Transparente Zahlungen** verwenden T-Adressen pro Challenge zur Replay-Verhinderung ohne vollständige Privatsphäre
- **Spezifikationskonform**, HMAC-SHA256-Challenges, RFC 9457-Fehler, `/.well-known/payment`-Discovery

---

## Warum abgeschirmte Zahlungen für AI-Agenten?

Für AI-Agenten, die sensible Workflows, juristische Recherchen, medizinische Anfragen, Finanzanalysen und Wettbewerbsaufklärung verarbeiten, ist **jede öffentliche Zahlung ein Metadatenleck**. Zimppy ist die einzige MPP-Zahlungsmethode, die **standardmäßig privat** ist.

### Tabelle zum Datenschutzvergleich

| Property | Öffentliche Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Sichtbar | Verschlüsselt | Sichtbar |
| **Receiver** | Sichtbar | Verschlüsselt | Pro Challenge (nicht verknüpfbar) |
| **Amount** | Sichtbar | Verschlüsselt | Sichtbar |
| **Memo** | Sichtbar | Verschlüsselt | N/A |
| **Replay Protection** | Keine | Memo-Bindung | T-Adresse pro Challenge |
| **Service Usage Pattern** | Verknüpfbar | Privat | Nicht verknüpfbar (frische Adresse) |

### Das Latenzproblem, gelöst durch Sessions

> *„Aber Zcash hat 75-Sekunden-Blockzeiten.“*

**Sessions lösen das.** Die On-Chain-Wartezeit fällt genau **einmal** bei der Einzahlung an. Jede nachfolgende Anfrage ist sofortig.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Einmal zahlen, sofort aufrufen, Wechselgeld zurückbekommen.** Die Latenz pro Anfrage ist null.

---

## Machine Payment Protocol (MPP)

Das **Machine Payment Protocol (MPP)** ist ein standardisiertes Protokoll, das autonomen Software-Agenten (AI-Agenten, Bots, Skripten) ermöglicht, Zahlungsanforderungen für den API-Zugriff zu entdecken, auszuhandeln und zu erfüllen — und das alles ohne menschliches Eingreifen.

### Wie MPP in APIs integriert wird

MPP folgt dem HTTP-Flow **402 Payment Required**:

1. **Der Agent fordert** eine Ressource von einem kostenpflichtigen API-Endpunkt an.
2. **Der Server antwortet** mit `402 Payment Required` + einer signierten Challenge (Betrag, Empfänger, Memo).
3. **Der Agent bezahlt** mit einer kompatiblen Zahlungsmethode (z. B. Zimppy shielded Zcash).
4. **Der Agent wiederholt** die Anfrage mit `Authorization: Payment {txid}`.
5. **Der Server verifiziert** die Zahlung kryptografisch (Orchard-IVK-Entschlüsselung, Prüfung von Betrag + Memo).
6. **Der Server antwortet** mit `200 OK` + einem `Payment-Receipt`-Header.
### Einhaltung der Spezifikation

- **HMAC-SHA256** Challenge-Signierung
- **RFC 9457** strukturierte Fehlerantworten
- **`/.well-known/payment`**-Endpunkt für die automatische Erkennung von Zahlungsmethoden
- **Orchard IVK** (Incoming Viewing Key) für die serverseitige Zahlungsüberprüfung, ohne Ausgabeschlüssel offenzulegen

---

## Wie Zimppy funktioniert

### Sitzungen (empfohlen)

Sitzungen sind das primäre Interaktionsmuster. Der Agent hinterlegt einmalig ein Guthaben On-Chain, erhält ein Bearer-Token und verwendet es für alle nachfolgenden Anfragen mit null Latenz.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Am besten geeignet für:** Hochfrequente API-Aufrufe, LLM-Inferenz, wiederholte Datenabfragen.

---

### Streaming

Pay-per-Token-abgerechnete Inhalte, die über **Server-Sent Events (SSE)** bereitgestellt werden. Der Server zieht für jedes gestreamte Wort oder Token vom Sitzungsguthaben ab.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Am besten geeignet für:** Gestreamte LLM-Antworten, Echtzeit-Datenfeeds, KI-Tools mit Abrechnung pro Token.

---

### Charge

Eine einzelne abgeschirmte Zahlung pro Anfrage. Der vollständige HTTP-402-Ablauf wird pro Aufruf ausgeführt. Geeignet, wenn Anfragen selten oder hochwertig sind.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Am besten geeignet für:** Einmalige hochwertige Anfragen, seltene API-Aufrufe, Premium-Datenendpunkte.

---

## Anwendungsfälle & Beispiele

### 1. KI-Agent

Ein juristischer KI-Agent fragt eine kostenpflichtige Datenbank für Rechtsprechung ab. Mit abgeschirmten Zimppy-Sitzungen sind weder die Identität der Kanzlei noch die konkreten Abfragen On-Chain sichtbar – so wird das Anwaltsgeheimnis auf Infrastrukturebene geschützt.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. KI-Agent für eine medizinische Abfrage-Pipeline

Ein medizinischer Diagnose-Agent fragt mehrere klinische Datenbanken ab. Abgeschirmte Zahlungen stellen sicher, dass Patienten-Abfragemuster nicht über verschiedene Anbieter hinweg verknüpfbar sind.

### 3. Agent für Finanzanalyse

Ein algorithmischer Trading-Agent bezahlt für Echtzeit-Marktdaten-APIs. Transparente Zahlungen verwenden für jede Challenge neue T-Adressen, wodurch die Korrelation von Nutzungsmustern über verschiedene Datenanbieter hinweg verhindert wird.

### 4. MCP-Tool-Server, kostenpflichtige KI-Tools

Ein MCP-Server (Model Context Protocol) stellt kostenpflichtige KI-Tools bereit. Jede Tool-Ausführung löst eine Zimppy-Charge aus und ermöglicht so einen Marktplatz monetarisierter KI-Fähigkeiten.

### 5. LLM-Zusammenfasser, Pay-Per-Token

Ein LLM-Zusammenfassungsdienst berechnet Agenten pro Ausgabe-Token Gebühren über SSE-Streaming, mit automatischem Guthabenabzug und Rückerstattung des nicht genutzten vorausbezahlten Guthabens.

---

## Installation

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

## Einrichten der Zimppy Wallet

Die Zimppy-CLI bietet eine vollständige Wallet-Oberfläche. Alle Befehle sind über `npx zimppy` verfügbar.

### Schritt 1 : Eine Wallet erstellen

```bash
npx zimppy wallet create
```

Erzeugt kryptografische Schlüssel und zeigt deine **Seed-Phrase** an. Bewahre sie sicher auf – sie kann bei Verlust nicht wiederhergestellt werden.

### Schritt 2 : Deine Adresse und dein Guthaben prüfen

```bash
npx zimppy wallet whoami
```

Zeigt deine **Unified Address (UA)**, **T-Adresse**, das aktuelle Guthaben und das aktive Netzwerk an.

```bash
npx zimppy wallet balance --all
```

Zeigt eine Guthabenaufschlüsselung pro Konto über alle ZIP-32-Konten hinweg.

### Schritt 3 : Deine Wallet aufladen

Sende ZEC von einer beliebigen Zcash-kompatiblen Wallet oder Börse an deine Unified Address. Abgeschirmte Einzahlungen gehen direkt auf dein Orchard-Konto.

### Schritt 4 : Gelder senden und abschirmen

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

### Schritt 5 : Eine Auto-Pay-Anfrage stellen

```bash
npx zimppy request <url>
```

Verarbeitet automatisch den vollständigen Ablauf 402 -> pay -> retry. Sitzungen werden transparent geöffnet und verwaltet.

---

## Integration von Zimppy - TypeScript SDK

### TypeScript-Server - abgeschirmt

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

**Wichtige Punkte:**
- `zcash({ wallet: 'server' })` lädt die abgeschirmte Wallet des Servers
- `mppx.charge()` verarbeitet den vollständigen 402-Challenge-/Verify-Lebenszyklus
- `result.withReceipt()` hängt die kryptografische Zahlungsquittung an die Antwort an

---
### TypeScript-Server - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Jede Challenge erzeugt eine **frische T-address**, wodurch Zahlungsanfragen sitzungsübergreifend nicht verknüpfbar sind.

---

### TypeScript-Client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Der Client fängt `402`-Antworten ab, öffnet automatisch eine Session und wiederholt die Anfrage – der aufrufende Code benötigt keine zahlungsspezifische Logik.

---

## Integration von Zimppy - Rust SDK

### Rust-Server (Axum)

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

**Wichtige Punkte:**
- `MppCharge<Price>` ist ein Axum-Extractor, der die Zahlung verifiziert, bevor der Handler ausgeführt wird
- `WithReceipt` verpackt die Antwort mit einem kryptografischen Zahlungsbeleg
- `ChargeConfig` definiert die Preislogik – sie kann auf Basis von Anfrageparametern dynamisch sein

---

### Rust-Client

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` erweitert jeden HTTP-Client um automatische 402-Behandlung, Session-Management und die Ausführung von Zcash-Zahlungen.

---

## CLI-Referenz

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Schlüssel generieren und Seed-Phrase anzeigen |
| `npx zimppy wallet whoami` | Adresse (UA + T-addr), Guthaben und Netzwerk anzeigen |
| `npx zimppy wallet balance --all` | Aufschlüsselung des Guthabens pro Konto |
| `npx zimppy wallet send <addr> <zat>` | Shielded oder transparente ZEC senden |
| `npx zimppy wallet transfer <from> <to> <zat>` | Internen kontoübergreifenden Transfer ausführen |
| `npx zimppy wallet shield` | Transparente Mittel nach Orchard verschieben (shielded) |
| `npx zimppy wallet use <name>` | Aktive Wallet-Identität wechseln |
| `npx zimppy request <url>` | Automatisch 402 -> bezahlen -> Anfrage wiederholen |

---

## Hauptfunktionen

### Agent-native Wallets

Zimppy-Wallets sind für die programmatische Nutzung durch KI-Agenten konzipiert – nicht für von Menschen verwaltete Browser-Erweiterungen. Schlüssel werden über die CLI oder SDKs verwaltet, Konten können über **ZIP-32 account derivation** rotiert werden, und die Wallet unterstützt vollständig automatisierte Zahlungsabläufe ohne menschliche Freigabe pro Transaktion.

### Unterstützung mehrerer Agenten

Mehrere Agenten können dieselbe Wallet über **ZIP-32 account rotation** nutzen – jeder Agent erhält sein eigenes Konto mit isolierter Guthabenverfolgung, kontoübergreifender Transfermöglichkeit und Guthabenberichten pro Konto. Das ermöglicht das Flottenmanagement vieler Agenten auf einer einzigen Wallet-Infrastruktur.

### Vollständig shielded Zcash-Transaktionen (Orchard)

Shielded Zahlungen verwenden das **Orchard protocol** von Zcash – den neuesten und sichersten shielded Pool. Der Server verifiziert Zahlungen mithilfe eines **Incoming Viewing Key (IVK)**, der empfangene Notes entschlüsseln kann, ohne den Spending Key offenzulegen. Replay-Angriffe werden durch **memo binding** verhindert – jede Challenge bettet ein eindeutiges `zimppy:{challenge_id}`-Memo ein, das kryptografisch verifiziert wird.

### Sessions , keine Latenz pro Anfrage

Die Session-Architektur entkoppelt die Wartezeit auf die On-Chain-Bestätigung von der Latenz pro Anfrage. Nach einer einzelnen Einzahlung (~75 Sekunden) werden alle nachfolgenden Bearer-Token-Anfragen bis zum Schließen der Session sofort bedient, ohne Blockchain-Interaktion.

### Streaming , Pay-Per-Token

Native Unterstützung für **SSE (Server-Sent Events)** ermöglicht Pay-Per-Token-gemessene Inhalte. Ideal für LLM-Inferenz-APIs, bei denen die Ausgabelänge variabel ist und die Abrechnung den tatsächlichen Verbrauch widerspiegeln sollte.

### Spezifikationskonformität

- Mit **HMAC-SHA256** signierte Challenges verhindern Fälschungen
- **RFC 9457** strukturiertes Fehlerformat für interoperable Fehlerbehandlung
- **`/.well-known/payment`** für die automatische Erkennung von Zahlungsmethoden durch jeden MPP-konformen Agenten

---

## Architektur

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

### Verantwortlichkeiten der Komponenten

**`zimppy-core`** - Der kryptografische Kern. Behandelt die Entschlüsselung von Orchard-Notes mithilfe des IVK des Servers, Memo-Parsing, Replay-Schutzlogik und Challenge-Verifizierung. In Rust geschrieben für Leistung und Korrektheit.

**`zimppy-wallet`** - Eine native Zcash-Wallet auf Basis von `zingolib`. Verwaltet Schlüssel, Konten, shielded/transparente Guthaben und die Übermittlung von Transaktionen.

**`zimppy-rs`** - Das Rust SDK. Stellt die Traits `ChargeMethod`, `SessionMethod` und `PaymentProvider` bereit sowie Axum-Extractors (`MppCharge`, `WithReceipt`) für eine ergonomische Server-Integration.

**`zimppy-napi`** - NAPI-RS-Bindings, die den Rust-Kern für Node.js verfügbar machen, sodass das TypeScript SDK dieselbe kryptografische Engine nutzen kann, ohne Zcash-Primitiven in JavaScript neu implementieren zu müssen.

**`zimppy-ts`** - Das TypeScript SDK. Umschließt NAPI-Bindings mit idiomatischen async/await-APIs für Charge-, Session- und SSE-Streaming-Flows.

**`zimppy-cli`** - Die Kommandozeilen-Wallet und das Anfragetool. Unterstützt Auto-Pay (402 -> bezahlen -> erneut anfragen), Session-Management und alle Wallet-Operationen.

---
## Beispiele & Demos

| Beispiel | Beschreibung |
|---|---|
| `examples/fortune-teller/` | Demos für Gebühren, Sitzungen und Streaming – Rust-Server + Client |
| `examples/llm-summarizer/` | Pay-per-Token-LLM-Streaming-Demo |
| `examples/mcp-server/` | MCP-Tool-Server mit kostenpflichtigen KI-Tools |
| `examples/ts-server/` | Referenzimplementierung eines TypeScript-MPP-Servers |

---

## Was enthalten ist – Funktionsübersicht

| Funktion | Beschreibung |
|---|---|
| **Sessions** | Einmal einzahlen, sofortige Bearer-Anfragen, Rückerstattung beim Schließen |
| **Streaming** | Nach Token abgerechnete Inhalte über SSE |
| **Charge** | Shielded oder transparente Zahlung pro HTTP-Anfrage (402-Ablauf) |
| **Transparent Payments** | T-Adressen mit Replay-Schutz pro Challenge + Shield-Befehl |
| **Multi-Account** | ZIP-32-Kontorotation, kontoübergreifende Überweisungen, Guthaben pro Konto |
| **CLI Wallet** | Senden, shield, transfer, balance --all, whoami, auto-pay |
| **Dual SDK** | TypeScript und Rust |
| **Spec-Compliant** | HMAC-SHA256-Challenges, RFC 9457-Fehler, `/.well-known/payment`-Discovery |

---

*Für weitere Informationen besuche [zimppy.xyz](https://zimppy.xyz).*

---

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) — Zcash-Wallets, die shielded Transaktionen unterstützen
- [Shielded Pools](/using-zcash/shielded-pools) — Wie Orchard-shielded-Transaktionen Zahlungsdaten schützen
- [Payment Processors](/using-zcash/payment-processors) — Weitere Möglichkeiten, Zcash-Zahlungen zu akzeptieren
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs und die Zukunft der Programmierbarkeit von Zcash
- [Community Projects](/zcash-community/community-projects) — Weitere Projekte im Zcash-Ökosystem
