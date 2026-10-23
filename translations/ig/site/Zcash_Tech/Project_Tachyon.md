<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ọrụ Tachyon

## TL;DR

- Tachyon bụ atụmatụ imegharị ụzọ obere akpa Zcash si achọta ma mefuo ego echekwara, nke e mere iji mee ka netwọk ahụ too ruo ọtụtụ ndị ọrụ
- Taa, obere akpa ga-agbalị ịchọpụta nnukwu akụkụ nke blockchain iji chọpụta ụgwọ ndị bụ nke ya, ọ bụkwa ya bụ isi ihe mere njikọta nchekwa ji adị nwayọ
- Tachyon ji **njikọ na-amaghị ama** dochie nke ahụ, yabụ obere akpa na-enweta ihe ọ chọrọ na-enyochaghị ihe niile na-agwaghị sava nke ọ chọrọ
- Ọ na-ebufekwa nkọwa ịkwụ ụgwọ site na blockchain wee banye na arịrịọ ịkwụ ụgwọ n'onwe ya, nke na-eme ka usoro ahụ dị mfe mana ọ na-agbanwe ibu ọrụ na obere akpa ego
- Ọ bụ atụmatụ e bipụtara na mbụ na Eprel 2025. Ọ bụghị **akụkụ nke NU7** ma ọ bụghịkwa **ezigara ya**, ọ chọkwara mgbalị injinia n'ọkwa nke nkwalite Sapling

<br/>

## Ònye bụ nke a maka onye

- Onye ọ bụla lere njikọ akpa ego echekwara ma na-eche ihe kpatara o ji ewe ogologo oge otú a
- Ndị bịara ọhụrụ na-ahụ Tachyon mgbe niile ka a kpọtụrụ aha n'akụkụ nhazi NU7 na Zcash
- Ndị na-agụ akwụkwọ chọrọ echiche ahụ nke mbụ, nke abụọkwa, ndị chọrọ ka e jiri ihe odide nzuzo chọọ ya

<br/>

## Nsogbu Tachyon na-edozi

Zcash na-ezochi onye a ga-akwụ ụgwọ. Nke ahụ bụ isi ihe dị mkpa, ọ na-ewetakwa nsogbu dị egwu: ọ bụrụ na onye ọ bụla enweghị ike ịmata onye a ga-akwụ ụgwọ, kedu ka obere akpa gị si achọta nke gị?

Na Bitcoin, nke a dị mfe. Adreesị bụ nke ọha, yabụ obere akpa nwere ike ịjụ onye na-eje ozi "gịnị ka e zigara na adreesị a?" wee nweta azịza. Obere akpa Zcash enweghị ike ịjụ ajụjụ ahụ, n'ihi na ịjụ ya ga-ekpughe kpọmkwem ihe e mere ka ọdọ mmiri ahụ zoo.

Ya mere, Zcash na-eme ihe dị iche. Onye zitere ya na-ezochi nkọwa ịkwụ ụgwọ ma tinye ha n'ime azụmahịa ahụ n'onwe ya. Akpa ego gị na-arụ ọrụ site na azụmahịa dị na yinye ahụ wee gbalịa ịchọpụta nke ọ bụla. Ihe fọrọ nke nta ka ọ bụrụ mgbalị ọ bụla na-ada ada. Mmadụ ole na ole na-aga nke ọma bụ ịkwụ ụgwọ gị. A na-akpọ nke a **nkọwapụta nnwale**, ọ bụkwa nkeonwe, ziri ezi, ma dị nwayọ.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Ihe ọrụ ahụ na-adabere na ya bụ ihe a ga-eji jide ya. Mgbalị ego ị na-emefu na-adabere n'otú usoro a si buru ibu, ọ bụghị n'otú ego ole ị natara si dị. Onye na-enwetabeghị otu ụgwọ ọrụ na-arụ ọrụ dịka onye na-enweta ha kwa ụbọchị. Ka Zcash na-eto, nke ahụ na-aka njọ nye onye ọ bụla. N'ikwu ya n'ụzọ dị mfe, ọ "anaghị amụba."

