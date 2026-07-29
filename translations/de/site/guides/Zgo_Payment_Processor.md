<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ZGo Payment Processor: Zcash ohne Verwahrung akzeptieren

ZGo ist ein nicht-verwahrender Zahlungsabwickler für Zcash. Ein Kunde bezahlt in ZEC aus seiner eigenen Wallet, ZGo überwacht die Zcash-Blockchain auf die Transaktion, und die Gelder kommen über eine abgeschirmte Übertragung direkt in der Wallet des Händlers an. ZGo hält das Geld zu keinem Zeitpunkt zwischenzeitlich.

Dieser Leitfaden erklärt, wie der Zahlungsablauf funktioniert, wie man ein Konto einrichtet und wie man ZGo mit Xero und WooCommerce integriert. Außerdem behandelt er die beiden Fehler, die bei der erstmaligen Einrichtung die meisten Probleme verursachen.

## Auf dieser Seite

1. [Warum ZGo verwenden](#why-use-zgo)
2. [Wie ZGo funktioniert](#how-zgo-works)
3. [Einrichten eines Kontos](#setting-up-an-account)
4. [ZGo mit Xero](#zgo-with-xero)
5. [ZGo mit WooCommerce](#zgo-with-woocommerce)
6. [Funktionen](#features)
7. [Häufige Fehler](#common-mistakes)
8. [Fazit](#conclusion)
9. [Ressourcen](#resources)

## Warum ZGo verwenden

Die meisten Zahlungsabwickler für Kryptowährungen sind verwahrend. Gelder landen zunächst auf dem Konto des Abwicklers und werden später an den Händler weitergeleitet, was bedeutet, dass ein Dritter das Geld vorübergehend kontrolliert und es einfrieren, verzögern oder darüber Bericht erstatten kann.

ZGo verfolgt den gegenteiligen Ansatz. Zahlungen gehen über eine abgeschirmte Zcash-Transaktion direkt von der Wallet des Kunden an die Wallet des Händlers. Der Zahlungsabwickler erstellt lediglich die Rechnung und überwacht die Blockchain auf Bestätigung. Es gibt kein zwischengeschaltetes Guthaben, keinen Auszahlungsablauf und keinen Dritten, der die Abwicklung verzögern kann.

Für einen Händler bedeutet das drei praktische Dinge: vollständige Verwahrung eingehender ZEC, Privatsphäre durch abgeschirmte Transaktionen standardmäßig und keine Abhängigkeit davon, dass ein zentralisierter Anbieter online oder zahlungsfähig bleibt.

## Wie ZGo funktioniert

Der Zahlungsablauf ist derselbe, unabhängig davon, ob ZGo eigenständig, über Xero oder über WooCommerce verwendet wird:

1. Der Händler erstellt in ZGo eine Zahlungsanforderung, die als QR-Code mit dem Betrag, der Rechnungs-ID und einer Zcash-Empfangsadresse dargestellt wird.
2. Der Kunde scannt den QR-Code mit einer Zcash-Wallet (Orchard-, Sapling- und Transparent-Adressarten werden im WordPress-Plugin alle unterstützt) und bestätigt die Zahlung.
3. Die Transaktion wird als abgeschirmte Übertragung von der Wallet des Kunden an die Wallet des Händlers an das Zcash-Netzwerk gesendet.
4. ZGo überwacht die Zcash-Blockchain auf die Transaktion.
5. Nach fünf Bestätigungen markiert ZGo die Zahlung als endgültig und benachrichtigt jede verbundene Integration (Xero, WooCommerce oder einen Webhook).

Die Schwelle von fünf Bestätigungen ist die entscheidende Zahl. Alles davor ist eine laufende Zahlung, keine empfangene Zahlung. Auftragsabwicklung, Bestandsaktualisierungen und jede unumkehrbare Aktion auf Händlerseite sollten auf Schritt 5 warten.

ZGo läuft in jedem modernen Browser auf Desktop oder Mobilgeräten, ohne Installation auf einer der beiden Seiten. Der Kunde benötigt eine Zcash-Wallet; der Händler benötigt eine Zcash-Wallet und ein ZGo-Konto.

<img width="672" height="378" alt="Übersicht über ZGo-Zahlungsanforderung und Blockchain-Überwachung" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Einrichten eines Kontos

Um ein ZGo-Konto zu erstellen, wird eine Zcash-Wallet mit einem kleinen Betrag an ZEC benötigt. Das kleine ZEC-Guthaben deckt die On-Chain-Gebühr für die Konto-Initialisierungstransaktion. Jede große Zcash-Wallet funktioniert dafür; aktuelle Optionen finden Sie unter [ZecHub Wallets](https://zechub.wiki/wallets).

Die grundlegende Einrichtung:

1. Öffnen Sie [zgo.cash](https://zgo.cash/) in einem Browser.
2. Erstellen Sie ein Konto mit einer Zcash-Wallet, die unter der Kontrolle des Händlers steht. Diese Wallet muss die Schlüssel besitzen. Eine Einzahlungsadresse einer Börse funktioniert nicht (siehe [Häufige Fehler](#common-mistakes)).
3. Verifizieren Sie die Wallet, indem Sie die kleine Initialisierungstransaktion senden.
4. Konfigurieren Sie die Empfangsadresse. Alle über dieses Konto abgewickelten Zahlungen landen in dieser Wallet.

Sobald das Konto aktiv ist, kann derselbe Händler ZGo für einmalige Zahlungen (ein einzelner QR-Code bei einer Pop-up-Veranstaltung) verwenden oder es über Xero oder WooCommerce in eine dauerhafte Einrichtung einbinden.

## ZGo mit Xero

[Xero](https://www.xero.com/) ist eine cloudbasierte Buchhaltungsplattform, die von vielen kleinen und mittelgroßen Unternehmen genutzt wird. Die Integration von ZGo und Xero ermöglicht es einem Händler, eine Rechnung in Xero auszustellen, den Kunden in ZEC bezahlen zu lassen und die Rechnung in Xero nach Bestätigung der Transaktion automatisch als bezahlt markieren zu lassen.

So funktioniert es:

1. Der Händler erstellt wie gewohnt eine Rechnung in Xero.
2. ZGo fügt der Rechnung eine Zcash-Zahlungsoption hinzu.
3. Der Kunde bezahlt in ZEC über seine Wallet.
4. ZGo überwacht die [Zcash-Blockchain](https://z.cash/) auf die Transaktion.
5. Nach fünf Bestätigungen meldet ZGo die Zahlung an Xero zurück, das die Rechnung als beglichen markiert.

Die ZEC landen in der Wallet des Händlers, nicht in einem von ZGo oder Xero kontrollierten Konto. Der Buchhaltungseintrag in Xero bleibt automatisch mit der On-Chain-Abwicklung synchron.

Für die erstmalige Einrichtung folgen Sie der speziellen Schritt-für-Schritt-Anleitung: [Konfiguration der Xero-Integration](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo mit WooCommerce

Für Online-Shops auf Basis von [WooCommerce](https://woocommerce.com/) und [WordPress](https://wordpress.org/) bietet ZGo ein eigenes Plugin. Das Plugin fügt Zcash an der Kasse als Zahlungsmethode hinzu und verarbeitet den Bestellstatus automatisch, sobald die Zahlung bestätigt ist.

<img width="672" height="378" alt="ZGo WooCommerce-Plugin: Checkout- und Bestellablauf" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Durchgängiger Ablauf innerhalb eines WooCommerce-Shops:

1. Der Kunde erreicht den Checkout und wählt Zcash als Zahlungsmethode aus.
2. Das Plugin erstellt eine Zahlungsanforderung und zeigt den QR-Code auf der Checkout-Seite an.
3. Der Kunde bezahlt aus seiner Wallet.
4. Die Transaktion wird an das Zcash-Netzwerk gesendet und ZGo beginnt mit der Überwachung.
5. Nach fünf Bestätigungen meldet ZGo die Zahlung dem Plugin als endgültig.
6. Das Plugin markiert die WooCommerce-Bestellung als bezahlt und aktualisiert die Bestelldatenbank.

Die Bestellung ist erst bezahlt, wenn Schritt 6 abgeschlossen ist. Frühere Zustände (Übertragung gesendet, erste Bestätigungen) können dem Kunden als „Zahlung empfangen, Bestätigung ausstehend“ angezeigt werden, aber Bestand, Auftragsabwicklung und jede nachgelagerte Automatisierung sollten auf den endgültigen Status warten.

Das Plugin installiert außerdem ein Administrations-Dashboard innerhalb von WordPress, in dem der Händler Bestellungen und eingehende ZEC-Zahlungen neben der normalen WooCommerce-Bestellansicht überwachen kann. Das Plugin unterstützt alle aktuellen Zcash-Adressarten: Orchard, Sapling und Transparent. Kunden, die mit einer kompatiblen Wallet bezahlen, können die Transaktion abschließen.

## Funktionen

**Nicht-verwahrend.** Zahlungen gehen über abgeschirmte Transaktionen direkt von der Wallet des Kunden an die Wallet des Händlers. ZGo hält die Gelder zu keinem Zeitpunkt zwischenzeitlich, und der Händler behält durchgehend die volle Kontrolle.

**Flexible Bereitstellung.** ZGo kann für einen einzelnen Nachmittag auf einem Pop-up-Markt, für eine dauerhafte Point-of-Sale-Einrichtung oder als Backend für einen Online-Shop über die Integrationen mit Xero oder WooCommerce verwendet werden.

**Browserbasiert.** Keine Installation weder auf Kunden- noch auf Händlerseite. ZGo läuft in jedem modernen Browser auf Desktop oder Mobilgeräten.

**Wallet-Kompatibilität.** Gängige Zcash-Wallets, einschließlich solcher mit Unterstützung für Orchard-, Sapling- und Transparent-Adressarten, können eine ZGo-Rechnung ohne zusätzliche Konfiguration auf Kundenseite bezahlen.

**Integrationen.** Direkte Integrationen mit Xero (Buchhaltung) und WooCommerce (E-Commerce) decken die beiden häufigsten Händler-Workflows sofort ab.

## Häufige Fehler

**Die Bestellung vor fünf Bestätigungen als bezahlt behandeln.** Eine gesendete Transaktion ist nicht dasselbe wie eine bestätigte Zahlung. Die Transaktion kann noch unbestätigt bleiben oder ersetzt werden. Erst nach fünf Bestätigungen meldet ZGo die Zahlung als endgültig, und erst dann sollte die Bestellung in nachgelagerten Systemen als bezahlt markiert werden. Wenn ein Händler Bestand oder Auftragsabwicklung so konfiguriert, dass sie bereits beim Sendeereignis ausgelöst werden, führen betrügerische oder fehlgeschlagene Zahlungen zu echten Verlusten.

**ZGo auf eine Einzahlungsadresse einer Börse verweisen lassen.** Sie sieht wie eine Zcash-Adresse aus, aber Einzahlungsadressen von Börsen werden von der Börse kontrolliert, nicht vom Händler. Die Börse besitzt die Schlüssel, was bedeutet, dass die Börse die Gelder kontrolliert, und das widerspricht dem Zweck eines nicht-verwahrenden Zahlungsabwicklers. Die in ZGo konfigurierte Wallet-Adresse muss zu einer Wallet gehören, deren Seed-Phrase der Händler direkt kontrolliert.

**ZGo als Wallet behandeln.** ZGo ist ein Zahlungsabwickler, keine Wallet. Es speichert keine Schlüssel, hält keine Guthaben und erlaubt dem Händler nicht, Gelder auszugeben. Um das Geld zu empfangen, das ZGo weiterleitet, ist eine separate Zcash-Wallet unter der Kontrolle des Händlers erforderlich.

## Fazit

ZGo gibt Händlern die Möglichkeit, Zcash-Zahlungen zu akzeptieren, ohne die Verwahrung aufzugeben, ohne von einem Vermittler abhängig zu sein und ohne Transaktionsdetails auf einer öffentlichen Chain offenzulegen. Die beiden Integrationen (Xero und WooCommerce) decken die häufigsten Händler-Workflows ab; für alles andere kann ZGo eigenständig in jedem Browser verwendet werden.

Für die Einrichtung ist der Weg kurz: Besorgen Sie sich eine Zcash-Wallet, erstellen Sie ein Konto auf [zgo.cash](https://zgo.cash/) und beginnen Sie entweder direkt mit dem Erstellen von Zahlungsanforderungen oder installieren Sie die passende Integration.

## Ressourcen

- [Offizielle ZGo-Website](https://zgo.cash/)
- [Anleitung zur Konfiguration der Xero-Integration](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) und [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Startseite des Zcash-Projekts](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), die Liste kompatibler Zcash-Wallets
- [Überblick über ZecHub Payment Processors](https://zechub.wiki/payment-processors), ZGo im Kontext anderer Zcash-Zahlungsoptionen
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), der zugehörige ZecHub-Leitfaden für eine selbstgehostete Alternative
