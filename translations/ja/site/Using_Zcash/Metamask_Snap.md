<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="編集ページ"/>
</a>

# MetaMask Zcash Snap 統合ガイド

> MetaMaskのブラウザー拡張機能から、ChainSafeのZcash SnapとWebZjsウェブウォレットを使って、シールドされたZECを保有・送信します。

## TL;DR

* ChainSafe Zcash Snapにより、デスクトップ（Chrome、Edge、Firefox）のMetaMaskでシールドされたZECを利用できます。別途Zcashソフトウェアを用意する必要はありません。
* Zcashのキーは、MetaMaskのリカバリーフレーズから導出されます。この1つのフレーズで、ETHとZECの両方を保護できます。
* ZECは、MetaMask独自の資産一覧ではなく、webzjs.chainsafe.devにあるWebZjsウォレットで管理します。
* アカウントには統合アドレスが割り当てられるため、送信者は対応している中で最もプライバシーを保護できるプールに送金できます。
* スワップ（たとえばETHからZEC）するか、取引所からシールドされたアドレスにZECを出金して資金を入れます。
* 復元するには、MetaMaskとSnapを再インストールし、既存のリカバリーフレーズをインポートします。

## 基本説明

MetaMask Snapは、小さなサンドボックス型のアドオンで、MetaMaskに新しいブロックチェーンを追加します。ChainSafeが開発し、Hackenが監査したZcash Snapを使うと、MetaMaskは既存のリカバリーフレーズからZcashキーを導出し、Zcashトランザクションに署名できます。

MetaMask自体にはZEC残高は表示されません。代わりに、WebZjsウェブウォレットがSnapに接続し、lightwalletdサーバーを通じてZcashネットワークと同期して、アドレスと残高を表示します。シールドされた証明はWebAssemblyを使ってブラウザー内で計算されるため、送金に時間がかかることがあります。

以下の手順では、Snapのインストール、WebZjsの接続、ウォレットへの入金、送受信、統合アドレスの各部分の確認方法を説明します。

## 詳細ガイド

手順の全体と図解については、こちらの[**YouTubeガイド**](https://www.youtube.com/watch?v=UJh9Ilkohdw)をご覧ください。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="MetaMaskでZECを使う方法"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMaskは、**シールドされたZcash（ZEC）**に対応しました。**ChainSafeが開発したZcash Snap**を通じて、ブラウザーウォレットからプライベートなZECを直接送受信・管理できます。**Hackenによる監査済み**で、**MetaMask公式Snaps Directory**にも掲載されています。必要なのはMetaMaskとSnapだけで、**別途Zcashソフトウェアを用意する必要はありません**。

---

## **前提条件**


> [**MetaMask拡張機能**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)（デスクトップのみ）- Chrome、Edge、またはFirefox。
> MetaMaskアカウント - シードフレーズを安全に保管してください。SnapはそこからZcashキーを導出します。  
> 安定したインターネット接続 - Zcashネットワークとの同期に必要です。  
> 資金 - ZECにスワップするためのETH、または取引所からのZEC。

> **ヒント:** MetaMaskのリカバリーフレーズを安全に保管してください。このフレーズでETHとZECの両方を管理します。

---

## **1. Zcash Snapをインストールする**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)にアクセスします。  
2. [**「Zcash WebZjs Wallet」**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)または[**「WebZjs Zcash Snap」**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)を検索します。  
3. **インストール/MetaMaskに追加**をクリックします。
4. 次のような権限を承認します。
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. （任意）Zcashネットワークを追加する**

MetaMaskで**ネットワークを追加**を選び、次の情報を入力します。

**BNB SmartChain**の場合；
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
これにより、ネットワーク情報とエクスプローラーへのリンクが利用できます。
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

**Zcash Mainnet**の場合；
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks`は[zec.rocks](https://zec.rocks)（@emersonian）が運用する、WebZjs互換（gRPC-web）のlightwalletdサーバーです。テストネットでは`https://zjs.zec.rocks/testnet`を使います。WebZjsウェブウォレットを自分で運用する場合は、`LIGHTWALLETD_PROXY`に設定する値です。

---

## **3. ChainSafe WebZjsウォレットに接続する**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)にアクセスします。  
2. **MetaMask Snapに接続**をクリックします。  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. 接続を承認します。  
4. Zcashアカウントの概要を確認します。次の情報が表示されます。
   - 統合アドレスと公開型アドレス

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. 同期が完了するまで待ちます。




---

## **4. ウォレットに入金する**

> **ETHをZECにスワップ** - **LeoDex**などのサービスを使い、シールドされたアドレスに送金します。  
> **取引所からの出金** - 購入したZECをWebZjsのシールドされたアドレスに出金します。  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **プライバシーを最大限に保護**するには、シールドされた（z）アドレスを使います。

---

## **5. ZECを送受信する**

1. **WebZjs**で**残高を送金**に進みます。  
2. 次の情報を入力します。
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. MetaMaskでトランザクションを確定します（トランザクションに署名します）。  
5. 受け取った資金は、承認後にWebZjsに表示されます。

---

## **6. 確認とトラブルシューティング**

> 残高が更新されているか**WebZjs**を確認します（**MetaMaskにはZECが直接表示されません**）。  
> 問題が発生した場合：
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **セキュリティのヒント:** **監査済みのChainSafe Snap**のみをインストールし、承認前に権限を確認してください。

---

## **7. アドレスの各要素を確認する**

1. **受取**セクションに進みます。統合アドレスがデフォルトで表示されます。  
2. 統合アドレスをコピーし、[Zcashブロックエクスプローラー](https://mainnet.zcashexplorer.app/)にアクセスします。  
3. 検索バーに統合アドレスを貼り付けます。  
4. 統合アドレスを構成するすべての要素が表示されます。
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **補足**

> [**最新のMetaMaskバージョン**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)を使ってください。公開版はSnapsに対応しています。  
> シールドされた証明の処理には時間がかかることがあります。計算はWebAssemblyがブラウザー内で行います。  
> 復元は簡単です。MetaMaskとSnapをインストールし、既存のシードをインポートします。  
> Snapではデフォルトで**シールドされたZEC**が使われます。公開型アドレスは**主な対象ではありません**。  
> トランザクションの承認状況は[mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app)で確認してください。
