# The Grayscale Zcash ETF (ZCSH)

**Zcash did not launch an ETF. Grayscale did**, by converting a fund it has
run since 2017. Zcash is a protocol — it has no company, treasury or board
that could issue a fund. Grayscale is an independent asset manager that buys
ZEC on the open market like anyone else.

That distinction is the single most misread thing about ZCSH, and it is where
this page starts. On 25 August 2026 the fund began trading on NYSE Arca as
*The Zcash ETF*, the first US spot Zcash exchange-traded product, and it is
now one of the larger single holders of ZEC in existence.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## The same fund, three stages

| When | What changed |
| --- | --- |
| October 2017 | Launches as a private placement, accredited investors only |
| October 2021 | Shares quoted on OTCQX under the ticker ZCSH, trading at a discount to NAV |
| 25 August 2026 | Becomes a redeemable ETP on NYSE Arca and drops "Trust" from the name |

The 2026 step is not cosmetic. An OTC-quoted trust has no redemption
mechanism, so its shares can drift to a premium or discount against the value
of the assets behind them, sometimes severely — which is exactly what
happened between 2021 and 2026. An exchange-traded product with working
creation and redemption has an arbitrage path that keeps the share price
tethered to net asset value. Changing from one to the other changes how the
thing behaves as a security.

## Who does what

| Role | Party |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Trustee | CSC Delaware Trust Company |
| Administrator and transfer agent | The Bank of New York Mellon |
| Prime broker | Coinbase, Inc. — sources ZEC for the trust |
| Authorised participants | Jane Street, Virtu — create and redeem shares |
| Marketing agent | Foreside Fund Services |
| **Custodian** | **Coinbase Custody Trust Company, LLC** — the only place actual ZEC exists |

No single one of these parties is the fund. The structure is the arrangement
between them, which is what the diagram above sets out. Several of these roles
were missing or garbled in news coverage at the time of listing; the list here
follows Grayscale's Form S-3 registration statement on EDGAR.

## How shares are created and redeemed

Only Authorized Participants — registered broker-dealers under agreement with
the Sponsor — can create or redeem shares, and only in blocks of 10,000,
called Baskets. An ordinary investor never touches this machinery; they buy
and sell existing shares on the exchange like any other listed security.

The mechanism is currently **cash**, not in-kind. An Authorized Participant
deposits cash into, or receives cash from, a cash account, and a third-party
liquidity provider is what actually obtains or disposes of the ZEC. The
registration statement also describes an in-kind process, in which an
Authorized Participant would deposit ZEC directly with the Trust or receive
ZEC from it — but it states plainly that "In-Kind Regulatory Approval has not
been obtained," and may never be.

So under the cash process, ZEC changes hands between the liquidity provider
and the market, never between the investor and the Trust. Nobody in the retail
path touches a Zcash address.

## The fee is paid in ZEC

The sponsor fee is **2.5% a year**, as at listing. It accrues daily as a
percentage of net asset value and is, in the filing's words, "payable in ZEC
to the Sponsor daily in arrears."

The consequence is structural rather than incidental. The fee comes out of the
fund's ZEC, so the amount of ZEC backing each share declines a little every
day. A share is not a fixed quantity of ZEC held indefinitely; it is a claim
on a slowly shrinking one. Anyone comparing long-term ZCSH exposure against
simply holding ZEC needs that in the comparison.

For context, 2.5% is roughly ten times the fee on a typical spot bitcoin ETF.
Grayscale has said early revenue from the sponsor fee will be directed back
into Zcash ecosystem development.

## What a shareholder actually owns

A share is exposure to the price of ZEC. It is not ZEC.

A shareholder cannot send a shielded transaction, cannot attach a memo, cannot
hold a unified address, and cannot self-custody. None of the properties that
distinguish Zcash from other assets are available through the wrapper — the
wrapper conveys price and nothing else. For an investor whose goal is exposure
inside a brokerage or retirement account, that is exactly the point. For
anyone whose interest in Zcash is the privacy, the ETF is not a substitute for
a wallet, and the two are not really alternatives to one another.

## The ZEC is held in the open

There is a further irony in the structure, and it is the sharpest thing on
this page. Coinbase Custody holds the Trust's ZEC in **transparent**
addresses, not shielded ones. The fund's holdings are visible on chain,
traceable to the custodian, and observable in real time by anyone who cares to
look. Nothing in this fund uses a shielded address.

That is not an oversight. Regulated fund infrastructure is built around audit
and attestation, and a shielded balance is precisely what an auditor cannot
independently verify. Coinbase's own support reflects the same asymmetry: it
will receive ZEC sent from a shielded address, but it does not send ZEC to
one.

So the largest institutional holder of a privacy asset holds it in the one
form that has no privacy. This point is sourced to reporting rather than to
the filings — the S-3 describes custody of the Trust's private keys but does
not characterise address types — and is stated here with that caveat.

## How much ZEC is involved

At listing on 25 August 2026 the fund held approximately **387,000 ZEC**, with
around **$313 million** under management.

For a longer view: as of 30 September 2025 the filing states the Trust held
roughly **2.4% of circulating ZEC**. Both numbers drift — the first with the
ZEC price and with creations and redemptions, the second as the fee is paid
out of the holdings — so take a current figure from the most recent filing or
the fund's own daily disclosure rather than from this page.

## Sources

All primary, all on EDGAR under CIK 1720265 unless noted.

- [Grayscale Zcash Trust (ZEC) — EDGAR filing index](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Form S-3 registration statement, November 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — the entity roles, creation and redemption mechanics, Sponsor's Fee, and percentage of circulating ZEC
- [Form 10-K for the year ended 31 December 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [The Zcash ETF begins trading on NYSE Arca, 25 August 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust fund page](https://www.grayscale.com/funds/grayscale-zcash-trust) — inception dates and current disclosure
- [The first privacy coin ETF: inside Grayscale's Zcash filing](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — secondary source; the only one found stating that the Trust's ZEC is held in transparent addresses

Figures are as at the dates given and will drift. Checked 30 September 2026.
Educational use only, not investment advice.
