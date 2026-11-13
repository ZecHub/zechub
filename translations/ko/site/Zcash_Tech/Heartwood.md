<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Heartwood

> Heartwood는 블록 903,000(2020년 7월 16일 UTC)에 Zcash 메인넷에서 활성화되었습니다.

이 문서에서 알게 될 내용: Heartwood가 어떻게 채굴자가 자신의 블록 보상을 곧바로 실드 주소로 받을 수 있게 했는지, 그리고 어떻게 Zcash의 작업증명을 경량 클라이언트가 검증할 수 있게 했는지.

Heartwood는 Zcash의 [네트워크 업그레이드](../start-here/network-upgrades)로, 배포는 [ZIP 250](https://zips.z.cash/zip-0250)에 정의된 합의 규칙 하드포크입니다. 여기에는 두 가지 기능 변경이 포함되었습니다: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase)와 [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient)입니다. Heartwood는 Zcash의 네 번째 주요 네트워크 업그레이드였으며, [Electric Coin Company](../zcash-organizations/electric-coin-company)와 [Zcash Foundation](../zcash-organizations/zcash-foundation)이 공동으로 지원했습니다. 모든 Zcash 업그레이드와 마찬가지로, Heartwood는 새로운 consensus branch id를 설정했습니다. 이는 새로운 규칙으로 생성된 트랜잭션이 이전 체인에서 재생될 수 없고, 그 반대도 불가능하도록 양방향 재생 공격 방지를 제공하는 태그입니다.

Heartwood는 고정된 시각이 아니라 정해진 블록 높이(903,000)에서 활성화되므로, 대시보드에 표시되는 정확한 분은 위치에 따라 약간 다를 수 있습니다. 하지만 블록도, 그 순간도 동일합니다.

이것이 왜 중요한가요? 채굴자는 블록을 채굴할 때마다 새로 발행된 ZEC를 얻습니다. Heartwood 이전에는 이 수익이 반드시 투명 주소로 들어가야 했고, 이는 공개되었습니다. 누구나 채굴자가 얼마나 벌었는지, 그리고 그 코인이 다음에 어디로 이동했는지 볼 수 있었습니다. Heartwood는 이 보상이 대신 곧바로 실드 주소로 들어갈 수 있게 하여 채굴자의 수익을 비공개로 유지할 수 있게 했습니다. 또한 경량 지갑과 다른 체인들이 전체 체인을 다운로드하지 않고도 Zcash의 작업증명을 검증할 수 있게 했습니다.

## 실드 코인베이스

코인베이스 트랜잭션은 블록 보상을 지급하는 특별한 트랜잭션입니다. Heartwood 이전에는 그 출력이 반드시 투명해야 했기 때문에, 채굴자가 새로 발행받은 ZEC는 항상 공개 주소에서 시작되었습니다. Heartwood는 합의 규칙을 변경하여, ZIP 213의 표현을 빌리면, 코인베이스 트랜잭션이 Sapling 출력을 포함할 수 있게 했습니다. 쉽게 말해, 이제 채굴자는 보상을 실드된 Sapling 주소로 직접 받을 수 있습니다. 투명 코인베이스 출력도 여전히 지원되므로, 이는 강제 변경이 아니라 새로운 선택지입니다.

![Heartwood 이전에는 채굴자의 블록 보상이 반드시 투명한 공개 주소로 가야 했습니다. Heartwood 이후에는 코인베이스 트랜잭션이 Sapling 출력을 포함할 수 있으므로, 보상이 곧바로 실드 주소로 갈 수 있습니다](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## 왜 먼저 Sapling이었을까

실드 코인베이스는 구체적으로 Sapling 출력을 대상으로 하며, 그에는 이유가 있습니다. ZIP 213은 Sapling 업그레이드가 구조적 변경과 성능 향상을 가져와 코인베이스 트랜잭션에서 직접 자금을 실드하는 것이 가능해졌다고 설명합니다. 원래의 Sprout 실드 풀은 코인베이스에서 바로 실드하기에는 리소스 소모가 너무 컸습니다. Sapling의 더 효율적인 증명 시스템과 노트 형식 덕분에 이것이 실용적이 되었습니다. Sapling 자체도 실드된 코인베이스 출력을 금지하던 기존 규칙을 확장하여 Sapling 출력에도 적용되도록 했고, Heartwood는 그 규칙을 완화해 이를 허용했습니다. 이는 Zcash 업그레이드들이 서로를 기반으로 구축된다는 점을 잘 보여주는 사례입니다. 한 업그레이드의 기반 작업이 다음 업그레이드의 토대가 되는 것입니다.

## FlyClient

Heartwood는 또한 블록 헤더가 무엇에 커밋하는지도 바꾸었습니다. 이전에 hashFinalSaplingRoot라고 불리던 헤더 필드는 용도가 변경되어 hashLightClientRoot로 이름이 바뀌었습니다. 이제 이 필드는 Merkle 마운틴 레인지(MMR)의 루트에 커밋합니다. 이는 이전 블록들의 헤더 데이터와 메타데이터(예: 타임스탬프, 난이도 목표값, Sapling 루트, 누적 작업량, 트랜잭션 수)를 바탕으로 구축되는 누적 구조입니다. 이 커밋 덕분에 경량 클라이언트나 외부 체인은 체인 길이에 대해 크기가 로그적으로만 증가하는 작은 증명으로 Zcash의 작업증명을 검증할 수 있습니다. 그 결과는 더 나은 경량 클라이언트 지갑과 더 쉬운 서드파티 및 크로스체인 통합입니다. 이제 클라이언트는 체인을 뒷받침하는 작업량을 신뢰하기 위해 모든 블록을 다운로드할 필요가 없습니다.

![FlyClient 흐름: 각 블록의 헤더 데이터는 Merkle Mountain Range 루트(hashLightClientRoot)에 커밋되며, 이를 통해 경량 클라이언트는 크기가 작은 로그형 증명으로 작업증명을 검증할 수 있습니다](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwood의 위치

Heartwood는 Zcash 업그레이드 연속선상에 있는 한 단계이며, 각 업그레이드는 다음 단계가 의존하는 구성 요소를 추가합니다. Overwinter와 Sapling은 2018년에, Blossom은 2019년에, Heartwood는 2020년 블록 903,000에서 도입되었습니다. 이후 2020년 후반 블록 1,046,400에서 Canopy가 뒤따랐습니다. Heartwood에서 이 연쇄의 핵심 연결 고리는 Sapling입니다. Sapling의 효율적인 실드 트랜잭션 구조가 실드 코인베이스를 가능하게 한 기술적 전제조건이었기 때문입니다.

![Zcash 업그레이드 타임라인: 2018년 Overwinter와 Sapling, 2019년 Blossom, 2020년 Heartwood](/content-images/heartwood-timeline-99bc79b6e9.webp)

## TL;DR (요약)

- Heartwood는 메인넷 블록 903,000(2020년 7월 16일 UTC)에서 활성화되었으며, 양방향 재생 공격 방지를 위한 새로운 합의 브랜치 ID와 함께 ZIP 250에 의해 배포되었습니다.
- ZIP 213 (Shielded Coinbase): 코인베이스 트랜잭션에 Sapling 출력이 포함될 수 있어, 채굴자가 블록 보상을 실드된 주소로 직접 받을 수 있습니다.
- ZIP 221 (FlyClient): 이제 헤더의 hashLightClientRoot가 Merkle Mountain Range에 커밋하므로, 경량 클라이언트는 크기가 로그 수준으로만 증가하는 증명으로 작업증명을 검증할 수 있습니다.
- 투명 코인베이스 출력도 여전히 완전히 지원됩니다. 실드 코인베이스는 새로운 선택지일 뿐 의무 사항이 아닙니다.
- 활성화는 시각이 아니라 블록 높이를 기준으로 이루어지므로, 정확한 분 단위 시각은 대시보드와 시간대에 따라 다르게 표시됩니다.

## 핵심 설명

Heartwood 이전에는 채굴자가 새로 채굴한 ZEC이 반드시 투명 주소에서 시작해야 했기 때문에, 누구나 채굴자의 수입을 지켜보고 그 자금이 어디로 흘러가는지 추적할 수 있었습니다. ZIP 213은 합의 규칙을 완화하여 코인베이스 트랜잭션이 Sapling 출력으로 지급할 수 있도록 했고, 이로써 채굴자의 보상은 생성되는 바로 그 순간부터 비공개로 유지됩니다. 이 변경은 특히 Sapling를 대상으로 하는데, Sapling의 효율적인 증명 덕분에 코인베이스 내부에서의 실딩이 실용적으로 가능해졌기 때문입니다. 반면 Sprout의 무거운 증명은 그곳에서 사용하기에 현실적이지 않았습니다.

ZIP 221은 헤더 필드 hashFinalSaplingRoot를 hashLightClientRoot로 용도 변경했습니다. 이제 이 필드는 이전 블록들의 헤더 데이터(타임스탬프, 난이도 목표값, Sapling 루트, 누적 작업량, 트랜잭션 수)를 바탕으로 구축된 Merkle Mountain Range에 대한 커밋먼트를 담습니다. 이를 통해 라이트 클라이언트나 다른 체인은 모든 블록을 다운로드하지 않고도 작은 증명만으로 Zcash의 작업 증명을 검증할 수 있습니다.

## 시각적 비유

이전: 모든 채굴자의 급여 지급 내역이 공개 게시판에 게시되어, 금액과 그 흐름을 누구나 읽을 수 있었습니다. 이후: 급여가 봉인된 봉투에 담겨 도착할 수 있습니다. 그리고 이제 각 새 블록에는 이전의 모든 블록을 요약한 작은 밀랍 봉인이 붙어 있어서, 낯선 사람도 모든 페이지를 읽는 대신 한눈에 전체 작업 체인을 확인할 수 있습니다.

## 심층 분석

이 규칙 변경에는 역사가 있었습니다. Sapling는 shielded coinbase에 대한 기존 금지를 Sapling 출력까지 확대했고, Heartwood는 그 제한을 해제하여 이를 허용했습니다. 이는 한 업그레이드의 기반 구조가 다음 업그레이드의 토대가 되는 깔끔한 사례입니다. MMR 커밋먼트는 경량 지갑과 크로스체인 통합에서 효과를 발휘하는데, 이전에는 Zcash의 작업을 검증하려면 전체 체인을 다운로드해야 했습니다. 활성화 시점에 추가된 합의 브랜치 ID는 양방향 리플레이 보호를 제공합니다. 새 규칙에 따라 생성된 트랜잭션은 이전 체인에서 리플레이될 수 없으며, 그 반대도 마찬가지입니다.

## 흔한 실수

- **차폐 coinbase가 의무화되었다고 생각하는 것.** 투명 coinbase 출력은 여전히 유효하며, 채굴자가 선택합니다.
- **Sprout가 차폐 coinbase를 받을 수 있다고 가정하는 것.** Sapling 출력만 허용됩니다. Sprout의 증명 생성은 자원 소모가 너무 컸습니다.
- **FlyClient가 풀 노드의 필요성을 없앤다고 믿는 것.** 이는 라이트 클라이언트와 크로스체인 검증자를 위한 것이며, 네트워크의 기반은 여전히 풀 노드가 지탱합니다.
- **고정된 활성화 시각을 찾는 것.** 활성화는 블록 903,000으로 정의되었기 때문에 실제 시각(분 단위)은 달라질 수 있습니다.
- **hashLightClientRoot를 이전의 hashFinalSaplingRoot와 혼동하는 것.** 같은 필드가 용도가 변경되고 이름이 바뀐 것입니다.

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는, Zcash 합의 규칙의 조정된 변경 |
| Coinbase transaction | 각 블록에서 블록 보상을 지급하는 특별한 트랜잭션 |
| Shielded Sapling address | Sapling 업그레이드에서 도입된 비공개 Zcash 주소 유형 |
| Shielded coinbase | 블록 보상이 실드된 Sapling 주소로 지급될 수 있게 한 Heartwood의 변경 |
| FlyClient | 경량 클라이언트가 작은 증명으로 작업증명을 검증할 수 있게 하는 방법 |
| Merkle Mountain Range (MMR) | 블록 헤더가 커밋하는 과거 블록들의 누적 요약 |
| Consensus branch id | 트랜잭션이 어느 업그레이드의 규칙을 따르는지 식별하는 태그로, 재생 공격 방지에 사용됨 |

## FAQ

Heartwood가 내 ZEC나 내 프라이버시를 바꾸나요? 아니요. Heartwood는 기존 자금에 영향을 주지 않았습니다. 채굴자가 보상을 실드 주소로 받을 수 있는 선택지를 추가했고 경량 클라이언트 지원을 개선했습니다. 사용자의 잔액과 실드 트랜잭션 자체는 영향을 받지 않습니다.

실드 코인베이스란 무엇인가요? 코인베이스는 블록 보상을 지급하는 트랜잭션입니다. Heartwood는 이 보상이 투명 주소 대신 실드된 Sapling 주소로 들어갈 수 있게 하여 채굴 수익을 비공개로 유지할 수 있게 합니다.

이제 채굴자는 반드시 실드된 방식으로 보상을 받아야 하나요? 아니요. 실드 코인베이스는 선택 사항입니다. 투명 코인베이스 출력도 계속 지원되므로, 채굴자는 둘 중 하나를 선택할 수 있습니다.

왜 실드 코인베이스는 오래된 Sprout 풀이 아니라 Sapling을 사용하나요? Sapling의 더 효율적인 설계 덕분에 코인베이스에서 직접 실드하는 것이 실용적이 되었기 때문입니다. 이전의 Sprout 풀은 이를 수행하기에 리소스 소모가 너무 컸습니다.

경량 클라이언트에는 무엇이 바뀌었나요? 이제 블록 헤더는 hashLightClientRoot 필드를 통해 과거 블록들에 대한 Merkle Mountain Range에 커밋합니다. 덕분에 경량 클라이언트와 다른 체인들은 전체 체인 대신 크기가 작은 로그형 증명만으로 Zcash의 작업증명을 검증할 수 있습니다.

## 이해도 확인

Heartwood 이전에는 왜 채굴자에게 지급된 블록 보상이 공개적으로 드러났고, Heartwood는 무엇을 바꾸었나요?

<details>
<summary>정답</summary>

Coinbase 출력은 투명해야 했기 때문에, 채굴자가 새로 발행받은 보상은 항상 누구나 들여다볼 수 있는 공개 투명 주소로 들어갔습니다. Heartwood은 합의 규칙(ZIP 213)을 변경하여 코인베이스 트랜잭션이 Sapling 출력을 포함할 수 있도록 했고, 이를 통해 채굴자는 보상을 차폐 주소로 직접 받을 수 있게 되었습니다.
</details>

### 자료

[ZIP 250: Heartwood 네트워크 업그레이드 배포](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - 합의 계층 변경](https://zips.z.cash/zip-0221)

[Heartwood 네트워크 업그레이드](https://z.cash/upgrade/heartwood/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[실드 풀](../using-zcash/shielded-pools)

[지갑](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## 관련 페이지

- [Sapling](./Sapling.md) — 차폐된 코인베이스를 가능하게 만든 효율적인 메커니즘
- [Canopy](./Canopy.md) — 이 시리즈의 다음 업그레이드
- [풀 노드](./Full_Nodes.md) — 완전한 검증이 여전히 제공하는 것
- [블록 탐색기가 볼 수 있는 것](./What_a_Block_Explorer_Can_See.md) — 투명 코인베이스와 차폐된 코인베이스가 각각 드러내는 정보

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Blossom](../zcash-tech/blossom) · 다음: [Canopy](../zcash-tech/canopy)
