<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nuŋlɔɖiwo

## TL;DR

* Nuŋlɔɖi nye nuŋlɔɖi kpui aɖe si nètsɔna kpena ɖe fetu si nèɖo ɖe adrɛs si wokpɔ ta na ŋu. Wotsɔ nya ɣaɣlawo de eme, eyata ame siwo le blockchain la kpɔm la mate ŋu axlẽe o.
* Memo field la xɔa nuŋɔŋlɔ siwo ade byte 512.
* Amewo zãa nuŋlɔɖiwo tsɔ gblɔa amesi ɖo fetu ɖa kple nusi tae woxee ɖo, alo tsɔ ɖoa ame ŋutɔ ƒe gbedasi ɖa.
* Fexexe ɖe adrɛs siwo me kɔ dzi mate ŋu atsɔ nuŋlɔɖi aɖeke ɖe asi o.
* A [fexexe ƒe biabiawo ƒe kadodo](/using-zcash/payment-request-uris) ate ŋu akpe nuŋlɔɖia ɖo na wò ale be fiase aɖe nate ŋu ade dzesi nudɔdɔ ɖesiaɖe.

## Numeɖeɖe Vevitɔ

### Memo Siwo Wotsɔ Nya Ɣla Ðo Ðoɖo Ðe Ame Ŋu

Ne èle Z2Z (shielded-to-shielded) ƒe asitsatsa ɖom ɖa la, àte ŋu ade nuŋlɔɖi (gbedasi) asitsatsa la me. Woate ŋu azã nuŋlɔɖi sia na nu vovovo geɖe.

### Asidede Asitsatsa Ŋu

Wozãa nuŋlɔɖiwo koŋ tsɔ dea asi fexexe te. Esi wònye be adzɔnuwɔna siwo wokpɔ ta na la tsɔa wò nyatakakawo ɣlana ta la, màte ŋu akpɔ amesi ɖo ZEC ɖe wò kple nusi ta ZEC la ate ŋu anye o. Zãlawo ate ŋu azã nuŋlɔɖi ƒe akpaa atsɔ ade asi woƒe ŋkɔ alo ŋkɔ bubu te be woana wo hati nanya amesi gbɔ asitsatsa la tso. Woate ŋu aɖɔ nusi ta wowɔ asitsatsa la ɖo hã.

### Gbedasɛ aɖe Ðoɖoɖa

