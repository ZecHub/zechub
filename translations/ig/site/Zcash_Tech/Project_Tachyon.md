<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Ọrụ Tachyon

## Nchịkọta ngwa ngwa

- Tachyon bụ atụmatụ imegharị ụzọ Zcash e-akpa ego si achọta ma na-emefu ego nke e chebere echebe, nke e mere iji kwe ka netwọk ahụ too ruo n’ọtụtụ ndị ọrụ dị ukwuu
- Taa, e-akpa ego ga-anwa iwepu Nzobe ederede n’oke akụkụ nke blockchain iji chọpụta Kwụọ ụhwọ ndị bụ nke ya, nke a bụkwa isi ihe mere ịmekọrịta nke e chebere echebe ji adị nwayọ
- Tachyon ji **mmekọrịta na-amaghị ama [oblivious synchronization]** dochie nke a, ka e-akpa ego wee nweta ihe ọ chọrọ n’enweghị ịnyocha ihe niile ma ghara ịgwa sava akụkụ ndị ọ chọrọ
- Ọ na-ebufekwa nkọwa Kwụọ ụhwọ site na blockchain tinye ya n’arịrịọ Kwụọ ụhwọ n’onwe ya, nke na-eme ka protocol dị mfe mana na-ebufe ọrụ ahụ n’aka e-akpa ego
- Ọ bụ atụmatụ, nke ebipụtara mbụ n’ọnwa Eprel 2025. Ọ **abụghị akụkụ nke NU7** ma **ewepụtabeghị ya**, ọ chọkwara mgbalị injinịa hà ka nke network upgrade Sapling

<br/>

## Ònye ka nke a bụ maka ya

- Onye ọ bụla hụrụ e-akpa ego nke e chebere echebe ka ọ na-emekọrịta ma jụọ ihe mere o ji ewe ogologo oge
- Ndị ọhụrụ na-ahụkarị ka a na-ekwu maka Tachyon n’akụkụ scaling NU7 na Zcash
- Ndị na-agụ chọrọ ịghọta echiche ahụ mbụ, cryptography emesịa

<br/>

## Nsogbu Tachyon na-edozi

Zcash na-ezo onye Kwụọ ụhwọ bụ maka ya. Nke ahụ bụ ebumnuche ya niile, ọ na-emekwa ka e nwee nsogbu na-adịghị mfe: ọ bụrụ na ọ dịghị onye nwere ike ịmata onye Kwụọ ụhwọ bụ nke ya, olee otú e-akpa ego nke gị ga-esi achọta nke gị?

Na Bitcoin, nke a dị mfe. Adreesị akpa ego bụ nke ọha, ya mere e-akpa ego nwere ike ịjụ sava …gịnị ka ezitere na Adreesị akpa ego a?… ma nweta azịza. E-akpa ego Zcash enweghị ike ịjụ ajụjụ ahụ, n’ihi na ịjụ ya ga-ekpughe kpọmkwem ihe pool nke e chebere echebe ka e mere iji zoo.

Ya mere Zcash na-eme ihe dị iche. Onye zitere ego na-eji Nzobe ederede zoo nkọwa Kwụọ ụhwọ ma tinye ha n’ime Azụmahia ahụ n’onwe ya. E-akpa ego gị na-agazi Azụmahia ndị dị na chain ma nwaa iwepu Nzobe ederede nke ọ bụla. Ihe fọrọ nke nta ka ọ bụrụ mbọ niile anaghị aga nke ọma. Ole na ole gara nke ọma bụ Kwụọ ụhwọ gị. A na-akpọ nke a **nnwale iwepu Nzobe ederede [trial decryption]**, ọ bụ nzuzo, ziri ezi, ma dị nwayọ.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Ihe mgbagwoju anya dị na ya bụ ihe ọrụ ahụ dabere na ya. Mgbalị e-akpa ego gị na-eme dabere n’ibu chain ahụ, ọ bụghị n’ọnụọgụ Kwụọ ụhwọ ị natara n’eziokwu. Onye na-anatabeghị ọbụna otu Kwụọ ụhwọ na-arụ ihe fọrọ nke nta ka ọ bụrụ otu ọrụ onye na-anata ha kwa ụbọchị na-arụ. Ka Zcash na-eto, nke a na-akawanye njọ maka onye ọ bụla. N’okwu atụmatụ ahụ, ọ …anaghị scaling ma ọlị.…

