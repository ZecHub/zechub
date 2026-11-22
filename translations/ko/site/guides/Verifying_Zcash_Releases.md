<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 릴리스 검증하기

## 핵심 요약

- Zcash 바이너리를 다운로드했다고 해서 프로젝트가 공개한 바이너리를 받았다는 뜻은 아닙니다. 검증을 통해 둘을 구분할 수 있습니다.
- 체크섬은 파일이 손상 없이 도착했음을 증명합니다. **서명**은 누가 파일을 만들었는지 증명합니다. 둘 다 필요하며, 체크섬만으로는 증명할 수 있는 것이 거의 없습니다.
- Zebra은 `SHA256SUMS` 파일과 함께 특정 GitHub Actions 워크플로, 태그, 커밋에 릴리스를 연결하는 **Sigstore** 번들을 게시합니다. 키를 관리할 필요가 없습니다.
- Zallet은 SLSA 출처 증명과 SBOM에 더해 분리된 **GPG** 서명(`.asc`)을 게시합니다.
- Zcash 서명 키는 2026년에 Electric Coin Company에서 Zcash Open Development Lab(ZODL)으로 교체되었습니다. 이전 릴리스를 검증했다면 새 키가 필요합니다. 인계 문서에는 두 키 모두 서명했으므로 키 교체 자체도 검증할 수 있습니다.
- `gpg`은 공지에 명시된 기본 키가 아니라 파일에 서명한 **하위 키**를 표시합니다. 지문이 잘못된 것처럼 보인다면 공격이 아니라 하위 키인 경우가 대부분입니다.
- 검증에 실패하면 바이너리를 실행하지 마세요.

*2026-08-18에 Zebra `v6.3.0` 및 Zallet `v0.1.0-beta.2`을 기준으로 검증했습니다.*

## Zcash에서 이 문제가 더 중요한 이유

변조된 지갑 바이너리는 spending key나 viewing key를 빼돌릴 수 있습니다. 유출된 비밀번호와 달리 이러한 손실은 영구적입니다. 되돌리기나 결제 취소도, 지원 데스크도 없습니다. 거래정보 보호 거래는 *온체인*에서 일어나는 일을 보호하지만, 실행 중인 소프트웨어가 사용자에게 도달하기 전에 교체되었다면 전혀 보호해 주지 않습니다.

이는 프로토콜의 프라이버시 보장이 사실상 아무런 역할을 하지 못하는 몇 안 되는 공격 경로 중 하나입니다. 검증은 바로 이러한 위험을 막는 계층입니다.

## 위협 모델 — 검증으로 잡을 수 있는 것과 없는 것

**잡을 수 있는 것:**

- 변조된 미러나 프로젝트의 릴리스 페이지가 아닌 다른 곳에서 제공되는 수정된 파일
- 다운로드 중 발생하는 중간자 스왑
- 침해된 CDN 또는 탈취된 배포 호스트
- 전송 중 우발적인 파일 손상

**잡을 수 없는 것:**

- 악성 코드를 서명하는 관리자. 서명은 올바르게 검증되지만, 서명은 출처를 증명할 뿐 의도를 증명하지 않습니다.
- 서명된 악성 산출물을 만들어 내는 침해된 빌드 호스트. 재현 가능한 빌드와 출처 증명은 이러한 위험을 줄이기 위해 존재합니다.
- 바이너리와 같은 침해된 출처에서 얻은 키. 공격자가 파일과 검증에 사용할 키를 모두 제어한다면 검증은 아무것도 알려주지 않습니다.

마지막 항목은 대부분의 안내서에서 빠뜨리는 내용입니다. **명령어를 실행하는 것만큼 키를 어디서 구했는지도 중요합니다.**

---

## 1부 — Zebra: 체크섬과 Sigstore

Zebra은 각 릴리스에 다음 자산을 게시합니다.

| 자산 | 용도 |
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

여기서는 `--ignore-missing`이 필요합니다. `SHA256SUMS`에는 모든 아키텍처가 포함되어 있지만 다운로드한 것은 하나뿐이기 때문입니다. 이 파일이 없으면 `sha256sum`는 존재하지 않는 aarch64 아카이브를 실패로 보고하므로, 통과를 실패로 잘못 읽을 수 있습니다.

