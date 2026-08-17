<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Threshold Custody ma ZEC a Wɔabɔ ho ban

> Sɛ wopɛ FROST protocol no ho nsɛm a ɛfa cryptographic ho nyinaa a, hwɛ [FROST mfiridwuma ho kratafa](FROST.md).

FROST threshold custody kɔ so ba wɔ Zcash nkɔmmɔbɔ mu — na ɛyɛ track a ɛwɔ soro wɔ ZecHub Hackathon 2026 — nanso ɛnyɛ bere nyinaa na wɔkyerɛkyerɛ adwene no mu wɔ kasa a emu da hɔ mu. Kratafa yi ka nea ɛkyerɛ, bere a wuhia ankasa, aguadi a wɔde di gua, ne nnwinnade a ɛboa no nnɛ ho asɛm.

---

## TL;DR

- **FROST** ma kuw bi a wɔwɔ safoa bom di Zcash address a wɔabɔ ho ban so a obiara nni hɔ a okura kokoam safoa no nyinaa.
- **t-of-n** aboboano kyerɛ sɛ: ɛsɛ sɛ t nkurɔfo bom de wɔn nsa hyɛ ase sɛ wɔbɛsɛe sika; t-1 biara anaa nea ennu saa no nkutoo ntumi mfa sika no nkɔ baabiara.
- Nkitahodi te sɛ asɛm foforo biara a wɔabɔ ho ban — on-chain footprint biara nni hɔ a ɛda no adi sɛ wɔde threshold signing dii dwuma.
- Eyi yɛ soronko koraa wɔ multisig a ɛda adi (a ɛyɛ ɔmanfo on-chain na Zcash aboa bere tenten) — FROST yɛ adwuma wɔ shielded pool no mu.
- Ɛyɛ mfasoɔ ma DAOs, exchanges, custody services, joint savings, ne team treasuries — baabiara a asɛm baako a ɛdi nkoguo titire no nnye ntom.

---

## Dɛn ne FROST wɔ kasa a emu da hɔ mu?

Fa no sɛ adwumayɛfo baasa a wɔn mu biara kura safe bi. Sɛ wobetumi asɛe sika afi wɔn sika kotoku a wɔkyɛ mu a, ɛsɛ sɛ baasa no mu baanu biara pene so na wɔbom de wɔn nsa hyɛ ase. Aguadi a efi mu ba no te sɛ nea ɛne ankorankoro a wɔde mena daa no yɛ pɛ — ɔhwɛfo biara ntumi nhu mfi blockchain no mu sɛ nnipa pii na wɔde wɔn ho hyɛɛ mu.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) is the cryptographic protocol that makes this possible for shielded Zcash. It was created by Chelsea Komlo (University of Waterloo / Zcash Foundation) and Ian Goldberg.

Nneɛma atitiriw a ɛwɔ mu:

- **Threshold**: t-of-n signers nko ara na ɛhia sɛ wɔde wɔn ho hyɛ mu (e.g. 2-of-3, 3-of-5)
- **Shielded**: ɛyɛ adwuma wɔ Orchard kokoamsɛm pool no mu — sika dodow, nea ɔde kɔmaa, ne nea ogye no tra kokoam
- **Indistinguishable**: nsaano nkyerɛwee a etwa to no te sɛ Zcash shielded asɛm foforo biara
- **Non-custodial**: ɔfã biako biara nni hɔ a okura safoa a edi mũ no da — ɛnyɛ ɔhwɛfo no mpo

---

## Bere bɛn na ɛsɛ sɛ wode threshold custody di dwuma?

Threshold custody yɛ nteaseɛ berɛ a **sɛ wobɛhwere safoa baako anaa onipa baako a, ɛnsɛ sɛ ɛkyerɛ sɛ wobɛhwere sika no**.

