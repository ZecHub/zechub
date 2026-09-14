<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 릴리스 검증하기

## TL;DR

- Zcash 바이너리를 다운로드하는 것과 프로젝트가 배포한 바이너리를 받는 것은 다릅니다. 검증이 그 차이를 가려내는 방법입니다.
- 체크섬은 파일이 온전하게 도착했음을 증명합니다. **서명**은 누가 만들었는지를 증명합니다. 둘 다 필요하며, 체크섬만으로는 증명되는 것이 거의 없습니다.
- Zebra는 `SHA256SUMS` 파일과 릴리스를 특정 GitHub Actions 워크플로우, 태그, 커밋에 묶어주는 **Sigstore** 번들을 배포합니다. 키 관리가 필요 없습니다.
- Zallet은 SLSA provenance 및 SBOM과 함께 분리된 **GPG** 서명(`.asc`)을 배포합니다.
- Zcash 서명 키는 2026년에 Electric Coin Company에서 Zcash Open Development Lab (ZODL)으로 교체되었습니다. 이전 릴리스를 검증한 적 있다면 새 키가 필요합니다. 인수인계 성명은 두 키로 모두 서명되어 있어 교체 자체도 검증할 수 있습니다.
- `gpg`는 공지에 명시된 프라이머리 키가 아니라 파일에 서명한 **서브키**를 보고합니다. 틀려 보이는 지문은 대개 공격이 아니라 서브키입니다.
- 검증에 실패하면 바이너리를 실행하지 마세요.

*Zebra `v6.3.0` 및 Zallet `v0.1.0-beta.2`를 기준으로 2026-08-18에 검증되었습니다.*

## Zcash에서 더 중요한 이유

변조된 지갑 바이너리는 지출 키나 viewing key를 빼돌릴 수 있습니다. 탈취된 비밀번호와 달리 그 손실은 영구적입니다. 롤백도, 차지백도, 고객 지원 데스크도 없습니다. 실드드 거래는 *온체인에서* 일어나는 일을 보호합니다. 소프트웨어가 당신에게 도달하기 전에 교체된 경우에는 아무런 보호도 제공하지 않습니다.

이것은 프로토콜의 프라이버시 보장이 그저 무관해지는 몇 안 되는 공격 경로 중 하나입니다. 검증이 이를 커버하는 계층입니다.

## 위협 모델 — 검증이 잡아내는 것과 잡아내지 못하는 것

**잡아내는 것:**

- 변조된 미러, 또는 프로젝트의 릴리스 페이지가 아닌 곳에서 제공되는 수정된 파일.
- 다운로드 중간의 중간자(man-in-the-middle) 교체.
- 침해된 CDN 또는 탈취된 배포 호스트.
- 전송 중 우발적 손상.

**잡아내지 못하는 것:**

- 악의적인 코드에 서명하는 메인테이너. 서명은 올바르게 검증됩니다. 서명은 출처를 증명할 뿐 의도를 증명하지 않습니다.
- 서명되었지만 악의적인 아티팩트를 만들어내는 침해된 빌드 호스트. 재현 가능한 빌드(reproducible builds)와 provenance 어테스테이션이 이 범위를 좁히기 위해 존재합니다.
- 바이너리와 같은 침해된 출처에서 얻은 키. 공격자가 파일과 그것을 검사할 키를 모두 통제한다면, 검증은 아무것도 알려주지 않습니다.

마지막 항목이 대부분의 가이드가 건너뛰는 부분입니다. **키를 어디서 얻는지가 명령을 실행하는 것만큼 중요합니다.**

---

## 1부 — Zebra: 체크섬과 Sigstore

Zebra는 각 릴리스에 다음 아티팩트를 배포합니다:

| 아티팩트 | 용도 |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | 바이너리 아카이브 |
| `zebrad-<version>-<arch>.tar.gz.sha256` | 파일별 체크섬 |
| `SHA256SUMS` | 모든 아키텍처의 체크섬 |
| `SHA256SUMS.sigstore.json` | `SHA256SUMS`에 서명하는 Sigstore 번들 |

### 1단계 — 다운로드

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### 2단계 — 체크섬 확인

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

