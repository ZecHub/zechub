<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Fund Recovery

**Why keep your recovery material?**

Seeds, spending keys, viewing keys, and wallet files are not interchangeable. A seed phrase can derive wallet keys for many wallets, but it does not replace every legacy key or wallet file. A viewing key can reveal shielded activity but cannot authorize a spend.

Recovery depends on having the correct spending authority and a currently supported path for the pool that holds the funds. Keep recovery material private and never share seeds, spending keys, or wallet files with anyone you do not trust.

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
| **Sprout** | **Sprout → Sapling → Ironwood** | If you have `wallet.dat` or a standalone Sprout spending key, try the current Argos recovery path first. If Argos is not suitable, use the legacy sidecar route in the full field guide. Sprout must land in Sapling first, then move onward to Ironwood. This route is time-sensitive because of NU7. |
| **Sapling** | **Sapling → Ironwood** | No Sprout recovery environment is needed. Use a current wallet that can both recover or spend your specific Sapling account and construct Ironwood transactions. Ironwood support alone does not prove legacy-Sapling recovery support. |
| **Orchard** | **Orchard → Ironwood** | Orchard is exit-only. Use a current compatible wallet's built-in Orchard-to-Ironwood migration flow. See [Recovered funds and the Ironwood pool](#recovered-funds-and-the-ironwood-pool). |

### Five-question decision flow

1. **Is it Sprout?** A seed phrase alone points to a later Sapling/Orchard-era recovery path, not Sprout. A `zc...` address, or a restored wallet reporting a Sprout balance, points to Sprout.
2. **What recovery material do you have?** Look for `wallet.dat`, the old computer or datadir, a `z_exportwallet` backup, or an exported Sprout spending key. A `zc...` address alone is not enough.
3. **Argos or the legacy sidecar?** If you have `wallet.dat` or a standalone Sprout spending key and simply want the funds out, try [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) first. Use the legacy sidecar route in the full field guide if Argos cannot handle the material or if you want the full recovery stack under your own control.
4. **Do you already have a synchronized, unpruned zcashd datadir?** This matters only for the legacy sidecar route. Copy existing node data only after a clean shutdown; otherwise the field guide covers the snapshot/from-scratch options.
5. **Where do the funds end up?** **Ironwood.** Sprout crosses through Sapling first because there is no single direct Sprout-to-Ironwood transaction. Do not stop at Sapling.

### Full ZEC Pool Migration Field Guide

For the complete migration reference, including detailed recovery routes, commands, fees, hardware requirements, privacy considerations, troubleshooting, and source notes, read the full guide.

**Version 1.1 · Updated September 18, 2026**

[Read the full ZEC Pool Migration Field Guide in ZecHub](/research/zec-pool-migration/view)
[Download the ZEC Pool Migration Field Guide (PDF)](/api/research/zec-pool-migration/pdf)

> **Before you start:** first establish **what you are recovering and what recovery material you still have**. A current wallet seed or supported non-Sprout spending key may only need a normal restore. Older material — such as a ZecWallet Lite seed, a legacy `wallet.dat`, or a standalone Sapling or Sprout spending key — may need a dedicated recovery path.
>
> If you think the funds are in **Sprout**, confirm that you still have spending authority before committing time to recovery. A `zc...` address or viewing material alone is not enough to move the funds.
>
> **YWallet no longer supports Zcash after Ironwood.** Use **Zkool** for ordinary non-Sprout restores from supported seeds and keys. Use **Argos** for ZecWallet Lite recovery, legacy wallet files, and standalone Sapling/Sprout spending keys. For Sprout, Argos is the first route to try; the full field guide covers the legacy sidecar fallback.
>
> Use the table below based on **what you actually have**, not the recovery tool you remember using.

