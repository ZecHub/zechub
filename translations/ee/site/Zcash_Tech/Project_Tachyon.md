<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dɔwɔɖoɖo si nye Tachyon

## TL;DR

- Tachyon nye alesi wodoe ɖa be woatrɔ asi le alesi Zcash gakotokuwo dia ga siwo wokpɔ ta na hezãa wo ŋu, si woɖo be woana network la natsi va ɖo ezãla gbogbo aɖewo ŋutɔ gbɔ
- Egbea ele be gakotoku nadze agbagba aɖe blockchain ƒe akpa gã aɖe gɔme be yeake ɖe fexexe siwo nye eya ŋutɔ tɔ ŋu, eye ema koŋ tae shielded syncing se le eɖokui me be yele blewu ɖo
- Tachyon tsɔa **oblivious synchronization** ɖɔlia ema, eyata gakotoku xɔa nusi wòhiã evɔ meléa ŋku ɖe nusianu ŋu o eye megblɔa akpa siwo wòdi na server aɖeke o
- Eɖea fexexe ŋuti nyatakakawo hã doa goe le blockchain la me yia fexexe ƒe biabiaa ŋutɔ me, si wɔnɛ be ɖoɖowɔɖia nɔa bɔbɔe gake wòtrɔa agbanɔamedzia ɖe gakotokuwo dzi
- Enye aɖaŋuɖoɖo, si wota zi gbãtɔ le April 2025 me eye wotsɔ ŋkɔ nɛ be enye ame si di be yeaxɔ NU7. **meɖoe ɖee o**, eye ehiã be woawɔ mɔ̃ɖaŋudɔwo ƒe agbagbadzedze le Sapling ƒe dodoɖeŋgɔ ƒe lolome nu

<br/>

## Ameka tae esia nye

- Ame sia ame si kpɔ gakotoku si ŋu akpoxɔnu le ƒe ɖekawɔwɔ eye wòbia eɖokui be nukatae wòxɔa ɣeyiɣi didi nenema gbegbe ɖo hã
- Ame yeye siwo yia edzi kpɔa Tachyon si woyɔ le NU7 kple Zcash scaling xa
- Nuxlẽla siwo di susua gbã eye nya ɣaɣlawo ƒe nuŋɔŋlɔ evelia

<br/>

## Kuxi si gbɔ Tachyon kpɔna

Zcash ɣlaa amesiwo ƒe fetu aɖe nye na. Emae nye nya bliboa, eye wòhea kuxi si mebɔ o vɛ: ne ame aɖeke mate ŋu anya amesi tɔ fetu aɖe nye o la, aleke wò ŋutɔ wò gakotokua awɔ ake ɖe tɔwò ŋu?

Le Bitcoin me la, esia le bɔbɔe. Adrɛswo nye dutoƒo, eyata gakotoku ateŋu abia server "nukae woɖo ɖe adrɛs sia?" eye nàxɔ ŋuɖoɖo. Zcash gakotoku mateŋu abia nya ma o, elabena ebiabia aɖe nusi tututu wowɔ be woatsɔ aɣla tadeaguƒe si wotsɔ akpoxɔnu wɔe la afia.

Eyata Zcash wɔa nu bubu aɖe si to vovo. Amesi ɖoe ɖa la tsɔa ga si woxe la ƒe nyatakakawo ɣla eye wòtsɔa wo ɣlana ɖe asitsatsa la ŋutɔ me. Emegbe wò gakotokua wɔa dɔ to asitsatsa siwo le kɔsɔkɔsɔa dzi me eye wòdzea agbagba be yeaɖe wo dometɔ ɖesiaɖe gɔme. Agbagba ɖesiaɖe kloe doa kpo nu. Ame ʋɛ siwo kpɔa dzidzedzee nye wò fexexe. Woyɔa esia be **trial decryption**, eye wònye ame ŋutɔ tɔ, esɔ, eye wòwɔa blewu.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Nusi dzi dɔa nɔ te ɖoe nye nusi dzi woalé. Agbagba si wò gakotokua zãna la nɔa te ɖe alesi kɔsɔkɔsɔa loloe dzi, ke menye ɖe ga agbɔsɔsɔme si nèxe ŋutɔŋutɔ dzi o. Ame aɖe si mexɔ fetu ɖeka pɛ hã kpɔ o la wɔa dɔ si sɔ kple ame si xɔa wo gbesiagbe kloe. Esi Zcash le tsitsim la, ema va gblẽna ɖe edzi na amesiame. Le aɖaŋuɖoɖoa ƒe nya nu la, "ɖeko medzidzea nu o."

<br/>

## Nusi Tachyon trɔna

Tachyon dze kuxia dzi le eƒe ke me: edzudzɔ blockchain zazã abe fexexe ƒe nya ɣaɣlawo ɖoɖoɖa ƒe mɔnu ene.

