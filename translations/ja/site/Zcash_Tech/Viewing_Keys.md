<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Viewing Key

シールドアドレスを使えば、Zcashブロックチェーン上で明かす情報を可能な限り少なくしながら取引できます。では、保有額や送金内容を特定の相手に示す必要がある場合はどうなるのでしょうか。すべてのシールドアドレスには、使用する権限を与えずに閲覧権限を付与するViewing Keyがあります。Viewing Keyは[ZIP 310](https://zips.z.cash/zip-0310)で導入され、Saplingネットワークアップグレードでプロトコルに追加されました。

Viewing Keyは選択的開示のためのツールです。誰に何を見せるかを自分で選び、そのために使用権限を渡す必要はありません。

## Viewing Keyを使う理由

このテーマに関するElectric Coin Companyの解説では、最も頻繁に生じる状況が示されており、現在でも一般的なケースです。

- **入金を監視する取引所。** 取引所は、インターネットに接続された検出ノードにIncoming Viewing Keyを読み込ませ、シールドアドレスへの顧客入金を検知できます。一方で、Spending Keyはネットワークに決して接続しないハードウェアに保持されます。
- **保有資産を証明するカストディアン。** カストディアンは、各シールドアドレスのFull Viewing Keyを監査人に渡します。監査人はそれらの残高を確認し、当該アドレスとの過去の取引を確認できますが、それ以外は何もできません。
- **取引相手に対するデューデリジェンス。** 取引所が強化デューデリジェンスの一環として顧客のシールド取引履歴を確認する必要がある場合、資金そのものではなくViewing Keyを求めることができます。

## Viewing Keyが明かす情報と明かさない情報

キーには複数の種類があり、その違いによって開示する範囲が決まります。

| キー | プレフィックス | 付与される権限 |
|---|---|---|
| Unified Full Viewing Key（UFVK） | `uview…` | アカウント内のすべてのプールについて、受信**および**送信トランザクションを閲覧できる |
| Unified Incoming Viewing Key（UIVK） | `uivk…` | アカウント内のすべてのプールについて、受信トランザクションのみを閲覧できる |
| Sapling Extended Full Viewing Key | `zxviews…` | キーに対応するアドレスの受信および送信Saplingアクティビティを閲覧できる |

これらはいずれも使用できません。重要な意味で、すべて永続的です。一度渡したキーは取り消せず、相手がキーを保有していないアカウントへ資金を移すことでしか無効同然にできません。

何かを共有する前に、知っておくべき開示上の落とし穴が2つあります。

**Incomingは限定的であることを意味しません。** Unified Incoming Viewing Keyの対象範囲は、問い合わせを受けた単一アドレスではなくアカウント全体です。単一のSaplingアドレスに対してUIVKをエクスポートしても、そのアカウント内のすべてのプールにわたる受信情報の閲覧権限が付与されるため、名前に含まれるアドレス以上の情報が開示されます。[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)には、この点が明記されています。

**公開済みのアドレスは、将来の攻撃者に対してすでにそのIncoming Viewing Keyを露出させています。** [ZIP 326](https://zips.z.cash/zip-0326)は、量子コンピュータを持つ攻撃者であれば、公開された多様化アドレスからIncoming Viewing Keyを復元できる可能性があることを指摘しています。これはNullifier Keyの復元とは異なり、実行可能な方法です。現在アドレスを公開することはViewing Keyを公開することと同じではありませんが、十分に長い時間軸では両者の距離は近づきます。

## Ironwood後のViewing Key

NU6.3ではIronwoodシールドプールが導入され、Orchardプールは使用専用となったため、資金は時間とともに一方から他方へ移行します。アップグレード自体については[Ironwood](/zcash-tech/ironwood)および[ターンスタイル](/zcash-tech/the-turnstile)を参照してください。

**Ironwood以前に発行されたViewing Keyは、移行後も機能し続けます。** ZIP 326では、レシーバーとそれに対応するIncoming Viewing KeyはプールではなくOrchard *プロトコル*を対象とすると規定されています。同じIncoming Viewing Keyで、OrchardプールとIronwoodプールの両方のノート暗号文を試行復号できます。Zalletもこのように実装しており、IronwoodノートをOrchard形状のものとして説明し、Ironwoodノート暗号化ドメインでアカウントのOrchard Viewing Keyを用いて試行復号します。

キーを保有または発行する人にとって、結果として生じる点は3つあります。

1. **残高はプール間を移動し、閲覧者はその過程を確認できます。** [ZIP 318](https://zips.z.cash/zip-0318)では、移行を小規模かつ意図的に均一なOrchardからIronwoodへの一連のトランザクションとして規定しています。これらはランダム化されたスケジュールでブロードキャストされ、それぞれ1つのOrchardノートを使用し、標準額面のIronwood出力を1つ生成します。Viewing Keyで監査する人には、保有資産が1回の移動ではなく数週間にわたる段階的な移動として、あるプールからもう一方へ移る様子が見えます。ウォレットはViewing Keyを使い、チェーンデータから自身の移行進捗を再構築できます。
2. **各移行ステップでは、移動する金額が明らかになります。** これはターンスタイルを通過することに本質的に伴うものであり、移行を監査可能にする理由でもあります。残高を標準額面に分割することで、単一のトランザクションがOrchardプールの残高全体を明らかにすることはありません。
3. **Ironwood後に作成されたアカウントでは、キーが異なる方法で導出される可能性があります。** [ZIP 2005](https://zips.z.cash/zip-2005)は、量子復元可能なキーのための`use_qsk`フラグを追加しており、Incoming Key、Outgoing Key、Diversifier Keyの導出方法を変更します。そのため、`use_qsk = true`のキーは実際に異なるキーです。ZIP 326では、フラグはアカウント内で統一されなければならず、MainnetでNU6.3が有効化される前に`use_qsk = true`のキーを生成することは禁止されています。したがって、Ironwood以前から存在するアカウントからエクスポートされたキーは`use_qsk = false`のキーであり、そのアカウントに対して引き続き正しいものです。あるアカウントからエクスポートされたキーが別のアカウントを表すと考えないでください。

## Viewing Keyのエクスポート

### Zallet

[Zallet](https://github.com/zcash/zallet)は、zcashd内のウォレットを置き換えたフルノードウォレットです。Viewing Keyのエクスポートとインポートは**v0.1.0-beta.2（2026年7月28日）**で導入されたため、まずバージョンを確認してください。それ以前のビルドにはこれらのメソッドはありません。メソッド名より後の各引数は有効なJSONである必要があるため、文字列値にはそれぞれ二重引用符を付けたままにします。[Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide)では、一般的なコマンド形式を説明しています。

ウォレットが保持するアドレスを一覧表示します。

```bash
zallet rpc listaddresses
```

Unified Addressを渡して、アカウントのUnified Full Viewing Keyをエクスポートします。

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

代わりに、オプションの`ivk`引数を使用してアカウントのUnified Incoming Viewing Keyをエクスポートします。

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Saplingアドレスを渡すと、そのアカウントのSapling Extended Full Viewing Key（`zxviews…`）が返され、従来のzcashdの動作と一致します。文書化されている制限は2つあります。Sproutアドレスは拒否されること、およびウォレットが再構築できないため、Viewing Key専用としてインポートされたアカウントからはSapling Extended Full Viewing Keyをエクスポートできないことです。`ivk`形式は、インポートされたViewing Key専用アカウントでも機能します。

### 独自のインターフェースからViewing Keyをエクスポートするウォレット

[ウォレット](/using-zcash/wallets)ページでは、各ウォレットのViewing Key対応状況とIronwood対応状況を追跡しています。執筆時点で、Viewing Key対応と**Ironwood: Ready**の両方が記載されているウォレットには、ZODL、Zingo!、Zkool、Cake、Zallet、Zecd、Nozyがあります。対応状況は変化するため、特定のウォレットに依存する前にはこのページを確認してください。

## Viewing KeyをWatch-onlyアカウントとしてインポートする

### Zkool

[Zkool](https://github.com/hhanh00/zkool2)は、レガシーキーだけでなくUnified Keyも受け入れるため、この用途では最も柔軟な選択肢です。READMEには、zcashdからエクスポートされたレガシーシールドExtended Keyとともに、**Unified Viewing Key**または**Sapling Extended Viewing Key**から作成されるViewing Key専用アカウントが記載されています。新しいアカウントを追加し、Viewing Key専用の方法を選んで、`uview…`または`zxviews…`キーを貼り付けます。するとアカウントは同期され、使用権限なしで残高と履歴を報告します。

Ironwoodプロトコル対応とOrchardからIronwoodへの移行はZkool 6.24.0（2026年7月20日）で導入され、6.26.1（2026年8月2日）ではメモリプール内のIronwoodトランザクション検出が修正されました。6.26.1以降を使用してください。

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

2番目の引数は再スキャンポリシーで、`"whenkeyisnew"`（デフォルト）、`"yes"`、または`"no"`です。3番目は再スキャン開始ブロック高です。ZalletはキーをViewing Key専用アカウントとしてインポートし、使用権限なしでそのアドレスの受信および送信トランザクションを追跡します。

**ZalletがインポートできるのはSapling Extended Full Viewing Keyのみです。** Unified Full Viewing Keyをエクスポートできるにもかかわらず、`uview…` Unified Full Viewing Keyはインポートできません。Unifiedアカウント全体への閲覧権限を渡すには、ZalletからUFVKをエクスポートし、ZkoolなどUnified Keyを受け入れるウォレットにインポートしてください。

インポートしたキーを、txid、手数料、メモを含む完全なトランザクション履歴ファイルに変換する方法については、[Viewing Keyからのトランザクション履歴のエクスポート](/guides/viewing-key-transaction-export)を参照してください。

## 変更点と、探すのをやめるべきもの

このページの古いバージョン、またはその翻訳に従っていた場合、以下の3つの方法は現在機能しません。

- **`zcash-cli z_exportviewingkey`および`z_importviewingkey`。** zcashdは2026年7月18日にサポート終了による停止に達し、現在は動作していません。Zalletの同名メソッドが代替手段です。[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。
- **Ywalletの手順。** ウォレットページではYwalletが**Ironwood: Not Ready**とされているため、Ironwood時代のViewing Keyについて案内するウォレットではありません。同じ開発者によるZkoolは同じ範囲のキーを受け入れ、Readyとされています。
- **zcashblockexplorer.com/vk。** このサービスは無効な証明書でHTTP 503を返しており、代替されることなく廃止されました。Viewing Keyをウェブサイトに貼り付けると、トランザクション履歴全体をそのウェブサイトの運営者に渡すことになります。これは以前のページにあった3つの選択肢の中でも、常に最も脆弱な方法でした。代わりに、自分で運用するウォレットへキーをインポートしてください。

## リソース

Viewing Keyは必要な場合にのみ使用し、問われた内容に答えられる最も限定的なキーを選んでください。

- [ZIP 326: ウォレットに対するNU6.3の影響](https://zips.z.cash/zip-0326) — OrchardプールとIronwoodプールをまたぐViewing Keyの挙動
- [ZIP 229: バージョン6トランザクション形式](https://zips.z.cash/zip-0229) — OrchardプールとIronwoodプールを定義
- [Zallet変更履歴](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — どのリリースでどのRPCメソッドが追加されたか
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — サポートされるアカウントとキーの種類
- [ECC、Viewing Keyの解説](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC、選択的開示とViewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC、Zcash Viewing Keyビデオプレゼンテーション](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
