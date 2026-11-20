# Zakura 在 Akash（Regtest）如是说

在 Akash 上运行 **Thus Spoke Zakura v0.4.1** 堆栈：Zakura Regtest、lightwalletd，以及钱包 **仪表板 / HTTP API**。测试币没有价值。请勿在此处发送主网 ZEC。

模板：[awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

上游：[zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) 标签 **v0.4.1**

### 镜像

| 服务 | 镜像 |
| --- | --- |
| 仪表板 + API（`app`） | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0`（已将固定版本编译进 0.4.1 启动器） |

### 自举

首次启动时，`app` 容器会在其持久卷上运行 `ths-server init`，然后运行 `ths-server serve`。Serve 会持续重试，直到 Zakura JSON-RPC 和 lightwalletd 启动。你无需在提供商上运行 `ths`；SDL 就是运行环境。

### Akash 如何发布端口

SDL `port` / `as` 是**容器**端口。应用监听 **8080**（`THS_LISTEN`）；lightwalletd 监听 **9067**；Zakura RPC 监听 **18232**，P2P 监听 **18233**。在部署内部，服务已使用这些端口（`http://zakura:18232`、`http://lightwalletd:9067`）。

它们**不是**提供商公网 IP 上的端口。

**默认设置（此模板）：**不使用专用 IP。

| 服务 | 容器监听端口 | SDL `as` | 在租约中的显示方式 |
| --- | --- | --- | --- |
| `app`（仪表板 + HTTP API） | 8080 | 80（HTTP） | 入口主机名，通常使用 80/443 端口 — **在浏览器中打开此 URI** |
| `lightwalletd` | 9067 | 9067（TCP，全局） | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232（TCP，全局） | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233（TCP，全局） | `host:&lt;random-high-port&gt;` |

租约就绪后，**Leases → URIs** 是准确信息来源。打开用于仪表板的 **`app`** URI（也就是 `ths` 在本地打开的同一界面）。将轻客户端指向 **lightwalletd** URI（`THS_LIGHTWALLETD_TLS=false`）。除非专用 IP 租约已公开这些端口，否则不要在提供商 IP 后输入 `:8080`、`:80` 或 `:9067`。

**专用 IP**（`endpoints` / `kind: ip`）需要额外付费，且**此模板未包含**。它们可以固定一个公网 IP，有时也能固定 `as` 端口。除非有需要，否则请勿启用。

### 选择使用哪个站点（支付）

SDL 相同。两个 Akash 网页界面的**支付方式**不同。

| 站点 | 支付方式 | 钱包 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 传统网页结账（Console 提供的银行卡 / 法币支付渠道） | Console 账户 |
| [air.akash.network](https://air.akash.network) | 原生 Akash 链支付（AKT / ACT） | **Keplr** |

如果你想使用 Keplr 链上支付，请使用 **Air**。如果你想使用常规网页支付流程，请使用 **Console**。

### 部署

**网页支付（Console）**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**使用 Keplr 进行原生 Akash 支付（Air）**

[在 Air 上打开此模板](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

使用模板创建部署，接受报价，等待 `app` 日志显示 `ths-server serve` 持续运行，然后打开用于仪表板的 **`app` URI**。

### 相关内容

- [Zakura 在 Akash](/guides/akash-network-zakura) 上 — 主网 / 测试网上的验证节点
- [Zebra 在 Akash](/guides/akash-network-zebra) 上
- 书籍：[github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
