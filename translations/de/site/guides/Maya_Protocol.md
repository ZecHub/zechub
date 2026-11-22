<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Maya Decentralised Exchange

> Maya Protocol ist eine Cross-Chain-DEX für native Swaps (zum Beispiel ETH oder BTC zu ZEC) ohne Wrapped Tokens, Konten oder KYC.

## Kurz gesagt

* Maya tauscht native Coins über Blockchains hinweg: Du sendest einen Vermögenswert und erhältst einen anderen auf dessen eigener Blockchain. Keine Wrapped Tokens, kein Konto, kein KYC.
* Es ist ein Fork von THORChain, wurde mit dem Cosmos SDK entwickelt und durch Knotenbetreiber abgesichert, die Kapital hinterlegen (Proof of Bond).
* Sein nativer Token ist $CACAO. Liquiditätsanbieter verdienen Swap-Gebühren und sind nach 50 Tagen durch den Impermanent Loss Protection (ILP) abgesichert.
* Maya ist ein Backend: Du nutzt es über ein Frontend oder eine Wallet wie THORWallet, CacaoSwap, Asgardex, Ctrl Wallet oder KeepKey.
* Das Tutorialvideo zeigt einen ETH-zu-ZEC-Swap auf LeoDex, einem dieser Frontends.
* Maya unterstützt Einzahlungen von abgeschirmtem/einheitlichem ZEC über SwapKit (transparenten Wert-Output plus abgeschirmte Memo), sodass manche Frontends ZEC direkt an eine einheitliche Adresse senden können. Wenn deine Auszahlung an eine transparente (t1-)Adresse geht, schirme sie anschließend in deiner Wallet ab, um deine Privatsphäre zu schützen.
* Maya ist nicht die einzige Option für native ZEC-Swaps: THORChain hat ebenfalls einen nativen ZEC-Pool.

## Kernerklärung

Eine zentralisierte Börse verwahrt deine Coins und verlangt deine Identität. Maya nutzt stattdessen ein Netzwerk aus Knoten, die Tresore auf jeder unterstützten Chain kontrollieren. Du sendest Coins an einen Maya-Tresor, mindestens zwei Drittel der Knoten bestätigen die Einzahlung und der entsprechende Vermögenswert wird aus einem anderen Tresor an deine Adresse auf der Ziel-Chain gesendet.

Knotenbetreiber hinterlegen eine Sicherheit, die bei Fehlverhalten gekürzt werden kann. Das gibt ihnen einen finanziellen Anreiz, ehrlich zu bleiben. Maya ergänzt THORChain um Funktionen wie Liquiditätsknoten und ein eigenes Reservekonzept und fungiert außerdem als zweites, unabhängiges Netzwerk daneben.

Die folgenden Abschnitte behandeln, wie Maya funktioniert, Proof of Bond, worin es sich von THORChain unterscheidet und welche Wallets es unterstützen.

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

Proof of Bond (PoB) ist ein Konsensmechanismus, bei dem Knotenbetreiber eine Sicherheit hinterlegen müssen (üblicherweise in Form des nativen Tokens des Netzwerks), um am Netzwerk teilzunehmen. Diese Sicherheit dient als wirtschaftliche Absicherung und stellt sicher, dass Knoten ehrlich handeln und die Integrität des Netzwerks wahren. Versucht ein Knoten, böswillig zu handeln, oder erfüllt er seine Pflichten nicht, kann seine Sicherheit gekürzt werden. Das bedeutet, dass ein Teil davon als Strafe eingezogen wird.

Im Maya Protocol trägt dieser Mechanismus dazu bei, wirtschaftlichen Wert aus den hinterlegten Ressourcen der Knotenbetreiber zu erzeugen und die Kapitaleffizienz zu erhöhen. Ähnlich hinterlegen Knotenbetreiber bei THORChain RUNE (den nativen Token), um das Netzwerk abzusichern und die Zusammenarbeit der Teilnehmenden zu gewährleisten.

## Unterschiede zwischen Maya und THORChain

Maya ist ein Fork von THORChain, verfügt jedoch über einige neue Funktionen und Funktionalitäten, die es zu einer großartigen Alternative machen. Die wichtigsten sind

### Liquiditätsknoten

