<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transactions

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## TL;DR

- Zcash supports two kinds of transaction: **shielded**, which keeps the details private, and **transparent**, which records them publicly.
- Shielded addresses begin with `u` or `z`. Transparent addresses begin with `t` and behave much like a Bitcoin address.
- The choice is yours on every payment. Privacy is an option Zcash gives you, not a setting someone else decides for you.
- Withdrawing from an exchange is the most common place people lose privacy. If the exchange only supports transparent withdrawals, shield the funds yourself once they arrive.
- Fees follow [ZIP 317](https://zips.z.cash/zip-0317) and grow with the size of the transaction. Wallets still sending the old flat fee can see their transactions delayed.

## Shielded Transactions

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). The second important thing is moving ZEC to a shielded wallet. When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to shield the ZEC yourself once it arrives. Wallets listed with Automatic Shielding on the [wallets](https://zechub.wiki/wallets) page, such as Cake or Vizor, do this for you. Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Transparent Transactions

Transparent transactions work similarly but lack privacy protections, making transaction details publicly visible on the blockchain. Transparent transactions should be avoided when privacy is a priority. Note: Transparent wallets may encounter issues due to ZIP-317, which requires fees proportional to transaction complexity. Default fees may lead to rejection or delays, making fee customization crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## A Simple Way to Picture It

A transparent transaction is a postcard. The postman delivers it, but anyone who handles it along the way can read the message, see who sent it and see who receives it.

A shielded transaction is a sealed envelope. The postal service still confirms that a real letter with real postage passed through the system, and nobody can forge one or send the same letter twice. What the envelope contains stays between sender and recipient.

The important part is that Zcash lets you decide which one to send, payment by payment.

## Managing Fees for Transparent Transactions

ZIP-317 Guidance: The fee structure scales with transaction complexity, requiring adjustments beyond the standard 0.00001 ZEC fee.
Example Calculation: A simple one-note transaction might require a 0.0001 ZEC fee, increasing by roughly 0.00005 ZEC per additional note.

Editing Fees in Wallets

Trust Wallet: Access advanced settings by tapping the gear icon while creating a transaction. Adjust Miner Tip Gwei and Max Fee Gwei fields carefully to avoid transaction failure. Trust Wallet only charges network fees.
Coinomi Wallet: Offers three dynamic fee options Low, Normal, High based on network conditions. For manual adjustments, select Custom on supported coins or use Change Fee in the top-right corner. Users can set fees per byte or kilobyte, impacting confirmation times. Its recommended to use dynamic options if unsure.

## Common Mistakes

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Wallets](https://zechub.wiki/using-zcash/wallets) page lists this for each option.
- **Withdrawing to a transparent address and leaving the funds there.** The withdrawal itself is public, and every later movement from that address stays public too. Shield the funds once they arrive.
- **Treating privacy as something you turn on once.** Each transaction is a separate choice. Sending shielded today does not undo a transparent payment you made last week.
- **Reusing a transparent address for everything.** Because transparent activity is permanently visible, a single reused address gradually links payments that had no reason to be connected.
- **Sending with an outdated default fee.** Wallets that have not adopted ZIP 317 may still send the older flat fee, which can leave a transaction sitting unconfirmed.

## Note

Please note that the safest way to use ZEC is using only shielded transactions. Some wallets are in the process of implementing [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) which allows users and exchanges to combine transparent and shielded addresses together.

## Resources

[ZIPS](https://zips.z.cash/)

## Related Pages

- [Wallets](/using-zcash/wallets) — which wallets support shielded sending, and which are transparent only
- [Shielded Pools](/using-zcash/shielded-pools) — Sapling and Orchard, the pools your shielded funds live in
- [Memos](/using-zcash/memos) — encrypted messages that can travel with a shielded transaction
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses) — TEX addresses and why exchanges use them
- [Custodial Exchanges](/using-zcash/custodial-exchanges) — which exchanges support shielded withdrawals

## ZEC to ZAT Converter
