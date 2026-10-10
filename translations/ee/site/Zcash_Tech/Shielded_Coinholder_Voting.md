<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Gakuxɔla Siwo Wokpɔ Akpoxɔnu ƒe Akɔdada

> Le August 2026 me la, Zcash wɔ gakuxɔlawo ƒe numekuku aɖe si me akɔtagbalẽviwo nɔa nya ɣaɣlawo me eye woɖea xexlẽme mamlɛawo ko ɖe go, eye wozã akɔdada ƒe ɖoɖo si wotsɔ akpoxɔnu tu si Valar Group.

Nusi nàxɔ le asiwò: alesi woate ŋu ada akɔdada ɖe ZEC agbɔsɔsɔme si le asiwò dzi, si nèdzra ɖo ɖe ɖokuiwò ŋu, eye wògaxlẽe nyuie kokoko, esiawo katã ame aɖeke masrɔ̃ alesi nèda akɔ alo agbɔsɔsɔme si le asiwò o.

Shielded coinholder voting na Zcash holders daa akɔ le lãwo ƒe agbenɔnɔ ŋuti nyabiasewo ŋu to woƒe shielded ZEC. Ame aɖeke menya nusi ame ɖekaɖeka aɖeke da asi ɖe edzi alo ZEC agbɔsɔsɔme si le esi o, ke hã ame sia ame ate ŋu adzro eme be xexlẽmeawo katã sɔ. Ezɔna ɖe akɔdada ƒe kɔsɔkɔsɔ tɔxɛ aɖe si Valar Group, si to vovo tso Zcash mainnet gbɔ, eyata wò ga ŋutɔŋutɔwo meʋãna gbeɖe o. Ne èdi alesi Zcash wɔa nyametsotsowo le mɔ si keke ta wu nu la, kpɔ.. [Zcash Gadodo kple Dziɖuɖu ƒe wɔwɔfia](../zcash-community/zcash-governance). Axa sia ku ɖe cryptographic voting protocol ŋu ko.

Nu yeyee le Zcash? Dze egɔme kple [Nukae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash), [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools), kple [zk-SNARKs](../zcash-tech/zk-snarks), emegbe nàtrɔ ava afisia.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Nusita ame ŋutɔ ƒe akɔdada sesẽ

Gakuxɔla nyui ƒe akɔdada dina be yeawɔ nu ene zi ɖeka, kple mɔ siwo dze ƒã be yewoana woawɔ avu kple wo nɔewo.

1. Kpekpeme ɖe ati ŋu, eyata ZEC geɖe léle ɖe asi tsɔa kpekpeme geɖe wu.
2. Ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla, eyata ame aɖeke mesrɔ̃a alesi nèda akɔe o.
3. Privacy of balance, eyata ame aɖeke mesrɔ̃a ZEC agbɔsɔsɔme si nèlé ɖe asi o.
4. Xexlẽme si sɔ, si woate ŋu adzro, si ame sia ame ate ŋu akpɔ.

Be nàda kpekpeme ɖe ati ŋu la, edze abe èhiã amesiame ƒe dadasɔ ene. Be nàxlẽ akɔtagbalẽviwo la, edze abe ehiã be nàʋu wo ene. Mɔ si me susu mele o wɔwɔ dometɔ ɖesiaɖe naa ame ŋutɔ ƒe nyatakakaawo tututu dona a [ta si ŋu wokpɔ akpoxɔnu le](../using-zcash/shielded-pools) li be woakpɔ eta, eye gaku ƒe akɔdada siwo wowɔ do ŋgɔ la do dadasɔ ŋuti nyatakakawo ɖe go le susu sia ta. Akɔdada si wokpɔ ta na kpɔa masɔmasɔa gbɔ kple dɔwɔnu mawo ke siwo naa ŋusẽ fexexe si wokpɔ ta na: [kpeɖodzi siwo me sidzedze zero mele o](../zcash-tech/zk-snarks), nullifiers, kple nya ɣaɣlawo tsɔtsɔ ɣla.

## Nusi wokpɔna le susu me: akɔtagbalẽvi si xlẽa eɖokui

