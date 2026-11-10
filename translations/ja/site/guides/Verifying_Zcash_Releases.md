<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash リリースの検証

## 要約

- Zcash バイナリをダウンロードしても、それがプロジェクトが公開したものと同じであるとは限りません。検証により、この違いを判断できます。
- チェックサムはファイルが完全な状態で届いたことを示します。**署名（signature）**は、誰がそれを作成したかを示します。両方が必要であり、チェックサムだけではほとんど何も証明できません。
- Zebra は、`SHA256SUMS` ファイルと、リリースを特定の GitHub Actions ワークフロー、タグ、コミットに結び付ける **Sigstore** バンドルを公開しています。鍵管理は不要です。
- Zallet は、SLSA プロベナンスおよび SBOM とともに、分離された **GPG** 署名（`.asc`）を公開しています。
- Zcash の署名鍵は、2026年に Electric Coin Company から Zcash Open Development Lab（ZODL）へローテーションされました。古いリリースを検証した場合は新しい鍵が必要です。また、引き継ぎ声明には両方の鍵で署名されているため、ローテーション自体も検証できます。
- `gpg` は、告知で名前が挙げられている主鍵ではなく、ファイルに署名した **サブキー（subkey）**を報告します。見慣れないフィンガープリントは、通常は攻撃ではなくサブキーです。
- 検証に失敗した場合は、バイナリを実行しないでください。

*Zebra `v6.3.0` および Zallet `v0.1.0-beta.2` に対して2026-08-18に検証済みです。*

## Zcash では特に重要である理由

改ざんされたウォレット（wallet）バイナリは、支出鍵またはビューイングキー（viewing key）を外部に流出させる可能性があります。侵害されたパスワードとは異なり、この損失は恒久的です。ロールバック、チャージバック、サポート窓口はありません。シールドされた（shielded）トランザクション（transaction）は、*オンチェーン（on-chain）* で起きることを保護します。しかし、実行しているソフトウェアが手元に届く前に置き換えられていた場合、まったく保護されません。

これは、プロトコルのプライバシー（privacy）保証が単純に関係しない数少ない攻撃経路の1つです。検証がこれをカバーする層です。

## 脅威モデル — 検証で検出できるものとできないもの

**検出できるもの:**

- 改ざんされたミラー、またはプロジェクトのリリースページ以外から配信された変更済みファイル。
- ダウンロード中の中間者攻撃によるすり替え。
- 侵害された CDN または乗っ取られた配布ホスト。
- 転送中の偶発的な破損。

**検出できないもの:**

- 悪意のあるコードに署名するメンテナー。署名は正しく検証されます。これは出所を示すものであり、意図を示すものではありません。
- 署名付きだが悪意のある成果物を生成する、侵害されたビルドホスト。これを限定するために再現可能ビルドとプロベナンス証明が存在します。
- バイナリと同じ侵害済みソースから取得した鍵。攻撃者がファイルと照合対象の鍵の両方を制御している場合、検証からは何も分かりません。

最後の点は、ほとんどのガイドが省略する点です。**鍵をどこから取得するかは、コマンドを実行することと同じくらい重要です。**

---

## パート1 — Zebra: チェックサムと Sigstore

Zebra は、各リリースに対して次のアセットを公開しています。

| アセット | 目的 |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | バイナリアーカイブ |
| `zebrad-<version>-<arch>.tar.gz.sha256` | ファイルごとのチェックサム |
| `SHA256SUMS` | 全アーキテクチャ向けのチェックサム |
| `SHA256SUMS.sigstore.json` | `SHA256SUMS` に署名する Sigstore バンドル |

### ステップ1 — ダウンロード

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### ステップ2 — チェックサムを確認する

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

実際の出力:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

ここでは `--ignore-missing` が必要です。`SHA256SUMS` はすべてのアーキテクチャを対象としますが、ダウンロードしたのは1つだけだからです。これがない場合、`sha256sum` は存在しない aarch64 アーカイブを失敗として報告し、成功を失敗と読み違える可能性があります。

ファイルごとのバリアントも利用できます。

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**このステップだけでは不十分です。** チェックサムはバイナリと同じ場所からダウンロードしました。一方を置き換えられる者は、もう一方も置き換えられます。チェックサムは完全性を示します。次のステップは出所を示します。

### ステップ2b — Windows で同じ確認を行う

PowerShell には `-c` の検証モードがないため、手動で比較します。

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

実際の出力:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

