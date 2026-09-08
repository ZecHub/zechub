<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Protocol no ho nhyehyɛe

## TL;DR

* Crosslink protocol no yɛ nhyehyeɛ a wɔahyɛ ho nyansa ama Zcash hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. Ɛde PoW ne Byzantine Fault Tolerance (BFT) protocol bom, na ɛma awerɛhyem sɛ ɛbɛba awiei bere tenten a PoW anaa PoS da so ara yɛ ahobammɔ no.
* Hybrid PoS de notaries a wɔgye blocks a egyina staked ZEC so di dwuma — mfiase no na ɛyɛ static, akyiri yi wɔpaw no gyina staked ZEC so ba.
* Crosslink botae ne sɛ ɛbɛma ledger mmienu: **finalized ledger (LOG_fin)** ama rollback ahobanbɔ, ne **lower-latency ledger (LOG_ba)** a ɛtrɛw no nsen *L* blocks.
* **Safety Mode** bi yɛ adwuma sɛ ledger a wɔawie no di akyi bɛboro *L* blocks a: PoW kɔ so, nanso sikasɛm dwumadi ahorow no gyina kosi sɛ wobesiesie asɛm no.
* Bere kɔ so no, PoS validators benya akatua mu kyɛfa a ɛrenya nkɔanim, na ɛbɛtew PoW miners’ akatua so; protocol no de nsakrae ba nkakrankakra.
* Shielded Labs na ɛreyɛ protocol no, a ɛwɔ ɔkwankyerɛ a wɔde bɛka Crosslink 2* abom wɔ Zcash Zebra client no mu.

## Nkyerɛkyerɛmu Titiriw

### Nnianim: Zcash Hybrid PoS ne Crosslink Protocol no

Crosslink Protocol yɛ nkɔsoɔ titire wɔ Zcash nkɔsoɔ mu, ɛkyerɛ no kwan kɔ **Hybrid Proof-of-Stake (PoS)** ne **Proof-of-Work (PoW)** nhwɛsoɔ so. Amanneɛbɔ PoW, ɛwom sɛ wotumi de ho to so sɛ ɛbɛma nkitahodi ahobammɔ ahwɛ ahu no, hyia ɔkasatia wɔ ahoɔden a wɔde di dwuma ne asiane ahorow a ɛwɔ mfinimfini a ɛbata mfiridwuma mu a wotu fagude ho no ho. Crosslink de nhyehyɛe a wɔde afrafra ba, a ɛde PoW ahoɔden a wɔada no adi no ne PoS mu mfaso a ɛwɔ adwumayɛ ne nniso mu no bom.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Saa nsakrae yi ne wiase nyinaa nkɔsoɔ wɔ blockchain nnoɔma foforɔ mu, baabi a nnwuma redan akɔ akwan a ɛbɛma nneɛma a atwa yɛn ho ahyia a ɛbɛtena hɔ daa na wɔde ahyɛ aman nyinaa so no hyia. Crosslinks’ dual consensus model hwɛ hu sɛ Zcash kura ne cryptographic kokoamsɛm ho bɔhyɛ a emu yɛ den bere a ɛrenya nkɔso de adi nnɛyi nsɛnnennen ho dwuma.

Hybrid Proof-of-Stake (PoS) kwan no de atetesɛm Proof-of-Work (PoW) ne PoS bom, a ne botaeɛ ne sɛ ɛbɛdi mmerɛwyɛ te sɛ 51% ntua ho dwuma berɛ a ɛkura decentralization mu na ɛtew ahoɔden a wɔde di dwuma so. Hybrid PoS de notaries a wɔgye blocks a egyina staked ZEC so di dwuma no ba. Wɔayɛ saa adwinnade yi sɛnea ɛbɛyɛ a nkɔnsɔnkɔnsɔn ahobammɔ ne checkpoint validation atu mpɔn, na ɛde ɔkwan foforo a ɛyɛ den kɛse ma wɔ PoW nhyehyɛe kronkron ananmu.

