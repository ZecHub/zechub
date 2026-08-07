---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync ist die Synchronisierungs-Engine, die in Zingo! 2.0 eingeführt wurde, dem Open-Source-Zcash-Wallet von Zingo Labs.
* Sie verwendet eine nichtlineare Synchronisierung, anstatt die Chain in großen sequenziellen Blöcken zu scannen, sodass dein Guthaben und deine Transaktionen viel früher erscheinen.
* Der Fortschritt wird fortlaufend gespeichert. Wenn die Verbindung abbricht oder die App geschlossen wird, wird die Synchronisierung dort fortgesetzt, wo sie aufgehört hat, anstatt neu zu starten.
* Du kannst Ausgaben tätigen, bevor die Synchronisierung abgeschlossen ist.
* Shielded-Transaktionen bleiben während des gesamten Prozesses privat.

## Kernerklärung

Zingo 2.0 ist die neueste Version des Zingo!-Wallets, eines leichtgewichtigen Open-Source-Wallets, das für die Zcash-Community entwickelt wurde. Der Star dieser Veröffentlichung ist Pepper Sync, ein großes Upgrade, das die Art und Weise, wie Wallets sich mit der Blockchain verbinden, vollständig neu denkt.

Früher konnte sich die Synchronisierung schmerzhaft langsam, fehleranfällig und ressourcenintensiv anfühlen und zwang Nutzer manchmal dazu, wieder bei null anzufangen. Pepper Sync ändert all das. Es macht die Synchronisierung schneller, flüssiger, zuverlässiger und weniger anspruchsvoll für dein Gerät, während die Privatsphäre von Shielded-Transaktionen vollständig erhalten bleibt.

Ganz gleich, ob du ein brandneuer Nutzer bist, der Zcash zum ersten Mal ausprobiert, oder ein langjähriges Community-Mitglied, das mehrere Shielded-Wallets verwaltet: Pepper Sync macht die Erfahrung deutlich praktischer und angenehmer.

### Kernfunktionen von Pepper Sync

Pepper Sync bringt mehrere Verbesserungen:

- Deutlich schnellere Synchronisierung - Dein Wallet ist in Minuten statt in Stunden einsatzbereit.
- Intelligente Aktualisierungen - Daten werden in kleineren Blöcken verarbeitet, wodurch vollständige Rescans vermieden werden.
- Widerstandsfähig gegen Unterbrechungen - Wenn deine Verbindung abbricht, wird die Synchronisierung dort fortgesetzt, wo sie aufgehört hat.
- Leichtgewichtig & effizient - Optimiert für Smartphones, Laptops und andere Geräte mit geringerer Leistung.
- Klareres Feedback - Fortschrittsanzeigen in Echtzeit verringern Verwirrung.
- Datenschutzwahrend - Shielded-Transaktionen bleiben während des gesamten Prozesses privat.

### Was jetzt besser ist als früher

Ältere Versionen von Zingo frustrierten Nutzer oft mit langen Synchronisierungszeiten, unklarer Fehlerbehandlung und hoher Ressourcennutzung. Pepper Sync behebt diese häufigen Probleme:

| Feature            | Frühere Zingo-Versionen                | Zingo 2.0 mit Pepper Sync                   |
| ------------------ | -------------------------------------- | ------------------------------------------- |
| Synchronisierungsgeschwindigkeit | Langsamer, besonders bei der Ersteinrichtung | Deutlich schnellere erste und laufende Synchronisierung |
| Fehlerbehandlung     | Gelegentliche Hänger und unklare Fehler | Verbesserte Stabilität mit automatischer Wiederherstellung   |
| Nutzererfahrung    | Die Synchronisierung wirkte auf Neueinsteiger "undurchsichtig"        | Transparent, mit klarerem Status und Updates |
| Geräteleistung | Hohe CPU-/Speicherauslastung                  | Optimiert für reibungslose Ressourcennutzung            |

