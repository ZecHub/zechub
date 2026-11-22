# 如何在 Akash Network 上运行 Zebra

在 Akash 上部署 Zebra Zcash 全节点的分步指南。

### 你将部署的内容

一个完整的 Zebra 节点，将会：

-> 同步整个 Zcash blockchain（主网为 100GB+，测试网约为 40GB）

-> 每月成本约为 $15，具体取决于 AKT 代币价格

-> 完整同步需要数小时到数天

-> 使用 4 个 vCPU、16GB RAM、350GB 存储空间（主网），或 2 个 vCPU、8GB RAM、50GB 存储空间（测试网）


awesome-akash 模板现在固定使用 **Zebra 7.0.0**（绝不使用 `:latest`）。它在内部启用 Prometheus（`9999`）和 health（`8080`），为同机部署的 **lightwalletd** 在 gRPC **9067** 上启用内部 JSON-RPC，并启用功能标志 `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`。

如需运行速度更快的裁剪版 Mainnet 节点，请参阅 [如何在 Akash](/guides/akash-network-zakura) 上运行 Zakura。如需使用一次性的 Regtest 仪表板，请参阅 [Thus Spoke Zakura 在 Akash](/guides/thus-spoke-zakura-akash) 上的内容。

### Akash 如何发布端口

SDL 中的数字（`port` / `as`）是**容器端口**。Zebra仍监听 **8233**，lightwalletd监听 **9067**，健康检查使用 **8080**。这些数字适用于进程以及同一部署中的其他服务（`zebra:8232`）。

它们**不是**服务提供商公共 IP 上的端口。

**默认（此模板）：**没有专用 IP。对于每个 `global: true` TCP 暴露，提供商会将共享主机上的一个**随机高位端口**映射到你的容器端口。租用建立后，Console/Air **Leases → URIs** 会列出实际端点，例如：

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

对等节点和钱包会使用**这些**主机:端口值。复制你需要的暴露服务的 URI（P2P 或 lightwalletd）。如果你设置了 `ZEBRA_NETWORK__EXTERNAL_ADDR`，请将其设为映射后的 P2P URI（`provider.example:31482`），而不是 `…:8233`。

**HTTP**（搭配 `http_options` 的 `as: 80`，用于 Thus Spoke 仪表板）：许多提供商会发布**入口主机名**（通常使用 80/443 端口），而不是随机 TCP 端口。在浏览器中打开该服务的 URI。

**内部**（`global: false` 或 `to: service: lightwalletd`）：仅集群 DNS（`zebra:8232`）。没有公共 URI。

**专用 IP**（SDL 中的 `endpoints` / `kind: ip`）是**高级附加项**。它们可以固定一个公共 IP，有时还能固定该 IP 上的 `as` 端口。这些模板**不会**请求此项。如果你想要稳定的 `host:8233`，可以之后自行添加；但要预计会产生额外费用，而且可竞价的提供商会更少。

### 使用哪个网站（支付）

SDL 保持不变。两个 Akash Web UI 的**付款方式**不同。

