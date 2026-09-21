<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Fund Ufufuzi

** Kwa nini uhifadhi vifaa vyako vya kupona?**

Mbegu, matumizi ya funguo, kuangalia funguo na faili mkoba si interchangeable. seed phrase inaweza kuzalisha mfuko wa fedha kwa ajili ya mifuko mingi, lakini haina kuchukua nafasi kila urithi muhimu au kifurushi cha mfuko. kuona ufunguo unaweza kufunua shughuli kulindwa lakini hawezi idhini kutumia.

Recovery depends on having the correct spending authority and a currently supported path for the pool that holds the funds. Keep recovery material private and never share seeds, spending keys, or wallet files with anyone you do not trust.

# Usalama na Wajibu wa Kufanya Kazi

Ni muhimu kwa watumiaji kuelewa hatari zinazohusika katika kushughulika na funguo za kibinafsi na kuweka hizi kufuli kulindwa kutokana na ufikiaji usioidhinishwa. usalama wa fedha inategemea wajibu mtumiaji ya kuhifadhi yao binafsi keys.

## Urithi wa kufungwa kwa fedha: Sprout, Sapling na Orchard

ZEC zamani za kulindwa zinaweza kuhitaji kuhamia kama sehemu ya kupona. Njia inategemea ambayo pool iliyohifadhiwa kwa sasa ina fedha hizo.

> **NU7 imepangwa Novemba 5, 2026.** Mara itakapotumika, njia ya sasa ya uhamiaji kutoka kwenye bwawa la zamani la Sprout itaacha kufanya kazi.
>
> Kama bado una ZEC katika bwawa Sprout, kuhamia kabla ya kuboresha. Baada ya uanzishaji, zana zilizopo tena kuwa na uwezo wa hoja fedha sprout kwa Sapling, anwani wazi, au marudio mengine yoyote.
>
> Kama wewe ni kuangalia ukurasa huu ** baada ya NU7** imeamilishwa, ** Sprout ni waliohifadhiwa katika barafu ** mpaka baadaye recovery mbinu inakuwa inapatikana, ambayo kwa sasa si iliyopangwa.

## Jibu la ukurasa mmoja tu

