<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Payment Processors

Ways to accept ZEC as a merchant, compared side by side. Every entry was checked against the provider's own site and API on **29 July 2026**.

Support for privacy assets changes often, so each row carries its own verified date. If you are reading this months later, check the provider's site before you integrate.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non-custodial | Yes, Orchard via Unified Addresses | Yes, open source | 1% per payment, free if self-hosted | No KYC, regions not stated | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non-custodial, view key only | Yes, shielded only (Sapling, Orchard, UA) | Yes, open source | None, you pay network fees only | Global, no KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Non-custodial | Yes, Sapling and Orchard | No, hosted service | Prepaid session, price not published | No KYC stated, regions not stated | 2026-07-29 |
| [Flexa](https://flexa.co/) | Customer self-custody, merchant settles in fiat | Customer spends shielded, receiving side not documented | No | 1% per payment | US and 37 SEPA countries, ZEC in EU unconfirmed | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Non-custodial by default | No, transparent address only | No | 0.5%, or 1% with conversion | Global except where prohibited, no KYC to start | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Custodial, despite marketing | Not documented | No | 0.5% API, 1.5% white label | No KYC to receive | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodial, off-chain | No, shielded deposits rejected | No | Free wallet to wallet, 0.8% payouts | Geo-restricted, ZEC delisted in FR, ES, IT, PL | 2026-07-29 |

</div>

### What the columns mean

**Custody** is whether the processor holds your ZEC. Non-custodial means it goes to a wallet you control.

**Shielded ZEC** is whether you can be paid into the shielded pool. Transparent only means the amount and addresses are public on the blockchain.

**Self-host** is whether you can run the software yourself, with no company in the middle.

**Merchant fee** excludes Zcash network fees, which someone pays in every case.

Where a provider does not publish something, the entry says "not stated" or "not documented" rather than guessing. That is not the same as "no".

### Which one to pick

For the most privacy and control, use **BTCPay Server** or a self-hosted **CipherPay**. Both are shielded, open source, and hold no funds for you.

For taking payments in a shop rather than online, use **Flexa**.

For a hosted gateway where transparent payments are acceptable, use **NOWPayments** or **Plisio**.

One caveat worth repeating: a transparent-only processor publishes every payment amount and address on the blockchain. And with any hosted non-custodial processor you hand over your viewing key, so the company can see your payments even though it cannot spend them. Self-hosting is the only way to avoid that.

<div class="processor-note">

**ZGo service warning, 29 July 2026.** The ZGo backend at api.zgo.cash returned HTTP 503 on every endpoint while this page was being checked. The project is not abandoned and its maintainer was active in the community this month, but confirm the service is running before you rely on it.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Support Type**: Shielded (Orchard, via Unified Addresses)
- **Description**: Accept Zcash in minutes, Non-custodial, Zero buyer data, No middleman.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

You give CipherPay a view-only key, so payments go straight to your own wallet and it never holds funds. It uses a fresh address for every invoice.

Orchard only. There is no Sapling or transparent support, even though the repository README mentions Sapling.

It costs 1% per payment, and nothing at all if you run it yourself. The whole thing is open source, as a Rust binary with SQLite or as a Docker image. There is no KYC, and buyers do not need an account.

Integrations cover Shopify, WooCommerce, a REST API, hosted checkout, payment links, and in-person QR.

Two things to weigh. It launched in February 2026 and has no published security audit. And on the hosted tier the operator holds your viewing key, so it can see your payments. Self-hosting removes that. Shielded payments are also final, so a refund needs the buyer to give you an address.

**Last verified:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: Shielded only (Sapling, Orchard, Unified Address)
- **Description**: BTCPay Server is an open-source, self-hosted cryptocurrency payment processor.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

The strongest option on custody. Its wallet backend is view-only and holds no seed or secret key, so even a compromised server cannot spend your money.

Shielded only, covering Sapling, Orchard and Unified Addresses. There is no transparent fallback, so do not plan around one.

To install it you need the btcpay-zcash Docker fork on the feat/zec branch, plus a viewing key exported from a wallet such as Zkool or Zingo. By default it talks to a remote lightwalletd, or you can run Zebra and lightwalletd yourself.

One limitation to know about: the plugin uses a single Zcash wallet for every store on an instance, so do not run it on a shared server. Per-store wallets are being worked on.

There is no fee to the software itself. You pay Zcash network fees and whatever your hosting costs.

**Last verified:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling and Orchard)
- **Description**: ZGo is an electronic payment platform that goes directly from your customer to you, with no third parties involved.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

