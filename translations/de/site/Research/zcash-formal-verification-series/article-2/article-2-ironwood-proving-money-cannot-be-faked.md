![alt text](image-1.png)
# Ironwood: Der Beweis, dass Geld nicht gefälscht werden kann

### Wie Zcash auf einen Bug mit einem maschinell überprüften Beweis reagierte

> **Serie:** *Formale Verifikation* · **Teil 3 von 3**
> **Zielgruppe:** Einsteiger. Teil 1 und 2 führten in die formale Verifikation und den Orchard-Bug ein; dieses Finale zeigt, wie die beiden Ideen in einem realen System zusammenkommen. Alles Nötige wird im Verlauf nochmals erläutert.
> **Was du mitnimmst:** ein präzises Verständnis davon, was Zcash tatsächlich über seinen neuen „Ironwood“-Pool bewiesen hat, wie der Beweis aufgebaut ist, was er abdeckt und was nicht, wie der alte Pool sicher außer Betrieb genommen wurde und warum dies auf einen neuen Standard für die Entwicklung kryptografischen Geldes hindeutet.

In Teil 1 haben wir gelernt, was es bedeutet, die Korrektheit eines Systems zu *beweisen*. In Teil 2 sahen wir einen echten Fehler, den Tests vier Jahre lang übersahen: eine unzureichend eingeschränkte Multiplikation auf elliptischen Kurven, die unbegrenzte unsichtbare Fälschungen hätte ermöglichen können. Dieser Artikel ist die Auflösung: wie Zcash nicht nur mit einem Patch reagierte, sondern mit einem maschinell überprüften Beweis, dass die gesamte Bug-Klasse beseitigt ist.

---

## 1. Warum sollte dich das interessieren?

Wenn ein Bug Geld bedroht, lautet die übliche Reaktion: patchen und weitermachen. Zcash tat etwas Ehrgeizigeres. Zusammen mit einem neuen abgeschirmten Pool namens **Ironwood**, der am 28. Juli 2026 aktiviert wurde, veröffentlichten seine Ingenieure einen **maschinell überprüften mathematischen Beweis** mit über **2.700 Theoremen**, geschrieben im Beweisassistenten **Lean**, der unter seinen genannten Annahmen belegt, dass der neue Pool keine gefälschten Coins erzeugen kann. Der Beweis ist öffentlich, im Open-Source-Repository `ironwood`, und drei Teams von Forschern und Kryptografen benötigten weit über einen Monat, um ihn fertigzustellen.

Das ist über Zcash hinaus bedeutsam. Es ist eine der klarsten praktischen Demonstrationen dafür, dass man ein laufendes Finanzsystem nehmen, präzise formulieren kann, was „keine Fälschungen“ bedeutet, und es *beweisen* kann, statt zu hoffen, die Tests seien gründlich genug gewesen. Ein Versprechen wird zu einem Theorem.

---

## 2. Die Kernidee: Die Spezifikation beweisen, die Bug-Klasse beseitigen

Teil 2 endete mit der Erkenntnis, die dies möglich machte. Rufen wir sie uns in Erinnerung, denn alles Folgende baut darauf auf:

> Ein *nicht nachweisbarer* Fälschungs-Bug kann nur in der **Spezifikation** des Protokolls liegen, also in der mathematischen Beschreibung dessen, was der Schaltkreis erzwingen muss. Alles Nachweisbare würde in der öffentlichen Buchhaltung sichtbar. Die Spezifikation als korrekt zu beweisen, beseitigt daher die gesamte Klasse versteckter Fälschungs-Bugs auf einmal.

Warum „nur in der Spezifikation“? Weil jeder Block den vollständigen Inhalt jeder Transaktion, einschließlich ihrer Beweise, dauerhaft aufzeichnet. Wenn die *Software* eine ungültige Transaktion fälschlicherweise akzeptierte, könnte jeder die Historie mit korrigierter Software erneut abspielen und dies erkennen. Dieser Beleg ist dauerhaft und öffentlich. Nur ein Fehler in der zugrunde liegenden *Mathematik* kann für immer verborgen bleiben, weil es keine „korrekte Version“ gibt, mit der man die Historie erneut abspielen könnte. Genau auf diesen Fehler zielt formale Verifikation ab.

