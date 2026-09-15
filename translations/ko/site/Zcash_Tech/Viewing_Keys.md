<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

차폐 주소를 사용하면 Zcash 블록체인에서 가능한 한 적은 정보만 공개하며 거래할 수 있습니다. 그렇다면 *실제로* 특정 상대방에게 보유 자산이나 전송 내역을 보여줘야 할 때는 어떻게 될까요? 모든 차폐 주소에는 지출 권한 없이 읽기 권한을 부여하는 viewing key가 있습니다. Viewing key는 [ZIP 310](https://zips.z.cash/zip-0310)에서 도입되었으며 Sapling 네트워크 업그레이드에서 프로토콜에 추가되었습니다.

Viewing key는 선택적 공개를 위한 도구입니다. 누가 무엇을 볼지 직접 선택하며, 이를 위해 지출 권한을 넘겨줄 필요가 없습니다.

## viewing key를 사용하는 이유는 무엇인가요?

Electric Coin Company의 관련 글은 가장 자주 발생하는 상황을 설명하며, 오늘날에도 여전히 일반적인 사례입니다.

- **입금을 감시하는 거래소.** 거래소는 인터넷에 연결된 탐지 노드에 incoming viewing key를 불러와 고객의 차폐 주소 입금을 감지할 수 있도록 하면서, 지출 키는 네트워크에 절대 연결되지 않는 하드웨어에 보관합니다.
- **보유 자산을 증명하는 수탁자.** 수탁자는 각 차폐 주소의 full viewing key를 감사인에게 제공합니다. 감사인은 해당 잔액을 확인하고 그 주소들로 오간 과거 활동을 검토할 수 있지만, 그 외의 어떤 작업도 할 수 없습니다.
- **거래 상대방에 대한 실사.** 거래소가 강화된 실사의 일부로 고객의 차폐 거래 이력을 검토해야 하는 경우, 자금 대신 viewing key를 요청할 수 있습니다.

## viewing key가 공개하는 정보와 공개하지 않는 정보

키에는 여러 종류가 있으며, 그 차이에 따라 공개 범위가 결정됩니다.

| 키 | 접두사 | 권한 |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | 계정의 모든 풀에서 수신 **및** 발신 거래를 확인 |
| Unified incoming viewing key (UIVK) | `uivk…` | 계정의 모든 풀에서 수신 거래만 확인 |
| Sapling extended full viewing key | `zxviews…` | 해당 키의 주소에 대한 수신 및 발신 Sapling 활동을 확인 |

이들 중 어느 것도 지출할 수 없습니다. 모두 중요한 의미에서 영구적입니다. 한 번 제공한 키는 회수할 수 없으며, 상대방이 키를 보유하지 않은 계정으로 자금을 옮겨야만 그 키의 범위를 벗어날 수 있습니다.

무언가를 공유하기 전에 알아둘 만한 공개 관련 함정이 두 가지 있습니다.

**Incoming이 좁은 범위를 뜻하지는 않습니다.** Unified incoming viewing key는 요청받은 하나의 주소가 아니라 계정 전체에 적용됩니다. 단일 Sapling 주소에 대한 UIVK를 내보내더라도 해당 계정의 모든 풀에 걸친 수신 가시성이 부여되므로, 이름에 포함된 주소보다 더 많은 정보를 공개합니다. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)에서도 이를 명시적으로 설명합니다.

