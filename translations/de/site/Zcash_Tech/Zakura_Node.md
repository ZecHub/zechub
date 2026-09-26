<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zakura Knoten

> 🇧🇷 [Version auf Portugiesisch](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura ist eine kostenlose, quelloffene Full-Knoten-Implementierung für Zcash, die auf Skalierung ausgelegt ist. Als Fork von [Zebra](Zebra_Full_Node.md) und entwickelt durch eine Zusammenarbeit zwischen **Valar Group** und **Project Tachyon** bietet Zakura eine drastisch schnellere Synchronisierung, natives Block-Pruning und eine Kompatibilitätsschicht für ältere `zcashd`-Werkzeuge. Version 1.0.0 wurde am 15. Juli 2026 veröffentlicht.

---

## Kurzfassung

- Zakura ist ein **konsenskompatibler Zcash-Full-Knoten** — eine Alternative zu Zebra und zcashd, geforkt von Zebra.
- Die Blockchain-Synchronisierung ist ungefähr **5× schneller als bei Zebra**; das Bootstrapping per Snapshot ist in **unter 2 Minuten** abgeschlossen.
- **Natives Block-Pruning** ermöglicht es Betreibern, einen Full-Knoten mit deutlich weniger Speicherplatz zu betreiben (~11 GB für einen geprunten Snapshot gegenüber 300 GB für einen vollständigen Zebra-Knoten).
- Ein **zcashd-RPC-Kompatibilitätsmodus** ermöglicht es bestehenden Wallets und Integrationen, ohne Änderungen weiterzuarbeiten.
- Eine **experimentelle P2P-Transportschicht** (standardmäßig deaktiviert) zielt auf eine Block-Propagation von unter 500 ms mit DoS-resistentem Gossip ab.
- Kompatibel mit **Ironwood (NU6.3)**, dem Zcash-Netzwerkupgrade, das Mitte 2026 aktiviert wurde.
- **Zakura Common** (v1.3.0, August 2026) beschleunigt die Kryptografie, die Wallets zum Erstellen privater Transaktionen verwenden: von über 3 Sekunden auf unter 200 ms in vielen Fällen, laut den Benchmarks von Zakura.
- Geleitet von **Sean Bowe** (Mitgründer von Zcash, Project Tachyon) und **Dev Ojha** (Valar Group).

---

## Was ist Zakura?

Zakura ist ein Zcash-Full-Knoten, der von Grund auf für den produktiven Einsatz im großen Maßstab entwickelt wurde. Obwohl er die Konsenskompatibilität mit Zebra teilt — das heißt, er validiert und befolgt dieselben Zcash-Protokollregeln — führt Zakura wesentliche technische Verbesserungen ein, die darauf abzielen, die Hürde für den Betrieb eines Zcash-Full-Knotens zu senken.

Das Projekt ist eine gemeinsame Initiative von **Project Tachyon** (geleitet von Sean Bowe, einem der ursprünglichen Kryptografie-Ingenieure von Zcash) und **Valar Group** (geleitet von Dev Ojha). Gemeinsam konzentrieren sie sich auf Zcash-Protokollverbesserungen der nächsten Generation, und Zakura dient als Referenz-Knoten für diese Arbeit.

---

## Hauptmerkmale

### 5× Schnellere Chain-Synchronisierung

Zakura erreicht im Vergleich zu Zebra eine ungefähr 5× schnellere Blockchain-Synchronisierung. Das macht ihn deutlich praktischer für Betreiber, die schnell einen Knoten starten oder sich von Ausfallzeiten erholen müssen.

### Snapshot-Bootstrapping

Zakura veröffentlicht vorgefertigte Chain-Snapshots, die die anfängliche Synchronisierungszeit drastisch verkürzen:

| Bootstrap-Methode | Zeit |
|------------------|------|
| Archiv-Snapshot | ~37 Minuten |
| Geprunter Snapshot | **Unter 2 Minuten** |
| Zebra (vollständige Synchronisierung) | ~20 Stunden |

Geprunte Snapshots sind ungefähr **11 GB** groß und ermöglichen ein **680× schnelleres** Knoten-Bootstrapping im Vergleich zur Synchronisierung ab Genesis.

### Natives Block-Pruning

Zakura unterstützt konfigurierbares Block-Pruning, sodass Knotenbetreiber festlegen können, wie viel Chain-Verlauf sie aufbewahren möchten. Dadurch wird es praktikabel, einen Full-Knoten auf Hardware mit begrenztem Speicher zu betreiben — nützlich für Validatoren, Entwickler und Infrastrukturanbieter, die nicht die vollständige historische Chain benötigen.

### zcashd RPC-Kompatibilitätsmodus

Zakura enthält einen Kompatibilitätsmodus, der die ältere `zcashd`-JSON-RPC-Schnittstelle nachbildet. Bestehende Wallets, Börsen und Integrationen, die auf `zcashd`-RPCs angewiesen sind, können ohne Codeänderungen auf Zakura umsteigen.

### Experimentelle P2P-Transportschicht

Zakura wird mit einer Peer-to-Peer-Transportschicht der nächsten Generation ausgeliefert, die derzeit **standardmäßig deaktiviert** ist. Wenn sie aktiviert wird, zielt sie auf Folgendes ab:

- Block-Propagation im Worst-Case von unter 500 ms im gesamten Netzwerk
- Mempool-Aggregation für eine effizientere Weiterleitung von Transaktionen
- DoS-resistentes Gossip-Protokoll zur Verbesserung der Netzwerkresilienz

Diese Schicht stellt eine Vorschau auf zukünftige Verbesserungen auf Zcash-Netzwerkebene dar, die im Rahmen von Project Tachyon entwickelt werden.

### Kompatibel mit Ironwood (NU6.3)

Zakura ist vollständig kompatibel mit dem Ironwood-Netzwerkupgrade (NU6.3), das Mitte 2026 im Zcash-Mainnet aktiviert wurde.

---

## Zakura Common: Schnellere Wallet-Kryptografie

Im August 2026 veröffentlichte das Team von Zakura Zakura Common, eine Reihe beschleunigter Forks der Kryptografiebibliotheken, auf die Zcash-Wallets und Knoten angewiesen sind. Zakura wechselte in Version 1.3.0 auf den neuen Stack, und Vizor Wallet gehört zu den ersten Wallets, die ihn integrieren.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Laut den eigenen Benchmarks von Zakura:

| Vorgang | Beschleunigung |
|--|--|
| Proof-Erstellung auf Mobilgeräten | mehr als 14× (Desktop: mehr als 5×) |
| Sinsemilla-Hashing | mehr als 21× |
| zk-SNARK-Verifizierung | 4–8× |
| Testentschlüsselung | mehr als 1,5× |

Für Nutzer ist die sichtbarste Veränderung die Wartezeit. Das Erstellen einer privaten Transaktion dauerte für ein wallet früher mehr als drei Sekunden. Mit Zakura Common kann es in vielen Fällen weniger als 200 ms dauern. Das ist die Zeit, die dein Gerät für die Vorbereitung der Transaktion benötigt, nicht die Zeit, die das Netzwerk für ihre Bestätigung braucht.

Bitte sende den neuen englischen Block.

## Wie Zakura mit anderen Zcash-Knoten zusammenhängt

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Sprache | C++ (von Bitcoin geforkt) | Rust | Rust (von Zebra geforkt) |
| Status | Veraltet | Aktiv | Aktiv (v1.0.0, Juli 2026) |
| Synchronisierungsgeschwindigkeit | Basiswert | ~1× | ~5× schneller |
| Block-Pruning | Nein | Nein | Ja |
| zcashd-RPC-Kompatibilität | Nativ | Teilweise | Ja (Kompatibilitätsmodus) |
| Snapshot-Bootstrap | Nein | Nein | Ja (weniger als 2 Min) |
| Experimentelles P2P | Nein | Nein | Ja (optional) |

---

## Erste Schritte

Download-Optionen, Snapshots und Konfigurationsdokumentation sind verfügbar unter:

- **Download- & Einrichtungsanleitung:** [zakura.com/download](https://zakura.com/download/)
- **Chain-Snapshots:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Quellcode:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Verwandte Seiten

- [Zebra Full Node](Zebra_Full_Node.md) — der Upstream-Zcash-Full-Knoten, von dem Zakura geforkt wurde
- [Zaino Indexer](Zaino.md) — ein Rust-basierter Indexer, der mit Zebra und Zakura kompatibel ist
- [Full-Knoten](Full_Nodes.md) — Überblick über Zcash-Full-Knoten-Optionen
- [Lightwallet-Knoten](Lightwallet_Nodes.md) — leichtgewichtige Client-Alternativen

## Ressourcen

- [Vorstellung von Zakura — Ankündigung](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Website](https://zakura.com/)
- [Zakura auf X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Gemeinsame Ankündigung](https://zakura.com/announcements/zakura-common/)
