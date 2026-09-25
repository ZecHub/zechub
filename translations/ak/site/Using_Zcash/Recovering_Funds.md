<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Sikakorabea a Wɔsan Yɛ

**Dɛn nti na wode wo ho a wobɛsan agye no sie?**

Aba, sika a wɔsɛe no, safe a wɔde hwɛ nneɛma, ne sika kotoku fael ahorow no nyɛ nea wotumi sesa. Aba kasasin betumi anya sika kotoku safe ama sika kotoku pii, nanso ensi agyapade safe anaa sika kotoku fael biara ananmu. Safoa a wɔde hwɛ ade betumi ada dwumadi a wɔabɔ ho ban adi nanso entumi mma kwan sɛ wɔmfa sika nsɛe sika.

Sika a wɔbɛsan anya no gyina sɛ wobenya tumi a ɛfata a wɔde di dwuma ne ɔkwan a wɔboa mprempren ma ɔtare a ɛkura sika no. Ma nneɛma a wode bɛsan agye no nyɛ kokoam na wo ne obiara a wunnye nni nkyɛ aba, sika a wɔde di dwuma safe, anaa sika kotoku fael da.

# Ahobammɔ ne Asɛyɛde

Ɛho hia sɛ wɔn a wɔde di dwuma no te asiane ahorow a ɛwɔ kokoam safe ho dwuma a wodi mu no ase na wɔbɔ saa nsafe yi ho ban na obiara amma ho kwan. Sika a ahobammɔ wom no gyina asɛyɛde a nea ɔde di dwuma no wɔ sɛ ɔbɔ wɔn kokoam safe ho ban so.

## Sika a wɔde abɔ agyapadeɛ ho ban: Sprout, Sapling ne Orchard

Ebia ɛho behia sɛ wotu ZEC dedaw a wɔabɔ ho ban no kɔ baabi foforo sɛ ɔkwan a wɔfa so san nya ahoɔden no fã. Ɔkwan no gyina ɔtare a wɔabɔ ho ban a ɛwɔ sika no mprempren so.

> **Wɔayɛ nhyehyɛɛ sɛ NU7 bɛyɛ November 5, 2026.** Sɛ ɛyɛ adwuma wie a, mprempren tu kwan a ɛfiri agyapadeɛ Sprout pool no mu no bɛgyae adwumayɛ.
>
> Sɛ woda so ara wɔ ZEC wɔ Sprout pool no mu a, tu no ansa na woayɛ upgrade. Sɛ wɔde di dwuma wie a, nnwinnade a ɛwɔ hɔ dedaw no rentumi mfa Sprout sika nkɔ Sapling, address ahorow a ɛda adi pefee, anaa baabi foforo biara bio.
>
> Sɛ worehwɛ krataafa yi **bere a NU7** ayɛ adwuma akyi a, **Sprout ayɛ nwini wɔ nsukyenee mu** kosi sɛ daakye ɔkwan a wɔfa so san nya ahoɔden bɛba, a mprempren wɔnyɛ ho nhyehyɛe.

## Mmuae no wɔ kratafa biako mu

