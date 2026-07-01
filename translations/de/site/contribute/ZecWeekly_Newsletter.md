<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ZecWeekly-Newsletter

ZecWeekly ist ein Newsletter, der jeden Freitagmorgen erscheint. Er enthält alle Neuigkeiten, die während der Woche im Zcash-Ökosystem passiert sind.

Die Nachrichten werden wöchentlich von Community-Mitgliedern kuratiert, und alle relevanten Links werden dem Newsletter hinzugefügt.

Bitte abonnieren Sie den Newsletter [hier](https://zechub.substack.com/).

## Mitwirken

Beiträge zum Newsletter funktionieren am besten, wenn eine mitwirkende Person die Ausgabe für die richtige Woche vorbereitet, dem aktuellen Bounty- oder Koordinations-Thread folgt und den Pull Request einreicht, nachdem die wöchentlichen Links bereit sind. Bitte reichen Sie keine zukünftige Ausgabe ein, bevor ZecHub für diese Ausgabe gepostet oder das Datum bestätigt hat. Früh eingereichte Pull Requests verpassen oft Aktualisierungen vom Ende der Woche, kollidieren mit einer zugewiesenen kuratierenden Person oder verwenden die falsche Frist.

### 1. Die aktuelle Ausgabe bestätigen

Bevor Sie mit dem Schreiben beginnen:

- Prüfen Sie die [ZecHub GitHub-Issues](https://github.com/ZecHub/zechub/issues) und [Dework](https://app.dework.xyz/zechub-2424) auf die aktuelle Newsletter-Aufgabe.
- Verwenden Sie das Datum im Issue-Titel oder in der Aufgabenbeschreibung als maßgebliche Quelle.
- Öffnen Sie das Issue und prüfen Sie, ob bereits eine andere mitwirkende Person kommentiert hat, zugewiesen wurde oder einen verknüpften Pull Request eröffnet hat.
- Durchsuchen Sie offene Pull Requests nach der Issue-Nummer und dem Ausgabedatum, bevor Sie beginnen. Suchen Sie zum Beispiel nach `is:pr is:open "May 30th" repo:ZecHub/zechub`.
- Wenn die Aufgabe unklar ist, fragen Sie im Issue, im ZecHub-Discord oder per Nachricht an [ZecHub auf Twitter](https://twitter.com/ZecHub) nach, bevor Sie die vollständige Ausgabe vorbereiten.

![Offene GitHub-Issues, gefiltert nach aktuellen ZecWeekly-Newsletter-Aufgaben](assets/zecweekly-current-task-search.png)

### 2. Das Repository forken

Wenn Sie neu auf GitHub sind, verwenden Sie diesen Ablauf:

1. Öffnen Sie das [ZecHub-Repository](https://github.com/ZecHub/zechub).
2. Klicken Sie auf **Fork** und erstellen Sie einen Fork unter Ihrem GitHub-Konto.
3. Erstellen Sie in Ihrem Fork einen neuen Branch für die Ausgabe. Ein klarer Branch-Name ist hilfreich, zum Beispiel `digest-may-30-2026`.
4. Stellen Sie sicher, dass Ihr Pull Request `ZecHub/zechub` als Basis-Repository und `main` als Basis-Branch verwendet.

Wenn Sie die Kommandozeile verwenden, sieht derselbe Ablauf so aus:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Die Newsletter-Datei erstellen

Verwenden Sie die [Newsletter-Vorlage](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) als Ausgangspunkt. Newsletter-Ausgaben gehören in den Ordner [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Beim Erstellen der Datei:

- Verwenden Sie das Dateinamenformat, das im Issue angefordert wird oder in kürzlich akzeptierten Ausgaben verwendet wurde.
- Behalten Sie dieselbe Abschnittsreihenfolge wie in der Vorlage bei, es sei denn, die Aufgabe verlangt ein anderes Format.
- Fügen Sie nur Links aus der relevanten Woche hinzu.
- Schreiben Sie für jeden Link eine kurze, klare Beschreibung, damit Leserinnen und Leser verstehen, warum er wichtig ist.
- Übersetzen oder fassen Sie nicht-englische Quellen bei Bedarf auf Englisch zusammen.
- Prüfen Sie jeden Link, bevor Sie den Pull Request eröffnen.

### 4. Links zum richtigen Zeitpunkt sammeln

ZecWeekly deckt normalerweise die Aktivitäten im Zcash-Ökosystem der aktuellen Woche ab und wird gegen Ende der Woche veröffentlicht. Der sicherste Zeitpunkt ist:

- Beginnen Sie mit dem Sammeln von Links, nachdem das aktuelle Newsletter-Issue oder die Aufgabe veröffentlicht wurde.
- Führen Sie einen Entwurf, solange die Woche noch läuft.
- Reichen Sie den Pull Request nahe am angeforderten Einreichungsdatum ein, nachdem Sie auf Aktualisierungen vom Ende der Woche geprüft haben.
- Reichen Sie keinen Newsletter für eine zukünftige Woche ein, bevor die Aufgabe für dieses Datum existiert oder bevor ZecHub bestätigt, dass Sie ihn vorbereiten sollen.

Wenn in einem Issue steht, dass bis zu einem bestimmten Datum eingereicht werden soll, folgen Sie diesem Datum. Wenn es einen Konflikt zwischen dieser Seite und einem aktuellen Issue gibt, folgen Sie dem aktuellen Issue.

### 5. Den Pull Request eröffnen

Wenn Ihre Newsletter-Datei fertig ist:

1. Committen Sie Ihre Änderungen in Ihren Fork.
2. Eröffnen Sie einen Pull Request in `ZecHub/zechub` auf den Branch `main`.
3. Verwenden Sie einen Titel, der zur Ausgabe passt, zum Beispiel `Zcash Ecosystem Digest | May 30th`.
4. Verknüpfen Sie das Issue im Text des Pull Requests, damit Reviewer die Arbeit der Aufgabe zuordnen können.

Beispiel für den Text eines Pull Requests:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Nachdem der Pull Request eröffnet wurde, achten Sie auf Review-Kommentare. Wenn ZecHub um Änderungen bittet, aktualisieren Sie denselben Branch, anstatt einen zweiten Pull Request für dieselbe Ausgabe zu eröffnen.

### Reale Beispiele

Verwenden Sie diese gemergten Newsletter-Pull-Requests als Beispiele für akzeptierte Einreichungen:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![Beispiel für einen gemergten ZecWeekly-Newsletter-Pull-Request](assets/zecweekly-example-pr.png)

Wenn Sie Ihre Arbeit mit einem Beispiel vergleichen, achten Sie besonders auf den Speicherort der Datei, das Titelformat, die Reihenfolge der Abschnitte, die Link-Beschreibungen und darauf, ob der Pull Request korrekt mit der passenden Aufgabe verknüpft ist.

### Häufige Fehler, die vermieden werden sollten

- Einen Pull Request eröffnen, bevor das Ausgabedatum oder die Aufgabe bestätigt ist.
- An einem Issue arbeiten, das bereits einen verknüpften Pull Request hat.
- Den Pull Request an Ihren eigenen Fork statt an `ZecHub/zechub` senden.
- Den falschen Dateinamen verwenden oder die Datei außerhalb des Ordners `newsletter` ablegen.
- Eine alte Ausgabe kopieren, ohne jedes Datum, jeden Link und jede Beschreibung zu aktualisieren.
- Links aus der falschen Woche hinzufügen.
- Defekte Links, doppelte Links oder Platzhaltertext aus der Vorlage stehen lassen.
- Nach Review-Kommentaren einen neuen Pull Request eröffnen, anstatt den ursprünglichen Branch zu aktualisieren.

### Abschließende Checkliste

Bevor Sie um ein Review bitten, stellen Sie sicher, dass:

- Das Datum des Issues oder der Aufgabe mit Ihrer Newsletter-Datei übereinstimmt.
- Kein anderer offener Pull Request bereits dasselbe Issue oder dieselbe Ausgabe abdeckt.
- Die Datei im Ordner `newsletter` liegt.
- Die Vorlagenabschnitte vollständig sind.
- Jeder Link funktioniert und eine nützliche Beschreibung hat.
- Der Text des Pull Requests das richtige Issue verlinkt.
- Sie verfügbar sind, um Änderungen vorzunehmen, falls Reviewer Änderungen anfordern.

## Frühere Ausgaben

[ZecWeekly-Archiv](https://zechub.substack.com/p/archive)
