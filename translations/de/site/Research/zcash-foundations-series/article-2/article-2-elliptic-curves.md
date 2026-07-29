# Elliptische Kurven: Wo Zcashs Schlüssel und Commitments entstehen
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alternativtext](image-10.png)

### Eine Einbahnstraße, gebaut aus Punkten auf einer Kurve

> **Reihe:** *Zcash von den ersten Prinzipien aus* . **Artikel 2 . Elliptische Kurven**
> **Zielgruppe:** Einsteiger. Wir setzen nur [Artikel 1 (endliche Körper)](article-1-finite-fields.md) voraus: Arithmetik, die sich modulo einer Primzahl zyklisch wiederholt. Kein weiteres Vorwissen nötig.
> **Was du mitnimmst:** ein intuitives und korrektes Bild von elliptischen Kurven, der „Falltür“, die sie nützlich macht, und genau wie Zcash daraus Schlüssel und Commitments macht.

[Artikel 1](article-1-finite-fields.md) gab uns einen perfekten Spielplatz für Arithmetik: den endlichen Körper. Aber ein Körper für sich allein besteht nur aus Zahlen. Um Schlüssel und die „versiegelten Umschläge“ aus [Artikel 0](article-0-shielded-transaction.md) zu bauen, braucht Zcash ein Objekt mit einer besonderen, einseitigen Art von Schwierigkeit: vorwärts leicht zu berechnen, rückwärts praktisch unmöglich. Dieses Objekt ist eine **elliptische Kurve**. Dieser Artikel baut sie von Grund auf auf – Intuition vor Algebra.

---

## 1. Warum sollte dich das interessieren?

Jedes Privacy-System braucht eine **Einbahnstraße**: eine Operation, die vorwärts trivial auszuführen und rückwärts praktisch unmöglich ist.

Warum? Dein **geheimer Schlüssel** ist eine Zahl, die du verborgen hältst. Dein **öffentlicher Schlüssel** (und deine Adresse) wird daraus abgeleitet und der Welt gezeigt. Die gesamte Sicherheit des Systems beruht auf einer Tatsache: *Gegeben den öffentlichen Schlüssel kann niemand rückwärts auf deinen geheimen Schlüssel schließen.* Wenn das möglich wäre, könnte man dein Geld ausgeben.

Wir brauchen also eine mathematische Operation, bei der:

- vorwärts (**geheim -> öffentlich**) schnell und einfach ist, aber
- rückwärts (**öffentlich -> geheim**) so schwer ist, dass alle Computer auf der Erde zusammen während der gesamten Lebensdauer des Universums nicht fertig würden.

Gewöhnliche Multiplikation im endlichen Körper reicht nicht aus; Division macht sie sofort rückgängig (genau darum ging es in Artikel 1). Wir brauchen etwas ohne einfachen „Rückgängig“-Knopf. Elliptische Kurven liefern genau das, und als Bonus lassen sich ihre Punkte auf eine Weise kombinieren, die perfekt zum Bauen von Commitments ist. Schauen wir uns an, wie.

---

## 2. Die Intuition: eine Kurve, deren Punkte man „addieren“ kann

Vergiss für einen Moment die Kryptographie. Eine **elliptische Kurve** ist einfach die Menge aller Punkte `(x, y)`, die eine Gleichung der Form erfüllen:

```
y^2 = x^3 + ax + b
```

Über den gewöhnlichen Zahlen sieht sie aus wie eine glatte, geschwungene Kurve, oft mit einer abgerundeten Schleife und zwei Ausläufern:

![Alternativtext](image-14.png)

Der wirklich überraschende Teil: **Man kann zwei Punkte auf dieser Kurve „addieren“ und erhält einen dritten Punkt auf derselben Kurve.** Das ist keine gewöhnliche Addition von Koordinaten. Es ist eine geometrische Regel, und sie ist leichter zu *sehen* als zu beschreiben.

### Die Sekantenregel (zwei verschiedene Punkte addieren)