| Tebea a Ɛwɔ | Nea enti a threshold custody boa |
|-----------|----------------------------|
| **DAO anaa kuw sikakorabea** | Admin biako biara nni hɔ a obetumi asɛe sika wɔ ɔfã biako; hwehwɛ sɛ wɔpene so |
| **Nsesa anaa ɔhwɛfoɔ** | Ɔkyekyɛ asiane titiriw mu wɔ ahobammɔ mmeae anaa adwumayɛfo |
| **Ankorankoro awɔw mu nneɛma a wɔde sie (a abusua a wogye wɔn di ka ho)** | 2-of-3 ntam wo + abusua mufoɔ mmienu — wuwu anaasɛ hwere kwan a wobɛfa so, sika nnyera |
| **Escrow** na ɛyɛ adwuma | Adetɔfo, adetɔnfo, ne ɔtemmufo biara kura kyɛfa; sika gyae bere a nnipa baanu pene so |
| **Mmoa a ɛsom bo kɛse a wɔde ma** | ZCG-style: hwehwɛ sɛ nnipa pii a wɔde wɔn ho hyɛ ase ansa na wɔatua |
| **Developer safoa sohwɛ** | Siw insider threat ano — engineer biako biara nni hɔ a obetumi asɛe protocol fund |

Ebia **nhia** threshold custody ma ankorankoro sika kotoku a wo nkutoo wohwɛ so, sika nketenkete, anaa tebea horow a coordination overhead a wɔde aka ho no boro asiane a wɔatew so no so.

---

## Ɔkwan bɛn so na ɛsono no wɔ multisig a ɛda adi pefee ho?

Zcash fi bere tenten aboa transparent multisig — safoa pii a ɛho hia sɛ wɔsɛe sika fi t-address so. Nanso multisig a ɛda adi pefee wɔ kokoamsɛm ho ka kɛse: **multisig nhyehyɛe no, ɔmanfo safe nyinaa, ne wɔn a wɔde wɔn nsa hyɛ ase nyinaa da adi wɔ blockchain no so**.

FROST siesie eyi denam adwuma a ɛyɛ wɔ ɔtare a wɔabɔ ho ban no mu no so:

| | Multisign a ɛda adi pefee | FROST aboboano (a wɔabɔ ho ban) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
| Signers a wotumi hu wɔ nkɔnsɔnkɔnsɔn so | Yiw — ɔmanfo nsafe nyinaa ada adi | Dabi — wontumi nkyerɛ nsonsonoe a ɛda obiako a ɔde ne nsa hyɛ ase sɛe |
| Sika dodow a wotumi hu | Yiw | Dabi |
| Nkitahodi a wɔhwehwɛ | On-nkɔnsɔnkɔnsɔn nkyerɛwee | Off-chain round a ɛfa nkitahodi ho |
| Kokoam nsɛm | Obiara nni hɔ | Full shielded kokoam nsɛm |

---

## Nneɛma a wɔde di gua ne anohyeto ahorow

FROST wɔ tumi, nanso ɛde aguadi ankasa a ɛsɛ sɛ wote ase ansa na wode adi dwuma ba:

### Nkitahodi a ɛwɔ soro
Ɛsɛ sɛ wɔn a wɔde wɔn nsa hyɛ ase no wɔ intanɛt so bere koro mu (anaasɛ ɛkame ayɛ sɛ ɛte saa) na wɔatumi awie wɔn a wɔde wɔn nsa hyɛ ase no. Sɛ wo t signers no atrɛw wɔ bere nhyehyɛe anaa nkitahodi a wontumi mfa ho nto so a, sika a wɔsɛe no hwehwɛ sɛ wɔyɛ biako a solo wallet nnyɛ.

### Sɛ quorum nni hɔ a, wɔmfa wɔn nsa nhyɛ ase
Sɛ keyholders a ɛdɔɔso nni hɔ (yarefo, wɔretu kwan, wontumi nyɛ hwee) a, sika no yɛ nea wontumi nsɛe no bere tiaa bi. Paw wo threshold na kyɛfa count yiye — 2-of-3 yɛ resilient sen 2-of-2.

