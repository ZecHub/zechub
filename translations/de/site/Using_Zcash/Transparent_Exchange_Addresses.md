<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Was sind Zcash-TEX-Adressen?

## Kurz gesagt

* Eine TEX-Adresse ist eine transparente Zcash-Adresse in einem anderen Format. Sie beginnt mit `tex1` und ist in [ZIP 320](https://zips.z.cash/zip-0320) definiert.
* Sie teilt deiner Wallet eine Sache mit: Bezahle diese Adresse nur mit transparenten Mitteln.
* Wenn dein Guthaben abgeschirmt ist, führt eine kompatible Wallet zwei Schritte für dich aus. Sie verschiebt den Betrag an eine temporäre transparente Adresse und sendet ihn dann an die TEX-Adresse.
* Im Jahr 2023 bat Binance die Zcash-Community um eine Möglichkeit, abgeschirmte Einzahlungen abzulehnen und zurückzusenden. TEX-Adressen sind die Antwort, und Binance ist die Börse auf der Liste ZecHub [Verwahrte Börsen](/using-zcash/custodial-exchanges), die TEX-Einzahlungen akzeptiert.
* Eine Zahlung an eine TEX-Adresse ist wie jede transparente Zahlung auf der blockchain öffentlich. Der Rest deines abgeschirmten Guthabens bleibt privat.

## Kernerklärung

Eine Zcash-TEX-Adresse ist eine besondere Art von Empfangsadresse. TEX steht für „Transparent Exchange“. Sie ist eine Bech32m-Neucodierung einer einzelnen transparenten p2pkh-Adresse. TEX-Adressen beginnen mit `tex1` und sind ein separater Typ von Unified Addresses.

Eine TEX-Adresse weist eine kompatible Wallet an, eine reine transparente Transaktion (T -> T) durchzuführen. 

Die Logik ist wie folgt: Wenn eine kompatible Wallet eine TEX-Adresse erkennt, decodiert sie diese, um den darin enthaltenen transparenten Empfänger zu erhalten. Die Wallet sendet dann die erforderlichen Mittel für die Transaktion vom abgeschirmten Pool an eine separate, vom Nutzer kontrollierte, kurzlebige transparente Adresse (Z -> T). Anschließend sendet sie diese Mittel an den decodierten transparenten Empfänger der TEX-Adresse (T -> T).  

Der technische Vorschlag für TEX-Adressen wird in Zcash [ZIP 320](https://zips.z.cash/zip-0320) beschrieben, der einen Adresstyp definiert, der ausschließlich für den Empfang von Mitteln von transparenten Adressen bestimmt ist.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

TEX-Adressen sind noch nicht weit verbreitet. Zcash-Nutzer müssen sie möglicherweise irgendwann verwenden.

### Wann benötige ich eine TEX-Adresse?

#### Du benötigst eine TEX-Adresse, wenn du Mittel an eine transparente Adresse sendest und eine Wallet verwendest, die das direkte Senden an eine transparente Adresse nicht unterstützt.

Bestimmte Wallets erlauben kein direktes Senden an eine transparente Adresse, und der Empfänger stellt möglicherweise kein TEX-Äquivalent bereit. Daher kann gelegentlich eine Umwandlung von einer transparenten in eine TEX-Adresse erforderlich sein. Dies lässt sich manuell durch Ausführen der in [zip-320](https://zips.z.cash/zip-0320#reference-implementation) beschriebenen Referenzimplementierung erreichen.

#### Du benötigst eine TEX-Adresse, wenn du Mittel an eine zentralisierte Börse sendest, die verlangt, dass diese Mittel aus einer transparenten Quelle stammen.

[Binance](https://www.binance.com/) ist der Grund, weshalb TEX-Adressen existieren. Im November 2023 teilte es der Zcash-Community mit, dass ZEC von der Liste gestrichen werden könnte, sofern es keine Möglichkeit gäbe, Einzahlungen von abgeschirmten Adressen abzulehnen und an den Einzahler zurückzusenden ([ZIP 320, Hintergrund](https://zips.z.cash/zip-0320#background)). ZIP 320 erwartet nicht, dass andere Börsen TEX-Adressen ausgeben, sofern sie nicht wissen müssen, von welcher Adresse eine Zahlung stammt. Binance ist die Börse auf unserer Liste [Verwahrte Börsen](/using-zcash/custodial-exchanges), die Einzahlungen an eine TEX-Adresse akzeptiert.
TEX-Adressen teilen einer kompatiblen Wallet mit, dass alle an diese Adresse gesendeten Mittel transparent sein müssen, und schließen jeden abgeschirmten Wert vom Senden an diese Adresse aus.
Wenn eine Börse wie Binance den gesendeten Wert ablehnt, verfügt sie über die nötigen Mittel, um diesen Wert an die Adresse zurückzusenden, von der er stammt. Dies hilft auch Unternehmen wie Binance dabei, die von Regierungen oder anderen Behörden auferlegten Gesetze und Vorschriften einzuhalten.

### Welche Wallets unterstützen TEX-Adressen?

Die aktuellste Liste findest du auf unserer Seite [Wallets](/using-zcash/wallets). Verwende den Filter „TEX-Adresse“.

## Visualisierung / Analogie

Stell dir dein abgeschirmtes Guthaben als Geld in einem verschlossenen Safe zu Hause vor. Niemand außerhalb kann sehen, wie viel darin ist.

Eine Börse wie Binance hat ein Schild auf ihrem Tresen: Zahlungen werden nur in einem durchsichtigen Umschlag akzeptiert, damit der Kassierer sehen kann, woher das Geld kam, und es bei Bedarf zurückgeben kann. Die TEX-Adresse ist dieses Schild.

Wenn deine Wallet das Schild sieht, nimmt sie den Betrag aus dem Safe, legt ihn in einen durchsichtigen Umschlag mit deiner Rücksendeadresse darauf (der temporären transparenten Adresse) und bringt den Umschlag zum Tresen. Der Safe bleibt verschlossen, und niemand erfährt, was sich sonst noch darin befindet.

## Vertiefung

### Wie eine TEX-Adresse aufgebaut ist

Eine normale transparente Adresse, die mit `t1` beginnt, enthält einen 20-Byte-Schlüssel-Hash, der in Base58Check geschrieben ist. Eine TEX-Adresse enthält dieselben 20 Byte, die mit dem Präfix `tex` (`textest` im Testnet) in Bech32m neu codiert sind. Die Umwandlung einer Adresse in die andere benötigt nur wenige Codezeilen, was ZIP 320 in seiner Referenzimplementierung zeigt.

Das einfache Design war eine Anforderung von Binance: Die Umwandlung musste im Frontend-Code der Börse ausschließlich mit Base58Check- und Bech32m-Bibliotheken funktionieren. Ein früherer Entwurf von ZIP 320 integrierte die Idee in Unified Addresses; diese Version wurde aus diesem Grund verworfen.

### Bezahlen einer TEX-Adresse aus einem abgeschirmten Guthaben

ZIP 320 verlangt von einer kompatiblen Wallet, hier zwei Transaktionen zu erstellen. Die erste verschiebt die Mittel von deinem abgeschirmten Guthaben an eine neue kurzlebige transparente Adresse. Die zweite sendet sie von dieser Adresse an die TEX-Adresse.

Wenn die Börse die Einzahlung ablehnt, sendet sie die Mittel an die kurzlebige Adresse zurück. Deine Wallet muss sie finden und ausgeben können, daher fordert ZIP 320 Wallets dazu auf, kurzlebige Adressen aus deiner Seed-Phrase abzuleiten. Außerdem fordert es Wallets dazu auf, jedes Mal eine neue kurzlebige Adresse zu verwenden, damit separate Zahlungen nicht miteinander verknüpft werden können.

### Was die blockchain zeigt

Die TEX-Regel befindet sich in Wallets. Knoten überprüfen sie nicht, daher bleiben die Konsensregeln gleich. On-chain sieht eine Zahlung an eine TEX-Adresse genauso aus wie eine Zahlung an die entsprechende `t1`-Adresse. Der Betrag, die kurzlebige Adresse und die Adresse der Börse sind wie bei jeder transparenten Transaktion öffentlich.

## Verwandte Seiten

- [Verwahrte Börsen](/using-zcash/custodial-exchanges): Welche Börsen welche Adresstypen akzeptieren, einschließlich der TEX-Einzahlungen von Binance.
- [Wallets](/using-zcash/wallets): Verwende den Filter „TEX-Adresse“, um Wallets zu finden, die eine TEX-Adresse bezahlen können.
- [Abgeschirmte Pools](/using-zcash/shielded-pools): Wo sich dein privates Guthaben befindet, bevor eine TEX-Zahlung einen Teil davon herausverschiebt.
- [Wer kann deine Zcash-Zahlung sehen?](/start-here/who-can-see-your-zcash-payment): Was sichtbar wird, sobald Mittel den abgeschirmten Pool verlassen.
- [Was ein Block Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see): Wie eine transparente Zahlung on-chain erscheint.
- [Zcash Zahlungsanforderungs-URIs](/using-zcash/payment-request-uris): Ein weiterer Wallet-Standard für vorausgefüllte Zahlungen.

**Zuletzt aktualisiert:** Oktober 2026
