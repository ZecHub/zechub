<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash-Wertepools

## Kurzfassung

- Zcash hat derzeit **5 Wertepools**: Sprout (veraltet), Sapling, Orchard (nur ausgebbar), Ironwood und Transparent.
- **Ironwood** ist der aktuelle primäre Shielded Pool und seit dem NU6.3-Upgrade am 28. Juli 2026 live.
- **Orchard** ist jetzt **nur ausgebbar**: Es kann kein neuer Wert mehr hineinfließen, und bestehende Guthaben wandern in Ironwood ab.
- **Sapling** (z-Adressen, die mit `zs` beginnen) wird weiterhin breit unterstützt und sichert nach wie vor eine erhebliche Menge an shielded ZEC.
- **Transparente** Adressen (t...) bieten keine Transaktions-Privatsphäre und funktionieren ähnlich wie Bitcoin.
- **Sprout** ist ein veralteter Shielded Pool, der aus der aktiven Nutzung genommen wurde.
- Die Migration von Orchard zu Ironwood ist **im Gange** und wird öffentlich durch die Turnstile geprüft.
- Für die stärksten Privatsphäre-Garantien sollten Nutzer nach Möglichkeit weiterhin **shielded-zu-shielded (z → z)**-Transaktionen bevorzugen.


<br/>

## Zcash-Wertepools verstehen

Zcash trennt Guthaben in verschiedene Abrechnungssysteme, die als Wertepools bezeichnet werden. Jeder Pool hat seine eigenen kryptografischen Regeln und Privatsphäre-Eigenschaften, während das Protokoll den Gesamtwert verfolgt, der zwischen ihnen bewegt wird.

Heute enthält das Netzwerk fünf primäre Wertepools:

- Transparent — Öffentlich und vollständig on-chain sichtbar.
- Sapling — Der erste breit angenommene moderne Shielded Pool, weiterhin aktiv.
- Orchard — Der bisherige primäre Shielded Pool, jetzt nur ausgebbar.
- Ironwood — Der aktuelle primäre Shielded Pool, eingeführt mit NU6.3.
- Sprout — Der ursprüngliche Shielded Pool, der 2016 mit Zcash eingeführt wurde.
  


Während sich Zcash weiterentwickelt, können neue Shielded Pools eingeführt werden, um Sicherheit, Privatsphäre, Benutzerfreundlichkeit und Prüfbarkeit zu verbessern und gleichzeitig die Kompatibilität mit bestehenden Guthaben zu erhalten.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Abb. 1: Ein Diagramm, das die aktuellen 4 Pools im Oktober 2025 zeigt

<br/>

## Die Shielded Pools 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood ist der aktuelle primäre Shielded Pool. Er wurde am 28. Juli 2026 bei Block 3.428.143 als Teil des Netzwerk-Upgrades NU6.3 aktiviert und ist der Ort, an dem sich neuer shielded Wert jetzt befindet.

Er existiert, weil im Mai 2026 eine Schwachstelle im Proving-System von Orchard gefunden wurde. Es gibt keine Hinweise darauf, dass sie jemals ausgenutzt wurde, aber der Fehler bedeutete, dass die shielded Geldmenge nicht allein durch die Beweise als korrekt nachgewiesen werden konnte. Statt direkt nachzubessern, schuf das Netzwerk einen neuen Pool mit korrigiertem Schaltkreis und verschob den Wert durch eine Turnstile, die jede Coin öffentlich zählt. Genau diese Buchführung stellt die Garantie wieder her, dass die shielded Geldmenge vollständig gedeckt ist.

