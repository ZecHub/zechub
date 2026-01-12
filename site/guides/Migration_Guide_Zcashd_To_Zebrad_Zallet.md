# Migration Guide: From zcashd to Zebrad/Zallet

The Zcash ecosystem is evolving. The traditional zcashd full node, maintained by the *Electric Coin Company (ECC)*, is gradually being complemented by Zebra — a modern, efficient Rust implementation of the Zcash protocol developed by the Zcash Foundation — and Zallet, a lightweight wallet built to interface seamlessly with Zebra nodes.

![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)


This guide walks you through the migration from **`zcashd`** to **`Zebrad`** and **`Zallet`**, including setup, wallet import, and troubleshooting common migration issues.


---

## Zcash project has formally announced that zcashd will be deprecated in 2025.


**Deprecation Status & What It Means**

- The Zcash project has formally announced that zcashd will be deprecated in 2025.
- Full nodes are being migrated to Zebrad, a Rust implementation, while Zallet is intended to succeed the wallet component of zcashd. 
- In response, the Zebra project tracks a “Zcashd Deprecation” milestone to ensure compatibility, RPC migration, and ecosystem support.
- For many RPC methods, Zebrad/Zallet will aim to be drop-in replacements (emulating or matching behavior). Others will change or may not be supported.


**Why Migrate — Beyond Deprecation**

Even leaving deprecation aside, there are compelling reasons to move:
- Security & Robustness: Rust’s memory-safety and modern tooling reduce risks of vulnerabilities.
- Performance & Efficiency: Zebrad is designed for parallelism, more efficient resource usage, and faster sync.
- Modular Architecture: Separating node logic (Zebrad) from wallet UI (Zallet) offers clearer boundaries and better upgrade paths.
- Future Ecosystem Compatibility: Tools, enhancements, and the rest of Zcash’s ecosystem will increasingly target Zebrad/Zallet.
- Peace of Mind: Avoid being stuck running a deprecated, unsupported component.

### Now let's dive into the Migration guide

**1. Backup Everything**
* Backup your wallet.dat (or any other wallet file / key store) from your zcashd node.
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
* Save your zcash.conf and any custom settings.
* Export a copy of any RPC scripts or automation you use.
* Verify that your backups are valid (e.g. in another environment, try to open or inspect them).
* Review which JSON-RPC methods you're currently relying on.
* Compare against the planned compatibility table maintained on the [Zcash support site](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Prepare for changes or missing methods (some might need workaround or adaptation).
# 
**2. System Requirements & Disk Space**
* Ensure you have sufficient disk space (Zcash chain is large).At least 10 GB of free disk space.
* Ensure your machine has stable network, CPU, RAM.
An internet connection 
* If you plan to compile from source, have Rust & Cargo installed.
# 
**3. Install / Setup Zebrad**
You can either download a prebuilt binary or build from source.
* The Zcash Foundation publishes releases and binaries for Zebra.E.g. you might use an install script or download the appropriate binary for your OS.

* Note that in recent Zebra versions, [the RPC endpoint is no longer enabled by default in Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)
**Option A: Install via prebuilt binary**
On `Linux`/`macOS`:
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
This installs the latest stable version of zebrad.

**Option B: Build from source**
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)


After building, move the binary into your path:
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
# 
**4. Configuration & Launch**
Generate a default config:
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
Edit zebrad.toml to your preferences (listen address, ports, state directory, caching).

**Start the node:**
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)

The node will begin syncing from genesis — expect several hours (or more) depending on hardware and network.

# 
**5. Install / Setup Zallet (Wallet)**

Zallet is designed to replace the wallet portion of zcashd.

Check the Zallet GitHub / release page for binaries.

**Or build from source:**
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)

* Launch the GUI or CLI (as your installation provides).
* Configure it to connect to your local [Zebrad node via RPC or API endpoint.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)
# 
**6. Importing Your zcashd Wallet into Zallet**
Via Private Key Dump

On zcashd, export your private keys:
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
* In Zallet, choose Import Keys or similar option.
* Point it to zcashd_keys.txt. 
* Zallet should parse and import ZEC addresses and associated keys.

**Via Seed Phrase** (if applicable)

* If your wallet supports a seed backup, use Restore from Seed Phrase in Zallet.
* This only works if your zcashd wallet was derived from a seed (or you have seed conversion).

**Wallet Rescan & Synchronization**

* Once the keys are imported, Zallet will trigger a rescan of the chain via Zebrad.
* Allow some time for Zallet to rebuild your balance and transaction history.


#
**7 Verify Balances and Sync**

Once imported, Zallet will connect to your Zebrad node and rescan the blockchain.
When synchronization completes, your balances and transactions should appear exactly as before.

You can verify your node’s sync status by running:
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)

Or check logs.
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
#

**8. Troubleshooting**


| Issue              | Possible Cause            | Solution |
| ------------------ | ------------------------- | -------- |
|                                      | |
| **Zebrad won’t start**           | Port in use or bad config          | Check `zebrad.toml` and use a free port  |
| **Slow sync**                    | Network congestion                 | Ensure stable internet, restart Zebrad   |
| **Wallet missing transactions**  | Partial key import                 | Re-import keys or rescan in Zallet       |
| **Zallet can’t connect to node** | Node not running or wrong endpoint | Start Zebrad and verify correct RPC port |
| **Zallet crashes**               | Outdated build                     | Update to latest release from GitHub     |
                  

# 
**9. Conclusion**

Migrating from zcashd to Zebrad and Zallet gives you a faster, safer, and more modern Zcash experience.
With Rust-based security, modular design, and better tooling, this setup ensures your node and wallet remain future-ready as the Zcash ecosystem continues to evolve.

💡 Tip: Keep your wallet keys offline and regularly back up your Zallet data.
Visit zebra.zfnd.org
 and zallet.zfnd.org
 for updates and community support.
