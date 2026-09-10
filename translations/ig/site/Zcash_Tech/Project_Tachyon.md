<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ihe oru Tachyon

## TL;DR

- Tachyon bụ atụmatụ e mere maka ịhazigharị ụzọ akpa ego Zcash si achọta ma na-emefu ego echekwara, nke a ga-ekwe ka netwọkụ ahụ too ọtụtụ ndị ọrụ.
- Taa, obere akpa ga-anwa ịdekọ nnukwu akụkụ nke blockchain iji chọpụta ụgwọ ndị bụ nke ya. Nke ahụ bụkwa isi ihe mere na mmekọrịta echedoro ji adị nwayọ
- Tachyon na-eji dochie ya site n'iji ** synchronization doro anya, nke mere obere akpa ego ga - enweta ihe ọ chọrọ n'ebughị ụzọ nyochaa ihe niile ma gwa onye nkesa akụkụ ndị ọ chọrọ.
- Ọ na-ebupụkwa nkọwa ịkwụ ụgwọ site na blockchain wee banye n'ime arịrịọ ọkwụkwụụgwọ ahụ, nke mere ka usoro iwu dị mfe mana ibu ọrụ gaa akpa ego.
- Ọ bụ atụmatụ, nke mbụ e bipụtara na Eprel 2025 ma kpọọ ya dịka onye ga-aga NU7. ** A naghị ebubata**, ọ chọkwara mgbalị injinịa n'ụdị nkwalite Sapling.

<br/>

## Onye ka nke a bụ maka ya?

- Onye ọbụla leere akpa ego e chebere anya ma jụọ ihe mere o ji ewe ogologo oge iji mepụta ya.
- Ndị bịara ọhụrụ na-ahụ Tachyon ka a kpọtụrụ aha n'akụkụ NU7 na Zcash scaling.
- Ndị na-agụ akwụkwọ chọrọ echiche mbụ ma jiri ihe nzuzo mee nke abụọ.

<br/>

## Nsogbu Tachyon na-edozi

Zcash na-ezobe onye a ga-akwụ ụgwọ. Nke ahụ bụ isi okwu, ọ na - ewetakwa nsogbu dị egwu: maọbụrụ na onweghị onye nwere ike ịmata onye ego ahụ si n'aka ya, kedụ ka obere akpa gị ga esi chọta nke gị?

In Bitcoin this is easy. Addresses are public, so a wallet can ask a server "what was sent to this address?" and get an answer. A Zcash wallet cannot ask that question, because asking it would reveal exactly what the shielded pool is designed to hide.

So Zcash does something different. The sender encrypts the payment details and tucks them inside the transaction itself. Your wallet then works through transactions on the chain and tries to decrypt each one. Almost every attempt fails. The few that succeed are your payments. This is called **trial decryption**, and it is private, correct, and slow.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

The catch is what the work depends on. The effort your wallet spends is set by how big the chain is, not by how many payments you actually received. Someone who has never received a single payment does nearly as much work as someone who receives them daily. As Zcash grows, that gets worse for everybody. In the words of the proposal, it "simply does not scale."

<br/>

## Ihe Tachyon gbanwere

Tachyon na-awakpo nsogbu ahụ n'isi ya: ọ kwụsịrị iji blockchain dị ka ụzọ nnyefe maka nzuzo ịkwụ ụgwọ.

Instead, the details you need travel with the payment request itself, out of band. A payment request, a URI, or a QR code carries the information that used to be encrypted into the transaction. Sean Bowe describes this as embracing **out-of-band payments** for the first time in a Zcash shielded protocol.

Ozugbo agbụ ahụ na-ebughịzi ozi ahụ, obere akpa gị enweghịzị ihe mere ị ga-eji chọọ ya, nsogbu nke ịmebi usoro nnwale a pụkwara.

Akpa ego gị ka kwesịrị ịma ọnọdụ nke ugbu a iji nwee ike imefu, ọ bụ ezie na. Nke ahụ bụ akụkụ abụọ nke atụmatụ ahụ, ** synchronization doro anya: ụzọ maka obere akpa iji nweta ihe ndị dị mkpa ọ chọrọ n'emeghị ka onye nkesa mara ihe ndị ọ rịọrọ ya.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ihe ọ ga-apụta nye onye ji akpa ego eme ihe.

