<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 出站 Viewing Key (OVK)

出站 viewing key (outgoing viewing key, OVK) 是一个仅用于加密屏蔽 (shielded) 输出的*出站*密文的 32 字节值。它允许一方恢复已发送的 note 明文（接收方地址、数额和备忘录），但无法花费资金或查看入站 note。

接收方始终使用自己的入站 viewing key 解密入站 note。OVK 的选择不会改变接收方所看到的内容。原始 OVK 没有标准编码；它只是 32 字节。

## 简而言之

- OVK 仅控制谁能够恢复屏蔽支付的出站明文。
- 钱包会在三种策略中选择：**发送方**（使用账户的 UFVK 进行常规恢复）、**自定义**（使用你提供的密钥进行恢复）或**丢弃**（无人能够从链上恢复出站明文）。
- 即使使用丢弃或自定义 OVK，UFVK 持有者仍可看到哪些 note 已被花费，并计算离开该账户的净额。
- 要让特定 UFVK 无法看到某笔数额，唯一可靠的方法是确保这些 note 从未属于该账户（使用独立账户或独立钱包）。
- 这三种策略已存在于 `zcash_client_backend` 中；如今几乎每个钱包都只使用默认的发送方策略。

---

## 三种策略

基于 `zcash_client_backend` 构建的钱包会在构建交易时选择一个 `OvkPolicy`：

| 策略 | 出站密文 | 后续可恢复出站明文的对象 |
|--------|----------------------|----------------------------------------------|
| **发送方**（默认） | 加密至账户的常规 OVK | 发送账户的 Unified Full Viewing Key |
| **自定义** | 加密至你提供的密钥 | 持有提供密钥的任何人 |
| **丢弃** | 不使用 OVK（`ovk = ⊥`） | 无人（包括发送方） |

一个便捷构造函数可通过单个 32 字节值创建 `Custom` 策略，使外部和内部 OVK 均为同一密钥。

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

请参阅 [OvkPolicy 文档](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)及 [ZIP 310](https://zips.z.cash/zip-0310)。

## 每种策略的用途

**发送方**是常规的钱包行为。交易被挖矿确认后，持有账户 UFVK 的任何人都可解密出站密文，并恢复接收方地址、数额和备忘录。

**自定义**允许你让第三方（审计员、支付处理商、收据系统或独立设备）能够解密特定出站支付，而无需向其提供完整 viewing key。你也可以使用在交易后丢弃的临时密钥，或为不同交易对手使用不同密钥，从而使任何单一密钥都无法查看全部出站支付。

**丢弃**意味着发送钱包无法从链上恢复出站明文。当你希望尽可能减少 UFVK 日后泄露时可恢复的信息，或刻意不希望留下账户 OVK 可打开的链上记录时，此策略很有用。

## UFVK 持有者仍可看到什么

即使使用丢弃或自定义 OVK，账户 UFVK 的持有者仍可：

- 检测账户中的哪些 note 已被花费（通过 nullifier）。
- 知道这些输入 note 的数值。
- 恢复任何找零 note（它们加密至内部入站 viewing key，而非 OVK）。
- 因此计算离开该账户的净额。

不可见的信息包括各个接收方地址、数额的拆分方式以及备忘录。`WalletWrite` 文档警告，如果本地记录丢失，在丢弃策略（或随机自定义 OVK）下创建的交易数据无法从链上数据中恢复。

## 让特定 UFVK 无法看到数额

`OvkPolicy` 仅控制出站明文的恢复。它不会向账户自身的 UFVK 隐藏花费或净额。

要让特定 UFVK 无法看到某笔数额，唯一可靠的方法是确保承载该数额的 note 从未属于该 UFVK 所控制的账户：

1. **独立 ZIP-32 账户**（相同种子）——创建一个新的账户索引，将资金转入其中，并且绝不导出该账户的 UFVK。原账户的 UFVK 只能看到转入新账户的转账。
2. **完全独立的钱包**（不同种子）——向一个全新的钱包注入资金，从中花费，并丢弃该种子或 UFVK。原钱包仅记录该笔注资转账。
3. **临时一次性钱包**——与上述相同，但将花费钱包视为一次性使用。

UFVK 是按账户划分的。从未存在于该账户中的 note 永远不会出现在其余额或流出总额中。

## 当今钱包如何使用这些策略

几乎所有生产钱包都只使用默认的**发送方**策略，因此可从 UFVK 恢复完整的出站历史记录。另外两种策略虽存在于库中，却很少在用户界面中提供。

未来可能的选项包括：

- 一个按交易设置的标志，让用户为单笔支付选择自定义或丢弃。
- 永久丢弃模式（届时恢复种子将仅显示净流出）。
- 用于单笔支付选择性披露的自定义 OVK（比完整的 [ZIP 311](https://zips.z.cash/zip-0311) 支付披露更轻量）。
- 继续使用账户或钱包隔离，以实现更强的隔离性。

## 资源

- [ZIP 310：Sapling Viewing Key 的安全属性](https://zips.z.cash/zip-0310)
- [ZIP 316：Unified 地址和 Unified Viewing Key](https://zips.z.cash/zip-0316)
- [ZIP 315：钱包实现的最佳实践](https://zips.z.cash/zip-0315)
- [zcash_client_backend 中的 OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## 相关页面

- [Viewing Key](/zcash-tech/viewing-keys)
- [支付披露](/zcash-tech/payment-disclosures)
- [Unified 地址](/zcash-tech/unified-addresses)
- [区块浏览器能够看到什么](/zcash-tech/what-a-block-explorer-can-see)
