# Ywallet FROST デモ

> **Ywallet は現在メンテナンスされていません。** 開発者は Ironwood (NU6.3) 向けに更新されないことを確認しているため、チェーンを追跡できず、以下の手順はメインネットでは実行できません。このページは参考資料として残されています。同じ開発者による Zkool は後継としてメンテナンスされており、FROST マルチシグをサポートしています。

## FROST バイナリをコンパイルする

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

上記のリポジトリを使用し、コンパイル手順に従ってください。 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

バイナリは target フォルダー内にあります。


## FROST UA を作成する

`./generateFROST_UA.sh`



## UFVK を Ywallet にインポートする

アカウント -> + をクリックし、上記の手順で取得した ufvk を貼り付けます

## Ywallet でトランザクションを作成する

任意の UA を貼り付け、トランザクションを送信します。ファイルを保存します。

## FROST 署名手順を開始する

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

最初の入力は、上記の手順で作成した生のトランザクションの場所です  
2 番目の入力は、ブロードキャストしたい署名済みトランザクションの場所と名前です  
ここでは、全員に署名してもらうトランザクションを FROST に指定します

## コーディネーターを開始する

`./runCoordinator.sh`

これは各参加者の署名を調整し、グループ署名を作成します

## 各参加者にこのトランザクションへ署名してもらう

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## 署名済みトランザクションを完了する

コーディネーターのウィンドウで、出力されたグループ署名をコピーし、FROST 署名ウィンドウに貼り付けます。  
これにより FROST 署名が完了し、'mysingedtx' が出力されます


## Ywallet でトランザクションをブロードキャストする

Ywallet の右下にある「More」をクリックし、「Broadcast」を探します。「mysignedtx」を探して OK をクリックします。

すべてが正常に動作すれば、トランザクション ID を取得できます :)
