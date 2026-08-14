<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Osisi ígwè

> Ironwood na-arụ ọrụ na Zcash mainnet na ngọngọ 3,428,143, nke a tụrụ anya gburugburu July 28, 2026 UTC.

Ihe ị ga-ewepụ: ihe Ironwood gbanwere, gịnị mere ahụhụ dị na ego zoro ezo ji bụrụ nke siri ike, nakwa etu turnstile si eme ka onye ọ bụla kwenye na e meghị ZEC.

Ironwood bụ Zcash. [nkwalite netwọkụ.](../start-here/network-upgrades), nke a na-akpọ NU6.3, bụ ebe e debere ọdọ mmiri ọhụrụ nwere otu aha ahụ. A [ọdọ mmiri e chebere echebe.](../using-zcash/shielded-pools) bụ nchịkọta ego nke ọnụ ọgụgụ na ndị nwe ya zoro ezo site n'aka onye ọrụ. [ihe nzuzo na-enweghị isi.](../zcash-tech/zk-snarks)Ironwood dị iji gbochie ma nyochaa ihe mgbochi ahụike achọtara na ọdọ mmiri echedoro Orchard ugbu a, yana inye obodo ụzọ siri ike karị inyocha na ngụkọta nke ZEC bụ eziokwu. A kọwapụtara iwu nkwekọrịta ya n'ime [ZIP 258  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0258).

Why this matters. With transparent money like Bitcoin, anyone can check that no coins were forged by reading the public ledger. Shielded money hides the amounts, so you cannot just look. Instead the cryptography itself has to guarantee that no one can create money in secret. Ironwood matters because a bug was found in that guarantee for the Orchard pool. The upgrade closes the gap and gives anyone a way to confirm that the total supply of ZEC is still honest.

Ọhụrụ na Zcash? Bido site n'ịmalite. [Gịnị bụ ZEC na Zcash?](../start-here/what-is-zec-and-zcash) na nke a: [Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools), mgbe ahụ, laghachi ebe a.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Ihe Mere Osisi Ironwood Ji Dị Mkpa

Na ngwụcha ọnwa Mee 2026, onye nyocha nchekwa onwe ya Taylor Hornby, n'oge nyochaa usoro maka [Ụlọ nyocha echekwara](../zcash-organizations/shielded-labs), responsibly disclosed a soundness bug in the Orchard shielded pool. Orchard was Zcash's newest shielded pool at the time, and the flaw sat in an elliptic-curve part of its zero-knowledge circuit, which uses the [Halo (ụtụtụ ọma)](../zcash-tech/halo) 2 na-egosi usoro.

1. Ihe na-egosi na azụmahịa bụ nke ziri ezi abụghị ihe ga-eme ka o doo anya.
2. Na usoro iwu, onye na-awakpo nwere ike iji ntụpọ ahụ mepụta uru adịghị mma n'ime ọdọ mmiri Orchard ma jiri ego ndị na - abụghị nke ha mee ihe, hapụ enweghị akara ọ bụla node nkịtị ga - ejide.
3. Zcash's turnstile ka na-emebi ego ole uru nwere ike ịhapụ Orchard, yabụ enweghị ike ịgbagha ngụkọta ahụ, mana cryptography nke ọdọ mmiri anaghịzi ekwe nkwa na mkpụrụ ego ọ bụla zoro ezo n'ime ya bụ ezigbo.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

The numbers above are a simplified picture. The real flaw was in a specific piece of the circuit's math, not a literal count of coins going in and out. The point to take away is only that a soundness bug can let value be created inside the pool without detection.

Importantly, there is no evidence the bug was ever exploited, no evidence of impact to user funds, and no evidence that the total supply of ZEC changed. It was found through security research and fixed before any known harm.

## Ihe Ndị Mmadụ Mere Mgbe A Chọrọ Ya

