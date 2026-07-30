<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Sikakorabea Syncing

## TL;DR

* Esiane sɛ shielded Zcash transactions sie wɔn nsɛm nti, server ntumi nhwehwɛ wallet’s balance kɛkɛ ɔkwan a ebetumi ama transparent coins te sɛ Bitcoin anaa Ethereum.
* Hann sika kotoku twe “compact blocks” nketewa fi server titiriw bi so (lightwalletd) na wɔn ankasa de wɔn kokoam safe no decrypt data a ɛfa ho no.
* Saa blocks no decrypt na wodi ho dwuma gye bere, enti wallets de akwan a ɛyɛ syncing ntɛmntɛm di dwuma na ama woatumi de wo sika adi dwuma ntɛm.
* Akwan a ɛda nsow: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), ne DAGSync a wɔahyɛ ho nyansa no.
* Mpɛn pii no, saa akwan yi de memory anaa tumi a wɔde di dwuma foforo di gua de nya synchronization ntɛmntɛm.

## Nkyerɛkyerɛmu Titiriw

### Sɛnea Zcash syncing yɛ adwuma

Zcash de adanse a nimdeɛ nnim di dwuma de bɔ asɛm no ho nsɛm ho ban fi nnipa a wonni tumi krataa ho. Saa kokoamsɛm yi ma syncing yɛ den ma light wallets efisɛ wɔmfa blockchain mũ no nyinaa nsie wɔ mpɔtam hɔ na mmom wɔde wɔn ho to server so ma nsɛm a ɛho hia. Bitcoin anaa Ethereum, servers betumi index blockchain no na wɔasan de account data aba ntɛmntɛm. Nanso Zcash no, server no ntumi nhu asɛm a ɛfa asɛm no ho. Enti ɛbɛyɛ dɛn na sika kotoku a emu yɛ hare atumi ayɛ ne kari pɛ ne ne abakɔsɛm a ɛne ne ho di nsɛ a ɛntwe blockchain no ankasa nyinaa na ennye mu?

Zcash di ɔhaw yi ho dwuma denam akwan horow pii a ɛka bom so. Ɛwɔ server soronko bi, lightwalletd, a ɛsesa data fi node a ɛyɛ ma mu na ɛkora nea ɛho hia ma asɛmdi ho nkyerɛkyerɛmu nkutoo so. Wɔfrɛ saa data yi compact blocks, na ɛyɛ ketewaa koraa sen mfitiase blocks no. Light wallets di kan twe saa compact blocks yi fi lightwalletd server no so na afei wɔde wɔn private keys decrypt no.

Saa compact blocks yi a wobɛpopa na woadi ho dwuma mpo betumi agye bere kɛse, titiriw bere a nnwuma pii wɔ block biara mu no. Enti sika kotoku fa akwan horow so de ma synchronization yɛ ntɛmntɛm na ɛma wode wo sika di dwuma ntɛm ara sɛnea wubetumi.

## Aniwa so / Nsɛso

Fa no sɛ blockchain no yɛ dan kɛse bi a wɔde nkrataa mena a nnaka a wɔato mu ahyɛ mu ma. Sɛ ɔde sika a ɛda adi pefee di dwuma a, krataa a wɔde mena no kyerɛwfo no betumi akenkan nsɛm a wɔakyerɛw so no na wakyerɛ wo nnaka a ɛyɛ wo de no ntɛm ara. Zcash mu no, wɔde nkyerɛwde no asie — enti ɛsɛ sɛ wo sika kotoku no fa ne nsafe na ɛyɛ komm hwɛ nnaka no ankasa mu de hwehwɛ nea ebetumi abue. Akwan a wɔfa so yɛ syncing a ɛwɔ aseɛ ha no yɛ akwan ahodoɔ a wɔfa so hyɛ saa nnaka no mu ntɛmntɛm.

## Deep Dive a Wɔde Nsu Gu Mu

### Warp Sync a Wɔde Yɛ Adwuma