### Dɛn nti na Hybrid PoS/PoW sɛ sɔhwɛ a edi kan?

* Ɛnya nkɔsoɔ kɔ PoS kronkron so.
* Ɛma wotumi tu fagude ne staking use cases ne ecosystem crossover bere koro mu.
* Ɛbrɛ ahobanbɔ ho nsɛm a ɛbɛtumi aba wɔ PoS protocol no ase kɔsi sɛ ɛbɛnya validator stake ne ahotosoɔ kɛseɛ.
* Ɔkwan a wɔfa so yɛ no nyinaa no, Ethereum ada no adi wɔ Production mu.

### Nea Crosslink yɛ

Crosslink protocol no yɛ nhyehyeɛ a wɔahyɛ ho nyansa ama Zcash hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. Ɛde PoW ne Byzantine Fault Tolerance (BFT) protocol bom, na ɛma awerɛhyem sɛ ɛbɛba awiei bere tenten a PoW anaa PoS da so ara yɛ ahobammɔ no. Nsusuiɛ no botaeɛ ne sɛ ɛbɛhyɛ nkitahodiɛ ahobanbɔ ne decentralization mu den denam staked validation a wɔde bɛka ho berɛ a wɔkura miner kyɛfa mu. Ade titiriw bi a ɛwɔ nsusuwii no mu a wɔfrɛ no Crosslink 2 no ma adansi no yɛ mmerɛw denam BFT nyansahyɛfo ne wɔn a wotu fagude a ɛka bom no so. Saa kwan a wɔayɛ no mmerɛw yi ma nsakraeɛ a ɛba nhyehyɛɛ mu no so tew na ɛma kwan ma wɔde "dummy" BFT layer di dwuma, na ɛma ɛyɛ mmerɛw sɛ wɔbɛyɛ nhwɛsoɔ na wɔde adi dwuma berɛ a wɔkura ahobanbɔ gyinapɛn a ɛkorɔn mu.