Um `P + Q` zu addieren:

1. Zeichne eine gerade Linie durch `P` und `Q`.
2. Diese Linie trifft die Kurve an genau einer weiteren Stelle. Nenne sie `R*`.
3. **Spiegele `R*` an der horizontalen Achse.** Dieses Spiegelbild ist die Antwort, `P + Q`.

![Alternativtext](image-11.png)

### Die Tangentenregel (einen Punkt mit sich selbst addieren)

Um `P + P` (geschrieben `2P`) zu berechnen, gibt es keinen zweiten Punkt, durch den man eine Linie ziehen könnte, also verwendet man stattdessen die **Tangente** an `P` und folgt dann demselben Rezept „dritter Schnittpunkt, dann spiegeln“.

Das ist die gesamte Operation. Zwei geometrische Regeln. Mit ihnen bilden die Punkte einer elliptischen Kurve das, was Mathematiker eine **Gruppe** nennen: eine Menge mit einer wohldefinierten „Addition“. Sie hat sogar eine „Null“.

### Der Punkt im Unendlichen (die Null der Kurve)

Jedes Zahlensystem braucht eine `0`, also das Element, das nichts verändert, wenn man es addiert. Auf einer elliptischen Kurve übernimmt diese Rolle ein besonderer zusätzlicher Punkt namens **Punkt im Unendlichen**, geschrieben `O`. Man kann ihn sich als „unendlich weit oben“ vorstellen, als den Ort, an dem sich vertikale Linien treffen. Das Addieren von `O` zu einem beliebigen Punkt lässt ihn unverändert, genau wie das Addieren von `0`.

---

## 3. Von Bildern zu einem endlichen Körper

Die glatte Kurve oben ist die *Intuition*. Aber Zcash verwendet keine reellen Zahlen (sie runden und verraten Größenordnungen, wie in Artikel 1). Es verwendet eine elliptische Kurve **über einem endlichen Körper**: dieselbe Gleichung `y^2 = x^3 + ax + b`, aber mit sämtlicher Arithmetik modulo einer Primzahl.

Wenn man das tut, zerbricht die hübsche Kurve in eine **Streuung unverbundener Punkte**, einen Punkt für jedes `(x, y)`-Paar, das die Gleichung modulo `p` erfüllt. Sie sieht dann gar nicht mehr wie eine Kurve aus. Aber hier ist der entscheidende Punkt:

> **Die Algebra der Sekanten-und-Tangenten-Regel funktioniert weiterhin perfekt.** Dieselben Formeln, die geometrisch `P + Q` gefunden haben, berechnen es nun mit Arithmetik im endlichen Körper. Die Punkte bilden weiterhin eine Gruppe, mit derselben `0` (dem Punkt im Unendlichen).

Machen wir das mit einem kleinen, vollständig verifizierten Beispiel konkret.

### Eine vollständige Kurve, exakt berechnet

Nimm `y^2 = x^3 + 2x + 2` über dem endlichen Körper `F_17`. Wenn man jeden gültigen Punkt berechnet, erhält man genau **18 Punkte, plus den Punkt im Unendlichen = insgesamt 19.** Einige davon:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Wähle nun den Punkt `G = (5, 1)` und addiere ihn immer wieder zu sich selbst. Schau, was passiert (jede Zeile unten wurde berechnet, nicht geraten):

| Schritt | Punkt | Schritt | Punkt |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (Unendlichkeit)** |
| `10G` | (7, 11) | | |

Zwei Dinge fallen auf:

- Es **durchläuft alle 18 endlichen Punkte und landet dann bei `O`** in Schritt 19; danach würde es sich für immer wiederholen. Der Startpunkt `G` „erzeugt“ die ganze Gruppe, deshalb nennen wir ihn einen **Generator**.
- Es ist eine verifizierte Gruppe: Zum Beispiel ist `1G + 2G = (5,1) + (6,3) = (10,6)`, und das ist genau `3G`. Die Addition ist intern konsistent, genau wie es eine Gruppe verlangt.

