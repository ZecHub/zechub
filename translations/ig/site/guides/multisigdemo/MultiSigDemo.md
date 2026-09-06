# Ihe ngosi MultiSig

> **Ihe mere eme. Nke a na-agagharị agafe anaghịzi agba ọsọ.**
>
> Every step below depends on zcashd, which reached its automatic End-of-Support halt on 18 July 2026. The seven scripts shipped alongside this page drive it through `zcash-cli`, yabụ na onweghị onye n'ime ha nwere ike iru ebe a na-agba ọsọ taa.
>
> A pụghị ịdebe ihe odide ndị a n'ụzọ dị mma. Ha na-ewu ha na raw transaction and wallet RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) that zcashd deprecated before the halt; Zallet replaces those with new methods that operate on PCZTs rather than raw transaction hex, and is still in beta with many zcashd methods not yet ported.
>
> Maka njide ọtụtụ ndị ọzọ na Zcash taa, lee. [FROST & Nchebe nke Oghere ahụ](/zcash-tech/frost-threshold-custody), nke na-agụnye a kpọmkwem tụnyere uzo multisig, na ọrụ usoro ga-eji mee ihe n'ụzọ zuru ezu. [Ywallet FROST ngosi](/guides/frostdemo/ywallet-frost-demo)Iji wepụ otu ọnụ dị na zcashd, lee ihe ndị a: [Ntuziaka maka mbugharị na Zebra na Zallet.](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> A na-edebe ibe a dị ka ihe ndekọ akụkọ banyere usoro ọrụ multisig nke doro anya.

Ihe ngosi a chọrọ zcashd, nke kwụsịrị na 18 July 2026 ma ọ naghị agba ọsọ ọzọ. Ọ dịghị ihe dị n'okpuru ebe ahụ nwere ike mezue megide agbụ ndụ.

## Chọta igodo ọha na eze site n'aka ndị mmadụ chọrọ ya.

* https://github.com/iancoleman/bip39
* Ọ bụrụ na ị jiri zcashd, ịnwere ike ịmepụta UA ma jiri onye nnata gị dị ọcha. Mgbe ahụ jiri `getPubkey.sh` iji wepụ igodo ọha gị.


## Mepụta 2x Multisig (2 nke 3) t3 adreesị

Gbaa createMultiSig.sh iji mepụta adreesị multisig gị ma gbapụ edemede ahụ Ihe dị mkpa bụ igodo ọha mmadụ 3

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2nd t3 maka mgbanwe adreesị. 

#### IHE: na ihe atụ a, pubk1,pubk4 bụ otu onye ahụ, pubK2,pubk5 bụ otu mmadụ ahụ wdg ...

#### IHE: NKEZI nke mkpịsị ugodi gị dị mkpa! Lezie anya na nke a!!!!


## Ebe a na-edebe ego t3

Jiri obere akpa / facuet ọ bụla iji kwụọ ụgwọ adreesị.

## Mepụta azụmahịa MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

ebe, na-

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

`./txDetails.sh txid` => ga-enyere gị aka ịchọta ihe ọmụma dị mkpa.

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Ihe ịrịba ama MultiSig TX

Mepee signMultiSigTX.sh ma tinye igodo nzuzo gị na pk1,pk2, ... variables.
 

*** Agaghị m akwado ịpịnye ihe ndị a n'ime ọnụ gị. ***


Ọ bụrụ na ị nwere ohere ịnweta igodo nzuzo gị niile, i nwere ike iji ha nile n'otu oge ka ịchekwaa oge.
mana n'ọtụtụ ihe atụ nke ụwa, a ga-eme mbinye aka site na ndị mmadụ gburugburu ụwa yabụ onye ọ bụla chọrọ ka o sonye kwesịrị ịbịanye aka.
mgbe ahụ zipụ azụ mmelite raxTX "hex" nke ndị ọzọ ga-eji banye iji mezue usoro ntinye aka.

Onye ọ bụla kere tx mbụ, ga-eji igodo nzuzo ha bịanye aka ma zipụ hex rawTX emelitere nke ndị ọzọ sonyere kwesịrị ịbịanye.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Iji banye na tx a, ọ dịkarịa ala 2 n'ime mkpịsị ugodi nzuzo atọ ga-abanye ya. Ọ bụrụ na igodo ọha ị nyere bụ mbupụ site na iji T-address si zcashd, ịnwere ike ịnweta isi ihe nke adreesị gị: 


`zcash-cli dumpprivkey "t-addr"`

Iwu a kwụsịrị na zcashd ma ghara ịlaghachi ihe ọ bụla taa; edere ya ebe a naanị iji gosi otú ngosi ahụ si nweta igodo ya.


Maka ngosi a, ejiri m Iancoleman's bip39 iji wepu igodo nzuzo dị mkpa.


## Ejiri akara TX zipu ozi .

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Isi mmalite ya

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




