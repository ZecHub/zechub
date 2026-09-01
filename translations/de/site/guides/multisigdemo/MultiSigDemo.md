# MultiSig-Demo

> **Historisch. Diese Schritt-für-Schritt-Anleitung funktioniert nicht mehr.**
>
> Jeder der untenstehenden Schritte hängt von zcashd ab, das am 18. Juli 2026 seinen automatischen End-of-Support-Stopp erreicht hat. Die sieben Skripte, die zusammen mit dieser Seite ausgeliefert werden, steuern es über `zcash-cli`, daher kann heute keines von ihnen einen laufenden Knoten erreichen.
>
> Diese Skripte können nicht mechanisch portiert werden. Sie basieren auf den Raw-Transaction- und Wallet-RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`), die zcashd vor dem Stopp als veraltet markiert hat; Zallet ersetzt diese durch neue Methoden, die auf PCZTs statt auf rohem Transaktions-Hex arbeiten, und befindet sich noch in der Beta, wobei viele zcashd-Methoden noch nicht portiert wurden.
>
> Für Multi-Party-Custody auf Zcash siehe heute [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody), das einen direkten Vergleich mit transparentem Multisig enthält, sowie die funktionierende [Ywallet FROST-Demo](/guides/frostdemo/ywallet-frost-demo). Um einen bestehenden Knoten von zcashd weg zu migrieren, siehe den [Migrationsleitfaden zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Diese Seite wird als historischer Nachweis des transparenten Multisig-Workflows beibehalten.

Diese Demo erfordert zcashd, das am 18. Juli 2026 angehalten wurde und nicht mehr läuft. Nichts unten kann gegen die Live-Chain abgeschlossen werden.

## Öffentliche Schlüssel der benötigten Personen sammeln

* https://github.com/iancoleman/bip39
* Wenn Sie zcashd verwenden, können Sie auch eine UA erstellen und Ihren transparenten Empfänger verwenden. Verwenden Sie dann `getPubkey.sh`, um Ihren öffentlichen Schlüssel zu extrahieren.


## 2x Multisig-(2 von 3)-t3-Adressen erstellen

Führen Sie `createMultiSig.sh` aus, um Ihre Multisig-Adresse und Ihr Redeem-Script zu erzeugen. Benötigt werden 3 öffentliche Schlüssel.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2. t3 für die Wechselgeldadresse. 

#### HINWEIS: In diesem Beispiel sind pubk1,pubk4 dieselbe Person, pubk2,pubk5 dieselbe Person und so weiter ...

#### HINWEIS2: Die REIHENFOLGE Ihrer öffentlichen Schlüssel ist wichtig! Achten Sie darauf!!!!


## t3-Adresse finanzieren

Verwenden Sie ein beliebiges Wallet/Faucet, um die Adresse zu finanzieren.

## Multisig-Transaktion erstellen

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

wobei,

```
        txid: eine Transaktions-ID der Transaktion, die Geld an Ihre neue t3 gesendet hat
   voutIndex: der Index des Outputs in vout, der den größten Wert hat
scriptPubKey: Das P2SH-Sperrskript enthält den Hash eines anderen Sperrskripts (Script Hash), umgeben von den Opcodes HASH160 und EQUAL. Dies ist in Hex und wird über die getrawtransaction-RPC gefunden; suchen Sie nach scriptPubKey
redeemScript: Der Hex-Wert des redeemScript, der beim Erstellen unserer t3 ausgegeben wurde. Dieser wird von allen Personen benötigt, die von der t3 ausgeben möchten.
   oldAmount: Betrag, der aus der obigen txid an Ihre neue t3 gesendet wurde
       tAddy: Die Adresse, an die Sie Geld senden möchten
      amount: Der Betrag an ZEC, der an tAddy gesendet werden soll
 changeTaddy: Wechselgeldadresse (neue t3 mit einem neuen redeemScript!)

```

`./txDetails.sh txid`   => hilft Ihnen, die benötigten Informationen zu finden

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** dies wird zum Signieren benötigt! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Multisig-TX signieren

Öffnen Sie `signMultiSigTX.sh` und fügen Sie Ihre privaten Schlüssel in die Variablen pk1,pk2, ... ein.
 

*** Ich würde nicht empfehlen, diese in Ihr Terminal einzugeben. ***


Wenn Sie Zugriff auf alle Ihre privaten Schlüssel haben, können Sie sie alle auf einmal verwenden, um Zeit zu sparen,
aber in den meisten realen Beispielen wird das Signieren von Personen auf der ganzen Welt durchgeführt, sodass jeder der erforderlichen Teilnehmer signieren muss
und dann die aktualisierte `raxTX`-"Hex"-Ausgabe zurücksendet, die die anderen zum Signieren verwenden, um den Signiervorgang abzuschließen.

Wer auch immer die erste TX erstellt, signiert mit seinem privaten Schlüssel und sendet das aktualisierte rawTX-Hex weiter, das von den anderen Teilnehmern signiert werden muss.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Um diese TX zu signieren, müssen mindestens 2 der 3 privaten Schlüssel sie signieren. Wenn der von Ihnen angegebene öffentliche Schlüssel mithilfe einer T-Adresse aus zcashd exportiert wurde, können Sie den privaten Schlüssel Ihrer T-Adresse abrufen mit: 


`zcash-cli dumpprivkey "t-addr"`

Dieser Befehl wurde mit zcashd angehalten und gibt heute nichts zurück; er ist hier nur dokumentiert, um zu zeigen, wie die Demo ihre Schlüssel erhalten hat.


Für diese Demo habe ich iancolemans bip39 verwendet, um die benötigten privaten Schlüssel schnell zu isolieren.


## Signierte TX übertragen

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Quellen

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
