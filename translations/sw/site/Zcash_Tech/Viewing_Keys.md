<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuangalia funguo za kuvinjari

Anwani za kulindwa kuruhusu kufanya manunuzi wakati akifunua kidogo iwezekanavyo juu ya blockchain Zcash. Hivyo nini kinatokea * do* haja ya kuonyesha chama maalum kile kushikilia, au yale alituma? Kila anwani ulinzi ina kuangalia muhimu kwamba ruzuku kusoma upatikanaji bila kutoa uwezo wa kutumia. viewing funguo zilianzishwa katika mwaka 2007 na sasa ni kutumika kwa ajili ya matumizi binafsi kama vile akaunti yako mwenyewe (kama ilivyoelezwa hapo awali) ili kuweza kupata taarifa kuhusu mali zako zilizohifadhiwa kwenye mtandao. [ZIP 310 - Kijiji:](https://zips.z.cash/zip-0310) na aliongeza kwa itifaki katika Sapling mtandao kuboresha.

Ufunguo wa kutazama ni chombo cha ufunuo mteule: unachagua nani anaona nini, na kamwe usitoe mamlaka ya kutumia kufanya hivyo.

## Kwa nini utumie ufunguo wa kutazama?

Uandishi wa Electric Coin Company juu ya habari hiyo huonyesha hali ziwezazo kutokea mara nyingi zaidi, nazo bado ni za kawaida leo:

- ** Kubadilishana kuangalia kwa ajili ya amana.** kubadilishani Inapakia kuingia viewing muhimu kwenye mtandao-facing kugundua node hivyo inaweza taarifa wateja wa amana anwani ulinzi, wakati matumizi ufunguo hukaa juu ya vifaa kwamba kamwe mguso wa mtandao.
- ** Mdhamini kuthibitisha mali yake.** mdhamini anatoa mkaguzi kamili kuona ufunguo kwa kila anwani ulinzi. Mkaguzi anaweza kuangalia mizani hizo na kupitia shughuli ya zamani kwenda na kutoka kwenye anwani, na hawezi kufanya kitu kingine chochote.
- **Due diligence on a counterparty.** Where an exchange needs to review a customer's shielded history as part of enhanced due diligence, it can ask for the viewing key rather than for the funds.

## Nini kuona ufunguo gani na si wazi

Kuna aina nyingi za funguo, na tofauti hiyo huamua kiasi unachotoa.

Ufunguo. Kiambishi cha kwanza. Mikopo ya ruzuku.
|---|---|---|
 Unified Full Viewing Key (UFVK) Kiini cha kutazama kamili. `uview…` ◯ Huona shughuli zinazoingia na zinazotoka kwa kila kundi katika akaunti.
◯ Ufunguo wa kutazama uingiaji uliounganishwa (UIVK) `uivk…` ◯ Huona shughuli zinazoingia tu, kwa kila kundi katika akaunti.
◯ Sapling aliongeza ufunguo wa kutazama kamili. `zxviews…` ◯ Huona shughuli za Sapling zinazoingia na zinazotoka kwa anwani ya ufunguo.

Hakuna moja ya haya inaweza kutumia. Wote ni wa kudumu katika njia ambayo mambo: ufunguo wewe kuwa handed nje haiwezi kukumbukwa, tu outlived, kwa kuhamisha fedha kwenye akaunti ambaye funguo upande mwingine hana kushikilia.

Kuna mitego miwili ya kufichua mambo ambayo unapaswa kujua kabla hujaficha chochote.

** Incoming haina maana nyembamba.** umoja wa inbound kuangalia muhimu ni scoped kwa akaunti nzima, si anwani moja uliulizwa kuhusu. nje ya UIVK kwa ajili ya Sapling mmoja bado inaruhusu inayoingia kujulikana katika kila pool katika kwamba akaunti, hivyo inaonyesha zaidi kuliko anwani majina yake. [Kitabu cha Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) inasema hii waziwazi.

** Anwani iliyochapishwa tayari inaonyesha ufunguo wake wa kutazama unaoingia kwa mpinzani ujao. ** [ZIP 326 - Ujumbe wa posta.](https://zips.z.cash/zip-0326) inabainisha kuwa mpinzani na kompyuta quantum inaweza kufufua inayoingia kuangalia muhimu kutoka anwani kuchapishwa mbalimbali, ambayo ni ya vitendo kwa njia kwamba kurejesha nullifier ufunguo si. Kuchapisha anwani sio sawa kama kuchapisha kuona muhimu leo, lakini wawili kukaa karibu pamoja juu ya upeo wa macho muda mrefu kutosha.

## Kuangalia funguo baada ya Ironwood

NU6.3 ilianzisha bwawa la Ironwood lililohifadhiwa na kufanya bwawa ya Orchard kutumia tu, kwa hivyo fedha huhama kutoka moja hadi nyingine baada ya muda. Tazama [Mti wa chuma](/zcash-tech/ironwood) na [Mzunguko wa mviringo](/zcash-tech/the-turnstile) kwa ajili ya kuboresha yenyewe.

**A viewing key issued before Ironwood keeps working after the migration.** ZIP 326 specifies that a receiver, and its corresponding incoming viewing key, is scoped to the Orchard *protocol* rather than to a pool: the same incoming viewing key trial-decrypts both Orchard-pool and Ironwood-pool note ciphertexts. Zallet implements it that way, describing Ironwood notes as Orchard-shaped and trial-decrypted with the account's Orchard viewing keys under the Ironwood note-encryption domain.

Matokeo matatu kwa mtu yeyote mwenye au anayeweka ufunguo:

1. ** Mizani huhama kati ya mabwawa, na mtazamaji huona ikitokea.** [ZIP 318 - Ujumbe wa posta.](https://zips.z.cash/zip-0318) hufafanua uhamiaji kama mfululizo wa madogo, makusudi sare Orchard-kwa Ironwood shughuli matangazo juu ya ratiba randomized, kila matumizi moja Orchid kumbuka na kuzalisha moja chuma pato la jina canonical. mkaguzi kuangalia kwa ufunguo viewing anaona mali hoja kutoka pool mmoja hadi mwingine katika hatua zaidi ya wiki, si katika harakati moja. mkoba unaweza kujenga upya maendeleo yake mwenyewe uhamisho kutokana data mlolongo kutumia funguo zake viewing.
2. **Kila hatua uhamiaji inaonyesha thamani ni hoja.** Hiyo ni asili ya kuvuka turnstile, na kwamba nini hufanya uhamiaja auditable. Kugawanya salio katika majina canonical maana hakuna shughuli moja hufunua usawa nzima Orchard-bwawa.
3. ** Akaunti zilizoundwa baada ya Ironwood inaweza kupata funguo zao tofauti. ** [ZIP 2005 - Ujenzi wa Jengo la Makao Makuu ya Ulaya](https://zips.z.cash/zip-2005) anaongeza a `use_qsk` bendera kwa quantum-recoverable funguo, na mabadiliko jinsi ya kuingia, kuondoka na ufunguo diversifier ni inayotokana, hivyo `use_qsk = true` ZIP 326 inahitaji bendera kuwa sare katika akaunti na inakataza kuzalisha `use_qsk = true` ufunguo kabla ya NU6.3 kuanzishwa kwenye Mainnet. muhimu nje kutoka akaunti kwamba ilikuwepo kabla Ironwood ni kwa hiyo a `use_qsk = false` Je, si kudhani muhimu nje kutoka akaunti moja inaelezea mwingine.

## Exporting kuangalia muhimu

### Zallet (Kifungu cha kulia)

[Zallet (Kifungu cha kulia)](https://github.com/zcash/zallet) ni mkoba kamili-node ambayo badala ya mfuko wa ndani zcashd. Viewing-key kuuza nje na uagizaji aliwasili katika **v0.1.0-beta.2 (28 Julai 2026)**, hivyo kuangalia toleo lako kwanza; awali kujenga hawana mbinu hizi. Kila hoja baada ya jina la njia lazima halali JSON, ambayo ina maana maadili string kuweka quotes yao wenyewe mara mbili. [Mwongozo wa Marejeo ya Haraka wa Zallet](/using-zcash/zallet-quick-reference-guide) inashughulikia style ya jumla amri.

Andika vitu vilivyo katika kibeti hicho:

```bash
zallet rpc listaddresses
```

Export akaunti ya umoja kamili kuangalia muhimu kwa kupita anwani umoja:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Export akaunti ya umoja inbound viewing muhimu badala yake, kwa kutumia hiari `ivk` hoja:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Kupitisha anwani ya Sapling inarudi kwamba akaunti hiyo ni Sapling kupanuliwa full viewing muhimu (`zxviews…`), vinavyolingana na tabia ya zamani zcashd. mipaka mbili kumbukumbu: sprout anwani ni kukataliwa, na Sapling kupanuliwa full kuangalia muhimu haiwezi nje kutoka akaunti ambayo ilikuwa yenyewe zilizoagizwa kama mtazamo tu, kwa sababu mkoba hawezi kujenga tena yake. `ivk` fomu kazi kwa ajili ya akaunti za kuingizwa mtazamo tu.

### Pochi ambazo kuuza nje viewing funguo kutoka interface yao wenyewe

Makala ya kwanza. [Mkoba](/using-zcash/wallets) ukurasa hufuatilia msaada wa kuona-ufunguo na utayari Ironwood kwa kila mkoba. Wakati wa kuandika, pochi orodha wote kuangalia ufunguo msaada na **Ironwood: Tayari** ni pamoja ZODL, Zingo!, Zkool, Cake, Zallet, Zecd na Nozy. Angalia kwamba ukurasa badala ya hii moja kabla kutegemea yoyote mfuko mmoja, kwa sababu mabadiliko tayari.

## Kuingiza ufunguo wa kutazama kama akaunti ya kuangalia tu

### Shule ya Zkool

[Shule ya Zkool](https://github.com/hhanh00/zkool2) ni chaguo rahisi zaidi hapa, kwa sababu inakubali funguo umoja kama vile wale urithi. README yake nyaraka view-tu akaunti kuundwa kutoka ** unified kuangalia muhimu** au ** Sapling Extended viewing ufunguo wa **, pamoja na urithi ulinzi extended funguo nje ya zcashd. Kuongeza akaunti mpya, kuchagua njia mtazamo tu, na kuweka faili katika kivinjari yako mwenyewe ili kupata maelezo kamili juu ya jinsi gani unaweza kutumia programu hii. `uview…` or `zxviews…` muhimu; akaunti kisha syncs na ripoti mizani na historia bila kutumia mamlaka.

Ironwood itifaki msaada na Orchard-kwa-Ironwood uhamiaji alitua katika Zkool 6.24.0 (20 Julai 2026), na 6.26.1 (2 Agosti 2026) fasta Ironwood manunuzi kugundua katika mempool. Run 6.26,1 au baadaye.

### Zallet (Kifungu cha kulia)

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Hoja ya pili ni sera rescan: `"whenkeyisnew"` (kupotea), `"yes"` or `"no"`. Tatu ni block urefu rescan kutoka. Zallet inaingiza muhimu kama view-tu akaunti na kufuatilia shughuli zinazoingia na zinazotoka kwa anwani zake bila matumizi ya mamlaka.

** Zallet inaagiza Sapling kupanuliwa full viewing funguo tu.** Itakuwa si kuleta a `uview…` kuunganishwa full kuangalia muhimu, hata kama inaweza kusafirisha moja. Kupeleka kusoma upatikanaji wa akaunti nzima umoja, usafirishaji UFVK kutoka Zallet na kuleta ndani ya mkoba kwamba anapokea funguo umoja , kama vile Zkool .

## Nini iliyopita, na nini kuacha kuangalia kwa ajili ya

Kama ulifuata toleo la zamani ya ukurasa huu, au tafsiri yake, njia tatu tena kazi.

- **`zcash-cli z_exportviewingkey` na `z_importviewingkey`.** zcashd alifikia mwisho wa msaada wake kusimamishwa tarehe 18 Julai 2026 na tena anaendesha. Zallet ya mbinu sawa jina ni badala yake; angalia maelezo zaidi juu ya njia za Zcashd katika makala hii, pamoja na kuondoa data kutoka kwa mfumo huu. [mwongozo wa uhamiaji](/guides/migration-guide-zcashd-to-zebrad-zallet).
- ** The Ywallet walkthrough.** Wallets ukurasa alama Ywalle * Ironwood: Not Ready, hivyo si mkoba kwa uhakika watu katika ajili ya chuma-era viewing funguo. Zkool, kutoka developer huo, kukubali mbalimbali sawa wa funguo na ni aliweka tayari.
- Huduma inarudi HTTP 503 na hati batili, na imeachwa badala ya kubadilishwa. Kuweka ufunguo wa kutazama kwenye tovuti kunatoa historia yako yote ya manunuzi kwa mtu yeyote anayemiliki tovuti hiyo, ambayo ilikuwa daima dhaifu zaidi kati ya chaguzi tatu kwenye ukurasa wa zamani. Ingiza kitufe katika mkoba unaouendesha badala yake.

## Rasilimali

Matumizi kuona funguo juu ya msingi kama inahitajika, na wanapendelea muhimu nyembamba kwamba anajibu swali kuulizwa.

- [ZIP 326: NU6.3 Matokeo kwa Wallets](https://zips.z.cash/zip-0326)  jinsi kuona funguo tabia katika Orchard na Ironwood mabwawa
- [ZIP 229: Toleo 6 Utaratibu wa Manunuzi](https://zips.z.cash/zip-0229)  hufafanua Orchard na Ironwood mabwawa
- [Zallet mabadiliko ya kumbukumbu](https://github.com/zcash/zallet/blob/main/CHANGELOG.md)  ambayo kutolewa aliongeza ambayo RPC mbinu
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md)  aina akaunti na muhimu mkono
- [ECC, Kueleza Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure na Viewing Keys (Funguo za Kuona)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
