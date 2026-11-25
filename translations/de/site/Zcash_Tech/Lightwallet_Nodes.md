<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Zcash-Lightwallet-Knoten

## TL;DR

* Die meisten Menschen nutzen Zcash über eine Light Wallet, die nicht die gesamte Blockchain herunterlädt. Stattdessen kommuniziert sie mit einem Server, der diese Arbeit bereits erledigt hat.
* Heute bedienen üblicherweise drei Softwareprogramme Light Wallets: **lightwalletd** (ursprünglich, in Go), **Zaino** (Rust-Indexer) und ztreamer (Hochleistungs-Rust-Indexer von Zcash Labs, der das öffentliche fastz.cash-Netzwerk betreibt).
* Ihre Schlüssel verlassen niemals Ihr Gerät, und der Server kann weder Ihre Mittel ausgeben noch die Beträge und Memos in vollständig abgeschirmten Transaktionen lesen.
* Was der Server gut ermitteln kann, sind Ihre IP-Adresse und der Zeitpunkt Ihrer Aktivitäten — abgeschirmte Transaktionen schützen, was auf der Blockchain geschieht, nicht Ihre Verbindung zum Server.
* Tor entfernt den IP-Identifier; es ist in Wallets verfügbar, die auf `zcash_client_backend` basieren, und in ZODL ist es eine Einstellung unter Erweiterte Einstellungen.
* Sie können den Server wechseln, den Ihre Wallet verwendet, oder einen eigenen betreiben — lightwalletd, Zaino und ztreamer sind alle Open Source.

## Grundlegende Erklärung

Die meisten Menschen nutzen Zcash über eine Light Wallet, die nicht die gesamte blockchain herunterlädt. Stattdessen kommuniziert sie mit einem Server, der diese Arbeit bereits erledigt hat. Diese Seite erklärt, was diese Server sind, was sie über Sie sehen können und was nicht, wie Sie Ihre Verbindung über Tor leiten und wie Sie den von Ihrer Wallet verwendeten Server wechseln.

Heute bedienen üblicherweise drei Softwareprogramme Light Wallets. **lightwalletd** ist der ursprüngliche Dienst, geschrieben in Go. **Zaino** ist ein neuerer Indexer, geschrieben in Rust und entwickelt im Rahmen der Arbeiten zur Ablösung von zcashd. **ztreamer** ist ein leistungsstarker Rust-Indexer von Zcash Labs, der das öffentliche fastz.cash-Netzwerk antreibt.

### Was ein Light-Wallet-Server tut

Ein Light-Wallet-Server sitzt zwischen Ihrer Wallet und der Zcash-blockchain und bietet ihr eine bandbreiteneffiziente Sicht auf die Chain. Er übernimmt drei Aufgaben für Sie.

Er stellt kompakte Blöcke bereit. Anstelle ganzer Blöcke sendet er eine kompakte Form, die nur das enthält, was eine Wallet benötigt, um eine Zahlung an ihre abgeschirmte Adresse zu erkennen, eine Ausgabe ihrer Notes zu erkennen und ihre Witnesses zu aktualisieren.

Er leitet Ihre Transaktionen weiter. Wenn Sie senden, übergibt Ihre Wallet die fertige Transaktion an den Server, der sie an das Netzwerk überträgt.

Er beantwortet Chain-Abfragen, etwa zur aktuellen Höhe und zu den Gebühreninformationen, die Ihre Wallet benötigt.

Ihre Wallet erledigt die privaten Aufgaben weiterhin lokal. Sie verwahrt Ihre Schlüssel, entschlüsselt Blöcke probeweise, um Ihre Notes zu finden, und erstellt und signiert Transaktionen auf Ihrem Gerät.

### Was der Server sehen kann und was nicht

Dieser Teil wird leicht missverstanden. Ihre Schlüssel verlassen niemals Ihr Gerät, aber das bedeutet nicht, dass der Server nichts über Sie erfährt.