<br/>

## Ihe Tachyon gbanwere

Tachyon na-awakpo nsogbu ahụ na isi mmalite ya: ọ kwụsịrị iji blockchain dị ka ọwa nnyefe maka nzuzo ịkwụ ụgwọ.

Kama nke ahụ, nkọwa ịchọrọ ga-aga na arịrịọ ịkwụ ụgwọ ahụ n'onwe ya, n'èzí otu. Arịrịọ ịkwụ ụgwọ, URI, ma ọ bụ koodu QR na-ebu ozi e zoro ezo na azụmahịa ahụ. Sean Bowe kọwara nke a dị ka ịnakwere ịkwụ ụgwọ **na-abụghị otu** maka oge mbụ na usoro Zcash echebe.

Ozugbo agbụ ahụ anaghịzi ebu ozi ahụ, obere akpa gị enweghịzi ihe mere ị ga-eji chọọ ya, nsogbu nke nrụzi nnwale ahụ ga-apụkwa n'anya.

Agbanyeghị, obere akpa gị ka kwesịrị ịma ọnọdụ usoro dị ugbu a iji mefuo ego. Nke ahụ bụ ọkara nke abụọ nke imewe ahụ, **nkwekọrịta na-amaghị ama**: ụzọ maka obere akpa iji nweta ihe ndị ọ chọrọ kpọmkwem n'ekpugheghị onye sava ihe ndị ọ rịọrọ.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ihe ọ ga-apụta nye onye na-eji obere akpa ego

- **Ịmekọrịta ihe na-akwụsị itolite na yinye ahụ.** Oge obere akpa gị na-eji achọta ihe ga-esochi ihe omume gị kama ibu Zcash.
- **Ịkwụ ụgwọ na-adị ka inye mmadụ ụgwọ.** Arịrịọ ịkwụ ụgwọ ahụ na-ebu ihe onye nnata chọrọ, ya mere mgbanwe dị n'etiti onye zitere na onye nnata dị mkpa karịa ka ọ dị taa.
- **Akpa ego nwere ibu ọrụ karịa.** Ebe ọ bụ na agbụ ahụ anaghịzi enwe otu nkọwa ịkwụ ụgwọ gị ezoro ezo, ịfufu data akpa ego gị dị mkpa karịa. Nkwado ndabere na mgbake na-aga site na ịbụ atụmatụ protocol gaa na ihe ngwanrọ akpa ego ga-edozi.
- **Ụfọdụ ihe ndị a maara nke ọma na-agagharị ma ọ bụ na-apụ n'anya.** Tachyon na-ewepụ isi ihe dị iche iche, igodo nlele, na adreesị ịkwụ ụgwọ na usoro isi, na-ahapụ ha ka ha dịrị na akpa ego. Nke a bụ otu n'ime akụkụ ndị ka mkpa nke atụmatụ ahụ ma a ka na-arụ ọrụ ya.

<br/>

## Ileba anya nke ọma maka ndị na-agụ akwụkwọ teknụzụ

