<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ist Zcash post-quantum?

## Kurze Antwort

Nein, noch nicht.

Seit dem Ironwood-Upgrade ist Zcash für Gelder im Ironwood-Pool **quantumwiederherstellbar**. Das ist ein echter Schritt, aber nicht dasselbe wie post-quantensicher zu sein. ZIP 2005, die zugrunde liegende Spezifikation, sagt dies direkt: Die Änderung „macht das Protokoll nicht allein gegen Quantenangreifer sicher“. Sie bereitet Ironwood-Gelder darauf vor, über ein künftiges Recovery Protocol bewegt werden zu können, sobald die aktuelle Kryptografie abgeschaltet wird.

Diese Seite trennt, was Zcash heute schützt, was Ironwood geändert hat, was weiterhin gefährdet ist und was lediglich ein Vorschlag ist. Die [Statustabelle](#status-table) gegen Ende zeigt, wo jeder Teil steht und wann dies zuletzt geprüft wurde.

<br/>

## Für wen ist das?

- Alle, die „quantumwiederherstellbar“ gesehen und als „quantensicher“ verstanden haben
- Inhaber, die entscheiden, ob sie Gelder in Ironwood verschieben sollen
- Autoren und Moderatoren, die eine belegte Antwort brauchen, auf die sie verweisen können

Für Hintergrundwissen zum Quantencomputing selbst, beginne mit [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security).

<br/>

## Warum die Frage verwirrend ist

„Post-quantum“ wird verwendet, als wäre es eine einzelne Eigenschaft. Für Zcash sind es mindestens vier getrennte Fragen, und sie haben unterschiedliche Antworten:

1. **Privatsphäre.** Kann ein Quantenangreifer sehen, wer wem wie viel bezahlt hat?
2. **Ausgeben.** Kann ein Quantenangreifer Coins ausgeben, die ihm nicht gehören?
3. **Inflation.** Kann ein Quantenangreifer ZEC aus dem Nichts erzeugen?
4. **Wiederherstellung.** Wenn die aktuelle Kryptografie abgeschaltet werden muss, können ehrliche Nutzer ihre Gelder weiterhin herausbekommen?

Ironwood ändert nur die Antwort auf die vierte Frage und nur für Notes im Ironwood-Pool.

Die Bedrohung hinter all dem ist ein Angreifer, der diskrete Logarithmen auf den elliptischen Kurven berechnen kann, die Zcash verwendet. Ein ausreichend großer Quantencomputer mit Shors Algorithmus wäre eine Möglichkeit dafür. ZIP 2005 weist darauf hin, dass das Finden eines **einzelnen** diskreten Logarithmus ausreicht, um beliebige Inflation zu verursachen oder Gelder zu stehlen.

<br/>

## Was Zcash heute schützt

Diese Tabelle beschreibt das Protokoll, wie es derzeit läuft, gegenüber einem Angreifer, der diskrete Logarithmen brechen kann. Sie gilt für jeden abgeschirmten Pool, einschließlich Ironwood, da Ironwood denselben Orchard-Circuit, Halo 2-Proofs und RedPallas-Signaturen wie Orchard verwendet.

| Eigenschaft | Gegen einen Quantenangreifer heute | Was Ironwood geändert hat |
|---|---|---|
| Privatsphäre | Bleibt erhalten, wenn der Angreifer deine abgeschirmte Adresse nicht kennt. Proofs und rerandomisierte Signaturen geben nichts Zusätzliches preis. Kennt der Angreifer die Adresse jedoch, kann er an sie gesendete Notes entschlüsseln, einschließlich alter von der Chain gespeicherter Notes. | Nichts. ZIP 2005: „Die Situation hinsichtlich der Privatsphäre ist für jeden Pool unverändert.“ |
| Ausgeben | Nicht geschützt. Ein Angreifer könnte Proofs oder Ausgabesignaturen fälschen und aus jedem abgeschirmten Pool stehlen, selbst für Adressen, die er nie gesehen hat. | Noch nichts. Der Schutz kommt erst nach einer künftigen Umstellung auf das Recovery Protocol. |
| Inflation | Nicht geschützt. Ein Angreifer könnte einen gültig aussehenden Proof fälschen und ZEC innerhalb eines beliebigen abgeschirmten Pools erzeugen, möglicherweise ohne dass es jemand bemerkt. Die einzige Begrenzung ist die [Turnstile](/zcash-tech/the-turnstile): Kein Pool kann mehr auszahlen als sein erfasster Saldo. | Noch nichts. Ironwood-Notes verpflichten sich nun auf eine Weise zu all ihren Inhalten, die ein Quantenangreifer nicht fälschen können sollte. Genau das benötigt ein künftiges Recovery Protocol, um die Geldmenge solide zu halten. |
| Wiederherstellung | Sprout-, Sapling- und Orchard-Notes haben keinen Wiederherstellungsweg. Sobald ihre Protokolle abgeschaltet werden, wären alle darin verbleibenden Gelder unzugänglich. | Jede Ironwood-Note ist prinzipiell wiederherstellbar. Keine Sapling- oder Orchard-Note ist es. |

Transparentes ZEC ist ein separater Fall. Seine ECDSA-Signaturen können gefälscht werden, sobald der öffentliche Schlüssel bekannt ist. Bei einer normalen transparenten Adresse geschieht das beim ersten Ausgeben von ihr, und es gibt außerdem ein kurzes Zeitfenster, während eine Transaktion unbestätigt im Mempool liegt. ZIP 2005 ändert daran nichts.

<br/>

## Was Ironwood geändert hat

Ironwood ist das NU6.3-Netzwerk-Upgrade. Es wurde am 28. Juli 2026 bei Block 3.428.143 im Mainnet aktiviert. Sein Hauptzweck war die Integrität der Geldmenge nach dem Orchard-Soundness-Bug (siehe die [Ironwood](/zcash-tech/ironwood)-Seite), und die Quantumwiederherstellbarkeit aus ZIP 2005 wurde als Teil davon ausgeliefert.

- **Ein neues Note-Format.** Jede Ironwood-Output-Note verwendet das quantumwiederherstellbare Format (führendes Byte des Note-Plaintexts `0x03`). Die Zufälligkeit der Note wird nun aus all ihren Feldern abgeleitet, sodass die Note durch einen Hash an ihre Inhalte gebunden ist und nicht nur durch Mathematik elliptischer Kurven.
- **Ein Wiederherstellungsweg nur für Ironwood-Notes.** ZIP 326 stellt ausdrücklich fest, dass jede Ironwood-Note wiederherstellbar und keine Orchard-Note wiederherstellbar ist. Eine Wallet-Einstellung ändert daran nichts.
- **Orchard nimmt keinen neuen Wert mehr an.** Coinbase-Belohnungen können nicht mehr an Orchard gehen, und Orchard kann nicht mehr an eine andere Orchard-Adresse senden, sodass neuer abgeschirmter Wert in Ironwood landet.
- **Wallets werden angewiesen, alles zu verschieben.** ZIP 2005 besagt, dass Wallets alle von ihnen kontrollierten Gelder, einschließlich transparenter, Sprout- und Sapling-Gelder, sobald praktikabel in Ironwood-Notes verschieben SOLLTEN und dies weiterhin tun sollen, wenn neue Gelder eintreffen.

Was Ironwood nicht geändert hat: die heute zum Ausgeben und Beweisen verwendete Kryptografie, Note-Verschlüsselung und alles zu transparentem ZEC.

<br/>

## Verbleibende Einschränkungen

**Es gibt ein Zeitfenster der Gefährdung.** Von der Aktivierung von Ironwood bis zur Abschaltung der alten Protokolle könnte ein Quantenangreifer weiterhin Gelder in jedem abgeschirmten Pool stehlen, inflationieren oder blockieren. ZIP 2005 nennt dies die „kritische Gefährdungsperiode“ und warnt, dass ein Angriff währenddessen die Fähigkeit eines Inhabers zur späteren Wiederherstellung beeinträchtigen könnte. Deshalb heißt es dort, dass Zcash Orchard, Sapling und Sprout **abschalten muss**, bevor Quantenangriffe praktikabel werden.

**Für die Abschaltung gibt es kein Datum.** Kein ZIP plant, Orchard oder Sapling abzuschalten. ZIP 2003, ein Draft und ein NU7-Kandidat, würde Sprout-Ausgaben deaktivieren, indem Version-4-Transaktionen untersagt werden. Eine Diskussion über Sapling nur für Auszahlungen begann im April 2026 im Forum.

**Das Recovery Protocol ist nicht fertig.** ZIP 2005 skizziert es nur und besagt, dass die Details „Änderungen unterliegen“. Nichts davon ist bereitgestellt.

**Jetzt sammeln, später entschlüsseln.** Note-Chiffretexte für Ironwood, Orchard, Sapling und Sprout sind alle öffentlich auf der Chain. Jemand kann sie heute speichern und später entschlüsseln, wenn er auch die Empfängeradresse kennt. Jede Adresse, die du veröffentlichst oder weitergibst, ist Teil dieses Risikos. ZIP 2005 besagt, dass für künftige Übertragungen „andere Protokolländerungen geprüft werden“.

**Transparente Gelder sind nicht abgedeckt.** Bei Adressen, von denen ausgegeben wurde oder die wiederverwendet wurden, sind öffentliche Schlüssel offengelegt. Wiederherstellbarkeit für einige transparente Adressen ist bislang nur eine Idee (ZIP 2007, siehe unten).

**FROST-Setups haben einen zusätzlichen Vorbehalt.** Bei FROST besitzt jeder Teilnehmer einen Quanten-Ausgabeschlüssel (`qsk`), und ein Quantenangreifer, der ihn besitzt, könnte möglicherweise stehlen. ZIP 2005 empfiehlt, FROST-Gelder in ein vollständig post-quantisches Protokoll mit Threshold-Unterstützung zu verschieben, sobald es eines gibt.

<br/>

## Vorschläge und Forschung

Keines davon ist live.

- **Recovery Protocol.** Der Mechanismus, der es Ironwood-Geldern nach der Umstellung tatsächlich ermöglichen würde, ausgegeben zu werden. In ZIP 2005 skizziert, nicht spezifiziert.
- **ZIP 2007, Wiederherstellbarkeit für einige transparente Adressen.** Nur eine reservierte ZIP-Nummer mit Diskussion in [zips#1302](https://github.com/zcash/zips/issues/1302). Die Idee ist, dass P2PKH- und P2SH-Outputs, deren öffentliche Schlüssel nie offengelegt wurden, mit schwächeren Garantien als Ironwood wiederherstellbar sein könnten.
- **Post-Quantum-Privatsphäre für bekannte Adressen.** Seit 2022 offen in [zips#1133](https://github.com/zcash/zips/issues/1133), wo festgestellt wird, dass Zcash „bereits als post-quantisch privat vorgesehen“ ist, wenn Adressen geheim gehalten werden, und gefragt wird, wie dies auf bekannte Adressen ausgeweitet werden kann, etwa mit einem post-quantischen Schlüsselverkapselungsschema wie Kyber (jetzt ML-KEM). Im Juni 2026 schlug [zips#1307](https://github.com/zcash/zips/issues/1307) ein ZIP vor, um die aktuellen Privatsphäre-Eigenschaften und mögliche Korrekturen zu dokumentieren.
- **Project Tachyon.** Ein vorgeschlagenes Skalierungs-Upgrade. Seine Website besagt, dass es als Nebeneffekt „vollständige Post-Quantum-Privatsphäre“ erreichen würde, indem die Zahlungszustellung off-chain verlagert und ein post-quantischer Schlüsselaustausch verwendet wird. Seine Proof-Carrying-Data-Bibliothek Ragu wird als „noch im Aufbau“ beschrieben. Siehe [Project Tachyon](/zcash-tech/project-tachyon).
- **Ein vollständig post-quantisches Zcash.** Post-quantische Proofs, Signaturen und Commitments zusammen. Verfolgt in [zips#1134](https://github.com/zcash/zips/issues/1134), seit 2016 offen. Es gibt keine Spezifikation und keinen Zeitplan.

<br/>

## Statustabelle

Zuletzt geprüft am 13. September 2026. Der Header-Status eines ZIP und sein Netzwerkstatus sind verschiedene Dinge: ZIP 2005 sagt in seinem Header weiterhin „Proposed“, obwohl seine Regeln seit Juli 2026 im Mainnet durchgesetzt werden.

| Element | ZIP-Status | Netzwerkstatus | Datum | Quelle |
|---|---|---|---|---|
| Ironwood-Pool mit quantumwiederherstellbaren Notes (NU6.3) | ZIP 2005 Proposed, ZIP 229 und ZIP 258 Draft | **Aktiviert** im Mainnet | 28. Juli 2026, Block 3.428.143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard für neuen Wert geschlossen | ZIP 2006 Reserved, Regeln in ZIP 258 | **Aktiviert** im Mainnet | 28. Juli 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallets verschieben Gelder in Ironwood | Anleitung in ZIP 2005, ZIP 318 und ZIP 326 (Draft) | Empfohlen, hängt von deiner Wallet ab | Seit 28. Juli 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | Nur innerhalb von ZIP 2005 skizziert | **Nicht implementiert** | Kein Datum | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Abschalten von Orchard und Sapling | Kein ZIP | **Nicht geplant** | Sapling-Diskussion seit Apr. 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Deaktivierung von Sprout-Ausgaben (ZIP 2003) | Draft, NU7-Kandidat | **Nicht aktiviert** | Kein Datum | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Transparente Wiederherstellbarkeit (ZIP 2007) | Reserved | **Vorschlag** | ZIP reserviert am 5. Juli 2025, Diskussion eröffnet am 17. Juni 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Post-Quantum-Privatsphäre für bekannte Adressen | Offene Issues, kein ZIP | **Forschung** | #1133 eröffnet am 18. Aug. 2022, #1307 eröffnet am 23. Juni 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Project Tachyon | Kein ZIP | **Vorschlag**, in Entwicklung | Erstmals veröffentlicht im Apr. 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Vollständig post-quantisches Protokoll | Offenes Issue, kein ZIP | **Zukünftige Arbeit** | #1134 eröffnet am 28. März 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

In den Meinungsumfragen des Zcash Foundation im NU7 (Februar 2026) hatte Quantumwiederherstellbarkeit 90,5 % Unterstützung von ZCAP und 94,6 % von Coin-Inhabern, und Tachyon hatte nahezu universelle Unterstützung. Das waren Meinungsumfragen, keine Entscheidungen darüber, was in NU7 aufgenommen wird.

<br/>

## Was du jetzt tun kannst

- **Verschiebe deine Gelder nach Ironwood.** Sapling- und Orchard-Notes werden niemals wiederherstellbar sein. Das Verschieben von Wert zwischen Pools zeigt den Betrag on-chain, daher lässt ZIP 318 Wallets Salden in feste Beträge aufteilen und diese im Zeitverlauf übertragen. Lass dies deine Wallet erledigen, statt alles auf einmal zu verschieben.
- **Veröffentliche keine abgeschirmten Adressen, die du nicht brauchst.** Privatsphäre gegenüber einem künftigen Quantenangreifer hängt davon ab, dass dieser deine Adresse nicht kennt. Unified Addresses lassen sich günstig erzeugen, gib also jedem Zahler eine neue. ZIP 229 empfiehlt aus diesem Grund die Adressrotation.
- **Verwende transparente Adressen nicht erneut.** Sobald du von einer ausgibst, ist ihr öffentlicher Schlüssel dauerhaft auf der Chain.
- **Bewahre deine Seed Phrase sicher auf.** Im skizzierten Recovery Protocol muss eine Wiederherstellungsausgabe beweisen, dass du deinen Ausgabeschlüssel kennst, und normale Wallets leiten diesen Schlüssel aus dem Seed ab.
- **Ignoriere Behauptungen wie „Zcash ist quantensicher“.** Das ist es noch nicht, und die Autoren der Spezifikationen sagen dies selbst.

<br/>

## Häufige Missverständnisse

- **„Ironwood ist post-quantum.“** Nein. Es verwendet dieselbe Orchard-Kryptografie, und ZIP 2005 sagt, dass die Funktion „das Orchard-Protokoll nicht gegen Quantenangriffe sicher macht“.
- **„Quantumwiederherstellbar bedeutet heute sicher vor Quantencomputern.“** Nein. Es bedeutet, dass Ironwood-Gelder nach einer künftigen Umstellung wiederhergestellt werden könnten, sofern diese Umstellung rechtzeitig erfolgt.
- **„Abgeschirmtes Zcash ist bereits post-quantisch privat.“** Nur wenn der Angreifer deine Adresse nicht kennt. Bekannte Adressen sind in jedem Pool gefährdet.
- **„Tachyon hat bereits Post-Quantum-Privatsphäre hinzugefügt.“** Tachyon ist ein Vorschlag. Nichts davon ist live.
- **„Quantencomputer brechen jeden Teil von Zcash.“** Hash-Funktionen werden durch bekannte Quantenangriffe nur geschwächt, nicht gebrochen. Quantumwiederherstellbarkeit beruht genau auf diesem Unterschied.

<br/>

## Verwandte Seiten

- [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [The Turnstile](/zcash-tech/the-turnstile)
- [Project Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Shielded Pools](/using-zcash/shielded-pools)

<br/>

## Quellen

- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229)
- [ZIP 258: Deployment des NU6.3 Network Upgrade](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard-zu-Ironwood-Migration](https://zips.z.cash/zip-0318)
- [ZIP 326: Folgen von NU6.3 für Wallets](https://zips.z.cash/zip-0326)
- [ZIP 2003: Version-4-Transaktionen untersagen](https://zips.z.cash/zip-2003)
- [ZIP 209: Negative Salden abgeschirmter Chain-Value-Pools verbieten](https://zips.z.cash/zip-0209)
- [zips#1302: Quantumwiederherstellbarkeit eines Teils des transparenten Protokolls](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Post-Quantum-Privatsphäre für Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privatsphäre von Zcash gegenüber Quanten- und Angreifern, die diskrete Logarithmen brechen können](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Vollständig post-quantisches Zcash](https://github.com/zcash/zips/issues/1134)
- [Roadmap von Project Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Umfrageergebnisse: Was wir gehört haben und wohin es von hier aus geht](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Block 3.428.143 auf Blockchair](https://blockchair.com/zcash/block/3428143)
- [Forumanfrage: Ist Zcash post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
