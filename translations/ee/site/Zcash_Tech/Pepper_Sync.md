<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Atadi ƒe Ðoɖowɔwɔ

## TL;DR

* Pepper Sync nye synchronization engine si woto vɛ le Zingo me! 2.0, si nye Zcash gakotoku si woate ŋu azã le mɔ gbadza nu si Zingo Labs tu.
* Ezãa non-linear synchronization tsɔ wu be wòalé ŋku ɖe kɔsɔkɔsɔa ŋu le akpa gã siwo kplɔ wo nɔewo ɖo me, eyata wò ga si susɔ kple asitsatsa la dzena kaba ŋutɔ.
* Wodzraa ŋgɔyiyi ɖo ɣesiaɣi. Ne kadodoa ɖiɖi alo dɔwɔnua tu la, wogadzea wɔwɔ ɖekae gɔme tso afisi wòtɔ ɖo tsɔ wu be woagadze egɔme ake.
* Àte ŋu azãe hafi synchronization nawu enu.
* Asitsatsa siwo wokpɔ ta na la gakpɔtɔ nye ame ŋutɔ tɔ le ɖoɖo bliboa me.

## Numeɖeɖe Vevitɔ

Zingo 2.0 nye Zingo ƒe tɔtrɔ yeyetɔ! gakotoku, gakotoku si le bɔbɔe, si woate ŋu aʋu na Zcash nutoa me tɔwo. Ɣletivi si woɖe ɖe go siae nye Pepper Sync, si nye tɔtrɔ gã aɖe si gbugbɔ bu alesi gakotokuwo do ƒome kple blockchain la ŋu keŋkeŋ.

Tsã la, nuwɔwɔ ɖekae ate ŋu ase le eɖokui me be ele blewu vevesesetɔe, vodadawo ate ŋu adzɔ, eye nunɔamesiwo sɔ gbɔ, eye ɣeaɖewoɣi la, zinɛ ɖe ezãlawo dzi be woagadze egɔme tso gɔmedzedzea me ke. Pepper Sync trɔa nu mawo katã. Enaa nuwɔwɔ ɖekae kabakaba, wònɔa bɔbɔe, kakaɖedzi nɔa eŋu, eye mebiaa nu geɖe tso wò mɔ̃a dzi o, evɔ wòkpɔa asitsatsa siwo ŋu wokpɔ ta na ƒe adzamenyawo ta bliboe.

Eɖanye zãla yeye aɖee nènye si le Zcash dom kpɔ zi gbãtɔ o, alo nutoa me tɔ si le gakotoku geɖe siwo ŋu wokpɔ akpoxɔnu le dzi kpɔm ɣeyiɣi didi aɖee nènye o, Pepper Sync na nuteƒekpɔkpɔa wɔa dɔ wu eye wòvivina wu.

### Nu vevi siwo le Pepper Sync me

Pepper Sync to ŋgɔyiyi geɖe vɛ:

- Much Faster Syncing - Wò gakotokua le klalo le aɖabaƒoƒo ʋɛ aɖewo me, ke menye gaƒoƒo ʋɛ aɖewo me o.
- Smart Updates - Wowɔa dɔ tso nyatakakawo ŋu le akpa suewo me, woƒoa asa na gbugbɔgakpɔkpɔ bliboe.
- Resilient to Interruptions - Ne wò kadodoa ɖiɖi la, syncing gadzea egɔme le afisi wòtɔ ɖo.
- Lightweight & Efficient - Wowɔe wònyo wu na telefonwo, kɔmpiutawo, kple mɔ̃ bubu siwo ƒe ŋusẽ le sue wu.
- Nyaŋuɖoɖo si me kɔ wu - Ɣeyiɣi ŋutɔŋutɔ ƒe ŋgɔyiyi yeyewo ɖea tɔtɔ dzi kpɔtɔna.
- Ameŋunyatakakawo Takpɔkpɔ - Asitsatsa siwo wokpɔ ta na la gakpɔtɔ nye ame ŋutɔ tɔ le dɔwɔwɔ bliboa me.

