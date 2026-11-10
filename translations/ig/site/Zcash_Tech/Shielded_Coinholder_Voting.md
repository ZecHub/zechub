<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ntuli Aka Ndị Nwere Ego Nke E Chebere Echebe

> N’Ọgọọst 2026, Zcash mere ntuli aka ndị nwere ego nke edobere akwụkwọ ntuli aka ya na nzobe ederede, naanị mkpokọta ikpeazụ ka e kpughere, site n’iji usorontuli aka nke e chebere echebe nke Valar Group wuru.

Ihe ị ga-amụta: otu esi eji ego ZEC ị nwere tụọ ibu ntuli aka, debe ya na nzuzo, ma ka gụọ ya nke ọma, na-enweghị onye ọ bụla ịmata otu ị si tụọ aka ma ọ bụ ego ị nwere.

Ntuli aka ndị nwere ego nke e chebere echebe na-enye ndị ji Zcash ohere ịtụ aka n’ajụjụ gbasara gburugburu obibi ha site n’iji ZEC nke e chebere echebe ha. Ọ dịghị onye na-amụta ihe onye ọ bụla tụrụ aka ma ọ bụ ego ZEC ole ha nwere, ma onye ọ bụla ka nwere ike nyochaa na mkpokọta ahụ ziri ezi. Ọ na-arụ ọrụ na chain ntuli aka pụrụ iche nke Valar Group wuru, dị iche na mainnet Zcash, ya mere ego gị n’ezie anaghị agagharị. Maka otu Zcash si eme mkpebi n’ụzọ sara mbara, lee nkọwa [Zcash Banyere Ego na Gọọmentị](../zcash-community/zcash-governance). Ibe a bụ naanị maka usorontuli aka cryptographic.

Ị bụ onye ọhụrụ na Zcash? Malite na [Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash), [Pool Ndị E Chebere Echebe](../using-zcash/shielded-pools), na [zk-SNARKs](../zcash-tech/zk-snarks), ma lọghachi ebe a.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Ihe mere ntuli aka nzuzo ji sie ike

Ezigbo ntuli aka ndị nwere ego chọrọ ihe anọ n’otu oge, ụzọ doro anya isi nweta ha na-emegidekwa ibe ha.

1. Tụọ ibu site na ego ejidere, nke mere na ịnwe ZEC karịa na-enye ibu karịa.
2. Nzuzo nke nhọrọ, ka onye ọ bụla ghara ịma otu ị tụrụ aka.
3. Nzuzo nke nguzo ego, ka onye ọ bụla ghara ịma ego ZEC ole i nwere.
4. Ọgụgụ ziri ezi, a ga-enyochakwa ya, nke onye ọ bụla nwere ike ilele.

Iji ego ejidere tụọ ibu, o yiri ka ị ga-achọ nguzo ego onye ọ bụla. Iji gụọ akwụkwọ ntuli aka, o yiri ka ị ga-achọ imeghe ha. Ime nke ọ bụla n’ụzọ dị mfe na-ekpughe kpọmkwem ozi nzuzo pool [nke e chebere echebe](../using-zcash/shielded-pools) dị iji chebe, ntuli aka ego ndị gara aga kpugherekwa ozi nguzo ego n’ihi nke a. Ntuli aka e chebere echebe na-edozi esemokwu ahụ site n’otu ngwá ọrụ na-akwado ịkwụ ụhwọ nke e chebere echebe: [proof zero-knowledge](../zcash-tech/zk-snarks), nullifier, na nzobe ederede.

## Echiche ahụ: igbe akwụkwọ ntuli aka na-agụ onwe ya

> Turnstile na-eme ka i nwee ike ịgụta ihe na-agafe n’ụlọ nchekwa akụ na-ahụghị ihe dị n’ime. Igbe akwụkwọ ntuli aka e chebere echebe na-aga n’ihu otu nzọụkwụ ọzọ: ọ na-agbakọta votu ndị e mechiri emechi n’emeghịghe ha.

