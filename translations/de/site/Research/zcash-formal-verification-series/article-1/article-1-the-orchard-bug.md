![alt text](image-1.png)
# Der Orchard-Bug: Wenn ein Beweissystem eine Lücke hat

### Wie eine einzige nicht ausreichend eingeschränkte mathematische Zeile unbegrenzt unsichtbares Geld hätte erzeugen können

> **Reihe:** *Reihe zur formalen Verifikation* · **Teil 2 von 3**
> **Zielgruppe:** Einsteiger. Teil 1 führte die formale Verifikation ein; hier begegnen wir dem tatsächlichen Bug, der sie dringend machte. Alles Notwendige wird von Grund auf erklärt.
> **Was Sie mitnehmen werden:** ein intuitives, aber präzises Bild davon, wie ein kryptografisches Beweissystem eine Soundness-Lücke enthalten kann, was genau der „Orchard“-Bug von Zcash war, warum sich diese Klasse von Bugs jahrelang verbergen kann und warum sie schon zuvor aufgetreten ist.

In Teil 1 haben wir gesagt, dass Tests das Vorhandensein von Bugs zeigen können, niemals aber ihre Abwesenheit, und dass die gefährlichsten Bugs in der *Spezifikation* eines Systems liegen, also in seiner zugrunde liegenden Mathematik. Dieser Artikel ist die Fallstudie dazu. 2026 wurde ein Fehler im abgeschirmten Pool von Zcash, Orchard, gefunden, der einem Angreifer hätte ermöglichen können, unbegrenzt gefälschtes Geld unsichtbar zu erzeugen. Er hatte vier Jahre und wiederholte Audits überstanden. Ihn und seine Vorgänger zu verstehen, ist die denkbar deutlichste Motivation dafür, Systeme als korrekt zu beweisen.

---

## 1. Warum sollte Sie das interessieren?

Zcash ist eine Kryptowährung mit einem privaten Modus. In ihrem abgeschirmten Pool sind die Beträge, Absender und Empfänger von Transaktionen **verborgen**. Diese Privatsphäre wird durch **Zero-Knowledge-Beweise** geschaffen: kryptografische Beweise, dass eine Transaktion alle Regeln einhält, ohne ihren Inhalt offenzulegen.

Dieses Design hat zwei Seiten. Bei einem transparenten Ledger wie dem von Bitcoin wären die aufgeblähten Zahlen für alle sichtbar, wenn jemand Münzen aus dem Nichts erschaffen würde, und das Netzwerk könnte es erkennen und rückgängig machen. In einem abgeschirmten Pool sind die Zahlen absichtlich verborgen. Hätte also das Beweissystem selbst einen Fehler, der eine ungültige Transaktion gültig erscheinen lässt, wäre die Fälschung **nicht erkennbar**. Man könnte sie nicht durch Prüfung des Ledgers entdecken, weil das Ledger bewusst undurchsichtig ist.

Genau dieses Risiko wurde in Orchard Realität. Um es zu verstehen, müssen wir uns ansehen, was ein Zero-Knowledge-Beweis tatsächlich prüft.

---

## 2. Die Intuition: Ein Beweis ist nur so gut wie seine Checkliste

Stellen Sie sich einen Grenzbeamten vor, der Reisende genehmigen muss, ohne ihre Dokumente direkt zu sehen. Stattdessen füllt jeder Reisende eine **Checkliste** aus, und der Beamte genehmigt jeden, dessen Checkliste vollständig abgehakt ist. Die Checkliste ist so gestaltet, dass *nur ein rechtmäßiger Reisender jedes Kästchen abhaken kann.*

Nehmen wir nun an, der Checkliste fehlt ein entscheidendes Kästchen, etwa „der Pass ist nicht abgelaufen“. Fast alle füllen sie weiterhin ehrlich aus, und nichts scheint falsch zu sein. Aber auch eine Person mit abgelaufenem Pass kann *jedes verbleibende* Kästchen abhaken und problemlos durchkommen. Im alltäglichen Betrieb sieht das System gut aus. Die Lücke ist nur für jemanden relevant, der gezielt danach sucht.

