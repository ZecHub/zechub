# Merkle-Bäume: Wie die Blockchain sich jede Note merkt
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alt-Text](image-19.png)

### Millionen von Commitments in einem winzigen Fingerabdruck zusammenfassen

> **Serie:** *Zcash from First Principles* . **Artikel 4 . Merkle-Bäume**
> **Zielgruppe:** Einsteiger. Wir bauen auf [Artikel 3 (Hashing und Commitments)](article-3-hashing-commitments.md) auf. Wenn du weißt, was ein Fingerabdruck und ein Commitment sind, bist du bereit.
> **Was du mitnimmst:** ein intuitives, korrektes Bild von Merkle-Bäumen, wie man Zugehörigkeit beweist, ohne offenzulegen, welches Element gemeint ist, und wie genau daraus der Note-Commitment-Baum von Zcash wird.

[Artikel 0](article-0-shielded-transaction.md) beschrieb ein „öffentliches Brett“, das jede jemals erzeugte Note enthält und nur immer weiter wächst. Inzwischen kannst du erraten, was daran befestigt ist: **Commitments** (Artikel 3), die versiegelten Umschläge. Aber ein echtes Brett würde *Hunderte Millionen* davon enthalten. Wie speichert das Netzwerk das, überprüft es und ermöglicht dir zu beweisen, dass dein Umschlag auf dem Brett ist, ohne auf ihn zu zeigen? Die Antwort ist eine der elegantesten Strukturen der Informatik: der **Merkle-Baum.**

---

## 1. Warum sollte dich das interessieren?

Sobald du eine riesige öffentliche Liste von Commitments hast, tauchen zwei Probleme auf.

**Problem eins: Integrität im großen Maßstab.** Wenn die Liste 300 Millionen Einträge hat, wie soll irgendjemand bestätigen, dass *nicht ein einziger* heimlich verändert wurde? 300 Millionen Elemente bei jedem Blick erneut zu prüfen, ist aussichtslos.

**Problem zwei: private Zugehörigkeit.** Um eine Note auszugeben (Artikel 0), musst du beweisen, dass dein Commitment tatsächlich auf dem Brett steht. Aber wenn du darauf zeigst („Es ist Eintrag Nummer 4,201,337!“), hast du dich gerade selbst deanonymisiert. Du musst beweisen *„Mein Umschlag ist irgendwo auf diesem Brett“*, ohne preiszugeben, **welcher** es ist.

Ein Merkle-Baum löst beides gleichzeitig. Er komprimiert die gesamte Liste zu einem einzigen Fingerabdruck und erlaubt dir, die Zugehörigkeit mit einem winzigen, positionsverbergenden Beweis nachzuweisen.

---

## 2. Die Intuition: ein Turnier der Fingerabdrücke

Stell dir ein K.-o.-Turnier vor, aber statt dass Spieler weiterkommen, werden **Fingerabdrücke kombiniert.**

- Ganz unten bekommt jedes Datenelement seinen eigenen Fingerabdruck (seinen Hash aus Artikel 3). Das sind die **Blätter.**
- Fasse sie paarweise zusammen. Die zwei Fingerabdrücke jedes Paars werden *zusammen* zu einem übergeordneten Fingerabdruck gehasht.
- Fasse die Eltern paarweise zusammen, hashe jedes Paar gemeinsam und so weiter.
- Mach weiter, bis ganz oben ein **einziger Fingerabdruck** sitzt. Dieser Sieger ist die **Merkle-Wurzel.**

![Alt-Text](image-20.png)

Die wichtigste Eigenschaft folgt direkt aus dem Avalanche-Effekt (Artikel 3):

> **Die Wurzel ist ein Fingerabdruck von *allem* unter ihr.** Ändere irgendein Blatt, auch nur um ein Bit, und sein Fingerabdruck ändert sich, was seinen Elternknoten ändert, was *dessen* Elternknoten ändert, bis ganz nach oben. **Die Wurzel ändert sich.** Ein einzelner kleiner Wurzelwert bescheinigt also die Integrität der gesamten Liste. Das löst Problem eins.

