<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 验证 Zcash 发布版本

## TL;DR

- 下载一个 Zcash 二进制文件，并不等于拿到了项目实际发布的那个文件。验证就是用来区分两者的方法。
- 校验和证明文件在传输过程中保持完整。**签名** 证明是谁生成了它。两者都需要，而单独的校验和几乎证明不了什么。
- Zebra 会发布一个 `SHA256SUMS` 文件，以及一个 **Sigstore** bundle，用来将该发布版本绑定到特定的 GitHub Actions workflow、tag 和 commit，无需管理密钥。
- Zallet 会连同 SLSA provenance 和 SBOM 一起发布分离式 **GPG** 签名（`.asc`）。
- Zcash 签名密钥在 2026 年从 Electric Coin Company 轮换到 Zcash Open Development Lab (ZODL)。如果你之前验证过旧版本，现在需要使用新密钥，而且交接声明由两把密钥共同签署，因此你还可以验证这次轮换本身。
- `gpg` 报告的是对文件进行签名的 **subkey**，而不是公告中提到的主密钥。如果看到的 fingerprint 像是错的，通常那只是一个 subkey，不是攻击。
- 如果验证失败，不要运行该二进制文件。

*已依据 Zebra `v6.3.0` 和 Zallet `v0.1.0-beta.2` 于 2026-08-18 验证。*

## 为什么这对 Zcash 更重要

被篡改的钱包二进制文件可能会窃取 spending key 或 viewing key。与密码泄露不同，这种损失是永久性的：没有回滚、没有拒付、也没有支持工单可提交。Shielded transaction 保护的是 *链上* 发生的事情，而当你运行的软件在到达你手中之前就已被替换时，它完全无法提供任何保护。

这是少数几种协议隐私保障根本无关紧要的攻击路径之一。验证就是覆盖这一层的防线。

## 威胁模型：验证能捕获什么，不能捕获什么

**能捕获：**

- 被篡改的镜像站，或从项目发布页面以外的地方提供的被修改文件。
- 下载过程中的中间人替换。
- 被攻陷的 CDN 或被劫持的分发主机。
- 传输过程中的意外损坏。

**不能捕获：**

- 维护者亲自签署恶意代码。签名依然会验证通过；它证明来源，不证明意图。
- 被攻陷的构建主机生成了“签名有效但内容恶意”的制品。这正是可复现构建和 provenance attestation 试图缩小的风险。
- 你获取密钥的来源与获取二进制文件的来源同样被攻陷。如果攻击者同时控制了文件和你用于核对的密钥，那么验证毫无意义。

最后这一点是大多数指南都会跳过的。**你从哪里获取密钥，与执行验证命令本身同样重要。**

---

## 第 1 部分：Zebra：校验和与 Sigstore

Zebra 为每个发布版本提供这些资源：

| 资源 | 用途 |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | 二进制压缩包 |
| `zebrad-<version>-<arch>.tar.gz.sha256` | 单文件校验和 |
| `SHA256SUMS` | 所有架构的校验和 |
| `SHA256SUMS.sigstore.json` | 为 `SHA256SUMS` 签名的 Sigstore bundle |

### 第 1 步：下载

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### 第 2 步：检查校验和

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

实际输出：

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

这里必须使用 `--ignore-missing`，因为 `SHA256SUMS` 覆盖了所有架构，而你只下载了其中一个。如果不加它，`sha256sum` 会把缺失的 aarch64 压缩包报告为失败，你可能会把本来通过的结果误读成失败。

使用单文件变体也可以：

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**仅做这一步还不够。** 你是从和二进制文件相同的地方下载了校验和。任何能替换其中一个的人，也能替换另一个。校验和证明完整性；下一步证明来源。

### 第 2b 步：在 Windows 上进行同样的检查

PowerShell 没有 `-c` 这种验证模式，所以你需要手动比较：

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

实际输出：

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

把它和本页前面 Linux 的结果进行比较：

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**数值完全相同。** 十六进制不区分大小写，这是 Windows 上最常见的误报来源。

另外还有两个 Windows 特有的陷阱：

