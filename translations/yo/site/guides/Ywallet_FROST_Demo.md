# Àfihàn Ywallet FROST

> **A kò ṣe ìtọ́jú Ywallet mọ́.** Olùgbékalẹ̀ rẹ̀ ti jẹ́rìí sí i pé a kò ní ṣe àtúnṣe rẹ̀ fún Ironwood (NU6.3), nítorí náà kò le tẹ̀lé ẹ̀wọ̀n mọ́, a kò sì le parí àwọn ìgbésẹ̀ ìsàlẹ̀ yìí lórí mainnet. Ojú ìwé yìí wà fún ìtọ́kasí. Zkool, láti ọ̀dọ̀ olùgbékalẹ̀ kan náà, ni arọ́pò tí a ń tọ́jú, ó sì ń ṣe àtìlẹ́yìn fún FROST multisig.

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


## Ṣe àkójọ àwọn àpótí FROST

[Ìjápọ̀ Github](https://github.com/ZcashFoundation/frost-zcash-demo)

Lo ibi ipamọ ti o wa loke ki o tẹle awọn itọnisọna lori kikọ: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Àwọn àpótí ni yóò jẹ́ àkójọpọ̀ ibi tí a fẹ́ kó o dé.

## Ṣẹ̀dá FROST UA

`./generateFROST_UA.sh`



## Gbe UFVK wọle sinu Ywallet

Àkọọ́lẹ̀ -> Tẹ + kí o sì lẹẹ mọ́ ufvk láti ìgbésẹ̀ òkè

## Ṣẹ̀dá ìṣòwò pẹ̀lú Ywallet

Lẹ́ẹ̀mọ́ UA èyíkéyìí kí o sì fi tx ránṣẹ́. Fi fáìlì náà pamọ́.

## Bẹ̀rẹ̀ iṣẹ́ ìfọwọ́sowọ́pọ̀ FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Àkọ́kọ́ ìtẹ̀síwájú ni ibi tí tx tí a kò rí tẹ́lẹ̀ wà láti ìgbésẹ̀ òkè yìí
ìtẹ̀síwájú kejì ni ibi àti orúkọ tx tí a fọwọ́ sí tí o fẹ́ gbé jáde
Apá yìí ni ibi tí o ti lè sọ fún FROST irú ìyípadà tí o fẹ́ kí gbogbo ènìyàn fọwọ́ sí.

## Olùṣàkóso Bẹ̀rẹ̀

`./runCoordinator.sh`

Èyí ń ṣe àkóso ìfọwọ́sowọ́pọ̀ àwọn olùkópa kọ̀ọ̀kan, ó sì ń ṣẹ̀dá ìfọwọ́sowọ́pọ̀ ẹgbẹ́ kan

## Jẹ́ kí olúkúlùkù olùkópa fọwọ́ sí ìṣòwò yìí

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Pari Iṣowo ti a fowo si

Nínú fèrèsé olùṣàkóso, da ìfọwọ́sowọ́pọ̀ ẹgbẹ́ tí ó jáde kí o sì lẹẹ mọ́ inú fèrèsé ìfọwọ́sowọ́pọ̀ FROST.
Èyí yóò parí ìfọwọ́sowọ́pọ̀ FROST àti láti mú 'mysingedtx' jáde


## Ṣe ikede Iṣowo rẹ pẹlu Ywallet

Tẹ 'More' ní ìsàlẹ̀ apá ọ̀tún Ywallet kí o sì wá 'Broadcast'. Wa 'mysignedtx' kí o sì tẹ OK.

Ti ohun gbogbo ba ṣiṣẹ iwọ yoo gba ID iṣowo kan :)