실제 출력:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`SHA256SUMS`가 모든 아키텍처를 포함하는데 당신은 하나만 다운로드했기 때문에 `--ignore-missing`이 필요합니다. 이 옵션이 없으면 `sha256sum`이 없는 aarch64 아카이브를 실패로 보고해서, 통과를 실패로 잘못 읽을 수 있습니다.

파일별 변형도 작동합니다:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**이 단계만으로는 충분하지 않습니다.** 체크섬을 바이너리와 같은 곳에서 다운로드했습니다. 하나를 교체할 수 있는 사람은 다른 것도 교체할 수 있습니다. 체크섬은 무결성을 증명하고, 다음 단계가 출처를 증명합니다.

### 2b단계 — Windows에서 같은 검사

PowerShell에는 `-c` 검증 모드가 없으므로 수동으로 비교합니다:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

실제 출력:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

이 페이지 앞부분의 Linux 결과와 비교하세요:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**동일한 값입니다.** 16진수에는 대소문자 구분이 없으며, 이것이 Windows에서 가장 흔한 오작동 경보입니다.

Windows 고유의 함정이 두 개 더 있습니다:

- **확인할 종료 코드가 없습니다.** Linux에서 `sha256sum -c`는 실패 시 1을 반환해 스크립트가 이에 반응할 수 있습니다. `Get-FileHash`는 해시를 출력할 뿐이며, 비교는 당신이 직접 해야 하고, 대충 훑어보다 틀리기도 쉽습니다.
- **64자 16진수를 눈으로 읽는 것은 신뢰할 수 없습니다.** 셸이 하게 하세요:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS의 경우:** 워크플로우는 같지만, BSD 유저랜드는 `sha256sum` 대신 `shasum`을 제공합니다. `shasum -a 256 -c --ignore-missing SHA256SUMS`를 사용하세요. 이 페이지의 작성자는 macOS 기기가 없었으므로, 해당 명령은 직접 실행한 것이 아니라 Apple 도구를 기준으로 문서화되었습니다. macOS에서 검증하신다면 확인이나 수정을 위한 PR을 열어주세요.

### 3단계 — Sigstore 번들 검증

Sigstore는 장기 서명 키를 CI 신원에 묶인 단기 인증서로 대체하고, 공개 투명성 로그에 기록합니다. 탈취될 수 있는 릴리스 키를 누구도 보유하지 않습니다.

간단한 경로는 `cosign`을 사용하는 것입니다:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

두 개의 `--certificate-*` 플래그가 핵심입니다. **이것 없이는 어딘가의 누군가가 파일에 서명했다는 것만 확인하는 것입니다.** 이것과 함께라면 GitHub의 OIDC 발급자가 인증한, Zebra 저장소의 워크플로우가 서명했다는 것을 확인하는 것입니다.

> ⚠️ **버전이 중요합니다.** 오래된 cosign 빌드는 현재 Sigstore 번들 형식을 읽을 수 없습니다. cosign `v2.4.1`로 위 명령을 실행하면 다음이 출력됩니다:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> 번들에는 인증서가 *있습니다*. `verificationMaterial.certificate.rawBytes` 아래에 있는데, 오래된 릴리스는 이를 찾지 않습니다. 이것은 깨진 릴리스가 아니라 클라이언트의 제한입니다. 이 오류가 나오면 다운로드가 나쁘다고 결론 내리지 말고 cosign을 업그레이드하세요. 배포판에 패키징된 cosign은 업스트림보다 상당히 뒤처진 경우가 많습니다.

다음 두 단계는 같은 번들을 수동으로 검증하는 방법을 보여줍니다. 어찌 됐든 이해할 가치가 있으며, cosign 빌드가 말을 듣지 않을 때 실용적인 대체 경로이기도 합니다.

### 4단계 — 인증서가 실제로 주장하는 내용 읽기

`cosign` 없이도 번들을 검사할 수 있으며, 무엇을 신뢰하는지 이해하는 데 유용합니다. 인증서를 추출하세요:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Zebra v6.3.0의 실제 출력:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name이 신원입니다. 저장소, 정확한 워크플로우 파일, 태그를 명시합니다. Sigstore는 추가 빌드 메타데이터를 커스텀 확장에 내장합니다:

| 필드 | v6.3.0의 값 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