Die Referenz hierfür ist das [Bedrohungsmodell der Zcash-Wallet-App](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), das Sie vollständig lesen sollten, wenn Ihnen dieses Thema wichtig ist. Es beschreibt verschiedene Arten von Angreifern. Für diese Seite relevant ist ein Angreifer, der den Datenverkehr zwischen Ihrer Wallet und dem Internet sowie zwischen dem Server und dem Internet beobachten kann. Wer den Server betreibt, befindet sich zwangsläufig teilweise in dieser Position, weil Ihre Wallet sich direkt mit ihm verbindet.

Beginnen wir mit dem, was geschützt ist. Gegen jeden Angreifer im Modell, einschließlich eines Angreifers, der den Server kompromittiert hat, kann dieser "keines der kryptografischen Schlüsselmaterialien des Nutzers erfahren (Ausgabeschlüssel, Viewing Keys, Seed Phrase usw.)", Ihre Mittel nicht stehlen und Sie nicht dazu bringen, Mittel zu senden, die Sie nicht senden wollten. Die Beträge und Memos in vollständig abgeschirmten Transaktionen bleiben verschlüsselt.

Dann gibt es, was nicht geschützt ist. Das Bedrohungsmodell führt diese bekannten Schwächen gegenüber einem datenverkehrsbeobachtenden Angreifer auf:

| Schwäche | Wie |
|:--|:--|
| Herausfinden, wer Sie sind | "Der Angreifer kennt die IP-Adresse des Nutzers, was zu dessen echter Identität führen könnte" |
| Ungefähr herausfinden, wo Sie sind | Ihre IP-Adresse "in einer Geolokalisierungsdatenbank nachschlagen, um ihren Standort anzunähern" |
| Feststellen, dass und wann Sie eine abgeschirmte Transaktion gesendet oder erhalten haben | Beim Senden wird "mehr Bandbreite verwendet, was sichtbar ist, obwohl die Verbindung verschlüsselt ist". Das Modell weist darauf hin, dass das Senden und Empfangen selbst für den Server sichtbar ist |
| Zählen, wie viele Transaktionen Sie im Laufe der Zeit durchgeführt haben | Dieselben Bandbreitenmuster, über einen längeren Zeitraum beobachtet |
| Wiederkehrende Zahlungsmuster erkennen | Beobachten, wann Aktivitäten stattfinden |
| Herausfinden, ob eine Adresse Ihnen gehört | Ein Angreifer, der eine Adresse bereits kennt, "könnte Mittel an diese Adresse senden und beobachten, ob es Bandbreitenspitzen gibt", weil Ihre Wallet sie abruft |

Das Modell weist außerdem darauf hin, dass der Normalfall "eine Vertrauensbeziehung zwischen dem Nutzer und dem Betreiber des lightwalletd-Servers" voraussetzt.

Die ehrliche Zusammenfassung lautet also: Ein Light-Wallet-Server kann Ihr Geld nicht ausgeben und weder die Beträge noch die Memos in Ihren abgeschirmten Transaktionen lesen. Was er gut ermitteln kann, sind Ihre IP-Adresse und der Zeitpunkt Ihrer Aktivitäten, und diese beiden Informationen zusammen können viel über eine Person verraten. Abgeschirmte Transaktionen schützen, was auf der blockchain geschieht. Sie verbergen nicht automatisch Ihre Verbindung zum Server.

## Visualisierung / Analogie

Stellen Sie sich eine öffentliche Bibliothek vor, die jede jemals gedruckte Zeitung aufbewahrt. Ein vollständiger Knoten ist ein Leser, der das gesamte Archiv mit nach Hause nimmt. Eine Light Wallet ist ein Leser, der die Bibliothekarin stattdessen um eine tägliche Zusammenfassung bittet — ein dünnes Blatt, das gerade genug enthält, um zu erkennen, ob etwas davon ihn betrifft.

Die Zusammenfassung ist versiegelt: Die Bibliothekarin stellt sie zusammen, ohne lesen zu können, welche Artikel für Sie wichtig sind, und Sie öffnen sie zu Hause mit Ihrem eigenen Schlüssel. Das ist der kompakte Block, und das Öffnen entspricht der probeweisen Entschlüsselung auf Ihrem Gerät.

