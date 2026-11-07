<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aŋlɔ Axa"/>
</a>

# Zingo 2.0 - Pepper Sync

## Nya Veviwo Kpuie

* Pepper Sync nye sync ƒe mɔ̃, si woɖe fia le Zingo! 2.0 me, si nye Zcash gakotoku [wallet] si nye dɔwɔnu si ƒe source code le fũ, eye Zingo Labs wɔe.
* Eɖoa sync wɔm le mɔ̃ si menye ɖoɖonu [chain] ƒe scan le akpa gãwo me ɖe ɖoɖo me o, ale wò balance kple gaɖoɖowo [transactions] ado go kpɔtɔ wu.
* Woɖoa ŋgɔyiyi ƒe nyawo ɖe dzi zi sia zi. Ne kadodo ƒe kaɖedzi tso alo app la tu, sync aga yi edzi tso afi si wòtsɔe tso, le egɔme yeye gɔme o.
* Àte ŋu azã ga hafi sync wu.
* Gaɖoɖowo siwo nye ɣaɣla [shielded] nɔa ɣaɣla le ɣeyiɣi blibo la me.

## Nɔnɔme ƒe Nyadzɔdzɔ

Zingo 2.0 nye Zingo! gakotoku ƒe version yeye, si nye gakotoku bɔbɔe, si ƒe source code le fũ, eye wowɔe na Zcash ƒe hadome. Nu vevi tso release sia me nye Pepper Sync, si nye upgrade gã aɖe si trɔa mɔ̃ si gakotokuwɔwo do ƒome kple gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] la bliboa.

Tsã la, sync wɔnate ŋu anɔ abe nu si blewu, le vodada geɖe, eye wòbia ŋusẽ geɖe ene, eye ɣeaɣi aɖewo la, eɖena be zazãlawo nagɔme tso gbɔ. Pepper Sync trɔa esia katã. Ewɔa sync yi kaba, nɔa bɔbɔe, le asinye, eye mebiaa nu geɖe tso wò mɔ̃ dzi o, esi wòle ɣaɣla [privacy] si le gaɖoɖowo siwo nye ɣaɣla me la dom bliboa.

Ne ènye zazãla yeye aɖe si le Zcash dom kpɔ zi gbãtɔ, alo hadome ƒe membro si nɔ anyi blewu si le gakotokuwɔ siwo nye ɣaɣla sɔ gbɔ dom, Pepper Sync na nɔnɔme la wɔnate ŋu azu nu si wɔa dɔ nyuie eye wɔnate ŋu adzɔ wu.

### Pepper Sync ƒe nɔnɔme veviwo

Pepper Sync tsɔ nyanyui geɖewo va:

- Sync Si Yia Kaba Ŋutɔ - Wò gakotoku anɔ klalo le minutiwo me, menye gaƒoƒowo me o.
- Nudzraɖoɖo Si Le Ŋku - Woɖoa data wɔm le akpa suewo me, eye menye rescan blibo o.
- Ete Ŋu Atsɔ Gbegbeawo - Ne wò kadodo ƒe kaɖedzi tso, sync aga yi edzi tso afi si wòtsɔe tso.
- Bɔbɔe & Le Asinye - Woɖoe ɖe telefonwo, laptopwo, kple mɔ̃ bubu siwo me ŋusẽ menɔ geɖe o ta.
- Nya Si Kɔ Wu - Ŋgɔyiyi ƒe nyadzɔdzɔwo le ɣeyiɣi me na vɔvɔ̃ dzɔdo.
- Ɣaɣla-Dzidze - Gaɖoɖowo siwo nye ɣaɣla nɔa ɣaɣla le nɔnɔme la blibo me.

### Nu si nyo wu tso tsã

Zingo ƒe version xoxoawo ɖe vɔvɔ̃ dzi na zazãlawo zi geɖe kple sync ɣeyiɣi didiwo, vodada ƒe mɔ̃ si mekɔ o, kple mɔ̃ ƒe ŋusẽ zazã geɖe. Pepper Sync trɔa fukpekpe siawo:

| Nɔnɔme            | Zingo Ƒe Version Xoxoawo                | Zingo 2.0 Kple Pepper Sync                   |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Sync Ƒe Kabakaba         | Edoa megbe, vevie le ɖoɖo gbãtɔ me      | Sync gbãtɔ kple sync si yia edzi yia kaba ŋutɔ         |
| Vodada Ƒe Dzidzeme     | Tsi tsaɖeɖe aɖewo kple vodada si mekɔ o | Asinye nyo wu kple gbɔgbɔɖoɖo si wɔa eɖokui   |
| Zazãla Ƒe Nɔnɔme    | Sync nɔa abe "mekɔ o" ene na ameyeyeawo        | Enye nuwo ƒe ʋuʋuɖi [transparent], kple status kple nudzraɖoɖo siwo kɔ wu |
| Mɔ̃ Ƒe Dɔwɔwɔ | CPU/memory zazã geɖe                  | Woɖoe ɖe mɔ̃ ƒe ŋusẽ zazã bɔbɔe ta            |

