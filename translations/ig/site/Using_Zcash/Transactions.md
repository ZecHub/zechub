<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ihe ndị e mere eme

ZEC bụ akụ dijitalụ eji eme ihe maka ịkwụ ụgwọ, na-enye atụmatụ nzuzo siri ike nke mere ka ọ dị mma maka azụmahịa dị iche iche dịka ịkwụ ndị enyi gị ego, ịzụta ma ọ bụ inye onyinye. Iji bulie nchekwa na nchebe kachasị elu, ọ dị mkpa ịghọta etu ụdị azụmahịa si arụ ọrụ n'ime Zcash .

## TL;DR

- Zcash na-akwado ụdị azụmahịa abụọ: **shielded**, nke na-eme ka nkọwa ndị ahụ bụrụ ihe nzuzo, yana **transparent**, bụ nke edekọ ha n'ihu ọha.
- Adreesị echedoro na-amalite site na: `u` or `z`. Adreesị ndị na-enweghị ihe ọ bụla malitere site na: `t` na-akpa àgwà dị ka adreesị Bitcoin.
- Nhọrọ bụ nke gị na ugwo ọ bụla. Nzuzo bu nhọrọ Zcash nyere gi, obughi ihe onye ozo kpebiri maka gi.
- Iwepụ ego na mgbanwe bụ ebe ndị mmadụ kachasị atụfu nzuzo. Ọ bụrụ na mgbanwe ahụ kwadoro naanị iwepu ihe doro anya, chebe onwe gị ozugbo ha rutere.
- Ụgwọ ndị na-eso [ZIP 317](https://zips.z.cash/zip-0317) na-etolite site n'ogo nke azụmahịa ahụ. Wallets ka na-eziga ụgwọ ochie nwere ike ịhụ azụmaahịa ha egbu oge.

## Azụmahịa Ndị E Chebere

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). The second important thing is moving ZEC to a shielded wallet. When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use YWallet and autoshield your ZEC once received. Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Mmekọrịta Na-egosi Ihe Dị Iche

Transparent transactions work similarly but lack privacy protections, making transaction details publicly visible on the blockchain. Transparent transactions should be avoided when privacy is a priority. Note: Transparent wallets may encounter issues due to ZIP-317, which requires fees proportional to transaction complexity. Default fees may lead to rejection or delays, making fee customization crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

## Otú Dị Mfe Isi Chebara Ya Echiche

A transparent transaction is a postcard. The postman delivers it, but anyone who handles it along the way can read the message, see who sent it and see who receives it.

Mgbasa ozi a na-echebe bụ envelopu e mechiri emechi. Ọrụ nzipu ozi ka kwenyere na ezigbo akwụkwọ ozi nwere ezi posta gafere usoro ahụ, ọ dịghịkwa onye nwere ike ịgha ụgha ma ọ bụ zipụ otu leta ugboro abụọ. Ihe dị n'ime envelopụ nọgidere n'etiti onye zitere ya na onye natara ya.

Ihe dị mkpa bụ na Zcash ga-eme ka ị kpebie nke i kwesịrị iziga, kwụọ ụgwọ ọ bụla.

## Nchịkwa ụgwọ maka azụmahịa ndị doro anya

ZIP-317 Ntuziaka: Ụgwọ ụgwọ na-agbanwe agbanwe site n'ịdị mgbagwoju anya nke azụmahịa, chọrọ mgbanwe karịrị ọkọlọtọ 0.00001 ZEC.
Ihe Nlereanya Ngụkọta: Mmekọrịta dị mfe nke otu akwụkwọ nwere ike ịchọ ụgwọ 0.0001 ZEC, na-abawanye site n'ihe dịka 0,00005 ZEC kwa ederede ọzọ.

Ịdezi ụgwọ na Wallets

Trust Wallet: Nweta ntọala dị elu site na ịpị akara ngosi gia mgbe ị na-eke azụmahịa. Gbanwee Miner Tip Gwei na Max Fee Gwei ubi nke ọma iji zere ọdịda azụmahịa. Atụmatụ ego naanị ebubo ụgwọ netwọk .
Coinomi Wallet: Offers three dynamic fee options Low, Normal, High based on network conditions. For manual adjustments, select Custom on supported coins or use Change Fee in the top-right corner. Users can set fees per byte or kilobyte, impacting confirmation times. Its recommended to use dynamic options if unsure.

## Ihe Ndị A Na-emekarịhie Emeghị

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Wallets](https://zechub.wiki/using-zcash/wallets) peeji na-edepụta nke a maka nhọrọ ọ bụla.
- **Iwepụ ego na adreesị doro anya ma hapụ ego ahụ n'ebe ahụ.** Mwepu onwe ya bụ ọha, yana mmegharị ọ bụla sitere na adiresi a ga-anọgide bụrụ nke ọha. Chekwaa ego ozugbo ha rutere.
- **Idozi nzuzo dịka ihe ị na-agbanye otu ugboro.** Mgbasa ozi ọ bụla bụ nhọrọ dị iche. Izipu echedoro taa anaghị eme ka ụgwọ akwụghị ụgwọ nke i mere n'izu gara aga ghara ịdị irè.
- **Itinye adreesị doro anya maka ihe niile.** Ebe ọ bụ na a ga-ahụ ọrụ nke ọma, otu adres e ji eme ihe ọzọ na-ejikọta ego ndị ahụ n'ụzọ dị nwayọọ.
- ** Izipu na ụgwọ ndabara ochie.** Wallets ndị ejighi ZIP 317 nwere ike iziga ego nkwụghachi azụ nke okenye, nke nwere ike ịhapụ azụmahịa n'enweghi mmesi obi ike.

## Ihe edeturu

Biko rịba ama na ụzọ kachasị nchebe iji ZEC bụ naanị iji azụmahịa echekwara. Ụfọdụ obere akpa ego nọ n'usoro mmejuputa [adreesị dị iche iche](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) nke na-enye ohere ka ndị ọrụ na mgbanwe jikọta adreesị doro anya ma kpuchie ọnụ.

## Akụnụba

[ZIPS] Ihe na-eme ka ọ dị mma.](https://zips.z.cash/)

## Peeji ndị metụtara ya

- [Ebe ego ndị dị na ya](/using-zcash/wallets)  nke wallets akwado shielded eziga, na ndị bụ naanị uzo.
- [Egwuregwu Ndị E Chebere](/using-zcash/shielded-pools)  Sapling na Orchard, ọdọ mmiri gị echekwara ego bi n'ime ya
- [Ihe ncheta](/using-zcash/memos)  ozi ezoro ezo nke nwere ike ịga njem na azụmahịa echekwara.
- [Adreesị mgbanwe doro anya](/using-zcash/transparent-exchange-addresses)  Adreesị TEX na ihe kpatara mgbanwe ji eji ha eme ihe
- [Mgbanwe nke Ndị Nọ n'Ụlọ Mkpọrọ](/using-zcash/custodial-exchanges)  nke mgbanwe na-akwado ekpuchi withdrawals

## ZEC ka onye ntụgharị nke ZAT
