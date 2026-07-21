<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ààbò Post-Quantum nínú Zcash

## TL;DR

- Àwọn kọ̀ǹpútà kónítò jẹ́ ewu fún ọjọ́ iwájú nítorí wọ́n lè tú àwọn kan lára àwọn àkọlé ìpamọ́ tí a ń lò nínú ẹ̀ka ìsọ̀rí-ìpínlẹ̀ lónìí.
- "Post-quantum" túmọ̀ sí ẹ̀rọ ìkọ̀wé tí ó ń ṣiṣẹ́ lórí àwọn kọ̀ǹpútà tí ó wọ́pọ̀, ṣùgbọ́n tí a ṣe láti dènà àwọn ìkọlù láti àwọn kọ̀ǹpúútà quantum ọjọ́ iwájú.
- Zcash kì í ṣe ohun tí kò bágbà mu rárá lóde òní.
- Zcash tí a fi ààbò ṣe dín iye ìsọfúnni ìsòwò tí gbogbo ènìyàn ń lò kù tí àwọn alátakò ọjọ́ iwájú lè kẹ́kọ̀ọ́, ṣùgbọ́n lílo ààbò kò dàbí ìdúróṣinṣin kọnúmátì pátápátá.
- Zcash n gbaradi nipasẹ iwadi, ZIPs, ati awọn igbero igbesoke bii ZIP 2005 ati Ise agbese Tachyon.
- Ààbò ìyípadà tí ó bá wáyé ní láti dáàbò bo owó, ìpamọ́ra, àpò, pàṣípààrọ̀, àti ìlànà ìfọwọ́sowọ́pọ̀ lákòókò kan náà.

## Kí Ni Ìmọ̀ Ìjìnlẹ̀ Nípa Kúǹtátì?

Kọ̀ǹpútà tí kò lábùkù máa ń fi ìsọfúnni pa mọ́ ní oríṣiríṣi ọ̀nà. `0` or `1`.

Àwọn kọ̀ǹpútà tó ń ṣiṣẹ́ lọ́nà tó lágbára gan-an yìí máa ń lo àwọn nǹkan kan tí wọ́n ń pè ní qubits.

èyí kò túmọ̀ sí pé kọ̀ǹpútà tó ń fi kúrúńdà ṣiṣẹ́ máa ń yára jù nínú gbogbo nǹkan. ewu náà jẹ́ pàtó. àwọn ìlànà dídíje kan dá lórí àwọn ìṣòro ìṣirò tó ṣòro gan-an fún àwọn kọ̀ńpútá tó ń lo kúrùńdà, àmọ́ ó rọrùn gan- an fún kọ̀mpútà tí ó tóbi.

For blockchains, the most important example is public-key cryptography. Public keys and signatures are used to prove that a user is allowed to spend coins.

## Ìdí Tó Fi Yẹ Ká Máa Ṣàkíyèsí Ètò Ìdásílẹ̀

Àwọn ẹ̀ka-ìpínlẹ̀ ńlo ẹ̀rọ-ìpamọ́ fún ọ̀pọ̀lọpọ̀ iṣẹ́:

 Ohun èlò ìkọ̀ǹkọ̀rọ̀  Kí ni ó ń ṣe  Àkóbá Kúmánìkì 
| --- | --- | --- |
☐ Àwọn ìmúṣẹ dígídílì ☐ Ẹ̀rí pé ẹni tó ni ilé náà fúnni láṣẹ láti náwó ☐ Ewu ńlá fún àwọn ètò elliptic-curve tí ó wọ́pọ̀
 Hash functions  Build addresses, commitments, Merkle trees, and challenges  Ewu ti o kere ju, ṣugbọn awọn iyẹwu aabo ṣe pataki
Àwọn ẹ̀rí tí kò ní ìmọ̀ rárá. Ẹ fi hàn pé àwọn ìnáwó tí wọ́n fi ààbò bo jẹ́ ojúlówó láìfi àlàyé hàn. Ó sinmi lórí ètò ẹ̀jẹ́ àti àwọn àbá.
Àdéhùn kókó. Ó ń ran àwọn àpò-ìpamọ́ lọ́wọ́ láti ṣe àdàkọ ìsọfúnni fún àwọn olùgba. Ó nílò àyẹ̀wò pẹ̀lẹ́pẹ̀lẹ́ lábẹ́ àwòkọ́ṣe ìparun tó pọ̀.

