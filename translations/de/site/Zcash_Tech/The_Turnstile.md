---
# Das Drehkreuz

## TL;DR

- Das Drehkreuz ist eine öffentliche Buchhaltungsregel, die erfasst, wie viel Wert in jeden Shielded Pool hinein- und wieder herausfließt
- Es ermöglicht jedem zu überprüfen, dass ein Pool niemals mehr auszahlt, als in ihn eingezahlt wurde, auch wenn die Transaktionen innerhalb des Pools privat sind
- Das schützt den ZEC-Bestand vor einem verborgenen Bug, weil gefälschte Coins einen Pool nicht verlassen können, ohne die Zählung zu verletzen
- Es funktioniert, ohne die Privatsphäre zu schwächen, da nur die Gesamtwerte der Pools öffentlich sind, niemals einzelne Transaktionen
- Das Drehkreuz ist der Grund, warum die Migration von Orchard nach Ironwood beweisen kann, dass der Shielded Supply korrekt ist

<br/>

## Für wen ist das

- Für alle, die verstehen möchten, wie Zcash die Vertrauenswürdigkeit seines privaten Bestands sicherstellt
- Für Nutzer, die die Migration von Orchard nach Ironwood verfolgen und sich fragen, wie sie beweist, dass der Bestand real ist
- Für Neulinge, die neugierig sind, wie ein privates Geldsystem trotzdem geprüft werden kann

<br/>

## Die Herausforderung

Shielded Zcash verbirgt Beträge, Sender und Empfänger. Genau darum geht es bei der Privatsphäre. Aber das wirft eine schwierige Frage auf: Wenn niemand in den Shielded Pool hineinsehen kann, wie kann dann irgendjemand wissen, dass die Gesamtmenge an ZEC korrekt ist? Wie prüft man Geld, das man nicht sehen kann?

Falls ein Bug jemals jemandem erlauben würde, Coins innerhalb eines Shielded Pools zu fälschen, dann würde diese Fälschung durch dieselbe Privatsphäre verborgen, die ehrliche Nutzer schützt. Ohne eine Schutzmaßnahme würde diese Unsicherheit das Vertrauen in den gesamten Bestand untergraben. Das Drehkreuz ist die Schutzmaßnahme, die dieses Problem löst.

<br/>

## Was das Drehkreuz ist

Stell dir jeden Shielded Pool wie einen Raum mit einem einzigen gezählten Eingang vor. Jedes Mal, wenn Wert von außen in den Pool hineingeht oder ihn verlässt, um anderswohin zu gelangen, passiert er diesen Eingang und wird öffentlich mitgezählt. Die Transaktionen innerhalb des Raums bleiben privat, aber die laufende Gesamtsumme an der Tür ist für alle sichtbar.

Die Regel ist einfach: Ein Pool darf niemals mehr Wert herauslassen, als hineingegangen ist. Nodes lehnen jeden Block ab, der den Saldo eines Pools unter null drücken würde. Der Betrag, von dem angenommen wird, dass er sich in einem Pool befindet, ist jederzeit bekannt, denn er ist einfach die eingegangene Gesamtsumme minus die ausgegangene Gesamtsumme. Diese öffentliche Zählung ist das Drehkreuz.

<br/>

## Wie es funktioniert

Zcash hatte im Laufe seiner Geschichte mehrere Shielded Pools, etwa Sprout, Sapling und Orchard. Wert bewegt sich zwischen der transparenten Chain und diesen Pools und manchmal auch zwischen den Pools selbst. Das Drehkreuz überwacht diese Bewegungen:

1. Wenn ZEC in einen Shielded Pool fließt, wird der Betrag zum öffentlichen Saldo dieses Pools addiert
2. Wenn ZEC einen Pool verlässt, wird der Betrag subtrahiert
3. Das Netzwerk lehnt jeden Block ab, der den Saldo eines Pools negativ machen würde, also wenn mehr hinausgeflossen ist, als jemals hineingeflossen ist
4. Einzelne Shielded Transaktionen bleiben vollständig privat, nur die Gesamtwerte der Pools sind öffentlich

