---
# Das Drehkreuz

## TL;DR

- Das Drehkreuz ist eine öffentliche Buchhaltungsregel, die verfolgt, wie viel Wert in jeden abgeschirmten Pool hinein- und aus ihm herausfließt
- Es ermöglicht jedem zu überprüfen, dass ein Pool niemals mehr auszahlt, als in ihn hineingegeben wurde, obwohl die Transaktionen darin privat sind
- Das schützt den ZEC-Bestand vor einem versteckten Bug, weil gefälschte Coins einen Pool nicht verlassen können, ohne die Zählung zu verletzen
- Es funktioniert, ohne die Privatsphäre zu schwächen, da nur die Pool-Gesamtsummen öffentlich sind, niemals einzelne Transaktionen
- Das Drehkreuz ist der Grund, warum die Migration von Orchard nach Ironwood beweisen kann, dass der abgeschirmte Bestand korrekt ist

<br/>

## Für wen ist das

- Für alle, die verstehen wollen, wie Zcash seinen privaten Bestand vertrauenswürdig hält
- Für Nutzer, die die Migration von Orchard nach Ironwood verfolgen und sich fragen, wie sie beweist, dass der Bestand echt ist
- Für Neueinsteiger, die neugierig sind, wie ein privates Geldsystem trotzdem geprüft werden kann

<br/>

## Die Herausforderung

Abgeschirmtes Zcash verbirgt Beträge, Sender und Empfänger. Genau darum geht es bei der Privatsphäre. Aber das wirft eine schwierige Frage auf: Wenn niemand in den abgeschirmten Pool hineinsehen kann, woher weiß dann irgendjemand, dass die Gesamtmenge an ZEC korrekt ist? Wie prüft man Geld, das man nicht sehen kann?

Falls ein Bug jemals jemandem erlauben würde, Coins innerhalb eines abgeschirmten Pools zu fälschen, wäre diese Fälschung durch dieselbe Privatsphäre verborgen, die ehrliche Nutzer schützt. Ohne eine Schutzmaßnahme würde diese Unsicherheit das Vertrauen in den gesamten Bestand untergraben. Das Drehkreuz ist die Schutzmaßnahme, die dieses Problem löst.

<br/>

## Was das Drehkreuz ist

Stell dir jeden abgeschirmten Pool als einen Raum mit einem einzigen gezählten Durchgang vor. Jedes Mal, wenn Wert von außen in den Pool hineingeht oder ihn verlässt, um woandershin zu gelangen, passiert er diesen Durchgang und wird öffentlich mitgezählt. Die Transaktionen innerhalb des Raums bleiben privat, aber die laufende Gesamtsumme an der Tür ist für alle sichtbar.

Die Regel ist einfach: Ein Pool darf niemals mehr Wert herauslassen, als hineingegangen ist. Knoten lehnen jeden Block ab, der den Saldo eines Pools unter null drücken würde. Der Betrag, von dem angenommen wird, dass er sich in einem Pool befindet, ist jederzeit bekannt, weil er einfach der Gesamtsumme entspricht, die hineingegangen ist, minus der Gesamtsumme, die herausgegangen ist. Diese öffentliche Zählung ist das Drehkreuz.

<br/>

## Wie es funktioniert

Zcash hatte im Laufe seiner Geschichte mehrere abgeschirmte Pools, etwa Sprout, Sapling und Orchard. Wert bewegt sich zwischen der transparenten Chain und diesen Pools und manchmal auch zwischen den Pools selbst. Das Drehkreuz überwacht diese Bewegungen:

1. Wenn ZEC in einen abgeschirmten Pool bewegt wird, wird der Betrag zum öffentlichen Saldo dieses Pools addiert
2. Wenn ZEC einen Pool verlässt, wird der Betrag abgezogen
3. Das Netzwerk lehnt jeden Block ab, der den Saldo eines Pools negativ machen würde, also wenn mehr herausgegangen wäre, als jemals hineingegangen ist
4. Einzelne abgeschirmte Transaktionen bleiben vollständig privat, nur die Pool-Gesamtsummen sind öffentlich

