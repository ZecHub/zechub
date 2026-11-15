<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/What_Changed_in_NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7, Explained Simply

## TL;DR

- NU7 is the ninth major Zcash network upgrade. It went live on Mainnet at block 3,543,405 on 6 November 2026 (UTC).
- Blocks now arrive every 25 seconds, down from 75. Your first confirmation comes three times sooner.
- The amount of new ZEC per day did not change. Each block now pays a third of the old reward.
- 60% of transaction fees now go into a public reserve. From 2031 that reserve pays future miners.
- The old Sprout pool from 2016 is closed for good. Halvings keep their four-year rhythm.

---

## Think of it as a post office

Picture Zcash as a post office that sends out mail vans on a timetable. Each van is a block, and it carries a batch of payments.

After NU7 the post office sends a van every 25 seconds, three times as often as before. Each driver gets a third of the old wage, so the daily wage bill stays the same. A slice of every stamp goes into a savings jar that will pay drivers in the future. The oldest mailbox, built in 2016, is sealed. The calendar that halves the drivers' pay every four years stays on the wall.

The picture shows these four changes side by side.

![Infographic in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/nu7-four-changes.png)

---

## What changed

**Faster blocks.** [ZIP 218](https://zips.z.cash/zip-0218) cut the target time between blocks from 75 to 25 seconds. The reward per block fell from 1.5625 to 0.52083333 ZEC. About 1,800 new ZEC appear each day, the same as before NU7.

**A savings jar for network security.** Miners earn new coins and transaction fees. New coins shrink with every halving, so one day fees will need to carry more of the load. NU7 adds the Network Sustainability Mechanism. It takes 60% of the fees in every block out of circulation and keeps them in a public balance ([ZIP 235](https://zips.z.cash/zip-0235)). The other 40% goes to the miner right away. From block 8,939,664, expected around February 2031, the balance flows back to miners a little at a time ([ZIP 237](https://zips.z.cash/zip-0237)).

**Sprout is closed.** Sprout was the first shielded pool, launched with Zcash in 2016. NU7 made the old version 4 transaction format invalid ([ZIP 2003](https://zips.z.cash/zip-2003)). Sprout only works with that format, so the roughly 12,224 ZEC left inside can no longer move. That is less than 0.1% of all ZEC.

**A limit per block.** Each block now holds at most 330 shielded actions. The cap keeps the worst-case work for nodes and syncing wallets below the old level, even with three times as many blocks.

## What stayed the same

**Halvings.** In a September 2026 poll, 98.9% of voting ZEC chose to keep Bitcoin-style halvings. Votes were counted by coins, one ZEC for one vote. The next halving is expected around late November 2028, at block 6,132,390.

**The supply cap.** 21 million ZEC, as always.

**Transaction formats.** NU7 added no new format. Wallets that build version 5 or version 6 transactions keep working.

---

## The part beginners miss

**Faster blocks print no extra ZEC.** Three times more blocks, each with a third of the reward. Daily issuance stays where it was.

**The 60% comes back.** The removed fees wait in a public balance and return to miners from 2031. Nothing is destroyed, and the 21 million cap holds.

**A confirmation is shorter now.** Anything counted in blocks passes three times faster. An exchange that asks for 10 confirmations now needs about 4 minutes, down from 12.5.

**Frozen coins stay on the chain.** ZIP 2003 leaves room for a Sprout recovery path later. It promises nothing.

---

## Put it into practice

- Update your wallet app. The [Wallets](/using-zcash/wallets) page shows which wallets support NU7.
- Expect your first confirmation in about 25 seconds.
- Running a node? Use Zebra 7.0.0 or later. `zcashd` has no NU7 release. See [NU7](/zcash-tech/nu7) for the details.
- Holding old Sprout funds? They can no longer be spent. See [Recovering Funds](/using-zcash/recovering-funds).
- Coinholder polls helped shape NU7. To vote in the next one, keep your ZEC in a shielded wallet you control.

---

## Resources

- [ZIP 259: Deployment of the NU7 Network Upgrade](https://zips.z.cash/zip-0259)
- [ZIP 218: Block Time Reduction to 25 Seconds](https://zips.z.cash/zip-0218)
- [ZIP 235: Remove 60% of Transaction Fees From Circulation](https://zips.z.cash/zip-0235)
- [ZIP 237](https://zips.z.cash/zip-0237)
- [ZIP 2003](https://zips.z.cash/zip-2003)
- [Zcash Community Forum: NU7 Timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655)
- [The Block: Zcash's major network upgrade NU7 goes live on mainnet](https://theblock.co/news/defi/2026-11-06-zcashs-nu7-goes-live-435807)

## Related pages

- [NU7](/zcash-tech/nu7)
- [Network Upgrades](/start-here/network-upgrades)
- [Zcash Monetary Policy](/start-here/zcash-monetary-policy)
- [Sprout](/zcash-tech/sprout)
- [Ironwood](/zcash-tech/ironwood)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Quantum Computers and Zcash](/start-here/quantum-computers-and-zcash)

---

*If you would like to add or suggest edits to this wiki page, please head to the [ZecHub GitHub repo](https://github.com/ZecHub/zechub) and submit a pull request.*
