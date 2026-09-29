# Ntuziaka Mbugharị: Site na zcashd ruo Zebrad/Zallet

Zcashd zuru oke, nke *Electric Coin Company (ECC) * / *Zodl* na-elekọta ya ka Zebra na Zallet dochiri. zcashd ruru njedebe nkwado ya na 18 July 2026 ma ọ naghịzi agba ọsọ.

- Zebra bụ mmejuputa Rust nke oge a na usoro Zcash mepụtara site n'aka ụlọ ọrụ Zcash Foundation.
- Zallet bụ obere akpa ego dị mfe e wuru iji jikọta ya na Zebra nodes nke Zodl mepụtara.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

This guide walks you through the migration from **Zcashd** to **Zebrad** and **Zallet**, including setup, wallet import, and troubleshooting common migration issues.

---

## zcashd kwụsịrị ịgba ọsọ na 18 Julaị 2026

**Ihe nke a pụtara**

- zcashd ruru njedebe nkwado ya na 18 Julaị 2026. Ọ gaghị emekọrịta ọzọ na isi nke agbụ, ọ nweghịkwa ike izipu ma ọ bụ nata ego. Nke a emechara, abụghị atụmatụ.
- zcashd's two jobs are now split: **zebrad** is the full node, and **Zallet** is the wallet.
- Zallet bụ na ** beta**. Mgbanwe mgbanwe nwere ike ime n'etiti ntọhapụ, ụfọdụ usoro zcashd JSON-RPC emebeghị ka ọ dị ugbu a. Lelee ihe ndị ahụ [usoro ọnọdụ matriks](https://zcash.github.io/zallet/) tupu ị dabere na oku a kapịrị ọnụ.
- Ọ bụrụ na ị ka nwere **Sprout** ego, gụọ ọkwa ahụ n'ọzọ 6 mbụ. Zallet anaghị akwado ọdọ mmiri Sprout, ụzọ a na-ejikarị ebugharị ego ndị ahụ chọrọ zcashd na-agba ọsọ.

**Ihe Mere A Ga-eji Kwapụ - Ọ Bụghị Ịdị Na-eleda Mmadụ Anya**

Ọbụna ma e wezụga inwe obi nkoropụ, e nwere ihe ndị gbara ọkpụrụkpụ mere a ga-eji kwaga ebe ọzọ:
- Nchekwa na ike: nchekwa ncheta Rust na ngwa ọrụ ọgbara ọhụrụ belata ihe ize ndụ nke adịghị ike.
- Arụmọrụ & arụmọrụ: Zebrad ka e mere maka ịmekọrịta, iji ihe eji eme ihe n'ụzọ dị irè karị na ngwa sync.
- Modular Architecture: Iche iche n'echiche (Zebrad) site na obere akpa UI (Zallet) na-enye oke ala doro anya ma melite ụzọ ka mma.
- Njikọ nke Ọdịnihu Ecosystem: Ngwá ọrụ, nkwalite na ndị ọzọ nke usoro okike Zcash ga-elekwasị anya Zebrad / Zallet.
- Udo nke uche: Zere ịbụ onye a na-ejide iji mee ihe dị njọ, akwadoghị.

### Ugbu a ka anyị banye n'ime ntuziaka Mbugharị.

