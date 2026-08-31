<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly jarida la habari

ZecWeekly ni jarida ambalo hutoka kila Jumapili asubuhi. Inajumuisha habari zote ambazo zilifanyika wakati wa wiki katika mazingira ya Zcash. Habari hiyo inatunzwa kwa wiki na wanachama wa jamii na viungo vyote muhimu vinaongezwa kwenye jarida hilo. Tafadhali jiandikishe kupata jarida hili la habari [hapa](https://zechub.substack.com/).

## Kuchangia

Newsletter contributions work best when one contributor prepares the edition for the correct week, follows the current bounty or coordination thread, and submits the pull request after the weekly links are ready. Please do not submit a future edition before ZecHub has posted or confirmed the date for that edition. Early pull requests often miss late-week updates, conflict with an assigned curator, or use the wrong deadline.

### 1. Thibitisha toleo la sasa

Kabla ya kuanza kuandika:

- Angalia [ZEC Bounties (Zaka za Mkoa wa Kijijini) ](https://bounties.zechub.wiki/) kwa ajili ya kazi sasa jarida.
- Subiri ili kupewa mgawo

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fork hifadhi ya kumbukumbu

Kama wewe ni mpya kwa GitHub, kutumia mtiririko huu wa kazi:

1. Fungua [ZecHub kuhifadhi](https://github.com/ZecHub/zechub).
2. Bonyeza **Fork** na kuunda uma chini ya akaunti yako GitHub.
3. Katika uma, kuunda tawi mpya kwa ajili ya toleo. jina wazi la tawi ni muhimu kama vile `digest-may-30-2026`.
4. Hakikisha kuvuta ombi lako itakuwa lengo `ZecHub/zechub` kama kumbukumbu ya msingi na `main` kama tawi msingi.

Kama wewe kutumia mstari wa amri, huo kazi ya kufurika inaonekana kama hii:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Badilisha `YOUR-USERNAME` na yako mwenyewe GitHub jina la mtumiaji. URL juu ni placeholder na si kuamua kama ilivyoandikwa.

### 3. Kujenga faili jarida

Tumia [kiolezo cha jarida la habari](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kama hatua yako ya kuanzia. matoleo jarida ni sehemu katika jamii, na kwa sababu hiyo wao kuamua nini cha kufanya ili kupata habari bora zaidi juu yao. [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) folda.

Wakati wa kuunda faili:

- Mechi ya umbizo faili jina aliomba na suala au kutumika kwa matoleo hivi karibuni kukubalika.
- Weka utaratibu sehemu sawa na template isipokuwa kazi anauliza kwa ajili ya muundo tofauti.
- Ongeza viungo kutoka wiki husika tu.
- Andika maelezo mafupi, ya wazi kwa kila kiungo ili wasomaji waelewe ni kwanini ina umuhimu.
- Tafsiri au muhtasari vyanzo vya Kiingereza katika lugha ya kiingereza wakati inahitajika.
- Angalia kila kiungo kabla ya kufungua ombi kuvuta.

### 4. Kukusanya viungo kwa wakati unaofaa

ZecWeekly kawaida inashughulikia shughuli za mazingira ya Zcash kwa wiki inayotumika na inachapishwa karibu mwisho wa juma. Wakati salama ni:

- Kuanza kukusanya viungo baada ya sasa toleo jarida au kazi ni posted.
- Weka mkusanyiko wa maji wakati juma likiwa bado lenye shughuli nyingi.
- Tuma ombi la kuondoa karibu na tarehe ya kuwasilisha iliyoombwa, baada ya kuangalia ikiwa kuna sasisho za mwisho wa wiki.
- Je, si kuwasilisha jarida la wiki ijayo kabla ya kazi kwa tarehe hiyo ipo au kabla ZecHub inathibitisha kwamba unapaswa kuandaa ni.

Ikiwa toleo linasema kuwasilisha kwa tarehe maalum, fuata hiyo. Kama kuna mgogoro kati ya ukurasa huu na suala la sasa, kufuata suala la hivi karibuni.

### 5. Fungua ombi kuvuta

Wakati faili yako jarida ni tayari:

1. Kufanya mabadiliko yako kwa uma wako.
2. Fungua ombi la kuvuta katika `ZecHub/zechub` juu ya `main` tawi.
3. Tumia kichwa kinachofanana na chapa hiyo, kama vile: `Zcash Ecosystem Digest | May 30th`.
4. Kuunganisha suala katika mwili kuvuta ombi hivyo wakaguzi wanaweza kuungana kazi ya kazi.

Mfano wa kuvuta ombi mwili:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Baada ya ombi kuvuta ni wazi, kuangalia kwa ajili ya maoni mapitio. Kama ZecHub anauliza mabadiliko, update tawi sawa badala ya kufungua pili kuondoa ombi la toleo moja.

### Mifano halisi ya mambo yaliyotukia

Tumia maombi haya ya kuunganishwa kwa jarida kama mifano ya uwasilishaji uliokubaliwa:

- [Zcash Ecosystem Digest Aprili 11th.](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest Machi 28th.](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest Februari 14th.](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Wakati kulinganisha kazi yako na mfano, kuzingatia faili eneo la, kichwa format, sehemu ya utaratibu, viungo maelezo, na kama kuvuta ombi unajumuisha nyuma kwa sahihi kazi.

### Makosa ya kawaida kuepuka

- Kufungua ombi kuvuta kabla ya toleo tarehe au kazi ni kuthibitishwa.
- Kufanya kazi juu ya suala ambalo tayari ina uhusiano kuvuta ombi.
- Kuwasilisha ombi kuvuta kwa uma yako mwenyewe badala ya `ZecHub/zechub`.
- Kutumia jina la faili vibaya au kuweka faili nje ya `newsletter` folda.
- Kunakili toleo la zamani bila kurekebisha tarehe, viungo na maelezo.
- Kuongeza viungo kutoka wiki mbaya.
- Kuacha viungo kuvunjwa, duplicate viungo, au mahali-holder maandishi kutoka template.
- Kufungua ombi jipya la kuvuta baada ya kupitia maoni badala ya kusasisha tawi asili.

### Orodha ya mwisho ya kuangalia

Kabla ya kuomba marekebisho, kuthibitisha kwamba:

- Toleo au kazi tarehe mechi yako jarida faili.
- Hakuna ombi lingine la kuvuta tayari linashughulikia suala au toleo moja.
- faili ni katika `newsletter` folda.
- Sehemu template ni kamili.
- Kila kiungo kazi na ina maelezo muhimu.
- Kuvuta mwili ombi viungo suala sahihi.
- Wewe ni inapatikana kwa kufanya mabadiliko kama wakaguzi ombi mabadiliko.

## Matoleo ya zamani

[ZecWeekly Archive - Maandishi ya Ziki za Kila Juma](https://zechub.substack.com/p/archive)
