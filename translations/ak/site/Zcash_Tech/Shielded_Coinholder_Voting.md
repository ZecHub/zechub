<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded Coinholder Abatow a Wɔtow

> Wɔ August 2026 mu no, Zcash yɛɛ coinholder poll a abatow nkrataa no kɔɔ so yɛɛ encrypted na wɔdaa dodow a etwa to nkutoo adi, de shielded voting protocol a Valar Group.

Nea wobɛfa: sɛnea wobetumi de ZEC dodow a wokura, de asie kokoam, na wɔda so ara kan no yiye, ne nyinaa a obiara nsua sɛnea wotow aba anaa dodow a wowɔ no akari abatow bi.

Shielded coinholder voting ma Zcash holders tow aba wɔ ecosystem nsɛmmisa ho denam wɔn shielded ZEC. Obiara nsua nea ankorankoro biara too aba anaa ZEC dodow a wokura, nanso obiara betumi ayɛ akontaabu sɛ ne nyinaa teɛ. Ɛyɛ adwuma wɔ abatow nkɔnsɔnkɔnsɔn a wɔatu ho ama a Valar Group, a ɛyɛ soronko wɔ Zcash mainnet ho, enti wo sika ankasa ntumi nkɔ da. Sɛ wopɛ sɛnea Zcash si gyinae wɔ ɔkwan a ɛtrɛw so a, hwɛ [Zcash Sikasɛm ne Aban ho nsɛm](../zcash-community/zcash-governance). Saa krataafa yi fa cryptographic voting protocol no nkutoo ho.

Ɛyɛ foforo wɔ Zcash? Fi ase fi ase [Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash), [Atare a Wɔabɔ Ho Ban](../using-zcash/shielded-pools), ne [zk-SNARKs](../zcash-tech/zk-snarks), afei san bra ha.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Nea enti a kokoam abatow yɛ den

Sikakorabea abatow pa pɛ nneɛma anan prɛko pɛ, ne akwan a ɛda adi pefee a wɔbɛfa so ama wɔako atia wɔn ho wɔn ho.

1. Weight by stake, enti sɛ wokura ZEC pii a, ɛde emu duru pii.
2. Privacy of choice, enti obiara nsua sɛnea wotoo aba.
3. Privacy of balance, enti obiara nsua ZEC dodow a wokura.
4. Nkontaabu a ɛteɛ, a wotumi bu ho akontaa a obiara betumi ahwɛ mu.

Sɛ wobɛkari pɛ a, ɛte sɛ nea wuhia obiara kari pɛ. Sɛ wobɛkan abatow nkrataa a ɛte sɛ nea ɛsɛ sɛ wubue. Sɛ woyɛ ɔkwan a ɛyɛ naive no so biara a, ɛma kokoam nsɛm no pue pɛpɛɛpɛ a [ɔtare a wɔabɔ ho ban](../using-zcash/shielded-pools) wɔ hɔ sɛ ɛbɛbɔ ho ban, na sika a wɔde tow aba kan no maa nsɛm a ɛkari pɛ no puei ampa esiane eyi nti. Abatow a wɔabɔ ho ban de nnwinnade koro no ara a ɛma sikatua a wɔabɔ ho ban no tumi siesie nhyɛso no: [adanse a wonni nimdeɛ biara](../zcash-tech/zk-snarks), nullifiers, ne nsɛm a wɔde sie.

## Intuition: abatow adaka a ɛkan ne ho

> Turstile ma wutumi kan nea ɛfa sikakorabea bi a wɔde nneɛma gu mu a wunhu mu. Abatow adaka a wɔabɔ ho ban kɔ akyiri anammɔn biako: ɛka abatow a wɔatoto ano bom a enmmue da.

Fa w’adwene bu abatow adaka bi a tumi abiɛsa a ɛyɛ soronko wom. Ebetumi de envelope a wɔatoto mu aka running total ho a ɛremmue. Akyiri yi mpanyimfo kuw bi a obiara nni hɔ a okura safe no, da dodow a etwa to nkutoo adi. Na ansa na ebia wobɛtow envelope bi agu mu no, woda no adi komm sɛ wokuraa ZEC wɔ bere pɔtee bi a atwam mu na woantow aba dedaw, a wonkyerɛ sika a ɛyɛ wo de. Biribiara a ɛwɔ ase hɔ no yɛ sɛnea wɔkyekyee saa adaka no ankasa.