Tests prüfen *Verhalten bei ausgewählten Eingaben*, und der Orchard-Bug blieb gerade deshalb verborgen, weil keine ausgewählte Eingabe ihn traf. Ein Beweis über die Spezifikation deckt **alle** Eingaben gleichzeitig ab, einschließlich der Randfälle, an die niemand denken würde. Das ist die einzige Art von Garantie, die stark genug ist, um einen vier Jahre alten unsichtbaren Fehler mit Zuversicht außer Betrieb zu nehmen.

![alt text](image-2.png)

---

## 3. Was genau bewiesen wurde

Der Beweis etabliert eine zentrale Eigenschaft, die auf einer tieferliegenden Eigenschaft aufbaut.

### Bilanzintegrität (die Kernaussage)

> **Bilanzintegrität:** Der im abgeschirmten Pool gespeicherte verborgene Wert übersteigt niemals den öffentlichen Nettowert, der in ihn geflossen ist.

Dies ist die Anti-Fälschungs-Eigenschaft in einfacher Form. Geld kann in den abgeschirmten Pool eintreten (öffentlich sichtbar) und ihn verlassen (öffentlich sichtbar), doch innerhalb des Pools, wo Beträge verborgen sind, kann kein Wert aus dem Nichts entstehen. Machen wir es mit einem kleinen Hauptbuch konkret (überprüfte Arithmetik):

- **Ehrliche Transaktion:** Eingaben im Wert von `5 + 3 = 8` erzeugen Ausgaben im Wert von `4 + 4 = 8`. Eingehender Wert entspricht ausgehendem Wert. Die Bilanzintegrität ist gewahrt. ✓
- **Ein Fälschungsversuch:** dieselben Eingaben im Wert von `8`, aber Ausgaben von `4 + 4 + 2 = 10`. Das würde `2` Einheiten aus dem Nichts erzeugen. Die Bilanzintegrität **verbietet** dies: Der Pool darf niemals mehr auszahlen, als in ihn eingezahlt wurde. ✗

Bilanzintegrität ist die mathematische Aussage, dass das zweite Szenario niemals eine gültige Transaktion hervorbringen kann.

### Wissens-Soundness (der Motor darunter)

Um Bilanzintegrität zu garantieren, mussten die Forscher zunächst eine tiefere und subtilere Eigenschaft des Zero-Knowledge-Beweissystems selbst beweisen. Gewöhnliche Soundness (aus Teil 2: „Nur wahre Aussagen haben einen Zeugen“) erweist sich für einen abgeschirmten Pool aus einem faszinierenden Grund als *nicht ausreichend*: Da eine verborgene Transaktion alles enthalten kann, hat fast jede Aussage technisch gesehen irgendeinen Zeugen. Daher bewiesen die Forscher eine stärkere Eigenschaft:

> **Wissens-Soundness:** Wer einen gültigen Transaktionsbeweis erzeugen kann, muss *tatsächlich über* einen gültigen Zeugen verfügen, also über echte Coins, korrekt abgeleitet und an der richtigen Adresse.

Das formale Werkzeug hierfür ist ein **Extraktor**: ein Verfahren, das jedem Beweiser, der den Verifizierer überzeugen kann, den tatsächlichen Zeugen entziehen kann. Wenn ein Zeuge immer extrahiert werden kann, muss ein überzeugender Beweiser wirklich einen besessen haben. In der Sprache von Teil 2 ist Wissens-Soundness das formale Versprechen, dass es **keine Soundness-Lücke** gibt, keine fehlende Einschränkung, durch die eine falsche Aussage schlüpfen könnte. Genau diese Eigenschaft fehlte beim Orchard-Bug. Sie für alle möglichen Beweiser als vorhanden zu beweisen, verschließt diese Tür endgültig.

![alt text](image-3.png)

---

## 4. Wie der Beweis aufgebaut wurde

Die Verifikation war eine ernsthafte menschliche Leistung, kein Ergebnis auf Knopfdruck:

- Geschrieben im Beweisassistenten **Lean** (aus Teil 1: eine Maschine, die jeden logischen Schritt überprüft).
- Umfasst **mehr als 2.700 Theoreme**, öffentlich verfügbar im Repository `ironwood`.
- Erarbeitet von **drei Teams** aus Forschern und Kryptografen über **mehr als einen Monat**, einschließlich Arbeiten unter Leitung von Tal Derei von Project Tachyon, mit Beiträgen von Gregor Mitscha-Baude von zkSecurity und Daira-Emma Hopwood vom Open Development Lab von Zcash, sowie einem unabhängigen parallelen Soundness-Beweis anderer Kryptografen.

