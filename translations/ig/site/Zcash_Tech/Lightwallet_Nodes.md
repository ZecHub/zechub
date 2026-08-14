<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Lightwallet Nodes (Nọmba nke obere akpa ego)

## Okwu Mmalite

Ọtụtụ ndị mmadụ na-eji Zcash site n'akpa ego dị mfe, nke anaghị ebudata blockchain dum. Kama ọ na -agwa onye nkesa arụworị ọrụ ahụ. Peeji a kọwara ihe sava ndị ahụ bụ, ihe ha nwere ike ịhụ ma enweghị ike ịhụ gbasara gị, otu esi agagharị njikọ gị karịa Tor, yana etu ị ga -esi gbanwee sava akpa ego gị ji eme ihe.

Mpempe abụọ nke ngwanrọ na-eje ozi obere akpa taa. **lightwalletd** bụ ọrụ mbụ, edere ya na Go. **Zaino** bụ ihe ọhụrụ indexer e dere na Rust, wuru dị ka akụkụ nke zcashd deprecation work.

## Ihe ihe nkesa obere akpa na-eme

Ihe nkesa obere akpa dị n'etiti obere akpa gị na Zcash blockchain ma nye ya echiche bandwidth-arụ ọrụ nke agbụ. Ọ na - eme ihe atọ maka gị.

It serves compact blocks. Rather than whole blocks, it sends a compact form carrying only what a wallet needs to detect a payment to its shielded address, detect a spend of its notes, and update its witnesses.

Ọ na-ebugharị azụmahịa gị. Mgbe ị zipụrụ, obere akpa gị nyefere ihe nkesa ahụ emechara ya nke ga-agbasa ozi n'elu netwọkụ ahụ.

Ọ na-aza ajụjụ ndị dị ka, ogo gị ugbu a nakwa ozi gbasara ego ole ị ga-akwụ n'ụgwọ ahụ.

Your wallet still does the private work locally. It holds your keys, trial-decrypts blocks to find your notes, and builds and signs transactions on your device.

## Ihe onye nkesa nwere ike ma ghara ịhụ

Nke a bụ akụkụ nke dị mfe ịghọtahie. Igodo gị anaghị ahapụ ngwaọrụ gị, mana ọ bụghị otu ihe ahụ dịka sava na-amụtaghị banyere gị.

Ihe e zoro aka na ya ebe a bụ ihe ahụ . [Zcash wallet ngwa egwu ihe atụ](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), which is worth reading in full if you care about this. It sets out several kinds of adversary. The one that matters for this page is an adversary who can watch traffic between your wallet and the internet, and between the server and the internet. Whoever runs the server is inherently in part of that position, because your wallet connects to them directly.

Malite na ihe echedoro. megide onye ọ bụla mmegide n'ụdị, gụnyere otu nke mebiri sava ahụ, "enweghị ike ịmụta ihe ọ bụla nke igodo nzuzo nke onye ọrụ (igodo mmefu ego, igodo elele, mkpụrụ okwu, wdg) ", enweghị ike izu ohi gị ego, ma ghara ime ka ị zipụ ego ị bu n'obi iziga. Ọnụ ọgụgụ na memos dị n'ime azụmahịa ndị a kpuchiri kpamkpam ga-anọgide na-ezoro ezo.

Mgbe ahụ enwere ihe a na-echedobeghị. Ihe nlereanya iyi egwu depụtara ndị a dị ka adịghị ike mara megide onye iro nke na-eleba anya n'okporo ụzọ:

◯ Adịghị ike ❑ Olee otú m si eme ihe?
|:--|:--|
| Telling who you are | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
◯ Ịgwa ha ebe ị nọ. ▪ Ilele adreesị IP gị n'ebe a na-edebe ihe ọmụma iji mata kpọmkwem ebe onye ahụ dị.
| Telling that and when you sent or received a shielded transaction | Sending "uses more bandwidth, which is visible even though the connection is encrypted". The model notes that the act of sending and receiving is visible to the server itself |
◯ Ịgụ ole azụmahịa i merela n'oge. ❑ Otu ihe ahụ na-eme mgbe ị na-azụ ahịa, nke a nọgidere na-ahụ ruo ogologo oge karị.
◯ Ịchọpụta usoro ịkwụ ụgwọ ndị na-eme ugboro ugboro. ❑ Ileba anya mgbe ihe mere.
◯ Ịchọpụta ma adreesị ahụ ọ̀ bụ nke gị. Onye iro maarala ebe a na-edebe ego "nwere ike iziga ya n'ebe ahụ, leekwa anya ka o wee hụ ma è nwere ihe ndị ga-emebi bandwit" site n'akpa uwe gị iji nweta ha.

The nlereanya na-egosikwa na nkịtị ikpe assumes "a ntụkwasị obi mmekọrịta n'etiti onye ọrụ na lightwalletd nkesa ọrụ".

So the honest summary is this. A light wallet server cannot spend your money, and it cannot read the amounts or memos in your shielded transactions. What it is well placed to learn is your IP address and the timing of your activity, and those two together can say a lot about a person. Shielded transactions protect what goes on the blockchain. They do not, on their own, hide your connection to the server.

## Ịgagharị na Tor

Tor na-agbaji njikọ dị n'etiti adreesị IP gị na okporo ụzọ obere akpa, nke wepụrụ njirimara kachasị ike na tebụl dị n 'elu.

Nkwado dị na ọba akwụkwọ Rust nke ọtụtụ obere akpa Zcash wuru. zcash_client_backend gụnyere modul Tor e wuru n'elu ya . [Arti na-ekwu, sị:](https://tpo.pages.torproject.net/core/arti/), mmejuputa Rust nke Tor, yabụ obere akpa nwere ike ịhazi mmekọrịta, mgbasa ozi azụmahịa na nyocha ọnụahịa site na Tor n'ebughị onye ahịa Tor dị iche.

