<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

실드된 주소를 사용하면 Zcash 블록체인에서 가능한 한 적은 정보만 드러내면서 거래할 수 있습니다. 그렇다면 *정말로* 특정 상대방에게 내가 무엇을 보유하고 있는지, 또는 무엇을 보냈는지 보여줘야 할 때는 어떻게 될까요? 모든 실드된 주소에는 지출 권한을 주지 않으면서 읽기 접근 권한만 부여하는 viewing key가 있습니다. Viewing key는 [ZIP 310](https://zips.z.cash/zip-0310)에서 도입되었고 Sapling 네트워크 업그레이드에서 프로토콜에 추가되었습니다.

viewing key는 선택적 공개를 위한 도구입니다. 무엇을 누구에게 보여줄지 당신이 직접 정하며, 이를 위해 지출 권한을 넘길 필요는 결코 없습니다.

## 왜 viewing key를 사용할까요?

이 주제에 대한 Electric Coin Company의 설명은 가장 자주 발생하는 상황들을 정리하고 있으며, 오늘날에도 여전히 대표적인 사례들입니다:

- **입금을 감시하는 거래소.** 거래소는 인터넷에 노출된 감지 노드에 incoming viewing key를 로드해 고객의 실드된 주소 입금을 감지할 수 있게 하고, spending key는 네트워크에 전혀 연결되지 않는 하드웨어에 그대로 보관합니다.
- **보유 자산을 증명하는 수탁업체.** 수탁업체는 각 실드된 주소에 대해 감사인에게 full viewing key를 제공합니다. 감사인은 해당 잔액을 확인하고 그 주소들로 오간 과거 활동을 검토할 수 있지만, 그 외에는 아무것도 할 수 없습니다.
- **거래 상대방에 대한 실사.** 거래소가 강화된 실사 절차의 일환으로 고객의 실드된 거래 내역을 검토해야 할 때, 자금을 요구하는 대신 viewing key를 요청할 수 있습니다.

## viewing key가 드러내는 것과 드러내지 않는 것

키는 한 종류만 있는 것이 아니며, 그 차이에 따라 얼마나 많은 정보를 넘기게 되는지가 결정됩니다.

| 키 | 접두사 | 권한 |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | 계정의 모든 풀에 대해 수신 **및** 발신 거래를 확인 |
| Unified incoming viewing key (UIVK) | `uivk…` | 계정의 모든 풀에 대해 수신 거래만 확인 |
| Sapling extended full viewing key | `zxviews…` | 해당 키의 주소들에 대한 Sapling 수신 및 발신 활동을 확인 |

이들 중 어느 것도 지출할 수는 없습니다. 그리고 중요한 의미에서 모두 영구적입니다. 한 번 건넨 키는 회수할 수 없고, 상대방이 그 키를 갖고 있지 않은 계정으로 자금을 옮겨 사실상 무력화하는 것만 가능합니다.

무언가를 공유하기 전에 알아야 할 공개상의 함정이 두 가지 있습니다.

**Incoming이라고 해서 범위가 좁다는 뜻은 아닙니다.** unified incoming viewing key는 질문받은 하나의 주소에만 한정되는 것이 아니라 계정 전체에 적용됩니다. 단일 Sapling 주소에 대해 UIVK를 내보내더라도 그 계정의 모든 풀에 대한 수신 내역을 볼 수 있게 되므로, 이름이 가리키는 주소보다 더 많은 정보를 공개하게 됩니다. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)에서 이 점을 명시적으로 설명합니다.

