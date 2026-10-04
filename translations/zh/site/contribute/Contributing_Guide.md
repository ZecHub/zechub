<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 为 ZecHub 做贡献

ZecHub 帮助人们了解 Zcash。如果你正在阅读此页面，我们非常高兴你正在考虑做出贡献！你所做的任何贡献都会反映在 [zechub.wiki](https://www.zechub.wiki/) 和其他 ZecHub 社交媒体上。

### 新贡献者

如需了解 ZecHub 的概况，请阅读 [README](https://github.com/ZecHub/zechub/blob/main/README.md)。


### 开始参与

ZecHub 使用 GitHub 管理社区贡献。如果你刚接触 GitHub，不用担心！我们将分解说明如何以社区贡献者的身份参与 ZecHub。对于被接受的贡献，我们会以受屏蔽的 ZEC 支付小费。奖励金额并非以 ZEC 固定计价——请参阅 [奖励如何设定](#how-rewards-are-set)。在本指南中，你将了解贡献工作流程，包括创建 issue、创建拉取请求（PR）、审查和合并 PR。


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

### 你可以贡献的方式

ZecHub 是一个由社区推动的项目，旨在为 Zcash 用户和开发者提供支持与资源。参与 ZecHub 的方式很多，包括为我们的每周新闻通讯撰稿、为知识库做贡献，或协助开发项目。

以下是 ZecHub 目前接受的贡献类型：

### 奖励如何设定

小费以受屏蔽的 ZEC 支付。过去出现在下方标题中的 ZEC 数字，是基于较早 ZEC/USD 汇率的历史快照。请勿将其视为当前汇率。

金额的确定方式：

1. 在 [赏金金额政策](https://bounties.zechub.wiki/docs/bounty-amounts) 中，将工作与相应的 USD 区间匹配。
2. 在该区间内选定目标金额——并非自动取最高值。
3. 按公开的 ZEC/USD 现货价格换算，并在赏金中填写 ZEC：

```
zec_to_enter = usd_target / zec_usd_spot
```

四舍五入至小数点后 4 位。政策文件是唯一的权威来源。如果本页面与该文件不一致，以政策为准。

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

以下三种状态并不相同：

1. **已合并** —— PR 已被接受并纳入仓库。
2. **奖励已批准** —— 赞助者或 DAO 同意应支付奖励，并确定其金额。
3. **已支付** —— ZEC 已到达你的受屏蔽 Unified Address。

贡献被合并本身并不代表奖励已获批准。已批准的奖励也不代表付款已完成。

#### 开发工作

任何获批准、能够帮助构建 Zcash 生态系统的开发工作。这可以包括我们的 wiki、新钱包，或你能想到的任何应用程序。

#### Zcash 教程（视频）

以下是一个教程示例：


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL 安装 + Zcashd 编译/交易教程"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

创建并分享关于 Zcash 应用的教程，即可获得奖励。请向 zechub/tutorials 提交 PR，或将视频发送至 Discord 的 #video-content 频道。如果视频符合我们的标准，我们会发布它并向你支付小费。

#### ZecHub Wiki - 发布新的 wiki 页面

我们的 wiki 网站以易于理解和消化的格式提供 Zcash 教育材料。Zcash 是一项非常先进的技术，并拥有活跃的社区，因此我们仍有更多文档需要构建。我们的目标是围绕以下内容编写文档：

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

这些领域相当广泛，因此有很多内容可以着手。如果你想获得一些灵感，请查看我们当前的 [wiki-docs 网站](https://zechub.wiki/)，看看还缺少什么。一旦确定了要写的内容，就开始进行修改，并学习如何向 ZecHub 仓库提交 PR。我们的所有文档都在此仓库中创建和维护。编写 wiki 页面时，请遵循 [ZecHub 风格指南](https://zechub.wiki/contribute/style-guide)，并以同一章节中的现有页面作为结构参考。提交 PR 后，请在 discord 的 #zechub 分区中联系 @dismad、@squirrel 或 @vito；他们会审查你的 PR，并在其准备好添加到网站时将其合并。如果被合并，他们会将文档添加到 ZecHub 网站。如果文档尚未准备好，他们会在 PR 中向你建议修改内容。

#### ZecHub Wiki - 已翻译的 wiki 页面

ZecHub 的目标是提供一个开源教育中心，让 Zcash 社区中的任何人都可以参与贡献。该中心最大的成功之一，就是看到社区成员将 ZecHub 材料翻译为本地语言。

注意：ZecHub 全球页面翻译速率限制为每周 10 页。

`translations/<locale>/site/` 下经过策划的语言页面，会通过源哈希清单与其英文源文件进行追踪。有关过时检测、同步工作流程和受保护术语验证，请参阅 [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md)。

#### ZecHub Wiki - 编辑现有文档

有时我们文档中的信息并不完全准确。这没关系。这正是我们将它们开源的原因！如果你发现 wiki 文档中有需要修改的内容，请前往文档页脚（其中链接至其 GitHub 页面），并通过 PR 提出修改建议。

#### ZecHub Wiki - 修复失效链接

如果你发现链接失效，或某个重要内容拼写错误，请前往文档页脚（其中链接至其 GitHub 页面），并通过 PR 提出修改建议。

#### 新闻通讯 - 新一期

我们制作生态系统的每周新闻通讯。这是一种参与门槛极低且非常简单的方式！新闻通讯会在每周五或周六发布。如果你想撰写新闻通讯，请在 Discord 的 #zecweekly 分区联系 @squirrel 告知他们。

完成后，你可以前往本仓库的 [新闻通讯分区](https://github.com/ZecHub/zechub/blob/main/newsletter/newsletterbasics.md)，并提交拉取请求以创建新一期新闻通讯。请遵循此 [模板](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) 中使用的格式。

完成后，@squirrel 或（在 Discord 中）会看到你的新闻通讯新一期已可用，并会审查后将其合并到仓库。合并后，他们会提取内容并通过 Substack 发布。

#### 新闻通讯 - 翻译

目前我们已有西班牙语、葡萄牙语和俄语版本。翻译版本会发布在各自的社交媒体上，我们也会尽力通过 ZecHub 社交媒体扩大其传播。

如果你想将新闻通讯翻译成当地语言，请告诉我们你将通过哪个频道分享，以及新闻通讯将以何种语言发布，以便我们协调其发布。

#### 播客 - 在 ZecHub 社交媒体上发布的节目

你是否有关于新闻节目、播客、Twitter 演讲或其他视频/音频内容的想法？请在 Discord 的 #video-content 告诉我们，我们会一起讨论。

此类内容的奖励稍高，因此在批准支出前，需要向 ZecHub 的 DAO 提交提案。

#### 创意社交媒体帖子

我们希望为社交媒体制作新颖且引人入胜的内容。短视频、GIF、表情包和其他创意帖子，只要符合 [ZecHub 风格指南](https://zechub.wiki/contribute/style-guide)，都会被接受。奖励金额遵循 [赏金金额政策](https://bounties.zechub.wiki/docs/bounty-amounts)。

你也可以为我们的新闻通讯和播客设计缩略图。如果你有设计才能，请在 Discord 的 #design 联系我们。

#### 有其他想法？告诉我们！

还有其他建议吗？请在 Discord 的 #general 告诉我们。我们可以讨论，并了解 ZecHub 的 DAO 是否会支持它。

### 完成

请不要犹豫，开始为业内最受尊敬的协议之一做出贡献。这是参与 Zcash 的绝佳方式。如果你对贡献有任何疑问，请通过 [Discord](#join-the-conversation) 告诉我们。

谢谢！
