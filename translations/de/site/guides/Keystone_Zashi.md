<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Keystone Zodl (ehemals Zashi) Benutzerhandbuch

> Bewahre geschützte ZEC in Cold Storage auf: Kombiniere eine Keystone Hardware-Wallet mit der Zodl App (ehemals Zashi, im Februar 2026 umbenannt) und signiere Transaktionen per QR-Code.

## Kurzfassung

* Keystone 3 Pro (oder Keystone 3) mit der Cypherpunk-Firmware funktioniert als Offline-Signer für Zodl, sodass geschützte ZEC im Cold Storage bleiben können.
* Vor dem Start: Akku-Ladestand über 20 %, das USB-Kabel (oder eine FAT32 MicroSD-Karte) für Firmware-Updates und die Zodl App auf deinem Smartphone.
* Überprüfe das Gerät zuerst auf der Website von Keystone. So stellst du sicher, dass es während des Transports nicht manipuliert wurde.
* Erstelle die Wallet auf dem Keystone und notiere die Seed-Phrase mit 24 Wörtern offline. Sie wird niemals in Zodl eingegeben.
* Verbinden: Tippe in Keystone auf „...“ > Software-Wallet verbinden > Zodl und tippe dann in Zodl auf Hardware-Wallet verbinden und scanne den QR-Code.
* Zodl erstellt jede Transaktion; du genehmigst und signierst sie auf dem Bildschirm des Keystone, indem du QR-Codes hin und her scannst.

## Grundlegende Erklärung

Eine Hardware-Wallet bewahrt deine Ausgabeschlüssel auf einem separaten Gerät auf, das nie mit dem Internet verbunden ist. Keystone ist offline: Die Kommunikation mit deinem Smartphone erfolgt ausschließlich über QR-Codes, nicht über Bluetooth oder USB.

In dieser Konfiguration übernimmt Zodl die Rolle der „Watch“-Wallet. Sie synchronisiert sich mit dem Zcash-Netzwerk, zeigt dein geschütztes Guthaben an und bereitet Transaktionen vor. Das Keystone verwahrt die Seed-Phrase und signiert. Ein kompromittiertes Smartphone kann dein Guthaben sehen, aber ohne Genehmigung auf dem Keystone keine Gelder bewegen.

Die folgenden Schritte behandeln die Vorbereitung des Geräts, seine Überprüfung, das Firmware-Update, die Erstellung der Wallet und ihre Verbindung mit Zodl.

## Überblick

