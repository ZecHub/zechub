# Tukɔ Akwankyerɛ: Efi zcashd kɔ Zebrad/Zallet

Amanneɛ kwan so zcashd full node, a *Electric Coin Company (ECC)* / *Zodl* na ɛhwɛ so no, wɔde Zebra ne Zallet asi ananmu. zcashd duu ne mmoa awieeɛ gyinabea wɔ 18 Ɔpɛpɔn 2026 na ɛntu mmirika bio.

- Zebra yɛ nnɛyi Rust dwumadie a ɛfa Zcash protocol a Zcash Foundation na ɛyɛeɛ no ho
- Zallet yɛ sika kotoku a emu yɛ hare a wɔasi sɛnea ɛbɛyɛ a ɛne Zebra nodes a Zodl ayɛ no bedi nkitaho a ɛnyɛ den

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Saa akwankyerɛ yi de wo nantew fa tu a ɛfiri **Zcashd** kɔ **Zebrad** ne **Zallet** mu, a nhyehyeɛ, sika kotokuo a wɔde ba, ne ɔhaw a ɛfa atutena a ɛtaa ba ho dwumadie ka ho.

---

## zcashd gyaee mmirikatuo wɔ 18 Ɔpɛpɔn 2026

**Nea eyi kyerɛ**

