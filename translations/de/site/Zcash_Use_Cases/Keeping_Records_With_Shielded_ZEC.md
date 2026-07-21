# Aufzeichnungen mit shielded ZEC führen

## TL;DR

- Shielded Guthaben sind privat, aber du kannst trotzdem saubere, vollständige Finanzaufzeichnungen führen
- Memos fungieren als einzelne Posten in deinem Hauptbuch, etwa eine Rechnungsnummer oder der Verwendungszweck einer Zahlung
- Mit einem Viewing Key kannst du oder jemand, den du auswählst, etwa ein Buchhalter, deinen Verlauf prüfen, ohne ihn öffentlich zu machen
- Du kannst Einnahmen und Ausgaben für jeden beliebigen Zeitraum summieren, was du für Berichte oder Steuern brauchst
- Nichts davon schwächt deine Privatsphäre, weil du entscheidest, wer was sieht

<br/>

## Für wen ist das?

- Freelancer und kleine Unternehmen, die in ZEC bezahlt werden
- Alle, die Buch führen müssen und dabei privat bleiben wollen
- Personen, die Unterlagen für einen Buchhalter oder für die Steuer vorbereiten

<br/>

## Die Herausforderung

Privatsphäre und Buchführung können wie Gegensätze wirken. Wenn deine Transaktionen shielded sind, sind Beträge und Adressen für die Öffentlichkeit verborgen. Wie führt man dann ordnungsgemäße Bücher oder weist einem Buchhalter seine Einnahmen nach?

Mit Zcash ist das ein falscher Zielkonflikt. Shielded Transaktionen verbergen deine Aktivitäten standardmäßig vor allen, aber Zcash gibt dir auch Werkzeuge, mit denen du deine eigenen Unterlagen gegenüber den Personen offenlegen kannst, die sie benötigen — zu deinen Bedingungen. Du bleibst für die Welt privat und gleichzeitig offen gegenüber deinem Buchhalter.

<br/>

## Memos sind dein Hauptbuch

Jede shielded-Transaktion (`z to z`) kann ein verschlüsseltes [Memo](/using-zcash/memos) enthalten. Für die Buchführung schreibst du in das Memo, wofür die Zahlung gedacht war: eine Rechnungsnummer, einen Kundennamen, einen Projektcode oder eine kurze Notiz wie „Märzmiete“.

Weil das Memo zusammen mit der Transaktion übertragen wird und nur für die beteiligten Parteien lesbar ist, wird es zu einem privaten Einzelposten in deinen Büchern. Wenn du oder dein Kunde bei jeder Zahlung ein klares Memo einfügt, wird dein Transaktionsverlauf zu einem nutzbaren Hauptbuch statt zu einer Liste von Beträgen ohne Kontext.

Eine einfache Gewohnheit: Vereinbare mit Kunden, immer die Rechnungsnummer im Memo anzugeben. Später wird das Zuordnen von Zahlungen zu Rechnungen unkompliziert.

<br/>

## Den eigenen Verlauf prüfen

Um Buch zu führen, musst du deine eigenen Aktivitäten sehen können. Deine Wallet besitzt die Schlüssel, mit denen deine shielded-Transaktionen entschlüsselt werden, daher kann dir deine Wallet das vollständige Bild zeigen: Daten, Beträge, was empfangen wurde, was gesendet wurde und die angehängten Memos.

Das ist der Teil, den die Öffentlichkeit nicht sehen kann — du aber schon, weil es deine Daten sind. Wenn du deinen Verlauf regelmäßig prüfst, statt erst am Jahresende, bleiben deine Aufzeichnungen korrekt und Fehler lassen sich leichter erkennen.

<br/>

## Unterlagen mit einem Buchhalter teilen

Wenn du möchtest, dass jemand anderes deine shielded-Aktivitäten sehen kann, etwa ein Buchhalter oder Prüfer, musst du weder deine Spending Keys herausgeben noch irgendetwas öffentlich machen. Du teilst einen [Viewing Key](/zcash-tech/viewing-keys).

Ein Full Viewing Key ist schreibgeschützt. Er erlaubt dem Inhaber, eingehende und ausgehende Transaktionen für eine Adresse zu sehen, einschließlich Beträgen und Memos, erlaubt ihm aber niemals, deine Guthaben zu bewegen. Genau deshalb ist er das Sichere, was du einem Buchhalter geben solltest. Er bekommt exakt die Sichtbarkeit, die er braucht, dein Geld bleibt unter deiner Kontrolle und der Rest der Welt sieht weiterhin nichts.

Das nennt man selektive Offenlegung, und es ist einer der praktischen Gründe, warum shielded Zcash für ehrliche Buchführung funktioniert statt ihr im Weg zu stehen.

<br/>

## Summen für einen Zeitraum bilden

Für die meisten Berichte brauchst du Summen über einen bestimmten Zeitraum: wie viel du in diesem Quartal erhalten hast, wie viel du gesendet hast, deine Nettoposition. Da du deinen vollständigen Verlauf selbst prüfen kannst, kannst du diese Werte für jeden gewünschten Zeitraum addieren — einen Monat, ein Quartal oder ein Jahr.

Wenn du Memos konsistent hältst, wird das einfacher, weil du Zahlungen danach gruppieren kannst, wofür sie bestimmt waren, und nicht nur nach Datum und Betrag.

<br/>

## Ein Hinweis zu Steuern

Steuerregeln unterscheiden sich von Land zu Land und ändern sich im Laufe der Zeit. Das hier sind daher allgemeine Informationen und keine Steuerberatung. An vielen Orten kann der Erhalt oder die Veräußerung von Kryptowährungen steuerliche Folgen haben, und es kann von dir erwartet werden, Aufzeichnungen darüber zu führen, was du erhalten hast, wann und welchen Wert es zu diesem Zeitpunkt hatte.

Die gute Nachricht ist, dass shielded Zcash dich nicht daran hindert, diese Pflichten zu erfüllen. Du kannst vollständige private Aufzeichnungen führen, sie für den von deiner Steuerbehörde geforderten Zeitraum summieren und sie einem Buchhalter oder einer Steuerbehörde mithilfe eines Viewing Key offenlegen, ohne deine Aktivitäten öffentlich zu machen. Wenn du unsicher bist, welche Pflichten du hast, sprich mit einer qualifizierten Fachkraft in deinem Land.

<br/>

## Häufige Fehler, die du vermeiden solltest

- Memos auszulassen, sodass dir am Jahresende nur Beträge ohne Kontext bleiben
- Eine einzige Adresse für alles wiederzuverwenden, was es schwieriger macht, Kunden oder Verwendungszwecke zu trennen
- Bis zur Steuersaison zu warten, um ein ganzes Jahr Verlauf zu prüfen, statt deine Aufzeichnungen laufend zu führen
- Einen Spending Key zu teilen, obwohl ein schreibgeschützter Viewing Key alles ist, was ein Buchhalter braucht

<br/>

## Verwandte Seiten

- [Memos](/using-zcash/memos) - wie verschlüsselte Memos funktionieren
- [Viewing Keys](/zcash-tech/viewing-keys) - wie man schreibgeschützten Zugriff exportiert und teilt
- [Freelancer-Datenschutz-Setup](/zcash-use-cases/freelance-privacy-setup) - Einkommen privat empfangen, der Schritt vor dem Führen von Aufzeichnungen
