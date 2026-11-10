# Zcash（ZEC）をBrave Walletでシールドされた（Shielded）状態で送受信する方法：ステップバイステップのプライバシー（Privacy）ガイド

Brave Walletは、Braveブラウザーに直接組み込まれた安全なネイティブ暗号資産ウォレット（wallet）です。拡張機能は必要ありません。


## シールドされたZECのサポートが重要な理由


Zcashは、シールドされたトランザクション（transaction）によるデフォルトのプライバシーを提供する数少ない暗号資産の1つです。

Brave Walletは現在、OrchardのシールドされたZECをサポートしており、サードパーティー製ソフトウェアなしでプライベートなトランザクションを可能にします。

ユーザーは現在、残高やメタデータを公開することなくZECを送受信できます。すべてBraveブラウザー内で完結します。


## チュートリアル

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/TNcHY-GXFVo"
    title="How to use ZEC on Brave"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## パート1：Brave Walletの設定

**対象ステップ：**

1. Braveブラウザーを開きます（現在はデスクトップ版のみ）

2. ウォレットアイコンをクリックするか、brave://wallet に移動します

3. ウォレットを設定します（作成またはインポート）

4. 暗号資産ダッシュボード（dashboard）にアクセスします


![img1](/content-images/f54cd1a1-8569-4925-ba1c-7597d030593e-8d83734cd5.webp)


## パート2：Zcash（ZEC）をBrave Walletに追加する

**対象ステップ：**

1. ウォレットのダッシュボードで「資産を管理」をクリックします

2. ZECを検索して有効にします

3. ZECがウォレットに表示されます


![img2](/content-images/6f2b2190-cf55-4394-9d5f-29ff9b5bb525-13d37cb455.webp)


## パート3：シールドされたZECを受け取る（ユニファイドアドレス）

**対象ステップ：**

1. 資産内のZECをクリックします

2. 「受け取る」を選択します

3. Braveがユニファイドアドレス（Unified Address、UA）を生成します。これはシールドされたトランザクションと公開型（transparent）トランザクションの両方をサポートする1つのアドレス（address）です

4. QRコードをコピーまたはスキャンします

5. 送信者にUAを共有します



![img3](/content-images/53c940b6-1a03-4fa7-aefa-d3478f678a88-23f68a3855.webp)



## パート4：シールドされたZECをプライベートに送信する

**対象ステップ：**

1. ZEC -> 送信を選択します

2. 受取人のユニファイドアドレスまたはシールドされたアドレスを貼り付けます

3. 金額を入力します

4. トランザクションの詳細を確認します

5. 「送信」をクリックします。資金はOrchardプール（pool）を使用してプライベートに送金されます


![img4](/content-images/Internet_20250808_172118_4-e6df0f7fe2.webp)




## アドレスの種類

各Zcashアドレスの種類について説明します。

**t-addr（t1...）** - 公開型アドレスはBitcoinアドレスのように機能するため、トランザクションはブロックチェーン（blockchain）上で公開されます。非Zcashウォレットでは使いやすいですが、プライバシーは提供しません。

**z-addr（zs...）** - シールドされたアドレスは、送信者、受取人、金額を隠すためにZcashのプライバシー技術（Sprout/Sapling）を使用します。詳細を公開できるのは、ビューイングキー（viewing key）または所有者だけです。

**UA（u... またはQR）** - ユニファイドアドレスは、複数のアドレスの種類（公開型、シールドされた、Orchard）を1つにまとめます。これにより、可能な限りプライバシーを優先しながら最大限の互換性を実現します。



## 上級編

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/AmTMa5HXa2w"
    title="Brave Wallet Tutorial : Defi with Near Intents and Shielded Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 結論：実用的になったプライバシー

Brave WalletとシールドされたZECにより、プライバシーは今や誰もが利用できます。特別なソフトウェアや高度な知識は必要ありません。

ジャーナリスト、活動家、またはプライバシーを重視する個人に最適です。

Brave内で、今日初めてのシールドされたトランザクションを試してみましょう！


**プライベートに。自由に。Brave WalletでZECをプライベートに送信しましょう。**
