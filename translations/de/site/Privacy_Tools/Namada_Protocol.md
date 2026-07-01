[![Seite bearbeiten](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada-Logo](https://i.ibb.co/BZcZHS1/logo.png)


## Was ist Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash erklärt: Strategische Allianz Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocol dient als eine auf Proof-of-Stake-Konsens basierende Layer-1-Plattform, die darauf ausgelegt ist, kettenübergreifende, asset-agnostische Privatsphäre bereitzustellen. Durch das Inter-Blockchain Communication (IBC)-Protokoll integriert sich Namada nahtlos mit Chains mit schneller Finalität und ermöglicht so eine reibungslose Interoperabilität. Zusätzlich etabliert Namada eine vertrauenslose bidirektionale Brücke zu Ethereum, die eine sichere und zuverlässige Kommunikation zwischen den beiden Netzwerken ermöglicht.

Namada priorisiert Privatsphäre durch die Implementierung einer erweiterten Version des Multi-Asset Shielded Pool (MASP)-Schaltkreises. Diese verbesserte Version ermöglicht es allen Arten von Assets, einschließlich fungibler und nicht-fungibler Token, einen gemeinsamen abgeschirmten Pool zu nutzen, genau wie bei Zcash. Dadurch wird die Übertragung unterstützter Assets auf Namada besonders schwer zu identifizieren, da ein hohes Maß an Privatsphäre gewährleistet wird. Außerdem ermöglicht das neueste Update des Multi Asset Shielded Pool-Schaltkreises Belohnungen für den abgeschirmten Pool, eine bahnbrechende Funktion bzw. ein Anreizsystem, das Ressourcen zuweist, um Privatsphäre als öffentliches Gut zu fördern.

## Ethereum-Brücke + IBC-kompatibel

Die Integration der Ethereum-Brücke in Namada macht ein separates Protokoll überflüssig, da sie zu einem integralen Bestandteil des Namada-Ökosystems wird. Validatoren innerhalb von Namada sind damit betraut, die Brücke zusammen mit dem Kernprotokoll von Namada zu betreiben. Diese Validatoren fungieren auch als Relayer, wenn es um die Übertragung von Assets zu Namada geht, wodurch die Beteiligung zusätzlicher Akteure unnötig wird. Bei der Übertragung von Assets zu Ethereum hingegen sind externe Parteien (bekannt als Relayer) beteiligt, obwohl sie keine Verantwortung für die Validierung oder Absicherung der Brücke tragen.

![Diagramm der Ethereum-Brücke](https://i.ibb.co/wKds5RP/image.jpg)

Namada Protocol kann sich außerdem nahtlos mit jeder Chain mit schneller Finalität verbinden, die das Inter-Blockchain Communication (IBC)-Protokoll unterstützt. Wenn es um die Interoperabilität mit Ethereum geht, implementiert Namada eine spezialisierte und sichere Ethereum-Brücke, die vertrauenslos arbeitet. Diese Brücke ist sorgfältig darauf ausgelegt, Sicherheit zu priorisieren, indem sie Flusskontrollen für alle Brückenverbindungen durchsetzt und fehlerhafte Ethereum-Transfers als schwerwiegendes Vergehen behandelt, das zu Slashing-Strafen führen kann.

## Belohnungen für den abgeschirmten Pool

Im neuesten Update des [Namada Protocol](https://blog.namada.net/what-is-namada/) werden Nutzer, die abgeschirmte Assets halten, dazu angereizt, aktiv am gemeinsamen abgeschirmten Pool teilzunehmen. Möglich wird dies durch die Integration des aktualisierten MASP-Schaltkreises, der nun den innovativen Convert Circuit enthält. Durch die Nutzung dieser neuen Funktion ermutigt Namada Nutzer, durch das Halten abgeschirmter Assets zum gemeinsamen abgeschirmten Pool beizutragen.

In Namada wird der abgeschirmte Pool als nicht-exklusives und anti-rivales öffentliches Gut betrachtet. Das bedeutet, dass sich das Niveau der Privatsphäre-Garantien für jeden Teilnehmer verbessert, je mehr Personen abgeschirmte Übertragungen nutzen. Das Protokoll erkennt die Bedeutung kollektiver Akzeptanz und Beteiligung für die Verbesserung der Privatsphäre aller Nutzer an. Indem Namada Nutzer dazu anreizt, abgeschirmte Assets zu halten und zum gemeinsamen abgeschirmten Pool beizutragen, fördert es daher ein stärkeres und robusteres Privatsphäre-Ökosystem.

## Transaktion mit abgeschirmten Assets

Wenn es um abgeschirmte Übertragungen geht, sind ein Ethereum Non-Fungible Token (NFT), ATOM oder NAM nicht voneinander zu unterscheiden. Das bedeutet, dass die durch MASP (Modified Accumulator Sapling Protocol) bereitgestellten, die Privatsphäre schützenden Funktionen – eine verbesserte Version des Zcash Sapling-Schaltkreises – einheitlich auf alle Arten von Assets angewendet werden. Der MASP-Schaltkreis ermöglicht es allen Assets innerhalb des Namada-Ökosystems, denselben abgeschirmten Pool zu teilen. Dieser Ansatz stellt sicher, dass Privatsphäre-Garantien nicht auf einzelne Assets fragmentiert werden. Unabhängig vom Transaktionsvolumen eines bestimmten Assets bleibt der Schutz der Privatsphäre konsistent und unabhängig.

![Diagramm zu Transaktionen mit abgeschirmten Assets](https://i.ibb.co/7CDmWk6/image-1.png)

Durch die Vereinheitlichung des abgeschirmten Pools über verschiedene Assets hinweg stellt Namada sicher, dass die Privatsphäre einheitlich gewahrt bleibt, unabhängig vom spezifischen Asset-Typ, der an einer abgeschirmten Übertragung beteiligt ist. Dieser Ansatz fördert ein kohärentes Privatsphäre-Framework innerhalb des Protokolls und verbessert die Vertraulichkeit von Transaktionen mit Ethereum NFTs, ATOM, NAM und anderen unterstützten Assets. Namada ermöglicht außerdem die private Übertragung fungibler und nicht-fungibler Token mithilfe neuartiger zk-SNARKs und gewährleistet so Vertraulichkeit für native und nicht-native Token, genau wie es bei Zcash gemacht wird.

## Geringere Gebühren und schnelle Transaktionen

Namada kombiniert zwei Schlüsselelemente, um hohe Transaktionsgeschwindigkeit und Finalität zu liefern: schnelle Proof-Generierung und modernen Byzantine Fault Tolerant (BFT)-Konsens. Diese beiden Funktionen ermöglichen es Namada, eine Transaktionsverarbeitungsrate zu erreichen, die mit Visa vergleichbar ist, einem bekannten Zahlungsnetzwerk, das für seine hohe Durchsatzfähigkeit bekannt ist. Schnelle Proof-Generierung bezieht sich auf die effiziente Erstellung kryptografischer Proofs, die die Korrektheit und Integrität von Transaktionen auf der Blockchain validieren. Durch den Einsatz fortschrittlicher Techniken und Optimierungen minimiert Namada Protocol den Rechenaufwand, der zur Erstellung dieser Proofs erforderlich ist, was zu einer schnellen Verifizierung und Bestätigung von Transaktionen führt.

Zusätzlich nutzt Namada moderne BFT-Konsensalgorithmen, die die Integrität und Übereinstimmung von Transaktionen im gesamten Netzwerk sicherstellen. Diese Konsensmechanismen ermöglichen es Namada, einen Konsens über die Reihenfolge und Gültigkeit von Transaktionen zu erreichen, und liefern eine starke Garantie für Finalität. Mit Finalität gelten Transaktionen als unumkehrbar, wodurch das Risiko von Double-Spending oder Transaktions-Rollbacks reduziert wird. Namada verfolgt einen ähnlichen Ansatz wie Anoma, ein anderes Protokoll, das für seine Skalierungslösungen bekannt ist. Namada verwendet fraktale Instanzen, die die Erstellung verschachtelter Chains innerhalb der Haupt-Blockchain ermöglichen. Diese fraktale Struktur ermöglicht horizontale Skalierung, indem die Last auf mehrere Instanzen verteilt wird, was die Gesamtkapazität und Leistung des Netzwerks erhöht.

## Strategische Allianz zwischen Namada und Zcash

Laut einer aktuellen Veröffentlichung, die im [Namada Protocol Blog](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/) zu finden ist, freut sich das Team hinter Namada Protocol, einen Vorschlag und Request for Comment (RFC) für eine strategische Allianz zwischen den Assets, Chains und Communities von Namada und Zcash vorzustellen.

![Diagramm der strategischen Allianz Namada-Zcash](https://i.ibb.co/FqsmkMb/image-2.png)

Die vorgeschlagene Allianz umfasst drei primäre Elemente. Erstens wird ein Förderpool geschaffen, um Projekte zu finanzieren, die sowohl Zcash als auch Namada Vorteile bringen. Zweitens wird ein Airdrop von NAM-Token an ZEC-Inhaber zugeteilt. Schließlich gibt es einen Plan, eine vertrauensminimierte Brücke zwischen Zcash und Namada einzurichten. Sobald diese umgesetzt ist, wird diese Brücke ZEC-Inhabern, die als Zolders bezeichnet werden, ermöglichen, ihr ZEC auf Namada zu nutzen. Darüber hinaus werden Zolders die Möglichkeit haben, über Namada Zugang zu den breiteren Cosmos- und Ethereum-Ökosystemen zu erhalten. Mehr über die strategische Allianz erfährst du im [Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Referenzlinks

- [Offizielles Video von Namada Protocol](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Offizielle Website von Namada Protocol](https://namada.net/)
- [Namada-Blog](https://blog.namada.net/)
- [Namada-Dokumentation](https://docs.namada.net/)