** 1. ndabere Ihe niile**
* Nweta nchekwa wallet.dat gị (ma ọ bụ faịlụ akpa ego / isi ụlọ ahịa) site na zcashd node gị .

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Chekwaa zcash.conf gị na ntọala ọ bụla omenala .
* Mbupụ otu edemede RPC ọ bụla maọbụ akpaaka ị na-eji.
* Nyochaa na nkwado ndabere gị dị mma (dịka ọmụmaatụ, n'ime gburugburu ebe ọzọ, gbalịa imeghe ma ọ bụ nyochaa ha).
* Nyochaa usoro JSON-RPC nke ị na - adabere ugbu a.
* Tụlee ya na tebụl ndakọrịta a haziri ahazi nke e debere n'akwụkwọ akụkọ ahụ. [Ebe nkwado Zcash](https://z.cash/support/zcashd-deprecation/) 
* Kwadebe maka mgbanwe ma ọ bụ usoro ndị na-efu (ụfọdụ nwere ike ịchọ ọrụ gburugburu ma ọ bụkwanụ imezi ya).

**2. System chọrọ & Disk Space**
* Oghere diski bụ ihe ndị mmadụ na-eleda anya. Zcash chain gafere ** 270 GB** n'August 2026, yabụ hapụ ma ọ dịkarịa ala ** 300 GB** nke ohere efu, na SSD ma ị nwere ike.
* Jide n'aka na igwe gị nwere netwọkụ kwụsiri ike, CPU, RAM.
* Njikọ Ịntanetị 
* Ọ bụrụ na ị ga-eme atụmatụ iji mepụta site na isi iyi, wụnye Rust & Cargo.

** 3. Wụnye / Nhazi Zebrad**
Ị nwere ike ibudata ọnụọgụ abụọ e wuru tupu oge ma ọ bụ wuo site na isi iyi.
* Zcash Foundation na-ebipụta mbipụta na ọnụọgụ abụọ maka Zebra. Dịka ọmụmaatụ, ị nwere ike iji edemede wụnye ma ọ bụ budata ọnụọgba kwesịrị ekwesị maka OS gị.

* Rịba ama na n'ụdị Zebra ndị ọhụrụ, [njedebe RPC anaghịzi enyere ya aka na ndabara na Docker.](https://zfnd.org/zebra-2-3-0-release/)

** Nhọrọ A: Wụnye site na ngwaike nke emebere tupu** 
Na ** Linux**/** macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

This installs the latest stable version of zebrad.

** Nhọrọ B: Wụpụta site na isi iyi**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Mgbe i wuchara ya, bugharịa binary ahụ n'ụzọ gị:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Nhazi & Mwepụta** 
Mepụta nhazi ndabara:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Dezie **zebrad.toml** na mmasị gị (ịge ntị adreesị, ọdụ ụgbọ mmiri, ndekọ steeti, caching).

** Malite ọnụ:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Njikọ ahụ ga-amalite syncing site na mmalite - atụ anya ọtụtụ awa (ma ọ bụ karịa) dabere na ngwaike na netwọk.

** 5. Wụnye / Nhazi Zallet (Wallet)**

Ezubere Zallet iji dochie akụkụ akpa ego nke zcashd.

Lelee Zallet GitHub / wepụta peeji maka ọnụọgụ abụọ.

**Ma ọ bụ wuru site na isi iyi:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Mepee GUI ma ọ bụ CLI (dị ka nrụnye gị nyere).
* Hazie ya ka ọ jikọọ na mpaghara Zebrad gị site na RPC ma ọ bụ API endpoint.

** 6. Ịbubata gị zcashd obere akpa n'ime Zallet**

Ị chọghị zcashd na-agba ọsọ maka nke a. Zallet gụrụ ya `wallet.dat` faịlụ ozugbo, nke dị mkpa n'ihi na zcashd enweghị ike ịmalite.

> **Nọgide na-eme ya. `wallet.dat`.** Mbugharị na-akọ ihe ọ bụla o nwere ike ghara ịnọchite anya ya n'ime obere akpa Zallet kama ibubata ya, ma isi ihe ahụ dị naanị na akaụntụ. `wallet.dat`. Ehichapụla ya mgbe ị kwagara.

Gbaa ọsọ . `zallet init-wallet-encryption` Zallet na-ezipụ ihe dị mkpa maka njirimara afọ, ma onye ahụ ga - adị tupu ebubata igodo ọ bụla.

Mgbe ahụ gbanwee nhazi gị na obere akpa gị:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` bụ naanị ugbu a na-ewu ya na ndị ahụ. `zcashd-import` ihe, na ịgụ ya. `wallet.dat` chọrọ ndị ahụ. `db_dump` ihe enyemaka site na Berkeley DB 6.2, mbipute zcashd eji. Ọ bụrụ na ị nwere karịa otu faịlụ wallet, gbaa iwu ahụ ozugbo maka faịlụ ma gbakwunye `--allow-multiple-wallet-imports` na-esote aga; onye ọ bụla na-aghọ ya set nke akaụntụ. gị `rpcuser` na nke a: `rpcpassword` a naghị ebugharị ya, n'ihi na Zallet JSON-RPC jiri kuki nyochaa site na ndabara; tinye nzere na `zallet add-rpc-user` ma ọ bụrụ na ị chọrọ ha.

** Ihe na-abịa gafee**

* Mnemonic mkpụrụ na igodo ndị sitere n'aka ha, yana akaụntụ e wughachiri iji kwekọọ na obere akpa zcashd
* Standalone dị Sapling mmefu igodo na uzo igodo
* Ntinye ederede naanị elekere na-agụnye igodo ọha ma ọ bụ edemede mgbapụta ha.
* Ụbọchị ọmụmụ akaụntụ, ya mere na-amalite nyocha nke agbụ ahụ n'ogologo kwesịrị ekwesị

**Ihe na-adịghị abịa gafee.** Ndị a kọrọ ọnụ kama dị ka ihe ndị e webatara:

* ** Igodo na ego nke Sprout.** Zallet anaghị akwado ogbe mmiri. Ụzọ a kwadoro bụ ịkwaga ego ọmụrụ nwa site n'iji zcashd tupu ezumike nká, ma nke ahụ agaghịzi ekwe omume. Ọ bụrụ na nke a metụtara gị, jụọ maka ya [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) ma ọ bụ na- [ọgbakọ obodo](https://forum.zcashcommunity.com/) tupu m emee ihe ọ bụla ọzọ.
* Ihe ndị e dere n'akwụkwọ adreesị gị .
* Ihe edere naanị-ekiri echekwara na enweghị igodo ọha ma ọ bụ script mgbapụta, yana ihe ndenye nwere mkpịsị ugodi ndị a na - ejighị arụ ọrụ.
* Regtest wallets (akpa ego ndị a na-ejigide)

**Idebe azụ mgbe.** Ihe ncheta n'onwe ya abụghị nkwado zuru ezu, n'ihi na igodo ndị a webatara dị naanị na nchekwa data wallet. Debe akwụkwọ nche nke ihe niile ị chọrọ iji mee ka ọ bụrụ eziokwu ma nwee ike ịchọta ha ọzọ. `wallet.db`, afọ izo ya ezo njirimara faịlụ aha site na ndị ọrụ nke ụlọọrụ ahụ. `keystore.encryption_identity` nhọrọ, na gị mnemonic ahịrịokwu ahụ, ma debe mbụ `wallet.dat`Rịba ama na . `wallet.db` abụghị nke ezoro ezo: ọ na-ejide akụkọ azụmahịa gị ma lee igodo n'ụzọ doro anya, yabụ chekwaa nkwado ndabere ahụ ebe dị nchebe.

** Nnyocha na mmekọrịta nke obere akpa ego**

* Ozugbo e webatara igodo ndị ahụ, Zallet ga-eme ka a nyochaghachi agbụ ígwè site na Zebrad.
* Nye Zallet oge iji wughachi nguzozi gị na akụkọ azụmahịa.

** 7. Lelee nguzozi na Sync**

Ozugbo ebubata, Zallet ga-ejikọ na Zebrad gị ma nyochaa blockchain.
Mgbe emechara mmekọrịta, nguzo gị na azụmahịa ga-apụta kpọmkwem dị ka ọ dịbu.

Ị nwere ike ịchọpụta ọnọdụ sync nke ọnụ gị site na ịgba ọsọ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ma ọ bụ nyochaa ihe ndekọ.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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

Ịkwaga site na zcashd gaa Zebrad and Zallet na-enye gị ngwa ngwa, nchekwa dị mma karị, yana ahụmịhe Zcash nke oge a.
With Rust-based security, modular design, and better tooling, this setup ensures your node and wallet remain future-ready as the Zcash ecosystem continues to evolve.

Ndụmọdụ: Debe igodo obere akpa gị na-anọghị n'ịntanetị ma mee nkwado ndabere nke data Zallet gị mgbe niile.
Ịga leta ya . [zebra.zfnd.org](https://zebra.zfnd.org) maka Zebra, na [Akwụkwọ Zallet ahụ .](https://zcash.github.io/zallet/) ma ọ bụ na- [Ebe nchekwa Zallet](https://github.com/zcash/zallet) maka Zallet. The [Ịkwaga site na zcashd](https://zcash.github.io/zallet/) chapter of The Zallet Book is the authoritative reference for step 6.
