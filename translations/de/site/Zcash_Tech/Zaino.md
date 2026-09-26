# Zaino Indexer

Zaino ist ein Rust-Indexer für die Zcash-Blockchain. Er liest Blockchain-Daten von einem vollständigen Zebra-Knoten und stellt die Daten bereit, die Wallets, Explorer, Faucets und andere Dienste benötigen, ohne Zebra selbst für jeden clientseitigen Index verantwortlich zu machen.

## TL;DR

* **Zebra** validiert die Zcash-Kette.
* **Zaino** indexiert die Blockchain-Daten von Zebra und stellt clientseitige APIs bereit.
* **Zallet** ist die Wallet-Komponente im Z3-Stack. In der Standard-Z3-Konfiguration kommuniziert Zallet direkt mit Zebra und benötigt den eigenständigen Zaino-Dienst nicht.
* Der eigenständige Zaino-Dienst ist nützlich, wenn Betreiber einen mit lightwalletd kompatiblen gRPC-Endpunkt, einen JSON-RPC-Proxy oder Infrastruktur für Light-Wallets, Explorer, Faucets und ähnliche Dienste benötigen.
* Zaino ist aktive Infrastruktur, aber Betreiber sollten vor dem Produktionseinsatz die offizielle Dokumentation von Zaino und Z3 auf aktuelle Bereitstellungsdetails prüfen.

## Was Zaino macht

Zaino steht zwischen Zebra und Client-Software. Zebra ist der Konsens-Knoten: Er lädt die Zcash-Blockchain herunter, verifiziert sie und folgt ihr. Zaino verwendet Zebra als Quelle für Blockchain-Daten und bereitet dann indexierte Ansichten vor, die Client-Anwendungen effizient abfragen können.

Diese Trennung hält die Rollen klar:

| Komponente | Rolle |
|:--|:--|
| Zebra | Vollständiger Knoten und Validator |
| Zaino | Indexer und API-Dienst für Clients |
| Zallet | Wallet-Dienst |
| lightwalletd | Älterer Light-Wallet-Server, den Zaino ersetzen oder ergänzen soll |

Zaino bietet Funktionen für Light-Clients, vollständige Clients oder Wallets sowie Block-Explorer. Es ermöglicht Zugriff auf die finalisierte Kette, die nicht finalisierte beste Kette und von Zebra gehaltene Mempool-Daten.

## Einordnung in den aktuellen Zcash-Stack

Der aktuelle Z3-Stack basiert auf Zebra, Zallet und optionalem Zaino.

In der Standard-Z3-Bereitstellung laufen Zebra und Zallet gemeinsam. Zallet erreicht Zebra direkt, daher muss ein Betreiber, der nur einen lokalen Wallet-Stack betreibt, den eigenständigen Zaino-Dienst nicht starten.

Zaino wird hinzugefügt, wenn der Betreiber externe Clients bedienen möchte. In Z3 läuft es hinter dem `indexer`-Compose-Profil und fügt Folgendes hinzu:

* einen mit lightwalletd kompatiblen gRPC-Endpunkt für Light-Wallet-Clients
* einen JSON-RPC-Proxy für Explorer, Faucets und Service-Backends
* eine vom Kettenstatus von Zebra getrennte Indexer-Datenbank

Dadurch ist Zaino besonders relevant für Wallet-Backends, Betreiber öffentlicher Infrastruktur, Explorer, Faucets und Entwickler, die Dienste testen, welche indexierte Zcash-Blockchain-Daten benötigen.

## Zaino und lightwalletd

lightwalletd ist der ursprüngliche Light-Wallet-Server. Zaino ist der Rust-basierte Nachfolgeweg für diese Rolle. Ziel ist es, soweit möglich kompatible APIs bereitzustellen, damit Wallets und Dienste migrieren können, ohne sofort vollständig neu geschrieben werden zu müssen.

Das bedeutet nicht, dass jede lightwalletd-Bereitstellung bereits zu Zaino migriert ist. Betreiber sollten Zaino als Teil des aktuellen Zebra-basierten Stacks betrachten und vor der Entscheidung, was sie betreiben möchten, die aktuelle Projektdokumentation, Releases und Service-Dashboards prüfen.

## Hinweise für Betreiber

Der einfachste maßgebliche Bereitstellungsweg ist das Z3-Repository. Z3 enthält Zaino als optionalen Dienst:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Führen Sie zuerst die normale Z3-Einrichtung aus und warten Sie, bis Zebra synchronisiert ist, bevor Sie abhängige Dienste im Mainnet oder Testnet starten.

Zaino stellt zwei Arten von Netzwerkdiensten bereit. Der gRPC-Dienst ist die API für Light-Wallets. Der JSON-RPC-Dienst ist für Loopback- oder vertrauenswürdige private Netzwerke vorgesehen, sofern keine externe Schicht Schutz bietet. Setzen Sie keinen nicht authentifizierten oder unverschlüsselten JSON-RPC-Endpunkt dem öffentlichen Internet aus.

## Einige Diagramme, die zeigen, wie Zaino funktioniert

### Interne Architektur von Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Architektur des Live-Dienstes von Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Systemarchitektur von Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Häufige Fehler

**Zaino als vollständigen Knoten behandeln.** Zaino ist nicht der Validator. Zebra validiert die Kette; Zaino indexiert Daten von Zebra.

**Annehmen, dass jede Z3-Bereitstellung eigenständiges Zaino benötigt.** Zallet kann Zebra im Standard-Z3-Stack direkt erreichen. Starten Sie Zaino, wenn Sie den eigenständigen Indexer-Dienst für externe Clients benötigen.

**Geplante Funktionen als bereits bereitgestellt darstellen.** Zaino wird aktiv weiterentwickelt; prüfen Sie daher die aktuellen Release Notes und Dokumentationen, bevor Sie eine Funktion als verfügbar beschreiben.

**JSON-RPC unvorsichtig freigeben.** Die JSON-RPC-Schnittstelle von Zaino ist für Loopback- oder vertrauenswürdige private Netzwerke gedacht, sofern sie nicht durch eine andere Schicht geschützt wird.

## Wo kann ich mehr erfahren?

* [Zaino GitHub-Repository](https://github.com/zingolabs/zaino)
* [Zaino Releases](https://github.com/zingolabs/zaino/releases)
* [Zaino generierte Dokumentation](https://zingolabs.github.io/zaino/)
* [Z3-Bereitstellungs-Repository](https://github.com/ZcashFoundation/z3)
* [Zebra Dokumentation](https://zebra.zfnd.org/)
* [Zaino Förderungs- und Projektdiskussion](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Zuletzt aktualisiert:** August 2026
