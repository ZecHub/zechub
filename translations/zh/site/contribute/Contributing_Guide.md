<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 为 ZecHub 做贡献

ZecHub 帮助人们了解 Zcash。如果您正在阅读此页面，我们非常高兴您正考虑做出贡献！您所做的任何贡献都会反映在 [zechub.wiki](https://www.zechub.wiki/) 和其他 ZecHub 社交媒体上。

### 新贡献者

要了解 ZecHub 的概况，请阅读 [README](https://github.com/ZecHub/zechub/blob/main/README.md)。


### 开始

ZecHub 使用 GitHub 管理社区贡献。如果您刚接触 GitHub，不用担心！我们将说明您如何作为社区贡献者参与 ZecHub。对于获接受的贡献，我们会以屏蔽 [shielded] ZEC 支付小费。奖励金额并非固定为 ZEC —— 请参阅 [奖励如何设定](#how-rewards-are-set)。在本指南中，您将了解从创建 issue、创建拉取请求（PR）、审核到合并 PR 的贡献工作流程。


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="如何为 ZecHub 做贡献！"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### 加入讨论

首先，请通过我们的 [社区链接](https://zechub.wiki/zcash-community/community-links) 加入讨论。

### 风格指南

对 ZecHub 的任何贡献都应遵循 [ZecHub 风格指南](https://zechub.wiki/contribute/style-guide)。这包括 wiki、文档和社交媒体内容。

### 您可以贡献的方式

ZecHub 是一个由社区驱动的项目，旨在为 Zcash 用户和开发者 [developers] 提供支持与资源。参与 ZecHub 的方式有很多，包括为我们的每周新闻简报 [newsletter] 撰稿、为我们的知识库做贡献，或协助开发项目。

以下是 ZecHub 目前接受的贡献类型：

### 奖励如何设定

小费以屏蔽 ZEC 支付。过去出现在下方标题中的 ZEC 数字，是基于较早 ZEC/USD 汇率的历史快照。请勿将其视为当前汇率。

金额的确定方式：

1. 在 [赏金金额政策](https://bounties.zechub.wiki/docs/bounty-amounts) 中将工作与 USD 区间匹配。
2. 在该区间内选择一个目标金额 —— 并非自动取最高值。
3. 按公开的 ZEC/USD 现货价格换算，并在赏金中填写 ZEC：

```
zec_to_enter = usd_target / zec_usd_spot
```

四舍五入至 4 位小数。政策文件是唯一的事实来源。如果此页面与该文件不一致，以政策为准。

已支付的工作列于 [ZEC Bounties](https://bounties.zechub.wiki/)。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties 说明 | 通过贡献赚取 ZEC"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

以下 3 种状态并不相同：

1. **已合并** —— PR 已被接受并纳入仓库。
2. **奖励已批准** —— 赞助方或 DAO 同意应支付奖励，并确定其金额。
3. **已支付** —— ZEC 已到达您的屏蔽统一地址。

仅凭贡献被合并并不代表奖励已获批准。获批准的奖励并不代表支付已完成。

#### 开发工作

任何有助于构建 Zcash 生态系统的已批准开发工作。这可以包括我们的 wiki、新的钱包 [wallet]，或您能想到的任何应用程序。

#### Zcash 教程（视频）

以下是一个示例教程：


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL 安装 + zcashd 编译/交易教程"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

创建并分享关于 Zcash 应用的教程，即可获得奖励。请向 zechub/tutorials 提交 PR，或将视频发送到 Discord 的 #video-content 频道。如果视频符合我们的标准，我们将发布它并向您支付小费。

#### ZecHub Wiki - 发布新的 wiki 页面

我们的 wiki 网站以易于理解和消化的格式提供 Zcash 教育材料。Zcash 是一项拥有活跃社区的高度先进技术，因此我们仍有更多文档需要构建。我们的目标是构建以下方面的文档：

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

这些领域相当广泛，因此有很多内容可以着手。如果您想寻找一些灵感，请查看我们当前的 [wiki-docs 网站](https://zechub.wiki/)，看看还缺少什么。一旦您确定想写什么，就开始进行修改，并学习如何向 ZecHub 仓库提交 PR。我们的所有文档都在此仓库中创建和维护。撰写 wiki 页面时，请遵循 [ZecHub 风格指南](https://zechub.wiki/contribute/style-guide)，并以同一部分的现有页面作为结构参考。提交 PR 后，请在 discord 的 #zechub 部分向 @dismad、@squirrel 或 @vito 发送消息；他们将审核您的 PR，如果已准备好添加至网站便会合并。如果合并，他们会将文档添加到 ZecHub 网站。如果文档尚未准备好，他们会在 PR 中向您建议修改。

#### ZecHub Wiki - 已翻译的 wiki 页面

ZecHub 的目标是提供一个开源教育中心，Zcash 社区中的任何人都可以为其做出贡献。该中心最大的成功之一，是看到社区成员将 ZecHub 材料翻译成自己的本地语言。

Note：ZecHub 全局页面翻译速率限制为每周 10 页。

`translations/<locale>/site/` 下的精选语言页面会通过源哈希清单与其英文源文件进行追踪。有关过期检测、同步工作流程和受保护术语验证，请参阅 [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md)。

#### ZecHub Wiki - 编辑现有文档

有时我们文档中的信息并不完全准确。这没关系。这正是我们将它们开源的原因！如果您发现 wiki-doc 中有需要修改的内容，请前往文档页脚（其中链接到其 GitHub 页面），并通过 PR 提议修改。

#### ZecHub Wiki - 修复损坏链接

如果您发现链接失效，或有重要内容拼写错误，请前往文档页脚（其中链接到其 GitHub 页面），并通过 PR 提议修改。

#### 新闻简报 - 新一期

我们制作生态系统的每周新闻简报。这是一种参与门槛极低且非常简单的方式！新闻简报每周五或周六发布。如果您想撰写新闻简报，请在 Discord 的 #zecweekly 部分向 @squirrel 发送消息告知他们。

完成后，您可以前往 [本仓库的新闻简报部分](/newsletter/newsletterbasics.md)，并提交拉取请求以创建新一期新闻简报。请遵循此 [模板](/newsletter/newslettertemplate.md) 中使用的格式。

完成后，@squirrel 或（在 Discord 中）会看到您的新版新闻简报可用，并将审核后将其合并到仓库。合并后，他们会获取内容并通过 Substack 发布。

#### 新闻简报 - 翻译

我们目前有西班牙语、葡萄牙语和俄语版本。翻译版本会发布在各自的社交媒体上，我们也会尽力通过 ZecHub 社交媒体扩大其影响力。

如果您想将新闻简报翻译成您的本地语言，请告知我们您会通过哪个频道分享，以及您将以哪种语言发布新闻简报，以便我们协调其发布。

#### Podcast - 发布在 ZecHub 社交媒体上的节目

您是否有关于新闻节目、podcast、Twitter 演讲或其他视频/音频内容的想法？请在 Discord 的 #video-content 告诉我们，我们会讨论。

此类内容的奖励略高，因此在批准支出前，需要向 ZecHub 的 DAO 提交提案。

#### 创意社交媒体帖子

我们希望为社交媒体创作新的吸引人内容。当短视频、GIF、meme 和其他创意帖子符合 [ZecHub 风格指南](https://zechub.wiki/contribute/style-guide) 时，我们都会接受。奖励金额遵循 [赏金金额政策](https://bounties.zechub.wiki/docs/bounty-amounts)。

您还可以为我们的新闻简报和 podcast 设计缩略图。如果您具有设计才能，请在 Discord 的 #design 向我们发送消息。

#### 有其他想法？请告诉我们！

有其他建议吗？请在 Discord 的 #general 告诉我们。我们可以讨论，并看看 ZecHub 的 DAO 是否会支持它。

### 完成

请不要犹豫，开始为业内最受尊敬的协议之一做出贡献。这是参与 Zcash 的绝佳方式。如果您对贡献有任何疑问，请在 [Discord](#join-the-conversation) 告诉我们。

谢谢！
