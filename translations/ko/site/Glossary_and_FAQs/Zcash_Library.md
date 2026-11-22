# Zcash 라이브러리

Zcash와 관련된 주요 용어, 개념 및 자료를 망라한 용어집입니다. 릴리스 노트, 포럼 게시물 또는 지갑 변경 기록에 나온 용어를 찾아볼 수 있는 통합 라이브러리입니다.

### 빠른 탐색
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| 용어 | 정의 |
|------|-----------|
| Actions | 각 스펜드와 출력에 대해 여러 개의 개별 증명을 만드는 대신, Orchard 프로토콜은 이를 하나의 액션으로 병합합니다. |
| Addresses | Zcash에는 거래정보 보호 주소(zaddr)와 투명 주소(taddr)가 있습니다. 통합 주소(UA)는 여러 수신자 유형을 하나로 묶어 송신 지갑이 양측에서 모두 지원하는 최적의 주소를 선택할 수 있게 합니다. [ZIP 316](https://zips.z.cash/zip-0316)에 명시되어 있습니다. [통합 주소](/zcash-tech/unified-addresses) |
| Arborist Call | Zcash 프로토콜 및 연구 개발 업데이트를 다루는 격주 회의입니다. Zcash 커뮤니티 포럼과 Discord에서 진행합니다. [회의록](https://github.com/ZcashCommunityGrants/arboretum-notes) / [포럼 공지](https://forum.zcashcommunity.com) |
| Auto-shielding | 사용자가(더 정확히는 사용자의 지갑이) 투명 주소에서 최신 거래정보 보호 ZEC 구역으로 자금을 자동으로 옮길 수 있게 합니다. |

## B

| 용어 | 정의 |
|------|-----------|
| Benchmarking | 채굴자는 Zcash 채굴에 사용되는 여러 하드웨어의 효율성 지표를 제출할 수 있습니다. [여기에서 보기](https://zcashbenchmarks.info) |
| Block | 블록은 네트워크에서 전송된 일련의 거래를 담고 있는 Zcash 블록체인의 기록입니다. 평균적으로 약 25초마다 새로운 블록이 블록체인에 추가됩니다(NU7이 2026년 11월 활성화되기 전에는 75초였습니다). |
| Block Explorer | 블록체인의 과거 및 현재 거래를 모두 확인할 수 있는 온라인 도구입니다. [Zcash 블록 탐색기](https://zcashexplorer.app/) |
| Blogs | [ZODL 블로그(이전 명칭 Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation 블로그](https://zfnd.org/blog/) / [ZecHub 뉴스레터](https://zechub.substack.com/) |
| Blossom | Zcash의 3번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| 용어 | 정의 |
|------|-----------|
| Canopy | Zcash의 5번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | 커미터가 짧은 문자열로 다항식에 커밋할 수 있게 합니다. 검증자는 이 문자열을 사용해 해당 다항식의 주장된 평가값을 확인할 수 있습니다. Zcash 프로토콜의 통신 비용을 줄이는 데 유용합니다. |
| Community | [공식 Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com) / [Zcash 커뮤니티 Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash 연구 개발 Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Zcash의 기존 작업 증명 방식과 지분 증명 방식을 함께 운용하는 하이브리드 합의 설계 제안입니다. Shielded Labs에서 작업을 이끌고 `crosslink_monolith` 저장소의 Feature Net 테스트 네트워크를 운영합니다. 이전 `zebra-crosslink` 프로토타입 저장소는 2026년 11월 폐기되었습니다. 현재 Crosslink는 Zcash의 일부가 아닙니다. [Crosslink 프로토콜](/zcash-tech/crosslink-protocol) |
| CrossPay | ZODL 지갑의 기능으로, 거래정보 보호 ZEC를 사용해 자금을 보내면서 수취인이 선호하는 자산과 체인으로 대금을 지급할 수 있습니다. 중앙화 거래소가 아닌 NEAR Intents을 통해 거래가 이루어집니다. |
| Cypherpunk Zero | ECC, 일러스트레이터 Stranger Wolf, Mighty Jaxx 및 일부 생태계 파트너가 함께하는 크리에이티브 유니버스이자 협업 프로젝트입니다. [Cypherpunk Zero 소셜 채널](https://x.com/cypherpunkZero) / [OpenSea 컬렉션](https://opensea.io/collection/cypherpunk-zero) |

## D

| 용어 | 정의 |
|------|-----------|
| DeFi | ZEC를 디파이와 통합하는 프로젝트: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | zaddr(거래정보 보호 주소)에서 taddr(투명 주소)로 거래가 전송되는 것을 말합니다. 거래의 출처는 보이지 않지만, 자금은 공개적으로 볼 수 있는 가치 풀에 들어갑니다. |
| Developer Resources | [개발자 자료](https://www.zcashcommunity.com/developers/) |
| Documentation | [공식 문서](https://zcash.readthedocs.io/en/latest/) |

## E

| 용어 | 정의 |
|------|-----------|
| ECC | Zcash 프로토콜을 출시한 팀인 Electric Coin Company을 가리킵니다. 이전에는 Zcash Company로 알려져 있었습니다. 이 팀의 엔지니어링 부서 전체는 Bootstrap 이사회와의 거버넌스 분쟁 이후 2026년 1월 사임했고, 이후 ZODL를 설립했습니다. |
| ECDSA | 타원곡선 디지털 서명 알고리즘은 암호학적으로 안전한 디지털 서명 방식입니다. ECDSA 서명 및 검증 알고리즘은 타원곡선 점 곱셈을 기반으로 합니다. |
| Education | Zcash을 설명하는 학습 중심 동영상입니다. [여기](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | 거래정보 보호 주소로 전송되는 거래에 추가되는 필드로, 결제 수신자가 볼 수 있습니다. 암호화된 메모는 송신자와 수신자만 볼 수 있습니다. |
| Equihash | Zcash에서 사용하는 메모리 중심 작업 증명 채굴 알고리즘입니다. |
| Events | Zcash 관련 행사는 [Luma](https://luma.com/zcash)와 [Zcash Foundation](https://zfnd.org/zf-events/)에서 확인할 수 있습니다. |
| Exchanges | [Zcash을 지원하는 거래소 목록](https://z.cash/exchanges/) |

## F

| 용어 | 정의 |
|------|-----------|
| Fiat-Shamir | 대화형 지식 증명을 바탕으로 디지털 서명을 만드는 기법입니다. 이 방법을 사용하면 기저 정보는 공개하지 않고도 어떤 사실(예: 비밀을 알고 있다는 사실)을 공개적으로 증명할 수 있습니다. |
| Formal Verification | 테스트에만 의존하지 않고 시스템이 명세대로 정확히 동작하는지 수학적으로 증명하는 것입니다. zkSecurity와 ZODL의 기여자들은 Lean 정리 증명기를 사용해 Ironwood 액션 회로를 이 방식으로 검증하여 완전성 오류가 없음을 입증했습니다. |
| Founders Reward | 창립자 보상은 전체 블록 보상의 20퍼센트를 차지합니다. 각 블록의 가치에서 차감되어 프로토콜 개발과 성장을 지원하도록 투명하게 분배됩니다. |
| Free2Z | Zcash 기반의 익명 콘텐츠 및 비공개 기부 도구입니다. [Free2Z](https://free2z.com) |
| FROST | 라운드 수를 최적화한 유연한 Schnorr 임계값 서명 방식입니다. [연구 논문](https://eprint.iacr.org/2020/852) |

## G

| 용어 | 정의 |
|------|-----------|
| Governance | ZIP 절차를 통해 내려진 결정은 Zcash 명세와 네트워크를 구동하는 소프트웨어에 반영됩니다. 네트워크 과반수가 업그레이드를 채택하고 합의를 깨뜨리지 않으면 변경 사항이 온체인에서 비준됩니다. [전체 프로토콜 기록](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| 용어 | 정의 |
|------|-----------|
| Halo | 트러스트 셋업 없이 회로를 업그레이드할 수 있게 하여 Zcash 거래정보 보호 프로토콜을 더욱 민첩하게 개선하고 확장할 수 있도록 합니다. [기술 설명](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | 계층형 결정적 지갑은 하나의 시드에서 일련의 키 쌍을 생성하여 편리하고 쉽게 관리할 수 있으며 높은 수준의 보안도 제공합니다. |
| Heartwood | Zcash의 4번째 주요 네트워크 업그레이드입니다. [자세히 보기](https://z.cash/upgrade/heartwood/) |

## I

| 용어 | 정의 |
|------|-----------|
| Index | CoinDesk의 ZCX 지수는 Zcash의 실시간 미국 달러 환산 현물 가격을 나타냅니다. [가격 지수](https://www.coindesk.com/indices/zcx/) |
| Integrations | 여러 제3자 제공업체를 통해 Zcash 결제를 받을 수 있습니다. [결제 지원 서비스](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 계산을 증명자와 검증자, 두 당사자 간 메시지 교환으로 모델링하는 추상 기계입니다. |
| Investment | Zcash에 투자하기를 원하는 기관 투자자나 패밀리 오피스는 다양한 금융 투자 상품을 이용할 수 있습니다. [전체 목록](https://z.cash/investors/) |
| Ironwood | 네트워크 업그레이드 NU6.3은 2026년 7월 28일 블록 높이 3,428,143부터 메인넷에서 운영 중입니다. Ironwood는 수정된 Orchard 회로를 기반으로 하는 새로운 거래정보 보호 구역을 추가하고 기존 Orchard 구역을 봉인하여, 누구나 유통량이 정직한지 확인할 수 있게 합니다. 합의 규칙은 [ZIP 258](https://zips.z.cash/zip-0258)에 명시되어 있습니다. [Ironwood](/zcash-tech/ironwood) |

## J

| 용어 | 정의 |
|------|-----------|
| JubJub | zk-SNARK 회로에서 효율적으로 구현할 수 있도록 설계된 타원곡선입니다. |

## K

| 용어 | 정의 |
|------|-----------|
| Keystone Wallet | 네트워크와 분리된 하드웨어 지갑으로, 기본 Zcash(Orchard 거래정보 보호) 기능을 지원하며 오프라인 서명을 위해 ZODL과 호환됩니다. [Keystone](https://keyst.one) |

## L

| 용어 | 정의 |
|------|-----------|
| Layer-1 | 기반 네트워크와 그에 딸린 인프라를 가리킵니다. 레이어 1 블록체인은 다른 네트워크 없이 거래를 검증하고 확정할 수 있습니다. Zcash는 L1 블록체인입니다. |
| librustzcash | Zcash 작업에 필요한 모든 크레이트와 의존성을 포함하는 Rust 워크스페이스입니다. [저장소](https://github.com/zcash/librustzcash) |
| lightwalletd | 블록체인 정보를 라이트 클라이언트에 제공하는 상태 비저장 서버입니다. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| 용어 | 정의 |
|------|-----------|
| Metrics | 네트워크 지표는 [여기](https://tokenterminal.com/explorer/projects/zcash/metrics/all)에서 확인할 수 있습니다. |
| Metadata | 사용자의 Zcash 거래와 함께 생성되는 데이터입니다. 블록 높이, 거래 버전 또는 만료 높이 등이 포함될 수 있습니다. |
| Mobile SDK | Android를 Zcash에 연결하는 경량 SDK로, 타사 Android 앱에서 거래정보 보호 거래를 주고받을 수 있게 합니다. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | 각 블록에 대해 Zcash 네트워크의 노드들이 자동 조정되는 난이도에 따라 복잡한 수학 연산을 수행해 해답을 찾으며 경쟁하는 과정입니다. [가이드](https://z.cash/mining-zcash/) |
| Multisignature | 자금을 사용하려면 여러 개의 개인 키 서명이 필요한 주소입니다. 현재 다중 서명 기능은 투명 주소에서만 지원됩니다. |

## N

| 용어 | 정의 |
|------|-----------|
| Network Sustainability Mechanism (NSM) | 프로토콜의 장기 보안 예산이 전적으로 발행량에 의존하지 않도록 거래 수수료의 일부를 소각하자는 Shielded Labs의 제안입니다. ZIP 234에 명시되어 있으며, 2026년 현재 검토 중입니다. |
| Nighthawk | Nighthawk Apps에서 만든 이전 Zcash 모바일 지갑입니다. Zcash 지갑은 더 이상 유지 관리되지 않으며, Nighthawk Wallet 3.0은 대신 DarkFi용으로 제작되었습니다. 기존 Nighthawk 시드에서 자금을 옮기려면 [자금 복구](/using-zcash/recovering-funds)를 참조하세요. |
| Noir Wallet | Zcash Community Grants이 지원하는 Zcash 브라우저 확장 지갑입니다. QR 코드와 수동 전송에 의존하지 않고 거래정보 보호 ZEC를 브라우저 애플리케이션에 직접 연결하도록 제작되었습니다. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcash의 6번째 주요 네트워크 업그레이드로, Orchard 거래정보 보호 구역과 통합 주소를 도입합니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash의 7번째 주요 네트워크 업그레이드로, Zcash Community Grants 프로그램과 이연 개발 기금 락박스를 지원하도록 블록 보조금을 조정합니다. 2024년 말에 활성화되었습니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood 이후의 네트워크 업그레이드로, 2026년 11월 6일(UTC) 블록 높이 3,543,405에서 메인넷에 활성화되었습니다. [ZIP 259](https://zips.z.cash/zip-0259)에 따라 25초 블록(ZIP 218), 수수료 재활용을 포함한 네트워크 지속 가능성 메커니즘(ZIP 235 및 237), 버전 4 거래의 종료를 도입합니다. 이로 인해 Sprout 자금은 사용할 수 없게 됩니다(ZIP 2003). 새로운 거래 형식은 추가되지 않으며, Tachyon와 Zcash Shielded Assets는 이 업그레이드에 포함되지 않습니다. |

## O

| 용어 | 정의 |
|------|-----------|
| Oblivious Synchronization | Project Tachyon에서 개발 중인 방법으로, 지갑이 어떤 노트를 찾는지 공개하지 않고 신뢰할 수 없는 서버에서 필요한 데이터를 요청할 수 있게 합니다. 프로토콜이 nullifier를 연결 불가능한 방식으로 변화시키므로 서버는 사용자의 nullifier를 알아낼 수 없습니다. [설명 자료](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | NU5에서 도입된 거래정보 보호 구역입니다. 완전성 오류가 발견된 후 Ironwood가 이 구역을 봉인했으므로, 이제 Orchard 안에서 자금을 보내거나 받을 수 없습니다. 자금은 턴스타일을 통해서만 빠져나갑니다. [거래정보 보호 구역](/using-zcash/shielded-pools) |
| Overwinter | Zcash의 첫 번째 네트워크 업그레이드입니다. [자세히 보기](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| 용어 | 정의 |
|------|-----------|
| Payments | 여러 결제 제공업체를 통해 일상적인 구매에 Zcash를 사용할 수 있습니다. [결제 앱](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | 데이터와 그 정확성에 대한 증명이 함께 전달되는 기본 요소로, 데이터를 결합하면 증명도 함께 결합됩니다. Project Tachyon는 PCD를 중심으로 거래정보 보호 프로토콜을 재구성하여, 각 지갑이 체인을 다시 검색하는 대신 자체 잔액이 올바르다는 재귀 증명을 보유하도록 합니다. Zcash 구현은 Halo을 따르며 트러스트 셋업이 필요하지 않은 [Ragu](https://github.com/tachyon-zcash/ragu)입니다. |
| Peer-to-Peer Network | P2P 네트워크는 탈중앙화 개념을 기반으로 합니다. 블록체인 기술의 기반 아키텍처입니다. |
| PIR (Private Information Retrieval) | 서버가 사용자가 어떤 기록을 요청했는지 알지 못하게 하면서 서버에서 기록을 가져오는 기법입니다. 라이트 지갑이 원하는 정보를 찾는다는 사실을 노출하지 않고 필요한 정보를 가져오는 방법으로 Zcash에서 활발히 연구되고 있습니다. |
| Podcast | [Radiolab(Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| 용어 | 정의 |
|------|-----------|
| QR Code | Zcash 주소를 쉽게 스캔할 수 있도록 인코딩하는 기계 판독 가능 코드입니다. 통합 주소(UA)는 최신 Zcash 지갑에서 일반적으로 QR 코드로 공유됩니다. |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005)에 명시된 Ironwood 노트의 속성으로, 미래의 양자 컴퓨터가 현재 이를 보호하는 암호화를 깨더라도 코인의 온체인 기록을 복구할 수 있게 합니다. 이는 양자 저항성이 아니라 복구 경로이며, Ironwood 노트에 적용되고 기존 Sprout, Sapling 또는 Orchard 자금에는 적용되지 않습니다. |

## R

| 용어 | 정의 |
|------|-----------|
| Recovery Phrase | 지갑을 백업하고 복원하는 데 사용하는 12개 또는 24개의 문자와 숫자로 이루어진 문자열입니다. Zcash에서는 이 문구로 spending key와 viewing key를 다시 생성하므로 자금 복구와 보안에 매우 중요합니다. |

## S

| 용어 | 정의 |
|------|-----------|
| Sapling | 거래정보 보호 거래의 효율성을 크게 개선하고 모바일 도입의 발판을 마련한 주요 네트워크 업그레이드입니다. 블록 419200에서 활성화되었습니다. |
| Selective Disclosure | 거래정보 보호 주소의 소유자는 다른 모든 사람에게는 데이터를 비공개로 유지하면서 제삼자와 viewing key 또는 결제 정보를 선택적으로 공유할 수 있습니다. |
| Shielded Address | zaddr이라고도 합니다. z로 시작합니다. zk-SNARKs를 사용해 발신자, 수신자, 금액 및 메모를 숨깁니다. |
| Shielded Labs | Zcash 프로토콜의 경제성과 합의를 연구하는 독립 조직입니다. 현재 Crosslink와 네트워크 지속 가능성 메커니즘을 주도합니다. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | 거래정보 보호 주소 간에만 이루어지는 거래입니다. 블록체인에서 완전히 비공개입니다. |
| Sol/s | 초당 해답 수를 뜻하며, Equihash 채굴 성능을 측정합니다. |
| Spending Key | 거래정보 보호 주소에서 자금을 사용할 수 있게 하는 비밀 키입니다. 잔액과 거래 내역도 볼 수 있습니다. |
| Sprout | Zcash의 최초 거래정보 보호 프로토콜 버전입니다(2016년 출시). |

## T

| 용어 | 정의 |
|------|-----------|
| Tachyon | Zcash의 scaling 프로그램입니다. NU7([ZIP 259](https://zips.z.cash/zip-0259))의 일부가 아니며 활성화 날짜도 없습니다. 지갑이 모든 블록을 스캔하는 방식에서 증명을 포함하는 지갑 상태, 비공개 동기화, 가지치기 가능한 노드 상태를 사용하는 방식으로 전환하도록 하여 초당 수천 건의 거래정보 보호 거래 처리량을 목표로 합니다. [프로젝트 사이트](https://tachyon.z.cash/overview/) |
| TAZ | 테스트넷 Zcash(가치가 없는 테스트용 통화)입니다. |
| Testnet | 메인넷에 업그레이드와 기능을 적용하기 전에 시험하는 별도의 블록체인입니다. |
| Trailing Finality Layer (TFL) | 채굴을 대체하지 않고도 최근 블록을 최종 확정할 수 있도록 Zcash의 작업 증명 체인 뒤에 최종성 레이어를 추가하는 연구입니다. Crosslink는 이 연구를 통해 나온 설계입니다. |
| Transaction | 사용자가 네트워크에 제출하고 최종적으로 블록에서 확인되는 결제입니다. |
| Transaction Expiry | 아직 채굴되지 않은 결제가 블록에 포함될 수 있는 블록 높이 제한입니다. 만료 높이가 0이 아닌 일반 결제는 블록 N 또는 그 이전 블록에서 채굴될 수 있지만, N+1에서는 채굴될 수 없습니다. 높이를 0으로 설정하면 만료가 비활성화됩니다. 이는 자동 환불 타이머가 아닙니다. [ZIP 203](https://zips.z.cash/zip-0203) |
| Transaction Fee | 기본 수수료는 0.0001 ZEC입니다. 수수료가 높으면 우선순위가 올라가며, 매우 낮으면 지연되거나 만료될 수 있습니다. |
| Transparent Address | taddr이라고도 합니다. t로 시작합니다. 완전히 공개되어 있습니다(Bitcoin과 같은 방식). |
| Transparent Transaction | 투명 주소 간에만 이루어지는 거래로, 모든 정보가 공개됩니다. |
| Turnstile | 각 거래정보 보호 구역에 들어오고 나가는 가치의 양을 추적하여, 어느 구역도 들어온 것보다 더 많은 가치를 내보내지 못하게 하는 회계 규칙입니다. Zcash의 역사에서 구역 간 이동이 있을 때마다 사용되었으며, 현재는 Orchard에서 Ironwood로의 이전을 보호합니다. [자세히 보기](/zcash-tech/the-turnstile) |

## U

| 용어 | 정의 |
|------|-----------|
| Unified Address | 하나의 문자열로 투명 결제와 거래정보 보호 결제 모두에 사용할 수 있는 최신 주소 형식입니다(NU5에서 도입). |
| Upgrade Activation | 네트워크 업그레이드(예: NU5, NU6)가 자동으로 활성화되는 특정 블록 높이입니다. |

## V

| 용어 | 정의 |
|------|-----------|
| Viewing Key | 자금을 사용할 수는 없지만 거래정보 보호 주소의 잔액과 거래 내역을 볼 수 있게 하는 비밀 키입니다. |

## W

| 용어 | 정의 |
|------|-----------|
| Wallet | 비밀 키를 보관하고 ZEC을 보내고 받을 수 있게 하는 소프트웨어 또는 하드웨어입니다. 현재 사용 가능한 지갑으로는 ZODL(iOS/Android), Zingo!(모바일/데스크톱), Zkool(모바일/데스크톱), Zallet(풀 노드 지갑, 베타 버전), Keystone(하드웨어 지갑)이 있습니다. 전체 목록은 [Zcash 생태계 지갑](https://z.cash/ecosystem/?wallets=#tag-wallets)을 참조하세요. |
| WebZjs | 브라우저 환경을 위해 ChainSafe가 만든 Zcash용 최초의 JavaScript SDK입니다. 거래정보 보호 ZEC를 MetaMask에 제공한 Zcash Shielded Wallet snap의 기반이 되었습니다. |

## X

| 용어 | 정의 |
|------|-----------|
| XZC | 일부 기존 거래소에서 Zcash에 사용했던 과거 티커 기호입니다. 공식 티커는 ZEC입니다. |

## Y

| 용어 | 정의 |
|------|-----------|
| YWallet | Orchard, Sapling 및 투명 주소를 지원하며 빠른 동기화로 알려진 프라이버시 중심 Zcash 지갑입니다. 더 이상 유지 관리되지 않습니다. 개발자가 Ironwood용으로 업데이트되지 않을 것이라고 확인했으므로 이제 네트워크를 따라갈 수 없습니다. 같은 개발자가 만든 Zkool은 현재 유지 관리되는 후속 지갑입니다. |

## Z

| 용어 | 정의 |
|------|-----------|
| Zcash | zk-SNARKs을 사용하는 프라이버시 중심 암호화폐입니다. 투명한(비트코인 방식) 결제와 완전히 거래정보가 보호되는 결제를 연결합니다. |
| Zcash Foundation | Zcash 생태계를 지원하고, 개발에 자금을 지원하며, 프라이버시를 증진하는 독립 비영리 단체입니다. |
| Zcash Network | 거래를 검증하고 블록체인을 유지하는 노드의 피어 투 피어 네트워크입니다. |
| ZEC | Zcash의 공식 통화 코드입니다(일부 거래소에는 여전히 XZC로 표시됩니다). |
| Z3 stack | 함께 zcashd을 대체하는 3가지 프로그램입니다. 노드용 Zebra, 색인용 Zaino, 지갑용 Zallet입니다. [Z3 스택](/zcash-tech/z3-stack) |
| Zerocash | Zcash의 기반이 된 학술 프로토콜(2014년)입니다. |
| Zaino | Rust로 Zingo Labs이 작성한 색인기로, Zebra 노드에서 지갑 데이터를 제공합니다. 라이트 지갑을 위해 zcashd이 담당하던 색인 작업을 대신합니다. [Zaino](/zcash-tech/zaino) |
| Zakura | 확장성을 위해 구축된 별도의 Zcash 풀 노드로, Sean Bowe와 Dev Ojha가 이끌고 있습니다. 더 빠르게 동기화하고 블록을 기본적으로 가지치기하며, 여전히 이에 의존하는 소프트웨어를 위해 자체적으로 zcashd을 실행할 수 있습니다. [Zakura 노드](/zcash-tech/zakura-node) |
| Zallet | zcashd 지갑을 대체하는 지갑입니다. 처음부터 다시 시작하는 대신 기존 `wallet.dat`을 옮기세요. [Zallet](/zcash-tech/zallet) 및 [Zallet 빠른 참조](/using-zcash/zallet-quick-reference-guide) |
| Zebra | zcashd을 대체하는 풀 노드이며, Zcash Foundation에서 유지 관리합니다. 검증 노드가 필요한 경우 실행하세요. [Zebra 풀 노드](/zcash-tech/zebra-full-node) |
| zcashd | 원래의 Zcash 풀 노드이자 지갑으로, 현재는 퇴역했습니다. 버전 6.20.0은 2026년 7월 18일 블록 3417100에서 자체 종료되었으며 NU6.3을 지원한 적이 없습니다. 대신 Z3 스택 또는 Zakura을 실행하세요. [마이그레이션 안내](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash 개선 제안으로, 프로토콜 변경을 제안하고 비준하는 데 사용되는 커뮤니티 거버넌스 절차입니다. [ZIP 저장소](https://github.com/zcash/zips) |
| ZODL | Zcash 오픈 개발 연구소입니다. 거버넌스 분쟁으로 Bootstrap와 갈등을 빚고 사임한 전 Electric Coin Company 엔지니어링 팀과 Josh Swihart이 2026년 초에 설립한 독립 조직입니다. 2026년 3월 시드 투자로 2,500만 달러 이상을 유치했으며, 2026년 2월 Zashi에서 이름을 바꾼 ZODL 지갑을 유지 관리합니다. [zodl.com](https://zodl.com) |
| zk-SNARKs | 영지식 간결 비대화형 지식 논증으로, Zcash 거래정보 보호 거래를 가능하게 하는 암호 기술입니다. 비밀 정보를 공개하지 않고도 명제(예: 유효한 지출)를 증명할 수 있습니다. |
| ZSA (Zcash Shielded Assets) | 사용자가 발행하는 토큰으로, Zcash의 거래정보 보호 프라이버시를 이어받아 ZEC 외의 자산도 네트워크에서 비공개로 이동할 수 있게 합니다. [ZIP 226](https://zips.z.cash/zip-0226)에 명시되어 있습니다. NU7([ZIP 259](https://zips.z.cash/zip-0259))의 일부가 아니며 활성화 날짜도 정해져 있지 않습니다. |

---

**최종 업데이트:** 2026년 10월
**기여하고 싶으신가요?** [GitHub에서 이 페이지 편집](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
