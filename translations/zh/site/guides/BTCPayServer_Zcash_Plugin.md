# BTCPay Server 与 Zcash 支持：完整安装与集成指南

BTCPay Server 让在线商家能够直接接受加密货币支付，无需中介或托管方。本指南将带您完成设置 BTCPay Server 并原生支持 Zcash 屏蔽支付的完整流程。

> 本文档重点介绍如何将 Zcash 集成到您的 BTCPay Server 实例中。  
> 它同时支持 **全节点 (Zebra)** 和 **基于 lightwalletd 的设置**。

---

## 目录

- [为何将 BTCPay Server 与 Zcash 结合使用](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server 的工作原理](#How-BTCPay-Server-Works)
- [资金存储在哪里？谁控制私钥？](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [如何设置 BTCPay Server 以接受 Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [部署支持 Zcash 的 BTCPay Server](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [运行您自己的 Zcash 全节点 (Zebra + lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [连接到外部 lightwalletd 节点（自定义配置）](#Connecting-to-an-External-Lightwalletd-Node)
  - [使用 Cloudflare Tunnel 在家托管 BTCPay Server](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [在 BTCPay Server Web 界面中配置 Zcash 插件](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [将 BTCPay Server 集成到您的网站](#Integrating-BTCPay-Server-with-Your-Website)
  - [API 集成](#API-Integration)
    - [生成 API 密钥](#Generating-an-API-Key)
    - [示例：通过 API 创建发票](#Example-Creating-an-Invoice-via-API)
    - [设置 Webhook](#Setting-Up-a-Webhook-Optional)
  - [CMS 集成](#CMS-Integration)
  - [支付按钮或 Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [结论](#Conclusion)
- [资源](#Resources)


---

## 为何将 BTCPay Server 与 Zcash 结合使用

在线商务越来越多地接受加密货币。它快速、全球通用，而且无需银行。这对商家和客户都有好处。但有一个重要细节常被忽视。

下单时，客户通常会提供个人信息：姓名、收货地址和电话号码。如果使用公开 blockchain（区块链）进行支付——例如 Bitcoin、Ethereum，或 Ethereum 或 Tron 上的稳定币——该交易将永久可见，并可被分析。

任何人即使不知道订购了什么，也可以：

- 查看支付的时间和金额  
- 追踪资金的来源和去向  
- 如果存在任何关联点（例如泄露的电子邮件或收货姓名），将加密货币地址与真实人物关联起来

这意味着一次购买就可能暴露客户的整个财务历史。

反过来也一样。如果商家的地址曾出现在链上，他们也会暴露。竞争对手和第三方观察者可以追踪支付量、供应商活动以及业务流的结构。

### BTCPay Server 与 Zcash 的结合可以解决这个问题。


BTCPay Server 是一个免费且去中心化的加密货币支付接收系统。  
它不是支付中介，也不持有任何资金。所有支付都会直接进入商家的钱包（wallet）。  
这可以是个人钱包，也可以是组织内部的多重签名设置。

服务器负责协调任务：

- 为每笔订单生成唯一地址（address）  
- 跟踪收到支付的时间并将其关联到订单  
- 签发收据和通知  
- 为客户提供支付界面  

一切都在店主的控制下运行，无需依赖第三方服务。

Zcash 是一种基于零知识（zero-knowledge）证明（proof）构建的加密货币。它支持完全私密的交易（transaction）模型。  
使用屏蔽（shielded）地址（下文简称"地址"）时，发送方、接收方和交易金额都不会在 blockchain 上公开。

对于在线商店，这意味着：

- 买家可以完成支付而不暴露其财务历史  
- 卖家可以收到支付，而不暴露其地址、销售量或交易结构  
- 外部观察者无法将支付与订单或客户数据关联起来

### 实际示例

一位用户下单并选择 Bitcoin 或 USDT 作为支付方式。  
网站生成一个支付地址并显示金额。  
支付完成后，该地址会存储在 blockchain 上并成为公开信息。  
攻击者只需将一个订单与该地址关联，即可长期查看其完整交易历史。

现在想象使用 Zcash 的相同场景。  
BTCPay Server 生成一个屏蔽地址。买家发送支付。  
从 blockchain 的角度看，什么也没有发生。没有可供分析的公开数据。  
服务器收到确认后，将其关联到订单并完成流程。

对任何外部人员而言，看起来什么都没有发生。  
所有逻辑都保留在商店和客户之间——本应如此。

该解决方案不会牺牲自动化或易用性。  
一切与其他加密货币的运行方式相同，只是没有数据泄露风险。



## BTCPay Server 的工作原理

BTCPay Server 充当您的电子商务平台与 blockchain 之间的支付处理桥（bridge）。流程如下：

1. **客户在您的网站上下单**（例如 WooCommerce、Magento，或任何集成 BTCPay 的平台）。

2. **商店向 BTCPay Server 请求支付发票**。服务器会生成一张唯一发票，其中包含：
   - 订单金额
   - 倒计时计时器
   - 一个 Zcash Unified Address (UA)——例如 `u1...`——默认包含一个 Orchard（屏蔽）接收方。

3. **客户看到支付页面**，并将 ZEC 发送至提供的地址。

4. **BTCPay Server 监控 blockchain**，并根据以下内容检查支付：
   - 预期金额
   - 接收地址
   - 发票时间戳

5. **一旦检测并确认交易**，BTCPay 会通知商店。

6. **客户收到支付确认。**服务器还可以选择通过电子邮件发送收据。

整个过程都以**自动**方式进行，无需中介或托管方。  
BTCPay Server **不会持有任何资金**——它只是以安全且私密的方式将订单系统连接到 blockchain。
## 资金存储在哪里？谁控制私钥？

BTCPay Server **不是**钱包，也**不需要私钥**。  
所有资金都会**直接**进入商家的钱包。安全性通过使用**基于 viewing key 的架构**来保障。

### 工作原理

- **钱包预先创建。**  
  商家使用支持 viewing key 的 Zcash 钱包，例如 [Zkool](https://github.com/hhanh00/zkool2/) 或 [Zingo! Wallet](https://zingolabs.org/)。  
  完整列表可在 [ZecHub.wiki](https://zechub.wiki/wallets) 查看。

- **BTCPay Server 通过 viewing key 连接。**  
  viewing key 是一种**只读密钥**：它可以检测传入支付并生成新的接收地址，  
  但不能花费资金。服务器不会存储助记词（seed phrase）或私钥。

- **通过 `lightwalletd` 服务器访问 blockchain 数据。**  
  您可以使用像 `https://zec.rocks` 这样的公共节点，也可以运行自己的 `Zebra + lightwalletd` 堆栈以实现完全自主。

- **每笔订单都有唯一地址。**  
  viewing key 允许服务器为每张发票派生新的 Zcash 屏蔽地址，  
  从而实现安全的支付跟踪并防止地址重复使用。

- **您保留对资金的完全控制权。**  
  即使服务器遭到入侵，也无人能够盗取您的资金——只有支付元数据可能会暴露。

该设计将**基础设施**与**资产控制**分离。  
您可以更新、迁移或重新安装 BTCPay Server，而不会让任何资金面临风险。

## 如何设置 BTCPay Server 以接受 Zcash

在前面的部分中，我们说明了 BTCPay Server 如何与 Zcash 配合工作，以及它为何对保护隐私的支付至关重要。现在是时候动手操作了。

您的具体设置取决于几个因素：

- 您是否已有一个 BTCPay Server 实例？
- 您想使用公共 lightwalletd，还是运行自己的全节点？
- 服务器将在 VPS 上运行还是在家中运行？

本章涵盖所有当前配置场景——从最简设置到完全自主的部署。

我们将介绍以下内容：

- 如何从零开始在 VPS 上部署所有组件，包括全节点（Zebra）
- 如何在家中运行 BTCPay Server，同时使用 **Cloudflare Tunnel** 隐藏您的 IP
- 如何在 BTCPay Server Web 界面中启用和配置 Zcash 支持
- 如何将 BTCPay 与您的网站或在线商店集成


## 部署支持 Zcash 的 BTCPay Server

让我们进入实际设置。在本节中，我们将在新的 VPS 上安装支持 Zcash 的 BTCPay Server，或者向现有实例添加 ZEC 支持。

如果您已经在运行 BTCPay Server（例如用于 BTC 或 Lightning），则无需重新安装所有内容——只需启用 ZEC 插件。

我们将介绍多种配置，从使用公共 `lightwalletd` 节点的最简设置，到使用自有全节点的完全自主安装。  
最佳选择取决于您的服务器位置，以及您希望摆脱外部基础设施的程度。

> 官方插件文档：  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **警告——每个实例一个钱包：**  
> Zcash 插件在 BTCPay 实例中的**所有商店**之间使用**一个共享钱包**。  
> 如果您在一个实例上托管多个独立商店，它们将共享同一个 Zcash 钱包。  
> 如果您需要严格的钱包隔离，请使用单独的实例。

---

### 推荐的 VPS 配置

安装前，请确保您具备：

- 运行 **Ubuntu 22.04+** 的 VPS
- 一个通过 DNS 指向服务器 IP 地址的域名
- 已安装 `git`、`docker` 和 `docker-compose`
- 服务器的 SSH 访问权限

---

## 准备您的服务器（隐藏部分）

<details>
  <summary>点击展开</summary>

要部署支持 Zcash 的 BTCPay Server，您需要以下条件：

### 1. 配备 Ubuntu 22.04 或更高版本的 VPS

我们建议使用精简安装的 **Ubuntu Server 22.04 LTS**。  
任何提供专用 IP 地址的 VPS 服务商均可使用。  

**最低要求**：  
- 2 个 CPU 核心  
- 4 GB RAM  
- 40 GB 磁盘空间  

如果您使用 lightwalletd 来运行 Zcash，此设置已足够。  
如果您计划运行**完整的 Zcash 节点**，则至少需要 **300 GB** 可用磁盘空间。

---

### 2. 指向您服务器的域名

在您的 DNS 服务商仪表板中，为子域名创建一个 `A` 记录  
（例如 `btcpay.example.com`），并将其指向您的 VPS IP 地址。  

该域名将用于从浏览器访问 BTCPay Server  
并通过 Let's Encrypt 自动生成**免费 SSL 证书**。

---

### 3. 服务器的 SSH 访问权限

要安装 BTCPay Server，您必须通过 SSH 连接到您的 VPS。  
在终端中运行：

`ssh root@YOUR_SERVER_IP`

如果您使用 macOS、Linux，或 Windows 上的 WSL，终端中已提供 SSH。
在纯 Windows 上，请使用 **PuTTY** 等 SSH 客户端。

---

### 4. 安装 Git、Docker 和 Docker Compose

通过 SSH 连接后，更新您的系统软件包并安装所需组件：

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> 在 Ubuntu 22.04 及更高版本中，APT 提供的 `docker-compose` 已弃用。
> 推荐的软件包是 `docker-compose-plugin`，它提供 `docker compose` 命令（注意使用空格而非连字符）。

您的服务器环境现已准备好安装 BTCPay Server。

</details>

---

### 第 1 步：克隆仓库

创建工作目录并下载 BTCPay Server 的 Docker 部署：

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### 第 2 步：导出环境变量

将 `btcpay.example.com` 替换为您的实际域名：

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 如果您计划稍后添加 Monero 或 Litecoin，可以现在一并加入：

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

您可以随时通过导出相应变量并重新运行设置脚本来添加新币种：

`. ./btcpay-setup.sh -i`

本指南将仅重点介绍**Zcash**。

---

### 第 3 步：运行安装程序

运行设置脚本以构建并启动服务器：

`. ./btcpay-setup.sh -i`

该脚本将安装依赖项、生成 `docker-compose.yml`、启动服务并配置 `systemd`。
这大约需要 5 分钟。

完成后，您的 BTCPay Server 实例将可通过以下地址访问：

`https://btcpay.example.com`

> 如果您正在修改现有安装（例如添加 ZEC），请务必使用新设置停止并重新启动服务器：

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

然后继续下一节，在 BTCPay Server Web 界面中配置 Zcash。

## 运行您自己的 Zcash 全节点

如果您更倾向于**不**依赖公共 `lightwalletd` 节点，您可以在同一服务器上部署自己的完整 Zcash 节点以及 lightwalletd。  
这将为您带来**完全自主性**——无需外部依赖，也无需信任。

---

### 第 1 步：确保充足的磁盘空间

一个完整的 Zcash 节点（Zebra + lightwalletd）目前需要 **300+ GB** 磁盘空间，并且还在持续增长。

构成如下：

- Zebra blockchain 数据库：约 260-270 GB
- lightwalletd 索引：约 15-20 GB

#### 推荐存储空间：

- 如果服务器**仅**用于 Zcash 支付，建议使用 **400 GB+**
- 如果服务器还运行 BTCPay Server、PostgreSQL、Nginx 等，建议使用 **800 GB+**

> 理想情况下，请使用容量为 **1 TB** 的 SSD/NVMe 磁盘，尤其是如果您不打算定期修剪数据。

---

### 第 2 步：设置环境变量

将以下内容追加到您的环境配置中，以启用全节点配置：

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

这将包含 `zcash-fullnode` 片段，它会在 BTCPay Server 内同时启动 `zebrad` 和 `lightwalletd`。

---

### 第 3 步：重新运行安装程序

`. ./btcpay-setup.sh -i`

该脚本将会：

* 下载用于 Zebra 和 lightwalletd 的 Docker 镜像
* 在 BTCPay 堆栈中设置服务
* 将 Zcash 插件连接至**本地** `lightwalletd` 实例

> **完整 blockchain 同步可能需要数天时间**，尤其是在资源较低的 VPS 服务器上。
> 在同步完成前，屏蔽支付将不可用。


## 连接到外部 lightwalletd 节点

大多数情况下，并不需要完全自主性——商家也可能不希望花费时间和磁盘空间来运行完整的 Zcash 节点。  
默认情况下，BTCPay Server 会连接到公共 `lightwalletd` 节点，无需下载整个 blockchain 即可处理屏蔽支付。

默认端点为：

`https://zec.rocks:443`

不过，您可以将 BTCPay Server 配置为连接到**任何外部 `lightwalletd` 节点**，例如：

`https://lightwalletd.example:443`

本节将说明如何使用**自定义 Docker 片段**完成此操作。

> 包含所有环境变量的完整配置示例可在 [插件仓库](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) 中找到。  
> 以下步骤展示最小可用配置。

---

### 第 1 步：创建自定义 Docker 片段

在您的 BTCPayServer 项目目录中，创建一个自定义片段文件：

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

`exclusive` 指令可确保同一标签（本例中为 `zcash`）的片段一次只能有一个处于活动状态。
这可防止配置冲突——例如，您无法同时运行 `zcash-fullnode` 片段和此自定义外部 `lightwalletd` 片段。
通过将其标记为 `exclusive: zcash`，BTCPay Server 将自动禁用默认 `zcash-fullnode` 和内部 `lightwalletd` 容器，让您改为连接自己的外部节点。

---

### 第 2 步：设置环境变量

在终端中：

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### 第 3 步：定义外部节点地址

打开您的 `.env` 文件：

`nano .env`

添加以下一行，并将 URL 替换为您选择的端点：

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

您可以使用：

* **公共节点**，例如 `https://zec.rocks:443`
* 您自己托管的节点，该节点与 BTCPay Server 分开部署

> 如果外部 `lightwalletd` 不可用或过载，屏蔽支付将会失败。
> 对于关键服务，请选择**稳定且经过验证的端点**（如默认的 `zec.rocks`）。

> 想要自行托管 `lightwalletd`？
> 您可以使用 [Zebra 仓库](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml) 中的 `docker-compose.lwd.yml`。
> **警告：**此配置尚无官方文档，并且需要手动设置 TLS、端口转发和防火墙配置——仅推荐高级用户使用。

---

### 第 4 步：重新运行安装程序

`. ./btcpay-setup.sh -i`

BTCPay Server 将应用您的自定义配置，并连接到指定的 `lightwalletd` 节点。

从现在起，Zcash 插件将使用该外部端点处理屏蔽交易。


## 使用 Cloudflare Tunnel 在家中托管 BTCPay Server

想在 Raspberry Pi 5 或任何**没有静态 IP** 的本地服务器等家庭设备上托管 BTCPay Server，同时接受 Zcash 支付吗？  
您可以使用 **Cloudflare Tunnel**，将您的实例安全地暴露到互联网。

这种方法无需端口转发，并能向公众隐藏您的真实 IP 地址，同时让您的服务器可通过 HTTPS 访问。

如果加密货币支付只是可选功能而非业务核心，它还能帮助您**避免租用 VPS 的成本**。

---

### 第 1 步：安装 Cloudflare Tunnel

1. 在 [cloudflare.com](https://www.cloudflare.com) 创建账户并添加您的域名。
2. 在您的**家庭服务器**上，使用 Cloudflare 的官方软件包仓库安装 Cloudflare Tunnel：

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

如果 `apt install cloudflared` 失败，请改为安装对应的 `.deb`：

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. 使用 Cloudflare 进行身份验证：

`cloudflared tunnel login`

此命令会打开浏览器窗口。登录并授权访问您的域名。
Cloudflare 将自动在您的服务器上创建包含令牌的 `credentials` 文件。

4. 创建一个新隧道（您可以将其命名为 `btcpay` 或任何其他名称）：

`cloudflared tunnel create btcpay`

这会生成包含隧道 ID 和凭据的 `btcpay.json` 文件——您将在下一步中需要它。

---

### 第 2 步：创建隧道配置文件

创建配置目录（如不存在）并打开配置文件：

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

粘贴以下配置：

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### 说明：

* `tunnel` - 您之前创建的隧道名称
* `credentials-file` - 在 `cloudflared tunnel login` 期间生成的令牌文件路径
* `hostname` - 您在 Cloudflare 注册的域名（例如 `btcpay.example.com`）
* `service` - 您的 BTCPay Server 本地地址（Nginx 通常为 `http://127.0.0.1:80`）

> Cloudflare 会将流量安全地代理到您的本地服务器，而不会暴露您的家庭 IP。


### 第 3 步：为您的隧道添加 DNS 记录

创建隧道后，Cloudflare 通常会**自动为您的域名添加 CNAME DNS 记录**。它应如下所示：

`btcpay.example.com -> <UUID>.cfargotunnel.com`

如果未自动显示，请手动添加：

1. 转到您的 [Cloudflare 仪表板](https://dash.cloudflare.com/)
2. 导航至 **DNS** 部分
3. 添加新的 CNAME 记录：
   - **名称**：`btcpay`
   - **目标**：`<UUID>.cfargotunnel.com`  
     您可以在 `btcpay.json` 文件中找到确切值，或运行：
     
     `cloudflared tunnel list`
     
   - **代理状态**：已启用（橙色云朵）

> 该记录可确保所有发往 `btcpay.example.com` 的请求都通过 Cloudflare Tunnel 路由，向公众隐藏您的真实 IP 地址。

---

### 第 4 步：在系统启动时启用隧道

为使隧道在启动时自动运行，请将其安装为系统服务：

`sudo cloudflared service install`

然后启用并启动服务：

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

检查状态：

`sudo systemctl status cloudflared`

您应看到类似 `Active: active (running)` 的消息，以及确认 `btcpay.example.com` 已在线。

> 从现在起，隧道将在每次重启时自动启动，您的 BTCPay Server 将可供公众访问——无需端口转发，也不会暴露您的真实 IP。

---

### 第 5 步：完成 BTCPay Server 设置

如果您即将首次安装 BTCPay Server，请在运行设置脚本之前设置您的域名：

`export BTCPAY_HOST="btcpay.example.com"`

这可确保生成 **Nginx 配置**和 **SSL 证书**时使用正确的域名。

如果 BTCPay Server 已安装，而您只是添加隧道：

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

设置程序将重新生成配置并应用新域名。
现在您应该能够通过以下地址访问您的服务器：

`https://btcpay.example.com`

> 无论您使用公共 `lightwalletd` 还是自己的全节点，这都不会影响隧道。
> 关键在于 BTCPay Server 正在本地监听 `127.0.0.1:80`。


## 在 BTCPay Server Web 界面中配置 Zcash 插件

> **多商店设置的重要说明：**  
> 此处配置的 Zcash 钱包是实例的**全局**钱包。除非您运行单独的 BTCPay 实例，否则所有商店都将使用此钱包。

成功部署您的 BTCPay Server 实例后，您需要通过管理员 Web 界面完成一些基本配置。  
官方文档提供完整的英文说明——这里我们将带您完成基本步骤，并重点介绍如何配置 Zcash 插件。

---

### 第 1 步：登录 Web 界面

通过以下地址访问您的实例：

`[https://btcpay.example.com](https://btcpay.example.com)`

- 输入您的管理员登录名和密码。
- 如果这是您首次登录，系统将提示您创建账户。
- 您注册的第一个账户将自动被授予管理员权限。

---

### 第 2 步：安装 Zcash 插件

1. 在主菜单中，前往：

`Plugins -> Browse Plugins`

2. 找到 **Zcash（ZEC）**插件。如有需要，请使用搜索栏。
3. 点击 **安装** 并确认。

> 对您在服务器配置期间启用的其他任何山寨币重复此过程。

安装后，点击 **重启服务器**，以使用已激活的插件重新加载界面。


### 第 3 步：通过 Viewing Key 连接您的钱包

安装插件后，设置菜单中会出现新的 **Zcash** 部分。

1. 前往：

`Zcash -> Settings`

2. 粘贴您的**统一 Full Viewing Key（UFVK）**——BTCPay 将为每张发票派生一个统一地址，并检测传入的屏蔽支付。

> **注意：**支持旧版 Sapling viewing key，但若要使用 Orchard/统一地址，您应提供 **UFVK**。


   示例格式：

`uview184syv9wftwngkay8d...`

3. 在区块高度字段中输入一个值

* **使用新钱包（新助记词）首次设置：**输入当前 Zcash 区块高度（可在 3xpl.com/zcash 查询）——这会加快初始扫描。
* **在同一服务器上从旧版仅 Sapling 设置迁移至统一地址 / Orchard：**将此字段留空。
* **使用相同钱包/UFVK 将商店迁移到新服务器：**可选择输入出生高度——即商店第一笔已支付订单的大致高度（在 3xpl 上匹配订单日期以缩小扫描范围）。如不确定，请留空。

> 尚非所有钱包都支持导出**统一 Full Viewing Key（UFVK）**。  
> 推荐选项：  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet（PC 版本）**](https://zingolabs.org/)  
> 在这两个应用中，请在备份/导出部分寻找 UFVK 导出选项。

这些密钥支持**自动地址轮换**，这意味着：
- 每位客户都会获得**唯一的**支付地址
- 您会看到**单一、统一的**余额

您可以在 [ZecHub -> 钱包](https://zechub.wiki/wallets) 查看更广泛的兼容性列表。

填完所有字段后，点击 **保存**。

---

### 测试您的 ZEC 支付流程

恭喜您——您的 Zcash 钱包现已连接至 BTCPay Server。

让我们进行测试：

1. 前往：

`Invoices -> Create New`

2. 创建一张小额 ZEC 测试发票。
3. 从**另一个钱包**发送资金（不要使用连接到 BTCPay 的钱包）。
4. 检测到交易后，发票页面将显示视觉庆祝效果。
5. 确认发票状态变为**已支付**。

如果一切正常，您就可以通过 API 或 CMS 插件将 ZEC 支付集成到您的网站中。



## 将 BTCPay Server 集成到您的网站

当您的 Zcash 钱包连接至 BTCPay Server 后，您便可将支付系统集成到您的网站。  
有多种实现方式——从直接访问 API 到适用于热门 CMS 平台的即用型插件。

---

### 集成选项

- **API 集成**  
  适用于定制构建的网站或没有 CMS 的系统。  
  可让您在自己的界面和逻辑中完全控制发票创建、支付跟踪及通知。  
  需要基本编程知识，因此最好由您的开发者处理此任务。

- **CMS 插件**  
  可用于 **WooCommerce**、**PrestaShop** 等平台。  
  这些插件让您只需几分钟即可接受支付——无需编写代码。

- **支付按钮或 Iframe**  
  最简单的方法。  
  非常适合落地页、个人网站，或任何您只想嵌入捐赠链接或结账小组件的网站。

---

### API 集成

如果您使用定制平台（或完全没有 CMS），API 是最佳选择。  
它为您提供完全的灵活性：您可以创建发票、跟踪其状态、接收通知，并完全控制用户体验。

> 注意：即使某些 CMS 插件也在底层使用 API，因此无论您采用何种集成方法，创建 API 密钥通常都是**第一个必要步骤**。

下一步：为您的商店生成 API 密钥，并开始使用 [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) 构建您的集成。


### 生成 API 密钥

要将 BTCPay Server 集成到您的网站或应用中，您需要生成 API 密钥。

1. 登录 BTCPay Server 并打开**用户菜单**（右上角）
2. 前往 **API 密钥**
3. 点击 **创建新的 API 密钥**
4. 为您的密钥输入名称
5. 在**权限**部分，启用：
   - `Can create invoice`
   - `Can view invoice`
   - *（可选）* `Can modify store settings` - 仅当您需要商店级管理时

6. 点击 **生成**。系统将显示您的个人 API 密钥——请复制并妥善保存。

> 此密钥可访问您商店的发票。  
> 请**勿**公开分享它，也不要将其暴露在客户端代码中。

---

### 示例：通过 API 创建发票

**端点：**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**请求正文：**

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

您将收到一个 JSON 对象，其中包含：

* `invoiceId`
* 可嵌入网站或发送给客户的支付 URL

查看完整文档：
[Greenfield API – 创建发票](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### 设置 Webhook（可选）

要在发票状态变更时接收实时通知（例如收到支付时）：

1. 前往您的商店设置 -> **Webhook**
2. 添加将处理来自 BTCPay Server 的 `POST` 请求的后端端点 URL
3. 当发票支付或过期时，BTCPay 将自动发送通知

Webhook 负载和重试逻辑在 [官方 webhook 文档](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) 中说明。

> BTCPay 文档和 GitHub 仓库中提供多种编程语言的示例集成。



### CMS 集成

BTCPay Server 支持热门内容管理系统（CMS）的插件。  
最成熟且广泛使用的集成是 **WordPress + WooCommerce**，让您可**无需编写代码**即可接受 ZEC 支付。

---

#### WooCommerce（WordPress）

BTCPay Server 官方支持适用于 WooCommerce 的插件。

集成步骤：

1. 从 WordPress 插件目录或 GitHub 安装 **适用于 WooCommerce 的 BTCPay** 插件。
2. 在您的 WordPress 管理面板中，前往：

`WooCommerce -> Settings -> Payments`

3. 在列表中找到 **BTCPay**，然后点击 **设置**
4. 输入您的 BTCPay Server URL 并按照授权说明操作  
   （建议自动生成 API 密钥）
5. 启用支付方式并保存您的设置

> 插件文档中提供详细说明、视频教程和故障排除指南。

您还可在 BTCPay 文档的同一部分找到其他 CMS 集成选项。

---

### 支付按钮或 Iframe（无需 CMS 或 API）

如果您不使用 CMS 且不想使用 API，接受 ZEC 支付的最简单方式是直接在网站上**嵌入支付链接或小组件**。

这种方法适用于：

- 落地页
- 作品集网站
- 博客或静态页面
- 没有后端服务器的项目

---

#### 选项 1：支付按钮（链接）

1. 在 BTCPay Server 中，于**发票**部分手动创建发票
2. 复制支付链接，例如：

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. 将链接添加到您的 HTML：

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### 选项 2：嵌入式发票（Iframe）

要在您的网站上直接显示发票，请使用 iframe：

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> 您可以设置按钮或 iframe 容器的样式以匹配网站设计——BTCPay Server 支持灵活设定发票页面主题。

## 结论

本指南很长——但它只涵盖了将 Zcash 支付 [payments] 与 BTCPay Server 集成的基础方面。

BTCPay Server 界面提供的功能远比我们在此展示的更多。幸运的是，该 UI 提供多种语言版本（包括俄语），便于进一步探索和实验。

BTCPay 是一款高度灵活的工具 [tool]。您可以：

* 在单个实例上托管多个相互独立的商店
* 为团队成员定义自定义角色和权限——从仅查看订单到完整管理员权限
* 使用自己的域名和品牌
* 设置 webhook、备用钱包 [wallet]，甚至 Tor 访问权限
* 配置税务规则、折扣码、结账页面自定义、支付方式限制等高级设置

BTCPay 是作为中心化支付提供商的开源替代方案而构建的。如果您希望接受无需中介的私密 ZEC 支付，这个平台绝对值得您关注。

祝您在探索 BTCPay 生态系统并让您的支付真正由您掌控时一切顺利。

## 资源

* [BTCPay Server官方网站](https://btcpayserver.org/)
* [BTCPay 常见问题](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub 仓库](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server主网演示](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash BTCPay 插件（GitHub）](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash插件安装指南](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [自定义 zcash-lightwalletd.custom.yml 示例](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Docker Compose 文件（Zebra）](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API 密钥文档（Greenfield API）](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [创建 Cloudflare 隧道](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash钱包兼容性列表（ZecHub）](https://zechub.wiki/wallets)
* [Zebra + lightwalletd 在 Raspberry Pi 5 上运行（ZecHub）](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
