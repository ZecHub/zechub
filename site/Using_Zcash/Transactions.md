<a href="https://github.com/zechub/zechub/edit/main/site/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Transactions

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## Shielded Transactions

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks.

Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a wallet highlighted on the official site: [https://z.cash/wallets](https://z.cash/wallets). The second important thing is moving ZEC to a shielded wallet.

When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use YWallet and autoshield your ZEC once received.

You do this by sending the ZEC to your (T) transparent address in YWallet, then shielding it [sending it into a private shielded pool].

Within Ywallet settings, you can expose the S (sapling), T (transparent), and O (orchard) components that make your Unified Address (that starts with U) - See Guide.

When running the transaction, you select the amount of ZEC you want to send, enter the shielded address, write a memo (encrypted message), and then send the transaction. All you have to ensure when running a shielded transaction is that person you're sending ZEC to gives you their shielded address.

Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Transparent Transactions

Transparent transactions work similarly but lack privacy protections, making transaction details publicly visible on the blockchain. Transparent transactions should be avoided when privacy is a priority. Note: Transparent wallets may encounter issues due to ZIP-317, which requires fees proportional to transaction complexity. Default fees may lead to rejection or delays, making fee customization crucial.

### Managing Fees for Transparent Transactions

ZIP-317 Guidance: The fee structure scales with transaction complexity, requiring adjustments beyond the standard 0.00001 ZEC fee.
Example Calculation: A simple one-note transaction might require a 0.0001 ZEC fee, increasing by roughly 0.00005 ZEC per additional note.

Editing Fees in Wallets

Trust Wallet: Access advanced settings by tapping the gear icon while creating a transaction. Adjust Miner Tip Gwei and Max Fee Gwei fields carefully to avoid transaction failure. Trust Wallet only charges network fees.
Coinomi Wallet: Offers three dynamic fee options Low, Normal, High based on network conditions. For manual adjustments, select Custom on supported coins or use Change Fee in the top-right corner. Users can set fees per byte or kilobyte, impacting confirmation times. Its recommended to use dynamic options if unsure.

This version incorporates fee management guidance, dynamic fee options, and customization settings across Trust Wallet and Coinomi, providing users with comprehensive fee control details.

#### Resources

[Sending a shielded ZEC transaction](https://www.youtube.com/watch?v=9WJSMxag2IQ)

#### Note

Please note that the safest way to use ZEC is using only shielded transactions. Some wallets are in the process of implementing [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) which allows users and exchanges to combine transparent and shielded addresses together. 

#### Zcash transactions are denominated in ZEC. 'ZATS' are the smallest monetary units of Zcash, they are the base unit of account in the Zcash protocol. 

# ZEC to ZAT Converter
