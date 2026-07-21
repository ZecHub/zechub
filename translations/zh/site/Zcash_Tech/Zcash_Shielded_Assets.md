<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>
<a href="">
    <img src="https://i.ibb.co/0VfMFB5/image-2023-11-18-160742427.png" alt="" width="800" height="500"/>
</a>

# Zcash 屏蔽资产

Zcash Shielded Assets（ZSA）是对 Zcash 协议提出的一项改进，旨在支持在 Zcash 链上创建、转移和销毁自定义资产。

如果你熟悉 Ethereum 区块链上的 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) 代币标准，那么 ZSA 对于 Zcash 的意义，就如同 ERC-20 代币对于 Ethereum。

Zcash Shielded Assets 将支持在 Zcash 区块链上创建自定义代币，从而使除 [ZEC](https://wiki.zechub.xyz/using-zec-privately) 之外的代币也能受益于 Zcash 区块链上屏蔽交易所提供的匿名性和隐私保护。

ZSA 的一个主要潜在用途，是在 Zcash 协议上发行稳定币。稳定币是一种将价值锚定于法定货币（如美元或欧元）的加密货币。目前，一些流通最广的稳定币是 ERC-20 代币，例如 [USDC](https://www.circle.com/en/usdc) 和 [Dai](https://docs.makerdao.com/)。

ZSA 的另一个潜在用途，是发行治理代币。例如，Zechub（本 wiki 的发布者）是一个去中心化自治组织（DAO），可以创建并向其成员发行一种 ZSA，用于对提案和治理决策进行投票。

ZSA 由 [QEDIT](https://qed-it.com/) 在 [Zcash Foundation](https://wiki.zechub.xyz/zcash-foundation) 的一项重大资助下开发，并与 [Electric Coin Company](https://wiki.zechub.xyz/electric-coin-company) 合作推进。由于该项目目前仍在积极开发中，最新进展会发布在 Zcash 论坛的[这个帖子](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153)中。QEDIT 提交的 [ZSA grant application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) 可在 Zcash Foundation 的资助网站上查看。


### Zebra 上的 ZSA 演示


[![视频缩略图](https://i.ytimg.com/vi/1MZMGC9ViyA/hqdefault.jpg?)](https://youtu.be/1MZMGC9ViyA)


**亲自运行演示！** 

克隆 zcash-tx-tool 仓库：
[https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)


___

## Zcash 改进提案（ZIPs）

[ZIP 226](https://zips.z.cash/zip-0226)：Zcash Shielded Assets 的转移与销毁
[ZIP 227](https://zips.z.cash/zip-0227)：Zcash Shielded Assets 的发行
[ZIP 230](https://zips.z.cash/zip-0230)：Version 6 交易格式


## ZSA 资助提案

关于屏蔽资产的 ZSA 提案（ZSA/UDA）由 [QEDIT](https://qed-it.com/) 团队提出，目标是在 Zcash 区块链上构建通用屏蔽资产。这类资产通常被称为用户定义资产（UDA）或 Zcash Shielded Assets（ZSA）。

通过这项提案，[QEDIT](https://qed-it.com/) 团队计划将 DeFi 引入 Zcash 生态系统，同时也使现有 DeFi 生态系统能够使用最佳的隐私技术。根据一次社区投票调查，团队发起提问，社区作出回答：[通用屏蔽资产（ZSA/UDA）是目前呼声最高的功能](https://twitter.com/BenarrochDaniel/status/1428327864034791429)

这些提案在技术上遵循 [Zcash 改进提案（ZIP）](https://zips.z.cash/zip-0000) 规范，并定义于 ZIP 226 和 ZIP 227 中。

1. [ZIP 226](https://qed-it.github.io/zips/zip-0226)：Zcash Shielded Assets 的转移与销毁
2. [ZIP 227](https://qed-it.github.io/zips/zip-0227)：Zcash Shielded Assets 的发行
