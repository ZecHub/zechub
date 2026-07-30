# Bereitstellung von zcashd auf Akash über die Console

Anleitung zur Bereitstellung eines zcashd Zcash Full Nodes (Electric Coin Co-Implementierung) mit der [Akash Console](https://console.akash.network). Unten findest du ein Video-Tutorial. Eine ausführlichere Anleitung folgt darunter.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Einrichtung eines Zcash Full Nodes im Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Was du bereitstellst

Ein vollständiger zcashd-Node, der:

-> die gesamte Zcash-Blockchain synchronisiert (350GB+ für Mainnet, ~ 40GB für Testnet)

-> ungefähr 15 $/Monat kostet, abhängig vom AKT-Token-Preis

-> mehrere Stunden bis Tage für die vollständige Synchronisierung benötigt

-> 4 vCPUs, 16GB RAM, 350GB Speicher (Mainnet) oder 2 vCPUs, 8GB RAM, 50GB (Testnet) verwendet

-> beim ersten Start kryptografische Parameter herunterlädt (~ 2GB, einmalig)

**zcashd vs Zebra:**

-> zcashd ist die ursprüngliche Zcash-Node-Implementierung von Electric Coin Co

-> Zebra ist die alternative Implementierung der Zcash Foundation

-> Beide sind mit dem Zcash-Netzwerk kompatibel

-> zcashd hat mehr Funktionen (Mining, Wallet, Insight Explorer API)

-> Verwende zcashd, wenn du Wallet-Funktionalität oder bestimmte RPC-APIs benötigst


### **Wichtig: Port-Mapping auf Akash**

Wenn du auf Akash einen Port freigibst (z. B. Port 8233 für zcashd P2P), wird er **NICHT an genau diesen Port** auf der öffentlichen IP des Providers gebunden. Stattdessen weist der Provider einen zufälligen hohen Port zu (wie 31234 oder 42567) und leitet ihn per Reverse Proxy auf den Port 8233 deines Containers weiter.

Das ist so vorgesehen – Provider betreiben mehrere Deployments, und es gäbe Konflikte, wenn alle direkt Port 8233 verwenden würden.

**Was das für dich bedeutet:**

-> Du konfigurierst Port 8233 in der SDL (zcashds Standard-P2P-Port)

-> Akash gibt dir eine URI wie *provider.com:31234*

-> Andere Zcash-Nodes verbinden sich mit dir unter *provider.com:31234*

-> Innerhalb deines Containers lauscht zcashd weiterhin auf 8233


Das wird automatisch gehandhabt. Verwende einfach die URI, die dir Akash gibt.

## Voraussetzungen

-> installierte **Keplr Wallet**-Browser-Erweiterung (Chrome/Brave/Firefox)

-> **AKT-Token** – Besorge dir 50–100 AKT über eine Börse (Coinbase, Kraken, Osmosis)

-> **5 Minuten**, um dich durch die Console-Oberfläche zu klicken


## Schritt 1: Verbinde deine Wallet

-> Gehe zu [https://console.akash.network](https://console.akash.network)

-> Klicke oben rechts auf **"Connect Wallet"**

-> Wähle **Keplr** (oder deine bevorzugte Cosmos-Wallet)

-> Bestätige die Verbindung, wenn Keplr erscheint


Dein AKT-Guthaben sollte oben rechts angezeigt werden. Wenn es null ist, lade zuerst deine Wallet auf.

## Schritt 2: Deployment erstellen

-> Klicke auf die Schaltfläche **"Deploy"** (große blaue Schaltfläche in der Mitte der Seite)

-> Wähle **"Build your template"** (oder springe direkt zum Hochladen der SDL)

### Option A: SDL-Datei hochladen (empfohlen)

[![Auf Akash deployen](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Option B: SDL-Editor verwenden

Wenn du die SDL manuell einfügen möchtest:

-> Kopiere den Inhalt von *zcashd-akash.yml*

-> Füge ihn in den SDL-Editor ein

-> Passe sie nach Bedarf an (siehe Konfigurationsabschnitt unten)

-> Klicke auf **"Create Deployment"**


## Schritt 3: Einzahlung prüfen und genehmigen

Die Console zeigt dir:

-> **Deployment-Einzahlung**: ~ 5 AKT (du bekommst diesen Betrag zurück, wenn du das Deployment schließt)

-> **Geschätzte Kosten**: Basierend auf der Preisgestaltung deiner SDL


Klicke auf **"Approve"** und signiere die Transaktion in Keplr.

## Schritt 4: Einen Provider auswählen

Nach ~ 30 Sekunden siehst du Gebote von Providern. Jedes Gebot zeigt:

-> **Preis pro Block** (in AKT oder USDC)

-> **Geschätzte monatliche Kosten**

-> **Provider-Details** (Uptime, Region usw.)


**Nimm nicht einfach den billigsten.** Prüfe:

-> Uptime % (ziele auf > 95 %)

-> Region (näher bei dir = bessere Latenz, spielt bei Blockchain-Nodes aber keine große Rolle)

-> Audit-Status (grüner Haken = vertrauenswürdiger)


Klicke bei deinem gewählten Provider auf **"Accept Bid"** und signiere in Keplr.

## Schritt 5: Auf das Deployment warten

Die Console wird:

-> den Lease mit deinem gewählten Provider erstellen

-> das Manifest senden (teilt dem Provider mit, was ausgeführt werden soll)

-> deinen Container starten


Das dauert 1–2 Minuten. Du siehst Statusaktualisierungen in der Benutzeroberfläche.

## Schritt 6: Prüfen, ob es läuft

Sobald es bereitgestellt ist, siehst du:

-> Registerkarte **Services**: Zeigt deinen *zcashd*-Service mit Status

-> Registerkarte **Logs**: Live-Logs von deinem zcashd-Node

-> Registerkarte **Leases**: Details zu deinem Deployment (DSEQ, Provider, Kosten)


### Die Logs prüfen

Klicke auf **Logs** und du solltest sehen, wie zcashd startet:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Beim ersten Start werden zcash-params heruntergeladen (~2GB).** Das ist ein einmaliger Vorgang und dauert je nach Bandbreite des Providers 5–10 Minuten. Bei späteren Neustarts wird dieser Schritt übersprungen.

Die Synchronisierung dauert **Stunden bis Tage**, abhängig vom Netzwerk. Achte auf:

-> steigende Blockhöhen

-> Peer-Verbindungen (sollten 10–30 Peers sein)

-> keine sich wiederholenden Fehler


## Schritt 7: Die Adresse deines Nodes abrufen

Klicke auf die Registerkarte **Leases**, dann auf **URIs**.

Du siehst etwas wie:

```
zcashd-8233: provider-hostname.com:31234
```

Das ist der **öffentliche P2P-Endpunkt** deines Nodes. Andere Zcash-Nodes verbinden sich unter dieser Adresse mit dir.

**Beachte das Port-Mapping:** Du hast Port 8233 in der SDL konfiguriert, aber Akash hat ihn einem anderen öffentlichen Port zugewiesen (31234 in diesem Beispiel). Das ist normal – siehe oben den Abschnitt „Port-Mapping auf Akash“, falls dich das verwirrt. Dein Node ist über den Port erreichbar, den Akash hier anzeigt, nicht unbedingt über 8233.

Wenn du RPC aktiviert hast (in der SDL standardmäßig auskommentiert), siehst du hier auch den RPC-Endpunkt mit seinem eigenen zugeordneten Port.

## Konfigurationsoptionen

### Auf Testnet umstellen

Die SDL verwendet standardmäßig Mainnet. Um stattdessen Testnet zu verwenden:

-> **Ändere das Netzwerk im Abschnitt *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Aktualisiere den freigegebenen Port** im Abschnitt *expose*:

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

-> **Optional: Ressourcen reduzieren** für Testnet in *profiles.compute.zcashd.resources*:

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

> beachte, dass niedrigere Preise möglicherweise dazu führen, dass unsere Provider nicht mitbieten. experimentiere mit diesem Wert oder verwende den Provider-Endpunkt, um zu prüfen, ob sie bieten würden. (siehe Provider-API-Dokumentation)

### RPC-Zugriff aktivieren

RPC ist standardmäßig aus Sicherheitsgründen deaktiviert. Um ihn zu aktivieren:

**KRITISCH: Setze starke Zugangsdaten.** zcashd RPC überträgt Benutzername/Passwort über HTTP (nicht HTTPS). Gib RPC nur frei, wenn du die Sicherheitsimplikationen verstehst.

-> Im Abschnitt *env* auskommentieren:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Den RPC-Port in *expose* auskommentieren:

   **Für Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Für Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Warnung**: Wenn du für RPC *global: true* setzt, gibst du es mit Basic Auth ins Internet frei. Das ist keine gute Idee. Verwende *global: false* und greife über das interne Netzwerk von Akash auf RPC zu oder richte einen sicheren Tunnel ein.

**Erinnerung zum Port-Mapping**: Selbst wenn du RPC global freigibst, ordnet Akash ihm einen zufälligen hohen Port zu (nicht 8232/18232). Prüfe die URIs in deinem Deployment, um den tatsächlichen öffentlichen Endpunkt zu sehen. Bei *global: false* (empfohlen) ist der RPC-Endpunkt nur innerhalb des Akash-Deployment-Netzwerks erreichbar, nicht aus dem öffentlichen Internet.

### Transaktionsindex aktivieren

Der Transaktionsindex erlaubt dir, jede Transaktion per ID über RPC abzufragen. Verwendet mehr Speicherplatz (~ 20 % mehr).

In *env* auskommentieren:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Warnung**: Das Aktivieren von txindex auf einem bereits synchronisierten Node erfordert eine Neuindizierung der gesamten Blockchain, was Stunden dauert.

### Insight Explorer aktivieren

Insight Explorer stellt zusätzliche REST-API-Endpunkte für Blockchain-Daten bereit (nützlich für Block Explorer).

In *env* auskommentieren:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Dadurch wird txindex automatisch aktiviert und zusätzliche RPC-Methoden werden hinzugefügt.

### Prometheus-Metriken aktivieren

Um Metriken für das Monitoring zu scrapen:

-> Im Abschnitt *env* auskommentieren:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Den Metrik-Port in *expose* auskommentieren:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metriken sind dann unter http://yourendpoint:9969/metrics im Prometheus-Format verfügbar.

### Ressourcen/Preise anpassen

Wenn du keine Gebote erhältst oder die Kosten optimieren möchtest:

**Für Provider mit geringerer Ausstattung** reduziere im Abschnitt *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (Minimum für vernünftige Synchronisierungsgeschwindigkeit)

-> Arbeitsspeicher: *size: 12Gi* (Minimum für Stabilität)

-> Speicher: *size: 120Gi* (Minimum für Mainnet)


**Um mehr Gebote anzuziehen**, erhöhe in *profiles.placement.akash.pricing*:

-> Mainnet: Probiere *amount: 15000* uakt/block

-> Testnet: Probiere *amount: 7500* uakt/block


Die SDL-Werte sind konservativ hoch angesetzt. Die meisten Provider werden niedriger bieten.

## Dein Deployment aktualisieren

Musst du die Konfiguration nach dem Deployment ändern?

-> Gehe in der Console zu **My Deployments**

-> Finde dein zcashd-Deployment

-> Klicke auf **"Update Deployment"**

-> Bearbeite die SDL

-> Klicke auf **"Update"** und genehmige in Keplr


**Hinweis**: Das Aktualisieren startet deinen Container neu. Der Node setzt an seinem gespeicherten Zustand fort (persistenter Speicher), aber rechne mit 1–2 Minuten Ausfallzeit.

## Monitoring

### Über die Console

-> Registerkarte **Logs**: Live-Container-Logs

-> Registerkarte **Shell**: Öffne eine Shell im Container (nützlich für Debugging)

-> Registerkarte **Events**: Kubernetes-Ereignisse (meist nutzlos, außer wenn etwas kaputt ist)


### Über RPC (falls aktiviert)

Wenn du RPC aktiviert hast, kannst du deinen Node wie einen normalen zcashd Full Node abfragen (denn genau das ist er!)

### zcash-cli-Alternative

Wenn du über die Console Shell-Zugriff hast, kannst du *zcash-cli* direkt verwenden:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Dein Deployment schließen

Wenn du fertig bist oder nicht mehr zahlen möchtest:

-> Gehe zu **My Deployments**

-> Finde dein zcashd-Deployment

-> Klicke auf **"Close Deployment"**

-> Bestätige und signiere in Keplr


Deine 5 AKT Einzahlung wird zurückerstattet. **Persistenter Speicher** sollte vom Provider erhalten bleiben, aber verlass dich nicht darauf – behandle ihn wie bei jedem anderen Cloud-Provider.

## Fehlerbehebung

### Fehler „Insufficient funds“

Du brauchst mehr AKT. Lade deine Keplr-Wallet auf.

### Es werden keine Gebote angezeigt

Entweder:

-> Deine Preisgestaltung ist zu niedrig (erhöhe *amount* in der SDL)

-> Deine Ressourcenanforderungen sind für verfügbare Provider zu hoch (reduziere CPU/Arbeitsspeicher/Speicher)

-> Warte länger (manchmal dauert es 60–90 Sekunden, bis Gebote erscheinen)


### Deployment bleibt auf „pending“ hängen

Der Provider hat möglicherweise Probleme. Schließe das Deployment und versuche es mit einem anderen Provider.

### zcashd-Logs zeigen „No peers connected“

Das ist in den ersten Minuten normal. zcashd entdeckt Peers automatisch. Wenn es nach mehr als 10 Minuten weiterhin so bleibt, könntest du ein Netzwerkproblem haben (auf Akash eher unwahrscheinlich).

### „Out of memory“-Fehler in den Logs

Du hast beim RAM zu stark gespart. Schließe das Deployment und stelle es mit mindestens 12Gi Arbeitsspeicher erneut bereit (16Gi empfohlen).

### Die Synchronisierung dauert ewig

Definiere „ewig“:

-> **Stunden**: Normal

-> **Tage**: Ebenfalls normal für Mainnet von Grund auf

-> **Wochen**: Etwas stimmt nicht, prüfe die Logs auf Fehler


### „Error fetching zcash-params“

Der Provider hat möglicherweise Netzwerkprobleme oder geringe Bandbreite. Das löst sich normalerweise von selbst. Wenn es länger als 30 Minuten anhält, versuche ein erneutes Deployment bei einem anderen Provider.

### RPC-Authentifizierungsfehler

-> Prüfe, ob *ZCASHD_RPCUSER* und *ZCASHD_RPCPASSWORD* korrekt gesetzt sind

-> Verifiziere, dass du den richtigen Port verwendest (8232 für Mainnet, 18232 für Testnet)

-> Denke daran, dass die Ports von Akash zugeordnet werden – verwende die URI aus deinem Deployment, nicht direkt 8232


## Kostenmanagement

Überwache deine Ausgaben in der Console:

-> **My Deployments** -> Dein Deployment -> Zeigt die Schätzung „Cost per month“

-> Das Guthaben deiner Keplr-Wallet wird mit der Zeit sinken


Wenn dein Guthaben knapp wird, schließt Akash dein Deployment automatisch. **Fülle deine Wallet regelmäßig auf** oder richte Benachrichtigungen ein.

### Kosten senken

-> **Nutze Testnet** für nicht-produktive Tests (50 % günstiger)

-> **Reduziere CPU/Arbeitsspeicher**, wenn du keine schnelle Synchronisierung brauchst

-> **Wähle günstigere Provider** (nicht immer sinnvoll – Uptime ist wichtig)

-> **Verwende USDC statt AKT**, wenn der AKT-Preis volatil ist (erfordert Änderung der SDL-Preisgestaltung)

-> **Deaktiviere txindex**, wenn du ihn nicht benötigst (spart ~ 20 % Speicherplatz)


### Zusätzliche Ressourcen

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash-Dokumentation**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash-Explorer**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (bei Provider-Problemen)

## Abschließende Hinweise

- **Persistenter Speicher ist wichtig.** Überspringe *persistent: true* nicht und verwende keine *beta2*-Klasse. Verwende *beta3*.
- **Die anfängliche Synchronisierung ist langsam.** Hab Geduld. Das ist bei Blockchain-Nodes normal.
- **Halte deine Wallet gedeckt.** Deployments werden automatisch geschlossen, wenn dir AKT ausgeht.
- **Backups sind nicht automatisch.** Wenn dir die Daten wichtig sind, geh davon aus, dass sie verschwinden können, und plane entsprechend.
- **RPC-Sicherheit ist entscheidend.** Gib RPC nicht ohne geeignete Sicherheitsmaßnahmen ins Internet frei.
- **zcash-params werden zwischengespeichert.** Beim ersten Start werden ~2GB kryptografische Parameter heruntergeladen. Das ist normal und passiert nur einmal.
