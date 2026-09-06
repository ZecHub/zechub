<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Entwicklerressourcen

Die Ressourcen, die du brauchst, um auf Zcash zu entwickeln, nach ihrem jeweiligen Zweck gruppiert statt ungeordnet aufgelistet.

Der Stack hat sich 2026 stark verändert. zcashd, das während des Großteils seiner Geschichte das Netzwerk betrieb, erreichte am 18. Juli 2026 bei Blockhöhe 3417100 sein End-of-Life. Jeder unveränderte Knoten wurde bei dieser Höhe heruntergefahren und wird einen Neustart verweigern. Anleitungen für zcashd sind nun Geschichte und kein Ausgangspunkt mehr; daher ist diese Seite nach dessen Nachfolgern organisiert.

## Der Stack auf einen Blick

| Ebene | Was verwenden | Beginne mit |
|:--|:--|:--|
| Vollständiger Knoten | Zebra oder Zakura | [Das Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet für vollständige Knoten | Zallet, in Beta | [Das Zallet Book](https://zcash.github.io/zallet/) |
| Light-Wallet-Server | Zaino oder lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet-Bibliotheken | Die librustzcash Crates | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobilgeräte | Android- und iOS-SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spezifikation | Protokollspezifikation und ZIPs | [zips.z.cash](https://zips.z.cash) |

## Knoten

Ein Knoten validiert den Konsens und speichert die Blockchain. Es gibt zwei aktiv entwickelte Implementierungen.

[Zebra](/zcash-tech/zebra-full-node) ist der Knoten der Zcash Foundation, in Rust geschrieben, und derjenige, von dem die meisten Anleitungen inzwischen ausgehen. [Das Zebra Book](https://zebra.zfnd.org/) behandelt Installation und Betrieb, während die Entwicklung im [Repository](https://github.com/ZcashFoundation/zebra) stattfindet.

[Zakura](/zcash-tech/zakura-node) ist ein neuerer Knoten, der von seinen Autoren als „konsenskompatibler vollständiger Zcash-Knoten, für Skalierbarkeit gebaut“ beschrieben wird, mit schnellerer Synchronisierung, Block-Pruning und einem zcashd-Kompatibilitätsmodus. Er wird von Sean Bowe, einem Zcash-Mitgründer, und Dev Ojha geleitet. Er ist unter Apache 2.0 als Open Source unter [zakura-core/zakura](https://github.com/zakura-core/zakura) verfügbar.

ZecHub hat eine Seite zu [vollständigen Knoten](/zcash-tech/full-nodes), die die Abwägungen zwischen ihnen behandelt.

## Die Wallet für vollständige Knoten

zcashd bündelte eine Wallet mit dem Knoten. Diese Wallet ist verschwunden, und [Zallet](https://github.com/zcash/zallet) ist der Ersatz. Das Zallet Book beschreibt sie als „eine vollständige Zcash-Knoten-Wallet, geschrieben in Rust“, die „als Ersatz für die zcashd-Wallet entwickelt wird“.

Lies die Sicherheitswarnung, bevor du dich darauf verlässt. Zallet ist in Beta, wurde „nicht vollständig überprüft“, Breaking Changes „können jederzeit auftreten und erfordern möglicherweise, dass du deine Zallet-Wallet löschst und neu erstellst“, und noch nicht jede zcashd-RPC-Methode wurde portiert.

Wenn du ein bestehendes Setup migrierst, bietet ZecHub eine [Migrationsanleitung von zcashd zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) und eine [Zallet-Kurzreferenz](/using-zcash/zallet-quick-reference-guide).

## Light-Wallet-Server

Die meisten Wallets betreiben keinen Knoten. Sie kommunizieren mit einem Server, der die Blockchain vorhält und eine kompakte Ansicht davon zurückgibt.

[lightwalletd](https://github.com/zcash/lightwalletd) ist der ursprüngliche Dienst, in Go geschrieben und beschrieben als „ein Backend-Dienst, der eine bandbreiteneffiziente Schnittstelle zur Zcash-Blockchain bereitstellt“. [Zaino](/zcash-tech/zaino) ist der neuere Indexer, in Rust geschrieben, und liest von einem vollständigen Validator, statt eine eigene Kopie der Blockchain zu führen.

Die Dokumentation zum [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) behandelt das Protokoll selbst. Die Seite [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) erklärt, was diese Server über einen Nutzer sehen können und was nicht. Das sollte man verstehen, bevor man einen auswählt.

## Eine Wallet entwickeln

Die meiste Wallet-Arbeit findet in den Rust-Crates unter [librustzcash](https://github.com/zcash/librustzcash) statt, auf denen die mobilen SDKs und mehrere Desktop-Wallets aufbauen. Jede Crate ist auf [docs.rs](https://docs.rs) dokumentiert.

| Crate | Wofür sie gedacht ist |
|:--|:--|
| zcash_client_backend | „APIs zum Erstellen abgeschirmter Zcash-Light-Clients“, einschließlich Synchronisierung und Transaktionserstellung |
| zcash_client_sqlite | „Ein SQLite-basierter Zcash-Light-Client“, die Speicherschicht für das Obige |
| zcash_keys | „Zcash-Schlüssel- und Adressverwaltung“ |
| zcash_primitives | „Rust-Implementierungen der Zcash-Primitiven“ |
| zcash_protocol | „Zcash-Protokollnetzwerkkonstanten und Werttypen“ |
| orchard | „Das abgeschirmte Orchard-Transaktionsprotokoll“ |
| sapling-crypto | „Kryptografische Bibliothek für Zcash Sapling“ |
| pczt | „Werkzeuge für die Arbeit mit teilweise erstellten Zcash-Transaktionen“, verwendet für Hardware- und Signierung über mehrere Geräte |
| zip321 | Zahlungsanfrage-URIs, wie in ZIP 321 spezifiziert |

Für Mobilgeräte umschließen das [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) und das [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) diese Bibliotheken. Das iOS-Repository hieß zuvor ZcashLightClientKit, daher verwenden ältere Links und Artikel diesen Namen.

## Spezifikation und Kryptografie

Die [Protokollspezifikation](https://zips.z.cash/protocol/protocol.pdf) ist die maßgebliche Quelle dafür, wie Zcash funktioniert, einschließlich [Adress- und Schlüsselkodierungen](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) sind der Ort, an dem Änderungen vorgeschlagen und spezifiziert werden, und der Index zeigt, welche Entwürfe und welche final sind. Konsensänderungen werden in Netzwerk-Upgrades veröffentlicht, und ZecHub verfolgt diese auf der Seite [Netzwerk-Upgrades](/start-here/network-upgrades).

Für die zugrunde liegende Kryptografie lies [Das halo2 Book](https://zcash.github.io/halo2/index.html) und [Das Orchard Book](https://zcash.github.io/orchard/), zusammen mit den Crate-Dokumentationen für [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) und [orchard](https://docs.rs/orchard/latest/orchard/). [Das FROST Book](https://frost.zfnd.org/) behandelt Schwellenwertsignaturen, und ZecHub hat eine Seite zu [FROST](/zcash-tech/frost).

## Testnet

Testnet ist eine separate Blockchain mit wertlosen Coins, die TAZ genannt werden. Sowohl Zebra als auch Zakura können damit betrieben werden, und die [Testnet-Anleitung](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) behandelt die Knoten-Konfiguration.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) ist ein funktionierender Testnet-Block-Explorer, mit einem Mainnet-Gegenstück unter [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

TAZ zu erhalten, ist der umständliche Teil. Öffentliche Faucets erscheinen und verschwinden wieder, und die in älterer Dokumentation verlinkten reagierten nicht, als diese Seite geschrieben wurde. Der verlässliche Weg ist, im Zcash-R&D-Discord zu fragen, was auch die Zcash-Dokumentation selbst empfiehlt.

## Allgemeine Dokumentation

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) ist weiterhin die umfassendste einzelne Quelle und behandelt Protokollkonzepte, Integration und Mining. Lies sie mit etwas Vorsicht. Sie ist gegen zcashd versioniert, daher beschreiben Teile davon einen Knoten, der nicht mehr läuft, während die Abschnitte zum Protokoll und zu Light Clients weiterhin nützlich sind. [Das Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), das dort verfügbar ist, sollte man lesen, bevor man etwas entwickelt, das die Privatsphäre von Nutzern berührt.

Wenn du allgemein neu bei Blockchains bist, ist [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) die übliche Empfehlung für die gemeinsamen Grundlagen und kann kostenlos vollständig gelesen werden. Es behandelt keine abgeschirmten Transaktionen.

## Weitere von Entwicklern erwähnte Werkzeuge

[Arti](https://docs.rs/arti/latest/arti/) ist die Rust-Implementierung von Tor und wird von zcash_client_backend verwendet, um Wallet-Traffic weiterzuleiten. [Tailscale](https://github.com/tailscale/tailscale) wird häufig für die Verbindung zu einem selbst betriebenen Knoten erwähnt. [warp2](https://github.com/hhanh00/warp2) ist eine schnelle Synchronisierungsimplementierung von Hanh, wurde jedoch seit 2023 nicht aktualisiert.

## Community und Veranstaltungen

Im [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) werden Protokoll- und Wallet-Entwicklung diskutiert, und das [Zcash Community Forum](https://forum.zcashcommunity.com/) enthält ausführlichere Vorschläge und Support-Threads.

Aktuelle Hackathon-Ergebnisse vermitteln ein gutes Bild davon, was Menschen entwickeln: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) und der [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Eingestellte Ressourcen

Sie werden beibehalten, weil ältere Artikel darauf verlinken und weil sie weiterhin die Referenz für das Verhalten des eingestellten Knotens sind. Beginne nicht hier.

[Das Zcashd Book](https://zcash.github.io/zcash/) und die [zcashd-RPC-Referenz](https://zcash.github.io/rpc/) dokumentieren Software, die im Juli 2026 ihr [End-of-Life](https://zcash.github.io/zcash/user/end-of-life.html) erreichte. Das Repository [zcash/zcash](https://github.com/zcash/zcash) ist archiviert.

Wenn du eine Ressource hinzufügen möchtest oder etwas hier veraltet ist, eröffne ein Issue oder einen Pull Request. Teams haben nicht immer die Kapazität, alles aktuell zu halten, und ein Hinweis darauf, worauf du gestoßen bist, hilft dabei, die Anleitungen gezielt weiterzuentwickeln.

**Zuletzt aktualisiert:** August 2026
