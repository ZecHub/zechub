<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Adanse a wɔabɔ ho ban a ɛkyerɛ sɛ wɔatua sika ne sikatua ho nsɛm a wɔda no adi

## TL;DR

- Aguadi ID kyerɛ asɛm bi, nanso ɛnkyerɛ nea wɔabɔ ho ban, sika dodow, anaa memo.
- Wɔayɛ sikatua ho dawurubɔ bi sɛnea ɛbɛyɛ a nea ɔde kɔmaa no bɛda sika a wɔatua no biako ho nsɛm a wɔapaw adi a ɔrenka wɔn sika kotoku ho abakɔsɛm a aka no ho ntama.
- Viewing key ma kwan ma wɔkɔ so kenkan address anaa akontaabu bi. Fa di dwuma ma akontaabu a ɛkɔ so, na ɛnyɛ akasakasa a ɛfa sikatua biako ho.
- Katua a wɔda no adi no ntumi nkyerɛ sɛ wɔde nneɛma akɔma obi, n’ankasa ntumi nhu obi, ntumi nsan sika a wɔatua no, anaasɛ wɔmfa nkrataa a ɛkyerɛ sɛ wɔagye atom no nsi ananmu.
- [ZIP 311 na ɛwɔ hɔ](https://zips.z.cash/zip-0311) da so ara yɛ **Draft**. Ne mprempren nkyerɛwee no gyaw Orchard mmoa, transparent-input mmoa, encoding, versioning, ne user-interface mmara a wonwiei.

## Nea enti a transaction ID nnɔɔso

Obiara betumi ahwɛ ɔmanfo nsɛm a ɛfa Zcash sikatua a ɛda adi pefee ho. Block explorer betumi akyerɛ ne address, sika dodow, ne ne confirmation tebea.

Ɛsono sɛnea sikatua a wɔabɔ ho ban no yɛ adwuma. Nkɔnsɔnkɔnsɔn no di adanse sɛ asɛm no dii Zcash mmara akyi, nanso ɛntintim nea ɔde kɔmaa, nea ogyee, sika dodow, anaa memo a wɔabɔ no ho ban no. Sɛ wokyɛ asɛm no ID no a, ɛbɛtumi akyerɛ sɛ wɔtutuu asɛm bi, nanso ɛrentumi nkyerɛ aguadifoɔ anaa obi a ɔtɔ so mmiɛnsa sɛ kokoam sikatua bɛn na ɛwɔ mu.

Eyi de ɔhaw a mfaso wɔ so ba. Ebia ɛho behia sɛ adetɔfo bi siesie aguadifo ntam akasakasa, ebia ɛho behia sɛ exchange bi kyerɛ sɛ ɛyɛɛ sika a wɔayi afi mu ho adwuma, anaasɛ obi a ɔde mmoa mae no bɛpɛ sɛ ɔkyerɛ sɛ ɔde ntoboa biako mae. Sɛ wokyɛ safe a wɔde hwɛ ade nyinaa a, ɛbɛda pii adi asen nea nsɛm yi mu biara hwehwɛ.

[ZIP 311: Zcash Katua Ho Nsɛm a Wɔda no Adi](https://zips.z.cash/zip-0311) de mmuae a ɛyɛ teateaa ho nyansahyɛ ma: da nsɛm a wɔapaw afi asɛm biako mu adi na di ho adanse.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Sɛnea sikatua ho nsɛm a wɔda no adi yɛ adwuma

Nsu titiriw a ɛsen ne:

1. Ɔhwɛfoɔ no ma nea ɔde kɔma no no asɛnnennen anaa nkyerɛkyerɛmu soronko bi, berɛ a adanseɛ a ɛfa nkitahodiɛ ho fata.
2. Ɔsomafoɔ no paw asɛm no ne shielded output anaa outputs a ɔbɛda no adi.
3. Wallet software a ɛne no hyia no yɛ sikatua ho dawurubɔ a ɛbata saa asɛm no ho na, sɛ wopɛ a, asɛnnennen no.
4. Nea ɔde kɔmaa no de nsɛm a wɔada no adi no ma nea ɔhwɛɛ so no.
5. Ɔhwɛfoɔ no nya asɛm no ankasa firi Zcash node a wɔgye no di mu, ɔhwɛ sɛ wɔtu no, na ɔhwɛ sɛ wɔada no adi tia no.
6. Nea efi mu ba a ɛfata si nsɛm a wɔka wɔ saa asɛm a wɔada no adi no mu nkutoo so dua.

ZIP no Sapling nhyehyeɛ no de outgoing cipher key di dwuma de san nya output biara a wɔapaw. Eyi betumi ada nea ogye output no, ne dodow, ne memo adi. Ɛsan nso hwehwɛ adanse a ɛkyerɛ sɛ wɔsɛe sika wɔ anyɛ yiye koraa no asɛm biako a wɔde hyɛ mu, enti obi a ohu asɛm no ara kwa no ntumi nyɛ nsɛm a ɛfata a wɔda no adi te sɛ nea wɔde amena.

Ɛho nhia sɛ Sapling sikatua ho nkyerɛkyerɛmu da address a ɔde kɔmaa no adi. Tumi a wɔde di dwuma wɔ sika a wɔsɛe no mu tumi di address ahorow pii so, enti sɛ wodi adanse a ɛkyerɛ sɛ wodi sika a wɔsɛe no so a, ɛnkyerɛ address biako ara kwa. ZIP 311 no de address adanse a wobetumi apaw ka ho ma nsɛm a ɛho hia sɛ wɔde adanse no bata address a wonim sɛ ɔde kɔma no ho.

## Katua a wɔda no adi anaasɛ hwɛ safoa?

| Ɔkwan a Wɔfa so | Fa di dwuma yiye | Nea ɛda adi | Nkɔso a wɔde kɔ hɔ? | Cryptographically a wɔde kyekyere sika a wotua no ho? |
| --- | --- | --- | --- | --- |
| Nkitahodi ID | Hwɛ sɛ wɔatu asɛm bi | Ɔmanfoɔ nnwuma ho nsɛm ne nsɛm a wɔasi so dua | Dabi | Yiw, nanso sikatua ho nsɛm a wɔabɔ ho ban no da so ara sie |
| Screenshot anaasɛ krataa a wɔde gye | Kyerɛwtohɔ a wɔyɛ no ɔkwan biara so | Biribiara a nea ɔde kɔma no bɛpaw sɛ ɔbɛda | Dabi | Daabi; wobetumi asiesie mfonini no |
| Katua a wɔda no adi | Nsɛm a wɔapaw a ɛfa sikatua biako ho a wɔbɛda no adi | Nkitahodi mu nsunsuanso a wɔapaw ne nea ɛka ho biara a ɔde kɔma anaasɛ adanse a ɛkyerɛ sɛ ɛyɛ asɛnnennen | Dabi, nanso wobetumi ayɛ adanse a wɔakyɛ no ho mfonini | Yiw |
| Incoming Viewing Key | Sikatua a akontaabu bi nya no sohwɛ | Dwumadi a ɛba a safoa no kata so | Aane | Ɛdecrypt sika a ɛba a ɛne no hyia |
| Full Viewing Key | Akontaabu anaa akontaabu bi ho akontaabu | Dwumadie a ɛba ne nea ɛkɔ, sika dodoɔ, memos, ne sika a aka a safoa no kata so | Aane | Ɛdecrypt akontaabu dwumadi a ɛne no hyia |

Fa nsɛm a wɔda no adi ketewaa bi a ɛma asɛmmisa no ho mmuae di dwuma. Mpɛn pii no, aguadifo ntam akasakasa a ɛfa sika biako a wotua ho no mma ɛnyɛ nea ɛfata sɛ wobetumi anya sika biara a wotua wɔ akontaabu bi mu. Ebia akontaabufo a ɛsɛ sɛ ɔhwɛ amanneɛbɔ bere a edi mũ mu no behia safe a ɔde hwɛ ade mmom.

Ɔkwan abien no mu biara mma kwan sɛ wɔbɛsɛe sika. Mfa aba kasasin, sika a wɔsɛe no safe, kokoam safe, anaa sika kotoku a wɔde sie no nkyɛ da sɛ adanse a ɛkyerɛ sɛ woatua.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Dɛn na metumi de adi dwuma nnɛ?

Wɔnkyerɛɛ mprempren sika kotoku biara wɔ ha sɛ ɛde ZIP 311 akatua-da no adi adebɔ anaa nokwaredi redi dwuma. ZIP no da so ara yɛ draft na ɛkyerɛw ne reference implementation sɛ "TBD." Nnwinnade a wɔahwɛ so a edidi so yi da so ara betumi aboa nea ɔde kɔma, nea ogye, anaa akontaabufo a wɔama no tumi ma wahwɛ kyerɛwtohɔ ahorow a ɛwɔ hɔ nnɛ no:

| App | Mfaso wɔ so nnɛ ma | Anohyeto a ɛho hia |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Nhwehwɛmu a ɛkɔ akyiri a ɛfa asɛmdi ho metadata, sika dodoɔ, pool inputs ne outputs, ne memos; importing Unified anaa Sapling viewing keys kɔ akontaabu a wɔhwɛ nkutoo mu | Ɛnbɔ ZIP 311 dawurubɔ adebɔ anaa nokwaredi ho dawuru |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Aguadi ho abakɔsɛm ne nkrataa a wɔabɔ ho ban a wɔbɛsan ahwɛ mu; importing a Unified Full Viewing Key wɔ akenkan nkutoo tebea mu | Wallet kyerɛwtohɔ anaa akontaabu a wɔkenkan nkutoo nyɛ sikatua a wɔda no adi a wɔapaw no kɛse |
| [Zallet](https://zcash.github.io/zallet/) | Operator adwumayɛ nhyehyɛe ahorow a wɔde di dwuma `z_viewtransaction`, `z_exportviewingkey`, ne `z_importviewingkey` | Beta softwea a wɔde di dwuma; ne viewing-key ne transaction RPCs yɛ trɛw anaa mpɔtam hɔ kyerɛwtohɔ, ɛnyɛ ZIP 311 adanse |

Fa sika kotoku a ɛde sika no kɔmaa anaa egyee no di kan di dwuma. Hwɛ n’adwuma ho nsɛm, ne memo, asɛm no ID, ne nea esi so dua, afei ka kyerɛ ɔfã foforo no sɛ ɔmfa saa nsɛm no ntoto n’ankasa kyerɛwtohɔ ahorow ho. Mfa sika kotoku foforo nhyɛ mu na kyerɛw aba kasasin bi sɛnea ɛbɛyɛ a wode adanse bɛma kɛkɛ. Sɛ akontabuo hia sɛ wɔkɔ so hu a, susuw akontaabu a ɛfata a ɛfa hwɛ nkutoo ho na te hwɛ safoa no kɛse ase ansa na woakyɛ.

Saa app ahorow yi yɛ akwan foforo a mfaso wɔ so a wɔfa so hwɛ kyerɛwtohɔ ahorow mu, ɛnyɛ adanse a ɛkyerɛ sɛ sikatua ho nkyerɛkyerɛmu a wɔahyɛ da ayɛ wɔ hɔ. Screenshot betumi aboa nkurɔfo ma wɔde kyerɛwtohɔ ahorow atoto ho, nanso wotumi sesa na ɛnyɛ cryptographic adanse.

## Baabi a sikatua ho nsɛm a wɔda no adi no fa ho

### Aguadifo ntam ntawntawdi

Adetɔfo bi betumi akyerɛ sɛ wɔde sika pɔtee bi kɔmaa aguadifo no address a wɔabɔ ho ban no. Adanse no nkyerɛ sɛ wɔde nneɛma kɔe, sɛ wɔde sika a wɔde bɛsan ama no ka, anaasɛ onipa a ɔde reba no wɔ mmara kwan so nipasu pɔtee bi. Saa nsɛmmisa no da so ara gyina ahyɛde ho kyerɛwtohɔ ne afã horow no apam so.

### Nneɛma a wɔde yi sika a wɔabɔ ho ban

ZIP 311 kyerɛw sika a wɔayi afi mu a wɔabɔ ho ban sɛ botae a wɔde bedi dwuma: nsakrae bi bɛkyerɛ nea ogye ne sika dodow a wɔrentintim saa nsɛm no wɔ nkɔnsɔnkɔnsɔn so. Ne transparent-input adanse no da so ara nwiei, enti eyi nnya nyɛɛ adwumayɛ nhyehyɛe a wɔahyɛ da ayɛ a edi mũ. Ɛsɛ sɛ adetɔfo no nso hwɛ sɛnea asɛm no si so dua no wɔ ne ho.

### Ntoboa a Wɔde Ma

Ɔdemafo anaa ɔsatu bi betumi ada ntoboa pɔtee bi adi bere a ogyaw sikatua a ɛne no nni abusuabɔ no kokoam no. Sɛ wotintim nea wɔada no adi no a, ɛma obiara a ne nsa ka bi no nya ne nsɛm a wɔapaw no baguam, enti kokoam kwan a wɔfa so hwɛ sɛ ɛyɛ nokware no yɛ nea ahobammɔ wom bere a ɔmanfo adanse ho nhia no.

### Akontaabu ho nimdeɛ

Fa sikatua ho dawurubɔ di dwuma bere a akontaabufo bi hia adanse wɔ asɛm biako ho no. Fa safoa a ɛyɛ teateaa a ɛfata a wode hwɛ nneɛma di dwuma bere a akontaabufo no hia sɛ ɔkɔ so nya nnwuma pii anaasɛ amanneɛbɔ bere a edi mũ no.

## Adwumayɛ nhyehyɛe a ahobammɔ wom a wɔde sie

ZIP 311 nnya nyɛɛ sika kotoku gyinapɛn a wɔawie, a wotumi de di dwuma kɛse. Sɛ nnwinnade a ɛne nea ɔde kɔma ne nea ɛkyerɛ sɛ ɔyɛ nokware no hyia ba a, fa nhwehwɛmu kratasin yi di dwuma:

1. **Di kan si so dua sɛ ɛne ne ho hyia.** Ɛsɛ sɛ nnwinnade abien no nyinaa boa nsɛm a wɔda no adi no kwan koro no ara ne shielded pool a sikatua no de di dwuma no.
2. **Di kan siesie ɔhaw a ɛyɛ mpapahwekwa.** Hwɛ wallet sync, transaction ID, confirmation count, expiry status, ne nea ogye no kyerɛwtohɔ ansa na woada kokoam nsɛm adi.
3. **Besrɛ asɛnnennen.** Sɛ akasakasa bi ba a, ɛsɛ sɛ nea ɔhwɛ so no de order nɔma foforo anaasɛ random challenge ma enti nea wɔda no adi no bata saa abisade no ho.
4. **Paw output a ehia nkutoo.** Mfa outputs a enni abusuabɔ a efi asɛm koro no ara mu nka ho.
5. **Hwɛ afuw biara a wɔada no adi no hwɛ.** Hwɛ nea ogye no, sika dodow, memo, nea ɔde kɔmaa-address adanse, ne asɛnnennen ansa na wode akɔ amannɔne.
6. **Kyɛ denam kokoam kwan so.** Nsɛm a wɔda no adi nyɛ sika a wɔsɛe no wɔ kokoam, nanso obiara a obenya no betumi akora nsɛm a ɛda no adi no so anaasɛ ɔbɛsan akyekyɛ.
7. **Verify against the chain.** Ɛsɛ sɛ verifier no gye asɛm no pɛpɛɛpɛ fi node a wogye di mu, si so dua sɛ ɛwɔ network a wɔpɛ sɛ wɔyɛ no mu na siw ano, afei ɔgye di a wɔada no adi no tom.
8. **Twerɛ nea efi mu ba no to hɔ, ɛnyɛ ahintasɛm foforo.** Fa nea akasakasa, sika a woyi fi mu, ntoboa, anaa akontaabu nhyehyɛe no hwehwɛ nkutoo sie.

Sɛ sika kotoku no ntumi mma nsɛm a wɔda no adi a, mfa safoa a wɔde hwɛ ade nyinaa nsi ananmu a wonte nea ɛtrɛw na ɛtra hɔ daa no ase. Bisa sɛ ebia nea ogye no betumi afi n’ankasa sika kotoku mu kyerɛwtohɔ ahorow mu asi sika a wɔatua no so dua anaasɛ obegye kyerɛwtohɔ a ɛnyɛ nea ɛho hia kɛse mmom.

## Nea nsɛm a wɔda no adi a ɛfata nkyerɛ sɛ ɛyɛ nokware

Nhwehwɛmu a edi mu a ɛkyerɛ sɛ:

- Sɛ asɛm no wɔ confirmations a ɛdɔɔso ma verifier no asiane nhyehyɛe
- Sɛ nkɔnsɔnkɔnsɔn nhyehyɛe foforo ntumi nyi asɛm bi a wɔayɛ nnansa yi mfi hɔ
- Sɛ wɔde nneɛma anaa nnwuma a wɔde ma
- Sɛ wɔhwehwɛ sɛ wɔsan de sika no ma anaasɛ wɔsan tua ho ka
- Sɛ nea ɔde kɔma no no na ɔhwɛ address pɔtee bi so, gye sɛ wɔde address ho adanse a ɛfata ka ho
- Sɛ onipa a ɔde nsɛm a wɔada no adi no rema no wɔ wiase ankasa nipasu a wɔkyerɛ sɛ ɔyɛ
- Sɛ nneɛma a wɔankyerɛ, nneɛma afoforo a wɔyɛ, anaa sika kotoku no mu sika a aka no wɔ bo pɔtee bi
- Sɛ nsɛm a wɔda no adi no da so ara yɛ kokoam bere a wɔakyɛ awie no

Ɛsɛ sɛ nea ɔhwɛ so no hwɛ nkɔnsɔnkɔnsɔn a wɔde ka ho ne nea wɔagye atom tebea no wɔ ɔkwan soronko so. ZIP 311 no nokwaredi nhyehyɛe no fa no sɛ nea ɔfrɛ no no anya asɛm a wɔatu no ne ne block sorokɔ dedaw.

## Mprempren anohyeto ahorow

Fa ZIP 311 sɛ gyinapɛn a wɔahyɛ ho nyansa, ɛnyɛ sɛ bɔhyɛ sɛ mprempren sika kotoku wɔ **Dae sɛ wotua ho adanse** bɔtn a ɛyɛ adwuma.

Mprempren draft no kyerɛ Sapling sika a wɔsɛe no ne nea wɔde fi adi, nanso ɛda so ara kura nneɛma a wonwiei ma Orchard, nsɛm a wɔde hyɛ mu a ɛda adi pefee, nsɛm a wɔda no adi encoding, versioning, ne sɛnea ɛsɛ sɛ sika kotoku kyerɛ sɛnea ɛyɛ nokware. Wɔakyerɛw ne nkyerɛkyerɛmu dwumadie nso sɛ "TBD." Sɛnea wɔakyerɛw no, ɛnkyerɛkyerɛ sikatua a wɔda no adi wɔ Orchard anaa Ironwood sikatua ho.

Ebia nea ɔde amena no nso rentumi nna nea ɛbɛba no adi sɛ wɔhyɛɛ da yɛɛ asɛm no a na enni safoa a wɔde hwɛ ade a ɛkɔ so mma saa nsɛm no a. ZIP 311 kora saa kokoamsɛm a wɔpaw no so sen sɛ ɛbɛbɔ ɔkwan foforo a wɔfa so san nya ahoɔden.

Nwoma dedaw kyerɛkyerɛ sɔhwɛ no mu `z_getpaymentdisclosure` ne `z_validatepaymentdisclosure` ahyɛde ahorow wɔ `zcashd`. Saa ahyɛdeɛ no boaa **Sprout JoinSplit outputs nko ara**, ɛnyɛ Sapling nhyehyɛɛ a ɛwɔ ZIP 311 mu, na wɔgyaee. `zcashd` reached its final End-of-Support halt in July 2026. Mfa saa agyapadeɛ nanteɛ no nni dwuma sɛ akwankyerɛ ma mprempren sika.

Saa nsonsonoe ahorow yi mma adwene no nyɛ nea mfaso nni so. Wɔkyerɛkyerɛ nea enti a ɛsɛ sɛ akwankyerɛ a wɔde ahwɛyiye de di dwuma no tetew kokoam nsɛm ho nhwɛso ne nsɛm a wɔde di dwuma no mu fi softwea a wɔasiesie ama wɔn a wɔde di dwuma kwa no mu.

## FAQ

### So metumi de asɛm no ID nkutoo akyerɛ sɛ wɔatua sika a wɔabɔ ho ban?

Dabi ID no betumi akyerɛ asɛm no ne ne gyinabea a ɛkyerɛ sɛ wɔagye atom, nanso nea wɔabɔ no ho ban, sika dodow, ne memo no nyɛ baguam.

### So sikatua a wɔda no adi ne safe a wɔde hwɛ ade yɛ pɛ?

Dabi, wɔde nsɛm a wɔda no adi no kɔ asɛm biako ho nsɛm a wɔapaw so. Safoa a wɔde hwɛ ade betumi ada dwumadi a ɛne address anaa akontaabu bi hyia adi bere a bere kɔ so no.

### So nea ogye no betumi ayɛ nea ɔde kɔmaa no no adanse?

Ɛnyɛ ZIP 311 nhyehyɛe no ase. Ɛsɛ sɛ asɛm a wɔda no adi a ɛfata kyerɛ sɛ ɛwɔ tumi a wɔde di dwuma wɔ anyɛ yiye koraa no nsɛm biako a wɔde hyɛ mu ho. Nea ogye no betumi de wɔn ankasa sika kotoku ho kyerɛwtohɔ asi sika a wɔatua no so dua, nanso ɛno yɛ asɛm foforo.

### So metumi atwa asɛm bi a wɔada no adi no mu bere a makyɛ awie no?

Dabi Ɛmma daakye akontaabu kwan te sɛ safe a wɔde hwɛ nneɛma, nanso wobetumi ayɛ data ne adanse a wɔada no adi no ho mfonini. Fa ahwɛyiye kyɛ te sɛ ankorankoro sikasɛm ho kyerɛwtohɔ biara.

### So verification tu anaasɛ ɛtow ZEC biara?

Dabi, sɛ wobɔ anaa wohwɛ sɛ woada no adi a, ɛnsɛe sika, nsan mfa mma, mfa nsie, anaasɛ ɛnsan nsan.

### Sɛ me sika kotoku no nni ade biara a ɛma woda nneɛma adi a, dɛn na ɛsɛ sɛ mede di dwuma nnɛ?

Fi ase de nea wogye no sika kotoku ho kyerɛwtohɔ, asɛm no ID ne si so dua tebea, invoice reference a ɛwɔ encrypted memo no mu, anaa krataa foforo a obiara gye tom. Fa safe a wɔde hwɛ ade di dwuma bere a ne kɛse no ho hia ankasa na wɔate ase nkutoo.

## Akadeɛ

- [ZIP 311: Zcash Katua Ho Nsɛm a Wɔda no Adi](https://zips.z.cash/zip-0311) - nhyehyeee a woahyehye no, ahwehwde, nhyehyeee a wode di adansee, ne kokoam ho nsusuwii
- [ZIP 310: Ahobanbɔ Su a ɛwɔ Sapling Viewing Keys mu](https://zips.z.cash/zip-0310) - dee viewing keys da no adi ne guarantees a wode ma
- [ZIP 304: Sapling Address Nsaano Nkyerɛwee](https://zips.z.cash/zip-0304) - a wopaw address-adanse afiri a ZIP 311 twe adwene si so
- [Zcash protocol nkyerɛkyerɛmu](https://zips.z.cash/protocol/protocol.pdf) - Sapling note encryption, outgoing viewing keys, ne sika a wɔde di dwuma ho tumi krataa
- [Archived zcashd sikatua-da no adi krataa](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - abakɔsɛm mu Sprout-only implementation, ɛnyɛ mprempren akwankyerɛ
- [zcashd deprecated nneɛma a ɛwɔ hɔ](https://zcash.github.io/zcash/user/deprecation.html) - tebea a ewo nhwehwmu a woda no adi ahyedee dedaw no mu

## Nkratafa a ɛfa ho

- [Nkitahodi ahorow](/using-zcash/transactions) - a woabobɔ ho ban tua, confirmations, ne transaction haw ano aduru
- [Nsafe a wɔhwɛ](/zcash-tech/viewing-keys) - a ɛkɔ so akenkan nko ara kwan ne mprempren export options
- [Nea block explorer betumi ahu](/zcash-tech/what-a-block-explorer-can-see) - aban ne ankorankoro nkitahodie afuo
- [Kyerɛwtohɔ a wɔde ZEC a wɔabɔ ho ban no sie](/zcash-use-cases/keeping-records-with-shielded-zec) - akontabuo a wontintim wallet abakɔsɛm
