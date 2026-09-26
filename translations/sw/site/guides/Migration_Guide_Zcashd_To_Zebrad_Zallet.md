# Mwongozo wa Uhamiaji: Kutoka zcashd kwa Zebrad/Zallet

Zcashd ya jadi full node, kudumishwa na *Electric Coin Company (ECC) * / *Zodl*, imebadilishwa kwa Zebra na Zallet. zcashd ilifikia mwisho wa msaada wake kusimamisha tarehe 18 Julai 2026 na haitaendelea tena kuendesha.

- Zebra is a modern Rust implementation of the Zcash protocol developed by the Zcash Foundation
- Zallet ni mkoba nyepesi kujengwa interface seamlessly na Zebra nodes zilizotengenezwa na Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Mwongozo huu kutembea wewe kupitia uhamiaji kutoka ** Zcashd** kwa ** Zebrad ** na ** Zallet, ikiwa ni pamoja na kuanzisha, mkoba wa kuagiza, na matatizo ya kawaida migomo masuala.

---

## zcashd aliacha kuendesha tarehe 18 Julai 2026

** Hii inamaanisha nini**

- zcashd alifikia mwisho wa msaada wake kusimamishwa tarehe 18 Julai 2026. Itakuwa si kulandanisha kwa ncha ya mnyororo tena, na haiwezi kutuma au kupokea fedha. Hii ni kumaliza, haipangwa.
- zcashd's two jobs are now split: **zebrad** is the full node, and **Zallet** is the wallet.
- Zallet ni katika ** beta**. kuvunja mabadiliko yanaweza kutokea kati ya releases, na baadhi zcashd JSON-RPC mbinu si kutumika bado. Angalia hali halisi ya data yako kwa ajili ya kuboresha uwezo wa kufuta au kurekebisha faili za programu nyingine yoyote ambayo inaweza kuwa inapatikana kwenye tovuti yetu. [hali ya njia matrix](https://zcash.github.io/zallet/) kabla ya kutegemea wito maalum.
- Kama bado kushikilia ** Sprout *** fedha, kusoma onyo katika hatua ya 6 kwanza. Zallet haina msaada wa shina pool, na njia ya kawaida kwa hoja hizo fedha zinahitajika mbio zcashd.

Kwa Nini Wahame - Zaidi ya Kukataliwa?

Hata tukiacha mbali hali ya kupoteza umaana, kuna sababu zenye kusadikisha za kuhama:
- Usalama na Uimara: Rust ya kumbukumbu-usalama na zana za kisasa kupunguza hatari ya udhaifu.
- Utendaji & ufanisi: Zebrad ni iliyoundwa kwa ajili ya sambamba, matumizi bora zaidi rasilimali na kasi sync.
- Modular usanifu: Kutenganisha node mantiki (Zebrad) kutoka mkoba UI (Zallet) inatoa mipaka wazi na njia bora ya kuboresha.
- Future Ecosystem Compatibility: Tools, enhancements, and the rest of Zcash's ecosystem will increasingly target Zebrad/Zallet.
- Amani ya akili: Epuka kuwa amefungwa kuendesha sehemu deprecated, unsupported.

### Sasa hebu kupiga mbizi katika mwongozo Uhamiaji

** 1. Backup Kila kitu**
* Backup yako wallet.dat (au nyingine yoyote ya mkoba faili / muhimu kuhifadhi) kutoka node zcashd wako.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Hifadhi zcash.conf yako na yoyote ya mipangilio desturi .
* Export nakala ya yoyote RPC scripts au automatisering matumizi.
* Hakikisha kwamba backups yako ni halali (kwa mfano katika mazingira mengine, kujaribu kufungua au kukagua yao).
* Mapitio ambayo JSON-RPC mbinu wewe ni sasa kutegemea.
* Linganisha na meza ya utangamano iliyopangwa iliyohifadhiwa kwenye tovuti. [Zcash msaada tovuti](https://z.cash/support/zcashd-deprecation/) 
* Jitayarishe kwa ajili ya mabadiliko au kukosa mbinu (baadhi inaweza kuhitaji workaround au marekebisho).

**2. Mahitaji ya mfumo & Disk Space**
* Nafasi ya diski ni mahitaji watu underestimate. mlolongo Zcash kupita ** 270 GB** Agosti 2026, hivyo kuruhusu angalau ** 300 GB** nafasi bure, juu SSD kama unaweza.
* Kuhakikisha mashine yako ina imara mtandao, CPU, RAM.
* Kiunganisho cha mtandao 
* Kama mpango wa kukusanya kutoka chanzo, kuwa Rust & Cargo imewekwa.

** 3. Kufunga / Config Zebrad**
Unaweza ama kushusha awali kujengwa binary au kujenga kutoka chanzo.
* Zcash Foundation kuchapisha releases na binaries kwa Zebra. Kwa mfano unaweza kutumia script kufunga au download binary sahihi kwa OS yako.

* Kumbuka kwamba katika matoleo ya hivi karibuni Zebra, [mwisho RPC ni tena kuwezeshwa kwa default katika Docker.](https://zfnd.org/zebra-2-3-0-release/)

** Chaguo A: Kufunga kupitia prebuilt binary** 
On ** Linux**/** macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

This installs the latest stable version of zebrad.

** Chaguo B: Kujenga kutoka chanzo**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Baada ya kujenga, hoja binary katika njia yako:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

** 4. Configuration & Uzinduzi** 
Kuzalisha default config:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Hariri **zebrad.toml** kwa mapendeleo yako (kusikiliza anwani, bandari, hali directory, caching).

** Kuanza node:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

node itaanza kusawazisha kutoka genesis - kutarajia masaa kadhaa (au zaidi) kulingana na vifaa vya kazi na mtandao.

** 5. kufunga / Config Zallet (Wallet)**

Zallet ni iliyoundwa na kuchukua nafasi ya sehemu mkoba wa zcashd.

Angalia Zallet GitHub / kutolewa ukurasa kwa ajili ya binaries.

** Au kujenga kutoka chanzo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Kuanzisha GUI au CLI (kama ufungaji yako hutoa).
* Configure ni kuungana na yako ya ndani Zebrad node kupitia RPC au API mwisho.

** 6. kuagiza yako zcashd Wallet katika Zallet**

Huna haja ya mbio zcashd kwa hili. Zallet anasoma `wallet.dat` faili moja kwa moja, ambayo ni muhimu kwa sababu zcashd hawezi tena kuanza.

> Endelea ** `wallet.dat`.** Uhamiaji ripoti chochote haiwezi kuwakilisha katika mkoba Zallet badala ya kuagiza, na kwamba nyenzo muhimu basi ipo tu kwa ajili ya matumizi. `wallet.dat`. Usifutwe baada ya kuhamia.

Kukimbia `zallet init-wallet-encryption` kwanza. Zallet encrypts muhimu vifaa kwa umri utambulisho, na kwamba ni lazima kuwepo kabla ya funguo yoyote kuingizwa.

Kisha kubadilisha config yako na mkoba wako:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` ni tu sasa katika kujenga na `zcashd-import` kipengele, na kusoma `wallet.dat` mahitaji ya `db_dump` zana kutoka Berkeley DB 6.2, toleo zcashd kutumika. Kama una zaidi ya moja mfuko wa fedha faili, kukimbia amri mara moja kwa kila faili na kuongeza `--allow-multiple-wallet-imports` juu ya baadaye mbio; kila inakuwa seti yake mwenyewe ya akaunti. yako `rpcuser` na `rpcpassword` si kuchukuliwa, kwa sababu Zallet ya JSON-RPC inatumia kuki uthibitishaji default; kuongeza sifa na `zallet add-rpc-user` ikiwa unazihitaji.

**Kile kinachokuja kupitia**

* mbegu mnemonic na funguo inayotokana nao, kwa akaunti upya ili kufanana mfuko wa zcashd
* Standalone kuingizwa Sapling matumizi funguo na vifunguo uwazi
* Uwazi kuangalia tu entries kwamba ni pamoja na ufunguo wao wa umma au kuikomboa script
* Akaunti siku za kuzaliwa, hivyo mnyororo skanning huanza katika urefu wa haki

** Nini si kuja hela.** Hizi ni taarifa na hesabu badala ya kuingizwa:

* ** Sprout matumizi ya funguo na fedha.** Zallet haina msaada wa shina pool. njia kumbukumbu ilikuwa kuhamisha mali Chipukizi nje kwa kutumia zcashd kabla ya kustaafu, na kwamba ni haiwezekani tena. Kama hii huathiri wewe, uliza juu ya wingu la mzunguko ili kupata maelezo zaidi kuhusu jinsi gani unaweza kufanya hivyo katika hali yoyote wakati wowote. [Zcash R & D Discord](https://discord.gg/xpzPR53xtU) au ya [jukwaa la jamii](https://forum.zcashcommunity.com/) kabla ya kufanya kitu kingine chochote.
* Maelezo ya kitabu cha anwani
* Angalia-tu entries kuhifadhiwa bila ufunguo wa umma au kuokoa script, na entries kwa uncompressed funguo za umma
* Regtest pochi

** Backup baadaye.** Mnemonic peke yake si nakala rudufu kamili, kwa sababu funguo za kuingizwa zipo tu katika hifadhidata ya mkoba. Weka nakala salama za `wallet.db`, umri encryption faili utambulisho jina lake na `keystore.encryption_identity` chaguo, na mnemonic yako kifungu, na kuweka awali `wallet.dat`. Kumbuka kwamba `wallet.db` si yenyewe encrypted: ni ana historia yako ya manunuzi na kuangalia funguo katika wazi, hivyo kuhifadhi chelezo mahali salama.

** mkoba Rescan & Synchronization**

* Mara tu funguo zinapopelekwa, Zallet ataanzisha skanning ya mnyororo kupitia Zebrad.
* Ruhusu Zallet muda wa kujenga upya salio lako na historia ya shughuli.

** 7. Angalia mizani na Sync**

Mara baada ya kuingizwa, Zallet itaunganisha kwa node yako Zebrad na rescan blockchain.
Wakati usawazishaji kukamilika, mizani yako na shughuli lazima kuonekana hasa kama kabla.

Unaweza kuthibitisha hali ya usawazishaji node yako kwa kuendesha:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Au angalia kumbukumbu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Kutatua matatizo**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Issue</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Possible Cause</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad won't start</td>
        <td className="px-6 py-4">Port in use or bad config</td>
        <td className="px-6 py-4">Check **zebrad.toml** and use a free port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Slow sync</td>
        <td className="px-6 py-4">Network congestion</td>
        <td className="px-6 py-4">Ensure stable internet, restart Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet missing transactions</td>
        <td className="px-6 py-4">Partial key import</td>
        <td className="px-6 py-4">Re-import keys or rescan in Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet can't connect to node</td>
        <td className="px-6 py-4">Node not running or wrong endpoint</td>
        <td className="px-6 py-4">Start Zebrad and verify correct RPC port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet crashes</td>
        <td className="px-6 py-4">Outdated build</td>
        <td className="px-6 py-4">Update to latest release from GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. hitimisho**

Kuhama kutoka zcashd kwa Zebrad na Zallet inakupa kasi, salama zaidi, na kisasa Zcash uzoefu.
Kwa usalama wa Rust, muundo wa moduli na zana bora zaidi, usanidi huu unahakikisha node yako na mkoba wako unabaki tayari kwa siku zijazo wakati mfumo wa ikolojia ya Zcash unaendelea kubadilika.

Kidokezo: Weka funguo za mkoba wako nje ya mtandao na mara kwa mara chukua nakala rudufu ya data zako za Zallet.
Kutembelea [zebra.zfnd.org](https://zebra.zfnd.org) kwa Zebra, na [Kitabu cha Zallet](https://zcash.github.io/zallet/) au ya [Zallet kuhifadhi](https://github.com/zcash/zallet) kwa Zallet. The [Kuhama kutoka zcashd](https://zcash.github.io/zallet/) sura ya Kitabu Zallet ni mamlaka rejea kwa hatua 6.
