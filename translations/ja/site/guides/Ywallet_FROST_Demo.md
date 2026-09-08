# Ywallet FROST デモ

> **Ywallet は現在メンテナンスされていません。** 開発者は Ironwood（NU6.3）向けに更新しないことを確認しているため、チェーンを追跡できず、以下の手順はメインネットでは完了できません。このページは参考用として残されています。同じ開発者による Zkool は後継としてメンテナンスされており、FROST マルチシグに対応しています。

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

上記リポジトリを使用し、コンパイル手順に従ってください。 

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

アカウント -> + をクリックし、上の手順で取得した ufvk を貼り付けます。

## Ywallet でトランザクションを作成する

任意の UA を貼り付け、tx を送信します。ファイルを保存してください。

## FROST 署名プロセスを開始する

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

最初の入力は、上の手順で作成した未加工 tx の場所です。  
2 番目の入力は、ブロードキャストしたい署名済み tx の場所と名前です。  
ここで、全員にどのトランザクションへ署名させるかを FROST に指定します。

## コーディネーターを開始する

`./runCoordinator.sh`

これは各参加者の署名を調整し、グループ署名を作成します。

## 各参加者にこのトランザクションへ署名させる

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 署名済みトランザクションを確定する

コーディネーターのウィンドウで出力されたグループ署名をコピーし、FROST 署名ウィンドウに貼り付けます。  
これにより FROST 署名が完了し、`mysingedtx` が出力されます。


## Ywallet でトランザクションをブロードキャストする

Ywallet の右下にある「More」をクリックし、「Broadcast」を見つけます。`mysignedtx` を見つけて OK をクリックします。

すべてが正常に動作すれば、トランザクション ID が取得できます :)
