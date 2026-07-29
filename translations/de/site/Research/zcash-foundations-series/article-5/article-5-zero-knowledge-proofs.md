# Zero-Knowledge-Proofs: Beweisen, dass du recht hast, ohne zu sagen, warum
##### Originalforschung von [Annkkitaaa](https://github.com/Annkkitaaa)

![Alternativtext](image-23.png)

### Der Vorhang, der es der Welt erlaubt zu verifizieren, was sie niemals sehen kann

> **Serie:** *Zcash from First Principles* . **Artikel 5 . Zero-Knowledge-Proofs**
> **Zielgruppe:** Einsteiger. Wir greifen auf jeden früheren Artikel zurück (endliche Körper, Kurven, Commitments, Merkle-Bäume), aber jede Idee wird wieder aufgegriffen, sobald wir sie brauchen.
> **Was du mitnimmst:** ein intuitives, korrektes Verständnis davon, was ein Zero-Knowledge-Proof ist, welche drei Garantien er bietet, wie beliebige Aussagen bewiesen werden und was Zcashs Sapling und Orchard antreibt.

Dies ist der Artikel, auf den die ganze Serie hingearbeitet hat. Seit [Artikel 0](article-0-shielded-transaction.md) haben wir immer wieder gesagt, dass eine Zahlung „hinter einem Vorhang“ validiert wird, als korrekt bewiesen, ohne etwas preiszugeben. Ein Zero-Knowledge-Proof ist dieser Vorhang. Er ist das Element, das schließlich das Paradox auflöst, mit dem wir begonnen haben: *Wie kann die Öffentlichkeit eine Transaktion verifizieren, die sie nicht sehen darf?*

---

## 1. Warum sollte dich das interessieren?

Erinnere dich an den Widerspruch im Zentrum von Zcash:

- Eine Blockchain ist vertrauenswürdig, weil sie **öffentlich verifizierbar** ist.
- Zcash-Zahlungen sind **vollständig privat**: Beträge, Absender, Empfänger, alles verborgen.

Das wirkt gegenseitig unvereinbar. Verifizierung scheint *Hinsehen* zu *erfordern*. Privatsphäre *verbietet* das Hinsehen. Wenn du beides nicht zusammenbringen kannst, kannst du kein privates Geld haben, dem irgendjemand vertraut.

Ein **Zero-Knowledge-Proof (ZKP)** ist diese Versöhnung. Er erlaubt es einem **Beweiser** (**prover**), einen **Verifizierer** (**verifier**) davon zu überzeugen, dass eine Aussage wahr ist, **ohne irgendetwas über die Tatsache hinaus preiszugeben, dass sie wahr ist.** Keine Beträge. Keine Identitäten. Keine Note. Nur: *„Alles hier hält die Regeln ein.“* Lass uns erst die Intuition aufbauen, bevor wir zur Technik kommen.

---

## 2. Die Intuition: drei Alltagsbeweise

**Beweis, dass du ein Passwort kennst, ohne es zu sagen.** Eine Website könnte verifizieren, dass du dein Passwort kennst, indem sie beobachtet, wie du etwas entsperrst, das nur das Passwort entsperren kann, ohne das Passwort selbst jemals zu sehen. Du beweist *Wissen* ohne *Offenlegung*.

**Der farbenblinde Freund und zwei Bälle.** Du hältst einen roten und einen grünen Ball, die für deinen farbenblinden Freund identisch aussehen. Du willst ihn davon überzeugen, dass sie *unterschiedliche Farben* haben, ohne ihm zu verraten, welcher welcher ist. Er versteckt beide hinter seinem Rücken, vertauscht sie optional und zeigt dir einen. Du sagst, ob er sie vertauscht hat. Wenn die Bälle wirklich verschieden sind, liegst du immer richtig. Wenn sie identisch wären, würdest du raten und nur in der Hälfte der Fälle richtig liegen. Nach 20 Runden überzeugt ihn deine ununterbrochene Trefferquote davon, dass sie verschieden sind, und trotzdem erfährt er nie, welcher Ball rot ist. **Er ist von einer Tatsache überzeugt, ohne irgendetwas anderes zu lernen.** Das ist Zero Knowledge im Kleinen.

**Die Höhle.** Eine ringförmige Höhle hat hinten eine magische Tür, die sich nur mit einem geheimen Wort öffnet. Du behauptest, das Wort zu kennen. Um das zu beweisen, ohne es preiszugeben, wartet ein Verifizierer draußen, während du hineingehst und zufällig den linken oder rechten Gang wählst. Der Verifizierer ruft dann, auf welcher Seite er dich wieder herauskommen sehen will. Wenn du das Wort wirklich kennst, kannst du dem immer nachkommen (du kannst die Tür öffnen, um bei Bedarf die Seite zu wechseln). Wenn du bluffst, kannst du nur mit Glück auf der richtigen Seite herauskommen, 50/50 in jeder Runde. Wiederhole das 20-mal, und die Chancen eines Bluffers, durchzukommen, liegen bei unter eins zu einer Million.

