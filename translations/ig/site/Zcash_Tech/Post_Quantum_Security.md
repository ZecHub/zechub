<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nchekwa Mgbe-Quantum Gasịrị [Post-Quantum Security] na Zcash

## Na Nkenke

- Kọmpụta kwantum bụ ihe ize ndụ n’ọdịnihu n’ihi na ha nwere ike imebi ụfọdụ cryptography igodo ọha [public-key cryptography] a na-eji na blockchain taa.
- “Post-quantum” pụtara cryptography [cryptography] na-arụ ọrụ na kọmpụta nkịtị ma e mere ya iji guzogide mwakpo sitere na kọmpụta kwantum n’ọdịnihu.
- Zcash abụghị post-quantum n’uju taa.
- Nke e chebere echebe Zcash na-ebelata ole data Azụmahia ọha ndị mwakpo n’ọdịnihu nwere ike mụọ, mana iji nke e chebere echebe abụghị otu na nguzogide kwantum zuru ezu.
- Zcash na-akwado site na nyocha, ZIP, na atụmatụ network upgrade dịka ZIP 2005 na Project Tachyon.
- Mbugharị post-quantum dị nchebe ga-echebe ego, Nzuzo, e-akpa ego, exchange, na iwu consensus n’otu oge.

Maka ihe Ironwood gbanwere na ọnọdụ nke akụkụ ọ bụla nwere ụbọchị, lee [Zcash Ọ̀ Bụ Post-Quantum?](/zcash-tech/is-zcash-post-quantum).

## Gịnị Bụ Quantum Computing?

Kọmputa nkịtị na-echekwa ozi dị ka bits. Bit ọ bụla bụ `0` ma ọ bụ `1`.

Kọmputa quantum na-eji quantum bits, nke a na-akpọ qubits. Enwere ike iji qubits rụọ algorithms pụrụ iche na-edozi ụfọdụ nsogbu mgbakọ na mwepụ ngwa ngwa karịa kọmputa nkịtị.

Nke a apụtaghị na kọmputa quantum na-adị ngwa karịa n’ihe niile. Ihe ize ndụ ahụ bụ kpọmkwem. Ụfọdụ cryptography na-adabere na nsogbu mgbakọ na mwepụ siri ike nke ukwuu maka kọmputa nkịtị mana dị mfe karị maka kọmputa quantum buru ibu nke zuru ezu.

Maka blockchain, ihe atụ kachasị mkpa bụ cryptography igodo ọhaneze. A na-eji igodo ọhaneze na signature gosi na onye ọrụ kwere ka e mefuo mkpụrụ ego.

## Ihe Mere Blockchain Ji Elekọta Ya

Blockchain na-eji cryptography arụ ọrụ dị iche iche:

| Ngwá ọrụ cryptography | Ihe ọ na-eme | Mmetụta quantum |
| --- | --- | --- |
| Digital signature | Gosi na onye nwe ya kwadoro mmefu | Nnukwu ihe ize ndụ maka usoro elliptic-curve ndị a na-ahụkarị |
| Hash functions | Wuo Adreesị akpa ego, commitment, osisi Merkle, na challenges | Ihe ize ndụ dị ala, mana oke nchekwa dị mkpa |
| Zero-knowledge proof | Gosi na Azụmahia nke e chebere echebe dị irè n’ebughị nkọwa ya | Ọ dabere na usoro proof na echiche e ji wuo ya |
| Nkwekọrịta igodo | Na-enyere e-akpa ego aka izobe data note maka ndị natara ya | Ọ chọrọ nlebara anya nke ọma n’okpuru ụdị iyi egwu quantum |

Kọmputa quantum nke nwere ike zuru ezu nwere ike iyi ọtụtụ atụmatụ signature egwu a na-eji taa, gụnyere signature elliptic-curve. Nke a dị mkpa n’ihi na signature bụ ihe na-eme ka network mata na ọ bụ igodo ziri ezi nyere ikike Azụmahia ahụ.

Hash functions dị iche. Algorithm Grover nwere ike mee ka nchọ brute force dị ngwa, mana ọ naghị emebi hash functions n’otu ụzọ ahụ kpọmkwem. Oke nchekwa buru ibu nwere ike inye aka.

## Gịnị Bụ Post-Quantum Cryptography?

Post-quantum cryptography bụ cryptography e mere ka ọ nọgide na-adị nchebe megide kọmputa nkịtị na kọmputa quantum nke ọdịnihu.

