<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Àkójọ Iye Zcash 

## TL;DR

- Zcash ni lọwọlọwọ ni ** Awọn adagun iye iye 4 **: Sprout (ogún), Sapling, Orchard, ati Transparent.
- **Orchard** ni adiro akọkọ ti o ni aabo lọwọlọwọ ti a lo nipasẹ Awọn Adirẹsi Aladani (u1...).
- **Sapling** (àwọn adirẹsi z tí ó bẹ̀rẹ̀ pẹ̀lú `zs`) ṣì ní ìtìlẹ́yìn tó gbòòrò, ó sì ń bá a lọ láti rí i pé àwọn ZEC tí wọ́n fi ààbò bo pọ̀.
- Àwọn àdírẹ́ẹ̀sì tí ó ṣe kedere (t...) kì í pèsè ìpamọ́ fún ìsàmúlò, wọ́n sì ń ṣiṣẹ́ bíi ti Bitcoin.
- **Sprout** jẹ́ adágún tí a fi ààbò ṣe tí a ti mú kúrò nínú lílò.
- A future shielded pool known as **Ironwood** has been proposed to strengthen confidence in the integrity of the shielded ZEC supply while preserving privacy.
- Fun awọn iṣeduro aṣiri ti o lagbara julọ, awọn olumulo yẹ ki o tẹsiwaju lati fẹ ** shielded-to-shielded (z → z) ** awọn iṣowo nigbakugba ti o ba ṣeeṣe.


<br/>

## Òye àwọn Ìpín Iye Zcash

Zcash separates funds into distinct accounting systems known as value pools. Each pool has its own cryptographic rules and privacy properties, while the protocol tracks the total value moving between them.

Loni, nẹtiwọọki naa ni awọn adagun iye pataki mẹrin:

- Transparent  Public ati ki o ni kikun han lori-pupọ.
- Sapling  Ìsàlẹ̀ odò tí wọ́n kọ́kọ́ ń lò lóde òní.
- Orchard  Àkójọ ìpamọ́ àkọ́kọ́ tí wọ́n ń lò nísinsìnyí tí a mú wá pẹ̀lú Adirẹsi Oníṣọ̀kan.
- Sprout  Àkójọ ìpamọ́ ìpilẹ̀ṣẹ̀ tí a ṣe pẹ̀lú Zcash ní ọdún 2016.
  


Bi Zcash ṣe n dagbasoke, a le ṣe agbekalẹ awọn adagun ideri tuntun lati mu aabo, aṣiri, lilo, ati iṣayẹwo pọ si lakoko ti o n ṣetọju ibaramu pẹlu awọn owo ti o wa tẹlẹ.

<br/>

! [ì ì1 ]](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Àwòrán 1: Àkọsílẹ̀ tí ó fi àwọn àgbá mẹ́rin tó wà nísinsìnyí hàn ní October, 2025

<br/>

## Àwọn Ibi Ìwẹ̀ Tí Wọ́n Fi Ń Dáàbò Bo Ara Wọn 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


! [ì ì ì2 ]](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Àwòrán 2: Àtẹ tí ó ń fi àgbá Orchard hàn ní October, 2025

<br/>

The Orchard Shielded Pool was activated on May 31, 2022 as part of the NU5 network upgrade. Orchard introduced a new shielded protocol that eliminated the need for a trusted setup and became the primary shielded pool used by Unified Addresses (UAs).

Orchard ṣe ilọsiwaju lilo, ṣiṣe, ati aṣiri ni pataki nipasẹ idinku idasilẹ metadata idunadura ati ṣafihan awoṣe idunwo ti o rọ diẹ sii ti o da lori Awọn iṣe dipo awọn titẹsi ati awọn abajade ti a bo.

Today, Orchard remains the primary shielded pool for Zcash. However, the community is evaluating a future migration to a new shielded pool called Ironwood, which would provide additional assurance regarding the integrity of the shielded ZEC supply while preserving Zcash's privacy guarantees.

[Àwọn pọ́ọ̀sì tí a fi ààbò Zcash ṣe]](/site/Using_Zcash/Wallets) now support Orchard. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


