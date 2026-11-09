<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 验证 Zcash 发布版本

## TL;DR

- 下载 Zcash 二进制文件，并不等同于获得项目发布的那个文件。验证可以让你分辨两者。
- 校验和证明文件完整送达。**签名**证明由谁生成它。两者都需要，仅有校验和几乎无法证明什么。
- Zebra 会发布一个 `SHA256SUMS` 文件，以及一个将发布版本关联至特定 GitHub Actions 工作流、标签和提交的 **Sigstore** bundle — 无需管理密钥。
- Zallet 会连同 SLSA 溯源证明和 SBOM 一起发布分离式 **GPG** 签名（`.asc`）。
- Zcash 签名密钥于 2026 年从 Electric Coin Company 轮换至 Zcash Open Development Lab（ZODL）。如果你验证过旧版发布版本，就需要新密钥 — 交接声明由两把密钥共同签名，因此你可以验证这次轮换本身。
- `gpg` 会报告签署文件的**子密钥**，而非公告中列出的主密钥。看起来不正确的指纹通常是子密钥，不是攻击。
- 如果验证失败，请勿运行二进制文件。

*已于 2026-08-18 依据 Zebra `v6.3.0` 和 Zallet `v0.1.0-beta.2` 验证。*

## 为什么这对 Zcash 更重要

被篡改的钱包二进制文件可能会窃取花费密钥或 viewing key。不同于遭泄露的密码，这种损失是永久性的：没有回滚、没有拒付，也没有支持服务台。屏蔽交易保护*链上*发生的事情 — 当你运行的软件在到达你之前就被替换时，它们完全无法提供保护。

这是少数几种协议的隐私保障完全无关紧要的攻击路径之一。验证是覆盖它的那一层。

## 威胁模型 — 验证能及不能发现什么

**能够发现：**

- 被篡改的镜像，或从项目发布页面以外的位置提供的修改文件。
- 下载期间的中间人替换。
- 被攻破的 CDN 或被劫持的分发主机。
- 传输过程中的意外损坏。

**不能发现：**

- 签署恶意代码的维护者。签名会正确验证；它证明来源，不证明意图。
- 生成已签名但恶意构件的被攻破构建主机。这正是可复现构建和溯源证明存在的目的：缩小此类风险。
- 你从与二进制文件相同的被攻破来源获得的密钥。如果攻击者同时控制文件和你用来核对它的密钥，验证不会告诉你任何信息。

最后一点是大多数指南略过的内容。**获取密钥的位置与运行命令同样重要。**

---

## 第 1 部分 — Zebra：校验和与 Sigstore

Zebra 为每个发布版本发布以下资源：

| 资源 | 用途 |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | 二进制归档文件 |
| `zebrad-<version>-<arch>.tar.gz.sha256` | 单文件校验和 |
| `SHA256SUMS` | 所有架构的校验和 |
| `SHA256SUMS.sigstore.json` | 为 `SHA256SUMS` 签名的 Sigstore bundle |

### 步骤 1 — 下载

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### 步骤 2 — 检查校验和

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

实际输出：

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

这里必须使用 `--ignore-missing`，因为 `SHA256SUMS` 覆盖所有架构，而你只下载了一个。没有它，`sha256sum` 会将缺失的 aarch64 归档文件报告为失败，你可能将通过误读为失败。

单文件版本同样可用：

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**仅此步骤还不够。**你从与二进制文件相同的位置下载了校验和。任何能够替换其中一个的人也能替换另一个。校验和证明完整性；下一步证明来源。

### 步骤 2b — 在 Windows 上进行相同检查

PowerShell 没有 `-c` 验证模式，因此你需要手动比较：

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

实际输出：

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

将其与本页前面的 Linux 结果进行比较：

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**值完全相同。**十六进制没有大小写之分，这是 Windows 上最常见的误报。

另外两个 Windows 特有的陷阱：