> Trɔtrɔmɔ̃ nana nèxlẽa nusiwo toa gadzraɖoƒe ƒe nudzraɖoƒe aɖe evɔ màkpɔ eme o. Akɔtagbalẽvi si ŋu wokpɔ akpoxɔnu le la yia ŋgɔ wu ema: eƒoa akɔdada siwo wotre enu nu ƒu evɔ meʋua wo gbeɖe o.

Kpɔ akɔtagbalẽvi aɖe si me ŋusẽ etɔ̃ siwo mebɔ o le la ɖa le susu me. Ate ŋu atsɔ agbalẽkotoku si wotre nu na akpe ɖe duƒuƒu ƒe ƒuƒoƒo ŋu evɔ maʋui o. Dziɖuɖumegãwo ƒe ƒuƒoƒo aɖe, si me ame ɖeka pɛ hã melé safuia ɖe asi o, ɖea xexlẽme mamlɛawo ɖeɖeko fiana emegbe. Eye hafi nàte ŋu atsɔ agbalẽkotoku aɖe aƒu gbe ɖe eme la, èɖo kpe edzi kpoo be yelé ZEC ɖe asi le ɣeyiɣi aɖe si va yi si woɖo ɖi me eye mèda akɔ xoxo o, evɔ mèfia gaku siwo nye tɔwò o. Nusianu si le ete la nye alesi wotu aɖaka ma ŋutɔŋutɔ.

## Dzedze kple foto si woɖe le ɣeyiɣi kpui aɖe me

A voting round ɖɔa snapshot ƒe kɔkɔme, Zcash mainnet block ɖeka, eye wò kpekpeme nye wò spendable shielded balance le [Ironwood](../zcash-tech/ironwood) ta si le xɔtuƒe ma. Sea nye Ironwood ZEC ɖeka ko le fotoa me sɔ kple akɔdada ɖeka. Le NU7 ƒe kekeme ƒe numekukua gome la, fotoa nye mainnet block 3,459,350, le August 24, 2026 lɔƒo le 19:00 UTC, kple akɔdada ʋu vaseɖe September 14, 2026 le 19:00 UTC. Wowɔa ZEC si me kɔ la ŋudɔ ɖe vovo to mɔnu xoxoa dzi, ke menye to ɖoɖowɔɖi sia dzi o.

1. Wò ga meʋãna gbeɖe o eye wometua wo gbeɖe o. Woɖo dzedze le fotoa me, eyata àte ŋu azã ZEC alo aʋui enumake le ema megbe evɔ makpɔ ŋusẽ ɖe wò akɔdada dzi o.
2. Afɔɖeɖe aɖeke meli si woatsɔ ade ŋkɔ agbalẽ me o. Fotoɖeɖefia ƒe kɔkɔme koe hiã, si wɔnɛ be ɖoɖoa nɔa bɔbɔe eye wòƒoa asa na amesi ɖoe be yeada akɔ la ɖeɖefia.

## Wò dadasɔ dzi dada evɔ màɖee afia o

Ne èda akɔ la, wò gakotokua ɖea kpeɖodzi si me sidzedze zero le vɛ be le fotoɖeɖea me la, èkpɔ ŋusẽ ɖe ZEC. Eɖoa ga si sɔ kple eƒe lolome ɖe ame ŋutɔ ƒe xexlẽdzesidzidzemɔ̃wo gbɔ, gake meɖea nuŋlɔɖi aɖeke fiana o eye mewɔa asitsatsa aɖeke le Zcash mainnet dzi o.

Kpeɖodzi ma mints akɔdada ƒe kafukafu le akɔdada ƒe kɔsɔkɔsɔa dzi si sɔ kple wò foto si susɔ, si nye akɔdada ƒe safui yeye si wò gakotokua wɔna na ɣeyiɣi sia ko tɔ. Esi wònye be safuia nye yeye eye medo ƒome kple wò Zcash adrɛswo o ta la, womate ŋu akpɔ naneke le akɔdada ƒe kɔsɔkɔsɔa me tso wò nuŋlɔɖi ŋutɔŋutɔwo gbɔ o. Wò kɔsɔkɔsɔ ƒe dzesidenu kple wò akɔtagbalẽvi la mate ŋu aƒo ƒu to xɔtutu me o.

