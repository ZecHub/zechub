# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Sign in with Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermediate - 7 min</span>

## TL;DR

- Log in by proving you control a Zcash address, instead of using a password
- Two designs are in use: **signing a challenge**, or **sending a shielded payment with a code in the memo**
- Because shielded addresses hide balance and history, proving control does not expose your finances
- The pattern is early. There is no ratified standard yet, and implementations do not interoperate

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Who is this for?

- Developers who want passwordless login without collecting personal data
- Users who would rather not hand an email address to every site
- Anyone who wants to log in without linking their financial history to an account

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> The Problem

Most login options leak something:

- **Passwords and email** create an account tied to your identity, and both end up in breach dumps
- **Social sign-in** tells the identity provider every place you log in and when
- **Wallet sign-in on transparent chains** is worse than it looks. Connecting a wallet can hand the site your entire balance and transaction history, permanently

You are usually choosing between convenience and disclosure.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Why Zcash?

Zcash separates *proving control* from *revealing finances*:

- **Shielded addresses** keep balances and transaction history private, so proving you hold one says nothing about what you hold
- **Encrypted memos** can carry a one time login code privately inside a transaction
- **Viewing keys** allow selective disclosure, so an app can be given read access to exactly what it needs and nothing more

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> How It Works

Two approaches have emerged. Both end with the app holding a stable identifier for you and no password.

### Approach 1: Sign a challenge

1. The app generates a random, single use challenge
2. Your wallet signs that challenge with the key behind your address
3. The app verifies the signature and logs you in

Nothing is broadcast, so there is no fee and no waiting for a block. The relevant specification is [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), which is still a draft, so wallet support for message signing varies.

### Approach 2: Prove it with a shielded payment

1. The app generates a one time code and shows a payment request
2. You send a small shielded transaction with that code in the memo
3. The app watches for the memo, matches the code, and logs you in

This works with wallets that already support memos today, which is most of them. The tradeoff is that it costs a network fee and you wait for confirmation.

### Keeping the address private

An app does not have to store your address to recognise you. Some implementations hash it together with an application specific value, so each site sees a different, stable identifier for the same user. That prevents sites from comparing notes to link your accounts.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Trade-offs

Worth understanding before you build on it or rely on it.

| | Signed challenge | Shielded payment |
|---|---|---|
| Cost | Free | Network fee per login |
| Speed | Instant | Waits for confirmation |
| Wallet support | Limited, ZIP 304 is a draft | Broad, only needs memos |
| Leaves a chain record | No | Yes, a transaction exists |

Shared limitations:

- **No account recovery by default.** Losing the key means losing the account, unless the app designs a recovery path
- **Address reuse can link you.** Using the same address across many sites recreates the tracking problem, which is why app specific identifiers matter
- **No ratified standard.** Each project has its own scheme, so a login built for one does not work with another
- **Not anonymity on its own.** It hides your finances from the app, but the app can still profile what you do once you are inside

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Common Mistakes to Avoid

- Reusing a challenge code. Every code should be single use and expire quickly, or a captured one can be replayed
- Asking users to send a meaningful amount to log in. The payment is a proof, so the amount should be trivial
- Storing the raw address when an application specific identifier would do the same job
- Assuming message signing works everywhere. Check the wallets your users actually have
- Treating a memo as secret after the fact. It proves the sender acted, it is not a password

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projects Exploring This

These were built for the **Zcash Login** track of [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). They are experiments rather than finished products, and they show how differently the same idea can be built.

- **ZecAuth** - a wallet connection protocol for Zcash, in the spirit of what WalletConnect does elsewhere. The app shows a QR code or `zecauth://` link carrying a challenge plus the capabilities it is asking for, such as sign in, payment requests, or viewing access. No transaction, no fee, no chain interaction. It ships a written protocol specification alongside the code
- **ZShield** - turns a shielded address into a W3C DID and an OpenID Connect identity. The browser generates a keypair, the server issues a nonce over a ZIP 304 style interface, the wallet signs it, and the server returns a JWT. Because the result is OIDC compatible, existing apps can consume it without bespoke integration
- **ZecPass** - proves ownership through a signed memo, and is built so the app never learns the user's address at all. It derives an application scoped hash to use as a stable identifier, keeps challenges single use and time bound, and ships a drop in React button with a Node verification library
- **Portal** - login by sending a shielded transaction with a one time code in the memo, running on mainnet. The same flow is reused to unlock paid content and to send or receive money from a link
- **ZcashMe** - uses a shielded payment as the proof of identity, and focuses on the desktop to mobile gap so that signing in on a laptop does not require a browser extension
- **ZBooks** - an accounting and payouts tool that treats sign in with Zcash as a reusable auth primitive rather than the product itself, and reads treasury data through a Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Related pages

- [Memos](/using-zcash/memos) - how encrypted memos work, and how a login code travels inside one
- [Viewing Keys](/zcash-tech/viewing-keys) - granting read only access without handing over spending power
- [Keeping Records With Shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) - the same selective disclosure idea, applied to accounting
- [Send Money Without Linking Identity](/zcash-use-cases/send-money-without-linking-identity) - why address reuse undermines privacy

<br/>