Ein Zero-Knowledge-Beweis funktioniert wie diese Checkliste. Er legt die privaten Details nicht offen; er prüft, ob sie eine feste Menge von Bedingungen erfüllen. Und wenn eine notwendige Bedingung versehentlich ausgelassen wird, können auch einige ungültige Eingaben bestehen, während weiterhin alles normal aussieht.

Machen wir die „Checkliste von Bedingungen“ präzise, denn genau dort befand sich der Bug.

---

## 3. Die Mathematik: Schaltkreise, Constraints und Soundness

Im Hintergrund wird die Aussage „diese Transaktion ist gültig“ als **Schaltkreis** kodiert: eine feste Sammlung arithmetischer Bedingungen, **Constraints** genannt, die als Gleichungen über Zahlen formuliert sind. Um einen gültigen Beweis zu erstellen, muss der Beweiser geheime Werte – den **Witness** – liefern, die *jeden* Constraint erfüllen. Der Beweis überzeugt einen Verifizierer davon, dass ein solcher Witness existiert, ohne ihn offenzulegen.

Die Eigenschaft, die wir von diesem System benötigen, hat einen Namen:

> **Soundness:** Es muss unmöglich sein, einen gültigen Beweis für eine *falsche* Aussage zu erzeugen. Nur wahre Aussagen sollten Witnesses haben, die alle Constraints erfüllen.

Soundness ist die Garantie gegen Geldfälschung. Wenn Soundness gilt, bedeutet ein gültiger Beweis tatsächlich: „Eine echte, regelkonforme Transaktion hat stattgefunden.“ Hat Soundness eine Lücke, könnte ein gültiger Beweis überhaupt nichts bedeuten.

### Was ein fehlender Constraint bewirkt (ein geprüftes Beispiel)

Constraints müssen oft erzwingen, dass ein Wert einfach ist. Ein häufiges Beispiel: Ein Wert `b` soll ein einzelnes **Bit** sein, entweder `0` oder `1`. Der Standardweg dafür ist ein Constraint:

```
b × (b − 1) = 0
```

Warum funktioniert das? Ein Produkt ist nur dann null, wenn einer seiner Faktoren null ist. `b × (b − 1) = 0` erzwingt also `b = 0` oder `b = 1` – und nichts anderes. Prüft man jeden Wert von 0 bis 16 (in einer Arithmetik, die bei 17 wieder von vorn beginnt), sind die *einzigen* Werte, die ihn erfüllen, genau **0 und 1**. ✓

Stellen Sie sich nun vor, diese Zeile wird **versehentlich ausgelassen**. Plötzlich ist `b` nicht eingeschränkt. Ein unehrlicher Beweiser kann `b` auf `5` oder `9` oder irgendeinen beliebigen Wert setzen und dennoch die verbleibenden Constraints erfüllen. Diese einzelne fehlende Zeile ist eine **Soundness-Lücke**: Falsche Aussagen haben nun erfüllende Witnesses.

Das ist nicht hypothetisch. Ein fehlender Boolean-Constraint genau dieser Art wurde während der Entwicklung in Zcashs allererstem abgeschirmten Design Sprout gefunden und vor dem Start behoben. Unzureichende Einschränkungen gehören zu den häufigsten und gefährlichsten Fehlern beim Aufbau solcher Schaltkreise.

![alt text](image-2.png)

Das ist im Kleinen die gesamte Form des Orchard-Bugs. Nun zum echten Fall.

---

## 4. Was der Orchard-Bug tatsächlich war

Die abgeschirmten Beweise von Zcash basieren auf **elliptischen Kurven**, mathematischen Objekten, deren Punkte kombiniert und mit Zahlen „multipliziert“ werden können – Operationen, die der Schaltkreis durch Constraints erzwingen muss. Der Schaltkreis enthält Gadgets, die **Multiplikationen auf elliptischen Kurven** durchführen und prüfen, ob sie korrekt ausgeführt wurden.

Laut der Offenlegung von Shielded Labs und dem Forscher Taylor Hornby bestand der Fehler von Orchard genau darin:

