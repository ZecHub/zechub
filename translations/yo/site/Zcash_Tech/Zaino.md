# Àkọsílẹ̀ Zaino Indexer

Zaino jẹ́ àdàkọ ìdìpọ̀ Rust fún Zcash blockchain. Ó ka data ẹ̀ka láti inú Zebra full node ó sì ń pèsè àwọn ìsọfúnni tí wallets, explorers, faucets àti àwọn iṣẹ míràn nílò láìṣe kí Zebra fúnra rẹ ṣe ojúṣe fun gbogbo ìdásílẹ̀ tó dojú kọ oníbàárà.

## TL;DR

* Zebra ṣe àyẹ̀wò ìsopọ Zcash.
* **Zaino** ṣe àtòjọ àwọn ìsọfúnni ẹ̀ka Zebra ó sì tú API tí ń wojú oníbàárà síta.
* **Zallet** ni ohun ti o wa ninu apo-owo Z3. Ni iṣeto aiyipada Z3, Zallet n ba Zebra sọrọ taara ati pe ko nilo iṣẹ Zaino iduroṣinṣin.
* Iṣẹ Zaino ti o duro ni iyasọtọ jẹ wulo nigbati awọn oniṣowo nilo opin ipari gRPC lightwalletd-ti ibaramu, aṣoju JSON-RPC kan, tabi amayederun fun awọn apamọwọ ina, awọn oluwadii, faucets, ati iru iṣẹ bẹẹ.
* Zaino jẹ ohun elo ti nṣiṣe lọwọ, ṣugbọn awọn oniṣẹ yẹ ki o ṣayẹwo iwe aṣẹ osise Z3 ati Zaino fun alaye imuse lọwọlọwọ ṣaaju ṣiṣe ni iṣelọpọ.

## Ohun Tí Zaino Ń Ṣe

Zaino joko laarin Zebra ati software onibara. Zebra ni awọn ifọkanbalẹ node: o gba lati ayelujara, verifies, ki o si tẹle Zcash blockchain. Zaino nlo Zebra bi rẹ orisun ti pq data, lẹhinna ngbaradi indexed wiwo wipe alabara ohun elo le ibeere daradara.

Ìyàtọ̀ yìí máa ń jẹ́ kí àwọn ojúṣe náà ṣe kedere:

Àwọn ohun tó wà nínú rẹ̀. Ipa tí ó kó.
|:--|:--|
Zebra. Gbogbo ìsopọ̀ àti olùṣe ìdánilójú (validator)
Zaino: Àkọsílẹ̀ àti iṣẹ́ API tí ó dojú kọ oníṣe.
| Zallet | Wallet service |
 lightwalletd. Olùgbéejáde àpò owó tí ó ti pẹ́ tí Zaino ṣe láti rọpo tàbí ṣàfikún síi

Zaino provides functionality for light clients, full clients or wallets, and block explorers. It gives access to the finalized chain, the non-finalized best chain, and mempool data held by Zebra.

## Bí Ó Ṣe Bá Ìṣirò Zcash Lọwọlọwọ Mu

Àkójọ Z3 tí ó wà ní báyìí ni a kọ yí Zebra, Zallet àti Zaino.

Ninu ifisilẹ Z3 aiyipada, Zebra ati Zallet ṣiṣẹ papọ. Zallet de ọdọ Zebra taara, nitorinaa oniṣẹ ti nṣiṣẹ nikan apo apamọwọ agbegbe ko nilo lati bẹrẹ iṣẹ Zaino iduroṣinṣin.

Zaino ti wa ni afikun nigbati awọn oniṣẹ fẹ lati sin ita onibara. Ni Z3, o nṣiṣẹ sile awọn `indexer` Kọ profaili ki o si fi kun:

* ìparí gRPC tí ó bá jẹ́ ti lightwalletd mu fún àwọn oníbàárà pẹ̀lú àpò owó kékeré (light wallet clients)
* aṣoju JSON-RPC fun awọn oluwadi, faucets ati iṣẹ ẹhin
* ibi ìpamọ́ àtòjọ àwọn ohun tí ó yàtọ̀ sí ipò ẹ̀rọ-ìpínlẹ̀ Zebra.

This makes Zaino especially relevant for wallet backends, public infrastructure operators, explorers, faucets, and developers testing services that need indexed Zcash chain data.