| 网站 | 支付方式 | 钱包 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 传统网页结账（Console 提供的银行卡 / 法币渠道） | Console 账户 |
| [air.akash.network](https://air.akash.network) | 原生 Akash 链支付（AKT / ACT） | **Keplr** |

如果你想用 Keplr 进行链上支付，请使用 **Air**。如果你想采用传统的网页支付流程，请使用 **Console**。不要指望在 Console 上以 Keplr 进行原生结算。

### 前置条件

**如果你在 Console（网页结账）中支付**

1. [console.akash.network](https://console.akash.network) 处的 Console 账户
2. Console UI 接受的支付方式
3. 在 UI 中操作几分钟

**如果你在 Air 上支付（原生 Akash / Keplr）**

1. **Keplr** 浏览器扩展（Chrome/Brave/Firefox）
2. 在 Keplr 中使用 **AKT / ACT** 支付押金和租赁费用（从交易所或 IBC 获取）
3. 打开 [air.akash.network](https://air.akash.network)

#### 第 1 步：连接

**控制台（网页支付）**

-> 前往 [https://console.akash.network](https://console.akash.network)

-> 登录 / 完成 Console 账户流程

使用界面显示的结账方式（而不是链上 Keplr）

**Air（原生 Akash 支付）**

-> 转到 [https://air.akash.network](https://air.akash.network)

-> 点击 **"连接钱包"**

-> 选择 **Keplr** 并批准连接

-> 确认你的 AKT/ACT 余额足以支付存款和租赁费用

#### 第 2 步：创建部署

-> 点击 **"部署"**

-> 选择 **"构建你的模板"**（或直接跳至上传 SDL）


##### 选项 A：上传 SDL 文件（推荐）

**Web 支付（控制台）**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**使用 Keplr（Air）进行原生 Akash 支付**

[在 Air 上打开此模板](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### 选项 B：使用 SDL 编辑器

如果你想手动粘贴 [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)：

-> 复制 *zebra-akash.yml* 的内容

-> 粘贴到 SDL 编辑器中

-> 按需修改（请参阅下方配置部分）

-> 点击 **"创建部署"**


#### 第 3 步：审核并批准押金

界面会显示：

-> **部署押金**：约 5 AKT（关闭部署时会返还给你）

-> **预估成本**：基于你的 SDL 定价

在 **Air** 上，点击 **""批准""** 并在 **Keplr** 中登录。在 **Console** 上，完成 UI 显示的网页结账流程。

#### 第 4 步：选择提供商

约 30 秒后，你将看到来自提供商的出价。每个出价会显示：

-> **每区块价格**（以 AKT 或 USDC 计）

-> **每月预估成本**

-> **提供商详情**（运行时间、区域等）


**不要只选择最便宜的。** 请检查：

-> 运行时间百分比（目标为 > 95%）

-> 区域（离你越近延迟越低，但对 blockchain 节点影响不大）

-> 已审计状态（绿色勾选标记 = 更值得信赖）


在选定的服务提供商处点击 **"接受竞价"**。在 Air 上，登录 Keplr。在 Console 上，通过网页支付流程确认。

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

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

每一行都是一个 `global: true` 暴露。名称中包含 SDL `as` 端口（8233、9067）。主机名后的数字是**提供商映射的端口**，在租用时分配。其他 Zcash 节点会连接 `provider-hostname.com:31482`。轻量钱包使用 lightwalletd URI（除非你自行终止 TLS，否则关闭 TLS）。

容器仍在监听 8233 / 9067。公共地址始终是 URI，除非你之后添加专用 IP（此模板中未包含）。

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

如果你通过 `global: true` 暴露 RPC，公共地址仍然是 **租赁 URI**（`host:&lt;random-high-port&gt;`），而不是 `host:8232`。使用 `global: false`（此模板）时，RPC 仍位于部署网络上（对于 lightwalletd，为 `zebra:8232`）。专用 IP 租赁是单独付费的选项，不包含在 SDL 中。

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

-> 点击**"Update"**（Air：登录 Keplr；Console：确认网页支付流程）

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

-> 确认（Air：登录 Keplr；Console：在 Console UI 中确认）

你的 5 AKT 押金将被退还。**持久化存储**应由提供商保留，但不要依赖它——把它当作任何其他云提供商一样对待。

### 故障排除

#### "资金不足"错误

在 Air 上，用 AKT/ACT 为 Keplr 充值。在 Console 上，为 Console 支付方式充值。

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

在 Console 或 Air 中监控你的支出:

-> **我的部署** -> 你的部署 -> 显示 "每月成本" 估算

-> Air：你的 Keplr AKT/ACT 余额会随时间减少。Console：你的 Console 支付余额会减少。

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

**Akash Console**（网络支付）：[https://console.akash.network](https://console.akash.network)

**Akash Air**（原生 AKT/ACT + Keplr）：[https://air.akash.network](https://air.akash.network)

**Akash 文档**：[https://akash.network/docs/](https://akash.network/docs/)

**Zebra 文档**：[https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash 浏览器**：[https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**：[https://discord.akash.network](https://discord.akash.network)（用于提供商问题）
