<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zero Ujuzi dhidi ya Decoy mifumo ya msingi

"Cryptocurrency inaonyesha shughuli zako zote za matumizi kwa umma kwani ni kama Twitter kwenye akaunti yako ya Benki na hii ni suala kubwa ambalo lazima litatuliwe kwa kupitisha faragha kwenye mnyororo". - Ian Miers katika [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certain crypto projects have gained recognition for their privacy-centric approaches. Zcash is renowned for employing Zero Knowledge Proofs (ZK) to protect transaction amounts and addresses. Monero stands out for its utilization of a Decoy-based sender obfuscation in combination with other encryption schemes to attain user privacy on the blockchain.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Kuelewa ZK uthibitisho na Decoy Mifumo ya Msingi

Zero Knowledge Proofs are cryptographic systems that allow one party (the prover) to demonstrate to another party (the verifier) the validity of a statement without revealing *any underlying information about the statement itself*. In the context of Zcash, ZK proofs are employed to verify the validity of a transaction without disclosing transaction details such as the SENDER, RECEIVER or transaction AMOUNT. 

**Hii inahakikisha kwamba faragha ya mtumiaji inatunzwa kwani shughuli inabaki kuwa ya siri wakati bado inathibitishwa. Teknolojia hii imeundwa kuhakikisha usiri wa shughuli za kifedha kwenye mtandao wa Zcash.**

Katika mifumo Decoy-msingi kama vile [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), shughuli nyingi ni pamoja na kufanya hivyo changamoto au vigumu kufuatilia chanzo halisi na marudio ya fedha. algorithm kuanzisha decoy pembejeo na matokeo katika shughuli pia kutumia encryption ya anwani kutumika kama pembeji & kutumia Range uthibitisho kuthibitisha kiasi kuhamishwa ni spendable. 

Njia hii obfuscates shughuli ya kufuatilia. Matumizi ya pembejeo decoy inafanya kuwa changamoto kwa mtu yeyote kuchambua blockchain kutambua mtumaji halisi, mpokeaji, au kiasi cha manunuzi. 

**Important Note**: This method of on-chain privacy preserving transaction still explicitly reveals (encrypted) inputs to all user transactions. Metadata such as the *FLOW OF TRANSACTIONS* between different users on the network can still be gathered. If an adversary actively participates in generating transactions on the network, it effectively deanonymises the decoy inputs of other users. 


## Faida za ZK juu ya Mifumo ya msingi ya Decoy

Zcash na Monero ni sarafu za siri zinazozingatia faragha, lakini hufikia faragha kwa njia tofauti. 

Here are some advantages of Zcash's zero-knowledge proofs (ZK) over Monero's decoy system:

1) **Ufunuo wa Uchaguzi**: Pamoja na Zcash ZK kipengele kuweka, watumiaji kuwa na chaguo kufunua maelezo ya manunuzi kwa vyama maalum [Soma ECC Blog juu ya Ufafanuzi Selective](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)Katika Zcash, yaliyomo kwenye shughuli zilizohifadhiwa huruhusu watu binafsi kufunua data kutoka kwa uhamisho fulani. Kwa kuongezea, ufunguo wa kutazama unaweza kutolewa kufunua shughuli zote zinazohusiana na anwani maalum iliyohifadhiwe. Kipengele hiki kinaruhusu kufuata kanuni na ukaguzi bila kuathiri faragha ya jumla ya mtandao. 

Wakati Monero ya decoy algorithm (ring saini) husaidia katika kutoa faragha, haina kutoa * kuchagua * ufunuo kwa njia ile ile.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Optional Visibility**: Zcash allows users to choose between transparent (non-private) and shielded (private) transactions. This connotes that Zcash offers users the flexibility to either keep their financial information private (shielded) or make it transparent and publicly available similar to most other blockchains as explained on [Zcash official website](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). This opt-in privacy allows for greater flexibility and business/organisational relevant use cases, as some transactions may require less privacy for public scrutiny, while others benefit from enhanced privacy.


3) ** Anonymity Seti **: The [anonymity kuweka](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) ya zero maarifa kulindwa makundi inajumuisha shughuli zote ambazo * milele * ilitokea. Hii ni kubwa kwa kiasi kikubwa kuliko wengi mbinu nyingine on-mnyororo kwa ajili ya kufikia shughuli unlinkability. Kumbuka: hii inatumika tu kwa shughuli ndani ya makundi sawa kulindwa.

Matumizi ya decoys haina kuongeza anonymity kuweka. Hata hivyo mbinu hii ni tegemezi kabisa juu ya idadi ya * halisi * watumiaji kwenye mtandao. 

4) ** No Trusted Setup**: Zcash's Sprout & Sapling setup utilized a multi-party computation known as the "trusted setup ceremony". The recent NU5 upgrade did not require any Trust in the integrity of the zero knowledge circuit's setup. [Soma Blogi ya ECC kwenye NU5]](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Data Privacy**: Teknolojia ya [zk-SNARK](https://wiki.zechub.xyz/zcash-technology) matumizi katika mabwawa Zcash ya ulinzi inaruhusu kwa kiasi kikubwa kuimarishwa usalama kwa watumiaji. Kupunguza uvujaji metadata on-chain ina maana kwamba watumizi ni salama kutoka kwa wapinzani kama vile walaghai uwezo au vyombo vya serikali ya ukandamizaji. 

Kuna idadi ya matukio ambayo mende wamekuwa kutambuliwa katika Monero ya decoy uteuzi algorithm. mende hizi walikuwa na uwezo wa kufunua matumizi ya mtumiaji kulingana na ripoti kutoka [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Kwa muhtasari kile ambacho ni muhimu zaidi ni kupunguza au kuondoa uvujaji wa habari ya mtumiaji na data kama ilivyoelezwa na Zooko katika [Orchid (priv8) AMA live kikao](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

*** Viungo vya Marejeleo***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