Ke boŋ, nyatakaka siwo nèhiã la zɔ mɔ kple fexexe ƒe biabiaa ŋutɔ, le ha me. Fexexe ƒe biabiawo, URI, alo QR-kɔda tsɔa nyatakaka siwo wotsɔ ɣla ɖe asitsatsa la me tsã. Sean Bowe ɖɔ esia be exɔ **fexexe le haƒoha godo** zi gbãtɔ le Zcash shielded protocol me.

Ne kɔsɔkɔsɔa megale nyatakaka mawo tsɔm o ko la, susu aɖeke meganɔa wò gakotokua me be wòadi wo o, eye dodokpɔa ƒe nya ɣaɣlawo ɖeɖeɖa ƒe kuxia nu yina.

Gake egahiã kokoko be wò gakotokua nanya kɔsɔkɔsɔ ƒe nɔnɔme si li fifia hafi nàte ŋu azãe. Emae nye aɖaŋua ƒe afã evelia, **oblivious synchronization**: mɔnu si dzi gakotoku aɖe ato axɔ nu tɔxɛ siwo wòhiã evɔ maɖe nusiwo wòbia la afia server la o.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Nusi wòafia na amesi le gakotoku zãm

- **Syncing dzudzɔ tsitsi kple kɔsɔkɔsɔa.** Ɣeyiɣi si wò gakotokua zãna tsɔ léa wòe la alé ŋku ɖe wò ŋutɔ wò dɔwɔna ŋu tsɔ wu be wòalé ŋku ɖe Zcash ƒe lolome ŋu.
- **Fexexe va zua abe gaxɔgbalẽvi tsɔtsɔ de asi na ame aɖe ene.** Fexexe ƒe biabiaa tsɔa nusi amesi xɔe hiã, eyata asitɔtrɔ le ame si ɖoe ɖa kple amesi xɔe dome le vevie wu alesi wòle egbea.
- **Gakotokuwo tsɔa agbanɔamedzi geɖe wu.** Esi kɔsɔkɔsɔa megaléa wò fexexe ŋuti nyatakakawo ƒe kɔpi si wotsɔ nya ɣaɣlawo ŋlɔ ɖe asi o ta la, wò gakotoku ŋuti nyatakakawo ƒe bu le vevie wu. Backup kple recovery ʋuna tso protocol feature nyenye dzi va zua nane si gakotoku software nawɔ nyuie.
- **Akpa nyanyɛ aɖewo ʋuna alo buna.** Tachyon ɖea safuiwo ƒe vovototodedeameme, safuiwo kpɔkpɔ, kple fexexe ƒe adrɛswo ɖa le ɖoɖowɔɖi vevitɔa me, eye wògblẽa wo ɖe gakotokua ƒe ƒuƒoƒoa me. Esia nye aɖaŋuɖoɖoa ƒe akpa siwo do tso eme wu dometɔ ɖeka eye wogale dɔ wɔm tso eŋu kokoko.

<br/>

## Mɔ̃ɖaŋunuxlẽlawo ƒe ŋkuléle ɖe nu ŋu nyuie wu

