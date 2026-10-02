<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nchekwa Mgbe-Ọnọdụ Na Zcash

## TL;DR

- Kọmputa quantum bụ ihe egwu n'ọdịnihu n'ihi na ha nwere ike imebi ụfọdụ nzuzo nzuzo nke blockchains na-eji taa.
- "Post-quantum" pụtara cryptography nke na-arụ ọrụ na kọmputa nkịtị mana e mere ya iji guzogide mwakpo sitere na kọmputa quantum n'ọdịnihu.
- Zcash anọghị n'ọnọdụ zuru oke taa.
- Zcash a na-echebe echebe na-ebelata ọnụọgụ data azụmahịa ọha nke ndị mwakpo ga-amụ n'ọdịnihu nwere ike ịmụ, mana ojiji a na-echebe echebe abụghị otu ihe ahụ dị ka iguzogide quantum zuru oke.
- Zcash na-akwado site na nyocha, ZIP, na atụmatụ nkwalite dịka ZIP 2005 na Project Tachyon.
- Mbugharị dị nchebe mgbe a gbasịrị oge kwesịrị ichekwa ego, nzuzo, obere akpa ego, mgbanwe ego, na iwu nkwekọrịta n'otu oge.

Maka ihe Ironwood gbanwere na ọnọdụ ụbọchị nke ihe ọ bụla, lee [Zcash ọ bụ Post-Quantum?](/zcash-tech/is-zcash-post-quantum).

## Gịnị bụ Kọmputa Kwatum?

Kọmputa nkịtị na-echekwa ozi dị ka bits. Bit ọ bụla bụ ma `0` or `1`.

Kọmputa quantum na-eji quantum bits, nke a na-akpọ qubits. Enwere ike iji Qubits site na algọridim pụrụ iche nke na-edozi ụfọdụ nsogbu mgbakọ na mwepụ ngwa ngwa karịa kọmputa nkịtị.

Nke ahụ apụtaghị na kọmputa quantum na-adị ngwa ngwa n'ihe niile. Ihe egwu dị na ya bụ nke a kapịrị ọnụ. Ụfọdụ ihe e ji echekwa ihe na-adabere na nsogbu mgbakọ na mwepụ nke siri ike maka kọmputa nkịtị mana ọ na-adị mfe karị maka kọmputa quantum buru ibu.

Maka blockchains, ihe atụ kachasị mkpa bụ nchekwa igodo ọha. A na-eji igodo ọha na mbinye aka iji gosi na enyere onye ọrụ ohere imefu ego.

## Ihe Mere Blockchains Ji Arụ Ọrụ

Blockchains na-eji cryptography eme ọtụtụ ọrụ dị iche iche:

| Ngwa nzuzo | Ihe ọ na-eme | Mmetụta kwantum |
| --- | --- | --- |
| Mbinye aka dijitalụ | Gosi na onye nwe ya nyere ikike imefu ego | Ihe egwu dị elu maka sistemụ elliptic-curve nkịtị |
| Ọrụ Hash | Wulite adreesị, nkwa, osisi Merkle, na ihe ịma aka | Ihe egwu dị ala, mana oke nchekwa dị mkpa |
| Ihe akaebe efu nke ihe ọmụma | Gosipụta na azụmahịa echekwara dị irè na-ekpugheghị nkọwa | Dabere na sistemụ ihe akaebe na nkwenye |
| Nkwekọrịta dị mkpa | Na-enyere aka zoo data ndetu maka ndị nnata | Ọ dị mkpa ka a nyochaa nke ọma n'okpuru ihe nlereanya ihe iyi egwu quantum |

Kọmputa quantum siri ike nke ọma nwere ike iyi ọtụtụ atụmatụ mbinye aka eji eme ihe taa egwu, gụnyere mbinye aka elliptic-curve. Nke a dị mkpa n'ihi na mbinye aka bụ ihe na-eme ka netwọk ahụ mara na ejiri igodo ziri ezi kwado azụmahịa.

