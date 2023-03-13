# Contributing to ZecHub

> ZecHub helps people learn about Zcash

If you're reading this page, we're really excited that you're considering contributing! Any contribution you make will be reflected on [zechub.xyz](https://www.zechub.xyz/) and other ZecHub social media :sparkles:

<!-- TODO: We need to have a CoC -->
<!-- Read our [Code of Conduct](/CODE_OF_CONDUCT.md) to keep our community approachable and respectable. -->

## New contributors

To get an overview of ZecHub, read the [README](/README.md).

## Getting started

ZecHub uses GitHub to manage community contribution. If you're new to GitHub, don't worry! We're going to break down how you can get involved as a community contributor to ZecHub. We pay out tips in ZEC for accepted contribution.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a pull request (PR), reviewing, and merging the PR.

Use the table of contents icon ![table of contents icon dark theme](/assets/icons/contents-dark.png) ![table of contents icon light theme](/assets/icons/contents-light.png) on the top left corner of this document to get to a specific section of this guide quickly.

## Join the conversation

First, join the conversation in the [Zcash Global discord](https://discord.gg/zcash). There's a ZecHub section where we chat about all things ZecHub :smile:

<small> Don’t forget to add the ZecHub role in <a href="https://discord.com/channels/978714252934258779/983468150861484093">#lang-menu channel</a>! </small>

## Style guides

Any contribution to ZecHub should follow the [ZecHub style guides](/styles/guide.md). This includes wikis, docs and social media contents.

## Ways you can contribute

ZecHub is a community-driven project that aims to provide support and resources for Zcash users and developers. There are many ways to get involved with ZecHub, including writing for our weekly newsletter, contributing to our knowledge base, or helping out with development projects.

These are the types of contribution that ZecHub currently accepts:

### Zcash tutorials (video) - up to 1.5 ZEC per tutorial

Create and share tutorials on Zcash apps and get rewarded. Example tutorial [here](https://www.youtube.com/watch?v=Mgm_nK3gr7U&list=PL6_epn0lASLGc_YALzxbMH0-dNyhFufus&index=7). Submit PR to zechub/tutorials or send video to #video-content channel in Discord. If video meets our criteria, we’ll post it and tip you :smile:

### ZecHub Wiki - up to 1 ZEC per new page published

Our wiki-docs page provides Zcash education materials in an easy and digestible format. Zcash is a very advanced technology with a vibrant community, so there's still more documentation we need to build. Our goal is to build documentation on:

- Zcash and its related technologies
- ZEC (Zcash currency) use cases
- New user guides
- Zcash community and ecosystem
- Docs in other languages

These are pretty broad areas, so there's a lot to work from. If you want some inspiration, check out our current [wiki-docs site](https://zechub.notion.site/zechub/ZecHub-Wiki-d74acc14d9c04887be52486db86da0ba) and see what's missing. Once you determine what you want to write, [start to make your changes](#make-changes) and learn how to submit a PR to the ZecHub repo. All of our docs are created and maintained in this repo. Use the [docs template](https://github.com/ZecHub/zechub/blob/main/template.md) and follow the [ZecHub style](#style-guides) when writing a wiki page.

After you submit a PR, please message @dismad or @tokidoki in the #zecwiki section of the discord, and he will review your PR and merge if it is ready to be added to the site. If merged, he will add the doc to the ZecHub website. If the doc is not ready, he will suggest edits for you in the PR.

### ZecHub Wiki - 0.1 ZEC per accepted edit to docs

Sometimes our information in the docs isn't spot on. That's okay. That's why we open-source them! If you find something that needs a change in a wiki-doc, please go to the footer of the doc (which links to its Github page) and suggest a change via a PR.

### ZecHub Wiki - 0.05 ZEC per broken link fixed

If you find that a link is broken, or something important is mispelled, please go to the footer of the doc (which links to its Github page) and suggest the change via a PR.

### Newsletter - 0.5 ZEC per edition

We produce the ecosystem's weekly newsletter. This is a super low lift / easy way to get involved! The newsletter goes out every Friday or Saturday. If you want to write a newsletter, message @squirrel or @tokidoki in the #zecweekly section of the Discord to let them know.

After you do that, you can go to the [newsletter section of this repository](/newsletter/newsletterbasics.md) and submit a pull request to create a new edition of the newsletter. Please follow the format used in this [template](/newsletter/newslettertemplate.md).

After you do this @squirrel or @tokidoki (in Discord) will see that your new edition of the newsletter available, and they'll review and then merge it to the repository. After it's been merged, they'll take the content and post it via Substack.

### Translating Newsletter - 0.2 ZEC per translation

We'd love for you to contribute the next edition of the ZecWeekly newsletter, or translate the content into other languages! We currently have editions in Spanish, Portuguese and Russian. The translated versions are posted on their socials, and we do our best to amplify them via the ZecHub social.

If you want to translate the newsletter into your local language, we send tips for that too. Let us know what channel you would share it from and the language you would publish the newsletter in, so we can coordinate its release.

### Podcast - 2.5 ZEC per episode posted on ZecHub socials

ZecHub made videos before, like a [news show](https://www.youtube.com/watch?v=frTzwCWRNLs&t=434s). They stopped for now, but you can help. Do you have an idea for a news show, podcast, Twitter talk, or other video/audio thing? Tell us in Discord #video-content and we’ll talk :smile:

Rewards for this type of content are a bit larger, so a proposal would need to be submitted to ZecHub's DAO before approving the spend. That process usually takes a week.

### Creative social media posts

We want new engaging content for our social media. You can get up to .75 ZEC for short videos, GIFs, memes or other creative posts. Follow the [ZecHub style](#style-guides) when creating a social media post.

You can also design thumbnails for our newsletter and podcast. If you have design talent, message us in #design on Discord.

### Other ideas? Let us know!

Have another suggestion? Tell us in #general on Discord. We can discuss it and see if ZecHub's DAO will support it.

## Issues

### Create a new issue

If you spot a problem with ZecHub contents, [search if an issue already exists](https://github.com/ZecHub/zechub/issues). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/zechub/zechub/issues/new/choose).

### Solve an issue

Scan through our [existing issues](https://github.com/zechub/zechub/issues) to find one that interests you. You can narrow down the search using `labels` as filters. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

## Make Changes

1. Fork the repository.

- Using GitHub Desktop:

  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line:
  - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to self-review to speed up the review process :zap:

## Pull Request

When you're finished with the changes, [create a pull request](https://github.com/ZecHub/zechub/pulls), also known as a PR. Include your unified address (UA) in the PR so we can send you a tip!

### To Finish

Please don't hesistate on getting started. If you want to contribute to one of the industry's most respected protocols, this is a great way to get involved. If you have any questions on contributing to ZecHub, please let us know in [Discord](#join-the-conversation).

Thanks!