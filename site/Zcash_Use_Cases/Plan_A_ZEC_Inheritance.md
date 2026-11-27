# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Plan a ZEC inheritance

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermediate - 10 min
</span>

## TL;DR

- Shielded ZEC can't be found by looking at the blockchain. Without your recovery phrase or a viewing key, your heirs may never learn it exists
- Write down everything a restore needs: each wallet's recovery phrase, its birthday height, any extra passphrase, and which app and accounts you use
- Keep the recovery phrase out of your will. In England and Wales, for example, anyone can order a copy of a will once probate has been granted
- An executor who only needs to confirm a balance can use a full viewing key: it shows the account's payments and spends but can't move any funds
- Test the plan with a restore, and review it when your wallets change or a network upgrade affects old funds

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Who is this for?

- Anyone who holds ZEC in their own wallet and wants it to reach their family
- Executors and relatives who may one day have to find and recover someone's ZEC
- People who want to share control of savings with someone they trust

This page covers the practical side. Inheritance law and tax differ from country to country, so ask a lawyer where you live about wills, probate and how to refer to your instructions. ZecHub can't give legal advice.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> The problem

With a bank account, a statement in a drawer points your family to the money, and the bank can release it to your executor. Self-custodied ZEC has no bank. Whoever holds the recovery phrase controls the funds, and no company can reset it for your heirs. ZODL's support pages, for example, say they have no access to your phrase and can't help you recover it.

Shielded ZEC adds a twist. Amounts and addresses are encrypted on chain, so there is nothing an executor can look up on a [block explorer](/zcash-tech/what-a-block-explorer-can-see). If there is no plan, the ZEC is probably lost. If the plan is careless, the wrong person can take it.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Why Zcash?

Your heirs inherit funds whose history isn't public, and Zcash keys give you more choices than "hand over everything":

- A [full viewing key](/zcash-tech/viewing-keys) lets an executor confirm a balance and its history without being able to spend
- [FROST](/zcash-tech/frost) multisig can split control between several people, so no single envelope or person holds everything
- A wallet can be rebuilt on any device from a written recovery phrase and birthday height, so a family member can follow your instructions without your phone or computer

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> What you need

- The recovery phrase of each wallet (24 words in ZODL and in Zkool), plus any extra passphrase you set
- Each wallet's birthday height
- Somewhere safe and offline to keep them: paper in a secure place, or a steel backup
- A letter of instruction for your executor or heirs
- A spare device for a test restore
- Optional: a wallet that can show a viewing key, such as Zkool

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Step-by-step guide

### Step 1: List what you hold

Make a list of every place your ZEC lives:

- Each wallet app, and each account inside it if you use more than one
- Hardware wallets. A Keystone paired with ZODL keeps its seed on the device, and ZODL advises against putting the app's recovery phrase on the Keystone too, so you may have two phrases to plan for
- FROST multisig accounts, and who the other members are
- Exchange accounts. They aren't restored from a phrase; the exchange's own process applies, so note the exchange and the email on the account

You don't need to write down balances. A list of places is enough, and it gives less away if the wrong person finds it.

### Step 2: Record the recovery material

For each wallet, write down:

- **The recovery phrase**, exactly as shown and in order. In ZODL it is under '...' menu > More > Advanced Settings > Zodl Recovery Phrase. In Zkool, open the account's Backup option and tap the key icon, which asks you to authenticate first.
- **The birthday height**, the block height when the wallet was created. ZODL shows it on its recovery phrase backup screen. Wallets don't scan for funds before this height, so a height that is too late hides older transactions, while an earlier one only makes the first sync slower. If it is lost, ZODL can estimate one from the month you started using the wallet, and Zkool accepts any height below the real one.
- **The extra passphrase**, if you added one. Under BIP 39 every passphrase produces a valid wallet, so the phrase with no passphrase, or the wrong one, opens an empty wallet instead of yours.
- **Account numbers**, if you use more than one account on the same phrase. In Zkool the first account is index 0.
- **For a FROST account in Zkool**, there is no recovery phrase. Each member has a backup string that starts with `zkfrost`, and a restore also needs the group's viewing key.

Write it on paper or stamp it into a steel backup. ZODL warns against screenshots, photos or any digital copy, and points out that anyone with the phrase can spend your ZEC and see your past and future transactions.

### Step 3: Choose who can do what

| Approach | How it works | Watch out for |
|---|---|---|
| Sealed recovery material | The phrase, birthday height and passphrase go in a sealed envelope or a safe, and your letter says where | Whoever opens it can take everything |
| Read-only access now, phrase later | Your executor holds a full viewing key; the phrase stays sealed | The key shows the account's whole history, including payments that arrive later, and you can't take it back |
| FROST multisig | A group in Zkool, such as 2-of-3, where each member holds one share of the key | Every member has to take part in setting it up, and each payment needs enough members to sign |
| Exchange custody | Your ZEC stays on an exchange and your executor uses its estate process | You give up self-custody, and the exchange sees everything |

You can combine them, for example a sealed envelope for the phrase plus a viewing key for the executor.

In Zkool, a FROST group has between two and seven members, and all of them must take part in the key generation. One member proposes each payment and the others sign it. For an inheritance, one layout is a 2-of-3 group where you hold two shares on separate devices and your heir holds the third. You can still spend on your own, and after you're gone your heir can spend with the backup string of one of your shares, kept with your sealed instructions. See [FROST](/zcash-tech/frost) and the [Zkool multisig guide](/guides/zkool-multisig) before you set one up.