## Fata a wɔfata ne mfonini a wɔayɛ no ntɛm

A voting round fixes a snapshot height, biako Zcash mainnet block, na wo mu duru yɛ wo spendable shielded balance wɔ [Ironwood](../zcash-tech/ironwood) pool a ɛwɔ saa block no so. Mmara no yɛ Ironwood ZEC biako pɛ wɔ mfonini no so a ɛne abatow biako yɛ pɛ. Wɔ NU7 scope poll no mu no na snapshot no yɛ mainnet block 3,459,350, bɛyɛ August 24, 2026 wɔ 19:00 UTC, a abatoɔ abue kɔsi September 14, 2026 wɔ 19:00 UTC. Transparent ZEC, wɔde ɔkwan dedaw no di ho dwuma wɔ ɔkwan soronko so, ɛnyɛ saa protocol yi so.

1. Wo sika ntu da na wɔanto mu da. Wɔahyɛ fata a ɛfata wɔ mfonini no so, enti wobɛtumi asɛe anaa wobɛtu ZEC ntɛm ara wɔ ɛno akyi a ɛrenka wo abatoɔ.
2. Anamɔn biara nni hɔ a wɔde kyerɛw wɔn din. Mfonini a ɛkɔ soro ara ne nea ehia, na ɛma adeyɛ no yɛ hare na ɛkwati sɛ ɛbɛda onii a wabɔ ne tirim sɛ ɔbɛtow aba adi.

## Wo kari pɛ a wobɛda no adi a worenda no adi

Sɛ woto aba a, wo sika kotoku no de adanse a ɛkyerɛ sɛ nimdeɛ a enni mu ba sɛ wɔ mfonini no mu no wodii ZEC. Ɛde sika a ɛkari pɛ ne ne kɛse si hɔ ma ankorankoro akontaabu mfiri no, nanso ɛnda nsɛm biara adi na ɛnyɛ asɛm biara wɔ Zcash mainnet so.

Saa adanse no mints abatow credit wɔ abatow nkɔnsɔnkɔnsɔn no so a ɛne wo snapshot balance yɛ pɛ, a ɛyɛ abatow safe foforo a wo sika kotoku no de ba ma saa round yi nkutoo. Esiane sɛ safoa no yɛ foforo na ɛne wo Zcash address ahorow no nni abusuabɔ nti, biribiara nni abatow nkɔnsɔnkɔnsɔn no so a wobetumi ahwehwɛ mu akɔ wo nsɛm a woakyerɛw ankasa no so. Wo on-chain identity ne wo ballot no ntumi nkɔ so wɔ adansi mu.

## Abatow mprenu a wobesiw ano, wɔ kokoam

Sɛnea ɛbɛyɛ na obiara agyae sika koro no ara a ɔde bɛtow aba mprenu no, ɛsɛ sɛ nhyehyɛe no si so dua sɛ wɔansɛe sika a ɛwɔ wo sika a aka no akyi no wɔ mfonini no mu. Wɔ mainnet so no wɔyɛ eyi denam nkyerɛwde bi nullifier a wɔda no adi, ne spent-marker soronko, a nodes a ɛyɛ pɛ hwɛ sɛ wɔde di dwuma bio no so. Nanso sɛ woda wo nullifier adi wɔ ha a, ɛbɛma wo abatow krataa no asan akɔ wo nsɛm a woakyerɛw no so tẽẽ.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Enti protocol no di nea ɛne eyi bɔ abira ho adanse wɔ kokoam. Ɛkyekye nullifier biara a wɔde adi dwuma dedaw sɛnea wɔyɛɛ mfonini no din, na wo sika kotoku no di adanse wɔ nimdeɛ a ɛnyɛ hwee mu sɛ wo nkyerɛwde no nullifier no nni saa nkyerɛwde no mu, na ɛkyerɛ sɛ wɔansɛe nkyerɛwde no a ɛnkyerɛ nkyerɛwde a ɛyɛ.