---

## 3. Ein echter Baum, exakt berechnet

Lass uns den obigen Baum mit vier Blättern und echten SHA-256-Fingerabdrücken über den Blättern `A, B, C, D` aufbauen (Digests der Lesbarkeit halber gekürzt):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Alles ist einfach nur „eine Sache hashen und dann Paare von Hashes hashen“. Nichts Exotischeres als Artikel 3, nur in einer Baumstruktur angeordnet.

---

## 4. Der clevere Teil: Zugehörigkeit beweisen, ohne die Position offenzulegen

Jetzt zu Problem zwei. Angenommen, du willst jemandem, der nur die **Wurzel** kennt, beweisen, dass Blatt `C` im Baum ist. Du gibst ihm *nicht* den ganzen Baum. Du gibst ihm nur die Fingerabdrücke, die nötig sind, um von `C` bis zur Wurzel hochzuklettern; das nennt man den **Authentifizierungspfad** (oder **Merkle-Beweis**):

> Um zu beweisen, dass `C` im Baum ist, gib Folgendes an:
> - sein Geschwister `hD`, und
> - seinen Onkel `hAB`.

Der Verifizierer berechnet, nur mit Kenntnis der Wurzel, den Aufstieg neu:

```
step 1:  H(hC , hD)        = hCD       (kombiniere C mit seinem Geschwister)
step 2:  H(hAB , hCD)      = ROOT?     (kombiniere mit dem Onkel)
```

Tatsächlich berechnet ergibt das `1b3faa3fcc5e...`, was **mit der Wurzel übereinstimmt.** Das Blatt ist damit nachweislich im Baum enthalten.

![Alt-Text](image-21.png)

Zwei Dinge machen das mächtig:

- **Es ist winzig.** Für 4 Blätter hast du 2 Hashes geliefert. Für einen Baum mit `n` Blättern lieferst du nur ungefähr **log_2(n)** Hashes. Für eine Milliarde Blätter sind das ungefähr **30 Hashes**, nicht eine Milliarde. Der Beweis wächst kaum, selbst wenn der Baum in seiner Größe explodiert.
- **Es ist der Keim der Privatsphäre.** Der Beweis zeigt, dass dein Blatt *irgendwo* im Baum ist. Wenn dieselbe Prüfung *innerhalb eines Zero-Knowledge-Beweises* (Artikel 5) durchgeführt wird, bleibt sogar der Pfad selbst verborgen, sodass du „meine Note ist im Baum“ beweist, ohne weder die Note noch ihre Position offenzulegen. Das löst Problem zwei vollständig.

---

## 5. Vom Merkle-Baum zum Note-Commitment-Baum von Zcash

Jetzt können wir präzise sagen, was das „öffentliche Brett“ aus Artikel 0 wirklich ist:

> Der **Note-Commitment-Baum** ist ein Merkle-Baum, dessen **Blätter Note-Commitments sind.** Jedes Mal, wenn irgendwo auf der Welt eine Note erzeugt wird, wird ihr Commitment als nächstes Blatt angehängt und die Wurzel aktualisiert.

Ein paar konkrete Details:

- **Er wächst nur.** Blätter werden angehängt, niemals entfernt. Das nennt man einen **inkrementellen Merkle-Baum.** (Das entspricht Artikel 0s „das Brett reißt nie etwas ab“.)
- **Die Wurzel wird der *Anchor* genannt.** Wenn du ausgibst, verweist deine Transaktion auf einen aktuellen Anchor und beweist in Zero Knowledge, dass das Commitment deiner Note im Baum mit genau dieser Wurzel sitzt.
- **Feste Tiefe.** Die abgeschirmten Bäume von Zcash haben Tiefe **32**, das heißt, sie können bis zu `2^(32)` (über vier Milliarden) Notes enthalten.
- **ZK-freundliches Hashing.** Der Baum wird nicht mit SHA-256 aufgebaut. Sapling hasht den Baum mit **Pedersen-Hashes** und Orchard verwendet **Sinsemilla** (beides aus Artikel 3), genau damit der Zugehörigkeits-Aufstieg innerhalb einer Schaltung günstig zu beweisen ist.

