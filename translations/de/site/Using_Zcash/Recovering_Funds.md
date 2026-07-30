[![Seite bearbeiten](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Wiederherstellung von Geldern in Zcash Wallets

**Warum sollte man seinen privaten Schlüssel aufbewahren?** 

Private Schlüssel sind das Geheimnis hinter der Sicherheit Ihrer digitalen Vermögenswerte. Es ist essenziell, sie sicher aufzubewahren und niemals an Dritte weiterzugeben. 

> In diesem Zusammenhang kann eine **Seed Phrase** als das Äquivalent zu einem privaten Schlüssel betrachtet werden.

Wenn Sie die Kontrolle über Ihre privaten Schlüssel behalten, ist der Wiederherstellungsprozess immer möglich. Es gibt 2 Arten von privaten Zcash Schlüsseln (transparent und shielded), die Sie ganz einfach in Ihre Wallet importieren können, entweder mit der Funktion Sweep Funds oder indem Sie sie als neues Konto importieren. Indem Sie die Kontrolle über Ihre privaten Schlüssel behalten, bewahren Sie die vollständige Kontrolle über Ihre Vermögenswerte und stellen Eigentum, Sicherheit und ein beruhigendes Gefühl sicher.

# Sicherheit und Verantwortung

Es ist entscheidend, dass Nutzer die Risiken im Umgang mit privaten Schlüsseln verstehen und diese Schlüssel vor unbefugtem Zugriff schützen. Die Sicherheit der Gelder hängt von der Verantwortung des Nutzers ab, seine privaten Schlüssel zu schützen.

## Wiederherstellung von Geldern mit YWallet

YWallet gilt als eine der besten Optionen zur Wiederherstellung unzugänglicher Gelder, sowohl aus *rein transparenten* als auch aus shielded privaten Schlüsseln.

### 1) Import des privaten Schlüssels 

1. Laden Sie Ywallet[](https://ywallet.app) herunter

2. Klicken Sie nach dem Öffnen unten rechts auf 'More'

3. Wählen Sie 'Accounts'

4. Klicken Sie oben rechts auf das Pluszeichen 

![Schaltfläche mit Pluszeichen](https://i.postimg.cc/xJbVz7gB/plus.png)

5. Aktivieren Sie 'Restore an account' 

6. Geben Sie die Seed Phrase oder den privaten Schlüssel ein

> **Hinweis**: Wenn Sie Gelder in einer Wallet hatten, die keine shielded Adressen unterstützt (Trust, Coinomi, Guarda usw.), müssen Sie die Funktion 'Sweep Funds' verwenden.

### 2) Sweep Funds

1. Laden Sie Ywallet[](https://ywallet.app) herunter

2. Klicken Sie nach dem Öffnen unten rechts auf 'More'

3. Scrollen Sie nach unten zum Abschnitt Tools und klicken Sie auf 'Sweep'

4. Geben Sie Ihre Seed Phrase ein (Gap limit durchsucht zusätzliche durch die Seed generierte Adressen)

![Sweep-Funds-Bildschirm](https://i.postimg.cc/3055CBcN/sweep.png)

5. Geben Sie den Value Pool für das Ziel ein, das Sie verwenden möchten (Börsen verwenden Transparent)

6. Geben Sie die Zieladresse ein, an die Sie die Gelder einzahlen möchten. 

## Zkool

Bitte sehen Sie sich die ausführliche Zkool-Dokumentation für einen weiteren Weg zur Wiederherstellung von Geldern an:

- [Zkool-Dokumentation](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator ist ein Tool, das möglicherweise verlorene ZEC wiederherstellt (ausgräbt!):

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
