# Mwongozo wa uhamiaji: Kutoka zcashd kwa Zebrad/Zallet

Zcash mazingira ni kuendeleza. jadi Zcashd full node, kudumishwa na *Electric Coin Company (ECC) * / *Zodl*, ni hatua kwa hatua kubadilishwa na Zebra na Zallet.

- Zebra ni kisasa Rust utekelezaji wa itifaki Zcash zilizotengenezwa na Zcash Foundation
- Zallet ni mkoba lightweight kujengwa interface seamlessly na Zebra nodes zilizotengenezwa na Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Mwongozo huu kutembea wewe kwa njia ya uhamiaji kutoka ** Zcashd ** kwa ** Zebrad ** na ** Zallet **, ikiwa ni pamoja na kuanzisha, mkoba kuagiza, na utatuzi wa matatizo ya kawaida ya uhamisho.

---

## Mradi wa Zcash umetangaza rasmi kuwa zcashd itafutwa katika 2025.

**Hali ya Kudharauliwa na Maana Yake**

- Mradi wa Zcash umetangaza rasmi kuwa zcashd itafutwa katika 2025.
- Full nodes ni kuwa kuhamia Zebrad, Rust utekelezaji, wakati Zallet ni nia ya kufanikiwa mfuko wa fedha sehemu ya zcashd. 
- Katika kujibu, mradi wa Zebra hufuatilia hatua ya "Zcashd Deprecation" ili kuhakikisha utangamano, uhamiaji wa RPC, na msaada wa mazingira.
- Kwa njia nyingi RPC, Zebrad / Zallet itakuwa na lengo la kuwa drop-katika uingizwaji (kuiga au vinavyolingana tabia). Wengine itabadilika au inaweza kuwa mkono.

Kwa Nini Wahame - Zaidi ya Kukataliwa?

Hata tukiachilia kando hali ya kupoteza umaana, kuna sababu zenye kusadikisha za kuhama:
- Usalama & Uimara: Rust ya kumbukumbu-usalama na zana ya kisasa kupunguza hatari ya udhaifu.
- Utendaji & ufanisi: Zebrad ni iliyoundwa kwa ajili ya sambamba, matumizi ya rasilimali ufanisi zaidi, na kasi ya usawazishaji.
- Modular usanifu: Kutenganisha node mantiki (Zebrad) kutoka mkoba UI (Zallet) inatoa mipaka wazi na bora kuboresha njia.
- Future Ecosystem Compatibility: Tools, enhancements, and the rest of Zcash's ecosystem will increasingly target Zebrad/Zallet.
- Amani ya Akili: Epuka kuwa kukwama kuendesha sehemu deprecated, unsupported.

### Sasa hebu kupiga mbizi katika mwongozo Uhamiaji