A kọwara Tachyon dị ka mgbanwe dakọtara na usoro Orchard. Enwere ike itinye ya dị ka nkwalite na ọdọ mmiri Orchard dị ugbu a ma ọ bụ dị ka ọdọ mmiri dị iche nke a na-echebe site na [tornstile](https://zechub.wiki/zcash-tech/the-turnstile), otu usoro Zcash ji eme Ironwood. Nhọrọ ahụ na-emetụta ntinye ya, ọ bụghị imewe ya.

Ọ na-egbochi ọtụtụ ihe site na Orchard: nhazi igodo RedPallas, nkwa uru homomorphic na mbinye aka njikọ, yana usoro igodo nkewa nke na-enye ngwaọrụ ohere igosi na-enyeghị ikike mmefu.

Ọrụ nhazi ahụ dabere na **data na-ebu ihe akaebe**, usoro nke data na-aga n'akụkụ ihe akaebe nke izi ezi ya, nke mere na ijikọta ya na data ndị ọzọ na-ebu ihe akaebe na-emepụta ihe nketa ma na-agbatị ihe akaebe ndị ahụ. Nke a bụ ihe na-eme ka ọtụtụ ọrụ ekwenyesiri ike banye n'ihe dị obere ma dị ngwa ịlele. Halo, nke ndị otu Zcash, bụ ihe mere data na-ebu ihe akaebe ji baa uru iji wulite na ya.

Nke atọ bụ **njikọ azụmahịa echekwara**, nke na-agbanwe otu esi eziga mgbanwe ọnọdụ echekwara ma nwee mmetụta dị ukwuu n'otú mbinye aka si arụ ọrụ.

<br/>

## Ebe ọrụ ahụ dị

Tachyon bụ **atụmatụ, ọ bụghị atụmatụ ebupụrụ**. E bipụtara ya na Eprel 2025, ozi ọzọ e bipụtara na Mee 2025 rụkwara ọrụ site na ihe ndị mmadụ kwenyere na ya. A kpọrọ ya aha dị ka onye ga-azọ ọkwa maka NU7, mmelite ọzọ mgbe Ironwood, mana usoro NU7 e kwekọrịtara na 17 Septemba 2026 anaghị agụnye ya: [ZIP 259](https://zips.z.cash/zip-0259) na-edepụta ihe NU7 na-etinye, na [ọkwa ogbako](https://forum.zcashcommunity.com/t/nu7-timeline/57655) na-ekwu na ọ dịghị usoro azụmahịa ọhụrụ pụtara na ya. Edobebeghị ụbọchị mmalite ọ bụla maka Tachyon.

Ihe onye dere ya dere n'onwe ya bụ na atụmatụ a ga-eme ihe ọ bụghị nnyocha e chepụtara echepụta, mana nke chọrọ mgbalị injinia dịka Sapling, ya na ajụjụ ndị siri ike a ga-ajụ maka ya ma emechaa.

Ọrụ ndị metụtara ya apụtala ìhè. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), nke bụ otu n'ime ihe niile ewepụtara na Julaị 2026, bụ ọrụ ọnụ n'etiti Project Tachyon na Valar Group ma na-egosi ụfọdụ mgbanwe ndị a na-eme na ọkwa netwọkụ. [Iweghachite ozi nkeonwe](https://zechub.wiki/zcash-tech/private-information-retrieval) nnyocha na-achọ otu ihe mgbochi nyocha site n'akụkụ dị iche.

<br/>

## Echiche na-ezighị ezi a na-ahụkarị

- **Tachyon adịghị ndụ.** Enweghị obere akpa ego ọ bụla na-eji ya taa, ọ dịghịkwa mmelite ọ bụla mere ka ọ rụọ ọrụ.
- **Tachyon abụghị otu ihe ahụ dị ka Ironwood.** E tinyere Ironwood n'ọrụ na Julaị 2026 ma chịkọta ọdọ mmiri Orchard na turnstile. Tachyon bụ atụmatụ dị iche, nke e mechara mee gbasara nhazi.
- **Tachyon abụghị mbelata nzuzo.** Ebumnuche ya bụ idobe enweghị ike ịmata ọdịiche dị n'etiti akwụkwọ ndekọ ego ebe a na-ewepụ ọnụ ahịa nhazi, ọ bụghị ịgbanwe nzuzo maka ọsọ.
- **zk-SNARK abụghị ihe mgbochi.** Aro a doro anya na akụkụ dị nwayọ bụ otu obere akpa si achọpụta ma hazie ọnọdụ, ọ bụghị ọnụ ahịa nke ihe akaebe ịlele.
- **Tachyon anọghị na NU7.** A kpọburu ya aha dị ka onye ga-azọ ọkwa, mana ebumnuche e kwetara na Septemba 2026 kpuchiri ngọngọ sekọnd 25, imegharị ụgwọ na njedebe nke azụmahịa nke ụdị 4, na-enweghị usoro azụmahịa ọhụrụ ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Nkọwa Okwu

| Oge okwu | Ihe ọ pụtara |
|---|---|
| Trial decryption | Ịnwa ịchọpụta azụmahịa otu otu iji chọta ndị e zigara gị |
| In-band secret distribution | Itinye nzuzo ịkwụ ụgwọ n'ime azụmahịa ahụ na blockchain, dịka Zcash si eme taa |
| Out-of-band payment | Ịnyefe nkọwa ịkwụ ụgwọ ozugbo n'etiti onye zitere na onye nnata kama site na yinye ahụ |
| Oblivious synchronization | Ịchọta data yinye nke obere akpa chọrọ n'ekpugheghị data achọrọ |
| Proof-carrying data (PCD) | Data nke na-agagharị na ihe akaebe nke izi ezi nke ya, ka e wee nwee ike ijikọta ma tinye ihe akaebe |
| Shielded transaction aggregate | Ụzọ Tachyon's si ejikọta mgbanwe steeti echekwara, na-agbanwe otu esi ekwurịta okwu ma bịanye aka na ha |
| ledger indistinguishability | Enweghị ike ịkọwa ihe onwunwe nke kpuchiri azụmahịa dị iche na ibe ya |

<br/>

## Ajụjụ Ndị A Na-ajụkarị

**Nke a ọ̀ ga-eme ka obere akpa m dị ngwa ngwa?** Nke ahụ bụ ebumnuche ya. Oge imekọ ihe ọnụ ga-esochi ọrụ nke gị kama nha nke yinye ahụ. Ọ dịghị ihe e zigara, yabụ enweghị ọnụọgụ a tụrụ atụ ị ga-ehota.

**Ọ dị mkpa ka m mee ihe ọ bụla ugbu a?** Mba. Tachyon bụ atụmatụ. Ọ bụrụ na a nabata ya, ọ ga-abịa site na mmelite netwọk yana ọkwa nkịtị.

**Iwepụ igodo nlele ọ pụtara na ị gaghị enwe ike ịkekọrịta ohere ịgụ akwụkwọ?** Aro a na-eme ka ikike ahụ pụọ na usoro isi wee banye na akpa ego. Ihe ọ dị ka n'omume bụ otu n'ime ajụjụ ndị mepere emepe.

**Ego m ọ̀ nọ n'ihe ize ndụ ma Tachyon bufee ya?** Ntinye ga-eji nkwalite Orchard ma ọ bụ turnstile, nke e mere ka uru ya gaa n'okpuru iwu akaụntụ ọha. Peeji Ironwood na-akọwa otu turnstile si arụ ọrụ.

<br/>

## Ibe ndị metụtara ya

- [Iweghachite Ozi nkeonwe](https://zechub.wiki/zcash-tech/private-information-retrieval) - ụzọ ọzọ isi mee otu ihe nyocha obere akpa ahụ
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - otu ebe e wuru akụkụ nke mgbalị injinia Tachyon's
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - mmelite ahụ mere ka ọ rụọ ọrụ na Julaị 2026, nke a na-enwekarị mgbagwoju anya na Tachyon
- [Ogwe Mgbanwe](https://zechub.wiki/zcash-tech/the-turnstile) - usoro Tachyon nwere ike iji ma ọ bụrụ na etinyere ya dị ka ọdọ mmiri nke ya
- [Nchekwa Mgbe-Quantum](https://zechub.wiki/zcash-tech/post-quantum-security) - ebe Tachyon nọdụrụ n'akụkụ ọrụ usoro ogologo oge
- [Otu esi ahazi Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - onye na-arụ ọrụ a na otu usoro gburugburu ebe obibi si adabakọ ọnụ

<br/>

## akụrụngwa

- [Tachyon: Ịtụle Zcash na iji Mmekọrịta Amaghị](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Eprel 2025, atụmatụ mbụ
- [Tachyaction n'ebe dị anya](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mee 2025, nkwekọrịta na ihe gbasara usoro, edere maka ndị na-emepụta usoro
- [Blọọgụ Sean Bowe's](https://seanbowe.com/blog/) - ebe ebipụtara usoro Tachyon
- [tachyon.z.cash](https://tachyon.z.cash/) - saịtị ọrụ