이 모든 것은 검증 가능합니다. 커밋 해시는 저장소의 태그와 일치해야 하고, 워크플로우 실행은 존재하며 공개되어야 합니다.

### 5단계 — 서명을 암호학적으로 검증

OpenSSL로 서명을 직접 확인할 수 있습니다:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

실제 출력:

```
Verified OK
```

번들은 서명한 다이제스트도 기록합니다. 로컬 파일과 일치하는지 확인하세요:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### 6단계 — 투명성 로그 항목

번들에는 서명이 공개 추가 전용(append-only) 로그에 게시되었음을 증명하는 Rekor 항목이 있습니다:

| 필드 | 값 |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

이것이 은밀한 키 오용을 탐지 가능하게 만듭니다. 로그에 나타난 적 없는 서명이나, 그럴듯하지 않은 시각에 나타난 서명은 행동할 가치가 있는 신호입니다. 통합 시각을 릴리스 공지와 비교하세요.

> **OpenSSL 경로에 대한 참고:** 이 방법은 인증서의 공개 키에 대해 서명을 검증하지만, 그 자체로 Sigstore 루트까지의 인증서 체인을 검증하거나 로그 항목의 포함 증명을 확인하지는 않습니다. `cosign verify-blob`은 이 세 가지를 모두 수행합니다. OpenSSL은 메커니즘을 이해하는 데 사용하고, 실제 검사는 `cosign`을 사용하세요.

---

## 2부 — Zallet: GPG 서명

Zallet은 다른 아티팩트 세트를 배포합니다:

| 아티팩트 | 용도 |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | 바이너리 아카이브 |
| `.tar.gz.asc` | 분리된 GPG 서명 |
| `.tar.gz.intoto.jsonl` | SLSA provenance 어테스테이션 |
| `.tar.gz.provenance.json` | provenance 메타데이터 |
| `.tar.gz.sbom.spdx` | 소프트웨어 자재 명세서 (SBOM) |

### 1단계 — 찾으러 가기 전에 서명 키 식별하기

키를 임포트하지 않은 상태로 검증을 *먼저* 실행하세요:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

실제 출력:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

이것은 실패가 아닙니다. 서명이 존재하며 어떤 키가 필요한지 정확히 알려줍니다. 검색을 시작하기 **전에** 말입니다. 지문과 발급자를 메모한 뒤, 다운로드와 독립적인 출처에서 키를 얻으세요.

> `gpg`는 타임스탬프를 로컬 시간대로 출력합니다. 위 출력은 `WAT` (UTC+1)를 보여주고, 다른 곳에서는 같은 서명이 `18:18:44 UTC`로 읽힙니다. 같은 순간입니다. 시간대 차이를 불일치로 취급하지 마세요.

### 2단계 — 키 임포트 및 검증

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

실제 출력:

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

`Good signature`가 당신이 원하던 것입니다. 이 출력에서 사람들을 혼란스럽게 하는 두 가지가 있는데, 둘 다 정상입니다.

### 지문이 공지와 일치하지 않는 이유

ZODL 키 전환 성명은 지문 `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`을 명시합니다. 하지만 `gpg --verify`는 `1FE9 9324 …  23F0 617F`를 보고했습니다. 불일치처럼 보이지만 아닙니다.

`gpg`는 서명한 **서브키**를 보고합니다. 공지는 **프라이머리 키**를 명시합니다. 그 관계를 직접 확인하세요:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

실제 출력:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

`sub` 줄이 서명 서브키이고, `pub` 줄이 프라이머리입니다. 하나의 신원, 하나의 키 패키지입니다. 이것이 검증 출력이 **두** 지문을 모두 출력하는 이유입니다. *프라이머리*를 공개된 공지와 비교하고, 서브키 줄은 키의 어느 부분이 작업을 수행했는지 알려주는 것으로 취급하세요.

이렇게 키를 분리하는 것은 의도적입니다. 서명 서브키는 프라이머리 신원과 축적된 신뢰를 버리지 않고 교체하거나 폐기할 수 있습니다.

### `[unknown]` 경고의 의미

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