- **Mmekọrịta na-akwụsị itolite n'agbụ.** Oge obere akpa gị ji eme ihe ga-esochi ọrụ nke aka gị kama ịdị ukwuu Zcash.
- ** Ịkwụ ụgwọ na-adịzi ka inye mmadụ akwụkwọ.** Ihe onye ahụ chọrọ bụ ego ọ ga-akwụ ya, n'ihi ya, ihe dị mkpa karịa taa bụ otú ndị si ezipụ ozi ma zite ha.
- ** Akpa ego na-ebu ibu ọrụ.** Ebe ọ bụ na agbụ ahụ anaghịzi ejide akwụkwọ ezoro ezo nke nkọwa ịkwụ ụgwọ gị, tufuo data akpa ego gị dị mkpa karịa. Ndabere na mgbake si n'ịbụ usoro protocol gaa ihe ngwanrọ obere akpa ga - eme ka o zie ezi.
- **Some familiar pieces move or disappear.** Tachyon takes key diversification, viewing keys, and payment addresses out of the core protocol, leaving them to the wallet layer. This is one of the more consequential parts of the proposal and is still being worked through.

<br/>

## N'ilebakwu anya maka ndị na-agụ akwụkwọ ọrụaka.

A kọwara Tachyon dị ka mgbanwe na-agbanwe agbanwe maka usoro Orchard. Enwere ike itinye ya ma ọ bụ dịka nkwalite nke ọdọ mmiri Orchid dị ugbu a ma ọ bụkwanụ dị ka ebe nchekwa echekwara iche site n'aka onye ọrụ . [turnicil](https://zechub.wiki/zcash-tech/the-turnstile), otu usoro Zcash ji maka Ironwood Nhọrọ ahụ na-emetụta nkesa, ọ bụghị imewe.

It keeps several things from Orchard: RedPallas key re-randomization, homomorphic value commitments and binding signatures, and the partitioned key structure that lets a device delegate proving without handing over spend authority.

The scaling work leans on **proof-carrying data**, a technique in which data travels alongside a proof of its own correctness, so that combining it with other proof-carrying data produces something that inherits and extends those proofs. This is what allows a large amount of verified work to be compressed into something small and quick to check. Halo, discovered by the team behind Zcash, is what made proof-carrying data practical enough to build on.

Akụkụ nke atọ bụ ** mkpokọta azụmahịa echekwara, * nke na-agbanwe etu esi ekwupụta mgbanwe steeti ezoro ezo ma nwee mmetụta dị n'elu otu ịbịanye aka si arụ ọrụ.

<br/>

## Ebe ọrụ ahụ kwụ n'ahịrị .

Tachyon is a **proposal, not a shipped feature**. It was published in April 2025, and a follow-up post in May 2025 worked through the consensus implications. It is named as a candidate for NU7, the next major upgrade after Ironwood, but NU7's contents are decided by a coinholder vote and nothing about Tachyon is settled.

Onye dere akwụkwọ ahụ kwuru na nke a bụ atụmatụ nwere ike ime ihe kama ịbụ nyocha, mana ọ chọrọ mbọ injinịa yiri Sapling. A ga-ahapụ ajụjụ ụfọdụ siri ike maka mgbe e mesịrị.