Um über diese Eigenschaft zu argumentieren, beschreibt das Lean-Modell ein vollständiges **Hauptbuch** als Liste von Transaktionen, die jeweils ihre Aktionen, ihren deklarierten öffentlichen Wert und ihre Signaturen enthalten. Ein von den Forschern **ValidLedger** genanntes Prädikat überträgt die Konsensregeln des Netzwerks direkt: Der Zeuge jeder Aktion muss die erforderlichen Bedingungen erfüllen, kein Ausgabenmarker (Nullifier) darf zweimal erscheinen, jeder referenzierte Baumzustand muss ein Zustand sein, den das System tatsächlich erreicht hat, und jede Signatur muss verifiziert werden. Die Theoreme quantifizieren dann über **jedes** gültige Hauptbuch. Diese Formulierung, „jedes gültige Hauptbuch“, ist der entscheidende Punkt: keine Stichprobe, sondern alle von ihnen, eine Obermenge von allem, was ein echter Angreifer jemals zusammenstellen könnte.

Das Ergebnis zur Bilanzintegrität wird aus mehreren Theoremen auf Hauptbuch-Ebene zusammengesetzt, von denen jedes beweist, dass ein Weg zur Fälschung verschlossen ist: dass jede Ausgabe einer echten früheren Ausgabe entspricht, dass der Gesamtwert erhalten bleibt, dass eine empfangene Note ausgabefähig bleibt und nicht gestohlen werden kann und dass Ausgeben eine ordnungsgemäße Autorisierung erfordert. Ein separates Element, die **Binding Signature**, verknüpft die verborgenen Werte jeder Transaktion mit dem von ihr deklarierten öffentlichen Betrag, sodass verborgene und öffentliche Buchhaltung nicht stillschweigend voneinander abweichen können.

---

## 5. Wo die Mathematik auf die Software trifft

Eine subtile und ehrliche Frage: Der Beweis bezieht sich auf ein mathematisches Modell, aber das Netzwerk führt *Rust-Code* aus. Woher wissen wir, dass der Code dem Modell entspricht?

Das Team zog eine sorgfältige Grenze, die es den **Fingerabdruck** des Verifizierers nennt. Oberhalb der Grenze argumentieren die Lean-Beweise über den Verifizierer als präzises mathematisches Objekt. Darunter liegt die gewöhnliche Rust-Implementierung. Das zentrale Argument ist dasselbe wie in Teil 2:

> Jede Weise, auf die die reale Software vom bewiesenen Modell abweichen könnte, wäre ein *Implementierungs*-Bug, und Implementierungs-Bugs können nur *nachweisbare* Fälschungen erzeugen, weil jeder akzeptierte Beweis dauerhaft aufgezeichnet wird und mit korrigierter Software erneut abgespielt werden kann.

Der Beweis behandelt also die nicht nachweisbare Klasse (die Spezifikation), und die dauerhafte öffentliche Aufzeichnung behandelt die nachweisbare Klasse (die Implementierung). Dazwischen gibt es keinen Ort, an dem sich ein *nicht nachweisbarer* Fälschungs-Bug verbergen könnte. Das Team prüfte zudem gegen, indem es den realen Verifizierer ausführte und bestätigte, dass er den Fingerabdruck bei erfassten Fällen exakt reproduziert.

---

## 6. Der wichtigste Vorbehalt: „unter den genannten Annahmen“

Teil 1 bestand darauf, dass ein Beweis garantiert, dass das System die Spezifikation *unter den genannten Annahmen* erfüllt, und niemals „nie wieder Bugs“ bedeutet. Das Team von Zcash war diesbezüglich bewundernswert präzise, und ehrliches pädagogisches Schreiben muss es ebenfalls sein.

Der Beweis reduziert die Sicherheit von Ironwood auf eine kleine Menge standardmäßiger, klar benannter Annahmen. Insbesondere beruht seine Soundness auf der Schwierigkeit des **diskreten Logarithmusproblems** auf der von Ironwood verwendeten elliptischen Kurve (einer gut untersuchten Annahme, bei der der beste bekannte Angriff in der Größenordnung von `2^126` Operationen erfordern würde, weit jenseits jeder praktikablen Berechnung), zusammen mit Standard-Modellierungsannahmen für die Hash-Funktion. Zwei Grenzen sollten klar ausgesprochen werden:

- **Er gilt unter diesen kryptografischen Annahmen.** Würde eine grundlegende Annahme gebrochen, entfiele die Garantie. Das ist Standard und unvermeidbar; praktisch jede eingesetzte Kryptografie beruht auf solchen Annahmen.
- **Er deckt Bilanzintegrität ab, nicht Privatsphäre.** Der Beweis betrifft die Soundness der Geldmenge (kein gefälschtes Geld). Er beansprucht **nicht**, die separaten Datenschutzgarantien des Pools zu beweisen, die eine andere Eigenschaft mit anderen Argumenten darstellen.

Weit davon entfernt, die Leistung zu schmälern, macht die Benennung dieser Grenzen sie vertrauenswürdig. Die Aussage ist exakt: *Unter standardmäßigen kryptografischen Annahmen kann dieser Pool keine nicht nachweisbaren gefälschten Coins erzeugen.* Das ist ein Theorem, keine Hoffnung, und sein genauer Geltungsbereich wird offen dargelegt.

![alt text](image-4.png)

---

## 7. Den alten Pool sicher außer Betrieb nehmen: das Drehkreuz

Der Beweis, dass der *neue* Pool sound ist, lässt noch eine Frage offen: Was ist mit dem *alten* Pool Orchard, in dem der Fehler vier Jahre lang bestand? Seine Vergangenheit kann man nicht sichtbar machen. Aber man kann seine Zukunft begrenzen.

Zcash führte einen Mechanismus namens **Drehkreuz** ein. Die Regel ist einfach und wirkungsvoll:

> Wert darf den alten Pool nur bis zu dem Betrag verlassen, der nachweisbar in ihn eingezahlt wurde.

Da Geldbewegungen in einen abgeschirmten Pool hinein und aus ihm heraus öffentlich sichtbar sind (nur die Aktivität *innerhalb* des Pools ist verborgen), ermöglicht das Drehkreuz dem gesamten Netzwerk zu prüfen, dass nicht mehr herauskommt, als jemals hineingegangen ist. Falls gefälschte Coins innerhalb des alten Pools erzeugt worden wären, würden sie an diese Grenze stoßen und könnten nicht austreten. Und wenn ehrliche Gelder abwandern und kein Überschuss erscheint, gewinnt die Gemeinschaft starke öffentliche Belege dafür, dass der Fehler nie ausgenutzt wurde. Es ist das Nächstbeste zu einer Prüfung der Geldmenge eines privaten Pools, ohne dessen Privatsphäre zu brechen, und bringt die Integrität der Geldmenge dem transparenten Modell einer Chain wie Bitcoin näher, während die Privatsphäre von Zcash erhalten bleibt.

![alt text](image-5.png)

Ironwood selbst verwendet den *korrigierten* Beweisschaltkreis erneut, startet neu mit einem leeren Pool und fügt zukunftsorientierte Schutzmaßnahmen hinzu (einschließlich Vorkehrungen, damit Gelder wiederherstellbar bleiben könnten, falls zukünftige Quantencomputer eines Tages die heutige Kryptografie gefährden). Neue abgeschirmte Aktivitäten fließen nun durch Ironwood, während der alte Pool Orchard auf Auszahlungen beschränkt ist.

---

## 8. Das größere Bild: hochzuverlässige Kryptografie

Ironwood ist Teil eines umfassenderen Wandels darin, wie Zcash entwickelt. Die Skalierungsinitiative der nächsten Generation (eine Architektur namens **Tachyon**, aufgebaut auf rekursiven Beweisen und einem Toolkit namens **Ragu**) wird unter einer Philosophie entwickelt, die manchmal **hochzuverlässige Kryptografie** genannt wird: maschinell überprüfte formale Verifikation nicht als nachträglichen Einfall zu behandeln, sondern als Standardbestandteil der Veröffentlichung neuartiger kryptografischer Systeme.

Die Logik ist überzeugend. Modernste Kryptografie ist genau der Bereich, in dem menschliche Intuition am schwächsten ist und in dem sich ein subtiler, ungetesteter Randfall jahrelang verbergen kann, wie Orchard zeigte. Die Spezifikation zu beweisen ist die eine Technik, die auf „alle möglichen Eingaben“ skaliert und diese Lücken konstruktionsbedingt schließt. Das Team hat signalisiert, dass es diese Prüfung im Laufe der Zeit weiter ausdehnen will – hin zur Implementierung und darüber hinaus. Es ist zu erwarten, dass sich diese Messlatte in und über Zcash hinaus weiter verbreitet.