> Ein **nicht ausreichend eingeschränktes Element des Orchard-Schaltkreises** ermöglichte es, **beliebige falsche Eingaben in eine Multiplikation auf einer elliptischen Kurve einzuspeisen und die Multiplikationsprüfung dennoch bestehen zu lassen.**

Einfach gesagt fehlten auf der Checkliste des Schaltkreises die Kästchen, welche diese Multiplikation hätten festlegen müssen. Wegen dieser Lücke hätte ein ausreichend erfahrener Angreifer einen Transaktionsbeweis konstruieren können, den das System akzeptiert, obwohl die Transaktion Wert aus dem Nichts erzeugte. Das ist **Geldfälschung**, und da die Beträge im abgeschirmten Pool verborgen sind, wäre sie im Ledger **nicht erkennbar** gewesen. Das Tachyon-Team beschrieb denselben Fehler später auf Codeebene als fehlende Zeilen im Schaltkreis, die die zugrunde liegenden Gleichungen unbemerkt verfälschten.

Die Parallelen zu unserer Checklisten-Geschichte sind exakt:

| Checklisten-Geschichte | Der Orchard-Bug |
|---|---|
| Ein fehlendes Kästchen „Pass nicht abgelaufen“ | Ein fehlender Constraint für eine Multiplikation auf einer elliptischen Kurve |
| Ein Reisender mit abgelaufenem Pass besteht trotzdem | Beliebige falsche Eingaben bestehen die Multiplikationsprüfung |
| Alle anderen sind nicht betroffen, daher sieht nichts falsch aus | Normale Transaktionen funktionierten perfekt und verdeckten den Fehler |
| Nur jemand, der danach sucht, findet die Lücke | Es brauchte einen Experten, der gezielt die Mathematik des Schaltkreises untersuchte |

Um klarzumachen, wie ernst dies war: Der Forscher schrieb mit KI-Unterstützung einen *vollständigen funktionierenden Exploit* und bestätigte in einem lokalen Testnetzwerk, dass er unbegrenzt viele nicht erkennbare gefälschte Münzen erzeugte. Das war ein echter und ausnutzbarer Fehler, keine theoretische Sorge.

---

## 5. Warum er vier Jahre lang verborgen blieb

Der Bug bestand in Orchard von seiner Aktivierung im **Mai 2022** bis zum Notfall-Fix im **Juni 2026**, trotz wiederholter professioneller Audits durch einige der weltweit besten Kryptografen. Wie?

Denn wie Teil 1 warnte: **Tests erfassen Stichproben von Fällen, und dieser Fehler lag in einem Fall, den niemand testete.** Gewöhnliche Transaktionen lösten den fehlenden Constraint niemals aus. Daher bestand jeder Test, und jeder Tag des normalen Betriebs sah fehlerfrei aus. Der Fehler war nur erreichbar, indem gezielt ein ungewöhnlicher Witness konstruiert wurde, der genau auf die Lücke zielte. Letztlich wurde er nicht durch das Ausführen von Tests gefunden, sondern durch *Schlussfolgern über die Mathematik des Schaltkreises*.

Die Entdeckung selbst zeigt, wohin sich Sicherheit entwickelt. Im April 2026 beauftragte Shielded Labs den Sicherheitsforscher **Taylor Hornby** gezielt damit, exakt nach dieser Art von Fehler zu suchen. Kurz nachdem Ende Mai 2026 ein neues KI-Spitzenmodell (Anthropics Claude Opus 4.8) veröffentlicht worden war, nutzte Hornby es zusammen mit einer maßgeschneiderten Analyseumgebung und traditionellen Methoden für eine gezielte Prüfung des Orchard-Schaltkreises. Am **29. Mai 2026** wurde bei dieser Prüfung die Schwachstelle gefunden.

Zwei nüchterne Fakten aus der Offenlegung sollten klar benannt werden:

