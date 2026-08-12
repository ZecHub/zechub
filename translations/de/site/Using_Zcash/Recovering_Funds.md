<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Wiederherstellung von Guthaben in Zcash Wallets

**Warum deinen privaten Schlüssel aufbewahren?**

Private Schlüssel sind das Geheimnis für die Sicherheit deiner digitalen Vermögenswerte. Es ist essenziell, sie sicher aufzubewahren und niemals mit Dritten zu teilen.

> In diesem Zusammenhang kann eine **Seed Phrase** als das Äquivalent eines privaten Schlüssels betrachtet werden.

Wenn du die Kontrolle über deine privaten Schlüssel behältst, ist eine Wiederherstellung jederzeit möglich. Es gibt 2 Arten von Zcash privaten Schlüsseln (transparent und abgeschirmt), und du kannst sie ganz einfach in deine Wallet importieren, entweder mit der Funktion Sweep Funds oder durch das Importieren als neues Konto. Indem du die Kontrolle über deine privaten Schlüssel behältst, bewahrst du die vollständige Kontrolle über deine Vermögenswerte und sorgst für Eigentum, Sicherheit und ein gutes Gefühl.

# Sicherheit und Verantwortung

Es ist entscheidend, dass Nutzer die Risiken beim Umgang mit privaten Schlüsseln verstehen und diese Schlüssel vor unbefugtem Zugriff schützen. Die Sicherheit der Guthaben hängt von der Verantwortung des Nutzers ab, seine privaten Schlüssel zu schützen.

