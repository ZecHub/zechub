<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Viewing Key

屏蔽地址使用户能够在 Zcash 区块链上进行交易，同时尽可能少地泄露信息。当你需要向特定一方披露与某笔屏蔽 Zcash 交易相关的敏感信息时，会发生什么？每个屏蔽地址都包含一个 Viewing Key。Viewing Key 在 [ZIP 310](https://zips.z.cash/zip-0310) 中被引入，并在 Sapling 网络升级中加入协议。Viewing Key 是 Zcash 的关键组成部分，因为它允许用户选择性地披露交易信息。

### 为什么要使用 Viewing Key？

用户为什么会想要这样做呢？以下摘自 Electric Coin Co. 关于这个话题的博客……

*- 某交易所希望在客户向一个屏蔽地址存入 ZEC 时进行检测，同时将 **spend authority** 密钥保存在安全硬件中。该交易所可以生成一个 incoming viewing key，并将其加载到一台联网的 **detection** 节点上，而 spending key 则保留在更安全的系统中。*

*- 某托管机构需要向审计人员提供其 Zcash 持仓的可见性。该托管机构可以为其每个屏蔽地址生成一个完整 Viewing Key，并将该密钥分享给审计人员。审计人员将能够验证这些地址的余额，并查看这些地址的历史转账活动（转入和转出）。* 

*- 某交易所可能需要对一位从屏蔽地址存款的客户开展尽职调查。交易所可以请求客户提供其屏蔽地址的 Viewing Key，并将其用于审查该客户的屏蔽交易活动，作为这些强化尽职调查程序的一部分。*

### 如何找到你的 Viewing Key

#### zcashd

* 使用 *./zcash-cli listaddresses* 列出所有已知地址

* 然后对 UA 或 Sapling 屏蔽地址执行以下命令

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* 在右上角选择“Backup”，验证你的手机，然后直接复制显示出来的 Viewing Key。

### 如何使用你的 Viewing Key

#### zcashd

* 对任意 vkey 或 ukey 使用以下命令： 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* 在右上角选择“Account”，点击右下角的“+”以添加并导入你的 Viewing Key，从而添加你的“只读”账户。

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* 只需将浏览器打开到[这里](https://zcashblockexplorer.com/vk)，然后等待结果即可！注意：该结果现在位于 zcashblockexplorer 节点上，因此你是在将这些信息托付给 zcashblockexplorer.com 的所有者

### 资源

尽管这是一项很棒的技术，但仍建议你按需使用 Viewing Key。

如果你想进一步深入了解，可以查看这份关于 Viewing Key 的教程。下面列出了一些相关资源：

- [ECC，解释 Viewing Key](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC，选择性披露与 Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC，Zcash Viewing Key 视频演示](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
