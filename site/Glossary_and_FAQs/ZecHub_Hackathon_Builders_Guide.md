# ZecHub hackathon builder's guide

## TL;DR

- Know why you are building before you write code, usefulness beats complexity
- Keep it simple, a small idea done well beats a big idea left unfinished
- Learn the Zcash infrastructure stack early, it is the steepest part of the climb
- If your app moves funds, it must work on mainnet, build on testnet, then prove it on mainnet
- Documentation and a clear demo can matter more than the product itself
- Winning is a starting line, it builds your reputation and opens doors in the community

<br/>

## Who is this for

- First-time builders entering a ZecHub or Zcash hackathon
- Developers from other ecosystems who are new to Zcash
- Anyone who wants to turn a hackathon project into something lasting

<br/>

## Start with why

Before you open your editor, know what problem you are solving and why anyone would care. A good test is simple: if the thing you are building did not exist, would anyone miss it? Build something you would use yourself. Privacy is the reason Zcash exists, so understand why privacy matters to the people you are building for, then let that shape the whole project.

<br/>

## Learn the stack first

The most common surprise for builders from other chains is the learning curve for Zcash infrastructure, not the coding. Give yourself time to understand how the pieces fit before you design your app. Start with the core stack, often called Z to the third: zebrad, a light server, and a wallet. Then get familiar with the developer tools:

1. Read the developer page on the wiki at [zechub.wiki/developers](https://zechub.wiki/developers), it is the recommended first stop
2. Explore zingolib and the zingo-cli, whose calls cover most of what a project needs across tracks
3. Look at librustzcash and the ZODL reference wallet for lower level building blocks
4. For a FROST project, use the Zcash Foundation's frostd and frost-core from crates.io, and lean on AI to help with definitions, though using FROST securely still takes real effort and time

<br/>

## Understand what mainnet means

Several tracks require your app to interact with Zcash mainnet. In practice this means your project, or someone using it, including an AI agent, sends or receives real funds on mainnet, or it builds and improves the tools that make this possible. If your app makes transactions, you must demonstrate them on mainnet in your submission.

Build on testnet while you develop. Mainnet activity costs real ZEC and will only get more expensive over time, so testnet is the recommended place to iterate. Switch to mainnet for the final proof. Keep one detail in mind as you design your flow: when funds arrive at a shielded address, your wallet has to scan and find them before they can be spent, and that scan takes a little time. Build that short wait into your app rather than assuming incoming funds are ready to use straight away.

<br/>

## Keep it simple

A simple, well-executed idea has beaten a complex one many times. Judges have watched a basic concept win over a more technically ambitious project in the same event, because it solved a real problem and was easy to understand. Take on less than you think you can finish. Overlooking details, scoping too big, and skipping research are the mistakes that cost builders prizes. Make your project easy to understand and easy to run, from the core concept to the first command.

<br/>

## Win the first 30 seconds

Reviewers form a strong impression quickly, so presentation, topic, and visuals carry real weight, alongside how novel your solution is. Documentation and a clear demo are not afterthoughts. Communicating your idea is sometimes more important than the idea itself, because if no one understands what you built, it cannot succeed. Judging tends to balance technical depth, user experience, originality, and practical utility, and strong documentation lifts all of them.

<br/>

## Look at the harder and thinner tracks

If you want less crowded competition, the harder tracks often have fewer entries simply because fewer people attempt them. The Accounting track is a good option for beginners who want to avoid on-chain transaction work. FROST is powerful and underused, and it makes a strong foundation for a project. The community does not prescribe what to build, so building on a capable tool the ecosystem already has, rather than starting from zero, is a smart move.

<br/>

## After the hackathon

Winning is not the end of the road. Winning builds your portfolio and reputation, opens doors in the community, and can lead to funding via proposals.

1. Take a strong project further as a proposal to the ZecHub DAO or Zcash Community Grants, with a roadmap, milestones, and a budget rationale
2. Stay active in the community on the forum, Discord, and X
3. Join Arborist R and D meetings, post ideas, and ask for feedback
4. Keep building even if you do not win, and watch for the next hackathon

<br/>

## Related pages

- [Developer Resources](https://zechub.wiki/developers) - the first stop for Zcash builders
- [Zebra Full Node](https://zechub.wiki/zcash-tech/zebra-full-node) - the node at the base of the stack
- [FROST](https://zechub.wiki/zcash-tech/frost) - threshold signatures for advanced projects

<br/>

<small>This guide was shaped by insights from ZecHub core contributors squirrel, Dismad, and Tron.</small>
