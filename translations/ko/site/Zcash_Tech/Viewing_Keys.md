<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Viewing Key

실드 주소를 사용하면 Zcash 블록체인에서 가능한 한 적은 정보만 드러내며 거래할 수 있습니다. 그렇다면 보유 자산이나 전송한 내역을 특정 상대에게 보여줘야 할 때는 어떻게 할까요? 모든 실드 주소에는 지출 권한은 부여하지 않으면서 읽기 접근 권한을 부여하는 Viewing Key가 있습니다. Viewing Key는 [ZIP 310](https://zips.z.cash/zip-0310)에서 도입되었고 Sapling 네트워크 업그레이드에서 프로토콜에 추가되었습니다.

Viewing Key는 선택적 공개를 위한 도구입니다. 누구에게 무엇을 보여줄지 직접 선택하며, 이를 위해 지출 권한을 넘겨줄 필요가 없습니다.

## 요약

뷰잉 키는 차폐된 Zcash 주소 또는 계정의 활동에 대한 **읽기 전용** 접근 권한을 부여합니다. 이를 보유한 사람은 수신 거래(그리고 Full Viewing Key의 경우 발신 거래도)를 볼 수 있지만, 절대 지출할 수는 없습니다.

- **무엇인가:** 실드 풀의 선택적 공개 도구입니다. [ZIP 310](https://zips.z.cash/zip-0310)에서 도입되어 Sapling 네트워크 업그레이드에서 프로토콜에 추가되었습니다.
- **무엇을 제공하는가:** 입금 감지(`uivk…` 인커밍 키) 또는 계정의 전체 입출금 가시성(`uview…` 통합 전체 보기 키), 그리고 레거시 Sapling `zxviews…` 키입니다.
- **무엇을 제공하지 않는가:** 지출 권한입니다. 보기 키 보유자가 하는 어떤 작업도 자금을 이동할 수 없습니다.
- **현재 어디서 작동하는가:** [Zallet](https://github.com/zcash/zallet)에서 내보내기/가져오기(v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`)와 Zkool 등의 지갑에서 감시 전용 계정을 사용할 수 있습니다. 현재 지원 매트릭스는 [지갑](/using-zcash/wallets) 페이지를 참조하세요.
- **경험칙:** 질문에 답하는 데 필요한 가장 좁은 범위의 키를 우선 사용하고, 한 번 전달한 키는 회수할 수 없으며 자금을 옮겨야만 그 키의 효력을 벗어날 수 있음을 기억하세요.

---

## Viewing Key를 사용하는 이유는 무엇인가요?

이 주제에 관한 Electric Coin Company의 글은 가장 흔히 발생하는 상황을 설명하며, 오늘날에도 여전히 일반적인 사례입니다.

- **입금을 감시하는 거래소.** 거래소는 인터넷에 연결된 탐지 노드에 Incoming Viewing Key를 불러와 실드 주소로 들어오는 고객 입금을 확인할 수 있으며, 지출 키는 네트워크에 절대 연결되지 않는 하드웨어에 보관합니다.
- **보유 자산을 증명하는 수탁자.** 수탁자는 각 실드 주소의 Full Viewing Key를 감사인에게 제공합니다. 감사인은 해당 잔액을 확인하고 그 주소들로의 과거 거래 및 그 주소들에서 발생한 과거 활동을 검토할 수 있지만, 그 외에는 아무것도 할 수 없습니다.
- **상대방에 대한 실사.** 거래소가 강화된 실사의 일부로 고객의 실드 거래 내역을 검토해야 하는 경우, 자금 대신 Viewing Key를 요청할 수 있습니다.

## Viewing Key가 공개하는 정보와 공개하지 않는 정보

키에는 여러 종류가 있으며, 그 차이에 따라 공개하는 정보의 범위가 결정됩니다.

| 키 | 접두사 | 권한 |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | 계정의 모든 풀에서 발생한 수신 **및** 발신 거래를 확인 |
| Unified incoming viewing key (UIVK) | `uivk…` | 계정의 모든 풀에서 발생한 수신 거래만 확인 |
| Sapling extended full viewing key | `zxviews…` | 해당 키의 주소에 대한 수신 및 발신 Sapling 활동을 확인 |

이들 중 어느 것도 지출할 수는 없습니다. 모두 중요한 의미에서 영구적입니다. 한 번 제공한 키는 회수할 수 없으며, 상대방이 키를 보유하지 않은 계정으로 자금을 옮겨야만 그 키의 효력이 더 이상 미치지 않게 됩니다.

무언가를 공유하기 전에 알아야 할 두 가지 공개 함정이 있습니다.

**수신 전용이 곧 좁은 범위를 의미하지는 않습니다.** Unified Incoming Viewing Key는 요청받은 하나의 주소가 아니라 전체 계정에 적용됩니다. 단일 Sapling 주소에 대한 UIVK를 내보내도 해당 계정의 모든 풀에 걸친 수신 내역을 볼 수 있으므로, 그 키가 가리키는 주소보다 더 많은 정보를 공개하게 됩니다. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)은 이를 명시적으로 설명합니다.

**공개된 주소는 이미 미래의 공격자에게 Incoming Viewing Key를 노출할 수 있습니다.** [ZIP 326](https://zips.z.cash/zip-0326)은 양자 컴퓨터를 가진 공격자가 공개된 다양화 주소에서 Incoming Viewing Key를 복구할 수 있으며, 이는 nullifier 키를 복구하는 것과 달리 가능한 방식이라고 설명합니다. 오늘날 주소를 공개하는 것이 Viewing Key를 공개하는 것과 같지는 않지만, 충분히 긴 시간 범위에서는 둘 사이의 거리가 더 가까워집니다.

## Ironwood 이후의 Viewing Key

NU6.3은 Ironwood 실드 풀을 도입하고 Orchard 풀을 지출 전용으로 만들었으므로, 시간이 지나면서 자금은 한 풀에서 다른 풀로 이동합니다. 업그레이드 자체에 대해서는 [Ironwood](/zcash-tech/ironwood) 및 [The turnstile](/zcash-tech/the-turnstile)을 참조하세요.

**Ironwood 이전에 발급된 Viewing Key는 마이그레이션 후에도 계속 작동합니다.** ZIP 326은 수신자와 그에 대응하는 Incoming Viewing Key가 풀에 아니라 Orchard *프로토콜*에 범위가 지정된다고 명시합니다. 즉, 동일한 Incoming Viewing Key로 Orchard 풀과 Ironwood 풀의 노트 암호문을 모두 시험 복호화할 수 있습니다. Zallet은 이를 그렇게 구현하며, Ironwood 노트를 Orchard 형태로 설명하고 Ironwood 노트 암호화 도메인에서 계정의 Orchard Viewing Key로 시험 복호화합니다.

키를 보유하거나 발급하는 모든 사람에게는 세 가지 결과가 있습니다.

1. **잔액은 풀 사이를 이동하며, 조회자는 그 과정을 볼 수 있습니다.** [ZIP 318](https://zips.z.cash/zip-0318)은 마이그레이션을 무작위화된 일정에 따라 브로드캐스트되는 작고 의도적으로 균일한 Orchard-에서-Ironwood로의 거래 श्रृ로 정의합니다. 각 거래는 하나의 Orchard 노트를 지출하고 표준 단위의 Ironwood 출력 하나를 생성합니다. Viewing Key로 감시하는 감사인은 보유 자산이 한 번에 이동하는 것이 아니라 수 주에 걸쳐 단계적으로 한 풀에서 다른 풀로 이동하는 것을 봅니다. 지갑은 Viewing Key를 사용해 체인 데이터로부터 자체 마이그레이션 진행 상황을 재구성할 수 있습니다.
2. **각 마이그레이션 단계는 이동하는 가치를 공개합니다.** 이는 턴스타일을 통과하는 데 본질적인 특성이며, 마이그레이션을 감사할 수 있게 만드는 요소입니다. 잔액을 표준 단위로 분할하면 단일 거래로 전체 Orchard 풀 잔액이 공개되지는 않습니다.
3. **Ironwood 이후에 생성된 계정은 키를 다르게 파생할 수 있습니다.** [ZIP 2005](https://zips.z.cash/zip-2005)은 양자로 복구 가능한 키를 위한 `use_qsk` 플래그를 추가하며, Incoming Key, Outgoing Key 및 diversifier 키의 파생 방식을 변경하므로 `use_qsk = true` 키는 실제로 서로 다른 키입니다. ZIP 326은 해당 플래그가 계정 전체에서 일관되어야 한다고 요구하며, Mainnet에서 NU6.3이 활성화되기 전에는 `use_qsk = true` 키를 생성하는 것을 금지합니다. 따라서 Ironwood 이전에 존재했던 계정에서 내보낸 키는 `use_qsk = false` 키이며, 해당 계정에 대해서는 계속 올바릅니다. 한 계정에서 내보낸 키가 다른 계정을 설명한다고 가정하지 마세요.

## Viewing Key 내보내기

### Zallet

[Zallet](https://github.com/zcash/zallet)은 zcashd 내부 지갑을 대체한 풀 노드 지갑입니다. Viewing Key 내보내기 및 가져오기는 **v0.1.0-beta.2(2026년 7월 28일)**에 도입되었으므로 먼저 버전을 확인하세요. 이전 빌드에는 이러한 메서드가 없습니다. 메서드 이름 뒤의 모든 인수는 유효한 JSON이어야 하므로 문자열 값에는 자체 큰따옴표를 유지해야 합니다. 일반적인 명령 형식은 [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide)에서 다룹니다.

지갑이 보유한 항목을 나열합니다.

```bash
zallet rpc listaddresses
```

Unified Address를 전달하여 계정의 Unified Full Viewing Key를 내보냅니다.

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

선택적 `ivk` 인수를 사용하여 계정의 Unified Incoming Viewing Key를 대신 내보냅니다.

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling 주소를 전달하면 해당 계정의 Sapling 확장 Full Viewing Key(`zxviews…`)가 반환되며, 이는 기존 zcashd 동작과 일치합니다. 문서화된 두 가지 제한 사항이 있습니다. Sprout 주소는 거부되며, 보기 전용으로 가져온 계정에서는 Sapling 확장 Full Viewing Key를 내보낼 수 없습니다. 지갑이 이를 재구성할 수 없기 때문입니다. `ivk` 형식은 가져온 보기 전용 계정에서도 작동합니다.

### 자체 인터페이스에서 Viewing Key를 내보내는 지갑

[Wallets](/using-zcash/wallets) 페이지는 각 지갑의 Viewing Key 지원 및 Ironwood 준비 상태를 추적합니다. 작성 시점에 Viewing Key 지원과 **Ironwood: Ready**를 모두 표시하는 지갑에는 ZODL, Zingo!, Zkool, Cake, Zallet, zecd 및 Nozy가 있습니다. 준비 상태는 변경되므로, 특정 지갑에 의존하기 전에 이 페이지를 확인하세요.

## Viewing Key를 보기 전용 계정으로 가져오기

### Zkool

[Zkool](https://github.com/hhanh00/zkool2)은 Unified Key와 레거시 키를 모두 허용하므로 여기서 가장 유연한 선택지입니다. README는 **Unified Viewing Key** 또는 **Sapling 확장 Viewing Key**로 생성한 보기 전용 계정과 zcashd에서 내보낸 레거시 실드 확장 키를 설명합니다. 새 계정을 추가하고 보기 전용 경로를 선택한 후 `uview…` 또는 `zxviews…` 키를 붙여 넣으세요. 그러면 해당 계정은 동기화되어 지출 권한 없이 잔액과 내역을 표시합니다.

Ironwood 프로토콜 지원 및 Orchard-에서-Ironwood로의 마이그레이션은 Zkool 6.24.0(2026년 7월 20일)에 도입되었으며, 6.26.1(2026년 8월 2일)에서는 mempool의 Ironwood 거래 탐지 문제가 수정되었습니다. 6.26.1 이상을 실행하세요.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

두 번째 인수는 재스캔 정책입니다: `"whenkeyisnew"`(기본값), `"yes"` 또는 `"no"`. 세 번째 인수는 재스캔을 시작할 블록 높이입니다. Zallet은 키를 보기 전용 계정으로 가져오며, 지출 권한 없이 해당 주소의 수신 및 발신 거래를 추적합니다.

**Zallet은 Sapling 확장 Full Viewing Key만 가져옵니다.** Unified Full Viewing Key인 `uview…`는 내보낼 수 있더라도 가져올 수 없습니다. 전체 Unified 계정에 대한 읽기 접근 권한을 넘기려면 Zallet에서 UFVK를 내보내고 Zkool처럼 Unified Key를 허용하는 지갑으로 가져오세요.

가져온 키를 txid, 수수료 및 메모가 포함된 완전한 거래 내역 파일로 만드는 방법은 [Viewing Key](/guides/viewing-key-transaction-export)에서 확인하세요.

## 변경된 사항 및 더 이상 찾지 말아야 할 것

이 페이지의 이전 버전이나 그 번역본을 따랐다면, 세 가지 경로는 더 이상 작동하지 않습니다.

- **`zcash-cli z_exportviewingkey` 및 `z_importviewingkey`.** zcashd은 2026년 7월 18일 지원 종료 중단에 도달했으며 더 이상 실행되지 않습니다. 이를 대체하는 것은 Zallet의 동일한 이름의 메서드입니다. [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)을 참조하세요.
- **Ywallet 안내.** Wallets 페이지는 Ywallet을 **Ironwood: Not Ready**로 표시하므로 Ironwood 시대의 Viewing Key를 위해 사람들에게 추천할 지갑이 아닙니다. 동일한 개발자의 Zkool은 같은 범위의 키를 허용하며 Ready로 표시됩니다.
- **zcashblockexplorer.com/vk.** 이 서비스는 유효하지 않은 인증서와 함께 HTTP 503을 반환하며, 대체되지 않고 삭제되었습니다. 웹사이트에 Viewing Key를 붙여 넣으면 전체 거래 내역을 해당 웹사이트 운영자에게 넘기게 되며, 이는 이전 페이지의 세 가지 옵션 중 언제나 가장 취약한 방식이었습니다. 대신 직접 실행하는 지갑으로 키를 가져오세요.

## 시각적 / 비유

### 감사인의 창

보호된 계정을 은행의 안전 금고실이라고 생각해 보세요:

- **지출 키**는 방 열쇠입니다. 이를 가진 사람은 누구나 상자를 열고 내용물을 꺼낼 수 있습니다.
- **뷰잉 키**는 감사자가 그 방을 들여다볼 수 있는 창입니다. 감사자는 모든 상자가 들어오고 나가는 것을 보고, 라벨을 읽고, 원장을 기록할 수 있습니다. 하지만 그 창에는 손잡이가 없습니다. 창을 통해 들여다보는 사람은 방 안의 어떤 것도 옮길 수 없습니다.

### 창이 표시할 수 없는 것

창은 방을 향할 뿐, 그 바깥세상을 향하지는 않습니다. 이는 관찰 대상 계정의 차폐된 활동을 보여줄 뿐이며, 관찰자를 블록체인 전체의 관찰자로 만들지도 않고 계정의 활동을 다른 사람의 비차폐 이력과 연관지을 수도 없게 합니다. 또한 이 창은 계정 수준에 설치되므로, 한 개의 보관함(단일 주소)을 들여다볼 수 있는 구멍을 누군가에게 제공하더라도 그 사람은 방 전체의 수신 내역을 볼 수 있습니다. 바로 이것이 가장 좁은 키 규칙이 존재하는 이유입니다.

### 창을 되돌릴 수 없는 이유

Viewing Key는 권한 항목이 아니라 정보 조각입니다. 한 번 복사되면, 그것이 지켜보는 계정에서 자금이 나갈 때까지 존재합니다. 실질적인 해결책은 교체입니다. 상대방이 한 번도 키를 받은 적 없는 새 계정으로 잔액을 옮기면, 오래된 창은 빈 방을 마주하게 됩니다.

## 심층 분석

### 시험 복호화: 보기 기능이 실제로 작동하는 방식

모든 차폐 트랜잭션은 의도된 수신자에게 노트 평문을 암호화합니다. viewing key를 보유한 지갑은 **시도 복호화**를 수행합니다. 체인에서 찾은 각 트랜잭션에 대해 이 키로 노트 암호문을 복호화하려 시도합니다. 성공하면 노트의 가치, 수신자 diversifier 및 메모가 드러나며, 실패해도 비용은 들지 않습니다. यही 때문에 동일한 incoming viewing key는 Orchard 및 Ironwood 풀 전반에서 계속 작동합니다. [ZIP 326](https://zips.z.cash/zip-0326)은 수신자를 Orchard *protocol*에 한정하므로, Ironwood 노트 암호문은 Orchard 형태이며 Ironwood 노트 암호화 도메인에서 계정의 Orchard viewing key로 시도 복호화됩니다.

### 전체 대 수신: 어떤 파생이 이를 결정하는가

**전체** 보기 키는 발신 보기 기능을 파생할 수 있으며, 이는 트랜잭션이 복호화된 후 감사자가 전송의 *발신자* 측을 재구성할 수 있게 합니다. **수신** 보기 키는 의도적으로 그보다 제한적입니다. 수신 노트를 감지하고 복호화할 수는 있지만 발신 연결 관계를 재구성할 수는 없습니다. 이러한 기능 간의 파생은 단방향입니다. 수신 키는 전체 키*로부터* 파생되며, 그 반대는 절대 아닙니다. 따라서 “수신 전용”은 약속이 아니라 실제로 제한된 권한이 됩니다. [ZIP 2005](https://zips.z.cash/zip-2005)의 `use_qsk` 플래그는 파생 자체를 변경하므로, 양자 복구 가능한 키는 기존 키의 변형이 아니라 완전히 다른 키 계열입니다.

### 뷰어에게 마이그레이션이 어떻게 보이는가

[ZIP 318](https://zips.z.cash/zip-0318) 마이그레이션은 작고 균일한 Orchard-에서-Ironwood 거래를 무작위로 연속 수행하므로, 키를 보유한 관찰자에게는 하나의 큰 변동이 아니라 표준 액면가 값의 여러 단계로 이루어진 계단처럼 보입니다. 개별 단계 하나만으로는 마이그레이션되는 총 잔액을 알 수 없지만, *패턴*은 식별할 수 있습니다. 이는 감사 가능한 턴스타일이 의도한 절충안입니다.

## 실질적 영향

- **거래소 및 결제 처리업체용:** 투명 주소를 사용할 때와 마찬가지로 계정의 incoming viewing key(또는 완전한 범위를 위한 UFVK)를 감지 노드에 로드하고 고객 입금을 자동으로 대조할 수 있습니다. 단, 고객의 spending key는 콜드 스토리지를 절대 벗어나지 않습니다.
- **감사 및 지급준비금 증명용:** full viewing key는 "우리를 믿으세요"를 "직접 검증하세요"로 바꿉니다. 감시 대상 계정의 잔액과 전체 거래 내역을 확인할 수 있지만, 해당 계정에 손을 댈 권한은 전혀 없습니다. 단일 결제에 관한 일회성 증명에는 [결제 공개](/zcash-tech/payment-disclosures)를 함께 사용하세요.
- **실사 용도:** 거래와 관련된 계정의 키만 상대방에게 제공하고, 지갑 전체를 제공하지 마세요. 관계가 종료되면 해당 계정을 교체하세요.
- **도구 선택용:** Zallet는 UFVK를 내보내고 Sapling extended full viewing key를 가져오며, Zkool는 unified 및 legacy key를 감시 전용 계정으로 받아들입니다. 지갑을 표준으로 채택하기 전에 [지갑](/using-zcash/wallets) 페이지에서 현재 Ironwood 준비 상태 매트릭스를 확인하세요.
- **공개의 비용은 영구적입니다:** 키를 보유한 사람이 한 명 늘어날 때마다 닫을 수 없는 영구적인 프라이버시 신용 한도가 생깁니다. 관계별로 키를 발급하고, 하나의 계정으로 범위를 제한하며, 누가 무엇을 보유하는지 기록하세요.

## 흔한 실수

| 일반적인 믿음 | 실제 상황 |
| --- | --- |
| "뷰잉 키가 유출되면 자금을 사용할 수 있다." | 그렇지 않습니다. 뷰잉 키에는 지출 권한이 없으며, 유출 시 최악의 경우 거래 내역이 공개될 뿐입니다. |
| "나중에 뷰잉 키를 취소할 수 있다." | 취소할 수 없습니다. 전달한 키는 상대방이 보유하지 않은 키를 가진 계정으로 자금이 이동할 때까지 작동합니다. |
| "한 주소의 UIVK를 내보내면 해당 주소만 표시된다." | 뷰잉 키는 계정 범위로 적용됩니다. UIVK는 계정 내 모든 풀의 수신 활동을 표시합니다. |
| "`zcash-cli z_exportviewingkey`는 여전히 작동한다." | 아닙니다. zcashd는 2026년 7월 18일 지원 종료에 따라 중단되었으므로, 대신 Zallet의 `z_exportviewingkey` / `z_importviewingkey`를 사용하세요. |
| "읽기 전용이므로 웹 도구에 뷰잉 키를 붙여넣어도 안전하다." | 읽기 전용이라도 해당 계정의 전체 거래 내역을 사이트 운영자에게 넘기는 것을 의미합니다. 직접 운영하는 지갑에 키를 가져오세요. |
| "Zallet는 Zallet가 내보낼 수 있는 모든 뷰잉 키를 가져올 수 있다." | 아닙니다. Zallet는 Sapling 확장 전체 뷰잉 키만 가져올 수 있으며, 통합 `uview…` 키는 Zkool처럼 통합 키를 지원하는 지갑에 넣어야 합니다. |

## 관련 페이지

- [결제 공개](/zcash-tech/payment-disclosures) — 계정에 대한 지속적인 접근 권한을 부여하지 않고 하나의 결제에 관한 선택된 세부 정보를 증명하는 것
- [통합 주소](/zcash-tech/unified-addresses) — viewing key 수신자를 담는 주소 계층
- [Ironwood](/zcash-tech/ironwood) — Orchard이(가) 마이그레이션되는 NU6.3 차폐 풀
- [턴스타일](/zcash-tech/the-turnstile) — 시청자가 지켜볼 수 있는 Orchard에서 Ironwood로의 마이그레이션 메커니즘
- [지갑](/using-zcash/wallets) — 지갑, viewing key 지원 및 Ironwood 준비 상태의 전체 디렉터리
- [Viewing Key에서 거래 내역 내보내기](/guides/viewing-key-transaction-export) — 가져온 키를 완전한 txid/수수료/메모 내역 파일로 변환하는 것

## 자료

Viewing Key는 필요한 경우에만 사용하고, 질문에 답할 수 있는 가장 좁은 범위의 키를 선호하세요.

- [결제 공개](/zcash-tech/payment-disclosures) - 계정에 대한 지속적인 접근 권한을 부여하지 않고 하나의 결제에 대한 선택된 세부 정보를 증명하기
- [ZIP 326: NU6.3 지갑에 미치는 영향](https://zips.z.cash/zip-0326) — Orchard 및 Ironwood 풀 전반에서 viewing key가 작동하는 방식
- [ZIP 229: 버전 6 거래 형식](https://zips.z.cash/zip-0229) — Orchard 및 Ironwood 풀을 정의합니다
- [ZIP 310](https://zips.z.cash/zip-0310) — viewing key 사양
- [Zallet 변경 로그](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 어떤 릴리스에 어떤 RPC 메서드가 추가되었는지
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 지원되는 계정 및 키 유형
- [ECC, Viewing Key 설명](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, 선택적 공개 및 Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key 동영상 프레젠테이션](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
