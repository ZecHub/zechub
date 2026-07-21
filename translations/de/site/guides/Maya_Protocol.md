# Maya Dezentrale Börse

---

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Wie man Ethereum auf LeoDex in Zcash tauscht"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Was ist Maya Protocol?

Maya ist ein System für [dezentralisierte Börsen](https://nym.com/blog/what-is-dex) (DEX), das den Handel von Kryptowährungen über verschiedene Blockchains hinweg ermöglicht. Du kannst zum Beispiel Bitcoin (BTC) auf der Bitcoin-Blockchain auf einfache Weise gegen Ethereum (ETH) auf der Ethereum-Blockchain tauschen, ohne die Vermögenswerte zu verwahren oder zentrale Instanzen beziehungsweise Know Your Customer (KYC)-Verfahren einzubeziehen.

Maya Protocol wurde mit dem Cosmos Software Development Kit (Cosmos SDK) entwickelt und basiert auf einem Proof of Bond (PoB)-Konsensmechanismus. Das Protokoll wird von „Node Operators“ getragen, die Kapital in das System einbringen und dafür als Belohnung für ihren Beitrag und ihre Bemühungen Erträge erhalten. Im Wesentlichen sind Nodes Computer, auf denen Software läuft, die Nutzer-Swaps validiert und Vermögenswerte auf bestimmten Adressen über verschiedene Blockchains hinweg überwacht.

Um einen Swap abzuschließen, muss die unterstützte Kryptowährung auf einer von Mayas Adressen eingehen, von einem Nutzer gesendet werden, und anschließend wird ein entsprechender Betrag von einer anderen Maya-Adresse auf einer anderen Blockchain versendet. Dieser Prozess wird von mindestens zwei Dritteln der Nodes verwaltet und genehmigt, wobei insbesondere sichergestellt wird, dass die Gelder ordnungsgemäß eingegangen sind.

Auf diese Weise können Nutzer einen Token-Typ auf einer Blockchain senden und einen anderen Typ auf einer anderen Blockchain erhalten – alles nativ und ohne Wrapped Tokens zu verwenden.

## Was ist Proof of Bond?

Proof of Bond (PoB) ist ein Konsensmechanismus, bei dem Node Operators eine Bond hinterlegen müssen (üblicherweise in Form des nativen Tokens des Netzwerks), um am Netzwerk teilzunehmen. Diese Bond dient als eine Form wirtschaftlicher Sicherheit und stellt sicher, dass Nodes ehrlich handeln und die Integrität des Netzwerks wahren2. Wenn ein Node versucht, böswillig zu handeln, oder seine Pflichten nicht erfüllt, kann seine Bond gekürzt werden, was bedeutet, dass ein Teil davon als Strafe entzogen wird.

In Maya Protocol hilft dieser Mechanismus dabei, aus den gestakten Ressourcen der Node Operators wirtschaftlichen Wert zu erzeugen und so die Kapitaleffizienz zu erhöhen. Ähnlich dazu hinterlegen Node Operators in Thorchain RUNE (den nativen Token), um das Netzwerk zu sichern und die Zusammenarbeit unter den Teilnehmern sicherzustellen.

## Unterschiede zwischen Maya und THORChain

Maya ist ein Fork von THORChain, verfügt aber über einige neue Merkmale und Funktionen, die es zu einer großartigen Alternative machen. Die wichtigsten davon sind

### Liquidity Nodes

Anstatt dem Pure Bond Model zu folgen, erwägt Maya einen Wechsel zu einem Liquidity-Nodes-Modell. In diesem System können Nodes direkt Liquidität beitragen und sie an das Netzwerk binden. Dieser Ansatz bedeutet, dass Node Operators einem erheblichen Risiko ausgesetzt sind: Wenn sie Gelder missbrauchen, erleiden sie Verluste, was als starke Abschreckung wirkt. Dadurch nutzen Node Operators Liquidity Units aus Liquidity Pools, die gleichzeitig Liquidität bereitstellen und die Sicherheit des Netzwerks stärken.

### Schutz vor Impermanent Loss

Ein System, das Liquiditätsanbieter vor dem vorübergehenden Verlust (LPs) schützt, den sie beim Bereitstellen von Liquidität aufgrund der ständigen Schwankungen der Preise von Krypto-Assets erleben können.
ILP hält 10 % des $CACAO-Angebots (10 Millionen $CACAO) und wird fortlaufend durch 10 % der Protokollgebühren aufgefüllt. ILP wird 50 Tage nach einer Liquiditätseinlage aktiv, wobei die Abdeckung auf 100 % begrenzt ist.

Die Dauer der ILP-Abdeckung hängt von der Performance des ASSET und von $CACAO ab. Eine vollständige Abdeckung wird nach 150 Tagen erreicht, wenn sich ASSET besser entwickelt, und nach 450 Tagen, wenn sich $CACAO besser entwickelt. ILP wird bei vollständiger Auszahlung sowohl ausgezahlt als auch zurückgesetzt, wird jedoch von teilweisen Auszahlungen nicht beeinflusst. Bei Aufstockungen wird ILP zurückgesetzt, aber nicht ausgezahlt.

### Ein anderes Zuteilungsmodell

Die Liquidity Auction war ein 21-tägiges Ereignis, das dazu diente, $CACAO-Token unter den Teilnehmern zu verteilen. Während des Ereignisses zahlten Nutzer unterstützte Assets auf eine bestimmte Adresse ein. Nach Abschluss der Auktion wurden 90 % der $CACAO-Token proportional zu ihren Liquiditätsbeiträgen an die Teilnehmer zugeteilt, während die verbleibenden 10 % der ILP-Reserve zugewiesen wurden. Die Teilnehmer wurden zu Liquiditätsanbietern, wobei ihre eingezahlten Assets und $CACAO-Token in Mayas Pools eingebracht wurden, sodass sie einen Anteil an den generierten Gebühren verdienen konnten.

### Eine andere Art, Reserven zu handhaben

Bei der Entstehung von Maya Protocol betrugen die verfügbaren CACAO-Reserven nur 10 % des Gesamtangebots, verglichen mit 44 % bei THORChain, und waren in erster Linie für den Schutz vor Impermanent Loss (ILP) vorgesehen. Maya hat keine Block-Emissionen; und falls Protocol Owned Liquidity und Lending implementiert werden, werden sie ein anderes Design aufweisen, da diese Aspekte bei THORChain eng mit den Reserven verknüpft sind.

Trotz seiner Unterschiede dient Maya jedoch auch als ergänzende Lösung zu THORChain, indem es Redundanz, Erweiterung und Validierung bietet und neue Netzwerke integriert, die in der aktuellen THORChain-Implementierung nicht vorhanden sind.

Außerdem ist Mayas Ziel, ein *Backend* für andere Dienste zu werden, auf dem diese aufbauen können, in der Hoffnung, viele neue *Frontends* oder DEX-Dienste zu sehen, die auf Mayas Infrastruktur aufgebaut sind.
## Maya-Protokoll-Wallet-Integration

Als *Backend* muss Maya von verschiedenen UIs und Wallets unterstützt werden, um genutzt werden zu können. 
Hier ist eine Liste einiger Dienste, die Maya bereits unterstützen:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet und Rabby.

[XDEFI](https://www.xdefi.io/): eine Self-Custody-Wallet für mehrere Ökosysteme mit Unterstützung für mehr als 30 native Blockchains sowie alle EVM- und Cosmos-Chains, einschließlich Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON und mehr.

[KeepKey ](https://keepkey.com/): Eine Hardware-Wallet zur sicheren Aufbewahrung digitaler Vermögenswerte.
