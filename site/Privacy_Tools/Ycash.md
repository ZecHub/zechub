<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Ycash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ycash for Zcash Users

Ycash (YEC) is a digital currency whose software and early chain history come from Zcash. It is a separate network with a separate coin, separate wallets, separate addresses, and separate infrastructure.

## Relationship to Zcash

Ycash forked from Zcash at Zcash block height 570,000 on July 18, 2019. Coins and transactions after that point live on different chains.

This matters for users because YEC is not ZEC. A Zcash wallet is not automatically a Ycash wallet, and a Zcash address is not a Ycash address. Treat the two networks as related but separate systems.

## Main differences

At launch, Ycash changed several network details from Zcash:

- Mining changed from Equihash(200,9) to Equihash(192,7).
- The Zcash Founders Reward design was replaced with a Ycash Development Fund.
- Ycash uses different address prefixes to reduce accidental cross-chain sends.
- Ycash uses two-way replay protection from the Zcash upgrade mechanism.

Ycash address prefixes are different from Zcash address prefixes:

| Ycash address type | Prefix |
| --- | --- |
| Transparent | `s1` |
| Multisig | `s3` |
| Sprout shielded | `yc` |
| Sapling shielded | `ys` |

Do not send ZEC to a Ycash address or YEC to a Zcash address.

## Wallets

The Ycash wallet page lists both light-wallet and full-node options.

YWallet is a shielded wallet available on Android, iOS, and desktop. It is usually the simplest starting point for everyday users who want shielded Ycash support.

YecWallet is a full-node wallet. It includes `ycashd`, the node software that powers the Ycash network, and downloads the Ycash blockchain from the peer-to-peer network.

YecPaperWallet is a paper-wallet option for users who understand offline key handling. Paper wallets require extra care because losing or exposing the secret material can permanently lose funds.

## Accessing fork coins

Users who controlled Zcash private keys at the fork height may have corresponding YEC on the Ycash chain. Accessing those coins requires importing private keys into Ycash software.

Be careful with this workflow:

- Confirm that the software is from an official Ycash source.
- Move current ZEC to a fresh Zcash wallet before exposing old keys to another wallet environment.
- Import only keys you understand.
- Expect a rescan to find historical transactions.
- Test with a low-value key first when possible.

## Practical notes

Ycash can be interesting to Zcash users because it shares history and technology roots with Zcash, but it should not be treated as the same asset or same privacy ecosystem.

For normal users, the safest mental model is simple:

- Use Zcash wallets for ZEC.
- Use Ycash wallets for YEC.
- Use current official releases.
- Back up keys before receiving funds.
- Check address prefixes before sending.

## Related pages

- [Zcash wallet privacy decision tree](/using-zcash/zcash-wallet-privacy-decision-tree)
- [Wallet backup checklist](/using-zcash/wallet-backup-checklist)
- [Shielded pools](/using-zcash/shielded-pools)
- [Shielded ecosystems comparison](/research/shielded-ecosystems-comparison)

## Resources

- [Ycash: What is Ycash?](https://y.cash/what-is-ycash/)
- [Ycash: Wallets](https://y.cash/wallets/)
- [Ycash Foundation: 2019 Fork](https://www.ycash.xyz/docs/the_fork/)
- [Ycash Foundation: Importing Private Keys](https://www.ycash.xyz/docs/privkey_import/)
- [Ycash Foundation: Full Node](https://www.ycash.xyz/full_node/)
- [Ycash GitHub releases](https://github.com/ycashfoundation/ycash/releases)
