# Àkọlé àwòrán Ywallet FROST

## Ṣàkójọ àwọn àwo FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Lo repo ti o wa loke ki o tẹle awọn itọnisọna lori ikojọpọ: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Àwọn ìdìpọ̀ náà ni yóò jẹ́ àpamọ́ tí a ó fi ṣe àfojúsùn.


## Ṣẹda Ẹgbẹ́ Ọ̀rọ̀-ìmọ̀ FROST

`./generateFROST_UA.sh`



## Ṣe àtúnṣe sí UFVK sínú Ywallet

Awọn iroyin -> Tẹ + ki o si lẹẹ ufvk lati igbesẹ loke

## Ṣẹda ìnáwó kan pẹ̀lú Ywallet

Fi UA kankan sínú rẹ kí o sì fi tx ránṣẹ́. Pa fáìlì náà mọ́.

## Bẹrẹ ilana iforukọsilẹ FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

akọkọ titẹsi ni awọn ipo ti awọn aise tx lati awọn igbese loke
keji titẹsi ni awọn ipo ati orukọ ti awọn wole tx ti o fẹ lati igbohunsafefe
Eyi ni apa ti o sọ fun FROST eyi ti transction ti o fẹ gbogbo eniyan lati wole

## Bẹrẹ Olùdarí

`./runCoordinator.sh`

Eyi ṣe ifọkanbalẹ ibuwọlu olukopa kọọkan ati ṣẹda ibuwọlẹ ẹgbẹ kan

## Jẹ ki Olùkópa kọ̀ọ̀kan fọwọ́ sí ìnáwó yìí

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Ṣíṣe Àdéhùn Ìṣèlú tí a fọwọ́ sí

Ninu window alárinà, ṣe ẹ̀dà ìforúkọsílẹ̀ ẹgbẹ́ tí ó jẹ́ ìjade kí o sì lẹ ẹ sínú window ìforukọsílẹ̣ FROST.
Eleyi yoo pari awọn FROST ami ati ki o jade "mysingedtx"


## Firanṣẹ Iṣowo rẹ pẹlu Ywallet

Tẹ 'More' ní apá ọ̀tún ìsàlẹ̀ Ywallet kí o wá 'Broadcast'. wá 'mysignedtx' kí o sì tẹ ok.

Ti ohun gbogbo ba ṣiṣẹ iwọ yoo gba ID idunadura :)
