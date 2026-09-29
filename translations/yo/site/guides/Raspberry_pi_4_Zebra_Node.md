<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Itọsọna fun Ṣiṣẹ Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Ṣiṣiṣẹ software Zebra node lori Raspberry Pi 4 gba ọ laaye lati kopa ninu nẹtiwọọki Zcash bi ominira, asopọ-igbasilẹ ti o ni ibamu. Itọsọna yii yoo ṣe itọnisọna fun ọ nipasẹ awọn igbesẹ lati ṣeto ati ṣiṣe Zebra lori rẹ Rasipibiri Pi 4.

## Àwọn ohun tó yẹ kó wà nípò àkọ́kọ́

1. Raspberry Pi 4 (2GB RAM tabi ti o ga julọ ni a ṣe iṣeduro).

2. Kaadi MicroSD (16GB tabi ti o ga julọ ni a ṣe iṣeduro) pẹlu Raspberry Pi OS (Raspbian).

3. Ìsopọ̀ orí Íńtánẹ́ètì tó dúró sán-ún.

4. Àkọlé, eku àti àwòkẹ́kò́ó (fún ìmúrasílẹ̀ àkọ́kọ́).

5. SSH client (tí kò bá pọn dandan, fún ìléwọ̀n latọna jijin).

## Ìmúṣẹ ìtòlẹ́sẹẹsẹ náà

1. __Mú Ìtòlẹ́sẹẹsẹ Rẹ Di Òní__
   Ṣii ebute tabi SSH sinu Raspberry Pi rẹ ki o rii daju pe eto rẹ wa ni imudojuiwọn nipa ṣiṣe:

   __sudo apt ì§ ë¬ ̧ì í ê° ì 'ë ¤__

   __sudo apt ì í °ì 'ë¦¬__

2. __Fífi Àwọn Ohun Ìgbára lé Ṣiṣẹ́__
   O nilo lati fi sori ẹrọ diẹ ninu awọn igbẹkẹle pataki fun ikole ati ṣiṣe Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Ṣàdàpọ̀ Ibi Ìpamọ́ Zebra__
   Ṣii ebute kan ki o ṣe ẹda ibi ipamọ Zebra si Raspberry Pi rẹ:

   __git ìmúdàgba https://github.com/ZcashFoundation/zebra.git__

   Àwo n àwon òdòdó ìran-ìkookò.

4. _Ṣẹ́ Zebra__
   Láti ṣe Zebra, lo àwọn àṣẹ yìí:

   __ìkọ́lé ẹrù --òfò__

   Àtúnṣe yìí lè gba àkókò díẹ̀. Rii daju pé Raspberry Pi rẹ ti tutù dáadáa, nítorí kíkójọ le dá ooru sílẹ̀.

5. _Àṣètò__
   Ṣẹda faili iṣeto fun Zebra. O le lo iṣeto aiyipada bi ibi ibẹrẹ:

   __cp zcash.conf.àpẹẹrẹ zcash .conf__

   Ṣatunkọ faili zcash.conf lati ṣe adani awọn eto ti nodu rẹ O le ṣalaye nẹtiwọki, jẹ ki iwakusa ṣiṣẹ, ṣeto asopọ ẹlẹgbẹ ati diẹ sii.

6. Ẹ máa lọ Zebra.
   O le bẹrẹ Zebra pẹlu iṣeto aṣa rẹ:

   __./target/release/zebrad -c zcash.conf__

   __fi àlàyé sílẹ̀__ 

   Ìpínlẹ̀ yìí yóò bẹ̀rẹ̀ Zebra node, àti pé ó máa bẹ̀rè sí bá Zcash blockchain ṣepọ.

7. _Ìtójútó__
   O le ṣe atẹle ilọsiwaju ati ipo ti Zebra node rẹ nipa ṣiṣi aṣàwákiri wẹẹbu kan ki o lọ si __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Ìdáhùn àwọn ìṣòro náà

Ti o ba pade eyikeyi awọn iṣoro pẹlu kọ tabi ṣiṣe Zebra, ṣayẹwo awọn [Àwọn ìwé tí wọ́n fi ń mọ̀ nípa Zebra](https://zebra.zfnd.org/user/troubleshooting.html) fún àwọn àbá nípa bí o ṣe lè yanjú ìṣòro àti ìsọfúnni síwájú sí i.

Rii daju lati tọju rẹ Raspberry Pi tutu, bi ṣiṣe a node le ṣe ina. O le fẹ lati lo kan itutu ti o tutunini, gẹgẹbi afẹfẹ tabi ooru sink .

## Ìparí Ọ̀rọ̀

Nipa titẹle itọsọna yii, o yẹ ki o ti ṣaṣeyọri ati ṣiṣe Zebra lori Raspberry Pi rẹ 4. O n ṣe alabapin si Nọmba Zcash bayi bi igun ominira kan, iranlọwọ lati ni aabo asiri awọn iṣowo Zcash.
