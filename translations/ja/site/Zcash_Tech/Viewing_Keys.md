<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

シールドアドレスでは、Zcash ブロックチェーン上で可能な限り少ない情報だけを明かして取引できます。では、保有資産や送金内容を特定の相手に示す必要が*ある*場合はどうなるのでしょうか。すべてのシールドアドレスには、支出する権限を与えずに読み取りアクセスを許可する Viewing Key があります。Viewing Key は [ZIP 310](https://zips.z.cash/zip-0310) で導入され、Sapling ネットワークアップグレードでプロトコルに追加されました。

Viewing Key は選択的開示のためのツールです。誰に何を見せるかを選べ、そのために支出権限を渡す必要はありません。

## TL;DR

Viewing Key により、シールドされた Zcash アドレスまたはアカウントの活動への**読み取り専用**アクセスが付与されます。これを保有する人は、受信トランザクション（Full Viewing Key の場合は送信トランザクションも）を確認できますが、使用することは決してできません。

- **それが何か：** シールドプールの選択的開示ツール。[ZIP 310](https://zips.z.cash/zip-0310)で導入され、Saplingネットワークアップグレードでプロトコルに追加されました。
- **それによって可能になること：** 入金の検知（`uivk…`incoming keys）、またはアカウントの入出金を完全に可視化すること（`uview…`unified full viewing keys）、およびレガシーなSapling `zxviews…`キー。
- **それによって可能にならないこと：** 支出権限。Viewing Keyの保有者が何をしても、資金を移動することはできません。
- **現在利用できる場所：** [Zallet](https://github.com/zcash/zallet)でのエクスポート／インポート（v0.1.0-beta.2以降、`z_exportviewingkey` / `z_importviewingkey`）と、Zkoolなどのウォレットにおけるウォッチオンリーアカウント。現在の対応状況の一覧は、[ウォレット](/using-zcash/wallets)ページを参照してください。
- **基本ルール：** 求められている問いに答えられる、最も限定的なキーを選びましょう。また、一度渡したキーは取り消せず、資金を移動することでしかその影響をなくせないことを覚えておいてください。

---

## Viewing Key を使う理由

このテーマに関する Electric Coin Company の記述では、最も頻繁に生じる状況が整理されており、現在でも一般的な利用例です。

- **入金を監視する取引所。** 取引所は、インターネットに接続された検知ノードに Incoming Viewing Key を読み込ませることで、シールドアドレスへの顧客入金を検知できます。一方、Spending Key はネットワークに一切接続しないハードウェアに保持されます。
- **保有資産を証明するカストディアン。** カストディアンは、各シールドアドレスの Full Viewing Key を監査人に渡します。監査人は残高を確認し、それらのアドレスに対する過去の入出金履歴を確認できますが、それ以外は何もできません。
- **取引相手に対するデューデリジェンス。** 取引所が高度なデューデリジェンスの一環として顧客のシールド取引履歴を確認する必要がある場合、資金そのものではなく Viewing Key を求めることができます。

## Viewing Key が明かすものと明かさないもの

キーには複数の種類があり、その違いによって開示される情報量が決まります。

| キー | プレフィックス | 許可されること |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | アカウント内のすべてのプールについて、受信**および**送信トランザクションを閲覧できる |
| Unified incoming viewing key (UIVK) | `uivk…` | アカウント内のすべてのプールについて、受信トランザクションのみを閲覧できる |
| Sapling extended full viewing key | `zxviews…` | キーのアドレスにおける受信および送信 Sapling アクティビティを閲覧できる |

これらのいずれも支出はできません。また、重要な意味でいずれも永続的です。一度渡したキーは取り消せず、相手がキーを持たないアカウントへ資金を移すことでのみ無効化できます。

何かを共有する前に、知っておくべき開示上の落とし穴が2つあります。

**Incoming は限定的という意味ではありません。** Unified Incoming Viewing Key は、問い合わせ対象となった1つのアドレスではなく、アカウント全体に適用されます。単一の Sapling アドレスに対して UIVK をエクスポートしても、そのアカウント内のすべてのプールにおける受信情報の閲覧権限が与えられるため、名称が示すアドレス以上の情報を開示します。[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) では、この点が明示されています。

**公開済みのアドレスは、将来の攻撃者に対してすでに Incoming Viewing Key を露出させています。** [ZIP 326](https://zips.z.cash/zip-0326) は、量子コンピュータを持つ攻撃者が公開された diversified address から Incoming Viewing Key を復元できる可能性を指摘しています。これは nullifier key の復元とは異なり、実現可能です。現在、アドレスを公開することは Viewing Key を公開することと同じではありませんが、十分に長い時間軸では両者はより近いものになります。

## Ironwood 後の Viewing Key

NU6.3 は Ironwood シールドプールを導入し、Orchard プールを支出専用にしたため、資金は時間をかけて一方から他方へ移行します。アップグレード自体については、[Ironwood](/zcash-tech/ironwood) および [The turnstile](/zcash-tech/the-turnstile) を参照してください。

**Ironwood 前に発行された Viewing Key は、移行後も機能し続けます。** ZIP 326 は、receiver とそれに対応する Incoming Viewing Key がプールではなく Orchard *プロトコル* にスコープされることを定めています。同じ Incoming Viewing Key は、Orchard プールと Ironwood プールの両方の note ciphertext を試行復号します。Zallet はこの方式を実装しており、Ironwood note を Orchard 形状のものとして説明し、Ironwood note-encryption domain の下でアカウントの Orchard Viewing Key を用いて試行復号します。

キーを保有または発行する人にとって、3つの結果があります。

1. **残高はプール間を移動し、閲覧者はその過程を確認できます。** [ZIP 318](https://zips.z.cash/zip-0318) は、移行をランダム化されたスケジュールでブロードキャストされる、小規模で意図的に均一な Orchard から Ironwood への一連のトランザクションとして定めています。各トランザクションでは1つの Orchard note を支出し、標準額面の Ironwood 出力を1つ生成します。Viewing Key で監視する監査人には、保有資産が一度にではなく数週間かけて段階的に一方のプールから他方へ移る様子が見えます。ウォレットは自身の Viewing Key を使用してチェーンデータから移行の進捗を再構築できます。
2. **各移行ステップでは、移動する価値が明らかになります。** これは turnstile を横断することに本質的に伴うものであり、移行を監査可能にする要素でもあります。残高を標準額面に分割することで、単一のトランザクションが Orchard プール残高全体を明らかにすることはありません。
3. **Ironwood 後に作成されたアカウントでは、キーの導出方法が異なる場合があります。** [ZIP 2005](https://zips.z.cash/zip-2005) は、量子復元可能なキーのための `use_qsk` フラグを追加し、Incoming Key、Outgoing Key、diversifier key の導出方法を変更します。そのため、`use_qsk = true` キーは実際に異なるキーです。ZIP 326 は、フラグがアカウント全体で統一されることを要求し、Mainnet で NU6.3 が有効化される前に `use_qsk = true` キーを生成することを禁止しています。したがって、Ironwood 前から存在するアカウントからエクスポートされたキーは `use_qsk = false` キーであり、そのアカウントでは引き続き正しいものです。あるアカウントからエクスポートされたキーが別のアカウントを表すと考えないでください。

## Viewing Key のエクスポート

### Zallet

[Zallet](https://github.com/zcash/zallet) は、zcashd 内のウォレットに代わるフルノードウォレットです。Viewing Key のエクスポートとインポートは **v0.1.0-beta.2（2026年7月28日）** で導入されたため、まずバージョンを確認してください。それ以前のビルドにはこれらのメソッドはありません。メソッド名以降の各引数は有効な JSON でなければならず、文字列値にはそれぞれ二重引用符を付ける必要があります。[Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) では、一般的なコマンド形式を説明しています。

ウォレットが保持している内容を一覧表示します。

```bash
zallet rpc listaddresses
```

Unified Address を渡して、アカウントの Unified Full Viewing Key をエクスポートします。

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

代わりにアカウントの Unified Incoming Viewing Key をエクスポートするには、任意の `ivk` 引数を使用します。

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling アドレスを渡すと、そのアカウントの Sapling Extended Full Viewing Key（`zxviews…`）が返され、従来の zcashd の挙動と一致します。文書化されている制限は2つあります。Sprout アドレスは拒否されること、そしてウォレットでは再構築できないため、view-only としてインポートされたアカウントからは Sapling Extended Full Viewing Key をエクスポートできないことです。`ivk` 形式は、インポートされた view-only アカウントでも機能します。

### 自身のインターフェースから Viewing Key をエクスポートできるウォレット

[Wallets](/using-zcash/wallets) ページでは、各ウォレットの Viewing Key サポートと Ironwood 対応状況を追跡しています。本稿執筆時点で、Viewing Key サポートと **Ironwood: Ready** の両方を記載しているウォレットには、ZODL、Zingo!、Zkool、Cake、Zallet、zecd、Nozy があります。対応状況は変わるため、個別のウォレットを利用する前には本ページではなくそのページを確認してください。

## Viewing Key を watch-only アカウントとしてインポートする

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) は、Unified Key とレガシーキーの両方を受け入れるため、この用途では最も柔軟な選択肢です。その README には、**Unified Viewing Key** または **Sapling Extended Viewing Key** から作成する view-only アカウントに加え、zcashd からエクスポートしたレガシーの shielded Extended Key が記載されています。新しいアカウントを追加し、view-only の方法を選択して、`uview…` または `zxviews…` キーを貼り付けます。するとアカウントは同期され、支出権限なしで残高と履歴を表示します。

Ironwood プロトコルのサポートと Orchard から Ironwood への移行は、Zkool 6.24.0（2026年7月20日）で導入され、6.26.1（2026年8月2日）でメモリプール内の Ironwood トランザクション検知が修正されました。6.26.1 以降を使用してください。

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

第2引数は再スキャンポリシーです。`"whenkeyisnew"`（デフォルト）、`"yes"`、`"no"` のいずれかです。第3引数は再スキャン開始ブロック高です。Zallet はキーを view-only アカウントとしてインポートし、支出権限なしでそのアドレスの入出金トランザクションを追跡します。

**Zallet は Sapling Extended Full Viewing Key のみをインポートします。** Unified Full Viewing Key はエクスポートできても、`uview…` Unified Full Viewing Key はインポートされません。Unified アカウント全体への読み取りアクセスを渡すには、Zallet から UFVK をエクスポートし、Zkool のように Unified Key を受け入れるウォレットへインポートしてください。

インポートしたキーを、txid、手数料、メモを含む完全なトランザクション履歴ファイルにするには、[Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) を参照してください。

## 変更点と、探すのをやめるべきもの

このページの古い版、またはその翻訳を参照していた場合、3つの方法はもう利用できません。

- **`zcash-cli z_exportviewingkey` と `z_importviewingkey`。** zcashd は2026年7月18日にサポート終了による停止に達し、現在は動作していません。Zallet にある同名のメソッドが代替となります。[migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) を参照してください。
- **Ywallet の手順。** Wallets ページでは Ywallet が **Ironwood: Not Ready** とされているため、Ironwood 時代の Viewing Key について人々に勧めるウォレットではありません。同じ開発者による Zkool は同じ範囲のキーを受け入れ、Ready とされています。
- **zcashblockexplorer.com/vk。** このサービスは無効な証明書とともに HTTP 503 を返しており、代替されずに廃止されました。ウェブサイトに Viewing Key を貼り付けると、トランザクション履歴全体をそのサイトの運営者に渡すことになります。これは以前のページにあった3つの選択肢の中でも、常に最も弱いものでした。代わりに、自分で実行しているウォレットへキーをインポートしてください。

## 視覚資料 / 類比

### 監査人のウィンドウ

シールドされたアカウントを、銀行の貸金庫室だと考えてみてください。

- **spending key**は部屋の鍵です。これを持つ人は誰でも箱を開け、中身を取り出せます。
- **viewing key**は、その部屋を監査人が覗くための窓です。監査人はすべての箱の出入りを確認し、ラベルを読み、台帳を記録できますが、その窓には取っ手がありません。窓越しに見ている人は、部屋の中にあるものを一切動かせません。

### ウィンドウに表示できないもの

窓が向いているのは部屋であり、その外の世界ではありません。これは監視対象アカウントのシールドされた活動を示すものであり、閲覧者をブロックチェーン全体の観測者にするものではなく、そのアカウントの活動を他者の非シールド履歴と相関付けることもできません。また、この窓はアカウント単位で設置されるため、誰かに1つの貸金庫（単一のアドレス）ののぞき穴を渡したとしても、その人には部屋全体の入金ビューが与えられます。これこそが、最も限定的なキーを使うというルールが存在する理由です。

### ウィンドウを元に戻せない理由

ビューイングキーは権限エントリではなく、情報の一部です。一度コピーされると、監視対象のアカウントから資金が出るまで存在し続けます。実際的な対処法はローテーションです。残高を、相手がキーを受け取ったことのない新しいアカウントへ移し、古い窓からは空の部屋しか見えないようにします。

## 詳細解説

### 試行復号：ビューイングの実際の仕組み

すべてのシールドトランザクションは、そのノートの平文を意図した受取人向けに暗号化します。閲覧キーを保持するウォレットは、**試行復号**を行います。すなわち、チェーン上で見つけた各トランザクションについて、そのキーを用いてノートの暗号文の復号を試みます。成功するとノートの価値、受取人のダイバーシファイア、メモが判明し、失敗してもコストはかかりません。これが、同じ受信閲覧キーがOrchardプールとIronwoodプールの両方で機能し続ける理由です。[ZIP 326](https://zips.z.cash/zip-0326)は受信者をOrchard *プロトコル*にスコープするため、Ironwoodノートの暗号文はOrchard型となり、Ironwoodノート暗号化ドメインの下でアカウントのOrchard閲覧キーを使って試行復号されます。

### フルと受信専用：どの導出によって決まるか

**完全な**ビューイングキーは送信ビューイング機能を導出でき、これにより監査人はトランザクションが復号されると送金の*送信者*側を再構築できます。**受信**ビューイングキーは意図的にそこまでの機能を持たず、受信ノートを検出して復号できますが、送信の関連付けを再構築することはできません。これらの機能間の導出は一方向です。受信キーは完全なキー*から*導出され、その逆は決してありません。これにより、「受信のみ」は単なる約束ではなく、実際の機能低下となります。[ZIP 2005](https://zips.z.cash/zip-2005)の`use_qsk`フラグは導出そのものを変更するため、量子計算で復元可能なキーは旧来のキーの変種ではなく、まったく異なるキー群です。

### 閲覧者にとっての移行の様子

[ZIP 318](https://zips.z.cash/zip-0318)の移行は、小額で均一なOrchardからIronwoodへのトランザクションをランダムに連ねたものなので、鍵を持つ閲覧者には階段状に見えます。つまり、一度に跳ね上がるのではなく、標準額面の価値が何段にも分かれて現れます。個々の段階から移行中の総残高が明らかになることはありませんが、*パターン*は識別可能です。これは監査可能なターンスタイルにおいて意図されたトレードオフです。

## 実践的な意味

- **取引所および決済処理事業者向け：** アカウントの受信閲覧鍵（完全に網羅するには UFVK）を検出ノードに読み込ませ、透明アドレスの場合とまったく同じように顧客の入金を自動で照合できます。ただし、顧客の支出鍵がコールドストレージから出ることはありません。
- **監査人および準備金証明向け：** 完全閲覧鍵により、「私たちを信頼してください」が「これを検証してください」へと変わります。監視対象アカウントの残高と完全な取引履歴を確認できますが、それらに手を加える能力は一切ありません。単一の支払いに関する一回限りの証明には、[支払い開示](/zcash-tech/payment-disclosures)と組み合わせてください。
- **デューデリジェンス向け：** 取引相手には、ウォレット全体ではなく、その契約に関連するアカウントの鍵を渡してください。関係が終了した場合は、アカウントをローテーションしてください。
- **ツール選択向け：** Zalletは UFVK をエクスポートし、Saplingの拡張完全閲覧鍵をインポートします。Zkoolは統合鍵およびレガシー鍵を監視専用アカウントとして受け付けます。ウォレットを標準化する前に、現在の[ウォレット](/using-zcash/wallets)ページでIronwoodの対応状況マトリクスを確認してください。
- **開示のコストは恒久的です：** 鍵の保有者が一人増えるたびに、閉じることのできない恒久的なプライバシーの与信枠が生まれます。関係ごとに鍵を発行し、1つのアカウントに限定し、誰が何を保有しているかを文書化してください。

## よくある間違い

| よくある誤解 | 実際のところ |
| --- | --- |
| 「閲覧キーが漏洩すると、資金を使われる可能性がある。」 | いいえ。閲覧キーには支出権限がなく、漏洩による最悪の結果は履歴が開示されることです。 |
| 「閲覧キーは後から無効化できる。」 | できません。渡したキーは、相手がキーを持っていないアカウントへ資金が移動されるまで有効です。 |
| 「1つのアドレスの UIVK をエクスポートしても、そのアドレスしか表示されない。」 | 閲覧キーはアカウント単位です。UIVK はアカウント内のすべてのプールにおける受信アクティビティを表示します。 |
| 「`zcash-cli z_exportviewingkey` はまだ使える。」 | いいえ。zcashd は2026年7月18日にサポート終了に伴い停止しました。代わりに Zallet の `z_exportviewingkey` / `z_importviewingkey` を使用してください。 |
| 「閲覧専用なので、閲覧キーをウェブツールに貼り付けても安全だ。」 | 閲覧専用であっても、そのアカウントの取引履歴全体をサイト運営者に渡すことになります。自分で運用するウォレットにキーをインポートしてください。 |
| 「Zallet は、Zallet がエクスポートできる任意の閲覧キーをインポートできる。」 | いいえ。Zallet がインポートできるのは Sapling の拡張フル閲覧キーのみです。統合 `uview…` キーは、Zkool のように統合キーを受け付けるウォレットに入力する必要があります。 |

## 関連ページ

- [支払い開示](/zcash-tech/payment-disclosures) — アカウントへの継続的なアクセスを許可せずに、1件の支払いの選択した詳細を証明する
- [統合アドレス](/zcash-tech/unified-addresses) — 閲覧キーの受信者を含むアドレス層
- [Ironwood](/zcash-tech/ironwood) — Orchardが移行するNU6.3のシールドプール
- [ターンスタイル](/zcash-tech/the-turnstile) — 閲覧者が見守ることのできるOrchardからIronwoodへの移行メカニズム
- [ウォレット](/using-zcash/wallets) — ウォレット、閲覧キーのサポート、Ironwoodへの対応状況の完全なディレクトリ
- [Viewing Keyからのトランザクション履歴のエクスポート](/guides/viewing-key-transaction-export) — インポートしたキーを完全なtxid/手数料/メモ履歴ファイルに変換する

## リソース

Viewing Key は必要な場合にのみ使用し、質問への回答に必要な最も限定的なキーを優先してください。

- [支払いの開示](/zcash-tech/payment-disclosures) - アカウントへの継続的なアクセスを許可せずに、1件の支払いの選択した詳細を証明する
- [ZIP 326: NU6.3 ウォレットへの影響](https://zips.z.cash/zip-0326) — 閲覧キーがOrchardおよびIronwoodプール間でどのように動作するか
- [ZIP 229: バージョン6トランザクション形式](https://zips.z.cash/zip-0229) — OrchardおよびIronwoodプールを定義する
- [ZIP 310](https://zips.z.cash/zip-0310) — 閲覧キーの仕様
- [Zallet変更履歴](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — どのリリースでどのRPCメソッドが追加されたか
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — サポートされるアカウントおよびキーの種類
- [ECC、閲覧キーの解説](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC、選択的開示と閲覧キー](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC、Zcash Viewing Keyビデオプレゼンテーション](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