- **没有可检查的退出代码。**在 Linux 上，`sha256sum -c` 失败时返回 1，脚本可以据此采取操作。`Get-FileHash` 只会打印哈希值 — 比较由你完成，也可能因草率浏览而出错。
- **通过肉眼读取 64 个十六进制字符并不可靠。**让 shell 来完成：

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **在 macOS 上：**工作流程相同，但 BSD 用户空间提供的是 `shasum` 而不是 `sha256sum` — 请使用 `shasum -a 256 -c --ignore-missing SHA256SUMS`。本页作者没有可用的 macOS 设备，因此该命令依据 Apple 的工具文档记录，而非实际运行。如果你在 macOS 上验证，请提交 PR 以确认或修正它。

### 步骤 3 — 验证 Sigstore bundle

Sigstore 用与 CI 身份绑定、有效期很短的证书替代长期签名密钥，并记录在公开透明度日志中。没有人持有可能被盗的发布密钥。

直接路径使用 `cosign`：

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

这两个 `--certificate-*` 标志正是关键。**没有它们，你只是在确认某个人在某处签署过该文件。**有了它们，你确认该文件由 Zebra 仓库中的工作流签署，并由 GitHub 的 OIDC 签发者认证。

> ⚠️ **版本很重要。**较旧的 cosign 构建版本无法读取当前的 Sigstore bundle 格式。使用 cosign `v2.4.1` 运行上述命令会产生：
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> bundle *确实*包含证书 — 它位于 `verificationMaterial.certificate.rawBytes` 下，而旧版本不会在那里查找。这是客户端限制，不是损坏的发布版本。如果遇到此问题，请升级 cosign，而非断定下载文件有问题。发行版打包的 cosign 往往远落后于上游版本。

接下来的两步展示如何手动验证同一个 bundle，无论如何都值得理解 — 当你的 cosign 构建无法配合时，这也是可行的后备方案。

### 步骤 4 — 阅读证书实际声明的内容

你无需 `cosign` 即可检查 bundle，这有助于理解你正在信任什么。提取证书：

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Zebra v6.3.0 的实际输出：

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

主题备用名称就是身份。它指定仓库、确切的工作流文件和标签。Sigstore 在自定义扩展中嵌入了更多构建元数据：

| 字段 | v6.3.0 的值 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

其中每一项都可检查。提交哈希应与仓库中的标签匹配；工作流运行应存在且公开。

### 步骤 5 — 以密码学方式验证签名

你可以直接使用 OpenSSL 确认签名：

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

实际输出：

```
Verified OK
```

bundle 还会记录它签署的摘要。确认其与你的本地文件一致：

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### 步骤 6 — 透明度日志条目

bundle 包含一条 Rekor 条目，证明签名已发布到公开的仅追加日志：

| 字段 | 值 |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

这使得对密钥的静默滥用可被发现。未曾出现在日志中，或在不可信时间出现的签名，都是值得采取行动的信号。将整合时间与发布公告进行比较。

> **关于 OpenSSL 路径的说明：**它会针对证书的公钥验证签名，但其本身不会将证书链验证到 Sigstore 根，也不会检查日志条目的包含证明。`cosign verify-blob` 会完成这三项工作。使用 OpenSSL 来理解机制；使用 `cosign` 作为实际检查。

---

## 第 2 部分 — Zallet：GPG 签名

Zallet 发布一组不同的资源：

| 资源 | 用途 |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | 二进制归档文件 |
| `.tar.gz.asc` | 分离式 GPG 签名 |
| `.tar.gz.intoto.jsonl` | SLSA 溯源证明 |
| `.tar.gz.provenance.json` | 溯源元数据 |
| `.tar.gz.sbom.spdx` | 软件物料清单 |

### 步骤 1 — 在寻找签名密钥之前识别它

先执行验证，且不导入任何密钥：

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

实际输出：

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

这不是失败。它告诉你签名存在，并在你开始搜索**之前**准确指出所需密钥。记下指纹和签发者，然后从独立于下载来源的渠道获取密钥。

