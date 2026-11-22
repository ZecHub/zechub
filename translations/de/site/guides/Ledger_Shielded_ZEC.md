<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ledger Shielded ZEC Benutzerhandbuch

> Halte, empfange und sende private (shielded) ZEC mit deiner Ledger Hardware-Wallet in Ledger Wallet Desktop.

## Kurz gesagt

* Seit dem 23. September 2026 unterstützt Ledger Wallet Desktop abgeschirmte ZEC. Ein Zcash-Konto hat ein transparentes Guthaben und ein privates Guthaben im Ironwood-Pool.
* Vorerst nur Desktop. Mobile Unterstützung ist als „kommt bald“ angekündigt.
* Sie benötigen ein Nano S Plus, Nano X, Stax oder Flex (nicht das ursprüngliche Nano S), Ledger Wallet Desktop 4.21+ und die neueste Zcash-App.
* Klicken Sie einmal auf **Abschirmung aktivieren**: Ihr Ledger exportiert einen Viewing Key, damit die Desktop-App Ihre privaten Mittel finden kann. Spending Keys verlassen das Gerät niemals.
* Empfangen Sie, wenn möglich, an die private Adresse (u1...). Das Verschieben von ZEC aus Ihrem transparenten Guthaben in den privaten Bereich funktioniert, verknüpft jedoch beide.
* Jede Überweisung wird auf dem Bildschirm des Ledger überprüft und signiert. Prüfen Sie die Adressen dort Zeichen für Zeichen.

## Grundlegende Erklärung

Zcash hat zwei Arten von Guthaben. Transparentes ZEC (t1-Adressen) funktioniert wie Bitcoin: Beträge und Adressen sind öffentlich. Abgeschirmtes ZEC befindet sich in einem abgeschirmten Pool, in dem Sender, Empfänger und Betrag on-chain verschlüsselt sind.

Ledger bewahrt Ihre Ausgabeschlüssel auf dem Hardwaregerät auf. Um ein privates Guthaben anzuzeigen, benötigt Ledger Wallet Desktop einen Unified Full Viewing Key (UFVK). Das Gerät exportiert ihn einmal, und die Desktop-App verwendet ihn, um die blockchain nach Ihren shielded Notes zu durchsuchen. Ein Viewing Key kann Ihre shielded Historie einsehen, aber keine Ausgaben tätigen. Behandeln Sie ihn daher als private Information.

Die folgenden Schritte behandeln die Installation der Zcash-App, das Hinzufügen eines Kontos, das Aktivieren des privaten Guthabens, das Empfangen, das Abschirmen von transparenten ZEC und das Senden aus dem privaten Guthaben.

## Überblick

Am 23. September 2026 fügte Ledger native Shielded-Unterstützung für ZEC zu Ledger Wallet Desktop hinzu. Ein Zcash-Konto enthält nun ein transparentes Guthaben und ein privates Guthaben im Ironwood-Pool von Zcash. Ihre privaten Schlüssel verbleiben auf Ihrem Ledger, und jede Transaktion wird auf dem Gerät überprüft und signiert.

**Nur Desktop.** In der Ankündigung von Ledger heißt es, Shielded ZEC sei „nur in Ledger Wallet Desktop verfügbar. Unterstützung für Mobilgeräte ist derzeit nicht verfügbar, kommt aber bald.“ Die Desktop-App zeigt denselben Hinweis. Überprüft am 15. Oktober 2026.

## Vorbereitung

