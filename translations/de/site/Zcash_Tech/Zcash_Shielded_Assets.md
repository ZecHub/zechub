<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## Kurz gesagt

Zcash Shielded Assets (ZSA) sind eine vorgeschlagene Protokollerweiterung, die es ermöglichen würde, dass andere Vermögenswerte **als ZEC** — Stablecoins, Governance-Token oder beliebige benutzerdefinierte Vermögenswerte — innerhalb des abgeschirmten Pools von Zcash existieren, wobei Sender, Empfänger und Betrag privat bleiben.

- **Was es ist:** Benutzerdefinierte Vermögenswerte im Stil von ERC-20, aber standardmäßig abgeschirmt.
- **Wer daran arbeitet:** [QEDIT](https://qed-it.com/), im Rahmen eines Grants von Zcash Foundation, in Zusammenarbeit mit Electric Coin Company.
- **Wie es spezifiziert ist:** [ZIP 226](https://zips.z.cash/zip-0226) (Übertragung und Verbrennung) zusammen mit [ZIP 227](https://zips.z.cash/zip-0227) (Ausgabe).
- **Status:** Nicht im Mainnet aktiv und nicht Teil von Network Upgrade 7 (NU7). [ZIP 259](https://zips.z.cash/zip-0259), das alles auflistet, was NU7 bereitstellt, enthält weder ZIP 226 noch ZIP 227, und es wurde kein Aktivierungsdatum für ZSA festgelegt.
- **Gebühren:** Werden unabhängig vom übertragenen Vermögenswert immer in ZEC bezahlt.

---

## Grunderklärung

Zcash Shielded Assets (ZSA) sind eine vorgeschlagene Verbesserung des Zcash-Protokolls, die die Erstellung, Übertragung und Verbrennung benutzerdefinierter Vermögenswerte auf der Zcash-Blockchain ermöglichen würde.

Wenn Sie mit dem [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)-Tokenstandard auf der Ethereum-Blockchain vertraut sind, verhalten sich ZSAs zu Zcash wie ERC-20-Token zu Ethereum.

Zcash Shielded Assets würden die Erstellung benutzerdefinierter Token auf der Zcash-Blockchain ermöglichen und dadurch erlauben, dass andere Token als [ZEC](/guides/using-zec-privately) von der Anonymität und Privatsphäre abgeschirmter Transaktionen auf der Zcash-Blockchain profitieren.

Ein wichtiger potenzieller Anwendungsfall von ZSAs wäre die Ausgabe von Stablecoins auf dem Zcash-Protokoll. Stablecoins sind Kryptowährungen, deren Wert an eine Fiatwährung wie den US-Dollar oder Euro gekoppelt ist. Derzeit gehören einige der am weitesten verbreiteten Stablecoins zu den ERC-20-Token, etwa [USDC](https://www.circle.com/en/usdc) und [Dai](https://docs.makerdao.com/).

Ein weiterer potenzieller Anwendungsfall von ZSAs wäre die Ausgabe von Governance-Token. Beispielsweise ist ZecHub (der Herausgeber dieses Wikis) eine Decentralized Autonomous Organization (DAO) und könnte für Abstimmungen über Vorschläge und Governance-Entscheidungen einen ZSA erstellen und an seine Mitglieder ausgeben.

ZSAs werden von [QEDIT](https://qed-it.com/) entwickelt, im Rahmen eines großen Grants von [Zcash Foundation](/zcash-organizations/zcash-foundation) und in Zusammenarbeit mit [Electric Coin Company](/zcash-organizations/electric-coin-company). Da dieses Projekt weiterhin aktiv entwickelt wird, werden Aktualisierungen in [diesem Thread](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) im Zcash-Forum veröffentlicht. Der [ZSA-Grant-Antrag](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) von QEDIT ist auf der Zcash Foundation-Grant-Website verfügbar.

---

## Visualisierung / Analogie

### Der versiegelte Umschlag

Stellen Sie sich eine abgeschirmte Zcash-Transaktion als einen schlichten, versiegelten Umschlag vor, der in einen öffentlichen Briefkasten eingeworfen wird. Jeder kann sehen, dass ein Umschlag versandt wurde. Niemand kann sehen, wer ihn abgeschickt hat, wer ihn entgegennimmt oder was sich darin befindet — und jeder Umschlag sieht genauso aus wie jeder andere.

Heute kann ein Umschlag im Zcash-Netzwerk nur eine Sache enthalten: ZEC.

ZSA verändert den Umschlag nicht. Es verändert **was darin erlaubt ist**. Nach ZSA könnte derselbe versiegelte Umschlag einen Stablecoin, einen DAO-Governance-Token oder einen Treuepunkt eines Unternehmens enthalten — und von außen sähe er weiterhin genau wie jeder andere Umschlag im Netzwerk aus.

Ein Detail sollte man im Hinterkopf behalten: **Das Porto wird immer in ZEC bezahlt**, unabhängig davon, was sich im Umschlag befindet.

### Was ein außenstehender Beobachter sehen kann

| Ein Beobachter kann sehen ... | ERC-20 auf Ethereum | ZSA auf Zcash |
| --- | --- | --- |
| Wer es gesendet hat | Öffentlich | Abgeschirmt |
| Wer es erhalten hat | Öffentlich | Abgeschirmt |
| Wie viel übertragen wurde | Öffentlich | Abgeschirmt |
| Einzelne Guthaben | Öffentlich | Abgeschirmt |
| Gesamtmenge des Vermögenswerts | Öffentlich | **Öffentlich — absichtlich** |
| Währung, in der die Gebühr bezahlt wird | ETH | ZEC |

### Warum die Zeile zur Menge kein Fehler ist

In den letzten beiden Zeilen der Tabelle wird ZSA interessant.

ZIP 227 hält die **Ausgabe absichtlich transparent**, damit die umlaufende Menge jedes Vermögenswerts on-chain nachverfolgt werden kann. Einzelne Bestände und Zahlungen bleiben privat; die Gesamtzahl existierender Token nicht.

Für einen Stablecoin-Emittenten ist diese Kombination der entscheidende Punkt und kein Kompromiss. Reserven können gegenüber einer öffentlich überprüfbaren Menge geprüft werden, während die Menschen, die den Token tatsächlich nutzen, ihre Guthaben und Zahlungen für sich behalten.

### Ein Vermögenswert, eine Identität

Jeder Vermögenswert erhält eine eindeutige **Asset Identifier**, die aus dem Ausgabeschlüssel des Emittenten zusammen mit einer Textbeschreibung des Vermögenswerts abgeleitet wird. Zwei verschiedene Emittenten können nicht dieselbe Kennung erzeugen, und das Prägen oder Ändern eines Vermögenswerts erfordert kryptografische Autorisierung durch seinen Emittenten. In der Umschlag-Analogie: Jeder kann einen Umschlag versenden, aber nur die Prägestätte, der ein bestimmter Vermögenswert gehört, kann mehr davon drucken.

---

## Vertiefung

### ZSA-Demo auf Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Führen Sie die Demo selbst aus!**

Klonen Sie das zcash-tx-tool-Repository: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Übertragung und Verbrennung von Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227): Ausgabe von Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230): Transaktionsformat Version 6

> **Hinweis zu ZIP 230:** ZIP 230 wurde inzwischen zurückgezogen und wird nicht bereitgestellt. Transaktionsversion 6 wird nun durch [ZIP 229](https://zips.z.cash/zip-0229) definiert. Siehe den Hinweis oben auf der Seite zu [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 definiert das OrchardZSA-Protokoll — eine Erweiterung des Orchard-Protokolls, die die Übertragung und Verbrennung benutzerdefinierter Vermögenswerte ermöglicht. ZIP 227 definiert, wie diese Vermögenswerte überhaupt erstellt werden, und darf nur zusammen mit ZIP 226 implementiert werden.

### ZSA-Grant-Vorschlag

Der ZSA-Vorschlag für Shielded Assets (ZSA/UDA) wurde vom Team [QEDIT](https://qed-it.com/) vorgestellt, um generische abgeschirmte Vermögenswerte auf der Zcash-Blockchain zu entwickeln. Diese werden gewöhnlich als User Defined Assets (UDA) oder als Zcash Shielded Assets (ZSA) bezeichnet.

Mit diesem Vorschlag plant das Team bei [QEDIT](https://qed-it.com/), DeFi in das Zcash-Ökosystem zu bringen und gleichzeitig die Nutzung der besten Privatsphäretechnologie innerhalb des bestehenden DeFi-Ökosystems zu ermöglichen. In einer Umfrage fragte das Team, und die Community antwortete, dass [generische abgeschirmte Vermögenswerte (ZSA/UDA) derzeit das am häufigsten gewünschte Feature sind](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Diese Vorschläge entsprechen technisch der Spezifikation des [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) und werden in ZIP 226 & ZIP 227 definiert.

1. [ZIP 226](https://zips.z.cash/zip-0226): Übertragung und Verbrennung von Zcash Shielded Assets
2. [ZIP 227](https://zips.z.cash/zip-0227): Ausgabe von Zcash Shielded Assets

---

## Praktische Auswirkungen

**Wenn Sie ZEC halten oder nutzen**

- ZSAs sind als Erweiterung von Orchard („OrchardZSA“) definiert und würden daher die abgeschirmte Technologie nutzen, die ZEC bereits verwendet. Ihre Wallet benötigt explizite ZSA-Unterstützung, bevor sie diese halten oder senden kann.
- Sie benötigen immer etwas ZEC zur Hand. Gebühren für die Ausgabe und Übertragung eines ZSA werden in ZEC bezahlt, nicht im Vermögenswert selbst.
- An Ihren bestehenden ZEC-Transaktionen ändert sich nichts.

**Wenn Sie ein potenzieller Emittent sind — ein Stablecoin, eine DAO, ein Unternehmen**

- Die Ausgabe eines Vermögenswerts erfordert eine kryptografische Autorisierung, die an einen Ausgabeschlüssel gebunden ist, sodass nur Sie die Eigenschaften Ihres eigenen Vermögenswerts prägen oder ändern können.
- Die umlaufende Menge Ihres Vermögenswerts ist öffentlich prüfbar, die Guthaben und Übertragungen Ihrer Nutzer jedoch nicht. Für einen regulierten Emittenten ist dies gewöhnlich genau die erforderliche Kombination.
- Eine einzelne Ausgabetransaktion kann mehr als einen Vermögenswert zugleich erstellen.

**Für das Ökosystem**

- Da jede ZSA-Gebühr in ZEC denominiert ist, schafft Aktivität in jedem künftig auf Zcash ausgegebenen Vermögenswert Nachfrage nach ZEC selbst.

---

## Häufige Missverständnisse

| Häufige Annahme | Was tatsächlich zutrifft |
| --- | --- |
| „ZSAs sind heute auf Zcash aktiv.“ | Das sind sie nicht. ZSA ist nicht Teil von Network Upgrade 7 (NU7), das [ZIP 259](https://zips.z.cash/zip-0259) ohne ZIP 226 oder ZIP 227 definiert, und ZSA befindet sich weiterhin in Prüfung und Tests. |
| „ZSA bringt Smart Contracts zu Zcash.“ | ZSA spezifiziert die Ausgabe, Übertragung und Verbrennung von Vermögenswerten. Es ist keine universell programmierbare Vertragsschicht. |
| „Sie können ZSA-Gebühren im ZSA-Token selbst bezahlen.“ | Gebühren werden in ZEC bezahlt. |
| „Wenn es abgeschirmt ist, muss auch die Tokenmenge geheim sein.“ | ZIP 227 macht die Ausgabe bewusst transparent, damit die Menge jedes Vermögenswerts öffentlich nachverfolgt werden kann. Guthaben und Übertragungen bleiben privat; die Menge nicht. |
| „ZIP 230 ist das aktuelle Transaktionsformat der Version 6.“ | ZIP 230 wurde zurückgezogen. Version 6 wird nun durch ZIP 229 definiert. |

---

## Verwandte Seiten

- [Halo](/zcash-tech/halo) — das Beweissystem hinter Orchard, dem Protokoll, das ZSA erweitert
- [zk-SNARKs](/zcash-tech/zk-snarks) — die Zero-Knowledge-Beweise, die es ermöglichen, eine abgeschirmte Übertragung zu verifizieren, ohne sie offenzulegen
- [Abgeschirmte Pools](/using-zcash/shielded-pools) — wo ZSAs neben ZEC existieren würden
- [Transaktionen](/using-zcash/transactions) — wie eine Zcash-Transaktion zusammengestellt wird
- [Zebra Vollständiger Knoten](/zcash-tech/zebra-full-node) — die oben in der ZSA-Demo verwendete Knotenimplementierung