- Das Team fand **keine Belege** dafür, dass der Bug jemals ausgenutzt wurde, und hält eine frühere Ausnutzung für unwahrscheinlich (er hatte jahrelange Expertenprüfung überstanden und wurde durch eine gezielte White-Hat-Untersuchung gefunden). Doch gerade die Natur eines *nicht erkennbaren* Fehlers bedeutet, dass das Ledger allein nicht vollständig beweisen kann, dass dies nie geschah.
- Die Entdeckung löste erhebliche Unruhe aus, einschließlich eines starken Preisrückgangs des Assets, gerade weil die *Möglichkeit* verdeckter Geldfälschung für Geld so gravierend ist.

![alt text](image-3.png)

---

## 6. Dies war nicht das erste Mal

Der Orchard-Bug gehört zu einer wiederkehrenden Familie, und diese Familie zu erkennen macht formale Verifikation nicht optional, sondern unvermeidlich. Ein Fälschungsfehler geht immer auf eine von drei Quellen zurück (die Taxonomie aus Teil 1): die **Spezifikation** (die Mathematik selbst), die **Implementierung** (Code, der korrekter Mathematik nicht folgt) oder eine **gebrochene Annahme**. Und entscheidend:

> Ein Fälschungsbug ist nur dann **nicht erkennbar**, wenn er in der **Spezifikation** liegt. Implementierungsfehler hinterlassen dauerhafte öffentliche Belege, weil jeder Block den vollständigen Inhalt jeder Transaktion speichert; ein erneutes Abspielen der Historie mit korrigierter Software würde daher jede Transaktion aufdecken, die der fehlerhafte Code fälschlich akzeptiert hat.

Auch die Geschichte von Zcash veranschaulicht dieses Muster:

| Bug (Jahr) | Quelle | Erkennbar? |
|---|---|---|
| Zerocash-Commitment-Fehler (2016, vor dem Start) | Spezifikation (ein gekürzter Hash brach eine Bindungseigenschaft) | Nicht erkennbar |
| Soundness-Fehler beim Trusted Setup (2018) | Spezifikation (ein Fehler im zugrunde liegenden zk-SNARK-Paper) | Nicht erkennbar |
| Kollision von Anfragen im Beweissystem (2025) | Spezifikation (eine fehlende Prüfung im Beweissystem) | Erkennbar |
| Fehler bei der Validierung von Kurven-Untergruppen (2016) | Implementierung (eine fehlende Untergruppenprüfung) | Erkennbar |
| **Nicht ausreichend eingeschränkte Multiplikation von Orchard (2026)** | **Spezifikation (der Schaltkreis)** | **Nicht erkennbar** |

Die durchgehende Linie ist deutlich: Die Fehler, die sich für immer verbergen könnten, sind jene in der Mathematik. Genau diese Klasse kann ein maschinell geprüfter Beweis der Spezifikation auf einmal für alle Fälle ausschließen. Tests und Audits nehmen Stichproben; nur ein Beweis der Mathematik deckt jede Eingabe ab.

---

## 7. Die Reaktion

Die Entwickler von Zcash handelten schnell und stufenweise:

1. **Notfallbehebung (bis 1.–2. Juni 2026).** Innerhalb weniger Tage nach der Offenlegung schloss ein Notfall-Netzwerkupgrade das Zeitfenster der Schwachstelle, indem es die fehlenden Constraints ergänzte, sodass die Mathematik des Schaltkreises wieder sound war.
2. **Ein neuer, beweisbarer Anfang („Ironwood“, aktiviert am 28. Juli 2026).** Anstatt einer gepatchten Version des alten Pools auf unbestimmte Zeit zu vertrauen, startete die Community einen völlig neuen abgeschirmten Pool, Ironwood, auf Basis des korrigierten Schaltkreises, jedoch mit sauberem Neubeginn und begleitet von einem formalen, maschinell geprüften Korrektheitsbeweis.

Dieser zweite Schritt führt die formale Verifikation in die Geschichte ein und ist das Thema von Teil 3. Die Erkenntnis, nach der das Team handelte, ist eine Vorschau wert, weil sie diese gesamte Reihe zusammenführt:

> Ein *nicht erkennbarer* Fälschungsfehler kann nur in der **Spezifikation** des Protokolls liegen. Wenn Sie also **beweisen können, dass die Spezifikation** Geldfälschung ausschließt, beseitigen Sie die gesamte Fehlerklasse, die sich hier vier Jahre lang verbarg.

