<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Wallet_Birthday_Height.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Wallet Birthday Height

> The block your wallet starts searching from when it rebuilds your balance. Write it down next to your recovery phrase.

What you'll take away: what a birthday height is, why shielded wallets need one, what goes wrong when it is too late or too early, and how to find, estimate or correct it in ZODL, Zkool, zingo-cli and Zallet.

A wallet's birthday height is a block number: the point on the chain from which the wallet looks for its own transactions. [ZIP 326](https://zips.z.cash/zip-0326) defines it as a lower bound, known to the wallet, on the first block in which the account could have received funds. When you create a wallet, the app records the birthday for you. When you restore one from a recovery phrase or a viewing key, you usually have to supply it again, because the phrase does not contain it.

Why this matters. If the birthday is too late, a restored wallet shows a balance that is too small, or zero, even though the funds are safe on chain. If it is far too early, a restore that could take minutes can take hours. Writing the number down when you back up your phrase takes a few seconds and avoids both problems.

## TL;DR

- The birthday height is the block your wallet starts scanning from. It should be at or below the block of the wallet's first transaction.
- Too late: payments received before it are not found and the balance looks wrong. The funds are still there; restore or rescan with an earlier height.
- Too early: nothing is missed, the first sync just takes longer.
- Your recovery phrase does not include it. ZODL shows it on the recovery phrase screen, Zkool calls it "Birth Height", zingo-cli takes `--birthday`, and Zallet needs a `birthday_height` to recover accounts.
- If you don't know it, choose a height you are sure is earlier: ZODL's month-based estimate, or the height of a network upgrade from before you started.

## Visual analogy

Imagine asking a mailroom to find every letter ever sent to you. The envelopes carry no names on the outside, so the clerk has to try your key on every envelope in the log. Say "start from the day I moved in" and the search is quick and complete. Say "start from last month" and the older letters are never checked. Say "start from the day the building opened" and nothing is missed, but the search takes much longer.

## Why shielded wallets need a starting point

