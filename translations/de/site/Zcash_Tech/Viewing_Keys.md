<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Shielded-Adressen ermöglichen es dir, Transaktionen durchzuführen und dabei auf der Zcash-Blockchain so wenig wie möglich offenzulegen. Was passiert also, wenn du einer bestimmten Partei *doch* zeigen musst, was du besitzt oder was du gesendet hast? Jede Shielded-Adresse hat einen Viewing Key, der Lesezugriff gewährt, ohne die Möglichkeit zum Ausgeben zu geben. Viewing Keys wurden in [ZIP 310](https://zips.z.cash/zip-0310) eingeführt und dem Protokoll im Sapling-Netzwerkupgrade hinzugefügt.

Ein Viewing Key ist das Werkzeug für selektive Offenlegung: Du entscheidest, wer was sieht, und gibst dabei niemals die Ausgabeberechtigung weiter.

## Warum einen Viewing Key verwenden?

Die Ausführungen der Electric Coin Company zu diesem Thema beschreiben die Situationen, die am häufigsten vorkommen, und das sind auch heute noch die üblichen Fälle:

- **Eine Börse überwacht Einzahlungen.** Die Börse lädt einen Incoming Viewing Key auf einen internetzugänglichen Erkennungs-Knoten, damit sie Kundeneinzahlungen an eine Shielded-Adresse bemerken kann, während der Spending Key auf Hardware verbleibt, die niemals mit dem Netzwerk in Berührung kommt.
- **Ein Verwahrer weist seine Bestände nach.** Der Verwahrer gibt einem Prüfer für jede Shielded-Adresse einen Full Viewing Key. Der Prüfer kann diese Guthaben kontrollieren und vergangene Aktivitäten zu und von diesen Adressen prüfen und nichts weiter tun.
- **Due Diligence bei einer Gegenpartei.** Wenn eine Börse im Rahmen einer erweiterten Due Diligence die Shielded-Historie eines Kunden prüfen muss, kann sie statt der Gelder den Viewing Key anfordern.

## Was ein Viewing Key offenlegt und was nicht

Es gibt mehr als eine Art von Schlüssel, und der Unterschied entscheidet darüber, wie viel du preisgibst.

| Schlüssel | Präfix | Gewährt |
|---|---|---|
| Unified Full Viewing Key (UFVK) | `uview…` | Sieht eingehende **und** ausgehende Transaktionen für jeden Pool im Konto |
| Unified Incoming Viewing Key (UIVK) | `uivk…` | Sieht nur eingehende Transaktionen für jeden Pool im Konto |
| Sapling Extended Full Viewing Key | `zxviews…` | Sieht eingehende und ausgehende Sapling-Aktivität für die Adressen des Schlüssels |

Keiner davon kann Ausgaben tätigen. Alle sind in der entscheidenden Hinsicht dauerhaft: Ein Schlüssel, den du weitergegeben hast, kann nicht zurückgerufen werden, sondern nur überlebt werden, indem du Gelder auf ein Konto verschiebst, dessen Schlüssel die andere Partei nicht besitzt.

Zwei Offenlegungsfallen sollte man kennen, bevor man irgendetwas teilt.

**Incoming bedeutet nicht eng begrenzt.** Ein Unified Incoming Viewing Key ist auf das gesamte Konto bezogen, nicht auf die eine Adresse, nach der gefragt wurde. Das Exportieren eines UIVK für eine einzelne Sapling-Adresse gewährt weiterhin eingehende Sichtbarkeit über jeden Pool in diesem Konto hinweg und legt daher mehr offen als die Adresse, die er benennt. Das [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) sagt dies ausdrücklich.

**Eine veröffentlichte Adresse legt ihren Incoming Viewing Key für einen zukünftigen Angreifer bereits offen.** [ZIP 326](https://zips.z.cash/zip-0326) weist darauf hin, dass ein Angreifer mit einem Quantencomputer den Incoming Viewing Key aus einer veröffentlichten diversifizierten Adresse wiederherstellen könnte, was in einer Weise machbar ist, wie es die Wiederherstellung des Nullifier-Schlüssels nicht ist. Eine Adresse zu veröffentlichen ist heute nicht dasselbe wie einen Viewing Key zu veröffentlichen, aber über einen ausreichend langen Zeithorizont liegen die beiden näher beieinander.

## Viewing Keys nach Ironwood

NU6.3 führte den Ironwood Shielded-Pool ein und machte den Orchard-Pool nur noch für Ausgaben nutzbar, sodass Gelder im Laufe der Zeit vom einen in den anderen migrieren. Siehe [Ironwood](/zcash-tech/ironwood) und [Die Turnstile](/zcash-tech/the-turnstile) für das Upgrade selbst.

**Ein vor Ironwood ausgestellter Viewing Key funktioniert auch nach der Migration weiter.** ZIP 326 legt fest, dass ein Empfänger und sein entsprechender Incoming Viewing Key auf das Orchard-*Protokoll* und nicht auf einen Pool bezogen sind: Derselbe Incoming Viewing Key entschlüsselt probeweise sowohl Notiz-Chiffretexte aus dem Orchard-Pool als auch aus dem Ironwood-Pool. Zallet implementiert es auf diese Weise und beschreibt Ironwood-Notizen als Orchard-förmig und probeweise entschlüsselt mit den Orchard-Viewing-Keys des Kontos unter der Ironwood-Notizverschlüsselungs-Domain.

Drei Folgen für alle, die einen Schlüssel halten oder ausstellen:

1. **Guthaben bewegen sich zwischen Pools, und der Betrachter sieht das geschehen.** [ZIP 318](https://zips.z.cash/zip-0318) legt die Migration als eine Reihe kleiner, absichtlich einheitlicher Orchard-zu-Ironwood-Transaktionen fest, die nach einem randomisierten Zeitplan gesendet werden; jede gibt eine Orchard-Notiz aus und erzeugt einen Ironwood-Output mit einer kanonischen Stückelung. Ein Prüfer, der mit einem Viewing Key zusieht, sieht, wie sich Bestände über Wochen hinweg schrittweise von einem Pool in den anderen verlagern, nicht in einer einzigen Bewegung. Ein Wallet kann seinen eigenen Migrationsfortschritt aus den Chain-Daten mithilfe seiner Viewing Keys rekonstruieren.
2. **Jeder Migrationsschritt legt den Wert offen, den er bewegt.** Das ist dem Überschreiten einer Turnstile inhärent, und genau das macht die Migration prüfbar. Die Aufteilung des Guthabens in kanonische Stückelungen bedeutet, dass keine einzelne Transaktion das gesamte Guthaben des Orchard-Pools offenlegt.
3. **Konten, die nach Ironwood erstellt wurden, können ihre Schlüssel anders ableiten.** [ZIP 2005](https://zips.z.cash/zip-2005) fügt ein `use_qsk`-Flag für quantum-recoverable keys hinzu und ändert, wie Incoming-, Outgoing- und Diversifier-Schlüssel abgeleitet werden, sodass `use_qsk = true`-Schlüssel tatsächlich andere Schlüssel sind. ZIP 326 verlangt, dass das Flag innerhalb eines Kontos einheitlich ist, und verbietet die Erzeugung von `use_qsk = true`-Schlüsseln, bevor NU6.3 im Mainnet aktiviert wurde. Ein aus einem Konto exportierter Schlüssel, das bereits vor Ironwood existierte, ist daher ein `use_qsk = false`-Schlüssel und bleibt für dieses Konto korrekt. Gehe nicht davon aus, dass ein aus einem Konto exportierter Schlüssel ein anderes beschreibt.

## Einen Viewing Key exportieren

### Zallet

[Zallet](https://github.com/zcash/zallet) ist das Full-Node-Wallet, das das Wallet in zcashd ersetzt hat. Der Export und Import von Viewing Keys kam in **v0.1.0-beta.2 (28. Juli 2026)** hinzu, also prüfe zuerst deine Version; frühere Builds haben diese Methoden nicht. Jedes Argument nach dem Methodennamen muss gültiges JSON sein, was bedeutet, dass String-Werte ihre eigenen doppelten Anführungszeichen behalten. Der [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) behandelt den allgemeinen Befehlsstil.

Auflisten, was das Wallet enthält:

```bash
zallet rpc listaddresses
```

Den Unified Full Viewing Key des Kontos exportieren, indem du eine Unified Address übergibst:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Stattdessen den Unified Incoming Viewing Key des Kontos exportieren, mit dem optionalen `ivk`-Argument:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Die Übergabe einer Sapling-Adresse gibt den Sapling Extended Full Viewing Key (`zxviews…`) dieses Kontos zurück, entsprechend dem früheren Verhalten von zcashd. Zwei dokumentierte Einschränkungen: Sprout-Adressen werden abgelehnt, und ein Sapling Extended Full Viewing Key kann nicht aus einem Konto exportiert werden, das selbst als nur-Ansicht importiert wurde, weil das Wallet ihn nicht rekonstruieren kann. Die `ivk`-Form funktioniert dagegen für importierte Nur-Ansicht-Konten.

### Wallets, die Viewing Keys über ihre eigene Oberfläche exportieren

Die Seite [Wallets](/using-zcash/wallets) verfolgt die Unterstützung für Viewing Keys und die Ironwood-Bereitschaft für jedes Wallet. Zum Zeitpunkt des Schreibens gehören zu den Wallets, die sowohl Unterstützung für Viewing Keys als auch **Ironwood: Ready** angeben, ZODL, Zingo!, Zkool, Cake, Zallet, Zecd und Nozy. Prüfe eher diese Seite als diese hier, bevor du dich auf ein einzelnes Wallet verlässt, da sich der Bereitschaftsstatus ändert.

## Einen Viewing Key als Nur-Ansicht-Konto importieren

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ist hier die flexibelste Option, weil es sowohl Unified Keys als auch ältere akzeptiert. Seine README dokumentiert Nur-Ansicht-Konten, die aus einem **Unified Viewing Key** oder einem **Sapling Extended Viewing Key** erstellt werden, zusammen mit älteren Shielded Extended Keys, die aus zcashd exportiert wurden. Füge ein neues Konto hinzu, wähle den Nur-Ansicht-Weg und füge den `uview…`- oder `zxviews…`-Schlüssel ein; das Konto synchronisiert dann und meldet Guthaben und Verlauf ohne Ausgabeberechtigung.

Die Unterstützung des Ironwood-Protokolls und die Orchard-zu-Ironwood-Migration kamen in Zkool 6.24.0 (20. Juli 2026), und 6.26.1 (2. August 2026) behob die Erkennung von Ironwood-Transaktionen im Mempool. Verwende 6.26.1 oder neuer.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Das zweite Argument ist die Rescan-Richtlinie: `"whenkeyisnew"` (die Standardeinstellung), `"yes"` oder `"no"`. Das dritte ist die Blockhöhe, ab der erneut gescannt werden soll. Zallet importiert den Schlüssel als Nur-Ansicht-Konto und verfolgt eingehende und ausgehende Transaktionen für seine Adressen ohne Ausgabeberechtigung.

**Zallet importiert nur Sapling Extended Full Viewing Keys.** Es importiert keinen `uview…` Unified Full Viewing Key, obwohl es einen exportieren kann. Um Lesezugriff auf ein ganzes Unified-Konto zu übergeben, exportiere den UFVK aus Zallet und importiere ihn in ein Wallet, das Unified Keys akzeptiert, etwa Zkool.

## Was sich geändert hat und wonach du nicht mehr suchen solltest

Wenn du einer älteren Version dieser Seite oder einer Übersetzung davon gefolgt bist, funktionieren drei Wege nicht mehr.

- **`zcash-cli z_exportviewingkey` und `z_importviewingkey`.** zcashd erreichte seinen End-of-Support-Stopp am 18. Juli 2026 und läuft nicht mehr. Die gleichnamigen Methoden von Zallet sind der Ersatz; siehe den [Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Die Ywallet-Anleitung.** Die Wallets-Seite markiert Ywallet mit **Ironwood: Not Ready**, daher ist es nicht das Wallet, auf das man Leute für Viewing Keys im Ironwood-Zeitalter verweisen sollte. Zkool vom selben Entwickler akzeptiert dieselbe Bandbreite an Schlüsseln und ist als Ready markiert.
- **zcashblockexplorer.com/vk.** Der Dienst gibt HTTP 503 mit einem ungültigen Zertifikat zurück und wurde fallengelassen statt ersetzt. Einen Viewing Key in eine Website einzufügen gibt deine gesamte Transaktionshistorie an den Betreiber dieser Website weiter, was schon immer die schwächste der drei Optionen auf der alten Seite war. Importiere den Schlüssel stattdessen in ein Wallet, das du selbst betreibst.

## Ressourcen

Verwende Viewing Keys nach Bedarf und bevorzuge den engsten Schlüssel, der die gestellte Frage beantwortet.

- [ZIP 326: Folgen von NU6.3 für Wallets](https://zips.z.cash/zip-0326) — wie sich Viewing Keys über die Orchard- und Ironwood-Pools hinweg verhalten
- [ZIP 229: Transaktionsformat Version 6](https://zips.z.cash/zip-0229) — definiert die Orchard- und Ironwood-Pools
- [Zallet-Änderungsprotokoll](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — welche Version welche RPC-Methode hinzugefügt hat
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — unterstützte Konto- und Schlüsseltypen
- [ECC, Erklärung von Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selektive Offenlegung und Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Videopräsentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
