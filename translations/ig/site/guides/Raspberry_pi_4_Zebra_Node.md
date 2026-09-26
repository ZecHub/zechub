<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4 Nduzi maka Ịgba ọsọ Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Ịgba ọsọ ngwanrọ Zebra na Raspberry Pi 4 ga-enye gị ohere isonye n'ime netwọk Zcash dịka nnwere onwe, nkwekọrịta kwekọrọ ekwekọ. Ntuziaka a ga - eduga gị site na usoro iji melite ma gbaa Zebra gị na Rasbberị Pi 4.

## Ihe ndị a chọrọ iji mee ya bụ:

1. Raspberry Pi 4 (2GB RAM ma ọ bụ karịa na-atụ aro).

2. Kaadị MicroSD (16GB ma ọ bụ karịa na-atụ aro) ya na Raspberry Pi OS (Raspbian).

3. Njikọ Ịntanetị kwụsiri ike.

4. Igodo, òké na ihe nlele (maka nhazi mbụ).

5. Onye ahịa SSH (nhọrọ, maka ịnweta ohere).

## Ịwụnye ya

1. __ Melite Usoro Gị__
   Mepee ọnụ ma ọ bụ SSH n'ime Raspberry Pi gị wee hụ na usoro gị dị ọhụrụ site na ịgba ọsọ:

   __sudo apt update__ (ọ dị mma maka mmelite)

   __sudo apt upgrade__

2. __Wụnye Dependencies__
   Ị ga-achọ ịwụnye ụfọdụ ihe ndị dị mkpa maka iwulite na ịgba ọsọ Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __ Idozi Ebe nchekwa Zebra__
   Mepee ọnụ ma mepụta Zebra nchekwa na Raspberry Pi gị:

   __git clone (Otu ụdị) https://github.com/ZcashFoundation/zebra.git__

   _cd zebra__

4. __Wụpụta Zebra__
   Iji wuo Zebra, jiri iwu ndị a:

   __build --release__ ibu arọ

   Usoro a nwere ike iwe oge. Jide n'aka na Raspberry Pi gị dị jụụ nke ọma, dịka ịhazi ya nwere ike ịmepụta okpomọkụ.

5. __Nhazi__
   Mepụta faịlụ nhazi maka Zebra. Ị nwere ike iji ntọala ndabara dị ka ebe mbido:

   __cp zcash.conf.ihe atụ zcash .conf__

   Dezie faịlụ zcash.conf iji hazie ntọala nke ọnụ gị, ị nwere ike ịkọwa netwọkụ ahụ, mee ka igwu egwu, melite njikọ ndị ọgbọ na ihe ndị ọzọ.

6. __Kpọtụrụ Zebra__.
   Ị nwere ike ugbu a malite Zebra na nhazi omenala gị:

   __./target/release/zebrad -c zcash.conf__ (n'asụsụ Bekee)

   __gị kwuo okwu__ 

   Iwu a ga-amalite Zebra node, ọ ga-ebido imekọrịta na Zcash blockchain.

7. __Ilekọta__
   Ị nwere ike nyochaa ọganihu na ọnọdụ nke Zebra node gị site na imeghe ihe nchọgharị weebụ ma ịnyagharịa gaa __ .http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Nchọpụta nsogbu

Ọ bụrụ na ị hụ nsogbu ọ bụla n'ịmepụta maọbụ ịgba ọsọ Zebra, lelee ihe ndị a: [Akwụkwọ Zebra](https://zebra.zfnd.org/user/troubleshooting.html) maka ndụmọdụ nsogbu na ozi ndị ọzọ.

Jide n'aka na ị ga-eme ka Raspberry Pi gị dị jụụ, dịka ịgba ọsọ nwere ike ịmepụta okpomọkụ. Ị nwere ike ịchọrọ iji ihe ngwọta jụrụ oyi, dịka onye ofufe ma ọ bụ ikpo ọkụ.

## Ihe Ndị A Na-ekwu na Ya

By following this guide, you should have successfully set up and run Zebra on your Raspberry Pi 4. You're now contributing to the Zcash network as an independent node, helping to secure the privacy of Zcash transactions.