Ọ pụtaghị na cryptography ahụ na-eji kọmputa quantum. Ọ pụtara na usoro ahụ dabere na nsogbu mgbakọ na mwepụ siri ike dị iche.

N’afọ 2024, NIST wepụtara ụkpụrụ post-quantum mbụ emechara:

- **ML-KEM** maka ịtọlite igodo
- **ML-DSA** maka digital signature
- **SLH-DSA** maka digital signature dabere na hash

Ụkpụrụ ndị a bụ nnukwu nzọụkwụ, mana blockchain enweghị ike ịgbanwe naanị otu algorithm gaa n’ọzọ n’abalị otu. A ghaghị ịtụle iwu consensus, e-akpa ego, hardware wallet, nha Azụmahia, ugwo, na Nzuzo niile.

## Otu Ihe Ize Ndụ Quantum Si Apụta On-Chain

Ụzọ dị mfe isi ghọta ihe ize ndụ ahụ bụ:

1. Onye ọrụ na-emepụta ụzọ igodo abụọ.
2. Igodo ọhaneze ma ọ bụ data signature nwere ike ịpụta on-chain.
3. Onye mwakpo quantum n’ọdịnihu nwere ike iji ihe ọhaneze ahụ mụta igodo nzuzo.
4. Ọ bụrụ na ego ka dị n’okpuru njikwa igodo ahụ, ha nwere ike ịnọ n’ihe ize ndụ.

Blockchain Oha na-ekpughe ọtụtụ ozi n’ime nhazi ha. Adreesị akpa ego, ọnụ ego, na njikọ Azụmahia bụ ọhaneze. Ihe igodo ọhaneze nwekwara ike ịpụta mgbe a na-emefu mkpụrụ ego.

Nke a bụ otu ihe mere iji Adreesị akpa ego ugboro ugboro ji dị njọ. Iji ya ọzọ na-enye ndị na-ekiri data karịa nke ha ga-ejikọta taa, ma na-enye ndị mwakpo ọdịnihu ihe akụkọ ihe mere eme karịa ha ga-enyocha.

## Gịnị Dị Iche Banyere Zcash?

Zcash na-akwado ma Azụmahia Oha ma Azụmahia nke e chebere echebe.

Zcash Oha na-arụ ọrụ dịka iji blockchain ọhaneze ụdị Bitcoin. Adreesị akpa ego, ọnụ ego, na mmekọrịta Azụmahia na-ahụ anya.

Zcash nke e chebere echebe dị iche. Azụmahia nke e chebere echebe na-eji zero-knowledge proof ka network nwee ike ịchọpụta na Azụmahia na-agbaso iwu n’ekpugheghị onye zitere ya, onye natara ya, ma ọ bụ ọnụ ego.

Nke a na-enye Zcash uru Nzuzo dị mkpa:

- A na-ebipụta data Azụmahia pere mpe ka mmadụ niile hụ.
- Ndị ọrụ na-ezere ịmepụta eserese Kwụọ ụhwọ ọhaneze mgbe ha na-anọ n’ime nke e chebere echebe.
- Ndị na-ekiri ọdịnihu nwere akụkọ ego ọhaneze pere mpe ha ga-enyocha.
- Mpughe ahọpụtara nwere ike ime site na viewing key kama ndekọ ọhaneze site na ndabara.

Mana Zcash nke e chebere echebe abụghị nke post-quantum ozugbo. Pool nke e chebere echebe ka na-adabere na echiche cryptography. Ikike mmefu, note commitment, nullifier, usoro proof, Nzobe ederede, na igodo e-akpa ego niile chọrọ nlebara anya nke ọma.

Nchịkọta dị mkpirikpi:

> Iji nke e chebere echebe na-ebelata mkpughe ọhaneze, mana Zcash ka chọrọ upgrade post-quantum e ji nlezianya mee.

## Maapụ Ihe Ize Ndụ nke Zcash

| Mpaghara | Nkọwa maka onye mbido | Nchegbu post-quantum |
| --- | --- | --- |
| Adreesị akpa ego Oha | Adreesị akpa ego ọhaneze na eserese Azụmahia ọhaneze | Ihe ize ndụ yiri nke blockchain Oha ndị ọzọ |
| Ikike mmefu | Proof na onye ọrụ kwere ka ọ mefuo ego | Atụmatụ signature nwere ike chọọ nnọchi ma ọ bụ mbugharị |
| Note nke e chebere echebe | Ndekọ nzuzo nke uru dị n’ime pool nke e chebere echebe | Ụfọdụ akụkụ nwere ike chọọ echiche ọhụrụ ma ọ bụ ngwá ọrụ mgbake |
| zk-SNARKs | Proof na Azụmahia nke e chebere echebe dị irè | Echiche usoro proof chọrọ nyocha |
| Nyocha e-akpa ego | Otu e-akpa ego si achọta ma wezobe note e natara | Nkwekọrịta igodo na Nzobe ederede note chọrọ nyocha |
| Mbugharị | Ịkwaga ego gaa na cryptography dị nchebe | Ọ ghaghị izere ma ọnwụ ego ma ntapu Nzuzo |

