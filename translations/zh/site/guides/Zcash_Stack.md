<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash Stack：在 Kubernetes 或 Docker 上运行轻钱包服务器

[Zcash Stack](https://github.com/zecrocks/zcash-stack) 是 zec.rocks 团队推出的开源部署工具包。它将 Zcash 全节点、轻钱包服务器和可选组件（Zaino、区块浏览器、Tor 隐藏服务、DNS 种子服务器、zecd、供浏览器钱包使用的 gRPC-web 代理）打包成适用于 Kubernetes 的 Helm chart，以及 Docker Compose 文件。所有 zec.rocks lightwalletd 服务器都通过此 chart 运行。该项目由 [Zcash Community Grants](https://zcashcommunitygrants.org/) 提供资金支持。

本页概述该工具包部署的内容、安装前的准备事项，以及最重要的设置。本页依据 **0.4.9** 版 chart（于 2026 年 11 月 13 日发布）。请以项目自己的 [chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) 和 [研讨会笔记](https://github.com/zecrocks/zcash-stack/tree/main/docs) 为准；在生产环境运行任何内容前，请先阅读这些资料。

## 简要说明

- **两种部署方式。** 适用于 Kubernetes 的 Helm chart（主要面向在自有 NVMe 硬件上运行的 k3s；也支持 GKE Standard 和 Autopilot），以及适用于单台机器的 Docker Compose 文件。研讨会建议新手使用 Docker，已有服务器集群的用户使用 Kubernetes。
- **一个链节点加一台轻钱包服务器。** 推荐配置为 Zebra + lightwalletd。Zakura 可替代 Zebra 作为后端，Zaino 可替代 lightwalletd，也可与其并行运行。
- **预留约 600 GiB 磁盘空间。** 2026 年 6 月，Zebra 的链状态约为 260 GiB，且仍在增长；轻钱包缓存另需约 17 GiB。完整同步需要数天，因此 chart 支持从已发布的快照恢复。
- **chart 固定了镜像版本。** 在 0.4.9 版中，分别为 Zebra 7.0.0（跟随 NU7）、lightwalletd v0.6.1、Zakura 1.8.6 和 Zaino 0.8.0。网络升级前，以及 Zakura 版本达到停止支持高度前，请更新 chart。
- **注册你的服务器。** 公共服务器运营者可以将服务器添加到 [hosh.zec.rocks](https://hosh.zec.rocks/zec) 监控中，让钱包和用户查看服务器是否在线。

## 部署内容

每个组件都可以通过 chart 的 [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) 开关控制。默认只启用 lightwalletd，而它需要链节点，因此示例文件也会启用 Zebra。

| 组件 | chart 0.4.9 中的镜像 | 默认状态 | 功能 |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | 关闭（示例中开启） | 全节点；验证链并通过 RPC 为其他组件提供服务 |
| Zakura | `zakuracore/zakura:1.8.6` | 关闭 | Zebra 分支；可作为 lightwalletd 或 Zaino 的直接替代后端，取代 Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | 开启 | 为移动端和桌面钱包提供轻钱包服务器（gRPC） |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | 关闭 | Rust 索引器，同时为轻钱包提供服务 |
| 区块浏览器 | `emersonian/zcash-explorer:v0.0.6` | 关闭 | 读取节点 JSON-RPC 的网页浏览器（Zaino 无法作为其后端：它只提供 gRPC 服务） |
| Tor | `osminogin/tor-simple:0.4.9.16` | 关闭 | 将 lightwalletd 或 Zaino 发布为 `.onion` 服务 |
| DNS 种子服务器 | `zfnd/dnsseeder:v1.8.0` | 关闭 | 帮助新节点寻找对等节点 |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | 关闭 | 以屏蔽优先的钱包服务器（参见 [zecd](/zcash-tech/zecd)） |
| gRPC-web 代理 | `envoyproxy/envoy:v1.40.2` | 关闭 | 让浏览器钱包连接到 lightwalletd；浏览器无法通过原始 gRPC 连接它 |
| WebZjs 钱包 | `ghcr.io/zecrocks/webzjs-wallet` | 关闭 | 浏览器钱包；需要在同一主机上启用 gRPC-web 代理 |

关于版本的两点说明。Zaino 上游版本为 [0.10.1](https://github.com/zingolabs/zaino/releases)，而 chart 仍提供 0.8.0 镜像，因此依赖较新的 Zaino 行为前，请先查看 `values.yaml`。此外，Zakura 节点在主网上到达各版本各自的停止支持高度后会停止运行：1.8.6 版的高度为区块 3,643,309，预计在 2026 年 12 月 5 日左右；自 1.8.0 版起，x86-64 构建在缺少 BMI2 和 ADX 的 CPU 上会拒绝启动。[Zakura Node](/zcash-tech/zakura-node) 页面涵盖了这两点。

## Kubernetes：安装前准备

此 chart 需要连接到你为每个集群预先配置的三项内容。

1. **入口控制器。** chart 会创建标准 Kubernetes `Ingress`，并默认使用 `nginx` 类；推荐使用 ingress-nginx，因为它在 k3s 和 GKE 上处理 gRPC 的方式相同。在 k3s 上，可以在安装 k3s 时使用 `--disable traefik`，也可以保留 Traefik 并设置 `ingress.className: traefik` 和 `ingress.backendProtocol: GRPC`（此时 chart 会生成 Traefik `IngressRoute`，因为通过 Traefik 的普通 Ingress 会使 gRPC 返回 HTTP 500）。在 GKE 上，内置的 `gce` 入口类无法将 gRPC 路由到 lightwalletd 或 Zaino。
2. **cert-manager 和 ClusterIssuer**，用于自动申请 Let's Encrypt 证书（`examples/cluster-issuer.yaml`；请先使用暂存签发器测试）。在 GKE Autopilot 上，请使用 `--set global.leaderElection.namespace=cert-manager` 安装 cert-manager，否则创建签发器时会出现 x509 "unknown authority" 错误。你也可以跳过 cert-manager，改为让 `<service>.ingress.tls.secretName` 使用自己的证书。
3. **StorageClass。** 在配备 NVMe 的 k3s 上使用 `local-path` 即可。在 GKE 上，为 Zebra 指定一个已配置的 IOPS 类（仓库提供了 Hyperdisk 示例），并先提高区域磁盘配额：新的 GKE 项目每个区域仅有 500 GB SSD 和 500 GB Hyperdisk 配额，而链节点需要 300 到 500 GB，因此否则卷会一直停留在 `Pending` 状态并显示 `QUOTA_EXCEEDED`。`storageClassName` 无法在现有 StatefulSet 上更改，除非重新创建卷。

然后将每个主机名的 DNS 记录指向入口控制器的外部 IP。如果还没有 DNS，可在真实主机名旁列出一个 [sslip.io](https://sslip.io) 名称，例如 `203-0-113-7.sslip.io`：它会解析为名称中嵌入的 IP，因此可以立即签发证书。对于长期运行的服务器，请将自己的主机名设为主名称。

## Kubernetes：安装

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) 示例会启用 Zebra，将 lightwalletd 连接到它，为 lightwalletd 配置 40 GiB 缓存和 TLS Ingress，并将节点 RPC 保留在集群内部。安装前请修改占位 RPC 用户名和密码。其他示例涵盖测试网、GKE、带高可用性的 GKE Autopilot、Tor 隐藏服务以及 sslip.io 引导配置。

升级时，运行 `helm repo update`，使用 helm-diff 插件预览变更（`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`），然后用相同参数运行 `helm upgrade`。如果要从 0.0.x 版 chart 升级，请先阅读 [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md)：0.1.0 版用标准 Ingress 和 cert-manager 替换了旧的 Traefik 配置，并更改了 values 布局。

## 资源配置

| | 稳定运行 | 初始同步 | 磁盘 |
|:--|:--|:--|:--|
| Zebra | 约 0.1 vCPU，1.6 GiB | 占用大量 CPU、IOPS 和内存 | 约 260 GiB（2026 年 6 月），且仍在增长；chart 默认值为 500 GiB |
| lightwalletd | 约 0.15 vCPU，165 MiB | 逐区块构建缓存 | 约 17 GiB；chart 默认值为 40 GiB |

整个堆栈申请约 1.5 vCPU 和 4.5 GiB 内存。对于单台机器，chart 建议配置 8 vCPU、32 GiB RAM 和约 1 TB NVMe（在 GKE 上，使用配备 500 GiB Hyperdisk 或 pd-ssd 卷的 `n2-standard-8`）。默认资源请求已满足 GKE Autopilot 的最低要求，并且不设置 CPU 限制，以便同步过程可以突发使用更多资源。

## 值得了解的设置

**从快照恢复。** 设置 `<chain>.initSnapshot.enabled: true`（搭配 `initSnapshot.url`、`gs://` 或 `https://`），即可从已发布的快照启动，而无需从创世区块开始同步。恢复过程会记录进度，能妥善重新执行中断的下载，也不会清除先前安装留下的健康卷。快照是一种信任捷径：快照之后的区块仍会经过验证，错误快照会表现为区块无法通过验证。研讨会估计，从头同步约需 10 天，而从快照启动约需 10 小时。

**扩容与零停机。** lightwalletd 和 Zaino 是节点前端的轻量缓存，因此运行 `replicas: 2` 可在滚动更新期间保持服务不中断（副本数大于 1 时会自动添加 PodDisruptionBudget）。链节点并非用于增加负载处理能力：每个副本都是一个额外的全节点，拥有自己的卷并单独同步，因此只运行一个即可；如需冗余，可运行两个。

**入站对等连接。** 默认情况下，Zebra 只建立出站连接。`zebra.p2pPublic.enabled: true` 会在端口 8233（测试网上为 18233）接受入站对等连接并公布你的地址；在裸机和 k3s 上选择 `externalAddrFrom: hostIP`，在节点自身 IP 为私有地址的云环境中选择 `nodeExternalIP`，在 GKE Autopilot 上则选择配有保留静态 IP 的 `loadBalancer`。

**TLS 和 gRPC。** TLS 在入口处终止，集群内部运行明文 HTTP/2，因此多个主机名可以指向同一个 lightwalletd。请将 `path: /` 与 `pathType: Prefix` 配合使用，因为 gRPC 方法路径需要它。如果首次签发证书因 HTTPS 重定向而失败，可使用暂存签发器签发，或暂时设置 `ingress.tls.sslRedirect: "false"`。

**Tor 隐藏服务。** 当集群没有公共 IP 或域名时很有用：

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

使用 `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` 读取地址，并通过本地 Tor 客户端配合 [zecping](https://github.com/zecrocks/zecping) 进行测试：`./zecping -socks localhost:9150 -addr <address>.onion:443`。

**网络升级期间。** Zebra 可能会封禁仍在运行旧版本的对等节点并导致进程停滞，同时记录链更新已停滞的日志。它的封禁列表保存在内存中，因此 `kubectl delete pod zebra-0` 会清空列表；Pod 会使用相同链数据重新启动，无需重新同步。

## Docker Compose

在单台机器上，克隆仓库并从 `docker/` 文件夹启动默认文件：

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` 会在 x86 主机上运行 Zebra、lightwalletd 和 [Watchtower](https://containrrr.dev/watchtower/)；`compose.arm.yaml` 会在 ARM 主机上执行相同操作。Watchtower 会自动拉取新镜像，默认文件使用 `zfnd/zebra:latest` 标签，因此节点会跟随新 Zebra 版本，无需手动升级。`compose.zaino.yaml` 会将 lightwalletd 替换为 Zaino，但它固定使用较旧的社区镜像（`emersonian/zcash-zaino:0.1.2-zr4`），因此使用前请先检查。其他文件还提供 Caddy TLS 前端、VPS 代理，以及用于连接家中节点的 autossh 隧道。

在 `.env` 文件中设置 `LIGHTWALLETD_DONATION_ADDRESS` 为你自己的统一地址，即可将其发布为服务器的捐赠地址。首次 `docker compose up` 前，从 `docker/` 文件夹运行 `./download-snapshot.sh`，会下载链快照，而不是从头开始同步。

## 连接与监控

研讨会的第二节课介绍如何公开服务器：使用公共静态 IP、通过 SSH 隧道连接到 VPS 或 Tailscale Funnel 来隐藏家庭 IP，或运行仅供 Tor 使用的服务器。可在钱包中将服务器设为连接目标（在 ZODL 的高级设置中；参见 [更改钱包中的服务器](/zcash-tech/lightwallet-nodes)），或使用 gRPC 客户端调用 `GetLightdInfo`，以测试结果。

监控方面，第三节课列出了手动 Docker 命令，并建议向 [hosh](https://hosh.zec.rocks/zec)（zec.rocks 在线状态监控器）注册公共服务器。注册方式是提交拉取请求，将你的主机名和端口添加到 hosh 的服务器列表中。如需任何步骤的帮助，可前往 [zec.rocks 研讨会论坛](https://workshops.zec.rocks)。

## 常见错误

**在没有链节点的情况下安装 lightwalletd。** lightwalletd 从 Zebra（或 Zakura）读取数据。请启用其中一个，或使用已启用它的示例文件启动。

**保留示例 RPC 凭据。** 示例中使用的是占位值。RPC 虽然仅在集群内开放，但仍应修改这些凭据。

**在 GKE 默认磁盘配额下运行链节点。** 卷将无法绑定。请在安装前提高区域配额。

**为增加负载处理能力而扩展 Zebra。** 每个 Zebra 副本都会多做一次完整同步。请改为扩展 lightwalletd 或 Zaino。

**网络升级期间仍使用旧版 chart。** 升级前的节点在升级后会停止跟随主网（自 NU7 起，Zebra 需要 7.0.0 或更高版本）。请运行 `helm repo update`，并在激活高度和 Zakura 的停止支持高度到来前升级 chart。

## 相关页面

- [Zcash 轻钱包节点](/zcash-tech/lightwallet-nodes)：轻钱包服务器能够和无法看到的内容，以及公共服务器。
- [Zebra 全节点](/zcash-tech/zebra-full-node)：此堆栈运行的验证节点。
- [Zakura 节点](/zcash-tech/zakura-node)：chart 可以运行的 Zebra 分支。
- [Zaino](/zcash-tech/zaino)：Rust 索引器。
- [zecd](/zcash-tech/zecd)：chart 可以添加的钱包服务器。
- [Zcash 节点 RPC 与索引](/guides/zcash-node-rpc-and-indexing)：Zebra RPC、Zallet 和索引器。
- [如何在 Akash Network 上运行 Zebra](/guides/akash-network-zebra)：另一种托管节点的方式。

## 资源

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack)（仓库、版本发布和示例）
- [Zcash Stack Helm chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [研讨会笔记：同步、连接、观察](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub 列表](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec)（公共服务器监控器）

**最后更新：** 2026 年 11 月（chart 0.4.9）
