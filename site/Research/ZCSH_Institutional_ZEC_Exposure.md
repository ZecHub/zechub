# ZCSH and institutional ZEC exposure: what the Zcash ETF actually is, and what it is not

In August 2026, Zcash got its first US exchange-traded product. The Zcash ETF, trading under the ticker ZCSH on NYSE Arca, is sponsored by Grayscale and holds actual ZEC. Within two weeks of its exchange debut it reported more than $500 million in assets, a September 8 disclosure described roughly $100 million of shares changing hands for ZEC, and options on the shares began trading the same day.

These events generated a wave of claims about "institutional ZEC exposure." Some of those claims are supported by the fund's own documentation. Others are not. This article walks through how ZCSH actually works, using the fund's SEC filings and the issuer's own disclosures as the authority, and separates what is documented from what is assumed.

## What ZCSH is

The Zcash ETF is a Delaware statutory trust that issues shares representing fractional undivided beneficial interest in a pool of ZEC. It is sponsored by Grayscale Investments Sponsors, LLC, an indirect subsidiary of Digital Currency Group (DCG). The shares trade on NYSE Arca under the ticker ZCSH.

Two points about its legal form matter for everything that follows. First, despite the name, it is **not** an ETF in the legal sense: the prospectus states that the Trust "is not a registered investment company under the Investment Company Act of 1940," so it is not subject to that Act's regulations. It is a commodity-based grantor trust, the same structure used by the spot bitcoin ETPs. For US federal income tax purposes the sponsor treats it as a grantor trust, meaning the trust itself pays no income tax and tax items flow through to shareholders. Second, the product is not new in substance. The trust was formed in October 2017 as a private placement, quoted for years on OTCQX under the same ZCSH ticker, and converted into an exchange-traded product in August 2026: the legal rename to "The Zcash ETF" took effect August 24, 2026, and NYSE Arca trading began August 25, 2026. Its SEC file number is 001-43458 and its CIK is 1720265. The master document for everything below is the 424B3 prospectus filed August 24, 2026.

Why does the pre-conversion history matter? Because before the August 2026 conversion, the trust had no redemption program, so there was no arbitrage mechanism pulling the share price toward the value of the underlying ZEC. The result, documented in the prospectus, was extreme: between October 2021 and June 2026 the shares traded at premiums of up to 240% and discounts of up to 55% to net asset value, and they traded at a discount on roughly 700 trading days. That history is the reason the conversion mechanics below exist, and it is worth remembering whenever someone compares a pre-August 2026 ZCSH price to the ZEC price.

## Fund structure in one paragraph

Investors in ZCSH do not own ZEC. They own shares of a trust, and the trust owns ZEC. The trust is passive: it does not trade, it does not try to outperform the ZEC price, and its objective is simply for the shares to reflect the value of the ZEC it holds, minus the trust's expenses. Shares are created and redeemed only in large blocks called Baskets of 10,000 shares. As of June 30, 2026, one Basket required 804.8241 ZEC, or about 0.08048 ZEC per share — a figure that declines slowly over time as the sponsor fee is paid out of the trust's holdings. An intraday indicative value per share is disseminated during the trading day.

## Custody: who holds the ZEC, and under what terms

The custodian is Coinbase Custody Trust Company, LLC. The prospectus describes a two-tier arrangement. The **Vault Balance** is the trust's ZEC held in segregated wallets, with all private keys kept offline in cold storage. The **Settlement Balance** covers ZEC in transit through the prime broker (Coinbase, Inc.): it may sit in omnibus cold-storage wallets, omnibus hot-storage wallets, or omnibus accounts at third-party venues connected to Coinbase. In the omnibus tiers the trust's ZEC is commingled with other clients' assets, though the trust retains a pro-rata entitlement tracked on Coinbase's internal ledger.