Cheedị igbe akwụkwọ ntuli aka nwere ikike atọ pụrụ iche. Ọ nwere ike itinye envelopu e mechiri emechi na mkpokọta na-aga n’ihu n’emeghịghe ya. Otu ìgwè ndị ọrụ, nke ọ dịghị onye ọ bụla n’ime ha ji igodo ahụ naanị ya, mechaa kpughee naanị mkpokọta ikpeazụ. Tupu e kwe ka ị tụba envelopu n’ime ya, ị na-egosi nwayọọ na i nwere ZEC n’oge gara aga a kara aka nakwa na ịtụbeghị aka mbụ, n’egosịghị mkpụrụ ego nke bụ nke gị. Ihe niile dị n’okpuru bụ otu esi ewu igbe ahụ n’ezie.

## Ikike itinye aka na snapshot

Oge ntuli aka na-edobe elu snapshot, otu block mainnet Zcash, ibu gị bụkwa nguzo ego nke e chebere echebe ị nwere ike imefu n’ime pool [Ironwood](../zcash-tech/ironwood) n’oge block ahụ. Iwu a dị mfe: otu Ironwood ZEC na snapshot hà otu votu. Maka ntuli aka gbasara oke ọrụ NU7, snapshot bụ mainnet block 3,459,350, ihe dị ka Ọgọọst 24, 2026 na 19:00 UTC, ebe ntuli aka meghere ruo Septemba 14, 2026 na 19:00 UTC. A na-elekọta ZEC Oha iche site n’ụzọ ochie, ọ bụghị site na protocol a.

1. Ego gị anaghị agagharị ma ọ bụ kpọchie. A na-edobe ikike na snapshot, ya mere ị nwere ike imefu ma ọ bụ bugharịa ZEC ozugbo e mesịrị na-enweghị imetụta votu gị.
2. Enweghị usoro ndebanye aha. Elu snapshot bụ naanị ihe a chọrọ, nke na-eme ka usoro ahụ dị mfe ma zere ikpughe onye bu n’obi ịtụ aka.

## Igosi nguzo ego gị n’ekpugheghị ya

Mgbe ị tụrụ aka, e-akpa ego gị na-emepụta proof zero-knowledge na-egosi na na snapshot, ị na-achịkwa ụfọdụ ZEC nke e chebere echebe a na-emefubeghị. Ọ na-egosi igwe ọgụgụ nzuzo nguzo ego ziri ezi na oke ya, mana ọ naghị ekpughe note ọ bụla ma ọ naghị emepụta azụmahia na mainnet Zcash.

Proof ahụ na-emepụta kredit ntuli aka na chain ntuli aka hà nguzo ego gị na snapshot, nke igodo ntuli aka ọhụrụ e-akpa ego gị mepụtara maka oge a naanị ya nwe. Ebe igodo ahụ dị ọhụrụ ma ejikọghị ya na Adreesị akpa ego Zcash gị, ọ dịghị ihe dị na chain ntuli aka nwere ike ịchọpụta laghachi na note gị n’ezie. Aha njirimara gị on-chain na akwụkwọ ntuli aka gị bụ Ihe na-apughi ijikọ ọnụ site n’ụzọ e wuru ya.

## Igbochi ịtụ aka ugboro abụọ, na nzuzo

Iji kwụsị onye ọ bụla ịtụ aka ugboro abụọ site n’otu mkpụrụ ego, usoro ahụ ga-ekwenye na note ndị dị n’azụ nguzo ego gị emefubeghị na snapshot. Na mainnet, a na-eme nke a site n’ikpughe nullifier note, akara pụrụ iche na-egosi na e mefuru ya, nke full node na-enyocha maka iji ọzọ. Mana ikpughe nullifier gị ebe a ga-ejikọ akwụkwọ ntuli aka gị kpọmkwem na note gị.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Ya mere protocol ahụ na-egosi ihe dị iche na nzuzo. Ọ na-ewu ndepụta nullifier ọ bụla ejirila ruo snapshot, e-akpa ego gị na-egosikwa na zero-knowledge na nullifier note gị adịghị na ndepụta ahụ, na-egosi na emefubeghị note ahụ n’ekpugheghị note ọ bụ.

