# Ywallet FROST demo

## Kukusanya FROST mitungi

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Tumia repo hapo juu na kufuata maelekezo juu ya kuandaa: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Bins itakuwa folda lengo.


## Kuunda FROST UA

`./generateFROST_UA.sh`



## Ingiza UFVK katika Ywallet

Akaunti -> Bonyeza + na kuweka ufvk kutoka hatua juu

## Unda shughuli na Ywallet

Kuweka katika UA yoyote na kutuma tx. Hifadhi faili.

## Kuanza FROST kusaini utaratibu 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

kwanza pembejeo ni eneo la tx ghafi kutoka hatua juu
kuingia pili ni eneo na jina la saini tx unataka matangazo
Hii ni sehemu ambapo unaweza kuwaambia FROST ambayo transction unataka kila mtu saini

## Kuanza Coordinator

`./runCoordinator.sh`

Hii kuratibu kila mshiriki saini na inajenga saini kundi

## Kuwa kila mshiriki saini kwa ajili ya shughuli hii

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Kukamilisha Imesainiwa Transaction

Katika dirisha mratibu, nakala ya saini kundi kwamba ni pato na kuweka ndani ya FROST kusaini dirisha.
Hii kukamilisha FROST kusaini na pato 'mysingedtx'


## Kutangaza Transaction yako na Ywallet

Bonyeza 'Zaidi' upande wa chini kulia wa Ywallet na tafuta 'Broadcast'. Tafuta 'mysignedtx' na bonyeza ok.

Kama kila kitu kazi utapata shughuli ID :)