A na-ahụ ọrụ ndị metụtara ya. [Zakura (n'asụsụ Igbo)](https://zechub.wiki/zcash-tech/zakura-node), bụ ọnụ zuru ezu nke ewepụtara na July 2026, bụ mgbalị jikọtara n'etiti Project Tachyon na Valar Group ma hụ ụfọdụ mgbanwe ndị a dị na ntanetị. [Nweta ozi nkeonwe](https://zechub.wiki/zcash-tech/private-information-retrieval) nchọpụta na-elekwasị anya n'otu nkwụsịtụ nyocha site n'akụkụ dị iche.

<br/>

## Ihe ndị mmadụ na-ekwukarị nke bụ́ eziokwu.

- **Tachyon adịghị arụ ọrụ.** Ọ dịghị obere akpa ji ya taa, ọ nweghịkwa nkwalite emegharịrị.
- **Tachyon abụghị otu ihe ahụ dị ka Ironwood.** A na-arụ ọrụ nke ígwè n'ọnwa Julaị 2026 ma jiri ọdọ mmiri Orchard na turnstile. Tachyon bụ atụmatụ ọzọ, mgbe e mesịrị banyere ịba ụba.
- **Tachyon abụghị ihe nzuzo.** Ebumnuche bụ idobe akwụkwọ ndekọ ahụ na-enweghị ike ịkọwapụta ma wepụ ụgwọ ọnụ ọgụgụ, ọ bụghị ịzụ ahịa maka ọsọ.
- ** nkwenye nke zK-SNARK abụghị ihe mgbochi.** Nkwupụta ahụ doro anya na akụkụ dị nwayọ bụ etu obere akpa si achọpụta ma hazie steeti, ọ bụghị ụgwọ ịlele akwụkwọ.
- **"A na-elekwasị anya na NU7" abụghị nkwa.** Ihe a ga-etinye n'ime NU7 bụ mkpebi site na ịtụ vootu.

<br/>

## Akwụkwọ ọkọwa okwu

Okwu. Ihe ọ pụtara.
|---|---|
◯ Nnyocha nkewapụta. ▪ Ịgbalị ịwepụ ihe ndị ahụ e dere ede otu n'otu iji chọta ndị a gwara gị okwu ha.
 Nhazi nzuzo nke bandị. Ịdebe ihe omimi ịkwụ ụgwọ n'ime azụmahịa ahụ na blockchain, dịka Zcash si eme taa.
◯ Nkwụ ụgwọ na-abụghị nke bandị. Ịgafe nkọwa ịkwụ ụgwọ kpọmkwem n'etiti onye zitere ya na onye natara ya kama ịga site na agbụ ígwè ahụ.
◯ Oblivious synchronization. Ịnweta data nke usoro ihe eji eme ego na-achọ n'ekwughị ozi a rịọrọ ya.
DATA nke na-ebu ihe akaebe (PCD) Data nke na -agagharị n'ihe akaebe maka izi ezi ya, ka enwere ike ijikọ ma jikọta ihe aka ebe a.
◯ Nchịkọta azụmahịa echekwara echebe. Ụzọ Tachyon si ejikọta mgbanwe ọnọdụ e chebere, na-agbanwe ụzọ ha si ekwurịta okwu ma bịanye aka n'akwụkwọ.
◯ akwụkwọ ndekọ enweghị ike ịmata ọdịiche. Ihe onwunwe nke kpuchiri azụmahịa apụghị ịkọwa n'etiti ibe ya.

<br/>

## Ajụjụ ndị a na-ajụkarị

** Nke a ga-eme ka obere akpa m mekọrịta ngwa ngwa?** Ọ bụ ihe mgbaru ọsọ ahụ. Oge syncing ga - agbaso ọrụ nke gị kama ịdị ukwuu nke yinye. Enweghị ihe ọ bụla ebuputara, yabụ enweghị ọnụ ọgụgụ elele iji kwupụta ma.

Achọrọ m ime ihe ọ bụla ugbu a? Mba. Tachyon bụ atụmatụ, ma ọ bụrụ na e nakweere ya, ọ ga-abata site n'ịkwalite netwọkụ yana ọkwa nkịtị.

** Iwepu igodo nlele pụtara ịhapụ ike ikesa ohere ịgụ?** Nkwupụta ahụ na-ebute ikike ahụ site na isi usoro iwu ma banye na akpa ego. Ihe nke a yiri ka ọ bụ otu ajụjụ ndị mepere emepe.

** Ego m nọ n'ihe ize ndụ ma ọ bụrụ na ụgbọ mmiri Tachyon?** Ntinye ga-eji nkwalite Orchard ma ọ bụ turnicle, ha abụọ ka e mere iji mee ka uru ahụ gaa n'okpuru iwu ndekọ ego ọha. Peeji Ironwood kọwara otú otu turnstile si arụ ọrụ.

<br/>

## Peeji ndị metụtara ya

- [Ịchọta Ozi nke Onwe Onye](https://zechub.wiki/zcash-tech/private-information-retrieval) - ụzọ ọzọ maka otu obere akpa nyocha windo.
- [Zakura Node (Nọmba nke Zaku)](https://zechub.wiki/zcash-tech/zakura-node) - otu ọnụ wuru akụkụ nke Tachyon si engineering mgbalị
- [Osisi ígwè](https://zechub.wiki/zcash-tech/ironwood) - nkwalite nke arụ ọrụ na July 2026, a na-ejikarị ya eme ihe Tachyon.
- [Ihe A Na-akpọ Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - usoro Tachyon nwere ike iji ma ọ bụrụ na etinyere ya dị ka ọdọ mmiri nke aka ya.
- [Nchebe Mgbe E Mechara Ihe Ndị Dị n'Eluigwe na Ala](https://zechub.wiki/zcash-tech/post-quantum-security) - ebe Tachyon na-anọdụ n'akụkụ ọrụ usoro iheomume ogologo oge.
- [Otú E Si Hazie Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - onye na-arụ ọrụ a nakwa otú usoro okike si adaba n'otu.

<br/>

## Akụnụba

- [Tachyon: Ịgbasa Zcash na Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Eprel 2025, ihe mbụ e kwuru na ya bụ akwụkwọ.
- [Ịrụ Ọrụ n'Ebe Dị Anya](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, nkwekọrịta na usoro iwu metụtara ya, edere maka ndị mmepe protocol.
- [Blọọgụ Sean Bowe](https://seanbowe.com/blog/) - ebe a na-ebipụta usoro Tachyon
- [tachyon.z.cash (ego)](https://tachyon.z.cash/) - ebe a na-arụ ọrụ ahụ.
