# Ntuziaka Mbugharị: Site na zcashd ruo Zebrad/Zallet

The Zcash ecosystem is evolving. The traditional Zcashd full node, maintained by *Electric Coin Company (ECC)* / *Zodl*, is gradually being replaced by Zebra and Zallet.

- Zebra bụ mmejuputa Rust nke oge a nke usoro Zcash nke Zcash Foundation mepụtara
- Zallet bụ obere akpa ego dị mfe e wuru iji jikọta ya na Zebra nodes nke Zodl mepụtara

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

This guide walks you through the migration from **Zcashd** to **Zebrad** and **Zallet**, including setup, wallet import, and troubleshooting common migration issues.

---

## Zcash oru ngo ekwuputala n'ihu ọha na a ga-ewepụ zcashd na 2025.

**Ọnọdụ Mkpesa & Ihe Ọ Pụtara**

- Ihe oru Zcash ekwuputala n'ihu ọha na a ga-ewepụ zcashd na 2025.
- Full nodes are being migrated to Zebrad, a Rust implementation, while Zallet is intended to succeed the wallet component of zcashd. 
- In response, the Zebra project tracks a "Zcashd Deprecation" milestone to ensure compatibility, RPC migration, and ecosystem support.
- Maka ọtụtụ usoro RPC, Zebrad / Zallet ga-achọ ịbụ ndị na-edochi anya (na-eṅomi ma ọ bụ na-eme ka omume kwekọọ). Ndị ọzọ ga-agbanwe maọbụ enweghị ike ịkwado.

**Ihe Mere A Ga-eji Kwapụ - Ọ Bụghị Ịdị Na-eleda Mmadụ Anya**

Ọ bụrụgodị na anyị ahapụ ihe ndị na-eme ka mmadụ gharazie inwe mmasị n'ebe ndị ọzọ nọ, e nwere ezigbo ihe ndị mere mmadụ ga-eji kwaga ebe ọzọ:
- Nchebe na ike: Nchekwa nchekwa nke Rust na ngwa ọrụ ọgbara ọhụrụ na-ebelata ihe ize ndụ nke adịghị ike.
- Arụmọrụ na arụmọrụ: Zebrad ka e mere maka ịmekọrịta, iji ihe eji eme ihe n'ụzọ dị irè karị, na ngwa ngwa.
- Modular Architecture: Iche iche n'echiche (Zebrad) site na obere akpa UI (Zallet) na-enye ókèala doro anya na ụzọ nkwalite ka mma.
- Nkwekọrịta Ecosystem Ọdịnihu: Ngwá ọrụ, nkwalite, na ndị ọzọ nke usoro okike Zcash ga-elekwasị anya na Zebrad / Zallet.
- Udo nke Uche: Zere ịbụ onye a na-ejide na-agba ọsọ a deprecated, unsupported akụrụngwa.

### Ugbu a, ka anyị banye n'ime ntuziaka Mbugharị

