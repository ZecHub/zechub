# Endliche Körper: Das Zahlensystem, in dem Kryptographie lebt
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alternativtext](image-5.png)

### Warum „Wrap-around“ das geheime Fundament von Zcash ist

> **Reihe:** *Zcash from First Principles* . **Artikel 1 . Endliche Körper**
> **Zielgruppe:** Einsteiger. Wir setzen nur gewöhnliche Schulmathematik voraus (Addieren, Multiplizieren, Dividieren). Keine Vorkenntnisse in Kryptographie oder höherer Mathematik.
> **Was Sie mitnehmen werden:** ein intuitives und korrektes Verständnis endlicher Körper, warum Kryptographen sie verwenden und wo sie innerhalb von Zcash auftauchen.

In [Artikel 0](article-0-shielded-transaction.md) sind wir fünf Figuren begegnet: der Note, dem Commitment, dem Note-Commitment-Baum, dem Nullifier und dem Zero-Knowledge-Proof. Wir haben dabei eine offene Frage zurückgelassen: *Woher kommen eigentlich all die Schlüssel und geheimen Rezepte?* Sie kommen aus Zahlen. Aber nicht aus den gewöhnlichen Zahlen, mit denen Sie aufgewachsen sind. Sie kommen aus einem besonderen, in sich geschlossenen Zahlensystem namens **endlicher Körper**, und fast jeder Teil der Kryptographie in Zcash baut darauf auf.

Dieser Artikel entwickelt diese Idee Schritt für Schritt. Wie versprochen: zuerst die Intuition. Keine Formeln, bis sie sich wirklich lohnen.

---

## 1. Warum sollte Sie das interessieren?

Gewöhnliche Zahlen haben für die Kryptographie ein Problem: Es gibt unendlich viele von ihnen, und sie verraten Informationen.

Denken Sie darüber nach, was passiert, wenn eine Zahl *größer* wird. Wenn ich Ihnen sage, eine geheime Berechnung habe `8,142,067` ergeben, wissen Sie bereits ziemlich viel: Es ist eine siebenstellige Zahl, sie ist ungerade, sie ist „ziemlich groß“. Größe ist ein Hinweis. Und Hinweise sind genau das, was sich ein Privatsphäre-System nicht leisten kann preiszugeben.

Die Kryptographie will ein Zahlensystem, in dem:

- es **endlich viele** Werte gibt, sodass ein Computer jeden von ihnen exakt speichern kann, ohne Rundung und ohne Überlauf,
- die Werte **ihre Größe nicht verraten**, weil das System keinen echten Begriff von „größer“ hat,
- man trotzdem **frei und reversibel addieren, subtrahieren, multiplizieren und dividieren** kann, weil kryptographische Rezepte echte Algebra brauchen, um zu funktionieren, und
- der Raum **astronomisch groß** gemacht werden kann, sodass Raten aussichtslos ist.

Diese Wunschliste hat einen Namen. Sie ist ein **endlicher Körper**. Lassen Sie uns zuerst die Intuition dafür aufbauen, bevor wir ein einziges Symbol hinschreiben.

---

## 2. Die Intuition: eine Uhr

Sie verwenden jeden Tag bereits einen endlichen Körper. Es ist die Uhr an Ihrer Wand.

Auf einer 12-Stunden-Uhr gibt es ein *Wrap-around* der Zahlen. Beginnen Sie bei 10 Uhr, addieren Sie 5 Stunden, und Sie landen nicht bei „15 Uhr“, sondern bei **3 Uhr**. Die Uhr hat nur zwölf Positionen, und wenn man über den Höchstwert hinauszählt, springt man einfach wieder zum Anfang zurück.

![Alternativtext](image-9.png)

Gerade sind drei Dinge passiert, die den ganzen Kern dieses Artikels ausmachen:

1. **Die Welt ist endlich.** Es gibt genau zwölf Positionen, egal wie lange man zählt.
2. **Addieren funktioniert weiterhin.** Man kann den ganzen Tag Stunden addieren; man landet immer auf einer gültigen Uhrenposition.
3. **Größe hat aufgehört, wichtig zu sein.** „3 Uhr“ verrät Ihnen nicht, ob Sie 3 Stunden oder 15 oder 27 gezählt haben. Das Wrap-around hat die Größeninformation *ausgelöscht*. Genau dieses Auslöschen ist die eigenschaftsfreundliche Privatsphäre-Eigenschaft, die wir wollten.

Diese Wrap-around-Arithmetik hat einen formalen Namen: **modulare Arithmetik**. Die Uhr arbeitet „modulo 12“, geschrieben **mod 12**. Mathematiker zählen Positionen lieber ab 0, also hat eine „Uhr mod 12“ eigentlich die Positionen `0, 1, 2, ..., 11`. Eine Uhr mod 7 hätte die Positionen `0` bis `6`.

