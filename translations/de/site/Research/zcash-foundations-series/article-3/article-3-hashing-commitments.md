# Hashing und Commitments: Der magisch versiegelte Umschlag
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alternativtext](image-15.png)

### Wie man ein Geheimnis öffentlich einschließt und danach niemals darüber lügen kann

> **Serie:** *Zcash from First Principles* . **Artikel 3 . Hashing und Commitments**
> **Zielgruppe:** Einsteiger. Wir bauen auf [Artikel 1 (endliche Körper)](article-1-finite-fields.md) und [Artikel 2 (elliptische Kurven)](article-2-elliptic-curves.md) auf, aber die Intuition steht auch für sich allein.
> **Was du mitnimmst:** ein klares Verständnis von Hash-Funktionen, was „hiding“ und „binding“ wirklich bedeuten und wie Zcash die Note-Commitments aufbaut, die jede private Zahlung verankern.

In [Artikel 0](article-0-shielded-transaction.md) haben wir einen „magisch versiegelten Umschlag“ beschrieben: etwas, das du an eine öffentliche Tafel heften kannst und das beweist, dass ein Umschlag existiert, während es verbirgt, was sich darin befindet, und das du später niemals austauschen kannst. Wir haben versprochen zu erklären, wie so etwas möglich ist. Das ist dieser Artikel. Wir brauchen dafür zwei Zutaten: **Hash-Funktionen** und **Commitments**.

---

## 1. Warum sollte dich das interessieren?

Stell dir vor, du sagst den Ausgang einer Wahl voraus und willst *danach* beweisen, dass du ihn im Voraus korrekt genannt hast. Du kannst deine Vorhersage nicht einfach veröffentlichen (das beeinflusst Menschen oder lädt zu dem Vorwurf ein, du hättest sie geändert). Und du kannst sie auch nicht vollständig geheim halten (dann kannst du später nichts beweisen).

Was du willst, ist eine Möglichkeit, **jetzt öffentlich einen Wert festzulegen, sodass:**

- niemand erkennen kann, was du festgelegt hast (es bleibt vorerst geheim), und
- du später, wenn du es offenlegst, **nicht darüber lügen kannst**, was es war.

Dieses Werkzeug nach dem Muster „jetzt festlegen, später offenlegen, keine Lügen möglich“ nennt man ein **Commitment**, und es ist überall in Zcash zu finden. Der Wert und der Eigentümer einer Note werden in dem Moment in ein Commitment eingeschlossen, in dem die Note erzeugt wird. Um Commitments zu bauen, brauchen wir zuerst ihr Arbeitspferd: die Hash-Funktion.

---

## 2. Die Intuition: ein Fingerabdruck für Daten

Eine **Hash-Funktion** nimmt beliebige Daten, einen einzelnen Buchstaben oder eine ganze Bibliothek, und presst sie zu einer kurzen Zeichenfolge fester Länge zusammen, die **Digest** oder **Hash** genannt wird. Stell es dir als einen **Fingerabdruck für Daten** vor.

![Alternativtext](image-16.png)

Ein guter kryptografischer Fingerabdruck hat vier Eigenschaften. Verstehe sie als Intuitionen, nicht als Gleichungen:

| Eigenschaft | Einfache Bedeutung | Warum das wichtig ist |
|---|---|---|
| **Deterministisch** | Dieselbe Eingabe ergibt immer denselben Fingerabdruck | Du kannst einen Fingerabdruck jederzeit erneut überprüfen |
| **Schnell vorwärts** | Das Berechnen des Fingerabdrucks geht schnell | Praktisch für den Einsatz überall |
| **Einwegfunktion (preimage resistant)** | Aus einem Fingerabdruck kannst du die Eingabe, die ihn erzeugt hat, nicht finden | Verbirgt die ursprünglichen Daten |
| **Kollisionsresistent** | Du kannst nicht zwei verschiedene Eingaben mit demselben Fingerabdruck finden | Niemand kann eine Übereinstimmung fälschen |

Und noch ein weiteres Verhalten, das Fingerabdrücke fast magisch wirken lässt:

### Der Avalanche-Effekt (verifiziert)