Das Netzwerk verfolgt auf diese Weise für jeden Value Pool einen Saldo, einschließlich Sprout, Sapling, Orchard, des neuen Ironwood-Pools sowie der transparenten und Lockbox-Salden. Deshalb ist selbst dann, wenn der genaue Inhalt eines Pools verborgen ist, der Höchstbetrag, der jemals herauskommen kann, durch das begrenzt, was hineingegangen ist. Verborgene Inflation kann nicht in Umlauf gelangen.

<br/>

## Wie die Value Balance geprüft wird

Die Zählung an der Tür ist nur deshalb vertrauenswürdig, weil jede Transaktion gezwungen ist zu beweisen, dass sie einen wahrheitsgemäßen Betrag bewegt hat, auch wenn der Betrag selbst verborgen bleibt. Jede Shielded Transaktion veröffentlicht genau eine ehrliche Zahl: den Nettowert, den sie in den Pool hinein oder aus ihm heraus bewegt, genannt ihre Value Balance. Eine positive Value Balance bedeutet, dass Mittel den Pool in Richtung der transparenten Seite verlassen haben, eine negative bedeutet, dass Mittel hineingeflossen sind. Die privaten Details bleiben versiegelt, aber diese einzelne Nettozahl ist öffentlich, und genau sie summiert das Drehkreuz auf.

Der clevere Teil ist, wie eine Transaktion beweist, dass diese öffentliche Zahl ehrlich ist, ohne die privaten Beträge dahinter offenzulegen. Der Mechanismus unterscheidet sich je nach Pool, und das ist die eigentliche Maschinerie des Drehkreuzes.

Im ursprünglichen Sprout-Pool verwendet jede Transaktion ein JoinSplit. Ein JoinSplit gibt zwei verborgene Notes aus und erzeugt zwei neue und enthält zwei öffentliche Felder: vpub_old, den Wert, der von der transparenten Seite in den Shielded Pool hineingeht, und vpub_new, den Wert, der den Pool zurück zur transparenten Seite verlässt. Jedes JoinSplit muss für sich allein ausgeglichen sein, und sein Zero-Knowledge-Beweis garantiert, dass die verborgenen Eingänge und verborgenen Ausgänge korrekt aufsummiert werden. Der Poolsaldo von Sprout ist einfach die laufende Summe aller vpub_old minus aller vpub_new über die gesamte Chain. Deshalb ist Sprout später ein nützliches Beispiel: Weil vpub_old der einzige Weg ist, auf dem Wert in den Pool gelangen kann, kann eine einzige Regel, die ihn abschaltet, den Pool dauerhaft versiegeln.

In Sapling, Orchard und Ironwood wird der Saldo auf intelligentere Weise bewiesen, mithilfe einer Binding Signature. Anstatt dass jede Übertragung für sich allein ausgeglichen sein muss, committet sich die gesamte Transaktion an jeden verborgenen Betrag mit einem Value Commitment. Ein Value Commitment ist ein versiegelter Umschlag für eine Zahl, der mit einem homomorphen Pedersen-Commitment erstellt wird, das eine besondere Eigenschaft hat: Die Umschläge können addiert und subtrahiert werden, ohne sie zu öffnen. Das Netzwerk addiert alle Input-Commitments, subtrahiert alle Output-Commitments und vergleicht das Ergebnis mit der einzelnen deklarierten Nettozahl der Transaktion, ihrem Feld valueBalance. Nur eine Transaktion, deren verborgene Beträge wirklich zu diesem öffentlichen valueBalance passen, kann eine gültige Binding Signature über die kombinierten Commitments erzeugen. Wenn jemand versuchen würde, mehr Wert zu bewegen, als deklariert wurde, würden die Commitments nicht aufgehen, die Binding Signature würde nicht verifiziert werden und die Transaktion würde abgelehnt. Ironwood verwendet dasselbe Orchard-Protokoll, daher funktioniert es auf dieselbe Weise.