Two limitations in the custody terms deserve attention because they are frequently glossed over. First, the custodian's liability is capped at **$100 million per cold storage address**: if a single address holds ZEC worth more than $100 million for five consecutive business days without being reduced, the trust has no claim against the custodian for the excess. The prospectus notes this threshold had not been reached as of its date. Second, insurance is partial. The custodian maintains crime (fidelity) insurance through policies held by Coinbase Global, covering theft including internal theft by employees — but the coverage is **shared among all of Coinbase's custody clients, not dedicated to the trust**, and Coinbase has stated in its own securities filings that the total crypto in its possession "is significantly greater than the total value of insurance coverage." The prospectus is blunt about the consequence: the lack of full insurance and shareholders' limited legal recourse expose the trust and its shareholders to the risk of loss for which no person is liable. The trust's ZEC will not be loaned, pledged, or used as collateral.

One open question the filings do not answer: the prospectus discusses shielded and transparent ZEC at length, but **never states whether the trust holds shielded (z-address) or transparent (t-address) ZEC**, or whether in-kind creations must arrive at transparent addresses. Until the sponsor discloses it, any claim about shielded custody is speculation.

## How shares are created and redeemed

This is the section where most public commentary goes wrong, so it is worth being precise. The trust itself **never buys ZEC on the open market** to meet creations. Instead, shares enter and leave the world through Authorized Participants (APs) — large trading firms that transact directly with the trust in Basket-sized blocks.

As of the prospectus date there are two named APs: Jane Street Capital, LLC and Virtu Americas LLC. The mechanics work like this:

- **Creations** can be made in cash or in kind. In an in-kind creation, the AP (or its designee) delivers ZEC directly to the trust and receives newly created shares. In a cash creation, the AP delivers cash, and liquidity providers convert it into ZEC for the trust. APs pay a variable fee on certain cash orders.
- **Redemptions are cash-only.** The prospectus is explicit: "the Trust does not permit redemptions of Shares via in-kind transactions" as of its date, though it may choose to allow them later. So an AP can create shares by delivering ZEC, but can only redeem shares for cash proceeds — an asymmetry worth noting, since it differs from the textbook image of an in-kind ETF where the underlying asset flows both ways.

The practical effect is an arbitrage loop: when ZCSH trades above the value of its underlying ZEC, APs create new shares (delivering ZEC or cash) and sell them, pushing the price down; when it trades below, they buy shares and redeem them for cash, pushing the price up. That loop is what keeps the exchange price near net asset value, and it is what was missing during the OTCQX years of 240% premiums.

The key implication: **headline "inflows" into ZCSH do not mean someone bought ZEC on an exchange.** An inflow means an AP delivered ZEC (or cash that became ZEC through a liquidity provider) to the trust through the primary creation mechanism. The ZEC ends up in the trust's custody either way, but the market mechanics — and what the flow says about demand — are different from open-market buying.

## The sponsor fee: 2.5%, paid in ZEC, daily

The sponsor charges **2.5% per year** of the trust's net asset value. The fee accrues daily in US dollars (measured at 4:00 p.m. New York time), is converted into ZEC at the index price, and is **paid in ZEC to the sponsor daily in arrears** — the custodian withdraws it from the trust's Vault Balance on the sponsor's instruction. (An earlier 10-Q described monthly payment; the prospectus, the controlling document, says daily.) At 2.5%, the fee is roughly an order of magnitude above typical spot bitcoin ETP fees, and because it is paid in ZEC out of the trust's holdings, each share's ZEC entitlement decays a little every day.

One unusual feature: the sponsor states it intends to direct **100% of the fee revenue to Zcash ecosystem marketing, development, and education for up to 12 months** following the registration's effectiveness. Read the fine print, though: this is a voluntary undertaking "paid from the Sponsor's own funds after receipt," it is "not an obligation of the Trust," and the sponsor "may modify or discontinue this commitment at any time in its sole discretion." It is a marketing commitment, not a structural one.

## What happens to the ZEC the trust holds

Short version: it sits there. The trust does not stake (ZEC is proof-of-work; staking appears nowhere in the prospectus), does not lend, and does not trade. On forks and airdrops, the policy is decisive: the sponsor "will cause the Trust to irrevocably abandon" any incidental rights or forked coins, so **shareholders receive nothing from forks or airdrops**. Changing that policy would require NYSE Arca to file with the SEC to amend the listing rules — it cannot be done quietly.

