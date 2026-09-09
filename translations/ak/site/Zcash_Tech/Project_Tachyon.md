<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dwumadie Tachyon

## TL;DR

- Tachyon yɛ ɔkwan a wɔahyɛ sɛ wɔbɛsan ayɛ wɔ ɔkwan a Zcash sika kotokuo hwehwɛ na wɔsɛe sika a wɔabɔ ho ban, a ɛkyerɛ sɛ ɛbɛma ntwamutam no anyin akɔ nnipa dodoɔ a wɔde di dwuma no mu
- Ɛnnɛ ɛsɛ sɛ sika kotoku bɔ mmɔden sɛ ɛbɛkyerɛkyerɛ blockchain no mu kyɛfa kɛse bi mu na ama wɔahu sikatua a ɛyɛ n’ankasa de, na ɛno ne ade titiriw nti a shielded syncing te nka sɛ ɛyɛ brɛoo
- Tachyon de **oblivious synchronization** si saa ananmu, enti sika kotoku bi gye nea ehia a ɛnhwɛ biribiara na ɛnkyerɛ server bi sɛ afã horow a na ɔpɛ
- Ɛsan nso de sikatua ho nsɛm fi blockchain no mu kɔ sikatua adesrɛ no ankasa mu, a ɛma protocol no yɛ mmerɛw nanso ɛdan asɛyɛde no kɔ sika kotoku so
- Ɛyɛ nsusuiɛ, wɔdii kan tintimii wɔ Ayɛwohomumɔ 2025 mu na wɔbɔɔ din sɛ obi a ɔpɛ sɛ ɔyɛ NU7. Ɛnyɛ **wɔmfa nkɔ**, na ɛhia mfiridwuma mmɔdenbɔ wɔ Sapling nkɔsoɔ no kɛseɛ so

<br/>

## Hena na eyi yɛ ma no

- Obiara a wahwɛ sɛnea sika kotoku a wɔabɔ ho ban yɛ sync na wasusuw nea enti a egye bere tenten saa no ho
- Wɔn a wɔaba foforo a wɔkɔ so hu Tachyon a wɔaka ho asɛm wɔ NU7 ne Zcash scaling nkyɛn
- Akenkanfo a wɔpɛ adwene no kan na wɔpɛ cryptography no nea ɛto so abien

<br/>

## Ɔhaw a Tachyon di ho dwuma

Zcash de sie nea akatua bi yɛ ma no. Ɛno ne asɛm no nyinaa, na ɛde ɔhaw a ɛyɛ fɛre ade ba: sɛ obiara ntumi nkyerɛ onii ko a sika a wotua no yɛ ne de a, ɛbɛyɛ dɛn na w’ankasa sika kotoku ahu wo de?

Wɔ Bitcoin mu no eyi yɛ mmerɛw. Address ahorow yɛ ɔmanfo de, enti sika kotoku betumi abisa server bi sɛ "dɛn na wɔde kɔmaa address yi?" na nya mmuae. Zcash sika kotoku ntumi mmisa saa asɛm no, efisɛ sɛ wobisa a, ɛbɛda nea wɔayɛ ɔtare a wɔabɔ ho ban no sɛ ɛde besie no adi pɛpɛɛpɛ.

Enti Zcash yɛ biribi soronko. Nea ɔde kɔmaa no de sikatua ho nsɛm no sie na ɔde hyɛ asɛm no ankasa mu. Afei wo sika kotoku no nam nkitahodi ahorow a ɛwɔ nkɔnsɔnkɔnsɔn no so so yɛ adwuma na ɛbɔ mmɔden sɛ ɛbɛkyerɛkyerɛ emu biara mu. Ɛkame ayɛ sɛ mmɔden biara a wɔbɔ no di nkogu. Kakraa bi a edi nkonim ne sika a wutua. Wɔfrɛ eyi **trial decryption**, na ɛyɛ kokoam, ɛteɛ, na ɛyɛ brɛoo.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Nea wɔkyere no ne nea adwuma no gyina so. Mmɔdenbɔ a wo sika kotoku no sɛe no gyina sɛnea nkɔnsɔnkɔnsɔn no kɛse te so, na ɛnyɛ sika dodow a wunyae ankasa. Ɛkame ayɛ sɛ obi a onnyaa akatua biako mpo yɛ adwuma pii te sɛ obi a ogye no da biara da. Bere a Zcash nyin no, ɛno yɛ kɛse ma obiara. Wɔ nyansahyɛ no nsɛm mu no, "ɛnyɛ scale kɛkɛ."