- Ein Ledger-Gerät, auf dem die Zcash-App läuft: Nano S Plus, Nano X, Stax oder Flex. Die aktuelle Zcash-App ist nicht für das ursprüngliche Nano S ausgelegt.
- Ledger Wallet Desktop 4.21 oder neuer, nur von [ledger.com](https://www.ledger.com) heruntergeladen. In diesem Leitfaden wurde Version 4.24.0 verwendet.
- Die neueste Zcash-App auf Ihrem Ledger (3.9.4 zum Zeitpunkt der Erstellung dieses Leitfadens).
- Eine kleine Menge ZEC zum Testen. Jeder folgende Schritt wurde im Mainnet mit 0.001 ZEC durchgeführt. Jede Transaktion kostet eine geringe Netzwerkgebühr (0.00015 ZEC in unserem Test).
- Ihre Wiederherstellungsphrase mit 24 Wörtern bleibt auf Papier. Geben Sie sie niemals in einen Computer ein und teilen Sie sie niemals.

## Schritt-für-Schritt-Anleitung (Ledger Wallet Desktop)

**1. Die Zcash-App installieren oder aktualisieren**
- Öffnen Sie Ledger Wallet, verbinden und entsperren Sie Ihr Ledger und öffnen Sie **Meine Ledger**. Erlauben Sie die Verbindung auf dem Gerät.
- Suchen Sie im App-Katalog nach **Zcash** und klicken Sie dann auf **Installieren** oder auf **Aktualisieren**, falls sie bereits installiert ist.
- Öffnen Sie die Zcash-App auf Ihrem Ledger. Auf dem Bildschirm steht „Zcash-App ist bereit“. Scrollen Sie nach rechts zu **App-Info**, um die Version zu prüfen.

**2. Ein Zcash-Konto hinzufügen**
- Wählen Sie in Ledger Wallet **Konto hinzufügen**. Suchen Sie unter **Asset auswählen** nach Zcash und wählen Sie **Zcash (ZEC)**, nicht einen Wrapped Token wie Binance-Peg Zcash Token.
- Wenn die Zcash-App auf Ihrem Ledger geöffnet ist, findet Ledger Wallet Ihr Konto. Markieren Sie es unter **Wählen Sie die Konten aus, die Sie hinzufügen möchten** und klicken Sie auf **Bestätigen**.
- Die Kontoseite zeigt **Verfügbares Guthaben**, **Transparentes Guthaben** und **Privates Guthaben** sowie eine Schaltfläche **Shielded aktivieren**.

![Zcash-Konto in Ledger Wallet Desktop mit Hinweis nur für Desktop, transparentem und privatem Guthaben sowie der Schaltfläche „Enable shielded“](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Das private Guthaben aktivieren**
- Klicken Sie auf **Shielded aktivieren**. Das Fenster **Privates Zcash-Guthaben aktivieren** umfasst vier Schritte: Birthday, UFVK, Gerät und Bestätigung.
- **Birthday:** Lassen Sie bei einem neuen Konto die Birthday-Höhe auf dem heutigen Datum. Aktivieren Sie „Dieses Konto hat in der Vergangenheit Shielded ZEC erhalten“ nur, wenn Sie wissen, dass dies der Fall war, da das Scannen ab Block 0 lange dauern kann.
- **UFVK und Gerät:** Ledger Wallet fordert Ihr Ledger auf, Ihren Unified Full Viewing Key (UFVK) zu exportieren. Lesen Sie die Bildschirme auf dem Gerät und bestätigen Sie. Wenn „Geräteverbindung verloren“ angezeigt wird, stellen Sie sicher, dass die Zcash-App geöffnet ist, bestätigen Sie zeitnah und klicken Sie auf **Erneut versuchen**.
- Wenn **UFVK erfolgreich importiert** angezeigt wird, klicken Sie auf **Synchronisierung starten**. Nach Abschluss der Synchronisierung ändert sich die Schaltfläche zu **Guthaben aktualisieren** mit einer Zeit für „Letzte Synchronisierung“.
- Der Viewing Key bleibt auf Ihrem Computer. Er kann Ihre Shielded-Gelder finden, sie aber nicht ausgeben.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. ZEC empfangen und beide Adressen auf Ihrem Ledger überprüfen**
- Klicken Sie auf **Empfangen** und wählen Sie Ihr Zcash-Konto. Ledger Wallet zeigt eine **Adresse für Zcash 1** (transparent, beginnt mit t1) und eine **Private Adresse für Zcash 1** (beginnt mit u1). Frühere Adressen bleiben gültig.
- Ihr Ledger zeigt „Zcash-Adressen überprüfen“, die **Private Adresse** auf zwei Seiten und anschließend die **Öffentliche Adresse**. Vergleichen Sie jedes Zeichen mit dem Bildschirm, bevor Sie eine der beiden Adressen teilen, und bestätigen Sie dann auf dem Gerät.
- Bevorzugen Sie die private Adresse; verwenden Sie die transparente nur, wenn der Absender nichts anderes unterstützt.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Transparentes ZEC in Ihr privates Guthaben verschieben**
- Klicken Sie auf **Senden**. Wählen Sie unter **Selbstübertragung** **An privates Guthaben senden**.
- Geben Sie einen Betrag ein oder verwenden Sie 25 %, 50 %, 75 % oder **Max.**. Prüfen Sie die Netzwerkgebühr und klicken Sie dann auf **Überprüfen**.
- Gehen Sie auf Ihrem Ledger durch: „Transaktion zum Senden von ZEC überprüfen“, „Von öffentlicher an private Adresse übertragen“, den Betrag, die Ausgabeadresse auf zwei Seiten, die Gebühr und die Ablaufhöhe. Prüfen Sie, ob die Ausgabeadresse mit Ihrer privaten Adresse aus Schritt 4 übereinstimmt, und drücken Sie dann beide Tasten bei **Transaktion signieren**.
- Ledger Wallet zeigt **Transaktion gesendet**. In den Transaktionsdetails lautet der Typ **Privat (Ironwood)**.
- Ledger Wallet weist darauf hin, dass eine Selbstübertragung Ihre Shielded-Gelder mit Ihrer öffentlichen Adresse verknüpft. Wenn Sie direkt an Ihre private Adresse empfangen, bleiben sie unverknüpft.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Nach der Bestätigung der Transaktion sinkt das transparente Guthaben und das private Guthaben steigt. Neue Shielded-Gelder werden als „reifend“ angezeigt, bis sie genügend Bestätigungen zum Ausgeben haben.

![Zcash-Konto nach der Abschirmung: transparentes Guthaben reduziert, privates Guthaben erhöht und als reifend angezeigt](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. ZEC aus Ihrem privaten Guthaben senden**
- Sobald das private Guthaben ausgegeben werden kann, klicken Sie auf **Senden** und setzen **Übertragen von** auf **Privates Guthaben**.
- Fügen Sie die Adresse des Empfängers ein und geben Sie den Betrag ein. Sie können ein verschlüsseltes **Memo (optional)** mit bis zu 512 Bytes hinzufügen, das nur der Empfänger lesen kann.
- Prüfen Sie Empfänger, Betrag und Gebühr auf Ihrem Ledger und drücken Sie dann beide Tasten bei **Transaktion signieren**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Gut zu wissen

- Shielded ZEC auf Ledger ist vorerst nur für Desktop verfügbar (überprüft am 15. Oktober 2026).
- Das private Guthaben von Ledger Wallet verwendet den Ironwood-Pool.
- Ledger sagt, dass Sie einem Steuerberater schreibgeschützten Zugriff auf Ihren Transaktionsverlauf geben können. Jeder mit Ihrem Viewing Key kann Ihren Shielded-Verlauf sehen, teilen Sie ihn also nur bewusst.
- Die Gerätebildschirme in diesem Leitfaden wurden mit dem Speculos-Emulator von Ledger (Nano S Plus) aufgenommen, auf dem die Zcash-App 3.9.4 lief und der mit Ledger Wallet Desktop 4.24.0 im Zcash-Mainnet verbunden war. Ein physisches Ledger führt dieselbe App aus und zeigt dieselben Bildschirme.

## Zusätzliche Hilfe

- [Neu in Ledger Wallet: Native Unterstützung für Shielded Zcash](https://www.ledger.com/blog-native-shielded-zcash-support) (Ankündigung von Ledger)
- [Ledger Hilfe-Center](https://support.ledger.com)
- [ZecHub Wallets-Seite](/using-zcash/wallets)
- [Shielded Pools](/using-zcash/shielded-pools) und [Viewing Keys](/zcash-tech/viewing-keys) auf ZecHub
- Eine weitere Hardware-Wallet-Option: das [Keystone Zashi Benutzerhandbuch](/guides/keystone-zashi)
