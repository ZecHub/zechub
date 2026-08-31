<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Newsletter

ZecWeekly 是一份每周日上午发布的简报。它包含 Zcash 生态系统中这一周发生的所有新闻。新闻每周由社区成员筛选整理，所有相关链接都会添加到简报中。请在[这里](https://zechub.substack.com/)订阅该简报。

## 贡献

当由一位贡献者为正确的周次准备该期内容、遵循当前的 bounty 或协调线程，并在每周链接准备就绪后提交 pull request 时，简报贡献的效果最佳。请不要在 ZecHub 发布或确认该期日期之前提交未来期数。过早提交的 pull request 往往会遗漏周后期的更新、与已分配的整理者发生冲突，或使用错误的截止日期。

### 1. 确认当前期数

在你开始写作之前：

- 查看当前简报任务的 [ZEC Bounties ](https://bounties.zechub.wiki/)。
- 等待被分配

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fork 仓库

如果你是 GitHub 新手，请使用以下工作流程：

1. 打开 [ZecHub 仓库](https://github.com/ZecHub/zechub)。
2. 点击 **Fork**，并在你的 GitHub 账户下创建一个 fork。
3. 在你的 fork 中，为该期内容创建一个新分支。清晰的分支名称会很有帮助，例如 `digest-may-30-2026`。
4. 确保你的 pull request 以 `ZecHub/zechub` 作为基础仓库，并以 `main` 作为基础分支。

如果你使用命令行，相同的工作流程如下所示：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

将 `YOUR-USERNAME` 替换为你自己的 GitHub 用户名。上面的 URL 只是一个占位符，按原样使用将无法解析。

### 3. 创建简报文件

使用[简报模板](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)作为起点。每期简报应放在 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 文件夹中。

创建文件时：

- 文件名要与 issue 请求的格式一致，或与最近已接受的期数所使用的格式一致。
- 除非任务要求不同格式，否则保持与模板相同的章节顺序。
- 仅添加相关那一周的链接。
- 为每个链接撰写简短清晰的说明，让读者明白其重要性。
- 如有需要，将非英文来源翻译或概述为英文。
- 在打开 pull request 之前检查每一个链接。

### 4. 在正确的时间收集链接

ZecWeekly 通常涵盖当周的 Zcash 生态系统活动，并在接近周末时发布。最稳妥的时间安排是：

- 在当前简报 issue 或任务发布后开始收集链接。
- 在该周仍处于进行中时持续保存草稿。
- 在接近要求的提交日期时提交 pull request，并在此之前检查周后期更新。
- 不要在该日期对应的任务出现之前，或在 ZecHub 确认应由你准备之前，提交未来一周的简报。

如果某个 issue 要求在特定日期前提交，请遵循该日期。如果本页面与当前 issue 之间存在冲突，请遵循当前 issue。

### 5. 打开 pull request

当你的简报文件准备好后：

1. 将你的更改提交到你的 fork。
2. 向 `ZecHub/zechub` 的 `main` 分支打开一个 pull request。
3. 使用与该期匹配的标题，例如 `Zcash Ecosystem Digest | May 30th`。
4. 在 pull request 正文中链接对应的 issue，以便审阅者将这项工作与任务对应起来。

pull request 正文示例：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

打开 pull request 后，请留意审阅意见。如果 ZecHub 要求修改，请更新同一个分支，而不是为同一期再开第二个 pull request。

### 实际示例

请使用以下这些已合并的简报 pull request 作为已接受投稿的示例：

- [Zcash 生态系统摘要 | 4 月 11 日](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 生态系统摘要 | 3 月 28 日](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 生态系统摘要 | 2 月 14 日](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

将你的工作与示例进行比较时，请重点关注文件位置、标题格式、章节顺序、链接说明，以及该 pull request 是否正确关联回相应任务。

### 需要避免的常见错误

- 在期数日期或任务尚未确认前就打开 pull request。
- 处理一个已经有已关联 pull request 的 issue。
- 将 pull request 提交到你自己的 fork，而不是 `ZecHub/zechub`。
- 使用错误的文件名，或将文件放在 `newsletter` 文件夹之外。
- 复制旧一期内容却没有更新所有日期、链接和说明。
- 添加了错误周次的链接。
- 保留失效链接、重复链接，或模板中的占位文本。
- 在收到审阅意见后重新打开新的 pull request，而不是更新原始分支。

### 最终检查清单

在请求审阅之前，请确认：

- issue 或任务日期与你的简报文件一致。
- 没有其他未关闭的 pull request 已经覆盖同一个 issue 或期数。
- 文件位于 `newsletter` 文件夹中。
- 模板中的各个部分都已完整填写。
- 每个链接都可用并附有有价值的说明。
- pull request 正文链接了正确的 issue。
- 如果审阅者要求修改，你可以进行相应编辑。

## 往期内容

[ZecWeekly 存档](https://zechub.substack.com/p/archive)