| You have | Start here |
| --- | --- |
| A seed phrase or supported **non-Sprout spending key** from a current or recently maintained wallet, including old YWallet Zcash material | [Zkool](#fund-recovery-with-zkool) |
| A **viewing key only** | Zkool can import supported viewing keys for read-only access, but a viewing key cannot authorize recovery spending. Find the corresponding seed or spending key. |
| A 24-word **ZecWallet Lite** seed | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| A ZecWallet Lite or zcashd `wallet.dat`, or a standalone Sapling / Sprout spending key | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). As of September 18, 2026, v1.3.0 is current and preferred; use v1.2.0 or later for `wallet.dat` and Sprout recovery. |
| Sprout material that Argos cannot handle, or a recovery where you want the legacy components under your own control | Use the legacy sidecar route in the [full field guide](/research/zec-pool-migration/view). |
| No working seed or spending key, but a locked device, forgotten password, or failed disk | [Professional recovery](#professional-recovery-when-you-do-not-have-the-seed). Never send a working seed or spending key to someone who contacts you unsolicited. |

## Fund Recovery with Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) is the maintained Zcash successor to YWallet from the same developer. It supports transparent and modern shielded recovery paths, including legacy Sapling keys, but **not Sprout**.

Two situations are covered here:

1. **Restoring an account** from a seed phrase, private key, or viewing key
2. **Sweeping funds** out of a wallet that only ever supported transparent addresses

### 1) Restoring an Account

1. Install Zkool from the [releases page](https://github.com/hhanh00/zkool2/releases) and open it
2. On the **Account Manager** (the main page), tap the **+** button to reach the **New Account** screen
3. Enter an **Account Name** to identify this account
4. Turn on **Restore Account?**. This reveals the key and birth height fields
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts seed phrases, Sapling secret keys, transparent extended keys, and supported viewing keys. A viewing key is read-only and cannot authorize a spend.
6. Enter a **Birth Height** for an old account. Zkool does not scan blocks before this height, so choose a height earlier than the wallet's first activity if you are unsure. A birth height set too late can make real transactions appear to be missing.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Save the account, then sync it

### Restoring a seed from a different wallet

If the seed came from a wallet that follows ZIP 316 — including ZODL (formerly Zashi), Zingo, or zcashd — turn on **Advanced Options** and enable **Use Internal Change** before saving.

ZIP 316 uses a separate internal/change address. Restoring one of these accounts without **Use Internal Change** can make change outputs appear to be missing even though the funds still exist.

Two more fields live under **Advanced Options**:

- **Extra Passphrase (optional)**, only if the original wallet used one
- **Account Index**, if the original wallet held several accounts on one seed. The funds may be under a different index

> **These two only appear once a valid seed phrase is in the Key field.** With the field empty, or holding a private or viewing key, Zkool shows just **Use Internal Change** and **H/W Ledger**. Paste the seed first, then open Advanced Options.

### 2) Sweeping Funds from a Transparent-Only Wallet

If the old wallet or account held **transparent ZEC only**, restore the account first, find every used transparent address, then move the funds to a current shielded destination you control. Do not assume an old wallet brand was always transparent-only; some products added shielded support in later versions.

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

## ZecWallet Lite and legacy wallet recovery with Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) is no longer maintained and its repository is archived. Its seed derivation differs from the layout used by current wallets, so importing the same phrase into a modern wallet can miss funds held at ZecWallet Lite's additional derived addresses. [Argos](https://argos.sovright.com), from Sovright, is a desktop recovery workspace built for this and other legacy recovery cases.

Argos reads ZecWallet Lite seeds and wallet files, zcashd `wallet.dat`, standalone Sapling extended spending keys, and Sprout spending material. For Sprout, a ZecWallet Lite seed alone is not enough because those keys were generated separately. Argos is a recovery tool, not a day-to-day wallet: inspect the source material locally, scan, then sweep into a maintained wallet you control.

Least Authority [audited](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) the tool. Recovery itself is free. An optional donation to Sovright can appear during the sweep.

> **Never type a seed into a website.** The Argos site is only the download and the [user guide](https://argos.sovright.com/guide.html). Keys stay in the signed desktop app. Validation is local against the BIP-39 checksum. The seed field clears once the scan starts. Anyone who messages you asking for that seed "to help recover your funds" is scamming you.

### Before you open Argos

1. Download the desktop app from the [official Argos site](https://argos.sovright.com) or the [GitHub releases page](https://github.com/sovright/argos/releases). Verify checksums or signatures when they are published.
2. Use the current Argos release. As of September 18, 2026, **v1.3.0** is current and preferred. Use **v1.2.0 or later for `wallet.dat` and Sprout recovery**. Builds older than 1.1.0 can still scan but construct pre-Ironwood sweeps that the network rejects; update and retry.
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

Broadcasting a sweep is irreversible. Keep the original wallet file until every relevant pool has been swept and the destination wallet shows the expected funds. Once recovery is complete, retire legacy secrets rather than continuing to use them for new activity.

### Wallet files and standalone keys

On the welcome screen, **I have a wallet file** covers a ZecWallet Lite file, a zcashd `wallet.dat`, or standalone Sapling extended spending keys. Standalone Sprout spending-key recovery is handled by Argos's Sprout recovery path/CLI.

Argos reads wallet files without modifying them. If the wallet is encrypted, enter the passphrase when asked; it is used in memory and is not written to disk. Review the transparent, Sapling, and Sprout key counts before you start a scan.

Viewing keys are not accepted for a sweep because they cannot authorize spending.

### Sprout notes

A ZecWallet Lite seed does not derive Sprout keys. Those keys were generated separately. Recover Sprout from a zcashd `wallet.dat`, or from a standalone spending key in the CLI.

If the file already has spendable note data and a cached witness, Argos can offer **Sweep Sprout funds** without a chain scan. Otherwise it can run a resumable full-block scan over the P2P network. That scan is large and slow. The checkpoint it writes is spend-capable, so protect it like the original wallet.

Sprout value can only land in Sapling. After the Sapling funds are confirmed and spendable, move them onward to **Ironwood** with a current wallet that supports the recovered Sapling account. Do not stop at Sapling.

## Recovered funds and the Ironwood pool

Since the Ironwood (NU6.3) upgrade activated on 28 July 2026, the Orchard pool is spend-only. No new value can enter it, and existing value leaves through the turnstile into Ironwood.

If your recovered funds are in Orchard, move them to Ironwood using a **current wallet's built-in migration flow**. Orchard is exit-only after NU6.3.

Zkool 6.30.0 is current as of September 18, 2026 and supports Ironwood. Its migration design is privacy-focused but is not the same thing as claiming ZIP 318 conformance. Other current wallets may use ZIP 318-style staged migration. Follow the installed wallet's current migration screen and release notes rather than inventing a manual amount or schedule.

A staged migration can use multiple transactions, so the total fee can be higher than a one-shot transfer.

> **Migration amounts are public.** When value crosses the turnstile, the amount and block height are visible on chain even though the sender and receiver remain shielded. Use the wallet's built-in private/staged migration policy when privacy matters, and use network-level privacy such as Tor or another trusted privacy layer where appropriate. Network privacy can hide your IP link; it does not hide the public crossing amount.

## Deep Recovery with ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) is a **work-in-progress** Zingo Labs recovery project currently focused on ZecWallet Lite wallet files and wallet-format migration. Its README currently directs fund recovery users to the **Zingolib** export option while fuller ZeWIF support is still being developed.

Treat it as an advanced/edge-case tool rather than the default recovery path. For ordinary ZecWallet Lite seeds, wallet files, zcashd `wallet.dat`, and supported standalone spending keys, try Argos first. Verify anything recovered by ZExCavator in a maintained wallet before relying on it.

## Professional recovery when you do not have the seed

If the seed or key is gone, a self-hosted restore cannot start. Some people in that position use a professional recovery firm for forgotten passwords, hardware failures, or unreadable disks.

That path is not the same as restoring a seed you still have. Do not hand a working seed to anyone who offers to "recover" it for you. The scam version of this service is common.

[Unciphered](https://unciphered.com) is one firm that does this work in-house and has been covered in places such as [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). They are a general crypto recovery service, not a Zcash-specific tool, and they charge for the work. ZecHub does not endorse any recovery firm. If you go this route, confirm the official domain yourself and assume anyone who DMs you first is a scammer.

If you still have a working seed or spending key, start with a self-hosted recovery path such as Zkool or Argos on your own machine instead.

## YWallet is no longer maintained

YWallet was the recommended recovery tool on this page for a long time, and many older guides still point at it.

Its developer now states that YWallet no longer supports Zcash since the Ironwood update and directs Zcash users to **Zkool**, the maintained successor. Preserve old YWallet seed/key material, but do not begin a new Zcash migration in YWallet.

If you already have Zcash recovery material from YWallet, restore it in Zkool using the supported seed/key path above.

## Related pages

- [Wallets](/using-zcash/wallets) - which wallets are maintained and their Ironwood readiness, including Argos
- [Ironwood](/zcash-tech/ironwood) - what the upgrade changed and why funds migrate
- [Memos](/using-zcash/memos) - how encrypted memos work
- [Viewing Keys](/zcash-tech/viewing-keys) - read only access without spending power
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - public lightwalletd endpoints Argos can use
- [Argos user guide](https://argos.sovright.com/guide.html) - official walkthrough from Sovright
- [Naomi Brockwell on recovery tools](https://x.com/naomibrockwell/status/2079146521405333526) - Argos walkthrough and a note on professional recovery
