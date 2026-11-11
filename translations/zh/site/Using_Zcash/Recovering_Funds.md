<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 钱包 [Wallet] 资金恢复

**为何保留恢复材料？**

助记词 [seed phrase]、花费密钥 [spending key]、viewing key 和钱包文件并不能互相替代。助记词可以为多个钱包派生钱包密钥，但它不能替代每个旧版密钥或钱包文件。viewing key 可以显示屏蔽 [shielded] 活动，但无法授权花费。

恢复取决于拥有正确的花费授权，以及一条当前受支持、适用于存放资金的 pool 的路径。请将恢复材料保持私密，绝不要与不信任的任何人分享助记词、花费密钥或钱包文件。

# 安全与责任

用户务必了解处理私钥所涉及的风险，并保护这些密钥免遭未授权访问。资金的安全取决于用户是否有责任保护好其私钥。

## 旧版屏蔽资金：Sprout、Sapling 和 Orchard

较旧的屏蔽 ZEC 可能需要作为恢复的一部分进行迁移。路径取决于目前由哪个屏蔽池持有资金。

> **NU7 计划于 2026 年 11 月 5 日推出。** 激活后，当前从旧版 Sprout pool 迁出的路径将停止工作。
>
> 如果你在 Sprout pool 中仍有 ZEC，请在升级前迁移它。激活后，现有工具将无法再将 Sprout 资金转移至 Sapling、透明地址或任何其他目的地。
>
> 如果你在 **NU7** 激活**之后**查看本页，**Sprout 将被冻结**，直到未来出现恢复方法；目前并未计划提供这种方法。

## 一页解答

