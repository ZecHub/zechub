<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Newsletter

ZecWeekly ist ein Newsletter, der jeden Sonntagmorgen erscheint. Er enthält alle Nachrichten, die sich während der Woche im Zcash-Ökosystem ereignet haben. Die Nachrichten werden wöchentlich von Community-Mitgliedern kuratiert und alle relevanten Links werden dem Newsletter hinzugefügt. Bitte abonniere den Newsletter [hier](https://zechub.substack.com/).

## Mitwirken

Beiträge zum Newsletter funktionieren am besten, wenn ein Mitwirkender die Ausgabe für die richtige Woche vorbereitet, dem aktuellen Bounty- oder Koordinationsthread folgt und den Pull Request einreicht, nachdem die wöchentlichen Links bereit sind. Bitte reiche keine zukünftige Ausgabe ein, bevor ZecHub das Datum für diese Ausgabe veröffentlicht oder bestätigt hat. Frühe Pull Requests übersehen häufig Aktualisierungen zum Ende der Woche, kollidieren mit einem zugewiesenen Kurator oder verwenden die falsche Frist.

### 1. Die aktuelle Ausgabe bestätigen

Bevor du mit dem Schreiben beginnst:

- Prüfe [ZEC Bounties ](https://bounties.zechub.wiki/) auf die aktuelle Newsletter-Aufgabe.
- Warte auf deine Zuweisung

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Das Repository forken

Wenn du neu bei GitHub bist, verwende diesen Ablauf:

1. Öffne das [ZecHub-Repository](https://github.com/ZecHub/zechub).
2. Klicke auf **Fork** und erstelle einen Fork unter deinem GitHub-Konto.
3. Erstelle in deinem Fork einen neuen Branch für die Ausgabe. Ein eindeutiger Branch-Name ist hilfreich, zum Beispiel `digest-may-30-2026`.
4. Stelle sicher, dass dein Pull Request `ZecHub/zechub` als Basis-Repository und `main` als Basis-Branch verwendet.

Wenn du die Kommandozeile verwendest, sieht derselbe Ablauf so aus:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Ersetze `YOUR-USERNAME` durch deinen eigenen GitHub-Benutzernamen. Die obige URL ist ein Platzhalter und wird in dieser Form nicht aufgelöst.

### 3. Die Newsletter-Datei erstellen

Verwende die [Newsletter-Vorlage](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) als Ausgangspunkt. Newsletter-Ausgaben gehören in den Ordner [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Beim Erstellen der Datei:

- Halte dich an das vom Issue verlangte oder von kürzlich akzeptierten Ausgaben verwendete Dateinamenformat.
- Behalte dieselbe Abschnittsreihenfolge wie in der Vorlage bei, sofern die Aufgabe kein anderes Format verlangt.
- Füge nur Links aus der relevanten Woche hinzu.
- Schreibe für jeden Link eine kurze, klare Beschreibung, damit Leser verstehen, warum er wichtig ist.
- Übersetze oder fasse nicht englischsprachige Quellen bei Bedarf auf Englisch zusammen.
- Prüfe jeden Link, bevor du den Pull Request eröffnest.

### 4. Links zum richtigen Zeitpunkt sammeln

ZecWeekly deckt normalerweise die Aktivitäten des Zcash-Ökosystems der aktuellen Woche ab und wird gegen Ende der Woche veröffentlicht. Der sicherste Zeitpunkt ist:

- Beginne mit dem Sammeln von Links, nachdem das aktuelle Newsletter-Issue oder die Aufgabe veröffentlicht wurde.
- Führe einen Entwurf, während die Woche noch läuft.
- Reiche den Pull Request nahe dem gewünschten Einreichungsdatum ein, nachdem du auf Aktualisierungen zum Ende der Woche geprüft hast.
- Reiche keinen Newsletter für eine zukünftige Woche ein, bevor die Aufgabe für dieses Datum existiert oder ZecHub bestätigt, dass du ihn vorbereiten sollst.

Wenn ein Issue die Einreichung bis zu einem bestimmten Datum verlangt, halte dich an dieses Datum. Falls es einen Konflikt zwischen dieser Seite und einem aktuellen Issue gibt, folge dem aktuellen Issue.

### 5. Den Pull Request eröffnen

Wenn deine Newsletter-Datei fertig ist:

1. Committe deine Änderungen in deinen Fork.
2. Eröffne einen Pull Request in `ZecHub/zechub` auf dem `main`-Branch.
3. Verwende einen Titel, der zur Ausgabe passt, zum Beispiel `Zcash Ecosystem Digest | May 30th`.
4. Verlinke das Issue im Textkörper des Pull Requests, damit Reviewer die Arbeit mit der Aufgabe verbinden können.

Beispiel für den Textkörper eines Pull Requests:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Nachdem der Pull Request eröffnet ist, achte auf Review-Kommentare. Wenn ZecHub Änderungen anfordert, aktualisiere denselben Branch, statt einen zweiten Pull Request für dieselbe Ausgabe zu eröffnen.

### Reale Beispiele

Verwende diese gemergten Newsletter-Pull-Requests als Beispiele für akzeptierte Einreichungen:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Beispiel eines gemergten ZecWeekly-Newsletter-Pull-Requests](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Wenn du deine Arbeit mit einem Beispiel vergleichst, konzentriere dich auf den Speicherort der Datei, das Titelformat, die Abschnittsreihenfolge, die Linkbeschreibungen und darauf, ob der Pull Request auf die richtige Aufgabe zurückverweist.

### Häufige Fehler, die du vermeiden solltest

- Einen Pull Request eröffnen, bevor das Ausgabedatum oder die Aufgabe bestätigt ist.
- An einem Issue arbeiten, das bereits einen verlinkten Pull Request hat.
- Den Pull Request in deinen eigenen Fork statt in `ZecHub/zechub` einreichen.
- Den falschen Dateinamen verwenden oder die Datei außerhalb des Ordners `newsletter` ablegen.
- Eine alte Ausgabe kopieren, ohne jedes Datum, jeden Link und jede Beschreibung zu aktualisieren.
- Links aus der falschen Woche hinzufügen.
- Defekte Links, doppelte Links oder Platzhaltertext aus der Vorlage stehen lassen.
- Nach Review-Kommentaren einen neuen Pull Request eröffnen, statt den ursprünglichen Branch zu aktualisieren.

### Abschließende Checkliste

Bestätige vor der Anforderung eines Reviews Folgendes:

- Das Datum des Issues oder der Aufgabe stimmt mit deiner Newsletter-Datei überein.
- Kein anderer offener Pull Request deckt bereits dasselbe Issue oder dieselbe Ausgabe ab.
- Die Datei befindet sich im Ordner `newsletter`.
- Die Abschnitte der Vorlage sind vollständig.
- Jeder Link funktioniert und hat eine nützliche Beschreibung.
- Der Textkörper des Pull Requests verlinkt das richtige Issue.
- Du bist verfügbar, um Änderungen vorzunehmen, falls Reviewer diese anfordern.

## Frühere Ausgaben

[ZecWeekly-Archiv](https://zechub.substack.com/p/archive)