Le nu kpuie me: Sync yia kaba, le asinye wu, eye ewɔa bɔbɔe be woase gɔme.

## Nɔnɔme Kple Ɖeɖeɖe

Bu gakotoku xoxo ƒe sync ŋu abe agbalẽ didi aɖe ƒe xexlẽ tso axa gbãtɔ dzi, kple gbeɖiɖi, hafi woana mɔ na wò be nàgblɔ nu tsoe ŋu ene. Ne ètɔ le afã me, àgɔme ake tso axa gbãtɔ dzi. Pepper Sync xlea agbalẽ ma ke, gake etsɔa bookmark ɖoa afia, xlea ta siwo le vevie na wò gbã, eye ena mɔ wò nàgblɔ nu tso nya la ŋu hafi nàwu axa mamlɛtɔ.

Bookmark lae nye nu vevi la. Version siwo katã va yi la kpɔ sync si wotɔ la abe dɔ si ƒe dzɔdzɔ katã bu ene; Pepper Sync kpɔa eŋu abe dzudzɔ ene.

### Nɔnɔme ƒe mɔfiamewo

- Mɔ̃ Ƒe Nɔnɔme Kɔkɔe - Eɖea mɔ̃ blibo la fia. ![Detailed Flow](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Mɔ̃ Ƒe Nɔnɔme Bɔbɔe - Nuku kpui aɖe na zazãla siwo zãa e zi sia zi. ![Simplified Flow](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Nudzɔdzɔ Kpɔtɔ

### Ale si Pepper Sync wɔa dɔ (nɔnɔme bɔbɔe)

Le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la scan yeye le akpa gã siwo wɔa dɔ kple kuxi me teƒe la, Pepper Sync wɔa dɔ le afɔɖeɖe sue siwo wɔnate ŋu wɔa dɔ me—eye wòle afi si wòto ɖo ɣesiaɣi.

1. Ɖo Ƒome - Gakotoku la doa ƒome kple network la.
2. Xɔ Blocks - Woɖea data kpoo kpoo.
3. Kpɔ Nyateƒe - Woɖoa gaɖoɖowo ƒe nyateƒe kpɔ.
4. Wɔ Dɔ Kple Didienuwo Siwo Nye Ɣaɣla - Ɣaɣla nɔa anyi ɣesiaɣi.
5. Trɔ Balancewo - Gakotoku la trɔa yeyee le dedie me.
6. Ɖo Ŋgɔyiyi ɖe Afi - Enaa mɔ wòtɔa eye wògɔme akpaɖe.
7. Wu - Gakotoku la klalo be wòawɔ gaɖoɖo.

## Nudzɔdzɔ Siwo Dze Eme

### Ame kae Pepper Sync na vi?

- Zazãla Yeyeawo - Wòate ŋu aɖo gakotokuwɔwo ɖe afi kaba, eye metsi wɔnɔa vɔvɔ̃ me tso megbeɖoɖowo ta o.
- Zazãla Siwo Zãa E Zi Sia Zi - Sync si le asinye naa fexexe [payment] siwo nye ɣaɣla nɔa wɔwɔme na zazã le gbe sia gbe.
- Mɔ̃ Ƒe Ɖoɖoŋlɔlawo [developers] & Test Wɔlawo - Sync ɣeyiɣi kpuiwo gɔna be test ƒe mɔ̃wo nagbugbɔ kaba.
- Telefon & Mɔ̃ Bɔbɔewo - Zingo le dɔ wɔm nyuie fifia hã le hardware siwo me ŋusẽ menɔ geɖe o dzi.

### Nu ka tae wòle vevie na Zcash

Zcash wotu ɖe gaɖoɖowo siwo nye ɣaɣla dzi, si nye ɣaɣla ƒe dɔwɔnu [tools] sesẽtɔ aɖe le cryptocurrency me. Gake ɣaɣla wɔa dɔ ne ameate ŋu azãe ko.

Pepper Sync kpena ŋu to:

- Gege ɖe mɔ̃ ƒe fɔfɔwo - Zazãla yeyeawo ate ŋu agɔme kaba.
- Kpekpeɖeŋu na zazã le gbe sia gbe - Gaɖoƒe ƒe dzesiwo [addresses] siwo nye ɣaɣla zu bɔbɔe be woakpɔ dzi.
- Hadome ƒe tsitsi ƒe didi - Gakotoku ƒe nɔnɔme nyo wu hea zazã geɖe, apps, kple subɔsubɔwo.

To gakotoku ƒe nɔnɔme nyonyo dzi, Pepper Sync sesẽna Zcash ƒe hadome bliboa.

### Ale si nàgɔme: ŋgɔyiyi kple Zingo 2.0

1. Ɖe Gakotoku La - Xɔ version si dze ŋuwò tso [Zingo GitHub ƒe releases ƒe axa](https://github.com/zingolabs/zingolib)
2. Ɖo Wò Gakotoku ɖe Afi - Wɔ yeye aɖe alo trɔ gbɔ tso gadzraɖoɖi nya [seed phrase] si le tẹlẹ. [Zingo 2.0 kple Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Na Pepper Sync Nawɔ Dɔ - Kpɔ ŋgɔyiyi ƒe dzesiwo ne wò gakotoku le trɔm yeye. [Pepper Sync Wɔ Dɔ](https://x.com/ZingoLabs/status/1961871338441724191)
4. Dzra Zcash Zã Gɔme - Ɖo eye xɔ ZEC siwo nye ɣaɣla enumake ne sync wu.
5. Megadzɔ Ŋu Le Gbegbeawo Ŋu O - Ne app la tu alo kadodo ƒe kaɖedzi tso, Pepper Sync gɔme le eɖokui si.

## Vodadawo Siwo Ŋutɔ Woa

**Kpɔ Pepper Sync abe gakotoku le eɖokui me ene**. Pepper Sync nye sync ƒe mɔ̃ le Zingo! gakotoku me, menye app bubu aɖe o. Èɖoa Zingo; Pepper Synce le dɔ wɔm le eme.

**Bu be sync si yia kaba fia ɣaɣla bɔbɔe wu**. Kabakaba la tsoa mɔ̃ si me woɖea gaɖoɖowo ƒuƒoƒe [blocks] ƒe data, wɔnɔa ewo ɖe ɖoɖo me, eye wodzraa wo ɖe afi, menye be woɖena nya geɖe o. Gaɖoɖowo siwo nye ɣaɣla nɔa ɣaɣla zi blibo.

**Bu be ele be sync nawɔ bliboa hafi àte ŋu azã ga**. Gadzãga hafi sync wu nye Pepper Sync ƒe nɔnɔme vevitɔ aɖe, eya ta mele be nàlala be gakotoku la nàva ɖo ɖoɖonu ƒe nuwuƒe o.

## FAQ - Biabia Siwo Wobiae Zi Geɖe

**Q: Ele be mawɔ rescan zi sia zi ne meʋu gakotoku la oa?**

A: Ao. Pepper Sync dzraa ŋgɔyiyi ɖe afi, eya ta ètrɔa yeyee tso afi mamlɛtɔ ko.

**Q: Nu kae ava dzɔ ne internet ƒe kaɖedzi tso?**

A: Sync atɔ eye wòayi edzi emegbe, mewògɔme tso gɔme o.

**Q: Nye ɣaɣla le dedie le sync wɔm hã oa?**

A: Ɛ̃. Gaɖoɖowo siwo nye ɣaɣla nɔa ɣaɣla bliboa.

**Q: Ɣeyiɣi didi kae sync gbãtɔ xɔa?**

A: Zi geɖe la, minutiwo koe menye gaƒoƒowo o, eye edzea wò mɔ̃ kple internet ŋu.

**Q: Mate ŋu azã gakotoku la hafi sync wu oa?**

A: Ɛ̃. Pepper Sync doa gadzãga ŋu hafi sync wu, eya ta mele be nàlala be gakotoku la nàva ɖo ɖoɖonu ƒe nuwuƒe o.

## Nuwuwu

Kple Zingo 2.0 Pepper Sync, sync meganye ɣaɣla gakotokuwɔwo ƒe kuxi gãtɔ o. Fifia la, eyia kaba, le asinye, eye wòle bɔbɔe na zazãla, eye wòɖea mɔ̃ ƒe fɔfɔwo ɖa na ameyeyeawo eye wòna zazã le gbe sia gbe zu nu si wɔnate ŋu wɔ.

Na zazãlawo, egɔna be lelala sue wu kple ɣaɣla geɖe. Na mɔ̃ ƒe ɖoɖoŋlɔlawo, egɔna be teƒe sesẽ wu na tutu dzi. Na Zcash ƒe hadome, enye afɔɖeɖe bubu le mɔ̃ si yia ɖe gaɖoɖowo siwo nye ɣaɣla ƒe nana na amesia ame dzi.

Zingo 2.0 kple Pepper Sync menye upgrade ko o; enye dzedze gã ɖe ŋgɔ na crypto si nye ɣaɣla eye wòle zazãme.

## Axawo Siwo Kplɔe Ɖo

- [Zcash Gakotoku Ƒe Sync](/zcash-tech/zcash-wallet-syncing) — ale si gakotoku ƒe sync wɔa dɔ le Zcash ƒe hadome bliboa me.
- [Lightwallet ƒe Ɣaɣla Dzesi Ŋɔŋlɔwo](/zcash-tech/lightwallet-nodes) — teƒe si le light gakotoku abe Zingo ene sync ɖo.
- [Zaino](/zcash-tech/zaino) — indexer si Zingo ƒe team wɔ.
- [Gakotokuwɔwo](/wallets) — Zcash ƒe gakotokuwɔwo kple woƒe nɔnɔmewo ƒe agbalẽ blibo.

## Nusrɔ̃ɖeɖe Si Le Ŋgɔ

- [Zingo! GitHub Ƒe Repository](https://github.com/zingolabs/zingolib)
- [Zcash Hadome Ƒe Forum](https://forum.zcashcommunity.com/)
- Ƒomevi Ƒe Gblɔɖeɖewo - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
