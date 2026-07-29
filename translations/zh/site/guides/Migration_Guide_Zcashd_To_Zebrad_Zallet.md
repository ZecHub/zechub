# 迁移指南：从 zcashd 到 Zebrad/Zallet

Zcash 生态系统正在演进。由 *Electric Coin Company (ECC)* / *Zodl* 维护的传统 Zcashd 全节点，正逐步被 Zebra 和 Zallet 取代。

- Zebra 是由 Zcash Foundation 开发的 Zcash 协议现代 Rust 实现
- Zallet 是由 Zodl 开发的轻量级钱包，旨在与 Zebra 节点无缝对接

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

本指南将带你完成从 **Zcashd** 到 **Zebrad** 和 **Zallet** 的迁移过程，包括安装配置、钱包导入以及常见迁移问题的排查。

---

## Zcash 项目已正式宣布 zcashd 将于 2025 年弃用。

**弃用状态及其含义**

- Zcash 项目已正式宣布 zcashd 将于 2025 年弃用。
- 全节点正在迁移到 Zebrad（一个 Rust 实现），而 Zallet 则旨在接替 zcashd 的钱包组件。 
- 为此，Zebra 项目正在跟踪一个“Zcashd Deprecation”里程碑，以确保兼容性、RPC 迁移和生态支持。
- 对于许多 RPC 方法，Zebrad/Zallet 的目标是成为可直接替换的方案（模拟或匹配原有行为）。其他方法则会发生变化，或可能不被支持。

**为什么要迁移——不只是因为弃用**

即使不考虑弃用，迁移也有充分理由：
- 安全性与稳健性：Rust 的内存安全特性和现代工具链可降低漏洞风险。
- 性能与效率：Zebrad 为并行处理而设计，资源使用更高效，同步速度更快。
- 模块化架构：将节点逻辑（Zebrad）与钱包界面（Zallet）分离，可带来更清晰的边界和更好的升级路径。
- 面向未来的生态兼容性：工具、增强功能以及 Zcash 生态的其他部分将越来越多地面向 Zebrad/Zallet。
- 更省心：避免继续运行已弃用、无人支持的组件。

### 现在开始进入迁移指南

**1. 备份一切**
* 备份 zcashd 节点中的 wallet.dat（或任何其他钱包文件 / 密钥存储）。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* 保存你的 zcash.conf 和所有自定义设置。
* 导出你使用的所有 RPC 脚本或自动化程序副本。
* 验证备份是否有效（例如在其他环境中尝试打开或检查它们）。
* 查看你当前依赖哪些 JSON-RPC 方法。
* 与 [Zcash 支持网站](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 上维护的计划兼容性表进行对照 
* 为变更或缺失的方法做好准备（某些方法可能需要变通方案或适配）。

**2. 系统要求与磁盘空间**
* 确保你有足够的磁盘空间（Zcash 链体积很大）。至少预留 10 GB 可用磁盘空间。
* 确保你的机器具备稳定的网络、CPU 和 RAM。
* 需要互联网连接 
* 如果你计划从源码编译，请确保已安装 Rust 和 Cargo。

**3. 安装 / 设置 Zebrad**
你可以下载预编译二进制文件，也可以从源码构建。
* Zcash Foundation 会发布 Zebra 的版本和二进制文件。例如，你可以使用安装脚本，或下载适用于你操作系统的相应二进制文件。

* 请注意，在较新的 Zebra 版本中，[RPC 端点在 Docker 中默认不再启用。](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**选项 A：通过预编译二进制文件安装**  
在 **Linux**/**macOS** 上：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

这将安装最新稳定版的 zebrad。

**选项 B：从源码构建**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

构建完成后，将二进制文件移动到你的路径中：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. 配置与启动**  
生成默认配置：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

根据你的偏好编辑 **zebrad.toml**（监听地址、端口、状态目录、缓存）。

**启动节点：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

节点将从创世区块开始同步——根据硬件和网络情况，预计需要数小时（或更久）。

**5. 安装 / 设置 Zallet（钱包）**

Zallet 旨在替代 zcashd 的钱包部分。

请查看 Zallet 的 GitHub / 发布页面以获取二进制文件。

**或者从源码构建：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* 启动 GUI 或 CLI（取决于你的安装方式）。
* 将其配置为通过 RPC 或 API 端点连接到本地 Zebrad 节点。

**6. 将你的 zcashd 钱包导入到 Zallet**  
通过导出私钥

在 zcashd 上，导出你的私钥：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* 在 Zallet 中，选择 Import Keys 或类似选项。
* 将其指向 **zcashd_keys.txt**。 
* Zallet 应能够解析并导入 ZEC 地址及其关联密钥。

**通过助记词**（如适用）

* 如果你的钱包支持助记词备份，请在 Zallet 中使用 Restore from Seed Phrase。
* 这仅在你的 zcashd 钱包是由助记词派生而来时才有效（或你具备助记词转换方式）。

**钱包重扫与同步**

* 导入密钥后，Zallet 将通过 Zebrad 触发对区块链的重新扫描。
* 请留出一些时间，让 Zallet 重建你的余额和交易历史。

**7. 验证余额和同步状态**

导入完成后，Zallet 将连接到你的 Zebrad 节点并重新扫描区块链。
当同步完成后，你的余额和交易应与之前完全一致地显示出来。

你可以通过运行以下命令来验证节点的同步状态：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

或者查看日志。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. 故障排查**

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
        <td className="px-6 py-4">端口被占用或配置错误</td>
        <td className="px-6 py-4">检查 **zebrad.toml** 并使用空闲端口</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">同步缓慢</td>
        <td className="px-6 py-4">网络拥堵</td>
        <td className="px-6 py-4">确保网络连接稳定，并重启 Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">钱包缺少交易记录</td>
        <td className="px-6 py-4">密钥导入不完整</td>
        <td className="px-6 py-4">重新导入密钥，或在 Zallet 中重新扫描</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet 无法连接到节点</td>
        <td className="px-6 py-4">节点未运行或端点错误</td>
        <td className="px-6 py-4">启动 Zebrad 并确认 RPC 端口正确</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet 崩溃</td>
        <td className="px-6 py-4">构建版本过旧</td>
        <td className="px-6 py-4">更新到 GitHub 上的最新版本</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 结论**

从 zcashd 迁移到 Zebrad 和 Zallet，将为你带来更快、更安全、更现代的 Zcash 使用体验。
借助基于 Rust 的安全性、模块化设计以及更完善的工具链，这套方案可确保你的节点和钱包在不断演进的 Zcash 生态中始终面向未来。

提示：请将钱包密钥离线保存，并定期备份你的 Zallet 数据。
访问 [zebra.zfnd.org](https://zebra.zfnd.org) 和 [zallet.zfnd.org](https://zallet.zfnd.org) 获取更新和社区支持。
