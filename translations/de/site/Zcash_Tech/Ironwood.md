<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Ironwood

> Ironwood wird im Zcash-Mainnet bei Block 3.428.143 aktiviert, voraussichtlich um den 28. Juli 2026 UTC.

Was du mitnimmst: was Ironwood verändert, warum ein Fehler bei verborgenem Geld ernst ist und wie die Schleuse es jedem ermöglicht zu bestätigen, dass kein ZEC gefälscht wurde.

Ironwood ist ein Zcash-[Netzwerk-Upgrade](../start-here/network-upgrades), formell NU6.3, das einen neuen Shielded Pool mit demselben Namen einführt. Ein [Shielded Pool](../using-zcash/shielded-pools) ist die Gesamtheit der Gelder, deren Beträge und Eigentümer durch [Zero-Knowledge-Kryptografie](../zcash-tech/zk-snarks) verborgen bleiben. Ironwood existiert, um einen Soundness-Fehler einzugrenzen und zu prüfen, der im bestehenden Orchard Shielded Pool gefunden wurde, und um der Community eine stärkere Möglichkeit zu geben zu überprüfen, dass das Gesamtangebot von ZEC korrekt ist. Seine Konsensregeln sind in [ZIP 258](https://zips.z.cash/zip-0258) festgelegt.

Warum das wichtig ist. Bei transparentem Geld wie Bitcoin kann jeder durch Lesen des öffentlichen Ledgers prüfen, dass keine Coins gefälscht wurden. Shielded Geld verbirgt die Beträge, daher kann man nicht einfach hinschauen. Stattdessen muss die Kryptografie selbst garantieren, dass niemand heimlich Geld erschaffen kann. Ironwood ist wichtig, weil ein Fehler in genau dieser Garantie für den Orchard Pool gefunden wurde. Das Upgrade schließt diese Lücke und gibt jedem eine Möglichkeit zu bestätigen, dass das Gesamtangebot von ZEC weiterhin korrekt ist.

Neu bei Zcash? Beginne mit [Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash) und [Shielded Pools](../using-zcash/shielded-pools) und komm dann hierher zurück.

![Ironwood-Wertmigrationsfluss: Wert verlässt den Orchard Pool, passiert den Kontrollpunkt der Schleuse und tritt in den neuen Ironwood Pool ein](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Warum Ironwood nötig war

Ende Mai 2026 legte der unabhängige Sicherheitsforscher Taylor Hornby während eines Protokoll-Audits für [Shielded Labs](../zcash-organizations/shielded-labs) verantwortungsvoll einen Soundness-Fehler im Orchard Shielded Pool offen. Orchard war damals Zcashs neuester Shielded Pool, und die Schwachstelle lag in einem Teil seiner Zero-Knowledge-Schaltung, der auf elliptischen Kurven basiert und das [Halo](../zcash-tech/halo)-2-Proving-System verwendet.

1. Ein Soundness-Fehler bedeutet, dass die Mathematik, die beweist, dass eine Transaktion gültig ist, dies nicht vollständig garantiert.
2. Theoretisch hätte ein Angreifer die Schwachstelle nutzen können, um ungültigen Wert innerhalb des Orchard Pools zu fälschen und Gelder auszugeben, die ihm nicht wirklich gehörten, ohne Spuren zu hinterlassen, die ein normaler Knoten erkannt hätte.
3. Zcashs Schleuse begrenzte weiterhin, wie viel Wert Orchard überhaupt verlassen konnte, sodass das Gesamtangebot nicht aufgebläht werden konnte, aber die Kryptografie des Pools selbst garantierte nicht länger, dass jede verborgene Coin darin echt war.

![Der Fehler erklärt: Eine Transaktion führt 5 ZEC ein, aber der fehlerhafte Beweis wird trotzdem akzeptiert, wenn 7 ZEC herauskommen, wodurch 2 ZEC aus dem Nichts entstehen](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Die obigen Zahlen sind ein vereinfachtes Bild. Die tatsächliche Schwachstelle lag in einem bestimmten Teil der Mathematik der Schaltung, nicht in einer wörtlichen Zählung von Coins, die hinein- und hinausgehen. Wichtig ist nur, dass ein Soundness-Fehler es ermöglichen kann, innerhalb des Pools unbemerkt Wert zu erschaffen.

Wichtig ist, dass es keine Hinweise darauf gibt, dass der Fehler jemals ausgenutzt wurde, keine Hinweise auf Auswirkungen auf Nutzergelder und keine Hinweise darauf, dass sich das Gesamtangebot von ZEC verändert hat. Er wurde durch Sicherheitsforschung entdeckt und behoben, bevor ein bekannter Schaden entstand.

## Die Reaktion

Die Zcash-Community hat die Korrekturen stufenweise ausgeliefert, statt alles auf einmal.

![Zeitleiste der Ironwood-Reaktion: Der Orchard-Fehler wird im Mai 2026 gefunden, der Pool wird im Juni 2026 pausiert, die Schaltung wird in NU6.2 korrigiert und Ironwood wird um den 28. Juli 2026 aktiviert](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Anfang Juni 2026 deaktivierte eine vorübergehende Maßnahme den Orchard Pool, während eine vollständige Korrektur vorbereitet wurde.
2. Das Upgrade NU6.2 korrigierte die Orchard-Schaltung selbst und schloss damit die zugrunde liegende Soundness-Schwachstelle.
3. Das Upgrade NU6.3, Ironwood, führt einen neuen Shielded Pool und einen öffentlichen Kontrollpunkt ein, damit Wert unter vollständiger Prüfung aus dem alten Orchard Pool herausbewegt werden kann.

![Die Korrektur in NU6.2: Der korrigierte Beweis verlangt, dass Eingaben den Ausgaben entsprechen, sodass eine gültige Ausgabe von 5 ZEC akzeptiert wird, während ein Versuch, 7 ZEC auszugeben, abgelehnt wird](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Was der Ironwood Pool bewirkt

NU6.2 hat die Orchard-Schaltung für alle neuen Transaktionen abgesichert, aber Wert, der unter den alten Regeln geschaffen wurde, liegt weiterhin im Orchard Pool. Ironwood gibt diesem Wert ein sauberes Ziel und eine Möglichkeit, ihn während der Bewegung zu prüfen.

Der Ironwood Pool ist ein neuer Shielded-Value-Pool, der entsteht, wenn NU6.3 aktiviert wird. Er basiert auf der korrigierten Schaltung und verwendet ein quantum-recoverable Note-Format (ein Design, das die Wiederherstellung von Geldern ermöglicht, falls [Quantencomputer](../zcash-tech/post-quantum-security) eines Tages die heutige Kryptografie brechen), definiert in [ZIP 2005](https://zips.z.cash/zip-2005).

1. Nach der Aktivierung wird der alte Orchard Pool zu einem Nur-Ausgabe-Pool, sodass kein neuer Wert mehr in ihn eintreten darf.
2. Neu abgeschirmter Wert fließt stattdessen in Ironwood.
3. Shielded ZEC behält dieselben starken Datenschutzgarantien, die Sender, Empfänger und Betrag verbergen.

## Die Schleuse

Die Schlüsselidee in Ironwood ist die Schleuse, ein buchhalterischer Kontrollpunkt, den jede Coin passieren muss, wenn sie vom alten Orchard Pool nach Ironwood bewegt wird.

> Eine Schleuse tut für verborgenes Geld das, was eine Glastür für einen Banktresor tut. Man kann immer noch nicht hineinsehen, aber man kann genau zählen, was hineingeht und was herauskommt.

1. Gelder, die Orchard verlassen, werden an einem öffentlichen Verifikationspunkt gezählt, bevor sie in Ironwood eintreten.
2. Dadurch kann jeder prüfen, wie viel ZEC migriert, was das Vertrauen in das reale umlaufende Angebot stärkt.
3. Falls durch den früheren Fehler gefälschte ZEC geschaffen worden wären, würde diese Migrationsbuchhaltung genau hier sichtbar werden.

Schleusen sind für Zcash nichts Neues. Das Netzwerk hat sie bereits früher an den Grenzen zwischen den Pools Sprout, Sapling und Orchard verwendet, damit Wert, der zwischen Pools bewegt wird, prüfbar bleibt und kein Pool mehr freigeben kann, als rechtmäßig in ihn gelangt ist.

Die Konsensregeln halten jeden Value Pool, einschließlich Ironwood, innerhalb der maximalen Geldmenge des Netzwerks, sodass Pool-Salden niemals negativ werden können.

## Was Nutzer tun müssen

Wallets und Knoten-Software erledigen das meiste davon automatisch, aber die praktische Umstellung ist einfach: Bewege im Laufe der Zeit Shielded-Bestände aus dem alten Orchard Pool durch die Schleuse in den Ironwood Pool. Folge den Hinweisen deines Wallet-Anbieters und aktualisiere immer auf eine unterstützte Version, bevor der Aktivierungsblock erreicht wird.

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| Shielded Pool | Die Gesamtheit der Gelder, deren Beträge und Eigentümer durch Zero-Knowledge-Kryptografie verborgen sind |
| Soundness-Fehler | Ein Fehler, durch den eine ungültige Transaktion die Beweisprüfung besteht, als wäre sie gültig |
| Schleuse | Ein öffentlicher Kontrollpunkt, der den zwischen Pools bewegten Wert zählt, damit das Angebot prüfbar bleibt |
| Nur-Ausgabe | Ein Pool, aus dem man ausgeben kann, dem aber kein neuer Wert hinzugefügt werden kann |
| Netzwerk-Upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, aktiviert bei einer festgelegten Blockhöhe |
| Quantum-recoverable Note | Ein Note-Format, das so entworfen wurde, dass Gelder wiederhergestellt werden könnten, falls Quantencomputer eines Tages die heutige Kryptografie brechen |

## FAQ

War mein ZEC betroffen? Nein. Es gibt keine Hinweise darauf, dass der Fehler jemals verwendet wurde, keine Auswirkungen auf Nutzergelder und keine Veränderung des Gesamtangebots.

Muss ich etwas tun? Halte deine Wallet- und Knoten-Software vor dem Aktivierungsblock auf einer unterstützten Version. Deine Wallet bewegt Gelder im Laufe der Zeit nach Ironwood, während du ausgibst, daher gibt es nichts Manuelles, das du überstürzt erledigen müsstest. Folge den Hinweisen deines Wallet-Anbieters.

Ist Zcash immer noch privat? Ja. Ironwood behält denselben Shielded-Datenschutz bei, der Sender, Empfänger und Betrag verbirgt. Bei diesem Upgrade geht es um die Integrität des Angebots, nicht um Datenschutz.

Wurde der Fehler jemals ausgenutzt? Es gibt keine Hinweise darauf. Er wurde durch Sicherheitsforschung gefunden, verantwortungsvoll offengelegt und vor jedem bekannten Schaden behoben.

Was passiert mit dem alten Orchard Pool? Er wird zu einem Nur-Ausgabe-Pool. Kein neuer Wert kann in ihn eintreten, und bestehender Wert bewegt sich durch die Schleuse nach Ironwood, wo die Migration öffentlich geprüft wird.

## Teste dein Verständnis

Wenn die ZEC innerhalb von Shielded Pools verborgen sind, wie kann dann jemand bestätigen, dass der Orchard-Fehler das Gesamtangebot nicht heimlich aufgebläht hat?

<details>
<summary>Antwort</summary>

Durch die Schleuse. Jede Coin, die den alten Orchard Pool verlässt, wird an einem öffentlichen Kontrollpunkt gezählt, wenn sie nach Ironwood eintritt. Wenn mehr Wert herauszugehen versuchte, als rechtmäßig hineingelangt ist, würde die Buchhaltung nicht aufgehen, sodass jede Fälschung, die der Fehler hätte erzeugen können, an diesem Übergang sichtbar würde.
</details>

### Ressourcen

[ZIP 258: Einführung des Netzwerk-Upgrades NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Einführung der vorübergehenden Minderung der Orchard-Schwachstelle und des Netzwerk-Upgrades NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)

[Ironwood: Ein neuer Shielded Pool für Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Siehe auch

[Zcash Netzwerk-Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Post-Quantum-Sicherheit](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Netzwerk-Upgrades-Index](../start-here/network-upgrades) · Zurück: [NU6.2](../zcash-tech/nu6-2)
