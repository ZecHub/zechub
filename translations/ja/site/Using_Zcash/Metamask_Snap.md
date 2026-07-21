# MetaMask Zcash Snap 統合ガイド

完全な手順と視覚的な説明については、この[**YouTubeガイド**](https://www.youtube.com/watch?v=UJh9Ilkohdw)をご覧ください。 

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
     

MetaMask は現在、**ChainSafe が開発した Zcash Snap** により **shielded Zcash (ZEC)** をサポートしており、ブラウザウォレット内でプライベートな ZEC を直接送信・受信・管理できます。**Hacken** による監査を受け、**公式 MetaMask Snaps Directory** に掲載されており、**別個の Zcash ソフトウェアは不要**です。必要なのは MetaMask と Snap だけです。

---

## **前提条件**


> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)（デスクトップのみ）- Chrome、Edge、または Firefox。
> MetaMask アカウント - シードフレーズを安全に保管してください。Snap はそこから Zcash の鍵を導出します。  
> 安定したインターネット接続 - Zcash ネットワークとの同期に必要です。  
> 資金 - ETH を ZEC にスワップするか、取引所から ZEC を用意してください。

> **ヒント:** MetaMask のリカバリーフレーズを保護してください。これは ETH と ZEC の両方を管理します。

---

## **1. Zcash Snap をインストールする**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) にアクセスします。  
2. [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) または [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) を検索します。  
3. **Install/Add to MetaMask** をクリックします。
4. 次のような権限を承認します:
   ```
      Zcash アカウントの管理 
      デバイス上へのデータ保存
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. （任意）Zcash ネットワークを追加する**

MetaMask で **Add Network** を選択し、次を入力します:

**BNB SmartChain** の場合;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
これにより、ネットワーク情報とエクスプローラーのリンクが有効になります。
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

**Zcash Mainnet** の場合;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. ChainSafe WebZjs Wallet に接続する**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) にアクセスします。  
2. **Connect MetaMask Snap** をクリックします。  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. 接続を承認します。  
4. 次を含む Zcash アカウントの概要を確認します:
   - Unified Address と Transparent address

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. 同期が完了するまで待ちます。




---

## **4. ウォレットに資金を入れる**

> **ETH -> ZEC をスワップ** - **LeoDex** などのサービスを使用し、あなたの shielded address に送信します。  
> **取引所からの出金** - 購入した ZEC をあなたの WebZjs shielded address に出金します。  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => **完全なプライバシー**のために shielded (z) addresses を使用してください。

---

## **5. ZEC を送信 / 受信する**

1. **WebZjs** で **Transfer Balance** に移動します。  
2. 次を入力します:
```
   - Shielded recipient address  
   - 金額
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. MetaMask でトランザクションを確認します（トランザクションに署名します）。  
5. 受信した資金は確認後に WebZjs に表示されます。

---

## **6. 確認 / トラブルシューティング**

> 更新された残高は **WebZjs** で確認してください **（MetaMask にはまだ ZEC が直接表示されません）** 。  
> 問題が発生した場合:
  ```
  - 公式の ChainSafe Snap を使用していることを確認する。  
  - 正しいネットワーク設定を確認する。  
  - 正しいアドレス形式であることを確認する。  
  - 必要に応じて **Connect Snap** から再接続する。
  ``` 

> **セキュリティのヒント:** **監査済みの ChainSafe Snap** のみをインストールし、承認前に権限を確認してください。

---

## **7. アドレスの構成要素を確認する**

1. **Receive** セクションに移動します - デフォルトであなたの Unified Address が表示されます。  
2. Unified Address をコピーし、[Zcash Block Explorer](https://mainnet.zcashexplorer.app/) にアクセスします。  
3. 検索バーに Unified Address を貼り付けます。  
4. これで Unified Address のすべての構成要素が表示されます。含まれるのは次のとおりです:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **補足事項**

> [**最新バージョンの MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) を使用してください - 公開版は Snaps をサポートしています。  
> Shielded proof の生成には時間がかかる場合があり、計算はブラウザ内で WebAssembly が処理します。  
> 復元は簡単です。MetaMask と Snap をインストールし、既存のシードをインポートしてください。  
> Snap はデフォルトで **shielded ZEC** を使用し、transparent addresses は **主眼ではありません**。  
> トランザクション確認には [zcashblockexplorer.com](https://zcashblockexplorer.com) を使用してください。