Fedha zako ziko katika njia ya uhamiaji nini cha kufanya.
| --- | --- | --- |
**Sprout**. **Sprut → Sapling → Ironwood*** Ikiwa una `wallet.dat` au kujitegemea Sprout matumizi muhimu, jaribu sasa Argos ahueni njia ya kwanza. Kama Argos si sahihi, kutumia urithi sidecar njia katika kamili shamba mwongozo. sprout lazima nchi kwa Sapling kwanza, kisha kuendelea na Ironwood. Njia hii ni wakati-nyeti kutokana na NU7".
** Sapling**. ** Saplin → Ironwood** Hakuna mazingira ya kupona Sprout inahitajika. Tumia mkoba wa sasa ambayo inaweza wote kufufua au kutumia akaunti yako maalum ya Sapling na kujenga shughuli za Ironwood. Msaada wa Ironwood peke yake hauonyeshi msaada wa urithi-Sapling recovery.
**Orchard**. **Orc → Ironwood** Orchard ni exit-tu. Tumia mfuko wa fedha sambamba sasa ya kujengwa katika orchard kwa chuma mtiririko uhamiaji. Angalia [Fedha zilizopatikana na Ironwood pool](#recovered-funds-and-the-ironwood-pool). |

### Tano-swali uamuzi mtiririko wa

1. ** Je, ni Sprout?** Maneno ya mbegu peke yake yanaonyesha njia ya baadaye ya urejesho wa Kipindi cha Sapling / Orchard-era, sio sprout. A `zc...` anwani, au mkoba kurejeshwa kuripoti usawa Sprout, pointi kwa sprout.
2. ** Nini vifaa ahueni una?** Angalia kwa ajili ya `wallet.dat`, kompyuta ya zamani au datadir, a `z_exportwallet` Backup, au kuhamishwa Sprout matumizi muhimu. A `zc...` anwani peke yake haitoshi.
3. ** Argos au urithi sidecar?** Kama una `wallet.dat` au kujitegemea Sprout matumizi muhimu na tu wanataka fedha nje, jaribu [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) Tumia urithi sidecar njia katika mwongozo uwanja kamili kama Argos hawezi kushughulikia nyenzo au ikiwa unataka full ahueni stack chini ya udhibiti wako mwenyewe.
4. ** Je, tayari una synchronized, unpruned zcashd datadir?** Hii ni muhimu tu kwa ajili ya urithi sidecar njia. Nakala zilizopo node data tu baada ya shutdown safi; vinginevyo mwongozo shamba inashughulikia snapshot / kutoka mwanzo chaguzi.
5. **Fedha hizo zinakwenda wapi?** **Ironwood.** Sprout hupitia Sapling kwanza kwa sababu hakuna shughuli moja ya moja kwa moja kutoka kwa Sprout hadi Ironwood. Usiache huko Sapling.

### Full ZEC Pool Uhamiaji Field Guide

Kwa ajili ya rejea kamili uhamiaji, ikiwa ni pamoja na njia za urejesho wa kina, amri, ada, mahitaji vifaa, masuala ya faragha, utatuzi wa matatizo, na vyanzo maelezo, kusoma mwongozo full.

** Toleo 1.1 · Updated Septemba 18, 2026**

[Soma kamili ZEC Pool Uhamiaji Field Guide katika ZecHub](/research/zec-pool-migration/view)

> ** Kabla ya kuanza:** kwanza kuanzisha ** nini wewe ni kufufua na kile vifaa ahueni bado una. sasa mkoba mbegu au mkono zisizo Sprout matumizi muhimu inaweza tu haja kawaida kurejesha. older material  such as a ZecWallet Lite seed, an legacy `wallet.dat`, au kujitegemea Sapling au Sprout matumizi muhimu  inaweza kuhitaji njia ya kufufua maalum.
>
> Kama unafikiri fedha ni katika ** Sprout, kuthibitisha kwamba bado wana mamlaka ya matumizi kabla ya kufanya muda wa kurejesha. A `zc...` anwani au viewing vifaa peke yake haitoshi kuhamisha fedha.
>
> ** YWallet tena inasaidia Zcash baada ya Ironwood. * Tumia **Zkool** kwa kawaida yasiyo ya Sprout hufufua kutoka mbegu mkono na funguo. Matumizi **Argos** kwa ZecWallet Lite ahueni, mafaili legacy mkoba, na kujitegemea Sapling / sprout matumizi muhimu. Kwa Sprout, Argos ni njia ya kwanza kujaribu; mwongozo kamili uwanja inashughulikia urithi sidecar fallback.
>
> Tumia meza ya chini kulingana na ** nini kweli una**, si chombo ahueni unakumbuka kutumia.

Una... Anza hapa.
| --- | --- |
◯ Kipengele cha mbegu au kinachoungwa mkono **non-Sprout matumizi ya ufunguo** kutoka kwa mkoba wa sasa au uliohifadhiwa hivi karibuni, ikiwa ni pamoja na vifaa vya zamani vya YWallet Zcash. [Zkool](#fund-recovery-with-zkool) |
A ** kuangalia muhimu tu** Zkool inaweza kuagiza mkono viewing funguo kwa ajili ya kusoma-tu upatikanaji, lakini kuona ufunguo hawezi idhini kufufua matumizi. Kupata mbegu au kutumia muhimu sambamba.
Mbegu ya maneno 24 **ZecWallet Lite**. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
A ZecWallet Lite au zcashd `wallet.dat`, au kujitegemea Sapling / Sprout matumizi muhimu. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)Kuanzia Septemba 18, 2026, v1.3.0 ni ya sasa na inapendekezwa; tumia v1.2.0 au baadaye kwa ajili ya: `wallet.dat` na kupona chachipukizi. "
◯ Kijiko cha vifaa ambavyo Argos haiwezi kushughulikia, au kupona ambapo unataka vipengele vya urithi chini ya udhibiti wako mwenyewe. Tumia njia za zamani katika sehemu yako ya kuendesha gari kwa kutumia mfumo wa ujenzi uliopo kwenye tovuti hii ili kupata huduma bora zaidi na yenye ufanisi zaidi wakati unapoendelea kutengeneza programu zako mpya. [mwongozo kamili uwanja](/research/zec-pool-migration/view). |
Hakuna mbegu kazi au kutumia ufunguo, lakini kifaa imefungwa, password wamesahau, au diski kushindwa. [Ufufuzi wa kitaalamu](#professional-recovery-when-you-do-not-have-the-seed). Kamwe kutuma mbegu kazi au matumizi muhimu kwa mtu ambaye kuwasiliana na wewe unsolicited. 

## Fedha Recovery na Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) ni kudumishwa Zcash mrithi wa YWallet kutoka kwa developer huo. Inasaidia uwazi na kisasa ulinzi kufufua njia, ikiwa ni pamoja na urithi Sapling funguo, lakini ** si Sprout**.

Hali mbili zimezungumziwa hapa:

1. **Kurejesha akaunti** kutoka kwa neno la mbegu, ufunguo wa kibinafsi au ufunguoo wa kutazama
2. ** Kufuta fedha** nje ya mkoba ambayo tu milele mkono anwani uwazi

### 1) Kurudisha Akaunti

1. Kufunga Zkool kutoka kwa [ukurasa releases](https://github.com/hhanh00/zkool2/releases) na kuifungua.
2. Katika ** Akaunti Meneja** (ukurasa kuu), bonyeza kitufe cha ** +** kufikia screen ya ** New Account**
3. Ingiza ** Jina la Akaunti** kutambua akaunti hii.
4. Kuwasha ** Rejesha Akaunti?** Hii inaonyesha muhimu na kuzaliwa urefu mashamba
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts seed phrases, Sapling secret keys, transparent extended keys, and supported viewing keys. A viewing key is read-only and cannot authorize a spend.
6. Kuingia ** Urefu wa kuzaliwa** kwa akaunti ya zamani. Zkool haina scan vitalu kabla urefu huu, hivyo kuchagua urefu mapema kuliko shughuli mkoba kwanza kama huna uhakika. uwekezaji mrefu mno baadaye inaweza kufanya halisi manunuzi wanaonekana kuwa kukosa.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Hifadhi akaunti, kisha uisawazishe

### Kurudisha mbegu kutoka mkoba tofauti

Kama mbegu alikuja kutoka mkoba kwamba ifuatavyo ZIP 316  ikiwa ni pamoja na ZODL (zamani Zashi), Zingo, au zcashd  kugeuka juu ya ** chaguzi Advanced** na kuwezesha ** Matumizi ndani Mabadiliko ** kabla ya kuhifadhi.

ZIP 316 inatumia tofauti ya ndani / mabadiliko anwani. kurejesha moja ya akaunti hizi bila ** Matumizi Ndani Mabadiliko** inaweza kufanya mabadiliko matokeo kuonekana kuwa kukosa hata kama fedha bado zipo.

Mashamba mengine mawili kuishi chini ya ** Advanced Options**:

- **Extra Passphrase (hiari)**, tu kama mkoba wa awali kutumika moja
- **Index Akaunti**, kama mkoba awali uliofanyika akaunti kadhaa juu ya mbegu moja. fedha inaweza kuwa chini ya index tofauti

> ** Hizi mbili tu kuonekana wakati halali mbegu maneno ni katika uwanja muhimu.** Na shamba tupu, au kushikilia binafsi au kuangalia ufunguo, Zkool inaonyesha tu ** Matumizi ya ndani Mabadiliko** na ** H / W Ledger **. Pasta mbegu kwanza, kisha kufungua chaguzi za juu.

### 2) Kufuta Fedha kutoka kwa Mkoba wa Uwazi tu

Kama mkoba wa zamani au akaunti uliofanyika ** uwazi ZEC tu, kurejesha akaunti ya kwanza, kupata kila kutumika wazi anwani, kisha kuhamisha fedha kwa sasa kulindwa marudio kudhibiti. Usitegemee brand kale mfuko mara zote ni uwazi-tu; baadhi ya bidhaa aliongeza msaada ulinzi katika matoleo baadaye.

1. Rejesha akaunti kwa kutumia hatua zilizo juu
2. Fungua akaunti na kwenda kwa ** Kupokea Fedha** ukurasa.
3. Bonyeza kioo cha kuongeza katika bar ya juu (** Tafuta anwani nyingine za uwazi **). Wallets kwamba mzunguko wa anwani, kama vile Ledger na Kutoka, kuzalisha nyingi anwani wazi kutoka mbegu moja, na hii hupata wale wanaoweka fedha
4. **Reset na kulandanisha akaunti baadaye.** anwani mpya kupatikana tu kuchukua mizani yao juu ya scan ijayo, hivyo kuruka hii inafanya kuonekana kama kufagia found nothing
5. Nenda kwenye ukurasa wa ** Tuma**. Karibu na usawa utapata vifungo vitatu vya ikoni. Hawana lebo za maandishi, kwa hivyo weka hover au bonyeza muda mrefu ili uone majina yao:
   - ** Shield One** (mwamba kioo) hatua moja ya uwazi anwani kwa wakati mmoja
   - ** Shield All** (ngome imara) hatua kila kitu kutoka kwa anwani ya wazi mara moja
   - ** Unshield All** (kufungua padlock) huenda njia nyingine, katika anwani ya uwazi

> ** Shield One ni zaidi ya faragha chaguo.** Kuzuia anwani kadhaa katika shughuli moja kwa umma unaunganisha yao kama mali ya mtu mmoja. Zkool anaonya kuhusu hili yenyewe kabla ya kuendesha Shield All.

6. Tathmini shughuli na kutuma ni

Unshield All ni muhimu wakati wa kujiondoa kwa kubadilishana kwamba tu kukubali anwani uwazi. vifungo Shielding kuonekana tu kama akaunti ina anwani ulinzi, na unshield wote tu ikiwa ina moja ya wazi.

## ZecWallet Lite na urithi wa mkoba ahueni kwa Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) Utoaji wake wa mbegu hutofautiana na mpangilio unaotumiwa na pochi za sasa, kwa hivyo kuagiza kifungu hicho katika mkoba wa kisasa kunaweza kukosa pesa zilizohifadhiwa kwenye anwani zingine zilizopatikana. [Argos](https://argos.sovright.com), kutoka Sovright, ni eneo la kazi ya urejesho wa desktop iliyojengwa kwa kesi hii na nyingine za urithi.

Argos anasoma ZecWallet Lite mbegu na faili mkoba, zcashd `wallet.dat`, kujitegemea Sapling kupanuliwa matumizi funguo, na Sprout vifaa vya matumizi. Kwa sprout, ZecWallet Lite mbegu peke yake haitoshi kwa sababu hizo funguo walikuwa yanayotokana tofauti. Argos ni zana ahueni, si mkoba siku-kwa-siku: kukagua vyanzo vya habari ndani ya nchi, Scan, kisha kufagia katika wallet kudumishwa wewe kudhibiti.

Mamlaka ya chini kabisa [kuchunguzwa](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) Recovery yenyewe ni bure. mchango hiari kwa Sovright inaweza kuonekana wakati wa kufagia.

> ** Kamwe aina mbegu katika tovuti.** Argos Tovuti ni tu download na [mwongozo wa mtumiaji](https://argos.sovright.com/guide.html). funguo kukaa katika saini desktop programu. uthibitishaji ni ndani dhidi ya BIP-39 checksum. shamba mbegu clears mara moja scan kuanza. mtu yeyote ambaye ujumbe wewe kuuliza kwa ajili ya kwamba mbegu "kusaidia kupata fedha yako" ni scamming yenu.

### Kabla ya kufungua Argos

1. Pakua programu ya desktop kutoka kwa [tovuti rasmi Argos](https://argos.sovright.com) au ya [GitHub releases ukurasa](https://github.com/sovright/argos/releases). Angalia checksums au saini wakati wao ni kuchapishwa.
2. Tumia kutolewa kwa sasa Argos. Kama ya Septemba 18, 2026, **v1.3.0** ni wa sasa na preferred. Matumizi **v2.0 au baadaye kwa ajili ya `wallet.dat` na Sprout ahueni **. Hujenga zamani kuliko 1.1.0 bado unaweza Scan lakini kujenga kabla ya Ironwood sweeps kwamba mtandao anakataa; update na kujaribu tena.
3. Kazi kwenye mashine unaamini. Upendeleo full-disk encryption. Je, si screen kushiriki wakati mbegu, passphrase, au matumizi muhimu ni inayoonekana.
4. Have a destination Unified Address ready from a maintained wallet you control, such as [ZODL](https://zodl.app/)Thibitisha anwani katika mkoba huo kabla ya kuiingiza kwenye Argos.

### Ufufuzi wa mbegu

1. Fungua Argos na kuchagua ** Nina maneno yangu ya mbegu 24**. Ufufuzi wa mbegu hauhitaji faili la mkoba.
2. Kuweka maneno na bonyeza ** kuthibitisha mbegu. Kama anasema ni mbegu halali, kuendelea.
3. Kuingia ** siku ya kuzaliwa block urefu, au makadirio karibu wa wakati mkoba iliundwa. urefu mapema ni polepole lakini salama kuliko guessing marehemu sana.
4. Chini ya udhibiti wa seva, kutumia sasa-server preset, au kuingia lightwalletd URLs. Comma kutengwa URL ni kujaribu katika utaratibu. Mifano umma:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Paste the destination Unified Address.
6. Bonyeza ** kuanza Scan**. Hii inaweza kuchukua dakika au siku kulingana na urefu kuzaliwa. Unaweza kuacha na kufungua tena nafasi ya kazi hiyo; scan itaanza upya.
7. Wakati scan kumaliza, kupitia mizani, ada makadirio na marudio, kisha bonyeza ** swipe.

Broadcasting a sweep is irreversible. Keep the original wallet file until every relevant pool has been swept and the destination wallet shows the expected funds. Once recovery is complete, retire legacy secrets rather than continuing to use them for new activity.

### Faili mkoba na funguo kujitegemea

Kwenye screen kuwakaribisha, ** Nina mkoba faili** inashughulikia ZecWallet Lite file, zcashd `wallet.dat`, au kujitegemea Sapling kupanuliwa matumizi funguo. kujitegemeza Sprout kutumia-ufunguo ahueni ni kushughulikiwa na Argos ya sprout ahueni njia / CLI .

Argos anaisoma faili mkoba bila kurekebisha yao. Kama mfuko wa fedha ni encrypted, kuingia passphrase wakati aliuliza; hutumiwa katika kumbukumbu na si imeandikwa kwenye diski. Tathmini uwazi, Sapling, na Sprout muhimu hesabu kabla ya kuanza Scan.

Kuangalia funguo ni haikubaliwa kwa ajili ya kufuta kwa sababu hawawezi idhini matumizi.

### Maelezo ya mimea michanga

ZecWallet Lite mbegu haina kuongoza Sprout funguo. Funguo hizo zilizalishwa tofauti. Kupata tena sprout kutoka zcashd `wallet.dat`, au kutoka muhimu ya matumizi binafsi katika CLI.

Kama faili tayari ina spendable maelezo data na ushahidi cached, Argos inaweza kutoa ** Sweepe Sprout fedha** bila mfuatano scan. Vinginevyo ni unaweza kukimbia resumeable full-block Scan juu ya mtandao P2P. kwamba skanni ni kubwa na polepole. checkpoint anaandika ni kutumia uwezo, hivyo kulinda kama mfuko wa awali.

Baada ya fedha za Sapling kuthibitishwa na kutumia, wahamishe kwa ** Ironwood** na mkoba uliopo ambao unasaidia akaunti iliyopatikana ya Sapling. Usiache katika Sapling .

## Fedha zilizopatikana na Ironwood pool

Tangu Ironwood (NU6.3) kuboresha ulioamilishwa tarehe 28 Julai 2026, Orchard pool ni kutumia tu. Hakuna thamani mpya inaweza kuingia ndani yake, na zilizopo dhamana majani kupitia turnstile katika Ironwood.

Kama fedha yako kurejeshwa ni katika Orchard, kuhamisha yao kwa Ironwood kutumia ** mfuko wa sasa kujengwa-katika uhamiaji mtiririko**. orchard ni exit tu baada ya NU6.3.

Zkool 6.30.0 is current as of September 18, 2026 and supports Ironwood. Its migration design is privacy-focused but is not the same thing as claiming ZIP 318 conformance. Other current wallets may use ZIP 318-style staged migration. Follow the installed wallet's current migration screen and release notes rather than inventing a manual amount or schedule.

Uhamiaji wa hatua unaweza kutumia shughuli nyingi, kwa hivyo ada ya jumla inaweza kuwa kubwa kuliko uhamishaji mmoja.

> **Migration amounts are public.** When value crosses the turnstile, the amount and block height are visible on chain even though the sender and receiver remain shielded. Use the wallet's built-in private/staged migration policy when privacy matters, and use network-level privacy such as Tor or another trusted privacy layer where appropriate. Network privacy can hide your IP link; it does not hide the public crossing amount.

## Deep Recovery na ZExCavator

[ZExCavator Kiwanda cha kuchimba visima](https://github.com/zingolabs/zexcavator) ni ** kazi katika maendeleo** Zingo Labs ahueni mradi sasa ililenga ZecWallet Lite mkoba files na mkoba-format uhamiaji. README yake kwa sasa inaelekeza watumiaji fedha ahueni ya chaguo la mauzo nje **Zingolib** wakati kamili zaidi msaada wa ZeWIF bado inapatikana zinazoendelea.

Kutibu kama advanced/edge-kesi chombo badala ya default ahueni njia. Kwa kawaida ZecWallet Lite mbegu, faili mkoba, zcashd `wallet.dat`, na mkono kujitegemea matumizi funguo, kujaribu Argos kwanza. Kuthibitisha chochote zinalipwa kwa ZExCavator katika kuhifadhiwa mkoba kabla ya kutegemea juu yake.

## Professional ahueni wakati huna mbegu

Kama mbegu au ufunguo ni gone, binafsi mwenyeji kurejesha hawezi kuanza. Watu wengine katika nafasi hiyo kutumia mtaalamu kufufua kampuni kwa ajili ya password wamesahau, kushindwa vifaa, au disks unreadable.

Njia hiyo si sawa na kurudisha mbegu ambayo bado unayo. Usimpe mtu yeyote ambaye anajitolea "kuirudisha" kwa ajili yako mbegu inayofanya kazi. Toleo la kashfa ya huduma hii ni kawaida.

[Haijafichwa](https://unciphered.com) ni moja ya kampuni ambayo anafanya kazi hii ndani na imekuwa kufunikwa katika maeneo kama vile [Wenye waya](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Wao ni huduma ya jumla crypto ahueni, si Zcash-hususa chombo, na wao malipo kwa ajili ya kazi. ZecHub haina kuidhinisha yoyote kampuni ahueni. Kama kwenda njia hii, kuthibitisha rasmi domain mwenyewe na kudhani mtu yeyote ambaye DMs wewe kwanza ni scammer.

Kama bado una mbegu kazi au kutumia ufunguo, kuanza na njia ya kufufua binafsi mwenyeji kama vile Zkool au Argos kwenye mashine yako mwenyewe badala yake.

## YWallet ni tena iimarishwe

YWallet ilikuwa kifaa cha kupona kilichopendekezwa kwenye ukurasa huu kwa muda mrefu, na miongozo mingi ya zamani bado inaonyesha.

Mtengenezaji wake sasa anasema kwamba YWallet tena inasaidia Zcash tangu Ironwood update na inaelekeza watumiaji wa Zcash kwa **Zkool**, mrithi kudumishwa. Kuweka zamani YWallets mbegu / muhimu vifaa, lakini si kuanza mpya ya uhamiaji Zcash katika YWallett.

Kama tayari una Zcash ahueni nyenzo kutoka YWallet, kurejesha katika Zkool kutumia mkono mbegu / ufunguo njia juu.

## Kurasa zinazohusiana na makala hii

- [Mkoba](/using-zcash/wallets) - ambayo pochi ni iimarishwe na Ironwood yao tayari, ikiwa ni pamoja Argos
- [Mti wa chuma](/zcash-tech/ironwood) - nini kuboresha iliyopita na kwa nini fedha kuhamia
- [Memo za](/using-zcash/memos) - jinsi memo encrypted kazi
- [Kuangalia funguo za kuvinjari](/zcash-tech/viewing-keys) - kusoma tu kupata bila matumizi ya nguvu
- [Nodes Lightwallet](/zcash-tech/lightwallet-nodes) - umma lightwalletd mwisho Argos unaweza kutumia
- [Argos mwongozo wa mtumiaji](https://argos.sovright.com/guide.html) - rasmi walkthrough kutoka Sovright
- [Naomi Brockwell juu ya zana za kupona](https://x.com/naomibrockwell/status/2079146521405333526) - Argos kutembea kwa njia na kumbuka juu ya kupona kitaaluma