### Nukae nyo wu tsã

Zingo ƒe tɔtrɔ xoxowo doa dziku na zãlawo zi geɖe le ɣeyiɣi didi siwo wotsɔ wɔa nu ɖekae, vodadawo gbɔ kpɔkpɔ si me mekɔ o, kple nunɔamesiwo zazã vevie ta. Pepper Sync ɖɔa nya siawo siwo bɔ ɖo:

| Feature | Zingo ƒe gɔmeɖeɖe siwo do ŋgɔ | Zingo 2.0 kple Atadi Sync |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Sync ƒe Duƒuƒu | Blewu, vevietɔ le ɖoɖo gbãtɔ me | Gbãtɔ kple edziyiyi ƒe wɔwɔ ɖekae kabakaba wu sã |
| Vodadawo Gbɔkpɔkpɔ | Ɣeaɖewoɣi ƒe nudzraƒewo kple kpododonu siwo me mekɔ o | Liƒo si nyo wu kple automatic recovery |
| Zãla ƒe Nuteƒekpɔkpɔ | Sync se le eɖokui me be "opaque" na ame yeyewo | Edzena le gaglãgbe, kple nɔnɔme si me kɔ wu kple yeyewo |
| Mɔ̃a ƒe Dɔwɔwɔ | CPU/ŋkuɖodzinu zazã si lolo | Wowɔe wònyo wu na nunɔamesiwo zazã nyuie |

Kpuie ko la: nuwɔwɔ ɖekae le kabakaba wu fifia, kakaɖedzi le eŋu wu, eye egɔmesese le bɔbɔe wu.

## Nukpɔkpɔ / Nusɔsrɔ̃

Bu gakotoku ƒe ɖekawɔwɔ xoxo aɖe abe agbalẽ didi ŋutɔ aɖe xexlẽ tso axa gbãtɔ dzi, sesĩe, hafi woaɖe mɔ na wò be nàgblɔ nya aɖe tso eŋu ene ŋu kpɔ. Dzudzɔ mɔa ƒe afã, eye nàgadze egɔme tso axa gbãtɔ dzi. Pepper Sync xlẽa agbalẽ ma ke, gake eléa dzesidenu ɖe ​​asi, exlẽa ta siwo le vevie na wò gbã, eye wònana nèƒoa nu tso ŋutinyaa ŋu hafi wu axa mamlɛtɔ nu.

Dzesi lae nye akpa vevitɔ. Trɔtrɔ ɖesiaɖe si do ŋgɔ bu sync si wotso la be enye dɔ gbegblẽ; Pepper Sync bua eŋu abe ɖiɖiɖeme ene.

### Mɔfiame siwo wokpɔna

- Detailed Flow - Fia ɖoɖo bliboa. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Simplified Flow - Nukpɔkpɔ kabakaba na gbesiagbe zãlawo. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Deep Dive (Tsi me tsi goglo).

### Alesi Pepper Sync wɔa dɔe (nukpɔkpɔ bɔbɔe) .

Le esi teƒe be Pepper Sync nagbugbɔ alé ŋku ɖe blockchain la ŋu le akpa gã siwo me mekɔ o me la, ewɔa dɔ le afɔɖeɖe suesuesue siwo dzi nàte ŋu aɖu me—eɖea wò teƒe ɖa ɣesiaɣi ne ele yiyim.

1. Do ka - Gakotokua léa ŋku ɖe network la ŋu.
2. Fetch Blocks - Woɖea nyatakakawo vivivi.
3. Kpɔ egbɔ - Woda asi ɖe asitsatsa dzi.
4. Handle Shielded Notes - Wokpɔa ame ŋutɔ ƒe nyawo ta ɣesiaɣi.
5. Update Balances - Gakotokua gbugbɔa nu yeyee dedie.
6. Save Progress - Dzudzɔ eye wògadzea egɔme ake le mɔ si mewɔa dɔ o nu.
7. Finish - Gakotokua le klalo be yeawɔ asitsatsa.

