<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Value Pools 

## TL;DR

- Zcash ugbu a nwere ** 4 ọdọ mmiri uru **: Sprout (ihe nketa), Sapling, Orchard, na Transparent.
- **Orchard** bụ ọdọ mmiri a na-echebe ugbu a nke ejiri Unified Addresses (u1...).
- ** Sapling ** (z-adreesị na-amalite na `zs`) remains widely supported and continues to secure a significant amount of shielded ZEC.
- Adreesị ** Transparent ** (t...) anaghị enye nzuzo azụmahịa ma rụọ ọrụ yiri Bitcoin.
- **Sprout** bụ ọdọ mmiri a na-echekwa ihe ochie nke ewepụrụla ya n'ọrụ.
- A future shielded pool known as **Ironwood** has been proposed to strengthen confidence in the integrity of the shielded ZEC supply while preserving privacy.
- Maka nkwa nzuzo kachasị ike, ndị ọrụ kwesịrị ịnọgide na-ahọrọ **shielded-to-shield (z → z) ** azụmahịa mgbe ọ bụla o kwere omume.


<br/>

## Ịghọta Zcash Value Pools

Zcash separates funds into distinct accounting systems known as value pools. Each pool has its own cryptographic rules and privacy properties, while the protocol tracks the total value moving between them.

Taa, netwọk nwere isi ihe anọ bara uru:

- Transparent — Public and fully visible on-chain.
- Sapling  Ebe a na-egwu mmiri nke oge a nke e ji ihe ndị e ji echekwa mmiri mee bụ nke mbụ e ji eme ihe n'ọtụtụ ebe.
- Orchard  Ebe a na-echekwa mmiri ugbu a nke e webatara na Unified Addresses.
- Sprout  Ebe nchekwa echedoro mbụ malitere na Zcash na 2016.
  


As Zcash evolves, new shielded pools may be introduced to improve security, privacy, usability, and auditability while maintaining compatibility with existing funds.

<br/>

