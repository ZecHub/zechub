<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

Shielded Address를 사용하면 Zcash 블록체인에 최소한의 정보만 공개하면서 거래할 수 있습니다. 그렇다면 특정 상대방에게 보유 자산이나 보낸 내역을 *보여줘야 할* 때는 어떻게 해야 할까요? 모든 Shielded Address에는 지출 권한 없이 읽기 접근만 허용하는 Viewing Key가 있습니다. Viewing Key는 [ZIP 310](https://zips.z.cash/zip-0310)에서 도입되어 Sapling 네트워크 업그레이드 때 프로토콜에 추가되었습니다.

Viewing Key는 선택적 공개(selective disclosure)를 위한 도구입니다. 누가 무엇을 볼지는 당신이 정하고, 그 과정에서 지출 권한은 절대 넘기지 않습니다.

## Viewing Key는 왜 사용하나요?

Electric Coin Company의 관련 글에는 가장 자주 발생하는 상황들이 정리되어 있으며, 지금도 일반적인 경우는 같습니다:

- **입금을 감시하는 거래소.** 거래소는 인터넷에 연결된 감지 노드에 incoming viewing key를 올려 고객이 Shielded Address로 입금하는 것을 감지하는 한편, 지출 키는 네트워크에 닿지 않는 하드웨어에 둡니다.
- **보유 자산을 증명하는 수탁자(custodian).** 수탁자는 감사인에게 각 Shielded Address의 full viewing key를 건넵니다. 감사인은 해당 잔액을 확인하고 주소로 들어오고 나간 과거 활동을 검토할 수 있지만, 그 이상은 아무것도 할 수 없습니다.
- **거래 상대방에 대한 실사.** 거래소가 강화된 실사(enhanced due diligence)의 일환으로 고객의 실드드 거래 내역을 검토해야 할 때, 자금 대신 Viewing Key를 요청할 수 있습니다.

## Viewing Key가 보여주는 것과 보여주지 않는 것

키는 한 종류가 아니며, 그 차이가 얼마나 많은 정보를 넘기는지를 결정합니다.

| 키 | 접두사 | 허용 범위 |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | 계정의 모든 풀에 대해 incoming **및** outgoing 거래 열람 |
| Unified incoming viewing key (UIVK) | `uivk…` | 계정의 모든 풀에 대해 incoming 거래만 열람 |
| Sapling extended full viewing key | `zxviews…` | 해당 키의 주소들에 대한 Sapling incoming 및 outgoing 활동 열람 |

이 키들은 모두 지출할 수 없습니다. 그리고 중요한 의미에서 모두 영구적입니다. 한번 건넨 키는 회수할 수 없고, 상대방이 키를 갖지 않은 계정으로 자금을 옮겨서 효력을 소멸시킬 뿐입니다.

무언가를 공유하기 전에 알아둘 가치가 있는 두 가지 공개 함정이 있습니다.

**Incoming이 좁은 범위라는 뜻은 아닙니다.** Unified incoming viewing key는 당신이 질문받은 특정 주소가 아니라 계정 전체를 범위로 합니다. 하나의 Sapling 주소에 대해 UIVK를 내보내도 그 계정의 모든 풀에 대한 incoming 가시성을 부여하므로, 이름이 가리키는 주소보다 더 많은 것을 공개하게 됩니다. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)도 이 점을 명시하고 있습니다.

