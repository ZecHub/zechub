<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ihe ncheta

## TL;DR

* Memo bụ obere akwụkwọ ozi ị na-etinye na ụgwọ e zigara na adreesị echekwara. E zoro ya ezoro ezo, ka ndị na-ekiri blockchain ghara ịgụ ya.
* Ebe ndetu ahụ nwere ike ijide ruo byte 512 nke ederede.
* Ndị mmadụ na-eji ihe ndetu ekwu onye zitere ụgwọ na ihe ọ bụ maka ya, ma ọ bụ izipu ozi nkeonwe.
* Ịkwụ ụgwọ nye adreesị doro anya enweghị ike ibu ihe e dere ede.
* A [njikọ arịrịọ ịkwụ ụgwọ](/using-zcash/payment-request-uris) nwere ike idejupụta ihe ndetu ahụ maka gị ka ụlọ ahịa wee nwee ike itinye akara na iwu ọ bụla.

## Nkọwa Isi

### Izipu Ihe Ncheta Ezoro Ezo

Mgbe ị na-eziga azụmahịa Z2Z (nke e ji kpuchie ya ruo na nke e ji kpuchie ya), ị nwere ike itinye ozi (ozi) n'azụmahịa ahụ. Enwere ike iji ozi a mee ihe dị iche iche.

### Ịbanye aka n'Azụmahịa

A na-ejikarị akwụkwọ ndetu eme ihe maka ịdenye aka na ịkwụ ụgwọ. Ebe ọ bụ na azụmahịa echekwara na-ezochi data gị, ị gaghị enwe ike ịhụ onye zitere gị ZEC na ihe ZEC nwere ike ịbụ maka ya. Ndị ọrụ nwere ike iji ubi ndetu ahụ bịanye aka n'aha ma ọ bụ aha njirimara ha iji mee ka onye ibe ha mara onye azụmahịa ahụ si. Ha nwekwara ike ịkọwa ihe azụmahịa ahụ bụ maka ya.

### Izipu Ozi

Ihe ọzọ e ji eme ihe maka memo ezoro ezo bụ izipu ozi nye onye nwere z-addr. Ozi ndị a nwere ike ịbụ maka ihe ọ bụla, ma ọ bụ [ihe ncheta nye enyi](https://twitter.com/iansagstette/status/1542142468505870336) or a [ozi dị nro nke kwesịrị ịnọ na nzuzo dịka o kwere mee](https://twitter.com/InsideZcash/status/1545800146352578560).

### Ihe ndetu ịhụnanya na Blockchain

E nwere otu onye zigara onye ya na ya na-akparịta ụka ịhụnanya n'otu n'ime blọk mbụ dị na Zcash blockchain. Mmadụ chọpụtara na onye ha na ya na-akparịta ụka ezitere ha faịlụ site na Zcash memo. Faịlụ a bụ tiketi maka mmemme pụrụ iche dị na mba ofesi nke ya na onye ọ hụrụ n'anya nọ na-ekwu maka ịga ọnụ. Ihe ncheta ahụ bụ ihe ncheta ịhụnanya.

## Anya / Ihe atụ

Chee echiche banyere ịkwụ ụgwọ a na-ekpuchi ekpuchi dị ka envelopu e mechiri emechi nke nwere ego dị n'ime ya. Akwụkwọ ozi ahụ bụ akwụkwọ ozi e tinyere ego ahụ n'ime ya.

Blockchain bụ ụlọ ọrụ ozi. Ọ na-ebu envelopu ahụ ma dekọọ na ọ bịarutere, ọ naghị emepe ya. Onye meghere envelopu ahụ na-agụ akwụkwọ ozi ahụ. Ụgwọ doro anya bụ kaadị ozi, yabụ enweghị envelopu ị ga-apịachi akwụkwọ ozi ahụ.

## Mmiri miri emi

### Ihe dabara na ndetu

Ebe ndetu ahụ na-abụkarị 512 bytes kpọmkwem. A na-etinye ndetu ederede dị mkpụmkpụ na byte efu tupu e zoo ya, yabụ ndetu ọ bụla na-adị ka nha ya na yinye.

Ọtụtụ ndetu bụ ederede UTF-8 nkịtị. [ZIP 302](https://zips.z.cash/zip-0302) na-echekwakwa ihe ndetu nke na-amalite na byte nke `0xF5` ma ọ bụ karịa maka ụdị data ndị ọzọ, yana ndetu nke `0xF6` ihe na-esochi ya bụ efu pụtara "enweghị ihe ncheta".

Ihe ọ bụla e ji kpuchie n'azụmahịa nwere ihe ncheta nke ya, yabụ otu azụmahịa nke na-akwụ ọtụtụ mmadụ ụgwọ nwere ike itinye akwụkwọ ndetu dị iche maka nke ọ bụla n'ime ha.

### Elu

> **Akụkọ ihe mere eme. Ngosipụta a anaghịzi arụ ọrụ dịka e dere ya.**
>
> Ngosipụta dị n'okpuru na-eji zcashd, ya na ya [edemede nnata](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) na-agụ ihe ndetu site na `zcash-cli`zcashd ruru nkwụsị nke End-of-Support ya na 18 Julaị 2026, nke mere na script ahụ enweghị ike iru node na-agba ọsọ, a pụghịkwa ibugharị ya.
>
> Ịgụ ihe ncheta echekwara site na ahịrị iwu ka na-arụ ọrụ na Zallet: `zallet rpc z_listunspent` na-eweghachi otu ndetu echekwara ọ bụla enwetara `memoStr` Lee ihe e dere n'akwụkwọ edemede ahụ [Nduzi Ntụaka Ngwa Ngwa Zallet](/using-zcash/zallet-quick-reference-guide) maka iwu ahụ, na [ntuziaka mbugharị gaa Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ibugharị otu n'ime zcashd. Zallet ka nọ na beta.
>
> A na-edebe akụkụ a dị ka ihe ndekọ akụkọ ihe mere eme nke ihe ngosi Magic-Wormhole.

Lee otu esi eji Zcash Shielded Memos na Magic-Wormhole CLI na zcashd iji zipu faịlụ site na otu kọmputa gaa na nke ọzọ n'enweghị nsogbu!

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

## Peeji ndị metụtara ya

- [URIs nke arịrịọ ịkwụ ụgwọ](/using-zcash/payment-request-uris): tinye ihe ncheta n'ime `zcash:` njikọ ma ọ bụ koodu QR.
- [Azụmahịa](/using-zcash/transactions): ụdị azụmahịa echekwara ma doo anya.
- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools): ebe ndetu e ji ihe nchekwa kpuchie nke na-ebu ihe ncheta dị ndụ.
- [Obere akpa](/using-zcash/wallets): jiri ihe nzacha Nchedo Memo chọta obere akpa ndị na-akwado ndetu.
- [Nduzi Ntụaka Ngwa Ngwa Zallet](/using-zcash/zallet-quick-reference-guide): gụọ ihe ndetu enwetara site na ahịrị iwu.
- [Ngwaọrụ Zcash maka ndị okike](/using-zcash/creators-and-tips): ngwaọrụ ntinye ego nke na-eziga ozi yana ntinye ego.

### akụrụngwa

[Ubi Ihe Ncheta Ezoro Ezo](https://electriccoin.co/blog/encrypted-memo-field/)

**Emelitere ikpeazụ:** Ọktoba 2026
