<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Threshold Custody for Shielded ZEC (Ɔhaw a wɔgyina so de bɔ wɔn ho ban)

> For the full cryptographic details of the FROST protocol, see the [FROST technical page](FROST.md).

FROST threshold custody kɔ so ba Zcash nkɔmmɔbɔ mu  na ɛyɛ ɔkwan a ɛkorɔn wɔ ZecHub Hackathon 2026  nanso ɛnkyerɛ aseɛ daa. kratafa yi ka nea ɛkyerɛ, bere a wuhia ankasa no, nsesaeɛ ahorow, ne nnwinnade bɛn na ɛwɔ hɔ nnɛ a ɛbɛboa ma ayɛ adwuma.

---

## TL;DR

- FROST ma nnipakuo bi a wɔn kura ki no tumi di Zcash address so wɔ bere koro mu, na onipa biara nso ntumi mfa ne nsa nka private key.
- A **t-of-n** threshold means: t people must co-sign to spend; any t-1 or less can't move the funds alone. T1 anaa kakra bi ntumi mfa sika no nko ara, na mmom obi biara betumi de ne nsa aka nkrataa a ɔde resesaw nnwumakuw foforo wɔ wɔn din mu so bere a ɔretua ɛka no ano.
- Dwumadi no te sɛ dwumadie biara a wɔayi ho ban  ɛnni nkekae bi mu na ɛkyerɛ sɛ wɔde nsahyɛsoɔ (threshold signing) adi dwuma.
- Eyi yɛ soronko koraa firi transparent multisig (a ɛyɛ baguam wɔ chain mu na Zcash agye atoom akyɛ)  FROST di dwuma wͻ abankɛseɛ a ɛwosoɔ no mu.
- Ɛboa DAO, sikasesabea ahorow, nnwumakuw a wɔde sika sie nneɛma so hwɛfo nnwuma, ne agyapade mu adwumayɛfoɔ nyinaa  baabiara a wontumi nnye asɛmti biako mpo ho ntom.

---

## What is FROST in plain language?

Imagine three business partners each hold a piece of a key. To spend from their shared wallet, any two of the three must agree and co-sign. The resulting transaction looks identical to a regular individual send — no observer can tell from the blockchain that multiple people were involved.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures **) yɛ nkyerɛase a ɛma eyi tumi ba wɔ Zcash ho. Chelsea Komlo na ɔyɛɛ no, ɔfiri University of Waterloo /Zcash Foundation ne Ian Goldberg.

Ne titiriw no:

- **Nnoraho**: wɔn a wɔtwerɛ n- mu no nkutoo na ɛhia sɛ wɔde wɔn ho hyɛmu (s.ɛ., 2-of-3, 3-of-5)
- **Shielded**: yɛ adwuma wɔ Orchard no mu  sika, obi a ɔrema ne nea ogye nyinaa bɛyɛ kokoam nkitahodie ho dwuma.
- **Wontumi nhu nsεm no mu**: nsaano a etwa to te sε Zcash nnwumade foforo biara a w'ayi ho asiesie so.
- ** Non-custodial**: no one party ever holds the full key  not even the coordinator (Ɔman biara nni hɔ a ɔhwɛ ne nyinaa so)

---

## Bere bɛn na ɛsɛ sɛ wode wo ba hyɛ obi nsa?

Nkyekyem a wode bɛhwɛ so no yɛ nea ntease wom bere a **nsaano biako anaa obi baako ayera nkyerɛ sɛ woahwere sika**.