Ọrụ Hash dị iche. Algọridim Grover nwere ike ime ka ọchụchọ brute force dị ngwa, mana ọ naghị emebi ọrụ hash n'otu ụzọ ahụ kpọmkwem. Oke nchekwa buru ibu nwere ike inye aka.

## Gịnị bụ Post-Quantum Cryptography?

E mepụtara ihe odide nzuzo Post-quantum iji chebe kọmputa nkịtị na kọmputa quantum n'ọdịnihu.

Ọ pụtaghị na cryptography na-eji kọmputa quantum. Ọ pụtara na sistemụ ahụ dabere na nsogbu mgbakọ na mwepụ siri ike dị iche iche.

Na 2024, NIST wepụtara ụkpụrụ mbụ emechara post-quantum:

- **ML-KEM** maka ntọala isi
- **ML-DSA** maka mbinye aka dijitalụ
- **SLH-DSA** maka mbinye aka dijitalụ dabere na hash

Ụkpụrụ ndị a bụ ihe dị mkpa, mana blockchain enweghị ike ịgbanwe otu algọridim maka nke ọzọ n'otu abalị. A ga-atụle iwu nkwekọrịta, obere akpa ego, obere akpa ngwaike, nha azụmahịa, ụgwọ, na nzuzo niile.

## Otu Ihe Ize Ndụ Kutum Si Apụta n'Agbụ

Ụzọ dị mfe iche echiche banyere ihe egwu dị na ya bụ:

1. Onye ọrụ na-emepụta ụzọ isi.
2. Igodo ọha ma ọ bụ data mbinye aka nwere ike ịpụta na agbụ ígwè.
3. Onye na-awakpo quantum n'ọdịnihu nwere ike iji ihe ọha ahụ mụta igodo nzuzo ahụ.
4. Ọ bụrụ na igodo ahụ ka na-achịkwa ego ahụ, ha nwere ike ịnọ n'ihe ize ndụ.

Usoro blockchain ndị a na-ahụ anya na-ekpughe ọtụtụ ozi site na imewe. Adreesị, ego ole, na njikọ azụmahịa bụ nke ọha. Ihe ndị dị mkpa n'ihu ọha nwekwara ike ịpụta ìhè mgbe e mefuru ego.

Nke a bụ otu ihe mere iji adreesị eme ihe ji emerụ ahụ. Iji ya eme ihe ọzọ na-enye ndị na-ekiri ihe ọmụma ka ha jikọọ taa ma na-enye ndị na-awakpo ha ihe ndị ọzọ ha ga-enyocha.

## Kedu ihe dị iche gbasara Zcash?

Zcash na-akwado ma azụmahịa doro anya ma nke a na-echebe.

Zcash na-arụ ọrụ dịka ojiji blockchain ọha na eze nke ụdị Bitcoin. Adreesị, ego, na mmekọrịta azụmahịa na-apụta ìhè.

Zcash echekwara dị iche. Azụmahịa echekwara na-eji ihe akaebe enweghị ihe ọmụma ka netwọk ahụ wee nwee ike ịchọpụta na azụmahịa na-agbaso iwu ndị ahụ na-ekpugheghị onye zitere ya, onye nnata, ma ọ bụ ego ole ọ na-enweta.

Nke a na-enye Zcash uru nzuzo dị mkpa:

- E bipụtala obere data azụmahịa ka onye ọ bụla hụ.
- Ndị ọrụ na-ezere ịmepụta eserese ịkwụ ụgwọ ọha mgbe ha nọ n'ihe ize ndụ.
- Ndị na-ahụ maka ego n'ọdịnihu enweghị akụkọ ego ọha na eze ha ga-enyocha.
- Enwere ike ikpughe ihe ngosi nhọrọ site na igodo nlele kama ndekọ ọha na eze site na ndabara.

