<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

シールドアドレスを使うと、Zcash ブロックチェーン上で、できるだけ少ない情報しか明かさずに取引できます。では、自分の保有額や送金内容を、*実際に* 特定の相手に見せる必要がある場合はどうなるのでしょうか。すべてのシールドアドレスには、支出する権限を与えずに読み取りアクセスだけを許可する Viewing Key があります。Viewing Keys は [ZIP 310](https://zips.z.cash/zip-0310) で導入され、Sapling ネットワークアップグレードでプロトコルに追加されました。

Viewing Key は選択的開示のためのツールです。誰に何を見せるかは自分で選べ、しかもそのために支出権限を渡す必要はありません。

## なぜ Viewing Key を使うのか？

Electric Coin Company のこのテーマに関する説明では、最もよくある状況が挙げられており、現在でもそれらが一般的です。

- **入金を監視する取引所。** 取引所は、インターネットに接続された検知ノードに incoming viewing key を読み込ませることで、シールドアドレスへの顧客入金を検知できます。一方で、spending key はネットワークに一切接触しないハードウェア上に保持されます。
- **保有資産を証明するカストディアン。** カストディアンは、各シールドアドレスについて full viewing key を監査人に渡します。監査人はそれらの残高を確認し、それらのアドレスへの過去の入出金活動を確認できますが、それ以外のことはできません。
- **取引相手へのデューデリジェンス。** 取引所が強化デューデリジェンスの一環として顧客のシールド履歴を確認する必要がある場合、資金そのものではなく viewing key の提示を求めることができます。

## Viewing Key が明かすものと明かさないもの

キーには複数の種類があり、その違いによって、どこまでの情報を渡すことになるかが決まります。

| Key | Prefix | Grants |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | アカウント内のすべてのプールについて、入金 **と** 出金の両方の取引を見られる |
| Unified incoming viewing key (UIVK) | `uivk…` | アカウント内のすべてのプールについて、入金取引のみ見られる |
| Sapling extended full viewing key | `zxviews…` | そのキーのアドレスに関する Sapling の入出金アクティビティを見られる |

これらのどれも支出はできません。どれも重要な意味で恒久的です。いったん渡したキーは取り消せず、相手が持っていないキーを持つ別アカウントへ資金を移すことでしか実質的に無効化できません。

何かを共有する前に知っておくべき開示上の落とし穴が 2 つあります。

**Incoming は限定的という意味ではありません。** Unified incoming viewing key の対象範囲は、尋ねられた 1 つのアドレスではなくアカウント全体です。単一の Sapling アドレスのために UIVK をエクスポートしても、そのアカウント内のすべてのプールにまたがる入金可視性を与えるため、名前に含まれるアドレス以上の情報を開示します。[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) でもこの点は明示されています。

**公開されたアドレスは、将来の攻撃者に対してはすでにその incoming viewing key を露出しています。** [ZIP 326](https://zips.z.cash/zip-0326) では、量子コンピューターを持つ攻撃者が、公開された diversified address から incoming viewing key を復元できる可能性があると述べています。これは nullifier key の復元とは異なり、現実的です。現在においてアドレスを公開することは viewing key を公開することと同義ではありませんが、十分に長い時間軸では両者の距離は近づきます。

## Ironwood 後の Viewing Keys

NU6.3 では Ironwood シールドプールが導入され、Orchard プールは spend-only になったため、資金は時間とともに一方から他方へ移行します。アップグレード自体については [Ironwood](/zcash-tech/ironwood) および [The turnstile](/zcash-tech/the-turnstile) を参照してください。

**Ironwood 前に発行された Viewing Key も、移行後に引き続き機能します。** ZIP 326 では、receiver とそれに対応する incoming viewing key はプールではなく Orchard *protocol* にスコープされると定めています。つまり、同じ incoming viewing key が Orchard プールと Ironwood プールの両方の note ciphertext を trial-decrypt できます。Zallet もそのように実装しており、Ironwood notes を Orchard 形状として扱い、Ironwood note-encryption domain の下でアカウントの Orchard viewing keys により trial-decrypt すると説明しています。

キーを保有する人、あるいは発行する人にとっての帰結は 3 つあります。

1. **残高はプール間を移動し、その様子を閲覧者は見ることになります。** [ZIP 318](https://zips.z.cash/zip-0318) では、移行は小口で意図的に均一化された Orchard から Ironwood への一連の取引として規定されており、ランダム化されたスケジュールでブロードキャストされます。各取引は 1 つの Orchard note を消費し、標準化された額面の 1 つの Ironwood output を生成します。Viewing Key で監査する側には、保有資産が数週間かけて段階的に一方のプールから他方へ移るように見え、単一の移動には見えません。ウォレットは、自身の Viewing Keys を使ってチェーンデータから自分自身の移行進捗を再構築できます。
2. **移行の各ステップでは、移動する価値が明らかになります。** これは turnstile を通過することに本質的に伴うものであり、そのため移行が監査可能になります。残高を標準的な額面に分割することで、単一の取引が Orchard プール全体の残高を明かしてしまうことはありません。
3. **Ironwood 後に作成されたアカウントでは、キー導出方法が異なる可能性があります。** [ZIP 2005](https://zips.z.cash/zip-2005) では量子回復可能キーのための `use_qsk` フラグが追加され、incoming、outgoing、および diversifier keys の導出方法が変更されるため、`use_qsk = true` のキーは本当に別種のキーになります。ZIP 326 では、このフラグはアカウント全体で統一されていなければならず、Mainnet で NU6.3 が有効化される前に `use_qsk = true` のキーを生成することを禁じています。したがって、Ironwood 前から存在していたアカウントからエクスポートされたキーは `use_qsk = false` のキーであり、そのアカウントに対して引き続き正しいままです。あるアカウントからエクスポートしたキーが、別のアカウントも表していると考えてはいけません。

## Viewing Key のエクスポート

### Zallet

[Zallet](https://github.com/zcash/zallet) は、zcashd 内蔵ウォレットの後継となったフルノードウォレットです。Viewing Key のエクスポートとインポートは **v0.1.0-beta.2（2026年7月28日）** で導入されたため、まずバージョンを確認してください。それ以前のビルドにはこれらのメソッドがありません。メソッド名の後に続くすべての引数は有効な JSON である必要があり、文字列値にはそれ自体の二重引用符が必要です。一般的なコマンド形式については [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) を参照してください。

ウォレットが保持しているものを一覧表示します。

```bash
zallet rpc listaddresses
```

Unified Address を渡して、そのアカウントの unified full viewing key をエクスポートします。

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

代わりに、そのアカウントの unified incoming viewing key をエクスポートするには、オプションの `ivk` 引数を使います。

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling アドレスを渡すと、そのアカウントの Sapling extended full viewing key（`zxviews…`）が返され、これは旧 zcashd の挙動と一致します。文書化されている制限は 2 つあります。Sprout アドレスは拒否されること、そして view-only としてインポートされたアカウント自身からは Sapling extended full viewing key をエクスポートできないことです。これはウォレットがそれを再構築できないためです。`ivk` 形式は、インポートされた view-only アカウントでも機能します。

### ウォレットの独自インターフェースから Viewing Keys をエクスポートするもの

[Wallets](/using-zcash/wallets) ページでは、各ウォレットの Viewing Key サポート状況と Ironwood 対応状況を追跡しています。本稿執筆時点で、Viewing Key サポートと **Ironwood: Ready** の両方が記載されているウォレットには、ZODL、Zingo!、Zkool、Cake、Zallet、Zecd、Nozy が含まれます。対応状況は変化するため、特定のウォレット 1 つに依存する前に、このページを本ページより優先して確認してください。

## Viewing Key を watch-only アカウントとしてインポートする

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) は、unified keys と legacy keys の両方を受け付けるため、ここでは最も柔軟な選択肢です。その README には、**unified viewing key** または **Sapling extended viewing key** から作成する view-only アカウントが、zcashd からエクスポートされた legacy shielded extended keys と並んで記載されています。新しいアカウントを追加し、view-only の経路を選び、`uview…` または `zxviews…` キーを貼り付けると、そのアカウントは同期し、支出権限なしで残高と履歴を表示します。

Ironwood プロトコル対応と Orchard から Ironwood への移行は、Zkool 6.24.0（2026年7月20日）で導入され、6.26.1（2026年8月2日）でメモリプール内の Ironwood 取引検知が修正されました。6.26.1 以降を使用してください。

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

2 番目の引数は再スキャン方針で、`"whenkeyisnew"`（デフォルト）、`"yes"`、`"no"` のいずれかです。3 番目は再スキャン開始ブロック高です。Zallet はこのキーを view-only アカウントとしてインポートし、支出権限なしで、そのアドレスの入出金取引を追跡します。

**Zallet がインポートできるのは Sapling extended full viewing keys のみです。** `uview…` の unified full viewing key は、エクスポートはできてもインポートはできません。Unified アカウント全体への読み取りアクセスを渡したい場合は、Zallet から UFVK をエクスポートし、Zkool のように unified keys を受け付けるウォレットへインポートしてください。

## 何が変わったのか、そしてもう探すのをやめるべきもの

このページの古い版や、その翻訳を参考にしていた場合、3 つの方法はもはや使えません。

- **`zcash-cli z_exportviewingkey` と `z_importviewingkey`。** zcashd は 2026年7月18日にサポート終了による停止に達し、現在は動作しません。代替は Zallet の同名メソッドです。詳しくは [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) を参照してください。
- **Ywallet の手順。** Wallets ページでは、Ywallet は **Ironwood: Not Ready** とされているため、Ironwood 時代の Viewing Keys について案内するウォレットとしては適切ではありません。同じ開発者による Zkool は同じ範囲のキーを受け付け、Ready とされています。
- **zcashblockexplorer.com/vk。** このサービスは無効な証明書付きで HTTP 503 を返しており、置き換えではなく廃止されました。Viewing Key をウェブサイトに貼り付けることは、そのウェブサイトの運営者に自分の取引履歴全体を渡すことを意味し、旧ページの 3 つの選択肢の中でも常に最も弱い方法でした。代わりに、自分で運用するウォレットへキーをインポートしてください。

## リソース

Viewing Keys は必要なときに必要な範囲で使い、問われている内容に答えるために必要最小限のキーを優先してください。

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Viewing Keys が Orchard プールと Ironwood プールをまたいでどう振る舞うか
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard プールと Ironwood プールを定義
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — どのリリースでどの RPC メソッドが追加されたか
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 対応するアカウント種別とキー種別
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