<br/>

## Ihe Tachyon na-agbanwe

Tachyon na-awakpo nsogbu ahụ n’isi mgbọrọgwụ ya: ọ kwụsịrị iji blockchain dị ka ụzọ e si ebufe ihe nzuzo Kwụọ ụhwọ.

Kama nke ahụ, nkọwa ndị ị chọrọ na-eso arịrịọ Kwụọ ụhwọ n’onwe ya, n’èzí band. Arịrịọ Kwụọ ụhwọ, URI, ma ọ bụ QR code na-eburu ozi nke e ji Nzobe ederede zoo n’ime Azụmahia mbụ. Sean Bowe kọwara nke a dị ka ịnakwere **Kwụọ ụhwọ n’èzí band [out-of-band payments]** maka oge mbụ n’ime protocol Zcash nke e chebere echebe.

Mgbe chain ahụ anaghịzi ebu ozi ahụ, e-akpa ego gị enweghịzi ihe mere ọ ga-eji chọọ ya, nsogbu nnwale iwepu Nzobe ederede ahụ akwụsịkwa.

E-akpa ego gị ka kwesịrị ịma ọnọdụ chain dị ugbu a iji nwee ike imefu ego. Nke ahụ bụ ọkara nke abụọ nke imewe ahụ, **mmekọrịta na-amaghị ama**: ụzọ e-akpa ego si enweta ihe ndị ọ chọrọ kpọmkwem n’enweghị ikpughe sava ihe ndị ọ rịọrọ.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ihe ọ ga-apụtara onye na-eji e-akpa ego

- **Ime mmekọrịta anaghịzi eto na chain.** Oge e-akpa ego gị na-eji iru ọnọdụ ugbu a ga-adabere n’ọrụ gị n’onwe gị kama n’ibu Zcash.
- **Kwụọ ụhwọ ga-adịkwu ka inye mmadụ akwụkwọ ụgwọ.** Arịrịọ Kwụọ ụhwọ na-ebu ihe onye natara ego chọrọ, ya mere mgbanwe dị n’etiti onye zitere na onye natara ego ga-adị mkpa karịa ka ọ dị taa.
- **E-akpa ego na-ebu ọrụ ka ukwuu.** Ebe chain anaghịzi ejide otu nzuzo nke nkọwa Kwụọ ụhwọ gị, ida data e-akpa ego gị dị mkpa karịa. Ndabere na mgbake na-esi n’ịbụ atụmatụ protocol ghọọ ihe software e-akpa ego ga-eme nke ọma.
- **Ụfọdụ ihe ndị a maara nke ọma na-apụ ma ọ bụ na-apụ n’ọzọ.** Tachyon na-ewe diversification igodo, viewing key, na Adreesị akpa ego Kwụọ ụhwọ pụọ na protocol bụ isi, hapụ ha n’aka oyi akwa e-akpa ego. Nke a bụ otu n’ime akụkụ atụmatụ ahụ nwere nnukwu nsonaazụ, a ka na-arụkwa ya ọrụ.

<br/>

## Nlele dị nso maka ndị na-agụ gbasara teknụzụ

Tachyon ka akọwara dị ka mgbanwe nwere ndakọrịta azụ na protocol Orchard. Enwere ike ibunye ya ma dị ka nkwalite nke pool Orchard dị ugbu a ma ọ bụ dị ka pool nke e chebere echebe dị iche, nke a na-eru site na [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), otu usoro Zcash ji mee ihe maka Ironwood. Nhọrọ ahụ na-emetụta mbunye, ọ bụghị imewe ahụ.

