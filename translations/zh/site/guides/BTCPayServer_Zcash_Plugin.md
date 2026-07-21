# 支持 Zcash 的 BTCPay Server：完整安装与集成指南

BTCPay Server 允许在线商家直接接受加密货币付款，无需中介或托管方。本指南将带你完整完成 BTCPay Server 的设置流程，并启用对 Zcash 屏蔽支付的原生支持。

> 本文档重点介绍如何将 Zcash 集成到你的 BTCPay Server 实例中。  
> 它同时支持 **全节点（Zebra）** 和 **基于 lightwalletd 的部署方式**。

---

## 目录

- [为什么要将 BTCPay Server 与 Zcash 搭配使用](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server 的工作原理](#How-BTCPay-Server-Works)
- [资金存储在哪里？谁控制私钥？](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [如何设置 BTCPay Server 以接收 Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [部署支持 Zcash 的 BTCPay Server](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [运行你自己的 Zcash 全节点（Zebra + Lightwalletd）](#Running-Your-Own-Zcash-Full-Node)
  - [连接到外部 lightwalletd 节点（自定义配置）](#Connecting-to-an-External-Lightwalletd-Node)
  - [使用 Cloudflare Tunnel 在家中托管 BTCPay Server](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [在 BTCPay Server Web 界面中配置 Zcash 插件](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [将 BTCPay Server 集成到你的网站](#Integrating-BTCPay-Server-with-Your-Website)
  - [API 集成](#API-Integration)
    - [生成 API 密钥](#Generating-an-API-Key)
    - [示例：通过 API 创建发票](#Example-Creating-an-Invoice-via-API)
    - [设置 Webhook](#Setting-Up-a-Webhook-Optional)
  - [CMS 集成](#CMS-Integration)
  - [支付按钮或 Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [结论](#Conclusion)
- [资源](#Resources)


---

## 为什么要将 BTCPay Server 与 Zcash 搭配使用

在线商业越来越多地接受加密货币。它速度快、全球可用，并且无需依赖银行。这对商家和客户都有好处。但有一个很多人忽视的重要细节。

在下单时，客户通常会提供个人信息：姓名、收货地址和电话号码。如果付款使用的是公开区块链——例如 Bitcoin、Ethereum，或 Ethereum / Tron 上的稳定币——那么该交易将永久公开，可被分析。

任何人，即使不知道购买了什么，也可以：

- 看到付款时间和金额  
- 追踪资金来自哪里、流向哪里  
- 只要存在任何关联点（例如泄露的邮箱或收货姓名），就能把某个加密货币地址与真实身份对应起来

这意味着，一次购买就可能暴露客户的全部财务历史。

反过来对商家也一样。如果商家的地址曾在链上出现过，他们就会暴露在外。竞争对手和第三方观察者可以追踪收款规模、供应商活动以及业务资金流结构。

### BTCPay Server 与 Zcash 的组合可以解决这个问题。


BTCPay Server 是一个免费且去中心化的加密货币收款系统。  
它不是支付中介，也不托管任何资金。所有付款都会直接进入商家的钱包。  
这个钱包可以是个人钱包，也可以是组织内部的多签方案。

服务器负责协调类任务：

- 为每个订单生成唯一地址  
- 跟踪何时收到付款，并将其与订单关联  
- 出具收据和通知  
- 为客户提供支付界面  

一切都在店主控制下运行，不依赖第三方服务。

Zcash 是一种基于零知识证明的加密货币。  
它支持完全私密的交易模型。  
使用屏蔽地址（下文简称“地址”）时，发送方、接收方和交易金额都不会在区块链上公开。

对于网店来说，这意味着：

- 买家可以在不暴露自己财务历史的情况下完成支付  
- 卖家可以在不暴露地址、销售额或交易结构的情况下收款  
- 外部观察者无法将付款与订单或客户数据关联起来

### 实际示例

某用户下单，并选择 Bitcoin 或 USDT 作为支付方式。  
网站会生成一个支付地址并显示金额。  
付款完成后，这个地址会被记录到区块链上并成为公开信息。  
攻击者只需要把一个订单与该地址关联起来，就能长期观察其完整的交易历史。

现在设想相同场景使用 Zcash。  
BTCPay Server 生成一个屏蔽地址，买家发送付款。  
从区块链的角度看，什么都没有发生。没有公开数据可供分析。  
服务器收到确认后，将其与订单关联并完成流程。

对任何外部人士来说，就像什么都没发生过。  
所有逻辑都只存在于商店与客户之间——本就应该如此。

这种方案不会牺牲自动化或易用性。  
它的使用方式与其他加密货币基本相同，只是没有数据泄露的风险。



## BTCPay Server 的工作原理

BTCPay Server 充当你的电商平台与区块链之间的支付处理桥梁。流程如下：

1. **客户在你的网站上下单**（例如 WooCommerce、Magento，或任何集成了 BTCPay 的平台）。

2. **商店向 BTCPay Server 请求支付发票**。服务器会生成一张唯一发票，其中包含：
   - 订单金额
   - 倒计时计时器
   - 一个 Zcash Unified Address（UA）——例如 `u1...`——默认包含一个 Orchard（屏蔽）接收器。

3. **客户看到支付页面**，并将 ZEC 发送到提供的地址。

4. **BTCPay Server 监控区块链**，根据以下内容核对付款：
   - 预期金额
   - 收款地址
   - 发票时间戳

5. **一旦检测到并确认交易**，BTCPay 就会通知商店。

6. **客户收到支付确认。** 如有需要，服务器还可以通过电子邮件发送收据。

整个过程都是**自动完成的**，没有中介或托管方。  
BTCPay Server **不持有任何资金**——它只是以安全且私密的方式把订单系统连接到区块链。
## 资金存储在哪里？谁控制私钥？

BTCPay Server **不是**钱包，也**不需要私钥**。  
所有资金都**直接**进入商家的钱包。安全性通过**基于 Viewing Key 的架构**来保障。

### 工作方式

- **钱包是预先创建的。**  
  商家使用支持 Viewing Key 的 Zcash 钱包——例如 [YWallet](https://ywallet.app/installation) 或 [Zingo! Wallet](https://zingolabs.org/)。  
  完整列表可见 [ZecHub.wiki](https://zechub.wiki/wallets)。

- **BTCPay Server 通过 Viewing Key 连接。**  
  Viewing Key 是一种**只读密钥**：它可以检测入账并生成新的收款地址，  
  但不能花费资金。服务器不会存储助记词或私钥。

- **区块链数据通过 `lightwalletd` 服务器访问。**  
  你可以使用类似 `https://zec.rocks` 这样的公共节点，也可以运行自己的 `Zebra + lightwalletd` 组合，以实现完全自主。

- **每个订单都会得到一个唯一地址。**  
  Viewing Key 允许服务器为每张发票派生新的 Zcash 屏蔽地址，  
  从而实现安全的支付跟踪，并避免地址复用。

- **你始终完全掌控资金。**  
  即使服务器被攻破，也没人能偷走你的钱——最多只会暴露支付元数据。

这种设计将**基础设施**与**资产控制权**分离。  
你可以更新、迁移或重新安装 BTCPay Server，而不会让任何资金承担风险。

## 如何设置 BTCPay Server 以接收 Zcash

在前面的章节中，我们已经解释了 BTCPay Server 如何与 Zcash 配合，以及它对隐私支付的重要性。现在该进入实操部分了。

你的具体部署方式取决于几个因素：

- 你是否已经有一个 BTCPay Server 实例？
- 你想使用公共 lightwalletd，还是运行自己的全节点？
- 服务器会运行在 VPS 上，还是放在家里？

本章涵盖当前所有配置场景——从最简配置到完全自主部署。

我们将带你完成以下内容：

- 如何在 VPS 上从零开始部署全部组件，包括全节点（Zebra）
- 如何在家中运行 BTCPay Server，同时通过 **Cloudflare Tunnel** 隐藏你的 IP
- 如何在 BTCPay Server Web 界面中启用并配置 Zcash 支持
- 如何将 BTCPay 与你的网站或网店集成


## 部署支持 Zcash 的 BTCPay Server

接下来进入实际部署。在本节中，我们将安装支持 Zcash 的 BTCPay Server——你可以在全新的 VPS 上安装，也可以为现有实例添加 ZEC 支持。

如果你已经在运行 BTCPay Server（例如用于 BTC 或 Lightning），则无需重新安装整个系统——只需启用 ZEC 插件即可。

我们将介绍多种配置方式，从使用公共 `lightwalletd` 节点的最简部署，到配备自有全节点的完全自主安装。  
最佳方案取决于你的服务器位置，以及你希望在多大程度上摆脱外部基础设施依赖。

> 官方插件文档：  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **警告——每个实例仅支持一个钱包：**  
> Zcash 插件在同一个 BTCPay 实例中的**所有商店之间共享一个钱包**。  
> 如果你在一个实例上托管多个彼此独立的商店，它们将共享同一个 Zcash 钱包。  
> 如果你需要严格的钱包隔离，请使用独立实例。

---

### 推荐的 VPS 配置

安装前，请确保你具备：

- 一台运行 **Ubuntu 22.04+** 的 VPS
- 一个通过 DNS 指向服务器 IP 地址的域名
- 已安装 `git`、`docker` 和 `docker-compose`
- 服务器的 SSH 访问权限

---

## 准备服务器（隐藏部分）

<details>
  <summary>点击展开</summary>

要部署支持 Zcash 的 BTCPay Server，你需要以下内容：

### 1. 安装 Ubuntu 22.04 或更高版本的 VPS

我们建议使用最小化安装的 **Ubuntu Server 22.04 LTS**。  
任何提供独立 IP 地址的 VPS 服务商都可以。  

**最低要求**：  
- 2 个 CPU 核心  
- 4 GB 内存  
- 40 GB 磁盘空间  

如果你使用 lightwalletd 来支持 Zcash，这样的配置就足够了。  
如果你打算运行 **完整的 Zcash 节点**，则需要**至少 300 GB** 的可用磁盘空间。

---

### 2. 指向服务器的域名

在你的 DNS 服务商控制台中，为一个子域名创建 `A` 记录  
（例如 `btcpay.example.com`），并将其指向你的 VPS IP 地址。  

这个域名将用于在浏览器中访问 BTCPay Server，  
并通过 Let's Encrypt 自动生成**免费的 SSL 证书**。

---

### 3. 服务器的 SSH 访问权限

要安装 BTCPay Server，你必须通过 SSH 连接到 VPS。  
在终端中运行：

`ssh root@YOUR_SERVER_IP`

如果你使用 macOS、Linux，或 Windows 上的 WSL，终端中已自带 SSH。  
如果是原生 Windows，请使用 **PuTTY** 等 SSH 客户端。

---

### 4. 安装 Git、Docker 和 Docker Compose

通过 SSH 连接后，更新系统软件包并安装所需组件：

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> 在 Ubuntu 22.04 及更新版本中，APT 提供的 `docker-compose` 已被弃用。
> 推荐安装的是 `docker-compose-plugin`，它提供 `docker compose` 命令（注意是空格而不是连字符）。

现在，你的服务器环境已经准备好安装 BTCPay Server。

</details>

---

### 第 1 步：克隆仓库

创建工作目录并下载 BTCPay Server 的 Docker 部署仓库：

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### 第 2 步：导出环境变量

将 `btcpay.example.com` 替换为你的实际域名：

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 如果你计划稍后添加 Monero 或 Litecoin，也可以现在一起加上：

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

你可以随时通过导出相应变量并重新运行安装脚本来添加新币种：

`. ./btcpay-setup.sh -i`

在本指南中，我们将重点关注 **Zcash**。

---

### 第 3 步：运行安装程序

运行安装脚本以构建并启动服务器：

`. ./btcpay-setup.sh -i`

该脚本会安装依赖项、生成 `docker-compose.yml`、启动服务并配置 `systemd`。  
这大约需要 5 分钟。

完成后，你的 BTCPay Server 实例将可通过以下地址访问：

`https://btcpay.example.com`

> 如果你是在修改现有安装（例如添加 ZEC），请务必使用新设置停止并重启服务器：

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

然后继续下一节，在 BTCPay Server Web 界面中配置 Zcash。



## 运行你自己的 Zcash 全节点

如果你希望**不依赖**公共 `lightwalletd` 节点，可以在同一台服务器上部署你自己的完整 Zcash 节点以及 Lightwalletd。  
这样你将获得**完全自主权**——没有外部依赖，也无需信任第三方。

---

### 第 1 步：确保有足够的磁盘空间

一个完整的 Zcash 节点（Zebra + Lightwalletd）目前需要 **300+ GB** 的磁盘空间，而且还会持续增长。

空间构成如下：

- Zebra 区块链数据库：约 260-270 GB
- Lightwalletd 索引：约 15-20 GB

#### 推荐存储配置：

- 如果服务器**仅用于** Zcash 支付，建议 **400 GB+**
- 如果服务器还运行 BTCPay Server、PostgreSQL、Nginx 等，建议 **800 GB+**

> 理想情况下请使用 **1 TB 容量**的 SSD/NVMe 磁盘，特别是当你不打算定期修剪数据时。

---

### 第 2 步：设置环境变量

将以下内容追加到你的环境配置中，以启用全节点模式：

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

这会包含 `zcash-fullnode` 片段，从而在 BTCPay Server 中同时启动 `zebrad` 和 `lightwalletd`。

---

### 第 3 步：重新运行安装程序

`. ./btcpay-setup.sh -i`

该脚本将会：

* 下载 Zebra 和 Lightwalletd 的 Docker 镜像
* 在 BTCPay 堆栈中设置相关服务
* 将 Zcash 插件连接到**本地** `lightwalletd` 实例

> **完整区块链同步可能需要数天时间**，尤其是在低配置 VPS 上。
> 在同步完成之前，屏蔽支付将不可用。


## 连接到外部 Lightwalletd 节点

在大多数情况下，并不需要完全自主——而且商家可能也不想为运行完整 Zcash 节点投入时间和磁盘空间。  
默认情况下，BTCPay Server 会连接到公共 `lightwalletd` 节点，以便在不下载完整区块链的情况下处理屏蔽支付。

默认端点是：

`https://zec.rocks:443`

不过，你也可以将 BTCPay Server 配置为连接到**任意外部 `lightwalletd` 节点**，例如：

`https://lightwalletd.example:443`

本节将展示如何使用**自定义 Docker 片段**来完成这项配置。

> 包含所有环境变量的完整配置示例可见[插件仓库](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)。  
> 以下步骤展示的是一个最小可用配置。

---

### 第 1 步：创建自定义 Docker 片段

在你的 BTCPayServer 项目目录中，创建一个自定义片段文件：

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

添加以下内容：

```
exclusive:
- zcash
```

`exclusive` 指令确保同一标签（此处为 `zcash`）的片段同一时间只能启用一个。  
这可以防止配置冲突——例如，你不能同时运行 `zcash-fullnode` 片段和这个自定义外部 `lightwalletd` 片段。  
将其标记为 `exclusive: zcash` 后，BTCPay Server 会自动禁用默认的 `zcash-fullnode` 以及内部 `lightwalletd` 容器，从而允许你改为连接自己的外部节点。

---

### 第 2 步：设置环境变量

在终端中运行：

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### 第 3 步：定义外部节点地址

打开你的 `.env` 文件：

`nano .env`

添加以下一行，并将 URL 替换为你选择的端点：

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

你可以使用：

* **公共节点**，例如 `https://lightwalletd.zcash-infra.com`
* 你自己单独部署、与 BTCPay Server 分离的节点

> 如果外部 `lightwalletd` 不可用或负载过高，屏蔽支付将会失败。
> 对于关键服务，请选择**稳定且经过验证的端点**（例如默认的 `zec.rocks`）。

> 想自己托管 `lightwalletd`？
> 你可以使用 [Zebra 仓库](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)中的 `docker-compose.lwd.yml`。
> **警告：** 该部署方式没有官方文档支持，需要手动配置 TLS、端口转发和防火墙——仅推荐高级用户使用。

---

### 第 4 步：重新运行安装程序

`. ./btcpay-setup.sh -i`

BTCPay Server 将应用你的自定义配置，并连接到指定的 `lightwalletd` 节点。

从此以后，Zcash 插件将使用该外部端点来处理屏蔽交易。


## 使用 Cloudflare Tunnel 在家中托管 BTCPay Server

想在家里的设备上托管 BTCPay Server 来接收 Zcash 支付，比如 Raspberry Pi 5 或任意本地服务器，**即使没有固定 IP** 也可以？  
你可以使用 **Cloudflare Tunnel** 将实例安全地暴露到互联网。

这种方法无需端口转发，并且可以对外隐藏你的真实 IP 地址——同时仍然通过 HTTPS 提供访问。

如果加密货币支付只是业务的可选功能，而非核心业务，它还能帮你**省去租用 VPS 的成本**。

---

### 第 1 步：安装 Cloudflare Tunnel

1. 在 [cloudflare.com](https://www.cloudflare.com) 注册账号并添加你的域名。
2. 在你的**家庭服务器**上安装 Cloudflare Tunnel：

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. 使用 Cloudflare 完成认证：

`cloudflared tunnel login`

此命令会打开浏览器窗口。登录并授权访问你的域名。  
Cloudflare 会自动在你的服务器上创建一个带有令牌的 `credentials` 文件。

4. 创建一个新 tunnel（可以命名为 `btcpay`，也可以使用其他名称）：

`cloudflared tunnel create btcpay`

这会生成一个包含 tunnel ID 和凭据的 `btcpay.json` 文件——下一步会用到它。

---

### 第 2 步：创建 Tunnel 配置文件

创建配置目录（如果尚不存在），然后打开配置文件：

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

粘贴以下配置：

```
tunnel: btcpay    # 你的 tunnel 名称
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # 你的域名
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### 说明：

* `tunnel` - 你之前创建的 tunnel 名称
* `credentials-file` - `cloudflared tunnel login` 时生成的令牌文件路径
* `hostname` - 你在 Cloudflare 注册的域名（例如 `btcpay.example.com`）
* `service` - 你的 BTCPay Server 本地地址（通常是 Nginx 的 `http://127.0.0.1:80`）

> Cloudflare 会将流量安全地代理到你的本地服务器，而不会暴露你的家庭 IP。


### 第 3 步：为 Tunnel 添加 DNS 记录

创建 tunnel 后，Cloudflare 通常会**自动为你的域名添加一条 CNAME DNS 记录**。它看起来应该像这样：

`btcpay.example.com -> <UUID>.cfargotunnel.com`

如果它没有自动出现，请手动添加：

1. 进入你的 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 打开 **DNS** 部分
3. 添加一条新的 CNAME 记录：
   - **名称**：`btcpay`
   - **目标**：`<UUID>.cfargotunnel.com`  
     你可以在 `btcpay.json` 文件中找到准确值，或运行：
     
     `cloudflared tunnel list`
     
   - **代理状态**：已启用（橙色云朵）

> 这条记录确保所有发往 `btcpay.example.com` 的请求都会通过 Cloudflare Tunnel 路由，从而对外隐藏你的真实 IP 地址。

---

### 第 4 步：设置开机自动启动 Tunnel

为了让 tunnel 在系统启动时自动运行，请将其安装为系统服务：

`sudo cloudflared service install`

然后启用并启动该服务：

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

检查状态：

`sudo systemctl status cloudflared`

你应该会看到类似 `Active: active (running)` 的信息，并确认 `btcpay.example.com` 已上线。

> 从现在开始，每次系统重启后 tunnel 都会自动启动，你的 BTCPay Server 也将对公网可访问——无需端口转发，也不会暴露你的真实 IP。

---

### 第 5 步：完成 BTCPay Server 设置

如果你正准备首次安装 BTCPay Server，请在运行安装脚本前先设置域名：

`export BTCPAY_HOST="btcpay.example.com"`

这样可以确保在生成 **Nginx 配置** 和 **SSL 证书** 时使用正确的域名。

如果 BTCPay Server 已经安装，而你只是新增 tunnel：

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

安装程序将重新生成配置并应用新域名。  
现在你应该能够通过以下地址访问服务器：

`https://btcpay.example.com`

> 无论你使用的是公共 `lightwalletd` 还是自己的全节点，这都不会影响 tunnel。
> 关键只在于 BTCPay Server 本地监听在 `127.0.0.1:80`。


## 在 BTCPay Server Web 界面中配置 Zcash 插件

> **多商店部署的重要提示：**  
> 此处配置的 Zcash 钱包对整个实例是**全局共享**的。除非你运行独立的 BTCPay 实例，否则所有商店都会使用这个钱包。

成功部署 BTCPay Server 实例后，你还需要通过管理后台 Web 界面完成一些基础配置。  
官方文档提供了完整的英文说明——这里我们将带你完成关键步骤，并重点介绍如何配置 Zcash 插件。

---

### 第 1 步：登录 Web 界面

访问你的实例：

`[https://btcpay.example.com](https://btcpay.example.com)`

- 输入管理员登录名和密码。
- 如果这是你第一次登录，系统会提示你创建账户。
- 你注册的第一个账户会自动获得管理员权限。

---

### 第 2 步：安装 Zcash 插件

1. 在主菜单中，进入：

`Plugins -> Browse Plugins`

2. 找到 **Zcash (ZEC)** 插件。如有需要可使用搜索栏。
3. 点击 **Install** 并确认。

> 对于你在服务器配置阶段启用的其他山寨币，也请重复此过程。

安装完成后，点击 **Restart Server** 以重新加载界面并启用插件。


### 第 3 步：通过 Viewing Key 连接你的钱包

安装插件后，设置菜单中会出现新的 **Zcash** 部分。

1. 进入：

`Zcash -> Settings`

2. 粘贴你的 **Unified Full Viewing Key (UFVK)** —— BTCPay 会为每张发票派生一个 Unified Address，并检测收到的屏蔽付款。

> **注意：** 旧版 Sapling viewing key 也受支持，但如果你要使用 Orchard / Unified Address，应提供 **UFVK**。


   示例格式：

`uview184syv9wftwngkay8d...`

3. 在 Block height 字段中输入一个值

* **使用新钱包首次设置（新助记词）时：** 输入当前 Zcash 区块高度（可在 3xpl.com/zcash 查询）——这会加快初始扫描速度。
* **在同一台服务器上，将旧的仅 Sapling 部署迁移到 Unified Address / Orchard 时：** 将此字段留空。
* **使用相同钱包/UFVK 将商店迁移到新服务器时：** 可选填写 birth height——即你商店第一笔已支付订单的大致区块高度（可在 3xpl 上根据订单日期匹配，以缩小扫描范围）。如果不确定，就留空。

> 目前并非所有钱包都支持导出 **Unified Full Viewing Key (UFVK)**。  
> 推荐选项：  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet（PC 版本）**](https://zingolabs.org/)  
> 在这两个应用中，请在备份/导出部分寻找 UFVK 导出选项。

这些密钥支持**自动地址轮换**，这意味着：
- 每位客户都会获得一个**唯一**支付地址
- 你看到的是**单一统一**的余额

你可以在 [ZecHub -> Wallets](https://zechub.wiki/wallets) 上查看更广泛的兼容列表。

填写完所有字段后，点击 **Save**。

---

### 测试你的 ZEC 支付流程

恭喜——你的 Zcash 钱包现已连接到 BTCPay Server。

接下来做一个测试：

1. 进入：

`Invoices -> Create New`

2. 创建一张小额 ZEC 测试发票。
3. 使用**另一个钱包**发送资金（不要使用连接到 BTCPay 的那个钱包）。
4. 一旦检测到交易，发票页面会显示可视化庆祝效果。
5. 确认发票状态已变为 **Paid**。

如果一切正常——你就可以通过 API 或 CMS 插件将 ZEC 支付集成到你的网站中。



## 将 BTCPay Server 集成到你的网站

当你的 Zcash 钱包连接到 BTCPay Server 后，就可以把支付系统集成到你的网站。  
实现方式有很多——从直接调用 API，到为主流 CMS 平台提供的现成插件。

---

### 集成方式

- **API 集成**  
  适合自定义开发的网站或没有 CMS 的系统。  
  你可以完全控制发票创建、支付跟踪和通知——全部集成在你自己的界面和业务逻辑中。  
  这需要基础编程知识，因此最好交由开发者完成。

- **CMS 插件**  
  适用于 **WooCommerce**、**PrestaShop** 等平台。  
  这些插件可以让你在几分钟内开始收款——无需编写代码。

- **支付按钮或 Iframe**  
  这是最简单的方法。  
  非常适合落地页、个人网站，或任何你只想嵌入捐赠链接或结账组件的页面。

---

### API 集成

如果你使用的是自定义平台（或根本没有 CMS），那么 API 是最佳选择。  
它提供完整的灵活性：你可以创建发票、跟踪状态、接收通知，并完全掌控用户体验。

> 注意：即使是某些 CMS 插件，底层也是通过 API 工作的，因此无论你采用哪种集成方式，创建 API 密钥通常都是**第一步必需操作**。

下一步：为你的商店生成一个 API 密钥，并开始使用 [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) 构建集成。


### 生成 API 密钥

要将 BTCPay Server 集成到你的网站或应用中，你需要生成一个 API 密钥。

1. 登录 BTCPay Server，并打开**用户菜单**（右上角）
2. 进入 **API Keys**
3. 点击 **Create a new API key**
4. 为你的密钥输入一个名称
5. 在 **Permissions** 部分中启用：
   - `Can create invoice`
   - `Can view invoice`
   - *(可选)* `Can modify store settings` - 仅当你需要商店级管理时启用

6. 点击 **Generate**。系统会显示你的个人 API 密钥——请复制并安全保存。

> 此密钥可访问你商店的发票。  
> **不要**公开分享，也不要暴露在客户端代码中。

---

### 示例：通过 API 创建发票

**端点：**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**请求体：**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**响应：**

你将收到一个 JSON 对象，其中包含：

* `invoiceId`
* 一个支付 URL，你可以将其嵌入网站，或发送给客户

完整文档见：
[Greenfield API – 创建发票](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### 设置 Webhook（可选）

如果你希望在发票状态变化时接收实时通知（例如收到付款时）：

1. 进入商店设置 -> **Webhooks**
2. 添加你的后端端点 URL，用于接收来自 BTCPay Server 的 `POST` 请求
3. 当发票已支付或过期时，BTCPay 会自动发送通知

Webhook 负载和重试逻辑请参阅[官方 webhook 文档](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-)。

> BTCPay 文档和 GitHub 仓库中提供了多种编程语言的集成示例。



### CMS 集成

BTCPay Server 支持主流内容管理系统（CMS）的插件。  
最成熟、使用最广泛的集成方案是 **WordPress + WooCommerce**，这让你无需编写代码也能轻松接受 ZEC 支付。

---

#### WooCommerce（WordPress）

BTCPay Server 官方支持 WooCommerce 插件。

集成步骤：

1. 从 WordPress 插件目录或 GitHub 安装 **BTCPay for WooCommerce** 插件。
2. 在 WordPress 管理后台中，进入：

`WooCommerce -> Settings -> Payments`

3. 在列表中找到 **BTCPay** 并点击 **Set up**
4. 输入你的 BTCPay Server URL，并按照授权说明操作  
   （建议使用自动生成 API 密钥）
5. 启用该支付方式并保存设置

> 详细说明、视频教程和故障排查指南可在插件文档中找到。

你还可以在 BTCPay 文档的同一部分中找到其他 CMS 的集成选项。

---

### 支付按钮或 Iframe（无需 CMS 或 API）

如果你没有使用 CMS，也不想处理 API，那么接受 ZEC 支付的最简单方法就是**直接在你的网站中嵌入支付链接或组件**。

这种方式非常适合：

- 落地页
- 作品集网站
- 博客或静态页面
- 没有后端服务器的项目

---

#### 选项 1：支付按钮（链接）

1. 在 BTCPay Server 中，手动在 **Invoices** 部分创建一张发票
2. 复制支付链接，例如：

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. 将该链接添加到你的 HTML 中：

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  使用 ZEC 支付
</a>
```

---

#### 选项 2：嵌入式发票（Iframe）

如果你希望直接在网站上显示发票，请使用 iframe：

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> 你可以自定义按钮或 iframe 容器的样式，以匹配你网站的设计——BTCPay Server 允许灵活定制发票页面主题。

## 结论

本指南内容较长——但它涵盖的也只是使用 BTCPay Server 集成 Zcash 支付的基础部分。

BTCPay Server 的界面功能远比这里展示的更多。幸运的是，它的 UI 支持多种语言（包括俄语），因此你可以轻松继续探索和尝试。

BTCPay 是一个高度灵活的工具。你可以：

* 在单个实例上托管多个彼此独立的商店
* 为团队成员定义自定义角色和权限——从只能查看订单到完整管理员权限
* 使用你自己的域名和品牌
* 设置 Webhook、备用钱包，甚至接入 Tor
* 配置高级设置，例如税务规则、折扣码、结账页面自定义、支付方式限制等等

BTCPay 被打造为中心化支付服务商的开源替代方案。如果你希望在没有中介的情况下接受私密的 ZEC 支付，这个平台绝对值得关注。

祝你在探索 BTCPay 生态系统的过程中一切顺利，并真正掌控属于你自己的支付体系。

## 资源

* [BTCPay Server 官网](https://btcpayserver.org/)
* [BTCPay 常见问题](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub 仓库](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server 主网演示](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [BTCPay 的 Zcash 插件（GitHub）](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash 插件安装指南](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [自定义 zcash-lightwalletd.custom.yml 示例](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose 文件（Zebra）](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API 密钥文档（Greenfield API）](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [创建 Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash 钱包兼容性列表（ZecHub）](https://zechub.wiki/wallets)
* [Raspberry Pi 5 上的 Zebra + Lightwalletd（ZecHub）](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
