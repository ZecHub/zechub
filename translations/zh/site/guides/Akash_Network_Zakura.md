# 如何在 Akash 网络上运行 Zakura

使用 [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) 模板部署 **Zakura** Zcash 全节点的分步指南。

Zakura 是与共识兼容的 Zcash 节点（从 Zebra 分叉而来），具有更快的同步速度、原生修剪功能和快照引导。此模板固定使用 **`zakuracore/zakura:1.8.1`**（按摘要固定；请勿使用 `:latest` 或 `1.1.1`）。

### 可获得的功能

- 主网 P2P：容器端口 **8233**，面向全网发布（见下方端口映射）
- 持久化的修剪后状态（默认 64 GiB），首次启动时使用 Valar 快照引导
- Prometheus **9999** 和健康检查 **8080**（内部端口，无公共 URI）
- 面向同机部署的 **lightwalletd** 的内部 JSON-RPC **8232**；LWD 监听容器端口 **9067**，并面向全网发布

SDL 中的功能标志（true/false）：`ENABLE_METRICS`、`ENABLE_HEALTH`、`ENABLE_RPC`、`ENABLE_LIGHTWALLETD`。启用 lightwalletd 时，Cookie 身份验证会关闭，因为 lightwalletd 无法读取 Cookie 文件。

### 应使用哪个站点（支付）

SDL 相同。两个 Akash 网页界面的**支付方式**不同。

| 站点 | 支付方式 | 钱包 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 传统网页结账（银行卡 / Console 提供的法币支付渠道） | Console 账户 |
| [air.akash.network](https://air.akash.network) | 原生 Akash 链支付（AKT / ACT） | **Keplr** |

如需使用 Keplr 链上支付，请选择 **Air**。如需传统网页支付流程，请选择 **Console**。不要指望在 Console 上使用 Keplr 原生结算。

### 部署

**网页支付（Console）**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**使用 Keplr 进行原生 Akash 支付（Air）**

[在 Air 上打开此模板](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. 打开上方对应的链接（Console 或 Air）。
2. 在 Air 上连接 **Keplr**，并确认有足够的 AKT/ACT 用于存款和租用。在 Console 上，按界面提示完成网页结账。
3. 如果 `zcash-zakura/deploy.yaml` 尚未自动填入，请加载它。
4. 存入资金、接受报价，并等待租约生效。
5. 日志应显示快照下载（首次启动时），随后显示 `zakurad start`。
6. 打开 **Leases → URIs**。请使用服务商分配的主机和端口，不要使用公共 IP 上的 8233 或 9067。

### Akash 如何发布端口

SDL 中的 `port` / `as`（8233、9067、8232）是**容器**端口。Zakura 仍监听 8233；lightwalletd 监听 9067；RPC 监听 8232，供 LWD 边车使用（`zakura:8232`）。

这些**并非**服务商公共 IP 上的端口。

**默认设置（此模板）：**没有专用 IP。每个 `global: true` TCP 暴露端口都会映射到服务商共享主机上的一个**随机高位端口**。Console/Air 会将这些端口列为租约 URI，例如：

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

对等节点连接 **8233** URI（`provider.example:31482`）。轻钱包使用 **9067** URI（除非自行终止 TLS，否则不启用 TLS）。请将 `ZAKURA_NETWORK__EXTERNAL_ADDR` 设置为映射后的 P2P URI，而不是 `:8233`。

**内部**暴露端口（`8232` RPC、`9999` 指标、`8080` 健康检查）仅在部署网络内可用，不提供公共 URI。

**专用 IP**（`endpoints` / `kind: ip`）需要额外付费，且**不包含**在此模板中。它们可以固定一个公共 IP，有时也能固定 `as` 端口。只有在需要稳定的 `host:8233` 时才添加此项。

### 归档模式与修剪模式

默认采用**修剪模式**（快照约 11 GiB，磁盘 64 GiB）。如需完整历史记录，请设置 `SNAPSHOT_KIND=archive`，将磁盘容量提高到 350 GiB 以上，并设置 `ZAKURA_STATE__STORAGE_MODE=archive`。

### 相关内容

- [Zebra，基于 Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad`（完整历史记录，无快照）
- [Thus Spoke Zakura，基于 Akash](/guides/thus-spoke-zakura-akash) — Regtest 仪表板 + 应用（v0.4.1）
- Zakura 源码：[github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- 快照：[zakura.com/snapshots/](https://zakura.com/snapshots/)