<br/>

## Nea Tachyon sesa

Tachyon tow hyɛ ɔhaw no so wɔ ne ntini mu: egyae blockchain no a wɔde di dwuma sɛ ɔkwan a wɔfa so de nneɛma kɔma ahintasɛm.

Mmom no, nsɛm a wuhia no tu kwan ne sikatua adesrɛ no ankasa, fi band. Katua ho adesrɛ, URI, anaa QR code de nsɛm a kan no na wɔde sie wɔ asɛm no mu no kɔ. Sean Bowe ka eyi ho asɛm sɛ wɔagye **out-of-band payments** atom nea edi kan wɔ Zcash shielded protocol mu.

Sɛ nkɔnsɔnkɔnsɔn no nkura saa nsɛm no bio a, wo sika kotoku no nni nea enti a ɛsɛ sɛ ɛhwehwɛ mu bio, na sɔhwɛ decryption haw no yera.

Nanso, ɛho da so ara hia sɛ wo sika kotoku no hu mprempren nkɔnsɔnkɔnsɔn tebea na ama woatumi asɛe sika. Ɛno ne nhyehyɛɛ no ​​fã a ɛtɔ so mmienu, **oblivious synchronization**: ɔkwan a sika kotokuo fa so de nneɛma pɔtee a ɛhia a ɛnkyerɛ nneɛma a ɛbisaa no nkyerɛ server no.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Nea anka ɛbɛkyerɛ ama obi a ɔde sika kotoku di dwuma

- **Syncing gyae nyin ne nkɔnsɔnkɔnsɔn no.** Bere a wo sika kotoku de kyere no bɛdi w'ankasa wo dwumadi akyi sen sɛ wobɛhwɛ Zcash kɛse.
- **Atua a wotua no bɛyɛ te sɛ sika a wɔde bɛhyɛ obi nsa.** Katua adesrɛ no kura nea nea ogye no hia, enti nsakrae a ɛda nea ɔde kɔma ne nea ogye ntam no ho hia sen sɛnea ɛte nnɛ.
- **Wllets kura asɛdeɛ pii.** Esiane sɛ nkɔnsɔnkɔnsɔn no nkura wo sikatua ho nsɛm a wɔabɔ no kokoam bio nti, wo sika kotokuo data a wobɛhwere no ho hia kɛseɛ. Backup ne recovery tu fi sɛ ɛyɛ protocol feature kɔ biribi a wallet software ɛsɛ sɛ ɛyɛ yiye.
- **Asinasin bi a wonim no tu anaasɛ ɛyera.** Tachyon yi safoa ahorow ahorow, safe a wɔhwɛ, ne address a wotua ho ka fi core protocol no mu, na ogyaw ma sika kotoku no. Eyi yɛ nsusuwii no afã horow a ɛde ba kɛse no mu biako na wɔda so ara reyɛ ho adwuma.

<br/>

## Mfiridwuma ho akenkanfo a wɔbɛhwehwɛ mu yiye

