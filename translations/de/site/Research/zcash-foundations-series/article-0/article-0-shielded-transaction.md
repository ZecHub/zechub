# Wie eine abgeschirmte Zcash-Transaktion tatsächlich funktioniert
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alternativtext](image.png)

### Die Intuition vor der Mathematik: eine formelfreie Erklärung privater Zahlungen

> **Serie:** *Zcash from First Principles* . **Artikel 0 . Der Anker**
> **Zielgruppe:** absolute Neulinge. Es werden keine Kenntnisse in Kryptografie, Blockchain oder Mathematik vorausgesetzt.
> **Was du mitnimmst:** ein korrektes mentales Modell davon, wie Zcash verbirgt, *wer wen bezahlt hat und wie viel*, und gleichzeitig der ganzen Welt erlaubt zu überprüfen, dass kein Geld gefälscht oder doppelt ausgegeben wurde.

Jeder spätere Artikel dieser Serie zoomt in einen Teil der Maschine hinein, die du gleich kennenlernen wirst. Wenn sich also ein Begriff hier etwas vage anfühlt, *gut*. Das ist das Versprechen, dass wir darauf zurückkommen und ihn sauber herleiten werden.

---

## 1. Warum sollte dich das interessieren?

Stell dir vor, dein Kontoauszug wäre an eine Wand auf dem Marktplatz genagelt. Für immer. Jeder (dein Vermieter, dein Arbeitgeber, ein Fremder, ein zukünftiger Arbeitgeber, eine Regierung) könnte jede Mietzahlung, jede Arztrechnung, jede Spende, jeden Kaffee lesen und genau nachvollziehen, an wen du Geld geschickt hast und wer dir Geld geschickt hat.

Das ist keine dystopische Hypothese. **So ungefähr funktioniert Bitcoin.**

Bitcoin wird oft als „anonym“ bezeichnet, ist es aber nicht. Es ist *pseudonym*: Dein Name steht nicht im Ledger, aber jede Transaktion, jeder Betrag und jede Verbindung zwischen Adressen ist öffentlich und dauerhaft. Das gesamte Feld der „Chain-Analyse“ existiert, um diese dünne Pseudonymität aufzubrechen und Adressen realen Personen zuzuordnen. Sobald eine deiner Adressen mit dir verknüpft ist, entrollt sich deine Finanzhistorie.

Zcash wurde gebaut, um eine täuschend schwierige Frage zu beantworten:

> **Können wir Geld haben, das vollständig privat ist und Sender, Empfänger und Betrag verbirgt, während dennoch jeder überprüfen kann, dass die Regeln eingehalten wurden?**

Diese beiden Ziele stehen im Widerspruch zueinander. Ein öffentliches Ledger ist überprüfbar, *weil* jeder es sehen kann. Privatsphäre bedeutet, dass niemand es sehen kann. Wie kann also die Öffentlichkeit etwas überprüfen, das sie nicht ansehen darf?

Die Auflösung dieses Paradoxons ist die ganze Geschichte dieser Serie. Fangen wir an.

---

## 2. Innerhalb von Zcash gibt es zwei Welten

Zuerst eine häufige Fehlvorstellung ausräumen: **Zcash ist nicht „die private Coin“. Es ist eine Coin, die Privatsphäre als Option anbietet.** Tatsächlich begann es als Fork von Bitcoin und trägt zwei parallele Systeme auf derselben Blockchain.

| | **Transparente Welt** | **Abgeschirmte Welt** |
|---|---|---|
| Privatsphäre | Öffentlich, genau wie Bitcoin | Privat |
| Adressen beginnen mit | `t...` | `z...` oder `u...` |
| Sender / Empfänger / Betrag | **Für alle sichtbar** | **Vor allen verborgen** |
| Zugrunde liegende Technik | Öffentliches Ledger im Bitcoin-Stil | Kryptografische Commitments + Zero-Knowledge-Proofs |

Geld kann sogar die Grenze zwischen beiden überqueren: Gelder *in* die abgeschirmte Welt zu bewegen, nennt man *shielding*, und sie wieder herauszubewegen *deshielding*.

Die transparente Welt ist „Bitcoin, das du grob schon verstehst“. Es ist die **abgeschirmte Welt**, die all die wunderschöne Kryptografie enthält, und nur für diese Welt interessiert sich diese Serie.

![Alternativtext](image-1.png)

---