- **没有可供检查的退出码。** 在 Linux 上，`sha256sum -c` 失败时会返回 1，脚本可以据此处理。`Get-FileHash` 只会打印一个 hash，比较要靠你自己做，而你也很容易因为扫一眼就出错。
- **靠肉眼读取 64 个十六进制字符并不可靠。** 让 shell 来做：

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **在 macOS 上：** 工作流程相同，但 BSD 用户态自带的是 `shasum` 而不是 `sha256sum`，因此应使用 `shasum -a 256 -c --ignore-missing SHA256SUMS`。本页作者手头没有 macOS 机器，因此这个命令是根据 Apple 的工具文档编写的，而不是实机运行得到的。如果你在 macOS 上做过验证，请提交 PR 确认或修正。

### 第 3 步：验证 Sigstore bundle

Sigstore 用绑定到 CI 身份的短期证书替代长期签名密钥，并将其记录到公开透明日志中。这样就不存在某个可被窃取的发布密钥。

最直接的方式是使用 `cosign`：

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

这两个 `--certificate-*` 参数才是关键。**如果没有它们，你只能确认某个地方的某个人签署了这个文件。** 加上它们之后，你确认的是：该文件由 Zebra 仓库中的某个 workflow 签署，并由 GitHub 的 OIDC issuer 认证。

> ⚠️ **版本很重要。** 较旧的 cosign 构建版本无法读取当前的 Sigstore bundle 格式。使用 cosign `v2.4.1` 运行上述命令会得到：
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> 这个 bundle *确实* 包含证书，它位于 `verificationMaterial.certificate.rawBytes` 下，而旧版本不会去这里查找。这是客户端限制，不是发布版本损坏。如果你遇到这个问题，应升级 cosign，而不是草率认定下载内容有问题。发行版打包的 cosign 往往明显落后于上游。

接下来的两个步骤展示了如何手动验证同一个 bundle。无论如何，这都值得理解；当你的 cosign 构建版本不配合时，这也是可行的备用方案。

### 第 4 步：读取证书实际声明了什么

即使不使用 `cosign`，你也可以检查 bundle，这有助于理解你究竟在信任什么。先提取证书：

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

Subject Alternative Name 就是身份。它指明了仓库、确切的 workflow 文件以及 tag。Sigstore 还会在自定义扩展中嵌入更多构建元数据：

| 字段 | v6.3.0 的值 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

这里的每一项都可以核查。commit hash 应与仓库中的 tag 匹配；workflow run 应该真实存在且公开可见。

### 第 5 步：从密码学上验证签名

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

bundle 还记录了它所签名内容的 digest。确认它与你本地文件一致：

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### 第 6 步：透明日志条目

bundle 携带了一条 Rekor 条目，用来证明该签名已发布到公开的、只追加不删除的日志中：

| 字段 | 值 |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

这正是让密钥被悄悄滥用变得可检测的机制。如果一个签名从未出现在日志中，或者出现的时间明显不合理，这就是值得采取行动的信号。将集成时间与发布公告进行比对。

> **关于 OpenSSL 路径的说明：** 它会根据证书中的公钥验证签名，但它本身不会验证到 Sigstore 根证书的证书链，也不会检查日志条目的包含证明。`cosign verify-blob` 会同时完成这三件事。使用 OpenSSL 来理解机制；实际检查时使用 `cosign`。

---

## 第 2 部分：Zallet：GPG 签名

Zallet 发布的是另一组资源：

| 资源 | 用途 |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | 二进制压缩包 |
| `.tar.gz.asc` | 分离式 GPG 签名 |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | provenance 元数据 |
| `.tar.gz.sbom.spdx` | 软件物料清单 |

### 第 1 步：在开始寻找签名密钥之前，先识别它

先在没有导入任何密钥的情况下执行验证：

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

这不是失败。它说明签名确实存在，并且在你开始搜索之前，就明确告诉你需要哪一把密钥。记下 fingerprint 和 issuer，然后从独立于下载来源的渠道获取该密钥。

> `gpg` 会按你的本地时区打印时间戳。上面的输出显示的是 `WAT`（UTC+1）；同一个签名在别处可能显示为 `18:18:44 UTC`。这是同一时刻。不要把时区差异当成不匹配。

### 第 2 步：导入密钥并验证

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

