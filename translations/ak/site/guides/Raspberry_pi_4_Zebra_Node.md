<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Guide for Running Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Zebra node software no a wode di dwuma wɔ Raspberry Pi 4 so no ma wo kwan ma wode wo ho hyɛ Zcash network no mu sɛ node a ɛde ne ho, a ɛne adwene hyia. Saa akwankyerɛ yi bɛkyerɛ wo wɔ anammɔn a wobɛfa so asiesie na woatu Zebra wɔ wo Raspberry Pi 4 no so.

## Nneɛma a ɛsɛ sɛ wodi kan yɛ

1. Raspberry Pi 4 (2GB RAM anaa nea ɛboro saa na wɔkamfo kyerɛ).

2. MicroSD kaad (wɔkamfo kyerɛ sɛ 16GB anaa nea ɛboro saa) a wɔde Raspberry Pi OS (Raspbian) ahyɛ mu.

3. Intanɛt nkitahodi a ɛyɛ den.

4. Keyboard, mouse, ne monitor (ma nhyehyɛe a edi kan).

5. SSH afɛfoɔ (wɔpɛ, ma akyirikyiri kwan).

## Installation a wɔde hyɛ mu

1. __Yɛ Wo System no Foforo__ .
   Bue terminal anaa SSH bi kɔ wo Raspberry Pi mu na hwɛ hu sɛ wo system no yɛ foforo denam run a wobɛma so:

   __sudo apt update__ .

   __sudo apt nkɔsoɔ__ .

2. __Instal Dependencies__ .
   Ɛho behia sɛ wo instɔl dependencies bi a ɛho hia ma Zebra a wobɛkyekye na wode ayɛ adwuma:

   __sudo apt instɔl dan-a ɛho hia cmake git clang libssl-dev pkg-config__ .

3. __Clone Zebra Adekorabea no__ .
   Bue terminal na clone Zebra repository no kɔ wo Raspberry Pi so:

   __git a wɔde yɛ clone https://github.com/ZcashFoundation/zebra.git__

   __cd ɔkraman__ .

4. __Build Zebra__
   Sɛ wopɛ sɛ wokyekye Zebra a, fa ahyɛde ahorow a edidi so yi di dwuma:

   __cargo kyekye --yi__ .

   Ebia saa adeyɛ yi begye bere kakra. Hwɛ sɛ wo Raspberry Pi no ayɛ nwini sɛnea ɛsɛ, efisɛ sɛ woboaboa ano a, ebetumi ama ɔhyew aba.

5. __Nhyehyɛe__ .
   Yɛ nhyehyeɛ fael ma Zebra. Wubetumi de nhyehyɛe a wɔahyɛ da ayɛ no adi dwuma sɛ mfiase:

   __cp zcash.conf.nhwɛso zcash.conf__ .

   Sesa zcash.conf fael no na woatumi ayɛ wo node nhyehyɛe no. Wubetumi akyerɛ ntwamutam no, ama mining no ayɛ adwuma, asiesie atipɛnfo nkitahodi, ne nea ɛkeka ho.

6. __Fi ase Zebra__ .
   Afei wobɛtumi de wo nhyehyeɛ a woahyɛ da ayɛ no ahyɛ Zebra ase:

   __./ botaeɛ/yi/zebrad -c zcash.conf__ .

   __git nsɛm a wɔka__ . 

   Saa ahyɛdeɛ yi bɛhyɛ Zebra node no ase, na ɛbɛhyɛ aseɛ ne Zcash blockchain no ayɛ synch.

7. __Nhwɛsoɔ__ .
   Wubetumi ahwɛ sɛnea wo Zebra node no rekɔ so ne ne tebea denam wɛb brawsa a wubebue na woakɔ __ so.http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Ɔhaw ahorow a wodi ho dwuma

Sɛ wuhyia nsɛm biara wɔ Zebra a wobɛkyekye anaa wode reyɛ adwuma no ho a, hwɛ [Zebra nkrataa](https://doc.zebra.zfnd.org/docs/intro.html) sɛ wopɛ ɔhaw ahorow ho afotu ne nsɛm foforo.

Hwɛ sɛ wobɛma wo Raspberry Pi no ayɛ nwini, efisɛ sɛ wode node tu mmirika a, ebetumi ama ɔhyew aba. Ebia wobɛpɛ sɛ wode aduru a ɛma onwini te sɛ fan anaa ɔhyew afiri di dwuma.

## Awie

Sɛ wodi akwankyerɛ yi akyi a, anka ɛsɛ sɛ wo hyehyɛ Zebra na wode di dwuma yie wɔ wo Raspberry Pi 4. Seesei woreboa Zcash ntwamutam no sɛ node a ɛde ne ho, a ɛboa ma Zcash nkitahodiɛ no kokoamsɛm bɔ ho ban.
