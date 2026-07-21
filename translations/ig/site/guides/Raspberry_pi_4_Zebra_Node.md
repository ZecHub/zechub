<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ntuziaka Raspberry Pi 4 maka ịgba ọsọ Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Running the Zebra node software on a Raspberry Pi 4 allows you to participate in the Zcash network as an independent, consensus-compatible node. This guide will walk you through the steps to set up and run Zebra on your Raspberry Pi 4.

## Ihe ndị a chọrọ

1. Raspberry Pi 4 (2GB RAM ma ọ bụ karịa na-atụ aro).

2. Kaadị MicroSD (16GB ma ọ bụ karịa na-atụ aro) na Raspberry Pi OS (Raspbian) arụnyere.

3. Njikọ Ịntanetị kwụsiri ike.

4. Igodo, òké, na ihe nlele (maka nhazi mbụ).

5. Onye ahịa SSH (nhọrọ, maka ohere dịpụrụ adịpụ).

## Ntinye

1. __ Melite Usoro Gị__
   Mepee ọnụ ma ọ bụ SSH n'ime Raspberry Pi gị ma hụ na usoro gị dị ọhụrụ site na ịgba ọsọ:

   __sudo apt melite__

   __sudo apt nwelite__

2. __Wụnye Dependencies__
   Ị ga-achọ ịwụnye ụfọdụ ihe ndị dị mkpa maka iwulite na ịgba ọsọ Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __ Idozi Ebe nchekwa Zebra__
   Mepee ọnụ ma kpoo ebe nchekwa Zebra na Raspberry Pi gị:

   __git mmepụta oyiri https://github.com/ZcashFoundation/zebra.git__

   _cd zebra__

4. __Wụpụta Zebra__
   Iji wuo Zebra, jiri iwu ndị a:

   __build --release__ ibu

   Usoro a nwere ike iwe oge. Jide n'aka na Raspberry Pi gị dị jụụ nke ọma, dịka ịhazi ya nwere ike ịmepụta okpomọkụ.

5. __Nhazi__
   Mepụta faịlụ nhazi maka Zebra. Ị nwere ike iji nhazi ndabara dị ka ebe mbido:

   __cp zcash.conf.ihe atụ zcash .conf__

   Dezie faịlụ zcash.conf iji hazie ntọala nke ọnụ gị. Ị nwere ike ịkọwa netwọk, mee ka igwu egwu, melite njikọ ndị ọgbọ, na ndị ọzọ.

6. __Kwado Zebra__
   Ị nwere ike ịmalite Zebra na nhazi omenala gị:

   __./target/release/zebrad -c zcash.conf__

   __nye nkọwa__ 

   Iwu a ga-amalite Zebra node, ọ ga-ebido imekọrịta ya na Zcash blockchain.

7. __Nlekota__
   You can monitor the progress and status of your Zebra node by opening a web browser and navigating to __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Nchọpụta nsogbu

If you encounter any issues with building or running Zebra, check the [Zebra documentation](https://doc.zebra.zfnd.org/docs/intro.html) maka ndụmọdụ nchọpụta nsogbu na ozi ndị ọzọ.

Jide n'aka na ị na-eme ka Raspberry Pi gị dị jụụ, dịka ịgba ọsọ nwere ike ịmepụta okpomọkụ. Ị nwere ike ịchọrọ iji ihe ngwọta jụrụ oyi, dị ka onye ofufe ma ọ bụ onye na-ekpo ọkụ.

## Mmechi

By following this guide, you should have successfully set up and run Zebra on your Raspberry Pi 4. You're now contributing to the Zcash network as an independent node, helping to secure the privacy of Zcash transactions.
