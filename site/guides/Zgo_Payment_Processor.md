<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo Payment Processor: Accepting Zcash Without Custody

ZGo is a non-custodial payment processor for Zcash. A customer pays in ZEC from their own wallet, ZGo monitors the Zcash blockchain for the transaction, and the funds arrive directly in the merchant's wallet through a shielded transfer. ZGo never holds the money in between.

This guide explains how the payment flow works, how to set up an account, and how to integrate ZGo with Xero and WooCommerce. It also covers the two mistakes that cause most first-time setup problems.

## On this page

1. [Why use ZGo](#why-use-zgo)
2. [How ZGo works](#how-zgo-works)
3. [Setting up an account](#setting-up-an-account)
4. [ZGo with Xero](#zgo-with-xero)
5. [ZGo with WooCommerce](#zgo-with-woocommerce)
6. [Features](#features)
7. [Common mistakes](#common-mistakes)
8. [Conclusion](#conclusion)
9. [Resources](#resources)

## Why use ZGo

Most cryptocurrency payment processors are custodial. Funds first land in the processor's account and are forwarded to the merchant later, which means a third party temporarily controls the money and can freeze, delay, or report on it.

ZGo takes the opposite approach. Payments move from the customer's wallet directly to the merchant's wallet through a Zcash shielded transaction. The processor only generates the invoice and watches the blockchain for confirmation. There is no intermediary balance, no withdrawal flow, and no third party that can hold up settlement.

For a merchant, this means three practical things: full custody of incoming ZEC, shielded transaction privacy by default, and no dependency on a centralized provider staying online or solvent.

## How ZGo works

The payment flow is the same regardless of whether ZGo is used standalone, through Xero, or through WooCommerce:

1. The merchant generates a payment request in ZGo, which renders as a QR code with the amount, the invoice ID, and a Zcash receiving address.
2. The customer scans the QR with a Zcash wallet (Orchard, Sapling, and Transparent address types are all supported on the WordPress plugin) and approves the payment.
3. The transaction is broadcast to the Zcash network as a shielded transfer from the customer's wallet to the merchant's wallet.
4. ZGo monitors the Zcash blockchain for the transaction.
5. After five confirmations, ZGo marks the payment as final and notifies any connected integration (Xero, WooCommerce, or a webhook).

The five-confirmation threshold is the key number. Anything earlier is a payment in progress, not a payment received. Order fulfilment, inventory updates, and any irreversible action on the merchant side should wait for step 5.

ZGo runs in any modern browser on desktop or mobile, with no install on either side. The customer needs a Zcash wallet; the merchant needs a Zcash wallet and a ZGo account.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Setting up an account

To create a ZGo account, a Zcash wallet with a small amount of ZEC is required. The small ZEC balance covers the on-chain fee for the account-initialization transaction. Any major Zcash wallet works for this; see [ZecHub Wallets](https://zechub.wiki/wallets) for current options.

The basic setup:

1. Open [zgo.cash](https://zgo.cash/) in a browser.
2. Create an account using a Zcash wallet under the merchant's control. This wallet must hold the keys. An exchange deposit address will not work (see [Common mistakes](#common-mistakes)).
3. Verify the wallet by sending the small initialization transaction.
4. Configure the receiving address. All payments processed through this account will land in this wallet.

Once the account is active, the same merchant can use ZGo for one-off payments (a single QR code at a pop-up event) or wire it into a permanent setup through Xero or WooCommerce.

## ZGo with Xero

[Xero](https://www.xero.com/) is a cloud accounting platform used by many small and mid-size businesses. The ZGo–Xero integration lets a merchant issue an invoice in Xero, have the customer pay it in ZEC, and have Xero automatically mark the invoice as paid once the transaction confirms.

How it works:

1. The merchant creates an invoice in Xero as usual.
2. ZGo attaches a Zcash payment option to the invoice.
3. The customer pays in ZEC through their wallet.
4. ZGo monitors the [Zcash blockchain](https://z.cash/) for the transaction.
5. After five confirmations, ZGo reports the payment back to Xero, which marks the invoice as settled.

The ZEC lands in the merchant's wallet, not in any ZGo-controlled or Xero-controlled account. The accounting record in Xero stays in sync with the on-chain settlement automatically.

For first-time setup, follow the dedicated walkthrough: [Xero Integration Configuration](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo with WooCommerce

For online shops running on [WooCommerce](https://woocommerce.com/) and [WordPress](https://wordpress.org/), ZGo provides a dedicated plugin. The plugin adds Zcash as a payment method at checkout and handles the order state automatically when the payment confirms.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

End-to-end flow inside a WooCommerce store:

1. The customer reaches checkout and selects Zcash as the payment method.
2. The plugin generates a payment request and shows the QR code on the checkout page.
3. The customer pays from their wallet.
4. The transaction broadcasts to the Zcash network and ZGo begins monitoring it.
5. After five confirmations, ZGo reports the payment as final to the plugin.
6. The plugin marks the WooCommerce order as paid and updates the order database.

The order is only paid when step 6 completes. Earlier states (broadcast, first confirmations) can be shown to the customer as "payment received, awaiting confirmation," but inventory, fulfilment, and any downstream automation should wait for the final state.

The plugin also installs an administrative dashboard inside WordPress, where the merchant can monitor orders and incoming ZEC payments alongside the normal WooCommerce order view. The plugin supports all current Zcash address types: Orchard, Sapling, and Transparent. Customers paying from any compliant wallet can complete the transaction.

## Features

**Non-custodial.** Payments move directly from the customer's wallet to the merchant's wallet through shielded transactions. ZGo never holds the funds in between, and the merchant retains full control throughout.

**Flexible deployment.** ZGo can be used for a single afternoon at a pop-up market, for a permanent point-of-sale setup, or as the backend for an online store through the Xero or WooCommerce integrations.

**Browser-based.** No install on either the customer or the merchant side. ZGo runs in any modern browser on desktop or mobile.

**Wallet compatibility.** Major Zcash wallets, including those supporting Orchard, Sapling, and Transparent address types, can pay a ZGo invoice without extra configuration on the customer's side.

**Integrations.** Direct integrations with Xero (accounting) and WooCommerce (e-commerce) cover the two most common merchant workflows out of the box.

## Common mistakes

**Treating the order as paid before five confirmations.** A broadcast transaction is not the same as a confirmed payment. The transaction can still fail to confirm or be replaced. Only after five confirmations does ZGo report the payment as final, and only then should the order be marked paid downstream. If a merchant configures inventory or fulfilment to trigger on the broadcast event, fraudulent or failed payments will cause real losses.

**Pointing ZGo at an exchange deposit address.** It looks like a Zcash address, but exchange deposit addresses are controlled by the exchange, not the merchant. The exchange holds the keys, which means the exchange holds the funds, which defeats the reason for using a non-custodial processor. The wallet address configured in ZGo must be a wallet whose seed phrase the merchant controls directly.

**Treating ZGo as a wallet.** ZGo is a payment processor, not a wallet. It does not store keys, hold balances, or let the merchant spend funds. A separate Zcash wallet under the merchant's control is required to receive the money that ZGo routes.

## Conclusion

ZGo gives merchants a way to accept Zcash payments without giving up custody, without depending on an intermediary, and without exposing transaction details on a public chain. The two integrations (Xero and WooCommerce) cover the most common merchant workflows; for everything else, ZGo can be used standalone from any browser.

For setup, the path is short: get a Zcash wallet, create an account at [zgo.cash](https://zgo.cash/), and either start generating payment requests directly or install the relevant integration.

## Resources

- [ZGo official website](https://zgo.cash/)
- [Xero Integration Configuration walkthrough](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) and [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash project homepage](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), the list of compatible Zcash wallets
- [ZecHub Payment Processors overview](https://zechub.wiki/payment-processors), ZGo in context of other Zcash payment options
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), the related ZecHub guide for a self-hosted alternative
