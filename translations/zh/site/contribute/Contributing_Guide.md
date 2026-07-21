<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 为 ZecHub 做贡献

ZecHub 帮助人们了解 Zcash。如果你正在阅读此页面，我们非常高兴你考虑参与贡献！你所做的任何贡献都会展示在 [zechub.wiki](https://www.zechub.wiki/) 和其他 ZecHub 社交媒体上。

### 新贡献者

如需了解 ZecHub 的概况，请阅读 [README](https://github.com/ZecHub/zechub/blob/main/README.md)。


### 开始入门

ZecHub 使用 GitHub 来管理社区贡献。如果你是 GitHub 新手，也不用担心！我们会分步说明如何作为 ZecHub 的社区贡献者参与其中。对于被接受的贡献，我们会以 ZEC 支付小费。在本指南中，你将了解完整的贡献工作流程，包括创建 issue、提交 pull request（PR）、审查以及合并 PR。


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

首先，请通过我们的[社区链接](https://zechub.wiki/zcash-community/community-links)加入讨论。

### 风格指南

对 ZecHub 的任何贡献都应遵循 [ZecHub 风格指南](https://github.com/ZecHub/zechub/blob/main/styles/guide.md)。这包括 wiki、文档和社交媒体内容。

### 你可以贡献的方式

ZecHub 是一个社区驱动的项目，旨在为 Zcash 用户和开发者提供支持与资源。参与 ZecHub 的方式有很多，包括为我们的每周新闻通讯撰写内容、为知识库做贡献，或协助开发项目。

以下是 ZecHub 当前接受的贡献类型：

#### 开发工作 - 每个获批 PR 0.12 至 0.5 ZEC

任何有助于建设 Zcash 生态系统的获批开发工作都可以。这包括我们的 wiki、新钱包，或你能想到的任何应用。

#### Zcash 教程（视频）- 每个教程最高 0.15 ZEC

下面是一个教程示例：


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

创建并分享有关 Zcash 应用的教程，即可获得奖励。向 zechub/tutorials 提交 PR，或将视频发送到 Discord 的 #video-content 频道。如果视频符合我们的标准，我们会发布并向你支付小费。

#### ZecHub Wiki - 每发布一个新 wiki 页面，最高 0.08 ZEC

我们的 wiki 网站以简明易懂的形式提供 Zcash 教育资料。Zcash 是一项非常先进的技术，并且拥有活跃的社区，因此我们仍有许多文档需要建设。我们的目标是围绕以下内容构建文档：

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

这些都是相当宽泛的领域，因此有很多内容可以着手。如果你想找些灵感，可以查看我们当前的 [wiki-docs 站点](https://zechub.wiki/)，看看还缺少什么内容。一旦你确定了想写的主题，就可以开始修改，并学习如何向 ZecHub 仓库提交 PR。我们的所有文档都在这个仓库中创建和维护。撰写 wiki 页面时，请使用[文档模板](https://github.com/ZecHub/zechub/blob/main/template.md)，并遵循 [ZecHub 风格](https://zechub.wiki/contribute/style-guide)。提交 PR 后，请在 discord 的 #zechub 分区联系 @dismad、@squirrel 或 @vito，他们会审查你的 PR，并在准备好后进行合并。如果合并成功，他们会将该文档添加到 ZecHub 网站。如果文档尚未准备好，他们会在 PR 中为你提出修改建议。

#### ZecHub Wiki - 每次对文档的已接受编辑可获 0.015 ZEC

有时我们的文档信息并不完全准确。这没关系。这正是我们将其开源的原因！如果你发现某篇 wiki 文档需要修改，请前往该文档页脚（其中链接到了它的 GitHub 页面），并通过 PR 提交修改建议。

#### ZecHub Wiki - 每修复一个失效链接可获 0.005 ZEC

如果你发现某个链接失效，或某些重要内容有拼写错误，请前往该文档页脚（其中链接到了它的 GitHub 页面），并通过 PR 提交修改建议。

#### 新闻通讯 - 每期 0.05 ZEC

我们会制作生态系统每周新闻通讯。这是一个投入非常低、非常容易参与的方式！新闻通讯会在每周五或周六发布。如果你想撰写一期新闻通讯，请在 Discord 的 #zecweekly 分区联系 @squirrel 告知他们。

完成后，你可以前往[本仓库的新闻通讯部分](/newsletter/newsletterbasics.md)，提交一个 pull request 来创建新一期新闻通讯。请遵循这个[模板](/newsletter/newslettertemplate.md)中使用的格式。

完成后，@squirrel 或（在 Discord 中）会看到你新增的这期新闻通讯，然后会进行审查并将其合并到仓库中。合并之后，他们会提取内容并通过 Substack 发布。


#### 播客 - 每发布一集到 ZecHub 社交媒体可获 .25 ZEC

你是否有关于新闻节目、播客、Twitter 讨论，或其他视频/音频内容的想法？请在 Discord 的 #video-content 告诉我们，我们会一起讨论。

这类内容的奖励会更高一些，因此在批准支出前，需要先向 ZecHub 的 DAO 提交提案。


#### 其他想法？告诉我们！

还有别的建议吗？请在 Discord 的 #general 告诉我们。我们可以一起讨论，看看 ZecHub 的 DAO 是否会支持。

### 结束语

请不要犹豫，立即开始为业内最受尊敬的协议之一做贡献。这是参与 Zcash 的绝佳方式。如果你对如何贡献有任何问题，请通过 [Discord](#join-the-conversation) 告诉我们。

谢谢！
