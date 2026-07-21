# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash 全节点

**zaino**     : zcash 区块链索引器

**zingo-cli** : zcash 命令行 zaino-proxy 客户端（Zingolib 的子集）

## 视频

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Zingolib + Zaino 简介"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 整体概览

[系统架构](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash 用户安装/编译 Zingolib，从而获得对 zingo-cli 的访问权限。他们可以按需发送/接收 ZEC。
- Zingo-cli 通过本地连接或在线安全通道连接到 zaino（Zcash 用户并不关心这具体是如何实现的！）
- Zaino 允许访问 zebrad 或 zcashd            
- 完全同步的 zebrad 是可信真相来源（这里不再有钱包！）



## 安装

你需要安装 3 样东西，此功能才能正常运行。我还建议使用 screen 或类似工具来帮助管理终端会话

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*可选*（为 zebrad 创建一个 screen 会话）

```
screen -S zebra
zebrad start
```

注意：这需要先完成全部同步！ 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*可选*（为 zaino 创建一个 screen 会话）

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => 将端口调整为主网的 8232
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*可选*（为 zingo-cli 创建一个 screen 会话）

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

注意：这同样需要完成全部同步，就像 lightwalletd 一样。我建议使用外置硬盘以节省时间 :)


## 运行

如果你是在 screen 会话中运行这些，`screen -r` 会列出每个 screen，方便你按需切换