Kọ̀ǹpútà tó lágbára gan-an lè jẹ́ kí ọ̀pọ̀ ètò tí wọ́n ń lò lóde òní láti fi fọwọ́ síwèé, títí kan èyí tó ní àyíká elliptic curve.

Awọn iṣẹ hash yatọ si. Alugoridimu Grover le mu iyara wiwa agbara brute, ṣugbọn ko fọ awọn iṣẹ hash ni ọna taara kanna. Awọn alaabo aabo ti o tobi julọ le ṣe iranlọwọ.

## Kí Ni Ìmọ̀ Ìkọ̀wé Tí Wọ́n Fi Ń Ṣàwárí Àwọn Ohun Tó Wà Lẹ́yìn Àyẹ̀wò?

Post-quantum cryptography jẹ́ ẹ̀rọ ìkọ̀wé tí wọ́n ṣe láti dáàbò bo ara rẹ̀ kúrò nínú àwọn kọ̀ǹpútà tí ó jẹ́ ti ògbólógbòó àti àwọn kọ́ǹpúútà kónítọ́ọ̀mù tó ń bọ̀.

Kò túmọ̀ sí wípé ẹ̀rọ kọ̀ǹpútà tó jẹ́ kòkòrò-ìmọ̀-nǹkan ni wọ́n fi ń ṣe àdàkọ náà, ṣùgbọ́n ó túmọ̣ sí wí pé orí oríṣiríṣi àwọn ìṣòro ìṣirò líle ni ètò náà dá lé.

Ní ọdún 2024, NIST ṣe àtẹ̀jáde àwọn ìlànà tí wọ́n kọ́kọ́ gbé kalẹ̀ lẹ́yìn ìgbà ti kòkòrò àrùn quantum:

- **ML-KEM** fún ìdásílẹ̀ kókó
- **ML-DSA** fún àwọn àmì ọ̀rọ̀ dígítà
- **SLH-DSA** fún àwọn àmì ọ̀rọ̀ dígítà tí ó dá lórí ìdìpọ̀

These standards are a major milestone, but a blockchain cannot simply swap one algorithm for another overnight. Consensus rules, wallets, hardware wallets, transaction sizes, fees, and privacy all have to be considered.

## Bí Ewu Kúántíọ̀mù Ṣe Ń Fi Ara Rẹ̀ Hàn Nínú On-Chain

Ọ̀nà kan tó rọrùn láti ronú nípa ewu náà ni pé:

1. Olùṣàmúlò máa ń dá kókó méjì.
2. Àwọn ìsọfúnni tó jẹ́ kókó tàbí ìforúkọsílẹ̀ tí ó jẹ́ ti gbogbo ènìyàn lè fara hàn nínú ẹ̀rọ-ìpèsè.
3. Ẹnìkan tó bá ń gbógun ti àgbáyé lọ́jọ́ iwájú lè lo àwọn nǹkan tó wà níta láti mọ kókó ìkọ̀kọ̀ náà.
4. Tí kókó yẹn bá ṣì ń darí owó, wọ́n lè wà nínú ewu.

Transparent blockchains expose a lot of information by design. Addresses, amounts, and transaction links are public. Public key material can also become visible when coins are spent.

Eyi ni idi kan ti atunlo adirẹsi jẹ ipalara. Lilo atunlo n fun awọn oluwoye ni data diẹ sii lati sopọ loni ati fun awọn oludari ọjọ iwaju ni ohun elo itan diẹ si itupalẹ.

## Kí Ló Yàtọ̀ sí Zcash?

Zcash ṣe atilẹyin awọn iṣowo ṣiṣan ati awọn iṣowo ti o ni aabo.

Zcash tí ó jẹ́ aláyọ̀ máa ń ṣiṣẹ́ bíi Bitcoin-style public blockchain usage. Adirẹsi, iye owó, àti ìbáṣepọ̀ ìsòwò ni a lè rí.

Shielded Zcash is different. Shielded transactions use zero-knowledge proofs so the network can verify that a transaction follows the rules without revealing the sender, receiver, or amount.

Eyi fun Zcash ni anfani aṣiri pataki:

