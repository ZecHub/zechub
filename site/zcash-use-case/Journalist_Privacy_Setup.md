<a href="https://github.com/zechub/zechub/edit/main/site/zcash-use-case/Journalist_Privacy_Setup.md" target="_blank"><img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/></a>


# Journalist Privacy Setup with Zcash

Journalists face some of the highest-stakes financial privacy challenges of any profession. The ability to receive funds from sources, pay confidential informants, and manage operational finances without exposing financial trails can be a matter of source safety — and sometimes, a matter of life and death.

This guide covers the most comprehensive Zcash privacy setup, designed for journalists, whistleblowers, human rights workers, and anyone whose financial privacy is critical to their safety.

**⚠️ Warning: If you are in immediate danger, seek professional security assistance. This guide provides technical guidance but cannot replace personalized security consulting.**

---

## Why Journalists Need Financial Privacy

### The Threat Landscape

Journalists face unique financial surveillance risks:

- **Source protection** — If a government or adversary can trace payments to your sources, those sources are in danger
- **Operational security** — Financial patterns can reveal your activities, contacts, and locations
- **Asset protection** — In hostile jurisdictions, journalists' assets may be frozen or seized
- **Cross-border payments** — International sources and collaborators need payment methods that don't require traditional banking
- **Legal protection** — In some jurisdictions, journalists can be compelled to reveal financial records

### How Traditional Systems Fail Journalists

- **Bank records** can be subpoenaed, revealing all transactions
- **Payment processors** (PayPal, Venmo, etc.) share data with governments and advertisers
- **Credit card transactions** create permanent, searchable records
- **Wire transfers** expose sender, receiver, and amount to multiple intermediaries
- **Cash** is increasingly impractical for remote sources and international transactions

### How Zcash Protects Journalists

- **Shielded transactions** hide sender, receiver, and amount from all observers
- **Self-custody** means no third party can freeze, seize, or report your funds
- **No KYC required** — You can use Zcash without providing personal information
- **Global accessibility** — Anyone with internet access can send or receive ZEC
- **Cryptographic privacy** — Privacy is guaranteed by mathematics, not by corporate policy

---

## Step 1: Secure Wallet Setup

For journalists, wallet security goes beyond the basics. This section covers the most secure setup options.

### Threat Assessment

Before setting up your wallet, assess your threat model:

| Threat Level | Description | Recommended Setup |
|-------------|-------------|-------------------|
| **Low** | General privacy concerns, no specific threats | Ywallet on personal device |
| **Medium** | Government surveillance, hostile employer | Dedicated device + Ywallet + Tor |
| **High** | Active targeting by state actors | Air-gapped setup + hardware wallet |
| **Critical** | Life-threatening situation | Full operational security protocol (see Step 5) |

### Standard Secure Setup (Low to Medium Threat)

1. **Use a dedicated device** — A separate phone or laptop used only for Zcash operations
   - Factory reset the device before setup
   - Install only essential apps (wallet, Tor browser, secure messaging)
   - Keep the OS updated with security patches
   - Enable full-disk encryption

