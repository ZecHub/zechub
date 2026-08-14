<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Sikakorabea a Wɔsan Yɛ

**Dɛn nti na wode wo private key sie?**

Private keys ne ahintasɛm a ɛma wo dijitaal agyapade ahobammɔ. Wɔn a wɔbɛkora wɔn so na woremfa wɔn nkyerɛ nnipa foforo da no ho hia.

> Wɔ saa tebea yi mu no wobetumi ahu **Aba Kasasin** sɛ ɛne kokoam safoa yɛ pɛ.

Ɛdenam wo kokoam safe no so tumi a wobɛkɔ so akura mu so no, ɔkwan a wobɛfa so asan anya no betumi ayɛ yiye bere nyinaa. Zcash private keys ahodoɔ 2 na ɛwɔ hɔ (transparent na shielded), ɛnyɛ den sɛ wobɛtumi de akɔ wo wallet mu, sɛ ɛyɛ Sweep Funds dwumadie no a wode bedi dwuma anaasɛ wode bɛba sɛ account foforɔ. Ɛdenam wo kokoam safe a wobɛkɔ so adi so no so no, wokura w’agyapade so tumi koraa, na wohwɛ hu sɛ wowɔ wo dea, ahobammɔ ne asomdwoe wɔ w’adwene mu.

# Ahobammɔ ne Asɛyɛde

Ɛho hia sɛ wɔn a wɔde di dwuma no te asiane ahorow a ɛwɔ kokoam safe ho dwuma a wodi mu no ase na wɔbɔ saa nsafe yi ho ban na obiara amma ho kwan. Sika a ahobammɔ wom no gyina asɛyɛde a nea ɔde di dwuma no wɔ sɛ ɔbɔ wɔn kokoam safe ho ban so.