## 3. Die Intuition: versiegelte Umschläge auf einer öffentlichen Tafel

Hier ist das eine mentale Bild, das du durch den Rest des Artikels mitnehmen solltest. Wir werden ständig darauf zurückkommen.

Stell dir eine riesige **öffentliche Anschlagtafel** vor, die jeder Mensch auf der Erde jederzeit sehen kann.

* **Geld empfangen** bedeutet, dass jemand einen **versiegelten, undurchsichtigen Umschlag** an die Tafel pinnt. Im Umschlag steckt, *wie viel Geld er enthält* und *ein Geheimnis, das nur der Empfänger lesen kann*, weil der Umschlag auf den persönlichen Schlüssel dieses Empfängers verschlossen ist. Die ganze Welt sieht, dass *ein Umschlag erschienen ist*. Niemand außer dem Besitzer kann sehen, was darin ist.

* **Die Tafel wächst nur.** Umschläge werden nie abgerissen oder gelöscht. Neue werden oben drauf gepinnt, für immer.

* **Geld ausgeben** bedeutet, hinter einen Vorhang zu treten, zu beweisen *„Ich besitze einen der nicht ausgegebenen Umschläge auf dieser Tafel, und ich darf ihn öffnen“*, dann einen einzigartigen **Ungültigkeits-Token** in einen öffentlichen „ausgegeben“-Behälter zu werfen und **neue Umschläge** für diejenigen anzupinnen, die du bezahlst.

Dieses kleine Ritual (einen Ungültigkeits-Token anbringen, neue Umschläge anbringen, alles hinter einem Vorhang) *ist* eine Zcash-Zahlung. Alles andere sind Details.

Geben wir diesen Requisiten jetzt ihre echten Namen.

---

## 4. Die fünf Substantive

Diese fünf Begriffe sind das gesamte Vokabular von abgeschirmtem Zcash. Lerne sie als *Geschichte*, nicht als Glossar, dann bleiben sie hängen.

| In der Geschichte | Echter Zcash-Begriff | Was es tatsächlich ist |
|---|---|---|
| Der Inhalt des Umschlags (Betrag + Eigentümer + ein Geheimnis) | **Note** | Die private „Coin“: ein Wertstück, das jemandem gehört |
| Der versiegelte, undurchsichtige Umschlag auf der Tafel | **Note commitment** | Ein kryptografisches Siegel, das beweist, dass ein Umschlag existiert, während es verbirgt, was darin ist |
| Die Anschlagtafel selbst | **Note commitment tree** | Eine nur anhängbare Aufzeichnung von *jeder jemals erzeugten Note* |
| Der Ungültigkeits-Token im „ausgegeben“-Behälter | **Nullifier** | Eine eindeutige Markierung mit der Bedeutung „diese Note wurde jetzt ausgegeben“ |
| Die Magie „hinter dem Vorhang“ | **Zero-knowledge proof** | Ein Beweis dafür, dass der gesamte Spend gültig ist, ohne irgendetwas davon offenzulegen |

Wenn du aus diesem Artikel sonst nichts mitnimmst, dann diese Tabelle. Alles, was folgt, ist nur das *Warum* dahinter, warum jedes Teil genau so geformt sein muss.

---

## 5. Warum jedes Teil so geformt ist, wie es ist

Das ist der Teil, den die meisten Erklärungen überspringen, und genau er trennt „Ich habe ein paar Begriffe auswendig gelernt“ von „Ich verstehe das Design“. Jedes der fünf Teile existiert, um **ein ganz bestimmtes Problem** zu lösen.

### Das Note commitment: den Inhalt verbergen, aber Fälschung unmöglich machen

Ein gewöhnlicher Umschlag kann mit Dampf geöffnet werden. Ein kryptografisches **Note commitment** nicht. Stell es dir als *magisch* versiegelten, vollständig undurchsichtigen Umschlag mit zwei Superkräften vor:

- **Verbergend**: Wenn du den versiegelten Umschlag ansiehst, erfährst du *nichts* über den Betrag oder den Eigentümer darin.
- **Bindend**: Sobald er versiegelt ist, kann der Inhalt nicht ausgetauscht werden. Du kannst später nicht behaupten, der Umschlag habe einen anderen Betrag enthalten.

Wie kann ein Siegel beides gleichzeitig leisten? Das ist eine reale und beantwortbare Frage. Sie ist das Thema von **Artikel 3 (Commitments)**. Akzeptiere den Umschlag fürs Erste als Magie und geh weiter.

