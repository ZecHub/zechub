# ゼロからゼロ知識：Lelantusプロトコル

**シリーズ:** ゼロからゼロ知識

今日は **Lelantus** について見てみましょう！

2019年にリリースされたこのプロトコルは、Zerocoinに基づいています。**Firo**通貨（かつてはZcoin）で使用されており、オンチェーンでのプライベートな取引を可能にしています。Zcashといくつかの点では似ていますが、多くの面では明確に異なります。

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Zcash vs Firo プロトコルの基礎

- **Zcash** - **Zerocash**プロトコルに基づく  
- **Firo (Zcoin)** - **Zerocoin**プロトコルに基づく

![Zerocash vs Zerocoin 比較](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Firo プライバシー・プロトコルの進化

Zcashと同様に、Firoはシールドされたアドレスを使用して匿名的な支払いを実現しています。

**タイムライン:**
- **Zerocoin** - 安全性が破られた  
- **Sigma** - 定額システムが修正された  
- **Lelantus 1.0** - 正しいセキュリティ証明が欠如していた

![プロトコルの進化](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Sigma プロトコルの制限

以前のバージョンのZcoin/Firoで使用されていたΣ（Sigma）プロトコルには、大きな制限がありました：ユーザーは固定額のみを発行できました。

これにより、匿名性のセットが小さくなり、発行と引き換え操作間でのタイミング攻撃の可能性が開かれました（また、「汚染された変更」問題も生じました）。

![Sigma 定額](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Lelantus によるプライバシーの改善

**Lelantus**は、固定額の問題を解決するために、単一のより大きなセットから発行できるようにしています。

主な利点:
- 固定額の匿名性セットを排除
- 燃焼/引き換え間でのタイミング攻撃を減少
- 汚染された変更の問題を除去

**制限**: セットサイズは現在 **65,000コイン**に上限されています。

![Lelantus の利点](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## コインコミットメント

**コインコミットメント**とは、コインのシリアル番号と価値を二重にブレインドして符号化したコミットメントです。

これはZcashの **Notes** と同様に機能します。

コインが作成されたとき（MintまたはSpendトランザクションを通じて）、このコミットメントは公開され、帳簿に保存されます。

![コインコミットメント図](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Basecoin < - > Zerocoin モデル

Lelantusは古典的な **basecoin < - > zerocoin** モデルを使用しています。

**重要な特徴**: 一部の引き換えが可能になり、残額と金額を隠したままです。

Zcashと同様に、透明なトランザクションはユーザーによって明示的に選択される必要があります。

![Lelantus フロー](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## One-of-Many 証明

Lelantusは **One-of-Many 証明** を使用して、入力値を証明するために必要なものを抽出しますが、入力の起源を明らかにすることなく、信頼されたセットアップも必要ありません。

これらの証明はまた、**Triptych**（私たちのCryptoNoteスレッドで言及）でも使用されています。

![One-of-Many 証明](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## ネットワークレイヤーのプライバシー: Dandelion++

Firoノードは、ZcashのMagicbeanと同じ **Network Magic** を使用しています。

Moneroと同様に、Firoでは **Dandelion++** が実装されており、トランザクションを放送するユーザーのIPアドレスを隠してプライバシーを向上させています。

**Dandelion++ のフェーズ:**
- **Stem フェーズ** - トランザクションはすべてのピアではなく、単一のランダムなノードにリレーされる
- **Fluff フェーズ** - ランダムに開始され、その後通常のゴシップモードに切り替わる

これにより、ネットワーク分析を通じてトランザクションの起源をたどるのがはるかに難しくなります。

![Dandelion++ 説明](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## 未来: Lelantus-Spark

**Lelantus-Spark**（2023年後半に計画されている）は、**ZIP-32スタイルの導出**と分散アドレスを使用して、2つのレベルのオプトイン可視性を導入します。

また、以下もサポートする予定です:
- マルチシグ
- ユーザー定義の秘密資産

これらの機能はZcashのShielded Assetsと類似しています。

![Lelantus-Spark 公表](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**オリジナルスレッド: ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*このページは、ZecHubウィキ用にオリジナルのZero to Zero Knowledgeスレッドから編集されたものです。*
