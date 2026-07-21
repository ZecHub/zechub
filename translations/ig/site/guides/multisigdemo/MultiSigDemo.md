# Ihe ngosi MultiSig

Ihe ngosi a chọrọ zcashd 

## Na-anakọta igodo ọha na eze site n'aka ndị dị mkpa

* https://github.com/iancoleman/bip39
* Ọ bụrụ na ị na-eji zcashd, ị nwere ike ịmepụta UA ma jiri onye na-anabata ihe doro anya gị. `getPubkey.sh` iji wepụta igodo ọha gị.


## Mepụta 2x Multisig (2 nke 3) t3 adreesị

Na-agba ọsọ createMultiSig.sh iji mepụta adreesị multisig gị ma gbapụta edemede. Ihe dị mkpa bụ igodo ọha na eze 3

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2nd t3 maka adreesị mgbanwe. 

#### IHE: n'ihe atụ a, pubk1,pubk4 bụ otu onye,pubk2,pubk5 bụkwa otu onye na ihe ndị ọzọ ...

#### IHE: NKEZI nke mkpịsị ugodi gị dị mkpa! Lezie anya na nke a!!!!


## Adreesị t3

Jiri obere akpa / facuet ọ bụla iji kwụọ ụgwọ adreesị

## Mepụta azụmahịa MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

ebe,

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

`./txDetails.sh txid` => ga-enyere gị aka ịchọta ihe ọmụma dị gị mkpa

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Ihe ịrịba ama MultiSig TX

Mepee signMultiSigTX.sh ma tinye igodo nzuzo gị na pk1,pk2, ... variables.
 

*** Agaghị m akwado ịpịnye ihe ndị a n'ime ọnụ gị. ***


Ọ bụrụ na ị nwere ohere ịnweta igodo nzuzo gị niile ị nwere ike iji ha niile n'otu oge iji chekwaa oge,
but in most real world examples, the signing will be done via folks around the world so each of the required participants will need to sign,
mgbe ahụ zipụ azụ mmelite raxTX "hex" mmepụta nke ndị ọzọ ga-eji bịanye aka iji mezue usoro ịbịanye aka.

Onye ọ bụla kere tx mbụ, ga-eji igodo nzuzo ha bịanye aka ma zipụ hex rawTX emelitere nke ndị ọzọ sonyere kwesịrị ịbịanye aka.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

To sign this tx, at least 2 out of the three private keys need to sign it. If the public key you gave was exported using a T-address from zcashd, you can get the private key of your T address with: 


`zcash-cli dumpprivkey "t-addr"`


Maka ihe ngosi a, ejirila m Iancoleman's bip39 iji wepu igodo nzuzo dị mkpa.


## Ejiri TX mee ihe

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Isi mmalite

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