Zãzã bubu na nuŋlɔɖi si wotsɔ nya ɣaɣlawo ŋlɔe nye be woaɖo gbedasi ɖe ame aɖe si si z-addr le. Gbedasi siawo ate ŋu aku ɖe nusianu ŋu, eɖanye a [ŋkuɖodzinya na xɔ̃wò aɖe](https://twitter.com/iansagstette/status/1542142468505870336) or a [gbedasi vevi si wòle be wòanɔ ɣaɣla alesi wòanya wɔe](https://twitter.com/InsideZcash/status/1545800146352578560).

### Lɔlɔ̃ ƒe Nuŋlɔɖiwo le Blockchain la dzi

Ame aɖe nɔ anyi si ɖo lɔlɔ̃gbalẽ ɖe woƒe kpeɖeŋutɔ le Zcash blockchain ƒe block gbãtɔwo dometɔ ɖeka me. Ame aɖe kpɔe be yewoƒe zɔhɛa ɖo faɛl ɖe yewo to Zcash nuŋlɔɖi aɖe dzi. Fail sia nye tikiti na wɔna tɔxɛ aɖe si wowɔ le duta si eya kple eƒe lɔlɔ̃tɔ si le didiƒe ʋĩ nɔ nu ƒom tsoe be yewoade ɖekae. Nuŋlɔɖia nye lɔlɔ̃ ŋuti nuŋlɔɖi.

## Nukpɔkpɔ / Nusɔsrɔ̃

Bu fexexe si wotsɔ akpoxɔnu wɔe be enye agbalẽkotoku si wotre nu na si me ga le. Memo la nye nuŋlɔɖi si woxatsa ɖe eme kple ga la.

Blockchain lae nye posudɔwɔƒea. Etsɔa agbalẽkotokua ɖe asi heŋlɔa nu be eva ɖo, eye meʋunɛ gbeɖe o. Ame si ʋu agbalẽkotokua la xlẽa nuŋlɔɖia. Fexexe si me kɔ nye posugbalẽvi, eyata agbalẽkotoku aɖeke meli woatsɔ abla agbalẽvi ɖe eme o.

## Deep Dive (Tsi me tsi goglo)

### Nusi sɔ ɖe nuŋlɔɖigbalẽ me

Memo field la nyea byte 512 pɛpɛpɛ ɣesiaɣi. Wotsɔa byte zero ƒoa nuŋɔŋlɔ memo si le kpuie wu la nu hafi wotsɔa nya ɣaɣlawo ŋlɔnɛ, eyata nuŋlɔɖi ɖesiaɖe ƒe lolome sɔ le kɔsɔkɔsɔ me.

Memo akpa gãtɔ nye UTF-8 nuŋɔŋlɔ dzrowo. [ZIP 302 ƒe xexlẽdzesi](https://zips.z.cash/zip-0302) hã dzraa nuŋlɔɖi siwo dzea egɔme kple byte of `0xF5` alo esi kɔ wu na nyatakaka ƒomevi bubuwo, kple nuŋlɔɖi si nye `0xF6` zero siwo kplɔe ɖo fia be "memo aɖeke meli o".

Nu ɖesiaɖe si wokpɔ ta na le asitsatsa me tsɔa eya ŋutɔ ƒe nuŋlɔɖi, eyata asitsatsa ɖeka si xea fe na ame geɖe ate ŋu ade nuŋlɔɖi vovovo na wo dometɔ ɖesiaɖe.

### De ŋgɔ

> **Ŋutinya me nyawo. Demo sia megazɔna abe alesi woŋlɔe ene o.**
>
> Demo si le ete zãa zcashd, kple eƒe [ŋɔŋlɔdzesi xɔxɔ](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) xlẽa nuŋlɔɖiwo to eme `zcash-cli`. zcashd ɖo eƒe Kpekpeɖeŋu ƒe Nuwuwu ƒe tɔtrɔ le eɖokui si le 18 July 2026 dzi, ale be ŋɔŋlɔdzesi ma mateŋu aɖo node si le dɔ wɔm gbɔ o, eye wometsɔe yi teƒe bubu o.
>
> Memo siwo wokpɔ ta na xexlẽ tso sedede ƒe fli dzi gakpɔtɔ le dɔ wɔm le Zallet: `zallet rpc z_listunspent` trɔa agbalẽvi ɖesiaɖe si woxɔ si ŋu akpoxɔnu le kple ɖeka ma ke `memoStr` field si dzi nuŋɔŋlɔa xlẽ. Kpɔ nya si [Zallet ƒe Mɔfiame Kabakaba](/using-zcash/zallet-quick-reference-guide) na sededea, kple [ʋuʋu yi Zebra kple Zallet ƒe mɔfiame](/guides/migration-guide-zcashd-to-zebrad-zallet) be woaɖe node aɖe ɖa le zcashd. Zallet gakpɔtɔ le beta me.
>
> Wodzra akpa sia ɖo abe ŋutinya me nuŋlɔɖi le Magic-Wormhole ƒe wɔwɔfia ŋu ene.

Alesi woazã Zcash Shielded Memos kple Magic-Wormhole CLI kple zcashd atsɔ aɖo faɛlwo tso kɔmpiuta ɖeka dzi ayi bubu dzi dedie enye si!

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

## Axa Siwo Do Ƒome Kplii

- [Fexexe ƒe Biabia URIwo](/using-zcash/payment-request-uris): tsɔ nuŋlɔɖi aɖe de a `zcash:` kadodo alo QR-dzesi.
- [Adzɔnuwo ƒe asitsatsa](/using-zcash/transactions): adzɔnuwɔna ƒomevi siwo ŋu wokpɔa ta ɖo eye wowɔa nu le gaglãgbe.
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools): afisi nuŋlɔɖi siwo wotsɔ akpoxɔnu ɖo siwo tsɔa nuŋlɔɖiwo le la nɔa.
- [Gakotokuwo](/using-zcash/wallets): zã Shielded Memo ƒe ʋuƒoa nàtsɔ adi gakotoku siwo doa alɔ nuŋlɔɖiwo.
- [Zallet ƒe Mɔfiame Kabakaba](/using-zcash/zallet-quick-reference-guide): xlẽ nuŋlɔɖi siwo woxɔ tso sedede ƒe fli me.
- [Zcash Dɔwɔnuwo na Wɔlawo](/using-zcash/creators-and-tips): tipping tools siwo ɖoa gbedasi ɖa kpe ɖe tip la ŋu.

### Nunɔamesiwo

[Memo ƒe Agble si Wotsɔ Nya Ɣla Ðo](https://electriccoin.co/blog/encrypted-memo-field/)

**Wotrɔ asi le eŋu zi mamlɛtɔ:** October 2026
