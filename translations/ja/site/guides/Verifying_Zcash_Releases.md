<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash リリースの検証

## 要点

- Zcash バイナリをダウンロードすることは、プロジェクトが公開したそのものを入手したことと同じではありません。両者を見分けるのが検証です。
- チェックサムはファイルが完全な状態で届いたことを証明します。**署名** は、それを誰が作成したかを証明します。必要なのは両方であり、チェックサム単体では証明できることはごくわずかです。
- Zebra は `SHA256SUMS` ファイルに加え、リリースを特定の GitHub Actions ワークフロー、タグ、コミットに結び付ける **Sigstore** バンドルを公開しています。鍵管理は不要です。
- Zallet は、SLSA provenance と SBOM とともに、分離された **GPG** 署名（`.asc`）を公開しています。
- Zcash の署名鍵は 2026 年に Electric Coin Company から Zcash Open Development Lab (ZODL) へローテーションされました。以前のリリースを検証していた場合は、新しい鍵が必要です。そして引き継ぎ声明は両方の鍵で署名されているため、ローテーション自体も検証できます。
- `gpg` は、告知で名前が挙がる主鍵ではなく、ファイルに署名した **サブキー** を報告します。見覚えのないフィンガープリントが表示されても、たいていは攻撃ではなくサブキーです。
- 検証に失敗した場合は、そのバイナリを実行しないでください。

*2026-08-18 時点で Zebra `v6.3.0` および Zallet `v0.1.0-beta.2` に対して確認済み。*

## これはなぜ Zcash ではより重要なのか

改ざんされたウォレットのバイナリは、spending key や viewing key を流出させる可能性があります。漏洩したパスワードとは異なり、この損失は恒久的です。ロールバックも、チャージバックも、サポート窓口もありません。シールドされたトランザクションが保護するのは *オンチェーン* で起きることだけであり、あなたが実行しているソフトウェアが手元に届く前にすり替えられていた場合、それに対する保護はまったくありません。

これは、プロトコルのプライバシー保証が単純に無関係になってしまう数少ない攻撃経路の 1 つです。それをカバーする層が検証です。

## 脅威モデル — 検証で検出できるものとできないもの

**検出できるもの:**

- 改ざんされたミラー、またはプロジェクトのリリースページ以外から配布された改変済みファイル。
- ダウンロード中の中間者攻撃による差し替え。
- 侵害された CDN や乗っ取られた配布ホスト。
- 転送中の偶発的な破損。

**検出できないもの:**

- 悪意あるコードに署名するメンテナー。署名は正しく検証されます。署名が証明するのは出所であり、意図ではありません。
- 署名済みだが悪意ある成果物を生成する、侵害されたビルドホスト。これを狭めるためにあるのが再現可能ビルドと provenance attestation です。
- バイナリと同じ侵害元から取得した鍵。攻撃者がファイルと、それを照合する鍵の両方を支配しているなら、検証は何も教えてくれません。

最後の点は、多くのガイドが見落としているものです。**鍵をどこから取得するかは、コマンドを実行することと同じくらい重要です。**

---

## パート 1 — Zebra: チェックサムと Sigstore

Zebra は各リリースについて次のアセットを公開しています。

| Asset | Purpose |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | バイナリアーカイブ |
| `zebrad-<version>-<arch>.tar.gz.sha256` | ファイルごとのチェックサム |
| `SHA256SUMS` | すべてのアーキテクチャ向けのチェックサム |
| `SHA256SUMS.sigstore.json` | `SHA256SUMS` に署名する Sigstore バンドル |

### ステップ 1 — ダウンロード

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### ステップ 2 — チェックサムを確認する

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

実際の出力:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

ここでは `SHA256SUMS` がすべてのアーキテクチャを対象にしていて、ダウンロードしたのは 1 つだけなので、`--ignore-missing` が必要です。これがないと、`sha256sum` は存在しない aarch64 アーカイブを失敗として報告し、成功を失敗と読み違えるおそれがあります。

