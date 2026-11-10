# Zero to Zero Knowledge：Lelantusプロトコル

**シリーズ：** Zero to Zero Knowledge

本日は**Lelantus**を見ていきます！

2019年にリリースされたこのプロトコルは、Zerocoinを基盤としています。これは、プライベートなオンチェーントランザクションを可能にするため、**Firo**通貨（旧Zcoin）で使用されています。いくつかの点でZcashに似ていますが、ほとんどの側面で明確に異なります。

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## ZcashとFiroのプロトコル基盤

- **Zcash** - **Zerocash**プロトコルを基盤としています  
- **Firo（Zcoin）** - **Zerocoin**プロトコルを基盤としています

![Zerocash vs Zerocoin comparison](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Firoプライバシープロトコルの進化

Zcashと同様に、Firoは匿名の支払いを実現するためにシールドされた（shielded）アドレスを使用します。

**タイムライン：**
- **Zerocoin** - 健全性が破綻
- **Sigma** - 固定額面システム
- **Lelantus 1.0** - 正しいセキュリティプルーフを欠いていました

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Sigmaプロトコルの制限

Zcoin/Firoの初期バージョンで使用されていたΣ（Sigma）プロトコルには、大きな制限がありました。ユーザーは固定された額面しかミントできなかったのです。

これにより匿名性セットが小さくなり、ミント操作と償還操作の間でタイミング攻撃（および「汚染されたお釣り」の問題）が可能になりました。

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Lelantusがプライバシーを改善する仕組み

**Lelantus**は、1つの大きなセットからミントを可能にすることで、固定額面の問題を解決します。

主な利点：
- 固定額面の匿名性セットを排除します
- バーンと償還の間のタイミング攻撃を減らします
- 汚染されたお釣りの問題を解消します

**制限**：セットサイズは現在、**65,000コイン**に制限されています。

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## コインコミットメント

**コインコミットメント（coin commitment）**は、コインのシリアル番号とコインの価値をエンコードする二重盲検コミットメントです。

これらはZcashの**ノート**と同様に機能します。

コインコミットメントは、コインの作成時（MintまたはSpendトランザクションを通じて）に公開され、台帳に保存されます。

![Coin commitment diagram](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Basecoin < - > Zerocoinモデル

Lelantusは、従来の**basecoin < - > zerocoin**モデルを使用します。

**重要な機能**：残高と金額を隠したまま、部分的な償還が可能になりました。

Zcashと同様に、公開型トランザクションはユーザーが明示的に選択する必要があります。

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## One-of-Manyプルーフ

Lelantusは、入力元を明かすことなく、またトラステッドセットアップを必要とせずに、残高の証明に必要な入力値を抽出するために**One-of-Manyプルーフ（One-of-Many Proofs）**を活用します。

これらのプルーフは**Triptych**（CryptoNoteスレッドで言及）でも使用されています。

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## ネットワークレイヤーのプライバシー：Dandelion++

Firoノードは、ZcashのMagicbeanと同じNetwork Magicを使用します。

Moneroと同様に、Firoはトランザクション送信者のIPアドレスを難読化することでプライバシーを追加する**Dandelion++**を実装しました。

**Dandelion++のフェーズ：**
- **Stemフェーズ** - トランザクションはすべてのピアではなく、単一のランダムなノードへ中継されます
- **Fluffフェーズ** - ランダムに開始され、その後通常のゴシップモードに切り替わります

これにより、ネットワーク分析を通じてトランザクションの送信元を追跡することがはるかに困難になります。

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## 将来：Lelantus-Spark

**Lelantus-Spark**（2023年後半に予定）は、**ZIP-32スタイルの導出**と多様化アドレスを使用して、オプトインによる可視性を2段階で導入します。

また、以下のサポートも追加されます：
- マルチシグ
- ユーザー定義の機密資産

これらの機能は、Zcashのシールドされた資産と並行するものです。

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**ZecHub（@ZecHub）による元スレッド**  
https://x.com/ZecHub/status/1641902859800150017

---

*このページは、ZecHubウィキのために元のZero to Zero Knowledgeスレッドから編集されました。*
