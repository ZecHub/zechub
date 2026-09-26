# Onyesho la Ywallet FROST

> **Ywallet haitumiki tena.** Msanidi programu wake amethibitisha kuwa haitasasishwa kwa Ironwood (NU6.3), kwa hivyo haiwezi tena kufuata mnyororo na hatua zilizo hapa chini haziwezi kukamilishwa kwenye mainnet. Ukurasa huu umehifadhiwa kwa marejeleo. Zkool, kutoka kwa msanidi programu huyo huyo, ndiye mrithi anayedumishwa na anaunga mkono FROST multisig.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Kusanya mapipa ya FROST

[Kiungo cha Github](https://github.com/ZcashFoundation/frost-zcash-demo)

Tumia repo hapo juu na ufuate maelekezo ya kukusanya: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Mapipa yatakuwa folda lengwa.

## Unda FROST UA

`./generateFROST_UA.sh`



## Ingiza UFVK kwenye Ywallet

Akaunti -> Bonyeza + na ubandike ufvk kutoka hatua iliyo hapo juu

## Unda muamala na Ywallet

Bandika kwenye UA yoyote na utume tx. Hifadhi faili.

## Anza mchakato wa kusaini FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Ingizo la kwanza ni eneo la tx mbichi kutoka hatua iliyo hapo juu
Ingizo la pili ni eneo na jina la tx iliyosainiwa unayotaka kutangaza
Hii ni sehemu ambapo unamwambia FROST ni muamala gani unataka kila mtu asaini

## Mratibu wa Anza

`./runCoordinator.sh`

Hii inaratibu saini ya kila mshiriki na kuunda saini ya kikundi

## Kila Mshiriki asaini kwa ajili ya muamala huu

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Kamilisha Muamala uliosainiwa

Katika dirisha la mratibu, nakili sahihi ya kikundi inayotolewa na uibandike kwenye dirisha la kusaini la FROST.
Hii itakamilisha utiaji saini wa FROST na kutoa 'mysingedtx'


## Tangaza Muamala wako na Ywallet

Bonyeza 'Zaidi' upande wa chini kulia wa Ywallet na utafute 'Broadcast'. Tafuta 'mysignedtx' na ubofye sawa.

Ikiwa kila kitu kitafanya kazi utapata kitambulisho cha muamala :)