Das ist genau die Idee der ersten Säule aus Teil 1: Verifizieren Sie die Spezifikation, und Sie schließen die Lücke, die Tests niemals schließen konnten.

---

## 8. Ein ehrlicher Hinweis

Wir haben bewusst vereinfacht. Der echte Schaltkreis umfasst Hunderte von Bereichen und viele Tausend Constraints, und der tatsächliche Fehler ist technisch komplexer als eine einzelne fehlende Bit-Prüfung; wir verwenden die Bit-Prüfung, weil sie die *Form* eines nicht ausreichend eingeschränkten Schaltkreises exakt zeigt und weil dieser genaue Fehler in der Geschichte von Zcash tatsächlich vorkam. Der präzise Fehler von Orchard war, wie in der offiziellen Offenlegung beschrieben, eine nicht ausreichend eingeschränkte Multiplikation auf einer elliptischen Kurve. Wir haben außerdem die Zeitachse der Offenlegung und Behebung verdichtet. Den maßgeblichen technischen Bericht finden Sie in der Offenlegung von Shielded Labs und den Beiträgen von Project Tachyon.

---

## 9. Zusammenfassung

- Der abgeschirmte Pool von Zcash verbirgt Beträge mithilfe von **Zero-Knowledge-Beweisen**, sodass ein Fehler in diesen Beweisen **unsichtbare Geldfälschung** ermöglichen könnte.
- Ein Beweissystem prüft einen festen **Schaltkreis** von **Constraints**; seine entscheidende Eigenschaft ist **Soundness**: Nur wahre Aussagen sollten einen erfüllenden **Witness** haben.
- Ein **fehlender Constraint** erzeugt eine **Soundness-Lücke**, durch die falsche Aussagen bestehen können. (Geprüfter Spielzeugfall: `b(b−1)=0` zwingt `b` auf 0 oder 1; lässt man ihn weg, kann `b` beliebig sein. Diese genaue Fehlerklasse ist in der Geschichte von Zcash real.)
- Der **Orchard-Bug** war eine **nicht ausreichend eingeschränkte Multiplikation auf einer elliptischen Kurve**: Beliebige falsche Eingaben konnten die Multiplikationsprüfung bestehen und unbegrenzte, nicht erkennbare Geldfälschung ermöglichen. Ein funktionierender Exploit wurde in einem Testnetzwerk vorgeführt.
- Er blieb **vier Jahre** verborgen (Mai 2022 bis Juni 2026), weil Tests nur Stichproben von Fällen erfassen und diesen Fall nicht testeten; er wurde am 29. Mai 2026 durch Schlussfolgern über die Mathematik und mit KI-Unterstützung gefunden.
- Nicht erkennbare Geldfälschung kann nur in der **Spezifikation** liegen, und Zcash hat diese Fehlerfamilie schon zuvor erlebt. Zcash reagierte mit einem Notfall-Fix und einem neuen, formal verifizierten Pool, **Ironwood**, dem Thema von Teil 3.

---

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| **Abgeschirmter Pool** | Der private Modus von Zcash, in dem Beträge und Beteiligte verborgen sind |
| **Zero-Knowledge-Beweis** | Ein Beweis, dass eine verborgene Aussage gültig ist, ohne etwas anderes offenzulegen |
| **Schaltkreis** | Die feste Menge arithmetischer Bedingungen, die eine gültige Transaktion erfüllen muss |
| **Constraint** | Eine Bedingung (Gleichung) innerhalb des Schaltkreises |
| **Witness** | Die geheimen Werte, welche die Constraints erfüllen |
| **Soundness** | Die Garantie, dass nur wahre Aussagen einen gültigen Beweis erzeugen können |
| **Soundness-Lücke** | Ein fehlender Constraint, der falsche Aussagen bestehen lässt |
| **Nicht ausreichend eingeschränkt** | Ein Schaltkreis, dem eine benötigte Bedingung fehlt, die Ursache des Orchard-Bugs |
| **Erkennbar / nicht erkennbar** | Ob eine Ausnutzung Belege im öffentlichen Ledger hinterlassen würde |