Nhyehyeɛ a wɔde bedi dwuma no bi ne ɔkwan a wɔbɛfa so ayɛ adwuma a wɔasusu sɛ wɔbɛbɔ wɔ mfiridwuma ho ka a wɔde bɛka Crosslink 2* abom wɔ Zcash Zebra afɛfoɔ no mu. Saa dwumadie a wɔde di dwuma nkakrankakra yi twe adwene si sɛ wɔbɛkari pɛ wɔ nkannyan a wɔde ma wɔn a wɔdi dwuma no mu, wɔbɛtew ɔhaw so, na ɛne Zcash botaeɛ a ɛne sɛ wɔbɛtumi ayɛ kɛseɛ, wɔde adi dwuma, ne decentralization. Ahotosoɔ a ɛrenya nkɔsoɔ wɔ protocol no ahobanbɔ agyapadeɛ a ɛyɛ den no mu no ma ne tumi yɛ den bio sɛ ​​anammɔn titire wɔ Zcash nkɔsoɔ mu. Ɛdenam ahoɔden a wɔde di dwuma yiye a wodi ho dwuma ne akwan a wɔfa so yɛ adwene a wɔma ɛkɔ anim so no, Crosslink de ano aduru a ɛhwɛ daakye ma wɔ blockchain nsɛnnennen a ɛrekɔ so no ho. Sɛ wopɛ nsɛm pii a, hwɛ... [GitHub akoraeɛ](https://github.com/ShieldedLabs/crosslink-deployment) ne nea [Zcash Mpɔtam Hɔ Nhyiam](https://forum.zcashcommunity.com).

### Crosslink Botae ne Botae Ahorow

Wɔayɛ Crosslink Protocol no sɛ ɛbɛdi botaeɛ ahodoɔ bi a ɛho hia ma Zcash daakye ho dwuma:

1. **Decentralization a wɔde bɛma**:
   * Ɛdenam PoS a wɔde ka ho so no, Zcash tew ahotoso a wɔde to PoW hardware soronko (ASICs) so, a ɛtaa de tumi a wɔde tu fagude no bom wɔ adwumayɛfo akɛse kakraa bi mu.
   * PoS ma kwan ma wɔde wɔn ho hyɛ mu fi mpɔtam a ɛtrɛw, baabi a sikakorafo de wɔn agyapade to asiane mu de bɔ nkitahodi no ho ban, na ɛhwɛ hu sɛ adwene a ɛwɔ hɔ no kyekyɛ kɛse.
   * Ɛdenam staked validation a wɔde ba so no, protocol no hwɛ hu sɛ sikasɛm mu kyɛfafo bedi dwuma denneennen wɔ adwene a ɛwɔ hɔ no mu, na ɛtew ahotoso a wɔde to fam a wotu nkutoo so.
2. **Aban a wɔama anya nkɔso**:
   * Sikakorabeafoɔ nya hokwan sɛ wɔto aba denam staking so, na ɛma wɔtumi nya gyinaesie a ɛfa network upgrades, sika a wɔkyekyɛ, ne abɔdeɛ a nkwa wom a wɔde di kan no so nkɛntɛnsoɔ. Saa demokrase nhyehyɛe yi ma protocol no nkɔso ne mpɔtam hɔfo anigye hyia.
3. **Ahoɔden a Wɔde Di Dwuma Yiye**:
   * Nsakraeɛ a ɛyɛ fã bi kɔ PoS so no brɛ ahoɔden a wɔhwehwɛ no ase kɛseɛ, na ɛma Zcash ne wiase nyinaa nhyehyɛeɛ a ɛfa nneɛma a ɛbɛtena hɔ daa ho no hyia. PoS fi awosu mu no, ɛnyɛ nea ɛhwehwɛ nneɛma pii sɛ wɔde toto PoW a emu yɛ duru wɔ kɔmputa so no ho a. Hybrid nhyehyɛe ahorow no botae ne sɛ ɛbɛtew ahoɔden a wɔde di dwuma so bere a wɔde toto PoW nkutoo nhyehyɛe ahorow ho bere a wɔhwɛ ahobammɔ a ɛkorɔn so.
4. **Sikasɛm mu Ahobanbɔ ne Nkɔsoɔ a Ɛbɛtena Hɔ**:
   * PoW ne PoS a wɔde ka bom no ma sikasɛm mu nkannyan a wɔde ma wɔn a wɔde wɔn ho hyɛ nkitahodi nhyehyɛe mu no gu ahorow, na ɛma ahobammɔ a emu yɛ den a wɔmfa wɔn ho nto adwinnade biako so dodo.
   * Staking nso de akatua nhwɛsoɔ a wɔtumi hyɛ ho nkɔm ma wɔn a wɔde wɔn ho bɛhyɛ mu no ba, na ɛde ɔpɛ a ɛyɛ anigyeɛ ba ma wɔn a wɔde wɔn sika bɛto mu akyɛ.
5. **Ahobanbɔ a ɛkɔ soro**: Crosslink botae ne sɛ ɛbɛma ntwamutam no ahoɔden a ɛko tia nkɔnsɔnkɔnsɔn nhyehyɛe foforo ntua no ayɛ kɛse denam PoS a wɔde bɛka PoW ho no so.

## Aniwa so / Nsɛso

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Susuw parcel service bi a ɛde nkrataa ahorow abien ma de kɔma bere koro no ara ho hwɛ. Nea edi kan ne tracking scan: epue ntɛmntɛm, ɛkyerɛ wo baabi a ɛda adi sɛ parcel no wɔ, na ɛtɔ mmere bi a wɔteɛteɛ mu. Nea ɛto so abien yɛ krataa a wɔde wɔn nsa ahyɛ ase sɛ wɔde nneɛma bɛkɔ: ɛba akyiri yi, nanso sɛ ɛba hɔ pɛ a obiara nnye ho akyinnye.

Ledger a ɛwɔ latency a ɛba fam no ne tracking scan no, na ledger a wɔawie no yɛ krataa a wɔde gye sika a wɔde wɔn nsa ahyɛ ase. Wɔn baanu nyinaa ka nsɛm a esisi a ɛtoatoa so koro no ara ho asɛm; ɛsono sɛnea wɔda wɔn ho adi ntɛmntɛm ne sɛnea wɔkura mu denneennen no mu.

Safety Mode ne nea depot no yɛ bere a nkrataa a wɔde gye sika a wɔde wɔn nsa ahyɛ ase no gyae ba bere a scan ahorow kɔ so boaboa ano no. Parcels da so ara fa ɔdan no mu — nanso adwumayɛbea no gyae tua ka wɔ scans nkutoo ho kosi sɛ nsaano nkyerɛwee no bɛkyere.

## Deep Dive a Wɔde Nsu Gu Mu

### Ahobammɔ ne Adwumayɛ Botae ahorow a ɛwɔ Crosslink mu

Crosslink protocol no botae ne sɛ ɛbɛma ledger ahodoɔ mmienu ama Zcash: **finalized ledger (LOG_fin)** ne **lower-latency ledger (LOG_ba)**. Ledger a wɔawie no hwɛ hu sɛ rollback ahobammɔ wɔ nsusuwii a ntease wom a ɛfa Byzantine Fault Tolerance (BFT) anaa blockchain (BC) protocol ho. Wɔayɛ no sɛ ɛbɛkɔ so atra ase na ayɛ ahobammɔ wɔ ntwamutam mpaapaemu mpo ase, a ɛwɔ latency a ɛboro mprempren Zcash blockchain no mmɔho abien kakra ma block confirmations a ɛyɛ pɛ.

Lower-latency ledger no trɛw ledger a wɔawie no mu nsen *L* blocks. Ɛhwɛ hu sɛ rollback ahobammɔ wɔ blockchain protocol nkutoo ase na ɛkura latency ne ahobammɔ a ɛnyɛ bɔne nsen Zcash model a ɛwɔ hɔ dedaw no. Wɔ Crosslink 2* nhyehyeɛ a ɛyɛ mmerɛw mu no, latency ledger a ɛwɔ fam no ma nkɔsoɔ ne gye a wɔgye tom no yɛ mmerɛ denam dwumadie a ɛyɛ sɛ PoW nkɔnsɔnkɔnsɔn no so.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Bounded Availability ne Ahobammɔ Mode

Crosslink de **Safety Mode** ka ho de di asiane ahorow a ɛbata lower-latency ledger a ɛkɔ akyirikyiri wɔ ledger a wɔawie no anim no ho dwuma. Eyi siw abirabɔ ano, te sɛ akontaabu tebea a ɛnkari pɛ anaasɛ ahobammɔ mu nsonsonoe a wontumi nnye ntom wɔ bere tiaa mu ano aduru a wɔn a wɔde nnwuma ma no de ma mu. Safety Mode no yɛ adwuma sɛ ledger a wɔawie no di akyi bɛboro *L * blocks a ɛkɔ so daa no a. Wɔ saa tebea yi mu no, blockchain no kɔ so yɛ PoW adwumayɛ (ɛhwɛ ma ahobammɔ titiriw), nanso wogyae sikasɛm dwumadi ahorow kosi sɛ wobesiesie asɛm no. Wɔayɛ saa adwinnadeɛ yi sɛ ɛbɛsan afiri tebea soronko te sɛ ntua akɛseɛ mu berɛ a ɛboa nhyehyɛeɛ a egyina nnisoɔ so a wɔde bɛsan akɔ akyi.

### Mfiridwuma Ho Nsɛm ne Nea Wɔde Di Dwuma

Shielded Labs na ɛreyɛ Crosslink Protocol no denneennen na wɔde adi dwuma a wɔne abɔdeɛ a nkwa wom ho ahokafoɔ titire te sɛ Zodl ayɛ adwuma abom. Protocol no dwumadie no bi ne:

* Staking akwan a ahobammɔ wom a wɔde besi hɔ ama PoS mufo.
* Akatua nhyehyɛe a wɔbɛsakra no ma ɛkari pɛ wɔ nkannyan a ɛwɔ wɔn a wotu fam ne wɔn a wɔde wɔn ho hyɛ mu no ntam.
* Hwɛ a wɔbɛhwɛ sɛ ɛne akyi hyia ne osuahu a ɛnyɛ den a wɔde di dwuma wɔ nsakrae no mu.
* Notary System: Protocol no de notaries a wɔde wɔn nsa hyɛ aseɛ wɔ blocks so ka ho. Mfiase no, wɔde static notaries di dwuma, na wɔdan kɔ nhyehyɛe a ɛyɛ nnam a wogyina staked ZEC so paw notaries.
* Activation Logic: Crosslink a wɔde aba no hwehwɛ sɛ wɔyɛ nsakraeɛ wɔ Zcash consensus mmara no mu, a nea ɛka ho ne sɛ wɔbɛkyerɛkyerɛ stake distribution nhyehyɛeɛ no mu na wɔayɛ network protocol mmara foforɔ de aboa hybrid consensus.
* Phased Deployment: Wɔbɛma protocol no akɔ so wɔ akwan horow so de ahwɛ sɛ network no gyina pintinn na mpɔtam hɔfoɔ bɛtumi ayɛ nsakraeɛ. Mfitiaseɛ no twe adwene si mfiridwuma mu dwumadie so, na ɛno akyi no, nnisoɔ a wɔde bɛka abom de apaw notaries.

Wubetumi ahwehwɛ mfiridwuma ho nsɛm mu na woadi ne nkɔso akyi denam... [Crosslink Deployment Adekorabea wɔ GitHub so](https://github.com/ShieldedLabs/crosslink-deployment).

## Nkyerɛkyerɛmu a mfaso wɔ so

### Nkɛntɛnso a ɛwɔ PoW Miners’ Revenue so

Crosslink gye dwumadie titire a PoW atuo di wɔ Zcash mfitiaseɛ nkɔsoɔ mu tom berɛ a wɔresiesie wɔn ho ama nsakraeɛ nkakrankakra:

* **Block Akatua a wɔatew so**:
  * Bere kɔ so no, PoS validators benya akatua mu kyɛfa a ɛrenya nkɔanim, na ɛbɛtew PoW miners’ akatua so. Saa nkyekyɛmu a wɔsan kyekyɛ yi da dwumadie a PoW di wɔ afrafra nhwɛsoɔ no mu a ɛrekɔ fam adi.
* **Nsakrae a Ɛfata**:
  * Protocol no de nsakraeɛ ba nkakrankakra, hwɛ sɛ wɔn a wɔtu fam no wɔ berɛ a ɛdɔɔso a wɔde bɛsesa anaa wɔbɛhwehwɛ dwumadie foforɔ mu wɔ Zcash abɔdeɛ a nkwa wom nhyehyɛeɛ no mu, te sɛ nsakraeɛ a wɔbɛdane akɔ staking anaasɛ wɔbɛboa ama nkitahodiɛ dwumadie foforɔ.
* **Asiane a ɛwɔ Centralization mu a wɔbɛbrɛ ase**:
  * Wɔayɛ PoS staking pools sɛnea ɛbɛyɛ a wobesiw tumi a wɔde bɛhyɛ mu no ano, na ɛma agodifo nkumaa nya hokwan de wɔn ho hyɛ mu pɛpɛɛpɛ. Saa kwan a ɛka obiara ho yi tia mprempren dodow a wohu wɔ ASIC-based mining mu.
* PoW miners bɛnya sika a wɔbɛtew so berɛ a wɔsan de block akatua no fã bi ma PoS validators. Saa nkyekyɛmu a wɔsan kyekyɛ yi hwɛ ma wɔnya nkannyan nhyehyɛeɛ a ɛkari pɛ, na ɛma wɔn a wɔtu fam ne wɔn a wɔde wɔn ho hyɛ mu no nyinaa akatua wɔ nkitahodiɛ no a wɔabɔ ho ban no ho.
* Wɔayɛ nhyehyɛe sɛ wɔbɛyɛ nsakrae nkakrankakra de abrɛ sikasɛm mu nkɛntɛnso a ɛwɔ wɔn a wotu fagude so no ase bere a wɔma wɔn a wɔde wɔn ho hyɛ mu no de wɔn ho hyɛ mu no.

Saa kwan a ɛwɔ adwene mmienu yi hyɛ Zcash botaeɛ a ɛfa kokoamsɛm, nkɔsoɔ, ne decentralization ho mu den, na ɛde no si hɔ sɛ ɔkannifoɔ a ɔhwɛ n’anim wɔ blockchain ahunmu.

## Mfomso a Ɛtaa Tu

**Akenkan Crosslink sɛ mmara a ɛyɛ adwuma a wɔpene so**. Kratafa yi kyerɛkyerɛ nhyehyɛe a wɔahyɛ ho nyansa a wɔde nhyehyɛe a wɔde bedi dwuma nkakrankakra wom mu. Sɛ yɛde bɛba a, ɛhia nsakraeɛ wɔ Zcash adwene a ɛwɔ mu mmara no mu, a ɛno ne deɛ ɔkwankyerɛ ne Zebra nkabom adwuma no yɛ ma.

**Sɛ yɛfa no sɛ PoS besi mining ananmu**. Crosslink yɛ hybrid design: PoW block production kɔ so ka staked validation ho. Wɔ Safety Mode mpo mu no, blockchain no kɔ so yɛ PoW adwumayɛ bere a wɔagyae sikasɛm dwumadi ahorow no.

**Wɔde "finality" di dwuma sɛ ɛyɛ ntɛm a wosi so dua**. Wɔayɛ ledger a wɔawie no ama latency a ɛboro mprempren Zcash blockchain no mmɔho abien kakra ama block confirmations a ɛyɛ pɛ. Nea ɛde ka ho ne rollback ahobammɔ, ɛnyɛ ahoɔhare — lower-latency ledger no ne fast view.

**Adwene a ɛyɛ basaa wɔ ledgers abien no mu**. LOG_ba nyɛ nkɔnsɔnkɔnsɔn a ɛyɛ soronko: ɛtrɛw ledger a wɔawie no mu nsen *L* blocks, na wɔ Crosslink 2* nhyehyɛe no mu no ɛyɛ adwuma sɛ PoW nkɔnsɔnkɔnsɔn.

## Nkratafa a Ɛfa Ho

- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) — wɔayɛ nhyehyɛe sɛ wɔde akraman Crosslink 2* bɛka ho.
- [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) — sɛnea nodes di consensus mmara ahorow ho adanse nnɛ, ansa na hybrid consensus biara asesa.
- [Network Nkɔsoɔ a Wɔayɛ](/start-here/network-upgrades) — sɛnea adwene a ɛwɔ mmara mu nsakrae du Zcash ntam.
- [Zcash Sikasɛm Ho Nhyehyɛe](/start-here/zcash-monetary-policy) — block akatua nhyehyeɛ a Crosslink bɛsan akyekyɛ.

## Nneɛma Afoforo a Wɔde Yɛ Adwuma

- Mpɔtam hɔfo nhumu: [Zcash Community Forum - Nkɔmmɔbɔ a ɛfa Crosslink ho](https://forum.zcashcommunity.com)
- Aban mpanyimfo nsɛm foforo: [Electric Coin Company Blog](https://electriccoin.co)
- Wɔde wɔn adwene si nneɛma a ɛbɛkɔ so atra hɔ daa so: [Nea Enti a Hybrid PoS Ho Hia ma Zcash](https://forum.zcashcommunity.com)

  Mmoa nwoma:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       ma kwan maFullScreen no
       loading="lazy"
     />
</div>
