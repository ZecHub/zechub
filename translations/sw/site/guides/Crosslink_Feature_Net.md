<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jiunge na Crosslink Feature Net

## Kwa ufupi

- Feature Net ni mtandao wa majaribio wa umma wa Shielded Labs kwa ajili ya [Crosslink](/zcash-tech/crosslink-protocol), safu ya mwisho inayopendekezwa inayoongeza kuweka sarafu karibu na thibitisho la kazi la Zcash.
- Inaendesha sarafu ya majaribio, cTAZ. Hakuna chochote unachofanya humo kinachohamisha au kuweka hatarini ZEC ya mainnet.
- Programu moja ya kompyuta ya mezani ni node, mchimbaji, pochi na kithibitishaji cha mwisho. Huchimba cTAZ kwa chaguo-msingi na ina kitufe cha chanzo cha sarafu za bure.
- Kuweka sarafu, kuondoa sarafu zilizowekwa na kutoa hufanya kazi tu wakati wa “Siku ya Kuweka Sarafu”, siku moja katika kila siku tatu. Ukiikosa, unasubiri inayofuata.
- Ili kuweka sarafu, unabandika utambulisho wa kithibitishaji cha mwisho na kubofya kiasi. Mwongozo huu unatumia kithibitishaji cha mwisho cha ZecHub kama mfano.
- Miito miwili ya RPC inaonyesha ulipo: `wallet_staking_positions` na `get_tfl_recency_status`.

*Imejaribiwa kwa Feature Net toleo la 14 kwenye Windows 11 (toleo la 10.0.26200.9550), kuanzia 8 hadi 10 Oktoba 2026. Programu hii ni mfano wa awali na hubadilika kwa kila toleo. Ikiwa unachokiona kinatofautiana na ukurasa huu, amini uendeshaji wako mwenyewe na tafadhali fungua PR.*

## Feature Net ni nini

Crosslink ni pendekezo, si sehemu ya Zcash leo. Maswali yanayoulizwa mara kwa mara ya Shielded Labs kuhusu [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) yanasema kwamba “ingehitaji kupitia mchakato wa kawaida wa utawala wa Zcash” kabla haijafika mainnet. Ukurasa wa [Crosslink Protocol](/zcash-tech/crosslink-protocol) unaeleza usanifu huo.

Ili kujaribu usanifu huu pamoja na watumiaji halisi, Shielded Labs huendesha kile inachokiita [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): “mfululizo wa testnet zenye motisha”. Majukumu matatu yapo kwenye mtandao, na programu ya kompyuta ya mezani inaweza kutekeleza yote:

| Jukumu | Hufanya nini |
|---|---|
| Mchimbaji | Huzalisha block za thibitisho la kazi, kama ilivyo kwenye Zcash leo |
| Mwenye kuweka sarafu | Hufunga cTAZ katika dhamana ya ukabidhi na kuielekeza kwa kithibitishaji cha mwisho |
| Kithibitishaji cha mwisho | Hupiga kura kukamilisha block. Nguvu yake ya kupiga kura ni sarafu zilizowekwa zilizoikabidhiwa |

Hifadhi nyuma yake inaanza kwa taarifa ya kutokuwa na dhamana inayostahili kusomwa kabla ya kusakinisha chochote: “ipo kuthibitisha mawazo, si kuonyesha uhandisi wa uzalishaji” na ni “msimbo ambao hauko tayari kwa uzalishaji” ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Iendeshe kwenye mashine ambako hilo linakubalika.

### Kile kilichobadilika katika toleo la 14

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) ilitoka 1 Oktoba 2026. Mtandao wake huanza kama thibitisho la kazi la kawaida na kuwasha Crosslink kwa hatua tatu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), pia zinaonyeshwa kwenye [ctaz.cash](https://ctaz.cash/v14)):

| Block | Kinachotokea |
|---|---|
| 20,736 | Kuweka sarafu kunafunguliwa |
| 34,560 | Orodha ya kwanza ya vithibitishaji vya mwisho huchukuliwa kutoka kwa sarafu zilizowekwa kwenye mnyororo |
| 36,288 | Ukamilishaji wa BFT huanza, pamoja na zawadi za kuweka sarafu |

Zawadi za kuweka sarafu huanza kwenye block ya mwisho kati ya hizo. Dhamana iliyowekwa mapema haipati chochote hadi wakati huo ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Toleo hilohilo lilipunguza orodha hai kuwa vithibitishaji 12 vya mwisho vyenye sarafu nyingi zaidi zilizowekwa ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) na, kwa maneno ya maelezo yake ya toleo, likavipa kamisheni: “10% ya Zawadi zote za PoS katika block huenda kwenye kamisheni hizi, huku 90% ikisambazwa kwa dhamana zote za kuweka sarafu”.

