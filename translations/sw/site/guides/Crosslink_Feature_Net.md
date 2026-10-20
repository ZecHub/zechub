<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jiunge na Crosslink Feature Net

## TL;DR

- Feature Net ni mtandao wa majaribio wa umma Shielded Labs' kwa [Crosslink](/zcash-tech/crosslink-protocol), safu ya mwisho iliyopendekezwa ambayo inaongeza uimara karibu na uthibitisho wa kazi Zcash's.
- Inaendeshwa kwenye sarafu ya majaribio, cTAZ. Hakuna unachofanya juu yake kinachosogeza au kuhatarisha ZEC.
- Programu moja ya kompyuta ya mezani ni nodi, mchimbaji, pochi na kimaliziaji. Inachimba cTAZ kwa chaguo-msingi na ina kitufe cha kugonga.
- Kuweka dau, kufungua na kutoa pesa hufanya kazi tu wakati wa "Siku ya Kuweka dau", siku moja katika kila tatu. Unaikosa na unasubiri inayofuata.
- Ili kuweka dau, unabandika utambulisho wa mkamilishaji na kubofya kiasi. Mwongozo huu unatumia mkamilishaji ZecHub's kama mfano.
- Simu mbili za RPC zinaonyesha msimamo wako: `wallet_staking_positions` na `get_tfl_recency_status`.

*Imejaribiwa na toleo la 14 Feature Net kwenye Windows 11 (toleo la 10.0.26200.9550), kuanzia tarehe 8 hadi 10 Oktoba 2026. Programu hii ni mfano na hubadilika kila inapotolewa. Ikiwa unachokiona kinatofautiana na ukurasa huu, amini utendakazi wako mwenyewe na tafadhali fungua PR.*

## Feature Net ni nini

Crosslink ni pendekezo, si sehemu ya Zcash Shielded Labs' [Maswali Crosslink](https://shieldedlabs.net/crosslink-faq/) inasema "itahitaji kupitia mchakato wa kawaida wa utawala Zcash " kabla ya kufikia mainnet [Itifaki ya Crosslink](/zcash-tech/crosslink-protocol) Ukurasa unaelezea muundo.

Ili kujaribu muundo huu kwa watumiaji halisi, Shielded Labs huendesha kile inachokiita [nyavu za vipengele vilivyochochewa](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "mfululizo wa mitandao ya majaribio yenye motisha". Kuna majukumu matatu kwenye mtandao, na programu ya kompyuta ya mezani inaweza kuyacheza yote:

| Jukumu | Inafanya nini |
|---|---|
| Mchimbaji | Hutengeneza vizuizi vya uthibitisho wa kazi, kama ilivyo kwenye Zcash leo |
| Staker | Anafunga cTAZ katika dhamana ya ugawaji na kuielekeza kwenye fainali |
| Kimaliziaji | Kura za kukamilisha vikwazo. Nguvu yake ya kupiga kura ni dau lililokabidhiwa kwake |

Hifadhi iliyo nyuma yake inaanza na kanusho linalofaa kusomwa kabla ya kusakinisha chochote: "ipo ili kuthibitisha mawazo, si kuonyesha uhandisi wa uzalishaji" na "si msimbo ulio tayari kwa uzalishaji" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Iendeshe kwenye mashine ambapo inakubalika.

### Ni toleo gani la 14 lililobadilika

[Toleo la 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) ilizinduliwa tarehe 1 Oktoba 2026. Mtandao wake unaanza kama uthibitisho wa kazi na unawasha Crosslink katika hatua tatu ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), pia imeonyeshwa kwenye [ctaz.cash](https://ctaz.cash/v14)):

| Kizuizi | Kinachotokea |
|---|---|
| 20,736 | Kizibo cha kuwekea kinaanza |
| 34,560 | Orodha ya kwanza ya watakaokamilisha inachukuliwa kutoka kwa dau kwenye mnyororo |
| 36,288 | Mwisho wa BFT unaanza, na zawadi zake zinapatikana |

Zawadi za kuweka dau huanza mwishoni mwa vitalu hivyo. Dhamana iliyotengenezwa mapema haipati chochote hadi wakati huo ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Toleo hilohilo lilipunguza orodha ya wachezaji wanaofanya kazi hadi 12 waliokamilisha fainali wenye dau nyingi zaidi ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) na, kwa maneno ya maelezo yake ya kutolewa, iliwapa kamisheni: "10% ya Zawadi zote za PoS katika block moja huenda kwa kamisheni hizi, huku 90% ikisambazwa kwa dhamana zote za kuweka."

