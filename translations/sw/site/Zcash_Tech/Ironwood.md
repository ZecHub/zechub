<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mti wa chuma

> Ironwood inawashirikisha kwenye Zcash mainnet katika block 3,428,143, inayotarajiwa karibu Julai 28, 2026 UTC.

Nini utachukua mbali: nini Ironwood mabadiliko, kwa nini mdudu katika fedha siri ni kubwa, na jinsi turnstile lets mtu yeyote kuthibitisha kwamba hakuna ZEC ilikuwa bandia.

Ironwood ni Zcash [kuboresha mtandao](../start-here/network-upgrades), rasmi NU6.3, ambayo inaanzisha mpya kulindwa pool ya jina moja. A [dimbwi lenye ulinzi](../using-zcash/shielded-pools) ni seti ya fedha ambao kiasi na wamiliki kubaki siri kwa njia ya [sifuri-maarifa cryptography](../zcash-tech/zk-snarks)Ironwood ipo ili kuzuia na kukagua mdudu wa uadilifu uliopatikana katika bwawa lililolindwa la Orchard, na kutoa jamii njia kali ya kuangalia kuwa usambazaji wote wa ZEC ni waaminifu. Sheria zake za makubaliano zinaelezewa kwa undani zaidi kwenye kifungu cha 2 (a) - (b). [ZIP 258 - Ujumbe wa posta.](https://zips.z.cash/zip-0258).

Why this matters. With transparent money like Bitcoin, anyone can check that no coins were forged by reading the public ledger. Shielded money hides the amounts, so you cannot just look. Instead the cryptography itself has to guarantee that no one can create money in secret. Ironwood matters because a bug was found in that guarantee for the Orchard pool. The upgrade closes the gap and gives anyone a way to confirm that the total supply of ZEC is still honest.

Mpya kwa Zcash? Kuanza na [ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash) na [Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools), kisha kurudi hapa.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Kwa nini mti wa Ironwood ulihitajika?

Mwishoni mwa Mei 2026, mtafiti wa usalama huru Taylor Hornby, wakati wa ukaguzi wa itifaki kwa ajili ya [Maabara ya Kuhifadhiwa](../zcash-organizations/shielded-labs), kwa uwajibikaji wazi soundness bug katika Orchard kulindwa pool. orchard ilikuwa Zcash ya karibuni ulinzi bwawa wakati huo, na kosa alikaa katika sehemu elliptic-curve wa wake zero maarifa mzunguko, ambayo inatumia [Halo (Habari Njema)](../zcash-tech/halo) 2 mfumo wa kuthibitisha.

1. mdudu soundness ina maana ya hisabati kwamba inathibitisha shughuli ni halali haina kikamilifu kuhakikisha yake.
2. Kwa nadharia, mshambuliaji angeweza kutumia kasoro hiyo kuunda thamani isiyo halali ndani ya bwawa la Orchard na kutumia pesa ambazo hazikuwa zao kweli, bila kuacha alama ambayo node kawaida ingeambukizwa.
3. Zcash's turnstile bado capped kiasi gani thamani inaweza milele kuondoka Orchard, hivyo jumla ya ugavi hakuweza inflated, lakini pool mwenyewe cryptography tena uhakika kwamba kila sarafu siri ndani yake ilikuwa halisi.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Nambari hapo juu ni picha rahisi. kasoro halisi ilikuwa katika kipande maalum ya hisabati mzunguko wa, si hesabu halisi ya sarafu kwenda ndani na nje. hatua kuchukua mbali tu kwamba soundness mdudu unaweza basi thamani kuundwa ndani ya bwawa bila kugundua.

Muhimu, hakuna ushahidi mdudu alikuwa milele kutumika, hakuna uthibitisho wa athari kwa watumiaji fedha, na hakuna ushahidi kwamba jumla ya ugavi wa ZEC iliyopita. Iligunduliwa kupitia utafiti usalama na fasta kabla yoyote madhara inayojulikana.

## Jibu

Jumuiya ya Zcash ilitoa marekebisho kwa hatua badala ya yote mara moja.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activates around July 28, 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Mapema Juni 2026, hatua ya muda ililemaza bwawa la Orchard wakati marekebisho kamili yalikuwa yakiandaliwa.
2. Upgrading ya NU6.2 ilirekebisha mzunguko wa Orchard yenyewe, ikifunga udhaifu uliokuwa msingi.
3. kuboresha NU6.3, Ironwood, kuanzisha mpya kulindwa pool na checkpoint umma hivyo thamani inaweza hoja nje ya zamani Orchard bwawa chini ukaguzi kamili.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Kile ambacho dimbwi la Ironwood hufanya

NU6.2 kupata mzunguko Orchard kwa ajili ya shughuli zote mpya, lakini thamani kuundwa chini ya sheria za zamani bado anakaa katika bwawa orchard. Ironwood inatoa kwamba thamani marudio safi na njia ya kukagua kama ni kusonga.

Ironwood pool ni mpya kulindwa thamani ya ziada kuundwa wakati NU6.3 activates. Ni kujengwa juu mzunguko kusahihishwa na inatumia quantum-recoverable noti format (muundo kwamba lets fedha kuwa kulipwa kama si kitu chochote) [kompyuta quantum](../zcash-tech/post-quantum-security) milele kuvunja cryptography leo), inaelezwa katika [ZIP 2005 - Ujenzi wa Jengo la Makao Makuu ya Ulaya](https://zips.z.cash/zip-2005).

1. Baada ya uanzishaji, zamani Orchard bwawa inakuwa matumizi tu, hivyo hakuna thamani mpya inaweza kuingia ndani yake.
2. Thamani mpya iliyohifadhiwa inapita kwenye Ironwood badala yake.
3. ZEC iliyohifadhiwa inaweka dhamana sawa za faragha ambazo huficha mtumaji, mpokeaji na kiasi.

## Mzunguko wa mviringo

Wazo muhimu katika Ironwood ni turnstile, ukaguzi wa uhasibu kwamba kila sarafu lazima kupita kwa wakati kusonga kutoka bwawa zamani Orchard ndani ya Ironwood.

> Mlango wa kioo hufanya kwa pesa zilizofichwa kile mlango wa glasi unafanya kwa ghala la benki. Bado huwezi kuona ndani, lakini unaweza kuhesabu kabisa kinachoingia na kinachotoka nje.

1. Fedha zinazoondoka Orchard zinahesabiwa katika kituo cha uthibitisho wa umma kabla ya kuingia Ironwood.
2. Hii inaruhusu mtu yeyote kukagua kiasi gani ZEC huhama, kuimarisha imani katika usambazaji halisi wa mzunguko.
3. Kama yoyote bandia ZEC alikuwa kuundwa kwa njia ya mdudu mapema, uhasibu huu uhamiaji ni ambapo itakuwa kuonyesha.

Turnstiles si mpya kwa Zcash. mtandao ina kutumika yao kabla, katika mipaka kati ya Sprout, Sapling na Orchard mabwawa, hivyo thamani kusonga kati ya maziwa anakaa auditable na hakuna bwawa wanaweza kutolewa zaidi kuliko kisheria aliingia yake.

Sheria za makubaliano kuweka kila thamani pool, ikiwa ni pamoja na Ironwood, ndani ya mtandao wa upeo fedha kikomo, hivyo mizani pool kamwe kwenda hasi.

## Nini watumiaji haja ya kufanya nini

Wallets na node programu kushughulikia zaidi ya hii moja kwa moja, lakini mabadiliko vitendo ni rahisi: baada ya muda, hoja ulinzi mali kutoka zamani Orchard bwawa kupitia turnstile katika Ironwood pool. Kufuata mwongozo wa mtoa yako mfuko wa fedha, na daima update to a mkono kutolewa kabla ya uanzishaji kuzuia.

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
Hifadhi ya fedha iliyohifadhiwa ambayo kiasi chake na wamiliki wake wamefichwa kwa kutumia mbinu za siri zisizojulikana.
◯ Udanganyifu wa usahihi. Kosa ambalo huruhusu shughuli batili kupita ukaguzi uthibitisho kama kwamba ilikuwa halali.
Turntile. checkpoint umma kwamba mahesabu thamani kusonga kati ya mabwawa hivyo ugavi anakaa auditable.
"Tumia tu" - Hifadhi ambayo unaweza kutumia kutoka, lakini haiwezi kuongeza thamani mpya kwa.
 Network Upgrade (NU)  mabadiliko uratibu kwa Zcash ya makubaliano sheria, ulioamilishwa katika block kuweka urefu.
Nakala ya Quantum-recoverable. Format noti iliyoundwa ili fedha inaweza kuwa kurejeshwa kama kompyuta quantum milele kuvunja cryptography leo.

## FAQs

Je, ZEC yangu walioathirika? Hapana. Hakuna ushahidi mdudu alikuwa milele kutumika, hakuna athari kwa fedha ya mtumiaji, na hakuna mabadiliko katika jumla ugavi.

Je, ninahitaji kufanya kitu chochote? Weka mkoba wako na node programu updated kwa kutolewa mkono kabla ya kuzuia uanzishaji. mfuko wa fedha yako hatua katika Ironwood baada ya muda kama wewe kutumia, hivyo hakuna mwongozo kukimbilia. Kufuata watoa huduma yako mfuko ushauri.

Je, Zcash bado binafsi? Ndiyo. Ironwood anaendelea faragha sawa ulinzi kwamba unaficha mtumaji, mpokeaji na kiasi. kuboresha hii ni kuhusu uadilifu usambazaji, si siri.

Je mdudu huyo aliwahi kutumiwa vibaya? Hakuna ushahidi kwamba ilikuwa hivyo. Iligunduliwa kupitia utafiti wa usalama, ilifunuliwa kwa uwajibikaji na kurekebishwa kabla ya madhara yoyote yanayojulikana.

What happens to the old Orchard pool? It becomes spend-only. No new value can enter it, and existing value moves into Ironwood through the turnstile, where the migration is publicly audited.

## Jaribu uelewevu wako

Ikiwa ZEC imefichwa ndani ya mabwawa yaliyofunikwa, mtu yeyote anaweza kuthibitishaje kwamba mdudu wa Orchard hakuongeza kwa siri jumla yake?

<details>
<summary>Answer</summary>

Kila sarafu kuondoka zamani Orchard pool ni kuhesabiwa katika checkpoint umma kama inaingia Ironwood. Kama thamani zaidi alijaribu kuondoka kuliko kisheria kuingia, uhasibu bila usawa, hivyo bandia yoyote mdudu inaweza kuwa na umba itakuwa uso kwenye lango kwamba.
</details>

### Rasilimali

[ZIP 258: Utekelezaji wa NU6.3 Network Upgrade](https://zips.z.cash/zip-0258)

[ZIP 257: Utekelezaji wa Orchard Muda Udhaifu Kupunguza na NU6.2 Network Upgrade](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability (Uwezo wa Kupata tena kwa kiwango cha juu)](https://zips.z.cash/zip-2005)

[Ironwood: New Shielded Pool kwa Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)

[Halo (Habari Njema)](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Usalama Baada ya Quantum](../zcash-tech/post-quantum-security)

[Maabara ya Kuhifadhiwa](../zcash-organizations/shielded-labs)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [NU6.2](../zcash-tech/nu6-2)