Ironwood verwendet das Action-Modell von Orchard und Halo 2 Proofs wieder, sodass es sich im Alltag genauso verhält. Zwei Dinge sind neu: Transaktionen verwenden das Format v6, und Ironwood-Notes sind unter [ZIP 2005](https://zips.z.cash/zip-2005) **quantum-recoverable**, was bedeutet, dass der On-Chain-Eintrag einer Coin wiederherstellbar bleibt, falls ein zukünftiger Quantencomputer die heutige Kryptografie bricht. Das ist ein Wiederherstellungspfad, keine Quantenresistenz, und er gilt nicht für ältere Pools.

Sie benötigen keine neue Adresse. Unified Addresses bündeln mehrere Receiver, und Wallets wählen für Sie den richtigen Pool aus.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Abb. 2: Ein Diagramm, das den Orchard-Pool im Oktober 2025 zeigt

<br/>

Der Orchard Shielded Pool wurde am 31. Mai 2022 als Teil des Netzwerk-Upgrades NU5 aktiviert. Orchard führte ein neues shielded Protokoll ein, das die Notwendigkeit eines Trusted Setup beseitigte und zum primären Shielded Pool wurde, der von Unified Addresses (UAs) verwendet wird.

Orchard verbesserte Benutzerfreundlichkeit, Effizienz und Privatsphäre erheblich, indem das Durchsickern von Transaktions-Metadaten reduziert und ein flexibleres Transaktionsmodell eingeführt wurde, das auf Actions statt auf traditionellen shielded Inputs und Outputs basiert.

Seit das Ironwood-Upgrade am 28. Juli 2026 aktiviert wurde, ist **Orchard nur ausgebbar**. Es kann kein neuer Wert in den Pool gelangen. Bereits dort gehaltene Guthaben können weiterhin ausgegeben werden und wandern über die Turnstile nach Ironwood ab. Wallets erledigen das für Sie, auch wenn die meisten Ihnen eine gewisse Kontrolle über das Tempo geben.

Wenn Sie Guthaben in Orchard halten, lesen Sie [Ironwood](/zcash-tech/ironwood), um zu verstehen, was die Migration in der Praxis bedeutet.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Abb. 3: Ein Diagramm, das den Sapling-Pool im Oktober 2025 zeigt

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) war ein Upgrade des Zcash-Protokolls, das am 28. Oktober 2018 eingeführt wurde. Es ist eine bedeutende Verbesserung gegenüber der früheren Version, bekannt als Sprout, die einige Einschränkungen in Bezug auf Privatsphäre, Effizienz und Benutzerfreundlichkeit hatte. 

Zu den Verbesserungen gehören eine gesteigerte Leistung für shielded Adressen, verbesserte Viewing Keys, damit Nutzer eingehende und ausgehende Transaktionen einsehen können, ohne private Nutzerschlüssel offenzulegen, sowie unabhängige Zero-Knowledge-Schlüssel für Hardware-Wallets bei der Transaktionssignatur. 

Zcash Sapling ermöglicht es Nutzern, private Transaktionen in nur wenigen Sekunden durchzuführen, verglichen mit der längeren Dauer, die dies in der Sprout-Serie benötigte. 

Das Shielding von Transaktionen verbessert die Privatsphäre, sodass es für Dritte unmöglich ist, Transaktionen zu verknüpfen und die Menge an übertragenem ZEC zu bestimmen. Sapling verbessert außerdem die Benutzerfreundlichkeit, indem die Rechenanforderungen für die Erstellung privater Transaktionen gesenkt werden und sie dadurch für Nutzer zugänglicher werden.

Sapling-Wallet-Adressen beginnen mit „zs“, und das lässt sich in allen unterstützten Zcash Shielded Wallets beobachten (YWallet, Zingo Wallet, Nighthawk usw.), die integrierte Sapling-Adressen haben. Zcash Sapling stellt einen bedeutenden technologischen Fortschritt dar, wenn es um die Privatsphäre und Effizienz von Transaktionen geht, was Zcash zu einer praktischen und effektiven Kryptowährung für Nutzer macht, die Privatsphäre und Sicherheit schätzen.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Abb. 4: Ein Diagramm, das den Sprout-Pool im Oktober 2025 zeigt

Sprout war das allererste offene, erlaubnisfreie Zero-Knowledge-Privatsphäre-Protokoll, das jemals eingeführt wurde. Es wurde am 28. Oktober 2016 gestartet.

