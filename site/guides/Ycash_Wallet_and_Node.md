<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ycash_Wallet_and_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ycash Wallet and Node Quickstart

This guide gives Zcash users a practical starting point for using Ycash wallets and running `ycashd`.

Ycash is a separate chain from Zcash. Use Ycash software for YEC and Zcash software for ZEC.

## Choose a wallet

### YWallet

YWallet is a light wallet for Android, iOS, and desktop. The Ycash wallet page describes it as a shielded wallet with Warp Sync support.

Basic setup:

1. Download YWallet from the official YWallet installation page.
2. Create a new wallet or restore an existing wallet.
3. Back up the seed or keys before receiving funds.
4. Confirm the wallet is set to Ycash, not another coin.
5. Let the wallet finish syncing before relying on the displayed balance.

### YecWallet

YecWallet is a full-node Ycash wallet. It includes `ycashd`, configures it for the user, and downloads the Ycash blockchain.

Basic setup:

1. Download YecWallet from the official Ycash wallet page or GitHub releases.
2. Install the release for your operating system.
3. Start YecWallet and let it sync.
4. Back up wallet data before receiving funds.
5. Keep the wallet updated when new Ycash releases are published.

### Paper wallets

YecPaperWallet is also listed by Ycash. Only use a paper wallet if you understand offline generation, safe printing, storage, and recovery. Paper wallets can be fragile if the paper is lost, damaged, photographed, or generated on an unsafe device.

## Run `ycashd`

`ycashd` is the Ycash full node implementation. A full node downloads and verifies the Ycash chain and exposes RPC commands through `ycash-cli`.

### 1. Download the release

Download the current `ycashd` release from the official Ycash GitHub releases page. Choose the correct package for your operating system and architecture.

If release signatures or checksums are provided, verify them before running the binaries.

### 2. Check the binaries

After unpacking the release, check that the binaries run:

```sh
./ycashd --version
./ycash-cli --version
```

### 3. Start the node

Start `ycashd` and allow it to connect to peers:

```sh
./ycashd -daemon
```

Initial sync can take a long time because the node stores the Ycash transaction history.

### 4. Check sync status

Use `ycash-cli` to query the node:

```sh
./ycash-cli getblockchaininfo
```

Useful fields include the current block height and sync progress.

To inspect network status:

```sh
./ycash-cli getnetworkinfo
```

To list available RPC commands:

```sh
./ycash-cli help
```

To stop the node cleanly:

```sh
./ycash-cli stop
```

## Import keys carefully

Ycash documents `importprivkey` for transparent keys and `z_importkey` for shielded keys. Importing keys can trigger a blockchain rescan so the wallet can find transactions for those keys.

If you are importing keys from the 2019 Zcash fork period:

- Understand which keys you are importing.
- Move any current ZEC away from old keys first.
- Use official Ycash software.
- Expect rescanning to take time.
- Use `getrescaninfo` to check rescan progress when available.

## Safety checklist

- Back up seed phrases and wallet files before receiving funds.
- Keep ZEC and YEC workflows separate.
- Confirm address prefixes before sending.
- Keep node and wallet software updated.
- Test with small amounts before moving meaningful funds.
- Never paste private keys into websites or chat apps.

## Related pages

- [Ycash for Zcash users](/privacy-tools/ycash)
- [Wallet backup checklist](/using-zcash/wallet-backup-checklist)
- [Zcash wallet privacy decision tree](/using-zcash/zcash-wallet-privacy-decision-tree)

## Resources

- [Ycash wallets](https://y.cash/wallets/)
- [Ycash Foundation: Full Node](https://www.ycash.xyz/full_node/)
- [Ycash Foundation: ycashd and YecWallet](https://www.ycash.xyz/docs/yecwallet_and_ycashd/)
- [Ycash Foundation: Importing Private Keys](https://www.ycash.xyz/docs/privkey_import/)
- [Ycash GitHub releases](https://github.com/ycashfoundation/ycash/releases)