> **Ansa na wobɛhyɛ aseɛ:** recovery guides a wɔde kyerɛ Ywallet. Nea ɔyɛɛ no ​​no asi so dua sɛ wɔrennyɛ no foforo mma Ironwood (NU6.3) network upgrade no, enti entumi nni nkɔnsɔnkɔnsɔn no akyi bio. Fa **Zkool** di dwuma, a ɛyɛ developer koro no ara na ɛyɛ adedifo a wɔhwɛ so. Hwɛ [Wɔnhwɛ Ywallet so bio](#ywallet-is-no-longer-maintained) wɔ kratafa yi ase.

## Sika a Wɔsan Yɛ ne Zkool

[Zkool na ɔkyerɛwee](https://github.com/hhanh00/zkool2/releases) yɛ Ywallet adedifoɔ, a ɛfiri developer korɔ no ara mu, na ɛboa transparent ne shielded recovery nyinaa.

Wɔaka tebea abien ho asɛm wɔ ha:

1. **Akontaabuo a wobɛsan de aba** afiri aba kasasin, kokoam safoa, anaa hwɛ safoa mu
2. **Sweeping funds** fi sika kotoku a na ɛboa address ahorow a ɛda adi nkutoo da biara

### 1) Akontaabu bi a wɔbɛsan de aba

1. Fa Zkool hyɛ mu fi [yi kratafa no adi](https://github.com/hhanh00/zkool2/releases) na bue mu
2. Wɔ **Akontaabu sohwɛfo** (kratafa titiriw no) so no, pia **+** bɔtn no na du **Akontaabu Foforo** screen no so
3. Hyehyɛ **Akontaabu Din** na kyerɛ akonta yi
4. Dane **San Fa Akontaabu no Ba?**. Eyi da safe ne awo tenten mfuw adi
5. Fa wo safoa no hyɛ **Key (Seed Phrase, Private Key, anaa Viewing Key)** mu. Zkool gye aba kasasin, Sapling kokoam safoa, safoa a wɔatrɛw mu a ɛda adi pefee, anaa safe a wɔde hwɛ nneɛma tom
6. Hyehyɛ **Birth Height** sɛ wunim bɛyɛ bere a wodii kan de sika kotoku no dii dwuma a. Eyi kyerɛ Zkool baabi a ɛsɛ sɛ ofi ase scan, na ɛma ɛkora bere pii so

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> **No birth height?** Gyae no kwa na si kɔkɔbɔ no so dua. Zkool bɛ scan fi nkɔnsɔnkɔnsɔn no mfiase, a ɛyɛ brɛoo nanso ɛrempa biribiara. Sɛ wo sika no di Sapling upgrade a ɛbaa October 2018 anim a, gyaw no kwa sen sɛ wobɛsusu sɛ ɛbɛkɔ akyiri akyiri yi, anyɛ saa a scan no betumi ahuru wo nnwuma no koraa.

7. Fa akontaabu no sie, afei fa yɛ sync

### Aba bi a wɔsan de fi sika kotoku foforo mu ba

Sɛ aba no fi sika kotoku foforo mu na nea aka no hwɛ sɛ ɛnteɛ wɔ syncing akyi a, nsakrae address derivation no taa yɛ nea enti a ɛte saa.

Dane **Advanced Options** switch no, kɔ akyiri kɔ New Account screen koro no ara so, na dane **Use Internal Change** ansa na wode asie.

Ɛnyɛ sika kotoku nyinaa nnya nsakrae address wɔ ɔkwan koro so. ZODL aba bi a wobɛsan de aba Zkool mu a nhyehyeɛ yi nka ho no bɛtumi akyerɛ sɛ ɛkari pɛ a ɛyera wo nsakraeɛ nkrataa, a ɛte sɛ sika a ayera nanso ɛnte saa. Zkool adwinnade a ɔde ma switch no da so ara kyerɛ Zashi, a ɛno ne nea na wɔfrɛ ZODL kan no.

Mfuw abien foforo te **Advanced Options** ase:

- **Extra Passphrase (optional)**, sɛ mfitiase sika kotoku no de bi dii dwuma nkutoo a
- **Account Index**, sɛ mfitiase sika kotoku no kura akontaabu pii wɔ aba biako so a. Ebia sika no wɔ index soronko bi ase

> **Saa mmienu yi pue pɛnkoro pɛ bere a aba kasasin a ɛfata wɔ Key field no mu.** Sɛ afuw no da mpan, anaasɛ wokura kokoam anaa hwɛ safoa a, Zkool kyerɛ **Fa Internal Change** ne **H/W Ledger** kɛkɛ. Di kan fa aba no hyɛ mu, afei bue Advanced Options.

### 2) Sika a Wɔpopa Fi Sikakorabea a Ɛda Nneɛma Mu Nkutoo Mu

Sɛ wo sika wɔ sika kotoku a ɛnboaa address ahorow a wɔabɔ ho ban da (Trust, Coinomi, Guarda ne nea ɛtete saa) mu a, di kan san fa akontaabu no ba, afei fa sika no kɔ ɔtare a wɔabɔ ho ban no mu.

1. Fa anammɔn a ɛwɔ atifi hɔ no san fa akontaabu no ba
2. Bue akontaabu no na kɔ **Gye Sika** krataafa no so
3. Klik magnifying glass a ɛwɔ soro bar no so (**Hwehwɛ address afoforo a ɛda adi**). Sika kotoku a ɛkyinkyin address ahorow te sɛ Ledger ne Exodus no ma wonya address ahorow pii a ɛda adi pefee fi aba biako mu, na eyi hu wɔn a wokura sika
4. **Reset na sync account no akyi.** Address foforo a wɔahu no gye wɔn balances nkutoo wɔ scan a edi hɔ no mu, enti sɛ wohuw eyi a, ɛma ɛyɛ te sɛ nea sweep no anhu hwee
5. Kɔ **Send** krataafa no so. Bɛn balance no wubehu icon buttons abiɛsa. Wɔn nni nkyerɛwee nkyerɛwde biara, enti fa wo nsa hyɛ wo nsa anaa mia so tenten na wubehu wɔn din:
   - **Shield One** (kyɛm a wɔakyerɛkyerɛ mu) tu address biako a ɛda adi pefee bere koro mu
   - **Shield All** (solid shield) de biribiara fi address biara a ɛda adi pefee so prɛko pɛ
   - **Unshield All** (bue padlock) kɔ ɔkwan foforo so, kɔ address a ɛda adi mu

> **Shield One yɛ kokoam paw.** Address pii a wobɛbɔ ho ban wɔ asɛm biako mu no de bata ho wɔ baguam sɛ ɛyɛ onipa koro dea. Zkool bɔ kɔkɔ wɔ eyi ankasa ho ansa na watu mmirika Shield All.

6. Hwɛ asɛm no mu na fa mena

Unshield All ho wɔ mfaso bere a woretwe wo ho akɔ exchange a egye address a ɛda adi nkutoo nkutoo no. Sɛ akontaabu no wɔ address a wɔabɔ ho ban nkutoo a, shielding buttons no bɛda adi, na Unshield All no pue sɛ ɛwɔ nea ɛda adi nkutoo a.

## Sika a wɔsan nyae ne Ironwood ɔtare no

Efi bere a Ironwood (NU6.3) upgrade no yɛɛ adwuma wɔ 28 July 2026 no, Orchard pool no yɛ nea wɔsɛe no nkutoo. Botae foforo biara ntumi nkɔ mu, na bo a ɛwɔ hɔ dedaw no fa turnstile no mu kɔ Ironwood.

Sɛ wo sika a woasan anya no wɔ Orchard a, ɛho behia sɛ wotu kɔtra mmeae foforo ansa na wɔayɛ wɔn ade sɛnea ɛsɛ. Bue akontaabu menu no na paw **Hyɛ no nsow sɛ wotu kɔ baabi foforo**. Option no da adi bere a biribi wɔ hɔ ankasa a ɛsɛ sɛ wotu kɔ baabi foforo nkutoo.

Wɔato screen no din **Orchard to Ironwood Migration** na ɛkɔ so wɔ akwan abien so. Nea edi kan no ɛkyekyɛ nkyerɛwde a ɛnyɛ nea wɔahyɛ da ayɛ mu ma ɛyɛ asɔre ahorow a wɔahyɛ da ayɛ, afei ɛde saa nkyerɛwde no tu mmiako mmiako. **Migration Speed** yɛ slider a ɛfiri Ultra Fast kɔ Slow a ɛde random delay a ɛda anammɔn ntam no si hɔ. **Start Migration** yɛ staged process no wɔ akyi, na wobɛtumi ato krataafa no mu na woasan ahyɛ aseɛ akyiri yi. **One Shot** yɛ no wɔ pass biako mu.

Anamɔn biara yɛ n’ankasa asɛm, enti emu biara tua ka.

> **Migration amounts are public.** Sɛ botae no twa turnstile no a, dodow no ne block no sorokɔ da adi wɔ nkɔnsɔnkɔnsɔn so, ɛwom mpo sɛ nea ɔde kɔma ne nea ogye no tra hɔ a wɔabɔ wɔn ho ban de. Dodow soronko betumi akyerɛ wo, enti pɛ staged migration wɔ ahoɔhare a ɛyɛ brɛoo sen shot biako, na susuw ho sɛ wobɛfa Tor anaa VPN so kan na wo IP address no ne dodow a woatu no nni abusuabɔ.

## Deep Recovery ne ZExCavator

[ZExCavator na ɛyɛ adwuma](https://github.com/zingolabs/zexcavator) yɛ adwinnade a wɔde san nya fi Zingo Labs ma nsɛm a sanba a ɛyɛ daa no ntumi nyɛ adwuma, te sɛ sika kotoku fael a asɛe anaa ne fã bi.

> Ne update a etwa to no di nnansa yi network upgrades no anim, enti fa no sɛ ɔkwan a etwa to na hwɛ sɛ safe biara a wɔasan anya wɔ wallet a wɔahwɛ so no mu ansa na wode wo ho ato nea ebefi mu aba no so.

## Wɔnhwɛ Ywallet so bio

Na Ywallet yɛ adwinnade a wɔkamfo kyerɛe sɛ wɔmfa nnya ahoɔden bio wɔ kratafa yi so bere tenten, na akwankyerɛfo dedaw pii da so ara twe adwene si so.

Nea ɔyɛɛ no ​​no asi so dua sɛ wɔrennyɛ no foforo mma Ironwood. Sika kotoku a ɛnfoa mprempren mmara a wɔpene so no ntumi nsi nnwuma a ɛfata, enti wontumi mfa nni dwuma bio mfa nkɔfa sika a wɔasan anya no nkɔ baabi foforo. **Zkool**, a ɔdebɔfoɔ korɔ no ara na ɔyɛeɛ, ne nea wɔahwɛ so a ɛdi akyire na ɛyɛ deɛ krataafa yi de di dwuma seesei.

Sɛ wowɔ sika a ɛte Ywallet dedaw a, san fa aba kasasin koro no ara kɔ Zkool mu denam anammɔn a ɛwɔ atifi hɔ no so.

## Nkratafa a ɛfa ho

- [Sika kotoku](/using-zcash/wallets) - a wode sika kotokuo a wodi so ne won Ironwood ahoboa
- [Dade dua](/zcash-tech/ironwood) - dee upgrade no sesae ne nea enti a sika tu tu
- [Memos a wɔde kyerɛw nsɛm](/using-zcash/memos) - sedee encrypted memos y adwuma
- [Nneɛma a Wɔde Hwɛ](/zcash-tech/viewing-keys) - akenkan nkoaa kwan a wonnye tumi
