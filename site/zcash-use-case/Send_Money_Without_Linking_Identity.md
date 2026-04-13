<a href="https://github.com/zechub/zechub/edit/main/site/zcash-use-case/Send_Money_Without_Linking_Identity.md" target="_blank"><img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/></a>


# Send Money Without Linking Identity

One of the most powerful features of Zcash is the ability to send money to anyone, anywhere in the world, without either party's identity, balance, or transaction amount being exposed on the public blockchain. This guide teaches you how to leverage Zcash's shielded transactions for private, untraceable payments.

Whether you're paying a freelancer, sending money to family, supporting a cause, or simply exercising your right to financial privacy — this guide covers everything you need to know about sending Zcash privately.

---

## Prerequisites

Before proceeding, ensure you have:

- A Zcash wallet set up (Ywallet, ZecWallet Lite, or similar) — see [Step 1](Receive_Donations_Privately.md) if you haven't set one up yet
- A shielded wallet with a positive ZEC balance
- The recipient's Zcash shielded address (starting with `zs1` or `u1`)
- About 10-15 minutes

---

## Step 1: Understanding Transparent vs Shielded Transactions

Before sending anything, it's crucial to understand the fundamental difference between Zcash's two transaction types. This knowledge directly impacts your privacy.

### Transparent Transactions (t-addresses)

Transparent transactions work exactly like Bitcoin:

- **Sender address is public** — Anyone can see who sent the funds
- **Receiver address is public** — Anyone can see who received the funds
- **Amount is public** — The exact ZEC amount is visible to everyone
- **All history is traceable** — Anyone can trace the complete flow of funds

If you send ZEC from a transparent address, **blockchain analysts can potentially link your identity** to the transaction through exchange KYC data, IP address tracking, or other metadata.

### Shielded Transactions (z-addresses)

Shielded transactions use zk-SNARK technology:

- **Sender is hidden** — The blockchain doesn't reveal who sent the funds
- **Receiver is hidden** — The recipient's identity is cryptographically concealed
- **Amount is hidden** — The transaction amount is encrypted
- **History is untraceable** — There is no way to trace the flow of shielded funds

The only thing visible on the blockchain for a fully shielded transaction is that **a transaction occurred** — nothing more.

### The Privacy Spectrum

| Transaction Type | Sender Visible? | Receiver Visible? | Amount Visible? |
|-----------------|-----------------|-------------------|-----------------|
| t → t | ✅ Yes | ✅ Yes | ✅ Yes |
| t → z | ✅ Yes | ❌ No | ❌ No |
| z → t | ❌ No | ✅ Yes | ✅ Yes |
| **z → z** | **❌ No** | **❌ No** | **❌ No** |

**For complete privacy, always send from a shielded address to a shielded address (z → z).**

---

## Step 2: Prepare Your Wallet for Sending

### Ensure Your Wallet Is Synced

Before sending any transaction, your wallet must be fully synced with the Zcash blockchain:

**In Ywallet:**
1. Open the app
2. Check the sync status — it should say "Synced" or show 100%
3. If syncing, wait for it to complete before proceeding
4. Your available balance should reflect your actual shielded balance

**In ZecWallet Lite:**
1. Open the wallet
2. Check the sync indicator (usually at the bottom of the window)
3. Wait for the sync to reach the latest block
4. The sync process downloads only the relevant shielded data, not the full blockchain

### Verify Your Balance

- Check that your **shielded balance** (not transparent) has sufficient funds
- Remember to account for the small transaction fee (typically a fraction of a ZEC)
- If your funds are in a transparent address, you'll need to shield them first

### Shielding Your Funds (If Needed)

If you received ZEC at a transparent address (t-address) or bought it on an exchange and withdrew to a t-address:

1. In your wallet, look for a **Shield** or **Shield Funds** button
2. This creates a shielded transaction that moves your funds from t-address to z-address
3. Wait for the shielding transaction to confirm (~2.5 minutes)
4. Your funds are now in your shielded balance and ready for private sending

**In Ywallet:** Shielding is typically automatic for incoming shielded funds. For transparent funds, use the shield function in the settings.

**In ZecWallet Lite:** Go to **Send** → Enter your own shielded address as the recipient → Send. This "self-shields" your transparent funds.

---

## Step 3: Sending a Shielded Transaction

### Getting the Recipient's Shielded Address

Before you can send privately, the recipient must provide you with their **shielded address**:

- Shielded addresses start with `zs1` (Sapling) or `u1` (Unified)
- Ask the recipient to share their shielded address, not their transparent address
- The address can be shared as text or as a QR code
- **Never send to a transparent address** if privacy is your goal

### Verifying the Address

Always double-check the recipient's address before sending:

1. **Compare the first 5 and last 5 characters** of the address
2. If using a QR code, verify the decoded text matches what the recipient provided
3. For large amounts, consider sending a small test transaction first
4. Use secure communication channels to receive the address (encrypted messaging, in person, etc.)

### Sending in Ywallet

1. Open Ywallet and ensure it's synced
2. Tap the **Send** button
3. **Enter or paste the recipient's shielded address**
   - You can also scan a QR code using the camera icon
