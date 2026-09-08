<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 릴리스 검증하기

## TL;DR

- Zcash 바이너리를 다운로드하는 것과 프로젝트가 게시한 바로 그 바이너리를 받는 것은 같은 일이 아닙니다. 검증은 그 차이를 구별하는 방법입니다.
- 체크섬은 파일이 손상 없이 도착했음을 증명합니다. **서명**은 누가 그것을 만들었는지 증명합니다. 둘 다 필요하며, 체크섬만으로는 증명되는 것이 거의 없습니다.
- Zebra는 `SHA256SUMS` 파일과 특정 GitHub Actions 워크플로, 태그, 커밋에 릴리스를 연결하는 **Sigstore** 번들을 게시합니다. 키 관리가 필요 없습니다.
- Zallet은 SLSA provenance 및 SBOM과 함께 분리된 **GPG** 서명(`.asc`)을 게시합니다.
- Zcash 서명 키는 2026년에 Electric Coin Company에서 Zcash Open Development Lab (ZODL)로 교체되었습니다. 이전 릴리스를 검증했다면 새 키가 필요합니다. 그리고 인계 성명서는 두 키로 모두 서명되어 있으므로 키 교체 자체도 검증할 수 있습니다.
- `gpg`는 공지에 명시된 기본 키가 아니라 파일에 서명한 **서브키**를 보고합니다. 이상해 보이는 지문은 보통 공격이 아니라 서브키입니다.
- 검증에 실패하면 바이너리를 실행하지 마십시오.

*2026-08-18 기준 Zebra `v6.3.0` 및 Zallet `v0.1.0-beta.2`로 검증했습니다.*

## 왜 이것이 Zcash에서 더 중요한가

변조된 지갑 바이너리는 지출 키 또는 Viewing Key를 외부로 유출할 수 있습니다. 손상된 비밀번호와 달리, 이 손실은 영구적입니다. 롤백도, 차지백도, 지원 데스크도 없습니다. 실드 트랜잭션은 *온체인*에서 일어나는 일을 보호하지만, 여러분이 실행하는 소프트웨어가 도달하기도 전에 바뀌어 있었다면 전혀 보호해 주지 못합니다.

이것은 프로토콜의 프라이버시 보장이 단순히 의미가 없어지는 몇 안 되는 공격 경로 중 하나입니다. 검증은 그 부분을 보완하는 계층입니다.

## 위협 모델 — 검증이 잡아내는 것과 잡아내지 못하는 것

**잡아내는 것:**

- 변조된 미러 또는 프로젝트 릴리스 페이지 외의 곳에서 제공된 수정된 파일.
- 다운로드 중 중간자 공격에 의한 바꿔치기.
- 손상된 CDN 또는 탈취된 배포 호스트.
- 전송 중 우발적 손상.

**잡아내지 못하는 것:**

- 악성 코드를 서명하는 유지관리자. 서명은 올바르게 검증됩니다. 그것이 증명하는 것은 출처이지 의도가 아닙니다.
- 서명된 악성 아티팩트를 생성하는 손상된 빌드 호스트. 이것이 바로 재현 가능한 빌드와 provenance attestation이 그 위험을 줄이기 위해 존재하는 이유입니다.
- 바이너리와 같은 손상된 출처에서 얻은 키. 공격자가 파일과 여러분이 대조하는 키 둘 다 통제한다면, 검증은 아무것도 말해주지 못합니다.

마지막 항목이 대부분의 가이드가 건너뛰는 부분입니다. **키를 어디서 얻는가는 명령을 실행하는 것만큼 중요합니다.**

---

## 1부 — Zebra: 체크섬과 Sigstore

Zebra는 각 릴리스마다 다음 자산을 게시합니다:

| 자산 | 용도 |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | 바이너리 아카이브 |
| `zebrad-<version>-<arch>.tar.gz.sha256` | 파일별 체크섬 |
| `SHA256SUMS` | 모든 아키텍처용 체크섬 |
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

여기서는 `SHA256SUMS`가 모든 아키텍처를 포함하고 있고 여러분은 하나만 다운로드했기 때문에 `--ignore-missing`이 필요합니다. 이것이 없으면 `sha256sum`이 존재하지 않는 aarch64 아카이브를 실패로 보고하고, 여러분은 통과를 실패로 오해할 수 있습니다.

