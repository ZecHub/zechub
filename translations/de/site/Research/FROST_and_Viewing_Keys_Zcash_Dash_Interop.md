# FROST & Viewing Keys: Zcash/Dash-Interoperabilitätsrecherche – Kurzüberblick

*Erstellt für ZecHub · Überarbeitet am 27. September 2026 · Alle Aussagen mit Inline-Quellen belegt*

## Zusammenfassung

ZecHub stellte diese Frage, nachdem shielded DASH als Spendenoption für das Wiki hinzugefügt worden war: Könnten Viewing Keys im Stil von Zcash oder FROST-Threshold-Signaturen auf Dash übertragen werden?

Die Recherche hat die Fragestellung neu eingeordnet. Viewing Keys sind keine offene Frage — Dash hat den [Zcash-Shielded-Pool Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) in seine Evolution-Chain integriert, und die Schlüsselhierarchie von Orchard umfasst Viewing Keys bereits konstruktionsbedingt. Die eigene [Roadmap](https://www.dash.org/roadmap/) von Dash positioniert sie für die Offenlegung gegenüber Prüfern und die Einhaltung der Travel Rule. Diese Hälfte ist implementiert, nicht hypothetisch.

**FROST ist die eigentliche Lücke.** Dash betreibt bereits BLS-Threshold-Signaturen über [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), doch diese dienen dem Konsens auf Netzwerkebene — ChainLocks und InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) zielt auf etwas anderes ab: eine Threshold-Ausgabeberechtigung für ein einzelnes shielded Konto, das von einer kleinen Gruppe einzelner Schlüsselinhaber verwaltet wird. Beides ist nicht austauschbar. Da ZIP 312 weiterhin **Draft** ist, gibt es auf keiner der beiden Chains eine Referenzimplementierung, die portiert werden könnte; unabhängig davon, welche Seite sie umsetzt, wäre dies neue Arbeit.

---

## Zeitachse: Warum dieser Vergleich gerade jetzt ungewöhnlich ist

Mitte 2026 ereigneten sich innerhalb weniger Wochen zwei Ereignisse rund um Shielded-Pools.

**Zcash löste sich von Orchard.** Der Forscher Taylor Hornby legte eine Schaltkreis-Schwachstelle in Orchard offen, die zur unentdeckbaren Inflation des Angebots ausgenutzt werden konnte. Zcash reagierte mit der Aktivierung von **Ironwood (NU6.3)** am **28. Juli 2026** und führte einen neuen Shielded-Pool mit einem Turnstile-Migrationsmechanismus ein.