- zcashd duu ne end-of-support halt wɔ 18 July 2026. Ɛrenhyia nkɔnsɔnkɔnsɔn tip no bio, na entumi mfa sika nkɔma anaasɛ ennye sika. Eyi yɛ nea wɔawie, ɛnyɛ nea wɔayɛ ho nhyehyɛe.
- zcashd nnwuma mmienu no mu apaapae seesei: **zebrad** yɛ node a ɛyɛ ma, na **Zallet** yɛ sika kotokuo.
- Zallet wɔ **beta** mu. Nsakraeɛ a ɛbubuu betumi aba wɔ nsɛm a wɔayi no adi ntam, na wɔmfa zcashd JSON-RPC akwan bi nni dwuma de besi nnɛ. Hwɛ sɛnea [ɔkwan a wɔfa so yɛ tebea matrix](https://zcash.github.io/zallet/) ansa na wode wo ho ato ɔfrɛ pɔtee bi so.
- Sɛ woda so ara kura **Sprout** sika a, kenkan kɔkɔbɔ a ɛwɔ anammɔn 6 no kan. Zallet ntumi mmoa Sprout pool no, na ɔkwan a wɔtaa fa so de saa sika no kɔ baabi foforo no hwehwɛɛ sɛ wonya zcashd a ɛretu mmirika.

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
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Sie wo zcash.conf ne nhyehyɛe biara a wɔahyɛ da ayɛ.
* Fa RPC scripts anaa automation biara a wode di dwuma no bi kɔ amannɔne.
* Hwɛ sɛ wo backups no yɛ adwuma (e.g. wɔ beae foforo, bɔ mmɔden sɛ wubebue anaa wobɛhwɛ).
* Hwɛ JSON-RPC akwan a wode wo ho to so mprempren no mu.
* Fa toto nhyehyɛe a wɔayɛ sɛ ɛne ne ho hyia pon a wɔahwɛ so wɔ so no ho [Zcash mmoa wɛbsaet](https://z.cash/support/zcashd-deprecation/) 
* Siesie wo ho ma nsakrae anaa akwan a ɛyera (ebia ebinom behia sɛ wodi ho dwuma anaasɛ wɔyɛ nsakrae).

**2.1. System Ahwehwɛde & Disk Space** .
* Disk space ne ahwehwɛde a nkurɔfo bu no adewa. Zcash nkɔnsɔnkɔnsɔn no twaam **270 GB** wɔ August 2026 mu, enti ma anyɛ yiye koraa no **300 GB** kwan ma baabi a ɛnyɛ hwee, wɔ SSD so sɛ wubetumi a.
* Hwɛ sɛ wo mfiri no wɔ network, CPU, RAM a ɛyɛ den.
* Intanɛt nkitahodi bi 
* Sɛ woayɛ nhyehyɛe sɛ wobɛboaboa ano afi fibea a, ma Rust & Cargo nhyɛ mu.

**3.1. Install / Setup Zebrad** .
Wubetumi atwe binary a wɔadi kan ayɛ anaasɛ wobɛkyekye afi fibea.
* Zcash Foundation tintim nsɛm a wɔayi no adi ne binaries ma Zebra. S.e., s.e. wobɛtumi de install script adi dwuma anaasɛ wobɛtwe binary a ɛfata ama wo OS.

* Hyɛ no nsow sɛ wɔ Zebra nkyerɛase ahorow a aba nnansa yi mu no, . [RPC awiei no ntumi nyɛ adwuma bio default wɔ Docker mu.](https://zfnd.org/zebra-2-3-0-release/)

**Ɔkwan A: Fa binary a wɔadi kan ayɛ so instɔlehyɛn** 
Wɔ **Linux**/**macOS** so no:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Eyi de zebrad a ɛyɛ pintinn a aba foforo no hyɛ mu.

**Option B: Si fi fibea**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Sɛ wosi wie a, fa binary no kɔ wo kwan so:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4.1. Nsiesiei & Fi ase** 
Yɛ nhyehyɛe a wɔahyɛ da ayɛ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Sesa **zebrad.toml** sɛnea wopɛ (tie address, ports, state directory, caching).

**Fi ase node no:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Node no befi ase ayɛ syncing fi genesis - hwɛ kwan sɛ nnɔnhwerew pii (anaa nea ɛboro saa) gyina hardware ne network so.

**5.1. Fa / Setup Zallet (Wallet)** .

Wɔayɛ Zallet sɛ ɛbɛsesa zcashd sika kotoku fã no.

Hwɛ Zallet GitHub / release krataafa no ma binaries.

**Anaasɛ wokyekye fi fibea:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Fi ase GUI anaa CLI (sɛnea wo instɔlehyɛn no ma).
* Hyehyɛ no sɛnea ɛbɛyɛ a ɛnam RPC anaa API awiei so nkɔ wo mpɔtam hɔ Zebrad node no so.

**6. Wo zcashd Wallet a wode bɛba Zallet** mu.

Wonhia zcashd a ɛretu mmirika mma eyi. Zallet kenkan sɛ `wallet.dat` fael no tẽẽ, a ɛho hia efisɛ wontumi mfi zcashd ase bio.

> **Kora `wallet.dat`.** Tukɔ no bɔ biribiara a entumi nnyina hɔ mma wɔ Zallet sika kotoku mu ho amanneɛ sen sɛ ɛde bɛba, na saa ade titiriw no afei ɛwɔ hɔ wɔ mu nkutoo `wallet.dat`. Mpopa no bere a woatu akɔtra baabi foforo awie no.

Dwane `zallet init-wallet-encryption` deɛ ɛdi kan. Zallet de key material encrypt kɔ mfeɛ a wɔadi, na ɛsɛ sɛ saa identity no wɔ hɔ ansa na wɔde key biara aba.

Afei dane wo config ne wo wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` no nkutoo na ɛwɔ hɔ wɔ builds ne `zcashd-import` afã, ne akenkan `wallet.dat` hia sɛ `db_dump` utility a efi Berkeley DB 6.2, nkyerɛase a zcashd de dii dwuma. Sɛ wowɔ wallet fael bɛboro biako a, tu ahyɛde no pɛnkoro wɔ fael biara mu na fa ka ho `--allow-multiple-wallet-imports` wɔ mmirikatu a ɛba akyiri yi no so; emu biara bɛyɛ n’ankasa akontaabu ahorow. Wo `rpcuser` ne `rpcpassword` wɔmfa nkɔ, efisɛ Zallet JSON-RPC de kuki ahotoso di dwuma default; fa adansedi nkrataa ka ho `zallet add-rpc-user` sɛ wuhia wɔn a.

**Nea ɛba so**

* Mnemonic aba ne nsafe a wonya fi mu, a wɔasan akyekye akontaabu ahorow sɛnea ɛbɛyɛ a ɛne zcashd sika kotoku no bɛyɛ pɛ
* Standalone de Sapling sika a wɔsɛe no safe ne safe a ɛda adi bae
* Transparent watch-only entries a wɔn public key anaa redeem script ka ho
* Akontaabu awodadi, enti nkɔnsɔnkɔnsɔn scanning fi ase wɔ sorosoro a ɛfata

**Nea ɛnyɛ nea ɛba.** Wɔde akontaabu na ɛbɔ eyinom ho amanneɛ sen sɛ wɔde bɛba amannɔne:

* **Sprout sika a wɔsɛe no safe ne sika.** Zallet ntumi mmoa Sprout pool no. Ɔkwan a wɔakyerɛw ato hɔ ne sɛ wɔde zcashd bɛtu Sprout sika afiri mu ansa na wɔakɔ pɛnhyen, na ɛno ntumi nyɛ yie bio. Sɛ eyi ka wo a, bisa wɔ... [Zcash R&D Nkitahodi](https://discord.gg/xpzPR53xtU) anaasɛ nea [mpɔtam hɔfo nhyiam](https://forum.zcashcommunity.com/) ansa na wayɛ biribi foforo biara.
* Address nhoma mu nsɛm a wɔakyerɛw
* Watch-only entries a wɔde asie a public key anaa redeem script nni mu, ne nsɛm a wɔde public keys a wɔanhyɛ no den
* Regtest sika kotoku ahorow

**Backing up akyi.** Mnemonic ankasa nyɛ backup a edi mũ, efisɛ safoa a wɔde aba no wɔ wallet database no nkutoo mu. Fa ne mfonini ahorow sie yiye `wallet.db`, mfeɛ encryption identity file a wɔde din ato so no `keystore.encryption_identity` option, ne wo mnemonic phrase, na fa mfitiase de no sie `wallet.dat`. Hyɛ no nsow sɛ `wallet.db` ɛnyɛ n’ankasa encrypted: ɛkura wo transaction abakɔsɛm ne viewing keys wɔ clear, enti fa backup no sie baabi a ahobammɔ wɔ.

**Wallet Rescan & Nsɛm a Wɔahyehyɛ**

* Sɛ wɔde safe no ba wie a, Zallet bɛkanyan nkɔnsɔnkɔnsɔn no rescan denam Zebrad so.
* Ma bere kakra ma Zallet nsan nkyekye wo sika a aka ne wo nkitahodi ho abakɔsɛm.

**7. Hwɛ Balances ne Sync** a ɛyɛ nokware.

Sɛ wɔde ba wie a, Zallet bɛka wo Zebrad node no ho na asan ahwɛ blockchain no.
Sɛ synchronization wie a, ɛsɛ sɛ wo balances ne transactions da adi sɛnea na ɛte kan no pɛpɛɛpɛ.

Wubetumi ahwɛ sɛ wo node no sync tebea no yɛ nokware denam mmirikatu a wobɛma so:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Anaasɛ hwɛ logs mu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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
Sra [zebra.zfnd.org na ɛwɔ hɔ](https://zebra.zfnd.org) for Zebra, and [Zallet Nhoma no](https://zcash.github.io/zallet/) anaasɛ nea [Zallet akoraeɛ](https://github.com/zcash/zallet) ma Zallet. No [Tu a wotu fi zcashd](https://zcash.github.io/zallet/) The Zallet Book ti no ne tumi krataa a wɔde kyerɛw anammɔn 6 no.
