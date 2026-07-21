# Ywallet FROST デモ

## FROST バイナリのコンパイル

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

上記のリポジトリを使用し、コンパイル手順に従ってください:

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

バイナリはtargetフォルダ内に生成されます。


## FROST UA の作成

`./generateFROST_UA.sh`



## UFVK を Ywallet にインポート

アカウント -> '+'をクリックし、上記の手順で取得したufvkを貼り付けます。

## Ywallet でトランザクションを作成

任意の UA を貼り付けてトランザクションを送信します。ファイルを保存してください。

## FROST 署名プロセスを開始

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

最初の入力は、上記手順で作成した生トランザクションの場所です。
2番目の入力は、放送したい署名済みトランザクションの場所とファイル名です。
これはFROSTに全員が署名する必要のあるトランザクションを指定する部分です。

## Coordinator を起動

`./runCoordinator.sh`

これにより、各参加者の署名を調整し、グループ署名を作成します。

## 各Participant がこのトランザクションに署名

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`


## 署名済みトランザクションの最終化

Coordinator のウィンドウで出力されたグループ署名をコピーし、FROST 署名ウィンドウに貼り付けます。
これにより、FROST 署名が完了し、「mysingedtx」が出力されます。


## Ywallet でトランザクションを放送

Ywallet の右下にある「More」をクリックし、「Broadcast」を探してください。「mysignedtx」を選択してOKをクリックします。

すべてうまくいくと、トランザクションIDが表示されます :)
