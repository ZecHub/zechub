<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** ist eine datenschutzorientierte Zahlungsinfrastruktur für KI-Agenten, die das Machine Payment Protocol (MPP) von Zcash verwendet
- **Einmal einzahlen** on-chain (~75 Sekunden), dann **unbegrenzte sofortige Anfragen** ohne Blockchain-Interaktion pro Anfrage stellen
- Unterstützt **vollständig abgeschirmte Zcash (Orchard)**-Zahlungen — Sender, Empfänger, Betrag und Memo sind alle verschlüsselt
- Funktioniert mit **TypeScript- und Rust-SDKs** für eine einfache Integration in KI-Pipelines und API-Server
- Perfekt für **LLM-APIs, Datenmarktplätze, MCP-Tool-Server** und jeden M2M-Zahlungsanwendungsfall

---

> **Zimppy** ist die Zahlungsmethode des Machine Payment Protocol (MPP) für Zcash und unterstützt sowohl abgeschirmte als auch transparente Zahlungen. Einmal on-chain einzahlen und anschließend unbegrenzte sofortige Inhaber-Anfragen ohne Chain-Interaktion pro Anfrage stellen.

---

## Inhaltsverzeichnis

1. [Was ist Zimppy.xyz?](#what-is-zimppyxyz)
2. [Warum abgeschirmte Zahlungen für KI-Agenten?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Wie Zimppy funktioniert](#how-zimppy-works)
   - [Sitzungen (empfohlen)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Abrechnung](#charge)
5. [Anwendungsfälle & Beispiele](#use-cases--examples)
6. [Installation](#installation)
7. [Einrichtung der Zimppy Wallet](#setting-up-the-zimppy-wallet)
8. [Integration von Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (abgeschirmt)](#typescript-server--shielded)
   - [Server (transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Integration von Zimppy – Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [CLI-Referenz](#cli-reference)
11. [Hauptfunktionen](#key-features)
12. [Architektur](#architecture)
13. [Beispiele & Demos](#examples--demos)

---

## Was ist Zimppy.xyz?

**Zimppy.xyz** ist eine datenschutzorientierte Zahlungsinfrastruktur, die speziell für KI-Agenten und automatisierte Machine-to-Machine-(M2M)-Workflows entwickelt wurde. Es implementiert das **Machine Payment Protocol (MPP)** mit **Zcash** als zugrunde liegender Währung und ermöglicht sowohl abgeschirmte (vollständig private) als auch transparente Zahlungsmodi.

Anders als bei herkömmlichen Blockchain-Zahlungssystemen, bei denen jede Transaktion on-chain öffentlich sichtbar ist, basiert Zimppy auf einer sitzungsbasierten Architektur, die Latenz pro Anfrage eliminiert und gleichzeitig kryptografische Privatsphäre bewahrt. Dadurch eignet es sich besonders für KI-Agenten, die programmgesteuert für APIs, Daten, Rechenleistung oder KI-Tools bezahlen müssen, ohne Verhaltensmetadaten preiszugeben.

### Kerneigenschaften

- **Einmal einzahlen** on-chain (~75 Sekunden für eine Zcash-Bestätigung)
- **Unbegrenzte sofortige Anfragen** nach Sitzungsbeginn, keine Chain-Interaktion pro Anfrage
- **Abgeschirmte Zahlungen** verschlüsseln Sender, Empfänger, Betrag und Memo mit dem Orchard-Protokoll von Zcash
- **Transparente Zahlungen** verwenden T-Adressen pro Challenge zur Replay-Verhinderung ohne vollständige Privatsphäre
- **Spezifikationskonform**, HMAC-SHA256-Challenges, RFC-9457-Fehler, `/.well-known/payment`-Erkennung

---

## Warum abgeschirmte Zahlungen für KI-Agenten?

Für KI-Agenten, die sensible Workflows, Rechtsrecherchen, medizinische Anfragen oder Finanzanalysen bearbeiten, ist **jede öffentliche Zahlung ein Metadatenleck**. Zimppy ist die einzige MPP-Zahlungsmethode, die **standardmäßig privat** ist.

### Tabelle zum Datenschutzvergleich

| Eigenschaft | Öffentliche Chains (USDC, ETH) | Zimppy abgeschirmt | Zimppy transparent |
|---|---|---|---|
| **Sender** | Sichtbar | Verschlüsselt | Sichtbar |
| **Empfänger** | Sichtbar | Verschlüsselt | Pro Challenge (nicht verknüpfbar) |
| **Betrag** | Sichtbar | Verschlüsselt | Sichtbar |
| **Memo** | Sichtbar | Verschlüsselt | N/V |
| **Replay-Schutz** | Keiner | Memo-Bindung | T-Adresse pro Challenge |
| **Dienstnutzungsmuster** | Verknüpfbar | Privat | Nicht verknüpfbar (neue Adresse) |

### Das Latenzproblem, durch Sitzungen gelöst

> *„Aber Zcash hat Blockzeiten von 75 Sekunden.“*

**Sitzungen lösen das.** Das Warten on-chain geschieht bei der Einzahlung genau **einmal**. Jede nachfolgende Anfrage erfolgt sofort.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Einmal zahlen, sofort aufrufen, Wechselgeld zurückerhalten.** Die Latenz pro Anfrage beträgt null.

---

## Machine Payment Protocol (MPP)

Das **Machine Payment Protocol (MPP)** ist ein standardisiertes Protokoll, das autonomen Software-Agenten (KI-Agenten, Bots, Skripten) ermöglicht, Zahlungsanforderungen für API-Zugriff zu erkennen, auszuhandeln und zu erfüllen – ganz ohne menschliches Eingreifen.

### Wie MPP mit APIs integriert wird

MPP folgt dem HTTP-Ablauf **402 Payment Required**:

1. **Der Agent fordert** eine Ressource von einem kostenpflichtigen API-Endpunkt an.
2. **Der Server antwortet** mit `402 Payment Required` + einer signierten Challenge (Betrag, Empfänger, Memo).
3. **Der Agent bezahlt** mit einer kompatiblen Zahlungsmethode (z. B. abgeschirmtes Zcash über Zimppy).
4. **Der Agent wiederholt** die Anfrage mit `Authorization: Payment {txid}`.
5. **Der Server verifiziert** die Zahlung kryptografisch (Orchard-IVK-Entschlüsselung, Prüfung von Betrag + Memo).
6. **Der Server antwortet** mit `200 OK` + einem `Payment-Receipt`-Header.

### Spezifikationskonformität

- **HMAC-SHA256**-Signierung von Challenges
- **RFC 9457** strukturierte Fehlerantworten
- **`/.well-known/payment`**-Endpunkt zur automatischen Erkennung von Zahlungsmethoden
- **Orchard IVK** (Incoming Viewing Key) zur serverseitigen Zahlungsverifizierung ohne Offenlegung von Ausgabeschlüsseln

---

## Wie Zimppy funktioniert

### Sitzungen (empfohlen)

Sitzungen sind das primäre Interaktionsmuster. Der Agent zahlt einmal on-chain ein, erhält ein Inhaber-Token und verwendet es für alle nachfolgenden Anfragen ohne Latenz.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Am besten geeignet für:** API-Aufrufe mit hoher Frequenz, LLM-Inferenz, wiederholte Datenabfragen.

---

### Streaming

Nach Token abgerechnete Inhalte werden über **Server-Sent Events (SSE)** bereitgestellt. Der Server zieht pro gestreamtem Wort oder Token vom Sitzungsguthaben ab.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Am besten geeignet für:** Gestreamte LLM-Antworten, Echtzeitdatenfeeds, KI-Tools mit Abrechnung pro Token.

---

### Abrechnung

Eine einzelne abgeschirmte Zahlung pro Anfrage. Der vollständige HTTP-402-Ablauf wird bei jedem Aufruf ausgeführt. Geeignet, wenn Anfragen selten oder hochwertig sind.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Am besten geeignet für:** Hochwertige Einzelanfragen, seltene API-Aufrufe, Premium-Datenendpunkte.

---

## Anwendungsfälle & Beispiele

### 1. KI-Agent

Ein juristischer KI-Agent fragt eine kostenpflichtige Datenbank für Rechtsprechung ab. Mit abgeschirmten Zimppy-Sitzungen sind weder die Identität der Kanzlei noch die konkreten Anfragen on-chain sichtbar – das schützt das Anwaltsgeheimnis auf Infrastrukturebene.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. KI-Agent für eine Pipeline medizinischer Anfragen

Ein medizinischer Diagnose-Agent fragt mehrere klinische Datenbanken ab. Abgeschirmte Zahlungen stellen sicher, dass Anfragemuster von Patienten nicht über verschiedene Anbieter hinweg verknüpft werden können.

### 3. Finanzanalyse-Agent

Ein algorithmischer Handels-Agent zahlt für APIs mit Echtzeit-Marktdaten. Transparente Zahlungen verwenden für jede Challenge neue T-Adressen und verhindern so die Korrelation von Nutzungsmustern zwischen Datenanbietern.

### 4. MCP-Tool-Server, kostenpflichtige KI-Tools

Ein MCP-(Model Context Protocol)-Server stellt kostenpflichtige KI-Tools bereit. Jeder Tool-Aufruf löst eine Zimppy-Abrechnung aus und ermöglicht einen Marktplatz monetarisierter KI-Fähigkeiten.

### 5. LLM-Zusammenfasser, Abrechnung pro Token

Ein LLM-Zusammenfassungsdienst berechnet Agenten pro Ausgabetoken über SSE-Streaming, mit automatischem Abzug vom Guthaben und Rückerstattung ungenutzter vorausbezahlter Beträge.

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

## Einrichtung der Zimppy Wallet

Die Zimppy CLI bietet eine vollständige Wallet-Oberfläche. Alle Befehle sind über `npx zimppy` verfügbar.

### Schritt 1 : Eine Wallet erstellen

```bash
npx zimppy wallet create
```

Erzeugt kryptografische Schlüssel und zeigt deine **Seed-Phrase** an. Bewahre diese sicher auf – sie kann bei Verlust nicht wiederhergestellt werden.

### Schritt 2 : Adresse und Guthaben prüfen

```bash
npx zimppy wallet whoami
```

Zeigt deine **Unified Address (UA)**, **T-Adresse**, das aktuelle Guthaben und das aktive Netzwerk an.

```bash
npx zimppy wallet balance --all
```

Zeigt eine Aufschlüsselung des Guthabens pro Konto über alle ZIP-32-Konten hinweg.

### Schritt 3 : Deine Wallet aufladen

Sende ZEC von einer beliebigen Zcash-kompatiblen Wallet oder Börse an deine Unified Address. Abgeschirmte Einzahlungen gehen direkt auf dein Orchard-Konto.

### Schritt 4 : Geld senden und abschirmen

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

Verarbeitet automatisch den vollständigen Ablauf 402 -> bezahlen -> erneut versuchen. Sitzungen werden transparent geöffnet und verwaltet.

---

## Integration von Zimppy – TypeScript SDK

### TypeScript-Server – abgeschirmt

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
- `mppx.charge()` verarbeitet den vollständigen Lebenszyklus aus 402-Challenge und Verifizierung
- `result.withReceipt()` fügt der Antwort den kryptografischen Zahlungsbeleg hinzu

---

### TypeScript-Server – transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Jede Challenge erzeugt eine **neue T-Adresse**, wodurch Zahlungsanfragen über Sitzungen hinweg nicht verknüpfbar sind.

---

### TypeScript-Client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Der Client fängt `402`-Antworten ab, öffnet automatisch eine Sitzung und wiederholt die Anfrage – der aufrufende Code benötigt keine zahlungsspezifische Logik.

---

## Integration von Zimppy – Rust SDK

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
- `WithReceipt` umschließt die Antwort mit einem kryptografischen Zahlungsbeleg
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

`send_with_payment` erweitert jeden HTTP-Client um automatische 402-Verarbeitung, Sitzungsverwaltung und die Abwicklung von Zcash-Zahlungen.

---

## CLI-Referenz

| Befehl | Beschreibung |
|---|---|
| `npx zimppy wallet create` | Schlüssel erzeugen und Seed-Phrase anzeigen |
| `npx zimppy wallet whoami` | Adresse (UA + T-Adresse), Guthaben und Netzwerk anzeigen |
| `npx zimppy wallet balance --all` | Aufschlüsselung des Guthabens pro Konto |
| `npx zimppy wallet send <addr> <zat>` | Abgeschirmte oder transparente ZEC senden |
| `npx zimppy wallet transfer <from> <to> <zat>` | Interne kontoübergreifende Übertragung |
| `npx zimppy wallet shield` | Transparente Mittel nach Orchard verschieben (abgeschirmt) |
| `npx zimppy wallet use <name>` | Aktive Wallet-Identität wechseln |
| `npx zimppy request <url>` | Anfrage automatisch mit 402 -> bezahlen -> erneut versuchen |

---

## Hauptfunktionen

### Agent-native Wallets

Zimppy Wallets sind für die programmgesteuerte Nutzung durch KI-Agenten konzipiert – nicht für von Menschen verwaltete Browser-Erweiterungen. Schlüssel werden über die CLI oder SDKs verwaltet, Konten können über **ZIP-32-Kontoableitung** rotiert werden, und die Wallet unterstützt vollständig automatisierte Zahlungsabläufe ohne menschliche Genehmigung pro Transaktion.

### Unterstützung mehrerer Agenten

Mehrere Agenten können dieselbe Wallet über **ZIP-32-Kontorotation** verwenden – jeder Agent erhält ein eigenes Konto mit isolierter Guthabenverfolgung, kontoübergreifenden Übertragungsmöglichkeiten und Guthabenberichten pro Konto. Das ermöglicht die Verwaltung vieler Agenten über eine einzige Wallet-Infrastruktur.

### Vollständig abgeschirmte Zcash-Transaktionen (Orchard)

Abgeschirmte Zahlungen verwenden das **Orchard-Protokoll** von Zcash – den neuesten und sichersten abgeschirmten Pool. Der Server verifiziert Zahlungen mit einem **Incoming Viewing Key (IVK)**, der empfangene Notes entschlüsseln kann, ohne den Ausgabeschlüssel offenzulegen. Replay-Angriffe werden durch **Memo-Bindung** verhindert – jede Challenge enthält ein eindeutiges `zimppy:{challenge_id}`-Memo, das kryptografisch verifiziert wird.

### Sitzungen, keine Latenz pro Anfrage

Die Sitzungsarchitektur entkoppelt das Warten auf die On-chain-Bestätigung von der Latenz pro Anfrage. Nach einer einzigen Einzahlung (~75 Sekunden) werden alle nachfolgenden Inhaber-Token-Anfragen sofort und ohne Blockchain-Interaktion bedient, bis die Sitzung geschlossen wird.

### Streaming, Abrechnung pro Token

Native Unterstützung für **SSE (Server-Sent Events)** ermöglicht nach Token abgerechnete Inhalte. Ideal für LLM-Inferenz-APIs, bei denen die Ausgabelänge variabel ist und die Abrechnung den tatsächlichen Verbrauch widerspiegeln soll.

### Spezifikationskonformität

- **HMAC-SHA256**-signierte Challenges verhindern Fälschungen
- **RFC 9457** strukturiertes Fehlerformat für interoperable Fehlerbehandlung
- **`/.well-known/payment`** zur automatischen Erkennung von Zahlungsmethoden durch jeden MPP-konformen Agenten

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

**`zimppy-core`** – Der kryptografische Kern. Verarbeitet die Entschlüsselung von Orchard-Notes mit dem IVK des Servers, Memo-Parsing, Replay-Schutzlogik und die Verifizierung von Challenges. Für Leistung und Korrektheit in Rust geschrieben.

**`zimppy-wallet`** – Eine native Zcash Wallet auf Basis von `zingolib`. Verwaltet Schlüssel, Konten, abgeschirmte/transparente Guthaben und die Übermittlung von Transaktionen.

**`zimppy-rs`** – Das Rust SDK. Stellt die Traits `ChargeMethod`, `SessionMethod` und `PaymentProvider` sowie Axum-Extractors (`MppCharge`, `WithReceipt`) für eine ergonomische Serverintegration bereit.

**`zimppy-napi`** – NAPI-RS-Bindings, die den Rust-Kern für Node.js verfügbar machen und es dem TypeScript SDK ermöglichen, dieselbe kryptografische Engine zu verwenden, ohne Zcash-Primitiven in JavaScript neu zu implementieren.

**`zimppy-ts`** – Das TypeScript SDK. Umhüllt NAPI-Bindings mit idiomatischen async/await-APIs für Abrechnungs-, Sitzungs- und SSE-Streaming-Abläufe.

**`zimppy-cli`** – Das Kommandozeilen-Wallet- und Anfrage-Tool. Unterstützt Auto-Pay (402 -> bezahlen -> erneut versuchen), Sitzungsverwaltung und alle Wallet-Operationen.

---

## Beispiele & Demos

| Beispiel | Beschreibung |
|---|---|
| `examples/fortune-teller/` | Abrechnungs-, Sitzungs- und Streaming-Demos – Rust-Server + Client |
| `examples/llm-summarizer/` | LLM-Streaming-Demo mit Abrechnung pro Token |
| `examples/mcp-server/` | MCP-Tool-Server mit kostenpflichtigen KI-Tools |
| `examples/ts-server/` | Referenzimplementierung eines TypeScript-MPP-Servers |

---

## Enthaltene Funktionen – Zusammenfassung

| Funktion | Beschreibung |
|---|---|
| **Sitzungen** | Einmal einzahlen, sofortige Inhaber-Anfragen, Rückerstattung beim Schließen |
| **Streaming** | Nach Token abgerechnete Inhalte über SSE |
| **Abrechnung** | Abgeschirmte oder transparente Zahlung pro HTTP-Anfrage (402-Ablauf) |
| **Transparente Zahlungen** | T-Adressen mit Replay-Schutz pro Challenge + Shield-Befehl |
| **Mehrere Konten** | ZIP-32-Kontorotation, kontoübergreifende Übertragungen, Guthaben pro Konto |
| **CLI Wallet** | Senden, abschirmen, übertragen, Guthaben --all, whoami, Auto-Pay |
| **Duales SDK** | TypeScript und Rust |
| **Spezifikationskonform** | HMAC-SHA256-Challenges, RFC-9457-Fehler, `/.well-known/payment`-Erkennung |

---

*Weitere Informationen findest du auf [zimppy.xyz](https://zimppy.xyz)*

---

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) — Zcash Wallets, die abgeschirmte Transaktionen unterstützen
- [Abgeschirmte Pools](/using-zcash/shielded-pools) — Wie abgeschirmte Orchard-Transaktionen Zahlungsdaten schützen
- [Zahlungsabwickler](/using-zcash/payment-processors) — Weitere Möglichkeiten, Zcash-Zahlungen zu akzeptieren
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs und die Zukunft der Programmierbarkeit von Zcash
- [Community-Projekte](/zcash-community/community-projects) — Weitere Projekte des Zcash-Ökosystems