## Otu Zcash Si Akwado

### Zcash Nwere Usoro Network Upgrade

Zcash agbanweela cryptography ya mbụ. Sapling mere ka Azụmahia nke e chebere echebe dị mfe iji. NU5 webatara Orchard, Unified Addresses, na Halo 2.

Nke a dị mkpa n’ihi na ịdị njikere post-quantum abụghị patch software nwere otu ahịrị. Ọ chọrọ network upgrade a haziri ahazi, mgbanwe e-akpa ego, audit, na oge ka ndị ọrụ kwaga.

Network upgrade Zcash gara aga na-egosi na ecosystem ahụ nwere ahụmịhe ịkwaga site na cryptography ochie gaa n’ụdị ọhụrụ.

### Halo Na Orchard Belatara Echiche Ochie

Halo 2 ka Orchard na-eji, pool nke e chebere echebe ọgbara ọhụrụ nke Zcash. Otu nkwalite dị mkpa bụ na Halo wepụrụ mkpa trusted setup maka usoro proof Orchard.

Nke a abụghị otu ihe na nchekwa post-quantum. Ọ ka bara uru n’ihi na ọ na-egosi na Zcash nwere ike dochie nnukwu ihe ndị e ji wuo cryptography mgbe atụmatụ ka mma dị.

### ZIP 2005 Na-elekwasị Anya na Mgbake Quantum

Aha ZIP 2005 bụ “Mgbake Quantum nke Orchard.” Ọ na-atụ aro mgbanwe e bu n’obi inyere ndị ọrụ Orchard aka ịweghachi ma ọ bụ kwaga ego ma ọ bụrụ na mwakpo quantum megide echiche ochie aghọọ ihe a pụrụ ime.

Ikike mgbake abụghị otu ihe na nchekwa post-quantum zuru oke. Ọ dị warara karị ma ka bara uru:

- Nchekwa post-quantum zuru oke na-achọ igbochi mwakpo quantum ịrụ ọrụ.
- Ikike mgbake na-enye ndị ọrụ ezi omume ụzọ ka mma ma ọ bụrụ na cryptography ochie aghọọ nke na-adịghị nchebe.

Maka ndị mbido, chee nke a dịka atụmatụ ụzọ mgbapụ mberede. Ọ naghị edochi ụlọ ahụ dum, mana ọ na-enyere ndị mmadụ aka ịhapụ ụlọ ochie ahụ n’enweghị nsogbu ma ọ bụrụ na mkpọchi ochie adịghịzi ike.

### Project Tachyon Na-elekwasị Anya na Nkwalite Protocol Ka Buru Ibu

Project Tachyon bụ network upgrade Zcash a tụrụ aro nke na-elekwasị anya na ọkwa, sync, na uto state. Saịtị ọhaneze ya kwuru na atụmatụ ahụ bu n’obi ibelata Azụmahia, belata uto state validator, ma nweta Nzuzo post-quantum zuru oke dịka mmetụta ọzọ.

N’ihi na Tachyon bụ atụmatụ, ọ ka dabere na ọrụ engineering, nyocha, na nkwado obodo tupu e mee ka ọ rụọ ọrụ. Ọ kacha mma ịghọta ya dịka akụkụ nke nyocha na ntụziaka upgrade na-arụ ọrụ nke Zcash, ọ bụghị dịka atụmatụ ndị ọrụ nwere ugbu a taa.

### Nnyocha Na Ụkpụrụ Na-aga N’ihu

Ụwa cryptography sara mbara na-aga n’ihu kwa. Ụkpụrụ post-quantum NIST na-enye ndị na-arụ ọrụ ihe e ji wuo signature na ịtọlite igodo ka sie ike. Ndị na-eme nchọpụta zero-knowledge na-aga n’ihu ịmụ usoro proof nwere ike iguzogide n’okpuru echiche quantum.