### Awo ntoatoaso titiriw guasodeyɛ
FROST a wɔde besi hɔ no hwehwɛ sɛ wɔyɛ distributed key generation (DKG) guasodeyɛ a wɔn a wɔde wɔn ho hyɛɛ mu n nyinaa bom wɔ intanɛt so. Eyi yɛ adeyɛ a ɛkɔ so pɛnkoro, nanso ɛsɛ sɛ wɔyɛ no yiye — sɛ wɔde wɔn a wɔde wɔn ho hyɛ mu no to asiane mu wɔ DKG bere mu a, ahobammɔ sɛe.

### Nnwinnade da so ara renyin
FROST ma shielded Zcash yɛ foforo koraa. IETF gyinapɛn (draft-irtf-cfrg-frost) no anyin, nanso sika kotoku a wɔde bom no sua. Hwɛ kwan sɛ anoano bi a ɛyɛ den bɛba bere a wode toto sika kotoku a ɛwɔ safe biako a wɔtaa de di dwuma ho no.

### Nneɛma a ɛyɛ den a ɛma obi ho tɔ no
Shard a wobɛhwere no nyɛ wiase awiei (ɛno ne asɛm a ɛwɔ aboboano no so), nanso ɛsɛ sɛ wodi kan kyerɛw nhyehyɛe ahorow a wɔde bɛsan agye no ho nkrataa. Hena na okura backups? Sɛ asinasin abien yera bere koro mu a, dɛn na ɛba?

---

## Hena na ɔde FROST resi wɔ Zcash so?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation no de FROST dwumadie a ɛyɛ adwuma ne demo site akɔma. Eyi ne reference implementation a wɔde di dwuma de sɔ hwɛ ne nkɔso.

### YWallet FROST Nkyerɛkyerɛmu
YWallet (Zcash sika kotoku a ɛyɛ adwuma yiye) wɔ FROST demo nkabom a edi kan. Hwɛ sɛnea [YWallet FROST Demo akwankyerɛ](/guides/Ywallet_FROST_Demo) ama akwankyerɛ a wɔde ma anammɔn anammɔn.

### ZecHub Hackathon 2026 — FROST Akwankyerɛ Nnwuma

FROST track no na ɛyɛɛ akansi kɛseɛ wɔ ZecHub Hackathon 2026. Nnwuma a ɛda nsow:

- **ZecVault** — 2-of-3 a wɔabɔ ho ban escrow a wɔde asi mainnet so (FROST threshold) .
- **Steward** — threshold custody ma shielded Zcash a ɛwɔ UX a ɛtwe adwene si sanba so

### Coinbase a wɔde yɛ adwuma
Coinbase kyekyee production FROST dwumadie maa wɔn threshold signing systems (ma Bitcoin), a nsakraeɛ a ɛyi preprocessing stage na ɛkyekyɛ aggregator dwumadie no mu wɔ wɔn a wɔde wɔn ho hyɛɛ mu nyinaa mu. Wɔn suahu no si FROST ahobammɔ nhyehyɛe no so dua wɔ nneɛma a wɔyɛ no nsenia so.

---

## Sɛnea signing session yɛ adwuma (wɔayɛ no mmerɛw) .

1. **Setup (pɛnkoro):** N a wɔde wɔn ho hyɛɛ mu nyinaa yɛ distributed key generation (DKG) guasodeyɛ. Wɔn mu biara nya kokoam shard; wonya ɔmanfo safoa a wɔkyɛ. Party biara nni hɔ a wonim kokoam safe no nyinaa.

2. **Coordinate signers:** Sɛ ɛho hia sɛ wɔsɛe sika a, coordinator (a obetumi ayɛ wɔn a wɔde wɔn nsa ahyɛ ase no mu biako) boaboa bɔhyɛ ahorow ano fi t participants a wɔwɔ ɔpɛ sɛ wɔde wɔn nsa bɛhyɛ ase no hɔ.

3. **Round 1:** Obiara a ɔde ne ho hyɛ mu a ɔde ne nsa bɛhyɛ aseɛ no ma nonce na ɔbɔ bɔhyɛ bi (ɔmanfoɔ, ɛnyɛ nkateɛ).

