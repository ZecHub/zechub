# BTCPay Server mit Zcash-Unterstützung: Vollständige Installations- und Integrationsanleitung

BTCPay Server ermöglicht es Online-Unternehmen, Zahlungen in Kryptowährungen direkt zu akzeptieren, ohne Vermittler oder Verwahrer. Diese Anleitung führt dich durch den vollständigen Prozess zur Einrichtung von BTCPay Server mit nativer Unterstützung für abgeschirmte Zcash-Zahlungen.

> Diese Dokumentation konzentriert sich auf die Integration von Zcash in deine BTCPay Server-Instanz.  
> Sie unterstützt sowohl **Full Node (Zebra)**- als auch **lightwalletd-basierte Setups**.

---

## Inhaltsverzeichnis

- [Warum BTCPay Server mit Zcash verwenden](#Why-Use-BTCPay-Server-with-Zcash)
- [Wie BTCPay Server funktioniert](#How-BTCPay-Server-Works)
- [Wo werden Gelder gespeichert? Wer kontrolliert die privaten Schlüssel?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Wie man BTCPay Server für das Akzeptieren von Zcash einrichtet](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [BTCPay Server mit Zcash-Unterstützung bereitstellen](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Einen eigenen Zcash Full Node betreiben (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Verbindung zu einem externen lightwalletd-Node herstellen (benutzerdefinierte Konfiguration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [BTCPay Server zu Hause mit Cloudflare Tunnel hosten](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Das Zcash-Plugin in der BTCPay Server-Weboberfläche konfigurieren](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [BTCPay Server mit deiner Website integrieren](#Integrating-BTCPay-Server-with-Your-Website)
  - [API-Integration](#API-Integration)
    - [Einen API-Schlüssel erzeugen](#Generating-an-API-Key)
    - [Beispiel: Eine Rechnung per API erstellen](#Example-Creating-an-Invoice-via-API)
    - [Einen Webhook einrichten](#Setting-Up-a-Webhook-Optional)
  - [CMS-Integration](#CMS-Integration)
  - [Zahlungsbutton oder Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Fazit](#Conclusion)
- [Ressourcen](#Resources)


---

## Warum BTCPay Server mit Zcash verwenden

Der Online-Handel akzeptiert zunehmend Kryptowährungen. Das ist schnell, global und funktioniert ohne Banken. Davon profitieren sowohl Händler als auch Kunden. Es gibt jedoch ein wichtiges Detail, das viele übersehen.

Beim Aufgeben einer Bestellung gibt der Kunde typischerweise persönliche Informationen an: Name, Lieferadresse und Telefonnummer. Wenn die Zahlung über eine öffentliche Blockchain erfolgt – etwa Bitcoin, Ethereum oder Stablecoins auf Ethereum oder Tron – wird die Transaktion dauerhaft sichtbar und analysierbar.

Jeder kann dann, auch ohne zu wissen, was bestellt wurde:

- sehen, wann und wie viel bezahlt wurde  
- nachverfolgen, woher die Mittel kamen und wohin sie gingen  
- eine Kryptowährungsadresse mit einer realen Person verknüpfen, wenn es irgendeinen Korrelationspunkt gibt (zum Beispiel eine geleakte E-Mail oder ein Liefername)

Das bedeutet, dass bereits ein einzelner Kauf die gesamte Finanzhistorie eines Kunden offenlegen kann.

Und es funktioniert auch in die andere Richtung. Wenn die Adresse eines Händlers jemals on-chain erschienen ist, wird auch er angreifbar. Wettbewerber und externe Beobachter können Zahlungsvolumen, Lieferantenaktivität und die Struktur geschäftlicher Zahlungsflüsse verfolgen.

### Die Kombination aus BTCPay Server und Zcash kann dieses Problem lösen.


BTCPay Server ist ein kostenloses und dezentrales System zum Empfang von Kryptowährungszahlungen.  
Es ist kein Zahlungsintermediär und hält keine Gelder. Alle Zahlungen gehen direkt an das Wallet des Händlers.  
Das kann ein persönliches Wallet oder ein Multisig-Setup innerhalb einer Organisation sein.

Der Server übernimmt Koordinationsaufgaben:

- generiert für jede Bestellung eine eindeutige Adresse  
- verfolgt, wann eine Zahlung eingeht, und verknüpft sie mit der Bestellung  
- stellt Belege und Benachrichtigungen aus  
- bietet dem Kunden eine Zahlungsschnittstelle  

Alles läuft unter der Kontrolle des Shop-Betreibers, ohne auf Drittanbieterdienste angewiesen zu sein.

Zcash ist eine Kryptowährung, die auf Zero-Knowledge-Beweisen basiert.  
Sie unterstützt ein vollständig privates Transaktionsmodell.  
Bei der Verwendung abgeschirmter Adressen (im Folgenden einfach „Adressen“ genannt) werden Absender, Empfänger und Transaktionsbetrag auf der Blockchain nicht offengelegt.

Für Online-Shops bedeutet das:

- Der Käufer kann die Zahlung abschließen, ohne seine Finanzhistorie offenzulegen  
- Der Verkäufer erhält die Zahlung, ohne seine Adresse, sein Verkaufsvolumen oder seine Transaktionsstruktur offenzulegen  
- Kein externer Beobachter kann die Zahlung mit der Bestellung oder mit Kundendaten verknüpfen

### Praktisches Beispiel

Ein Nutzer gibt eine Bestellung auf und wählt Bitcoin oder USDT als Zahlungsmethode.  
Die Website erzeugt eine Zahlungsadresse und zeigt den Betrag an.  
Nachdem die Zahlung erfolgt ist, wird diese Adresse auf der Blockchain gespeichert und öffentlich.  
Ein Angreifer muss nur eine Bestellung mit der Adresse verknüpfen, um langfristige Einsicht in deren gesamte Transaktionshistorie zu erhalten.

Stell dir nun dieselbe Situation mit Zcash vor.  
BTCPay Server erzeugt eine abgeschirmte Adresse. Der Käufer sendet die Zahlung.  
Aus Sicht der Blockchain passiert nichts. Es gibt keine öffentlichen Daten zur Analyse.  
Der Server erhält die Bestätigung, verknüpft sie mit der Bestellung und schließt den Vorgang ab.

Für Außenstehende sieht es so aus, als wäre nichts geschehen.  
Die gesamte Logik bleibt zwischen dem Shop und dem Kunden – so, wie es sein sollte.

Diese Lösung beeinträchtigt weder Automatisierung noch Benutzerfreundlichkeit.  
Alles funktioniert genauso wie bei anderen Kryptowährungen, nur ohne das Risiko von Datenlecks.



## Wie BTCPay Server funktioniert

BTCPay Server fungiert als Brücke für die Zahlungsabwicklung zwischen deiner E-Commerce-Plattform und der Blockchain. So funktioniert der Ablauf:

1. **Der Kunde gibt eine Bestellung auf** deiner Website auf (z. B. WooCommerce, Magento oder jede Plattform mit BTCPay-Integration).

2. **Der Shop fordert eine Zahlungsrechnung an** bei BTCPay Server. Der Server erzeugt eine eindeutige Rechnung mit:
   - Dem Bestellbetrag
   - Einem Countdown-Timer
   - Einer Zcash Unified Address (UA) – z. B. `u1...` – die standardmäßig einen Orchard-Empfänger (abgeschirmt) enthält.

3. **Der Kunde sieht die Zahlungsseite** und sendet ZEC an die angegebene Adresse.

4. **BTCPay Server überwacht die Blockchain** und prüft die Zahlung anhand von:
   - Dem erwarteten Betrag
   - Der Empfangsadresse
   - Dem Zeitstempel der Rechnung

5. **Sobald die Transaktion erkannt und bestätigt wurde**, benachrichtigt BTCPay den Shop.

6. **Der Kunde erhält eine Zahlungsbestätigung.** Optional kann der Server einen Beleg per E-Mail senden.

Dieser gesamte Prozess läuft **automatisch** ab, ohne Vermittler oder Verwahrer.  
BTCPay Server **hält keine Gelder** – er verbindet lediglich das Bestellsystem sicher und privat mit der Blockchain.
## Wo werden Gelder gespeichert? Wer kontrolliert die privaten Schlüssel?

BTCPay Server ist **kein** Wallet und **benötigt keine privaten Schlüssel**.  
Alle Gelder gehen **direkt** an das Wallet des Händlers. Die Sicherheit wird durch eine **Viewing Key-basierte Architektur** gewährleistet.

### So funktioniert es

- **Das Wallet wird im Voraus erstellt.**  
  Der Händler verwendet ein Zcash-Wallet, das Viewing Keys unterstützt – wie [YWallet](https://ywallet.app/installation) oder [Zingo! Wallet](https://zingolabs.org/).  
  Eine vollständige Liste ist auf [ZecHub.wiki](https://zechub.wiki/wallets) verfügbar.

- **BTCPay Server verbindet sich über einen Viewing Key.**  
  Ein Viewing Key ist ein **schreibgeschützter Schlüssel**: Er kann eingehende Zahlungen erkennen und neue Empfangsadressen erzeugen,  
  aber er kann keine Gelder ausgeben. Der Server speichert weder Seed-Phrasen noch private Schlüssel.

- **Auf Blockchain-Daten wird über einen `lightwalletd`-Server zugegriffen.**  
  Du kannst einen öffentlichen Node wie `https://zec.rocks` verwenden oder deinen eigenen `Zebra + lightwalletd`-Stack für volle Souveränität betreiben.

- **Jede Bestellung erhält eine eindeutige Adresse.**  
  Viewing Keys ermöglichen es dem Server, für jede Rechnung neue abgeschirmte Zcash-Adressen abzuleiten,  
  wodurch sichere Zahlungsnachverfolgung ermöglicht und die Wiederverwendung von Adressen verhindert wird.

- **Du behältst die volle Kontrolle über die Gelder.**  
  Selbst wenn der Server kompromittiert wird, kann niemand dein Geld stehlen – nur Zahlungsmetadaten könnten offengelegt werden.

Dieses Design trennt **Infrastruktur** von **Kontrolle über Vermögenswerte**.  
Du kannst BTCPay Server aktualisieren, migrieren oder neu installieren, ohne Gelder zu gefährden.

## Wie man BTCPay Server für das Akzeptieren von Zcash einrichtet

In den vorherigen Abschnitten haben wir erklärt, wie BTCPay Server mit Zcash funktioniert und warum das für datenschutzfreundliche Zahlungen wichtig ist. Jetzt wird es praktisch.

Dein genaues Setup hängt von mehreren Faktoren ab:

- Hast du bereits eine BTCPay Server-Instanz?
- Möchtest du ein öffentliches lightwalletd verwenden oder deinen eigenen Full Node betreiben?
- Wird der Server auf einem VPS oder zu Hause laufen?

Dieses Kapitel behandelt alle aktuellen Konfigurationsszenarien – von minimalistischen Setups bis hin zu vollständig souveränen Deployments.

Wir gehen die folgenden Punkte durch:

- Wie du alles von Grund auf auf einem VPS bereitstellst, einschließlich des Full Node (Zebra)
- Wie du BTCPay Server zu Hause betreibst und dabei deine IP mit **Cloudflare Tunnel** verbirgst
- Wie du Zcash-Unterstützung in der BTCPay Server-Weboberfläche aktivierst und konfigurierst
- Wie du BTCPay mit deiner Website oder deinem Online-Shop integrierst


## BTCPay Server mit Zcash-Unterstützung bereitstellen

Kommen wir nun zur eigentlichen Einrichtung. In diesem Abschnitt installieren wir BTCPay Server mit Zcash-Unterstützung – entweder auf einem frischen VPS oder indem wir ZEC-Unterstützung zu einer bestehenden Instanz hinzufügen.

Wenn BTCPay Server bei dir bereits läuft (z. B. für BTC oder Lightning), musst du nicht alles neu installieren – aktiviere einfach das ZEC-Plugin.

Wir gehen verschiedene Konfigurationen durch, von minimalen Setups mit einem öffentlichen `lightwalletd`-Node bis hin zu vollständig souveränen Installationen mit deinem eigenen Full Node.  
Welche Option am besten ist, hängt vom Standort deines Servers und davon ab, wie unabhängig du von externer Infrastruktur sein möchtest.

> Offizielle Plugin-Dokumentation:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Warnung – ein Wallet pro Instanz:**  
> Das Zcash-Plugin verwendet **ein gemeinsames Wallet** für **alle Shops** in der BTCPay-Instanz.  
> Wenn du mehrere unabhängige Shops auf einer Instanz hostest, teilen sie sich dasselbe Zcash-Wallet.  
> Verwende separate Instanzen, wenn du eine strikte Trennung der Wallets benötigst.

---

### Empfohlene VPS-Konfiguration

Stelle vor der Installation sicher, dass du Folgendes hast:

- Einen VPS mit **Ubuntu 22.04+**
- Einen Domainnamen, der per DNS auf die IP-Adresse deines Servers zeigt
- Installiertes `git`, `docker` und `docker-compose`
- SSH-Zugriff auf den Server

---

## Deinen Server vorbereiten (versteckter Teil)

<details>
  <summary>Klicken zum Aufklappen</summary>

Um BTCPay Server mit Zcash-Unterstützung bereitzustellen, benötigst du Folgendes:

### 1. VPS mit Ubuntu 22.04 oder neuer

Wir empfehlen eine minimale Installation von **Ubuntu Server 22.04 LTS**.  
Jeder VPS-Anbieter, der eine dedizierte IP-Adresse anbietet, ist geeignet.  

**Mindestanforderungen**:  
- 2 CPU-Kerne  
- 4 GB RAM  
- 40 GB Speicherplatz  

Dieses Setup ist ausreichend, wenn du lightwalletd für Zcash verwendest.  
Wenn du einen **vollständigen Zcash-Node** betreiben willst, benötigst du **mindestens 300 GB** freien Speicherplatz.

---

### 2. Domainname, der auf deinen Server zeigt

Erstelle im Dashboard deines DNS-Anbieters einen `A`-Record für eine Subdomain  
(z. B. `btcpay.example.com`), der auf die IP-Adresse deines VPS zeigt.  

Diese Domain wird verwendet, um BTCPay Server im Browser aufzurufen  
und automatisch ein **kostenloses SSL-Zertifikat** über Let's Encrypt zu erzeugen.

---

### 3. SSH-Zugriff auf den Server

Um BTCPay Server zu installieren, musst du dich per SSH mit deinem VPS verbinden.  
Führe dazu in deinem Terminal aus:

`ssh root@YOUR_SERVER_IP`

Wenn du macOS, Linux oder WSL unter Windows verwendest, ist SSH bereits im Terminal verfügbar.
Unter reinem Windows verwende einen SSH-Client wie **PuTTY**.

---

### 4. Git, Docker und Docker Compose installieren

Sobald du per SSH verbunden bist, aktualisiere deine Systempakete und installiere die erforderlichen Komponenten:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Unter Ubuntu 22.04 und neuer ist `docker-compose` aus APT veraltet.
> Das empfohlene Paket ist `docker-compose-plugin`, das den Befehl `docker compose` bereitstellt (achte auf das Leerzeichen statt eines Bindestrichs).

Deine Serverumgebung ist jetzt bereit für die Installation von BTCPay Server.

</details>

---

### Schritt 1: Das Repository klonen

Erstelle ein Arbeitsverzeichnis und lade das BTCPay Server-Docker-Deployment herunter:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Schritt 2: Umgebungsvariablen exportieren

Ersetze `btcpay.example.com` durch deine tatsächliche Domain:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Wenn du später Monero oder Litecoin hinzufügen möchtest, kannst du sie jetzt bereits aufnehmen:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Du kannst jederzeit neue Coins hinzufügen, indem du die passenden Variablen exportierst und das Setup-Skript erneut ausführst:

`. ./btcpay-setup.sh -i`

Für diese Anleitung konzentrieren wir uns auf **nur Zcash**.

---

### Schritt 3: Das Installationsprogramm ausführen

Führe das Setup-Skript aus, um den Server zu bauen und zu starten:

`. ./btcpay-setup.sh -i`

Das Skript installiert Abhängigkeiten, erzeugt die `docker-compose.yml`, startet Dienste und konfiguriert `systemd`.
Das dauert etwa 5 Minuten.

Nach Abschluss ist deine BTCPay Server-Instanz erreichbar unter:

`https://btcpay.example.com`

> Wenn du eine bestehende Installation änderst (z. B. ZEC hinzufügst), stelle sicher, dass du den Server mit den neuen Einstellungen stoppst und neu startest:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Fahre dann mit dem nächsten Abschnitt fort, um Zcash in der BTCPay Server-Weboberfläche zu konfigurieren.



## Deinen eigenen Zcash Full Node betreiben

Wenn du **nicht** auf öffentliche `lightwalletd`-Nodes angewiesen sein möchtest, kannst du deinen eigenen vollständigen Zcash-Node zusammen mit Lightwalletd auf demselben Server bereitstellen.  
Damit erhältst du **volle Autonomie** – keine externen Abhängigkeiten, kein Vertrauen erforderlich.

---

### Schritt 1: Für ausreichend Speicherplatz sorgen

Ein vollständiger Zcash-Node (Zebra + Lightwalletd) benötigt derzeit **300+ GB** Speicherplatz, und der Bedarf wächst weiter.

Aufschlüsselung:

- Die Zebra-Blockchain-Datenbank: ~260-270 GB
- Lightwalletd-Indizierung: ~15-20 GB

#### Empfohlener Speicher:

- **400 GB+**, wenn der Server **nur** für Zcash-Zahlungen verwendet wird
- **800 GB+**, wenn der Server zusätzlich BTCPay Server, PostgreSQL, Nginx usw. ausführt

> Idealerweise verwendest du eine SSD-/NVMe-Festplatte mit **1 TB Kapazität**, insbesondere wenn du nicht planst, Daten regelmäßig zu beschneiden.

---

### Schritt 2: Umgebungsvariablen setzen

Füge die folgenden Angaben zu deiner Umgebungskonfiguration hinzu, um die Full Node-Konfiguration zu aktivieren:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Dadurch wird das Fragment `zcash-fullnode` eingebunden, das sowohl `zebrad` als auch `lightwalletd` innerhalb von BTCPay Server startet.

---

### Schritt 3: Das Installationsprogramm erneut ausführen

`. ./btcpay-setup.sh -i`

Das Skript wird:

* Die Docker-Images für Zebra und Lightwalletd herunterladen
* Die Dienste innerhalb des BTCPay-Stacks einrichten
* Das Zcash-Plugin mit der **lokalen** `lightwalletd`-Instanz verknüpfen

> **Die vollständige Blockchain-Synchronisierung kann mehrere Tage dauern**, besonders auf VPS-Servern mit wenig Ressourcen.
> Bis die Synchronisierung abgeschlossen ist, werden abgeschirmte Zahlungen nicht verfügbar sein.


## Verbindung zu einem externen Lightwalletd-Node herstellen

In den meisten Fällen ist vollständige Autonomie nicht erforderlich – und Händler möchten möglicherweise weder Zeit noch Speicherplatz dafür aufwenden, einen vollständigen Zcash-Node zu betreiben.  
Standardmäßig verbindet sich BTCPay Server mit einem öffentlichen `lightwalletd`-Node, um abgeschirmte Zahlungen zu verarbeiten, ohne die gesamte Blockchain herunterzuladen.

Der Standard-Endpunkt ist:

`https://zec.rocks:443`

Du kannst BTCPay Server jedoch so konfigurieren, dass es sich mit **jedem externen `lightwalletd`-Node** verbindet, zum Beispiel:

`https://lightwalletd.example:443`

Dieser Abschnitt zeigt, wie das mit einem **benutzerdefinierten Docker-Fragment** funktioniert.

> Ein vollständiges Konfigurationsbeispiel mit allen Umgebungsvariablen ist im [Plugin-Repository](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) verfügbar.  
> Die folgenden Schritte zeigen ein minimales funktionierendes Setup.

---

### Schritt 1: Ein benutzerdefiniertes Docker-Fragment erstellen

Erstelle in deinem BTCPayServer-Projektverzeichnis eine benutzerdefinierte Fragmentdatei:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Füge den folgenden Inhalt hinzu:

```
exclusive:
- zcash
```

Die Direktive `exclusive` stellt sicher, dass immer nur ein Fragment mit demselben Label (`zcash` in diesem Fall) gleichzeitig aktiv sein kann.
Dadurch werden Konfigurationskonflikte verhindert – du kannst zum Beispiel nicht gleichzeitig das Fragment `zcash-fullnode` und dieses benutzerdefinierte externe `lightwalletd`-Fragment ausführen.
Durch die Kennzeichnung mit `exclusive: zcash` deaktiviert BTCPay Server automatisch die Standard-Container `zcash-fullnode` und internes `lightwalletd`, sodass du stattdessen deinen eigenen externen Node anbinden kannst.

---

### Schritt 2: Umgebungsvariablen setzen

Im Terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Schritt 3: Die Adresse des externen Node festlegen

Öffne deine `.env`-Datei:

`nano .env`

Füge die folgende Zeile hinzu und ersetze dabei die URL durch deinen gewünschten Endpunkt:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Du kannst verwenden:

* Einen **öffentlichen Node**, wie `https://lightwalletd.zcash-infra.com`
* Deinen eigenen selbst gehosteten Node, separat von BTCPay Server bereitgestellt

> Wenn das externe `lightwalletd` nicht verfügbar oder überlastet ist, schlagen abgeschirmte Zahlungen fehl.
> Für kritische Dienste solltest du einen **stabilen und bewährten Endpunkt** wählen (wie den Standard `zec.rocks`).

> Möchtest du `lightwalletd` selbst hosten?
> Du kannst die `docker-compose.lwd.yml` aus dem [Zebra-Repository](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml) verwenden.
> **Warnung:** Dieses Setup ist nicht offiziell dokumentiert und erfordert manuelle TLS-Einrichtung, Portweiterleitung und Firewall-Konfiguration – nur für fortgeschrittene Nutzer empfohlen.

---

### Schritt 4: Das Installationsprogramm erneut ausführen

`. ./btcpay-setup.sh -i`

BTCPay Server übernimmt deine benutzerdefinierte Konfiguration und verbindet sich mit dem angegebenen `lightwalletd`-Node.

Ab jetzt verwendet das Zcash-Plugin diesen externen Endpunkt für die Verarbeitung abgeschirmter Transaktionen.


## BTCPay Server zu Hause mit Cloudflare Tunnel hosten

Möchtest du Zcash-Zahlungen akzeptieren und BTCPay Server dabei auf einem Heimgerät betreiben – etwa einem Raspberry Pi 5 oder einem anderen lokalen Server **ohne statische IP**?  
Dann kannst du deine Instanz mit **Cloudflare Tunnel** sicher im Internet verfügbar machen.

Diese Methode vermeidet Portweiterleitung und verbirgt deine echte IP-Adresse vor der Öffentlichkeit – während dein Server weiterhin per HTTPS erreichbar bleibt.

Außerdem hilft sie dir, **die Kosten für einen gemieteten VPS zu vermeiden**, was ideal ist, wenn Kryptowährungszahlungen eher eine optionale Funktion als der Kern deines Geschäfts sind.

---

### Schritt 1: Cloudflare Tunnel installieren

1. Erstelle ein Konto bei [cloudflare.com](https://www.cloudflare.com) und füge deine Domain hinzu.
2. Installiere auf deinem **Heimserver** Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Authentifiziere dich bei Cloudflare:

`cloudflared tunnel login`

Dieser Befehl öffnet ein Browserfenster. Melde dich an und autorisiere den Zugriff auf deine Domain.
Cloudflare erstellt automatisch eine `credentials`-Datei mit einem Token auf deinem Server.

4. Erstelle einen neuen Tunnel (du kannst ihn `btcpay` oder anders nennen):

`cloudflared tunnel create btcpay`

Dadurch wird eine Datei `btcpay.json` erzeugt, die die Tunnel-ID und Zugangsdaten enthält – du brauchst sie im nächsten Schritt.

---

### Schritt 2: Tunnel-Konfigurationsdatei erstellen

Erstelle das Konfigurationsverzeichnis (falls es noch nicht existiert) und öffne die Konfigurationsdatei:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Füge die folgende Konfiguration ein:

```
tunnel: btcpay    # dein Tunnelname
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # deine Domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Erklärung:

* `tunnel` – Name des Tunnels, den du zuvor erstellt hast
* `credentials-file` – Pfad zur Token-Datei, die während `cloudflared tunnel login` erzeugt wurde
* `hostname` – deine bei Cloudflare registrierte Domain (z. B. `btcpay.example.com`)
* `service` – lokale Adresse deines BTCPay Server (normalerweise `http://127.0.0.1:80` für Nginx)

> Cloudflare leitet den Datenverkehr sicher an deinen lokalen Server weiter, ohne deine Heim-IP offenzulegen.


### Schritt 3: Einen DNS-Eintrag für deinen Tunnel hinzufügen

Nach dem Erstellen des Tunnels fügt Cloudflare in der Regel **automatisch einen CNAME-DNS-Eintrag** für deine Domain hinzu. Er sollte so aussehen:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Falls er nicht automatisch erscheint, füge ihn manuell hinzu:

1. Gehe zu deinem [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigiere zum Bereich **DNS**
3. Füge einen neuen CNAME-Eintrag hinzu:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Den genauen Wert findest du in deiner Datei `btcpay.json` oder durch Ausführen von:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: Aktiviert (orange Wolke)

> Dieser Eintrag stellt sicher, dass alle Anfragen an `btcpay.example.com` über den Cloudflare Tunnel geleitet werden und deine echte IP-Adresse vor der Öffentlichkeit verborgen bleibt.

---

### Schritt 4: Den Tunnel beim Systemstart aktivieren

Damit der Tunnel beim Booten automatisch läuft, installiere ihn als Systemdienst:

`sudo cloudflared service install`

Aktiviere und starte dann den Dienst:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Prüfe den Status:

`sudo systemctl status cloudflared`

Du solltest eine Meldung wie `Active: active (running)` sehen sowie die Bestätigung, dass `btcpay.example.com` online ist.

> Ab jetzt startet der Tunnel bei jedem Neustart automatisch, und dein BTCPay Server ist öffentlich erreichbar – ohne Portweiterleitung und ohne Preisgabe deiner echten IP.

---

### Schritt 5: Die BTCPay Server-Einrichtung abschließen

Wenn du BTCPay Server zum ersten Mal installieren möchtest, setze deine Domain, bevor du das Setup-Skript ausführst:

`export BTCPAY_HOST="btcpay.example.com"`

Dadurch wird sichergestellt, dass bei der Erzeugung der **Nginx-Konfiguration** und der **SSL-Zertifikate** die korrekte Domain verwendet wird.

Wenn BTCPay Server bereits installiert ist und du nur den Tunnel hinzufügst:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Das Setup erzeugt die Konfigurationen neu und übernimmt die neue Domain.
Du solltest nun auf deinen Server zugreifen können unter:

`https://btcpay.example.com`

> Ob du ein öffentliches `lightwalletd` oder deinen eigenen Full Node verwendest, hat keinen Einfluss auf den Tunnel.
> Wichtig ist nur, dass BTCPay Server lokal auf `127.0.0.1:80` lauscht.


## Das Zcash-Plugin in der BTCPay Server-Weboberfläche konfigurieren

> **Wichtig für Multi-Store-Setups:**  
> Das hier konfigurierte Zcash-Wallet ist für die Instanz **global**. Alle Shops verwenden dieses Wallet, sofern du keine separaten BTCPay-Instanzen betreibst.

Nachdem du deine BTCPay Server-Instanz erfolgreich bereitgestellt hast, musst du einige grundlegende Konfigurationsschritte über die Admin-Weboberfläche durchführen.  
Die offizielle Dokumentation enthält vollständige Anweisungen auf Englisch – hier konzentrieren wir uns auf die wesentlichen Schritte und speziell auf die Konfiguration des Zcash-Plugins.

---

### Schritt 1: In die Weboberfläche einloggen

Rufe deine Instanz auf unter:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Gib deinen Administrator-Login und dein Passwort ein.
- Wenn du dich zum ersten Mal anmeldest, wirst du aufgefordert, ein Konto zu erstellen.
- Das erste registrierte Konto erhält automatisch Administratorrechte.

---

### Schritt 2: Das Zcash-Plugin installieren

1. Gehe im Hauptmenü zu:

`Plugins -> Browse Plugins`

2. Suche das Plugin **Zcash (ZEC)**. Verwende bei Bedarf die Suchleiste.
3. Klicke auf **Install** und bestätige.

> Wiederhole diesen Vorgang für alle anderen Altcoins, die du bei der Serverkonfiguration aktiviert hast.

Klicke nach der Installation auf **Restart Server**, um die Oberfläche mit den aktiven Plugins neu zu laden.


### Schritt 3: Dein Wallet über einen Viewing Key verbinden

Nach der Installation des Plugins erscheint im Einstellungsmenü ein neuer Bereich **Zcash**.

1. Gehe zu:

`Zcash -> Settings`

2. Füge deinen **Unified Full Viewing Key (UFVK)** ein – BTCPay leitet daraus für jede Rechnung eine Unified Address ab und erkennt eingehende abgeschirmte Zahlungen.

> **Hinweis:** Veraltete Sapling-Viewing-Keys werden unterstützt, aber um Orchard/Unified Addresses zu verwenden, solltest du einen **UFVK** angeben.


   Beispielformat:

`uview184syv9wftwngkay8d...`

3. Gib einen Wert in das Feld Block height ein

* **Erstmalige Einrichtung mit einem neuen Wallet (neue Seed-Phrase):** Gib die aktuelle Zcash-Blockhöhe ein (du kannst sie auf 3xpl.com/zcash prüfen) – das beschleunigt den initialen Scan.
* **Migration auf demselben Server von einem älteren reinen Sapling-Setup zu Unified Addresses / Orchard:** Lass dieses Feld leer.
* **Umzug deines Shops auf einen neuen Server mit demselben Wallet/UFVK:** Gib optional die Birth Height ein – eine ungefähre Höhe der ersten bezahlten Bestellung deines Shops (gleiche das Bestelldatum auf 3xpl ab, um den Scan einzugrenzen). Wenn du unsicher bist, lass das Feld leer.

> Noch nicht alle Wallets unterstützen den Export von **Unified Full Viewing Key (UFVK)**.  
> Empfohlene Optionen:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> In beiden Apps findest du den UFVK-Export im Bereich Backup/Export.

Diese Schlüssel unterstützen **automatische Adressrotation**, was bedeutet:
- Jeder Kunde erhält eine **eindeutige** Zahlungsadresse
- Du siehst einen **einzigen, zusammengeführten** Kontostand

Eine breitere Kompatibilitätsliste findest du unter [ZecHub -> Wallets](https://zechub.wiki/wallets).

Sobald alle Felder ausgefüllt sind, klicke auf **Save**.

---

### Deinen ZEC-Zahlungsablauf testen

Glückwunsch – dein Zcash-Wallet ist jetzt mit BTCPay Server verbunden.

Lass uns einen Test durchführen:

1. Gehe zu:

`Invoices -> Create New`

2. Erzeuge eine Testrechnung über einen kleinen Betrag in ZEC.
3. Sende Gelder von **einem anderen Wallet** (nicht dem mit BTCPay verbundenen).
4. Sobald die Transaktion erkannt wird, zeigt die Rechnungsseite eine visuelle Feier an.
5. Bestätige, dass sich der Rechnungsstatus auf **Paid** ändert.

Wenn alles funktioniert – bist du bereit, ZEC-Zahlungen über die API oder CMS-Plugins in deine Website zu integrieren.



## BTCPay Server mit deiner Website integrieren

Sobald dein Zcash-Wallet mit BTCPay Server verbunden ist, kannst du das Zahlungssystem in deine Website integrieren.  
Dafür gibt es mehrere Möglichkeiten – von direktem API-Zugriff bis zu einsatzbereiten Plugins für beliebte CMS-Plattformen.

---

### Integrationsoptionen

- **API-Integration**  
  Ideal für individuell entwickelte Websites oder Systeme ohne CMS.  
  Sie gibt dir die volle Kontrolle über Rechnungserstellung, Zahlungsnachverfolgung und Benachrichtigungen – alles innerhalb deiner eigenen Oberfläche und Logik.  
  Erfordert grundlegende Programmierkenntnisse, daher sollte diese Aufgabe am besten von deinem Entwickler übernommen werden.

- **CMS-Plugins**  
  Verfügbar für Plattformen wie **WooCommerce**, **PrestaShop** und andere.  
  Diese Plugins ermöglichen es dir, Zahlungen in nur wenigen Minuten zu akzeptieren – ganz ohne Programmierung.

- **Zahlungsbutton oder Iframe**  
  Die einfachste Methode.  
  Perfekt für Landingpages, persönliche Websites oder jede Seite, auf der du einfach einen Spendenlink oder ein Checkout-Widget einbetten möchtest.

---

### API-Integration

Wenn du eine benutzerdefinierte Plattform verwendest (oder überhaupt kein CMS), ist die API die beste Option.  
Sie gibt dir vollständige Flexibilität: Du kannst Rechnungen erstellen, ihren Status verfolgen, Benachrichtigungen empfangen und die Nutzererfahrung vollständig steuern.

> Hinweis: Selbst einige CMS-Plugins verwenden intern die API, daher ist das Erzeugen eines API-Schlüssels oft der **erste erforderliche Schritt**, unabhängig von deiner Integrationsmethode.

Nächster Schritt: Erzeuge einen API-Schlüssel für deinen Shop und beginne mit der Nutzung der [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/), um deine Integration zu entwickeln.


### Einen API-Schlüssel erzeugen

Um BTCPay Server mit deiner Website oder App zu integrieren, musst du einen API-Schlüssel erzeugen.

1. Melde dich bei BTCPay Server an und öffne das **Benutzermenü** (oben rechts)
2. Gehe zu **API Keys**
3. Klicke auf **Create a new API key**
4. Gib einen Namen für deinen Schlüssel ein
5. Aktiviere im Abschnitt **Permissions**:
   - `Can create invoice`
   - `Can view invoice`
   - *(Optional)* `Can modify store settings` – nur wenn du Verwaltung auf Shop-Ebene benötigst

6. Klicke auf **Generate**. Dein persönlicher API-Schlüssel wird angezeigt – kopiere ihn und bewahre ihn sicher auf.

> Dieser Schlüssel gewährt Zugriff auf die Rechnungen deines Shops.  
> Teile ihn **nicht** öffentlich und lege ihn nicht in clientseitigem Code offen.

---

### Beispiel: Eine Rechnung per API erstellen

**Endpunkt:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Request-Body:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Antwort:**

Du erhältst ein JSON-Objekt mit:

* `invoiceId`
* Einer Zahlungs-URL, die du auf deiner Website einbetten oder an den Kunden senden kannst

Vollständige Dokumentation:
[Greenfield API – Rechnung erstellen](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Einen Webhook einrichten (Optional)

Um Echtzeit-Benachrichtigungen zu erhalten, wenn sich Rechnungsstatus ändern (z. B. wenn eine Zahlung eingeht):

1. Gehe zu deinen Shop-Einstellungen -> **Webhooks**
2. Füge die URL deines Backend-Endpunkts hinzu, der `POST`-Anfragen von BTCPay Server verarbeiten wird
3. BTCPay sendet automatisch Benachrichtigungen, wenn eine Rechnung bezahlt wird oder abläuft

Webhook-Payloads und Retry-Logik werden in der [offiziellen Webhook-Dokumentation](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) beschrieben.

> Beispielintegrationen für verschiedene Programmiersprachen sind in den BTCPay-Dokumenten und GitHub-Repositories verfügbar.



### CMS-Integration

BTCPay Server unterstützt Plugins für beliebte Content-Management-Systeme (CMS).  
Die ausgereifteste und am weitesten verbreitete Integration ist mit **WordPress + WooCommerce**, wodurch es einfach wird, ZEC-Zahlungen **ohne Code zu schreiben** zu akzeptieren.

---

#### WooCommerce (WordPress)

BTCPay Server unterstützt offiziell ein Plugin für WooCommerce.

Schritte zur Integration:

1. Installiere das Plugin **BTCPay for WooCommerce** aus dem WordPress-Plugin-Verzeichnis oder von GitHub.
2. Gehe in deinem WordPress-Adminbereich zu:

`WooCommerce -> Settings -> Payments`

3. Finde **BTCPay** in der Liste und klicke auf **Set up**
4. Gib die URL deines BTCPay Server ein und folge den Autorisierungsanweisungen  
   (automatische Erzeugung des API-Schlüssels wird empfohlen)
5. Aktiviere die Zahlungsmethode und speichere deine Einstellungen

> Detaillierte Anweisungen, Video-Tutorials und Leitfäden zur Fehlerbehebung findest du in der Plugin-Dokumentation.

Du findest in demselben Abschnitt der BTCPay-Dokumentation auch weitere CMS-Integrationsoptionen.

---

### Zahlungsbutton oder Iframe (Kein CMS oder API erforderlich)

Wenn du kein CMS verwendest und nicht mit APIs arbeiten möchtest, ist der einfachste Weg, ZEC-Zahlungen zu akzeptieren, **einen Zahlungslink oder ein Widget** direkt auf deiner Website einzubetten.

Diese Methode ist ideal für:

- Landingpages
- Portfolio-Websites
- Blogs oder statische Seiten
- Projekte ohne Backend-Server

---

#### Option 1: Zahlungsbutton (Link)

1. Erstelle in BTCPay Server manuell eine Rechnung im Abschnitt **Invoices**
2. Kopiere den Zahlungslink, z. B.:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Füge den Link zu deinem HTML hinzu:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Option 2: Eingebettete Rechnung (Iframe)

Um die Rechnung direkt auf deiner Website anzuzeigen, verwende ein Iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Du kannst den Button oder den Iframe-Container passend zum Design deiner Website gestalten – BTCPay Server erlaubt flexible Anpassung des Themes der Rechnungsseite.

## Fazit

Diese Anleitung war lang – aber sie behandelt nur die grundlegenden Aspekte der Integration von Zcash-Zahlungen mit BTCPay Server.

Die BTCPay Server-Oberfläche bietet weit mehr Funktionen, als wir hier gezeigt haben. Zum Glück ist die UI in mehreren Sprachen verfügbar (einschließlich Russisch), was das weitere Erkunden und Experimentieren erleichtert.

BTCPay ist ein äußerst flexibles Werkzeug. Du kannst:

* Mehrere unabhängige Shops auf einer einzigen Instanz hosten
* Benutzerdefinierte Rollen und Berechtigungen für Teammitglieder festlegen – von reinem Bestellansichts-Zugriff bis hin zu voller Administration
* Deine eigenen Domains und dein eigenes Branding verwenden
* Webhooks, Fallback-Wallets und sogar Tor-Zugriff einrichten
* Erweiterte Einstellungen konfigurieren, etwa Steuerregeln, Rabattcodes, Anpassung der Checkout-Seite, Einschränkungen von Zahlungsmethoden und mehr

BTCPay wurde als Open-Source-Alternative zu zentralisierten Zahlungsanbietern entwickelt. Wenn du private ZEC-Zahlungen ohne Vermittler akzeptieren möchtest, ist diese Plattform deine Aufmerksamkeit absolut wert.

Wir wünschen dir viel Erfolg beim Erkunden des BTCPay-Ökosystems und dabei, deine Zahlungen wirklich zu deinen eigenen zu machen.

## Ressourcen

* [Offizielle Website von BTCPay Server](https://btcpayserver.org/)
* [BTCPay-FAQ](https://docs.btcpayserver.org/FAQ/)
* [GitHub-Repository von BTCPay Server](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet-Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash-Plugin für BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Installationsanleitung für das Zcash-Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Beispiel für benutzerdefiniertes zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd-Docker-Compose-Datei (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API-Key-Dokumentation (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Einen Cloudflare Tunnel erstellen](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Kompatibilitätsliste für Zcash-Wallets (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd auf Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
