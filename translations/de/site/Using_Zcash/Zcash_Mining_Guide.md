# Zcash Mining-Leitfaden: Einem Mining-Pool mit eigener Hardware beitreten

## Einführung

Zcash (ZEC) ist eine datenschutzorientierte Kryptowährung, die zum Mining den Equihash-Proof-of-Work-Algorithmus verwendet. Beim Mining von Zcash wird Rechenleistung eingesetzt, um komplexe mathematische Probleme zu lösen, Transaktionen zu validieren und das Netzwerk zu sichern – im Austausch gegen ZEC-Belohnungen. Aufgrund der hohen Schwierigkeit des Netzwerks wird Solo-Mining für die meisten Nutzer nicht empfohlen. Der Beitritt zu einem Mining-Pool ist der beste Weg, durch die Bündelung Ihrer Hash-Leistung mit anderen konstante Belohnungen zu erzielen.

Dieser Leitfaden konzentriert sich auf das Mining von Zcash mit eigener Hardware (z. B. einem Heim-PC mit GPUs oder Einsteiger-ASICs). Beachten Sie, dass GPUs zwar weiterhin Zcash minen können, ASICs jedoch aufgrund der Netzwerkschwierigkeit im Jahr 2026 weit effizienter und profitabler sind. Prüfen Sie die aktuelle Rentabilität stets mit Tools wie WhatToMine.com, da Faktoren wie Stromkosten, Hardwarepreise und der Wert von ZEC die Wirtschaftlichkeit beeinflussen. Mining ist nicht für alle profitabel; informieren Sie sich über lokale Vorschriften und Energietarife (angestrebt: < $0.08/kWh).


## Anforderungen

### Hardware
- **GPU-Mining (eigene Einrichtung für Einsteiger empfohlen):**
  - NVIDIA- oder AMD-GPUs mit mindestens 4 GB VRAM (z. B. NVIDIA GTX 1070, RTX 3060; AMD RX 580 oder besser).
  - Ein kompatibles Motherboard, ein ausreichend starkes Netzteil (mindestens 750 W für mehrere GPUs) und gute Kühlung zur Vermeidung von Überhitzung.
  - Multi-GPU-Rigs sind für bessere Hash-Raten üblich (z. B. können 6x GPUs 1–2 kSol/s erreichen).
- **ASIC-Mining (effizienter, aber teurer):**
  - Equihash-kompatible ASICs wie Bitmain Antminer Z15 (420 kSol/s) oder Innosilicon A9 (50 kSol/s).
  - Diese sind lauter, heißer und verbrauchen mehr Strom (z. B. 1500 W+); geeignet für eigene Räume. Kaufen Sie bei seriösen Quellen wie Bitmain.com oder Wiederverkäufern (Blockware Mining).
- **Allgemein:** Stabiles Internet, ein Computer für Einrichtung/Überwachung. ASICs dominieren das Netzwerk (~13 GSol/s Gesamthashrate im Jahr 2026), wodurch GPU-Mining weniger wettbewerbsfähig, für Hobbyisten aber weiterhin möglich ist.

### Software
- **Betriebssystem:** Windows 10/11, Linux (Ubuntu wird wegen seiner Stabilität empfohlen).
- **Mining-Software:**
  - Für GPUs: lolMiner (unterstützt AMD/NVIDIA), GMiner oder miniZ (auf NVIDIA ausgerichtet). Laden Sie sie aus den offiziellen GitHub-Repos herunter (z. B. github.com/Lolliedieb/lolMiner-releases).
  - Für ASICs: Verwenden Sie die integrierte Firmware/das Dashboard des Herstellers (z. B. die Weboberfläche von Bitmain).
