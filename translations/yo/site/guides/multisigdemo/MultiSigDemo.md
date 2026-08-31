# Àmì àfihàn MultiSig

> Ìtàn. Àlàyé yìí kò sí lórí ìkànnì wa mọ́.**
>
> Gbogbo igbesẹ ti o wa ni isalẹ da lori zcashd, eyi to de opin atilẹyin rẹ laifọwọyi ni 18 Keje 2026. Awọn iwe afọwọkọ meje ti a firanṣẹ lẹgbẹẹ oju-iwe yii ṣe awakọ nipasẹ `zcash-cli`, bẹ́ẹ̀ ni kò sí ọ̀kan nínú wọn tó lè dé ibi tí ó ń ṣiṣẹ́ lónìí.
>
> Awọn iwe afọwọkọ wọnyi ko le ṣe gbigbe ni ẹrọ. Wọn ti kọ lori awọn iṣowo-alálàá ati apamọwọ RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) ti zcashd ko ni anfani ṣaaju ki o to duro; Zallet rọpo awọn pẹlu awọn ọna tuntun ti n ṣiṣẹ lori PCZTs dipo ju hex iṣowo alailẹgbẹ, ati pe o tun wa ninu beta pẹlu ọpọlọpọ awọn ilana zcashD ti a ko tii gbe.
>
> Fun ààbò ọ̀pọ̀-ẹgbẹ́ lórí Zcash lónìí, wo: [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody), eyi ti o pẹlu kan taara afiwe pẹlu ṣiṣan multicast, ati awọn ṣiṣẹ ni a ṣe akiyesi bi daradara. [Àwòkẹ́kò́ó Ywallet FROST](/guides/frostdemo/ywallet-frost-demo). Lati gbe kan ti o wa node kuro zcashd, wo awọn [ìwé tó ń ṣàlàyé bí àwọn ẹranko Zebra àti Zallet ṣe máa ń ṣí lọ síbòmíì.](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Ojúewé yìí ni a tọ́ sí gẹ́gẹ́ bí àkọsílẹ̀ ìtàn ti ìtòlẹ́sẹẹsẹ iṣẹ tí ó ní àtẹwọlé alábala.

Àwòfiṣàpẹẹrẹ yìí nílò zcashd, tí ó dáwọ́ dúró ní 18 July 2026 kò sì ṣiṣẹ mọ. Kò sí nǹkankan lábẹ̀ tó lè parí lòdì sí ìsínlọ́nà gbígbé náà.

## Gba àwọn kókó ìjápọ̀ láti ọ̀dọ̀ àwọn ènìyàn tí a nílò.

* https://github.com/iancoleman/bip39
* If using zcashd, you can create a UA and use your transparent reciever as well. Then use `getPubkey.sh` láti yọ kókó ìkéde rẹ jáde.


## Ṣẹda 2x Multisig (2 ti 3) t3 adirẹsi

ṣiṣe createMultiSig.sh lati ṣe ipilẹṣẹ adirẹsi multisig rẹ ati yi iwe afọwọkọ pada. Ohun ti o nilo ni awọn bọtini gbangba 3

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2nd t3 fún àdírẹ́sì ìyípadà. 

#### ÀṢẸYÈÉ: nínú àpẹrẹ yìí, pubk1,pubk4 jẹ́ ẹnìkan náà ni, pubK2,pubK5 jẹ́ ènìyàn kan náà àti bẹbẹ lọ...

#### ÀṢÀ2: ÒFÍRÈ àwọn kókó ọtí rẹ ṣe pàtàkì! Ẹ fiyè sí èyí!!!!


## Adirẹsi t3 ti owo-owo naa.

Lo apamọwọ/facuet kankan láti fi owó sí àdírésì rẹ.

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

`./txDetails.sh txid` => yóò ràn ọ́ lọ́wọ́ láti rí ìsọfúnni tó o nílò.

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Àmì MultiSig TX

Ṣii signMultiSigTX.sh ki o si fi awọn bọtini ikọkọ rẹ sinu pk1,pk2, ... iyipada.
 

*** Èmi ò ní gbà yín láyè láti tẹ àwọn nǹkan wọ̀nyí sínú ẹ̀rọ rẹ. ***


Bí o bá ní ààyè sí gbogbo kókó ìkọ̀ǹpútà rẹ, o lè lò wọ́n lẹ́ẹ̀kan ṣoṣo láti fi dín àkókò kù.
ṣùgbọ́n nínú ọ̀pọ̀lọpọ̀ àwọn àpẹẹrẹ ayé gidi, ìforúkọsílẹ̀ náà yóò wáyé nípasẹ̀ ènìyàn káàkiri àgbáyé nítorí èyí olúkúlùkù lára àwọn olùkópa tí a nílò ni ó máa fẹ láti fọwọ́ sí i.
Lẹhinna fi pada si imudojuiwọn raxTX "hex" ti o jade eyiti awọn miiran yoo lo lati fowo si ipari ilana iforukọsilẹ.

Ẹnikẹni to ba kọkọ ṣe tx, yoo fi ọ̀rọ̀-ìfipamọ́ rẹ̀ buwọlu ki o si firanṣẹ rawTX hex ti a tunṣe silẹ eyi ti awọn olukopa miiran gbọdọ fọwọsi.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Lati buwọlu tx yii, o kere ju 2 ninu awọn bọtini ikọkọ mẹta nilo lati buwọle rẹ. Ti a ba gbe jade ni lilo adirẹsi T-ti zcashd ti sọkun gbangba rẹ, o le gba bọtini aladani fun adirẹẹsi T rẹ pẹlu: 


`zcash-cli dumpprivkey "t-addr"`

Àṣẹ yìí dáwọ́ dúró pẹ̀lú zcashd kò sì padà ní ohunkóhun lónìí; a ṣàkọsílẹ̀ rẹ̀ síbí láti fi hàn bí àwòfiṣàpẹẹrẹ ṣe gba àwọn kókó.


Fun àfihàn yìí, mo lo bip39 ti iancoleman láti tètè dá àwọn kókó ìkọ̀ǹpútà tí ó yẹ sílẹ̀.


## Ìpolongo tí wọ́n fi TX ṣe aláṣẹ rẹ̀.

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Àwọn Orísun rèé:

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




