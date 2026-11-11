<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Jumbe

## Kwa Ufupi

* Ujumbe [memo] ni dokezo fupi unaloambatanisha na malipo [payment] yanayotumwa kwa anwani ya faragha [shielded address]. Umesimbwa kwa usimbaji fiche [encryption], hivyo watu wanaotazama blockchain hawawezi kuusoma.
* Sehemu ya ujumbe hubeba hadi baiti 512 za maandishi.
* Watu hutumia jumbe kueleza ni nani aliyetuma malipo na yalikuwa ya nini, au kutuma ujumbe wa faragha.
* Malipo kwa anwani za uwazi [transparent addresses] hayawezi kubeba ujumbe.
* Kiungo cha [ombi la malipo](/using-zcash/payment-request-uris) kinaweza kujaza ujumbe kwa niaba yako ili duka liweze kutambulisha kila agizo.

## Maelezo ya Msingi

### Kutuma Jumbe Zilizosimbwa kwa Usimbaji Fiche

Unapotuma muamala [transaction] wa Z2Z (kutoka faragha hadi faragha), unaweza kujumuisha ujumbe katika muamala. Ujumbe huu unaweza kutumika kwa mambo kadhaa tofauti.

### Kutia Saini Miamala

Jumbe hutumika hasa kutia saini malipo. Kwa kuwa miamala ya faragha husimba data yako kwa usimbaji fiche, huwezi kuona ni nani aliyekutumia ZEC na ZEC ilikuwa kwa ajili ya nini. Watumiaji wanaweza kutumia sehemu ya ujumbe kutia saini jina lao au jina bandia ili kumjulisha mhusika mwingine muamala ulitoka kwa nani. Pia wanaweza kueleza muamala ulikuwa wa nini.

### Kutuma Ujumbe

Matumizi [use case] mengine ya ujumbe uliosimbwa kwa usimbaji fiche ni kutuma ujumbe kwa mtu mwenye z-addr. Jumbe hizi zinaweza kuwa kuhusu chochote, iwe ni [ukumbusho kwa rafiki](https://twitter.com/iansagstette/status/1542142468505870336) au [ujumbe nyeti unaohitaji kubaki wa faragha iwezekanavyo](https://twitter.com/InsideZcash/status/1545800146352578560).

### Madokezo ya Mapenzi kwenye Blockchain

Kulikuwa na mtu aliyemtumia mwenzi wake dokezo la mapenzi katika mojawapo ya block [block] za kwanza kwenye blockchain ya Zcash. Mtu fulani aligundua kuwa mwenzi wake alikuwa amemtumia faili kupitia Zcash ujumbe. Faili hii ilikuwa tiketi ya tukio maalumu ng'ambo ya nchi ambalo yeye na mpenzi wake wa mbali walikuwa wakizungumza kuhusu kulihudhuria pamoja. Ujumbe huo ulikuwa dokezo la mapenzi.

## Taswira / Mfano

Fikiria malipo ya faragha kama bahasha iliyofungwa yenye fedha ndani. Ujumbe ni dokezo lililokunjwa pamoja na fedha.

Blockchain ni ofisi ya posta. Hubeba bahasha na kurekodi kwamba imewasili, wala haiifungui. Mtu anayefungua bahasha husoma dokezo. Malipo ya uwazi ni kadi ya posta, hivyo hakuna bahasha ya kukunjia dokezo.

## Uchambuzi wa Kina

### Kinachotoshea katika ujumbe

Sehemu ya ujumbe huwa na baiti 512 kila wakati. Ujumbe mfupi wa maandishi hujazwa kwa baiti sifuri kabla ya kusimbwa kwa usimbaji fiche, hivyo kila ujumbe huonekana kuwa na ukubwa sawa on-chain.

Jumbe nyingi ni maandishi ya kawaida ya UTF-8. [ZIP 302](https://zips.z.cash/zip-0302) pia huhifadhi jumbe zinazoanza kwa baiti ya `0xF5` au zaidi kwa aina nyingine za data, na ujumbe wa `0xF6` unaofuatwa na sufuri humaanisha “hakuna ujumbe”.

Kila toweo la faragha katika muamala hubeba ujumbe wake mwenyewe, hivyo muamala mmoja unaowalipa watu kadhaa unaweza kujumuisha dokezo tofauti kwa kila mmoja wao.

### Kina

> **Kihistoria. Onyesho hili halifanyi kazi tena kama lilivyoandikwa.**
>
> Onyesho lililo hapa chini linatumia zcashd, na [hati yake ya kupokea](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) husoma jumbe kupitia `zcash-cli`. zcashd ilifikia kusimamishwa kwake kiotomatiki kwa Mwisho wa Usaidizi tarehe 18 Julai 2026, hivyo hati hiyo haiwezi kufikia node inayofanya kazi, na haijahamishwa.
>
> Kusoma jumbe za faragha kutoka mstari wa amri bado hufanya kazi kwenye Zallet: `zallet rpc z_listunspent` hurejesha kila dokezo la faragha lililopokelewa pamoja na sehemu ileile ya `memoStr` inayosomwa na hati. Tazama [Zallet Mwongozo wa Marejeo ya Haraka](/using-zcash/zallet-quick-reference-guide) kwa amri, na [mwongozo wa uhamishaji kwenda Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ili kuhamisha node kutoka zcashd. Zallet bado iko katika beta.
>
> Sehemu hii imehifadhiwa kama rekodi ya kihistoria ya onyesho la Magic-Wormhole.

Hivi ndivyo unavyotumia Zcash Jumbe za Faragha pamoja na CLI ya Magic-Wormhole na zcashd kutuma faili kwa usalama kutoka kompyuta moja hadi nyingine!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="ONYESHO: Uhamishaji wa Faili Uliosimbwa kwa Usimbaji Fiche kwa kutumia Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Kurasa Zinazohusiana

- [URI za Ombi la Malipo](/using-zcash/payment-request-uris): weka ujumbe katika kiungo cha `zcash:` au msimbo wa QR.
- [Miamala](/using-zcash/transactions): aina za miamala ya faragha na ya uwazi.
- [Mabwawa ya Faragha](/using-zcash/shielded-pools): mahali ambapo madokezo ya faragha yanayobeba jumbe huhifadhiwa.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Ujumbe wa Faragha kupata pochi zinazounga mkono jumbe.
- [Zallet Mwongozo wa Marejeo ya Haraka](/using-zcash/zallet-quick-reference-guide): soma jumbe zilizopokelewa kutoka mstari wa amri.
- [Vifaa vya Watayarishi vya Zcash](/using-zcash/creators-and-tips): vifaa vya kudokeza vinavyotuma ujumbe pamoja na dokezo.

### Rasilimali

[Sehemu ya Ujumbe Uliosimbwa kwa Usimbaji Fiche](https://electriccoin.co/blog/encrypted-memo-field/)

**Ilisasishwa mwisho:** Oktoba 2026