! [img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Ihe osise 1: eserese na-egosi ọdọ mmiri 4 dị ugbu a na Ọktọba, 2025

<br/>

## Ọdọ Mmiri Ndị E Chebere 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


! [img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Ihe osise nke 2: Otu eserese na-egosi ọdọ mmiri Orchard dị ka Ọktọba, 2025

<br/>

A na-arụ ọrụ Orchard Shielded Pool na Mee 31, 2022 dị ka akụkụ nke nkwalite netwọk NU5. Orchard webatara usoro ọhụụ ọhụrụ nke kpochapụrụ mkpa maka ntọala a tụkwasịrị obi wee bụrụ isi ọdọ mmiri echedoro nke ejiri Unified Addresses (UA).

Orchard significantly improved usability, efficiency, and privacy by reducing transaction metadata leakage and introducing a more flexible transaction model based on Actions rather than traditional shielded inputs and outputs.

Taa, Orchard ka bụ isi ọdọ mmiri echedoro maka Zcash. Agbanyeghị, obodo ahụ na-enyocha mbugharị n'ọdịnihu gaa ọdọ mmiri ọhụrụ echedora akpọrọ Ironwood, nke ga-enye mmesi obi ike ọzọ gbasara iguzosi ike n'ezi ihe nke ZEC echedara ma na-echekwa nkwa nzuzo nke Zcash .

[Zcash echekwara wallets](/site/Using_Zcash/Wallets) ugbu a na-akwado Orchard. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


! [img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Ihe osise 3: Otu eserese na-egosi ọdọ mmiri Sapling dị ka nke Ọktoba, 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) bụ nkwalite na usoro Zcash ewepụtara na 28th nke Ọktọba, 2018. Ọ bụ nnukwu mmelite karịa ụdị mbụ nke a maara dị ka Sprout nke nwere ụfọdụ njedebe n'ihe gbasara nzuzo, arụmọrụ na ojiji. 

Some of the upgrades include improved performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

Zcash Sapling enables users to perform private transactions in just a few seconds when compared to the longer duration it took in Sprout Series. 

Transaction shielding enhances privacy, making it impossible for third-parties to link transactions and determine the amount of ZEC being transferred. Sapling also improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


! [img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Fig 4: Ihe osise na-egosi ọdọ mmiri Sprout dị ka Ọktọba, 2025

Sprout bụ nke mbụ a na-emeghe na-enweghị ikikere Zero Knowledge nzuzo protocol mgbe ọ bụla malitere. Ọ malitere na 28th nke October, 2016.

Sprout addresses are identified by their first two letters which is always "zc". It was named "Sprout" for the major purpose of emphasising that the software was young, budding blockchain with great potential to grow and  opened for development. 

A na-eji Sprout dị ka ngwá ọrụ mbụ maka [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) nke butere nkesa nke ZEC na Block ụgwọ ọrụ maka Miners. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

! [img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Ihe osise nke 5: eserese na-egosi ogige Transparent dị ka nke Ọktọba, 2025

<br/>

The Zcash Transparent pool is unshielded and non-private. Transparent wallet address on Zcash start with the letter "t", privacy is very low in using this address type for transactions.

Azụmahịa ndị doro anya na Zcash yiri azụmahịa Bitcoin nke na-akwado azụmahịa ọtụtụ mbinye aka ma jiri adreesị ọha na eze.

The Zcash Transparent are mostly used by centralized exchanges to ensure there's high transparency and network confirmation when sending and receiving ZEC between users.

It's also important to note that while Zcash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.

<br/>

## Nhazi Akwadoro maka Ịnyefe Ngwakọta

Mgbe a bịara n'ịtụle ọkwa dị elu nke nzuzo n'oge azụmahịa na Zcash Network, a na-atụ aro ka ị gbasoo omume ndị a n'okpuru;

Transaction occurring between "z to z" wallets on the Zcash blockchain are mostly shielded and it is sometimes called Private Transaction due to the high level of Privacy generated. This is usually the best and the most recommended way of sending and receiving $ZEC when privacy is required. 

---

When you send ZEC from "Z-address" to "T-address", it simply connotes a form of Deshielding transaction. In this type of transaction, the privacy level is not always high as some information will be visible on the blockchain due to the effect of sending ZEC on a Transparent Address. Deshielding transaction is not always recommended when high privacy is required. 

---

Ịnyefe ZEC site na Adreesị Transparent (T-address) gaa na Z-adreesị a maara dị ka Shielding. N'ụdị azụmahịa a, ọkwa nzuzo adịghị elu mgbe niile ma e jiri ya tụnyere nke azụmahịa z-z mana a na-atụ aro ya mgbe achọrọ nzuzo. 

---

Sending ZEC from a Transparent Address (T-address) to another Transparent Address (T-address) on Zcash Network (T-T transaction) is very similar to that of Bitcoin transaction and this is why T-T transactions on Zcash are always called Public transactions because both the sender and the receiver transaction details becomes visible to the public which makes the level of Privacy very low in such transaction. 

Most Cryptocurrency Centralized exchanges make use of Transparent Address ("T-address) when it comes to transacting on the Zcash blockchain but this type of transaction (T-T) will not have any private properties.

<br/>

## Ọdịnihu: Ọdọ Mmiri Ironwood

Obodo Zcash na-enyocha ugbua ọdọ mmiri a na-akpọ Ironwood.

Ironwood is designed to address a recently discovered and patched vulnerability in Orchard's proving system. Although there is no evidence that the vulnerability was ever exploited, Ironwood would provide an additional layer of assurance by enabling a controlled migration from Orchard into a newly created shielded pool.

Ebumnuche abụghị iji dochie nzuzo Zcash, kama iji wusie obi ike na iguzosi ike n'ezi ihe nke ZEC echekwara.

## N'okpuru atụmatụ ahụ:

1. Ọrụ ọhụrụ ndị e chebere ga-eji nke nta nke nta banye n'Ironwood.
2. Enwere ike ịkwaga ego Orchard dị ugbu a na nzuzo.
3. Public turnstile accounting would provide stronger evidence that all shielded funds remain fully backed.
4. Ndị ọrụ ga-ejigide otu nchebe nzuzo ha na-atụ anya site na Zcash.

<br/>
If activated through future network upgrades, Ironwood would become the next generation of Zcash's shielded ecosystem while preserving compatibility with existing shielded funds.

<br/>

## Ihe Ndị A Na-emekarị nke E Kwesịrị Izere

- ** Izipu site na t-adreesị gaa na t address **  n'ihu ọha, enweghị nzuzo. Na-echebe ego mbụ mgbe niile.
- ** Ịgbagha adreesị Sapling na Orchard **  Adreesị sapling na-amalite na `zs`, Orchard/Unified adreesị na-amalite na `u1`
- ** Ịhapụ ego n'ime ọdọ mmiri Sprout **  A na-ewepụ Sprout; na-akwaga ego na Orchard
- ** Iche t → z (shielding) bụ kpamkpam onwe **  omume nke shielding onwe ya bụ anya na-akara; ọdịnaya na-adịghị

---

## Peeji ndị metụtara ya

- [Akpa ego](/using-zcash/wallets)  Kedu obere akpa na-akwado Orchard na Sapling pools
- [Mmekọrịta](/using-zcash/transactions)  Otu esi eziga azụmahịa echekwara
- [Ịzụta ZEC](/using-zcash/buying-zec)  Inweta ZEC tupu iji ya na ọdọ mmiri
- [ZK-SNARKs](/zcash-tech/zk-snarks)  Ntọala cryptographic nke ọdọ mmiri echedoro
- [Gịnị bụ ZEC na Zcash](/start-here/what-is-zec-and-zcash)  Ndabere na nzuzo Zcash