### Der Nullifier: der wirklich clevere Teil

Wenn du eine Note ausgibst, veröffentlichst du ihren **Nullifier**, den „Ungültigkeits-Token“. Dieser Token wird aus *der Note selbst* **und** *deinem geheimen Schlüssel* berechnet. Dieses Rezept bringt gleichzeitig drei Eigenschaften, und jede davon ist wichtig:

1. **Nur der Eigentümer kann ihn erzeugen.** Du brauchst den geheimen Schlüssel, um ihn zu berechnen, also kann niemand deine Notes für dich ausgeben.
2. **Für eine bestimmte Note ist es immer *derselbe* Token.** Versuchst du, dieselbe Note zweimal auszugeben, würdest du beide Male den *identischen* Ungültigkeits-Token erzeugen, und der öffentliche „ausgegeben“-Behälter enthält ihn bereits. Doppelausgabe abgelehnt. 
3. **Niemand kann ihn zu seinem Umschlag zurückverfolgen.** Der Ungültigkeits-Token sieht vollständig unverbunden mit dem Umschlag aus, aus dem er stammt.

Diese dritte Eigenschaft ist das **Herzstück der Privatsphäre von Zcash**, und sie verdient weiter unten einen eigenen Abschnitt.

### Der Zero-Knowledge-Proof: der Vorhang selbst

Alles geschieht hinter einem Vorhang, und was du der Welt danach gibst, ist ein **Zero-Knowledge-Proof**, eine Art unfälschbares Zertifikat. Er bestätigt stillschweigend all dies gleichzeitig:

- *der Umschlag, den ich ausgebe, ist wirklich an die Tafel gepinnt* (es ist eine echte, existierende Note),
- *ich darf ihn tatsächlich öffnen* (ich besitze den richtigen Schlüssel),
- *mein Ungültigkeits-Token ist korrekt berechnet* (kein Betrug bei der Doppelausgaben-Prüfung),
- *meine neuen Umschläge enthalten genau so viel Geld wie der alte*: **es wurde kein Geld aus dem Nichts erschaffen.**

Das Wunder ist, dass der Beweis **keine** dieser Tatsachen offenlegt. Weder den Betrag noch die Adressen noch welchen Umschlag. Er überzeugt dich nur davon, dass *jede obige Aussage wahr ist*. Wie das überhaupt möglich sein kann, ist **Artikel 5 (Zero-Knowledge-Proofs)**, der Höhepunkt der Serie.

---

## 6. Das Leben einer einzelnen Note

Eine Note wird *geboren*, sie *lebt* auf der Tafel, und irgendwann *stirbt* sie, und entscheidend ist, dass ihre Geburt und ihr Tod für jeden Beobachter unverbunden aussehen.

![Alternativtext](image-2.png)

---

## 7. Eine Zahlung, von Anfang bis Ende

Schauen wir Alice dabei zu, wie sie Bob bezahlt, wobei jeder öffentliche und private Schritt beschriftet ist.

![Alternativtext](image-4.png)

Beachte die Asymmetrie, die die Privatsphäre möglich macht:

- **Alices alte Note** stirbt über einen *Nullifier* im ausgegeben-Behälter.
- **Bobs neue Note** wird über ein frisches *Commitment* auf der Tafel geboren.
- Für alle Beobachter haben diese beiden Ereignisse **keine sichtbare Verbindung.** Die Spur des Geldes wird kalt.

> **Woher weiß Bob überhaupt, dass er bezahlt wurde?** Seine Note ist *auf seinen Schlüssel* verschlüsselt. Er scannt die Tafel fortlaufend, und nur *seine* Umschläge springen für ihn auf – als hätte er den einen Schlüssel, der zu einer bestimmten Gruppe von Schlössern passt. Die Technik dahinter sind **Viewing Keys**, ein späteres Thema.

---

## 8. Was die Welt sieht vs. was verborgen bleibt

| Tatsache über die Zahlung | Für die Öffentlichkeit sichtbar? |
|---|---|
| Dass *eine* abgeschirmte Transaktion stattgefunden hat |  Ja |
| Dass sie alle Regeln eingehalten hat (keine Fälschung, keine Doppelausgabe) |  Ja (über den Beweis) |
| **Wer** das Geld gesendet hat |  Verborgen |
| **Wer** es empfangen hat |  Verborgen |
| **Wie viel** gesendet wurde |  Verborgen |
| **Welche** frühere Note ausgegeben wurde |  Verborgen |

