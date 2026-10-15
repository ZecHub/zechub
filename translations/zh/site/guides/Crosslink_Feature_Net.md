<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 加入 Crosslink Feature Net

## 简而言之

- Feature Net 是 Shielded Labs 面向 [Crosslink](/zcash-tech/crosslink-protocol) 的公开测试网络；这是一项拟议的终局性层，在 Zcash 的工作量证明之外增加质押。
- 它使用测试币 cTAZ。你在其中进行的任何操作都不会转移或危及主网 ZEC。
- 一个桌面应用同时充当节点、矿工、钱包和终局化器。它默认挖掘 cTAZ，并带有水龙头按钮。
- 质押、解除质押和提取仅可在“质押日”进行，每三天一天。错过后只能等待下一个。
- 要质押，你需要粘贴终局化器的身份标识并点击金额。本指南以 ZecHub 的终局化器为例。
- 两个 RPC 调用可显示你的状态：`wallet_staking_positions` 和 `get_tfl_recency_status`。

*使用 Feature Net 版本 14 和 Windows 11（版本 10.0.26200.9550）于 2026 年 10 月 8 日至 10 日测试。该软件是原型，每次发布都会变更。如果你看到的内容与本页不同，请以你自己的运行结果为准，并请提交 PR。*

## Feature Net 是什么

Crosslink 是一项提案，目前并非 Zcash 的组成部分。Shielded Labs 的 [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) 表示，在其能够进入主网之前，“需要经过标准的 Zcash 治理流程”。[Crosslink Protocol](/zcash-tech/crosslink-protocol) 页面解释了该设计。

为了让真实用户试用该设计，Shielded Labs 运行其所谓的 [激励功能网络](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)：“一系列有激励的测试网”。网络中有三种角色，桌面应用可同时扮演全部角色：

| 角色 | 功能 |
|---|---|
| 矿工 | 像如今的 Zcash 一样生成工作量证明区块 |
| 质押者 | 将 cTAZ 锁定在委托债券中，并将其指向一个终局化器 |
| 终局化器 | 投票使区块终局化。其投票权重为委托给它的质押额 |

其背后的仓库开头有一则值得在安装前阅读的免责声明：它“旨在证明想法，而非展示生产工程”，且“不是生产就绪代码”（[README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)）。请在适合运行此类软件的机器上运行它。

### 版本 14 的变更

[版本 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) 于 2026 年 10 月 1 日发布。其网络起初为纯工作量证明，并分三步启用 Crosslink（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)，[ctaz.cash](https://ctaz.cash/v14) 上也有显示）：

| 区块 | 发生的事情 |
|---|---|
| 20,736 | 开放质押 |
| 34,560 | 首批终局化器名单从链上的质押中产生 |
| 36,288 | BFT 终局性启动，质押奖励也随之开始 |

质押奖励从最后一个区块开始。更早创建的债券在此之前不会获得任何奖励（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)）。

同一版本将活跃名单缩减为质押额最高的 12 个终局化器（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)），并且按其发行说明的说法，给予它们佣金：“一个区块中所有 PoS 奖励的 10% 将作为佣金归这些终局化器，而 90% 分配给所有质押债券”。

### cTAZ 与真实 ZEC

cTAZ（“Crosslink TAZ”）是 Feature Net 的测试币。你质押的是 cTAZ，绝不是 ZEC。

真实 ZEC 仅在最后才会涉及。Shielded Labs 已为功能网络[预留 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)，而 [发行说明](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) 称，奖励将“仅根据每位参与者通过挖矿或质押获得的 cTAZ 数量按比例发放”。这带来两个结果：

- **水龙头币不计入。** 通过水龙头或其他人获得的 cTAZ，仅存放在钱包中不会获得任何收益。只有挖矿和质押的区块奖励才会计入。
- **奖励需要领取，并非自动发放。** Shielded Labs 会在 [论坛主题](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) 中公布每一轮。对于第 2 轮，它要求参与者在 2026 年 10 月 4 日前发送其钱包的查看密钥和一个主网地址（[post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)）。版本 14 所运行的网络，也就是本指南加入的网络，被公布为第 3 轮（[post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)）。

