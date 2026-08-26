# Zcash-Mining-Leitfaden: Einer Mining-Pool mit eigener Hardware beitreten

## Einführung

Zcash (ZEC) ist eine auf Privatsphäre ausgerichtete Kryptowährung, die den Equihash-Proof-of-Work-Algorithmus zum Mining verwendet. Beim Mining von Zcash wird Rechenleistung eingesetzt, um komplexe mathematische Probleme zu lösen, Transaktionen zu validieren und das Netzwerk im Austausch gegen ZEC-Belohnungen zu sichern. Aufgrund der hohen Schwierigkeit des Netzwerks wird Solo-Mining für die meisten Nutzer nicht empfohlen. Der Beitritt zu einer Mining-Pool ist der beste Weg, um durch die Bündelung der eigenen Hash-Leistung mit der anderer konstante Belohnungen zu erzielen.

Dieser Leitfaden konzentriert sich auf das Mining von Zcash mit eigener Hardware (z. B. ein Heim-PC mit GPUs oder ASICs der Einstiegsklasse). Beachten Sie, dass GPUs zwar weiterhin Zcash minen können, ASICs im Jahr 2026 aufgrund der Netzwerkschwierigkeit jedoch deutlich effizienter und rentabler sind. Prüfen Sie die aktuelle Rentabilität immer mit Tools wie WhatToMine.com, da Faktoren wie Stromkosten, Hardwarepreise und der Wert von ZEC die Wirtschaftlichkeit beeinflussen. Mining ist nicht für jeden profitabel; informieren Sie sich über lokale Vorschriften und Energiepreise (angestrebt sind < 0,08 USD/kWh).


## Voraussetzungen

### Hardware
- **GPU-Mining (eigene Konfiguration für Einsteiger empfohlen):**
  - NVIDIA- oder AMD-GPUs mit mindestens 4 GB VRAM (z. B. NVIDIA GTX 1070, RTX 3060; AMD RX 580 oder besser).
  - Ein kompatibles Mainboard, ein ausreichend starkes Netzteil (mindestens 750 W für mehrere GPUs) und eine gute Kühlung, um Überhitzung zu vermeiden.
  - Multi-GPU-Rigs sind üblich, um bessere Hashraten zu erzielen (z. B. können 6x GPUs 1-2 kSol/s erreichen).
- **ASIC-Mining (effizienter, aber teurer):**
  - Equihash-kompatible ASICs wie der Bitmain Antminer Z15 (420 kSol/s) oder der Innosilicon A9 (50 kSol/s).
  - Diese sind lauter, heißer und verbrauchen mehr Strom (z. B. 1500 W+); geeignet für dedizierte Räume. Kaufen Sie bei seriösen Quellen wie Bitmain.com oder Wiederverkäufern (Blockware Mining).
- **Allgemein:** Stabiles Internet, ein Computer für Einrichtung/Überwachung. ASICs dominieren das Netzwerk (~13 GSol/s Gesamthashrate im Jahr 2026), wodurch GPU-Mining weniger wettbewerbsfähig, für Hobby-Miner aber weiterhin möglich ist.

### Software
- **Betriebssystem:** Windows 10/11, Linux (Ubuntu wird wegen der Stabilität empfohlen).
- **Mining-Software:**
  - Für GPUs: lolMiner (unterstützt AMD/NVIDIA), GMiner oder miniZ (fokussiert auf NVIDIA). Laden Sie diese aus den offiziellen GitHub-Repos herunter (z. B. github.com/Lolliedieb/lolMiner-releases).
  - Für ASICs: Verwenden Sie die integrierte Firmware/das Dashboard des Herstellers (z. B. Bitmains Weboberfläche).
