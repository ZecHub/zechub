# 如何在 Akash Network 上运行 Zebra

使用 [Akash Console](https://console.akash.network) 部署 Zebra Zcash 全节点的分步指南。

### 你将部署什么

一个完整的 Zebra 节点，它将会：

-> 同步整个 Zcash 区块链（主网 100GB+，测试网约 40GB）

-> 每月成本大约为 $15，具体取决于 AKT 代币价格

-> 完全同步需要数小时到数天

-> 使用 4 个 vCPU、16GB RAM、350GB 存储（主网）或 2 个 vCPU、8GB RAM、50GB（测试网）


### 重要说明：Akash 上的端口映射

当你在 Akash 上暴露一个端口时（例如 Zebra P2P 的 8233 端口），它**不会绑定到提供商公网 IP 上的这个确切端口**。相反，提供商会分配一个随机的高位端口（如 31234 或 42567），并通过反向代理将其转发到你容器的 8233 端口。

这是 Akash 的设计使然——提供商会运行多个部署，如果每个人都直接使用 8233 端口，就会发生冲突。

**这对你意味着：**

-> 你在 SDL 中配置端口 8233（Zebra 的标准 P2P 端口）

-> Akash 会给你一个类似 *provider.com:31234* 的 URI

-> 其他 Zcash 节点会通过 *provider.com:31234* 连接到你

-> 在你的容器内部，Zebra 仍然监听 8233


这些都会自动处理。你只需要使用 Akash 提供给你的 URI。

### 前置条件

1. 已安装 **Keplr Wallet** 浏览器扩展（Chrome/Brave/Firefox）
2. **AKT 代币** —— 从交易所获取 50-100 AKT（Coinbase、Kraken、Osmosis）
3. **5 分钟** 用来点击完成 Console 界面操作

#### 第 1 步：连接你的钱包

-> 前往 [https://console.akash.network](https://console.akash.network)

-> 点击右上角的 **"Connect Wallet"**

-> 选择 **Keplr**（或你偏好的 Cosmos 钱包）

-> 当 Keplr 弹出时批准连接


你的 AKT 余额应该会显示在右上角。如果是零，请先给钱包充值。

#### 第 2 步：创建部署

-> 点击 **"Deploy"** 按钮（页面中央的大蓝色按钮）

-> 选择 **"Build your template"**（或直接跳到上传 SDL）


##### 选项 A：上传 SDL 文件（推荐）

[![在 Akash 上部署](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### 选项 B：使用 SDL 编辑器

如果你想手动粘贴[该 SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)：

-> 复制 *zebra-akash.yml* 的内容

-> 粘贴到 SDL 编辑器中

-> 按需修改（见下方配置部分）

-> 点击 **"Create Deployment"**


#### 第 3 步：检查并批准押金

Console 会向你显示：

-> **部署押金**：约 5 AKT（关闭部署时会退还给你）

-> **预估成本**：基于你的 SDL 定价

点击 **"Approve"** 并在 Keplr 中签署交易。

#### 第 4 步：选择提供商

约 30 秒后，你会看到来自提供商的竞标。每个竞标会显示：

-> **每区块价格**（以 AKT 或 USDC 计）

-> **月度预估成本**

-> **提供商详情**（在线率、区域等）


**不要只选最便宜的。** 请检查：

-> 在线率 %（目标 > 95%）

-> 区域（离你更近 = 延迟更低，但对区块链节点影响不大）

-> 审核状态（绿色勾号 = 更值得信赖）


在你选择的提供商上点击 **"Accept Bid"**，然后在 Keplr 中签名。

#### 第 5 步：等待部署

Console 将会：

-> 使用你选择的提供商创建租约

-> 发送 manifest（告诉提供商运行什么）

-> 启动你的容器

这个过程需要 1-2 分钟。你会在界面中看到状态更新。

#### 第 6 步：验证它是否正在运行

部署完成后，你将看到：

-> **Services** 标签页：显示你的 *zebra* 服务及其状态

-> **Logs** 标签页：实时容器日志

-> **Leases** 标签页：关于你的部署的详细信息（DSEQ、提供商、成本）


##### 检查日志

点击 **Logs**，你应该会看到 Zebra 正在启动：

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

同步将耗时**数小时到数天**，具体取决于网络。请留意：

-> 区块高度持续增加

-> 对等节点连接数（应为 10-30 个节点）

-> 没有重复出现的错误


#### 第 7 步：获取你的节点地址

点击 **Leases** 标签页，然后点击 **URIs**。

你会看到类似下面的内容：

```bash
zebra-8233: provider-hostname.com:31234
```

这就是你的节点的**公网 P2P 端点**。其他 Zcash 节点会通过这个地址连接到你。

**注意端口映射：** 你在 SDL 中配置的是 8233 端口，但 Akash 将其分配到了另一个公网端口（本例中是 31234）。这是正常现象——如果你对此感到困惑，请查看顶部的“Akash 上的端口映射”部分。你的节点可通过 Akash 在这里显示的端口访问，不一定是 8233。

如果你启用了 RPC（在 SDL 中默认被注释掉），你也会在这里看到 RPC 端点及其对应的映射端口。

### 配置选项

#### 切换到测试网

SDL 默认使用主网。若要使用测试网：

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

-> **可选：** 在 *profiles.compute.zebra.resources* 中为测试网**降低资源配置**：

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **可选：** 在 *profiles.placement.akash.pricing* 中**降低价格**：

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### 启用 RPC 访问

出于安全考虑，RPC 默认禁用。若要启用：

**对于主网：**

-> 在 *env* 部分取消注释：

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

-> 在 *env* 部分取消注释：

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

**警告**：如果你为 RPC 设置 *global: true*，那么它将暴露到互联网。Zebra 默认使用 cookie 身份验证，但即便如此——除非你清楚自己在做什么，否则不要这么做。

**端口映射提醒**：即使你将 RPC 全局暴露，Akash 也会把它映射到一个随机高位端口（而不是 8232/18232）。请检查你部署中的 URIs，以查看实际的公网端点。对于 *global: false*（推荐），RPC 端点只能在 Akash 部署网络内部访问，无法从公网访问。

#### 启用指标（Prometheus）

要抓取监控指标：

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

如果你收不到竞标，或者想优化成本：

**针对低配置提供商**，在 *profiles.compute.zebra.resources* 部分降低配置：

-> CPU：*units: 2*（保持合理同步速度的最低值）

-> 内存：*size: 12Gi*（保证稳定性的最低值）

-> 存储：*size: 120Gi*（主网最低值）

**为了吸引更多竞标**，在 *profiles.placement.akash.pricing* 中提高价格：

-> 主网：尝试 *amount: 1000000* uakt/block

-> 测试网：尝试 *amount: 1000000* uakt/block

### 更新你的部署

部署后需要修改配置？

-> 前往 Console 中的 **My Deployments**

-> 找到你的 Zebra 部署

-> 点击 **"Update Deployment"**

-> 编辑 SDL

-> 点击 **"Update"** 并在 Keplr 中批准

**注意**：更新会重启你的容器。节点会从已保存的状态（持久化存储）继续运行，但预计会有 1-2 分钟停机时间。

### 监控

#### 通过 Console

-> **Logs 标签页**：实时容器日志

-> **Shell 标签页**：进入容器内部 shell（便于调试）

-> **Events 标签页**：Kubernetes 事件（除非出问题，否则大多没什么用）


#### 通过 RPC（如果已启用）

如果你启用了 RPC，你可以像查询普通的 zebrad 全节点一样查询你的节点（因为它本来就是！）

### 关闭你的部署

当你完成使用或想停止付费时：

-> 前往 **My Deployments**

-> 找到你的 Zebra 部署

-> 点击 **"Close Deployment"**

-> 在 Keplr 中确认并签名

你的 5 AKT 押金会被退还。**持久化存储**理论上应由提供商保留，但不要依赖它——把它当作任何其他云服务提供商来对待。

### 故障排查

#### “Insufficient funds” 错误

你需要更多 AKT。给你的 Keplr 钱包充值。

#### 没有显示竞标

可能是以下原因之一：

-> 你的定价太低了（提高 SDL 中的 *amount*）

-> 你的资源需求对可用提供商来说太高了（降低 CPU/内存/存储）

-> 再多等一会儿（有时竞标需要 60-90 秒才会出现）


#### 部署卡在 “pending”

提供商可能出现了问题。关闭该部署并尝试其他提供商。

#### Zebra 日志显示 “No peers connected”

这在最初几分钟是正常的。Zebra 会自动发现对等节点。如果 10+ 分钟后仍然如此，可能是网络问题（在 Akash 上不太可能）。

#### 日志中出现 “Out of memory” 错误

你在 RAM 上省过头了。关闭部署，并至少使用 12Gi 内存重新部署（推荐 16Gi）。

#### 同步耗时太久

先定义一下“太久”：

-> **数小时**：正常

-> **数天**：从零开始同步主网也正常

-> **数周**：有问题，检查日志中的错误


### 成本管理

在 Console 中监控你的支出：

-> **My Deployments** -> 你的部署 -> 显示 “Cost per month” 预估值

-> 你的 Keplr 钱包余额会随着时间推移而减少


当你的余额较低时，Akash 会自动关闭你的部署。**请定期给钱包充值**或设置提醒。

#### 降低成本

-> **使用测试网** 进行非生产测试（便宜 50%）

-> 如果你不需要快速同步，**降低 CPU/内存**

-> **选择更便宜的提供商**（未必明智——在线率也很重要）


### 主网 vs 测试网

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

如果你只是测试部署流程，建议先从测试网开始。配置方法见上方“切换到测试网”部分。

### 更多资源

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash 文档**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra 文档**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash 浏览器**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)（用于提供商问题）
