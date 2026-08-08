<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync (Nke a bụ ihe ọhụrụ)

## TL;DR

* Pepper Sync bụ engine synchronization nke e webatara na Zingo! 2.0, obere akpa ego Zcash mepere emepe wuru site na ụlọ ọrụ Zingo Labs.
* Ọ na-eji usoro nkwekọrịta nke abụghị n'usoro kama inyocha agbụ ahụ site n'ịchịkọta ya, ka ego gị na azụmahịa gị wee pụta ngwa ngwa.
* A na echekwa ọganihu ahụ mgbe niile. Ọ bụrụ njikọ adaala maọbụ ngwa mechie, syncing ga-amaliteghachi site ebe o kwụsịrị kama ịmalitegharịa ya ọzọ.
* Ị nwere ike imefu ego tupu oge agwụ.
* Mmekọrịta echekwara na-anọgide na nzuzo n'oge usoro dum.

## Nkọwa nke isi ihe dị na ya.

Zingo 2.0 bụ ụdị ọhụrụ nke obere akpa ego Zingo! , obere akpa dị mfe, mepere emepe e wuru maka obodo Zcash. Kpakpando nke ntọhapụ a bụ Pepper Sync, nnukwu nkwalite na-echegharị kpamkpam etu wallets si ejikọ ya na blockchain .

In the past, syncing could feel painfully slow, error-prone, and resource-heavy, sometimes forcing users to restart from scratch. Pepper Sync changes all that. It makes syncing faster, smoother, more reliable, and less demanding on your device, while fully preserving the privacy of shielded transactions.

Ma ị bụ onye ọrụ ọhụụ na-anwale Zcash maka oge mbụ, ma ọ bụ otu ndị obodo ogologo oge jikwaa ọtụtụ obere akpa echedoro, Pepper Sync na -eme ka ahụmịhe dịkwuo mma.

### Njirimara ndị dị mkpa nke Pepper Sync

Pepper Sync na-ewebata ọtụtụ ndozi:

- Nkwekọrịta Ngwa - Akpa ego gị dị njikere na nkeji, ọ bụghị awa.
- Nwelite Smart - A na-edozi data n'obere obere, zere nyocha zuru ezu.
- Na-eguzogide nkwụsị - Ọ bụrụ na njikọ gị adaa, mmekọrịta ga-amaliteghachi ebe ọ kwụsịrị.
- Ọ Dị Mfe & Na-arụ Ọrụ nke Ọma - E mere ya maka fon, laptọọpụ na ngwaọrụ ndị ọzọ dị obere.
- Nkwupụta doro anya - Oge mmelite ọganihu oge na-ebelata mgbagwoju anya.
- Nzuzo-Idebe - Azụmahịa echekwara na nzuzo n'oge niile.

### Ihe dị mma karịa na mbụ.

Ụdị ochie nke Zingo na-emekarị ka ndị ọrụ nwee nkụda mmụọ site n'ogologo oge syncing, njikwa njehie doro anya, na iji ihe onwunwe dị arọ. Pepper Sync edozi nsogbu ndị a:

Njirimara: Zingo gara aga nsụgharị. Zingo 2.0 na Pepper Sync.
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Sync Speed         | Slower, especially on first setup      | Much faster initial and ongoing sync         |
◯ Nchịkwa njehie ❖ Ịkwụsị ọrụ mgbe ụfọdụ na ọdịda ndị a na-akọwaghị nke ọma ❑ Mma nkwụsi ike site n'ịrụpụta mgbake akpaaka ▸ Ọdịmma dị mma maka usoro ihe omume gị ❏ Nchekwa onwe onye: Ihe niile ga - adị ka ọ bụrụ na ị nọ ebe ahụ.
◯ Ahụmahụ onye ọrụ. Sync chere "opaque" nye ndị bịara ọhụrụ. Transparent, na ọnọdụ doro anya karị na mmelite.
❑ Ọrụ Ngwaọrụ ◆ Ọdịda CPU/ebe nchekwa dị elu □ Ịhazi maka iji ihe onwunwe eme ihe n'ụzọ na-enweghị nsogbu ● Nrụpụta nke ngwa ọrụ ▪ Njikọ aka ndị ọzọ: Jiri usoro a mee ihe.

Na nkenke: ịmekọrịta ugbu a dị ngwa, ntụkwasị obi karị ma dịkwa mfe nghọta.

## Ihe Anya / Ntụle