ファイル単位のバリアントでも動作します。

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**このステップだけでは不十分です。** チェックサムもバイナリと同じ場所からダウンロードしています。片方を差し替えられる者は、もう片方も差し替えられます。チェックサムが証明するのは完全性であり、次のステップが証明するのは出所です。

### ステップ 2b — Windows で同じ確認を行う

PowerShell には `-c` のような検証モードがないため、手動で比較します。

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

実際の出力:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

これを、このページの前半にある Linux の結果と比較してください。

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**値は同一です。** 16 進数では大文字小文字は区別されず、これは Windows で最もよくある誤警告です。

Windows 固有の落とし穴はさらに 2 つあります。

- **確認すべき終了コードがありません。** Linux では `sha256sum -c` は失敗時に 1 を返すため、スクリプトで対処できます。`Get-FileHash` はハッシュを表示するだけで、比較するのは自分自身であり、ざっと見て見誤るのも自分です。
- **64 文字の 16 進数を目視で読むのは信頼できません。** シェルにやらせてください。

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS の場合:** ワークフローは同じですが、BSD userland には `sha256sum` ではなく `shasum` が入っているため、`shasum -a 256 -c --ignore-missing SHA256SUMS` を使ってください。このページの著者は macOS マシンを使えなかったため、このコマンドは実行結果ではなく Apple のツール仕様に基づいて記載されています。macOS で検証した場合は、正しいかどうかを確認または修正する PR をぜひ開いてください。

### ステップ 3 — Sigstore バンドルを検証する

Sigstore は、長期署名鍵を、CI のアイデンティティに結び付いた短命証明書と公開透明性ログの記録で置き換えます。盗まれ得るリリース鍵を誰かが保持することはありません。

最も直接的な方法は `cosign` を使うことです。

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

2 つの `--certificate-*` フラグこそが要点です。**これがなければ、どこかの誰かがそのファイルに署名したことを確認しているだけです。** これらがあることで、GitHub の OIDC issuer によって認証された、Zebra リポジトリ内のワークフローが署名したことを確認できます。

> ⚠️ **バージョンが重要です。** 古い cosign ビルドは現在の Sigstore バンドル形式を読み取れません。cosign `v2.4.1` で上記を実行すると、次のようになります。
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> バンドルには実際に証明書が含まれています。場所は `verificationMaterial.certificate.rawBytes` ですが、古いリリースはそこを見に行きません。これはクライアント側の制限であり、壊れたリリースではありません。これに遭遇したら、ダウンロードが不正だと結論づけるのではなく cosign をアップグレードしてください。ディストリビューション同梱版の cosign は upstream から大きく遅れていることがよくあります。

次の 2 ステップでは、同じバンドルを手作業で検証する方法を示します。これは仕組みを理解する上で有益であり、cosign ビルドがうまく動かない場合の現実的な代替手段にもなります。

### ステップ 4 — 証明書が実際に何を主張しているかを読む

`cosign` を使わずにバンドルを調べることができます。これは、何を信頼しているのかを理解するのに役立ちます。まず証明書を抽出します。

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Zebra v6.3.0 の実際の出力:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name がアイデンティティです。ここにはリポジトリ、正確なワークフローファイル、タグが記されています。Sigstore はさらに、カスタム拡張にビルドメタデータを埋め込んでいます。

| Field | Value for v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| ソースリポジトリ | `https://github.com/ZcashFoundation/zebra` |
| ビルドコミット | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| ランナー環境 | `github-hosted` |
| ワークフロー実行 | `.../actions/runs/31424510487/attempts/1` |
| リポジトリの可視性 | `public` |

これらはすべて検証可能です。コミットハッシュはリポジトリ内のタグと一致するべきですし、ワークフロー実行は存在し、公開されているべきです。

### ステップ 5 — 署名を暗号学的に検証する

