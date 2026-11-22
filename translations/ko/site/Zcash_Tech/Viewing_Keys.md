<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# viewing key

거래정보 보호 주소(shielded address)를 사용하면 Zcash 블록체인에서 가능한 한 적은 정보를 공개하면서 거래할 수 있습니다. 그렇다면 보유한 자산이나 보낸 자산을 특정 상대에게 보여줘야 할 때는 어떻게 해야 할까요? viewing key는 자산을 사용할 권한은 주지 않으면서 읽기 권한을 부여합니다. viewing key는 Sprout부터 존재했으며, Sapling에서는 받은 노트가 사용되었는지 감지하는 기능 등이 추가되었습니다. [ZIP 310](https://zips.z.cash/zip-0310)은 Sapling viewing key의 보안 속성을 문서화한 정보 제공용 초안이지, viewing key를 도입한 업그레이드가 아닙니다.

viewing key는 선택적 공개(selective disclosure)를 위한 도구입니다. 누가 무엇을 볼 수 있는지 직접 선택할 수 있으며, 이를 위해 자산 사용 권한을 넘길 필요는 없습니다.

## 요약

viewing key는 거래정보 보호 Zcash 주소 또는 계정의 활동을 **읽기 전용**으로 볼 수 있는 권한을 부여합니다. 이를 보유한 사람은 들어오는 거래(전체 viewing key의 경우 나가는 거래도)를 볼 수 있지만, 자산을 사용할 수는 없습니다.

- **기능:** 거래정보 보호 구역의 선택적 공개 도구이며, 구역과 키 유형에 따라 기능이 다릅니다. [ZIP 310](https://zips.z.cash/zip-0310)은 Sapling 풀 viewing key로 확인할 수 있는 정보와 보장되거나, 검증되지 않았거나, 정의되지 않았거나, 공개되지 않는 정보를 설명합니다.
- **부여하는 권한:** 입금 감지(`uivk…` incoming key) 또는 계정의 입출금 내역 전체 확인(`uview…` 통합 full viewing key), 그리고 기존 Sapling `zxviews…` 키의 확인 권한입니다.
- **부여하지 않는 권한:** 자산 사용 권한입니다. viewing key 보유자는 어떤 방법으로도 자산을 이동할 수 없습니다.
- **현재 사용할 수 있는 곳:** [Zallet](https://github.com/zcash/zallet)에서 내보내기/가져오기(v0.1.0-beta.2 이상, `z_exportviewingkey` / `z_importviewingkey`), 그리고 Zkool 같은 지갑의 보기 전용 계정입니다. 현재 지원 현황은 [지갑](/using-zcash/wallets) 페이지를 참조하세요.
- **기본 원칙:** 질문에 답할 수 있는 가장 제한적인 키를 선택하세요. 한 번 전달한 키는 회수할 수 없으며, 자산을 이동해 키보다 오래 버티게 하는 방법밖에 없다는 점을 기억하세요.

---

## viewing key는 왜 사용하나요?

Electric Coin Company가 이 주제에 관해 작성한 글에는 가장 흔히 발생하는 상황들이 정리되어 있으며, 오늘날에도 여전히 자주 볼 수 있습니다.

- **입금을 감시하는 거래소.** 거래소는 인터넷에 연결된 감지 노드에 incoming viewing key를 불러와 거래정보 보호 주소로 들어오는 고객 입금을 확인하고, spending key는 네트워크에 연결되지 않는 하드웨어에 보관합니다.
- **보유 자산을 증명하는 수탁기관.** 수탁기관은 각 거래정보 보호 주소의 full viewing key를 감사인에게 전달합니다. 감사인은 해당 주소의 잔액을 확인하고 과거 입출금 내역을 검토할 수 있지만, 그 밖의 일은 할 수 없습니다.
- **거래 상대방 실사.** 강화된 실사의 일환으로 거래소가 고객의 거래정보 보호 거래 내역을 검토해야 하는 경우, 자산을 넘기는 대신 viewing key를 요청할 수 있습니다.

## viewing key로 확인할 수 있는 정보와 확인할 수 없는 정보

키 유형은 하나가 아니며, 유형에 따라 공개되는 정보의 범위가 달라집니다.

| 키 | 접두사 | 부여하는 권한 |
|---|---|---|
| 통합 full viewing key (UFVK) | `uview…` | 계정의 모든 구역에서 들어오고 **나가는** 거래를 확인합니다 |
| 통합 incoming viewing key (UIVK) | `uivk…` | 계정의 모든 구역에서 들어오는 거래만 확인합니다 |
| Sapling 확장 full viewing key | `zxviews…` | 키에 해당하는 주소의 들어오고 나가는 Sapling 활동을 확인합니다 |

이 키들 중 어느 것도 자산을 사용할 수 없습니다. 중요한 점에서 이 키들은 모두 영구적입니다. 한 번 전달한 키는 회수할 수 없으며, 상대방이 보유하지 않은 키가 있는 계정으로 자산을 이동해 키보다 오래 버티게 하는 방법밖에 없습니다.

무언가를 공유하기 전에 알아둘 만한 공개 관련 함정이 2가지 있습니다.

**들어오는 거래만 확인한다고 해서 범위가 좁은 것은 아닙니다.** 통합 incoming viewing key는 문의받은 주소 하나가 아니라 계정 전체를 대상으로 합니다. 단일 Sapling 주소에 대해 UIVK를 내보내더라도 해당 계정의 모든 구역에서 들어오는 거래를 볼 수 있으므로, 명시된 주소보다 더 많은 정보가 공개됩니다. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)은 이 점을 명확히 설명합니다.

**주소를 공개하면 미래의 공격자가 해당 주소의 incoming viewing key를 알아낼 수 있습니다.** [ZIP 326](https://zips.z.cash/zip-0326)은 양자 컴퓨터를 가진 공격자가 공개된 다각화 주소에서 incoming viewing key를 복구할 수 있다고 설명합니다. 이는 nullifier 키를 복구하는 것과 달리 실현 가능한 일입니다. 오늘날 주소를 공개하는 것은 viewing key를 공개하는 것과 같지는 않지만, 충분히 긴 시간이 지나면 둘 사이의 간격은 좁아집니다.

## Ironwood 이후의 viewing key

NU6.3에서는 Ironwood 거래정보 보호 구역이 도입되었고, Orchard 구역에서는 자산을 사용하기만 할 수 있게 되었습니다. 이에 따라 시간이 지나면서 자산이 한 구역에서 다른 구역으로 이동합니다. 업그레이드 자체에 대해서는 [Ironwood](/zcash-tech/ironwood) 및 [턴스타일](/zcash-tech/the-turnstile)을 참조하세요.

**Ironwood 이전에 발급한 viewing key는 자산이 이동한 뒤에도 계속 작동합니다.** ZIP 326은 수신자와 이에 대응하는 incoming viewing key의 범위가 구역이 아니라 Orchard *프로토콜* 전체에 적용된다고 명시합니다. 같은 incoming viewing key로 Orchard 구역과 Ironwood 구역의 노트 암호문을 모두 시험 복호화할 수 있습니다. Zallet도 이를 구현하며, Ironwood 노트가 Orchard 형태이고 계정의 Orchard viewing key로 Ironwood 노트 암호화 도메인에서 시험 복호화된다고 설명합니다.

키를 보유하거나 발급하는 사람이 알아야 할 결과는 3가지입니다.

1. **잔액은 구역 사이에서 이동하며, 키를 가진 사람은 그 이동을 확인할 수 있습니다.** [ZIP 318](https://zips.z.cash/zip-0318)은 무작위 일정에 따라 브로드캐스트되는, 작고 의도적으로 균일한 Orchard-Ironwood 거래를 연속해서 수행하는 방식으로 이동을 명시합니다. 각 거래는 Orchard 노트 하나를 사용하고 표준 액면가의 Ironwood 출력 하나를 생성합니다. viewing key로 감시하는 감사인은 몇 주에 걸쳐 보유 자산이 한 구역에서 다른 구역으로 단계별로 이동하는 것을 볼 수 있으며, 한 번에 이동하는 것은 아닙니다. 지갑은 viewing key를 사용해 체인 데이터에서 자체 자산 이동 진행 상황을 재구성할 수 있습니다.
2. **각 이동 단계에서 이동하는 금액이 공개됩니다.** 이는 턴스타일을 통과할 때 필연적으로 발생하며, 자산 이동을 감사할 수 있게 하는 요소입니다. 잔액을 표준 액면가로 나누면 단일 거래로 Orchard 구역의 잔액 전체가 드러나지는 않습니다.
3. **Ironwood 이후 만들어진 계정은 다른 방식으로 키를 파생할 수 있습니다.** [ZIP 2005](https://zips.z.cash/zip-2005)에서는 양자 컴퓨터로 복구할 수 있는 키를 나타내는 `use_qsk` 플래그가 추가되며, incoming, outgoing, 다각화 키의 파생 방식이 바뀝니다. 따라서 `use_qsk = true` 키는 실제로 서로 다른 키입니다. ZIP 326은 계정 전체에서 플래그를 동일하게 설정해야 하며, Mainnet에서 NU6.3이 활성화되기 전에는 `use_qsk = true` 키를 생성하지 못하도록 합니다. 따라서 Ironwood 이전부터 존재한 계정에서 내보낸 키는 `use_qsk = false` 키이며, 해당 계정에 계속 올바르게 적용됩니다. 한 계정에서 내보낸 키가 다른 계정의 정보를 나타낸다고 가정하지 마세요.

## viewing key 내보내기

### Zallet

[Zallet](https://github.com/zcash/zallet)은 zcashd에 내장된 지갑을 대체한 풀 노드 지갑입니다. viewing key 내보내기와 가져오기는 **v0.1.0-beta.2 (2026년 7월 28일)**에 추가되었으므로, 먼저 버전을 확인하세요. 이전 빌드에는 이러한 메서드가 없습니다. 메서드 이름 뒤에 오는 모든 인수는 유효한 JSON이어야 하므로 문자열 값은 각각 큰따옴표로 묶어야 합니다. 일반적인 명령어 형식은 [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide)에서 확인할 수 있습니다.

지갑이 보유한 항목을 나열합니다.

```bash
zallet rpc listaddresses
```

통합 주소를 전달해 계정의 통합 full viewing key를 내보냅니다.

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

선택 사항인 `ivk` 인수를 사용하면 계정의 통합 incoming viewing key를 대신 내보낼 수 있습니다.

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling 주소를 전달하면 해당 계정의 Sapling 확장 full viewing key(`zxviews…`)가 반환되어 기존 zcashd 동작과 일치합니다. 문서에 명시된 제한은 2가지입니다. Sprout 주소는 거부되며, 지갑이 키를 재구성할 수 없으므로 보기 전용으로 가져온 계정에서는 Sapling 확장 full viewing key를 내보낼 수 없습니다. 보기 전용으로 가져온 계정에서도 `ivk` 형식은 사용할 수 있습니다.

### 자체 인터페이스에서 viewing key를 내보내는 지갑

[지갑](/using-zcash/wallets) 페이지에서 각 지갑의 viewing key 지원 여부와 Ironwood 준비 상태를 확인할 수 있습니다. 이 글을 작성할 당시 viewing key 지원과 **Ironwood: 준비 완료**를 모두 표시한 지갑은 ZODL, Zingo!, Zkool, Cake, Zallet, zecd, Nozy입니다. 준비 상태는 바뀔 수 있으므로 특정 지갑에 의존하기 전에 이 페이지를 확인하세요.

## viewing key를 보기 전용 계정으로 가져오기

### Zkool

[Zkool](https://github.com/hhanh00/zkool2)은 통합 키와 기존 키를 모두 지원하므로 가장 유연한 선택지입니다. README에는 **통합 viewing key** 또는 **Sapling 확장 viewing key**로 만든 보기 전용 계정과 zcashd에서 내보낸 기존 거래정보 보호 확장 키가 설명되어 있습니다. 새 계정을 추가하고 보기 전용 방식을 선택한 다음 `uview…` 또는 `zxviews…` 키를 붙여넣으면 계정이 동기화되어 잔액과 거래 내역을 표시하며, 자산 사용 권한은 부여하지 않습니다.

Ironwood 프로토콜 지원과 Orchard-Ironwood 간 자산 이동은 Zkool 6.24.0 (2026년 7월 20일)에 추가되었으며, 6.26.1 (2026년 8월 2일)에서는 멤풀의 Ironwood 거래 감지 문제가 수정되었습니다. Mainnet에서 NU7이 활성화되었으므로(블록 3,543,405), [6.35.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.35.0)(2026년 10월 25일) 이상을 사용하세요. 이는 NU7의 Mainnet 활성화 높이([zkool2#1388](https://github.com/hhanh00/zkool2/pull/1388))를 반영해 빌드된 첫 Zkool 릴리스입니다.

6.35.0에서는 **통합 incoming viewing key**도 지원합니다. 키를 입력하는 곳에 `uivk…` 키를 붙여넣으면 Zkool이 incoming 전용 계정을 만듭니다. 이 계정에는 메모를 포함해 원래 계정이 받은 내역이 표시되지만, 보낸 내역은 표시되지 않습니다([zkool2#1348](https://github.com/hhanh00/zkool2/pull/1348)). incoming key로는 자산 사용 내역을 볼 수 없으므로 계정 잔액은 남은 금액이 아니라 받은 금액의 합계이며, 계정에서 자산을 사용할 수도 없습니다. Zkool은 계정의 UIVK도 내보낼 수 있습니다([zkool2#1347](https://github.com/hhanh00/zkool2/pull/1347)).

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

두 번째 인수는 다시 검색할 때 적용할 정책입니다. `"whenkeyisnew"`(기본값), `"yes"` 또는 `"no"`을 사용할 수 있습니다. 세 번째 인수는 다시 검색할 블록 높이입니다. Zallet은 키를 보기 전용 계정으로 가져오고, 자산 사용 권한 없이 해당 주소의 들어오고 나가는 거래를 추적합니다.

**Zallet은 Sapling 확장 full viewing key만 가져올 수 있습니다.** `uview…` 통합 full viewing key는 내보낼 수 있어도 가져올 수 없습니다. 통합 계정 전체에 대한 읽기 권한을 전달하려면 Zallet에서 UFVK를 내보내고 Zkool처럼 통합 키를 지원하는 지갑으로 가져오세요.

가져온 키를 거래 ID, 수수료, 메모가 포함된 전체 거래 내역 파일로 변환하는 방법은 [Viewing Key](/guides/viewing-key-transaction-export)에서 거래 내역 내보내기를 참조하세요.

## 변경 사항 및 더 이상 찾지 않아도 되는 기능

이 페이지의 이전 버전이나 번역본을 참고하셨다면, 더 이상 작동하지 않는 방식이 3가지 있습니다.

- **`zcash-cli z_exportviewingkey` 및 `z_importviewingkey`.** zcashd은 2026년 7월 18일 지원 종료와 함께 중단되어 더 이상 실행되지 않습니다. Zallet의 이름이 같은 메서드가 이를 대체합니다. [이전 안내](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.
- **Ywallet 안내.** 지갑 페이지에서는 Ywallet의 상태를 **Ironwood: 준비되지 않음**으로 표시하므로, Ironwood 시대의 viewing key를 사용하도록 안내할 지갑이 아닙니다. 같은 개발자가 만든 Zkool은 동일한 범위의 키를 지원하며 준비 완료로 표시되어 있습니다.
- **zcashblockexplorer.com/vk.** 이 서비스는 잘못된 인증서와 함께 HTTP 503 오류를 반환하며, 대체 서비스 없이 종료되었습니다. viewing key를 웹사이트에 붙여넣으면 해당 사이트 운영자에게 전체 거래 내역을 넘기는 셈입니다. 이는 이전 페이지에 있던 3가지 선택지 중에서도 언제나 가장 취약한 방식이었습니다. 대신 직접 실행하는 지갑으로 키를 가져오세요.

## 시각적 비유

### 감사인의 관찰 창

거래정보 보호 계정을 은행의 안전 금고실이라고 생각해 보세요.

- **spending key**는 금고실 열쇠입니다. 이를 가진 사람은 상자를 열고 내용물을 꺼낼 수 있습니다.
- **viewing key**는 감사인이 금고실 안을 들여다보는 관찰 창입니다. 감사인은 상자가 들어오고 나가는 모습을 지켜보고, 라벨을 읽고, 장부를 작성할 수 있지만 창에는 손잡이가 없습니다. 창을 들여다보는 사람은 금고실 안의 어떤 것도 옮길 수 없습니다.

### 관찰 창으로 볼 수 없는 것

관찰 창은 바깥세상이 아니라 금고실 안을 향합니다. 감시하는 계정의 거래정보 보호 활동은 보여주지만, 감시자를 블록체인 전체의 관찰자로 만들어 주지는 않습니다. 감시자가 해당 계정의 활동을 다른 사람의 비거래정보 보호 거래 내역과 연관 지을 수도 없습니다. 또한 관찰 창은 계정 수준에 설치되므로, 누군가에게 보관함 하나(주소 하나)의 작은 들여다보기 구멍을 내줘도 금고실 전체의 입금 내역을 볼 수 있습니다. 바로 이런 이유로 가장 제한적인 키를 사용해야 합니다.

### 관찰 창을 회수할 수 없는 이유

viewing key는 권한 목록이 아니라 정보의 한 조각입니다. 한 번 복사되면 감시 대상 계정에서 자산이 빠져나갈 때까지 계속 존재합니다. 현실적인 해결책은 키를 교체하는 것입니다. 상대방이 키를 받은 적 없는 새 계정으로 잔액을 옮기면, 이전 관찰 창은 빈 금고실을 향하게 됩니다.

## 심층 분석

### 시험 복호화: viewing은 어떻게 작동하나요?

모든 거래정보 보호 거래는 의도된 수신자를 위해 노트 평문을 암호화합니다. viewing key를 가진 지갑은 **시험 복호화(trial decryption)**를 수행합니다. 체인에서 찾은 각 거래에 대해 키를 사용해 노트 암호문을 복호화하려고 시도합니다. 복호화에 성공하면 노트의 금액, 수신자의 다각화 정보, 메모를 확인할 수 있습니다. 성공 여부와 관계없이 비용은 거의 같습니다. 지갑이 해당 노트가 자신의 것인지 알기 전에 비용이 많이 드는 키 합의를 수행해야 하기 때문입니다. 따라서 지갑이 감시하는 키가 늘어날수록 검색 비용도 커집니다([거래정보 보호 결제 감지](Detecting_Shielded_Payments.md) 참조). 이 때문에 같은 incoming viewing key가 Orchard 구역과 Ironwood 구역 모두에서 계속 작동합니다. [ZIP 326](https://zips.z.cash/zip-0326)은 수신자의 범위를 Orchard *프로토콜* 전체로 정하므로, Ironwood 노트 암호문은 Orchard 형태이며 계정의 Orchard viewing key로 Ironwood 노트 암호화 도메인에서 시험 복호화됩니다.

### full과 incoming의 차이: 키 파생 방식이 결정하는 것

**full** viewing key는 outgoing viewing 기능을 파생할 수 있습니다. 이 기능으로 감사인은 거래를 복호화한 뒤 송신자 측 정보를 재구성할 수 있습니다. **incoming** viewing key는 의도적으로 그 기능에 미치지 못합니다. incoming 노트를 감지하고 복호화할 수 있지만, outgoing 연결 정보는 재구성할 수 없습니다. 두 기능을 파생하는 방식은 단방향입니다. incoming key는 full key에서 파생되며 그 반대는 불가능합니다. 이 때문에 “incoming만”이라는 말은 단순한 약속이 아니라 실제로 권한이 축소된 상태를 뜻합니다. [ZIP 2005](https://zips.z.cash/zip-2005)의 `use_qsk` 플래그는 키 파생 방식 자체를 바꾸므로, 양자 컴퓨터로 복구 가능한 키는 기존 키의 변형이 아니라 완전히 다른 키 계열입니다.

### 감시자에게 보이는 자산 이동

[ZIP 318](https://zips.z.cash/zip-0318)의 자산 이동은 작고 균일한 Orchard-Ironwood 거래를 무작위 순서로 수행하므로, 키를 보유한 감시자에게는 계단처럼 보입니다. 한 번에 크게 이동하는 대신 표준 액면가의 작은 단계가 여러 차례 나타납니다. 한 단계만으로 이동 중인 잔액 전체를 알 수는 없지만, 그 *패턴*은 알아볼 수 있습니다. 이는 감사 가능한 턴스타일이 의도한 절충점입니다.

## 실제 적용 시 고려 사항

- **거래소 및 결제 지원 서비스의 경우:** 고객 입금을 자동으로 대조하려면 계정의 incoming viewing key(또는 전체 정보를 확인할 수 있는 UFVK)를 감지 노드에 불러오세요. 투명 주소와 똑같이 처리할 수 있지만 고객의 spending key는 콜드 스토리지에서 나가지 않습니다.
- **감사 및 보유 자산 증명의 경우:** full viewing key를 사용하면 “저희를 믿으세요”가 “직접 확인하세요”로 바뀝니다. 감시 대상 계정의 잔액과 전체 거래 내역을 확인할 수 있지만, 자산을 건드릴 권한은 전혀 없습니다. 단일 결제에 대한 일회성 증명에는 [결제 정보 공개](/zcash-tech/payment-disclosures)를 함께 사용하세요.
- **실사의 경우:** 지갑 전체가 아니라 거래 관계에 필요한 계정의 키를 상대방에게 전달하세요. 관계가 끝나면 계정을 교체하세요.
- **도구 선택의 경우:** Zallet는 UFVK를 내보내고 Sapling 확장 full viewing key를 가져옵니다. Zkool는 통합 키와 기존 키를 보기 전용 계정으로 지원합니다. 지갑을 표준으로 정하기 전에 [지갑](/using-zcash/wallets) 페이지에서 최신 Ironwood 준비 상태를 확인하세요.
- **공개의 대가는 영구적입니다:** 키를 보유한 사람이 늘어날 때마다 영구적인 프라이버시 신용 한도가 생기며, 이를 닫을 수 없습니다. 관계별로 키를 발급하고, 계정 하나로 범위를 제한하며, 누가 어떤 키를 보유하는지 기록하세요.

## 자주 하는 실수

| 흔한 오해 | 실제로는 이렇습니다 |
| --- | --- |
| “viewing key가 유출되면 자산을 사용할 수 있다.” | 그렇지 않습니다. viewing key에는 자산 사용 권한이 없습니다. 유출로 발생할 수 있는 최악의 결과는 거래 내역이 공개되는 것입니다. |
| “나중에 viewing key를 취소할 수 있다.” | 취소할 수 없습니다. 한 번 전달한 키는 상대방이 키를 보유하지 않은 계정으로 자산을 옮길 때까지 계속 작동합니다. |
| “한 주소에 대한 UIVK를 내보내면 그 주소만 볼 수 있다.” | viewing key의 범위는 계정 전체입니다. UIVK는 해당 계정의 모든 구역에서 들어오는 활동을 보여줍니다. |
| “`zcash-cli z_exportviewingkey`은 아직 작동한다.” | 아닙니다. zcashd은 2026년 7월 18일 지원 종료와 함께 중단되었습니다. 대신 Zallet의 `z_exportviewingkey` / `z_importviewingkey`를 사용하세요. |
| “웹 도구에 viewing key를 붙여넣어도 읽기 전용이니 안전하다.” | 읽기 전용이어도 해당 계정의 전체 거래 내역을 사이트 운영자에게 넘기는 것입니다. 직접 실행하는 지갑으로 키를 가져오세요. |
| “Zallet은 Zallet이 내보낼 수 있는 viewing key를 모두 가져올 수 있다.” | 아닙니다. Zallet은 Sapling 확장 full viewing key만 가져올 수 있습니다. 통합 `uview…` 키는 Zkool처럼 통합 키를 지원하는 지갑으로 가져와야 합니다. |

## 관련 페이지

- [결제 정보 공개](/zcash-tech/payment-disclosures) — 계정에 대한 지속적인 접근 권한을 주지 않고 단일 결제의 선택된 세부 정보를 증명합니다
- [통합 주소](/zcash-tech/unified-addresses) — viewing key 수신자를 포함하는 주소 계층입니다
- [Ironwood](/zcash-tech/ironwood) — Orchard이 자산을 이동하는 NU6.3 거래정보 보호 구역입니다
- [턴스타일](/zcash-tech/the-turnstile) — 감시자가 확인할 수 있는 Orchard-Ironwood 자산 이동 메커니즘입니다
- [지갑](/using-zcash/wallets) — 지갑 전체 목록, viewing key 지원 및 Ironwood 준비 상태입니다
- [Viewing Key](/guides/viewing-key-transaction-export)에서 거래 내역 내보내기 — 가져온 키를 전체 txid/수수료/메모 내역 파일로 변환합니다

## 참고 자료

필요한 경우에만 viewing key를 사용하고, 질문에 답할 수 있는 가장 제한적인 키를 선택하세요.

- [결제 정보 공개](/zcash-tech/payment-disclosures) - 계정에 대한 지속적인 접근 권한을 주지 않고 단일 결제의 선택된 세부 정보를 증명합니다
- [ZIP 326: NU6.3 지갑에 미치는 영향](https://zips.z.cash/zip-0326) — Orchard 구역과 Ironwood 구역에서 viewing key가 작동하는 방식입니다
- [ZIP 229: 버전 6 거래 형식](https://zips.z.cash/zip-0229) — Orchard 구역과 Ironwood 구역을 정의합니다
- [ZIP 310](https://zips.z.cash/zip-0310) — viewing key 명세입니다
- [Zallet 변경 기록](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 각 RPC 메서드가 추가된 릴리스입니다
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 지원되는 계정 및 키 유형입니다
- [ECC, viewing key 설명](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, 선택적 공개와 viewing key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key 동영상 발표](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
