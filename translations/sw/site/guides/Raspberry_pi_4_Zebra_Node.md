<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mwongozo wa Raspberry Pi 4 wa Kuendesha Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Kuendesha programu ya node ya Zebra kwenye Raspberry Pi 4 hukuruhusu kushiriki katika mtandao wa Zcash kama node huru inayooana na makubaliano [consensus]. Mwongozo huu utakuelekeza kupitia hatua za kusanidi na kuendesha Zebra kwenye Raspberry Pi 4 yako.

## Masharti ya Awali

1. Raspberry Pi 4 (RAM ya 2GB au zaidi inapendekezwa).

2. Kadi ya MicroSD (16GB au zaidi inapendekezwa) yenye Raspberry Pi OS (Raspbian) iliyosakinishwa.

3. Muunganisho thabiti wa intaneti.

4. Kibodi, kipanya, na kifuatiliaji (kwa usanidi wa awali).

5. Kiteja cha SSH (si lazima, kwa ufikiaji wa mbali).

## Usakinishaji

1. __Sasisha Mfumo Wako__
   Fungua terminali au unganisha kwa SSH kwenye Raspberry Pi yako, na uhakikishe kuwa mfumo wako umesasishwa kwa kuendesha:

   __sudo apt update__

   __sudo apt upgrade__

2. __Sakinisha Vitegemezi__
   Utahitaji kusakinisha vitegemezi muhimu vya kuunda na kuendesha Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Nakili Hazina ya Zebra__
   Fungua terminali na unakili hazina ya Zebra kwenye Raspberry Pi yako:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Unda Zebra__
   Ili kuunda Zebra, tumia amri zifuatazo:

   __cargo build --release__

   Mchakato huu unaweza kuchukua muda. Hakikisha Raspberry Pi yako imepozwa vya kutosha, kwa kuwa uundaji unaweza kuzalisha joto.

5. __Usanidi__
   Unda faili ya usanidi kwa ajili ya Zebra. Unaweza kutumia usanidi chaguomsingi kama mwanzo:

   __cp zcash.conf.example zcash.conf__

   Hariri faili ya zcash.conf ili kubinafsisha mipangilio ya node yako. Unaweza kubainisha mtandao, kuwezesha uchimbaji [mining], kusanidi miunganisho ya rika, na mengineyo.

6. __Anzisha Zebra__
   Sasa unaweza kuanzisha Zebra kwa usanidi wako maalum:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Amri hii itaanzisha node ya Zebra, nayo itaanza kusawazisha na blockchain ya Zcash.

7. __Ufuatiliaji__
   Unaweza kufuatilia maendeleo na hali ya node yako ya Zebra kwa kufungua kivinjari na kuelekea kwenye __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Utatuzi wa Matatizo

Ukikumbana na matatizo yoyote katika kuunda au kuendesha Zebra, angalia nyaraka za [Zebra](https://zebra.zfnd.org/user/troubleshooting.html) kwa vidokezo vya utatuzi wa matatizo na maelezo ya ziada.

Hakikisha Raspberry Pi yako inabaki katika hali ya ubaridi, kwa kuwa kuendesha node kunaweza kuzalisha joto. Unaweza kutaka kutumia suluhisho la kupoza, kama vile feni au kipozaji cha joto.

## Hitimisho

Kwa kufuata mwongozo huu, unapaswa kuwa umefanikiwa kusanidi na kuendesha Zebra kwenye Raspberry Pi 4 yako. Sasa unachangia mtandao wa Zcash kama node huru, ukisaidia kulinda faragha [privacy] ya miamala [transactions] ya Zcash.
