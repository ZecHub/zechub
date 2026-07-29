# Tukɔ Akwankyerɛ: Efi zcashd kɔ Zebrad/Zallet

Zcash abɔde a nkwa wom nhyehyɛe no renya nkɔso. Amanneɛ kwan so Zcashd full node, a *Electric Coin Company (ECC)* / *Zodl* na ɛhwɛ so no, wɔde Zebra ne Zallet resi ananmu nkakrankakra.

- Zebra yɛ nnɛyi Rust dwumadie a ɛfa Zcash protocol a Zcash Foundation na ɛyɛeɛ no ho
- Zallet yɛ sika kotoku a emu yɛ hare a wɔasi sɛnea ɛbɛyɛ a ɛne Zebra nodes a Zodl ayɛ no bedi nkitaho a ɛnyɛ den

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![NkɔmmɔbɔGPTImfoniniOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Saa akwankyerɛ yi de wo nantew fa tu a ɛfiri **Zcashd** kɔ **Zebrad** ne **Zallet** mu, a nhyehyeɛ, sika kotokuo a wɔde ba, ne ɔhaw a ɛfa atutena a ɛtaa ba ho dwumadie ka ho.

---

## Zcash adwuma no abɔ amanneɛ wɔ ɔkwan a ɛfata so sɛ wɔbɛgyae zcashd wɔ afe 2025 mu.

**Deprecation Status & Nea Ɛkyerɛ**

- Zcash adwuma no abɔ amanneɛ wɔ ɔkwan a ɛfata so sɛ wɔbɛgyae zcashd wɔ afe 2025 mu.
- Wɔretu nodes a edi mũ akɔ Zebrad, Rust dwumadie bi, berɛ a wɔayɛ Zallet sɛ ɛbɛdi zcashd sika kotokuo fã no akyi. 
- Wɔ mmuaema mu no, Zebra adwuma no di "Zcashd Deprecation" botaeɛ bi akyi de hwɛ sɛ ɛne ne ho hyia, RPC atutena, ne abɔdeɛ a nkwa wom mmoa.
- Wɔ RPC akwan pii mu no, Zebrad/Zallet bɛbɔ ne tirim sɛ ɛbɛyɛ drop-in replacements (emulating anaa matching suban). Afoforo nso bɛsesa anaasɛ ebia wɔremmoa.

**Nea enti a wotu kɔtra baabi foforo - Beyond Deprecation**

Sɛ yɛgyae animtiaabu mpo a, ntease ahorow a emu yɛ den wɔ hɔ a enti ɛsɛ sɛ wotu kɔtra baabi foforo:
- Security & Robustness: Rust memory-safety ne nnɛyi nnwinnade brɛ asiane ahorow a ɛwɔ mmerɛwyɛ mu ase.
- Adwumayɛ & Adwumayɛ: Wɔayɛ Zebrad ama parallelism, nneɛma a wɔde di dwuma yiye, ne sync ntɛmntɛm.
- Modular Architecture: Sɛ wotetew node logic (Zebrad) mu fi wallet UI (Zallet) ho a, ɛma ahye a emu da hɔ ne akwan a eye a wɔfa so yɛ upgrade.
- Daakye Abɔdeɛ a Nkwa Wom a Ɛne Nkɔsoɔ: Nnwinnadeɛ, nkɔsoɔ, ne Zcash abɔdeɛ a nkwa wom a aka no bɛkɔ so de wɔn ani asi Zebrad/Zallet so.
- Asomdwoe: Kwati sɛ wobɛkɔ so ayɛ adwuma wɔ ade bi a wɔmfa nni dwuma bio a wɔmmoa no mu.

### Afei momma yɛnkɔ Migration akwankyerɛ no mu

**1.1. Backup Biribiara**
* Backup wo wallet.dat (anaasɛ wallet fael foforo biara / safoa store) fi wo zcashd node.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1) .](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Sie wo zcash.conf ne nhyehyɛe biara a wɔahyɛ da ayɛ.
* Fa RPC scripts anaa automation biara a wode di dwuma no bi kɔ amannɔne.
* Hwɛ sɛ wo backups no yɛ adwuma (e.g. wɔ beae foforo, bɔ mmɔden sɛ wubebue anaa wobɛhwɛ).
* Hwɛ JSON-RPC akwan a wode wo ho to so mprempren no mu.
* Fa toto nhyehyɛe a wɔayɛ sɛ ɛne ne ho hyia pon a wɔahwɛ so wɔ [Zcash mmoa beae no ho](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Siesie wo ho ma nsakrae anaa akwan a ɛyera (ebia ebinom behia sɛ wodi ho dwuma anaasɛ wɔyɛ nsakrae).

**2.1. System Ahwehwɛde & Disk Space** .
* Hwɛ sɛ wowɔ disk space a ɛdɔɔso (Zcash chain yɛ kɛse). Anyɛ yiye koraa no, 10 GB a ɛwɔ disk space a wontua hwee.
* Hwɛ sɛ wo mfiri no wɔ network, CPU, RAM a ɛyɛ den.
* Intanɛt nkitahodi bi 
* Sɛ woayɛ nhyehyɛe sɛ wobɛboaboa ano afi fibea a, ma Rust & Cargo nhyɛ mu.

**3.1. Install / Setup Zebrad** .
Wubetumi atwe binary a wɔadi kan ayɛ anaasɛ wobɛkyekye afi fibea.
* Zcash Foundation tintim nsɛm a wɔayi no adi ne binaries ma Zebra. S.e., s.e. wobɛtumi de install script adi dwuma anaasɛ wobɛtwe binary a ɛfata ama wo OS no.

* Hyɛ no nsow sɛ wɔ Zebra nkyerɛaseɛ a ɛtwa toɔ mu no, [RPC endpoint no nnyɛ adwuma bio default wɔ Docker mu.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Ɔkwan A: Fa binary a wɔadi kan ayɛ so instɔlehyɛn** 
Wɔ **Linux**/**macOS** so no:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2) .](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Eyi de zebrad a ɛyɛ pintinn a aba foforo no hyɛ mu.

**Option B: Si fi fibea**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3) .](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Sɛ wosi wie a, fa binary no kɔ wo kwan so:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![tu a wotu kɔtra baabi foforo 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4.1. Nsiesiei & Fi ase** 
Yɛ nhyehyɛe a wɔahyɛ da ayɛ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![tu a wotu kɔtra baabi foforo2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Sesa **zebrad.toml** sɛnea wopɛ (tie address, ports, state directory, caching).

**Fi ase node no:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![mfoni](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Node no befi ase ayɛ syncing fi genesis - hwɛ kwan sɛ nnɔnhwerew pii (anaa nea ɛboro saa) gyina hardware ne network so.

**5.1. Fa / Setup Zallet (Wallet)** .

Wɔayɛ Zallet sɛ ɛbɛsesa zcashd sika kotoku fã no.

Hwɛ Zallet GitHub / release krataafa no ma binaries.

**Anaasɛ wokyekye fi fibea:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![mfoni](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Fi ase GUI anaa CLI (sɛnea wo instɔlehyɛn no ma).
* Hyehyɛ no sɛ ɛnam RPC anaa API endpoint so nkɔ wo mpɔtam hɔ Zebrad node no so.

**6. Wo zcashd Wallet a wode bɛba Zallet** 
Ɛdenam Private Key Dump so

Wɔ zcashd so no, fa wo kokoam safoa no kɔ amannɔne:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4) .](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Wɔ Zallet mu no, paw Import Keys anaa nea ɛte saa.
* Twe adwene si **zcashd_keys.txt** so. 
* Ɛsɛ sɛ Zallet parse na ɛde ZEC address ne keys a ɛbata ho ba.

**Via Seed Phrase** (sɛ ɛfata a) .

* Sɛ wo sika kotoku no boa aba a wɔde sie a, fa Restore from Seed Phrase wɔ Zallet mu di dwuma.
* Eyi yɛ adwuma sɛ wo zcashd sika kotoku no fi aba bi mu (anaasɛ wowɔ aba nsakrae) nkutoo a.

**Wallet Rescan & Nsɛm a Wɔahyehyɛ**

* Sɛ wɔde safe no ba wie a, Zallet bɛkanyan nkɔnsɔnkɔnsɔn no rescan denam Zebrad so.
* Ma bere kakra ma Zallet nsan nkyekye wo sika a aka ne wo nkitahodi ho abakɔsɛm.

**7. Hwɛ Balances ne Sync** a ɛyɛ nokware.

Sɛ wɔde ba wie a, Zallet bɛka wo Zebrad node no ho na asan ahwɛ blockchain no.
Sɛ synchronization wie a, ɛsɛ sɛ wo balances ne transactions da adi sɛnea na ɛte kan no pɛpɛɛpɛ.

Wubetumi ahwɛ sɛ wo node no sync tebea no yɛ nokware denam mmirikatu a wobɛma so:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![mfoni](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Anaasɛ hwɛ logs mu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![mfoni](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8.1. Ɔhaw ahorow ho dwumadie**

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

**9. Awie**

Sɛ wotu fi zcashd kɔ Zebrad ne Zallet a, ɛma wunya Zcash osuahu a ɛyɛ ntɛm, ahobammɔ wom, na ɛyɛ nnɛyi de.
Ɛnam Rust-based security, modular design, ne tooling a ɛyɛ papa nti, saa nhyehyeɛ yi hwɛ sɛ wo node ne wallet no kɔ so yɛ daakye-asiesie berɛ a Zcash ecosystem kɔ so nya nkɔsoɔ.

Afotu: Fa wo sika kotoku safe no sie offline na daa backup wo Zallet data.
Kɔ [zebra.zfnd.org](https://zebra.zfnd.org) ne [zallet.zfnd.org](https://zallet.zfnd.org) ma nsɛm foforo ne mpɔtam hɔfo mmoa.