Chee echiche banyere otu obere akpa ochie dị ka ịgụ akwụkwọ buru ibu site na peeji nke mbụ, n'olu dara ụda, tupu e kwe gị ikwu ihe ọ bụla gbasara ya. Kwụsị etiti ụzọ, ma ị maliteghachi ọzọ site na ibe mbụ Pepper Sync gụrụ otu akwụkwọ ahụ, mana o debere akara ngosi, gụọ isiakwụkwọ ndị kachasị mkpa nye gị, wee hapụ gị ka ị kwuo maka akụkọ a tupu i mechaa peeji ikpeazụ.

Ihe edeturu bụ akụkụ dị mkpa. Ọ bụla mbipute gara aga na-emeso mmekọrịta a kwụsịrị dịka ọrụ furu efu; Pepper Sync na-eme ya ka ọ bụrụ nkwụsịtụ.

### Ihe ndị na-egosi ihe nkiri

- Nkọwa zuru ezu - Na-egosi usoro dum. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Mfe Flow - Nlele ngwa maka ndị ọrụ kwa ụbọchị. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Ịbanye n'Okpuru Mmiri Dị Omimi

### Olee otú Pepper Sync si arụ ọrụ (nlele dị mfe)

Kama inyocha ihe nkesa ahụ n'ọtụtụ nnukwu, nke na-adịghị mma, Pepper Sync na-arụ ọrụ obere oge. Ọ ga-echekwa ebe gị mgbe niile ka ọ na-aga.

1. Jikọọ - Akpa ego na-enyocha n'ime netwọkụ.
2. Bịaruo Blocks - A na-ebudata data n'ụzọ dị elu.
3. Nyochaa - A na-enyocha azụmahịa.
4. Jikwaa Ihe Ndetu E Chebere - Nzuzo echekwara n'oge niile.
5. Melite Balances - Akpa ego na-eme ka nchekwa dị ọhụrụ.
6. Chekwaa Ọganihu - Kwụsị ma maliteghachi n'enweghị nsogbu.
7. Emechara - Wallet dị njikere maka azụmahịa.

## Ihe Ndị A Pụrụ Ime n'Ọrụ Ahụ

### Ole ndị na-erite uru site n'aka Pepper Sync?

- Ndị ọrụ ọhụrụ - Nwere ike ịtọlite obere akpa ngwa ngwa na-enweghị nkụda mmụọ site na igbu oge.
- Ndị na-eji kwa ụbọchị - Nkwekọrịta a pụrụ ịdabere na ya na-eme ka ịkwụ ụgwọ echekwara dị irè maka iji kwa ụbọchị.
- Ndị mmepe & ndị nyocha - Oge mkpirisi oge sync pụtara usoro nnwale ngwa ngwa.
- Ngwaọrụ Mobile & Light - Zingo na-agba ọsọ ugbu a ọbụna n'ụzọ dị irè na ngwaike nwere oke ego.

### Ihe mere o ji dị mkpa maka Zcash

Zcash wuru gburugburu azụmahịa echekwara, otu n'ime ihe kachasị ike na nzuzo nke cryptocurrency. Ma nzuzo bara uru naanị ma ọ bụrụ na enwere ya.

Pepper Sync na-enyere aka site:

- Ibelata ihe mgbochi ịbanye - Ndị ọrụ ọhụrụ nwere ike ịmalite ngwa ngwa.
- Na-akwado ojiji kwa ụbọchị - Adreesị echedoro na-adị mfe ịtụkwasị obi.
- Ịgba ume uto nke usoro okike - Ahụmịhe obere akpa ka mma na-eme ka nnabata, ngwa ọdịnala, yana ọrụ.

Site na imeziwanye ahụmịhe obere akpa, Pepper Sync na-ewusi usoro okike Zcash dum ike.

### Ịmalite: ịbanye na Zingo 2.0

