<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Itọsọna fun Ṣiṣẹ Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Ṣiṣẹ sọfitiwia akopọ Zebra lori Raspberry Pi 4 gba ọ laaye lati kopa ninu nẹtiwọọki Zcash bi ominira, akopọ ti o ni ibamu pẹlu ifọkanbalẹ. Itọsọna yii yoo ṣe itọsọna fun ọ nipasẹ awọn igbesẹ lati ṣeto ati ṣiṣe Zebra sori RaspBerry Pi 4 rẹ.

## Àwọn ohun tó pọn dandan

1. Raspberry Pi 4 (2GB RAM tabi ti o ga julọ ni a ṣe iṣeduro).

2. Kaadi MicroSD (16GB tabi ti o ga julọ ti a ṣe iṣeduro) pẹlu Raspberry Pi OS (Raspbian) ti a fi sori ẹrọ.

3. Asopọ intanẹẹti iduroṣinṣin.

4. Keyboard, eku, ati ibojuwo (fun iṣeto akọkọ).

5. SSH oníṣe (tí kò bá pọn dandan, fún ìléwọ̀n latọna jijin).

## Iṣẹ́-ṣiṣe

1. __Mú Ìtòlẹ́sẹẹsẹ Rẹ Di Òní__
   Ṣii ebute tabi SSH sinu Raspberry Pi rẹ ki o rii daju pe eto rẹ wa ni imudojuiwọn nipa ṣiṣe:

   __sudo apt àtúnṣe__

   __sudo apt ì í ì 'í ̧ì ë ¤__

2. __Fífi Àwọn Ohun-èlò Ṣiṣẹ́__
   Iwọ yoo nilo lati fi sori ẹrọ diẹ ninu awọn igbẹkẹle pataki fun ikole ati ṣiṣe Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Àdàkọ Àpamọ́ Zebra__
   Ṣii ebute kan ki o ṣe ẹda ibi ipamọ Zebra si Raspberry Pi rẹ:

   Àdàkọ __git https://github.com/ZcashFoundation/zebra.git__

   _cd zebra__

4. Ẹ kọ́ Zebra
   Lati kọ Zebra, lo awọn aṣẹ wọnyi:

   _ìkó ẹrù jọ --òfò__

   Ìgbésẹ̀ yìí lè gba àkókò díẹ̀. Rí i dájú pé Raspberry Pi rẹ ti tutù dáadáa, nítorí kíkójọ lè dá ooru sílẹ̀.

5. __Àṣètò__
   Ṣẹda faili iṣeto fun Zebra. O le lo iṣeto aiyipada bi ibi ibẹrẹ:

   __cp zcash.conf.àpẹẹrẹ zcash .conf__

   Ṣatunkọ faili zcash.conf lati ṣe adani awọn eto node rẹ. O le ṣalaye nẹtiwọọki, mu iwakusa ṣiṣẹ, ṣeto awọn asopọ ẹlẹgbẹ, ati diẹ sii.

6. Ẹ gbé Zebra lọ.
   O le bẹrẹ Zebra pẹlu iṣeto aṣa rẹ:

   __./target/release/zebrad -c zcash.conf__

   __fi àlàyé sílẹ̀__ 

   Àṣẹ yìí ni yóò bẹ̀rẹ̀ Zebra node, tí yóò sì máa bá Zcash blockchain ṣiṣẹ́.

7. __Ìtójútó__
   O le ṣe atẹle ilọsiwaju ati ipo ti Zebra node rẹ nipa ṣiṣi aṣàwákiri wẹẹbu kan ati lilọ kiri si __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Àtúnṣe àṣìṣe

Ti o ba pade eyikeyi awọn iṣoro pẹlu kọ tabi ṣiṣe Zebra, ṣayẹwo awọn [Zebra iwe aṣẹ](https://doc.zebra.zfnd.org/docs/intro.html) fún àwọn àbá nípa bí o ṣe lè yanjú ìṣòro àti ìsọfúnni síwájú sí i.

Rii daju lati tọju rẹ Raspberry Pi tutu, bi ṣiṣe a node le gbe ooru. O le fẹ lati lo a itutu itutu, gẹgẹ bi a afẹfẹ tabi kan ooru sink.

## Ìparí

Nipa titẹle itọsọna yii, o yẹ ki o ti ṣaṣeyọri ṣeto ati ṣiṣe Zebra lori Raspberry Pi rẹ 4. O n ṣe alabapin si nẹtiwọọki Zcash bayi bi igun ominira kan, iranlọwọ lati ni aabo asiri ti awọn iṣowo Zcash.