Genau das macht auch eine poolübergreifende Übertragung sicher prüfbar. Wenn Mittel von einem Shielded Pool in einen anderen verschoben werden, zum Beispiel von Orchard nach Ironwood, kann die Transaktion die Beträge nicht vor der Buchhaltung verbergen. Jeder Pool hat seine eigene Value Balance, die durch eigene Beweise erfüllt werden muss: Die Orchard-Seite muss durch ihre Binding Signature einen passenden Abfluss nachweisen, und die Ironwood-Seite muss durch ihre eigene den entsprechenden Zufluss nachweisen. Der Wert, der einen Pool verlässt, und der Wert, der in den anderen eintritt, werden jeweils unabhängig bewiesen, sodass eine poolübergreifende Bewegung in Wirklichkeit zwei Drehkreuz-Durchgänge in einer Transaktion sind, einmal hinaus, einmal hinein, und beide werden öffentlich mitgezählt, obwohl die zugrunde liegenden Beträge privat bleiben.

Das Drehkreuz beruht also nicht auf Vertrauen. Jede Transaktion beweist mathematisch ihren eigenen Nettoeffekt, das Netzwerk summiert diese bewiesenen Nettoeffekte pro Pool, und eine Konsensregel (ZIP 209) lehnt jeden Block ab, der den Saldo eines Pools ins Negative treiben würde. Beweis auf Transaktionsebene, Durchsetzung auf Chain-Ebene.

<br/>

## Warum es wichtig ist

Das Drehkreuz gibt Zcash drei Dinge auf einmal.

Erstens begrenzt es Risiken. Ein kryptografischer Bug in einem Pool bleibt auf diesen Pool beschränkt, weil das Drehkreuz verhindert, dass gefälschter Wert in den weiteren Bestand übertritt.

Zweitens ermöglicht es der Community, den Bestand rückblickend zu überprüfen. Wenn später ein Bug entdeckt wird, zeigt die Drehkreuz-Aufzeichnung, ob jemals mehr Wert einen Pool verlassen hat, als hineingelangt ist. Eine saubere Aufzeichnung ist ein starkes Indiz dafür, dass keine Fälschung ausgenutzt wurde.

Drittens bewahrt es dabei die Privatsphäre. Nur die Gesamtwerte auf Pool-Ebene sind öffentlich. Deine einzelnen Transaktionen bleiben shielded. Prüfbarkeit und Privatsphäre bestehen nebeneinander, was ungewöhnlich ist und eine der stillen Stärken von Zcash darstellt.

<br/>

## Das Drehkreuz in der Praxis

Das Drehkreuz ist nicht neu und wurde in Schlüsselmomenten der Zcash-Geschichte eingesetzt.

Als Zcash vom ursprünglichen Sprout-Pool in Richtung des neueren Sapling-Pools wechselte, schützte das Drehkreuz diesen Übergang. Der Sprout-Pool wurde später so eingeschränkt, dass er keine neuen Zuflüsse mehr empfangen konnte, was Nutzer zur Migration ermutigte, während das Drehkreuz die Buchhaltung ehrlich hielt. Jahre später gilt die Tatsache, dass nie unzulässigerweise Wert aus Sprout herausfloss, als Hinweis darauf, dass seine frühe Kryptografie nie erfolgreich ausgenutzt wurde.

Dasselbe Design schützt nun den Wechsel von Orchard zu Ironwood. Im Jahr 2026 wurde ein Soundness-Bug im Orchard-Proving-System gefunden und behoben. Es gibt keine Hinweise darauf, dass er jemals ausgenutzt wurde, aber weil Shielded Aktivität privat ist, war Gewissheit unmöglich. Die Reaktion besteht darin, den alten Orchard-Pool zu versiegeln und alle dazu zu bringen, ihre Mittel durch das Drehkreuz in Ironwood zu migrieren, einen neuen Pool mit dem korrigierten Protokoll. Die Mittel durch das Drehkreuz zu zwingen bedeutet, dass hypothetische gefälschte Coins, die zurückbleiben, nicht folgen können, und sobald die Migration abgeschlossen ist, kann jeder bestätigen, dass der Shielded Supply korrekt ist.

<br/>

## Einseitige Außerdienststellung von Pools

Das Drehkreuz macht es möglich, einen alten Pool sicher stillzulegen, und zwar nur in eine Richtung, ohne jemals die Bestands-Garantie zu brechen. Der Trick besteht darin, den Eingang zu schließen und den Ausgang offen zu lassen.

