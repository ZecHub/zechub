<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## 요약

Halo는 Sean Bowe가 Electric Coin Co에서 발견한 신뢰 불필요 재귀 영지식 증명(ZKP) 시스템입니다. 신뢰할 수 있는 설정의 필요성을 없애고 재귀적 증명 합성을 실용적으로 만들어, Zcash의 현재 확장성 및 보안 로드맵의 토대가 됩니다.

- **무엇인가:** 효율적인 재귀와 신뢰할 수 있는 설정 의식이 필요 없는 zk-SNARK 구조입니다.
- **중요한 이유:** 2022년에 NU5와 함께 활성화된 Zcash의 Orchard 실드 풀은 이 연구의 프로덕션 구현체인 Halo 2에서 실행됩니다.
- **핵심 속성:** 설정 의식에서 발생하는 "독성 폐기물"이 없으며, 사실상 무제한의 다른 증명을 증명할 수 있는 증명입니다.
- **라이선스:** Halo 2는 [MIT 및 Apache 2.0](https://github.com/zcash/halo2#readme)에 따라 오픈 소스로 제공되므로 생태계의 누구나 이를 기반으로 구축할 수 있습니다.

---

## 핵심 설명

Halo는 Sean Bowe가 Electric Coin Co에서 발견한 신뢰 불필요 재귀 영지식 증명 시스템입니다. 신뢰할 수 있는 설정을 없애고 Zcash 블록체인의 확장성을 높입니다. Halo는 효율적이면서 재귀적인 최초의 영지식 증명 시스템으로, 과학적 돌파구로 널리 평가받습니다.

![halo](/content-images/_unavailable.svg "halo")

### 두 가지 구성 요소

- **간결한 다항식 커밋먼트 방식.** 커밋터가 검증자가 커밋된 다항식의 주장된 평가값을 확인하는 데 사용할 수 있는 짧은 문자열로 다항식에 커밋할 수 있게 합니다.
- **다항식 대화형 오라클 증명.** 검증자가 다항식 커밋먼트 방식을 사용하여 증명자(알고리즘)에게 자신이 선택한 지점에서 모든 커밋먼트를 열도록 요청하고, 그들 사이의 등식이 성립하는지 확인합니다.

### 신뢰할 수 있는 설정 없음

zk-SNARKs는 증명과 검증을 위한 공개 매개변수로 공통 참조 문자열(CRS)에 의존합니다. 이 CRS는 신뢰할 수 있는 당사자가 사전에 생성해야 합니다. 최근까지 Aztec 네트워크와 Zcash에서 수행한 것과 같은 정교한 보안 다자간 계산(MPC)이 이 [신뢰할 수 있는 설정 의식](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) 중 발생하는 위험을 완화하는 데 필요했습니다.

Zcash의 이전 Sprout 및 Sapling 실드 풀은 BCTV14 및 Groth16 zk-증명 시스템을 사용했습니다. 이들은 안전했지만 한계가 있었습니다. 단일 애플리케이션에 묶여 있어 확장성이 없었고, "독성 폐기물"(제네시스 의식 중 생성된 암호학적 자료의 잔재)이 남을 수 있었으며, 의식이 허용 가능한지 판단하는 데에는 아주 미미하더라도 신뢰 요소가 있었습니다.

Halo는 타원 곡선 주기에 걸쳐 어려운 문제의 여러 인스턴스를 반복적으로 함께 축소하여 신뢰할 수 있는 설정을 제거합니다. 이를 통해 계산 증명이 자신에 대해 효율적으로 추론할 수 있습니다(중첩 상각). 부수 효과로 구조화된 참조 문자열(의식의 결과물)이 업그레이드 가능해져 스마트 계약과 같은 애플리케이션을 지원합니다.

Halo는 대규모 영지식 증명 시스템의 보안에 관해 사용자에게 두 가지 중요한 보장을 제공합니다. 첫째, 제네시스 의식에 관여한 누구도 사기 거래를 실행할 비밀 백도어를 만들지 않았음을 사용자가 증명할 수 있게 합니다. 둘째, 업데이트와 변경을 거쳤더라도 시간이 지나면서 시스템이 안전하게 유지되었음을 사용자가 입증할 수 있게 합니다.

[Sean Bowe의 Dystopia Labs 설명 자료](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## 시각적 설명 / 비유

### 공증인 사슬

일반적인 zk-SNARK를 공증된 문서라고 생각해 보세요. 도장 하나, 검증 하나면 끝입니다. 이제 문서 1만 장이 진본임을 증명해야 한다고 상상해 보세요. 재귀가 없다면 검증자는 모든 도장을 확인해야 합니다.

Halo는 검증된 각 문서를 *다음* 문서의 도장으로 바꾸어, 전체 묶음이 도장 하나가 찍힌 문서 하나로 축소될 때까지 이어 갑니다. 마지막 문서만 확인하면 전체 사슬을 신뢰할 수 있습니다. 그리고 결정적으로 Halo의 공증인(증명 시스템)은 외부 기관이 봉인을 설정할 필요 없이 자체 도장을 만듭니다.

### 신뢰할 수 있는 설정을 제거하는 것이 중요한 이유

이전 시스템에서 "봉인"(CRS)은 의식에서 나왔습니다. 참여자들은 중간 자료를 폐기해야 했고, 모두가 그들이 그렇게 했다고 믿어야 했습니다. Halo의 봉인은 수학만으로 생성됩니다. 폐기할 것도, 유출될 것도, 신뢰할 의식도 없습니다.

---

## 심층 분석

### 재귀 증명

재귀 증명 합성을 통해 단일 증명이 사실상 무제한의 다른 증명의 정확성을 증명할 수 있으며, 대량의 계산과 정보를 압축합니다. 이는 네트워크가 수평적으로 확장되는 동안에도 일부 참여자가 네트워크 나머지 부분의 무결성을 신뢰할 수 있게 하므로 확장성의 필수 구성 요소입니다.

Halo 이전에는 재귀 증명 합성을 달성하려면 막대한 계산 비용과 신뢰할 수 있는 설정이 필요했습니다. 주요 발견 중 하나는 **중첩 상각**이라는 기법이었습니다. 이는 내적 인수에 기반한 다항식 커밋먼트 방식을 사용하는 재귀적 합성으로, 신뢰할 수 있는 설정을 피하면서 성능을 크게 향상합니다.

[Halo 논문](https://eprint.iacr.org/2019/1021.pdf)은 이 다항식 커밋먼트 방식을 완전히 설명하며, 그 안에 새로운 집계 기법이 존재한다는 사실을 발견했습니다. 이 기법은 독립적으로 생성된 많은 증명을 단일 증명을 검증하는 것과 거의 같은 속도로 검증할 수 있게 합니다. 이 자체만으로도 Zcash에서 사용된 이전 zk-SNARKs보다 나은 대안을 제시했습니다.

### Halo 2

Halo 2는 Rust로 작성된 고성능 zk-SNARK 구현체로, 신뢰할 수 있는 설정의 필요성을 없애면서 Zcash의 확장성을 위한 기반을 마련합니다.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

여기에는 **누적 방식**이라 불리는 접근법의 일반화가 포함됩니다. 이 형식화는 중첩 상각이 실제로 어떻게 작동하는지를 보여 줍니다. 즉, 각 증명이 누적기의 이전 상태에 대해 추론하는 **누적기**라는 객체에 증명을 추가함으로써, 현재 누적기 상태만 확인해도 모든 이전 증명을 (귀납적으로) 확인할 수 있습니다.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

동시에 다른 많은 팀은 Marlin과 같이 Sonic(Halo 1에 사용됨)보다 효율적인 Polynomial IOP를 발견하고 있었습니다. 이 프로토콜들 중 가장 효율적인 것은 PLONK이며, 애플리케이션별 요구 사항에 따라 효율적인 구현을 설계할 수 있는 막대한 유연성을 제공하고 Sonic보다 5배 더 나은 증명자 시간을 제공합니다.

[PLONK 개요](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### 더 넓은 생태계의 Halo

Electric Coin Company는 Protocol Labs, Filecoin Foundation 및 Ethereum Foundation과 Halo 연구개발을 탐구하기 위한 협약을 체결했습니다. 여기에는 해당 기술이 각자의 네트워크에서 어떻게 사용될 수 있는지에 대한 연구도 포함됩니다. 이 협약은 생태계 전반과 Web 3.0에서 더 나은 확장성, 상호운용성 및 프라이버시를 제공하는 것을 목표로 합니다.

또한 Halo 2는 [MIT 및 Apache 2.0 오픈 소스 라이선스](https://github.com/zcash/halo2#readme)에 따라 제공되므로 생태계의 누구나 이 증명 시스템으로 구축할 수 있습니다.

**Filecoin.** 배포 이후 halo2 라이브러리는 zkEVM과 같은 프로젝트에 채택되었으며, Halo 2가 Filecoin Virtual Machine의 증명 시스템에 통합될 가능성이 있습니다. Filecoin에는 비용이 큰 다수의 시공간 증명과 복제 증명이 필요하며, Halo 2는 공간 사용량을 압축하고 네트워크를 더 잘 확장하는 데 핵심적입니다. [Filecoin Foundation의 Zooko 인터뷰 영상](https://www.youtube.com/watch?v=t4XOdagc9xw). 또한 Filecoin 스토리지 결제를 ZEC로 할 수 있다면 두 생태계 모두에 이익이 될 것입니다. 이는 Zcash 실드 전송에 존재하는 것과 동일한 프라이버시를 스토리지 구매에 제공하며, Filecoin 스토리지 내 파일 암호화와 Zcash 암호화 메모에 미디어를 첨부하는 모바일 클라이언트 지원도 포함합니다. [ECC × Filecoin 블로그 게시물](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** 효율적인 검증 가능 지연 함수(VDF)를 위한 Halo 2 증명이 개발되고 있습니다. VDF는 스마트 계약을 위한 범용 난수와 Proof of Stake의 리더 선출을 포함해 많은 잠재적 사용 사례가 있는 암호학적 기본 요소입니다. ECC, Filecoin Foundation, Protocol Labs 및 Ethereum Foundation은 GPU 및 ASIC 기반 VDF 개발 가능성을 위해 하드웨어 가속 암호화 전문 공급업체인 [SupraNational](https://www.supranational.net/)와도 협력하고 있습니다. [Privacy and Scaling Explorations 그룹](https://appliedzkp.org/)은 Halo 2 증명이 Ethereum의 프라이버시와 확장성을 개선할 수 있는 추가 방법을 연구하고 있습니다.

### Halo를 사용하는 다른 프로젝트

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — 프라이버시를 보존하는 멀티체인 원자적 스왑 프로토콜
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — Cardano 기반 L2 zkRollup
- [Darkfi](https://dark.fi/book/arch/arch.html) — 프라이빗 L1 zkEVM 블록체인
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — Ethereum 기반 L2 zkRollup

---

## 실질적 영향

**Zcash 자체에 대해**

- NU5와 함께 활성화된 Orchard 실드 풀은 Zcash 네트워크에서 이 새로운 증명 시스템을 구현한 것입니다. 이는 Sprout와 Sapling 사이에 사용된 것과 동일한 턴스타일 설계로 보호되며, 이전 실드 풀을 점진적으로 폐기하려는 목적을 가집니다.
- NU5(2022년 중반) 이후 재귀 증명의 통합이 가능해졌고, 여러 프라이버시 개선도 함께 이루어졌습니다. 특히 입력/출력을 대체하는 'Actions'의 도입으로 거래 메타데이터 양이 줄었습니다.
- 신뢰할 수 있는 설정을 제거하면 주요 프로토콜 업그레이드마다 반복해야 했을 시스템적 위험이 사라집니다.

**보유자 및 운영자에 대해**

- 재귀 증명 합성은 무제한의 계산을 압축하고, 감사 가능한 분산 시스템을 만들며, 완전 노드 운영자를 위한 Layer 1 용량을 개선할 잠재력이 있습니다. 이는 Zcash Shielded Assets 및 Zcash의 장기적 설계와 같은 확장 기능에도 관련됩니다.

---

## 흔한 오해

| 일반적인 믿음 | 실제 상황 |
| --- | --- |
| "Halo는 Zcash가 기다리고 있는 미래 업그레이드다." | NU5(2022)부터 메인넷에서 실행 중인 Orchard는 이미 Halo 2에서 작동합니다. |
| "신뢰할 수 있는 설정이 없다는 것은 매개변수가 전혀 없다는 뜻이다." | Halo는 여전히 구조화된 매개변수를 사용합니다. 차이는 독성 폐기물이 없고 참여자가 신뢰해야 하는 의식 없이 생성 및 업그레이드할 수 있다는 점입니다. |
| "Halo 2와 Halo 논문은 같은 것이다." | [논문](https://eprint.iacr.org/2019/1021.pdf)은 다항식 커밋먼트 방식과 중첩 상각을 설명하며, Halo 2는 누적 방식과 PLONKish 산술화를 갖춘 프로덕션 Rust 구현체입니다. |
| "재귀는 블록 검증 확장에만 도움이 된다." | 재귀는 애플리케이션 수준의 계산도 압축합니다. Filecoin의 시공간/복제 증명과 Ethereum의 VDF 작업을 참조하세요. |

---

## 관련 페이지

- [zk-SNARKs](/zcash-tech/zk-snarks) — Halo가 속하는 일반 기술 범주
- [Halo (연구 논문)](https://eprint.iacr.org/2019/1021.pdf) — 원래 출판물
- [Ironwood](/zcash-tech/ironwood) 및 [The Turnstile](/zcash-tech/the-turnstile) — 이전 실드 풀이 폐기되는 동안 실드 풀이 마이그레이션되는 방식
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — 재귀 증명의 혜택을 받는 확장 기능
- [Zebra Full Node](/zcash-tech/zebra-full-node) — 체인에서 증명을 검증하는 노드 구현체

## 추가 학습

- [ZKP와 Halo 2 소개 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2와 Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [기술 설명 블로그](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 커뮤니티 쇼케이스 — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**문서**

- [Halo 2 리소스](https://github.com/mhchia/awesome-halo2)
- [Halo 2 문서](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
