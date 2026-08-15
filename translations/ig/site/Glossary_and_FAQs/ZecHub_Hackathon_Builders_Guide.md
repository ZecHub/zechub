# Ntuziaka onye na-ewu ihe ZecHub hackathon

## TL;DR

- Mara ihe mere ị na-ewu tupu i dee koodu, uru bara uru karịa mgbagwoju anya
- Mee ka ihe dị mfe, obere echiche e mere nke ọma na-emeri nnukwu echiche a hapụrụ n'emechaghị emecha.
- Mụta ihe owuwu Zcash na mbido, ọ bụ akụkụ kachasị elu nke ịrịgo ahụ.
- Ọ bụrụ na ngwa gị akpali ego, ọ ga-arụ ọrụ n'elu mainnet, wuo ya na testnet, wee gosipụta ya na mainnet
- Ihe odide na ngosipụta doro anya pụrụ ịdị mkpa karịa ngwaahịa ahụ n'onwe ya .
- Mmeri bụ ihe na-amalite, ọ na-ewulite aha gị ma mepee ụzọ n'obodo.

<br/>

## Onye ka nke a bụ maka ya?

- Ndị na-ewu ụlọ oge mbụ abanye ZecHub ma ọ bụ Zcash hackathon
- Ndị mmepe sitere na gburugburu ebe obibi ndị ọzọ bụ ndị ọhụrụ nye Zcash.
- Onye ọbụla chọrọ ime ka ọrụ hackathon bụrụ ihe ga-adịgide adịgide.

<br/>

## Malite site n'ịjụ ihe mere i ji mee ya .

Before you open your editor, know what problem you are solving and why anyone would care. A good test is simple: if the thing you are building did not exist, would anyone miss it? Build something you would use yourself. Privacy is the reason Zcash exists, so understand why privacy matters to the people you are building for, then let that shape the whole project.

<br/>

## Mụta ụzọ nke mbụ.

The most common surprise for builders from other chains is the learning curve for Zcash infrastructure, not the coding. Give yourself time to understand how the pieces fit before you design your app. Start with the core stack, often called Z to the third: zebrad, a light server, and a wallet. Then get familiar with the developer tools:

1. Gụọ peeji onye nrụpụta na wiki ahụ: [zechub.wiki/ndị mmepe](https://zechub.wiki/developers), ọ bụ ebe mbụ a na- atụ aro ka anyị kwụsịtụ .
2. Chọpụta zingolib na zingo-cli, nke oku ya kpuchie ọtụtụ ihe oru ngo chọrọ n'ofe egwu.
3. Lee akwụkwọ ahụ bụ librustzcash na akpa ego ZODL maka ihe owuwu ụlọ dị ala.
4. For a FROST project, use the Zcash Foundation's frostd and frost-core from crates.io, and lean on AI to help with definitions, though using FROST securely still takes real effort and time

<br/>

## Ghọta ihe mainnet pụtara

Several tracks require your app to interact with Zcash mainnet. In practice this means your project, or someone using it, including an AI agent, sends or receives real funds on mainnet, or it builds and improves the tools that make this possible. If your app makes transactions, you must demonstrate them on mainnet in your submission.

Build on testnet while you develop. Mainnet activity costs real ZEC and will only get more expensive over time, so testnet is the recommended place to iterate. Switch to mainnet for the final proof. Keep one detail in mind as you design your flow: when funds arrive at a shielded address, your wallet has to scan and find them before they can be spent, and that scan takes a little time. Build that short wait into your app rather than assuming incoming funds are ready to use straight away.

<br/>

## Mee ka ọ dị mfe nghọta .

A simple, well-executed idea has beaten a complex one many times. Judges have watched a basic concept win over a more technically ambitious project in the same event, because it solved a real problem and was easy to understand. Take on less than you think you can finish. Overlooking details, scoping too big, and skipping research are the mistakes that cost builders prizes. Make your project easy to understand and easy to run, from the core concept to the first command.

<br/>

## Nweta nkeji iri atọ mbụ .

Reviewers form a strong impression quickly, so presentation, topic, and visuals carry real weight, alongside how novel your solution is. Documentation and a clear demo are not afterthoughts. Communicating your idea is sometimes more important than the idea itself, because if no one understands what you built, it cannot succeed. Judging tends to balance technical depth, user experience, originality, and practical utility, and strong documentation lifts all of them.

<br/>

## Lee ụzọ ndị siri ike ma dị gịrịgịrị .

If you want less crowded competition, the harder tracks often have fewer entries simply because fewer people attempt them. The Accounting track is a good option for beginners who want to avoid on-chain transaction work. FROST is powerful and underused, and it makes a strong foundation for a project. The community does not prescribe what to build, so building on a capable tool the ecosystem already has, rather than starting from zero, is a smart move.

<br/>

## Mgbe hackathon ahụ gasịrị.

Mmeri abụghị njedebe nke ụzọ. Imeri na-ewulite pọtụfoliyo gị na aha ọma, mepee ọnụ ụzọ n'obodo ahụ ma nwee ike iduga ego site na atụmatụ.

1. Were oru ngo siri ike ka ọ bụrụ ihe a chọrọ na ZecHub DAO ma ọ bụ Zcash Community Grants, yana ụzọ map, usoro dị iche iche, na atụmatụ mmefu ego.
2. Nọrọ na-arụsi ọrụ ike n'obodo ahụ, Discord, na X.
3. Soro nzukọ R&D Arborist, biputere echiche ma rịọ maka nzaghachi.
4. Nọgide na-ewu ụlọ ọbụlagodi ma ị gaghị emeri, lezie anya maka hackathon ọzọ

<br/>

## Peeji ndị metụtara ya

- [Akụrụngwa Onye Mmepụta](https://zechub.wiki/developers) - ebe mbụ ndị na-ewu Zcash ga-akwụsị.
- [Zebra Full Node (Nọmba zuru ezu)](https://zechub.wiki/zcash-tech/zebra-full-node) - ọnụ na isi nke ikpo okwu ahụ.
- [FROST (nke a na-akpọ)](https://zechub.wiki/zcash-tech/frost) - ntinye aka n'ókè maka oru ngo di elu.

<br/>

<small>This guide was shaped by insights from ZecHub core contributors squirrel, Dismad, and Tron.</small>