Ọ na-edobe ọtụtụ ihe sitere na Orchard: RedPallas ime ka igodo bụrụ nke enweghị njirimara ọzọ, value commitment homomorphic na binding signature, na nhazi igodo ekewara ekewa nke na-enye ngwaọrụ ohere inyefe proving n’enyeghị ikike imefu ego.

Ọrụ scaling ahụ dabere na **data na-ebu proof [proof-carrying data]**, usoro data na-eso proof nke izizi ya, nke mere ijikọta ya na data ọzọ na-ebu proof na-emepụta ihe ketara ma gbatịa proof ndị ahụ. Nke a bụ ihe na-enye ohere ka a chịkọta nnukwu ọrụ enyochala n’ime ihe nta, nke a na-enyocha ngwa ngwa. Halo, nke otu nọ n’azụ Zcash chọpụtara, bụ ihe mere data na-ebu proof ji baa uru nke ọma ka a wulite n’elu ya.

Eriri nke atọ bụ **nchịkọta Azụmahia nke e chebere echebe [shielded transaction aggregates]**, nke na-agbanwe ụzọ e si ekwupụta mgbanwe ọnọdụ nke e chebere echebe ma nwee mmetụta na-esochi na ụzọ signature si arụ ọrụ.

<br/>

## Ebe ọrụ ahụ ruru

Tachyon bụ **atụmatụ, ọ bụghị atụmatụ ewepụtarala**. Ebipụtara ya n’ọnwa Eprel 2025, post na-esochi ya n’ọnwa Mee 2025 tụlere mmetụta consensus. Akpọrọ ya onye nwere ike ịbụ maka NU7, network upgrade na-esote Ironwood, mana scope NU7 kwetara na 17 Septemba 2026 anaghị etinye ya: [ZIP 259](https://zips.z.cash/zip-0259) depụtara ihe NU7 na-ebunye, ọkwa forum [forum announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655) kwukwara na ọ nweghị format Azụmahia ọhụrụ pụtara n’ime ya. Enweghị ụbọchị activation e debere maka Tachyon.

Nkọwa onye odee n’onwe ya bụ na nke a bụ atụmatụ a pụrụ ime, kama ịbụ nchọpụta nke amụma, mana ọ chọrọ mgbalị injinịa hà ka Sapling, ebe a hapụrụ ụfọdụ ajụjụ siri ike ka e dozie n’ọdịnihu.

A hụlarị ọrụ metụtara ya. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), full node ewepụtara n’ọnwa Julaị 2026, bụ mgbalị jikọrọ aka n’etiti Project Tachyon na Valar Group ma na-egosi ụfọdụ n’ime mgbanwe ọkwa netwọk ndị a tupu oge eruo. Nchọpụta [Private information retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) na-elekwasị anya n’otu mgbochi ịnyocha ahụ site n’akụkụ ọzọ.

<br/>

## Echiche na-ezighi ezi ndị a na-ahụkarị

- **Tachyon adịghị arụ ọrụ ugbu a.** Ọ nweghị e-akpa ego ji ya taa, ọ nweghịkwa network upgrade kpalitere ya.
- **Tachyon abụghị otu ihe na Ironwood.** Ironwood kpalitere n’ọnwa Julaị 2026 ma metụta pool Orchard na turnstile. Tachyon bụ atụmatụ dị iche, nke mechara, gbasara scaling.
- **Tachyon abụghị mbelata Nzuzo.** Ebumnuche bụ idobe enweghị ike ịmata ledger iche iche ma wepụ ụgwọ scaling, ọ bụghị ịgbanwe Nzuzo maka ọsọ.
- **Nnyocha proof zk-SNARK abụghị mgbe ọ bụla mgbochi.** Atụmatụ ahụ kwuru kpọmkwem na akụkụ nwayọ bụ ụzọ e-akpa ego si achọpụta ma na-ahazi ọnọdụ, ọ bụghị ọnụ ahịa ịlele proof.
- **Tachyon anọghị na NU7.** A kpọrọ ya onye nwere ike ịbụ otu mgbe, mana scope e kwetara n’ọnwa Septemba 2026 gụnyere block sekọnd 25, imegharị ugwo na njedebe Azụmahia version 4, n’enweghị format Azụmahia ọhụrụ ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Nkọwa okwu

