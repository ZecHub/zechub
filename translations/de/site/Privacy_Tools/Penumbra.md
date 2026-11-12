# Penumbra 

Penumbra ist ein vollständig abgeschirmtes Proof-of-Stake-Layer-1-Netzwerk und eine dezentrale Börse im Cosmos-Ökosystem. Sein kettenübergreifender abgeschirmter Pool kann Vermögenswerte von über IBC verbundenen Chains halten. Nutzer können innerhalb von Penumbra transferieren, staken, tauschen und Liquidität bereitstellen, ohne ihre individuellen Kontostände zu veröffentlichen oder diese Aktionen mit ihrer Identität zu verknüpfen. Das bedeutet nicht, dass alle Netzwerk- oder DEX-Daten privat sind.

![image.png](/content-images/_unavailable.svg)

## In Penumbra IBC verwendete Technologie 

IBC-Integration: Das Inter-Blockchain-Communication-(IBC)-Protokoll verbindet Penumbra mit anderen IBC-fähigen Chains. Ein eingehender IBC-Transfer schirmt Gelder ab, wenn sie in Penumbra gelangen; ein ausgehender Transfer hebt die Abschirmung auf, wenn sie es verlassen. Aktivitäten auf einer transparenten Gegenpartei-Chain bleiben öffentlich, einschließlich der Zieladresse einer eingehenden Einzahlung. Die [Privatsphäregrenze folgt der IBC-Grenze](https://guide.penumbra.zone/overview/interchain-privacy).

Zero-Knowledge-Proofs (ZKPs): Penumbra verwendet clientseitige Zero-Knowledge-Proofs, um zu zeigen, dass verschlüsselte Zustandsaktualisierungen gültig sind, ohne die privaten Transaktionsdaten eines Nutzers zu veröffentlichen. Wallets scannen und entschlüsseln die für sie sichtbaren Daten lokal; ein öffentlicher Knoten kann nicht einfach den privaten Kontostand eines Nutzers zurückgeben.

![image.png](/content-images/_unavailable.svg)

Dezentrale Börse mit Privatsphäre: Penumbra umfasst eine DEX für den Handel mit Vermögenswerten innerhalb seines abgeschirmten Pools. Einzelne Swap-Ausgaben sind privat, während Ergebnisse der Batch-Ausführung und anonyme Liquiditätspositionen öffentlich sind. Diese Unterscheidungen sind wichtig, wenn beschrieben wird, was die Börse verbirgt.

## Anwendungsfälle

Sichere Transaktionen: Transfers innerhalb des abgeschirmten Pools von Penumbra schützen Sender, Empfänger, Betrag und Art des Vermögenswerts. Nutzer können Aktivitäten autorisierten Dritten selektiv offenlegen. Das Teilen einer Empfangsadresse allein legt die Kontostände ihres Besitzers nicht offen. Diese Eigenschaften gelten nicht für öffentliche Aktivitäten auf einer anderen Chain, nachdem Gelder abgehoben wurden.

Staking: Der native Staking-Token von Penumbra ist **UM**. Das Delegieren von UM an einen Validator gibt Delegationstoken zurück, die Anteile am Delegationspool dieses Validators repräsentieren. Der Gesamtstake im Pool jedes Validators ist öffentlich, während individuelle Delegationen anonym sind. Die Aufhebung einer Delegation erstellt zunächst validatorspezifische Unbonding-Token, die weiterhin Slashing ausgesetzt sind, bis die Unbonding-Verzögerung endet. Siehe den offiziellen [Leitfaden zum abgeschirmten Staking](https://guide.penumbra.zone/overview/staking).

Token-Swaps: Swap-Intents werden nach Handelspaar gruppiert und am Ende jedes Blocks als Batch ausgeführt. Dadurch entfällt die Reihenfolge von Swap-Intents innerhalb eines Blocks als Hebel für Trader; dies ist ein spezifischer Mechanismus und keine Garantie dafür, dass keinerlei Form von MEV existieren kann. Batch-Ergebnisse werden in den öffentlichen Chain-Zustand geschrieben, und Nutzer beanspruchen ihren Anteil am Ergebnis privat im abgeschirmten Pool. Der [DEX-Leitfaden](https://guide.penumbra.zone/overview/dex) beschreibt die Batch-Ausführung und die automatische Arbitrage des Protokolls.

Market Making: Liquiditätsanbieter erstellen anonyme Positionen mit konzentrierter Liquidität. Die Liquidität und Handelsfunktionen der Positionen sind öffentlich, werden jedoch nicht mit der Identität des Anbieters verknüpft.
