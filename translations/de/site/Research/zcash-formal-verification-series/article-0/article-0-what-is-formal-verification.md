![alt text](image-1.png)
# Was ist formale Verifikation?

### Wie man beweist, dass ein Programm korrekt ist, statt es nur zu hoffen

> **Serie:** *Serie zur formalen Verifikation* · **Teil 1 von 3**
> **Zielgruppe:** vollständige Einsteiger. Keine Kenntnisse in Mathematik, Programmierung oder Kryptografie vorausgesetzt.
> **Was Sie mitnehmen werden:** ein klares Verständnis davon, was es bedeutet, Software als korrekt zu *beweisen*, warum das grundlegend etwas anderes ist als sie zu testen, was ein maschinell geprüfter Beweis ist und welche genauen (und ehrlichen) Grenzen ein solcher Beweis hat.

Der meisten Software wird vertraut, weil sie *getestet* wurde: Wir führen sie mit vielen Eingaben aus und beobachten ihr Verhalten. Formale Verifikation stellt eine mutigere Frage. Können wir mit mathematischer Gewissheit *beweisen*, dass ein System für **jede** mögliche Eingabe das tut, was es soll – auch für jene, die niemand jemals ausprobiert hat? Dieser Artikel entwickelt diese Idee von Grund auf. Zuerst die Intuition, keine Symbole, bevor sie wirklich nötig sind.

---

## 1. Warum sollte Sie das interessieren?

Hier ist eine wahre Geschichte, und sie ist der Grund, warum es diese Serie gibt.

2022 führte die auf Privatsphäre ausgerichtete Kryptowährung Zcash einen neuen abgeschirmten Pool namens Orchard ein, mit dem Menschen Transaktionen durchführen konnten, deren Beträge verborgen waren. Vier Jahre lang funktionierte er fehlerfrei und bestand wiederholte professionelle Audits. Dann entdeckte im Mai 2026 ein Sicherheitsforscher, der sorgfältig über die zugrunde liegende Mathematik nachdachte (mit Unterstützung von KI-Werkzeugen), eine einzige **unterbestimmte** Stelle in der Mathematik des Systems. Diese eine Lücke hätte einem Angreifer ermöglichen können, eine *unbegrenzte* Menge an gefälschtem Geld zu erzeugen, und weil die Beträge verborgen waren, hätte niemand bemerkt, wie es geschieht. Der Fehler war die ganze Zeit vorhanden gewesen.

Er wurde nicht durch Tests entdeckt. Vier Jahre lang hatte jeder Test bestanden. Entdeckt wurde er von jemandem, der *über die Mathematik nachdachte*. Und als das Team ihn behob, patchte es nicht einfach und machte weiter. Es schrieb einen **maschinell geprüften mathematischen Beweis** mit über 2.700 einzelnen Theoremen, dass der Ersatz diese Fehlerklasse überhaupt nicht enthalten konnte.

Das ist formale Verifikation, und genau das bringt sie: nicht „wir haben viele Fälle ausprobiert und sie haben funktioniert“, sondern „wir haben bewiesen, dass es für jeden Fall gilt“. Bei Systemen, bei denen ein übersehener Fall katastrophal wäre (Geld, Flugzeuge, Medizinprodukte, Kryptografie), ist dieser Unterschied alles.

Der blinde Fleck beim Testen wurde vor Jahrzehnten vom Informatiker Edsger Dijkstra benannt und ist bis heute wahr:

> **Tests können die *Existenz* von Fehlern zeigen, aber niemals ihre *Abwesenheit*.**

Wenn ein Test besteht, haben Sie gelernt, dass das System *bei dieser Eingabe* funktioniert. Über die Eingaben, die Sie nicht ausprobiert haben, haben Sie nichts gelernt, und die gefährlichen Fehler liegen fast immer in den Fällen, die niemand ausprobiert hat.

---

## 2. Die Intuition: Türen prüfen vs. das Gebäude beweisen

Stellen Sie sich vor, Sie sind für ein Gebäude mit tausend Türen verantwortlich, und Ihre Aufgabe ist es, zu garantieren, dass jede Tür nachts verschlossen ist.

