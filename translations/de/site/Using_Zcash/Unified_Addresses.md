<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Unified Addresses

> Eine Adresse für ganz Zcash. Teile sie, und die Wallet des Senders findet den privatesten Weg, dir zu zahlen.

Eine Unified Address (UA) ist eine einzelne Zcash-Adresse, die mehrere Receiver in einer bündelt. Receiver sind die Teile einer Adresse, die Mittel in einem bestimmten Value Pool entgegennehmen: Ironwood, Sapling und transparent. Eine UA beginnt im Mainnet mit `u1` und wurde in [ZIP 316](https://zips.z.cash/zip-0316) definiert sowie mit dem Netzwerk-Upgrade NU5 am 31. Mai 2022 eingeführt.

Vor Unified Addresses bedeutete der Empfang von ZEC, über Adresstypen nachzudenken. Eine `zs`-Adresse nahm Sapling-Mittel entgegen, eine `t`-Adresse nahm transparente Mittel entgegen, und das Senden zwischen Typen erforderte zusätzliche Schritte. Eine UA beendet das. Du teilst eine Adresse, und die Wallets erledigen den Rest.

## So funktioniert es

Wenn jemand an deine UA sendet, liest seine Wallet die darin enthaltenen Receiver und wählt den privatesten Pool, den beide Wallets unterstützen:

1. Wenn beide Wallets den aktuellen abgeschirmten Pool unterstützen, kommt die Zahlung abgeschirmt an. Nichts Öffentliches berührt die Chain.
2. Wenn der Sender nur aus einem älteren Pool senden kann, greift die Wallet auf den besten Receiver zurück, den ihr beide teilt, etwa Sapling.
3. Wenn der Sender nur transparente Mittel senden kann, landet die Zahlung im transparenten Receiver deiner UA, und deine Wallet kann sie von dort abschirmen.

Du verwaltest das nie selbst. Die Adresse bleibt gleich; die Weiterleitung geschieht innerhalb von ihr.

## Warum das jetzt wichtig ist

Zcash wird fortlaufend weiterentwickelt. Als der Pool Ironwood mit NU6.3 am 28. Juli 2026 aktiviert wurde, benötigten UA-Inhaber keine neue Adresse: Wallets begannen einfach, den Receiver Ironwood innerhalb der Adressen auszuwählen, die Menschen bereits hatten. Nutzer mit älteren eigenständigen Adressen mussten migrieren. UA-Inhaber mussten nichts tun.

Das ist das Designziel. Neue Pools kommen mit zukünftigen Netzwerk-Upgrades, und eine Unified Address nimmt sie auf, ohne dass jemand Adressen erneut teilen oder Mittel manuell verschieben muss. Siehe [Zcash Value Pools](/using-zcash/shielded-pools) für die aktuelle Pool-Übersicht.

## Eine neue Adresse für jeden Sender

Wallets können viele diversifizierte Unified Addresses für ein Konto erzeugen. Jede von ihnen zahlt in dieselben Mittel ein, doch keine zwei können on-chain miteinander verknüpft werden. Gib jeder Person oder jedem Dienst, die beziehungsweise der dir zahlt, eine andere UA, und kein Paar davon kann Adressen vergleichen, um zu erfahren, dass sie an dieselbe Wallet zahlen.

## Verwandte Werkzeuge

- **Viewing Keys.** Jedes Konto hat Unified Viewing Keys, die zeigen, was eine UA empfängt (oder alles, was sie sendet), ohne die Ausgabeberechtigung weiterzugeben. Präfixe `uview` und `uivk`. Siehe [Viewing Keys](/zcash-tech/viewing-keys).
- **TEX-Adressen.** Einige Börsen, derzeit Binance, verlangen, dass Einzahlungen von einer transparenten Quelle eintreffen. Eine TEX-Adresse ([ZIP 320](https://zips.z.cash/zip-0320)) ist ein ausschließlich transparenter Begleiter deiner UA für genau diesen Fall. Siehe [Transparente Exchange-Adressen](/using-zcash/transparent-exchange-addresses).
- **Zahlungsanfragen.** Eine UA kann mit einem vorausgefüllten Betrag und Memo in eine Zahlungsanfrage-URI eingebettet werden. Siehe [Zahlungsanfrage-URIs](/using-zcash/payment-request-uris).

## Kurze Fakten

| | |
|---|---|
| Präfix | `u1` (Mainnet) |
| Kodierung | bech32m |
| Definiert in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Eingeführt | NU5, 31. Mai 2022 |
| Enthält | Ironwood, Sapling und transparente Receiver |
| Spending Key | Einer pro Konto, geteilt von allen dessen UAs |

Prüfe auf der Seite [Wallets](/wallets), welche Wallets Unified Addresses unterstützen.
