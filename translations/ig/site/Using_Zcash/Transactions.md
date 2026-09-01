<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ihe ndị e mere eme

ZEC bụ akụ dijitalụ eji eme ihe maka ịkwụ ụgwọ, na-enye atụmatụ nzuzo siri ike nke mere ka ọ dị mma maka azụmahịa dị iche iche dịka ịkwụ ndị enyi gị ego, ịzụta ma ọ bụ inye onyinye. Iji bulie nchekwa na nchebe kachasị elu, ọ dị mkpa ịghọta etu ụdị azụmahịa si arụ ọrụ n'ime Zcash .

## TL;DR

- Zcash na-akwado ụdị azụmahịa abụọ: **shielded**, nke na-eme ka nkọwa ndị ahụ bụrụ ihe nzuzo, yana **transparent**, bụ nke edekọ ha n'ihu ọha.
- Adreesị echedoro na-amalite site na: `u` or `z`. Adreesị ndị na-enweghị ihe ọ bụla malitere site na: `t` na-akpa àgwà dị ka adreesị Bitcoin.
- Nhọrọ bụ nke gị na ugwo ọ bụla. Nzuzo bu nhọrọ Zcash nyere gi, obughi ihe onye ozo kpebiri maka gi.
- Iwepụ ego na mgbanwe bụ ebe ndị mmadụ kachasị atụfu nzuzo. Ọ bụrụ na mgbanwe ahụ kwadoro naanị iwepu ihe doro anya, chebe onwe gị ozugbo ha rutere.
- Ụgwọ ndị ọzọ na-esochi ya. [ZIP 317 (Ụlọ ọrụ na-ede akwụkwọ)](https://zips.z.cash/zip-0317) na-etolite site n'ogo nke azụmahịa ahụ. Wallets ka na-eziga ụgwọ ochie nwere ike ịhụ azụmaahịa ha egbu oge.
- Ọtụtụ azụmahịa Zcash nwere oge mmebi n'okpuru afọ iri na ise. [ZIP 203 Ụlọ ọrụ](https://zips.z.cash/zip-0203)Ọ bụrụ na azụmahịa ga-agwụ tupu a gwuru ya, ọ gaghị enwe ike ikwenye mgbe oge ahụ agwụla ma nwee ike izipu ọzọ.

## Azụmahịa Ndị E Chebere

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

---

A na-eme azụmahịa echekwara mgbe ị kpaliri ZEC n'ime akpa ego gị. Adreesị obere akpa ego echedoro amalite site na a `u` or `z`. When sending shielded transactions, you and the people you transact with can keep a level of privacy not possible on public-by-default payment networks.

Sending a shielded transaction is easiest when you use a wallet that supports the current Zcash network and current shielded pools. Before relying on a wallet for privacy, check whether it supports shielded sending, shielded receiving, and the pool you plan to use. When withdrawing ZEC from an exchange, check whether the exchange supports shielded or transparent withdrawals. If it only supports transparent withdrawals, move the funds into a shielded-capable wallet after they arrive.

Iji azụmahịa echekwara iji zipu ma nata ego bụ ụzọ kachasị mma isi chekwaa nzuzo na ibelata ihe ize ndụ nke ịkwụ ụgwọ data.

## Mmekọrịta Na-egosi Ihe Dị Iche

Transparent transactions work similarly to Bitcoin transactions. Transaction details are publicly visible on the blockchain, including transparent addresses and transparent values. Transparent transactions should be avoided when privacy is a priority.

Adreesị ndị na-enweghị ihe ọ bụla ka bara uru n'ọnọdụ ụfọdụ, karịsịa mgbe mgbanwe ma ọ bụ ọrụ anaghị akwado adreesị echekwara. Ọ bụrụ na ị nweta ZEC gaa na adreesì doro anya, tụlee ichebe ya tupu ịme ụgwọ ọzọ.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

## Otú Dị Mfe Isi Chebara Ya Echiche

A transparent transaction is a postcard. The postman delivers it, but anyone who handles it along the way can read the message, see who sent it and see who receives it.

Mgbasa ozi a na-echebe bụ envelopu e mechiri emechi. Ọrụ nzipu ozi ka kwenyere na ezigbo akwụkwọ ozi nwere ezi posta gafere usoro ahụ, ọ dịghịkwa onye nwere ike ịgha ụgha ma ọ bụ zipụ otu leta ugboro abụọ. Ihe dị n'ime envelopụ nọgidere n'etiti onye zitere ya na onye natara ya.

Ihe dị mkpa bụ na Zcash ga-eme ka ị kpebie nke i kwesịrị iziga, kwụọ ụgwọ ọ bụla.

## Ụgwọ Zcash

Zcash anaghị eji otu gas nke Ethereum. A na-akwụ ụgwọ azụmahịa zcash na ZEC, a na-atụkarị ya **zatoshis** Otu ZEC hà 100,000,000 zatoshi .

[ZIP 317 (Ụlọ ọrụ na-ede akwụkwọ)](https://zips.z.cash/zip-0317) defines a conventional fee mechanism that scales with transaction complexity. Instead of every transaction using the old 1,000-zatoshi flat fee, the conventional fee is based on "logical actions" such as inputs, outputs, and shielded actions. Simple transactions commonly start around 10,000 zatoshis, or 0.0001 ZEC, and more complex transactions can require more.

N'ọtụtụ obere akpa ugbu a, ndị ọrụ ekwesịghị iji aka ha gbakọọ ụgwọ ZIP 317. Wallet kwesịrị ịhọrọ ego dabara adaba na akpaghị aka. Ọ bụrụ na obere akpa ka na-eji ọnụego ochie ma ọ bụ hapụ gị ịtọ ego dị ala karịa ụgwọ ọdịnala nke ZIP 31, azụmahịa ahụ nwere ike igbu oge, deprioritized, tụfuru ụfọdụ nodes, ma ọ bụkwanụ ghara ịgbanye ya n'ụzọ ziri ezi.

## Idozi nsogbu na azụmahịa ndị a kwụsịrị .

A Zcash transaction is not final just because it appears in your wallet. It becomes final for ordinary use after it is mined into a block and receives enough confirmations for your situation. Exchanges and services may require more confirmations than a wallet shows by default.

Jiri osisi mkpebi a tupu ị zipụ ọzọ:

1. ** Ọ̀ bụ na akpa gị egosighi ID azụmahịa?**
   - Ọ bụrụ na ọ bụghị, obere akpa ahụ nwere ike ghara ịmepụta maọbụ gbasaa azụmahịa. Lelee ọnọdụ mmekọrịta, njikọ ịntanetị, ụdị nke wallet, yana ozi njehie ọ bụla.
   - Ọ bụrụ ee, detuo ID azụmahịa ma gaa n'ihu.
2. **Ejiri azụmahịa ahụ kwadoro na ngọngọ?**
   - Ọ bụrụ na ọ bụ, chere ka ego ole obere akpa gị chọrọ ma ọ bụkwanụ ndị ahịa ha.
   - Ọ bụrụ na ọ bụghị, nọgide.
3. **Ndozi ahụ ọ ruru ogo ya?**
   - Ọ bụrụ na ọ bụghị, ejila aka gị zipụ otu ụgwọ ahụ. Mmekọrịta mbụ nwere ike ikwenye ya.
   - Ọ bụrụ ee, azụmahịa ahụ enweghị ike igwu ala mgbe oge a gwụchara. obere akpa gị nwere ike ịde ya dị ka ihe ga-eme ma ọ bụ na-emezughị, yana ịnwere ike ịmepụta azụmahịa ọhụrụ.
4. **Nkwekọrịta ahụ ọ na-apụta n'otu sava maọbụ onye nchọpụta mana ọbụghị nke ọzọ?**
   - Na-emeso nke a dịka nsogbu visibiliti netwọk, ọ bụghị ihe akaebe na azụmahịa ahụ dara. Ụkwụ dị iche iche nwere ike inwe echiche mempool dịgasị iche.
   - Chere, mezie akpa ego gị ọzọ ma ọ bụ gbanwee gaa na sava a tụkwasịrị obi ọzọ maọbụrụ na obere akpa gị kwadoro nke ahụ.
5. **Ndozi ahụ ọ na-apụ n'anya mgbe o gosipụtara nkwenye?**
   - Nhazi nhazi nke obere oge nwere ike wepu azụmahịa site na usoro kachasị mma.
   - Chere maka ihe ndị ọzọ. Ọ bụrụ na azụmahịa ahụ laghachite, nọgide na-echere nkwenye. Ọ bụ ezie na ọ naghị alọghachi ma mechaa gwụ, mepụta azụmahịa ọhụrụ.
6. ** Ọ bụ obere akpa ahụ na-arịọ gị ka ị zipụ ọzọ?**
   - Soro ntuziaka nke obere akpa ahụ naanị mgbe ị nyochachara na azụmahịa gara aga agwụla, daa ma ọ bụ gharazie ịdị irè.
   - Ọ bụrụ na ị maghị, rịọ nkwado tupu izipu ọzọ.

## Pending, Expired, Dropped, and Reorged

- ** Na-echere** pụtara na e mepụtara ma ọ bụ gbasaa azụmahịa ahụ mana a kaghị ya n'ime ngọngọ.
- **Expired** pụtara na azụmahịa ahụ agwụla. N'okpuru ZIP 203, a gaghị enwe ike igwu ihe ọ bụla mgbe oge gwụchara ma e mechaa ya.
- **Akwụsịla** pụtara otu ma ọ bụ karịa ọnụ anaghịzi edebe azụmahịa ahụ na mempool ha. Nke a nwere ike ime n'ihi oge mmebi, ụgwọ dị ala, iwu nke mempool, ịmaliteghachi omume, ma ọ bụkwanụ ọdịiche relay .
- ** Reorged** pụtara na ngọngọ nke nwere azụmahịa ahụ abụghịzi akụkụ kachasị mma. Enwere ike ịchụpụ azụmaahịa ọzọ ma ọ bụ nwee ike ịlaghachi n'echere ya ma ọ bụrụ na ọ ka dị irè.

## Mgbe Ị Na-ekwesịghị Inyefe Ọzọ

Ejila ngwa ahụ zipụ ọzọ naanị n'ihi na azụmahịa a ka dị, nwayọ ma ọ bụ furu efu site na otu onye nyocha. Ịgagharị oge nwere ike ibute mgbagwoju anya yana, dabere etu obere akpa si ewulite ụgwọ ọhụrụ, enwere ike ịkwụ ụgwọ ugboro abụọ.

Chere ma ọ bụ nweta nkwado mbụ mgbe:

- Mmekọrịta ahụ nwere ID azụmahịa ma ọ bụghị ihe emebibeghị.
- Otu onye nkesa na-egosi ya ebe nke ọzọ anaghị egosi.
- E gwuru ya na nso a mana enweghi nkwenye mgbe enwere ike ịhazigharị.
- Ọrụ na-anata ihe emebeghị ka ọnụ ọgụgụ nkwenye.
- Akpa ego gị ka na-emekọrịta.

Ọ na-abụkarị ihe dị mma iji zipụ ọzọ naanị mgbe obere akpa ahụ gosipụtara azụmahịa dịka nke gafere ma ọ bụ daa, maọbụ mgbe nkwado kwadoro na azụmaahịa mbụ enweghị ike ikwenye.

## Nnyocha Ndị Na-echekwa Nzuzo nke Onwe Gị

Ị nwere ike ịlele ọnọdụ azụmahịa nke ọma n'ekpughereghị ozi karịa mkpa:

- Lelee ma ọ bụrụ na akpa gị zuru oke.
- Lelee ma ngwa akpa ego ahụ ọ dị ọhụrụ.
- Lelee ma azụmahịa ahụ nwere ID nke azụmahịa.
- Lelee ma azụmahịa ahụ ọ kwadoro, na-echere ya, gwụchara, ma ọ bụ daa.
- Lelee elu nke ugbu a ma jiri ya tụnyere njedebe azụmahịa ahụ ọ bụrụ na obere akpa gị gosipụtara ya.
- Maka azụmahịa ndị doro anya, onye na-enyocha ngọngọ nwere ike igosi azụmahịa ọha mmadụ, adreesị, ụkpụrụ, na nkwenye.
- Maka azụmahịa echekwara, onye nyocha ngọngọ nwere ike igosi na azụmahịa dị adị, mana ọ nweghị ike igosipụta ndị zigara ya, nnata, ego ma ọ bụ nkọwa memo.

## Ihe Ị Na-ekwesịghị Ikwu n'Ihu Ọha

Ejila nke a na nkata ọha, mgbasa ozi mmekọrịta ma ọ bụ ihe nchọgharị:

- Mkpụrụ okwu ma ọ bụ mgbake nkebi ahịrịokwu
- Igodo mmefu, igodo nzuzo ma ọ bụ nchekwa ego.
- Igodo nlele zuru ezu
- Ihe onyonyo na-egosi ego, adreesị zuru ezu, memo, koodu QR ma ọ bụ nkọwa akaụntụ mgbanwe.
- Akwụkwọ njirimara nke onwe ma ọ bụ ndekọ ego nloghachi akaụntụ

A transaction ID is public on the chain, but it can still connect your support question to your identity. If privacy matters, share it only with a trusted support channel.

## Ihe Ndị Na-enyere Òtù Enyemaka Aka Chọrọ

Mgbe ị na-arịọ obere akpa, mgbanwe ma ọ bụ nkwado ọrụ maka enyemaka, kesaa naanị ozi bara uru kachasị:

- Aha obere akpa ma ọ bụ ọrụ ahụ.
- Ụdị ngwa na sistemụ arụmọrụ
- Ma azụmahịa ahụ ọ bụ ihe echekwara, na-ekpuchi ma ọ bụ n'etiti adreesị ezoro ezo na nke doro anya.
- NJ azụmahịa, ma ọ bụrụ na ị nwere ntụsara ahụ ịkọrọ ya.
- Oge ezipụ oge dị nso.
- Ma ọ bụ na akpa ego ahụ zuru oke synced
- Ọnọdụ dị ugbu a nke obere akpa ahụ gosipụtara
- Ozi njehie ziri ezi, na data nzuzo ewepụrụ
- Ntinye ihuenyo na nguzozi, adreesị, memos, na nkọwa akaụntụ zoro ezo

Ndị otu nkwado anaghị achọ mkpụrụ okwu gị, igodo mmefu ego, igodi nzuzo ma ọ bụ igodo nlele zuru ezu.

## Ihe Ndị A Na-emekarịhie Emeghị

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Akpa ego](https://zechub.wiki/using-zcash/wallets) peeji na-edepụta nke a maka nhọrọ ọ bụla.
- **Iwepụ ego na adreesị doro anya ma hapụ ego ahụ n'ebe ahụ.** Mwepu onwe ya bụ ọha, yana mmegharị ọ bụla sitere na adiresi a ga-anọgide bụrụ nke ọha. Chekwaa ego ozugbo ha rutere.
- **Idozi nzuzo dịka ihe ị na-agbanye otu ugboro.** Mgbasa ozi ọ bụla bụ nhọrọ dị iche. Izipu echedoro taa anaghị eme ka ụgwọ akwụghị ụgwọ nke i mere n'izu gara aga ghara ịdị irè.
- **Itinye adreesị doro anya maka ihe niile.** Ebe ọ bụ na a ga-ahụ ọrụ nke ọma, otu adres e ji eme ihe ọzọ na-ejikọta ego ndị ahụ n'ụzọ dị nwayọọ.
- ** Izipu na ụgwọ ndabara ochie.** Wallets ndị ejighi ZIP 317 nwere ike iziga ego nkwụghachi azụ nke okenye, nke nwere ike ịhapụ azụmahịa n'enweghi mmesi obi ike.
- ** Ịghachite tupu oge agwụ.** Mmekọrịta a na-echere ka nwere ike ikwenye ruo mgbe ọ gwụchara. Lelee ọnọdụ ngwụsị tupu ịmepụta ụgwọ ọzọ.

## Ihe edeturu

Biko rịba ama na ụzọ kachasị nchebe iji ZEC bụ site n'iji azụmahịa echekwara mgbe ọ bụla onye zitere, nnata, obere akpa ego, na ọrụ niile kwadoro ha. Ụfọdụ wallets na mgbanwe nkwado [adreesị ndị dị n'otu](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,n'ime%20the%20broader%20Zcash%20ecosystem.), nke nwere ike ikpokọta ọtụtụ ụdị ndị na-anata Zcash n'otu adreesị.

## Akụnụba

- [ZIP 203: Mmebi nke azụmahịa ahụ.](https://zips.z.cash/zip-0203)
- [ZIP 317: Usoro Ụgwọ Ntinye Aka nke Mpaghara.](https://zips.z.cash/zip-0317)
- [Zcash Zips (ZIP ndị a na-akwụ ụgwọ)](https://zips.z.cash/)

## Peeji ndị metụtara ya

- [Akpa ego](/using-zcash/wallets) - nke wallets akwado shielded eziga, na ndị bụ naanị uzo
- [Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](/using-zcash/shielded-pools) - Sapling na Orchard, ọdọ mmiri gị echekwara ego bi n'ime
- [Ihe ncheta](/using-zcash/memos) - ozi ezoro ezo nke nwere ike ịga njem na azụmahịa echekwara.
- [Adreesị Mgbanwe Mgbapụta nke Na-enweghị Ihe Ọghọm](/using-zcash/transparent-exchange-addresses) - Adreesị TEX na ihe kpatara mgbanwe ji eji ha eme ihe
- [Mgbanwe Ndị Nchebe](/using-zcash/custodial-exchanges) - nke mgbanwe na-akwado ekpuchi withdrawals

## ZEC ka onye ntụgharị nke ZAT
