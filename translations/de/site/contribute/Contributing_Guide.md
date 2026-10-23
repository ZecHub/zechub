<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zu ZecHub beitragen

ZecHub hilft Menschen, mehr über Zcash zu erfahren. Wenn du diese Seite liest, freuen wir uns sehr, dass du darüber nachdenkst, etwas beizutragen! Jeder Beitrag von dir wird auf [zechub.wiki](https://www.zechub.wiki/) und anderen sozialen Medien von ZecHub sichtbar sein.

### Neue Mitwirkende

Um einen Überblick über ZecHub zu erhalten, lies die [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Erste Schritte

ZecHub verwendet GitHub, um Beiträge der Community zu verwalten. Wenn du neu bei GitHub bist, keine Sorge! Wir erklären dir, wie du dich als Community-Mitwirkende:r bei ZecHub einbringen kannst. Für angenommene Beiträge zahlen wir Trinkgelder in abgeschirmtem ZEC aus. Die Belohnungshöhen sind in ZEC nicht festgelegt — siehe [Wie Belohnungen festgelegt werden](#how-rewards-are-set). In diesem Leitfaden erhältst du einen Überblick über den Beitragsablauf: vom Eröffnen eines Issues über das Erstellen eines Pull Requests (PR) bis hin zur Überprüfung und zum Mergen des PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="Wie man zu ZecHub beiträgt!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Tritt der Unterhaltung bei

Tritt zunächst der Unterhaltung über unsere [Community-Links](https://zechub.wiki/zcash-community/community-links) bei.

### Styleguides

Jeder Beitrag zu ZecHub sollte dem [ZecHub Styleguide](https://zechub.wiki/contribute/style-guide) folgen. Dies gilt für Wikis, Dokumentationen und Inhalte in sozialen Medien.

### Möglichkeiten, wie du beitragen kannst

ZecHub ist ein von der Community getragenes Projekt, das Unterstützung und Ressourcen für Nutzer:innen und Entwickler:innen von Zcash bereitstellen soll. Es gibt viele Möglichkeiten, dich bei ZecHub einzubringen, darunter das Schreiben für unseren wöchentlichen Newsletter, Beiträge zu unserer Wissensdatenbank oder Hilfe bei Entwicklungsprojekten.

Dies sind die Arten von Beiträgen, die ZecHub derzeit annimmt:

### Wie Belohnungen festgelegt werden

Trinkgelder werden in abgeschirmtem ZEC ausgezahlt. Die ZEC-Zahlen, die früher in den untenstehenden Überschriften standen, waren historische Momentaufnahmen zu einem älteren ZEC/USD-Kurs. Betrachte sie nicht als aktuelle Kurse.

So wird ein Betrag ausgewählt:

1. Ordne die Arbeit einem USD-Intervall in der Richtlinie zu [Bounty-Beträgen](https://bounties.zechub.wiki/docs/bounty-amounts) zu.
2. Wähle ein Ziel innerhalb dieser Spanne — nicht automatisch den Höchstwert.
3. Rechne zum öffentlichen ZEC/USD-Spotkurs um und trage ZEC für die Bounty ein:

```
zec_to_enter = usd_target / zec_usd_spot
```

Runde auf 4 Dezimalstellen. Die Richtliniendatei ist die einzige maßgebliche Quelle. Falls diese Seite und jene Datei voneinander abweichen, gilt die Richtlinie.

Bezahlte Arbeiten sind auf [ZEC Bounties](https://bounties.zechub.wiki/) aufgeführt.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties erklärt | Verdiene ZEC durch Beiträge"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Drei Zustände, die nicht dasselbe sind:

1. **Gemergt** — der PR wurde in das Repository übernommen.
2. **Belohnung genehmigt** — ein Sponsor oder die DAO stimmt zu, dass eine Belohnung geschuldet ist und in welcher Höhe.
3. **Bezahlt** — ZEC erreicht dein abgeschirmtes Unified Address.

Ein gemergter Beitrag genehmigt nicht automatisch eine Belohnung. Eine genehmigte Belohnung ist keine abgeschlossene Zahlung.

#### Entwicklungsarbeit

Jede genehmigte Entwicklungsarbeit, die beim Aufbau des Zcash-Ökosystems hilft. Dies kann unser Wiki, neue Wallets oder jede Anwendung umfassen, die dir einfällt.

#### Zcash Tutorials (Video)

Hier ist ein Beispiel-Tutorial:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL-Installation + Zcashd-Kompilierungs-/Transaktions-Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Erstelle und teile Tutorials zu Zcash-Apps und erhalte Belohnungen. Reiche einen PR bei zechub/tutorials ein oder sende das Video an den Kanal #video-content in Discord. Wenn das Video unsere Kriterien erfüllt, veröffentlichen wir es und geben dir ein Trinkgeld.

#### ZecHub Wiki - neue Wiki-Seite veröffentlicht

Unsere Wiki-Seite bietet Zcash-Bildungsmaterialien in einem einfachen und leicht verständlichen Format. Zcash ist eine sehr fortschrittliche Technologie mit einer lebendigen Community, daher gibt es noch mehr Dokumentation, die wir erstellen müssen. Unser Ziel ist es, Dokumentation zu folgenden Themen aufzubauen:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Dies sind recht breite Bereiche, daher gibt es viel, woran man arbeiten kann. Wenn du Inspiration möchtest, sieh dir unsere aktuelle [Wiki-Dokumentationsseite](https://zechub.wiki/) an und prüfe, was fehlt. Sobald du entschieden hast, worüber du schreiben möchtest, nimm deine Änderungen vor und lerne, wie du einen PR an das ZecHub-Repository einreichst. Alle unsere Dokumentationen werden in diesem Repository erstellt und gepflegt. Befolge beim Schreiben einer Wiki-Seite den [ZecHub Styleguide](https://zechub.wiki/contribute/style-guide) und nutze eine bestehende Seite im selben Abschnitt als strukturelle Referenz. Nachdem du einen PR eingereicht hast, schreibe bitte @dismad, @squirrel oder @vito im Bereich #zechub des Discords. Sie werden deinen PR überprüfen und mergen, wenn er bereit ist, der Website hinzugefügt zu werden. Falls er gemergt wird, fügen sie das Dokument zur ZecHub-Website hinzu. Falls das Dokument noch nicht bereit ist, schlagen sie dir im PR Änderungen vor.

#### ZecHub Wiki - übersetzte Wiki-Seite

Das Ziel von ZecHub ist es, einen Open-Source-Bildungshub bereitzustellen, zu dem jede Person in der Zcash-Community beitragen kann. Einer der größten Erfolge des Hubs besteht darin, zu sehen, wie Community-Mitglieder ZecHub-Materialien in ihre jeweilige Landessprache übersetzen.

Hinweis: Das globale Limit für Seitenübersetzungen von ZecHub beträgt 10 Seiten pro Woche.

Kuratierte Sprachseiten unter `translations/<locale>/site/` werden anhand eines Source-Hash-Manifests mit ihrer englischen Quelle abgeglichen. Siehe [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) für die Erkennung veralteter Inhalte, den Synchronisierungsablauf und die Validierung geschützter Begriffe.

#### ZecHub Wiki - Bearbeitung eines bestehenden Dokuments

Manchmal sind unsere Informationen in der Dokumentation nicht ganz korrekt. Das ist in Ordnung. Deshalb stellen wir sie als Open Source bereit! Wenn du etwas findest, das in einem Wiki-Dokument geändert werden muss, gehe bitte zur Fußzeile des Dokuments (die auf die entsprechende Github-Seite verlinkt) und schlage über einen PR eine Änderung vor.

#### ZecHub Wiki - defekter Link behoben

Wenn du feststellst, dass ein Link defekt ist oder etwas Wichtiges falsch geschrieben wurde, gehe bitte zur Fußzeile des Dokuments (die auf die entsprechende Github-Seite verlinkt) und schlage die Änderung über einen PR vor.

#### Newsletter - neue Ausgabe

Wir erstellen den wöchentlichen Newsletter des Ökosystems. Das ist eine sehr einfache Möglichkeit, dich einzubringen! Der Newsletter erscheint jeden Freitag oder Samstag. Wenn du einen Newsletter schreiben möchtest, schreibe @squirrel im Bereich #zecweekly von Discord, um dies mitzuteilen.

Danach kannst du zum [Newsletter-Bereich dieses Repositories](/newsletter/newsletterbasics.md) gehen und einen Pull Request einreichen, um eine neue Ausgabe des Newsletters zu erstellen. Bitte folge dem Format dieser [Vorlage](/newsletter/newslettertemplate.md).

Danach werden @squirrel oder (in Discord) sehen, dass deine neue Newsletter-Ausgabe verfügbar ist, sie überprüfen und dann in das Repository mergen. Nach dem Mergen übernehmen sie den Inhalt und veröffentlichen ihn über Substack.

#### Newsletter - Übersetzung

Derzeit haben wir Ausgaben auf Spanisch, Portugiesisch und Russisch. Die übersetzten Versionen werden in ihren sozialen Medien veröffentlicht, und wir bemühen uns, sie über die sozialen Medien von ZecHub zu verbreiten.

Wenn du den Newsletter in deine Landessprache übersetzen möchtest, teile uns mit, über welchen Kanal du ihn verbreiten würdest und in welcher Sprache du den Newsletter veröffentlichen möchtest, damit wir die Veröffentlichung koordinieren können.

#### Podcast - Episode in den sozialen Medien von ZecHub veröffentlicht

Hast du eine Idee für eine Nachrichtensendung, einen Podcast, einen Twitter-Vortrag oder ein anderes Video-/Audioformat? Teile sie uns in Discord #video-content mit, und wir sprechen darüber.

Die Belohnungen für diese Art von Inhalten sind etwas höher, daher müsste vor der Genehmigung der Ausgabe ein Vorschlag bei der DAO von ZecHub eingereicht werden.

#### Kreative Beiträge für soziale Medien

Wir möchten neue ansprechende Inhalte für unsere sozialen Medien. Kurze Videos, GIFs, Memes und andere kreative Beiträge werden akzeptiert, wenn sie dem [ZecHub Styleguide](https://zechub.wiki/contribute/style-guide) entsprechen. Die Belohnungshöhe richtet sich nach der Richtlinie zu [Bounty-Beträgen](https://bounties.zechub.wiki/docs/bounty-amounts).

Du kannst auch Vorschaubilder für unseren Newsletter und Podcast gestalten. Wenn du Designtalent hast, schreibe uns in #design auf Discord.

#### Andere Ideen? Lass es uns wissen!

Hast du einen anderen Vorschlag? Teile ihn uns in #general auf Discord mit. Wir können ihn besprechen und sehen, ob die DAO von ZecHub ihn unterstützen wird.

### Zum Abschluss

Bitte zögere nicht, damit zu beginnen, zu einem der angesehensten Protokolle der Branche beizutragen. Dies ist eine großartige Möglichkeit, dich bei Zcash einzubringen. Wenn du Fragen zum Beitragen hast, teile sie uns bitte auf [Discord](#join-the-conversation) mit.

Danke!