- Iye ìsọfúnni tí wọ́n ń gbé jáde fún gbogbo ènìyàn láti rí kò tó nǹkan.
- Àwọn oníṣe máa ń yẹra fún dídá àwòrán ìsanwó tí ó wà fún gbogbo ènìyàn nígbà tí wọ́n bá wà ní ààbò.
- Àwọn tó máa ń kíyè sí ọ̀ràn lọ́jọ́ iwájú kò ní fi bẹ́ẹ̀ ní àkọsílẹ̀ nípa ètò ìṣúnná owó tí wọ́n lè ṣe àgbéyẹ̀wò.
- Ifitonileti yanilenu le ṣẹlẹ nipasẹ awọn bọtini wiwo dipo awọn igbasilẹ gbangba nipasẹ aiyipada.

But shielded Zcash is not automatically post-quantum. Shielded pools still depend on cryptographic assumptions. Spend authorization, note commitments, nullifiers, proof systems, encryption, and wallet keys all need careful review.

Àlàyé ṣókí rèé:

> Lílò tí a fi ààbò ṣe dín ìfararora fún gbogbo ènìyàn kù, ṣùgbọ́n Zcash ṣì nílò àwọn àtúnṣe tí a mọ̀ sí post-quantum.

## Àwòrán ewu Zcash

Àdúgbò: Àlàyé fún ẹni tó ṣèbẹ̀rẹ̀. Àníyàn nípa ohun tó ń ṣẹlẹ̀ lẹ́yìn ìgbà tí wọ́n bá ti rí i.
| --- | --- | --- |
| Transparent addresses | Public addresses and public transaction graph | Similar risks to other transparent blockchains |
 ìfọwọ́sí ìnáwó  ẹ̀rí wípé oníṣe kan ní àṣẹ láti náwó àwọn ètò ìforúkọsílẹ̀ lè nílò àtúnṣe tàbí ṣíṣípò
| Shielded notes | Private records of value inside shielded pools | Some components may need new assumptions or recovery tools |
zk-SNARKs. Èrí pé àwọn ìnáwó tí a fi ààbò bo jẹ́ ojúlówó. Àwọn àbá ètò ẹ̀rí nílò àtúnyẹ̀wò.
◯ Ṣiṣayẹwo apamọwọ ◯ Bí apamọwọ ṣe ń rí àti bí ó ṣe ń tú àdàkọ àwọn àkọsílẹ̀ tí wọ́n gbà ◯ Àdéhùn ọ̀rọ̀-ìfiwọlé àti ìdìwé àkọsílẹ̀ nílò àtúnyẹwò
Migration. Moving funds to safer cryptography. Must avoid both fund loss and privacy leaks. Migration. Movement of funds to more secure cryptographic. Migration.: gbigbe owó lọ sí ìlànà ìkọ̀wé tí ó ní ààbò.

## Bí Zcash ṣe ń múra sílẹ̀

### Zcash ní Àtúnṣe Ìtòlẹ́sẹẹsẹ Nẹtiwọọki

Zcash ti yi cryptography rẹ pada tẹlẹ. Sapling ṣe awọn iṣowo aabo rọrun lati lo. NU5 ṣafihan Orchard, Awọn adirẹsi iṣọkan, ati Halo 2.

This matters because post-quantum readiness is not a one-line software patch. It requires coordinated network upgrades, wallet changes, audits, and time for users to migrate.

Àwọn àtúnṣe Zcash tí ó ti kọjá fi hàn pé ètò-ayé yìí ní ìrírí yípadà láti inú ẹ̀rọ-ìfiwéra àtijọ́ sí àwọn àdàkọ tuntun.

### Halo àti Orchard Dín Àwọn Èrò Tó Ti Wà Látijọ́ Sí I Kù

Halo 2 ni a lo nipa Orchard, Zcash ká igbalode shielded pool. Ọkan pataki ilọsiwaju ni wipe Halo yọ awọn nilo fun a gbẹkẹle iṣeto fun awọn Orchard ẹri eto.

Iyẹn ko jẹ ohun kanna bi aabo lẹhin-iye. O tun ṣe pataki nitori pe o fihan Zcash le rọpo awọn ohun elo ikole cryptographic pataki nigbati awọn apẹrẹ to dara julọ ba wa.

### ZIP 2005 Ṣójútó Ìmúpadàbọ̀sípò Kúántíọ̀mù

ZIP 2005 is titled "Orchard Quantum Recoverability." It proposes changes intended to help Orchard users recover or migrate funds if quantum attacks against older assumptions become practical.