파일별 방식도 사용할 수 있습니다.

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**이 단계만으로는 충분하지 않습니다.** 바이너리와 같은 곳에서 체크섬을 다운로드했습니다. 한쪽을 교체할 수 있는 사람은 다른 쪽도 교체할 수 있습니다. 체크섬은 무결성을 증명하며, 다음 단계에서는 출처를 증명합니다.

### 2b단계 — Windows에서 같은 방법으로 확인하기

PowerShell에는 `-c` 검증 모드가 없으므로 직접 비교해야 합니다.

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

실제 출력:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

이 값을 이 페이지 앞부분의 Linux 결과와 비교하세요.

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**값이 같습니다.** 16진수는 대소문자를 구분하지 않습니다. 이것은 Windows에서 가장 흔한 오경보입니다.

Windows에서 주의할 점이 2가지 더 있습니다.

- **확인할 종료 코드가 없습니다.** Linux에서 `sha256sum -c`은 실패 시 1을 반환하므로 스크립트가 그 결과에 따라 동작할 수 있습니다. `Get-FileHash`은 해시만 출력합니다. 비교는 직접 해야 하며, 훑어보다가 잘못 판단하는 것도 본인의 몫입니다.
- **64자리 16진수를 눈으로 읽는 것은 신뢰하기 어렵습니다.** 셸에 맡기세요.

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS의 경우:** 작업 흐름은 같지만 BSD 사용자 공간에는 `sha256sum` 대신 `shasum`이 포함되어 있으므로 `shasum -a 256 -c --ignore-missing SHA256SUMS`을 사용하세요. 이 페이지의 작성자는 macOS 기기를 사용할 수 없어서 해당 명령어를 실행하지 않고 Apple 도구를 참고해 문서화했습니다. macOS에서 검증한다면 확인하거나 수정한 뒤 PR을 열어 주세요.

### 3단계 — Sigstore 번들 검증

Sigstore는 오래 유지되는 서명 키 대신 CI ID에 연결된 단기 인증서를 사용하고, 이를 공개 투명성 로그에 기록합니다. 도난당할 수 있는 릴리스 키를 보유한 사람이 없습니다.

가장 간단한 방법은 `cosign`을 사용하는 것입니다.

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

두 `--certificate-*` 플래그가 핵심입니다. **이 플래그가 없으면 어딘가에 있는 누군가가 파일에 서명했다는 사실만 확인하는 셈입니다.** 이 플래그를 사용하면 GitHub의 OIDC 발급자가 인증한 Zebra 저장소의 워크플로가 서명했음을 확인할 수 있습니다.

> ⚠️ **버전이 중요합니다.** 이전 cosign 빌드는 현재 Sigstore 번들 형식을 읽을 수 없습니다. cosign `v2.4.1`로 위 명령어를 실행하면 다음과 같이 표시됩니다.
>
> > ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> 번들에 인증서가 *들어 있기는* 합니다. 인증서는 `verificationMaterial.certificate.rawBytes` 아래에 있지만, 이전 릴리스에서는 이 위치를 확인하지 않습니다. 클라이언트의 한계일 뿐, 릴리스가 잘못된 것은 아닙니다. 이런 문제가 발생하면 다운로드가 잘못되었다고 결론 내리지 말고 cosign을 업그레이드하세요. 배포판에서 제공하는 cosign은 업스트림보다 버전이 한참 뒤처진 경우가 많습니다.

다음 두 단계에서는 같은 번들을 직접 검증하는 방법을 보여 줍니다. 어떤 경우든 이해해 두면 유용하며, cosign 빌드가 제대로 작동하지 않을 때 쓸 수 있는 대안이기도 합니다.

### 4단계 — 인증서가 실제로 주장하는 내용 확인

`cosign` 없이도 번들을 살펴볼 수 있습니다. 신뢰하는 대상이 무엇인지 이해하는 데 유용합니다. 인증서를 추출하세요.

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

주체 대체 이름은 ID입니다. 저장소, 정확한 워크플로 파일, 태그의 이름을 표시합니다. Sigstore는 추가 빌드 메타데이터를 사용자 지정 확장에 포함합니다.

| 필드 | v6.3.0 값 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

이 항목은 모두 확인할 수 있습니다. 커밋 해시는 저장소의 태그와 일치해야 하고, 워크플로 실행 기록은 실제로 존재하며 공개되어 있어야 합니다.