## Mɔxexe ɖe akɔdada zi eve nu, le ame ŋutɔ gbɔ

Be ame aɖeke natɔ te gaku ɖeka ma ke ƒe akɔdada zi eve la, ele be ɖoɖoa naɖo kpe edzi be womezã gaku siwo le megbe na wò gaku si susɔ la le fotoɖeɖea me o. Le mainnet dzi la, wowɔa esia to nuŋlɔɖi aɖe ƒe nullifier, eƒe spent-marker tɔxɛ, si nodes blibowo léa ŋku ɖe eŋu be wogazãnɛ hã ɖeɖefia me. Gake ne èɖe wò nullifier la ɖe go le afisia la, ana wò akɔtagbalẽvia natrɔ ayi wò nuŋlɔɖiwo gbɔ tẽ.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Eyata ɖoɖowɔɖia ɖo kpe nusi to vovo na ema dzi le adzame. Etua nullifier ɖesiaɖe si wozã xoxo tso esime woɖe fotoa la ƒe xexlẽdzesi, eye wò gakotoku ɖo kpe edzi le sidzedze zero me be wò nuŋlɔɖi ƒe nullifier mele xexlẽdzesi ma me o, si fia be womezã nuŋlɔɖia o evɔ meɖea nuŋlɔɖi si wònye la fiana o.

Kuxi ɖeka gakpɔtɔ li. Ne èxɔ xexlẽdzesi ma ƒe akpa si hiã tso dɔwɔƒe aɖe la, aɖe wò nullifier la afia na dɔwɔƒea, eye xexlẽdzesi bliboa lolo, anɔ abe 2 GB ene na Orchard-era nyatakakawo eye wòlolo wu sã ne Zcash le tsitsim. [Ame ŋutɔ ƒe Nyatakakawo Xɔxɔ](../zcash-tech/private-information-retrieval) (PIR) kpɔa evea siaa gbɔ: wò gakotokua xɔa nyatakaka siwo tututu wòhiã esime wòɣlaa nyatakaka siwo wòbia la to nya ɣaɣlawo me. Woléa ŋku ɖe emetsonua ŋu kple nullifier ƒe xexlẽdzesi ƒe kpukpui si wota, eyata server si meɖi anukware o mate ŋu awɔ aʋatso emetsonua o.

## Akɔtagbalẽvi si wotsɔ nya ɣaɣlawo ŋlɔ

Le biabia ɖesiaɖe gome la, wò gakotokua wɔa nu etɔ̃.

1. Etsɔa homomorphic encryption, si nye nya ɣaɣla ƒomevi aɖe si me woate ŋu atsɔ eƒe nya ɣaɣlawo akpe ɖe wo nɔewo ŋu evɔ womaɖe wo gɔme o tsɔ ɣlaa wò akɔdada ƒe kpekpeme na akɔmitia. Esiae na be aɖaka la ƒe akɔntabubuwo katã nye esiwo mete ŋu xlẽ o.
2. Ema wò akɔdada ɖe akpa vovovo 16 me, ale be kɔmiti si wɔ ɖeka bliboe gɔ̃ hã naʋli vevie be yeagaƒo ga home si ame ɖeka ɖesiaɖe da akɔ kplii nu ƒu.
3. Etsɔa gome mawo ɖona ɖe amewo le ɣeyiɣi siwo woɖo ɖi me to server geɖe dzi, eyata eteƒekpɔla mate ŋu agblɔ be gomeawo nye atikemawɔla ɖeka tɔ vaseɖe esime wova ɖo o.

Ga ɖesiaɖe tsɔa eya ŋutɔ ƒe kpeɖodzi si me sidzedze aɖeke mele o be enye akɔtagbalẽvi si sɔ ƒe akpa si sɔ, eyata ame aɖeke mate ŋu atsɔ akɔdada siwo ŋu womeda asi ɖo o akpe ɖe eŋu o. Wotsɔa gomekpɔkpɔ siwo ŋu woɖo kpee kpena ɖe homomorphically kpena ɖe encrypted running total ŋu na wò ŋuɖoɖo si nètia.