Ɔhaw biako da so ara wɔ hɔ. Sɛ wofa saa list no slice a ɛhia firi server bi so a, ɛbɛda wo nullifier no adi akɔ server no so, na list no nyinaa yɛ kɛseɛ, bɛyɛ 2 GB ma Orchard-era data na ɛsõ koraa berɛ a Zcash nyin. [Kokoam Nsɛm a Wɔgye](../zcash-tech/private-information-retrieval) (PIR) di abien no nyinaa ho dwuma: wo sika kotoku no gye data a ehia no pɛpɛɛpɛ bere a ɛde data a ɛsrɛɛ no sie wɔ cryptographic kwan so. Wɔhwɛ nea efi mu ba no de toto nullifier list no mu nsɛm tiawa a wɔatintim ho, enti server a onni nokware ntumi nnyɛ atoro aba.

## Abatow krataa a wɔde encrypt ahyɛ mu a wɔtow

Wɔ asɛmmisa biara ho no, wo sika kotoku no yɛ nneɛma abiɛsa.

1. Ɛde homomorphic encryption, encryption bi a wobetumi de ne ciphertexts aka ho a wɔrenkyerɛkyerɛ mu no de sie wo abatow mu duru no kɔma boayikuw a wɔkan no. Eyi ne nea ɛma adaka no total abatow a entumi nkenkan.
2. Ɛkyekyɛ wo abatow no mu yɛ no kyɛfa ahorow 16, ma enti boayikuw a wɔayɛ biako koraa mpo bɛpere sɛ wɔbɛsan aboaboa dodow a onipa biako biara ne no too aba no ano.
3. Ɛde saa kyɛfa no mena wɔ mmere a wɔanhyɛ da mu denam server ahorow pii so, enti obi a ɔhwɛ ade no ntumi nkyerɛ sɛ kyɛfa no yɛ obi a ɔtow aba koro no ara de bere a wɔadu hɔ no.

Kyɛfa biara kura n’ankasa adanse a enni nimdeɛ biara a ɛkyerɛ sɛ ɛyɛ abatow krataa a ɛfata mu fã a ɛfata, enti obiara ntumi mfa abatow a wɔanhyɛ akyi nka ho. Wɔde kyɛfa a wɔagye atom no homomorphically de ka encrypted running total no ho ma mmuae a woapaw.

## Kan a wɔkan a wonbue abatow krataa biara

Abatow ho aban a wɔakyekyɛ na ɛhwɛ akontaabu no so: anyɛ yiye koraa no, abatow-kɔnsɔnkɔnsɔn a ɛma wogye tom 10, a wɔn mu biako mpo ntumi nkyerɛkyerɛ biribiara mu. Wɔ round bi mfiase no wɔbom yɛ key-generation guasodeyɛ a ɛma encryption key a ne decryption key a ɛne no hyia no mu apaapae wɔ wɔn nyinaa mu na wɔaboaboa ano da wɔ beae biako.

> Ɔpanyin biako biara nni hɔ a okura safe no. Bere a wɔn mu nkyem abiɛsa mu abien dannan wɔn nsafe no bom nkutoo na adaka no bue, na ɛno mpo no, ɛda ne nyinaa dodow nkutoo adi.

Sɛ round no to mu a, encrypted totals no wɔ hɔ dedaw fi homomorphic addition a ɛwɔ atifi hɔ no mu. Validator biara tintim decryption fã bi a wɔde adanse a ɛkyerɛ sɛ ɔdecrypt no yiye ka ho. Sɛ anyɛ yiye koraa no, nkyem abiɛsa mu abien boa wie a, wɔn afã horow no bom yɛ nsɛmmisa biara a etwa to a emu da hɔ, na wɔmfa biribiara nsie da. Afei node biara a ɛyɛ pɛ betumi ahwɛ adanse a ɛkyerɛ sɛ ɛteɛ a wɔaka abom no, enti ɔmanfo betumi ahwɛ sɛ akontaabu no yɛ nokware a wonni wɔn a wɔma ɛyɛ nokware no mu ahotoso.