Anstatt dem Pure Bond Model zu folgen, erwägt Maya einen Wechsel zu einem Liquidity-Nodes-Modell. In diesem System können Knoten direkt Liquidität beitragen und sie im Netzwerk hinterlegen. Dieser Ansatz bedeutet, dass Knotenbetreiber einem erheblichen Risiko ausgesetzt sind: Wenn sie Gelder missbrauchen, erleiden sie Verluste, was eine starke Abschreckung darstellt. Dadurch verwenden Knotenbetreiber Liquidity Units aus Liquidity Pools, die gleichzeitig Liquidität bereitstellen und die Netzwerksicherheit stärken.

### Schutz vor unbeständigem Verlust

Ein System, das Liquiditätsanbieter (LPs) vor den vorübergehenden Verlusten schützt, die ihnen bei der Bereitstellung von Liquidität durch die ständigen Preisschwankungen von Krypto-Assets entstehen können.
ILP hält 10 % des Angebots von $CACAO (10 Millionen $CACAO) und wird kontinuierlich mit 10 % der Protokollgebühren aufgefüllt. ILP wird 50 Tage nach einer Liquiditätseinlage aktiv; die Deckung ist auf 100 % begrenzt.

Die Dauer der ILP-Deckung hängt von der Performance von ASSET und $CACAO ab. Volle Deckung wird nach 150 Tagen erreicht, wenn ASSET besser abschneidet, und nach 450 Tagen, wenn $CACAO besser abschneidet. ILP wird bei einer vollständigen Auszahlung sowohl ausgezahlt als auch zurückgesetzt, bleibt jedoch von Teilauszahlungen unberührt. Bei Aufstockungen wird ILP zurückgesetzt, aber nicht ausgezahlt.

### Ein anderes Zuteilungsmodell

Die Liquiditätsauktion war ein 21-tägiges Ereignis, bei dem $CACAO-Token unter den Teilnehmenden verteilt werden sollten. Während des Ereignisses zahlten die Nutzer unterstützte Vermögenswerte an eine bestimmte Adresse ein. Nach Abschluss der Auktion wurden 90 % der $CACAO-Token den Teilnehmenden entsprechend ihrem jeweiligen Liquiditätsbeitrag zugeteilt, während die übrigen 10 % der ILP-Reserve zugewiesen wurden. Die Teilnehmenden wurden zu Liquiditätsanbietern; ihre eingezahlten Vermögenswerte und $CACAO-Token wurden in die Pools von Maya eingebracht, sodass sie einen Anteil an den erzielten Gebühren verdienen konnten.

### Eine andere Art, Reserven zu handhaben

Bei der Entstehung von Maya Protocol betrugen die verfügbaren CACAO-Reserven nur 10 % des Gesamtangebots, verglichen mit 44 % bei THORChain, und waren hauptsächlich für den Schutz vor unbeständigem Verlust (ILP) vorgesehen. Maya hat keine Blockemissionen; und falls Protocol Owned Liquidity und Lending implementiert werden, werden sie ein anderes Design aufweisen, da diese Aspekte bei THORChain eng mit den Reserven verknüpft sind.

Trotz seiner Unterschiede dient Maya auch als ergänzende Lösung zu THORChain, bietet Redundanz, Erweiterung und Validierung und integriert neue Netzwerke, die in der aktuellen THORChain-Implementierung nicht vorhanden sind.

Außerdem besteht das Ziel von Maya darin, ein *Backend* für andere Dienste zu werden, auf dem diese aufbauen können, in der Hoffnung, dass zahlreiche neue *Frontends* oder DEX-Dienste auf der Infrastruktur von Maya entstehen.

## Wallet-Integration des Maya Protocol

Als *Backend* muss Maya von verschiedenen Benutzeroberflächen und Wallets unterstützt werden, damit es genutzt werden kann. 
Hier ist eine Liste einiger Dienste, die Maya bereits unterstützen:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: nicht mehr online, die Domain lässt sich nicht auflösen.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: nicht mehr online, seine Domain wird nicht aufgelöst.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): eine Self-Custody-Wallet für mehrere Ökosysteme mit Unterstützung für mehr als 30 native Blockchains sowie alle EVM- und Cosmos-Chains, einschließlich Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON und weiteren.

[KeepKey ](https://keepkey.com/): Eine Hardware-Wallet zur sicheren Aufbewahrung digitaler Vermögenswerte.
