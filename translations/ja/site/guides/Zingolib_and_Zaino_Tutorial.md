# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcashフルノード（full node）

**zaino**     : zcashブロックチェーン（blockchain）インデクサー

**zingo-cli** : zcashコマンドラインzaino-proxyクライアント（Zingolibのサブセット）

## 動画

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Zingolib + Zainoの紹介"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 全体像

[システムアーキテクチャ](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash ユーザーはZingolibをインストール／コンパイルし、zingo-cliにアクセスできます。必要に応じてZECを送受信できます。
- zingo-cliは、ローカルまたはオンラインの安全なチャネルを通じてzainoに接続します（Zcashのユーザーは、この仕組みを気にする必要はありません！）
- Zainoにより、zebradまたはzcashdのいずれかにアクセスできます。            
- 完全に同期されたzebradが信頼できる情報源です（ここにはもうウォレット（Wallet）はありません！）



## インストール

これを正しく動作させるには、3つのものをインストールする必要があります。また、画面管理のためにscreenまたは類似のものを使用することをお勧めします。

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*任意*（zebrad用のscreenセッションを作成します）

```
screen -S zebra
zebrad start
```

注: これを完全に同期する必要があります！ 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*任意*（zaino用のscreenセッションを作成します）

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

*任意*（zingo-cli用のscreenセッションを作成します）

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

注: lightwalletdと同様に、これも完全に同期する必要があります。時間を節約するために外付けドライブを使用することをお勧めします :)


## 実行

これらをscreenで実行している場合は、`screen -r`によって必要に応じて移動できる各screenが一覧表示されます
