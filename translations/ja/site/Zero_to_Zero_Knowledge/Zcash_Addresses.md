# Zero to Zero Knowledge：公開型トランザクションとシールドされたトランザクション、および統合アドレス

**シリーズ：** Zero to Zero Knowledge

Zcashについて初めて学ぶ場合、利用可能なトランザクションには、**公開型**と**シールドされた**の2種類があることが分かります。  

本日はこれらについて学び、#Zcashエコシステムの新機能の1つである**統合アドレス（Unified Addresses）**を取り上げます。

---

## 公開型トランザクションとシールドされたトランザクション

- **公開型トランザクション**は、Base58でエンコードされた**t-アドレス**を使用します。Bitcoinと同様に、すべてが公開されています。  
- **シールドされたトランザクション**は、**Sapling**または**Orchard**プール向けにエンコードされたアドレスを使用します。これらはゼロ知識プルーフ（zero-knowledge proofs）を用いて、送信者、受信者、金額を隠します。

**シールドされたトランザクション**とは、Sapling/Orchardプール向けにエンコードされたアドレスを含むトランザクションを指します。

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**統合アドレス（UAs）**は、シールドされたトランザクションまたは公開型トランザクションを単一のアドレスに**統合**するよう設計されています。

---

## Zcashのアドレス種類

使用されているアドレスには3種類あります。

1. **(T) 公開型** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) 統合アドレス** – Bech32m  

文字数（したがってQRコードのサイズ）は、種類ごとに増加します。

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## 統合アドレスの仕組み

アドレスとキーは、バイト列（**Raw Encoding**）としてエンコードされます。  
**Receiver Encoding**には、特定のプロトコルを使用して資産を転送するために必要なすべての情報が含まれます。

統合アドレスのRaw Encodingは、受信者のエンコード（typecode、length、addr）を組み合わせたものです。

- UA：`0x03`  
- Sapling：`0x02`  
- 公開型：`0x01`  

**重要**：すべてのUAには、**少なくとも1つのシールドされた支払いアドレス**が必要です。（Sproutアドレスは、Canopyアップグレード以降サポートされなくなりました。）

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

完全な仕様：**[ZIP-316：統合アドレス](https://zips.z.cash/zip-0316)**

---

## 統合アドレスの利点

- **取引所にとって容易** - より安全にシールドされた入金・出金をサポートできるようになります。  
- **将来性** - ウォレットを壊すことなく、新しいシールドされたプールを追加できます。  
- **デフォルトでシールド** - すべてのUAには少なくとも1つのシールドされたアドレスが含まれているため、プライバシーを常に利用できます。

これは、より多くのZECがシールドされたプールへ移行する助けとなっている根本的な変化です。

---

## Orchardトランザクションとアクション

Orchardは、**アクション（Actions）**と呼ばれる新しい概念を導入しました。

- トランザクション内のすべてのアクションに**単一のアンカー**を使用することで、メタデータの漏えいを減らします。  
- （V4）のSpend + Outputのフィールドを、単一のvalue commitmentに統合します。  
- これにより、Halo2プルーフシステムのパフォーマンス最適化が可能になります。

Dairaがアンカー位置について説明します（zcon3）：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Value Balanceとプライバシー

一部の場合（例：プール間トランザクション）では、金額が外部の観察者に見えることがあります。しかし、`valueBalanceSapling`と`valueBalanceOrchard`は**準同型コミットメント**を使用して、シールドされたプール内のZECの合計を証明し、偽造を防止します。

詳細：[ZIP 209：範囲外のチェーンValue Pool残高を禁止する](https://zips.z.cash/zip-0209)

---

## 今後の改善

ECCチームは、`zcashd`（`z_sendmany`を置き換えるもの）の新しいRPCメソッドに取り組んでいます。これによりユーザーは、プライバシー特性に基づいて提案されたトランザクションをプレビューし、承認または拒否できるようになります。

---

## 推奨

このスレッドはもともと、送信を押す前にトランザクション計画を表示する**YWallet**を紹介していました。YWalletは現在メンテナンスされておらず、Ironwood向けに更新されることもないため、チェーンを追跡できなくなっています。代わりに[ウォレット](https://zechub.wiki/wallets)ページからメンテナンスされているウォレットを選び、送信前にトランザクションで何が明らかになるかを示してくれるものを優先してください。

トランザクションのプライバシーに関する優れた記事：https://medium.com/@hanh.huynh/

---

**ZecHub（@ZecHub）による元のスレッド**  
https://x.com/ZecHub/status/1628498645627666432

---

*このページは、ZecHub wiki向けに元のZero to Zero Knowledgeスレッドから編集されました。*
