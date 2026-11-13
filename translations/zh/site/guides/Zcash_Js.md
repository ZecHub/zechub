# Zcash JS 开发者指南

**zcash.js** (`@zcashlabs/zcash.js`) 是由 Zcash Labs 于 2026 年 10 月 26 日发布的实验性 TypeScript/JavaScript SDK。它让开发者能够通过 Node.js 和浏览器构建与 Zcash 网络交互的钱包[wallet]、轻客户端[light client]、仪表板[dashboard]和应用程序。

> **状态**：实验性 (v0.1.1)。持久化 Node 钱包目前需要 Linux + `flock`。完整的实时浏览器发送/接收功能和历史钱包数据库迁移尚未完全通过认证。在生产环境使用前，请始终查阅官方文档。

## SDK 提供的功能

- `createPublicClient` — 无状态 JSON-RPC 查询和交易[transaction]观察
- `createLightClient` — 轻钱包查询和流（Node 上使用原生 gRPC，浏览器中使用 gRPC-Web）
- `createWalletClient` — 本地账户、扫描、提案、签名、提交和已记录支付[payment]恢复
- 精确的 `bigint` 金额、网络验证、查看/地址[address]工具和 PCZT 实用工具
- 内置基础钱包引擎、workers 和本地 Sapling 证明资产（无需单独安装 Rust）

## 安装

使用 **Node.js 22.23.4**（软件包固定的版本）。

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- 优先使用带 ESM 的 TypeScript（在 `package.json` 中使用 `"type": "module"`）。
- 浏览器应用程序可通过现代 ESM 打包器运行。打包器将输出延迟加载的 WASM、worker 和证明资产——必须将这些资产与应用程序一同部署。

## 首次链[chain]查询（无需钱包）

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- 省略 `network` 选项时，默认使用主网（请提供匹配的端点）。
- 纯 JSON-RPC 使用场景也提供 `createPublicClient`。

## 打开钱包

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### 存储选项

| 环境     | 存储选项                                      |
|-----------------|-----------------------------------------------------|
| Node（持久化）  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| 浏览器         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| 临时使用      | `{ kind: 'memory' }`                                |

**重要默认值**（截至 v0.1.1）：

- 默认情况下，支出和找零仅使用 Ironwood
- 手续费[fee]规则：ZIP-317
- 确认数：3 个受信任 / 3 个不受信任
- 在提议支付前，始终调用 `wallet.sync()`

## 高级钱包工作流程

1. 创建或导入助记词账户并附加签名器
2. 调用 `wallet.sync()`
3. 请求接收地址（优先使用 Unified / Ironwood）
4. 创建提案 → 审核提案 → 调用 `wallet.send()`
5. 监控确认状态，或在重启后使用已记录操作进行恢复

应用程序负责管理助记词字节。不再需要时，请从内存中清除它们。始终提供清晰的批准 UI，显示每个收款人、金额、手续费、pool 和到期时间。

有关完整的可运行示例，请参阅官方 [Wallet 演练](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)。

## 平台说明与当前限制

| 功能            | Node                              | 浏览器                          |
|-----------------------|-----------------------------------|----------------------------------|
| 软件包               | Node 22.23.4 + ESM                | 现代 ESM 打包器 + WebAssembly |
| 轻量查询         | 原生 gRPC                       | gRPC-Web + CORS                  |
| 持久化存储       | 仅限 Linux + `flock`              | OPFS（安全上下文）            |
| 临时存储    | memory                            | memory                           |

其他限制：

- 持久化 Node 存储目前仅支持 Linux
- 尚不支持托管密钥保管库、远程证明服务或硬件签名器集成
- 存储**并未**宣称处于静态加密[encryption]状态
- 请勿从多个进程或浏览器标签页同时打开同一钱包存储
- 始终使用 `await wallet.close()` 正确关闭钱包

## 后续步骤

- 官方安装与首次请求：[安装](https://zcashlabs.github.io/zcashjs/api/installation.html)
- 打开并配置钱包：[打开钱包](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- 完整工作流程：[钱包演练](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API 参考：[API 参考](https://zcashlabs.github.io/zcashjs/api/reference.html)
- 平台限制：[Node 和浏览器设置](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## 官方资源

- 开发者手册：[https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub 仓库：[https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm 软件包：`@zcashlabs/zcash.js`


---

*本指南基于 `@zcashlabs/zcash.js@0.1.1`（2026 年 10 月）。SDK 正在积极开发中——对于最新 API 和限制，请始终以官方文档为准。*
