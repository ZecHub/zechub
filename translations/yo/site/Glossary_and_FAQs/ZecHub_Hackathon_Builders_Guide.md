# Atọ́nà fún olùgbèrú hackathon ZecHub

## TL;DR

- Mọ ìdí tí o fi ń kọ́lé kí o tó ṣe é, àǹfààní rẹ̀ ju ti dídíjú lọ.
- Má ṣe sọ nǹkan di bàbàrà, èrò kékeré tó bá ti ṣẹ dáadáa sàn ju èyí tí kò tíì parí lọ.
- Kọ́ ìsọ̀rí-ìmọ̀ Zcash ní pẹrẹu, ó jẹ apá tó ga jùlọ nínú òpó náà.
- Ti ohun elo rẹ ba gbe owo, o gbọdọ ṣiṣẹ lori mainnet, kọ lori testnet, lẹhinna fi idi rẹ mulẹ lori maintet
- Àwọn ìwé tó wà lórí ẹ̀rọ àti àfihàn ohun tí wọ́n ń lò lè ṣe pàtàkì ju ọjà fúnra rẹ̀ lọ.
- Ìdẹ́yẹ̀wò ni ibì kan tí o ti ń bẹ ìbẹ̀rè, ó máa n gbé orúkọ rẹ kalè àti ṣílẹkùn fún ọ láwùjọ.

<br/>

## Ta ni èyí wà fún?

- Awọn oludasile igba akọkọ ti o wọ inu ZecHub tabi Zcash hackathon kan
- Awọn oludagbasoke lati awọn agbegbe miiran ti o jẹ tuntun si Zcash
- Ẹnikẹni ti o ba fẹ lati yi iṣẹ akanṣe hackathon kan pada si nkan to pẹ.

<br/>

## Bẹ̀rẹ̀ nípa ìdí tó fi rí bẹ́ẹ̀.

Before you open your editor, know what problem you are solving and why anyone would care. A good test is simple: if the thing you are building did not exist, would anyone miss it? Build something you would use yourself. Privacy is the reason Zcash exists, so understand why privacy matters to the people you are building for, then let that shape the whole project.

<br/>

## Mọ ìdìpọ̀ náà lákọ̀ọ́kọ́.

The most common surprise for builders from other chains is the learning curve for Zcash infrastructure, not the coding. Give yourself time to understand how the pieces fit before you design your app. Start with the core stack, often called Z to the third: zebrad, a light server, and a wallet. Then get familiar with the developer tools:

1. Ka ojúewé olùgbéejáde lórí wiki ní: [zechub.wiki/àwọn olùdàgbàsókè](https://zechub.wiki/developers), ibẹ̀ ni wọ́n ti kọ́kọ́ dá dúró.
2. Ṣawari zingolib ati awọn zingo-cli, ti o ni ipe bo julọ ohun ti a ise agbese nilo kọja orin
3. Wo librustzcash àti àkájọ owó ZODL fún àwọn ohun èlò ìkọ́lé tí ó wà ní ipele tó kéré jùlọ.
4. Fun iṣẹ akanṣe FROST, lo frostd ti Zcash Foundation ati Frost-core lati crates.io, ki o si gbekele AI fun iranlọwọ pẹlu awọn itumọ, botilẹjẹpe lilo FROST ni aabo tun gba igbiyanju gidi ati akoko

<br/>

## Mọ ohun tí mainnet túmọ̀ sí.

Several tracks require your app to interact with Zcash mainnet. In practice this means your project, or someone using it, including an AI agent, sends or receives real funds on mainnet, or it builds and improves the tools that make this possible. If your app makes transactions, you must demonstrate them on mainnet in your submission.

Build on testnet while you develop. Mainnet activity costs real ZEC and will only get more expensive over time, so testnet is the recommended place to iterate. Switch to mainnet for the final proof. Keep one detail in mind as you design your flow: when funds arrive at a shielded address, your wallet has to scan and find them before they can be spent, and that scan takes a little time. Build that short wait into your app rather than assuming incoming funds are ready to use straight away.

<br/>

## Má ṣe jẹ́ kí nǹkan le koko jù.

A simple, well-executed idea has beaten a complex one many times. Judges have watched a basic concept win over a more technically ambitious project in the same event, because it solved a real problem and was easy to understand. Take on less than you think you can finish. Overlooking details, scoping too big, and skipping research are the mistakes that cost builders prizes. Make your project easy to understand and easy to run, from the core concept to the first command.

<br/>

## Gba ọ̀ọ́dúnrún ìṣẹ́jú àkọ́kọ́.

àwọn olùṣirò máa ń ṣe àgbéjáde tó lágbára ní kíákíá, nítorí náà ìfọwọ́sọ̀rọ̀, àkòrí àti àwòrán yóò gbé ọlá ńlá lọ pẹlú bí ojútùú rẹ ti jẹ tuntun. ìwé-ìwé àti èsì ìdánilẹ́kọ̀ọ́ tí ó mọye kì í ṣe ohun téèyàn fi n ronú lẹ́yìn ìgbà yẹn. sísọ èrò tìrẹ nígbà míì le ju ìmọ̀ràn fúnra ẹ̀ lọ, torí pé kò sí ẹni to bá lóye ohun tí o kọ ni ò lè ṣàṣeyọrí. ìdájọ́ sábà máa ń mú àdéhùn wà láàárín jíjìn nínú iṣẹ́ ọnà, ìrírí oníṣe, ìwà abẹ́dàáwọ́gbà, àti àǹfààní ṣíṣe pàtàkì, àkọsílẹ̀ alágbára sì máa ń gbé gbogbo wọn ga.

<br/>

## Wo àwọn òpó tó le jù, tí kò sì nípọn.

If you want less crowded competition, the harder tracks often have fewer entries simply because fewer people attempt them. The Accounting track is a good option for beginners who want to avoid on-chain transaction work. FROST jẹ́ alágbára àti tí wọn kò lò ó dáadáa, ó sì ń ṣe ìpìlẹ̀ tó lágbára fún iṣẹ́ kan. Ẹgbẹ́ ò sọ ohun ti wọ́n fẹ́ kọ́, nítorí náà kíkọ́lé lórí ọ̀nà àkànṣe tí ètò ìjìnlẹ̀ ní dípò láti bẹ̀rẹ̀ látorí ẹyọ ni ìgbésẹ̀ ọlọgbọ́n.

<br/>

## Lẹ́yìn ìṣẹ̀lẹ̀ hackathon náà,

Gbígba kì í ṣe òpin ọ̀nà.Gbigba ń kọ́ ẹrù àti orúkọ rere rẹ, ó ṣí ilẹ̀kùn nínú àwùjọ, ó sì lè yọrí sí ìfún-ni lówó nípasẹ̀ àwọn àbájáde ètò ìdánwò.

1. Mu iṣẹ akanṣe ti o lagbara siwaju bi imọran si ZecHub DAO tabi Awọn ẹbun Agbegbe Zcash, pẹlu iwe-ọna kan, awọn ami pataki ati iṣiro isunawo.
2. Dúró ní ìgbòkègbodò nínú àwùjọ lórí ìkànnì, Discord àti X.
3. Darapọ mọ awọn ipade R ati D Arborist, fi imọran ranṣẹ, ki o beere fun esi.
4. Tẹ́ ẹ bá ń kọ́lé, bí o kò tilẹ̀ borí, kí o sì máa wò fún ìdíje hackathon tó kàn.

<br/>

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn Ìpèsè fún Oníṣètò](https://zechub.wiki/developers) - ibudo akọkọ fun awọn oludasile Zcash
- [Zebra Ìkànnì Pípéye](https://zechub.wiki/zcash-tech/zebra-full-node) - ìsọ̀rí ní ẹ̀bá òpó náà.
- [FROST](https://zechub.wiki/zcash-tech/frost) - àwọn ìwé àṣẹ tó wà ní ìlà fún àwọn iṣẹ́ tí ó ti lọ síwájú

<br/>

<small>This guide was shaped by insights from ZecHub core contributors squirrel, Dismad, and Tron.</small>