---

## 4. Die Falltür: Skalarmultiplikation

Diese Tabelle von `1G, 2G, 3G, ...` ist das Herzstück von allem. Einen Punkt wiederholt mit sich selbst zu addieren, nennt man **Skalarmultiplikation**: Der Punkt `kG` bedeutet: „`G` zu sich selbst `k`-mal addiert.“

Jetzt kommt die Magie. Betrachte die beiden Richtungen:

| Richtung | Frage | Schwierigkeit |
|---|---|---|
| **Vorwärts** | Gegeben `k` und `G`, berechne `kG` | **Einfach.** Selbst für astronomisch große `k` kommt man mit einem Trick namens *double-and-add* in ein paar hundert Schritten ans Ziel |
| **Rückwärts** | Gegeben `G` und `kG`, rekonstruiere `k` | **Praktisch unmöglich** auf einer echten kryptographischen Kurve |

Diese Asymmetrie ist die **Einbahnstraße**, die wir in Abschnitt 1 brauchten. Das Rückwärtsproblem („Welches `k` hat diesen Punkt erzeugt?“) heißt **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, und auf den Kurven, die Zcash verwendet, löst es nach heutigem Kenntnisstand keine bekannte Methode vor dem Wärmetod des Universums.

![Alternativtext](image-12.png)

> Auf unserer Spielzeugkurve über `F_17` *könntest* du `k` einfach aus der Tabelle ablesen, weil sie nur 19 Punkte hat. Echte Kurven haben ungefähr `2^(255)` Punkte. Die Tabelle hätte mehr Zeilen, als es Atome im Universum gibt, also ist „einfach ablesen“ keine Option. Gerade ihre Kleinheit macht die Spielzeugkurve lehrbar – und genau deshalb ist sie auch nicht sicher.

---

## 5. Wie Schlüssel entstehen (die Auszahlung)

Wir haben jetzt alles, was nötig ist, um einen echten kryptographischen Schlüssel zu erklären, und es ist verblüffend einfach:

> **Wähle eine geheime Zahl `k`. Veröffentliche den Punkt `kG`. Das ist alles.**
> `k` ist dein **privater Schlüssel**. `kG` ist dein **öffentlicher Schlüssel**. Die Einbahnstraße (ECDLP) garantiert, dass niemand von `kG` auf `k` zurückrechnen kann.

Diese eine Idee – *ein öffentlicher Schlüssel ist ein geheimer Skalar mal einem festen Generator* – ist der Ursprung von Zcashs Spending Keys, Viewing Keys und Adressen. Der vollständige Schlüsselbaum baut mehr Struktur darüber auf, aber jeder Zweig wächst aus dieser Wurzel.

### Bonus: Warum Kurvenpunkte perfekte Commitments ergeben

Erinnere dich an den „versiegelten Umschlag“ (Commitment) aus Artikel 0, der seinen Inhalt **verbergen** und zugleich **unfälschbar** sein musste. Elliptische Kurven geben uns dafür eine saubere Konstruktion. Nimm zwei feste, öffentliche Generatorpunkte `G` und `H`, einen geheimen Wert `v` und eine zufällige Blinding-Zahl `r`, und bilde:

```
Commitment  =  v.G  +  r.H
```

Das ist ein **Pedersen-Commitment**, und es hat beide Eigenschaften, die wir wollten:

- **Hiding:** Das zufällige `r` verschmiert das Ergebnis über die ganze Kurve, sodass der Punkt nichts über `v` verrät.
- **Binding:** Das ECDLP macht es praktisch unmöglich, ein *anderes* `(v, r)` zu finden, das denselben Punkt ergibt, sodass du deine Aussage darüber, worauf du dich festgelegt hast, nicht mehr nachträglich ändern kannst.