이것은 서명의 문제가 **아닙니다**. 서명은 암호학적으로 유효합니다. `Good signature`가 말하는 것이 바로 그것입니다. 경고는 다른 것을 말합니다. 당신이 로컬 GnuPG에 이 키가 주장하는 주인의 것이라고 믿는다고 알리지 않았다는 것입니다.

GnuPG는 두 가지 질문을 분리합니다:

1. **이 키가 이 파일에 서명했는가?** — `Good signature`가 답합니다. 암호학적이며, 사람의 판단이 없습니다.
2. **이 키가 ZODL의 것인가?** — 암호학은 전혀 답하지 않습니다. 지문을 독립적인 출처와 대조해서 확립하는 것입니다.

키를 로컬에서 명시적으로 서명하지 않는 한 거의 모든 검증에서 이 경고를 보게 됩니다. 실패로 취급하지 마세요. `Good signature`가 **없는** 것은 실패로 취급하세요.

### 3단계 — 키 전환 자체 검증하기

ZODL이 2026년 1월에 전 ECC 엔지니어링 및 프로덕트 팀에 의해 설립된 후, Zcash 릴리스 서명은 2026년에 Electric Coin Company에서 Zcash Open Development Lab으로 이전되었습니다.

| | 이전 키 | 새 키 |
|---|---|---|
| 지문 | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| 유형 | RSA 3072비트, 2023-06-19 생성 | RSA 4096비트, 2026-03-23 생성, 2028-03-22 만료 |
| 배포 위치 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

공개된 타임라인: 새 키 2026-03-23 생성, 2026-03-27 공지, 2026-04-23부터 전용 서명, 이전 ECC 키 폐기 2026-06-23 예정.

웹사이트의 교체 공지는 그 웹사이트만큼만 신뢰할 수 있습니다. 올바른 메커니즘은 **두 키로 모두 클리어 서명된** 성명으로, 이전 키가 새 키를 보증하게 하는 것입니다. ZODL은 정확히 그것을 배포합니다:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

실제 출력 (요약 — 한 문서에 두 개의 서명):

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

한 문서에 이전 키와 새 키의 두 개의 `Good signature` 결과. 이전 릴리스에서 ECC 키를 신뢰했다면, 그 신뢰는 이제 `zodl.com`, `apt.z.cash`, 포럼 게시물을 신뢰할 필요 없이 ZODL 키로 이어집니다. 프로젝트가 키를 교체할 때 항상 찾아야 할 속성이며, 그 부재는 물어볼 가치가 있습니다.

### 키를 얻을 곳 — 그리고 얻지 말아야 할 곳

좋은 것부터 나쁜 순으로:

1. **이전 키로 서명된 성명**, 위와 같이. 교체 후 가장 강력한 선택지입니다.
2. **다운로드와 독립적인 출처.** 바이너리는 GitHub에서, 키는 `apt.z.cash`에서 왔습니다. 공격자는 둘 다 필요합니다.
3. **공개된 지문과 교차 확인한 키 서버.** 대부분의 키 서버에는 누구나 어떤 신원이든 주장하는 키를 올릴 수 있습니다. 이 방법을 안전하게 만드는 것은 키 서버가 아니라 지문 비교입니다.
4. **바이너리와 같은 페이지.** 거의 보증이 없습니다. 하나를 교체할 수 있는 사람은 다른 것도 교체할 수 있습니다.

항상 **전체** 지문을 **프라이머리** 키와 비교하세요. 짧은 키 ID는 쉽게 충돌시킬 수 있으며 실제 공격에 사용된 적 있습니다.

## 3부 — 실패하는 검증

실패가 어떤 모습인지 알아야 검증이 유용합니다. 유효한 아카이브에 널(null) 바이트 하나를 덧붙여 만든 실제 사례입니다:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

실제 출력:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

종료 코드: `1`.

두 다이제스트를 나란히 놓으세요:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676바이트 파일에 1바이트를 추가했을 뿐입니다. 두 해시는 접두사도, 패턴도 공유하지 않습니다. 부분 일치도, "거의 비슷함"도 없습니다. 체크섬은 정확히 일치하거나, 아니면 그 파일은 당신이 원한 파일이 아닙니다.

### 이런 일이 생기면 해야 할 것