파일별 방식도 사용할 수 있습니다:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**이 단계만으로는 충분하지 않습니다.** 체크섬도 바이너리와 같은 곳에서 다운로드했기 때문입니다. 하나를 바꿀 수 있는 사람은 다른 하나도 바꿀 수 있습니다. 체크섬은 무결성을 증명하고, 다음 단계는 출처를 증명합니다.

### 2b단계 — Windows에서 같은 확인 수행하기

PowerShell에는 `-c` 검증 모드가 없으므로 수동으로 비교해야 합니다:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

실제 출력:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

이 페이지 앞부분의 Linux 결과와 비교해 보십시오:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**값은 동일합니다.** 16진수는 대소문자를 구분하지 않으며, 이것이 Windows에서 가장 흔한 오탐 중 하나입니다.

Windows에만 있는 함정이 두 가지 더 있습니다:

- **확인할 종료 코드가 없습니다.** Linux에서는 `sha256sum -c`가 실패 시 1을 반환하므로 스크립트가 이에 따라 동작할 수 있습니다. `Get-FileHash`는 해시만 출력합니다. 비교는 여러분이 해야 하며, 대충 훑어보다가 틀리기도 쉽습니다.
- **16진수 64자를 눈으로 읽는 것은 신뢰할 수 없습니다.** 셸에 맡기십시오:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS에서는:** 흐름은 동일하지만 BSD 사용자 공간에는 `sha256sum` 대신 `shasum`이 포함되어 있으므로 `shasum -a 256 -c --ignore-missing SHA256SUMS`를 사용하십시오. 이 페이지의 작성자는 사용할 수 있는 macOS 기기가 없었기 때문에, 이 명령은 실제 실행이 아니라 Apple 도구 문서를 바탕으로 기록되었습니다. macOS에서 검증하신다면 이를 확인하거나 수정하는 PR을 열어 주세요.

### 3단계 — Sigstore 번들 검증

Sigstore는 오래 유지되는 서명 키를, 공개 투명성 로그에 기록되는 CI 신원에 결합된 단기 인증서로 대체합니다. 도난당할 수 있는 릴리스 키를 아무도 보유하지 않습니다.

가장 직접적인 경로는 `cosign`을 사용하는 것입니다:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

이 두 `--certificate-*` 플래그가 핵심입니다. **이것들이 없으면 단지 어딘가의 누군가가 파일에 서명했다는 것만 확인하는 셈입니다.** 이것들이 있으면 GitHub의 OIDC 발급자가 인증한 Zebra 저장소의 워크플로가 서명했다는 것을 확인하게 됩니다.

> ⚠️ **버전이 중요합니다.** 오래된 cosign 빌드는 현재 Sigstore 번들 형식을 읽지 못합니다. cosign `v2.4.1`로 위 명령을 실행하면 다음이 출력됩니다:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> 번들에는 *분명히* 인증서가 들어 있습니다. 오래된 릴리스가 찾지 못하는 `verificationMaterial.certificate.rawBytes` 아래에 있을 뿐입니다. 이것은 손상된 릴리스가 아니라 클라이언트의 한계입니다. 이 오류가 나오면 다운로드가 잘못되었다고 결론 내리지 말고 cosign을 업그레이드하십시오. 배포판 패키지로 제공되는 cosign은 upstream보다 많이 뒤처진 경우가 흔합니다.

다음 두 단계에서는 같은 번들을 수동으로 검증하는 방법을 보여줍니다. 어쨌든 이를 이해해 둘 가치는 있으며, 사용 중인 cosign 빌드가 협조하지 않을 때 실용적인 대체 경로이기도 합니다.

### 4단계 — 인증서가 실제로 무엇을 주장하는지 읽기

`cosign` 없이도 번들을 검사할 수 있는데, 이는 여러분이 무엇을 신뢰하는지 이해하는 데 유용합니다. 인증서를 추출하십시오:

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

Subject Alternative Name이 바로 신원입니다. 저장소, 정확한 워크플로 파일, 태그를 지정합니다. Sigstore는 추가 빌드 메타데이터도 사용자 정의 확장에 포함합니다:

| 필드 | v6.3.0의 값 |
|---|---|
| OIDC 발급자 | `https://token.actions.githubusercontent.com` |
| 소스 저장소 | `https://github.com/ZcashFoundation/zebra` |
| 빌드 커밋 | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| 러너 환경 | `github-hosted` |
| 워크플로 실행 | `.../actions/runs/31424510487/attempts/1` |
| 저장소 공개 범위 | `public` |

