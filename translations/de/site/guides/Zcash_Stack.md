<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Stack: Einen Light-Wallet-Server auf Kubernetes oder Docker betreiben

[Zcash Stack](https://github.com/zecrocks/zcash-stack) ist das Open-Source-Deployment-Kit des Teams hinter zec.rocks. Es bündelt einen vollständigen Zcash-Knoten, einen Light-Wallet-Server und optionale Extras (Zaino, einen Block-Explorer, einen verborgenen Dienst von Tor, einen DNS-Seeder, zecd, einen gRPC-Web-Proxy für Browser-Wallets) als Helm-Chart für Kubernetes und als Docker-Compose-Dateien. Alle zec.rocks-lightwalletd-Server laufen mit diesem Chart. Das Projekt wird von [Zcash Community Grants](https://zcashcommunitygrants.org/) finanziert.

Diese Seite fasst zusammen, was das Kit bereitstellt, was vor der Installation nötig ist und welche Einstellungen am wichtigsten sind. Sie bezieht sich auf Chart-Version **0.4.9** (veröffentlicht am 13. November 2026). Die maßgeblichen Referenzen sind die [Chart-README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) und die [Workshop-Notizen](https://github.com/zecrocks/zcash-stack/tree/main/docs) des Projekts. Lies sie, bevor du etwas in einer Produktionsumgebung ausführst.

## Kurzfassung

- **Zwei Möglichkeiten für den Einstieg.** Ein Helm-Chart für Kubernetes (k3s auf eigener NVMe-Hardware ist das Hauptziel; GKE Standard und Autopilot funktionieren ebenfalls) sowie Docker-Compose-Dateien für einen einzelnen Rechner. Der Workshop empfiehlt Docker für alle, die neu im Serverbetrieb sind, und Kubernetes für alle, die bereits Serverflotten betreiben.
- **Ein Blockchain-Knoten plus ein Light-Wallet-Server.** Empfohlen wird Zebra + lightwalletd. Zakura kann Zebra als Backend ersetzen, und Zaino kann lightwalletd ersetzen oder parallel dazu laufen.
- **Plane etwa 600 GiB Speicherplatz ein.** Der Chain-Status von Zebra umfasste im Juni 2026 etwa 260 GiB und wächst weiter; der Cache der Light-Wallet fügt etwa 17 GiB hinzu. Eine vollständige Synchronisierung dauert Tage. Daher kann das Chart stattdessen einen veröffentlichten Snapshot wiederherstellen.
- **Die Image-Versionen sind im Chart festgelegt.** In Version 0.4.9 sind das Zebra 7.0.0 (folgt NU7), lightwalletd v0.6.1, Zakura 1.8.6 und Zaino 0.8.0. Aktualisiere das Chart vor Netzwerk-Upgrades und bevor eine Zakura-Version ihre Support-Endhöhe erreicht.
- **Registriere deinen Server.** Öffentliche Betreiber können ihren Server beim Monitor [hosh.zec.rocks](https://hosh.zec.rocks/zec) eintragen lassen, damit Wallets und Nutzer sehen können, ob er erreichbar ist.

## Was bereitgestellt wird

Jede Komponente lässt sich über einen Schalter in der [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml)-Datei des Charts aktivieren. Standardmäßig ist nur lightwalletd eingeschaltet. Da dafür ein Blockchain-Knoten benötigt wird, aktivieren die Beispieldateien auch Zebra.

| Komponente | Image in Chart 0.4.9 | Standard | Funktion |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | aus (in den Beispielen eingeschaltet) | Vollständiger Knoten; validiert die Blockchain und stellt RPC für alle anderen Komponenten bereit |
| Zakura | `zakuracore/zakura:1.8.6` | aus | Zebra-Fork; direkter Ersatz für lightwalletd oder Zaino anstelle von Zebra als Backend |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | ein | Light-Wallet-Server (gRPC) für Mobil- und Desktop-Wallets |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | aus | Rust-Indexer, der auch Light-Wallets bedient |
| Block-Explorer | `emersonian/zcash-explorer:v0.0.6` | aus | Web-Explorer, der die JSON-RPC-Schnittstelle des Knotens nutzt (Zaino kann ihn nicht bereitstellen: Es unterstützt nur gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | aus | Stellt lightwalletd oder Zaino als `.onion`-Dienst bereit |
| DNS-Seeder | `zfnd/dnsseeder:v1.8.0` | aus | Hilft neuen Knoten, Peers zu finden |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | aus | Shielded-orientierter Wallet-Server (siehe [zecd](/zcash-tech/zecd)) |
| gRPC-Web-Proxy | `envoyproxy/envoy:v1.40.2` | aus | Ermöglicht Browser-Wallets die Verbindung zu lightwalletd, das Browser nicht über rohes gRPC erreichen können |
| WebZjs-Wallet | `ghcr.io/zecrocks/webzjs-wallet` | aus | Browser-Wallet; benötigt den gRPC-Web-Proxy auf demselben Host |

Zwei Hinweise zu Versionen. Das Upstream-Projekt von Zaino ist bereits bei [0.10.1](https://github.com/zingolabs/zaino/releases), während das Chart weiterhin das Image 0.8.0 ausliefert. Prüfe daher `values.yaml`, bevor du dich auf neuere Funktionen von Zaino verlässt. Außerdem stoppen Zakura-Knoten im Mainnet bei einer versionsabhängigen Support-Endhöhe: Für 1.8.6 ist das Block 3.643.309, voraussichtlich am 5. Dezember 2026. Seit Version 1.8.0 starten x86-64-Builds zudem nicht mehr auf CPUs ohne BMI2 und ADX. Die Seite [Zakura Node](/zcash-tech/zakura-node) behandelt beide Themen.

## Kubernetes: vor der Installation

Das Chart setzt drei Dinge voraus, die du einmal pro Cluster einrichtest.

1. **Einen Ingress-Controller.** Das Chart erstellt eine standardmäßige Kubernetes-`Ingress`-Ressource und verwendet standardmäßig die Klasse `nginx`. ingress-nginx wird empfohlen, da es gRPC auf k3s und GKE auf dieselbe Weise verarbeitet. Installiere k3s entweder mit `--disable traefik` oder behalte Traefik bei und setze `ingress.className: traefik` sowie `ingress.backendProtocol: GRPC` (das Chart erstellt dann eine Traefik-`IngressRoute`-Ressource, da ein einfacher Ingress über Traefik bei gRPC den HTTP-500-Fehler zurückgibt). Auf GKE kann die eingebaute Ingress-Klasse `gce` gRPC nicht zu lightwalletd oder Zaino weiterleiten.
2. **cert-manager und einen ClusterIssuer** für automatische Let's-Encrypt-Zertifikate (`examples/cluster-issuer.yaml`; teste zuerst mit dem Staging-Issuer). Installiere cert-manager auf GKE Autopilot mit `--set global.leaderElection.namespace=cert-manager`, sonst schlägt die Erstellung des Issuers mit einem x509-Fehler „unknown authority“ fehl. Du kannst cert-manager überspringen und `<service>.ingress.tls.secretName` auf dein eigenes Zertifikat verweisen lassen.
3. **Einen StorageClass.** `local-path` eignet sich für k3s mit NVMe. Weise Zebra auf GKE eine bereitgestellte Klasse IOPS zu (das Repository enthält ein Hyperdisk-Beispiel) und erhöhe vorher das regionale Speicherkontingent: Neue GKE-Projekte erlauben pro Region nur 500 GB SSD und 500 GB Hyperdisk. Ein Blockchain-Knoten benötigt 300 bis 500 GB, andernfalls bleibt das Volume mit `QUOTA_EXCEEDED` im Status `Pending` hängen. `storageClassName` lässt sich bei einem bestehenden StatefulSet nicht ändern, ohne das Volume neu zu erstellen.

Richte anschließend für jeden Hostnamen einen DNS-Eintrag ein, der auf die externe IP-Adresse des Ingress-Controllers verweist. Falls du noch keinen DNS-Eintrag hast, trage neben deinem echten Hostnamen einen Namen von [sslip.io](https://sslip.io) ein, etwa `203-0-113-7.sslip.io`. Er wird zur eingebetteten IP-Adresse aufgelöst, sodass sofort ein Zertifikat ausgestellt wird. Verwende bei dauerhaft betriebenen Servern deinen eigenen Hostnamen als primären Namen.

## Kubernetes: Installation

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

Das [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml)-Beispiel aktiviert Zebra, verbindet lightwalletd damit, weist lightwalletd einen Cache von 40 GiB und einen TLS-Ingress zu und hält die RPC-Schnittstelle des Knotens innerhalb des Clusters. Ändere vor der Installation den Platzhalter für RPC-Benutzername und -Passwort. Weitere Beispiele gibt es für Testnet, GKE, GKE Autopilot mit hoher Verfügbarkeit, einen verborgenen Dienst von Tor und die Einrichtung mit sslip.io.

Für ein Upgrade führe `helm repo update` aus, prüfe die Änderungen mit dem helm-diff-Plugin (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`) und führe anschließend `helm upgrade` mit denselben Argumenten aus. Wenn du von einem Chart der Version 0.0.x kommst, lies zuerst [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md): Version 0.1.0 ersetzte die alte Traefik-Konfiguration durch einen standardmäßigen Ingress und cert-manager; außerdem änderte sich die Struktur der Werte.

## Dimensionierung

| | Normalbetrieb | Erste Synchronisierung | Speicherplatz |
|:--|:--|:--|:--|
| Zebra | ~0,1 vCPU, 1,6 GiB | CPU-, IOPS- und speicherintensiv | ~260 GiB (Juni 2026) und wachsend; Standardwert im Chart: 500 GiB |
| lightwalletd | ~0,15 vCPU, 165 MiB | erstellt seinen Cache Block für Block | ~17 GiB; Standardwert im Chart: 40 GiB |

Der gesamte Stack benötigt etwa 1,5 vCPU und 4,5 GiB Arbeitsspeicher. Für einen einzelnen Rechner empfiehlt das Chart 8 vCPU, 32 GiB RAM und etwa 1 TB NVMe (auf GKE eine `n2-standard-8` mit einem 500-GiB-Hyperdisk- oder pd-ssd-Volume). Die Standardanforderungen erfüllen bereits die Mindestanforderungen von GKE Autopilot. CPU-Limits sind nicht gesetzt, damit die Synchronisierung bei Bedarf mehr CPU nutzen kann.

## Wichtige Einstellungen

**Snapshot-Wiederherstellung.** Setze `<chain>.initSnapshot.enabled: true` (mit `initSnapshot.url`, `gs://` oder `https://`), um mit einem veröffentlichten Snapshot zu starten, statt von Genesis an zu synchronisieren. Die Wiederherstellung protokolliert den Fortschritt, setzt einen unterbrochenen Download sauber fort und löscht niemals ein intaktes Volume einer früheren Installation. Ein Snapshot ist ein Vertrauensvorschuss: Nachfolgende Blöcke werden weiterhin validiert, und ein fehlerhafter Snapshot zeigt sich durch Blöcke, die sich nicht validieren lassen. Laut Workshop dauert eine Synchronisierung von Grund auf etwa 10 Tage, der Start mit einem Snapshot etwa 10 Stunden.

**Skalierung und unterbrechungsfreier Betrieb.** lightwalletd und Zaino sind schlanke Caches vor dem Knoten. Verwende `replicas: 2` für fortlaufende Aktualisierungen ohne Ausfallzeit (bei mehr als einem Replikat wird automatisch ein PodDisruptionBudget hinzugefügt). Blockchain-Knoten eignen sich nicht zur Lastverteilung: Jedes Replikat ist ein weiterer vollständiger Knoten mit eigenem Volume und eigener Synchronisierung. Betreibe daher einen Knoten oder zwei für Redundanz.

**Eingehende Peers.** Standardmäßig stellt Zebra nur ausgehende Verbindungen her. `zebra.p2pPublic.enabled: true` nimmt eingehende Peers auf Port 8233 (18233 im Testnet) an und gibt deine Adresse bekannt. Wähle `externalAddrFrom: hostIP` auf Bare Metal und k3s, `nodeExternalIP` in Clouds, in denen die IP-Adresse des Knotens privat ist, oder `loadBalancer` mit einer reservierten statischen IP auf GKE Autopilot.

**TLS und gRPC.** TLS endet am Ingress, und innerhalb des Clusters wird unverschlüsseltes HTTP/2 verwendet. Daher können mehrere Hostnamen auf denselben lightwalletd verweisen. Verwende `path: /` zusammen mit `pathType: Prefix`, da gRPC dies für die Methodenpfade benötigt. Schlägt das erste Zertifikat wegen der HTTPS-Weiterleitung fehl, stelle es mit dem Staging-Issuer aus oder setze vorübergehend `ingress.tls.sslRedirect: "false"`.

**Verborgener Dienst von Tor.** Nützlich, wenn dein Cluster keine öffentliche IP-Adresse oder Domain hat:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Lies die Adresse mit `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` aus und teste sie über einen lokalen Tor-Client mit [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Bei Netzwerk-Upgrades.** Zebra kann Peers mit veralteten Versionen sperren und dadurch hängen bleiben; im Protokoll steht dann, dass die Aktualisierungen der Blockchain ins Stocken geraten sind. Die Sperrliste liegt im Arbeitsspeicher. Mit `kubectl delete pod zebra-0` wird sie geleert; der Pod startet mit denselben Blockchain-Daten neu, ohne erneut synchronisieren zu müssen.

## Docker Compose

Für einen einzelnen Rechner klone das Repository und starte die Standarddatei aus dem Ordner `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` führt auf x86 Zebra, lightwalletd und [Watchtower](https://containrrr.dev/watchtower/) aus; `compose.arm.yaml` macht dasselbe auf ARM-Hosts. Watchtower lädt neue Images automatisch herunter. Die Standarddatei verwendet den Tag `zfnd/zebra:latest`, sodass der Knoten neuen Zebra-Versionen ohne manuelle Upgrades folgt. `compose.zaino.yaml` ersetzt lightwalletd durch Zaino, verwendet jedoch ein veraltetes Community-Image (`emersonian/zcash-zaino:0.1.2-zr4`). Prüfe es daher, bevor du es einsetzt. Weitere Dateien fügen ein Caddy-TLS-Frontend, einen VPS-Proxy und einen autossh-Tunnel für Knoten zu Hause hinzu.

Setze `LIGHTWALLETD_DONATION_ADDRESS` in der Datei `.env` auf deine eigene Unified Address, um sie als Spendenadresse des Servers zu veröffentlichen. Wenn du `./download-snapshot.sh` aus dem Ordner `docker/` vor dem ersten `docker compose up` ausführst, wird ein Blockchain-Snapshot heruntergeladen, statt von Grund auf zu synchronisieren.

## Verbindung und Überwachung

Die zweite Workshop-Einheit behandelt, wie du den Server erreichbar machst: mit einer öffentlichen statischen IP-Adresse, indem du deine Heim-IP-Adresse hinter einem SSH-Tunnel zu einem VPS oder Tailscale Funnel verbirgst, oder indem du einen reinen Tor-Server betreibst. Teste das Ergebnis, indem du eine Wallet damit verbindest (unter ZODL in den erweiterten Einstellungen; siehe [Server in deiner Wallet ändern](/zcash-tech/lightwallet-nodes)) oder `GetLightdInfo` mit einem gRPC-Client aufrufst.

Die dritte Einheit behandelt die manuellen Docker-Befehle zur Überwachung und empfiehlt, einen öffentlichen Server bei [hosh](https://hosh.zec.rocks/zec), dem zec.rocks-Uptime-Monitor, zu registrieren. Die Registrierung erfolgt über einen Pull Request, der Hostname und Port zur hosh-Serverliste hinzufügt. Hilfe zu den einzelnen Schritten gibt es im Forum der [zec.rocks-Workshops](https://workshops.zec.rocks).

## Häufige Fehler

**lightwalletd ohne Blockchain-Knoten installieren.** lightwalletd liest von Zebra (oder Zakura). Aktiviere einen davon oder starte mit einer Beispieldatei, die dies bereits tut.

**Die RPC-Zugangsdaten aus dem Beispiel unverändert lassen.** Die Beispiele enthalten Platzhalter. RPC bleibt innerhalb des Clusters, trotzdem solltest du die Zugangsdaten ändern.

**Einen Blockchain-Knoten mit dem standardmäßigen GKE-Speicherkontingent betreiben.** Das Volume wird nie eingebunden. Erhöhe das regionale Kontingent vor der Installation.

**Zebra für mehr Leistung skalieren.** Jedes Zebra-Replikat führt eine zusätzliche vollständige Synchronisierung durch. Skaliere stattdessen lightwalletd oder Zaino.

**Ein veraltetes Chart über ein Netzwerk-Upgrade hinweg verwenden.** Ein Knoten, der vor einem Upgrade veröffentlicht wurde, folgt dem Mainnet danach nicht mehr (Zebra benötigt seit NU7 Version 7.0.0 oder höher). Führe `helm repo update` aus und aktualisiere das Chart vor Aktivierungshöhen und den Support-Endhöhen von Zakura.

## Verwandte Seiten

- [Zcash Lightwallet-Knoten](/zcash-tech/lightwallet-nodes): Was ein Light-Wallet-Server sehen kann und was nicht, sowie öffentliche Server.
- [Zebra Vollständiger Knoten](/zcash-tech/zebra-full-node): der Validator, den dieser Stack betreibt.
- [Zakura Node](/zcash-tech/zakura-node): der Zebra-Fork, den das Chart alternativ ausführen kann.
- [Zaino](/zcash-tech/zaino): der Rust-Indexer.
- [zecd](/zcash-tech/zecd): der Wallet-Server, den das Chart hinzufügen kann.
- [Zcash RPC und Indizierung des Knotens](/guides/zcash-node-rpc-and-indexing): Zebra-RPC, Zallet und Indexer.
- [So betreibst du Zebra im Akash-Netzwerk](/guides/akash-network-zebra): eine weitere Möglichkeit, einen Knoten zu betreiben.

## Ressourcen

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (Repository, Releases und Beispiele)
- [Zcash Stack Helm-Chart-README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Workshop-Notizen: Synchronisieren, Verbinden, Beobachten](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact-Hub-Eintrag](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (Monitor öffentlicher Server)

**Zuletzt aktualisiert:** November 2026 (Chart 0.4.9)