! [ì ì ì3 ]](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Àwòrán 3: Àtẹ tí ó ń fi ìsédò Sapling hàn ní October, 2025

<br/>

[Zcash Sapling]](https://z.cash/upgrade/sapling) was an upgrade to the Zcash protocol introduced on 28th of October, 2018. It is a major improvement over the earlier version of the known as Sprout which had some limitations in terms of privacy, efficiency and usability. 

Some of the upgrades include improved performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

Zcash Sapling gba awọn olumulo laaye lati ṣe awọn iṣowo ti ara ẹni ni awọn aaya diẹ nikan nigbati a ba ṣe afiwe si akoko pipẹ ti o gba ni Sprout Series. 

Ààbò ìsòwò ń mú kí ìpamọ̀ pọ̀ sí i, tí kò jẹ́ kí ẹnikẹ́ni kẹta lè so ìsówòpọ̀ àti pinnu iye ZEC tí a ń gbé kiri. Sapling tún ń mú ìmúlò sunwọ̀n sí i nípa fífi àwọn ohun àmúṣọrọ̀ dídánáńgìrì tí ó nílò láti ṣe ìsòsòwò àdáni dín kù nípa jíjẹ́ kí ó ṣeé wọlé fún àwọn oníṣe.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


! [ì ì 1⁄4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Àwòrán 4: Àtẹ tí ó ń fi àgbá Ìdárò hàn láti oṣù October, 2025

Sprout ni àkọ́kọ́ nínú àwọn ìlànà ìpamọ́ tí kò ní ìyọ̀ǹda kankan tí wọ́n ṣe. Ó wáyé ní ọjọ́ kejìdínlọ́gbọ̀n oṣù kẹwàá ọdún 2016.

Awọn adirẹsi Sprout ni a ṣe idanimọ nipasẹ awọn lẹta meji akọkọ wọn eyiti o jẹ "zc" nigbagbogbo. A pe ni "Sprout" fun idi pataki ti tẹnumọ pe sọfitiwia naa jẹ ọdọ, blockchain budding pẹlu agbara nla lati dagba ati ṣiṣi fun idagbasoke. 

Sprout ni a lo bi ohun elo tete fun [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) eyi ti o mu ki pinpin ti ZEC ati Block ere fun Miners. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

! [ì í ì °5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Àwòrán 5: Àtẹ tí ó ń fi àwọn ìsọ̀rí tí ó ṣe kedere hàn ní October, 2025

<br/>

Àdírẹ́ẹ̀sì àpamọ́ tí ó ṣe kedere lórí Zcash máa ń bẹ̀rẹ̀ pẹ̀lú lẹ́tà "t", ìpamọ́ra jẹ́ díẹ̀ ní lílo irú àdírẹ̀ẹ́sì yìí fún àwọn ìnáwó.

Transparent transactions in Zcash are similar to Bitcoin transactions which supports multi-signature transactions and make use of standard public addresses.

Awọn Zcash Transparent ni o wa julọ lo nipa centralized paṣipaarọ lati rii daju nibẹ ni ga transparency ati nẹtiwọki ijẹrisi nigba fifiranṣẹ ati gbigba ZEC laarin awọn olumulo.

It's also important to note that while Zcash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.

<br/>

## Ìlànà tí a dámọ̀ràn fún gbígbé àpò ìsọfúnni lọ

When it comes to considering high level of privacy during transaction on the Zcash Network, it's recommended you follow the below practices;

Transaction occurring between "z to z" wallets on the Zcash blockchain are mostly shielded and it is sometimes called Private Transaction due to the high level of Privacy generated. This is usually the best and the most recommended way of sending and receiving $ZEC when privacy is required. 

---

Nigba ti o ba firanṣẹ ZEC lati "Z-adiresi" si "T-adirẹsi", o wulẹ jẹ ọna kan ti iṣowo Deshielding. Ni iru iṣowo yii, ipele aṣiri ko ga nigbagbogbo bi diẹ ninu alaye yoo han lori blockchain nitori ipa ti fifiranṣẹ ZCE lori Adirẹsii Transparent. A ko ṣe iṣeduro iṣowo Desheelding nigbagbogbo nigbati a nilo aṣiri giga. 

---

Gbigbe ZEC lati Adirẹsi Transparent (T-address) si adirẹẹsi Z ni a mọ nikan bi Shielding. Ni iru iṣowo yii ipele ti aṣiri ko ga nigbagbogbo nigbati a ba ṣe afiwe rẹ si ti iṣowo z-z ṣugbọn o tun ṣe iṣeduro nigbati a nilo aṣiri. 

---

Sending ZEC from a Transparent Address (T-address) to another Transparent Address (T-address) on Zcash Network (T-T transaction) is very similar to that of Bitcoin transaction and this is why T-T transactions on Zcash are always called Public transactions because both the sender and the receiver transaction details becomes visible to the public which makes the level of Privacy very low in such transaction. 

Pupọ awọn paṣipaarọ Cryptocurrency Centralized lo Adirẹsi Transparent ("T-address) nigbati o ba de si iṣowo lori blockchain Zcash ṣugbọn iru iṣowo yii (T-T) kii yoo ni awọn ohun-ini ikọkọ eyikeyi.

<br/>

## Ohun Tó Máa Ṣẹlẹ̀ Lọ́jọ́ Iwájú: Adágún Igi Irin

Ẹgbẹ́ Zcash ń ṣe àgbéyẹ̀wò ìgbìmọ̀ tí wọ́n fẹ́ dáàbò bò, tí a pè ní Ironwood.

Ironwood is designed to address a recently discovered and patched vulnerability in Orchard's proving system. Although there is no evidence that the vulnerability was ever exploited, Ironwood would provide an additional layer of assurance by enabling a controlled migration from Orchard into a newly created shielded pool.

Ero naa kii ṣe lati rọpo aṣiri Zcash, ṣugbọn lati ṣe okunkun igbẹkẹle ninu iduroṣinṣin ti ipese ZEC ti o ni aabo.

## Ní abẹ́ àbá náà:

1. Àwọn nǹkan tuntun tó wà lábẹ́ àwọn apata náà á wá máa ṣẹlẹ̀ sí Ironwood.
2. Awọn owo ti o wa tẹlẹ ti Orchard le gbe lọ si ikọkọ.
3. Ìṣírò owó tí ìjọba ń ṣe lórí àwọn nǹkan tó ń yí padà yóò fúnni ní ẹ̀rí tó lágbára ju ti tẹ́lẹ̀ lọ pé gbogbo owó tó wà lábẹ́ ìbòjú ni a fi ààbò bò.
4. Awọn olumulo yoo tọju awọn idaabobo aṣiri kanna ti wọn nireti lati Zcash.

<br/>
If activated through future network upgrades, Ironwood would become the next generation of Zcash's shielded ecosystem while preserving compatibility with existing shielded funds.

<br/>

## Àwọn Àṣìṣe Tó Wà Lọ́pọ̀lọpọ̀ Tó Yẹ Kó O Yẹra fún

- ** Ifiranṣẹ lati t-adiresi si t-address **  gbangba patapata, ko si asiri. Nigbagbogbo daabobo awọn owo ni akọkọ.
- **Ṣíṣe àdàkàdekè àwọn adirẹsi Sapling àti Orchard**  Àwọn adirẹẹsi Saplings bẹ̀rẹ̀ pẹ̀lú `zs`, Orchard/Àwọn àdírẹ́sì tí ó wà ní ìṣọ̀kan bèèrè fún `u1`
- ** Fifi owó sílẹ̀ nínú pápá ìṣeré Sprout**  Sprout ti di ohun tí kò wúlò mọ́; kó owó lọ sí Orchard
- **Gbigba pe t → z (iboju) jẹ ikọkọ ni kikun**  iṣe ti iboju funrararẹ ni o han lori pq; awọn akoonu ko han

---

## Àwọn ojúewé tó tan mọ́ ọn

- [Àwọn pọ́ọ̀sì](/using-zcash/wallets)  Awọn apamọwọ wo ni o ṣe atilẹyin Orchard ati awọn adagun Sapling
- [Ìṣirò](/using-zcash/transactions)  Bii o ṣe le firanṣẹ awọn idunadura ti o ni aabo
- [Ríra ZEC](/using-zcash/buying-zec)  Gbígba ZEC kí o tó lò ó nínú àwọn àgbájọ
- [Àwọn ZK-SNARKs](/zcash-tech/zk-snarks)  Ìdásílẹ̀ ẹ̀rọ-ìfiwéra ti àwọn ìsọ̀rí tí a fi ààbò bo
- [Kí ni ZEC àti Zcash?](/start-here/what-is-zec-and-zcash)  Ìtàn nípa ìpamọ́ Zcash