Das ist die Auflösung des Paradoxons aus Abschnitt 1. Die Öffentlichkeit überprüft die *Regeln*, nicht die *Inhalte*. Verifizierung und Privatsphäre stehen nicht länger im Widerspruch, weil der Zero-Knowledge-Proof es erlaubt, Ersteres zu prüfen, ohne Letzteres zu berühren.

---

## 9. Das Herzstück: warum der Umschlag und der Ungültigkeits-Token nicht verknüpft werden können

Wenn du diese eine Idee verstehst, verstehst du, warum Zcash privat ist. Lies langsam.

- Ein **Umschlag (Commitment)** wird an die Tafel gepinnt, wenn eine Note **geboren** wird.
- Ein **Ungültigkeits-Token (Nullifier)** wird in den Behälter geworfen, wenn genau dieselbe Note **ausgegeben** wird, möglicherweise Monate später.
- Sie werden durch **verschiedene geheime Rezepte** erzeugt, und es gibt **keine öffentliche Mathematik**, die das eine in das andere umwandelt.

Ein externer Beobachter sieht also einen Strom auftauchender Umschläge und einen Strom auftauchender Ungültigkeits-Tokens, kann sie aber **nicht miteinander abgleichen**. Er kann nicht sagen: „Der Ungültigkeits-Token, der heute abgelegt wurde, gehört zu dem Umschlag, der letzten März angepinnt wurde.“ Die Verbindung existiert *nur* im geheimen Wissen des Eigentümers der Note, und der Zero-Knowledge-Proof bestätigt, dass die Verbindung gültig ist, *ohne sie offenzulegen.*

Diese unterbrochene Verbindung ist genau das, woran sich Chain-Analyse-Firmen bei Bitcoin laben – und genau das, was Zcash bewusst kappt.

> **Teste deine Intuition:** Wenn Nullifier stattdessen *nur* aus der Note berechnet würden (ohne geheimen Schlüssel), welche der drei Eigenschaften aus Abschnitt 5 würde dann brechen, und warum würde das die Privatsphäre still und leise zerstören? *(Antwort am Ende.)*

---

## 10. Ein ehrlicher Hinweis

Das hier ist ein **mentales Modell**, nicht die Spezifikation. Um es einsteigerfreundlich zu halten, haben wir im Hintergrund mehrere reale Dinge vereinfacht: Zcash hatte mehrere abgeschirmte Designs (Sprout, dann Sapling, jetzt Orchard); reale Transaktionen können gleichzeitig *mehrere* Notes ausgeben und erzeugen; „die Tafel“ ist technisch eine bestimmte Art von Baum, kein wörtliches Pinnbrett; und die Wertebilanz wird mit zusätzlicher kryptografischer Buchführung erzwungen. Keines dieser Details verändert die Geschichte, die du gerade gelernt hast; sie verfeinern sie. Wir fügen die Genauigkeit nach und nach wieder hinzu, einen Artikel nach dem anderen, und markieren immer klar, wenn wir das tun.

Gute Bildungsinhalte verdienen Vertrauen, indem sie sagen, was sie ausgelassen haben. Dieser Abschnitt ist dieses Versprechen.

---

## 11. Die offenen Schleifen (deine Karte der Serie)

Jedes „darauf kommen wir zurück“ weiter oben ist ein Faden. Hier wird jeder davon verknüpft:

![Alternativtext](image-29.png)

| Offenes Ende aus diesem Artikel | Wo es aufgelöst wird |
|---|---|
| Wie kann ein versiegelter Umschlag gleichzeitig verbergend *und* unfälschbar sein? | Artikel 3: Commitments |
| Woher kommen die Schlüssel und geheimen Rezepte? | Artikel 1 & 2: Felder und Kurven |
| Was genau *ist* „die Tafel“? | Artikel 4: Merkle-Bäume |
| Wie kann man etwas beweisen und dabei nichts offenlegen? | Artikel 5: Zero-Knowledge-Proofs |
| Wie greifen alle fünf Teile in echtem Zcash ineinander? | Artikel 6: das abgeschirmte Protokoll |

---

## 12. Zusammenfassung

