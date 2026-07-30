# ゼロからゼロ知識へ: Transparent vs Shielded Transactions と Unified Addresses

**シリーズ:** Zero to Zero Knowledge

Zcash について初めて学ぶ方は、利用できるトランザクションに 2 つの種類があることに気づくでしょう。**Transparent** と **Shielded** です。  

今回はそれらについて学び、#Zcash エコシステムの新機能の 1 つである **Unified Addresses** を取り上げます。

---

## Transparent vs Shielded Transactions

- **Transparent Transactions** は **t-addresses**（Base58 エンコード）を使用します。すべてが Bitcoin と同じように公開されます。  
- **Shielded Transactions** は **Sapling** または **Orchard** プール向けにエンコードされたアドレスを使用します。これらはゼロ知識証明を使って、送信者、受信者、金額を隠します。

**Shielded Transaction** とは、Sapling/Orchard プール向けにエンコードされたアドレスを含むあらゆるトランザクションを指します。

![Transparent vs Shielded intro](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UAs)** は、shielded または transparent のトランザクションを 1 つのアドレスに**統合**するために設計されています。

---

## Zcash におけるアドレスの種類

使用されているアドレスには 3 つの種類があります:

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

種類が増えるごとに、文字数（したがって QR コードのサイズ）も大きくなります。

![Address types comparison](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR code size comparison](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Unified Addresses の仕組み

アドレスとキーはバイト列（**Raw Encoding**）としてエンコードされます。  
**Receiver Encoding** には、特定のプロトコルを用いて資産を送るために必要なすべての情報が含まれます。

Unified Address の raw encoding は、receiver のエンコード（typecode、length、addr）を組み合わせたものです:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**重要**: すべての UA には、**少なくとも 1 つの shielded payment address** が含まれていなければなりません。（Sprout アドレスは Canopy アップグレード以降サポートされていません。）

![UA encoding structure](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

完全な仕様: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Unified Addresses の利点

- **取引所にとってより簡単** - これにより、shielded の入出金をより安全にサポートできるようになりました。  
- **将来に対応** - 新しい shielded プールを、ウォレットを壊すことなく追加できます。  
- **Shielded-by-Default** - すべての UA には少なくとも 1 つの shielded アドレスが含まれるため、プライバシーは常に利用可能です。

これは、すでにより多くの ZEC が shielded プールへ移動する助けとなっている、根本的な変化です。

---

## Orchard Transactions & Actions

Orchard は **Actions** と呼ばれる新しい概念を導入しました:

- トランザクション内のすべての Actions に対して **single anchor** を使用することで、メタデータの漏えいを減らします。  
- (V4) Spend + Output のフィールドを、単一の value commitment に統合します。  
- これにより、Halo2 証明システムのパフォーマンス最適化が可能になります。

Daira による Anchor の位置の解説 (zcon3):

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

## Value Balance とプライバシー

場合によっては（たとえばクロスプール・トランザクションなど）、金額が外部の観察者に見えることがあります。しかし、`valueBalanceSapling` と `valueBalanceOrchard` は**準同型コミットメント**を使って shielded プール内の ZEC 総量を証明し、偽造を防ぎます。

詳しくはこちら: [Shielded Pools における偽造防止](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## 今後の改善

ECC チームは `zcashd` の新しい RPC メソッド（`z_sendmany` を置き換えるもの）に取り組んでおり、ユーザーは提案されたトランザクションのプライバシー特性にもとづいて、事前確認し、受け入れるか拒否するかを選べるようになります。

---

## 推奨

**YWallet** の最新版を試してみてください！  
送信ボタンを押す前に、すでに画面上に「Transaction Plan」が表示され、よりプライベートな選択をしやすくなっています。

トランザクションのプライバシーに関する素晴らしい記事: https://medium.com/@hanh.huynh/

---

**ZecHub (@ZecHub) による元スレッド**  
https://x.com/ZecHub/status/1628498645627666432

---

*このページは、ZecHub wiki のために元の Zero to Zero Knowledge スレッドをもとに編集されたものです。*
