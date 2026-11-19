# So führst du Zakura im Akash-Netzwerk aus

Schritt-für-Schritt-Anleitung für einen vollständigen **Zakura**-Zcash-Knoten mithilfe der Vorlage [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura ist ein konsenskompatibler Zcash-Knoten (abgezweigt von Zebra) mit schnellerer Synchronisierung, nativem Pruning und Snapshot-Bootstrap. Diese Vorlage verwendet fest **`zakuracore/zakura:1.8.1`** (mit Digest festgelegt; verwende nicht `:latest` oder `1.1.1`).

### Was du bekommst

- Mainnet-P2P: Container **8233**, global veröffentlicht (siehe Portzuordnung unten)
- Dauerhafter, bereinigter Zustand (standardmäßig 64 GiB) mit Valar-Snapshot-Bootstrap beim ersten Start
- Prometheus **9999** und Health **8080** (intern, keine öffentliche URI)
- JSON-RPC **8232** intern für den daneben bereitgestellten **lightwalletd**; LWD lauscht auf Container-Port **9067** und wird global veröffentlicht

Funktionsschalter im SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Die Cookie-Authentifizierung ist deaktiviert, wenn lightwalletd aktiviert ist, da lightwalletd keine Cookie-Dateien lesen kann.

### Welche Website verwenden (Zahlungen)

Das SDL ist identisch. Die beiden Akash-Web-UIs unterscheiden sich darin, **wie du bezahlst**.

| Website | Zahlungen | Wallet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Herkömmlicher Web-Checkout (Karte / Fiat-Zahlungswege, die Console anbietet) | Console-Konto |
| [air.akash.network](https://air.akash.network) | Native Zahlungen auf der Akash-Chain (AKT / ACT) | **Keplr** |

Verwende **Air**, wenn du mit Keplr On-Chain bezahlen möchtest. Verwende **Console** für einen herkömmlichen Web-Zahlungsablauf. Erwarte auf Console keine native Abwicklung mit Keplr.

### Bereitstellen

**Web-Zahlungen (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Native Akash-Zahlungen mit Keplr (Air)**

[Diese Vorlage auf Air öffnen](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Öffne den passenden Link oben (Console oder Air).
2. Verbinde auf Air **Keplr** und vergewissere dich, dass du AKT/ACT für die Einzahlung und das Lease hast. Schließe auf Console den im UI angezeigten Web-Checkout ab.
3. Lade `zcash-zakura/deploy.yaml`, falls es nicht bereits ausgefüllt ist.
4. Zahle ein, akzeptiere ein Gebot und warte auf das Lease.
5. In den Logs sollte der Snapshot-Download zu sehen sein (beim ersten Start), gefolgt von `zakurad start`.
6. Öffne **Leases → URIs**. Verwende den vom Anbieter zugewiesenen Host:Port, nicht 8233 oder 9067 auf der öffentlichen IP.

### Wie Akash Ports veröffentlicht

SDL-Ports `port` / `as` (8233, 9067, 8232) sind **Container-Ports**. Zakura lauscht weiterhin auf 8233; lightwalletd auf 9067; RPC auf 8232 für den LWD-Sidecar (`zakura:8232`).

Sie sind **nicht** die Ports auf der öffentlichen IP des Anbieters.

**Standard (diese Vorlage):** keine dedizierte IP. Jeder `global: true`-TCP-Expose wird einem **zufälligen hohen Port** auf einem gemeinsam genutzten Anbieter-Host zugeordnet. Console/Air führen sie als Lease-URIs auf, zum Beispiel:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peers verbinden sich mit der **8233**-URI (`provider.example:31482`). Kompakte Wallets verwenden die **9067**-URI (TLS ist deaktiviert, sofern du TLS nicht selbst terminierst). Setze `ZAKURA_NETWORK__EXTERNAL_ADDR` auf die zugeordnete P2P-URI, nicht auf `:8233`.

**Interne** Exposes (`8232` RPC, `9999` Metriken, `8080` Health) bleiben im Deployment-Netzwerk. Keine öffentliche URI.

**Dedizierte IPs** (`endpoints` / `kind: ip`) sind kostenpflichtig und in dieser Vorlage **nicht** enthalten. Sie können eine öffentliche IP und manchmal den `as`-Port festlegen. Füge das nur hinzu, wenn du einen stabilen `host:8233` benötigst.

### Archive vs. Pruned

Standardmäßig ist **Pruned** eingestellt (~11 GiB Snapshot, 64 GiB Festplatte). Für die vollständige Historie setze `SNAPSHOT_KIND=archive`, erhöhe den Festplattenspeicher auf mindestens 350 GiB und setze `ZAKURA_STATE__STORAGE_MODE=archive`.

### Verwandte Inhalte

- [Zebra auf Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (vollständige Historie, kein Snapshot)
- [Thus Spoke Zakura auf Akash](/guides/thus-spoke-zakura-akash) — Regtest-Dashboard + App (v0.4.1)
- Zakura-Quellcode: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshots: [zakura.com/snapshots/](https://zakura.com/snapshots/)
