<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Ɛmo a wɔde yɛ Sync

## TL;DR

* Pepper Sync yɛ synchronization engine a wɔde aba Zingo mu! 2.0, Zcash sika kotoku a wɔabue ano a Zingo Labs ayɛ.
* Ɛde non-linear synchronization di dwuma sen sɛ ɛbɛhwehwɛ nkɔnsɔnkɔnsɔn no mu wɔ asinasin akɛse a ɛtoatoa so, enti wo sika a aka ne nkitahodi ahorow no da adi ntɛm koraa.
* Wɔkora nkɔso so bere nyinaa. Sɛ nkitahodi no gyae anaasɛ app no ​​to mu a, syncing no san fi ase fi baabi a egyinae sen sɛ ɛbɛsan afi ase bio.
* Wubetumi asɛe sika ansa na synchronization no awie.
* Nkitahodi a wɔabɔ ho ban no da so ara yɛ kokoam wɔ adeyɛ no nyinaa mu.

## Nkyerɛkyerɛmu Titiriw

Zingo 2.0 yɛ Zingo no fã a aba foforo! wallet, sika kotoku a emu yɛ hare, a wɔabue ano a wɔasi ama Zcash mpɔtam hɔfo. Nsoromma a ɛwɔ saa yi a wɔayi no adi yi mu ne Pepper Sync, nkɔso kɛse a ɛsan susuw sɛnea sika kotoku ne blockchain no di nkitaho no ho koraa.

Bere bi a atwam no, na syncing betumi ate nka sɛ ɛyɛ brɛoo wɔ ɔkwan a ɛyɛ yaw so, ɛyɛ nea mfomso taa yɛ, na ɛyɛ nea ɛho hia kɛse, na ɛtɔ mmere bi a ɛhyɛ wɔn a wɔde di dwuma no ma wɔsan fi ase fi mfiase. Pepper Sync sesa saa nneɛma no nyinaa. Ɛma syncing yɛ ntɛmntɛm, ɛyɛ mmerɛw, wotumi de ho to so, na ɛnyɛ den pii wɔ wo device no so, bere a ɛkora kokoam nsɛm a wɔabɔ ho ban no so koraa.

Sɛ́ ebia woyɛ ɔdefo foforo koraa a woresɔ Zcash ahwɛ nea edi kan, anaasɛ mpɔtam hɔni a wode bere tenten ahwɛ sika kotoku pii a wɔabɔ ho ban so no, Pepper Sync ma osuahu no yɛ nea mfaso wɔ so na ɛyɛ anigye kɛse.

### Nneɛma atitiriw a ɛwɔ Pepper Sync mu

Pepper Sync de nkɔso pii ba:

- Much Faster Syncing - Wo sika kotoku no ayɛ krado wɔ simma kakraa bi mu, ɛnyɛ nnɔnhwerew kakraa bi mu.
- Smart Updates - Wɔyɛ data ho adwuma wɔ nketenkete mu, kwati rescans a edi mũ.
- Resilient to Interruptions - Sɛ wo nkitahodi no kɔ fam a, syncing san fi ase wɔ baabi a egyaee no.
- Lightweight & Efficient - Wɔayɛ no yiye ama fon, laptop, ne mfiri afoforo a ahoɔden sua.
- Clearer Feedback - Bere ankasa mu nkɔso foforo brɛ adwene mu naayɛ ase.
- Privacy-Preserving - Nkitahodi a wɔabɔ ho ban no kɔ so yɛ kokoam wɔ adeyɛ no nyinaa mu.

### Dɛn na eye sen kan no

Zingo dedaw no taa ma wɔn a wɔde di dwuma no abam bu denam bere tenten a wɔde yɛ synch, mfomso a wɔde di dwuma a emu nna hɔ, ne nneɛma a wɔde di dwuma kɛse so. Pepper Sync siesie nsɛm a ɛtaa ba yi:

| Feature a ɛwɔ | Zingo Nkyerɛase ahorow a atwam | Zingo 2.0 ne Ɛmo Sync |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Sync Ahoɔhare | Slower, titiriw wɔ nhyehyɛe a edi kan | Pii ntɛmntɛm mfiase ne kɔ so sync |
| Mfomso a Wɔde Di Dwuma | Bere ne bere mu stalls ne huammɔdi a emu nna hɔ | Ntu mpɔn a ɛma wotumi gyina pintinn a automatic recovery |
| Osuahu a Wɔde Di Dwuma | Sync tee nka sɛ "opaque" ma wɔn a wɔaba foforo | Transparent, a ɛwɔ tebea ne updates a emu da hɔ |
| Mfiri no Adwumayɛ | CPU/memory dwumadie a ɛkorɔn | Wɔayɛ no yiye ama nneɛma a wɔde di dwuma yiye |

Ne tiawa mu no: seesei syncing yɛ ntɛmntɛm, wotumi de ho to so, na ɛnyɛ den sɛ wobɛte ase.