1. **바이너리를 실행하지 마세요.** 압축을 풀지도, `chmod +x` 하지도 마세요.
2. **공식 릴리스 페이지에서 다시 시도하세요.** 대부분의 실패는 잘린 다운로드입니다.
3. **두 번째로도 실패하면 네트워크 경로를 바꾸세요.** 다른 연결 또는 VPN. 네트워크를 바꿔도 따라오는 실패는 그렇지 않은 실패와 다릅니다.
4. **올바른 버전의 올바른 체크섬 파일을 가지고 있는지 확인하세요.** v6.3.0을 v6.2.3 체크섬과 비교하면 정확하게 실패합니다.
5. **그래도 실패하면 보고하세요.** 프로젝트 저장소에 이슈를 열거나, 고의라고 의심되는 것은 `SECURITY.md`의 보안 연락처를 사용하세요. 공개 채널은 [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) 페이지를 참고하세요.
6. **아티팩트를 보관하세요.** 변조된 바이너리는 증거입니다. 보고 전에 삭제하지 마세요.

서명 실패는 체크섬 실패보다 더 심각합니다. 체크섬 불일치는 대개 손상이지만, 유효한 파일에 잘못된 서명은 우연히 일어나는 일이 아닙니다.

---

## 4부 — 참조 표

| 프로젝트 | 릴리스 배포 위치 | 방법 | 키의 출처 |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore 번들 | 키 없음 — GitHub OIDC를 통한 CI 신원 |
| **Zallet** | `github.com/zcash/zallet/releases` | 분리된 GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — 프라이머리 `0338 34DD…58E2 6AB1`, 서명 서브키 `1FE9 9324…23F0 617F` |
| **zcashd** | *폐기됨* | — | 2026-07-18 블록 3,417,100에서 중단됨. 설치하지 마세요. |
| **Zodl** (구 Zashi) | App Store / Google Play; GitHub의 `zodl-inc` | 스토어 서명; 독립형 Android 바이너리는 GPG 서명 | 전환 성명의 ZODL 키 |

> **명칭 참고:** Zashi는 2026년에 **Zodl**로 리브랜딩되었습니다. 먼저 App Store에서, 이후 Google Play에서 변경되었습니다. "Zashi"를 언급하는 오래된 가이드는 같은 지갑 계보를 설명하는 것입니다.

---

## 5부 — 모바일 및 하드웨어 지갑

직접 다운로드를 벗어나면 검증은 다르게 작동합니다.

**앱 스토어.** 서명을 직접 확인할 수 없습니다. 스토어가 패키지에 서명하며, 당신은 스토어의 심사와 개발자 계정의 무결성을 신뢰하는 것입니다. 당신이 확인할 수 *있는* 것은 올바른 앱인지 여부입니다. 검색 결과가 아니라 프로젝트 공식 사이트와 배포자 이름 및 패키지 식별자를 대조하세요. 사칭 앱은 흔하며, 스토어 리스팅은 진위의 증거가 아닙니다.

**독립형 Android APK.** 이것은 검증할 수 *있습니다*. ZODL은 GitHub Releases를 통해 GPG 서명된 독립형 Android 바이너리를 배포하므로 2부 워크플로우가 적용됩니다. 검증 가능한 체인을 원하면 이 경로를 선택하세요.

**하드웨어 지갑.** 기기가 자체 펌웨어를 증명하므로 신뢰의 닻은 당신의 기기에 있는 파일이 아니라 하드웨어입니다. 기기 검증 흐름은 [Keystone Zashi](/guides/keystone-zashi)를 참고하세요. 제조사에서 직접 구매하세요. 공급망 변조는 공장과 구매자 사이에서 일어납니다.

---

## 더 읽어보기

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — 공개 정책 및 보안 연락처
- [Zebra Full Node](/zcash-tech/zebra-full-node) — 검증 후 Zebra 설치하기
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — Zallet 사용법
- [Sigstore 문서](https://docs.sigstore.dev/)
- [SLSA provenance 수준](https://slsa.dev/)

---

*이 페이지의 명령들은 2026-08-18에 Zebra `v6.3.0` 및 Zallet `v0.1.0-beta.2`를 대상으로 실행되었습니다. 릴리스 도구는 변합니다. 출력이 여기에 표시된 것과 다르면 당신의 실행 결과를 신뢰하고, PR을 열어주세요.*
