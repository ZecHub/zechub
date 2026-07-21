[![ページを編集](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada プロトコル

![Namada ロゴ](https://i.ibb.co/BZcZHS1/logo.png)


## Namada とは？

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explained: Namada-Zcash Strategic Alliance"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada プロトコルは、ステーキングによるコンセンサスに基づくレイヤー1プラットフォームであり、IBC（Inter-Blockchain Communication）プロトコルを通じてファストフィナリティチェーンとシームレスに統合し、滑らかな相互運用性を実現するように設計されています。また、Ethereumとの信頼のない二方向ブリッジを確立し、2つのネットワーク間での安全で信頼できる通信を可能にしています。

Namada は、Multi-Asset Shielded Pool (MASP) 回路の強化されたバージョンを実装することでプライバシーを重視しています。このアップグレードにより、NFT（非代替性トークン）を含むすべての資産がZcashと同様の共有されたシールドセットを使用できるようになり、Namada 上でのサポート資産の転送は高いプライバシーによって識別が困難になるため、明確に区別されるようになりました。また、Multi Asset Shielded Pool 回路の最新アップデートにより、シールドセット報酬という、プライバシーを公共財として促進する画期的な特徴やインセンティブが導入されました。

## Ethereum ブリッジ + IBC 互換性

EthereumブリッジのNamadaへの統合により、別途プロトコルが必要になることはなく、Namadaエコシステムの一部として組み込まれています。Namada内のバリデーターは、コアのNamadaプロトコルとともにブリッジを運営する責任があります。また、資産をNamadaに転送する際には、これらのバリデーターがリレイヤーとしても機能し、追加のアクターの関与を必要としません。一方で、Ethereumへの資産移動では外部の当事者（リレイヤー）が関与しますが、彼らはブリッジの検証やセキュリティ確保に関する責任を持たない点に注意が必要です。

![Ethereum ブリッジ図](https://i.ibb.co/wKds5RP/image.jpg)

Namadaプロトコルは、IBC（Inter-Blockchain Communication）プロトコルをサポートするすべてのファストフィナリティチェーンとシームレスに接続できる能力を持っています。Ethereumとの相互運用においては、信頼のない方法で動作する専用かつ安全なEthereumブリッジが実装されています。このブリッジは、すべてのブリッジ接続に対してフロー制御を強制し、故障したEthereum転送を重大な違反として処罰（スラッシング）する可能性があるように設計されており、安全性を最優先にしています。

## シールドセット報酬

[Namadaプロトコル](https://blog.namada.net/what-is-namada/)の最新アップデートでは、シールド資産を持つユーザーが共有されたシールドセットへの積極的な参加をインセンティブ化しています。これは、更新されたMASP回路の統合により実現されており、この回路には革新的なConvert回路が新たに組み込まれています。この新機能により、Namadaはユーザーがシールド資産を保持し、共有されたシールドセットへの貢献を促進するよう奨励しています。

Namadaでは、シールドセットは非排他的で反競争的な公共財と見なされています。これは、より多くの個人がシールド転送を利用することで、各参加者のプライバシー保証が向上することを意味します。プロトコルは、集団の採用と参加がすべてのユーザーにとってのプライバシー向上に重要であることを認識しており、シールド資産の保持および共有されたシールドセットへの貢献をインセンティブ化することで、より強固で健全なプライバシー生態系を育成しています。

## シールド資産取引

シールド転送に関しては、Ethereum NFT（非代替性トークン）、ATOM、NAMなどどの資産であっても区別がつかなくなります。これは、Zcash Sapling回路の強化バージョンであるMASP（Modified Accumulator Sapling Protocol）によって提供されるプライバシー保護機能がすべての資産タイプに均等に適用されることを意味します。MASP回路により、Namadaエコシステム内のすべての資産が同じシールドセットを共有できるようになります。このアプローチは、個々の資産間でプライバシー保証が断片化されないことを確実にします。特定の資産に関連する取引量に関係なく、プライバシー保護は一貫して独立しています。

![シールド資産取引図](https://i.ibb.co/7CDmWk6/image-1.png)

さまざまな資産にわたるシールドセットを統一することで、Namadaはどの特定の資産タイプがシールド転送に関与しているかに関係なくプライバシーを均等に維持します。このアプローチにより、プロトコル内での包括的なプライバシー枠組みが促進され、Ethereum NFT、ATOM、NAM、その他のサポート資産に関する取引の機密性が向上します。Namadaはまた、Zcashで行われるのと同様に、ネイティブおよび非ネイティブトークンの機密性を保証する新しいzk-SNARKsを使用して、代替可能および非代替可能なトークンのプライベート転送を可能にしています。

## 費用が少なく高速な取引

Namadaは、2つの主要要素を組み合わせることで、高速な取引速度と最終性を実現します。それは、高速証明生成と現代的な Byzantine Fault Tolerant（BFT）コンセンサスです。これらの特徴により、NamadaはVisaという高トラフィック能力が知られている支払いネットワークと同等のトランザクション処理速度を達成できます。

高速証明生成とは、ブロックチェーン上の取引の正しさおよび整合性を検証するための暗号学的証明を効率的に生成することを指します。高度な技術と最適化により、Namadaプロトコルはこれらの証明を生成するために必要な計算オーバーヘッドを最小限に抑え、取引の迅速な検証および確認を実現しています。

さらに、Namadaは現代的なBFTコンセンサスアルゴリズムを使用しており、ネットワーク全体におけるトランザクションの整合性と合意を保証します。これらのコンセンサスメカニズムにより、Namadaはトランザクションの順序および有効性に関するコンセンサスに達し、最終性という強い保証を提供できます。最終性とは、取引が不可逆であることを意味し、二重支払いや取引ロールバックのリスクを低減します。

Namadaは、スケーラビリティソリューションで知られているAnomaプロトコルと同様のアプローチを採用しています。Namadaでは、フラクタルインスタンスが導入されており、これによりメインブロックチェーン内にネストされたチェーンを作成することが可能になります。このフラクタル構造は、複数のインスタンスに負荷を分散させることで水平方向の拡張を実現し、ネットワーク全体の容量と性能を向上させます。

## Namada と Zcash の戦略的連携

[Namadaプロトコルブログ](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/)に掲載された最近の出版物によると、Namadaプロトコルのチームは、NamadaとZcashの資産、チェーン、コミュニティ間での戦略的連携に関する提案およびリクエスト・フォー・コメント（RFC）を提示し、興奮しています。

![Namada-Zcash 戦略的連携図](https://i.ibb.co/FqsmkMb/image-2.png)

この提案された連携は3つの主要な要素を含んでいます。まず、ZcashとNamada双方に利益をもたらすプロジェクトの資金提供のためにグランツプールが作成されます。次に、NAMトークンのエアドロップがZEC保有者に配布される予定です。最後に、ZcashとNamadaを接続する信頼最小化されたブリッジの設立計画があります。このブリッジが実装されると、ZEC保有者（Zolders）はそのZECをNamadaで利用できるようになります。さらに、ZoldersはNamadaを通じてCosmosおよびEthereumエコシステムにアクセスする機会を得ます。戦略的連携について詳しく知るには、[Zcash コミュニティフォーラム](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)をご覧ください。

## 参考リンク

- [Namadaプロトコル公式動画](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namadaプロトコル公式ウェブサイト](https://namada.net/)
- [Namadaブログ](https://blog.namada.net/)
- [Namadaドキュメント](https://docs.namada.net/)