## Nusiwo wòfia ŋutɔŋutɔ

### Amekawoe Pepper Sync ɖea vi na?

- Zãla Yeyewo - Ate ŋu aɖo gakotokuwo kaba evɔ womaɖe dzi le ƒo le megbedede ta o.
- Gbesiagbe Zãlawo - Nuwɔwɔ ɖekae si ŋu kakaɖedzi le na be fexexe si wokpɔ ta na la wɔa dɔ na gbesiagbe zazã.
- Developers & Testers - Sync ɣeyiɣi kpuiwo fia dodokpɔ ƒe tsatsam kabakaba.
- Mobile & Light Devices - Zingo wɔa dɔ nyuie fifia le xɔtunu siwo ƒe nunɔamesiwo seɖoƒe li na gɔ̃ hã dzi.

### Nusita wòle vevie na Zcash

Wotu Zcash ɖe asitsatsa siwo wokpɔ ta na, si nye ameŋunyatakakawo ŋuti dɔwɔnu sesẽtɔwo kekeake dometɔ ɖeka le cryptocurrency me. Gake ne woate ŋu akpɔe ko hafi ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla ɖea vi.

Pepper Sync kpena ɖe ame ŋu to:

- Mɔxenu siwo xea mɔ na gege ɖe eme dzi ɖeɖe kpɔtɔ - Zãla yeyewo ateŋu adze egɔme kaba.
- Do alɔ gbesiagbe zazã - Adrɛs siwo wokpɔ ta na la va nɔa bɔbɔe be woaka ɖe wo dzi.
- Nu gbagbewo ƒe lãmenugbagbeviwo ƒe dzidziɖedzi ƒe dzidedeƒo - Gakotoku ƒe nuteƒekpɔkpɔ nyuitɔ ʋãa amewo be woaxɔ wo, dɔwɔɖoɖowo, kple dɔwɔnawo geɖe wu.

To gakotoku ƒe nuteƒekpɔkpɔ ƒe nyonyo me la, Pepper Sync doa ŋusẽ Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖo bliboa.

### Gɔmedzedze: onboarding kple Zingo 2.0