このページの前半にある Linux の結果と比較してください。

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**値は同一です。** 16進数では大文字と小文字に意味はなく、これは Windows で最も一般的な誤警報です。

Windows 固有の注意点がさらに2つあります。

- **確認できる終了コードはありません。** Linux では、`sha256sum -c` は失敗時に1を返すため、スクリプトで処理できます。`Get-FileHash` はハッシュを表示するだけです。比較は自分で行う必要があり、流し読みで誤る可能性があります。
- **64文字の16進数を目視で読むのは信頼できません。** シェルに処理させてください。

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS の場合:** ワークフローは同じですが、BSD ユーザーランドには `sha256sum` ではなく `shasum` が含まれています。`shasum -a 256 -c --ignore-missing SHA256SUMS` を使用してください。このページの著者は macOS マシンを利用できなかったため、このコマンドは実行結果ではなく Apple のツールを基に記載されています。macOS で検証する場合は、確認または修正する PR を作成してください。

### ステップ3 — Sigstore バンドルを検証する

Sigstore は、長期存続する署名鍵を、公開トランスペアレンシーログに記録された CI アイデンティティに紐付く短期証明書で置き換えます。盗まれる可能性のあるリリース鍵を誰も保持しません。

最も簡単な方法では `cosign` を使用します。

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

2つの `--certificate-*` フラグが要点です。**これらがなければ、どこかの誰かがファイルに署名したことを確認しているだけです。** これらを指定すると、Zebra リポジトリのワークフローが、GitHub の OIDC 発行者により認証されて署名したことを確認できます。

> ⚠️ **バージョンは重要です。** 古い cosign ビルドでは、現在の Sigstore バンドル形式を読み取れません。cosign `v2.4.1` で上記を実行すると、次のようになります。
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> バンドルには実際に証明書が含まれています。これは `verificationMaterial.certificate.rawBytes` 配下にありますが、古いリリースはそこを探しません。これは壊れたリリースではなく、クライアント側の制限です。この問題に遭遇した場合は、ダウンロードが不正だと結論付けるのではなく cosign をアップグレードしてください。配布パッケージの cosign は、アップストリームより大幅に遅れていることがよくあります。

次の2つのステップでは、同じバンドルを手作業で検証する方法を示します。これは、理解しておく価値があり、cosign ビルドが動作しない場合の実用的な代替手段でもあります。

### ステップ4 — 証明書が実際に主張している内容を読む

`cosign` なしでもバンドルを調べられます。これは、何を信頼しているかを理解するのに役立ちます。証明書を抽出します。

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

サブジェクト代替名はアイデンティティです。リポジトリ、正確なワークフローファイル、タグを指定します。Sigstore は、追加のビルドメタデータをカスタム拡張機能に埋め込みます。

| フィールド | v6.3.0 の値 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

これらはすべて確認可能です。コミットハッシュはリポジトリ内のタグと一致し、ワークフロー実行は存在し公開されている必要があります。

### ステップ5 — 署名を暗号学的に検証する

OpenSSL を使って署名を直接確認できます。

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

バンドルには、署名したダイジェストも記録されています。ローカルファイルと一致することを確認してください。

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### ステップ6 — トランスペアレンシーログのエントリ

バンドルには、署名が公開された追記専用ログに公開されたことを示す Rekor エントリが含まれています。

| フィールド | 値 |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

これにより、鍵の不正使用を秘密裏に行うことが検出可能になります。ログに一度も現れない署名、または不自然な時刻に現れた署名は、対応する価値のあるシグナルです。統合時刻をリリース告知と比較してください。

> **OpenSSL を使う方法についての注意:** これは証明書の公開鍵に対して署名を検証しますが、それだけでは証明書チェーンを Sigstore のルートまで検証したり、ログエントリの包含証明を確認したりしません。`cosign verify-blob` は3つすべてを行います。仕組みを理解するためには OpenSSL を使用し、実際の確認には `cosign` を使用してください。

---

## パート2 — Zallet: GPG 署名

Zallet は異なるアセット群を公開しています。

| アセット | 目的 |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | バイナリアーカイブ |
| `.tar.gz.asc` | 分離された GPG 署名 |
| `.tar.gz.intoto.jsonl` | SLSA プロベナンス証明 |
| `.tar.gz.provenance.json` | プロベナンスメタデータ |
| `.tar.gz.sbom.spdx` | ソフトウェア部品表 |

### ステップ1 — 署名鍵を探す前に特定する

鍵をインポートせず、まず検証を実行します。

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

