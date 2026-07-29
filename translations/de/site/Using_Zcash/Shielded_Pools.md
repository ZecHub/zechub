<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Wertpools 

## TL;DR

- Zcash hat derzeit **4 Wertpools**: Sprout (veraltet), Sapling, Orchard und Transparent.
- **Orchard** ist der derzeitige primäre Shielded Pool, der von Unified Addresses (u1...) verwendet wird.
- **Sapling** (z-Adressen, die mit `zs` beginnen) wird weiterhin breit unterstützt und sichert nach wie vor eine bedeutende Menge an shielded ZEC.
- **Transparent**-Adressen (t...) bieten keine Transaktions-Privatsphäre und funktionieren ähnlich wie Bitcoin.
- **Sprout** ist ein veralteter Shielded Pool, der aus der aktiven Nutzung genommen wurde.
- Ein zukünftiger Shielded Pool namens **Ironwood** wurde vorgeschlagen, um das Vertrauen in die Integrität des shielded ZEC-Bestands zu stärken und gleichzeitig die Privatsphäre zu bewahren.
- Für die stärksten Datenschutzgarantien sollten Nutzer nach Möglichkeit weiterhin **shielded-to-shielded (z → z)**-Transaktionen bevorzugen.


<br/>

## Zcash Wertpools verstehen

Zcash trennt Gelder in unterschiedliche Buchhaltungssysteme, die als Wertpools bekannt sind. Jeder Pool hat seine eigenen kryptografischen Regeln und Privatsphäre-Eigenschaften, während das Protokoll den Gesamtwert verfolgt, der zwischen ihnen bewegt wird.

Heute enthält das Netzwerk vier primäre Wertpools:

- Transparent — Öffentlich und vollständig on-chain sichtbar.
- Sapling — Der erste breit angenommene moderne Shielded Pool.
- Orchard — Der derzeitige primäre Shielded Pool, eingeführt mit Unified Addresses.
- Sprout — Der ursprüngliche Shielded Pool, der 2016 mit Zcash gestartet wurde.
  


Während sich Zcash weiterentwickelt, können neue Shielded Pools eingeführt werden, um Sicherheit, Privatsphäre, Benutzerfreundlichkeit und Prüfbarkeit zu verbessern und gleichzeitig die Kompatibilität mit bestehenden Geldern zu erhalten.

<br/>