## The September 8, 2026 disclosure: what the ~$100 million transaction was

On September 8, 2026, the trust filed a Form 8-K disclosing that DCG International Investments Ltd. — a wholly owned, indirect subsidiary of Digital Currency Group, i.e. **an affiliate of the sponsor itself** — had acquired shares of the trust "having an aggregate value of approximately $100 million through an Authorized Participant, or its AP Designee, in exchange for 85,705.32563297 ZEC tokens." The shares, the filing notes, "have no preference features associated with them and are economically the same as other shares of the Trust."

The transaction had been pre-disclosed in the prospectus as a non-binding "Potential Contribution Arrangement" contemplating roughly 200,000 ZEC. Only about 85,705 ZEC actually changed hands — because ZEC's price roughly doubled between the disclosure and the closing, the token count fell while the dollar figure stayed near $100 million (implying roughly $1,166 per ZEC at closing versus roughly $500 at disclosure).

What this proves: a sponsor affiliate contributed ZEC it already held into the trust through an **in-kind creation via an Authorized Participant**, receiving newly created ordinary shares. It added roughly 85,700 ZEC to the trust's holdings in one stroke, alongside the product's reported cumulative net inflows of more than $70 million in its first two weeks and assets above $500 million.

What it does **not** prove: it is not evidence of open-market institutional buying. The shares were created through the primary-market creation mechanism, not purchased on NYSE Arca from other investors, and **no ZEC was bought on the open market by the trust in connection with this transaction** — the ZEC was contributed in kind. Describing it as "$100 million of institutional ZEC buying" mistakes a related-party primary-market creation for secondary-market demand. The press release itself adds a dry footnote worth quoting: DCG and its affiliates "from time to time sell or otherwise monetize their digital asset holdings, including $ZEC (Zcash)... in order to fund operating expenses and capital investments." The ZEC moves in both directions.

## Options on ZCSH

On September 8, 2026 — the same day as the DCG disclosure — options on ZCSH began trading on NYSE Arca. The issuer's press release frames it plainly: options give "investors familiar, exchange-traded tools to manage risk, generate income, and express their market views."

What options change, and what they do not: listed options extend the financial infrastructure *around* ZEC. They let investors hedge, lever, and express views on the share price using standard brokerage accounts, and they give market makers tools that tend to tighten spreads and deepen liquidity in the shares themselves. They do not change anything about the Zcash protocol, they do not create or destroy ZEC, and exercising or settling an option moves shares, not ZEC — the trust's holdings are unaffected. A note of caution on specifics: **no OCC listing memo or exchange information notice for ZCSH options could be located**, so contract details (exercise style, multiplier, position limits) are unverified in primary sources at the time of writing. Standard US equity-option conventions would normally apply, but that is inference, not documentation.

## Owning ZEC vs. owning ZCSH: the differences that matter

For a Zcash user evaluating the two, the differences fall into five buckets:

- **Custody.** Direct ZEC is self-custodied: your keys, your coins, no counterparty. ZCSH is custodied by Coinbase Custody with the liability caps and partial insurance described above, plus the omnibus tiers for settlement balances.
- **Transferability.** ZEC moves peer-to-peer, globally, 24/7, in minutes. ZCSH moves only as exchange shares during market hours, through a brokerage account, subject to market holidays and settlement cycles.
- **Shielding.** ZEC can be held and transacted in shielded pools, with sender, receiver, and amount hidden by zero-knowledge proofs. ZCSH offers no shielding: it is a transparent securities position, and (as noted) the filings do not even say whether the trust's own ZEC is shielded.
- **Transaction utility.** ZEC can be spent, sent, and used in applications on the Zcash network. ZCSH cannot leave the securities system; it has no on-chain existence.
- **Network access.** Holding ZEC is a direct relationship with the Zcash network. Holding ZCSH is a relationship with a trust, a sponsor, a custodian, APs, and an exchange — each a counterparty with its own fees, terms, and failure modes.