## Aniwa so / Nsɛso

Susuw wallet sync dedaw bi te sɛ nhoma tenten paa a wobɛkenkan afi kratafa biako, denden, ansa na wɔama wo kwan ma woaka ho asɛm biara. Gyina fã, na wufi ase bio fi kratafa a edi kan. Pepper Sync kenkan nhoma koro no ara, nanso ɛkora nhoma agyiraehyɛde so, ɛkenkan ti ahorow a ɛho hia wo no kan, na ɛma woka asɛm no ho asɛm ansa na woawie kratafa a etwa to no.

Bookmark no ne ɔfã a ɛho hia. Nkyerɛase biara a atwam no buu sync a wɔatwa mu sɛ adwuma a wɔasɛe no; Pepper Sync di ho dwuma sɛ home a wɔde gyina hɔ.

### Akwankyerɛ ahorow a wɔde aniwa hu

- Detailed Flow - Kyerɛ adeyɛ no nyinaa. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Simplified Flow - Ntɛmntɛm hwɛ ma wɔn a wɔde di dwuma da biara da. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Deep Dive a Wɔde Nsu Gu Mu

### Sɛnea Pepper Sync yɛ adwuma (hwɛ a ɛnyɛ den) .

Sɛ́ anka Pepper Sync bɛsan ahwehwɛ blockchain no mu asinasin akɛse a ɛyɛ mmerɛw no, ɛyɛ adwuma wɔ anammɔn nketenkete a wotumi di ho dwuma mu —bere nyinaa ɛkora wo beae bere a ɛkɔ so no.

1. Connect - Wallet hwɛ mu wɔ network no mu.
2. Fetch Blocks - Wɔtwe data no nkakrankakra.
3. Verify - Nkitahodi no agye atom.
4. Handle Shielded Notes - Wɔakora kokoam nsɛm so bere nyinaa.
5. Update Balances - Wallet no yɛ foforo yiye.
6. Save Progress - Gyina na ɛsan fi ase a ɛnyɛ den.
7. Finish - Wallet ayɛ krado sɛ wobɛdi ho dwuma.

## Nkyerɛkyerɛmu a mfaso wɔ so

### Henanom na wonya Pepper Sync so mfaso?

- Wɔn a Wɔde Di Dwuma Foforo - Wobetumi asiesie sika kotoku ntɛmntɛm a wɔremma wɔn abam mmu esiane sɛ wɔkyɛ nti.
- Dabiara a Wɔde Di Dwuma - Syncing a wotumi de ho to so ma shielded payments yɛ nea mfaso wɔ so ma da biara da dwumadie.
- Developers & Testers - Sync mmerɛ tiawa kyerɛ sɛ sɔhwɛ kyinhyia yɛ ntɛmntɛm.
- Mobile & Light Devices - Zingo seesei ɛyɛ adwuma yie mpo wɔ hardware a ɛwɔ nneɛma kakraa bi so.

### Nea enti a ɛho hia ma Zcash

Wɔakyekye Zcash atwa shielded transactions ho ahyia, kokoamsɛm nnwinnade a tumi wom sen biara wɔ cryptocurrency mu no mu biako. Nanso sɛ wotumi nya kokoam nsɛm nkutoo a, mfaso wɔ so.

Pepper Sync boa denam:

- Akwanside ahorow a ɛmma wontumi nkɔ mu no ase - Wɔn a wɔde di dwuma foforo betumi afi ase ntɛmntɛm.
- Da biara da dwumadie a wɔboa - Address a wɔabɔ ho ban no bɛyɛ mmerɛw sɛ wobɛgye adi.
- Ecosystem nkɔsoɔ a wɔhyɛ ho nkuran - Sika kotokuo mu suahunu a ɛyɛ papa ma wɔgye tom, apps, ne dwumadie pii.

Ɛdenam sika kotoku mu osuahu a ɛma tu mpɔn so no, Pepper Sync hyɛ Zcash abɔde a nkwa wom nhyehyɛe no nyinaa mu den.

### Sɛnea wobɛhyɛ aseɛ: onboarding ne Zingo 2.0