Verändere die Eingabe auch nur minimal, und der Fingerabdruck ändert sich *vollständig*, ohne jede Ähnlichkeit mit dem alten. Hier sind zwei echte SHA-256-Fingerabdrücke von Nachrichten, die sich nur durch ein einziges Zeichen unterscheiden:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Von 64 Hex-Ziffern sind **59 verschieden.** Ein Zeichen hinein, ein völlig unabhängiger Fingerabdruck heraus. Deshalb kannst du eine Eingabe nicht schrittweise in Richtung eines Zielfingerabdrucks bewegen: Es gibt kein „wärmer / kälter“-Signal, dem man folgen könnte.

---

## 3. Vom Fingerabdruck zum Commitment

Hier ist eine verlockende, aber fehlerhafte Idee: Um sich auf einen geheimen Wert `v` festzulegen, veröffentlicht man einfach seinen Fingerabdruck `H(v)`.

Das *bindet* dich gut (du kannst später kein anderes `v` behaupten, denn dafür bräuchte es eine Kollision). Aber es **verbirgt nicht.** Wenn die Menge möglicher Werte klein ist, erstellt ein Angreifer einfach Fingerabdrücke für alle Kandidaten und vergleicht. Commitment auf „ja“ oder „nein“? Er hasht beides und erfährt sofort, was du gewählt hast. Determinismus, eben noch unser Freund, verrät jetzt das Geheimnis.

Die Lösung ist ein einziges Wort: **Zufälligkeit.**

> **Ein Commitment ist der Fingerabdruck deines Werts, gemischt mit einer frischen Zufallszahl:**
> `commitment = H(v, r)` wobei `r` ein geheimer zufälliger „blinding“-Wert ist.

Jetzt erzeugt derselbe Wert `v` jedes Mal ein anders aussehendes Commitment, weil `r` unterschiedlich ist. Die beiden Eigenschaften, die wir wollten, gelten endlich beide:

![Alternativtext](image-17.png)

Um das Commitment später **zu öffnen** (offenzulegen), veröffentlichst du `v` und `r`; jeder kann `H(v, r)` neu berechnen und prüfen, ob es übereinstimmt. Du bist festgelegt. Das ist der magisch versiegelte Umschlag aus Artikel 0, in realer Form.

> **Zwei Erkenntnisse, die du für immer behalten solltest:** *binding* kommt daher, dass der Hash kollisionsresistent ist; *hiding* kommt vom zufälligen Blinding-Faktor `r`.

---

## 4. Zwei Wege, den Umschlag zu bauen

Es gibt zwei gängige Rezepte, und Zcash verwendet beide.

| | **Hash-basiertes Commitment** | **Pedersen-Commitment** (aus Artikel 2) |
|---|---|---|
| Rezept | `H(v, r)` | `v.G + r.H` (Punkte auf einer Kurve) |
| Hiding durch | das zufällige `r` | das zufällige `r` |
| Binding durch | Kollisionsresistenz | die Trapdoor der elliptischen Kurve (ECDLP) |
| Besondere Stärke | einfach und schnell | die Commitments **addieren sich** (homomorph) |

Diese letzte Zeile ist der Grund, warum Pedersen-Commitments in Zcash so wichtig sind. Weil `commit(v_1) + commit(v_2)` ein gültiges `commit(v_1 + v_2)` ist, kann das Protokoll später beweisen, dass **Geld hinein gleich Geld hinaus** ist, indem es Commitments zusammenaddiert, und das alles, ohne auch nur einen einzigen Betrag offenzulegen. Diese Tatsache heben wir uns für Artikel 6 auf.

---

## 5. Eine Feinheit, die ganz Zcash prägt: ZK-freundliches Hashing

Hier ist eine Einsicht, die die meisten Einführungen auslassen, und genau das ist der Punkt, an dem sich „Mathematik trifft Ingenieurwesen“ besonders gut zeigt.

