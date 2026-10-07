<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_in_DeFi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zcash を DeFi で使用する

## Near Intents 

Zcash と NEAR Intents は統合され、ユーザーが手数料を支払わずに Zcash (ZEC) を Bitcoin、Solana、NEAR、XRP などの主要な代替通貨と交換できるようになりました。この統合は、NEAR Protocol が自律的で検証可能な AI ボットのインフラストラクチャを作成する試みの一環であり、Zcash にも AI 駆動型の決済レールを可能にする利点ももたらします。これにより、Zcash のユーザーはプライバシーを維持しながらスマートコントラクトやより広範な [DeFi アプリケーション](https://nym.com/blog/what-is-defi) にアクセスできるようになりました。[Near Intents](https://app.near-intents.org) を使用してプライバシーを保つことができます。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/mKVvXY4yjjA"
    title="Zcash x NEAR Intents を使用したクロスチェーン交換"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Maya Protocol 

Maya Protocol は Zcash を統合し、分散型、流動性、および取引プライバシーを強化しました。この統合により、Zcash ユーザーはプライバシーを保ちながら分散型の交換から恩恵を受け、より多くの柔軟性と流動性を得ることができます。詳しくはこちら: [https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya](https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya)


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="LeoDex 上で Ethereum を Zcash に交換する方法"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


**注意**: 既存の ETH を「Release」タブを使用して透明アドレスに入力することで、Shielded Zcash としてプライベートストレージに橋渡しすることも可能です。その後、モバイル/デスクトップウォレットで 'Autoshield' を使用できます。このアプリケーションをプライバシーを保つために維持するために、ZEC > ETH と ETH > ZEC の交換は推奨されません。

---

## Zcash DeFi 周りのイノベーション

**Layer 1 解決策**

現在、Zcash エコシステム内で Layer 1 を使用して DeFi アプリケーションを実現するためのオプションが検討されています。これは、シーケンサーを使用して大部分のコントラクト操作をオフチェーンで実行し、そのアクションの検証はオンチェーンで行うことで可能になります。この方法のバージョンは JP Morgan の企業ブロックチェーンとの提携によって作成されました。NU5 では、このような拡張機能を Zcash に追加するためのメカニズム (TZE) が存在します。

**zkEVM**

これは、ゼロ知識証明計算をサポートする EVM と互換性のある仮想マシンによって、Zcash にネイティブなプログラミング可能性をもたらすでしょう。これにより、より多様な開発者コミュニティを通じて Zcash の成長が促進され、プライバシー保護アプリケーションやトークンのエコシステムが育成されることが可能になります。これは他の既存の L2 プライバシーソリューションと比較可能なレベルに達することでしょう。

ECC は、Proof-of-Stake および Cosmos Interblockchain Communication Protocol の研究を進めています。今後のステップは、イーサリアムが PoS への移行（Merge）の成功とそれに伴う問題点も考慮して検討されています。

**ZSA/UDA**

Zcash Shielded Assets / User Defined Assets は専門チームの支援によって開発されており、NU5 プロトコルアップグレード後には実現に大きく近づいています。これらの資産を信頼性高くプライバシー保護されたクロスチェーンブリッジで相互運用可能にするメカニズムは現在作業中です。このテーマに関する Zcon3 のプレゼンテーションへのリンクは下記にあります。

### リソース:

[Zcon3 秘密のクロスチェーン転送](https://youtu.be/vCvMk2-CJN8)

[Zcon3 Defi に関する QEDIT プレゼンテーション](https://youtu.be/EGjcYhovty0) / [Drawing Board](https://miro.com/app/board/uXjVOhuveHo=/)

[Ian Miers による ZSA と安定コインについて](https://www.youtube.com/watch?v=hJMWE3zLIcs)

[Proof-of-Stake 研究](https://electriccoin.co/blog/proof-of-stake-research-overview-1/)

__

Zcash が他の既存のスマートコントラクトプラットフォームと比べて持つ決定的な利点は、ネイティブにプライバシーを保つ Layer 1 です。これは、Layer 2 アプリケーションを使用する際に情報漏洩の可能性を完全に排除します。これにより、情報をアクセス許可付きで簡単に管理できる、本質的にシンプルでより安全なアプリケーションレイヤーが実現されます。
