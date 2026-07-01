<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Raspberry Pi 4 Leitfaden zum Ausführen von Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="Raspberry Pi" width="300" height="300"/>

Das Ausführen der Zebra-Node-Software auf einem Raspberry Pi 4 ermöglicht es dir, als unabhängiger, konsenskompatibler Node am Zcash-Netzwerk teilzunehmen. Dieser Leitfaden führt dich durch die Schritte, um Zebra auf deinem Raspberry Pi 4 einzurichten und auszuführen.

## Voraussetzungen

1. Raspberry Pi 4 (2GB RAM oder höher empfohlen).

2. MicroSD-Karte (16GB oder höher empfohlen) mit installiertem Raspberry Pi OS (Raspbian).

3. Stabile Internetverbindung.

4. Tastatur, Maus und ein Monitor (für die Ersteinrichtung).

5. SSH-Client (optional, für den Fernzugriff).

## Installation

1. __Dein System aktualisieren__
   Öffne ein Terminal oder verbinde dich per SSH mit deinem Raspberry Pi und stelle sicher, dass dein System auf dem neuesten Stand ist, indem du Folgendes ausführst:

   __sudo apt update__

   __sudo apt upgrade__

2. __Abhängigkeiten installieren__
   Du musst einige notwendige Abhängigkeiten installieren, um Zebra zu bauen und auszuführen:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Das Zebra-Repository klonen__
   Öffne ein Terminal und klone das Zebra-Repository auf deinen Raspberry Pi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra bauen__
   Um Zebra zu bauen, verwende die folgenden Befehle:

   __cargo build --release__

   Dieser Vorgang kann einige Zeit dauern. Stelle sicher, dass dein Raspberry Pi ausreichend gekühlt ist, da das Kompilieren Hitze erzeugen kann.

5. __Konfiguration__
   Erstelle eine Konfigurationsdatei für Zebra. Du kannst die Standardkonfiguration als Ausgangspunkt verwenden:

   __cp zcash.conf.example zcash.conf__

   Bearbeite die Datei zcash.conf, um die Einstellungen deines Nodes anzupassen. Du kannst das Netzwerk festlegen, Mining aktivieren, Peer-Verbindungen einrichten und mehr.

6. __Zebra starten__
   Du kannst Zebra jetzt mit deiner benutzerdefinierten Konfiguration starten:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Dieser Befehl startet den Zebra-Node, und er beginnt mit der Synchronisierung mit der Zcash-Blockchain.

7. __Überwachung__
   Du kannst den Fortschritt und den Status deines Zebra-Nodes überwachen, indem du einen Webbrowser öffnest und zu __http://127.0.0.1:8233/status__ navigierst.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="Zebra-Logo" width="200" height="200"/>

## Fehlerbehebung

Wenn du beim Bauen oder Ausführen von Zebra auf Probleme stößt, sieh in der [Zebra-Dokumentation](https://doc.zebra.zfnd.org/docs/intro.html) nach, um Tipps zur Fehlerbehebung und zusätzliche Informationen zu erhalten.

Achte darauf, deinen Raspberry Pi kühl zu halten, da das Ausführen eines Nodes Hitze erzeugen kann. Du solltest eine Kühllösung verwenden, zum Beispiel einen Lüfter oder einen Kühlkörper.

## Fazit

Wenn du diesem Leitfaden folgst, solltest du Zebra erfolgreich auf deinem Raspberry Pi 4 eingerichtet und ausgeführt haben. Du trägst nun als unabhängiger Node zum Zcash-Netzwerk bei und hilfst dabei, die Privatsphäre von Zcash-Transaktionen zu sichern.