SHA-256 ist ein hervorragender Fingerabdruck für alltägliche Berechnungen. Aber Zcash *berechnet* Hashes nicht nur; es muss **innerhalb eines Zero-Knowledge-Beweises beweisen, dass ein Hash korrekt berechnet wurde** (Artikel 5 erklärt warum). Und hier ist der Haken: Ein Zero-Knowledge-Beweis arbeitet in der Sprache der **Arithmetik endlicher Körper** (Artikel 1), während SHA-256 aus bitweisen Operationen aufgebaut ist (Shifts, ANDs, XORs). All dieses Bit-Gefummel in Körperarithmetik auszudrücken ist enorm teuer und macht Beweise groß und langsam.

Deshalb haben Zcash-Kryptografen Hash-Funktionen entworfen, deren Inneres *bereits* Körperarithmetik ist, wodurch sie billig zu beweisen sind:

![Alternativtext](image-18.png)

Dieser einzelne technische Druck, *„es muss billig zu beweisen sein“*, ist der Grund, warum Zcash spezielle Hash-Funktionen erfunden und übernommen hat, statt überall einfach zu SHA-256 zu greifen.

---

## 6. Wo das in Zcash vorkommt

Zcash hat in seinen verschiedenen Designs unterschiedliche Hashes verwendet, jeweils passend für die Aufgabe ausgewählt:

| Design | Verwendete Hashes | Wo |
|---|---|---|
| **Sprout** (früheste Version) | **SHA-256** | Note-Commitments und der Baum |
| **Sapling** | **Pedersen-Hashes**, plus **BLAKE2** | Pedersen für Note-Commitments und den Merkle-Baum; BLAKE2 für Schlüsselableitung und Nullifier |
| **Orchard** (aktuell) | **Sinsemilla**, plus **Poseidon** | Sinsemilla für Note-Commitments und den Merkle-Baum; Poseidon für den Nullifier, alles für arithmetische Schaltkreise entworfen |

Die Namen, die man erkennen sollte, sind **Pedersen** und **Sinsemilla** (Commitment-artige Hashes, die aus Kurvenpunkten aufgebaut sind, sodass sie die Superkraft des „Addierens“ erben und günstig zu beweisen sind) sowie **Poseidon** (ein Hash auf Basis von Körperarithmetik, speziell für Zero-Knowledge-Schaltkreise entwickelt). Als Artikel 0 sagte, dass der Inhalt einer Note in ein Commitment versiegelt wird, ist *dies* die Maschinerie, die das Versiegeln übernimmt.

Damit ist die offene Frage aus Artikel 0, *„wie kann ein versiegelter Umschlag seinen Inhalt verbergen und zugleich unfälschbar sein?“*, jetzt beantwortet: **hiding durch einen zufälligen Blinding-Faktor, binding durch Kollisionsresistenz oder die Trapdoor der Kurve.**

---

## 7. Ein ehrlicher Hinweis

Wir haben vereinfacht, um die Dinge klar zu halten. Echte Commitment-Schemata legen genau fest, wie `v` und `r` kodiert werden und welche Generatoren verwendet werden; „hiding“ und „binding“ gibt es jeweils in Varianten (perfekt vs. rechnergestützt) mit präzisen Sicherheitsdefinitionen; und wir haben das Innenleben von Pedersen, Sinsemilla oder Poseidon nicht gezeigt. Nichts davon ändert die Intuition: Ein Commitment ist ein Fingerabdruck plus Zufälligkeit, der jetzt verbirgt und für immer bindet. Die Details kehren zurück, klar markiert, wenn der Protokollartikel sie braucht.

---

## 8. Zusammenfassung

- Eine **Hash-Funktion** ist ein **Fingerabdruck für Daten**: deterministisch, schnell vorwärts, Einwegfunktion, kollisionsresistent, mit einem **Avalanche-Effekt** (ein Bit hinein, ein völlig anderer Fingerabdruck hinaus).
- Ein **Commitment** erlaubt dir, **einen Wert jetzt öffentlich festzulegen und ihn später offenzulegen, ohne darüber lügen zu können.**
- Das Veröffentlichen eines bloßen Fingerabdrucks `H(v)` bindet, **verbirgt aber nicht**. Ein zufälliger Blinding-Faktor, `H(v, r)`, behebt das: **hiding durch `r`, binding durch Kollisionsresistenz.**
- Zcash verwendet sowohl **Hash-basierte** als auch **Pedersen**-Commitments; Pedersen-Commitments **addieren sich** zusätzlich, was Artikel 6 ausnutzen wird, um Wertgleichgewicht privat zu beweisen.
- Weil Hashes innerhalb von Zero-Knowledge-Beweisen **bewiesen** werden müssen, verwendet Zcash **ZK-freundliche** Hashes, die aus Körperarithmetik aufgebaut sind (**Pedersen**, **Sinsemilla**, **Poseidon**) statt überall SHA-256 einzusetzen.

