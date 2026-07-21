<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ShapeShift und Zcash: Datenschutzorientierter dezentraler Handel

---

## Einführung

Datenschutz und Selbstverwahrung sind grundlegende Prinzipien von Kryptowährungen, dennoch verlassen sich viele Nutzer weiterhin auf zentralisierte Börsen, die eine Identitätsprüfung verlangen und Nutzergelder verwahren. Die Integration zwischen ShapeShift und Zcash vereint eine vollständig dezentrale Handelsplattform mit einer der fortschrittlichsten datenschutzwahrenden Kryptowährungen und gibt Nutzern die Möglichkeit, ZEC zu handeln, ohne Privatsphäre oder die Kontrolle über ihre Vermögenswerte aufzugeben.

Dieser Artikel erklärt, was ShapeShift ist, wie Zcash funktioniert, wie du ZEC auf ShapeShift tauschen kannst und warum diese Partnerschaft für die Zukunft privater, dezentraler Finanzsysteme wichtig ist.

---

## Was ist ShapeShift?

[ShapeShift](https://shapeshift.com/) ist eine dezentrale, quelloffene Kryptowährungsplattform, die es Nutzern ermöglicht, digitale Vermögenswerte über mehrere Blockchains hinweg zu handeln, zu verfolgen und zu verwalten, ohne ein Konto zu erstellen, Ausweisdokumente einzureichen oder die Verwahrung ihrer Gelder abzugeben.

### Eine kurze Geschichte

ShapeShift wurde ursprünglich 2014 von Erik Voorhees als zentralisierte Kryptowährungsbörse mit Sitz in der Schweiz gegründet. Die Plattform wurde schnell wegen ihrer einfachen Benutzeroberfläche beliebt, die es Nutzern ermöglichte, eine Kryptowährung gegen eine andere zu tauschen, ohne ein Konto zu erstellen.

2021 durchlief ShapeShift einen radikalen Wandel. Das Unternehmen löste seine Unternehmensstruktur auf und wandelte sich in eine **Decentralized Autonomous Organization (DAO)** um, die von Inhabern des **FOX-Token** verwaltet wird. Im Rahmen dieses Übergangs wurden rund 340 Millionen FOX-Token per Airdrop an über eine Million Nutzer verteilt, was ihn zu einem der größten Airdrops in der Geschichte von Krypto machte. Von diesem Zeitpunkt an wurden alle wichtigen Entscheidungen über die Plattform durch Vorschläge und Abstimmungen der Community getroffen.

### Hauptmerkmale

- **Non-Custodial**: Nutzer handeln direkt aus ihren eigenen Wallets. ShapeShift verwahrt deine Gelder niemals.
- **Kein KYC erforderlich**: Keine Identitätsprüfung, keine Kontoerstellung und keine Erfassung persönlicher Daten.
- **Unterstützung für mehrere Blockchains**: Zugriff auf über 10.000 Vermögenswerte auf mehr als 15 Blockchains, darunter Bitcoin, Ethereum, Cosmos und Zcash.
- **DEX-Aggregation**: ShapeShift leitet Trades über dezentrale Protokolle wie THORChain, 0x und andere weiter, um die besten Kurse zu finden.
- **Cross-Chain-Swaps**: Tausche Vermögenswerte nativ zwischen verschiedenen Blockchains, ohne Wrapped Tokens oder zentralisierte Bridges zu verwenden.
- **Vollständig Open Source**: Die gesamte Plattform, einschließlich der mobilen App, ist Open Source und hat kein proprietäres Backend jenseits von Blockchain-Daten.

---

## Wie Zcash funktioniert

[Zcash](https://z.cash/) (ZEC) ist eine Kryptowährung, die auf starken kryptografischen Grundlagen aufbaut und Nutzern die Möglichkeit gibt, privat Transaktionen durchzuführen. Zcash wurde 2016 eingeführt und ist ein Fork von Bitcoin, der fortschrittliche Datenschutztechnologie hinzufügt, während er Bitcoins festes Angebot von 21 Millionen Coins und den Proof-of-Work-Konsens beibehält.

### Shielded-Transaktionen und Nullwissensbeweise

Die zentrale Innovation von Zcash ist die Verwendung von **Nullwissensbeweisen** (genauer gesagt einer Form namens **zk-SNARKs**). Diese kryptografischen Beweise ermöglichen es einer Partei, einer anderen zu beweisen, dass eine Aussage wahr ist, ohne Informationen preiszugeben, die über die Gültigkeit der Aussage selbst hinausgehen.

In der Praxis bedeutet das, dass Zcash-Transaktionen vollständig **shielded** sein können: Die Senderadresse, die Empfängeradresse und der Transaktionsbetrag sind alle auf der Blockchain verschlüsselt. Das Netzwerk kann dennoch verifizieren, dass die Transaktion gültig ist (kein Double-Spending, korrekte Guthaben), ohne diese Details jemals zu sehen.

### Transaktionstypen

Zcash unterstützt zwei Arten von Adressen:

- **Transparente Adressen** (t-Adressen): Diese funktionieren wie Bitcoin-Adressen, bei denen Transaktionsdetails öffentlich auf der Blockchain sichtbar sind.
- **Shielded-Adressen** (z-Adressen): Diese verwenden Nullwissensbeweise, um Transaktionsdetails privat zu halten.

Nutzer können ZEC zwischen transparenten und shielded Adressen senden. Für maximale Privatsphäre geben Transaktionen von einer shielded Adresse an eine andere öffentlich keine Informationen preis.

### Unified Addresses

Moderne Zcash-Wallets wie [Zashi](https://electriccoin.co/zashi/) verwenden **Unified Addresses**, die sowohl transparente als auch shielded Empfänger in einer einzigen Adresse kombinieren. Das vereinfacht die Benutzererfahrung und nutzt standardmäßig das höchstmögliche verfügbare Datenschutzniveau.

### Warum Datenschutz wichtig ist

Finanzielle Privatsphäre bedeutet nicht, Fehlverhalten zu verbergen. Sie schützt Einzelpersonen vor Überwachung, dem Sammeln von Unternehmensdaten und gezielten Angriffen. So wie du deinen Kontostand nicht öffentlich sichtbar haben möchtest, verdienen auch Kryptowährungstransaktionen dasselbe Maß an Vertraulichkeit. Zcash bietet dies von Grund auf.

---

## Wie man ZEC auf ShapeShift tauscht

Die ShapeShift-Plattform ermöglicht es Nutzern, ZEC über einen vollständig dezentralen Prozess zu erwerben und zu handeln. So funktioniert es.

### Schritt 1: ShapeShift besuchen

Gehe in deinem Webbrowser zu [app.shapeshift.com](https://app.shapeshift.com/) oder lade die mobile App von ShapeShift herunter. Es ist weder eine Kontoerstellung noch eine Identitätsprüfung erforderlich.

### Schritt 2: Deine Wallet verbinden

Verbinde eine kompatible Self-Custody-Wallet. ShapeShift unterstützt eine Reihe von Wallets, darunter:

- **KeepKey** (Hardware-Wallet)
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr** (für Cosmos-basierte Vermögenswerte)
- **WalletConnect-kompatible Wallets**

Da du in oder aus ZEC tauschst, stelle sicher, dass du eine Zcash-kompatible Wallet (zum Beispiel Zashi) bereit hast, um deine Gelder zu empfangen.

### Schritt 3: Dein Swap-Paar auswählen

Nutze die Swap-Oberfläche, um den Vermögenswert auszuwählen, von dem aus du handeln möchtest (zum Beispiel BTC, ETH oder ein ERC-20-Token), und setze ZEC als Zielvermögenswert. Die Benutzeroberfläche von ShapeShift ist in einem sauberen, an Uniswap angelehnten Layout gestaltet, das sowohl für Desktop als auch für Mobilgeräte optimiert ist.

### Schritt 4: Betrag eingeben und prüfen

Gib den Betrag ein, den du tauschen möchtest. ShapeShift leitet den Handel über das beste verfügbare dezentrale Protokoll weiter (zum Beispiel THORChain für Cross-Chain-Swaps) und zeigt den geschätzten Kurs, Gebühren und den Ausgabebetrag an.

### Schritt 5: Bestätigen und ausführen

Prüfe die Transaktionsdetails und bestätige sie. Der Swap wird on-chain über dezentrale Protokolle ausgeführt. Dein ZEC wird an die von dir angegebene Adresse geliefert. Kein Vermittler verwahrt jemals deine Gelder.

### Schritt 6: Dein ZEC shielden

Sobald dein ZEC angekommen ist, verwende die **Shield**-Funktion deiner Zcash-Wallet (verfügbar in Wallets wie Zashi), um die Gelder in den shielded Pool zu verschieben. So wird sichergestellt, dass dein Guthaben und zukünftige Transaktionen vollständig privat bleiben.

### Unterstützte Cross-Chain-Paare

ShapeShift ermöglicht ZEC-Swaps über mehrere Blockchain-Ökosysteme hinweg, darunter:

- **Bitcoin** (BTC) &lt;-&gt; ZEC
- **Ethereum** (ETH) &lt;-&gt; ZEC
- **Arbitrum**-Vermögenswerte &lt;-&gt; ZEC
- **Cosmos**-Ökosystem-Token &lt;-&gt; ZEC

---

## Warum diese Integration wichtig ist

### Privatsphäre in DeFi zurückgewinnen

Die meisten dezentralen Börsen behandeln Privatsphäre als nachträglichen Gedanken. Transaktionen auf Ethereum-basierten DEXs sind zum Beispiel vollständig transparent: Jeder kann den Verlauf deiner Wallet, Token-Guthaben und Handelsmuster nachverfolgen. Die Integration von ShapeShift und Zcash stellt diese Norm infrage, indem sie Zugang zu shielded ZEC über eine dezentrale Plattform ohne KYC bietet.

Wie Houston Morgan, Leiter des Growth- und Community-Workstreams von ShapeShift, sagte: *"Datenschutz sollte nichts Beängstigendes sein, aber ZEC auf zentralisierten Börsen zu handeln ist es oft. Ihre Struktur und ihr rechtliches Risiko zerstören echte Privatsphäre."*

### Vom Delisting zum Standard

Die Geschichte macht diese Integration noch bedeutender. 2020, als ShapeShift noch ein zentralisiertes Unternehmen war, **strich es Privacy Coins** einschließlich Zcash unter regulatorischem Druck vom Angebot. Der Übergang zu einer DAO-Struktur befreite ShapeShift von diesen Einschränkungen. Jetzt hat ShapeShift als von der Community gesteuertes Protokoll Zcash nicht nur wieder gelistet, sondern zu einem zentralen Bestandteil seiner Datenschutzstrategie gemacht.

Mit der Veröffentlichung von **ShapeShift v4.0** im Dezember 2025 wurde Zcash zum **primären datenschutzwahrenden Zahlungs- und Routing-Asset** der Plattform. Privatsphäre ist nun als Standardfunktion positioniert, nicht als optionales Zusatzmodul, wobei ZEC direkt in ShapeShifts Wallet- und Routing-Stack integriert ist.

### Unterstützung durch Zcash Community Grants

Das Programm [Zcash Community Grants](https://zcashcommunitygrants.org/) stellte **50.000 $** bereit, um die technische Infrastruktur und die Marketingmaßnahmen von ShapeShift für die Zcash-Integration zu unterstützen. Diese Finanzierung half dem ShapeShift-Team bei der Zusammenarbeit mit **Liquify**, einem Web3-Infrastrukturanbieter mit Unterstützung für mehr als 90 Blockchains, um Remote-Procedure-Call-(RPC)-Endpunkte für schnellere Ausführung und eine verbesserte Netzwerkzuverlässigkeit bereitzustellen.

### Dezentralisierte Finanzsysteme voranbringen

Diese Integration zeigt, dass Privatsphäre und Dezentralisierung in DeFi zusammenwirken können. Nutzer können:

- **Vermögenswerte tauschen** über Chains hinweg ohne zentralisierte Vermittler
- **Die vollständige Selbstverwahrung** ihrer Gelder während des gesamten Prozesses beibehalten
- **Auf shielded ZEC zugreifen** ohne KYC oder Datenerfassung
- **An Governance teilnehmen** über den FOX-Token, um die Zukunft der Plattform mitzugestalten

Da regulatorische Umfelder weltweit strenger werden und Regionen wie die EU Einschränkungen für datenschutzwahrende Technologien prüfen, bieten Plattformen wie ShapeShift eine wichtige alternative Infrastruktur für finanzielle Privatsphäre.

---

## Zusammenfassung

| Merkmal | Details |
|---|---|
| **Plattform** | ShapeShift DAO (dezentral, Open Source) |
| **Governance** | Inhaber des FOX-Token |
| **Zcash-Unterstützung** | Vollständiger ZEC-Handel mit Unterstützung für shielded Transaktionen |
| **KYC erforderlich** | Nein |
| **Verwahrung** | Non-Custodial (Nutzer behalten ihre eigenen Schlüssel) |
| **Cross-Chain-Swaps** | BTC, ETH, Arbitrum, Cosmos und mehr |
| **Infrastruktur** | Unterstützt von Liquify (RPC-Unterstützung für mehr als 90 Blockchains) |
| **Förderung durch Zcash Community Grants** | 50.000 $ für technische und Marketing-Unterstützung |

Die Integration von ShapeShift und Zcash stellt einen bedeutenden Fortschritt für Privatsphäre im dezentralisierten Finanzwesen dar. Durch die Kombination von ShapeShifts Non-Custodial-Multichain-Handelsinfrastruktur mit der Nullwissensbeweis-Technologie von Zcash erhalten Nutzer Zugang zu wirklich privatem, erlaubnisfreiem Kryptowährungshandel. Für alle, die finanzielle Privatsphäre und Selbstsouveränität schätzen, bietet diese Integration einen praktischen, leicht zugänglichen Weg, ZEC ohne Kompromisse zu nutzen.

---

### Ressourcen

[ShapeShift-Plattform](https://shapeshift.com/)

[Offizielle Zcash-Website](https://z.cash/)

[Zashi Wallet (von Electric Coin Co.)](https://electriccoin.co/zashi/)

[ShapeShift DAO Governance (FOX-Token)](https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift integriert Zcash zur Stärkung der Onchain-Privatsphäre (crypto.news)](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift stellt v4.0 vor und rückt Privatsphäre und Selbstverwahrung in DeFi wieder in den Mittelpunkt (Invezz)](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift führt Unterstützung für shielded Zcash-Transaktionen ein (CoinTelegraph)](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)
