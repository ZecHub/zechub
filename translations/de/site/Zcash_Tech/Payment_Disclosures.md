<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Abgeschirmte Zahlungsnachweise und Zahlungsfreigaben

## TL;DR

- Eine Transaktions-ID identifiziert eine Transaktion, verrät jedoch keinen abgeschirmten Empfänger, Betrag oder Memo.
- Eine Zahlungsfreigabe ermöglicht es dem Absender, ausgewählte Details einer Zahlung nachzuweisen, ohne den Rest seines Wallet-Verlaufs offenzulegen.
- Ein Viewing Key gewährt fortlaufenden Lesezugriff auf eine Adresse oder ein Konto. Verwende ihn für laufende Prüfungen, nicht für einen Streitfall zu einer einzelnen Zahlung.
- Eine Zahlungsfreigabe kann weder die Lieferung von Waren nachweisen, noch allein eine Person identifizieren, eine Zahlung rückgängig machen oder Bestätigungsprüfungen ersetzen.
- [ZIP 311](https://zips.z.cash/zip-0311) ist weiterhin ein **Entwurf**. Der aktuelle Text lässt Unterstützung für Orchard, Unterstützung für transparente Eingaben, Kodierung, Versionierung und Regeln für Benutzeroberflächen offen.

## Warum eine Transaktions-ID nicht ausreicht

Jeder kann die öffentlichen Details einer transparenten Zcash-Zahlung einsehen. Ein Block Explorer kann ihre Adressen, Beträge und ihren Bestätigungsstatus anzeigen.

Eine abgeschirmte Zahlung funktioniert anders. Die Chain beweist, dass die Transaktion die Regeln von Zcash befolgt hat, veröffentlicht jedoch weder abgeschirmten Absender, Empfänger, Betrag noch Memo. Das Teilen der Transaktions-ID kann zeigen, dass eine Transaktion gemint wurde, aber nicht einem Händler oder Dritten nachweisen, welche private Zahlung darin enthalten war.

Dadurch entsteht ein praktisches Problem. Ein Kunde muss möglicherweise einen Streitfall mit einem Händler klären, eine Börse muss möglicherweise nachweisen, dass sie eine Auszahlung verarbeitet hat, oder ein Spender möchte einen einzelnen Beitrag nachweisen. Das Teilen eines vollständigen Viewing Key würde weit mehr offenlegen, als irgendeiner dieser Fälle erfordert.

[ZIP 311: Zcash Zahlungsfreigaben](https://zips.z.cash/zip-0311) schlägt eine enger gefasste Lösung vor: ausgewählte Informationen aus einer Transaktion offenlegen und authentifizieren.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Wie eine Zahlungsfreigabe funktioniert

Der grundlegende Ablauf ist:

1. Der Prüfer gibt dem Absender eine eindeutige Challenge oder Referenz, wenn ein interaktiver Nachweis angebracht ist.
2. Der Absender wählt die Transaktion und den oder die offenzulegenden abgeschirmten Outputs aus.
3. Kompatible Wallet-Software erstellt eine Zahlungsfreigabe, die an diese Transaktion und optional an die Challenge gebunden ist.
4. Der Absender übergibt die Freigabe dem Prüfer.
5. Der Prüfer ruft die tatsächliche Transaktion von einem vertrauenswürdigen Zcash-Knoten ab, prüft, dass sie gemint wurde, und verifiziert die Freigabe dagegen.
6. Ein gültiges Ergebnis bestätigt nur die in dieser Freigabe enthaltenen Behauptungen.

Das Design von ZIP in Sapling verwendet einen ausgehenden Chiffrierschlüssel, um jeden ausgewählten Output wiederherzustellen. Dadurch können Empfänger, Betrag und Memo des Outputs offengelegt werden. Es erfordert außerdem einen Nachweis der Ausgabeberechtigung für mindestens eine Transaktionseingabe, sodass jemand, der die Transaktion lediglich sieht, keine gültige Freigabe erstellen kann, als hätte er sie gesendet.

Eine Sapling-Zahlungsfreigabe muss keine Absenderadresse offenlegen. Die Ausgabeberechtigung kann viele diversifizierte Adressen kontrollieren, daher identifiziert der Nachweis der Kontrolle über die Ausgabe nicht automatisch eine einzelne Adresse. ZIP 311 enthält einen optionalen Adressnachweis für Fälle, in denen der Nachweis mit einer bekannten Absenderadresse verknüpft werden muss.

## Zahlungsfreigabe oder Viewing Key?

| Methode | Beste Verwendung | Was sie offenlegt | Fortlaufender Zugriff? | Kryptografisch an die Zahlung gebunden? |
| --- | --- | --- | --- | --- |
| Transaction ID | Prüfen, ob eine Transaktion gemint wurde | Öffentliche Transaktionsdaten und Bestätigungen | Nein | Ja, aber abgeschirmte Zahlungsdetails bleiben verborgen |
| Screenshot or receipt | Informelle Aufzeichnungen | Was auch immer der Absender anzeigen möchte | Nein | Nein; das Bild kann bearbeitet werden |
| Payment disclosure | Ausgewählte Details einer Zahlung nachweisen | Ausgewählte Transaktions-Outputs sowie enthaltene Absender- oder Challenge-Nachweise | Nein, aber der geteilte Nachweis kann kopiert werden | Ja |
| Incoming Viewing Key | Überwachung von Zahlungen, die ein Konto erhält | Durch den Schlüssel abgedeckte eingehende Aktivitäten | Ja | Entschlüsselt passende eingehende Zahlungen |
| Full Viewing Key | Buchhaltung oder Prüfung eines Kontos | Durch den Schlüssel abgedeckte ein- und ausgehende Aktivitäten, Beträge, Memos und Salden | Ja | Entschlüsselt passende Kontoaktivitäten |

Verwende die kleinste Freigabe, die die Frage beantwortet. Ein Streitfall mit einem Händler über eine Zahlung rechtfertigt normalerweise keinen Zugriff auf jede Zahlung eines Kontos. Ein Buchhalter, der einen vollständigen Berichtszeitraum prüfen muss, benötigt möglicherweise stattdessen einen Viewing Key.

Keine der beiden Methoden gewährt die Berechtigung zum Ausgeben. Teile niemals eine Seed Phrase, einen Spending Key, Private Key oder ein Wallet-Backup als Zahlungsnachweis.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Was kann ich heute verwenden?

Derzeit wird keine Wallet hier als Implementierung der Erstellung oder Verifizierung von Zahlungsfreigaben gemäß ZIP 311 aufgeführt. Der ZIP bleibt ein Entwurf und führt seine Referenzimplementierung als „TBD“ auf. Die folgenden gepflegten Tools können Absendern, Empfängern oder autorisierten Prüfern dennoch helfen, die heute verfügbaren Aufzeichnungen zu prüfen:

| App | Heute nützlich für | Wichtige Einschränkung |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Anzeigen detaillierter Transaktionsmetadaten, Beträge, Pool-Eingaben und -Outputs sowie Memos; Importieren von Unified oder Sapling Viewing Keys in reine Ansichtskonten | Bewirbt weder die Erstellung noch die Verifizierung von Freigaben gemäß ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Prüfen abgeschirmter Transaktionshistorien und Memos; Importieren eines Unified Full Viewing Key im schreibgeschützten Modus | Ein Wallet-Datensatz oder schreibgeschütztes Konto ist keine selektiv abgegrenzte Zahlungsfreigabe |
| [Zallet](https://zcash.github.io/zallet/) | Betreiberabläufe mit `z_viewtransaction`, `z_exportviewingkey` und `z_importviewingkey` | Beta-Software; ihre Viewing-Key- und Transaktions-RPCs sind weiter gefasste oder lokale Datensätze, keine Nachweise gemäß ZIP 311 |

Verwende zuerst die Wallet, die die Zahlung gesendet oder erhalten hat. Prüfe ihre Transaktionsdetails, ihr Memo, ihre Transaktions-ID und ihre Bestätigungen und bitte dann die andere Partei, diese Details mit ihren eigenen Aufzeichnungen zu vergleichen. Installiere keine neue Wallet und gib keine Seed Phrase ein, nur um Belege zu erzeugen. Wenn ein Prüfer fortlaufende Einsicht benötigt, ziehe ein kompatibles Konto mit reinem Ansichtszugriff in Betracht und verstehe den Umfang des Viewing Key, bevor du ihn teilst.

Diese Apps sind praktische Alternativen zur Prüfung von Aufzeichnungen, kein Beweis dafür, dass eine standardisierte Zahlungsfreigabe verfügbar ist. Ein Screenshot kann Personen beim Vergleich von Aufzeichnungen helfen, ist aber bearbeitbar und kein kryptografischer Nachweis.

## Wo Zahlungsfreigaben Anwendung finden

### Streitfälle mit Händlern

Ein Kunde könnte nachweisen, dass ein bestimmter Betrag an die abgeschirmte Adresse des Händlers gesendet wurde. Der Nachweis belegt nicht, dass Waren geliefert wurden, eine Rückerstattung geschuldet ist oder die vorlegende Person eine bestimmte rechtliche Identität hat. Diese Fragen hängen weiterhin vom Bestelldatensatz und der Vereinbarung der Parteien ab.

### Abgeschirmte Auszahlungen

ZIP 311 führt abgeschirmte Auszahlungen als vorgesehenen Anwendungsfall auf: Eine Börse würde Empfänger und Betrag nachweisen, ohne diese Details on-chain zu veröffentlichen. Der Nachweis für transparente Eingaben ist noch nicht fertiggestellt, daher ist dies noch kein vollständiger standardisierter Ablauf. Der Kunde muss außerdem den Bestätigungsstatus der Transaktion eigenständig prüfen.

### Spenden

Ein Spender oder eine Kampagne könnte einen bestimmten Beitrag nachweisen und gleichzeitig nicht zusammenhängende Zahlungen privat halten. Die Veröffentlichung der Freigabe macht ihre ausgewählten Details für jeden öffentlich, der eine Kopie erhält; ein privater Verifizierungskanal ist daher sicherer, wenn ein öffentlicher Nachweis unnötig ist.

### Buchhaltung

Verwende eine Zahlungsfreigabe, wenn ein Buchhalter Nachweise für eine Transaktion benötigt. Verwende den engstmöglichen passenden Viewing Key, wenn der Buchhalter fortlaufenden Zugriff auf viele Transaktionen oder einen vollständigen Berichtszeitraum benötigt.

## Ein datenschutzsicherer Ablauf

ZIP 311 ist noch kein fertiger, breit einsetzbarer Wallet-Standard. Wenn kompatible Tools für Absender und Prüfer verfügbar werden, verwende diese Checkliste:

1. **Zuerst Kompatibilität bestätigen.** Beide Tools müssen dasselbe Freigabeformat und den von der Zahlung verwendeten abgeschirmten Pool unterstützen.
2. **Zuerst gewöhnliche Probleme lösen.** Prüfe Wallet-Synchronisierung, Transaktions-ID, Anzahl der Bestätigungen, Ablaufstatus und die Aufzeichnungen des Empfängers, bevor du private Details offenlegst.
3. **Eine Challenge anfordern.** Bei einem Streitfall sollte der Prüfer eine neue Bestellnummer oder zufällige Challenge bereitstellen, damit die Freigabe an diese Anfrage gebunden ist.
4. **Nur den benötigten Output auswählen.** Nimm keine nicht zusammenhängenden Outputs aus derselben Transaktion auf.
5. **Jedes offengelegte Feld prüfen.** Prüfe Empfänger, Betrag, Memo, Absenderadressnachweis und Challenge vor dem Export.
6. **Über einen privaten Kanal teilen.** Eine Freigabe ist kein geheimer Spending Key, aber jeder Empfänger kann die dadurch offengelegten Informationen behalten oder weiterverbreiten.
7. **Gegen die Chain verifizieren.** Der Prüfer muss die exakte Transaktion von einem vertrauenswürdigen Knoten abrufen, bestätigen, dass sie sich im vorgesehenen Netzwerk und Block befindet, und anschließend die Freigabe validieren.
8. **Das Ergebnis dokumentieren, keine zusätzlichen Geheimnisse.** Bewahre nur auf, was der Streitfall-, Auszahlungs-, Spenden- oder Buchhaltungsprozess erfordert.

Wenn die Wallet keine Freigabe erstellen kann, ersetze sie nicht durch einen vollständigen Viewing Key, ohne dessen breiteren und dauerhaften Umfang zu verstehen. Frage, ob der Empfänger die Zahlung anhand seiner eigenen Wallet-Aufzeichnungen bestätigen oder stattdessen einen weniger sensiblen Nachweis akzeptieren kann.

## Was eine gültige Freigabe nicht beweist

Eine erfolgreiche Verifizierung beweist nicht:

- Dass die Transaktion genügend Bestätigungen für die Risikorichtlinie des Prüfers hat
- Dass eine Chain-Reorganisation eine kürzliche Transaktion nicht entfernen kann
- Dass Waren oder Dienstleistungen geliefert wurden
- Dass eine Rückerstattung oder Rückbuchung erforderlich ist
- Dass der Absender eine bestimmte Adresse kontrolliert, sofern kein geeigneter Adressnachweis enthalten ist
- Dass die Person, die die Freigabe vorlegt, eine behauptete reale Identität hat
- Dass nicht offengelegte Outputs, andere Transaktionen oder der Saldo der Wallet einen bestimmten Wert haben
- Dass die Freigabe nach ihrer Weitergabe privat bleibt

Der Prüfer muss die Aufnahme in die Chain und den Bestätigungsstatus separat prüfen. Das Verifizierungsverfahren von ZIP 311 setzt voraus, dass der Aufrufer die geminte Transaktion und ihre Blockhöhe bereits abgerufen hat.

## Aktuelle Einschränkungen

Betrachte ZIP 311 als vorgeschlagenen Standard, nicht als Versprechen, dass eine aktuelle Wallet eine funktionierende Schaltfläche **Zahlung nachweisen** besitzt.

Der Entwurf spezifiziert derzeit Ausgaben und Outputs von Sapling, enthält jedoch weiterhin offene Punkte für Orchard, transparente Eingaben, die Freigabekodierung, Versionierung und die Art, wie Wallets verschiedene Gültigkeitsstufen anzeigen sollen. Seine Referenzimplementierung ist ebenfalls als „TBD“ aufgeführt. In der vorliegenden Form definiert er keine Zahlungsfreigaben für Orchard- oder Ironwood-Zahlungen.

Der Absender kann einen Output möglicherweise auch dann nicht offenlegen, wenn die Transaktion absichtlich ohne einen ausgehenden Viewing Key für diesen Output erstellt wurde. ZIP 311 bewahrt diese Datenschutzentscheidung, statt einen neuen Wiederherstellungsweg zu schaffen.

Ältere Dokumentation beschreibt die experimentellen Befehle `z_getpaymentdisclosure` und `z_validatepaymentdisclosure` in `zcashd`. Diese Befehle unterstützten **nur Sprout JoinSplit Outputs**, nicht das Sapling-Design in ZIP 311, und wurden als veraltet eingestuft. `zcashd` erreichte im Juli 2026 seinen endgültigen End-of-Support-Stopp. Verwende diese ältere Anleitung nicht als Anweisungen für aktuelle Gelder.

Diese Lücken machen die Idee nicht nutzlos. Sie erklären, warum ein sorgfältiger Leitfaden das Datenschutzmodell und die Anwendungsfälle von Software trennen muss, die für gewöhnliche Nutzer bereit ist.

## FAQ

### Kann ich eine abgeschirmte Zahlung nur mit der Transaktions-ID nachweisen?

Nein. Die ID kann die Transaktion und ihren Bestätigungsstatus identifizieren, aber abgeschirmter Empfänger, Betrag und Memo sind nicht öffentlich.

### Ist eine Zahlungsfreigabe dasselbe wie ein Viewing Key?

Nein. Eine Freigabe ist auf ausgewählte Details einer Transaktion begrenzt. Ein Viewing Key kann passende Aktivitäten für eine Adresse oder ein Konto über Zeit offenlegen.

### Kann der Empfänger den Nachweis des Absenders erstellen?

Nicht nach dem Design von ZIP 311. Eine gültige Freigabe muss die Ausgabeberechtigung für mindestens eine Eingabe nachweisen. Der Empfänger kann eine Zahlung anhand seiner eigenen Wallet-Aufzeichnungen bestätigen, aber das ist eine andere Behauptung.

### Kann ich eine Freigabe nach dem Teilen widerrufen?

Nein. Sie gewährt keinen zukünftigen Kontozugriff wie ein Viewing Key, aber die offengelegten Daten und der Nachweis können kopiert werden. Teile sie so sorgfältig wie jede private Finanzaufzeichnung.

### Verschiebt oder sperrt die Verifizierung irgendwelche ZEC?

Nein. Das Erstellen oder Verifizieren einer Freigabe gibt keine Gelder aus, erstattet sie nicht, friert sie nicht ein und macht sie nicht rückgängig.

### Was sollte ich heute verwenden, wenn meine Wallet keine Freigabefunktion hat?

Beginne mit den Wallet-Aufzeichnungen des Empfängers, der Transaktions-ID und dem Bestätigungsstatus, einer Rechnungsreferenz im verschlüsselten Memo oder einem anderen gegenseitig akzeptierten Beleg. Verwende einen Viewing Key nur, wenn sein weiterer Umfang wirklich benötigt und verstanden wird.

## Ressourcen

- [ZIP 311: Zcash Zahlungsfreigaben](https://zips.z.cash/zip-0311) - der Entwurf, Anforderungen, Verifizierungsprozess und Datenschutzaspekte
- [ZIP 310: Sicherheitseigenschaften von Sapling Viewing Keys](https://zips.z.cash/zip-0310) - was Viewing Keys offenlegen und welche Garantien sie bieten
- [ZIP 304: Sapling Adresssignaturen](https://zips.z.cash/zip-0304) - der optionale Adressnachweismechanismus, auf den ZIP 311 verweist
- [Zcash Protokollspezifikation](https://zips.z.cash/protocol/protocol.pdf) - Sapling-Note-Verschlüsselung, ausgehende Viewing Keys und Ausgabenautorisierung
- [Archiviertes zcashd-Dokument zu Zahlungsfreigaben](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - historische reine Sprout-Implementierung, kein aktueller Leitfaden
- [zcashd veraltete Funktionen](https://zcash.github.io/zcash/user/deprecation.html) - Status der alten experimentellen Freigabebefehle

## Verwandte Seiten

- [Transaktionen](/using-zcash/transactions) - abgeschirmte Zahlungen, Bestätigungen und Fehlerbehebung bei Transaktionen
- [Viewing Keys](/zcash-tech/viewing-keys) - fortlaufender schreibgeschützter Zugriff und aktuelle Exportoptionen
- [Was ein Block Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see) - öffentliche und private Transaktionsfelder
- [Aufzeichnungen mit abgeschirmten ZEC führen](/zcash-use-cases/keeping-records-with-shielded-zec) - Buchhaltung ohne Veröffentlichung des Wallet-Verlaufs
