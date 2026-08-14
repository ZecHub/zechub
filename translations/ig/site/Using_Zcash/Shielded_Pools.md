<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Value Pools (Nkwụnye ego nke uru) 

## TL;DR

- Zcash nwere ugbu a ** 5 uru ọdọ mmiri**: Sprout (ihe nketa), Sapling, Orchard (na-emefu naanị), Ironwood na Transparent.
- **Ironwood** bụ ọdọ mmiri a na-echebe ugbu a, dị ndụ kemgbe nkwalite NU6.3 na 28 Julaị 2026.
- **Orchard** bụzi naanị ihe a na-emefu ego: enweghị uru ọhụrụ nwere ike ịbanye ya, ma ego ndị dị adị gafere n'ime Ironwood.
- ** Sapling** (z-adreesị na-amalite site na `zs`) na-anọgide n'ọtụtụ ebe ma nọgide na-enweta nnukwu ego ZEC echekwara.
- Adreesị ** Transparent** (t...) anaghị enye nzuzo azụmahịa ma rụọ ọrụ yiri Bitcoin.
- **Sprout** bụ ọdọ mmiri ochie nke e wepụrụ n'ọrụ.
- Mpaghara Orchard na Ironwood nọ n'ọrụ ma a na-enyocha ya n'ihu ọha site na turnstile.
- Maka nkwa nzuzo kachasị ike, ndị ọrụ kwesịrị ịnọgide na-ahọrọ **shielded to shielded (z → z)** azụmahịa mgbe ọ bụla o kwere omume.


<br/>

## Ịghọta Zcash Value Pools

Zcash separates funds into distinct accounting systems known as value pools. Each pool has its own cryptographic rules and privacy properties, while the protocol tracks the total value moving between them.

Taa, netwọk nwere ise isi uru ọdọ mmiri:

- O doro anya  Ọha na-ahụ maka ọha na eze ma hụ ya n'ụzọ zuru ezu.
- Sapling  Ebe a na-egwu mmiri nke oge gboo, ka dị.
- Orchard  Ebe a na-egwu mmiri nke mbụ, ugbu a ọ bụ naanị maka ndị mmadụ.
- Ironwood  Ebe a na-emechi mmiri nke mbụ, ewebata ya site NU6.3.
- Sprout  Ebe nchekwa echedoro mbụ malitere na Zcash n'afọ 2016.
  


Ka Zcash na-agbanwe, enwere ike iwebata ọdọ mmiri ọhụrụ echedoro iji melite nchekwa, nzuzo, ojiji, yana nyocha ma na-ejigide ndakọrịta ya na ego ndị dị ugbu a.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: Ihe osise na-egosi ọdọ mmiri 4 dị ugbu a ka ọ bụrụ Ọktọba, 2025

<br/>

## Ọdọ Mmiri Ndị E Chebere n'Ime Oké Osimiri 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood bụ ọdọ mmiri nke a na-echebe ugbu a. Ọ malitere ọrụ n'ụbọchị 28 Julaị 2026 na ngọngọ 3,428,143 dịka akụkụ nke nkwalite netwọk NU6.3, ọ bụkwa ebe uru ọhụrụ echedoro dị ndụ ugbu a .

It exists because a vulnerability was found in Orchard's proving system in May 2026. There is no evidence it was ever exploited, but the flaw meant the shielded supply could not be proven sound by the proofs alone. Rather than patch in place, the network created a fresh pool with a corrected circuit and moved value across a turnstile that counts every coin in public. That accounting is what restores the guarantee that the shielded supply is fully backed.