Ɔhaw. Deɛn nti na nkuraaseɛ a wɔde hyɛ obi nsa no boa?
|-----------|----------------------------|
** DAO anaa kuw no sika a wɔhwɛ so** Admin biara ntumi mfa ne nsa nka ntoboa; ehia sɛ obiara gye tom.
** Exchange or custodian**: Ɛkyekyɛ asiane a ɛho hia no wɔ ahobammɔ nsase anaa adwumayɛfo mu.
**Nkrataa a wode sie wɔ frigyebea (ne w'abusuafo)** 2 mu 3 wo + abusuafoɔ baanu  wu anaa wɔn nsa nka, sika no ayera.
**Escrow**: Ɔtɔfoɔ, ɔtɔnni ne ntamgyinafo biara kura kyɛfa; wɔde sika no ma sɛ wɔn mmienu gye tom a.
**Ɔbo a ɛsom bo kɛse ntoboa ho ka** ZCG-sɛnea: hwehwɛ wɔn a wɔagye ntom sɛ wɔyɛ adwuma no mu pii ansa na wɔatumi atua sika no.
 Ɔdwumfoɔ biara ntumi mfa ne ho nto nhyehyɛeɛ no so.

Ebia w'ani mmmere so sɛ wobɛhwɛ wo sika a wode di dwuma no, anaa nneɛma nketenkete bi wɔ hɔ a ɛho ka dɔɔso sen asiane.

---

## Ɔkwan bɛn so na ɛsono no fi wɔn a wɔde nsa ka nkrataa pii wɔ ɔkwan soronko so?

Zcash akyɛ na ɛboa ma wɔtumi yɛ ntentan a wɔn ano nyinaa ka baako ho, nanso sɛ wode to hɔ pii no de ɛho asumasɛm ba: * Ntantan ahodoɔ ne nnipa biara tumi hu nea wɔde nsa hyɛ ase.

FROST siesie eyi denam adwuma a ɔyɛ wɔ abura no mu so:

| | Transparent multisig | FROST threshold (shielded) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
| Signers visible on-chain | Yes — all public keys exposed | No — indistinguishable from a single-signer spend |
Ԑyԑn na ԑkyerԑ sԑ wɔhwԑe adansedie no mu.
| Coordination required | On-chain script | Off-chain round of communication |
Ԑho nhia biara. Ɛho hia sɛ wo bɔ ho ban yiye, na w'ankasa nso betumi ayɛ bi ama afoforo.

---

## Nsesaeɛ ne nsunsuansoɔ a ɛwɔ hɔ ma no nyinaa

FROST yɛ tumi, nanso ɛde nsunsuanso pa bi ba a ɛsɛ sɛ wuhu ansa na wode adi dwuma:

### Ntotoho a wɔhwɛ so ma no yɛ adwuma.
Sɛ wo t signers no atrɛw wɔ mmere nkyekyɛm anaa nkitahodi a enni mu, na sika ho hia sɛ w'aka wɔn ano de di dwuma.

### Sɛ quorum nni hɔ a, ɛnkyerɛw nsa wom.
Sɛ wɔn a wɔdi nkrataa no so pii nni hɔ (wɔn yare, akwantu mu, anaa wonnya ho adwen), sika no ntumi ntra ase bere tiaa bi. Paw wo hyehyεe na fa w'akwanya to gua yiye  3 biara 2 yɛ den sen 2.

### Nsaano krataa a wɔde ma obi no ho dwumadi
Sɛ wode FROST rehyehyɛ adwuma a, ehia sɛ w'ɔde key generation (DKG) yɛ ade ma wɔn nyinaa di dwuma wɔ intanɛt so. Eyi yɛ biribi a ɛba prɛko pɛ nanso ɛsɛsɛ woyɛ no yiye  sε nnipa bi nya kwan de DKG bɔ bra a, ahobammɔ ho ban na asɛe.

### Nnwinnade a wɔde yɛ adwuma no da so ara reyɛ yiye.
FROST ma shielded Zcash yɛ foforo. IETF gyinapɛn no (draft-irtf-cfrg-frost) abere, nanso wallet nkabom ho hia kakra. W'anya akwan a wofa so de di dwuma wɔ bere bi mu sɛ wode toto standard single key wallet ho.

### Sankuo no mu nsɛnnennen
Sɛ wo firi shard baako mu a ɛnyɛ wiase awieeɛ (ɛno ne baabi a wobɛkɔ akɔsi), nanso ɛsɛ sɛ wɔtwerɛ nneɛma no ho nhyehyɛe ato hɔ. Hwan na ɛhwɛ backup so? Ɛdeɛn na ɛba saa bere koro mu, sɛ wɔnya firi mmienu mu kɔ ba yɛ deɛ ɛwɔ hefa yi ara?

---

## Hena na ɔne FROST reyɛ Zcash ho adwuma?

### Zcash Foundation  frost.zfnd.org
Zcash Foundation de FROST a ɛyɛ adwuma ne demo beaɛ no adi dwuma. Eyi yɛ reference implementase a wɔde di dwuma wɔ nsɔhwɛ ne nkɔso mu.

### YWallet FROST Demosɔdeɛ
YWallet (ɔkwan a ɛkorɔn Zcash sika nkotoku) wɔ FROST demo faakoyɛ. Hwɛ [YWallet Frost Demo akwankyerԑ] no mu na wobɛhu nsesaeɛ foforɔ bi wͻ frost de ho, ɛne ne nyinaa ka bom ma wo nsa aka akwanya foforo biara.](/guides/Ywallet_FROST_Demo) Sɛ wo bɛhunu akwan a wɔfa so di ho dwuma no bi.

### ZecHub Hackathon 2026 — FROST Track Projects

FROST kwan no na ɛsen biara wɔ ZecHub Hackathon 2026. Nnwumakuo a wɔn ho yɛ hu:

- **ZecVault** — 2-of-3 shielded escrow settled on mainnet (FROST threshold)
- **Steward**  ne nsunsuansoɔ a ɛgyina Zcash so na w'atumi de adi dwuma no ho mfaso mu.

### Coinbase
Coinbase yɛɛ wɔn FROST dwumadie a wɔde yɛ adwuma ma wɔ de hyɛ ne nsa (ma Bitcoin), na wɔyɛ nsakrae ahorow bi a ɛma woyi ɔfã a edi kan no fi hɔ, na wɔma agyinatufoɔ di dwuma wɔ nnipa nyinaa mu. Wɔn suahu kyerɛ sɛ Frost ahobammɔ kwan so adeyɛ yi tumi ba baabiara.

