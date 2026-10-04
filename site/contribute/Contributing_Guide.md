<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Contributing to ZecHub

ZecHub helps people learn about Zcash. If you are reading this page, we are really excited that you're considering contributing! Any contribution you make will be reflected on [zechub.wiki](https://www.zechub.wiki/) and other ZecHub social media.

### New contributors

To get an overview of ZecHub, read the [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Getting started

ZecHub uses GitHub to manage community contribution. If you are new to GitHub, not to worry! We are going to break down how you can get involved as a community contributor to ZecHub. We pay out tips in shielded ZEC for accepted contribution. Reward amounts are not fixed in ZEC — see [How rewards are set](#how-rewards-are-set). In this guide you will get an overview of the contribution workflow from opening an issue, creating a pull request (PR), reviewing, and merging the PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Join the conversation

First, join the conversation in our [community links](https://zechub.wiki/zcash-community/community-links).

### Style Guides

Any contribution to ZecHub should follow the [ZecHub style guide](https://zechub.wiki/contribute/style-guide). This includes wikis, docs and social media contents.

### Ways you can contribute

ZecHub is a community driven project that aims to provide support and resources for Zcash users and developers. There are many ways to get involved with ZecHub, including writing for our weekly newsletter, contributing to our knowledge base, or helping out with development projects.

These are the types of contribution that ZecHub currently accepts:

### How rewards are set

Tips are paid in shielded ZEC. The ZEC numbers that used to sit in the headings below were historical snapshots at an older ZEC/USD rate. Do not treat them as current rates.

How an amount is chosen:

1. Match the work to a USD interval in the [bounty amounts policy](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Pick a target inside that band — not automatically the top.
3. Convert at a public ZEC/USD spot and enter ZEC on the bounty:

```
zec_to_enter = usd_target / zec_usd_spot
```

Round to 4 decimal places. The policy file is the single source of truth. If this page and that file disagree, the policy wins.

Paid work is listed on [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Three states that are not the same:

1. **Merged** — the PR is accepted into the repository.
2. **Reward approved** — a sponsor or the DAO agrees a reward is owed, and at what size.
3. **Paid** — ZEC reaches your shielded Unified Address.

A merged contribution does not by itself approve a reward. An approved reward is not a completed payment.

#### Dev Work

Any approved dev work that helps build the Zcash ecoystem. This can include our wiki, new wallets, or any application you can think of.

#### Zcash Tutorials (video)

Here is an example tutorial below:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + Zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Create and share tutorials on Zcash apps and get rewarded. Submit PR to zechub/tutorials or send video to #video-content channel in Discord. If video meets our criteria, we will post it and tip you.

#### ZecHub Wiki - new wiki page published

Our wiki site provides Zcash education materials in an easy and digestible format. Zcash is a very advanced technology with a vibrant community, so there's still more documentation we need to build. Our goal is to build documentation on:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

These are pretty broad areas, so there is a lot to work from. If you want some inspiration, check out our current [wiki-docs site](https://zechub.wiki/) and see what's missing. Once you determine what you want to write, start to make your changes and learn how to submit a PR to the ZecHub repo. All of our docs are created and maintained in this repo. Follow the [ZecHub style guide](https://zechub.wiki/contribute/style-guide) when writing a wiki page, and use an existing page in the same section as a structural reference. After you submit a PR, please message @dismad, @squirrel, or @vito in the #zechub section of the discord, and they will review your PR and merge if it is ready to be added to the site. If merged, they will add the doc to the ZecHub website. If the doc is not ready, they will suggest edits for you in the PR.

#### ZecHub Wiki - translated wiki page

ZecHub's goal is to provide an open-source education hub that anyone in the Zcash community can contribute to. One of the hub's biggest successes is seeing community members translate ZecHub materials into their local language.

Note: ZecHub Global page translation rate limit is 10 pages per week.

Curated locale pages under `translations/<locale>/site/` are tracked against their English source by a source-hash manifest. See [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) for staleness detection, the sync workflow, and protected-terms validation.

#### ZecHub Wiki - edit to an existing doc

Sometimes our information in the docs is not spot on. Thats okay. That is why we open-source them! If you find something that needs a change in a wiki-doc, please go to the footer of the doc (which links to its GitHub page) and suggest a change via a PR.

#### ZecHub Wiki - broken link fixed

If you find that a link is broken, or something important is mispelled, please go to the footer of the doc (which links to its GitHub page) and suggest the change via a PR.

#### Newsletter - new edition

We produce the ecosystems weekly newsletter. This is a super low lift / easy way to get involved! The newsletter goes out every Friday or Saturday. If you want to write a newsletter, message @squirrel in the #zecweekly section of the Discord to let them know.

After you do that, you can go to the [newsletter section of this repository](https://github.com/ZecHub/zechub/blob/main/newsletter/newsletterbasics.md) and submit a pull request to create a new edition of the newsletter. Please follow the format used in this [template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md).

After you do this @squirrel or (in Discord) will see that your new edition of the newsletter available, and they'll review and then merge it to the repository. After it's been merged, they'll take the content and post it via Substack.

#### Newsletter - translation

We currently have editions in Spanish, Portuguese and Russian. The translated versions are posted on their socials, and we do our best to amplify them via the ZecHub social.

If you want to translate the newsletter into your local language, let us know what channel you would share it from and the language you would publish the newsletter in, so we can coordinate its release.

#### Podcast - episode posted on ZecHub socials

Do you have an idea for a news show, podcast, Twitter talk, or other video/audio thing? Tell us in Discord #video-content and we will talk.

Rewards for this type of content are a bit larger, so a proposal would need to be submitted to ZecHub's DAO before approving the spend.

#### Creative social media posts

We want new engaging content for our social media. Short videos, GIFs, memes, and other creative posts are accepted when they match the [ZecHub style guide](https://zechub.wiki/contribute/style-guide). Reward size follows the [bounty amounts policy](https://bounties.zechub.wiki/docs/bounty-amounts).

You can also design thumbnails for our newsletter and podcast. If you have design talent, message us in #design on Discord.

#### Other ideas? Let us know!

Have another suggestion? Tell us in #general on Discord. We can discuss it and see if ZecHub's DAO will support it.

### To Finish

Please do not hesitate to get started contributing to one of the industry's most respected protocols. This is a great way to get involved with Zcash. If you have any questions about contributing, please let us know on [Discord](#join-the-conversation).

Thanks!