- Bitcoin ist **transparent**; Zcash bietet eine **abgeschirmte** Welt, in der Sender, Empfänger und Betrag verborgen sind.
- Das scheinbare Paradox (*privat und doch öffentlich überprüfbar*) ist der ganze Punkt, und es lässt sich auflösen.
- Eine abgeschirmte Zahlung besteht aus fünf ineinandergreifenden Teilen: einer **Note** (der Coin), einem **Note commitment** (dem versiegelten Umschlag), dem **Note commitment tree** (der öffentlichen Tafel), einem **Nullifier** (dem Ungültigkeits-Token, der Doppelausgaben verhindert) und einem **Zero-knowledge proof** (dem Vorhang, der Gültigkeit beweist, ohne etwas offenzulegen).
- Privatsphäre beruht letztlich auf **einer gekappten Verbindung**: Niemand außerhalb kann die Geburt einer Note (Commitment) mit ihrem Tod (Nullifier) verknüpfen.
- Die Öffentlichkeit überprüft die **Regeln**, niemals die **Inhalte**.

Du hältst jetzt die Karte in der Hand. Der Rest der Serie füllt sie aus.

---

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| **Note** | Eine private Werteinheit, das Zcash-Äquivalent zu einer Münze oder einem Geldschein |
| **Note commitment** | Ein kryptografisches Siegel, das beweist, dass eine Note existiert, ohne sie offenzulegen |
| **Note commitment tree** | Die nur anhängbare öffentliche Aufzeichnung aller Note commitments |
| **Nullifier** | Eine eindeutige „ausgegeben“-Markierung, die veröffentlicht wird, wenn eine Note verwendet wird, und Doppelausgaben verhindert |
| **Zero-knowledge proof** | Ein Beweis, dass eine Aussage wahr ist, ohne irgendetwas über diese Wahrheit hinaus offenzulegen |
| **Shielding / deshielding** | Gelder in die / aus der privaten abgeschirmten Welt bewegen |
| **Viewing key** | Der Schlüssel, der es dem Eigentümer erlaubt, an ihn adressierte Notes zu erkennen und zu lesen |

---

## FAQ

**Ist Zcash immer privat?**
Nein. Privatsphäre gilt für die *abgeschirmte* Welt (`z...`/`u...`-Adressen). Transparente (`t...`) Transaktionen sind öffentlich, wie bei Bitcoin.

**Wenn alles verborgen ist, was hindert dann jemanden daran, kostenlos Geld zu drucken?**
Der Zero-Knowledge-Proof. Er erzwingt mathematisch, dass die Outputs jeder Transaktion durch reale, nicht ausgegebene Inputs gedeckt sind, *während* die Beträge geheim bleiben.

**Kann dieselbe Note zweimal ausgegeben werden?**
Nein. Das Ausgeben einer Note veröffentlicht ihren Nullifier; ein zweiter Versuch würde den identischen Nullifier veröffentlichen, der bereits im „ausgegeben“-Behälter liegt, also lehnt das Netzwerk ihn ab.

**Können Außenstehende einen Sender mit einem Empfänger verknüpfen?**
Nein. Das Commitment (die Geburt der Note) und der Nullifier (der Tod der Note) können von niemandem ohne das geheime Wissen des Eigentümers miteinander abgeglichen werden.

---

### Antwort auf den Intuitionstest (Abschnitt 9)

Wenn der Nullifier *nur* aus der Note berechnet würde, ohne geheimen Schlüssel, dann könnte **jeder** ihn berechnen, wodurch Eigenschaft #1 (nur der Eigentümer kann ausgeben) gebrochen würde. Schlimmer noch: Der Nullifier wäre dann direkt aus öffentlichen Informationen über die Note ableitbar, was Beobachtern erlauben könnte, **den Nullifier zu seinem Commitment zurückzuverfolgen**, wodurch Eigenschaft #3 gebrochen würde und die Privatsphäre des gesamten Systems still und leise zerfiele. Der geheime Schlüssel ist es, der den Ungültigkeits-Token sowohl *ausschließlich zu deinem* als auch *nicht verknüpfbar* macht.

---

### Wie es weitergeht

**Artikel 1 . Endliche Felder:** das seltsame, wunderschöne Zahlensystem, in dem Arithmetik „umlaufend“ funktioniert, und der Grund, warum jedes Stück Kryptografie in dieser Serie dort lebt. Wir beginnen, wie immer, mit Intuition, ohne Formeln, bis sie verdient sind.

*Teil der Serie* Zcash from First Principles *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
