# Das Shielded Protocol, von Anfang bis Ende
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alt-Text](image-27.png)

### Jedes Teil zu einer privaten Zcash-Transaktion zusammenfügen

> **Reihe:** *Zcash von den ersten Prinzipien* . **Artikel 6 . Das Shielded Protocol** (Finale)
> **Zielgruppe:** Einsteiger, die die Artikel 0 bis 5 gelesen haben. Hier fügt sich alles zusammen.
> **Was du mitnimmst:** ein vollständiges, korrektes mentales Modell einer shielded Zcash-Transaktion, bei dem jedes Konzept aus der Reihe an seinem richtigen Platz sitzt und jeder offene Kreis aus Artikel 0 geschlossen wird.

Wir begannen in [Artikel 0](article-0-shielded-transaction.md) mit einem Paradoxon und einer Geschichte über versiegelte Umschläge auf einem öffentlichen Brett. Dann verbrachten wir fünf Artikel damit, die Bausteine aufzubauen: endliche Körper, elliptische Kurven, Commitments, Merkle-Bäume und Zero-Knowledge-Beweise. Jetzt setzen wir sie zusammen und beobachten, wie eine echte private Zahlung von Anfang bis Ende funktioniert.

---

## 1. Warum sollte dich das interessieren?

Jeder einzelne Baustein, den du gelernt hast, ist für sich genommen clever. Aber die *Magie* von Zcash liegt darin, wie sie ineinandergreifen. Ein Nullifier allein gibt keine Privatsphäre. Ein Commitment allein verhindert keine Fälschung. Ein Beweis allein beweist nichts Nützliches. Erst die **Zusammensetzung** macht aus fünf Komponenten Geld, das gleichzeitig privat und vertrauenswürdig ist.

Dieser Artikel ist diese Zusammensetzung. Am Ende wird sich der Satz *„das Netzwerk verifiziert eine Transaktion, die es nicht sehen kann“* nicht mehr wie ein Paradoxon anfühlen, sondern wie eine offensichtliche Folge von Teilen, die du bereits verstehst.

---

## 2. Die Besetzung, neu zusammengesetzt

Hier ist die gesamte Reihe auf einer Seite, von der Geschichte aus Artikel 0 auf die echte Maschinerie abgebildet.

| Erzählelement aus Artikel 0 | Reale Komponente | Aufgebaut aus |
|---|---|---|
| Das Geld im Umschlag | **Note** (Wert, Empfänger, Zufälligkeit) | als Feldelemente kodiert (Art. 1) |
| Der versiegelte und undurchsichtige Umschlag | **Note commitment** | Pedersen- / Sinsemilla-Commitment (Art. 2, 3) |
| Das öffentliche Brett | **Note commitment tree** (anchor = seine Wurzel) | inkrementeller Merkle-Baum (Art. 4) |
| Die Leeremarke | **Nullifier** | ein ZK-freundlicher Hash aus Note + geheimem Schlüssel (Art. 2, 3) |
| „Geld rein entspricht Geld raus“ | **Value commitments + Balanceprüfung** | homomorphe Pedersen-Commitments (Art. 2, 3) |
| Die Magie hinter dem Vorhang | **Zero-Knowledge-Beweis** | zk-SNARK über einem arithmetischen Schaltkreis (Art. 5) |
| „Nur du kannst deinen Umschlag lesen“ | **Verschlüsselte Note + Viewing Keys** | Verschlüsselung + Schlüsselhierarchie (dieser Artikel) |

---

## 3. Woher Schlüssel kommen

Alles, was ein Benutzer tun kann, entspringt einem einzigen Geheimnis, dem **Spending Key**, durch eine Einweg-Hierarchie (jeder Pfeil ist eine irreversible Ableitung, ermöglicht durch die Trapdoors aus den Artikeln 2 und 3):

![Alt-Text](image-32.png)

Zwei Dinge sind bemerkenswert, beides Folgen früherer Artikel:

- Die Aufteilung erlaubt es dir, einen **Viewing Key** weiterzugeben (zum Beispiel an einen Prüfer), der deine Transaktionen offenlegt, **ohne** die Möglichkeit zum Ausgeben zu gewähren. Privatsphäre ist selektiv, nicht alles oder nichts.
- Jede Ableitung ist **einseitig**: Wer einen Viewing Key besitzt, kann daraus niemals den Spending Key zurückgewinnen, genau die elliptische-Kurven-Trapdoor aus Artikel 2, die hier ihre Arbeit macht.

---

## 4. Eine Note ausgeben: die vier Behauptungen