`Good signature` 就是你想看到的结果。这里输出中有两点常常让人困惑，但它们都很正常。

### 为什么 fingerprint 与公告不一致

ZODL 密钥迁移声明中写的是 fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`。但 `gpg --verify` 报告的是 `1FE9 9324 …  23F0 617F`。这看起来像是不匹配，但其实不是。

`gpg` 报告的是实际执行签名的 **subkey**。而公告写的是 **主密钥**。你可以自己确认它们之间的关系：

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

`sub` 行是签名 subkey；`pub` 行是主密钥。一个身份，一整套密钥。这就是为什么验证输出会同时打印 **两个** fingerprint：将 *主密钥* 与任何公开公告进行比对，而把 subkey 行理解为告诉你到底是密钥中的哪一部分完成了签名。

像这样拆分密钥是有意为之：签名 subkey 可以轮换或吊销，而不必丢弃主身份及其已经积累的信任。

### `[unknown]` 警告是什么意思

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

这 **并不** 表示签名有问题。签名在密码学上是有效的，这正是 `Good signature` 所表达的意思。这个警告说的是另一件事：你还没有告诉本地 GnuPG，你相信这把密钥确实属于它所声称的身份。

GnuPG 将两个问题分开处理：

1. **这个文件是不是由这把密钥签的？** 由 `Good signature` 回答。这是密码学问题，不涉及人的判断。
2. **这把密钥是否真的属于 ZODL？** 这根本不是密码学能回答的问题。你要通过将 fingerprint 与独立来源进行比对来建立这一点。

除非你明确在本地签署该密钥，否则你几乎每次验证都会看到这个警告。不要把它当成失败。**但如果缺少 `Good signature`，那就应视为失败。**

### 第 3 步：验证密钥迁移本身

Zcash 发布签名在 2026 年从 Electric Coin Company 转移到 Zcash Open Development Lab，这发生在 ZODL 于 2026 年 1 月由原 ECC 工程和产品团队成立之后。

| | 旧密钥 | 新密钥 |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| 类型 | RSA 3072-bit，创建于 2023-06-19 | RSA 4096-bit，创建于 2026-03-23，过期于 2028-03-22 |
| 发布位置 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

公开时间线：新密钥生成于 2026-03-23，发布公告于 2026-03-27，自 2026-04-23 起独占签名，旧 ECC 密钥计划于 2026-06-23 吊销。

网站上的轮换公告，本质上只和网站本身一样可信。正确的机制应是一份 **由两把密钥共同 clear-sign 的声明**，这样旧密钥就能为新密钥背书。ZODL 确实发布了这样的内容：

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

实际输出（节选，同一文档上有两个签名）：

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

同一文档上有两个 `Good signature` 结果，一个来自旧密钥，一个来自新密钥。如果你曾用 ECC 密钥信任过早期版本，那么这份信任现在就能顺延到 ZODL 密钥，而不需要你去信任 `zodl.com`、`apt.z.cash` 或某个论坛帖子。无论哪个项目轮换密钥，这都是你应该寻找的属性；如果没有，就值得追问。

### 去哪里获取密钥，以及不要去哪里获取

按优先级从高到低排序：

1. **由前一把密钥签署的声明**，如上所示。轮换后的最强选项。
2. **独立于下载来源的渠道。** 二进制文件来自 GitHub；密钥来自 `apt.z.cash`。攻击者必须同时控制两者。
3. **keyserver，并交叉核对已公开的 fingerprint。** 几乎任何人都可以向大多数 keyserver 上传一把自称属于任何身份的密钥。真正让这件事安全的是 fingerprint 比对，而不是 keyserver 本身。
4. **与二进制文件相同的页面。** 几乎没有任何保障。谁能替换其中一个，谁就能替换另一个。

始终比对 **完整的** fingerprint，并且针对的是 **主密钥**。短 key ID 很容易发生碰撞，而且已经在真实攻击中被利用过。

## 第 3 部分：一次失败的验证

只有当你知道失败看起来是什么样子时，验证才真正有用。下面是一个真实示例：向一个有效压缩包末尾追加了一个空字节之后得到的结果：

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

实际输出：

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

退出码：`1`。

把两个 digest 并排放在一起看：

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

向一个 66,992,676 字节的文件中追加了一个字节。两个 hash 没有任何相同之处，不是前缀不同，不是某种模式变化。不存在部分匹配，也不存在“差不多就行”：校验和要么完全一致，要么这个文件就不是你想要的那个文件。

### 发生这种情况时该怎么做

1. **不要运行该二进制文件。** 不要解压，不要对它执行 `chmod +x`。
2. **从官方发布页面重新下载。** 大多数失败都只是下载截断。
3. **如果第二次仍然失败，就更换网络路径。** 换一个连接，或者使用 VPN。跨网络仍然复现的失败，与只在单一路径上出现的失败含义不同。
4. **确认你用的是正确版本对应的校验和文件。** 用 v6.3.0 去对照 v6.2.3 的校验和值，当然会正确地失败。
5. **如果仍然失败，就报告它。** 到项目仓库提交 issue，或者对于任何你怀疑是故意行为的情况，使用 `SECURITY.md` 中的安全联系方式。可参见[Zcash 生态系统安全](/zcash-community/zcash-ecosystem-security)页面了解披露渠道。
6. **保留该制品。** 被篡改的二进制文件本身就是证据。在报告前不要删除。

签名失败比校验和失败更严重。校验和不匹配通常只是损坏；而“文件本身有效但签名无效”并不是会偶然发生的事情。

---

## 第 4 部分：参考表

| 项目 | 发布位置 | 方法 | 密钥来源 |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | 无需密钥，通过 GitHub OIDC 的 CI 身份 |
| **Zallet** | `github.com/zcash/zallet/releases` | 分离式 GPG `.asc`、SLSA provenance、SBOM | `apt.z.cash/zodl.asc` — 主密钥 `0338 34DD…58E2 6AB1`，签名 subkey `1FE9 9324…23F0 617F` |
| **zcashd** | *已退役* | — | 已于 2026-07-18 在区块 3,417,100 停止。不要安装。 |
| **Zodl**（原名 Zashi） | App Store / Google Play；GitHub 上的 `zodl-inc` | 商店签名；独立 Android 二进制文件采用 GPG 签名 | 根据迁移声明使用 ZODL 密钥 |

> **命名说明：** Zashi 在 2026 年更名为 **Zodl**，先发生在 App Store，之后是 Google Play。较旧指南中提到的 “Zashi” 指的是同一条钱包产品线。

---

## 第 5 部分：移动端与硬件钱包

一旦离开直接下载，验证方式就会不同。

**应用商店。** 你无法自己检查签名。商店会对安装包签名，而你信任的是商店的审核流程和开发者账号的完整性。你 *能* 验证的是自己下载的是否为正确应用：应通过项目官网确认发布者名称和包标识符，而不是依赖搜索结果。冒名应用很常见，商店中的上架页面并不是真实性证明。

**独立 Android APK。** 这类文件 *可以* 验证。ZODL 通过 GitHub Releases 发布带有 GPG 签名的独立 Android 二进制文件，因此可适用第 2 部分的流程。如果你希望得到可核查的信任链，优先选择这条路径。

**硬件钱包。** 设备会对其自身固件进行证明，因此信任锚点是硬件，而不是你机器上的某个文件。设备验证流程可参见 [Keystone Zashi](/guides/keystone-zashi)。务必直接从制造商处购买，因为供应链篡改通常发生在工厂到买家之间。

---

## 延伸阅读

- [Zcash 生态系统安全](/zcash-community/zcash-ecosystem-security) — 披露政策与安全联系方式
- [Zebra Full Node](/zcash-tech/zebra-full-node) — 在完成验证后安装 Zebra
- [Zallet 快速参考指南](/using-zcash/zallet-quick-reference-guide) — 使用 Zallet
- [Sigstore 文档](https://docs.sigstore.dev/)
- [SLSA provenance 等级](https://slsa.dev/)

---

*本页中的命令已在 2026-08-18 针对 Zebra `v6.3.0` 和 Zallet `v0.1.0-beta.2` 运行。发布工具会变化：如果输出与此处展示的不一致，请以你自己的实际运行结果为准，并欢迎提交 PR。*
