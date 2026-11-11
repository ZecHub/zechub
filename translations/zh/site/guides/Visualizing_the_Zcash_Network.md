<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  可视化 Zcash 网络

以下是关于如何在 Ubuntu 22.04 上运行适用于 Zcash 的 Ziggurat 3.0 Crawler，以及关联程序 Crunchy 和 P2P-Viz，以收集和可视化 Zcash 网络信息的指南。  
下方链接的视频遵循相同流程。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## 安装要求： 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## 可选：

jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
（用于在终端中显示 json 信息）

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
（用于查询 crawler RPC）

npm（配合 nvm）-> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
（用于在浏览器中显示 P2P-Viz）

----------------


----------------
Ziggurat 3.0 仓库 | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler 仓库 | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy 仓库 | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz 仓库 | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

首先应用常规更新。

>  运行以下命令：
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash 网络爬虫

Zcash Crawler 位于名为“zcash”的文件夹内，因此在克隆 crawler（runziggurat/zcash 仓库）之前，建议先创建一个新目录。


>  在 /Home 目录中，运行以下命令：
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

在浏览器中导航至
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

或者打开以下 readme：
'/runziggurat/zcash/src/tools/crawler/README.md'

此页面包含有关具体用法的信息。

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` 是唯一必需的参数，且至少需要指定一个地址才能运行。



----------------

命令 'cargo run --release --features crawler --bin crawler -- --help' 是实际运行命令，并将打印所示的帮助菜单。


>  运行命令
```bash
cargo run --release --features crawler --bin crawler -- --help
```


这将编译程序并确保一切正常运行。

要运行 Crawler，必须在启动命令中添加 '--seed-addrs' 标志，其中至少包含一个有效的 Zcash 节点 IP 地址。应让 crawler 运行足够长的时间，以获得准确结果。你可以在 [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes). 上找到一些示例节点 IP 地址。

要在 Crawler 运行期间获取其信息，必须在启动命令中添加 '--rpc-addr' 标志。仅运行 crawler 本身不需要此标志，但否则将需要停止 crawler（ctrl+c 或 SIGKILL）才能显示任何信息。


>  运行命令
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler 将开始与网络通信（默认每 20 秒一次）并收集网络数据。  
可使用 curl 查询节点来显示 Crawler 的信息（这需要 jq 来显示该信息）。  
此示例中的 Crawler RPC 地址设置为 '127.0.0.1:54321'


>  在另一个终端中，运行命令
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

这将显示包含在 '.result' 字段中的当前已收集 '.protocol_version' 数据。'.result' 字段非常大，因此调用其中的特定部分会更有用。其他有用的数据类型包括 '.num_known_nodes'、'.num_good_nodes'、'.user_agents' 等。请参阅指标部分 [这里](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
要运行 Crunchy 和 P2P-Viz，必须将 '.result' 通过管道写入 .json 文件。


>  运行命令
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

这将在当前目录中创建一个 'latest.json' 文件。此 'latest.json' 文件将与 Crunchy 一起使用。

此时，如果不再需要更多数据，可以使用 'ctrl+c' 停止 Crawler。Crawler 将在终端中输出一份包含有用信息的报告。


----------------

## Crunchy

Crunchy 需要汇总输出 json 文件，以供 P2P-Viz 使用。


要构建 Crunchy，请导航至你的 '/runziggurat' 文件夹。

>  要克隆 Crunchy 仓库，请运行以下命令
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
将 'latest.json' 文件复制并粘贴到 'crunchy/testdata/' 文件夹中。

>  运行以下命令
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

这将在 'crunchy/testdata/' 文件夹中创建一个经过 Zcash 节点筛选的 'state.json' 文件，供 P2P-Viz 使用。

----------------

## P2P-Viz

要构建 P2P-Viz，必须安装 npm。


>  要使用 nvm 安装 npm，请运行以下命令：
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

关闭并重新启动终端。


>  运行命令：
```bash
nvm install --lts
```

导航至你的 '/runziggurat' 文件夹。


>  要克隆 P2P-Viz 仓库并启动，请运行以下命令
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

在 [http://localhost:3000](http://localhost:3000). 中打开浏览器。

选择“Geolocation”，然后选择“Choose state file”。

在文件浏览器弹出窗口中，选择 'state.json' 文件。

节点浏览器世界地图将使用文件数据填充。有关使用选项和设置的更多详细信息，请参阅 readme [这里](https://github.com/runziggurat/p2p-viz#build-and-run-the-app)。


----------------
提示！

只需使用 'timeout' 命令即可让 Crawler 进行定时爬取，该命令会在设定时间后发出指定的终止命令。运行 'timeout --help' 以获取更多信息。
以下命令将启动 crawler，并在 50 分钟后自动停止它。

>  运行命令
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
提示！

可以调用 'latest.json' 并将其写入 '/testdata'，这样你就不必手动复制和粘贴它。

----------------
提示！

可以从输出中收集 IP 地址信息，然后在启动时将其用于重新为 Crawler 设置种子（--seed-addrs）。这将减少完成完整爬取所需的时间！