** 1. nkwado ndabere na mpaghara Ihe niile **
* Ndabere gị wallet.dat (ma ọ bụ ihe ọ bụla ọzọ wallet faịlụ / isi ụlọ ahịa) si gị zcashd ọnụ.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
! [bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Chekwaa zcash.conf gị na ntọala omenala ọ bụla.
* Mbupụ otu edemede RPC ma ọ bụ akpaaka ị na-eji.
* Nyochaa na nkwado ndabere gị dị mma (dịka ọmụmaatụ na gburugburu ebe ọzọ, gbalịa imeghe ma ọ bụ nyochaa ha).
* Nyochaa usoro JSON-RPC nke ị na-adabere ugbu a.
* Compare against the planned compatibility table maintained on the [Zcash support site](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Kwadebe maka mgbanwe ma ọ bụ usoro ndị na-efu (ụfọdụ nwere ike ịchọ ọrụ maọbụ mgbanwe).

**2. System chọrọ & Disk Space**
* Jide n'aka na ị nwere ohere diski zuru oke (Zcash chain dị ukwuu). Ọ dịkarịa ala 10 GB nke ohere disiki efu.
* Jide n'aka na igwe gị nwere netwọkụ kwụsiri ike, CPU, RAM.
* Njikọ Ịntanetị 
* Ọ bụrụ na ị na-eme atụmatụ ịhazi site na isi iyi, wụnye Rust & Cargo.

** 3. Wụnye / Nhazi Zebrad**
Ị nwere ike ma budata a prebuilt ọnụọgụ abụọ ma ọ bụ wuo site na isi iyi.
* The Zcash Foundation publishes releases and binaries for Zebra. E.g. you might use an install script or download the appropriate binary for your OS.

* Note that in recent Zebra versions, [the RPC endpoint is no longer enabled by default in Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

** Nhọrọ A: Wụnye site na prebuilt ọnụọgụ abụọ ** 
Na **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

This installs the latest stable version of zebrad.

** Nhọrọ B: Mee site na isi mmalite **

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Mgbe i wuchara ya, bugharịa binary ahụ n'ụzọ gị:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Migration 11]](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Nhazi & Mwepụta** 
Mepụta nhazi ndabara:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Dezie **zebrad.toml** na mmasị gị (na-ege ntị na adreesị, ọdụ ụgbọ mmiri, ndekọ steeti, caching).

** Malite ọnụ:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Ihe osise]](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

The node will begin syncing from genesis - expect several hours (or more) depending on hardware and network.

** 5. Wụnye / Mbido Zallet (Wallet) **

Ezubere Zallet iji dochie akụkụ akpa ego nke zcashd.

Lelee Zallet GitHub / wepụta peeji maka ọnụọgụ abụọ.

** Ma ọ bụ wuo site na isi iyi:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Ihe osise]](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Bido GUI ma ọ bụ CLI (dị ka nrụnye gị nyere).
* Hazie ya iji jikọọ na mpaghara Zebrad gị site na RPC ma ọ bụ API endpoint.

** 6. Ịbubata gị zcashd obere akpa n'ime Zallet** 
Site na Dump Key Dump

Na zcashd, mbupụ igodo nzuzo gị:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Na Zallet, họrọ Import Keys ma ọ bụ nhọrọ yiri ya.
* Detuo ya na zcashd_keys.txt. 
* Zallet ga-enyocha ma webata adreesị ZEC na igodo ndị metụtara ya.

** Site na mkpụrụ okwu ** (ma ọ bụrụ na ọdabara)

* If your wallet supports a seed backup, use Restore from Seed Phrase in Zallet.
* This only works if your zcashd wallet was derived from a seed (or you have seed conversion).

** Nyocha na mmekọrịta nke obere akpa ego **

* Ozugbo e webatara mkpịsị ugodi ndị ahụ, Zallet ga-eme ka a nyochaghachi agbụ ígwè ahụ site na Zebrad.
* Nye Zallet oge iji wughachi nguzo gị na akụkọ azụmahịa gị.

** 7. Lelee nguzozi na Sync **

Ozugbo ebubata ya, Zallet ga-ejikọ na Zebrad node gị ma nyochagharịa blockchain.
Mgbe synchronization zuru ezu, nguzo gị na azụmahịa kwesịrị ịpụta kpọmkwem dị ka tupu.

Ị nwere ike ịchọpụta ọnọdụ sync gị site na ịgba ọsọ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Ihe osise]](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Ma ọ bụ na-enyocha ihe ndekọ.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Ihe osise]](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Nchọpụta nsogbu**

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

**9. nkwubi okwu**

Migrating from zcashd to Zebrad and Zallet gives you a faster, safer, and more modern Zcash experience.
With Rust-based security, modular design, and better tooling, this setup ensures your node and wallet remain future-ready as the Zcash ecosystem continues to evolve.

Ndụmọdụ: Debe igodo obere akpa gị na-anọghị n'ịntanetị ma na-echekwa data Zallet gị mgbe niile.
Gaa na [zebra.zfnd.org]](https://zebra.zfnd.org) na [zallet.zfnd.org](https://zallet.zfnd.org) maka mmelite na nkwado obodo.
