# Zaino Indexer

Zaino 是一个 Indexer，由 Zingo 团队使用 Rust 开发，旨在取代 lightwalletd，并推动 zcashd 弃用项目向前发展。

Zaino 为轻客户端提供核心功能，例如不需要完整区块链历史的钱包和应用程序，同时也支持全节点客户端或钱包。它还支持区块浏览器，使其能够访问已最终确认的区块链，以及由 Zebra 或 Zcashd 全验证节点管理的未最终确认最佳链和 mempool。

## 为什么需要一个新的 Indexer？

最主要的原因是为未来做好准备。Zcashd 和 lightwalletd 构建于 2016 年，代码分叉自 bitcoind，使用 C plus。用于构建这两项服务的平台和代码正在逐渐老化，变得难以扩展、维护，也难以在其上构建现代功能。

Rust 是一种现代、稳健且安全的语言，能够让 Zcash 为未来的发展做好准备，并吸引新开发者在 Zcash 生态系统之上及其周边构建大量新功能。

尽管如此，Zaino 仍尽可能保持向后兼容，提供 API 和接口，以帮助减少采用过程中的摩擦，并确保更广泛的 Zcash 生态系统能够受益于 Zaino 的增强功能，而无需进行大规模重写或面对陡峭的学习曲线。

此外，Zaino 将允许通过 RPC 访问和完整的客户端库，将轻客户端功能与全节点分离，使开发者能够在其轻客户端应用中集成 Zaino，并直接访问链上数据，同时让 Zebra 节点中的敏感数据保持隔离与安全。

## 一些展示 Zaino 工作方式的图表

### Zaino 内部架构
![Zaino 内部架构](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Zaino 在线服务架构
![Zebra 在线服务架构](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Zaino 系统架构
![Zaino 系统架构](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## 我可以在哪里了解更多？
你可以在官方的 [Zcash 社区论坛帖子](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) 或其官方 [Github 页面](https://github.com/zingolabs/zaino) 中阅读更多关于 Zaino Indexer 的内容。
