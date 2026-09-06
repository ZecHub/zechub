# MultiSig Demo

> ** Historia. hii kutembea kwa njia ya sasa haina kukimbia.**
>
> Kila hatua chini inategemea zcashd, ambayo kufikiwa moja kwa moja Mwisho wa Support kusimamishwa juu ya 18 Julai 2026. maandishi saba kusafirishwa pamoja na ukurasa huu kuendesha ni kupitia `zcash-cli`, hivyo hakuna wao wanaweza kufikia node mbio leo.
>
> Hati hizi haziwezi ported mechanically. Wao ni kujengwa juu ya ghafi-transaction na mkoba RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`Zallet badala ya wale na mbinu mpya ambayo kazi juu ya PCZTs badala ya ghafi shughuli hex, na bado ni katika beta kwa njia nyingi zcashd si ported.
>
> Kwa ajili ya ulinzi wa vyama vingi juu Zcash leo, angalia [FROST & Kiwango cha Kuweka Ulinzi](/zcash-tech/frost-threshold-custody), ambayo ni pamoja na kulinganisha moja kwa moja na uwazi multisig, na kazi ya kuongoza mfumo wa usimamizi. [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo). Kuhamisha node zilizopo nje zcashd, angalia [mwongozo wa uhamiaji kwa Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Ukurasa huu ni kuhifadhiwa kama rekodi ya kihistoria wa uwazi multisig kazi.

Demo hii inahitaji zcashd, ambayo kusimamishwa juu ya 18 Julai 2026 na tena anaendesha. Hakuna kitu chini inaweza kukamilika dhidi live mlolongo.

## Kukusanya funguo za umma kutoka kwa watu wanaohitajika

* https://github.com/iancoleman/bip39
* Kama kutumia zcashd, unaweza kuunda UA na matumizi yako mpokeaji uwazi pamoja. Kisha tumia `getPubkey.sh` kuondoa ufunguo wako wa umma.


## Kujenga 2x Multisig (2 ya 3) anwani t3

kukimbia createMultiSig.sh kuzalisha anwani yako multisig na kuwakomboa script. Kinachohitajika ni 3 funguo za umma

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6` # 2 t3 kwa ajili ya mabadiliko anwani. 

#### KUMBUKA: katika mfano huu pubk1,pubk4 ni mtu yuleyule, pubk2,pubk5 ni mtu huyo na kadhalika ...

#### NOTE2: utaratibu wa pubkeys yako mambo! makini na hii!!!!


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

`./txDetails.sh txid` => itakusaidia kupata habari zinazohitajika

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Ishara MultiSig TX

Fungua isharaMultiSigTX.sh na kuongeza funguo yako binafsi katika pk1,pk2, ... vigezo.
 

*** Mimi si kupendekeza kuandika haya katika terminal yako. ***


Kama una upatikanaji wa funguo yako yote binafsi unaweza kuzitumia zote kwa mara moja ili kuokoa muda,
lakini katika mifano ya ulimwengu wa kweli, kusaini utafanywa kupitia watu duniani kote hivyo kila mmoja wa washiriki required itahitaji saini,
kisha kutuma nyuma updated raxTX "hex" pato ambayo wengine watatumia saini kukamilisha kusainiwa proceureure.

Nani milele inajenga tx kwanza, itakuwa saini na ufunguo wao binafsi na kutuma nje updated rawTX hex kwamba mahitaji ya kuwa saini kwa washiriki wengine.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Ili saini hii tx, angalau 2 nje ya tatu funguo binafsi haja ya kusaini yake. Kama ufunguo wa umma ulitoa ilihamishwa kwa kutumia T-anwani kutoka zcashd, unaweza kupata muhimu binafsi ya anwani yako T na: 


`zcash-cli dumpprivkey "t-addr"`

Amri hii kusimamishwa na zcashd na anarudi kitu leo; ni kumbukumbu hapa tu kuonyesha jinsi demo got funguo zake.


Kwa demo hii, mimi kutumika Iancoleman ya bip39 kwa haraka kutenganisha muhimu required binafsi.


## Broadcast saini TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Vyanzo vya habari

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




