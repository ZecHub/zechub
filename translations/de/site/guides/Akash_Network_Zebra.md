# So führst du Zebra im Akash Network aus

Schritt-für-Schritt-Anleitung zum Bereitstellen eines Zebra Zcash Full Node mit der [Akash Console](https://console.akash.network).

### Was du bereitstellst

Ein vollständiger Zebra-Node, der:

-> die gesamte Zcash-Blockchain synchronisiert (100GB+ für Mainnet, ~40GB für Testnet)

-> je nach AKT-Token-Preis ungefähr $15/Monat kostet

-> mehrere Stunden bis Tage für die vollständige Synchronisierung benötigt

-> 4 vCPUs, 16GB RAM, 350GB Speicher (Mainnet) oder 2 vCPUs, 8GB RAM, 50GB (Testnet) verwendet


### Wichtig: Portzuordnung auf Akash

Wenn du einen Port auf Akash freigibst (z. B. Port 8233 für Zebra P2P), wird er **NICHT an genau diesen Port** auf der öffentlichen IP des Providers gebunden. Stattdessen weist der Provider einen zufälligen hohen Port zu (wie 31234 oder 42567) und leitet ihn per Reverse Proxy an Port 8233 deines Containers weiter.

Das ist so vorgesehen – Provider betreiben mehrere Deployments, und es käme zu Konflikten, wenn jeder versuchen würde, Port 8233 direkt zu verwenden.

**Was das für dich bedeutet:**

-> Du konfigurierst Port 8233 im SDL (Zebras Standard-P2P-Port)

-> Akash gibt dir eine URI wie *provider.com:31234*

-> Andere Zcash-Nodes verbinden sich mit dir unter *provider.com:31234*

-> Innerhalb deines Containers lauscht Zebra weiterhin auf 8233


Das wird automatisch gehandhabt. Verwende einfach die URI, die Akash dir gibt.

### Voraussetzungen

1. Browser-Erweiterung **Keplr Wallet** installiert (Chrome/Brave/Firefox)
2. **AKT-Token** – Besorge dir 50–100 AKT über eine Börse (Coinbase, Kraken, Osmosis)
3. **5 Minuten**, um dich durch die Console-Oberfläche zu klicken

#### Schritt 1: Verbinde deine Wallet

-> Gehe zu [https://console.akash.network](https://console.akash.network)

-> Klicke oben rechts auf **"Connect Wallet"**

-> Wähle **Keplr** (oder deine bevorzugte Cosmos-Wallet)

-> Bestätige die Verbindung, wenn Keplr aufpoppt


Dein AKT-Guthaben sollte oben rechts erscheinen. Falls es null ist, fülle zuerst deine Wallet auf.

#### Schritt 2: Deployment erstellen

-> Klicke auf die Schaltfläche **"Deploy"** (große blaue Schaltfläche in der Mitte der Seite)

-> Wähle **"Build your template"** (oder springe direkt zum Hochladen des SDL)


##### Option A: SDL-Datei hochladen (empfohlen)

[![Auf Akash bereitstellen](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Option B: SDL-Editor verwenden

Wenn du [das SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) manuell einfügen möchtest:

-> Kopiere den Inhalt von *zebra-akash.yml*

-> Füge ihn in den SDL-Editor ein

-> Passe ihn nach Bedarf an (siehe Konfigurationsabschnitt unten)

-> Klicke auf **"Create Deployment"**


#### Schritt 3: Einzahlung prüfen und freigeben

Die Console zeigt dir:

-> **Deployment-Einzahlung**: ~5 AKT (du bekommst sie zurück, wenn du das Deployment schließt)

-> **Geschätzte Kosten**: Basierend auf deiner SDL-Bepreisung

Klicke auf **"Approve"** und signiere die Transaktion in Keplr.

#### Schritt 4: Einen Provider auswählen

Nach etwa 30 Sekunden siehst du Gebote von Providern. Jedes Gebot zeigt:

-> **Preis pro Block** (in AKT oder USDC)

-> **Geschätzte monatliche Kosten**

-> **Provider-Details** (Uptime, Region usw.)


**Nimm nicht einfach den billigsten.** Prüfe:

-> Uptime % (ziele auf > 95%)

-> Region (näher bei dir = bessere Latenz, spielt bei Blockchain-Nodes aber keine große Rolle)

-> Audited-Status (grünes Häkchen = vertrauenswürdiger)


Klicke bei deinem gewählten Provider auf **"Accept Bid"** und signiere in Keplr.

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

```bash
zebra-8233: provider-hostname.com:31234
```

Das ist der **öffentliche P2P-Endpunkt** deines Nodes. Andere Zcash-Nodes verbinden sich mit dir über diese Adresse.

**Beachte die Portzuordnung:** Du hast Port 8233 im SDL konfiguriert, aber Akash hat ihn einem anderen öffentlichen Port zugewiesen (31234 in diesem Beispiel). Das ist normal – siehe den Abschnitt „Portzuordnung auf Akash“ oben, falls dich das verwirrt. Dein Node ist über den Port erreichbar, den Akash hier anzeigt, nicht zwingend über 8233.

Wenn du RPC aktiviert hast (im SDL standardmäßig auskommentiert), siehst du hier auch den RPC-Endpunkt mit seinem eigenen zugeordneten Port.

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

**Erinnerung zur Portzuordnung**: Selbst wenn du RPC global freigibst, ordnet Akash es einem zufälligen hohen Port zu (nicht 8232/18232). Prüfe die URIs in deinem Deployment, um den tatsächlichen öffentlichen Endpunkt zu sehen. Bei *global: false* (empfohlen) ist der RPC-Endpunkt nur innerhalb des Akash-Deployment-Netzwerks erreichbar, nicht aus dem öffentlichen Internet.

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

-> Klicke auf **"Update"** und bestätige in Keplr

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

-> Bestätige und signiere in Keplr

Deine 5 AKT Einzahlung wird zurückerstattet. **Persistenter Speicher** sollte vom Provider erhalten bleiben, aber verlass dich nicht darauf – behandle ihn wie bei jedem anderen Cloud-Provider.

### Fehlerbehebung

#### Fehler "Insufficient funds"

Du benötigst mehr AKT. Fülle deine Keplr-Wallet auf.

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

Überwache deine Ausgaben in der Console:

-> **My Deployments** -> Dein Deployment -> Zeigt die Schätzung „Cost per month“

-> Das Guthaben deiner Keplr-Wallet nimmt im Laufe der Zeit ab


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

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash-Dokumentation**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra-Dokumentation**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash-Explorer**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (für Provider-Probleme)