- **Der Testansatz:** Gehen Sie herum und probieren Sie eine Auswahl an Türen. Fünfzig, hundert, fünfhundert. Jede ausprobierte Tür ist verschlossen, also wächst Ihr Vertrauen. Aber Sie haben nicht alle ausprobiert, und die eine unverschlossene Tür könnte eine sein, die Sie ausgelassen haben.
- **Der Ansatz der formalen Verifikation:** Untersuchen Sie das *Schließsystem selbst* und beweisen Sie aus seinem Entwurf, dass das Drücken des „Verriegeln“-Knopfs zwangsläufig jede Tür verriegelt. Nun müssen Sie einzelne Türen überhaupt nicht mehr ausprobieren. Sie haben gezeigt, dass *keine mögliche Tür unverschlossen bleiben kann*, weil der Mechanismus es unmöglich macht.

Der Unterschied liegt zwischen **dem Stichprobennehmen aus der Realität** und **dem Beweisen einer Eigenschaft des Entwurfs**. Tests nehmen Stichproben. Formale Verifikation beweist. Das ist die ganze Idee; alles Weitere ist Werkzeug, um sie rigoros umzusetzen.

![alt text](image-2.png)

---

## 3. Die drei Säulen jeder formalen Verifikation

Jede formale Verifikation, ganz gleich wie fortgeschritten, beruht auf genau drei Bestandteilen. Behalten Sie diese klar im Blick, dann ist der Rest Detail.

| Säule | Einfache Bedeutung | Gebäudeanalogie |
|---|---|---|
| **Spezifikation** | Eine präzise Aussage darüber, was „korrekt“ *bedeutet* | „Jede Tür muss nachts verschlossen sein“ |
| **System** | Das tatsächlich überprüfte Objekt (ein Programm, eine Schaltung, ein Protokoll) | Das Gebäude und sein Schließmechanismus |
| **Beweis** | Ein rigoroses Argument dafür, dass das System die Spezifikation immer erfüllt | Die logische Darlegung, dass das Drücken von „Verriegeln“ alle Türen verriegelt |

Und ein vierter, stillerer Bestandteil macht das Ganze vertrauenswürdig:

- **Ein maschineller Prüfer.** Der Beweis wird nicht von einem Menschen geschrieben und bloß mit den Augen überprüft. Er wird einem Programm zugeführt (einem **Beweisassistenten**, auch **Theorembeweiser** genannt), das *jeden einzelnen logischen Schritt* prüft. Ein Mensch kann sich vage ausdrücken oder einen subtilen Fehler machen; die Maschine akzeptiert keinen Schritt, der nicht streng aus dem Vorhergehenden folgt. Deshalb nennen wir das Ergebnis **maschinell geprüft**.

![alt text](image-3.png)

Zu den Beweisassistenten, deren Namen Sie vielleicht hören werden, gehören **Lean**, **Rocq** (früher Coq) und **Isabelle**. Sie sind im Grunde außerordentlich strenge Maschinen zur Prüfung von Logik. Der Zcash-Beweis in unserer Eingangsgeschichte wurde in **Lean** geschrieben. Bemerkenswert ist, dass moderne KI-Modelle zunehmend genutzt werden, um beim *Schreiben* dieser Beweise zu helfen, angeleitet von Menschen. Dadurch wurden Vorhaben, die früher Jahre dauerten, auf Wochen verkürzt. Die Maschine prüft weiterhin jeden Schritt, daher kostet die Beschleunigung keine Gewissheit.

---

## 4. Was ein Beweis tatsächlich ist

Das Wort „Beweis“ kann einschüchternd wirken, also entmystifizieren wir es mit einem konkreten, überprüfbaren Beispiel. Keine Kryptografie, nur Schulmathematik.

**Behauptung:** Für jede ganze Zahl `n` ist die Summe `0 + 1 + 2 + ... + n` gleich `n(n+1)/2`.

Sie könnten das *testen*. `n = 5` ergibt `0+1+2+3+4+5 = 15`, und `5 × 6 / 2 = 15`. ✓ Es stimmt überein. Versuchen Sie `n = 10`: Die Summe ist `55`, und die Formel ergibt `10 × 11 / 2 = 55`. ✓ (Diese Werte wurden berechnet und bestätigt; die Behauptung gilt tatsächlich für jedes `n` von 0 bis 999, wenn man sie direkt überprüft.)

