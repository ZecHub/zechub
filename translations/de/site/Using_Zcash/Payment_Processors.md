<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash-Zahlungsabwickler

Möglichkeiten, als Händler ZEC zu akzeptieren, direkt nebeneinandergestellt. Jeder Eintrag wurde anhand der eigenen Website und API des Anbieters am **29. Juli 2026** überprüft.

Die Unterstützung für Privacy-Assets ändert sich häufig, daher trägt jede Zeile ihr eigenes Verifizierungsdatum. Wenn du dies erst Monate später liest, prüfe die Website des Anbieters, bevor du integrierst.

<div class="processor-table">

| Abwickler | Verwahrung | Shielded ZEC | Selbst hosten | Händlergebühr | Regionen / KYC | Verifiziert |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Nicht-verwahrend | Ja, Orchard über Unified Addresses | Ja, Open Source | 1 % pro Zahlung, kostenlos bei Selbsthosting | Kein KYC, Regionen nicht angegeben | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Nicht-verwahrend, nur View Key | Ja, nur shielded (Sapling, Orchard, UA) | Ja, Open Source | Keine, du zahlst nur Netzwerkgebühren | Global, kein KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Nicht-verwahrend | Ja, Sapling und Orchard | Nein, gehosteter Dienst | Im Voraus bezahlte Sitzung, Preis nicht veröffentlicht | Kein KYC angegeben, Regionen nicht angegeben | 2026-07-29 |
| [Flexa](https://flexa.co/) | Kundenseitige Selbstverwahrung, Händler rechnet in Fiat ab | Kunde zahlt shielded, Empfangsseite nicht dokumentiert | Nein | 1 % pro Zahlung | USA und 37 SEPA-Länder, ZEC in der EU unbestätigt | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Standardmäßig nicht-verwahrend | Nein, nur transparente Adresse | Nein | 0,5 %, oder 1 % mit Konvertierung | Global außer dort, wo es verboten ist, kein KYC zum Start | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Verwahrend, trotz Marketing | Nicht dokumentiert | Nein | 0,5 % API, 1,5 % White Label | Kein KYC zum Empfangen | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Verwahrend, off-chain | Nein, shielded Einzahlungen werden abgelehnt | Nein | Kostenlos von Wallet zu Wallet, 0,8 % Auszahlungen | Geografisch eingeschränkt, ZEC in FR, ES, IT, PL delistet | 2026-07-29 |

</div>

### Was die Spalten bedeuten

**Verwahrung** bedeutet, ob der Abwickler deine ZEC hält. Nicht-verwahrend bedeutet, dass sie an eine Wallet gehen, die du kontrollierst.

**Shielded ZEC** bedeutet, ob du in den shielded Pool bezahlt werden kannst. Nur transparent bedeutet, dass Betrag und Adressen auf der blockchain öffentlich sind.

**Selbst hosten** bedeutet, ob du die Software selbst betreiben kannst, ohne ein Unternehmen dazwischen.

**Händlergebühr** schließt die Zcash-Netzwerkgebühren aus, die in jedem Fall von jemandem bezahlt werden.

Wenn ein Anbieter etwas nicht veröffentlicht, steht im Eintrag „nicht angegeben“ oder „nicht dokumentiert“, statt zu raten. Das ist nicht dasselbe wie „nein“.

### Welchen man wählen sollte

Für die meiste Privatsphäre und Kontrolle nutze **BTCPay Server** oder ein selbstgehostetes **CipherPay**. Beide sind shielded, Open Source und halten keine Gelder für dich.

Für Zahlungen in einem Laden statt online nutze **Flexa**.

Für ein gehostetes Gateway, bei dem transparente Zahlungen akzeptabel sind, nutze **NOWPayments** oder **Plisio**.

Ein wichtiger Hinweis, den man wiederholen sollte: Ein Abwickler, der nur transparent unterstützt, veröffentlicht jeden Zahlungsbetrag und jede Adresse auf der blockchain. Und bei jedem gehosteten nicht-verwahrenden Abwickler übergibst du deinen Viewing Key, sodass das Unternehmen deine Zahlungen sehen kann, auch wenn es sie nicht ausgeben kann. Selbsthosting ist der einzige Weg, das zu vermeiden.

<div class="processor-note">

**ZGo-Dienstwarnung, 29. Juli 2026.** Das ZGo-Backend unter api.zgo.cash lieferte auf jedem Endpunkt HTTP 503 zurück, während diese Seite überprüft wurde. Das Projekt ist nicht aufgegeben und sein Maintainer war diesen Monat in der Community aktiv, aber bestätige, dass der Dienst läuft, bevor du dich darauf verlässt.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay-Logo" class="processor-logo" />
- **Support-Typ**: Shielded (Orchard, über Unified Addresses)
- **Beschreibung**: Zcash in wenigen Minuten akzeptieren, nicht-verwahrend, keine Käuferdaten, kein Mittelsmann.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay-Logo" width="200" hidden />

Du gibst CipherPay einen reinen Lese-View-Key, sodass Zahlungen direkt an deine eigene Wallet gehen und es niemals Gelder hält. Es verwendet für jede Rechnung eine frische Adresse.

Nur Orchard. Es gibt keine Sapling- oder transparente Unterstützung, auch wenn das README des Repositorys Sapling erwähnt.

Es kostet 1 % pro Zahlung und überhaupt nichts, wenn du es selbst betreibst. Das Ganze ist Open Source, als Rust-Binary mit SQLite oder als Docker-Image. Es gibt kein KYC, und Käufer brauchen kein Konto.

Zu den Integrationen gehören Shopify, WooCommerce, eine REST-API, gehosteter Checkout, Zahlungslinks und QR-Codes vor Ort.

Zwei Dinge sollte man abwägen. Es wurde im Februar 2026 gestartet und hat kein veröffentlichtes Sicherheitsaudit. Und in der gehosteten Variante hält der Betreiber deinen Viewing Key, sodass er deine Zahlungen sehen kann. Selbsthosting beseitigt das. Shielded Zahlungen sind außerdem endgültig, daher braucht eine Rückerstattung eine Adresse vom Käufer.

**Zuletzt verifiziert:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server-Logo" class="processor-logo" />
- **Support-Typ**: Nur shielded (Sapling, Orchard, Unified Address)
- **Beschreibung**: BTCPay Server ist ein Open-Source-Zahlungsabwickler für Kryptowährungen zum Selbsthosten.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server-Logo" width="200" hidden />

Die stärkste Option in Sachen Verwahrung. Sein Wallet-Backend ist schreibgeschützt und hält weder Seed noch geheimen Schlüssel, sodass selbst ein kompromittierter Server dein Geld nicht ausgeben kann.

Nur shielded, einschließlich Sapling, Orchard und Unified Addresses. Es gibt keinen transparenten Fallback, also plane nicht damit.

Zur Installation brauchst du den btcpay-zcash-Docker-Fork auf dem Branch feat/zec sowie einen aus einer Wallet wie Ywallet oder Zingo exportierten Viewing Key. Standardmäßig spricht es mit einem entfernten lightwalletd, oder du kannst Zebra und lightwalletd selbst betreiben.

Eine Einschränkung, die man kennen sollte: Das Plugin verwendet eine einzige Zcash-Wallet für jeden Store auf einer Instanz, also betreibe es nicht auf einem gemeinsam genutzten Server. An Wallets pro Store wird gearbeitet.

Für die Software selbst gibt es keine Gebühr. Du zahlst Zcash-Netzwerkgebühren und was auch immer dein Hosting kostet.

**Zuletzt verifiziert:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo-Logo" class="processor-logo" />
- **Support-Typ**: Shielded (Sapling und Orchard)
- **Beschreibung**: ZGo ist eine elektronische Zahlungsplattform, die direkt von deinem Kunden zu dir geht, ohne dass Dritte beteiligt sind.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo-Logo" width="200" hidden />

Eine Kasse, die du im Browser betreibst, sodass ein Laptop, Tablet oder Telefon zum Checkout wird. Es gibt auch ein WooCommerce-Plugin und eine REST-API. Es wurde von Vergara Technologies entwickelt und von Zcash Community Grants finanziert, einschließlich des Wechsels von zcashd zu Zebra.

Die Gelder gehen direkt vom Kunden an deine Wallet, ohne dass jemand dazwischensteht.

Shielded, einschließlich Sapling und Orchard über Unified Addresses, und es folgt ZIP 321. Keine aktuelle Quelle sagt, dass es transparente Adressen verarbeitet, daher behauptet diese Seite das nicht mehr.

Du kannst es nicht wirklich selbst hosten. ZGo betreibt die Zcash-Infrastruktur für dich und veröffentlicht keine Deployment-Anleitung. Der Quellcode ist auf dem eigenen Git-Server des Maintainers öffentlich, obwohl die GitLab-Kopie, die die meisten Leute finden, ein veralteter Mirror von 2022 ist.

Kostenlos ist es ebenfalls nicht. ZGo verkauft im Voraus bezahlte Sitzungen und benötigt für WooCommerce eine Pro-Sitzung, aber die Preisseite ist derzeit nicht erreichbar, daher wird hier keine Zahl genannt.

**Zuletzt verifiziert:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa-Logo" class="processor-logo" />
- **Support-Typ**: Kunde zahlt shielded, Empfangsseite nicht dokumentiert
- **Beschreibung**: Flexa ist ein Zahlungsnetzwerk, mit dem Kunden digitale Vermögenswerte, einschließlich Zcash, an Einzelhandelsstandorten aus einer Self-Custody-Wallet ausgeben können.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa-Logo" width="200" hidden />

Flexa ist kein Checkout-Gateway, also kein Ersatz für die anderen hier. Der Kunde öffnet eine Flexa-fähige Wallet wie Zodl, zeigt einen einmaligen Code, und das Geschäft scannt ihn. Es gibt keine ZEC-Rechnung und kein E-Commerce-Plugin.

Der Kunde behält seine eigenen Coins bis zum Moment der Zahlung. Du als Händler erhältst niemals ZEC. Flexa rechnet mit dir in der Währung ab, die du wählst, daher wird die Krypto-Seite von ihnen abgewickelt.

Flexas eigene Ankündigung beschreibt die Zcash-Integration als Bezahlen mit shielded ZEC. Welchen Adresstyp Flexa empfängt, wird nirgends veröffentlicht.

Die Gebühr beträgt 1 % pro Zahlung, wobei Konvertierung und Verwahrung ohne zusätzliche Kosten enthalten sind.

Es funktioniert in den Vereinigten Staaten und seit Juli 2026 in 37 SEPA-Ländern und -Gebieten. Ob insbesondere ZEC in Europa ausgegeben werden kann, ist nicht angegeben.

**Zuletzt verifiziert:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments-Logo" class="processor-logo processor-logo-wide" />
- **Support-Typ**: Nur transparent
- **Beschreibung**: NOWPayments ist ein Krypto-Zahlungsgateway, das es Händlern ermöglicht, Zcash-Zahlungen und Spenden einfach zu akzeptieren.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments-Logo" width="200" hidden />

Keine shielded Unterstützung. In ihrer Dokumentation heißt es, dass du für Zcash eine transparente Adresse setzen sollst, und ZEC ist die einzige Coin, die sie auf diese Weise besonders hervorheben. Jede Zahlung, die du erhältst, ist auf der blockchain öffentlich.

Standardmäßig nicht-verwahrend. In ihren FAQ heißt es, dass sie keine Gelder speichern und niemals private Schlüssel halten. Es gibt einen optionalen Verwahrungssaldo, also prüfe deine Kontoeinstellungen, wenn du sicher sein musst.

Die Gebühren betragen 0,5 % für eine direkte Zahlung oder 1 % für Multi-Currency-, Festkurs- oder „Gebühr vom Nutzer bezahlt“-Zahlungen, zuzüglich Netzwerkgebühren.

Weltweit verfügbar, außer dort, wo das Gesetz es verbietet. Du brauchst kein KYC, um Krypto zu akzeptieren, nur um Fiat abzuheben.

**Zuletzt verifiziert:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio-Logo" class="processor-logo processor-logo-wide" />
- **Support-Typ**: Transparent (nicht dokumentiert)
- **Beschreibung**: Plisio ist ein Zahlungs-Gateway für Kryptowährungen, das es Unternehmen ermöglicht, Zcash-Zahlungen zu akzeptieren.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio-Logo" width="200" hidden />

Behandle es als verwahrend. Plisios Marketing bezeichnet es als nicht-verwahrend, aber die eigenen Hilfeseiten beschreiben Guthaben, die auf der Plattform gehalten werden, Cold Storage und einen Auszahlungsprozess. Die Behauptung, nicht-verwahrend zu sein, konnte nicht bestätigt werden.

Plisio sagt nie, welche Zcash-Adresstypen verwendet werden, also gehe von transparent aus, bis jemand das Gegenteil bestätigt.

Die Wallet ist kostenlos, das Gateway und die API kosten 0,5 %, und White Label kostet 1,5 %. White Label ist ein Rebranding ihres gehosteten Dienstes, nicht Selbsthosting.

Du brauchst kein KYC, um Zahlungen zu empfangen, und es wird keine Liste eingeschränkter Länder veröffentlicht.

**Zuletzt verifiziert:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay-Logo" class="processor-logo" />
- **Support-Typ**: Nur transparent, shielded Einzahlungen werden abgelehnt
- **Beschreibung**: Binance Pay ist eine Kryptowährungs-Zahlungsplattform, die Zcash-Zahlungen unterstützt.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay-Logo" width="200" hidden />

Binance weist ZEC zurück, die von shielded Adressen gesendet werden. Diese Ablehnung ist der Grund, warum TEX-Adressen geschaffen wurden.

Es ist vollständig verwahrend. Zahlungen bewegen sich off-chain zwischen Binance Pay Wallets, und du brauchst ein verifiziertes Binance-Konto.

Überweisungen von Wallet zu Wallet sind kostenlos, Händlerauszahlungen kosten 0,8 % mit einer Obergrenze von 5 USD, und Mini-Program-Händler zahlen 1 %.

Prüfe die Verfügbarkeit an deinem Standort, bevor du dich darauf verlässt. Binance Pay wird in einigen Ländern und Branchen nicht angeboten, ZEC ist seit 2023 für Nutzer in Frankreich, Spanien, Italien und Polen delistet, und der Dienst im EWR wurde unter MiCA beeinträchtigt.

**Zuletzt verifiziert:** 2026-07-29

---

### Akzeptieren ZEC nicht mehr

Beide wurden hier zuvor aufgeführt. Die jeweils eigene Live-Währungsliste der Anbieter wurde am 29. Juli 2026 überprüft, und Zcash ist bei beiden verschwunden.

**CoinPayments** führt ZEC weder in seiner v2-Coin-Liste noch in seiner Legacy-Liste oder seiner Live-Currencies-API auf, und sein Zcash-Artikel leitet jetzt auf die Startseite weiter.

**CoinGate** führt ZEC weder auf seiner Seite der unterstützten Währungen noch in seiner öffentlichen API auf. Ein Delisting wurde nicht angekündigt, daher sind Grund und Datum unbekannt.

Wenn einer von beiden Zcash wieder aufnimmt, füge ihn mit einem neuen Verifizierungsdatum erneut hinzu.

### Diese Seite aktuell halten

Die Unterstützung für Privacy-Coins verändert sich laufend, daher ist diese Seite nur so gut wie ihre letzte Überprüfung. Wenn du sie prüfst:

1. Prüfe die eigene Währungsliste oder API des Anbieters. Listen von Drittanbietern waren bei beiden oben entfernten Abwicklern veraltet.
2. Prüfe, welche Zcash-Adresstypen unterstützt werden. „Unterstützt Zcash“ bedeutet meistens nur transparente Adressen.
3. Aktualisiere das Verifizierungsdatum in der Tabelle und im Abschnitt dieses Anbieters.