## 开始前

- **一台可以持续运行的电脑。** 该版本提供适用于 Windows、macOS、Ubuntu 和 Arch Linux 的构建版本。本指南在 Windows 上运行，使用一台配备 Intel Core i5-8350U 处理器的电脑。
- **一个质押日。** 在规划任何事情前，请先确认下一个质押日何时开始。[Staker Space 的仪表板](https://crosslink.staker.space/) 会显示倒计时。
- **无需其他条件。** 不需要 ZEC、账户或注册。

## 第 1 步：下载应用并检查文件

1. 打开 [版本 14 发布页](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)，并滚动至 **Assets**。
2. 下载适用于你系统的文件。在 Windows 上，该文件是 `zebrad_v14_win32.exe`。
3. 将文件的 SHA-256 与 GitHub 在该资产旁显示的摘要进行比较。

在 Windows 上，于 PowerShell 中：

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

GitHub 为该文件显示的摘要是 `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`。十六进制不区分大小写，因此上面的大写字母没有问题。若要让 shell 而不是你的眼睛进行比较：

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

了解此检查的价值。该发布版没有签名，因此哈希匹配只能说明下载完整，且文件是 GitHub 正在提供的文件。它无法说明是谁构建了该文件。[验证 Zcash 发布版](/guides/verifying-zcash-releases) 解释了其中的区别。

## 第 2 步：启动节点并等待同步

从终端启动应用，以便其启动信息持续显示在屏幕上。使用普通的 PowerShell 窗口，而不是通过“以管理员身份运行”打开的窗口：这是未经签名的原型软件，并且不需要管理员权限。

```powershell
.\zebrad_v14_win32.exe
```

将打开一个标题为“Zcash Crosslink Visualizer”的窗口。钱包位于左侧，包含 **Your Wallet** 和 **Faucet Wallet** 标签页；链绘制在中间；终局化器列在右侧。终端会持续打印节点日志。使用网络期间请保持两者均处于打开状态。

发行说明链接了一个 [Windows 安装视频](https://www.youtube.com/watch?v=cO-5Oa4B1Tk)。

根据发行说明，应用将其数据保存在缓存文件夹中：Windows 上为 `%LOCALAPPDATA%\zebra`，Linux 上为 `~/.cache/zebra`，macOS 上为 `~/Library/Caches/zebra`。

**请自行保管秘密。** 该文件夹包含一个名为 `secret.seed` 的文件。应用在首次启动时创建它（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)），并从中派生出你的钱包和终局化器身份（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)）。应用还带有 **Copy Seed** 按钮，会将同一秘密放入剪贴板。任何持有其中任一项的人都能控制你的钱包。切勿将它们粘贴到聊天、论坛帖子或截图中。

### 如何判断你已同步

发行说明称，“没有内置监控来显示你距离网络尖端还差多少同步进度”。版本 14 确实有一些监控：窗口顶部的 **Network Info** 下拉菜单包含 PoW Height、Wallet Sync 和 Blocks Behind Known PoW 行（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)）。将你的高度与 [Staker Space](https://crosslink.staker.space/) 或 [ctaz.cash](https://ctaz.cash/) 上的高度比较。

节点也会通过 RPC 响应：

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

此构建中 RPC 端口 `127.0.0.1:8232` 默认开放且无需密码（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)）。它仅监听你自己的机器，但该机器上运行的任何程序都可以调用它。

本次运行中，首次从区块 0 同步至约区块 28,400 的尖端，耗时约 50 分钟。

**重启后，你的余额会暂时显示为零。** 每次应用启动时，都会从 `secret.seed` 重建钱包，并再次从区块 0 扫描链（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)）。在扫描到你的交易之前，你的余额和质押额都会显示为 0。本次运行中，重启约 15 分钟后它们恢复显示。水龙头的钱包也会以相同方式重新扫描（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)），扫描期间 Faucet Wallet 标签页显示了非常大的余额。在 Wallet Sync 完成之前，请忽略两者。

## 第 3 步：获取一些 cTAZ

### 挖矿获取