Shielded payments are encrypted to the recipient, and nothing on the chain says which outputs belong to whom. A wallet finds its own funds by trial decryption: it tries to decrypt each shielded output with its viewing keys and keeps the ones that work ([ZIP 307](https://zips.z.cash/zip-0307)). A light wallet also has to download that data from a light wallet server for every block it scans, so scanning costs bandwidth as well as time.

The birthday tells the wallet where it can safely start. Zkool's documentation explains that it skips the blocks before the birth height because there may be millions of transactions to check before it. The wallet also keeps the state of the note commitment tree as of the block just before the birthday, so that it can build the Merkle paths it needs to spend notes it finds later. In the Zcash wallet libraries that tree state is part of the birthday record ([`AccountBirthday`](https://docs.rs/zcash_client_backend/latest/zcash_client_backend/data_api/struct.AccountBirthday.html)).

A recovery phrase cannot carry the birthday. A [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) phrase encodes only random entropy and a checksum, so the birthday has to be recorded separately. ZODL describes its backup as the 24 words together with an optional block height, the wallet birthday ([ZODL support](https://support.zodl.com/article/12-backing-up-zodl)).

## Too late or too early

| Birthday you enter | What happens | What to do |
|---|---|---|
| At or a little before the first transaction | Everything is found and the sync is as short as it can be | Nothing |
| Much earlier than the first transaction | Everything is found, but the first sync takes longer and uses more data | Nothing, or wait it out |
| Later than the first transaction | Funds received before the birthday are not found, so the balance and history are wrong | Restore or rescan with an earlier height (see below) |

ZIP 326 notes that it has traditionally been safe for a wallet to use a conservatively early birthday height. Zkool's guide says the same from the user's side: the value does not have to be exact, but it must be lower than the real birth height.

Funds hidden by a late birthday are not lost. They are still on chain and still controlled by your keys; the wallet simply never looked at those blocks.

Wallets also use the birthday to decide which pools to scan. ZIP 326, which is still a draft, tells wallets not to scan the Orchard pool at all for an account whose birthday is after the Ironwood upgrade (NU6.3, block 3,428,143), because an account created after that upgrade has no way to receive funds in the Orchard pool.

## Finding your birthday height

- **ZODL.** The birthday height is shown on the recovery phrase backup screen ([ZODL support](https://support.zodl.com/article/13-recovering-your-zodl-wallet)). You can open that screen at any time from the "..." menu: More > Advanced Settings > Zodl Recovery Phrase ([ZODL support](https://support.zodl.com/article/12-backing-up-zodl)).
- **Zkool.** Every account has a birth height, which you can see and change on the account's edit page ([Zkool docs](https://hhanh00.github.io/zkool2/recipe/account.html)).
- **zingo-cli.** The `birthday` command prints it, and `recovery_info` prints the seed phrase together with the birthday and the number of accounts ([zingo-cli commands](https://github.com/zingolabs/zingolib/blob/dev/bin/cli/src/commands.rs)).
- **Zallet.** The backup guide asks you to record, for each account, the seed fingerprint, the ZIP 32 account index, the account name and the birthday height ([Zallet book](https://zcash.github.io/zallet/guide/backup.html)).
- **Other wallets.** Look in the backup or settings screens for "birthday", "birth height" or a block height. If your wallet shows none, write down the date you created it.

## If you don't know it

1. Find the earliest date the wallet could have received ZEC: your first withdrawal from an exchange, an old payment, or the day you installed the app.
2. In ZODL, use **Estimate block height** during the restore and pick the year and month you started using the wallet ([ZODL support](https://support.zodl.com/article/13-recovering-your-zodl-wallet)).
3. Otherwise, use the height of a network upgrade that happened before that date. Any block earlier than your first transaction works, and these are easy to look up:

| Upgrade | Block height | Date (UTC) |
|---|---|---|
| Sapling | 419,200 | October 29, 2018 |
| Canopy | 1,046,400 | November 18, 2020 |
| NU5 | 1,687,104 | May 31, 2022 |
| NU6 | 2,726,400 | November 23, 2024 |
| NU6.1 | 3,146,400 | November 24, 2025 |
| Ironwood (NU6.3) | 3,428,143 | July 28, 2026 |
| NU7 | 3,543,405 | November 6, 2026 |

The heights come from each upgrade's ZIP, and the [Network Upgrades](../start-here/network-upgrades) page lists them all. To get closer, count back from a known height: the target spacing has been 75 seconds per block since Blossom in December 2019, about 1,152 blocks a day ([ZIP 208](https://zips.z.cash/zip-0208)), and 25 seconds since NU7, about 3,456 a day ([ZIP 218](https://zips.z.cash/zip-0218)). Real block times vary, so round generously towards earlier blocks.

4. If you have no idea at all, Sapling's activation height, 419,200, is early enough for the shielded funds of any wallet restored from a recovery phrase. Shielded keys derived from a seed ([ZIP 32](https://zips.z.cash/zip-0032)) start with Sapling, because the seed derivation once specified for Sprout was never used. Scanning from there takes a long time on a phone, though. zingo-cli also accepts `--birthday 0` to scan from the start of the chain, which its README describes as slow. Transparent addresses have existed since launch, and a zcashd wallet can be older than Sapling too; the Zallet book notes this when it explains how its zcashd migration picks a birthday.

## Fixing a birthday that was too late

- **ZODL.** Restore again with an earlier birthday. Make sure your recovery phrase is backed up, reset the app from the "..." menu (More > Advanced Settings > Reset Zodl), then restore with the earlier height. ZODL's support article on rescanning a Keystone account uses these steps ([ZODL support](https://support.zodl.com/article/31-rescanning-an-existing-keystone-wallet)).
- **Keystone with ZODL.** If you pair a Keystone that already holds ZEC with a new ZODL install, ZODL only shows the Keystone's funds from the time you pair it. The workaround in the same article: reset, restore with a birthday early enough for when you started depositing to the Keystone, switch the phone to airplane mode straight away, pair the Keystone, then turn airplane mode off and let it sync.
- **Zkool.** Change the birth height on the account's edit page. Zkool then clears the account's sync data and syncs again from the new height, and your funds are not lost ([Zkool docs](https://hhanh00.github.io/zkool2/recipe/account.html)).
- **zingo-cli.** `rescan` clears the chain data and syncs again from the stored birthday. To use an earlier birthday, restore into a fresh `--data-dir` with a lower `--birthday`, since restoring into a directory that already holds a wallet fails ([zingo-cli README](https://github.com/zingolabs/zingolib/blob/dev/bin/cli/README.md)).

## Moving a zcashd wallet to Zallet

When Zallet migrates a zcashd wallet, it estimates the birthday from the wallet's own transactions. The Zallet book warns that if zebrad has not synced past the blocks that hold those transactions, the migration can in some cases pick a birthday later than the wallet's history without any error, for example when the earliest activity is from before Overwinter. Let zebrad reach the chain tip before you migrate ([Zallet book](https://zcash.github.io/zallet/cli/migrate-zcashd-wallet.html)). The [migration guide](../guides/migration-guide-zcashd-to-zebrad-zallet) covers the rest of the move.

## Keeping it with your backup

- Write the birthday height next to your recovery phrase, together with the name of the wallet app. ZODL treats the 24 words and the block height as one backup.
- If you add accounts later, note a birthday for each one. Zallet records one per account, and Zkool keeps one per account.
- The birthday is only a block number. It cannot spend or reveal anything, beyond hinting at when the wallet was created, but a restore needs it, so keep it with the phrase.

## Common Mistakes

- Restoring an old wallet without entering a birthday. Zkool, for example, uses the current height when you restore and leave the field blank (it asks you to confirm first), so everything older would be skipped.
- Estimating a birthday from a date and rounding the wrong way. Always round to an earlier block, never a later one.
- Assuming that a zero balance after a restore means the funds are gone. Check the birthday first.
- Starting from block 0 or from Sapling on a phone when you know roughly when you started. It works, but the sync can take far longer than it needs to.
- Writing down the recovery phrase but not the birthday.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Birthday height | The block a wallet starts scanning from; it should be at or below the wallet's first transaction |
| Block height | The number of a block in the chain, counting from the genesis block, which is block 0 |
| Trial decryption | Trying to decrypt each shielded output with your keys to see which ones are yours |
| Rescan | Clearing a wallet's synced data and scanning the chain again from a chosen height |
| Note commitment tree | The on-chain record of shielded notes; a wallet needs its state to prove, when spending, that a note exists |

## FAQ

Is the birthday part of my recovery phrase? No. A BIP 39 phrase encodes only random data and a checksum. Write the birthday down separately.

I restored my wallet and the balance is zero. Are my funds gone? Not necessarily. If the birthday you entered is later than the payments you received, the wallet never scanned those blocks. Restore or rescan with an earlier height, as described above.

Does a watch-only wallet need a birthday too? Yes. Zkool asks for a birth height when you restore an account from a key, and zingo-cli needs `--birthday` with `--viewkey`. See [Viewing Keys](../zcash-tech/viewing-keys).

Is it a problem if my birthday is far too early? Only for time and data. Nothing is missed.

Can someone use my birthday height against me? On its own it is just a block number. It gives no access to funds or transactions; at most it hints at when you started using the wallet.

## Test your understanding

You restore a wallet that you first used in March 2024, and you enter the NU6 height, 2,726,400, as the birthday. What will you see?

<details>
<summary>Answer</summary>

NU6 activated in November 2024, after your first payments, so everything received before block 2,726,400 will be missing from the balance and history. The NU5 height, 1,687,104 (May 2022), would have been a safe choice. Restore again with that height or another one from before March 2024.
</details>

### Resources

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326), the definition of the birthday height and the scanning rules for the Orchard and Ironwood pools (draft)
- [ZIP 307: Light Client Protocol for Payment Detection](https://zips.z.cash/zip-0307)
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)
- [BIP 39: Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [ZODL support: Backing up your Zodl recovery phrase](https://support.zodl.com/article/12-backing-up-zodl)
- [ZODL support: Recovering your Zodl wallet](https://support.zodl.com/article/13-recovering-your-zodl-wallet)
- [ZODL support: Rescanning an existing Keystone wallet](https://support.zodl.com/article/31-rescanning-an-existing-keystone-wallet)
- [Zkool docs: Account Manager](https://hhanh00.github.io/zkool2/guide/accounts.html) and [Edit an Account](https://hhanh00.github.io/zkool2/recipe/account.html)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/dev/bin/cli/README.md)
- [Zallet book: Backup](https://zcash.github.io/zallet/guide/backup.html) and [Migrating a zcashd wallet](https://zcash.github.io/zallet/cli/migrate-zcashd-wallet.html)
- [`AccountBirthday` in zcash_client_backend](https://docs.rs/zcash_client_backend/latest/zcash_client_backend/data_api/struct.AccountBirthday.html)
- Activation heights: [ZIP 205](https://zips.z.cash/zip-0205), [ZIP 251](https://zips.z.cash/zip-0251), [ZIP 252](https://zips.z.cash/zip-0252), [ZIP 253](https://zips.z.cash/zip-0253), [ZIP 255](https://zips.z.cash/zip-0255), [ZIP 258](https://zips.z.cash/zip-0258), [ZIP 259](https://zips.z.cash/zip-0259)

### See also

[Zcash Wallet Syncing](../zcash-tech/zcash-wallet-syncing)

[Recovering Funds](../using-zcash/recovering-funds)

[Mnemonic Seed Phrases](../zero-to-zero-knowledge/mnemonic-seed-phrases)

[Viewing Keys](../zcash-tech/viewing-keys)

[Network Upgrades](../start-here/network-upgrades)

[Wallets](../using-zcash/wallets)