Aber die Bibliothekarin sieht weiterhin, welcher Leser hereinkam, zu welcher Zeit und wie dick das Bündel war, das er mitnahm. Das sind die IP-Adresse und der Zeitpunkt — vom Schreibtisch aus sichtbar, ganz gleich, wie gut der Umschlag versiegelt ist. Tor entspricht dem Versand durch einen anonymen Kurier: Die Bibliothekarin übergibt weiterhin dasselbe Bündel, weiß aber nicht mehr, zu wessen Haus es geht.

## Vertiefung

### Routing über Tor

Tor trennt die Verbindung zwischen Ihrer IP-Adresse und dem Datenverkehr Ihrer Wallet, wodurch der stärkste Identifier in der obigen Tabelle entfernt wird.

Unterstützung besteht in den Rust-Bibliotheken, auf denen viele Zcash-Wallets aufbauen. zcash_client_backend enthält ein Tor-Modul auf Basis von [Arti](https://tpo.pages.torproject.net/core/arti/), der Rust-Implementierung von Tor, sodass eine Wallet Synchronisierung, Transaktionsübertragung und Preisabfragen über Tor leiten kann, ohne einen separaten Tor-Client mitzuliefern.

Die Zaino-Entwickler vertreten dieselbe Auffassung und zitieren das Bedrohungsmodell direkt: Es bestehe "die Notwendigkeit, anonyme Transportprotokolle (wie Nym oder Tor) zu verwenden, um die Identitäten von Clients gegenüber den Indexierungsservern von Zcash zu verschleiern".

In **ZODL** ist Tor eine Einstellung unter Erweiterte Einstellungen. Die Release Notes der Wallet verweisen Nutzer auf den manuellen Verbindungsmodus "plus Aktivierung von Tor in den Erweiterten Einstellungen", falls sie "die Offenlegung von Metadaten verringern möchten"; außerdem bietet die App an, Tor einzuschalten, bevor Sie eine Wallet wiederherstellen. Das ist der Moment, in dem eine neue IP-Adresse ansonsten mit einer gesamten Wallet-Historie verknüpft würde.

Zwei Vorbehalte: Tor verbirgt Ihre IP-Adresse vor dem Server, ändert aber nicht, was der Server aus Ihren Anfragen erfährt. Und Onion Routing erhöht die Latenz, sodass die Synchronisierung länger dauert. Das Betreiben eines eigenen Servers vermeidet die Vertrauensfrage auf andere Weise, da Sie dann selbst der Betreiber sind.

### Zaino, der Rust-Indexer

[Zaino](/zcash-tech/zaino) ist ein vom Zingo-Team geschriebener Indexer in Rust, der als Ersatz für lightwalletd im Rahmen der Arbeiten zur Ablösung von zcashd entwickelt wurde. Er bedient Light Clients, vollständige Clients und Block Explorer und liest Chain-Daten, die von "entweder einem vollständigen Zebra- oder zcashd-Validator" gehalten werden.

Er befindet sich in aktiver Entwicklung; Version 0.10.1 wurde im September 2026 veröffentlicht. Er soll, wo möglich, abwärtskompatibel mit lightwalletd bleiben, sodass Wallets auf ihn verweisen können, ohne neu geschrieben werden zu müssen.

Zaino verfügt über eine eigene Seite mit Architekturdiagrammen, daher behandelt diese Seite nur seine Rolle als Light-Wallet-Server.

### ztreamer und fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) ist ein leistungsstarker Zcash-Indexer und Light-Wallet-Server, geschrieben in Rust von Zcash Labs. Er ist auf geringe Latenz und hohen Durchsatz ausgelegt und betreibt das öffentliche [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478)-Indexernetzwerk (angekündigt am 19. November 2026).

fastz.cash betreibt regionale Edge-Server (derzeit in Frankfurt, London, Virginia, Oregon, São Paulo, Singapur und Osaka). Jede Region verfügt über einen eigenen vollständigen Knoten und einen lokalen ztreamer-Index. TLS wird am Knoten beendet. Die gemessene mediane Zeit bis zur ersten Antwort für einen GetLatestBlock-Aufruf betrug weltweit etwa 35 ms. Die Synchronisierung von Blockbereichen ist Berichten zufolge bis zu ~3× schneller als mit aktuellen lightwalletd, bei einem geringen Indexumfang (~18 GB), der zusätzliche Edge-Standorte praktikabel macht.

Status und nächstgelegener Endpunkt: [status.fastz.cash](https://status.fastz.cash).

**Datenschutzhinweis:** fastz.cash betreibt auch den Wallet-PIR-Dienst von Valar Group. Nutzer von Vizor können ihn heute für private Sync-Abfragen nutzen, die die Metadaten reduzieren, anhand derer der Server erfährt, welche Notes oder Bereiche abgefragt werden. Dies ist eine zusätzliche Datenschicht über dem oben beschriebenen üblichen Bedrohungsmodell für Light-Wallets; sie ersetzt weder Tor noch die Wahl des Betreibers.

ztreamer ist Open Source und kann unabhängig betrieben werden (mit eingebettetem Zakura-Knoten oder im Remote-Modus). Wie lightwalletd und Zaino stellt es das Light-Wallet-Protokoll über gRPC bereit. Es wird aktiv weiterentwickelt und ist sowohl als Produktionsinfrastruktur als auch als Testfeld für künftige Verbesserungen des Light-Wallet-Protokolls vorgesehen.

### Eigenen Server betreiben

Die sicherste Option ist, den Betrieb selbst zu übernehmen. Damit entfällt die Vertrauensfrage vollständig. Alle drei Server sind Open Source: [lightwalletd](https://github.com/zcash/lightwalletd) in Go, [Zaino](https://github.com/zingolabs/zaino) in Rust und [ztreamer](https://github.com/zcashlabs/ztreamer) in Rust. Sie lesen von einem vollständigen Validator. Daher benötigen Sie außerdem [Zebra](/zcash-tech/zebra-full-node) oder Zakura. Die zec.rocks-Server werden mit [Zcash Stack](/guides/zcash-stack) bereitgestellt, einem Open-Source-Helm-Chart und Docker-Compose-Kit, das Zebra und lightwalletd gemeinsam ausführt.

## Praktische Auswirkungen

### Serverliste

Das Dashboard von [hosh.zec.rocks](https://hosh.zec.rocks/zec) erfasst öffentliche Server und ihren Zustand und zeigt, welche davon tatsächlich erreichbar sind. [status.zec.rocks](https://status.zec.rocks/) zeigt den Dienststatus an. Den Status des fastz.cash-Netzwerks finden Sie unter [status.fastz.cash](https://status.fastz.cash).

Zum Zeitpunkt der Erstellung auf diesem Dashboard aufgeführte Server:

| Server | Hinweise |
|:--|:--|
| zec.rocks:443 | Regionale Endpunkte sind daneben unter na.zec.rocks, eu.zec.rocks, ap.zec.rocks und sa.zec.rocks aufgeführt |
| zec-node.cakewallet.com:443 | Auf der Domain von Cake Wallet |
| zec.0xrpc.io:443 | Betrieben von 0xRPC, das kostenlose öffentliche Endpunkte für mehrere Chains anbietet und um Spenden zur Abdeckung der Kapazität bittet |
| zaino.unsafe.zec.rocks:443 | Eine Zaino-Instanz. Beachten Sie den Hostnamen und behandeln Sie sie als experimentell |
| testnet.zec.rocks:443 | Testnet, mit einer Zaino-Testnet-Instanz unter zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Öffentliches ztreamer-Netzwerk von Zcash Labs. Unter status.fastz.cash finden Sie regionale Endpunkte und den Status. |

Prüfe die Dashboards, statt dieser Liste zu vertrauen. Betreiber kommen und gehen, und eine Seite wie diese veraltet.

### Server in Ihrer Wallet wechseln

Das lohnt sich, wenn Sie einen Betreiber auswählen möchten, dem Sie vertrauen, Aktivitäten auf verschiedene Betreiber verteilen oder auf Ihren eigenen Server verweisen möchten.

Die untenstehenden Menüpfade waren bei der Aktualisierung dieser Seite korrekt, aber Wallet-Oberflächen ändern sich; verstehen Sie sie daher als Hinweis und nicht als exakten Weg. Suchen Sie nach Erweiterte Einstellungen oder einer Serveroption.

#### ZODL

Früher Zashi. Tippen Sie auf das Zahnrad oben rechts und dann auf Erweiterte Einstellungen. Tor befindet sich im selben Bildschirm. ZODL bietet außerdem die Verknüpfung Server wechseln, wenn ein Synchronisierungsfehler dadurch verursacht wird, dass der Server nicht aktuell ist.

#### Zkool

Der Nachfolger von Ywallet vom selben Entwickler (Ywallet selbst wird nicht mehr gewartet und kann dem Netzwerk nach Ironwood nicht mehr folgen). Das Zahnradsymbol (Einstellungen öffnen) oben auf dem Kontobildschirm, dann das Feld „Light Node Server“. Über die Listen-Schaltfläche daneben lassen sich bekannte Server auswählen, und mit dem Schalter „Direct / Tor / Nym / Proxy“ darunter wird festgelegt, wie die Wallet eine Verbindung herstellt.

#### Zingo

Öffnen Sie das Hamburger-Menü oben links, dann Einstellungen, und scrollen Sie nach unten.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Öffnen Sie das Hamburger-Menü oben links, dann Einstellungen und anschließend Erweitert.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Diese Screenshots wurden im März 2025 aufgenommen. Die Apps haben seitdem neue Versionen veröffentlicht, daher könnten Schaltflächen verschoben worden sein.

## Häufige Fehler

**Zu denken, dass der Server Ihre Transaktionen lesen kann**. Das kann er nicht. Ihre Schlüssel bleiben auf Ihrem Gerät, und die Beträge und Memos in vollständig abgeschirmten Transaktionen bleiben verschlüsselt — selbst gegenüber einem Angreifer, der den Server kompromittiert hat.

**„Abgeschirmt“ als „anonyme Verbindung“ zu verstehen**. Abgeschirmte Transaktionen schützen, was auf der blockchain geschieht. Ihre IP-Adresse und der Zeitpunkt Ihrer Aktivitäten sind eine separate Ebene, und genau diese Ebene sieht der Server.

**Anzunehmen, Tor entferne jede Spur**. Tor verbirgt Ihre IP-Adresse vor dem Server, ändert aber nicht, was der Server aus Ihren Anfragen erfährt, und erhöht die Latenz bei der Synchronisierung.

**Einer Serverliste auf einer Wiki-Seite vertrauen**. Betreiber kommen und gehen. Prüfe auf [hosh.zec.rocks](https://hosh.zec.rocks/zec) und [status.fastz.cash](https://status.fastz.cash), was tatsächlich läuft, bevor du deine Wallet mit irgendetwas verbindest.

## Zusammenfassung

Light Wallets ermöglichen Ihnen den abgeschirmten Pool ohne den Speicherplatzbedarf, was ein guter Tausch ist. Seien Sie sich nur darüber im Klaren, was Sie eintauschen. Der Server kann Ihre Mittel nicht nehmen und Ihre abgeschirmten Beträge nicht lesen, kann aber gut erkennen, welche IP-Adresse Sie haben und wann Sie Transaktionen durchführen. Leiten Sie Ihre Verbindung über Tor, wählen Sie Ihren Betreiber bewusst oder betreiben Sie einen eigenen.

## Verwandte Seiten

- [Wer kann deine Zcash-Zahlung](/start-here/who-can-see-your-zcash-payment) sehen — die Einsteigerperspektive auf dieselbe Frage.
- [Was ein Block-Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see) — was on-chain sichtbar ist, im Gegensatz zu dem, was auf dem Server sichtbar ist.
- [Zaino](/zcash-tech/zaino) — Architekturdiagramme und die umfassendere Rolle des Rust-Indexers.
- [Zinder](/zcash-tech/zinder) — der Alpha-Indexer von Zcash Foundation, der Light Wallets über einen lightwalletd-kompatiblen Adapter bedient.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — der Validator, von dem ein Light-Wallet-Server liest.
- [Zcash Wallet-Synchronisierung](/zcash-tech/zcash-wallet-syncing) — wie deine Wallet die kompakten Blöcke verarbeitet, die ein Server sendet.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — ein leistungsstarker Rust-Indexer, der vom fastz.cash-Netzwerk verwendet wird.

**Zuletzt aktualisiert:** November 2026