1. Twe Wallet no - Nya nea ɛfata fi [Zingo GitHub yi krataafa no adi](https://github.com/zingolabs/zingolib)
2. Set Up Your Wallet - Yɛ foforo anaa san fa fi aba kasasin a ɛwɔ hɔ dedaw mu. [Zingo 2.0 a ɛwɔ Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Ma Pepper Sync Run - Hwɛ nkɔsoɔ nsɛnkyerɛnneɛ berɛ a wo sika kotokuo no reyɛ foforɔ. [Pepper Sync Mmirikatu](https://x.com/ZingoLabs/status/1961871338441724191)
4. Fi ase Fa Zcash Di Dwuma - Soma na gye ZEC a wɔabɔ ho ban bere a syncing no awie ara pɛ.
5. Relax About Interruptions - Sɛ app no ​​to mu anaasɛ nkitahodi no gyae a, Pepper Sync san fi ase ankasa.

## Mfomso a Ɛtaa Tu

**Pepper Sync a wɔde bedi dwuma sɛ sika kotoku wɔ n'ankasa mu**. Pepper Sync yɛ synchronization engine a ɛwɔ Zingo no mu! sika kotoku, ɛnyɛ application a ɛyɛ soronko. Wode Zingo ahyɛ mu; Pepper Sync ne nea ɛkɔ n’ase.

**Sɛ yɛfa no sɛ syncing ntɛmntɛm kyerɛ sɛ kokoamsɛm yɛ mmerɛw**. Ahoɔhare no fi sɛnea wɔfa block data, hyehyɛ, na wɔde sie, na ɛnyɛ sɛ wɔda nsɛm pii adi. Nkitahodi a wɔabɔ ho ban no tra kokoam wɔ bere nyinaa mu.

**Fa no sɛ ɛsɛ sɛ woyɛ sync koraa ansa na woatumi asɛe sika**. Sika a wɔsɛe no ansa na synchronization no awie no yɛ Pepper Sync asɛmti no mu biako, enti ɛnsɛ sɛ wotwɛn ma sika kotoku no du nkɔnsɔnkɔnsɔn no ano.

## FAQ - Nsɛmmisa a wɔtaa bisa

**Q: So ɛsɛ sɛ mesan scan bere biara a mɛbue sika kotoku no?**

A: Dabi Pepper Sync sie nkɔso, enti wo update fi beae a etwa to no nkutoo.

**Asɛmmisa: Sɛ me intanɛt twa a, dɛn na ɛba?**

A: Sync no gyina kakra na ɛtoa so akyiri yi a ɛnsan mfi ase bio.

**Asɛmmisa: So me kokoam nsɛm yɛ ahobammɔ bere a mereyɛ synch?**

A: Yiw. Nkitahodi a wɔabɔ ho ban no da so ara yɛ kokoam de koraa.

**Q: Bere tenten ahe na sync a edi kan no gye?**

A: Mpɛn pii no simma mmom sen nnɔnhwerew, a egyina wo mfiri ne intanɛt so.

**Asɛmmisa: So metumi de sika kotoku no adi dwuma ansa na syncing no awie?**

A: Yiw. Pepper Sync boa sika a wɔsɛe no ansa na synchronization no awie, enti enhia sɛ wotwɛn ma sika kotoku no du nkɔnsɔnkɔnsɔn no ano.

## Awie

Zingo 2.0 Pepper Sync nti, syncing nyɛ ɛyaw kɛse a ɛwɔ sika kotoku a wɔabɔ ho ban mu bio. Mprempren ɛyɛ ntɛmntɛm, ɛyɛ den, na ɛyɛ mmerɛw sɛ wɔde bedi dwuma, na ɛma akwanside a ɛwɔ hɔ ma wɔn a wɔaba foforo no so tew na ɛma da biara da dwumadie no yɛ nea mfasoɔ wɔ so koraa.

Wɔ wɔn a wɔde di dwuma fam no, ɛkyerɛ sɛ wɔrentwɛn pii na wɔde kokoam nsɛm pii bɛto hɔ. Wɔ developers fam no, ɛkyerɛ fapem a ɛyɛ den a ɛsɛ sɛ wɔde si so. Wɔ Zcash abɔdeɛ a nkwa wom nhyehyɛeɛ no fam no, ɛyɛ anammɔn foforɔ a ɛbɛma obiara anya nkitahodie a wɔabɔ ho ban.

Zingo 2.0 a ɛwɔ Pepper Sync no nyɛ nkɔsoɔ kɛkɛ; ɛyɛ ahurututu a ɛkɔ anim ma kokoam, crypto a wotumi de di dwuma.

## Nkratafa a Ɛfa Ho

- [Zcash Sikakorabea Syncing](/zcash-tech/zcash-wallet-syncing) — sɛnea wallet synchronization yɛ adwuma wɔ Zcash ecosystem no nyinaa mu.
- [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes) — infrastructure a hann sika kotoku te sɛ Zingo syncs tia.
- [Zaino na ɔkyerɛwee](/zcash-tech/zaino) — indexer a Zingo kuw no na ɛyɛe.
- [Sika kotoku](/wallets) — Zcash sika kotoku ne ne nneɛma ho kyerɛwtohɔ a edi mũ.

## Adesua a Ɛkɔ Akyiri

- [Zingo! GitHub Adekorabea](https://github.com/zingolabs/zingolib)
- [Zcash Mpɔtam Hɔ Nhyiam](https://forum.zcashcommunity.com/)
- Ɔmanfoɔ Nsɛm a Wɔde To gua - . [Zingo Labs no wɔ Twitter so](https://twitter.com/ZingoLabs)

___
___