Otu nsogbu ka fọdụrụ. Ịnweta akụkụ achọrọ nke ndepụta ahụ site na sava ga-ekpughe nullifier gị na sava ahụ, ndepụta niile dịkwa nnukwu, ihe dị ka 2 GB maka data oge Orchard ma buru ibu karịa ka Zcash na-eto. [Ịchọgharị Ozi Nkeonwe](../zcash-tech/private-information-retrieval) (PIR) na-edozi ha abụọ: e-akpa ego gị na-enweta kpọmkwem data ọ chọrọ ebe ọ na-ezo na cryptographic data ọ rịọrọ. A na-enyocha nsonaazụ ahụ megide nchịkọta e bipụtara nke ndepụta nullifier, ya mere sava akwụwaghị ọtọ enweghị ike ịmepụta nsonaazụ ụgha.

## Ịtụ akwụkwọ ntuli aka e tinyere na nzobe ederede

Maka ajụjụ ọ bụla, e-akpa ego gị na-eme ihe atọ.

1. Ọ na-etinye ibu votu gị na nzobe ederede maka kọmitii ọgụgụ, site na homomorphic encryption, ụdị nzobe ederede nke enwere ike ịgbakọta ciphertext ya ọnụ n’emepeghị ya. Nke a bụ ihe na-eme ka igbe ahụ nwee ike ịchịkọta votu ọ na-apụghị ịgụ.
2. Ọ na-ekewa votu gị n’òkè 16 dị iche, nke mere na ọbụna kọmitii jikọtara ọnụ kpamkpam ga-esiri ya ike ikpokọta ego onye ọbụla ji tụọ aka.
3. Ọ na-eziga òkè ndị ahụ n’oge a haziri n’enweghị usoro site na ọtụtụ sava, ka onye na-ekiri ghara ịmata na òkè ndị ahụ bụ nke otu onye tụrụ aka dabere n’oge ha rutere.

Òkè ọ bụla nwere proof zero-knowledge nke ya na-egosi na ọ bụ akụkụ ziri ezi nke akwụkwọ ntuli aka bara uru, ya mere ọ dịghị onye nwere ike itinye votu na-enweghị nkwado. A na-agbakọta òkè ndị a kwadoro n’ụzọ homomorphic na mkpokọta e tinyere na nzobe ederede na-aga n’ihu maka azịza ị họrọ.

## Ịgụ na-emegheghị akwụkwọ ntuli aka ọ bụla

Otu ọchịchị ntuli aka kesara ekesa na-eme ọgụgụ ahụ: opekempe validator chain ntuli aka 10, nke ọ dịghị otu n’ime ha nwere ike iwepu nzobe ederede nke ihe ọ bụla. Na mmalite oge ntuli aka, ha na-eme mmemme imepụta igodo ọnụ nke na-emepụta igodo nzobe ederede nke a na-ekewa igodo iwepu nzobe ederede kwekọrọ na ya n’etiti ha niile, a naghị achịkọta ya n’otu ebe.

> Ọ dịghị otu onye ọrụ ji igodo ahụ. Igbe ahụ na-emeghe naanị mgbe ụzọ abụọ n’ime ụzọ atọ n’ime ha ji igodo ha arụkọ ọrụ, ọbụna mgbe ahụ ọ na-ekpughe naanị mkpokọta.

Mgbe oge ntuli aka mechiri, mkpokọta e tinyere na nzobe ederede adịla site na mgbakọta homomorphic dị n’elu. Validator ọ bụla na-ebipụta iwepu nzobe ederede akụkụ ya yana proof na o wepụrụ nzobe ederede nke ọma. Ozugbo opekempe ụzọ abụọ n’ime ụzọ atọ nyere aka, akụkụ ha na-ejikọta ka ha bụrụ ọnụ ọgụgụ doro anya ikpeazụ maka ajụjụ ọ bụla, ọ dịghịkwa ihe ọzọ a na-ewepụ nzobe ederede. Full node ọ bụla nwere ike inyocha proof ziri ezi jikọtara ọnụ, ya mere ọha nwere ike ikwenye na ọgụgụ ahụ ziri ezi na-enweghị ịtụkwasị validator obi.