Ndị mmepe Zaino na-eme otu arụmụka ahụ, na-ekwu maka ụdị iyi egwu ozugbo: enwere "mkpa iji usoro mbufe amaghị aha (dị ka Nym ma ọ bụ Tor) iji kpuchie njirimara ndị ahịa site na sava ndeksi Zcash".

In **ZODL**, Tor is a setting in Advanced Settings. The wallet's release notes point users to manual connection mode "plus enabling Tor in Advanced Settings" if they "prefer to reduce metadata exposure", and the app offers to turn Tor on before you restore a wallet, which is the moment a fresh IP would otherwise be tied to a whole wallet history.

Two caveats. Tor hides your IP from the server, but it does not change what the server learns from the requests you make. And onion routing adds latency, so syncing takes longer. Running your own server avoids the trust question in a different way, since then the operator is you.

## Zaino, onye na-enyocha ihe ndị e ji eme nchara.

[Zaino (nwa nwanyị)](/site/Zcash_Tech/Zaino) bụ indexer e dere na Rust site Zingo otu, wuru iji dochie lightwalletd dị ka akụkụ nke zcashd deprecation ọrụ. Ọ na-eje ozi ìhè ahịa, zuru ahịa na ngọngọ explorers, ịgụ ihe n'usoro data ẹkenịmde "ma a Zebra ma ọ bụ Zcashd full validator".

It is under active development, with version 0.7.0 released in August 2026. It aims to stay backward compatible with lightwalletd where possible, so wallets can point at it without being rewritten.

Zaino nwere ibe nke ya na eserese ihe owuwu, yabụ peeji a kpuchitere naanị ọrụ ya dị ka sava obere akpa.

## Ndepụta ihe nkesa

Ihe ahụ bụ: [hosh.zec.rocks Ihe ndị dị na peeji nke 2](https://hosh.zec.rocks/zec) dashboard na-enyocha ndị ọrụ ọha na eze na ahụike ha, ọ bụkwa ebe ị ga-elele ihe dị n'ezie. [ọnọdụ.zec.rocks](https://status.zec.rocks/) na-egosi ọnọdụ ọrụ.

Ndị sava edepụtara na dashboard ahụ n'oge edere ederede:

Ihe nkesa. Nkọwapụta.
|:--|:--|
 zec.rocks:443  E depụtara njedebe mpaghara n'akụkụ ya na na.zec.rock, eu.zec .rocks, ap.zec rocks and sa.zec Rocks 
 zec-node.cakewallet.com:443 na Cake Wallet ngalaba
 zec.0xrpc.io:443  Na-agba ọsọ site na 0xRPC, nke na-enye free ọha njedebe maka a ọnụ ọgụgụ nke n'agbụ ma rịọ ka onyinye iji kpuchie ikike
 Zaino.unsafe.zec.rocks:443 A Zaino atụ. Rịba ama aha nnabata, na-emeso ya dị ka nnwale.
☐ testnet.zec.rocks:443 ▸ Testnet, na ihe atụ Zaino testnet edepụtara na zaino.testnet.unsafe.zec .rocks

Lelee dashboard kama ịtụkwasị ndepụta a obi. Ndị na-arụ ọrụ na-abịa ma laa, ibe dị ka nke a ga-aka nká.

## Ịgbanwe sava na akpa gị

Ọ bara uru ime ma ọ bụrụ na ịchọrọ ịhọrọ onye ọrụ ị tụkwasịrị obi, gbasaa ihe omume n'etiti ndị ọrụ, ma ọ bụ gosi gị onwe gị.

Ụzọ menu dị n'okpuru bụ nke ziri ezi mgbe emelitere ibe a, mana wallet interfaces na-agagharị agagharị, yabụ were ha dịka ihe ngosi kama ịbụ ụzọ. Chọọ maka Ntọala di elu ma ọ bụ nhọrọ nkesa.

#### ZODL (n'asụsụ Bekee)

ZODL na-enye a Gbanye nkesa shortcut mgbe sync ọdịda kpatara site ihe nkesa ịbụ nke ụbọchị.

#### Akpa ego Ywallet

Ngwunye na akuku aka nri elu, mgbe ahụ Zcash tab.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo (nwa anụmanụ)

Nchịkọta hamburger dị n'akụkụ aka ekpe elu, mgbe ahụ Ntọala, wee gbadaa.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Nchịkọta nri hamburger dị n'akụkụ aka ekpe elu, mgbe ahụ Ntọala, wee nwee ọganihu.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

E sere nseta ihuenyo ndị ahụ na Machị 2025 ma ngwa ọdịnala ebubatala mbipụta kemgbe, yabụ bọtịnụ nwere ike ịkwaga.

## Ịrụ ọrụ nke aka gị .

Nhọrọ kachasị ike bụ ịbụ onye ọrụ gị, nke na-ewepụ ajụjụ ntụkwasị obi kpamkpam. Ihe nkesa abụọ ahụ mepere emepe: [lightwalletd](https://github.com/zcash/lightwalletd) na-aga ma [Zaino (nwa nwanyị)](https://github.com/zingolabs/zaino) na nchara. Ma agụ site a zuru validator, otú ị ga-achọkwa [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Nchịkọta nke ihe ndị a na-ekwu

Light wallets give you the shielded pool without the disk space, which is a good trade. Just be clear about what you are trading. The server cannot take your funds or read your shielded amounts, but it is well placed to see your IP address and when you transact. Route over Tor, choose your operator deliberately, or run your own.

**Emelitere ikpeazụ:** Ọgọstụ 2026
