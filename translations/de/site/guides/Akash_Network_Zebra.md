# So führst du Zebra im Akash Network aus

Schritt-für-Schritt-Anleitung zum Bereitstellen eines Zebra Zcash Full Node auf Akash.

### Was du bereitstellst

Ein vollständiger Zebra-Node, der:

-> die gesamte Zcash-Blockchain synchronisiert (100GB+ für Mainnet, ~40GB für Testnet)

-> je nach AKT-Token-Preis ungefähr $15/Monat kostet

-> mehrere Stunden bis Tage für die vollständige Synchronisierung benötigt

-> 4 vCPUs, 16GB RAM, 350GB Speicher (Mainnet) oder 2 vCPUs, 8GB RAM, 50GB (Testnet) verwendet


Das awesome-akash-Template pinnt jetzt **Zebra 7.0.0** (niemals `:latest`). Es aktiviert Prometheus (`9999`) und Health (`8080`) intern, JSON-RPC intern für ein zusammen mit ihm betriebenes **lightwalletd** über gRPC **9067** sowie die Feature-Flags `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Für einen schnelleren beschnittenen Mainnet-Knoten siehe [How to run Zakura auf Akash](/guides/akash-network-zakura). Für ein kurzlebiges Regtest-Dashboard siehe [Thus Spoke Zakura auf Akash](/guides/thus-spoke-zakura-akash).

### Wie Akash Ports veröffentlicht

Die Zahlen im SDL (`port` / `as`) sind **Container-Ports**. Zebra lauscht weiterhin auf **8233**, lightwalletd auf **9067**, der Gesundheitscheck auf **8080**. Diese Zahlen gelten für den Prozess und für andere Dienste in derselben Bereitstellung (`zebra:8232`).

Sie sind **nicht** die Ports auf der öffentlichen IP-Adresse des Anbieters.

**Standard (diese Vorlage):** keine dedizierte IP. Für jede `global: true`-TCP-Freigabe ordnet der Anbieter einen **zufälligen hohen Port** auf einem gemeinsam genutzten Host dem Container-Port zu. Nach Ablauf der Lease werden die tatsächlichen Endpunkte unter **Leases → URIs** in Console/Air aufgeführt, zum Beispiel:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peers und Wallets verwenden **diese** Host:Port-Werte. Kopiere die URI für die Freigabe, die dich interessiert (P2P oder lightwalletd). Wenn du `ZEBRA_NETWORK__EXTERNAL_ADDR` festlegst, setze es auf die zugeordnete P2P-URI (`provider.example:31482`), nicht auf `…:8233`.

**HTTP** (`as: 80` mit `http_options`, verwendet auf dem Thus Spoke-Dashboard): Viele Anbieter veröffentlichen einen **Ingress-Hostnamen** (oft auf 80/443) statt eines zufälligen TCP-Ports. Öffne die URI für diesen Dienst in einem Browser.

**Intern** (`global: false` oder `to: service: lightwalletd`): nur Cluster-DNS (`zebra:8232`). Keine öffentliche URI.

**Dedizierte IP-Adressen** (`endpoints` / `kind: ip` im SDL) sind ein **Premium-Extra**. Damit lässt sich eine öffentliche IP-Adresse fest zuweisen und manchmal auch der `as`-Port auf dieser IP-Adresse. Diese Vorlagen fordern keine an. Füge eine bei Bedarf später selbst hinzu, wenn du eine stabile `host:8233` möchtest; rechne mit zusätzlichen Kosten und weniger Anbietern, die Gebote abgeben.

### Welche Website sollte für Zahlungen verwendet werden?

Das SDL ist dasselbe. Die beiden Web-UIs von Akash unterscheiden sich darin, **wie du bezahlst**.

| Website | Zahlungen | Wallet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Traditioneller Web-Checkout (Karte / Fiat-Zahlungswege, die Console anbietet) | Console-Konto |
| [air.akash.network](https://air.akash.network) | Native Zahlungen über die Akash-Chain (AKT / ACT) | **Keplr** |

Verwende **Air**, wenn du Keplr on-chain bezahlen möchtest. Verwende **Console** für einen herkömmlichen Web-Zahlungsablauf. Erwarte auf Console keine native Abwicklung mit Keplr.

### Voraussetzungen

**Wenn du über die Console bezahlst (Web-Checkout)**

1. Ein Console-Konto unter [console.akash.network](https://console.akash.network)
2. Eine von der Console-Oberfläche akzeptierte Zahlungsmethode
3. Ein paar Minuten in der Benutzeroberfläche

**Wenn du mit Air bezahlst (natives Akash / Keplr)**

1. **Keplr**-Browser-Erweiterung (Chrome/Brave/Firefox)
2. **AKT / ACT** in Keplr für die Einzahlung und das Leasing (von einer Börse oder über IBC)
3. [air.akash.network](https://air.akash.network) öffnen

#### Schritt 1: Verbinden

**Konsole (Webzahlungen)**

-> Gehe zu [https://console.akash.network](https://console.akash.network)

-> Melde dich an / schließe den Kontovorgang in der Console ab

-> Verwende den Checkout, den die Benutzeroberfläche anzeigt (nicht Keplr on-chain)

**Air (native Akash-Zahlungen)**

-> Rufe [https://air.akash.network](https://air.akash.network) auf

-> Klicke auf **"Connect Wallet"**

-> Wähle **Keplr** und genehmige die Verbindung

-> Bestätige, dass dein AKT/ACT-Guthaben für die Einzahlung und die Lease ausreicht

#### Schritt 2: Deployment erstellen

-> Klicke auf **„Deploy“**

-> Wähle **"Build your template"** (oder springe direkt zum Hochladen des SDL)


##### Option A: SDL-Datei hochladen (empfohlen)

**Webzahlungen (Konsole)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Native Zahlungen mit Akash (Air) über Keplr**

[Öffne diese Vorlage auf Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Option B: SDL-Editor verwenden

Wenn du [das SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) manuell einfügen möchtest:

-> Kopiere den Inhalt von *zebra-akash.yml*

-> Füge ihn in den SDL-Editor ein

-> Passe ihn nach Bedarf an (siehe Konfigurationsabschnitt unten)

-> Klicke auf **"Create Deployment"**


#### Schritt 3: Einzahlung prüfen und freigeben

Die Benutzeroberfläche zeigt dir:

-> **Deployment-Einzahlung**: ~5 AKT (du bekommst sie zurück, wenn du das Deployment schließt)

-> **Geschätzte Kosten**: Basierend auf deiner SDL-Bepreisung

Klicke auf **Air** auf **„Approve“** und melde dich bei **Keplr** an. Schließe auf **Console** den Web-Checkout ab, den die Benutzeroberfläche anzeigt.

#### Schritt 4: Einen Provider auswählen

Nach etwa 30 Sekunden siehst du Gebote von Providern. Jedes Gebot zeigt:

-> **Preis pro Block** (in AKT oder USDC)

-> **Geschätzte monatliche Kosten**

-> **Provider-Details** (Uptime, Region usw.)


**Nimm nicht einfach den billigsten.** Prüfe:

-> Uptime % (ziele auf > 95%)

-> Region (näher bei dir = bessere Latenz, spielt bei Blockchain-Nodes aber keine große Rolle)

-> Audited-Status (grünes Häkchen = vertrauenswürdiger)


Klicke bei deinem ausgewählten Anbieter auf **„Accept Bid“**. Melde dich bei On Air an Keplr. Bestätige bei Console über den Web-Zahlungsablauf.

#### Schritt 5: Auf das Deployment warten

Die Console wird:

-> den Lease mit deinem gewählten Provider erstellen

-> das Manifest senden (es sagt dem Provider, was ausgeführt werden soll)

-> deinen Container starten

Das dauert 1–2 Minuten. Du siehst Statusaktualisierungen in der Benutzeroberfläche.

#### Schritt 6: Prüfen, ob es läuft

Sobald es bereitgestellt ist, siehst du:

-> Tab **Services**: Zeigt deinen *zebra*-Service mit Status

-> Tab **Logs**: Live-Container-Logs

-> Tab **Leases**: Details zu deinem Deployment (DSEQ, Provider, Kosten)


##### Die Logs prüfen

Klicke auf **Logs** und du solltest sehen, wie Zebra startet:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Die Synchronisierung dauert **Stunden bis Tage**, abhängig vom Netzwerk. Achte auf:

-> steigende Blockhöhen

-> Peer-Verbindungen (es sollten 10–30 Peers sein)

-> keine wiederholten Fehler


#### Schritt 7: Die Adresse deines Nodes abrufen

Klicke auf den Tab **Leases**, dann auf **URIs**.

Du siehst etwas wie:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Jede Zeile ist eine `global: true`-Freigabe. Der Name enthält den SDL-`as`-Port (8233, 9067). Die Zahl nach dem Hostnamen ist der **vom Anbieter zugewiesene Port**, der bei der Vergabe zugewiesen wird. Andere Zcash-Knoten verbinden sich mit `provider-hostname.com:31482`. Kompakte Wallets verwenden den lightwalletd-URI (TLS ist deaktiviert, sofern du TLS nicht selbst terminierst).

Der Container lauscht weiterhin auf 8233 / 9067. Die öffentliche Adresse ist immer die URI, es sei denn, du fügst später eine dedizierte IP-Adresse hinzu (nicht in dieser Vorlage).

### Konfigurationsoptionen

#### Auf Testnet umschalten

Das SDL verwendet standardmäßig Mainnet. Um stattdessen Testnet zu verwenden:

-> **Mainnet-Konfiguration auskommentieren** im Abschnitt *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Testnet-Konfiguration einkommentieren**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Den freigegebenen Port aktualisieren** im Abschnitt *expose*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Optional: Ressourcen reduzieren** für Testnet in *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Optional: Preis senken** in *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### RPC-Zugriff aktivieren

RPC ist aus Sicherheitsgründen standardmäßig deaktiviert. Um es zu aktivieren:

**Für Mainnet:**

-> Im Abschnitt *env* einkommentieren:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Den Mainnet-RPC-Port in *expose* einkommentieren:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Für Testnet:**

-> Im Abschnitt *env* einkommentieren:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Den Testnet-RPC-Port in *expose* einkommentieren:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Warnung**: Wenn du für RPC *global: true* setzt, gibst du es ins Internet frei. Zebra verwendet standardmäßig Cookie-Authentifizierung, aber trotzdem – tu das nicht, wenn du nicht genau weißt, was du tust.

Wenn du RPC mit `global: true` verfügbar machst, ist die öffentliche Adresse weiterhin ein **Lease-URI** (`host:&lt;random-high-port&gt;`) und nicht `host:8232`. Mit `global: false` (dieser Vorlage) bleibt RPC im Deployment-Netzwerk (`zebra:8232` für lightwalletd). Dedizierte IP-Leases sind eine separate kostenpflichtige Option und nicht im SDL enthalten.

#### Metriken aktivieren (Prometheus)

Um Metriken für das Monitoring zu erfassen:

-> In *env* einkommentieren:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Den Metrik-Port in *expose* einkommentieren:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Ressourcen/Preise anpassen

Wenn du keine Gebote bekommst oder die Kosten optimieren möchtest:

**Für Provider mit geringerer Ausstattung** im Abschnitt *profiles.compute.zebra.resources* reduzieren:

-> CPU: *units: 2* (Minimum für eine vernünftige Synchronisierungsgeschwindigkeit)

-> Speicher: *size: 12Gi* (Minimum für Stabilität)

-> Speicherplatz: *size: 120Gi* (Minimum für Mainnet)

**Um mehr Gebote anzuziehen**, in *profiles.placement.akash.pricing* erhöhen:

-> Mainnet: Probiere *amount: 1000000* uakt/block

-> Testnet: Probiere *amount: 1000000* uakt/block

### Dein Deployment aktualisieren

Musst du die Konfiguration nach der Bereitstellung ändern?

-> Gehe in der Console zu **My Deployments**

-> Finde dein Zebra-Deployment

-> Klicke auf **"Update Deployment"**

-> Bearbeite das SDL

-> Klicke auf **„Update“** (Air: melde dich bei Keplr an; Console: bestätige den Web-Zahlungsablauf)

**Hinweis**: Durch das Aktualisieren wird dein Container neu gestartet. Der Node setzt an seinem gespeicherten Zustand fort (persistenter Speicher), aber rechne mit 1–2 Minuten Ausfallzeit.

### Monitoring

#### Über die Console

-> Tab **Logs**: Live-Container-Logs

-> Tab **Shell**: Öffnet eine Shell innerhalb des Containers (nützlich zum Debuggen)

-> Tab **Events**: Kubernetes-Ereignisse (größtenteils nutzlos, außer wenn etwas kaputt ist)


#### Über RPC (falls aktiviert)

Wenn du RPC aktiviert hast, kannst du deinen Node wie einen normalen zebrad Full Node abfragen (denn genau das ist er!)

### Dein Deployment schließen

Wenn du fertig bist oder nicht mehr zahlen möchtest:

-> Gehe zu **My Deployments**

-> Finde dein Zebra-Deployment

-> Klicke auf **"Close Deployment"**

-> Bestätigen (Air: anmelden Keplr; Console: in der Console-UI bestätigen)

Deine 5 AKT Einzahlung wird zurückerstattet. **Persistenter Speicher** sollte vom Provider erhalten bleiben, aber verlass dich nicht darauf – behandle ihn wie bei jedem anderen Cloud-Provider.

### Fehlerbehebung

#### Fehler "Insufficient funds"

On Air Keplr mit AKT/ACT aufladen. Auf der Console die Zahlungsmethode aufladen.

#### Es werden keine Gebote angezeigt

Entweder:

-> Deine Preisangabe ist zu niedrig (erhöhe *amount* im SDL)

-> Deine Ressourcenanforderungen sind für verfügbare Provider zu hoch (reduziere CPU/Speicher/Speicherplatz)

-> Warte länger (manchmal dauert es 60–90 Sekunden, bis Gebote erscheinen)


#### Deployment hängt in "pending"

Der Provider könnte Probleme haben. Schließe das Deployment und versuche es mit einem anderen Provider.

#### Zebra-Logs zeigen "No peers connected"

Das ist in den ersten Minuten normal. Zebra findet Peers automatisch. Wenn es nach 10+ Minuten noch so ist, könnte ein Netzwerkproblem vorliegen (auf Akash eher unwahrscheinlich).

#### "Out of memory"-Fehler in den Logs

Du warst beim RAM zu geizig. Schließe das Deployment und stelle es mit mindestens 12Gi Speicher (16Gi empfohlen) erneut bereit.

#### Die Synchronisierung dauert ewig

Definiere „ewig“:

-> **Stunden**: Normal

-> **Tage**: Ebenfalls normal für Mainnet von Grund auf

-> **Wochen**: Etwas stimmt nicht, prüfe die Logs auf Fehler


### Kostenmanagement

Verfolge deine Ausgaben in Console oder Air:

-> **My Deployments** -> Dein Deployment -> Zeigt die Schätzung „Cost per month“

→ Air: Dein Keplr-AKT/ACT-Guthaben nimmt mit der Zeit ab. Console: Dein Console-Zahlungsguthaben nimmt ab.

Wenn dein Guthaben niedrig wird, schließt Akash dein Deployment automatisch. **Lade deine Wallet regelmäßig auf** oder richte Benachrichtigungen ein.

#### Kosten senken

-> **Verwende Testnet** für Tests außerhalb der Produktion (50 % günstiger)

-> **Verringere CPU/Speicher**, wenn du keine schnelle Synchronisierung brauchst

-> **Wähle günstigere Provider** (nicht immer klug – Uptime ist wichtig)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Beginne mit Testnet, wenn du nur den Bereitstellungsprozess testen möchtest. Siehe den Abschnitt „Auf Testnet umschalten“ oben für die Konfiguration.

### Zusätzliche Ressourcen

**Akash Console** (Web-Zahlungen): [https://console.akash.network](https://console.akash.network)

**Akash Air** (native AKT/ACT + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash-Dokumentation**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra-Dokumentation**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash-Explorer**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (für Provider-Probleme)
