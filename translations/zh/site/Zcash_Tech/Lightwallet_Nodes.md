<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# Zcash 轻钱包节点

## 简介

Zcash 是一种注重隐私的加密货币，支持一种称为“轻钱包节点”的功能，使用户无需下载完整的区块链历史记录即可与 Zcash 区块链交互。本 wiki 页面概述了轻钱包节点、`lightwalletd` 服务在 Zcash 生态系统中的作用、当前的轻钱包节点服务器列表，以及如何在 Ywallet 和 Zingo 等常用钱包中更换服务器。

## Lightwalletd 服务

`lightwalletd` 服务，即“lightwallet daemon”的简称，在 Zcash 轻钱包节点生态中发挥着关键作用。它充当中介，为轻量客户端（轻钱包）提供其高效运行所需的信息。以下是对 `lightwalletd` 服务的简要说明：

__数据聚合器__：Lightwalletd 会聚合来自 Zcash 区块链的数据，例如交易信息、区块数据以及屏蔽池信息。

__简化验证__：Lightwalletd 会对这些数据执行简化验证，使轻钱包无需验证整个区块链即可获取必要信息。

__隐私保护__：该服务通过不要求用户暴露其 Viewing Key 或个人交易信息，来保护 Zcash 用户的隐私。

__高效同步__：Lightwalletd 可为轻钱包实现高效同步，显著减少与 Zcash 区块链保持最新状态所需的时间和资源。


## 当前的 Lightwalletd 服务器列表

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## 在移动钱包中更换服务器

更换轻钱包节点服务器相对简单。请在应用内找到并进入高级设置。

__打开 Ywallet/Zingo/Zashi/eZcash__：在你的设备上启动所选钱包。

#### Ywallet:

对于 Ywallet，它位于右上角的齿轮图标中 - 进入 Zcash 标签页。 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

对于 Zingo，它位于左上角的汉堡菜单中，然后点击设置并向下滚动

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

对于 Zashi，它位于右上角的齿轮图标中 - 进入高级设置，然后选择服务器

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

对于 eZcash，它位于左上角的汉堡菜单中，然后点击设置，再点击高级

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## 结论

Zcash 的轻钱包节点和 `lightwalletd` 服务为用户提供了一种便捷且保护隐私的区块链交互方式。能够更换服务器也带来了灵活性，使用户可以选择最适合自己需求的节点。
