# MultiSig ƒe wɔwɔfia

> **Ŋutinya me nyawo. Azɔlizɔzɔ sia megaƒua du o.**
>
> Afɔɖeɖe ɖesiaɖe si le ete la nɔ te ɖe zcashd dzi, si ɖo eƒe Kpekpeɖeŋu ƒe Nuwuwu ƒe tɔtrɔ le eɖokui si le 18 July 2026. Nuŋɔŋlɔ adre siwo woɖo ɖe axa sia xa la ʋunɛ to eme `zcash-cli`, eyata wo dometɔ aɖeke mate ŋu aɖo node si le du dzi egbea o.
>
> Womate ŋu atsɔ mɔ̃ɖaŋununya atsɔ ŋɔŋlɔdzesi siawo ayi teƒe bubuwo o. Wotu wo ɖe raw-transaction kple gakotoku RPC (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) be zcashd deprecated hafi wotɔ te; Zallet tsɔa mɔnu yeye siwo wɔa dɔ le PCZTwo dzi tsɔ wu raw transaction hex dzi ɖɔlia esiawo, eye wògakpɔtɔ le beta me kple zcashd mɔnu geɖe siwo wometsɔ yi haɖe o.
>
> Ne èdi akpa geɖe ƒe vidzikpɔkpɔ le Zcash egbea la, kpɔ [FROST & Dzɔdzɔmenuwo Dzikpɔkpɔ](/zcash-tech/frost-threshold-custody), si me wotsɔe sɔ kple multisig si me kɔ tẽ, kple dɔwɔwɔ [Ywallet FROST ƒe wɔwɔfia](/guides/frostdemo/ywallet-frost-demo). Ne èdi be yeaɖe node si li xoxo la ɖa le zcashd la, kpɔ [ʋuʋu yi Zebra kple Zallet ƒe mɔfiame](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Wodzraa axa sia ɖo abe ŋutinya me nuŋlɔɖi le multisig dɔwɔwɔ si me kɔ la ŋu.

Demo sia bia zcashd, si tɔ le 18 July 2026 eye megale dɔ wɔm o. Womate ŋu awu naneke si le ete nu ɖe ​​kɔsɔkɔsɔ gbagbe la ŋu o.

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
emegbe nàgbugbɔ raxTX "hex" ƒe emetsonu yeye si ame mamlɛawo azã atsɔ ade asi ete atsɔ awu asidede agbalẽ te ƒe ɖoɖoa nu.

Amesi wɔ tx gbãtɔ kpɔ, ade asi ete kple woƒe safui si nye ame ŋutɔ tɔ eye wòaɖo rawTX hex yeye si wòle be gomekpɔla bubuawo nade asi ete la ɖa.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Be nàde asi tx sia te la, ele be ame ŋutɔ ƒe safui etɔ̃awo dometɔ 2 ya teti nade asi ete. Ne wotsɔ T-adrɛs tso zcashd zã dutoƒo safui si nèna la ɖo ɖa la, àte ŋu axɔ wò T adrɛs ƒe safui si nye ame ŋutɔ tɔ kple: 


`zcash-cli dumpprivkey "t-addr"`

Sedede sia tɔ te kple zcashd eye metrɔa naneke egbea o; wolée ɖe afisia be woatsɔ aɖe alesi wɔwɔfiaa xɔ eƒe safuiwoe afia ko.


Le wɔwɔfia sia ta la, mezã iancoleman ƒe bip39 tsɔ ɖe ame ŋutɔ ƒe safui siwo hiã la ɖe vovo kaba.


## Broadcast de asi ete TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Dzɔtsoƒewo

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