## Zaino àti lightwalletd

lightwalletd ni original light wallet server. Zaino jẹ Rust-based successor path fun ipa yii. ète rẹ̀ ni láti pèsè àwọn API tí ó bára mu níbi tó ti lè ṣeé ṣe kí àpòòwé àti iṣẹ́ le ṣí kiri láìjẹ́ pé a tún kọ wọ́n padà lẹsẹkẹsẹ.

Iyẹn ko tumọ si pe gbogbo ifisilẹ lightwalletd ti gbe tẹlẹ lọ si Zaino. Awọn oniṣẹ yẹ ki o ṣe itọju Zaino bi apakan ti akopọ Zebra-orisun lọwọlọwọ ati ṣayẹwo iwe aṣẹ iṣẹ tuntun, awọn itusilẹ, ati awọn dasibodu iṣẹ ṣaaju yiyan ohun lati ṣiṣẹ.

## Àwọn Àlàyé fún Olùdarí Iṣẹ́-Òjíṣẹ́

Ọna ìmúṣẹ tó rọrùn jùlọ ni ibi-ipamọ Z3.Z3 pẹlu Zaino gẹgẹbi iṣẹ ti o fẹ:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Ṣiṣẹ iṣeto Z3 deede akọkọ ki o duro fun Zebra lati ṣepọ ṣaaju ṣiṣe awọn iṣẹ ti o da lori mainnet tabi testnet.

Zaino tú oríṣi méjì ti iṣẹ nẹtiwọọki. Iṣẹ́ gRPC ni API tí ó dojú kọ lightwallet. A ṣe ètò JSON-RPC fún ìyípadà tàbí àwọn ẹ̀rọ alágbèéká àdáni bí kò bá jẹ pé òpó kan ní ń pèsè ìdáàbòbò. Má fi ohun èlò tó wà lábẹ́ àṣẹ àti èyí tí a kò sì sédì sí hàn lórí ayélujára gbogbo gbòógbò.

## Àwọn àwòrán kan tó ń fi bí Zaino ṣe n ṣiṣẹ́ hàn

### Àwòrán inú ilé Zaino.

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Àdàkọ:Zaino Live Service Architecture (← àwọn ìjápọ̀ _ àtúnṣe)

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Àwòrán-ìmúra ètò Zaino System Architecture

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

**Tíṣe Zaino gẹ́gẹ́ bí ìkànnì tó kún.** Zaino kìí ṣe olùfọwọ́sí. Zebra ń fọwọ́ sí ẹ̀ka; Zaino máa n ṣàmúlò àwọn àlàyé láti inú Zebra.

**Gba wipe gbogbo Z3 deployment nilo iduroṣinṣin Zaino.** Zallet le de ọdọ Zebra taara ni awọn aiyipada Z3 akopọ. Bẹrẹ Zaino nigbati o ba fẹ iṣẹ indexer adani fun ita onibara.

**Afihan awọn ẹya ti a gbero bi o ṣe ṣafihan tẹlẹ.** Zaino ni idagbasoke lọwọlọwọ, nitorinaa ṣayẹwo awọn akọsilẹ igbasilẹ ati awọn iwe aṣẹ ṣaaju apejuwe ẹya kan gẹgẹbi wa.

** Ṣífi JSON-RPC hàn láìṣe àfiyèsí.** Àwòrán ara ẹrọ JSON RPC ti Zaino jẹ fún ìyípadà tàbí àwọn nẹ́tàkì tí a gbẹkẹlé bí kò bá ní ìdènà láti ọwọ́ òdìkejì.

## Ibo ni mo ti lè rí ìsọfúnni síwájú sí i?

* [Àkójọ GitHub Zaino](https://github.com/zingolabs/zaino)
* [Àwọn ìfilọ́lẹ̀ Zaino](https://github.com/zingolabs/zaino/releases)
* [Àwọn ìwé tí Zaino ṣe jáde](https://zingolabs.github.io/zaino/)
* [Ibi ipamọ igbasilẹ Z3](https://github.com/ZcashFoundation/z3)
* [Àwọn ìwé tí wọ́n fi ń mọ̀ nípa Zebra](https://zebra.zfnd.org/)
* [Ètò ìtìlẹyìn Zaino àti àjíròrò lórí ètò náà](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

** Àtúnṣe ìkẹyìn:** August 2026
