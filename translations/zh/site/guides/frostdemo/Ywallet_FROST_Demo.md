# Ywallet FROST 演示

> **Ywallet 已不再维护。**其开发者已确认不会为 Ironwood (NU6.3) 更新它，因此它已无法跟随链，且以下步骤无法在主网上完成。保留此页面仅供参考。同一位开发者开发的 Zkool 是仍在维护的后继项目，并支持 FROST 多重签名。

## 编译 FROST 二进制文件

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

使用上述仓库，并按照其中的编译说明操作：

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

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
这一步是告诉 FROST 你希望所有人签名的是哪一笔交易

## 启动协调器

`./runCoordinator.sh`

这会协调每位参与者的签名并创建群组签名

## 让每位参与者为此交易签名

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## 完成已签名交易

在协调器窗口中，复制输出的群组签名并将其粘贴到 FROST 签名窗口中。  
这将完成 FROST 签名并输出“mysingedtx”。


## 使用 Ywallet 广播你的交易

点击 Ywallet 右下角的“更多”，然后找到“广播”。找到“mysignedtx”并点击确定。

如果一切顺利，你将获得一个交易 ID :)
