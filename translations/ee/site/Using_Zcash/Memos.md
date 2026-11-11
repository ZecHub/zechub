<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nya kpui [Memos]

## TL;DR

* Nya kpui nye agbalẽ kpui si nàtsɔ akpe ɖe fexexe si wòɖo ɣaɣla gaɖoƒe ƒe dzesi dzi ŋu. Wozã ɣaɣlaŋlɔŋlɔ na e, ale be ame siwo le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu kpɔm la mate ŋu axlẽe o.
* Nya kpui ƒe afi la dea nuŋɔŋlɔ ƒe bytes 512 hã.
* Ameawo zãa nya kpuiwo be woagblɔ ame si dɔ fexexe la kple nu si ta wòdɔe, alo be woaɖo adzɔgbe ɣaɣla.
* Fexexewo siwo yina nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo dzi mate ŋu atsɔ nya kpui o.
* [Fexexe ƒe biabia ƒe kadodo](/using-zcash/payment-request-uris) ate ŋu aɖo nya kpui la ɖe eme na wò, ale be afiadzra aɖe ate ŋu atsɔ dzesi ade fiale ɖesiaɖe ŋu.

## Gɔmeɖeɖe Vevi

### Nya kpui Siwo Wozã ɣaɣlaŋlɔŋlɔ Na

Ne èle Z2Z (ɣaɣla-to-ɣaɣla) gaɖoɖo dɔm la, àte ŋu atsɔ nya kpui (adzɔgbe) ade gaɖoɖo la me. Woate ŋu azã nya kpui sia na nu vovovo geɖe.

### Fexexewo Ƒe Asidzesi Deɖe

Wozãa nya kpuiwo vevietɔ be woade fexexewo ƒe asidzesi. Esi ɣaɣla gaɖoɖowo zãa ɣaɣlaŋlɔŋlɔ na wòƒe nyawo ta la, màte ŋu akpɔ ame si dɔ ZEC na wò kple nu si ta ZEC wòate ŋu anye o. Zãlawo ate ŋu azã nya kpui ƒe afi la be woaɖe woƒe ŋkɔ alo ŋkɔ si wowɔ na wo ɖe eme, be ame si wole dɔwɔm kplii la nanya afi si gaɖoɖo la tso. Woate ŋu agblɔ nu si ta gaɖoɖo la va.

### Adzɔgbe Ɖoɖo