2. **Install Ywallet** — [ywallet.app](https://ywallet.app/)
   - Download only from the official source
   - Verify the download signature/hash if available
   - Install and create a new wallet

3. **Generate and secure your recovery phrase**
   - Write the 24-word phrase on paper
   - Never store it digitally
   - Consider splitting it using [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
   - Store shares in separate physical locations

4. **Enable Tor routing**
   - Install [Orbot](https://guardianproject.info/apps/orbot/) (Android) or use [Tor Browser](https://www.torproject.org/)
   - Configure your wallet to route through Tor
   - This hides your IP address from Zcash nodes

### Air-Gapped Setup (High Threat)

An air-gapped setup means your wallet device never connects to the internet. This is the gold standard for security.

1. **Requirements:**
   - Two devices: one online (for viewing balances, checking transactions), one offline (for signing transactions)
   - USB drive or QR code transfer mechanism
   - [ZecWallet Offline Signer](https://www.zecwallet.co/) or similar tool

2. **Setup Process:**
   - **Offline device:** Install wallet, create wallet, generate addresses
   - **Online device:** Monitor blockchain for incoming transactions
   - **To receive:** Share your shielded address (can be done via QR code on the offline device, photographed and shared)
   - **To send:**
     1. Create an unsigned transaction on the online device
     2. Transfer the unsigned transaction to the offline device (via USB or QR code)
     3. Sign the transaction on the offline device
     4. Transfer the signed transaction back to the online device
     5. Broadcast the signed transaction from the online device

3. **Hardware Wallet Integration:**
   - **Trezor Model T** supports Zcash and provides hardware-level security
   - **Ledger Nano X** also supports Zcash
   - Hardware wallets keep your private keys on a separate device that never exposes them to your computer
   - Combine hardware wallet with Tor for maximum security

### Wallet Selection Criteria for Journalists

When choosing a wallet, prioritize:

- **Open source** — Code can be audited by security experts
- **Active development** — Regular updates and security patches
- **Shielded-by-default** — Uses shielded addresses automatically
- **Tor support** — Built-in or easy Tor integration
- **No telemetry** — Doesn't send usage data to developers
- **Reproducible builds** — Can verify the binary matches the source code

**Recommended wallets:**
- [Ywallet](https://ywallet.app/) — Modern, actively developed, open source
- [ZecWallet Lite](https://www.zecwallet.co/) — Established, well-audited
- [zcash4win](https://github.com/zechub/zcash4win) — Windows-specific wallet

---

## Step 2: Securely Receiving Funds from Sources

Receiving funds from sources is one of the most sensitive operations a journalist performs. Here's how to do it safely.

### Setting Up Source-Specific Addresses

1. **Generate a unique shielded address for each source**
   - Never reuse addresses between sources
   - If one address is compromised, it doesn't expose other sources
   - Label addresses securely in your private records (use code names, not real names)

2. **Sharing the address with your source**
   - **In person:** Show the QR code on your device, let them photograph it
   - **Encrypted messaging:** Use [Signal](https://signal.org/) or [Session](https://getsession.org/) to send the address
   - **Dead drop:** Leave the address at a physical location (written on paper)
   - **Never** send addresses via email, SMS, or unencrypted channels

3. **Source education**
   - Many sources won't know how to use Zcash
   - Provide clear, simple instructions
   - Consider setting up a wallet for them if meeting in person
   - Recommend they use Tor when acquiring and sending ZEC

### Protecting Source Identity

Even with shielded transactions, there are ways a source's identity could be compromised:

1. **Exchange KYC** — If your source buys ZEC on a KYC exchange and sends it directly, the exchange knows the source bought ZEC and when. To mitigate:
   - Recommend the source use a **non-KYC exchange** or peer-to-peer platform
   - Suggest the source **shield the funds** (send to their own shielded address) before sending to you
   - Consider recommending **mining ZEC** directly to a shielded address

2. **Network surveillance** — If a source's internet is monitored:
   - Recommend they use **Tor** when accessing their wallet
   - Suggest they use a **public Wi-Fi network** (with Tor) for transactions
   - For high-risk sources, recommend an **in-person meeting** to transfer funds

3. **Device forensics** — If a source's device is seized:
   - Recommend they use a **dedicated device** for Zcash operations
   - Suggest they **delete wallet data** after sending funds
   - Recommend **full-disk encryption** on all devices

---

## Step 3: Operational Security (OPSEC)

OPSEC is the practice of keeping your operational details secret. For journalists using Zcash, this is critical.

### Communication Security

1. **Use encrypted messaging** for all Zcash-related communications:
   - [Signal](https://signal.org/) — Best overall, but requires phone number
   - [Session](https://getsession.org/) — No phone number required, routes through Onion routing
   - [Briar](https://briarproject.org/) — Peer-to-peer, works offline via Bluetooth/Wi-Fi
   - [Matrix](https://matrix.org/) — Decentralized, supports E2E encryption

2. **Never discuss Zcash operations on unencrypted channels:**
   - No email about wallet addresses or transactions
   - No SMS about financial operations
   - No social media posts about your Zcash activities

3. **Compartmentalize your communications:**
   - Use separate accounts/apps for different aspects of your work
   - Don't mix personal and operational communications

### Device Security

1. **Use separate devices for separate purposes:**
   - Device A: Personal use (social media, email, etc.)
   - Device B: Zcash operations (wallet only)
   - Device C: Source communications (secure messaging only)

2. **Keep devices updated:**
   - Install security patches promptly
   - Use automatic updates when possible
   - Verify updates come from legitimate sources

3. **Physical security:**
   - Keep devices with you or in a secure location
   - Use strong passcodes (not simple PINs)
   - Enable remote wipe capabilities
   - Consider tamper-evident storage for devices

### Financial OpSec

1. **Don't mix Zcash with identifiable income:**
   - Keep your Zcash operations separate from your regular banking
   - Don't deposit Zcash proceeds directly into your personal bank account without considering the implications
   - If you need to convert to fiat, use methods that preserve privacy

2. **Timing considerations:**
   - Don't receive funds immediately before or after identifiable events
   - Vary the timing of transactions to avoid pattern detection
   - Consider that transaction timing alone can reveal information

3. **Amount considerations:**
   - Unusual amounts can be identifying (e.g., receiving exactly $5,000.00 worth of ZEC)
   - Consider receiving round ZEC amounts rather than exact fiat equivalents

---

## Step 4: Emergency Procedures

Things can go wrong. Here's how to prepare for emergencies.

### Wallet Compromise

If you believe your wallet has been compromised:

1. **Immediately move funds** to a new wallet
   - Create a new wallet on a clean device
   - Send all funds from the compromised wallet to the new wallet's shielded address
   - This breaks the link between the old and new addresses

2. **Assume all previous addresses are compromised**
   - Generate entirely new addresses for all ongoing operations
   - Notify trusted contacts of your new address through secure channels

3. **Investigate the compromise**
   - Check for malware on your device
   - Review your operational security practices
   - Consider what information may have been exposed

### Device Seizure

If your device is seized or at risk of seizure:

1. **Wipe the device remotely** (if you've set this up in advance)
2. **Destroy physical backup materials** (paper seed phrases) if safe to do so
3. **Alert trusted contacts** that your address has changed
4. **Access funds from a backup** — This is why you should maintain a separate backup wallet with emergency funds

### Source Compromise

If you believe a source has been compromised:

1. **Stop all communications** through potentially compromised channels
2. **Move any pending funds** — If the source was about to send you ZEC, provide a new address through a secure channel
3. **Assess what information may have been exposed**
4. **Consider the safety of the source** and take appropriate action

### Duress Scenario

If you are being coerced to reveal wallet access:

1. **Maintain a decoy wallet** with a small amount of funds
   - If coerced, reveal the decoy wallet's seed phrase
   - Your real funds remain in the hidden wallet
2. **Use plausible deniability features** if your wallet supports them
3. **Know your legal rights** regarding compelled decryption in your jurisdiction

---

## Step 5: Converting to Fiat (When Necessary)

Sometimes you need to convert ZEC to fiat currency. Here's how to do it while preserving as much privacy as possible.

### Options for Converting ZEC to Fiat

1. **Peer-to-peer exchanges** — [HodlHodl](https://hodlhodl.com/), [Bisq](https://bisq.network/)
   - No KYC required
   - Trade directly with other individuals
   - Payment via bank transfer, cash, or other methods

2. **Non-KYC exchanges** — Some exchanges don't require identity verification
   - Research current options as they change frequently
   - Use Tor when accessing these services
   - Be aware of legal implications in your jurisdiction

3. **Bitcoin ATMs** — Some accept ZEC or can be used after converting ZEC to BTC
   - Pay in cash
   - No identity verification (below certain limits)
   - Higher fees but good for small amounts

4. **Direct ZEC-to-fiat trades** — Find trusted individuals in your community
   - Meet in person
   - Exchange ZEC for cash
   - Build trusted relationships over time

### Best Practices for Fiat Conversion

- **Convert small amounts regularly** rather than large amounts at once
- **Use different methods** for different conversions to avoid pattern detection
- **Don't convert immediately** after receiving funds — wait a variable period
- **Keep records** of conversions for your own accounting (securely)

---

## External Resources

- [Freedom of the Press Foundation](https://freedom.press/) — Journalist security resources
- [Committee to Protect Journalists](https://cpj.org/) — Press freedom and safety
- [Security in a Box](https://securityinabox.org/) — Digital security guide for activists
- [EFF Surveillance Self-Defense](https://ssd.eff.org/) — Privacy and security guides
- [Signal](https://signal.org/) — Encrypted messaging
- [Tor Project](https://www.torproject.org/) — Anonymous network access
- [Ywallet](https://ywallet.app/) — Recommended secure wallet
- [Trezor](https://trezor.io/) — Hardware wallet with Zcash support
- [Zcash Foundation](https://zfnd.org/) — Non-profit supporting Zcash development

---

## Journey Complete

You've reached the end of the **Use Zcash in the Real World** journey. From receiving your first private donation to running a journalist-level secure financial operation, you now have the knowledge to use Zcash for real-world privacy needs.

### What You've Learned

1. ✅ **Receive donations privately** — Set up a wallet and receive shielded payments
2. ✅ **Send money without linking identity** — Understand and use shielded transactions
3. ✅ **Freelancer privacy setup** — Manage client payments with financial privacy
4. ✅ **Merchant payment acceptance** — Accept Zcash in your business or store
5. ✅ **Private community treasury** — Manage shared funds with governance
6. ✅ **Journalist security setup** — Maximum privacy for high-stakes situations

### Continuing Your Zcash Journey

- Join the [Zcash Community Forum](https://forum.zcashcommunity.com/)
- Explore more guides on [ZecHub](https://zechub.global/)
- Contribute to Zcash development and documentation
- Help others learn to use Zcash privately
- Stay updated on Zcash protocol improvements

### Remember

Privacy is not about hiding wrongdoing — it's about protecting your right to live freely. Financial privacy is a fundamental aspect of personal autonomy, and Zcash provides the technology to exercise that right.

**Stay private. Stay safe.**

---

← [Back to Use Zcash in the Real World](README.md)
