<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ゼロ知識とデコイベースのシステムの比較

「暗号資産は、銀行口座へのTwitterのようなものであるため、すべての支出活動を公開します。これは、オンチェーンのプライバシーを採用することで解決すべき重大な問題です。」— [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9)でのIan Miers。

一部の暗号資産プロジェクトは、プライバシーを重視したアプローチで認知を得ています。Zcashは、トランザクション額とアドレスを保護するためにゼロ知識 proof（Zero Knowledge Proofs、ZK）を採用していることで知られています。Moneroは、他の暗号化方式と組み合わせたデコイベースの送信者難読化を活用し、ブロックチェーン上でユーザーのプライバシーを実現している点で際立っています。


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## ZK proofとデコイベースのシステムを理解する

ゼロ知識 proofは、ある当事者（証明者）が別の当事者（検証者）に対して、*その主張自体に関する基礎情報を一切明かすことなく*、主張の有効性を示せる暗号システムです。Zcashの文脈では、ZK proofは、送信者、受信者、トランザクション額といったトランザクションの詳細を開示せずに、トランザクションの有効性を検証するために使用されます。 

**これにより、トランザクションは検証されながらも機密に保たれ、ユーザーのプライバシーが維持されます。この技術は、Zcashネットワーク上の金融トランザクションの機密性を確保するよう設計されています。**

[RingCT](https://twitter.com/ZecHub/status/1636473585781948416)のようなデコイベースのシステムでは、複数のトランザクションを組み合わせるため、資金の実際の出所と送付先を追跡することが困難になります。このアルゴリズムは、トランザクションにデコイの入力と出力を導入し、入力として使用されるアドレスの暗号化も行い、レンジ proofを使用して送金額が使用可能であることを検証します。 

このアプローチは、トランザクションの追跡経路を難読化します。デコイ入力を使用することで、ブロックチェーンを分析する者が実際の送信者、受信者、またはトランザクション額を特定することは困難になります。 

**重要な注意事項**：このオンチェーンのプライバシー保護トランザクション手法では、依然としてすべてのユーザートランザクションの入力が明示的に公開されます（暗号化されています）。ネットワーク上の異なるユーザー間の*トランザクションの流れ*などのメタデータは、依然として収集可能です。攻撃者がネットワーク上でトランザクションの生成に積極的に参加した場合、他のユーザーのデコイ入力を実質的に匿名化解除できます。 


## デコイベースのシステムに対するZKの利点

ZcashとMoneroはどちらもプライバシー重視の暗号資産ですが、異なる方法でプライバシーを実現しています。 

以下は、Zcashのゼロ知識 proof（ZK）がMoneroのデコイシステムより優れている点です。

1) **選択的開示（Selective Disclosure）**：ZcashのZK機能セットにより、ユーザーはトランザクションの詳細を特定の当事者に開示する選択肢を得られます。[選択的開示に関するECCブログを読む](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)。Zcashでは、シールドされたトランザクションの暗号化された内容により、個人は特定の送金からデータを選択的に開示できます。さらに、特定のシールドされたアドレスに関連するすべてのトランザクションを開示するために、ビューイングキー（viewing key）を提供できます。この機能により、ネットワーク全体のプライバシーを損なうことなく、規制遵守と監査可能性を実現できます。 

Moneroのデコイアルゴリズム（リング署名）はプライバシーの提供に役立ちますが、同じ方法で*選択的な*開示を提供するものではありません。


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **任意の可視性**：Zcashでは、ユーザーは公開型（非プライベート）トランザクションとシールドされた（プライベート）トランザクションのどちらかを選択できます。これは、Zcashが、金融情報を非公開に保つ（シールドされた）か、[Zcash公式ウェブサイト](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)で説明されているように、他の多くのブロックチェーンと同様に公開型で一般公開するかを選べる柔軟性をユーザーに提供することを意味します。このオプトイン型プライバシーにより、より大きな柔軟性と、ビジネス／組織に関連するユースケースが可能になります。一部のトランザクションは公的な精査のためにプライバシーを抑える必要がある一方、他のトランザクションは強化されたプライバシーの恩恵を受けるためです。


3) **匿名性セット**：ゼロ知識シールドされたプールの[匿名性セット](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score)は、これまでに発生した*すべての*トランザクションで構成されています。これは、トランザクションの関連付け不能性を実現する他のほとんどのオンチェーン技術よりも大幅に大きいものです。注：これは同一のシールドされたプール内のトランザクションにのみ適用されます。

デコイを使用すると匿名性セットは増加します。しかし、このアプローチはネットワーク上の*実際の*ユーザー数に完全に依存します。 

4) **トラステッドセットアップなし**：ZcashのSproutおよびSaplingセットアップでは、「トラステッドセットアップセレモニー」として知られるマルチパーティ計算を使用していました。最近のNU5アップグレードでは、ゼロ知識回路のセットアップの完全性を信頼する必要がありませんでした。[ECCに関するNU5ブログを読む](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/)。

5) **データプライバシー**：[zk-SNARK技術](https://zechub.wiki/zcash-tech/zk-snarks)をZcashのシールドされたプールで使用することで、ユーザーのセキュリティが大幅に強化されます。オンチェーンでのメタデータ漏洩が減少するため、ユーザーは潜在的なハッカーや抑圧的な国家機関などの攻撃者から保護されます。 

Moneroのデコイ選択アルゴリズムでは、バグが特定された事例がいくつかあります。[CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero)の報告によると、これらのバグはユーザーの支出を明らかにする可能性がありました。 


要約すると、最も重要なのは、[Orchid（priv8）AMAライブセッション](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9)でZookoが説明したように、ユーザー情報とデータの漏洩を減らす、または排除することです。 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***参考リンク***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
