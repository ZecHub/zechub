<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash 지갑 자금 복구

**왜 개인 키를 보관해야 할까요?**

개인 키는 디지털 자산 보안의 비밀입니다. 이를 안전하게 보관하고 제3자와 절대 공유하지 않는 것은 필수적입니다.

> 이 문맥에서 **시드 구문**은 개인 키와 동등한 것으로 볼 수 있습니다.

개인 키에 대한 통제권을 유지하면 언제나 복구 절차를 진행할 수 있습니다. Zcash 개인 키에는 2가지 유형(transparent와 shielded)이 있으며, Sweep Funds 기능을 사용하거나 새 계정으로 가져오는 방식으로 이를 지갑에 쉽게 가져올 수 있습니다. 개인 키에 대한 통제권을 유지하면 자산에 대한 완전한 통제권을 유지하게 되며, 소유권, 보안, 그리고 마음의 평안을 보장할 수 있습니다.

# 보안과 책임

사용자는 개인 키를 다룰 때 수반되는 위험을 이해하고, 이 키를 무단 접근으로부터 보호하는 것이 매우 중요합니다. 자금의 보안은 사용자가 자신의 개인 키를 안전하게 보호할 책임을 지는 데 달려 있습니다.

> **시작하기 전에:** 예전 복구 가이드는 Ywallet를 안내하곤 했습니다. 개발자가 Ironwood (NU6.3) 네트워크 업그레이드에 맞춰 업데이트되지 않을 것이라고 확인했으므로, 이제 더 이상 체인을 따라갈 수 없습니다. 동일한 개발자가 만든 유지보수 후속작인 **Zkool**을 사용하세요. 이 페이지 하단의 [Ywallet는 더 이상 유지보수되지 않습니다](#ywallet-is-no-longer-maintained)를 참고하세요.

## Zkool로 자금 복구하기

[Zkool](https://github.com/hhanh00/zkool2/releases)은 동일한 개발자가 만든 Ywallet의 후속작이며, transparent 복구와 shielded 복구를 모두 지원합니다.

여기서는 두 가지 상황을 다룹니다:

1. 시드 구문, 개인 키 또는 viewing key로 **계정 복원하기**
2. transparent 주소만 지원했던 지갑에서 자금을 **스윕하기**

### 1) 계정 복원하기

1. [릴리스 페이지](https://github.com/hhanh00/zkool2/releases)에서 Zkool을 설치하고 실행합니다
2. **Account Manager**(메인 페이지)에서 **+** 버튼을 눌러 **New Account** 화면으로 이동합니다
3. 이 계정을 식별할 수 있도록 **Account Name**을 입력합니다
4. **Restore Account?**를 켭니다. 그러면 키와 birth height 필드가 표시됩니다
5. **Key (Seed Phrase, Private Key, or Viewing Key)**에 키를 붙여넣습니다. Zkool은 시드 구문, Sapling secret key, transparent extended key 또는 viewing key를 받을 수 있습니다
6. 지갑을 처음 사용한 시점을 대략 알고 있다면 **Birth Height**를 입력합니다. 이렇게 하면 Zkool이 어디서부터 스캔을 시작할지 알게 되어 시간을 크게 절약할 수 있습니다

![Restore Account와 Advanced Options가 모두 켜진 Zkool New Account 화면](/content-images/zkool-restore-account-60b1d2777e.webp)

> **birth height를 모르시나요?** 비워 두고 경고를 확인하세요. Zkool이 체인의 시작부터 스캔하므로 더 느리지만 아무것도 놓치지 않습니다. 자금이 2018년 10월 Sapling 업그레이드 이전의 것이라면, 나중 높이를 추측해서 넣기보다는 비워 두세요. 그렇지 않으면 스캔이 거래를 통째로 건너뛸 수 있습니다.

7. 계정을 저장한 다음 동기화합니다

### 다른 지갑의 시드 복원하기

시드가 다른 지갑에서 온 것이고 동기화 후 잔액이 이상해 보인다면, 대개 change address 파생 방식이 그 이유입니다.

같은 New Account 화면에서 더 아래에 있는 **Advanced Options** 스위치를 켠 다음, 저장하기 전에 **Use Internal Change**를 켜세요.

지갑마다 change address를 같은 방식으로 파생하지는 않습니다. 이 설정 없이 ZODL 시드를 Zkool에 복원하면 잔돈 note가 빠진 것처럼 잔액이 표시될 수 있으며, 이는 자금을 잃은 것처럼 보이지만 실제로는 아닙니다. 이 스위치에 대한 Zkool의 툴팁은 아직 Zashi를 언급하는데, 이것은 ZODL의 이전 이름입니다.

**Advanced Options** 아래에는 두 개의 필드가 더 있습니다:

- **Extra Passphrase (optional)**, 원래 지갑에서 이를 사용한 경우에만 입력합니다
- **Account Index**, 원래 지갑이 하나의 시드에 여러 계정을 담고 있었던 경우에 사용합니다. 자금이 다른 인덱스 아래에 있을 수 있습니다

> **이 두 항목은 유효한 시드 구문이 Key 필드에 들어가 있어야만 나타납니다.** 필드가 비어 있거나 개인 키 또는 viewing key가 들어 있으면, Zkool은 **Use Internal Change**와 **H/W Ledger**만 표시합니다. 먼저 시드를 붙여넣은 다음 Advanced Options를 여세요.

### 2) Transparent 전용 지갑에서 자금 스윕하기

자금이 shielded 주소를 전혀 지원하지 않았던 지갑(Trust, Coinomi, Guarda 등)에 있다면, 먼저 계정을 복원한 다음 자금을 shielded pool로 옮기세요.

1. 위 단계에 따라 계정을 복원합니다
2. 계정을 열고 **Receive Funds** 페이지로 이동합니다
3. 상단 바의 돋보기를 탭합니다(**Find other transparent addresses**). Ledger와 Exodus처럼 주소를 순환시키는 지갑은 하나의 시드에서 많은 transparent 주소를 생성하며, 이 기능이 자금을 보유한 주소들을 찾아냅니다
4. **그 후 계정을 재설정하고 동기화하세요.** 새로 찾은 주소들은 다음 스캔에서야 잔액을 반영하므로, 이를 건너뛰면 스윕이 아무것도 찾지 못한 것처럼 보일 수 있습니다
5. **Send** 페이지로 이동합니다. 잔액 근처에 텍스트 라벨이 없는 아이콘 버튼 세 개가 있습니다. 이름을 보려면 마우스를 올리거나 길게 누르세요:
   - **Shield One**(윤곽선 방패)은 한 번에 하나의 transparent 주소만 이동합니다
   - **Shield All**(채워진 방패)은 모든 transparent 주소의 자금을 한 번에 모두 이동합니다
   - **Unshield All**(열린 자물쇠)은 반대로 transparent 주소로 보냅니다

> **Shield One이 더 프라이버시 친화적인 선택입니다.** 여러 주소를 하나의 거래에서 shield하면 그것들이 같은 사람의 것이라는 연결 정보가 공개적으로 드러납니다. Zkool도 Shield All을 실행하기 전에 이에 대해 직접 경고합니다.

6. 거래를 검토한 뒤 전송합니다

Unshield All은 transparent 주소만 받는 거래소로 출금할 때 유용합니다. shielding 버튼은 계정에 shielded 주소가 있을 때만 나타나며, Unshield All은 transparent 주소가 있을 때만 나타납니다.

## 복구된 자금과 Ironwood 풀

2026년 7월 28일 Ironwood (NU6.3) 업그레이드가 활성화된 이후, Orchard 풀은 spend-only 상태입니다. 새로운 가치는 더 이상 이 풀로 들어갈 수 없고, 기존 가치는 turnstile을 통해 Ironwood로 빠져나갑니다.

복구한 자금이 Orchard에 있다면 정상적으로 동작하기 전에 마이그레이션이 필요합니다. 계정 메뉴를 열고 **Note Migration**을 선택하세요. 이 옵션은 실제로 마이그레이션할 것이 있을 때만 표시됩니다.

이 화면의 제목은 **Orchard to Ironwood Migration**이며 두 단계로 진행됩니다. 먼저 비표준 note를 표준 액면으로 분할한 다음, 그 note들을 하나씩 이동합니다. **Migration Speed**는 Ultra Fast부터 Slow까지의 슬라이더로, 단계 사이의 무작위 지연 시간을 설정합니다. **Start Migration**은 이 단계적 프로세스를 백그라운드에서 실행하며, 페이지를 닫았다가 나중에 다시 이어서 할 수 있습니다. **One Shot**은 이를 한 번에 처리합니다.

각 단계는 각각 별도의 거래이므로, 단계마다 수수료가 지불됩니다.

> **마이그레이션 금액은 공개됩니다.** 가치가 turnstile을 통과할 때 금액과 블록 높이는 체인상에서 보이지만, 송신자와 수신자는 계속 shielded 상태를 유지합니다. 눈에 띄는 금액은 사용자를 식별할 수 있으므로, one shot보다는 더 느린 속도의 단계적 마이그레이션을 선호하고, 이동한 금액과 IP 주소가 연결되지 않도록 먼저 Tor나 VPN을 통해 연결을 우회하는 것도 고려하세요.

## ZExCavator를 사용한 심층 복구

[ZExCavator](https://github.com/zingolabs/zexcavator)는 Zingo Labs의 복구 도구로, 손상되었거나 일부만 남은 지갑 파일처럼 일반적인 복원이 작동하지 않는 경우를 위한 것입니다.

> 마지막 업데이트가 최근 네트워크 업그레이드보다 앞서 있었으므로, 이를 최후의 수단으로만 취급하고 결과를 신뢰하기 전에 유지보수 중인 지갑에서 복구된 키를 검증하세요.

## Ywallet는 더 이상 유지보수되지 않습니다

Ywallet는 오랫동안 이 페이지에서 권장되던 복구 도구였고, 많은 오래된 가이드가 여전히 이를 가리키고 있습니다.

개발자는 Ironwood에 맞춰 업데이트되지 않을 것이라고 확인했습니다. 현재 합의 규칙을 지원하지 않는 지갑은 유효한 거래를 만들 수 없으므로, 더 이상 복구된 자금을 이동하는 데 사용할 수 없습니다. 동일한 개발자가 만든 **Zkool**이 유지보수되는 후속작이며, 이제 이 페이지는 이를 사용합니다.

이미 Ywallet 안에 자금이 있다면, 위 단계에 따라 같은 시드 구문을 Zkool에 복원하세요.

## 관련 페이지

- [지갑](/using-zcash/wallets) - 어떤 지갑이 유지보수되고 있으며 Ironwood 준비 상태는 어떤지
- [Ironwood](/zcash-tech/ironwood) - 업그레이드로 무엇이 바뀌었고 왜 자금이 마이그레이션되는지
- [메모](/using-zcash/memos) - 암호화된 메모가 작동하는 방식
- [Viewing Keys](/zcash-tech/viewing-keys) - 지출 권한 없이 읽기 전용으로 접근하는 방법