## Hena na ɔtu mmirika, ne nea wontumi nyɛ

Nsusuwii no tetew dwumadi abien mu enti kuw biara nni tumi a ɛboro so.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Ntamgyinafo multisig no yɛ kuw a emufo yɛ 2 wɔ 5 mu a ananmusifo fi Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), ne Valar Group. Ɛsi nsɛmmisa a ɛbɛduru nkɔnsɔnkɔnsɔn no so ho gyinaeɛ na ɛdi adanseɛ wɔ round biara encryption key no ho, nanso entumi nhunu, nsakra, anaa nsiw ankorankoro abatoɔ ano. Obiara a n’ani nnye nsɛmmisa no ho no betumi ayɛ n’ankasa abatow nkɔnsɔnkɔnsɔn, efisɛ software no abue na enni ho kwan.

Validators no yɛ anyɛ yiye koraa no-10 nodes a ɛkura split decryption key no na ɛyɛ threshold decryption no. Wontumi nkyerɛkyerɛ ankorankoro abatow nkrataa mu anaasɛ wɔnyɛ atoro akontaabu, efisɛ decryption biara de baguam adanse a ɛkyerɛ sɛ ɛteɛ no mena.

## Nea quorum no yɛ ma

Wɔn a wɔyɛ nhyehyɛe no de kyɛfa a wɔde bɛhyɛ mu no si hɔ: sɛ anyɛ yiye koraa no ZEC 1,000,000 de wɔn ho hyɛ asɛmmisa biako mu nkutoo a, na wobu abatow no mu aba no sɛ sikakorafo ananmusifo nkutoo. Quorum no nsi asɛmmisa biara ho gyinae na wɔmfa nni dwuma wɔ asɛmmisa biara mu. Ɛyɛ nhwehwɛmu biako pɛ wɔ abatow no nyinaa mu, enti bere a ZEC dodow kɛse bi da adi nkutoo na wɔfa nea efi mu ba no aniberesɛm. Wɔ saa gyinabea no ase no, wommu nea ebefi mu aba no sɛ sɛnkyerɛnne a ntease wom.

## Nea saa protocol yi mmɔ ho ban mfi ho

Sɛ́ wobɛma emu ada hɔ wɔ anoano no ho no yɛ sɛnea wɔte sɛnea wɔayɛ no ase no fã.

1. Ɛyɛ sɛnkyerɛnne, na ɛnyɛ gyinaesi a ɛkyekyere. Coinholder poll susuw nkate a wɔde stake kari no na ɛde aduan kɔ Zcash's mu [nniso nhyehyɛe](../zcash-community/zcash-governance) mmom sen sɛ wɔde besi ananmu.
2. Wɔde sika na ɛkari, enti nkɛntɛnso di nneɛma a wokura akyi. Ebia friction a ɛba fam no bɛma nnipa dodow a wɔba no akɔ soro nanso ɛnsakra ZEC.
3. Agenda no yɛ nea coordinator multisig na ɔpaw nsɛmmisa a ɛbɛpue. Entumi nka abatow, na obiara betumi atu mmirika akɔ nkɔnsɔnkɔnsɔn a ɛne wɔn ho wɔn ho di asi, nanso nhyehyɛe a wɔde si hɔ no da so ara yɛ nkɛntɛnso.
4. Counting hia validators wɔ intanɛt so. Anyɛ yiye koraa no, akontaabu no a wɔbɛyɛ no hwehwɛ sɛ wɔn mu nkyem abiɛsa mu abien yɛ biako, enti sɛ wɔagyae adwumayɛ kɛse anaasɛ wɔpow a wɔayɛ no biako a, ebetumi ama nea ebefi mu aba no akyɛ.
5. Kokoamsɛm a ɛkari pɛ wɔ apam a edi mũ ase no yɛ ahobammɔ a emu dɔ, ɛnyɛ nsusuwii hunu. Sɛ boayikuw no nyinaa san yɛɛ safe no wɔ kokoam a, kyɛfa a wɔkyekyɛ mu ne bere a wɔde bɛma no ne nea ɛbɔ wo kari pɛ ho ban, na wɔn a wɔyɛɛ no gye tom sɛ eyinom yɛ mmerɛw wɔ apam ase. Kar akwan ho nhwehwɛmu a ɛyɛ nwonwa yɛ asiane a aka.
6. Afã horow a ɛkeka ne ho pii sen sɛnea wɔayɛ no dedaw no. PIR servers, submission servers, voting key foforo, ne multi-stage proofs biara yɛ beae a mfomso anaa nhyehyɛe a ɛnteɛ betumi ada adi. Nhyehyɛe no yɛ nea wɔabue ano na wɔayɛ afã horow no ho akontaabu wɔ ahofadi mu, a ɛhwɛ saa asiane no so sen sɛ ebeyi afi hɔ.

