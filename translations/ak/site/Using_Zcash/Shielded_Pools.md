<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Botae a Wɔde Yɛ Adwuma 

## TL;DR

- Zcash mprempren wɔ **5 value pools**: Sprout (agyapade), Sapling, Orchard (wɔsɛe sika nkutoo), Ironwood, ne Transparent.
- **Ironwood** yɛ mprempren ɔtare a wɔabɔ ho ban titiriw, ɛte ase fi bere a wɔyɛɛ NU6.3 foforo wɔ 28 July 2026.
- **Orchard** seesei **spend-only**: boɔ foforɔ biara ntumi nkɔ mu, na sika a ɛwɔ hɔ dada no tu kɔ Ironwood.
- **Sapling** (z-address ahorow a efi ase `zs`) da so ara boa kɛse na ɛkɔ so nya ZEC a wɔabɔ ho ban dodow a ɛho hia.
- **Transparent** addresses (t...) mma atɔfoɔ kokoamsɛm biara na ɛyɛ adwuma te sɛ Bitcoin.
- **Sprout** yɛ agyapadeɛ shielded pool a wɔakɔ pɛnhyen afiri dwumadie a ɛyɛ nnam mu.
- Orchard to Ironwood atutra no **rekɔ so** na turnstile no na ɛhwɛ so wɔ baguam.
- Sɛ wopɛ kokoam nsɛm ho bɔhyɛ a emu yɛ den a, ɛsɛ sɛ wɔn a wɔde di dwuma no kɔ so pɛ **shielded-to-shielded (z → z)** nkitahodi bere biara a ɛbɛyɛ yiye.


<br/>

## Zcash Value Pools ho ntease

Zcash kyekyɛ sika mu kɔ akontabuo nhyehyɛeɛ soronko a wɔfrɛ no value pools mu. Pool biara wɔ n’ankasa cryptographic mmara ne kokoam nsɛm, bere a protocol no di bo a ɛsom nyinaa a ɛkɔ wɔn ntam no akyi.

Ɛnnɛ, netɛw no kura botae titiriw anum:

- Transparent — Ɔmanfo na wotumi hu koraa wɔ nkɔnsɔnkɔnsɔn so.
- Sapling — Nnɛyi ɔtare a wɔabɔ ho ban a edi kan a wogye tom kɛse, a ɛda so ara yɛ adwuma.
- Orchard — Kan no titiriw titiriw shielded pool, mprempren spend-only.
- Ironwood — Mprempren ɔtare a wɔabɔ ho ban titiriw, a NU6.3 na ɛde bae.
- Sprout — Mfitiaseɛ shielded pool a wɔde sii hɔ ne Zcash wɔ afe 2016 mu.
  


Bere a Zcash renya nkɔso no, wobetumi de atare foforo a wɔabɔ ho ban aba de ama ahobammɔ, kokoamsɛm, dwumadie, ne akontabuo atu mpɔn berɛ a wɔhwɛ ma ɛne sika a ɛwɔ hɔ dada no hyia.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Mfonini 1: Nhyehyɛeɛ a ɛkyerɛ mprempren atare 4 a ɛwɔ hɔ wɔ October, 2025

<br/>

## Atare a Wɔabɔ Ho Ban no 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood ne mprempren ɔtare titiriw a wɔabɔ ho ban. Ɛyɛɛ adwuma wɔ 28 July 2026 wɔ block 3,428,143 sɛ NU6.3 network upgrade no fã, na ɛhɔ na shielded value foforɔ te seesei.

Ɛwɔ hɔ ɛfiri sɛ wɔhunuu mmerɛwyɛ bi wɔ Orchard’s proving system no mu wɔ May 2026. Adanse biara nni hɔ sɛ wɔde dii dwuma da, nanso mfomsoɔ no kyerɛ sɛ wɔantumi amfa adanseɛ no nko ara akyerɛ sɛ nneɛma a wɔabɔ ho ban no yɛ nokware. Sɛ́ anka wɔde patch bɛhyɛ baabi no, network no yɛɛ ɔtare foforo a ɛwɔ circuit a wɔateɛteɛ mu na ɛde bo a ɛsom no faa turnstile a ɛkan sika biara a ɛwɔ baguam no so. Saa akontaabu no ne nea ɛsan de ahotoso a ɛne sɛ wɔabɔ nneɛma a wɔabɔ ho ban no akyi koraa no ba.