**공개된 주소는 이미 미래의 적에게 incoming viewing key를 노출한 것입니다.** [ZIP 326](https://zips.z.cash/zip-0326)은 양자 컴퓨터를 가진 적이 공개된 diversified address에서 incoming viewing key를 복구할 수 있다고 지적합니다. 이는 nullifier key 복구와 달리 실현 가능한 방식입니다. 오늘날 주소를 공개하는 것이 viewing key를 공개하는 것과 같지는 않지만, 충분히 긴 시간이 지나면 둘은 점점 가까워집니다.

## Ironwood 이후의 Viewing Key

NU6.3은 Ironwood 실드드 풀을 도입하고 Orchard 풀을 지출 전용으로 만들었기 때문에, 자금은 시간이 지나며 한 풀에서 다른 풀로 이동합니다. 업그레이드 자체에 대해서는 [Ironwood](/zcash-tech/ironwood)와 [The turnstile](/zcash-tech/the-turnstile)을 참고하세요.

**Ironwood 이전에 발급된 viewing key는 마이그레이션 이후에도 계속 작동합니다.** ZIP 326은 수신자(receiver)와 그에 대응하는 incoming viewing key가 풀이 아니라 Orchard *프로토콜*을 범위로 한다고 규정합니다. 즉, 같은 incoming viewing key가 Orchard 풀과 Ironwood 풀의 노트 암호문(note ciphertext)을 모두 시험 복호화(trial-decrypt)합니다. Zallet도 이 방식으로 구현되어 있으며, Ironwood 노트를 Orchard 형태로 기술하고 Ironwood 노트 암호화 도메인에서 계정의 Orchard viewing key로 시험 복호화합니다.

키를 보유하거나 발급하는 사람에게 중요한 세 가지 결과:

1. **잔액은 풀 사이를 이동하고, 보는 사람도 그 과정을 보게 됩니다.** [ZIP 318](https://zips.z.cash/zip-0318)은 마이그레이션을 무작위 일정으로 브로드캐스트되는 일련의 작고 의도적으로 균일한 Orchard-to-Ironwood 거래로 규정하며, 각 거래는 하나의 Orchard 노트를 지출하고 표준 액면가의 Ironwood 출력 하나를 만들어냅니다. Viewing Key로 감시하는 감사인은 보유 자산이 한 번에 옮겨지는 것이 아니라 몇 주에 걸쳐 단계적으로 한 풀에서 다른 풀로 이동하는 것을 보게 됩니다. 지갑은 자신의 viewing key로 체인 데이터에서 자신의 마이그레이션 진행 상황을 재구성할 수 있습니다.
2. **각 마이그레이션 단계는 이동하는 금액을 드러냅니다.** 이는 turnstile을 지나는 데 내재된 특성이며, 마이그레이션을 감사 가능하게 만드는 요소이기도 합니다. 잔액을 표준 액면가로 나누기 때문에 어떤 단일 거래도 Orchard 풀 잔액 전체를 드러내지 않습니다.
3. **Ironwood 이후에 생성된 계정은 키를 다르게 도출할 수 있습니다.** [ZIP 2005](https://zips.z.cash/zip-2005)는 양자 복구 가능 키를 위한 `use_qsk` 플래그를 추가하며, incoming, outgoing, diversifier 키의 도출 방식을 바꿉니다. 따라서 `use_qsk = true` 키는 진정으로 다른 키입니다. ZIP 326은 이 플래그가 계정 전체에서 동일해야 하며 NU6.3이 Mainnet에서 활성화되기 전에는 `use_qsk = true` 키 생성을 금지한다고 요구합니다. 따라서 Ironwood 이전에 존재했던 계정에서 내보낸 키는 `use_qsk = false` 키이며, 그 계정에 대해 계속 올바른 키로 남습니다. 한 계정에서 내보낸 키가 다른 계정을 설명한다고 가정해서는 안 됩니다.

## Viewing Key 내보내기

### Zallet

[Zallet](https://github.com/zcash/zallet)은 zcashd 내부 지갑을 대체한 풀 노드 지갑입니다. Viewing Key 내보내기와 가져오기는 **v0.1.0-beta.2 (2026년 7월 28일)**에서 도입되었으므로 먼저 버전을 확인하세요. 이전 빌드에는 이 메서드가 없습니다. 메서드 이름 뒤의 모든 인자는 유효한 JSON이어야 하므로, 문자열 값은 큰따옴표를 그대로 유지합니다. 일반적인 명령 형식은 [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide)에서 다룹니다.

지갑이 보유한 것을 나열합니다:

```bash
zallet rpc listaddresses
```

Unified Address를 전달해 계정의 unified full viewing key를 내보냅니다:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

선택적 `ivk` 인자를 사용해 계정의 unified incoming viewing key를 대신 내보냅니다:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling 주소를 전달하면 해당 계정의 Sapling extended full viewing key(`zxviews…`)를 반환하며, 이는 기존 zcashd 동작과 일치합니다. 문서화된 두 가지 제한이 있습니다. Sprout 주소는 거부되며, view-only로 가져온 계정에서는 Sapling extended full viewing key를 내보낼 수 없습니다. 지갑이 이를 재구성할 수 없기 때문입니다. `ivk` 형식은 view-only로 가져온 계정에서도 작동합니다.

### 자체 인터페이스에서 viewing key를 내보내는 지갑들

[Wallets](/using-zcash/wallets) 페이지는 지갑별 viewing key 지원 여부와 Ironwood 준비 상태를 추적합니다. 작성 시점에 viewing key 지원과 **Ironwood: Ready**를 모두 표기한 지갑은 ZODL, Zingo!, Zkool, Cake, Zallet, Zecd, Nozy입니다. 준비 상태는 변하므로 특정 지갑에 의존하기 전에 이 페이지가 아니라 해당 페이지를 확인하세요.

## Viewing Key를 watch-only 계정으로 가져오기

### Zkool

[Zkool](https://github.com/hhanh00/zkool2)은 unified 키와 레거시 키를 모두 받아들이기 때문에 가장 유연한 선택지입니다. README에는 **unified viewing key** 또는 **Sapling extended viewing key**로 만드는 view-only 계정과 함께, zcashd에서 내보낸 레거시 실드드 확장 키도 문서화되어 있습니다. 새 계정을 추가하고 view-only 경로를 선택한 뒤 `uview…` 또는 `zxviews…` 키를 붙여넣으면, 계정이 동기화되어 지출 권한 없이 잔액과 내역을 보고합니다.

Ironwood 프로토콜 지원과 Orchard-to-Ironwood 마이그레이션은 Zkool 6.24.0 (2026년 7월 20일)에 들어왔고, 6.26.1 (2026년 8월 2일)에서 mempool의 Ironwood 거래 감지가 수정되었습니다. 6.26.1 이상을 실행하세요.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

두 번째 인자는 재스캔 정책입니다: `"whenkeyisnew"`(기본값), `"yes"` 또는 `"no"`. 세 번째는 재스캔을 시작할 블록 높이입니다. Zallet은 키를 view-only 계정으로 가져와서 지출 권한 없이 해당 주소들의 incoming 및 outgoing 거래를 추적합니다.

**Zallet은 Sapling extended full viewing key만 가져옵니다.** 내보낼 수는 있어도 `uview…` unified full viewing key는 가져오지 않습니다. unified 계정 전체에 대한 읽기 접근을 넘기려면, Zallet에서 UFVK를 내보내 Zkool처럼 unified 키를 받아들이는 지갑으로 가져오세요.

가져온 키를 txid, 수수료, 메모가 포함된 전체 거래 내역 파일로 만들려면 [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export)를 참고하세요.

## 무엇이 바뀌었고, 무엇을 더는 찾지 말아야 하는가

이 페이지의 이전 버전이나 그 번역을 따라왔다면, 세 가지 경로는 더 이상 작동하지 않습니다.

- **`zcash-cli z_exportviewingkey` 및 `z_importviewingkey`.** zcashd는 2026년 7월 18일 지원 종료 중단점(end-of-support halt)에 도달해 더 이상 실행되지 않습니다. Zallet의 동명 메서드가 대체재입니다. [마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참고하세요.
- **Ywallet 안내.** Wallets 페이지는 Ywallet을 **Ironwood: Not Ready**로 표기하므로, Ironwood 시대의 viewing key에 대해 사람들에게 안내할 지갑이 아닙니다. 같은 개발자의 Zkool이 같은 범위의 키를 받아들이며 Ready로 표기되어 있습니다.
- **zcashblockexplorer.com/vk.** 이 서비스는 유효하지 않은 인증서와 함께 HTTP 503을 반환하며, 대체되지 않고 제거되었습니다. 웹사이트에 viewing key를 붙여넣는 것은 전체 거래 내역을 그 웹사이트 운영자에게 넘기는 것으로, 기존 페이지의 세 가지 선택지 중 항상 가장 취약한 방법이었습니다. 대신 직접 실행하는 지갑으로 키를 가져오세요.

## 자료

Viewing Key는 필요한 경우에만 사용하고, 질문에 답하는 데 필요한 가장 좁은 범위의 키를 선택하세요.

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Orchard와 Ironwood 풀에서 viewing key가 작동하는 방식
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard 및 Ironwood 풀을 정의
- [Zallet 변경 이력](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 어떤 릴리스가 어떤 RPC 메서드를 추가했는지
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 지원되는 계정 및 키 유형
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key 동영상 발표](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
