<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly-Newsletter

ZecWeekly ist ein Newsletter, der jeden Sonntagmorgen erscheint. Er enthält alle Neuigkeiten, die während der Woche im Zcash-Ökosystem passiert sind. Die Nachrichten werden jede Woche von Community-Mitgliedern kuratiert, und alle relevanten Links werden dem Newsletter hinzugefügt. Bitte abonnieren Sie den Newsletter [hier](https://zechub.substack.com/).

## Mitwirken

Beiträge zum Newsletter funktionieren am besten, wenn ein Mitwirkender die Ausgabe für die richtige Woche vorbereitet, dem aktuellen Bounty- oder Koordinationsthread folgt und den Pull Request einreicht, nachdem die wöchentlichen Links fertig sind. Bitte reichen Sie keine zukünftige Ausgabe ein, bevor ZecHub das Datum für diese Ausgabe veröffentlicht oder bestätigt hat. Früh eingereichte Pull Requests verpassen oft späte Updates der Woche, geraten mit einem zugewiesenen Kurator in Konflikt oder verwenden die falsche Frist.

### 1. Die aktuelle Ausgabe bestätigen

Bevor Sie mit dem Schreiben beginnen:

- Prüfen Sie [ZEC Bounties ](https://bounties.zechub.wiki/) auf die aktuelle Newsletter-Aufgabe.
- Warten Sie, bis Ihnen die Aufgabe zugewiesen wird

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. Das Repository forken

Wenn Sie neu bei GitHub sind, verwenden Sie diesen Workflow:

1. Öffnen Sie das [ZecHub-Repository](https://github.com/ZecHub/zechub).
2. Klicken Sie auf **Fork** und erstellen Sie einen Fork unter Ihrem GitHub-Konto.
3. Erstellen Sie in Ihrem Fork einen neuen Branch für die Ausgabe. Ein klarer Branch-Name ist hilfreich, zum Beispiel `digest-may-30-2026`.
4. Stellen Sie sicher, dass Ihr Pull Request `ZecHub/zechub` als Basis-Repository und `main` als Basis-Branch verwendet.

Wenn Sie die Kommandozeile verwenden, sieht derselbe Workflow so aus:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Die Newsletter-Datei erstellen

Verwenden Sie die [Newsletter-Vorlage](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) als Ausgangspunkt. Newsletter-Ausgaben gehören in den Ordner [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Beim Erstellen der Datei:

- Verwenden Sie das Dateinamenformat, das im Issue angefordert wird oder in kürzlich akzeptierten Ausgaben verwendet wurde.
- Behalten Sie dieselbe Reihenfolge der Abschnitte wie in der Vorlage bei, sofern die Aufgabe kein anderes Format verlangt.
- Fügen Sie nur Links aus der relevanten Woche hinzu.
- Schreiben Sie für jeden Link eine kurze, klare Beschreibung, damit die Leser verstehen, warum er wichtig ist.
- Übersetzen oder fassen Sie nicht englischsprachige Quellen bei Bedarf auf Englisch zusammen.
- Prüfen Sie jeden Link, bevor Sie den Pull Request eröffnen.

### 4. Links zum richtigen Zeitpunkt sammeln

ZecWeekly deckt normalerweise die Aktivitäten im Zcash-Ökosystem der aktuellen Woche ab und wird gegen Ende der Woche veröffentlicht. Der sicherste Zeitpunkt ist:

- Beginnen Sie mit dem Sammeln von Links, nachdem die aktuelle Newsletter-Ausgabe oder Aufgabe veröffentlicht wurde.
- Führen Sie einen Entwurf, während die Woche noch läuft.
- Reichen Sie den Pull Request kurz vor dem gewünschten Einreichungsdatum ein, nachdem Sie auf späte Updates der Woche geprüft haben.
- Reichen Sie den Newsletter einer zukünftigen Woche nicht ein, bevor die Aufgabe für dieses Datum existiert oder bevor ZecHub bestätigt, dass Sie ihn vorbereiten sollen.

Wenn in einem Issue steht, dass bis zu einem bestimmten Datum eingereicht werden soll, halten Sie sich an dieses Datum. Wenn es einen Konflikt zwischen dieser Seite und einem aktuellen Issue gibt, folgen Sie dem aktuellen Issue.

### 5. Den Pull Request eröffnen

Wenn Ihre Newsletter-Datei fertig ist:

1. Committen Sie Ihre Änderungen in Ihren Fork.
2. Eröffnen Sie einen Pull Request in `ZecHub/zechub` auf dem `main`-Branch.
3. Verwenden Sie einen Titel, der zur Ausgabe passt, zum Beispiel `Zcash Ecosystem Digest | May 30th`.
4. Verlinken Sie das Issue im Text des Pull Requests, damit die Reviewer die Arbeit der Aufgabe zuordnen können.

Beispiel für den Pull-Request-Text:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Nachdem der Pull Request eröffnet wurde, achten Sie auf Review-Kommentare. Wenn ZecHub um Änderungen bittet, aktualisieren Sie denselben Branch, anstatt einen zweiten Pull Request für dieselbe Ausgabe zu eröffnen.

### Reale Beispiele

Verwenden Sie diese zusammengeführten Newsletter-Pull-Requests als Beispiele für akzeptierte Einreichungen:

- [Zcash Ecosystem Digest | 11. April](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28. März](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14. Februar](https://github.com/ZecHub/zechub/pull/1474)


![Beispiel für einen zusammengeführten ZecWeekly-Newsletter-Pull-Request](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

Wenn Sie Ihre Arbeit mit einem Beispiel vergleichen, achten Sie auf den Speicherort der Datei, das Titelformat, die Reihenfolge der Abschnitte, die Link-Beschreibungen und darauf, ob der Pull Request auf die richtige Aufgabe zurückverweist.

### Häufige Fehler, die Sie vermeiden sollten

- Einen Pull Request zu eröffnen, bevor das Ausgabedatum oder die Aufgabe bestätigt ist.
- An einem Issue zu arbeiten, das bereits einen verknüpften Pull Request hat.
- Den Pull Request in Ihren eigenen Fork statt in `ZecHub/zechub` einzureichen.
- Den falschen Dateinamen zu verwenden oder die Datei außerhalb des Ordners `newsletter` abzulegen.
- Eine alte Ausgabe zu kopieren, ohne jedes Datum, jeden Link und jede Beschreibung zu aktualisieren.
- Links aus der falschen Woche hinzuzufügen.
- Defekte Links, doppelte Links oder Platzhaltertext aus der Vorlage stehen zu lassen.
- Nach Review-Kommentaren einen neuen Pull Request zu eröffnen, anstatt den ursprünglichen Branch zu aktualisieren.

### Abschließende Checkliste

Bevor Sie ein Review anfordern, bestätigen Sie Folgendes:

- Das Datum des Issues oder der Aufgabe stimmt mit Ihrer Newsletter-Datei überein.
- Kein anderer offener Pull Request deckt bereits dasselbe Issue oder dieselbe Ausgabe ab.
- Die Datei befindet sich im Ordner `newsletter`.
- Die Abschnitte der Vorlage sind vollständig.
- Jeder Link funktioniert und hat eine nützliche Beschreibung.
- Der Text des Pull Requests verlinkt das richtige Issue.
- Sie sind verfügbar, um Änderungen vorzunehmen, falls Reviewer Änderungen anfordern.

## Frühere Ausgaben

[ZecWeekly-Archiv](https://zechub.substack.com/p/archive)
