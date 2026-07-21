<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# トランザクション

ZECは、支払いに広く使われているデジタル資産であり、友人への支払いや購入、寄付などさまざまな取引に適した強力なプライバシー機能を備えています。プライバシーとセキュリティを最大限に高めるために、Zcash内で異なるタイプのトランザクションがどのように動作するかを理解することが重要です。

## シールドされたトランザクション

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

シールドされたトランザクションは、ZECをあなたのシールドウォレットに移動するときに発生します。あなたのシールドウォレットのアドレスはUまたはZで始まります。シールドされたトランザクションを送信すると、あなたと取引相手が他のP2P支払いネットワークでは不可能なレベルのプライバシーを保証しています。シールドされたトランザクションを送ることは非常に簡単ですが、2つのことを確認する必要があります。1つ目は正しいタイプのウォレットを使用していることです。正しいタイプのウォレットを使用しているかを簡単に確認するには、[ウォレット](https://zechub.wiki/wallets)をダウンロードしてください。2つ目の重要な点はZECをシールドされたウォレットに移動することです。取引所からZECを引き出す際には、その取引所がシールドまたは透明な引き出しをサポートしているかを確認する必要があります。シールド引き出しがサポートされている場合は、単純にシールドアドレスにZECを引き出すことができます。もし取引所が透明な引き出しのみをサポートしている場合、YWalletを使用してZECを受け取った後、自動的にシールドする必要があります。送金および受信のためだけにシールドされたトランザクションを使用することはプライバシーを維持し、データ漏洩のリスクを減らす最も良い方法です。

## 透明なトランザクション

透明なトランザクションは類似して動作しますが、プライバシー保護機能がないため、トランザクションの詳細はブロックチェーン上に公開されます。プライバシーが優先される場合、透明なトランザクションは避けるべきです。注意: ZIP-317により、透明ウォレットはトランザクションの複雑さに比例した手数料が必要になるため、問題を引き起こす可能性があります。デフォルトの手数料はトランザクションの拒否または遅延につながる可能性があるため、手数料のカスタマイズが重要です。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

### 透明なトランザクションの手数料管理

ZIP-317ガイドライン: 手数料構造はトランザクションの複雑さに比例してスケーリングし、標準的な0.00001 ZECの手数料を超える調整が必要です。
例として計算: 単純な1ノートのトランザクションでは、0.0001 ZECの手数料が必要であり、追加のノートごとに約0.00005 ZECずつ増加します。

ウォレットでの手数料編集

Trust Wallet: トランザクションを作成するときに歯車アイコンをタップして高度な設定にアクセスしてください。マイナーのチップGweiと最大手数料Gweiフィールドを慎重に調整し、トランザクションの失敗を避けてください。Trust Walletはネットワーク手数料のみを課金します。
Coinomi Wallet: ネットワーク状況に基づいてLow（低）、Normal（通常）、High（高）の3つの動的な手数料オプションを提供しています。手動調整が必要な場合は、サポートされているコインで「Custom（カスタム）」を選択するか、右上隅にある「Change Fee（手数料変更）」を使用してください。ユーザーはバイトまたはキロバイトごとの手数料を設定でき、確認時間に影響を与えます。動的なオプションの使用が推奨されます。

このバージョンではTrust WalletとCoinomiで手数料管理ガイドライン、動的およびカスタム手数料オプションを含め、ユーザーに包括的な手数料制御情報を提供しています。

#### リソース

[ZIPS](https://zips.z.cash/)

#### 注意事項

ZECを使用する最も安全な方法はシールドされたトランザクションのみを使用することです。一部のウォレットでは、[統合アドレス](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.)の実装が進行中で、ユーザーと取引所が透明アドレスとシールドアドレスを一緒に組み合わせることができるようになります。

## ZECからZATへの変換器