**이미 공개된 주소는 미래의 공격자에게 incoming viewing key를 노출합니다.** [ZIP 326](https://zips.z.cash/zip-0326)는 양자 컴퓨터를 가진 공격자가 공개된 diversified address로부터 incoming viewing key를 복구할 수 있으며, 이는 nullifier key를 복구하는 것보다 현실적이라고 설명합니다. 오늘날 주소를 공개하는 것이 곧 viewing key를 공개하는 것과 같지는 않지만, 충분히 긴 시간축에서는 둘 사이의 거리가 훨씬 가까워집니다.

## Ironwood 이후의 viewing key

NU6.3는 Ironwood 실드된 풀을 도입했고 Orchard 풀은 지출 전용이 되었으므로, 시간이 지나면서 자금은 한 풀에서 다른 풀로 이동합니다. 업그레이드 자체에 대해서는 [Ironwood](/zcash-tech/ironwood) 및 [The turnstile](/zcash-tech/the-turnstile)을 참고하세요.

**Ironwood 이전에 발급된 viewing key는 마이그레이션 이후에도 계속 작동합니다.** ZIP 326은 receiver와 그에 대응하는 incoming viewing key가 특정 풀이 아니라 Orchard *프로토콜* 범위에 속한다고 규정합니다. 즉, 동일한 incoming viewing key가 Orchard 풀과 Ironwood 풀의 note ciphertext를 모두 trial-decrypt합니다. Zallet도 이를 그렇게 구현하며, Ironwood note를 Orchard 형태로 간주하고 Ironwood note-encryption domain 아래에서 계정의 Orchard viewing key들로 trial-decrypt한다고 설명합니다.

키를 보유하거나 발급하는 누구에게나 해당되는 세 가지 결과가 있습니다:

1. **잔액은 풀 사이를 이동하고, 보는 사람은 그 과정을 확인할 수 있습니다.** [ZIP 318](https://zips.z.cash/zip-0318)은 마이그레이션을 무작위 일정으로 브로드캐스트되는 일련의 작고 의도적으로 균일한 Orchard-to-Ironwood 거래로 규정하며, 각 거래는 Orchard note 하나를 소비하고 표준 액면의 Ironwood 출력 하나를 생성합니다. viewing key로 감시하는 감사인은 보유 자산이 한 번에 이동하는 것이 아니라 몇 주에 걸쳐 단계적으로 한 풀에서 다른 풀로 옮겨가는 모습을 보게 됩니다. 지갑은 자신의 viewing key를 사용해 체인 데이터로부터 자체 마이그레이션 진행 상황을 재구성할 수 있습니다.
2. **각 마이그레이션 단계는 이동하는 가치를 드러냅니다.** 이것은 turnstile을 통과하는 구조상 본질적인 특성이며, 마이그레이션을 감사 가능하게 만드는 요소이기도 합니다. 잔액을 표준 액면으로 분할하면 단일 거래가 Orchard 풀 전체 잔액을 드러내지는 않게 됩니다.
3. **Ironwood 이후에 생성된 계정은 키를 다르게 파생할 수 있습니다.** [ZIP 2005](https://zips.z.cash/zip-2005)는 양자 복구 가능 키를 위한 `use_qsk` 플래그를 추가하고 incoming, outgoing, diversifier key 파생 방식을 변경하므로 `use_qsk = true` 키는 실제로 별개의 키가 됩니다. ZIP 326은 이 플래그가 계정 전체에서 일관되어야 한다고 요구하며 Mainnet에서 NU6.3가 활성화되기 전에는 `use_qsk = true` 키 생성을 금지합니다. 따라서 Ironwood 이전부터 존재하던 계정에서 내보낸 키는 `use_qsk = false` 키이며, 그 계정에 대해서는 계속 올바릅니다. 한 계정에서 내보낸 키가 다른 계정까지 설명한다고 가정해서는 안 됩니다.

## viewing key 내보내기

### Zallet

[Zallet](https://github.com/zcash/zallet)은 zcashd 내부 지갑을 대체한 풀 노드 지갑입니다. viewing-key 내보내기와 가져오기는 **v0.1.0-beta.2 (2026년 7월 28일)**에 추가되었으므로 먼저 버전을 확인하세요. 그 이전 빌드에는 이 메서드들이 없습니다. 메서드 이름 뒤의 모든 인수는 유효한 JSON이어야 하므로 문자열 값은 자체적인 큰따옴표를 유지해야 합니다. 일반적인 명령 형식은 [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide)에서 다룹니다.

지갑이 보유한 항목 목록 보기:

```bash
zallet rpc listaddresses
```

unified address를 전달해 계정의 unified full viewing key를 내보내기:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

선택적 `ivk` 인수를 사용해 계정의 unified incoming viewing key를 대신 내보내기:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling 주소를 전달하면 해당 계정의 Sapling extended full viewing key (`zxviews…`)가 반환되며, 이는 예전 zcashd 동작과 일치합니다. 문서화된 제한은 두 가지입니다. Sprout 주소는 거부되며, view-only로 가져온 계정에서는 Sapling extended full viewing key를 내보낼 수 없습니다. 지갑이 이를 재구성할 수 없기 때문입니다. 다만 `ivk` 형식은 가져온 view-only 계정에서도 작동합니다.

### 자체 인터페이스에서 viewing key를 내보내는 지갑

[Wallets](/using-zcash/wallets) 페이지는 각 지갑의 viewing-key 지원 여부와 Ironwood 준비 상태를 추적합니다. 이 문서를 작성하는 시점 기준으로 viewing-key 지원과 **Ironwood: Ready**를 모두 표시하는 지갑에는 ZODL, Zingo!, Zkool, Cake, Zallet, Zecd, Nozy가 포함됩니다. 준비 상태는 바뀌므로 특정 지갑 하나만 믿기 전에 이 문서가 아니라 해당 페이지를 확인하세요.

## viewing key를 watch-only 계정으로 가져오기

### Zkool

[Zkool](https://github.com/hhanh00/zkool2)은 unified key와 legacy key를 모두 받아들이기 때문에 여기서 가장 유연한 선택지입니다. README에는 **unified viewing key** 또는 **Sapling extended viewing key**로 생성하는 view-only 계정이, zcashd에서 내보낸 legacy shielded extended key와 함께 문서화되어 있습니다. 새 계정을 추가하고 view-only 경로를 선택한 뒤 `uview…` 또는 `zxviews…` 키를 붙여 넣으면, 해당 계정은 spend authority 없이 동기화되어 잔액과 내역을 보고합니다.

Ironwood 프로토콜 지원과 Orchard-to-Ironwood 마이그레이션은 Zkool 6.24.0 (2026년 7월 20일)에 도입되었고, 6.26.1 (2026년 8월 2일)에서 mempool 내 Ironwood 거래 감지 문제가 수정되었습니다. 6.26.1 이상을 사용하세요.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

두 번째 인수는 rescan 정책으로 `"whenkeyisnew"` (기본값), `"yes"`, `"no"` 중 하나입니다. 세 번째는 다시 스캔을 시작할 블록 높이입니다. Zallet은 이 키를 view-only 계정으로 가져오고 spend authority 없이 해당 주소들의 수신 및 발신 거래를 추적합니다.

**Zallet은 Sapling extended full viewing key만 가져옵니다.** `uview…` unified full viewing key는 내보낼 수는 있어도 가져오지는 못합니다. 전체 unified 계정에 대한 읽기 권한을 넘기려면 Zallet에서 UFVK를 내보낸 뒤 unified key를 받아들이는 Zkool 같은 지갑으로 가져오세요.

## 무엇이 바뀌었고, 이제는 무엇을 더 이상 찾지 말아야 하는가

이 페이지의 이전 버전이나 그 번역본을 따라왔다면, 이제 더 이상 작동하지 않는 경로가 세 가지 있습니다.

- **`zcash-cli z_exportviewingkey` 및 `z_importviewingkey`.** zcashd는 2026년 7월 18일 지원 종료 중단 시점에 도달했으며 더 이상 실행되지 않습니다. 같은 이름의 Zallet 메서드가 그 대체 수단입니다. [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참고하세요.
- **Ywallet 안내.** Wallets 페이지는 Ywallet를 **Ironwood: Not Ready**로 표시하므로, Ironwood 시대의 viewing key를 안내할 지갑으로 적절하지 않습니다. 같은 개발자가 만든 Zkool은 동일한 범위의 키를 받아들이며 Ready로 표시되어 있습니다.
- **zcashblockexplorer.com/vk.** 이 서비스는 잘못된 인증서와 함께 HTTP 503을 반환하며, 대체되지 않고 제거되었습니다. 웹사이트에 viewing key를 붙여 넣는 것은 해당 웹사이트 운영자에게 자신의 전체 거래 내역을 넘기는 행위이며, 예전 페이지의 세 가지 선택지 중에서도 항상 가장 취약한 방식이었습니다. 대신 직접 실행하는 지갑으로 키를 가져오세요.

## 자료

viewing key는 필요할 때만 사용하고, 질문에 답하는 데 필요한 가장 좁은 범위의 키를 우선하세요.

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Orchard 및 Ironwood 풀 전반에서 viewing key가 어떻게 동작하는지
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard 및 Ironwood 풀 정의
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 어떤 릴리스에 어떤 RPC 메서드가 추가되었는지
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 지원되는 계정 및 키 유형
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