Àtúnṣe kì í ṣe ohun kan náà bí ààbò tí ó kún fún ìsọfúnni lẹ́yìn-ìmọ̀dá. Ó dínkù, ó sì ṣì wúlò:

- Ìdáàbòbo tó péye lẹ́yìn ìgbà tí wọ́n bá ti lo kúrúǹtì máa ń dènà àwọn ìkọlù kúrùǹtì láti ṣiṣẹ́.
- Ìmúpadàbọ̀ fún àwọn oníṣe rere ní ọ̀nà tí ó dára jùlọ bí ẹ̀rọ ìkọ̀wé ìgbà àtijọ́ bá di èyí tí kò ní ààbò.

Tó bá jẹ́ pé ọ̀nà àbájáde pàjáwìrì lo fẹ́ fi ṣe é, má ṣe rò pé ó máa rọ́pò gbogbo ilé náà, àmọ́ ó máa ń ran àwọn èèyàn lọ́wọ́ kí wọ́n lè jáde kúrò nínú yàrá tí wó̀n wà tẹ́lẹ̀ láìséwu bí kọ́kọ́rọ́ ibẹ̀ bá ti di ahẹrẹpẹ.

### Iṣẹ́ Àṣekágbá Tachyon Ń Wo Ọ̀nà Láti Ṣe Àtúnṣe Ìlànà Pàtàkì Sí I

Project Tachyon je ohun ti a dabaa Zcash igbesoke fojusi lori iwọn, isokan, ati ipinle idagba.

Because Tachyon is a proposal, it still depends on engineering work, review, and community approval before activation. It is best understood as part of Zcash's active research and upgrade direction, not as a feature that users already have today.

### Ìwádìí àti Ìlànà Ń Yí Padà

The wider cryptography world is also moving. NIST's post-quantum standards give implementers stronger building blocks for signatures and key establishment. Zero-knowledge researchers continue to study proof systems that can hold up under quantum assumptions.

Zcash lè jàǹfààní nínú iṣẹ́ yẹn, ṣùgbọ́n ó ṣì ní láti yí i padà sí blockchain tó ń dáàbò bo ìpamọ́.

## Àwọn Ọ̀nà Àtúnṣe Ọ̀la Tó Ṣeé Ṣe

### Àṣẹ Ìnáwó Lẹ́yìn Àpò Iye

Zcash lè nílò àṣẹ ìnáwó tí kò gbára lé àwọn ètò ìforúkọsílẹ̀ tí kò ní àbùkù tó jẹ mọ́ ọnà.

Eyi le lo awọn ami-iwọle post-quantum, awọn ami igbẹkẹle hybrid, tabi apẹrẹ miiran. Aṣayan ti o ni idapọmọra nlo awọn ayẹwo atijọ ati lẹhin-agbara lakoko akoko iyipada, nitorinaa eto naa ko dale lori ero kan nikan.

The challenge is size and cost. Post-quantum signatures can be larger than today's signatures, which affects transaction size, bandwidth, fees, mobile wallets, and hardware wallets.

### Adirẹsi Tuntun Ati Awọn ọna kika bọtini

New cryptography often needs new keys and addresses. Users would need a clear migration path from old formats to safer formats.

Ìyípadà náà yóò rọrùn nínú àpò. Òpòòlọpọ̀ àwọn oníṣe kò ní ní láti lóye gbogbo ìsọfúnni tí ó wà nínú ẹ̀rọ ìkọ̀wé láti wà ní ààbò.

### Ìlọsíwájú Tó Ń Dáàbò Bo Ìpamọ́ra

Migration is especially sensitive for Zcash. If many users move funds from old pools to new pools in obvious patterns, the migration itself could leak information.

Ìpinnu tó dára nípa ṣíṣí lọ síbòmíì gbọ́dọ̀ dáàbò bo:

- Àwọn owó oníṣe
- Ìpamọ́ oníṣe
- Ìmúṣe pẹlẹbẹ
- Ìrànlọ́wọ́ láti ṣe pàṣípààrọ̀
- Atilẹyin apamọwọ hardware
- Ààbò ìfọwọ́sowọ́pọ̀ lórí ẹ̀rọ

### Àtúnyẹ̀wò ètò ìdánilójú lẹ́yìn ìgbà tí wọ́n ti ṣe àyẹ̀wò nípa iye.

Gbigba awọn ibuwọlu ko to. Apẹrẹ aabo ti Zcash tun da lori awọn ẹri ati awọn adehun imọ-oorun.

