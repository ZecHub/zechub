<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Viewing keys let a Zcash user selectively disclose shielded transaction information without handing over spending authority. They are one of the main tools that make Zcash privacy practical for exchanges, custodians, auditors, businesses, and users who need limited transparency for a specific purpose.

## TL;DR

- A viewing key gives read access to shielded activity for an address or account.
- A viewing key does not allow anyone to spend funds.
- Viewing keys support selective disclosure: a user can reveal transaction history to a chosen party without making it public to everyone.
- Incoming viewing keys are useful for detecting received payments while keeping spend keys offline.
- Full viewing keys can reveal broader activity and should only be shared with trusted parties when needed.

## Core Explanation

Shielded Zcash addresses hide transaction details on-chain. That privacy is useful by default, but sometimes a user needs to prove something about shielded activity to another party. Examples include confirming deposits, providing audit visibility, or supporting enhanced due diligence.

Viewing keys solve this by separating read access from spend authority. A party with the right viewing key can scan the blockchain and see the shielded information that key is authorized to reveal, but cannot create transactions or move funds.

Viewing keys became a core part of Zcash's selective disclosure model through Sapling-era shielded addresses, and [ZIP 310](https://zips.z.cash/zip-0310) defines unified viewing keys for Unified Addresses.

## Why Use a Viewing Key?

Electric Coin Co. describes several common use cases:

**Exchange deposit detection.** An exchange can keep spend authority on secure hardware while loading an incoming viewing key onto an Internet-connected detection node. The node can detect customer deposits to a shielded address without being able to spend the funds.

**Custodian audits.** A custodian can give an auditor a full viewing key for each relevant shielded address. The auditor can verify balances and review past transaction activity without taking control of the funds.

**Customer due diligence.** An exchange or regulated service may ask a customer to provide a viewing key for a shielded address so the service can review shielded transaction activity for a specific compliance workflow.

The key tradeoff is scope. Viewing keys are powerful disclosure tools. Share them only when the recipient needs that information and you understand what the key reveals.

## How to Find Your Viewing Key

### zcashd

First list all known addresses:

```bash
./zcash-cli listaddresses
```

Then export the viewing key for a Unified Address or Sapling shielded address:

```bash
./zcash-cli z_exportviewingkey "<UA or Z address>"
```

### YWallet

1. Open the account in YWallet.
2. Select **Backup** in the top-right corner.
3. Authenticate on the device.
4. Copy the viewing key shown by the wallet.

## How to Use Your Viewing Key

### zcashd

Import a viewing key with:

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

The `whenkeyisnew` option tells `zcashd` how far back to rescan. The example block height `30000` comes from the original command example; choose a height that fits the age of the wallet or address you are importing.

### YWallet

1. Select **Account** in the top-right corner.
2. Click **+** in the bottom-right corner.
3. Choose the option to import a viewing key.
4. Add the viewing key as a read-only account.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="YWallet viewing key import screen" width="200" height="280"/>
</a>

### zcashblockexplorer.com

You can also use the viewing-key tool at [zcashblockexplorer.com/vk](https://zcashblockexplorer.com/vk).

This is convenient, but it changes the trust model. When a viewing key is entered into a third-party explorer, that service can see the information revealed by the key. Use this only when you are comfortable trusting the operator with that disclosure.

## Practical Implications

**Viewing keys are for transparency, not custody.** They allow someone to see authorized shielded activity, but they do not move ZEC.

**They are useful for operational separation.** A business can run online monitoring infrastructure with viewing-key access while keeping spend keys offline or on more secure hardware.

**They can satisfy targeted disclosure needs.** A user can prove information to one counterparty without publishing transaction details to the whole blockchain.

**They should be rotated or limited by account design when possible.** If a viewing key is no longer needed by a third party, stop relying on that address or account for new activity where that party should not retain visibility.

## Common Mistakes

**Sharing a viewing key publicly.** Anyone with the key can see the information it reveals. Treat it as sensitive data.

**Confusing viewing keys with spending keys.** A viewing key cannot spend funds. A spending key or seed phrase can. Never share the seed phrase or spending key for audit or deposit detection use cases.

**Using a web explorer without considering trust.** A third-party explorer may be useful for quick checks, but entering a viewing key gives that service access to the disclosed information.

**Sharing more scope than needed.** If a party only needs incoming payment detection, do not provide broader viewing access unless that broader disclosure is intentional.

## Related Pages

- [Shielded Pools](/site/Using_Zcash/Shielded_Pools)
- [Wallets](/site/Using_Zcash/Wallets)
- [Zcash Wallet Syncing](/site/Zcash_Tech/Zcash_Wallet_Syncing)
- [What is ZEC and Zcash?](/site/Start_Here/What_is_ZEC_and_Zcash)
- [Halo](/site/Zcash_Tech/Halo)

## Resources

- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
