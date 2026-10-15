[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada Logo](/content-images/logo-2067e2533d.webp)


## Namadaとは？

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcashの解説：Namada-Zcash 戦略的提携"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocolは、チェーン間のアセット非依存型プライバシーを提供するために設計された、proof-of-stakeコンセンサスに基づくレイヤー1プラットフォームです。Inter-Blockchain Communication（IBC）プロトコルを通じて、Namadaは即時ファイナリティを備えたチェーンとシームレスに統合され、円滑な相互運用性を実現します。さらに、NamadaはEthereumとのトラストレスな双方向ブリッジを確立し、両ネットワーク間の安全で信頼性の高い通信を促進します。

Namadaは、Multi-Asset Shielded Pool（MASP）回路の強化版を実装することで、プライバシーを重視しています。このアップグレード版により、代替可能トークンと非代替性トークンの両方を含むあらゆる種類の資産が、Zcashとまったく同様に共通のシールドセットを利用できます。その結果、Namada上で対応資産を送金する行為は、高いプライバシーが伴うため識別が困難になります。また、Multi Asset Shielded Pool回路の最新アップデートにより、シールドセット報酬が可能になりました。これは、公共財としてのプライバシーを促進するためにリソースを配分する画期的な機能またはインセンティブです。

## Ethereumブリッジ + IBC互換

EthereumブリッジをNamadaへ統合することで、独立したプロトコルは不要となり、Namadaエコシステムに不可欠な要素となります。Namada内のバリデーターは、中核となるNamadaプロトコルと並行してブリッジを運用する役割を担います。これらのバリデーターは、資産をNamadaへ移転する際のリレイヤーも務めるため、追加の主体を関与させる必要はありません。一方、Ethereumへ資産を移転する際には、外部の当事者（リレイヤーと呼ばれる）が関与しますが、ブリッジの検証または保護について責任を負うことはありません。

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

Namada Protocolは、Inter-Blockchain Communication（IBC）プロトコルをサポートするあらゆる即時ファイナリティチェーンにもシームレスに接続できます。Ethereumとの相互運用に関しては、Namadaはトラストレスに動作する、専用かつ安全なEthereumブリッジを実装しています。このブリッジは、すべてのブリッジ接続にフロー制御を適用し、Ethereumでの不正な送金をスラッシングペナルティの対象となり得る重大な違反として扱うことで、安全性を最優先に慎重に設計されています。

## シールドセット報酬

[Namada Protocol](https://namada.net/blog/what-is-namada)の最新アップデートでは、シールド資産を保有するユーザーに対し、共通のシールドセットへ積極的に参加するインセンティブが提供されます。これは、革新的なConvert Circuitを新たに含む、更新版MASP回路の統合によって可能になります。この新機能を活用し、Namadaはシールド資産の保有を通じて、ユーザーが共通のシールドセットへ貢献することを促します。

Namadaでは、シールドセットは非排他的かつ非競合的な公共財と見なされています。これは、より多くの人々がシールド送金を利用するほど、各参加者に対するプライバシー保証の水準が向上することを意味します。このプロトコルは、すべてのユーザーのプライバシーを強化するうえで、集団的な採用と参加が重要であることを認識しています。そのため、シールド資産の保有および共通のシールドセットへの貢献に対してユーザーへインセンティブを与えることで、Namadaはより強力で堅牢なプライバシーエコシステムを育成します。

## シールド資産取引

シールド送金では、Ethereumの非代替性トークン（NFT）、ATOM、NAMのいずれを扱う場合でも、それらは互いに区別できません。つまり、MASP（Modified Accumulator Sapling Protocol）によって提供されるプライバシー保護機能、すなわちZcash Sapling回路の強化版は、すべての種類の資産に一様に適用されます。MASP回路により、Namadaエコシステム内のすべての資産は同一のシールドセットを共有できます。このアプローチにより、プライバシー保証が個々の資産ごとに分断されることはありません。特定の資産に関連する取引量にかかわらず、プライバシー保護は一貫しており、独立しています。

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

異なる資産間でシールドセットを統合することにより、Namadaは、シールド送金に関与する具体的な資産タイプにかかわらず、プライバシーが一様に維持されることを保証します。このアプローチは、プロトコル内で一貫性のあるプライバシーフレームワークを促進し、Ethereum NFT、ATOM、NAM、その他の対応資産に関する取引の機密性を高めます。Namadaはまた、新しいzk-SNARKsを使用して代替可能トークンおよび非代替性トークンのプライベート送金を可能にし、Zcashで行われるのと同様に、ネイティブおよび非ネイティブトークンの機密性を確保します。

## 低手数料と高速取引

Namadaは、高速な取引速度とファイナリティを実現するために、proof生成の高速化と最新のByzantine Fault Tolerant（BFT）コンセンサスという2つの主要要素を組み合わせています。これら2つの機能により、Namadaは、高いスループット能力で知られる決済ネットワークVisaに匹敵する取引処理速度を実現します。高速なproof生成とは、Blockchain上の取引の正確性と完全性を検証する暗号学的proofを効率的に生成することを指します。高度な技術と最適化を採用することで、Namada Protocolはこれらのproofの生成に必要な計算オーバーヘッドを最小限に抑え、迅速な取引の検証と確定を実現します。

さらに、Namadaは最新のBFTコンセンサスアルゴリズムを活用し、ネットワーク全体で取引の完全性と合意を保証します。これらのコンセンサスメカニズムにより、Namadaは取引の順序と有効性について合意に達し、強力なファイナリティ保証を提供できます。ファイナリティにより、取引は取り消し不能と見なされ、二重支払いや取引のロールバックのリスクが軽減されます。Namadaは、スケーラビリティソリューションで知られる別のプロトコル、Anomaと類似したアプローチを採用しています。Namadaはフラクタルインスタンスを採用しており、メインブロックチェーン内にネストされたチェーンを作成できます。このフラクタル構造は、負荷を複数のインスタンスに分散することで水平スケーリングを可能にし、ネットワーク全体の容量とパフォーマンスを向上させます。

## NamadaとZcashの戦略的提携

[Namada Protocol Blog](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash)で確認できる最近の発表によると、Namada Protocolのチームは、NamadaおよびZcashの資産、チェーン、コミュニティ間における戦略的提携についての提案およびコメント募集（RFC）を提示できることを嬉しく思います。

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

提案された提携は、3つの主要な要素で構成されています。第一に、ZcashとNamadaの双方に利益をもたらすプロジェクトへ資金を提供するための助成金プールが設立されます。第二に、NAMトークンのエアドロップがZEC保有者に割り当てられます。最後に、ZcashとNamadaを接続する、信頼を最小化したブリッジを確立する計画があります。このブリッジが実装されると、Zoldersと呼ばれるZEC保有者は、Namada上で自身のZECを利用できるようになります。さらに、ZoldersはNamadaを通じて、より広範なCosmosおよびEthereumのエコシステムにアクセスする機会を得ます。戦略的提携については、[Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)で詳しく確認できます。

## 参照リンク

- [Namada Protocol公式動画](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada Protocol公式ウェブサイト](https://namada.net/)
- [Namada Blog](https://namada.net/blog)
- [Namada Docs](https://docs.namada.net/)
