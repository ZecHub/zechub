<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Entwicklerressourcen

Die Ressourcen, die du brauchst, um auf Zcash zu entwickeln, gruppiert danach, wofür sie jeweils da sind, statt sie einfach ungeordnet aufzulisten.

Der Stack hat sich 2026 stark verändert. zcashd, das über den größten Teil seiner Geschichte das Netzwerk betrieb, erreichte am 18. Juli 2026 bei Blockhöhe 3417100 sein Lebensende, und jeder unveränderte Knoten schaltete sich bei dieser Höhe ab und verweigert einen Neustart. Anleitungen, die für zcashd geschrieben wurden, sind inzwischen eher Geschichte als ein Ausgangspunkt, daher ist diese Seite danach organisiert, was es ersetzt hat.

## Der Stack auf einen Blick

| Ebene | Was du verwenden solltest | Starte mit |
|:--|:--|:--|
| Vollknoten | Zebra oder Zakura | [Das Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Vollknoten-Wallet | Zallet, in Beta | [Das Zallet Book](https://zcash.github.io/zallet/) |
| Light-Wallet-Server | Zaino oder lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet-Bibliotheken | Die librustzcash-Crates | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobil | Android- und iOS-SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spezifikation | Protokollspezifikation und ZIPs | [zips.z.cash](https://zips.z.cash) |

## Knoten

Ein Knoten validiert den Konsens und hält die Chain. Es gibt zwei aktiv entwickelte Implementierungen.

[Zebra](/zcash-tech/zebra-full-node) ist der Knoten der Zcash Foundation, in Rust geschrieben, und derjenige, von dem die meisten Anleitungen inzwischen ausgehen. [Das Zebra Book](https://zebra.zfnd.org/) behandelt Installation und Betrieb, und im [Repository](https://github.com/ZcashFoundation/zebra) findet die Entwicklung statt.

[Zakura](/zcash-tech/zakura-node) ist ein neuerer Knoten, von seinen Autoren als ein "konsenskompatibler Zcash-Vollknoten, gebaut für Skalierung" beschrieben, mit schnellerer Synchronisierung, Block-Pruning und einem zcashd-Kompatibilitätsmodus. Er wird von Sean Bowe, einem Mitgründer von Zcash, und Dev Ojha geleitet. Er ist unter Apache 2.0 als Open Source verfügbar unter [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub hat eine Seite zu [Full Nodes](/zcash-tech/full-nodes), die die Abwägungen zwischen ihnen behandelt.

## Die Vollknoten-Wallet

zcashd bündelte eine Wallet mit dem Knoten. Diese Wallet ist verschwunden, und [Zallet](https://github.com/zcash/zallet) ist der Ersatz. Das Zallet Book beschreibt sie als "eine Zcash-Vollknoten-Wallet, geschrieben in Rust", die "als Ersatz für die zcashd-Wallet gebaut" wird.

Lies die Sicherheitswarnung, bevor du dich darauf verlässt. Zallet ist in der Beta, "wurde nicht vollständig geprüft", Breaking Changes "können jederzeit auftreten und erfordern möglicherweise, dass du deine Zallet-Wallet löschst und neu erstellst", und noch nicht jede zcashd-RPC-Methode wurde portiert.

Wenn du ein bestehendes Setup umstellst, hat ZecHub einen [Migrationsleitfaden von zcashd zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) und eine [Zallet-Kurzreferenz](/using-zcash/zallet-quick-reference-guide).

## Light-Wallet-Server

Die meisten Wallets betreiben keinen Knoten. Sie sprechen mit einem Server, der die Chain hält und ihnen eine kompakte Sicht darauf zurückgibt.

[lightwalletd](https://github.com/zcash/lightwalletd) ist der ursprüngliche Dienst, in Go geschrieben, beschrieben als "ein Backend-Dienst, der eine bandbreiteneffiziente Schnittstelle zur Zcash-Blockchain bereitstellt". [Zaino](/zcash-tech/zaino) ist der neuere Indexer, in Rust geschrieben, und liest von einem vollständigen Validator, statt eine eigene Kopie der Chain mitzuführen.

Die Dokumentation zum [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) behandelt das Protokoll selbst. Die Seite [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) behandelt, was diese Server über einen Nutzer sehen können und was nicht, was man verstehen sollte, bevor man sich für einen entscheidet.

## Eine Wallet bauen

Die meiste Wallet-Arbeit geschieht in den Rust-Crates unter [librustzcash](https://github.com/zcash/librustzcash), auf denen die mobilen SDKs und mehrere Desktop-Wallets aufbauen. Jede Crate ist auf [docs.rs](https://docs.rs) dokumentiert.

| Crate | Wofür sie da ist |
|:--|:--|
| zcash_client_backend | "APIs zum Erstellen abgeschirmter Zcash-Light-Clients", einschließlich Synchronisierung und Transaktionskonstruktion |
| zcash_client_sqlite | "Ein SQLite-basierter Zcash-Light-Client", die Speicherschicht für das Obige |
| zcash_keys | "Zcash-Schlüssel- und Adressverwaltung" |
| zcash_primitives | "Rust-Implementierungen der Zcash-Primitiven" |
| zcash_protocol | "Netzwerkkonstanten und Wertetypen des Zcash-Protokolls" |
| orchard | "Das abgeschirmte Orchard-Transaktionsprotokoll" |
| sapling-crypto | "Kryptographische Bibliothek für Zcash Sapling" |
| pczt | "Werkzeuge für die Arbeit mit teilweise erstellten Zcash-Transaktionen", verwendet für Hardware- und Multi-Device-Signierung |
| zip321 | Payment-Request-URIs, wie in ZIP 321 spezifiziert |

Für Mobilgeräte kapseln das [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) und das [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) diese Bibliotheken. Das iOS-Repository hieß früher ZcashLightClientKit, daher verwenden ältere Links und Artikel diesen Namen.

## Spezifikation und Kryptographie

Die [Protokollspezifikation](https://zips.z.cash/protocol/protocol.pdf) ist die maßgebliche Quelle dafür, wie Zcash funktioniert, einschließlich [Adress- und Schlüssel-Kodierungen](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) sind der Ort, an dem Änderungen vorgeschlagen und spezifiziert werden, und der Index zeigt, welche Entwürfe und welche final sind. Konsensänderungen werden in Netzwerk-Upgrades ausgeliefert, und ZecHub verfolgt diese auf der Seite [Network Upgrades](/start-here/network-upgrades).

Für die zugrunde liegende Kryptographie lies [Das halo2 Book](https://zcash.github.io/halo2/index.html) und [Das Orchard Book](https://zcash.github.io/orchard/), zusammen mit der Dokumentation der Crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) und [orchard](https://docs.rs/orchard/latest/orchard/). [Das FROST Book](https://frost.zfnd.org/) behandelt Threshold-Signaturen, und ZecHub hat eine Seite zu [FROST](/zcash-tech/frost).

## Testnet

Testnet ist eine separate Chain mit wertlosen Coins, genannt TAZ. Sowohl Zebra als auch Zakura können dagegen betrieben werden, und der [Testnet-Leitfaden](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) behandelt die Konfiguration von Knoten.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) ist ein funktionierender Testnet-Block-Explorer, mit einem Mainnet-Gegenstück unter [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

An TAZ zu kommen ist der unangenehme Teil. Öffentliche Faucets erscheinen und verschwinden, und die in älterer Dokumentation verlinkten reagierten zum Zeitpunkt der Erstellung dieser Seite nicht. Der verlässliche Weg ist, im Zcash-R&D-Discord zu fragen, genau wie es auch die Zcash-Dokumentation selbst empfiehlt.

## Allgemeine Dokumentation

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) ist weiterhin die breiteste einzelne Quelle und behandelt Protokollkonzepte, Integration und Mining. Lies sie mit etwas Vorsicht. Sie ist auf zcashd versioniert, daher beschreiben Teile davon einen Knoten, der nicht mehr läuft, während die Protokoll- und Light-Client-Abschnitte weiterhin nützlich sind. [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), das dort liegt, ist lesenswert, bevor du irgendetwas entwirfst, das die Privatsphäre der Nutzer berührt.

Wenn du allgemein neu bei Blockchains bist, ist [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) die übliche Empfehlung für die gemeinsamen Grundlagen und kann kostenlos vollständig gelesen werden. Abgeschirmte Transaktionen behandelt es nicht.

## Andere Werkzeuge, die Entwickler erwähnt haben

[Arti](https://docs.rs/arti/latest/arti/) ist die Rust-Implementierung von Tor, die von zcash_client_backend verwendet wird, um Wallet-Datenverkehr zu routen. [Tailscale](https://github.com/tailscale/tailscale) kommt oft auf, wenn es darum geht, sich mit einem selbst betriebenen Knoten zu verbinden. [warp2](https://github.com/hhanh00/warp2) ist eine schnelle Synchronisierungsimplementierung von Hanh, wurde allerdings seit 2023 nicht mehr aktualisiert.

## Community und Veranstaltungen

Der [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) ist der Ort, an dem über Protokoll- und Wallet-Entwicklung gesprochen wird, und das [Zcash Community Forum](https://forum.zcashcommunity.com/) enthält längere Vorschläge und Support-Threads.

Aktuelle Hackathon-Ergebnisse geben einen guten Eindruck davon, woran die Leute bauen: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) und der [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Eingestellte Ressourcen

Sie bleiben hier, weil ältere Artikel auf sie verlinken und weil sie weiterhin die Referenz dafür sind, wie sich der eingestellte Knoten verhalten hat. Fang hier nicht an.

[Das Zcashd Book](https://zcash.github.io/zcash/) und die [zcashd RPC-Referenz](https://zcash.github.io/rpc/) dokumentieren Software, die im Juli 2026 ihr [Lebensende](https://zcash.github.io/zcash/user/end-of-life.html) erreicht hat. Das Repository [zcash/zcash](https://github.com/zcash/zcash) ist archiviert.

Wenn du eine Ressource hinzufügen möchtest oder dir hier etwas auffällt, das veraltet ist, eröffne ein Issue oder einen Pull Request. Teams haben nicht immer die Kapazität, alles aktuell zu halten, und ein Hinweis darauf, worauf du gestoßen bist, hilft dabei, die Leitfäden gezielt zu verbessern.

**Zuletzt aktualisiert:** August 2026
