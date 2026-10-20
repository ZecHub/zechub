<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sistemụ dabere na ihe ọmụma efu vs Decoy

"Ego dijitalụ na-ekpughe ihe niile ị na-emefu n'ihu ọha ebe ọ bụ na ọ dị ka Twitter na akaụntụ ụlọ akụ gị, nke a bụkwa nnukwu nsogbu nke a ga-edozi site na iji nzuzo nke usoro a." - Ian Miers na [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Ụfọdụ ọrụ crypto enwetala amara maka ụzọ ha si elekwasị anya na nzuzo. A maara Zcash maka iji Zero Knowledge Proofs (ZK) echebe ọnụọgụ na adreesị azụmahịa. Monero pụtara ìhè maka ojiji nke Decoy-based sender obfuscation yana atụmatụ nzuzo ndị ọzọ iji nweta nzuzo onye ọrụ na blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Ịghọta ZK Proofs na Sistemụ Dabere na Decoy

Ihe akaebe ihe ọmụma efu bụ sistemụ nzuzo nke na-enye otu onye (onye akaebe) ohere igosi onye ọzọ (onye nyocha) izi ezi nke nkwupụta na-ekpugheghị *ozi ọ bụla dị n'okpuru gbasara nkwupụta ahụ n'onwe ya*. N'ihe gbasara Zcash, a na-eji ihe akaebe ZK iji chọpụta izi ezi nke azụmahịa na-ekpugheghị nkọwa azụmahịa dịka onye zitere, onye nnata ma ọ bụ ego azụmahịa. 

**Nke a na-eme ka a hụ na a na-echekwa nzuzo onye ọrụ ka azụmahịa ahụ na-abụ ihe nzuzo ma a ka na-enyocha ya. Emebere teknụzụ a iji hụ na nzuzo nke azụmahịa ego na netwọk Zcash.**

N'ime sistemụ Decoy dịka [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), a na-ejikọta ọtụtụ azụmahịa na-eme ka ọ sie ike ma ọ bụ sie ike ịchọpụta ebe ego si na ebe ego ahụ si. Algọridim ahụ na-ewebata ntinye na mmepụta aghụghọ na azụmahịa yana iji nzuzo nke adreesị eji dị ka ntinye & iji ihe akaebe Range iji gosi na ego e zigara bụ ihe a ga-emefu. 

Ụzọ a na-egbochi ụzọ azụmahịa. Ojiji nke ntinye aghụghọ na-eme ka ọ sie ike nye onye ọ bụla na-enyocha blockchain ịchọpụta ezigbo onye zitere ya, onye nnata, ma ọ bụ ego azụmahịa. 

**Ihe Dị Mkpa**: Ụzọ a nke ịchekwa nzuzo n'usoro azụmahịa ka na-ekpughe nke ọma ntinye (ezoro ezo) na azụmahịa ndị ọrụ niile. Enwere ike ịchịkọta metadata dị ka *ỌRỤ N'ỤZỌ AGBANWE* n'etiti ndị ọrụ dị iche iche na netwọk ahụ. Ọ bụrụ na onye mmegide esonye na imepụta azụmahịa na netwọk ahụ, ọ na-ewepụ aha ndị ọrụ ndị ọzọ. 


## Uru nke Sistemụ Dabere na ZK Over Decoy

Ma Zcash na Monero bụ ego dijitalụ lekwasịrị anya na nzuzo, mana ha na-enweta nzuzo n'ụzọ dị iche iche. 

Lee ụfọdụ uru nke ihe akaebe efu Zcash's (ZK) karịa sistemụ aghụghọ nke Monero:

1) **Ngosipụta Nhọrọ**: Site na atụmatụ Zcash ZK, ndị ọrụ nwere nhọrọ ikpughe nkọwa azụmahịa nye ndị otu akọwapụtara [Gụọ blọgụ ECC na Nkọwapụta Nhọrọ](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)Na Zcash, ihe dị n'ime azụmahịa echekwara na-enye ndị mmadụ ohere ikpughe data site na mbufe kpọmkwem. Na mgbakwunye, enwere ike inye igodo nlele iji kpughee azụmahịa niile metụtara adreesị echekwara kpọmkwem. Njirimara a na-enye ohere maka nnabata iwu na nyocha na-enweghị imebi nzuzo zuru oke nke netwọk ahụ. 

Ọ bụ ezie na algọridim aghụghọ nke Monero (mbinye aka mgbanaka) na-enyere aka n'inye nzuzo, ọ naghị enye *nhọrọ* ngosipụta n'otu ụzọ ahụ.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Nhọrọ Nhụpụta**: Zcash na-enye ndị ọrụ ohere ịhọrọ n'etiti azụmahịa doro anya (nke na-abụghị nkeonwe) na azụmahịa echekwara (nkeonwe). Nke a na-egosi na Zcash na-enye ndị ọrụ ohere idobe ozi ego ha n'onwe (n'ebe a na-echebe ya) ma ọ bụ mee ka ọ doo anya ma dịrị n'ihu ọha dịka ọtụtụ blockchain ndị ọzọ dịka akọwara na ya [Ebe nrụọrụ weebụ gọọmentị Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)Nzuzo a maka nhọrọ na-enye ohere maka mgbanwe ka ukwuu na okwu ojiji azụmaahịa/òtù, ebe ụfọdụ azụmahịa nwere ike ịchọ obere nzuzo maka nyocha ọha, ebe ndị ọzọ na-erite uru site na nchekwa ka mma.


3) **Nhazi Amaghị Aha**: The [aha njirimara](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) nke ọdọ mmiri ihe ọmụma efu nwere ihe niile emerela. Nke a buru ibu karịa ọtụtụ usoro ndị ọzọ dị n'usoro iji nweta njikọ na-enweghị njikọ. Rịba ama: nke a metụtara naanị azụmahịa dị n'ime otu ọdọ mmiri ahụ.

Ojiji nke aghụghọ na-eme ka njirimara nzuzo dịkwuo elu. Agbanyeghị, ụzọ a dabere kpamkpam na ọnụọgụgụ *ezigbo* ndị ọrụ na netwọk ahụ. 

4) **Enweghị Ntọala A Tụkwasara Obi**: Nhazi Sprout & Sapling Zcash's jiri mgbakọta ọtụtụ mmadụ nke a maara dị ka "ememe ntọala a tụkwasịrị obi". Mmelite NU5 nke na-adịbeghị anya achọghị ntụkwasị obi na iguzosi ike n'ezi ihe nke ntọala sekit ihe ọmụma efu. [Gụọ blọgụ ECC na NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Nzuzo Data**: Nke [teknụzụ zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) eji ya na ọdọ mmiri ndị e ji kpuchie Zcash's na-enye ohere maka nchekwa dị ukwuu maka ndị ọrụ. Mbelata ntapụ metadata na-apụta na ndị ọrụ nwere nchebe pụọ n'aka ndị iro dịka ndị nwere ike ịghọgbu ndị ọzọ ma ọ bụ ndị otu steeti na-emegbu. 

E nwere ọtụtụ ihe atụ ebe achọpụtara njehie na algọridim nhọrọ decoy nke Monero. Nsogbu ndị a nwere ike ikpughe mmefu ndị ọrụ dịka akụkọ si kwuo [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Na nchịkọta, ihe kacha mkpa bụ ibelata ma ọ bụ wepụ mmịpụta nke ozi na data onye ọrụ dịka Zooko kọwara na [Oge ndụ nke Orchid (priv8) AMA](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Njikọ ntụaka***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



