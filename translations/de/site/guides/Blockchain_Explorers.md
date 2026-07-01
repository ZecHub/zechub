<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Blockchain-Explorer

## Einführung

In der traditionellen Geschäftswelt enthält jede Transaktion einen Beleg als Kaufnachweis. Ebenso erhält ein Nutzer in der Blockchain-Welt für jede abgeschlossene Transaktion einen digitalen Beleg in Form einer Transaktions-ID. Die meisten Wallets stellen dir diese zur Verfügung. Blockchain-Explorer sind einfach Werkzeuge, mit denen man sichtbar machen kann, was bereits auf einer Blockchain passiert ist. Als Eingaben verwenden sie: Transaktions-IDs, Adressen oder Block-Hashes, und geben visuell aus, was stattgefunden hat.

## Beispiele
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (öffentlich): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privat): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Beachte bei Zcash, dass die zweite Transaktion alle wichtigen Details verbirgt; das ist wichtig und hat große Auswirkungen in einer digitalen Welt.


## Blockchain-Karten

Wir haben also diese lange Zeichenfolge als digitalen Beleg, und jetzt? Hier verwenden wir einen [Blockchain-Explorer](https://nym.com/blog/using-blockchain-privately), oder eine Karte, um besser zu verstehen, was auf der Blockchain passiert ist. Beachte, dass jede Chain oben ihre eigene Version eines [Blockchain-Explorers](https://nym.com/blog/using-blockchain-privately) hat. Es ist wichtig zu verstehen, dass all diese Blockchain-Projekte Beispiele für Open-Source-Software sind. Das bedeutet, dass jeder zum Code beitragen und/oder ihn nach eigenen Wünschen forken kann. Mit diesem Verständnis wird klar, dass sich jedes Projekt auf unterschiedliche Bereiche spezialisiert und den Blockchain-Explorer an die Anforderungen des jeweiligen Projekts anpasst.

### Blöcke
Transaktionen werden in *Blöcke* eingeordnet. Wenn ein Block gemined/validiert wird, wird jede Transaktion in diesem Block bestätigt und ein Block-Hash erstellt. Jeder erzeugte Hash kann in einen Block-Explorer eingegeben werden. Vielleicht hast du gesehen, dass CEXs eine bestimmte Anzahl an *Bestätigungen* benötigen, bevor sie deine Gelder freigeben; das ist die Kennzahl, die sie verwenden, um sicherzustellen, dass deine Transaktion 
ausreichend finalisiert ist. Wie bestimmt die Blockchain, welche Transaktionen in den nächsten Block gelangen? Ein komplexes Forschungsthema, aber die meisten modernen Chains nutzen das Konzept von *Gebühren*, um zu bestimmen, wer in der Warteschlange nach vorne rückt. Je höher die Gebühr, desto größer die Chance, weiter nach vorne in der Schlange zu kommen.

### Adressen

Eine unterhaltsame Möglichkeit, [Blockchain-Explorer](https://nym.com/blog/using-blockchain-privately) visuell zu verstehen, besteht darin, die Adresse einer beliebigen zufälligen Transaktion einzugeben. Dann kannst du in der Zeit zurückgehen und sehen, woher die Gelder ursprünglich kamen! Jede Transaktion hat sowohl eine Eingabe- als auch eine Ausgabeadresse. Mit diesen Informationen kann man sich leicht sowohl vorwärts als auch rückwärts von jeder bereits ausgegebenen Transaktion bewegen. Für alle, die Rätsel mögen, ist dies das digitale Äquivalent eines riesigen finanziellen Puzzles und kann für Transparenzzwecke genutzt werden. Die Verwendung eines Blockchain-Explorers macht dies nicht nur viel leichter sichtbar, sie *verdeutlicht auch* die Notwendigkeit von Transaktions-Privatsphäre. Solange du nicht abgeschirmtes Zcash verwendest, kannst du das mit *jeder* transparenten Blockchain tun: BTC, ETH, ATOM, DOGE, VTC usw. Dieser Punkt ist entscheidend für alle, die die Blockchain sicher nutzen, während wir uns in eine rein digitale Zukunft bewegen.

### Beträge

Ähnlich wie bei den oben genannten Adressen sind bei jeder Transaktion auf einer öffentlichen Blockchain auch die Beträge öffentlich sichtbar. Das umfasst die Beträge sowohl der Eingabe- als auch der Ausgabeadressen jeder Transaktion. Eine Ausnahme ist, wenn du dich dafür entscheidest, Shielded Zcash zu verwenden -- dann sind alle Beträge verborgen. Für Kleinunternehmer, die für *fairen Handel* zwingend Privatsphäre benötigen, ist das ein großer Vorteil!

![Beträge](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Was ein Explorer bei Zcash sehen kann und was nicht

#### TL;DR
- Transparente (`t`) Adressen sind in einem Explorer vollständig sichtbar, genau wie bei Bitcoin
- Vollständig abgeschirmte (z zu z) Transaktionen verbergen den Betrag, die Adressen und das Memo
- Die Gebühr bleibt weiterhin sichtbar, selbst bei einer vollständig abgeschirmten Transaktion
- Shielding (das Verschieben von `t` in abgeschirmt) und Deshielding (abgeschirmt zurück zu `t`) sind teilweise sichtbar, weil eine Seite transparent ist
- Privatsphäre bleibt nur erhalten, solange die Gelder innerhalb der abgeschirmten Pools bleiben

Zcash hat mehr als eine Art von Adresse, und ein Explorer behandelt sie sehr unterschiedlich.

Transparente Adressen, die mit `t` beginnen, funktionieren wie bei Bitcoin. Ein Explorer zeigt den Absender, den Empfänger, den Betrag und die Spur zurück zu dem Punkt, von dem die Gelder kamen.

Abgeschirmte Adressen sind die private Seite. Gelder in den Sapling- oder Orchard-[shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) sind durch Zero-Knowledge-Beweise geschützt. Wenn du eine vollständig abgeschirmte Transaktion nachschlägst, kann der Explorer weder den Betrag noch die Adressen oder das Memo anzeigen. Er kann nur bestätigen, dass eine gültige Transaktion stattgefunden hat und in einem Block aufgezeichnet wurde. Dies ist das verborgene private Beispiel, das oben auf dieser Seite gezeigt wird.

Ein Detail bleibt selbst bei vollständig abgeschirmten Transaktionen sichtbar: die Gebühr. Die Konsensregeln von Zcash verlangen, dass die transparente Gebühr ausdrücklich angegeben wird, daher kann ein Explorer sie immer anzeigen, auch wenn die Beträge verschleiert sind. Aus diesem Grund ist es gute Praxis, die Standardgebühr der Wallet zu verwenden, damit deine Transaktion nicht durch einen ungewöhnlichen Betrag auffällt.

Der Explorer kann auch erkennen, wenn Gelder zwischen der transparenten und der abgeschirmten Seite wechseln. Das Verschieben von `t`-Geldern in einen Pool ist Shielding, das Zurückholen ist Deshielding. Diese Übergänge sind teilweise sichtbar, weil eine Seite transparent ist. Nur vollständig private z-zu-z-Aktivität, die niemals eine `t`-Adresse berührt, hält alles außer der Gebühr verborgen.

Die wichtigste Erkenntnis: Privatsphäre hängt davon ab, innerhalb der abgeschirmten Pools zu bleiben. Sobald Gelder eine `t`-Adresse berühren, ist dieser Teil ihrer Historie so öffentlich wie bei Bitcoin. Um deine eigene abgeschirmte Aktivität gegenüber jemandem deiner Wahl nachzuweisen, etwa einem Buchhalter, teile einen Viewing Key, anstatt sie öffentlich zu machen. Siehe die Seite [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Visueller Leitfaden

Hier sind vier gute Beispiele für verschiedene Blockchain-Explorer:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash-Block-Explorer](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
