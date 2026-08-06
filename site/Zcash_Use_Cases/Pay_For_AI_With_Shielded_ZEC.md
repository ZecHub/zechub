# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Pay for AI Services Privately with Shielded ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Beginner - 10 min
</span>


## TL;DR

- **NanoGPT** takes shielded ZEC directly, with no account and no email
- Minimum top-up is **$0.10**, so you can test it for pocket change
- Credit lands in about **30 seconds**, on the first confirmation
- For services that do not take ZEC, use **CrossPay** to spend shielded ZEC and have them paid in USDC
- What ends up on chain depends on **which pool your ZEC is in**, and the screen never tells you

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Who is this for?

- Anyone who does not want an AI subscription tied to their name
- Developers paying for inference without a corporate card
- People in countries where card payments to AI services fail
- Anyone who would rather not hand over an email to try a model

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> The Problem

Paying for AI normally means a card, an email, and an account. That ties every prompt you write to your legal identity, and the payment processor sees it too.

Crypto is supposed to fix this, but most guides are out of date. Services change what they accept, and a walkthrough written a year ago will send you down a route that no longer works.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Why Zcash?

A shielded payment hides the sender, the receiver and the amount. The service gets paid, and nobody watching the chain learns who paid or how much.

That only holds if you pay **from** shielded funds. This page is specific about when it holds and when it does not.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> What You Need

- ZEC in a **shielded** balance
- A wallet that can send to a unified address. This walkthrough uses **Noir Wallet**, a browser extension, so the whole flow stays in one window. Zkool and Zodl work the same way
- About $1 to follow along

> **Coming from an exchange?** Most exchanges, including Binance, only withdraw ZEC to **transparent** addresses, and they will not accept a `u1...` address as a destination. Withdraw to your own transparent address first, shield it in your wallet, then pay from the shielded balance.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Route 1: Pay NanoGPT directly

[NanoGPT](https://nano-gpt.com/) gives you 200+ models, including GPT, Claude, Gemini and image models, and it accepts ZEC natively.

### Step 1: Open it. There is no signup

Go to nano-gpt.com and start using it. Every session is anonymous by default and the app says so itself: *"You are already using NanoGPT privately."* There is no account to create and no email to hand over.

### Step 2: Save a sign-in token first

Before you put money in, open **Settings** and create a sign-in token, then store it somewhere safe.

> **This step protects your money.** An anonymous balance lives in your browser's local data. Clear your cookies without a saved token and the balance is gone, with no account to recover it from. Do this before you deposit, not after.

### Step 3: Add balance

Open **Balance**, choose **Custom**, and enter an amount. The minimum is **$0.10** and the maximum is $5,000. NanoGPT tells you what it buys, around 12 GPT 5.5 prompts or 18 images for $1.

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Step 4: Choose Zcash

Pick **Digital currencies**, then **Zcash** from the grid.

You will get a QR code, a payment address, and a **transfer minimum** in ZEC for the amount you chose. That figure is priced at the moment the page loads.

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Step 5: Send from your wallet

Copy the address into your wallet, enter the amount, and send. The network fee is about **0.00015 ZEC**.

> **Send slightly over the minimum.** The quote is priced when the page loads and ZEC moves before your transaction confirms. Sending exactly the minimum landed **$0.99** instead of $1.00 in testing. Sending a little over landed $1.17 for the same nominal $1, because NanoGPT credits what you actually send.

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### Step 6: Wait about 30 seconds

Your wallet will show the transaction pending, then confirming. NanoGPT credits the balance on the **first confirmation**, so you do not have to wait for all three.

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

The balance appears and you can spend it immediately.

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Route 2: Services that do not take ZEC

Most AI services do not accept ZEC. **Venice.ai** and **OpenRouter** both take USDC instead, and OpenRouter lets you pick which chain the checkout settles on.

For those, use **CrossPay** in [Zodl](/zcash-organizations/zodl). You spend shielded ZEC and the recipient is paid in the asset they asked for, routed through NEAR Intents without a centralised exchange and without KYC.

1. Get the service's payment address and the asset and chain it expects, for example USDC on Base
2. Open Zodl and choose **CrossPay**
3. Enter that address, pick the asset the service wants, and enter the amount
4. Send from your shielded balance

Your ZEC leaves shielded. The service sees an ordinary USDC payment arriving and never learns it started as ZEC.

> The swap leg is visible on the destination chain, so the USDC payment itself is as public as any other USDC payment. What stays private is the Zcash side and the link between the two.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> What is revealed at each step

This is the part most guides skip.

| What happens | What the service learns | What goes on chain |
|---|---|---|
| Browsing and prompting | Nothing. No account, no email | Nothing |
| A deposit address is issued | Nothing | Nothing |
| You pay **from Sapling** | The deposit address you used | Nothing. Shielded to shielded |
| You pay **from Ironwood** | Same | **The amount and the block height** |
| You pay **from a transparent address** | Same | The amount and your t-address |
| Any of the above | Your IP, unless you use Tor or a VPN | Not applicable |

### Why the pool matters

NanoGPT's deposit address is a unified address. Decoding one issued in August 2026 shows exactly two receivers: **Sapling** and **Orchard**.

Since the [Ironwood](/zcash-tech/ironwood) upgrade activated on 28 July 2026, Orchard is spend-only and no new value can enter it. That leaves **Sapling as the only receiver a payment can actually land in**.

So if your ZEC is already in Sapling, the payment is Sapling to Sapling and nothing about it is public. But if you have migrated to Ironwood, paying moves value across a pool boundary, and [the turnstile](/zcash-tech/the-turnstile) publishes the amount and the height even though sender and receiver stay hidden.

The screens look identical either way. Keeping a small Sapling balance for payments is the simplest fix.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Common Mistakes to Avoid

- Depositing before saving a sign-in token, then clearing cookies
- Sending exactly the transfer minimum and landing a cent short
- Trying to withdraw straight from an exchange to a `u1...` address
- Assuming the payment is private without checking which pool you spent from
- Paying over a normal connection when the whole point was not being identified

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Result

You can:

- Use frontier AI models without an account, an email or a card
- Pay in shielded ZEC and know exactly what that does and does not hide
- Reach services that have never heard of Zcash, through CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Related

- [Ironwood](/zcash-tech/ironwood) - why the pool your funds sit in changed
- [The Turnstile](/zcash-tech/the-turnstile) - what becomes public when value crosses pools
- [Wallets](/using-zcash/wallets) - which wallets are maintained
- [ZODL](/zcash-organizations/zodl) - the wallet behind CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progress

**Step 1 of 1**

You have paid for an AI service with shielded ZEC and you know what it revealed.

<br/>

## Next Step

- [Send Money Without Linking Identity](/zcash-use-cases/send-money-without-linking-identity)

<br/>