Eine Bonuseigenschaft erweist sich später als unbezahlbar: Diese Commitments **lassen sich addieren**. Das Commitment zu `v_1` plus das Commitment zu `v_2` ist ein gültiges Commitment zu `v_1 + v_2`. Dieses „homomorphe“ Verhalten ist der Grund, warum Zcash später beweisen kann, dass das Geld, das in eine Transaktion *hineingeht*, dem Geld entspricht, das *herauskommt*, ohne irgendeinen Betrag offenzulegen. Das lösen wir ungefähr in Artikel 6 ein.

---

## 6. Wo das in Zcash lebt

Die Fingerabdrücke sind konkret und überprüfbar.

| Zcash-Design | Verwendete Kurven | Rolle |
|---|---|---|
| **Sapling** (älter) | **BLS12-381** plus eine eingebettete Kurve namens **Jubjub** | BLS12-381 trägt das Proof-System; Jubjub ist über dem Skalarfeld von BLS12-381 aufgebaut, damit Schlüssel- und Commitment-Operationen *innerhalb* eines Zero-Knowledge-Proofs günstig auszuführen sind |
| **Orchard** (aktuell) | **Pallas** und **Vesta** (der „Pasta“-Zyklus) | Pallas trägt die Schlüssel und Commitments von Orchard; die Paarung von Pallas/Vesta ist speziell so angelegt, dass fortgeschrittene Proofs effizient sind |

Warum eine Kurve in das Feld einer anderen „eingebettet“ wird und warum ein *Zyklus* aus zwei Kurven nützlich ist, ist real und wichtig, gehört aber in die Artikel über Proof-Systeme. Für jetzt ist die Kernaussage klar: **Jeder Zcash-Schlüssel ist ein Skalar mal einem Generator, und jedes Zcash-Commitment ist eine Summe von Kurvenpunkten**, die auf einer dieser benannten Kurven leben.

![Alternativtext](image-13.png)

---

## 7. Ein ehrlicher Hinweis

Ein paar Vereinfachungen haben das hier lesbar gehalten. Wir haben die **kurze Weierstrass-Form** (`y^2 = x^3 + ax + b`) benutzt; Zcashs Kurven werden oft in anderen äquivalenten Formen geschrieben (Jubjub ist eine *twisted Edwards*-Kurve), die aus Effizienz- und Sicherheitsgründen gewählt werden, aber die Gruppenidee ist identisch. Wir haben die exakten Formeln für Punktaddition nicht definiert (sie sind die algebraische Version von „dritter Schnittpunkt, dann spiegeln“), und wir haben Feinheiten wie Kurvenordnung, Cofaktoren und „Pairings“ ausgeklammert, die in den Artikeln über Proof-Systeme wichtig werden. Nichts davon verändert die Intuition; es schärft sie.

---

## 8. Zusammenfassung

- Ein Privacy-System braucht eine **Einbahnstraße**: vorwärts leicht, rückwärts nicht praktikabel. Elliptische Kurven liefern so etwas.
- Eine **elliptische Kurve** ist die Menge der Punkte, die `y^2 = x^3 + ax + b` erfüllen, und ihre Punkte können über die geometrische **Sekanten-und-Tangenten**-Regel **addiert** werden, wobei ein spezieller **Punkt im Unendlichen** als Null wirkt.
- Über einem **endlichen Körper** wird die Kurve zu einer Streuung von Punkten, aber dieselbe Addition funktioniert weiterhin und die Punkte bilden eine **Gruppe**. (Verifiziertes Beispiel: `y^2 = x^3 + 2x + 2` über `F_17` hat 19 Punkte, und `G = (5,1)` erzeugt sie alle.)
- **Skalarmultiplikation** `kG` ist leicht zu berechnen, aber nicht praktikabel umkehrbar: das **ECDLP**. Das ist die Falltür.
- **Schlüssel:** privater Schlüssel `k`, öffentlicher Schlüssel `kG`. **Commitments:** Pedersen-Form `v.G + r.H`, die verbirgt, bindet und sich bequem **addieren** lässt.
- In **Zcash** verwendet Sapling **BLS12-381 + Jubjub** und Orchard die **Pallas/Vesta (Pasta)**-Kurven; jeder Schlüssel und jedes Commitment lebt auf ihnen.

