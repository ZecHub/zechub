# ZcashMe Auth - ZecHub Hackathon 3.0 (Zcash Login track)

**Sign in with Zcash.** A shielded payment proves your identity — no passwords, no browser extensions, no third-party tracking.

- **Track:** Zcash Login
- **Team:** zcashme
- **Code:** https://github.com/zcashme/zns-login
- **License:** MIT
- **Live Demo App:** http://localhost:3000/identityTest *(Update with your live demo link)*
- **Demo Video:** *(Add your loom/youtube link here)*

## 1. Inspiration (The Problem)

Bringing Web3 authentication to a desktop browser usually requires clunky browser extensions (like MetaMask) that completely dox your financial history to the website you are logging into. Zcash has incredible shielded privacy, but no easy way to bridge a mobile Zcash wallet session to a desktop web browser. If we want "Sign in with Zcash" to exist, we needed to solve the desktop-to-mobile airgap without compromising privacy or relying on centralized relays.

## 2. What it does

ZcashMe is a complete authentication ecosystem that turns the Zcash blockchain into a private, decentralized SMS-alternative for Two-Factor Authentication. 

* A user clicks "Sign in with Zcash", types their ZNS username, and scans a QR code with their mobile wallet.
* They send a 0.002 ZEC shielded payment. 
* Our headless Rust node intercepts the transaction in the mempool, derives a deterministic 6-digit One-Time-Passcode (OTP), and sends it back to the user's phone via an encrypted memo. 
* The user types the OTP into the website and is instantly logged in.

## 3. How we built it

The architecture is split into two halves:

1. **The Authenticator Node (Rust):** An on-chain oracle built on `librustzcash`. It watches the mempool, trial-decrypts incoming auth payments, and fires back deterministic OTPs. 
2. **The Identity Broker (auth.zcash.me):** A fully certified OpenID Connect (OIDC) provider. It abstracts all the blockchain complexity away from frontend developers, allowing them to drop "Sign in with Zcash" into a standard Next.js app using just standard OAuth libraries.

## 4. Accomplishments we're proud of

1. **The Ultimate Sybil Filter:** By tying identity to a financial micro-transaction (0.002 ZEC + network fee), we built a login system that naturally prices out botnets. 
2. **Zero-Knowledge Authentication:** Because it uses shielded transactions, the website only knows that you paid the entry fee. Your balance and financial history remain completely dark.
3. **ZNS Integration:** Zcash addresses are huge. We integrated the Zcash Name System so users can just type a human-readable username to start the flow.

## 5. What's next for ZcashMe

Now that we have a working OIDC Identity Broker, our next goal is getting ZcashMe natively supported as an official authentication provider in massive web frameworks, allowing thousands of existing Web2 applications to turn on Zcash login overnight.