---

## FAQ

**Wurde tatsächlich gefälschtes Zcash erzeugt?**
Es wurden keine Belege für eine Ausnutzung gefunden, und das Team hält sie für unwahrscheinlich. Da der Fehler im Ledger jedoch nicht erkennbar gewesen wäre, kann das Ledger allein nicht vollständig beweisen, dass dies nie geschah. Deshalb war die Reaktion so umfassend.

**Warum macht das Verbergen von Beträgen einen Bug schlimmer?**
Bei einer transparenten Chain sind erzeugte Münzen sichtbar und können erkannt und rückgängig gemacht werden. Wenn Beträge aus Datenschutzgründen verborgen sind, erzeugt ein Fälschungsbug keine sichtbare Anomalie und kann daher unbemerkt bestehen bleiben.

**Warum haben jahrelange Audits ihn nicht entdeckt?**
Audits und Tests untersuchen überwiegend Verhalten in realistischen Fällen. Dieser Fehler trat nur bei einer absichtlich konstruierten, ungewöhnlichen Eingabe auf, die auf einen mathematischen Sonderfall zielte und bei routinemäßigen Prüfungen nicht vorkam. Er wurde durch gezieltes Schlussfolgern über den Schaltkreis gefunden, nicht durch Tests.

**Reicht wirklich ein fehlender Constraint aus?**
Ja. Ein Beweissystem ist nur so stark wie seine vollständige Menge an Constraints. Eine einzige ausgelassene notwendige Bedingung genügt, um ungültige Aussagen durchzulassen.

**Welche Rolle spielte KI?**
Ein Forscher nutzte ein KI-Spitzenmodell zusammen mit einer maßgeschneiderten Umgebung und traditionellen Methoden, um die Mathematik des Schaltkreises zu prüfen und den Fehler zu finden. KI wird zunehmend auf beiden Seiten der Sicherheit eingesetzt. Das ist ein Grund dafür, warum es heute so wichtig ist, Systeme als korrekt zu beweisen.

---

### Testen Sie Ihre Intuition

Nehmen wir an, eine abgeschirmte Transaktion soll beweisen: „Geld hinein entspricht Geld hinaus“, aber der Schaltkreis vergisst, einen Ausgabewert einzuschränken. Was könnte ein unehrlicher Beweiser tun, und warum würde das öffentliche Ledger völlig normal aussehen? *(Antwort unten.)*

<details><summary>Antwort</summary>

Da diese Ausgabe nicht eingeschränkt ist, könnte der Beweiser sie höher setzen, als die tatsächlichen Eingaben erlauben, und so Wert aus dem Nichts erzeugen – eine Fälschung. Der Beweis würde weiterhin verifiziert, weil der fehlende Constraint das Einzige ist, was das Ungleichgewicht erkannt hätte. Und da der abgeschirmte Pool Beträge verbirgt, zeigt das Ledger nur, dass „eine gültige Transaktion stattgefunden hat“, ohne sichtbares Ungleichgewicht, das Alarm auslösen könnte. Die Fälschung ist real, aber unsichtbar. Genau deshalb ist die Soundness des Schaltkreises so wichtig und muss bewiesen statt getestet werden.
</details>

---

### Was als Nächstes kommt

**Teil 3 · Ironwood:** Der Fix war nicht nur ein Patch. Die Ingenieure von Zcash bauten einen neuen abgeschirmten Pool und begleiteten ihn mit einem maschinell geprüften mathematischen Beweis aus mehr als 2.700 Theoremen, geschrieben im Beweisassistenten Lean, dass er unter seinen angegebenen Annahmen kein gefälschtes Geld erzeugen kann. Wir werden sehen, was „Balance Integrity“ und „Knowledge Soundness“ bedeuten, was genau der Beweis abdeckt und nicht abdeckt und wie der alte Pool sicher stillgelegt wurde.

*Teil der* Reihe zur formalen Verifikation *für [ZecHub](https://zechub.org).*