## Onye na-agba ya, na ihe ha enweghị ike ime

Nhazi ahụ na-ekewa ọrụ abụọ ka otu ìgwè ghara inwe ike karịrị akarị.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Coordinator multisig bụ ìgwè 2-n’ime-5 nwere ndị nnọchite anya sitere na Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), na Valar Group. Ọ na-ekpebi ajụjụ ndị ga-eru chain ma na-agba akaebe maka igodo nzobe ederede nke oge ọ bụla, mana ọ nweghị ike ịhụ, gbanwee, ma ọ bụ gbochie votu onye ọ bụla. Onye ọ bụla na-enweghị mmasị n’ajụjụ ndị ahụ nwere ike ịgba chain ntuli aka nke ya, ebe software ahụ mepere emepe ma bụrụ permissionless.

Validator bụ node opekempe 10 na-ejide igodo iwepu nzobe ederede ekewara ekewa ma na-eme iwepu nzobe ederede n’ogo a kara aka. Ha enweghị ike iwepu nzobe ederede akwụkwọ ntuli aka onye ọ bụla ma ọ bụ mepụta ọnụ ọgụgụ ụgha, n’ihi na iwepu nzobe ederede ọ bụla nwere proof ziri ezi ọhaneze.

## Ihe quorum ji dị

Ndị nhazi na-edobe oke òkè ndị sonyere: a na-ewere nsonaazụ ntuli aka dị ka nke na-anọchite ndị nwere ego naanị ma ọ bụrụ na opekempe ZEC 1,000,000 sonyere n’opekempe otu ajụjụ, tinyere ndị jụrụ itinye aka. Quorum anaghị ekpebi ajụjụ ọ bụla, anaghị etinyekwa ya n’ajụjụ ọ bụla iche. Ọ bụ otu nyocha maka ntuli aka niile, ya mere a na-ewere nsonaazụ dị mkpa naanị mgbe nnukwu ego ZEC pụtara. N’okpuru ọkwa ahụ, a naghị ewere nsonaazụ ahụ dị ka akara bara uru.

## Ihe protocol a anaghị echebe megide

Ido anya banyere ókè ya bụ akụkụ nke ịghọta nhazi ahụ.

1. Ọ bụ akara echiche, ọ bụghị mkpebi nke na-adịgide. Ntuli aka ndị nwere ego na-atụ mmetụta uche a tụrụ site na ego ejidere ma na-enye aka n’usoro Gọọmentị Zcash nkịtị [](../zcash-community/zcash-governance) kama dochie ya.
2. A tụrụ ya site na mkpụrụ ego, ya mere mmetụta na-eso ego ejidere. Mbelata mgbochi nwere ike ịbawanye ọnụ ọgụgụ ndị sonyere mana ọ naghị agbanwe mkpokọta ZEC.
3. Coordinator multisig na-edobe atụmatụ, nke na-ahọrọ ajụjụ ndị pụtara. Ọ nweghị ike imetụ votu aka, onye ọ bụla nwekwara ike ịgba chain asọmpi, mana ịtọ atụmatụ ka bụ ebe mmetụta dị.
4. Ọgụgụ chọrọ validator nọ n’ịntanetị. Ịmepụta ọnụ ọgụgụ chọrọ opekempe ụzọ abụọ n’ime ụzọ atọ n’ime ha ịrụkọ ọrụ, ya mere nnukwu nkwụsị ọrụ ma ọ bụ ịjụ imekọrịta ọnụ pụrụ igbu oge nsonaazụ.
5. Nzuzo nguzo ego n’okpuru njikọ aka zuru ezu bụ nchedo agbakwunyere, ọ bụghị theorem. Ọ bụrụ na kọmitii niile weghachiri igodo ahụ na nzuzo, ikewa òkè na iziga n’oge dị iche bụ ihe na-echebe nguzo ego gị, ndị mmebe kwetakwara na ndị a adịghị ike nke ukwuu n’okpuru njikọ aka. Nyocha okporo ụzọ dị mgbagwoju anya bụ ihe ize ndụ fọdụrụ.
6. Enwere akụkụ na-agagharị karịa nhazi ochie. Sava PIR, sava izipu, igodo ntuli aka ọhụrụ, na proof ọtụtụ ogbo bụ nke ọ bụla ebe njehie ma ọ bụ nhazi ezighi ezi nwere ike ịpụta. Usoro ahụ bụ open source, a nyochakwara akụkụ ụfọdụ n’onwe ha, nke na-achịkwa ihe ize ndụ ahụ kama iwepụ ya.

