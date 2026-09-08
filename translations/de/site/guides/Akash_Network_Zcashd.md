# Bereitstellung von zcashd auf Akash über die Console

> **Veraltet. Folgen Sie dieser Anleitung nicht, um einen Knoten bereitzustellen, den Sie verwenden möchten.**
>
> zcashd erreichte seinen automatischen End-of-Support-Stopp am 18. Juli 2026. Ein heute bereitgestellter zcashd-Knoten wird sich nicht mit der Chain-Spitze synchronisieren, daher kostet die Bereitstellung jeden Monat Geld und produziert nichts.
>
> Stellen Sie stattdessen **Zebra** bereit: [So betreiben Sie Zebra im Akash Network](/guides/akash-network-zebra). Diese Anleitung behandelt denselben Workflow in der Akash Console und benötigt ungefähr ein Drittel des Speicherplatzes. Wenn Sie eine bestehende Einrichtung umstellen, sehen Sie sich die [Migrationsanleitung von zcashd zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) an.
>
> Diese Seite wird als historisches Archiv der zcashd-Bereitstellung aufbewahrt.

Anleitung zur Bereitstellung eines vollständigen Zcash-zcashd-Knotens (Implementierung von Electric Coin Co) mit der [Akash Console](https://console.akash.network). Unten finden Sie ein Video-Tutorial. Eine ausführlichere Anleitung finden Sie weiter unten.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Was Sie bereitstellen

Ein vollständiger zcashd-Knoten, der:

-> die gesamte Zcash-Blockchain synchronisiert (350GB+ für Mainnet, ~ 40GB für Testnet)

-> ungefähr 15 $/Monat kostet, abhängig von den AKT-Token-Preisen

-> mehrere Stunden bis Tage für die vollständige Synchronisierung benötigt

-> 4 vCPUs, 16GB RAM, 350GB Speicher (Mainnet) oder 2 vCPUs, 8GB RAM, 50GB (Testnet) verwendet

-> beim ersten Start kryptografische Parameter herunterlädt (~ 2GB, einmalig)

**zcashd vs Zebra:**

-> zcashd war die ursprüngliche Zcash-Knoten-Implementierung von Electric Coin Co und ist seit dem 18. Juli 2026 gestoppt

-> Zebra von der Zcash Foundation ist der heute verwendete vollständige Knoten

-> Nur Zebra folgt der aktuellen Chain; ein zcashd-Knoten kann die Spitze nicht erreichen

-> Die Wallet von zcashd wurde durch [Zallet](/using-zcash/zallet-quick-reference-guide) ersetzt

-> Verwenden Sie zcashd, wenn Sie Wallet-Funktionalität oder bestimmte RPC-APIs benötigen


### **Wichtig: Port-Zuordnung auf Akash**

Wenn Sie einen Port auf Akash freigeben (z. B. Port 8233 für zcashd P2P), wird er **NICHT an genau diesen Port** auf der öffentlichen IP des Providers gebunden. Stattdessen weist der Provider einen zufälligen hohen Port zu (wie 31234 oder 42567) und leitet ihn per Reverse-Proxy an den Port 8233 Ihres Containers weiter.

Das ist so vorgesehen: Provider betreiben mehrere Bereitstellungen, und es gäbe Konflikte, wenn alle versuchen würden, Port 8233 direkt zu verwenden.

**Was das für Sie bedeutet:**

-> Sie konfigurieren Port 8233 im SDL (der Standard-P2P-Port von zcashd)

-> Akash gibt Ihnen eine URI wie *provider.com:31234*

-> Andere Zcash-Knoten verbinden sich mit Ihnen unter *provider.com:31234*

-> Innerhalb Ihres Containers lauscht zcashd weiterhin auf 8233


Dies wird automatisch gehandhabt. Verwenden Sie einfach die URI, die Akash Ihnen gibt.

## Voraussetzungen

-> **Keplr Wallet** Browser-Erweiterung installiert (Chrome/Brave/Firefox)

-> **AKT-Token** - Besorgen Sie sich 50-100 AKT von einer Börse (Coinbase, Kraken, Osmosis)

-> **5 Minuten**, um sich durch die Console-Oberfläche zu klicken


## Schritt 1: Verbinden Sie Ihre Wallet

-> Gehen Sie zu [https://console.akash.network](https://console.akash.network)

-> Klicken Sie oben rechts auf **"Connect Wallet"**

-> Wählen Sie **Keplr** (oder Ihre bevorzugte Cosmos-Wallet)

-> Bestätigen Sie die Verbindung, wenn Keplr erscheint


Ihr AKT-Guthaben sollte oben rechts angezeigt werden. Wenn es null ist, laden Sie zuerst Ihre Wallet auf.

## Schritt 2: Bereitstellung erstellen

-> Klicken Sie auf die Schaltfläche **"Deploy"** (große blaue Schaltfläche, Mitte der Seite)

-> Wählen Sie **"Build your template"** (oder springen Sie direkt zum Hochladen des SDL)

### Option A: SDL-Datei hochladen (empfohlen)

> **Diese Schaltfläche stellt einen gestoppten Knoten bereit.** Die Kosten werden von Ihrem AKT-Guthaben für einen Knoten abgezogen, der sich nicht synchronisieren kann. Verwenden Sie stattdessen die [Zebra-Anleitung](/guides/akash-network-zebra).

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Option B: SDL-Editor verwenden

Wenn Sie das SDL manuell einfügen möchten:

-> Kopieren Sie den Inhalt von *zcashd-akash.yml*

-> Fügen Sie ihn in den SDL-Editor ein

-> Passen Sie ihn nach Bedarf an (siehe Konfigurationsabschnitt unten)

-> Klicken Sie auf **"Create Deployment"**


## Schritt 3: Einzahlung prüfen und genehmigen

Die Console zeigt Ihnen:

-> **Bereitstellungseinzahlung**: ~ 5 AKT (Sie erhalten diese zurück, wenn Sie die Bereitstellung schließen)

-> **Geschätzte Kosten**: Basierend auf der Preisgestaltung Ihres SDL


Klicken Sie auf **"Approve"** und signieren Sie die Transaktion in Keplr.

## Schritt 4: Einen Provider auswählen

Nach etwa 30 Sekunden sehen Sie Gebote von Providern. Jedes Gebot zeigt:

-> **Preis pro Block** (in AKT oder USDC)

-> **Geschätzte monatliche Kosten**

-> **Provider-Details** (Uptime, Region usw.)


**Nehmen Sie nicht einfach den billigsten.** Prüfen Sie:

-> Uptime % (streben Sie > 95 % an)

-> Region (näher bei Ihnen = bessere Latenz, spielt bei Blockchain-Knoten aber keine große Rolle)

-> Auditierter Status (grünes Häkchen = vertrauenswürdiger)


Klicken Sie bei Ihrem gewählten Provider auf **"Accept Bid"** und signieren Sie in Keplr.

## Schritt 5: Auf die Bereitstellung warten

Die Console wird:

-> den Lease mit Ihrem gewählten Provider erstellen

-> das Manifest senden (teilt dem Provider mit, was ausgeführt werden soll)

-> Ihren Container starten


Das dauert 1-2 Minuten. Sie sehen Statusaktualisierungen in der UI.

## Schritt 6: Prüfen, ob es läuft

Sobald die Bereitstellung erfolgt ist, sehen Sie:

-> Registerkarte **Services**: Zeigt Ihren *zcashd*-Dienst mit Status

-> Registerkarte **Logs**: Live-Logs Ihres zcashd-Knotens

-> Registerkarte **Leases**: Details zu Ihrer Bereitstellung (DSEQ, Provider, Kosten)


### Die Logs prüfen

Klicken Sie auf **Logs** und Sie sollten sehen, wie zcashd startet:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Beim ersten Start werden zcash-params heruntergeladen (~2GB).** Das ist ein einmaliger Vorgang und dauert je nach Bandbreite des Providers 5-10 Minuten. Spätere Neustarts überspringen dies.

Die Synchronisierung dauert **Stunden bis Tage**, abhängig vom Netzwerk. Achten Sie auf:

-> steigende Blockhöhen

-> Peer-Verbindungen (sollten 10-30 Peers sein)

-> keine wiederholten Fehler


## Schritt 7: Die Adresse Ihres Knotens abrufen

Klicken Sie auf die Registerkarte **Leases**, dann auf **URIs**.

Sie sehen etwas wie:

```
zcashd-8233: provider-hostname.com:31234
```

Das ist der **öffentliche P2P-Endpunkt** Ihres Knotens. Andere Zcash-Knoten verbinden sich mit Ihnen unter dieser Adresse.

**Beachten Sie die Port-Zuordnung:** Sie haben Port 8233 im SDL konfiguriert, aber Akash hat ihn einem anderen öffentlichen Port zugewiesen (31234 in diesem Beispiel). Das ist normal - siehe oben den Abschnitt "Port-Zuordnung auf Akash", falls Sie das verwirrt. Ihr Knoten ist über den Port erreichbar, den Akash hier anzeigt, nicht unbedingt über 8233.

Wenn Sie RPC aktiviert haben (im SDL standardmäßig auskommentiert), sehen Sie hier auch den RPC-Endpunkt mit seinem eigenen zugeordneten Port.

## Konfigurationsoptionen

### Auf Testnet umschalten

Das SDL verwendet standardmäßig Mainnet. Um stattdessen Testnet zu verwenden:

-> **Ändern Sie das Netzwerk im Abschnitt *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Aktualisieren Sie den freigegebenen Port** im Abschnitt *expose*:

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

-> **Optional: Reduzieren Sie die Ressourcen** für Testnet in *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Optional: Senken Sie die Preisgestaltung** in *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> Hinweis: Eine Senkung der Preise kann dazu führen, dass unsere Provider keine Gebote abgeben. Experimentieren Sie mit diesem Wert oder verwenden Sie den Provider-Endpunkt, um zu prüfen, ob sie bieten würden. (siehe Dokumentation der Provider-API)

### RPC-Zugriff aktivieren

RPC ist aus Sicherheitsgründen standardmäßig deaktiviert. So aktivieren Sie ihn:

**KRITISCH: Setzen Sie starke Zugangsdaten.** zcashd RPC überträgt Benutzername/Passwort über HTTP (nicht HTTPS). Geben Sie RPC nur frei, wenn Sie die Sicherheitsimplikationen verstehen.

-> Entkommentieren Sie im Abschnitt *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Entkommentieren Sie den RPC-Port in *expose*:

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

**Warnung**: Wenn Sie für RPC *global: true* setzen, geben Sie es mit Basic Auth im Internet frei. Das ist keine gute Idee. Verwenden Sie *global: false* und greifen Sie über das interne Netzwerk von Akash auf RPC zu oder richten Sie einen sicheren Tunnel ein.

**Erinnerung zur Port-Zuordnung**: Selbst wenn Sie RPC global freigeben, ordnet Akash es einem zufälligen hohen Port zu (nicht 8232/18232). Prüfen Sie die URIs in Ihrer Bereitstellung, um den tatsächlichen öffentlichen Endpunkt zu sehen. Bei *global: false* (empfohlen) ist der RPC-Endpunkt nur innerhalb des Akash-Bereitstellungsnetzwerks zugänglich, nicht über das öffentliche Internet.

### Transaktionsindex aktivieren

Der Transaktionsindex ermöglicht es Ihnen, jede Transaktion per RPC anhand ihrer ID abzufragen. Verwendet mehr Speicherplatz (~ 20 % Zunahme).

Entkommentieren Sie in *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Warnung**: Das Aktivieren von txindex auf einem bereits synchronisierten Knoten erfordert eine Neuindizierung der gesamten Blockchain, was Stunden dauert.

### Insight Explorer aktivieren

Insight Explorer stellt zusätzliche REST-API-Endpunkte für Blockchain-Daten bereit (nützlich für Block-Explorer).

Entkommentieren Sie in *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Dadurch wird txindex automatisch aktiviert und es werden zusätzliche RPC-Methoden hinzugefügt.

### Prometheus-Metriken aktivieren

Um Metriken für das Monitoring abzugreifen:

-> Entkommentieren Sie in *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Entkommentieren Sie den Metrik-Port in *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metriken sind dann unter http://yourendpoint:9969/metrics im Prometheus-Format verfügbar.

### Ressourcen/Preise anpassen

Wenn Sie keine Gebote erhalten oder die Kosten optimieren möchten:

**Für Provider mit geringerer Ausstattung** reduzieren Sie im Abschnitt *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (Minimum für eine vernünftige Synchronisierungsgeschwindigkeit)

-> Arbeitsspeicher: *size: 12Gi* (Minimum für Stabilität)

-> Speicher: *size: 120Gi* (Minimum für Mainnet)


**Um mehr Gebote anzuziehen**, erhöhen Sie in *profiles.placement.akash.pricing*:

-> Mainnet: Versuchen Sie *amount: 15000* uakt/block

-> Testnet: Versuchen Sie *amount: 7500* uakt/block


Die SDL-Werte sind bewusst konservativ hoch angesetzt. Die meisten Provider werden niedriger bieten.

## Ihre Bereitstellung aktualisieren

Müssen Sie die Konfiguration nach der Bereitstellung ändern?

-> Gehen Sie in der Console zu **My Deployments**

-> Suchen Sie Ihre zcashd-Bereitstellung

-> Klicken Sie auf **"Update Deployment"**

-> Bearbeiten Sie das SDL

-> Klicken Sie auf **"Update"** und bestätigen Sie in Keplr


**Hinweis**: Durch die Aktualisierung wird Ihr Container neu gestartet. Der Knoten setzt vom gespeicherten Zustand aus fort (persistenter Speicher), rechnen Sie aber mit 1-2 Minuten Ausfallzeit.

## Monitoring

### Über die Console

-> Registerkarte **Logs**: Live-Container-Logs

-> Registerkarte **Shell**: Eine Shell innerhalb des Containers öffnen (nützlich für Debugging)

-> Registerkarte **Events**: Kubernetes-Ereignisse (größtenteils nutzlos, außer wenn etwas kaputt ist)


### Über RPC (falls aktiviert)

Wenn Sie RPC aktiviert haben, können Sie Ihren Knoten wie einen normalen zcashd-Full-Node abfragen (denn genau das ist er!)

### zcash-cli-Alternative

Wenn Sie über die Console Shell-Zugriff haben, können Sie *zcash-cli* direkt verwenden:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Ihre Bereitstellung schließen

Wenn Sie fertig sind oder nicht mehr zahlen möchten:

-> Gehen Sie zu **My Deployments**

-> Suchen Sie Ihre zcashd-Bereitstellung

-> Klicken Sie auf **"Close Deployment"**

-> Bestätigen Sie und signieren Sie in Keplr


Ihre Einzahlung von 5 AKT wird zurückerstattet. **Persistenter Speicher** sollte vom Provider erhalten bleiben, aber verlassen Sie sich nicht darauf - behandeln Sie ihn wie bei jedem anderen Cloud-Provider.

## Fehlerbehebung

### Fehler "Insufficient funds"

Sie benötigen mehr AKT. Laden Sie Ihre Keplr-Wallet auf.

### Es werden keine Gebote angezeigt

Entweder:

-> Ihre Preisgestaltung ist zu niedrig (erhöhen Sie *amount* im SDL)

-> Ihre Ressourcenanforderungen sind für verfügbare Provider zu hoch (reduzieren Sie CPU/Arbeitsspeicher/Speicher)

-> Warten Sie länger (manchmal dauert es 60-90 Sekunden, bis Gebote erscheinen)


### Bereitstellung hängt in "pending"

Der Provider hat möglicherweise Probleme. Schließen Sie die Bereitstellung und versuchen Sie es mit einem anderen Provider.

### zcashd-Logs zeigen "No peers connected"

Seit dem End-of-Support-Stopp am 18. Juli 2026 ist dies der erwartete dauerhafte Zustand und keine Startverzögerung, und kein Warten oder erneutes Bereitstellen wird das beheben. Stellen Sie stattdessen [Zebra](/guides/akash-network-zebra) bereit.

### "Out of memory"-Fehler in den Logs

Sie haben am RAM gespart. Schließen Sie die Bereitstellung und stellen Sie sie mit mindestens 12Gi Arbeitsspeicher erneut bereit (16Gi empfohlen).

### Die Synchronisierung dauert ewig

Definieren Sie "ewig":

-> **Stunden**: Normal

-> **Tage**: Ebenfalls normal für Mainnet von Grund auf

-> **Wochen**: Etwas stimmt nicht, prüfen Sie die Logs auf Fehler


### "Error fetching zcash-params"

Der Provider hat möglicherweise Netzwerkprobleme oder eine langsame Bandbreite. Das löst sich normalerweise von selbst. Wenn es länger als 30 Minuten anhält, versuchen Sie, bei einem anderen Provider neu bereitzustellen.

### RPC-Authentifizierungsfehler

-> Prüfen Sie, ob *ZCASHD_RPCUSER* und *ZCASHD_RPCPASSWORD* korrekt gesetzt sind

-> Vergewissern Sie sich, dass Sie den richtigen Port verwenden (8232 für Mainnet, 18232 für Testnet)

-> Denken Sie daran, dass Ports von Akash zugeordnet werden - verwenden Sie die URI Ihrer Bereitstellung, nicht direkt 8232


## Kostenmanagement

Überwachen Sie Ihre Ausgaben in der Console:

-> **My Deployments** -> Ihre Bereitstellung -> Zeigt die Schätzung "Cost per month"

-> Das Guthaben Ihrer Keplr-Wallet wird mit der Zeit sinken


Wenn Ihr Guthaben knapp wird, schließt Akash Ihre Bereitstellung automatisch. **Laden Sie Ihre Wallet regelmäßig auf** oder richten Sie Benachrichtigungen ein.

### Kosten senken

-> **Verwenden Sie Testnet** für nicht-produktive Tests (50 % günstiger)

-> **Reduzieren Sie CPU/Arbeitsspeicher**, wenn Sie keine schnelle Synchronisierung benötigen

-> **Wählen Sie günstigere Provider** (nicht immer klug - Uptime ist wichtig)

-> **Verwenden Sie USDC statt AKT**, wenn der AKT-Preis volatil ist (erfordert eine Änderung der SDL-Preisgestaltung)

-> **Deaktivieren Sie txindex**, wenn Sie es nicht benötigen (spart ~ 20 % Speicherplatz)


### Zusätzliche Ressourcen

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash-Dokumentation**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash-Explorer**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (bei Provider-Problemen)

## Abschließende Hinweise

- **Persistenter Speicher ist wichtig.** Überspringen Sie *persistent: true* nicht und verwenden Sie keine *beta2*-Klasse. Verwenden Sie *beta3*.
- **Die anfängliche Synchronisierung ist langsam.** Haben Sie Geduld. Das ist bei Blockchain-Knoten normal.
- **Halten Sie Ihre Wallet gedeckt.** Bereitstellungen werden automatisch geschlossen, wenn Ihnen die AKT ausgehen.
- **Backups sind nicht automatisch.** Wenn Ihnen die Daten wichtig sind, gehen Sie davon aus, dass sie verschwinden können, und planen Sie entsprechend.
- **RPC-Sicherheit ist entscheidend.** Geben Sie RPC nicht ohne angemessene Sicherheitsmaßnahmen im Internet frei.
- **zcash-params werden zwischengespeichert.** Beim ersten Start werden ~2GB kryptografische Parameter heruntergeladen. Das ist normal und passiert nur einmal.