Sprout ist das deutlichste Beispiel. Um ihn außer Dienst zu stellen, führte ZIP 211 eine einzige Konsensregel ein: Ab seiner Aktivierungshöhe muss das Feld vpub_old jedes JoinSplit null sein. Da vpub_old der einzige Weg ist, auf dem Wert in Sprout gelangen kann, bedeutet das Erzwingen von null, dass niemals wieder neuer Wert hineingehen kann, während Wert weiterhin zur transparenten Seite oder weiter nach Sapling hinausfließen kann. Der Pool wurde einseitig. Er kann nur geleert, nie wieder gefüllt werden. Das Drehkreuz zählt die ganze Zeit weiter, sodass der Saldo sinken kann, wenn Mittel den Pool verlassen, aber niemals steigen und niemals negativ werden kann.

Die Migration von Orchard nach Ironwood verwendet dieselbe Idee. Beim Upgrade NU6.3 wird der Orchard-Pool für neue Zuflüsse geschlossen, und Wallets werden angewiesen, Orchard-Mittel über das Drehkreuz in den neuen Ironwood-Pool zu senden. Orchard wird zu einem einseitigen Pool, der nur noch geleert werden kann. Weil jeder Ausgang ein Drehkreuz-Durchgang ist, der bewiesen werden muss, kann hypothetischer gefälschter Wert, der in Orchard zurückbleibt, den ehrlichen Mitteln nicht unbemerkt folgen. Er steckt in einem Pool fest, der nur entleert wird und an dessen Tür mitgezählt wird. Mit der Zeit treibt das den alten Pool in Richtung leer und ermöglicht es jedem zu bestätigen, dass der Wert, der herauskam, niemals größer war als der Wert, der ehrlich hineinging.

Das ist der tiefere Grund, warum das Drehkreuz über reine Buchhaltung hinaus wichtig ist. Es ist der Mechanismus, der es Zcash erlaubt, einen Shielded Pool außer Dienst zu stellen, sei es zur Verringerung der Komplexität wie bei Sprout oder zur Erholung von einem entdeckten Bug wie bei Orchard, und dabei eine durchgehende, öffentliche, beweisbare Garantie über den Bestand aufrechtzuerhalten.

<br/>

## Häufige Missverständnisse

- Das Drehkreuz legt deine Transaktionen nicht offen. Es zählt nur die Gesamtwerte der Pools, nicht wer wem was gesendet hat
- Es identifiziert keinen Fälscher namentlich. Es begrenzt, wie viel einen Pool verlassen kann, und genau das schützt den Bestand
- Es ist keine neue Erfindung für Ironwood. Es hat jeden großen Übergang zwischen Shielded Pools in der Geschichte von Zcash geschützt
- Ein öffentlicher Gesamtwert eines Pools schwächt die Privatsphäre nicht. Die Privatsphäre liegt in den Transaktionen innerhalb des Pools, die verborgen bleiben

<br/>

## Ressourcen

1. [ZIP 209: Verbot von Chain-Value-Pool-Salden außerhalb des zulässigen Bereichs](https://zips.z.cash/zip-0209) - die Konsensregel hinter dem Drehkreuz
2. [ZIP 211: Deaktivierung des Hinzufügens neuen Werts zum Sprout Chain Value Pool](https://zips.z.cash/zip-0211) - wie der Sprout-Pool für neue Einzahlungen geschlossen wurde
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - das Upgrade, das den Ironwood-Pool einführt und Wert über das Drehkreuz lenkt
4. [Durchsetzung des Drehkreuzes gegen Fälschungen](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - die ursprüngliche Erklärung der Electric Coin Company
5. [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) - siehe die Abschnitte zu Balance und Binding Signature für die vollständigen Details
6. [Value Pools, das Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - wie ein Node die Value Balance jedes Pools nachverfolgt

<br/>

## Verwandte Seiten

- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) - wie Shielded Transaktionen in Zcash Details privat halten
- [Halo](https://zechub.wiki/zcash-tech/halo) - das Proof-System hinter dem Orchard-Pool
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) - wie Zcash Änderungen wie neue Shielded Pools aktiviert
