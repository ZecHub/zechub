<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ihe akaebe nke ịkwụ ụgwọ na mkpughe ịkwụ ụgwọ echekwara

## TL;DR

- NJ azụmahịa na-achọpụta azụmahịa, mana ọ naghị ekpughe onye nnata echekwara, ego, ma ọ bụ ihe edeturu.
- Emebere mkpughe ịkwụ ụgwọ iji nye onye zitere ya ohere igosi nkọwa ahọpụtara nke otu ịkwụ ụgwọ n'ekpugheghị akụkọ ego ha fọdụrụ.
- Igodo nlele na-enye ohere ịgụ ihe na-aga n'ihu na adreesị ma ọ bụ akaụntụ. Jiri ya maka nyocha na-aga n'ihu, ọ bụghị maka esemokwu ịkwụ ụgwọ otu ugboro.
- Ngosipụta ịkwụ ụgwọ enweghị ike igosi nnyefe ngwongwo, ịchọpụta mmadụ n'onwe ya, ịgbanwe ụgwọ, ma ọ bụ dochie akwụkwọ nlele nkwenye.
- [ZIP 311](https://zips.z.cash/zip-0311) Ọ ka bụ **Draft**. Ederede ya ugbu a na-eme ka nkwado Orchard, nkwado ntinye doro anya, koodu, ụdị, na iwu interface onye ọrụ agwụcha.

## Ihe kpatara njirimara azụmahịa ezughị oke

Onye ọ bụla nwere ike inyocha nkọwa ọha na eze nke ịkwụ ụgwọ Zcash doro anya. Onye na-eme nchọpụta blọk nwere ike igosi adreesị ya, ego ole ọ na-akwụ, na ọnọdụ nkwenye ya.

Ụgwọ a na-akwụghị ụgwọ na-arụ ọrụ dị iche. Usoro a na-egosi na azụmahịa ahụ gbasoro iwu Zcash, mana ọ naghị ebipụta onye zitere ya, onye nnata, ego, ma ọ bụ ihe ncheta. Ịkekọrịta ID azụmahịa ahụ nwere ike igosi na e gwupụtara azụmahịa, mana ọ nweghị ike igosi onye ahịa ma ọ bụ onye ọzọ ụgwọ nkeonwe dị n'ime ya.

Nke a na-akpata nsogbu bara uru. Onye ahịa nwere ike ịchọ idozi esemokwu onye ahịa, mgbanwe nwere ike ịchọ igosi na ọ haziri mwepụ ego, ma ọ bụ onye na-enye onyinye nwere ike ịchọ igosi otu onyinye. Ịkekọrịta igodo nlele zuru oke ga-ekpughe ihe karịrị ihe ọ bụla n'ime ikpe ndị a chọrọ.

[ZIP 311: Nkọwapụta Ịkwụ Ụgwọ Zcash](https://zips.z.cash/zip-0311) na-atụ aro azịza dị warara karị: ikpughe ma kwado ozi ahọpụtara site na otu azụmahịa.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Otu mkpughe ịkwụ ụgwọ si arụ ọrụ

Usoro bụ isi bụ:

1. Onye nyocha ahụ na-enye onye zitere ya ihe ịma aka ma ọ bụ ntụaka pụrụ iche, mgbe ihe akaebe mmekọrịta kwesịrị ekwesị.
2. Onye zitere ya na-ahọrọ azụmahịa ahụ na mmepụta ma ọ bụ mmepụta echekwara iji kpughee ya.
3. Ngwanrọ obere akpa dakọtara na-emepụta mkpughe ịkwụ ụgwọ nke jikọtara ya na azụmahịa ahụ, ma ọ bụrụ na ọ dị mkpa, ihe ịma aka ahụ.
4. Onye zitere ya na-enye onye na-enyocha ihe ngosi ahụ.
5. Onye nyocha ahụ na-enweta ezigbo azụmahịa ahụ site na Zcash node a pụrụ ịtụkwasị obi, na-enyocha ma e gwupụtara ya, ma na-enyocha ngosipụta megide ya.
6. Nsonaazụ dị irè na-akwado naanị nkwupụta ndị dị na mkpughe ahụ.

Nhazi Sapling nke ZIP na-eji igodo nzuzo na-apụ apụ iji weghachite mmepụta ọ bụla ahọpụtara. Nke a nwere ike ikpughe onye nnata, ego, na ihe ncheta nke mmepụta. Ọ chọkwara ihe akaebe nke ikike mmefu maka opekata mpe otu ntinye azụmahịa, yabụ onye na-ahụ azụmahịa ahụ naanị enweghị ike ịmepụta mkpughe ziri ezi dị ka a ga-asị na o zigara ya.

Nkpughe ụgwọ Sapling agaghị ekpughe adreesị onye zitere ya. Ikike mmefu nwere ike ijikwa ọtụtụ adreesị dị iche iche, yabụ igosi njikwa mmefu anaghị akọwapụta otu adreesị ozugbo. ZIP 311 gụnyere ihe akaebe adreesị nhọrọ maka ikpe ebe ọ dị mkpa ijikọ ihe akaebe ahụ na adreesị onye zitere ya a maara.

## Mkpughe ịkwụ ụgwọ ma ọ bụ igodo nlele?

| Usoro | Ojiji kacha mma | Ihe ọ na-ekpughe | Ịnweta na-aga n'ihu? | Ejikọtara ya na ịkwụ ụgwọ ahụ n'ụzọ nzuzo? |
| --- | --- | --- | --- | --- |
| Transaction ID | Ịlele na e gwupụtara azụmahịa | Data na nkwenye azụmahịa ọha | Mba | Ee, mana nkọwa ịkwụ ụgwọ echekwara ka zoro ezo |
| Screenshot or receipt | Idebe ndekọ na-abụghị nke iwu | Ihe ọ bụla onye zitere ya họọrọ igosi | Mba | Mba; enwere ike dezie onyonyo ahụ |
| Payment disclosure | Ịgosipụta nkọwa ahọpụtara nke otu ịkwụ ụgwọ | Nsonaazụ azụmahịa ahọpụtara na onye zitere ma ọ bụ ihe akaebe ịma aka ọ bụla gụnyere | Mba, mana enwere ike iṅomi ihe akaebe ekesara | Ee |
| Incoming Viewing Key | Na-enyocha ụgwọ ndị a natara site na akaụntụ | Ọrụ na-abata nke igodo ahụ kpuchiri | Ee | Ọ na-akọwapụta ụgwọ ndị dakọtara na-abata |
| Full Viewing Key | Ịgụta ego ma ọ bụ inyocha akaụntụ | Ọrụ na-abata na nke na-apụ apụ, ọnụọgụgụ, ndetu, na nguzozi nke igodo ahụ kpuchiri | Ee | Ọ na-akọwapụta ihe omume akaụntụ dakọtara |

Jiri obere mkpughe nke na-aza ajụjụ a. Onye ahịa na-ese okwu gbasara otu ịkwụ ụgwọ anaghị emekarị ka mmadụ nweta ụgwọ ọ bụla dị na akaụntụ. Onye akaụntụ nke ga-enyocha oge akụkọ zuru oke nwere ike ịchọ igodo nlele kama.

Ọ dịghị ụzọ abụọ a na-enye ikike imefu ego. Etinyela okwu mkpụrụ, igodo mmefu, igodo nzuzo, ma ọ bụ nkwado ego dị ka ihe akaebe nke ịkwụ ụgwọ.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Gịnị ka m ga-eji taa?

Achọpụtaghị obere akpa ego dị ugbu a ebe a dị ka nke na-eme ka e mepụta ma ọ bụ nyochaa ịkwụ ụgwọ ZIP 311. ZIP ahụ ka bụ ihe e dere ede ma depụta mmejuputa ya dị ka "TBD." Ngwaọrụ ndị a ka nwere ike inyere onye zitere ya, onye nnata, ma ọ bụ onye nyocha ikike aka inyocha ndekọ ndị dị taa:

| Ngwa | Bara uru taa maka | Oke dị mkpa |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Ịlele metadata azụmahịa zuru ezu, ọnụọgụgụ, ntinye na mmepụta n'ime otu, na ndetu; ibubata igodo nlele Unified ma ọ bụ Sapling n'ime akaụntụ nlele naanị | Anaghị akpọsa mmepụta ma ọ bụ nkwenye nke ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Nyochaa akụkọ ihe mere eme azụmahịa na ihe ncheta echekwara; ibubata Full Viewing Key oke n'ụdị ọgụgụ naanị | Ndekọ obere akpa ma ọ bụ akaụntụ ọgụgụ naanị abụghị mkpughe ịkwụ ụgwọ a na-ahọrọ nke ọma |
| [Zallet](https://zcash.github.io/zallet/) | Usoro ọrụ nke onye ọrụ na-eji `z_viewtransaction`, `z_exportviewingkey`, na `z_importviewingkey` | Ngwanrọ Beta; igodo nlele ya na RPC azụmahịa ya bụ ndekọ sara mbara ma ọ bụ nke mpaghara, ọ bụghị ihe akaebe ZIP 311 |

Jiri obere akpa ego ahụ zitere ma ọ bụ nata ụgwọ ahụ buru ụzọ. Lelee nkọwa azụmahịa ya, ihe edeturu, njirimara azụmahịa ya, na nkwenye ya, wee gwa onye nke ọzọ ka o jiri nkọwa ndị ahụ tụnyere ndekọ nke ya. Etinyela obere akpa ego ọhụrụ wee tinye mkpụrụ okwu naanị iji gosipụta ihe akaebe. Ọ bụrụ na onye na-enyocha ego chọrọ ịhụ ihe na-aga n'ihu, tụlee akaụntụ naanị echiche dakọtara ma ghọta oke nke igodo nlele tupu ịkekọrịta ya.

Ngwa ndị a bụ ụzọ dị mma isi lelee ndekọ, ọ bụghị ihe akaebe na ngosipụta ịkwụ ụgwọ dị. Foto nwere ike inyere ndị mmadụ aka ịtụle ndekọ, mana enwere ike idezi ya ma ọ bụghị ihe akaebe nzuzo.

## Ebe mkpughe ịkwụ ụgwọ dị

### Esemokwu ndị ahịa

Onye ahịa nwere ike igosi na ezigara ego kpọmkwem n'adreesị onye ahịa ahụ. Ihe akaebe ahụ egosighi na ebugara ngwongwo ahụ, na a kwụrụ ya ụgwọ, ma ọ bụ na onye na-eweta ya nwere njirimara iwu kpọmkwem. Ajụjụ ndị ahụ ka dabere na ndekọ iwu na nkwekọrịta nke ndị otu ahụ.

### Mwepụ echekwara

ZIP 311 depụtara mwepụ ego echekwara dị ka ihe e ji eme ihe mgbaru ọsọ: mgbanwe ego ga-egosi onye natara ya na ego ya na-ebipụtaghị nkọwa ndị ahụ n'usoro. Ihe akaebe ntinye ya nke doro anya ka emechabeghị, yabụ nke a abụghị usoro ọrụ zuru oke. Onye ahịa ga-enyochakwa ọnọdụ nkwenye nke azụmahịa ahụ n'onwe ya.

### Onyinye

Onye na-enye onyinye ma ọ bụ mkpọsa nwere ike igosi onyinye kpọmkwem ma hapụ ịkwụ ụgwọ ndị na-enweghị njikọ na nzuzo. Mbipụta mkpughe ahụ na-eme ka nkọwa ndị ahọpụtara pụta ìhè nye onye ọ bụla natara otu, yabụ ọwa nkwenye nkeonwe na-adị nchebe karịa mgbe ihe akaebe ọha na eze adịghị mkpa.

### Akaụntụ

Jiri mkpughe ịkwụ ụgwọ mgbe onye na-ahụ maka akaụntụ chọrọ ihe akaebe maka otu azụmahịa. Jiri igodo nlele kacha dị warara mgbe onye na-ahụ maka akaụntụ chọrọ ịnweta ọtụtụ azụmahịa ma ọ bụ oge akụkọ zuru oke.

## Usoro ọrụ nchekwa nzuzo

ZIP 311 abụghị ọkọlọtọ akpa ego emechara, nke a na-etinye n'ọtụtụ ebe. Mgbe ngwaọrụ onye na-eziga na onye na-enyocha ihe dakọtara dị, jiri ndepụta a:

1. **Kwenye na ndakọrịta mbụ.** Ngwaọrụ abụọ a ga-akwado otu usoro mkpughe na ọdọ mmiri a na-echebe nke ụgwọ ahụ ji.
2. **Dozie nsogbu nkịtị mbụ.** Lelee mmekọrịta akpa ego, njirimara azụmahịa, ọnụọgụ nkwenye, ọnọdụ njedebe, na ndekọ onye nnata tupu i kpughee nkọwa nkeonwe.
3. **Rịọ maka ihe ịma aka.** Maka esemokwu, onye na-enyocha kwesịrị inye nọmba iwu ọhụrụ ma ọ bụ ihe ịma aka enweghị usoro ka ngosipụta ahụ wee jikọta arịrịọ ahụ.
4. **Họrọ naanị ihe achọrọ.** Etinyela ihe ndị na-abụghị njikọ sitere na otu azụmahịa ahụ.
5. **Lelee ebe ọ bụla ekpughere.** Lelee onye nnata, ego ole, ihe edeturu, ihe akaebe nke adreesị onye zitere ya, ma nwalee ya tupu ị na-ebupụ ya.
6. **Kesaa site na ọwa nkeonwe.** Mkpughe abụghị isi ihe eji emefu ego nzuzo, mana onye ọ bụla natara ya nwere ike idobe ma ọ bụ kesaa ozi ọ na-ekpughe ọzọ.
7. **Kwado ya n'usoro agbụ ahụ.** Onye nyocha ahụ ga-ebuga azụmahịa ahụ kpọmkwem site na node a tụkwasịrị obi, kwado na ọ dị na netwọk a chọrọ ma gbochie ya, wee kwado ngosipụta ahụ.
8. **Dekọọ ihe si na ya pụta, ọ bụghị ihe nzuzo ọzọ.** Debe naanị ihe esemokwu, mwepụ ego, inye onyinye, ma ọ bụ usoro akaụntụ chọrọ.

Ọ bụrụ na obere akpa ahụ enweghị ike ime ka a mara ya, etinyela igodo nlele zuru oke n'aghọtaghị oke ya na nke na-adịgide adịgide. Jụọ ma onye nnata ahụ nwere ike ịkwado ụgwọ ahụ site na ndekọ obere akpa ya ma ọ bụ nabata ndekọ na-adịghị mkpa kama.

## Ihe mkpughe ziri ezi anaghị egosi

Nkwenye na-aga nke ọma anaghị egosi:

- Na azụmahịa ahụ nwere nkwenye zuru oke maka amụma ihe egwu nke onye nyocha ahụ
- Na nhazigharị agbụ ígwè enweghị ike iwepụ azụmahịa ọhụrụ
- E zigara ngwaahịa ma ọ bụ ọrụ ahụ
- Na achọrọ nkwụghachi ma ọ bụ nkwụghachi ụgwọ
- Na onye zitere ya na-achịkwa otu adreesị kpọmkwem, ọ gwụla ma etinyela ihe akaebe adreesị kwesịrị ekwesị
- Na onye na-egosi ihe ngosi ahụ nwere njirimara ụwa n'ezie nke a na-ekwu na ọ bụ
- Na ihe ndị a na-anaghị akọwapụta, azụmahịa ndị ọzọ, ma ọ bụ nguzozi nke obere akpa nwere uru ọ bụla pụrụ iche
- Na mkpughe ahụ ka bụ nke nzuzo mgbe ekesara ya

Onye nyocha ahụ ga-enyocha ọnọdụ nke itinye na nkwenye n'usoro iche iche. Usoro nkwenye nke ZIP 311 na-eche na onye na-akpọ oku enwetala azụmahịa e gwupụtara na ogologo blọk ya.

## Mmachi dị ugbu a

Were ZIP 311 dị ka ọkọlọtọ a tụrụ aro, ọ bụghị dị ka nkwa na obere akpa ego dị ugbu a nwere bọtịnụ **Gosi ụgwọ** na-arụ ọrụ.

Edemede a na-akọwapụta mmefu na mmepụta Sapling ugbu a, mana o nwere ihe ndị a na-emechabeghị maka Orchard, ntinye doro anya, koodu ngosipụta, ụdị, na otu obere akpa ego kwesịrị isi gosipụta ọkwa dị iche iche nke irè. A na-edekwa mmejuputa ya dị ka "TBD." Dịka e dere ya, ọ naghị akọwapụta mkpughe ịkwụ ụgwọ maka ịkwụ ụgwọ Orchard ma ọ bụ Ironwood.

Onye zitere ozi ahụ nwekwara ike ọ gaghị enwe ike ikpughe ihe ọ rụpụtara ma ọ bụrụ na e mebere azụmahịa ahụ n'amaghị ama na-enweghị igodo nlele na-apụ apụ maka ihe ahụ. ZIP 311 na-echekwa nhọrọ nzuzo ahụ kama ịmepụta ụzọ mgbake ọhụrụ.

Akwụkwọ ochie na-akọwa nnwale ahụ `z_getpaymentdisclosure` na `z_validatepaymentdisclosure` iwu dị na `zcashd`Iwu ndị ahụ kwadoro naanị ihe ndị na-apụta na Sprout JoinSplit**, ọ bụghị ihe e ji emepụta Sapling na ZIP 311, a kwụsịkwara iji ya. `zcashd` ruru nkwụsịtụ ikpeazụ ya na Nkwụsị Nkwado na Julaị 2026. Ejila usoro ihe omume ochie ahụ dị ka ntuziaka maka ego dị ugbu a.

Oghere ndị a anaghị eme ka echiche ahụ baa uru. Ha na-akọwa ihe mere ntuziaka dị mma ga-eji kewaa ụdị nzuzo ahụ ma jiri ihe ndị dị na ya na ngwanrọ dị njikere maka ndị ọrụ nkịtị.

## Ajụjụ Ndị A Na-ajụkarị

### Enwere m ike igosi na m na-akwụ ụgwọ echekwara naanị na njirimara azụmahịa?

Mba. NJ ahụ nwere ike ịchọpụta azụmahịa ahụ na ọnọdụ nkwenye ya, mana onye nnata echekwara, ego, na ihe ncheta abụghị ihe ọha na eze.

### Nkpughe ịkwụ ụgwọ ọ bụ otu ihe ahụ dị ka igodo nlele?

Mba. A na-akọwapụta mkpughe gaa na nkọwa ahọpụtara nke otu azụmahịa. Igodo nlele nwere ike ikpughe ihe omume kwekọrọ na adreesị ma ọ bụ akaụntụ ka oge na-aga.

### Onye nnata ọ ga-emepụta ihe akaebe nke onye zitere ya?

Ọ bụghị n'okpuru atụmatụ ZIP 311. Mkpughe ziri ezi ga-egosi na ikike mmefu ego maka opekata mpe otu ntinye. Onye nnata nwere ike ịkwado ịkwụ ụgwọ site na iji ndekọ akpa ego nke ya, mana nke ahụ bụ nkwupụta dị iche.

### Enwere m ike ịkagbu mkpughe mgbe m kesịrị ya?

Mba. Ọ naghị enye ohere ịnweta akaụntụ n'ọdịnihu dị ka igodo nlele, mana enwere ike idetuo data na ihe akaebe ekpughere. Kesaa ya nke ọma dịka ndekọ ego nkeonwe ọ bụla.

### Nkwenye ọ na-akwagharị ma ọ bụ na-akpọchi ZEC ọ bụla?

Mba. Imepụta ma ọ bụ inyocha mkpughe anaghị emefu ego, akwụghachi ego, kwụsị, ma ọ bụ tụgharịa ego ahụ.

### Kedu ihe m ga-eji taa ma ọ bụrụ na obere akpa m enweghị njirimara ngosipụta?

Malite site na ndekọ akpa ego nke onye nnata, njirimara azụmahịa na ọnọdụ nkwenye, ntụaka akwụkwọ ọnụahịa dị na memo ezoro ezo, ma ọ bụ nnata ọzọ a nabatara n'otu n'otu. Jiri igodo nlele naanị mgbe achọrọ oke ya nke ọma ma ghọta ya nke ọma.

## akụrụngwa

- [ZIP 311: Nkọwapụta Ịkwụ Ụgwọ Zcash](https://zips.z.cash/zip-0311) - nhazi atụmatụ, ihe achọrọ, usoro nkwenye, na ihe nzuzo na-atụle
- [ZIP 310: Njirimara Nchekwa nke Igodo Ilele Sapling](https://zips.z.cash/zip-0310) - ihe igodo nlele na-ekpughe na ihe nkwa ha na-enye
- [ZIP 304: Mbinye aka na adreesị Sapling](https://zips.z.cash/zip-0304) - usoro nhọrọ nke ZIP 311 zoro aka na ya
- [Nkọwapụta usoro Zcash](https://zips.z.cash/protocol/protocol.pdf) - Sapling note encryption, outgoing viewing keys, and spend authorization
- [Akwụkwọ mkpughe ịkwụ ụgwọ zcashd echekwara](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - mmejuputa akụkọ ihe mere eme naanị maka Sprout, ọ bụghị ntuziaka dị ugbu a
- [atụmatụ ndị a na-anaghị eji eme ihe na zcashd](https://zcash.github.io/zcash/user/deprecation.html) - ọnọdụ nke iwu mkpughe nnwale ochie

## Ibe ndị metụtara ya

- [Azụmahịa](/using-zcash/transactions) - ịkwụ ụgwọ echekwara, nkwenye, na nsogbu nsogbu azụmahịa
- [Igodo ndị a na-elele](/zcash-tech/viewing-keys) - ohere ịgụ naanị na-aga n'ihu na nhọrọ mbupụ ugbu a
- [Ihe onye na-eme nchọpụta blọk nwere ike ịhụ](/zcash-tech/what-a-block-explorer-can-see) - ngalaba azụmahịa ọha na nkeonwe
- [Idebe ndekọ na ZEC echekwara](/zcash-use-cases/keeping-records-with-shielded-zec) - akaụntụ na-enweghị ebipụta akụkọ obere akpa ego