Warp sync yɛ YWallet ade a ɛhuruw anammɔn a ɛwɔ ntam a ɛfa decrypting ne dwumadie a ɛfa compact block biara ho, huruw tẽẽ kɔ nea etwa toɔ no so.

Sɛ ɛbɛyɛ saa a, ɛde akontaabu ne nsɛm a wɔde sie di dwuma de bu nea etwa to a ebefi mu aba no ho akontaa a ɛnfa anammɔn biara mu.

Warp sync tumi di block mpempem pii ho dwuma wɔ sekan biara mu, ntɛmntɛm sen ɔkwan a wɔtaa fa so yɛ synchronization no. Wei kyerɛ sɛ YWallet dwumadiefoɔ bɛtumi anya anigyeɛ wɔ adwumayɛ a ɛkɔ ntɛmntɛm na ɛkɔ so yie mu, mpo sɛ wɔayɛ nnwuma ɔpehaha pii na wɔakyerɛw nsɛm a wɔakyerɛw wɔ wɔn akontaabuo mu.

Sɛ yɛde saa anammɔn-huruw kwan yi to nkyɛn a, YWallet betumi adi block ahorow pii ho dwuma bere koro mu, akyekyɛ adesoa no wɔ wo hardware a ɛwɔ hɔ no so ma ayɛ adwuma no ntɛmntɛm mpo.

