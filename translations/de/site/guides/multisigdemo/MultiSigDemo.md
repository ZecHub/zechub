# MultiSig-Demo

Diese Demo erfordert zcashd

## Öffentliche Schlüssel der benötigten Personen sammeln

* https://github.com/iancoleman/bip39
* Wenn du zcashd verwendest, kannst du auch eine UA erstellen und deinen transparenten Empfänger nutzen. Verwende dann `getPubkey.sh`, um deinen öffentlichen Schlüssel zu extrahieren.


## 2x Multisig (2 von 3) t3-Adressen erstellen

Führe `createMultiSig.sh` aus, um deine Multisig-Adresse und dein Redeem-Skript zu erzeugen. Benötigt werden 3 öffentliche Schlüssel.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2. t3 für die Wechselgeldadresse.

#### HINWEIS: In diesem Beispiel sind pubk1,pubk4 dieselbe Person, pubk2,pubk5 dieselbe Person und so weiter ...

#### HINWEIS2: Die REIHENFOLGE deiner öffentlichen Schlüssel ist wichtig! Achte unbedingt darauf!!!!


## t3-Adresse finanzieren

Verwende eine beliebige Wallet/einen beliebigen Facuet, um die Adresse zu finanzieren

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

`./txDetails.sh txid`   => hilft dir dabei, die benötigten Informationen zu finden

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig-TX signieren

Öffne `signMultiSigTX.sh` und füge deine privaten Schlüssel in die Variablen pk1,pk2, ... ein.
 

*** Ich würde nicht empfehlen, diese in dein Terminal einzugeben. ***


Wenn du Zugriff auf alle deine privaten Schlüssel hast, kannst du sie alle gleichzeitig verwenden, um Zeit zu sparen,
aber in den meisten realen Anwendungsfällen erfolgt die Signierung durch Personen auf der ganzen Welt, daher muss jeder der erforderlichen Teilnehmer signieren,
und anschließend die aktualisierte raxTX-"hex"-Ausgabe zurücksenden, die die anderen zum Signieren verwenden, um den Signiervorgang abzuschließen.

Wer die erste TX erstellt, signiert mit seinem privaten Schlüssel und verschickt dann die aktualisierte rawTX-Hex, die von den anderen Teilnehmern signiert werden muss.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Um diese TX zu signieren, müssen mindestens 2 der 3 privaten Schlüssel sie signieren. Wenn der von dir angegebene öffentliche Schlüssel mit einer T-Adresse aus zcashd exportiert wurde, kannst du den privaten Schlüssel deiner T-Adresse so erhalten:


`zcash-cli dumpprivkey "t-addr"`


Für diese Demo habe ich bip39 von iancoleman verwendet, um die benötigten privaten Schlüssel schnell zu isolieren.


## Signierte TX übertragen

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Quellen

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
