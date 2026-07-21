<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo Payment Processor: Kukubali Zcash Bila Uhifadhi

ZGo ni mchakato wa malipo yasiyo ya ulinzi kwa Zcash. Mteja hulipa katika ZEC kutoka mkoba wao wenyewe, ZGo hufuatilia blockchain ya Zcash kwa shughuli hiyo, na fedha huwasili moja kwa moja kwenye mkoba wa mfanyabiashara kupitia uhamisho wa kulindwa. ZGo haishiki pesa kati.

Mwongozo huu unaelezea jinsi mtiririko wa malipo unavyofanya kazi, jinsi ya kuanzisha akaunti, na jinsi ya kujumuisha ZGo na Xero na WooCommerce. Pia inashughulikia makosa mawili ambayo husababisha shida nyingi za usanidi wa mara ya kwanza.

## Kwenye ukurasa huu

1. [Kwa nini kutumia ZGo](#why-use-zgo)
2. [Jinsi ZGo kazi](#how-zgo-works)
3. [Kuanzisha akaunti](#setting-up-an-account)
4. [ZGo na Xero](#zgo-with-xero)
5. [ZGo na WooCommerce](#zgo-with-woocommerce)
6. [Vipengele](#features)
7. [Makosa ya kawaida](#common-mistakes)
8. [Hitimisho](#conclusion)
9. [Rasilimali](#resources)

## Kwa nini kutumia ZGo

Fedha kwanza nchi katika akaunti ya processor na ni kuelekezwa kwa mfanyabiashara baadaye, ambayo ina maana ya mtu wa tatu kudhibiti fedha kwa muda na wanaweza kufungia, kuchelewesha, au ripoti juu yake.

ZGo inachukua mbinu kinyume. Malipo hoja kutoka mkoba mteja moja kwa moja kwa mkoba wa mfanyabiashara kupitia shughuli Zcash ulinzi. processor tu inazalisha ankara na anaangalia blockchain kwa uthibitisho. Hakuna usawa wa kati, hakuna mtiririko uondoaji, na hakuna mtu wa tatu ambaye anaweza kushikilia makazi.

Kwa mfanyabiashara, hii inamaanisha mambo matatu ya vitendo: utunzaji kamili wa ZEC inayoingia, faragha ya shughuli iliyohifadhiwa kwa chaguo-msingi, na hakuna utegemezi kwa mtoa huduma wa kati anayekaa mkondoni au mtoaji.

## Jinsi ZGo inavyofanya kazi

mtiririko wa malipo ni sawa bila kujali kama ZGo ni kutumika standalone, kupitia Xero, au kupitia WooCommerce:

1. Mfanyabiashara huunda ombi la malipo katika ZGo, ambayo hutoa kama nambari ya QR na kiasi, kitambulisho cha ankara, na anwani ya kupokea Zcash.
2. Mteja scans QR na mkoba Zcash (Orchard, Sapling, na aina ya anwani Uwazi ni wote mkono juu ya Plugin WordPress) na inakubali malipo.
3. shughuli ni matangazo kwa mtandao Zcash kama kuhamisha ulinzi kutoka mkoba mteja kwa mkoba wa mfanyabiashara.
4. ZGo hufuatilia blockchain Zcash kwa ajili ya shughuli.
5. Baada ya uthibitisho wa tano, ZGo alama ya malipo kama mwisho na taarifa yoyote kushikamana ushirikiano (Xero, WooCommerce, au webhook).

Kiwango cha tano uthibitisho ni namba muhimu. Kitu chochote mapema ni malipo katika maendeleo, si malipo kupokea. utekelezaji Order, updates hesabu, na hatua yoyote irreversible upande mfanyabiashara lazima kusubiri kwa ajili ya hatua 5.

ZGo anaendesha katika kivinjari yoyote ya kisasa kwenye desktop au simu, bila kufunga upande wowote. mteja anahitaji mkoba Zcash; mfanyabiashara anahitaji Zcash mkoba na akaunti ZGo.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Kuanzisha akaunti

To create a ZGo account, a Zcash wallet with a small amount of ZEC is required. The small ZEC balance covers the on-chain fee for the account-initialization transaction. Any major Zcash wallet works for this; see [ZecHub Wallets](https://zechub.wiki/wallets) kwa chaguzi za sasa.

Mpangilio wa msingi:

1. Fungua [zgo.cash](https://zgo.cash/) katika kivinjari.
2. Kujenga akaunti kwa kutumia mkoba Zcash chini ya udhibiti wa mfanyabiashara. mkoba huu lazima kushikilia funguo. anwani ya amana kubadilishana si kazi (tazama [Makosa ya kawaida](#common-mistakes)).
3. Kuthibitisha mkoba kwa kutuma shughuli ndogo ya utangulizi.
4. Configure anwani ya kupokea. Malipo yote kusindika kupitia akaunti hii itakuwa nchi katika mkoba huu.

Mara baada ya akaunti ni hai, mfanyabiashara huo unaweza kutumia ZGo kwa ajili ya malipo ya mara moja (msimbo mmoja QR katika tukio pop-up) au waya yake katika kuanzisha kudumu kupitia Xero au WooCommerce.

## ZGo na Xero

[Xero](https://www.xero.com/) ni wingu uhasibu jukwaa kutumika na biashara nyingi ndogo na za kati. ushirikiano ZGoXero inaruhusu mfanyabiashara kutoa ankara katika Xero, kuwa mteja kulipa katika ZEC, na kuwa Xero moja kwa moja alama ankara kama kulipwa mara moja shughuli inathibitisha.

Jinsi inavyofanya kazi:

1. mfanyabiashara huunda ankara katika Xero kama kawaida.
2. ZGo inaunganisha chaguo la malipo ya Zcash kwenye ankara.
3. Mteja hulipa katika ZEC kupitia mkoba wao.
4. ZGo kufuatilia [Zcash blockchain](https://z.cash/) kwa ajili ya shughuli.
5. Baada ya uthibitisho wa tano, ZGo inaripoti malipo nyuma kwa Xero, ambayo alama ankara kama kutatuliwa.

The ZEC lands in the merchant's wallet, not in any ZGo-controlled or Xero-controlled account. The accounting record in Xero stays in sync with the on-chain settlement automatically.

Kwa kuanzisha mara ya kwanza, kufuata walkthrough maalum: [Xero Integration Configuration](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo na WooCommerce

Kwa maduka ya mtandaoni inayoendesha kwenye [WooCommerce](https://woocommerce.com/) na [WordPress](https://wordpress.org/), ZGo hutoa Plugin ya kujitolea. Plugin anaongeza Zcash kama njia ya malipo wakati wa malipo na hushughulikia hali ya utaratibu moja kwa moja wakati malipo inathibitisha.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

End-to-mwisho mtiririko ndani ya duka WooCommerce:

1. Mteja anafikia checkout na huchagua Zcash kama njia ya malipo.
2. Plugin inazalisha ombi la malipo na inaonyesha nambari ya QR kwenye ukurasa wa malipo.
3. Mteja analipa kutoka kwenye mkoba wake.
4. shughuli matangazo kwa mtandao Zcash na ZGo huanza kufuatilia yake.
5. Baada ya uthibitisho tano, ZGo ripoti ya malipo kama mwisho kwa Plugin.
6. Plugin alama WooCommerce ili kama kulipwa na updates ili database.

Amri ni tu kulipwa wakati hatua 6 kukamilika. hali ya awali (utangazaji, uthibitisho wa kwanza) inaweza kuonyeshwa kwa mteja kama "malipo kupokea, kusubiri uthibitishaji", lakini hesabu, kutimiza, na yoyote mtiririko automatisering lazima kusubiri hali ya mwisho.

Plugin pia inaweka dashibodi ya kiutawala ndani ya WordPress, ambapo mfanyabiashara anaweza kufuatilia maagizo na malipo ya ZEC inayoingia pamoja na mtazamo wa kawaida wa agizo la WooCommerce. Plugin inasaidia aina zote za anwani za Zcash za sasa: Orchard, Sapling, na Uwazi. Wateja wanaolipa kutoka kwa mkoba wowote unaofaa wanaweza kukamilisha shughuli.

## Sifa

**Non-custodial.** Malipo hoja moja kwa moja kutoka mkoba wa mteja kwa mkoba ya mfanyabiashara kupitia shughuli ulinzi. ZGo kamwe ana fedha katika kati, na mfanyakazi anaendelea udhibiti kamili wakati wote.

** Utekelezaji rahisi.** ZGo inaweza kutumika kwa alasiri moja katika soko pop-up, kwa ajili ya kudumu uhakika-wa-kuuza kuanzisha, au kama backend kwa duka online kupitia Xero au WooCommerce integrations.

** Browser-msingi.** Hakuna kufunga juu ya wala mteja au wafanyabiashara upande. ZGo anaendesha katika browser yoyote ya kisasa kwenye desktop au simu.

**Wallet compatibility.** Major Zcash wallets, including those supporting Orchard, Sapling, and Transparent address types, can pay a ZGo invoice without extra configuration on the customer's side.

**Integrations.** moja kwa moja integrations na Xero (uhasibu) na WooCommerce (e-commerce) kufunika mbili kawaida mfanyabiashara workflows nje ya sanduku.

## Makosa ya kawaida

**Treating the order as paid before five confirmations.** A broadcast transaction is not the same as a confirmed payment. The transaction can still fail to confirm or be replaced. Only after five confirmations does ZGo report the payment as final, and only then should the order be marked paid downstream. If a merchant configures inventory or fulfilment to trigger on the broadcast event, fraudulent or failed payments will cause real losses.

**Pointing ZGo at an exchange deposit address.** It looks like a Zcash address, but exchange deposit addresses are controlled by the exchange, not the merchant. The exchange holds the keys, which means the exchange holds the funds, which defeats the reason for using a non-custodial processor. The wallet address configured in ZGo must be a wallet whose seed phrase the merchant controls directly.

ZGo ni mchakato wa malipo, si mkoba. Haina kuhifadhi funguo, kushikilia mizani, au basi mfanyabiashara kutumia fedha. tofauti Zcash mkoba chini ya udhibiti wa mfanyibiashara inahitajika kupokea fedha kwamba ZGo njia.

## Matokeo

ZGo inatoa wafanyabiashara njia ya kukubali malipo Zcash bila kutoa juu ya utunzaji, bila kutegemea mpatanishi, na bila kufichua maelezo ya manunuzi kwenye mlolongo wa umma. integrations mbili (Xero na WooCommerce) kufunika kawaida workflows mfanyabiashara; kwa kila kitu kingine, ZGo inaweza kutumika standalone kutoka kivinjari yoyote.

Kwa kuanzisha, njia ni fupi: kupata mkoba Zcash, kuunda akaunti katika [zgo.cash](https://zgo.cash/), na ama kuanza kuzalisha maombi ya malipo moja kwa moja au kufunga ushirikiano husika.

## Rasilimali

- [ZGo tovuti rasmi](https://zgo.cash/)
- [Xero Ushirikiano Configuration kutembea kwa njia](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) na [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash mradi ukurasa wa nyumbani](https://z.cash/)
- [ZecHub pochi](https://zechub.wiki/wallets), orodha ya wallets Zcash sambamba
- [ZecHub Malipo Processors maelezo ya jumla](https://zechub.wiki/payment-processors), ZGo katika muktadha wa chaguzi nyingine Zcash malipo
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), kuhusiana ZecHub mwongozo kwa ajili ya mbadala binafsi mwenyeji
