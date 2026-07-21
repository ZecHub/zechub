<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly jarida

ZecWeekly ni jarida ambalo hutoka kila Jumapili asubuhi. Inajumuisha habari zote zilizotokea wakati wa wiki katika mazingira ya Zcash. Habari huhifadhiwa kila wiki na wanajamii na viungo vyote muhimu vinaongezwa kwenye jarida. Tafadhali jiandikishe kwa jarida [hapa](https://zechub.substack.com/).

## Kuchangia

Newsletter contributions work best when one contributor prepares the edition for the correct week, follows the current bounty or coordination thread, and submits the pull request after the weekly links are ready. Please do not submit a future edition before ZecHub has posted or confirmed the date for that edition. Early pull requests often miss late-week updates, conflict with an assigned curator, or use the wrong deadline.

### 1. Thibitisha toleo la sasa

Kabla ya kuanza kuandika:

- Angalia [ZEC Bounties ](https://bounties.zechub.wiki/) kwa ajili ya sasa jarida kazi.
- Kusubiri kwa kupewa

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. Fork hifadhi

Kama wewe ni mpya kwa GitHub, kutumia mtiririko huu kazi:

1. Fungua [ZecHub hifadhi](https://github.com/ZecHub/zechub).
2. Bonyeza **Fork** na kuunda uma chini ya akaunti yako GitHub.
3. Katika uma, kuunda tawi mpya kwa ajili ya toleo. jina wazi tawi ni muhimu, kama vile `digest-may-30-2026`.
4. Kuhakikisha yako kuvuta ombi itakuwa lengo `ZecHub/zechub` kama kumbukumbu ya msingi na `main` kama tawi msingi.

Kama wewe kutumia mstari wa amri, huo kazi mtiririko inaonekana kama hii:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Kujenga faili jarida

Tumia [newsletter template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kama hatua yako ya kuanzia. matoleo jarida ni sehemu ya [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) folda.

Wakati wa kuunda faili:

- Linganisha umbizo la jina la faili lililoombwa na suala hilo au linalotumiwa na matoleo ya hivi karibuni yaliyokubaliwa.
- Weka utaratibu huo wa sehemu kama template isipokuwa kazi anauliza kwa ajili ya muundo tofauti.
- Ongeza viungo kutoka wiki husika tu.
- Andika maelezo mafupi, ya wazi kwa kila kiungo ili wasomaji waelewe kwa nini ni muhimu.
- Tafsiri au muhtasari vyanzo vya Kiingereza katika Kiingereza wakati inahitajika.
- Angalia kila kiungo kabla ya kufungua ombi kuvuta.

### 4. Kukusanya viungo kwa wakati unaofaa

ZecWeekly kawaida inashughulikia shughuli za mazingira ya Zcash kwa wiki ya sasa na inachapishwa karibu na mwisho wa wiki. Wakati salama ni:

- Kuanza kukusanya viungo baada ya sasa toleo jarida au kazi ni posted.
- Weka mkusanyiko wakati juma likiwa bado lenye shughuli nyingi.
- Tuma ombi la kuondoa karibu na tarehe ya kuwasilisha iliyoombwa, baada ya kuangalia ikiwa kuna sasisho za mwisho wa wiki.
- Je, si kuwasilisha jarida la wiki ijayo kabla ya kazi kwa tarehe hiyo ipo au kabla ZecHub inathibitisha kwamba unapaswa kuandaa ni.

Ikiwa toleo linasema kuwasilisha kwa tarehe maalum, fuata tarehe hiyo. Ikiwa kuna mgongano kati ya ukurasa huu na toleo la sasa, fuateni toleo hili la sasa.

### 5. Kufungua ombi kuvuta

Wakati faili yako jarida ni tayari:

1. Kufanya mabadiliko yako kwa uma wako.
2. Fungua ombi la kuvuta katika `ZecHub/zechub` juu ya `main` tawi.
3. Tumia kichwa kinachofanana na chapa hiyo, kama vile `Zcash Ecosystem Digest | May 30th`.
4. Kuunganisha suala katika mwili kuvuta ombi hivyo wakaguzi wanaweza kuunganisha kazi kwa kazi.

Mfano kuvuta ombi mwili:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Baada ya ombi kuvuta ni wazi, kuangalia kwa maoni mapitio. Kama ZecHub anauliza kwa ajili ya mabadiliko, update tawi sawa badala ya kufungua ombi pili kuvuta kwa toleo moja.

### Mifano halisi

Tumia maombi haya ya kuunganishwa kwa jarida kama mifano ya mawasilisho yaliyokubaliwa:

- [Zcash Ecosystem Digest] Aprili 11](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest] Machi 28](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest] Februari 14](https://github.com/ZecHub/zechub/pull/1474)


![Kuunganishwa ZecWeekly jarida kuvuta ombi mfano](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

Wakati kulinganisha kazi yako na mfano, kuzingatia faili eneo, kichwa format, sehemu ya utaratibu, viungo maelezo, na kama kuvuta ombi unajumuisha nyuma kwa kazi sahihi.

### Makosa ya kawaida ya kuepuka

- Kufungua ombi kuvuta kabla ya toleo tarehe au kazi ni kuthibitishwa.
- Kufanya kazi juu ya suala kwamba tayari ina kiungo kuvuta ombi.
- Kuwasilisha ombi kuvuta kwa uma yako mwenyewe badala ya `ZecHub/zechub`.
- Kutumia jina la faili vibaya au kuweka faili nje ya `newsletter` folda.
- Kunakili toleo la zamani bila kurekebisha tarehe, viungo, na maelezo.
- Kuongeza viungo kutoka wiki mbaya.
- Kuacha viungo kuvunjwa, viungo duplicate, au maandishi placeholder kutoka template.
- Kufungua ombi jipya la kuvuta baada ya kupitia maoni badala ya kusasisha tawi la asili.

### Orodha ya mwisho ya kuangalia

Kabla ya kuomba marekebisho, kuthibitisha kwamba:

- Toleo au kazi tarehe mechi yako jarida faili.
- Hakuna ombi lingine la kuvuta tayari linashughulikia suala au toleo moja.
- faili ni katika `newsletter` folda.
- Sehemu template ni kamili.
- Kila kiungo kazi na ina maelezo muhimu.
- Mwili kuvuta ombi viungo suala sahihi.
- Wewe ni inapatikana kwa kufanya mabadiliko kama wakaguzi ombi mabadiliko.

## Matoleo ya zamani

[ZecWeekly Archive](https://zechub.substack.com/p/archive)
