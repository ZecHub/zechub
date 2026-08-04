<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Fund Recovery

**Why keep your private key?**

Private keys are the secret to the security of your digital assets. Keeping them safe and never sharing them with third parties is essential.

> In this context a **Seed Phrase** can be seen as the equivalent of a private key.

By maintaining control over your private keys, the recovery process is always possible. There are 2 types of Zcash private keys (transparent and shielded), you can easily import them into your wallet, whether by using the Sweep Funds function or importing them as a new account. By keeping control over your private keys, you maintain total control over your assets, ensuring ownership, security and peace of mind.

# Security and Responsibility

It is crucial for users to understand the risks involved in dealing with private keys and to keep these keys protected from unauthorized access. The security of funds depends on the user's responsibility to safeguard their private keys.

> **Before you start:** recovery guides used to point at Ywallet. Its developer has confirmed it will not be updated for the Ironwood (NU6.3) network upgrade, so it can no longer follow the chain. Use **Zkool**, which is by the same developer and is the maintained successor. See [Ywallet is no longer maintained](#ywallet-is-no-longer-maintained) at the bottom of this page.

## Fund Recovery with Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) is the successor to Ywallet, from the same developer, and supports both transparent and shielded recovery.

Two situations are covered here:

1. **Restoring an account** from a seed phrase, private key, or viewing key
2. **Sweeping funds** out of a wallet that only ever supported transparent addresses

### 1) Restoring an Account

1. Install Zkool from the [releases page](https://github.com/hhanh00/zkool2/releases) and open it
2. On the **Account Manager** (the main page), tap the **+** button
3. Enter an **Account Name** to identify this account
4. Turn on **Restore Account?**
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts a seed phrase, a Sapling secret key, a transparent extended key, or a viewing key
6. Enter a **Birth Height** if you know roughly when the wallet was first used. This tells Zkool where to start scanning, which saves a lot of time

> **No birth height?** Leave it blank and confirm the **No Birth Height** warning. Zkool will scan from the start of the chain, which is slower but will not miss anything. If your funds predate the Sapling upgrade of October 2018, leave it blank rather than guessing a later height, or the scan can skip your transactions entirely.

7. Tap to save, then sync the account

### Restoring a seed from a different wallet

If the seed came from another wallet and the balance looks wrong after syncing, the change address derivation is usually why.

Open **Advanced Options** on the restore screen and turn on **Use Internal Change** before saving.

Wallets do not all derive change addresses the same way. Restoring a Zodl seed into Zkool without this setting can show a balance that is missing your change notes, which looks like lost funds but is not. There are also two other fields under **Advanced Options** worth knowing:

- **Extra Passphrase (optional)** — only if the original wallet used one
- **Account Index** — if the original wallet held several accounts on one seed, the funds may be under a different index

### 2) Sweeping Funds from a Transparent-Only Wallet

If your funds are in a wallet that never supported shielded addresses (Trust, Coinomi, Guarda and similar), restore the account first, then move the funds into the shielded pool.

1. Restore the account using the steps above
2. Open the account and go to the **Receive** page
3. Use the search button to **scan for related transparent addresses**. Wallets often generate many transparent addresses from one seed, and this finds the ones holding funds
4. Go to the **Send** page
5. Choose how to shield:
   - **Shield All** moves everything from every transparent address in one go
   - **Shield One** uses a single transparent address at a time. This is slower, but it avoids linking your transparent addresses together in one transaction

> **Shield One is the more private choice.** Shielding several addresses in one transaction publicly links them as belonging to the same person.

6. Review the transaction and send it

You can also use **Unshield All** in the same place to go the other direction, for example when withdrawing to an exchange that only accepts transparent addresses.

## Recovered funds and the Ironwood pool

Since the Ironwood (NU6.3) upgrade activated on 28 July 2026, the Orchard pool is spend-only. No new value can enter it, and existing value leaves through the turnstile into Ironwood.

If your recovered funds are in Orchard, they will need to migrate before they behave normally. In Zkool this is under **Note Migration** on the account page:

- **Orchard to Ironwood Migration** shows what is left to move
- **Migration Speed** controls the delay between steps
- **Start Migration** runs it in stages; **One Shot** does it in a single pass

> **Migration amounts are public.** When value crosses the turnstile, the amount and the block height are visible on chain, even though the sender and receiver stay shielded. Distinctive amounts can identify you, so prefer the staged migration over one shot, and consider routing your connection through Tor or a VPN first so your IP address is not linked to the amount you moved.

## Deep Recovery with ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) is a recovery tool from Zingo Labs for cases where a normal restore does not work, such as a damaged or partial wallet file.

> Its last update predates the recent network upgrades, so treat it as a last resort and verify any recovered keys in a maintained wallet before relying on the result.

## Ywallet is no longer maintained

Ywallet was the recommended recovery tool on this page for a long time, and many older guides still point at it.

Its developer has confirmed it will not be updated for Ironwood. A wallet that does not support the current consensus rules cannot build valid transactions, so it can no longer be used to move recovered funds. **Zkool**, by the same developer, is the maintained successor and is what this page now uses.

If you already have funds sitting in Ywallet, restore the same seed phrase into Zkool using the steps above.

## Related pages

- [Wallets](/using-zcash/wallets) - which wallets are maintained and their Ironwood readiness
- [Ironwood](/zcash-tech/ironwood) - what the upgrade changed and why funds migrate
- [Memos](/using-zcash/memos) - how encrypted memos work
- [Viewing Keys](/zcash-tech/viewing-keys) - read only access without spending power