4. **Round 2:** Obiara a ɔde ne nsa hyɛ aseɛ no de wɔn kokoam shard no bu wɔn nsaano nkyerɛwee fã bi ho akontaa na ɔbɔ amanneɛ.

5. **Aggregation:** Ntamgyinafoɔ no ka t nsaano nkyerɛwee no fã bi bom yɛ no Schnorr nsaano nkyerɛwee baako a ɛtwa toɔ — a wontumi nyi nsonsonoeɛ mu wɔ nkɔnsɔnkɔnsɔn so firi nsaano nkyerɛwee a ɛyɛ ɔfa baako ho.

6. **Broadcast:** Wɔde asɛm no kɔ Zcash network no so sɛnea ɛte daa.

Sɛ obiara a ɔde ne nsa hyɛ aseɛ no de nsaano nkyerɛwee fã bi a enye kɔ a, protocol no kyerɛ wɔn na ɛgyae (wɔayi wɔn afiri daakye nhyiamu mu). Nkitahodi si off-chain — blockchain no nkutoo hu asɛm a etwa to.

---

## Wo threshold parameters a wobɛpaw

| Nsiesiei | Nneɛma a wɔde gyina ano | Asiane a Ɛwɔ Hɔ |
|-------|-----------|------|
| 1-of-1 | No resilience — ade biako a ɛyɛ huammɔdi | Key loss = adehwere a ɛtra hɔ daa |
| 2-of-2 | Ɛsɛ sɛ wonya wɔn baanu nyinaa a wɔde wɔn nsa hyɛɛ ase — mfomso biara nni ho abodwokyɛre | One unavailable = sika a wɔahyɛ no nwini |
| 2-of-3 | Shard biako betumi ayera anaasɛ entumi nyɛ adwuma | Ahobammɔ a ɛba fam sen 3-of-5 |
| 3-of-5 | Wobetumi ayera asinasin abien; ahobammɔ a emu yɛ den | Nkitahodi pii a ɛwɔ soro |
| 3-wɔ-7 | Asoɛe-grade; gyina huammɔdi abien ano | Nkitahodi ho ka a ɛkorɔn |

Mfiase a mfaso wɔ so ma akuw dodow no ara: **2-of-3** (a ɛyɛ den, ɛnyɛ den koraa) anaa **3-of-5** (ahyehyɛde, ahobammɔ a ɛkorɔn).

---

## Nkratafa a Ɛfa Ho

- [FROST — Mfiridwuma mu Deep Dive](FROST.md) — cryptographic nsɛm a ɛfa protocol no ho (DKG, nsaano nkyerɛwee rounds, ahobammɔ adanse)
- [YWallet FROST Demo Akwankyerɛ](/guides/Ywallet_FROST_Demo) — anammɔn anammɔn nsa-so demo
- [FROST Demo (awɔw ho mfonini) .](/guides/frostdemo) — Zcash Foundation demo nantew mu
- [Nneɛma a Wɔde Hwɛ](Viewing_Keys.md) — akenkan nkutoo kwan a wɔfa so kɔ address ahorow a wɔabɔ ho ban so (ɛboa threshold custody) .
- [Zcash Shielded Agyapadeɛ](Zcash_Shielded_Assets.md) — FROST nso yɛ nnwuma titiriw a wɔde bɛma ZSA

## Akadeɛ

- [FROST nhwehwɛmu krataa (Komlo & Goldberg, 2020) .](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST nhyehyɛe gyinapɛn (draft-irtf-cfrg-frost) .](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST a wɔde di dwuma](https://frost.zfnd.org)
- [Chelsea Komlo — Dɛn ne Threshold Signatures? (Zcon3) .](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Nsaano Nkyerɛwee](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Async Schnorr Aboboano Nsɛnkyerɛnne a Ɛyɛ Den (Blockstream) .](https://eprint.iacr.org/2022/550.pdf)
