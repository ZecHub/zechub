<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Projekt Tachyon

## TL;DR

- Tachyon ist ein vorgeschlagenes Redesign der Art und Weise, wie Zcash-Wallets abgeschirmte Mittel finden und ausgeben, damit das Netzwerk auf sehr große Nutzerzahlen wachsen kann
- Heute muss eine Wallet einen großen Teil der blockchain zu entschlüsseln versuchen, um herauszufinden, welche Zahlungen ihr gehören, und das ist der Hauptgrund, warum das Synchronisieren abgeschirmter Wallets langsam wirkt
- Tachyon ersetzt dies durch **oblivious synchronization**, sodass eine Wallet abruft, was sie braucht, ohne alles zu scannen und ohne einem Server mitzuteilen, welche Teile sie haben wollte
- Außerdem verlagert es Zahlungsdetails aus der blockchain in die Zahlungsanfrage selbst, was das Protokoll vereinfacht, aber die Verantwortung auf Wallets verlagert
- Es ist ein Vorschlag, der erstmals im April 2025 veröffentlicht und als Kandidat für NU7 benannt wurde. Er ist **nicht veröffentlicht**, und er erfordert einen Entwicklungsaufwand in der Größenordnung des Sapling-Upgrades

<br/>

## Für wen ist das

- Für alle, die einer abgeschirmten Wallet beim Synchronisieren zugesehen und sich gefragt haben, warum es so lange dauert
- Für Neueinsteiger, die Tachyon immer wieder zusammen mit NU7 und der Skalierung von Zcash erwähnt sehen
- Für Leser, die zuerst die Idee und danach die Kryptographie verstehen möchten

<br/>

## Das Problem, das Tachyon löst

Zcash verbirgt, für wen eine Zahlung bestimmt ist. Genau darum geht es, und dadurch entsteht ein schwieriges Problem: Wenn niemand erkennen kann, wem eine Zahlung gehört, wie findet dann deine eigene Wallet deine Zahlungen?

Bei Bitcoin ist das einfach. Adressen sind öffentlich, also kann eine Wallet einen Server fragen: „Was wurde an diese Adresse gesendet?“ und eine Antwort erhalten. Eine Zcash-Wallet kann diese Frage nicht stellen, denn sie würde genau das offenlegen, was der abgeschirmte Pool verbergen soll.

Zcash macht daher etwas anderes. Der Absender verschlüsselt die Zahlungsdetails und bettet sie in die Transaktion selbst ein. Deine Wallet arbeitet dann die Transaktionen auf der chain durch und versucht, jede einzelne zu entschlüsseln. Fast jeder Versuch schlägt fehl. Die wenigen erfolgreichen Versuche sind deine Zahlungen. Das wird **Probeentschlüsselung** genannt und ist privat, korrekt und langsam.

![Heute lädt eine Zcash-Wallet jede abgeschirmte Transaktion herunter und versucht, jede einzelne zu entschlüsseln, wobei fast jeder Versuch fehlschlägt, um die wenigen ihr gehörenden Zahlungen zu finden](/content-images/tachyon-scanning-today.svg)

Der Haken liegt darin, wovon dieser Aufwand abhängt. Der Aufwand deiner Wallet richtet sich nach der Größe der chain, nicht danach, wie viele Zahlungen du tatsächlich erhalten hast. Jemand, der nie eine einzige Zahlung erhalten hat, leistet fast genauso viel Arbeit wie jemand, der täglich Zahlungen erhält. Mit dem Wachstum von Zcash wird das für alle schlimmer. Mit den Worten des Vorschlags: Es „skaliert schlicht nicht“.

<br/>

## Was Tachyon verändert

Tachyon geht das Problem an der Wurzel an: Es verwendet die blockchain nicht länger als Übertragungskanal für Zahlungsgeheimnisse.

Stattdessen reisen die Details, die du benötigst, außerhalb der chain mit der Zahlungsanfrage selbst. Eine Zahlungsanfrage, eine URI oder ein QR-Code enthält die Informationen, die zuvor in die Transaktion verschlüsselt wurden. Sean Bowe beschreibt dies als die erstmalige Einführung von **Out-of-Band-Zahlungen** in einem abgeschirmten Zcash-Protokoll.

Sobald die chain diese Informationen nicht mehr enthält, hat deine Wallet keinen Grund mehr, sie zu durchsuchen, und das Problem der Probeentschlüsselung verschwindet.

Deine Wallet muss jedoch weiterhin den aktuellen Zustand der chain kennen, um Mittel ausgeben zu können. Das ist die zweite Hälfte des Designs, **oblivious synchronization**: eine Möglichkeit für eine Wallet, die konkreten Dinge abzurufen, die sie benötigt, ohne dem Server offenzulegen, welche Dinge sie angefragt hat.

