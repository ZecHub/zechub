<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) ist ein Schwellenwert-Signatur- und verteiltes Schlüsselerzeugungsprotokoll: Mehrere Unterzeichner halten jeweils einen Anteil eines gemeinsamen privaten Schlüssels, und eine Schwellenanzahl von ihnen muss zusammenarbeiten, um eine Signatur zu erzeugen.
* Da das Ergebnis eine einzelne Schnorr-Signatur ist, sieht eine auf diese Weise erstellte Transaktion im Netzwerk wie eine gewöhnliche Transaktion aus.
* Es erfordert nur minimale Kommunikationsrunden, kann parallel ausgeführt werden und kann einen sich fehlverhaltenden Teilnehmer identifizieren und ausschließen.
* Für Zcash bedeutet dies, dass FROST mehrere geografisch getrennte Parteien in die Lage versetzt, die Ausgabeberechtigung von abgeschirmtem ZEC zu kontrollieren — nützlich für Verwahrung, Treuhand, Non-Custodial-Dienste und Zcash Shielded Assets (ZSA).
* Es wurde von Chelsea Komlo (University of Waterloo, Zcash Foundation) und Ian Goldberg (University of Waterloo) entwickelt.

## Kernerklärung

### Was ist eine Schnorr-Signatur?

Eine digitale Schnorr-Signatur ist eine Menge von Algorithmen: (KeyGen, Sign, Verify).

Schnorr-Signaturen haben mehrere Vorteile. Ein wesentlicher Vorteil ist, dass, wenn mehrere Schlüssel verwendet werden, um dieselbe Nachricht zu signieren, die resultierenden Signaturen zu einer einzigen Signatur kombiniert werden können. Dies kann die Größe von Multisig-Zahlungen und anderen mit Multisig verbundenen Transaktionen erheblich verringern.

### Was ist FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Erstellt von Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST ist ein Schwellenwert-Signatur- und verteiltes Schlüsselerzeugungsprotokoll, das nur minimale Kommunikationsrunden erfordert und parallel ausgeführt werden kann. Das FROST-Protokoll ist eine Schwellenwert-Version des Schnorr-Signaturschemas.

Im Gegensatz zu Signaturen in einem Einparteien-Setting erfordern Schwellenwert-Signaturen die Zusammenarbeit einer Schwellenanzahl von Unterzeichnern, von denen jeder einen Anteil eines gemeinsamen privaten Schlüssels hält.