> `gpg` 会以你的本地时区打印时间戳。上面的输出显示 `WAT`（UTC+1）；同一个签名在其他地方显示为 `18:18:44 UTC`。它们是同一时刻。不要将时区差异视为不匹配。

### 步骤 2 — 导入密钥并验证

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

实际输出：

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

`Good signature` 正是你需要的结果。输出中的两点经常令人困惑，但都属正常。

### 为什么指纹与公告不匹配

ZODL 密钥过渡声明列出了指纹 `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`。但 `gpg --verify` 报告的是 `1FE9 9324 …  23F0 617F`。这看起来像不匹配，但并不是。

`gpg` 会报告生成签名的**子密钥**。公告列出的是**主密钥**。请自行确认两者关系：

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

实际输出：

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

`sub` 行是签名子密钥；`pub` 行是主密钥。一个身份，一套密钥。这就是验证输出会打印**两个**指纹的原因 — 将*主密钥*与任何已发布公告比较，而将子密钥行视为告诉你密钥的哪个部分完成了工作。

如此拆分密钥是有意设计的：签名子密钥可以轮换或撤销，而无需废弃主身份及其积累的信任。

### `[unknown]` 警告意味着什么

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

这**不是**签名的问题。签名在密码学上有效 — 这正是 `Good signature` 所表明的。警告表达的是另一件事：你尚未告知本地 GnuPG，相信此密钥属于其声称的主体。

GnuPG 将两个问题分开：

1. **此密钥是否签署了此文件？** — 由 `Good signature` 回答。密码学问题，不涉及人为判断。
2. **此密钥是否属于 ZODL？** — 密码学完全无法回答。你通过将指纹与独立来源核对来建立这一点。

除非你明确在本地签署该密钥，否则几乎每次验证都会看到这个警告。不要将其视为失败。**务必**将缺少 `Good signature` 视为失败。

### 步骤 3 — 验证密钥过渡本身

Zcash 发布签名于 2026 年从 Electric Coin Company 转至 Zcash Open Development Lab，此前 ZODL 于 2026 年 1 月由前 ECC 工程和产品团队成立。

| | 旧密钥 | 新密钥 |
|---|---|---|
| 指纹 | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key（ECC）`<sysadmin@z.cash>` | Zcash Open Development Lab（ZODL）`<sysadmin@zodl.com>` |
| 类型 | RSA 3072 位，创建于 2023-06-19 | RSA 4096 位，创建于 2026-03-23，过期于 2028-03-22 |
| 发布时间 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

已公布时间线：新密钥于 2026-03-23 生成，于 2026-03-27 公告，自 2026-04-23 起独占签名，旧 ECC 密钥计划于 2026-06-23 撤销。

网站上的轮换公告仅与该网站本身一样可信。正确机制是由两把密钥**明文签署**的声明，因此旧密钥可以为新密钥背书。ZODL 正是这样发布的：

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

实际输出（删节版 — 一份文档上的两个签名）：

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

同一份文档上有两个 `Good signature` 结果，分别来自旧密钥和新密钥。如果你曾信任 ECC 密钥来验证早期发布版本，那么这份信任现在会延续到 ZODL 密钥，无需你信任 `zodl.com`、`apt.z.cash` 或论坛帖子。这正是项目轮换密钥时应寻找的性质 — 缺少它值得询问。

### 从哪里获取密钥 — 以及不应从哪里获取

按从最佳到最差排序：

1. **由前一把密钥签署的声明**，如上所示。轮换后的最强选项。
2. **独立于下载来源的渠道。**二进制文件来自 GitHub；密钥来自 `apt.z.cash`。攻击者需要同时控制两者。
3. **密钥服务器，且与已发布指纹交叉核对。**任何人都可以向大多数密钥服务器上传声称任意身份的密钥。使这安全的是指纹比较 — 不是密钥服务器。
4. **与二进制文件相同的页面。**几乎没有保证。能够替换其中一个的人也能替换另一个。

