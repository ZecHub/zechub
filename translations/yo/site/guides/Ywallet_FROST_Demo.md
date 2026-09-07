# Àwòkẹ́kò́ó Ywallet FROST

> **Ywallet is no longer maintained.** Its developer has confirmed it will not be updated for Ironwood (NU6.3), so it can no longer follow the chain and the steps below cannot be completed on mainnet. This page is kept for reference. Zkool, from the same developer, is the maintained successor and supports FROST multisig.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>


## Ṣàkójọ àwọn àpò FROST

[Àkọlé ìjápọ̀ Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Lo repo ti o wa loke ki o tẹle awọn itọnisọna lori ikojọpọ: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Àwọn ìdìpọ̀ ni yóò jẹ́ àpamọ̀ tí a ó lò.

## Ṣẹda Àjọṣe Ẹ̀rọ-ìmọ̀ ti FROST

`./generateFROST_UA.sh`



## Ṣíṣe àtúntò UFVK sí Ywallet

Àwọn àkọọ́lẹ̀ -> Tẹ + ki o si lẹ ufvk láti ìgbésè tí ó wà lókè yìí

## Ṣẹda ìnáwó kan pẹ̀lú Ywallet

Fi ohun elo UA kankan sínú rẹ kí o sì fi tx ránṣẹ́. Pa fáìlì náà mọ́.

## Bẹrẹ ilana ìforúkọsílẹ̀ FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

akọkọ input ni awọn ipo ti aise tx lati igbese loke
keji titẹsi ni awọn ipo ati orukọ ti wole tx o fẹ lati igbohunsafefe
Eyi ni apa ti o sọ fun FROST eyi ti transction ti o fẹ gbogbo eniyan lati wole

## Bẹrẹ Olùṣètò

`./runCoordinator.sh`

Eyi ṣe ifọkansi ibuwọlu olukopa kọọkan ati ṣẹda ibuwọlẹ ẹgbẹ kan.

## Jẹ ki Olùkópa kọ̀ọ̀kan fọwọ́ síi fún ìnáwó yìí.

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Ṣíṣe Ìṣirò tí a fọwọ́ sílẹ̀ parí

Ninu window alárinà, dawọ̀n ìforúkọ ẹgbẹ́ tí a fi sílẹ̀ kí o sì lẹ ẹ sínú wíńdò fífi orúkọ sí FROST.
This will complete the FROST signing and output 'mysingedtx'


## Firanṣẹ Iṣowo rẹ pẹlu Ywallet

Tẹ 'More' ní ìsàlẹ̀ apá ọ́tún Ywallet, wá "Broadcast" Wá "mysignedtx", kí o sì tẹ ok.

Ti ohun gbogbo ba ṣiṣẹ iwọ yoo gba ID idunadura kan :)