Doch selbst tausend getestete Werte reichen niemals bis zu „für **jede** ganze Zahl“. Es gibt unendlich viele. Ein **Beweis** schließt diese unendliche Lücke mit einem endlichen Argument, mithilfe einer Technik namens **Induktion**:

1. **Induktionsanfang:** Für `n = 0` ist die Summe einfach `0`, und die Formel ergibt `0 × 1 / 2 = 0`. Sie stimmen überein. ✓
2. **Induktionsschritt:** *Nehmen wir an*, die Formel gilt für eine Zahl `k`. Fügen wir nun die nächste Zahl hinzu, `k+1`. Die Summe bis `k+1` ist `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Eine Zeile Algebra formt dies zu `(k+1)(k+2)/2` um, was genau der Formel mit `k+1` anstelle von `k` entspricht. ✓

Da sie am Anfang (0) gilt und jeder Schritt sie auf die nächste Zahl überträgt, gilt sie mit einem einzigen endlichen Argument für **alle** ganzen Zahlen, für immer. Das ist ein Beweis. Ein Beweisassistent führt genau diese Schlussfolgerung aus, überprüft jedoch mechanisch, dass jeder Schritt – einschließlich der „Zeile Algebra“ – wirklich aus dem zuvor Bewiesenen folgt.

> Der entscheidende Gedanke: Ein Beweis verwandelt „unendlich viele Fälle“ in ein **endliches, überprüfbares Argument**. Das ist die Superkraft, die dem Testen strukturell fehlt.

---

## 5. Wo Fehler tatsächlich entstehen

Formale Verifikation ist auch deshalb mächtig, weil sie klärt, *woher* Fehler überhaupt kommen. Jeder Mangel in einem regelprüfenden System lässt sich auf eine von drei Quellen zurückführen:

| Fehlerquelle | Was sie bedeutet | Können wir sie wegbeweisen? |
|---|---|---|
| **Die Spezifikation** | Die Mathematik oder Regeln selbst sind falsch (eine fehlende Bedingung, eine schlechte Definition) | **Ja**, direkt; das ist das Kerngebiet formaler Verifikation |
| **Die Implementierung** | Der Code setzt eine korrekte Spezifikation nicht getreu um | Teilweise; solche Fehler hinterlassen oft erkennbare Spuren |
| **Eine fehlerhafte Annahme** | Etwas, worauf das gesamte System beruht, stellt sich als falsch heraus | Nein; Annahmen sind das nicht weiter reduzierbare Fundament |

Diese Einteilung ist wichtiger, als sie aussieht, und auf ihr beruhen die Teile 2 und 3. Die tiefsten und gefährlichsten Fehler, jene, die sich für immer verbergen können, liegen meist in der **Spezifikation**: der mathematischen Beschreibung dessen, was das System tun soll. Und die Spezifikation ist genau das, was ein maschinell geprüfter Beweis direkt und für alle Fälle zugleich untersuchen kann. Deshalb zielen ernsthafte Vorhaben zur formalen Verifikation zuerst darauf.

![alt text](image-4.png)

---

## 6. Der wichtigste Vorbehalt des gesamten Fachgebiets

Formale Verifikation ist mächtig, aber ihr Versprechen ist präzise. Es falsch zu verstehen, führt Menschen in die Irre. Formulieren wir es daher sorgfältig:

> **Ein Beweis garantiert, dass das *System* unter den genannten *Annahmen* die *Spezifikation* erfüllt. Nicht mehr.**

Daraus folgen vier Konsequenzen, und jede ist wichtig:

- **Wenn die Spezifikation falsch ist, ist der Beweis wertlos.** Wenn Sie beweisen, dass „jede Tür verriegelt“, die tatsächliche Anforderung aber lautete, dass jedes *Fenster* verriegelt, dann haben Sie die falsche Sache perfekt bewiesen. Verifikation prüft, dass Sie *das gebaut haben, was Sie spezifiziert haben*, nicht, dass Sie das Richtige spezifiziert haben.
- **Wenn eine Definition subtil falsch formuliert ist, wird die Garantie unbemerkt enger.** Ein Beweis über eine leicht falsche Definition von „Kontostand“ könnte weniger belegen, als Sie denken, und dennoch jede Prüfung bestehen. Deshalb müssen die Definitionen im Kern einer Verifikation kurz, standardisiert und offen von Menschen überprüfbar sein.
- **Wenn die Annahmen nicht gelten, erlischt die Garantie.** Beweise beruhen auf Annahmen („die Schlosshardware ist nicht physisch defekt“). Ist eine Annahme in der Realität falsch, muss die Schlussfolgerung nicht gelten.
- **Es bedeutet nicht „nie wieder Fehler“.** Es bedeutet: „keine Fehler der Art, die durch diese Spezifikation unter diesen Annahmen ausgeschlossen wird“. Das ist eine engere, ehrlichere und viel nützlichere Aussage.

Diese Präzision schwächt formale Verifikation keineswegs, sondern ist ihre Stärke. Sie sagt Ihnen *genau*, was Sie erhalten. Wie wir in Teil 3 sehen werden, ist das Zcash-Team, das seinen Umfang und seine Annahmen klar benennt („wir haben die Solidität der Geldmenge unter diesen genannten Annahmen bewiesen, nicht die Privatsphäre“), ein Vorbild für diese Ehrlichkeit.

![alt text](image-5.png)

---

## 7. Ein ehrlicher Hinweis

Damit dies lesbar bleibt, haben wir vereinfacht. Echte Spezifikationen werden in präzisen formalen Sprachen geschrieben, nicht in englischen Sätzen; es gibt mehrere *Stile* formaler Verifikation (interaktives Theorembeweisen, Model Checking, SMT-basierte Methoden), die für unterschiedliche Probleme geeignet sind; und das Schreiben dieser Beweise bleibt selbst mit KI-Unterstützung anspruchsvolle, aufwendige Arbeit. Wir haben auch ausgelassen, wie ein Beweisassistent Logik intern darstellt. Nichts davon verändert den Kern: eine Spezifikation, ein System und ein maschinell geprüfter Beweis, dass beide unter genannten Annahmen übereinstimmen. Auf die Details kommen wir zurück, sobald wir sie brauchen.

---

## 8. Zusammenfassung

- **Tests** nehmen Stichproben bestimmter Eingaben und können zeigen, dass ein Fehler vorhanden ist, niemals jedoch, dass Fehler fehlen. Die gefährlichen Fehler verbergen sich in den Fällen, die niemand testet.
- **Formale Verifikation** beweist in einem endlichen, überprüfbaren Argument, dass eine Eigenschaft für **jeden** möglichen Fall gilt.
- Jede Verifikation hat drei Säulen: eine **Spezifikation** (was korrekt bedeutet), ein **System** (das überprüfte Objekt) und einen **Beweis**, dass beide übereinstimmen, sowie einen **Beweisassistenten** (wie **Lean**), der jeden Schritt maschinell prüft.
- Ein **Beweis** (etwa durch **Induktion**) verdichtet unendlich viele Fälle zu einem endlichen Argument.
- Fehler liegen in der **Spezifikation**, der **Implementierung** oder einer **fehlerhaften Annahme**. Formale Verifikation zielt direkt auf die Spezifikation, wo die tiefsten und verborgensten Fehler meist liegen.
- Die Garantie ist präzise: Das System erfüllt **die Spezifikation** unter **genannten Annahmen**. Eine falsche Spezifikation, eine falsch formulierte Definition oder eine fehlerhafte Annahme macht sie zunichte, und sie bedeutet niemals „nie wieder Fehler“.

---

## Glossar

| Begriff | Bedeutung in einfacher Sprache |
|---|---|
| **Formale Verifikation** | Der mathematische Beweis, dass ein System in allen Fällen eine Spezifikation erfüllt |
| **Spezifikation** | Eine präzise Aussage darüber, was „korrektes Verhalten“ bedeutet |
| **System** | Das tatsächlich überprüfte Programm, die Schaltung oder das Protokoll |
| **Beweis** | Eine endliche Kette logischer Schritte, die eine Behauptung für alle Fälle begründet |
| **Beweisassistent / Theorembeweiser** | Software (Lean, Rocq, Isabelle), die jeden Schritt eines Beweises prüft |
| **Maschinell geprüft** | Schritt für Schritt von einem Computer überprüft, nicht nur von Menschen gelesen |
| **Induktion** | Eine Beweistechnik: Am Anfang wahr, und jeder Schritt überträgt sie auf den nächsten |
| **Annahme** | Eine Bedingung, auf der der Beweis beruht; ist sie falsch, gilt die Garantie möglicherweise nicht |

---

## FAQ

**Ersetzt formale Verifikation Tests?**
Nein. Sie ergänzen einander. Tests finden praktische Probleme und fehlerhafte Annahmen kostengünstig; Verifikation schließt ganze Fehlerklassen aus, die Tests vielleicht nie abdecken.

**Wenn sie so mächtig ist, warum wird nicht alles formal verifiziert?**
Sie ist teuer und erfordert Spezialkenntnisse, auch wenn KI-Unterstützung diese Kosten senkt. Sie wird Systemen vorbehalten, bei denen ein seltener Fehler katastrophal wäre – genau dort lohnt sich ihr Aufwand.

**Kann ein formal verifiziertes System trotzdem versagen?**
Ja, wenn die Spezifikation falsch war, eine Definition falsch formuliert wurde, eine Annahme nicht galt oder der Fehler außerhalb dessen liegt, was spezifiziert wurde. Der Beweis deckt nur ab, was er abzudecken behauptet.

**Ist ein maschinell geprüfter Beweis vertrauenswürdiger als ein menschlicher?**
Bei großen, komplexen Beweisen im Allgemeinen ja. Eine Maschine übersieht keine subtile Lücke und akzeptiert kein vages Argument, obwohl sie weiterhin der Spezifikation und den Definitionen vertrauen muss, die ihr gegeben wurden.

**Wenn KI beim Schreiben des Beweises hilft, warum sollte man ihm vertrauen?**
Weil der Beweisassistent jeden Schritt mechanisch prüft. Die KI schlägt Schritte vor; die Maschine überprüft sie. Ein falscher Schritt wird einfach abgelehnt. KI beschleunigt daher die Arbeit, ohne die Garantie zu schwächen.

---

### Testen Sie Ihre Intuition

Sie beweisen, dass die Software einer Bank „niemals zulässt, dass ein Kontostand negativ wird“. Ein Jahr später verschwindet trotzdem Geld. Wie können beide Aussagen zugleich wahr sein? *(Antwort unten.)*

<details><summary>Antwort</summary>

Der Beweis garantierte genau eine Eigenschaft: Kontostände werden niemals negativ. Geld kann auf Arten verschwinden, die diese Eigenschaft nie erfasste, etwa durch einen Fehler, der Gelder auf das falsche (weiterhin nicht negative) Konto verschiebt, oder durch einen Mangel in einem Teil des Systems, der nie spezifiziert wurde. Die Verifikation tat genau das, was sie versprach, und nicht mehr. Das ist der Vorbehalt aus Abschnitt 6 in der Praxis: Ein Beweis deckt die Spezifikation ab, nicht jede denkbare Vorstellung von „korrekt“.
</details>

---

### Wie geht es weiter?

**Teil 2 · Der Orchard-Fehler:** Wir wenden uns der wahren Geschichte von 2026 in voller Länge zu. Ein Privatsphärensystem verbarg Beträge mithilfe kryptografischer Beweise, und eine unterbestimmte Zeile in seiner Mathematik bedeutete, dass diese Beweise zum Lügen gebracht werden konnten, wodurch unbegrenzte unsichtbare Geldfälschung möglich wurde. Wir werden genau sehen, was „eine unterbestimmte Schaltung“ bedeutet, warum sich diese Fehlerklasse für immer verbergen kann und warum sie mehr als einmal aufgetreten ist.

*Teil der* Serie zur formalen Verifikation *für [ZecHub](https://zechub.org).*
