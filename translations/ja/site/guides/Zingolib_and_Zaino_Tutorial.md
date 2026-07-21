# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash フルノード

**zaino**     : zcash ブロックチェーンインデクサー

**zingo-cli** : zcash コマンドライン zaino-proxy クライアント（Zingolib のサブセット）

## 動画

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


## 全体像

[システムアーキテクチャ](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash ユーザーは Zingolib をインストールまたはコンパイルし、zingo-cli へのアクセスを得ます。必要に応じて ZEC を送受信できます。
- Zingo-cli は、ローカルまたはオンラインの安全なチャネル経由で zaino に接続します（Zcash ユーザーはその仕組みを気にする必要はありません！）
- Zaino は zebrad または zcashd のいずれかへのアクセスを可能にします            
- 完全に同期された zebrad が信頼できる唯一の情報源です（ここにはもうウォレットはありません！）



## インストール

これを正しく動作させるには、3 つのものをインストールする必要があります。画面管理をしやすくするために、screen または類似のものもおすすめします

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*任意*（zebrad 用の screen セッションを作成）

```
screen -S zebra
zebrad start
```

注: これが完全に同期するまで待つ必要があります！ 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*任意*（zaino 用の screen セッションを作成）

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

*任意*（zingo-cli 用の screen セッションを作成）

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

注: これも lightwalletd と同様に完全に同期する必要があります。時間短縮のため、外付けドライブの使用をおすすめします :)


## 実行

これらを screen で実行している場合は、`screen -r` を使うと、必要に応じて移動できる各 screen の一覧が表示されます
