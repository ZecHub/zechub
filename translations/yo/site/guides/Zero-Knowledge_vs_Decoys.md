<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìmòye Òní lòdì sí Àwọn Ẹ̀rọ Tí Ó Gbé Orí Ìdẹkùn Lárugẹ

"Cryptocurrency n ṣafihan gbogbo awọn iṣẹ inawo rẹ si gbogbo eniyan niwon o jẹ bi Twitter si akọọlẹ Banki rẹ ati pe eyi jẹ ọrọ nla ti o gbọdọ yanju nipasẹ gbigba lori asiri pq. " - Ian Miers ni [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certain crypto projects have gained recognition for their privacy-centric approaches. Zcash is renowned for employing Zero Knowledge Proofs (ZK) to protect transaction amounts and addresses. Monero stands out for its utilization of a Decoy-based sender obfuscation in combination with other encryption schemes to attain user privacy on the blockchain.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Imọye Awọn ẹri ZK ati Awọn eto ti o da lori Decoy

Zero Knowledge Proofs are cryptographic systems that allow one party (the prover) to demonstrate to another party (the verifier) the validity of a statement without revealing *any underlying information about the statement itself*. In the context of Zcash, ZK proofs are employed to verify the validity of a transaction without disclosing transaction details such as the SENDER, RECEIVER or transaction AMOUNT. 

**Eyi ṣe idaniloju pe aṣiri olumulo ni a tọju bi iṣowo naa ti wa ni igbekele lakoko ti o tun jẹ ifọwọsi. A ṣe apẹrẹ imọ-ẹrọ yii lati rii daju asiri ti awọn iṣowo owo lori nẹtiwọọki Zcash.**

Ni awọn Decoy-orisun awọn ọna šiše bi [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), multiple transactions are combined making it challenging or difficult to trace the actual source and destination of funds. The algorithm introduces decoy inputs and outputs in transactions also employing encryption of the addresses used as inputs & using Range proofs to validate the amount transferred is spendable. 

Ọ̀nà yìí máa ń pa àlàfo ìsòwò náà mọ́. Lílo àwọn ìsọfúnni tí ó jẹ́ àdàbà máa ń mú kí ó nira fún ẹnikẹ́ni tó bá ń ṣe àgbéyẹ̀wò blockchain láti mọ ẹni tí ó ránṣẹ́, ẹni tó gbà á, tàbí iye ìsówò náà. 

**Important Note**: This method of on-chain privacy preserving transaction still explicitly reveals (encrypted) inputs to all user transactions. Metadata such as the *FLOW OF TRANSACTIONS* between different users on the network can still be gathered. If an adversary actively participates in generating transactions on the network, it effectively deanonymises the decoy inputs of other users. 


## Awọn anfani ti ZK lori Awọn eto ti o da lori Decoy

Zcash àti Monero jẹ́ àwọn owó-ìpamọ́ tí ó dá lórí ìpamọ̀, ṣùgbọ́n wọ́n ṣe àṣírí ìpamọ́ ní ọ̀nà ọ̀tọ̀ọ̀tò̀. 

Eyi ni diẹ ninu awọn anfani ti awọn ẹri-imọ-nọmba Zcash (ZK) lori eto ẹtan Monero:

1) **Selective Disclosure**: With Zcash ZK feature set, users have the option to reveal transaction details to specific parties [Read ECC Blog on Selective Disclosure](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). In Zcash, shielded transactions' encrypted contents allow individuals to selectively reveal data from a particular transfer. Additionally, a viewing key can be provided to disclose all transactions associated with a specific shielded address. This feature allows for regulatory compliance and auditability without compromising the overall privacy of the network. 

Lakoko ti alugoridimu decoy Monero (iforukọsilẹ oruka) ṣe iranlọwọ ni ipese asiri, ko funni ni ifihan * yanilenu * ni ọna kanna.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Optional Visibility**: Zcash allows users to choose between transparent (non-private) and shielded (private) transactions. This connotes that Zcash offers users the flexibility to either keep their financial information private (shielded) or make it transparent and publicly available similar to most other blockchains as explained on [Zcash official website](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). This opt-in privacy allows for greater flexibility and business/organisational relevant use cases, as some transactions may require less privacy for public scrutiny, while others benefit from enhanced privacy.


3) **Aṣayan Aṣayan Àìmòye**: [Awọn ohun ti a ko mọ]](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) of zero knowledge shielded pools comprises all transactions that have *ever* occurred. Eyi tobi pupọ ju ọpọlọpọ awọn ọna on-chain miiran lọ lati ṣaṣeyọri unlinkability idunadura. Akọsilẹ: eyi kan nikan si awọn iṣowo laarin iṣupọ aabo kanna.

Lilo awọn decoys ṣe mu ki a mọ ẹni ti a ṣeto. Sibẹsibẹ ọna yii da lori iye awọn olumulo * gidi * lori nẹtiwọọki. 

4) **No Trusted Setup**: Zcash's Sprout & Sapling setup utilized a multi-party computation known as the "trusted setup ceremony". The recent NU5 upgrade did not require any Trust in the integrity of the zero knowledge circuit's setup. [Ka ECC Blog lori NU5] Àtúnṣe tuntun sí NU5 kò nílò ìgbẹ́kẹ̀lé kankan nínú ìwà títọ́ ìtòlẹ́sẹẹsẹ ìmọ òfo.](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) ** Ìpamọ́ Ìsọfúnni**: Ẹ̀rọ [zk-SNARK technology](https://wiki.zechub.xyz/zcash-technology) used in Zcash's shielded pools allows for significantly enhanced security for users. The reduction of metadata leakage on-chain means that users are safe from adversaries such as potential hackers or oppressive state bodies. 

There are a number of instances in which bugs have been identified in Monero's decoy selection algorithm. These bugs had the potential to reveal user spends according to a report from [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Ni akojọpọ ohun ti o ṣe pataki julọ ni lati dinku tabi yọkuro didasilẹ ti alaye olumulo ati data bi a ti ṣalaye nipasẹ Zooko ni [Orchid (priv8) AMA live session](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

Àwọn ìjápọ̀ ìsọfúnni

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