Das Netzwerk verfolgt auf diese Weise einen Saldo für jeden Wertpool, einschließlich Sprout, Sapling, Orchard, des neuen Ironwood-Pools sowie der transparenten und Lockbox-Salden. Dadurch gilt: Selbst wenn der genaue Inhalt eines Pools verborgen ist, ist das Maximum, das jemals herauskommen kann, durch das begrenzt, was hineingegangen ist. Versteckte Inflation kann nicht in Umlauf gelangen.

<br/>

## Wie der Wertsaldo geprüft wird

Die Zählung an der Tür ist nur deshalb vertrauenswürdig, weil jede Transaktion beweisen muss, dass sie einen wahrheitsgemäßen Betrag bewegt hat, obwohl der Betrag selbst verborgen bleibt. Jede abgeschirmte Transaktion veröffentlicht eine ehrliche Zahl: den Nettowert, den sie in den Pool hinein oder aus ihm heraus bewegt, ihren sogenannten Wertsaldo. Ein positiver Wertsaldo bedeutet, dass Gelder den Pool zur transparenten Seite hin verlassen haben, ein negativer bedeutet, dass Gelder hineingegangen sind. Die privaten Details bleiben versiegelt, aber diese einzelne Nettozahl ist öffentlich, und genau diese addiert das Drehkreuz auf.

Der clevere Teil ist, wie eine Transaktion beweist, dass diese öffentliche Zahl korrekt ist, ohne die privaten Beträge dahinter offenzulegen. Der Mechanismus unterscheidet sich je nach Pool, und das ist die eigentliche Maschinerie des Drehkreuzes.

Im ursprünglichen Sprout-Pool verwendet jede Transaktion einen JoinSplit. Ein JoinSplit gibt zwei verborgene Notes aus und erzeugt zwei neue, und er enthält zwei öffentliche Felder: vpub_old, den Wert, der von der transparenten Seite in den abgeschirmten Pool hineingeht, und vpub_new, den Wert, der den Pool zurück zur transparenten Seite verlässt. Jeder JoinSplit muss für sich allein ausgeglichen sein, und sein Zero-Knowledge-Beweis garantiert, dass sich die verborgenen Eingänge und verborgenen Ausgänge korrekt summieren. Der Poolsaldo von Sprout ist einfach die laufende Gesamtsumme aller vpub_old minus aller vpub_new über die Chain hinweg. Deshalb ist Sprout später ein nützliches Beispiel: Weil vpub_old die einzige Möglichkeit ist, wie Wert in den Pool hineingehen kann, kann eine einzelne Regel, die es abschaltet, den Pool dauerhaft versiegeln.

In Sapling, Orchard und Ironwood wird der Saldo auf eine klügere Weise bewiesen, mithilfe einer Bindungssignatur. Anstatt dass jede Übertragung für sich allein ausgeglichen sein muss, verpflichtet sich die gesamte Transaktion zu jedem verborgenen Betrag mithilfe eines Value Commitments. Ein Value Commitment ist ein versiegelter Umschlag für eine Zahl, aufgebaut mit einem homomorphen Pedersen-Commitment, das eine besondere Eigenschaft hat: Die Umschläge können addiert und subtrahiert werden, ohne sie zu öffnen. Das Netzwerk addiert alle Input-Commitments, subtrahiert alle Output-Commitments und vergleicht das Ergebnis mit der einzigen deklarierten Nettozahl der Transaktion, ihrem Feld `valueBalance`. Nur eine Transaktion, deren verborgene Beträge tatsächlich zu diesem öffentlichen `valueBalance` passen, kann eine gültige Bindungssignatur über die kombinierten Commitments erzeugen. Würde jemand versuchen, mehr Wert zu bewegen, als angegeben wurde, würden die Commitments nicht aufgehen, die Bindungssignatur würde sich nicht verifizieren lassen und die Transaktion würde abgelehnt. Ironwood verwendet dasselbe Orchard-Protokoll, daher funktioniert es auf dieselbe Weise.

