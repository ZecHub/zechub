<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly 新闻简报

ZecWeekly 是一份每周日早晨发布的新闻简报，涵盖当周 Zcash 生态系统中的所有新闻。新闻内容由社区成员每周精选，并将所有相关链接添加至简报中。请在[此处](https://zechub.substack.com/)订阅新闻简报。

## 参与贡献

当一位贡献者为正确的周次准备简报、遵循当前的赏金或协调讨论串，并在每周链接准备完成后提交拉取请求时，简报贡献的效果最佳。请勿在 ZecHub 发布或确认该期简报日期之前提交未来期数。过早提交的拉取请求往往会遗漏周后期更新、与已分配的策展人产生冲突，或使用错误的截止日期。

### 1. 确认当前期数

开始撰写前：

- 查看 [ZEC Bounties ](https://bounties.zechub.wiki/)了解当前新闻简报任务。
- 等待分配

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fork 仓库

如果你刚开始使用 GitHub，请采用以下流程：

1. 打开 [ZecHub 仓库](https://github.com/ZecHub/zechub)。
2. 点击 **Fork**，并在你的 GitHub 账户下创建一个 fork。
3. 在你的 fork 中，为该期简报创建一个新分支。清晰的分支名称会很有帮助，例如 `digest-may-30-2026`。
4. 确保你的拉取请求以 `ZecHub/zechub` 为基础仓库，并以 `main` 为基础分支。

如果你使用命令行，相同的流程如下：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

将 `YOUR-USERNAME` 替换为你自己的 GitHub 用户名。以上 URL 是占位符，按原样使用将无法解析。

### 3. 创建新闻简报文件

以[新闻简报模板](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)为起点。新闻简报各期文件应放在 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 文件夹中。

创建文件时：

- 遵循 issue 所要求的文件名格式，或使用近期已接受期数的格式。
- 除非任务要求不同格式，否则保持与模板相同的章节顺序。
- 仅添加相关周次的链接。
- 为每个链接撰写简短、清晰的说明，让读者理解其重要性。
- 必要时，将非英语来源翻译或用英语概述。
- 在打开拉取请求前检查每个链接。

### 4. 在合适的时间收集链接

ZecWeekly 通常涵盖当周的 Zcash 生态系统活动，并在接近周末时发布。最稳妥的时间安排是：

- 在当前新闻简报 issue 或任务发布后开始收集链接。
- 在该周仍在进行期间持续维护草稿。
- 在接近要求的提交日期时提交拉取请求，并确认已检查周后期更新。
- 在该日期对应的任务存在之前，或在 ZecHub 确认应由你准备之前，请勿提交未来周次的新闻简报。

如果某个 issue 说明须在特定日期前提交，请遵循该日期。如果本页面与当前 issue 存在冲突，请以当前 issue 为准。

### 5. 打开拉取请求

新闻简报文件准备完成后：

1. 将更改提交到你的 fork。
2. 向 `ZecHub/zechub` 的 `main` 分支打开拉取请求。
3. 使用与期数匹配的标题，例如 `Zcash Ecosystem Digest | May 30th`。
4. 在拉取请求正文中链接该 issue，以便审核者将工作与任务关联起来。

拉取请求正文示例：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

拉取请求打开后，请留意审核评论。如果 ZecHub 要求修改，请更新同一分支，而非为同一期另开一个拉取请求。

### 真实示例

请使用以下已合并的新闻简报拉取请求，作为已接受提交的示例：

- [Zcash 生态系统摘要 | 4 月 11 日](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 生态系统摘要 | 3 月 28 日](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 生态系统摘要 | 2 月 14 日](https://github.com/ZecHub/zechub/pull/1474)


![已合并的 ZecWeekly 新闻简报拉取请求示例](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

将你的工作与示例比较时，请重点关注文件位置、标题格式、章节顺序、链接说明，以及拉取请求是否关联回正确的任务。

### 应避免的常见错误

- 在期数日期或任务确认前打开拉取请求。
- 处理已有关联拉取请求的 issue。
- 将拉取请求提交到自己的 fork，而不是 `ZecHub/zechub`。
- 使用错误的文件名，或将文件放在 `newsletter` 文件夹之外。
- 复制旧期数却未更新所有日期、链接和说明。
- 添加了错误周次的链接。
- 留下失效链接、重复链接或模板中的占位文本。
- 收到审核评论后另开新的拉取请求，而不是更新原始分支。

### 最终检查清单

请求审核前，请确认：

- issue 或任务日期与你的新闻简报文件相符。
- 没有其他开放的拉取请求已覆盖同一 issue 或期数。
- 文件位于 `newsletter` 文件夹中。
- 模板章节完整。
- 每个链接均可访问且具有有用的说明。
- 拉取请求正文链接了正确的 issue。
- 如果审核者要求修改，你可以进行编辑。

## 往期期数

[ZecWeekly 存档](https://zechub.substack.com/p/archive)
