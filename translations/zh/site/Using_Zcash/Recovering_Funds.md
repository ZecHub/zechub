<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 钱包资金恢复

**为何要保存恢复资料？**

助记词、支出密钥、查看密钥和钱包文件不可互相替代。助记词可以为许多钱包派生钱包密钥，但它无法替代每个旧版密钥或钱包文件。查看密钥可以显示屏蔽交易活动，但不能授权支出。

恢复取决于是否拥有正确的支出权限，以及是否存在当前支持该资金所在资金池的恢复路径。请将恢复资料保密，绝不要向任何你不信任的人分享助记词、支出密钥或钱包文件。

# 安全与责任

用户务必了解处理私钥所涉及的风险，并保护这些密钥免遭未经授权的访问。资金安全取决于用户是否负责妥善保管自己的私钥。

## 旧版屏蔽资金：Sprout、Sapling 和 Orchard

较旧的屏蔽ZEC可能需要在恢复过程中迁移。迁移路径取决于资金目前所在的屏蔽资金池。

> **NU7计划于 2026 年 11 月 5 日进行。**一旦激活，当前从旧版 Sprout 资金池迁出的路径将无法继续使用。
>
> 如果你的 Sprout 资金池中仍有ZEC，请在升级前完成迁移。激活后，现有工具将无法再把 Sprout 资金转入Sapling、透明地址或任何其他目的地。
>
> 如果你在NU7激活**之后**查看本页，**Sprout 将被冰封**，直至未来出现恢复方法；目前尚未计划提供此类方法。

## 一页式答案

