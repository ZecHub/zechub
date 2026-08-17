<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zallet Schnellreferenz

## Kurzfassung

- Zallet ist eine Full-Node-Zcash-Wallet, die in Rust geschrieben ist. Sie ersetzt die Wallet, die früher in zcashd enthalten war.
- zcashd erreichte am 18. Juli 2026 seinen End-of-Support-Stopp und läuft nicht mehr. Zebra übernimmt jetzt die Knoten-Seite; Zallet übernimmt die Wallet-Seite.
- Du steuerst Zallet über die Befehlszeile mit `zallet rpc <command>`, ähnlich wie du zuvor `zcash-cli` verwendet hast.
- Jedes Argument nach dem Befehlsnamen muss gültiges JSON sein, was bedeutet, dass String-Werte ihre doppelten Anführungszeichen behalten.
- Zallet befindet sich noch in der Alpha-Phase. Befehle können sich zwischen Releases ändern, und noch nicht jede zcashd-RPC wurde übernommen.

## Grundlegende Erklärung

Zallet stellt seine Funktionalität über JSON-RPC bereit, denselben Schnittstellenstil, den die zcashd-Wallet verwendet hat. Alles, was die Wallet tun soll — einen Kontostand prüfen, ein Konto erstellen, eine abgeschirmte Zahlung senden — ist ein Befehl, den du an `zallet rpc` übergibst.

Zwei Dinge unterscheiden sich von der alten `zcash-cli`-Gewohnheit und sind für die meisten frühen Fehler verantwortlich. Erstens müssen Argumente gültiges JSON statt bloßem Text sein, daher trägt ein String-Argument seine eigenen Anführungszeichen innerhalb der Shell-Anführungszeichen. Zweitens hängt die Menge der verfügbaren Befehle davon ab, welche Alpha-Version du verwendest, daher ist die in deinem Binary eingebaute Liste verlässlicher als jede geschriebene Seite, einschließlich dieser hier.

Um alle verfügbaren RPCs aufzulisten:

```bash
zallet rpc help
```

Um detaillierte Hilfe für eine bestimmte RPC zu erhalten:

```bash
zallet rpc help '"<command>"'
```

> **Wichtig:** Jedes Argument nach dem Methodennamen **muss gültiges JSON sein**.  
> String-Werte müssen als `"value"` geschrieben werden (einschließlich der doppelten Anführungszeichen).

## Häufige Fehler

- **Die inneren Anführungszeichen bei String-Argumenten weglassen.** `zallet rpc validateaddress u1abc...` schlägt fehl, weil die Adresse als JSON ankommen muss. Sie muss als `'"u1abc..."'` geschrieben werden.
- **Annehmen, dass jede zcashd-RPC hier existiert.** Die Übertragung ist noch im Gange. Einige Methoden verhalten sich identisch, einige erfordern eine andere Verwendung, und einige werden überhaupt nicht übernommen.
- **Diese Seite als maßgeblicher ansehen als dein Binary.** Zallet ist in der Alpha-Phase und entwickelt sich schnell. Wenn ein Befehl hier nicht funktioniert, prüfe `zallet rpc help`, bevor du annimmst, dass etwas kaputt ist.
- **Erwarten, dass Zallet ein Knoten ist.** Es ist die Wallet-Hälfte des Paars. Zebra betreibt den Knoten, und Zallet kommuniziert damit.

## RPC-Befehle

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Typ    | Erforderlich | Beschreibung              |
|-------------|--------|--------------|---------------------------|
| hexstring   | string | ja           | Transaktions-Hex-String   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Typ    | Erforderlich | Beschreibung   |
|-------------|--------|--------------|----------------|
| hexstring   | string | ja           | Skript-Hex     |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter  | Typ    | Erforderlich | Standard | Beschreibung                         |
|------------|--------|--------------|----------|--------------------------------------|
| txid       | string | ja           |          | Transaktions-ID                      |
| verbose    | number | nein         | 0        | `0` = Hex, ungleich null = JSON-Objekt |
| blockhash  | string | nein         |          | Suche auf diesen Block beschränken   |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Keine Parameter.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Keine Parameter.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Keine Parameter.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Keine Parameter. Gibt das OpenRPC-Schema zurück.

