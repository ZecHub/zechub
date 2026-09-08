<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Haloとは？

Haloは、Electric Coin Co. のSean Boweによって発見された、トラストレスで再帰的なゼロ知識証明（ZKP）です。これはトラステッドセットアップを不要にし、Zcashブロックチェーンのより高いスケーラビリティを可能にします。Haloは、効率的かつ再帰的である最初のゼロ知識証明システムであり、科学的ブレークスルーとして広く評価されています。

![halo](/content-images/_unavailable.svg "halo")


**構成要素**

簡潔な多項式コミットメント方式: コミッターが短い文字列で多項式にコミットできるようにし、その文字列を使って検証者が、コミットされた多項式の主張された評価値を確認できます。

多項式インタラクティブ・オラクル証明: 検証者が証明者（アルゴリズム）に対し、多項式コミットメント方式を使って、選択したさまざまな点で全てのコミットメントを開示するよう求め、それらの間で恒等式が成り立つことを確認します。 


### トラステッドセットアップ不要

zkSNARKは、証明と検証のための公開パラメータとして共通参照文字列（CRS）に依存しています。このCRSは、信頼できる当事者によって事前に生成されなければなりません。最近まで、Aztec networkやZcashが実施したような精巧で安全なマルチパーティ計算（MPC）が、この[トラステッドセットアップセレモニー](https://zkproof.org/2021/06/30/setup-ceremonies/amp/)に伴うリスクを軽減するために必要でした。 

以前のZcashのSproutおよびSaplingシールドプールでは、BCTV14とGroth 16のzk証明システムが使われていました。これらは安全ではあったものの、いくつかの制約がありました。単一アプリケーションに結びついていたためスケーラブルではなく、「toxic waste」（ジェネシスセレモニー中に生成された暗号学的素材の残留物）が残存する可能性があり、また、ユーザーがそのセレモニーを受け入れ可能だと見なすための信頼要素（ごくわずかではあるものの）が存在していました。

計算証明が自分自身について効率的に推論できるように、楕円曲線のサイクル上で難しい問題の複数のインスタンスを繰り返し一つに畳み込むことにより（ネストされた償却）、トラステッドセットアップの必要性は排除されます。これはまた、構造化参照文字列（セレモニーの出力）がアップグレード可能になることを意味し、スマートコントラクトのようなアプリケーションを可能にします。

Haloは、大規模なゼロ知識証明システムの安全性に関して、ユーザーに2つの重要な保証を提供します。第一に、ジェネシスセレモニーに関与した誰もが不正な取引を実行するための秘密のバックドアを作成していないことを、ユーザーが証明できるようにします。第二に、更新や変更が加えられてきた期間を通じても、システムが安全性を維持してきたことを、ユーザーが示せるようにします。

[Dystopia LabsでのSean Bowesによる解説](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### 再帰的証明

再帰的証明合成により、単一の証明で事実上無制限の他の証明の正しさを証明でき、大量の計算（および情報）を圧縮できます。これはスケーラビリティにとって不可欠な要素であり、とりわけ、ネットワークの残りの部分の完全性を参加者の一部が信頼できるまま、ネットワークを水平方向にスケールできるようにします。

Halo以前は、再帰的証明合成を実現するには大きな計算コストとトラステッドセットアップが必要でした。主要な発見の1つが、**nested amortization** と呼ばれる技術です。この技術により、内積引数に基づく多項式コミットメント方式を使った再帰的合成が可能になり、性能が大幅に向上するとともに、トラステッドセットアップを回避できます。

[Halo論文](https://eprint.iacr.org/2019/1021.pdf)では、この多項式コミットメント方式を完全に記述し、その中に新しい集約技術が存在することを発見しました。この技術により、独立して作成された多数の証明を、単一の証明を検証するのとほぼ同じ速さで検証できます。これだけでも、Zcashで以前使われていたzk-SNARKsより優れた代替手段となります。


### Halo 2

Halo 2は、Rustで書かれた高性能なzk-SNARK実装であり、トラステッドセットアップの必要性を排除しつつ、Zcashのスケーラビリティへの基盤を整えます。 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

これには、**accumulation scheme** と呼ばれる私たちのアプローチの一般化が含まれています。この新しい定式化は、ネストされた償却技術が実際にどのように機能するかを明らかにします。つまり、**accumulator** と呼ばれるオブジェクトに証明を追加し、それらの証明がaccumulatorの前の状態について推論することで、accumulatorの現在の状態を確認するだけで、以前の全ての証明が正しかったことを（帰納的に）確認できます。

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



並行して、多くの他チームも、Sonic（Halo 1で使用）より効率的な新しいPolynomial IOPを発見していました。たとえばMarlinなどです。 

これら新しいプロトコルの中で最も効率的なのがPLONKであり、アプリケーション固有のニーズに基づく効率的な実装設計に非常に大きな柔軟性を与え、Sonicと比べて5倍優れた証明者時間を実現します。

[PLONKの概要](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### これはZcashにどのような利益をもたらすのか？

Orchard Shielded poolはNU5で有効化され、Zcashネットワーク上でこの新しい証明システムを実装したものです。SproutとSaplingの間で使われたものと同じターンスタイル設計で保護されており、古いシールドプールを段階的に退役させることを意図しています。これにより、完全にトラストレスな証明システムへの移行が促進され、マネタリーベースの健全性に対する信頼が強化され、Zcash全体の実装複雑性と攻撃面が削減されます。2022年半ばのNU5有効化に続き、再帰的証明の統合が可能になりました（ただし、これはまだ完了していません）。また、これに付随していくつかのプライバシー強化も行われました。入力/出力を置き換える「Actions」の導入は、取引メタデータ量の削減に役立ちました。 

トラステッドセットアップは一般に調整が難しく、システム全体のリスクをもたらしていました。主要なプロトコルアップグレードごとに、それらを繰り返す必要がありました。それを取り除くことは、新しいプロトコルアップグレードを安全に実装するうえで大きな改善となります。 

再帰的証明合成は、無制限の計算量を圧縮し、監査可能な分散システムを作り出す可能性を持っており、特にProof of Stakeへの移行により、Zcashを非常に高機能なものにします。これは、Zcash Shielded Assetsのような拡張や、今後数年におけるZcashのフルノード利用の上限側でのレイヤー1容量改善にも有用です。


## より広いエコシステムにおけるHalo 

Electric Coin Companyは、Protocol Labs、Filecoin Foundation、Ethereum Foundationと、Haloの研究開発、およびこの技術がそれぞれのネットワークでどのように利用できるかを探るための契約を締結しています。この契約は、エコシステム間およびWeb 3.0に向けて、より高いスケーラビリティ、相互運用性、プライバシーを提供することを目的としています。

さらに、Halo 2は[MITおよびApache 2.0のオープンソースライセンス](https://github.com/zcash/halo2#readme)の下で提供されており、エコシステム内の誰もがこの証明システムを用いて構築できます。

### Filecoin

デプロイ以降、halo2ライブラリはzkEVMのようなプロジェクトで採用されており、Filecoin Virtual Machineの証明システムへのHalo 2の統合の可能性があります。Filecoinでは、多数の高コストなproofs of spacetime / proofs of replicationが必要です。Halo2は、容量使用量を圧縮し、ネットワークをよりよくスケールさせるうえで重要な役割を果たすでしょう。

[Zookoを迎えたFilecoin Foundationの動画](https://www.youtube.com/watch?v=t4XOdagc9xw)

さらに、FilecoinとZcashの両エコシステムにとって、Filecoinのストレージ支払いをZECで行えるようになれば非常に有益でしょう。そうすることで、Zcashのシールド送金に存在するのと同等のプライバシー水準を、ストレージ購入にも与えられます。このサポートにより、Filecoinストレージ内のファイルを暗号化する機能が追加され、さらにモバイルクライアントがZcashの暗号化メモにメディアやファイルを**添付**できるようになります。 

[ECC x Filecoin ブログ記事](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

効率的なVerifiable Delay Function（VDF）のためのHalo 2証明の実装が進められています。VDFは、多くの潜在的ユースケースを持つ暗号プリミティブです。 

これは、汎用的な乱数源として利用でき、スマートコントラクトアプリケーションでの利用や、Ethereumおよび他のプロトコルにおけるProof of Stakeのリーダー選出にも使用できます。

ECC、Filecoin Foundation、Protocol Labs、Ethereum Foundationはまた、ハードウェア加速暗号を専門とするベンダーである[SupraNational](https://www.supranational.net/)と協力し、VDFのためのGPUおよびASICの設計・開発の可能性を探ります。

[Privacy and Scaling Exploration group](https://appliedzkp.org/)も、Halo 2証明がEthereumエコシステムのプライバシーとスケーラビリティを改善できるさまざまな方法を研究しています。このグループはEthereum foundation配下にあり、ゼロ知識証明と暗号プリミティブ全般に幅広く焦点を当てています。 

## Haloを使用しているその他のプロジェクト

+ [Anoma、プライバシー保護型マルチチェーン原子的スワッププロトコル](https://anoma.net/blog/hash-functions-in-plonkup)

+ [Oribis、Cardano上のL2 zkRollup](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi、プライベートなL1 zkEVMブロックチェーン](https://dark.fi/book/arch/arch.html)

+ [Scroll、Ethereum上のL2 zkRollup](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**さらに学ぶ**:

[zkpとhalo 2の入門 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Daira & Str4dと学ぶHalo 2 - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[技術解説ブログ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**ドキュメント**

[Halo 2 リソース](https://github.com/mhchia/awesome-halo2)

[Halo 2 ドキュメント](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
