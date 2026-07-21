# ZAP1 证明协议

ZAP1 是一个面向 Zcash 的开源证明协议。它将结构化的生命周期事件写入一个 BLAKE2b Merkle 树，并通过 Orchard 屏蔽 memo 将树根锚定到链上。证明可公开验证。事件数据保持私密。

## 工作原理

运营者注册事件类型（部署、支付、转账等），并将其提交到一个 ZAP1 实例。每个事件都会使用域分离的 BLAKE2b-256 生成一个叶子哈希。叶子会累积到一个 Merkle 树中。当达到阈值时，树根会被编码为一个 ZAP1:09 memo，并通过一笔屏蔽交易锚定到 Zcash。

任何持有叶子哈希的人都可以验证从叶子到树根、再到链上锚点的完整路径，而无需信任运营者。

## 关键特性

- **与应用无关**：任何 Zcash 运营者都可以定义自己的事件类型和个性化字符串
- **保护隐私**：事件负载在锚定前会先被哈希。只有哈希会上链。
- **可独立验证**：验证只需要证明包和链访问能力。无需信任运营者。
- **兼容 ZIP 302**：ZAP1 正在逐步收敛为用于证明负载的 ZIP 302 `partType`

## 已有内容

- 参考实现（Rust，MIT 许可）
- 发布在 crates.io 上的验证 SDK（Rust + 83KB WASM）
- 发布在 npm 上的 JavaScript SDK
- 通用 memo 解码器（可识别 ZAP1、ZIP 302 TVLV、文本、二进制和空 memo）
- 一致性工具包，包含 29 项 API 检查和 14 项协议检查
- 用于多方锚点广播的 FROST 2-of-3 阈值签名设计
- 正在审查中的 ZIP 草案 PR #1243
- 截至 2026 年 3 月，已有 4 个主网锚点和 14 个叶子

## 架构

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

每个运营者都会运行自己的 ZAP1 实例，并拥有自己的密钥、Merkle 树和锚点。运营者之间没有共享状态。

## 了解更多

- 源码：[github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- 验证 SDK：[crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo 解码器：[crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- 协议规范：[ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP 草案：[PR #1243](https://github.com/zcash/zips/pull/1243)
- 在线 API：[pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- 运营者指南：[frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
