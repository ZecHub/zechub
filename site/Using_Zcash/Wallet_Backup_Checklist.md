<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Wallet_Backup_Checklist.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Wallet backup checklist

Back up your Zcash wallet before you receive funds.

Zcash wallets may support seed phrases, viewing keys, hardware devices, full-node wallet files, or wallet-specific exports. The exact backup method depends on the wallet.

## TL;DR

1. Write down your seed phrase before receiving funds.
2. Store backups offline.
3. Do not share your seed phrase or spending key.
4. Understand the difference between spending keys and viewing keys.
5. Test recovery with a small wallet before trusting a large balance.
6. Keep wallet software and recovery instructions together.

## What to back up

Your wallet may use one or more of these:

1. Seed phrase
2. Spending key
3. Viewing key
4. Wallet file
5. Hardware wallet recovery phrase
6. Password for encrypted local storage
7. Notes about the wallet version and account structure

The seed phrase or spending key controls funds. Anyone who gets it can spend your ZEC.

A viewing key does not spend funds, but it can reveal transaction history. Treat it as sensitive.

## Seed phrase safety

1. Write the seed phrase on paper or metal.
2. Store it somewhere private and durable.
3. Do not put it in cloud notes, screenshots, email, or chat.
4. Do not type it into a website.
5. Do not share it with support staff.
6. Make more than one backup if loss would be serious.

If someone asks for your seed phrase, assume it is a scam.

## Full-node wallet files

Some full-node wallets may use local wallet files in addition to seed-based accounts.

If you use `zcashd` or another full-node wallet, read the wallet's current backup instructions. Older wallets and imported keys may need extra care.

Do not assume that a seed phrase alone backs up every imported key, watch-only address, label, or wallet record.

## Viewing key backups

Viewing keys are useful for accounting, audits, merchant detection, and watch-only wallets.

Back them up if your workflow depends on them, but do not publish them casually. A full viewing key can reveal more than one payment.

Use separate accounts when you need to share visibility for one activity but not another.

## Test recovery

The best backup is one you have tested.

Before storing serious funds:

1. Create a small wallet.
2. Back it up.
3. Restore it on another device or profile.
4. Confirm the restored wallet finds the same address.
5. Send a small test payment.
6. Confirm you can receive and spend.

Testing takes time, but it prevents painful surprises later.

## Common mistakes

1. Receiving funds before backing up.
2. Storing the seed phrase only on the same phone or laptop as the wallet.
3. Confusing a viewing key with a spending key.
4. Forgetting the password for an encrypted wallet file.
5. Assuming every wallet uses the same recovery format.
6. Importing old keys and forgetting to back them up.

## Related pages

- [Wallets](/using-zcash/wallets)
- [Recovering funds](/using-zcash/recovering-funds)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Zcash wallet privacy decision tree](/using-zcash/zcash-wallet-privacy-decision-tree)
- [Shielded pools](/using-zcash/shielded-pools)

## Resources

- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [Zcash RPC: z_getnewaccount](https://zcash.github.io/rpc/z_getnewaccount.html)
- [Zcash RPC: backupwallet](https://zcash.github.io/rpc/backupwallet.html)
- [Zcash RPC: z_exportwallet](https://zcash.github.io/rpc/z_exportwallet.html)
