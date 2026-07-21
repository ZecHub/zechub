<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Viewing Keys

Shielded-Adressen ermöglichen es Benutzern, Transaktionen durchzuführen und dabei so wenig Informationen wie möglich auf der Zcash-Blockchain offenzulegen. Was passiert, wenn du sensible Informationen zu einer shielded Zcash-Transaktion gegenüber einer bestimmten Partei offenlegen musst? Jede shielded Adresse enthält einen Viewing Key. Viewing Keys wurden in [ZIP 310](https://zips.z.cash/zip-0310) eingeführt und mit dem Sapling-Netzwerk-Upgrade dem Protokoll hinzugefügt. Viewing Keys sind ein entscheidender Bestandteil von Zcash, da sie es Benutzern ermöglichen, Informationen über Transaktionen selektiv offenzulegen.

### Warum einen Viewing Key verwenden?

Warum sollte ein Benutzer das überhaupt tun wollen? Aus dem Blog von Electric Coin Co. zu diesem Thema...

*- Eine Börse möchte erkennen, wann ein Kunde ZEC auf eine shielded Adresse einzahlt, während die Schlüssel für die **Ausgabeberechtigung** auf sicherer Hardware verbleiben. Die Börse könnte einen eingehenden Viewing Key erzeugen und ihn auf einen mit dem Internet verbundenen **Erkennungs**-Node laden, während der Spending Key auf dem sichereren System verbleibt.*

*- Ein Verwahrer muss Prüfern Einblick in seine Zcash-Bestände geben. Der Verwahrer kann für jede seiner shielded Adressen einen vollständigen Viewing Key erzeugen und diesen Schlüssel mit seinem Prüfer teilen. Der Prüfer kann den Saldo dieser Adressen verifizieren und vergangene Transaktionsaktivitäten zu und von diesen Adressen überprüfen.* 

*- Eine Börse muss möglicherweise Sorgfaltsprüfungen bei einem Kunden durchführen, der Einzahlungen von einer shielded Adresse tätigt. Die Börse könnte den Viewing Key des Kunden für dessen shielded Adresse anfordern und ihn nutzen, um die shielded Transaktionsaktivität des Kunden im Rahmen dieser erweiterten Sorgfaltsprüfungen zu überprüfen.*

### So findest du deinen Viewing Key

#### zcashd

* Liste alle bekannten Adressen mit *./zcash-cli listaddresses* auf

* Führe dann den folgenden Befehl entweder für UAs oder Sapling-shielded-Adressen aus

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* Wähle oben rechts „Backup“, authentifiziere dein Telefon und kopiere dann einfach deinen angezeigten Viewing Key.

### So verwendest du deinen Viewing Key

#### zcashd

* Verwende Folgendes mit einem beliebigen vkey oder ukey: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* Wähle oben rechts „Account“ und klicke unten rechts auf „+“, um deinen Viewing Key hinzuzufügen und zu importieren, damit dein Konto als „read-only“ hinzugefügt wird.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Gehe einfach mit deinem Browser [hierhin](https://zcashblockexplorer.com/vk) und warte auf die Ergebnisse! Hinweis: Dieses Ergebnis befindet sich jetzt auf dem Node von zcashblockexplorer, daher vertraust du diese Informationen den Betreibern von zcashblockexplorer.com an

### Ressourcen

Obwohl es sich um eine großartige Technologie handelt, wird empfohlen, Viewing Keys nur bei Bedarf zu verwenden.

Sieh dir dieses Tutorial zu Viewing Keys an. Nachfolgend findest du eine Liste von Ressourcen zu diesem Thema, falls du tiefer einsteigen möchtest:

- [ECC, Erklärung von Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selektive Offenlegung und Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Videopräsentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
