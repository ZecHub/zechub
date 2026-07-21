# MultiSig ƒe wɔwɔfia

Demo sia bia be woawɔ zcashd 

## Ƒo dutoƒo safuiwo nu ƒu tso ame ɖekaɖeka siwo hiã gbɔ

* https://github.com/iancoleman/bip39
* Ne èzã zcashd la, àteŋu awɔ UA eye nàzã wò transparent reciever hã. Emegbe zãe `getPubkey.sh` be nàɖe wò dutoƒo safuia.


## Wɔ 2x Multisig (2 le 3 me) t3 adrɛswo

ƒu du createMultiSig.sh be nàwɔ wò multisig adrɛs eye nàxɔ ŋɔŋlɔdzesi. Nusi hiãe nye dutoƒo safui 3

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2nd t3 na tɔtrɔ ƒe adrɛs. 

#### DE DZESII: le kpɔɖeŋu sia me la, pubk1,pubk4 nye ame ɖeka, pubk2,pubk5 nye ame ɖeka kple bubuawo ...

#### DE DZESII2: wò pubkeys ƒe ORDER le vevie! Lé ŋku ɖe esia ŋu!!!!


## Ga t3 ƒe adrɛs

Zã gakotoku/facuet ɖesiaɖe nàtsɔ akpɔ ga ƒe adrɛs

## Wɔ MultiSig ƒe asitsatsa

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

afi ka,

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

`./txDetails.sh txid` => akpe ɖe ŋuwò nàkpɔ nyatakaka siwo hiã

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## De asi MultiSig TX te

Ʋu signMultiSigTX.sh eye nàtsɔ wò safui ɣaɣlawo akpe ɖe pk1,pk2, ... tɔtrɔwo me.
 

*** Nyemakafui be nàŋlɔ esiawo ɖe wò terminal me o. *** .


Ne èkpɔ mɔ akpɔ wò safui ɣaɣlawo katã la, àte ŋu azã wo katã zi ɖeka be nàɖe ɣeyiɣi dzi akpɔtɔ, .
gake le xexeame ŋutɔŋutɔ ƒe kpɔɖeŋu akpa gãtɔ me la, woawɔ asidede agbalẽ te to amewo dzi le xexeame godoo eyata ahiã be gomekpɔla siwo wobia tso esi la dometɔ ɖesiaɖe nade asi ete, .
emegbe nàgbugbɔ raxTX "hex" ƒe dodo yeye si ame mamlɛawo azã atsɔ ade asi ete atsɔ awu asidede agbalẽ te ƒe ɖoɖoa nu.

Amekae wɔ tx gbãtɔ kpɔ, ade asi ete kple woƒe safui si nye ame ŋutɔ tɔ eye wòaɖo rawTX hex yeye si wòle be gomekpɔla bubuawo nade asi ete la ɖa.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Be nàde asi tx sia te la, ele be ame ŋutɔ ƒe safui etɔ̃awo dometɔ 2 ya teti nade asi ete. Ne wotsɔ T-adrɛs tso zcashd zã dutoƒo safui si nèna la ɖo ɖa la, àte ŋu axɔ wò T adrɛs ƒe safui si nye ame ŋutɔ tɔ kple: 


`zcash-cli dumpprivkey "t-addr"`


Le wɔwɔfia sia ta la, mezã iancoleman ƒe bip39 tsɔ ɖe ame ŋutɔ ƒe safui siwo hiã la ɖe vovo kaba.


## Broadcast de asi ete TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Dzɔtsoƒewo

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