Diese Höhlengeschichte zeigt still und leise die **drei Garantien**, die jeder Zero-Knowledge-Proof erfüllen muss.

---

## 3. Die drei Garantien

![Alternativtext](image-24.png)

| Garantie | In der Höhlengeschichte | In Zcash |
|---|---|---|
| **Vollständigkeit** | Wenn du das Wort kennst, kommst du immer auf der richtigen Seite heraus | Eine gültige Transaktion erzeugt immer einen akzeptierten Beweis |
| **Korrektheit** | Ein Bluffer wird mit überwältigender Wahrscheinlichkeit erwischt | Eine betrügerische Transaktion (gefälschtes Geld, Double-Spend) kann keinen akzeptierten Beweis erzeugen |
| **Zero Knowledge** | Der Verifizierer hört nie das geheime Wort | Das Netzwerk erfährt nie Beträge, Adressen oder welche Note es ist |

Wenn auch nur eine dieser Eigenschaften versagt, bricht das System zusammen: keine Vollständigkeit, und ehrliche Nutzer werden abgewiesen; keine Korrektheit, und Fälscher drucken Geld; kein Zero Knowledge, und die Privatsphäre verfliegt.

---

## 4. Von einer Höhle zu *jeder* Aussage: Schaltkreise und Witnesses

Die Höhle beweist eine nette kleine Tatsache. Zcash muss eine viel reichhaltigere Aussage beweisen: *„Ich kenne eine unspent Note im Baum, ich bin berechtigt, sie auszugeben, ihr nullifier ist korrekt berechnet, und meine Eingaben entsprechen meinen Ausgaben.“* Wie kommen wir von Bällen und Höhlen dahin?

Die Brücke ist eine Idee, die diese ganze Serie zusammenbindet:

> **Jede Aussage, die du mit einer Berechnung überprüfen kannst, kann als arithmetischer Schaltkreis umgeschrieben werden:** ein Netzwerk aus Additionen und Multiplikationen über einem endlichen Körper (Artikel 1).

Betrachte den Schaltkreis als eine Liste arithmetischer Constraints, die *nur dann alle erfüllt sind, wenn die Aussage wahr ist.* Die privaten Eingaben, die alles aufgehen lassen, deine Note, dein Schlüssel, der Merkle-Pfad, heißen der **Witness**.

![Alternativtext](image-25.png)

Darum haben wir Artikel 1 den endlichen Körpern und Artikel 3 ZK-freundlichen Hashes gewidmet: Der Schaltkreis spricht die Sprache der Körperarithmetik, also muss jede Operation innerhalb der Aussage (einschließlich Hashing und des Merkle-Aufstiegs aus Artikel 4) auf diese Weise ausgedrückt werden. Je günstiger sich jede Operation ausdrücken lässt, desto kleiner und schneller wird der Beweis.

---

## 5. Praktisch werden: nicht-interaktiv und knapp

Die Höhle brauchte viele Hin-und-her-Runden. Das ist für eine Blockchain unpraktisch, wo ein Beweis einmal veröffentlicht und dann von allen für immer überprüft werden muss. Zwei Erweiterungen beheben das.

**Nicht-interaktiv (die Fiat-Shamir-Idee).** Statt dass ein live anwesender Verifizierer zufällige Challenges ruft, erzeugt der Beweiser die „zufälligen Challenges“ selbst, indem er seinen bisherigen Beweis *hasht*. Weil ein guter Hash unvorhersehbar ist (Artikel 3), kann der Beweiser die Challenges nicht zu seinen Gunsten zurechtkochen. Das gesprächige Hin und Her kollabiert zu einem **einzigen in sich geschlossenen Beweis**, den jeder später ohne Interaktion prüfen kann.

**Knapp.** Die besten Systeme machen den Beweis **winzig und schnell verifizierbar, egal wie groß die Aussage ist.** Das ist der wirklich erstaunliche Teil.

> Ein Groth16-Beweis (das System, das Sapling verwendet) ist ungefähr **192 Byte** groß und wird in Millisekunden verifiziert, *egal ob die bewiesene Aussage klein oder enorm ist.* Ein paar hundert Byte können eine Berechnung mit vielen Tausend Constraints bescheinigen.

Setzt man das zusammen, erhält man das Akronym, das dir überall begegnen wird:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Zero Knowledge (gibt nichts preis), succinct (klein und schnell), non-interactive (einmalig), argument of knowledge (der Beweiser *kennt* wirklich einen gültigen Witness).