## Xexlẽme evɔ womaʋu akɔtagbalẽvi aɖeke o

Tiatiawɔha si woma ye kpɔa akɔntabubua dzi: ne mede ɖeke o la, ame 10 ya teti siwo ɖoa kpe akɔdada ƒe kɔsɔkɔsɔ dzi, eye wo dometɔ ɖeka pɛ hã mate ŋu aɖe naneke gɔme o. Le ƒoƒo aɖe ƒe gɔmedzedze la, wowɔa safuidzidzi ƒe kɔnu aɖe si wɔa safui aɖe si ƒe nya ɣaɣlawo ɖeɖeɖa safui si sɔ la ma ɖe wo katã me eye womeƒoa wo nu ƒu ɖe teƒe ɖeka gbeɖe o.

> Dziɖuɖumegã ɖeka aɖeke melé safuia ɖe asi o. Ne wo dometɔ eve le etɔ̃ me trɔ woƒe safuiwo ɖekae ko hafi aɖaka la ʋuna, eye le ɣemaɣi gɔ̃ hã la, xexlẽme bliboa koe wòɖena fiana.

Ne ƒoƒoa wu enu la, xexlẽdzesi siwo wotsɔ nya ɣaɣlawo ŋlɔ la li xoxo tso homomorphic addition si le etame la me. Validator ɖesiaɖe taa nya ɣaɣla ƒe akpa aɖe tsɔ kpe ɖe kpeɖodzi si wòɖe nyuie ŋu. Ne wo dometɔ eve le etɔ̃ me ya teti kpe asi ko la, woƒe akpawo ƒoa ƒu zua nuŋɔŋlɔ si me kɔ ƒe xexlẽme mamlɛtɔ na biabia ɖesiaɖe, eye womeɖea nya bubu aɖeke gɔme gbeɖe o. Emegbe node blibo ɖesiaɖe ateŋu alé ŋku ɖe dzɔdzɔenyenye ƒe kpeɖodzi si woƒo ƒu ŋu, ale be dukɔa ateŋu aɖo kpe xexlẽmea dzi evɔ womaka ɖe amesiwo ɖo kpe edzi dzi o.

## Amekae ƒua du, kple nusi womate ŋu awɔ o

Aɖaŋua ma akpa eve me eyata ŋusẽ mele ƒuƒoƒo aɖeke si fũ o.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Ðoɖowɔla multisig nye ƒuƒoƒo si me ame 2 le 5 me le eye eteƒenɔlawo tso Project Tachyon, me [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), kple Valar Group. Etsoa nya me le nyabiase siwo aɖo kɔsɔkɔsɔa gbɔ ŋu eye wòɖoa kpe ƒoƒo ɖesiaɖe ƒe nya ɣaɣla ƒe safui dzi, gake mate ŋu akpɔ ame ɖekaɖekawo ƒe akɔdada, atrɔe, alo axe mɔ na wo o. Amesiame si melɔ̃a nyabiaseawo o ate ŋu awɔ eya ŋutɔ ƒe akɔdada ƒe kɔsɔkɔsɔ, elabena kɔmpiutadziɖoɖoa ʋu eye mɔɖeɖe mele eŋu o.

Validators nye at-least-10 nodes siwo léa split decryption key eye wowɔa threshold decryption. Womate ŋu aɖe akɔtagbalẽvi ɖekaɖekawo gɔme alo awɔ alakpa akɔntabubu o, elabena nyatakaka ɖesiaɖe si woɖe tso eme la tsɔa dutoƒo ɖɔɖɔɖo ƒe kpeɖodzi ɖonae.

## Nusi tae quorum la nye

