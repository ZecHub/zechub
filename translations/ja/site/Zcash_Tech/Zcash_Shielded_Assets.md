<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>
<a href="">
    <img src="https://i.ibb.co/0VfMFB5/image-2023-11-18-160742427.png" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets（ZSA）

Zcash Shielded Assets（ZSA）は、Zcashプロトコルの改善案であり、Zcashチェーン上でカスタム資産の作成、転送、焼却を可能にするものです。

[Ethereumブロックチェーン](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)上の[ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)トークン標準に詳しい場合は、ZSAはZcashにとってERC-20トークンがEthereumにとってのものと同じように機能します。

Zcash Shielded Assetsにより、Zcashブロックチェーン上でカスタムトークンを作成できるようになり、[ZEC](https://wiki.zechub.xyz/using-zec-privately)以外のトークンもZcashブロックチェーン上のシールド付き取引による匿名性とプライバシーを享受できるようになります。

ZSAの主要な潜在的な用途の1つは、Zcashプロトコル上でステーブルコインを発行することです。ステーブルコインとは、米ドルやユーロなどの法定通貨に価値を固定する暗号資産のことです。現在、最も広く流通しているステーブルコインの多くは[USDC](https://www.circle.com/en/usdc)や[Dai](https://docs.makerdao.com/)などのERC-20トークンです。

ZSAのもう1つの潜在的な用途は、ガバナンストークンを発行することです。例えば、このWikiの出版者である[ZecHub](https://wiki.zechub.xyz/zechub)は分散型自律組織（DAO）であり、メンバーに提案やガバナンスに関する意思決定を行うためにZSAを作成し発行することができると考えています。

ZSAは、[QEDIT](https://qed-it.com/)によって開発されており、[Zcash Foundation](https://wiki.zechub.xyz/zcash-foundation)から主要な助成金を受けて、[Electric Coin Company](https://wiki.zechub.xyz/electric-coin-company)と協力して開発されています。このプロジェクトはまだ積極的に開発されているため、更新情報は[Zcashフォーラム](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153)のこのスレッドに掲載されています。[QEDITによるZSA助成金申請書](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/)は、Zcash Foundationの助成金ウェブサイトから入手可能です。


### Zebra 上での ZSA デモ 

[![動画サムネイル](https://i.ytimg.com/vi/1MZMGC9ViyA/hqdefault.jpg?)](https://youtu.be/1MZMGC9ViyA)

**自分でデモを試してみましょう！**

zcash-tx-tool リポジトリをクローンしてください：
[https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)


___

## Zcash Improvement Proposals (ZIPs)

[ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets の転送および焼却
[ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets の発行
[ZIP 230](https://zips.z.cash/zip-0230): バージョン6のトランザクションフォーマット


## ZSA助成金提案

Shielded Assets（ZSA/UDA）のZSA提案は、[QEDIT](https://qed-it.com/)チームによって、Zcashブロックチェーン上で汎用的なシールド付き資産を構築するために出されたものです。これらは通常、ユーザー定義資産（UDA）またはZcash Shielded Assets（ZSA）と呼ばれます。

この提案により、[QEDIT](https://qed-it.com/)チームはZcashエコシステムにDeFiを取り入れる計画であり、同時にプール調査においてコミュニティが答えたように、「汎用的なシールド付き資産（ZSA/UDA）が現在最も求められている機能である」という質問に対して、チームが尋ね、コミュニティが答えました。[https://twitter.com/BenarrochDaniel/status/1428327864034791429](https://twitter.com/BenarrochDaniel/status/1428327864034791429)

これらの提案は、[Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000)仕様に技術的に準拠しており、ZIP 226およびZIP 227で定義されています。

1. [ZIP 226](https://qed-it.github.io/zips/zip-0226): Zcash Shielded Assets の転送および焼却
2. [ZIP 227](https://qed-it.github.io/zips/zip-0227): Zcash Shielded Assets の発行
