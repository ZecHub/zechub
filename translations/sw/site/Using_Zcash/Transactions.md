<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Shughuli

ZEC ni mali ya dijiti inayotumiwa sana kwa malipo, ikitoa huduma kali za faragha ambazo zinaifanya iwe bora kwa shughuli anuwai kama kulipa marafiki, kufanya ununuzi, au kuchangia. Ili kuongeza faragha na usalama, ni muhimu kuelewa jinsi aina tofauti za shughuli zinavyofanya kazi ndani ya Zcash.

## Shughuli Shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). The second important thing is moving ZEC to a shielded wallet. When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use YWallet and autoshield your ZEC once received. Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Shughuli za Uwazi

Transparent transactions work similarly but lack privacy protections, making transaction details publicly visible on the blockchain. Transparent transactions should be avoided when privacy is a priority. Note: Transparent wallets may encounter issues due to ZIP-317, which requires fees proportional to transaction complexity. Default fees may lead to rejection or delays, making fee customization crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>


### Usimamizi wa ada kwa ajili ya shughuli uwazi

ZIP-317 Mwongozo: muundo wa ada scales na shughuli ugumu, wanaohitaji marekebisho zaidi ya kiwango cha 0.00001 ZEC ada.
Mfano wa Mahesabu: Utaftaji rahisi wa noti moja unaweza kuhitaji ada ya ZEC 0.0001, ikiongezeka kwa takriban ZEC 0,00005 kwa kila noti ya ziada.

Uhariri ada katika Wallets

Trust Wallet: Access advanced settings by tapping the gear icon while creating a transaction. Kurekebisha Miner Tip Gwei na Max Fee Gwei mashamba kwa uangalifu ili kuepuka shughuli kushindwa. Trust Wallets tu malipo ya mtandao.
Coinomi Wallet: Offers three dynamic fee options Low, Normal, High based on network conditions. For manual adjustments, select Custom on supported coins or use Change Fee in the top-right corner. Users can set fees per byte or kilobyte, impacting confirmation times. Its recommended to use dynamic options if unsure.

Toleo hili linajumuisha mwongozo wa usimamizi wa ada, chaguzi za ada za nguvu, na mipangilio ya ubinafsishaji kwenye Trust Wallet na Coinomi, ikitoa watumiaji maelezo kamili ya kudhibiti ada.

#### Rasilimali

[ZIPS](https://zips.z.cash/)

#### Kumbuka

Tafadhali kumbuka kuwa njia salama ya kutumia ZEC ni kutumia tu shughuli za ulinzi. baadhi ya pochi ni katika mchakato wa utekelezaji [anwani umoja](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) ambayo inaruhusu watumiaji na kubadilishana kuchanganya anwani uwazi na walinzi pamoja. 

## ZEC kwa ZAT Converter
