<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sistem zero-knowledge [Zero Knowledge] megide Sistem Dabere na Decoy

…Cryptocurrency na-ekpughere ọha ihe niile ị na-emefu ebe ọ dị ka Twitter na akaụntụ ụlọ akụ gị, nke a bụkwa nnukwu nsogbu a ga-edozi site n'ịnakwere Nzuzo [privacy] on-chain.… - Ian Miers na [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Ụfọdụ ọrụ crypto enwetala amara maka ụzọ ha si etinye Nzuzo n'isi. Zcash bụ onye a ma ama maka iji Zero Knowledge Proofs (ZK) chebe ego Azụmahia [transaction] na Adreesị akpa ego [address]. Monero pụtara ìhè n'ihi iji ya mee ka onye na-ezipụ ego ghara ịmata nke ọma dabere na Decoy, tinyere atụmatụ Nzobe ederede [encryption] ndị ọzọ iji nweta Nzuzo onye ọrụ na blockchain [blockchain].


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Ịghọta ZK Proofs na Sistem Dabere na Decoy

Zero Knowledge Proofs bụ sistem cryptographic nke na-enye otu akụkụ (onye na-egosi proof) ohere igosi akụkụ ọzọ (onye na-enyocha ya) na okwu bụ eziokwu n'ekpugheghị *ozi ọ bụla dị n'okpuru banyere okwu ahụ n'onwe ya*. N'ọnọdụ Zcash, a na-eji ZK proofs chọpụta na Azụmahia ziri ezi n'ekpugheghị nkọwa Azụmahia dịka ONYE ZIGARA, ONYE NATABARA, ma ọ bụ EGO Azụmahia. 

**Nke a na-eme ka Nzuzo onye ọrụ dịgide, n'ihi na Azụmahia na-anọgide na nzuzo ma a ka na-akwado na ọ ziri ezi. E mepụtara teknụzụ a iji hụ na Azụmahia ego na netwọk Zcash na-adị nzuzo.**

Na sistem dabere na Decoy dịka [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), a na-ejikọta ọtụtụ Azụmahia ọnụ, nke na-eme ka ịchọpụta ezigbo ebe ego si na ebe ọ na-aga sie ike. Algorithm ahụ na-etinye input na output Decoy n'ime Azụmahia, ma na-ejikwa Nzobe ederede nke Adreesị akpa ego eji eme input na Range proofs iji kwado na ego ebufere nwere ike imefu. 

Ụzọ a na-eme ka ụzọ Azụmahia ghara ịdị mfe ịmata. Iji input Decoy na-eme ka ọ sie onye ọ bụla na-enyocha blockchain ike ịchọpụta ezigbo onye zigara, onye natara, ma ọ bụ ego Azụmahia. 

**Ihe Dị Mkpa A Ga-Ama**: Usoro a nke ichekwa Nzuzo Azụmahia on-chain ka na-ekpughere input e zoro ezo nke Azụmahia ndị ọrụ niile. A ka nwere ike ịchịkọta metadata dịka *MBUFỤT AZỤMAHIA* n'etiti ndị ọrụ dị iche iche na netwọk. Ọ bụrụ na onye mmegide sonye n'ịmepụta Azụmahia na netwọk, nke ahụ na-eme ka input Decoy nke ndị ọrụ ndị ọzọ ghara inwe aha nzuzo. 


## Uru ZK Nwere Karịa Sistem Dabere na Decoy

Ma Zcash na Monero bụ cryptocurrency lekwasịrị anya na Nzuzo, mana ha na-enweta Nzuzo n'ụzọ dị iche iche. 

Ndị a bụ ụfọdụ uru zero-knowledge proofs (ZK) nke Zcash nwere karịa sistem Decoy nke Monero:

1) **Mpughe ahọpụtara [Selective Disclosure]**: Site na atụmatụ ZK nke Zcash, ndị ọrụ nwere nhọrọ ikpughere ndị otu kpọmkwem nkọwa Azụmahia [Gụọ ECC blọọgụ gbasara Mpughe ahọpụtara](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Na Zcash, ọdịnaya e zoro ezo nke Azụmahia nke e chebere echebe na-enye ndị mmadụ ohere ikpughe data sitere na mbufe kpọmkwem n'ụzọ ahọpụtara. Ọzọkwa, enwere ike inye viewing key [viewing key] iji kpughee Azụmahia niile metụtara otu Adreesị akpa ego nke e chebere echebe. Njirimara a na-enye ohere irubere ụkpụrụ iwu isi na inyocha Azụmahia na-emebighị Nzuzo nke netwọk n'ozuzu ya. 

Ọ bụ ezie na algorithm Decoy nke Monero (ring signature) na-enyere aka inye Nzuzo, ọ naghị enye *Mpughe ahọpụtara* n'otu ụzọ ahụ.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Nlele Nhọrọ**: Zcash na-enye ndị ọrụ ohere ịhọrọ n'etiti Azụmahia Oha [transparent] (nke na-adịghị na nzuzo) na Azụmahia nke e chebere echebe (nke dị na nzuzo). Nke a pụtara na Zcash na-enye ndị ọrụ mgbanwe ịhọrọ idobe ozi ego ha na nzuzo (nke e chebere echebe) ma ọ bụ ime ka ọ bụrụ Oha ma onye ọ bụla hụ ya, dịka ọtụtụ blockchain ndị ọzọ, dịka akọwara na [Zcash weebụsaịtị gọọmenti](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Nzuzo a a na-ahọrọ itinye na-enye mgbanwe ka ukwuu na Ojiji [use case] metụtara azụmahịa/nzukọ, ebe ụfọdụ Azụmahia nwere ike ịchọ Nzuzo dị ntakịrị maka nyocha ọha, ebe ndị ọzọ na-erite uru na Nzuzo ka mma.


3) **Ntọala Amaghị Aha**: [ntọala amaghị aha](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) nke pool nke e chebere echebe nke zero knowledge nwere Azụmahia niile meworo *mgbe ọ bụla*. Nke a dị ukwuu karịa ọtụtụ usoro on-chain ndị ọzọ maka ime ka Azụmahia bụrụ Ihe na-apughi ijikọ ọnụ [unlinkable]. Rịba ama: nke a na-emetụta naanị Azụmahia dị n'ime otu pool nke e chebere echebe.

Iji Decoy na-eme ka ntọala amaghị aha bawanye. Agbanyeghị, ụzọ a dabere kpamkpam na ọnụ ọgụgụ ndị ọrụ *ezigbo* nọ na netwọk. 

4) **Enweghị Trusted Setup**: Setup nke Zcash Sprout na Sapling jiri mgbakọ ọtụtụ akụkụ a maara dịka …emume trusted setup [trusted setup]…. Nkwalite NU5 ọhụrụ achọghị ntụkwasị obi ọ bụla n'ịdị mma nke setup circuit zero knowledge. [Gụọ ECC blọọgụ gbasara NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Nzuzo Data**: Teknụzụ [zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) eji na pool nke e chebere echebe nke Zcash na-enye nchekwa ka mma nke ukwuu maka ndị ọrụ. Mbelata mwepụta metadata on-chain pụtara na ndị ọrụ nọ na nchekwa pụọ n'aka ndị mmegide dịka ndị ohi kọmputa nwere ike ịdị ma ọ bụ òtù ọchịchị na-emegbu mmadụ. 

E nwere ọtụtụ ọnọdụ ebe achọpụtara ntụpọ n'ime algorithm ịhọrọ Decoy nke Monero. Ntụpọ ndị a nwere ike ikpughe ego ndị ọrụ mefuru, dịka akụkọ sitere na [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero) siri kwuo. 


Na nchịkọta, ihe kacha mkpa bụ ibelata ma ọ bụ iwepụ mwepụta ozi na data onye ọrụ, dịka Zooko kọwara na nnọkọ AMA dị ndụ [Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Njikọ Ntụtụaka***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