- **Wallet:** Eine Zcash-Wallet, um Auszahlungen zu erhalten. Empfohlen:
  - Shielded (privat): Zodl Wallet, Zingo (Mobile/Desktop) YWallet (mobil/desktop).
  - Transparent (einfacher, aber weniger privat): Edge Wallet, Zecwallet Lite.
  - Herunterladen unter [Wallets](https://zechub.wiki/wallets). Erzeugen Sie für mehr Privatsphäre eine shielded Adresse (beginnt mit `zs`), falls die Pool dies unterstützt.

### Sonstiges
- Strom: Berechnen Sie die Kosten. GPUs verbrauchen 150-300 W pro Karte; ASICs 1000 W+.
- Antivirus: Während der Einrichtung deaktivieren, da Miner möglicherweise als Bedrohung markiert werden.

## Schritt-für-Schritt-Anleitung zum Beitritt zu einer Mining-Pool

### Schritt 1: Ihre Zcash-Wallet einrichten
1. Laden Sie eine Wallet von der offiziellen Zcash-Website [Wallets](https://zechub.wiki/wallets) herunter und installieren Sie sie.
2. Erstellen Sie eine neue Wallet und sichern Sie Ihre Seed-Phrase sicher.
3. Erzeugen Sie eine Empfangsadresse (vorzugsweise shielded für Privatsphäre). Notieren Sie sie, z. B. `zs1exampleaddress...`.
4. Wenn Sie eine transparente Adresse verwenden (beginnt mit `t`), ist das einfacher, bietet aber weniger Privatsphäre.

### Schritt 2: Ihre Hardware vorbereiten
- Für GPUs:
  1. Installieren Sie die GPUs in Ihrem PC und aktualisieren Sie die Treiber (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Übertakten Sie nur bei Erfahrung (verwenden Sie MSI Afterburner für Stabilität; angestrebt sind +100-200 Core Clock, -500 Speicher für mehr Effizienz).
- Für ASICs:
  1. Schließen Sie den ASIC an Strom und Ethernet an.
  2. Finden Sie seine IP-Adresse mit einem Tool wie Advanced IP Scanner oder der App des Herstellers.
  3. Greifen Sie auf das Web-Dashboard zu (z. B. IP im Browser eingeben, Standard-Login: root/root bei Bitmain).

**Warnung:** Sorgen Sie für ausreichende Belüftung; Mining erzeugt Wärme. Beginnen Sie klein, um zu testen.

### Schritt 3: Eine Mining-Pool auswählen und beitreten
Mining-Pools verteilen Arbeit und teilen Belohnungen basierend auf Ihrer beigesteuerten Hashrate. Wählen Sie nach Gebühren (0-2 %), Mindestauszahlung (0,01-0,1 ZEC), Standort (niedriger Ping) und Zuverlässigkeit aus.

**Empfohlene Pools (basierend auf Hashrate, Gebühren und Bewertungen):**
- **2Miners (zec.2miners.com)**: 1 % Gebühr, PPLNS-Auszahlung, unterstützt GPU/ASIC/NiceHash. Hohe Hashrate (~1,17 GSol/s), zuverlässige Server.
- **F2Pool (zec.f2pool.com)**: 2 % Gebühr, PPS+-Auszahlung, Unterstützung für mehrere Coins. Große Pool (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2 % Gebühr (PPS+), benutzerfreundliches Dashboard, globale Server.
- **AntPool (zec.antpool.com)**: 1 % Gebühr, von Bitmain, gut für ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Professionelle Zcash-Mining-Pool von Foundry Digital. Verwendet PPLNS-Auszahlungen, bietet transparente Belohnungsverfolgung und Support auf Enterprise-Niveau. Am besten geeignet für institutionelle und groß angelegte ASIC-Miner; erfordert Kontoverifizierung.
- **Sovright (mining.sovright.com)**: Eine Zcash-Pool, die auf Stratum V2 basiert und derzeit als öffentliches Testnet läuft. Noch keine Live-ZEC-Auszahlungen, behandeln Sie sie also eher als Möglichkeit, Ihre Konfiguration zu testen, nicht als Einnahmequelle. Details finden Sie im eigenen Abschnitt unten.
- Weitere: Kryptex Pool, Luxor (prüfen Sie poolwatch.io/coin/zcash für Echtzeitstatistiken).

1. Besuchen Sie die Website der Pool und erstellen Sie ein Konto (E-Mail oder keine Registrierung bei einigen wie 2Miners).
2. Fügen Sie in den Einstellungen Ihre Zcash-Wallet-Adresse für Auszahlungen hinzu.
3. Notieren Sie sich den Stratum-Server der Pool (z. B. zec.2miners.com:1010) und den Port.

### Schritt 4: Mining-Software installieren und konfigurieren
- Für GPUs (Beispiel: lolMiner unter Windows/Linux):
  1. Laden Sie lolMiner von GitHub herunter (neueste Version, z. B. 1.88).
  2. Entpacken Sie ihn in einen Ordner.
  3. Erstellen Sie eine Batch-Datei (start.bat) mit der Konfiguration:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Ersetzen Sie `YOUR_WALLET_ADDRESS` durch Ihre ZEC-Adresse.
     - `WORKER_NAME`: Ein Name für Ihr Rig (z. B. Rig1).
     - Für EU-Server: eu.zec.2miners.com:1010.
  4. Führen Sie die Batch-Datei aus. Sie verbindet sich mit der Pool und startet das Mining.
- Für ASICs (Beispiel: Bitmain Antminer):
  1. Melden Sie sich im Web-Dashboard an.
  2. Gehen Sie zu Miner Configuration.
  3. Fügen Sie die Pool-Details hinzu:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Benutzername: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Passwort: x (oder leer).
  4. Speichern Sie und starten Sie den Miner neu.
- Für andere Software (z. B. GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** Lassen Sie es 10-15 Minuten laufen; prüfen Sie die Konsole auf akzeptierte Shares und Hashrate.

### Schritt 5: Mining starten und überwachen
1. Starten Sie den Miner: Er verbindet sich mit der Pool und beginnt, Shares einzureichen.
2. Überwachen über:
   - Pool-Dashboard: Geben Sie Ihre Wallet-Adresse ein, um Hashrate, unbezahltes Guthaben und Statistiken zu sehen.
   - Software-Konsole: Achten Sie auf Fehler, Temperatur (unter 80 Grad C halten).
   - Tools: Verwenden Sie HiveOS oder SimpleMining OS zur Remote-Verwaltung von Rigs.
3. Auszahlungen: Die meisten Pools zahlen automatisch aus, wenn Sie das Minimum erreichen (z. B. 0,05 ZEC). Prüfen Sie die Regeln der Pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet-Pool und Relay-Netzwerk

Sovright (sovright.com) betreibt eine Stratum-V2-Mining-Pool und ein separates Block-Relay-Netzwerk. Sie erfüllen unterschiedliche Aufgaben und werden daher unten getrennt behandelt.

### Mining-Pool (mining.sovright.com)

Die Pool von Sovright läuft auf einem öffentlichen Zcash-Testnet (NU6, Stratum V2), nicht auf dem Mainnet. Das Testnet zahlt kein echtes ZEC aus. Verwenden Sie es, um Ihre Miner-Konfiguration zu testen, nicht um etwas zu verdienen.

- Zum Start ist kein Konto erforderlich. Richten Sie einen CPU- oder ASIC-Equihash-Miner auf die Pool, und Ihre Shares erscheinen auf einem Live-Dashboard.
- Sovright veröffentlicht außerdem einen Open-Source-Stratum-V2-Proxy für Miner, die ihre eigenen Block-Templates wählen möchten, statt nur die Jobs der Pool zu übernehmen:

### Überwachung von Foundry Zcash Pool

Für Nutzer von Foundry Zcash Pool:

- Überwachen Sie die Leistung des Miners über das Dashboard der Foundry-Pool.
- Prüfen Sie:
  - Aktive Worker
  - Gemeldete Hashrate
  - Akzeptierte Shares
  - Geschätzte Belohnungen
  - Auszahlungsstatus

Da Foundry ein PPLNS-Belohnungsmodell verwendet, hängen die Mining-Belohnungen von den beigesteuerten Shares über das Belohnungsfenster der Pool ab und nicht allein von der momentanen Hashrate.

Empfohlene Überwachungspraktiken:
- Vergleichen Sie die Hashrate im ASIC-Dashboard mit der von Foundry gemeldeten Hashrate.
- Untersuchen Sie abgelehnte Shares, veraltete Shares oder Verbindungsinstabilität.
- Sorgen Sie für eine stabile Netzwerkverbindung, da Ausfallzeiten die eingereichten Shares und potenziellen Belohnungen verringern.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Richten Sie Ihren Miner auf den Proxy statt direkt auf die Pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  und verwenden Sie einen Worker-Namen wie `yourname.rig1`.
- Auf der Transparenzseite von Sovright wird eine "include all"-Richtlinie für shielded Transaktionen angegeben, anders als bei einigen Pools, die sie herausfiltern. Jeder Block erhält eine signierte Bestätigung, sodass die Richtlinie unabhängig überprüft werden kann.
- Erstellen Sie ein Konto auf mining.sovright.com (Google- oder E-Mail-Anmeldung), um Ihre eigenen Worker statt der Beispieldaten im Dashboard zu verfolgen.

### Relay-Netzwerk (relay.sovright.com)

Sovright betreibt getrennt davon ein öffentliches Block-Relay-Netzwerk auf dem Zcash-Mainnet. Wenn eine Pool einen Block findet, bestimmt die Geschwindigkeit, mit der dieser Block den Rest des Netzwerks erreicht, wie oft er verwaist, also das Weiterleitungsrennen verliert und damit die Belohnung verloren geht. Das Relay leitet Blöcke über vier Regionen mithilfe von Compact-Block-Relay mit Forward Error Correction weiter.

Das öffentliche Dashboard zeigt den Effekt live: Mit dem Relay verbundene Regionen sehen neue Blöcke in deutlich weniger als der halben Zeit, die normales Peer-to-Peer-Gossip benötigt, und das Dashboard verfolgt die aktuelle Orphan-Rate des Netzwerks.

Dies ist Infrastruktur für Pool-Betreiber, nicht für einzelne Miner. Das Open-Source-Repository `mining-infra` von Sovright dokumentiert ein `submitblock`-Relay-Gateway, um gefundene Blöcke schneller als über natives P2P in das Mesh einzuspeisen. Um eine Verbindung herzustellen, kontaktieren Sie Sovright direkt (support@sovright.com) für Relay-Peer-Adressen und einen Auth-Key.


## Tipps und bewährte Praktiken
- **Rentabilität:** Verwenden Sie Rechner wie whattomine.com/coins/166-zec-equihash. Beispiel: Eine RTX 3060 (~300 Sol/s) verdient ~0,001 ZEC/Tag bei 50 USD/ZEC, abzüglich ~0,50 USD Stromkosten.
- **Privatsphäre:** Verwenden Sie nach Möglichkeit shielded Pools; vermeiden Sie die Wiederverwendung von Adressen.
- **Sicherheit:** Verwenden Sie starke Passwörter; aktivieren Sie 2FA bei Pools/Wallets. Teilen Sie niemals private Schlüssel.
- **Fehlerbehebung:** Wenn keine Shares eingehen, prüfen Sie Firewall, Antivirus oder eine falsche Konfiguration. Treten Sie Foren wie forum.zcashcommunity.com oder Reddit r/zec bei.
- **Alternativen:** Falls unrentabel, ziehen Sie Cloud-Mining oder Staking anderer Coins in Betracht.
- **Umwelthinweis:** Mining verbraucht Energie; verwenden Sie nach Möglichkeit erneuerbare Quellen.
- **Aktualisierungen:** Zcash kann sich weiterentwickeln (z. B. ein möglicher Wechsel zu PoS); prüfen Sie z.cash auf Neuigkeiten.