Sprout-Adressen sind an ihren ersten beiden Buchstaben zu erkennen, die immer „zc“ sind. Es wurde „Sprout“ genannt, um vor allem zu betonen, dass die Software jung war, eine aufkeimende blockchain mit großem Wachstumspotenzial und offen für Weiterentwicklung. 

Sprout wurde als frühes Werkzeug für [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) verwendet, was zur Verteilung von ZEC und Blockbelohnungen an Miner führte. 

Als das Zcash-Ökosystem mit einer steigenden Anzahl shielded Transaktionen weiter wuchs, zeigte sich, dass die Zcash-Sprout-Serie in Bezug auf Nutzer-Privatsphäre, Skalierbarkeit von Transaktionen und Verarbeitung eingeschränkt und weniger effizient war. Dies führte zur Anpassung des Netzwerks und zum Sapling-Upgrade. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Abb. 5: Ein Diagramm, das den Transparent-Pool im Oktober 2025 zeigt

<br/>

Der transparente Zcash-Pool ist unshielded und nicht privat. Transparente Wallet-Adressen bei Zcash beginnen mit dem Buchstaben „t“; die Privatsphäre ist bei der Verwendung dieses Adresstyps für Transaktionen sehr gering.

Transparente Transaktionen in Zcash sind Bitcoin-Transaktionen ähnlich, unterstützen Multisignatur-Transaktionen und verwenden standardmäßige öffentliche Adressen.

Die transparenten Zcash-Adressen werden meist von zentralisierten Börsen genutzt, um beim Senden und Empfangen von ZEC zwischen Nutzern hohe Transparenz und Netzwerkbestätigung sicherzustellen.

Wichtig ist außerdem, dass Zcash Shielded Adressen zwar hohe Privatsphäre bei Transaktionen bieten, aber auch mehr Rechenressourcen für die Verarbeitung von Transaktionen benötigen. Daher nutzen manche Anwender möglicherweise transparente Adressen für Transaktionen, die nicht dasselbe Maß an Privatsphäre erfordern.

<br/>

## Empfohlene Praxis für Pool-Transfers

Wenn es darum geht, bei Transaktionen im Zcash-Netzwerk ein hohes Maß an Privatsphäre zu erreichen, wird empfohlen, die folgenden Praktiken zu befolgen:

Transaktionen zwischen „z zu z“-Wallets auf der Zcash-blockchain sind meist shielded und werden aufgrund des hohen erzeugten Privatsphäre-Niveaus manchmal als private Transaktionen bezeichnet. Dies ist in der Regel die beste und am meisten empfohlene Art, $ZEC zu senden und zu empfangen, wenn Privatsphäre erforderlich ist. 

---

Wenn Sie ZEC von einer „Z-address“ an eine „T-address“ senden, bedeutet dies einfach eine Form der Deshielding-Transaktion. Bei dieser Art von Transaktion ist das Privatsphäre-Niveau nicht immer hoch, da einige Informationen auf der blockchain sichtbar werden, weil ZEC an eine transparente Adresse gesendet wird. Eine Deshielding-Transaktion wird nicht immer empfohlen, wenn hohe Privatsphäre erforderlich ist. 

---

Die Übertragung von ZEC von einer transparenten Adresse (T-address) an eine Z-address wird einfach als Shielding bezeichnet. Bei dieser Art von Transaktion ist das Privatsphäre-Niveau im Vergleich zu einer z-z-Transaktion nicht immer so hoch, sie wird aber dennoch empfohlen, wenn Privatsphäre erforderlich ist. 

---

Das Senden von ZEC von einer transparenten Adresse (T-address) an eine andere transparente Adresse (T-address) im Zcash-Netzwerk (T-T-Transaktion) ist Bitcoin-Transaktionen sehr ähnlich. Deshalb werden T-T-Transaktionen bei Zcash immer als öffentliche Transaktionen bezeichnet, weil die Transaktionsdetails sowohl des Senders als auch des Empfängers öffentlich sichtbar werden, was das Privatsphäre-Niveau bei solchen Transaktionen sehr niedrig macht. 

Die meisten zentralisierten Kryptowährungsbörsen verwenden transparente Adressen („T-address“), wenn sie auf der Zcash-blockchain Transaktionen durchführen, aber diese Art von Transaktion (T-T) hat keinerlei private Eigenschaften.