이들 각각은 모두 확인 가능합니다. 커밋 해시는 저장소의 태그와 일치해야 하고, 워크플로 실행은 존재해야 하며 공개되어 있어야 합니다.

### 5단계 — 서명을 암호학적으로 검증

OpenSSL로 직접 서명을 확인할 수 있습니다:

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

번들은 서명한 다이제스트도 기록합니다. 이것이 로컬 파일과 일치하는지 확인하십시오:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### 6단계 — 투명성 로그 항목

번들에는 서명이 공개적인 append-only 로그에 게시되었음을 증명하는 Rekor 항목도 포함되어 있습니다:

| 필드 | 값 |
|---|---|
| Rekor 로그 인덱스 | `2412071838` |
| 항목 유형 | `hashedrekord v0.0.1` |
| 통합 시각 | 2026-08-10 19:43:09 UTC |

이것이 조용한 키 오용을 감지 가능하게 만드는 요소입니다. 로그에 한 번도 나타나지 않았거나, 있을 법하지 않은 시각에 나타난 서명은 조치할 가치가 있는 신호입니다. 통합 시각을 릴리스 공지 시점과 비교해 보십시오.

> **OpenSSL 경로에 대한 참고:** 이것은 인증서의 공개 키에 대해 서명을 검증하지만, 그 자체만으로는 인증서 체인을 Sigstore 루트까지 검증하지 않으며 로그 항목의 포함 증명도 확인하지 않습니다. `cosign verify-blob`은 이 세 가지를 모두 수행합니다. 메커니즘을 이해하려면 OpenSSL을 사용하고, 실제 검증에는 `cosign`을 사용하십시오.

---

## 2부 — Zallet: GPG 서명

Zallet은 다른 자산 집합을 게시합니다:

| 자산 | 용도 |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | 바이너리 아카이브 |
| `.tar.gz.asc` | 분리된 GPG 서명 |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | provenance 메타데이터 |
| `.tar.gz.sbom.spdx` | 소프트웨어 자재 명세서 |

### 1단계 — 서명 키를 찾기 전에 먼저 식별하기

키를 가져오지 않은 상태에서 *먼저* 검증을 실행하십시오:

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

이것은 실패가 아닙니다. 서명이 존재한다는 사실을 알려 주고, **검색을 시작하기 전에** 정확히 어떤 키가 필요한지 보여 줍니다. 지문과 발급자를 적어 두고, 다운로드와 독립된 출처에서 키를 얻으십시오.

> `gpg`는 타임스탬프를 여러분의 로컬 시간대로 출력합니다. 위 출력은 `WAT`(UTC+1)로 표시되지만, 같은 서명은 다른 곳에서는 `18:18:44 UTC`로 읽힙니다. 같은 순간입니다. 시간대 차이를 불일치로 취급하지 마십시오.

### 2단계 — 키를 가져와 검증하기

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

`Good signature`가 여러분이 원하던 결과입니다. 이 출력에는 사람들을 헷갈리게 하는 두 가지가 있는데, 둘 다 정상입니다.

### 지문이 공지와 일치하지 않는 이유

ZODL 키 전환 성명서는 지문 `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`를 명시합니다. 하지만 `gpg --verify`는 `1FE9 9324 …  23F0 617F`를 보고했습니다. 불일치처럼 보이지만 그렇지 않습니다.

`gpg`는 서명을 만든 **서브키**를 보고합니다. 공지에서는 **기본 키**를 명시합니다. 이 관계를 직접 확인해 보십시오:

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

`sub` 줄은 서명 서브키이고, `pub` 줄은 기본 키입니다. 하나의 신원, 하나의 키 묶음입니다. 이것이 검증 출력이 **두** 지문을 모두 표시하는 이유입니다. 게시된 공지와는 *기본* 키를 비교하고, 서브키 줄은 키의 어느 부분이 실제 서명을 수행했는지 알려 주는 정보로 받아들이십시오.

이처럼 키를 분리하는 것은 의도적인 설계입니다. 서명 서브키는 기본 신원과 그동안 축적된 신뢰를 버리지 않고도 교체하거나 폐기할 수 있습니다.

### `[unknown]` 경고의 의미

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

이것은 **서명 자체의 문제를 뜻하지 않습니다.** 서명은 암호학적으로 유효하며, 그것이 바로 `Good signature`가 말하는 바입니다. 이 경고가 의미하는 것은 다른 것입니다. 여러분의 로컬 GnuPG가 이 키가 주장하는 주체의 것이라고 아직 신뢰하지 않는다는 뜻입니다.