### cTAZ na ZEC halisi

cTAZ (“Crosslink TAZ”) ni sarafu ya majaribio ya Feature Net. Unaweka cTAZ, kamwe si ZEC.

ZEC halisi huingia tu mwishoni. Shielded Labs imetenga [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) kwa ajili ya feature nets, na maelezo ya [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) yanasema inalipwa “kwa uwiano unaotegemea tu kiasi cha cTAZ ambacho kila mshiriki alipata kupitia uchimbaji au kuweka sarafu”. Matokeo mawili ni haya:

- **Sarafu za chanzo cha sarafu za bure hazihesabiki.** cTAZ uliyopewa, na chanzo cha sarafu za bure au mtu mwingine yeyote, haipati chochote kwa kukaa katika pochi yako. Zawadi za block kutoka uchimbaji na kuweka sarafu pekee ndizo zinazohesabika.
- **Malipo yanadaiwa, si ya kiotomatiki.** Shielded Labs hutangaza kila awamu katika [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Kwa Awamu ya 2 iliwaomba washiriki kutuma ufunguo wa kutazama wa pochi zao na anwani ya mainnet kufikia 4 Oktoba 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Mtandao ambao toleo la 14 huendesha, ule unaojiunga nao katika mwongozo huu, ulitangazwa kama Awamu ya 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Kabla ya kuanza

- **Kompyuta unayoweza kuiacha ikiendelea kufanya kazi.** Toleo hili lina miundo ya Windows, macOS, Ubuntu na Arch Linux. Mwongozo huu uliendeshwa kwenye Windows, kwenye PC yenye kichakataji cha Intel Core i5-8350U.
- **Siku ya Kuweka Sarafu.** Angalia wakati inayofuata inafunguliwa kabla ya kupanga chochote. Dashibodi ya [Staker Space's dashboard](https://crosslink.staker.space/) huhesabu muda uliosalia kuifikia.
- **Hakuna kingine.** Hakuna ZEC, akaunti wala usajili.

## Hatua ya 1: Pakua programu na uhakiki faili

1. Fungua [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) na usogeze chini hadi **Assets**.
2. Pakua faili la mfumo wako. Kwenye Windows hilo ni `zebrad_v14_win32.exe`.
3. Linganisha SHA-256 ya faili na digest ambayo GitHub inaonyesha kando ya asset hiyo.

Kwenye Windows, katika PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest ambayo GitHub inaonyesha kwa faili hilo ni `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex haitumii herufi kubwa au ndogo, hivyo herufi kubwa zilizo hapo juu ni sahihi. Ili kuacha shell ilinganishe badala ya macho yako:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Fahamu thamani ya ukaguzi huu. Toleo halina sahihi, kwa hivyo hash inayolingana inakuambia kwamba upakuaji umekamilika na ni faili ambalo GitHub inatoa. Haikuambii ni nani aliyelitengeneza. [Verifying Zcash Releases](/guides/verifying-zcash-releases) inaeleza tofauti hiyo.

## Hatua ya 2: Anzisha node na uiruhusu ilandanishwe

Anzisha programu kutoka terminal, ili ujumbe wake wa kuanza ubaki kwenye skrini. Tumia dirisha la kawaida la PowerShell, si lile lililofunguliwa kwa “Run as administrator”: hii ni programu ya mfano wa awali isiyo na sahihi, na haihitaji haki za msimamizi.

```powershell
.\zebrad_v14_win32.exe
```

Dirisha lenye kichwa “Zcash Crosslink Visualizer” hufunguka. Pochi iko upande wa kushoto, ikiwa na vichupo vya **Your Wallet** na **Faucet Wallet**, mnyororo umechorwa katikati, na vithibitishaji vya mwisho vimeorodheshwa upande wa kulia. Terminal huendelea kuchapisha logi ya node. Viache vyote wazi unapotumia mtandao.

Maelezo ya toleo yanaunganisha [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Programu huweka data yake katika folda ya cache: `%LOCALAPPDATA%\zebra` kwenye Windows, `~/.cache/zebra` kwenye Linux na `~/Library/Caches/zebra` kwenye macOS, kulingana na maelezo ya toleo.

**Weka siri hiyo kwako mwenyewe.** Folda hiyo ina faili linaloitwa `secret.seed`. Programu hulitengeneza wakati wa kuanza kwa mara ya kwanza ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) na hutoa pochi yako na utambulisho wako wa kithibitishaji cha mwisho kutoka humo ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Programu pia ina kitufe cha **Copy Seed** kinachoweka siri hiyohiyo kwenye clipboard yako. Mtu yeyote aliye na mojawapo hudhibiti pochi yako. Kamwe usivibandike kwenye gumzo, chapisho la jukwaa au picha ya skrini.

### Jinsi ya kujua kuwa umelandanishwa

Maelezo ya toleo yanasema hakuna “ufuatiliaji uliojengwa ndani wa jinsi ulivyo karibu kulandanishwa na kilele cha mtandao”. Toleo la 14 lina kiasi fulani: menyu kunjuzi ya **Network Info** juu ya dirisha ina safu za PoW Height, Wallet Sync na Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Linganisha urefu wako na ule kwenye [Staker Space](https://crosslink.staker.space/) au [ctaz.cash](https://ctaz.cash/).

Node pia hujibu kupitia RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

Porti ya RPC `127.0.0.1:8232` iko wazi kwa chaguo-msingi katika muundo huu na haihitaji nenosiri ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Husikiliza kwenye mashine yako mwenyewe tu, na chochote kinachoendesha kwenye mashine hiyo kinaweza kuiita.

Katika uendeshaji huu, ulandanishaji wa kwanza, kutoka block 0 hadi kilele kwenye takriban block 28,400, ulichukua karibu dakika 50.

**Baada ya kuanzisha upya, salio lako huonyesha sufuri kwa muda.** Kila programu inapoanza, huunda upya pochi kutoka `secret.seed` na kuchanganua mnyororo tena kuanzia block 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Hadi uchanganuzi ufikie miamala yako, salio lako na sarafu zako zilizowekwa huonekana kama 0. Katika uendeshaji huu vilirudi takriban dakika 15 baada ya kuanzisha upya. Pochi ya chanzo cha sarafu za bure huchanganuliwa tena kwa njia hiyohiyo ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), na wakati wa uchanganuzi kichupo cha Faucet Wallet kilionyesha salio kubwa sana. Puuza vyote viwili hadi Wallet Sync ikamilike.

## Hatua ya 3: Pata cTAZ

### Ichimbe

Kulingana na maelezo ya toleo, programu huanza uchimbaji wa CPU kwenda kwenye pochi yako yenyewe baada ya kulandanishwa. Huhitaji kuwasha chochote. Sarafu zilizochimbwa huenda kwenye anwani ya uwazi ya pochi yako mwenyewe ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Iwapo itapata block ni jambo jingine. Maelezo yanaonya kwamba “unaweza kushindanishwa na wengine wanaochimba kwa kasi zaidi, kwa hiyo hakuna uhakika wa kufanikiwa”. Kwa chaguo-msingi mchimbaji aliyejengwa ndani hutumia thread moja ya CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Ili kutumia thread zaidi, weka kigezo cha mazingira katika dirisha hilohilo la PowerShell kabla ya kuanzisha programu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Uendeshaji huu ulitumia nne:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Kigezo hicho hudumu mradi dirisha hilo liko wazi. Kikiwa kimewekwa, kihesabu cha kichakataji cha Windows kilionyesha node ikitumia muda unaolingana na vichakataji vinne hadi vitano, kwa asilimia ya kichakataji kimoja cha kimantiki:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Matokeo: Intel Core i5-8350U ikichimba kwa thread nne, kuanzia mapema 8 Oktoba hadi alasiri ya 9 Oktoba, haikupata block.

### Au tumia chanzo cha sarafu za bure

Programu ina kitufe cha **Receive cTAZ** chini kulia. Katika msimbo wa toleo la 14, kubonyeza mara moja hutuma 0.5 cTAZ kutoka pochi ya chanzo cha sarafu za bure kwenda yako ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Chanzo cha sarafu za bure ni pochi moja ambayo kila nakala ya programu hubeba ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), na kichupo cha **Faucet Wallet** kinaonyesha salio lake.

Kitufe huzimwa isipokuwa chanzo cha sarafu za bure kiwe na zaidi ya 5.01 cTAZ katika sarafu za faragha ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Kichupo pia huhesabu sarafu zilizochimbwa na chanzo cha sarafu za bure, na hizo huwa za faragha tu katika makundi ya cTAZ 10 kamili pamoja na ada ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), kwa hivyo kichupo kinaweza kuonyesha nyingi huku kitufe kikibaki kijivu. Katika uendeshaji huu kilibaki kijivu tarehe 8 na 9 Oktoba, kikiwa na “The faucet is mining more funds.” kilipowekewa kishale, huku kichupo kikionyesha cTAZ 14.74695.

**Kitufe kikiwa kijivu, iulize node yako mwenyewe.** Node ina mbinu ya kuomba kutoka chanzo cha sarafu za bure, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), ambayo haitumii kanuni ya cTAZ 5.01 ya kitufe. Weka anwani yako mwenyewe mahali pa `YOUR_ADDRESS` (ni sehemu ya `address` ya `wallet_spendable_funds`, hapa chini):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Jibu hilo linamaanisha ombi limewekwa kwenye foleni, si kwamba limetumwa. Katika uendeshaji huu, cTAZ 0.5 ya chanzo cha sarafu za bure ilichimbwa kwenye block 33,306 na ingeweza kutumika kwenye block 33,322. Omba mara moja: chanzo cha sarafu za bure kinashirikiwa, na ombi la pili la anwani ileile hukataliwa wakati la kwanza linasubiri ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Au muombe mshiriki mwingine

Mtu yeyote kwenye mtandao anaweza kukutumia cTAZ kwa kitufe cha **Send** cha programu. Katika uendeshaji huu mshiriki mwingine alituma cTAZ 31. Iliwasili kama “Received” ikiwa na dokezo “send from user wallet”, ambalo ni dokezo ambalo Send ya programu yenyewe huambatisha ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Omba katika [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), na toa anwani yako pekee.

Sarafu za chanzo cha sarafu za bure na zawadi zinatosha kujifunza kuweka sarafu. Hazihesabiki kuelekea zawadi za ZEC.

### Hakiki unachoweza kutumia

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Hili lilikuwa jibu baada ya cTAZ 0.5 ya chanzo cha sarafu za bure kuwasili, huku anwani ikiwa imefupishwa:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Kiasi kiko katika zatoshi: 100,000,000 hutengeneza cTAZ moja. Sarafu za faragha huhitaji uthibitisho 3 kabla hazijahesabika kuwa zinaweza kutumika ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Sarafu kutoka chanzo cha sarafu za bure na kutoka kwa washiriki wengine hutua katika `spendable_zats`. Sarafu zilizochimbwa ni za uwazi, kwa hivyo hutua katika `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Block moja baada ya uwekaji wa pili wa sarafu katika uendeshaji huu, salio lililosalia lilionyeshwa chini ya `pending_zats`. Block chache baadaye lingeweza kutumika tena.

## Hatua ya 4: Weka sarafu kwa kithibitishaji cha mwisho

### Subiri Siku ya Kuweka Sarafu

Kuweka sarafu, kuondoa sarafu zilizowekwa na kutoa hukubaliwa tu wakati

```text
block height mod 10,368 < 3,456
```

ambapo ni dirisha la block 3,456 mwanzoni mwa kila block 10,368. Kwa lengo la mtandao la sekunde 25 kwa block, hiyo ni siku moja katika kila siku tatu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Madirisha ya kwanza ya toleo la 14 hufunguliwa kwenye block 20,736, 31,104, 41,472 na 51,840.

Kulingana na maelezo ya toleo, programu hutangaza mwanzo na mwisho wa kila Siku ya Kuweka Sarafu. Katika uendeshaji huu orodha yake ya block ilionyesha mstari mwekundu wa “* STAKING DAY END *” kati ya block 34,559 na 34,560.

**Maelezo ya toleo yanasema mambo mawili.** Orodha yake ya mabadiliko hutoa “~siku 1 kwa Siku ya Kuweka Sarafu na ~siku 3 kwa Mzunguko wa Kuweka Sarafu”, jambo linalolingana na msimbo. Chini zaidi, sehemu iliyohamishwa kutoka Msimu wa 1 bado inasema Siku ya Kuweka Sarafu huanza kila block 150 na kudumu 70. Fuata ya kwanza. Mstari wa mwisho hapo juu hukaa mahali ambapo kanuni ya kwanza hufunga dirisha (34,560 mod 10,368 = 3,456); chini ya kanuni ya pili block 34,560 ingeanguka ndani ya dirisha.

### Chagua kithibitishaji cha mwisho

Kithibitishaji cha mwisho hutajwa kwa utambulisho wake, mfuatano unaoanza na `zfinv1`. ZecHub huchapisha utambulisho wa kithibitishaji cha mwisho kinachoendesha katika [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Nakili utambulisho kutoka chanzo unachokiamini. Kulingana na maelezo ya toleo, programu pia huorodhesha vithibitishaji vya mwisho katika paneli yake ya upande wa kulia, ikiwa na ikoni ya kunakili upande wa kushoto wa kila kimoja.

Baada ya kuweka sarafu, historia ya pochi na RPC hutaja kithibitishaji cha mwisho kwa ufunguo wa hex badala ya utambulisho wake. Kwa kithibitishaji cha mwisho cha ZecHub ufunguo huo ni `2941ef23...266aae8f`.

Chagua kithibitishaji cha mwisho unachokiamini. Usanifu hauna ukataji wa kiotomatiki, lakini huruhusu “hard fork inayoratibiwa na watumiaji inayochoma sarafu zote zilizowekwa zilizokabidhiwa kwa kithibitishaji cha mwisho kilichotajwa” ([Crosslink book, muhtasari wa usanifu](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Chaguo pia huamua ni nani anayepiga kura. Kila dhamana hai hupata sehemu yake ya zawadi ya kuweka sarafu. Ikiwa kithibitishaji chake cha mwisho ni miongoni mwa 12 katika orodha, sehemu ya kumi ya sehemu hiyo huenda kwa kithibitishaji cha mwisho kama kamisheni. Dhamana iliyoelekezwa kwa kithibitishaji cha mwisho kilicho nje ya 12 huweka sehemu yake yote, lakini kithibitishaji hicho cha mwisho hakipigi kura ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Weka sarafu

1. Nakili utambulisho wa kithibitishaji cha mwisho.
2. Katika kichupo cha **Your Wallet**, bonyeza **Stake**.
3. Bonyeza **Paste Identity**. Mstari ulio juu ya kitufe hubadilika kuwa herufi za kwanza na za mwisho za utambulisho, `[zfinv1j6..YWyzp4YN]` kwa ule wa ZecHub. Uhakiki kabla ya kuendelea.
4. Bofya kiasi. Kiasi huja katika hatua zisizobadilika, kidogo zaidi ni cTAZ 0.01, na ni kiasi tu ambacho salio lako linatosheleza huwashwa. Kwa cTAZ 0.5, +0.01 cTAZ na +0.1 cTAZ ziliwashwa.

**Hakuna chochote kinachokuomba uthibitishe, na hakuna kinachoonekana kutokea.** Katika uendeshaji huu, kwa maneno ya mjaribu: “Nilibofya mara moja na hakuna kilichotokea, kilikuwa kijivu tu kisha kikawaka tena.” Uwekaji wa sarafu ulikuwa umepita. Historia ya pochi ilionyesha “Staked @ 33334 to 2941ef23..266aae8f”, ada ilikuwa cTAZ 0.00015, na pochi ilionyesha cTAZ 0.010 Staked. Uwekaji wa pili wa sarafu dakika chache baadaye ulitengeneza dhamana ya pili, kwenye block 33,348.

Kila uwekaji wa sarafu hutengeneza dhamana yake ya ukabidhi. Kiasi kisichobadilika na Siku ya Kuweka Sarafu vyote vipo kwa faragha: hufanya sarafu zilizowekwa za mtu mmoja kuwa vigumu zaidi kutofautishwa na za mwingine.

## Hatua ya 5: Angalia nafasi yako

### Dhamana zako [bonds]

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Hili lilikuwa jibu katika block 36,490, siku mbili baada ya kuweka sarafu [staking]:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Mwito huo hauchukui vigezo. Hurejesha dhamana zako zinazotumika, zilizopangwa chini ya ufunguo wa kithibitishaji cha mwisho [finalizer] ambacho kila moja inaunga mkono, na dhamana ambazo zimemaliza kutoa sarafu na zinaweza kutolewa. Kila dhamana huonyesha kiasi kilichowekwa [staked] (`initial_val`), thamani yake sasa (`latest_val`), na muamala na urefu wa block vilivyoiumba. Tuzo huongezwa kwenye dhamana yenyewe: kufikia block 36,490 kila dhamana ya zatoshis 1,000,000 ilikuwa imekua hadi 1,003,451.

**Dirisha la Edit Stake huonyesha kila dhamana ikiwa kubwa mara kumi kupita kiasi.** Katika utekelezaji huu, kila dhamana ya cTAZ 0.01 ilisomeka cTAZ 0.100 kwenye mstari wake, na cTAZ 0.1003536 baada ya tuzo kuanza, ilhali jumla zilizo juu ya mistari (cTAZ 0.020, baadaye cTAZ 0.02007) zilikubaliana na RPC. Tegemea jumla na RPC.

Dirisha hilohilo liliweka pembetatu ya onyo kando ya kithibitishaji cha mwisho, kabla na baada ya uthibitisho wa mwisho kuanza. Katika msimbo chanzi, pembetatu hiyo inamaanisha programu yako hailihesabu kithibitishaji hicho cha mwisho kuwa mtandaoni, na lililo mtandaoni hupata ikoni ya Wi-Fi badala yake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Dhamana zilipata tuzo hata hivyo.

### Vithibitishaji vya mwisho

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Kulingana na maelezo ya toleo, hii huripoti mahali node yako ilipo katika mchakato wa kupiga kura na, kwa kila kithibitishaji cha mwisho, mara ya mwisho node yako ilisikia kutoka kwake na jinsi ambavyo imekuwa ikipiga kura.

Kabla ya block 36,288 kila sehemu ni sifuri na orodha haina kitu. Hili lilikuwa jibu katika block 33,354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Baada ya uthibitisho wa mwisho kuanza, orodha hushikilia vithibitishaji vya mwisho vilivyo kwenye orodha rasmi. Katika block 36,490 ilishikilia 12, ZecHub's `2941ef23...` miongoni mwazo, jambo linalolingana na kikomo cha orodha rasmi cha 12. Huu ni mwanzo wa jibu hilo, uliokatwa baada ya ingizo la kwanza:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Dakika chache baadaye paneli ya upande wa kulia ya programu ilionyesha “Vithibitishaji vya mwisho (23)”.

### Kuhusu Linux na macOS

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) hutoa mwito katika muundo wa `curl`. Badilisha jina la mbinu kwa miito mingine. Muundo huu haukutekelezwa kwa mwongozo huu:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Kwenye Linux, maelezo ya toleo yanasema huenda ukahitaji `xclip` kusakinishwa kabla ya kunakili na kubandika kufanya kazi kwenye programu.

### Jina moja la RPC la kuangalia

Maelezo ya toleo la 14 yanaeleza mwito wa kuweka sarafu unaoitwa `wallet_staking_action` unaochukua kitu. Msimbo chanzi wa toleo la 14 hauna mbinu ya jina hilo, na katika utekelezaji huu node ilijibu:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Mbinu ya kuweka sarafu inayosajili ni [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), ambayo huchukua mfuatano mmoja unaoshikilia ombi kama JSON, huku kithibitishaji cha mwisho kikitolewa kwa utambulisho wake wa `zfinv1` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Haikujaribiwa kwa mwongozo huu.

## Toa sarafu na utoe

Dhamana haiwezi kubatilishwa siku ambayo inafanywa. Huchukua Siku tatu za Kuweka Sarafu [Staking Days] kutoka mwanzo hadi mwisho: weka sarafu katika moja, toa sarafu katika nyingine ya baadaye, na utoe katika ya tatu. Maelezo ya toleo yanaongeza kwamba dhamana moja haiwezi kuchukua hatua mbili za kuweka sarafu katika Siku moja ya Kuweka Sarafu.

*Haikutekelezwa kwa mwongozo huu. Kutoka maelezo ya toleo la 14:* ili kutoa sarafu, bonyeza **Edit Stake**, chagua dhamana kutoka orodha ya Staked Bonds na ubofye ikoni ya kiungo cha mnyororo. Ili kutoa katika Siku ya Kuweka Sarafu ya baadaye, bonyeza **Edit Stake**, chagua dhamana kutoka orodha ya Withdrawable Bonds na ubofye ikoni ya pesa. Kuhamisha dhamana hadi kithibitishaji tofauti cha mwisho, ambako maelezo yanaita retargeting, kunaruhusiwa wakati wowote.

## Mahali pa kufuatilia mtandao

Kichupo cha [Crosslink kwenye ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) hukusanya vifaa [tools] mahali pamoja, chini ya taarifa inayosomeka “Kuweka sarafu kwenye mtandao huu hakuhamishi ZEC”:

- Vinavyopangishwa, bila node inayohitajika: [Staker Space](https://crosslink.staker.space/), “dashibodi [dashboard] ya moja kwa moja ya cTAZ testnet ya sasa” yenye urefu, wachimbaji [miners], kiwango cha suluhisho, hesabu ya kurudi nyuma ya Siku ya Kuweka Sarafu na uthibitisho wa mwisho, na [ctaz.cash](https://ctaz.cash/), yenye uzalishaji wa uchimbaji [mining], orodha rasmi ya vithibitishaji vya mwisho, rika na madai ya majina ya anwani za kuweka sarafu.
- Kwenye mashine yako mwenyewe: `zcash-explorer`, ambayo ukurasa wake wa `/live/crosslink` huonyesha uanzishaji, ucheleweshaji wa uthibitisho wa mwisho, orodha rasmi na nafasi za kuweka sarafu, na `crosslink_indexer`, faharasa ya SQLite ya node ya Crosslink.

## Makosa ya kawaida

**Kupanga kwa kutegemea saa badala ya urefu wa block.** Siku za Kuweka Sarafu huhesabiwa kwa block. Angalia hesabu ya kurudi nyuma ya dashibodi, wala si kalenda.

**Kuweka sarafu katika dakika za mwisho za dirisha.** Kanuni hukaguliwa dhidi ya block inayojumuisha muamala wako ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), kwa hivyo sarafu lazima ichimbwe kabla ya dirisha kufungwa, si kutumwa tu.

**Kutarajia kuchimba dhamana yako.** Mchimbaji wa CPU mwenye nyuzi nne kwenye Intel Core i5-8350U hakupata block kati ya 8 na 9 Oktoba. Pata cTAZ yako ya kwanza kutoka chanzo cha sarafu za bure [faucet] au kutoka kwa mshiriki mwingine.

**Kubofya tena kwa sababu hakuna kilichoonekana kutokea.** Kila mbofyo kwenye kiasi ni dhamana mpya. Angalia historia ya pochi [wallet] au `wallet_staking_positions` kwanza.

**Kuogopa baada ya kuwasha upya.** Salio lako na sarafu ulizoweka zitasomeka sifuri hadi pochi itakapokuwa imechanganua upya. Subiri Wallet Sync ikamilike.

**Kuchukulia cTAZ kuwa pesa za mchezo, au siri kuwa isiyo na madhara.** cTAZ ni sarafu ya majaribio, lakini cTAZ unayopata huamua sehemu yako ya ZEC halisi. Linda `secret.seed` kama ambavyo ungelinda pochi.

**Kusoma maelekezo ya zamani.** Maelezo ya toleo hubeba maandishi kutoka misimu ya awali pamoja na sheria mpya. Pale yanapotofautiana na kile ambacho node yako hufanya, node yako iko sahihi.

## Kurasa zinazohusiana

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - muundo ambao mtandao huu hujaribu
- [Shielded Labs](/zcash-organizations/shielded-labs) - timu iliyo nyuma ya Crosslink
- [Kuthibitisha Matoleo ya Zcash](/guides/verifying-zcash-releases) - kile ambacho checksum huthibitisha na kisichothibitisha
- [Zebra Full Node](/zcash-tech/zebra-full-node) - node ambayo programu ya Feature Net imejengwa juu yake
- [Zcash Testnet](/using-zcash/testnet) - mtandao wa kawaida wa majaribio wa Zcash, ambao ni mtandao tofauti

## Vyanzo

- [Maelezo ya toleo la 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Oktoba 2026
- [Crosslink: Feature Nets zenye motisha](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Aprili 2026
- [Crosslink: Feature Net yenye motisha](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Jukwaa la Jamii la Zcash
- [Crosslink Maswali Yanayoulizwa Mara kwa Mara](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Kitabu cha Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Hatua kwenye ukurasa huu zilitekelezwa kwa Feature Net toleo la 14 kwenye Windows 11 (toleo la 10.0.26200.9550), kuanzia 8 hadi 10 Oktoba 2026. Kauli inayorejelea maelezo ya toleo au msimbo chanzi imechukuliwa kutoka humo. Kitu chochote kilichowekwa alama “hakikutekelezwa” hakikujaribiwa.*
