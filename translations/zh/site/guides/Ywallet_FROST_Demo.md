# Ywallet FROST 演示

> **Ywallet 已不再维护。**其开发者已确认不会为 Ironwood（NU6.3）更新它，因此它无法再跟随链，且无法在主网上完成以下步骤。本页保留供参考。同一开发者推出的 Zkool 是仍在维护的后继产品，并支持 FROST 多重签名。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 编译 FROST 二进制文件

[Github 链接](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

使用上方仓库，并按照说明进行编译：

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

二进制文件将位于 target 文件夹中。

## 创建 FROST UA

`./generateFROST_UA.sh`



## 将 UFVK 导入 Ywallet

账户 -> 点击 +，并粘贴上一步中的 ufvk

## 使用 Ywallet 创建交易

粘贴任意 UA 并发送一笔交易。保存该文件。

## 开始 FROST 签名流程

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

第一个输入是上一步中原始交易的位置  
第二个输入是你想要广播的已签名交易的位置和名称  
此处是你告诉 FROST 希望所有人签署哪笔交易的地方

## 启动协调器

`./runCoordinator.sh`

这会协调每位参与者的签名并创建群组签名

## 让每位参与者为该交易签名

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 完成已签名交易

在协调器窗口中，复制输出的群组签名，并将其粘贴到 FROST 签名窗口中。  
这将完成 FROST 签名并输出“mysingedtx”


## 使用 Ywallet 广播你的交易

点击 Ywallet 右下角的“更多”，然后找到“广播”。找到“mysignedtx”并点击确定。

如果一切顺利，你将获得一个交易 ID :)
