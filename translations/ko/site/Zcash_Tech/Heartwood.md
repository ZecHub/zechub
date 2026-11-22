<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Heartwood

> Heartwood은 2020년 7월 16일 UTC에 Zcash 메인넷 블록 903,000에서 가동을 시작했습니다.

이 문서에서 알아볼 내용: Heartwood을 통해 채굴자가 블록 보상을 거래정보 보호 주소로 바로 받을 수 있게 된 방법과, 경량 클라이언트가 Zcash의 작업 증명(Proof of Work)을 검증할 수 있게 된 방법입니다.

Heartwood은 Zcash [네트워크 업그레이드](../start-here/network-upgrades)로, 배포 방식이 [ZIP 250](https://zips.z.cash/zip-0250)에 정의된 합의 규칙 하드 포크입니다. 여기에는 두 가지 기능 변경이 포함되었습니다. [ZIP 213](https://zips.z.cash/zip-0213)(거래정보 보호 Coinbase)과 [ZIP 221](https://zips.z.cash/zip-0221)(FlyClient)입니다. Heartwood은 Zcash의 네 번째 주요 네트워크 업그레이드였으며, [Electric Coin Company](../zcash-organizations/electric-coin-company)와 [Zcash Foundation](../zcash-organizations/zcash-foundation)가 공동으로 지원했습니다. 모든 Zcash 업그레이드와 마찬가지로 새로운 합의 분기 ID를 설정했습니다. 이 ID는 양방향 재생 보호를 제공하는 태그로, 새 규칙에 따라 만든 거래를 이전 체인에서 재생할 수 없고 그 반대도 마찬가지입니다.

Heartwood은 정해진 시각이 아니라 특정 블록 높이(903,000)에서 활성화되므로, 대시보드에 표시되는 정확한 시각은 장소에 따라 조금씩 다를 수 있습니다. 블록과 활성화 시점은 동일합니다.

이것이 중요한 이유입니다. 채굴자는 블록을 채굴할 때마다 새로 발행된 ZEC를 보상으로 받습니다. Heartwood 이전에는 이 보상이 공개된 투명 주소로 들어가야 했습니다. 누구나 채굴자가 얼마나 벌었는지, 그 코인이 이후 어디로 이동했는지 확인할 수 있었습니다. Heartwood을 통해 보상을 거래정보 보호 주소로 바로 보낼 수 있게 되어 채굴자의 보수를 비공개로 유지할 수 있습니다. 또한 경량 지갑과 다른 체인이 전체 체인을 다운로드하지 않고도 Zcash의 작업 증명을 검증할 수 있게 되었습니다.

## 거래정보 보호 코인베이스

코인베이스 거래는 블록 보상을 지급하는 특별한 거래입니다. Heartwood 이전에는 출력이 투명 주소여야 했으므로, 새로 발행된 채굴자의 ZEC는 항상 공개 주소에서 시작했습니다. Heartwood은 합의 규칙을 변경하여 ZIP 213의 표현대로 코인베이스 거래에 Sapling 출력을 포함할 수 있도록 했습니다. 쉽게 말해, 이제 채굴자는 거래정보 보호 Sapling 주소로 보상을 바로 받을 수 있습니다. 투명한 코인베이스 출력도 계속 지원되므로, 이는 강제 변경이 아니라 새로운 선택지입니다.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## 먼저 Sapling을 사용하는 이유

거래정보 보호 코인베이스는 구체적으로 Sapling 출력을 대상으로 하며, 여기에는 이유가 있습니다. ZIP 213은 Sapling 업그레이드에서 아키텍처 변경과 성능 개선이 이루어져 코인베이스 거래에서 직접 자금을 거래정보 보호 처리할 수 있게 되었다고 설명합니다. 기존 Sprout 거래정보 보호 구역은 코인베이스에서 바로 거래정보 보호 처리하기에는 리소스가 너무 많이 들었습니다. Sapling의 더 효율적인 증명 시스템과 노트 형식 덕분에 이를 실용적으로 구현할 수 있었습니다. Sapling은 거래정보 보호 코인베이스 출력을 금지하던 기존 규칙을 확장해 Sapling 출력에도 적용했고, Heartwood은 해당 출력을 허용하도록 규칙을 완화했습니다. 이는 Zcash 업그레이드가 서로 기반을 쌓아 가는 좋은 사례입니다. 한 업그레이드의 기반 작업이 다음 업그레이드의 토대가 됩니다.

## FlyClient

Heartwood은 블록 헤더가 커밋하는 내용도 변경했습니다. 이전에 hashFinalSaplingRoot로 불리던 헤더 필드의 용도를 바꾸고 hashLightClientRoot로 이름을 변경했습니다. 이제 이 필드는 Merkle 마운틴 레인지(MMR)의 루트에 커밋합니다. 이는 타임스탬프, 난이도 목표값, Sapling 루트, 누적 작업량, 거래 수와 같은 이전 블록의 헤더 데이터와 메타데이터를 바탕으로 계속 갱신되는 구조입니다. 이 커밋먼트 덕분에 라이트 클라이언트나 외부 체인은 체인 길이에 대해 크기가 로그 규모로만 증가하는 작은 증명을 사용해 Zcash의 작업 증명을 검증할 수 있습니다. 따라서 라이트 클라이언트 지갑의 성능이 향상되고 제3자 및 크로스체인 통합이 쉬워집니다. 클라이언트가 체인의 작업량을 신뢰하기 위해 모든 블록을 다운로드할 필요가 없기 때문입니다.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwood의 역할

Heartwood은 Zcash 업그레이드 연속 과정의 한 단계이며, 각 업그레이드는 다음 단계가 의존하는 요소를 추가합니다. Overwinter과 Sapling은 2018년에, Blossom는 2019년에, Heartwood는 2020년 블록 903,000에서 적용되었습니다. 이후 2020년 블록 1,046,400에서 Canopy이 이어졌습니다. Sapling은 Heartwood을 위한 이 체인의 핵심 연결고리입니다. 효율적인 거래정보 보호 거래 처리 구조가 거래정보 보호 코인베이스를 가능하게 한 기술적 전제였기 때문입니다.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## 핵심 요약

- Heartwood은 2020년 7월 16일 UTC에 메인넷 블록 903,000에서 활성화되었으며, ZIP 250을 통해 배포되어 양방향 재생 보호를 위한 새로운 합의 분기 ID를 설정했습니다.
- ZIP 213(거래정보 보호 Coinbase): 코인베이스 거래에 Sapling 출력을 포함할 수 있어 채굴자는 블록 보상을 거래정보 보호 주소로 바로 받을 수 있습니다.
- ZIP 221(FlyClient): 헤더의 hashLightClientRoot가 이제 Merkle 마운틴 레인지에 커밋하므로, 라이트 클라이언트는 크기가 로그 규모로만 증가하는 증명으로 작업 증명을 검증할 수 있습니다.
- 투명한 코인베이스 출력도 계속 완전히 지원됩니다. 거래정보 보호 코인베이스는 의무가 아니라 새로운 선택지입니다.
- 활성화는 정해진 시각이 아니라 블록 높이를 기준으로 이루어지므로, 대시보드와 시간대에 따라 정확한 시각이 다릅니다.

## 핵심 설명

Heartwood 이전에는 채굴자가 새로 발행한 ZEC가 투명 주소에서 시작해야 했으므로 누구나 채굴자의 수입을 확인하고 이동 경로를 추적할 수 있었습니다. ZIP 213은 합의 규칙을 완화해 코인베이스 거래에서 Sapling 출력을 지급할 수 있도록 했으며, 새로 발행되는 순간부터 채굴자의 보수를 비공개로 유지할 수 있게 했습니다. Sapling을 대상으로 하는 이유는 Sapling의 효율적인 증명 방식 덕분에 코인베이스 내부에서 거래정보 보호 처리를 실용적으로 구현할 수 있었기 때문입니다. Sprout의 증명은 리소스가 많이 들어 이 방식으로 처리할 수 없었습니다.

ZIP 221은 헤더 필드 hashFinalSaplingRoot의 용도를 바꾸고 hashLightClientRoot로 이름을 변경했습니다. 이제 이 필드는 이전 블록의 타임스탬프, 난이도 목표값, Sapling 루트, 누적 작업량, 거래 수 등 헤더 데이터를 바탕으로 만든 Merkle 마운틴 레인지에 커밋합니다. 이렇게 하면 라이트 클라이언트나 다른 체인이 모든 블록을 다운로드하는 대신 작은 증명으로 Zcash의 작업 증명을 검증할 수 있습니다.

## 시각적 비유

이전에는 모든 채굴자의 급여일이 공개 게시판에 게시되어 금액과 이동 경로를 누구나 읽을 수 있었습니다. 이제 급여를 봉인된 봉투에 담아 받을 수 있습니다. 또한 새 블록마다 이전의 모든 블록을 요약한 작은 밀랍 봉인이 들어가므로, 낯선 사람도 모든 페이지를 읽는 대신 한눈에 전체 작업 체인을 확인할 수 있습니다.

## 자세히 알아보기

이 규칙 변경에는 역사가 있습니다. Sapling은 거래정보 보호 코인베이스를 금지한 기존 규칙을 확장해 Sapling 출력에도 적용했고, Heartwood은 이를 허용하도록 제한을 해제했습니다. 한 업그레이드의 기반 작업이 다음 업그레이드의 토대가 된다는 것을 잘 보여 주는 사례입니다. MMR 커밋먼트는 경량 지갑과 크로스체인 통합에 도움이 됩니다. 이전에는 Zcash의 작업량을 검증하려면 전체 체인을 다운로드해야 했습니다. 활성화 때 추가된 합의 분기 ID는 양방향 재생 보호를 제공합니다. 새 규칙에 따라 만든 거래를 이전 체인에서 재생할 수 없고 그 반대도 마찬가지입니다.

## 흔히 하는 실수

- **거래정보 보호 코인베이스가 의무화되었다고 생각하는 경우.** 투명한 코인베이스 출력도 여전히 유효하며, 채굴자가 선택할 수 있습니다.
- **Sprout이 거래정보 보호 코인베이스를 받을 수 있다고 생각하는 경우.** Sapling 출력만 허용됩니다. Sprout의 증명은 리소스가 너무 많이 들었습니다.
- **FlyClient이 풀 노드의 필요성을 없앤다고 생각하는 경우.** 이는 라이트 클라이언트와 크로스체인 검증자를 지원합니다. 풀 노드는 여전히 네트워크의 기반입니다.
- **활성화 시각이 정해져 있다고 생각하고 찾는 경우.** 활성화 시점은 블록 903,000으로 정해졌으므로 실제 시각은 달라집니다.
- **hashLightClientRoot를 이전의 hashFinalSaplingRoot와 혼동하는 경우.** 같은 필드의 용도와 이름이 변경되었습니다.


## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Network upgrade (NU) | Zcash의 합의 규칙을 함께 변경하고 정해진 블록 높이에서 활성화하는 업그레이드 |
| Coinbase transaction | 각 블록에서 블록 보상을 지급하는 특별한 거래 |
| Shielded Sapling address | Sapling 업그레이드에서 도입된 비공개 Zcash 주소 유형 |
| Shielded coinbase | 블록 보상을 거래정보 보호 Sapling 주소로 지급할 수 있게 하는 Heartwood 변경 |
| FlyClient | 라이트 클라이언트가 작은 증명으로 작업 증명을 검증할 수 있게 하는 방법 |
| Merkle Mountain Range (MMR) | 블록 헤더가 커밋하는 과거 블록의 지속적으로 갱신되는 요약 |
| Consensus branch id | 거래가 어느 업그레이드의 규칙을 따르는지 나타내며 재생 보호에 사용되는 태그 |

## 자주 묻는 질문

Heartwood은 제 ZEC이나 프라이버시에 영향을 주나요? 아니요. Heartwood은 기존 자금에 영향을 주지 않았습니다. 채굴자가 거래정보 보호 주소로 보상을 받을 수 있는 선택지를 추가하고 라이트 클라이언트 지원을 개선했습니다. 보유 잔액과 거래정보 보호 거래에는 영향이 없습니다.

거래정보 보호 코인베이스란 무엇인가요? 코인베이스는 블록 보상을 지급하는 거래입니다. Heartwood을 통해 해당 보상을 투명 주소 대신 거래정보 보호 Sapling 주소로 보낼 수 있어 채굴 수입을 비공개로 유지할 수 있습니다.

이제 채굴자는 반드시 거래정보 보호 방식으로 보상을 받아야 하나요? 아니요. 거래정보 보호 코인베이스는 선택 사항입니다. 투명한 코인베이스 출력도 계속 지원되므로 채굴자가 어느 쪽이든 선택할 수 있습니다.

거래정보 보호 코인베이스는 왜 Sapling을 사용하고 이전 Sprout 구역은 사용하지 않나요? Sapling의 더 효율적인 설계 덕분에 코인베이스에서 직접 거래정보 보호 처리를 실용적으로 구현할 수 있었기 때문입니다. 이전 Sprout 구역은 이를 처리하기에 리소스가 너무 많이 들었습니다.

라이트 클라이언트에는 어떤 변화가 있었나요? 이제 블록 헤더는 hashLightClientRoot 필드를 통해 과거 블록에 대한 Merkle 마운틴 레인지에 커밋합니다. 따라서 라이트 클라이언트와 다른 체인은 전체 체인 대신 작고 크기가 로그 규모로 증가하는 증명으로 Zcash의 작업 증명을 검증할 수 있습니다.

## 이해도 확인

Heartwood 이전에는 채굴자에게 지급된 블록 보상이 왜 공개적으로 보였으며, Heartwood은 무엇을 변경했나요?

<details>
<summary>정답</summary>

Coinbase 출력은 투명해야 했으므로, 채굴자가 새로 발행한 보상은 누구나 확인할 수 있는 공개 투명 주소에 들어갔습니다. Heartwood은 합의 규칙을 변경해(ZIP 213) 코인베이스 거래에 Sapling 출력을 포함할 수 있도록 했으며, 채굴자는 거래정보 보호 주소로 보상을 바로 받을 수 있게 되었습니다.
</details>

### 참고 자료

[ZIP 250: Heartwood 네트워크 업그레이드 배포](https://zips.z.cash/zip-0250)

[ZIP 213: 거래정보 보호 Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - 합의 계층 변경](https://zips.z.cash/zip-0221)

[Heartwood 네트워크 업그레이드](https://z.cash/upgrade/heartwood/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[거래정보 보호 구역](../using-zcash/shielded-pools)

[지갑](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## 관련 페이지

- [Sapling](./Sapling.md) — 거래정보 보호 코인베이스를 가능하게 한 효율적인 구조
- [Canopy](./Canopy.md) — 시리즈의 다음 업그레이드
- [풀 노드](./Full_Nodes.md) — 완전한 검증이 여전히 제공하는 기능
- [블록 탐색기에서 볼 수 있는 정보](./What_a_Block_Explorer_Can_See.md) — 투명 코인베이스와 거래정보 보호 코인베이스가 각각 드러내는 정보


시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Blossom](../zcash-tech/blossom) · 다음: [Canopy](../zcash-tech/canopy)
