[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada Logo](/content-images/logo-2067e2533d.webp)


## Namadaとは？

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcashの解説：Namada-Zcash戦略的提携"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocolは、チェーン間で資産に依存しないプライバシーを提供するために設計された、プルーフ・オブ・ステークのコンセンサスに基づくレイヤー1プラットフォームです。Inter-Blockchain Communication（IBC）プロトコルを通じて、Namadaは高速ファイナリティを備えたチェーンとシームレスに統合され、円滑な相互運用性を実現します。さらに、NamadaはEthereumとのトラストレスな双方向ブリッジを構築し、2つのネットワーク間における安全で信頼性の高い通信を促進します。

Namadaは、Multi-Asset Shielded Pool（MASP）回路の強化版を実装することで、プライバシーを優先しています。このアップグレード版により、代替可能トークンと非代替可能トークンの両方を含むあらゆる種類の資産が、Zcashとまったく同じ共有シールドされたセットを利用できます。その結果、Namada上で対応資産を転送する行為は、高水準のプライバシーによって識別が困難となり、特徴的なものになります。また、Multi Asset Shielded Pool回路の最新アップデートでは、シールドされたセット報酬が可能になりました。これは、公共財としてのプライバシーを促進するためにリソースを配分する画期的な機能またはインセンティブです。

## Ethereumブリッジ + IBC互換

EthereumブリッジをNamadaへ統合することで、別個のプロトコルは不要となり、Namadaエコシステムの不可欠な一部となります。Namada内のバリデーターは、中核となるNamadaプロトコルとともにブリッジを運用する責任を担います。これらのバリデーターは、資産をNamadaへ転送する際のリレイヤーとしても機能するため、追加のアクターの関与は不要です。一方、資産をEthereumへ転送する場合には、外部の関係者（リレイヤーと呼ばれます）が関与しますが、ブリッジの検証や保護に関する責任は負いません。

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

Namada Protocolは、Inter-Blockchain Communication（IBC）プロトコルをサポートするあらゆる高速ファイナリティ・チェーンにシームレスに接続することもできます。Ethereumとの相互運用に関しては、Namadaはトラストレスに動作する専用かつ安全なEthereumブリッジを実装しています。このブリッジは、すべてのブリッジ接続にフロー制御を適用し、不正なEthereum転送をスラッシングの罰則につながり得る重大な違反として扱うことで、安全性を優先するよう慎重に設計されています。

## シールドされたセット報酬

最新の[Namada Protocol](https://namada.net/blog/what-is-namada)アップデートでは、シールドされた資産を保有するユーザーは、共有シールドされたセットに積極的に参加するようインセンティブを与えられます。これは、革新的なConvert Circuitを含むようになった更新済みのMASP回路の統合によって可能になります。この新機能を活用し、Namadaはシールドされた資産を保有することで、共有シールドされたセットへ貢献するようユーザーを促します。

Namadaでは、シールドされたセットは非排他的かつ非競合的な公共財と見なされています。これは、より多くの人々がシールドされた転送を利用するほど、各参加者に対するプライバシー保証の水準が向上することを意味します。このプロトコルは、すべてのユーザーのプライバシーを強化するうえで、集団的な採用と参加が重要であることを認識しています。したがって、シールドされた資産を保有し、共有シールドされたセットに貢献するようユーザーにインセンティブを与えることで、Namadaはより強力で堅牢なプライバシー・エコシステムを育成します。

## シールドされた資産のトランザクション

シールドされた転送に関しては、Ethereumの非代替可能トークン（NFT）、ATOM、またはNAMのいずれを含む場合でも、それらは互いに区別できません。これは、MASP（Modified Accumulator Sapling Protocol）によって提供されるプライバシー保護機能が、Zcash Sapling回路の強化版として、すべての種類の資産に一律に適用されることを意味します。MASP回路により、Namadaエコシステム内のすべての資産は同じシールドされたセットを共有できます。このアプローチにより、プライバシー保証が個々の資産ごとに分断されることはありません。特定の資産に関連するトランザクション量にかかわらず、プライバシー保護は一貫しており、独立しています。

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

異なる資産間でシールドされたセットを統合することで、Namadaは、シールドされた転送に関わる特定の資産タイプにかかわらず、プライバシーが一律に維持されることを保証します。このアプローチはプロトコル内の一貫したプライバシー枠組みを促進し、Ethereum NFT、ATOM、NAM、およびその他の対応資産を含むトランザクションの機密性を高めます。Namadaはまた、新しいzk-SNARKsを使用して代替可能トークンと非代替可能トークンのプライベート転送を可能にし、Zcashで行われるのと同様に、ネイティブおよび非ネイティブ・トークンの機密性を保証します。

## 低い手数料と高速トランザクション

Namadaは、高速なトランザクション速度とファイナリティを実現するために、高速なプルーフ生成と現代的なビザンチン障害耐性（BFT）コンセンサスという2つの重要な要素を組み合わせています。これら2つの機能により、Namadaは、高いスループット能力で知られる著名な支払いネットワークであるVisaに匹敵するトランザクション処理速度を達成できます。高速プルーフ生成とは、ブロックチェーン上のトランザクションの正確性と完全性を検証する暗号学的プルーフを効率的に生成することを指します。高度な技術と最適化を採用することで、Namada Protocolはこれらのプルーフの生成に必要な計算オーバーヘッドを最小限に抑え、迅速なトランザクション検証と確認を実現します。

さらに、Namadaは、ネットワーク全体でトランザクションの完全性と合意を保証する現代的なBFTコンセンサス・アルゴリズムを利用します。これらのコンセンサス機構により、Namadaはトランザクションの順序と有効性についてコンセンサスに達し、ファイナリティの強力な保証を提供できます。ファイナリティにより、トランザクションは取り消せないものと見なされ、二重支払いやトランザクションのロールバックのリスクが低減します。Namadaは、スケーラビリティ・ソリューションで知られる別のプロトコルであるAnomaと類似のアプローチを採用しています。Namadaはフラクタル・インスタンスを採用しており、メイン・ブロックチェーン内にネストされたチェーンを作成できます。このフラクタル構造は、負荷を複数のインスタンスに分散することで水平スケーリングを可能にし、ネットワーク全体の容量とパフォーマンスを向上させます。

## NamadaとZcashの戦略的提携

[Namada Protocol Blog](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash)で確認できる最近の発表によると、Namada Protocolのチームは、NamadaとZcashの資産、チェーン、コミュニティ間における戦略的提携の提案およびコメント募集（RFC）を発表できることを喜ばしく思っています。

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

提案された提携は、3つの主要な要素で構成されています。まず、ZcashとNamadaの両方に利益をもたらすプロジェクトに資金を提供するため、助成金プールが創設されます。次に、NAMトークンのエアドロップがZEC保有者に割り当てられます。最後に、ZcashとNamadaを接続するトラスト最小化ブリッジを構築する計画があります。実装されると、このブリッジにより、Zoldersと呼ばれるZEC保有者は、Namada上で自身のZECを利用できるようになります。さらに、ZoldersはNamadaを通じて、より広範なCosmosおよびEthereumエコシステムへアクセスする機会を得ます。戦略的提携については、[Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)で詳しく確認できます。

## 参考リンク

- [Namada Protocol公式動画](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada Protocol公式ウェブサイト](https://namada.net/)
- [Namadaブログ](https://namada.net/blog)
- [Namadaドキュメント](https://docs.namada.net/)