Kurz gesagt: Die Synchronisierung ist jetzt schneller, zuverlässiger und leichter zu verstehen.

## Visualisierung / Analogie

Stell dir eine ältere Wallet-Synchronisierung so vor, als müsstest du ein sehr langes Buch von Seite eins an laut vorlesen, bevor du überhaupt etwas darüber sagen darfst. Hörst du auf halber Strecke auf, beginnst du wieder bei Seite eins. Pepper Sync liest dasselbe Buch, behält aber ein Lesezeichen, liest zuerst die Kapitel, die für dich wichtig sind, und erlaubt dir, über die Geschichte zu sprechen, bevor du die letzte Seite beendet hast.

Das Lesezeichen ist der wichtige Teil. Jede frühere Version behandelte eine unterbrochene Synchronisierung als vergeudete Arbeit; Pepper Sync behandelt sie als Pause.

### Visuelle Anleitungen

- Detaillierter Ablauf - Zeigt den vollständigen Prozess. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Vereinfachter Ablauf - Schnelle Übersicht für alltägliche Nutzer. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Detaillierter Einblick

### Wie Pepper Sync funktioniert (einfache Ansicht)

Anstatt die Blockchain in riesigen, unhandlichen Blöcken erneut zu scannen, arbeitet Pepper Sync in kleinen, überschaubaren Schritten – und speichert dabei fortlaufend deinen Fortschritt.

1. Verbinden - Das Wallet meldet sich beim Netzwerk.
2. Blöcke abrufen - Daten werden schrittweise heruntergeladen.
3. Verifizieren - Transaktionen werden validiert.
4. Shielded-Notizen verarbeiten - Die Privatsphäre bleibt jederzeit gewahrt.
5. Guthaben aktualisieren - Das Wallet aktualisiert sich sicher.
6. Fortschritt speichern - Anhalten und Fortsetzen funktionieren nahtlos.
7. Abschließen - Das Wallet ist bereit für Transaktionen.

## Praktische Auswirkungen

### Wer profitiert von Pepper Sync?

- Neue Nutzer - Können Wallets schnell einrichten, ohne sich von Verzögerungen entmutigen zu lassen.
- Tägliche Nutzer - Zuverlässige Synchronisierung macht Shielded-Zahlungen im Alltag praktikabel.
- Entwickler & Tester - Kürzere Synchronisierungszeiten bedeuten schnellere Testzyklen.
- Mobile & leichte Geräte - Zingo läuft jetzt effizient selbst auf Hardware mit begrenzten Ressourcen.

### Warum das für Zcash wichtig ist

Zcash basiert auf Shielded-Transaktionen, einem der leistungsfähigsten Datenschutzwerkzeuge im Kryptowährungsbereich. Aber Privatsphäre ist nur dann nützlich, wenn sie zugänglich ist.

Pepper Sync hilft dabei, indem es:

- Eintrittsbarrieren senkt - Neue Nutzer können schnell loslegen.
- Alltagstauglichkeit unterstützt - Shielded-Adressen werden leichter vertrauenswürdig.
- Ökosystemwachstum fördert - Eine bessere Wallet-Erfahrung treibt mehr Akzeptanz, Apps und Services voran.

Durch die Verbesserung der Wallet-Erfahrung stärkt Pepper Sync das gesamte Zcash-Ökosystem.

### Erste Schritte: Onboarding mit Zingo 2.0

