<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## Kurzfassung

Zcash Shielded Assets (ZSA) sind eine vorgeschlagene Protokollerweiterung, die es Vermögenswerten **außer ZEC** — Stablecoins, Governance-Token oder beliebigen benutzerdefinierten Assets — ermöglichen würde, innerhalb des abgeschirmten Pools von Zcash zu existieren, wobei Absender, Empfänger und Betrag privat bleiben.

- **Was es ist:** Benutzerdefinierte Assets im Stil von ERC-20, aber standardmäßig abgeschirmt.
- **Wer es entwickelt:** [QEDIT](https://qed-it.com/), im Rahmen eines Grants der Zcash Foundation, in Zusammenarbeit mit der Electric Coin Company.
- **Wie es spezifiziert ist:** [ZIP 226](https://zips.z.cash/zip-0226) (Transfer und Vernichtung) zusammen mit [ZIP 227](https://zips.z.cash/zip-0227) (Ausgabe).
- **Status:** nicht live auf Mainnet. Das ZSA-Protokoll ist für die Bereitstellung in Network Upgrade 7 (NU7) vorgesehen.
- **Gebühren:** werden immer in ZEC bezahlt, unabhängig davon, welches Asset bewegt wird.

---

## Grundlegende Erklärung

Zcash Shielded Assets (ZSA) sind eine vorgeschlagene Verbesserung des Zcash-Protokolls, die die Erstellung, den Transfer und die Vernichtung benutzerdefinierter Assets auf der Zcash-Chain ermöglichen würde.

Wenn du mit dem [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)-Tokenstandard auf der Ethereum-Blockchain vertraut bist, dann verhalten sich ZSAs zu Zcash so wie ERC-20-Token zu Ethereum.

Zcash Shielded Assets würden die Erstellung benutzerdefinierter Token auf der Zcash-Blockchain ermöglichen und damit erlauben, dass Token außer [ZEC](/guides/using-zec-privately) von der Anonymität und Privatsphäre abgeschirmter Transaktionen auf der Zcash-Blockchain profitieren.

Ein wichtiger potenzieller Anwendungsfall für ZSAs wäre die Ausgabe von Stablecoins auf dem Zcash-Protokoll. Stablecoins sind Kryptowährungen, die ihren Wert an eine Fiatwährung wie den US-Dollar oder den Euro koppeln. Derzeit sind einige der am weitesten verbreiteten Stablecoins ERC-20-Token wie [USDC](https://www.circle.com/en/usdc) und [Dai](https://docs.makerdao.com/).

Ein weiterer potenzieller Anwendungsfall für ZSAs wäre die Ausgabe von Governance-Token. Zum Beispiel ist Zechub (der Herausgeber dieses Wikis) eine Decentralized Autonomous Organization (DAO) und könnte für Abstimmungen über Vorschläge und Governance-Entscheidungen einen ZSA erstellen und an seine Mitglieder ausgeben.

ZSAs werden von [QEDIT](https://qed-it.com/) entwickelt, im Rahmen eines großen Grants der [Zcash Foundation](/zcash-organizations/zcash-foundation) in Zusammenarbeit mit der [Electric Coin Company](/zcash-organizations/electric-coin-company). Da dieses Projekt noch aktiv entwickelt wird, werden Aktualisierungen in [diesem Thread](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) im Zcash-Forum veröffentlicht. Der [ZSA-Grant-Antrag](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) von QEDIT ist auf der Grants-Website der Zcash Foundation verfügbar.

---

## Visualisierung / Analogie

### Der versiegelte Umschlag

Stell dir eine abgeschirmte Zcash-Transaktion wie einen schlichten, versiegelten Umschlag vor, der in einen öffentlichen Briefkasten eingeworfen wird. Jeder kann sehen, dass ein Umschlag eingeworfen wurde. Niemand kann sehen, wer ihn gesendet hat, wer ihn entnimmt oder was sich darin befindet — und jeder Umschlag sieht genauso aus wie jeder andere.

Heute kann ein Umschlag im Zcash-Netzwerk nur eine Sache enthalten: ZEC.

ZSA verändert den Umschlag nicht. Es verändert **was darin erlaubt ist**. Nach ZSA könnte derselbe versiegelte Umschlag einen Stablecoin, einen DAO-Governance-Token oder einen Treuepunkt eines Unternehmens enthalten — und von außen würde er immer noch genauso aussehen wie jeder andere Umschlag im Netzwerk.

Ein Detail sollte man sich merken: **Das Porto wird immer in ZEC bezahlt**, egal was sich im Umschlag befindet.

### Was ein Außenstehender sehen kann

| Ein Beobachter kann sehen... | ERC-20 auf Ethereum | ZSA auf Zcash |
| --- | --- | --- |
| Wer es gesendet hat | Öffentlich | Abgeschirmt |
| Wer es empfangen hat | Öffentlich | Abgeschirmt |
| Wie viel bewegt wurde | Öffentlich | Abgeschirmt |
| Einzelne Guthaben | Öffentlich | Abgeschirmt |
| Gesamtangebot des Assets | Öffentlich | **Öffentlich — absichtlich** |
| Währung, in der die Gebühr bezahlt wird | ETH | ZEC |

### Warum die Zeile zum Angebot kein Fehler ist

Die letzten beiden Zeilen der Tabelle sind der Punkt, an dem ZSA interessant wird.

ZIP 227 hält die **Ausgabe absichtlich transparent**, sodass das Umlaufangebot jedes Assets on-chain verfolgt werden kann. Individuelle Bestände und einzelne Zahlungen bleiben privat; die Gesamtzahl der existierenden Token bleibt es nicht.

Für einen Stablecoin-Emittenten ist genau diese Kombination der entscheidende Punkt und kein Kompromiss. Reserven können gegen ein öffentlich verifizierbares Angebot geprüft werden, während die Menschen, die den Token tatsächlich verwenden, ihre Guthaben und Zahlungen für sich behalten.

### Ein Asset, eine Identität

Jedes Asset erhält einen eindeutigen **Asset Identifier**, der aus dem Ausgabeschlüssel des Emittenten zusammen mit einer Textbeschreibung des Assets abgeleitet wird. Zwei verschiedene Emittenten können nicht denselben Identifikator erzeugen, und das Prägen oder Ändern eines Assets erfordert die kryptografische Autorisierung seines Emittenten. In der Umschlag-Analogie heißt das: Jeder kann einen Umschlag verschicken, aber nur die Prägeinstanz, der ein bestimmtes Asset gehört, kann mehr davon erzeugen.

---

## Ausführlicher Blick

### ZSA-Demo auf Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Führe die Demo selbst aus!**

Klone das zcash-tx-tool-Repository: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Transfer und Vernichtung von Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227): Ausgabe von Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230): Transaktionsformat Version 6

> **Hinweis zu ZIP 230:** ZIP 230 wurde inzwischen zurückgezogen und wird nicht bereitgestellt. Transaktionsversion 6 wird nun durch [ZIP 229](https://zips.z.cash/zip-0229) definiert. Siehe den Hinweis oben auf der Seite zu [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 definiert das OrchardZSA-Protokoll — eine Erweiterung des Orchard-Protokolls, die den Transfer und die Vernichtung benutzerdefinierter Assets enthält. ZIP 227 definiert, wie diese Assets überhaupt erstellt werden, und darf nur zusammen mit ZIP 226 implementiert werden.

### ZSA-Grant-Vorschlag

Der ZSA-Vorschlag für Shielded Assets (ZSA/UDA) wurde vom Team von [QEDIT](https://qed-it.com/) vorgestellt, um generische abgeschirmte Assets auf der Zcash-Blockchain zu entwickeln. Diese werden üblicherweise als User Defined Assets (UDA) oder als Zcash Shielded Assets (ZSA) bezeichnet.

Mit diesem Vorschlag plant das Team von [QEDIT](https://qed-it.com/), DeFi in das Zcash-Ökosystem zu bringen und gleichzeitig die Nutzung der besten Privatsphäre-Technologie innerhalb des bestehenden DeFi-Ökosystems zu ermöglichen. In einer Umfrage fragte das Team nach, und die Community antwortete, dass [generische abgeschirmte Assets (ZSA/UDA) derzeit die am meisten gewünschte Funktion sind](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Diese Vorschläge entsprechen technisch der Spezifikation der [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) und sind in ZIP 226 und ZIP 227 definiert.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transfer und Vernichtung von Zcash Shielded Assets
2. [ZIP 227](https://zips.z.cash/zip-0227): Ausgabe von Zcash Shielded Assets

---

## Praktische Auswirkungen

**Wenn du ZEC hältst oder verwendest**

- ZSAs sind als Erweiterung von Orchard ("OrchardZSA") definiert, daher würden sie dieselbe abgeschirmte Infrastruktur nutzen, die ZEC bereits verwendet. Dein Wallet benötigt explizite ZSA-Unterstützung, bevor es sie halten oder senden kann.
- Du musst immer etwas ZEC zur Hand haben. Gebühren für die Ausgabe und den Transfer eines ZSA werden in ZEC bezahlt, nicht im Asset selbst.
- An deinen bestehenden ZEC-Transaktionen ändert sich nichts.

**Wenn du ein potenzieller Emittent bist — ein Stablecoin, eine DAO, ein Unternehmen**

- Die Ausgabe eines Assets erfordert eine kryptografische Autorisierung, die an einen Ausgabeschlüssel gebunden ist, sodass nur du prägen oder die Eigenschaften deines eigenen Assets ändern kannst.
- Das Umlaufangebot deines Assets ist öffentlich prüfbar, während die Guthaben und Transfers deiner Nutzer es nicht sind. Für einen regulierten Emittenten ist das in der Regel genau die erforderliche Kombination.
- Eine einzelne Ausgabetransaktion kann mehr als ein Asset gleichzeitig erstellen.

**Für das Ökosystem**

- Da jede ZSA-Gebühr in ZEC denominiert ist, erzeugt Aktivität in jedem künftig auf Zcash ausgegebenen Asset Nachfrage nach ZEC selbst.

---

## Häufige Irrtümer

| Häufige Annahme | Was tatsächlich der Fall ist |
| --- | --- |
| "ZSAs sind heute bereits live auf Zcash." | Nein. ZSA ist für die Bereitstellung in Network Upgrade 7 (NU7) vorgesehen und befindet sich noch in Prüfung und Testphase. |
| "ZSA bringt Smart Contracts zu Zcash." | ZSA spezifiziert die Ausgabe, den Transfer und die Vernichtung von Assets. Es ist keine allgemeine programmierbare Contract-Schicht. |
| "Du kannst ZSA-Gebühren im ZSA-Token selbst bezahlen." | Gebühren werden in ZEC bezahlt. |
| "Wenn es abgeschirmt ist, muss auch das Token-Angebot geheim sein." | ZIP 227 macht die Ausgabe absichtlich transparent, sodass das Angebot jedes Assets öffentlich verfolgt werden kann. Guthaben und Transfers bleiben privat; das Angebot nicht. |
| "ZIP 230 ist das aktuelle Transaktionsformat der Version 6." | ZIP 230 wurde zurückgezogen. Version 6 wird nun durch ZIP 229 definiert. |

---

## Verwandte Seiten

- [Halo](/zcash-tech/halo) — das Beweissystem hinter Orchard, dem Protokoll, das ZSA erweitert
- [Zk-SNARKs](/zcash-tech/zk-snarks) — die Zero-Knowledge-Beweise, die es ermöglichen, einen abgeschirmten Transfer zu verifizieren, ohne ihn offenzulegen
- [Shielded Pools](/using-zcash/shielded-pools) — dort würden ZSAs neben ZEC existieren
- [Transaktionen](/using-zcash/transactions) — wie eine Zcash-Transaktion zusammengesetzt ist
- [Zebra Full Node](/zcash-tech/zebra-full-node) — die Knoten-Implementierung, die in der obigen ZSA-Demo verwendet wird
