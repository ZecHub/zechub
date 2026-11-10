# 如何在 Akash Network 上运行 Zebra

使用 [Akash Console](https://console.akash.network) 部署 Zebra Zcash 全节点的分步指南。

### 你将部署的内容

一个完整的 Zebra 节点，将会：

-> 同步整个 Zcash blockchain（主网为 100GB+，测试网约为 40GB）

-> 每月成本约为 $15，具体取决于 AKT 代币价格

-> 完整同步需要数小时到数天

-> 使用 4 个 vCPU、16GB RAM、350GB 存储空间（主网），或 2 个 vCPU、8GB RAM、50GB 存储空间（测试网）


### 重要：Akash 上的端口映射

当你在 Akash 上暴露端口时（例如用于 Zebra P2P 的端口 8233），它**不会绑定到提供商公共 IP 上的该确切端口**。相反，提供商会分配一个随机高位端口（例如 31234 或 42567），并将其反向代理到你容器的 8233 端口。

这是有意设计的——提供商运行多个部署，如果每个人都直接尝试使用端口 8233，就会产生冲突。

**这对你意味着：**

-> 你在 SDL 中配置端口 8233（Zebra 的标准 P2P 端口）

-> Akash 会给你一个类似 *provider.com:31234* 的 URI

-> 其他 Zcash 节点会通过 *provider.com:31234* 连接到你

-> 在你的容器内部，Zebra 仍会监听 8233 端口


这会自动处理。只需使用 Akash 提供给你的 URI。

### 前置条件

1. 已安装 **Keplr Wallet** 浏览器扩展程序（Chrome/Brave/Firefox）
2. **AKT 代币** - 从交易所获取 50-100 AKT（Coinbase、Kraken、Osmosis）
3. 用 **5 分钟** 操作 Console UI

#### 第 1 步：连接你的钱包

-> 前往 [https://console.akash.network](https://console.akash.network)

-> 点击右上角的 **"连接钱包"**

-> 选择 **Keplr**（或你偏好的 Cosmos 钱包）

-> 当 Keplr 弹出时批准连接


你的 AKT 余额应显示在右上角。如果为零，请先为你的钱包充值。

#### 第 2 步：创建部署

-> 点击 **"部署"** 按钮（页面中央的大蓝色按钮）

-> 选择 **"构建你的模板"**（或直接跳至上传 SDL）


##### 选项 A：上传 SDL 文件（推荐）

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### 选项 B：使用 SDL 编辑器

如果你想手动粘贴 [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)：

-> 复制 *zebra-akash.yml* 的内容

-> 粘贴到 SDL 编辑器中

-> 按需修改（请参阅下方配置部分）

-> 点击 **"创建部署"**


#### 第 3 步：审核并批准押金

Console 将向你显示：

-> **部署押金**：约 5 AKT（关闭部署时会返还给你）

-> **预估成本**：基于你的 SDL 定价

点击 **"批准"**，并在 Keplr 中签署交易。

#### 第 4 步：选择提供商

约 30 秒后，你将看到来自提供商的出价。每个出价会显示：

-> **每区块价格**（以 AKT 或 USDC 计）

-> **每月预估成本**

-> **提供商详情**（运行时间、区域等）


**不要只选择最便宜的。** 请检查：

-> 运行时间百分比（目标为 > 95%）

-> 区域（离你越近延迟越低，但对 blockchain 节点影响不大）

-> 已审计状态（绿色勾选标记 = 更值得信赖）


在你选择的提供商上点击 **"接受出价"**，并在 Keplr 中签名。

#### 第 5 步：等待部署

Console 将会：

-> 与你选择的提供商创建租约

-> 发送清单（告知提供商要运行什么）

-> 启动你的容器

这需要 1-2 分钟。你会在 UI 中看到状态更新。

#### 第 6 步：验证它正在运行

部署完成后，你将看到：

-> **服务** 选项卡：显示你的 *zebra* 服务及其状态

-> **日志** 选项卡：实时容器日志

-> **租约** 选项卡：有关你部署的详情（DSEQ、提供商、成本）


##### 检查日志

点击 **日志**，你应该会看到 Zebra 正在启动：

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

同步将根据网络情况需要**数小时到数天**。请留意：

-> 不断增加的区块高度

-> 对等节点连接（应有 10-30 个对等节点）

-> 没有重复错误


#### 第 7 步：获取你节点的地址

点击 **租约** 选项卡，然后点击 **URI**。

你将看到类似以下内容：

```bash
zebra-8233: provider-hostname.com:31234
```

这是你节点的**公共 P2P 端点**。其他 Zcash 节点将通过此地址连接到你。

**请注意端口映射：** 你在 SDL 中配置了端口 8233，但 Akash 将其分配到不同的公共端口（本例中为 31234）。这是正常的——如果这让你感到困惑，请参阅顶部的 "Akash 上的端口映射" 部分。你的节点可通过 Akash 在此处显示的任何端口访问，不一定是 8233。

如果你启用了 RPC（默认在 SDL 中被注释掉），你也会在此处看到具有自己映射端口的 RPC 端点。

### 配置选项

#### 切换到测试网

SDL 默认使用主网。要改用测试网：

-> 在 *env* 部分中**注释掉主网配置**：

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **取消注释测试网配置**：

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> 在 *expose* 部分中**更新暴露的端口**：

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **可选：减少资源**，在 *profiles.compute.zebra.resources* 中用于测试网：

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **可选：降低定价**，在 *profiles.placement.akash.pricing* 中：

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### 启用 RPC 访问

出于安全考虑，RPC 默认被禁用。要启用它：

**对于主网：**

-> 在 *env* 部分中取消注释：

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> 在 *expose* 中取消注释主网 RPC 端口：

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**对于测试网：**

-> 在 *env* 部分中取消注释：

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> 在 *expose* 中取消注释测试网 RPC 端口：

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**：如果你为 RPC 设置 *global: true*，你会将它暴露到互联网。Zebra 默认使用 cookie 身份验证，但仍然——除非你清楚自己在做什么，否则不要这样做。

**端口映射提醒**：即使你全局暴露 RPC，Akash 也会将它映射到一个随机高位端口（不是 8232/18232）。请检查部署中的 URI 以查看实际公共端点。对于 *global: false*（推荐），RPC 端点只能在 Akash 部署网络内访问，无法从公共互联网访问。

#### 启用指标（Prometheus）

要抓取用于监控的指标：

-> 在 *env* 中取消注释：

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> 在 *expose* 中取消注释指标端口：

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### 调整资源/定价

如果你没有获得出价，或想优化成本：

**对于低规格提供商**，请在 *profiles.compute.zebra.resources* 部分中降低：

-> CPU：*units: 2*（合理同步速度的最低配置）

-> 内存：*size: 12Gi*（稳定性的最低配置）

-> 存储空间：*size: 120Gi*（主网最低配置）

**要吸引更多出价**，请在 *profiles.placement.akash.pricing* 中提高：

-> 主网：尝试 *amount: 1000000* uakt/block

-> 测试网：尝试 *amount: 1000000* uakt/block

### 更新你的部署

部署后需要更改配置吗？

-> 前往 Console 中的 **我的部署**

-> 找到你的 Zebra 部署

-> 点击 **"更新部署"**

-> 编辑 SDL

-> 点击 **"更新"**，并在 Keplr 中批准

**注意**：更新将重启你的容器。节点将从其保存的状态（持久化存储）恢复，但预计会有 1-2 分钟的停机时间。

### 监控

#### 通过 Console

-> **日志选项卡**：实时容器日志

-> **Shell 选项卡**：在容器内获取 shell（适用于调试）

-> **事件选项卡**：Kubernetes 事件（除非出现故障，否则大多没什么用）


#### 通过 RPC（如果已启用）

如果你启用了 RPC，你可以像查询普通 zebrad 全节点一样查询你的节点（因为它就是！）

### 关闭你的部署

当你完成使用或想停止付费时：

-> 前往 **我的部署**

-> 找到你的 Zebra 部署

-> 点击 **"关闭部署"**

-> 在 Keplr 中确认并签名

你的 5 AKT 押金将被退还。**持久化存储**应由提供商保留，但不要依赖它——把它当作任何其他云提供商一样对待。

### 故障排除

#### "资金不足"错误

你需要更多 AKT。为你的 Keplr 钱包充值。

#### 没有显示出价

可能是：

-> 你的定价过低（提高 SDL 中的 *amount*）

-> 你的资源需求对于可用提供商而言过高（降低 CPU/内存/存储空间）

-> 等待更久（有时出价需要 60-90 秒才会出现）


#### 部署卡在 "pending"

提供商可能遇到了问题。关闭部署并尝试其他提供商。

#### Zebra 日志显示 "未连接任何对等节点"

这在最初几分钟内是正常的。Zebra 将自动发现对等节点。如果在 10+ 分钟后仍然持续，你可能遇到了网络问题（在 Akash 上不太可能）。

#### 日志中出现 "内存不足" 错误

你在 RAM 上省得太过头了。关闭部署，并使用至少 12Gi 内存（推荐 16Gi）重新部署。

#### 同步耗时太久

先定义 "太久"：

-> **数小时**：正常

-> **数天**：从头同步主网也正常

-> **数周**：有问题，请检查日志中的错误


### 成本管理

在 Console 中监控你的支出：

-> **我的部署** -> 你的部署 -> 显示 "每月成本" 估算

-> 你的 Keplr 钱包余额会随时间减少


当你的余额不足时，Akash 将自动关闭你的部署。请**定期为你的钱包充值**或设置提醒。

#### 降低成本

-> 将**测试网**用于非生产测试（便宜 50%）

-> 如果不需要快速同步，则降低 CPU/内存

-> **选择更便宜的提供商**（并不总是明智——运行时间很重要）


### 主网与测试网

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

如果你只是测试部署流程，请从测试网开始。有关配置，请参阅上方的 "切换到测试网" 部分。

### 其他资源

**Akash Console**：[https://console.akash.network](https://console.akash.network)

**Akash 文档**：[https://akash.network/docs/](https://akash.network/docs/)

**Zebra 文档**：[https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash 浏览器**：[https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**：[https://discord.akash.network](https://discord.akash.network)（用于提供商问题）