Wogblɔ tso Tachyon ŋu be enye tɔtrɔ si sɔ ɖe megbe na Orchard ƒe ɖoɖowɔɖia. Woate ŋu atsɔe ade dɔwɔwɔ me abe tɔtrɔ ɖe Orchard ta si li fifia ŋu alo abe ta si ŋu wokpɔ akpoxɔnu le si le vovo si gbɔ woɖo to a [turnstile ƒe ʋuƒo](https://zechub.wiki/zcash-tech/the-turnstile), si nye mɔ̃ ma ke si Zcash zã na Ironwood. Tiatia la kpɔa ŋusẽ ɖe alesi woawɔe dzi, ke menye alesi woawɔe o.

Edzraa nu geɖe ɖo tso Orchard gbɔ: RedPallas safui gbugbɔgawɔ le vome, homomorphic asixɔxɔ ƒe ŋugbedodowo kple asidede agbalẽ te siwo blaa nu, kple safui ƒe ɖoɖo si woma si naa mɔ̃ aɖe tsɔa ame de asi na kpeɖodzi evɔ metsɔa gazazã ƒe ŋusẽ dea asi o.

Dzesidedɔa nɔa te ɖe **nyatakaka siwo tsɔa kpeɖodzinyawo** dzi, si nye mɔnu si me nyatakakawo zɔna kpena ɖe kpeɖodzi si ɖee fia be esɔ la xa, ale be ne wotsɔe ƒo ƒu kple nyatakaka bubu siwo tsɔa kpeɖodziwo la, nane si nyia kpeɖodzi mawo ƒe dome eye wòkekea wo ɖe enu la dona. Esiae na be woate ŋu aƒo dɔ gbogbo aɖe si ŋu woɖo kpee nu ƒu wòazu nu sue aɖe si woate ŋu akpɔ kabakaba. Halo, si ŋu ƒuƒoƒo si le megbe na Zcash ke ɖo lae na be kpeɖodzinyawo tsɔtsɔ yi teƒe bubuwo wɔ dɔ ale gbegbe be woate ŋu atu wo ɖo.

Ka etɔ̃lia enye **shielded transaction aggregates**, si trɔa alesi wogblɔa shielded state ƒe tɔtrɔwo eye wòkpɔa ŋusẽ ɖe alesi asidede agbalẽ te wɔa dɔe dzi.

<br/>

## Afisi dɔa le

Tachyon nye **ɖoɖo, menye nɔnɔme si woɖo ɖa o** o. Wotae le April 2025 me, eye nyatakaka aɖe si woŋlɔ ɖe edzi le May 2025 me wɔ dɔ to nusiwo dzi woda asi ɖo la me. Woyɔe be enye ame si di be yeaxɔ NU7, si nye ŋgɔyiyi gã si kplɔe ɖo le Ironwood megbe, gake wotsɔ gaku ƒe akɔdada tso nya me le NU7 me nyawo ŋu eye womekpɔ naneke tso Tachyon ŋu o.

Agbalẽŋlɔla ŋutɔ ƒe ɖoɖoe nye be esia nye ɖoɖo si ŋu woate ŋu awɔ nu le tsɔ wu be wòanye numekuku si wowɔ le nususugblɔ me, gake esi hiã mɔ̃ɖaŋudɔwɔwɔ si sɔ kple Sapling, eye woɖoe koŋ gblẽ nyabiase sesẽ aɖewo ɖi na emegbe.

Dɔ siwo do ƒome kplii la dzena xoxo. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), si nye node blibo si woɖe ɖe go le July 2026 me, nye agbagbadzedze ɖekae le Project Tachyon kple Valar Group dome eye wòkpɔa tɔtrɔ siawo dometɔ aɖewo le network-level me do ŋgɔ. [Ame ŋutɔ ƒe nyatakakawo xɔxɔ](https://zechub.wiki/zcash-tech/private-information-retrieval) numekuku ƒe taɖodzinue nye be woawɔ scanning bottleneck ɖeka ma ke tso dzogoe bubu dzi.

<br/>

## Nukpɔsusu totro siwo bɔ

- **Tachyon mele agbe o.** Gakotoku aɖeke mezãnɛ egbea o, eye tɔtrɔ aɖeke hã mewɔe dɔ o.
- **Tachyon menye nu ɖeka kple Ironwood o.** Ironwood wɔ dɔ le July 2026 me eye wòwɔ nu ɖe ​​Orchard ta kple turnstile ŋu. Tachyon nye aɖaŋuɖoɖo si to vovo, si wodo emegbe ku ɖe scaling ŋu.
- **Tachyon menye adzamenyawo dzi ɖeɖe kpɔtɔ o.** Taɖodzinuae nye be woana ledger ƒe vovototodedeameme nanɔ anyi esime wole scaling cost ɖem ɖa, ke menye be woatsɔ adzamenyawo aɖɔli duƒuƒu o.
- **zk-SNARK ƒe kpeɖodzinana menye nusi xe mɔ nɛ gbeɖe o.** Aɖaŋuɖoɖoa gblɔe kɔte be akpa si le blewu enye alesi gakotokuwo kea ɖe nɔnɔme ŋu eye wowɔa ɖoɖo ɖe nɔnɔme ŋu, ke menye ga si woatsɔ alé ŋku ɖe kpeɖodziwo ŋu o.
- **"Targeted at NU7" menye ɖokuitsɔtsɔna o.** Nusi ge ɖe NU7 me la, wotsoa nya me to akɔdada me.

<br/>

## Nyagɔmeɖegbalẽ

| Nyagbe | Gɔmesese |
|---|---|
| Dodokpɔ ƒe nya ɣaɣlawo ɖeɖeɖa | Agbagbadzedze be woaɖe asitsatsa ƒe nya ɣaɣlawo me ɖekaɖeka be nàke ɖe esiwo woɖo ɖe wò ŋu |
| In-band adzame mama | Fexexe ƒe nya ɣaɣla la dede asitsatsa la me le blockchain la dzi, abe alesi Zcash wɔnɛ egbea ene |
| Fexexe le haƒohaa godo | Fexexe ŋuti nyatakakawo tsɔtsɔ yi ame si ɖoe ɖa kple amesi xɔe dome tẽ tsɔ wu be woato kɔsɔkɔsɔ |
| Oblivious synchronization | Kɔsɔkɔsɔ ŋuti nyatakaka siwo gakotoku hiã la xɔxɔ evɔ womaɖe nyatakaka siwo wobia la afia o |
| Kpeɖodzi-siwo tsɔa nyatakakawo (PCD) | Nyatakaka siwo zɔa mɔ kple kpeɖodzi si ɖee fia be eya ŋutɔ ƒe dzɔdzɔenyenye, ale be woate ŋu aƒo kpeɖodziwo nu ƒu ahaƒo wo nu ƒu |
| Shielded asitsatsa ƒe ƒuƒoƒo | Tachyon ƒe mɔ si dzi wòtona blaa shielded state trɔna, trɔa alesi woɖoa dze kple woe eye wodea asi ete |
| Ledger vovototodedeameme ƒe ŋutete | Womate ŋu agblɔ nunɔamesi siwo kpɔ asitsatsa ta la ɖe vovo tso wo nɔewo gbɔ o |

<br/>

## Nyabiasewo ƒe Nyabiasewo

**Ðe esia ana nye gakotokua nawɔ ɖeka kabakabaa?** Emae nye taɖodzinua. Ɣeyiɣi ƒe ɖoɖowɔwɔ ɖekae akplɔ wò ŋutɔ wò dɔwɔna ɖo ɖe kɔsɔkɔsɔa ƒe lolome teƒe. Naneke meɖo ɖa o, eyata xexlẽme aɖeke meli si wodzidze si woayɔ haɖe o.

**Ðe wòhiã be mawɔ nane fifiaa?** Ao, Tachyon nye aɖaŋuɖoɖo. Ne woxɔe la, ava to network upgrade dzi kple gbeƒãɖeɖe si wozãna ɖaa.

**Ðe nukpɔkpɔ ƒe safuiwo ɖeɖeɖa fia be ŋutete si le ame si be wòama nuxexlẽ ƒe mɔɖeɖea bu?** Aɖaŋuɖoɖoa ʋu ŋutete ma do goe le ɖoɖowɔɖi vevitɔa me yi ɖe gakotoku ƒe ƒuƒoƒoa me. Alesi ema le le nuwɔna me nye nyabiase siwo wobia faa la dometɔ ɖeka.

**Ðe nye ga le afɔku me ne Tachyon ɖo meliwoa?** Deployment azã Orchard upgrade alo turnstile, wo ame evea siaa wowɔ ale be asixɔxɔ naʋuʋu le dukɔa ƒe akɔntabubu sewo nu. Ironwood ƒe axaa ɖe alesi ʋuƒo si wotsɔ trɔa asi le nu ŋu wɔa dɔe me.

<br/>

## Axa siwo do ƒome kplii

- [Ame ŋutɔ ƒe Nyatakakawo Xɔxɔ](https://zechub.wiki/zcash-tech/private-information-retrieval) - mɔnu bubu si dzi woato awɔ gakotoku ƒe scanning bottleneck ma ke
- [Zakura Node ƒe ŋkɔ](https://zechub.wiki/zcash-tech/zakura-node) - node si wotu ƒe akpa aɖe tso Tachyon ƒe mɔ̃ɖaŋudɔwɔwɔ ƒe agbagbadzedze me
- [Ironwood ƒe ati](https://zechub.wiki/zcash-tech/ironwood) - ɖɔɖɔɖo si wɔ dɔ le July 2026 me, si wotɔtɔna zi geɖe kple Tachyon
- [Turnstile ƒe ʋuƒoa](https://zechub.wiki/zcash-tech/the-turnstile) - mɔ̃ si Tachyon ateŋu azã ne woɖoe abe eya ŋutɔ ƒe ta ene
- [Dedienɔnɔ le Quantum megbe](https://zechub.wiki/zcash-tech/post-quantum-security) - afisi Tachyon nɔa anyi ɖe ɖoɖowɔɖi ƒe dɔwɔwɔ si xɔa ɣeyiɣi didi wu xa
- [Alesi Wowɔ Ðoɖo Ðe Zcash Ŋui](https://zechub.wiki/start-here/how-zcash-is-organized) - ame si le dɔ sia wɔm kple alesi lãwo ƒe agbenɔnɔ ƒe ɖoɖoa wɔ ɖeka

<br/>

## Nunɔamesiwo

- [Tachyon: Zcash ƒe dzidzeme kple Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 April 2025, aɖaŋuɖoɖo gbãtɔ
- [Tachyaction le Adzɔge ʋĩi](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, nukpɔsusu ɖeka kple ɖoɖowɔɖi ƒe gɔmesesewo, woŋlɔe na ɖoɖowɔɖi wɔlawo
- [Sean Bowe ƒe blog](https://seanbowe.com/blog/) - afisi wota Tachyon ƒe agbalẽ siwo kplɔ wo nɔewo ɖo le
- [tachyon.z.ga si wotsɔna xɔa gae](https://tachyon.z.cash/) - dɔa ƒe teƒe
