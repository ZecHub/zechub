<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Shughuli za biashara

ZEC ni mali ya dijiti inayotumiwa sana kwa malipo, ikitoa huduma kali za faragha ambazo zinaifanya iweze kutumika katika shughuli anuwai kama kulipa marafiki, kununua au kutoa mchango. Ili kuongeza faragha na usalama, ni muhimu kuelewa jinsi aina tofauti za shughuli hufanya kazi ndani ya Zcash .

## TL;DR

- Zcash inasaidia aina mbili za shughuli: ** ulinzi wa**, ambayo huweka maelezo binafsi na * uwazi wa*, ambao rekodi yao hadharani.
- Anwani za kulindwa huanza na `u` or `z`. anwani uwazi kuanza na `t` na kutenda sana kama anwani Bitcoin.
- Chaguo ni lako kwa kila malipo. faragha ni chaguo Zcash inakupa, si kuweka mtu mwingine anaamua kwako.
- Kuondoa kutoka kubadilishana ni mahali pa kawaida watu kupoteza faragha. Kama kubadilisha tu inasaidia uondoaji wa uwazi, kulinda fedha mwenyewe mara moja wao kuwasili.
- Ada kufuata [ZIP 317](https://zips.z.cash/zip-0317) Wallets bado kutuma ada ya zamani gorofa wanaweza kuona shughuli zao kuchelewa.

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

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). Jambo la pili muhimu ni kuhamisha ZEC kwa mkoba wa kulindwa. Wakati utoaji wa ZEC kutoka kubadilishana, unahitaji kujua ikiwa ubadilishaji unasaidia kutoa ulinzi au wazi. Ikiwa wanakubali pesa zilizohifadhiwa, unaweza tu kuchukua ZEC kwenye anwani yako iliyohifadhiwe. Kama kubadilishi inasaidia tu kutolewa kwa uwazi, basi unahitaji kutumia YWallet na autoshield zako za ZEC mara moja kupokea. Kutumia shughuli zilizolindwa kutuma na kupokea fedha ndiyo njia bora ya kudumisha faragha na kupunguza hatari ya kuvuja data

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

## Njia Rahisi ya Kuona Mambo Macho kwa Picha

Upatikanaji wa wazi ni kadi ya posta. Mjumbe huitoa, lakini mtu yeyote anayeshughulikia ujumbe huo njiani anaweza kuusoma na kuona aliyetuma au anayepokea barua hiyo.

Upatikanaji wa ulinzi ni bahasha iliyofungwa. Huduma ya posta bado inathibitisha kwamba barua halisi na posho halisi ilipita kupitia mfumo, na hakuna mtu anayeweza kuiba au kutuma barua hiyo mara mbili. Yaliyomo kwenye bahasha hubaki kati ya mtumaji na mpokeaji.

Sehemu muhimu ni kwamba Zcash inakuwezesha kuamua ambayo moja kutuma, malipo kwa kulipa.

## Ada ya Usimamizi kwa ajili ya shughuli uwazi

ZIP-317 Mwongozo: muundo wa ada scales na shughuli ugumu, zinahitaji marekebisho zaidi ya kiwango cha 0.00001 ZEC.
Mfano wa Mahesabu: Utaftaji rahisi wa noti moja unaweza kuhitaji ada ya ZEC 0.0001, ikiongezeka kwa takriban ZEC 0,00005 kwa kila notisi ya ziada.

Uhariri ada katika Wallets

Trust Wallet: Access advanced settings by tapping the gear icon while creating a transaction. Kurekebisha Miner Tip Gwei na Max Fee Gwei mashamba kwa uangalifu ili kuepuka shughuli kushindwa. Trust Wallets tu malipo ya mtandao ada.
Coinomi Wallet: Offers three dynamic fee options Low, Normal, High based on network conditions. For manual adjustments, select Custom on supported coins or use Change Fee in the top-right corner. Users can set fees per byte or kilobyte, impacting confirmation times. Its recommended to use dynamic options if unsure.

## Makosa ya Kawaida

- ** Kwa kudhani kuwa yoyote ya orodha za mkoba ZEC inaweza kutuma faragha.** Idadi kadhaa ya pochi nyingi zinaunga mkono upande wa uwazi wa Zcash tu. Angalia mifuko inayoungwa mkono na mkoba kabla ya kutegemea kwa faragha. [Mifukoni](https://zechub.wiki/using-zcash/wallets) ukurasa orodha hii kwa kila chaguo.
- ** Kuondoa kwa anwani ya uwazi na kuacha fedha huko.** Uondoaji yenyewe ni umma, na kila harakati baadaye kutoka kwenye anwani hiyo inabaki kuwa wazi pia. Kulinda pesa mara tu zinapofika.
- **Kutibu faragha kama kitu wewe kugeuka juu mara moja.** Kila shughuli ni uchaguzi tofauti. Kutuma ulinzi leo haina undo uwazi malipo uliyofanya wiki iliyopita.
- **Kutumia tena anwani ya uwazi kwa kila kitu.** Kwa sababu shughuli za uwazi zinaonekana daima, anwani moja inayotumiwa mara nyingi huunganisha malipo ambayo hayakuwa na sababu yoyote ya kuunganishwa.
- ** Kutuma na ada ya zamani isiyofaa.** Pochi ambazo hazijachukua ZIP 317 bado zinaweza kutuma malipo ya mapema, ambayo yanaweza kuacha shughuli bila kuthibitishwa.

## Kumbuka:

Tafadhali kumbuka kuwa njia salama ya kutumia ZEC ni kwa kutumia tu shughuli za ulinzi. baadhi pochi ni katika mchakato wa utekelezaji [anwani umoja](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) ambayo inaruhusu watumiaji na kubadilishana kuchanganya anwani uwazi na walinzi pamoja.

## Rasilimali

[ZIP](https://zips.z.cash/)

## Kurasa Zinazohusiana

- [Mifuko ya fedha](/using-zcash/wallets)  ambayo pochi msaada shielded kutuma, na ambazo ni uwazi tu
- [Bwawa za Kuhifadhi](/using-zcash/shielded-pools)  Sapling na Orchard, mabwawa yako ulinzi fedha kuishi katika
- [Memo za](/using-zcash/memos)  ujumbe encrypted ambayo inaweza kusafiri na shughuli ulinzi
- [Anwani za Kubadilishana Uwazi](/using-zcash/transparent-exchange-addresses)  TEX anwani na kwa nini kubadilishana kuzitumia
- [Mabadilishano ya Walinzi](/using-zcash/custodial-exchanges)  ambayo kubadilishana msaada shielded uondoaji

## ZEC kwa ZAT Converter