Mana Zcash echekwara anaghị akpaghị aka mgbe a gbasasịrị ya. Ọdọ mmiri ndị a na-echebe ka na-adabere na echiche nzuzo. Ikike mmefu ego, nkwa idetu ihe, ihe ndị na-emebi ihe, sistemụ nkwenye, nzuzo, na igodo obere akpa chọrọ nyocha nke ọma.

Ụdị dị mkpirikpi ahụ:

> Ojiji e ji kpuchie ya na-ebelata ikpughe ọha na eze, mana Zcash ka chọrọ mmelite nke ọma mgbe a gbasịrị ya.

## Maapụ Ihe Ize Ndụ Zcash

| Mpaghara | Nkọwa onye mbido | Nchegbu mgbe ọnụọgụgụ gasịrị |
| --- | --- | --- |
| Adreesị doro anya | Adreesị ọha na eze na eserese azụmahịa ọha na eze | Ihe egwu ndị yiri ya na blockchain ndị ọzọ doro anya |
| Mefu ikike imefu | Ihe akaebe na-egosi na enyere onye ọrụ ohere imefu ego | Atụmatụ mbinye aka nwere ike ịchọ nnọchi ma ọ bụ mbugharị |
| Ihe ndetu echekwara | Ihe ndekọ nkeonwe nke uru n'ime ọdọ mmiri echebe | Ụfọdụ akụkụ nwere ike ịchọ echiche ọhụrụ ma ọ bụ ngwaọrụ mgbake |
| zk-SNARKs | Ihe akaebe na-egosi na azụmahịa echekwara dị irè | Echiche sistemụ akaebe chọrọ nyocha |
| Nnyocha obere akpa | Otu esi achọta ma detuo akwụkwọ ndị enwetara na obere akpa ego | Nkwekọrịta dị mkpa na ihe e dere ede kwesịrị inyocha |
| Mbugharị | Ịkwaga ego na nchekwa nzuzo dị nchebe | Ga-ezere ma mfu ego na mfu nzuzo |

## Otu Zcash si akwado

### Zcash nwere usoro nkwalite netwọkụ

Zcash agbanweela usoro nzuzo ya mbụ. Sapling mere ka azụmahịa ndị a na-echebe dị mfe iji. NU5 webatara Orchard, Unified Addresses, na Halo 2.

Nke a dị mkpa n'ihi na njikere post-quantum abụghị ihe ngwọta ngwanrọ otu-ahịrị. Ọ chọrọ mmelite netwọkụ a haziri ahazi, mgbanwe obere akpa ego, nyocha, na oge maka ndị ọrụ ịkwaga.

Mmelite Zcash gara aga na-egosi na gburugburu ebe obibi nwere ahụmịhe site na cryptography ochie gaa na atụmatụ ọhụrụ.

### Halo na Orchard belatara echiche ochie

Orchard, ọdọ mmiri ọgbara ọhụrụ Zcash's ji Halo 2 eme ihe. Otu ihe dị mkpa bụ na Halo wepụrụ mkpa ọ dị maka ntọala a pụrụ ịtụkwasị obi maka sistemụ ihe nchebe Orchard.

Nke ahụ abụghị otu ihe ahụ dị ka nchekwa post-quantum. Ọ ka dị mkpa n'ihi na ọ na-egosi na Zcash nwere ike dochie nnukwu ihe owuwu cryptographic mgbe enwere atụmatụ ka mma.

### ZIP 2005 Lekwasịrị Anya na Nweghachi Quantum

A kpọrọ ZIP 2005 "Orchard Quantum Recoverability." Ọ na-atụ aro mgbanwe ndị e zubere iji nyere ndị ọrụ Orchard aka inwetaghachi ma ọ bụ kwaga ego ma ọ bụrụ na mwakpo quantum megide echiche ochie apụta ihe bara uru.

Ike iweghachite abụghị otu ihe ahụ dị ka nchekwa zuru oke nke post-quantum. Ọ dị warara ma ka bara uru:

- Nchekwa zuru oke nke post-quantum na-agbalị igbochi mwakpo quantum ịrụ ọrụ.
- Inwetaghachi na-enye ndị ọrụ na-eme ihe n'eziokwu ụzọ ka mma ma ọ bụrụ na ndekọ ego ochie aghọọ ihe na-adịghị mma.

Maka ndị mbido, were nke a dị ka atụmatụ ọpụpụ mberede. Ọ naghị edochi ụlọ ahụ dum, mana ọ na-enyere ndị mmadụ aka ịpụ n'ime ụlọ ochie ahụ n'enweghị nsogbu ma ọ bụrụ na mkpọchi ochie ahụ adịghị ike.

### Ọrụ Tachyon Na-ele Anya Maka Mmezi Usoro Karịrị Ukwuu

Ọrụ Tachyon bụ nkwalite Zcash a tụrụ aro nke lekwasịrị anya na nha, njikọta, na uto steeti. Ebe nrụọrụ weebụ ọha ya na-ekwu na atụmatụ ahụ na-achọ ibelata azụmahịa, belata uto steeti nkwenye, na inweta nzuzo zuru oke mgbe a gbasịrị ya dịka mmetụta ọjọọ.

Ebe ọ bụ na Tachyon bụ atụmatụ, ọ ka dabere na ọrụ injinia, nyocha, na nkwenye obodo tupu emelite ya. A na-aghọta ya nke ọma dị ka akụkụ nke nyocha na nduzi nkwalite Zcash's, ọ bụghị dị ka atụmatụ ndị ọrụ nwere ugbua taa.

### Nnyocha na Ụkpụrụ Na-aga n'ihu

Ụwa nke sara mbara na-agbanwekwa. Ụkpụrụ post-quantum nke NIST na-enye ndị na-eme ihe owuwu ihe owuwu siri ike maka mbinye aka na ntọala dị mkpa. Ndị nchọpụta na-enweghị ihe ọmụma na-aga n'ihu na-amụ usoro ihe akaebe nke nwere ike iguzogide n'okpuru echiche quantum.

Zcash nwere ike irite uru site n'ọrụ ahụ, mana ọ ka ga-agbanwe ya ka ọ bụrụ blockchain na-echekwa nzuzo.

## Ụzọ Mmelite Nwere Ike Ime n'Ọdịnihu

### Ikike Mmefu Mgbe Ọnụọgụ A Na-emechi

Zcash nwere ike ịchọ ikike mmefu ego nke na-adabereghị na atụmatụ mbinye aka nke nwere ike ịdị ize ndụ na quantum.

Nke a nwere ike iji mbinye aka post-quantum, mbinye aka ngwakọ, ma ọ bụ imewe ọzọ. Nhazi ngwakọ na-eji ma nyocha klasịk na post-quantum n'oge mgbanwe, yabụ sistemụ ahụ anaghị adabere naanị na otu echiche.

Ihe ịma aka dị na ya bụ nha na ọnụ ahịa ya. Mbinye aka post-quantum nwere ike ibu karịa mbinye aka nke taa, nke na-emetụta nha azụmahịa, bandwidth, ụgwọ, obere akpa mkpanaka, na obere akpa ngwaike.

### Adreesị Ọhụrụ na Usoro Isi

Ndekọ nzuzo ọhụrụ na-achọkarị igodo na adreesị ọhụrụ. Ndị ọrụ ga-achọ ụzọ mbugharị doro anya site na usoro ochie gaa na usoro nchekwa.

Mbugharị ahụ kwesịrị ịdị mfe na obere akpa ego. Ọtụtụ ndị ọrụ ekwesịghị ịghọta nkọwa nzuzo ọ bụla iji nọrọ na nchekwa.

### Nzuzo-Chekwa Mbugharị