![Alt-Text](image-22.png)

### Eine Sache, die der Baum *nicht* handhabt: Double-Spends

Der Baum beweist, dass eine Note **existiert**. Er verhindert aber nicht von sich aus, dass du dieselbe Note zweimal ausgibst. Diese Aufgabe übernimmt die **Nullifier-Menge** aus Artikel 0: eine separate Sammlung von „Ungültigkeits-Tokens“. Wenn du ausgibst, veröffentlichst du den Nullifier der Note, und das Netzwerk weist jeden Nullifier zurück, den es schon einmal gesehen hat.

Die beiden öffentlichen Strukturen spielen also komplementäre Rollen, und genau ihre Trennung kappt die Verbindung zwischen der Geburt und dem Tod einer Note:

| Struktur | Welche Frage sie beantwortet | Aktualisiert wenn |
|---|---|---|
| **Note-Commitment-Baum** | „Existiert diese Note?“ | Eine Note wird **erzeugt** (Commitment angehängt) |
| **Nullifier-Menge** | „Wurde diese Note bereits ausgegeben?“ | Eine Note wird **ausgegeben** (Nullifier veröffentlicht) |

---

## 6. Ein ehrlicher Hinweis

Vereinfachungen, wie üblich. Echte inkrementelle Merkle-Bäume verfolgen „Frontier“-Knoten, damit sich die Wurzel aktualisieren lässt, ohne alles neu aufzubauen; das Netzwerk hält ein Fenster aktueller Anchors vor, nicht nur den neuesten, damit Wallets nicht bei jedem neuen Block kaputtgehen; und leere Blätter verwenden einen definierten Auffüllwert. Wir haben außerdem binäre Bäume mit sauberen Zweierpotenzen gezeichnet. Nichts davon ändert die Intuition: Blätter aus Commitments, paarweise bis zu einer einzigen Wurzel hochgehasht, mit kurzen Zugehörigkeitsbeweisen. Die genaue Buchführung kommt im Protokollartikel zurück.

---

## 7. Zusammenfassung

- Ein **Merkle-Baum** hasht Daten zu **Blättern** und hasht dann **Paare nach oben**, bis eine einzelne **Wurzel** übrig bleibt.
- Dank des Avalanche-Effekts ist die **Wurzel ein Fingerabdruck der gesamten Liste**: Ändere ein Blatt, und die Wurzel ändert sich. Ein einzelner kleiner Wert bescheinigt einen riesigen Datensatz.
- Ein **Zugehörigkeitsbeweis (Authentifizierungspfad)** besteht einfach aus den Geschwister-Hashes entlang des Aufstiegs zur Wurzel, also ungefähr **log_2(n)** Hashes, weshalb Beweise selbst bei Milliarden von Blättern winzig bleiben.
- **Innerhalb eines Zero-Knowledge-Beweises** durchgeführt, verbirgt diese Zugehörigkeitsprüfung, *welches* Blatt du meinst, und beweist „meine Note ist im Baum“, ohne die Note oder ihre Position offenzulegen.
- Der **Note-Commitment-Baum** von Zcash ist ein **inkrementeller** Merkle-Baum aus Note-Commitments mit Tiefe **32**, dessen Wurzel der **Anchor** ist; Sapling hasht ihn mit **Pedersen** und Orchard mit **Sinsemilla**.
- Der Baum beweist **Existenz**; die separate **Nullifier-Menge** verhindert **Double-Spends**. Ihre Trennung sorgt dafür, dass die Geburt einer Note von ihrem Tod entkoppelt bleibt.

