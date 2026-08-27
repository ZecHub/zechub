# MultiSig Demo a Wɔde Kyerɛkyerɛ

> **Abakɔsɛm kyerɛwtohɔ. Saa akwankyerɛ yi nyɛ adwuma bio.**
>
> Anammɔn a ɛwɔ ase ha nyinaa gyina zcashd so, na zcashd gyinaa hɔ ankasa wɔ July 18, 2026, bere a ne mmoa baa awiei. Nkyerɛwee ason a ɛka saa krataafa yi ho no de `zcash-cli` na ɛdi dwuma, enti wɔn mu biara ntumi nnu node a ɛreyɛ adwuma so nnɛ.
>
> Wontumi mfa saa nkyerɛwee yi nkɔ baabi foforo tẽẽ: egyina RPC a ɛfa raw transaction ne sika kotokuo ho a zcashd agyae so, na Zallet de akwan foforo a ɛde PCZT di dwuma sen raw transaction hex asi wɔn ananmu.
>
> Sɛ wopɛ nnipa pii nsiakyi wɔ Zcash so nnɛ a, hwɛ [FROST ne threshold nsiakyi](/zcash-tech/frost-threshold-custody) ne [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo). Sɛ wopɛ sɛ wotu node a ɛwɔ hɔ dedaw fi zcashd so a, hwɛ [Zebra ne Zallet akwankyerɛ](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Yɛde saa krataafa yi asie sɛ abakɔsɛm kyerɛwtohɔ a ɛfa transparent multisig adwuma nhyehyɛe ho.

Saa demo yi hwehwɛ sɛ wɔde zcashd 

## Boaboa ɔmanfo nsafe ano fi ankorankoro a wohia hɔ

* https://github.com/iancoleman/bip39
* Sɛ wode zcashd redi dwuma a, wobɛtumi ayɛ UA na wode wo transparent reciever nso adi dwuma. Afei fa di dwuma `getPubkey.sh` sɛ wobɛyi wo public key no afiri mu.


## Yɛ 2x Multisig (2 of 3) t3 address ahorow

run createMultiSig.sh na yɛ wo multisig address na gye script. Nea ehia ne ɔmanfo nsafe 3

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2nd t3 ma nsakrae address no. 

#### NHYƐ NO NSO: wɔ saa nhwɛsoɔ yi mu no pubk1,pubk4 yɛ onipa korɔ, pubk2,pubk5 yɛ onipa korɔ ne nea ɛkeka ho ...

#### NHYƐ NO NSO2: wo pubkeys no ORDER no ho hia! Hwɛ yie wɔ eyi ho!!!!


## Fund t3 address

Fa sika kotoku/facuet biara di dwuma de sika address

## Yɛ MultiSig nkitahodi

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

ɛhe,

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

`./txDetails.sh txid` => bɛboa wo ma woanya nsɛm a wohia

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Fa wo nsa hyɛ MultiSig TX ase

Bue signMultiSigTX.sh na fa wo kokoam safoa no ka ho wɔ pk1,pk2, ... nsakrae ahorow no mu.
 

*** Merenkamfo nkyerɛ sɛ kyerɛw eyinom wɔ wo terminal no mu. *** .


Sɛ wowɔ kwan kɔ wo kokoam safe nyinaa so a wubetumi de ne nyinaa adi dwuma prɛko pɛ de akora bere so, .
nanso wɔ wiase ankasa nhwɛso dodow no ara mu no, wɔde wɔn nsa bɛhyɛ ase denam folks a wɔwɔ wiase nyinaa so enti ɛho behia sɛ wɔn a wɔhwehwɛ sɛ wɔde wɔn ho hyɛ mu no mu biara de ne nsa hyɛ ase, .
afei fa raxTX "hex" output a wɔayɛ no foforo a afoforo no de bedi dwuma de ahyɛ wɔn nsa de awie nsaano nkyerɛwee no san kɔ.

Obiara a ɔbɔ tx a edi kan no, ɔde wɔn kokoam safoa bɛhyɛ aseɛ na ɔde rawTX hex a wɔayɛ no foforɔ a ɛhia sɛ wɔn a wɔde wɔn ho hyɛɛ mu afoforɔ no de wɔn nsa hyɛ aseɛ no akɔ.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Sɛ wode wo nsa hyɛ tx yi ase a, anyɛ yiye koraa no, ɛsɛ sɛ kokoam safe abiɛsa no mu 2 de wo nsa hyɛ ase. Sɛ wɔde T-address a efi zcashd na ɛde baguam safoa a wode mae no kɔ amannɔne a, wubetumi anya wo T address no kokoam safoa no denam: 


`zcash-cli dumpprivkey "t-addr"`


Wɔ saa demo yi mu no, mede iancoleman bip39 adi dwuma de atew kokoam nsafe a ehia no ho ntɛmntɛm.


## Broadcast de wɔn nsa hyɛɛ ase TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Nneɛma a wonya fi mu

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




