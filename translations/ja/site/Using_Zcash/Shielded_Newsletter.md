<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# シールドされたニュースレター

> Zallet を使用して、シールドされたアドレスのリストに Markdown のメモを Zcash メモとして送信します。受信者リストとメモはトランスペアレントアドレスに残りません。

シールドされたニュースレターは、一連のシールドされたトランザクションです。各出力は受信者の Unified Address にごく少額を支払い、メモフィールドにはメモの次の断片を格納します。Zallet はこれらのトランザクションを構築して送信します。Zebra と Zaino はチェーンデータのみを提供します。

スクリプトは [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter) にあります。これらは初期の Zallet 向けに書かれたものであり、現行リリースに対してそのまま実行しても安全ではありません。このページが更新後の手順です。2026年10月7日時点で、Zallet `v0.1.0-beta.3` および Zallet のブックに照らして確認済みです。

## 必要なもの

- 完全に同期され、RPC が localhost にバインドされた Zebra。
- その Zebra ノードに対して同期された Zaino。
- RPC が localhost にバインドされた、ウォレットビルドの Zallet `v0.1.0-beta.3` 以降。ブックでは `z_sendmany` が実装済みとして記載されています。数値の手数料は拒否されます。`fee` を渡す場合は `null` でなければなりません。これは Zallet が常に ZIP 317 手数料を使用するためです。
- Unified Address でシールドされた資金を使用できる、資金のあるアカウント。
- 受信者の Unified Address。トランスペアレントアドレス上のメモはエラーになります。

資金のあるアドレスや Cookie を wiki またはコミットするスクリプトに記載しないでください。現行の `txBuilderFromFile.sh` には Unified Address がハードコードされています。ローカルで置き換え、コミットしないでください。

## Zallet の設定

実行している Zallet で設定を生成し、それを Zebra と Zaino に向けます。古いチュートリアルのサンプルでは、`as_of_version = "0.0.0"` と個人用ホームパスを使用しています。そのファイルはテンプレートではなく、スナップショットとして扱ってください。

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` には `z_sendmany`、`z_getoperationstatus`、および `z_getoperationresult` を列挙する必要があります。RPC は `127.0.0.1` にのみバインドしてください。

## 受信者リスト

1行につき1つの Unified Address を記載し、引用符と空行は使用しません。スクリプトは `daoAddresses.md` を読み取ります。古い readme には `daoAddress.md` と書かれています。このファイルはリポジトリ内になく、名前も一致しません。

```text
u1...
u1...
```

## 1つのメモを送信する

`z_sendmany` は非同期です。操作 ID を返します。ステータスが `success` またはエラーになるまで `z_getoperationstatus` をポーリングしてください。スクリプトが行う固定の5秒待機では、構築により長くかかった場合に結果を失います。`z_getoperationresult` は操作を消費するため、ステータスが終端状態になるまで呼び出さないでください。

手数料は省略します。Zallet が ZIP 317 を計算します。数値を渡さないでください。

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

メモフィールドは生の16進数で、最大512バイトです。`ascii2hex` は ASCII のみをエンコードします。ASCII 以外の文字を含むメモは失敗します。`xxd` または `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` が UTF-8 を処理します。

プライバシーポリシーのデフォルトは `FullPrivacy` です。これはシールドされた受信者に対する適切なデフォルトです。`AllowFullyTransparent` を渡さないでください。

## スクリプトの不具合

これらは2026年10月8日時点でツリー内にあります。修正されるまで `shieldNewsletter.sh` を実行しないでください。

- `[[ bytesInFile -lt 512 ]]` に `$` がありません。単一メモの分岐は一度も実行されません。
- チャンクループは16進数を保存し、その後 `hex2ascii` がそれをデコードし、さらに `txBuilderFromFile.sh` が再度エンコードします。後続の行が512を超えない限り、最後のチャンクはフラッシュされません。長い行は分割されません。行全体が送信され、512バイトのメモ上限を超える可能性があります。
- `txBuilderFromFile.sh` は設定パスなしで `./zallet rpc` を呼び出し、バイナリがカレントディレクトリにあることを想定します。`zallet -c <config> rpc` を使用してください。
- `toCurl.sh` は Cookie を使用してポート8232上の Zebra と通信し、`getinfo` と `sendmany` を呼び出します。Zallet は `sendmany` を提供しません。採掘待機ループも `$` なしで `[[ chainHeight -gt temp ]]` を使用するため、待機しません。
- `z_gettotalbalance 0 true` は追加の位置引数として渡されます。その呼び出しを使用する前に、実行するバイナリ上の `rpc help z_gettotalbalance` を確認してください。
- 各チャンクは、すべての受信者に `0.0001` ZEC を送信します。ZIP 317 手数料はこれに加算されます。多数のアドレスに長いメモを送ると、ダスト額より多くを消費します。

## 修正後

修正済みのランナーは次を行う必要があります。

1. メモをバイトとして読み取り、行単位ではなく512バイト境界で分割する。
2. 各チャンクを一度だけ16進数エンコードする。
3. 資金のある UA、受信者配列、手数料引数なしで `zallet -c <config> rpc z_sendmany` を呼び出す。
4. その操作 ID に対して `z_getoperationstatus` をポーリングする。
5. `success` の後でのみ txid を記録する。

古いチュートリアルページは [シールドされたニュースレターのスクリプト](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md) に残っています。手順についてはこのページを使用してください。
