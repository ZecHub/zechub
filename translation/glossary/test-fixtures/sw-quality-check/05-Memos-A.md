<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kumbukumbu

## TL;DR

* Memo ni barua fupi unayoambatanisha na malipo yanayotumwa kwa anwani iliyolindwa. Imesimbwa kwa njia fiche, kwa hivyo watu wanaotazama blockchain hawawezi kuisoma.
* Sehemu ya memo inashikilia hadi baiti 512 za maandishi.
* Watu hutumia memo kusema ni nani aliyetuma malipo na yalikuwa ya nini, au kutuma ujumbe wa faragha.
* Malipo kwa anwani zinazoeleweka hayawezi kuwa na memo.
* A [kiungo cha ombi la malipo](/using-zcash/payment-request-uris) wanaweza kujaza memo kwa ajili yako ili duka liweze kuweka lebo kwa kila agizo.

## Maelezo ya Msingi

### Kutuma Memo Zilizosimbwa kwa Njia Fiche

Unapotuma muamala wa Z2Z (uliofunikwa kwa ngao), unaweza kujumuisha memo (ujumbe) katika muamala. Memo hii inaweza kutumika kwa mambo kadhaa tofauti.

### Kusaini Miamala

Memo hutumika hasa kwa ajili ya kusaini malipo. Kwa kuwa miamala iliyolindwa huficha data yako, huwezi kuona ni nani aliyekutumia ZEC na ZEC ingekuwa ya nini. Watumiaji wanaweza kutumia sehemu ya memo kusaini jina lao au jina bandia ili kuwajulisha wenzao kuhusu muamala huo. Wanaweza pia kuelezea muamala huo ulikuwa wa nini.

### Kutuma Ujumbe

Mfano mwingine wa matumizi ya memo iliyosimbwa kwa njia fiche ni kutuma ujumbe kwa mtu mwenye z-addr. Ujumbe huu unaweza kuwa kuhusu chochote, iwe ni [ukumbusho kwa rafiki](https://twitter.com/iansagstette/status/1542142468505870336) or a [ujumbe nyeti unaohitaji kubaki faragha iwezekanavyo](https://twitter.com/InsideZcash/status/1545800146352578560).

### Vidokezo vya Mapenzi kwenye Blockchain

Kulikuwa na mtu aliyemtumia mwenzi wake ujumbe wa mapenzi katika moja ya vizuizi vya kwanza kwenye blockchain ya Zcash. Mtu aligundua kuwa mwenzi wake alikuwa amemtumia faili kupitia memo Zcash. Faili hii ilikuwa tiketi ya tukio maalum ng'ambo ambalo yeye na mpenzi wake wa mbali walikuwa wakizungumzia kuhudhuria pamoja. Ujumbe huo ulikuwa ujumbe wa mapenzi.

## Taswira / Analojia

Fikiria malipo yaliyofunikwa kama bahasha iliyofungwa yenye pesa ndani. Hati hiyo ni noti iliyokunjwa pamoja na pesa.

Blockchain ni ofisi ya posta. Hubeba bahasha na kurekodi kwamba ilifika, na haifungui kamwe. Mtu anayefungua bahasha husoma barua. Malipo ya uwazi ni kadi ya posta, kwa hivyo hakuna bahasha ya kukunjwa barua.

## Kupiga Mbizi Kina

### Kinachofaa katika memo

Sehemu ya memo huwa na baiti 512 haswa. Memo fupi ya maandishi hufunikwa na baiti sifuri kabla ya kusimba, kwa hivyo kila memo inaonekana saizi sawa kwenye mnyororo.

Memo nyingi ni maandishi ya UTF-8 tu. [ZIP 302](https://zips.z.cash/zip-0302) pia huhifadhi memo zinazoanza na baiti ya `0xF5` au zaidi kwa aina nyingine za data, na kumbukumbu ya `0xF6` ikifuatiwa na sifuri inamaanisha "hakuna memo".

Kila pato lililolindwa katika muamala lina memo yake, kwa hivyo muamala mmoja unaowalipa watu kadhaa unaweza kujumuisha noti tofauti kwa kila mmoja wao.

### Kina

> **Ya kihistoria. Onyesho hili haliendelei tena kama lilivyoandikwa.**
>
> Onyesho lililo hapa chini linatumia zcashd, na ni [hati ya kupokea](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) husoma memo zote `zcash-cli`. zcashd ilifikia kikomo chake cha mwisho wa usaidizi kiotomatiki mnamo tarehe 18 Julai 2026, kwa hivyo hati haiwezi kufikia nodi inayoendeshwa, na haijahamishwa.
>
> Kusoma memo zilizolindwa kutoka kwa mstari wa amri bado kunafanya kazi kwenye Zallet: `zallet rpc z_listunspent` hurejesha kila noti iliyolindwa iliyopokelewa ikiwa na `memoStr` sehemu ambayo hati inasomeka. Tazama [Mwongozo wa Marejeleo ya Haraka Zallet](/using-zcash/zallet-quick-reference-guide) kwa amri, na [mwongozo wa uhamiaji kwenda Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ili kuhamisha nodi kutoka kwa zcashd. Zallet bado iko katika beta.
>
> Sehemu hii imehifadhiwa kama rekodi ya kihistoria ya onyesho la Magic-Wormhole.

Hivi ndivyo jinsi ya kutumia Zcash Shielded Memo zenye Magic-Wormhole CLI na zcashd kutuma faili kwa usalama kutoka kompyuta moja hadi nyingine!

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

- [URI za Ombi la Malipo](/using-zcash/payment-request-uris): weka memo kwenye `zcash:` kiungo au msimbo wa QR.
- [Miamala](/using-zcash/transactions): aina za miamala iliyolindwa na inayoonekana wazi.
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools): ambapo noti zilizofunikwa na ngao zinazobeba memo zinaishi.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Shielded Memo ili kupata pochi zinazounga mkono memo.
- [Mwongozo wa Marejeleo ya Haraka Zallet](/using-zcash/zallet-quick-reference-guide): soma memo zilizopokelewa kutoka kwa mstari wa amri.
- [Zana Zcash kwa Waumbaji](/using-zcash/creators-and-tips): zana za kutoa vidokezo vinavyotuma ujumbe pamoja na vidokezo.

### Rasilimali

[Sehemu ya Kumbukumbu Iliyosimbwa kwa Njia Fiche](https://electriccoin.co/blog/encrypted-memo-field/)

**Ilisasishwa mara ya mwisho:** Oktoba 2026