> **Bevor du beginnst:** Wiederherstellungsanleitungen verwiesen früher auf Ywallet. Der Entwickler hat bestätigt, dass es nicht für das Ironwood-(NU6.3)-Netzwerkupgrade aktualisiert wird und der Chain daher nicht mehr folgen kann. Verwende stattdessen **Zkool**, das vom selben Entwickler stammt und der gepflegte Nachfolger ist. Siehe [Ywallet wird nicht mehr gepflegt](#ywallet-is-no-longer-maintained) am Ende dieser Seite.

## Guthabenwiederherstellung mit Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) ist der Nachfolger von Ywallet vom selben Entwickler und unterstützt sowohl transparente als auch abgeschirmte Wiederherstellung.

Hier werden zwei Situationen behandelt:

1. **Wiederherstellen eines Kontos** aus einer Seed Phrase, einem privaten Schlüssel oder einem Viewing Key
2. **Sweep Funds** aus einer Wallet, die nur jemals transparente Adressen unterstützt hat

### 1) Ein Konto wiederherstellen

1. Installiere Zkool von der [Releases-Seite](https://github.com/hhanh00/zkool2/releases) und öffne es
2. Tippe im **Account Manager** (der Hauptseite) auf die Schaltfläche **+**, um zum Bildschirm **New Account** zu gelangen
3. Gib einen **Account Name** ein, um dieses Konto zu identifizieren
4. Aktiviere **Restore Account?**. Dadurch werden die Felder für Schlüssel und Birth Height eingeblendet
5. Füge deinen Schlüssel in **Key (Seed Phrase, Private Key, or Viewing Key)** ein. Zkool akzeptiert eine Seed Phrase, einen Sapling-Geheimschlüssel, einen transparenten erweiterten Schlüssel oder einen Viewing Key
6. Gib eine **Birth Height** ein, wenn du ungefähr weißt, wann die Wallet erstmals verwendet wurde. Damit teilst du Zkool mit, wo mit dem Scannen begonnen werden soll, was viel Zeit spart

![Zkool-Bildschirm „New Account“ mit aktiviertem Restore Account und aktivierten Advanced Options](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Keine Birth Height?** Lass das Feld leer und bestätige die Warnung. Zkool scannt dann ab dem Beginn der Chain, was langsamer ist, aber nichts übersieht. Wenn deine Guthaben vor dem Sapling-Upgrade vom Oktober 2018 liegen, lass das Feld lieber leer, anstatt eine spätere Höhe zu schätzen, da der Scan sonst deine Transaktionen vollständig überspringen kann.

7. Speichere das Konto und synchronisiere es dann

### Eine Seed aus einer anderen Wallet wiederherstellen

Wenn die Seed aus einer anderen Wallet stammt und der Kontostand nach der Synchronisierung falsch aussieht, liegt das normalerweise an der Ableitung der Change-Adresse.

Aktiviere den Schalter **Advanced Options**, weiter unten auf demselben Bildschirm „New Account“, und aktiviere vor dem Speichern **Use Internal Change**.

Wallets leiten Change-Adressen nicht alle auf dieselbe Weise ab. Wenn du eine ZODL-Seed ohne diese Einstellung in Zkool wiederherstellst, kann ein Kontostand angezeigt werden, dem deine Change-Notes fehlen, was wie verlorene Guthaben aussieht, es aber nicht ist. Der Tooltip von Zkool für diesen Schalter verweist noch auf Zashi, so hieß ZODL früher.

Unter **Advanced Options** befinden sich noch zwei weitere Felder:

- **Extra Passphrase (optional)**, nur wenn die ursprüngliche Wallet eine verwendet hat
- **Account Index**, falls die ursprüngliche Wallet mehrere Konten unter einer Seed hatte. Die Guthaben könnten unter einem anderen Index liegen

> **Diese beiden erscheinen nur, wenn sich eine gültige Seed Phrase im Feld Key befindet.** Ist das Feld leer oder enthält es einen privaten Schlüssel oder Viewing Key, zeigt Zkool nur **Use Internal Change** und **H/W Ledger** an. Füge zuerst die Seed ein und öffne dann Advanced Options.

### 2) Sweep Funds aus einer Wallet nur mit transparenten Adressen

Wenn sich deine Guthaben in einer Wallet befinden, die nie abgeschirmte Adressen unterstützt hat (Trust, Coinomi, Guarda und ähnliche), stelle zuerst das Konto wieder her und verschiebe die Guthaben dann in den abgeschirmten Pool.

1. Stelle das Konto mit den oben genannten Schritten wieder her
2. Öffne das Konto und gehe zur Seite **Receive Funds**
3. Tippe auf die Lupe in der oberen Leiste (**Find other transparent addresses**). Wallets, die Adressen rotieren lassen, wie Ledger und Exodus, erzeugen viele transparente Adressen aus einer Seed, und damit werden diejenigen gefunden, auf denen Guthaben liegen
4. **Setze das Konto danach zurück und synchronisiere es.** Die neu gefundenen Adressen übernehmen ihre Guthaben erst beim nächsten Scan; wenn du das überspringst, sieht es so aus, als hätte der Sweep nichts gefunden
5. Gehe zur Seite **Send**. In der Nähe des Kontostands findest du drei Symbolschaltflächen. Sie haben keine Textbeschriftung, also fahre mit der Maus darüber oder halte sie länger gedrückt, um ihre Namen zu sehen:
   - **Shield One** (umrandeter Schild) verschiebt jeweils eine transparente Adresse
   - **Shield All** (ausgefüllter Schild) verschiebt alles von allen transparenten Adressen auf einmal
   - **Unshield All** (offenes Vorhängeschloss) macht das Gegenteil, in eine transparente Adresse

> **Shield One ist die privatere Wahl.** Das Abschirmen mehrerer Adressen in einer einzigen Transaktion verknüpft sie öffentlich als zu derselben Person gehörend. Zkool selbst warnt davor, bevor Shield All ausgeführt wird.

6. Prüfe die Transaktion und sende sie

Unshield All ist nützlich, wenn du an eine Börse auszahlen willst, die nur transparente Adressen akzeptiert. Die Shielding-Schaltflächen erscheinen nur, wenn das Konto eine abgeschirmte Adresse hat, und Unshield All nur, wenn es eine transparente hat.

## Wiederhergestellte Guthaben und der Ironwood-Pool

Seit das Ironwood-(NU6.3)-Upgrade am 28. Juli 2026 aktiviert wurde, ist der Orchard-Pool nur noch für Ausgaben nutzbar. Es kann kein neuer Wert mehr in ihn hineingelangen, und bestehender Wert verlässt ihn über das Turnstile in Richtung Ironwood.

Wenn sich deine wiederhergestellten Guthaben in Orchard befinden, müssen sie migrieren, bevor sie sich normal verhalten. Öffne das Kontomenü und wähle **Note Migration**. Die Option wird nur angezeigt, wenn tatsächlich etwas zu migrieren ist.

Der Bildschirm trägt den Titel **Orchard to Ironwood Migration** und läuft in zwei Phasen ab. Zuerst werden nicht standardmäßige Notes in Standardstückelungen aufgeteilt, danach werden diese Notes einzeln verschoben. **Migration Speed** ist ein Schieberegler von Ultra Fast bis Slow, der die zufällige Verzögerung zwischen den Schritten festlegt. **Start Migration** führt den gestuften Prozess im Hintergrund aus, und du kannst die Seite schließen und später fortsetzen. **One Shot** erledigt es in einem einzigen Durchlauf.

Jeder Schritt ist eine eigene Transaktion, also fällt bei jedem eine Gebühr an.

> **Migrationsbeträge sind öffentlich.** Wenn Wert das Turnstile passiert, sind Betrag und Blockhöhe on-chain sichtbar, auch wenn Absender und Empfänger abgeschirmt bleiben. Auffällige Beträge können dich identifizieren, deshalb solltest du die gestufte Migration bei geringerer Geschwindigkeit gegenüber One Shot bevorzugen und erwägen, deine Verbindung vorher über Tor oder ein VPN zu leiten, damit deine IP-Adresse nicht mit dem von dir bewegten Betrag verknüpft wird.

## Tiefgehende Wiederherstellung mit ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) ist ein Wiederherstellungstool von Zingo Labs für Fälle, in denen eine normale Wiederherstellung nicht funktioniert, etwa bei einer beschädigten oder unvollständigen Wallet-Datei.

> Sein letztes Update liegt vor den jüngsten Netzwerkupgrades, daher solltest du es als letzte Option betrachten und alle wiederhergestellten Schlüssel in einer gepflegten Wallet verifizieren, bevor du dich auf das Ergebnis verlässt.

## Ywallet wird nicht mehr gepflegt

Ywallet war lange Zeit das empfohlene Wiederherstellungstool auf dieser Seite, und viele ältere Anleitungen verweisen noch darauf.

Sein Entwickler hat bestätigt, dass es nicht für Ironwood aktualisiert wird. Eine Wallet, die die aktuellen Konsensregeln nicht unterstützt, kann keine gültigen Transaktionen erstellen und kann daher nicht mehr verwendet werden, um wiederhergestellte Guthaben zu bewegen. **Zkool**, vom selben Entwickler, ist der gepflegte Nachfolger und wird nun auf dieser Seite verwendet.

Wenn du bereits Guthaben in Ywallet liegen hast, stelle dieselbe Seed Phrase mit den oben genannten Schritten in Zkool wieder her.

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) - welche Wallets gepflegt werden und wie weit sie für Ironwood bereit sind
- [Ironwood](/zcash-tech/ironwood) - was das Upgrade geändert hat und warum Guthaben migrieren
- [Memos](/using-zcash/memos) - wie verschlüsselte Memos funktionieren
- [Viewing Keys](/zcash-tech/viewing-keys) - Nur-Lese-Zugriff ohne Ausgabemöglichkeit
