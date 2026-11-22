# Erkennung geschützter Zahlungen: Welche Kosten das Scannen verursacht

Ein Unternehmen, das geschützte ZEC akzeptiert, muss eingehende Zahlungen finden. Beim transparenten Pool genügt dafür eine Indexabfrage. Bei den geschützten Pools kann niemand Zahlungen nach Adresse indizieren. Daher muss die Wallet oder das Backend mit den eigenen Schlüsseln jede geschützte Ausgabe auf der Chain prüfen. Auf dieser Seite wird erklärt, wie das funktioniert, was es kostet und wie du ein Kontodesign wählst, mit dem sich die Kosten im Rahmen halten lassen.

## Kurzfassung

* Die Kosten für die Erkennung geschützter Zahlungen steigen mit der Anzahl der **Viewing Keys**, die du überwachst, nicht mit der Anzahl der Adressen, die du ausgibst
* Ein Konto kann für jeden Kunden oder jede Rechnung eine neue, nicht verknüpfbare **diversifizierte Adresse** ausgeben, ohne dass dadurch zusätzliche Scankosten entstehen
* Ein Viewing Key zeigt das **gesamte Konto**. Wenn ein Prüfer nur einen Kunden sehen darf, braucht dieser Kunde ein eigenes Konto, und jedes Konto verursacht bei jedem Block zusätzlichen Scanaufwand
* Lege den Scanner auf **volle Blöcke** aus, nicht auf den Durchschnitt. Im Mainnet gibt es bereits Serien nahezu voller Blöcke
* Miss die Kosten pro Versuch auf deiner eigenen Hardware, bevor du den Bedarf dimensionierst

## Warum sich geschützte Zahlungen nicht indizieren lassen

Bei transparenten Adressen kann ein Knoten die Adresse jeder Ausgabe lesen und einen Index von Adressen zu Ausgaben erstellen. Zebra stellt dies über `getaddressutxos` und `getaddresstxids` bereit.

Eine geschützte Aktion enthält keine lesbare Adresse. Sie umfasst eine Notizverpflichtung, einen ephemeren öffentlichen Schlüssel und eine verschlüsselte Notiz. Aus diesen Bytes geht nicht hervor, für wen die Zahlung bestimmt ist. Deshalb können weder der Knoten noch ein [Indexer](Lightwallet_Nodes.md) einen Adressindex erstellen.

Die Suche funktioniert daher umgekehrt. Die Wallet nimmt jede geschützte Ausgabe und fragt durch einen Entschlüsselungsversuch: „Gehört sie mir?“ Das nennt man **Probeentschlüsselung**. [Viewing Keys](Viewing_Keys.md) erklärt, was die Schlüssel offenlegen, und [Zcash Wallet-Synchronisierung](Zcash_Wallet_Syncing.md) behandelt, wie Wallets den Aufwand einteilen.

## So funktioniert ein einzelner Versuch

Für das Aktionsformat des Orchard-Protokolls, das sowohl der Orchard als auch der Ironwood-Pool verwenden:

1. **Schlüsselvereinbarung:** Multipliziere den ephemeren öffentlichen Schlüssel der Aktion mit deinem Incoming Viewing Key. Das ist eine Skalarmultiplikation auf der Pallas-Kurve und macht den größten Teil des Aufwands aus
2. **Schlüsselableitung:** Hashe das gemeinsame Geheimnis zu einem symmetrischen Schlüssel
3. **Entschlüssele die ersten 52 Bytes** der Notiz: den Diversifier, den Wert und `rseed`
4. **Erstelle die Notizverpflichtung neu** anhand der entschlüsselten Daten
5. **Vergleiche** sie mit `cmx` der Aktion. Bei Übereinstimmung gehört die Notiz dir

Erst bei Schritt 5 erfährst du, ob die Notiz dir gehört. Daher **kostet ein Fehlschlag ungefähr so viel wie ein Treffer**. Fast jede Aktion auf der Chain gehört jemand anderem, deshalb sind beinahe alle Versuche erfolglos.

## Die Kostenformel

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Adressen tauchen in der Formel nicht auf. Wallets versuchen sowohl den externen Schlüssel (Adressen, die du ausgibst) als auch den internen Schlüssel (Wechselgeld). Deshalb gilt `I = 2`. Das ist an den `for scope in [Scope::External, Scope::Internal]`-Schleifen in librustzcashs `zcash_client_backend/src/scanning.rs` zu sehen.