Um eine Note privat auszugeben, musst du das Netzwerk gleichzeitig von vier Dingen überzeugen, **ohne die Note, ihren Wert, ihre Position oder deine Identität offenzulegen.** Jede Behauptung wird von einer Komponente erfüllt, die du bereits kennst.

![Alt-Text](image-31.png)

Der Beweis offenbart **keine** der zugrunde liegenden Fakten (welche Note, wessen Schlüssel, welcher Wert). Er offenbart nur, dass *alle vier Behauptungen zutreffen.* Das ist der gesamte Trick von shielded Zcash, in einem Diagramm ausgedrückt.

---

## 5. Der Wertbilanz-Trick (die Auszahlung, die wir aufgehoben haben)

Bereits in den Artikeln 2 und 3 haben wir festgestellt, dass Pedersen-Commitments **addierbar** sind: Das Commitment auf `v_1` plus das Commitment auf `v_2` ist ein Commitment auf `v_1 + v_2`. Hier zeigt sich, warum das wichtig ist.

Jede Eingangs- und Ausgangs-Note trägt ein **Value commitment**: ein Pedersen-Commitment `v.G + r.H`, das ihren Betrag `v` verbirgt. Weil sie sich addieren lassen, kann das Netzwerk Folgendes berechnen:

```
(sum of input value commitments) − (sum of output value commitments)
```

Wenn die Transaktion ausgeglichen ist (kein Geld erzeugt oder vernichtet wird), heben sich die `v`-Anteile exakt auf, und es bleibt nur ein Commitment auf den **Wert null**, verblendet durch verbleibende Zufälligkeit. Der Sender beweist, dass er diese verbleibende Zufälligkeit kennt, indem er eine kleine Signatur erzeugt, die **binding signature** genannt wird. Eine gültige binding signature ist nur möglich, wenn die Werte tatsächlich ausgeglichen sind, **und doch wurde kein einziger Betrag offengelegt.**

> Das ist die sauberste Veranschaulichung in der ganzen Reihe dafür, *warum* wir homomorphe, kurvenbasierte Commitments brauchten. Die Regel „Geld rein entspricht Geld raus“ wird durch das **Addieren versiegelter Umschläge** erzwungen und dadurch, dass geprüft wird, ob das Ergebnis auf null versiegelt.

---

## 6. Eine vollständige Transaktion, von Anfang bis Ende betrachtet

Setzen wir Alice zusammen, die Bob bezahlt. Wir verwenden die klare Struktur von Sapling mit „Spend-Seite / Output-Seite“ als Lehrmodell.

**Eine shielded Transaktion bündelt zwei Arten von Beschreibungen:**

| Spend-Beschreibung (verbraucht eine Note) | Output-Beschreibung (erzeugt eine Note) |
|---|---|
| Value commitment des Eingangs | Value commitment des Ausgangs |
| der **anchor**, gegen den sie den Beweis führt (eine Baumwurzel) | das neue **Note commitment** (ein neues Blatt) |
| der **Nullifier** der ausgegebenen Note | ein **ephemerer Schlüssel** für die Verschlüsselung |
| ein re-randomisierter öffentlicher Schlüssel + Spend-Autorisierungssignatur | die **verschlüsselte Note** (Ciphertext für den Empfänger) |
| der **zk-SNARK**, der die vier Behauptungen beweist | ein **zk-SNARK**, der beweist, dass der Output wohlgeformt ist |

Dazu kommt eine **binding signature** über das gesamte Bündel, die die Wertbilanz erzwingt (Abschnitt 5).

![Alt-Text](image-30.png)

Verfolge die Privatsphäre: Das Netzwerk hat den anchor geprüft, geprüft, dass der Nullifier frisch war, den Beweis verifiziert und die Bilanz verifiziert. Es akzeptierte eine gültige Zahlung, **ohne Betrag, Adresse oder welche Note ausgegeben wurde zu erfahren.** Gleichzeitig befinden sich der **Nullifier** der ausgegebenen Note (ihr Tod) und Bobs neues **Commitment** (die Geburt seiner Note) in zwei verschiedenen öffentlichen Strukturen ohne sichtbare Verbindung zwischen ihnen – die getrennte Verbindung aus Artikel 0.

---

## 7. Jeden offenen Kreis aus Artikel 0 schließen

Artikel 0 hat absichtlich Fragen geöffnet. Hier sind sie alle, geschlossen.

