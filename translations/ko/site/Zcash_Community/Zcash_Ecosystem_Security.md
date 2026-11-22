<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 수정"/>
</a>

# Zcash 생태계 보안

## 생태계 보안 책임자

Zcash 생태계 보안 책임자 역할은 ZCG 개발 지원금을 통해 마련되었으며, ECC와 ZF 외부에서 더 넓은 Zcash 생태계, 특히 ZCG 개발 지원금 수혜자에게 전담 보안 엔지니어링을 제공하기 위한 것입니다.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090)가 최초의 생태계 보안 책임자로 활동했습니다. 자세한 내용은 [zecsec.com](https://zecsec.com)에서 확인하세요.
- **2024–2025:** ZCG는 새로운 [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723)를 통해 역할을 이어갈 [Least Authority](https://leastauthority.com)를 선정했습니다. 업데이트는 [여기](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541)에서 확인할 수 있습니다.
- **2026:** Shielded Labs는 보안 역량을 강화하기 위해 Zcash의 보안 컨설턴트로 [engaged Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421)를 영입했습니다.

## ZCG 보안 및 취약점 공개 이니셔티브

[ZCG 보안 및 취약점 공개 이니셔티브](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545)는 Zcash 생태계 전반에서 보안 취약점을 조율하여 공개하기 위한 체계를 제공합니다.

## 최근 보안 업데이트 (2026)

- **Zebra 4.4.1 (2026년 5월):** [중요 보안 수정 사항](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588)이 공개되었습니다. 모든 노드 운영자는 즉시 업그레이드하시기 바랍니다.
- **Zebra 4.3.1 (2026년 4월):** [중요 보안 수정 사항, 도커 기반 채굴 및 CI 강화](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389)가 공개되었습니다.
- **여러 취약점 해결 (2026년 4월):** 사용자 자금이나 프라이버시에 영향을 주지 않고 [여러 Zcash 취약점에 대한 패치가 성공적으로 적용되었습니다](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388).
- **zcashd 권고문 (2026년 4월):** Zebra를 통해 트래픽을 라우팅하여 zcashd 공격 표면을 줄이기 위한 [권고문](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390)입니다.

## 책임 있는 공개

Electric Coin Company와 Zcash Foundation는 다음과 같은 예외를 제외하고 이 책임 있는 공개 [표준](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6)을 모두 준수합니다.

> "Zcash는 강력한 프라이버시를 제공하는 기술입니다. 노트는 목적지까지 암호화되며, 화폐 기반은 실제 Zcash 보유자만 생성할 수 있도록 설계된 영지식 증명을 통해 유지됩니다. 이 과정에 실패하여 위조 버그가 발생하면, 블록체인 분석가가 가해자나 버그 악용에 사용된 블록체인 데이터를 식별할 방법이 없는 상태에서 위조 버그가 악용될 수 있습니다. 따라서 일부 다른 프로젝트에서 이와 같은 경우에 실행했던 것처럼 해당 시점 이전으로 롤백하는 것은 불가능합니다. 이 표준은 취약점 제보자가 문제를 재현할 수 있도록 문제의 세부 정보를 모두 포함하도록 규정합니다. 예를 들어 외부 연구자가 실제로 보안 문제가 존재하며 해당 문제가 제보한 영향을 초래한다는 점을 입증하고 증명하는 경우에는, 개발팀이 문제의 우선순위를 정확하게 정하고 해결할 수 있도록 전체 세부 정보를 제공해야 합니다. 하지만 CVE-2019-7167의 경우와 마찬가지로 위조 버그가 발생한 경우에는, 조율된 공개에 앞서 파트너에게 보고할 때 해당 파트너가 취약하다는 점을 확신할 수 있다면 세부 정보를 포함하지 않기로 결정할 수도 있습니다."

## 보안 자료

- [Zcash 보안 권고문](https://github.com/zcash/zcash/security/advisories)
- [Zebra 보안 권고문](https://github.com/ZcashFoundation/zebra/security/advisories)
- [zcash/zcash의 취약점 신고](https://github.com/zcash/zcash/security/policy)
- [ZF에 취약점 신고](https://github.com/ZcashFoundation/zebra/security/policy)
