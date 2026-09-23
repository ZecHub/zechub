<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Avoiding_Scams.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Avoid common Zcash scams

## TL;DR

- **Never share your seed phrase or spending key.** No wallet team, exchange, moderator or "recovery expert" needs it.
- **Download wallets only from links you trust.** Start from the [ZecHub wallet list](/using-zcash/wallets) and the wallet's own site.
- **Check the whole address before you send.** Don't just check the first and last few characters.
- **Nobody doubles your ZEC.** Giveaways that ask you to send first are scams.
- **Recovery and migration don't need a stranger.** Use the tools on [Recovering Funds](/using-zcash/recovering-funds).

---

## Why this matters

Crypto scams cost real people a lot of money. The FBI's [2025 Internet Crime Report](https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions) counted 181,565 complaints involving cryptocurrency, with more than $11 billion in reported losses. Investment fraud caused nearly half of all scam losses.

Zcash protects your privacy on-chain. It can't protect you from giving your keys away or sending ZEC to the wrong person. Shielded payments can't be reversed, so the best defense is to spot a scam before you send.

## Seed phrase phishing and fake support

This is the most direct way to lose everything. Whoever holds your seed phrase or spending key can spend your ZEC.

How it looks:

- Someone in a Discord, Telegram or X reply offers "support" and sends you a DM
- A website or form asks you to "validate", "sync" or "unlock" your wallet by typing in your seed
- A fake wallet update or browser extension asks you to re-enter your seed

What to do:

- Keep your seed offline and private. See [Recovering Funds](/using-zcash/recovering-funds) for what each kind of recovery material can do.
- Treat any DM that starts with "I can help you" as a scam until proven otherwise. Real moderators don't DM first.
- Only type your seed into a wallet you installed yourself, when you are restoring that wallet.

## Fake wallet apps

Scammers publish copycat apps and sites with names and logos close to real wallets. They look like the real thing but send your seed or your ZEC to the scammer.

What to do:

- Start from the [ZecHub wallet list](/using-zcash/wallets). Follow links to the wallet's official site or official app store listing.
- Check the developer name in the app store, not just the icon and title.
- Be careful with search ads. The top result for a wallet name is not always the real wallet.
- For command-line wallets and node software, verify what you download. See [Verifying Zcash Releases](/guides/verifying-zcash-releases).

## Address poisoning

Address poisoning targets people who copy addresses from their transaction history. The attacker makes an address that starts and ends like one you use, then sends you a tiny transaction from it. Later, you copy the lookalike by mistake and send your ZEC to the attacker. [MetaMask's guide](https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/) explains the pattern well.

For this to work, the attacker needs to see who you pay. On Zcash, transparent (`t`) activity is public, while a shielded to shielded payment hides the sender, the recipient and the amount. See [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment).

What to do:

- Use shielded addresses where you can
- Save addresses you use often in your wallet's address book instead of copying them from history
- Check the full address, including the middle, before you send
- For a large payment, send a small test amount first and confirm it arrived

## Investment and "guaranteed return" scams

These usually start as a friendly chat, a dating match or a trading group. After a while you're shown a platform with big, steady profits. Deposits are easy. Withdrawals always need one more "tax", "fee" or "unlock" payment.

What to do:

- Treat promised or guaranteed returns as a red flag
- Don't send ZEC to a platform because someone you met online recommends it
- If a platform asks for a fee before you can withdraw, stop paying. The money usually isn't there.

## Giveaways and impersonation

Fake accounts copy the name and photo of a well-known person or project and promise to send back more ZEC than you send. Some run fake livestreams or reply under real posts.

What to do:

- Never send ZEC to "verify" your address or to join a giveaway
- Check the account handle, not just the display name and picture
- Check announcements on the project's own site or its verified accounts

## Fake recovery and migration services

Some Zcash users have old funds or need to move them between shielded pools. Scammers know this and pretend to be recovery experts, especially when a deadline is coming up. [Recovering Funds](/using-zcash/recovering-funds) covers the current routes and deadlines.

What to do:

- Follow the steps on [Recovering Funds](/using-zcash/recovering-funds) with a wallet you installed yourself
- Don't send a working seed to anyone who offers to recover or migrate it for you
- Ask in public ZecHub or Zcash community channels, not in DMs

## If you think you were scammed

1. **Stop sending money.** Don't pay "unlock" fees or "recovery" services that promise to get it back.
2. **Secure what's left.** If your seed may be exposed, create a new wallet on a clean device and move any remaining funds there.
3. **Save the evidence.** Keep screenshots, usernames, website links, addresses and transaction IDs.
4. **Report it.** In the US, use the FBI's [IC3](https://www.ic3.gov). In India, use the [National Cybercrime Reporting Portal](https://cybercrime.gov.in) or call the [1930 helpline](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1814120). Elsewhere, contact your local police or cybercrime unit.
5. **Warn others.** Tell the community where the scam appeared so moderators can remove it.

## Resources

- [ZecHub wallet list](/using-zcash/wallets)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment)
- [Verifying Zcash Releases](/guides/verifying-zcash-releases)
- [FBI: Cryptocurrency and AI scams bilk Americans of billions](https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions)
- [MetaMask: Address poisoning scams](https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/)