Mbugharị na-emetụta Zcash. Ọ bụrụ na ọtụtụ ndị ọrụ ebuga ego site na ọdọ mmiri ochie gaa na ọdọ mmiri ọhụrụ n'ụdị doro anya, mbugharị ahụ n'onwe ya nwere ike ịgbasa ozi.

Atụmatụ njem dị mma kwesịrị ichebe:

- Ego ndị ọrụ
- Nzuzo onye ọrụ
- Ndakọrịta obere akpa
- Nkwado mgbanwe
- Nkwado obere akpa ngwaike
- Nchekwa nkwekọrịta netwọk

### Nyocha Sistemụ Nnwale Mgbe-Ọnwa Adịchara

Ịdochi mbinye aka ezughị. Nhazi Zcash's e ji kpuchie na-adaberekwa na ihe akaebe na nkwa efu.

Ọrụ ndị ga-eme n'ọdịnihu nwere ike ịchọ inyocha ma ọ bụ dochie:

- zk-SNARK assumptions
- Nkwa Polynomial
- Ihe ịma aka Fiat-Shamir
- Rịba ama nkwa
- Ọrụ ihe na-emebi ihe
- Echiche nke osisi Merkle
- Rịba ama na izochi ihe na omume igodo nlele

Ụfọdụ ihe nwere ike ịdị mma ma e jiri paramita agbanwee. Ihe ndị ọzọ nwere ike ịchọ imewe ọhụrụ.

## Ihe Nlereanya Ndị Mbido

### Ihe atụ nke 1: Mkpọchi Ochie

Chee echiche banyere ebe nchekwa nwere mkpọchi siri ike taa. Ngwaọrụ ọhụrụ e mepụtara n'ọdịnihu nwere ike imepe mkpọchi ochie ahụ ngwa ngwa.

Nkọpụta ihe mgbe e tinyere ihe dị ka ihe e ji dochie mkpọchi ahụ na imewe nke a na-atụghị anya na ngwaọrụ ọhụrụ ahụ ga-agbaji.

Maka blockchain, ịgbanwe mkpọchi ahụ siri ike n'ihi na obere akpa ego, node, mgbanwe, na ngwaọrụ ngwaike ọ bụla ga-aghọta atụmatụ ọhụrụ ahụ.

### Ihe atụ nke abụọ: Igbe Nnata Ọha

Data blockchain doro anya dị ka itinye nnata ọ bụla n'ime igbe ọha ruo mgbe ebighị ebi. Ọ bụrụgodị na ọ dịghị onye nwere ike ịgụ ụkpụrụ niile taa, ngwaọrụ ndị ga-abịa n'ọdịnihu nwere ike ịmụtakwu ihe ma emechaa.

Zcash nke a na-akpọ Shielded na-agbalị izere ibipụta akwụkwọ nnata ndị ahụ na mbụ. Nke ahụ na-enyere aka n'izobe onwe onye ogologo oge, mana a ka ga-enyocha mkpọchi na-echebe sistemụ ahụ maka ọdịnihu dị mma.

### Ihe atụ nke 3: Atụmatụ Ọpụpụ

Ịchọta ihe dị ka ịhazi ụzọ ịpụ apụ tupu ọkụ amalite. Ị na-atụ anya na ọ gaghị adị gị mkpa, mana ọ ka mma ịhazi ya n'oge karịa n'oge mberede.

ZIP 2005 dabara na echiche a maka ndetu Orchard.

## Ihe Ndị Ọrụ Nwere Ike Ime Taa

Ndị ọrụ ekwesịghị ịtụ ụjọ. Kọmputa quantum ọha buru ibu nke nwere ike imebi nchekwa blockchain nke e tinyere na ya adịghị taa.

Àgwà ọma ka na-enyere aka:

- Họọrọ iji Zcash echekwara mgbe o kwere mee.
- Zere iji adreesị ndị ọzọ.
- Mee ka obere akpa ego dị ọhụrụ.
- Soro ọkwa nkwalite netwọkụ Zcash.
- Lelee maka ZIP na ntuziaka obere akpa gbasara mgbake ma ọ bụ mbugharị.
- Echekwala na ihe omume doro anya bụ nkeonwe.
- Ebufela ego dabere na asịrị; chere maka nduzi doro anya site n'aka ndị mmepe Zcash a tụkwasịrị obi na ndị otu obere akpa ego.

## Ihe ịma aka

Mmelite mgbe-ọnụọgụ gasịrị siri ike maka blockchain ọ bụla.

Ihe ịma aka ndị a na-ahụkarị gụnyere:

- Igodo na mbinye aka buru ibu
- Azụmahịa ndị buru ibu
- Ọnụ ego nkwenye dị elu
- Ojiji bandwit karịa
- Nyocha nchekwa ọhụrụ
- Nkwado obere akpa ngwaike
- Arụmọrụ obere akpa mkpanaka
- Njikọta mgbanwe na njide
- Ndopu nzuzo n'oge njem
- Nkwekọrịta obodo gbasara mgbanwe nkwekọrịta

Maka Zcash, akụkụ kachasị sie ike abụghị naanị idobe mkpụrụ ego ka a na-emefu. Akụkụ siri ike bụ idobe mkpụrụ ego ka a na-emefu ya ma na-echekwa nzuzo nke na-eme ka Zcash dị iche.

## Nchịkọta

Kọmputa Quantum nwere ike imecha yie ụfọdụ ihe nzuzo nke blockchains na-eji. Post-quantum cryptography bụ azịza ogologo oge, mana a ga-eji ya nke ọma.

Zcash anọghị n'ọnọdụ zuru oke ugbu a. Agbanyeghị, Zcash nwere ike bara uru: azụmahịa echekwara na-ebelata ikpughe ọha na eze, netwọk ahụ nwere akụkọ ihe mere eme nke mmelite nzuzo, na nyocha dị ugbu a dịka ZIP 2005 na Project Tachyon ebumnobilarị maka ihe egwu quantum n'ọdịnihu.

Maka ndị mbido, isi echiche dị mfe: nzuzo taa na-ebelata ikpughe data n'ọdịnihu, mmelite nlezianya nwere ike inyere Zcash aka ịga n'ihu na nchekwa siri ike nke oge quantum na-enweghị ịchụ àjà ojiji.

## Peeji ndị metụtara ya

- [Zcash ọ bụ Post-Quantum?](/zcash-tech/is-zcash-post-quantum) - Ihe Ironwood gbanwere, ihe ka na-ekpughere, na tebụl ọnọdụ oge ochie
- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools) - Otu azụmahịa Zcash si echebe nkọwa azụmahịa
- [Halo](/zcash-tech/halo) - Sistemụ ihe akaebe Zcash's na-enweghị ntọala a tụkwasịrị obi
- [ZKP na ZK-SNARKS](/zcash-tech/zk-snarks) - Otu esi egosi ihe akaebe efu na-arụ ọrụ na Zcash
- [Igodo Ilele](/zcash-tech/viewing-keys) - Otu mkpughe nhọrọ si arụ ọrụ maka Zcash echekwara
- [Akụ Zcash Chebere](/zcash-tech/zcash-shielded-assets) - Akụ echekwara n'ọdịnihu na nkwado akụ nkeonwe
- [Nzuzo dị ka Ụkpụrụ Isi](/start-here/who-can-see-your-zcash-payment) - Gịnị mere nzuzo ego ji dị mkpa

## Ntụaka

- [NIST: Ụkpụrụ nzuzo mgbe a mụsịrị nke mbụ emechara](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Ọrụ NIST Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Mweghachi nke Orchard Quantum](https://zips.z.cash/zip-2005)
- [Ọrụ Tachyon](https://tachyon.z.cash/)
- [Nkọwapụta Usoro Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Akwụkwọ Halo nke Abụọ](https://zcash.github.io/halo2/)