Ndị obodo Zcash zigara ndozi na nkebi kama ịbụ otu oge.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activates around July 28, 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Na mbido June 2026, ihe na-adịru nwa oge gbanyụrụ ọdọ mmiri Orchard ka a kwadebere idozi ya.
2. Nwelite NU6.2 doziri usoro Orchard n'onwe ya, na-emechi nsogbu ahụ dị mkpa.
3. Nwelite NU6.3, Ironwood, na-ewebata ọdọ mmiri ọhụrụ a kpuchiri ekpuchi yana ebe nlele ọha ka uru ahụ wee pụọ na olulu ochie Orchard n'okpuru nyocha zuru oke.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ihe ọdọ mmiri Ironwood na-eme

NU6.2 nwetara usoro Orchard maka azụmahịa ọhụrụ niile, mana uru e mepụtara n'okpuru iwu ochie ka na-anọdụ na ọdọ mmiri nke Orchard. Ironwood nyere uru ahụ ebe dị ọcha yana ụzọ iji nyochaa ya mgbe ọ na-agagharị.

The Ironwood pool is a new shielded value pool created when NU6.3 activates. It is built on the corrected circuit and uses a quantum-recoverable note format (a design that lets funds be recovered if [kọmputa quantum](../zcash-tech/post-quantum-security) mgbe ọ bụla mebie cryptography nke taa), akọwapụtara na [ZIP 2005 Ihe ndị dị na peeji nke 3](https://zips.z.cash/zip-2005).

1. Mgbe arụ ọrụ, ọdọ mmiri ochie Orchard na-aghọ naanị mmefu ego, yabụ enweghị uru ọhụụ nwere ike ịbanye n'ime ya.
2. Uru ọhụrụ a na-echebe gafere n'ime Ironwood kama.
3. ZEC echekwara na-echekwa otu ihe ahụ siri ike nke nzuzo dị ka onye zitere, nnata, na ego.

## Ihe na-eme ka ọ dị mma.

Echiche bụ isi dị na Ironwood bụ turnstile, ebe a ga-enyocha ego nke mkpụrụ ego ọ bụla aghaghị ịgafe mgbe ha si n'ọdọ mmiri ochie Orchard banye Ironwood.

> Ọ bụrụ na e jiri ọnụ ụzọ dị n'ime ụlọ akụ̀ mee ihe, ọ ga-eme ka ego ndị zoro ezo dịrị otú ha si adịrị. Ị gaghị ahụcha ebe ha nọ ma ị ga-enwe ike ịgụ kpọmkwem ihe niile batara n'ụlọ akụ̀ nakwa nke pụrụ isi na ya pụta.

1. A na-agụta ego ndị si n'Orchard pụọ n'ebe ọha mmadụ ga-enyocha tupu ha abanye Ironwood.
2. Nke a na-enye onye ọ bụla ohere inyocha etu ZEC si akwaga, na-ewusi ntụkwasị obi n'ezi ọkọnọ.
3. Ọ bụrụ na e mepụtala ZEC adịgboroja site n'ihe ahụ mere tupu mgbe a, ọ bụ ebe a ka ha ga-apụta.

Turnstiles are not new to Zcash. The network has used them before, at the boundaries between the Sprout, Sapling, and Orchard pools, so that value moving between pools stays auditable and no pool can release more than legitimately entered it.

Iwu nkwekọrịta na-eme ka ego ọ bụla bara uru, gụnyere Ironwood, n'ime oke ego kachasị nke netwọkụ ahụ. Ya mere nguzozi ọdọ mmiri enweghị ike ịbaghị uru.

## Ihe ndị ọrụ kwesịrị ime

Wallets and node software handle most of this automatically, but the practical shift is simple: over time, move shielded holdings from the old Orchard pool through the turnstile into the Ironwood pool. Follow the guidance from your wallet provider, and always update to a supported release before the activation block.

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
❖ Ebe a na-edebe ego ndị e zoro ezo. A naghị eji ihe ọ bụla amata onye nwe ha ma ọ bụ otú o si dịrị ya.
◯ Nrụpụta nke ezi uche. Njehie na-eme ka azụmahịa adịghị mma gafere nyocha nkwenye dị ka a ga - asị na ọ bụ ezigbo ya.
◯ Turnstile ❑ Ebe a na-enyocha ihe n'ihu ọha nke na-agụpụta ego ndị e bufeere ha ka ọ bụrụzie onye ga-ahụ maka ya.
-Naanị-emefu: A ọdọ mmiri ị nwere ike imefu si, ma enweghị ike tinye ọhụrụ uru na...
◯ Nwelite netwọk (NU) ▸ Mgbanwe a haziri ahazi na iwu nkwekọrịta Zcash, nke arụ ọrụ n'ogo ngọngọ setịpụrụ.
 Quantum-recoverable note. Ụdị akwụkwọ ego e mere ka a na-enweta ego ma ọ bụrụ na kọmputa kọmpụta mebie ihe ndị dị n'akwụkwọ nzuzo taa.

## Ajụjụ ndị a na-ajụkarị

Ọ̀ bụ na ZEC m emetụtaghị ya? Mba. O nweghị ihe akaebe ọ bụla gosiri na e ji nje ahụ mee ihe, o metụtaghị ego ndị ọrụ ha nwere ma ọ bụkwanụ ngụkọta nke ngwá ahịa nile dị n'ụlọ akụ̀.

Do I need to do anything? Keep your wallet and node software updated to a supported release before the activation block. Your wallet moves funds into Ironwood over time as you spend, so there is nothing manual to rush. Follow your wallet provider's guidance.

Is Zcash still private? Yes. Ironwood keeps the same shielded privacy that hides sender, receiver, and amount. This upgrade is about supply integrity, not privacy.

Ọ bụ site na nchọpụta nchekwa, ekpughere ya n'ụzọ dị mkpa ma dozie tupu ọ bụla amara ihe ọjọọ.

Gịnị na-eme ochie Orchard ọdọ mmiri? Ọ ghọrọ emefu naanị. Enweghị ọhụrụ uru nwere ike tinye ya, na ẹdude uru aga Ironwood site turnstile, ebe Mbugharị a n'ihu ọha audited.

## Nwalee nghọta gị .

Ọ bụrụ na ZEC dị n'ime ọdọ mmiri ndị e chebere, olee otú mmadụ pụrụ isi kwado na nje Orchard ahụ emeghị ka ngụkọta nke ihe onwunwe ya buo ibu?

<details>
<summary>Answer</summary>

Site na turnstile. A na-agụta mkpụrụ ego ọ bụla nke si n'ọdọ mmiri ochie Orchard pụta mgbe a ga-enyocha ya ka ọ banye Ironwood ma ọ bụrụ na uru dị ukwuu gbalịrị ịpụ karịa ihe e debere iwu, akwụkwọ ndekọ ahụ agaghị edozi, yabụ aghụghọ ọbụla ahụhụ nwere ike ịmepụta ga-apụta n'ọnụ ụzọ ámá ahụ.
</details>

### Akụnụba

[ZIP 258: Ịmepụta NU6.3 Network Upgrade](https://zips.z.cash/zip-0258)

[ZIP 257: Deployment of the Orchard Temporary Vulnerability Mitigation and NU6.2 Network Upgrade](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability (Igwe eji eme ihe maka igwe na-eme ka mmiri dị n'ime ala)](https://zips.z.cash/zip-2005)

[Ironwood: Ọdọ Mmiri ọhụrụ maka Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Lee kwa nke a.

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)

[Halo (ụtụtụ ọma)](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Nchebe nke Post Quantum](../zcash-tech/post-quantum-security)

[Ụlọ nyocha echekwara](../zcash-organizations/shielded-labs)

[Gịnị bụ ZEC na Zcash?](../start-here/what-is-zec-and-zcash)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [NU6.2](../zcash-tech/nu6-2)