Nea ɛbɔ ho ban, denneennen na wotumi di ho adanse, ne nneɛma abien a ɛho hia kɛse: wontumi mfa wo abatow krataa no ntoto wo nipasu ho, na dodow a etwa to nkutoo na wɔda adi da.

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Voting chain | Blockchain a ɛyɛ soronko, a Valar Group, a ɛhwɛ abatow no so; wo Zcash nkrataa no nkɔ so da |
| Snapshot height | Mainnet block a ne balances de abatow mu duru si hɔ (block 3,459,350 ma NU7 nhwehwɛmu no) |
| Nullifier | A note’s spent-marker soronko; sɛ wɔda no adi a, ɛde abatow krataa bɛbata krataa bi a wɔakyerɛw ho, enti abatow da no adi sɛ ɔnyɛ asɔremma mmom |
| Private Information Retrieval (PIR) | Data a wobɛfa afi server so bere a wode data a wobisae no sie |
| Homomorphic encryption | Encryption a wobetumi de ne ciphertexts aka ho a wɔmfa decrypt |
| Coordinator multisig | Kuw a wɔyɛ 2-of-5 a wɔma nsɛmmisa ne safe kurukuruwa no kwan, nanso wontumi nhu anaasɛ wontumi nsakra abatow |
| Election authority | Validators 10 anaa nea ɛboro saa a wɔbom kura split decryption key no na wɔda tally a etwa to nkutoo adi |
| Threshold decryption | Nea ebefi mu aba a wɔbɛsan anya bere a wɔn a wɔwɔ kyɛfa titiriw a wɔdɔɔso, wɔ ha no, nkyem abiɛsa mu abien, yɛ biako nkutoo |
| Quorum | ZEC 1,000,000 a wɔde wɔn ho bɛhyɛ mu a ɛba fam koraa ma abatow no a wobebu no sɛ ɛyɛ ananmusifo |

## FAQ

So me sika no tu anaasɛ wɔto mu bere a metow aba no? Dabi, wɔsusu fata a wɔfata wɔ snapshot block no so, enti wo ZEC tra hɔ na wotumi sɛe. Abatow ma adanse ahorow ba nkɔnsɔnkɔnsɔn a ɛyɛ soronko so, ɛnyɛ Zcash asɛm.

Obi betumi aka sɛnea metow aba anaa dodow a mikura? Dabi, wɔde encryption ahyɛ abatow nkrataa mu na wɔabɔ abatow a wɔaka abom nkutoo. Wo abatow no ne wo nipasu nni abusuabɔ, na wɔakyekyɛ wo sika a aka no mu ayɛ no kyɛfa 16 a wɔde bere ahyɛ mu de abɔ ho ban afi boayikuw a wɔayɛ biako mpo ho.

Dɛn na esiw obi kwan sɛ ɔbɛtow aba mprenu, anaasɛ ɔde sika a onni tow aba? Abatoɔ krataa biara kura adanseɛ a nimdeɛ biara nni mu sɛ wɔde mfonini a ɛkari pɛ ankasa a wɔansɛe no na ɛhyɛ akyi, na adanseɛ a ɛnyɛ asɔremma a egyina PIR so kyerɛ sɛ wɔansɛe sika a ɛwɔ aseɛ no dedaw, a ɛnkyerɛ nkyerɛwdeɛ a ɛyɛ.

