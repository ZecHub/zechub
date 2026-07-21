# ゼロからゼロ知識：信頼された実行環境（TEE）

**シリーズ:** ゼロからゼロ知識

「ゼロからゼロ知識」が新テーマで戻ってきました！  
今回は **信頼された実行環境（Trusted Execution Environments、TEE）** について掘り下げます。TEEはプライバシー硬貨やその他のブロックチェーンアプリケーションでどのように使用されているかを説明します。

![信頼された実行環境の紹介](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEとブロックチェーン：補完的な特性

ブロックチェーンとTEEは非常に補完的な強みを持っています：

- **ブロックチェーン** は可用性、状態の永続性を保証し、全体の状態の公開検証が可能ですが、計算能力に限界があります。  
- **TEE** は暗号化された入力、出力、状態に対して強力な計算処理を行うことが可能ですが、ネイティブな状態永続性を欠いています。

これらは一緒に強力なプライバシー保護システムを作り出すことができます。

---

## Secret Network：TEEによるプライバシー

**Secret Network** はTEE技術（特にIntel SGX）を利用して、暗号化された入力、出力、状態に対して計算を行います。

すべてのバリデータノードがIntel SGXチップを実行しています。コンセンサス層と計算層は統合されています：

- トランザクションはセキュアなエンクローズ内（secure enclave）で処理されます。  
- データは **TEE内でしか** 複号化されません。

これはZcashのプライバシー実現方法とは異なります。Zcashでは、**ゼロ知識証明** を使用してプライバシーを確保しています。Zcashでは、シールドされたトランザクションがネットワークに公開され、追加データはネットワークに明らかにされることなく検証されます。Zcashのシールド資産も同様の原則に従います。

![Secret Network TEE図](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Secret NetworkにおけるTEEの実装方法について詳しく知りたい場合は、@l_woetzelによるこの優れた記事を参照してください：  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Networkが鍵と状態をどのように保護しているか

- ネットワークの **コンセンサス暗号シード** は各バリデータのTEE内に保存されています。  
- コントラクトは、偽造不可能な暗号化鍵を使用します。  
- SecretコントラクトはCosmos SDKの計算モジュール上で実行されますが、暗号化された入力/出力と状態をサポートしています。

---

## リモート認証（Remote Attestation）

**リモート認証** とは、エンクローズが本物のセキュアハードウェア環境で動作していることを証明するプロセスです。

これにより、リモート側は以下を確認できます：
- 正しいアプリケーションが実行されている  
- アプリケーションに改ざんされていない  
- Intel SGXエンクローズ内で安全に実行されている

![リモート認証の説明](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

エンクローズ内には、外部からアクセスできないプライベートな署名と認証鍵も含まれています。

![エンクローズの鍵保護](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## データシーリング（Data Sealing）

エンクローズは状態を持たないため、データを信頼できないメモリに外部に保存する必要がある場合があります。

**データシーリング** では、CPUから導出された鍵を使用して、エンクローズ内でデータが暗号化されます。この暗号化ブロックは **同じシステム** でのみ復号可能です。

![データシーリング図](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** も、その機密性のあるParaTime（例：SapphireおよびCipher）を通じてTEEを使用しています。

暗号化されたデータはスマートコントラクトとともにTEEに送信され、エンクローズ内で復号され、処理され、再度暗号化されてからエンクローズを出ます。

![Oasis Network TEEフロー](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## Proof-of-StakeネットワークにおけるTEE

多くのProof-of-Stakeブロックチェーン（SecretおよびOasisを含む）は、**Tendermint** をコンセンサスフレームワークとして使用しています。

PoSバリデータについて：
- 鍵は常にセキュアに管理され、平文で暴露されることがありません。  
- バリデータはオンラインでいなければなりません（ダウンタイムにはペナルティが適用されます）。  
- 矛盾したメッセージの署名はスラッシングにつながります。

**TEE** はバリデータ鍵を安全に生成および使用するために理想的です。

![Tendermint & PoSセキュリティ](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## ZcashとProof-of-Stake研究

Zcashは現在、Proof-of-Stakeへの移行について積極的に研究しています。

- 研究内容はこちら：https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Zcash Foundationコミュニティコールから、さまざまなPoS設計とそのプライバシーへの影響について説明するセグメントを視聴してください：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**ZecHub（@ZecHub）によるオリジナルスレッド**  
https://x.com/ZecHub/status/1633579659282587651

---

*このページは、ZecHub Wikiのためにオリジナルの「ゼロからゼロ知識」スレッドから作成されました。*
