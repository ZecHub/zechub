# MultiSig-Demo

> **Historisch. Diese Anleitung funktioniert nicht mehr.**
>
> Jeder nachfolgende Schritt hängt von zcashd ab, das am 18. Juli 2026 automatisch das Ende seines Supports erreicht hat. Die sieben gemeinsam mit dieser Seite bereitgestellten Skripte steuern es über `zcash-cli`, daher kann keines davon heute einen laufenden Knoten erreichen.
>
> Diese Skripte können nicht mechanisch portiert werden. Sie basieren auf den RPCs für Rohtransaktionen und Wallets (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`), die zcashd vor dem Halt eingestellt hat; Zallet ersetzt diese durch neue Methoden, die mit PCZTs statt mit Rohtransaktions-Hex arbeiten, und befindet sich weiterhin in der Beta-Phase, wobei viele zcashd-Methoden noch nicht portiert wurden.
>
> Informationen zur Mehrparteienverwahrung auf Zcash heute findest du unter [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody), einschließlich eines direkten Vergleichs mit transparentem Multisig, sowie in der [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo). Um einen bestehenden Knoten von zcashd weg zu migrieren, siehe den [Migrationsleitfaden zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Diese Seite wird als historisches Dokument des transparenten Multisig-Workflows beibehalten.

Diese Demo erfordert zcashd, das am 18. Juli 2026 angehalten wurde und nicht mehr läuft. Nichts weiter unten kann mit der Live-Chain durchgeführt werden.

## Öffentliche Schlüssel von benötigten Personen sammeln

* https://github.com/iancoleman/bip39
* Bei Verwendung von zcashd kannst du eine UA erstellen und auch deinen transparenten Empfänger verwenden. Verwende dann `getPubkey.sh`, um deinen öffentlichen Schlüssel zu extrahieren.


## 2x Multisig (2 von 3) t3-Adressen erstellen

Führe createMultiSig.sh aus, um deine Multisig-Adresse und dein Redeem-Script zu erzeugen. Benötigt werden 3 öffentliche Schlüssel

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2. t3 für die Wechselgeldadresse. 

#### HINWEIS: In diesem Beispiel sind pubk1,pubk4 dieselbe Person, pubk2,pubk5 dieselbe Person und so weiter ...

#### HINWEIS2: Die REIHENFOLGE deiner pubkeys ist wichtig! Achte unbedingt darauf!!!!


## t3-Adresse finanzieren

Verwende eine beliebige Wallet/einen beliebigen Faucet, um die Adresse zu finanzieren

## MultiSig-Transaktion erstellen

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

wobei,

```
        txid: eine Transaktions-ID der Transaktion, die Geld an dein neues t3 gesendet hat
   voutIndex: der Index des Outputs in vout mit dem größten Wert
scriptPubKey: Das P2SH-Sperrskript enthält den Hash eines anderen Sperrskripts (Script Hash), umgeben von den Opcodes HASH160 und EQUAL. Dies ist in Hex und wird über getrawtransaction rpc gefunden; suche nach scriptPubKey
redeemScript: Der Hex-Wert des redeemScript, der beim Erstellen unseres t3 ausgegeben wurde. Dieser wird von allen Personen benötigt, die vom t3 ausgeben möchten.
   oldAmount: Betrag, der von der obigen txid an dein neues t3 gesendet wurde
       tAddy: Die Adresse, an die du Guthaben senden möchtest
      amount: Der Betrag an ZEC, der an tAddy gesendet werden soll
 changeTaddy: Wechselgeldadresse (neues t3 mit einem neuen redeemScript!)

```

`./txDetails.sh txid`   => hilft dir, die benötigten Informationen zu finden

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig-TX signieren

Öffne signMultiSigTX.sh und füge deine privaten Schlüssel in den Variablen pk1,pk2, ... hinzu.
 

*** Ich würde nicht empfehlen, diese in dein Terminal einzugeben. ***


Wenn du Zugriff auf alle deine privaten Schlüssel hast, kannst du sie alle auf einmal verwenden, um Zeit zu sparen,
aber in den meisten realen Beispielen wird die Signierung von Personen auf der ganzen Welt durchgeführt, sodass jeder der erforderlichen Teilnehmenden signieren muss,
und dann die aktualisierte raxTX-„Hex“-Ausgabe zurücksendet, die die anderen verwenden, um zu signieren und den Signiervorgang abzuschließen.

Wer die erste TX erstellt, signiert mit seinem privaten Schlüssel und versendet das aktualisierte rawTX-Hex, das von den anderen Teilnehmenden signiert werden muss.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Um diese TX zu signieren, müssen mindestens 2 der drei privaten Schlüssel sie signieren. Wenn der von dir angegebene öffentliche Schlüssel mit einer T-Adresse von zcashd exportiert wurde, kannst du den privaten Schlüssel deiner T-Adresse erhalten mit: 


`zcash-cli dumpprivkey "t-addr"`

Dieser Befehl wurde mit zcashd eingestellt und gibt heute nichts zurück; er ist hier nur dokumentiert, um zu zeigen, wie die Demo ihre Schlüssel erhalten hat.


Für diese Demo habe ich iancolemans bip39 verwendet, um die benötigten privaten Schlüssel schnell zu isolieren.


## Signierte TX übertragen

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Quellen

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