[Was sind Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Folglich verursacht das Erzeugen von Signaturen in einem Schwellenwert-Setting zusätzlichen Aufwand durch Netzwerkrunden zwischen den Unterzeichnern, was kostspielig ist, wenn geheime Anteile auf netzwerkbeschränkten Geräten gespeichert werden oder wenn die Koordination über unzuverlässige Netzwerke erfolgt.

Der Netzwerk-Overhead während Signiervorgängen wird durch den Einsatz einer neuartigen Technik verringert, die vor Fälschungsangriffen schützt und auch auf andere Schemata anwendbar ist.

FROST verbessert Schwellenwert-Signaturprotokolle, indem es erlaubt, unbegrenzt viele Signaturvorgänge sicher parallel (konkurrent) auszuführen.

Es kann entweder als 2-Runden-Protokoll verwendet werden, bei dem Unterzeichner insgesamt 2 Nachrichten senden und empfangen, oder als optimiertes Ein-Runden-Signaturprotokoll mit einer Vorverarbeitungsphase.

FROST erreicht seine Effizienzverbesserungen teilweise dadurch, dass das Protokoll bei Vorhandensein eines sich fehlverhaltenden Teilnehmers abgebrochen werden kann, der dann identifiziert und von zukünftigen Vorgängen ausgeschlossen wird.

Sicherheitsbeweise, die zeigen, dass FROST gegen Chosen-Message-Angriffe sicher ist, unter der Annahme, dass das Problem des diskreten Logarithmus schwer ist und der Angreifer weniger Teilnehmer als den Schwellenwert kontrolliert, werden [hier](https://eprint.iacr.org/2020/852.pdf#page=16) bereitgestellt.

### Wie funktioniert FROST?

Das FROST-Protokoll enthält zwei wichtige Komponenten:

Zuerst führen n Teilnehmer ein Protokoll zur verteilten Schlüsselerzeugung (DKG) aus, um einen gemeinsamen Verifikationsschlüssel zu erzeugen. Am Ende erhält jeder Teilnehmer einen privaten geheimen Schlüsselanteil und einen öffentlichen Verifikationsschlüsselanteil.

Danach können beliebige t-von-n Teilnehmer ein Schwellenwert-Signaturprotokoll ausführen, um gemeinsam eine gültige Schnorr-Signatur zu erzeugen.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visualisierung / Analogie

Stell dir FROST wie ein Bankschließfach vor, das sich nur öffnet, wenn mehrere autorisierte Schlüsselinhaber ihre Schlüssel gemeinsam drehen — aber nicht jeder Schlüsselinhaber wird benötigt; nur eine festgelegte Anzahl (zum Beispiel beliebige 3 von 5). Sobald das Schließfach geöffnet ist, kann ein außenstehender Beobachter nicht erkennen, welche Schlüsselinhaber anwesend waren oder überhaupt, dass mehr als einer beteiligt war. Auf dieselbe Weise kann eine Gruppe gemeinsam eine Zcash-Transaktion autorisieren, während das Netzwerk nur eine gewöhnlich aussehende Signatur sieht.

## Detaillierte Betrachtung

**Verteilte Schlüsselerzeugung (DKG)**

Das Ziel dieser Phase ist es, langlebige geheime Schlüsselanteile und einen gemeinsamen Verifikationsschlüssel zu erzeugen. Diese Phase wird von n Teilnehmern ausgeführt.

FROST baut seine eigene Schlüsselerzeugungsphase auf Pedersens DKG (GJKR03) auf, das sowohl Shamirs Secret Sharing als auch Feldmans verifizierbare Secret-Sharing-Schemata als Unterroutinen verwendet. Darüber hinaus muss jeder Teilnehmer Wissen über sein eigenes Geheimnis nachweisen, indem er einen Zero-Knowledge-Beweis an die anderen Teilnehmer sendet, der selbst eine Schnorr-Signatur ist. Dieser zusätzliche Schritt schützt vor Rogue-Key-Angriffen, wenn t ≥ n/2.

Am Ende des DKG-Protokolls wird ein gemeinsamer Verifikationsschlüssel vk erzeugt. Jeder Teilnehmer Pᵢ hält einen Wert (i, skᵢ ), der seinen langlebigen geheimen Anteil darstellt, sowie einen Verifikationsschlüsselanteil vkᵢ = skᵢ *G. Der Verifikationsschlüsselanteil vkᵢ von Teilnehmer Pᵢ wird von anderen Teilnehmern verwendet, um die Korrektheit von Pᵢs Signaturanteilen während der Signierphase zu überprüfen, während der Verifikationsschlüssel vk von externen Parteien verwendet wird, um von der Gruppe ausgestellte Signaturen zu verifizieren.

**Schwellenwert-Signierung**

Diese Phase baut auf bekannten Techniken auf, die additive Secret Sharing und die Umwandlung von Anteilen einsetzen, um die Nonce für jede Signatur nicht-interaktiv zu erzeugen. Sie nutzt außerdem Binding-Techniken, um bekannte Fälschungsangriffe zu vermeiden, ohne die Parallelität einzuschränken.

In der Vorverarbeitungsphase bereitet jeder Teilnehmer eine feste Anzahl von Paaren elliptischer Kurvenpunkte (EC) für die spätere Verwendung vor. Diese Phase wird einmalig über mehrere Schwellenwert-Signierphasen hinweg ausgeführt.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signierrunde 1: Jeder Teilnehmer Pᵢ beginnt damit, ein einzelnes Paar privater Nonces (dᵢ, eᵢ) und ein entsprechendes Paar von EC-Punkten (Dᵢ, Eᵢ) zu erzeugen und sendet dieses Punktepaar dann an alle anderen Teilnehmer. Jeder Teilnehmer speichert diese Paare von EC-Punkten zur späteren Verwendung. Die Signierrunden 2 und 3 sind die eigentlichen Vorgänge, bei denen t-von-n Teilnehmer zusammenarbeiten, um eine gültige Schnorr-Signatur zu erstellen.

Signierrunde 2: Die Teilnehmer arbeiten zusammen, um eine gültige Schnorr-Signatur zu erstellen. Die Kerntechnik hinter dieser Runde ist t-von-t additives Secret Sharing.

Dieser Schritt verhindert Fälschungsangriffe, weil Angreifer Signaturanteile nicht über verschiedene Signiervorgänge hinweg kombinieren oder die Menge der Unterzeichner oder die veröffentlichten Punkte für jeden Unterzeichner vertauschen können.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Nachdem die Challenge c berechnet wurde, kann jeder Teilnehmer die Antwort zᵢ unter Verwendung der Einmal-Nonces und der langfristigen geheimen Anteile berechnen, bei denen es sich um t-von-n (Grad t-1) Shamir-Geheimnisanteile des langlebigen Schlüssels der Gruppe handelt. Am Ende von Signierrunde 2 sendet jeder Teilnehmer zᵢ an die anderen Teilnehmer.

[Das vollständige Paper lesen](https://eprint.iacr.org/2020/852.pdf)
### Einsatz von FROST im breiteren Ökosystem

**FROST bei [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Um die Effizienz der Threshold-Signing-Systeme von Coinbase zu verbessern, entwickelten sie eine Version von FROST. Diese Coinbase-Implementierung nimmt gegenüber dem ursprünglichen FROST-Entwurf leichte Änderungen vor.

Sie entschieden sich dagegen, die Rolle des Signature Aggregator zu verwenden. Stattdessen ist jeder Teilnehmer ein Signature Aggregator. Dieses Design ist sicherer: Alle Teilnehmer im Protokoll verifizieren die Berechnungen der anderen und erreichen dadurch ein höheres Sicherheitsniveau bei gleichzeitig geringerem Risiko. Auch die einmalige Vorverarbeitungsphase wurde entfernt, um die Implementierung zu beschleunigen; stattdessen wird eine dritte Signaturrunde verwendet.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) von Blockstream**

Für den Einsatz auf der [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) für Bitcoin wird eine anwendungsspezifische Verbesserung von FROST vorgeschlagen.

„ROAST ist ein einfacher Wrapper um Threshold-Signaturverfahren wie FROST. Es garantiert, dass ein Quorum ehrlicher Unterzeichner, z. B. die Liquid-Funktionäre, auch bei störenden Unterzeichnern und bei Netzwerkverbindungen mit beliebig hoher Latenz immer eine gültige Signatur erhalten kann.“

---

**FROST im IETF**

Die Internet Engineering Task Force, gegründet 1986, ist die führende Organisation für die Entwicklung von Standards für das Internet. Das IETF entwickelt freiwillige Standards, die häufig von Internetnutzern, Netzbetreibern und Geräteherstellern übernommen werden und so die Entwicklung des Internets mitprägen.

FROST Version 11 (Variante mit zwei Runden) wurde [beim IRTF eingereicht](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Dies ist ein wichtiger Schritt hin zur vollständigen Bewertung von FROST als neuer Standard für Threshold-Signaturschemata, der in den kommenden Jahren im gesamten Internet, in Hardware-Geräten und für andere Dienste eingesetzt werden kann.


## Praktische Auswirkungen

Absolut ja. Die Einführung von FROST in Zcash wird es mehreren geografisch getrennten Parteien ermöglichen, gemeinsam die Ausgabeberechtigung von abgeschirmtem ZEC zu kontrollieren. Transaktionen, die mit diesem Signaturschema gesendet werden, sind von anderen Transaktionen im Netzwerk nicht zu unterscheiden. Dadurch bleibt ein starker Schutz gegen Zahlungsnachverfolgung erhalten und die Menge an Blockchain-Daten, die für Analysen verfügbar ist, wird begrenzt.

In der Praxis ermöglicht dies, dass eine breite Palette neuer Anwendungen im Netzwerk aufgebaut werden kann, von Treuhanddienstleistern bis hin zu anderen Non-Custodial-Services.

FROST wird außerdem zu einer wesentlichen Komponente für die sichere Ausgabe und Verwaltung von Zcash Shielded Assets (ZSA), da es eine sicherere Verwaltung der Ausgabeberechtigung innerhalb von Entwicklungsorganisationen und ZEC-Verwahrern wie Börsen ermöglicht und diese Fähigkeit gleichzeitig auch Zcash-Nutzern bereitstellt.

## Häufige Fehler

**FROST mit traditionellem On-Chain-Multisig verwechseln**. Traditionelles Multisig kann mehrere Unterzeichner oder mehrere Signaturen On-Chain offenlegen. FROST erzeugt eine einzelne aggregierte Schnorr-Signatur, sodass eine Transaktion von einer Single-Signature-Transaktion nicht zu unterscheiden ist.

**Annehmen, dass weniger als der Threshold signieren können**. Nur eine Threshold-Anzahl (t-aus-n) von Teilnehmern, die gemeinsam handeln, kann eine gültige Signatur erzeugen; jede kleinere Gruppe kann das nicht.

**Annehmen, dass FROST Off-Chain alles verbirgt**. FROST schützt die On-Chain-Signatur, aber die Koordination zwischen den Unterzeichnern findet weiterhin Off-Chain statt und erfordert eigene Datenschutz- und Sicherheitsmaßnahmen.


## Verwandte Seiten

- [Halo](/zcash-tech/halo) — das vertrauenslose, rekursive Proof-System, das im Orchard-Pool von Zcash verwendet wird.
- [Viewing Keys](/zcash-tech/viewing-keys) — selektive Offenlegung für abgeschirmte Transaktionen.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — wo FROST bei der Verwaltung von Ausgaben-/Ausgabeberechtigungen hilft.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — ein weiterer zentraler Bestandteil der Datenschutzinfrastruktur von Zcash.


## Weiterführendes Lernen

[Coinbase-Artikel - Threshold-Signaturen](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Erklärung & Beispiel](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Kurzes Video über digitale Schnorr-Signaturen](https://youtu.be/r9hJiDrtukI?t=19)

___
___