Ðoɖowɔlawo ɖoa gomekpɔkpɔ ƒe dzidzenu aɖe: ne ZEC 1,000,000 ya teti kpɔ gome le nyabiase ɖeka ya teti me ko hafi wobua numekukua me tsonu be enye gakuxɔlawo teƒenɔlawo. Ameha la tsoa nya me le nyabiase aɖeke ŋu o eye womewɔa eŋudɔ le nyabiase ɖesiaɖe me o. Enye ŋkuléle ɖe numekuku bliboa ŋu zi ɖeka, eyata ne ZEC ƒe agbɔsɔsɔ gã aɖe dze ko hafi wobua emetsonu aɖe nu vevii. Le dzidzenu ma te la, womebua emetsonua be enye dzesi si ŋu gɔmesese le o.

## Nusiwo ɖoɖo sia mekpɔ ta na o

Be eme nakɔ le goawo ŋu nye alesi wowɔe gɔmesese ƒe akpa aɖe.

1. Dzesie wònye, ke menye nyametsotso si bla ame o. Gakuxɔlawo ƒe numekuku dzidzea seselelãme si woda ɖe ati dzi eye wòɖua nu ɖe Zcash's nɔnɔme si sɔ me [dziɖuɖu ƒe ɖoɖo](../zcash-community/zcash-governance) tsɔ wu be woatsɔe aɖo eteƒe.
2. Wodae ɖe gaku nu, eyata ŋusẽkpɔɖeamedzi kplɔa nusiwo le asi léle ɖe asi ɖo. Friction si bɔbɔ ɖe anyi ate ŋu ana amewo ƒe vava nadzi ɖe edzi gake metrɔa ZEC.
3. Ðoɖowɔɖia nye esi ɖoɖowɔla multisig, si tiaa nyabiase siwo ado. Mate ŋu aka asi akɔdada ŋu o, eye amesiame ate ŋu awɔ kɔsɔkɔsɔ si le ho ʋlim, gake ɖoɖowɔɖiwo ɖoɖo gakpɔtɔ nye nusi kpɔa ŋusẽ ɖe ame dzi.
4. Xexlẽme hiã validators le internet dzi. Akɔntabubua wɔwɔ bia be wo dometɔ eve le etɔ̃ me ya teti nawɔ nu aduadu, eyata nutsotso gã aɖe alo gbegbe si wowɔ ɖekae ate ŋu ahe emetsonu aɖe ɖe megbe.
5. Dadasɔ le adzamenyawo me le nugbeɖoɖo blibo te nye ametakpɔkpɔ le gogloƒe, ke menye nukpɔsusu o. Ne kɔmiti bliboa gbugbɔ safuia tu le adzame la, gomemamã kple ɣeyiɣi si woɖo ɖi na wòe nye nusi kpɔa wò dadasɔ ta, eye aɖaŋuwɔlawo lɔ̃ ɖe edzi be esiawo gbɔdzɔ wu le nugbeɖoɖo me. Ʋuwo ƒe zɔzɔ ŋuti numekuku deŋgɔ nye afɔku si susɔ.
6. Akpa siwo ʋãna wu alesi wowɔe xoxoa. PIR servers, submission servers, voting key yeye, kple multi-stage proofs dometɔ ɖesiaɖe nye teƒe si vodadawo alo ɖoɖowɔwɔ gbegblẽ ate ŋu adze le. Nuɖoanyia nye esi woate ŋu azã faa eye wodzro eƒe akpa aɖewo me le wo ɖokui si, si kpɔa afɔku ma gbɔ tsɔ wu be wòaɖee ɖa.

Nusiwo wòkpɔ ta na, vevie eye woate ŋu aɖo kpe edzi, enye nu eve siwo le vevie wu: womate ŋu atsɔ wò akɔtagbalẽvi asɔ kple wò amenyenye o, eye xexlẽme mamlɛawo koe woɖena fiana gbeɖe o.

## Nyagɔmeɖegbalẽ