Ironwood san de Orchard’s Action model ne Halo 2 adanse ahorow di dwuma, enti ɛyɛ n’ade saa ara da biara da. Nneɛma abien yɛ foforo: nkitahodi de v6 format di dwuma, na Ironwood nsɛm a wɔakyerɛw no yɛ **quantum-recoverable** ase [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005), a ɛkyerɛ sɛ sika kɔkɔɔ bi a ɛwɔ nkɔnsɔnkɔnsɔn mu no kɔ so yɛ nea wotumi san nya bio sɛ ​​daakye quantum kɔmputa bi bubu nnɛyi cryptography no a. Ɛno yɛ ɔkwan a wɔfa so san nya ahoɔden, ɛnyɛ quantum resistance, na ɛnyɛ nea ɛfa atare dedaw ho.

Wonhia address foforo. Address ahorow a wɔaka abom no bom agyefo pii, na sika kotoku paw ɔtare a ɛfata ma wo.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Mfonini 2: Nhyehyɛeɛ a ɛkyerɛ Orchard pool no firi October, 2025

<br/>

Wɔde Orchard Shielded Pool no yɛɛ adwuma wɔ May 31, 2022 sɛ NU5 network upgrade no fã. Orchard de shielded protocol foforo a ɛmaa ɛho nhia sɛ wɔyɛ nhyehyɛe a wotumi de ho to so na ɛbɛyɛɛ shielded pool titiriw a Unified Addresses (UAs) de di dwuma.

Orchard maa dwumadie, adwumayɛ yie, ne kokoamsɛm nyaa nkɔsoɔ kɛseɛ denam ayɔnkofa metadata a ɛtwetwe no so tew na ɛde atɔfoɔ nhwɛsoɔ a ɛyɛ mmerɛw a egyina Nneyɛeɛ so baeɛ sene atetesɛm mu nneɛma a wɔde ba ne nea wɔde ba a wɔabɔ ho ban.

Efi bere a Ironwood upgrade no yɛɛ adwuma wɔ 28 July 2026 no, **Orchard yɛ nea wɔsɛe no nkutoo**. Botae foforo biara ntumi nkɔ pool no mu. Sika a wɔde asie dedaw no da so ara tumi sɛe, na wɔretu akɔ Ironwood denam turnstile no so. Sika kotoku di eyi ho dwuma ma wo, ɛwom sɛ dodow no ara ma wunya ahoɔhare no so tumi kakra de.

Sɛ wokura Orchard sika a, hwɛ [Dade dua](/zcash-tech/ironwood) esiane nea atutra no kyerɛ wɔ nneyɛe mu nti.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Mfonini 3: Nhyehyɛeɛ a ɛkyerɛ Sapling pool no firi October, 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) was an upgrade to the Zcash protocol introduced on 28th of October, 2018. Ɛyɛ nkɔsoɔ kɛseɛ wɔ kan version a wonim no sɛ Sprout a na ɛwɔ anohyetoɔ bi wɔ kokoamsɛm, adwumayɛ yie ne dwumadie mu. 

Nkɔsoɔ no bi ne adwumayɛ a wɔatu mpɔn ama address a wɔabɔ ho ban, Nsakyeraeɛ safoa a wɔatu mpɔn a ɛbɛma wɔn a wɔde di dwuma no atumi ahwɛ nkitahodiɛ a ɛba ne nea ɛfiri adi a wɔrenkyerɛ ɔdefoɔ kokoam safe ne Independent Zero Knowledge safe a wɔde yɛ hardware sika kotokuo berɛ a wɔde wɔn nsa ahyɛ aseɛ. 

