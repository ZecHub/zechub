# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    ：zcash 全节点 (full node)

**zaino**     ：zcash blockchain 索引器 (indexer)

**zingo-cli** ：zcash 命令行 zaino-proxy 客户端 (client)（Zingolib 的子集）

## 视频

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 全局概览 (Big Picture)

[系统架构 (System Architecture)](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash 用户安装/编译 Zingolib，即可访问 zingo-cli。他们可以按需发送/接收 ZEC。
- zingo-cli 通过本地方式或在线安全通道连接到 zaino（Zcash 用户不关心其工作原理！）
- Zaino 允许访问 zebrad 或 zcashd            
- 完全同步的 zebrad 是唯一可信来源（这里不再有钱包 (wallet)！）



## 安装 (Installation)

要使其正确运行，你需要安装 3 个东西。我也建议使用 screen 或类似工具来管理屏幕。

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

注意 (note)：这需要完全同步！ 

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
nano zindexer.toml  => Adjust port to 8232 for mainnet
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

注意 (note)：这也需要完全同步，就像 lightwalletd 一样。我建议使用外接硬盘以节省时间：）


## 运行 (Running)

如果你在 screen 中运行这些，`screen -r` 会列出每个 screen，以便你按需切换