Ihe ọ na-echebe, n’ụzọ siri ike ma nwee ike ikwenye, bụ ihe abụọ kacha mkpa: enweghị ike ijikọ akwụkwọ ntuli aka gị na aha njirimara gị, naanị mkpokọta ikpeazụ ka a na-ekpughe.

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n’Bekee |
|---|---|
| Voting chain | Blockchain dị iche, nke Valar Group wuru, na-agba ntuli aka; note Zcash gị anaghị agagharị n’ime ya |
| Snapshot height | Block mainnet nke nguzo ego ya na-edobe ibu ntuli aka (block 3,459,350 maka ntuli aka NU7) |
| Nullifier | Akara pụrụ iche note na-egosi na e mefuru ya; ikpughe ya ga-ejikọ akwụkwọ ntuli aka na note, ya mere ntuli aka na-egosi na ọ nọghị na ndepụta kama |
| Private Information Retrieval (PIR) | Ịnweta data n’aka sava ebe ị na-ezo data ị rịọrọ |
| Homomorphic encryption | Nzobe ederede nke enwere ike ịgbakọta ciphertext ya ọnụ n’emepeghị ya |
| Coordinator multisig | Ìgwè 2-n’ime-5 na-enye ikike maka ajụjụ na igodo oge ntuli aka, mana enweghị ike ịhụ ma ọ bụ gbanwee votu |
| Election authority | Validator 10 ma ọ bụ karịa na-ejide ọnụ igodo iwepu nzobe ederede ekewara ekewa ma kpughee naanị ọnụ ọgụgụ ikpeazụ |
| Threshold decryption | Ịnweta nsonaazụ naanị mgbe ndị na-ejide òkè igodo zuru ezu, ebe a ụzọ abụọ n’ime ụzọ atọ, rụkọrọ ọrụ |
| Quorum | Opekempe òkè ZEC 1,000,000 maka ka ewere ntuli aka ahụ dị ka nke na-anọchite anya mmadụ |

## Ajụjụ a na-ajụkarị

Mkpụrụ ego m ọ na-agagharị ma ọ bụ kpọchie mgbe m tụrụ aka? Mba. A na-atụ ikike na block snapshot, ya mere ZEC gị na-anọ ebe ọ dị ma nwee ike imefu. Ntuli aka na-emepụta proof na chain dị iche, ọ bụghị azụmahia Zcash.

Onye ọ bụla ọ nwere ike ịma otu m tụrụ aka ma ọ bụ ego ole m ji? Mba. A na-etinye akwụkwọ ntuli aka na nzobe ederede, naanị mkpokọta ọnụ ka a na-ewepụ nzobe ederede. Votu gị bụ Ihe na-apughi ijikọ ọnụ na aha njirimara gị, a na-ekewakwa nguzo ego gị n’òkè 16 ezitere n’oge dị iche iji chebe ya ọbụna megide kọmitii jikọtara ọnụ.

Gịnị na-egbochi onye ịtụ aka ugboro abụọ, ma ọ bụ iji mkpụrụ ego ọ na-enweghị tụọ aka? Akwụkwọ ntuli aka ọ bụla nwere proof zero-knowledge na-egosi na ezigbo nguzo ego snapshot a na-emefubeghị kwadoro ya, proof enweghị ịnọ na ndepụta dabere na PIR na-egosikwa na emefubeghị note dị n’azụ ya, n’ekpugheghị note ọ bụ.

