<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Atria Axɔ"/>
</a>

# Raspberry Pi 4 Ƒe Mɔfiame Na Zebra Ƒe Dudu

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Ne nàdzu Zebra ɣaɣla dzesi ŋɔŋlɔ [node] ƒe software le Raspberry Pi 4 dzi la, eana wò nàkpɔ gome le Zcash ƒe network me abe ɣaɣla dzesi ŋɔŋlɔ si le gbegbɔgblɔ ɖi [consensus] kple wo ene. Mɔfiame sia akplɔ wò to afɔwo me be nàɖo Zebra ɖe wò Raspberry Pi 4 dzi eye nàdzue.

## Nusiwo Hiã

1. Raspberry Pi 4 (2GB RAM alo nu si sɔ wu wo wòanye nyuie).

2. MicroSD card (16GB alo nu si sɔ wu wo wòanye nyuie) si wotsɔ Raspberry Pi OS (Raspbian) de eme.

3. Internet ƒe kadodo si le anyi.

4. Keyboard, mouse, kple monitor (na gɔmedzedze ƒe ɖoɖo).

5. SSH client (ne èdi be nàge ɖe eŋu tso didime).

## Dede Eme

1. __Trɔ Wò Ƒe Nɔnɔme Yiyi__
   Ʋu terminal alo ge ɖe wò Raspberry Pi ŋu to SSH dzi eye nàkpɔ be wò ƒe nɔnɔme le nyuie to esiawo ƒe dudu me:

   __sudo apt update__

   __sudo apt upgrade__

2. __De Nusiwo Hiã Eme__
   Ele be nàde nusiwo hiã na Zebra ƒe tutu kple dudu eme:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Wɔ Zebra ƒe Repository ƒe Kɔpi__
   Ʋu terminal eye nàwɔ Zebra ƒe repository ƒe kɔpi ɖe wò Raspberry Pi dzi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Tu Zebra__
   Be nàtu Zebra la, zã sededewo:

   __cargo build --release__

   Ƒomekɔkɔ sia ate ŋu axɔ ɣeyiɣi aɖe. Kpɔ be wò Raspberry Pi kɔ le nyuie, elabena compilation ate ŋu awɔ dzodzo.

5. __Ɖoɖo__
   Wɔ configuration file na Zebra. Àte ŋu azã default configuration abe gɔmedzeƒe ene:

   __cp zcash.conf.example zcash.conf__

   Trɔ asi le zcash.conf file ŋu be nàwɔ wò ɣaɣla dzesi ŋɔŋlɔ ƒe ɖoɖowo ɖe wò ŋutɔ ƒe lododo nu. Àte ŋu aɖo network, na nukuku [mining] nadze, ɖo peer ƒe kadodowo, kple bubuwo.

6. __Dze Zebra Dzi__
   Fifia àte ŋu adze Zebra dzi kple wò ɖoɖo si nèwɔ:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Sedede sia adze Zebra ɣaɣla dzesi ŋɔŋlɔ dzi, eye wòadze sync wɔwɔ kple Zcash ƒe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain].

7. __Kpɔe ɖa__
   Àte ŋu akpɔ wò Zebra ɣaɣla dzesi ŋɔŋlɔ ƒe ŋgɔyiyi kple nɔnɔme ɖa to web browser ƒe tutu kple yiyiyi ɖe __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Nusiwo Ɖe Mɔ

Ne nàdo go aɖe le Zebra ƒe tutu alo dudu me la, kpɔ [Zebra ƒe documentation](https://zebra.zfnd.org/user/troubleshooting.html) be nàkpɔ mɔfiamewo na fukpekpewo ɖɔɖɔ kple nyatakakawo bubu.

Kpɔ be wò Raspberry Pi le kɔkɔe, elabena ɣaɣla dzesi ŋɔŋlɔ ƒe dudu ate ŋu awɔ dzodzo. Àte ŋu adi be nàzã nu si wɔa kɔkɔe, abe fan alo heat sink ene.

## Nuŋɔŋlɔ

Ne nèdze mɔfiame sia yome la, ele be nèɖo Zebra ɖe wò Raspberry Pi 4 dzi eye nèdze eŋu le dzidzedze me. Fifia nèle kpekpeɖeŋu na Zcash ƒe network abe ɣaɣla dzesi ŋɔŋlɔ si le eɖokui ŋutɔ ene, le ɣaɣla [privacy] si le Zcash ƒe gaɖoɖowo [transactions] me ƒe dedie wɔm.