### cTAZ na ZEC halisi

cTAZ ("Crosslink TAZ") ni sarafu ya majaribio Feature Net's. Unaweka dau kwenye cTAZ, kamwe si ZEC.

ZEC halisi huingia mwishoni tu. Shielded Labs ina [kutenga ZEC 500](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) kwa ajili ya nyavu za vipengele, na [maelezo ya kutolewa](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) wanasema inalipwa "kwa msingi wa prorata kulingana na kiasi cha cTAZ ambacho kila mshiriki alipata kupitia uchimbaji au uwekaji wa hisa". Matokeo mawili:

- **Sarafu za bomba hazihesabiki.** cTAZ uliyopewa, kwa bomba au na mtu mwingine yeyote, haipati chochote kwa kukaa kwenye pochi yako. Zuia tu zawadi kutoka kwa uchimbaji na hesabu ya amana.
- **Malipo yanadaiwa, si ya kiotomatiki.** Shielded Labs hutangaza kila raundi katika [uzi wa jukwaa](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)Kwa Raundi ya 2 iliwaomba washiriki kutuma ufunguo wa kutazama wa pochi yao na anwani ya mtandao mkuu ifikapo tarehe 4 Oktoba 2026 ([chapisho la 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)Mtandao ambao toleo la 14 linatumika, ule ambao mwongozo huu unajiunga nao, ulitangazwa kuwa Raundi ya 3 ([chapisho la 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Kabla ya kuanza

- **Kompyuta unayoweza kuacha ikifanya kazi.** Toleo hili lina vifaa vya Windows, macOS, Ubuntu na Arch Linux. Mwongozo huu uliendeshwa kwenye Windows, kwenye PC yenye kichakataji cha Intel Core i5-8350U.
- **Siku ya Kusubiri.** Angalia siku inayofuata itafunguliwa lini kabla ya kupanga chochote. [Dashibodi ya Staker Space](https://crosslink.staker.space/) inahesabiwa.
- **Hakuna kingine.** Hakuna ZEC, hakuna akaunti na hakuna usajili.

## Hatua ya 1: Pakua programu na uangalie faili

1. Fungua [toleo la 14 la kutolewa](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) na usogeze hadi **Vipengee**.
2. Pakua faili ya mfumo wako. Kwenye Windows ambayo ni `zebrad_v14_win32.exe`.
3. Linganisha SHA-256 ya faili na maonyesho GitHub yaliyofichwa kando ya kipengee hicho.

Kwenye Windows, katika PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest GitHub inaonyesha faili hiyo ni `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`Hex haina herufi kubwa, kwa hivyo herufi kubwa hapo juu ni sawa. Ili kuruhusu ganda lilinganishwe badala ya macho yako:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Jua thamani ya ukaguzi huu. Toleo halina sahihi, kwa hivyo hash inayolingana inakuambia kuwa upakuaji umekamilika na ni faili ambayo GitHub inahudumia. Haikuambie ni nani aliyeijenga. [Kuthibitisha Matoleo Zcash](/guides/verifying-zcash-releases) anaelezea tofauti.

## Hatua ya 2: Anzisha nodi na uiruhusu isawazishe

Anzisha programu kutoka kwa terminal, ili ujumbe wake wa kuanzisha ubaki kwenye skrini. Tumia dirisha la kawaida PowerShell, ambalo halijafunguliwa na "Run as administrator": hii ni programu ya mfano ambayo haijasainiwa, na haihitaji haki za msimamizi.

```powershell
.\zebrad_v14_win32.exe
```

Dirisha lenye kichwa "Zcash Crosslink Visualizer" linafunguka. Pochi iko upande wa kushoto, ikiwa na vichupo vya **Pochi yako** na **Pochi ya Bomba**, mnyororo umechorwa katikati, na vimaliziaji vimeorodheshwa upande wa kulia. Kituo kinaendelea kuchapisha kumbukumbu ya nodi. Acha zote mbili zikiwa wazi unapotumia mtandao.

Maelezo ya kutolewa yanaunganisha [video ya usakinishaji wa Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Programu huweka data yake kwenye folda ya akiba: `%LOCALAPPDATA%\zebra` kwenye Windows, `~/.cache/zebra` kwenye Linux na `~/Library/Caches/zebra` kwenye macOS, kulingana na maelezo ya kutolewa.

**Weka siri hiyo kwako.** Folda hiyo ina faili inayoitwa `secret.seed`Programu huiunda mwanzoni mwa kwanza ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) na hupata pochi yako na utambulisho wako wa mwisho kutoka kwayo ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Programu pia ina kitufe cha **Nakili Mbegu** kinachoweka siri hiyo hiyo kwenye ubao wako wa kunakili. Yeyote aliye na mojawapo ya hizo atadhibiti pochi yako. Kamwe usiibandike kwenye gumzo, chapisho la jukwaa au picha ya skrini.

### Jinsi ya kujua kama umesawazishwa

Maelezo ya kutolewa yanasema hakuna "ufuatiliaji uliojengewa ndani kuhusu jinsi unavyosawazishwa kwa karibu na ncha ya mtandao". Toleo la 14 lina baadhi: menyu kunjuzi ya **Info ya Mtandao** juu ya dirisha ina safu mlalo za Urefu wa PoW, Usawazishaji wa Wallet na Vizuizi Nyuma ya PoW Inayojulikana ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)Linganisha urefu wako na ule ulio juu [Nafasi ya Staker](https://crosslink.staker.space/) or [ctaz.cash](https://ctaz.cash/).

Nodi pia hujibu juu ya RPC:

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

Lango la RPC `127.0.0.1:8232` imefunguliwa kwa chaguo-msingi katika muundo huu na haihitaji nenosiri ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)Inasikiliza kwenye mashine yako pekee, na chochote kinachofanya kazi kwenye mashine hiyo kinaweza kuiita.

Katika kipindi hiki, ulandanishi wa kwanza, kutoka kizuizi 0 hadi ncha kwenye kizuizi 28,400, ulichukua takriban dakika 50.

**Baada ya kuanza upya salio lako husoma sifuri kwa muda.** Kila wakati programu inapoanza, hujenga upya pochi kutoka `secret.seed` na kuchanganua mnyororo tena kutoka kwenye kizuizi 0 ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)Hadi uchanganuzi utakapofikia miamala yako, salio lako na dau lako huonekana kama 0. Katika kipindi hiki, walirudi takriban dakika 15 baada ya kuanza upya. Pochi ya bomba huchanganuliwa tena kwa njia ile ile ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), na wakati wa uchanganuzi kichupo cha Pochi ya Faucet kilionyesha salio kubwa sana. Puuza zote mbili hadi Usawazishaji wa Pochi ukamilike.

## Hatua ya 3: Pata cTAZ

### Nichague

Kulingana na maelezo ya kutolewa, programu huanza kuchimba CPU kwenye pochi yako mwenyewe mara tu inaposawazishwa. Huna haja ya kuwasha chochote. Sarafu zilizochimbwa huenda kwenye anwani ya uwazi ya pochi yako mwenyewe ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Kama itapata kizuizi ni jambo lingine. Maelezo yanaonya kwamba "huenda ukashindwa na wengine kuchimba haraka zaidi, kwa hivyo hakuna uhakika wa kufanikiwa". Kwa chaguo-msingi, mchimbaji aliyejengewa ndani hutumia uzi mmoja wa CPU ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Ili kutumia nyuzi zaidi, weka kigezo cha mazingira katika dirisha lile lile PowerShell kabla ya kuanza programu ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Kipindi hiki kilitumia nne:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Kigezo hudumu kwa muda wa dirisha hilo pekee. Kikiwa kimewekwa, kaunta ya kichakataji Windows' ilionyesha nodi hiyo kwa kutumia muda wa vichakataji wanne hadi watano, kwa asilimia ya kichakataji kimoja cha kimantiki:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Matokeo: uchimbaji wa Intel Core i5-8350U kwenye nyuzi nne, kuanzia mapema tarehe 8 Oktoba hadi alasiri ya tarehe 9 Oktoba, haukupata kizuizi chochote.

### Au tumia bomba

Programu ina kitufe cha **Pokea cTAZ** chini kulia. Katika chanzo cha toleo la 14, kubonyeza mara moja hutuma cTAZ 0.5 kutoka kwenye pochi ya bomba hadi yako ([kiasi](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [tuma](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Bomba ni pochi moja ambayo kila nakala ya programu hubeba ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), na kichupo cha **Pochi ya Bomba** kinaonyesha salio lake.

Kitufe huzimwa isipokuwa bomba lina sarafu zilizolindwa zenye zaidi ya 5.01 cTAZ ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Kichupo huhesabu sarafu zilizochimbwa kwenye bomba pia, na hizo hulindwa kwa cTAZ 10 pekee pamoja na ada ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), ili kichupo kiweze kuonyesha mengi huku kitufe kikibaki kijivu. Katika kipindi hiki kiliendelea kuwa kijivu mnamo tarehe 8 na 9 Oktoba, huku "Bomba linachimba fedha zaidi." kilipoelea, huku kichupo kikionyesha 14.74695 cTAZ.

**Kitufe kinapokuwa kijivu, uliza nodi yako mwenyewe.** Nodi ina njia ya kuomba bomba, `requestfaucetdonation` ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), ambayo haitumiki sheria ya kitufe cha 5.01 cTAZ. Weka anwani yako mwenyewe badala ya `YOUR_ADDRESS` (ni `address` uwanja wa `wallet_spendable_funds`, chini):

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

Jibu hilo linamaanisha ombi lilikuwa limepangwa, si kwamba lilitumwa. Katika kipindi hiki, 0.5 cTAZ ya bomba ilichimbwa kwenye kitalu namba 33,306 na ilitumika kwenye kitalu namba 33,322. Uliza mara moja: bomba linashirikiwa, na ombi la pili la anwani hiyo hiyo linakataliwa wakati ya kwanza inasubiriwa ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Au muulize mshiriki mwingine

Mtu yeyote kwenye mtandao anaweza kukutumia cTAZ kwa kutumia kitufe cha **Tuma** cha programu. Katika kipindi hiki, mshiriki mwingine alituma cTAZ 31. Ilifika kama "Imepokelewa" ikiwa na ujumbe "tuma kutoka kwa mkoba wa mtumiaji", ambao ni ujumbe ambao programu yenyewe inaambatisha ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Uliza katika [uzi wa jukwaa](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), na toa anwani yako pekee.

Sarafu za mfereji na zawadi zinatosha kujifunza kuweka akiba. Hazihesabiwi kwenye zawadi za ZEC.

### Angalia unachoweza kutumia

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Hili lilikuwa jibu mara tu 0.5 cTAZ ya bomba ilipofika, huku anwani ikiwa imefupishwa:

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

Kiasi kiko katika zatoshis: 100,000,000 hutengeneza cTAZ moja. Sarafu zilizolindwa zinahitaji uthibitisho 3 kabla hazijahesabiwa kama zinazoweza kutumika ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)Sarafu kutoka kwenye bomba na kutoka kwa washiriki wengine zinatua ndani `spendable_zats`Sarafu zilizochimbwa zina uwazi, kwa hivyo zinatua ndani `unshielded_zats` ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Kizuizi kimoja baada ya dau la pili kwenye mbio hizi, salio lililobaki lilionekana chini ya `pending_zats`Vitalu vichache baadaye iliwezekana tena kutumika.