---

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| **Hash-Funktion** | Presst beliebige Daten in einen kurzen Fingerabdruck fester Größe (Digest) |
| **Digest** | Der ausgegebene Fingerabdruck einer Hash-Funktion |
| **Preimage resistance** | Man kann einen Digest nicht zurück zu seiner Eingabe umkehren (Einwegfunktion) |
| **Kollisionsresistenz** | Man kann nicht zwei Eingaben mit demselben Digest finden |
| **Avalanche-Effekt** | Eine winzige Änderung der Eingabe verändert den Digest vollständig |
| **Commitment** | Einen Wert jetzt festlegen, später offenlegen, ohne darüber lügen zu können |
| **Blinding-Faktor (`r`)** | Die frische Zufallszahl, die ein Commitment verbergen lässt |
| **ZK-freundlicher Hash** | Ein Hash, der aus Körperarithmetik aufgebaut ist und daher günstig zu beweisen ist |

---

## FAQ

**Warum den Wert nicht einfach verschlüsseln, statt ein Commitment darauf zu machen?**
Verschlüsselung dient der *Geheimhaltung, die du später entschlüsseln kannst*. Ein Commitment dient dem *Binding*: der Garantie, dass du deine Antwort später nicht mehr ändern kannst. Unterschiedliche Aufgaben.

**Wenn Commitments den Wert verbergen, wie kann dann irgendjemand die Regeln überprüfen?**
Dafür sind Zero-Knowledge-Beweise da (Artikel 5): Sie beweisen, dass der verborgene Wert die Regeln einhält, ohne ihn offenzulegen.

**Ist SHA-256 kaputt, weil Zcash es an manchen Stellen vermeidet?**
Nein. SHA-256 ist völlig in Ordnung, und Zcash verwendet es weiterhin. Es ist nur teuer, es *innerhalb eines Schaltkreises zu beweisen*, weshalb es für genau diese Aufgabe ZK-freundliche Hashes gibt.

**Woher kommt das zufällige `r`, und wer behält es?**
Es wird frisch erzeugt, wenn die Note erstellt wird, und ist dem Eigentümer der Note bekannt. Es ist Teil dessen, was jede Note einzigartig und privat macht.

---

### Teste deine Intuition

Du legst dich auf deine Wahlvorhersage als `H(v, r)` fest und veröffentlichst sie. Ein Freund besteht darauf, dass du einfach nur `H(v)` veröffentlichen solltest, um es einfacher zu halten. Warum ist das in einem Satz eine schlechte Idee, wenn es nur zwei mögliche Ausgänge gibt? *(Antwort unten.)*

<details><summary>Antwort</summary>

Wenn es nur zwei Ausgänge gibt, kann dein Freund einfach selbst `H("win")` und `H("lose")` berechnen und mit deinem veröffentlichten Digest vergleichen und so sofort deine Vorhersage erfahren. Der bloße Hash bindet, verbirgt aber nicht; das zufällige `r` ist es, was diesen Rate-und-Prüfe-Angriff verhindert.
</details>

---

### Was kommt als Nächstes

**Artikel 4 . Merkle-Bäume:** Wir haben jetzt Millionen von Commitments, die sich auftürmen. Artikel 4 zeigt, wie Zcash sie zu einem einzigen Baum organisiert, dessen winziger Wurzel-Fingerabdruck für die gesamte Historie steht, und wie du beweisen kannst, dass deine Note in diesem Baum ist, ohne zu verraten, welche es ist. Das ist die echte Form der „öffentlichen Tafel“ aus Artikel 0.

*Teil der Serie* Zcash from First Principles *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