| 你的资金位于 | 迁移路径 | 操作方式 |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | 如果你有 `wallet.dat` 或独立的 Sprout 花费密钥，请先尝试当前的 Argos 恢复路径。如果 Argos 不合适，请使用完整实用指南中的旧版 sidecar 路径。Sprout 必须先进入 Sapling，然后再转至 Ironwood。由于 NU7，此路径有时间限制。 |
| **Sapling** | **Sapling → Ironwood** | 无需 Sprout 恢复环境。请使用能够恢复或花费你的特定 Sapling 账户，并可构建 Ironwood 交易的当前钱包。仅支持 Ironwood 并不能证明支持旧版 Sapling 恢复。 |
| **Orchard** | **Orchard → Ironwood** | Orchard 仅可迁出。请使用当前兼容钱包内置的 Orchard 到 Ironwood 迁移流程。请参阅 [已恢复资金和 Ironwood pool](#recovered-funds-and-the-ironwood-pool)。 |

### 五个问题的决策流程

1. **它是 Sprout 吗？** 仅有助记词指向较晚的 Sapling/Orchard 时代恢复路径，而不是 Sprout。`zc...` 地址，或恢复后报告 Sprout 余额的钱包，则指向 Sprout。
2. **你有什么恢复材料？** 查找 `wallet.dat`、旧电脑或数据目录、`z_exportwallet` 备份，或导出的 Sprout 花费密钥。仅有 `zc...` 地址并不足够。
3. **Argos 还是旧版 sidecar？** 如果你有 `wallet.dat` 或独立的 Sprout 花费密钥，并且只想将资金取出，请先尝试 [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)。如果 Argos 无法处理该材料，或者你希望完全自行掌控恢复堆栈，请使用完整实用指南中的旧版 sidecar 路径。
4. **你是否已有同步完成且未裁剪的 zcashd 数据目录？** 这仅对旧版 sidecar 路径重要。只有在干净关闭后才复制现有节点数据；否则，实用指南会介绍快照/从头开始的选项。
5. **资金最终会到哪里？** **Ironwood。** Sprout 会先经过 Sapling，因为不存在单笔直接从 Sprout 到 Ironwood 的交易。不要停在 Sapling。

### 完整 ZEC Pool 迁移实用指南

如需完整迁移参考，包括详细恢复路径、命令、手续费 [fee]、硬件要求、隐私 [privacy] 注意事项、故障排除和来源说明，请阅读完整指南。

**版本 1.1 · 更新于 2026 年 9 月 18 日**

[在 ZecHub](/research/zec-pool-migration/view) 中阅读完整的 ZEC Pool 迁移实用指南

> **开始前：** 请先确定**你正在恢复什么，以及你仍拥有何种恢复材料**。当前钱包助记词或受支持的非 Sprout 花费密钥可能只需普通恢复。较旧的材料——如 Zecwallet Lite 助记词、旧版 `wallet.dat` 或独立的 Sapling 或 Sprout 花费密钥——可能需要专用恢复路径。
>
> 如果你认为资金位于 **Sprout**，请在投入时间恢复前确认你仍拥有花费授权。仅有 `zc...` 地址或查看材料不足以移动资金。
>
> **YWallet 在 Ironwood 后不再支持 Zcash。** 对于来自受支持助记词和密钥的常规非 Sprout 恢复，请使用 **Zkool**。对于 Zecwallet Lite 恢复、旧版钱包文件和独立的 Sapling/Sprout 花费密钥，请使用 **Argos**。对于 Sprout，Argos 是应首先尝试的路径；完整实用指南涵盖旧版 sidecar 备选方案。
>
> 请根据**你实际拥有的材料**，而不是你记得使用过的恢复工具，使用下表。

| 你拥有 | 从这里开始 |
| --- | --- |
| 来自当前或最近维护钱包的助记词或受支持的**非 Sprout 花费密钥**，包括旧的 YWallet Zcash 材料 | [Zkool](#fund-recovery-with-zkool) |
| **仅有 viewing key** | Zkool 可以导入受支持的 viewing key 以进行只读访问，但 viewing key 无法授权恢复花费。请找到相应的助记词或花费密钥。 |
| 24 个单词的 **Zecwallet Lite** 助记词 | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Zecwallet Lite 或 zcashd `wallet.dat`，或独立的 Sapling / Sprout 花费密钥 | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)。截至 2026 年 9 月 18 日，v1.3.0 为当前首选版本；对于 `wallet.dat` 和 Sprout 恢复，请使用 v1.2.0 或更高版本。 |
| Sprout 材料，Argos 无法处理，或你希望自行控制旧版组件的恢复 | 请使用 [完整实用指南](/research/zec-pool-migration/view)中的旧版 sidecar 路径。 |
| 没有可用的助记词或花费密钥，但有锁定设备、忘记的密码或故障磁盘 | [专业恢复](#professional-recovery-when-you-do-not-have-the-seed)。绝不要将可用的助记词或花费密钥发送给主动联系你的人。 |

## 使用 Zkool 恢复资金

[Zkool](https://github.com/hhanh00/zkool2/releases) 是同一开发者推出的 Zcash 后继者，用以替代 YWallet。它支持透明和现代屏蔽恢复路径，包括旧版 Sapling 密钥，但**不支持 Sprout**。

这里涵盖两种情况：

1. 使用助记词、私钥或 viewing key **恢复账户**
2. 从仅支持透明地址的钱包中**归集资金**

### 1) 恢复账户

1. 从 [发布页面](https://github.com/hhanh00/zkool2/releases) 安装 Zkool 并打开它
2. 在 **账户管理器**（主页）中，点击 **+** 按钮以进入 **新建账户** 屏幕
3. 输入一个**账户名称**以识别此账户
4. 开启 **恢复账户？**。这会显示密钥和出生高度字段
5. 将你的密钥粘贴到 **密钥（助记词、私钥或 Viewing Key）**。Zkool 接受助记词、Sapling 私密密钥、透明扩展密钥和受支持的 viewing key。viewing key 为只读，无法授权花费。
6. 为旧账户输入一个**出生高度**。Zkool 不会扫描该高度之前的区块 [block]，所以如果不确定，请选择早于钱包首次活动的高度。出生高度设置得太晚，可能会使真实交易看似丢失。

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. 保存账户，然后同步它

### 从不同钱包恢复助记词

如果助记词来自遵循 ZIP 316 的钱包——包括 ZODL（原名 Zashi）、Zingo 或 zcashd——请在保存前开启**高级选项**并启用**使用内部找零**。

ZIP 316 使用单独的内部/找零地址。恢复这些账户之一时若不启用**使用内部找零**，找零输出可能看似丢失，尽管资金仍然存在。

另外两个字段位于**高级选项**下：

- **额外密码短语（可选）**，仅在原钱包使用过时填写
- **账户索引**，如果原钱包在一个助记词下拥有多个账户。资金可能位于不同索引下

> **这两个选项只有在密钥字段中填入有效助记词后才会出现。** 当字段为空，或者填入私钥或 viewing key 时，Zkool 只显示**使用内部找零**和 **H/W Ledger**。请先粘贴助记词，再打开高级选项。

### 2) 从仅透明地址钱包归集资金

如果旧钱包或账户仅持有**透明 ZEC**，请先恢复账户，找到每个使用过的透明地址，然后将资金转移至你控制的当前屏蔽目的地。不要假定旧钱包品牌始终仅支持透明地址；某些产品在后续版本中增加了屏蔽支持。

1. 使用上述步骤恢复账户
2. 打开账户并前往**接收资金**页面
3. 点击顶栏中的放大镜（**查找其他透明地址**）。像 Ledger 和 Exodus 这样轮换地址的钱包，会从一个助记词生成多个透明地址，此操作会找出其中持有资金的地址
4. **之后重置并同步账户。** 新找到的地址只会在下次扫描时获得其余额，因此跳过此步骤会让人以为归集未找到任何资金
5. 前往**发送**页面。在余额旁边会看到三个图标按钮。它们没有文字标签，因此请悬停或长按以查看名称：
   - **屏蔽一个**（轮廓盾牌）一次移动一个透明地址
   - **屏蔽全部**（实心盾牌）一次从所有透明地址移动全部资金
   - **取消屏蔽全部**（打开的挂锁）则反向操作，将资金转入透明地址

> **屏蔽一个是更具隐私性的选择。** 在一笔交易中屏蔽多个地址，会公开将它们关联为属于同一个人。Zkool 在运行屏蔽全部前也会对此发出警告。

6. 审查交易并发送

当你要向仅接受透明地址的交易所 [exchange] 提现时，取消屏蔽全部很有用。仅当账户拥有屏蔽地址时才会显示屏蔽按钮，而仅当账户拥有透明地址时才会显示取消屏蔽全部。

## 使用 Argos 进行 Zecwallet Lite 和旧版钱包恢复

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) 已不再维护，其仓库已归档。它的助记词派生方式不同于当前钱包所采用的布局，因此将相同短语导入现代钱包可能会遗漏存放在 Zecwallet Lite 附加派生地址中的资金。来自 Sovright 的 [Argos](https://argos.sovright.com) 是为此及其他旧版恢复情形而构建的桌面恢复工作区。

Argos 可读取 Zecwallet Lite 助记词和钱包文件、zcashd `wallet.dat`、独立的 Sapling 扩展花费密钥以及 Sprout 花费材料。对于 Sprout，仅有 Zecwallet Lite 助记词并不足够，因为这些密钥是单独生成的。Argos 是恢复工具，而非日常钱包：请在本地检查源材料、扫描，然后归集到你控制的受维护钱包中。

Least Authority [审计了](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) 此工具。恢复本身免费。归集期间可能会显示向 Sovright 的可选捐赠。

> **绝不要在网站中输入助记词。** Argos 网站仅用于下载和查看 [用户指南](https://argos.sovright.com/guide.html)。密钥保留在经过签名的桌面应用中。验证会在本地依据 BIP-39 校验和进行。扫描开始后，助记词字段会被清空。任何向你发送消息，要求提供该助记词以"帮助恢复你的资金"的人，都是骗子。

### 打开 Argos 前

1. 从 [官方 Argos 网站](https://argos.sovright.com)或 [GitHub 发布页面](https://github.com/sovright/argos/releases)下载桌面应用。发布校验和或签名时，请验证它们。
2. 使用当前的 Argos 版本。截至 2026 年 9 月 18 日，**v1.3.0** 为当前首选版本。对于 `wallet.dat` 和 Sprout 恢复，请使用**v1.2.0 或更高版本**。早于 1.1.0 的构建版本仍可扫描，但会构建网络拒绝的 Ironwood 前归集交易；请更新后重试。
3. 请在你信任的机器上操作。优先使用全盘加密 [encryption]。助记词、密码短语或花费密钥可见时，不要共享屏幕。
4. 准备好由你控制的受维护钱包提供的目的地统一地址，例如 [ZODL](https://zodl.com/)。在将地址粘贴到 Argos 前，请先在该钱包中确认地址。

### 助记词恢复

1. 打开 Argos 并选择**我有我的 24 个单词助记词**。助记词恢复不需要钱包文件。
2. 粘贴短语并点击**验证助记词**。如果显示助记词有效，请继续。
3. 输入一个**生日区块高度**，或钱包创建时间的最接近估计值。较早的高度较慢，但比猜得太晚更安全。
4. 在服务器控件下，使用当前服务器预设，或输入 lightwalletd URL。以逗号分隔的 URL 会按顺序尝试。公开示例：

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. 粘贴目的地统一地址。
6. 点击**开始扫描**。视生日高度而定，这可能需要几分钟或几天。你可以退出并重新打开同一工作区；扫描将继续。
7. 扫描完成后，检查余额、手续费估算和目的地，然后点击**归集**。

广播归集交易不可逆。请保留原钱包文件，直到每个相关 pool 均已归集，并且目的地钱包显示预期资金。恢复完成后，请弃用旧版机密材料，不要继续将它们用于新活动。

### 钱包文件和独立密钥

在欢迎界面中，**我有一个钱包文件**涵盖 Zecwallet Lite 文件、zcashd `wallet.dat` 或独立的 Sapling 扩展花费密钥。独立 Sprout 花费密钥恢复由 Argos 的 Sprout 恢复路径/CLI 处理。

Argos 会读取钱包文件而不修改它们。如果钱包已加密，请在系统询问时输入密码短语；它仅在内存中使用，不会写入磁盘。开始扫描前，请检查透明、Sapling 和 Sprout 密钥数量。

由于 viewing key 无法授权花费，因此不接受它用于归集。

### Sprout 注意事项

Zecwallet Lite 助记词不会派生 Sprout 密钥。这些密钥是单独生成的。请从 zcashd `wallet.dat` 中恢复 Sprout，或通过 CLI 中的独立花费密钥恢复。

如果文件已有可花费的 note 数据和缓存 witness，Argos 可在不进行链扫描的情况下提供**归集 Sprout 资金**。否则，它可以通过 P2P 网络运行可恢复的完整区块扫描。该扫描规模大且缓慢。它写入的检查点可用于花费，因此请像保护原钱包一样保护它。

Sprout 价值只能进入 Sapling。在 Sapling 资金确认且可花费后，使用支持已恢复 Sapling 账户的当前钱包，将其继续转移至 **Ironwood**。不要停在 Sapling。

## 已恢复资金和 Ironwood pool

自 Ironwood（NU6.3）升级于 2026 年 7 月 28 日激活以来，Orchard pool 仅可花费。新价值无法进入其中，现有价值会通过 turnstile 迁出至 Ironwood。

如果你的已恢复资金位于 Orchard，请使用**当前钱包的内置迁移流程**将其转移至 Ironwood。Orchard 在 NU6.3 后仅可迁出。

截至 2026 年 9 月 18 日，Zkool 6.30.0 为当前版本并支持 Ironwood。其迁移设计注重隐私，但这并不等同于声称符合 ZIP 318。其他当前钱包可能使用 ZIP 318 风格的分阶段迁移。请遵循已安装钱包当前的迁移界面和发行说明，而不要自行编造金额或时间安排。

分阶段迁移可能使用多笔交易，因此总手续费可能高于一次性转账。

> **迁移金额是公开的。** 当价值穿过 turnstile 时，金额和区块高度在链上可见，尽管发送方和接收方仍处于屏蔽状态。隐私重要时，请使用钱包内置的私密/分阶段迁移策略，并在适当情况下使用 Tor 或其他可信隐私层等网络级隐私措施。网络隐私可以隐藏你的 IP 关联；它不会隐藏公开的跨越金额。

## 使用 ZExCavator 深度恢复

[ZExCavator](https://github.com/zingolabs/zexcavator) 是一个**进行中的** Zingo Labs 恢复项目，目前专注于 Zecwallet Lite 钱包文件和钱包格式迁移。其 README 当前指引资金恢复用户使用**Zingolib**导出选项，而更完整的 ZeWIF 支持仍在开发中。

请将其视为高级/边缘情形工具，而非默认恢复路径。对于普通 Zecwallet Lite 助记词、钱包文件、zcashd `wallet.dat` 和受支持的独立花费密钥，请先尝试 Argos。在依赖 ZExCavator 恢复的任何内容之前，请先在受维护钱包中验证它。

## 没有助记词时的专业恢复

如果助记词或密钥丢失，自托管恢复便无法开始。处于这种情况的一些人会使用专业恢复公司处理忘记密码、硬件故障或无法读取的磁盘。

这条路径不同于恢复你仍拥有的助记词。不要将可用助记词交给任何声称可为你"恢复"它的人。此类服务的诈骗版本很常见。

[Unciphered](https://unciphered.com) 是一家在内部完成此类工作的公司，并曾被 Wired 等媒体报道。他们是一般加密货币恢复服务，并非 Zcash 专用工具，且会收取服务费用。ZecHub 不认可任何恢复公司。如果你选择这条路径，请自行确认官方网站域名，并假定任何首先向你发送私信的人都是骗子。

如果你仍有可用的助记词或花费密钥，请改为先在自己的机器上使用 Zkool 或 Argos 等自托管恢复路径。

## YWallet 已不再维护

YWallet 长期以来都是本页推荐的恢复工具，许多旧指南仍指向它。

其开发者现在声明，自 Ironwood 更新以来 YWallet 不再支持 Zcash，并指引 Zcash 用户使用其受维护的后继者 **Zkool**。请保留旧的 YWallet 助记词/密钥材料，但不要在 YWallet 中开始新的 Zcash 迁移。

如果你已有来自 YWallet 的 Zcash 恢复材料，请使用上述受支持的助记词/密钥路径在 Zkool 中恢复它。

## 相关页面

- [钱包](/using-zcash/wallets) - 哪些钱包仍受维护及其 Ironwood 就绪情况，包括 Argos
- [Ironwood](/zcash-tech/ironwood) - 升级改变了什么，以及为何资金需要迁移
- [备注](/using-zcash/memos) - 加密备忘录如何运作
- [Viewing Keys](/zcash-tech/viewing-keys) - 没有花费权限的只读访问
- [轻钱包节点](/zcash-tech/lightwallet-nodes) - lightwalletd 可使用的公开 Argos 端点
- [Argos 用户指南](https://argos.sovright.com/guide.html) - 来自 Sovright 的官方演练
- [Naomi Brockwell 关于恢复工具](https://x.com/naomibrockwell/status/2079146521405333526) - Argos 演练和有关专业恢复的说明