| 你的资金所在位置 | 迁移路径 | 应如何操作 |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | 如果你有`wallet.dat`或独立的 Sprout 支出密钥，先尝试当前的Argos恢复路径。如果Argos不适用，请使用完整实战指南中的旧版边车路径。Sprout 必须先转入Sapling，再继续迁移至 Ironwood。由于NU7，此路径有时间限制。 |
| **Sapling** | **Sapling → Ironwood** | 无需 Sprout 恢复环境。使用能够恢复或支出你的特定Sapling账户、并可构建 Ironwood 交易的当前钱包。仅支持 Ironwood 并不代表支持旧版Sapling恢复。 |
| **Orchard** | **Orchard → Ironwood** | Orchard仅可迁出。请使用当前兼容钱包内置的Orchard至 Ironwood 迁移流程。参见[已恢复资金与 Ironwood 资金池](#recovered-funds-and-the-ironwood-pool)。 |

### 五问决策流程

1. **是否为 Sprout？** 仅有助记词意味着应采用较晚期的Sapling/Orchard时代恢复路径，而非 Sprout。`zc...`地址，或恢复后显示 Sprout 余额的钱包，则表明是 Sprout。
2. **你有什么恢复资料？** 查找`wallet.dat`、旧电脑或数据目录、`z_exportwallet`备份，或导出的 Sprout 支出密钥。仅有`zc...`地址还不够。
3. **Argos还是旧版边车？** 如果你有`wallet.dat`或独立的 Sprout 支出密钥，并且只是想将资金转出，请先尝试[Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)。如果Argos无法处理这些资料，或你希望自行完全掌控整个恢复栈，请使用完整实战指南中的旧版边车路径。
4. **你是否已有已同步、未修剪的zcashd数据目录？** 这只对旧版边车路径重要。只有在干净关闭后才复制现有节点数据；否则实战指南涵盖快照和从头开始的方案。
5. **资金最终会去哪里？** **Ironwood。**Sprout 会先经过Sapling，因为不存在单笔直接从 Sprout 到 Ironwood 的交易。不要停留在Sapling。

### 完整ZEC资金池迁移实战指南

如需完整的迁移参考资料，包括详细恢复路径、命令、费用、硬件要求、隐私注意事项、故障排除和来源说明，请阅读完整指南。

**版本 1.1 · 更新于 2026 年 9 月 18 日**

[阅读完整的ZEC资金池迁移实战指南（ZecHub](/research/zec-pool-migration/view)）

> **开始前：**先确认**你要恢复的是什么，以及你还拥有哪种恢复资料**。当前钱包的助记词或受支持的非 Sprout 支出密钥可能只需常规恢复。较旧的资料——例如 ZecWallet Lite 助记词、旧版`wallet.dat`或独立的Sapling或 Sprout 支出密钥——可能需要专用恢复路径。
>
> 如果你认为资金位于 **Sprout**，请在投入时间恢复前确认你仍拥有支出权限。仅有`zc...`地址或查看资料不足以转移资金。
>
> **YWallet在 Ironwood 后不再支持Zcash。**对于受支持助记词和密钥的常规非 Sprout 恢复，请使用 **Zkool**。对于 ZecWallet Lite 恢复、旧版钱包文件和独立的Sapling/Sprout 支出密钥，请使用 **Argos**。对于 Sprout，Argos是应首先尝试的路径；完整实战指南涵盖旧版边车备选方案。
>
> 请根据**你实际拥有的资料**而非你记得曾使用的恢复工具，使用下表。

| 你拥有的资料 | 从这里开始 |
| --- | --- |
| 当前或近期维护的钱包所提供的助记词或受支持的**非 Sprout 支出密钥**，包括旧版YWalletZcash资料 | [Zkool](#fund-recovery-with-zkool) |
| 仅有**查看密钥** | Zkool可以导入受支持的查看密钥以进行只读访问，但查看密钥不能授权恢复支出。请寻找相应的助记词或支出密钥。 |
| 一个 24 词 **ZecWallet Lite** 助记词 | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| 一个 ZecWallet Lite 或zcashd`wallet.dat`，或独立的Sapling/Sprout 支出密钥 | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)。截至 2026 年 9 月 18 日，v1.3.0 为当前首选版本；恢复`wallet.dat`和 Sprout 时请使用 v1.2.0 或更高版本。 |
| Argos无法处理的 Sprout 资料，或希望自行掌控旧版组件的恢复 | 使用[完整实战指南](/research/zec-pool-migration/view)中的旧版边车路径。 |
| 没有可用助记词或支出密钥，但有被锁定的设备、遗忘的密码或故障硬盘 | [专业恢复](#professional-recovery-when-you-do-not-have-the-seed)。绝不要把可用助记词或支出密钥发送给主动联系你的人。 |

## 使用Zkool进行资金恢复

[Zkool](https://github.com/hhanh00/zkool2/releases)是同一开发者推出的、目前仍在维护的Zcash继任者，取代YWallet。它支持透明和现代屏蔽恢复路径，包括旧版Sapling密钥，但**不支持 Sprout**。

这里涵盖两种情况：

1. 从助记词、私钥或查看密钥**恢复账户**
2. 将仅支持过透明地址的钱包中的资金**归集转出**

### 1) 恢复账户

1. 从[发布页面](https://github.com/hhanh00/zkool2/releases)安装Zkool并打开它
2. 在 **账户管理器**（主页面）中，点击 **+** 按钮进入 **新建账户** 页面
3. 输入一个**账户名称**以识别此账户
4. 开启**恢复账户？**。这样会显示密钥和出生高度字段
5. 将你的密钥粘贴到**密钥（助记词、私钥或Viewing Key）**。Zkool接受助记词、Sapling私密密钥、透明扩展密钥和受支持的查看密钥。查看密钥为只读，不能授权支出。
6. 为旧账户输入一个**出生高度**。Zkool不会扫描此高度之前的区块，因此如不确定，请选择早于钱包首次活动的高度。出生高度设得太晚，可能让真实交易看起来像是丢失了。

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. 保存账户，然后同步

### 恢复来自其他钱包的助记词

如果助记词来自遵循ZIP 316 的钱包——包括ZODL（原 Zashi）、Zingo或zcashd——请开启**高级选项**，并在保存前启用**使用内部找零**。

ZIP 316 使用单独的内部/找零地址。恢复这类账户时若未启用**使用内部找零**，找零输出可能看起来像是丢失了，即使资金仍然存在。

**高级选项**下还有两个字段：

- **额外密码短语（可选）**，仅当原钱包使用过时才填写
- **账户索引**，如果原钱包在同一助记词下持有多个账户。资金可能位于不同索引下

> **只有在密钥字段中填入有效助记词后，这两个选项才会出现。**字段为空，或其中是私钥或查看密钥时，Zkool只显示**使用内部找零**和**H/W Ledger**。请先粘贴助记词，再打开高级选项。

### 2) 从仅透明地址钱包归集资金

如果旧钱包或账户仅持有**透明ZEC**，请先恢复账户，找到每个已使用的透明地址，然后将资金转入你控制的当前屏蔽目的地。不要因为某个旧钱包品牌而假定它始终仅支持透明地址；有些产品在后续版本中增加了屏蔽支持。

1. 使用上述步骤恢复账户
2. 打开账户并进入**接收资金**页面
3. 点击顶部栏中的放大镜（**查找其他透明地址**）。会轮换地址的钱包，例如Ledger和 Exodus，会从一个助记词生成许多透明地址；此功能可找到其中持有资金的地址
4. **随后重置并同步账户。**新找到的地址只会在下一次扫描时获取余额，因此跳过此步骤会让归集看起来像是什么也没找到
5. 前往**发送**页面。在余额附近可找到三个图标按钮。它们没有文字标签，因此请悬停或长按以查看名称：
   - **Shield One**（空心盾牌）一次转移一个透明地址
   - **Shield All**（实心盾牌）一次转移所有透明地址中的全部资金
   - **Unshield All**（打开的挂锁）则反向操作，转入透明地址

> **Shield One 是更私密的选择。**在一笔交易中屏蔽多个地址，会公开关联这些地址属于同一个人。Zkool在运行 Shield All 前也会对此发出警告。

6. 检查交易后发送

当向只接受透明地址的交易所提现时，Unshield All 很有用。只有账户拥有屏蔽地址时才会显示屏蔽按钮，只有账户拥有透明地址时才会显示 Unshield All。

## 使用Argos恢复 ZecWallet Lite 和旧版钱包

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite)已不再维护，其代码库也已归档。它的助记词派生方式与当前钱包使用的布局不同，因此将相同短语导入现代钱包可能会遗漏存放在 ZecWallet Lite 额外派生地址中的资金。来自Sovright的[Argos](https://argos.sovright.com)是专为此类及其他旧版恢复情形打造的桌面恢复工作区。

Argos可读取 ZecWallet Lite 助记词和钱包文件、zcashd`wallet.dat`、独立的Sapling扩展支出密钥，以及 Sprout 支出资料。对于 Sprout，仅有 ZecWallet Lite 助记词不足以恢复，因为这些密钥是单独生成的。Argos是恢复工具，而非日常钱包：请在本地检查源资料、扫描，然后归集转入你控制的受维护钱包。

Least Authority 已[审计](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf)该工具。恢复本身免费。归集过程中可能会出现向Sovright捐款的可选项。

> **绝不要在网站中输入助记词。**Argos网站仅用于下载和提供[用户指南](https://argos.sovright.com/guide.html)。密钥始终保留在已签名的桌面应用中。验证在本地依据 BIP-39 校验和进行。扫描开始后，助记词字段会被清除。任何发消息索要该助记词、声称“帮助恢复资金”的人都是骗子。

### 打开Argos之前

1. 从[官方Argos网站](https://argos.sovright.com)或[GitHub 发布页面](https://github.com/sovright/argos/releases)下载桌面应用。在发布校验和或签名时，请验证它们。
2. 使用当前Argos版本。截至 2026 年 9 月 18 日，**v1.3.0**为当前首选版本。**恢复`wallet.dat`和 Sprout 时请使用 v1.2.0 或更高版本**。低于 1.1.0 的版本仍可扫描，但会构建网络拒绝的 Ironwood 前归集交易；请更新后重试。
3. 在你信任的设备上操作。最好使用全磁盘加密。助记词、密码短语或支出密钥可见时，请勿进行屏幕共享。
4. 准备好由你控制的受维护钱包提供的目的地Unified Address，例如[ZODL](https://zodl.app/)。在将地址粘贴到Argos前，请先在该钱包中确认地址。

### 助记词恢复

1. 打开Argos并选择**我有我的 24 词助记词**。助记词恢复不需要钱包文件。
2. 粘贴短语并点击**验证助记词**。若显示助记词有效，请继续。
3. 输入一个**生日区块高度**，或对钱包创建时间最接近的估计。较早的高度速度较慢，但比猜得太晚更安全。
4. 在服务器控制项下，使用当前服务器预设，或输入lightwalletd URL。以逗号分隔的 URL 会依序尝试。公开示例：

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. 粘贴目的地Unified Address。
6. 点击**开始扫描**。根据生日高度，这可能需要数分钟或数天。你可以退出并重新打开同一工作区；扫描会继续。
7. 扫描完成后，检查余额、费用估算和目的地，然后点击**归集**。

广播归集交易不可撤销。在所有相关资金池均已归集且目的地钱包显示预期资金之前，请保留原始钱包文件。恢复完成后，请停用旧版秘密资料，而不要继续将其用于新的活动。

### 钱包文件和独立密钥

在欢迎页面中，**我有钱包文件**涵盖 ZecWallet Lite 文件、zcashd`wallet.dat`或独立的Sapling扩展支出密钥。独立 Sprout 支出密钥的恢复由Argos的 Sprout 恢复路径/CLI 处理。

Argos读取钱包文件时不会修改它们。如果钱包已加密，请在提示时输入密码短语；它仅在内存中使用，不会写入磁盘。开始扫描前，请检查透明、Sapling和 Sprout 密钥数量。

查看密钥不能用于归集，因为它们无法授权支出。

### Sprout 说明

ZecWallet Lite 助记词不会派生 Sprout 密钥。这些密钥是单独生成的。请从zcashd`wallet.dat`，或 CLI 中的独立支出密钥恢复 Sprout。

如果文件已经具有可支出的票据数据和缓存见证，Argos可以在无需链扫描的情况下提供**归集 Sprout 资金**。否则，它可以通过 P2P 网络运行可恢复的全区块扫描。该扫描规模大且速度慢。它写入的检查点具备支出能力，因此应像保护原始钱包一样保护它。

Sprout 价值只能转入Sapling。在Sapling资金确认且可支出后，请使用支持已恢复Sapling账户的当前钱包，将其继续迁移至 **Ironwood**。不要停留在Sapling。

## 已恢复资金与 Ironwood 资金池

自 Ironwood（NU6.3）升级于 2026 年 7 月 28 日激活后，Orchard资金池仅可支出。没有新的价值可以进入该池，现有价值则通过旋转门迁出至 Ironwood。

如果你恢复的资金位于Orchard，请使用**当前钱包内置的迁移流程**将其迁移至 Ironwood。Orchard在NU6.3 后仅可迁出。

截至 2026 年 9 月 18 日，Zkool 6.30.0 为当前版本并支持 Ironwood。其迁移设计注重隐私，但这不等同于宣称符合ZIP 318。其他当前钱包可能采用ZIP 318 风格的分阶段迁移。请遵循已安装钱包当前的迁移界面和发行说明，而不要自行设定手动金额或时间安排。

分阶段迁移可能使用多笔交易，因此总费用可能高于一次性转账。

> **迁移金额是公开的。**当价值穿过旋转门时，金额和区块高度在链上可见，尽管发送方和接收方仍是屏蔽的。若隐私很重要，请使用钱包内置的私密/分阶段迁移策略，并在适当时使用 Tor 或其他可信隐私层等网络级隐私措施。网络隐私可以隐藏你的 IP 关联；但不会隐藏公开的穿越金额。

## 使用 ZExCavator 进行深度恢复

[ZExCavator](https://github.com/zingolabs/zexcavator)是一个**仍在开发中**的Zingo Labs恢复项目，目前专注于 ZecWallet Lite 钱包文件和钱包格式迁移。其 README 目前将资金恢复用户引导至 **Zingolib** 导出选项，而更完整的 ZeWIF 支持仍在开发中。

请将其视为高级/边缘情形工具，而非默认恢复路径。对于普通 ZecWallet Lite 助记词、钱包文件、zcashd`wallet.dat`和受支持的独立支出密钥，请先尝试Argos。依赖前，请在受维护钱包中验证 ZExCavator 恢复的任何内容。

## 没有助记词时的专业恢复

如果助记词或密钥已丢失，自托管恢复无法开始。一些处于这种情况的人会使用专业恢复公司来处理遗忘密码、硬件故障或无法读取的磁盘。

这条路径不同于恢复你仍持有的助记词。不要将可用助记词交给任何声称可以为你“恢复”它的人。这类服务的诈骗版本很常见。

[Unciphered](https://unciphered.com)是一家在内部开展此类工作的公司，曾获[Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/)等媒体报道。他们提供的是通用加密货币恢复服务，不是Zcash专用工具，并会收取服务费用。ZecHub不认可任何恢复公司。如果你选择此途径，请自行确认官方网站域名，并假定任何先向你发送私信的人都是骗子。

如果你仍有可用助记词或支出密钥，请改为先在自己的设备上使用Zkool或Argos等自托管恢复路径。

## YWallet已不再维护

YWallet曾长期是本页推荐的恢复工具，许多较旧的指南仍指向它。

其开发者现在表示，YWallet自 Ironwood 更新后不再支持Zcash，并将Zcash用户引导至仍在维护的继任者 **Zkool**。请保留旧YWallet助记词/密钥资料，但不要在YWallet中开始新的Zcash迁移。

如果你已有来自YWallet的Zcash恢复资料，请使用上述受支持的助记词/密钥路径在Zkool中恢复。

## 相关页面

- [钱包](/using-zcash/wallets) - 哪些钱包仍在维护及其 Ironwood 就绪情况，包括Argos
- [Ironwood](/zcash-tech/ironwood) - 此升级改变了什么，以及资金为何迁移
- [备注](/using-zcash/memos) - 加密备注的工作方式
- [查看密钥](/zcash-tech/viewing-keys) - 无支出权限的只读访问
- [轻钱包节点](/zcash-tech/lightwallet-nodes) - lightwalletd可使用的公共Argos端点
- [Argos用户指南](https://argos.sovright.com/guide.html) - 来自Sovright的官方演练
- [Naomi Brockwell 谈恢复工具](https://x.com/naomibrockwell/status/2079146521405333526) - Argos演练及关于专业恢复的说明