Ironwood na-eji ihe ngosi nke Orchard's Action ma gosipụta Halo 2, ya mere ọ na-akpa otu ụzọ ahụ kwa ụbọchị. Ihe abụọ dị ọhụrụ: azụmahịa jiri usoro v6, yana akwụkwọ ego Ironwood bụ ** quantum recoverable ** n'okpuru [ZIP 2005 Ihe ndị dị na peeji nke 3](https://zips.z.cash/zip-2005), nke pụtara na ihe ndekọ ego dị n'elu-agbụ ga-adịgide ma ọ bụrụ na kọmputa kọmpụta ọdịnihu mebie cryptography taa. Nke ahụ bụ ụzọ mgbake, ọ bụghị nguzogide quantum, ọ naghị emetụta ọdọ mmiri ndị okenye.

Ị chọghị adreesị ọhụrụ. Adreesị ndị a na-ejikọta ọnụ bụ ọtụtụ ihe nnata, obere akpa ego ahụ ga-ahọrọkwa ebe kwesịrị ekwesị maka gị.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: Ihe osise na-egosi ọdọ mmiri Orchard dị ka nke Ọktọba, 2025

<br/>

E mepere Orchard Shielded Pool na Mee 31, 2022 dịka akụkụ nke nkwalite netwọk NU5. Orchard webatara usoro ọhụụ ọhụrụ echekwara nke kpochapụrụ mkpa maka ntọala a tụkwasịrị obi wee bụrụ ọdọ mmiri mbụ echebe eji Unified Addresses (UA).

Orchard emeela ka o nwekwuo ike, arụmọrụ na nzuzo site n'ibelata mgbapụta metadata azụmahịa ma webata usoro mgbanwe nke dabere na Omume kama itinye ihe ntinye ọdịnala.

Since the Ironwood upgrade activated on 28 July 2026, **Orchard is spend-only**. No new value can enter the pool. Funds already held there can still be spent, and are migrating out into Ironwood through the turnstile. Wallets handle this for you, though most give you some control over the pace.

Ọ bụrụ na i nwere ego Orchard, lee: [Osisi ígwè](/zcash-tech/ironwood) maka ihe ọpụpụ pụtara n'omume.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: Ihe osise na-egosi ọdọ mmiri Sapling dị ka nke Ọktoba, 2025

<br/>

[Zcash Sapling (Nke a bụ ihe e ji mara ya)](https://z.cash/upgrade/sapling) bụ nkwalite na usoro Zcash ewepụtara na 28th nke Ọktọba, 2018. Ọ bụ nnukwu mmelite karịa ụdị mbụ a maara dị ka Sprout nke nwere ụfọdụ njedebe n'ihe gbasara nzuzo, arụmọrụ yana ojiji. 

Ụfọdụ n'ime nkwalite ndị ahụ gụnyere arụmọrụ ka mma maka adreesị echedoro, igodo nyocha dị elu iji mee ka ndị ọrụ lelee azụmahịa na-abata ma ọ bụ nke na-apụ apụ na-enweghị ikpughe mkpịsị nzuzo onye ọrụ yana Igodo Independent Zero Knowledge maka obere akpa ngwaike mgbe ịbịanye aka azụmaahịa. 

Zcash Sapling na-enyere ndị ọrụ aka ịme azụmahịa nkeonwe n'ime sekọnd ole na ole ma e jiri ya tụnyere ogologo oge ọ were na Sprout Series. 

Nchedo azụmahịa na-eme ka nzuzo dịkwuo elu, nke mere na ọ gaghị ekwe omume maka ndị ọzọ ijikọ azụmahịa ma chọpụta ego ZEC a ga-ebufe. Sapling na-emekwa ka ojiji rụọ ọrụ site n'ibelata ihe nchọpụta kọmputa iji mepụta azụmahịa onwe onye site n"ịme ya ka ọ dịrị ndị ọrụ mfe ịnweta.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: Ihe osise na-egosi ọdọ mmiri Sprout dị ka nke Ọktọba, 2025

Sprout bụ nke mbụ na-enweghị ikike, Zero Knowledge nzuzo protocol mgbe ọ bụla. Ọ malitere n'ụbọchị 28th October 2016.

A na-amata adreesị Sprout site n'akwụkwọ ozi abụọ mbụ ha nke bụ "zc" mgbe niile. E nyere ya aha ahụ maka isi ebumnuche iji mesie ike na ngwanrọ a ka dị ọhụrụ, budding blockchain nwere nnukwu ikike itolite ma mepee mmepe. 

A na-eji Sprout eme ihe dị ka ngwá ọrụ mbụ maka [Zcash na-amalite ngwa ngwa Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) nke mere ka e kee ndị na-egwu ọla kọpa ụgwọ ọrụ ZEC na Block. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: Ihe osise na-egosi Transparent pool dị ka nke Ọktọba, 2025

<br/>

Zcash Transparent pool bụ nke na-enweghị nchebe ma ọ bụghị nke onwe. Adreesị obere akpa ego doro anya na Zcash malite site na leta "t", nzuzo dị ala n'iji ụdị adreesị a maka azụmahịa.

Mmekọrịta ndị na-enweghị ntụpọ n'ime Zcash yiri azụmahịa Bitcoin nke na-akwado ọtụtụ nkwekọrịta ma jiri adreesị ọha.

The Zcash Transparent are mostly used by centralized exchanges to ensure there's high transparency and network confirmation when sending and receiving ZEC between users.

Ọ dịkwa mkpa iburu n'uche na ebe adreesị Zcash Shielded na-enye nzuzo dị elu mgbe azụmahịa, ha chọkwara ihe ndị ọzọ iji rụọ ọrụ maka nhazi nke azụmahịa. Ya mere, ụfọdụ ndị ọrụ nwere ike ịnakwere Adreesị Transparent maka azụmahịa ndị anaghị achọ otu ọkwa nchekwa ahụ.

<br/>

## Nhazi Akwadoro maka Ịnyefe Ngwakọta Ngwaọrụ

Mgbe a bịara n'ịtụle ọkwa dị elu nke nzuzo mgbe ị na-eme azụmahịa na Zcash Network, ọ bụ ihe amamihe dị na ya ka ịgbaso usoro ndị a:

Transaction occurring between "z to z" wallets on the Zcash blockchain are mostly shielded and it is sometimes called Private Transaction due to the high level of Privacy generated. This is usually the best and the most recommended way of sending and receiving $ZEC when privacy is required. 

---

Mgbe ị na-eziga ZEC site "Z-address" ka "T-adddress", ọ bụ nanị ihe a ụdị nke Deshielding azụmahịa. Na ụdị azụmahịa, nzuzo larịị bụghị mgbe niile elu dị ka ụfọdụ ozi ga-ahụ anya na blockchain n'ihi mmetụta nke izipu ZEC on a Transparent Address. A naghị atụ aro deshielded transaction mgbe achọrọ nnukwu nzuzo. 

---

Ịnyefe ZEC site na Adreesị Transparent (T-address) gaa adreesị Z bụ nke a maara dị ka Shielding. N'ụdị azụmahịa a, ọkwa nzuzo adịghị elu mgbe niile ma e jiri ya tụnyere zz transaction mana ọ dịkwa mma mgbe achọrọ nchekwa data. 

---

Sending ZEC from a Transparent Address (T-address) to another Transparent Address (T-address) on Zcash Network (T-T transaction) is very similar to that of Bitcoin transaction and this is why T-T transactions on Zcash are always called Public transactions because both the sender and the receiver transaction details becomes visible to the public which makes the level of Privacy very low in such transaction. 

Ọtụtụ Cryptocurrency Centralized exchanges na-eji Adreesị Transparent ("T-address") eme ihe mgbe ọ bịara n'ihe gbasara azụmahịa na Zcash blockchain mana ụdị azụmahịa a (T-T) agaghị enwe akụ nkeonwe.

<br/>

## The Orchard to Ironwood Migration

Mbugharị ahụ na-eme ugbu a. Orchard ka e mechiri nye nkwụnye ego ọhụrụ, uru nke nọkwa n'ebe ahụ bụ ịkwaga Ironwood otu azụmahịa kwa oge. Ị nwere ike ile ngụkọta ọnụ ọgụgụ dị ebe a: [ironwood. ndụ](https://ironwood.live/).

Ihe nke a pụtara na-adabere n'ebe ego gị dị:

1. Ihe ọhụrụ a na-eme n'ụlọ mgbochi ga-abanye Ironwood ozugbo. O nweghị ihe ị ga-eme.
2. ** Ego Orchard dị ugbu a chọrọ ịkwaga. Akpa ego echekwara na-eme nke a maka gị, ọ bụkarị n'usoro kama ịbụ otu oge niile.
3. **Sapling adịghị emetụta** ma ka na-anabata ego. Naanị Orchard bụ nke e mechiri emechi.
4. ** The turnstile counts everything** crossing between pools, nke bụ ihe na-egosi dịghị mkpụrụ ego e mepụtara tinyere ụzọ.

> **One privacy caveat worth knowing.** The turnstile publishes the *amount* that crosses between pools, along with the block height. Sender and receiver stay hidden as always, but a distinctive amount can be linked back to you. This is why wallets migrate in stages using standard denominations instead of moving your balance in one recognisable lump. Let your wallet pace itself, and consider using Tor or a VPN so your IP is not tied to the amounts you move.

Lee ya ebe a . [Osisi ígwè](/zcash-tech/ironwood) maka nkwalite ahụ n'onwe ya, na [Ihe A Na-akpọ Turnstile](/zcash-tech/the-turnstile) maka etu akwụkwọ ndekọ ego si arụ ọrụ.

<br/>

## Ihe Ndị A Na-emekarị nke E Kwesịrị Izere

- ** Izipu site na t-adreesị gaa n'adres**  ọha kpamkpam, enweghị nzuzo. Na -echebe ego mgbe niile mbụ.
- ** Iche na Orchard ka nabatara ego**  ọ bụ naanị mmefu kemgbe 28 Julaị 2026. Uru nwere ike ịpụ, mana onweghị ihe ọhụrụ batara.
- ** Ịgbagwoju anya na adreesị Sapling na Unified Addresses**  N'adreesị ndị a, ọ ga-amalite site n'akara 'Sapling'. `zs`. Adreesị ndị dị n'otu na-amalite site na `u1` na ikpokọta ọtụtụ ndị nnata, ya mere ọdọ mmiri gị ugwo ala n'ime-adabere nke nnata na adreesị ahụ nwere
- ** Ịhapụ ego na ọdọ mmiri Sprout**  A kwụsịrị ịba ụba ruo ọtụtụ afọ; wepụ ego ndị ahụ n'èzí.
- **Expecting a migration to be completely invisible** — the amount crossing the turnstile is public, even though sender and receiver are not
- ** Iche t → z (shielding) bụ kpamkpam onwe**  ihe omume nke shielding n'onwe ya na-ahụ anya on-chain; ọdịnaya adịghị.

---

## Peeji ndị metụtara ya

- [Osisi ígwè](/zcash-tech/ironwood)  Nwelite nke mepụtara ọdọ mmiri ugbu a
- [Ihe A Na-akpọ Turnstile](/zcash-tech/the-turnstile)  Olee otú uru na-aga n'etiti ọdọ mmiri a audited
- [Akpa ego](/using-zcash/wallets)  Kedu obere akpa ego a na-echekwa ma Ironwood dị njikere
- [Ihe ndị e mere eme](/using-zcash/transactions)  Otu esi eziga azụmahịa echekwara
- [Ịzụta ZEC](/using-zcash/buying-zec)  Ịzụta ZEC tupu iji ya na ọdọ mmiri.
- [ZK-SNARKs](/zcash-tech/zk-snarks)  Ntọala nzuzo nke ọdọ mmiri ndị e chebere
- [Gịnị bụ ZEC na Zcash?](/start-here/what-is-zec-and-zcash)  Ndabere na nzuzo Zcash
