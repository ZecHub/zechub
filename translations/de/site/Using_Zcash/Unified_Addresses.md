<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Unified Addresses

> Eine Adresse für ganz Zcash. Teile sie, und die Wallet des Senders findet den privatesten Weg, dir zu zahlen.

## TL;DR

* Eine Unified Address (UA) ist eine Zcash-Adresse, die mehrere Receiver enthält: Ironwood, Sapling und transparent.
* Mainnet-UAs beginnen mit `u1`. ZIP 316 definierte sie, und sie wurden mit dem NU5-Upgrade am 31. Mai 2022 eingeführt.
* Die Wallet des Senders wählt den privatesten Pool, den beide Wallets unterstützen. Du wählst nie selbst einen Pool.
* Deine UA funktionierte weiterhin, als der Ironwood-Pool im Juli 2026 live ging. Du musstest keine neue Adresse teilen.
* Deine Wallet kann für jeden Sender eine neue UA erstellen, und alle zahlen auf dasselbe Konto ein.

## Grunderklärung

Eine Unified Address (UA) ist eine einzelne Zcash-Adresse, die mehrere Receiver in einer Adresse bündelt. Receiver sind die Teile einer Adresse, die Gelder in einem bestimmten Value Pool annehmen: Ironwood, Sapling und transparent. Eine UA beginnt im Mainnet mit `u1` und wurde in [ZIP 316](https://zips.z.cash/zip-0316) definiert, das mit dem NU5-Netzwerkupgrade am 31. Mai 2022 eingeführt wurde.

Vor Unified Addresses bedeutete der Empfang von ZEC, über Adresstypen nachzudenken. Eine `zs`-Adresse nahm Sapling-Gelder an, eine `t`-Adresse nahm transparente Gelder an, und das Senden zwischen den Typen erforderte zusätzliche Schritte. Eine UA beendet das. Du teilst eine Adresse, und die Wallets erledigen den Rest.

### So funktioniert es

Wenn jemand an deine UA sendet, liest dessen Wallet die darin enthaltenen Receiver und wählt den privatesten Pool, den beide Wallets unterstützen:

1. Wenn beide Wallets den aktuellen abgeschirmten Pool unterstützen, kommt die Zahlung abgeschirmt an. Nichts Öffentliches berührt die Chain.
2. Wenn der Sender nur aus einem älteren Pool senden kann, fällt die Wallet auf den besten Receiver zurück, den ihr beide teilt, etwa Sapling.
3. Wenn der Sender nur transparente Gelder senden kann, landet die Zahlung im transparenten Receiver deiner UA, und deine Wallet kann sie von dort abschirmen.

Du verwaltest das nie selbst. Die Adresse bleibt gleich; die Weiterleitung geschieht innerhalb von ihr.

### Warum das jetzt wichtig ist

Zcash wird laufend weiterentwickelt. Als der Ironwood-Pool mit NU6.3 am 28. Juli 2026 aktiviert wurde, brauchten UA-Inhaber keine neue Adresse: Wallets begannen einfach, den Ironwood-Receiver innerhalb ihrer bereits vorhandenen Adressen auszuwählen. Nutzer mit älteren eigenständigen Adressen mussten migrieren. UA-Inhaber mussten nichts tun.

Das ist das Designziel. Neue Pools kommen mit zukünftigen Netzwerkupgrades, und eine Unified Address nimmt sie auf, ohne dass jemand Adressen erneut teilen oder Gelder manuell verschieben muss. Siehe [Zcash Value Pools](/using-zcash/shielded-pools) für die aktuelle Poolübersicht.

### Eine frische Adresse für jeden Sender

Wallets können viele diversifizierte Unified Addresses für ein Konto erzeugen. Jede zahlt auf dieselben Gelder ein, aber keine zwei davon können on-chain miteinander verknüpft werden. Gib jeder Person oder jedem Dienst, die bzw. der dir zahlt, eine andere UA, und kein Paar kann Adressen vergleichen, um herauszufinden, dass sie an dieselbe Wallet zahlen.

## Visualisierung / Analogie

Stell dir eine Haustür mit drei Briefschlitzen vor. Der neueste Schlitz lässt Briefe in einen verschlossenen Safe fallen (Ironwood). Der zweite legt sie in eine verschlossene Schublade (Sapling). Der dritte legt sie auf ein offenes Tablett, das jeder durch das Fenster lesen kann (transparent).

Der Briefträger ist die Wallet des Senders. Sie nutzt den privatesten Schlitz, durch den sie passt. Du gibst eine Adresse für die Tür weiter, und wenn das Haus einen neuen Safe bekommt, bleibt die Adresse an der Tür gleich.

## Vertiefung

### Verwandte Werkzeuge

- **Viewing Keys.** Jedes Konto besitzt Unified Viewing Keys, die zeigen, was eine UA empfängt (oder alles, was sie sendet), ohne Ausgabeberechtigung zu teilen. Präfixe `uview` und `uivk`. Siehe [Viewing Keys](/zcash-tech/viewing-keys).
- **TEX-Adressen.** Einige Börsen, derzeit Binance, verlangen, dass Einzahlungen aus einer transparenten Quelle eintreffen. Eine TEX-Adresse ([ZIP 320](https://zips.z.cash/zip-0320)) ist genau für diesen Fall ein rein transparenter Begleiter deiner UA. Siehe [transparente Börsenadressen](/using-zcash/transparent-exchange-addresses).
- **Zahlungsanfragen.** Eine UA kann in eine URI für eine Zahlungsanfrage eingebettet werden, bei der Betrag und Memo vorausgefüllt sind. Siehe [URIs für Zahlungsanfragen](/using-zcash/payment-request-uris).

### Schnelle Fakten

| | |
|---|---|
| Präfix | `u1` (Mainnet) |
| Kodierung | bech32m |
| Definiert in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Eingeführt | NU5, 31. Mai 2022 |
| Enthält | Ironwood-, Sapling- und transparente Receiver |
| Spending Key | Einer pro Konto, geteilt von allen seinen UAs |

Prüfe auf der Seite [Wallets](/wallets), welche Wallets Unified Addresses unterstützen.

## Häufige Fehler

- **Eine alte `zs`- oder `t`-Adresse teilen.** Eine eigenständige Adresse erreicht nur einen Pool und übernimmt keine neuen. Teile deine UA.
- **Dieselbe UA allen geben.** Zwei Personen, die dir zahlen, können sich austauschen und dieselbe Adresse sehen. Gib jedem Sender eine frische UA aus deiner Wallet.
- **Erwarten, dass jede Zahlung an eine UA privat ist.** Ein Sender, der nur transparente Gelder senden kann, zahlt in deinen transparenten Receiver, und diese Zahlung ist öffentlich. Schirme sie anschließend über deine Wallet ab.

## Verwandte Seiten

- [Abgeschirmte Pools](/using-zcash/shielded-pools): die Value Pools hinter jedem Receiver in einer UA.
- [Unified Addresses (technisch)](/zcash-tech/unified-addresses): wie ZIP 316 eine UA erstellt und kodiert.
- [Viewing Keys](/zcash-tech/viewing-keys): teile, was eine UA empfängt, ohne Ausgabeberechtigung zu teilen.
- [Transparente Börsenadressen](/using-zcash/transparent-exchange-addresses): das TEX-Format für Börsen, die eine transparente Quelle benötigen.
- [URIs für Zahlungsanfragen](/using-zcash/payment-request-uris): eine UA mit ausgefülltem Betrag und Memo.
- [Wallets](/using-zcash/wallets): welche Wallets Unified Addresses erstellen und an sie zahlen.
- [Non-Custodial Exchanges](/using-zcash/non-custodial-exchanges): was zu prüfen ist, wenn ein Swap ZEC in deine Wallet zahlt.
- [Wer kann deine Zcash-Zahlung sehen?](/start-here/who-can-see-your-zcash-payment): was sichtbar bleibt, wenn eine Zahlung jeden Receiver nutzt.

**Zuletzt aktualisiert:** Oktober 2026