Das ist auch der Grund, warum eine poolübergreifende Übertragung sicher geprüft werden kann. Wenn Gelder von einem abgeschirmten Pool in einen anderen bewegt werden, zum Beispiel von Orchard nach Ironwood, kann die Transaktion die Beträge nicht vor der Buchhaltung verbergen. Jeder Pool hat seinen eigenen Wertsaldo, der durch seine eigenen Beweise erfüllt werden muss: Die Orchard-Seite muss einen passenden Abfluss durch ihre Bindungssignatur zeigen, und die Ironwood-Seite muss den entsprechenden Zufluss durch ihre eigene zeigen. Der Wert, der einen Pool verlässt, und der Wert, der in den anderen hineingeht, werden jeweils unabhängig bewiesen, daher ist eine poolübergreifende Bewegung in Wirklichkeit ein doppeltes Passieren des Drehkreuzes innerhalb einer Transaktion, einmal hinaus, einmal hinein, und beides wird öffentlich mitgezählt, obwohl die zugrunde liegenden Beträge privat bleiben.

Das Drehkreuz beruht also nicht auf Vertrauen. Jede Transaktion beweist mathematisch ihre eigene Nettowirkung, das Netzwerk summiert diese bewiesenen Nettowirkungen pro Pool, und eine Konsensregel (ZIP 209) lehnt jeden Block ab, der den Saldo eines Pools negativ machen würde. Beweis auf Transaktionsebene, Durchsetzung auf Chain-Ebene.

<br/>

## Warum es wichtig ist

Das Drehkreuz gibt Zcash drei Dinge gleichzeitig.

Erstens begrenzt es Risiken auf einen abgegrenzten Bereich. Ein kryptographischer Bug in einem Pool bleibt auf diesen Pool beschränkt, weil das Drehkreuz verhindert, dass gefälschter Wert in den weiteren Bestand übergeht.

Zweitens ermöglicht es der Community, den Bestand rückblickend zu verifizieren. Wenn später ein Bug entdeckt wird, zeigt der Drehkreuz-Datensatz, ob jemals mehr Wert einen Pool verlassen hat, als in ihn hineingegangen ist. Ein sauberer Datensatz ist ein starkes Indiz dafür, dass keine Fälschung ausgenutzt wurde.

Drittens bewahrt es die Privatsphäre und leistet all dies zugleich. Nur Summen auf Pool-Ebene sind öffentlich. Deine individuellen Transaktionen bleiben abgeschirmt. Prüfbarkeit und Privatsphäre bestehen nebeneinander, was ungewöhnlich ist und eine von Zcashs stillen Stärken darstellt.

<br/>

## Das Drehkreuz in Aktion

Das Drehkreuz ist nicht neu, und es wurde in wichtigen Momenten der Geschichte von Zcash eingesetzt.

Als Zcash vom ursprünglichen Sprout-Pool in Richtung des neueren Sapling-Pools wechselte, schützte das Drehkreuz diesen Übergang. Der Sprout-Pool wurde später so eingeschränkt, dass er keine neuen Zuflüsse mehr empfangen konnte, was Nutzer zur Migration ermutigte, während das Drehkreuz die Buchhaltung korrekt hielt. Jahre später gilt die Tatsache, dass nie unzulässigerweise Wert aus Sprout herauskam, als Hinweis darauf, dass seine frühe Kryptographie nie erfolgreich ausgenutzt wurde.

Dasselbe Design schützt jetzt den Wechsel von Orchard zu Ironwood. Im Jahr 2026 wurde ein Soundness-Bug im Orchard-Proving-System gefunden und behoben. Es gibt keine Hinweise darauf, dass er jemals ausgenutzt wurde, aber weil abgeschirmte Aktivität privat ist, war Gewissheit unmöglich. Die Reaktion besteht darin, den alten Orchard-Pool zu versiegeln und alle ihre Gelder durch das Drehkreuz in Ironwood migrieren zu lassen, einen frischen Pool mit dem korrigierten Protokoll. Gelder durch das Drehkreuz zu zwingen bedeutet, dass eventuell hypothetische gefälschte Coins, die zurückbleiben, nicht folgen können, und sobald die Migration abgeschlossen ist, kann jeder bestätigen, dass der abgeschirmte Bestand korrekt ist.

<br/>

## Stilllegung eines Einweg-Pools

Das Drehkreuz macht es möglich, einen alten Pool sicher stillzulegen, und zwar nur in eine Richtung, ohne jemals die Bestands-Garantie zu brechen. Der Trick besteht darin, den Eingang zu schließen, während der Ausgang offen bleibt.