---

## 6. Der eine Haken: trusted setup

Es gibt kein kostenloses Mittagessen. Viele SNARKs brauchen ein einmaliges **Setup**, das öffentliche Parameter für den Schaltkreis erzeugt. Das Setup erzeugt als Nebenprodukt geheime Zufälligkeit, und dieses Geheimnis muss **vernichtet** werden. Wenn es jemand behalten würde, könnte er Beweise fälschen, also **Geld fälschen** (entscheidend ist aber: die Privatsphäre könnte dadurch trotzdem *nicht* gebrochen werden).

Dieses übriggebliebene Geheimnis trägt den Spitznamen **toxic waste**. Um es sicher zu entsorgen, führte Zcash aufwendige **Multi-Party-Zeremonien** durch, bei denen viele unabhängige Teilnehmer jeweils Zufälligkeit beitrugen; solange *auch nur einer* seinen Anteil ehrlich vernichtete, bleibt das toxic waste unwiederherstellbar.

![Alternativtext](image-26.png)

Neuere Systeme kommen ganz ohne diese Voraussetzung aus, was einer der wichtigsten Gründe ist, warum Zcash sein Beweissystem im Laufe der Zeit weiterentwickelt hat.

---

## 7. Wo das in Zcash lebt

| Design | Beweissystem | Trusted setup? | Basiert auf |
|---|---|---|---|
| **Sprout** (früheste Version) | frühes zk-SNARK | Ja | ursprüngliche Zeremonie |
| **Sapling** | **Groth16** | Ja (die Multi-Party-„Powers of Tau“ + Sapling-Zeremonie) | **BLS12-381** (Artikel 2) |
| **Orchard** (aktuell) | **Halo 2** | **Kein trusted setup** | **Pallas / Vesta** (Artikel 2) |

Der Weg von Sprout über Sapling zu Orchard ist größtenteils eine Geschichte darüber, wie Beweise kleiner und schneller wurden und das trusted setup abgestreift haben. **Halo 2**, verwendet von Orchard, braucht überhaupt keine Zeremonie und ist so gebaut, dass es *Rekursion* unterstützt (Beweise, die andere Beweise verifizieren), weshalb Orchard den Pallas/Vesta-**Zyklus** von Kurven aus Artikel 2 verwendet: Jede Kurve ist darauf abgestimmt, Beweise zu verifizieren, die über der jeweils anderen formuliert sind.

Damit schließt sich die größte Schleife aus Artikel 0. Die Magie „hinter dem Vorhang“ ist ein **zk-SNARK**: Es beweist, dass deine Transaktion einen arithmetischen Schaltkreis erfüllt, der alle Regeln codiert, und gibt dabei nichts weiter preis als das einzelne Bit „gültig“.

---

## 8. Ein ehrlicher Hinweis

Zero-Knowledge-Proofs sind ein tiefes Feld, und wir sind bewusst auf der Ebene der Intuition geblieben. Wir haben weder die genauen Wahrscheinlichkeitsgrenzen der Korrektheit definiert, noch die exakte Form eines arithmetischen Schaltkreises (R1CS, PLONKish und so weiter), noch wie Polynome und Commitments einen Schaltkreis in einen kurzen Beweis verwandeln, noch die tatsächlichen Interna von Groth16 und Halo 2. Die Höhle ist ein *interaktiver* Beweis; Produktionssysteme sind nicht-interaktiv und weit komplexer. Nichts davon verändert den Kern: beweisen, dass ein Schaltkreis durch einen geheimen Witness erfüllt wird, vollständig, korrekt und ohne irgendetwas preiszugeben. Die Mechanik dahinter wäre eine ganze eigene Serie.

---

## 9. Zusammenfassung

- Ein **Zero-Knowledge-Proof** erlaubt es einem Beweiser, einen Verifizierer davon zu überzeugen, dass eine Aussage wahr ist, **während er nichts anderes preisgibt**, und löst damit das Paradox zwischen Verifizierbarkeit und Privatsphäre auf.
- Er muss drei Garantien erfüllen: **Vollständigkeit** (wahre Aussagen überzeugen), **Korrektheit** (falsche Aussagen können nicht überzeugen) und **Zero Knowledge** (der Verifizierer lernt nur „es ist wahr“).
- Beliebige Aussagen werden zu **arithmetischen Schaltkreisen** über einem endlichen Körper; die geheimen Eingaben, die den Schaltkreis erfüllen, sind der **Witness**. Deshalb waren endliche Körper und ZK-freundliche Hashes wichtig.
- **Fiat-Shamir** macht Beweise **nicht-interaktiv** (einmalig); die besten Systeme sind außerdem **knapp** (ein Groth16-Beweis ist etwa **192 Byte** groß und wird in Millisekunden verifiziert, unabhängig von der Größe der Aussage). Zusammen: ein **zk-SNARK**.
- Einige SNARKs brauchen ein **trusted setup**, dessen verbleibendes **toxic waste** vernichtet werden muss (durch Multi-Party-Zeremonien); eine Kompromittierung würde das Fälschen von Geld erlauben, aber **nicht** das Brechen der Privatsphäre.
- **Sapling** verwendet **Groth16** (trusted setup, BLS12-381); **Orchard** verwendet **Halo 2** (kein trusted setup, Pallas/Vesta, rekursionsfreundlich).