始终将**完整**指纹与**主**密钥比较。短密钥 ID 很容易发生碰撞，并且已被用于真实攻击。

## 第 3 部分 — 一次失败的验证

只有知道失败是什么样子，验证才有用。这里是一个真实案例：通过向有效归档文件追加单个空字节生成：

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

实际输出：

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

退出代码：`1`。

将两个摘要并排放置：

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

向一个 66,992,676 字节的文件追加一个字节。两个哈希没有任何共同之处 — 没有前缀，没有模式。不存在部分匹配，也没有“足够接近”：校验和要么精确匹配，要么文件就不是你要的文件。

### 发生这种情况时该怎么做

1. **不要运行二进制文件。**不要解压它，也不要对其执行 `chmod +x`。
2. **从官方发布页面重新尝试。**大多数失败来自下载被截断。
3. **若第二次仍然失败，请更换网络路径。**使用不同的连接，或 VPN。跨网络仍跟随你的失败，与不会跟随你的失败不同。
4. **确认你拥有适用于正确版本的正确校验和文件。**将 v6.3.0 与 v6.2.3 的校验和比较会正确地失败。
5. **如果仍然失败，请报告。**在项目仓库中提交 issue，或针对任何你怀疑是蓄意的问题，使用 `SECURITY.md` 中的安全联系方式。请参阅 [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) 页面了解披露渠道。
6. **保留构件。**被篡改的二进制文件是证据。报告前不要删除它。

签名失败比校验和失败更严重。校验和不匹配通常是损坏；有效文件却有不良签名不是意外会发生的事情。

---

## 第 4 部分 — 参考表

| 项目 | 发布位置 | 方法 | 密钥来源 |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | 无密钥 — 通过 GitHub OIDC 的 CI 身份 |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — 主密钥 `0338 34DD…58E2 6AB1`，签名子密钥 `1FE9 9324…23F0 617F` |
| **zcashd** | *已退役* | — | 于 2026-07-18 在区块 3,417,100 停止。请勿安装。 |
| **Zodl**（原为 Zashi） | App Store / Google Play；GitHub 上的 `zodl-inc` | Store signing; standalone Android binaries GPG-signed | 每份过渡声明对应的 ZODL 密钥 |

> **命名说明：**Zashi 于 2026 年更名为 **Zodl** — 先在 App Store，后在 Google Play。提到“Zashi”的旧指南描述的是同一钱包谱系。

---

## 第 5 部分 — 移动端和硬件钱包

一旦离开直接下载，验证的工作方式就不同了。

**应用商店。**你无法自行检查签名。商店为软件包签名，而你信任商店的审核及开发者账户的完整性。你*可以*验证的是你安装了正确的应用：请根据项目官方网站而非搜索结果，确认发布者名称和软件包标识符。仿冒应用很常见，商店列表不是真实性证据。

**独立 Android APK。**这些*可以*验证。ZODL 通过 GitHub Releases 发布经 GPG 签名的独立 Android 二进制文件，因此第 2 部分的工作流程适用。如果你希望获得可检查的链，请优先选择此路径。

**硬件钱包。**设备会证明其自身固件，因此信任锚点是硬件，而不是你机器上的文件。请参阅 [Keystone Zashi](/guides/keystone-zashi) 了解设备验证流程。请直接从制造商购买 — 供应链篡改可能发生在工厂与买家之间。

---

## 延伸阅读

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — 披露政策和安全联系方式
- [Zebra 全节点](/zcash-tech/zebra-full-node) — 验证 Zebra 后安装它
- [Zallet 快速参考指南](/using-zcash/zallet-quick-reference-guide) — 使用 Zallet
- [Sigstore 文档](https://docs.sigstore.dev/)
- [SLSA 溯源级别](https://slsa.dev/)

---

*本页中的命令已于 2026-08-18 针对 Zebra `v6.3.0` 和 Zallet `v0.1.0-beta.2` 运行。发布工具会变化：如果输出与此处所示不同，请以你自己的运行结果为准，并请提交 PR。*