4. **Enter the amount** of ZEC to send
   - You can enter the amount in ZEC or in your local currency equivalent
5. **Add a memo (optional)** — Shielded memos are encrypted and only visible to sender and receiver
   - Useful for payment references or personal messages
   - Keep memos brief and avoid sensitive information
6. **Review the transaction details:**
   - Recipient address (verify again!)
   - Amount
   - Transaction fee
   - Total to be deducted
7. **Confirm the transaction** — Enter your PIN/password/biometric
8. Wait for confirmation — the transaction should confirm within ~2.5 minutes

### Sending in ZecWallet Lite

1. Open ZecWallet Lite and wait for sync to complete
2. Click the **Send** tab
3. **ZEC Address:** Paste the recipient's shielded address
4. **Amount:** Enter the ZEC amount
5. **Memo (optional):** Add an encrypted memo if needed
6. Click **Send**
7. Review the confirmation dialog and click **Confirm**
8. The transaction will appear in your history once confirmed

### Transaction Fees

Zcash transaction fees are very low — typically fractions of a cent. The fee is automatically calculated by your wallet. Even during network congestion, fees remain minimal compared to Bitcoin or Ethereum.

---

## Step 4: Verifying Transaction Privacy

After sending a shielded transaction, you may want to verify that it was indeed private. Here's how:

### Checking on a Block Explorer

1. Visit a Zcash block explorer like [blockchair.com/zcash](https://blockchair.com/zcash) or [explorer.zcha.in](https://explorer.zcha.in/)
2. Search for your transaction ID (txid) — your wallet should display this after sending
3. What you'll see for a fully shielded (z → z) transaction:
   - **Input addresses:** Hidden (shown as shielded pool)
   - **Output addresses:** Hidden (shown as shielded pool)
   - **Amount:** Hidden
   - The only visible information is the transaction ID and block number

### What Others Cannot See

After your shielded transaction:
- ❌ The recipient cannot see your wallet balance
- ❌ The recipient cannot see your other transactions
- ❌ Third parties cannot see who sent the funds
- ❌ Third parties cannot see who received the funds
- ❌ Third parties cannot see the transaction amount
- ✅ The recipient receives the funds and can see the memo (if any)
- ✅ You can see the transaction in your own wallet history

### Important: Receiving Side Privacy

Remember that if you receive ZEC from a transparent address (t → z), the sender's address IS visible on the blockchain. For both parties to maintain privacy, **both sides must use shielded addresses**.

---

## Step 5: Security and Safety Considerations

### Protecting Transaction Privacy

1. **Use Tor or a VPN** when sending transactions
   - Your wallet software connects to Zcash nodes over the internet
   - Your IP address could potentially be linked to your wallet activity
   - Ywallet supports Tor integration on mobile
   - On desktop, route your wallet through Tor or use a trusted VPN

2. **Don't reuse addresses unnecessarily**
   - While shielded addresses provide strong privacy, using fresh addresses for different purposes adds defense in depth
   - Most modern wallets generate new addresses automatically

3. **Be careful with memos**
   - Shielded memos are encrypted, but both parties can see them
   - Don't include personally identifying information in memos
   - Avoid memos that could link the transaction to your real identity

4. **Timing analysis**
   - If you always send transactions at the same time, patterns could emerge
   - Vary your sending times when possible
   - Consider using your wallet's "send later" feature if available

### Avoiding Common Mistakes

1. **Don't send to a transparent address** — This breaks the privacy chain
2. **Don't use exchange withdrawals directly** — Exchanges typically send from their transparent addresses, linking the transaction to their known addresses. If you must receive from an exchange, immediately shield the funds before sending them onward
3. **Don't link your exchange account to your personal wallet in a traceable way** — When withdrawing from exchanges, the withdrawal goes to your address. This creates a link between your exchange identity and that address
4. **Don't share your transaction ID publicly** — While shielded, the txid can still be used to correlate information

### For High-Value Transactions

- Consider using a **fresh wallet** that has never been linked to your identity
- Send a **small test amount first** to confirm everything works
- Wait for full confirmation before considering the transaction complete
- Consider splitting large amounts across multiple transactions over time (though this is generally unnecessary with Zcash's strong shielded privacy)

---

## External Resources

- [Zcash Shielded Transactions Explained](https://z.cash/technology/zk-snarks/)
- [Zerocash Protocol Paper](https://zerocash-project.org/paper)
- [Ywallet](https://ywallet.app/) — Recommended wallet for private sending
- [ZecWallet Lite](https://www.zecwallet.co/) — Desktop alternative
- [Tor Project](https://www.torproject.org/) — For anonymous network access
- [Orbot for Android](https://guardianproject.info/apps/orbot/) — Tor for mobile wallets

---

## What's Next?

Now that you can send money privately, you might want to apply these skills to a real-world scenario. The next guide shows **freelancers** how to set up a complete privacy-preserving financial workflow for client work.

→ **[Step 3: Freelancer Privacy Setup](Freelancer_Privacy_Setup.md)**
