# MultiSig Demo a Wɔde Kyerɛkyerɛ

> **Abakɔsɛm mu nsɛm. Saa nantew yi ntu mmirika bio.**
>
> Anamɔn biara a ɛwɔ aseɛ ha no gyina zcashd so, a ɛduruu ne automatic End-of-Support halt wɔ 18 July 2026. Scripts nson a wɔde mena wɔ krataafa yi nkyɛn no ma ɛkɔ mu `zcash-cli`, enti wɔn mu biara ntumi nkɔ node a ɛretu mmirika nnɛ.
>
> Wontumi mfa mfiri mfa saa script ahorow yi nkɔ baabi foforo. Wɔde asi raw-transaction ne wallet RPC ahorow (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) sɛ zcashd deprecated ansa na wɔregyae; Zallet de akwan foforɔ a ɛyɛ adwuma wɔ PCZTs so sene raw transaction hex si wɔn ananmu, na ɛda so ara wɔ beta mu a zcashd akwan pii a wonnya nkɔɔ hɔ.
>
> Sɛ wopɛ multi-party custody wɔ Zcash nnɛ a, hwɛ [FROST & Threshold Nhwɛsode](/zcash-tech/frost-threshold-custody), a nea ɛka ho ne ntotoho tẽẽ a ɛne multisig a ɛda adi pefee, ne adwumayɛ [Ywallet FROST ho ɔyɛkyerɛ](/guides/frostdemo/ywallet-frost-demo). Sɛ wopɛ sɛ wode node a ɛwɔ hɔ dedaw no fi zcashd so a, hwɛ [atutra ho akwankyerɛ a ɛkɔ Zebra ne Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Wɔde krataafa yi sie sɛ abakɔsɛm kyerɛwtohɔ a ɛfa multisig adwumayɛ nhyehyɛe a ɛda adi pefee no ho.

Saa demo yi hwehwɛ zcashd, a ɛgyinaa wɔ 18 July 2026 na ɛnkɔ so bio. Biribiara nni ase hɔ a wobetumi awie atia nkɔnsɔnkɔnsɔn a ɛte ase no.

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

`./txDetails.sh txid` => bɛboa wo ma woanya nsɛm a ehia

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

Nea ɔbɔ tx a edi kan no, de wɔn kokoam safoa no bɛhyɛ aseɛ na ɔde rawTX hex a wɔayɛ no foforɔ a ɛhia sɛ wɔn a wɔde wɔn ho hyɛɛ mu afoforɔ no de wɔn nsa hyɛ aseɛ no akɔ.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Sɛ wode wo nsa hyɛ tx yi ase a, anyɛ yiye koraa no, ɛsɛ sɛ kokoam safe abiɛsa no mu 2 de wo nsa hyɛ ase. Sɛ wɔde T-address a efi zcashd na ɛde baguam safoa a wode mae no kɔ amannɔne a, wubetumi anya wo T address no kokoam safoa no denam: 


`zcash-cli dumpprivkey "t-addr"`

Saa ahyɛdeɛ yi gyaee ne zcashd na ɛnsan mfa hwee mma ɛnnɛ; wɔakyere agu ha de akyerɛ sɛnea demo no nyaa ne nsafe no nkutoo.


Wɔ saa demo yi mu no, mede iancoleman bip39 adi dwuma de atew kokoam safe a ehia no ho ntɛmntɛm.


## Broadcast de wɔn nsa hyɛɛ ase TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Nneɛma a wonya fi mu

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




