<a href="https://github.com/zechub/zechub/edit/main/site/zcash-use-case/Receive_Donations_Privately.md" target="_blank"><img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/></a>


# Receive Donations Privately with Zcash

Whether you run a blog, create open-source software, stream content, or support a community cause — receiving donations shouldn't require exposing your financial history to the world. With Zcash, you can accept donations privately, keeping your balance, transaction history, and personal information shielded from public view.

This guide walks you through the complete process of setting up a Zcash wallet, creating a shielded address, and receiving donations — all without linking your identity to your financial activity.

---

## Prerequisites

Before you begin, make sure you have:

- A computer or smartphone with internet access
- A secure device (free of malware, with up-to-date OS)
- A reliable internet connection
- About 15-20 minutes for initial setup

---

## Step 1: Install a Zcash Wallet

Choose one of the following wallets based on your device and needs:

### Option A: Ywallet (Recommended — Mobile & Desktop)

[Ywallet](https://ywallet.app/) is a modern, user-friendly Zcash wallet available for Android, iOS, Windows, macOS, and Linux.

**On Android:**
1. Open the [Google Play Store](https://play.google.com/store/apps/details?id=app.ywallet) or download the APK from [ywallet.app](https://ywallet.app/)
2. Search for "Ywallet" and tap **Install**
3. Open the app once installation completes

**On iOS:**
1. Open the [App Store](https://apps.apple.com/app/ywallet)
2. Search for "Ywallet" and tap **Get**
3. Open the app after installation

**On Desktop (Windows/macOS/Linux):**
1. Visit [ywallet.app](https://ywallet.app/) and download the version for your OS
2. Install the application following the installer prompts
3. Launch Ywallet

### Option B: ZecWallet Lite (Desktop)

[ZecWallet Lite](https://www.zecwallet.co/) is a lightweight wallet that connects to full nodes without downloading the entire blockchain (~500MB download).

1. Visit [zecwallet.co](https://www.zecwallet.co/)
2. Download the latest release for your operating system
3. Verify the download signature (instructions on the download page)
4. Install and launch ZecWallet Lite

### Option C: Full Node Wallet (Advanced)

For maximum privacy and network support, running a full node is ideal. See the [Zcashd documentation](https://zcash.readthedocs.io/en/latest/) for setup instructions.

---

## Step 2: Create Your Zcash Shielded Address

This is the most critical step. Understanding the difference between address types is essential for your privacy.

### Understanding Zcash Address Types

| Type | Prefix | Privacy Level | Description |
|------|--------|---------------|-------------|
| Transparent | `t1...` | ❌ None | Like Bitcoin — all details are public |
| Shielded (Sapling) | `zs1...` | ✅ Full | Sender, receiver, and amount are hidden |
| Shielded (Unified) | `u1...` | ✅ Full | Latest address format with full shielding |

**⚠️ Critical: Always use shielded addresses (starting with `z`) when privacy matters.**

### Creating Your Address in Ywallet

1. **Open Ywallet** after installation
2. On first launch, you'll be prompted to **Create a New Wallet** or **Restore Existing Wallet**
3. Select **Create a New Wallet**
4. **Write down your recovery phrase** (seed phrase) — this is typically 24 words
   - Write it on paper, not digitally
   - Store it in a secure, offline location
   - Never share it with anyone
   - This phrase is the ONLY way to recover your funds if you lose your device
5. Confirm the recovery phrase by entering it when prompted
6. Your wallet will generate your addresses automatically
7. **Find your shielded address:**
   - Tap the **Receive** button
   - Your default address should be a shielded address (starting with `zs1` or `u1`)
   - If you see multiple addresses, always choose the one starting with `z` or `u`
8. **Copy the address** — you'll share this with donors

### Creating Your Address in ZecWallet Lite

1. Open ZecWallet Lite
2. Go to **Receive** tab
3. Your shielded address (starting with `zs1`) will be displayed
4. Click **Copy** to copy the address to clipboard

---

## Step 3: Share Your Donation Address

Now that you have your shielded address, you need to share it with potential donors. Here's how to do it effectively while maintaining privacy:

### Best Practices for Sharing Your Address

1. **Share only the shielded address** — Never share your transparent address publicly
2. **Use a QR code** — Most wallets can generate a QR code for your address. This reduces the chance of typos and makes it easy for donors to send funds.
3. **Consider address rotation** — While shielded addresses provide strong privacy, generating a new address periodically adds an extra layer. Ywallet supports this natively.
4. **Don't link your address to your real identity publicly** — If you publish your address on a website, consider whether the website itself reveals your identity.

### Where to Publish Your Address

- **Your website or blog** — Add a "Support Me" or "Donate" section with your QR code and address
- **GitHub README** — For open-source projects, add a sponsorship section
- **Social media** — Share in your bio or pinned posts (note: this links your social identity to the address, though shielded transactions hide the amounts and flow)
- **Content platforms** — Patreon alternatives like [Liberapay](https://liberapay.com/) can display your crypto address
- **Email signature** — Add a subtle donation link to your professional email

### Important Privacy Warning

Even though shielded transactions hide the transaction details, **the act of publishing your address publicly does create a link between your public identity and that address**. Observers won't see your balance or transaction amounts, but they'll know that address belongs to you.

For maximum privacy:
- Generate a fresh address for each donation campaign
- Use a pseudonym when publishing the address
- Consider using a [unified address](https://z.cash/ua/) which provides the strongest privacy guarantees

---

## Step 4: Receive and Confirm Donations

Once donors start sending ZEC to your shielded address, here's how to confirm receipt:

### Checking Your Balance

**In Ywallet:**
1. Open the app
2. Your **shielded balance** will be displayed on the main screen
3. Incoming transactions will appear in the transaction history
4. Shielded transactions may take a few minutes to confirm — this is normal

**In ZecWallet Lite:**
1. Open the wallet
2. The **Shielded Balance** is shown on the dashboard
3. Wait for the wallet to sync (indicated by the sync progress bar)
4. Transactions appear in the history once confirmed

### Understanding Confirmation Times

Zcash transactions typically confirm within **~2.5 minutes** (one block). However, shielded transactions may take slightly longer to appear in your wallet due to the additional cryptographic verification required.

- **1 confirmation** (~2.5 min) — Transaction is on the blockchain
- **10 confirmations** (~25 min) — Considered very secure
- Most wallets show incoming funds after 1-2 confirmations

### Handling Different Donation Amounts

ZEC is divisible to 8 decimal places, so you can receive any amount — from fractions of a cent to large donations. Your wallet handles all amounts automatically.

---

## Step 5: Security Best Practices

Protecting your donated funds is just as important as receiving them.

### Protect Your Recovery Phrase

- **Write it on paper** — Never store it digitally (no screenshots, no cloud storage, no email)
- **Make multiple copies** — Store in separate secure locations (safe, bank deposit box, trusted family member)
- **Consider a metal backup** — Products like [Cryptosteel](https://cryptosteel.com/) or [Billfodl](https://billfodl.com/) protect against fire and water damage
- **Never share it** — No legitimate service will ever ask for your seed phrase

### Device Security

- **Keep your OS updated** — Security patches protect against known vulnerabilities
- **Use a dedicated device** if handling significant amounts
- **Install antivirus/anti-malware** software
- **Enable full-disk encryption** on your device
- **Use a strong device password** or biometric lock

### Wallet Security

- **Set a strong wallet password** or PIN
- **Enable biometric authentication** if your device supports it (Ywallet offers this)
- **Keep your wallet software updated** — Updates often include security improvements
- **Never enter your seed phrase** on any website or app other than your wallet

### Operational Security

- **Don't discuss your holdings** publicly or with strangers
- **Use a VPN** (such as [Tor](https://www.torproject.org/) or a trusted VPN service) when accessing your wallet on public networks
- **Be cautious of phishing** — Scammers may impersonate wallet developers or exchanges
- **Verify addresses carefully** — Always double-check addresses before sending (when you eventually spend)

### For Large Donations

If you receive a significant amount of ZEC:
- Consider moving funds to a **cold storage** solution
- Look into hardware wallets like [Trezor](https://trezor.io/) or [Ledger](https://www.ledger.com/) which support Zcash
- Consider splitting large amounts across multiple wallets (not all at once, to avoid linking)
- Consult a financial advisor familiar with cryptocurrency

---

## Step 6: Managing Ongoing Donations

### Tracking Donations Without Compromising Privacy

Since shielded transactions hide amounts from the public, you'll need your own system for tracking:

- **Keep a private spreadsheet** — Record date, approximate amount, and purpose for tax purposes
- **Use wallet notes** — Some wallets allow you to add memos to transactions
- **Export transaction history** — Most wallets let you export your private transaction history for accounting

### Communicating with Donors

- Thank donors personally when possible
- Consider publishing a **transparency report** (without revealing amounts or transaction details) showing how donations are used
- For recurring donations, consider setting up a dedicated address per donor

---

## External Resources

- [Ywallet Documentation](https://ywallet.app/)
- [ZecWallet Lite Guide](https://www.zecwallet.co/)
- [Zcash Shielded Addresses Explained](https://z.cash/support/addresses/)
- [zcash4win — Windows Wallet Guide](https://github.com/zechub/zcash4win)
- [Hardware Wallet Support for Zcash](https://trezor.io/learn/a/what-coins-does-trezor-support)
- [Privacy Guides — Wallet Security](https://www.privacyguides.org/en/cryptocurrency/)

---

## What's Next?

Now that you can receive donations privately, the next logical step is learning how to **send Zcash without linking your identity** to the recipient or the transaction.

→ **[Step 2: Send Money Without Linking Identity](Send_Money_Without_Linking_Identity.md)**