| Okwu | Ihe ọ pụtara |
|---|---|
| Trial decryption | Ịnwale iwepu Nzobe ederede Azụmahia otu otu iji chọta ndị edere maka gị |
| In-band secret distribution | Itinye ihe nzuzo Kwụọ ụhwọ n’ime Azụmahia na blockchain, dịka Zcash na-eme taa |
| Out-of-band payment | Ịnyefe nkọwa Kwụọ ụhwọ ozugbo n’etiti onye zitere na onye natara ego kama site na chain |
| Oblivious synchronization | Inweta data chain e-akpa ego chọrọ n’enweghị ikpughe data a rịọrọ |
| Proof-carrying data (PCD) | Data na-eso proof nke izizi ya, ka e wee nwee ike ijikọta ma chịkọta proof |
| Shielded transaction aggregate | Ụzọ Tachyon si achịkọta mgbanwe ọnọdụ nke e chebere echebe, na-agbanwe ụzọ e si ekwupụta ma bịanye ha signature |
| ledger indistinguishability | Njirimara na-eme ka a ghara ikewapụ Azụmahia nke e chebere echebe n’otu n’otu |

<br/>

## Ajụjụ a na-ajụkarị

**Nke a ọ ga-eme ka e-akpa ego m na-emekọrịta ngwa ngwa?** Nke ahụ bụ ebumnuche ya. Oge mmekọrịta ga-adabere n’ọrụ gị n’onwe gị kama n’ibu chain. Ọ dịghị ihe ewepụtarala, ya mere ọnụọgụ a tụrụ atụbeghị ka a kpọtụrụ.

**Ọ dị m mkpa ime ihe ọ bụla ugbu a?** Mba. Tachyon bụ atụmatụ. Ọ bụrụ na a nakwere ya, ọ ga-abịa site na network upgrade na ọkwa a na-emebu.

**Iwepụ viewing key ọ pụtara ida ikike ịkekọrịta ohere ịgụ?** Atụmatụ ahụ na-ebufe ikike ahụ pụọ na protocol bụ isi tinye ya n’oyi akwa e-akpa ego. Ụdị nke a ga-adị n’ezi omume bụ otu n’ime ajụjụ ndị ka mepere emepe.

**Ego m ọ nọ n’ihe ize ndụ ma ọ bụrụ na e wepụta Tachyon?** Mbufe ga-eji ma network upgrade Orchard ma ọ bụ turnstile, nke e mere ha abụọ ka uru si aga n’okpuru iwu ndekọ ego nke ọha. Peeji Ironwood kọwara otú turnstile si arụ ọrụ.

<br/>

## Peeji ndị metụtara ya

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - ụzọ ọzọ e si abịakwute otu mgbochi ịnyocha e-akpa ego ahụ
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - node e wuru akụkụ ya site na mgbalị injinịa Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - network upgrade kpalitere n’ọnwa Julaị 2026, nke a na-agbaghakarị na Tachyon
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - usoro Tachyon nwere ike iji ma ọ bụrụ na ebufere ya dịka pool nke ya
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - ebe Tachyon nọ n’akụkụ ọrụ protocol ogologo oge
- [How Zcash Is Organized](https://zechub.wiki/start-here/how-zcash-is-organized) - ndị na-arụ ọrụ a na otú ecosystem si dakọrịta

<br/>

## Akụrụngwa

- [Tachyon: Scaling Zcash with Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Eprel 2025, atụmatụ mbụ
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mee 2025, mmetụta consensus na protocol, nke edere maka ndị onye mmepụta protocol
- [Blog Sean Bowe](https://seanbowe.com/blog/) - ebe a na-ebipụta usoro Tachyon
- [tachyon.z.cash](https://tachyon.z.cash/) - saịtị ọrụ
