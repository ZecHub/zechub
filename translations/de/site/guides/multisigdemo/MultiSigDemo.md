# MultiSig-Demo

> **Historisch. Diese Anleitung funktioniert nicht mehr.**
>
> Jeder der folgenden Schritte hängt von zcashd ab, das am 18. Juli 2026 seine automatische Einstellung des Supports erreichte. Die sieben Skripte, die mit dieser Seite ausgeliefert werden, steuern es über `zcash-cli`, daher kann keines von ihnen heute einen laufenden Knoten erreichen.
>
> Diese Skripte können nicht mechanisch portiert werden. Sie basieren auf den Raw-Transaction- und Wallet-RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`), die zcashd vor der Einstellung veraltet machte; Zallet ersetzt diese durch neue Methoden, die mit PCZTs statt Raw-Transaction-Hex arbeiten, und befindet sich weiterhin in der Beta, wobei viele zcashd-Methoden noch nicht portiert wurden.
>
> Für Multi-Party-Verwahrung auf Zcash siehe heute [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody), das einen direkten Vergleich mit transparentem Multisig enthält, sowie die funktionierende [Ywallet FROST-Demo](/guides/frostdemo/ywallet-frost-demo). Um einen bestehenden Knoten von zcashd wegzumigrieren, siehe den [Migrationsleitfaden zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Diese Seite wird als historische Aufzeichnung des transparenten Multisig-Workflows erhalten.

Diese Demo erfordert zcashd, das am 18. Juli 2026 eingestellt wurde und nicht mehr läuft. Nichts weiter unten kann mit der Live-Chain durchgeführt werden.

## Öffentliche Schlüssel der benötigten Personen sammeln

* https://github.com/iancoleman/bip39
* Bei Verwendung von zcashd kannst du auch eine UA erstellen und deinen transparenten Empfänger verwenden. Nutze anschließend `getPubkey.sh`, um deinen öffentlichen Schlüssel zu extrahieren.


## 2x Multisig (2 von 3) t3-Adressen erstellen

Führe createMultiSig.sh aus, um deine Multisig-Adresse und dein Redeem-Skript zu erzeugen. Benötigt werden 3 öffentliche Schlüssel.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2. t3 für die Wechselgeldadresse. 

#### HINWEIS: In diesem Beispiel sind pubk1,pubk4 dieselbe Person, pubk2,pubk5 dieselbe Person und so weiter ...

#### HINWEIS2: Die REIHENFOLGE deiner Pubkeys ist wichtig! Achte unbedingt darauf!!!!


## t3-Adresse finanzieren

Nutze eine beliebige Wallet/Faucet, um die Adresse zu finanzieren.

## MultiSig-Transaktion erstellen

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

wobei,

```
        txid: eine Transaktions-ID der Transaktion, die Geld an dein neues t3 gesendet hat
   voutIndex: der Index des Outputs in vout mit dem größten Wert
scriptPubKey: Das P2SH-Sperrskript enthält den Hash eines anderen Sperrskripts (Script Hash), umgeben von den Opcodes HASH160 und EQUAL. Dies ist in Hex und wird über getrawtransaction rpc gefunden; suche nach scriptPubKey
redeemScript: Der Hex-Wert des redeemScript, der beim Erstellen unseres t3 ausgegeben wurde. Dieser wird von allen Personen benötigt, die vom t3 ausgeben möchten.
   oldAmount: Betrag, der von der obigen txid an dein neues t3 gesendet wurde
       tAddy: Die Adresse, an die du Mittel senden möchtest
      amount: Der Betrag an ZEC, der an tAddy gesendet werden soll
 changeTaddy: Wechselgeldadresse (neues t3 mit einem neuen redeemScript!)

```

`./txDetails.sh txid`   => hilft dir dabei, die benötigten Informationen zu finden

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** dies wird zum Signieren benötigt! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig-TX signieren

Öffne signMultiSigTX.sh und füge deine privaten Schlüssel in die Variablen pk1,pk2, ... ein.
 

*** Ich würde nicht empfehlen, diese in dein Terminal einzutippen. ***


Wenn du Zugriff auf alle deine privaten Schlüssel hast, kannst du sie alle auf einmal verwenden, um Zeit zu sparen,
aber in den meisten realen Beispielen wird die Signierung durch Personen auf der ganzen Welt erfolgen, sodass jeder der benötigten Teilnehmer signieren muss,
und anschließend die aktualisierte raxTX-„Hex“-Ausgabe zurücksenden muss, die die anderen zur Signierung verwenden, um den Signiervorgang abzuschließen.

Wer die erste TX erstellt, signiert mit seinem privaten Schlüssel und verschickt die aktualisierte rawTX-Hex, die von den anderen Teilnehmern signiert werden muss.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Um diese TX zu signieren, müssen mindestens 2 der drei privaten Schlüssel sie signieren. Wenn der von dir angegebene öffentliche Schlüssel mit einer T-Adresse aus zcashd exportiert wurde, kannst du den privaten Schlüssel deiner T-Adresse mit Folgendem abrufen: 


`zcash-cli dumpprivkey "t-addr"`

Dieser Befehl wurde mit zcashd eingestellt und gibt heute nichts zurück; er ist hier nur aufgezeichnet, um zu zeigen, wie die Demo ihre Schlüssel erhalten hat.


Für diese Demo habe ich iancolemans bip39 verwendet, um die benötigten privaten Schlüssel schnell zu isolieren.


## Signierte TX übertragen

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Quellen

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