Zcash Sapling ma wɔn a wɔde di dwuma no tumi yɛ kokoam nnwuma wɔ sikani kakraa bi pɛ mu bere a wɔde toto bere tenten a egyee wɔ Sprout Series no ho no. 

Nkitahodi ho banbɔ ma kokoamsɛm yɛ kɛse, na ɛmma ɛnyɛ yiye sɛ nnipa a wɔto so abiɛsa bɛka nkitahodi ahorow ho na wɔakyerɛ ZEC dodow a wɔde bɛkɔ baabi foforo. Sapling nso ma dwumadie tu mpɔn denam kɔmputa so ahwehwɛdeɛ a ɛma wɔyɛ kokoam nkitahodiɛ a ɛtew so denam ma a ɛma wɔn a wɔde di dwuma no tumi nya bi no so.

Sapling sika kotoku address fi ase "zs" na wobetumi ahu eyi wɔ Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk ne nea ɛkeka ho) a wɔboa nyinaa a ɛwɔ Sapling address ahorow a wɔasisi mu. Zcash Sapling gyina hɔ ma nkɔso titiriw wɔ mfiridwuma mu bere a ɛfa kokoamsɛm ne nkitahodi a etu mpɔn ho a ɛma Zcash yɛ cryptocurrency a mfaso wɔ so na etu mpɔn ma wɔn a wɔde di dwuma a wobu kokoamsɛm ne ahobammɔ sɛ ɛsom bo.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Mfonini 4: Nhyehyɛeɛ a ɛkyerɛ Sprout pool no firi October, 2025

Sprout ne Zero Knowledge kokoam nsɛm ho nhyehyɛe a edi kan a wɔabue ano a wɔmma ho kwan a wɔde sii hɔ pɛn. Wɔde sii hɔ wɔ Ɔkɔtɔberɛ da a ɛtɔ so aduonu nwɔtwe, afe 2016.

Wɔde wɔn nkyerɛwde abien a edi kan a ɛyɛ "zc" bere nyinaa na ɛkyerɛ sprout address ahorow. Wɔtoo din "Sprout" a atirimpɔw titiriw ne sɛ wobesi so dua sɛ software no yɛ kumaa, blockchain a ɛrefifi a ɛwɔ tumi kɛse sɛ ebenyin na abue ama nkɔso. 

Wɔde Sprout dii dwuma sɛ adwinnade a edi kan ma [Zcash brɛoo fi ase Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) a ɛde ZEC ne Block akatua a wɔkyekyɛ maa Miners bae. 

Berɛ a Zcash abɔdeɛ a nkwa wom nhyehyɛeɛ no kɔɔ so trɛwee wɔ nnwuma a wɔabɔ ho ban dodoɔ a ɛrekɔ soro no, wɔhunuu sɛ Zcash Sprout Series no bɛyɛɛ nea anohyetoɔ wɔ mu na ɛnyɛ adwuma yie berɛ a ɛfa ɔdefoɔ kokoamsɛm, nkitahodiɛ a wɔtumi sesa ne dwumadie ho. Eyi maa wɔyɛɛ nsakrae wɔ network no ne Sapling Upgrade no mu. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Mfonini 5: Nhyehyɛeɛ a ɛkyerɛ Transparent pool no firi October, 2025

<br/>

Zcash Transparent pool no nni shielded na ɛnyɛ kokoam de. Transparent wallet address wɔ Zcash fi ase de nkyerɛwde "t", kokoamsɛm sua koraa wɔ address type yi a wɔde bedi dwuma ama nnwuma mu.

Transparent transactions wɔ Zcash mu no te sɛ Bitcoin transactions a ɛboa multi-signature transactions na ɛde standard public addresses di dwuma.

Zcash Transparent no, centralized exchanges na wɔde di dwuma kɛse de hwɛ sɛ transparency ne network confirmation a ɛkorɔn wɔ hɔ bere a wɔde ZEC remena na wɔagye wɔ wɔn a wɔde di dwuma no ntam no.

