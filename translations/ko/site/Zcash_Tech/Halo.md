<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 수정"/>
</a>

# Halo

## 한눈에 보기

Halo는 Electric Coin Co의 Sean Bowe가 발견한 신뢰 설정이 필요 없는 재귀적 영지식 증명(ZKP) 시스템입니다. 신뢰할 수 있는 설정을 없애고 재귀적 증명 구성을 실용화했으며, 이는 Zcash의 현재 scaling 및 보안 로드맵의 기반입니다.

- **무엇인가요:** 효율적인 재귀를 지원하며 신뢰 설정 절차가 필요 없는 zk-SNARK 구성입니다.
- **왜 중요한가요:** 2022년 NU5과 함께 활성화된 Zcash의 Orchard 거래정보 보호 구역은 이 연구의 실제 구현인 Halo 2를 기반으로 작동합니다.
- **핵심 속성:** 설정 절차에서 발생하는 “유해한 비밀 정보”가 없으며, 사실상 무제한의 다른 증명을 증명할 수 있습니다.
- **라이선스:** Halo 2는 [MIT 및 Apache 2.0](https://github.com/zcash/halo2#readme)에 따라 공개 소스로 제공되므로 생태계의 누구나 이를 기반으로 개발할 수 있습니다.

---

## 핵심 설명

Halo는 Electric Coin Co의 Sean Bowe가 발견한 신뢰 설정이 필요 없는 재귀적 영지식 증명 시스템입니다. 신뢰할 수 있는 설정을 없애고 Zcash 블록체인의 확장성을 높입니다. Halo는 효율성과 재귀성을 모두 갖춘 최초의 영지식 증명 시스템으로, 과학적 돌파구로 널리 인정받고 있습니다.

![halo](/content-images/_unavailable.svg "halo")

### 두 가지 구성 요소

- **간결 다항식 커밋먼트 체계.** 커밋하는 사람이 다항식에 짧은 문자열로 커밋할 수 있게 합니다. 검증자는 이 문자열을 사용해 커밋된 다항식의 주장된 평가값을 확인할 수 있습니다.
- **다항식 대화형 오라클 증명.** 검증자는 증명자(알고리즘)에게 다항식 커밋먼트 체계를 사용해 자신이 선택한 지점에서 모든 커밋먼트를 열도록 요청하고, 각 커밋먼트 사이에서 항등식이 성립하는지 확인합니다.

### 신뢰 설정 불필요

Groth16과 같은 일부 zk-SNARK 구성은 공개 매개변수(공통 참조 문자열, CRS라고도 함)를 생성하기 위해 신뢰 설정이 필요합니다. CRS는 증명자와 검증자가 공유하는 값이며, 파기해야 하는 비밀 정보가 아닙니다. 이러한 설정에서 생성된 비밀 중간 자료(“유해한 비밀 정보”)는 폐기해야 합니다. 다자간 안전 계산으로 신뢰를 분산할 수 있습니다. 참여자 중 적어도 한 명이 프로토콜을 따르고 자신의 비밀 기여분을 파기하면 설정 절차는 안전합니다. 공개 매개변수와 유해한 비밀 정보에 대한 ECC의 [설명](https://zodl.com/snark-parameters/)을 참조하세요.

Zcash의 초기 Sprout 및 Sapling 거래정보 보호 구역은 트러스트 셋업(trusted setup)을 사용하는 증명 시스템을 사용했습니다. 각각 BCTV14와 Groth16입니다. 공개 매개변수는 증명(proof)과 검증에 계속 사용할 수 있습니다. 우려되는 점은 비밀 셋업 자료가 보존되었는지 여부이며, 보존되었다면 거짓 증명을 만들 수 있습니다. CRS 자체를 공개하는 것은 예상된 일이며 해당 비밀 자료를 드러내지 않습니다.

Halo는 재귀적 증명 구성과 내적 논증 기반 다항식 커밋먼트 체계를 결합합니다. 공개 매개변수에는 신뢰 설정 절차나 비밀 설정용 백도어의 파기가 필요하지 않습니다. [Halo 2 책에는 이러한 공개 그룹 매개변수가 설명되어 있습니다](https://zcash.github.io/halo2/background/pc-ipa.html#setup). 이는 설정 절차에서 생성된 구조화 참조 문자열을 업그레이드 가능하게 만드는 것과는 다릅니다.

이 설정 요건을 없애면 Halo 증명을 위해 비밀 설정 절차 자료를 파기하는 데 의존하지 않아도 됩니다. 그렇다고 과거의 Sprout 또는 Sapling 설정 절차가 손상되지 않았음을 증명하거나, 이후의 모든 프로토콜 변경이 안전하다고 보증하는 것은 아닙니다. 재귀적 증명은 증명 시스템의 가정 아래 회로에 인코딩된 계산을 증명합니다. 올바른 회로와 구현도 여전히 중요합니다. ECC의 [Halo 2 배포 설명](https://zodl.com/technical-explainer-halo-on-zcash/)은 새로운 버그나 설계 결함이 생길 위험을 명시적으로 언급합니다.

[Sean Bowe의 Dystopia Labs 설명](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## 시각 자료 / 비유

### 공증인 체인

일반적인 zk-SNARK을 공증된 문서라고 생각해 보세요. 도장 하나, 확인 한 번이면 끝입니다. 이제 문서 10,000장으로 이루어진 묶음이 진본임을 증명해야 한다고 가정해 보세요. 재귀성이 없다면 검증자는 모든 도장을 확인해야 합니다.

Halo은 검증된 각 문서를 다음 문서의 도장으로 바꾸어, 문서 묶음 전체를 도장 하나가 찍힌 문서 한 장으로 압축합니다. 마지막 문서만 확인하면 체인 전체를 신뢰할 수 있습니다. 중요한 점은 Halo의 공증인(증명 시스템)이 인장을 설정해 줄 외부 기관 없이 스스로 도장을 만들어 낸다는 것입니다.

### 신뢰 설정 제거가 중요한 이유

과거의 신뢰 설정 시스템에서는 공개 “인장”(CRS)이 설정 절차를 통해 만들어졌습니다. 참여자는 비밀 중간 자료를 파기하는 동시에 공개 매개변수를 사용할 수 있도록 보관해야 했습니다. Halo은 이러한 절차와 비밀 설정용 백도어를 없앱니다. 그렇다고 사용자의 spending key를 보호하거나 증명 시스템의 가정과 구현을 확인할 필요가 없어지는 것은 아닙니다.

---

## 자세히 살펴보기

### 재귀적 증명

재귀적 증명 구성은 단일 증명으로 사실상 무제한의 다른 증명이 올바름을 증명할 수 있게 하여, 많은 계산(과 정보)을 압축합니다. 이는 확장성의 핵심 요소입니다. 참여자 집단이 네트워크 나머지 부분의 무결성을 계속 신뢰하면서도 네트워크가 수평적으로 확장될 수 있기 때문입니다.

Halo 이전에는 재귀적 증명 구성을 구현하려면 막대한 계산 비용과 신뢰 설정이 필요했습니다. 주요 발견 중 하나는 **중첩 상각**이라는 기법이었습니다. 내적 논증 기반 다항식 커밋먼트 체계를 이용해 재귀적으로 구성함으로써 신뢰 설정을 피하면서 성능을 크게 개선합니다.

[Halo 논문](https://eprint.iacr.org/2019/1021.pdf)은 이 다항식 커밋먼트 체계를 자세히 설명하며, 그 안에 새로운 집계 기법이 있음을 발견했습니다. 이 기법을 사용하면 독립적으로 생성한 많은 증명을 단일 증명을 검증하는 것과 거의 같은 시간에 검증할 수 있습니다. 이것만으로도 이미 Zcash에서 사용된 기존 zk-SNARKs보다 나은 대안이었습니다.

### Halo 2

Halo 2는 Rust으로 작성된 고성능 zk-SNARK 구현으로, 신뢰 설정의 필요성을 없애고 Zcash의 확장성을 위한 기반을 마련합니다.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

여기에는 **누적 체계**라는 접근 방식의 일반화가 포함됩니다. 이 형식화는 중첩 상각이 실제로 작동하는 방식을 보여 줍니다. 각 증명이 누적기의 이전 상태에 대해 추론하는 방식으로 증명을 **누적기**라는 객체에 추가하면, 누적기의 현재 상태만 확인해도 귀납적으로 이전 증명을 모두 검증할 수 있습니다.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

한편, 다른 여러 팀은 Halo 1에서 사용된 Sonic보다 효율적인 다항식 IOP를 발견하고 있었습니다. 그중에는 Marlin도 있습니다. 이러한 프로토콜 중 가장 효율적인 것은 PLONK입니다. 애플리케이션별 요구에 맞춰 효율적인 구현을 설계할 수 있는 폭넓은 유연성을 제공하며, 증명자 실행 시간은 Sonic보다 5배 빠릅니다.

[PLONK 개요](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### 더 넓은 생태계에서의 Halo

Electric Coin Company는 Protocol Labs, Filecoin Foundation 및 Ethereum Foundation과 각각의 네트워크에서 이 기술을 활용하는 방법을 포함해 Halo 연구개발을 살펴보기로 합의했습니다. 이 합의는 생태계 전반과 Web 3.0에서 확장성, 상호운용성 및 프라이버시를 개선하는 것을 목표로 합니다.

또한 Halo 2는 [MIT 및 Apache 2.0 오픈 소스 라이선스](https://github.com/zcash/halo2#readme)에 따라 제공되므로 생태계의 누구나 이 증명 시스템을 활용해 개발할 수 있습니다.

**Filecoin.** 배포 이후 halo2 라이브러리는 zkEVM과 같은 프로젝트에 채택되었으며, Filecoin 가상 머신용 증명 시스템에 Halo 2를 통합할 가능성도 있습니다. Filecoin에는 시공간 증명과 복제 증명을 위한 비용이 많이 드는 증명이 다수 필요합니다. Halo 2는 저장 공간 사용량을 압축하고 네트워크를 더 잘 확장하는 데 핵심적인 역할을 합니다. [Filecoin Foundation의 Zooko 인터뷰 영상](https://www.youtube.com/watch?v=t4XOdagc9xw). Filecoin의 저장 공간 결제를 ZEC으로 할 수 있다면 두 생태계 모두에 도움이 됩니다. 이를 통해 저장 공간 구매 시에도 Zcash 거래정보 보호 전송에서 제공되는 것과 같은 프라이버시를 누릴 수 있습니다. 여기에는 Filecoin 저장 공간에 파일을 암호화해 보관하고, 미디어를 Zcash 암호화된 메모에 첨부하는 모바일 클라이언트를 지원하는 것도 포함됩니다. [ECC × Filecoin 블로그 게시물](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** 효율적인 검증 가능한 지연 함수(VDF)를 위한 Halo 2 증명이 개발되고 있습니다. VDF는 스마트 컨트랙트에서 범용 난수를 생성하거나 지분 증명 방식에서 리더를 선출하는 등 여러 사용 사례가 있는 암호학적 기본 요소입니다. ECC, Filecoin Foundation, Protocol Labs 및 Ethereum Foundation은 하드웨어 가속 암호화를 전문으로 하는 업체인 [SupraNational](https://www.supranational.net/)와 VDF의 GPU 및 ASIC 개발 가능성을 함께 연구하고 있습니다. [프라이버시 및 scaling 연구 그룹](https://appliedzkp.org/)은 Halo 2 증명을 활용해 Ethereum의 프라이버시와 확장성을 개선하는 추가 방안을 연구하고 있습니다.

### Halo를 사용하는 다른 프로젝트

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — 프라이버시를 보호하는 멀티체인 아토믹 스왑 프로토콜
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — Cardano의 L2 zkRollup
- [DarkFi](https://dark.fi/book/arch/arch.html) — 프라이빗 L1 zkEVM 블록체인
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — Ethereum의 L2 zkRollup

---

## 실질적인 영향

**Zcash 자체에 미치는 영향**

- NU5과 함께 활성화된 Orchard 거래정보 보호 구역은 Zcash 네트워크에서 이 새로운 증명 시스템을 구현한 것입니다. Sprout과 Sapling 사이에 사용된 것과 동일한 턴스타일 설계로 보호되며, 기존 거래정보 보호 구역을 점진적으로 폐지하는 것을 목표로 합니다.
- NU5(2022년 중반) 이후 재귀적 증명을 통합할 수 있게 되었고, 여러 프라이버시 개선 사항도 함께 도입되었습니다. 가장 주목할 만한 것은 입력과 출력을 대체하는 ‘Actions’의 도입으로, 거래 메타데이터의 양을 줄였습니다.
- 신뢰 설정을 제거하면 주요 프로토콜 업그레이드마다 반복해야 했던 시스템 차원의 위험을 없앨 수 있습니다.

**보유자 및 운영자에게 미치는 영향**

- 재귀적 증명 구성은 무제한의 계산을 압축하고, 감사 가능한 분산 시스템을 만들며, 풀 노드 운영자를 위한 Layer 1 처리 용량을 개선할 가능성이 있습니다. 이는 Zcash Shielded Assets 및 Zcash의 장기 설계와 같은 확장 기능과 관련이 있습니다.

---

## 흔히 하는 오해

| 흔한 생각 | 실제 상황 |
| --- | --- |
| “Halo는 Zcash가 기다리고 있는 미래 업그레이드다.” | 2022년 NU5부터 메인넷에서 운영 중인 Orchard은 이미 Halo 2를 사용합니다. |
| “신뢰 설정이 필요 없으면 매개변수도 전혀 필요 없다.” | Halo도 여전히 공개 매개변수를 사용합니다. 비밀 설정 자료를 파기하도록 참여자를 신뢰해야 하는 설정 절차는 필요하지 않습니다. |
| “Halo 2와 Halo 논문은 같은 것이다.” | [논문](https://eprint.iacr.org/2019/1021.pdf)은 다항식 커밋먼트 체계와 중첩 상각을 설명합니다. Halo 2는 누적 체계와 PLONK 계열 산술화를 사용하는 실제 Rust 구현입니다. |
| “재귀성은 블록 검증을 scaling하는 데만 도움이 된다.” | 재귀성은 애플리케이션 수준의 계산도 압축합니다. Ethereum을 위한 Filecoin의 시공간 및 복제 증명과 VDF 연구를 참조하세요. |

---

## 관련 페이지

- [zk-SNARKs](/zcash-tech/zk-snarks) — Halo가 속한 일반 기술 분야
- [Halo (연구 논문)](https://eprint.iacr.org/2019/1021.pdf) — 최초 발표 자료
- [Ironwood](/zcash-tech/ironwood) 및 [턴스타일](/zcash-tech/the-turnstile) — 거래정보 보호 구역이 이전되는 과정과 기존 구역의 폐지 방법
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — 재귀적 증명의 이점을 활용하는 확장 기능
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) — 온체인에서 증명을 검증하는 노드 구현

## 더 알아보기

- [ZKP와 Halo 2 소개 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2와 Daira 및 Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [기술 설명 블로그](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 커뮤니티 쇼케이스 — Zcon3의 Ying Tong](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**문서**

- [Halo 2 자료](https://github.com/mhchia/awesome-halo2)
- [Halo 2 문서](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
