# Ywallet FROST ƒe wɔwɔfia

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>


## Ƒo FROST bins nu ƒu

[Github ƒe kadodo](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Zã repo si le etame eye nàwɔ ɖe mɔfiame siwo ku ɖe nuƒoƒoƒu ŋu dzi: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bins anye the taɖodzinu ƒe agbalẽdzraɖoƒe.

## Wɔ FROST UA

`./generateFROST_UA.sh`



## Tsɔ UFVK va Ywallet me

Accounts -> Zi + dzi eye nàde ufvk tso afɔɖeɖe si le etame

## Wɔ asitsatsa kple Ywallet

Kpe ɖe UA ɖesiaɖe me eye nàɖo tx ɖa. Dzra faɛl la ɖo.

## Dze FROST ƒe asidede agbalẽ te ƒe ɖoɖoa gɔme 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

gbãtɔ si wotsɔ de emee nye afisi tx xoxoa le tso afɔɖeɖe si le etame
evelia ƒe nyawo tsɔtsɔ de emee nye teƒe kple ŋkɔ si wode asi na tx si nèdi be yeaɖe gbeƒãe
Esia nye akpa aɖe si nègblɔa asitsatsa si nèdi be amesiame nade asi na FROST

## Dze egɔme ƒe Ðoɖowɔla

`./runCoordinator.sh`

Esia wɔa ɖoɖo ɖe gomekpɔla ɖesiaɖe ƒe asidede agbalẽ te ŋu eye wòwɔa ƒuƒoƒo ƒe asidede agbalẽ te

## Na Gomenɔla ɖesiaɖe nade asi asitsatsa sia te

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Wu Asitsatsa si wode asi ete la nu

Le ɖoɖowɔla ƒe fesre me la, kɔpi ƒuƒoƒo ƒe asidede agbalẽ te si woɖe ɖe go eye nàtsɔe ade FROST asidede fesrea me.
Esia awu FROST ƒe asidede nu eye wòaɖe 'mysingedtx' ɖa.


## Gbe wò Asitsatsa kple Ywallet

Zi 'More' dzi le Ywallet ƒe ɖusime le ete eye nàdi 'Broadcast'. Di 'mysignedtx' eye nàzi ok dzi.

Ne nusianu wɔ dɔ la, àxɔ asitsatsa ƒe ID :)
