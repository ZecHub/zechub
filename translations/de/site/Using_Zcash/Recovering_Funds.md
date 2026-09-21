<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Wiederherstellung von Wallet-Guthaben

**Warum sollten Sie Ihr Wiederherstellungsmaterial aufbewahren?**

Seeds, Spending Keys, Viewing Keys und Wallet-Dateien sind nicht austauschbar. Eine Seed-Phrase kann Wallet-Schlüssel für viele Wallets ableiten, ersetzt jedoch nicht jeden älteren Schlüssel oder jede Wallet-Datei. Ein Viewing Key kann geschützte Aktivitäten offenlegen, jedoch keine Ausgabe autorisieren.

Die Wiederherstellung hängt davon ab, dass Sie über die richtige Ausgabeberechtigung und einen aktuell unterstützten Weg für den Pool verfügen, in dem sich die Guthaben befinden. Bewahren Sie Wiederherstellungsmaterial vertraulich auf und teilen Sie Seeds, Spending Keys oder Wallet-Dateien niemals mit Personen, denen Sie nicht vertrauen.

# Sicherheit und Verantwortung

Es ist entscheidend, dass Nutzer die Risiken beim Umgang mit privaten Schlüsseln verstehen und diese Schlüssel vor unbefugtem Zugriff schützen. Die Sicherheit der Guthaben hängt von der Verantwortung des Nutzers ab, seine privaten Schlüssel zu schützen.

## Ältere geschützte Guthaben: Sprout, Sapling und Orchard

Ältere geschützte ZEC müssen möglicherweise im Rahmen der Wiederherstellung migriert werden. Der Weg hängt davon ab, welcher geschützte Pool die Guthaben derzeit enthält.

> **NU7 ist für den 5. November 2026 geplant.** Sobald das Upgrade aktiviert wird, funktioniert der derzeitige Migrationsweg aus dem älteren Sprout-Pool nicht mehr.
>
> Wenn Sie noch ZEC im Sprout-Pool haben, migrieren Sie sie vor dem Upgrade. Nach der Aktivierung können vorhandene Werkzeuge Sprout-Guthaben nicht mehr in Sapling, transparente Adressen oder ein anderes Ziel übertragen.
>
> Wenn Sie diese Seite **nach der Aktivierung von NU7** ansehen, ist **Sprout eingefroren**, bis künftig eine Wiederherstellungsmethode verfügbar wird, die derzeit nicht geplant ist.

## Die Antwort auf einer Seite