Zcash nwere ike irite uru n’ọrụ ahụ, mana ọ ka ga-eme ka ọ dabara na blockchain na-echekwa Nzuzo.

## Ụzọ Upgrade Nwere Ike Ime N’ọdịnihu

### Ikike Mmefu Post-Quantum

Zcash nwere ike ịchọ n’ọdịnihu ikike mmefu na-adịghị adabere na atụmatụ signature quantum nwere ike imerụ.

Nke a nwere ike iji signature post-quantum, signature ngwakọ, ma ọ bụ atụmatụ ọzọ. Atụmatụ ngwakọ na-eji nyocha classical na post-quantum n’oge mgbanwe, ka usoro ahụ ghara ịdabere naanị n’otu echiche.

Ihe ịma aka bụ nha na ọnụ ahịa. Signature post-quantum nwere ike ibu karịa signature taa, nke na-emetụta nha Azụmahia, bandwidth, ugwo, e-akpa ego mkpanaaka, na hardware wallet.

### Ụdị Adreesị Na Igodo Ọhụrụ

Cryptography ọhụrụ na-achọkarị igodo na Adreesị akpa ego ọhụrụ. Ndị ọrụ ga-achọ ụzọ doro anya isi kwaga site n’ụdị ochie gaa n’ụdị dị nchebe.

Mbugharị ahụ kwesịrị ịdị mfe n’e-akpa ego. Ọtụtụ ndị ọrụ ekwesịghị ịghọta nkọwa cryptography ọ bụla iji nọgide na-adị nchebe.

### Mbugharị Na-echekwa Nzuzo

Mbugharị dị nnọọ mkpa maka Zcash. Ọ bụrụ na ọtụtụ ndị ọrụ ebuga ego site na pool ochie gaa na pool ọhụrụ n’ụdị a na-ahụ anya, mbugharị ahụ n’onwe ya nwere ike ịpụta ozi.

Atụmatụ mbugharị dị mma kwesịrị ichekwa:

- Ego ndị ọrụ
- Nzuzo ndị ọrụ
- Ndakọrịta e-akpa ego
- Nkwado exchange
- Nkwado hardware wallet
- Nchekwa consensus network

### Nyocha Usoro Proof Post-Quantum

Dochie signature ezughị. Nhazi nke e chebere echebe nke Zcash daberekwa na zero-knowledge proof na commitment.

Ọrụ ọdịnihu nwere ike ịchọ inyocha ma ọ bụ dochie:

- Echiche zk-SNARK
- Polynomial commitment
- Hash challenges Fiat-Shamir
- Note commitment
- Nhazi nullifier
- Echiche osisi Merkle
- Nzobe ederede note na omume viewing key

Ụfọdụ akụkụ nwere ike ịdị mma ma a gbanwee parameters. Akụkụ ndị ọzọ nwere ike ịchọ atụmatụ ọhụrụ.

## Ihe Nlereanya Maka Ndị Mbido

### Ihe Nlereanya 1: Mkpọchi Ochie

Cheedị safe nwere mkpọchi siri ike taa. Ngwá ọrụ ọhụrụ e mepụtara n’ọdịnihu nwere ike imepe mkpọchi ochie ahụ ngwa ngwa.

Post-quantum cryptography dị ka iji atụmatụ nke a na-atụghị anya na ngwá ọrụ ọhụrụ ahụ ga-emebi dochie mkpọchi ahụ.

Maka blockchain, dochie mkpọchi ahụ siri ike n’ihi na e-akpa ego, node, exchange, na ngwaọrụ hardware ọ bụla ga-aghọta atụmatụ ọhụrụ ahụ.

### Ihe Nlereanya 2: Igbe Nnata Ọhaneze

Data blockchain Oha dị ka itinye nnata ọ bụla n’igbe ọhaneze ruo mgbe ebighị ebi. Ọbụna ma ọ bụrụ na ọ dịghị onye nwere ike ịgụ usoro ọ bụla taa, ngwá ọrụ ọdịnihu nwere ike ịmata ihe karịa mgbe e mesịrị.

Zcash nke e chebere echebe na-agbalị izere ibipụta nnata ndị ahụ na mbụ. Nke a na-enyere Nzuzo ogologo oge aka, mana a ka ga-enyocha mkpọchi na-echekwa usoro nke e chebere echebe maka ọdịnihu quantum.

### Ihe Nlereanya 3: Atụmatụ Ụzọ Mgbapụ