Ɛho hia nso sɛ yɛhyɛ no nsow sɛ ɛwom sɛ Zcash Shielded address ahorow ma kokoamsɛm a ɛkorɔn bere a wɔreyɛ nnwuma no, ɛsan nso hia kɔmputa so nneɛma pii na wɔde adi nkitahodi ho dwuma. Enti, ebinom a wɔde di dwuma no betumi agye Transparent addresses ama nnwuma a enhia kokoamsɛm a ɛte saa ara.

<br/>

## Pool Transfer Adeyɛ a Wɔkamfo Kyerɛ

Sɛ ɛba sɛ wobɛsusu kokoamsɛm a ɛkorɔn ho berɛ a woreyɛ atɔ wɔ Zcash Network so a, wɔkamfo kyerɛ sɛ di nneyɛeɛ a ɛwɔ aseɛ ha yi akyi;

Nkitahodi a ɛkɔ so wɔ "z kosi z" sika kotoku ntam wɔ Zcash blockchain no mu dodow no ara yɛ nea wɔabɔ ho ban na ɛtɔ mmere bi a wɔfrɛ no Private Transaction esiane Privacy a ɛkorɔn a wɔayɛ nti. Eyi taa yɛ ɔkwan a eye sen biara na wɔkamfo kyerɛ sen biara a wɔfa so de $ZEC mena na wogye bere a ɛho hia sɛ wode kokoam nsɛm sie. 

---

Sɛ wode ZEC fi "Z-address" kɔ "T-address" so a, ɛkyerɛ Deshielding asɛm bi kɛkɛ. Wɔ saa asɛm yi mu no, ɛnyɛ bere nyinaa na kokoam nsɛm no kɔ soro efisɛ nsɛm bi bɛda adi wɔ blockchain no so esiane nkɛntɛnso a ɛwɔ ZEC a wɔde bɛmena wɔ Address a ɛda adi so nti. Ɛnyɛ bere nyinaa na wɔkamfo deshielding transaction kyerɛ bere a ɛho hia sɛ wɔde kokoam nsɛm a ɛkorɔn sie no. 

---

ZEC a wɔde fi Transparent Address (T-address) mu kɔ Z-address so no, wɔfrɛ no Shielding kɛkɛ. Wɔ saa ayɔnkofa yi mu no, ɛnyɛ bere nyinaa na kokoamsɛm dodow no kɔ soro bere a wɔde toto z-z asɛm no ho nanso wɔkamfo kyerɛ nso bere a wɔhwehwɛ kokoam nsɛm. 

---

ZEC a wode firi Transparent Address (T-address) so kɔ Transparent Address (T-address) foforɔ so wɔ Zcash Network (T-T transaction) so no te sɛ Bitcoin transaction deɛ no ara pɛ na yei nti na wɔfrɛ T-T transactions wɔ Zcash so Public transactions bere nyinaa ɛfiri sɛ deɛ ɔde soma ne deɛ ogye no nyinaa transaction ho nsɛm bɛda adi ama ɔmanfoɔ a ɛma Privacy level no ba fam paa wɔ saa transaction mu. 

