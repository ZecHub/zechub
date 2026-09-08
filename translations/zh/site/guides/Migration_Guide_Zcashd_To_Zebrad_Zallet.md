# 迁移指南：从 zcashd 到 Zebrad/Zallet

由 *Electric Coin Company (ECC)* / *Zodl* 维护的传统 zcashd 全节点已被 Zebra 和 Zallet 取代。zcashd 已于 2026 年 7 月 18 日达到支持终止停机状态，现已无法运行。

- Zebra 是由 Zcash Foundation 开发的 Zcash 协议现代 Rust 实现
- Zallet 是由 Zodl 开发的轻量级钱包，可与 Zebra 节点无缝对接

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![示意图：zcashd 拆分为负责节点职责的 zebrad 和负责钱包职责的 Zallet](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

本指南将带您完成从 **Zcashd** 到 **Zebrad** 和 **Zallet** 的迁移，包括设置、钱包导入及常见迁移问题的排查。

---

## zcashd 已于 2026 年 7 月 18 日停止运行

**这意味着什么**

- zcashd 已于 2026 年 7 月 18 日达到支持终止停机状态。它将不再同步至链尖，也无法发送或接收资金。这已完成，并非计划中的变更。
- zcashd 的两项职责现已拆分：**zebrad** 是全节点，**Zallet** 是钱包。
- Zallet 目前处于 **beta** 阶段。版本之间可能发生破坏性变更，且部分 zcashd JSON-RPC 方法尚未实现。在依赖特定调用前，请查看[方法状态矩阵](https://zcash.github.io/zallet/)。
- 如果您仍持有 **Sprout** 资金，请先阅读第 6 步中的警告。Zallet 不支持 Sprout 资金池，而转移这些资金的通常方式需要运行中的 zcashd。

**为何迁移——不仅仅是因为弃用**

即使不考虑弃用因素，迁移也有充分理由：
- 安全性与稳健性：Rust 的内存安全性和现代工具链可降低漏洞风险。
- 性能与效率：Zebrad 专为并行处理、更高效的资源使用和更快同步而设计。
- 模块化架构：将节点逻辑（Zebrad）与钱包 UI（Zallet）分离，可提供更清晰的边界和更好的升级路径。
- 未来生态系统兼容性：工具、增强功能及 Zcash 生态系统的其余部分将越来越多地面向 Zebrad/Zallet。
- 安心无忧：避免受困于已弃用且不受支持的组件。

### 现在让我们深入了解迁移指南

**1. 备份所有内容**
* 备份 zcashd 节点中的 wallet.dat（或任何其他钱包文件 / 密钥存储）。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* 保存您的 zcash.conf 和所有自定义设置。
* 导出您使用的所有 RPC 脚本或自动化工具副本。
* 验证备份有效（例如，在另一环境中尝试打开或检查它们）。
* 检查您当前依赖的 JSON-RPC 方法。
* 与 [Zcash 支持网站](https://z.cash/support/zcashd-deprecation/)维护的计划兼容性表进行比较。
* 为变更或缺失的方法做好准备（有些可能需要变通方案或适配）。

**2. 系统要求与磁盘空间**
* 磁盘空间是人们容易低估的要求。Zcash 链在 2026 年 8 月已超过 **270 GB**，因此请预留至少 **300 GB** 可用空间；如有条件，请使用 SSD。
* 确保您的机器具备稳定的网络、CPU 和 RAM。
* 互联网连接
* 如果计划从源码编译，请确保已安装 Rust 和 Cargo。

**3. 安装 / 设置 Zebrad**
您可以下载预编译二进制文件，也可以从源码构建。
* Zcash Foundation 会发布 Zebra 的版本和二进制文件。例如，您可以使用安装脚本，或下载适用于您操作系统的二进制文件。

* 请注意，在较新的 Zebra 版本中，[Docker 默认不再启用 RPC 端点。](https://zfnd.org/zebra-2-3-0-release/)

**选项 A：通过预编译二进制文件安装**  
在 **Linux**/**macOS** 上：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

这将安装最新版稳定版 zebrad。

**选项 B：从源码构建**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

构建完成后，将二进制文件移动到您的路径中：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![迁移 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. 配置与启动**  
生成默认配置：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![迁移2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

根据您的偏好编辑 **zebrad.toml**（监听地址、端口、状态目录、缓存）。

**启动节点：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![图片](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

节点将从创世区块开始同步——具体需要数小时甚至更久，取决于硬件和网络状况。

**5. 安装 / 设置 Zallet（钱包）**

Zallet 旨在替代 zcashd 的钱包部分。

请查看 Zallet GitHub / 发布页面以获取二进制文件。

**或从源码构建：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![图片](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* 启动 GUI 或 CLI（取决于您的安装方式）。
* 将其配置为通过 RPC 或 API 端点连接至本地 Zebrad 节点。

**6. 将您的 zcashd 钱包导入 Zallet**

您无需运行 zcashd。Zallet 可直接读取 `wallet.dat` 文件，这一点至关重要，因为 zcashd 已无法启动。

> **保留 `wallet.dat`。** 迁移过程会报告任何无法在 Zallet 钱包中表示的内容，而不会导入它们；这些密钥材料届时只存在于 `wallet.dat` 中。迁移后请勿删除它。

请先运行 `zallet init-wallet-encryption`。Zallet 会将密钥材料加密至 age 身份文件，而该身份文件必须在导入任何密钥前存在。

随后转换您的配置和钱包：

```bash
# 将 zcash.conf 转换为 zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# 将 wallet.dat 导入 Zallet 的 wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` 仅存在于启用了 `zcashd-import` 功能的构建版本中；读取 `wallet.dat` 需要 Berkeley DB 6.2 中的 `db_dump` 工具，该版本正是 zcashd 所使用的版本。如果您有多个钱包文件，请对每个文件分别运行一次该命令，并在后续运行时添加 `--allow-multiple-wallet-imports`；每个文件都会成为一组独立账户。您的 `rpcuser` 和 `rpcpassword` 不会被迁移，因为 Zallet 的 JSON-RPC 默认使用 cookie 身份验证；如有需要，可通过 `zallet add-rpc-user` 添加凭据。

**将被迁移的内容**

* 助记词种子及其派生密钥，账户将重建以匹配 zcashd 钱包
* 独立导入的 Sapling 支出密钥和透明地址密钥
* 包含公钥或赎回脚本的透明地址仅监视条目
* 账户生日高度，以便链扫描从正确的区块高度开始

**不会被迁移的内容。** 这些内容会以数量报告，而不会被导入：

* **Sprout 支出密钥和资金。** Zallet 不支持 Sprout 资金池。文档记载的方案是在弃用 zcashd 前使用它转出 Sprout 资金，而如今已无法实现。如果这影响到您，请在采取任何其他操作前，前往 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) 或[社区论坛](https://forum.zcashcommunity.com/)咨询。
* 地址簿条目
* 未存储公钥或赎回脚本的仅监视条目，以及使用未压缩公钥的条目
* Regtest 钱包

**后续备份。** 单独的助记词并非完整备份，因为导入的密钥仅存在于钱包数据库中。请妥善保留 `wallet.db`、由 `keystore.encryption_identity` 选项指定的 age 加密身份文件、您的助记词短语以及原始 `wallet.dat` 的安全副本。请注意，`wallet.db` 本身并未加密：其中以明文保存您的交易历史和查看密钥，因此请将备份存放在安全的位置。

**钱包重新扫描与同步**

* 导入密钥后，Zallet 将通过 Zebrad 触发链重新扫描。
* 请留出一些时间，让 Zallet 重建您的余额和交易历史。

**7. 验证余额和同步**

导入后，Zallet 将连接至您的 Zebrad 节点并重新扫描区块链。
同步完成后，您的余额和交易应与之前完全一致。

您可以通过运行以下命令验证节点的同步状态：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![图片](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

或查看日志。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![图片](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. 故障排除**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">问题</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">可能原因</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">解决方案</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad 无法启动</td>
        <td className="px-6 py-4">端口正在使用或配置错误</td>
        <td className="px-6 py-4">检查 **zebrad.toml** 并使用未占用的端口</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">同步缓慢</td>
        <td className="px-6 py-4">网络拥塞</td>
        <td className="px-6 py-4">确保网络稳定，然后重启 Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">钱包缺少交易</td>
        <td className="px-6 py-4">密钥导入不完整</td>
        <td className="px-6 py-4">重新导入密钥，或在 Zallet 中重新扫描</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet 无法连接至节点</td>
        <td className="px-6 py-4">节点未运行或端点错误</td>
        <td className="px-6 py-4">启动 Zebrad 并确认 RPC 端口正确</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet 崩溃</td>
        <td className="px-6 py-4">构建版本过时</td>
        <td className="px-6 py-4">从 GitHub 更新至最新版本</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 结论**

从 zcashd 迁移至 Zebrad 和 Zallet，可为您带来更快速、更安全、更现代的 Zcash 使用体验。
凭借基于 Rust 的安全性、模块化设计和更完善的工具，此设置可确保随着 Zcash 生态系统持续演进，您的节点和钱包始终面向未来。

提示：请将钱包密钥保持离线，并定期备份您的 Zallet 数据。
请访问 [zebra.zfnd.org](https://zebra.zfnd.org) 了解 Zebra；请访问 [The Zallet Book](https://zcash.github.io/zallet/) 或 [Zallet 仓库](https://github.com/zcash/zallet) 了解 Zallet。The Zallet Book 中的[从 zcashd 迁移](https://zcash.github.io/zallet/)章节是第 6 步的权威参考。
