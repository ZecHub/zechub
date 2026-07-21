# MultiSig Demo

Demo hii inahitaji zcashd 

## Kukusanya funguo za umma kutoka kwa watu wanaohitajika

* https://github.com/iancoleman/bip39
* Kama kutumia zcashd, unaweza kuunda UA na kutumia mpokeaji wako uwazi pia. Kisha kutumia `getPubkey.sh` kuondoa ufunguo wako wa umma.


## Kujenga 2x Multisig (2 ya 3) t3 anwani

kukimbia createMultiSig.sh kuzalisha anwani yako multisig na kuwakomboa script. Kinachohitajika ni 3 funguo za umma

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2 t3 kwa ajili ya mabadiliko ya anwani. 

#### KUMBUKA: katika mfano huu pubk1,pubk4 ni mtu yule yule, pubk2,pubk5 ni mtu mmoja na kadhalika ...

#### KUMBUKA2: utaratibu wa pubkeys yako mambo! makini na hii!!!!


## Anwani ya mfuko wa t3

Matumizi yoyote mkoba / facuet kwa fedha anwani

## Kujenga shughuli MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

ambapo,

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

`./txDetails.sh txid` => itakusaidia kupata taarifa zinazohitajika

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Ishara MultiSig TX

Fungua signMultiSigTX.sh na kuongeza funguo yako binafsi katika pk1,pk2, ... vigezo.
 

*** Ningependa kupendekeza kuandika haya katika terminal yako. ***


Kama una upatikanaji wa funguo yako yote binafsi unaweza kuzitumia zote kwa mara moja ili kuokoa muda,
lakini katika mifano ya ulimwengu wa kweli, kusaini utafanywa kupitia watu duniani kote hivyo kila mmoja wa washiriki required itahitaji saini,
kisha kutuma nyuma updated raxTX "hex" pato ambayo wengine watatumia saini kukamilisha kusaini proceureure.

Nani milele inajenga tx kwanza, itakuwa saini na ufunguo wao binafsi na kutuma nje updated rawTX hex kwamba mahitaji ya kuwa saini kwa washiriki wengine.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Ili saini hii tx, angalau 2 nje ya tatu funguo binafsi haja ya saini yake. Kama ufunguo wa umma wewe alitoa ilihamishwa kwa kutumia T-anwani kutoka zcashd, unaweza kupata ufunguzi binafsi wa anwani yako T na: 


`zcash-cli dumpprivkey "t-addr"`


Kwa demo hii, mimi kutumika Iancoleman ya bip39 kwa haraka kutenganisha muhimu muhimu binafsi.


## Broadcast saini TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Vyanzo

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




