<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jarida la ZecWeekly

ZecWeekly ni jarida linalotoka kila Jumapili asubuhi. Linajumuisha habari zote zilizotokea wakati wa wiki katika mfumo ikolojia Zcash. Habari hupangwa kila wiki na wanajamii na viungo vyote muhimu vinaongezwa kwenye jarida. Tafadhali jiandikishe kwa jarida [hapa](https://zechub.substack.com/).

## Changia

Michango ya jarida hufanya kazi vizuri zaidi wakati mchangiaji mmoja anapoandaa toleo kwa wiki sahihi, anafuata uzi wa sasa wa zawadi au uratibu, na anapowasilisha ombi la kuvuta baada ya viungo vya kila wiki kuwa tayari. Tafadhali usiwasilishe toleo lijalo kabla ya ZecHub kuchapisha au kuthibitisha tarehe ya toleo hilo. Maombi ya kuvuta mapema mara nyingi hukosa masasisho ya mwishoni mwa wiki, yanakinzana na mratibu aliyepewa, au hutumia tarehe ya mwisho isiyo sahihi.

### 1. Thibitisha toleo la sasa

Kabla ya kuanza kuandika:

- Hundi [ZEC Bounties](https://bounties.zechub.wiki/) kwa kazi ya sasa ya jarida.
- Subiri kupangiwa kazi.
- Matoleo ya jarida yapo katika bendi ya XS ya [sera ya kiasi cha fadhila](https://bounties.zechub.wiki/docs/bounty-amounts)Takwimu ya ZEC kwenye fadhila ya moja kwa moja ni kiasi, si kichwa chochote cha zamani katika miongozo inayochangia.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Funga hazina

Ikiwa wewe ni mgeni kwenye GitHub, tumia mtiririko huu wa kazi:

1. Fungua [Hifadhi ya ZecHub](https://github.com/ZecHub/zechub).
2. Bonyeza **Uma** na unda uma chini ya akaunti yako GitHub.
3. Katika sehemu yako, unda tawi jipya kwa ajili ya toleo. Jina la tawi lililo wazi ni muhimu, kama vile `digest-may-30-2026`.
4. Hakikisha ombi lako la kuvuta litalenga `ZecHub/zechub` kama hazina ya msingi na `main` kama tawi la msingi.

Ukitumia mstari wa amri, mtiririko huo wa kazi unaonekana kama hii:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Badilisha `YOUR-USERNAME` ukitumia jina lako la mtumiaji GitHub. URL iliyo hapo juu ni kishikilia nafasi na haitatatuliwa kama ilivyoandikwa.

### 3. Unda faili ya jarida

Tumia [kiolezo cha jarida](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kama sehemu yako ya kuanzia. Matoleo ya jarida yanafaa katika [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) folda.

Wakati wa kuunda faili:

- Linganisha umbizo la jina la faili lililoombwa na toleo au lililotumiwa na matoleo yaliyokubaliwa hivi karibuni.
- Weka mpangilio sawa wa sehemu na kiolezo isipokuwa kazi iombe umbizo tofauti.
- Ongeza viungo kutoka wiki husika pekee.
- Andika maelezo mafupi na wazi kwa kila kiungo ili wasomaji waelewe kwa nini ni muhimu.
- Tafsiri au fupisha vyanzo visivyo vya Kiingereza kwa Kiingereza inapohitajika.
- Angalia kila kiungo kabla ya kufungua ombi la kuvuta.

### 4. Kusanya viungo kwa wakati unaofaa

ZecWeekly kwa kawaida hushughulikia shughuli za mfumo ikolojia Zcash kwa wiki hii na huchapishwa karibu na mwisho wa wiki. Muda salama zaidi ni:

- Anza kukusanya viungo baada ya toleo au kazi ya sasa ya jarida kuchapishwa.
- Weka rasimu wakati wiki bado inaendelea.
- Tuma ombi la kuvuta karibu na tarehe ya uwasilishaji iliyoombwa, baada ya kuangalia masasisho ya mwishoni mwa wiki.
- Usitume jarida la wiki ijayo kabla ya kazi ya tarehe hiyo kuwepo au kabla ya ZecHub kuthibitisha kwamba unapaswa kuiandaa.

Ikiwa suala linasema liwasilishwe kabla ya tarehe maalum, fuata tarehe hiyo. Ikiwa kuna mgongano kati ya ukurasa huu na suala la sasa, fuata toleo la sasa.

### 5. Fungua ombi la kuvuta

Faili yako ya jarida itakapokuwa tayari:

1. Weka mabadiliko yako kwenye uma wako.
2. Fungua ombi la kuvuta ndani `ZecHub/zechub` kwenye `main` tawi.
3. Tumia kichwa kinacholingana na toleo, kama vile `Zcash Ecosystem Digest | May 30th`.
4. Unganisha tatizo katika sehemu ya ombi la kuvuta ili wakaguzi waweze kuunganisha kazi na kazi hiyo.

Mfano wa mwili wa ombi la kuvuta:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Baada ya ombi la kuvuta kufunguliwa, angalia maoni ya ukaguzi. Ikiwa ZecHub itaomba marekebisho, sasisha tawi lile lile badala ya kufungua ombi la pili la kuvuta kwa toleo lile lile.

### Mifano halisi

Tumia maombi haya ya jarida lililounganishwa kama mifano ya mawasilisho yaliyokubaliwa:

- [Mchoro wa Mfumo Ekolojia Zcash | Aprili 11](https://github.com/ZecHub/zechub/pull/1551)
- [Mchoro wa Mfumo Ekolojia Zcash | Machi 28](https://github.com/ZecHub/zechub/pull/1544)
- [Mchoro wa Mfumo Ekolojia Zcash | Februari 14](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Unapolinganisha kazi yako na mfano, zingatia eneo la faili, umbizo la kichwa, mpangilio wa sehemu, maelezo ya viungo, na kama ombi la kuvuta linaunganishwa tena na kazi sahihi.

### Makosa ya kawaida ya kuepuka

- Kufungua ombi la kuvuta kabla ya tarehe au kazi ya toleo kuthibitishwa.
- Kufanyia kazi suala ambalo tayari lina ombi la kuvuta lililounganishwa.
- Kuwasilisha ombi la kuvuta kwenye uma wako mwenyewe badala ya `ZecHub/zechub`.
- Kutumia jina lisilo sahihi la faili au kuweka faili nje ya `newsletter` folda.
- Kunakili toleo la zamani bila kusasisha kila tarehe, kiungo, na maelezo.
- Kuongeza viungo kutoka wiki isiyofaa.
- Kuacha viungo vilivyovunjika, viungo vinavyorudiwa, au maandishi ya kishikilia nafasi kutoka kwa kiolezo.
- Kufungua ombi jipya la kuvuta baada ya maoni ya ukaguzi badala ya kusasisha tawi la asili.

### Orodha ya mwisho ya ukaguzi

Kabla ya kuomba ukaguzi, thibitisha kwamba:

- Tarehe ya toleo au kazi inalingana na faili yako ya jarida.
- Hakuna ombi lingine la kufungua ambalo tayari linashughulikia toleo au toleo lile lile.
- Faili iko katika `newsletter` folda.
- Sehemu za kiolezo zimekamilika.
- Kila kiungo hufanya kazi na kina maelezo muhimu.
- Mwili wa ombi la kuvuta unaunganisha suala sahihi.
- Uko tayari kufanya marekebisho ikiwa wakaguzi wataomba mabadiliko.

## Matoleo ya awali

[Kumbukumbu ZecWeekly](https://zechub.substack.com/p/archive)
