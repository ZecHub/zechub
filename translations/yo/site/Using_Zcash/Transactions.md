<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Àwọn Àdéhùn Ìṣirò

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## TL;DR

- Zcash ṣe atilẹyin awọn iru iṣowo meji: **shielded**, eyiti o tọju alaye naa ni ikọkọ, ati **transparent**, ti o gba wọn silẹ gbangba.
- Àwọn àdírésì tí a fi ààbò bo bẹ̀rẹ̀ pẹlú: `u` or `z`. Àwọn àdírẹ́sì tí ó ṣe kedere bẹ̀rẹ̀ pẹ̀lú: `t` ó sì máa ń ṣe bíi àdírẹ́sì Bitcoin.
- Ìpínlẹ̀ ìpamọ́ jẹ àyè tí Zcash fún ọ, kìí ṣe ipò ti ẹlòmíràn pinnu rẹ.
- Yíyọ kúrò nínú ilé ìfowópamọ́ jẹ́ ibi tí àwọn ènìyàn ti máa ń pàdánù ààbò ara ẹni. Bí ilé-ìfowópárò bá ṣe atilẹyin fún ṣíṣípadà owó lọ ní ọ̀nà tó mọlẹ, dáàbò bo owó náà fúnra rẹ nígbàtí wọ́n dé.
- Àwọn owó tó wà nísàlẹ̀ [ZIP 317](https://zips.z.cash/zip-0317) àwọn àpamọ́ owó tí wọ́n ṣì ń fi iye kan pàtó ránṣẹ́ lè rí i pé ìnáwó wọn máa pẹ̀yìn.

## Àwọn Àdéhùn tí a fi ààbò bo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). The second important thing is moving ZEC to a shielded wallet. When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use YWallet and autoshield your ZEC once received. Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Àwọn Ìṣirò Tó Ṣeé Ṣàlàyé Ní gbangba-gbàǹgbà

Transparent transactions work similarly but lack privacy protections, making transaction details publicly visible on the blockchain. Transparent transactions should be avoided when privacy is a priority. Note: Transparent wallets may encounter issues due to ZIP-317, which requires fees proportional to transaction complexity. Default fees may lead to rejection or delays, making fee customization crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>

## Ọ̀nà Rírẹwà Láti Mọ Bí Ìṣẹ̀lẹ̀ Náà Ṣe Máa Rí Lójú Ẹnì Kan

A transparent transaction is a postcard. The postman delivers it, but anyone who handles it along the way can read the message, see who sent it and see who receives it.

Àdéhùn tí a fi ààbò ṣe jẹ́ envelopu tó ti di ìdákọ́ńkó. Ẹ̀ka ìfìwéránṣẹ́ náà ṣì ń fìdí rẹ múlẹ̀ pé lẹ́tà gidi kan pẹ̀lú owó ẹrù ojúlówó kọjá nípasẹ̀ ètò, kò sì séèyàn kankan tó lè forí kọ ọ̀kan tàbí kó rán ìwé kan náà lọ léèmejì. Ohun tí ó wà nínú àpòòwé máa dúró láàárín ẹni tó bá firanṣẹ àti onítìgbà.

Ohun tó ṣe pàtàkì ni pé Zcash jẹ́ kó o pinnu èyí tí wàá fi ránṣẹ́, ìsanwó nípasẹ̀ owó.

## Owó Ìdarí fún Àwọn Iṣẹ́ Àṣejù

ZIP-317 Ìtọ́ni: Àlàfo owó náà ń yí padà pẹ̀lú ìdàgbàsókè àwọn ìṣòwò, tó sì gba àtúnṣe kọjá iye tí wọ́n máa ń san ní 0.00001 ZEC.
Àpẹẹrẹ Ìṣirò: Iṣẹ́-ṣiṣe tí ó rọrùn fún owó ọ̀sán kan lè gba owo 0.0001 ZEC, tó fi àpapọ̀ nǹkan bí 0,00005 ZEC kún iye owó ọjà.

Àwọn Owó Àtúnṣe nínú Wallets

Trust Wallet: Wọlé ìtòlẹ́sẹẹsẹ àtúnṣe nípa fífi àmì gear nígbà tí o bá ń dá ìṣòwò kan. Ṣàṣàtúnṣe Miner Tip Gwei àti Max Fee Gwei pẹ̀lú àkíyèsí láti yẹra fún ìdásẹ̀yìn òfowó-ìpamọ́. Ìrètí wallet nìkan gba owó ẹrù nẹtiwọki.
Coinomi Wallet: Offers three dynamic fee options Low, Normal, High based on network conditions. For manual adjustments, select Custom on supported coins or use Change Fee in the top-right corner. Users can set fees per byte or kilobyte, impacting confirmation times. Its recommended to use dynamic options if unsure.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Wallets](https://zechub.wiki/using-zcash/wallets) ojúewé yìí ṣe àkójọ àwọn nǹkan wọ̀nyí fún àyè kọ̀ọ̀kan.
- **Gbígba owó lọ sí adirẹsi tí ó ṣe kedere àti fífi àwọn ìnáwó náà sílẹ̀ níbẹ̀.** Gbigba owó fúnra rẹ̀ jẹ́ ti gbogbo ènìyàn, ati pé gbogbo ìgbésè láti orí àdírẹsì yẹn yóò wà ní gbangba pẹlú. Ṣójútó owó nígbàtí wọ́n bá débẹ̀.
- **Ṣíṣe ìpamọ́ bí ohun tí o fi sílò lẹ̀ẹ̀kan.** Ìṣirò kọ̀ọ̀kan jẹ ìpinnu tó yàtọ̀. Fífi ààbò ránṣẹ́ lónìí kò yí owó ọjà kan padà, èyí ti ẹ san lọ́sẹ̀ to kọjá.
- **Lílo adirẹsi tí ó ṣe kedere fún ohun gbogbo.** Nítorí pé iṣẹ́ tó ń jẹ́ kí nǹkan hàn gbangba wà ní wíwà títí, àdírẹ́sì kan ṣoṣo tá a tún lò máa ń so àwọn ìsanwó pọ̀ síra wọn díèdíẹ̀.
- ** Ifiranṣẹ pẹlu owo ti o wa tẹlẹ.** Awọn apamọwọ ti ko gba ZIP 317 le tun firanṣẹ awọn agbalagba iye owo, eyi ti o le fi idunadura silẹ ni ijoko.

## Àkíyèsí

Jọwọ ṣe akiyesi pe ọna ti o ni aabo julọ lati lo ZEC jẹ lilo awọn iṣowo ipamọ nikan. Diẹ ninu awọn apamọ wa ni ilana imuse [awọn adirẹsi iṣọkan](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) tí ó jẹ́ kí àwọn olùṣàmúlò àti ilé-ìpamọ̀ lè pa àdírésì tó ṣe kedere àti èyí tí a fi ààbò bo pọ̀.

## Àwọn Owó-ìṣúnná owó

[Àmì ìdìpọ̀ tí a fi ń ṣàpèjúwe](https://zips.z.cash/)

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn àpamọ́wọ́n](/using-zcash/wallets)  àwọn àpò tí ó ń ṣe ìfọwọ́sí sí fífi èdìdì ránṣẹ́, àti èyí tó jẹ́ pé ìmọ̀ nìkan ni wọ́n fi ń ríran.
- [Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Pa Mọ́](/using-zcash/shielded-pools)  Sapling àti Orchard, àwọn adágún tí owó rẹ tó wà lábẹ́ ìbòjú ń gbé inú wọn.
- [Àwọn ìwé ìrántí](/using-zcash/memos)  àwọn ìsọfúnni tí a fi kọ̀ǹpútà ṣe, èyí tó lè rìnrìn àjò pẹlú ìṣòwò kan tí ó ní ìdènà.
- [Àwọn Àdúgbò Ìpàdé Tó Ṣeé Ríran](/using-zcash/transparent-exchange-addresses)  Àwọn àdírẹ́sì TEX àti ìdí tí àwọn ilé-ìtajà fi ń lò wọ́n.
- [Ìpàdé àyípadà ẹ̀wọ̀n](/using-zcash/custodial-exchanges)  àwọn ilé-ìtajà wo ló ń ṣe àtìlẹ́yìn fún ìsínwó tí a fi ọ̀pá dì?

## ZEC sí Olùyípadà ZAT
