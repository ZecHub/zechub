<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly 新闻简报 [Newsletter]

ZecWeekly 是一份每周日早晨发布的新闻简报。它涵盖当周 Zcash 生态系统中发生的所有新闻。新闻由社区成员每周精选，所有相关链接都会加入新闻简报。请在 [这里](https://zechub.substack.com/)订阅新闻简报。

## 贡献

当一位贡献者为正确的周次准备该期内容、关注当前的悬赏或协调讨论串，并在每周链接准备好后提交拉取请求时，新闻简报贡献的效果最佳。请勿在 ZecHub 发布或确认该期日期之前提交未来期数。过早的拉取请求往往会遗漏周末更新、与已指定的编辑者冲突，或使用错误的截止日期。

### 1. 确认当前期数

在开始撰写前：

- 查看 [ZEC Bounties](https://bounties.zechub.wiki/)，了解当前的新闻简报任务。
- 等待分配。
- 新闻简报期数属于 [悬赏金额政策](https://bounties.zechub.wiki/docs/bounty-amounts)中的 XS 档。实时悬赏中的 ZEC 数值即为金额，而非贡献指南中任何较早的标题。

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fork 仓库

如果你是 GitHub 新手，请使用以下工作流程：

1. 打开 [ZecHub 仓库](https://github.com/ZecHub/zechub)。
2. 点击 **Fork**，并在你的 GitHub 账户下创建一个 Fork。
3. 在你的 Fork 中，为该期创建一个新分支。清晰的分支名称会很有帮助，例如 `digest-may-30-2026`。
4. 确保你的拉取请求将 `ZecHub/zechub` 作为基础仓库，并将 `main` 作为基础分支。

如果你使用命令行，相同的工作流程如下：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

请将 `YOUR-USERNAME` 替换为你自己的 GitHub 用户名。上方 URL 是占位符，按原样无法解析。

### 3. 创建新闻简报文件

请以 [新闻简报模板](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)为起点。新闻简报期数应放在 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 文件夹中。

创建文件时：

- 使用 issue 要求的文件名格式，或近期已接受期数所使用的格式。
- 除非任务要求不同格式，否则保持与模板相同的章节顺序。
- 仅添加相关周次的链接。
- 为每个链接写一段简短清晰的描述，让读者理解其重要性。
- 必要时将非英语来源翻译或概述为英语。
- 在发起拉取请求前检查每个链接。

### 4. 在适当的时间收集链接

ZecWeekly 通常涵盖当前周的 Zcash 生态系统活动，并在接近周末时发布。最稳妥的时间安排是：

- 在当前新闻简报 issue 或任务发布后开始收集链接。
- 在该周仍处于进行期间保留草稿。
- 在检查周末更新后，于要求的提交日期附近提交拉取请求。
- 在该日期的任务存在之前，或 ZecHub 确认你应准备该期之前，请勿提交未来周次的新闻简报。

如果某个 issue 要求在特定日期前提交，请遵循该日期。如果本页与当前 issue 存在冲突，请遵循当前 issue。

### 5. 发起拉取请求

当你的新闻简报文件准备好后：

1. 将更改提交到你的 Fork。
2. 在 `main` 分支上向 `ZecHub/zechub` 发起拉取请求。
3. 使用与该期相匹配的标题，例如 `Zcash Ecosystem Digest | May 30th`。
4. 在拉取请求正文中链接该 issue，以便审阅者将工作与任务关联起来。

拉取请求正文示例：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

拉取请求发起后，请留意审阅评论。如果 ZecHub 要求修改，请更新同一分支，而不要为同一期另开第二个拉取请求。

### 真实示例

请将以下已合并的新闻简报拉取请求作为已接受提交的示例：

- [Zcash 生态系统摘要 | 4月11日](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 生态系统摘要 | 3月28日](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 生态系统摘要 | 2月14日](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

将你的工作与示例比较时，请重点关注文件位置、标题格式、章节顺序、链接描述，以及拉取请求是否关联到正确的任务。

### 应避免的常见错误

- 在期数日期或任务得到确认前发起拉取请求。
- 处理已经关联拉取请求的 issue。
- 将拉取请求提交到自己的 Fork，而不是 `ZecHub/zechub`。
- 使用错误的文件名，或将文件放在 `newsletter` 文件夹之外。
- 复制旧期数却未更新每个日期、链接和描述。
- 添加错误周次的链接。
- 留下失效链接、重复链接或模板中的占位文本。
- 收到审阅评论后发起新的拉取请求，而非更新原始分支。

### 最终检查清单

在请求审阅前，请确认：

- issue 或任务日期与你的新闻简报文件一致。
- 没有其他未关闭的拉取请求已经涵盖同一 issue 或期数。
- 文件位于 `newsletter` 文件夹中。
- 模板章节完整。
- 每个链接均有效且附有有用的描述。
- 拉取请求正文链接到正确的 issue。
- 如果审阅者要求修改，你可以进行编辑。

## 往期期数

[ZecWeekly 存档](https://zechub.substack.com/p/archive)
