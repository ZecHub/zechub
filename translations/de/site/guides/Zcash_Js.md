# Zcash JS-Entwicklerleitfaden

**zcash.js** (`@zcashlabs/zcash.js`) ist ein experimentelles TypeScript/JavaScript SDK, das am 26. Oktober 2026 von Zcash Labs veröffentlicht wurde. Es ermöglicht Entwicklern, Wallets, Light Clients, Dashboards und Anwendungen zu erstellen, die über Node.js und den Browser mit dem Zcash-Netzwerk interagieren.

> **Status**: Experimentell (v0.1.1). Persistente Knoten-Wallets erfordern derzeit Linux + `flock`. Vollständiges Senden/Empfangen im Live-Browser sowie die Migration historischer Wallet-Datenbanken sind noch nicht vollständig qualifiziert. Prüfen Sie vor dem Einsatz in der Produktion stets die offizielle Dokumentation.

## Was das SDK bietet

- `createPublicClient` — zustandslose JSON-RPC-Abfragen und Transaktionsbeobachtung
- `createLightClient` — Lightwallet-Abfragen und -Streams (natives gRPC auf Knoten, gRPC-Web im Browser)
- `createWalletClient` — lokale Konten, Scannen, Vorschläge, Signierung, Übermittlung und Wiederherstellung aufgezeichneter Zahlungen
- Exakte `bigint`-Beträge, Netzwerkvalidierung, Viewing-/Adresswerkzeuge und PCZT-Dienstprogramme
- Gebündelte Basis-Wallet-Engine, Worker und lokale Sapling-Proving-Assets (keine separate Rust-Installation erforderlich)

## Installation

Verwenden Sie **Node.js 22.23.4** (die vom Paket festgelegte Version).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Bevorzugen Sie TypeScript mit ESM (`"type": "module"` in `package.json`).
- Browser-Anwendungen funktionieren über einen modernen ESM-Bundler. Der Bundler erzeugt lazy geladene WASM-, Worker- und Proving-Assets — diese müssen gemeinsam mit Ihrer Anwendung bereitgestellt werden.

## Erste Chain-Abfrage (ohne Wallet)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Das Weglassen der Option `network` verwendet standardmäßig Mainnet (geben Sie einen passenden Endpunkt an).
- Für die reine JSON-RPC-Nutzung ist auch ein `createPublicClient` verfügbar.

## Eine Wallet öffnen

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

### Speicheroptionen

| Umgebung     | Speicheroption                                      |
|-----------------|-----------------------------------------------------|
| Knoten (dauerhaft)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Temporär      | `{ kind: 'memory' }`                                |

**Wichtige Standardwerte** (Stand v0.1.1):

- Ausgaben und Wechselgeld erfolgen standardmäßig ausschließlich über Ironwood
- Gebührenregel: ZIP-317
- Bestätigungen: 3 vertrauenswürdig / 3 nicht vertrauenswürdig
- Rufen Sie vor dem Vorschlagen einer Zahlung immer `wallet.sync()` auf

## High-Level-Wallet-Workflow

1. Erstellen oder importieren Sie ein mnemonisches Konto und verbinden Sie einen Signierer
2. Rufen Sie `wallet.sync()` auf
3. Fordern Sie eine Empfangsadresse an (bevorzugt Unified / Ironwood)
4. Erstellen Sie einen Vorschlag → prüfen Sie ihn → rufen Sie `wallet.send()` auf
5. Warten Sie auf die Bestätigung oder verwenden Sie aufgezeichnete Vorgänge zur Wiederherstellung nach einem Neustart

Die Anwendung verwaltet die Mnemonic-Bytes. Löschen Sie sie aus dem Speicher, sobald sie nicht mehr benötigt werden. Zeigen Sie stets eine eindeutige Bestätigungsoberfläche an, die jeden Empfänger, Betrag, jede Gebühr, jeden Pool und das Ablaufdatum aufführt.

Ein vollständiges funktionierendes Beispiel finden Sie in der offiziellen [Wallet-Anleitung](https://zcashlabs.github.io/zcashjs/api/walkthrough.html).

## Plattformhinweise & aktuelle Einschränkungen

| Funktion            | Knoten                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Paket               | Knoten 22.23.4 + ESM                | Moderner ESM-Bundler + WebAssembly |
| Light-Abfragen         | Natives gRPC                       | gRPC-Web + CORS                  |
| Dauerhafter Speicher       | Linux + `flock` nur              | OPFS (sicherer Kontext)            |
| Temporärer Speicher    | Speicher                            | Speicher                           |

Zusätzliche Einschränkungen:

- Persistenter Knoten-Speicher ist derzeit nur für Linux verfügbar
- Noch keine verwaltete Secret-Vault, kein Remote-Proving-Dienst und keine Hardware-Signierer-Integration
- Der Speicher wird **nicht** als verschlüsselt im Ruhezustand ausgewiesen
- Öffnen Sie denselben Wallet-Speicher nicht gleichzeitig aus mehreren Prozessen oder Browser-Tabs
- Schließen Sie die Wallet immer ordnungsgemäß mit `await wallet.close()`

## Nächste Schritte

- Offizielle Installation & erste Anfrage: [Installation](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Öffnen und Konfigurieren einer Wallet: [Eine Wallet öffnen](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Vollständiger Workflow: [Wallet-Anleitung](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API-Referenz: [API-Referenz](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Plattformbeschränkungen: [Knoten- und Browser-Einrichtung](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Offizielle Ressourcen

- Entwicklerhandbuch: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub-Repository: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm-Paket: `@zcashlabs/zcash.js`


---

*Dieser Leitfaden basiert auf `@zcashlabs/zcash.js@0.1.1` (Oktober 2026). Das SDK befindet sich in aktiver Entwicklung — ziehen Sie für die neueste API und aktuelle Einschränkungen stets die offizielle Dokumentation vor.*