<br/>

## Die Migration von Orchard zu Ironwood

Die Migration findet jetzt statt. Orchard ist für neue Einzahlungen geschlossen, und der dort noch liegende Wert wandert Transaktion für Transaktion nach Ironwood. Sie können die Summen unter [ironwood.live](https://ironwood.live/) verfolgen.

Was das bedeutet, hängt davon ab, wo sich Ihre Guthaben befinden:

1. **Neue shielded Aktivität** geht automatisch in Ironwood. Sie müssen nichts tun.
2. **Bestehende Orchard-Guthaben** müssen migriert werden. Gepflegte Wallets erledigen das für Sie, normalerweise schrittweise und nicht alles auf einmal.
3. **Sapling ist nicht betroffen** und akzeptiert weiterhin Guthaben. Nur Orchard wurde geschlossen.
4. **Die Turnstile zählt alles**, was zwischen den Pools übertragen wird, und genau das beweist, dass unterwegs keine Coin erfunden wurde.

> **Ein Hinweis zur Privatsphäre, den Sie kennen sollten.** Die Turnstile veröffentlicht den *Betrag*, der zwischen Pools übertragen wird, zusammen mit der Blockhöhe. Sender und Empfänger bleiben wie immer verborgen, aber ein auffälliger Betrag kann auf Sie zurückgeführt werden. Deshalb migrieren Wallets schrittweise mit Standardstückelungen, anstatt Ihr Guthaben in einem einzigen wiedererkennbaren Block zu verschieben. Lassen Sie Ihre Wallet ihr eigenes Tempo wählen, und erwägen Sie die Nutzung von Tor oder eines VPN, damit Ihre IP nicht mit den von Ihnen bewegten Beträgen verknüpft wird.

Siehe [Ironwood](/zcash-tech/ironwood) für das Upgrade selbst und [The Turnstile](/zcash-tech/the-turnstile) dafür, wie die Buchführung funktioniert.

<br/>

## Häufige Fehler, die vermieden werden sollten

- **Von t-address zu t-address senden** — vollständig öffentlich, keine Privatsphäre. Schirmen Sie Guthaben immer zuerst ab.
- **Annehmen, dass Orchard weiterhin Guthaben annimmt** — seit dem 28. Juli 2026 ist es nur ausgebbar. Wert kann den Pool verlassen, aber es kann nichts Neues hineingehen
- **Sapling und Unified Addresses verwechseln** — Sapling-Adressen beginnen mit `zs`. Unified Addresses beginnen mit `u1` und bündeln mehrere Receiver, daher hängt der Pool, in dem Ihre Zahlung landet, davon ab, welche Receiver diese Adresse enthält
- **Guthaben im Sprout-Pool belassen** — Sprout ist seit Jahren veraltet; verschieben Sie diese Guthaben heraus
- **Erwarten, dass eine Migration vollständig unsichtbar ist** — der Betrag, der die Turnstile durchquert, ist öffentlich, auch wenn Sender und Empfänger es nicht sind
- **Annehmen, dass t → z (Shielding) vollständig privat ist** — der Vorgang des Shielding selbst ist on-chain sichtbar; der Inhalt ist es nicht

---

## Verwandte Seiten

- [Ironwood](/zcash-tech/ironwood) — Das Upgrade, das den aktuellen Pool geschaffen hat
- [The Turnstile](/zcash-tech/the-turnstile) — Wie der zwischen Pools bewegte Wert geprüft wird
- [Wallets](/using-zcash/wallets) — Welche Wallets gepflegt werden und für Ironwood bereit sind
- [Transaktionen](/using-zcash/transactions) — Wie man shielded Transaktionen sendet
- [ZEC kaufen](/using-zcash/buying-zec) — ZEC erwerben, bevor man es in Pools verwendet
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Die kryptografische Grundlage von Shielded Pools
- [Was sind ZEC und Zcash](/start-here/what-is-zec-and-zcash) — Hintergrund zur Privatsphäre von Zcash
