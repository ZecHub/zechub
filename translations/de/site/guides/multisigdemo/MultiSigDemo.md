# MultiSig-Demo

> **Historisch. Diese Anleitung funktioniert nicht mehr.**
>
> Jeder untenstehende Schritt hängt von zcashd ab, das am 18. Juli 2026 seinen automatischen End-of-Support-Stopp erreicht hat. Die sieben Skripte, die mit dieser Seite ausgeliefert werden, steuern es über `zcash-cli`, daher kann keines von ihnen heute einen laufenden Knoten erreichen.
>
> Diese Skripte können nicht mechanisch portiert werden. Sie basieren auf den Raw-Transaction- und Wallet-RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`), die zcashd vor dem Stopp eingestellt hat; Zallet ersetzt diese durch neue Methoden, die mit PCZTs statt mit Raw-Transaction-Hex arbeiten, und befindet sich weiterhin in der Beta-Phase, wobei viele zcashd-Methoden noch nicht portiert wurden.
>
> Informationen zur Multi-Party-Verwahrung auf Zcash finden Sie heute unter [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody), einschließlich eines direkten Vergleichs mit transparentem Multisig, sowie in der [Ywallet FROST-Demo](/guides/ywallet-frost-demo). Informationen zur Migration eines bestehenden Knotens von zcashd finden Sie im [Migrationsleitfaden zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Diese Seite wird als historisches Protokoll des transparenten Multisig-Workflows beibehalten.

Diese Demo erfordert zcashd, das am 18. Juli 2026 gestoppt wurde und nicht mehr läuft. Nichts unten kann mit der Live-Chain abgeschlossen werden.

## Öffentliche Schlüssel von benötigten Personen sammeln

* https://github.com/iancoleman/bip39
* Bei Verwendung von zcashd können Sie eine UA erstellen und auch Ihren transparenten Empfänger verwenden. Nutzen Sie dann `getPubkey.sh`, um Ihren öffentlichen Schlüssel zu extrahieren.


## 2x Multisig-(2 von 3)-t3-Adressen erstellen

Führen Sie createMultiSig.sh aus, um Ihre Multisig-Adresse und Ihr Redeem-Script zu generieren. Benötigt werden 3 öffentliche Schlüssel

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2. t3 für die Wechselgeldadresse. 

#### HINWEIS: In diesem Beispiel sind pubk1,pubk4 dieselbe Person, pubk2,pubk5 dieselbe Person und so weiter ...

#### HINWEIS2: Die REIHENFOLGE Ihrer öffentlichen Schlüssel ist wichtig! Achten Sie darauf!!!!


## t3-Adresse finanzieren

Verwenden Sie eine beliebige Wallet/einen beliebigen Faucet, um die Adresse zu finanzieren

## MultiSig-Transaktion erstellen

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

wobei,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => hilft Ihnen dabei, die benötigten Informationen zu finden

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig-TX signieren

Öffnen Sie signMultiSigTX.sh und fügen Sie Ihre privaten Schlüssel in die Variablen pk1,pk2, ... ein.
 

*** Ich würde nicht empfehlen, diese in Ihr Terminal einzugeben. ***


Wenn Sie Zugriff auf alle Ihre privaten Schlüssel haben, können Sie sie alle gleichzeitig verwenden, um Zeit zu sparen,
doch in den meisten realen Beispielen wird die Signierung durch Personen auf der ganzen Welt erfolgen, sodass jeder der erforderlichen Teilnehmer signieren muss,
und anschließend die aktualisierte raxTX-„hex“-Ausgabe zurücksenden muss, die die anderen zur Signierung verwenden, um den Signierungsvorgang abzuschließen.

Wer auch immer die erste TX erstellt, signiert mit seinem privaten Schlüssel und sendet die aktualisierte rawTX-Hex aus, die von den anderen Teilnehmern signiert werden muss.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Um diese TX zu signieren, müssen mindestens 2 der drei privaten Schlüssel sie signieren. Wenn der von Ihnen angegebene öffentliche Schlüssel mithilfe einer T-Adresse von zcashd exportiert wurde, können Sie den privaten Schlüssel Ihrer T-Adresse wie folgt erhalten: 


`zcash-cli dumpprivkey "t-addr"`

Dieser Befehl wurde mit zcashd eingestellt und gibt heute nichts zurück; er ist hier nur aufgezeichnet, um zu zeigen, wie die Demo ihre Schlüssel erhalten hat.


Für diese Demo habe ich iancolemans bip39 verwendet, um die benötigten privaten Schlüssel schnell zu isolieren.


## Signierte TX übertragen

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Quellen

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
