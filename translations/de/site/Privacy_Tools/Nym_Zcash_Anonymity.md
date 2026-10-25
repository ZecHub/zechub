<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet-Anonymität für Zcash

> Zuletzt überprüft: 18. Oktober 2026

Zcash Shielded Pools verbergen Beträge, Absender und Empfänger on-chain. Sie verbergen nicht den Netzwerkpfad zwischen einer Wallet und dem lightwallet server. Das Mixnet von Nym ergänzt diesen fehlenden Schutz auf Netzwerkebene. Seit Oktober 2026 ist die Integration in Produktions-Wallets (Zingo, Zkool) aktiv.

Quelle: [Wie Nym Wallets von Zcash Anonymität verleiht](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13. Oktober 2026).

## Was geschützt ist

Nym zerlegt Transaktionspakete (typischerweise 7–15 KB an Ausgabedaten und ZK-Proofs) in Sphinx-Pakete und leitet sie durch das Mixnet. Dies:

- Verbirgt die IP-Adresse des Absenders vor dem lightwallet server
- Mischt den Datenverkehr mit anderem Datenverkehr von Nym
- Bietet bei den Standardeinstellungen ungefähr 17 Bit Entropie mit einer angegebenen Anonymitätsmenge von über 100.000 Nutzern

Zahlungen und Preisanfragen in Zingo v7 folgen standardmäßig diesem Pfad.

## Was nicht geschützt ist

Chain-Synchronisierung, Nullifier-Abfragen, Transaktionsabrufe und Mempool-Datenverkehr nutzen derzeit die normale Indexer-Verbindung. Metadaten auf Geräte- oder Anwendungsebene außerhalb der gemischten Pakete liegen ebenfalls außerhalb des Geltungsbereichs von Nym.

Wenn Ihr Bedrohungsmodell das Verbergen des Synchronisierungsdatenverkehrs erfordert, kombinieren Sie eine native Mixnet-Wallet mit systemweitem NymVPN. Siehe [Nym VPN](/guides/nym-vpn).

## Wallets

| Wallet | Status | Hinweise |
| --- | --- | --- |
| Zingo v7 | Aktiv, Standard | `makers run-cli` bündelt `nym-proxy`. Die Sitzung startet offline; `--online`, `--remember-online` oder `--server` erteilt die Zustimmung. |
| Zkool | Aktiv | Native Mixnet-Integration. |
| Andere | Über NymVPN | Leiten Sie die Wallet durch den systemweiten Mixnet-Modus. |

Einrichtungsdetails für den Pfad auf Wallet-Ebene finden Sie unter [Leiten Sie den Wallet-Datenverkehr von Zcash über das Mixnet von Nym](/guides/nym-mixnet-wallet-setup).

## Abwägungen

Eine über Nym geroutete Übertragung ist ungefähr 12,5× langsamer als Clearnet (~3,4 s). Tor ist schneller (~3,7×), verwendet jedoch FIFO-Streams ohne Mischung, sodass ein globaler Angreifer weiterhin korrelieren kann. Eine wachsende gemeinsame Nutzerbasis von Nym erhöht die Anonymität wirksamer als zusätzliche Verzögerung.

## Hygiene auf Anwendungsebene: nym-swizzle-zcash

Schutz auf Netzwerkebene reicht nicht aus. Selbst bei einem perfekten Mixnet oder VPN kann ein lightwallet server Sitzungen weiterhin verknüpfen, indem er Muster auf Anwendungsebene beobachtet:

- Verkettung von Fortsetzungspunkten: Clients setzen die Synchronisierung exakt bei `previous end + 1` fort, sodass der Server Sitzungen allein anhand der Blockhöhe verketten kann.
- Synchronisieren, dann senden: Wallets synchronisieren unmittelbar vor der Übertragung, wodurch der Server eine Transaktion der vorherigen Synchronisierungssitzung zuordnen kann.

Die Crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementiert eine für Zcash spezifische Hygienerichtlinie, die beide Probleme angeht. Sie bündelt die allgemeinen Primitive von `nym-swizzle` in einer chain-bewussten Richtlinie für Light Clients.

**Quantisierte Synchronisierungsbereiche.** Anfragen werden auf ein netzwerkweites Raster mit zellgroßen Tagesintervallen erweitert. Der Anfang wird abgerundet und das Ende aufgerundet. Bereiche sind deterministisch, aufsteigend und disjunkt. Reorg-Prüfungen bleiben innerhalb des erweiterten Bereichs, sodass der exakte Fortsetzungspunkt nicht offengelegt wird. Anonymität entsteht durch Kollisionen (viele Wallets senden dieselben Grenzen) und nicht durch Rauschen.

**Entkoppelte Übertragungen.** Das Senden von Transaktionen wird durch eine Exponentialverteilung verzögert (Mittelwert 144 Blöcke ≈ 3 Stunden, Obergrenze 576 Blöcke ≈ 12 Stunden), entsprechend der Übertragungsplanung von ZIP 318. Verzögerungen überschreiten typische Prozesslaufzeiten, daher werden Zeitpläne persistent gespeichert. Die Transaktion wird erst zum Auslösezeitpunkt gegen einen aktuellen Tip erstellt. Synchronisierung und Übertragung sollten unterschiedliche Server verwenden.

Die Crate stellt die Traits `BlockSource` und `TxBroadcaster` bereit, wird für `wasm32-unknown-unknown` kompiliert und besitzt keinen eigenen Netzwerk-Stack. Die [Nym-Dokumentation](https://nym.com/docs/developers/swizzle/zcash) enthält die vollständige API und Beispiele.

## Quellen

- [Wie Nym Wallets von Zcash Anonymität verleiht](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13. Oktober 2026
- [nym-swizzle-zcash: Hygienerichtlinie für Zcash Light Clients](https://nym.com/docs/developers/swizzle/zcash) — Nym Docs
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Leiten Sie den Wallet-Datenverkehr von Zcash über das Mixnet von Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
