<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Was sind Zcash-TEX-Adressen?

## Kurz gesagt

* Eine TEX-Adresse ist eine transparente Zcash-Adresse, die in einem anderen Format geschrieben ist. Sie beginnt mit `tex1` und ist in [ZIP 320](https://zips.z.cash/zip-0320) definiert.
* Sie teilt deiner Wallet nur eines mit: Bezahle diese Adresse ausschließlich mit transparenten Mitteln.
* Wenn dein Guthaben abgeschirmt ist, führt eine kompatible Wallet zwei Schritte für dich aus. Sie verschiebt den Betrag an eine temporäre transparente Adresse und sendet ihn dann an die TEX-Adresse.
* Im Jahr 2023 bat Binance die Zcash-Community um eine Möglichkeit, abgeschirmte Einzahlungen abzulehnen und zurückzusenden. TEX-Adressen sind die Antwort, und Binance ist die Börse auf der Liste ZecHub [Verwahrte Börsen](/using-zcash/custodial-exchanges), die TEX-Einzahlungen annimmt.
* Auch auf der Senderseite hat die Unterstützung zugenommen: Coinbase ermöglicht seinen Nutzern, ZEC an TEX-Adressen zu senden, und Wallet-Toolkits haben Unterstützung für ZIP 320 hinzugefügt.
* Eine Zahlung an eine TEX-Adresse ist wie jede transparente Zahlung öffentlich auf der Blockchain. Der Rest deines abgeschirmten Guthabens bleibt privat.

## Grunderklärung

Eine Zcash-TEX-Adresse ist ein besonderer Typ einer Empfangsadresse. TEX steht für „Transparent Exchange“. Sie ist eine Bech32m-Neukodierung einer einzelnen transparenten p2pkh-Adresse. TEX-Adressen beginnen mit `tex1` und sind ein separater Typ von Unified Addresses.

Eine TEX-Adresse weist eine kompatible Wallet an, eine ausschließlich transparente Transaktion (T -> T) durchzuführen. 

Die Logik funktioniert wie folgt: Wenn eine kompatible Wallet eine TEX-Adresse erkennt, dekodiert sie diese, um den darin enthaltenen transparenten Empfänger zu erhalten. Die Wallet sendet dann die erforderlichen Mittel für die Transaktion aus dem abgeschirmten Pool an eine separate, nutzergesteuerte, kurzlebige transparente Adresse (Z -> T). Anschließend sendet sie diese Mittel an den dekodierten transparenten Empfänger der TEX-Adresse (T -> T).  

Der technische Vorschlag für TEX-Adressen wird in Zcash [ZIP 320](https://zips.z.cash/zip-0320) beschrieben, der einen Adresstyp definiert, der ausschließlich Mittel von transparenten Adressen empfängt.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Wie verbreitet sind TEX-Adressen?

Die Verbreitung ist noch teilweise, aber nicht mehr auf eine einzige Börse beschränkt. Zwei unterschiedliche Rollen sollten getrennt betrachtet werden:

* **Ausgabe von TEX-Einzahlungsadressen.** Binance ist die Börse auf unserer Liste [Verwahrte Börsen](/using-zcash/custodial-exchanges), die für Einzahlungen eine TEX-Adresse ausgibt, damit Mittel aus einer transparenten Quelle eintreffen ([ZIP 320, Hintergrund](https://zips.z.cash/zip-0320#background)). ZIP 320 erwartet nicht, dass andere Börsen TEX-Adressen ausgeben, außer wenn sie wissen müssen, von welcher Adresse eine Zahlung stammt.
* **Senden an TEX-Adressen.** Diese Seite ist gewachsen. Im Oktober 2024 kündigte Coinbase an, dass Nutzer von Coinbase.com Zcash an TEX-Adressen senden können ([Coinbase Assets-Ankündigung](https://x.com/CoinbaseAssets/status/1844428577921507416)). Auch Wallet-Toolkits haben Unterstützung für ZIP 320 hinzugefügt: KeepKey fügte mit Firmware 7.15 die Signierung für TEX-Transaktionen hinzu ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), und die XChainJS-`zcash-js`-Bibliothek wurde korrigiert, nachdem sie gültige `tex1`-Empfänger abgelehnt hatte (mehr dazu weiter unten).

TEX-Adressen sind also nicht universell, aber Leser sollten nicht mehr davon ausgehen, dass Binance der einzige Ort ist, an dem sie erscheinen.

### Wann benötige ich eine TEX-Adresse?

#### Du benötigst eine TEX-Adresse, wenn du Mittel an eine transparente Adresse mit einer Wallet sendest, die das direkte Senden an transparente Adressen nicht unterstützt.

Bestimmte Wallets erlauben kein direktes Senden an eine transparente Adresse, und der Empfänger stellt möglicherweise kein TEX-Äquivalent bereit. Daher kann es manchmal erforderlich sein, eine transparente Adresse in eine TEX-Adresse umzuwandeln. Dies kann manuell durch Ausführen der in [zip-320](https://zips.z.cash/zip-0320#reference-implementation) beschriebenen Referenzimplementierung erfolgen.

#### Du benötigst eine TEX-Adresse, wenn du Mittel an eine zentralisierte Börse sendest, die verlangt, dass diese Mittel aus einer transparenten Quelle stammen.

[Binance](https://www.binance.com/) ist der Grund, warum TEX-Adressen existieren. Im November 2023 teilte sie der Zcash-Community mit, dass ZEC von der Liste genommen werden könnte, sofern es keine Möglichkeit gebe, Einzahlungen von abgeschirmten Adressen abzulehnen und an den Einzahler zurückzusenden ([ZIP 320, Hintergrund](https://zips.z.cash/zip-0320#background)). ZIP 320 erwartet nicht, dass andere Börsen TEX-Adressen ausgeben, außer wenn sie wissen müssen, von welcher Adresse eine Zahlung stammt. Binance ist die Börse auf unserer Liste [Verwahrte Börsen](/using-zcash/custodial-exchanges), die Einzahlungen an eine TEX-Adresse annimmt.
TEX-Adressen informieren eine kompatible Wallet darüber, dass alle an diese Adresse gesendeten Mittel transparent sein müssen, und schließen jeden abgeschirmten Wert davon aus, an diese Adresse gesendet zu werden.
Wenn eine Börse wie Binance den gesendeten Wert ablehnt, verfügt sie über die notwendigen Mittel, um diesen Wert an die Ursprungsadresse zurückzusenden. Dies hilft auch Einrichtungen wie Binance, die von Regierungen oder anderen Behörden auferlegten Gesetze und Vorschriften einzuhalten.

### Welche Wallets unterstützen TEX-Adressen?

Die aktuellste Liste findest du auf unserer Seite [Wallets](/using-zcash/wallets). Verwende den Filter „TEX Address“.

## Visualisierung / Analogie

Stell dir dein abgeschirmtes Guthaben wie Geld in einem verschlossenen Safe zu Hause vor. Niemand außerhalb kann sehen, wie viel darin ist.

Eine Börse wie Binance hat ein Schild auf ihrem Schalter: Zahlungen werden nur in einem durchsichtigen Umschlag angenommen, damit der Kassierer sehen kann, woher das Geld kam, und es bei Bedarf zurückgeben kann. Die TEX-Adresse ist dieses Schild.

Wenn deine Wallet das Schild sieht, nimmt sie den Betrag aus dem Safe, steckt ihn in einen durchsichtigen Umschlag mit deiner Rücksendeadresse darauf (der temporären transparenten Adresse) und bringt den Umschlag zum Schalter. Der Safe bleibt verschlossen, und niemand erfährt, was sich sonst noch darin befindet.

## Tiefere Einblicke

### Wie eine TEX-Adresse aufgebaut ist

Eine normale transparente Adresse, die mit `t1` beginnt, enthält einen 20-Byte-Key-Hash, der in Base58Check geschrieben ist. Eine TEX-Adresse enthält dieselben 20 Byte, neu kodiert in Bech32m mit dem Präfix `tex` (`textest` im Testnet). Die Umwandlung einer Adresse in die andere erfordert nur wenige Zeilen Code, die ZIP 320 in seiner Referenzimplementierung zeigt.

Das einfache Design war eine Anforderung von Binance: Die Umwandlung musste mit nur Base58Check- und Bech32m-Bibliotheken im Frontend-Code der Börse funktionieren. Ein früherer Entwurf von ZIP 320 integrierte die Idee in Unified Addresses; diese Version wurde aus diesem Grund verworfen.

TEX-Adressen übernehmen die Bech32m-Kodierung aus dem Unified Address-Format, behalten aber fast nichts von dessen Struktur bei. Wenn du Bech32m und die Validierung von Zcash-Adressen noch nicht kennst, behandelt die Seite [Unified Addresses](/using-zcash/unified-addresses) die Grundlagen unter [ZIP 316](https://zips.z.cash/zip-0316). Eine TEX-Adresse unterscheidet sich von einer Unified Address in vier konkreten Punkten:

| | Unified Address (ZIP 316) | TEX-Adresse (ZIP 320) |
|---|---|---|
| Was sie enthält | mehrere zusammengefasste Empfänger | ein einzelner transparenter P2PKH-Empfänger |
| Menschenlesbares Präfix (HRP) | `u` (Mainnet) | `tex` (`textest` im Testnet) |
| F4Jumble-Verschleierung | ja | nein |
| Typcodes für jeden Empfänger | ja | nein |

Kurz gesagt ist eine TEX-Adresse der schlichteste mögliche Bech32m-Wrapper: ein transparenter Key-Hash, ein `tex`-Präfix und nichts weiter.

### Verarbeitungsregeln für Wallets und Integratoren

Dieser Teil wurde von Implementierungen falsch umgesetzt, daher lohnt es sich, ihn klar auszusprechen. Beim Erkennen einer TEX-Adresse darf eine Wallet oder ein Integrator **nicht direkt aus dem abgeschirmten Pool an das TEX-Ziel ausgeben.** ZIP 320 verlangt, dass jede Eingabe einer TEX-Zahlung transparent ist; daher wird die Zahlung in zwei Schritten aufgebaut:

1. **Entabschirmung.** Verschiebe den Betrag aus dem abgeschirmten Pool an eine neue, nutzergesteuerte, kurzlebige transparente Adresse, die der Wallet gehört (Z -> T).
2. **Transparent an transparent senden.** Gib den kurzlebigen Output an den dekodierten P2PKH-Empfänger innerhalb der TEX-Adresse aus (T -> T).

Einige Regeln sorgen dafür, dass dies sicher ist; sie stammen alle aus ZIP 320:

* Die kurzlebige Adresse sollte von deiner Seed-Phrase abgeleitet werden, damit deine Wallet die Mittel weiterhin finden und ausgeben kann, falls die Börse sie zurücksendet.
* Jedes Mal sollte eine neue kurzlebige Adresse verwendet werden, damit separate Zahlungen nicht miteinander verknüpft werden können.
* Die zweite Transaktion sollte nur transparente Eingaben ausgeben, damit die Börse eine saubere transparente-zu-transparente Einzahlung sieht.

Die Umwandlung und der zweistufige Ablauf werden in der [ZIP 320-Referenzimplementierung](https://zips.z.cash/zip-0320#reference-implementation) gezeigt. Dies falsch umzusetzen ist ein reales, aktuelles Problem: Im Oktober 2026 lehnte die XChainJS-`zcash-js`-Bibliothek gültige `tex1`-Empfänger mit dem Fehler „Invalid 'to' address“ ab, weil ihr Validator nur die Base58Check-`t1`-Form akzeptierte. Dadurch wurden ZEC-Einzahlungen an Dienste verhindert, die eine `tex1`-Adresse veröffentlichen ([Issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Dies wurde behoben, indem dem Validator beigebracht wurde, die ZIP-320-Kodierung zu akzeptieren ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Was eine TEX-Sendung offenlegt

Eine TEX-Zahlung ist eine transparente Zahlung und daher öffentlich, doch es lohnt sich, genau zu benennen, was ein Beobachter sehen kann und was nicht.

Was on-chain **sichtbar** ist:

* Die kurzlebige transparente Adresse, da sie als Output des Entabschirmungsschritts und als Eingabe der endgültigen Sendung erscheint.
* Beide Beträge: der Wert, der im Z -> T-Schritt den abgeschirmten Pool verließ, und der Wert, der im T -> T-Schritt geliefert wurde.
* Der transparente Empfänger der Börse, also die in der TEX-Adresse kodierte P2PKH-Adresse.

Was **verborgen** bleibt:

* Der Rest deines abgeschirmten Guthabens und welche konkreten abgeschirmten Notes die Zahlung finanziert haben. Der Entabschirmungsschritt zeigt, dass *ein gewisser* Wert den Pool an die kurzlebige Adresse verlassen hat, nicht woher er innerhalb des Pools stammt.

Ein Beobachter kann also die kurzlebige Adresse mit der Börsenzahlung verknüpfen (dieselben Mittel, transparent an transparent) und sehen, dass sie durch eine abgeschirmte Auszahlung aufgestockt wurde. Er kann sie nicht mit deinen anderen abgeschirmten Mitteln oder Aktivitäten verbinden. On-chain kennzeichnet nichts die Zahlung tatsächlich als „TEX“-Sendung: Wie ZIP 320 feststellt, ist eine Zahlung an eine TEX-Adresse von einer Zahlung an die passende `t1`-Adresse nicht zu unterscheiden, weil die Konsensregeln unverändert bleiben und die gesamte Regel in der Wallet liegt.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Was die Blockchain zeigt

Die TEX-Regel liegt in Wallets. Knoten prüfen sie nicht, daher bleiben die Konsensregeln unverändert. On-chain sieht eine Zahlung an eine TEX-Adresse genauso aus wie eine Zahlung an die passende `t1`-Adresse. Der Betrag, die kurzlebige Adresse und die Adresse der Börse sind wie bei jeder transparenten Transaktion öffentlich.

## Verwandte Seiten

- [Unified Addresses](/using-zcash/unified-addresses): das `u1`-Adressformat unter ZIP 316 und die Bech32m-Grundlagen, die eine TEX-Adresse wiederverwendet.
- [Verwahrte Börsen](/using-zcash/custodial-exchanges): welche Börsen welche Adresstypen akzeptieren, einschließlich der TEX-Einzahlungen von Binance.
- [Wallets](/using-zcash/wallets): Verwende den Filter „TEX Address“, um Wallets zu finden, die eine TEX-Adresse bezahlen können.
- [Abgeschirmte Pools](/using-zcash/shielded-pools): wo sich dein privates Guthaben befindet, bevor eine TEX-Zahlung einen Teil davon herausbewegt.
- [Wer kann deine Zcash-Zahlung sehen?](/start-here/who-can-see-your-zcash-payment): was sichtbar wird, sobald Mittel den abgeschirmten Pool verlassen.
- [Was ein Block Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see): wie eine transparente Zahlung on-chain erscheint.
- [Zcash-Zahlungsanfrage-URIs](/using-zcash/payment-request-uris): ein weiterer Wallet-Standard für vorausgefüllte Zahlungen.

**Zuletzt aktualisiert:** Oktober 2026
