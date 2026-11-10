<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 발신 Viewing Key (OVK)

발신 Viewing Key(OVK)는 실드된 출력의 *발신* 암호문을 암호화하는 데에만 사용되는 32바이트 값입니다. 이를 통해 자금을 사용할 권한이나 수신 노트를 볼 수 있는 권한 없이도, 당사자는 전송된 노트 평문(수신자 주소, 금액, 메모)을 복구할 수 있습니다.

수신자는 항상 자신의 수신 Viewing Key로 수신 노트를 복호화합니다. OVK의 선택은 수신자가 보는 내용을 바꾸지 않습니다. 원시 OVK에 대한 표준 인코딩은 없으며, 단순히 32바이트입니다.

## 요약

- OVK는 실드된 결제의 발신 평문을 누가 복구할 수 있는지만 제어합니다.
- 지갑은 세 가지 정책 중 하나를 선택합니다. **Sender**(계정의 UFVK를 사용하는 일반적인 복구), **Custom**(제공한 키를 사용하는 복구), 또는 **Discard**(체인에서 누구도 발신 평문을 복구할 수 없음)입니다.
- Discard 또는 사용자 지정 OVK를 사용하더라도 UFVK 보유자는 여전히 어떤 노트가 사용되었는지 확인하고 계정에서 빠져나간 순금액을 계산할 수 있습니다.
- 특정 UFVK에서 금액을 보이지 않게 하는 유일하게 신뢰할 수 있는 방법은 해당 노트가 그 계정에 속한 적이 없도록 하는 것입니다(별도 계정 또는 별도 지갑).
- 이 세 가지 정책은 이미 `zcash_client_backend`에 존재하지만, 오늘날 거의 모든 지갑은 기본 Sender 정책만 사용합니다.

---

## 세 가지 정책

`zcash_client_backend` 기반 지갑은 트랜잭션을 생성할 때 `OvkPolicy`를 선택합니다.

| 정책 | 발신 암호문 | 나중에 발신 평문을 복구할 수 있는 주체 |
|--------|----------------------|----------------------------------------------|
| **Sender**(기본값) | 계정의 일반 OVK로 암호화됨 | 송신 계정의 Unified Full Viewing Key |
| **Custom** | 제공한 키로 암호화됨 | 제공된 키를 보유한 사람 |
| **Discard** | OVK를 사용하지 않음(`ovk = ⊥`) | 아무도 없음(송신자 포함) |

편의 생성자는 하나의 32바이트 값으로 `Custom` 정책을 생성하므로, 외부 및 내부 OVK가 동일한 키가 됩니다.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

[OvkPolicy 문서](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) 및 [ZIP 310](https://zips.z.cash/zip-0310)을 참조하세요.

## 각 정책의 용도

**Sender**는 일반적인 지갑 동작입니다. 트랜잭션이 채굴된 후 계정의 UFVK를 보유한 모든 사람은 발신 암호문을 복호화하여 수신자 주소, 금액 및 메모를 복구할 수 있습니다.

**Custom**을 사용하면 전체 Viewing Key를 제공하지 않고도 제3자(감사인, 결제 처리자, 영수증 시스템 또는 별도 기기)에게 특정 발신 결제를 복호화할 수 있는 권한을 줄 수 있습니다. 트랜잭션 후 폐기하는 일회성 키를 사용하거나, 단일 키가 모든 발신 결제를 볼 수 없도록 상대방별로 서로 다른 키를 사용할 수도 있습니다.

**Discard**는 송신 지갑이 체인에서 발신 평문을 복구할 수 없음을 의미합니다. 이는 나중에 UFVK가 손상되었을 때 복구 가능한 정보를 최소화하고 싶거나, 계정의 OVK로 열 수 있는 온체인 기록을 의도적으로 남기고 싶지 않을 때 유용합니다.

## UFVK 보유자가 여전히 볼 수 있는 것

Discard 또는 사용자 지정 OVK를 사용하더라도 계정의 UFVK 보유자는 여전히 다음을 할 수 있습니다.

- 계정의 어떤 노트가 사용되었는지 감지합니다(nullifier를 통해).
- 해당 입력 노트의 값을 파악합니다.
- 모든 거스름돈 노트를 복구합니다(이들은 OVK가 아니라 내부 수신 Viewing Key로 암호화됩니다).
- 따라서 계정에서 빠져나간 순금액을 계산합니다.

개별 수신자 주소, 금액 분할, 메모는 보이지 않습니다. `WalletWrite` 문서는 Discard(또는 무작위 사용자 지정 OVK) 아래에서 생성된 트랜잭션 데이터는 로컬 기록을 잃어버린 경우 체인 데이터에서 복구할 수 없다고 경고합니다.

## 특정 UFVK에서 금액을 숨기기

`OvkPolicy`는 발신 평문의 복구만 제어합니다. 계정 자체의 UFVK에서 사용 내역이나 순금액을 숨기지는 않습니다.

특정 UFVK에서 금액이 보이지 않도록 하는 유일하게 신뢰할 수 있는 방법은 해당 금액을 담고 있던 노트가 그 UFVK가 제어하는 계정에 속한 적이 없도록 하는 것입니다.

1. **별도의 ZIP-32 계정**(동일 시드) — 새 계정 인덱스를 생성하고, 자금을 해당 계정으로 옮긴 뒤 그 계정의 UFVK를 절대 내보내지 않습니다. 원래 계정의 UFVK는 새 계정으로의 전송만 볼 수 있습니다.
2. **완전히 별도의 지갑**(다른 시드) — 새 지갑에 자금을 넣고, 그 지갑에서 사용한 뒤 시드 또는 UFVK를 폐기합니다. 원래 지갑에는 자금 조달 전송만 기록됩니다.
3. **일회성 임시 지갑** — 위와 같지만, 지출용 지갑을 일회용으로 취급합니다.

UFVK는 계정별입니다. 해당 계정에 존재한 적이 없는 노트는 그 계정의 잔액이나 유출 총액에 나타나지 않습니다.

## 오늘날 지갑이 정책을 사용하는 방식

거의 모든 프로덕션 지갑은 기본 **Sender** 정책만 사용하므로, 전체 발신 기록을 UFVK에서 복구할 수 있습니다. 나머지 두 정책은 라이브러리에 존재하지만 사용자 인터페이스에는 거의 노출되지 않습니다.

향후 가능한 옵션은 다음과 같습니다.

- 사용자가 단일 결제에 대해 Custom 또는 Discard를 선택할 수 있도록 하는 트랜잭션별 플래그.
- 영구적인 Discard 모드(이 경우 시드를 복원하면 순유출만 표시됨).
- 개별 결제를 선택적으로 공개하기 위한 사용자 지정 OVK(전체 [ZIP 311](https://zips.z.cash/zip-0311) 결제 공개보다 가벼움).
- 더 강력한 격리를 위해 계정 또는 지갑 분리를 계속 사용하는 방식.

## 자료

- [ZIP 310: Sapling Viewing Key의 보안 속성](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Address 및 Unified Viewing Key](https://zips.z.cash/zip-0316)
- [ZIP 315: 지갑 구현을 위한 모범 사례](https://zips.z.cash/zip-0315)
- [zcash_client_backend의 OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## 관련 페이지

- [Viewing Key](/zcash-tech/viewing-keys)
- [결제 공개](/zcash-tech/payment-disclosures)
- [Unified Address](/zcash-tech/unified-addresses)
- [블록 탐색기가 볼 수 있는 내용](/zcash-tech/what-a-block-explorer-can-see)
