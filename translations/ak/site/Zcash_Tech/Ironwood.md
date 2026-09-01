<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dade a Wɔde Yɛ Nnua

> Ironwood yɛɛ adwuma wɔ Zcash mainnet so wɔ block 3,428,143 wɔ July 28, 2026 UTC, na ɛyɛ live fi saa bere no.

Nea wobɛfa: nea Ironwood sesa, nea enti a bɔne bi a ɛwɔ sika a ahintaw mu yɛ aniberesɛm, ne sɛnea turnstile no ma obiara si so dua sɛ wɔanhyɛ ZEC biara.

Ironwood is a Zcash [network upgrade a wɔde yɛ adwuma](../start-here/network-upgrades), a wɔfrɛ no NU6.3, a ɛde ɔtare foforo a wɔabɔ ho ban a ɛwɔ din koro no ara ba. BI [ɔtare a wɔabɔ ho ban](../using-zcash/shielded-pools) yɛ sikakorabea ahorow a ne sika ne ne wuranom tra hɔ ahintaw [zero-nimdeɛ a wɔde kyerɛw nsɛm a wɔde sie](../zcash-tech/zk-snarks). Ironwood wɔ hɔ sɛ ɛbɛsiw na wɔabu soundness bug a wɔhunu wɔ Orchard shielded pool a ɛwɔ hɔ dada no mu, na ama mpɔtam hɔfoɔ anya ɔkwan a ɛyɛ den a wɔbɛfa so ahwɛ sɛ ZEC a wɔde ma nyinaa yɛ nokware. Wɔakyerɛ ne mmara a wɔpene so no mu [ZIP 258 na ɛwɔ hɔ](https://zips.z.cash/zip-0258).

Nea enti a eyi ho hia. Sɛ wowɔ sika a ɛda adi te sɛ Bitcoin a, obiara betumi ahwɛ sɛ wɔanyɛ sika biara denam ɔmanfo nhoma a ɔkenkan so. Sika a wɔabɔ ho ban de sika dodow no sie, enti wuntumi nhwɛ kɛkɛ. Mmom no, ɛsɛ sɛ cryptography no ankasa ma awerɛhyem sɛ obiara ntumi mmɔ sika wɔ kokoam. Ironwood ho hia efisɛ wohuu mmoawa bi wɔ saa guarantee no mu maa Orchard ɔtare no. Upgrade no to gap no mu na ɛma obiara nya ɔkwan a ɔbɛfa so asi so dua sɛ ZEC a wɔde ma nyinaa da so ara yɛ nokware.

Ɛyɛ foforo wɔ Zcash mu? Fi ase fi ase [Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash) ne [Atare a Wɔabɔ Ho Ban](../using-zcash/shielded-pools), afei san bra ha.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Nea enti a na Ironwood ho hia

Wɔ May 2026 awiei no, ahobammɔ ho nhwehwɛmufo a ɔde ne ho Taylor Hornby, bere a na ɔreyɛ protocol audit ma... [Labs a Wɔabɔ ho Ban](../zcash-organizations/shielded-labs), de asɛyɛde daa soundness bug bi adi wɔ Orchard shielded pool no mu. Na Orchard yɛ Zcash ɔtare foforo a wɔabɔ ho ban saa bere no, na sintɔ no traa ne zero-knowledge circuit no fã bi a ɛyɛ elliptic-curve, a ɛde... [Halo](../zcash-tech/halo) 2 nhyehyɛe a ɛkyerɛ sɛ ɛyɛ nokware.

1. Soundness bug kyerɛ sɛ akontaabu a ɛkyerɛ sɛ asɛm bi yɛ nokware no nkyerɛ sɛ ɛyɛ nokware koraa.
2. Wɔ nsusuwii mu no, anka ɔtowhyɛfo betumi de sintɔ no adi dwuma de ayɛ bo a enni mu wɔ Orchard ɔtare no mu na wasɛe sika a ɛnyɛ wɔn de ankasa, na onnyaw biribiara a node a ɛyɛ daa bɛkyere.
3. Zcash turnstile no da so ara kata sɛnea bo a ɛsom betumi afi Orchard da bi so, enti na wontumi nhyɛ nneɛma a wɔde ma nyinaa mu den, nanso ɔtare no ankasa cryptography no ankyerɛ bio sɛ ​​sika biara a ahintaw a ɛwɔ mu no yɛ nokware.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Nnɔmba a ɛwɔ atifi hɔ no yɛ mfonini a wɔayɛ no mmerɛw. Ná mfomso ankasa no wɔ ɔmansin no akontaabu fã pɔtee bi mu, na ɛnyɛ sika a ɛkɔ mu na efi mu no dodow ankasa. Asɛm a ɛsɛ sɛ woyi fi hɔ ara ne sɛ soundness bug betumi ama wɔabɔ bo wɔ ɔtare no mu a wonhu.

Nea ɛho hia no, adanse biara nni hɔ a ɛkyerɛ sɛ wɔde bɔne no dii dwuma da, adanse biara nni hɔ a ɛkyerɛ sɛ ɛkaa wɔn a wɔde di dwuma no sika, na adanse biara nni hɔ a ɛkyerɛ sɛ ZEC a wɔde ma nyinaa sesae. Wɔnam ahobammɔ ho nhwehwɛmu so huu no na wosiesiee ansa na ɛrepira biara a wonim.

## Mmuae a wɔde mae

Zcash mpɔtam hɔfo de fixes kɔmaa wɔ akwan horow so sen sɛ wɔde ne nyinaa bɛkɔ prɛko pɛ.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Wɔ June 2026 mfiase no, bere tiaa mu adeyɛ bi maa Orchard pool no yɛɛ adwuma bere a na wɔresiesie nsiesie a edi mũ no.
2. NU6.2 upgrade no siesiee Orchard circuit no ankasa, na ɛtoo soundness mmerɛwyɛ a ɛwɔ ase no mu.
3. NU6.3 a wɔayɛ no foforo, Ironwood, de ɔtare a wɔabɔ ho ban foforo ne ɔmanfo nhwehwɛmubea ba sɛnea ɛbɛyɛ a bo betumi afi Orchard ɔtare dedaw no mu wɔ akontaabu a edi mũ ase.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Nea Ironwood ɔtare no yɛ

NU6.2 bɔɔ Orchard amansin no ho ban maa nnwuma foforɔ nyinaa, nanso boɔ a wɔabɔ wɔ mmara dedaw no ase no da so ara te Orchard pool no mu. Ironwood ma saa botae no nya baabi a ɛho tew ne ɔkwan a wɔbɛfa so ahwɛ so bere a ɛretu no.

Ironwood pool no yɛ shielded value pool a NU6.3 ayɛ wɔ block 3,428,143. Wɔde asi ɔmansin a wɔateɛteɛ no so na wɔde quantum-recoverable note format (nsusuwii a ɛma wotumi nya sika sɛ... [quantum kɔmputa ahorow](../zcash-tech/post-quantum-security) da biara bu nnɛyi cryptography), a wɔakyerɛkyerɛ mu wɔ [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005).

1. Sɛ wɔyɛ adwuma wie a, Orchard pool dedaw no bɛyɛ nea wɔsɛe no nkutoo, enti ebia bo foforo biara bɛhyɛn mu.
2. Botae a wɔabɔ ho ban foforo no sen kɔ Ironwood mmom.
3. Shielded ZEC kura kokoam nsɛm ho bɔhyɛ a emu yɛ den koro no ara a ɛde nea ɔde kɔmaa, nea ogye, ne sika dodow no sie.

## Nneɛma a wɔde dannan nneɛma

Adwene titiriw a ɛwɔ Ironwood ne turnstile, akontaabu nhwehwɛmubea a ɛsɛ sɛ sika biara fa mu bere a efi Orchard ɔtare dedaw no mu kɔ Ironwood no.

> Turstile yɛ ma sika a ahintaw nea ahwehwɛ pon yɛ ma sikakorabea sikakorabea no. Woda so ara ntumi nhu emu, nanso wubetumi akan nea ɛkɔ mu ne nea efi mu ba no pɛpɛɛpɛ.

1. Wɔkan sika a efi Orchard no wɔ baabi a ɔmanfo hwɛ sɛ ɛyɛ nokware ansa na wɔakɔ Ironwood.
2. Eyi ma obiara susuw sɛnea ZEC tu kɔtra baabi foforo no ho, na ɛhyɛ ahotoso a ɔwɔ wɔ nneɛma a ɛkyinkyini ankasa no mu den.
3. Sɛ wɔfaa mfomsoɔ a ɛdi kan no so na ɛyɛɛ ZEC atoro biara a, saa atutena akontabuo yi ne baabi a anka ɛbɛda adi.

Turnstiles nyɛ ade foforo mma Zcash. Netwɛk no de adi dwuma pɛn, wɔ ahye a ɛda Sprout, Sapling, ne Orchard atare no ntam, sɛnea ɛbɛyɛ a botae a ɛkɔ atare ntam no bɛkɔ so ahwɛ na ɔtare biara ntumi nyi nea ɛboro nea wɔahyɛ mu wɔ mmara kwan so no adi.

Mmara a wɔpene so no ma boɔ a ɛsom boɔ biara, a Ironwood ka ho, kɔ ntwamutam no sika anohyetoɔ a ɛkyɛn so mu, enti pool a ɛkari pɛ no ntumi nkɔ bɔne da.

## Nea ɛsɛ sɛ wɔn a wɔde di dwuma no yɛ

Wallet ne node software di eyi mu dodow no ara ho dwuma ara kwa, nanso nsakrae a mfaso wɔ so no yɛ mmerɛw: bere kɔ so no, fa nneɛma a wɔabɔ ho ban fi Orchard ɔtare dedaw no mu fa turnstile no mu kɔ Ironwood ɔtare no mu. Di akwankyerɛ a efi wo wallet provider no hɔ akyi, na bere nyinaa yɛ foforo kɔ release a wɔboa so ansa na activation block no aba.

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Ɔtare a wɔabɔ ho ban | Sika a wɔahyehyɛ a wɔde zero-knowledge cryptography de ne sika ne ne wuranom asie |
| Nnyigyei bɔne bug | Mfomsoɔ a ɛma asɛm a ɛnni mu twa adanseɛ nhwehwɛmu no te sɛ nea ɛyɛ nokware |
| Turnstile a wɔde dannan nneɛma | Ɔmanfoɔ checkpoint a ɛkan boɔ a ɛkɔ pools ntam ma enti supply no kɔ so yɛ auditable |
| Sika a wɔsɛe no nkutoo | Pool a wobɛtumi asɛe sika afiri mu, nanso wuntumi mfa boɔ foforɔ nka |
| Ntwamutam a wɔde yɛ adwuma (NU) | Nsakrae a wɔayɛ no biako wɔ Zcash mmara a wɔpene so no mu, a wɔayɛ adwuma wɔ block height a wɔahyɛ ato hɔ |
| Quantum-a wɔsan nya no nsow | A note format a wɔayɛ sɛnea ɛbɛyɛ a wobetumi asan anya sika sɛ quantum kɔmputa ahorow bu nnɛyi cryptography |

## FAQ

So ɛkaa me ZEC no? Dabi, adanse biara nni hɔ a ɛkyerɛ sɛ wɔde bɔne no dii dwuma da, nkɛntɛnso biara nni sika a wɔde di dwuma no so, na nsakrae biara nni nneɛma a wɔde ma nyinaa mu.

So ɛsɛ sɛ meyɛ biribi? Ma wo sika kotoku ne node softwea no nyɛ foforo nkɔ nea wɔboa ansa na woasiw no kwan. Wo sika kotoku no de sika kɔ Ironwood bere a wosɛe sika no, enti biribiara nni hɔ a wɔde nsa yɛ a wode ahopere bɛyɛ. Di wo sika kotoku a ɔde ma no akwankyerɛ akyi.

So Zcash da so ara yɛ kokoam de? Aane. Ironwood kura kokoamsɛm a wɔabɔ ho ban koro no ara a ɛde nea ɔde kɔma, nea ogye, ne sika dodow sie no so. Saa nkɔsoɔ yi fa nneɛma a wɔde ma no mudi mu kura ho, ɛnyɛ kokoamsɛm.

So wɔde mmoawa no dii dwuma pɛn? Adanse biara nni hɔ a ɛkyerɛ sɛ na ɛte saa. Wɔnam ahobammɔ ho nhwehwɛmu so huu no, wɔde asɛyɛde daa no adi, na wosiesiee ansa na ɔhaw biara a wonim no reba.

Dɛn na ɛba Orchard ɔtare dedaw no so? Ɛbɛyɛ nea wɔsɛe no nkutoo. Botae foforo biara ntumi nkɔ mu, na bo a ɛwɔ hɔ dedaw no fa turnstile no so kɔ Ironwood, baabi a wɔyɛ atutra no ho akontaabu wɔ baguam.

## Sɔ wo ntease hwɛ

Sɛ wɔde ZEC a ɛwɔ atare a wɔabɔ ho ban mu no asie a, ɛbɛyɛ dɛn na obi atumi asi so dua sɛ Orchard mmoawa no anhyɛ nneɛma a wɔde ma nyinaa mu wɔ kokoam?

<details>
<summary>Answer</summary>

Ɛdenam turnstile no so. Wɔkan sika biara a efi Orchard ɔtare dedaw no mu wɔ ɔmanfo beae bi a wɔhwɛ nneɛma so bere a ɛhyɛn Ironwood no. Sɛ bo a ɛsom pii bɔ mmɔden sɛ ebefi mu asen nea wɔde hyɛ mu wɔ mmara kwan so a, na akontaabu no renkari pɛ, enti na atoro biara a anka bɔne no betumi de aba no bɛda adi wɔ saa pon no so.
</details>

### Akadeɛ

[ZIP 258: NU6.3 Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard Bere Tiaa mu Nneɛma a Ɛyɛ Den a Wɔbrɛ ase ne NU6.2 Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0257)

[ZIP 2005: Dadeɛ Nnua Quantum Recoverability](https://zips.z.cash/zip-2005)

[Ironwood: Ɔtare Foforo a Wɔabɔ ho ban ma Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Hwɛ nso

[Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)

[Atare a Wɔabɔ Ho Ban](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS NKYERƐKYERƐMU](../zcash-tech/zk-snarks)

[Post Quantum Ahobammɔ](../zcash-tech/post-quantum-security)

[Labs a Wɔabɔ ho Ban](../zcash-organizations/shielded-labs)

[Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Dada: [NU6.2](../zcash-tech/nu6-2)