---

## 9. Ein ehrlicher Hinweis

Zur Klarheit haben wir vereinfacht. Die tatsächliche Lean-Entwicklung ist weitaus detaillierter als die hier dargestellte Skizze, mit präzisen Definitionen von Aktionen, Aussagen, Commitments, Nullifiers und Signaturen; „Bilanzintegrität“ und „Wissens-Soundness“ haben exakte formale Definitionen, die wir nur in Worten beschrieben haben; die Reduktion auf die Schwierigkeit diskreter Logarithmen führt über mehrere Zwischenmodelle (ein algebraisches Modell des Beweisers und ein Random-Oracle-Modell des Hashs), die wir zu „Standardannahmen“ verdichtet haben; und wir beschrieben Fingerabdruck und Drehkreuz auf konzeptioneller Ebene. Nichts davon verändert die wesentliche Geschichte: eine Spezifikation von „keine Fälschungen“, ein maschinell überprüfter Beweis über alle gültigen Hauptbücher, eine explizite und ehrliche Darstellung von Geltungsbereich und Annahmen sowie die sichere Außerbetriebnahme des fehlerhaften Pools. Den maßgeblichen Bericht findest du in den veröffentlichten Verifikationsdokumenten von Project Tachyon und im Beweis-Repository `ironwood`.

---

## 10. Zusammenfassung

- Zcash reagierte auf den Orchard-Bug nicht nur mit einem Patch, sondern mit einem **maschinell überprüften Beweis** (über **2.700 Theoreme** in **Lean**, öffentlich verfügbar) für seinen neuen **Ironwood**-Pool.
- Der Beweis etabliert **Bilanzintegrität** (der Pool zahlt nie mehr aus, als öffentlich in ihn eingezahlt wurde), aufgebaut auf **Wissens-Soundness** (ein gültiger Beweis verlangt, dass der Beweiser tatsächlich einen echten Zeugen besitzt, überprüft über einen **Extraktor**). Wissens-Soundness ist genau die Eigenschaft, deren Lücke der Orchard-Bug war.
- Er argumentiert über **jedes gültige Hauptbuch**, nicht über ausgewählte Fälle. Das schließt die Klasse versteckter Fälschungs-Bugs, die Tests übersahen.
- Die Lücke zwischen Mathematik und Software wird durch eine **Fingerabdruck**-Grenze behandelt: Nicht nachweisbare Bugs werden durch den Beweis ausgeschlossen, und jede Implementierungsabweichung wäre in der dauerhaften öffentlichen Aufzeichnung **nachweisbar**.
- Die Garantie ist präzise formuliert: Sie gilt unter der **Schwierigkeit diskreter Logarithmen und Standard-Hash-Annahmen** und deckt **Fälschung, nicht Privatsphäre** ab. Diese Ehrlichkeit ist ein Merkmal, keine Schwäche.
- Das **Drehkreuz** nimmt den alten Pool sicher außer Betrieb, indem es dessen Auszahlungen auf seine nachweisbaren Einzahlungen begrenzt, jede Fälschung aufdeckt und öffentliche Belege für die Integrität der Geldmenge schafft.
- Ironwood spiegelt einen Schritt hin zu **hochzuverlässiger Kryptografie** wider, bei der formale Verifikation ein Standardbestandteil der Entwicklung neuartigen kryptografischen Geldes ist.

---

## Glossar

| Begriff | Bedeutung in einfacher Sprache |
|---|---|
| **Ironwood** | Der neue abgeschirmte Pool von Zcash (2026), der den fehlerhaften Pool Orchard ersetzt |
| **Bilanzintegrität** | Der Pool zahlt niemals mehr Wert aus, als öffentlich in ihn eingezahlt wurde |
| **Wissens-Soundness** | Ein gültiger Beweis verlangt, dass der Beweiser einen echten Zeugen besitzt |
| **Extraktor** | Ein Verfahren, das jedem überzeugenden Beweiser den Zeugen entzieht |
| **Lean** | Der Beweisassistent zur maschinellen Überprüfung der Verifikation |
| **ValidLedger** | Das formale Modell der Konsensregeln, über das die Theoreme argumentieren |
| **Fingerabdruck** | Die Grenze zwischen der bewiesenen Mathematik und der laufenden Rust-Software |
| **Unter den genannten Annahmen** | Der Beweis gilt, sofern die benannten kryptografischen Annahmen gelten |
| **Drehkreuz** | Eine Regel, die Auszahlungen eines Pools auf seine nachweisbaren Einzahlungen begrenzt |
| **Hochzuverlässige Kryptografie** | Kryptografie entwickeln, bei der formale Verifikation ein Standardschritt ist |

