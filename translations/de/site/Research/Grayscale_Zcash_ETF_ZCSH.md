# Der Grayscale Zcash ETF (ZCSH)

**Zcash hat keinen ETF aufgelegt. Grayscale hat es**, indem es einen Fonds umgewandelt hat, den es
seit 2017 verwaltet. Zcash ist ein Protokoll — es hat kein Unternehmen, keine Treasury und keinen Vorstand,
der einen Fonds ausgeben könnte. Grayscale ist ein unabhängiger Vermögensverwalter, der
ZEC auf dem offenen Markt kauft wie alle anderen auch.

Diese Unterscheidung ist das am häufigsten missverstandene Element von ZCSH, und hier
setzt diese Seite an. Am 25. August 2026 begann der Fonds an der NYSE Arca unter dem Namen
*The Zcash ETF* zu handeln, als erstes US-Spot-Exchange-Traded-Product für Zcash, und ist
heute einer der größten einzelnen Halter von ZEC überhaupt.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Derselbe Fonds, drei Phasen

| Wann | Was sich änderte |
| --- | --- |
| Oktober 2017 | Start als Privatplatzierung, nur für akkreditierte Anleger |
| Oktober 2021 | Anteile werden unter dem Ticker ZCSH an OTCQX notiert und mit einem Abschlag auf den NAV gehandelt |
| 25. August 2026 | Wird ein rückgabefähiges ETP an NYSE Arca und streicht „Trust“ aus dem Namen |

Der Schritt von 2026 ist nicht bloß kosmetisch. Ein außerbörslich notierter Trust verfügt über keinen
Rückgabemechanismus, sodass seine Anteile mit einem Auf- oder Abschlag gegenüber dem Wert
der zugrunde liegenden Vermögenswerte gehandelt werden können, teils erheblich — genau das
geschah zwischen 2021 und 2026. Ein börsengehandeltes Produkt mit funktionierenden
Schöpfungs- und Rückgabeprozessen besitzt einen Arbitrageweg, der den Anteilspreis
an den Nettoinventarwert bindet. Der Wechsel von einem zum anderen verändert, wie das
Wertpapier funktioniert.

## Wer welche Aufgabe übernimmt

| Rolle | Partei |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Treuhänder | CSC Delaware Trust Company |
| Administrator und Transferstelle | The Bank of New York Mellon |
| Prime Broker | Coinbase, Inc. — beschafft ZEC für den Trust |
| Autorisierte Teilnehmer | Jane Street, Virtu — schaffen und geben Anteile zurück |
| Marketing-Agent | Foreside Fund Services |
| **Verwahrer** | **Coinbase Custody Trust Company, LLC** — der einzige Ort, an dem tatsächliche ZEC existieren |

Keine dieser Parteien allein ist der Fonds. Die Struktur ist die Vereinbarung
zwischen ihnen, die im obigen Diagramm dargestellt wird. Mehrere dieser Rollen
fehlten in der Berichterstattung zum Zeitpunkt der Notierung oder wurden darin falsch dargestellt;
die Liste hier folgt der S-3-Registrierungserklärung von Grayscale bei EDGAR.

## Wie Anteile geschaffen und zurückgegeben werden

Nur Authorized Participants — registrierte Broker-Dealer mit einer Vereinbarung mit
dem Sponsor — können Anteile schaffen oder zurückgeben, und zwar nur in Blöcken von 10.000,
den sogenannten Baskets. Ein gewöhnlicher Anleger kommt mit diesem Mechanismus nie in Berührung;
er kauft und verkauft bestehende Anteile wie jedes andere notierte Wertpapier an der Börse.

Der Mechanismus erfolgt derzeit **in bar**, nicht in Form von Sachleistungen. Ein Authorized Participant
zahlt Bargeld auf ein Bargeldkonto ein oder erhält Bargeld daraus, und ein externer
Liquiditätsanbieter beschafft oder veräußert tatsächlich die ZEC. Die
Registrierungserklärung beschreibt auch einen Sachleistungsprozess, bei dem ein
Authorized Participant ZEC direkt beim Trust hinterlegen oder ZEC von ihm erhalten würde
— sie stellt jedoch klar, dass „In-Kind Regulatory Approval has not
been obtained“ und möglicherweise niemals erteilt wird.

Im Barprozess wechseln ZEC also zwischen dem Liquiditätsanbieter
und dem Markt den Besitzer, niemals zwischen dem Anleger und dem Trust. Niemand im
Privatanlegerpfad berührt eine Zcash-Adresse.

## Die Gebühr wird in ZEC gezahlt

Die Sponsorengebühr beträgt zum Zeitpunkt der Notierung **2,5 % pro Jahr**. Sie läuft täglich als
Prozentsatz des Nettoinventarwerts auf und ist, in den Worten des Antrags, „payable in ZEC
to the Sponsor daily in arrears.“

