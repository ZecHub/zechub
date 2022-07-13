# Using ZEC, privately

#### Shielded (Private) vs. Transparent

As it currently stands, there are two addresses and transaction types in Zcash, shielded and transparent. The difference between shielded and transparent ZEC is very simple. Shielded ZEC keeps your money and your transactions private, as where transparent ZEC operates like Bitcoin, completely transparent. This means that someone can view your balance and all of your transactions if they know your address.

When people first start using ZEC, they might not realize which type of address they are using. This is because not all exchanges support shielded ZEC and/or shielded ZEC withdrawals. 

So, for example, if someone uses Coinbase and they buy ZEC, they would buy transparent ZEC and only be able to withdraw that ZEC to a transparent address in a wallet. Wallet's, like [Nighthawk](https://www.youtube.com/watch?v=W2msuzrxr3s), can shield funds sent to a transparent address to solve this, but not everyone is aware of that. A lot of people, simply put, use ZEC in the way their exchange or primary wallet allows them to.

#### Making sure your ZEC is shielded

First, we recommend that everyone self-custodies their ZEC. Meaning, move your ZEC from an exchange to a wallet. The best way to know if you're using shielded, a.k.a private, ZEC is by looking at the address the balance sits in. If the address starts with a "z", then your balance is shielded. If the address starts with a "t", then the balance is transparent.

There are generally two paths to get to shielded ZEC.

From an exchange that supports **shielded** withdrawals:

  1. Buy ZEC in an exchange
  2. Start the withdrawal process in the exchange
  3. Open your shielded ZEC wallet and make sure the receiving address starts with a "z"
  4. Run the withdrawal from your exchange

From an exchange that supports **transparent** withdrawals:

  1. Buy ZEC in an exchange
  2. Start the withdrawal process in the exchange
  3. Open your autoshielding ZEC wallet and use the transparent receiving address
  4. Run the withdrawal from your exchange
  5. Wait ten confirmations, and then shield the ZEC from your transparent address to shielded address

Here's a tutorial for [how to withdraw ZEC from an exchange](https://www.youtube.com/watch?v=REUbkLzK7J4). Note that this is a shielded withdrawal.

Here's a tutorial for [how to shield your ZEC from a transparent](https://www.youtube.com/watch?v=W2msuzrxr3s) address to a shielded address.

#### Transactions

After ensuring that your ZEC is in a shielded wallet and address, you can now decide if you'd like to transact with that ZEC. Transacting with ZEC is super easy. You can send ZEC to either shielded or transparent addresses depending on the person's preference.

Here's an [example of a z-address to t-address transaction](https://twitter.com/iansagstette/status/1524840186131144704), and here's an [example of a z-address to z-address transaction](https://twitter.com/iansagstette/status/1542142468505870336).

Now let's get a tad bit more complicated. All of this is assuming that you're using ZEC because you want to use the most private digital money possible. As with any monetary transaction, there are small chances that people can leak data. ZEC is the best at fighting against data leakeage. But, that doesn't mean you should use it care free. Here are some things you'll want to avoid when transacting with ZEC.

-Disclosing your z-address
-Using a z-address as a pass through for t-addresses (a.k.a "mixing")
-Running, and disclosing your running of, a high number of z-t transactions
-Regularly letting people know where you spend shielded ZEC

Essentially, the best thing to do with your ZEC is hold it in a shielded wallet, transact between shielded addresses, and be careful about how you use ZEC in public (ie. a coffee shop). Ensuring privacy comes with a level of responsibility. 

#### Resources

[Payment Contexts & Reusing Shielded Addresses](https://electriccoin.co/blog/shielded-address-contexts/)