### Step 4: Give your executor read-only access (optional)

A **full viewing key** shows the payments an account received, what it spent and its change, which is enough to work out the balance. An **incoming viewing key** only shows payments received, so it can't tell whether the money is still there. Neither key can move funds.

- In Zkool, the account's Backup option shows its unified viewing key, with a Full / Incoming selector. Not every wallet can export a viewing key, so check yours.
- Your executor can load the key into Zkool as a view-only account: create a new account, switch on "Restore Account?", paste the viewing key and enter the birthday height.
- Every address in an account shares the same viewing key, so the key shows the whole account, including payments that arrive after you share it. If you later want to withdraw that access, move the funds to a new account.

### Step 5: Write a letter of instruction

Your letter tells your executor what exists and where to find it, without holding the secrets itself. It should say:

- Which wallet apps you use and where to download them (the official sites, not search ads)
- Where the recovery material is kept, and who holds any other pieces (an envelope, a safe, FROST members)
- The birthday heights, account numbers, and whether a passphrase is used
- That nobody legitimate will ever ask for the phrase. ZODL says that anyone who asks for it is trying to scam you, even if they claim to be ZODL
- That restoring in a different wallet may need extra settings. Zkool, for example, needs "Use Internal Change" left on to find change from wallets that follow ZIP 316, such as ZODL, Zingo and zcashd
- Where to get help: the [Recovering Funds](/using-zcash/recovering-funds) page, and a person you trust who knows Zcash

Keep secrets out of your will. In England and Wales, for example, anyone can order a copy of a will from the probate records once probate has been granted. Your lawyer can tell you how to refer to a separate letter in your will.

### Step 6: Test the plan

- Restore each wallet on a spare device using only what you wrote down: the phrase, the birthday height and any passphrase. ZODL asks you to do this somewhere private, away from other people and cameras
- Check that the restored balance matches, then delete the test wallet
- If your executor has a viewing key, check together that it shows the right account
- If the letter is for someone who isn't technical, let them try the steps with you on a test wallet

### Step 7: Keep it current

- Review the plan once a year, and whenever you add an account, change wallets or move funds
- Network upgrades can change what old funds need. Since NU6.3 (July 2026), funds left in the Orchard pool can only be moved out, and each move shows its amount on chain ([Ironwood](/zcash-tech/ironwood)). Since NU7 (November 2026), Sprout funds can't be spent at all ([ZIP 2003](https://zips.z.cash/zip-2003))
- Wallets are sometimes discontinued. If yours is, move your funds to a maintained wallet (see [Wallets](/using-zcash/wallets)) and update the letter

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Common mistakes to avoid

- Putting the recovery phrase in the will itself
- Keeping the phrase as a photo, a screenshot or a file in cloud storage
- Writing down a birthday height later than the wallet's first transaction
- Forgetting the extra passphrase or the account number
- Cutting the phrase into pieces for different people: each piece gives away part of the secret, and one lost piece can lock everyone out. Multisig does this job properly
- Giving an executor an incoming viewing key when they need to confirm a balance
- Never testing the restore
- Trusting anyone who offers to "recover" the funds or asks for the phrase

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Result

You can:
- Make sure your shielded ZEC can be found and restored by the right people
- Let an executor confirm what you hold without giving them the power to spend it
- Pass on your ZEC without making your finances public

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Related

- [Recovering Funds](/using-zcash/recovering-funds) - what to do with a phrase, a wallet file or a viewing key
- [Mnemonic Seed Phrases](/zero-to-zero-knowledge/mnemonic-seed-phrases) - how a recovery phrase becomes your keys
- [Viewing Keys](/zcash-tech/viewing-keys) - read-only access without spending power
- [Zkool Multisig Guide](/guides/zkool-multisig) - setting up a FROST group in Zkool
- [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) - records for taxes and accounting
- [Wallets](/using-zcash/wallets) - which wallets are maintained

<br/>

## Next step

- [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec)

<br/>

## Sources

- ZODL support: [Backing up your Zodl recovery phrase](https://support.zodl.com/article/12-backing-up-zodl), [Recovering your Zodl wallet](https://support.zodl.com/article/13-recovering-your-zodl-wallet), [Connecting a Keystone wallet](https://support.zodl.com/article/33-connecting-a-keystone-wallet)
- Zkool documentation: [Accounts](https://hhanh00.github.io/zkool2/guide/accounts.html), [Editing an account and its viewing keys](https://hhanh00.github.io/zkool2/recipe/account.html), [Multisig accounts](https://hhanh00.github.io/zkool2/frost/overview.html), [Distributed key generation](https://hhanh00.github.io/zkool2/frost/dkg.html)
- [BIP 39: Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [ZIP 2003: Disallow version 4 transactions](https://zips.z.cash/zip-2003) and [ZIP 2006: Restricting Transfers into the Orchard Pool](https://zips.z.cash/zip-2006)
- GOV.UK: [Search probate records for documents and wills](https://www.gov.uk/search-will-probate)

<br/>

If you're new, start here: [What is Zcash](/start-here/what-is-zec-and-zcash)
