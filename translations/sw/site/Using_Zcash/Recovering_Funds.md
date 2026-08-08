<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Fund Ufufuzi

** Kwa nini kuweka ufunguo wako binafsi?**

Funguo za kibinafsi ni siri ya usalama wa mali yako digital. Kuweka salama na kamwe kushiriki nao kwa watu wengine ni muhimu.

> Katika muktadha huu ** Mbegu Maneno** inaweza kuonekana kama sawa na ufunguo binafsi.

Kwa kudumisha udhibiti wa funguo zako binafsi, mchakato ahueni ni daima inawezekana. Kuna aina 2 ya Zcash funguo za kibinafsi (uwazi na kulindwa), unaweza kwa urahisi kuagiza yao katika mfuko wako, kama kutumia kazi Sweepe Funds au kuleta kwao kama akaunti mpya. Kwa kuweka udhibiti juu ya funguo yako binafsi, wewe kudumisha kabisa udhibiti mali yako, kuhakikisha umiliki, usalama na amani ya akili.

# Usalama na Wajibu wa Kujiendesha

Ni muhimu kwa watumiaji kuelewa hatari zinazohusika katika kushughulika na funguo za kibinafsi na kuweka hizi kufuli kulindwa kutokana na ufikiaji usioidhinishwa. usalama wa fedha inategemea wajibu mtumiaji ya kuhifadhi yao binafsi keys.

