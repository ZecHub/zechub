<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 零知識証明とダミーに基づくシステムの比較

「暗号通貨は、あなたの銀行口座のようにツイッターのようなものであり、すべての取引活動を公開してしまうため、これはブロックチェーン上でのプライバシーを採用して解決すべき大きな問題です。」 - Ian Miers at [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

一部の暗号通貨プロジェクトはプライバシーに重点を置いたアプローチで注目を集めています。Zcashは、取引額やアドレスを保護するためにゼロ知識証明（ZK）を使用していることで知られています。一方、Moneroはブロックチェーン上のユーザーのプライバシーを達成するために、ダミーに基づく送信者隠蔽とその他の暗号化技術を組み合わせて使用しています。

<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>

## 零知識証明とダミーに基づくシステムの理解

零知識証明は、ある情報（証明者）が別の情報（検証者）に、その文の真偽を示すことができる暗号技術であり、その文自体に関する*どんな情報をも開示しない*。Zcashにおいては、ゼロ知識証明を使用して取引の有効性を確認するが、送信者、受信者、または取引金額などの取引詳細を開示することなく行う。

**これにより、ユーザーのプライバシーが保たれつつも、取引は依然として検証される。この技術は、Zcashネットワーク上の金融取引の機密性を確保するために設計されている。**

ダミーに基づくシステム（例：[RingCT](https://twitter.com/ZecHub/status/1636473585781948416)）では、複数の取引が組み合わされており、資金の実際の出発点と目的地をたどるのが困難または難しくなる。アルゴリズムは、取引にダミー入力および出力を導入し、入力として使用されるアドレスを暗号化することも行い、範囲証明を使用して転送された金額が支払可能であることを検証する。

この方法により、取引のトレースが曖昧になる。ダミー入力の使用は、ブロックチェーンを分析している誰かが実際の送信者、受信者、または取引金額を特定するのが困難になる。

**重要な注意点**: このオンチェーンプライバシー保護方法は、依然としてすべてのユーザーの取引に（暗号化された）入力を明示的に開示する。ネットワーク上での*取引の流れ*などのメタデータは、依然として収集可能である。もし敵対者がネットワーク上で積極的にトランザクションを生成している場合、他のユーザーのダミー入力が効果的に匿名化されなくなる。

## 零知識証明（ZK）のデコイベースシステムに対する利点

ZcashとMoneroはどちらもプライバシーに重点を置いた暗号通貨であるが、プライバシーを達成する方法は異なる。

以下は、Zcashのゼロ知識証明（ZK）がMoneroのデコイシステムに対して持ついくつかの利点です：

1) **選択的な開示**: ZcashのZK機能セットを使用すると、ユーザーは特定の当事者に取引詳細を開示するオプションがあります[選択的開示に関するECCブログを参照](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)。Zcashでは、シールドされたトランザクションの暗号化された内容により、特定の転送からデータを選択的に開示することが可能です。さらに、特定のシールドアドレスに関連するすべてのトランザクションを開示するために視認キーを提供することもできます。この機能は、ネットワーク全体のプライバシーに影響を与えることなく、規制遵守と監査可能性を可能にします。

一方で、Moneroのデコイアルゴリズム（リング署名）はプライバシーを提供するが、同じように*選択的*な開示を提供することはできません。


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>

2) **選択的な可視性**: Zcashは、ユーザーが透明（非プライベート）な取引とシールド（プライベート）な取引のどちらかを選択できるようにしています。これは、Zcashがユーザーに金融情報をプライベート（シールド）に保つか、または他のブロックチェーンのように公開して利用可能にする柔軟性を提供していることを意味します[公式サイト](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)。このオプインプライバシーにより、一部の取引では公的な検査のためにプライバシーが少なめにされる一方で、他の取引では強化されたプライバシーが得られるため、ビジネスや組織に関連するユースケースにも適しています。

3) **匿名セット**: 零知識シールドプールの[匿名セット](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/)は、*これまでに発生したすべての取引*を含みます。これは、他のオンチェーン技術による取引の非関連性達成においてはるかに大きいです。注: これは同じシールドプール内の取引のみに適用されます。

デコイの使用により匿名セットが増加します。ただし、このアプローチはネットワーク上の*実際のユーザー数*に完全に依存しています。

4) **信頼設定不要**: ZcashのSprout & Sapling設定では、「信頼された設定セレモニー」として知られるマルチパーティ計算を使用していました。最近のNU5アップグレードは、ゼロ知識回路の設定の整合性への信頼を必要としませんでした。[ECCブログでNU5を読む](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/)。

5) **データプライバシー**: Zcashのシールドプールに使用されている[zk-SNARK技術](https://wiki.zechub.xyz/zcash-technology)は、ユーザーにとって非常に強化されたセキュリティを提供します。オンチェーンでのメタデータ漏洩の削減により、ユーザーは潜在的なハッカーまたは抑圧的な国家機関などの敵対者から守られます。

Moneroのデコイ選択アルゴリズムにいくつかのバグが見つかった事例があります。[Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero)からの報告によると、これらのバグはユーザーの支出を明らかにする可能性がありました。

要するに、最も重要なのは、Zookoが[Orchid (priv8) AMAライブセッション](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9)で説明したように、ユーザー情報とデータの漏洩を減らすか完全に排除することです。


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>

____

***参考リンク***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