### 5단계 — 암호학적으로 서명 검증

OpenSSL로 서명을 직접 확인할 수 있습니다.

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

번들에는 서명한 다이제스트도 기록됩니다. 로컬 파일과 일치하는지 확인하세요.

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### 6단계 — 투명성 로그 항목

번들에는 서명이 공개된 추가 전용 로그에 게시되었음을 증명하는 Rekor 항목이 들어 있습니다.

| 필드 | 값 |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

이 덕분에 키의 은밀한 오용을 감지할 수 있습니다. 로그에 한 번도 나타나지 않은 서명이나 그럴듯하지 않은 시점에 나타난 서명은 대응할 만한 신호입니다. 통합 시각을 릴리스 공지와 비교하세요.

> **OpenSSL 방식에 관한 참고:** 인증서의 공개 키를 사용해 서명을 검증하지만, 그 자체로 인증서 체인을 Sigstore 루트까지 검증하거나 로그 항목의 포함 증명을 확인하지는 않습니다. `cosign verify-blob`은 이 3가지를 모두 수행합니다. 작동 원리를 이해할 때는 OpenSSL을 사용하고, 실제 검증에는 `cosign`을 사용하세요.

---

## 2부 — Zallet: GPG 서명

Zallet은 다음과 같이 다른 자산을 게시합니다.

| 자산 | 용도 |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | 바이너리 아카이브 |
| `.tar.gz.asc` | 분리된 GPG 서명 |
| `.tar.gz.intoto.jsonl` | SLSA 출처 증명 |
| `.tar.gz.provenance.json` | 출처 메타데이터 |
| `.tar.gz.sbom.spdx` | 소프트웨어 자재 명세서 |

### 1단계 — 키를 찾기 전에 서명 키 식별하기

키를 가져오지 않은 상태에서 먼저 검증을 *실행*하세요.

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

실패가 아닙니다. 서명이 있다는 사실과 필요한 키를 정확히 알려 주므로, **키를 찾기 시작하기 전에** 확인할 수 있습니다. 지문과 발급자를 확인한 다음 다운로드 출처와는 별개인 출처에서 키를 받으세요.

> `gpg`은 현지 시간대로 타임스탬프를 표시합니다. 위 출력에는 `WAT`(UTC+1)이 표시되어 있습니다. 다른 곳에서는 같은 서명이 `18:18:44 UTC`으로 표시됩니다. 같은 순간입니다. 시간대 차이를 불일치로 여기지 마세요.

### 2단계 — 키 가져오기 및 검증

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

`Good signature`이 바로 확인하려던 결과입니다. 이 출력에는 사람들이 혼동하는 부분이 2가지 있지만, 둘 다 정상입니다.

### 지문이 공지와 일치하지 않는 이유

ZODL 키 전환 문서에는 지문 `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`이 명시되어 있습니다. 하지만 `gpg --verify`은 `1FE9 9324 …  23F0 617F`을 표시했습니다. 불일치처럼 보이지만 실제로는 그렇지 않습니다.

`gpg`은 서명을 만든 **하위 키**를 표시합니다. 공지에는 **기본 키**가 명시되어 있습니다. 직접 둘 사이의 관계를 확인하세요.

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

`sub` 행은 서명 하위 키이고, `pub` 행은 기본 키입니다. 하나의 ID에 하나의 키 패키지가 있습니다. 검증 결과에 지문이 **둘 다** 표시되는 이유입니다. 공개된 공지와 비교할 때는 *기본 키*를 비교하고, 하위 키 행은 어떤 키 부분이 작업을 수행했는지 알려 주는 것으로 보면 됩니다.

이렇게 키를 나누는 것은 의도적입니다. 기본 ID와 쌓아 온 신뢰를 버리지 않고도 서명 하위 키를 교체하거나 폐기할 수 있습니다.

### `[unknown]` 경고의 의미

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

서명에 문제가 있다는 **뜻이 아닙니다**. 서명은 암호학적으로 유효하며, `Good signature`이 바로 그 사실을 알려 줍니다. 경고는 다른 점을 말합니다. 이 키가 자신이 주장하는 사람의 소유라고 믿는다는 사실을 로컬 GnuPG에 알리지 않았다는 것입니다.

GnuPG은 다음 두 질문을 구분합니다.

