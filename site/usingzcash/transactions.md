# Transactions

ZEC is primarily used for payments. Think paying back a friend, buying a coffee, or donating to a cause you care about. This is ZEC's strongest use case due to its strong privacy features. There are a number of different ways to run a transaction with Zcash, and to preserve user privacy, it is important to understand which transaction you're running.

#### Shielded Transactions

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a "U" or "Z". When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks.

Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a wallet highlighted on the official site: https://z.cash/wallets. The second important thing is moving ZEC to a shielded wallet.

When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use **[YWallet](https://ywallet.app)** and autoshield your ZEC once received. 

You do this by sending the ZEC to your (T)transparent address in YWallet, then shielding it [sending it into a private shielded pool]. 

Within Ywallet settings, you can expose the S (sapling), T (transparent), and O (orchard) components that make your Unified Address (that starts with U) - See [Guide](https://zechub.notion.site/Visualizing-Zcash-Addresses-27c0bcc423fa48f68374a0d6c317213b).

When running the transaction, you select the amount of ZEC you want to send, enter the shielded address, write a [memo](https://zechub.notion.site/Memos-6e7a6d0e02ed48acbbc715a7f35a4719) (encrypted message), and then send the transaction. All you have to ensure when running a shielded transaction is that person you're sending ZEC to gives you their **shielded address**.

*Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data*

#### Transparent Transactions

Any transaction type, outside of a shielded transaction, should be considered a transparent transaction. The process of running a transparent transaction works similar to shielded transactions, except you can't send a memo. You can send ZEC from your shielded address to a transparent address, but doing this is not advised because it risks data leakage.

Transparent transactions happen on a transparent blockchain, like Bitcoin. This means that anyone with your wallet address can see all of your activity on the blockchain. When using ZEC in transparent transactions, you lose the privacy that shielded transactions provide.

Transparent transactions have caused confusion around ZEC privacy in the past. The best way to have the best privacy when using ZEC is by holding ZEC in a shielded wallet, and only transacting with shielded transactions!

#### Resources

[Sending a shielded ZEC transaction](https://www.youtube.com/watch?v=9WJSMxag2IQ)

#### Note

Please note that the safest way to use ZEC is using only shielded transactions. Some wallets are in the process of implementing [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) which allows users and exchanges to combine transparent and shielded addresses together. 
