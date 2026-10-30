<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jumbe [Memos]

## Kwa Ufupi

* Ujumbe ni dokezo fupi unaloambatanisha kwenye malipo yanayotumwa kwa anwani ya faragha [shielded address]. Umesimbwa fiche, kwa hiyo watu wanaotazama mnyororo wa vizuizi hawawezi kuusoma.
* Sehemu ya ujumbe huhifadhi hadi baiti 512 za maandishi.
* Watu hutumia jumbe kusema ni nani aliyetuma malipo na yalikuwa ya nini, au kutuma ujumbe wa faragha.
* Malipo kwenda kwa anwani za uwazi hayawezi kubeba ujumbe.
* Kiungo cha [ombi la malipo](/using-zcash/payment-request-uris) kinaweza kujaza ujumbe kwa ajili yako ili duka liweze kutambulisha kila agizo.

## Maelezo ya Msingi

### Kutuma Jumbe Zilizosimbwa Fiche

Unapotuma muamala wa Z2Z (kutoka faragha hadi faragha), unaweza kujumuisha ujumbe katika muamala huo. Ujumbe huu unaweza kutumika kwa mambo kadhaa tofauti.

### Kutia Saini Malipo

Jumbe hutumika hasa kutia saini malipo. Kwa kuwa miamala ya faragha husimba fiche data yako, huwezi kuona ni nani aliyekutumia ZEC na ZEC huenda yalikuwa ya nini. Watumiaji wanaweza kutumia sehemu ya ujumbe kutia saini jina lao au jina bandia ili kumjulisha anayeshughulika nao muamala ulitoka kwa nani. Pia wanaweza kueleza muamala ulikuwa wa nini.

### Kutuma Ujumbe

Matumizi mengine ya ujumbe uliosimbwa fiche ni kumtumia mtu mwenye z-addr ujumbe. Jumbe hizi zinaweza kuwa kuhusu jambo lolote, iwe ni [ukumbusho kwa rafiki](https://twitter.com/iansagstette/status/1542142468505870336) au [ujumbe nyeti unaohitaji kubaki wa faragha kadiri iwezekanavyo](https://twitter.com/InsideZcash/status/1545800146352578560).

### Jumbe za Upendo kwenye Mnyororo wa Vizuizi

Kulikuwa na mtu aliyemtumia mwenzi wake ujumbe wa upendo katika mojawapo ya vizuizi vya kwanza kwenye mnyororo wa vizuizi wa Zcash. Mtu fulani aligundua kuwa mwenzi wake alikuwa amemtumia faili kupitia Zcash ujumbe. Faili hii ilikuwa tiketi ya tukio maalumu ng’ambo ya bahari ambalo yeye na mpenzi wake wa mbali walikuwa wamezungumzia kulihudhuria pamoja. Ujumbe huo ulikuwa wa upendo.

## Taswira / Ulinganisho

Fikiria malipo ya faragha kama bahasha iliyofungwa yenye fedha ndani. Ujumbe ni dokezo lililokunjwa pamoja na fedha.

Mnyororo wa vizuizi ni ofisi ya posta. Hubeba bahasha na kurekodi kuwa imewasili, na hauifungui kamwe. Mtu anayefungua bahasha husoma dokezo. Malipo ya uwazi ni kadi ya posta, kwa hiyo hakuna bahasha ya kukunjia dokezo.

## Uchambuzi wa Kina

### Kinachoweza kutoshea katika ujumbe

Sehemu ya ujumbe daima huwa na baiti 512 hasa. Ujumbe mfupi wa maandishi hujazwa kwa baiti sifuri kabla ya kusimbwa fiche, kwa hiyo kila ujumbe huonekana kuwa na ukubwa sawa on-chain.

Jumbe nyingi ni maandishi wazi ya UTF-8. [ZIP 302](https://zips.z.cash/zip-0302) pia huhifadhi jumbe zinazoanza kwa baiti ya `0xF5` au zaidi kwa aina nyingine za data, na ujumbe wa `0xF6` unaofuatwa na sufuri humaanisha “hakuna ujumbe”.

Kila towe la faragha katika muamala hubeba ujumbe wake, kwa hiyo muamala mmoja unaowalipa watu kadhaa unaweza kujumuisha dokezo tofauti kwa kila mmoja wao.

### Kina Zaidi

> **Kihistoria. Onyesho hili halifanyi kazi tena kama lilivyoandikwa.**
>
> Onyesho hapa chini linatumia zcashd, na [hati yake ya kupokea](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) husoma jumbe kupitia `zcash-cli`. zcashd ilisimama kiotomatiki baada ya kufikia Mwisho wa Usaidizi tarehe 18 Julai 2026, kwa hiyo hati hiyo haiwezi kufikia node inayofanya kazi, na haijahamishwa.
>
> Kusoma jumbe za faragha kutoka kwenye mstari wa amri bado hufanya kazi kwenye Zallet: `zallet rpc z_listunspent` hurejesha kila dokezo la faragha lililopokelewa likiwa na sehemu ileile ya `memoStr` ambayo hati husoma. Tazama [Zallet Mwongozo wa Marejeleo ya Haraka](/using-zcash/zallet-quick-reference-guide) kwa amri hiyo, na [mwongozo wa kuhamia kwenye Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ili kuhamisha node kutoka zcashd. Zallet bado iko katika beta.
>
> Sehemu hii imehifadhiwa kama rekodi ya kihistoria ya onyesho la Magic-Wormhole.

Hivi ndivyo unavyoweza kutumia Zcash Jumbe za Faragha kwa kutumia Magic-Wormhole CLI na zcashd kutuma faili kwa usalama kutoka kompyuta moja hadi nyingine!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Kurasa Zinazohusiana

- [URI za Ombi la Malipo](/using-zcash/payment-request-uris): weka ujumbe katika kiungo cha `zcash:` au msimbo wa QR.
- [Miamala](/using-zcash/transactions): aina za miamala ya faragha na ya uwazi.
- [Mabwawa ya Faragha](/using-zcash/shielded-pools): mahali ambako madokezo ya faragha yanayobeba jumbe huishi.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Shielded Memo kupata pochi zinazounga mkono jumbe.
- [Zallet Mwongozo wa Marejeleo ya Haraka](/using-zcash/zallet-quick-reference-guide): soma jumbe zilizopokelewa kutoka kwenye mstari wa amri.
- [Zcash Vifaa vya Watayarishi](/using-zcash/creators-and-tips): vifaa vya kudokeza vinavyotuma ujumbe pamoja na dokezo.

### Rasilimali

[Sehemu ya Ujumbe Uliosimbwa Fiche](https://electriccoin.co/blog/encrypted-memo-field/)

**Ilisasishwa mwisho:** Oktoba 2026