**Dash setzte auf Orchard.** Dash kündigte den Plan am [19. Februar 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) an — *„Wir erwarten, shielded Transfers bald starten zu können, selbstverständlich vorbehaltlich von Sicherheitsaudits und weiterer Codeprüfung.“* Die [Roadmap](https://www.dash.org/roadmap/) von Dash führt Shielded Balances als **im Juli 2026 abgeschlossen** mit Dash Platform **v4.0**, und Dash veröffentlichte am **4. August 2026** [*„Shielded-Transaktionen sind im Dash Evolution Mainnet live“*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/).

> **Hinweis zur Reihenfolge.** Einige Berichte datierten die Mainnet-Aktivierung von Dash auf den 17. Juli 2026, womit sie vor Ironwood gelegen hätte. Dieses Datum scheint auf Presseberichte über die Ankündigung und nicht auf eine Aktivierung zurückzugehen. Nach den eigenen Quellen von Dash wurde die Funktion im Juli abgeschlossen und am 4. August als live angekündigt — nach Ironwood. Die beiden Chains kreuzten sich innerhalb weniger Wochen; die exakte Reihenfolge hängt davon ab, welcher Meilenstein gezählt wird, und dieser Kurzüberblick behauptet keine.

Entscheidend ist, dass Dash den Fehler nicht übernommen hat. Die Ankündigung ist eindeutig: *„Wir haben die Version von Orchard ohne bekannten Inflationsfehler implementiert. Die vorherige Version enthielt einen Fehler, der zur unentdeckbaren Inflation des Angebots von Zcash ausgenutzt werden konnte.“*

Dash betreibt nun also einen gepatchten Fork der Kryptografie, von der sich Zcash selbst auf der Basisschicht entfernt hat, während der Pool der nächsten Generation von Zcash (Ironwood) und das Ausgabeberechtigungsschema der nächsten Generation (FROST) jeweils erst kürzlich live beziehungsweise weiterhin Draft sind.

---

## Viewing Keys: implementiert, keine Forschungslücke

Der Shielded-Pool von Dash ist [Orchard](https://zips.z.cash/zip-0224), aufgebaut auf Halo 2 zk-SNARKs, das kein vertrauenswürdiges Setup erfordert. Die Schlüsselhierarchie von Orchard enthielt Full Viewing Keys und Incoming Viewing Keys von Beginn an als Teil ihres Designs und nicht als Erweiterung — die Fähigkeit kam also mit dem Code und nicht als Portierung, die eine der Chains erst aushandeln musste.

Die Roadmap von Dash beschreibt die Absicht unmittelbar:

> *„Anders als verpflichtende Datenschutzsysteme, die mit Delistings durch Börsen und regulatorischen Reibungen konfrontiert waren, unterstützen Shielded Balances selektive Offenlegung mittels View Keys — wodurch Nutzer und Unternehmen bei Bedarf Transaktionsdetails mit Prüfern teilen oder Travel-Rule-Anforderungen erfüllen können, ohne den Datenschutz im alltäglichen Gebrauch zu beeinträchtigen.“*

Zwei Beobachtungen sind festzuhalten:

**Dash positioniert Viewing Keys für einen konkreteren produktiven Anwendungsfall, als ihn die eigenen Werkzeuge von Zcash bislang erreicht haben.** Die Werkzeuge von Zcash zur Zahlungsoffenlegung sind über Wallets hinweg weitgehend experimentell und optional geblieben. Dash liefert View Keys als Compliance-Funktion mit benannten Anwendungsfällen aus, auf einer Chain, die laut eigener Ankündigung zudem etwa eine Sekunde deterministische Finalität und etwa zwanzig Sekunden Wallet-Synchronisation bietet.

**Der offene Punkt ist Kompatibilitätsdrift, nicht Fähigkeit.** Ob die Viewing-Key-Implementierung von Dash mit dem Viewing-Key-Format Zcash von Orchard kompatibel bleibt, während sich beide Chains unabhängig weiterentwickeln, sollte beobachtet werden. Es handelt sich um eine Monitoring-Frage und nicht um ein Forschungsprojekt.

---

## Schlüsselableitung: Zcash und Dash im Vergleich

Dieser Abschnitt beantwortet die Frage des Reviewers direkt. Die kurze Antwort lautet, dass die *shielded* Schlüsselbäume nahezu identisch sind, weil der Code geteilt wird — die wesentlichen Unterschiede liegen darin, wie jede Chain diesen Baum **verwurzelt** in ihrem Wallet-Schlüsselraum, und was diesen Raum außerdem belegt.

### Zcash

Zcash verwendet [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), mit dem Status **Final**. Anstatt shielded Schlüssel in einem einzigen BIP-32-Baum zu platzieren, gibt ZIP 32 jedem Shielded-Pool einen eigenen Master-Schlüssel und eigenen Pfad:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` ist gemäß BIP 43 auf `32'` (0x80000020) festgelegt, und `coin_type` folgt SLIP 44, wobei alle Testnets den Index `1` teilen.

Innerhalb eines Orchard-Kontos ist die Hierarchie strikt einseitig — jede Ebene kann alles unter ihr ableiten und nichts über ihr:

| Schlüssel | Kann | Leitet ab |
|---|---|---|
| Spending key | Notizen ausgeben | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Ausgaben autorisieren | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Eingehende **und** ausgehende Zahlungen sehen | IVK, OVK |
| Incoming Viewing Key | Nur eingehende Zahlungen sehen | Diversifizierte Adressen |
| Outgoing Viewing Key | Details ausgehender Zahlungen wiederherstellen | — |
| Diversified address | Empfangen | — |

Orchard vereinfachte dies gegenüber Sapling: Laut dem [Orchard Book](https://zcash.github.io/orchard/design/keys.html) wurde der Nullifier-Privatschlüssel `nsk` entfernt, `nk` wurde zu einem Feldelement statt eines Kurvenpunkts, und `ovk` wird nun aus dem Full Viewing Key abgeleitet, statt separat gehalten zu werden.

Darüber befindet sich [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revision 0 Active, Revision 1 Withdrawn, Revision 2 Draft — das Schlüssel pro Pool in einem **Unified Full Viewing Key** bündelt („kombiniert mehrere Full Viewing Key… Items“) sowie in einem **Unified Incoming Viewing Key**. Der Unterschied, den ein Wallet-Entwickler beachten muss: Ein UFVK offenbart sowohl eingehende als auch ausgehende Aktivität, ein UIVK nur eingehende.

### Dash

Dash verwurzelt alles in einem herkömmlichen BIP-32-Baum mit dem SLIP-44-Coin-Typ `5'` und ergänzt zwei eigene Ableitungserweiterungen.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) fügt eine **Feature**-Ebene ein, welche den Schlüsselraum nach coinspezifischer Funktion unterteilt:

```
m / purpose' / coin_type' / feature' / *
```

wobei `purpose` auf `9'` (0x80000009) und `coin_type` auf `5'` (0x80000005) festgelegt sind. Die angegebene Motivation des DIP ist Isolation — *„Es kann wünschenswert sein, gemischte Mittel in einem Pfad zu verwalten, der von nicht gemischten Mitteln isoliert ist.“*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) geht weiter und hebt die 31-Bit-Indexgrenze von BIP 32 auf, sodass Pfadkomponenten vollständige 256-Bit-Werte enthalten können. Dies ermöglicht identitätsabgeleitete Pfade wie:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

wobei die letzten beiden Komponenten Hashes von Nutzeridentitäten sind. Zcash hat kein Gegenstück dazu: ZIP 32 kennt kein Konzept, einen Schlüsselpfad aus der Identität einer anderen Partei abzuleiten.

### Wo sich die beiden tatsächlich unterscheiden

**Der shielded Teilbaum ist derselbe.** Die shielded Schlüssel von Dash sind Orchard-Schlüssel, weil der Shielded-Pool von Dash Orchard ist. Ein Wallet-Entwickler, der zwischen beiden wechselt, arbeitet mit derselben Struktur von Ausgabeschlüsseln zu Viewing Keys.

**Die Verwurzelung unterscheidet sich.** Zcash isoliert jeden Shielded-Pool unter seinem eigenen Master-Schlüssel mit dem Purpose `32'`. Dash hängt die shielded Funktion unter dem Purpose `9'` an einen einheitlichen Baum, neben jeder anderen Funktion. Die Trennung bei Zcash erfolgt nach kryptografischem Pool; bei Dash nach Produktfunktion.

**Der Schlüsselraum von Dash enthält etwas, das Zcash nicht besitzt: eine separate BLS-Domäne.** Die von LLMQs verwendeten Masternode-Operator-Schlüssel, Voting-Schlüssel und Quorum-Schlüssel sind BLS-Schlüssel, keine Schlüssel der Schnorr-Familie, und liegen vollständig außerhalb des oben beschriebenen BIP-32-Baums. Genau hier findet die bestehende Threshold-Signierung von Dash statt — und genau deshalb lässt sie sich nicht mit der Ausgabenautorisierung von Orchard zusammensetzen, wie der nächste Abschnitt darlegt.

**Identitätsverknüpfte Ableitung gibt es nur bei Dash.** Die 256-Bit-Pfade von DIP-0014 dienen dazu, Schlüssel aus Beziehungen zwischen Identitäten abzuleiten. Das ist ein Konzept der Dash Platform ohne Entsprechung bei Zcash und der deutlichste Fall, in dem die beiden Ableitungsschemata bewusst statt zufällig auseinanderliefen.

*Siehe Abbildung 1 für die zwei Verwurzelungsschemata, die auf einem gemeinsamen Orchard-Teilbaum zusammenlaufen.*

---

## FROST: die wirklich offene Frage

Dash verfügt über ein ausgereiftes Threshold-Signatursystem in **BLS-basierten LLMQs** (Long-Living Masternode Quorums), das für ChainLocks, InstantSend und den Validator-Konsens der Dash Platform verwendet wird.

[ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), Status **Draft**, tut etwas anderes. Es überführt die bereits durch Sapling und Orchard definierten Schnorr-basierten Signaturen zur Ausgabenautorisierung — **RedJubjub** beziehungsweise **RedPallas** — in ein Threshold-Verfahren, sodass nach eigener Darstellung von ZIP *„Nutzer und Dienste Dritter, die die Verwahrung eines Wallets teilen, oder eine Gruppe von Personen, die gemeinsame Mittel verwaltet“*, vor einer Ausgabe eine Threshold-Freigabe wie 2-von-3 verlangen können. Es ist als **Wallet**-ZIP kategorisiert: Es erzeugt Signaturen, die mit bestehender Ausgabenautorisierung kompatibel sind, statt den Konsens zu ändern. Es behält eine Coordinator-Rolle bei, deren Entfernung ZIP ausdrücklich ablehnt, und behandelt sowohl Schlüsselgenerierung durch einen vertrauenswürdigen Händler als auch verteilte Schlüsselgenerierung.

Der entscheidende Unterschied und Grund, weshalb dies keine Ersatzlösungen sind:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Signaturschema | BLS | Schnorr — RedJubjub / RedPallas |
| Wer signiert | Ein Quorum von Masternodes | Eine kleine Gruppe einzelner Schlüsselinhaber |
| Was autorisiert wird | Eine Netzwerk-Tatsache: ein Block Lock, ein Transaction Lock | Eine Ausgabe von einem shielded Konto |
| Ebene | Konsens | Wallet |
| Schlüsselraum | Separate BLS-Domäne | Der Orchard/Sapling-Schlüssel zur Ausgabenautorisierung |
| Status | Implementiert | Draft, keine Referenzimplementierung |

Dass Dash BLS-Threshold-Signaturen besitzt, bedeutet **nicht**, dass es FROST hat oder benötigt. Es bedeutet jedoch, dass die Ingenieure von Dash hausinterne Erfahrung mit Threshold-Signierung, verteilter Schlüsselgenerierung und Quorum-Koordination haben — tatsächlich übertragbare Erfahrung, falls sie sich für die Umsetzung entscheiden.

*Siehe Abbildung 2 dazu, was jedes Schema tatsächlich signiert.*

### Was FROST auf dem Orchard-Fork von Dash auf den ersten Blick erfordern würde

1. **Eine FROST-DKG und Signaturzeremonie über RedPallas**, dem Schema zur Ausgabenautorisierung von Orchard — einer Schnorr-Variante über der Pallas-Kurve. Dies ist getrennt von der bestehenden BLS-DKG von Dash für LLMQs und lässt sich nicht darauf reduzieren.
2. **Wallet- und UX-Unterstützung für Multi-Party-Signierung eines einzelnen shielded Kontos**, was ein anderes Interaktionsmuster als Masternode-Quorum-Tools darstellt und ein Coordinator-Äquivalent benötigt.
3. **Eine Entscheidung über die Ebene.** Wahrscheinlich nur auf Wallet-Ebene, da ZIP 312 als Wallet-Schema über bestehenden Primitiven und nicht als Konsensänderung angelegt ist — dies muss jedoch speziell für den Orchard-Fork von Dash bestätigt und darf nicht aus der Einordnung von Zcash abgeleitet werden.

---

## Empfehlung

**Viewing Keys — dokumentieren, nicht erforschen.** Die Fähigkeit ist auf beiden Chains implementiert. Eine kurze Wiki-Notiz, die festhält, dass der Shielded-Pool von Dash View Keys umfasst, und auf die Roadmap von Dash verlinkt, verhindert, dass das Publikum von ZecHub annimmt, dies sei noch hypothetisch. Die Kompatibilität des Wire-Formats sollte verfolgt werden, während sich beide Chains weiterentwickeln.

**FROST — echte Chance, aber upstream blockiert.** Es hängt davon ab, dass ZIP 312 eine Referenzimplementierung erhält oder Dash sich für eine parallele Umsetzung entscheidet. ZecHub kann dies nicht unmittelbar beschleunigen.

**Der wertvollste nächste Schritt ist ein Gespräch, nicht mehr Schreibtischrecherche.** Die Personen, die dies umsetzen würden, sind erreichbar. Shielded Labs treibt ZIP 312 voran; das Engineering-Team von Dash hat sich bereits positiv zum Framing „entlehnt von Zcash“ rund um die Orchard-Integration geäußert. Ein Community-übergreifender Thread, der beide verbindet, würde mehr ans Licht bringen als eine weitere Leserunde, und dieser Kurzüberblick hat die Grenze dessen erreicht, was öffentliche Quellen klären können.

---

## Abbildungen

**Abbildung 1 — Verwurzelung der Schlüsselableitung: Zcash ZIP 32 und Dash DIP-0009/0014, zusammenlaufend auf einem gemeinsamen Orchard-Teilbaum.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Abbildung 2 — Was jedes Threshold-Schema signiert: ein Masternode-Quorum, das eine Netzwerk-Tatsache bestätigt, gegenüber einer Gruppe von Schlüsselinhabern, die eine shielded Ausgabe autorisiert.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Quellen

**Zcash — Protokoll**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — Status Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — Status Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Schlüssel und Adressen](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — Schlüsselkomponenten, §5.6.4

**Dash — Protokoll und Ankündigungen**
- [Shielded-Transaktionen sind im Dash Evolution Mainnet live](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4. August 2026
- [Dash fügt Evolution Shielded-Transaktionen hinzu](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19. Februar 2026
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, im Juli 2026 abgeschlossen, Platform v4.0; aktualisiert am 12. September 2026
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash-Core-Dokumentation — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips-Repository](https://github.com/dashpay/dips)

**Zeitgenössische Berichterstattung**
- [Dash führt die Zcash-Technologie von Orchard in einem Datenschutz-Upgrade ein](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash bringt Zcash-Datenschutz von Orchard für Shielded-Transaktionen auf die Evolution Chain](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Quellen geprüft am 27. September 2026. Dash Platform und ZIP 312 entwickeln sich beide weiter; Abbildungen und Status sollten vor einer erneuten Veröffentlichung nochmals überprüft werden.*
