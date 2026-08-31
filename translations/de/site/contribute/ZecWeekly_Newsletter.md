<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ZecWeekly Newsletter

ZecWeekly ist ein Newsletter, der jeden Sonntagmorgen versendet wird. Er enthält alle Neuigkeiten, die während der Woche im Zcash-Ökosystem passiert sind. Die Nachrichten werden wöchentlich von Community-Mitgliedern kuratiert, und alle relevanten Links werden dem Newsletter hinzugefügt. Bitte abonnieren Sie den Newsletter [hier](https://zechub.substack.com/).

## Mitwirken

Beiträge zum Newsletter funktionieren am besten, wenn eine mitwirkende Person die Ausgabe für die richtige Woche vorbereitet, dem aktuellen Bounty- oder Koordinationsthread folgt und den Pull Request einreicht, nachdem die wöchentlichen Links fertig sind. Bitte reichen Sie keine zukünftige Ausgabe ein, bevor ZecHub das Datum für diese Ausgabe veröffentlicht oder bestätigt hat. Zu früh eingereichte Pull Requests verpassen oft späte Updates der Woche, kollidieren mit einer zugewiesenen kuratierenden Person oder verwenden die falsche Frist.

### 1. Bestätigen Sie die aktuelle Ausgabe

Bevor Sie mit dem Schreiben beginnen:

- Prüfen Sie [ZEC Bounties ](https://bounties.zechub.wiki/) auf die aktuelle Newsletter-Aufgabe.
- Warten Sie, bis Ihnen die Aufgabe zugewiesen wird

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Forken Sie das Repository

Wenn Sie neu bei GitHub sind, verwenden Sie diesen Ablauf:

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

Ersetzen Sie `YOUR-USERNAME` durch Ihren eigenen GitHub-Benutzernamen. Die obige URL ist ein Platzhalter und wird in dieser Form nicht aufgelöst.

### 3. Erstellen Sie die Newsletter-Datei

Verwenden Sie die [Newsletter-Vorlage](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) als Ausgangspunkt. Newsletter-Ausgaben gehören in den Ordner [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Beim Erstellen der Datei:

- Verwenden Sie das Dateinamenformat, das in der Issue angefordert wird oder in kürzlich akzeptierten Ausgaben verwendet wurde.
- Behalten Sie dieselbe Reihenfolge der Abschnitte wie in der Vorlage bei, sofern die Aufgabe kein anderes Format verlangt.
- Fügen Sie nur Links aus der relevanten Woche hinzu.
- Schreiben Sie für jeden Link eine kurze, klare Beschreibung, damit Leserinnen und Leser verstehen, warum er wichtig ist.
- Übersetzen oder fassen Sie nicht englischsprachige Quellen bei Bedarf auf Englisch zusammen.
- Prüfen Sie jeden Link, bevor Sie den Pull Request eröffnen.

### 4. Sammeln Sie Links zum richtigen Zeitpunkt

ZecWeekly behandelt normalerweise die Aktivitäten im Zcash-Ökosystem der aktuellen Woche und wird gegen Ende der Woche veröffentlicht. Der sicherste Zeitpunkt ist:

- Beginnen Sie mit dem Sammeln von Links, nachdem die aktuelle Newsletter-Ausgabe oder Aufgabe veröffentlicht wurde.
- Führen Sie einen Entwurf, solange die Woche noch aktiv ist.
- Reichen Sie den Pull Request nahe am gewünschten Einreichungsdatum ein, nachdem Sie auf späte Updates der Woche geprüft haben.
- Reichen Sie den Newsletter einer zukünftigen Woche nicht ein, bevor die Aufgabe für dieses Datum existiert oder bevor ZecHub bestätigt, dass Sie ihn vorbereiten sollen.

Wenn eine Issue sagt, dass bis zu einem bestimmten Datum eingereicht werden soll, folgen Sie diesem Datum. Wenn es einen Konflikt zwischen dieser Seite und einer aktuellen Issue gibt, folgen Sie der aktuellen Issue.

### 5. Eröffnen Sie den Pull Request

Wenn Ihre Newsletter-Datei fertig ist:

1. Committen Sie Ihre Änderungen in Ihrem Fork.
2. Eröffnen Sie einen Pull Request in `ZecHub/zechub` auf den Branch `main`.
3. Verwenden Sie einen Titel, der zur Ausgabe passt, zum Beispiel `Zcash Ecosystem Digest | May 30th`.
4. Verlinken Sie die Issue im Text des Pull Requests, damit Reviewer die Arbeit der Aufgabe zuordnen können.

Beispiel für den Text eines Pull Requests:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Nachdem der Pull Request eröffnet ist, achten Sie auf Review-Kommentare. Wenn ZecHub Änderungen anfordert, aktualisieren Sie denselben Branch, anstatt einen zweiten Pull Request für dieselbe Ausgabe zu eröffnen.

### Reale Beispiele

Verwenden Sie diese gemergten Newsletter-Pull-Requests als Beispiele für akzeptierte Einreichungen:

- [Zcash-Ökosystem-Digest | 11. April](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash-Ökosystem-Digest | 28. März](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash-Ökosystem-Digest | 14. Februar](https://github.com/ZecHub/zechub/pull/1474)


![Beispiel für einen gemergten Pull Request des ZecWeekly-Newsletters](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Wenn Sie Ihre Arbeit mit einem Beispiel vergleichen, achten Sie auf den Speicherort der Datei, das Titelformat, die Reihenfolge der Abschnitte, die Link-Beschreibungen und darauf, ob der Pull Request auf die richtige Aufgabe zurückverweist.

### Häufige Fehler, die Sie vermeiden sollten

- Einen Pull Request eröffnen, bevor das Datum der Ausgabe oder die Aufgabe bestätigt ist.
- An einer Issue arbeiten, die bereits einen verlinkten Pull Request hat.
- Den Pull Request in Ihren eigenen Fork statt in `ZecHub/zechub` einreichen.
- Den falschen Dateinamen verwenden oder die Datei außerhalb des Ordners `newsletter` ablegen.
- Eine alte Ausgabe kopieren, ohne jedes Datum, jeden Link und jede Beschreibung zu aktualisieren.
- Links aus der falschen Woche hinzufügen.
- Defekte Links, doppelte Links oder Platzhaltertext aus der Vorlage stehen lassen.
- Nach Review-Kommentaren einen neuen Pull Request eröffnen, anstatt den ursprünglichen Branch zu aktualisieren.

### Abschließende Checkliste

Bevor Sie um ein Review bitten, stellen Sie sicher, dass:

- Das Datum der Issue oder Aufgabe mit Ihrer Newsletter-Datei übereinstimmt.
- Kein anderer offener Pull Request bereits dieselbe Issue oder Ausgabe abdeckt.
- Die Datei sich im Ordner `newsletter` befindet.
- Die Abschnitte der Vorlage vollständig sind.
- Jeder Link funktioniert und eine nützliche Beschreibung hat.
- Der Text des Pull Requests auf die richtige Issue verlinkt.
- Sie verfügbar sind, um Änderungen vorzunehmen, falls Reviewer Anpassungen verlangen.

## Frühere Ausgaben

[ZecWeekly-Archiv](https://zechub.substack.com/p/archive)
