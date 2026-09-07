<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Mwongozo kwa Running Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Kuendesha programu Zebra node juu ya Raspberry Pi 4 utapata kushiriki katika mtandao Zcash kama huru, makubaliano-sambamba Node. Mwongozo huu kutembea wewe kupitia hatua za kuanzisha na kukimbia Zebra kwenye yako RaspBerry Pi 4.

## Mahitaji ya awali

1. Raspberry Pi 4 (2GB RAM au juu ilipendekeza).

2. MicroSD kadi (16GB au zaidi ilipendekeza) na Raspberry Pi OS (Raspbian) imewekwa.

3. Kiunganishi imara internet.

4. Kibodi, panya na kiwambo (kwa ajili ya kuanzisha awali).

5. SSH mteja (hiari, kwa ajili ya upatikanaji wa mbali).

## Ufungaji

1. __ Sasisha Mfumo Wako__
   Fungua terminal au SSH katika yako Raspberry Pi na kuhakikisha mfumo wako ni hadi sasa kwa kuendesha:

   __ sudo apt update__

   __ sudo apt kuboresha__

2. __Install Utegemezi__
   Utahitaji kufunga baadhi ya dependencies muhimu kwa ajili ya kujenga na kuendesha Zebra:

   __sudo apt install kujenga-muhimu cmake git clang libssl-dev pkg-config__

3. __ Clone Zebra Repository__
   Fungua terminal na clone Zebra hazina kwa yako Raspberry Pi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   _cd zebra__

4. __Kujenga Zebra__
   Kujenga Zebra, kutumia amri zifuatazo:

   __ mzigo kujenga --release__

   Utaratibu huu unaweza kuchukua muda. Hakikisha kwamba yako Raspberry Pi ni kutosha baridi, kama kuunganisha inaweza kutoa joto.

5. __ Configuration__ (Usanidi)
   Kujenga faili ya Configuration kwa Zebra. Unaweza kutumia default config kama hatua ya kuanzia:

   __ cp zcash.conf.mfano wa zcash .conf__

   Hariri faili zcash.conf ili Customize mipangilio yako node ya. Unaweza kutaja mtandao, kuwezesha madini, kuanzisha uhusiano peer na zaidi.

6. __Kuanza Zebra__
   Sasa unaweza kuanza Zebra na Configuration yako desturi:

   __./target/release/zebrad -c zcash.conf__

   __ maoni ya kitanda__ 

   Amri hii itaanza node Zebra, na itakuwa kuanza kusawazisha kwa blockchain Zcash.

7. __Kufuatilia__
   Unaweza kufuatilia maendeleo na hali ya node yako Zebra kwa kufungua kivinjari cha mtandao na navigating to __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Kutatua matatizo

Kama kukutana na matatizo yoyote kwa kujenga au kuendesha Zebra, angalia [Nyaraka za Zebra](https://zebra.zfnd.org/user/troubleshooting.html) kwa vidokezo vya kutatua matatizo na taarifa za ziada.

Hakikisha kuweka Raspberry Pi yako baridi, kama kuendesha node inaweza kutoa joto. Unaweza kutaka kutumia ufumbuzi wa baridi ya, kama vile shabiki au sinki la joto .

## Matokeo ya Uchunguzi

Kwa kufuata mwongozo huu, unapaswa kuwa na mafanikio kuanzisha na kukimbia Zebra kwenye Raspberry Pi yako 4. sasa ni kuchangia mtandao Zcash kama node huru, kusaidia kupata faragha ya shughuli Zcash.
