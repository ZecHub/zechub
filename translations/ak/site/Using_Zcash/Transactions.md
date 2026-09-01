<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nkitahodi ahorow

ZEC yɛ dijitaal agyapadeɛ a wɔde di dwuma kɛseɛ ma sikatua, ɛde kokoam nsɛm a ɛyɛ den a ɛma ɛfata ma nnwuma ahodoɔ te sɛ nnamfoɔ a wɔbɛtua, adetɔ, anaa ntoboa ma. Sɛnea ɛbɛyɛ a wobɛyɛ kokoamsɛm ne ahobammɔ kɛse no, ɛho hia sɛ wote sɛnea nkitahodi ahorow yɛ adwuma wɔ Zcash mu no ase.

## TL;DR

- Zcash boa nkitahodi ahorow abien: **shielded**, a ɛma nsɛm no yɛ kokoam, ne **transparent**, a ɛkyerɛw to hɔ wɔ baguam.
- Address ahorow a wɔabɔ ho ban fi ase `u` or `z`. Address ahorow a ɛda adi pefee fi ase `t` na wɔyɛ wɔn ade te sɛ Bitcoin address kɛse.
- Nea wobɛpaw no yɛ wo dea wɔ sika biara a wubetua ho. Privacy yɛ option a Zcash de ma wo, ɛnyɛ setting a obi foforo besi ho gyinae ama wo.
- Sɛ wɔtwe wɔn ho fi exchange bi ho a, ɛno ne beae a nkurɔfo taa hwere kokoam nsɛm. Sɛ sika a wɔde sesa no boa sika a woyi fi mu a ɛda adi pefee nkutoo a, w’ankasa bɔ sika no ho ban bere a aba no.
- Fees di akyi [ZIP 317 na ɛwɔ hɔ](https://zips.z.cash/zip-0317) na enyin bere a asɛm no kɛse te. Sika kotoku a ɛda so ara de flat fee dedaw no mena no betumi ahu sɛ wɔn nnwuma akyɛ.
- Zcash nkitahodi dodow no ara wɔ expiry height ase [ZIP 203 na ɛwɔ hɔ](https://zips.z.cash/zip-0203). Sɛ asɛm bi twam ansa na wɔatu a, entumi nsi so dua wɔ saa bere tenten no akyi na ebia ebehia sɛ wɔsan de mena bio.

## Nkitahodi a Wɔabɔ Ho Ban

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

---

Nkitahodi a wɔabɔ ho ban no ba bere a wode ZEC kɔ wo sika kotoku a wɔabɔ ho ban no mu. Wo sika kotoku address a wɔabɔ ho ban no fi ase wɔ a `u` or `z`. Sɛ wode nsɛm a wɔabɔ ho ban remena a, wo ne nnipa a wo ne wɔn di nkitaho no betumi akora kokoam nsɛm bi a ɛrentumi nyɛ yiye wɔ ɔmanfo sikatua nkitahodi nhyehyɛe ahorow a wɔde di dwuma daa so.

Sɛ wode asɛm a wɔabɔ ho ban bɛmena a, ɛyɛ mmerɛw bere a wode sika kotoku a ɛboa mprempren Zcash ntwamutam ne mprempren shielded pools redi dwuma no. Ansa na wode wo ho bɛto sika kotoku so ama kokoam nsɛm no, hwɛ sɛ ɛboa shielded sending, shielded receiving, ne pool a woayɛ w’adwene sɛ wode bedi dwuma no anaa. Sɛ woreyi ZEC afi exchange bi mu a, hwɛ sɛ exchange no boa shielded anaa transparent withdrawals anaa. Sɛ ɛboa sika a woyi fi mu a ɛda adi pefee nkutoo a, fa sika no kɔ sika kotoku a ɛtumi bɔ ho ban mu bere a wɔadu hɔ awie no.

Nkitahodi a wɔabɔ ho ban a wɔde bedi dwuma de akɔma na wɔagye sika no ne ɔkwan a eye sen biara a wobɛfa so akora kokoam nsɛm so na wɔatew asiane a ɛwɔ hɔ sɛ sikatua ho nsɛm bɛpue no so.

## Nkitahodi a ɛda adi pefee

Nkitahodi a ɛda adi pefee yɛ adwuma te sɛ Bitcoin nkitahodi. Adwuma ho nsɛm da adi wɔ baguam wɔ blockchain no so, a address ahorow a ɛda adi pefee ne gyinapɛn ahorow a ɛda adi pefee ka ho. Ɛsɛ sɛ wɔkwati nkitahodi a ɛda adi pefee bere a kokoam nsɛm yɛ ade titiriw no.

Address a ɛda adi pefee da so ara ho wɔ mfaso wɔ tebea horow bi mu, titiriw bere a exchange anaa service bi ntumi mmoa address ahorow a wɔabɔ ho ban no. Sɛ wo nsa ka ZEC kɔ address a ɛda adi pefee so a, susuw ho sɛ wobɛbɔ ho ban ansa na woatua sika akyiri yi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

## Ɔkwan a Ɛyɛ Mmerewa a Wobɛfa so ayɛ Ho Mfonini

Aguadi a ɛda adi pefee yɛ postcard. Postman no de kɔma, nanso obiara a odi ho dwuma wɔ kwan so no betumi akenkan nkrasɛm no, ahu onii a ɔde kɔmaa no na wahwɛ onii a ogye.

Aguadi a wɔabɔ ho ban yɛ envelope a wɔatoto mu. Posɔfese adwuma no da so ara si so dua sɛ krataa ankasa a wɔde posɔfese ho ka ankasa nam nhyehyɛe no mu, na obiara ntumi nnyɛ biako anaasɛ ɔde krataa koro no ara mena mprenu. Nea ɛwɔ envelope no mu no tra nea ɔde kɔma ne nea ogye no ntam.

Ɔfã a ɛho hia ne sɛ Zcash ma wusi nea wode bɛmena no ho gyinae, tua denam sika a wotua so.

## Zcash Fees a Wɔtua

Zcash mfa Ethereum-style gas units nni dwuma. Wɔtua Zcash ayɔnkofa ho ka wɔ ZEC mu, wɔtaa susuw wɔ **zatoshis** mu. ZEC biako ne zatoshi 100,000,000 yɛ pɛ.

[ZIP 317 na ɛwɔ hɔ](https://zips.z.cash/zip-0317) kyerɛkyerɛ sikatua ho nhyehyɛe a wɔtaa de di dwuma a ɛne nkitahodi a ɛyɛ den no yɛ kɛse. Sɛ́ anka wɔde asɛm biara bedi dwuma de dedaw 1,000-zatoshi flat fee bedi dwuma no, sika a wɔtaa tua no gyina "nneyɛe a ntease wom" te sɛ nneɛma a wɔde ba, nea wɔde fi mu, ne nneyɛe a wɔabɔ ho ban so. Nkitahodi a ɛnyɛ den taa fi ase bɛyɛ zatoshis 10,000, anaa ZEC 0.0001, na nnwuma a ɛyɛ den kɛse betumi ahwehwɛ pii.

Wɔ mprempren sika kotoku dodow no ara mu no, ɛnsɛ sɛ ɛho hia sɛ wɔn a wɔde di dwuma no de wɔn nsa bu ZIP 317 ho ka. Ɛsɛ sɛ sika kotoku no paw sika a ɛfata ankasa. Sɛ sika kotoku bi da so ara de flat fee dedaw no di dwuma anaasɛ ɛma wutumi de sika a ɛba fam koraa sen ZIP 317 amanne kwan so fee no si hɔ a, ebia wɔbɛkyɛ asɛm no, wɔbɛma ayɛ nea ɛho hia, node binom agyae, anaasɛ entumi mfa relay a wotumi de ho to so.

## Ɔhaw Ahorow a Wɔde Siesie Nkitahodi a Ɛkɔ So

Zcash asɛm bi nyɛ nea etwa to esiane sɛ epue wɔ wo sika kotoku mu nti. Ɛbɛyɛ nea etwa to ma dwumadie a wɔtaa de di dwuma bere a wɔatu akɔ block mu na wɔanya nsɛm a ɛdɔɔso ma wo tebea no akyi. Ebia nsakrae ne nnwuma bɛhwehwɛ sɛ wosi so dua pii sen sɛnea sika kotoku bi kyerɛ wɔ default so.

Fa saa gyinaesi dua yi di dwuma ansa na woasan de amena:

1. **So wo sika kotoku no kyerɛ transaction ID?**
   - Sɛ dabi a, ebia sika kotoku no nnya nyɛɛ anaasɛ wɔmfaa asɛm no nkɔda. Hwɛ sync tebea, intanɛt nkitahodi, wallet version, ne wallet mfomso nkra biara.
   - Sɛ yiw a, kɔpi transaction ID no na toa so.
2. **So wɔasi asɛm no so dua wɔ block bi mu?**
   - Sɛ yiw a, twɛn ma wo sika kotoku, exchange, aguadifo, anaa ɔsom adwuma no hwehwɛ sɛ wosi so dua.
   - Sɛ dabi a, toa so.
3. **So asɛm no adu ne bere a ɛbɛba awiei?**
   - Sɛ dabi a, mfa nsa nsan nkɔma sika koro no ara de besi nnɛ. Ebia mfitiase asɛm no da so ara si so dua.
   - Sɛ yiw a, wontumi ntu asɛm no wɔ saa bere tenten a ne bere atwam no akyi. Ebia wo sika kotoku no ahyɛ no agyirae sɛ ne bere atwam anaasɛ adi nkogu, na ebia ebehia sɛ woyɛ asɛm foforo.
4. **So asɛm no pue wɔ server anaa explorer biako so nanso ɛnyɛ foforo so?**
   - Fa eyi sɛ network visibility asɛm, ɛnyɛ adanse a ɛkyerɛ sɛ asɛm no dii nkogu. Nodes ahorow betumi anya mempool views ahorow.
   - Twɛn, san yɛ wo sika kotoku no, anaa dan kɔ server foforo a wogye di so sɛ wo sika kotoku no boa saa a.
5. **So asɛm no yerae bere a ɛdaa adi sɛ wɔasi so dua akyi?**
   - Nkɔnsɔnkɔnsɔn tiawa a wɔsan hyehyɛ no betumi ayi asɛm bi afi nkɔnsɔnkɔnsɔn a eye sen biara no mu bere tiaa bi.
   - Twɛn ma woanya blocks pii. Sɛ asɛm no san ba a, kɔ so twɛn ma wosi so dua. Sɛ ɛnsan mma na akyiri yi ɛtwam a, yɛ asɛm foforo.
6. **So sika kotoku no rebisa wo sɛ fa resend?**
   - Di sika kotoku no akwankyerɛ a ɛwɔ hɔ mprempren no akyi bere a woahwɛ sɛ asɛm a woadi kan ayɛ no atwam, adi nkogu, anaasɛ enni mu bio nkutoo.
   - Sɛ wunnim a, bisa mmoa ansa na woasan de amena bio.

## Pending, Expired, Wɔatow agu, ne Reorged

- **Pending** kyerɛ sɛ wɔayɛ asɛm no anaasɛ wɔabɔ amanneɛ nanso wonnya ntutuu mu nkɔ block bi mu.
- **Expired** kyerɛ sɛ asɛm no bere a atwam no sorokɔ atwam. Wɔ ZIP 203 ase no, wɔrentumi ntu asɛm a ne bere atwam no sorokɔ wɔ saa sorokɔ no akyi.
- **Dropped** kyerɛ sɛ node biako anaa nea ɛboro saa nkora asɛm no so bio wɔ wɔn mempool mu. Eyi betumi aba esiane bere a atwam, ɛka a ɛba fam, mempool nhyehyɛe, restart suban, anaa relay nsonsonoe nti.
- **Reorged** kyerɛ sɛ block a kan no na ɛwɔ asɛm no mu no nyɛ nkɔnsɔnkɔnsɔn a eye sen biara no fã bio. Wobetumi asan atu asɛm no akyiri yi, anaasɛ sɛ ɛda so ara yɛ adwuma a, ebetumi asan akɔ pending.

## Bere a Ɛnsɛ sɛ Wosan Kɔma

Mfa nkɔma ntɛm ara esiane sɛ asɛm bi da so ara wɔ hɔ, ɛrekɔ brɛoo, anaasɛ ɛyera wɔ nhwehwɛmufo biako hɔ nti. Sɛ wɔsan de mena ntɛm dodo a, ebetumi ama adwene atu afra, na egyina sɛnea sika kotoku no kyekye sika foforo no so no, ebetumi de asiane aba sɛ wubetua mprenu.

Twɛn anaa di kan nya mmoa bere a:

- Adwuma no wɔ asɛm no ID na ennya ntwaa mu.
- Server biako kyerɛ bere a foforo nso nkyerɛ.
- Nnansa yi ara na wotutuu no nanso ɛyerae si so dua wɔ bere a ebetumi aba sɛ wɔyɛɛ reorg akyi.
- Ɔsom a ɛgye no nwiee sɛ ɛbɛkan nsɛm a wɔasi so dua.
- Wo sika kotoku no da so ara reyɛ sync.

Mpɛn pii no ɛyɛ ahobammɔ sɛ wobɛsan de amena bere a sika kotoku no ahyɛ asɛm no agyirae pefee sɛ ne bere atwam anaasɛ adi nkogu akyi nkutoo, anaasɛ bere a mmoa no asi so dua sɛ mfitiase asɛm no ntumi nsi so dua akyi nkutoo.

## Nhwehwɛmu a Ɛyɛ Kokoam Nsɛm

Wubetumi ahwɛ mfitiase asɛm no tebea a worenda nsɛm pii adi nsen nea ɛho hia:

- Hwɛ sɛ wo sika kotoku no ayɛ sync koraa anaa.
- Hwɛ sɛ wallet app no ​​yɛ foforo anaa.
- Hwɛ sɛ asɛm no wɔ asɛm no ID anaa.
- Hwɛ sɛ wɔagye asɛm no atom, ɛda so ara wɔ hɔ, ne bere atwam, anaasɛ entumi nyɛ yiye anaa.
- Hwɛ mprempren block sorokɔ na fa toto transaction expiry height ho sɛ wo sika kotoku no kyerɛ a.
- Wɔ nnwuma a ɛda adi pefee ho no, block explorer betumi akyerɛ ɔmanfoɔ nkitahodi, address, botaeɛ, ne nsɛm a wɔasi so dua.
- Wɔ shielded transactions ho no, block explorer betumi akyerɛ sɛ transaction bi wɔ hɔ, nanso entumi nkyerɛ shielded sender, recipient, sika, anaa memo ho nsɛm.

## Nea Ɛnsɛ sɛ Yɛkyɛ Wɔ Baguam

Mfa eyinom nhyɛ baguam nkɔmmɔbɔ, sohyial media, anaa nsɛm a wɔde di akyi mu da:

- Aba kasasin anaa kasasin a wɔde san nya ahoɔden
- Spending key, private key, anaa sika kotoku a wɔde sie
- Full viewing key
- Screenshots a ɛkyerɛ sika a aka, address a edi mũ, memos, QR code, anaa exchange account ho nsɛm
- Ankorankoro ho nkrataa anaa akontaabu a wɔsan gye ho kyerɛwtohɔ

Transaction ID yɛ ɔmanfoɔ wɔ nkɔnsɔnkɔnsɔn no so, nanso ɛda so ara tumi de wo mmoa asɛmmisa no bata wo identity ho. Sɛ kokoam nsɛm ho hia a, kyɛ no ma mmoa kwan a wogye di nkutoo.

## Nea Mmoa Akuw Hia

Sɛ worebisa sika kotoku, nsakrae, anaa ɔsom mmoa mmoa a, kyɛ nsɛm a mfaso wɔ so kakraa bi nkutoo:

- Wallet anaa ɔsom din
- App version ne dwumadie nhyehyɛeɛ
- Sɛ́ ebia asɛm no yɛ nea wɔabɔ ho ban, ɛda adi pefee, anaasɛ ɛda address a wɔabɔ ho ban ne nea ɛda adi pefee ntam
- Transaction ID, sɛ wo ho tɔ wo sɛ wobɛkyɛ a
- Bɛyɛ bere a wɔde amena
- Sɛ ebia sika kotoku no ayɛ sync koraa anaa
- Mprempren tebea a sika kotoku no kyerɛ
- Mfomso nkrasɛm pɔtee, a wɔayi kokoam data afi hɔ
- Screenshot a wɔde sika a aka, address, memos, ne akontaabu ho nsɛm asie

Mmoa akuo nhia wo aba kasasin, sika a wode di dwuma safoa, kokoam safoa, anaa safoa a wode hwɛ ade nyinaa.

## Mfomso a Ɛtaa Tu

- **Sɛ yɛfa no sɛ sika kotoku biara a wɔakyerɛw ZEC no betumi de amena wɔ kokoam.** Sika kotoku dodow bi a ɛwɔ sika pii boa Zcash fã a ɛda adi nkutoo. Hwɛ sika kotoku no pools a wɔboa no ansa na wode wo ho ato so ama kokoamsɛm. No [Sika kotoku](https://zechub.wiki/using-zcash/wallets) kratafa no kyerɛw eyi ma ɔkwan biara a wobɛfa so.
- **Wɔtwe kɔ address a ɛda adi pefee so na wogyaw sika no wɔ hɔ.** Sika a wɔtwe no ankasa yɛ baguam, na akyiri yi biribiara a wobɛtu afi saa address no so no nso tra baguam. Bɔ sika no ho ban bere a wɔadu hɔ no.
- **Kokoamsɛm a wobɛfa no sɛ biribi a wobɛdan pɛnkoro.** Adwuma biara yɛ nea wobɛpaw a ɛyɛ soronko. Shielded a wode bɛmena nnɛ no ntumi nsan sika a wotuae a ɛda adi pefee a wotuae dapɛn a etwaam no.
- **Address a ɛda adi a wɔbɛsan de adi dwuma ama biribiara.** Esiane sɛ wotumi hu dwumadi a ɛda adi daa nti, address biako a wɔasan de adi dwuma no de nkakrankakra de sikatua a na enni ntease biara a enti ɛsɛ sɛ wɔde bata ho no bom.
- **Sending with an outdated default fee.** Walets a ennye ZIP 317 no da so ara betumi de flat fee dedaw no amena, a ebetumi ama asɛm bi atra ase a wontumi nsi so dua.
- **Resending before expiry.** Aguadiɛ a ɛda so ara tumi si so dua kɔsi sɛ ɛbɛtwa mu. Hwɛ expiry status ansa na woayɛ payment foforo.

## Hyɛ nso

Yɛsrɛ sɛ hyɛ no nsow sɛ ɔkwan a ahobammɔ wom sen biara a wobɛfa so de ZEC adi dwuma ne sɛ wode nnwuma a wɔabɔ ho ban bedi dwuma bere biara a nea ɔde kɔma, nea ogye, sika kotoku, ne ɔsom adwuma no nyinaa boa. Sika kotoku ne exchanges binom boa [address ahorow a wɔaka abom](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), a ebetumi aka Zcash agyefo ahorow pii abom ayɛ no address biako.

## Akadeɛ

- [ZIP 203: Aguadi no twam](https://zips.z.cash/zip-0203)
- [ZIP 317: Ɔkwan a Wɔfa so Tua Nneɛma a Wɔde Kɔma Afoforo a Ɛfata](https://zips.z.cash/zip-0317)
- [Zcash ZIP ahorow a wɔde yɛ adwuma](https://zips.z.cash/)

## Nkratafa a Ɛfa Ho

- [Sika kotoku](/using-zcash/wallets) - a wode sika kotokuo boa shielded sending, ne nea eye transparent nkoaa
- [Atare a Wɔabɔ Ho Ban](/using-zcash/shielded-pools) - Sapling ne Orchard, atare a wo sika a woabɔ ho ban no te mu
- [Memos a wɔde kyerɛw nsɛm](/using-zcash/memos) - encrypted messages a ebetumi de shielded transaction atu kwan
- [Address ahorow a wɔde sesa nneɛma a ɛda adi pefee](/using-zcash/transparent-exchange-addresses) - TEX address ne nea enti a exchanges de di dwuma
- [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges) - a esesa boa shielded withdrawals

## ZEC kɔ ZAT Nsakraeɛ