| In Artikel 0 geöffneter Kreis | Geschlossen durch |
|---|---|
| Wie ist ein versiegelter und dennoch unfälschbarer Umschlag möglich? | Commitments: Verbergen durch Zufälligkeit, Binden durch Kollisionsresistenz / die Kurven-Trapdoor (Art. 3) |
| Woher kommen Schlüssel und geheime Rezepte? | Körperarithmetik und Skalarmultiplikation auf elliptischen Kurven (Art. 1, 2) |
| Was genau ist „das Brett“? | Ein inkrementeller Merkle-Baum aus Note commitments; seine Wurzel ist der anchor (Art. 4) |
| Warum kann die Leeremarke nicht mit ihrem Umschlag verknüpft werden? | Der Nullifier ist ein schlüsselgebundener Hash, der in einer von den Commitments getrennten Menge aufbewahrt wird (Art. 2, 3, 4) |
| Wie beweist man Gültigkeit, ohne etwas offenzulegen? | Ein zk-SNARK über einem arithmetischen Schaltkreis, der alle vier Behauptungen kodiert (Art. 5) |
| Wie erfährt der Empfänger, dass er bezahlt wurde? | Die Note wird für seine Adresse verschlüsselt; er versucht die Entschlüsselung mit einem Viewing Key (dieser Artikel) |
| Wie wird „Geld rein = Geld raus“ privat erzwungen? | Homomorphe Value commitments + die binding signature (Abs. 5) |

Das Paradoxon von Seite eins, *verifiziere, was du nicht sehen kannst*, ist jetzt vollständig aufgelöst. Das Netzwerk verifiziert **Behauptungen über verborgene Daten**, niemals die Daten selbst.

---

## 8. Sapling vs Orchard, in einem Atemzug

Wir haben mit der Struktur von Sapling gelehrt, weil ihre Aufteilung am klarsten ist. Das aktuelle Design, **Orchard**, verfeinert diese Ideen, statt sie zu ersetzen:

| | **Sapling** | **Orchard** |
|---|---|---|
| Transaktionseinheit | getrennte **Spend**- und **Output**-Beschreibungen | vereinheitlichte **Actions** (jede führt einen Spend + einen Output aus) |
| Beweissystem | **Groth16** (Trusted Setup) | **Halo 2** (kein Trusted Setup) |
| Kurven | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Commitment-Hash | Pedersen | Sinsemilla |

Jedes Konzept in diesem Artikel lässt sich direkt übertragen; Orchard bündelt Spend und Output hauptsächlich zusammen und tauscht ein Beweissystem ohne Zeremonie ein. Die fünf Pfeiler bleiben unverändert.

---

## 9. Ein ehrlicher Hinweis

Dies ist das vollständigste Bild in der Reihe, aber immer noch ein Modell. Wir haben die exakten Feldkodierungen einer Note, die präzisen Formeln zur Schlüsselableitung, die Re-Randomisierung von Spend-Schlüsseln, diversifizierte Adressen, Memo-Felder, die Behandlung von Gebühren, den Unterschied zwischen Value commitments und Note commitments im vollen Detail sowie die genaue Rolle jeder Signatur komprimiert. Wir haben außerdem einen kanonischen Ablauf dargestellt; reale Transaktionen können viele Spends und Outputs zugleich enthalten und transparente sowie shielded Teile mischen. Die maßgebliche Quelle ist die Zcash Protocol Specification. Was du jetzt in der Hand hältst, ist die richtige Form; die Spezifikation ergänzt jedes einzelne Maß.

---

## 10. Zusammenfassung

- Eine shielded Transaktion verzahnt alle fünf Komponenten: eine **Note** (der Wert), ihr **Commitment** im **Note commitment tree**, einen **Nullifier** zur Verhinderung von Double-Spends, **Value commitments** für die Bilanz und einen **zk-SNARK**, der alles zusammenbindet.
- Das Ausgeben beweist **vier Behauptungen gleichzeitig** – die Note existiert, du bist autorisiert, ihr Nullifier ist korrekt und die Werte sind ausgeglichen – in **Zero Knowledge**, ohne irgendeine der zugrunde liegenden Tatsachen offenzulegen.
- **Wertbilanz** wird erzwungen, indem **homomorphe Commitments addiert** und darauf geprüft werden, dass sie auf null versiegeln, mittels der **binding signature**, ohne dass ein Betrag offengelegt wird.
- Die Fähigkeiten eines Benutzers entspringen einem **Spending Key** durch eine **Einweg-Hierarchie**, die **Viewing Keys** ermöglicht, welche offenlegen, ohne Ausgaberechte zu gewähren.
- Das Netzwerk **verifiziert Behauptungen über verborgene Daten** und löst damit das Verifizierungs-vs.-Privatsphäre-Paradoxon aus Artikel 0 auf. Jeder dort geöffnete Kreis ist jetzt geschlossen.
- **Orchard** verfeinert **Sapling** (vereinheitlichte Actions, Halo 2 ohne Trusted Setup, Pasta-Kurven, Sinsemilla), ohne die fünf Pfeiler zu verändern.