## Hatua ya 4: Weka dau kwa mkamilishaji

### Subiri Siku ya Kusubiri

Kuweka, kufungua na kutoa hukubaliwa tu wakati

```text
block height mod 10,368 < 3,456
```

ambayo ni dirisha la vitalu 3,456 mwanzoni mwa kila 10,368. Katika lengo la vitalu vya sekunde 25 la mtandao huo, hiyo ni siku moja katika kila tatu ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)Madirisha ya kwanza ya toleo la 14 yanafunguliwa katika vitalu 20,736, 31,104, 41,472 na 51,840.

Kulingana na maelezo ya kutolewa, programu inatangaza mwanzo na mwisho wa kila Siku ya Kuweka. Katika kipindi hiki orodha yake ya vizuizi ilionyesha mstari mwekundu wa "* STAKING DAY END *" kati ya vizuizi 34,559 na 34,560.

**Maelezo ya kutolewa yanasema mambo mawili.** Orodha yao ya mabadiliko inatoa "~siku 1 kwa Siku ya Kuweka na ~siku 3 kwa Mzunguko wa Kuweka", ambayo inalingana na msimbo. Zaidi ya hayo, sehemu iliyopitishwa kutoka Msimu wa 1 bado inasema Siku ya Kuweka huanza kila baada ya vitalu 150 na hudumu 70. Endelea na ya kwanza. Mstari wa mwisho hapo juu upo ambapo sheria ya kwanza inafunga dirisha (34,560 mod 10,368 = 3,456); chini ya sheria ya pili kizuizi 34,560 kingeangukia ndani ya dirisha.