---

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| **Zero-Knowledge-Proof** | Jemanden davon überzeugen, dass eine Aussage wahr ist, ohne irgendetwas anderes preiszugeben |
| **Prover / Verifier** | Derjenige, der den Beweis erstellt / derjenige, der ihn prüft |
| **Vollständigkeit** | Wahre Aussagen werden immer akzeptiert (von einem ehrlichen Beweiser) |
| **Korrektheit** | Falsche Aussagen werden abgelehnt (Betrüger können nur mit Glück gewinnen) |
| **Witness** | Die geheimen Eingaben, die die Aussage wahr machen |
| **Arithmetischer Schaltkreis** | Eine Aussage, umgeschrieben als Additionen und Multiplikationen über einem endlichen Körper |
| **Nicht-interaktiv (Fiat-Shamir)** | Ein einmaliger Beweis ohne live Hin und Her |
| **Knapp** | Der Beweis ist winzig und schnell verifizierbar, unabhängig von der Größe der Aussage |
| **zk-SNARK** | Zero-Knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Einmalige Parametererzeugung, deren verbleibendes Geheimnis vernichtet werden muss |

---

## FAQ

**Wenn der Beweis nichts preisgibt, wie kann seine Überprüfung dann überhaupt etwas bedeuten?**
Weil die Mathematik so angeordnet ist, dass *nur* ein echter, gültiger Witness einen erfolgreichen Beweis erzeugen kann. Das Bestehen der Prüfung ist selbst der Beleg, ganz ohne Offenlegung.

**Könnte jemand einen Beweis fälschen?**
Die Korrektheit macht das praktisch unmöglich. Die einzige Ausnahme ist ein SNARK, dessen toxic waste aus dem trusted setup aufbewahrt wurde; genau deshalb sind die Zeremonien zu seiner Vernichtung so wichtig.

**Leckt ein kaputtes trusted setup meine privaten Daten?**
Nein. Es würde einem Angreifer erlauben, *neues* Geld zu fälschen, aber es legt **nicht** Beträge, Adressen oder Notes offen. Privatsphäre und Korrektheit sind getrennte Garantien.

**Warum hat Zcash seine Beweissysteme im Laufe der Zeit verändert?**
Um kleinere, schnellere Beweise zu bekommen und mit Halo 2 das trusted setup vollständig zu eliminieren und Rekursion zu ermöglichen.

---

### Teste deine Intuition

Warum ist es in der Höhle entscheidend, dass der Verifizierer die Ausgangsseite *erst dann* wählt, *nachdem* der Beweiser bereits hineingegangen ist, statt sie vorher anzukündigen? *(Antwort unten.)*

<details><summary>Antwort</summary>

Wenn der Verifizierer die Seite zuerst ankündigen würde, könnte ein Bluffer, der das Wort nicht kennt, einfach von Anfang an auf dieser Seite hineingehen und gemütlich wieder herausspazieren, ohne jemals die Tür zu brauchen. Die Wahl *nachdem* sich der Beweiser bereits auf einen Gang festgelegt hat, zwingt einen Bluffer dazu, sich auf Glück zu verlassen (50/50 pro Runde), und genau das macht wiederholte Runden überzeugend. Diese Reihenfolge „erst festlegen, dann herausgefordert werden“ ist genau das, was Fiat-Shamir bewahrt, indem die Challenge aus einem Hash des bereits festgelegten Beweises des Beweisers abgeleitet wird.
</details>

---

### Was kommt als Nächstes?

**Artikel 6 . Das shielded protocol von Anfang bis Ende:** das Finale. Wir nehmen jedes einzelne Teil, Notes, Commitments, den Note-Commitment-Baum, nullifiers, Wertbilanz und den Zero-Knowledge-Proof, und setzen daraus eine vollständige shielded Zcash-Transaktion zusammen, womit wir jede einzelne Schleife schließen, die bereits in Artikel 0 geöffnet wurde.

*Teil der Serie* Zcash from First Principles *für [ZecHub](https://zechub.org). Lizenziert unter CC BY-SA 4.0.*