Ikike mgbake dị ka ịhazi ụzọ mgbapụ tupu ọkụ adaa. Ị na-atụ anya na ị gaghị achọ ya, mana ọ dị nchebe karịa ịhazi ya n’oge karịa n’oge mberede.

ZIP 2005 dabara n’echiche a maka note Orchard.

## Ihe Ndị Ọrụ Nwere Ike Ime Taa

Ndị ọrụ ekwesịghị ịtụ ụjọ. Kọmputa quantum ọhaneze buru ibu nwere ike imebi cryptography blockchain e tinyere n’ọrụ adịghị taa.

Omume ọma ka na-enyere aka:

- Họrọ iji Zcash nke e chebere echebe mgbe o kwere omume.
- Zere iji Adreesị akpa ego ugboro ugboro.
- Debe e-akpa ego ka ha bụrụ nke emelitere.
- Soro ọkwa network upgrade Zcash.
- Lezienụ ZIP na ntụziaka e-akpa ego anya gbasara ikike mgbake ma ọ bụ mbugharị.
- Echekwala na ọrụ Oha bụ nke nzuzo.
- Ebugala ego n’ihi asịrị; chere ntụziaka doro anya sitere n’aka onye mmepụta Zcash a tụkwasịrị obi na otu e-akpa ego.

## Ihe Ịma Aka

Upgrade post-quantum siri ike maka blockchain ọ bụla.

Ihe ịma aka ndị a na-ahụkarị gụnyere:

- Igodo na signature buru ibu
- Azụmahia buru ibu
- Ọnụ ahịa nkwenye ka elu
- Iji bandwidth karịa
- Audit nchekwa ọhụrụ
- Nkwado hardware wallet
- Ọrụ e-akpa ego mkpanaaka
- Njikọ exchange na Onye nlekota
- Ntapu Nzuzo n’oge mbugharị
- Nkwekọrịta obodo gbasara mgbanwe consensus

Maka Zcash, akụkụ kasị sie ike abụghị naanị ime ka a ka nwee ike imefu mkpụrụ ego. Ihe siri ike bụ ime ka a ka nwee ike imefu mkpụrụ ego mgbe a na-echekwa Nzuzo nke na-eme Zcash ka ọ dị iche.

## Nchịkọta

Kọmputa quantum nwere ike n’ikpeazụ iyi ụfọdụ cryptography blockchain ji egwu. Post-quantum cryptography bụ azịza ogologo oge, mana a ghaghị itinye ya n’ọrụ nke ọma.

Zcash abụghị nke post-quantum kpamkpam taa. Otú ọ dị, Zcash nwere uru bara uru: Azụmahia nke e chebere echebe na-ebelata mkpughe ọhaneze, network ahụ nwere akụkọ ihe mere eme nke upgrade cryptography, na nyocha ugbu a dịka ZIP 2005 na Project Tachyon elekwasịlarị anya n’ihe ize ndụ quantum nke ọdịnihu.

Maka ndị mbido, echiche bụ isi dị mfe: Nzuzo taa na-ebelata mkpughe data n’ọdịnihu, na upgrade e ji nlezianya mee nwere ike inyere Zcash aka ịkwaga na nchekwa siri ike nke oge quantum n’enweghị ịchụ àjà ịdị mfe iji.

## Peeji Ndị Metụtara Ya

- [Zcash Ọ̀ Bụ Post-Quantum?](/zcash-tech/is-zcash-post-quantum) - Ihe Ironwood gbanwere, ihe ka ekpughere, na tebụl ọnọdụ nwere ụbọchị
- [Pool Ndị E Chebere Echebe](/using-zcash/shielded-pools) - Otu Azụmahia nke e chebere echebe Zcash si echekwa nkọwa Azụmahia
- [Halo](/zcash-tech/halo) - Usoro proof Zcash na-enweghị trusted setup
- [ZKP & zk-SNARKs](/zcash-tech/zk-snarks) - Otu zero-knowledge proof si arụ ọrụ na Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Otu Mpughe ahọpụtara si arụ ọrụ maka Zcash nke e chebere echebe
- [Zcash Akụ Ndị E Chebere Echebe](/zcash-tech/zcash-shielded-assets) - Akụ nke e chebere echebe n’ọdịnihu na nkwado akụ nzuzo

## Nrụtụ Aka

- [NIST: Ụkpụrụ Nzobe ederede post-quantum mbụ emechara](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Ọrụ Cryptography Post-Quantum nke NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Mgbake Quantum nke Orchard](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Nkọwapụta Protocol Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Akwụkwọ Halo 2](https://zcash.github.io/halo2/)
