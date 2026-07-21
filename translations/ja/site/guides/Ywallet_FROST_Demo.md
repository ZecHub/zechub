# Ywallet FROST デモ

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

## FROST バイナリのコンパイル

[Github link](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

上記のリポジトリを使用し、コンパイル手順に従ってください:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

バイナリは target フォルダ内に生成されます。

## FROST UA の作成

`./generateFROST_UA.sh`


## UFVK を Ywallet にインポート

アカウント -> '+' をクリックし、上記の手順で取得した ufvk を貼り付けます。

## Ywallet でトランザクションを作成

任意の UA を貼り付けてトランザクションを送信します。ファイルを保存してください。

## FROST 署名プロセスを開始

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

最初の入力は、上記手順で生成された生トランザクションの場所
2番目の入力は、署名したトランザクションをブロードキャストしたい場所とファイル名
これは FROST が誰もが署名する必要があるトランザクションを指定する部分です。

## Coordinator を起動

`./runCoordinator.sh`

このコマンドは各参加者の署名を調整し、グループ署名を作成します。

## 各 Participant がこのトランザクションに署名

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 署名されたトランザクションの最終化

Coordinator のウィンドウで出力されるグループ署名をコピーし、FROST 署名ウィンドウに貼り付けます。
これにより FROST 署名が完了し、「mysingedtx」が出力されます。

## Ywallet でトランザクションをブロードキャスト

Ywallet の右下にある 'More' をクリックして 'Broadcast' を見つけてください。'mysignedtx' を選択し、OK をクリックしてください。

すべてが正常に動作すればトランザクションIDが表示されます :)