> **Die eine Regel:** Um irgendetwas „mod p“ zu berechnen, führen Sie die gewöhnliche Rechnung aus, teilen dann durch `p` und behalten nur den Rest.
> Beispiel mod 7: `5 + 4 = 9`, und `9` lässt bei Division durch `7` den Rest `2`, also ist `5 + 4 = 2 (mod 7)`.

---

## 3. Von einer Uhr zu einem Körper

Mit einer Uhr können wir addieren. Ein **Körper** ist das Upgrade: ein Zahlensystem, in dem sich alle vier Rechenarten gut verhalten, einschließlich der kniffligen, der Division.

Informell ist ein **Körper** jede Sammlung von „Zahlen“, in der man **addieren, subtrahieren, multiplizieren und dividieren** kann (durch alles außer null), und in der weiterhin alle vertrauten Regeln gelten: Die Reihenfolge spielt bei Addition oder Multiplikation keine Rolle, Klammern können anders gruppiert werden, es gibt eine `0` und eine `1`, und jede Zahl hat ein Negatives und (außer `0`) ein Reziprokes.

Die rationalen Zahlen sind ein Körper. Die reellen Zahlen sind ein Körper. Was wir wollen, ist ein *endlicher*.

Hier ist das zentrale Ergebnis, und es ist wunderschön:

> **Nehmen Sie die ganzen Zahlen `0, 1, ..., p-1` und führen Sie alle Arithmetik mod `p` aus. Wenn `p` eine Primzahl ist, ist das Ergebnis ein endlicher Körper.** Wir schreiben ihn als `F_p` (gesprochen „F Index p“).

Also ist `F_7 = {0, 1, 2, 3, 4, 5, 6}` mit Uhr-Arithmetik mod 7 ein echter endlicher Körper. Schauen wir ihm beim Atmen zu.

### Multiplikation in F_7 (verifiziert)