GnuPG는 두 가지 질문을 분리합니다:

1. **이 키가 이 파일에 서명했는가?** — `Good signature`가 답합니다. 암호학적 문제이며, 인간의 판단이 필요 없습니다.
2. **이 키가 ZODL의 것인가?** — 이것은 암호학이 전혀 답하지 못합니다. 독립된 출처와 지문을 대조해서 확립해야 합니다.

키에 로컬 서명을 명시적으로 하지 않는 한, 거의 모든 검증에서 이 경고를 보게 됩니다. 이것을 실패로 취급하지 마십시오. **하지만** `Good signature`가 없으면 실패로 취급해야 합니다.

### 3단계 — 키 전환 자체 검증하기

Zcash 릴리스 서명은 2026년에 Electric Coin Company에서 Zcash Open Development Lab으로 옮겨졌습니다. 이는 전 ECC 엔지니어링 및 제품 팀이 2026년 1월에 ZODL을 설립한 이후였습니다.

| | 이전 키 | 새 키 |
|---|---|---|
| 지문 | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| 유형 | RSA 3072비트, 생성일 2023-06-19 | RSA 4096비트, 생성일 2026-03-23, 만료일 2028-03-22 |
| 게시 위치 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

게시된 타임라인: 새 키 생성 2026-03-23, 공지 2026-03-27, 2026-04-23부터 단독 서명, 이전 ECC 키 폐기 예정 2026-06-23.

웹사이트의 키 교체 공지는 그 웹사이트만큼만 신뢰할 수 있습니다. 올바른 메커니즘은 **두 키 모두로 clear-sign된** 성명서여야 하며, 이를 통해 이전 키가 새 키를 보증합니다. ZODL은 정확히 그렇게 게시합니다:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

실제 출력(축약본 — 하나의 문서에 두 개의 서명):

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

하나의 문서에 대해 이전 키와 새 키에서 나온 두 개의 `Good signature` 결과가 있습니다. 예전 릴리스에 대해 ECC 키를 신뢰했다면, 이제는 `zodl.com`, `apt.z.cash`, 또는 포럼 게시글을 신뢰할 필요 없이 그 신뢰를 ZODL 키로 이어갈 수 있습니다. 이것이 프로젝트가 키를 교체할 때 찾아야 할 속성이며, 이것이 없다면 질문해 볼 가치가 있습니다.

### 키를 얻을 곳 — 그리고 얻지 말아야 할 곳

가장 좋은 것부터 나쁜 것 순서:

1. **이전 키로 서명된 성명서**, 위 예시처럼. 키 교체 후에는 가장 강력한 선택지입니다.
2. **다운로드와 독립된 출처.** 바이너리는 GitHub에서 왔고, 키는 `apt.z.cash`에서 왔습니다. 공격자는 둘 다 필요합니다.
3. **게시된 지문과 교차 확인한 키서버.** 대부분의 키서버에는 누구나 어떤 신원이든 주장하는 키를 업로드할 수 있습니다. 이것을 안전하게 만드는 것은 키서버가 아니라 지문 비교입니다.
4. **바이너리와 같은 페이지.** 보장이 거의 없습니다. 하나를 바꿀 수 있는 사람은 다른 하나도 바꿀 수 있습니다.

항상 **전체** 지문을 **기본** 키와 비교하십시오. 짧은 키 ID는 쉽게 충돌을 만들 수 있으며 실제 공격에도 사용된 적이 있습니다.

## 3부 — 실패하는 검증

검증은 실패가 어떤 모습인지 알아야만 유용합니다. 다음은 유효한 아카이브에 null 바이트 하나를 덧붙여 생성한 실제 예시입니다:

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

두 다이제스트를 나란히 놓아 보십시오:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676바이트 파일에 1바이트를 덧붙였을 뿐입니다. 그런데 두 해시는 아무것도 공유하지 않습니다. 접두사도, 패턴도 없습니다. 부분 일치도 없고 "거의 맞음"도 없습니다. 체크섬은 정확히 일치하거나, 아니면 여러분이 원하던 파일이 아닙니다.

### 이런 일이 발생했을 때 해야 할 일

