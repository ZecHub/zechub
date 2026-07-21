# Zkool Multisig ガイド

このガイドでは、Zkool を使用してマルチシグ取引を実行する方法を、ステップごとに詳しく説明します。アカウントの作成、資金の送受信、そしてマルチシグ用の分散鍵生成（DKG）の設定を含みます。各主要ステップにはスクリーンショットも付いています。

## チュートリアル

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool デモ | Ywallet の後継"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. アカウントの作成


1. **Zkool アプリ**を開き、**New Account** に進みます。


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. **Account Name**（例：Anabelle）を入力します。  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. 必要に応じて、**Use Internal Change** または **Restore Account** を切り替えます。


5. 作成後、アカウントは **Account List** に表示されます。  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. 資金の受け取り

各アカウントでは、複数のアドレスタイプが生成されます。

**Unified Address**

**Orchard only Address**

**Sapling Address**
  
**Transparent Address**


使用したいタイプを選択し、資金を受け取るために共有します。  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. 資金の送信

1. **Recipient** セクションに進みます。  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. **受取人のアドレス**を入力します。  

4. **金額**と、必要に応じて**メモ**を指定します。  

5. 取引内容を確認し、**confirm** します。  


完了すると、アカウント一覧の残高が更新されます。  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. マルチシグ取引の実行：分散鍵生成（マルチシグ）の設定

Zkool のマルチシグでは、複数の参加者が共有アカウントを管理できるようにするため、**分散鍵生成（DKG）** を使用します。



### ステップ 1：DKG を開始する
共有ウォレットの**名前**（例：Anabelle）を選びます。

**参加者数**を設定します。
  
自分の **Participant ID** を選びます。
  
**必要署名数（しきい値）** を定義します。
    
**Funding Account** を選択します。
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### ステップ 2：参加者のアドレスを追加する
- 各参加者の **Unified Address** を入力します（推奨）。


**注:** Orchard only または Sapling only のアドレスを使用した場合、そのマルチシグはそのプールのみに制限されます（Orchard または Sapling）。  
これは、共有ウォレットが他のプールから資金を受け取れないことを意味します。  
最大限の互換性と柔軟性を得るため、常に **Unified Address** を使用してください。  


### ステップ 3：DKG ラウンドを実行する
すべての参加者が **round 1** および **round 2** のパッケージを交換するのを待ちます。  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### ステップ 4：共有アドレスを確定する
完了すると、**共有アドレス** が生成されます。  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## 結論

Zkool を使うことで、アカウントの作成、資金の送受信、そして分散鍵生成を用いた**マルチシグウォレット**の設定ができます。これにより、**強化されたセキュリティ** と **共同かつプライベートな資金管理** が実現します。