Wɔka Tachyon ho asɛm sɛ nsakraeɛ a ɛne no hyia wɔ Orchard protocol no mu. Wobetumi de adi dwuma sɛ nkɔso a wɔde bɛkɔ Orchard pool a ɛwɔ hɔ dedaw no mu anaasɛ sɛ ɔtare a wɔabɔ ho ban a ɛyɛ soronko a wɔfa a [turnstile a wɔde dannan nneɛma](https://zechub.wiki/zcash-tech/the-turnstile), afiri koro no ara a Zcash de yɛɛ Ironwood no. Nea wɔpaw no ka sɛnea wɔde di dwuma no, na ɛnyɛ sɛnea wɔyɛ no.

Ɛkora nneɛma pii so firi Orchard: RedPallas safoa re-randomization, homomorphic value commitments ne binding signatures, ne partitioned key structure a ɛma device delegate di adanseɛ a ɛnfa spend tumidi nhyɛ.

Scaling adwuma no gyina **proof-carrying data** so, ɔkwan a data fa so tu kwan ka adanse a ɛkyerɛ sɛ ɛyɛ n’ankasa nokware ho, sɛnea ɛbɛyɛ a sɛ wɔde ka data afoforo a ɛde adanse di dwuma ho a, ɛma wonya biribi a enya saa adanse ahorow no fi awo mu na ɛtrɛw mu. Eyi ne nea ɛma wotumi mia adwuma pii a wɔagye atom no mu ma ɛyɛ biribi ketewaa bi a wotumi hwɛ mu ntɛmntɛm. Halo a kuw a ɛwɔ Zcash akyi no hui no ne nea ɛmaa data a wɔde di adanse no yɛɛ nea mfaso wɔ so a wobetumi de asi so.

Nhama a ɛtɔ so mmiɛnsa ne **shielded transaction aggregates**, a ɛsesa sɛdeɛ wɔde shielded state nsakraeɛ di nkitaho na ɛwɔ knock-on effects wɔ sɛdeɛ signing yɛ adwuma no so.

<br/>

## Baabi a adwuma no gyina

Tachyon yɛ **nsusuwii, ɛnyɛ ade a wɔde mena**. Wɔtintim no wɔ Ayɛwohomumɔ 2025 mu, na asɛm bi a ɛdi akyire wɔ May 2025 mu no yɛɛ adwuma denam nsunsuansoɔ a ɛfa adwene a wɔhyiaeɛ ho no so. Wɔabɔ din sɛ obi a ɔpɛ sɛ ɔyɛ NU7, nkɔso kɛse a edi hɔ wɔ Ironwood akyi, nanso NU7 mu nsɛm no, wɔde coinholder abatow na esi ho gyinae na wɔansiesie Tachyon ho biribiara.

Ɔkyerɛwfo no ankasa nhyehyɛe ne sɛ eyi yɛ nhyehyɛe a wobetumi de adi dwuma mmom sen nhwehwɛmu a wɔde nsusuwii hunu ayɛ, nanso ehia mfiridwuma mu mmɔdenbɔ a wɔde toto Sapling ho, a wɔahyɛ da agyaw nsɛmmisa bi a emu yɛ den ama akyiri yi.

Adwuma a ɛfa ho no da adi dedaw. [Zakura na ɔkyerɛwee](https://zechub.wiki/zcash-tech/zakura-node), node a ɛyɛ pɛpɛɛpɛ a wɔyii no adi wɔ July 2026 mu no, yɛ mmɔdenbɔ a wɔaka abom a ɛda Project Tachyon ne Valar Kuo no ntam na ɛdi kan hwɛ nsakraeɛ a ɛba wɔ network-level yi bi. [Kokoam nsɛm a wogye](https://zechub.wiki/zcash-tech/private-information-retrieval) nhwehwɛmu de wɔn ani asi scanning bottleneck koro no ara so fi ɔkwan foforo so.

<br/>

## Adwene a ɛnteɛ a wɔtaa nya

- **Tachyon nyɛ live.** Wallet biara nni hɔ a ɛde di dwuma nnɛ, na upgrade biara nyɛɛ no ​​adwuma.
- **Tachyon ne Ironwood nyɛ pɛ.** Ironwood yɛɛ adwuma wɔ July 2026 mu na ɛdii Orchard pool ne turnstile no ho dwuma. Tachyon yɛ nyansahyɛ a ɛyɛ soronko, akyiri yi a ɛfa scaling ho.
- **Tachyon nyɛ kokoam nsɛm a wɔtew so.** Botae no ne sɛ wɔbɛma ledger no ayɛ nea wontumi nhu nsonsonoe bere a woyi scaling ka no fi hɔ, na ɛnyɛ sɛ wɔbɛsesa kokoamsɛm de agye ahoɔhare.
- **zk-SNARK verification was never the bottleneck.** Nsusuwii no da adi pefee sɛ ɔfã a ɛyɛ brɛoo no ne sɛnea sika kotoku hu na ɛhyehyɛ tebea, ɛnyɛ ɛka a wɔbɔ wɔ adanse a wɔhwɛ mu.
- **"Targeted at NU7" nyɛ bɔhyɛ.** Nea ɛkɔ NU7 mu no, wɔde abatow na esi ho gyinae.

<br/>

## Nsɛmfua Nkyerɛase

| Asɛmfua | Nkyerɛaseɛ |
|---|---|
| Sɔhwɛ decryption | Mmɔden a wobɛbɔ sɛ wobɛpae nkitahodi ahorow no mu mmiako mmiako de ahwehwɛ nea wɔde akɔma wo no |
| In-band kokoam nkyekyɛmu | Wɔde sikatua ahintasɛm no to asɛm no mu wɔ blockchain no so, sɛnea Zcash yɛ nnɛ |
| Out-of-band akatua a wotua | Sikatua ho nsɛm a wɔde bɛfa nea ɔde kɔma ne nea ogye no ntam tẽẽ sen sɛ wɔbɛfa nkɔnsɔnkɔnsɔn |
| Oblivious synchronization | Fetching chain data a wallet hia a wonkyerɛ data a wɔbisae |
| Adanse a wɔde kura data (PCD) | Data a ɛde adanse a ɛkyerɛ sɛ ɛyɛ nokware tu kwan, enti wobetumi aka adanse ahorow abom na wɔabɔ |
| Shielded ayɔnkofa aggregate | Tachyon kwan a ɔfa so bundling shielded state sesa, ɛsakra sɛnea wɔde di nkitaho na wɔde wɔn nsa hyɛ ase |
| Ledger a wontumi nkyerɛ nsonsonoe a ɛda ntam | Agyapadeɛ a ɛbɔɔ nnwuma ho ban no, wɔrentumi nka no ntetew mu mfi wɔn ho wɔn ho |

<br/>

## FAQ

**So eyi bɛma me sika kotoku no ayɛ sync ntɛmntɛm?** Ɛno ne botae no. Bere a wode bɛyɛ synch no bedi w’ankasa dwumadi akyi sen sɛ wubedi nkɔnsɔnkɔnsɔn no kɛse akyi. Biribiara nnyaa po so hyɛn, enti akontaabu biara nni hɔ a wɔasusuw a wɔbɛfa aka de besi nnɛ.

**So ɛhia sɛ meyɛ biribiara seesei?** Dabi Tachyon yɛ proposal. Sɛ wogye tom a, anka ɛbɛba denam network upgrade a wɔde amanneɛbɔ a wɔtaa de ma no so.

**So sɛ woyi viewing keys fi hɔ a, ɛkyerɛ sɛ wobɛhwere tumi a wode bɛkyɛ akenkan kwan no?** Nsusuwii no de saa tumi no fi core protocol no mu kɔ wallet layer no mu. Sɛnea ɛno te wɔ nneyɛe mu no yɛ nsɛmmisa a wɔabue ano no mu biako.

**So me sika wɔ asiane mu sɛ Tachyon po so hyɛn a?** Deployment de Orchard upgrade anaa turnstile bedi dwuma, abien no nyinaa ayɛ sɛnea ɛbɛyɛ a bo no bɛkɔ wɔ ɔmanfo akontaabu mmara ase. Ironwood kratafa no kyerɛkyerɛ sɛnea turnstile yɛ adwuma mu.

<br/>

## Nkratafa a ɛfa ho

- [Kokoam Nsɛm a Wɔgye](https://zechub.wiki/zcash-tech/private-information-retrieval) - kwan foforo a wofa so fa saa sika kotokuo scanning bottleneck koro no ara ho
- [Zakura Node na ɔkyerɛwee](https://zechub.wiki/zcash-tech/zakura-node) - node a wokyekyeree no fã bi fi Tachyon mfiridwuma mmɔdenbɔ mu
- [Dade a Wɔde Yɛ Nnua](https://zechub.wiki/zcash-tech/ironwood) - upgrade a ɛyɛɛ adwuma wɔ July 2026 mu, a ɛtaa yɛ basaa ne Tachyon
- [Turnstile a ɛwɔ hɔ no](https://zechub.wiki/zcash-tech/the-turnstile) - afiri a Tachyon betumi de adi dwuma se deployed se n'ankasa pool
- [Quantum Akyi Ahobammɔ](https://zechub.wiki/zcash-tech/post-quantum-security) - a Tachyon tena bere tenten protocol adwuma ho
- [Sɛnea Wɔhyehyɛ Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - hwan na oye saa adwuma yi ne sedee ecosystem no hyia

<br/>

## Akadeɛ

- [Tachyon: Scaling Zcash ne Oblivious Nkɔso](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 April 2025, mfitiaseɛ nsusuiɛ
- [Tachyaction a Ɛwɔ Akyirikyiri](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, adwene a ɛwɔ mu ne protocol nkyerɛkyerɛmu, wɔkyerɛw maa protocol developers
- [Sean Bowe ne blog so na ɔkyerɛwee](https://seanbowe.com/blog/) - a wotintim Tachyon series no
- [tachyon.z.sika a wɔde yɛ adwuma](https://tachyon.z.cash/) - adwuma no beae