根据发行说明，应用在同步完成后会自动向你自己的钱包启动 CPU 挖矿。你无需开启任何开关。挖出的币会进入你自己钱包的透明地址（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)）。

能否找到区块则是另一回事。说明警告称：“你可能会被挖矿更快的其他人击败，因此不保证成功。”默认情况下，内置矿工使用一个 CPU 线程（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)）。

若要使用更多线程，请在启动应用之前，于同一个 PowerShell 窗口中设置环境变量（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)）。本次运行使用了四个：

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

该变量仅在该窗口存续期间有效。设置后，Windows 的处理器计数器显示节点占用了相当于四至五个处理器的时间，以一个逻辑处理器百分比计：

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

结果是：一台使用四线程挖矿的 Intel Core i5-8350U，从 10 月 8 日早些时候至 10 月 9 日下午，未找到任何区块。

### 或使用水龙头

应用右下角有一个 **Receive cTAZ** 按钮。在版本 14 的源代码中，按一次会从水龙头的钱包向你的钱包发送 0.5 cTAZ（[amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073)、[send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)）。水龙头是应用每个副本都携带的单一钱包（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)），而 **Faucet Wallet** 标签页显示其余额。

除非水龙头拥有超过 5.01 cTAZ 的屏蔽币，否则该按钮会被禁用（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)）。该标签页也统计水龙头挖出的币，而这些币只有在恰好每批 10 cTAZ 加手续费时才会被屏蔽（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)），因此标签页可能显示很多资金，而按钮仍保持灰色。本次运行中，10 月 8 日和 9 日按钮一直是灰色；悬停时显示“The faucet is mining more funds.”，而标签页显示 14.74695 cTAZ。

**当按钮为灰色时，询问你自己的节点。** 节点有一个水龙头请求方法 `requestfaucetdonation`（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)），不适用按钮的 5.01 cTAZ 规则。请将 `YOUR_ADDRESS` 替换为你自己的地址（它是下方 `wallet_spendable_funds` 的 `address` 字段）：

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

该回复表示请求已排队，而不是已经发送。本次运行中，水龙头的 0.5 cTAZ 在区块 33,306 被挖出，并在区块 33,322 可花费。只请求一次：水龙头由所有人共享，且同一地址的首个请求尚待处理时，第二个请求会被拒绝（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)）。

### 或向其他参与者索取

网络中的任何人都能通过应用的 **Send** 按钮向你发送 cTAZ。本次运行中，另一位参与者发送了 31 cTAZ。它以“Received”到达，备注为“send from user wallet”，这是应用自身的 Send 所附加的备注（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)）。可在 [论坛主题](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) 中询问，并且只提供你的地址。

水龙头币和赠币足以学习质押，但不计入 ZEC 奖励。

### 检查可花费余额

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

这是水龙头的 0.5 cTAZ 到账后返回的结果，地址已缩短：

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

金额单位为 zatoshis：100,000,000 zatoshis 等于一枚 cTAZ。屏蔽币需要 3 次确认后才会计入可花费余额（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)）。来自水龙头和其他参与者的币会进入 `spendable_zats`。挖出的币是透明的，因此会进入 `unshielded_zats`（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)）。

本次运行中，第二次质押后的一个区块，余额的其余部分显示在 `pending_zats` 下。数个区块后，它再次变为可花费。

## 第 4 步：向终局化器质押

### 等待一个质押日

质押、解除质押和提取仅会在以下期间被接受：

```text
block height mod 10,368 < 3,456
```

即每 10,368 个区块开始时的 3,456 个区块窗口。按网络每个区块 25 秒的目标时间计算，这相当于每三天中的一天（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)）。版本 14 的前几个窗口在区块 20,736、31,104、41,472 和 51,840 开放。

根据发行说明，应用会公布每个质押日的开始和结束。本次运行中，其区块列表在区块 34,559 与 34,560 之间显示了一条红色“* STAKING DAY END *”行。

**发行说明中有两种说法。** 其变更列表写着“质押日约 1 天，质押周期约 3 天”，这与代码一致。在更下方，从 Season 1 沿用的部分仍写着质押日每 150 个区块开始一次，持续 70 个区块。请以第一种为准。上述结束行位于第一条规则关闭窗口的位置（34,560 mod 10,368 = 3,456）；按照第二条规则，区块 34,560 将落在一个窗口内。