### Chagua kimalizia

Kifaa cha kumalizia hupewa jina kwa utambulisho wake, mfuatano unaoanza na `zfinv1`ZecHub huchapisha utambulisho wa kimaliziaji kinachoendesha [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Nakili utambulisho kutoka kwa chanzo unachokiamini. Kulingana na maelezo ya kutolewa, programu pia inaorodhesha wakamilishaji katika paneli yake ya kulia, huku aikoni ya kunakili ikiwa kushoto kwa kila moja.

Baada ya kuweka dau, historia ya pochi na RPC huitaja kimaliziaji kwa kutumia ufunguo wa heksaidi badala ya utambulisho wake. Kwa kimaliziaji ZecHub's ufunguo huo ni `2941ef23...266aae8f`.

Chagua kimalizia unachokiamini. Muundo hauna ukata otomatiki, lakini unaruhusu "uma mgumu unaoratibiwa na mtumiaji ambao huchoma hisa zote zilizokabidhiwa kwa kimalizia kilichopewa jina" ([Kitabu cha Crosslink, muhtasari wa muundo](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Chaguo pia huamua ni nani anayepiga kura. Kila dhamana inayofanya kazi hupata sehemu yake ya zawadi ya dau. Ikiwa mshindi wake ni miongoni mwa 12 kwenye orodha, sehemu ya kumi ya hisa hiyo huenda kwa mshindi kama kamisheni. Dhamana inayoelekezwa kwa mshindi nje ya 12 huhifadhi sehemu yake yote, lakini mshindi huyo hapigi kura ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Dau

1. Nakili utambulisho wa kimaliziaji.
2. Kwenye kichupo cha **Pochi Yako**, bonyeza **Dalali**.
3. Bonyeza **Bandika Utambulisho**. Mstari ulio juu ya kitufe hubadilika hadi herufi ya kwanza na ya mwisho ya utambulisho, `[zfinv1j6..YWyzp4YN]` kwa ZecHub's. Iangalie kabla ya kuendelea.
4. Bonyeza kiasi. Kiasi huja katika hatua zisizobadilika, ndogo zaidi ni 0.01 cTAZ, na ni kiasi gani salio lako linafunikwa ndicho pekee kinachowashwa. Kwa 0.5 cTAZ, +0.01 cTAZ na +0.1 cTAZ zilikuwa.

**Hakuna kinachokuomba uthibitishe, na hakuna kinachoonekana kutokea.** Katika jaribio hili, kwa maneno ya mjaribu: "Niliibofya mara moja na hakuna kilichotokea, iligeuka kijivu na kuwaka tena." Dau lilikuwa limepita. Historia ya pochi ilionyesha "Imepigwa @ 33334 hadi 2941ef23..266aae8f", ada ilikuwa 0.00015 cTAZ, na pochi ilionyesha 0.010 cTAZ Imepigwa. Dau la pili dakika chache baadaye lilitengeneza dhamana ya pili, katika kitalu namba 33,348.

Kila hisa huunda dhamana yake ya ugawaji. Kiasi kilichowekwa na Siku ya Uwekaji Dau vyote vipo kwa ajili ya faragha: hufanya iwe vigumu kutofautisha hisa ya mtu mmoja na ya mwingine.

## Hatua ya 5: Angalia msimamo wako

### Vifungo vyako

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Hili lilikuwa jibu katika kitalu namba 36,490, siku mbili baada ya kuwekewa dau:

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

Simu haichukui vigezo. Inarudisha vifungo vyako vinavyofanya kazi, vilivyowekwa chini ya ufunguo wa kimaliziaji kila kimoja kikirudi nyuma, na vifungo ambavyo vimemaliza kufungua na vinaweza kutolewa. Kila kifungo kinaonyesha kiasi kilichowekwa kwenye dau (`initial_val`), thamani yake sasa (`latest_val`), na muamala na urefu wa kitalu uliouunda. Zawadi huongezwa kwenye dhamana yenyewe: kwa kitalu 36,490 kila dhamana ya zatoshi 1,000,000 ilikuwa imekua hadi 1,003,451.

**Dirisha la Kubadilisha Kigingi linaonyesha kila bondi kubwa mara kumi kupita kiasi.** Katika jaribio hili, kila bondi ya 0.01 cTAZ ilisoma 0.100 cTAZ kwenye safu yake, na 0.1003536 cTAZ mara tu zawadi zilipoanza, huku jumla zilizo juu ya safu (0.020 cTAZ, baadaye 0.02007 cTAZ) zikikubaliana na RPC. Pitia jumla na RPC.

Dirisha hilo hilo liliweka pembetatu ya onyo karibu na kimalizia, kabla na baada ya kuanza kwa mwisho. Katika chanzo, pembetatu hiyo inamaanisha programu yako haihesabii kimalizia hicho kama mtandaoni, na cha mtandaoni kinapata aikoni ya Wi-Fi badala yake ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)Dhamana zilipata zawadi hata hivyo.

### Waamuzi wa mwisho

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Kulingana na maelezo ya kutolewa, hii inaripoti mahali ambapo nodi yako iko katika mchakato wa kupiga kura na, kwa kila mkamilishaji, nodi yako ilisikia mara ya mwisho kutoka kwake na jinsi imekuwa ikipiga kura.

Kabla ya kitalu 36,288 kila sehemu ni sifuri na orodha ni tupu. Hili lilikuwa jibu katika kitalu 33,354:

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

Baada ya fainali kuanza, orodha inashikilia wahitimu kwenye orodha. Katika kizuizi cha 36,490 ilishikilia nafasi 12, ZecHub's `2941ef23...` miongoni mwao, ambayo inalingana na kikomo cha orodha cha 12. Huu ndio mwanzo wa jibu hilo, lililokatwa baada ya ingizo la kwanza:

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

Dakika chache baadaye paneli ya kulia ya programu ilionyesha "Vifaa vya Kumalizia (23)".

### Kwenye Linux na macOS

Ya [chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) anatoa simu ndani `curl` fomu. Badilisha jina la mbinu kwa simu zingine. Fomu hii haikuendeshwa kwa mwongozo huu:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Kwenye Linux, maelezo ya kutolewa yanasema labda unahitaji `xclip` imewekwa kabla ya kunakili na kubandika kazi katika programu.

### Jina moja la RPC la kutazama

Maelezo ya toleo la 14 yanaelezea wito wa kusubiri uliopewa jina `wallet_staking_action` ambayo inachukua kitu. Msimbo chanzo wa toleo la 14 hauna njia ya jina hilo, na katika kipindi hiki nodi ilijibu:

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

Mbinu ya kuweka dau inayosajiliwa ni [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), ambayo inachukua mfuatano mmoja unaoshikilia ombi kama JSON, huku kimaliziaji kikitolewa na `zfinv1` utambulisho ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)Haikujaribu kwa mwongozo huu.

## Ondoa na utoe dau

Dhamana haiwezi kutenguliwa siku ambayo imetengenezwa. Inachukua Siku tatu za Kuweka Dhamana kuanzia mwanzo hadi mwisho: kuweka dau katika moja, kuondoa dau katika nyingine ya baadaye, kutoa dau katika theluthi. Maelezo ya kutolewa yanaongeza kuwa dhamana moja haiwezi kuchukua hatua mbili za kuweka dau katika Siku hiyo hiyo ya Kuweka Dhamana.

*Haitumiki kwa mwongozo huu. Kutoka kwa maelezo ya toleo la 14:* ili kuondoa dau, bonyeza **Hariri Dau**, chagua dhamana kutoka kwenye orodha ya Dhamana Zilizowekwa na ubofye aikoni ya kiungo cha mnyororo. Ili kutoa dau katika Siku ya Kuweka Dau baadaye, bonyeza **Hariri Dau**, chagua dhamana kutoka kwenye orodha ya Dhamana Zinazoweza Kutolewa na ubofye aikoni ya pesa. Kuhamisha dhamana hadi kwenye kimaliziaji tofauti, ambacho noti hukiita kulenga upya, kinaruhusiwa wakati wowote.

## Mahali pa kutazama mtandao

Ya [Kichupo cha Crosslink kwenye Zana za ZecHub](https://zechub.wiki/tools?tool=crosslink) hukusanya vifaa hivyo mahali pamoja, chini ya taarifa inayosomeka "Kuweka kwenye mtandao huu hakuhamishi ZEC":

- Imepangishwa, bila nodi inayohitajika: [Nafasi ya Staker](https://crosslink.staker.space/), "dashibodi ya moja kwa moja ya mtandao wa majaribio wa cTAZ wa sasa" yenye urefu, wachimbaji, kiwango cha suluhisho, kuhesabu na mwisho wa Siku ya Kuweka, na [ctaz.cash](https://ctaz.cash/), pamoja na uzalishaji wa madini, orodha ya wakamilishaji, wenzao na madai ya jina la anwani ya hisa.
- Kwenye mashine yako mwenyewe: `zcash-explorer`, ambaye `/live/crosslink` Ukurasa unaonyesha uanzishaji, kuchelewa kwa mwisho, orodha ya wagombea na nafasi za kusimama, na `crosslink_indexer`, faharasa ya SQLite ya nodi Crosslink.

## Makosa ya kawaida

**Kupanga saa nzima badala ya urefu wa vitalu.** Siku za Kuweka huhesabiwa katika vitalu. Tazama kuhesabu chini ya dashibodi, si kalenda.

**Kuweka akiba katika dakika za mwisho za dirisha.** Sheria imeangaliwa dhidi ya kizuizi kinachojumuisha muamala wako ([chanzo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), kwa hivyo dau lazima lichimbwe kabla dirisha halijafungwa, si tu kutumwa.

**Natarajia kuchimba hisa yako.** Mchimbaji wa CPU mwenye nyuzi nne kwenye Intel Core i5-8350U hakupata kizuizi kati ya tarehe 8 na 9 Oktoba. Pata cTAZ yako ya kwanza kutoka kwenye bomba au kutoka kwa mshiriki mwingine.

**Kubofya tena kwa sababu hakuna kilichoonekana kutokea.** Kila kubofya kiasi ni dhamana mpya. Angalia historia ya pochi au `wallet_staking_positions` kwanza.

**Kuwa na wasiwasi baada ya kuanza upya.** Salio lako na dau lako husoma sifuri hadi pochi itakapochanganuliwa tena. Subiri Usawazishaji wa Pochi ukamilike.

**Kuichukulia cTAZ kama pesa ya mchezo, au siri kama isiyo na madhara.** cTAZ ni sarafu ya majaribio, lakini cTAZ unayopata huamua sehemu yako ya ZEC `secret.seed` kama vile ungefanya kwenye pochi.

**Kusoma maagizo ya zamani.** Maelezo ya kutolewa yana maandishi kutoka misimu ya awali karibu na sheria mpya. Pale ambapo hayakubaliani na kile ambacho nodi yako inafanya, nodi yako iko sahihi.

## Kurasa zinazohusiana

- [Itifaki ya Crosslink](/zcash-tech/crosslink-protocol) - muundo ambao mtandao huu unajaribu
- [Shielded Labs](/zcash-organizations/shielded-labs) - timu iliyo nyuma ya Crosslink
- [Kuthibitisha Matoleo Zcash](/guides/verifying-zcash-releases) - kile ambacho checksum hufanya na kile ambacho haithibitishi
- [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) - nodi ambayo programu Feature Net imejengwa juu yake
- [Zcash Testnet](/using-zcash/testnet) - mtandao wa kawaida wa majaribio wa Zcash, ambao ni mtandao tofauti

## Vyanzo

- [Maelezo ya kutolewa ya Toleo la 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Oktoba 2026
- [Crosslink: Vipengele vya Chanzo Vilivyochochewa](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Aprili 2026
- [Crosslink: Feature Net Kilichochochewa](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Jukwaa la Jumuiya Zcash
- [Maswali Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Kitabu Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Hatua kwenye ukurasa huu ziliendeshwa na toleo la 14 la Feature Net kwenye Windows 11 (toleo la 10.0.26200.9550), kuanzia tarehe 8 hadi 10 Oktoba 2026. Taarifa inayotaja maelezo ya kutolewa au msimbo chanzo imechukuliwa kutoka kwao. Chochote kilichoandikwa "hakijaendeshwa" hakijajaribiwa.*