---

## Sɛnea ɛnne so kasa dwumadi yɛ adwuma (mfeɛ)

1. ** Setup (once):** N'afɛfoɔ nyinaa yɛ ɔfã bi a wɔkyekyɛ no key generation (DKG) ho dwumadi. Obiara nya ne kokoam nkyeresoɔ; wɔde wɔn ani di dwuma ma obiara tumi hu n'ankasa ano ahyɛnsodeɛ mu. Ɔfa biara nnim ankorankoroano ahwehwɛde no koraa.

2. ** Coordinate signatories:** Sɛ ehia sɛ wotua sika bi a, ɔhwɛfoɔ (a obetumi ayɛ wɔn mu baako) boaboa ano firi t participants a wɔpɛ sɛ wɔde wɔn nsa hyɛ ase no hɔ.

3. Adesuade 1: Obiara a ɔde ne nsa hyɛ ase no yɛ adeyɛ bi na ɔkyekyerɛ n'ahyehyɛde (ɔmanfo, nea ɛnyɛ asɛm biara).

4. Adesuadeɛ a ɛtɔ so mmienu:** Obiara a ɔde ne nsa hyɛ krataa ase no de n'ankasa shard na ɛbu wɔn ho akontaa.

5. **Aggregation:** The coordinator combines the t partial signatures into one final Schnorr signature — indistinguishable on-chain from a single-party signature.

6. **Nneɛma a wɔde di dwuma no, wɔtaa de to Zcash network so te sɛ nea ɛte biara.

Sɛ obi a ɔtwerɛ ne nsa hyɛ ase de nsunsuansoɔ bɔne bi kɔma no, protocol no hu wɔn na ɛtwa mu (wɔpɔn wɔ daakye nhyiamu ahorow mu). Nkɔsoɛ yɛ off-chain  blockchain no hunu nkontaabu a etwa to nkutoo.

---

## Wo paw wo hyehyεe parameters no

Nhyehyɛe. Adwumayɛbɔ mu ahoɔden. Asiane ho asiane.
|-------|-----------|------|
 1 mu 1. Nkyeneyɛ biara nni hɔ. Ɔhaw baako pɛ a ɛwɔ ho no. Sɛ wofa safoa = sɛ w'ani nnye koraa, na wonhu nea wobɛyɛ bio?
 2 of 2. Ɛwɔ sɛ wɔn a wɔtwerɛ krataa no nyinaa yɛ saa. Wɔmfa mfomsoɔ biara nsie, baako nni hɔ = sika bi na wɔde ato fam.
2 of 3 shard baako betumi ayera anaa w'antumi annya no. Security margin a ɛwɔ fam sen 3 out 5
 3 of 5  W'atumi ahwere shards mmienu; ahobammɔ a ano yɛ den. Nkɔsoɔ pii wɔ hɔ ma dwumadie no mu kɔ akyiri paa.
3 out of 7 Institutional-grade; tolerates two failures High coordination cost. (Nneɛma a ɛwɔ hɔ no mu mmiɛnsa)

Asεm a emu yε den sε wobedi kan aka no ma ekuo dodow no ara: **2-of-3** (ahoɔden, nkataho) anaa **3-of-5** (nhyehyɛe mu ahobכden so).

---

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [FROST — Technical Deep Dive](FROST.md)  protocol no ho nkrataa a wɔabɔ (DKG, signing rounds, security proofs)
- [YWallet FROST Demo Akwankyerɛ](/guides/Ywallet_FROST_Demo)  step-by-step hands-on demo
- [FROST Demo (frostdemo)](/guides/frostdemo)  Zcash Foundation demo akwankyerԑ mu nsunsuansoɔ
- [Kyerԑkyerԑmu Nsaano Nkyea](Viewing_Keys.md)  kwan a wɔfa so kenkan ade nkutoo kɔ address ahorow a w'ayi no asi nkyɛn (a ɛboa ma wɔde sie)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md)  FROST yɛ nhyehyɛɛ titire ma ZSA a wɔtɔ no nso.

## Nneɛma a wɔde bɔ afɔre

- [FROST nhwehwɛmu krataa (Komlo & Goldberg, 2020) ](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST standard draft (draft-irtf-cfrg-frost) ] no de, w'akyerɛ mu wɔ ha sɛ: "Ɛwɔ hɔ ara".](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST dwumadie a wɔdi no so](https://frost.zfnd.org)
- [Chelsea Komlo  Dɛn ne Nsaano Ahorow? (Zcon3) ](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Nkrataafa a Ɛwɔ Dodow A Wɔtwerɛ De Di dwuma](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST  Robust Async Schnorr Threshold Signatures (Blockstream) ](https://eprint.iacr.org/2022/550.pdf)
