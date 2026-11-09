# ZAP1 认证协议[Attestation Protocol]

ZAP1 是一个面向 Zcash 的开源认证协议。它将结构化生命周期事件写入 BLAKE2b Merkle 树，并通过 Orchard 屏蔽备忘录[shielded memos] 将树根锚定到链上[on-chain]。证明[proof]可公开验证。事件数据保持私密。

## 工作原理

运营者注册事件类型（部署、支付[payments]、转移等），并将其提交至 ZAP1 实例。每个事件都会使用域分离的 BLAKE2b-256 生成叶哈希。叶节点累积到 Merkle 树中。当达到阈值时，树根会被编码为 ZAP1:09 备忘录[memo]，并在屏蔽交易[shielded transaction]中锚定至 Zcash。

任何拥有叶哈希的人都可以验证从叶节点到树根再到链上锚点的完整路径，而无需信任运营者。

## 关键属性

- **与应用无关**：任何 Zcash 运营者都可以定义自己的事件类型和个性化字符串
- **保护隐私[Privacy-preserving]**：事件负载在锚定前会被哈希处理。只有哈希会上链。
- **可独立验证**：验证只需要证明包和链访问。无需信任运营者。
- **ZIP 302 兼容**：ZAP1 正在向用于认证负载的 ZIP 302 partType 靠拢

## 现有内容

- 参考实现（Rust，采用 MIT 许可证）
- crates.io 上的验证 SDK（Rust + 83KB WASM）
- npm 上的 JavaScript SDK
- 通用备忘录解码器（识别 ZAP1、ZIP 302 TVLV、文本、二进制和空备忘录）
- 包含 29 项 API 检查和 14 项协议检查的一致性工具包
- 用于多方锚点广播的 FROST 2-of-3 阈值签名设计
- 正在审查中的 ZIP 草案 PR #1243
- 截至 2026 年 3 月，已有 4 个主网锚点和 14 个叶节点

## 架构

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

每个运营者都会运行自己的 ZAP1 实例，并拥有自己的密钥、Merkle 树和锚点。运营者之间没有共享状态。

## 了解更多

- 源代码：[github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- 验证 SDK：[crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- 备忘录解码器：[crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- 协议规范：[ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP 草案：[PR #1243](https://github.com/zcash/zips/pull/1243)
- 实时 API：[pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- 运营者指南：[OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
