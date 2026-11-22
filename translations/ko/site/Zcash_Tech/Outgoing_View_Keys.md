<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 발신 viewing key(OVK)

발신 viewing key(OVK)는 거래정보 보호 출력의 *발신* 암호문만 암호화하는 데 사용되는 32바이트 값입니다. 이 키를 사용하면 자금을 사용할 수 없고 수신 노트를 볼 수도 없는 상태에서 전송된 노트의 평문(수신자 주소, 금액, 메모)을 복구할 수 있습니다.

수신자는 항상 자신의 수신 viewing key를 사용해 수신 노트를 복호화합니다. OVK를 어떻게 선택하든 수신자에게 보이는 내용은 달라지지 않습니다. 원시 OVK의 표준 인코딩은 없으며, 그저 32바이트 값입니다.

## 요약

- OVK는 거래정보 보호 결제의 발신 평문을 누가 복구할 수 있는지만 제어합니다.
- 지갑은 3가지 정책 중 하나를 선택합니다. **Sender**(계정의 UFVK를 사용하는 일반 복구), **Custom**(사용자가 제공하는 키를 사용한 복구), 또는 **Discard**(체인에서 발신 평문을 아무도 복구할 수 없음)입니다.
- Discard 또는 사용자 지정 OVK를 사용하더라도 UFVK 보유자는 어떤 노트가 사용되었는지 확인하고 계정에서 유출된 순액을 계산할 수 있습니다.
- 특정 UFVK에 금액이 보이지 않도록 하는 유일하게 확실한 방법은 해당 노트가 그 계정에 속한 적이 없도록 하는 것입니다(별도 계정 또는 별도 지갑).
- 이 3가지 정책은 이미 `zcash_client_backend`에 있지만, 현재 거의 모든 지갑은 기본 Sender 정책만 사용합니다.

---

## 3가지 정책

`zcash_client_backend`를 기반으로 만든 지갑은 거래를 구성할 때 `OvkPolicy`을 선택합니다.

| 정책 | 발신 암호문 | 나중에 발신 평문을 복구할 수 있는 사람 |
|--------|----------------------|----------------------------------------------|
| **Sender** (기본값) | 계정의 일반 OVK로 암호화 | 발신 계정의 Unified Full Viewing Key |
| **Custom** | 사용자가 제공한 키로 암호화 | 제공된 키를 보유한 사람 |
| **Discard** | OVK를 사용하지 않음(`ovk = ⊥`) | 아무도 복구할 수 없음(발신자도 불가) |

간편 생성자를 사용하면 단일 32바이트 값으로 `Custom` 정책을 만들 수 있으며, 이에 따라 외부 OVK와 내부 OVK가 같은 키가 됩니다.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

