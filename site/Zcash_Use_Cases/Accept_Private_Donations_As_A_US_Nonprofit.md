# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Accept private ZEC donations as a US nonprofit

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermediate - 10 min
</span>

> This page is general information, not legal or tax advice. US tax rules change, so check each step with your accountant or tax adviser. Every rule below links to its IRS source, checked in October 2026 against Publication 526 (for 2025 returns) and Form 8283 (December 2025 revision). The IRS virtual currency FAQ was written for transactions before 2025, so check it against current guidance.

## TL;DR

- Hold donations in a shielded wallet that your organization controls, not a staff member's personal wallet
- The IRS treats ZEC as property, so a ZEC gift is a noncash contribution
- For a gift of $250 or more, send the donor a written acknowledgment that describes the ZEC but does not put a dollar value on it
- For gifts over $5,000, the donor needs a qualified appraisal, and you sign their Form 8283
- If you sell ZEC within three years of receiving it and you signed Section B of the donor's Form 8283, file Form 8282
- A donor who stays anonymous to you generally can't claim a deduction of $250 or more

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Who is this for?

- US 501(c)(3) charities, churches and community groups that want to accept ZEC
- Treasurers, bookkeepers and board members setting up crypto giving
- Donors who want to know what a nonprofit needs from them

For individuals and creators, see [Receive Donations Privately](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> The problem

Most crypto-donation services for US charities give you a transparent address, or convert the gift for you through one. On a transparent address, anyone can see every gift, its amount and your balance. A donor who gives privately on purpose loses that privacy the moment the gift lands.

A nonprofit also has paperwork that an individual doesn't: donor receipts, IRS forms for larger gifts, and an annual return. Privacy and that paperwork can both work, as long as you plan for them before the first gift arrives.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> What stays private, and what doesn't

| | Shielded gift to your shielded address |
|---|---|
| The public | Can't see the donor, your address or the amount |
| Your organization | Sees the amount and any memo; sees the donor only if they tell you |
| Your accountant | Sees what you share, for example with a [viewing key](/zcash-tech/viewing-keys) |
| When you sell | If your exchange takes only transparent deposits, the amount you move out of the shielded pool becomes public (see [the turnstile](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> What you need

- A gift acceptance policy, approved by your board, that covers cryptocurrency
- A [wallet](/using-zcash/wallets) with shielded addresses, controlled by the organization
- An exchange account in the organization's name, if you plan to convert ZEC to dollars
- An accountant who has handled noncash gifts

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Step-by-step guide

### Step 1: Decide your policy

Write down, and have your board approve:
- Who can move funds, and whether two people must approve each move
- Whether you sell each gift right away or hold some ZEC
- Whether you accept anonymous gifts, and up to what amount

### Step 2: Set up a wallet the organization controls

- Create the wallet on an organization device, not a personal phone
- Store the seed phrase offline, with two officers who can each reach it
- For shared control, see [Run a Private Community Treasury](/zcash-use-cases/private-community-treasury)

### Step 3: Publish a shielded address

- Share a shielded-only address on your donate page. A [unified address](/using-zcash/unified-addresses) starts with `u1`, but it can also contain a transparent receiver, and a gift from a transparent-only wallet then lands publicly. Use your wallet's shielded-only address if it offers one.
- Don't publish a transparent address (it starts with `t1` or `t3`)
- Ask donors who want a receipt to put their email in the [memo](/using-zcash/memos). The memo is encrypted, so only your organization can read it.

### Step 4: Record every gift

For each gift, record:
- Date and time received
- Amount in ZEC
- Value in US dollars at that time, and the price source you used
- Transaction ID and memo

The IRS treats ZEC as property ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), so this is a noncash contribution in your books. To give your accountant read-only access, see [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec).

### Step 5: Acknowledge gifts of $250 or more

A donor can't deduct a single gift of $250 or more without a written acknowledgment from you ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). For a ZEC gift, include:
- Your organization's name
- The date you received it
- A description of the gift, for example "1.5 ZEC". Don't put a dollar value on it: valuing the gift is the donor's job.
- Whether you gave anything in return, for example "No goods or services were provided in exchange for this contribution."

The donor must have it before they file their tax return ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Organizations usually send it by January 31 of the next year; sending it right away is simplest.

### Step 6: Sign Form 8283 for gifts over $5,000

If a donor claims more than $5,000, they need a qualified appraisal. Crypto doesn't count as a publicly traded security, so the appraisal applies to it ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). The donor brings you [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), and you sign the donee part of Section B. Your signature confirms you received the ZEC on that date; it doesn't confirm the donor's value ([IRS FAQ, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Step 7: Convert to dollars, if you need to

- Check which exchanges accept shielded deposits on [Custodial Exchanges](/using-zcash/custodial-exchanges). Many accept only transparent deposits.
- If yours is transparent-only, move the ZEC from your shielded wallet to the exchange in one step, at the time you sell. That amount becomes public, but your other gifts and your balance stay private.
- If you sell ZEC within three years of receiving it, and you signed Section B of the donor's Form 8283, file [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) within 125 days of the sale and send the donor a copy ([IRS FAQ, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Step 8: Report on your annual return

Report ZEC gifts as noncash contributions on your Form 990-series return, with [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) if it applies to you. Ask your accountant how to list anonymous gifts.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Anonymous donors: what they can and can't claim

- Privacy from the public is not the same as anonymity from you. A donor can give privately and still share their email in the memo to get a receipt.
- A donor who stays anonymous to you can't get an acknowledgment, so they can't deduct a single gift of $250 or more.
- Over $5,000, the donor also needs an appraisal and your signature on Form 8283, which means telling you who they are.
- For the donor, a ZEC gift held more than a year is generally deductible at fair market value, with no capital gains tax on the gift ([IRS FAQ, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Say this on your donate page, so donors can choose before they give.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Common mistakes to avoid

- Holding gifts in a staff member's personal wallet
- Publishing a transparent address, or an exchange deposit address, as your donation address
- Putting a dollar value in the acknowledgment
- Selling within three years and forgetting Form 8282
- Promising anonymous donors a tax deduction

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Result

You can:
- Accept ZEC without exposing your donors or your balance
- Give donors the paperwork they need to claim a deduction
- Keep records your accountant and auditor can check

<br/>

## Sources

- [IRS: Frequently asked questions on virtual currency transactions](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 cover charities)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Charitable contributions, substantiation and disclosure](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Charitable contributions](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Determining the value of donated property](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: appraisals for crypto gifts](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) and [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Related

- [Receive Donations Privately](/zcash-use-cases/receive-donations-privately) - the same idea for individuals
- [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) - memos and viewing keys for your books
- [Viewing Keys](/zcash-tech/viewing-keys) - read-only access for an accountant or auditor
- [The Turnstile](/zcash-tech/the-turnstile) - what becomes public when ZEC leaves a shielded pool

<br/>

## Next step

- [Run a Private Community Treasury](/zcash-use-cases/private-community-treasury)

<br/>
