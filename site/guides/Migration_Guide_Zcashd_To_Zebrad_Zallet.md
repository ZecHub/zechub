# Migration Guide: From zcashd to Zebrad/Zallet

The traditional zcashd full node, maintained by *Electric Coin Company (ECC)* / *Zodl*, has been replaced by Zebra and Zallet. zcashd reached its end-of-support halt on 18 July 2026 and no longer runs.

- Zebra is a modern Rust implementation of the Zcash protocol developed by the Zcash Foundation
- Zallet is a lightweight wallet built to interface seamlessly with Zebra nodes developed by Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

This guide walks you through the migration from **Zcashd** to **Zebrad** and **Zallet**, including setup, wallet import, and troubleshooting common migration issues.

---

## zcashd stopped running on 18 July 2026

**What this means**

- zcashd reached its end-of-support halt on 18 July 2026. It will not sync to the chain tip again, and it cannot send or receive funds. This is finished, not planned.
- zcashd's two jobs are now split: **zebrad** is the full node, and **Zallet** is the wallet.
- Zallet is in **beta**. Breaking changes can occur between releases, and some zcashd JSON-RPC methods are not implemented yet. Check the [method status matrix](https://zcash.github.io/zallet/) before you depend on a specific call.
- If you still hold **Sprout** funds, read the warning in step 6 first. Zallet does not support the Sprout pool, and the usual way to move those funds required a running zcashd.

**Why Migrate - Beyond Deprecation**

Even leaving deprecation aside, there are compelling reasons to move:
- Security & Robustness: Rust's memory-safety and modern tooling reduce risks of vulnerabilities.
- Performance & Efficiency: Zebrad is designed for parallelism, more efficient resource usage, and faster sync.
- Modular Architecture: Separating node logic (Zebrad) from wallet UI (Zallet) offers clearer boundaries and better upgrade paths.
- Future Ecosystem Compatibility: Tools, enhancements, and the rest of Zcash's ecosystem will increasingly target Zebrad/Zallet.
- Peace of Mind: Avoid being stuck running a deprecated, unsupported component.

### Now let's dive into the Migration guide

**1. Backup Everything**
* Backup your wallet.dat (or any other wallet file / key store) from your zcashd node.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Save your zcash.conf and any custom settings.
* Export a copy of any RPC scripts or automation you use.
* Verify that your backups are valid (e.g. in another environment, try to open or inspect them).
* Review which JSON-RPC methods you're currently relying on.
* Compare against the planned compatibility table maintained on the [Zcash support site](https://z.cash/support/zcashd-deprecation/) 
* Prepare for changes or missing methods (some might need workaround or adaptation).

**2. System Requirements & Disk Space**
* Disk space is the requirement people underestimate. The Zcash chain passed **270 GB** in August 2026, so allow at least **300 GB** of free space, on an SSD if you can.
* Ensure your machine has stable network, CPU, RAM.
* An internet connection 
* If you plan to compile from source, have Rust & Cargo installed.

**3. Install / Setup Zebrad**
You can either download a prebuilt binary or build from source.
* The Zcash Foundation publishes releases and binaries for Zebra. E.g. you might use an install script or download the appropriate binary for your OS.

* Note that in recent Zebra versions, [the RPC endpoint is no longer enabled by default in Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Option A: Install via prebuilt binary**  
On **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

This installs the latest stable version of zebrad.

**Option B: Build from source**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

After building, move the binary into your path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuration & Launch**  
Generate a default config:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edit **zebrad.toml** to your preferences (listen address, ports, state directory, caching).

**Start the node:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

The node will begin syncing from genesis - expect several hours (or more) depending on hardware and network.

**5. Install / Setup Zallet (Wallet)**

Zallet is designed to replace the wallet portion of zcashd.

Check the Zallet GitHub / release page for binaries.

**Or build from source:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Launch the GUI or CLI (as your installation provides).
* Configure it to connect to your local Zebrad node via RPC or API endpoint.

**6. Importing Your zcashd Wallet into Zallet**

You do not need a running zcashd for this. Zallet reads the `wallet.dat` file directly, which matters because zcashd can no longer be started.

> **Keep `wallet.dat`.** The migration reports anything it cannot represent in a Zallet wallet instead of importing it, and that key material then exists only in `wallet.dat`. Do not delete it after migrating.

Run `zallet init-wallet-encryption` first. Zallet encrypts key material to an age identity, and that identity has to exist before any keys are imported.

Then convert your config and your wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` is only present in builds with the `zcashd-import` feature, and reading `wallet.dat` needs the `db_dump` utility from Berkeley DB 6.2, the version zcashd used. If you have more than one wallet file, run the command once per file and add `--allow-multiple-wallet-imports` on the later runs; each becomes its own set of accounts. Your `rpcuser` and `rpcpassword` are not carried over, because Zallet's JSON-RPC uses cookie authentication by default; add credentials with `zallet add-rpc-user` if you need them.

**What comes across**

* Mnemonic seeds and the keys derived from them, with accounts rebuilt to match the zcashd wallet
* Standalone imported Sapling spending keys and transparent keys
* Transparent watch-only entries that include their public key or redeem script
* Account birthdays, so chain scanning starts at the right height

**What does not come across.** These are reported with counts rather than imported:

* **Sprout spending keys and funds.** Zallet does not support the Sprout pool. The documented route was to move Sprout funds out using zcashd before retiring it, and that is no longer possible. If this affects you, ask on the [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) or the [community forum](https://forum.zcashcommunity.com/) before doing anything else.
* Address book entries
* Watch-only entries stored without a public key or redeem script, and entries with uncompressed public keys
* Regtest wallets

**Backing up afterwards.** A mnemonic on its own is not a complete backup, because imported keys exist only in the wallet database. Keep secure copies of `wallet.db`, the age encryption identity file named by the `keystore.encryption_identity` option, and your mnemonic phrase, and keep the original `wallet.dat`. Note that `wallet.db` is not itself encrypted: it holds your transaction history and viewing keys in the clear, so store the backup somewhere safe.

**Wallet Rescan & Synchronization**

* Once the keys are imported, Zallet will trigger a rescan of the chain via Zebrad.
* Allow some time for Zallet to rebuild your balance and transaction history.

**7. Verify Balances and Sync**

Once imported, Zallet will connect to your Zebrad node and rescan the blockchain.
When synchronization completes, your balances and transactions should appear exactly as before.

You can verify your node's sync status by running:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Or check logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Troubleshooting**

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

**9. Conclusion**

Migrating from zcashd to Zebrad and Zallet gives you a faster, safer, and more modern Zcash experience.
With Rust-based security, modular design, and better tooling, this setup ensures your node and wallet remain future-ready as the Zcash ecosystem continues to evolve.

Tip: Keep your wallet keys offline and regularly back up your Zallet data.
Visit [zebra.zfnd.org](https://zebra.zfnd.org) for Zebra, and [The Zallet Book](https://zcash.github.io/zallet/) or the [Zallet repository](https://github.com/zcash/zallet) for Zallet. The [Migrating from zcashd](https://zcash.github.io/zallet/) chapter of The Zallet Book is the authoritative reference for step 6.