| Wo sika wɔ | Ɔkwan a wɔfa so tu kɔ mmeae foforo | Nea ɛsɛ sɛ woyɛ |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | If you have `wallet.dat` anaasɛ Sprout sikasɛm safoa a egyina hɔ ma ne ho, sɔ mprempren Argos sanba kwan no hwɛ kan. Sɛ Argos mfata a, fa agyapadeɛ sidecar kwan no di dwuma wɔ afuom akwankyerɛ a edi mũ no mu. Ɛsɛ sɛ Sprout di kan si fam wɔ Sapling, afei ɛkɔ n’anim kɔ Ironwood. Saa kwan yi yɛ nea ɛfa bere ho esiane NU7 nti. |
| **Sapling** | **Sapling → Ironwood** | Sprout recovery tebea biara ho nhia. Fa mprempren sika kotoku a ebetumi asan agye anaasɛ asɛe wo Sapling akontaabu pɔtee no na ayɛ Ironwood nkitahodi ahorow di dwuma. Ironwood mmoa nkutoo nkyerɛ sɛ agyapade-Sapling sanba mmoa. |
| **Orchard** | **Orchard → Ironwood** | Orchard yɛ nea wotumi fi adi nkutoo. Fa mprempren sika kotoku a ɛne no hyia no Orchard-to-Ironwood atutra nsu a wɔde ahyɛ mu no di dwuma. Hwɛ [Sika a wɔsan nyae ne Ironwood ɔtare no](#recovered-funds-and-the-ironwood-pool). |

### Nsɛmmisa anum gyinaesi a ɛsen

1. **So ɛyɛ Sprout?** Aba kasasin nkutoo kyerɛ akyiri yi Sapling/Orchard-era ahotɔ kwan, ɛnyɛ Sprout. BI `zc...` address, anaa sika kotoku a wɔasan de aba a ɛbɔ amanneɛ sɛ Sprout aka no, twe adwene si Sprout so.
2. **Recovery material bɛn na wowɔ?** Hwehwɛ `wallet.dat`, kɔmputa anaa datadir dedaw no, a `z_exportwallet` backup, anaa Sprout sikasɛm safoa a wɔde akɔ amannɔne. BI `zc...` address nkutoo nnɔɔso.
3. **Argos anaasɛ agyapadeɛ sidecar no?** Sɛ woanya a `wallet.dat` anaasɛ standalone Sprout spending key na wopɛ sɛ sika no fi adi kɛkɛ, bɔ mmɔden [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) deɛ ɛdi kan. Fa legacy sidecar kwan no di dwuma wɔ full field guide no mu sɛ Argos ntumi nni nneɛma no ho dwuma anaasɛ wopɛ sɛ full recovery stack no wɔ w’ankasa wo tumi ase a.
4. **So wowɔ synchronized, unpruned zcashd datadir dedaw?** Eyi ho hia ma agyapade sidecar kwan no nkutoo. Kɔpi node data a ɛwɔ hɔ dedaw no bere a wɔatoto mu a ɛho tew akyi nkutoo; anyɛ saa a afuw akwankyerɛ no kata snapshot/from-scratch options no so.
5. **Ɛhe na sika no kɔ?** **Ironwood.** Sprout di kan twa Sapling efisɛ Sprout-to-Ironwood asɛm biako biara nni hɔ tẽẽ. Nnyae wɔ Sapling.

### ZEC Pool Migration Field Guide a edi mũ

Sɛ wopɛ migration reference a edi mũ, a akwan a ɛkɔ akyiri a wɔfa so san nya, ahyɛde, sika a wɔbɔ, hardware ahwehwɛde, kokoamsɛm ho nsusuwii, ɔhaw ahorow ano aduru, ne fibea nsɛm ka ho a, kenkan akwankyerɛ no nyinaa.

**Nkyerɛaseɛ 1.1 · Wɔyɛɛ no foforɔ Ɔpɛpɔn 18, 2026**

[Kenkan ZEC Pool Migration Field Guide no nyinaa wɔ ZecHub mu](/research/zec-pool-migration/view)

> **Ansa na wobɛhyɛ aseɛ:** di kan si **deɛ woresan agye ne nneɛma a wode bɛsan agye wo ho a woda so ara wɔ**. Mprempren sika kotoku aba anaa sika a ɛnyɛ Sprout sikasɛm safoa a wɔboa no betumi ahia sɛ wɔsan de ba sɛnea ɛte daa nkutoo. Nneɛma dedaw — te sɛ ZecWallet Lite aba, agyapade `wallet.dat`, anaasɛ Sapling anaa Sprout sikasɛm safoa a egyina hɔ ma — ebia ebehia ɔkwan a wɔatu ho ama a wɔfa so san nya ahoɔden.
>
> Sɛ wosusu sɛ sika no wɔ **Sprout** mu a, si so dua sɛ woda so ara wɔ tumi a wode bɛsɛe sika ansa na wode bere ahyɛ wo nsa sɛ wobɛsan anya ahoɔden. BI `zc...` address anaa nsɛm a wɔbɛhwɛ nkutoo nnɔɔso sɛ wɔde sika no bɛkɔ baabi foforo.
>
> **YWallet ntumi mmoa Zcash bio wɔ Ironwood akyi.** Fa **Zkool** di dwuma ma sanba a ɛnyɛ Sprout a ɛyɛ mpapahwekwa a efi aba ne nsafe a wɔboa mu. Fa **Argos** di dwuma ma ZecWallet Lite sanba, agyapadeɛ sika kotokuo fael, ne Sapling/Sprout sikasɛm safoa a egyina hɔ ma. Wɔ Sprout fam no, Argos ne ɔkwan a edi kan a ɛsɛ sɛ wɔfa so sɔ hwɛ; afuw akwankyerɛ a edi mũ no kata agyapade sidecar fallback no so.
>
> Fa table a ɛwɔ aseɛ ha no di dwuma a egyina **deɛ wowɔ ankasa** so, ɛnyɛ adwinnadeɛ a wode bɛsan agye a wokae sɛ wode dii dwuma no.

| Wowɔ | Fi ase wɔ ha |
| --- | --- |
| Aba kasasin anaa **non-Sprout spending key** a wɔboa a efi sika kotoku a wɔahwɛ so mprempren anaa nnansa yi ara, a YWallet Zcash nneɛma dedaw | [Zkool](#fund-recovery-with-zkool) |
| A **hwɛ safoa nkutoo** | Zkool betumi de viewing keys a wɔboa aba ama akenkan nkutoo kwan, nanso viewing key ntumi mma kwan mma wɔmfa sika a wɔsɛe no bio. Hwehwɛ aba anaa sika a wɔsɛe no safe a ɛne no hyia. |
| Nsɛmfua 24 **ZecWallet Lite** aba | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| ZecWallet Lite anaa zcashd bi na ɛyɛ adwuma `wallet.dat`, anaasɛ Sapling / Sprout sikasɛm safoa a egyina hɔ ma | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Ɛde besi September 18, 2026 no, v1.3.0 yɛ mprempren na wɔpɛ; fa v1.2.0 anaa nea ɛba akyiri yi di dwuma ma `wallet.dat` ne Sprout a ɛsan nya ahoɔden. |
| Sprout material a Argos ntumi nni ho dwuma, anaasɛ recovery a wopɛ sɛ legacy components no wɔ w’ankasa wo tumi ase | Fa agyapade sidecar kwan a ɛwɔ... [afuw mu akwankyerɛfo a edi mũ](/research/zec-pool-migration/view). |
| Aba a ɛyɛ adwuma anaasɛ sika a wɔsɛe no safe biara nni hɔ, na mmom mfiri a wɔatoto mu, password a werɛ afi, anaasɛ disk a adi nkogu | [Adwumayɛfo a wɔn ho tɔ wɔn](#professional-recovery-when-you-do-not-have-the-seed). Mfa aba a ɛyɛ adwuma anaa sika a wɔsɛe no safe nkɔma obi a ɔne wo di nkitaho a wɔmmisa wo da. |

## Sika a Wɔsan Yɛ ne Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) yɛ Zcash a wɔahwɛ so no a ɛdi YWallet akyi a ɛfiri developer korɔ no ara hɔ. Ɛboa akwan a ɛda adi na ɛyɛ nnɛyi shielded sanba, a agyapadeɛ Sapling safe ka ho, nanso **ɛnyɛ Sprout**.

Wɔaka tebea abien ho asɛm wɔ ha:

1. **Akontaabuo a wobɛsan de aba** afiri aba kasasin, kokoam safoa, anaa hwɛ safoa mu
2. **Sweeping funds** fi sika kotoku a na ɛboa address ahorow a ɛda adi nkutoo da biara

### 1) Akontaabu bi a wɔbɛsan de aba

1. Fa Zkool hyɛ mu fi [yi kratafa no adi](https://github.com/hhanh00/zkool2/releases) na bue mu
2. Wɔ **Akontaabu sohwɛfo** (kratafa titiriw no) so no, pia **+** bɔtn no na du **Akontaabu Foforo** screen no so
3. Hyehyɛ **Akontaabu Din** na kyerɛ akonta yi
4. Dane **San Fa Akontaabu no Ba?**. Eyi da safe ne awo tenten mfuw adi
5. Fa wo safoa no hyɛ **Key (Seed Phrase, Private Key, anaa Viewing Key)** mu. Zkool gye aba kasasin, Sapling kokoam safe, safe a wɔatrɛw mu a ɛda adi, ne safe a wɔboa a wɔde hwɛ. Safoa a wɔde hwɛ ade yɛ nea wɔkenkan nkutoo na entumi mma kwan sɛ wɔmfa sika nsɛe sika.
6. Hyehyɛ **Birth Height** ma akontaabu dedaw bi. Zkool nhwehwɛ blocks ansa na saa sorokɔ yi aba, enti paw ɔsorokɔ bi ntɛm sen sika kotoku no dwumadi a edi kan sɛ wunnim a. Awo tenten a wɔde si hɔ akyiri dodo betumi ama ayɛ te sɛ nea nnwuma ankasa nni hɔ.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Fa akontaabu no sie, afei fa yɛ sync

### Aba bi a wɔsan de fi sika kotoku foforo mu ba

Sɛ aba no fi sika kotoku a ɛdi ZIP 316 akyi — a ZODL (kan no na ɛyɛ Zashi), Zingo, anaa zcashd ka ho — dane **Advanced Options** na ma **Fa Internal Change** nyɛ adwuma ansa na wode asie.

ZIP 316 de emu/nsesa address a ɛyɛ soronko di dwuma. Sɛ wosan de saa akonta yi mu baako ba a **Fa Nsakraeɛ a Ɛwɔ Mu Di Dwuma** a, ɛbɛtumi ama nsakraeɛ a ɛfiri mu ba no ayɛ te sɛ nea ɛyera ɛwom mpo sɛ sika no da so ara wɔ hɔ.

Mfuw abien foforo te **Advanced Options** ase:

- **Extra Passphrase (optional)**, sɛ mfitiase sika kotoku no de bi dii dwuma nkutoo a
- **Account Index**, sɛ mfitiase sika kotoku no kura akontaabu pii wɔ aba biako so a. Ebia sika no wɔ index soronko bi ase

> **Saa mmienu yi pue pɛnkoro pɛ bere a aba kasasin a ɛfata wɔ Key field no mu.** Sɛ afuw no da mpan, anaasɛ wokura kokoam anaa hwɛ safoa a, Zkool kyerɛ **Fa Internal Change** ne **H/W Ledger** kɛkɛ. Di kan fa aba no hyɛ mu, afei bue Advanced Options.

### 2) Sika a Wɔpopa Fi Sikakorabea a Ɛda Nneɛma Mu Nkutoo Mu

Sɛ sika kotoku anaa akontaabu dedaw no kura **transparent ZEC nkutoo** a, san fa akontaabu no di kan, hwehwɛ address biara a ɛda adi a wode adi dwuma, afei fa sika no kɔ mprempren shielded destination a wohwɛ so. Mfa no sɛ na sika kotoku dedaw bi ahyɛnsode yɛ nea ɛda adi pefee bere nyinaa; nneɛma bi de shielded support kaa ho wɔ akyiri yi nkyerɛase ahorow mu.

1. Fa anammɔn a ɛwɔ atifi hɔ no san fa akontaabu no ba
2. Bue akontaabu no na kɔ **Gye Sika** krataafa no so
3. Klik magnifying glass a ɛwɔ soro bar no so (**Hwehwɛ address afoforo a ɛda adi**). Sika kotoku a ɛkyinkyin address ahorow te sɛ Ledger ne Exodus no ma wonya address ahorow pii a ɛda adi pefee fi aba biako mu, na eyi hu wɔn a wokura sika
4. **Reset na sync account no akyi.** Address foforo a wɔahu no gye wɔn balances nkutoo wɔ scan a edi hɔ no mu, enti sɛ wohuw eyi a, ɛma ɛyɛ te sɛ nea sweep no anhu hwee
5. Kɔ **Send** krataafa no so. Bɛn balance no wubehu icon buttons abiɛsa. Wɔn nni nsɛm a wɔakyerɛw so, enti fa wo nsa hyɛ wo nsa anaa mia so kyɛ na wubehu wɔn din:
   - **Shield One** (kyɛm a wɔakyerɛkyerɛ mu) tu address biako a ɛda adi pefee bere koro mu
   - **Shield All** (solid shield) de biribiara fi address biara a ɛda adi pefee so prɛko pɛ
   - **Unshield All** (open padlock) kɔ ɔkwan foforo so, kɔ address a ɛda adi mu

> **Shield One yɛ kokoam paw.** Address pii a wobɛbɔ ho ban wɔ asɛm biako mu no de bata ho wɔ baguam sɛ ɛyɛ onipa koro dea. Zkool bɔ kɔkɔ wɔ eyi ankasa ho ansa na watu mmirika Shield All.

6. Hwɛ asɛm no mu na fa mena

Unshield All ho wɔ mfaso bere a woretwe wo ho akɔ exchange a egye address a ɛda adi nkutoo nkutoo no. Sɛ akontaabu no wɔ address a wɔabɔ ho ban nkutoo a, shielding buttons no bɛda adi, na Unshield All no pue sɛ ɛwɔ nea ɛda adi pefee nkutoo a.

## ZecWallet Lite ne agyapadeɛ sika kotokuo a wɔsan nya ne Argos

[ZecWallet Lite a ɛwɔ hɔ](https://github.com/adityapk00/zecwallet-lite) no nhwɛ so bio na wɔde ne akorae no asie. N’aba a wonya fi mu no yɛ soronko wɔ nhyehyɛe a mprempren sika kotoku de di dwuma no ho, enti sɛ wode kasasin koro no ara ba nnɛyi sika kotoku mu a, ebetumi ayera sika a ɛwɔ ZecWallet Lite address afoforo a wonya fi mu no. [Argos](https://argos.sovright.com), a efi Sovright, yɛ desktop recovery adwumayɛbea a wɔasi ama eyi ne agyapade recovery nsɛm afoforo.

Argos kenkan ZecWallet Lite aba ne sika kotoku fael, zcashd `wallet.dat`, standalone Sapling extended sika a wɔsɛe no safe, ne Sprout sikasɛm ho nneɛma. Sprout deɛ, ZecWallet Lite aba nko ara nnɔɔso ɛfiri sɛ wɔyɛɛ saa safoa no wɔ ɔkwan soronko so. Argos yɛ adwinnade a wɔde san nya nneɛma, ɛnyɛ da biara da sika kotoku: hwehwɛ nneɛma a wonya fi mu no wɔ wo mpɔtam hɔ, scan, afei popa kɔ sika kotoku a wɔahwɛ so yiye a wudi so mu.

Least Authority [wɔayɛ ho akontaabu](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) adwinnade no. Sɛ obi ho tɔ no ankasa a, wontua hwee. Ntoboa a wobetumi de ama Sovright betumi ada adi bere a wɔreprapra mu no.

> **Nkyerɛw aba bi nkɔ wɛbsaet bi mu da.** Argos sait no yɛ nea wɔtwe ne nea... [akwankyerɛ a wɔde di dwuma](https://argos.sovright.com/guide.html). Safoa tra desktop app a wɔde wɔn nsa ahyɛ ase no mu. Validation yɛ local tia BIP-39 checksum no. Aba afuw no mu tew bere a wɔafi ase scan no. Obiara a ɔde message bɛmena wo sɛ ɔsrɛ saa aba no "sɛ ɔmmoa mma wonnya wo sika" no resisi wo.

### Ansa na wobɛbue Argos no

1. Twe desktop app no fi... [Argos beae a ɛyɛ aban de](https://argos.sovright.com) anaasɛ nea [GitHub yi krataafa no adi](https://github.com/sovright/argos/releases). Hwɛ sɛ checksums anaa nsaano nkyerɛwee no yɛ nokware bere a wɔatintim no.
2. Fa Argos a wɔayi no adi mprempren no di dwuma. Ɛde besi September 18, 2026 no, **v1.3.0** yɛ mprempren na wɔpɛ. Fa **v1.2.0 anaa nea ɛba akyiri yi di dwuma ma `wallet.dat` ne Sprout a wɔsan nya**. Builds a akyɛ sen 1.1.0 da so ara tumi scan nanso wɔyɛ pre-Ironwood sweeps a network no pow; update na san bɔ mmɔden bio.
3. Yɛ adwuma wɔ afiri a wowɔ mu ahotoso so. Wopɛ sɛ wode disk a edi mũ yɛ encryption. Mfa screen-share bere a aba, passphrase, anaa spending key bi da adi.
4. Ma destination Unified Address asiesie fi sika kotoku a wɔahwɛ so yiye a wohwɛ so, te sɛ [ZODL](https://zodl.app/). Si address a ɛwɔ saa sika kotoku no mu no so dua ansa na wode ahyɛ Argos mu.

### Aba a wɔsan nya

1. Bue Argos na paw **Mewɔ me aba kasasin a ɛwɔ nsɛmfua 24**. Aba a wɔsan nya no nhia sika kotoku fael.
2. Fa kasasin no hyɛ mu na klik **Validate seed**. Sɛ ɛka sɛ aba no yɛ adwuma a, toa so.
3. Hyehyɛ **awoda block height**, anaa akontaabu a ɛbɛn sen biara a ɛkyerɛ bere a wɔyɛɛ sika kotoku no. Ɔsorokɔ a edi kan no yɛ brɛoo nanso ahobammɔ wom sen sɛ wubesusuw ho akyiri dodo.
4. Wɔ server controls no ase no, fa current-server preset no di dwuma, anaa hyɛ lightwalletd URLs. Wɔsɔ URL ahorow a wɔde koma atew mu no hwɛ nnidiso nnidiso. Baguam nhwɛso ahorow:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Fa wo ho hyɛ baabi a worekɔ no Unified Address.
6. Klik **fi ase scan** so. Eyi betumi agye simma anaa nna pii a egyina awoda tenten so. Wubetumi agyae na woasan abue adwumayɛbea koro no ara; scan no san fi ase bio.
7. Sɛ scan no wie a, hwɛ sika a aka, fee estimate, ne destination, afei klik **sweep**.

Broadcasting a sweep yɛ nea wontumi nsakra. Fa mfitiase sika kotoku fael no sie kosi sɛ wɔbɛprapra pool biara a ɛfa ho na sika kotoku a wode rekɔ no akyerɛ sika a wɔhwɛ kwan no. Sɛ wo ho tɔ wo wie a, kɔ pɛnhyen agyapade ahintasɛm mmom sen sɛ wobɛkɔ so de adi dwuma ama dwumadi foforo.

### Wallet fael ne safe a egyina hɔ ma ne ho

Wɔ akwaaba screen no so no, **Mewɔ sika kotokuo fael** kata ZecWallet Lite fael bi so, zcashd `wallet.dat`, anaasɛ standalone Sapling extended sika a wɔsɛe no safe. Standalone Sprout spending-key sanba no, Argos Sprout sanba kwan/CLI na ɛdi ho dwuma.

Argos kenkan sika kotoku fael ahorow a ɛnsakra mu. Sɛ wɔakora sika kotoku no so a, hyɛ passphrase no mu bere a woabisa no; wɔde di dwuma wɔ memory mu na wɔankyerɛw no wɔ disk so. Hwɛ transparent, Sapling, ne Sprout key counts no mu ansa na woafi ase ayɛ scan.

Wɔnnye safe a wɔde hwɛ nneɛma ntom mma sweep efisɛ wontumi mma kwan sɛ wɔmfa sika nni dwuma.

### Sprout nsɛm a wɔakyerɛw

ZecWallet Lite aba bi nnya Sprout safe. Wɔyɛɛ saa nsafe no wɔ ɔkwan soronko so. San nya Sprout fi zcashd bi mu `wallet.dat`, anaasɛ efi sikasɛm safoa a egyina hɔ ma ne ho wɔ CLI no mu.

Sɛ fael no wɔ spendable note data ne cached witness dedaw a, Argos betumi de **Sweep Sprout sika** ama a enhia nkɔnsɔnkɔnsɔn scan. Sɛ ɛnte saa a ɛbɛtumi ayɛ full-block scan a wɔsan de di dwuma bio wɔ P2P network no so. Saa scan no yɛ kɛse na ɛyɛ brɛoo. Checkpoint a ɛkyerɛw no tumi sɛe sika, enti bɔ ho ban te sɛ mfitiase sika kotoku no.

Sprout bo betumi akɔ fam wɔ Sapling nkutoo. Sɛ wosi Sapling sika no so dua na wotumi sɛe wie a, fa kɔ **Ironwood** a wowɔ sika kotoku a ɛwɔ hɔ mprempren a ɛboa Sapling akontaabu a wɔasan agye no. Nnyae wɔ Sapling.

## Sika a wɔsan nyae ne Ironwood ɔtare no

Efi bere a Ironwood (NU6.3) upgrade no yɛɛ adwuma wɔ 28 July 2026 no, Orchard pool no yɛ nea wɔsɛe no nkutoo. Botae foforo biara ntumi nkɔ mu, na bo a ɛwɔ hɔ dedaw no fa turnstile no mu kɔ Ironwood.

Sɛ wo sika a woasan anya no wɔ Orchard a, fa **mprempren sika kotokuo a wɔasisi wɔ mu no tu kɔ baabi foforo** no kɔ Ironwood. Orchard yɛ exit-only wɔ NU6.3 akyi.

Zkool 6.30.0 yɛ mprempren de fi September 18, 2026 na ɛboa Ironwood. Ne migration nhyehyeɛ no gyina kokoamsɛm so nanso ɛnyɛ adeɛ korɔ no ara ne sɛ wɔbɛka sɛ ɛne ZIP 318 hyia. Mprempren sika kotoku afoforo betumi de ZIP 318-style staged migration adi dwuma. Di sika kotoku a wɔde ahyɛ mu no mprempren migration screen no akyi na yi nsɛm a wɔakyerɛw no adi sen sɛ wobɛhyehyɛ nsaano sika anaa nhyehyɛe.

Atutena a wɔayɛ no staged betumi de nnwuma pii adi dwuma, enti sika a wɔbɔ nyinaa betumi ayɛ kɛse asen sika a wɔde bɛkɔ baabi foforo a wɔde tuo biako.

> **Migration amounts are public.** Sɛ botae no twa turnstile no a, dodow ne block sorokɔ no da adi wɔ nkɔnsɔnkɔnsɔn so ɛwom mpo sɛ nea ɔde kɔma ne nea ogye no da so ara yɛ ahobammɔ de. Fa sika kotoku no mu kokoam/staged migration nhyehyɛe a wɔde ahyɛ mu no di dwuma bere a kokoamsɛm ho hia, na fa netɛw-gyinabea kokoamsɛm te sɛ Tor anaa kokoamsɛm layer foforo a wogye di di dwuma wɔ baabi a ɛfata. Network kokoamsɛm betumi de wo IP link no asie; ɛnyɛ sika a ɔmanfo twam no nsie.

## Deep Recovery ne ZExCavator

[ZExCavator na ɛyɛ adwuma](https://github.com/zingolabs/zexcavator) yɛ **adwuma-a ɛrekɔ so** Zingo Labs sanba adwuma a mprempren ɛtwe adwene si ZecWallet Lite sika kotoku fael ne sika kotoku-format tu so. Mprempren ne README no kyerɛ wɔn a wɔde sika a wɔsan nya no kwan kɔ **Zingolib** export option no so bere a wɔda so ara reyɛ ZeWIF mmoa a edi mũ.

Fa no sɛ adwinnade a ɛkɔ anim/edge-case sen sɛ wode bɛyɛ default recovery path. Sɛ wopɛ ZecWallet Lite aba a ɛyɛ mpapahwekwa, sika kotoku fael, zcashd `wallet.dat`, na wɔboa standalone spending keys, sɔ Argos hwɛ kan. Hwɛ biribiara a ZExCavator asan anya wɔ sika kotoku a wɔahwɛ so mu ansa na wode wo ho ato so.

## Professional ahotɔ bere a wunni aba no

Sɛ aba anaa safoa no ayera a, sanba a obi ankasa agye no ntumi mfi ase. Nnipa binom a wɔwɔ saa dibea no mu de adwumakuw bi a wɔyɛ adwumaden a ɛsan nya nneɛma foforo di dwuma de hwehwɛ password ahorow a wɔn werɛ afi, hardware a entumi nyɛ adwuma yiye, anaa disk ahorow a wontumi nkenkan.

Saa kwan no ne aba a woda so ara wɔ a wobɛsan de aba no nyɛ ade koro. Mfa aba a ɛyɛ adwuma nhyɛ obiara a ɔka sɛ "ɔbɛsan anya" ama wo no nsa. Saa ɔsom yi mu nsisi no abu so.

[Unciphered](https://unciphered.com) yɛ adwumakuw biako a ɛyɛ adwuma yi wɔ wɔn fie na wɔaka ho asɛm wɔ mmeae te sɛ [Wɔde nhama ayɛ](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Wɔyɛ general crypto recovery service, ɛnyɛ Zcash-specific adwinnade, na wɔbɔ adwuma no ho ka. ZecHub nnye adwumakuw biara a ɛsan nya ahoɔden ntom. Sɛ wofa saa kwan yi so a, w’ankasa si official domain no so dua na fa no sɛ obiara a odi kan DM wo no yɛ scammer.

Sɛ woda so ara wɔ aba a ɛyɛ adwuma anaa sika a wode di dwuma safe a, fi ase fa ɔkwan a wo ankasa wobɛfa so asan agye te sɛ Zkool anaa Argos wɔ w’ankasa mfiri so mmom.

## Wɔnhwɛ YWallet so bio

YWallet na na ɛyɛ adwinnade a wɔkamfo kyerɛ sɛ wɔmfa nnya ahoɔden bio wɔ kratafa yi so bere tenten, na akwankyerɛfo dedaw pii da so ara twe adwene si so.

Ne developer no seesei ka sɛ YWallet ntumi mmoa Zcash bio firi Ironwood update no na ɛkyerɛ Zcash dwumadiefoɔ kwan kɔ **Zkool**, adedifoɔ a wɔahwɛ so no. Kora YWallet aba/nneɛma titire dedaw so, nanso nhyɛ Zcash tu foforo ase wɔ YWallet mu.

Sɛ wowɔ Zcash recovery material dedaw a efi YWallet a, san fa ba Zkool mu denam aba/key kwan a wɔboa wɔ atifi hɔ no so.

## Nkratafa a ɛfa ho

- [Sika kotoku](/using-zcash/wallets) - a wohwɛ so sika kotokuo ne ne Ironwood ahoboa, a Argos ka ho
- [Ironwood](/zcash-tech/ironwood) - dee upgrade no sesae ne nea enti a sika tu tu
- [Memos a wɔde kyerɛw nsɛm](/using-zcash/memos) - sedee encrypted memos y adwuma
- [Nneɛma a Wɔde Hwɛ](/zcash-tech/viewing-keys) - akenkan nkoaa kwan a wonnye tumi
- [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes) - public lightwalletd endpoints Argos betumi de adi dwuma
- [Argos dwumadie ho akwankyerɛ](https://argos.sovright.com/guide.html) - aban kwan so nantew a efiri Sovright
- [Naomi Brockwell wɔ nnwinnade a wɔde san nya ahoɔden ho](https://x.com/naomibrockwell/status/2079146521405333526) - Argos nantew ne nsɛm a wɔakyerɛw afa adwumayɛfo ahotɔ ho