| Nya | Gɔmesese si le Eŋlisigbe me gbadzaa |
|---|---|
| Voting chain | Blockchain si le eɖokui si, si Valar Group, si kpɔa akɔdadaa dzi; wò Zcash nuŋlɔɖiwo meʋuna ɖe edzi gbeɖe o |
| Snapshot height | Mainnet block si ƒe balances ɖo akɔdada ƒe kpekpeme (block 3,459,350 na NU7 ƒe numekukua) |
| Nullifier | Nuŋlɔɖi aɖe ƒe gazazã ƒe dzesi tɔxɛ; eɖeɖefia atsɔ akɔtagbalẽvi asɔ kple nuŋlɔɖi aɖe, eyata akɔdada ɖo kpe edzi be menye hamevi o boŋ |
| Private Information Retrieval (PIR) | Nyatakakawo xɔxɔ tso server dzi esime nèle nyatakaka siwo nèbia la ɣlam |
| Homomorphic encryption | Encryption si ƒe ciphertexts ateŋu aƒo ƒu ɖekae evɔ womaɖe wo gɔme o |
| Coordinator multisig | Ƒuƒoƒo 2 le 5 me si ɖea mɔ ɖe nyabiasewo kple safui goglo la ŋu, gake mete ŋu kpɔa alo trɔa akɔdada o |
| Election authority | Validator 10 alo esi wu nenema siwo léa split decryption key la ɖekae eye woɖea xexlẽme mamlɛtɔ ko fiana |
| Threshold decryption | Ne gomekpɔla vevi siwo le afisia sɔ gbɔ, siwo nye eve le etɔ̃ me, wɔ nu aduadu ko hafi emetsonu aɖe gbugbɔgaxɔ |
| Quorum | ZEC gomekpɔkpɔ suetɔ kekeake si nye 1,000,000 na akɔdadaa be woabui be enye teƒenɔla |

## Nyabiasewo ƒe Nyabiasewo

Ðe nye gakuwo ʋãna alo wotua wo ne meda akɔa? Ao, wodzidzea dzedze le snapshot block la dzi, eyata wò ZEC nɔa anyi eye woate ŋu azãe. Akɔdada naa kpeɖodziwo nɔa kɔsɔkɔsɔ si le vovo dzi, ke menye Zcash asitsatsa o.

Ame aɖe ate ŋu agblɔ alesi meda akɔ alo alesi gbegbe melé ɖe asia? Ao, wotsɔa nya ɣaɣlawo dea akɔtagbalẽviwo me eye woɖea nyatakaka siwo katã woƒo ƒu ko me. Wò akɔdada medo ƒome kple wò amenyenye o, eye woma wò ga si susɔ ɖe ɣeyiɣi 16 me be woatsɔ akpɔ eta tso kɔmiti si wɔ ɖeka gɔ̃ hã si me.

Nukae xea mɔ na ame be wòada akɔ zi eve, alo atsɔ gaku siwo mele esi o ada akɔ? Akɔtagbalẽvi ɖesiaɖe tsɔa kpeɖodzi siwo me sidzedze zero le be wotsɔ fotoɖeɖe ƒe dadasɔ ŋutɔŋutɔ si womezã o ɖo megbe nɛ, eye kpeɖodzi si wotu ɖe PIR dzi si menye hamevinyenye o ɖee fia be womezã nuŋlɔɖi si le ete la xoxo o, evɔ womeɖe nuŋlɔɖi si wònye la fia o.

Amekae xlẽa akɔdadaawo? Validator 10 ya teti ƒe hatsotso si woma, amesiwo dometɔ aɖeke mate ŋu aɖe naneke gɔme ɖeɖeko o. Ele be ame eve le etɔ̃ me nawɔ nu aduadu atsɔ aɖe xexlẽmeawo katã afia, eye nya ɣaɣla ɖesiaɖe si woɖe tso eme la va kple dutoƒo ƒe dzɔdzɔenyenye ƒe kpeɖodzi.

Ðe emetsonua blaa amea? Enye gakuxɔla ƒe seselelãme ƒe dzesi si wotsɔ ati da kpekpemee. Enaa Zcash's dziɖuɖu si sɔ la nya tsɔ wu be wòawɔ tɔtrɔ aɖe ƒe se le eɖokui si.

