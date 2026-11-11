<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcashネットワーク（Network）の可視化

以下は、Zcash向けの Ziggurat 3.0 クローラー（Crawler）、および関連プログラムである Crunchy と P2P-Viz を Ubuntu 22.04 で実行し、Zcashネットワーク情報を収集・可視化するためのガイドです。  
以下にリンクされた動画でも同じ手順を説明しています。

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
## 必要要件のインストール: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## 任意:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
（ターミナルで json 情報を表示するため）

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
（クローラー RPC をクエリするため）

npm（nvm 使用） -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
（ブラウザで P2P-Viz を表示するため）

----------------


----------------
Ziggurat 3.0 リポジトリ | [https://github.com/runziggurat](https://github.com/runziggurat)

クローラーリポジトリ | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy リポジトリ | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz リポジトリ | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

まず通常の更新を適用します。

>  以下のコマンドを実行します:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcashネットワーククローラー

Zcashクローラーは「zcash」という名前のフォルダ内に存在するため、クローラー（runziggurat/zcash リポジトリ）をクローンする前に新しいディレクトリを作成することをおすすめします。


>  /Home ディレクトリから、以下のコマンドを実行します:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

ブラウザで以下に移動します。  
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

または、以下の README を開きます。  
'/runziggurat/zcash/src/tools/crawler/README.md'

このページには、具体的な使用方法に関する情報が含まれています。 

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

`--seed-addrs` \ `--dns-seed` は唯一の必須引数であり、実行するには少なくとも 1 つの指定されたアドレス（address）が必要です。



----------------

「cargo run --release --features crawler --bin crawler -- --help」コマンドはそのまま実行できるコマンドであり、表示されているヘルプメニューを出力します。


>  コマンドを実行します
```bash
cargo run --release --features crawler --bin crawler -- --help
```


これによりプログラムがコンパイルされ、すべてが正常に動作していることを確認できます。

クローラーを実行するには、開始コマンドに「--seed-addrs」フラグを追加し、少なくとも 1 つの有効な Zcashノード（node）の IP アドレスを含める必要があります。正確な結果を得るため、クローラーは十分な時間実行させてください。サンプルのノード IP アドレスは [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes). で確認できます。

実行中のクローラーから情報を取得するには、開始コマンドに「--rpc-addr」フラグを追加する必要があります。これはクローラーのみを実行する場合には必須ではありませんが、追加しない場合は、情報を表示するためにクローラーを停止する必要があります（ctrl+c または SIGKILL）。

>  コマンドを実行します
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

クローラーはネットワークとの通信を開始し（デフォルトでは 20 秒ごと）、ネットワークデータを収集します。  
クローラーの情報は、curl を使用してノードをクエリすることで表示できます（情報の表示には jq が必要です）。  
この例のクローラー RPC アドレスは「127.0.0.1:54321」に設定されています。


>  別のターミナルで、以下のコマンドを実行します
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

これにより、「.result」フィールドに含まれる現在収集済みの「.protocol_version」データが表示されます。「.result」フィールドは非常に大きいため、代わりにその特定部分を呼び出すと便利です。その他の有用なデータ型には「.num_known_nodes」、「.num_good_nodes」、「.user_agents」などがあります。メトリクスのセクションは [こちら](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics) を参照してください。

----------------


----------------
Crunchy と P2P-Viz を実行するには、「.result」を .json ファイルへパイプする必要があります。 


>  コマンドを実行します
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

これにより、現在のディレクトリに「latest.json」ファイルが作成されます。この「latest.json」ファイルは Crunchy で使用されます。 

この時点で、追加のデータが不要であれば「ctrl+c」でクローラーを停止できます。クローラーは、有用な情報のレポートをターミナルに出力します。


----------------

## Crunchy

P2P-Viz で使用するために、出力 json ファイルを集約するには Crunchy が必要です。


Crunchy をビルドするには、「/runziggurat」フォルダに移動します。 

>  Crunchy リポジトリをクローンするには、以下のコマンドを実行します
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
「latest.json」ファイルをコピーして「crunchy/testdata/」フォルダに貼り付けます。

>  以下のコマンドを実行します 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

これにより、P2P-Viz で使用する Zcashノードでフィルタリングされた「state.json」ファイルが「crunchy/testdata/」フォルダ内に作成されます。

----------------

## P2P-Viz

P2P-Viz をビルドするには npm が必要です。 


>  nvm を使用して npm をインストールするには、以下のコマンドを実行します:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

ターミナルを閉じて再起動します。


>  コマンドを実行します:
```bash
nvm install --lts
```

「/runziggurat」フォルダに移動します。


>  P2P-Viz リポジトリをクローンして開始するには、以下のコマンドを実行します
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

ブラウザで [http://localhost:3000](http://localhost:3000). を開きます。 

「Geolocation」を選択し、次に「Choose state file」を選択します。

ファイルエクスプローラーのポップアップから「state.json」ファイルを選択します。 

ノードエクスプローラーのワールドマップにファイルデータが表示されます。使用オプションと設定の詳細については、README の [こちら](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) を参照してください。


----------------
ヒント! 

「timeout」コマンドを使用すると、指定した時間後に特定の終了コマンドを発行する時間指定クローリングを簡単に設定できます。詳細については「timeout --help」を実行してください。  
以下のコマンドは、クローラーを開始し、50 分後に自動的に停止します。

>  コマンドを実行します
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ヒント! 

「latest.json」は呼び出して「/testdata」に書き込めるため、手動でコピー＆ペーストする必要はありません。

----------------
ヒント! 

IP アドレス情報は出力から収集し、開始時にクローラーを再シードするため（--seed-addrs）に使用できます。これにより、完全なクロールに必要な時間を短縮できます！