| Ihre Guthaben befinden sich in | Migrationsweg | Was zu tun ist |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Wenn Sie `wallet.dat` oder einen eigenständigen Sprout Spending Key haben, versuchen Sie zunächst den aktuellen Wiederherstellungsweg von Argos. Wenn Argos nicht geeignet ist, verwenden Sie den älteren Sidecar-Weg im vollständigen Leitfaden. Sprout muss zuerst in Sapling landen und wird anschließend nach Ironwood übertragen. Dieser Weg ist wegen NU7 zeitkritisch. |
| **Sapling** | **Sapling → Ironwood** | Keine Sprout-Wiederherstellungsumgebung erforderlich. Verwenden Sie eine aktuelle Wallet, die Ihr spezifisches Sapling-Konto sowohl wiederherstellen oder ausgeben als auch Ironwood-Transaktionen erstellen kann. Ironwood-Unterstützung allein belegt keine Unterstützung für die Wiederherstellung älterer Sapling-Guthaben. |
| **Orchard** | **Orchard → Ironwood** | Orchard ist nur zum Verlassen vorgesehen. Verwenden Sie den integrierten Migrationsablauf einer aktuellen kompatiblen Wallet von Orchard nach Ironwood. Siehe [Wiederhergestellte Guthaben und der Ironwood-Pool](#recovered-funds-and-the-ironwood-pool). |

### Entscheidungsablauf mit fünf Fragen

1. **Handelt es sich um Sprout?** Eine Seed-Phrase allein weist auf einen Wiederherstellungsweg aus der späteren Sapling-/Orchard-Ära hin, nicht auf Sprout. Eine `zc...`-Adresse oder eine wiederhergestellte Wallet mit ausgewiesenem Sprout-Guthaben weist auf Sprout hin.
2. **Welches Wiederherstellungsmaterial haben Sie?** Suchen Sie nach `wallet.dat`, dem alten Computer oder Datadir, einem `z_exportwallet`-Backup oder einem exportierten Sprout Spending Key. Eine `zc...`-Adresse allein genügt nicht.
3. **Argos oder der ältere Sidecar?** Wenn Sie `wallet.dat` oder einen eigenständigen Sprout Spending Key haben und die Guthaben einfach übertragen möchten, versuchen Sie zuerst [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Verwenden Sie den älteren Sidecar-Weg im vollständigen Leitfaden, wenn Argos das Material nicht verarbeiten kann oder Sie den vollständigen Wiederherstellungsstack selbst kontrollieren möchten.
4. **Haben Sie bereits ein synchronisiertes, nicht beschnittenes zcashd-Datadir?** Dies ist nur für den älteren Sidecar-Weg relevant. Kopieren Sie vorhandene Knotendaten erst nach einem sauberen Herunterfahren; andernfalls behandelt der Leitfaden die Optionen Snapshot und Neuaufbau.
5. **Wo landen die Guthaben?** **Ironwood.** Sprout durchläuft zuerst Sapling, da es keine einzelne direkte Sprout-zu-Ironwood-Transaktion gibt. Halten Sie nicht bei Sapling an.

### Vollständiger Migrationsleitfaden für den ZEC-Pool

Den vollständigen Migrationsleitfaden mit detaillierten Wiederherstellungswegen, Befehlen, Gebühren, Hardwareanforderungen, Datenschutzaspekten, Fehlerbehebung und Quellhinweisen finden Sie im vollständigen Guide.

**Version 1.1 · Aktualisiert am 18. September 2026**

[Lesen Sie den vollständigen Migrationsleitfaden für den ZEC-Pool in ZecHub](/research/zec-pool-migration/view)

> **Bevor Sie beginnen:** Stellen Sie zuerst fest, **was Sie wiederherstellen und welches Wiederherstellungsmaterial Sie noch besitzen**. Ein aktueller Wallet-Seed oder ein unterstützter Nicht-Sprout Spending Key benötigt möglicherweise nur eine normale Wiederherstellung. Älteres Material — etwa ein ZecWallet Lite Seed, eine ältere `wallet.dat` oder ein eigenständiger Sapling- oder Sprout Spending Key — benötigt möglicherweise einen speziellen Wiederherstellungsweg.
>
> Wenn Sie glauben, dass sich die Guthaben in **Sprout** befinden, bestätigen Sie vor dem Einsatz von Zeit für die Wiederherstellung, dass Sie noch über Ausgabeberechtigung verfügen. Eine `zc...`-Adresse oder Viewing-Material allein reicht nicht aus, um die Guthaben zu bewegen.
>
> **YWallet unterstützt Zcash nach Ironwood nicht mehr.** Verwenden Sie **Zkool** für gewöhnliche Nicht-Sprout-Wiederherstellungen aus unterstützten Seeds und Schlüsseln. Verwenden Sie **Argos** für die Wiederherstellung von ZecWallet Lite, älteren Wallet-Dateien und eigenständigen Sapling-/Sprout Spending Keys. Bei Sprout ist Argos der erste auszuprobierende Weg; der vollständige Leitfaden behandelt die ältere Sidecar-Alternative.
>
> Verwenden Sie die nachstehende Tabelle anhand dessen, **was Sie tatsächlich besitzen**, nicht anhand des Wiederherstellungswerkzeugs, an das Sie sich erinnern.

| Sie haben | Hier beginnen |
| --- | --- |
| Eine Seed-Phrase oder einen unterstützten **Nicht-Sprout Spending Key** aus einer aktuellen oder kürzlich gepflegten Wallet, einschließlich älterem YWallet-Zcash-Material | [Zkool](#fund-recovery-with-zkool) |
| Nur einen **Viewing Key** | Zkool kann unterstützte Viewing Keys für Lesezugriff importieren, aber ein Viewing Key kann keine Wiederherstellungsausgabe autorisieren. Suchen Sie den entsprechenden Seed oder Spending Key. |
| Einen 24-Wort-Seed von **ZecWallet Lite** | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Eine ZecWallet Lite- oder zcashd-`wallet.dat` oder einen eigenständigen Sapling-/Sprout Spending Key | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Stand 18. September 2026 ist v1.3.0 aktuell und bevorzugt; verwenden Sie v1.2.0 oder neuer für die Wiederherstellung von `wallet.dat` und Sprout. |
| Sprout-Material, das Argos nicht verarbeiten kann, oder eine Wiederherstellung, bei der Sie die älteren Komponenten selbst kontrollieren möchten | Verwenden Sie den älteren Sidecar-Weg im [vollständigen Leitfaden](/research/zec-pool-migration/view). |
| Keinen funktionierenden Seed oder Spending Key, aber ein gesperrtes Gerät, ein vergessenes Passwort oder einen defekten Datenträger | [Professionelle Wiederherstellung](#professional-recovery-when-you-do-not-have-the-seed). Senden Sie niemals einen funktionierenden Seed oder Spending Key an jemanden, der Sie unaufgefordert kontaktiert. |

## Guthabenwiederherstellung mit Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) ist der gepflegte Zcash-Nachfolger von YWallet desselben Entwicklers. Es unterstützt transparente und moderne geschützte Wiederherstellungswege, einschließlich älterer Sapling-Schlüssel, jedoch **nicht Sprout**.

Hier werden zwei Situationen behandelt:

1. **Wiederherstellung eines Kontos** aus einer Seed-Phrase, einem privaten Schlüssel oder einem Viewing Key
2. **Übertragen von Guthaben** aus einer Wallet, die ausschließlich transparente Adressen unterstützte

### 1) Wiederherstellung eines Kontos

1. Installieren Sie Zkool von der [Release-Seite](https://github.com/hhanh00/zkool2/releases) und öffnen Sie es.
2. Tippen Sie im **Account Manager** (der Hauptseite) auf die Schaltfläche **+**, um zum Bildschirm **New Account** zu gelangen.
3. Geben Sie einen **Account Name** zur Identifizierung dieses Kontos ein.
4. Aktivieren Sie **Restore Account?**. Dadurch werden die Felder für Schlüssel und Geburtshöhe angezeigt.
5. Fügen Sie Ihren Schlüssel in **Key (Seed Phrase, Private Key, or Viewing Key)** ein. Zkool akzeptiert Seed-Phrasen, geheime Sapling-Schlüssel, transparente erweiterte Schlüssel und unterstützte Viewing Keys. Ein Viewing Key ist schreibgeschützt und kann keine Ausgabe autorisieren.
6. Geben Sie für ein altes Konto eine **Birth Height** ein. Zkool scannt keine Blöcke vor dieser Höhe. Wählen Sie daher eine Höhe vor der ersten Aktivität der Wallet, wenn Sie unsicher sind. Eine zu spät gesetzte Geburtshöhe kann dazu führen, dass echte Transaktionen als fehlend erscheinen.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Speichern Sie das Konto und synchronisieren Sie es anschließend.

### Wiederherstellung eines Seeds aus einer anderen Wallet

Wenn der Seed aus einer Wallet stammt, die ZIP 316 folgt — einschließlich ZODL (früher Zashi), Zingo oder zcashd — aktivieren Sie **Advanced Options** und anschließend **Use Internal Change**, bevor Sie speichern.

ZIP 316 verwendet eine separate interne Wechselgeldadresse. Die Wiederherstellung eines solchen Kontos ohne **Use Internal Change** kann dazu führen, dass Wechselgeldausgänge als fehlend erscheinen, obwohl die Guthaben weiterhin vorhanden sind.

Unter **Advanced Options** befinden sich zwei weitere Felder:

- **Extra Passphrase (optional)**, nur falls die ursprüngliche Wallet eine verwendet hat
- **Account Index**, falls die ursprüngliche Wallet mehrere Konten mit einem Seed hatte. Die Guthaben können sich unter einem anderen Index befinden.

> **Diese beiden erscheinen erst, sobald sich eine gültige Seed-Phrase im Feld Key befindet.** Ist das Feld leer oder enthält es einen privaten Schlüssel oder Viewing Key, zeigt Zkool nur **Use Internal Change** und **H/W Ledger** an. Fügen Sie zuerst den Seed ein und öffnen Sie dann Advanced Options.

### 2) Guthaben aus einer Wallet nur mit transparenten Adressen übertragen

Falls die alte Wallet oder das Konto nur **transparente ZEC** enthielt, stellen Sie zuerst das Konto wieder her, suchen Sie jede verwendete transparente Adresse und übertragen Sie die Guthaben anschließend an ein aktuelles geschütztes Ziel, das Sie kontrollieren. Gehen Sie nicht davon aus, dass eine alte Wallet-Marke immer ausschließlich transparent war; einige Produkte fügten in späteren Versionen geschützte Unterstützung hinzu.

1. Stellen Sie das Konto anhand der oben genannten Schritte wieder her.
2. Öffnen Sie das Konto und gehen Sie zur Seite **Receive Funds**.
3. Tippen Sie auf die Lupe in der oberen Leiste (**Find other transparent addresses**). Wallets, die Adressen rotieren, etwa Ledger und Exodus, erzeugen viele transparente Adressen aus einem Seed; damit finden Sie diejenigen mit Guthaben.
4. **Setzen Sie das Konto anschließend zurück und synchronisieren Sie es.** Die neu gefundenen Adressen erfassen ihre Guthaben erst beim nächsten Scan. Wenn Sie dies überspringen, sieht es so aus, als hätte die Übertragung nichts gefunden.
5. Gehen Sie zur Seite **Send**. Neben dem Guthaben befinden sich drei Symbolschaltflächen. Sie haben keine Textbeschriftungen; fahren Sie mit der Maus darüber oder drücken Sie lange, um ihre Namen anzuzeigen:
   - **Shield One** (umrandetes Schild) überträgt jeweils eine transparente Adresse
   - **Shield All** (ausgefülltes Schild) überträgt alles aus allen transparenten Adressen auf einmal
   - **Unshield All** (offenes Vorhängeschloss) geht in die andere Richtung, zu einer transparenten Adresse

> **Shield One ist die privatere Wahl.** Das Abschirmen mehrerer Adressen in einer Transaktion verknüpft sie öffentlich als derselben Person gehörend. Zkool warnt selbst davor, bevor Shield All ausgeführt wird.

6. Prüfen Sie die Transaktion und senden Sie sie.

Unshield All ist nützlich für Auszahlungen an eine Börse, die nur transparente Adressen akzeptiert. Die Abschirmungs-Schaltflächen erscheinen nur, wenn das Konto eine geschützte Adresse hat, und Unshield All nur, wenn es eine transparente Adresse hat.

## Wiederherstellung von ZecWallet Lite und älteren Wallets mit Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) wird nicht mehr gepflegt und sein Repository ist archiviert. Die Seed-Ableitung unterscheidet sich vom Schema aktueller Wallets. Daher kann der Import derselben Phrase in eine moderne Wallet Guthaben übersehen, die sich auf zusätzlich abgeleiteten Adressen von ZecWallet Lite befinden. [Argos](https://argos.sovright.com) von Sovright ist ein Desktop-Wiederherstellungsarbeitsbereich für diesen und andere ältere Wiederherstellungsfälle.

Argos liest Seeds und Wallet-Dateien von ZecWallet Lite, zcashd `wallet.dat`, eigenständige erweiterte Sapling-Spending Keys und Sprout-Spending-Material. Bei Sprout reicht ein ZecWallet Lite Seed allein nicht aus, da diese Schlüssel separat erzeugt wurden. Argos ist ein Wiederherstellungswerkzeug und keine Wallet für den täglichen Gebrauch: Untersuchen Sie das Quellmaterial lokal, scannen Sie es und übertragen Sie es dann in eine gepflegte Wallet, die Sie kontrollieren.

Least Authority [prüfte](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) das Werkzeug. Die Wiederherstellung selbst ist kostenlos. Während der Übertragung kann eine optionale Spende an Sovright angezeigt werden.

> **Geben Sie einen Seed niemals auf einer Website ein.** Die Argos-Website dient nur zum Download und zum [Benutzerhandbuch](https://argos.sovright.com/guide.html). Schlüssel bleiben in der signierten Desktop-App. Die Validierung erfolgt lokal anhand der BIP-39-Prüfsumme. Das Seed-Feld wird geleert, sobald der Scan startet. Jeder, der Ihnen schreibt und diesen Seed verlangt, „um Ihnen bei der Wiederherstellung Ihrer Guthaben zu helfen“, versucht Sie zu betrügen.

### Bevor Sie Argos öffnen

1. Laden Sie die Desktop-App von der [offiziellen Argos-Website](https://argos.sovright.com) oder der [GitHub-Release-Seite](https://github.com/sovright/argos/releases) herunter. Überprüfen Sie Prüfsummen oder Signaturen, wenn sie veröffentlicht werden.
2. Verwenden Sie die aktuelle Argos-Version. Stand 18. September 2026 ist **v1.3.0** aktuell und bevorzugt. Verwenden Sie **v1.2.0 oder neuer für die Wiederherstellung von `wallet.dat` und Sprout**. Builds älter als 1.1.0 können noch scannen, erstellen aber Übertragungen vor Ironwood, die vom Netzwerk abgelehnt werden; aktualisieren Sie und versuchen Sie es erneut.
3. Arbeiten Sie auf einem Computer, dem Sie vertrauen. Bevorzugen Sie vollständige Festplattenverschlüsselung. Teilen Sie Ihren Bildschirm nicht, während ein Seed, eine Passphrase oder ein Spending Key sichtbar ist.
4. Halten Sie eine Zieladresse Unified Address aus einer gepflegten Wallet bereit, die Sie kontrollieren, etwa [ZODL](https://zodl.app/). Bestätigen Sie die Adresse in dieser Wallet, bevor Sie sie in Argos einfügen.

### Seed-Wiederherstellung

1. Öffnen Sie Argos und wählen Sie **I have my 24-word seed phrase**. Eine Seed-Wiederherstellung benötigt keine Wallet-Datei.
2. Fügen Sie die Phrase ein und klicken Sie auf **Validate seed**. Wenn angezeigt wird, dass der Seed gültig ist, fahren Sie fort.
3. Geben Sie eine **Geburtstags-Blockhöhe** ein oder die bestmögliche Schätzung dafür, wann die Wallet erstellt wurde. Eine frühere Höhe ist langsamer, aber sicherer als eine zu späte Schätzung.
4. Verwenden Sie unter den Server-Steuerelementen die Voreinstellung für den aktuellen Server oder geben Sie lightwalletd-URLs ein. Durch Kommata getrennte URLs werden der Reihe nach versucht. Öffentliche Beispiele:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Fügen Sie die Zieladresse Unified Address ein.
6. Klicken Sie auf **start scan**. Je nach Geburtstags-Blockhöhe kann dies Minuten oder Tage dauern. Sie können den Arbeitsbereich schließen und erneut öffnen; der Scan wird fortgesetzt.
7. Wenn der Scan abgeschlossen ist, überprüfen Sie Guthaben, Gebührenschätzung und Zieladresse und klicken dann auf **sweep**.

Das Übertragen einer Sweep-Transaktion ist unumkehrbar. Bewahren Sie die ursprüngliche Wallet-Datei auf, bis jeder relevante Pool übertragen wurde und die Ziel-Wallet die erwarteten Guthaben anzeigt. Sobald die Wiederherstellung abgeschlossen ist, legen Sie ältere Geheimnisse still, statt sie weiterhin für neue Aktivitäten zu verwenden.

### Wallet-Dateien und eigenständige Schlüssel

Auf dem Willkommensbildschirm umfasst **I have a wallet file** eine ZecWallet Lite-Datei, eine zcashd-`wallet.dat` oder eigenständige erweiterte Sapling-Spending Keys. Die Wiederherstellung eines eigenständigen Sprout Spending Keys erfolgt über den Sprout-Wiederherstellungsweg/die CLI von Argos.

Argos liest Wallet-Dateien, ohne sie zu verändern. Wenn die Wallet verschlüsselt ist, geben Sie die Passphrase ein, wenn Sie dazu aufgefordert werden; sie wird im Speicher verwendet und nicht auf den Datenträger geschrieben. Überprüfen Sie die Anzahl transparenter, Sapling- und Sprout-Schlüssel, bevor Sie einen Scan starten.

Viewing Keys werden für eine Übertragung nicht akzeptiert, da sie keine Ausgaben autorisieren können.

### Hinweise zu Sprout

Ein ZecWallet Lite Seed leitet keine Sprout-Schlüssel ab. Diese Schlüssel wurden separat erzeugt. Stellen Sie Sprout aus einer zcashd-`wallet.dat` oder über einen eigenständigen Spending Key in der CLI wieder her.

Falls die Datei bereits ausgabefähige Note-Daten und einen zwischengespeicherten Witness enthält, kann Argos **Sweep Sprout funds** ohne Blockchain-Scan anbieten. Andernfalls kann es einen fortsetzbaren vollständigen Blockscan über das P2P-Netzwerk durchführen. Dieser Scan ist groß und langsam. Der dabei geschriebene Checkpoint ist ausgabefähig, schützen Sie ihn daher wie die ursprüngliche Wallet.

Sprout-Werte können nur in Sapling landen. Sobald die Sapling-Guthaben bestätigt und ausgabefähig sind, übertragen Sie sie mit einer aktuellen Wallet, die das wiederhergestellte Sapling-Konto unterstützt, weiter nach **Ironwood**. Halten Sie nicht bei Sapling an.

## Wiederhergestellte Guthaben und der Ironwood-Pool

Seit der Aktivierung des Ironwood-Upgrades (NU6.3) am 28. Juli 2026 ist der Orchard-Pool nur zum Ausgeben vorgesehen. Keine neuen Werte können in ihn gelangen, und bestehende Werte verlassen ihn über die Schleuse nach Ironwood.

Wenn sich Ihre wiederhergestellten Guthaben in Orchard befinden, übertragen Sie sie mit dem **integrierten Migrationsablauf einer aktuellen Wallet** nach Ironwood. Orchard ist nach NU6.3 nur zum Verlassen vorgesehen.

Zkool 6.30.0 ist Stand 18. September 2026 aktuell und unterstützt Ironwood. Sein Migrationsdesign ist datenschutzorientiert, entspricht jedoch nicht zwingend ZIP 318. Andere aktuelle Wallets können eine schrittweise Migration im Stil von ZIP 318 verwenden. Folgen Sie dem aktuellen Migrationsbildschirm und den Release Notes der installierten Wallet, statt selbst einen manuellen Betrag oder Zeitplan zu erstellen.

Eine schrittweise Migration kann mehrere Transaktionen verwenden, sodass die Gesamtgebühr höher sein kann als bei einer einmaligen Übertragung.

> **Migrationsbeträge sind öffentlich.** Wenn Werte die Schleuse passieren, sind Betrag und Blockhöhe on-chain sichtbar, obwohl Sender und Empfänger weiterhin geschützt bleiben. Verwenden Sie die integrierte private/schrittweise Migrationsrichtlinie der Wallet, wenn Datenschutz wichtig ist, sowie gegebenenfalls Netzwerkdatenschutz wie Tor oder eine andere vertrauenswürdige Datenschutzebene. Netzwerkdatenschutz kann Ihre IP-Verknüpfung verbergen; den öffentlichen Übergangsbetrag verbirgt er nicht.

## Tiefgreifende Wiederherstellung mit ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) ist ein **in Arbeit befindliches** Zingo Labs-Wiederherstellungsprojekt, das sich derzeit auf ZecWallet Lite-Wallet-Dateien und die Migration von Wallet-Formaten konzentriert. Seine README verweist Nutzer für die Guthabenwiederherstellung derzeit auf die Exportoption **Zingolib**, während eine umfassendere ZeWIF-Unterstützung noch entwickelt wird.

Betrachten Sie es als Werkzeug für fortgeschrittene Sonderfälle und nicht als Standard-Wiederherstellungsweg. Für gewöhnliche ZecWallet Lite Seeds, Wallet-Dateien, zcashd-`wallet.dat` und unterstützte eigenständige Spending Keys versuchen Sie zuerst Argos. Überprüfen Sie alles, was mit ZExCavator wiederhergestellt wurde, in einer gepflegten Wallet, bevor Sie sich darauf verlassen.

## Professionelle Wiederherstellung ohne Seed

Wenn der Seed oder Schlüssel verloren ist, kann keine selbst gehostete Wiederherstellung beginnen. Manche Menschen in dieser Lage verwenden eine professionelle Wiederherstellungsfirma für vergessene Passwörter, Hardwareausfälle oder unlesbare Datenträger.

Dieser Weg ist nicht dasselbe wie die Wiederherstellung eines noch vorhandenen Seeds. Geben Sie niemals einen funktionierenden Seed an jemanden weiter, der anbietet, ihn für Sie „wiederherzustellen“. Die Betrugsvariante dieses Dienstes ist verbreitet.

[Unciphered](https://unciphered.com) ist eine Firma, die diese Arbeit intern durchführt und über die unter anderem [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/) berichtet hat. Sie ist ein allgemeiner Dienst für Krypto-Wiederherstellung, kein Zcash-spezifisches Werkzeug, und berechnet Gebühren für die Arbeit. ZecHub empfiehlt keine Wiederherstellungsfirma. Wenn Sie diesen Weg wählen, bestätigen Sie die offizielle Domain selbst und gehen Sie davon aus, dass jeder, der Ihnen zuerst eine Direktnachricht sendet, ein Betrüger ist.

Wenn Sie noch einen funktionierenden Seed oder Spending Key haben, beginnen Sie stattdessen mit einem selbst gehosteten Wiederherstellungsweg wie Zkool oder Argos auf Ihrem eigenen Computer.

## YWallet wird nicht mehr gepflegt

YWallet war lange Zeit das auf dieser Seite empfohlene Wiederherstellungswerkzeug, und viele ältere Leitfäden verweisen noch darauf.

Der Entwickler erklärt nun, dass YWallet Zcash seit dem Ironwood-Update nicht mehr unterstützt, und verweist Zcash-Nutzer auf **Zkool**, den gepflegten Nachfolger. Bewahren Sie älteres YWallet-Seed-/Schlüsselmaterial auf, beginnen Sie jedoch keine neue Zcash-Migration in YWallet.

Wenn Sie bereits Zcash-Wiederherstellungsmaterial von YWallet besitzen, stellen Sie es in Zkool über den oben beschriebenen unterstützten Seed-/Schlüsselweg wieder her.

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) – welche Wallets gepflegt werden und wie gut sie für Ironwood vorbereitet sind, einschließlich Argos
- [Ironwood](/zcash-tech/ironwood) – was das Upgrade verändert hat und warum Guthaben migriert werden
- [Memos](/using-zcash/memos) – wie verschlüsselte Memos funktionieren
- [Viewing Keys](/zcash-tech/viewing-keys) – Lesezugriff ohne Ausgabeberechtigung
- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) – öffentliche lightwalletd-Endpunkte, die Argos verwenden kann
- [Argos Benutzerhandbuch](https://argos.sovright.com/guide.html) – offizielle Anleitung von Sovright
- [Naomi Brockwell über Wiederherstellungswerkzeuge](https://x.com/naomibrockwell/status/2079146521405333526) – Argos-Anleitung und ein Hinweis zur professionellen Wiederherstellung