### 选择终局化器

终局化器由其身份标识命名，该字符串以 `zfinv1` 开头。ZecHub 在 [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) 中公布其运行的终局化器身份：

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

请从你信任的来源复制身份标识。根据发行说明，应用也会在右侧面板列出终局化器，每个终局化器左侧都有复制图标。

质押后，钱包历史和 RPC 会用十六进制密钥而非身份标识来称呼终局化器。对于 ZecHub 的终局化器，该密钥为 `2941ef23...266aae8f`。

请选择你信任的终局化器。该设计没有自动罚没机制，但允许“由用户协调的硬分叉，烧毁所有委托给指定终局化器的质押”（[Crosslink book，设计概述](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)）。

此选择也决定谁来投票。每份活跃债券均可获得其应得的质押奖励。若其终局化器属于 12 人名单，该份额的十分之一将作为佣金支付给终局化器。指向名单外终局化器的债券会保留其全部份额，但该终局化器不会投票（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)）。

### 质押

1. 复制终局化器身份标识。
2. 在 **Your Wallet** 标签页中按 **Stake**。
3. 按 **Paste Identity**。按钮上方的行会变为身份标识的首尾字符，对于 ZecHub 的身份标识即为 `[zfinv1j6..YWyzp4YN]`。继续前请检查。
4. 点击金额。金额按固定步进提供，最小为 0.01 cTAZ，且只有余额足以覆盖的金额会亮起。余额为 0.5 cTAZ 时，+0.01 cTAZ 和 +0.1 cTAZ 会亮起。

**系统不会要求你确认，而且似乎什么都没有发生。** 本次运行中，测试者的话是：“I clicked it once and nothing happened, it just turned grey and lit up back.” 实际上质押已成功。钱包历史显示“Staked @ 33334 to 2941ef23..266aae8f”，手续费为 0.00015 cTAZ，钱包显示已质押 0.010 cTAZ。数分钟后的第二次质押在区块 33,348 创建了第二份债券。

每次质押都会创建一份单独的委托债券。固定金额和质押日都出于隐私考虑：它们使一个人的质押更难与另一个人的区分开来。

## 第 5 步：检查你的状态

### 你的债券

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

这是质押两天后、区块 36,490 时的回复：

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

该调用不接受参数。它返回你的活跃债券，按每份债券支持的终局化器密钥分组；也返回已完成解除质押且可提取的债券。每份债券显示质押金额（`initial_val`）、其当前价值（`latest_val`），以及创建它的交易和区块高度。奖励会添加到债券本身：到区块 36,490 时，每份 1,000,000 zatoshis 的债券已增长到 1,003,451。

**Edit Stake 窗口将每份债券显示得大十倍。** 本次运行中，每份 0.01 cTAZ 债券在各自行中显示为 0.100 cTAZ；奖励开始后显示为 0.1003536 cTAZ，而各行上方的总额（0.020 cTAZ，之后为 0.02007 cTAZ）与 RPC 一致。请以总额和 RPC 为准。

同一窗口在终局化器旁显示了警告三角形，终局性开始前后皆如此。源代码中，该三角形表示你的应用未将该终局化器视为在线；在线的终局化器则显示 Wi-Fi 图标（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)）。尽管如此，债券仍获得了奖励。

### 终局化器

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

根据发行说明，该调用报告你的节点在投票过程中的位置，并为每个终局化器报告你的节点上次收到其消息的时间以及它的投票情况。

在区块 36,288 之前，每个字段均为零，列表为空。这是区块 33,354 时的回复：

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

终局性启动后，列表包含名单中的终局化器。区块 36,490 时，列表包含 12 个，其中有 ZecHub 的 `2941ef23...`，与名单上限 12 相符。这是该回复的开头，在第一项后截断：

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

数分钟后，应用右侧面板显示“Finalizers (23)”。

### 在 Linux 和 macOS 上

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) 以 `curl` 形式提供了该调用。请为其他调用修改方法名称。本指南未运行此形式：

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