Ðe nye ŋutɔ mate ŋu awɔ esia alo adzro emea? Ɛ̃. Valar Group ta akɔdada ƒe kɔsɔkɔsɔ ƒe kɔmpiutadziɖoɖoa, nutome suewo, PIR ɖoɖoa, kple akɔntabubu ƒe agbalẽdzikpɔla katã be amesiame nalé ŋku ɖe eŋu ahawɔ dɔ.

## Do wò nugɔmesese kpɔ

Ne wotsɔ nya ɣaɣlawo de akɔtagbalẽvi ɖesiaɖe me eye ame ɖesiaɖe ƒe ŋkɔ meyɔ o la, aleke ame aɖe awɔ aka ɖe edzi be akɔntabubu siwo wota la sɔ eye be ame aɖeke meda akɔ zi eve o?

<details>
<summary>Answer</summary>

Kpeɖodzi etɔ̃e wɔa dɔa. Kpeɖodzi si nye sidzedze zero le akɔtagbalẽvi ɖesiaɖe ŋu be wotsɔ fotoɖeɖefia ŋutɔŋutɔ si da sɔ le megbe nɛ, eyata womexlẽa akɔdada aɖeke si womeda asi ɖe edzi o. Kpeɖodzi si wotu ɖe PIR dzi be womenye hameviwo o ɖee fia be womezã gagbalẽ si le megbe nɛ o, si xe mɔ ɖe akɔdada zi eve nu evɔ womeɖe nuŋlɔɖia ɖe go o. Eye ne kpeɖodzinalawo ɖe xexlẽdzesiawo katã gɔme la, wo dometɔ ɖesiaɖe taa kpeɖodzi be wosɔ, eyata node blibo ɖesiaɖe ate ŋu aɖo kpe edzi be woɖe xexlẽdzesi mamlɛawo gɔme anukwaretɔe tso akɔtagbalẽvi siwo wotsɔ nya ɣaɣlawo ŋlɔ la me.
</details>

## Nunɔamesiwo

- [NU7 Coinholder Vote ƒe gbeƒãɖeɖe (Valar Group kple Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - forum post scoping the poll, snapshot ƒe kɔkɔme, kple ɖoɖowɔɖi
- [Gakuxɔlawo ƒe Akɔdada ƒe Kɔsɔkɔsɔ: mɔ̃ɖaŋununya ƒe ɖoɖowɔwɔ](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - protocol write-up si dzi wotu axa sia ɖo
- [Valar Group kpɔ akɔdada ŋuti nuŋlɔɖiwo ta](https://valargroup.gitbook.io/shielded-vote-docs) - nufiame si wolé ɖe te na akɔdada ƒe kɔsɔkɔsɔa
- [Valar Group ƒe akɔdada ƒe sedede kple agbalẽdzikpɔkpɔ (GitHub)](https://github.com/valargroup/vote-sdk) - ʋuʋu-dzɔtsoƒe ƒe dɔwɔwɔ kple eƒe agbalẽdzikpɔkpɔ

## Axa siwo do ƒome kplii

- [Ame ŋutɔ ƒe Nyatakakawo Xɔxɔ](../zcash-tech/private-information-retrieval) - mɔnu si menye hamevinyenye o ƒe kpeɖodzimɔnu si le megbe na ame ŋutɔ ƒe akɔdada zi eve ƒe mɔxexeɖedɔléle nu
- [Ironwood](../zcash-tech/ironwood) - ta si wodzra ɖo si ƒe dadasɔwo ɖoa akɔdada ƒe kpekpeme
- [zk-SNARKs](../zcash-tech/zk-snarks) - kpeɖodziɖoɖo si le megbe na dadasɔ kple dzedze ƒe kpeɖodziwo
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools) - nusi shielded balance nye kple nusita wònɔa ɣaɣla
- [Zcash Gadodo kple Dziɖuɖu ƒe wɔwɔfia](../zcash-community/zcash-governance) - alesi seselelãme ƒe dzesi sia ɖua nu ɖe Zcash's nyametsotsowɔwɔ ƒe ɖoɖo si keke ta wu me
- [Shielded Labs](../zcash-organizations/shielded-labs) - ame atɔ̃ siwo le ɖoɖowɔla multisig la dometɔ ɖeka
