<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Entwicklerressourcen

Die Ressourcen, die du benötigst, um auf Zcash aufzubauen, nach ihrem jeweiligen Zweck gruppiert, statt sie in einem einzigen Haufen aufzulisten.

Der Stack hat sich 2026 stark verändert. zcashd, das den Großteil seiner Geschichte lang das Netzwerk betrieb, erreichte am 18. Juli 2026 bei Blockhöhe 3417100 sein End-of-Life, und jeder unveränderte Knoten wurde bei dieser Höhe heruntergefahren und verweigert einen Neustart. Anleitungen für zcashd sind nun Geschichte statt Ausgangspunkt, daher ist diese Seite nach den Lösungen organisiert, die es ersetzt haben.

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

Ein Knoten validiert den Konsens und speichert die Chain. Es gibt zwei aktiv entwickelte Implementierungen.

[Zebra](/zcash-tech/zebra-full-node) ist der Knoten der Zcash Foundation, in Rust geschrieben, und derjenige, von dem die meisten Anleitungen mittlerweile ausgehen. [Das Zebra Book](https://zebra.zfnd.org/) behandelt Installation und Betrieb, und im [Repository](https://github.com/ZcashFoundation/zebra) findet die Entwicklung statt.

[Zakura](/zcash-tech/zakura-node) ist ein neuerer Knoten, der von seinen Autoren als „konsenskompatibler Zcash-Vollknoten, für Skalierung entwickelt“ beschrieben wird, mit schnellerer Synchronisierung, Block-Pruning und einem zcashd-Kompatibilitätsmodus. Er wird von Sean Bowe, einem Zcash-Mitgründer, und Dev Ojha geleitet. Er ist unter Apache 2.0 als Open Source bei [zakura-core/zakura](https://github.com/zakura-core/zakura) verfügbar.

ZecHub hat eine Seite zu [vollständigen Knoten](/zcash-tech/full-nodes), die die Abwägungen zwischen ihnen behandelt.

## Das Wallet für vollständige Knoten

zcashd bündelte ein Wallet mit dem Knoten. Dieses Wallet gibt es nicht mehr, und [Zallet](https://github.com/zcash/zallet) ist der Ersatz. Das Zallet Book beschreibt es als „ein in Rust geschriebenes Zcash-Wallet für vollständige Knoten“, das „als Ersatz für das zcashd-Wallet entwickelt“ wird.

Lies den Sicherheitshinweis, bevor du dich darauf verlässt. Zallet befindet sich in Beta, wurde „nicht vollständig geprüft“, grundlegende Änderungen können „jederzeit auftreten und erfordern, dass du dein Zallet-Wallet löschst und neu erstellst“, und noch nicht jede zcashd-RPC-Methode wurde portiert.

Wenn du eine bestehende Einrichtung umstellst, bietet ZecHub eine [Migrationsanleitung von zcashd zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) und eine [Zallet-Kurzreferenz](/using-zcash/zallet-quick-reference-guide).

## Light-Wallet-Server

Die meisten Wallets betreiben keinen Knoten. Sie kommunizieren mit einem Server, der die Chain vorhält und eine kompakte Ansicht davon zurückgibt.

[lightwalletd](https://github.com/zcash/lightwalletd) ist der ursprüngliche Dienst, in Go geschrieben und beschrieben als „Backend-Dienst, der eine bandbreiteneffiziente Schnittstelle zur Zcash-Blockchain bereitstellt“. [Zaino](/zcash-tech/zaino) ist der neuere Indexer, in Rust geschrieben, und liest von einem vollständigen Validator, anstatt eine eigene Kopie der Chain zu führen.

Die Dokumentation zum [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) behandelt das Protokoll selbst. Die Seite [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) erläutert, was diese Server über einen Benutzer sehen können und was nicht – was du verstehen solltest, bevor du einen auswählst.

## Ein Wallet entwickeln

Der Großteil der Wallet-Arbeit findet in den Rust-Crates unter [librustzcash](https://github.com/zcash/librustzcash) statt, auf denen die mobilen SDKs und mehrere Desktop-Wallets aufbauen. Jede Crate ist auf [docs.rs](https://docs.rs) dokumentiert.

| Crate | Wofür sie gedacht ist |
|:--|:--|
| zcash_client_backend | „APIs zum Erstellen abgeschirmter Zcash-Light-Clients“, einschließlich Synchronisierung und Transaktionserstellung |
| zcash_client_sqlite | „Ein SQLite-basierter Zcash-Light-Client“, die Speicherschicht für das Obige |
| zcash_keys | „Zcash-Schlüssel- und Adressverwaltung“ |
| zcash_primitives | „Rust-Implementierungen der Zcash-Primitiven“ |
| zcash_protocol | „Zcash-Protokollnetzwerkkonstanten und Werttypen“ |
| orchard | „Das abgeschirmte Orchard-Transaktionsprotokoll“ |
| sapling-crypto | „Kryptografische Bibliothek für Zcash Sapling“ |
| pczt | „Werkzeuge für die Arbeit mit teilweise erstellten Zcash-Transaktionen“, für Hardware- und geräteübergreifende Signaturen verwendet |
| zip321 | Zahlungsanforderungs-URIs gemäß ZIP 321 |

Für Mobilgeräte kapseln das [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) und das [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) diese Bibliotheken. Das iOS-Repository hieß zuvor ZcashLightClientKit, daher verwenden ältere Links und Artikel diesen Namen.

## Spezifikation und Kryptografie

Die [Protokollspezifikation](https://zips.z.cash/protocol/protocol.pdf) ist die maßgebliche Quelle dafür, wie Zcash funktioniert, einschließlich [Adress- und Schlüsselkodierungen](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) sind der Ort, an dem Änderungen vorgeschlagen und spezifiziert werden, und der Index zeigt, welche Entwürfe und welche final sind. Konsensänderungen werden in Netzwerk-Upgrades bereitgestellt, und ZecHub verfolgt diese auf der Seite [Netzwerk-Upgrades](/start-here/network-upgrades).

Zur zugrunde liegenden Kryptografie lies [Das halo2 Book](https://zcash.github.io/halo2/index.html) und [Das Orchard Book](https://zcash.github.io/orchard/), zusammen mit den Crate-Dokumentationen für [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) und [orchard](https://docs.rs/orchard/latest/orchard/). [Das FROST Book](https://frost.zfnd.org/) behandelt Threshold-Signaturen, und ZecHub hat eine [FROST](/zcash-tech/frost)-Seite.

## Testnet

Testnet ist eine separate Chain mit wertlosen Coins namens TAZ. Sowohl Zebra als auch Zakura können damit betrieben werden, und die [Testnet-Anleitung](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) behandelt die Knotenkonfiguration.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) ist ein funktionierender Testnet-Block-Explorer mit einem Mainnet-Gegenstück unter [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

TAZ zu erhalten, ist der umständliche Teil, da die in älterer Dokumentation verlinkten Faucets nicht mehr antworten. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) ist ein von der Community betriebener Faucet, der „einen eigenen Knoten, wallet und Miner“ betreibt, „shielded z2z drips“ auszahlt und Auszahlungen mit „Browser-Proof-of-Work statt einem Captcha-Anbieter“ absichert. Er ist unter der MIT-Lizenz Open Source. Falls er nicht verfügbar ist, frage im Zcash-R&D-Discord, was auch die Zcash-Dokumentation selbst vorschlägt.

## Allgemeine Dokumentation

[Zcash-Dokumentation](https://zcash.readthedocs.io/en/latest/) ist weiterhin die umfassendste einzelne Quelle und behandelt Protokollkonzepte, Integration und Mining. Lies sie mit etwas Vorsicht. Sie ist auf zcashd versioniert, sodass Teile davon einen Knoten beschreiben, der nicht mehr läuft, während die Abschnitte zum Protokoll und zu Light Clients weiterhin nützlich sind. Das dort verfügbare [Bedrohungsmodell der Zcash Wallet App](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) ist lesenswert, bevor du etwas entwickelst, das die Privatsphäre von Benutzern berührt.

Wenn du bei Blockchains im Allgemeinen neu bist, ist [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) die übliche Empfehlung für die gemeinsamen Grundlagen und kann kostenlos vollständig gelesen werden. Abgeschirmte Transaktionen werden darin nicht behandelt.

## Andere Tools, die Entwickler erwähnt haben

[Arti](https://docs.rs/arti/latest/arti/) ist die Rust-Implementierung von Tor und wird von zcash_client_backend verwendet, um Wallet-Traffic weiterzuleiten. [Tailscale](https://github.com/tailscale/tailscale) wird für die Verbindung mit einem selbst betriebenen Knoten erwähnt. [warp2](https://github.com/hhanh00/warp2) ist eine schnelle Synchronisierungsimplementierung von Hanh, wurde jedoch seit 2023 nicht aktualisiert.

## Community und Veranstaltungen

Im [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) werden Protokoll- und Wallet-Entwicklung diskutiert, und im [Zcash Community Forum](https://forum.zcashcommunity.com/) finden sich längere Vorschläge und Support-Threads.

Aktuelle Hackathon-Ergebnisse geben ein gutes Bild davon, was Menschen entwickeln: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) und der [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Eingestellte Ressourcen

Sie werden beibehalten, weil ältere Artikel auf sie verlinken und weil sie weiterhin die Referenz dafür sind, wie sich der eingestellte Knoten verhielt. Beginne nicht hier.

[Das Zcashd Book](https://zcash.github.io/zcash/) und die [zcashd-RPC-Referenz](https://zcash.github.io/rpc/) dokumentieren Software, die im Juli 2026 ihr [End-of-Life](https://zcash.github.io/zcash/user/end-of-life.html) erreichte. Das Repository [zcash/zcash](https://github.com/zcash/zcash) ist archiviert.

Wenn du eine Ressource hinzufügen möchtest oder hier etwas Veraltetes entdeckst, eröffne ein Issue oder einen Pull Request. Teams haben nicht immer die Kapazität, alles aktuell zu halten, und Hinweise darauf, worauf du gestoßen bist, helfen dabei, die Anleitungen gezielt zu verbessern.

**Zuletzt aktualisiert:** August 2026