在 Linux 上，发行说明称，你可能需要先安装 `xclip`，应用中的复制和粘贴才能工作。

### 一个值得留意的 RPC 名称

版本 14 的发行说明描述了名为 `wallet_staking_action` 的质押调用，它接受一个对象。版本 14 源代码中没有该名称的方法；本次运行中，节点回复：

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

它注册的质押方法是 [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420)，接受一个包含 JSON 请求的字符串，终局化器由其 `zfinv1` 身份标识给出（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)）。本指南未尝试该方法。

## 解除质押和提取

债券在创建当天不能撤销。从开始到结束需经过三个质押日：在第一个中质押，在之后的一个中解除质押，并在第三个中提取。发行说明补充说，同一份债券不能在同一个质押日中进行两次质押操作。

*本指南未运行。根据版本 14 的发行说明：要解除质押，请按 **Edit Stake**，从 Staked Bonds 列表中选择一份债券，然后点击链条图标。要在之后的质押日提取，请按 **Edit Stake**，从 Withdrawable Bonds 列表中选择一份债券，然后点击货币图标。将债券转向另一终局化器，即说明中所谓的重定向，可随时进行。*

## 在何处查看网络

[Crosslink 标签页位于 ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) 上，将工具集中在一处，其通知写着“在此网络上质押不会转移 ZEC”：

- 托管服务，无需节点：[Staker Space](https://crosslink.staker.space/)，一个“当前 cTAZ 测试网的实时仪表板”，显示高度、矿工、解题速率、质押日倒计时和终局性；以及 [ctaz.cash](https://ctaz.cash/)，显示挖矿产出、终局化器名单、对等节点和质押地址名称声明。
- 在你自己的机器上：`zcash-explorer`，其 `/live/crosslink` 页面显示激活、终局性延迟、名单和质押仓位；以及 `crosslink_indexer`，一个 Crosslink 节点的 SQLite 索引。

## 常见错误

**围绕时钟而非区块高度进行规划。** 质押日以区块计数。请查看仪表板的倒计时，而非日历。

**在窗口最后几分钟质押。** 该规则会根据包含你交易的区块进行检查（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)），因此质押必须在窗口关闭前被挖入区块，而不只是发送出去。

**期望挖到自己的质押额。** 一台使用四线程的 Intel Core i5-8350U CPU 矿工在 10 月 8 日至 9 日间未找到任何区块。请从水龙头或其他参与者处获取第一笔 cTAZ。

**因为似乎没有发生任何事而再次点击。** 每次点击金额都会创建一份新债券。请先查看钱包历史或 `wallet_staking_positions`。

**重启后恐慌。** 你的余额和质押额会显示为零，直到钱包重新扫描完成。请等待 Wallet Sync 完成。

**将 cTAZ 当作玩具币，或将秘密视为无害。** cTAZ 是测试币，但你赚取的 cTAZ 决定你获得真实 ZEC 的份额。请像保护钱包一样保护 `secret.seed`。

**阅读旧说明。** 发行说明在新规则旁保留了早期赛季的文字。当它们与你的节点行为不一致时，以你的节点为准。

## 相关页面

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - 此网络测试的设计
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink 背后的团队
- [验证 Zcash 发布版](/guides/verifying-zcash-releases) - 校验和能证明什么、不能证明什么
- [Zebra Full Node](/zcash-tech/zebra-full-node) - Feature Net 应用构建所基于的节点
- [Zcash Testnet](/using-zcash/testnet) - 常规的 Zcash 测试网络，与此网络不同

## 来源

- [版本 14 发行说明](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)，Shielded Labs，2026 年 10 月 1 日
- [Crosslink：激励功能网络](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)，Shielded Labs，2026 年 4 月 2 日
- [Crosslink：激励 Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)，Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)，Shielded Labs
- [Crosslink book](https://shieldedlabs.github.io/crosslink_book/)，Shielded Labs

---

*本页步骤于 2026 年 10 月 8 日至 10 日，使用 Feature Net 版本 14 和 Windows 11（版本 10.0.26200.9550）运行。引用发行说明或源代码的陈述均取自这些材料。所有标有“未运行”的内容均未尝试。*
