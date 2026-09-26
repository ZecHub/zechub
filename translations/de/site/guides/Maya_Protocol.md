# Maya Decentralised Exchange

---

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Was ist das Maya Protocol?

Maya ist ein System für eine [dezentralisierte Börse](https://nym.com/blog/what-is-dex) (DEX), das den Handel mit Kryptowährungen über verschiedene Blockchains hinweg ermöglicht. Du kannst beispielsweise Bitcoin (BTC) auf der Bitcoin-Blockchain unkompliziert gegen Ethereum (ETH) auf der Ethereum-Blockchain tauschen, ohne die Vermögenswerte selbst halten zu müssen oder zentrale Instanzen bzw. Know-Your-Customer-(KYC)-Verfahren einzubeziehen.

Maya Protocol wurde mit dem Cosmos Software Development Kit (Cosmos SDK) entwickelt und nutzt einen Proof-of-Bond-(PoB)-Konsensmechanismus. Das Protokoll wird von „Knotenbetreibern“ aufrechterhalten, die Kapital im System hinterlegen und als Belohnung für ihren Beitrag und ihre Bemühungen Erträge erhalten. Im Wesentlichen sind Knoten Computer, auf denen Software läuft, die Nutzertausche validiert und Vermögenswerte in festgelegten Adressen über verschiedene Blockchains hinweg überwacht.

Um einen Tausch abzuschließen, muss die unterstützte Kryptowährung von einem Nutzer an einer von Mayas Adressen eingehen; anschließend wird ein entsprechender Betrag von einer anderen Maya-Adresse auf einer anderen Blockchain gesendet. Dieser Prozess wird von mindestens zwei Dritteln der Knoten verwaltet und genehmigt, wodurch insbesondere sichergestellt wird, dass die Gelder ordnungsgemäß eingegangen sind.

Auf diese Weise können Nutzer einen Tokentyp auf einer Blockchain senden und einen anderen Tokentyp auf einer anderen Blockchain erhalten – vollständig nativ und ohne Wrapped Tokens zu verwenden.

## Was ist Proof of Bond?

Proof of Bond (PoB) ist ein Konsensmechanismus, bei dem Knotenbetreiber eine Sicherheit hinterlegen müssen (üblicherweise in Form des nativen Tokens des Netzwerks), um am Netzwerk teilzunehmen. Diese Sicherheit dient als wirtschaftliche Absicherung und stellt sicher, dass Knoten ehrlich handeln und die Integrität des Netzwerks wahren2. Wenn ein Knoten böswillig handelt oder seine Pflichten nicht erfüllt, kann seine Sicherheit gekürzt werden, das heißt, ein Teil davon wird ihm als Strafe entzogen.

Im Maya Protocol trägt dieser Mechanismus dazu bei, wirtschaftlichen Wert aus den hinterlegten Ressourcen der Knotenbetreiber zu erzeugen und die Kapitaleffizienz zu erhöhen. Ähnlich hinterlegen Knotenbetreiber bei THORChain RUNE (den nativen Token), um das Netzwerk abzusichern und die Zusammenarbeit der Teilnehmenden zu gewährleisten.

## Unterschiede zwischen Maya und THORChain

Maya ist ein Fork von THORChain, verfügt jedoch über einige neue Funktionen und Funktionalitäten, die es zu einer großartigen Alternative machen. Die wichtigsten sind

### Liquiditätsknoten

Anstatt dem Pure Bond Model zu folgen, erwägt Maya einen Wechsel zu einem Liquidity-Nodes-Modell. In diesem System können Knoten direkt Liquidität beitragen und sie im Netzwerk hinterlegen. Dieser Ansatz bedeutet, dass Knotenbetreiber einem erheblichen Risiko ausgesetzt sind: Wenn sie Gelder missbrauchen, erleiden sie Verluste, was eine starke Abschreckung darstellt. Dadurch verwenden Knotenbetreiber Liquidity Units aus Liquidity Pools, die gleichzeitig Liquidität bereitstellen und die Netzwerksicherheit stärken.

### Schutz vor unbeständigem Verlust

Ein System, das Liquiditätsanbieter vor dem vorübergehenden Verlust (LPs) schützt, den sie aufgrund der ständigen Preisschwankungen von Krypto-Assets beim Bereitstellen von Liquidität erleiden können.
ILP hält 10 % des $CACAO-Angebots (10 Millionen $CACAO) und wird kontinuierlich durch 10 % der Protokollgebühren aufgefüllt. ILP wird 50 Tage nach einer Liquiditätseinzahlung aktiv, wobei die Deckung auf 100 % begrenzt ist.

Die Dauer der ILP-Deckung hängt von der Performance von ASSET und $CACAO ab. Volle Deckung wird nach 150 Tagen erreicht, wenn ASSET besser abschneidet, und nach 450 Tagen, wenn $CACAO besser abschneidet. ILP wird bei einer vollständigen Auszahlung sowohl ausgezahlt als auch zurückgesetzt, bleibt jedoch von Teilauszahlungen unberührt. Bei Aufstockungen wird ILP zurückgesetzt, aber nicht ausgezahlt.

### Ein anderes Zuteilungsmodell

Die Liquidity Auction war ein 21-tägiges Ereignis, das dazu diente, $CACAO-Token unter den Teilnehmenden zu verteilen. Während des Ereignisses hinterlegten Nutzer unterstützte Assets an einer bestimmten Adresse. Am Ende der Auktion wurden 90 % der $CACAO-Token den Teilnehmenden im Verhältnis zu ihren Liquiditätsbeiträgen zugeteilt, während die restlichen 10 % der ILP-Reserve zugewiesen wurden. Die Teilnehmenden wurden zu Liquiditätsanbietern; ihre hinterlegten Assets und $CACAO-Token wurden in Mayas Pools eingebracht, wodurch sie einen Anteil an den generierten Gebühren verdienen konnten.

### Eine andere Art, Reserven zu handhaben

Bei der Entstehung von Maya Protocol betrugen die verfügbaren CACAO-Reserven nur 10 % des Gesamtangebots, verglichen mit 44 % bei THORChain, und waren hauptsächlich für den Schutz vor unbeständigem Verlust (ILP) vorgesehen. Maya hat keine Blockemissionen; und falls Protocol Owned Liquidity und Lending implementiert werden, werden sie ein anderes Design aufweisen, da diese Aspekte bei THORChain eng mit den Reserven verknüpft sind.

Trotz seiner Unterschiede dient Maya auch als ergänzende Lösung zu THORChain, bietet Redundanz, Erweiterung und Validierung und integriert neue Netzwerke, die in der aktuellen THORChain-Implementierung nicht vorhanden sind.

Außerdem ist es Mayas Ziel, ein *Backend* zu werden, auf dem andere Dienste aufbauen können, in der Hoffnung, zahlreiche neue *Frontends* oder DEX-Dienste zu sehen, die auf Mayas Infrastruktur aufbauen.

## Wallet-Integration des Maya Protocol

Als *Backend* muss Maya von verschiedenen Benutzeroberflächen und Wallets unterstützt werden, damit es genutzt werden kann. 
Hier ist eine Liste einiger Dienste, die Maya bereits unterstützen:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: nicht mehr online, seine Domain wird nicht aufgelöst.

[XDEFI](https://www.xdefi.io/): eine Self-Custody-Wallet für mehrere Ökosysteme mit Unterstützung für mehr als 30 native Blockchains sowie alle EVM- und Cosmos-Chains, einschließlich Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON und weiteren.

[KeepKey ](https://keepkey.com/): Eine Hardware-Wallet zur sicheren Aufbewahrung digitaler Vermögenswerte.