Cryptocurrency Centralized exchanges dodow no ara de Transparent Address ("T-address) di dwuma bere a ɛfa nkitahodi wɔ Zcash blockchain no so nanso saa asɛm yi (T-T) rennya kokoam agyapade biara.

<br/>

## The Orchard to Ironwood Migration

The migration is happening now. Orchard is sealed to new deposits, and the value still sitting there is moving into Ironwood a transaction at a time. You can watch the totals at [dade dua.nkwa](https://ironwood.live/).

Nea eyi kyerɛ no gyina baabi a wo sika wɔ so:

1. **Adwuma foforo a wɔabɔ ho ban** kɔ Ironwood mu ara kwa. Biribiara nni hɔ a ɛsɛ sɛ wɔyɛ.
2. **Orchard sika a ɛwɔ hɔ dedaw** hia sɛ wotu kɔ baabi foforo. Sika kotoku a wɔasiesie no yɛ eyi ma wo, mpɛn pii no wɔ akwan horow so sen sɛ wɔbɛyɛ ne nyinaa prɛko pɛ.
3. **Sapling nnya nkɛntɛnsoɔ** na ɛda so ara gye sika. Orchard nkutoo na wɔsɔɔ ano.
4. **Turnstile no kan biribiara** a ɛtwam wɔ atare ntam, a ɛno ne nea ɛkyerɛ sɛ wɔanyɛ sika biara wɔ kwan no so.

> **Kokoamsɛm ho kɔkɔbɔ biako a ɛfata sɛ wuhu.** Turnstile no tintim *dodow* a ɛtwam wɔ atare ntam, ne block no sorokɔ. Nea ɔde kɔma ne nea ogye no tra hɔ ahintaw sɛnea ɛte daa, nanso wobetumi de sika soronko bi asan abata wo ho. Eyi nti na sika kotoku tu kɔ mmeae foforo wɔ akwan horow so denam gyinapɛn ahorow a wɔde di dwuma so sen sɛ ɛbɛma wo sika a aka no akɔ baabiara wɔ akuwakuw biako a wotumi hu mu no. Ma wo sika kotoku no nkɔ ntɛmntɛm, na susuw ho sɛ wode Tor anaa VPN bedi dwuma sɛnea ɛbɛyɛ a wo IP no renkyekyere sika dodow a wode tu no.

Hwɛ [Dade dua](/zcash-tech/ironwood) ma upgrade no ankasa, na [Turnstile a ɛwɔ hɔ no](/zcash-tech/the-turnstile) sɛnea akontaabu no yɛ adwuma no ho.

<br/>

## Mfomso a Wɔtaa Tu a Ɛsɛ sɛ Wɔkwati

- **Sɛde fi t-address so kɔ t-address so** — baguam koraa, kokoamsɛm biara nni hɔ. Bere nyinaa di kan bɔ sika ho ban.
- **Sɛ yɛfa no sɛ Orchard da so ara gye sika** — ɛyɛ spend-only fi 28 July 2026. Value betumi afi hɔ, nanso biribi foforo biara nkɔ mu
- **Sapling ne Unified address ahorow a ɛyɛ basaa** — Sapling address ahorow no fi ase `zs`. Address ahorow a wɔaka abom fi ase `u1` na bundle receivers pii, enti pool a wo sikatua no besi mu no gyina receivers a saa address no de kɔ so
- **Sika a wobegyaw wɔ Sprout pool no mu** — Wɔagyae Sprout mfe pii; fa saa sika no kɔ baabi foforo
- **Wɔhwɛ kwan sɛ atutra bi bɛyɛ nea wontumi nhu koraa** — sika dodow a ɛtwa turnstile no yɛ ɔmanfo de, ɛwom mpo sɛ nea ɔde kɔma ne nea ogye no nyɛ saa de
- **Sɛ yɛfa no sɛ t → z (kyɛm) yɛ kokoam koraa** — adeyɛ a ɛfa kyɛm ho no ankasa da adi wɔ nkɔnsɔnkɔnsɔn so; emu nsɛm no nyɛ saa

---

## Nkratafa a Ɛfa Ho

- [Dade dua](/zcash-tech/ironwood) — Upgrade a ɛyɛɛ mprempren pool no
- [Turnstile a ɛwɔ hɔ no](/zcash-tech/the-turnstile) — Sɛnea wɔyɛ bo a ɛkɔ soro wɔ pool ahorow ntam no ho akontaabu
- [Sika kotoku](/using-zcash/wallets) — Nea sika kotoku a wɔhwɛ so na Ironwood ayɛ krado
- [Nkitahodi ahorow](/using-zcash/transactions) — Sɛnea wɔde shielded transactions mena
- [ZEC a wobɛtɔ](/using-zcash/buying-zec) — ZEC a wobenya ansa na wode adi dwuma wɔ atare mu
- [ZK-SNARKs na wɔkyerɛwee](/zcash-tech/zk-snarks) — Cryptographic fapem a ɛwɔ atare a wɔabɔ ho ban so
- [Dɛn ne ZEC ne Zcash](/start-here/what-is-zec-and-zcash) — Akyisɛm a ɛfa Zcash kokoam nsɛm ho