[ZIP 218](https://zips.z.cash/zip-0218) begrenzt geschützte Aktionen auf **330 pro Block**, daher beträgt `A` höchstens 330.

## Diversifizierte Adressen: viele Adressen, ein Schlüssel

Eine Adresse des Orchard-Protokolls besteht aus einem Diversifier `d` (11 Bytes) und einem Übertragungsschlüssel, der aus demselben Incoming Viewing Key abgeleitet wird. [ZIP 32](https://zips.z.cash/zip-0032) leitet jeden Diversifier mithilfe der FF1-Verschlüsselung aus einem 88-Bit-Index ab. So hat ein Konto **2^88 Adressen**, und jede davon ist mit dem Orchard-Protokoll gültig.

Dadurch erhält ein Zahlungs-Backend zwei nützliche Eigenschaften:

* **Die Adressen lassen sich nicht miteinander verknüpfen.** Ohne den Viewing Key wirken zwei diversifizierte Adressen desselben Kontos, als gehörten sie zu zwei verschiedenen Wallets
* **Zahlungen lassen sich ohne Nachschlagetabelle Rechnungen zuordnen.** Bei erfolgreicher Probeentschlüsselung enthält die entschlüsselte Notiz `d`. Der Diversifier-Schlüssel des Kontos entschlüsselt `d` zurück zu seinem Index. Wenn der Index deiner Rechnungsnummer entspricht, weißt du, welche Rechnung bezahlt wurde

Verpacke jede Adresse in eine [Unified Address](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)), bevor du sie einem Kunden zeigst.

## Der Haken: Ein Viewing Key zeigt das gesamte Konto

Du kannst einen Viewing Key nicht auf eine einzelne diversifizierte Adresse beschränken, weil jede Adresse im Konto denselben Schlüssel verwendet. Daher ist das Konto zugleich die Offenlegungseinheit. Wer den Viewing Key eines Kontos erhält, sieht jede Zahlung an jede Adresse darin.

Damit fallen drei Dinge in eine Entscheidung:

| Design | Scankosten | Was einem Prüfer gezeigt werden kann |
|:--|:--|:--|
| Ein Konto mit einer diversifizierten Adresse pro Kunde | Ein Schlüssel, unabhängig von der Kundenzahl | Alles oder nichts |
| Ein Konto pro Kunde | Ein Schlüssel pro Kunde, bei jedem Block | Jeweils ein Kunde |
| Ein Konto pro Kunde und Zeitraum | Ein Schlüssel pro Kunde und Zeitraum | Ein Kunde für einen Zeitraum |

Lege das Kontodesign von Anfang an fest. Ein Konto später aufzuteilen bedeutet, seine Guthaben in neue Konten zu verschieben. Das kostet Gebühren und erzeugt ein sichtbares Muster.

## Was es in der Praxis kostet

Diese Werte stammen von einem Laptop-Kern (Apple M3 Pro, Release-Build). Gemessen wurde mit `try_compact_note_decryption` aus `zcash_note_encryption` 0.5.1 anhand echter Ironwood-Aktionen aus dem Testnet:

| Messung | Wert |
|:--|:--|
| Ein Versuch, jeweils mit einem Schlüssel | etwa 82 µs |
| Ein Versuch, gebündelt über 10 oder 100 Schlüssel | etwa 42 µs |

Die Bündelung halbiert die Kosten ungefähr. Aus demselben Grund bündelt der Scanner von librustzcash die Versuche.

Bei `t = 42 µs` und vollen Blöcken mit 330 Aktionen:

| Überwachte Konten | Kernzeit pro vollem Block | Benötigte Kerne, um mit vollen Blöcken Schritt zu halten |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1,000,000 (eins pro Kunde) | 7.7 Stunden | etwa 1,109 |

Dieselben eine Million Kunden als diversifizierte Adressen in einem Konto kosten pro vollem Block 28 ms. Der einzige Unterschied ist, wo die Kontogrenze liegt.

## Für Spitzen auslegen, nicht für Durchschnittswerte

Bei den 5.000 Mainnet-Blöcken bis zur Höhe 3,582,677 (Stichprobe vom 17. November 2026):

* 62 % der Blöcke enthielten keine geschützten Ausgaben, und der Median lag bei null
* Im Durchschnitt gab es 12.3 geschützte Ausgaben pro Block
* 153 Blöcke zwischen den Höhen 3,579,935 und 3,580,346 – etwa drei Stunden Chain – enthielten jeweils mehr als 250 Ausgaben, oft direkt hintereinander. Sie umfassten 75 % aller Ausgaben in der Stichprobe

Ein auf den Durchschnitt ausgelegter Scanner fällt bei einer solchen Serie zurück. Plane ausreichend Spielraum ein (zum Beispiel nur die Hälfte jedes 25-Sekunden-Blockintervalls zu veranschlagen) und lege den Scanner auf die Obergrenze aus.

## Kompakte Blöcke helfen bei der Bandbreite, nicht bei der Anzahl der Versuche

Light-Wallets scannen kompakte Blöcke von einem Lightwallet-Server. Eine kompakte Aktion ist 148 Bytes groß, verglichen mit 820 Bytes für die vollständige Aktion. Sie enthält nur, was ein Versuch benötigt: den ephemeren Schlüssel, die ersten 52 Bytes des Chiffrats, den Nullifier und `cmx`. Transparente Daten werden nur übertragen, wenn der Client danach fragt.

Kompakte Blöcke verringern die Downloadgröße. Sie reduzieren nicht die Anzahl der Versuche, denn jede Aktion muss weiterhin mit jedem Schlüssel geprüft werden.

## Checkliste für ein Zahlungs-Backend

* Entscheide, wer was jemals sehen muss, bevor du Konten erstellst
* Gib, sofern die Offenlegungsregeln es erlauben, für jede Rechnung eine diversifizierte Adresse aus einem Konto aus
* Miss `t` mit aktivierter Bündelung auf deiner eigenen Hardware
* Lege das Scannen der aktuellen Blöcke auf 330 Aktionen pro Block aus und plane ausreichend Spielraum ein
* Teile erneute Scans nach Höhenbereich auf mehrere Worker auf. Die Historie ist unveränderlich, daher lässt sich dieser Schritt problemlos parallelisieren
* Denk daran, dass jedes neue Konto auch rückwirkend bis zu seiner Geburtstagshöhe gescannt werden muss

## Weitere Informationen

* [ZIP 218: Zielabstand von 25 Sekunden zwischen den Blöcken](https://zips.z.cash/zip-0218), einschließlich der Aktionslimits pro Block
* [ZIP 32: geschützte hierarchisch deterministische Wallets](https://zips.z.cash/zip-0032)
* [ZIP 316: Unified Addresses und Unified Viewing Keys](https://zips.z.cash/zip-0316)
* [Lightwallet-Protokoll: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` Scannen und `zcash_note_encryption`
* [Ein Viewing Key, eine Million Kunden](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): alle Messwerte, mit Lab-Code zu ihrer Reproduktion