None of this is an argument against the product's existence; it is an argument against confusing the two. ZCSH is exposure to the *price* of ZEC through the traditional financial system. It is not participation in the Zcash network.

## Practical implications for the ecosystem

**ETF-held ZEC and circulating supply.** ZEC delivered into the trust — whether via in-kind creations like the DCG transaction or cash creations converted through liquidity providers — leaves the liquid, transactable supply and sits in custody indefinitely. It returns only through cash redemptions, which sell ZEC for dollars. In that sense the trust acts as a one-way sink while inflows persist: ZEC goes in, shares come out, and the ZEC does not come back except through the redemption channel.

**Creation and redemption effects on holdings.** Because redemptions are currently cash-only, every redemption is a sale of the trust's ZEC. In-kind creations add ZEC without market buying; cash creations add ZEC *with* market buying (through the liquidity providers). Lumping all "inflows" together obscures which kind they were.

**The sponsor fee as a steady outflow.** At 2.5% annually paid in ZEC daily, the fee is a continuous, predictable drain on the trust's holdings — and, by extension, a continuous sell pressure on ZEC, since the sponsor presumably converts fee income to fund operations. The voluntary 12-month ecosystem-spending commitment offsets this narratively but not mechanically; and it is revocable.

**Assumptions worth retiring.** The documentation contradicts several common ones: (1) ZCSH is not legally an ETF; (2) the trust does not buy ZEC on the open market for creations; (3) the $100M DCG transaction was a related-party in-kind creation, not institutional open-market demand; (4) redemptions are cash-only, not in-kind; (5) shareholders get nothing from forks or airdrops; (6) custody insurance is partial and shared; (7) the fee is 2.5%, not the sub-0.25% figures common in bitcoin ETPs. What the documentation supports: a regulated, exchange-traded, arbitrage-kept vehicle for ZEC price exposure with real, audited, custodied holdings — over $500 million of them within two weeks of launch — and a derivatives layer now forming on top.

## What remains unknown

A responsible reference should say what it cannot confirm. As of this writing: the options contract specifications are unverified in primary sources; whether the trust holds shielded or transparent ZEC is undisclosed; no bespoke SEC rule-change filing for the Zcash listing could be located (the listing rests on the NYSE Arca certification of August 24, 2026); and current AUM and ZEC-per-share figures beyond the September 8 press release come from the fund website and data vendors, not filings. These gaps are worth watching, because each one that gets filled changes the picture — particularly custody transparency.

## Sources

All facts above are drawn from primary sources unless marked as unverified in the text:

- 424B3 prospectus, The Zcash ETF, filed August 24, 2026 (SEC CIK 1720265) — fund structure, custody, APs, creation/redemption, sponsor fee, forks policy, insurance, pre-conversion premium/discount history. https://www.sec.gov/Archives/edgar/data/1720265/000119312526363603/zcsh__424b3.htm
- Form 8-K, The Zcash ETF, filed September 8, 2026 (Item 8.01) — the DCG ~$100M in-kind transaction, verbatim disclosure. https://www.sec.gov/Archives/edgar/data/1720265/000119312526385317/zcsh-20260908.htm
- Exhibit 99.1 press release, September 8, 2026 (filed with the 8-K) — AUM >$500M, cumulative inflows >$70M, options launch on NYSE Arca. https://www.sec.gov/Archives/edgar/data/1720265/000119312526385317/zcsh-ex99_1.htm
- Form 8-K, filed August 21, 2026 — anticipated uplisting and name change. https://www.sec.gov/Archives/edgar/data/1720265/000119312526361075/zcsh-20260821.htm
- NYSE Arca certification to the SEC Division of Corporate Finance, dated August 24, 2026 — listing and registration approval. https://www.sec.gov/Archives/edgar/data/0001720265/000114336226000322/ZCSH082426.pdf
- Form S-3 registration statement, filed November 26, 2025 (Reg. No. 333-291800), five amendments — registration history. https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm
- Official fund website: https://thezcashetf.com
