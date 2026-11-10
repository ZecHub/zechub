<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# シールドされたニュースレター（Shielded Newsletter）

> Zalletを使用して、Zcashのメモ（memo）として、Markdownノート（note）をシールドされたアドレス（shielded addresses）のリストに送信します。受信者リストとノートは公開型（transparent）アドレスに残りません。

シールドされたニュースレターは、一連のシールドされたトランザクション（transaction）です。各出力は受信者の統合アドレス（Unified Address）に少額を支払い、メモ欄にノートの次の断片を格納します。Zalletがこれらのトランザクションを構築して送信します。ZebraとZainoはチェーン（chain）データのみを提供します。

スクリプトは[`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter)にあります。これらは初期のZallet向けに書かれており、現行リリースに対してそのまま実行しても安全ではありません。このページは更新された手順です。2026年10月7日時点で、Zallet `v0.1.0-beta.3`およびZalletの書籍に対して確認済みです。

## 必要なもの

- Zebraが完全に同期済みで、RPCがlocalhostにバインドされていること。
- ZainoがそのZebraノード（node）に対して同期されていること。
- Zallet `v0.1.0-beta.3`以降のウォレット（wallet）ビルドで、RPCがlocalhostにバインドされていること。書籍では`z_sendmany`が実装済みとして記載されています。数値の手数料（fee）は拒否されます。`fee`を渡す場合は`null`でなければなりません。これはZalletが常にZIPの317手数料を使用するためです。
- シールドされた資金を使用できる統合アドレスを持つ、資金が入ったアカウント。
- 受信者の統合アドレス。公開型アドレス上のメモはエラーになります。

資金が入ったアドレスやCookieをwikiまたはコミット済みのスクリプトに記載しないでください。現在の`txBuilderFromFile.sh`には統合アドレスがハードコードされています。ローカルで置き換え、コミットしないでください。

## Zalletを設定する

実行中のZalletで設定を生成し、ZebraとZainoを指すようにします。古いチュートリアルのサンプルでは、`as_of_version = "0.0.0"`と個人用ホームパスを使用しています。そのファイルはテンプレートではなくスナップショットとして扱ってください。

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help`には`z_sendmany`、`z_getoperationstatus`、および`z_getoperationresult`が列挙されていなければなりません。RPCは`127.0.0.1`のみにバインドしてください。

## 受信者リスト

1行につき1つの統合アドレスを記載し、引用符や空行は使用しません。スクリプトは`daoAddresses.md`を読み取ります。古いreadmeには`daoAddress.md`と記載されています。このファイルはリポジトリ内になく、名前も一致しません。

```text
u1...
u1...
```

## 1つのメモを送信する

`z_sendmany`は非同期です。これは操作IDを返します。ステータスが`success`またはエラーになるまで`z_getoperationstatus`をポーリングしてください。スクリプトが行う固定の5秒間スリープでは、ビルドにより長い時間がかかる場合に結果を失います。`z_getoperationresult`は操作を消費するため、ステータスが終端になるまで呼び出さないでください。

手数料は省略されます。ZalletがZIPの317を計算します。数値を渡さないでください。

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

メモ欄は生の16進数で、最大512バイトです。`ascii2hex`はASCIIのみをエンコードします。ASCII以外の文字を含むノートは失敗します。`xxd`または`python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'`はUTF-8を処理します。

プライバシー（privacy）ポリシーのデフォルトは`FullPrivacy`です。これはシールドされた受信者にとって適切なデフォルトです。`AllowFullyTransparent`を渡さないでください。

## スクリプトの不具合

これらは2026年10月8日時点でツリー内にあります。修正されるまで`shieldNewsletter.sh`を実行しないでください。

- `[[ bytesInFile -lt 512 ]]`には`$`がありません。単一メモの分岐は決して実行されません。
- チャンクループは16進数を保存し、次に`hex2ascii`がそれをデコードし、その後`txBuilderFromFile.sh`が再度エンコードします。後続の行が512を超えない限り、最後のチャンクはフラッシュされません。長い行は分割されません。行全体が送信され、512バイトのメモを超える可能性があります。
- `txBuilderFromFile.sh`は設定パスなしで`./zallet rpc`を呼び出し、バイナリがカレントディレクトリにあることを想定しています。`zallet -c <config> rpc`を使用してください。
- `toCurl.sh`はCookieを用いてポート8232のZebraと通信し、`getinfo`および`sendmany`を呼び出します。Zalletは`sendmany`を提供しません。マイニング（mining）待機ループも`$`なしで`[[ chainHeight -gt temp ]]`を使用しているため、待機しません。
- `z_gettotalbalance 0 true`は追加の位置引数として渡されます。この呼び出しを使用する前に、実行するバイナリ上で`rpc help z_gettotalbalance`を確認してください。
- 各チャンクは、すべての受信者に`0.0001` ZECを送信します。ZIPの317手数料はこれに加算されます。多数のアドレスに長いノートを送ると、ダスト額より多くを消費します。

## 修正後

修正済みのランナーは、次を行う必要があります。

1. ノートをバイトとして読み取り、行単位ではなく512バイト境界で分割します。
2. 各チャンクを1回だけ16進数エンコードします。
3. 資金が入ったUA、受信者配列、および手数料引数なしで`zallet -c <config> rpc z_sendmany`を呼び出します。
4. その操作IDに対して`z_getoperationstatus`をポーリングします。
5. `success`の後にのみtxidを記録します。

古いチュートリアルページは[シールドされたニュースレターのスクリプト](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md)に残っています。手順にはこのページを使用してください。
