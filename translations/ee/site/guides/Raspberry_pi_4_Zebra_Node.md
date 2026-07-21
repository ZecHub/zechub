<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Mɔfiame na Zebra Duƒuƒu

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Zebra node ƒe kɔmpiuta dɔwɔɖoɖoa zazã le Raspberry Pi 4 dzi na be nàte ŋu akpɔ gome le Zcash network la me abe node si le eɖokui si, si sɔ kple nukpɔsusu ɖeka ene. Mɔfiame sia akplɔ wò to atrakpui siwo dzi nàto aɖo Zebra ɖe wò Raspberry Pi 4 dzi ahawɔe.

## Nusiwo hiã do ŋgɔ

1. Raspberry Pi 4 (wokafu 2GB RAM alo esi wu nenema).

2. MicroSD kaɖi (wokafu 16GB alo esi wu nenema) si me woda Raspberry Pi OS (Raspbian) ɖe eme.

3. Internet ƒe kadodo si li ke.

4. Keyboard, mouse, kple monitor (hena ɖoɖo gbãtɔ).

5. SSH asitsaha (wò ŋutɔe tiae, na adzɔge ʋĩ ƒe mɔɖeɖe).

## Eɖoɖo ɖe dɔa me

1. __Trɔ Asi Le Wò Dɔwɔɖoɖoa Ŋu__ .
   Ʋu terminal alo SSH ɖe wò Raspberry Pi me eye nàkpɔ egbɔ be wò ɖoɖoa le yeye to ewɔwɔ me:

   __sudo apt ƒe yeyewɔwɔ__ .

   __sudo apt ƒe ŋgɔyiyi__ .

2. __De Dependencies__ .
   Ahiã be nàde nusiwo dzi woanɔ te ɖo siwo hiã dometɔ aɖewo ɖe Zebra tutu kple ewɔwɔ me:

   __sudo apt ɖo xɔtutu-vevietɔ cmake git clang libssl-dev pkg-ɖoɖo__

3. __Clone Zebra Nudzraɖoƒea__ .
   Ʋu terminal eye nàwɔ Zebra ƒe nudzraɖoƒea ƒe nɔnɔmetata ɖe wò Raspberry Pi ŋu:

   __git ƒe nɔnɔmetata https://github.com/ZcashFoundation/zebra.git__

   __cd sɔveda__ .

4. __Tu Zebra__ .
   Be nàtu Zebra la, zã sedede siwo gbɔna:

   __agba tutu --ɖe asi le__ .

   Dɔ sia wɔwɔ ate ŋu axɔ ɣeyiɣi aɖe. Kpɔ egbɔ be wò Raspberry Pi fa nyuie, elabena nuƒoƒoƒu ate ŋu ana dzoxɔxɔ nado.

5. __Ðoɖowɔwɔ__ .
   Wɔ ɖoɖowɔɖi ƒe faɛl na Zebra. Àte ŋu azã ɖoɖowɔɖi si woɖo ɖi la abe gɔmedzedze ene:

   __cp zcash.conf.kpɔɖeŋu zcash.conf__ .

   Trɔ asi le zcash.conf faɛl la ŋu be nàtrɔ asi le wò node ƒe ɖoɖowo ŋu. Àte ŋu agblɔ network la, ana tomenukuƒea nawɔ dɔ, aɖo hatiwo ƒe kadodowo, kple bubuwo.

6. __Dze Zebra gɔme__ .
   Fifia àteŋu adze Zebra gɔme kple wò ɖoɖowɔɖi tɔxɛ:

   __./taɖodzinu/ɖe asi le/zebrad -c zcash.conf__ .

   __git nyaŋuɖoɖo__ 

   Sedede sia adze Zebra node gɔme, eye wòadze egɔme awɔ ɖeka kple Zcash blockchain.

7. __Ŋkuléle ɖe ame ŋu__ .
   Àte ŋu alé ŋku ɖe wò Zebra node ƒe ŋgɔyiyi kple nɔnɔme ŋu ne èʋu web browser eye nèyi __ .http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Kuxiwo gbɔ kpɔkpɔ

Ne èdo go kuxi aɖewo le Zebra tutu alo ewɔwɔ me la, ke lé ŋku ɖe [Zebra ƒe nuŋlɔɖiwo ŋu](https://doc.zebra.zfnd.org/docs/intro.html) hena kuxiwo gbɔ kpɔkpɔ ŋuti aɖaŋuɖoɖowo kple nyatakaka bubuwo.

Kpɔ egbɔ be yena yeƒe Raspberry Pi fa, elabena node ƒe duƒuƒu ate ŋu ana dzoxɔxɔ nado. Àdi be yeazã fafamɔ̃, abe fesre alo dzoxɔxɔnamɔ̃ ene.

## Nyanuwuwuw

To mɔfiame sia dzi wɔwɔ me la, ele be nàɖo Zebra dzidzedzetɔe ahawɔe le wò Raspberry Pi 4. Fifia èle asi kpem ɖe Zcash network ŋu abe node si le eɖokui si ene, si le kpekpem ɖe Zcash ƒe asitsatsa ƒe adzamenyawo ta.