Hena na ɔkan abatow no? Anyɛ yiye koraa no, validators 10 a wɔakyekyɛ, a wɔn mu biara ntumi nkyerɛkyerɛ biribiara mu nkutoo. Ɛsɛ sɛ nkyem abiɛsa mu abien yɛ biako de da ne nyinaa adi, na decryption biara de baguam adanse a ɛkyerɛ sɛ ɛteɛ.

So nea efi mu ba no kyekyere? Ɛyɛ coinholder nkate sɛnkyerɛnne a wɔde stake kari. Ɛbɔ Zcash's nniso a ɛyɛ daa no amanneɛ sen sɛ ɛbɛhyɛ nsakrae ho mmara ankasa.

So m’ankasa metumi atu mmirika anaasɛ mɛyɛ eyi ho akontaabu? Aane. Valar Group no tintim abatow-nkɔnsɔnkɔnsɔn softwea, amansin, PIR nhyehyɛe, ne akontaabu ho akontaabufo nyinaa ma obiara ahwɛ na wayɛ adwuma.

## Sɔ wo ntease hwɛ

Sɛ wɔde encryption ahyɛ abatow krataa biara so na obiara a ɔtow aba no nni ne din a, ɛbɛyɛ dɛn na obi atumi anya awerɛhyem sɛ akontaabu a wɔatintim no nyinaa teɛ na obiara antow aba mprenu?

<details>
<summary>Answer</summary>

Adanse abiɛsa na ɛyɛ adwuma no. Abatow krataa biara kura adanse a nimdeɛ biara nni mu a ɛkyerɛ sɛ wɔde mfonini a ɛkari pɛ ankasa na ɛhyɛ akyi, enti wɔnkan abatow biara a wɔanhyɛ akyi. Adanse a egyina PIR so a ɛnyɛ asɔremma no kyerɛ sɛ wɔansɛe krataa a ɛwɔ akyi no, na esiw abatow mprenu a wɔankyerɛ krataa no adi. Na sɛ validators decrypt totals no a, emu biara tintim adanse a ɛkyerɛ sɛ ɛteɛ, enti node biara a ɛyɛ pɛ betumi asi so dua sɛ wɔde nokwaredi yii nɔma a etwa to no fii abatow nkrataa a wɔde encrypted no mu.
</details>

## Akadeɛ

- [NU7 Coinholder Vote ho amanneɛbɔ (Valar Group ne Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - a forum post scoping poll, snapshot sorokɔ, ne nhyehyɛe
- [Coinholder Voting Chain: mfiridwuma ho nhyehyɛe](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - protocol write-up a krataafa yi gyina so
- [Valar Group abatow ho nkrataa ho ban](https://valargroup.gitbook.io/shielded-vote-docs) - a wokura mu reference ma abatoa nkɔnsɔnkɔnsɔn no
- [Valar Group no abatow ho mmara ne akontaabu (GitHub)](https://github.com/valargroup/vote-sdk) - a ebue-source dwumadie ne ne akontabuo

## Nkratafa a ɛfa ho

- [Kokoam Nsɛm a Wɔgye](../zcash-tech/private-information-retrieval) - a ennye asɔremma adansedie kwan a ɛwɔ kokoam abatoɔ mmienu a wɔsiw ano akyi
- [Ironwood](../zcash-tech/ironwood) - a shielded pool a ne balances de abatow mu duru si hɔ
- [zk-SNARKs](../zcash-tech/zk-snarks) - adansedie nhyehyeee a ewo balance ne eligibility adansedie akyi
- [Atare a Wɔabɔ Ho Ban](../using-zcash/shielded-pools) - dee eye shielded balance ne nea enti a etena ahintaw
- [Zcash Sikasɛm ne Aban ho nsɛm](../zcash-community/zcash-governance) - sedee saa atenka sɛnkyerɛnne yi di Zcash's gyinaesi nhyehyɛe a ɛtrɛw no mu
- [Shielded Labs](../zcash-organizations/shielded-labs) - a wodi coordinator multisig no mufo baanum no mu baako