---

### stop

```bash
zallet rpc stop
```

Keine Parameter. (Nur Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Typ    | Erforderlich | Beschreibung            |
|-----------|--------|--------------|-------------------------|
| address   | string | ja           | Transparente Adresse    |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Typ    | Erforderlich | Beschreibung            |
|------------|--------|--------------|-------------------------|
| address    | string | ja           | Transparente Adresse    |
| signature  | string | ja           | Base64-Signatur         |
| message    | string | ja           | Ursprüngliche Nachricht |

---

### walletlock

```bash
zallet rpc walletlock
```

Keine Parameter.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter   | Typ    | Erforderlich | Beschreibung                         |
|-------------|--------|--------------|--------------------------------------|
| passphrase  | string | ja           | Wallet-Passphrase                    |
| timeout     | number | ja           | Sekunden, die die Wallet entsperrt bleibt |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Typ    | Erforderlich | Beschreibung              |
|-----------------------|--------|--------------|---------------------------|
| transparent_address   | string | ja           | Zu konvertierende P2PKH-Adresse |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Typ    | Erforderlich | Beschreibung                                  |
|-----------|--------|--------------|-----------------------------------------------|
| address   | string | ja           | Sapling-Adresse, deren Spending Key exportiert werden soll |

> Wallet muss entsperrt sein. Exportiert nur den Sapling Spending Key.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Typ    | Erforderlich | Beschreibung |
|---------------|--------|--------------|--------------|
| account_uuid  | string | ja           | Konto-UUID   |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Typ             | Erforderlich | Beschreibung                           |
|--------------------|-----------------|--------------|----------------------------------------|
| account            | string / number | ja           | Konto-UUID oder ZIP-32-Kontoindex      |
| receiver_types     | array of string | nein         | Einzuschließende Empfängertypen        |
| diversifier_index  | number          | nein         | Bestimmter Diversifier-Index           |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                  |
|-----------|-----------------|--------------|----------|-------------------------------|
| account   | string / number | ja           |          | Konto-UUID oder ZIP-32-Index  |
| minconf   | number          | nein         | 1        | Mindestanzahl Bestätigungen   |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Typ    | Erforderlich | Standard | Beschreibung                |
|-----------|--------|--------------|----------|-----------------------------|
| minconf   | number | nein         | 1        | Mindestanzahl Bestätigungen |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Typ    | Erforderlich | Beschreibung                           |
|---------------|--------|--------------|----------------------------------------|
| account_name  | string | ja           | Menschenlesbarer Name                  |
| seedfp        | string | nein         | Erforderlich, wenn die Wallet mehrere Seeds hat |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Typ    | Erforderlich | Standard | Beschreibung                          |
|---------------|--------|--------------|----------|---------------------------------------|
| minconf       | number | nein         | 1        | Mindestanzahl Bestätigungen           |
| as_of_height  | number | nein         |          | Abfrage zu dieser Höhe (`-1` = Spitze) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Typ             | Erforderlich | Beschreibung                               |
|--------------|-----------------|--------------|--------------------------------------------|
| operationid  | array of string | nein         | Operations-IDs (weglassen für alle abgeschlossenen) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Typ             | Erforderlich | Beschreibung                        |
|--------------|-----------------|--------------|-------------------------------------|
| operationid  | array of string | nein         | Operations-IDs (weglassen für alle) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter          | Typ     | Erforderlich | Standard | Beschreibung                  |
|--------------------|---------|--------------|----------|-------------------------------|
| minconf            | number  | nein         | 1        | Mindestanzahl Bestätigungen   |
| include_watchonly  | boolean | nein         | false    | Watch-only-Kontostände einschließen |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter  | Typ     | Erforderlich | Standard | Beschreibung                     |
|------------|---------|--------------|----------|----------------------------------|
| account    | string  | ja           |          | Konto-UUID                       |
| hex_data   | string  | ja           |          | Hex-öffentlicher Schlüssel oder Redeem-Skript |
| rescan     | boolean | nein         | true     | Nach dem Import erneut scannen   |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Typ    | Erforderlich | Standard         | Beschreibung                         |
|---------------|--------|--------------|------------------|--------------------------------------|
| key           | string | ja           |                  | Sapling Extended Spending Key        |
| rescan        | string | nein         | `"whenkeyisnew"` | `"yes"`, `"no"` oder `"whenkeyisnew"` |
| start_height  | number | nein         | 0                | Start-Höhe für erneuten Scan         |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Typ     | Erforderlich | Standard | Beschreibung                           |
|--------------------|---------|--------------|----------|----------------------------------------|
| include_addresses  | boolean | nein         | true     | Auch Adressen für jedes Konto zurückgeben |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Typ    | Erforderlich | Beschreibung                         |
|-----------|--------|--------------|--------------------------------------|
| status    | string | nein         | Nach Status filtern (z. B. `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Typ    | Erforderlich | Beschreibung                 |
|----------------|--------|--------------|------------------------------|
| account_uuid   | string | nein         | Auf ein Konto begrenzen      |
| start_height   | number | nein         | Einschließliche Untergrenze  |
| end_height     | number | nein         | Ausschließliche Obergrenze   |
| offset         | number | nein         | So viele Ergebnisse überspringen |
| limit          | number | nein         | Maximale Anzahl zurückzugebender Ergebnisse |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter         | Typ    | Erforderlich | Beschreibung                     |
|-------------------|--------|--------------|----------------------------------|
| unified_address   | string | ja           | Zu untersuchende Unified Address |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Typ             | Erforderlich | Standard | Beschreibung                 |
|--------------------|-----------------|--------------|----------|------------------------------|
| minconf            | number          | nein         | 1        | Mindestanzahl Bestätigungen  |
| maxconf            | number          | nein         | ∞        | Maximale Anzahl Bestätigungen |
| include_watchonly  | boolean         | nein         | false    | Watch-only einschließen      |
| addresses          | array of string | nein         |          | Auf diese Adressen filtern   |
| as_of_height       | number          | nein         |          | Abfrage zu dieser Höhe       |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Typ   | Erforderlich | Beschreibung                                                              |
|-----------|-------|--------------|---------------------------------------------------------------------------|
| accounts  | array | ja           | Array von Objekten: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Typ             | Erforderlich | Standard        | Beschreibung                                      |
|------------------|-----------------|--------------|-----------------|--------------------------------------------------|
| fromaddress      | string          | ja           |                 | Quelladresse oder `"ANY_TADDR"`                  |
| amounts          | array of object | ja           |                 | Empfänger (`address`, `amount`, optional `memo`) |
| minconf          | number          | nein         |                 | Mindestanzahl Bestätigungen                      |
| fee              | null            | nein         |                 | Muss `null` sein (nur ZIP-317)                   |
| privacy_policy   | string          | nein         | `"FullPrivacy"` | Privacy-Policy-String                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Typ    | Erforderlich | Beschreibung                                      |
|------------------|--------|--------------|--------------------------------------------------|
| fromaddress      | string | ja           | Transparente Adresse oder Konto-UUID             |
| toaddress        | string | ja           | Shielded-Zieladresse                             |
| fee              | null   | nein         | Muss `null` sein                                 |
| limit            | number | nein         | Maximale Anzahl der abzuschirmenden Coinbase-UTXOs |
| memo             | string | nein         | Hex-kodiertes Memo                              |
| privacy_policy   | string | nein         | `AllowRevealedSenders` oder `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Typ    | Erforderlich | Beschreibung    |
|-----------|--------|--------------|-----------------|
| txid      | string | ja           | Transaktions-ID |

---

## Verwandte Seiten

- [Migrationsleitfaden: Zcashd zu Zebrad und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — schrittweiser Umstieg von einer bestehenden zcashd-Einrichtung
- [Zebra Full Node](/zcash-tech/zebra-full-node) — die Knoten-Implementierung, mit der Zallet zusammenarbeitet
- [Full Nodes](/zcash-tech/full-nodes) — was der Betrieb eines vollständigen Knotens beinhaltet und warum du einen betreiben möchtest
- [Wallets](/using-zcash/wallets) — leichtere Wallet-Optionen, falls ein vollständiger Knoten mehr ist, als du brauchst
- [Transaktionen](/using-zcash/transactions) — wie sich abgeschirmte und transparente Transaktionen unterscheiden
