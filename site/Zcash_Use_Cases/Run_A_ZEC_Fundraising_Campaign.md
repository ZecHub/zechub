# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Run a ZEC fundraising campaign

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermediate - 10 min
</span>

## TL;DR

- Give the campaign its own wallet account and a shielded address, so it never mixes with other funds
- Share a payment request link or QR code with a suggested amount and a memo already filled in
- Show progress without exposing donors: post the total yourself, or give one trusted reviewer a viewing key
- A viewing key covers the whole account, not just one address, which is why the campaign gets its own account
- Close the campaign on the date you promised and publish how the money was used

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Who is this for?

- Community groups, open-source projects and creators raising money for one goal
- Nonprofits running a year-end or emergency appeal in ZEC
- Anyone who wants donors to trust the campaign without making every gift public

If you're a US nonprofit, read [Accept Private Donations as a US Nonprofit](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) first for receipts and IRS forms.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> The problem

Most crypto fundraisers use a transparent address so donors can watch the total grow. That also shows every gift, its amount, when it arrived and where the money goes next. Donors who give privately on purpose lose that privacy, and anyone can follow the funds after the campaign.

A fully private campaign has the opposite problem: donors can't see whether the goal was reached or how the money was spent.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Why Zcash?

With shielded ZEC, each gift stays private on-chain, and you decide what to show: a total, a progress bar, or read-only access for a reviewer. Donors can add a message in the [memo](/using-zcash/memos), and you can thank them without anyone else seeing who gave.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> What you need

- A shielded [wallet](/wallets) where you can create a separate account
- A campaign page: a website, a social post or a forum thread
- A goal, an end date and a plan for how the money will be used

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Step-by-step guide

### Step 1: Set the goal and the rules

Write down, before you launch:
- How much you're raising and what it pays for
- The end date
- What happens if you raise more or less than the goal
- Who controls the funds, and whether more than one person must approve spending (see [Run a Private Community Treasury](/zcash-use-cases/private-community-treasury))

Publish these on the campaign page. Donors trust a campaign that says up front what it will do.

### Step 2: Create a separate account for the campaign

Create a new account in your wallet, used only for this campaign, and copy a shielded address from it. Keeping the campaign separate makes the total easy to read, and it matters later if you share a viewing key, because a viewing key shows the activity of the whole account ([Viewing Keys](/zcash-tech/viewing-keys)).

### Step 3: Make a payment request link and QR code

A [payment request URI](/using-zcash/payment-request-uris) is a `zcash:` link that fills in the address, a suggested amount and a memo for the donor. Use ZecHub's [payment request generator](/tools) to build one, then share it as a link and a QR code.

A memo like "Campaign name, reply-to: your email or handle" helps donors who want a thank-you or a receipt. Say on the page that the memo is optional.

### Step 4: Launch the campaign page

Put on the page:
- The goal, end date and rules from Step 1
- The shielded address, the QR code and the link
- How to give from a shielded wallet, and where to get one
- How you'll report progress (Step 5)

Pin the address in one place and tell donors to copy it only from there.

### Step 5: Report progress without exposing donors

Pick one and say which on the page:
- **Post the total yourself**, for example once a week, from your wallet's balance for the campaign account
- **Give a viewing key to one trusted reviewer**, such as a board member or a community member donors know, who confirms the total publicly. An incoming viewing key shows gifts received; a full viewing key also shows spending ([Viewing Keys](/zcash-tech/viewing-keys))

Don't publish a viewing key on the campaign page. Anyone who has it can see every gift's amount and memo, including donors' contact details.

### Step 6: Thank donors

Reply to donors who left a contact in the memo. Never publish a donor's name or amount without asking them first.

### Step 7: Close and report

On the end date:
- Say the campaign is closed, and remove or update the address and QR code
- Post the final total and what the money paid for
- If you shared a viewing key, ask the reviewer to confirm the final total and the spending

[Payment disclosures](/zcash-tech/payment-disclosures) may one day let you prove a single payment without a viewing key, but the standard is still a draft, so don't rely on it yet.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Common mistakes to avoid

- Running the campaign from your everyday wallet account
- Publishing a viewing key, which exposes every donor's amount and memo
- Using a transparent or exchange deposit address because it's easier to show the total
- Leaving the address up after the campaign ends, so gifts keep arriving with no plan for them
- Never reporting how the money was spent

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Result

You can:
- Raise ZEC for a clear goal while every gift stays private on-chain
- Show progress that donors can trust
- Close the campaign with a public report and no exposed donors

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Related

- [Receive Donations Privately](/zcash-use-cases/receive-donations-privately) - ongoing donations, without a campaign
- [Run a Private Community Treasury](/zcash-use-cases/private-community-treasury) - roles and approvals for shared funds
- [Payment Request URIs](/using-zcash/payment-request-uris) - links and QR codes with the amount and memo filled in
- [Viewing Keys](/zcash-tech/viewing-keys) - read-only access for a reviewer
- [Where to Donate ZEC](/zcash-use-cases/where-to-donate-zec) - nonprofits that already accept ZEC

<br/>

## Next step

- [Accept Private Donations as a US Nonprofit](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

If you're new, start here: [What is Zcash](/start-here/what-is-zec-and-zcash)
