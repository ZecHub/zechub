<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Jarida la habari [Newsletter]

ZecWeekly ni jarida la habari linalotumwa kila Jumapili asubuhi. Linajumuisha habari zote zilizotokea wakati wa wiki katika mfumo ikolojia wa Zcash. Habari huchaguliwa kila wiki na wanajamii, na viungo vyote vinavyohusika huongezwa kwenye jarida la habari. Tafadhali jiandikishe kwa jarida la habari [hapa](https://zechub.substack.com/).

## Changia

Michango ya jarida la habari hufanya kazi vyema zaidi pale mchangiaji mmoja anapoandaa toleo la wiki sahihi, anafuata fadhila au mjadala wa sasa wa uratibu, na kuwasilisha pull request baada ya viungo vya kila wiki kuwa tayari. Tafadhali usiwasilishe toleo la siku zijazo kabla ya ZecHub kuchapisha au kuthibitisha tarehe ya toleo hilo. Pull request za mapema mara nyingi hukosa masasisho ya mwisho wa wiki, hugongana na mhariri aliyeteuliwa, au hutumia tarehe ya mwisho isiyo sahihi.

### 1. Thibitisha toleo la sasa

Kabla ya kuanza kuandika:

- Angalia [ZEC Bounties](https://bounties.zechub.wiki/) kwa kazi ya sasa ya jarida la habari.
- Subiri uteuliwe.
- Matoleo ya jarida la habari yako katika kiwango cha XS cha sera ya [kiasi cha fadhila](https://bounties.zechub.wiki/docs/bounty-amounts). Kiasi cha ZEC kwenye fadhila ya moja kwa moja ndicho kiasi sahihi, wala si kichwa chochote cha zamani katika miongozo ya uchangiaji.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Tengeneza fork ya hazina

Ikiwa wewe ni mgeni katika GitHub, tumia mtiririko huu wa kazi:

1. Fungua hazina ya [ZecHub](https://github.com/ZecHub/zechub).
2. Bofya **Fork** na utengeneze fork chini ya akaunti yako ya GitHub.
3. Katika fork yako, tengeneza tawi jipya la toleo hilo. Jina wazi la tawi husaidia, kama vile `digest-may-30-2026`.
4. Hakikisha pull request yako italenga `ZecHub/zechub` kama hazina msingi na `main` kama tawi msingi.

Ikiwa unatumia safu ya amri, mtiririko huo wa kazi unaonekana hivi:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Badilisha `YOUR-USERNAME` kwa jina lako mwenyewe la mtumiaji wa GitHub. URL iliyo hapo juu ni kishikilia nafasi na haitatatuliwa kama ilivyoandikwa.

### 3. Unda faili ya jarida la habari

Tumia [kiolezo cha jarida la habari](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kama mwanzo wako. Matoleo ya jarida la habari yanawekwa katika folda ya [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Unapounda faili:

- Linganisha muundo wa jina la faili unaoombwa na issue au unaotumiwa na matoleo ya hivi karibuni yaliyokubaliwa.
- Dumisha mpangilio uleule wa sehemu kama katika kiolezo isipokuwa kazi inaomba muundo tofauti.
- Ongeza viungo vya wiki husika pekee.
- Andika maelezo mafupi na wazi kwa kila kiungo ili wasomaji waelewe kwa nini kina umuhimu.
- Tafsiri au fupisha vyanzo visivyo vya Kiingereza kwa Kiingereza inapohitajika.
- Kagua kila kiungo kabla ya kufungua pull request.

### 4. Kusanya viungo kwa wakati unaofaa

ZecWeekly kwa kawaida hushughulikia shughuli za mfumo ikolojia wa Zcash za wiki ya sasa na huchapishwa karibu na mwisho wa wiki. Wakati salama zaidi ni:

- Anza kukusanya viungo baada ya issue au kazi ya sasa ya jarida la habari kuchapishwa.
- Hifadhi rasimu wakati wiki bado inaendelea.
- Wasilisha pull request karibu na tarehe iliyoombwa ya uwasilishaji, baada ya kukagua masasisho ya mwisho wa wiki.
- Usiwasilishe jarida la habari la wiki zijazo kabla ya kazi ya tarehe hiyo kuwepo au kabla ya ZecHub kuthibitisha kwamba unapaswa kuliiandaa.

Ikiwa issue inasema uwasilishe kufikia tarehe mahususi, fuata tarehe hiyo. Ikiwa kuna mgongano kati ya ukurasa huu na issue ya sasa, fuata issue ya sasa.

### 5. Fungua pull request

Wakati faili yako ya jarida la habari iko tayari:

1. Commit mabadiliko yako kwenye fork yako.
2. Fungua pull request kuelekea `ZecHub/zechub` kwenye tawi la `main`.
3. Tumia kichwa kinacholingana na toleo, kama vile `Zcash Ecosystem Digest | May 30th`.
4. Unganisha issue katika mwili wa pull request ili wakaguzi waweze kuunganisha kazi na jukumu.

Mfano wa mwili wa pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Baada ya pull request kufunguliwa, fuatilia maoni ya ukaguzi. Ikiwa ZecHub anaomba marekebisho, sasisha tawi lilelile badala ya kufungua pull request ya pili kwa toleo lilelile.

### Mifano halisi

Tumia pull request hizi zilizounganishwa za jarida la habari kama mifano ya mawasilisho yaliyokubaliwa:

- [Muhtasari wa Mfumo Ikolojia wa Zcash | Aprili 11](https://github.com/ZecHub/zechub/pull/1551)
- [Muhtasari wa Mfumo Ikolojia wa Zcash | Machi 28](https://github.com/ZecHub/zechub/pull/1544)
- [Muhtasari wa Mfumo Ikolojia wa Zcash | Februari 14](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Unapolinganisha kazi yako na mfano, zingatia eneo la faili, muundo wa kichwa, mpangilio wa sehemu, maelezo ya viungo, na iwapo pull request inaunganishwa na kazi sahihi.

### Makosa ya kawaida ya kuepuka

- Kufungua pull request kabla ya tarehe ya toleo au kazi kuthibitishwa.
- Kufanyia kazi issue ambayo tayari ina pull request iliyounganishwa.
- Kuwasilisha pull request kwenye fork yako mwenyewe badala ya `ZecHub/zechub`.
- Kutumia jina lisilo sahihi la faili au kuweka faili nje ya folda ya `newsletter`.
- Kunakili toleo la zamani bila kusasisha kila tarehe, kiungo, na maelezo.
- Kuongeza viungo vya wiki isiyo sahihi.
- Kuacha viungo vilivyoharibika, viungo vinavyojirudia, au maandishi ya kishikilia nafasi kutoka kwenye kiolezo.
- Kufungua pull request mpya baada ya maoni ya ukaguzi badala ya kusasisha tawi la awali.

### Orodha ya mwisho ya ukaguzi

Kabla ya kuomba ukaguzi, thibitisha kwamba:

- Tarehe ya issue au kazi inalingana na faili yako ya jarida la habari.
- Hakuna pull request nyingine iliyo wazi ambayo tayari inashughulikia issue au toleo lilelile.
- Faili iko katika folda ya `newsletter`.
- Sehemu za kiolezo zimekamilika.
- Kila kiungo kinafanya kazi na kina maelezo yenye manufaa.
- Mwili wa pull request unaunganisha issue sahihi.
- Unapatikana kufanya marekebisho iwapo wakaguzi wataomba mabadiliko.

## Matoleo yaliyopita

[ZecWeekly Kumbukumbu](https://zechub.substack.com/p/archive)
