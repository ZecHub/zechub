<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Akwụkwọ Akụkọ [Newsletter]

ZecWeekly bụ Akwụkwọ Akụkọ a na-ezipụ kwa ụtụtụ Sọnde. Ọ gụnyere akụkọ niile mere n’izu ahụ n’ime gburugburu obibi Zcash. Ndị otu obodo na-ahọpụta akụkọ ahụ kwa izu, a na-etinyekwa njikọ niile dị mkpa n’Akwụkwọ Akụkọ ahụ. Biko denye aha na Akwụkwọ Akụkọ ahụ [ebe a](https://zechub.substack.com/).

## Nye aka

Onyinye nye Akwụkwọ Akụkọ na-arụ ọrụ kacha mma mgbe otu onye na-enye aka kwadebere mbipụta maka izu ziri ezi, soro eriri mkparịta ụka gbasara bounty ma ọ bụ nhazi dị ugbu a, ma nyefee pull request mgbe njikọ izu ahụ dị njikere. Biko enyela mbipụta maka ọdịnihu tupu ZecHub ebipụta ma ọ bụ kwado ụbọchị maka mbipụta ahụ. Pull request ndị a na-ewepụta n’oge na-atụfukarị mmelite nke ngwụcha izu, na-emegide onye nhazi e kenyere, ma ọ bụ jiri oge ikpeazụ na-ezighi ezi.

### 1. Kwenye mbipụta dị ugbu a

Tupu ịmalite ide:

- Lelee [ZEC Bounties](https://bounties.zechub.wiki/) maka ọrụ Akwụkwọ Akụkọ dị ugbu a.
- Chere ka e kenye gị ọrụ.
- Mbipụta Akwụkwọ Akụkọ dị na ngalaba XS nke iwu [ego bounty](https://bounties.zechub.wiki/docs/bounty-amounts). Ọnụọgụ ZEC dị na bounty dị ndụ bụ ego ya, ọ bụghị isiokwu ochie ọ bụla dị na ntuziaka inye aka.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fork ebe nchekwa ahụ

Ọ bụrụ na ị dị ọhụrụ na GitHub, jiri usoro ọrụ a:

1. Mepee ebe nchekwa [ZecHub](https://github.com/ZecHub/zechub).
2. Pịa **Fork** ma mepụta fork n’okpuru akaụntụ GitHub gị.
3. N’ime fork gị, mepụta branch ọhụrụ maka mbipụta ahụ. Aha branch doro anya bara uru, dịka `digest-may-30-2026`.
4. Gbaa mbọ hụ na pull request gị ga-eji `ZecHub/zechub` dịka ebe nchekwa ntọala na `main` dịka branch ntọala.

Ọ bụrụ na ị na-eji akara iwu, otu usoro ọrụ ahụ dị ka nke a:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Dochie `YOUR-USERNAME` na aha njirimara GitHub nke gị. URL dị n’elu bụ naanị placeholder, ọ gaghị arụ ọrụ dịka e dere ya.

### 3. Mepụta faịlụ Akwụkwọ Akụkọ

Jiri [template Akwụkwọ Akụkọ](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) dịka ebe ị ga-amalite. Mbipụta Akwụkwọ Akụkọ dị n’ime folda [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Mgbe ị na-emepụta faịlụ ahụ:

- Soro usoro aha faịlụ issue rịọrọ ma ọ bụ nke e ji mee mbipụta ndị a nakweere n’oge na-adịbeghị anya.
- Debe otu usoro ngalaba dị na template ma ọ bụrụ na ọrụ ahụ arịghịọ usoro dị iche.
- Tinye naanị njikọ sitere n’izu dị mkpa.
- Dee nkọwa dị mkpirikpi ma doo anya maka njikọ ọ bụla ka ndị na-agụ ghọta ihe mere o ji dị mkpa.
- Tụgharịa ma ọ bụ chịkọta isi mmalite ndị na-abụghị Bekee n’asụsụ Bekee mgbe ọ dị mkpa.
- Lelee njikọ ọ bụla tupu imepe pull request.

### 4. Chịkọta njikọ n’oge kwesịrị ekwesị

ZecWeekly na-ekpuchikarị ọrụ gburugburu obibi Zcash maka izu dị ugbu a, a na-ebipụtakwa ya nso na ngwụcha izu. Oge kacha dị nchebe bụ:

- Malite ịchịkọta njikọ mgbe e bipụtara issue ma ọ bụ ọrụ Akwụkwọ Akụkọ dị ugbu a.
- Debe draft mgbe izu ahụ ka na-aga n’ihu.
- Nyefee pull request nso n’ụbọchị enyere maka nnyefe, mgbe ị lechara mmelite nke ngwụcha izu.
- Enyela Akwụkwọ Akụkọ nke izu n’ọdịnihu tupu ọrụ maka ụbọchị ahụ adị ma ọ bụ tupu ZecHub ekwenye na ị kwesịrị ịkwadebe ya.

Ọ bụrụ na issue kwuru ka ị nyefee tupu otu ụbọchị kpọmkwem, soro ụbọchị ahụ. Ọ bụrụ na esemokwu dị n’etiti ibe a na issue dị ugbu a, soro issue dị ugbu a.

### 5. Mepee pull request

Mgbe faịlụ Akwụkwọ Akụkọ gị dị njikere:

1. Commit mgbanwe gị n’ime fork gị.
2. Mepee pull request n’ime `ZecHub/zechub` na branch `main`.
3. Jiri aha kwekọrọ na mbipụta ahụ, dịka `Zcash Ecosystem Digest | May 30th`.
4. Jikọta issue ahụ n’ahụ pull request ka ndị na-enyocha nwee ike jikọta ọrụ ahụ na ọrụ e nyere.

Ọmụmaatụ nke ahụ pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Mgbe pull request meghere, lezie anya na nkwupụta nyocha. Ọ bụrụ na ZecHub rịọ mgbanwe, melite otu branch ahụ kama imepe pull request nke abụọ maka otu mbipụta ahụ.

### Ọmụmaatụ ndị dị adị

Jiri pull request Akwụkwọ Akụkọ ndị a ejikọtalarị dịka ọmụmaatụ nke nnyefe a nakweere:

- [Zcash Nchịkọta gburugburu obibi | Eprel 11](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Nchịkọta gburugburu obibi | Maachị 28](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Nchịkọta gburugburu obibi | Febrụwarị 14](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Mgbe ị na-atụnyere ọrụ gị na ọmụmaatụ, lekwasị anya na ebe faịlụ dị, usoro aha, usoro ngalaba, nkọwa njikọ, na ma pull request ahụ ejikọtala na ọrụ ziri ezi.

### Mmejọ a na-ahụkarị ị ga-ezere

- Imepe pull request tupu ekwenye ụbọchị mbipụta ma ọ bụ ọrụ.
- Ịrụ ọrụ na issue nke nwere pull request ejikọtalarị na ya.
- Ịnyefe pull request n’ime fork nke gị kama n’ime `ZecHub/zechub`.
- Iji aha faịlụ ezighi ezi ma ọ bụ itinye faịlụ ahụ n’èzí folda `newsletter`.
- Iṅomi mbipụta ochie na-enweghị imelite ụbọchị, njikọ, na nkọwa ọ bụla.
- Ịtinye njikọ sitere n’izu ezighi ezi.
- Ịhapụ njikọ gbajiri agbaji, njikọ abụọ, ma ọ bụ ederede placeholder sitere na template.
- Imepe pull request ọhụrụ mgbe nkwupụta nyocha gasịrị kama imelite branch mbụ.

### Ndepụta nlele ikpeazụ

Tupu ịrịọ ka enyochaa, kwado na:

- Ụbọchị issue ma ọ bụ ọrụ kwekọrọ na faịlụ Akwụkwọ Akụkọ gị.
- Ọ dịghị pull request ọzọ mepere emepe nke na-ekpuchi otu issue ma ọ bụ mbipụta ahụ.
- Faịlụ ahụ dị n’ime folda `newsletter`.
- Ngalaba template ezuola.
- Njikọ ọ bụla na-arụ ọrụ ma nwee nkọwa bara uru.
- Ahụ pull request jikọtara issue ziri ezi.
- Ị dị njikere ime mgbanwe ma ọ bụrụ na ndị na-enyocha arịọ ya.

## Mbipụta gara aga

[ZecWeekly Ebe nchekwa](https://zechub.substack.com/p/archive)