1. Download the Wallet - Xɔ eƒe tɔtrɔ nyuitɔ tso [Zingo GitHub ɖea axa ɖe go](https://github.com/zingolabs/zingolib)
2. Ðo Wò Gakotoku - Wɔ yeye alo gbugbɔe tso nuku ƒe nyagbe si li xoxo me. [Zingo 2.0 kple Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Let Pepper Sync Run - Kpɔ ŋgɔyiyi ƒe dzesiwo esime wò gakotokua le tɔtrɔm. [Pepper Sync Duƒuƒu](https://x.com/ZingoLabs/status/1961871338441724191)
4. Dze Zcash Zazã gɔme - Ðo ZEC si wokpɔ ta na la ɖa eye nàxɔe ne wonya wu enu ko.
5. Ði ɖe eme le Nutsotsowo Ŋu - Ne dɔwɔnua tu alo kadodoa ɖiɖi la, Pepper Sync agadze egɔme le eɖokui si.

## Vodada Siwo Wowɔna Zi geɖe

**Nuwɔwɔ ɖe Pepper Sync ŋu abe gakotoku ene le eɖokui si**. Pepper Sync nye synchronization engine si le Zingo la me! gakotoku, ke menye dɔwɔnu si woɖe ɖe vovo o. Ède Zingo ɖe wò kɔmpiuta dzi; Pepper Sync ye nye nusi ƒua du le ete.

**Ne míetsɔe be nuwɔwɔ ɖekae kabakaba wu fia be adzamenyawo gbɔdzɔ wu**. Duƒuƒua tso alesi woxɔa block data, ɖoa ɖoɖo ɖe wo ŋu, eye wodzraa wo ɖo me, ke menye tso nyatakaka bubuwo ɖeɖefia me o. Asitsatsa siwo wotsɔ akpoxɔnu wɔe la nɔa ame ŋutɔ ƒe nya me le ɣeyiɣi bliboa me.

**Ne míetsɔe be ele be nàwɔ ɖeka bliboe hafi nàte ŋu azãe**. Gazazã hafi woawu nuwo wɔwɔ ɖekae nu nye Pepper Sync ƒe tanyawo dometɔ ɖeka, eyata mehiã be nàlala be gakotokua naɖo kɔsɔkɔsɔa ƒe nugbɔ o.

## FAQ - Nyabiase siwo bɔ

**Q: Ðe wòle be magawɔ scan ɣesiaɣi si meʋu gakotokua?**

A: Ao, Pepper Sync dzraa ŋgɔyiyi ɖo, eyata teƒe mamlɛtɔ koe nèwɔa yeyee.

**Q: Nukae adzɔ ne nye internet la tso?**

A: Sync tɔ vie eye wòayi edzi emegbe evɔ màgadze egɔme ake o.

**Q: Ðe nye adzamenyawo le dedie esime mele wɔwɔm ɖekaea?**

A: Ɛ̃. Asitsatsa siwo wokpɔ ta na la gakpɔtɔ nye ame ŋutɔ tɔ bliboe.

**Q: Ɣeyiɣi didi kae sync gbãtɔ xɔa?**

A: Zi geɖe la, minitiwo tsɔ wu gaƒoƒo, le wò mɔ̃a kple internet dzi.

**Q: Ðe mate ŋu azã gakotokua hafi syncing nawu enua?**

A: Ɛ̃. Pepper Sync doa alɔ gazazã hafi wɔwɔ ɖeka wu enu, eyata mehiã be nàlala be gakotokua naɖo kɔsɔkɔsɔa ƒe nugbɔ o.

## Nyanuwuwuw

Le Zingo 2.0 Pepper Sync me la, nuwɔwɔ ɖekae meganye vevesese gãtɔ kekeake le gakotoku siwo ŋu wokpɔ akpoxɔnuwo le o. Fifia ewɔa dɔ kabakaba, eli ke, eye wòzãna le bɔbɔe, si ɖea mɔxenu si le ame yeyewo ŋu dzi kpɔtɔna eye wòna gbesiagbe zazã ɖea vi wu sã.

Le ezãlawo gome la, efia be womagalala fũ o eye woanɔ adzame geɖe wu. Le dɔwɔlawo gome la, efia gɔmeɖoanyi sesẽ si dzi woatu ɖo. Le Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa gome la, enye afɔɖeɖe bubu si ana woawɔ asitsatsa siwo ŋu wokpɔ ta na la nate ŋu akpɔ amesiame.

Zingo 2.0 kple Pepper Sync menye tɔtrɔ dzro aɖe ko o; enye titri yi ŋgɔ na ame ŋutɔ ƒe crypto si woate ŋu azã.

## Axa Siwo Do Ƒome Kplii

- [Zcash Gakotoku ƒe Ðoɖowɔwɔ](/zcash-tech/zcash-wallet-syncing) — alesi gakotoku ƒe wɔwɔ ɖekae wɔa dɔ le Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa katã me.
- [Lightwallet ƒe Nodes](/zcash-tech/lightwallet-nodes) — xɔtuɖoɖo si gakotoku si me kɔ abe Zingo ene wɔ ɖeka kplii.
- [Zaino](/zcash-tech/zaino) — indexer si Zingo ƒe ƒuƒoƒoa to vɛ.
- [Gakotokuwo](/wallets) — Zcash gakotokuwo ƒe nyatakakadzraɖoƒe bliboa kple woƒe nɔnɔmewo.

## Nusɔsrɔ̃ Bubuwo

- [Zingo! GitHub Nudzraɖoƒe](https://github.com/zingolabs/zingolib)
- [Zcash Nutome Nyamedzroƒe](https://forum.zcashcommunity.com/)
- Gbeƒãɖeɖewo le Dziɖuɖua Me - . [Zingo Labs ƒe Twitter dzi](https://twitter.com/ZingoLabs)

___
___