Ó lè pọn dandan pé kí àwọn tó bá máa ṣiṣẹ́ lọ́jọ́ iwájú tún àwọn nǹkan yìí wò tàbí kí wọ́n rọ́pò wọn:

- Awọn ero zk-SNARK
- Awọn adehun polynomial
- Àwọn àríyànjiyàn Fiat-Shamir
- Kíyè sí àwọn àdéhùn
- Ètò tí ó ń mú kí ìmúṣẹ di asán
- Àwọn àbá igi Merkle
- Ṣàkíyèsí ìdìkọ̀ àti ìwà wíwo-kókó

Some components may be acceptable with adjusted parameters. Other components may need new designs.

## Àwọn Àpẹẹrẹ Tó Wà fún Àwọn Tó Ṣẹ̀ṣẹ̀ Bẹ̀rẹ̀

### Àpẹẹrẹ Kìíní: Ọ̀nà Àkọ́kọ́

Fojú inú wo àkáǹtì owó kan tí wọ́n fi kọ́kọ́rọ́ tó lágbára gan-an sẹ́yìn rẹ̀ lónìí.

Àwòrán tí wọ́n fi ń ṣàkọsílẹ̀ ohun tó wà nínú kọ̀ǹpútà kò dà bí ìgbà téèyàn fi àwòrán kan rọ́pò kọ́ńpáàsì tí kò ní ṣeé ṣe fún ọ̀nà tuntun náà láti gbà tú u.

Fun blockchain, rirọpo titiipa naa nira nitori gbogbo apamọwọ, akopọ, paṣipaarọ, ati ẹrọ ohun elo gbọdọ ni oye apẹrẹ tuntun.

### Àpẹẹrẹ Kejì: Àpótí Tí Wọ́n Fi Ń Gba Owó Láti Ọwọ́ Àwọn Èèyàn

Àkọsílẹ̀ blockchain tí ó ṣe kedere dàbí ìgbà tí a bá fi àkáǹtì sínú àpótí tí a ó máa lò títí láé. Bí ẹnikẹ́ni kò bá tilẹ̀ lè ka gbogbo àdàkọ lónìí, àwọn irinṣẹ́ ọjọ́ iwájú lè mọ̀ sí i nígbà tó bá yá.

Shielded Zcash gbìyànjú láti yẹra fún títẹ̀jáde àwọn owó wọ̀nyẹn ní ipò àkọ́kọ́. Èyí ń ṣèrànwọ́ fún ìpamọ́-ọkàn tí ó pẹ́, ṣùgbọ́n ọ̀pá ìdákójútó tí ó ń dáàbò bo ètò tí a fi ààbò bò náà ṣì ní láti ṣe àtúnyẹ̀wò fún ọjọ́ iwájú quantum.

### Àpẹẹrẹ Kẹta: Ìpinnu Láti Jáwọ́

Recoverability is like planning an exit route before there is a fire. You hope not to need it, but it is much safer to design it early than during an emergency.

ZIP 2005 ba èrò yìí mu fún àwọn àkọsílẹ̀ Orchard.

## Ohun Tí Àwọn Tó Ń Lo Íńtánẹ́ẹ̀tì Lè Ṣe Lónìí

Awọn olumulo ko nilo lati ni ibanujẹ. Awọn kọnputa quantum nla ti gbogbo eniyan ti o lagbara lati fọ cryptography blockchain ti a lo ko wa loni.

Àwọn àṣà tó dára ṣì ń ṣèrànwọ́:

- O fẹ lilo Zcash ti o ni aabo nigbati o ba ṣeeṣe.
- Má ṣe lo àdírẹ́sì náà lẹ́ẹ̀kan sí i.
- Mọ ohun tó ń lọ nínú àpamọ́wọ́ rẹ.
- Tẹlé àwọn ìkéde àtúnṣe nẹtiwọọki Zcash.
- Ṣọ́ra fún ZIPs àti ìtọ́ni àpamọ́ owó nípa àtúnṣe tàbí ṣíṣípò.
- Má ṣe rò pé ìgbòkègbodò tí ó hàn gbangba jẹ́ àṣírí.
- Do not move funds based on rumors; wait for clear guidance from trusted Zcash developers and wallet teams.

## Àwọn Ìṣòro

