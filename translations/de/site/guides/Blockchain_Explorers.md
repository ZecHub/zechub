<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Blockchain-Explorer

## Einführung

In der traditionellen Geschäftswelt enthält jede Transaktion einen Kaufbeleg als Nachweis des Erwerbs. Ebenso erhält ein Nutzer in der Blockchain-Welt für jede abgeschlossene Transaktion einen digitalen Beleg in Form einer Transaktions-ID. Die meisten Wallets stellen diesen für dich bereit. Blockchain-Explorer sind einfach Werkzeuge, die es ermöglichen, darzustellen, was bereits auf einer Blockchain geschehen ist. Sie nehmen Transaktions-IDs, Adressen oder Block-Hashes als Eingabe entgegen und zeigen visuell an, was stattgefunden hat.

## Beispiele
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (öffentlich): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privat): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Beachte bei Zcash, dass bei der zweiten Transaktion alle wichtigen Details verborgen sind. Das ist wichtig und hat große Auswirkungen in einer digitalen Welt.


## Blockchain-Karten

Wir haben also diese lange Zeichenfolge als digitalen Beleg – und nun? Hier verwenden wir einen [Blockchain-Explorer](https://nym.com/blog/using-blockchain-privately) oder eine Karte, um besser zu verstehen, was auf der Blockchain passiert ist. Beachte oben, dass jede Chain ihre eigene Version eines [Blockchain-Explorers](https://nym.com/blog/using-blockchain-privately) hat. Es ist wichtig zu verstehen, dass all diese Blockchain-Projekte Beispiele für Open-Source-Software sind. Das heißt, jeder kann zum Code beitragen und/oder ihn nach eigenen Vorstellungen forken. Mit diesem Verständnis spezialisiert sich jedes Projekt auf unterschiedliche Bereiche und passt den Blockchain-Explorer an die Bedürfnisse des jeweiligen Projekts an.

### Blöcke
Transaktionen werden in *Blöcke* aufgenommen. Wenn ein Block geschürft/validiert wird, wird jede Transaktion innerhalb dieses Blocks bestätigt und ein Block-Hash erstellt. Jeder erzeugte Hash kann in einen Block-Explorer eingegeben werden. Vielleicht hast du gesehen, dass CEXs eine bestimmte Anzahl an *Bestätigungen* benötigen, bevor sie deine Gelder freigeben; anhand dieser Kennzahl stellen sie sicher, dass deine Transaktion ausreichend finalisiert ist. Wie bestimmt die Blockchain, welche Transaktionen in den nächsten Block gelangen? Das ist ein komplexes Forschungsthema, aber die meisten modernen Chains nutzen *Gebühren*, um zu bestimmen, wer an den Anfang der Warteschlange kommt. Je höher die Gebühr, desto höher die Chance, weiter nach vorne in der Warteschlange zu rücken.

### Adressen

Eine unterhaltsame Art, [Blockchain-Explorer](https://nym.com/blog/using-blockchain-privately) visuell kennenzulernen, ist die Eingabe der Adresse einer beliebigen zufälligen Transaktion. Dann kannst du zeitlich zurückgehen und sehen, woher die Gelder stammen! Jede Transaktion besitzt sowohl eine Eingabe- als auch eine Ausgabeadresse. Mit dieser Information kann man sich von jeder ausgegebenen Transaktion aus sowohl vorwärts als auch rückwärts bewegen. Für Rätselfreunde ist dies das digitale Äquivalent eines riesigen Finanzpuzzles und könnte für Transparenzzwecke genutzt werden. Ein Blockchain-Explorer macht dies nicht nur deutlich leichter sichtbar, sondern *verdeutlicht auch* die Notwendigkeit von Transaktionsprivatsphäre. Sofern du kein abgeschirmtes Zcash verwendest, kannst du dies bei *jeder* transparenten Blockchain tun: BTC, ETH, ATOM, DOGE, VTC usw. ... . Dieser Punkt ist entscheidend für alle, die die Blockchain auf dem Weg in eine ausschließlich digitale Zukunft sicher nutzen möchten.

### Beträge

Ähnlich wie bei den oben genannten Adressen sind bei jeder Transaktion auf einer öffentlichen Blockchain die Beträge öffentlich und für alle sichtbar. Dies umfasst die Beträge sowohl der Eingabe- als auch der Ausgabeadressen jeder Transaktion. Eine Ausnahme besteht, wenn du dich für Shielded Zcash entscheidest – dann sind alle Beträge verborgen. Für Kleinunternehmer, die für *fairen Handel* unbedingt Privatsphäre benötigen, ist dies ein großer Vorteil!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Was ein Explorer bei Zcash sehen kann und was nicht

#### TL;DR
- Transparente (`t`) Adressen sind in einem Explorer vollständig sichtbar, genau wie bei Bitcoin
- Vollständig abgeschirmte (z zu z) Transaktionen verbergen den Betrag, die Adressen und das Memo
- Die Gebühr bleibt selbst bei einer vollständig abgeschirmten Transaktion sichtbar
- Shielding (Verschieben von `t` zu abgeschirmt) und Deshielding (abgeschirmt zurück zu `t`) sind teilweise sichtbar, weil eine Seite transparent ist
- Privatsphäre bleibt nur erhalten, solange sich die Gelder innerhalb der abgeschirmten Pools befinden

Zcash hat mehr als eine Art von Adresse, und ein Explorer behandelt sie sehr unterschiedlich.

Transparente Adressen, die mit `t` beginnen, funktionieren wie bei Bitcoin. Ein Explorer zeigt den Absender, den Empfänger, den Betrag und die Spur zurück zu dem Ort, von dem die Gelder stammen.

Abgeschirmte Adressen sind die private Seite. Gelder in den Sapling- oder Orchard-[abgeschirmten Pools](https://zechub.wiki/using-zcash/shielded-pools#content) werden durch Zero-Knowledge-Proofs geschützt. Suche eine vollständig abgeschirmte Transaktion, und der Explorer kann weder den Betrag noch die Adressen oder das Memo anzeigen. Er kann nur bestätigen, dass eine gültige Transaktion stattgefunden hat und in einem Block aufgezeichnet wurde. Dies ist das versteckte private Beispiel, das oben auf dieser Seite gezeigt wird.

Ein Detail bleibt selbst bei vollständig abgeschirmten Transaktionen sichtbar: die Gebühr. Die Zcash-Konsensregeln verlangen, dass die transparente Gebühr ausdrücklich angegeben wird. Daher kann ein Explorer sie immer anzeigen, selbst wenn die Beträge verschleiert sind. Deshalb ist es sinnvoll, die Standard-Wallet-Gebühr zu verwenden, damit deine Transaktion nicht durch die Zahlung eines ungewöhnlichen Betrags auffällt.

Der Explorer kann auch sehen, wenn Gelder zwischen der transparenten und der abgeschirmten Seite wechseln. Das Verschieben von `t`-Geldern in einen Pool wird Shielding genannt, das Zurückverschieben Deshielding. Diese Übergänge sind teilweise sichtbar, weil eine Seite transparent ist. Nur vollständig private z-zu-z-Aktivitäten, die niemals eine `t`-Adresse berühren, halten alles außer der Gebühr verborgen.

Die wichtigste Erkenntnis: Privatsphäre hängt davon ab, innerhalb der abgeschirmten Pools zu bleiben. Sobald Gelder eine `t`-Adresse berühren, ist dieser Teil ihrer Historie so öffentlich wie bei Bitcoin. Um deine eigene abgeschirmte Aktivität einer Person deiner Wahl nachzuweisen, beispielsweise einem Buchhalter, teile einen Viewing Key, statt sie öffentlich zu machen. Siehe die Seite [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Liste der Zcash Block Explorer

- [Zcash Block Explorer](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### Visuelle Anleitung

Hier sind vier gute Beispiele für verschiedene Blockchain-Explorer:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