Ònye na-agụ votu? Otu validator kesara ekesa nke opekempe 10, nke ọ dịghị onye n’ime ha nwere ike iwepu nzobe ederede nke ihe ọ bụla naanị ya. Ụzọ abụọ n’ime ụzọ atọ ga-arụkọ ọrụ iji kpughee mkpokọta, iwepu nzobe ederede ọ bụla nwekwara proof ziri ezi ọhaneze.

Nsonaazụ ọ bụ nke na-adịgide? Ọ bụ akara mmetụta uche ndị nwere ego a tụrụ site na ego ejidere. Ọ na-agwa Gọọmentị nkịtị Zcash kama itinye mgbanwe n’ọrụ ozugbo.

Enwere m ike ịgba ma ọ bụ nyochaa nke a n’onwe m? Ee. Software chain ntuli aka, circuit, usoro PIR, na onye na-enyocha ọnụ ọgụgụ bụcha nke Valar Group bipụtara ka onye ọ bụla nyochaa ma gbaa.

## Nwalee nghọta gị

Ọ bụrụ na a na-etinye akwụkwọ ntuli aka ọ bụla na nzobe ederede ma onye ọ bụla tụrụ aka amaghị aha ya, olee otu onye ọ bụla ga-esi jide n’aka na mkpokọta e bipụtara ziri ezi nakwa na ọ dịghị onye tụrụ aka ugboro abụọ?

<details>
<summary>Azịza</summary>

Proof atọ na-arụ ọrụ ahụ. Akwụkwọ ntuli aka ọ bụla nwere proof zero-knowledge na-egosi na ezigbo nguzo ego snapshot kwadoro ya, ya mere a naghị agụta votu na-enweghị nkwado. Proof enweghị ịnọ na ndepụta dabere na PIR na-egosi na emefubeghị note dị n’azụ ya, na-egbochi ịtụ aka ugboro abụọ n’ekpugheghị note ahụ. Mgbe validator wepụrụ nzobe ederede mkpokọta ahụ, onye ọ bụla na-ebipụta proof ziri ezi, ya mere full node ọ bụla nwere ike ikwenye na ewepụrụ nzobe ederede nọmba ikpeazụ n’eziokwu site n’akwụkwọ ntuli aka e tinyere na nzobe ederede.
</details>

## Akụrụngwa

- [NU7 Ọkwa Ntuli Aka Ndị Nwere Ego (Valar Group na Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - ọkwa forum na-akọwa oke ntuli aka, elu snapshot, na nhazi oge
- [Chain Ntuli Aka Ndị Nwere Ego: nhazi teknụzụ](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - nkọwa protocol ibe a dabere na ya
- [Valar Group akwụkwọ ntuziaka ntuli aka e chebere echebe](https://valargroup.gitbook.io/shielded-vote-docs) - ebe nrụtụaka a na-elekọta maka chain ntuli aka
- [Valar Group koodu ntuli aka na nyocha (GitHub)](https://github.com/valargroup/vote-sdk) - mmejuputa open-source na nyocha ya

## Ibe ndị metụtara

- [Ịchọgharị Ozi Nkeonwe](../zcash-tech/private-information-retrieval) - usoro proof enweghị ịnọ na ndepụta n’azụ mgbochi ịtụ aka ugboro abụọ na nzuzo
- [Ironwood](../zcash-tech/ironwood) - pool e chebere echebe nke nguzo ego ya na-edobe ibu votu
- [zk-SNARKs](../zcash-tech/zk-snarks) - usoro proof n’azụ proof nguzo ego na ikike itinye aka
- [Pool Ndị E Chebere Echebe](../using-zcash/shielded-pools) - ihe nguzo ego e chebere echebe bụ na ihe mere o ji anọgide na nzuzo
- [Zcash Nkọwa Banyere Ego na Gọọmentị](../zcash-community/zcash-governance) - otu akara mmetụta uche a si enye aka na usoro mkpebi sara mbara nke Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - otu n’ime ndị otu ise nke coordinator multisig