** 1. Backup Kila kitu **
* Backup yako wallet.dat (au nyingine yoyote ya mkoba faili / muhimu kuhifadhi) kutoka yako zcashd node.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
! [bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Hifadhi zcash.conf yako na yoyote ya mipangilio ya desturi.
* Export nakala ya yoyote RPC scripts au automatisering wewe kutumia.
* Kuhakikisha kwamba backups yako ni halali (kwa mfano katika mazingira mengine, kujaribu kufungua au kukagua yao).
* Mapitio ambayo JSON-RPC mbinu wewe ni sasa kutegemea.
* Linganisha na meza ya utangamano iliyopangwa iliyohifadhiwa kwenye [tovuti ya msaada wa Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Jitayarishe kwa ajili ya mabadiliko au kukosa mbinu (baadhi inaweza kuhitaji workaround au marekebisho).

**2. System Mahitaji & Disk Space**
* Kuhakikisha una nafasi ya kutosha disk (Zcash mlolongo ni kubwa). Angalau 10 GB ya nafasi ya bure disk.
* Kuhakikisha mashine yako ina imara mtandao, CPU, RAM.
* Kiunganisho cha mtandao 
* Kama mpango wa kukusanya kutoka chanzo, kuwa Rust & Cargo imewekwa.

** 3. Kufunga / Config Zebrad **
Unaweza ama kushusha prebuilt binary au kujenga kutoka chanzo.
* Zcash Foundation kuchapisha releases na binaries kwa Zebra. Kwa mfano unaweza kutumia script kufunga au download binary sahihi kwa OS yako.

* Kumbuka kwamba katika matoleo ya hivi karibuni Zebra, [RPC mwisho hatua ni tena kuwezeshwa kwa chaguo-msingi katika Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

** Chaguo A: Kufunga kupitia prebuilt binary ** 
Katika ** Linux **/** macOS **:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
! [bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

This installs the latest stable version of zebrad.

** Chaguo B: Kujenga kutoka chanzo **

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
! [bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Baada ya kujenga, hoja binary katika njia yako:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[uhamaji 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Configuration & Uzinduzi** 
Kuzalisha default config:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[uhamaji2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Hariri **zebrad.toml** kwa mapendekezo yako (kusikiliza anwani, bandari, directory hali, caching).

** Kuanza node:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[picha](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

node itaanza kusawazisha kutoka genesis - kutarajia masaa kadhaa (au zaidi) kulingana na vifaa na mtandao.

** 5. kufunga / Config Zallet (Wallet) **

Zallet ni iliyoundwa na kuchukua nafasi ya mkoba sehemu ya zcashd.

Angalia Zallet GitHub / kutolewa ukurasa kwa ajili ya binaries.

** Au kujenga kutoka chanzo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[picha](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Kuzindua GUI au CLI (kama ufungaji yako hutoa).
* Configure ni kuungana na yako ya ndani Zebrad node kupitia RPC au API mwisho.

** 6. kuagiza yako zcashd Wallet katika Zallet ** 
Kupitia Dump Key Private

Juu ya zcashd, kuuza nje funguo yako binafsi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
! [bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Katika Zallet, kuchagua Import Keys au chaguo sawa.
* Kuelekeza kwa ** zcashd_keys.txt **. 
* Zallet lazima kuchambua na kuagiza anwani ZEC na funguo kuhusiana.

** Via Mbegu Sentensi ** (ikiwa inatumika)

* Kama mkoba wako inasaidia mbegu chelezo, kutumia Rejesha kutoka mbegu maneno katika Zallet.
* Hii kazi tu kama mkoba wako zcashd ilitokana na mbegu (au una mbegu uongofu).

** mkoba Rescan & Synchronization **

* Mara tu funguo zinapopelekwa, Zallet ataanzisha skanning ya mnyororo kupitia Zebrad.
* Ruhusu muda kwa Zallet kujenga upya salio lako na historia ya shughuli.

** 7. Angalia mizani na Sync **

Mara baada ya kuingizwa, Zallet itaunganisha kwa node yako Zebrad na rescan blockchain.
Wakati usawazishaji kukamilika, mizani yako na shughuli lazima kuonekana hasa kama kabla.

Unaweza kuthibitisha msimamo wa usawazishaji node yako kwa kuendesha:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[picha](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Au angalia kumbukumbu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[picha](https://hackmd.io/_uploads/r1HfVPF6gg.png)
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

Kuhama kutoka zcashd kwa Zebrad na Zallet inakupa kasi, salama, na kisasa zaidi Zcash uzoefu.
With Rust-based security, modular design, and better tooling, this setup ensures your node and wallet remain future-ready as the Zcash ecosystem continues to evolve.

Kidokezo: Weka funguo za mkoba wako nje ya mtandao na mara kwa mara kuhifadhi data zako za Zallet.
Tembelea [zebra.zfnd.org](https://zebra.zfnd.org) na [zallet.zfnd.org](https://zallet.zfnd.org) kwa updates na msaada wa jamii.