OpenSSL で署名を直接確認できます。

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

実際の出力:

```
Verified OK
```

バンドルには、署名対象のダイジェストも記録されています。ローカルファイルと一致することを確認してください。

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### ステップ 6 — 透明性ログのエントリ

このバンドルには、署名が公開の追記専用ログに公開されたことを証明する Rekor エントリも含まれています。

| Field | Value |
|---|---|
| Rekor ログインデックス | `2412071838` |
| エントリ種別 | `hashedrekord v0.0.1` |
| 統合日時 | 2026-08-10 19:43:09 UTC |

これにより、鍵の不正使用を黙って行うことが発見可能になります。ログに一度も現れない署名や、あり得ない時刻に現れた署名は、対処する価値のあるシグナルです。統合時刻をリリース告知と照らし合わせてください。

> **OpenSSL を使う方法についての注意:** これは証明書の公開鍵に対して署名を検証しますが、それだけでは Sigstore ルートへの証明書チェーンの検証も、ログエントリの inclusion proof の確認も行いません。`cosign verify-blob` はこの 3 つをすべて行います。OpenSSL は仕組みの理解に使い、実際の確認には `cosign` を使ってください。

---

## パート 2 — Zallet: GPG 署名

Zallet は異なる種類のアセットを公開しています。

| Asset | Purpose |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | バイナリアーカイブ |
| `.tar.gz.asc` | 分離された GPG 署名 |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | provenance メタデータ |
| `.tar.gz.sbom.spdx` | ソフトウェア部品表 |

### ステップ 1 — 探し始める前に署名鍵を特定する

まず、鍵をインポートせずに *先に* 検証を実行してください。

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

実際の出力:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

これは失敗ではありません。署名が存在すること、そして必要な鍵がどれかを、**探し始める前に** 正確に示してくれます。フィンガープリントと issuer を控え、その後でダウンロード元とは独立したソースから鍵を取得してください。

> `gpg` はタイムスタンプをローカルタイムゾーンで表示します。上の出力は `WAT`（UTC+1）を示していますが、別の場所では同じ署名が `18:18:44 UTC` と表示されます。同じ瞬間です。タイムゾーンの違いを不一致と見なさないでください。

### ステップ 2 — 鍵をインポートして検証する

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

実際の出力:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

求めていたのは `Good signature` です。この出力には、人を混乱させやすい点が 2 つありますが、どちらも正常です。

### フィンガープリントが告知と一致しない理由

ZODL の鍵移行声明には、フィンガープリント `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` が記されています。しかし `gpg --verify` が報告したのは `1FE9 9324 …  23F0 617F` でした。これは不一致に見えますが、そうではありません。

`gpg` が報告するのは、署名を行った **サブキー** です。告知に記載されるのは **主鍵** です。その関係は自分で確認できます。

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

実際の出力:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

`sub` 行が署名用サブキー、`pub` 行が主鍵です。1 つのアイデンティティ、1 つの鍵パッケージです。だからこそ検証出力は **両方** のフィンガープリントを表示します。公開された告知と比較すべきなのは *主鍵* であり、サブキーの行は鍵のどの部分が実際に署名したかを示しています。

このような鍵の分離は意図的なものです。署名用サブキーは、主鍵のアイデンティティや積み上がった信頼を捨てることなく、ローテーションまたは失効できます。

### `[unknown]` の警告が意味すること

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

これは署名に問題があるという意味では **ありません**。署名は暗号学的に有効であり、それは `Good signature` が示しています。この警告が言っているのは別のことです。あなたのローカル GnuPG は、この鍵が名乗っている相手のものであるとまだ信じる設定になっていない、ということです。

GnuPG は 2 つの問いを分けて扱います。

1. **この鍵がこのファイルに署名したか？** — `Good signature` が答えます。暗号学的なもので、人間の判断は不要です。
2. **この鍵は ZODL のものか？** — これは暗号だけでは答えられません。独立したソースとフィンガープリントを照合することで確立します。