Àwọn àtúnṣe tí ó bá wáyé lẹ́yìn ìgbà ti kúrúńdà kò rọrùn fún gbogbo ẹ̀ka-ìpínlẹ̀.

Àwọn ìpèníjà tó wọ́pọ̀ ni:

- Àwọn kọ́kọ́rọ́ tó tóbi àti àwọn òǹtẹ̀
- Àwọn ìnáwó ńláńlá
- Àwọn ìnáwó tó pọ̀ sí i lórí ìwádìí
- Lílo àlàfo ìkápá púpọ̀
- Àwọn àyẹ̀wò ààbò tuntun
- Atilẹyin apamọwọ hardware
- Iṣẹ́-ṣiṣe àpamọ́ alágbèéká
- Àdàpòpọ̀ àdàpọ̀ àti ìpamọ́
- Àìdáàbòbò ìpamọ́ lásìkò ìyípadà
- Àdéhùn àgbáyé lórí àwọn àtúnṣe tó bá ìlànà ìṣọ̀kan mu

Fun Zcash, apá tó nira jùlọ kì í ṣe láti jẹ́ kí owó ẹyọ náà ṣeé ná nìkan. Apá tí ó le jùlọ ni pé kí àwọn owó ẹyẹ náà lè ṣeé ná nígbà tí ó ń pa ìpamọ́ tí ó mú kí Zcash yàtọ̀.

## Àkópọ̀

àwọn kọ̀ǹpútà tó jẹ́ ti quantum lè wá di ewu fún àwọn ẹ̀rọ tí wọ́n fi ń ṣe àdàkọ ìsọfúnni tí àwọn èèyàn máa ń lò nínú ẹ̀ka ìsọ̀rí ìkànnì.

Zcash is not fully post-quantum today. However, Zcash has useful strengths: shielded transactions reduce public exposure, the network has a history of cryptographic upgrades, and current research such as ZIP 2005 and Project Tachyon is already aimed at future quantum risks.

Fún àwọn tí ó ṣẹ̀ṣẹ̀ bẹ̀rẹ̀, èrò pàtàkì náà kò ṣòroó lóye: ìpamọ́ra lónìí máa ń dín ìdánilẹ́nuwò fún ìsọfúnni lọ́jọ́ iwájú kù, àti àtúnṣe tó fara balẹ̀ lè ran Zcash lọ́wọ́ láti sún mọ́ ààbò tó lágbára jù lọ lákòókò kọ́múníìsì láì fi ìlò rẹ̀ rúbọ.

## Àwọn ojúewé tó tan mọ́ ọn

- [Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Ṣe](/using-zcash/shielded-pools) - Bawo ni Zcash shielded awọn iṣowo daabobo awọn alaye iṣowo
- [Halo](/zcash-tech/halo) - Ètò ẹ̀rí Zcash láìsí ìmúrasílẹ̀ tí a gbẹ́kẹ̀lé
- [ZKP àti ZK-SNARKS](/zcash-tech/zk-snarks) - Bawo ni zero-imọ ẹri ṣiṣẹ ni Zcash
- [Àwọn Kọ́kọ́rọ́ Ìwòye](/zcash-tech/viewing-keys) - Bawo ni yan ifitonileti ṣiṣẹ fun shielded Zcash
- [Awọn ohun-ini ti o ni aabo Zcash](/zcash-tech/zcash-shielded-assets) - Awọn ohun-ini ti o ni aabo ni ọjọ iwaju ati atilẹyin dukia aladani
- [Ìfọ̀kànbalẹ̀ gẹ́gẹ́ bí Ìlànà Pàtàkì](/privacy/privacy-as-a-core-principle) - Kí nìdí tí ìpamọ́ ìṣúnná owó fi ṣe pàtàkì

## Àwọn àtúnyẹ̀wò

- [NIST: Ìlànà àkọ́kọ́ tí wọ́n ṣe tán nípa àdàkọ lẹ́yìn-ọ̀rọ̀-ìmọ̀-nǹkan](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Project] Àkọsílẹ̀ àyọrísí àwọn ìṣẹ̀lẹ̀ tó wáyé](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability] Àkọsílẹ̀ tí wọ́n fi ń ṣe àyẹ̀wò](https://zips.z.cash/zip-2005)
- [Ìpolongo Tachyon]](https://tachyon.z.cash/)
- [Awọn alaye ti Ilana Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Ìwé Halo 2](https://zcash.github.io/halo2/)