---

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| **Merkle-Baum** | Ein Baum aus Hashes; Blätter sind Daten-Fingerabdrücke, Eltern hashen ihre Kinder |
| **Blatt** | Ein unterer Knoten; in Zcash ein einzelnes Note-Commitment |
| **Merkle-Wurzel** | Der einzelne obere Fingerabdruck, der den ganzen Baum zusammenfasst |
| **Authentifizierungspfad / Merkle-Beweis** | Die Geschwister-Hashes, die nötig sind, um zu beweisen, dass ein Blatt im Baum ist |
| **Inkrementeller Merkle-Baum** | Ein Merkle-Baum, an den nur angehängt wird (Blätter werden ausschließlich hinzugefügt) |
| **Anchor** | Eine Merkle-Wurzel, auf die sich eine Ausgabe als „der Baumzustand, gegen den ich beweise“ bezieht |
| **Nullifier-Menge** | Die separate Sammlung von Ausgabemarkierungen, die Double-Spends blockiert |

---

## FAQ

**Warum ein Baum und nicht einfach eine lange Liste von Hashes?**
Eine flache Liste würde dich zwingen, jeden Eintrag offenzulegen oder zu verarbeiten, um Zugehörigkeit zu beweisen. Ein Baum gibt dir Beweise logarithmischer Größe und eine einzige Wurzel für Integrität.

**Braucht der Verifizierer den ganzen Baum?**
Nein. Der Verifizierer braucht nur die **Wurzel** plus deinen kurzen Authentifizierungspfad. Genau darum geht es.

**Warum speziell Tiefe 32?**
Sie begrenzt den Baum auf etwa vier Milliarden Notes, was reichlich Spielraum bietet, und hält zugleich den Zugehörigkeitsbeweis (und seine Kosten innerhalb der Schaltung) auf einer festen, handhabbaren Größe.

**Wenn sich die Wurzel mit jeder neuen Note ändert, wie bleiben alte Beweise gültig?**
Das Netzwerk merkt sich ein Fenster aktueller Wurzeln (Anchors), sodass ein Beweis gegen einen etwas älteren Anchor weiterhin verifiziert wird. Der Protokollartikel präzisiert das.

---

### Teste deine Intuition

Nimm in unserem Baum mit 4 Blättern an, ein Angreifer tauscht heimlich Blatt `C` gegen einen anderen Wert aus, lässt aber die veröffentlichte Wurzel unverändert. Was geht für ihn schief, und warum kann er das nicht unbemerkt reparieren? *(Antwort unten.)*

<details><summary>Antwort</summary>

Wenn sich `C` ändert, ändert sich auch `hC` (Avalanche-Effekt), dadurch ändert sich `hCD = H(hC, hD)`, und dadurch ändert sich `ROOT = H(hAB, hCD)`. Die neu berechnete Wurzel stimmt also nicht mehr mit der veröffentlichten Wurzel überein, und die Manipulation wird erkannt. Um es „unbemerkt zu reparieren“, müsste er ein anderes `C` finden, das dasselbe `hC` erzeugt, also eine Hash-Kollision, was laut Artikel 3 praktisch unmöglich ist. Die Integrität bleibt erhalten.
</details>

---

### Was kommt als Nächstes

**Artikel 5 . Zero-Knowledge-Beweise:** der Höhepunkt. Wir haben jetzt Notes, Commitments und den Baum aufgebaut, und wir sagen ständig „in Zero Knowledge bewiesen“. Artikel 5 erklärt endlich, wie du beweisen kannst, dass eine Aussage wahr ist, dass deine Note im Baum ist, dass dein Nullifier korrekt ist, dass die Geldbeträge ausgeglichen sind, ohne irgendetwas davon offenzulegen.

*Teil der Serie* Zcash from First Principles *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
