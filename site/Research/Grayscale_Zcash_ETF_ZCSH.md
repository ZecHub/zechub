# The Grayscale Zcash ETF (ZCSH)

On 25 August 2026, Grayscale's Zcash Trust began trading on NYSE Arca as
*The Zcash ETF*, under the ticker ZCSH. It is the first US spot Zcash
exchange-traded product, and it is now one of the larger single holders of
ZEC in existence.

This page explains what that structure is, who the parties are, how shares
come into and go out of existence, and — the part that matters most on a
Zcash wiki — what a shareholder does and does not get. It is descriptive,
not advice.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust itself holds the ZEC at Coinbase Custody; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC daily, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## From private placement to NYSE Arca

The vehicle is older than its ticker suggests. It launched as a private
placement on 24 October 2017, became publicly quoted on 18 October 2021,
and traded over the counter for nearly five years before the uplisting. The
registrant — Grayscale Zcash Trust (ZEC), CIK 1720265 — filed to rename
itself Grayscale Zcash Trust ETF on effectiveness and to list on NYSE Arca.

The distinction is not cosmetic. An OTC-quoted trust has no redemption
mechanism, so its shares can drift to a premium or discount against the
value of the assets behind them, sometimes severely. An exchange-traded
product with functioning creation and redemption has an arbitrage path that
keeps the share price tethered to net asset value. Changing from one to the
other changes how the thing behaves as a security, which is why the
conversion was news.

## Who does what

| Role | Party |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC, a consolidated subsidiary of Digital Currency Group |
| Custodian | Coinbase Custody Trust Company, LLC |
| Transfer agent | The Bank of New York Mellon, with Continental Stock Transfer & Trust Company as co-transfer agent |
| Exchange | NYSE Arca |

The Sponsor runs the fund. The Custodian holds the ZEC and the private keys
controlling it. The transfer agent maintains the share register. No single
one of these parties is the fund; the structure is the arrangement between
them, which is what the diagram above sets out.

## How shares are created and redeemed

Only Authorized Participants — registered broker-dealers under agreement
with the Sponsor — can create or redeem shares, and only in blocks of
10,000, called Baskets. An ordinary investor never interacts with this
machinery; they buy and sell existing shares on the exchange like any other
listed security.

The mechanism is currently **cash**, not in-kind. An Authorized Participant
deposits cash into, or receives cash from, a cash account, and a third-party
liquidity provider is the one that actually obtains or disposes of the ZEC.
The registration statement also describes an in-kind process, in which an
Authorized Participant would deposit ZEC directly with the Trust or receive
ZEC from it — but it states plainly that "In-Kind Regulatory Approval has
not been obtained," and may never be.

That detail is worth holding onto. Under the cash process, ZEC changes hands
between the liquidity provider and the market, not between the investor and
the Trust. Nobody in the retail path ever touches a Zcash address.

## The fee is paid in ZEC

The Sponsor's Fee accrues daily as an annual percentage of net asset value
and is, in the filing's words, "payable in ZEC to the Sponsor daily in
arrears."

The consequence is structural rather than incidental: the fee is taken out
of the fund's ZEC, so the amount of ZEC backing each share declines a little
every day. A share is not a fixed quantity of ZEC held indefinitely. It is a
claim on a slowly shrinking one. Anyone comparing long-term ZCSH exposure
against simply holding ZEC needs that in the comparison.

For the current fee rate, read the prospectus rather than any secondary
source — fee schedules commonly change on uplisting, and a stale percentage
is worse than none.

## What a shareholder actually owns

A share is exposure to the price of ZEC. It is not ZEC.

A shareholder cannot send a shielded transaction, cannot attach a memo,
cannot hold a unified address, and cannot self-custody. None of the
properties that distinguish Zcash from other assets are available through
the wrapper — the wrapper conveys price and nothing else. For an investor
whose goal is exposure inside a brokerage or retirement account, that is
exactly the point. For anyone whose interest in Zcash is the privacy, the
ETF is not a substitute for a wallet, and the two are not really
alternatives to one another.

There is a second-order point too. The Trust's ZEC sits with a regulated
custodian under a structure designed for auditability. Whatever else that
is, it is not the usage pattern the protocol was built for, and a meaningful
share of the supply sitting in it is a fact about Zcash's distribution
worth tracking.
## The ZEC is held in the open

There is a further irony in the structure, and it is the sharpest thing on
this page. Coinbase Custody holds the Trust's ZEC in transparent addresses,
not shielded ones. The fund's holdings are visible on-chain, traceable to the
custodian, and observable in real time by anyone who cares to look.

That is not an oversight. Regulated fund infrastructure is built around audit
and attestation, and a shielded balance is precisely the thing an auditor
cannot independently verify. Coinbase's own support reflects the same
asymmetry: it will receive ZEC sent from a shielded address, but it does not
send ZEC to one.

So the largest institutional holder of a privacy asset holds it in the one
form that has no privacy. What is bought through the wrapper is the price of
ZEC; the property that makes ZEC distinctive is left on the table by the
structure holding it.

This point is sourced to reporting rather than to the filings — the S-3
describes custody of the Trust's private keys but does not characterise
address types — and is stated here with that caveat.
## How much ZEC is involved

As of 30 September 2025, the Trust held approximately **2.4% of circulating
ZEC** — a figure the filing states directly, and which is consistent with
its own share count and per-share holdings at the time.

That was before the uplisting and before the 2026 price move, so treat it as
a floor on the fund's relative significance rather than a current reading.
Anyone citing a number for today should take it from the most recent filing
or the fund's own daily disclosure, both linked below.

## Sources

All primary, all on EDGAR under CIK 1720265 unless noted.

- [Grayscale Zcash Trust (ZEC) — EDGAR filing index](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Form S-3 registration statement, November 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — sponsor, custodian, transfer agent, creation and redemption mechanics, Sponsor's Fee, percentage of circulating ZEC
- [Form 10-K for the year ended 31 December 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [The Zcash ETF begins trading on NYSE Arca, 25 August 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust fund page](https://www.grayscale.com/funds/grayscale-zcash-trust) — inception dates, current holdings and fee
- [The first privacy coin ETF: inside Grayscale's Zcash filing](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — secondary source; the only one found stating that the Trust's ZEC is held in transparent addresses
Checked 28 September 2026. Figures in filings carry their own "as of" dates
and are quoted with them; nothing here is a live number.
