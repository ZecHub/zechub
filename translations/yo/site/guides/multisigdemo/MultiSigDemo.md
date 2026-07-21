# Àwòfiṣàpẹẹrẹ MultiSig

Àmì yìí nílò zcashd 

## Gba awọn bọtini gbangba lati ọdọ awọn ẹni-kọọkan ti o nilo

* https://github.com/iancoleman/bip39
* If using zcashd, you can create a UA and use your transparent reciever as well. Then use `getPubkey.sh` láti yọ kókó ìkéde rẹ jáde.


## Ṣẹda 2x Multisig (2 ti 3) t3 adirẹsi

ṣiṣe createMultiSig.sh lati ṣe ipilẹṣẹ adirẹsi multisig rẹ ati yi iwe afọwọkọ pada. Ohun ti o nilo ni awọn bọtini gbangba 3

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2nd t3 fún àdírẹ́sì ìyípadà. 

#### ATIYẸ: ninu apẹẹrẹ yii pubk1,pubk4 jẹ eniyan kanna, pubk2,pubk5 jẹ eniyan kan naa ati bẹbẹ lọ ...

#### Àkíyèsí 2: ÀLÀRÍ àwọn kókó ọtí rẹ ṣe pàtàkì! Ẹ fiyè sí èyí!!!!


## Adirẹsi t3 ti Fund

Lo apamọwọ / facuet eyikeyi lati fi adirẹsi owo pamọ

## Ṣẹda ìsòwò MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

ibi tí,

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

`./txDetails.sh txid` => yóò ràn ọ́ lọ́wọ́ láti rí ìsọfúnni tó o nílò

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Àmì MultiSig TX

Ṣii signMultiSigTX.sh ki o si fi awọn bọtini ikọkọ rẹ sinu pk1,pk2, ... awọn oniyipada.
 

*** Èmi ò ní gbà yín níyànjú láti tẹ èyí sínú ẹ̀rọ rẹ. ***


Ti o ba ni wiwọle si gbogbo awọn bọtini ikọkọ rẹ o le lo gbogbo wọn ni ẹẹkan lati fi akoko pamọ,
ṣùgbọ́n nínú ọ̀pọ̀lọpọ̀ àwọn àpẹẹrẹ ayé gidi, ìforúkọsílẹ̀ náà yóò wáyé nípasẹ̀ àwọn ènìyàn káàkiri àgbáyé nítorí náà ẹnìkọ̀ọ̀kan lára àwọn olùkópa tí a nílò yóò ní láti fọwọ́ sí i,
then send back the updated raxTX "hex" output which the others will use to sign to complete the signing proceedure.

Ẹnikẹni ti o ba kọkọ ṣẹda tx, yoo fi ami si pẹlu bọtini ikọkọ wọn ki o firanṣẹ awọn imudojuiwọn rawTX hex ti o nilo lati wa ni wole nipasẹ awọn olukopa miiran.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

To sign this tx, at least 2 out of the three private keys need to sign it. If the public key you gave was exported using a T-address from zcashd, you can get the private key of your T address with: 


`zcash-cli dumpprivkey "t-addr"`


Fún àfihàn yìí, mo lo bip39 ti iancoleman láti tètè ya àwọn kókó ìkọ̀kọ̀ tí a nílò.


## Ìpolongo tí wọ́n fọwọ́ sí TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Àwọn orísun

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




