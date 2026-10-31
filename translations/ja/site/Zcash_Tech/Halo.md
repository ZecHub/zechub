<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Haloは、Electric Coin CoのSean Boweによって発見された、トラストレスかつ再帰的なゼロ知識証明（ZKP）システムです。信頼できるセットアップを不要にし、再帰的な証明合成を実用化することで、Zcashの現在のスケーラビリティおよびセキュリティ・ロードマップの基盤となっています。

- **概要：** 効率的な再帰性を持ち、信頼できるセットアップ儀式を必要としないzk-SNARK構成です。
- **重要な理由：** 2022年にNU5とともに有効化されたZcashのOrchardシールドプールは、この研究の本番実装であるHalo 2上で動作しています。
- **主な特性：** セットアップ儀式による「toxic waste」がなく、実質的に無制限の他の証明を保証できる証明を実現します。
- **ライセンス：** Halo 2は[MITおよびApache 2.0](https://github.com/zcash/halo2#readme)のもとでオープンソースとして提供されているため、エコシステム内の誰もがこれを基盤に構築できます。

---

## 基本解説

Haloは、Electric Coin CoのSean Boweによって発見された、トラストレスかつ再帰的なゼロ知識証明システムです。信頼できるセットアップを排除し、Zcashブロックチェーンのスケーラビリティを向上させます。Haloは、効率的かつ再帰的である初のゼロ知識証明システムであり、科学的ブレークスルーとして広く認められています。

![halo](/content-images/_unavailable.svg "halo")

### 2つの構成要素

- **簡潔な多項式コミットメント方式。** コミッターが短い文字列で多項式にコミットでき、検証者はその文字列を使って、コミット済み多項式の評価値に関する主張を確認できます。
- **多項式対話型オラクル証明。** 検証者は、アルゴリズムである証明者に対して、多項式コミットメント方式を用いて任意に選んだ点で全コミットメントを開示するよう求め、それらの間で恒等式が成り立つことを確認します。

### 信頼できるセットアップが不要

zk-SNARKsは、証明と検証のための公開パラメータとして共通参照文字列（CRS）に依存しています。このCRSは、信頼できる主体によって事前に生成されなければなりません。最近まで、この[信頼できるセットアップ儀式](https://zkproof.org/2021/06/30/setup-ceremonies/amp/)の際に伴うリスクを軽減するには、AztecネットワークやZcashが実施したような、複雑で安全なマルチパーティ計算（MPC）が必要でした。

Zcashの初期のSproutおよびSaplingシールドプールでは、BCTV14とGroth16のzk証明システムが使用されていました。これらは安全でしたが、単一のアプリケーションに結び付いていたためスケーラブルではなく、「toxic waste」（ジェネシス儀式中に生成された暗号素材の残存物）が残る可能性があり、儀式を許容可能と判断する際には、わずかではあるものの信頼の要素がありました。

Haloは、楕円曲線のサイクル上で困難な問題の複数のインスタンスを繰り返し集約することにより、信頼できるセットアップを排除します。これにより、計算証明を用いてそれ自体について効率的に推論できます（ネストされた償却）。副次的な効果として、構造化参照文字列（儀式の出力）がアップグレード可能となり、スマートコントラクトのようなアプリケーションを可能にします。

Haloは、大規模ゼロ知識証明システムのセキュリティについて、ユーザーに2つの重要な保証を提供します。第一に、ジェネシス儀式に関与した誰もが不正取引を実行するための秘密のバックドアを作成していないことを、ユーザーが証明できます。第二に、アップデートや変更を受けてきたとしても、システムが長期にわたって安全であり続けたことをユーザーが示せます。

[Sean BoweによるDystopia Labsでの解説](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## 視覚的な説明 / たとえ話

### 公証人の連鎖

通常のzk-SNARKを、公証済みの文書だと考えてください。スタンプは1つ、検証は1回、それで完了です。では、1万件の文書の束が本物であることを証明する必要があると想像してください。再帰性がなければ、検証者はすべてのスタンプを確認しなければなりません。

Haloは、検証済みの各文書を*次の*文書のスタンプに変え、文書全体の束が単一のスタンプ付き文書に集約されるまで続けます。最後の文書を確認するだけで連鎖全体を信頼できます。そして重要なのは、Haloの公証人、すなわち証明システムが、外部の権威に印章を設定してもらう必要なく、自らスタンプを作り出すことです。

### 信頼できるセットアップを排除する重要性

従来のシステムでは、「印章」（CRS）は儀式によって作られていました。参加者は中間素材を破棄しなければならず、全員が実際にそうしたと信頼する必要がありました。Haloの印章は数学だけによって作られます。破棄すべきものも、漏洩するものも、信頼すべき儀式もありません。

---

## 詳細解説

### 再帰的証明

再帰的証明合成では、単一の証明が実質的に無制限の他の証明の正しさを保証でき、大量の計算と情報を圧縮できます。これはスケーラビリティに不可欠な要素です。ネットワークを水平方向に拡張しつつ、参加者の一部がネットワークの残りの部分の完全性を信頼できるようになるためです。

Halo以前は、再帰的証明合成を実現するには大きな計算コストと信頼できるセットアップが必要でした。主な発見の1つは、**ネストされた償却**と呼ばれる技法です。これは、内積議論に基づく多項式コミットメント方式を利用した再帰的合成であり、信頼できるセットアップを回避しながら性能を大幅に向上させます。

[Halo論文](https://eprint.iacr.org/2019/1021.pdf)では、この多項式コミットメント方式が完全に説明され、その中に新しい集約技法が存在することが発見されました。この技法により、独立して作成された多数の証明を、単一の証明を検証する場合とほぼ同じ速さで検証できます。それだけでも、Zcashで使用されていた従来のzk-SNARKsに代わる優れた選択肢となりました。

### Halo 2

Halo 2は、Rustで記述された高性能なzk-SNARK実装であり、信頼できるセットアップを不要にしつつ、Zcashにおけるスケーラビリティの基盤を整えます。

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

これには、**蓄積スキーム**と呼ばれるアプローチの一般化が含まれます。この形式化により、ネストされた償却が実際にどのように機能するかが明らかになります。各証明が**アキュムレータ**と呼ばれるオブジェクトの前の状態について推論する形で証明を追加することで、アキュムレータの現在の状態を確認するだけで、過去のすべての証明を帰納的に検証できます。

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

並行して、多くのチームが、Sonic（Halo 1で使用）より効率的なPolynomial IOP（Marlinなど）を発見していました。これらのプロトコルのうち最も効率的なのがPLONKであり、アプリケーション固有のニーズに応じて効率的な実装を設計する大きな柔軟性を提供し、Sonicより5倍優れた証明者時間を実現します。

[PLONKの概要](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### より広いエコシステムにおけるHalo

Electric Coin Companyは、各ネットワークでこの技術をどのように利用できるかを含むHaloの研究開発を探るため、Protocol Labs、Filecoin Foundation、およびEthereum Foundationと契約を締結しました。この契約は、エコシステム間およびWeb 3.0における、より優れたスケーラビリティ、相互運用性、プライバシーの実現を目指しています。

加えて、Halo 2は[MITおよびApache 2.0のオープンソースライセンス](https://github.com/zcash/halo2#readme)のもとで提供されているため、エコシステム内の誰もがこの証明システムを使って構築できます。

**Filecoin。** デプロイ以降、halo2ライブラリはzkEVMのようなプロジェクトで採用されており、Filecoin Virtual Machineの証明システムへのHalo 2の統合も見込まれています。Filecoinには、多数の高コストな時空間証明と複製証明が必要です。Halo 2は、領域使用量を圧縮し、ネットワークをより適切にスケールさせるうえで重要です。[Filecoin FoundationによるZookoとの動画](https://www.youtube.com/watch?v=t4XOdagc9xw)。また、Filecoinのストレージ料金をZECで支払えるようになれば、Zcashのシールド送金にあるのと同じプライバシーがストレージ購入にももたらされ、両エコシステムに利益があります。これには、Filecoinストレージ内のファイル暗号化や、Zcashの暗号化メモにメディアを添付するモバイルクライアントのサポートも含まれます。[ECC × Filecoinブログ記事](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum。** 効率的な検証可能遅延関数（VDF）のためのHalo 2証明が開発されています。VDFは、スマートコントラクト向けの汎用乱数やProof of Stakeにおけるリーダー選出など、多くの潜在的な用途を持つ暗号プリミティブです。ECC、Filecoin Foundation、Protocol Labs、およびEthereum Foundationは、GPUおよびASICによるVDF開発の可能性に向け、ハードウェアアクセラレーション暗号を専門とするベンダーである[SupraNational](https://www.supranational.net/)とも協力しています。[Privacy and Scaling Explorationsグループ](https://appliedzkp.org/)は、Halo 2証明がEthereumのプライバシーとスケーラビリティを向上させる追加の方法を研究しています。

### Haloを使用するその他のプロジェクト

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — プライバシーを保護するマルチチェーン原子的スワッププロトコル
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — Cardano上のL2 zkRollup
- [DarkFi](https://dark.fi/book/arch/arch.html) — プライベートなL1 zkEVMブロックチェーン
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — Ethereum上のL2 zkRollup

---

## 実用上の影響

**Zcashそのものについて**

- NU5とともに有効化されたOrchardシールドプールは、Zcashネットワークにおけるこの新しい証明システムの実装です。SproutとSaplingの間で使用されたものと同じターンスタイル設計によって保護されており、古いシールドプールを段階的に廃止することを意図しています。
- NU5（2022年半ば）以降、再帰的証明の統合が可能となり、複数のプライバシー強化が導入されました。特に、inputs/outputsに代わる「Actions」の導入により、取引メタデータの量が削減されました。
- 信頼できるセットアップを排除することで、本来なら主要なプロトコルアップグレードごとに繰り返す必要があるシステミックリスクをなくせます。

**保有者と運用者について**

- 再帰的証明合成には、無制限の計算を圧縮し、監査可能な分散システムを構築し、フルノード運用者向けのLayer 1容量を向上させる可能性があります。これはZcash Shielded Assetsのような拡張機能や、Zcashの長期的な設計にも関係します。

---

## よくある誤解

| よくある考え | 実際には |
| --- | --- |
| 「Haloは、Zcashが待っている将来のアップグレードだ。」 | NU5（2022年）以降メインネットで稼働しているOrchardは、すでにHalo 2上で動作しています。 |
| 「信頼できるセットアップがないなら、パラメータは一切ない。」 | Haloは依然として構造化パラメータを使用します。違いは、それらにtoxic wasteが含まれず、参加者が信頼しなければならない儀式なしに生成・アップグレードできる点です。 |
| 「Halo 2とHalo論文は同じものだ。」 | [論文](https://eprint.iacr.org/2019/1021.pdf)では、多項式コミットメント方式とネストされた償却を説明しています。Halo 2は、蓄積スキームとPLONKish算術化を備えた本番用のRust実装です。 |
| 「再帰性はブロック検証のスケーリングにしか役立たない。」 | 再帰性はアプリケーションレベルの計算も圧縮します。Filecoinの時空間証明・複製証明、およびEthereum向けVDFの取り組みを参照してください。 |

---

## 関連ページ

- [zk-SNARKs](/zcash-tech/zk-snarks) — Haloが属する一般的な技術カテゴリー
- [Halo（研究論文）](https://eprint.iacr.org/2019/1021.pdf) — 原著論文
- [Ironwood](/zcash-tech/ironwood)および[The Turnstile](/zcash-tech/the-turnstile) — 古いシールドプールを廃止しながらシールドプールを移行する仕組み
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — 再帰的証明の恩恵を受ける拡張機能
- [Zebra Full Node](/zcash-tech/zebra-full-node) — チェーン上の証明を検証するノード実装

## さらに学ぶ

- [ZKPとHalo 2の紹介 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 with Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [技術解説ブログ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**ドキュメント**

- [Halo 2リソース](https://github.com/mhchia/awesome-halo2)
- [Halo 2ドキュメント](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
