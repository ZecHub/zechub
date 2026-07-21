<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Mwongozo kwa Running Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Kuendesha programu Zebra node juu ya Raspberry Pi 4 utapata kushiriki katika mtandao Zcash kama huru, makubaliano-sambamba node. Mwongozo huu kutembea wewe kupitia hatua za kuanzisha na kuendesha Zebra juu ya yako RaspBerry Pi 4.

## Mahitaji ya awali

1. Raspberry Pi 4 (2GB RAM au juu ilipendekeza).

2. MicroSD kadi (16GB au zaidi ilipendekeza) na Raspberry Pi OS (Raspbian) imewekwa.

3. Kuunganishwa kwa mtandao imara.

4. Kibodi, panya, na kufuatilia (kwa ajili ya kuanzisha awali).

5. SSH mteja (hiari, kwa ajili ya upatikanaji wa kijijini).

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

   Utaratibu huu unaweza kuchukua muda. Hakikisha kwamba yako Raspberry Pi ni kutosha baridi, kama kukusanya inaweza kuzalisha joto.

5. __ Configuration__
   Kujenga faili ya Configuration kwa Zebra. Unaweza kutumia default Config kama hatua ya kuanzia:

   __cp zcash.conf.mfano zcash .conf__

   Hariri faili zcash.conf ili Customize mipangilio yako node ya. Unaweza kutaja mtandao, kuwezesha madini, kuanzisha uhusiano peer, na zaidi.

6. __Kuanza Zebra__
   Sasa unaweza kuanza Zebra na Configuration yako desturi:

   __./target/release/zebrad -c zcash.conf__

   __gi maoni__ 

   Amri hii itaanza node Zebra, na itaanza kusawazisha na blockchain Zcash.

7. __Kufuatilia__
   Unaweza kufuatilia maendeleo na hali ya node yako Zebra kwa kufungua kivinjari cha mtandao na navigating kwa __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Kutatua matatizo

Kama wewe kukutana na matatizo yoyote na kujenga au kuendesha Zebra, angalia [Zebra nyaraka](https://doc.zebra.zfnd.org/docs/intro.html) kwa vidokezo vya kutatua matatizo na taarifa za ziada.

Hakikisha kuweka Raspberry Pi yako baridi, kama kuendesha node inaweza kuzalisha joto. Unaweza kutaka kutumia ufumbuzi baridi , kama vile shabiki au sinki joto.

## Matokeo

Kwa kufuata mwongozo huu, unapaswa kuwa na mafanikio ya kuanzisha na kuendesha Zebra kwenye Raspberry Pi yako 4. wewe ni sasa kuchangia mtandao Zcash kama node huru, kusaidia kupata faragha ya shughuli Zcash.
