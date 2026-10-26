# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Private ZEC-Spenden als gemeinnützige US-Organisation annehmen

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Mittelstufe – 10 Min.
</span>

> Diese Seite dient der allgemeinen Information und stellt keine Rechts- oder Steuerberatung dar. Die US-Steuervorschriften ändern sich; prüfen Sie daher jeden Schritt mit Ihrem Steuerberater oder Steuerberaterin. Jede untenstehende Regel verweist auf ihre IRS-Quelle, geprüft im Oktober 2026 anhand der Publication 526 (für Steuererklärungen 2025) und des Form 8283 (Revision Dezember 2025). Die IRS-FAQ zu virtuellen Währungen wurde für Transaktionen vor 2025 verfasst; vergleichen Sie sie daher mit den aktuellen Richtlinien.

## Kurzfassung

- Bewahren Sie Spenden in einer shielded Wallet auf, die Ihre Organisation kontrolliert, nicht in der persönlichen Wallet eines Mitarbeiters.
- Der IRS behandelt ZEC als Vermögenswert, daher ist eine ZEC-Schenkung eine Sachspende.
- Bei einer Spende von 250 $ oder mehr senden Sie dem Spender eine schriftliche Bestätigung, die ZEC beschreibt, aber keinen Dollarwert nennt.
- Bei Spenden über 5.000 $ benötigt der Spender ein qualifiziertes Gutachten, und Sie unterschreiben sein Form 8283.
- Wenn Sie ZEC innerhalb von drei Jahren nach Erhalt verkaufen und Abschnitt B des Form 8283 des Spenders unterschrieben haben, reichen Sie Form 8282 ein.
- Ein Spender, der Ihnen gegenüber anonym bleibt, kann in der Regel keinen Abzug von 250 $ oder mehr geltend machen.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Für wen ist das?

- US-Wohltätigkeitsorganisationen nach 501(c)(3), Kirchen und Community-Gruppen, die ZEC annehmen möchten
- Schatzmeister, Buchhalter und Vorstandsmitglieder, die Krypto-Spenden einrichten
- Spender, die wissen möchten, was eine gemeinnützige Organisation von ihnen benötigt