---

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| **Spending key** | Das einzelne Wurzelgeheimnis, von dem alle Schlüssel eines Benutzers abgeleitet werden |
| **Viewing key** | Legt deine Transaktionen für einen Inhaber offen, ohne ihm das Ausgeben zu erlauben |
| **Spend description** | Der Teil einer Tx, der eine Note verbraucht (Nullifier, anchor, Beweis) |
| **Output description** | Der Teil einer Tx, der eine Note erzeugt (Commitment, Ciphertext, Beweis) |
| **Action (Orchard)** | Eine vereinheitlichte Einheit, die einen Spend und einen Output zusammen ausführt |
| **Value commitment** | Ein homomorphes Pedersen-Commitment auf einen Betrag |
| **Binding signature** | Die Signatur, die beweist, dass Werte ausgeglichen sind, ohne sie offenzulegen |
| **Anchor** | Die Baumwurzel, gegen die ein Spend die Mitgliedschaft beweist |
| **Trial decryption** | Ein Empfänger testet neue Commitments, um für ihn bestimmte Notes zu finden |

---

## FAQ

**Sieht das Netzwerk jemals den Betrag oder wer wen bezahlt hat?**
Nein. Es verifiziert den Beweis, die Frische des Nullifiers, den anchor und die binding signature. Alle privaten Werte bleiben verborgen.

**Was hindert mich daran, eine Note zweimal auszugeben?**
Der Nullifier. Durch das Ausgeben wird er veröffentlicht; das Netzwerk lehnt jeden Nullifier ab, der bereits in der Nullifier-Menge vorhanden ist. Dieselbe Note ergibt immer denselben Nullifier.

**Wie kann die Bilanz geprüft werden, wenn Beträge verborgen sind?**
Value commitments addieren sich homomorph; die Commitments einer ausgeglichenen Transaktion heben sich zu einem Commitment auf null auf, was die binding signature beweist.

**Kann ich einem Prüfer meine Transaktionen nachweisen, ohne die Kontrolle aufzugeben?**
Ja. Gib einen Viewing Key weiter. Er legt deine shielded Aktivität offen, kann aber dank der Einweg-Schlüsselhierarchie keine Spends autorisieren.

**Ist Sapling veraltet, jetzt da Orchard existiert?**
Beide haben im Netzwerk existiert; Orchard ist das aktuelle Design. Die Konzepte sind gemeinsam, daher vermittelt das Verständnis des einen auch das andere.

---

### Teste deine Intuition

Ein Freund sagt: „Da der Beweis den Betrag verbirgt, könnte ein Dieb einfach behaupten, seine Outputs seien mehr wert als seine Inputs, und kostenlos Geld drucken.“ Erkläre in zwei Sätzen anhand von Abschnitt 5, warum das scheitert. *(Antwort unten.)*

<details><summary>Antwort</summary>

Die Beträge sind verborgen, aber jeder ist in ein homomorphes Value commitment eingehüllt, und das Netzwerk addiert alle Input-Commitments und subtrahiert alle Output-Commitments; wenn die verborgenen Werte nicht ausgeglichen wären, würde das Ergebnis nicht auf null versiegeln und **es könnte keine gültige binding signature erzeugt werden.** Der Dieb kann verbergen, *wie viel*, aber er kann unausgeglichene Werte nicht durch die Bilanzprüfung bringen, daher ist das Drucken von kostenlosem Geld unmöglich, ohne etwas offenzulegen und dennoch von der Arithmetik erwischt zu werden.
</details>

---

### Die Reihe, vollständig

Du bist jetzt von einem einzelnen Paradoxon zu einer vollständigen privaten Zahlung gereist:

![Alt-Text](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


Von hier aus führt der natürliche nächste Bogen tiefer hinein: in die inneren Funktionsweisen von Groth16 und Halo 2, Trusted-Setup-Zeremonien, die Sapling- und Orchard-Schaltkreise im Detail, Schlüsselableitung und diversifizierte Adressen sowie die Entwicklung des Protokolls über Netzwerk-Upgrades hinweg. Aber das Fundament steht jetzt, und jedes dieser Themen hat nun einen Platz, an den es anknüpfen kann.

*Teil der Reihe* Zcash von den ersten Prinzipien *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