1. Budata obere akpa - Nweta ụdị ziri ezi site na [Zingo GitHub releases page]](https://github.com/zingolabs/zingolib)
2. Tọọ obere akpa gị - Mepụta nke ọhụrụ ma ọ bụ weghachite site na mkpụrụ okwu dị. [Zingo 2.0 with Zingo Labs]](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Ka Pepper Sync Run - Lelee ihe ngosi ọganihu ka obere akpa gị na-emelite. [Pepper Synch Run]](https://x.com/ZingoLabs/status/1961871338441724191)
4. Bido Iji Zcash - Na-ezipụ ma na-anata ZEC echedoro ozugbo syncing zuru ezu.
5. Na-enwe obi iru ala banyere nkwụsị - Ọ bụrụ na ngwa ahụ mechie ma ọ bụ njikọ adaba, Pepper Sync ga-amaliteghachi akpaghị aka.

## Ihe Ndị A Na-emekarịhie Emeghị

** Ịgwọ Pepper Sync dị ka obere akpa n'onwe ya.** Pepper sync bụ engine nke na-emekọrịta ihe n'ime Zingo! wallet, ọ bụghị ngwa dị iche.Ị wụnye Zingo; Peppersync bụ ihe na -agba ọsọ n'okpuru ya.

** Iche na ngwa syncing pụtara nzuzo dị ala.** Ọsọ ahụ sitere n'otú e si enweta data, nyere iwu ma debe ya, ọ bụghị site n'ikpughe ozi ndị ọzọ. Azụmahịa echedoro ga-anọgide na nzuzo niile.

** Iche na ị ga-enwerịrị mmekọrịta zuru oke tupu i nwee ike imefu**. Imefu ego tupu imekọrịta emechaa bụ otu n'ime isi ihe dị iche iche nke Pepper Sync, yabụ ịkwesighi ichere ka obere akpa ahụ rute njedebe agbụ.

## Ajụjụ Ndị A Na-ajụkarị - Ọtụtụ mgbe jụrụ ajụjụ.

Ajụjụ: M ga-eme nyocha ọzọ oge ọ bụla m mepere obere akpa ahụ?

A: Mba. Pepper Sync na-echekwa ọganihu, yabụ ị ga - emelite naanị site n'oge ikpeazụ.

**Q: Gịnị ga-eme ma ọ bụrụ na ịntanetị m agbapụ?**

A: Sync na-akwụsị ma gaa n'ihu mgbe e mesịrị na -enweghị ịmalitegharịa.

** Ajụjụ: Ọ bụ na nzuzo m dị mma mgbe ịmekọrịta?**

Azịza: Ee. azụmahịa ndị e chebere na-anọgide bụrụ ihe nzuzo kpamkpam.

**Q: Ogologo oge ole ka sync mbụ na-ewe?**

Azịza: Ọ na-abụkarị nkeji ole na ole kama ịbụ awa ole, dabere n'ụdị ngwaọrụ ị ji ma ọ bụ ihe Ịntanet gị.

** Q: Enwere m ike iji obere akpa tupu syncing agwụ?**

A: Ee. Pepper Sync na-akwado mmefu tupu mmekọrịta ahụ emechaa, yabụ ịkwesighi ichere ka obere akpa ego rute n'isi agbụ.

## Ihe Ndị A Na-ekwu na Ya

Site na Zingo 2.0 Pepper Sync, mmekọrịta abụghịzi isi ihe mgbu nke obere akpa echedoro. Ọ bụ ugbu a ngwa ngwa, kwụsie ike ma nwee enyi-enyi, belata ihe mgbochi maka ndị bịara ọhụrụ wee mee ka ojiji kwa ụbọchị dịkwuo mfe karị.

For users, it means less waiting and more privacy. For developers, it means a stronger foundation to build on. For the Zcash ecosystem, it's another step toward making shielded transactions accessible to everyone.

Zingo 2.0 na Pepper Sync abụghị naanị nkwalite; ọ bụ ihe dị elu maka nzuzo, crypto nwere ike iji.

## Peeji ndị metụtara ya

- [Zcash Wallet Syncing] (Nke a bụ ihe dị mkpa)](/zcash-tech/zcash-wallet-syncing)  etu akpa ego si arụ ọrụ n'ime usoro okike Zcash.
- [Nọmba Lightwallet Nodes]](/zcash-tech/lightwallet-nodes)  ihe owuwu a na-eji obere akpa ego dị ka Zingo eme.
- [Zaino] Ọ bụ onye na-eme ihe nkiri.](/zcash-tech/zaino)  indexer mepụtara site na Zingo otu.
- [Ebe ego ndị dị na ya]](/wallets)  akwụkwọ ndekọ aha zuru ezu nke obere akpa Zcash na atụmatụ ha.

## Ịmụtakwu Ihe

- [Zingo! GitHub Ebe nchekwa]](https://github.com/zingolabs/zingolib)
- [Zcash Community Forum] Ọ bụ ihe na-atọ ụtọ.](https://forum.zcashcommunity.com/)
- Nkwupụta Ndị Ọrụ - [Zingo Labs Twitter]](https://twitter.com/ZingoLabs)

___
___