- **Wallet:** Eine Zcash-Wallet zum Empfang der Auszahlungen. Empfohlen:
  - Shielded (privat): ZODL Wallet, Zingo (Mobil/Desktop), Zkool (mobil/desktop).
  - Transparent (einfacher, aber weniger privat): Edge Wallet, Zecwallet Lite.
  - Herunterladen von [wallets](https://zechub.wiki/wallets). Generieren Sie für mehr Privatsphäre eine shielded Adresse (beginnt mit „zs“), falls der Pool sie unterstützt.

### Sonstiges
- Strom: Berechnen Sie die Kosten. GPUs verbrauchen 150–300 W pro Karte; ASICs 1000 W+.
- Antivirus: Deaktivieren Sie es während der Einrichtung, da es Miner als Bedrohungen markieren kann.

## Schritt-für-Schritt-Anleitung zum Beitritt zu einem Mining-Pool

### Schritt 1: Ihre Zcash-Wallet einrichten
1. Laden Sie eine Wallet von der offiziellen Zcash-Website [wallets](https://zechub.wiki/wallets) herunter und installieren Sie sie.
2. Erstellen Sie eine neue Wallet und sichern Sie Ihre Seed-Phrase sicher.
3. Generieren Sie eine Empfangsadresse (für Privatsphäre vorzugsweise shielded). Notieren Sie sie, z. B. `zs1exampleaddress...`.
4. Wenn Sie eine transparente Adresse verwenden (beginnt mit „t“), ist dies einfacher, bietet aber weniger Privatsphäre.

### Schritt 2: Ihre Hardware vorbereiten
- Für GPUs:
  1. Installieren Sie GPUs in Ihrem PC und aktualisieren Sie die Treiber (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Übertakten Sie nur bei Erfahrung (verwenden Sie MSI Afterburner für Stabilität; streben Sie +100–200 Kerntakt, -500 Speicher für Effizienz an).
- Für ASICs:
  1. Verbinden Sie den ASIC mit Strom und Ethernet.
  2. Ermitteln Sie seine IP-Adresse mit einem Tool wie Advanced IP Scanner oder der App des Herstellers.
  3. Rufen Sie das Web-Dashboard auf (z. B. IP im Browser eingeben, Standard-Login: root/root für Bitmain).

**Warnung:** Sorgen Sie für ausreichende Belüftung; Mining erzeugt Wärme. Beginnen Sie klein zum Testen.

### Schritt 3: Einen Mining-Pool auswählen und beitreten
Mining-Pools verteilen Arbeit und teilen Belohnungen basierend auf Ihrer beigesteuerten Hashrate. Wählen Sie nach Gebühren (0–2 %), Auszahlungsmindestbetrag (0.01–0.1 ZEC), Standort (niedriger Ping) und Zuverlässigkeit aus.

**Empfohlene Pools (basierend auf Hashrate, Gebühren und Bewertungen):**
- **2Miners (zec.2miners.com)**: 1 % Gebühr, PPLNS-Auszahlung, unterstützt GPU/ASIC/NiceHash. Hohe Hashrate (~1.17 GSol/s), zuverlässige Server.
- **F2Pool (zec.f2pool.com)**: 2 % Gebühr, PPS+-Auszahlung, Unterstützung mehrerer Coins. Großer Pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2 % Gebühr (PPS+), benutzerfreundliches Dashboard, globale Server.
- **AntPool (zec.antpool.com)**: 1 % Gebühr, von Bitmain, gut für ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Professioneller Zcash-Mining-Pool von Foundry Digital. Verwendet PPLNS-Auszahlungen, bietet transparente Belohnungsverfolgung und Support auf Unternehmensniveau. Am besten für institutionelle und großangelegte ASIC-Miner geeignet; erfordert Kontoverifizierung.
- **Sovright (mining.sovright.com)**: Ein auf Stratum V2 basierender Zcash-Pool, der derzeit als öffentliches Testnet läuft. Noch keine echten ZEC-Auszahlungen, behandeln Sie ihn daher eher als Möglichkeit zum Testen Ihrer Einrichtung als als Einnahmequelle. Einzelheiten finden Sie im speziellen Abschnitt unten.
- Andere: Kryptex Pool, Luxor (prüfen Sie poolwatch.io/coin/zcash für Echtzeitstatistiken).

1. Besuchen Sie die Website des Pools und erstellen Sie ein Konto (E-Mail oder bei einigen wie 2Miners keine Registrierung).
2. Fügen Sie in den Einstellungen Ihre Zcash-Wallet-Adresse für Auszahlungen hinzu.
3. Notieren Sie sich den Stratum-Server des Pools (z. B. zec.2miners.com:1010) und den Port.

### Schritt 4: Mining-Software installieren und konfigurieren
- Für GPUs (Beispiel: lolMiner unter Windows/Linux):
  1. Laden Sie lolMiner von GitHub herunter (neueste Version, z. B. 1.88).
  2. Entpacken Sie es in einen Ordner.
  3. Erstellen Sie eine Batch-Datei (start.bat) mit der Konfiguration:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Ersetzen Sie `YOUR_WALLET_ADDRESS` durch Ihre ZEC-Adresse.
     - `WORKER_NAME`: Ein Name für Ihr Rig (z. B. Rig1).
     - Für EU-Server: eu.zec.2miners.com:1010.
  4. Führen Sie die Batch-Datei aus. Sie verbindet sich mit dem Pool und startet das Mining.
- Für ASICs (Beispiel: Bitmain Antminer):
  1. Melden Sie sich am Web-Dashboard an.
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

**Test:** Lassen Sie sie 10–15 Minuten laufen; prüfen Sie die Konsole auf akzeptierte Shares und Hashrate.

### Schritt 5: Mining starten und überwachen
1. Starten Sie den Miner: Er verbindet sich mit dem Pool und beginnt, Shares einzureichen.
2. Überwachen Sie über:
   - Pool-Dashboard: Geben Sie Ihre Wallet-Adresse ein, um Hashrate, nicht ausgezahltes Guthaben und Statistiken zu sehen.
   - Software-Konsole: Achten Sie auf Fehler und Temperatur (unter 80 Grad C halten).
   - Tools: Verwenden Sie HiveOS oder SimpleMining OS zur Fernverwaltung von Rigs.
3. Auszahlungen: Die meisten Pools zahlen automatisch aus, sobald Sie das Minimum erreichen (z. B. 0.05 ZEC). Prüfen Sie die Pool-Regeln.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet-Pool und Relay-Netzwerk

Sovright (sovright.com) betreibt einen Stratum-V2-Mining-Pool und ein separates Block-Relay-Netzwerk. Sie erfüllen unterschiedliche Aufgaben und werden daher unten getrennt behandelt.

### Mining-Pool (mining.sovright.com)

Der Pool von Sovright läuft auf einem öffentlichen Zcash-Testnet (NU6, Stratum V2), nicht auf Mainnet. Das Testnet zahlt keine echten ZEC aus. Nutzen Sie ihn zum Testen Ihrer Miner-Konfiguration, nicht zum Verdienen.

- Zum Start ist kein Konto erforderlich. Richten Sie einen CPU- oder ASIC-Equihash-Miner auf den Pool aus, und Ihre Shares erscheinen auf einem Live-Dashboard.
- Sovright veröffentlicht außerdem einen Open-Source-Stratum-V2-Proxy für Miner, die ihre eigenen Blockvorlagen auswählen möchten, statt nur die Jobs des Pools zu übernehmen:

### Foundry Zcash Pool überwachen

Für Nutzer des Foundry Zcash Pool:

- Überwachen Sie die Miner-Leistung über das Foundry-Pool-Dashboard.
- Prüfen Sie:
  - Aktive Worker
  - Gemeldete Hashrate
  - Akzeptierte Shares
  - Geschätzte Belohnungen
  - Auszahlungsstatus

Da Foundry ein PPLNS-Belohnungsmodell verwendet, hängen Mining-Belohnungen von den beigesteuerten Shares über das Belohnungsfenster des Pools ab, nicht allein von der unmittelbaren Hashrate.

Empfohlene Überwachungspraktiken:
- Vergleichen Sie die Hashrate des ASIC-Dashboards mit der von Foundry gemeldeten Hashrate.
- Untersuchen Sie abgelehnte Shares, veraltete Shares oder instabile Verbindungen.
- Sorgen Sie für eine stabile Netzwerkverbindung, da Ausfallzeiten eingereichte Shares und potenzielle Belohnungen verringern.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Richten Sie Ihren Miner auf den Proxy statt direkt auf den Pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  und verwenden Sie einen Worker-Namen wie `yourname.rig1`.
- Die Transparenzseite von Sovright erklärt eine „include all“-Richtlinie für shielded Transaktionen, anders als einige Pools, die sie herausfiltern. Jeder Block erhält eine signierte Bestätigung, sodass die Richtlinie unabhängig geprüft werden kann.
- Erstellen Sie bei mining.sovright.com ein Konto (Google- oder E-Mail-Anmeldung), um Ihre eigenen Worker statt der Beispieldaten des Dashboards zu verfolgen.

### Relay-Netzwerk (relay.sovright.com)

Sovright betreibt separat ein öffentliches Block-Relay-Netzwerk auf Zcash Mainnet. Wenn ein Pool einen Block findet, bestimmt die Geschwindigkeit, mit der dieser Block den Rest des Netzwerks erreicht, wie oft er verwaist – also das Rennen bei der Weiterleitung verliert und seine Belohnung verloren geht. Das Relay leitet Blöcke über vier Regionen hinweg mithilfe kompakter Blockweiterleitung mit Forward Error Correction weiter.

Das öffentliche Dashboard zeigt den Effekt live: Mit dem Relay verbundene Regionen sehen neue Blöcke in deutlich weniger als der Hälfte der Zeit, die normales Peer-to-Peer-Gossip benötigt, und das Dashboard verfolgt die aktuelle Verwaisungsrate des Netzwerks.

Dies ist Infrastruktur für Pool-Betreiber, nicht für einzelne Miner. Das Open-Source-`mining-infra`-Repository von Sovright dokumentiert ein `submitblock`-Relay-Gateway, um gefundene Blöcke schneller als über natives P2P in das Mesh einzuspeisen. Um sich zu verbinden, kontaktieren Sie Sovright direkt (support@sovright.com) für Relay-Peer-Adressen und einen Auth-Key.


## Mining gegen Ihren eigenen Zebra-Knoten

Alles oben richtet Ihren Miner auf den Pool einer anderen Person aus. Die andere Möglichkeit besteht darin, selbst einen Knoten zu betreiben und Ihre Mining-Software ihn nach Arbeit fragen zu lassen. Da zcashd am 18. Juli 2026 eingestellt wurde, bedeutet das [Zebra](/zcash-tech/zebra-full-node), der Knoten, den dieser Abschnitt behandelt.

Der Teil von Zebra ist klein und spezifisch: Er erstellt Blockvorlagen und akzeptiert gelöste Blöcke über seine RPC-Schnittstelle. Das Hashing übernimmt Mining-Software, und die Verteilung der Belohnungen zwischen mehreren Minern ist Aufgabe der Pool-Software. Ob Solo-Mining jemals einen Block findet, hängt von Ihrem Anteil an der Hashrate des Netzwerks ab; dieser Abschnitt versucht nicht, dies zu schätzen. Deshalb empfiehlt die Einführung zu dieser Seite Solo-Mining nicht für die meisten Nutzer.

Die Schritte folgen zwei Seiten des Zebra Book, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) und [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html), in ihrem Stand vom 8. Oktober 2026. Schlüsselbezeichnungen und Standardwerte ändern sich zwischen Releases, prüfen Sie daher das Book, bevor Sie sich darauf verlassen.

### Die Adresse festlegen, die die Belohnung erhält

Erstellen Sie eine Konfigurationsdatei mit den Standardeinstellungen und bearbeiten Sie sie anschließend:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Eine Miner-Adresse ist erforderlich ([Book: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra akzeptiert eine transparente P2PKH- oder P2SH-Adresse, eine Sapling-Adresse oder eine Unified Address. Bei einer Unified Address mit mehr als einem Receiver besagt das Book, dass Zebra an einen einzelnen Receiver zahlt und dabei „Orchard, dann Sapling, dann transparent“ bevorzugt.

Zwei optionale Schlüssel gehören in denselben Abschnitt `[mining]`:

| Schlüssel | Funktion | Grenze |
|---|---|---|
| `extra_coinbase_data` | Fügt dem Coinbase-Input jedes von Ihnen geminten Blocks nach dem eigenen Marker von Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) ein öffentliches Tag hinzu, etwa einen Pool-Namen | 86 Bytes. Darüber hinaus „verweigert Zebra den Start“ |
| `miner_memo` | Fügt dem Belohnungs-Output ein shielded Memo hinzu. Anders als `extra_coinbase_data` ist es nicht öffentlich: Nur jemand mit einem Viewing Key für die Empfangsadresse kann es lesen ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 Bytes. Es funktioniert nur, wenn die Belohnung an einen shielded Receiver geht. Bei einer transparenten Adresse „hat es stillschweigend keine Wirkung“ |

### Den RPC-Port öffnen

Mining-Software kommuniziert mit Zebra über JSON-RPC, das deaktiviert bleibt, bis Sie ihm eine Adresse zum Lauschen geben ([Book: RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 ist der Standard-RPC-Port auf Mainnet. `127.0.0.1` hält den Port nur vom selben Rechner aus erreichbar.

Seit Zebra 2.0.0 schützt ein Cookie den RPC-Port, eine ähnliche Methode wie die von zcashd. Zebra schreibt das Cookie, wenn der RPC-Endpunkt startet, und löscht es beim Herunterfahren. Standardmäßig liegt die Datei im Cache-Verzeichnis von Zebra, beispielsweise `/home/user/.cache/zebra/.cookie` unter Linux, und enthält eine Zeile:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` verschiebt die Datei. `rpc.enable_cookie_auth = false` schaltet die Prüfung ab – und damit die einzige Authentifizierung des RPC-Ports: Alles, was den Port erreichen kann, kann ihn dann aufrufen.

### Zebra starten und synchronisieren lassen

```bash
zebrad
```

Zebra liest die Konfiguration vom Standardpfad. Übergeben Sie `-c /path/to/zebrad.toml`, um eine andere Datei zu verwenden. Warten Sie, bis die Synchronisierung abgeschlossen ist. Das Log zeigt `sync_percent=100.000%` an, sobald dies der Fall ist ([Book: Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) behandelt Hardware und Speicherplatz.

### Mit getblocktemplate prüfen

`getblocktemplate` ist der Aufruf, den Mining-Software verwendet, um Arbeit zu erhalten; daher ist er auch der schnellste Test ([Book: Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Setzen Sie den Inhalt Ihrer Cookie-Datei an die Stelle von `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Eine funktionierende Einrichtung gibt ein `result`-Objekt mit den Feldern zurück, die ein Miner benötigt, darunter `previousblockhash`, `coinbasetxn`, `target` und `height`. Wenn Sie `extra_coinbase_data` festlegen, erklärt das Book, wie Sie Ihr Tag in `coinbasetxn.data` finden.

### Ihre Mining-Software darauf ausrichten

Geben Sie Ihrer Mining- oder Pool-Software den RPC-Endpunkt, `127.0.0.1:8232`, sowie Benutzername und Passwort aus dem Cookie. Das Book sagt, Zebra „unterstützt die RPC-Methoden, die für den Betrieb der meisten Mining-Pool-Software benötigt werden“ ([Book: Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Zwei Hinweise aus dem Book, bevor Sie Software auswählen:

- **s-nomp ist nur zum Testen gedacht.** Das Book bezeichnet seine s-nomp-Einrichtung als „experimental“ und sagt, s-nomp „ist nicht kompatibel mit NU5, daher sind einige Mining-Funktionen deaktiviert“. Der [Testnet guide](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) ergänzt, dass s-nomp „nicht offiziell für NU5 oder spätere Netzwerk-Upgrades aktualisiert wurde“, und verweist Produktions-Miner auf Pool-Software, die die aktuellen Upgrades unterstützt.
- **Zebra liefert einen fertigen Stack.** Das Zebra-Repository enthält eine Docker-Compose-Einrichtung in [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining), die Zebra zusammen mit einem Mining-Pool und auf Wunsch einem CPU-Miner startet. Der darin enthaltene Pool ist s-nomp und startet auf Testnet, sofern Sie dies nicht ändern; behandeln Sie ihn daher als Möglichkeit, die beweglichen Teile kennenzulernen.

### Der Docker-Weg

Der kürzeste Weg des Book ist das `zfnd/zebra`-Docker-Image, bei dem Adresse und RPC-Port als Umgebungsvariablen übergeben werden ([Book: Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). Der folgende Befehl entspricht dem des Book mit einer Änderung: Er veröffentlicht den RPC-Port nur auf der Loopback-Adresse des Hosts, sodass andere Rechner ihn nicht erreichen können.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Dies startet einen Mainnet-Knoten, veröffentlicht den P2P-Port (8233) auf dem Docker-Host und macht den RPC-Port (8232) nur vom Host selbst aus erreichbar. Geben Sie das Cookie aus mit:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Behalten Sie `0.0.0.0` in `ZEBRA_RPC__LISTEN_ADDR` bei.** Das ist die Adresse, auf der Zebra innerhalb des Containers lauscht. Docker leitet einen veröffentlichten Port an die eigene Netzwerkschnittstelle des Containers weiter; ein Zebra, der im Container auf `127.0.0.1` lauscht, würde die Verbindung daher selbst vom Host nicht empfangen. Das `127.0.0.1:` vor `-p` hält den Port vom Netzwerk fern.
- **Der Befehl des Book** veröffentlicht den RPC-Port mit `-p 8232:8232`, wodurch er auf jeder Netzwerkschnittstelle des Hosts geöffnet wird.
- **Zum Üben auf Testnet** fügen Sie `-e ZEBRA_NETWORK__NETWORK="Testnet"` hinzu, setzen `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, veröffentlichen `-p 18233:18233` und `-p 127.0.0.1:18232:18232` und geben eine Testnet-Adresse an. Eine Mainnet-Adresse hindert Zebra am Start auf Testnet – und umgekehrt.

Die Auszahlung an Miner und die Verwaltung der Wallet liegen außerhalb dieses Abschnitts. Zur Wallet-Seite siehe [Zallet](/zcash-tech/zallet).

## Tipps und bewährte Praktiken
- **Rentabilität:** Verwenden Sie Rechner wie whattomine.com/coins/166-zec-equihash. Beispiel: Eine RTX 3060 (~300 Sol/s) erzielt bei $50/ZEC etwa 0.001 ZEC/Tag, abzüglich ~$0.50 Stromkosten.
- **Privatsphäre:** Verwenden Sie shielded Pools, sofern verfügbar; vermeiden Sie die Wiederverwendung von Adressen.
- **Sicherheit:** Verwenden Sie starke Passwörter; aktivieren Sie 2FA bei Pools/Wallets. Teilen Sie niemals private Schlüssel.
- **Fehlerbehebung:** Wenn keine Shares eingehen, prüfen Sie Firewall, Antivirus oder eine falsche Konfiguration. Treten Sie Foren wie forum.zcashcommunity.com oder Reddit r/zec bei.
- **Alternativen:** Wenn es nicht profitabel ist, erwägen Sie Cloud-Mining oder Staking anderer Coins.
- **Hinweis zur Umwelt:** Mining verbraucht Energie; verwenden Sie nach Möglichkeit erneuerbare Quellen.
- **Updates:** Zcash kann sich weiterentwickeln (z. B. möglicher Wechsel zu PoS); prüfen Sie z.cash auf Neuigkeiten.
