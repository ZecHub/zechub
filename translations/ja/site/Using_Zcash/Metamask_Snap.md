<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# MetaMask Zcash Snap 統合ガイド

> MetaMaskブラウザ拡張機能から、ChainSafeのZcash SnapおよびWebZjsウェブウォレットを使用して、シールドされた（shielded）ZECを保有・送信できます。

## 要約

* ChainSafe Zcash Snapは、デスクトップ（Chrome、Edge、Firefox）上のMetaMaskにシールドされた（shielded）ZECを追加します。Zcash専用のソフトウェアは必要ありません。
* Zcashキーは、MetaMaskのリカバリーフレーズから導出されます。この1つのフレーズが、現在ではETHとZECの両方を保護します。
* ZECは、MetaMask自身の資産リストではなく、webzjs.chainsafe.devにあるWebZjsウォレットを通じて管理します。
* アカウントには統合アドレス（address）が付与されるため、送信者は対応している中で最もプライバシー（privacy）の高いプール（pool）で支払います。
* ETHからZECへのスワップ（swap）を行うか、取引所（exchange）からZECをシールドされたアドレスへ出金して資金を入れます。
* 復元：MetaMaskとSnapを再インストールしてから、既存のリカバリーフレーズをインポートします。

## 基本的な説明

MetaMask Snapは、MetaMaskに新しいブロックチェーン（blockchain）を認識させる、小規模でサンドボックス化されたアドオンです。ChainSafeが開発し、Hackenが監査したZcash Snapにより、MetaMaskは既存のリカバリーフレーズからZcashキーを導出し、Zcashトランザクション（transactions）に署名できます。

MetaMask自体にはZECの残高は表示されません。代わりに、WebZjsウェブウォレットがSnapに接続し、lightwalletdサーバーを介してZcashネットワークと同期して、あなたのアドレスと残高を表示します。シールドされたproof（Shielded proofs）はWebAssemblyを使用してブラウザ内で計算されるため、送信には少し時間がかかることがあります。

以下の手順では、Snapのインストール、WebZjsの接続、ウォレット（wallet）への資金の入金、送受信、および統合アドレス（unified address）の構成要素の確認について説明します。

## 完全ガイド

完全な手順と視覚的な解説については、こちらの[**YouTubeガイド**](https://www.youtube.com/watch?v=UJh9Ilkohdw)をご覧ください。 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMaskは現在、**シールドされた Zcash（ZEC）**を**ChainSafe開発のZcash Snap**を通じてサポートしており、ブラウザーのウォレット（wallet）からプライベートなZECを直接送信、受信、管理できます。**Hacken**による監査を受け、**公式のMetaMask Snaps Directory**に掲載されているため、必要なのはMetaMaskとSnapのみで、別途Zcashソフトウェアは不要です。

---

## **前提条件**


> [**MetaMask拡張機能**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)（デスクトップのみ）- Chrome、Edge、またはFirefox。  
> MetaMaskアカウント - シードフレーズ（seed phrase）を安全に保管してください。SnapはそこからZcashキーを導出します。  
> 安定したインターネット接続 - Zcashネットワークと同期するために必要です。  
> 資金 - ZECとスワップするためのETH、または取引所（exchange）から入手したZEC。

> **ヒント：** MetaMaskリカバリーフレーズはETHとZECの両方を管理するため、保護してください。

---

## **1. Zcash Snapをインストールする**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)にアクセスします。  
2. [**「Zcash Shielded Wallet」**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)または[**「WebZjs Zcash Snap」**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)を検索します。  
3. **Install/Add to MetaMask**をクリックします。
4. 次のような権限を承認します。
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. （任意）Zcashネットワークを追加する**

MetaMaskで**Add Network**を選択し、以下を入力します。

**BNB SmartChain**の場合：
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
これにより、ネットワーク情報とエクスプローラーへのリンクが有効になります。
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

**Zcash Mainnet**の場合：
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks`は、[zec.rocks](https://zec.rocks)（@emersonian）が運営するWebZjs互換の（gRPC-web）lightwalletdサーバーです。テストネットには`https://zjs.zec.rocks/testnet`を使用してください。WebZjsウェブウォレットを自分で運用する場合は、これを`LIGHTWALLETD_PROXY`として設定します。

---

## **3. ChainSafe WebZjs Walletに接続する**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)にアクセスします。  
2. **Connect MetaMask Snap**をクリックします。  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. 接続を承認します。  
4. 以下を含むZcashアカウントの概要を確認します。
   - 統合アドレス（address）と公開型アドレス

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. 同期が完了するまで待ちます。




---

## **4. ウォレットに資金を入れる**

> **ETHをZECへスワップ** - **LeoDex**などのサービスを使用し、シールドされたアドレスへ送信します。  
> **取引所からの出金** - 購入したZECをWebZjsのシールドされたアドレスへ出金します。  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **完全なプライバシー（privacy）**のため、シールドされた（z）アドレスを使用してください。

---

## **5. ZECを送受信する**

1. **WebZjs**で**Transfer Balance**に移動します。  
2. 以下を入力します。
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. MetaMaskでトランザクション（transaction）を確認します（トランザクションに署名します）。  
5. 受け取った資金は、確認後にWebZjsに表示されます。

---

## **6. 確認／トラブルシューティング**

> 更新された残高は**WebZjs**で確認してください（**MetaMaskはZECを直接上場していません**）。  
> 問題が発生した場合：
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **セキュリティのヒント：** 監査済みの**ChainSafe Snap**のみをインストールし、承認前に権限を確認してください。

---

## **7. アドレスの構成要素を確認する**

1. **Receive**セクションに移動します。統合アドレスがデフォルトで表示されます。  
2. 統合アドレスをコピーし、[Zcash ブロック（block）エクスプローラー](https://mainnet.zcashexplorer.app/)にアクセスします。  
3. 検索バーに統合アドレスを貼り付けます。  
4. 次の内容を含む、統合アドレスのすべての構成要素が表示されます。
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **補足事項**

> [**最新のMetaMaskバージョン**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)を使用してください。公開リリースではSnapsがサポートされています。  
> シールドされたProof（proof）には時間がかかる場合があります。WebAssemblyがブラウザー内で計算を処理します。  
> 復元は簡単です。MetaMaskとSnapをインストールしてから、既存のシードをインポートしてください。  
> Snapはデフォルトで**シールドされたZEC**を使用し、公開型アドレスは**主な対象ではありません**。  
> トランザクションの確認には、[mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app)を使用してください。