この警告は、鍵に対して明示的にローカル署名を行わない限り、ほぼすべての検証で表示されます。失敗と見なさないでください。`Good signature` が出ない場合は、**失敗と見なしてください**。

### ステップ 3 — 鍵移行そのものを検証する

Zcash のリリース署名は、2026 年 1 月に former ECC engineering and product team によって ZODL が設立された後、2026 年に Electric Coin Company から Zcash Open Development Lab へ移行しました。

| | Old key | New key |
|---|---|---|
| フィンガープリント | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| 種別 | RSA 3072-bit、作成日 2023-06-19 | RSA 4096-bit、作成日 2026-03-23、有効期限 2028-03-22 |
| 公開場所 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

公開タイムライン: 新鍵生成は 2026-03-23、告知は 2026-03-27、独占署名開始は 2026-04-23、旧 ECC 鍵の失効予定は 2026-06-23。

ウェブサイト上のローテーション告知は、そのウェブサイトと同程度にしか信頼できません。正しい仕組みは、**両方の鍵で clear-sign された声明** です。つまり旧鍵が新鍵を保証する形です。ZODL はまさにそれを公開しています。

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

実際の出力（抜粋 — 1 つの文書に 2 つの署名）:

```
gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE
gpg:                issuer "sysadmin@z.cash"
gpg: Good signature from "Zcash Master Signing Key (Electric Coin Company) <sysadmin@z.cash>" [unknown]
Primary key fingerprint: B1C9 095E AA18 48DB B54D  9DDA 1D05 FDC6 6B37 2CFE

gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

1 つの文書に対して、旧鍵と新鍵の両方から 2 つの `Good signature` が出ています。以前のリリースで ECC 鍵を信頼していたなら、その信頼は `zodl.com` や `apt.z.cash` やフォーラム投稿を信頼しなくても、ZODL 鍵へと引き継がれます。プロジェクトが鍵をローテーションする際に探すべき性質はこれであり、これが欠けているなら質問する価値があります。

### 鍵はどこから取得すべきか、どこから取得すべきでないか

良いものから悪いものの順:

1. **前の鍵で署名された声明**。上記のようなものです。ローテーション後としては最も強い選択肢です。
2. **ダウンロード元とは独立したソース。** バイナリは GitHub から、鍵は `apt.z.cash` から。攻撃者は両方を支配する必要があります。
3. **公開済みフィンガープリントと照合した上での鍵サーバー。** ほとんどの鍵サーバーでは、誰でも任意のアイデンティティを名乗る鍵をアップロードできます。これを安全にするのはフィンガープリント照合であって、鍵サーバーそのものではありません。
4. **バイナリと同じページ。** ほとんど保証になりません。片方を差し替えられる者は、もう片方も差し替えられます。

比較するのは必ず **完全な** フィンガープリントと **主鍵** です。短い key ID は容易に衝突させることができ、実際の攻撃にも使われてきました。

## パート 3 — 失敗する検証

検証は、失敗がどのように見えるかを知っていて初めて役に立ちます。以下は、有効なアーカイブに null byte を 1 つ追加して生成した実例です。

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

実際の出力:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

終了コード: `1`。

2 つのダイジェストを並べてみてください。

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676 バイトのファイルに 1 バイト追加しただけです。2 つのハッシュには共通点がありません。接頭辞も、パターンもありません。部分一致も「ほぼ同じ」もなく、チェックサムは完全一致するか、さもなければそのファイルは求めていたファイルではありません。

### こうなったときにすべきこと

1. **バイナリを実行しないでください。** 展開も、`chmod +x` もしてはいけません。
2. **公式リリースページから再度試してください。** ほとんどの失敗はダウンロードの途中切れです。
3. **2 回目も失敗したら、ネットワーク経路を変えてください。** 別の接続、または VPN です。ネットワークをまたいでも再現する失敗と、そうでない失敗は意味が異なります。
4. **正しいバージョンに対する正しいチェックサムファイルを使っているか確認してください。** v6.3.0 を v6.2.3 のチェックサムと比較すれば、正しく失敗します。
5. **それでも失敗するなら報告してください。** プロジェクトのリポジトリに issue を開くか、意図的なものが疑われる場合は `SECURITY.md` のセキュリティ連絡先を使ってください。公開チャネルについては [Zcash エコシステムのセキュリティ](/zcash-community/zcash-ecosystem-security) ページを参照してください。
6. **成果物は保持してください。** 改ざんされたバイナリは証拠です。報告前に削除しないでください。

署名失敗は、チェックサム失敗より重大です。チェックサム不一致は通常は破損ですが、有効なファイルなのに署名だけが不正という事態は偶然には起きません。

---

## パート 4 — 参照表

| Project | Releases published at | Method | Where the key comes from |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore バンドル | 鍵は不要 — GitHub OIDC 経由の CI アイデンティティ |
| **Zallet** | `github.com/zcash/zallet/releases` | 分離された GPG `.asc`、SLSA provenance、SBOM | `apt.z.cash/zodl.asc` — 主鍵 `0338 34DD…58E2 6AB1`、署名用サブキー `1FE9 9324…23F0 617F` |
| **zcashd** | *retired* | — | 2026-07-18 にブロック 3,417,100 で停止。インストールしないでください。 |
| **Zodl** (formerly Zashi) | App Store / Google Play; `zodl-inc` on GitHub | ストア署名; スタンドアロン Android バイナリは GPG 署名付き | 移行声明に従った ZODL 鍵 |

> **名称に関する注記:** Zashi は 2026 年に **Zodl** へリブランディングされました。最初は App Store、その後 Google Play です。古いガイドで "Zashi" と書かれているものは、同じウォレット系統を指しています。

---

## パート 5 — モバイルウォレットとハードウェアウォレット

直接ダウンロードを離れると、検証の仕組みは変わります。

**アプリストア。** 自分で署名を確認することはできません。パッケージにはストアが署名するため、信頼しているのはストアの審査と開発者アカウントの完全性です。*確認できる* のは、正しいアプリを入手しているかどうかです。検索結果ではなく、プロジェクトの公式サイトに対して、発行元名とパッケージ識別子を確認してください。なりすましアプリは一般的であり、ストア掲載は真正性の証拠ではありません。

**スタンドアロン Android APK。** これらは検証 *できます*。ZODL は GitHub Releases 経由で GPG 署名付きのスタンドアロン Android バイナリを公開しているため、パート 2 のワークフローが適用できます。検証可能なチェーンを望むなら、この経路を優先してください。

**ハードウェアウォレット。** デバイス自身が自分のファームウェアを証明するため、信頼の起点はあなたのマシン上のファイルではなくハードウェアです。デバイス検証の流れについては [Keystone Zashi](/guides/keystone-zashi) を参照してください。製造元から直接購入してください。サプライチェーン改ざんは工場と購入者の間で起こります。

---

## 参考資料

- [Zcash エコシステムのセキュリティ](/zcash-community/zcash-ecosystem-security) — 開示ポリシーとセキュリティ連絡先
- [Zebra フルノード](/zcash-tech/zebra-full-node) — 検証後に Zebra をインストールする
- [Zallet クイックリファレンスガイド](/using-zcash/zallet-quick-reference-guide) — Zallet の使い方
- [Sigstore documentation](https://docs.sigstore.dev/)
- [SLSA provenance levels](https://slsa.dev/)

---

*このページのコマンドは 2026-08-18 に Zebra `v6.3.0` および Zallet `v0.1.0-beta.2` に対して実行されました。リリースツールは変更されることがあります。出力がここに示したものと異なる場合は、あなた自身の実行結果を信頼し、PR を開いてください。*
