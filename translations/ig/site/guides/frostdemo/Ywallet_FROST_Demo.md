# Ihe ngosi Ywallet FROST

## Nchịkọta FROST bins

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Jiri ụlọ nkwakọba ihe dị n'elu ma soro ntuziaka na nchịkọta: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Bins ga-abụ folda a na-achọ.


## Mepụta FROST UA

`./generateFROST_UA.sh`



## Tinye UFVK n'ime Ywallet

Akaụntụ -> Pịa + na mado ufvk site na nzọụkwụ n'elu

## Mepụta azụmahịa na Ywallet

Tinye UA ọ bụla ma zipụ tx. Chekwaa faịlụ ahụ.

## Malite usoro ịbịanye aka FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

mbụ input bụ ọnọdụ nke raw tx si nzọụkwụ n'elu
ntinye nke abuo bu ebe na aha nke TX a bịanyere aka na ịchọrọ ịgbasa
Nke a bụ ebe ị na-agwa FROST nke nkwekọrịta ị chọrọ ka mmadụ niile bịanye aka na ya

## Malite Onye Nchịkọta

`./runCoordinator.sh`

Nke a na-ahazi mbinye aka nke onye ọ bụla so na ya ma mepụta akara ngosi otu

## Mee ka onye ọ bụla sonyere banye maka azụmahịa a

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Mezue azụmahịa a bịanyere aka na ya

Na windo onye nhazi, detuo mbinye aka nke otu a na-ewepụta ma tinye ya n'ime windo mbinye FROST.
Nke a ga-emecha akara FROST na mmepụta 'mysingedtx'


## Zipu azụmahịa gị na Ywallet

Pịa 'More' n'akụkụ aka nri nke Ywallet wee chọta 'Broadcast'. Chọta 'mysignedtx' wee pịa ok.

Ọ bụrụ na ihe niile na-arụ ọrụ ị ga-enweta ID azụmahịa :)