---

## FAQ

**Bedeutet der Beweis, dass Ironwood fehlerfrei ist?**
Nein, und das wird auch nicht behauptet. Er beweist eine präzise Eigenschaft, die Bilanzintegrität, unter den genannten Annahmen. Das schließt nicht nachweisbare Fälschungen aus, nicht aber jeden denkbaren Bug.

**Garantiert der Beweis, dass meine Transaktionen privat sind?**
Nein. Die Verifikation deckt die Soundness der Geldmenge ab (kein gefälschtes Geld), nicht die separaten Datenschutzgarantien des Pools. Diese werden anders begründet.

**Warum sollte man einem von Menschen (und KI) geschriebenen Beweis vertrauen?**
Weil er maschinell überprüft wird. Der Lean-Beweisassistent verifiziert jeden Schritt mechanisch; das Vertrauen beruht also auf der Spezifikation und den benannten Annahmen, nicht auf der Sorgfalt eines Menschen oder einer KI bei jedem einzelnen Schritt.

**Was passiert mit Coins, die noch im alten Pool Orchard liegen?**
Sie können ausgezahlt werden, aber nur bis zu dem Betrag, der nachweisbar eingezahlt wurde; dies wird durch das Drehkreuz erzwungen. Das schützt sowohl die Integrität der Geldmenge als auch den Nachweis, dass der alte Fehler nie ausgenutzt wurde.

**Ist dies das Ende der Geschichte?**
Es ist ein Meilenstein, keine Ziellinie. Die zukünftige Architektur von Zcash (Tachyon mit dem Ragu-Toolkit) wird mit formaler Verifikation als Standardpraxis entwickelt und weitet diesen Ansatz weiter aus.

---

### Teste deine Intuition

Jemand behauptet: „Da Ironwood formal verifiziert ist, kann mit Zcash nun unmöglich jemals etwas schiefgehen.“ Nenne anhand der Ideen aus allen drei Teilen zwei unterschiedliche Gründe, warum diese Behauptung zu weit geht. *(Antwort unten.)*

<details><summary>Antwort</summary>

Erstens deckt der Beweis eine *spezifische* Eigenschaft (Bilanzintegrität) unter *genannten Annahmen* ab (Schwierigkeit diskreter Logarithmen und Standard-Hash-Modellierung). Falls eine kryptografische Annahme gebrochen würde oder ein Problem außerhalb dessen aufträte, was spezifiziert wurde (beispielsweise bei der Privatsphäre, in Wallet-Software oder in einer nicht bewiesenen Komponente), sagt der Beweis nichts darüber aus. Zweitens garantiert formale Verifikation, dass das System *die geschriebene Spezifikation* erfüllt; falls diese Spezifikation selbst eine reale Anforderung nicht erfasste, würde der Beweis zuverlässig das Falsche zertifizieren. Beide Punkte formulieren den Vorbehalt aus Teil 1 erneut: Ein Beweis ist präzise und begrenzt, gerade weil sein Geltungsbereich ehrlich ist, leistungsfähig – keine pauschale Garantie, dass niemals etwas schiefgehen kann.
</details>

---

### Die vollständige Serie

In drei Teilen bewegten wir uns von einer allgemeinen Idee zu einer laufenden Anwendung: was es bedeutet, Software als korrekt zu **beweisen**, statt sie nur zu testen (Teil 1), wie ein realer unzureichend eingeschränkter Schaltkreis unsichtbares Geld hätte erzeugen können (Teil 2), und wie ein maschinell überprüfter Beweis der **Bilanzintegrität** diese Bug-Klasse endgültig beseitigte (Teil 3). Der rote Faden ist ein einziges, ehrliches Versprechen: nicht „nie wieder Bugs“, sondern „diese präzise Eigenschaft gilt für jeden Fall unter den genannten Annahmen“. Für Geld, das seine eigenen Beträge verbirgt, ist das genau das Versprechen, das es wert ist, bewiesen zu werden.

*Teil der* Formal Verification  *Serie für [ZecHub](https://zechub.org).*
