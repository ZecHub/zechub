# Zcash 라이브러리

Zcash와 관련된 핵심 용어, 개념, 리소스를 종합적으로 정리한 용어집입니다.

### 빠른 이동
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Term | Definition |
|------|-----------|
| Actions | Orchard 프로토콜은 각 Spend와 Output마다 여러 개의 개별 증명을 생성하는 대신, 이를 하나의 Action으로 병합합니다. |
| Addresses | Zcash에는 Shielded (Z/zaddr) 주소와 Transparent (T/taddr) 주소가 있습니다. Unified addresses (UA)는 NU5 업그레이드 이후 Z와 T를 대체하기 위해 도입되고 있습니다. |
| Arborist Call | Zcash 프로토콜 및 연구 개발 업데이트를 다루는 격주 통화입니다. Zcash 커뮤니티 포럼과 Discord에서 진행됩니다. [회의 노트](https://github.com/ZcashCommunityGrants/arboretum-notes) / [포럼 공지](https://forum.zcashcommunity.com) |
| Auto-shielding | 사용자가(보다 정확히는 그들의 지갑이) 투명 주소에서 최신 shielded ZEC 풀로 자금을 자동으로 이동할 수 있게 합니다. |

## B

| Term | Definition |
|------|-----------|
| Benchmarking | 채굴자는 Zcash 채굴에 사용되는 다양한 하드웨어의 효율성에 대한 지표를 제출할 수 있습니다. [여기서 보기](https://zcashbenchmarks.info) |
| Block | 블록은 네트워크에서 전송된 거래 집합을 담고 있는 Zcash 블록체인의 기록입니다. 평균적으로 약 75초마다 새로운 블록이 블록체인에 추가됩니다. |
| Block Explorer | 블록체인상의 모든 거래를 과거와 현재를 포함해 볼 수 있는 온라인 도구입니다. [Zcash 블록 탐색기](https://zcashexplorer.app/) |
| Blogs | [ZODL 블로그 (구 Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation 블로그](https://zfnd.org/blog/) / [ZecHub 블로그](https://zechub.wiki/zechub-dao) |
| Blossom | Zcash의 세 번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Term | Definition |
|------|-----------|
| Canopy | Zcash의 다섯 번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | 커미터가 짧은 문자열로 다항식에 커밋할 수 있게 하며, 검증자는 이를 사용해 커밋된 다항식의 주장된 평가값을 확인할 수 있습니다. Zcash 프로토콜의 통신 비용을 줄이는 데 유용합니다. |
| Community | [공식 Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com) / [Zcash 커뮤니티 Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | 작업증명 기반 블록 생성은 유지하면서 그 위에 지분증명 기반 파이널리티 레이어를 추가하는 하이브리드 합의 설계 제안입니다. 이를 통해 채굴을 포기하지 않고도 블록이 더 강한 최종성을 확보할 수 있습니다. 이는 Trailing Finality Layer 연구에서 발전했으며, 2026년 기준으로 아직 테스트넷 개발 단계에서 Shielded Labs가 구축 중입니다. |
| CrossPay | ZODL 지갑의 기능으로, 중앙화 거래소를 거치지 않고 NEAR Intents를 통해 라우팅되어 수신자가 선호하는 자산과 체인으로 지급받는 동안 사용자는 shielded ZEC를 사용할 수 있게 해줍니다. |
| Cypherpunk Zero | ECC, 일러스트레이터 Stranger Wolf, Mighty Jaxx 및 일부 생태계 파트너 간의 창의적 세계관이자 협업 프로젝트입니다. [Cypherpunk Zero 사이트](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea 컬렉션](https://opensea.io/collection/cypherpunk-zero) |

## D

| Term | Definition |
|------|-----------|
| DeFi | ZEC를 DeFi와 통합하는 프로젝트: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/) |
| Deshielding | zaddr (shielded 주소)에서 taddr (transparent 주소)로 거래가 전송되는 것을 의미합니다. 거래의 출처는 보이지 않지만 자금은 공개적으로 보이는 가치 풀로 들어갑니다. |
| Developer Resources | [개발자 리소스](https://www.zcashcommunity.com/developers/) |
| Documentation | [공식 문서](https://zcash.readthedocs.io/en/latest/) |

## E

| Term | Definition |
|------|-----------|
| ECC | Electric Coin Company는 Zcash 프로토콜을 출시한 팀이며, 이전에는 Zcash Company로 알려졌습니다. 2026년 1월 Bootstrap 이사회와의 거버넌스 분쟁 이후 엔지니어링 팀 전체가 사임했고, 이후 ZODL을 설립했습니다. |
| ECDSA | 타원 곡선 디지털 서명 알고리즘은 암호학적으로 안전한 디지털 서명 체계입니다. ECDSA 서명/검증 알고리즘은 타원 곡선 점 곱셈에 의존합니다. |
| Education | Zcash를 설명하는 학습 중심 영상은 [여기](https://www.zcashcommunity.com/zcash-education/)에서 볼 수 있습니다 |
| Encrypted Memos | shielded 주소로 전송되는 거래에 추가되는 필드로, 결제 수신자가 볼 수 있습니다. 암호화된 메모는 발신자와 수신자에게만 보입니다. |
| Equihash | Zcash에서 사용되는 메모리 지향형 작업증명 채굴 알고리즘입니다. |
| Events | Zcash 관련 이벤트 일정은 [Luma](https://luma.com/zcash)와 [Zcash Foundation](https://zfnd.org/zf-events/)에서 확인할 수 있습니다 |
| Exchanges | [Zcash를 지원하는 거래소 목록](https://z.cash/exchanges/) |

## F

| Term | Definition |
|------|-----------|
| Fiat-Shamir | 상호작용형 지식 증명을 바탕으로 디지털 서명을 생성하는 기법입니다. 이를 통해 어떤 사실(예: 비밀에 대한 지식)을 기반 정보 공개 없이 공개적으로 증명할 수 있습니다. |
| Formal Verification | 테스트에만 의존하는 대신, 시스템이 명세된 대로 정확히 동작함을 수학적으로 증명하는 것입니다. Ironwood Action 회로는 건전성 버그가 없음을 입증하기 위해 zkSecurity와 ZODL의 기여자들이 Lean 정리 증명기를 사용하여 이러한 방식으로 검증했습니다. |
| Founders Reward | Founder 보상은 전체 블록 보상의 20퍼센트를 차지하며, 각 블록의 가치에서 차감되어 프로토콜 개발과 성장을 촉진하기 위해 투명하게 분배됩니다. |
| Free2z | Zcash로 구동되는 익명 콘텐츠 및 비공개 기부 도구입니다. [Free2z](https://free2z.com) |
| FROST | Flexible Round-Optimized Schnorr 임계값 서명 체계입니다. [연구 논문](https://eprint.iacr.org/2020/852) |

## G

| Term | Definition |
|------|-----------|
| Governance | ZIP 프로세스의 결정은 Zcash 명세와 네트워크를 실행하는 소프트웨어에 반영됩니다. 변경 사항은 네트워크의 과반수가 업그레이드를 채택하고 합의를 깨뜨리지 않을 때 온체인에서 비준됩니다. [전체 프로토콜 역사](https://zfnd.org/protocol-governance/) |

## H

| Term | Definition |
|------|-----------|
| Halo | 신뢰할 수 있는 설정 없이도 회로 업그레이드를 가능하게 하여, Zcash shielded 프로토콜이 미래의 개선과 확장을 위해 더 민첩하게 대응할 수 있도록 합니다. [기술 설명](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | 계층적 결정형 지갑은 하나의 시드에서 일련의 키 쌍을 생성하여 편의성, 관리 용이성, 그리고 높은 수준의 보안을 제공합니다. |
| Heartwood | Zcash의 네 번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://z.cash/upgrade/heartwood/) |

## I

| Term | Definition |
|------|-----------|
| Index | CoinDesk의 ZCX Index는 Zcash의 실시간 USD 상당 현물 환율을 나타냅니다. [가격 지수](https://www.coindesk.com/indices/zcx/) |
| Integrations | 여러 서드파티 제공업체를 통해 Zcash 결제를 받을 수 있습니다. [결제 처리업체](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 증명자(Prover)와 검증자(Verifier)라는 두 당사자 간의 메시지 교환으로 계산을 모델링하는 추상 기계입니다. |
| Investment | Zcash에 대한 익스포저를 얻고자 하는 기관 투자자나 패밀리 오피스를 위해 여러 금융 옵션이 제공됩니다. [전체 목록](https://z.cash/investors/) |
| Ironwood | 2026년 7월 28일 메인넷의 블록 3,428,143에서 활성화된 네트워크 업그레이드(NU6.3)입니다. Ironwood라고도 불리는 새로운 실드 풀을 도입했으며, 기존 가치가 turnstile을 통해 이동하도록 Orchard 풀을 출금 전용으로 만들었습니다. [더 알아보기](/zcash-tech/ironwood) |

## J

| Term | Definition |
|------|-----------|
| JubJub | zk-SNARK 회로에서 효율적으로 구현되도록 설계된 타원 곡선입니다. |

## K

| Term | Definition |
|------|-----------|
| Keystone Wallet | 기본 Zcash (Orchard shielded) 지원을 제공하는 에어갭 하드웨어 지갑으로, ZODL과 호환되어 콜드 서명이 가능합니다. [Keystone](https://keyst.one) |

## L

| Term | Definition |
|------|-----------|
| Layer-1 | 기반 네트워크와 그 기저 인프라를 의미합니다. Layer-1 블록체인은 다른 네트워크 없이도 거래를 검증하고 최종 확정할 수 있습니다. Zcash는 L1 블록체인입니다. |
| librustzcash | Zcash 작업에 필요한 모든 크레이트와 의존성을 포함하는 Rust 워크스페이스입니다. [repo](https://github.com/zcash/librustzcash) |
| Lightwalletd | 라이트 클라이언트에 블록체인 정보를 제공하는 상태 비저장 서버입니다. [Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Term | Definition |
|------|-----------|
| Metrics | 네트워크 지표는 [여기](https://tokenterminal.com/explorer/projects/zcash/metrics/all)에서 확인할 수 있습니다 |
| Metadata | 사용자의 Zcash 거래와 함께 생성되는 데이터입니다. 여기에는 블록 높이, 거래 버전, 만료 높이 등이 포함될 수 있습니다. |
| Mobile SDK | Android를 Zcash에 연결해 서드파티 Android 앱이 shielded 거래를 송수신할 수 있게 하는 경량 SDK입니다. [Github](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | 각 블록마다 Zcash 네트워크의 노드들이 자동 조정되는 난이도에 기반해 복잡한 수학 계산을 수행하며 해답을 찾기 위해 경쟁하는 과정입니다. [가이드](https://z.cash/mining-zcash/) |
| Multisignature | 자금을 사용하기 위해 여러 개의 개인 키 서명이 필요한 주소입니다. 현재 멀티시그 기능은 transparent 주소에서만 지원됩니다. |

## N

| Term | Definition |
|------|-----------|
| Network Sustainability Mechanism (NSM) | 프로토콜의 장기적인 보안 예산이 전적으로 발행량에만 의존하지 않도록 거래 수수료의 일부를 소각하자는 Shielded Labs의 제안입니다. ZIP 234에 명시되어 있으며, 2026년에 검토 중입니다. |
| Nighthawk | Zcash용 모바일 지갑입니다. [웹사이트](https://nighthawkwallet.com) |
| Noir Wallet | Zcash Community Grants의 지원을 받는 Zcash 브라우저 확장 지갑으로, QR 코드와 수동 전송에 의존하는 대신 shielded ZEC를 브라우저 애플리케이션에 직접 연결하도록 구축되었습니다. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Orchard shielded 풀과 Unified Addresses를 도입한 Zcash의 여섯 번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash Community Grants 프로그램과 Shielded Labs에 자금을 지원하기 위해 블록 보조금을 조정한 Zcash의 일곱 번째 주요 네트워크 업그레이드입니다. 2024년 말에 활성화되었습니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood 이후의 다음 주요 네트워크 업그레이드입니다. 후보 기능에는 Project Tachyon의 확장성 작업, Zcash Shielded Assets, 그리고 Network Sustainability Mechanism이 포함됩니다. |

## O

| Term | Definition |
|------|-----------|
| Oblivious Synchronization | Project Tachyon에서 개발 중인 방식으로, 지갑이 신뢰할 수 없는 서버에 필요한 데이터를 요청하면서도 어떤 note에 대해 요청하는지 드러내지 않도록 해줍니다. 프로토콜이 nullifier를 서로 연결할 수 없는 방식으로 변화시키기 때문에, 서버는 사용자의 nullifier를 절대 알 수 없습니다. [설명글](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard Shielded Pool | Zcash의 세 번째 shielded 풀이며, 우리의 ZK-SNARKs 기술 스택이 계속 진화하고 있음을 보여줍니다. [전체 내용](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | Zcash의 첫 번째 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Term | Definition |
|------|-----------|
| Payments | 다양한 결제 제공업체를 통해 일상적인 구매에 Zcash를 사용할 수 있습니다. [결제 앱](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | 데이터가 그 자체의 정확성에 대한 증명과 함께 이동하는 프리미티브로, 데이터를 결합하면 증명도 함께 결합됩니다. Project Tachyon은 차폐 프로토콜을 PCD를 중심으로 재구성하여, 각 지갑이 체인을 다시 스캔하는 대신 자체 잔액이 정확하다는 재귀적 증명을 지니도록 합니다. Zcash 구현체는 [Ragu](https://github.com/tachyon-zcash/ragu)이며, Halo를 따르고 신뢰할 수 있는 설정이 필요하지 않습니다. |
| Peer-to-Peer Network | P2P 네트워크는 탈중앙화 개념에 기반합니다. 블록체인 기술의 기초 아키텍처입니다. |
| PIR (Private Information Retrieval) | 서버가 어떤 레코드를 요청했는지 알지 못한 채 서버에서 레코드를 가져올 수 있게 해주는 기술입니다. Zcash에서는 라이트 지갑이 무엇을 찾고 있는지 노출하지 않고 필요한 것을 가져오는 방법으로 활발히 연구되고 있습니다. |
| Podcast | [Radiolab (Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Term | Definition |
|------|-----------|
| QR Code | Zcash 주소를 쉽게 스캔할 수 있도록 인코딩하는 기계 판독 가능 코드입니다. Unified Addresses (UA)는 현대적인 Zcash 지갑에서 일반적으로 QR 코드로 공유됩니다. |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005)에 명시된 Ironwood 노트의 속성으로, 미래의 양자 컴퓨터가 오늘날 이를 보호하는 암호기술을 깨뜨리더라도 코인의 온체인 기록을 복구 가능하게 유지합니다. 이는 양자 저항성이 아니라 복구 경로이며, 기존의 Sprout, Sapling 또는 Orchard 자금이 아니라 Ironwood 노트에 적용됩니다. |

## R

| Term | Definition |
|------|-----------|
| Recovery Phrase | 지갑을 백업하고 복원하는 데 사용되는 12개 또는 24개의 문자와 숫자 시퀀스입니다. Zcash에서 이 문구는 spending key와 viewing key를 재생성하므로 자금 복구와 보안에 매우 중요합니다. |

## S

| Term | Definition |
|------|-----------|
| Sapling | shielded 거래의 효율성을 크게 향상시키고 모바일 채택의 길을 연 주요 네트워크 업그레이드입니다. 블록 419200에서 활성화되었습니다. |
| Selective Disclosure | shielded 주소의 소유자가 viewing key 또는 결제 공개 정보를 제3자와 선택적으로 공유하면서도 다른 모든 사람에게는 데이터를 비공개로 유지할 수 있게 합니다. |
| Shielded Address | zaddr라고도 합니다. z로 시작합니다. zk-SNARKs를 사용해 발신자, 수신자, 금액, 메모를 숨깁니다. |
| Shielded Labs | Zcash 프로토콜 경제학과 합의를 연구하는 독립 조직입니다. 현재 Crosslink와 Network Sustainability Mechanism을 주도하고 있습니다. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | shielded 주소들 사이에서만 이루어지는 거래입니다. 블록체인에서 완전히 비공개입니다. |
| Sol/s | 초당 솔루션 수 - Equihash 채굴 성능을 측정합니다. |
| Spending Key | shielded 주소에서 자금을 사용할 수 있게 해주는 개인 키입니다(잔액과 거래 내역도 볼 수 있게 해줍니다). |
| Sprout | Zcash의 최초 shielded 프로토콜 버전입니다(2016년 출시). |

## T

| Term | Definition |
|------|-----------|
| Tachyon | NU7를 목표로 하는 Zcash의 확장 프로그램입니다. 지갑이 모든 블록을 스캔하는 방식에서 벗어나 증명을 수반하는 지갑 상태, oblivious synchronization, 그리고 가지치기 가능한 노드 상태로 전환하여, 초당 수천 건의 shielded 거래 처리량을 목표로 합니다. [프로젝트 사이트](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (가치가 없는 테스트 통화)입니다. |
| Testnet | 메인넷 전에 업그레이드와 기능을 테스트하기 위한 별도의 블록체인입니다. |
| Trailing Finality Layer (TFL) | 채굴을 대체하지 않으면서 최근 블록을 확정할 수 있도록, Zcash의 작업증명 체인 뒤에 finality layer를 추가하는 연구입니다. Crosslink는 이 연구에서 나온 설계입니다. |
| Transaction | 사용자 간의 결제로, 네트워크에 제출되고 결국 블록에서 확인됩니다. |
| Transaction Expiry | 거래가 확인되지 않으면 약 25분(20블록) 후 만료되며, 자금은 자동으로 반환됩니다. |
| Transaction Fee | 기본 수수료는 0.0001 ZEC입니다. 더 높은 수수료가 우선순위를 가지며, 매우 낮은 수수료는 지연이나 만료를 초래할 수 있습니다. |
| Transparent Address | taddr라고도 합니다. t로 시작합니다. 완전히 공개됩니다(Bitcoin과 유사). |
| Transparent Transaction | transparent 주소들 사이에서만 이루어지는 거래로, 모든 것이 공개적으로 보입니다. |
| Turnstile | 각 shielded 풀에 얼마나 많은 가치가 들어오고 나가는지를 추적하는 회계 규칙으로, 어떤 풀도 들어간 양보다 더 많이 내보낼 수 없도록 합니다. Zcash 역사상 모든 풀 전환에서 사용되었으며, 현재는 Orchard에서 Ironwood로의 마이그레이션을 보호하고 있습니다. [자세한 정보](/zcash-tech/the-turnstile) |

## U

| Term | Definition |
|------|-----------|
| Unified Address | 하나의 문자열로 transparent 및 shielded 결제 모두에 작동하는 현대적인 주소 형식입니다(NU5에서 도입). |
| Upgrade Activation | 네트워크 업그레이드(예: NU5, NU6)가 자동으로 활성화되는 특정 블록 높이입니다. |

## V

| Term | Definition |
|------|-----------|
| Viewing Key | 자금을 사용할 수는 없지만 shielded 주소의 잔액과 거래 내역을 볼 수 있게 해주는 개인 키입니다. |

## W

| Term | Definition |
|------|-----------|
| Wallet | 개인 키를 저장하고 ZEC를 송수신할 수 있게 해주는 소프트웨어 또는 하드웨어입니다. 현재 활성 지갑에는 ZODL (iOS/Android), Zingo! (모바일/데스크톱), Nighthawk (Android), YWallet, Zallet (출시 예정), Keystone (하드웨어)가 포함됩니다. 전체 목록은 [Zcash 생태계 지갑](https://z.cash/ecosystem/?wallets=#tag-wallets)에서 확인하세요 |
| WebZjs | 브라우저 환경을 위해 ChainSafe가 구축한 Zcash용 최초의 JavaScript SDK입니다. 이 SDK는 MetaMask에 shielded ZEC를 도입한 Zcash Shielded Wallet 스냅의 기반이 됩니다. |

## X

| Term | Definition |
|------|-----------|
| XZC | 일부 구형 거래소에서 사용되던 Zcash의 이전 티커 심볼입니다. 공식 티커는 ZEC입니다. |

## Y

| Term | Definition |
|------|-----------|
| YWallet | Orchard, Sapling 및 transparent 주소를 지원하는 프라이버시 중심 Zcash 지갑으로, 빠른 동기화로 잘 알려져 있습니다. 더 이상 유지 관리되지 않습니다: 개발자가 Ironwood용으로 업데이트하지 않을 것이라고 확인했기 때문에 이제 더 이상 네트워크를 따라갈 수 없습니다. 같은 개발자가 만든 Zkool이 현재 유지 관리되는 후속 지갑입니다. |

## Z

| Term | Definition |
|------|-----------|
| Zcash | zk-SNARKs를 사용하는 프라이버시 중심 암호화폐입니다. transparent (Bitcoin 스타일) 결제와 완전한 shielded 결제를 연결합니다. |
| Zcash Foundation | Zcash 생태계를 지원하고, 개발에 자금을 지원하며, 프라이버시를 촉진하는 독립 비영리 단체입니다. |
| Zcash Network | 거래를 검증하고 블록체인을 유지하는 노드들의 피어투피어 네트워크입니다. |
| ZEC | Zcash의 공식 통화 코드입니다(일부 거래소는 여전히 XZC를 표시합니다). |
| Zerocash | Zcash의 기반이 된 학술 프로토콜(2014)입니다. |
| Zaino | lightwalletd를 대체하는 차세대 Zcash 인덱서로, Zcash Foundation이 구축했습니다. 라이트 클라이언트가 더 빠르고 더 프라이빗하게 동기화할 수 있게 합니다. Zcash Z3 인프라 업그레이드의 일부입니다. |
| Zakura | 2026년 7월에 출시된 Zcash 풀 노드 구현으로, Valar Group과 Project Tachyon이 Zebra를 포크해 구축했습니다. 스냅샷 부트스트래핑을 갖추고 처리량과 동기화 속도를 목표로 하며, 초당 약 50,000건의 거래라는 카드 네트워크 규모를 지향한다고 밝혔습니다. [zakura.com](https://zakura.com) |
| Zallet | Zcash Z3 인프라 작업의 일환으로 Zaino 기반 위에 구축되었으며, `zcashd`가 퇴역했을 때 그 지갑 기능을 넘겨받은 지갑 구성 요소입니다. |
| Zebra | Zcash Foundation의 Rust 기반 풀 노드 구현입니다(`zcashd`의 대안). 프로덕션 준비가 완료되었고 활발히 유지보수되고 있습니다. [GitHub](https://github.com/ZcashFoundation/zebra) |
| zcashd | Bitcoin Core에서 포크된 원래의 Zcash 풀 노드입니다. 오랜 기간의 지원 중단 예고 끝에 2026년 7월에 퇴역했으며, 그 역할은 합의를 위한 Zebra와 지갑 기능을 위한 Zallet으로 나뉘었습니다. |
| ZIP | Zcash Improvement Proposal - 프로토콜 변경을 제안하고 비준하는 데 사용되는 커뮤니티 거버넌스 프로세스입니다. [ZIP 저장소](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab입니다. 2026년 초 Josh Swihart와 전 Electric Coin Company 엔지니어링 팀이 Bootstrap과의 거버넌스 분쟁으로 사임한 뒤 설립한 독립 조직입니다. 2026년 3월에 2,500만 달러가 넘는 시드 투자를 유치했으며, 2026년 2월 Zashi에서 이름이 바뀐 Zodl 지갑을 유지보수하고 있습니다. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — Zcash shielded 거래를 구동하는 암호 기술입니다. 어떤 진술(예: 유효한 지출)을 비밀 정보를 전혀 공개하지 않고도 증명할 수 있게 합니다. |
| ZSA (Zcash Shielded Assets) | Zcash의 shielded 프라이버시를 상속하는 사용자 발행 토큰으로, ZEC 이외의 자산도 네트워크에서 프라이빗하게 이동할 수 있게 합니다. [ZIP 226](https://zips.z.cash/zip-0226)에 명시되어 있으며 NU7의 후보 기능입니다. |

---

**마지막 업데이트:** 2026년 7월
**기여하고 싶으신가요?** [GitHub에서 이 페이지 편집하기](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