Zã nyawo bubu na nya kpui si wozã ɣaɣlaŋlɔŋlɔ na nye be nàɖo adzɔgbe ɖe ame si si z-addr le. Adzɔgbe siawo ate ŋu anye nu ɖesiaɖe, abe [Nudzodzro na xɔlɔ aɖe](https://twitter.com/iansagstette/status/1542142468505870336) alo [Adzɔgbe vevi si wòhiã be wòanɔ ɣaɣla na akpe wu](https://twitter.com/InsideZcash/status/1545800146352578560) ene.

### Lɔlɔ̃ Ƒe Agbalẽwo Le Gaɖoɖowo Ƒuƒoƒo Ƒe Ɖoɖonu Dzi

Ame aɖe dɔ lɔlɔ̃ ƒe agbalẽ na eƒe lɔlɔ̃tɔ le gaɖoɖowo ƒuƒoƒe [block] gbãtɔwo dometɔ aɖe me le Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi. Ame aɖe kpɔ be eƒe lɔlɔ̃tɔ dɔ faɛl aɖe nɛ to Zcash nya kpui me. Faɛl sia nye tiketi na nudzɔdzɔ vevi aɖe si le dukɔ bubu me, si ŋutɔ kple eƒe lɔlɔ̃tɔ si le didime nɔ woƒe nya gblɔm be woayi ɖo ɖeka. Nya kpui la nye lɔlɔ̃ ƒe agbalẽ.

## Nuku / Sɔsɔ

Bu ɣaɣla fexexe ŋu abe agbalẽ ƒe kɔkɔe si me ga le ene. Nya kpui la nye agbalẽ kpui si wokɔ ɖe ga la kplii.

Gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu nye posu ƒe dɔwɔƒe. Etsɔa kɔkɔe la yi, eye wòŋlɔa ɖe eŋu be wòva, ke mexɔa kɔkɔe la o. Ame si ʋua kɔkɔe la la xlẽa agbalẽ kpui la. Nuwo ƒe ʋuʋuɖi fexexe nye posu ƒe kadodo, ale be kɔkɔe aɖeke menɔ afi si woakɔ agbalẽ kpui ɖe o.

## Nya Siwo Wometsɔ ɖe Eme Tsitotsito

### Nu Si Ate Ŋu Anɔ Nya kpui Me

Nya kpui ƒe afi la nye bytes 512 ɖeɖe. Wotsɔ zero bytes tsɔa nya kpui ƒe nuŋɔŋlɔ si mekpɔ o ɖe eme hafi wozã ɣaɣlaŋlɔŋlɔ nɛ, ale be nya kpui ɖesiaɖe nɔa ɖoɖonu dzi ƒe lolome ɖeka.

Nya kpui geɖe nye UTF-8 nuŋɔŋlɔ bɔbɔe. [ZIP 302](https://zips.z.cash/zip-0302) hã ɖea nya kpui siwo dzea kple byte `0xF5` alo si le eƒe dzi na data ƒe ƒomevi bubuwo, eye nya kpui si nye `0xF6` kple zerowo le eƒe megbe fia be "nya kpui aɖeke mele o".

Ɣaɣla output ɖesiaɖe le gaɖoɖo aɖe me tsɔa eya ŋutɔ ƒe nya kpui, ale be gaɖoɖo ɖeka si xea fe na ame geɖe ate ŋu atsɔ agbalẽ kpui vovovo ade ame ɖesiaɖe ƒe tɔ me.

### Nya Siwo Le Dzi

> **Nya si va yi. Demo sia megawɔa dɔ abe ale si woŋlɔe ene o.**
>
> Demo si le afisia zãa zcashd, eye eƒe [Script si xɔa nuwo](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) xlẽa nya kpuiwo to `zcash-cli` me. zcashd wɔ eƒe End-of-Support ƒe tsitɔtɔ si wòwɔa ɖokpe ɖe eŋu le 18 July 2026, ale be script ma mate ŋu ava ɖo ɣaɣla dzesi ŋɔŋlɔ si le dɔ wɔm o, eye wometsɔe yi teƒe bubu o.
>
> Ɣaɣla nya kpuiwo ƒe xexlẽ tso command line dzi ganye dɔ wɔm le Zallet: `zallet rpc z_listunspent` trɔa ɣaɣla didienu si woxɔ ɖesiaɖe kple `memoStr` afi ma ke si script la xlẽa. Kpɔ [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) na sedede la, kple [Mɔfiame si le ɣaɣla dzesi ŋɔŋlɔ ƒe trɔtrɔ ŋu yi Zebra kple Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) be nàtsɔ ɣaɣla dzesi ŋɔŋlɔ aɖe ava tso zcashd dzi. Zallet gale beta me hã.
>
> Wode asi ɖe akpa sia ŋu be wòanye Magic-Wormhole demo ƒe nya si va yi ƒe ŋkɔŋlɔ.

Esiae nye ale si nàzã Zcash Shielded Memos kple Magic-Wormhole CLI kple zcashd be nàdɔ faɛlwo tso kɔmputa aɖe dzi ayi bubu dzi kple dedienɔnɔ!

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

## Axawo Siwo Ɖo Kpli

- [Fexexe ƒe Biabia ƒe URIwo](/using-zcash/payment-request-uris): De nya kpui ɖe `zcash:` kadodo alo QR code me.
- [Gaɖoɖowo](/using-zcash/transactions): Ɣaɣla kple nuwo ƒe ʋuʋuɖi gaɖoɖo ƒe ƒomeviwo.
- [Ɣaɣla Gaƒuƒoƒowo](/using-zcash/shielded-pools): Afi si ɣaɣla didienu siwo tsɔa nya kpuiwo nɔ.
- [Gakotokuwo](/using-zcash/wallets): Zã Shielded Memo filter be nàkpɔ gakotoku siwo wɔa dɔ kple nya kpuiwo.
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide): Xlẽ nya kpui siwo woxɔ tso command line dzi.
- [Zcash Dɔwɔnuwo Na Nu Wɔlawo](/using-zcash/creators-and-tips): Tip ƒe dɔwɔnuwo siwo dɔa adzɔgbe kple tip la.

### Nu Siwo Woate Ŋu Atsɔ

[Nya kpui Ƒe Afi Si Wozã ɣaɣlaŋlɔŋlɔ Na](https://electriccoin.co/blog/encrypted-memo-field/)

**Wotrɔe mlɔeba:** October 2026
