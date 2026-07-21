<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcashネットワークの可視化

以下は、Ubuntu 22.04でZiggurat 3.0 Crawlerおよび関連プログラムCrunchyとP2P-Vizを実行して、Zcashネットワーク情報を収集し可視化する方法に関するガイドです。
下記にリンクされている動画も同じプロセスを従っています。

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
## 必要なもののインストール:

Rust -> [https://rustup.rs/](https://rustup.rs/)

## オプション:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
（ターミナルでJSON情報を表示するために）

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
（クライアラーRPCをクエリするため）

npm (nvmとともに) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
（ブラウザでP2P-Vizを表示するために）

----------------

----------------
Ziggurat 3.0リポジトリ | [https://github.com/runziggurat](https://github.com/runziggurat)

クライアラー リポジトリ | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy リポジトリ | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz リポジトリ | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

まず通常の更新を適用します。

> 以下のコマンドを実行してください:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcashネットワーククライアラー

Zcashクライアラーは 'zcash'という名前のフォルダ内に存在するため、クライアラー（runziggurat/zcashリポジトリ）をクローンする前に新しいディレクトリを作成することをお勧めします。


>  /Home ディレクトリから以下のコマンドを実行してください:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

ブラウザで以下にアクセスしてください。
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

または、'/runziggurat/zcash/src/tools/crawler/README.md'を開いてください。

このページには特定の使用方法に関する情報が含まれています。 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            メインクロールループの秒単位の間隔 [デフォルト: 5]

    -h, --help
            ヘルプ情報を表示

    -r, --rpc-addr <RPC_ADDR>
            指定されたアドレスでRPCサーバーを開始します

    -s, --seed-addrs <SEED_ADDRS>...
            接続するための初期スタンドアロンIPアドレスおよび/またはDNSサーバーの一覧

    -n, --node-listening-port <NODE_LISTENING_PORT>
            ノードに接続するために使用されるデフォルトポート [デフォルト: 8233]

    -V, --version
            バージョン情報を表示
```

`--seed-addrs` \ `--dns-seed`は唯一の必要な引数であり、少なくとも1つの指定されたアドレスが必要です。


----------------

コマンド 'cargo run --release --features crawler --bin crawler -- --help' は実際の実行コマンドであり、表示されるヘルプメニューを出力します。


> 以下のコマンドを実行してください:
```bash
cargo run --release --features crawler --bin crawler -- --help
```

これによりプログラムがコンパイルされ、すべてが正常に動作しているか確認できます。

クライアラーを実行するには、開始コマンドに '--seed-addrs' フラグを追加し、少なくとも1つの有効なZcashノードIPアドレスを含める必要があります。クライアラーは正確な結果を得るために、ある程度の時間をかけて実行されるべきです。いくつかのサンプルノードIPアドレスは [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes) にあります。

クライアラーが動作している間に情報を取得するには、開始コマンドに '--rpc-addr' フラグを追加する必要があります。これはクライアラー自体だけを実行するためには必須ではありませんが、それ以外の場合はクライアラーを停止（ctrl+c または SIGKILL）しない限り情報を表示することはできません。


> 以下のコマンドを実行してください:
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

クライアラーはネットワークと通信（デフォルトでは20秒ごとに）し、ネットワークデータを収集します。
クライアラーから情報を表示するには、curlを使用してノードにクエリする必要があります（これはその情報の表示にjqが必要です）。 
この例では、クライアラーRPCアドレスは '127.0.0.1:54321' に設定されています。


> 別のターミナルで以下のコマンドを実行してください:
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

これにより、'.result'フィールド内に含まれる現在収集された '.protocol_version' データが表示されます。 '.result' フィールドは非常に大きいので、特定の部分を呼び出すのが役立ちます。他の有用なデータタイプには '.num_known_nodes', '.num_good_nodes', '.user_agents' などがあります。メトリクスセクションについては [こちら](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics) を参照してください。

----------------

----------------
CrunchyとP2P-Vizを実行するには、'.result'を.jsonファイルにパイプ送信する必要があります。


> 以下のコマンドを実行してください:
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

これにより、現在のディレクトリに 'latest.json' ファイルが作成されます。この 'latest.json' ファイルはCrunchyで使用されます。

この時点で、さらにデータが必要でない場合は、'ctrl+c'でクライアラーを停止できます。クライアラーはターミナルに出力される有用な情報のレポートを作成します。


----------------

## Crunchy

Crunchyは、P2P-Vizと使用するために出力されたJSONファイルを集約する必要があります。


Crunchyを構築するには、'/runziggurat'フォルダに移動してください。

> Crunchyリポジトリにクローンするには、以下のコマンドを実行してください:
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
'latest.json'ファイルを 'crunchy/testdata/' フォルダにコピー＆ペーストします。

> 以下のコマンドを実行してください 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

これにより、'crunchy/testdata/' フォルダに 'state.json' ファイルが作成され、P2P-Vizで使用されます。


----------------

## P2P-Viz

P2P-Vizを構築するにはnpmが必要です。


> nvmを使用してnpmをインストールするには、以下のコマンドを実行してください:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

ターミナルを閉じて再起動します。


> 以下のコマンドを実行してください:
```bash
nvm install --lts
```

'/runziggurat'フォルダに移動します。


> P2P-Vizリポジトリにクローンして開始するには、以下のコマンドを実行してください:
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。 

「Geolocation」を選択し、「Choose state file」を選択します。

ファイルエクスプローラーのポップアップから 'state.json' ファイルを選びます。

ノードエクスプローラーの世界地図がファイルデータで表示されます。使用オプションと設定についてさらに詳しくは、[こちら](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) のreadmeをご覧ください。


----------------
ヒント！

「timeout」コマンドを使用してクローラーをタイマーで実行するだけで、指定された時間後に特定の終了コマンドが発行されます。詳しくは 'timeout --help' を実行してください。
以下のコマンドは50分後に自動的にクローラーを停止します。

> 以下のコマンドを実行してください:
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ヒント！

'latest.json'は '/testdata'に呼び出して書き込むことで、手動でコピー＆ペーストする必要がありません。

----------------
ヒント！

出力からIPアドレス情報を収集し、それを開始時にクライアラーの再種子（--seed-addrs）として使用できます。これにより、フルクロールを実行するために必要な時間が短縮されます！