![Abb1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Abb. 1: Ein Diagramm, das die aktuellen 4 Pools im Oktober 2025 zeigt

<br/>

## Die Shielded Pools 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![Abb2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Abb. 2: Ein Diagramm, das den Orchard Pool im Oktober 2025 zeigt

<br/>

Der Orchard Shielded Pool wurde am 31. Mai 2022 als Teil des NU5-Netzwerk-Upgrades aktiviert. Orchard führte ein neues Shielded-Protokoll ein, das die Notwendigkeit eines Trusted Setup beseitigte, und wurde zum primären Shielded Pool, der von Unified Addresses (UAs) verwendet wird.

Orchard verbesserte Benutzerfreundlichkeit, Effizienz und Privatsphäre erheblich, indem das Austreten von Transaktionsmetadaten reduziert und ein flexibleres Transaktionsmodell eingeführt wurde, das auf Actions statt auf traditionellen shielded Inputs und Outputs basiert.

Heute bleibt Orchard der primäre Shielded Pool für Zcash. Die Community bewertet jedoch eine zukünftige Migration zu einem neuen Shielded Pool namens Ironwood, der zusätzliche Sicherheit hinsichtlich der Integrität des shielded ZEC-Bestands bieten würde, während die Privatsphäre-Garantien von Zcash erhalten bleiben.

[Zcash Shielded Wallets](/site/Using_Zcash/Wallets) unterstützen jetzt Orchard. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![Abb3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Abb. 3: Ein Diagramm, das den Sapling Pool im Oktober 2025 zeigt

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) war ein Upgrade des Zcash-Protokolls, das am 28. Oktober 2018 eingeführt wurde. Es ist eine wesentliche Verbesserung gegenüber der früheren Version namens Sprout, die einige Einschränkungen in Bezug auf Privatsphäre, Effizienz und Benutzerfreundlichkeit hatte. 

Zu den Verbesserungen gehören eine bessere Leistung für shielded Adressen, verbesserte Viewing Keys, damit Nutzer eingehende und ausgehende Transaktionen einsehen können, ohne private Nutzerschlüssel offenzulegen, sowie unabhängige Zero-Knowledge-Schlüssel für Hardware-Wallets bei der Transaktionssignatur. 

Zcash Sapling ermöglicht es Nutzern, private Transaktionen in nur wenigen Sekunden durchzuführen, verglichen mit der längeren Dauer, die dies in der Sprout-Serie erforderte. 

Transaction Shielding verbessert die Privatsphäre und macht es für Dritte unmöglich, Transaktionen zu verknüpfen und die Menge an übertragenem ZEC zu bestimmen. Sapling verbessert außerdem die Benutzerfreundlichkeit, indem die Rechenanforderungen zur Erstellung privater Transaktionen gesenkt werden und dies für Nutzer zugänglicher wird.

Sapling-Wallet-Adressen beginnen mit "zs", und das lässt sich in allen unterstützten Zcash Shielded Wallets beobachten (YWallet, Zingo Wallet, Nighthawk usw.), die integrierte Sapling-Adressen haben. Zcash Sapling stellt eine bedeutende technologische Entwicklung in Bezug auf Privatsphäre und Transaktionseffizienz dar, was Zcash zu einer praktischen und effektiven Kryptowährung für Nutzer macht, die Privatsphäre und Sicherheit schätzen.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![Abb4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Abb. 4: Ein Diagramm, das den Sprout Pool im Oktober 2025 zeigt

Sprout war das erste überhaupt gestartete offene, erlaubnisfreie Zero-Knowledge-Privacy-Protokoll. Es wurde am 28. Oktober 2016 gestartet.

Sprout-Adressen sind an ihren ersten beiden Buchstaben erkennbar, die immer "zc" sind. Es wurde "Sprout" genannt, um vor allem zu betonen, dass die Software jung war, eine aufkeimende Blockchain mit großem Wachstumspotenzial und offen für Weiterentwicklung. 

Sprout wurde als frühes Werkzeug für [Zcash Slow Start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) verwendet, was zur Verteilung von ZEC und Block Rewards für Miner beitrug. 

Als das Zcash-Ökosystem mit einer steigenden Zahl shielded Transaktionen weiter wuchs, zeigte sich, dass die Zcash Sprout-Serie in Bezug auf Nutzerprivatsphäre, Transaktionsskalierbarkeit und Verarbeitung begrenzt und weniger effizient wurde. Dies führte zur Anpassung des Netzwerks und zum Sapling-Upgrade. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![Abb5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Abb. 5: Ein Diagramm, das den Transparent Pool im Oktober 2025 zeigt

<br/>

Der Zcash Transparent Pool ist unshielded und nicht privat. Transparente Wallet-Adressen in Zcash beginnen mit dem Buchstaben "t"; die Privatsphäre ist bei der Nutzung dieses Adresstyps für Transaktionen sehr gering.

Transparente Transaktionen in Zcash ähneln Bitcoin-Transaktionen, unterstützen Multi-Signature-Transaktionen und verwenden standardmäßige öffentliche Adressen.

Die Zcash Transparent-Adressen werden meist von zentralisierten Börsen verwendet, um eine hohe Transparenz und Netzwerkbestätigung beim Senden und Empfangen von ZEC zwischen Nutzern sicherzustellen.

Es ist auch wichtig zu beachten, dass Zcash Shielded-Adressen zwar eine hohe Privatsphäre bei Transaktionen bieten, aber auch mehr Rechenressourcen für die Verarbeitung von Transaktionen benötigen. Daher können sich einige Nutzer für transparente Adressen bei Transaktionen entscheiden, die nicht dasselbe Maß an Privatsphäre erfordern.

<br/>

## Empfohlene Praxis für Pool-Transfers

Wenn es darum geht, ein hohes Maß an Privatsphäre bei Transaktionen im Zcash-Netzwerk zu erreichen, wird empfohlen, die folgenden Praktiken zu befolgen;

Transaktionen zwischen "z zu z"-Wallets auf der Zcash-Blockchain sind größtenteils shielded und werden aufgrund des hohen erzeugten Datenschutzniveaus manchmal als private Transaktionen bezeichnet. Dies ist in der Regel die beste und am meisten empfohlene Art, $ZEC zu senden und zu empfangen, wenn Privatsphäre erforderlich ist. 

---

Wenn Sie ZEC von einer "Z-address" an eine "T-address" senden, bedeutet das einfach eine Form der Deshielding-Transaktion. Bei dieser Art von Transaktion ist das Datenschutzniveau nicht immer hoch, da einige Informationen auf der Blockchain sichtbar sein werden, was auf das Senden von ZEC an eine Transparent Address zurückzuführen ist. Eine Deshielding-Transaktion wird nicht immer empfohlen, wenn hohe Privatsphäre erforderlich ist. 

---

Die Übertragung von ZEC von einer Transparent Address (T-address) an eine Z-address ist einfach als Shielding bekannt. Bei dieser Art von Transaktion ist das Datenschutzniveau im Vergleich zu einer z-z-Transaktion nicht immer so hoch, sie wird aber dennoch empfohlen, wenn Privatsphäre erforderlich ist. 

---

Das Senden von ZEC von einer Transparent Address (T-address) an eine andere Transparent Address (T-address) im Zcash-Netzwerk (T-T-Transaktion) ist einer Bitcoin-Transaktion sehr ähnlich, und deshalb werden T-T-Transaktionen auf Zcash immer als öffentliche Transaktionen bezeichnet, weil die Transaktionsdetails sowohl des Senders als auch des Empfängers für die Öffentlichkeit sichtbar werden, was das Maß an Privatsphäre bei einer solchen Transaktion sehr gering macht. 

Die meisten zentralisierten Kryptowährungsbörsen verwenden beim Transagieren auf der Zcash-Blockchain Transparent Addresses ("T-address"), aber diese Art von Transaktion (T-T) hat keine privaten Eigenschaften.

<br/>

## Die Zukunft: Ironwood Pool

Die Zcash-Community bewertet derzeit einen vorgeschlagenen Shielded Pool namens Ironwood.

Ironwood wurde entwickelt, um eine kürzlich entdeckte und gepatchte Schwachstelle im Proving-System von Orchard zu adressieren. Obwohl es keine Hinweise darauf gibt, dass die Schwachstelle jemals ausgenutzt wurde, würde Ironwood eine zusätzliche Sicherheitsebene bieten, indem eine kontrollierte Migration von Orchard in einen neu geschaffenen Shielded Pool ermöglicht wird.

Das Ziel ist nicht, die Privatsphäre von Zcash zu ersetzen, sondern das Vertrauen in die Integrität des shielded ZEC-Bestands zu stärken.

## Im Vorschlag:

1. Neue shielded Aktivität würde schrittweise nach Ironwood verlagert.
2. Bestehende Orchard-Gelder könnten privat migriert werden.
3. Öffentliche Turnstile-Buchhaltung würde stärkere Belege dafür liefern, dass alle shielded Gelder weiterhin vollständig gedeckt sind.
4. Nutzer würden denselben Schutz der Privatsphäre behalten, den sie von Zcash erwarten.

<br/>
Wenn Ironwood durch zukünftige Netzwerk-Upgrades aktiviert wird, würde es zur nächsten Generation des shielded Ökosystems von Zcash werden und gleichzeitig die Kompatibilität mit bestehenden shielded Geldern bewahren.

<br/>

## Häufige Fehler, die vermieden werden sollten

- **Senden von t-address zu t-address** — vollständig öffentlich, keine Privatsphäre. Gelder immer zuerst shielden.
- **Sapling- und Orchard-Adressen verwechseln** — Sapling-Adressen beginnen mit `zs`, Orchard-/Unified-Adressen beginnen mit `u1`
- **Gelder im Sprout Pool belassen** — Sprout ist veraltet; Gelder nach Orchard migrieren
- **Annehmen, dass t → z (Shielding) vollständig privat ist** — der Vorgang des Shielding selbst ist on-chain sichtbar; der Inhalt ist es nicht

---

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) — Welche Wallets Orchard- und Sapling-Pools unterstützen
- [Transaktionen](/using-zcash/transactions) — Wie man shielded Transaktionen sendet
- [ZEC kaufen](/using-zcash/buying-zec) — ZEC erwerben, bevor es in Pools verwendet wird
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Die kryptografische Grundlage von shielded Pools
- [Was sind ZEC und Zcash](/start-here/what-is-zec-and-zcash) — Hintergrund zu Zcash-Privatsphäre
