# Zkool マルチシグ（Multisig）ガイド

このガイドでは、Zkool を使用してマルチシグトランザクションを実行する方法を段階的に説明します。アカウント（Account）の作成、資金の送受信、マルチシグのための分散鍵生成（Distributed Key Generation、DKG）の設定について説明します。各主要ステップにはスクリーンショットが含まれています。

## チュートリアル

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. アカウントの作成


1. **Zkool アプリ**を開き、**新しいアカウント**に移動してください。


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. **アカウント名**（例：Anabelle）を入力してください。  
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. 必要に応じて、**内部変更を使用**または**アカウントを復元**を切り替えてください。


5. 作成後、アカウントは**アカウント一覧**に表示されます。  


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. 資金の受け取り

各アカウントでは、複数のアドレス（Address）タイプが生成されます。

**統合アドレス（Unified Address）**

**Orchard 専用アドレス**

**Sapling アドレス**
  
**公開型（transparent）アドレス**


使用するタイプを選択し、資金を受け取るために共有してください。  


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. 資金の送信

1. **受取人**セクションに移動してください。  


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. **受取人のアドレス**を入力してください。  

4. **金額**と任意の**メモ（memo）**を指定してください。  

5. トランザクション（transaction）の詳細を確認し、**確認**してください。  


完了すると、アカウント一覧の残高が更新されます。  


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. マルチシグトランザクションの実行：分散鍵生成（マルチシグ）の設定

Zkool のマルチシグでは、複数の参加者が共有アカウントを管理できるように、**分散鍵生成（DKG）**を使用します。



### ステップ1：DKGを開始する
共有ウォレット（wallet）の**名前**（例：Anabelle）を選択してください。

**参加者数**を設定してください。
  
自身の**参加者ID**を選択してください。
  
**必要な署名者数（しきい値）**を定義してください。
    
**資金提供アカウント**を選択してください。
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### ステップ2：参加者のアドレスを追加する
- 各参加者の**統合アドレス**を入力してください（推奨）。


**ノート（note）：** Orchard 専用または Sapling 専用のアドレスを使用する場合、マルチシグはそのプール（pool）（Orchard または Sapling）のみに制限されます。  
これは、共有ウォレットが他のプールから資金を受け取れないことを意味します。  
最大限の互換性と柔軟性を得るため、常に**統合アドレス**を使用してください。  


### ステップ3：DKGラウンドを実行する
すべての参加者が**ラウンド1**および**ラウンド2**のパッケージを交換するまでお待ちください。  


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### ステップ4：共有アドレスを確定する
完了すると、**共有アドレス**が生成されます。  


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## 結論

Zkool を使用すると、アカウントの作成、資金の送受信、分散鍵生成を使用した**マルチシグウォレット**の設定ができます。これにより、**強化されたセキュリティ**と**協調的かつプライベートな資金管理**が実現します。
