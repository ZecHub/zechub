# Zero to Zero Knowledge: 信頼実行環境（Trusted Execution Environments、TEEs）

**シリーズ：** Zero to Zero Knowledge

Zero to Zero Knowledge が新しいトピックとともに戻ってきました！  
今週は、**信頼実行環境（Trusted Execution Environments、TEEs）**について、プライバシーコインやその他のブロックチェーンアプリケーションでどのように使用されているかを探ります。

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEsとブロックチェーン：相補的な特性

ブロックチェーンとTEEsには、非常に相補的な強みがあります。

- **ブロックチェーン（Blockchains）**は、可用性、状態の永続性を保証し、状態全体の公開検証を可能にしますが、計算能力には限りがあります。  
- **TEEs**は、負荷の高い計算タスクをプライベートに実行できますが、ネイティブな状態の永続性を持ちません。

両者を組み合わせることで、強力なプライバシー保護システムを構築できます。

---

## Secret Network：TEEによるプライバシー

**Secret Network**は、TEE技術（具体的にはIntel SGX）を活用し、暗号化された入力、出力、状態に対する計算を実行します。

すべてのバリデータノードはIntel SGXチップを実行します。コンセンサス層と計算層は統合されています。

- トランザクションは安全なエンクレーブ内で処理されます。  
- データは**TEE内でのみ**復号されます。

これは、プライバシーのために**ゼロ知識プルーフ（zero-knowledge proofs）**を使用するZcashとは異なります。Zcashでは、シールドされたトランザクションがブロードキャストされ、ネットワークに追加データを公開することなく公に検証されます。Zcash Shielded Assetsも同じ原則に従います。

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Secret NetworkでTEEsがどのように実装されているかの詳しい説明については、@l_woetzelによるこの優れた記事をお読みください。  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Networkがキーと状態を保護する仕組み

- ネットワークの**コンセンサス暗号化シード**は、各バリデータのTEE内に保存されます。  
- コントラクトは一意で偽造不可能な暗号化キーを使用します。  
- シークレットコントラクトはCosmos SDKのコンピュートモジュール上で実行されますが、暗号化された入力、出力、状態をサポートします。

---

## リモートアテステーション（Remote Attestation）

**リモートアテステーション（Remote Attestation）**は、エンクレーブが本物の安全なハードウェア環境で実行されていることをプルーフするプロセスです。

これにより、リモートの当事者は以下を検証できます。
- 正しいアプリケーションが実行されていること  
- アプリケーションが改ざんされていないこと  
- Intel SGXエンクレーブ内で安全に実行されていること

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

エンクレーブには、外部からアクセスできない秘密の署名キーとアテステーションキーも含まれています。

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## データシーリング（Data Sealing）

エンクレーブはステートレスであるため、データを信頼できないメモリの外部に保存しなければならない場合があります。  

**データシーリング（Data Sealing）**は、CPUから導出されたキーを使用してエンクレーブ内のデータを暗号化します。暗号化されたブロックは、**同じシステム上でのみ**アンシールできます。

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network**も、機密ParaTime（例：SapphireおよびCipher）を通じてTEEsを使用しています。

暗号化されたデータは、スマートコントラクトとともにTEEに入ります。エンクレーブを出る前に、復号、処理、再暗号化されます。

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## プルーフ・オブ・ステークネットワークにおけるTEEs

多くのプルーフ・オブ・ステークブロックチェーン（SecretやOasisを含む）は、コンセンサスフレームワークとして**Tendermint**を使用しています。

PoSバリデータでは、以下が求められます。
- キーを安全に管理し、平文で公開しないこと。  
- バリデータがオンライン状態を維持すること（ダウンタイムにはペナルティが適用されます）。  
- 競合するメッセージに署名すると、スラッシングにつながる可能性があること。

**TEEs**は、バリデータキーを安全に生成・使用するのに理想的です。

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcashとプルーフ・オブ・ステークの研究

Zcashは、プルーフ・オブ・ステークへの移行を積極的に研究しています。

- 研究を読む：https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- さまざまなPoS設計とそのプライバシーへの影響を説明するZcash Foundation Community Callのこのセグメントをご覧ください。
  
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

**ZecHub（@ZecHub）による元のスレッド**  
https://x.com/ZecHub/status/1633579659282587651

---

*このページは、ZecHub wiki向けに元のZero to Zero Knowledgeスレッドから編集されました。*