A till you run in a browser, so a laptop, tablet or phone becomes the checkout. There is also a WooCommerce plugin and a REST API. It was built by Vergara Technologies and funded by Zcash Community Grants, including the move from zcashd to Zebra.

Funds go from the customer straight to your wallet, with nobody in between.

Shielded, covering Sapling and Orchard through Unified Addresses, and it follows ZIP 321. No current source says it handles transparent addresses, so this page no longer claims that it does.

You cannot really self-host it. ZGo runs the Zcash infrastructure for you and publishes no deployment guide. The source is public on the maintainer's own Git server, though the GitLab copy people usually find is a stale 2022 mirror.

It is not free either. ZGo sells prepaid sessions and needs a Pro session for WooCommerce, but the pricing page is currently unreachable, so no figure is quoted here.

**Last verified:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Support Type**: Customer spends shielded, receiving side not documented
- **Description**: Flexa is a payments network that lets customers spend digital assets, including Zcash, at retail locations from a self-custody wallet.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa is not a checkout gateway, so it is not a swap for the others here. The customer opens a Flexa-enabled wallet such as Zodl, shows a one-time code, and the shop scans it. There is no ZEC invoice and no e-commerce plugin.

The customer keeps their own coins until the moment they pay. You as the merchant never receive ZEC. Flexa settles with you in the currency you choose, so the crypto side is handled by them.

Flexa's own announcement describes the Zcash integration as paying with shielded ZEC. What address type Flexa receives to is not published anywhere.

The fee is 1% per payment, with conversion and custody included at no extra cost.

It works in the United States and, since July 2026, in 37 SEPA countries and territories. Whether ZEC in particular can be spent in Europe is not stated.

**Last verified:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent only
- **Description**: NOWPayments is a crypto payment gateway that enables merchants to accept Zcash payments and donations easily.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

No shielded support. Their documentation tells you to set a transparent address for Zcash, and ZEC is the only coin they single out that way. Every payment you receive is public on the blockchain.

Non-custodial by default. Their FAQ says they do not store funds and never hold private keys. There is an optional custody balance, so check your account settings if you need to be sure.

Fees are 0.5% for a straight payment, or 1% for multi-currency, fixed-rate, or "fee paid by user" payments, with network fees on top.

Available globally except where the law prohibits it. You do not need KYC to start accepting crypto, only to withdraw fiat.

**Last verified:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent (not documented)
- **Description**: Plisio is a cryptocurrency payment gateway that allows businesses to accept Zcash payments.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Treat it as custodial. Plisio's marketing calls it non-custodial, but its own help pages describe balances held on the platform, cold storage and a withdrawal process. The non-custodial claim could not be confirmed.

Plisio never says which Zcash address types it uses, so assume transparent until someone confirms otherwise.

The wallet is free, the gateway and API cost 0.5%, and White Label is 1.5%. White Label is a rebrand of their hosted service, not self-hosting.

You do not need KYC to receive payments, and no list of restricted countries is published.

**Last verified:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Support Type**: Transparent only, shielded deposits rejected
- **Description**: Binance Pay is a cryptocurrency payment platform that supports Zcash payments.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance turns away ZEC sent from shielded addresses. That rejection is the reason TEX addresses were created.

It is fully custodial. Payments move off-chain between Binance Pay wallets, and you need a verified Binance account.

Wallet-to-wallet transfers are free, merchant payouts cost 0.8% capped at 5 USD, and Mini Program merchants pay 1%.

Check availability where you are before depending on it. Binance Pay is not offered in some countries and industries, ZEC has been delisted for users in France, Spain, Italy and Poland since 2023, and service in the EEA has been disrupted under MiCA.

**Last verified:** 2026-07-29

---

### No longer accepting ZEC

Both of these were listed here before. Each provider's own live currency list was checked on 29 July 2026 and Zcash is gone from both.

**CoinPayments** does not list ZEC in its v2 coin list, its legacy list, or its live currencies API, and its Zcash article now redirects to the homepage.

**CoinGate** does not list ZEC on its supported currencies page or in its public API. No delisting was announced, so the reason and date are unknown.

If either brings Zcash back, add it again with a fresh verified date.

### Keeping this page accurate

Privacy coin support moves around, so this page is only as good as its last check. When you review it:

1. Check the provider's own currency list or API. Third-party lists were out of date for both of the processors removed above.
2. Check which Zcash address types are supported. "Supports Zcash" usually means transparent addresses only.
3. Update the verified date in the table and in that provider's section.
