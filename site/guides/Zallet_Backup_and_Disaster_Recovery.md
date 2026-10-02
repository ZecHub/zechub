<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zallet_Backup_and_Disaster_Recovery.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet Backup and Disaster Recovery

This page is for **operators** running [Zallet](https://zcash.github.io/zallet/) as the full-node wallet (usually via the [Z3 Stack](/zcash-tech/z3-stack)). It answers: what to copy, what a mnemonic does **not** cover, and how to restore after a disk loss.

Zallet is **beta**. Breaking changes can require deleting and recreating the wallet. Do not treat it as finished custody software for large sums. Canonical backup procedures live in the [Zallet Book — Backup and restore](https://zcash.github.io/zallet/guide/backup.html); this page maps those rules onto a Z3 deployment.

There is **no** single Zallet command that writes a complete backup yet ([zcash/zallet#195](https://github.com/zcash/zallet/issues/195)).

---

## TL;DR

* A complete backup is **`wallet.db` + the age encryption identity file**, taken while Zallet is **stopped**.
* On Z3, both live in the Docker volume `z3-<network>-zallet`. That volume is the only Z3 volume that **must** be backed up.
* A **mnemonic is not a complete backup**. It recovers only accounts derived from that seed. Imported spending keys, watch-only addresses, and `zcashd` migration leftovers exist only in `wallet.db`.
* `wallet.db` as a whole is **not** encrypted. Spending keys inside it are age-encrypted; transaction history and viewing keys are stored in the clear. Treat every copy as privacy-sensitive.
* If you lose the identity file (or its passphrase), key material in every copy of `wallet.db` is permanently undecryptable.

---

## What you are backing up

| Artifact | Where (bare Zallet) | Where (Z3) | If you lose it |
| --- | --- | --- | --- |
| `wallet.db` | `{datadir}/wallet.db` | Inside `z3-<network>-zallet` | History, imported keys, and all key material gone unless you have another copy |
| age identity | `{datadir}/encryption-identity.txt` | Same volume (Z3 stores the identity next to the wallet) | Every `wallet.db` copy becomes undecryptable |
| Each mnemonic | Only after you export and decrypt it | Same | Only HD accounts from that seed; not a full wallet |
| Recovery metadata | Your notes | Your notes | Mnemonic restore cannot rebuild account names/indexes/birthdays without it |

Z3 also has `z3-<network>-chain` (~300 GB mainnet) and `z3-<network>-cookie`. **Do not** treat those as wallet backups. Chain state is re-syncable; the RPC cookie is regenerated on boot.

---

## Taking a backup on Z3

1. **Stop Zallet** for that network. `wallet.db` is SQLite; a copy taken while the process is writing can be torn.

   ```bash
   docker compose --env-file .env.mainnet stop zallet
   ```

2. **Copy the whole `z3-<network>-zallet` volume** to offline storage. It holds the encrypted key store **and** the identity that decrypts it, so a volume snapshot is self-contained: restore it and the wallet opens.

   ```bash
   docker run --rm \
     -v z3-mainnet-zallet:/data \
     -v /mnt/backup:/backup \
     busybox tar -C /data -cvf /backup/zallet-mainnet-$(date +%F).tar .
   ```

3. **Start Zallet again.**

   ```bash
   docker compose --env-file .env.mainnet start zallet
   ```

4. **Keep a second copy of the identity file in a different place** from the `wallet.db` copies. Together they grant full spending access.

5. **Schedule repeats.** The identity file is stable unless you regenerate it. `wallet.db` changes continuously.

If you run Zallet without Docker, stop the process, copy `wallet.db` and `encryption-identity.txt` from the datadir, then start it again. Same rules.

### Encrypting a copy before it leaves your machines

Because `wallet.db` contains cleartext history, encrypt it before any third-party disk or object store:

```bash
age -r <recipient> wallet.db > wallet.db.age
```

Use the wallet's age recipient, or another recipient you control. **Do not** put the identity file in the same encrypted archive as `wallet.db`.

### Mnemonics (necessary, not sufficient)

A phrase Zallet generated exists nowhere else until you export it. Until you confirm the backup, Zallet will not derive new accounts or addresses from that phrase (`keystore.require_backup`, on by default except regtest).

```bash
zallet export-mnemonic --armor --seedfp <seedfp> > mnemonic.age
age -d -i /path/to/encryption-identity.txt mnemonic.age
```

Write the 24 words on durable media, delete the decrypted file, then run `zallet confirm-backup` and read three words back from **paper**, not from the file. Details: [confirm-backup](https://zcash.github.io/zallet/cli/confirm-backup.html).

Record, at backup time, for each account (`z_listaccounts` / `listaddresses`):

* seed fingerprint (`seedfp`)
* ZIP 32 account index
* account name
* birthday height

---

## Disaster-recovery scenarios

### Disk death, volume still in backups

Stop any half-started Zallet. Restore the `z3-<network>-zallet` tarball (or the two files) into a fresh volume with the same ownership Z3 expects (`1000:1000` on the official images). Start Zebra, wait until it is `/ready`, then start Zallet. The wallet resumes from the backup and scans forward for later transactions.

This is the **only** path that recovers imported spending keys and watch-only material.

### You have mnemonics + metadata, but no `wallet.db`

1. New datadir: `generate-encryption-identity` then `init-wallet-encryption`.
2. `zallet import-mnemonic` for each phrase; check the printed `seedfp` against your notes.
3. Start Zallet and call `z_recoveraccounts` with each recorded `name`, `seedfp`, `zip32_account_index`, and `birthday_height`.

Anything a mnemonic does not cover must be re-imported from its original source, if you still have it.

### Identity file gone, `wallet.db` copies remain

Spending keys in those databases cannot be decrypted. Funds are recoverable **only** if you still have the mnemonics (HD accounts) or the original imported keys. There is no `encryptwallet`-style recovery; encryption is established at setup, before any key exists.

### Migrating from `zcashd`

Do **not** copy `wallet.dat` into a Zallet datadir. Use Zallet's `migrate-zcashd-wallet` and the [zcashd → Zebrad/Zallet migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet). After migration, back up the **Zallet** artifacts above; the old `wallet.dat` is not a Zallet backup.

---

## Common mistakes

**Copying `wallet.db` while Zallet is running.** SQLite can tear.

**Backing up only the mnemonic.** Imported keys and watch-only data will not come back.

**Storing `wallet.db` and the identity file in one cloud archive.** Whoever decrypts it can spend.

**Uploading raw `wallet.db` to a backup vendor.** History and viewing keys are in the clear.

**Treating the Zebra chain volume as the wallet backup.** It is not.

**Skipping `confirm-backup` on mainnet.** New addresses from that seed will not be created until you do.

---

## Related pages

* [Z3 Stack](/zcash-tech/z3-stack) — volumes, two-phase boot, what to back up
* [Practical Guide: Node RPC and Indexing](/guides/zcash-node-rpc-and-indexing)
* [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zallet Book — Backup and restore](https://zcash.github.io/zallet/guide/backup.html)
* [Zallet Book — Wallet encryption](https://zcash.github.io/zallet/concepts/encryption.html)
* [Zallet Book — confirm-backup](https://zcash.github.io/zallet/cli/confirm-backup.html)

**Last updated:** September 2026