[OvkPolicy 문서](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) 및 [ZIP 310](https://zips.z.cash/zip-0310)을 참조하세요.

## 각 정책의 용도

**Sender**는 일반적인 지갑 동작 방식입니다. 거래가 채굴된 후에는 계정의 UFVK를 보유한 누구나 발신 암호문을 복호화하고 수신자 주소, 금액, 메모를 확인할 수 있습니다.

**Custom**을 사용하면 제3자(감사인, 결제 지원 서비스, 영수증 시스템 또는 별도 기기)에게 전체 viewing key를 제공하지 않고도 특정 발신 결제를 복호화할 수 있는 권한을 줄 수 있습니다. 거래 후 폐기할 임시 키를 사용하거나, 상대방마다 서로 다른 키를 사용해 어떤 단일 키로도 모든 발신 결제를 확인할 수 없게 할 수도 있습니다.

**Discard**은 발신 지갑이 체인에서 발신 평문을 복구할 수 없다는 뜻입니다. UFVK가 나중에 유출될 경우 복구 가능한 정보를 최소화하거나, 계정의 OVK로 열 수 있는 온체인 기록을 남기고 싶지 않을 때 유용합니다.

## UFVK 보유자가 여전히 볼 수 있는 정보

Discard 또는 사용자 지정 OVK를 사용하더라도 계정의 UFVK 보유자는 여전히 다음을 확인할 수 있습니다.

- nullifier를 통해 계정의 어떤 노트가 사용되었는지 확인할 수 있습니다.
- 해당 입력 노트의 금액을 알 수 있습니다.
- 잔돈 노트를 복구할 수 있습니다(잔돈 노트는 OVK가 아니라 내부 수신 viewing key로 암호화됩니다).
- 따라서 계정에서 유출된 순액을 계산할 수 있습니다.

보이지 않는 정보는 개별 수신자 주소, 금액의 분할 내역, 메모입니다. `WalletWrite` 문서에서는 Discard(또는 무작위 사용자 지정 OVK)로 생성한 거래의 데이터는 로컬 기록을 잃어버리면 체인 데이터에서 복구할 수 없다고 경고합니다.

## 특정 UFVK에 금액이 보이지 않게 하기

`OvkPolicy`은 발신 평문의 복구만 제어합니다. 계정 자체의 UFVK에 사용 내역이나 순액이 보이지 않도록 하지는 않습니다.

특정 UFVK에 금액이 보이지 않도록 하는 유일하게 확실한 방법은 해당 금액을 보유했던 노트가 그 UFVK가 관리하는 계정에 속한 적이 없도록 하는 것입니다.

1. **별도의 ZIP-32 계정**(동일한 시드) — 새 계정 인덱스를 만들고, 자금을 새 계정으로 옮긴 다음, 해당 계정의 UFVK를 내보내지 마세요. 원래 계정의 UFVK에는 새 계정으로의 송금만 표시됩니다.
2. **완전히 별도의 지갑**(다른 시드) — 새 지갑에 자금을 넣고, 그 지갑에서 사용한 다음, 시드 또는 UFVK를 폐기하세요. 원래 지갑에는 자금을 보낸 내역만 기록됩니다.
3. **일회용 임시 지갑** — 위와 같은 방식이지만, 사용 지갑을 폐기할 수 있는 지갑으로 취급합니다.

UFVK는 계정별로 존재합니다. 해당 계정에 한 번도 들어온 적이 없는 노트는 그 계정의 잔액이나 유출 합계에 나타나지 않습니다.

## 현재 지갑에서 정책을 사용하는 방식

현재 거의 모든 운영 지갑은 기본 **Sender** 정책만 사용하므로 UFVK에서 발신 내역 전체를 복구할 수 있습니다. 나머지 두 정책은 라이브러리에 있지만 사용자 인터페이스에 표시되는 경우는 드뭅니다.

향후 도입될 수 있는 옵션은 다음과 같습니다.

- 사용자가 단일 결제에 Custom 또는 Discard을 선택할 수 있는 거래별 플래그
- 영구적인 Discard 모드(시드를 복원하면 순유출만 표시됨)
- 개별 결제를 선택적으로 공개하기 위한 사용자 지정 OVK(전체 [ZIP 311](https://zips.z.cash/zip-0311) 결제 공개보다 가벼운 방식)
- 더 강력한 격리를 위해 계정 또는 지갑을 계속 분리해서 사용

## 참고 자료

- [ZIP 310: Sapling Viewing Key의 보안 속성](https://zips.z.cash/zip-0310)
- [ZIP 316: 통합 주소와 통합 viewing key](https://zips.z.cash/zip-0316)
- [ZIP 315: 지갑 구현 모범 사례](https://zips.z.cash/zip-0315)
- [OvkPolicy zcash_client_backend의 ](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## 관련 페이지

- [Viewing Key](/zcash-tech/viewing-keys)
- [결제 공개](/zcash-tech/payment-disclosures)
- [통합 주소](/zcash-tech/unified-addresses)
- [블록 탐색기에서 볼 수 있는 정보](/zcash-tech/what-a-block-explorer-can-see)