これは失敗ではありません。署名が存在することを示し、探し始める**前に**必要な鍵を正確に示します。フィンガープリントと発行者を記録し、ダウンロード元とは独立したソースから鍵を取得してください。

> `gpg` はタイムスタンプをローカルタイムゾーンで表示します。上記の出力は `WAT`（UTC+1）を示していますが、同じ署名は別の場所では `18:18:44 UTC` と表示されます。同じ時点です。タイムゾーンの違いを不一致として扱わないでください。

### ステップ2 — 鍵をインポートして検証する

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

`Good signature` が求めていた結果です。この出力には混乱しやすい点が2つありますが、どちらも正常です。

### フィンガープリントが告知と一致しない理由

ZODL の鍵移行声明では、フィンガープリント `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` が挙げられています。しかし、`gpg --verify` は `1FE9 9324 …  23F0 617F` を報告しました。これは不一致に見えますが、そうではありません。

`gpg` は、署名を作成した**サブキー**を報告します。告知では**主鍵**が挙げられます。関係を自分で確認してください。

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

`sub` 行は署名サブキーであり、`pub` 行は主鍵です。1つのアイデンティティ、1つの鍵パッケージです。このため、検証出力では**両方**のフィンガープリントが表示されます。公開された告知と比較するのは*主鍵*であり、サブキー行は鍵のどの部分が作業を行ったかを示します。

このように鍵を分割するのは意図的です。署名サブキーは、主アイデンティティとそれまでに蓄積された信頼を破棄せずにローテーションまたは失効できます。

### `[unknown]` の警告が意味すること

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

これは**署名の問題ではありません。** 署名は暗号学的に有効です。それが `Good signature` の意味です。この警告は別のことを示します。ローカルの GnuPG に対して、この鍵が主張する人物に属すると信じると伝えていないのです。

GnuPG は2つの問いを分けています。

1. **この鍵はこのファイルに署名しましたか？** — `Good signature` が答えます。暗号学的な問いであり、人間の判断は不要です。
2. **この鍵は ZODL に属しますか？** — 暗号学だけではまったく答えられません。独立したソースでフィンガープリントを確認することで確立します。

鍵にローカル署名を明示的に付与しない限り、ほぼすべての検証でこの警告が表示されます。これを失敗として扱わないでください。ただし、`Good signature` がないことは失敗として扱ってください。

### ステップ3 — 鍵移行自体を検証する

Zcash のリリース署名は、元 ECC のエンジニアリングおよびプロダクトチームによって2026年1月に ZODL が設立された後、2026年に Electric Coin Company から Zcash Open Development Lab へ移行しました。

| | 旧鍵 | 新鍵 |
|---|---|---|
| フィンガープリント | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key（ECC）`<sysadmin@z.cash>` | Zcash Open Development Lab（ZODL）`<sysadmin@zodl.com>` |
| 種別 | RSA 3072ビット、2023-06-19作成 | RSA 4096ビット、2026-03-23作成、2028-03-22失効 |
| 公開場所 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

公開タイムライン: 新鍵は2026-03-23に生成、2026-03-27に告知、2026-04-23から排他的に署名、旧 ECC 鍵の失効は2026-06-23に予定されていました。

ウェブサイト上のローテーション告知は、そのウェブサイトと同じ程度にしか信頼できません。正しい仕組みは、**両方の鍵でクリア署名された**声明であり、旧鍵が新鍵を保証します。ZODL はまさにそれを公開しています。

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

実際の出力（要約 — 1つの文書に2つの署名）:

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

1つの文書に対して、旧鍵と新鍵による2つの `Good signature` 結果があります。以前のリリースで ECC 鍵を信頼していた場合、その信頼は、`zodl.com`、`apt.z.cash`、またはフォーラム投稿を信頼しなくても、ZODL 鍵へ引き継がれます。プロジェクトが鍵をローテーションする際に探すべき特性であり、存在しない場合は質問する価値があります。

### 鍵を取得する場所と避けるべき場所

最良から最悪の順です。

1. **前の鍵で署名された声明。** 上記のとおりです。ローテーション後の最も強力な選択肢です。
2. **ダウンロード元から独立したソース。** バイナリは GitHub から取得し、鍵は `apt.z.cash` から取得します。攻撃者は両方を侵害する必要があります。
3. **公開済みフィンガープリントと照合した鍵サーバー。** ほとんどの鍵サーバーでは、誰でも任意のアイデンティティを主張する鍵をアップロードできます。これを安全にするのは鍵サーバーではなく、フィンガープリント比較です。
4. **バイナリと同じページ。** 保証はほとんどありません。一方を置き換えられる者は、もう一方も置き換えられます。