![Mit Tachyon übermittelt der Absender Zahlungsdetails außerhalb der chain an den Empfänger, und die Wallet verwendet oblivious synchronization, um nur die benötigten Daten abzurufen, statt die gesamte chain zu scannen](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Was das für Wallet-Nutzer bedeuten würde

- **Das Synchronisieren wächst nicht länger mit der chain.** Die Zeit, die deine Wallet zum Aufholen benötigt, würde sich nach deiner eigenen Aktivität statt nach der Größe von Zcash richten.
- **Zahlungen werden eher wie das Überreichen einer Rechnung.** Die Zahlungsanfrage enthält, was der Empfänger benötigt; daher ist der Austausch zwischen Absender und Empfänger wichtiger als heute.
- **Wallets tragen mehr Verantwortung.** Da die chain keine verschlüsselte Kopie deiner Zahlungsdetails mehr enthält, ist der Verlust deiner Wallet-Daten folgenreicher. Sicherung und Wiederherstellung werden von einem Protokollmerkmal zu etwas, das Wallet-Software richtig umsetzen muss.
- **Einige vertraute Elemente werden verlagert oder verschwinden.** Tachyon nimmt Schlüsseldiversifizierung, Viewing Keys und Zahlungsadressen aus dem Kernprotokoll heraus und überlässt sie der Wallet-Schicht. Dies ist einer der folgenreicheren Teile des Vorschlags und wird noch ausgearbeitet.

<br/>

## Ein genauerer Blick für technisch versierte Leser

Tachyon wird als rückwärtskompatible Änderung des Orchard-Protokolls beschrieben. Es könnte entweder als Upgrade des bestehenden Orchard-Pools oder als separater abgeschirmter Pool eingesetzt werden, der über eine [Schleuse](https://zechub.wiki/zcash-tech/the-turnstile) erreicht wird – denselben Mechanismus, den Zcash für Ironwood verwendet hat. Die Entscheidung beeinflusst die Bereitstellung, nicht das Design.

Es behält mehrere Dinge aus Orchard bei: RedPallas-Schlüssel-Neurandomisierung, homomorphe Wert-Commitments und Bindungssignaturen sowie die partitionierte Schlüsselstruktur, durch die ein Gerät die Erstellung von Beweisen delegieren kann, ohne Ausgabeberechtigung zu übergeben.

Die Skalierungsarbeit stützt sich auf **beweistragende Daten**, eine Technik, bei der Daten zusammen mit einem Beweis ihrer eigenen Korrektheit übertragen werden, sodass ihre Kombination mit anderen beweistragenden Daten etwas hervorbringt, das diese Beweise übernimmt und erweitert. Dadurch kann eine große Menge verifizierter Arbeit zu etwas Kleinem und schnell Überprüfbarem komprimiert werden. Halo, das vom Team hinter Zcash entdeckt wurde, machte beweistragende Daten praktisch genug, um darauf aufzubauen.

Der dritte Strang sind **Aggregate abgeschirmter Transaktionen**, die verändern, wie Änderungen des abgeschirmten Zustands kommuniziert werden, und Folgewirkungen darauf haben, wie Signierung funktioniert.

<br/>

## Stand der Arbeiten

Tachyon ist ein **Vorschlag, keine veröffentlichte Funktion**. Er wurde im April 2025 veröffentlicht, und ein Folgebeitrag im Mai 2025 behandelte die Auswirkungen auf den Konsens. Es wird als Kandidat für NU7, das nächste große Upgrade nach Ironwood, genannt, aber über die Inhalte von NU7 entscheiden die Coinholder per Abstimmung, und bei Tachyon ist nichts beschlossen.

Die eigene Einordnung des Autors ist, dass es sich um einen umsetzbaren Plan und nicht um spekulative Forschung handelt, der jedoch einen mit Sapling vergleichbaren Entwicklungsaufwand benötigt und einige schwierigere Fragen bewusst für später offenlässt.

Verwandte Arbeiten sind bereits sichtbar. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), ein im Juli 2026 veröffentlichter Full Knoten, ist eine gemeinsame Anstrengung von Project Tachyon und der Valar Group und gibt einen Vorgeschmack auf einige dieser Änderungen auf Netzwerkebene. Forschung zu [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) zielt aus einem anderen Blickwinkel auf denselben Engpass beim Scannen ab.

<br/>

## Häufige Missverständnisse

- **Tachyon ist nicht live.** Keine Wallet verwendet es heute, und kein Upgrade hat es aktiviert.
- **Tachyon ist nicht dasselbe wie Ironwood.** Ironwood wurde im Juli 2026 aktiviert und behandelte den Orchard-Pool und die Schleuse. Tachyon ist ein separater, späterer Vorschlag zur Skalierung.
- **Tachyon reduziert nicht die Privatsphäre.** Das Ziel ist, die Ununterscheidbarkeit des Ledgers zu erhalten und gleichzeitig die Skalierungskosten zu beseitigen, nicht Privatsphäre gegen Geschwindigkeit einzutauschen.
- **Die Verifizierung von zk-SNARKs war nie der Engpass.** Der Vorschlag stellt klar, dass der langsame Teil darin besteht, wie Wallets Zustand entdecken und koordinieren, nicht in den Kosten für die Überprüfung von Beweisen.
- **„Für NU7 vorgesehen“ ist keine Verpflichtung.** Was in NU7 aufgenommen wird, entscheidet eine Abstimmung.

<br/>

## Glossar

| Begriff | Bedeutung |
|---|---|
| Probeentschlüsselung | Der Versuch, Transaktionen einzeln zu entschlüsseln, um die an dich gerichteten zu finden |
| In-Band-Verteilung von Geheimnissen | Das Zahlungsgeheimnis innerhalb der Transaktion auf der blockchain zu platzieren, wie Zcash es heute tut |
| Out-of-Band-Zahlung | Die Zahlungsdetails direkt zwischen Absender und Empfänger zu übermitteln, statt über die chain |
| Oblivious synchronization | Die chain-Daten abzurufen, die eine Wallet benötigt, ohne offenzulegen, welche Daten angefordert wurden |
| Beweistragende Daten (PCD) | Daten, die mit einem Beweis ihrer eigenen Korrektheit übertragen werden, sodass Beweise kombiniert und komprimiert werden können |
| Aggregat abgeschirmter Transaktionen | Tacyons Methode, Änderungen des abgeschirmten Zustands zu bündeln, wodurch sich ihre Kommunikation und Signierung verändern |
| Ledger-Ununterscheidbarkeit | Die Eigenschaft, dass abgeschirmte Transaktionen nicht voneinander unterschieden werden können |

<br/>

## FAQ

**Wird meine Wallet dadurch schneller synchronisieren?** Das ist das Ziel. Die Synchronisierungszeit würde deiner eigenen Aktivität folgen statt der Größe der chain. Es wurde noch nichts veröffentlicht, daher gibt es noch keine messbare Zahl.

**Muss ich jetzt etwas tun?** Nein. Tachyon ist ein Vorschlag. Falls es übernommen wird, würde es mit der üblichen Vorankündigung über ein Netzwerk-Upgrade eingeführt.

**Bedeutet das Entfernen von Viewing Keys, dass die Möglichkeit zum Teilen von Lesezugriff verloren geht?** Der Vorschlag verlagert diese Fähigkeit aus dem Kernprotokoll in die Wallet-Schicht. Wie das in der Praxis aussehen wird, ist eine der offenen Fragen.

**Ist mein Geld gefährdet, falls Tachyon veröffentlicht wird?** Die Bereitstellung würde entweder ein Orchard-Upgrade oder eine Schleuse verwenden, die beide so konzipiert sind, dass Werte nach öffentlichen Buchhaltungsregeln bewegt werden. Die Ironwood-Seite erklärt, wie eine Schleuse funktioniert.

<br/>

## Verwandte Seiten

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - ein weiterer Ansatz für denselben Engpass beim Wallet-Scannen
- [Zakura Knoten](https://zechub.wiki/zcash-tech/zakura-node) - ein Knoten, der teilweise aus Tacyons Entwicklungsaufwand entstanden ist
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - das im Juli 2026 aktivierte Upgrade, das oft mit Tachyon verwechselt wird
- [Die Schleuse](https://zechub.wiki/zcash-tech/the-turnstile) - der Mechanismus, den Tachyon verwenden könnte, falls es als eigener Pool bereitgestellt wird
- [Post-Quantum-Sicherheit](https://zechub.wiki/zcash-tech/post-quantum-security) - wo Tachyon neben längerfristiger Protokollarbeit steht
- [Wie Zcash organisiert ist](https://zechub.wiki/start-here/how-zcash-is-organized) - wer diese Arbeit leistet und wie das Ökosystem zusammenpasst

<br/>

## Ressourcen

- [Tachyon: Skalierung von Zcash mit Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2. April 2025, der ursprüngliche Vorschlag
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15. Mai 2025, Auswirkungen auf Konsens und Protokoll, für Protokollentwickler geschrieben
- [Sean Bowes Blog](https://seanbowe.com/blog/) - hier wird die Tachyon-Reihe veröffentlicht
- [tachyon.z.cash](https://tachyon.z.cash/) - Projektseite
