<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nduzi Raspberry Pi 4 Maka Ịgba Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Ịgba sọftụwia node [node] nke Zebra na Raspberry Pi 4 na-enye gị ohere isonye na netwọk Zcash dịka node nọọrọ onwe ya, nke dakọtara na consensus [consensus]. Nduzi a ga-akọwara gị usoro iji hazie ma gbaa Zebra na Raspberry Pi 4 gị.

## Ihe Achọrọ Tupu Ebidoro

1. Raspberry Pi 4 (a na-atụ aro 2GB RAM ma ọ bụ karịa).

2. Kaadị MicroSD (a na-atụ aro 16GB ma ọ bụ karịa) nke arụnyere Raspberry Pi OS (Raspbian).

3. Njikọ ịntanetị kwụsiri ike.

4. Kiibọdụ, òké, na ihuenyo (maka nhazi mbụ).

5. Onye ahịa SSH (nhọrọ, maka ịnweta ya n'ebe dị anya).

## Ntinye

1. __Melite Sistemụ Gị__
   Mepee terminal ma ọ bụ jiri SSH banye na Raspberry Pi gị, ma hụ na sistemụ gị dị ọhụrụ site n'ịgba:

   __sudo apt update__

   __sudo apt upgrade__

2. __Wụnye Ihe Ndabere__
   Ị ga-achọ ịwụnye ụfọdụ ihe ndabere dị mkpa iji wuo ma gbaa Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Kpoo Ebe Nchekwa Zebra__
   Mepee terminal ma kpoghee ebe nchekwa Zebra na Raspberry Pi gị:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Wuo Zebra__
   Iji wuo Zebra, jiri iwu ndị a:

   __cargo build --release__

   Usoro a nwere ike iwe oge. Gbaa mbọ hụ na Raspberry Pi gị jụrụ oyi nke ọma, n'ihi na ịchịkọta koodu nwere ike ịmepụta okpomọkụ.

5. __Nhazi__
   Mepụta faịlụ nhazi maka Zebra. Ị nwere ike iji nhazi ndabara dị ka ebe mmalite:

   __cp zcash.conf.example zcash.conf__

   Dezie faịlụ zcash.conf iji hazie ntọala node gị. Ị nwere ike ịkọwapụta netwọk, mee ka ịgwụputa [mining] rụọ ọrụ, hazie njikọ ndị ọgbọ, na ihe ndị ọzọ.

6. __Bido Zebra__
   Ị nwere ike ugbu a ibido Zebra site na nhazi ahaziri gị:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Iwu a ga-ebido node Zebra, ọ ga-amalite ịmekọrịta na blockchain [blockchain] Zcash.

7. __Nlekota__
   Ị nwere ike ileba anya n'ọganihu na ọnọdụ node Zebra gị site n'imepe ihe nchọgharị weebụ gaa na __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Ịchọpụta Nsogbu

Ọ bụrụ na ị zutere nsogbu ọ bụla mgbe ị na-ewu ma ọ bụ na-agba Zebra, lelee akwụkwọ [Zebra](https://zebra.zfnd.org/user/troubleshooting.html) maka ndụmọdụ ịchọpụta nsogbu na ozi ndị ọzọ.

Hụ na Raspberry Pi gị na-adị jụụ, n'ihi na ịgba node nwere ike ịmepụta okpomọkụ. Ị nwere ike ịchọ iji ihe ngwọta ime ka ọ jụọ oyi, dịka fan ma ọ bụ heat sink.

## Mmechi

Site n'ịgbaso nduzi a, ị gaara ahazie ma gbaa Zebra nke ọma na Raspberry Pi 4 gị. Ugbu a ị na-atụnye aka na netwọk Zcash dịka node nọọrọ onwe ya, na-enyere aka ichekwa Nzuzo [privacy] nke Azụmahia [transaction] Zcash.
