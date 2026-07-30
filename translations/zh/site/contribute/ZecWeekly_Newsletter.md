<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# ZecWeekly Newsletter

ZecWeekly 是一份每周日上午发布的新闻简报。它涵盖了本周 Zcash 生态系统中发生的所有新闻。新闻内容由社区成员每周整理，并将所有相关链接添加到简报中。请在[这里](https://zechub.substack.com/)订阅该简报。

## 贡献

当由一位贡献者为对应周次准备当期内容、遵循当前的 bounty 或协作线程，并在每周链接准备就绪后提交 pull request 时，Newsletter 贡献的效果最好。请不要在 ZecHub 发布或确认该期日期之前提交未来期数。过早提交的 pull request 往往会遗漏周后期更新、与已分配的整理者发生冲突，或使用错误的截止日期。

### 1. 确认当前期数

在开始写作之前：

- 查看[ZEC Bounties ](https://bounties.zechub.wiki/)中的当前 newsletter 任务。
- 等待被分配

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. Fork 仓库

如果你是 GitHub 新手，请使用以下工作流程：

1. 打开 [ZecHub 仓库](https://github.com/ZecHub/zechub)。
2. 点击**Fork**，并在你的 GitHub 账户下创建一个 fork。
3. 在你的 fork 中，为该期内容创建一个新分支。清晰的分支名称会很有帮助，例如 `digest-may-30-2026`。
4. 确保你的 pull request 以 `ZecHub/zechub` 作为基础仓库，并以 `main` 作为基础分支。

如果你使用命令行，相同的工作流程如下所示：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. 创建 newsletter 文件

请使用[newsletter 模板](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)作为起点。每期 newsletter 应放在 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 文件夹中。

创建文件时：

- 使用 issue 要求的文件名格式，或参考最近已接受期数所使用的格式。
- 除非任务要求使用不同格式，否则请保持与模板相同的章节顺序。
- 只添加相关那一周的链接。
- 为每个链接撰写简短清晰的说明，让读者明白其重要性。
- 如有需要，将非英文来源翻译或概述为英文。
- 在打开 pull request 之前检查每一个链接。

### 4. 在合适的时间收集链接

ZecWeekly 通常涵盖当前一周的 Zcash 生态活动，并在接近周末时发布。最稳妥的时间安排是：

- 在当前 newsletter issue 或任务发布后再开始收集链接。
- 在该周仍在进行时持续维护草稿。
- 在你检查完周后期更新之后，于要求的提交日期附近提交 pull request。
- 在该日期对应的任务出现之前，或在 ZecHub 确认应由你准备之前，不要提交未来一周的 newsletter。

如果某个 issue 指定了某个具体提交日期，请遵循该日期。如果本页面与当前 issue 有冲突，请以当前 issue 为准。

### 5. 打开 pull request

当你的 newsletter 文件准备好后：

1. 将你的更改提交到你的 fork。
2. 向 `ZecHub/zechub` 的 `main` 分支发起 pull request。
3. 使用与该期内容匹配的标题，例如 `Zcash Ecosystem Digest | May 30th`。
4. 在 pull request 正文中链接对应的 issue，以便审阅者将这项工作与任务对应起来。

pull request 正文示例：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

在 pull request 打开之后，请留意审阅评论。如果 ZecHub 要求修改，请在同一个分支上更新，而不是为同一期内容再打开第二个 pull request。

### 真实示例

请使用以下已合并的 newsletter pull request 作为被接受提交的示例：

- [Zcash 生态摘要 | 4月11日](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 生态摘要 | 3月28日](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 生态摘要 | 2月14日](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

将你的工作与示例进行比较时，请重点关注文件位置、标题格式、章节顺序、链接说明，以及 pull request 是否正确关联回对应任务。

### 需要避免的常见错误

- 在期数日期或任务尚未确认之前就打开 pull request。
- 处理一个已经有关联 pull request 的 issue。
- 将 pull request 提交到你自己的 fork，而不是 `ZecHub/zechub`。
- 使用错误的文件名，或将文件放在 `newsletter` 文件夹之外。
- 复制旧期内容却没有更新所有日期、链接和说明。
- 添加了错误周次的链接。
- 留下失效链接、重复链接，或模板中的占位文本。
- 在收到审阅评论后重新开一个新的 pull request，而不是更新原始分支。

### 最终检查清单

在请求审阅之前，请确认：

- issue 或任务日期与你的 newsletter 文件一致。
- 没有其他未关闭的 pull request 已经覆盖同一个 issue 或期数。
- 文件位于 `newsletter` 文件夹中。
- 模板中的各个章节都已完整填写。
- 每个链接都可用，并附有有价值的说明。
- pull request 正文链接了正确的 issue。
- 如果审阅者要求修改，你可以进行相应编辑。

## 往期内容

[ZecWeekly Archive](https://zechub.substack.com/p/archive)
