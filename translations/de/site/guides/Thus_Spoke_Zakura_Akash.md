# Thus sprach Zakura auf Akash (Regtest)

Führe den Stack **Thus Spoke Zakura v0.4.1** auf Akash aus: Zakura Regtest, lightwalletd und das **Dashboard / die HTTP-API** der Wallet. Test-Coins haben keinen Wert. Sende hier keine Mainnet-ZEC.

Vorlage: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) Tag **v0.4.1**

### Images

| Dienst | Image |
| --- | --- |
| Dashboard + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (Pin in den Launcher 0.4.1 einkompiliert) |

### Selbst-Bootstrap

Beim ersten Start führt der Container `app` `ths-server init` auf seinem persistenten Volume aus und startet anschließend `ths-server serve`. Serve wiederholt den Versuch, bis Zakura JSON-RPC und lightwalletd verfügbar sind. Auf dem Provider muss `ths` nicht ausgeführt werden; das SDL ist die Laufzeitumgebung.

### Wie Akash Ports veröffentlicht

Die SDL-Ports `port` / `as` sind **Container-Ports**. Die App lauscht auf **8080** (`THS_LISTEN`); lightwalletd auf **9067**; Zakura RPC auf **18232** und P2P auf **18233**. Innerhalb des Deployments verwenden die Dienste diese Ports bereits (`http://zakura:18232`, `http://lightwalletd:9067`).

Es sind **nicht** die Ports auf der öffentlichen IP des Providers.

**Standard (diese Vorlage):** keine dedizierte IP.

| Dienst | Container-Port | SDL `as` | So wird er auf dem Lease angezeigt |
| --- | --- | --- | --- |
| `app` (Dashboard + HTTP-API) | 8080 | 80 (HTTP) | Ingress-Hostname, oft auf 80/443 — **diese URI im Browser öffnen** |
| `lightwalletd` | 9067 | 9067 (TCP, global) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, global) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, global) | `host:&lt;random-high-port&gt;` |

Sobald das Lease bereit ist, ist **Leases → URIs** maßgeblich. Öffne die URI **`app`** für das Dashboard (dieselbe Benutzeroberfläche, die `ths` lokal öffnet). Richte kompakte Clients auf die URI **lightwalletd** aus (`THS_LIGHTWALLETD_TLS=false`). Gib `:8080`, `:80` oder `:9067` nicht auf der Provider-IP ein, es sei denn, ein Lease mit dedizierter IP hat diese Ports öffentlich zugänglich gemacht.

**Dedizierte IPs** (`endpoints` / `kind: ip`) sind kostenpflichtige Extras und in dieser Vorlage **nicht** enthalten. Sie können eine öffentliche IP und manchmal den Port `as` fest zuweisen. Lass sie deaktiviert, sofern du sie nicht benötigst.

### Welche Website verwenden (Zahlungen)

Das SDL ist identisch. Die beiden Web-UIs von Akash unterscheiden sich darin, **wie du bezahlst**.

| Website | Zahlungen | Wallet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Herkömmlicher Web-Checkout (Karte / Fiat-Zahlungswege, die Console anbietet) | Console-Konto |
| [air.akash.network](https://air.akash.network) | Native Zahlungen auf der Akash-Blockchain (AKT / ACT) | **Keplr** |

Verwende **Air**, wenn du on-chain mit Keplr bezahlen möchtest. Verwende **Console** für einen herkömmlichen Web-Zahlungsablauf.

### Bereitstellen

**Web-Zahlungen (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Native Zahlungen mit Akash und Keplr (Air)**

[Diese Vorlage in Air öffnen](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Erstelle das Deployment anhand der Vorlage, nimm ein Gebot an und warte, bis die Logs von `app` zeigen, dass `ths-server serve` dauerhaft ausgeführt wird. Öffne anschließend die URI **`app`** für das Dashboard.

### Verwandte Seiten

- [Zakura auf Akash](/guides/akash-network-zakura) — Validierungsknoten für Mainnet/Testnet
- [Zebra auf Akash](/guides/akash-network-zebra)
- Buch: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