1. **바이너리를 실행하지 마십시오.** 압축을 풀지도 말고, `chmod +x`도 하지 마십시오.
2. **공식 릴리스 페이지에서 다시 시도하십시오.** 대부분의 실패는 다운로드가 중간에 잘렸기 때문입니다.
3. **두 번째도 실패하면 네트워크 경로를 바꾸십시오.** 다른 연결을 사용하거나 VPN을 써 보십시오. 네트워크를 바꿔도 따라오는 실패와 그렇지 않은 실패는 의미가 다릅니다.
4. **올바른 버전에 맞는 올바른 체크섬 파일인지 확인하십시오.** v6.3.0 파일을 v6.2.3 체크섬과 비교하면 당연히 올바르게 실패합니다.
5. **그래도 실패하면 보고하십시오.** 프로젝트 저장소에 이슈를 열거나, 의도적인 문제로 의심되는 경우 `SECURITY.md`의 보안 연락처를 사용하십시오. 공개 채널은 [Zcash 에코시스템 보안](/zcash-community/zcash-ecosystem-security) 페이지를 참조하십시오.
6. **아티팩트를 보관하십시오.** 변조된 바이너리는 증거입니다. 보고하기 전에 삭제하지 마십시오.

서명 실패는 체크섬 실패보다 더 심각합니다. 체크섬 불일치는 보통 손상이지만, 파일은 유효한데 서명만 잘못된 경우는 우연히 일어나는 일이 아닙니다.

---

## 4부 — 참고 표

| 프로젝트 | 릴리스 게시 위치 | 방법 | 키 출처 |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore 번들 | 키 없음 — GitHub OIDC를 통한 CI 신원 |
| **Zallet** | `github.com/zcash/zallet/releases` | 분리된 GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — 기본 `0338 34DD…58E2 6AB1`, 서명 서브키 `1FE9 9324…23F0 617F` |
| **zcashd** | *은퇴* | — | 2026-07-18에 블록 3,417,100에서 중단됨. 설치하지 마십시오. |
| **Zodl** (구 Zashi) | App Store / Google Play; GitHub의 `zodl-inc` | 스토어 서명; 독립형 Android 바이너리는 GPG 서명 | 키 전환 성명서에 따른 ZODL 키 |

> **이름 관련 참고:** Zashi는 2026년에 **Zodl**로 리브랜딩되었습니다. 먼저 App Store에서, 그다음 Google Play에서 변경되었습니다. "Zashi"를 언급하는 오래된 가이드는 같은 지갑 계보를 설명하는 것입니다.

---

## 5부 — 모바일 및 하드웨어 지갑

직접 다운로드를 벗어나면 검증 방식이 달라집니다.

**앱 스토어.** 직접 서명을 확인할 수 없습니다. 패키지는 스토어가 서명하므로, 여러분은 스토어의 심사와 개발자 계정의 무결성을 신뢰하게 됩니다. 대신 *확인할 수 있는 것*은 올바른 앱을 설치했는지입니다. 검색 결과가 아니라 프로젝트의 공식 사이트에서 게시자 이름과 패키지 식별자를 확인하십시오. 사칭 앱은 흔하며, 스토어 목록이 진위의 증거는 아닙니다.

**독립형 Android APK.** 이것들은 *검증할 수 있습니다.* ZODL은 GitHub Releases를 통해 GPG 서명된 독립형 Android 바이너리를 게시하므로 2부의 절차가 그대로 적용됩니다. 확인 가능한 체인을 원한다면 이 경로를 선호하십시오.

**하드웨어 지갑.** 장치가 자체 펌웨어를 증명하므로 신뢰의 기준점은 여러분의 기기에 있는 파일이 아니라 하드웨어입니다. 장치 검증 흐름은 [Keystone Zashi](/guides/keystone-zashi)를 참조하십시오. 제조사에서 직접 구매하십시오. 공급망 변조는 공장과 구매자 사이에서 발생합니다.

---

## 추가 읽을거리

- [Zcash 에코시스템 보안](/zcash-community/zcash-ecosystem-security) — 공개 정책 및 보안 연락처
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) — 검증 후 Zebra 설치하기
- [Zallet 빠른 참조 가이드](/using-zcash/zallet-quick-reference-guide) — Zallet 사용하기
- [Sigstore 문서](https://docs.sigstore.dev/)
- [SLSA provenance 레벨](https://slsa.dev/)

---

*이 페이지의 명령은 2026-08-18 기준 Zebra `v6.3.0` 및 Zallet `v0.1.0-beta.2`에 대해 실행되었습니다. 릴리스 도구는 변경될 수 있습니다. 출력이 여기 표시된 것과 다르다면, 여러분이 직접 실행한 결과를 신뢰하고 PR을 열어 주세요.*
