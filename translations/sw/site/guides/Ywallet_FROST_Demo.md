# Ywallet FROST demo

> **Ywallet ni tena iimarishwe.** developer wake imethibitisha itakuwa si updated kwa Ironwood (NU6.3), hivyo inaweza tena kufuata mlolongo na hatua chini haiwezi kukamilika juu ya mainnet. ukurasa huu imehifadhiwa kwa ajili ya kumbukumbu. Zkool, kutoka developer huo, ni kudumishwa mrithi na inasaidia FROST multisig.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>


## Kuweka pamoja FROST mitungi

[Kiungo Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Tumia repo juu na kufuata maelekezo ya kuandaa: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bins itakuwa folda lengo.

## Kuunda FROST UA

`./generateFROST_UA.sh`



## Kuingiza UFVK katika Ywallet

Akaunti -> Bonyeza + na kuweka ufvk kutoka hatua juu

## Kuunda shughuli na Ywallet

Kuweka katika UA yoyote na kutuma tx. Hifadhi faili.

## Kuanza FROST kusaini utaratibu 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

kwanza pembejeo ni eneo la tx ghafi kutoka hatua ya juu
pili ya kuingia ni eneo na jina la saini tx unataka matangazo
This is part where you tell FROST which transction you want everyone to sign

## Kuanza Coordinator

`./runCoordinator.sh`

Hii kuratibu kila mshiriki saini na inajenga kundi la sahihi

## Kuwa kila mshiriki saini kwa ajili ya shughuli hii

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Kukamilisha Imesainiwa Transaction

Katika dirisha la uratibu, nakala saini ya kikundi ambayo ni pato na kuweka ndani ya FROST kusainiwa dirisha.
Hii kukamilisha FROST kusaini na pato 'mysingedtx'


## Kutangaza shughuli yako na Ywallet

Bonyeza 'Zaidi' chini kulia upande wa Ywallet na kupata 'Broadcast'. Kupata 'mysignedtx' na bonyeza ok.

Kama kila kitu kazi utapata shughuli ID :)