Jeder Eintrag ist `(Zeile x Spalte) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Betrachten Sie die Zeilen für `1` bis `6`: Jede enthält jeden von null verschiedenen Wert `1..6` genau einmal. Dieses Muster „keine Wiederholungen, nichts fehlt“ ist der sichtbare Fingerabdruck eines Körpers.

### Division: die Magie, die eine Primzahl braucht

Division ist einfach „mit dem Reziproken multiplizieren“. In `F_7` ist das Reziproke (oder **Inverse**) einer Zahl `a` der Wert `a^(-1)`, für den `a x a^(-1) = 1` gilt. Direkt aus der Tabelle abgelesen:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Prüfen Sie eins nach: `2 x 4 = 8 = 1 (mod 7)`. Also bedeutet „durch 2 teilen“ in `F_7`: „mit 4 multiplizieren“. Jedes von null verschiedene Element hat einen Partner. **Genau das macht `F_7` zu einem Körper.**

---

## 4. Warum der Modulus eine Primzahl sein muss

Das ist die wichtigste einzelne Idee in diesem Artikel, also machen wir sie lieber konkret als abstrakt.

Schauen wir uns an, was kaputtgeht, wenn wir naiv versuchen, einen „Körper“ mod `6` zu bauen (und `6` ist *keine* Primzahl):

> Gibt es irgendein `x` mit `2 x x = 1 (mod 6)`? Wenn man alle überprüft: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Die Antwort `1` erscheint nie.** Also hat `2` kein Reziprokes mod 6. Noch schlimmer: `2 x 3 = 6 = 0 (mod 6)`: Zwei von null verschiedene Zahlen wurden multipliziert und ergaben null.

Dieser zweite Satz ist eine Katastrophe für die Arithmetik. Zwei von null verschiedene Dinge, die zu null multiplizieren (ein sogenannter **Nullteiler**), bedeuten, dass die Division kaputt ist, und ein System mit kaputter Division ist kein Körper. Das passiert genau deshalb, weil `6` als `2 x 3` faktorisiert.

Eine Primzahl hat per Definition keine solchen Faktoren. Deshalb können mod einer Primzahl keine Nullteiler auftreten, jedes von null verschiedene Element bekommt ein sauberes Reziprokes, und die Struktur ist ein ordentlicher Körper.

![Alternativtext](image-8.png)

> **Wiederverwendbarer Einzeiler für Ihre Artikel:** *Primzahl-Modulus hinein, saubere Division heraus.*

---

## 5. Die eine Formel, die es wert ist, kennengelernt zu werden: wie Computer Inverse finden

Für `F_7` haben wir die Inversen aus einer Tabelle abgelesen, aber die Primzahl von Zcash hat Hunderte von Stellen; eine Tabelle ist unmöglich. Es gibt eine klassische Abkürzung, und sie ist die einzige Formel in diesem Artikel.

**Der kleine Satz von Fermat** sagt, dass für eine Primzahl `p` und jedes von null verschiedene `a` gilt:

```
a^(p-1) = 1   (mod p)
```

Wenn man das umstellt (einen Faktor `a` abspaltet), erhält man das Inverse gratis:

```
a^(-1) = a^(p-2)   (mod p)
```

Test in `F_7` (`p = 7`, also `p - 2 = 5`): Das Inverse von `2` sollte `2^5 = 32 = 4 (mod 7)` sein. Und tatsächlich sagte unsere Tabelle `2^(-1) = 4`. Computer potenzieren sehr große Exponenten extrem schnell, sodass aus „Finde das Reziproke“ selbst für gigantische Primzahlen eine schnelle, exakte Berechnung wird.

Sie müssen sich das nicht merken. Sie müssen wissen, dass **Division in einem endlichen Körper eine schnelle, exakte Operation ist**, und genau deshalb bauen Kryptographen gerne darauf auf.

---

## 6. Warum sich die Kryptographie in endliche Körper verliebt hat

Setzt man die Intuition zusammen, ergibt sich der ganze Fall auf einer einzigen Seite.

| Eigenschaft von `F_p` | Warum ein Privatsphäre-System sie will |
|---|---|
| **Endlich** | Ein Computer speichert jedes Element exakt; keine Rundung, kein Überlauf, kein Gleitkomma-Rauschen |
| **Wrap-around** | Löscht „Größe“, sodass ein Wert nichts darüber verrät, wie er erzeugt wurde |
| **Alle vier Rechenarten funktionieren** | Kryptographische Rezepte (Schlüssel, Commitments, Proofs) brauchen echte Algebra, nicht bloß Zählen |
| **Wählbare Größe** | Wählen Sie eine 255-Bit- oder 381-Bit-Primzahl, und der Körper hat mehr Elemente, als es Atome im beobachtbaren Universum gibt; Raten ist aussichtslos |
| **Exakt und deterministisch** | Zwei ehrliche Parteien, die dasselbe berechnen, erhalten immer identische Ergebnisse, wovon Proofs abhängen |

Ein endlicher Körper ist in einem Satz **ein perfekt geschlossener, perfekt exakter, perfekt riesiger Spielplatz für Arithmetik.** Alles andere in Zcash wird dadurch aufgebaut, dass man in ihm spielt.

---

## 7. Wo das in Zcash lebt

Sie müssen „Zcash verwendet endliche Körper“ nicht einfach glauben. Hier ist die konkrete Landkarte (die tiefere Maschinerie ist Stoff für spätere Artikel; hier geht es nur darum zu zeigen, dass die Fingerabdrücke echt sind).

- **Sapling** (ein älteres Shielded-Design) baut seine Proofs auf einer Kurve namens **BLS12-381** auf, deren Basiskörper eine Primzahl mit **381 Bits** verwendet. Jede Koordinate, jeder Schlüssel und jedes Proof-Element ist ein Element eines auf dieser Primzahl aufgebauten endlichen Körpers.
- **Orchard** (das aktuelle Shielded-Design) verwendet ein Kurvenpaar namens **Pallas und Vesta** (die „Pasta“-Kurven), deren Körper Primzahlen mit ungefähr **255 Bits** verwenden.
- Das **Note-Commitment**, der **Nullifier** und die Zahlen innerhalb eines **Zero-Knowledge-Proof** aus Artikel 0 sind im Grunde alles Elemente eines dieser endlichen Körper. Wenn das Protokoll sagt „Berechne dieses Commitment“, dann bedeutet das „Führe diese Arithmetik mod dieser Primzahl aus“.

![Alternativtext](image-7.png)

Die Antwort auf die offene Frage aus Artikel 0, *„Woher kommen die geheimen Rezepte?“*, beginnt also hier: **Alles beginnt als Arithmetik in einem endlichen Körper.** Im nächsten Artikel nehmen wir diesen Körper und bauen daraus die eigentlichen Objekte, Punkte auf einer elliptischen Kurve, die zu Schlüsseln und Commitments werden.

---

## 8. Ein ehrlicher Hinweis

Damit der Text einsteigerfreundlich bleibt, haben wir einige wahre Dinge vereinfacht. Endliche Körper gibt es nicht nur in der Form `F_p`; man kann auch Körper mit `p^n` Elementen bauen (sogenannte **Erweiterungskörper**), und diese sind wichtig für die „Pairings“, auf denen Saplings Proof-System beruht. Wir haben außerdem die vollständige Liste der Körperaxiome ausgelassen und nur oberflächlich behandelt, wie Primzahlen dieser Größe ausgewählt und validiert werden. Nichts davon verändert die Intuition, die Sie jetzt haben; es verfeinert sie. Wir fügen die Präzision später wieder hinzu, mit Warnschildern, wenn ein späterer Artikel sie braucht.

---

## 9. Zusammenfassung

- Kryptographie braucht ein Zahlensystem, das **endlich, exakt, größenblind, vollständig invertierbar und enorm** ist. Dieses System ist ein **endlicher Körper**.
- Die Intuition ist eine **Uhr**: Arithmetik mit **Wrap-around** (modulare Arithmetik), die praktischerweise die „Größe“ einer Zahl auslöscht.
- Führt man Arithmetik mit den Zahlen `0..p-1` mod einer **Primzahl** `p` aus, erhält man einen echten Körper `F_p`, in dem man auch **dividieren** kann, weil jedes von null verschiedene Element ein Inverses hat.
- Der Modulus **muss prim** sein: Ein zusammengesetzter Modulus erzeugt Nullteiler (wie `2 x 3 = 0 mod 6`) und zerstört die Division.
- Computer finden Inverse schnell über **den kleinen Satz von Fermat** (`a^(-1) = a^(p-2)`).
- In **Zcash** ist jeder Schlüssel, jedes Commitment, jeder Nullifier und jedes Proof-Element letztlich ein Element eines großen endlichen Körpers (255-Bit-Pasta-Körper für Orchard, ein 381-Bit-Körper für Saplings BLS12-381).

---

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| **Modulare Arithmetik** | Arithmetik, die nach Erreichen eines festen Werts wieder von vorne beginnt, wie bei einer Uhr |
| **mod p** | „Durch `p` teilen und den Rest behalten“ |
| **Körper** | Ein Zahlensystem, in dem Addition, Subtraktion, Multiplikation und Division alle funktionieren |
| **Endlicher Körper `F_p`** | Die Zahlen `0..p-1` mit Arithmetik mod einer Primzahl `p` |
| **Inverses (Reziprokes)** | Das Element `a^(-1)` mit `a x a^(-1) = 1`; „durch `a` teilen“ bedeutet, mit ihm zu multiplizieren |
| **Nullteiler** | Zwei von null verschiedene Werte, deren Produkt null ist; das ist das, was zusammengesetzte Moduli ruiniert |
| **Primzahl** | Eine ganze Zahl größer als 1 ohne Teiler außer 1 und sich selbst |

---

## FAQ

**Warum nicht einfach gewöhnliche ganze Zahlen oder Dezimalzahlen verwenden?**
Dezimalzahlen runden und driften; ganze Zahlen wachsen unbegrenzt und verraten Größe. Endliche Körper sind exakt, beschränkt und größenblind, und genau das braucht die Kryptographie.

**Geht durch das „Wrap-around“ Information verloren?**
Absichtlich, ja. Das Auslöschen der Größe von Zwischenwerten ist für Privatsphäre ein Feature, kein Bug.

**Ist eine größere Primzahl immer sicherer?**
Grob gesagt bedeutet ein größerer Körper mehr mögliche Werte und schwereres Raten, aber Sicherheit hängt von der gesamten Konstruktion ab, nicht allein von der Körpergröße. Spätere Artikel machen das präzise.

**Warum gerade diese speziellen Primzahlen (255-Bit, 381-Bit) in Zcash?**
Sie werden so gewählt, dass die auf ihnen aufgebauten Kurven die richtige Struktur und Effizienz für das Proof-System haben. Diese „richtige Struktur“ ist Thema der nächsten beiden Artikel.

---

### Testen Sie Ihre Intuition

Was ist in `F_7` der Wert von `5 - 6`? (Denken Sie daran: Bleiben Sie durch Wrap-around innerhalb von `{0,...,6}`.) *(Antwort unten.)*

<details><summary>Antwort</summary>

`5 - 6 = -1`, und `-1`, in `F_7` hineingewrappt, ist `6` (weil `6 + 1 = 7 = 0`). Also ist `5 - 6 = 6 (mod 7)`. Die Subtraktion verlässt den Körper nie; sie wrappt einfach in die andere Richtung.
</details>

---

### Was als Nächstes kommt

**Artikel 2 . Elliptische Kurven:** Wir nehmen den endlichen Körper, den wir gerade gebaut haben, und verwenden ihn, um eine seltsame Art von Kurve zu zeichnen, deren Punkte miteinander „addiert“ werden können. Diese Punkte werden zu den Schlüsseln und Commitments von Zcash, und sie verbergen eine Einweg-Falltür, die das ganze Privatsphäre-System erst möglich macht. Wie immer zuerst die Intuition.

*Teil der Reihe* Zcash from First Principles *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
