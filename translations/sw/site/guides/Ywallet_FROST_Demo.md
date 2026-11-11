# Ywallet FROST onyesho

> **Ywallet haitunzwe tena.** Msanidi programu [developer] wake amethibitisha kwamba haitasasishwa kwa ajili ya Ironwood (NU6.3), hivyo haiwezi tena kufuata mnyororo [chain] na hatua zilizo hapa chini haziwezi kukamilishwa kwenye mainnet. Ukurasa huu umehifadhiwa kwa marejeleo. Zkool, kutoka kwa msanidi programu huyo huyo, ni mbadala unaotunzwa na unaunga mkono multisig ya FROST.

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


## Kusanya faili za utekelezaji za FROST

Kiungo cha [GitHub](https://github.com/ZcashFoundation/frost-zcash-demo)

Tumia repo iliyo hapo juu na ufuate maelekezo ya ukusanyaji: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Faili za utekelezaji zitakuwa kwenye folda lengwa.

## Unda UA ya FROST

`./generateFROST_UA.sh`



## Leta UFVK katika Ywallet

Akaunti -> Bofya + na ubandike ufvk kutoka hatua iliyo hapo juu

## Unda muamala [transaction] ukitumia Ywallet

Bandika UA yoyote na utume tx. Hifadhi faili.

## Anzisha utaratibu wa kutia sahihi [signature] wa FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Ingizo la kwanza ni mahali pa tx ghafi kutoka hatua iliyo hapo juu  
Ingizo la pili ni mahali na jina la tx iliyotiwa sahihi unayotaka kutangaza  
Hii ndiyo sehemu ambayo unaambia FROST ni muamala gani unataka kila mtu atie sahihi

## Anzisha Mratibu

`./runCoordinator.sh`

Hii huratibu sahihi ya kila mshiriki na kuunda sahihi ya kikundi

## Mwache kila Mshiriki atie sahihi kwa ajili ya muamala huu

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Kamilisha Muamala uliotiwa Sahihi

Katika dirisha la mratibu, nakili sahihi ya kikundi inayotolewa na uibandike kwenye dirisha la kutia sahihi la FROST.
Hii itakamilisha utiaji sahihi wa FROST na kutoa 'mysingedtx'


## Tangaza Muamala wako kwa kutumia Ywallet

Bofya 'More' kwenye upande wa chini kulia wa Ywallet na utafute 'Broadcast'. Tafuta 'mysignedtx' na ubofye sawa.

Ikiwa kila kitu kitafanya kazi, utapata kitambulisho cha muamala :)
