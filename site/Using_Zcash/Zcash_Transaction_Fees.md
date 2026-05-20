<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Transaction_Fees.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash transaction fees

Zcash fees are small compared with many payment networks, but they still matter. Fees help transactions get mined and prevent the network from being filled with low-value spam.

Most users should let their wallet choose the fee. This page explains what the wallet is doing and why some transactions cost more than others.

## TL;DR

1. Let your wallet choose the fee unless you know what you are doing.
2. Zcash uses ZIP 317 as the conventional fee rule for modern wallets.
3. More complex transactions may require a higher fee.
4. Tiny notes can become uneconomic if they cost more to spend than they are worth.
5. If a transaction fails, check wallet support, confirmations, and fee settings before retrying.

## What pays the fee

The sender pays the network fee.

When a wallet creates a transaction, it chooses inputs, outputs, change, and a fee. The fee is the difference between the value spent and the value sent back to recipients or change.

For shielded transactions, your wallet does this without revealing the sender, receiver, and amount to the public chain.

## Why fees vary

Fees depend on transaction structure, not just the amount sent.

A transaction may become more complex when it:

1. Spends many notes or UTXOs.
2. Sends to multiple recipients.
3. Crosses between transparent and shielded pools.
4. Includes both transparent and shielded components.
5. Needs extra actions to preserve privacy.

Sending 1 ZEC can be cheaper or more expensive than sending 0.01 ZEC depending on how many pieces the wallet has to spend.

## ZIP 317

ZIP 317 defines a proportional transfer fee mechanism for Zcash. The goal is to make fees depend on transaction resources while keeping ordinary use simple.

Modern wallets and `zcashd` can calculate a ZIP 317 fee automatically. In the `z_sendmany` RPC, the default behavior is to use a fee calculated according to ZIP 317.

This is why manual fee settings can be risky. A fee that worked for a simple transaction may fail for a more complex one.

## Tiny notes and dust

If you receive many tiny payments, your wallet may hold many small notes.

Each note can add cost when it is later spent. If a note is smaller than the marginal fee needed to spend it, a wallet may treat it as uneconomic. Some wallets may hide it from spendable balance or wait to combine it with other actions.

For users, the lesson is simple: avoid creating lots of tiny payments unless your wallet is designed for that workflow.

## What to do if a transaction fails

1. Wait for your wallet to finish syncing.
2. Check that the funds have enough confirmations.
3. Let the wallet use its default fee.
4. Try a smaller or simpler transaction.
5. Avoid spending from transparent addresses unless you understand the privacy effect.
6. Update the wallet if you are using old software.
7. Contact the wallet team if the same transaction keeps failing.

Do not keep rebroadcasting the same payment with random settings. You may leak more information or create confusing wallet state.

## Best practices

1. Use modern wallets that support ZIP 317 fee calculation.
2. Prefer shielded-to-shielded transactions when privacy matters.
3. Avoid sending many tiny outputs.
4. Shield transparent funds before long-term storage.
5. Keep a little extra ZEC available for fees.
6. Test new services with a small payment first.

## Related pages

- [Transactions](/using-zcash/transactions)
- [Shielded pools](/using-zcash/shielded-pools)
- [Wallets](/using-zcash/wallets)
- [Buying ZEC](/using-zcash/buying-zec)
- [Transparent exchange addresses](/using-zcash/transparent-exchange-addresses)

## Resources

- [ZIP 317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [Zcash RPC: z_sendmany](https://zcash.github.io/rpc/z_sendmany.html)