**공개된 주소는 이미 미래의 공격자에게 incoming viewing key를 노출합니다.** [ZIP 326](https://zips.z.cash/zip-0326)는 양자 컴퓨터를 보유한 공격자가 공개된 diversified 주소에서 incoming viewing key를 복구할 수 있다고 언급합니다. 이는 nullifier key를 복구하는 것과 달리 실현 가능한 방식입니다. 오늘날 주소를 공개하는 것이 viewing key를 공개하는 것과 같은 의미는 아니지만, 충분히 긴 시간 범위에서는 둘의 거리가 더 가까워집니다.

## Ironwood 이후의 viewing key

NU6.3는 Ironwood 차폐 풀을 도입하고 Orchard 풀을 지출 전용으로 만들었으므로, 시간이 지나면서 자금은 한 풀에서 다른 풀로 이전됩니다. 업그레이드 자체에 대해서는 [Ironwood](/zcash-tech/ironwood) 및 [The turnstile](/zcash-tech/the-turnstile)을 참조하세요.

**Ironwood 이전에 발급된 viewing key는 이전 이후에도 계속 작동합니다.** ZIP 326은 receiver와 이에 대응하는 incoming viewing key가 풀 대신 Orchard *프로토콜* 범위에 적용된다고 명시합니다. 즉, 동일한 incoming viewing key가 Orchard 풀과 Ironwood 풀의 note 암호문을 모두 trial-decrypt합니다. Zallet은 Ironwood note를 Orchard 형태로 설명하고 Ironwood note-encryption 도메인에서 계정의 Orchard viewing key로 trial-decrypt하는 방식으로 이를 구현합니다.

키를 보유하거나 발급하는 사람에게는 세 가지 결과가 있습니다.

1. **잔액은 풀 간에 이동하며, 열람자는 그 과정을 확인합니다.** [ZIP 318](https://zips.z.cash/zip-0318)은 무작위 일정에 따라 브로드캐스트되는 작고 의도적으로 균일한 Orchard-to-Ironwood 거래들의 연속으로 이전을 정의합니다. 각 거래는 하나의 Orchard note를 지출하고 표준 액면의 Ironwood 출력 하나를 생성합니다. Viewing key로 감시하는 감사인은 보유 자산이 한 번에 이동하는 것이 아니라 수 주에 걸쳐 단계적으로 한 풀에서 다른 풀로 옮겨가는 모습을 봅니다. 지갑은 viewing key를 사용하여 체인 데이터로부터 자체 이전 진행 상황을 재구성할 수 있습니다.
2. **각 이전 단계는 이동하는 가치를 공개합니다.** 이는 turnstile을 통과하는 데 본질적으로 수반되는 특성이며, 이전을 감사할 수 있게 하는 요소입니다. 잔액을 표준 액면으로 나누면 단일 거래가 전체 Orchard 풀 잔액을 공개하지 않습니다.
3. **Ironwood 이후에 생성된 계정은 키를 다르게 파생할 수 있습니다.** [ZIP 2005](https://zips.z.cash/zip-2005)는 양자 복구 가능 키를 위한 `use_qsk` 플래그를 추가하며 incoming, outgoing 및 diversifier 키의 파생 방식을 변경합니다. 따라서 `use_qsk = true` 키는 실질적으로 다른 키입니다. ZIP 326은 해당 플래그가 계정 전체에서 통일되어야 한다고 요구하며, Mainnet에서 NU6.3가 활성화되기 전에는 `use_qsk = true` 키 생성을 금지합니다. 따라서 Ironwood 이전에 존재했던 계정에서 내보낸 키는 `use_qsk = false` 키이며, 그 계정에는 계속 올바르게 적용됩니다. 한 계정에서 내보낸 키가 다른 계정을 설명한다고 가정하지 마세요.

## viewing key 내보내기

### Zallet

[Zallet](https://github.com/zcash/zallet)은 zcashd 내부의 지갑을 대체한 full-node 지갑입니다. Viewing key 내보내기와 가져오기는 **v0.1.0-beta.2 (2026년 7월 28일)**에 도입되었으므로, 먼저 버전을 확인하세요. 이전 빌드에는 이 메서드가 없습니다. 메서드 이름 뒤의 모든 인수는 유효한 JSON이어야 하므로 문자열 값은 자체 큰따옴표를 유지합니다. 일반적인 명령 스타일은 [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide)에서 다룹니다.

지갑이 보유한 항목을 나열합니다.

```bash
zallet rpc listaddresses
```

Unified 주소를 전달하여 계정의 unified full viewing key를 내보냅니다.

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

선택적 `ivk` 인수를 사용하여 대신 계정의 unified incoming viewing key를 내보냅니다.

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling 주소를 전달하면 해당 계정의 Sapling extended full viewing key (`zxviews…`)가 반환되며, 이전 zcashd 동작과 일치합니다. 문서화된 제한 사항은 두 가지입니다. Sprout 주소는 거부되며, 지갑이 이를 재구성할 수 없으므로 그 자체가 view-only로 가져와진 계정에서는 Sapling extended full viewing key를 내보낼 수 없습니다. `ivk` 형식은 가져온 view-only 계정에서 작동합니다.

### 자체 인터페이스에서 viewing key를 내보내는 지갑

[Wallets](/using-zcash/wallets) 페이지는 각 지갑의 viewing key 지원 및 Ironwood 준비 상태를 추적합니다. 작성 시점에 viewing key 지원과 **Ironwood: Ready**를 모두 표시하는 지갑에는 ZODL, Zingo!, Zkool, Cake, Zallet, Zecd 및 Nozy가 포함됩니다. 준비 상태는 변경되므로 특정 지갑에 의존하기 전에 이 페이지를 확인하세요.

## viewing key를 watch-only 계정으로 가져오기

### Zkool

[Zkool](https://github.com/hhanh00/zkool2)은 기존 키뿐 아니라 unified key도 허용하므로 여기에서 가장 유연한 옵션입니다. README에는 zcashd에서 내보낸 기존 차폐 extended key와 함께 **unified viewing key** 또는 **Sapling extended viewing key**에서 생성한 view-only 계정이 문서화되어 있습니다. 새 계정을 추가하고 view-only 경로를 선택한 뒤 `uview…` 또는 `zxviews…` 키를 붙여 넣으세요. 그러면 해당 계정은 동기화되어 지출 권한 없이 잔액과 이력을 보고합니다.

Ironwood 프로토콜 지원과 Orchard-to-Ironwood 이전은 Zkool 6.24.0(2026년 7월 20일)에 도입되었으며, 6.26.1(2026년 8월 2일)에서 mempool의 Ironwood 거래 감지가 수정되었습니다. 6.26.1 이상을 사용하세요.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

두 번째 인수는 재검사 정책으로 `"whenkeyisnew"`(기본값), `"yes"` 또는 `"no"`입니다. 세 번째는 재검사를 시작할 블록 높이입니다. Zallet은 이 키를 view-only 계정으로 가져오며 지출 권한 없이 해당 주소의 수신 및 발신 거래를 추적합니다.

**Zallet은 Sapling extended full viewing key만 가져옵니다.** 내보낼 수는 있지만 `uview…` unified full viewing key는 가져오지 않습니다. 전체 unified 계정에 대한 읽기 권한을 제공하려면 Zallet에서 UFVK를 내보내고 Zkool처럼 unified key를 허용하는 지갑으로 가져오세요.

txid, 수수료 및 memo가 포함된 전체 거래 이력 파일로 가져온 키를 변환하려면 [Viewing Key에서 거래 이력 내보내기](/guides/viewing-key-transaction-export)를 참조하세요.

## 변경된 사항과 더 이상 찾지 말아야 할 항목

이 페이지의 이전 버전이나 그 번역본을 따라왔다면, 세 가지 경로는 더 이상 작동하지 않습니다.

- **`zcash-cli z_exportviewingkey` 및 `z_importviewingkey`.** zcashd는 2026년 7월 18일 지원 종료에 도달하여 더 이상 실행되지 않습니다. Zallet의 동일한 이름의 메서드가 이를 대체합니다. [마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.
- **Ywallet 안내.** Wallets 페이지는 Ywallet을 **Ironwood: Not Ready**로 표시하므로, Ironwood 시대의 viewing key를 위해 사람들에게 권할 지갑이 아닙니다. 같은 개발자가 만든 Zkool은 동일한 범위의 키를 허용하며 Ready로 표시됩니다.
- **zcashblockexplorer.com/vk.** 이 서비스는 유효하지 않은 인증서와 함께 HTTP 503을 반환하며, 대체되지 않고 중단되었습니다. 웹사이트에 viewing key를 붙여 넣으면 전체 거래 이력을 그 웹사이트 운영자에게 넘겨주게 되며, 이는 이전 페이지의 세 가지 옵션 중 항상 가장 취약한 방법이었습니다. 대신 직접 운영하는 지갑으로 키를 가져오세요.

## 리소스

Viewing key는 필요할 때만 사용하고, 질문에 답할 수 있는 가장 좁은 범위의 키를 우선하세요.

- [ZIP 326: 지갑에 대한 NU6.3의 결과](https://zips.z.cash/zip-0326) — viewing key가 Orchard 및 Ironwood 풀 전반에서 동작하는 방식
- [ZIP 229: 버전 6 거래 형식](https://zips.z.cash/zip-0229) — Orchard 및 Ironwood 풀 정의
- [Zallet 변경 로그](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 어떤 릴리스가 어떤 RPC 메서드를 추가했는지
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 지원되는 계정 및 키 유형
- [ECC, Viewing Key 설명](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, 선택적 공개 및 Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key 비디오 프레젠테이션](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