Twitter Guide:  => [Zodl (ehemals Zashi) x Keystone Hardware-Wallet-Integration Twitter Guide](https://x.com/zashi_app/status/1869793574880973144) 

Diese Integration ist eine bedeutende Weiterentwicklung für die Benutzerfreundlichkeit von Zcash, da sie Cold Storage für geschützte ZEC ermöglicht. Die Zcash-Community hatte in der Vergangenheit Rückschläge mit anderen Hardware-Wallet-Plattformen hinnehmen müssen. Doch Keystone erwies sich als kooperativer Partner, der bereit war, Grenzen zu verschieben und gemeinsam mit Electric Coin Company Neues zu entwickeln. Das Team von Keystone erhielt einen ZCG-Grant, um seinen Teil der Arbeit voranzutreiben.

## Keystone X Zodl Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Vorbereitung
[Bestelle und erhalte deine Keystone 3 Pro oder Keystone 3](https://keyst.one) 

Akkuladestand: Stelle sicher, dass der Akku deines Keystone-Geräts über 20 % geladen ist.

USB-Kabel oder SD-Karte:

- USB-Kabel für Firmware-Updates (im Lieferumfang enthalten).
- MicroSD-Karte (unter 1 TB) für Upgrades (separat erhältlich).

Zugriff auf die offizielle Keystone-Website zur Überprüfung und für Firmware-Updates.

Richte die Zodl App auf deinem Mobilgerät ein.

## [Schritt-für-Schritt-Anleitung (Keystone Gerät)](https://keyst.one/get-started) 


**Sprache auswählen**

- **Geräteüberprüfung (per QR-Code):** Die Geräteüberprüfung ist entscheidend, um mögliche Manipulationen während des Transports zu erkennen, Angriffe auf die Lieferkette zu verhindern und die Sicherheit der installierten Firmware zu gewährleisten.
  - Rufe die Seite zur Geräteüberprüfung auf der Keystone-Website auf.
  - Klicke auf der offiziellen Website auf „QR-Code scannen“.
  - Scanne mit der Kamera deines Keystone den auf der Website angezeigten QR-Code.
  - Auf dem Bildschirm deines Keystone wird ein Prüfcode angezeigt.
  - Gib diesen Code auf der Website ein, um die Überprüfung abzuschließen.

- **Firmware-Update:**
  - Update per MicroSD-Karte
    - Stelle sicher, dass deine Keystone Wallet mindestens 20 % Akkuladung hat.
    - Lege die SD-Karte in deinen Computer ein und formatiere sie als FAT32.
    - Lade die neueste Version der Cypherpunk-Firmware von der Seite [Keystone Firmware-Update](https://keyst.one/firmware) herunter und speichere die Datei keystone3.bin im Stammverzeichnis deiner MicroSD-Karte.
    - Lege die SD-Karte mit der Firmware in deine Keystone Wallet ein.
    - Öffne auf deiner Keystone Wallet die Option „Upgrade“ und folge dann den Anweisungen auf dem Bildschirm, um das Update zu starten.
  - **Update per USB-Kabel**
    - Wenn deine Firmware-Version älter als 1.0.4 ist, musst du zuerst ein Update per MicroSD-Karte durchführen, bevor du USB-Updates nutzen kannst.
    - Stelle sicher, dass deine Keystone Wallet mindestens 20 % Akkuladung hat.
    - Tippe auf „Per USB“ und verbinde deine Keystone Wallet mit dem USB-Kabel mit deinem Computer. Tippe auf [Approve], um deiner Keystone Wallet USB-Zugriff zu gewähren, da sie andernfalls möglicherweise nur geladen wird.
    - Öffne den Webbrowser deines Computers und rufe die Seite [Keystone Firmware-Update](https://keyst.one/firmware) auf.
    - Klicke auf der Update-Seite auf die Schaltfläche „Install Update“ und folge den Anweisungen, um die neueste Firmware zu installieren.
- **Wallet erstellen:**
    - Sicheres Passwort: Wähle eine starke PIN oder ein sicheres Passwort, um deine Wallet zu schützen.
    - Wallet benennen (optional): Gib deiner Wallet optional einen Namen, damit du sie leicht wiedererkennst, oder überspringe diesen Schritt.
    - Wähle „Create New Wallet“, wenn du zum ersten Mal eine Wallet einrichtest.
    - Dein Gerät erstellt eine Seed-Phrase mit 24 Wörtern.
    - Notiere diese Seed-Phrase und bewahre sie sicher auf.
    - Bestätige die Seed-Phrase, indem du die Wörter in der richtigen Reihenfolge überprüfst, wie sie auf dem Bildschirm angezeigt werden.
- **Zodl + Keystone Wallet verbinden:**
    - Auf dem Keystone-Gerät: Tippe auf der Hauptseite auf …
    - Tippe auf „Software-Wallet verbinden“ und wähle Zodl. Der QR-Code für die Verbindung mit Zodl wird angezeigt.
    - In der Zodl App: Tippe auf das Dropdown-Menü Zodl (oben links auf dem Bildschirm).
    - Tippe auf „Hardware-Wallet verbinden“.
    - Tippe auf „Bereit zum Scannen“.
    - Scanne den auf dem Keystone-Gerät angezeigten QR-Code.
    - In der Zodl App: Bestätige das Keystone-Wallet-Konto, indem du auf das angezeigte Konto tippst.
    - Tippe unten auf dem Bildschirm auf „Verbinden“.


## Weitere Hilfe

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Keystone Hardware-Wallet mit Zodl verbinden"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Ausgehende Transaktion mit Keystone signieren"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
