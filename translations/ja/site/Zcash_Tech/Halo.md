<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Haloとは？

Haloは、Electric Coin Co.のSean Boweによって発見された、信頼を必要としない再帰的ゼロ知識証明（ZKP）です。これは、信頼設定を排除し、Zcashブロックチェーンのスケーラビリティを向上させます。Haloは、効率的かつ再帰的なゼロ知識証明システムとして広く認められ、科学的な突破と見なされています。

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**コンポーネント**

簡潔な多項式コミットメント方式：コミッターが、短い文字列で多項式にコミットし、検証者がコミットされた多項式の評価を確認できるようにします。

多項式インタラクティブオラクル証明：検証者はプロバー（アルゴリズム）に、多項式コミットメント方式を使って任意の点でコミットメントを開くよう要求し、それらの間の同一性を確認します。


### 信頼設定不要

zkSNARKsは、証明と検証に共通参照文字列（CRS）というパブリックパラメータを使用しています。このCRSは、信頼できる当事者によって事前に生成する必要があります。最近まで、AztecネットワークやZcashが行っていたような複雑なセキュアマルチパーティコンピュテーション（MPC）が必要で、この[信頼設定儀式](https://zkproof.org/2021/06/30/setup-ceremonies/amp/)中に発生するリスクを軽減していました。

以前のZcashのSproutとSaplingのシールドプールは、BCTV14およびGroth 16 zk証明システムを使用していました。これらは安全でしたが、制限がありました。これらは単一アプリケーションに結びついていたためスケーラビリティが低く、「有害な廃棄物」（ジェネシス儀式中に生成された暗号化材料の残り）が残る可能性があり、また儀式が信頼を必要としました（ただし非常にわずかなものです）。

楕円曲線のサイクル上で複数回にわたって困難な問題のインスタンスを繰り返し圧縮することで、計算証明が自分自身について効率的に推論できるようにする（ネストされた償却）ことで、信頼設定が必要なくなるようになりました。これにより、構造化参照文字列（儀式の出力）はアップグレード可能になり、スマートコントラクトなどのアプリケーションが可能になります。

Haloは、大規模なゼロ知識証明システムのセキュリティに関するユーザーにとって重要な2つの保証を提供します。まず、 genesis儀式に関与した誰もが詐欺的なトランザクションを実行するために秘密のバックドアを作成していないことをユーザーに証明できるようにします。次に、システムがアップグレードや変更を受けた後でも時間経過とともにセキュリティが維持されていることをユーザーに示すことができます。

[Sean BowesによるDystopia Labsでの説明](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### 再帰証明

再帰的な証明の構成により、1つの証明が実質的に無限に多くの他の証明の正しさを証明できるようになり、大量の計算（および情報）を圧縮することが可能になります。これはスケーラビリティにとって不可欠な要素であり、特にネットワークを水平方向に拡張しながらも、参加者の一部がネットワークの残りの部分の整合性を信頼できるようにする点で重要です。

Halo以前では、再帰的な証明構成には大きな計算コストと信頼設定が必要でした。主要な発見の一つは、**ネストされた償却**という技術です。この技術により、内積議論に基づく多項式コミットメント方式を使用して再帰的構成が可能となり、パフォーマンスを大幅に向上させ、信頼設定を回避しました。

[Haloの論文](https://eprint.iacr.org/2019/1021.pdf)では、この多項式コミットメント方式を完全に説明し、その中に新しい集約技術が存在することを発見しました。この技術により、大量の独立して作成された証明をほぼ単一の証明を検証するのと同じくらい速く検証することが可能になります。これだけで、Zcashで以前使用されていたzk-SNARKsよりも優れた代替手段を提供します。


### Halo 2

Halo 2は、Rustで書かれた高性能なzk-SNARK実装であり、信頼設定の必要性を取り除き、Zcashにおけるスケーラビリティのための基盤を築きます。

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

これは、我々のアプローチの一般化として**蓄積方式**を含んでいます。この新しい形式化により、ネストされた償却技術が実際にどのように機能するかが明らかになります；証明を**蓄積器**と呼ばれるオブジェクトに追加し、証明が蓄積器の以前の状態について推論することで、蓄積器の現在の状態を確認することによって、すべての以前の証明が正しいことを（帰納法により）確認できます。

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



一方で、他の多くのチームもSonic（Halo 1で使用されていた）よりも効率的な新しい多項式IOPを発見していました。その中でも最も効率的なのはPLONKであり、これはアプリケーション固有のニーズに基づいて効率的な実装を設計する際の非常に大きな柔軟性を提供し、Sonicから5倍速い証明時間を持つことができます。

[PLONK概要](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### これはZcashにどのような利点をもたらしますか？

OrchardシールドプールはNU5でアクティブ化され、Zcashネットワーク上でのこの新しい証明システムの実装です。SproutとSapling間で使用された同じターンスタイ尔設計により、古いシールドプールを段階的に退役する意図があります。これは、完全な信頼設定不要な証明システムへの移行を促進し、通貨ベースの健全性に対する信頼を強化し、Zcash全体における実装複雑さと攻撃面を削減します。2022年中盤にNU5がアクティブ化された後、再帰証明の統合が可能になりました（ただし完全にはありません）。いくつかのプライバシー向上も間接的に行われました。「Actions」の導入により、入力/出力を置き換えることでトランザクションメタデータの量を減少させました。

信頼設定は一般的に調整するのが困難であり、システム的なリスクを提示します。それぞれの主要なプロトコルアップグレードごとに繰り返す必要があります。それらを取り除くことは、新しいプロトコルアップグレードを安全に実装するための大きな改善です。

再帰証明構成は、無限量の計算を圧縮し、監査可能な分散システムを作成する可能性を持っています。これは特にProof of Stakeへの移行によりZcashが非常に強力になることを意味します。また、Zcashシールド資産の拡張や、将来的にフルノード使用の上位レベルでのレイヤー1容量向上にも役立ちます。


## Haloと広いエコシステムにおける関係

Electric Coin CompanyはProtocol Labs、Filecoin Foundation、Ethereum Foundationと協定を結び、Halo R&Dを探索しています。これは、それぞれのネットワークで技術がどのように使用されるかについてです。この協定は、エコシステム全体およびWeb 3.0にわたるスケーラビリティ、相互運用性、プライバシーの向上を目指しています。

さらに、Halo 2は[MITとApache 2.0オープンソースライセンス](https://github.com/zcash/halo2#readme)の下で提供されており、エコシステム内の誰もが証明システムを使用して構築できます。


### Filecoin

デプロイ以来、halo2ライブラリはzkEVMなどのプロジェクトに採用されています。Filecoin仮想マシンの証明システムへのHalo 2の統合の可能性があります。Filecoinでは、多くのコストのかかる時空証明/複製証明が必要です。Halo2はネットワークのスケーリングをより良くするために空間使用量を圧縮する上で画期的な役割を果たします。

[Filecoin FoundationとZookoのビデオ](https://www.youtube.com/watch?v=t4XOdagc9xw)

さらに、Filecoinストレージ支払いがZECで行われることにより、Zcashシールドトランザクションと同じレベルのプライバシーをストレージ購入に提供できる場合、FilecoinとZcashエコシステムにとって非常に有益です。このサポートは、Filecoinストレージ内でファイルを暗号化する機能を追加し、モバイルクライアントが**添付**メディアやファイルをZcash暗号化メモに接続できるようにすることも可能になります。

[ECC x Filecoinブログ投稿](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

効率的な検証遅延関数（VDF）のHalo 2証明の実装が進行中です。VDFは、多くの潜在的な用途を持つ暗号化プリミティブです。

スマートコントラクトアプリケーションやEthereumおよび他のプロトコルでのProof of Stakeにおけるリーダー選出として一般目的ランダム性のソースとして使用できます。

ECC、Filecoin Foundation、Protocol Labs、Ethereum Foundationはまた、ハードウェア加速暗号化に特化したベンダーである[SupraNational](https://www.supranational.net/)と協力し、VDFのGPUおよびASIC設計開発について検討しています。

[プライバシーとスケーリング探索グループ](https://appliedzkp.org/)も、Halo 2証明がEthereumエコシステムにおけるプライバシーとスケーラビリティを改善する方法について研究しています。このグループはEthereum Foundationに属し、ゼロ知識証明および暗号化プリミティブに関する幅広い焦点を持っています。

## Haloを使用している他のプロジェクト

+ [Anoma, プライバシー保護型マルチチェーンアトミックスワッププロトコル](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, Cardano上のL2 zkRollup](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, プライベートL1 zkEVMブロックチェーン](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, Ethereum上のL2 zkRollup](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**さらに学ぶ**:

[ZKPとHalo 2の紹介 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2についてDaira & Str4dが説明 - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[技術的な説明ブログ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2コミュニティショーケース - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**ドキュメント**

[Halo 2リソース](https://github.com/adria0/awesome-halo2)

[Halo 2ドキュメント](https://zcash.github.io/halo2/)

[Halo 2 GitHub](https://github.com/zcash/halo2)