1. **이 키가 이 파일에 서명했나요?** — `Good signature`이 답합니다. 암호학적 검증이며 사람의 판단이 개입되지 않습니다.
2. **이 키가 ZODL의 소유인가요?** — 암호학으로는 전혀 답할 수 없습니다. 지문을 독립적인 출처와 대조해 확인해야 합니다.

키에 로컬 서명을 명시적으로 하지 않는 한 거의 모든 검증에서 이 경고를 보게 됩니다. 실패로 여기지 마세요. **`Good signature`이 없다면 실패로 간주해야 합니다.**

### 3단계 — 키 전환 자체 검증

Zcash은 이전 ECC 엔지니어링 및 제품 팀이 2026년 1월에 ZODL을 설립한 뒤, 2026년에 릴리스 서명 키를 Electric Coin Company에서 Zcash Open Development Lab으로 이전했습니다.

| | 이전 키 | 새 키 |
|---|---|---|
| 지문 | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key(ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab(ZODL) `<sysadmin@zodl.com>` |
| 유형 | RSA 3072비트, 생성일 2023-06-19 | RSA 4096비트, 생성일 2026-03-23, 만료일 2028-03-22 |
| 게시 위치 | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

공개된 일정: 새 키 생성일 2026-03-23, 공지일 2026-03-27, 단독 서명 시작일 2026-04-23, 이전 ECC 키 폐기 예정일 2026-06-23.

웹사이트에 게시된 키 교체 공지는 웹사이트만큼만 신뢰할 수 있습니다. 올바른 방법은 **두 키 모두로 클리어 사인한** 문서를 사용해 이전 키가 새 키를 보증하게 하는 것입니다. ZODL은 바로 그런 문서를 게시합니다.

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

실제 출력(발췌 — 한 문서에 서명 2개):

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

한 문서에 이전 키와 새 키로 서명한 `Good signature` 결과가 2개 있습니다. 이전 릴리스에서 ECC 키를 신뢰했다면, ZODL 키를 신뢰하도록 `zodl.com`, `apt.z.cash` 또는 포럼 게시물을 별도로 신뢰하지 않아도 기존 신뢰가 이어집니다. 프로젝트가 키를 교체할 때 확인해야 할 속성입니다. 이런 과정이 없다면 이유를 물어볼 만합니다.

### 키를 구할 곳과 피해야 할 곳

가장 좋은 방법부터 가장 나쁜 방법 순입니다.

1. **이전 키로 서명한 문서:** 위에서 본 방식입니다. 키 교체 후 가장 강력한 선택지입니다.
2. **다운로드와 독립된 출처:** 바이너리는 GitHub에서, 키는 `apt.z.cash`에서 가져옵니다. 공격자는 둘 다 장악해야 합니다.
3. **공개된 지문과 대조한 키서버:** 대부분의 키서버에는 누구나 어떤 ID를 주장하는 키든 올릴 수 있습니다. 안전성을 보장하는 것은 키서버가 아니라 지문 비교입니다.
4. **바이너리와 같은 페이지:** 거의 아무런 보장이 없습니다. 한쪽을 교체할 수 있는 사람은 다른 쪽도 교체할 수 있습니다.

항상 **전체** 지문을 **기본 키**와 대조하세요. 짧은 키 ID는 쉽게 충돌을 일으킬 수 있으며 실제 공격에도 사용된 적이 있습니다.

## 3부 — 검증 실패 사례

실패가 어떤 모습인지 알아야 검증을 유용하게 사용할 수 있습니다. 유효한 아카이브 끝에 널 바이트 1개를 덧붙여 만든 실제 사례를 살펴보겠습니다.

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

실제 출력:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

종료 코드: `1`.

두 다이제스트를 나란히 놓고 비교하세요.

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676바이트 파일 끝에 바이트 1개를 덧붙였습니다. 두 해시는 접두부도 패턴도 공유하지 않습니다. 일부만 일치하거나 “대충 맞는” 경우는 없습니다. 체크섬은 정확히 일치하거나, 그렇지 않으면 원하는 파일이 아닌 것입니다.

### 이런 일이 생겼을 때 할 일

1. **바이너리를 실행하지 마세요.** 압축을 풀거나 `chmod +x`하지 마세요.
2. **공식 릴리스 페이지에서 다시 시도하세요.** 대부분의 실패는 다운로드가 중간에 끊긴 경우입니다.
3. **두 번째 시도에서도 실패하면 네트워크 경로를 바꾸세요.** 다른 연결이나 VPN을 사용하세요. 네트워크를 바꾼 뒤에도 계속되는 실패는 그렇지 않은 실패와 다릅니다.
4. **버전에 맞는 체크섬 파일인지 확인하세요.** v6.3.0을 v6.2.3 체크섬과 비교하면 정상적으로 실패합니다.
5. **그래도 실패하면 신고하세요.** 프로젝트 저장소에 이슈를 열거나, 고의적인 행위가 의심된다면 `SECURITY.md`의 보안 연락처를 이용하세요. 신고 채널은 [Zcash 생태계 보안](/zcash-community/zcash-ecosystem-security) 페이지를 참조하세요.
6. **산출물을 보관하세요.** 변조된 바이너리는 증거입니다. 신고하기 전에 삭제하지 마세요.

서명 실패는 체크섬 실패보다 심각합니다. 체크섬 불일치는 대개 손상이 원인이지만, 유효한 파일의 서명이 잘못되는 일은 실수로 발생하지 않습니다.

---

## 4부 — 참조 표

| 프로젝트 | 릴리스 게시 위치 | 방법 | 키 출처 |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | 키 없음 — GitHub OIDC를 통한 CI ID |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — 기본 `0338 34DD…58E2 6AB1`, 서명 하위 키 `1FE9 9324…23F0 617F` |
| **zcashd** | *폐기됨* | — | 2026-07-18에 블록 3,417,100에서 중단되었습니다. 설치하지 마세요. |
| **Zodl**(이전 Zashi) | App Store / Google Play; GitHub의 `zodl-inc` | Store signing; standalone Android binaries GPG-signed | 전환 문서에 명시된 ZODL 키 |

> **이름에 관한 참고:** Zashi은 2026년에 **Zodl**로 브랜드를 변경했습니다. App Store에서 먼저 변경했고, 그다음 Google Play에서도 변경했습니다. “Zashi”을 언급하는 이전 안내서는 같은 지갑 계보를 설명합니다.

---

## 5부 — 모바일 지갑 및 하드웨어 지갑

직접 다운로드하는 방식을 벗어나면 검증 방식이 달라집니다.

**앱 스토어.** 서명을 직접 확인할 수 없습니다. 스토어가 패키지에 서명하므로 스토어의 심사와 개발자 계정의 무결성을 신뢰해야 합니다. *직접* 확인할 수 있는 것은 올바른 앱을 받았는지 여부입니다. 게시자 이름과 패키지 식별자를 검색 결과가 아닌 프로젝트 공식 사이트와 대조하세요. 사칭 앱은 흔하며, 스토어 등록 정보는 진위의 증거가 아닙니다.

**독립 실행형 Android APK.** 검증할 *수 있습니다*. ZODL은 GitHub Releases를 통해 GPG 서명된 독립 실행형 Android 바이너리를 게시하므로 2부의 작업 흐름을 적용할 수 있습니다. 검증 가능한 체인을 원한다면 이 방법을 우선 사용하세요.

**하드웨어 지갑.** 기기는 자체 펌웨어를 증명하므로 신뢰 기준점은 사용자의 컴퓨터에 있는 파일이 아니라 하드웨어입니다. 기기 검증 절차는 [Keystone Zashi](/guides/keystone-zashi)을 참조하세요. 제조업체에서 직접 구매하세요. 공급망 변조는 공장에서 구매자에게 전달되는 과정에서 발생합니다.

---

## 더 읽어보기

- [Zcash 생태계 보안](/zcash-community/zcash-ecosystem-security) — 공개 정책 및 보안 연락처
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) — Zebra을 검증한 뒤 설치하기
- [Zallet 빠른 참조 안내서](/using-zcash/zallet-quick-reference-guide) — Zallet 사용하기
- [Sigstore 문서](https://docs.sigstore.dev/)
- [SLSA 출처 증명 수준](https://slsa.dev/)

---

*이 페이지의 명령어는 2026-08-18에 Zebra `v6.3.0` 및 Zallet `v0.1.0-beta.2`에서 실행했습니다. 릴리스 도구는 변경될 수 있습니다. 출력이 여기에 나온 내용과 다르면 직접 실행한 결과를 따르고 PR을 열어 주세요.*