Sprout ist das klarste Beispiel. Um ihn stillzulegen, führte ZIP 211 eine einzelne Konsensregel ein: Ab seiner Aktivierungshöhe muss das Feld `vpub_old` jedes JoinSplit null sein. Da `vpub_old` die einzige Möglichkeit ist, wie Wert in Sprout hineingehen kann, bedeutet seine Erzwingung auf null, dass nie wieder neuer Wert hineingehen kann, während Wert weiterhin zur transparenten Seite oder weiter nach Sapling hinausfließen kann. Der Pool wurde zu einem Einweg-Pool. Er kann nur geleert, niemals wieder aufgefüllt werden. Das Drehkreuz zählt die ganze Zeit weiter, sodass der Saldo sinken kann, wenn Gelder den Pool verlassen, aber niemals steigen kann, und er kann niemals negativ werden.

Die Migration von Orchard nach Ironwood verwendet dieselbe Idee. Beim Upgrade NU6.3 wird der Orchard-Pool für neue Zuflüsse geschlossen, und Wallets werden angewiesen, Orchard-Gelder durch das Drehkreuz in den neuen Ironwood-Pool zu senden. Orchard wird zu einem Einweg-Pool, der sich nur noch leeren kann. Weil jeder Ausgang ein Passieren des Drehkreuzes ist, das bewiesen werden muss, kann eventuell hypothetischer gefälschter Wert, der in Orchard zurückbleibt, den ehrlichen Geldern nicht unbemerkt nach draußen folgen. Er steckt in einem Pool fest, der sich nur leert und an dessen Tür mitgezählt wird. Mit der Zeit treibt das den alten Pool gegen leer und erlaubt jedem zu bestätigen, dass der Wert, der herauskam, nie größer war als der Wert, der ehrlich hineinging.

Das ist der tiefere Grund, warum das Drehkreuz über einfache Buchhaltung hinaus wichtig ist. Es ist der Mechanismus, der es Zcash erlaubt, einen abgeschirmten Pool stillzulegen, sei es zur Verringerung der Komplexität wie bei Sprout oder zur Erholung von einem entdeckten Bug wie bei Orchard, und dabei eine durchgehende, öffentliche, beweisbare Garantie über den Bestand aufrechtzuerhalten.

<br/>

## Häufige Missverständnisse

- Das Drehkreuz legt deine Transaktionen nicht offen. Es zählt nur Pool-Gesamtsummen, nicht wer wem was gesendet hat
- Es identifiziert keinen Fälscher namentlich. Es begrenzt, wie viel einen Pool verlassen kann, und genau das schützt den Bestand
- Es ist keine neue Erfindung für Ironwood. Es hat jeden großen Übergang zwischen abgeschirmten Pools in der Geschichte von Zcash geschützt
- Eine öffentliche Pool-Gesamtsumme schwächt die Privatsphäre nicht. Die Privatsphäre steckt in den Transaktionen innerhalb des Pools, die verborgen bleiben

<br/>

## Ressourcen

1. [ZIP 209: Verbot von außerhalb des zulässigen Bereichs liegenden Chain-Wertpool-Salden](https://zips.z.cash/zip-0209) - die Konsensregel hinter dem Drehkreuz
2. [ZIP 211: Deaktivierung der Hinzufügung neuen Werts zum Sprout-Chain-Wertpool](https://zips.z.cash/zip-0211) - wie der Sprout-Pool für neue Einzahlungen geschlossen wurde
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - das Upgrade, das den Ironwood-Pool einführt und Wert über das Drehkreuz lenkt
4. [Durchsetzung des Drehkreuzes gegen Fälschung](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - die ursprüngliche Erklärung von Electric Coin Company
5. [Zcash-Protokollspezifikation](https://zips.z.cash/protocol/protocol.pdf) - siehe die Abschnitte zu Saldo und Bindungssignatur für die vollständigen Details
6. [Wertpools, das Zebra-Buch](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - wie ein Knoten den Wertsaldo jedes Pools verfolgt

<br/>

## Verwandte Seiten

- [Abgeschirmte Pools](https://zechub.wiki/using-zcash/shielded-pools) - wie abgeschirmte Zcash-Transaktionen Details privat halten
- [Halo](https://zechub.wiki/zcash-tech/halo) - das Beweissystem hinter dem Orchard-Pool
- [Netzwerk-Upgrades](https://zechub.wiki/start-here/network-upgrades) - wie Zcash Änderungen wie neue abgeschirmte Pools aktiviert
