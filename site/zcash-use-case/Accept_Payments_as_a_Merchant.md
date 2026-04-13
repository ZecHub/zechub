<a href="https://github.com/zechub/zechub/edit/main/site/zcash-use-case/Accept_Payments_as_a_Merchant.md" target="_blank"><img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/></a>


# Accept Payments as a Merchant with Zcash

Running a business that accepts Zcash gives you and your customers financial privacy that traditional payment processors simply cannot match. No chargebacks from payment processors, no frozen accounts, no 3% processing fees, and no customer data stored on third-party servers.

This guide covers everything a merchant needs to know — from setting up a Zcash wallet for business use to integrating payments into your website or physical store.

---

## Why Merchants Should Consider Zcash

### Advantages Over Traditional Payment Processors

| Feature | Credit Cards | PayPal | Zcash |
|---------|-------------|--------|-------|
| Transaction Fee | 2.9% + $0.30 | 2.9% + $0.30 | < $0.01 |
| Chargeback Risk | High | High | None |
| Account Freezes | Possible | Common | Impossible |
| Customer Privacy | Limited | Limited | Strong |
| Settlement Time | 2-7 days | Instant (to PayPal) | ~2.5 minutes |
| Cross-Border Fees | 1-4% extra | 4-5% extra | None |
| Self-Custody | No | No | Yes |

### Why Customer Privacy Matters to Merchants

- **Competitive advantage** — Privacy-conscious customers actively seek merchants who accept Zcash
- **Reduced liability** — You don't store customer financial data, so there's nothing to leak in a breach
- **Global reach** — Accept payments from anyone with internet access, regardless of their banking situation
- **No discrimination** — You can't discriminate based on a customer's financial history because you don't see it
- **Lower costs** — Near-zero transaction fees mean better margins or lower prices for customers

### Who Should Use This Guide

- Online store owners
- Service providers (consultants, designers, developers)
- Physical retailers wanting to accept crypto
- Digital product sellers
- Subscription service operators
- Anyone selling goods or services online

---

## Step 1: Set Up Your Merchant Wallet

### Choose Your Wallet Strategy

As a merchant, you need a wallet solution that balances convenience, security, and privacy.

### Option A: Ywallet (Small to Medium Volume)

For merchants processing a moderate number of transactions:

1. **Install Ywallet** on a dedicated device — [ywallet.app](https://ywallet.app/)
2. **Create a new merchant wallet** — Don't mix personal and business funds
3. **Back up the recovery phrase** — Store it in a secure location (safe, bank deposit box)
4. **Generate your primary receiving address** — This is your main business shielded address

### Option B: ZecWallet Lite + Full Node (Medium to High Volume)

For higher-volume merchants:

1. **Install ZecWallet Lite** on your business computer — [zecwallet.co](https://www.zecwallet.co/)
2. **Run a Zcash full node** (zcashd or zebrad) for maximum independence
   - Full node: [Zcashd](https://github.com/zcash/zcash) — Requires ~100GB storage
   - Lighter alternative: [Zebrad](https://github.com/ZcashFoundation/zebra) — Written in Rust
3. **Connect ZecWallet Lite to your node** for direct, trustless transaction verification

### Option C: BTCPay Server (Professional Setup)

For merchants who want a complete payment processing solution:

1. **Set up BTCPay Server** — [btcpayserver.org](https://btcpayserver.org/)
2. BTCPay Server supports Zcash and provides:
   - Professional invoicing system
   - Payment buttons for your website
   - Point-of-sale interface for physical stores
   - Automatic payment detection
   - Multi-user access for staff
   - Integration with accounting software
3. **Self-hosted** — You control everything, no third party

### Best Practices for Merchant Wallets

- **Use a dedicated device** for your merchant wallet when possible
- **Enable all security features** — PIN, biometrics, encryption
- **Keep the wallet software updated** — Security patches are critical
- **Maintain a cold storage strategy** — Move excess profits to cold storage regularly
- **Separate addresses** — Use different addresses for different products or services

---

## Step 2: Generate Payment Requests

### Basic Payment Request

For simple, one-off transactions:

1. **Determine the amount** — In ZEC or in fiat with real-time conversion
2. **Generate a new shielded address** for this payment
3. **Share the address and amount** with the customer
4. **Wait for confirmation** (~2.5 minutes)
5. **Confirm receipt** and fulfill the order

### Creating Payment Requests with Specific Amounts

**In Ywallet:**
1. Go to **Receive**
2. Enter the **amount** you're requesting
3. The wallet generates a QR code containing both the address and amount
4. Share the QR code or the address with the customer

**In BTCPay Server:**
1. Create a **new invoice** in the dashboard
2. Enter the amount (in fiat or ZEC)
3. BTCPay generates a payment page with QR code
4. Send the payment link to the customer or embed it on your website

### Handling Fiat-Priced Products

If your products are priced in fiat currency:

1. Use a **live price feed** to convert fiat to ZEC at the current exchange rate
2. **BTCPay Server** handles this automatically with configurable rate sources
3. For manual conversion, check [CoinGecko](https://www.coingecko.com/en/coins/zcash) or [CoinMarketCap](https://coinmarketcap.com/currencies/zcash/)
4. Consider **adding a small buffer** (1-2%) to account for price volatility during the payment window
5. Set a **payment window** (e.g., 15 minutes) during which the rate is locked

---

## Step 3: Integrate Zcash Payments into Your Website or Store

### Online Store Integration

#### Option A: BTCPay Server (Recommended)

BTCPay Server is the gold standard for self-hosted crypto payment processing:

1. **Install BTCPay Server** on a VPS or local server
   - [Docker deployment](https://docs.btcpayserver.org/Docker/) — Recommended
   - [LunaNode deployment](https://docs.btcpayserver.org/LunaNodeWebDeployment/) — One-click
   - [Raspberry Pi deployment](https://docs.btcpayserver.org/RaspberryPi/) — Low cost
2. **Add Zcash as a payment method** in BTCPay Server settings
3. **Connect your Zcash wallet** to BTCPay Server
4. **Create payment buttons** or embed the checkout on your site
5. **Configure webhooks** for automatic order fulfillment

BTCPay Server works with:
- **WooCommerce** (WordPress)
- **Shopify** (via manual integration)
- **PrestaShop**
- **Custom websites** (via API)
- **Lightning Network** and other cryptocurrencies alongside Zcash

#### Option B: Manual Integration

For simple websites or landing pages:

1. **Add a payment section** to your website:
   ```html
   <h3>Pay with Zcash</h3>
   <p>Send ZEC to the address below:</p>
   <div id="zcash-address">
     <img src="your-qr-code.png" alt="Zcash Payment QR Code">
     <code>zs1yourshieldedaddress...</code>
   </div>
   <p>Amount: <span id="amount">0.1 ZEC</span></p>
   <p>Transaction confirms in ~2.5 minutes</p>
   ```

2. **Monitor your wallet** for incoming payments
3. **Manually confirm** and fulfill orders

#### Option C: Payment Link Service

Some services generate payment links without requiring self-hosting:

- Share a payment link via email or messaging
- Customer clicks the link, sees the amount and address
- Customer pays from their wallet

### Physical Store (Point of Sale)

#### Using Ywallet Mobile

1. Open Ywallet on your phone
2. Enter the sale amount
3. Show the QR code to the customer
4. Customer scans and pays from their wallet
5. Confirm receipt on your device

#### Using BTCPay Server POS

1. Set up BTCPay Server with a tablet or dedicated device
2. Use the **Point of Sale app** built into BTCPay Server
3. Enter items or total amount
4. Customer sees the payment QR code on screen
5. Payment is confirmed automatically

### Subscription and Recurring Payments

For subscription-based businesses:

1. **Manual approach** — Generate a new invoice each billing period and send it to subscribers
2. **BTCPay Server** — Supports recurring payment plans and subscription management
3. **Customer responsibility** — Unlike credit card auto-charging, the customer must initiate each payment. Clear communication about payment deadlines is essential

---

## Step 4: Handling Refunds

Refunds with Zcash work differently than with traditional payment processors. There are no chargebacks, but you can voluntarily refund customers when appropriate.

### Refund Process

1. **Verify the original transaction** in your wallet history
2. **Get the customer's shielded address** for the refund
   - Important: Ask the customer to provide their **current** shielded address
   - Don't assume the sending address is their receiving address (in shielded transactions, these are separate)
3. **Send the refund amount** from your wallet to the customer's shielded address
4. **Notify the customer** that the refund has been sent
5. **Record the refund** in your accounting

### Refund Best Practices

- **Establish a clear refund policy** — Publish it on your website
- **Set time limits** — e.g., "Refunds available within 30 days of purchase"
- **Document everything** — Keep records of original transactions and refunds
- **Communicate clearly** — Let customers know refunds go to their Zcash wallet, not back to their original payment method

### Handling Disputes

Without chargebacks, disputes must be resolved directly:

- **Maintain good customer communication** — Most disputes are resolved through dialogue
- **Document all interactions** — Keep records of customer communications
- **Offer partial refunds** when appropriate
- **Use escrow for high-value transactions** — Consider a trusted third party to hold funds until both parties are satisfied

---

## Step 5: Accounting and Record-Keeping

### Essential Records to Maintain

For every transaction, record:

1. **Date and time** of the transaction
2. **Transaction ID** (txid) for blockchain reference
3. **Amount in ZEC** received
4. **Fiat equivalent** at time of transaction
5. **Customer identifier** (order number, invoice number)
6. **Product or service** sold
7. **Payment status** (confirmed, pending, refunded)

### Accounting Tools

#### Spreadsheets

A well-organized spreadsheet works for most small merchants:

| Date | TxID | ZEC Amount | USD Value | Customer | Product | Status |
|------|------|------------|-----------|----------|---------|--------|
| 2025-01-15 | abc123... | 0.5 | $158.50 | Order #1001 | Consulting | Confirmed |

#### Cryptocurrency Accounting Software

- **[Koinly](https://koinly.io/)** — Import wallet data and generate tax reports
- **[CoinTracker](https://www.cointracker.io/)** — Portfolio tracking and tax calculations
- **[Cryptio](https://cryptio.co/)** — Enterprise-grade crypto accounting

#### BTCPay Server Reporting

If using BTCPay Server:
- Built-in reporting dashboard
- Export data as CSV
- Integration with accounting software via plugins

### Tax Considerations

**⚠️ Consult a tax professional for advice specific to your jurisdiction.**

General considerations for merchants accepting Zcash:

- **Sales tax** — May apply depending on your jurisdiction and what you're selling
- **Income tax** — ZEC received is income at its fair market value when received
- **Capital gains/losses** — If ZEC changes in value between receipt and conversion to fiat
- **Record-keeping requirements** — Most jurisdictions require detailed transaction records
- **Reporting thresholds** — Some jurisdictions have specific thresholds for cryptocurrency reporting

### Privacy and Accounting

Your shielded transactions are private on the blockchain, but **you still need to maintain accurate records for your own accounting and tax purposes**:

- Export your wallet's transaction history regularly
- Keep your records secure and backed up
- Consider encrypting your accounting data
- Use privacy-respecting accounting tools when available

---

## Step 6: Customer Education

Many customers won't know how to use Zcash. Providing clear instructions can significantly increase adoption.

### What to Include on Your Payment Page

1. **What is Zcash?** — Brief explanation:
   > "Zcash is a privacy-focused digital currency. Transactions are fast, cheap, and private."

2. **How to Get ZEC:**
   - Link to [exchanges where ZEC can be purchased](https://coinmarketcap.com/currencies/zcash/#Markets)
   - Mention that many people already hold ZEC in their crypto portfolios

3. **How to Pay:**
   - "1. Get a Zcash wallet (try [Ywallet](https://ywallet.app/))"
   - "2. Send ZEC to the address shown below"
   - "3. Payment confirms in ~2.5 minutes"

4. **Why Use Zcash?**
   - Lower fees for both you and the customer
   - No need to share credit card information
   - Private transactions
   - Works globally without banking restrictions

---

## External Resources

- [BTCPay Server](https://btcpayserver.org/) — Self-hosted payment processor with Zcash support
- [Ywallet](https://ywallet.app/) — Mobile and desktop wallet
- [ZecWallet Lite](https://www.zecwallet.co/) — Desktop light wallet
- [Zcashd Full Node](https://github.com/zcash/zcash) — Run your own node
- [Zebrad](https://github.com/ZcashFoundation/zebra) — Rust-based Zcash node
- [CoinGecko ZEC](https://www.coingecko.com/en/coins/zcash) — Price tracking
- [Zcash Merchant Resources](https://z.cash/business/) — Official Zcash business guide

---

## What's Next?

Now that you can accept payments privately as a merchant, the next level of Zcash mastery involves **managing community funds** with privacy. The next guide covers setting up a private treasury for DAOs, community groups, and organizations.

→ **[Step 5: Run a Private Community Treasury](Run_a_Private_Community_Treasury.md)**
