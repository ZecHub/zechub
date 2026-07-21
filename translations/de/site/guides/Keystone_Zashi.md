# Keystone Zashi Benutzerhandbuch

Twitter-Leitfaden:  => [Zashi x Keystone Hardware Wallet Integration Twitter Guide](https://x.com/zashi_app/status/1869793574880973144) 

Diese Integration stellt eine bedeutende Weiterentwicklung der Zcash-Benutzbarkeit dar, da sie Cold Storage von abgeschirmtem ZEC ermöglicht. Die Zcash-Community musste in der Vergangenheit Rückschläge mit anderen Hardware-Wallet-Plattformen hinnehmen, doch Keystone erwies sich als kooperativer Partner, der bereit war, gemeinsam mit der Electric Coin Company Grenzen zu verschieben und Innovationen voranzutreiben. Das Keystone-Team erhielt einen ZCG-Zuschuss, um seinen Teil der Arbeit zu finanzieren.

## Keystone X Zashi Anleitung

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Anleitung"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Vorbereitung
[Bestellen & Erhalten Sie Ihr Keystone 3 Pro oder Keystone 3](https://keyst.one) 

Akkustand: Stellen Sie sicher, dass Ihr Keystone-Gerät einen Akkustand von über 20 % hat.

USB-Kabel oder SD-Karte:

- USB-Kabel für Firmware-Update (enthalten).
- Micro-SD-Karte (unter 1 TB) für Upgrades (separat erhältlich).

Zugang zur offiziellen Website von Keystone zur Verifizierung und zum Firmware-Update.

Zashi-App auf Ihrem Mobilgerät eingerichtet.

## [Schritt-für-Schritt-Anleitung (Keystone-Gerät)](https://keyst.one/get-started) 


**Wählen Sie Ihre Sprache**
-Geräteverifizierung (per QR): Die Geräteverifizierung ist entscheidend, um mögliche Manipulationen während des Transports zu erkennen, Supply-Chain-Angriffe zu verhindern und die Sicherheit der installierten Firmware zu gewährleisten.
  - Besuchen Sie die Seite zur Geräteverifizierung auf der Keystone-Website.
  - Klicken Sie auf der offiziellen Website auf QR-Code scannen.
  - Verwenden Sie die Kamera Ihres Keystone, um den auf der Website angezeigten QR-Code zu scannen.
  - Auf dem Bildschirm Ihres Keystone erscheint ein Verifizierungscode.
  - Geben Sie diesen Code auf der Website ein, um den Verifizierungsprozess abzuschließen.

- **Firmware-Update:**
  - Update über MicroSD-Karte
    - Stellen Sie sicher, dass Ihr Keystone-Wallet mindestens 20 % Akkuladung hat.
    - Stecken Sie die SD-Karte in Ihren Computer und formatieren Sie sie als FAT32.
    - Laden Sie die neueste Cypherpunk-Firmware-Version von der [Keystone Firmware Update page](https://keyst.one/firmware) herunter und speichern Sie die Datei keystone3.bin im Stammverzeichnis Ihrer MicroSD-Karte.
    - Legen Sie die SD-Karte mit der Firmware in Ihr Keystone-Wallet ein.
    - Rufen Sie auf Ihrem Keystone-Wallet die Option "Upgrade" auf und folgen Sie dann den Anweisungen auf dem Bildschirm, um den Update-Prozess zu starten.
  - **Update über USB-Kabel**
    - Wenn Ihre Firmware-Version unter 1.0.4 liegt, müssen Sie das erste Update mit einer MicroSD-Karte durchführen, bevor Sie mit USB-Updates fortfahren können.
    - Stellen Sie sicher, dass Ihr Keystone-Wallet mindestens 20 % Akkuladung hat.
    - Tippen Sie auf via USB und verwenden Sie das USB-Kabel, um Ihr Keystone-Wallet mit Ihrem Computer zu verbinden. Tippen Sie auf [Approve], um Ihrem Keystone-Wallet USB-Zugriff zu gewähren, da es sonst möglicherweise nur das Laden zulässt.
    - Öffnen Sie den Webbrowser Ihres Computers und gehen Sie zur [Keystone Firmware Update page](https://keyst.one/firmware)
    - Klicken Sie auf der Update-Seite auf die Schaltfläche Install Update und folgen Sie den bereitgestellten Anweisungen, um die neueste Firmware zu installieren.
- **Wallet erstellen:**
    - Sicheres Passwort: Wählen Sie eine starke PIN oder ein starkes Passwort, um Ihr Wallet zu schützen.
    - Geben Sie Ihrem Wallet einen Namen (optional): Geben Sie Ihrem Wallet optional einen Namen, um es leichter zu identifizieren, oder überspringen Sie diesen Schritt.
    - Wählen Sie Create New Wallet, wenn Sie zum ersten Mal ein Wallet einrichten.
    - Ihr Gerät wird eine Seed-Phrase mit 24 Wörtern erzeugen.
    - Schreiben Sie diese Seed-Phrase auf und bewahren Sie sie sicher auf.
    - Bestätigen Sie die Seed-Phrase, indem Sie die Wörter in der richtigen Reihenfolge verifizieren, wie sie auf dem Bildschirm angezeigt werden.
- **Zashi + Keystone Wallet verbinden:**
    - Auf dem Keystone-Gerät: Tippen Sie auf … auf der Hauptseite
    - Tippen Sie auf Connect Software Wallet und wählen Sie Zashi. Der QR-Code für die Verbindung mit Zashi wird angezeigt.
    - In der Zashi-App: Tippen Sie auf das zashi-Dropdown (oben links auf dem Bildschirm)
    - Tippen Sie auf Connect Hardware Wallet
    - Tippen Sie auf Ready to Scan
    - Scannen Sie den auf dem Keystone-Gerät angezeigten QR-Code
    - In der Zashi-App: Bestätigen Sie das Keystone-Wallet-Konto, indem Sie auf das angezeigte Konto tippen
    - Tippen Sie unten auf dem Bildschirm auf Connect


## Zusätzliche Hilfe

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Keystone Hardware Wallet mit Zashi verbinden"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Eine ausgehende Transaktion mit Keystone signieren"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
