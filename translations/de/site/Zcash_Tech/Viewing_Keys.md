<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Abgeschirmte Adressen ermöglichen es dir, Transaktionen durchzuführen und dabei so wenig wie möglich auf der Zcash blockchain offenzulegen. Was passiert also, wenn du *doch* einer bestimmten Partei zeigen musst, was du besitzt oder was du gesendet hast? Jede abgeschirmte Adresse verfügt über einen Viewing Key, der Lesezugriff gewährt, ohne die Möglichkeit zum Ausgeben einzuräumen. Viewing Keys wurden in [ZIP 310](https://zips.z.cash/zip-0310) eingeführt und mit dem Sapling-Netzwerkupgrade in das Protokoll aufgenommen.

Ein Viewing Key ist das Werkzeug für selektive Offenlegung: Du entscheidest, wer was sieht, und musst dafür niemals die Ausgabeberechtigung weitergeben.

## Kurz gesagt

Ein Viewing Key gewährt **schreibgeschützten** Zugriff auf die Aktivitäten einer shielded Zcash-Adresse oder eines Kontos: Wer ihn besitzt, kann eingehende (und bei Full Viewing Keys auch ausgehende) Transaktionen sehen, aber niemals Geld ausgeben.

- **Was es ist:** das Werkzeug zur selektiven Offenlegung der abgeschirmten Pools. Eingeführt in [ZIP 310](https://zips.z.cash/zip-0310), wurde es mit dem Netzwerk-Upgrade Sapling zum Protokoll hinzugefügt.
- **Was es ermöglicht:** das Erkennen von Einzahlungen (`uivk…`eingehende Schlüssel) oder vollständige Ein-/Ausgangstransparenz für ein Konto (`uview…`vereinheitlichte vollständige Viewing Keys) sowie ältere Sapling `zxviews…`-Schlüssel.
- **Was es nicht ermöglicht:** Ausgabebefugnis. Nichts, was der Inhaber eines Viewing Keys tut, kann Mittel bewegen.
- **Wo es heute funktioniert:** Export/Import in [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) und reine Beobachtungskonten in Wallets wie Zkool; siehe die Seite [Wallets](/using-zcash/wallets) für die aktuelle Unterstützungsmatrix.
- **Die Faustregel:** Bevorzuge den engsten Schlüssel, der die gestellte Frage beantwortet, und denke daran, dass ein weitergegebener Schlüssel nicht zurückgerufen werden kann — er kann nur durch das Verschieben der Mittel überlebt werden.

---

## Warum einen Viewing Key verwenden?

Die Ausführungen von Electric Coin Company zu diesem Thema beschreiben die am häufigsten auftretenden Situationen, und sie sind auch heute noch die üblichen:

- **Eine Börse überwacht Einzahlungen.** Die Börse lädt einen Incoming Viewing Key auf einen mit dem Internet verbundenen Erkennungs-Knoten, damit sie Kundeneinzahlungen an eine abgeschirmte Adresse erkennen kann, während der Spending Key auf Hardware verbleibt, die niemals das Netzwerk berührt.
- **Ein Verwahrer weist seine Bestände nach.** Der Verwahrer gibt einem Prüfer für jede abgeschirmte Adresse einen Full Viewing Key. Der Prüfer kann diese Guthaben überprüfen und vergangene Aktivitäten zu und von diesen Adressen einsehen, aber sonst nichts tun.
- **Sorgfaltsprüfung eines Vertragspartners.** Wenn eine Börse im Rahmen einer erweiterten Sorgfaltsprüfung die abgeschirmte Historie eines Kunden prüfen muss, kann sie nach dem Viewing Key statt nach den Mitteln fragen.

## Was ein Viewing Key offenlegt – und was nicht

Es gibt mehr als eine Art von Key, und der Unterschied bestimmt, wie viel du preisgibst.

| Key | Präfix | Gewährt |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Sieht eingehende **und** ausgehende Transaktionen für jeden Pool im Konto |
| Unified incoming viewing key (UIVK) | `uivk…` | Sieht nur eingehende Transaktionen für jeden Pool im Konto |
| Sapling extended full viewing key | `zxviews…` | Sieht eingehende und ausgehende Sapling-Aktivitäten für die Adressen des Keys |

Keiner davon kann Mittel ausgeben. Alle sind in der entscheidenden Hinsicht dauerhaft: Einen weitergegebenen Key kannst du nicht zurückrufen, sondern nur dadurch überdauern, dass du Mittel auf ein Konto verschiebst, dessen Keys die andere Partei nicht besitzt.

Zwei Offenlegungsfallen solltest du kennen, bevor du etwas teilst.

**Eingehend bedeutet nicht eingeschränkt.** Ein Unified Incoming Viewing Key gilt für das gesamte Konto, nicht nur für die einzelne Adresse, nach der gefragt wurde. Das Exportieren eines UIVK für eine einzelne Sapling-Adresse gewährt weiterhin Einblick in eingehende Transaktionen über jeden Pool dieses Kontos hinweg und legt daher mehr offen als die darin benannte Adresse. Das [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) hält dies ausdrücklich fest.

**Eine veröffentlichte Adresse legt ihren Incoming Viewing Key bereits gegenüber einem künftigen Angreifer offen.** [ZIP 326](https://zips.z.cash/zip-0326) weist darauf hin, dass ein Angreifer mit einem Quantencomputer den Incoming Viewing Key aus einer veröffentlichten diversifizierten Adresse wiederherstellen könnte, was im Gegensatz zur Wiederherstellung des Nullifier Key machbar ist. Eine Adresse zu veröffentlichen ist heute nicht dasselbe wie einen Viewing Key zu veröffentlichen, doch über einen ausreichend langen Zeitraum liegen beide näher beieinander.

## Viewing Keys nach Ironwood

NU6.3 führte den abgeschirmten Ironwood-Pool ein und machte den Orchard-Pool zu einem reinen Ausgaben-Pool, sodass Mittel im Laufe der Zeit von einem zum anderen migrieren. Siehe [Ironwood](/zcash-tech/ironwood) und [Die Schleuse](/zcash-tech/the-turnstile) für das Upgrade selbst.

**Ein vor Ironwood ausgestellter Viewing Key funktioniert auch nach der Migration weiter.** ZIP 326 legt fest, dass ein Receiver und sein entsprechender Incoming Viewing Key für das Orchard-*Protokoll* gelten, nicht für einen Pool: Derselbe Incoming Viewing Key entschlüsselt sowohl Orchard-Pool- als auch Ironwood-Pool-Note-Chiffretexte testweise. Zallet implementiert dies auf diese Weise und beschreibt Ironwood Notes als Orchard-förmig, die unter der Ironwood-Note-Verschlüsselungsdomäne mit den Orchard Viewing Keys des Kontos testweise entschlüsselt werden.

Drei Folgen für alle, die einen Key halten oder ausstellen:

1. **Guthaben bewegen sich zwischen Pools, und der Betrachter sieht dies geschehen.** [ZIP 318](https://zips.z.cash/zip-0318) legt die Migration als eine Reihe kleiner, bewusst einheitlicher Orchard-zu-Ironwood-Transaktionen fest, die nach einem zufälligen Zeitplan ausgestrahlt werden. Jede gibt eine Orchard Note aus und erzeugt einen Ironwood-Output einer kanonischen Stückelung. Ein Prüfer, der mit einem Viewing Key beobachtet, sieht Bestände über Wochen hinweg schrittweise von einem Pool in den anderen wechseln, nicht in einer einzigen Bewegung. Eine Wallet kann anhand von Chain-Daten und ihrer Viewing Keys ihren eigenen Migrationsfortschritt rekonstruieren.
2. **Jeder Migrationsschritt legt den übertragenen Wert offen.** Das ist dem Überqueren einer Schleuse inhärent und macht die Migration überprüfbar. Die Aufteilung des Guthabens in kanonische Stückelungen bedeutet, dass keine einzelne Transaktion das gesamte Guthaben des Orchard-Pools offenlegt.
3. **Nach Ironwood erstellte Konten können ihre Keys anders ableiten.** [ZIP 2005](https://zips.z.cash/zip-2005) fügt ein `use_qsk`-Flag für quantenwiederherstellbare Keys hinzu und verändert, wie eingehende, ausgehende und Diversifier Keys abgeleitet werden. Daher sind `use_qsk = true` Keys tatsächlich andere Keys. ZIP 326 verlangt, dass das Flag innerhalb eines Kontos einheitlich ist, und verbietet die Erzeugung von `use_qsk = true` Keys, bevor NU6.3 auf Mainnet aktiviert wurde. Ein aus einem vor Ironwood bestehenden Konto exportierter Key ist daher ein `use_qsk = false` Key und bleibt für dieses Konto korrekt. Gehe nicht davon aus, dass ein aus einem Konto exportierter Key ein anderes Konto beschreibt.

## Einen Viewing Key exportieren

### Zallet

[Zallet](https://github.com/zcash/zallet) ist die Full-Node-Wallet, die die Wallet innerhalb von zcashd ersetzt hat. Der Export und Import von Viewing Keys kam in **v0.1.0-beta.2 (28. Juli 2026)** hinzu; prüfe daher zuerst deine Version, denn frühere Builds verfügen nicht über diese Methoden. Jedes Argument nach dem Methodennamen muss valides JSON sein, weshalb Zeichenkettenwerte ihre eigenen doppelten Anführungszeichen behalten. Der [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) erläutert den allgemeinen Befehlsstil.

Liste auf, was die Wallet enthält:

```bash
zallet rpc listaddresses
```

Exportiere den Unified Full Viewing Key des Kontos, indem du eine Unified Address übergibst:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exportiere stattdessen den Unified Incoming Viewing Key des Kontos mit dem optionalen Argument `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Die Übergabe einer Sapling-Adresse gibt den Sapling Extended Full Viewing Key (`zxviews…`) dieses Kontos zurück, entsprechend dem früheren Verhalten von zcashd. Zwei dokumentierte Einschränkungen: Sprout-Adressen werden abgelehnt, und ein Sapling Extended Full Viewing Key kann nicht aus einem Konto exportiert werden, das selbst als View-only importiert wurde, weil die Wallet ihn nicht rekonstruieren kann. Die Form mit `ivk` funktioniert jedoch für importierte View-only-Konten.

### Wallets, die Viewing Keys über ihre eigene Oberfläche exportieren

Die Seite [Wallets](/using-zcash/wallets) verfolgt die Unterstützung für Viewing Keys und die Ironwood-Bereitschaft jeder Wallet. Zum Zeitpunkt der Erstellung umfassen Wallets, die sowohl Viewing-Key-Unterstützung als auch **Ironwood: Ready** aufführen, ZODL, Zingo!, Zkool, Cake, Zallet, zecd und Nozy. Prüfe diese Seite statt dieser hier, bevor du dich auf eine einzelne Wallet verlässt, da sich die Bereitschaft ändert.

## Einen Viewing Key als Watch-only-Konto importieren

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ist hier die flexibelste Option, da es Unified Keys ebenso wie Legacy Keys akzeptiert. Sein README dokumentiert View-only-Konten, die aus einem **Unified Viewing Key** oder einem **Sapling Extended Viewing Key** erstellt werden, neben aus zcashd exportierten abgeschirmten erweiterten Legacy Keys. Füge ein neues Konto hinzu, wähle den View-only-Weg und füge den Key `uview…` oder `zxviews…` ein; das Konto synchronisiert dann und meldet Guthaben sowie Historie ohne Ausgabeberechtigung.

Die Unterstützung des Ironwood-Protokolls und die Orchard-zu-Ironwood-Migration wurden mit Zkool 6.24.0 (20. Juli 2026) eingeführt; 6.26.1 (2. August 2026) korrigierte die Erkennung von Ironwood-Transaktionen im Mempool. Verwende 6.26.1 oder neuer.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Das zweite Argument ist die Rescan-Richtlinie: `"whenkeyisnew"` (der Standard), `"yes"` oder `"no"`. Das dritte ist die Blockhöhe, ab der erneut gescannt wird. Zallet importiert den Key als View-only-Konto und verfolgt eingehende sowie ausgehende Transaktionen für dessen Adressen ohne Ausgabeberechtigung.

**Zallet importiert ausschließlich Sapling Extended Full Viewing Keys.** Es importiert keinen Unified Full Viewing Key `uview…`, obwohl es einen exportieren kann. Um Lesezugriff auf ein ganzes Unified-Konto zu gewähren, exportiere den UFVK aus Zallet und importiere ihn in eine Wallet, die Unified Keys akzeptiert, etwa Zkool.

Um einen importierten Key in eine vollständige Transaktionshistoriedatei mit Txids, Gebühren und Memos zu verwandeln, siehe [Transaktionshistorie aus einem Viewing Key exportieren](/guides/viewing-key-transaction-export).

## Was sich geändert hat und wonach du nicht mehr suchen solltest

Wenn du einer älteren Version dieser Seite oder einer Übersetzung davon gefolgt bist, funktionieren drei Wege nicht mehr.

- **`zcash-cli z_exportviewingkey` und `z_importviewingkey`.** zcashd erreichte am 18. Juli 2026 sein Ende-des-Supports und läuft nicht mehr. Die gleichnamigen Methoden von Zallet sind der Ersatz; siehe den [Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Die Ywallet-Anleitung.** Die Wallets-Seite kennzeichnet Ywallet mit **Ironwood: Not Ready**, daher ist es nicht die Wallet, auf die man für Viewing Keys aus der Ironwood-Ära verweisen sollte. Zkool vom selben Entwickler akzeptiert dieselbe Bandbreite an Keys und ist als Ready gekennzeichnet.
- **zcashblockexplorer.com/vk.** Der Dienst gibt HTTP 503 mit einem ungültigen Zertifikat zurück und wurde eingestellt, statt ersetzt zu werden. Einen Viewing Key auf einer Website einzufügen, übergibt deine gesamte Transaktionshistorie an den Betreiber dieser Website, was schon immer die schwächste der drei Optionen auf der alten Seite war. Importiere den Key stattdessen in eine Wallet, die du selbst betreibst.

## Visualisierung / Analogie

### Das Zeitfenster des Prüfers

Stellen Sie sich ein abgeschirmtes Konto wie einen Tresorraum in einer Bank vor:

- Der **Ausgabeschlüssel** ist der Schlüssel zum Raum. Wer ihn besitzt, kann Kisten öffnen und ihren Inhalt herausnehmen.
- Ein **Anzeigeschlüssel** ist das Fenster des Prüfers zu diesem Raum. Der Prüfer kann beobachten, wie jede Kiste hinein- und hinausgeht, die Etiketten lesen und ein Hauptbuch führen – aber das Fenster hat keinen Griff. Die Person, die hindurchschaut, kann nichts im Raum bewegen.

### Was das Fenster nicht zeigen kann

Das Fenster blickt in den Raum, nicht in die Welt außerhalb. Es zeigt die abgeschirmte Aktivität des überwachten Kontos; es macht den Beobachter nicht zu einem blockchain-weiten Beobachter und ermöglicht ihm nicht, die Aktivität des Kontos mit der ungeschirmten Historie anderer Personen zu korrelieren. Und weil das Fenster auf Kontoebene installiert ist, verschafft jemandem ein Guckloch für ein einzelnes Schließfach (eine einzelne Adresse) dennoch den gesamten Einblick in die eingehenden Vorgänge des Raums – genau deshalb gibt es die Regel des engsten Schlüssels.

### Warum du das Zeitfenster nicht zurücknehmen kannst

Ein Viewing Key ist eine Information, kein Berechtigungseintrag. Sobald er kopiert wurde, besteht er fort, bis die Mittel das von ihm überwachte Konto verlassen. Die praktische Abhilfe ist Rotation: Verschiebe Guthaben auf ein neues Konto, dessen Schlüssel die andere Partei nie erhalten hat, und das alte Fenster blickt in einen leeren Raum.

## Tiefgehende Einblicke

### Testentschlüsselung: Wie das Anzeigen tatsächlich funktioniert

Jede abgeschirmte Transaktion verschlüsselt ihre Klartextdaten der Notes für den vorgesehenen Empfänger. Eine Wallet mit einem Viewing Key führt eine **Testentschlüsselung** durch: Für jede Transaktion, die sie in der Chain findet, versucht sie, die Chiffretexte der Notes mit dem Schlüssel zu entschlüsseln. Treffer offenbaren den Wert der Note, den Empfänger-Diversifier und das Memo; Fehlschläge verursachen keine Kosten. Deshalb funktioniert derselbe Incoming Viewing Key weiterhin über die Orchard- und Ironwood-Pools hinweg — [ZIP 326](https://zips.z.cash/zip-0326) ordnet einen Receiver dem Orchard-*Protokoll* zu, sodass Ironwood-Chiffretexte von Notes Orchard-förmig sind und mit den Orchard Viewing Keys des Kontos unter der Ironwood-Domain für die Verschlüsselung von Notes testentschlüsselt werden.

### Vollständig vs. eingehend: Was die Ableitung entscheidet

Ein **vollständiger** Viewing Key kann die Fähigkeit zur Einsicht ausgehender Transaktionen ableiten, wodurch ein Prüfer die *Absender*-Seite einer Übertragung rekonstruieren kann, sobald die Transaktion entschlüsselt wurde. Ein **eingehender** Viewing Key bleibt absichtlich eingeschränkt: Er erkennt und entschlüsselt eingehende Notes, kann jedoch keine ausgehenden Verknüpfungen rekonstruieren. Die Ableitung zwischen diesen Fähigkeiten ist nur in eine Richtung möglich — der eingehende Key wird *aus* dem vollständigen Key abgeleitet, niemals umgekehrt — wodurch „nur eingehend“ zu einer echten Herabstufung und nicht zu einem bloßen Versprechen wird. Das Flag `use_qsk` aus [ZIP 2005](https://zips.z.cash/zip-2005) verändert die Ableitung selbst, sodass quantenwiederherstellbare Keys eine völlig andere Key-Familie und keine Variante der alten sind.

### Wie die Migration für einen Betrachter aussieht

Da die [ZIP-318](https://zips.z.cash/zip-0318)-Migration eine zufällig gestaltete Reihe kleiner, einheitlicher Transaktionen von Orchard zu Ironwood ist, sieht ein Betrachter mit dem Schlüssel eine Treppe: viele Schritte mit Wert in kanonischen Stückelungen statt eines einzigen Sprungs. Kein einzelner Schritt offenbart das gesamte migrierte Guthaben, doch das *Muster* ist erkennbar — der beabsichtigte Kompromiss eines überprüfbaren Turnstile.

## Praktische Auswirkungen

- **Für Börsen und Zahlungsabwickler:** Laden Sie den Incoming Viewing Key des Kontos (oder den UFVK für vollständige Abdeckung) auf einen Erkennungsknoten und gleichen Sie Kundeneinzahlungen automatisch ab, genau wie bei einer transparenten Adresse — der Spending Key des Kunden verlässt jedoch niemals die Cold Storage.
- **Für Prüfer und Proof-of-Reserves:** Ein Full Viewing Key macht aus „Vertrauen Sie uns“ „Überprüfen Sie dies“: Salden und vollständige Transaktionshistorie der überwachten Konten, ohne jede Möglichkeit, darauf zuzugreifen. Kombinieren Sie dies mit [Zahlungsoffenlegungen](/zcash-tech/payment-disclosures) für einmalige Nachweise zu einer einzelnen Zahlung.
- **Für die Due Diligence:** Geben Sie einer Gegenpartei den Key für das für die Zusammenarbeit relevante Konto, nicht für Ihr gesamtes Wallet. Endet die Beziehung, rotieren Sie das Konto.
- **Für die Wahl von Tools:** Zallet exportiert UFVKs und importiert Sapling erweiterte Full Viewing Keys; Zkool akzeptiert Unified und Legacy Keys als reine Beobachtungskonten. Prüfen Sie die Seite [Wallets](/using-zcash/wallets) auf die aktuelle IronwoodBereitschaftsmatrix, bevor Sie ein Wallet standardmäßig einsetzen.
- **Die Kosten der Offenlegung sind dauerhaft:** Jeder zusätzliche Inhaber eines Keys ist eine permanente Privacy-Kreditlinie, die Sie nicht schließen können. Stellen Sie Keys pro Beziehung aus, begrenzen Sie sie auf ein Konto und dokumentieren Sie, wer was besitzt.

## Häufige Fehler

| Häufige Annahme | Was tatsächlich der Fall ist |
| --- | --- |
| „Ein Viewing Key kann die Mittel ausgeben, wenn er durchsickert.“ | Das kann er nicht. Viewing Keys enthalten keine Ausgabeberechtigung; im schlimmsten Fall legt ein Leak den Verlauf offen. |
| „Ich kann einen Viewing Key später widerrufen.“ | Das kannst du nicht. Ein weitergegebener Key funktioniert, bis die Mittel auf ein Konto verschoben werden, dessen Keys die andere Partei nicht besitzt. |
| „Das Exportieren eines UIVK für eine Adresse zeigt nur diese Adresse.“ | Viewing Keys sind kontobezogen. Ein UIVK zeigt eingehende Aktivitäten für jeden Pool im Konto. |
| „`zcash-cli z_exportviewingkey` funktioniert immer noch.“ | Nein. zcashd erreichte am 18. Juli 2026 seinen Support-Ende-Stopp; verwende stattdessen Zallets `z_exportviewingkey` / `z_importviewingkey`. |
| „Das Einfügen eines Viewing Key in ein Web-Tool ist sicher, weil es schreibgeschützt ist.“ | Schreibgeschützt bedeutet dennoch, dass dein gesamter Transaktionsverlauf für dieses Konto an die Person weitergegeben wird, die die Website betreibt. Importiere den Key in eine Wallet, die du selbst betreibst. |
| „Zallet kann jeden Viewing Key importieren, den Zallet exportieren kann.“ | Nein. Zallet importiert nur erweiterte vollständige Viewing Keys von Sapling; vereinheitlichte `uview…`-Keys müssen in Wallets importiert werden, die vereinheitlichte Keys akzeptieren, etwa Zkool. |

## Verwandte Seiten

- [Zahlungsoffenlegungen](/zcash-tech/payment-disclosures) — ausgewählte Details einer Zahlung nachweisen, ohne fortlaufenden Zugriff auf ein Konto zu gewähren
- [Vereinheitlichte Adressen](/zcash-tech/unified-addresses) — die Adressschicht, die Empfänger für Viewing Keys enthält
- [Ironwood](/zcash-tech/ironwood) — der abgeschirmte Pool NU6.3, in den Orchard migriert
- [Das Turnstile](/zcash-tech/the-turnstile) — der Migrationsmechanismus von Orchard zu Ironwood, den Betrachter verfolgen können
- [Wallets](/using-zcash/wallets) — das vollständige Verzeichnis der Wallets, Unterstützung für Viewing Keys und Ironwood-Bereitschaft
- [Transaktionsverlauf aus einem Viewing Key exportieren](/guides/viewing-key-transaction-export) — einen importierten Schlüssel in eine vollständige Verlaufsdatei mit txid/Gebühr/Memo umwandeln

## Ressourcen

Verwende Viewing Keys nach Bedarf und bevorzuge den engsten Key, der die gestellte Frage beantwortet.

- [Zahlungsnachweise](/zcash-tech/payment-disclosures) - ausgewählte Details einer Zahlung nachweisen, ohne fortlaufenden Zugriff auf ein Konto zu gewähren
- [ZIP 326: NU6.3 Folgen für Wallets](https://zips.z.cash/zip-0326) — wie sich Viewing Keys über die Orchard- und Ironwood-Pools verhalten
- [ZIP 229: Transaktionsformat Version 6](https://zips.z.cash/zip-0229) — definiert die Orchard- und Ironwood-Pools
- [ZIP 310](https://zips.z.cash/zip-0310) — Spezifikation für Viewing Keys
- [Zallet Änderungsprotokoll](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — welche Veröffentlichung welche RPC-Methode hinzugefügt hat
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — unterstützte Konto- und Schlüsseltypen
- [ECC, Viewing Keys erklärt](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selektive Offenlegung und Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Videopräsentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