Die Folge ist strukturell und nicht nebensächlich. Die Gebühr wird aus den
ZEC des Fonds gezahlt, sodass die Menge an ZEC, die jeden Anteil deckt, jeden
Tag ein wenig sinkt. Ein Anteil ist keine feste Menge an ZEC, die unbegrenzt gehalten wird;
er ist ein Anspruch auf eine langsam schrumpfende Menge. Wer ein langfristiges Engagement in ZCSH
mit dem bloßen Halten von ZEC vergleicht, muss dies in den Vergleich einbeziehen.

Zum Vergleich: 2,5 % entsprechen ungefähr dem Zehnfachen der Gebühr eines typischen Spot-Bitcoin-ETF.
Grayscale hat erklärt, dass frühe Erträge aus der Sponsorengebühr wieder in die Entwicklung
des Zcash-Ökosystems fließen werden.

## Was ein Anteilseigner tatsächlich besitzt

Ein Anteil bietet ein Engagement gegenüber dem Preis von ZEC. Er ist nicht ZEC.

Ein Anteilseigner kann keine abgeschirmte Transaktion senden, kein Memo anhängen,
keine Unified Address halten und keine Selbstverwahrung nutzen. Keine der Eigenschaften,
durch die sich Zcash von anderen Vermögenswerten unterscheidet, ist über den Wrapper verfügbar —
der Wrapper vermittelt den Preis und nichts weiter. Für einen Anleger, dessen Ziel ein Engagement
innerhalb eines Broker- oder Rentenkontos ist, ist das genau der Zweck. Für alle,
deren Interesse an Zcash dem Datenschutz gilt, ist der ETF kein Ersatz für
eine Wallet, und beides sind nicht wirklich Alternativen zueinander.

## Die ZEC werden offen gehalten

Die Struktur birgt eine weitere Ironie, und sie ist der prägnanteste Punkt auf
dieser Seite. Coinbase Custody hält die ZEC des Trusts in **transparenten**
Adressen, nicht in abgeschirmten. Die Bestände des Fonds sind auf der Chain sichtbar,
zum Verwahrer zurückverfolgbar und in Echtzeit für jeden beobachtbar, der nachsehen möchte.
Nichts in diesem Fonds verwendet eine abgeschirmte Adresse.

Das ist kein Versehen. Regulierte Fondsinfrastruktur ist auf Prüfung
und Bestätigung ausgelegt, und ein abgeschirmtes Guthaben ist genau das, was ein Prüfer nicht
unabhängig verifizieren kann. Der eigene Support von Coinbase spiegelt dieselbe Asymmetrie wider:
Er empfängt ZEC, die von einer abgeschirmten Adresse gesendet wurden, sendet aber keine ZEC an
eine solche.

Der größte institutionelle Halter eines Datenschutz-Assets hält es also in der einzigen
Form, die keinen Datenschutz bietet. Dieser Punkt stützt sich auf Berichterstattung statt auf
die Anträge — das S-3 beschreibt die Verwahrung der privaten Schlüssel des Trusts, charakterisiert
jedoch keine Adresstypen — und wird hier mit diesem Vorbehalt dargestellt.

## Wie viel ZEC beteiligt ist

Bei der Notierung am 25. August 2026 hielt der Fonds ungefähr **387.000 ZEC**, mit
rund **313 Millionen US-Dollar** verwaltetem Vermögen.

Für eine längerfristige Betrachtung: Zum 30. September 2025 gab der Antrag an, dass der Trust
ungefähr **2,4 % der umlaufenden ZEC** hielt. Beide Zahlen verändern sich — die erste mit dem
Preis von ZEC sowie mit Schöpfungen und Rückgaben, die zweite, weil die Gebühr aus
den Beständen bezahlt wird — verwenden Sie daher eine aktuelle Zahl aus dem jüngsten Antrag oder
der täglichen Offenlegung des Fonds statt von dieser Seite.

## Quellen

Alle primär, alle bei EDGAR unter CIK 1720265, sofern nicht anders angegeben.

- [Grayscale Zcash Trust (ZEC) — EDGAR Antragsindex](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Form S-3-Registrierungserklärung, November 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — die Rollen der Beteiligten, Mechanismen zur Schöpfung und Rückgabe, Sponsorengebühr und Anteil der umlaufenden ZEC
- [Form 10-K für das am 31. Dezember 2024 endende Geschäftsjahr](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [Der Zcash ETF beginnt den Handel an NYSE Arca, 25. August 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust Fondsseite](https://www.grayscale.com/funds/grayscale-zcash-trust) — Auflegungsdaten und aktuelle Offenlegungen
- [Der erste Privacy-Coin-ETF: Einblick in den Antrag von Grayscale für Zcash](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — Sekundärquelle; die einzige gefundene Quelle, die angibt, dass die ZEC des Trusts in transparenten Adressen gehalten werden

Die Zahlen entsprechen den angegebenen Daten und werden sich verändern. Geprüft am 30. September 2026.
Nur für Bildungszwecke, keine Anlageberatung.