1. Wallet herunterladen - Hole dir die richtige Version von der [Zingo GitHub releases page](https://github.com/zingolabs/zingolib)
2. Wallet einrichten - Erstelle ein neues oder stelle es aus einer bestehenden Seed-Phrase wieder her. [Zingo 2.0 with Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Pepper Sync ausführen lassen - Beobachte die Fortschrittsanzeigen, während dein Wallet aktualisiert wird. [Pepper Sync Run](https://x.com/ZingoLabs/status/1961871338441724191)
4. Zcash nutzen - Sende und empfange Shielded-ZEC, sobald die Synchronisierung abgeschlossen ist.
5. Bei Unterbrechungen entspannt bleiben - Wenn die App geschlossen wird oder die Verbindung abbricht, setzt Pepper Sync automatisch fort.

## Häufige Fehler

**Pepper Sync so zu behandeln, als wäre es selbst ein Wallet**. Pepper Sync ist die Synchronisierungs-Engine innerhalb des Zingo!-Wallets, keine eigenständige Anwendung. Du installierst Zingo; Pepper Sync läuft darunter.

**Anzunehmen, dass schnellere Synchronisierung schwächere Privatsphäre bedeutet**. Die Geschwindigkeit kommt daher, wie Blockdaten abgerufen, angeordnet und zwischengespeichert werden, nicht dadurch, dass mehr Informationen preisgegeben werden. Shielded-Transaktionen bleiben durchgehend privat.

**Anzunehmen, dass du vollständig synchronisiert sein musst, bevor du Ausgaben tätigen kannst**. Ausgaben vor Abschluss der Synchronisierung zu tätigen, ist eine der Hauptfunktionen von Pepper Sync, daher musst du nicht warten, bis das Wallet die Spitze der Chain erreicht hat.

## FAQ - Häufige Fragen

**F: Muss ich jedes Mal neu scannen, wenn ich das Wallet öffne?**

A: Nein. Pepper Sync speichert den Fortschritt, daher musst du nur ab dem letzten Punkt aktualisieren.

**F: Was passiert, wenn meine Internetverbindung abbricht?**

A: Die Synchronisierung pausiert und setzt später fort, ohne neu zu starten.

**F: Ist meine Privatsphäre während der Synchronisierung sicher?**

A: Ja. Shielded-Transaktionen bleiben vollständig privat.

**F: Wie lange dauert die erste Synchronisierung?**

A: In der Regel Minuten statt Stunden, abhängig von deinem Gerät und deiner Internetverbindung.

**F: Kann ich das Wallet verwenden, bevor die Synchronisierung abgeschlossen ist?**

A: Ja. Pepper Sync unterstützt Ausgaben, bevor die Synchronisierung abgeschlossen ist, sodass du nicht warten musst, bis das Wallet die Spitze der Chain erreicht hat.

## Fazit

Mit Zingo 2.0 Pepper Sync ist die Synchronisierung nicht länger der größte Schmerzpunkt von Shielded-Wallets. Sie ist jetzt schnell, stabil und benutzerfreundlich, senkt die Einstiegshürde für Neueinsteiger und macht die tägliche Nutzung deutlich praktikabler.

Für Nutzer bedeutet das weniger Warten und mehr Privatsphäre. Für Entwickler bedeutet es eine stärkere Grundlage, auf der sie aufbauen können. Für das Zcash-Ökosystem ist es ein weiterer Schritt hin dazu, Shielded-Transaktionen für alle zugänglich zu machen.

Zingo 2.0 mit Pepper Sync ist nicht nur ein Upgrade; es ist ein großer Sprung nach vorn für private, nutzbare Kryptowährung.

## Verwandte Seiten

- [Zcash-Wallet-Synchronisierung](/zcash-tech/zcash-wallet-syncing) — wie die Wallet-Synchronisierung im gesamten Zcash-Ökosystem funktioniert.
- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) — die Infrastruktur, mit der sich ein Light Wallet wie Zingo synchronisiert.
- [Zaino](/zcash-tech/zaino) — der vom Zingo-Team entwickelte Indexer.
- [Wallets](/wallets) — das vollständige Verzeichnis der Zcash-Wallets und ihrer Funktionen.

## Weiterführendes Lernen

- [Zingo! GitHub-Repository](https://github.com/zingolabs/zingolib)
- [Zcash Community Forum](https://forum.zcashcommunity.com/)
- Offizielle Ankündigungen - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