Für Einzelpersonen und Kreative siehe [Spenden privat empfangen](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Das Problem

Die meisten Krypto-Spendendienste für US-Wohltätigkeitsorganisationen geben Ihnen eine transparente Adresse oder wandeln die Spende über eine solche um. Bei einer transparenten Adresse kann jeder jede Spende, ihren Betrag und Ihr Guthaben sehen. Ein Spender, der bewusst privat spendet, verliert diese Privatsphäre in dem Moment, in dem die Spende eingeht.

Eine gemeinnützige Organisation hat zudem Formalitäten, die eine Einzelperson nicht hat: Spendenquittungen, IRS-Formulare für größere Spenden und eine jährliche Steuererklärung. Privatsphäre und diese Formalitäten können zusammen funktionieren, sofern Sie sie planen, bevor die erste Spende eingeht.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Was privat bleibt – und was nicht

| | Shielded-Spende an Ihre shielded Adresse |
|---|---|
| Die Öffentlichkeit | Kann weder den Spender noch Ihre Adresse oder den Betrag sehen |
| Ihre Organisation | Sieht den Betrag und jedes Memo; sieht den Spender nur, wenn dieser sich zu erkennen gibt |
| Ihr Steuerberater | Sieht, was Sie teilen, beispielsweise mit einem [Viewing Key](/zcash-tech/viewing-keys) |
| Beim Verkauf | Wenn Ihre Börse nur transparente Einzahlungen akzeptiert, wird der Betrag, den Sie aus dem shielded Pool transferieren, öffentlich (siehe [das Drehkreuz](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Was Sie benötigen

- Eine vom Vorstand genehmigte Richtlinie zur Annahme von Spenden, die Kryptowährungen abdeckt
- Eine [Wallet](/using-zcash/wallets) mit shielded Adressen, die von der Organisation kontrolliert wird
- Ein Börsenkonto auf den Namen der Organisation, falls Sie ZEC in Dollar umtauschen möchten
- Einen Steuerberater, der Erfahrung mit Sachspenden hat

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Schritt-für-Schritt-Anleitung

### Schritt 1: Ihre Richtlinie festlegen

Halten Sie Folgendes schriftlich fest und lassen Sie es von Ihrem Vorstand genehmigen:
- Wer Gelder bewegen darf und ob jede Bewegung von zwei Personen genehmigt werden muss
- Ob Sie jede Spende sofort verkaufen oder einen Teil von ZEC halten
- Ob Sie anonyme Spenden akzeptieren und bis zu welchem Betrag

### Schritt 2: Eine von der Organisation kontrollierte Wallet einrichten

- Erstellen Sie die Wallet auf einem Gerät der Organisation, nicht auf einem privaten Telefon
- Bewahren Sie die Seed-Phrase offline bei zwei Verantwortlichen auf, die jeweils darauf zugreifen können
- Für gemeinsame Kontrolle siehe [Eine private Community-Treasury betreiben](/zcash-use-cases/private-community-treasury)

### Schritt 3: Eine shielded Adresse veröffentlichen

- Teilen Sie auf Ihrer Spendenseite eine ausschließlich shielded Adresse. Eine [Unified Address](/using-zcash/unified-addresses) beginnt mit `u1`, kann aber auch einen transparenten Receiver enthalten; eine Spende aus einer nur transparenten Wallet geht dann öffentlich ein. Nutzen Sie die ausschließlich shielded Adresse Ihrer Wallet, falls diese eine anbietet.
- Veröffentlichen Sie keine transparente Adresse (sie beginnt mit `t1` oder `t3`).
- Bitten Sie Spender, die eine Quittung möchten, ihre E-Mail-Adresse in das [Memo](/using-zcash/memos) zu schreiben. Das Memo ist verschlüsselt, sodass nur Ihre Organisation es lesen kann.

### Schritt 4: Jede Spende erfassen

Erfassen Sie für jede Spende:
- Datum und Uhrzeit des Eingangs
- Betrag in ZEC
- Wert in US-Dollar zu diesem Zeitpunkt sowie die verwendete Preisquelle
- Transaktions-ID und Memo

Der IRS behandelt ZEC als Vermögenswert ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), daher ist dies in Ihren Büchern eine Sachspende. Um Ihrem Steuerberater schreibgeschützten Zugriff zu geben, siehe [Aufzeichnungen mit shielded ZEC führen](/zcash-use-cases/keeping-records-with-shielded-zec).

### Schritt 5: Spenden von 250 $ oder mehr bestätigen

Ein Spender kann eine einzelne Spende von 250 $ oder mehr ohne Ihre schriftliche Bestätigung nicht absetzen ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Geben Sie bei einer ZEC-Spende Folgendes an:
- Den Namen Ihrer Organisation
- Das Datum, an dem Sie sie erhalten haben
- Eine Beschreibung der Spende, beispielsweise „1,5 ZEC“. Nennen Sie keinen Dollarwert: Die Bewertung der Spende ist Aufgabe des Spenders.
- Ob Sie eine Gegenleistung erbracht haben, beispielsweise „Für diesen Beitrag wurden keine Waren oder Dienstleistungen als Gegenleistung erbracht.“

Der Spender muss die Bestätigung erhalten, bevor er seine Steuererklärung einreicht ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Organisationen versenden sie üblicherweise bis zum 31. Januar des Folgejahres; am einfachsten ist es, sie sofort zu senden.

### Schritt 6: Form 8283 für Spenden über 5.000 $ unterschreiben

Wenn ein Spender mehr als 5.000 $ geltend macht, benötigt er ein qualifiziertes Gutachten. Krypto gilt nicht als öffentlich gehandelte Wertschrift, daher ist das Gutachten dafür erforderlich ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). Der Spender bringt Ihnen [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), und Sie unterschreiben den Teil für den Empfänger in Abschnitt B. Ihre Unterschrift bestätigt, dass Sie ZEC an diesem Datum erhalten haben; sie bestätigt nicht den vom Spender angegebenen Wert ([IRS FAQ, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Schritt 7: Bei Bedarf in Dollar umtauschen

- Prüfen Sie unter [Verwahrte Börsen](/using-zcash/custodial-exchanges), welche Börsen shielded Einzahlungen akzeptieren. Viele akzeptieren nur transparente Einzahlungen.
- Wenn Ihre Börse nur transparente Einzahlungen akzeptiert, transferieren Sie ZEC beim Verkauf in einem Schritt von Ihrer shielded Wallet zur Börse. Dieser Betrag wird öffentlich, aber Ihre anderen Spenden und Ihr Guthaben bleiben privat.
- Wenn Sie ZEC innerhalb von drei Jahren nach Erhalt verkaufen und Abschnitt B des Form 8283 des Spenders unterschrieben haben, reichen Sie innerhalb von 125 Tagen nach dem Verkauf [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) ein und senden Sie dem Spender eine Kopie ([IRS FAQ, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Schritt 8: In Ihrer jährlichen Steuererklärung berichten

Melden Sie ZEC-Spenden als Sachspenden in Ihrer Steuererklärung der Form-990-Reihe, zusammen mit [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990), falls dies auf Sie zutrifft. Fragen Sie Ihren Steuerberater, wie anonyme Spenden aufzuführen sind.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Anonyme Spender: Was sie geltend machen können und was nicht

- Privatsphäre gegenüber der Öffentlichkeit ist nicht dasselbe wie Anonymität gegenüber Ihnen. Ein Spender kann privat spenden und dennoch seine E-Mail-Adresse im Memo angeben, um eine Quittung zu erhalten.
- Ein Spender, der Ihnen gegenüber anonym bleibt, kann keine Bestätigung erhalten und daher keine einzelne Spende von 250 $ oder mehr absetzen.
- Bei mehr als 5.000 $ benötigt der Spender außerdem ein Gutachten und Ihre Unterschrift auf Form 8283, was bedeutet, dass er Ihnen seine Identität mitteilen muss.
- Für den Spender ist eine ZEC-Spende, die länger als ein Jahr gehalten wurde, in der Regel zum Marktwert absetzbar, ohne Kapitalertragsteuer auf die Spende ([IRS FAQ, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Sagen Sie dies auf Ihrer Spendenseite, damit Spender entscheiden können, bevor sie spenden.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Häufige Fehler, die Sie vermeiden sollten

- Spenden in der persönlichen Wallet eines Mitarbeiters aufbewahren
- Eine transparente Adresse oder eine Einzahlungsadresse einer Börse als Spendenadresse veröffentlichen
- In der Bestätigung einen Dollarwert angeben
- Innerhalb von drei Jahren verkaufen und Form 8282 vergessen
- Anonymen Spendern einen Steuerabzug versprechen

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Ergebnis

Sie können:
- ZEC annehmen, ohne Ihre Spender oder Ihr Guthaben offenzulegen
- Spendern die Unterlagen geben, die sie für einen Steuerabzug benötigen
- Aufzeichnungen führen, die Ihr Steuerberater und Prüfer kontrollieren können

<br/>

## Quellen

- [IRS: Häufig gestellte Fragen zu Transaktionen mit virtuellen Währungen](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 behandeln Wohltätigkeitsorganisationen)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Wohltätige Beiträge, Nachweis und Offenlegung](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Wohltätige Beiträge](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Bestimmung des Werts gespendeter Vermögenswerte](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: Gutachten für Krypto-Spenden](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) und [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Verwandte Inhalte

- [Spenden privat empfangen](/zcash-use-cases/receive-donations-privately) – dieselbe Idee für Einzelpersonen
- [Aufzeichnungen mit shielded ZEC führen](/zcash-use-cases/keeping-records-with-shielded-zec) – Memos und Viewing Keys für Ihre Buchhaltung
- [Viewing Keys](/zcash-tech/viewing-keys) – schreibgeschützter Zugriff für einen Steuerberater oder Prüfer
- [Das Drehkreuz](/zcash-tech/the-turnstile) – was öffentlich wird, wenn ZEC einen shielded Pool verlässt

<br/>

## Nächster Schritt

- [Eine private Community-Treasury betreiben](/zcash-use-cases/private-community-treasury)

<br/>