常に、**完全な**フィンガープリントを**主鍵**と比較してください。短い鍵 ID は簡単に衝突させられ、実際の攻撃で使用されています。

## パート3 — 失敗する検証

失敗がどのように見えるかを知って初めて、検証は役に立ちます。以下は、有効なアーカイブに1つの null バイトを追加して生成した実例です。

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

実際の出力:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

終了コード: `1`。

2つのダイジェストを並べてください。

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676バイトのファイルに1バイトを追加しただけです。2つのハッシュには共通点がありません。接頭辞もパターンもありません。部分的な一致や「十分に近い」はありません。チェックサムは完全に一致するか、ファイルが求めていたファイルではないかのどちらかです。

### この場合に行うこと

1. **バイナリを実行しないでください。** 展開せず、`chmod +x` もしないでください。
2. **公式リリースページから再試行してください。** ほとんどの失敗はダウンロードの切り詰めです。
3. **2回目も失敗した場合は、ネットワーク経路を変更してください。** 別の接続または VPN を使用してください。ネットワークをまたいでも続く失敗は、そうでない失敗とは異なります。
4. **正しいバージョンに対する正しいチェックサムファイルを使用していることを確認してください。** v6.3.0 を v6.2.3 の合計値と比較すれば、正しく失敗します。
5. **それでも失敗する場合は報告してください。** プロジェクトのリポジトリで issue を作成するか、意図的なものが疑われる場合は `SECURITY.md` のセキュリティ連絡先を使用してください。開示チャネルについては、[Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) ページを参照してください。
6. **成果物を保持してください。** 改ざんされたバイナリは証拠です。報告前に削除しないでください。

署名の失敗は、チェックサムの失敗より深刻です。チェックサムの不一致は通常破損ですが、有効なファイルで署名だけが不正になることは偶然には起きません。

---

## パート4 — 参照表

| プロジェクト | リリース公開場所 | 方法 | 鍵の取得元 |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | 鍵なし — GitHub OIDC 経由の CI アイデンティティ |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — 主鍵 `0338 34DD…58E2 6AB1`、署名サブキー `1FE9 9324…23F0 617F` |
| **zcashd** | *廃止済み* | — | 2026-07-18にブロック（block）3,417,100で停止しました。インストールしないでください。 |
| **Zodl**（旧 Zashi） | App Store / Google Play、GitHub 上の `zodl-inc` | Store signing; standalone Android binaries GPG-signed | 移行声明に従う ZODL 鍵 |

> **名称に関する注記:** Zashi は2026年に **Zodl** へリブランドされました。最初は App Store、次に Google Play です。「Zashi」を参照する古いガイドは、同じウォレット系統を説明しています。

---

## パート5 — モバイルおよびハードウェアウォレット

直接ダウンロード以外では、検証の仕組みが異なります。

**アプリストア。** 署名を自分で確認することはできません。ストアがパッケージに署名するため、ストアの審査と developer アカウントの完全性を信頼することになります。確認できるのは、正しいアプリを入手していることです。検索結果ではなくプロジェクトの公式サイトで、発行者名とパッケージ識別子を確認してください。なりすましアプリは一般的であり、ストアの掲載情報は真正性の証拠ではありません。

**スタンドアロン Android APK。** これらは検証できます。ZODL は、GitHub Releases を通じて GPG 署名済みのスタンドアロン Android バイナリを公開しているため、パート2のワークフローが適用されます。確認可能なチェーンを望む場合は、この経路を優先してください。

**ハードウェアウォレット。** デバイスは自身のファームウェアを証明するため、信頼の基点はマシン上のファイルではなくハードウェアです。デバイス検証フローについては、[Keystone Zashi](/guides/keystone-zashi) を参照してください。メーカーから直接購入してください。サプライチェーンの改ざんは、工場と購入者の間で発生します。

---

## 関連資料

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — 開示ポリシーとセキュリティ連絡先
- [Zebra Full Node](/zcash-tech/zebra-full-node) — 検証後に Zebra をインストールする方法
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — Zallet の使用方法
- [Sigstore ドキュメント](https://docs.sigstore.dev/)
- [SLSA プロベナンスレベル](https://slsa.dev/)

---

*このページのコマンドは、Zebra `v6.3.0` および Zallet `v0.1.0-beta.2` に対して2026-08-18に実行されました。リリースツールは変更されます。出力がここに示すものと異なる場合は、自身の実行結果を信頼し、PR を作成してください。*
