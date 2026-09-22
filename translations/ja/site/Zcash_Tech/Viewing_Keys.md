<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

シールドアドレスでは、Zcash ブロックチェーン上で可能な限り少ない情報だけを明かして取引できます。では、保有資産や送金内容を特定の相手に示す必要が*ある*場合はどうなるのでしょうか。すべてのシールドアドレスには、支出する権限を与えずに読み取りアクセスを許可する Viewing Key があります。Viewing Key は [ZIP 310](https://zips.z.cash/zip-0310) で導入され、Sapling ネットワークアップグレードでプロトコルに追加されました。

Viewing Key は選択的開示のためのツールです。誰に何を見せるかを選べ、そのために支出権限を渡す必要はありません。

## Viewing Key を使う理由

このテーマに関する Electric Coin Company の記述では、最も頻繁に生じる状況が整理されており、現在でも一般的な利用例です。

- **入金を監視する取引所。** 取引所は、インターネットに接続された検知ノードに Incoming Viewing Key を読み込ませることで、シールドアドレスへの顧客入金を検知できます。一方、Spending Key はネットワークに一切接続しないハードウェアに保持されます。
- **保有資産を証明するカストディアン。** カストディアンは、各シールドアドレスの Full Viewing Key を監査人に渡します。監査人は残高を確認し、それらのアドレスに対する過去の入出金履歴を確認できますが、それ以外は何もできません。
- **取引相手に対するデューデリジェンス。** 取引所が高度なデューデリジェンスの一環として顧客のシールド取引履歴を確認する必要がある場合、資金そのものではなく Viewing Key を求めることができます。

## Viewing Key が明かすものと明かさないもの

キーには複数の種類があり、その違いによって開示される情報量が決まります。

| キー | プレフィックス | 許可されること |
|---|---|---|
| Unified Full Viewing Key（UFVK） | `uview…` | アカウント内のすべてのプールについて、受信**および**送信トランザクションを閲覧できる |
| Unified Incoming Viewing Key（UIVK） | `uivk…` | アカウント内のすべてのプールについて、受信トランザクションのみを閲覧できる |
| Sapling Extended Full Viewing Key | `zxviews…` | キーのアドレスにおける受信および送信 Sapling アクティビティを閲覧できる |

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

[Wallets](/using-zcash/wallets) ページでは、各ウォレットの Viewing Key サポートと Ironwood 対応状況を追跡しています。本稿執筆時点で、Viewing Key サポートと **Ironwood: Ready** の両方を記載しているウォレットには、ZODL、Zingo!、Zkool、Cake、Zallet、Zecd、Nozy があります。対応状況は変わるため、個別のウォレットを利用する前には本ページではなくそのページを確認してください。

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

## リソース

Viewing Key は必要な場合にのみ使用し、質問への回答に必要な最も限定的なキーを優先してください。

- [Payment disclosures](/zcash-tech/payment-disclosures) - アカウントへの継続的なアクセスを許可せずに、1件の支払いについて選択した詳細を証明する
- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Orchard と Ironwood プールにまたがる Viewing Key の挙動
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard と Ironwood プールを定義
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 各 RPC メソッドが追加されたリリース
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 対応するアカウントおよびキーの種類
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
