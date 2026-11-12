<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## 要約

Haloは、Sean BoweがElectric Coin Coで発見した、トラストレスで再帰的なゼロ知識（zero-knowledge）proof（ZKP）システムです。トラステッドセットアップの必要性をなくし、再帰的なproofの合成を実用的にします。これは、Zcashの現在のスケーリングとセキュリティのロードマップの基盤です。

- **概要：** 効率的な再帰とトラステッドセットアップのセレモニーを必要としないzk-SNARK構造です。
- **重要な理由：** 2022年にNU5で有効化されたZcashのOrchardシールドされたプールは、この研究のプロダクション実装であるHalo 2上で動作します。
- **主要な特性：** セットアップセレモニーによる「toxic waste」がなく、実質的に無制限の他のproofを証明できるproofを実現します。
- **ライセンス：** Halo 2は[MIT and Apache 2.0](https://github.com/zcash/halo2#readme)のもとでオープンソース化されているため、エコシステム内の誰もがこれを基盤に構築できます。

---

## 基本的な説明

Haloは、Sean BoweがElectric Coin Coで発見した、トラストレスで再帰的なゼロ知識proofシステムです。トラステッドセットアップを排除し、Zcashブロックチェーンのスケーラビリティを向上させます。Haloは、効率的かつ再帰的な初のゼロ知識proofシステムであり、科学的なブレークスルーとして広く評価されています。

![halo](/content-images/_unavailable.svg "halo")

### 2つの構成要素

- **簡潔な多項式コミットメントスキーム。** コミッターが短い文字列で多項式にコミットできるようにし、検証者はそれを用いてコミットされた多項式の主張された評価を確認できます。
- **多項式対話型オラクルproof。** 検証者は、多項式コミットメントスキームを使用して、証明者（アルゴリズム）に任意に選んだ点で全てのコミットメントを開示するよう求め、それらの間で恒等式が成立することを確認します。

### トラステッドセットアップなし

一部のzk-SNARK構成（Groth16など）では、公開パラメータ（public parameters）、しばしば共通参照文字列（CRS）と呼ばれるものを生成するために、トラステッドセットアップ（trusted setup）が必要です。CRSはプルーバー（prover）と検証者（verifier）で共有されるものであり、破棄しなければならない秘密情報ではありません。このようなセットアップで生成される秘密の中間資料（「トキシックウェイスト（toxic waste）」）は破棄する必要があります。安全なマルチパーティ計算（secure multi-party computation）によって、この信頼を分散できます。少なくとも1人の参加者がプロトコルに従い、自身の秘密の寄与分を破棄すれば、そのセレモニーは安全です。ECCによる[公開パラメータとトキシックウェイストの解説](https://zodl.com/snark-parameters/)をご覧ください。

Zcashの以前のSproutおよびSaplingのシールドされた（shielded）プール（pool）では、それぞれトラステッドセットアップ（trusted setup）を必要とするプルーフ（proof）生成システムであるBCTV14およびGroth16を使用していました。それらの公開パラメータ（public parameters）は、プルーフ生成と検証（verification）のために引き続き利用可能です。懸念されるのは、偽のプルーフを可能にし得る秘密のセットアップ素材が保持されていたかどうかです。CRS自体の公開は想定されていることであり、その秘密素材を明らかにするものではありません。

Haloは、内積アーギュメントに基づく多項式commitmentスキームと再帰的proof合成を組み合わせます。公開パラメータには、トラステッドセットアップのセレモニーも、秘密のセットアップトラップドアの破棄も必要ありません。[Halo 2の書籍では、これらの公開グループパラメータについて説明しています](https://zcash.github.io/halo2/background/pc-ipa.html#setup)。これは、セレモニーで生成された構造化参照文字列をアップグレード可能にすることとは異なります。

このセットアップ要件をなくすことで、Halo proofのために秘密のセレモニー資料の破棄に依存する必要がなくなります。これにより、以前のSproutまたはSaplingのセレモニーが侵害されていなかったことがproofされるわけでも、その後のすべてのプロトコル変更が安全であると認証されるわけでもありません。再帰的proofは、proofシステムの前提条件の下で、それらの回路にエンコードされた計算を保証します。正しい回路と実装は依然として重要です。ECCの[Halo 2デプロイメント解説](https://zodl.com/technical-explainer-halo-on-zcash/)では、新しいバグや設計上の欠陥のリスクが明示的に指摘されています。

[Sean BoweのDystopia Labsによる解説](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## 視覚的説明 / たとえ話

### 公証人のチェーン

通常のzk-SNARKを、公証済みの文書として考えてください。スタンプが1つ、検証が1回で完了します。では、1万件の文書の束が本物であることを証明する必要があると想像してください。再帰がなければ、検証者は全てのスタンプを確認しなければなりません。

Haloは、検証済みの各文書を*次の*文書へのスタンプに変え、文書の束全体が1つのスタンプを持つ単一の文書に集約されるまで続けます。最後の文書を確認するだけで、チェーン全体を信頼するのに十分です。さらに重要なことに、Haloの公証人（証明システム）は、外部の権威が印章を設定する必要なく、自らスタンプを作成します。

### トラステッドセットアップをなくすことが重要な理由

古いトラステッドセットアップ（trusted setup）システムでは、公開の「印章（seal）」（CRS）はセレモニーから生じました。参加者は、公開パラメーターを利用可能な状態に保ちながら、秘密の中間素材を破棄しなければなりませんでした。Haloは、そのセレモニーと秘密のセットアップ用トラップドアを回避します。これは、ユーザーの支出鍵を保護する必要性や、proofシステムの前提条件と実装を確認する必要性をなくすものではありません。

---

## 詳細解説

### 再帰的proof

再帰的proofの合成により、単一のproofが実質的に無制限の他のproofの正しさを証明でき、大量の計算と情報を圧縮します。これはスケーラビリティに不可欠な要素です。ネットワークを水平にスケーリングしながら、参加者の一部がネットワークの残りの完全性を信頼できるようになるためです。

Halo以前は、再帰的proofの合成を実現するには、大きな計算コストとトラステッドセットアップが必要でした。主な発見の1つは、**ネストされた償却**と呼ばれる技術です。これは内積引数に基づく多項式コミットメントスキームを使用した再帰的合成であり、トラステッドセットアップを避けつつ性能を大幅に改善します。

[Halo論文](https://eprint.iacr.org/2019/1021.pdf)では、この多項式コミットメントスキームを完全に説明し、その中に新たな集約技術が存在することを発見しました。この技術により、独立して作成された多数のproofを、単一のproofを検証する場合とほぼ同じ速度で検証できます。それだけでも、Zcashで使用されていた従来のzk-SNARKsより優れた代替手段を提供しました。

### Halo 2

Halo 2は、Rustで記述された高性能なzk-SNARK実装であり、トラステッドセットアップの必要性をなくすとともに、Zcashにおけるスケーラビリティの基盤を整えます。

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

これには、**蓄積スキーム**と呼ばれるアプローチの一般化が含まれます。この形式化により、ネストされた償却が実際にどのように機能するかが明らかになります。各proofがアキュムレータの前の状態について推論する**アキュムレータ**と呼ばれるオブジェクトにproofを追加することで、現在のアキュムレータの状態を確認するだけで、全ての以前のproofを（帰納法により）確認できます。

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

これと並行して、多くのチームが、MarlinのようにSonic（Halo 1で使用）より効率的なPolynomial IOPを発見していました。これらのプロトコルの中で最も効率的なのはPLONKであり、アプリケーション固有のニーズに基づく効率的な実装の設計に大きな柔軟性をもたらし、Sonicより5倍優れた証明者時間を提供します。

[PLONKの概要](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### より広いエコシステムにおけるHalo

Electric Coin Companyは、技術が各ネットワークでどのように使用できるかを含むHaloの研究開発を検討するため、Protocol Labs、Filecoin Foundation、およびEthereum Foundationと契約を締結しました。この契約は、エコシステム間およびWeb 3.0に向けて、より優れたスケーラビリティ、相互運用性、プライバシーを提供することを目指しています。

さらに、Halo 2は[MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme)のもとにあり、エコシステム内の誰もがこの証明システムを用いて構築できます。

**Filecoin。** デプロイ以降、halo2ライブラリはzkEVMなどのプロジェクトに採用されており、Filecoin Virtual Machine向けproofシステムへのHalo 2の統合の可能性もあります。Filecoinには多数のコストの高い時空間proofと複製proofが必要であり、Halo 2は空間使用量を圧縮し、ネットワークをより良くスケーリングするうえで重要です。[Filecoin FoundationによるZookoとの動画](https://www.youtube.com/watch?v=t4XOdagc9xw)。また、Filecoinのストレージ支払いをZECで行えるようになれば、Zcashのシールドされた送金にあるものと同じプライバシーをストレージ購入にも提供でき、Filecoinストレージ内のファイルの暗号化や、Zcashの暗号化されたメモにメディアを添付するモバイルクライアントのサポートも可能になります。[ECC × Filecoinブログ投稿](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum。** 効率的な検証可能遅延関数（VDF）のためのHalo 2proofが開発されています。VDFは多くの潜在的なユースケースを持つ暗号プリミティブであり、スマートコントラクト向けの汎用乱数やProof of Stakeにおけるリーダー選出などに利用できます。ECC、Filecoin Foundation、Protocol Labs、Ethereum Foundationは、ハードウェアアクセラレーション暗号化を専門とするベンダーである[SupraNational](https://www.supranational.net/)とも協力し、VDFのGPUおよびASIC開発の可能性を探っています。[Privacy and Scaling Explorations group](https://appliedzkp.org/)は、Halo 2proofがEthereumのプライバシーとスケーラビリティを改善できる追加の方法を研究しています。

### Haloを使用するその他のプロジェクト

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — プライバシーを保護するマルチチェーン原子的スワッププロトコル
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — Cardano上のL2 zkRollup
- [DarkFi](https://dark.fi/book/arch/arch.html) — プライベートなL1 zkEVMブロックチェーン
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — Ethereum上のL2 zkRollup

---

## 実践的な影響

**Zcash自体について**

- NU5で有効化されたOrchardシールドされたプールは、Zcashネットワーク上におけるこの新しいproofシステムの実装です。これは、SproutとSaplingの間で使用されたものと同じターンスタイル設計によって保護されており、古いシールドされたプールを段階的に廃止することを意図しています。
- NU5（2022年半ば）に続き、再帰的proofの統合が可能になり、それに伴って複数のプライバシー強化が実現しました。特に、入力/出力に代わる「Actions」の導入により、トランザクションメタデータの量が削減されました。
- トラステッドセットアップをなくすことで、主要なプロトコルアップグレードのたびに繰り返す必要があるシステム上のリスクを排除します。

**保有者と運用者について**

- 再帰的proofの合成には、無制限の計算を圧縮し、監査可能な分散システムを作り、フルノード運用者のLayer 1容量を改善する可能性があります。これは、Zcash Shielded Assetsのような拡張や、Zcashの長期的な設計に関連します。

---

## よくある誤解

| よくある考え | 実際はどうか |
| --- | --- |
| 「Haloは、Zcashが待っている将来のアップグレードです。」 | NU5（2022年）からメインネットで稼働しているOrchardは、すでにHalo 2上で動作しています。 |
| 「トラステッドセットアップがないとは、パラメータが一切ないことです。」 | Haloは依然として公開パラメータを使用します。参加者が秘密のセットアップ素材を破棄したと信頼されなければならないセレモニーは必要ありません。 |
| 「Halo 2とHalo論文は同じものです。」 | [論文](https://eprint.iacr.org/2019/1021.pdf)は多項式コミットメントスキームとネストされた償却を説明しています。Halo 2は、蓄積スキームとPLONKish算術化を備えたプロダクションRust実装です。 |
| 「再帰はブロック検証のスケーリングにしか役立ちません。」 | 再帰はアプリケーションレベルの計算も圧縮します。Filecoinの時空間/複製proofやEthereum向けVDFの取り組みを参照してください。 |

---

## 関連ページ

- [zk-SNARKs](/zcash-tech/zk-snarks) — Haloが属する一般的な技術カテゴリ
- [Halo（研究論文）](https://eprint.iacr.org/2019/1021.pdf) — 原著論文
- [Ironwood](/zcash-tech/ironwood)および[The Turnstile](/zcash-tech/the-turnstile) — 古いシールドされたプールを廃止しながらシールドされたプールを移行する方法
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — 再帰的proofの恩恵を受ける拡張機能
- [Zebra Full Node](/zcash-tech/zebra-full-node) — チェーン上でproofを検証するノード実装

## さらに学ぶ

- [ZKPとHalo 2の紹介 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 with Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [技術解説ブログ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**ドキュメント**

- [Halo 2リソース](https://github.com/mhchia/awesome-halo2)
- [Halo 2ドキュメント](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