> ** Kabla ya kuanza:** recovery guides used to point at Ywallet. its developer has confirmed it will not be updated for the Ironwood (NU6.3) network upgrade, so it can no longer follow the chain. Use **Zkool**, which is by the same developer and is the maintained successor. Angalia [Ywallet haidumishwi tena]](#ywallet-is-no-longer-maintained) chini ya ukurasa huu.

## Fedha Recovery na Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) ni mrithi wa Ywallet, kutoka kwa developer huo, na inasaidia wote uwazi na kulindwa ahueni.

Hali mbili zimezungumziwa hapa:

1. **Kurejesha akaunti** kutoka kwa neno la mbegu, ufunguo wa kibinafsi au ufunguoo wa kutazama
2. ** Kufuta fedha** nje ya mkoba ambayo tu milele mkono anwani uwazi

### 1) Kurudisha Akaunti

1. Kufunga Zkool kutoka [releases ukurasa]](https://github.com/hhanh00/zkool2/releases) na kuifungua.
2. Katika ** Akaunti Meneja** (ukurasa kuu), bonyeza kitufe cha ** +** kufikia screen ya ** New Account**
3. Ingiza ** Jina la Akaunti** kutambua akaunti hii.
4. Kuwasha ** Rejesha Akaunti?** Hii inaonyesha muhimu na kuzaliwa urefu mashamba
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts a seed phrase, a Sapling secret key, a transparent extended key, or a viewing key
6. Ingiza ** Urefu wa Kuzaliwa** kama unajua takriban wakati mkoba mara ya kwanza kutumika. Hii inaelezea Zkool ambapo kuanza skanning, ambayo anaokoa muda mwingi

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> ** Hakuna urefu wa kuzaliwa?** Acha tupu na uthibitishe onyo. Zkool itachunguza kutoka mwanzo wa mnyororo, ambayo ni polepole lakini haitakosa chochote. Ikiwa fedha zako ziko kabla ya kuboresha Sapling Oktoba 2018, acha wazi badala ya kukisia urefu baadaye, au skana inaweza kuruka shughuli zako kabisa.

7. Hifadhi akaunti, kisha uisawazishe

### Kurudisha mbegu kutoka mkoba tofauti

Kama mbegu alikuja kutoka mkoba mwingine na usawa inaonekana makosa baada ya kulandanisha, mabadiliko anwani derivation ni kawaida kwa nini.

Washa ** chaguo za juu, chini zaidi kwenye skrini ya Akaunti Mpya na washa ** Tumia Mabadiliko ya Ndani kabla ya kuhifadhi.

Wallets wote si kupata mabadiliko anwani kwa njia ileile. kurejesha mbegu ZODL katika Zkool bila kuweka hii inaweza kuonyesha usawa kwamba ni kukosa noti yako ya mabadiliko, ambayo inaonekana kama fedha waliopotea lakini siyo. zana za Zkools kwa kubadili bado inahusu Zashi, ambayo ndiyo jinsi ZOLD kutumika kuitwa.

Mashamba mengine mawili kuishi chini ya ** Advanced Options**:

- **Extra Passphrase (hiari)**, tu kama mkoba wa awali kutumika moja
- **Index Akaunti**, kama mkoba awali uliofanyika akaunti kadhaa juu ya mbegu moja. fedha inaweza kuwa chini ya index tofauti

> ** Hizi mbili tu kuonekana wakati halali mbegu maneno ni katika uwanja muhimu.** Na shamba tupu, au kushikilia binafsi au kuangalia ufunguo, Zkool inaonyesha tu ** Matumizi ya ndani Mabadiliko** na ** H / W Ledger **. Pasta mbegu kwanza, kisha kufungua chaguzi za juu.

### 2) Kufuta Fedha kutoka kwa Mkoba wa Uwazi tu

Kama fedha yako ni katika mkoba kwamba kamwe mkono anwani ulinzi (Trust, Coinomi, Guarda na kama), kurejesha akaunti ya kwanza, kisha hoja fedha ndani ya hifadhi kulindwa.

1. Rejesha akaunti kwa kutumia hatua zilizo juu
2. Fungua akaunti na kwenda kwa ** Kupokea Fedha** ukurasa.
3. Bonyeza kioo cha kuongeza katika bar ya juu (** Tafuta anwani nyingine za uwazi **). Wallets kwamba mzunguko wa anwani, kama vile Ledger na Kutoka, kuzalisha nyingi anwani wazi kutoka mbegu moja, na hii hupata wale wanaoweka fedha
4. **Reset na kulandanisha akaunti baadaye.** anwani mpya kupatikana tu kuchukua mizani yao juu ya scan ijayo, hivyo kuruka hii inafanya kuonekana kama kufagia found nothing
5. Nenda kwenye ukurasa wa ** Tuma**. Karibu na usawa utapata vifungo vitatu vya ikoni. Hawana lebo za maandishi, kwa hivyo weka hover au bonyeza muda mrefu ili uone majina yao:
   - ** Shield One** (mwamba kioo) hatua moja ya uwazi anwani kwa wakati mmoja
   - ** Shield All** (ngome imara) hatua kila kitu kutoka kwa anwani ya wazi mara moja
   - ** Unshield All** (kufungua padlock) huenda njia nyingine, katika anwani ya uwazi

> ** Shield One ni zaidi ya faragha chaguo.** Kuzuia anwani kadhaa katika shughuli moja kwa umma unaunganisha yao kama mali ya mtu mmoja. Zkool anaonya kuhusu hili yenyewe kabla ya kuendesha Shield All.

6. Tathmini shughuli na kutuma ni

Unshield All ni muhimu wakati wa kujiondoa kwa kubadilishana kwamba tu kukubali anwani uwazi. vifungo Shielding kuonekana tu kama akaunti ina anwani ulinzi, na unshield wote tu ikiwa ina moja ya wazi.

## Fedha zilizopatikana na Ironwood pool

Tangu Ironwood (NU6.3) kuboresha ulioamilishwa tarehe 28 Julai 2026, Orchard pool ni kutumia tu. Hakuna thamani mpya inaweza kuingia ndani yake, na zilizopo dhamana majani kupitia turnstile katika Ironwood.

Kama fedha yako kurejeshwa ni katika Orchard, wao itabidi kuhamia kabla ya tabia kwa kawaida. Fungua orodha akaunti na kuchagua ** Kumbuka Uhamisho** . Chaguo tu inaonekana wakati kuna kweli kitu cha kuhama.

Kiwambo ni jina lake ** Orchard kwa Ironwood Uhamiaji** na anaendesha katika awamu mbili. Kwanza yeye splits yasiyo ya kawaida noti katika matabaka standard, kisha huchukua maelezo hayo moja kwa wakati mmoja. ** Migration Speed** ni slider kutoka Ultra Fast to Slow kwamba seti kuchelewa random kati ya hatua. ** Kuanza uhamiaji ** inaendeshwa mchakato staged background, na unaweza kufunga ukurasa na kuendelea baadaye. ** One Shot ** hufanya hivyo katika kupita moja.

Kila hatua ni shughuli yake mwenyewe, hivyo kila mmoja hulipa ada.

> ** kiasi cha uhamiaji ni umma.** Wakati thamani msalaba turnstile, kiwango na block urefu zinaonekana kwenye mlolongo, hata kama mtumaji na mpokeaji kukaa ulinzi. kipekee kiasi unaweza kutambua wewe, hivyo wanapendelea hatua ya uhamisho kwa kasi polepole juu moja risasi, na kufikiria routing uhusiano wako kupitia Tor au VPN kwanza ili anwani yako IP si amefungwa kwa kiasi ulichohama.

## Deep Recovery na ZExCavator

[ZExCavator]](https://github.com/zingolabs/zexcavator) ni chombo cha kufufua kutoka Zingo Labs kwa ajili ya kesi ambapo kurejesha kawaida haifanyi kazi, kama vile faili iliyoharibiwa au sehemu.

> Mwisho wake update kabla ya upgrades wa hivi karibuni mtandao, hivyo kutibu kama mapumziko na kuthibitisha yoyote kufufuliwa funguo katika kuhifadhiwa mkoba kabla kutegemea matokeo.

## Ywallet haidumishwi tena.

Ywallet ilikuwa kifaa cha kupona kilichopendekezwa kwenye ukurasa huu kwa muda mrefu, na miongozo mingi ya zamani bado inaonyesha.

Wallets ambazo haziungi mkono sheria za sasa hazitakuwa na uwezo wa kujenga shughuli halali, kwa hivyo haiwezi kutumiwa tena kuhamisha pesa zilizopatikana. ** Zkool** ni mrithi aliyeendelea na ndio ukurasa huu unatumia sasa.

Kama tayari una fedha kukaa katika Ywallet, kurejesha sawa mbegu maneno ya ndani Zkool kutumia hatua hapo juu.

## Kurasa zinazohusiana na makala hii

- [Mifuko ya fedha](/using-zcash/wallets) - ambayo pochi ni iimarishwe na Ironwood yao tayari
- [Ironwood](/zcash-tech/ironwood) - nini kuboresha iliyopita na kwa nini fedha kuhamia
- [Memo za](/using-zcash/memos) - jinsi memo encrypted kazi
- [Kuona funguo za]](/zcash-tech/viewing-keys) - kusoma tu kupata bila matumizi ya nguvu