---

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| **Elliptische Kurve** | Punkte, die `y^2 = x^3 + ax + b` erfüllen, mit einer besonderen „Addition“ von Punkten |
| **Punktaddition** | Die Sekanten-und-Tangenten-Regel: Linie durch zwei Punkte, den dritten Treffer nehmen, spiegeln |
| **Punkt im Unendlichen (`O`)** | Die „Null“ der Kurve; sie zu addieren verändert nichts |
| **Generator (`G`)** | Ein Basispunkt, dessen Vielfache schließlich die ganze Gruppe abdecken |
| **Skalarmultiplikation (`kG`)** | `G` zu sich selbst `k`-mal addieren; vorwärts leicht, rückwärts schwer |
| **ECDLP** | Das schwere Problem, `k` aus `kG` zu rekonstruieren; das Sicherheitsfundament |
| **Pedersen-Commitment** | `v.G + r.H`; ein versiegelter Umschlag, der verbirgt, bindet und sich addieren lässt |

---

## FAQ

**Warum Kurven statt einfach großer Zahlen modulo einer Primzahl?**
Beides kann eine Einbahnstraße liefern, aber elliptische Kurven erreichen dieselbe Sicherheit mit viel kleineren Schlüsseln und schnelleren Operationen, und ihre Punktarithmetik ist ideal für Commitments.

**Ist das ECDLP nachweislich schwer?**
Es ist nicht als unmöglich *bewiesen*, aber jahrzehntelange intensive Forschung hat keinen effizienten Angriff auf gut gewählte Kurven gefunden. Die Sicherheit beruht auf dieser gut getesteten Annahme.

**Könnte ein Quantencomputer das brechen?**
Ein ausreichend großer Quantencomputer könnte das ECDLP brechen. Das ist branchenweit eine bekannte langfristige Sorge und ein aktives Forschungsgebiet; gegen klassische Computer bleiben heutige Kurven sicher.

**Warum verwendet Zcash mehr als eine Kurve?**
Für unterschiedliche Aufgaben. Eine Kurve trägt das Zero-Knowledge-Proof-System; eine andere (eingebettet in das Feld der ersten) macht Schlüssel- und Commitment-Operationen innerhalb des Proofs effizient. Die nächsten Artikel erklären, warum diese Paarung wichtig ist.

---

### Teste deine Intuition

Unter Verwendung der verifizierten Tabelle in Abschnitt 3: Was ist `9G + 10G` auf unserer Spielzeugkurve? Und was sagt dir die Antwort über `G`? *(Antwort unten.)*

<details><summary>Antwort</summary>

`9 + 10 = 19`, und wir haben gesehen, dass `19G = O` ist, der Punkt im Unendlichen. Also ist `9G + 10G = O`. Das bedeutet, dass `10G` das **Negative** (additive Inverse) von `9G` ist: zwei Punkte, die sich zum „Nullpunkt“ addieren. Auf einer Kurve ist das Negative eines Punkts einfach sein Spiegelbild an der x-Achse, und tatsächlich haben `9G = (7,6)` und `10G = (7,11)` denselben `x`-Wert und `y`-Werte, deren Summe `17 = 0 (mod 17)` ergibt. Die Struktur ist vollkommen konsistent, und genau das garantiert die Aussage „es ist eine Gruppe“.
</details>

---

### Was als Nächstes kommt

**Artikel 3 . Hashing und Commitments:** Wir werden den „magischen versiegelten Umschlag“ richtig öffnen. Du hast jetzt eine Möglichkeit gesehen, ein Commitment aus Kurvenpunkten zu bauen; als Nächstes fragen wir, was Hiding und Binding wirklich bedeuten, lernen Hash-Funktionen kennen und verbinden beides mit den Note-Commitments, die jede Zcash-Zahlung verankern.

*Teil der Reihe* Zcash von den ersten Prinzipien aus *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
