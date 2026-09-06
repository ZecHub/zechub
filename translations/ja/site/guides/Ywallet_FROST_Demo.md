# Ywallet FROST デモ

> **Ywallet は現在メンテナンスされていません。** 開発者は Ironwood（NU6.3）向けに更新しないことを確認しているため、チェーンを追跡できなくなり、以下の手順は mainnet では完了できません。このページは参照用として残されています。同じ開発者による Zkool は現在もメンテナンスされている後継であり、FROST マルチシグに対応しています。

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


## FROST バイナリをコンパイルする

[Github リンク](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

上記のリポジトリを使用し、コンパイル手順に従ってください。 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

バイナリは target フォルダに配置されます。

## FROST UA を作成する

`./generateFROST_UA.sh`



## UFVK を Ywallet にインポートする

アカウント -> + をクリックし、上記の手順で取得した ufvk を貼り付けます

## Ywallet でトランザクションを作成する

任意の UA を貼り付けて tx を送信します。ファイルを保存します。

## FROST 署名手順を開始する 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

最初の入力は、上記の手順で作成した raw tx の場所です
2 番目の入力は、ブロードキャストしたい署名済み tx の場所と名前です
ここでは、全員に署名してもらうトランザクションを FROST に指定します

## コーディネーターを開始する

`./runCoordinator.sh`

これは各参加者の署名を調整し、グループ署名を作成します

## 各参加者にこのトランザクションへ署名してもらう

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 署名済みトランザクションを確定する

コーディネーターのウィンドウで、出力されたグループ署名をコピーし、FROST 署名ウィンドウに貼り付けます。
これにより FROST 署名が完了し、'mysingedtx' が出力されます


## Ywallet でトランザクションをブロードキャストする

Ywallet の右下にある「More」をクリックし、「Broadcast」を見つけます。「mysignedtx」を見つけて OK をクリックします。

すべて正常に動作すれば、トランザクション ID を取得できます :)
