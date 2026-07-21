# Ywallet FROST 演示

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet 交易演示"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 编译 FROST 二进制文件

[Github 链接](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

使用上面的仓库，并按照说明进行编译： 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

二进制文件会位于 target 文件夹中。

## 创建 FROST UA

`./generateFROST_UA.sh`



## 将 UFVK 导入 Ywallet

Accounts -> 点击 +，然后粘贴上一步中的 ufvk

## 使用 Ywallet 创建交易

粘贴任意 UA 并发送一笔 tx。保存该文件。

## 开始 FROST 签名流程

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

第一个输入是上一步中原始 tx 的位置
第二个输入是你想要广播的已签名 tx 的位置和名称
这一步是告诉 FROST 你希望所有人签署哪一笔交易

## 启动 Coordinator

`./runCoordinator.sh`

它会协调每个参与者的签名并创建一个组签名

## 让每个参与者为这笔交易签名

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 完成已签名交易

在 coordinator 窗口中，复制输出的组签名，并将其粘贴到 FROST 签名窗口中。
这将完成 FROST 签名，并输出 `mysingedtx`


## 使用 Ywallet 广播你的交易

点击 Ywallet 右下角的“More”，然后找到“Broadcast”。找到 `mysignedtx` 并点击确定。

如果一切顺利，你将获得一个交易 ID :)