Kenkan Nsɛm pii wɔ [Warp Sync](https://ywallet.app/warp/)

### Spend-ansa na woayɛ sync

Spend-before-sync yɛ ade foforo wɔ Zcash Mobile Wallet SDK V2 mu a ɛma wɔn a wɔde di dwuma no tumi sɛe sika ntɛm ara bere a wɔabue wɔn sika kotoku no, a wɔntwɛn sɛ sika kotoku no bɛyɛ pɛpɛɛpɛ. Saa ade yi ma wohu sika kotoku no sika a wɔsɛe no ntɛmntɛm na ɛma osuahu a ɔde di dwuma no tu mpɔn.

Spend-before-sync yɛ adwuma denam compact-blocks synchronization algorithm a ɛyɛ blocks a efi lightwalletd server no so ho adwuma wɔ nhyehyɛe a ɛnyɛ linear mu. Wei kyerɛ sɛ sɛ anka wɔbɛtwɛn sɛ wɔbɛyɛ block baako ho adwuma koraa ansa na wɔakɔ so no, sika kotokuo bɛtumi de memory ne dwumadie tumi kakra adi dwuma de ahwehwɛ blockchain no afã ahodoɔ. Mpɛn pii no, ɛhwehwɛ range ahorow mu, hwehwɛ nnwuma foforo bere a wɔretwe block dedaw no na wɔreyɛ ho adwuma no. Sɛ wohu krataa bi a wɔansɛe no nnansa yi a, wɔbɛma wɔanya bi ntɛm ara.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync a ɛyɛ adwuma

Zecwallet kuw no na wɔyɛɛ no, Blaze sync yɛ synchronization algorithm ma hann sika kotoku a ɛhwɛ blockchain no akyi, efi ase fi block a ɛkorɔn sen biara, nnansa yi ara na ɛyɛ adwuma kɔ akyi.

Wei ma sika kotoku no tumi hwehwɛ nsɛm a wɔasɛe no ansa na wagye, bere a ɛma nsɛm a kan no nsɛee no ba a ɛntwɛn sɛ synchronization nhyehyɛe no nyinaa bewie.

Ɛno da nkyɛn a, ɛde Out-of-Order Sync di dwuma denam decoupling afã horow a ɛwɔ sync no mu — downloading blocks, yɛ trial decryptions, ne updated adansefo — na ɛyɛ wɔn ho adwuma wɔ parallel. Wei gye memory ne CPU ahodeɛ pii nanso ɛma sync ahoɔhare kɔ soro X5.

### DAGSync na ɛyɛ adwuma

DAGSync yɛ synchronization algorithm a wɔahyɛ ho nyansa a ne botaeɛ ne sɛ ɛbɛma Zcash shielded wallets a ɔde di dwuma no suahunu atu mpɔn denam synchronization a ɛbɛma ayɛ ntɛmntɛm so.

Ɛde [Directed Acyclic Graph (DAG) .](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) sɛ ɛbɛgyina hɔ ama dependencies a ɛwɔ nsɛm a wɔakyerɛw, adansefoɔ, ne nullifiers mu wɔ Zcash sika kotokuo mu.

DAG yɛ data nhyehyeɛ a ɛyɛ nodes ne edges, baabi a edge biara wɔ akwankyerɛ a ɛkyerɛ abusuabɔ a ɛda nodes mmienu ntam. DAG nni kyinhyia biara, a ɛkyerɛ sɛ ɔkwan biara nni hɔ a wobɛfa so afi ase afi node bi so na woadi anoano no akyi asan akɔ node koro no ara so.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Nkyerɛkyerɛmu a mfaso wɔ so

Nea ɛyɛ anigye no, saa akwan yi nyinaa botae ne sɛ wobedi nsɛmmisa a Zcash Security de too gua wɔ ne post a ɛfa [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) ne abusuabɔ a ɛda ankorankoro sikatua nhyehyɛe ahorow ntam. Ebinom mpo tu anammɔn foforo a ɛne sɛ wɔbɛtwe memo data nyinaa afi server ahorow so, gye data a ɛfa address bi nkutoo ho, na ɛma kokoamsɛm kɔ soro a wɔbɔ nneɛma foforo kakra ho ka.

Afei nso, Zcash Foundation ahwɛ akwan foforɔ a wɔbɛfa so ama sika kotokuo a emu yɛ hare no adwumayɛ atu mpɔn. Saa na ɛte wɔ [Oblivious Message Retrieval (OMR) .](https://zfnd.org/oblivious-message-retrieval/), adansi bi a fapem no asua ho ade “de ahu sɛ ebia ɛde ano aduru a ebetumi ama nnansa yi adwumayɛ ho haw ahorow a aka wɔn a wɔde Zcash sika kotoku di dwuma no ma anaa.”

## Mfomso a Ɛtaa Tu

**Sɛ yɛfa no sɛ lightwalletd server no nim wo balance.** Server no de compact blocks nkutoo na ɛma; wo sika kotoku no de w’ankasa nsafe decrypt na ɛkyerɛ ase wɔ mpɔtam hɔ.

**Stopping sync too early.** Akwan bi ma sika a wɔsɛe no nnansa yi no wɔ hɔ ansa na sync a edi mũ awie, nanso ebia abakɔsɛm dedaw ne nsɛm a wɔakyerɛw agu krataa so no da so ara kɔ so.

**Sɛ wode Zcash sync toto transparent-chain sync ho tẽẽ.** Ɔkwan a ɛyɛ brɛoo betumi ayɛ ɛka a wɔbɔ wɔ kokoam nsɛm a wɔbɛkora so ho, ɛnyɛ mfomso — sika kotoku no reyɛ adwuma a anka ɔmanfo-sika server bɛyɛ denam wo akontaabu a wobɛkenkan no pefee so.


## Nkratafa a Ɛfa Ho

- [Kanea a Wɔde Yɛ Nneɛma](/zcash-tech/lightwallet-nodes) — lightwalletd infrastructure a kanea sika kotoku de wɔn ho to so.
- [Nsafe a Wɔde Hwɛ](/zcash-tech/viewing-keys) — safoa a sika kotokuo de di dwuma de hunu na decrypt wɔn ankasa nsɛm a wɔakyerɛw.
- [Pepper Sync](/zcash-tech/pepper-sync) — ɔkwan foforo a wɔfa so yɛ Zcash sika kotoku synchronization.
- [FROST](/zcash-tech/frost) — wɔkyekyɛɛ tumi a wɔde wɔn nsa hyɛ ase ma ZEC a wɔabɔ ho ban.
