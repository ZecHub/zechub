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

## Legacy shielded funds: Sprout, Sapling and Orchard

Older shielded ZEC may need to be migrated as part of recovery. The route depends on which shielded pool currently holds the funds.

> **NU7 is planned for November 5, 2026.** Once it activates, the current migration path out of the legacy Sprout pool will stop working.
>
> If you still have ZEC in the Sprout pool, migrate it before the upgrade. After activation, existing tools will no longer be able to move Sprout funds into Sapling, transparent addresses, or any other destination.
>
> If you are viewing this page **after NU7** has activated, **Sprout is frozen in ice** until a future recovery method becomes available, which is not currently planned.

## The answer in one page

| Your funds are in | Migration route | What to do |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Recover the Sprout spending material, move the funds into Sapling, then use a current wallet to move them onward to Ironwood. This route is time-sensitive because of NU7. |
| **Sapling** | **Sapling → Ironwood** | No Sprout recovery environment is needed. Use a current Ironwood-capable wallet to move the funds onward. |
| **Orchard** | **Orchard → Ironwood** | Orchard is exit-only. Use a current compatible wallet to migrate the funds into Ironwood. See [Recovered funds and the Ironwood pool](#recovered-funds-and-the-ironwood-pool). |

> **Back up before you start.** Preserve `wallet.dat`, wallet exports, standalone spending keys, and any existing recovery backups. Never paste a seed, private key, spending key, or wallet file into a website, chat, or untrusted tool.

### Five-question decision flow

1. **Is it Sprout?** A `zc...` address, or a restored wallet showing a Sprout balance, points to the Sprout recovery path. A seed phrase alone usually belongs to a later wallet generation.
2. **What recovery material do you have?** Look for `wallet.dat`, an old Zcash datadir, a wallet export, or a standalone Sprout spending key. A Sprout address by itself is not enough to spend the funds.
3. **Which Sprout recovery route applies?** If you have a compatible `wallet.dat` or standalone spending key, start with the [Argos recovery section](#zecwallet-lite-recovery-with-argos). More involved legacy-node recovery is covered in the full field guide.
4. **Do you already have usable synchronized node data?** If a legacy-node recovery is required, existing clean node data can save substantial time. If not, use the recovery route described in the full field guide.
5. **Where should the funds end up?** **Ironwood.** Sprout must pass through Sapling first; Sapling and Orchard can move onward to Ironwood using current compatible wallet software.

### Full ZEC Pool Migration Field Guide

For the complete migration reference, including detailed recovery routes, commands, fees, hardware requirements, privacy considerations, troubleshooting, and source notes, read the full guide.

**Version 1.1 · Updated September 18, 2026**

[View or download the full ZEC Pool Migration Field Guide (PDF)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Research/zec-pool-migration/zcash_pool_migration_guide_zechub_v1_1_2026-09-18.pdf)

> **Before you start:** pick the tool that matches what you still have. Recovery guides used to point at Ywallet. Its developer has confirmed it will not be updated for the Ironwood (NU6.3) network upgrade, so it can no longer follow the chain. Use **Zkool**, which is by the same developer and is the maintained successor. Funds stuck in **ZecWallet Lite**, a `wallet.dat`, or a standalone spending key belong in **Argos**, not Zkool. See [Ywallet is no longer maintained](#ywallet-is-no-longer-maintained) and [ZecWallet Lite recovery with Argos](#zecwallet-lite-recovery-with-argos).

| You have | Use |
| --- | --- |
| A seed, spending key, or viewing key from a current or recently maintained wallet (including Ywallet) | [Zkool](#fund-recovery-with-zkool) |
| A 24-word **ZecWallet Lite** seed, a ZecWallet Lite or zcashd `wallet.dat`, or a standalone Sapling / Sprout spending key | [Argos](#zecwallet-lite-recovery-with-argos) |
| A damaged or partial wallet file that a normal restore cannot read | [ZExCavator](#deep-recovery-with-zexcavator), then verify in a maintained wallet |
| No working seed or key, but a locked device, forgotten password, or failed disk | [Professional recovery](#professional-recovery-when-you-do-not-have-the-seed) only. Never send a seed to a stranger who messages you. |

## Fund Recovery with Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) is the successor to Ywallet, from the same developer, and supports both transparent and shielded recovery.

Two situations are covered here:

1. **Restoring an account** from a seed phrase, private key, or viewing key
2. **Sweeping funds** out of a wallet that only ever supported transparent addresses

### 1) Restoring an Account

1. Install Zkool from the [releases page](https://github.com/hhanh00/zkool2/releases) and open it
2. On the **Account Manager** (the main page), tap the **+** button to reach the **New Account** screen
3. Enter an **Account Name** to identify this account
4. Turn on **Restore Account?**. This reveals the key and birth height fields
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts a seed phrase, a Sapling secret key, a transparent extended key, or a viewing key
6. Enter a **Birth Height** if you know roughly when the wallet was first used. This tells Zkool where to start scanning, which saves a lot of time

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> **No birth height?** Leave it blank and confirm the warning. Zkool will scan from the start of the chain, which is slower but will not miss anything. If your funds predate the Sapling upgrade of October 2018, leave it blank rather than guessing a later height, or the scan can skip your transactions entirely.

7. Save the account, then sync it

### Restoring a seed from a different wallet

If the seed came from another wallet and the balance looks wrong after syncing, the change address derivation is usually why.

Turn on the **Advanced Options** switch, further down the same New Account screen, and turn on **Use Internal Change** before saving.

Wallets do not all derive change addresses the same way. Restoring a ZODL seed into Zkool without this setting can show a balance that is missing your change notes, which looks like lost funds but is not. Zkool's tooltip for the switch still refers to Zashi, which is what ZODL used to be called.

Two more fields live under **Advanced Options**:

- **Extra Passphrase (optional)**, only if the original wallet used one
- **Account Index**, if the original wallet held several accounts on one seed. The funds may be under a different index

> **These two only appear once a valid seed phrase is in the Key field.** With the field empty, or holding a private or viewing key, Zkool shows just **Use Internal Change** and **H/W Ledger**. Paste the seed first, then open Advanced Options.

### 2) Sweeping Funds from a Transparent-Only Wallet

If your funds are in a wallet that never supported shielded addresses (Trust, Coinomi, Guarda and similar), restore the account first, then move the funds into the shielded pool.

1. Restore the account using the steps above
2. Open the account and go to the **Receive Funds** page
3. Tap the magnifying glass in the top bar (**Find other transparent addresses**). Wallets that rotate addresses, such as Ledger and Exodus, generate many transparent addresses from one seed, and this finds the ones holding funds
4. **Reset and sync the account afterwards.** The newly found addresses only pick up their balances on the next scan, so skipping this makes it look like the sweep found nothing
5. Go to the **Send** page. Near the balance you will find three icon buttons. They have no text labels, so hover or long press to see their names:
   - **Shield One** (outlined shield) moves one transparent address at a time
   - **Shield All** (solid shield) moves everything from every transparent address at once
   - **Unshield All** (open padlock) goes the other way, into a transparent address

> **Shield One is the more private choice.** Shielding several addresses in one transaction publicly links them as belonging to the same person. Zkool warns about this itself before running Shield All.

6. Review the transaction and send it

Unshield All is useful when withdrawing to an exchange that only accepts transparent addresses. The shielding buttons only appear if the account has a shielded address, and Unshield All only if it has a transparent one.

## ZecWallet Lite recovery with Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) stopped being maintained in 2022. A seed from that wallet does not use the same derivation layout as current wallets, so restoring it in Zkool can miss the notes even when the phrase is correct. [Argos](https://argos.sovright.com), from Sovright, is a desktop recovery workspace built for that layout.

Argos also reads ZecWallet Lite and zcashd `wallet.dat` files, and standalone Sapling (`SK…`) or Sprout (`ST…`) spending keys. It is not a day-to-day wallet. Scan locally, review the balances, then sweep into a maintained wallet you control.

Least Authority [audited](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) the tool. Recovery itself is free. An optional donation to Sovright can appear during the sweep.

> **Never type a seed into a website.** The Argos site is only the download and the [user guide](https://argos.sovright.com/guide.html). Keys stay in the signed desktop app. Validation is local against the BIP-39 checksum. The seed field clears once the scan starts. Anyone who messages you asking for that seed "to help recover your funds" is scamming you.

### Before you open Argos

1. Download the desktop app from the [official Argos site](https://argos.sovright.com) or the [GitHub releases page](https://github.com/sovright/argos/releases). Verify checksums or signatures when they are published.
2. Use **Argos 1.1.0 or later**. Ironwood activated at mainnet block **3,428,143**. Older builds still scan and still show a balance, but the network rejects the sweep they build. Funds are not lost; upgrade and sweep again.
3. Work on a machine you trust. Prefer full-disk encryption. Do not screen-share while a seed, passphrase, or spending key is visible.
4. Have a destination Unified Address ready from a maintained wallet you control, such as [ZODL](https://zodl.app/). Confirm the address in that wallet before you paste it into Argos.

### Seed recovery

1. Open Argos and choose **I have my 24-word seed phrase**. A seed recovery does not need a wallet file.
2. Paste the phrase and click **Validate seed**. If it says the seed is valid, continue.
3. Enter a **birthday block height**, or the closest estimate of when the wallet was created. An earlier height is slower but safer than guessing too late.
4. Under the server controls, use the current-server preset, or enter lightwalletd URLs. Comma-separated URLs are tried in order. Public examples:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Paste the destination Unified Address.
6. Click **start scan**. This can take minutes or days depending on the birthday height. You can quit and reopen the same workspace; the scan resumes.
7. When the scan finishes, review the balances, fee estimate, and destination, then click **sweep**.

Broadcasting a sweep is irreversible. After it confirms, treat the old seed as burned and do not reuse it. Keep the original wallet file, if you have one, until every relevant pool has been swept and the destination wallet shows the funds.

### Wallet files and standalone keys

On the welcome screen, **I have a wallet file** covers a ZecWallet Lite file, a zcashd `wallet.dat`, or a standalone Sapling key.

Argos only reads the file. It never modifies it. If the wallet is encrypted, enter the passphrase when asked; it is used in memory and is not written to disk. Review the transparent, Sapling, and Sprout key counts before you start a scan.

Viewing keys are not accepted here, because they cannot authorize a sweep.

### Sprout notes

A ZecWallet Lite seed does not derive Sprout keys. Those keys were generated separately. Recover Sprout from a zcashd `wallet.dat`, or from a standalone spending key in the CLI.

If the file already has spendable note data and a cached witness, Argos can offer **Sweep Sprout funds** without a chain scan. Otherwise it can run a resumable full-block scan over the P2P network. That scan is large and slow. The checkpoint it writes is spend-capable, so protect it like the original wallet.

Sprout value can only land in Sapling. Move it onward from the destination wallet if you want it in a later pool.

## Recovered funds and the Ironwood pool

Since the Ironwood (NU6.3) upgrade activated on 28 July 2026, the Orchard pool is spend-only. No new value can enter it, and existing value leaves through the turnstile into Ironwood.

If your recovered funds are in Orchard, they will need to migrate before they behave normally. In Zkool, open the account menu and choose **Note Migration**. The option only shows up when there is actually something to migrate.

The screen is titled **Orchard to Ironwood Migration** and runs in two phases. First it splits non-standard notes into standard denominations, then it moves those notes one at a time. **Migration Speed** is a slider from Ultra Fast to Slow that sets the random delay between steps. **Start Migration** runs the staged process in the background, and you can close the page and resume later. **One Shot** does it in a single pass.

Each step is its own transaction, so each one pays a fee.

> **Migration amounts are public.** When value crosses the turnstile, the amount and the block height are visible on chain, even though the sender and receiver stay shielded. Distinctive amounts can identify you, so prefer the staged migration at a slower speed over one shot, and consider routing your connection through Tor or a VPN first so your IP address is not linked to the amount you moved.

## Deep Recovery with ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) is a recovery tool from Zingo Labs for cases where a normal restore does not work, such as a damaged or partial wallet file.

> Its last update predates the recent network upgrades, so treat it as a last resort and verify any recovered keys in a maintained wallet before relying on the result.

## Professional recovery when you do not have the seed

If the seed or key is gone, a self-hosted restore cannot start. Some people in that position use a professional recovery firm for forgotten passwords, hardware failures, or unreadable disks.

That path is not the same as restoring a seed you still have. Do not hand a working seed to anyone who offers to "recover" it for you. The scam version of this service is common.

[Unciphered](https://unciphered.com) is one firm that does this work in-house and has been covered in places such as [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). They are a general crypto recovery service, not a Zcash-specific tool, and they charge for the work. ZecHub does not endorse any recovery firm. If you go this route, confirm the official domain yourself and assume anyone who DMs you first is a scammer.

If you still have the phrase, use Zkool or Argos on your own machine instead.

## Ywallet is no longer maintained

Ywallet was the recommended recovery tool on this page for a long time, and many older guides still point at it.

Its developer has confirmed it will not be updated for Ironwood. A wallet that does not support the current consensus rules cannot build valid transactions, so it can no longer be used to move recovered funds. **Zkool**, by the same developer, is the maintained successor and is what this page now uses for ordinary restores.

If you already have funds sitting in Ywallet, restore the same seed phrase into Zkool using the steps above.

## Related pages

- [Wallets](/using-zcash/wallets) - which wallets are maintained and their Ironwood readiness, including Argos
- [Ironwood](/zcash-tech/ironwood) - what the upgrade changed and why funds migrate
- [Memos](/using-zcash/memos) - how encrypted memos work
- [Viewing Keys](/zcash-tech/viewing-keys) - read only access without spending power
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - public lightwalletd endpoints Argos can use
- [Argos user guide](https://argos.sovright.com/guide.html) - official walkthrough from Sovright
- [Naomi Brockwell on recovery tools](https://x.com/naomibrockwell/status/2079146521405333526) - Argos walkthrough and a note on professional recovery
