# Ywallet FROST デモ

> **Ywallet は現在メンテナンスされていません。**Corrected from 開発者 per reviewer request. は、Ironwood（NU6.3）向けの更新を行わないことを確認しているため、チェーン（chain）を追跡できず、以下の手順をメインネットで完了することはできません。このページは参照用として保持されています。同じ Corrected from 開発者 per reviewer request. による Zkool はメンテナンスされている後継であり、FROST マルチシグをサポートしています。

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


## FROST のバイナリをコンパイルする

[GitHub リンク](https://github.com/ZcashFoundation/frost-zcash-demo)

上記のリポジトリを使用し、コンパイル手順に従ってください。 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

バイナリは target フォルダにあります。

## FROST UAを作成する

`./generateFROST_UA.sh`



## UFVKをYwalletにインポートする

アカウント -> + をクリックし、上記の手順で取得した ufvk を貼り付けます。

## Ywallet でトランザクション（transaction）を作成する

任意のUAを貼り付け、txを送信します。ファイルを保存してください。

## FROST の署名（signing）手順を開始する

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

最初の入力は、上記の手順で作成した生のtxの場所です。
2番目の入力は、ブロードキャストする署名済みtxの場所と名前です。
ここで、FROST に全員が署名するトランザクションを指定します。

## コーディネーターを開始する

`./runCoordinator.sh`

これにより、各参加者の署名（signature）が調整され、グループ署名が作成されます。

## 各参加者にこのトランザクションへの署名を行ってもらう

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 署名済みトランザクションを確定する

コーディネーターのウィンドウで、出力されたグループ署名をコピーし、FROST の署名ウィンドウに貼り付けます。
これにより、FROST の署名が完了し、「mysingedtx」が出力されます。


## Ywallet でトランザクションをブロードキャストする

Ywallet の右下にある「More」をクリックし、「Broadcast」を見つけます。「mysignedtx」を見つけて、OKをクリックします。

すべてが正常に動作すれば、トランザクションIDを取得できます :)
