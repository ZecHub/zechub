<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Halo


## Halo란 무엇인가요?

Halo는 Electric Coin Co.의 Sean Bowe가 발견한 신뢰 불필요형 재귀 영지식 증명(ZKP)입니다. 이는 신뢰 설정을 제거하고 Zcash 블록체인의 더 큰 확장성을 가능하게 합니다. Halo는 효율적이면서도 재귀적인 최초의 영지식 증명 시스템으로, 과학적 돌파구로 널리 평가받습니다.

![halo](/content-images/_unavailable.svg "halo")


**구성 요소**

간결한 다항식 커밋먼트 체계: 커미터가 짧은 문자열로 다항식에 커밋할 수 있게 하며, 검증자는 이를 사용해 커밋된 다항식의 주장된 평가값을 확인할 수 있습니다.

다항식 상호작용 오라클 증명: 검증자가 증명자(알고리즘)에게 다항식 커밋먼트 체계를 사용해 자신이 선택한 여러 지점에서 모든 커밋을 열도록 요청하고, 그들 사이의 동일성이 성립하는지 검사합니다. 


### 신뢰 설정 없음

zkSNARK는 증명과 검증을 위한 공개 매개변수로 공통 참조 문자열(CRS)에 의존합니다. 이 CRS는 신뢰할 수 있는 당사자가 사전에 생성해야 합니다. 최근까지는 Aztec 네트워크와 Zcash가 수행한 것과 같은 정교한 안전한 다자간 계산(MPC)이 이 [신뢰 설정 세리머니](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) 동안 수반되는 위험을 완화하는 데 필요했습니다. 

이전에 Zcash의 Sprout 및 Sapling 차폐 풀은 BCTV14 및 Groth 16 zk-증명 시스템을 활용했습니다. 이것들은 안전했지만 한계가 있었습니다. 단일 애플리케이션에 묶여 있어 확장성이 없었고, "toxic waste"(제네시스 세리머니 동안 생성된 암호학적 자료의 잔재)가 남아 있을 수 있었으며, 사용자가 세리머니를 수용 가능하다고 판단해야 하는 신뢰 요소(비록 매우 작지만)도 존재했습니다.

계산 증명이 스스로에 대해 효율적으로 추론하는 데 사용될 수 있도록 타원 곡선의 사이클 위에서 어려운 문제의 여러 인스턴스를 반복적으로 함께 붕괴시킴으로써(중첩 상각, Nested amortization), 신뢰 설정의 필요성이 제거됩니다. 이는 또한 구조화된 참조 문자열(세리머니의 출력)이 업그레이드 가능함을 의미하며, 스마트 계약과 같은 애플리케이션을 가능하게 합니다.

Halo는 대규모 영지식 증명 시스템의 보안과 관련하여 사용자에게 두 가지 중요한 보장을 제공합니다. 첫째, 제네시스 세리머니에 관여한 누구도 사기성 거래를 실행하기 위한 비밀 백도어를 만들지 않았음을 사용자가 증명할 수 있게 합니다. 둘째, 시스템이 업데이트와 변경을 거쳤더라도 시간이 지나면서 계속 안전하게 유지되었음을 사용자가 입증할 수 있게 합니다.

[Dystopia Labs에서의 Sean Bowe 설명](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### 재귀 증명

재귀 증명 합성은 단일 증명이 사실상 무제한의 다른 증명들의 정확성을 증명할 수 있게 하며, 이를 통해 대량의 계산(및 정보)을 압축할 수 있습니다. 이는 확장성의 필수 구성 요소이며, 특히 네트워크를 수평적으로 확장하면서도 참여자 일부가 네트워크 나머지 부분의 무결성을 신뢰할 수 있게 해준다는 점에서 중요합니다.

Halo 이전에는 재귀 증명 합성을 달성하려면 큰 계산 비용과 신뢰 설정이 필요했습니다. 주요 발견 중 하나는 **중첩 상각**이라 불리는 기법이었습니다. 이 기법은 내적 인수에 기반한 다항식 커밋먼트 체계를 사용해 재귀 합성을 가능하게 하며, 성능을 대폭 향상시키고 신뢰 설정을 피하게 해줍니다.

[Halo 논문](https://eprint.iacr.org/2019/1021.pdf)에서 우리는 이 다항식 커밋먼트 체계를 완전히 설명했고, 그 안에 새로운 집계 기법이 존재한다는 것을 발견했습니다. 이 기법은 독립적으로 생성된 많은 수의 증명을 단일 증명을 검증하는 것과 거의 같은 속도로 검증할 수 있게 해줍니다. 이것만으로도 Zcash에서 이전에 사용되던 zk-SNARK보다 더 나은 대안을 제공할 수 있습니다.


### Halo 2

Halo 2는 Rust로 작성된 고성능 zk-SNARK 구현으로, 신뢰 설정의 필요성을 제거하면서 Zcash의 확장성을 위한 기반을 마련합니다. 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

여기에는 **축적 체계**라고 불리는 우리 접근법의 일반화가 포함됩니다. 이 새로운 형식화는 우리의 중첩 상각 기법이 실제로 어떻게 작동하는지를 드러냅니다. 즉, 증명을 **accumulator**라고 불리는 객체에 추가하고, 그 증명들이 accumulator의 이전 상태에 대해 추론하도록 함으로써, 현재 accumulator의 상태만 확인해도 모든 이전 증명이 올바르다는 것을(귀납적으로) 확인할 수 있습니다.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



한편, 다른 많은 팀들도 Sonic(Halo 1에 사용됨)보다 더 효율적인 새로운 Polynomial IOP를 발견하고 있었습니다. 예를 들어 Marlin이 있습니다. 

이 새로운 프로토콜들 중 가장 효율적인 것은 PLONK로, 애플리케이션별 요구에 기반한 효율적인 구현을 설계하는 데 막대한 유연성을 제공하고, Sonic 대비 5배 더 나은 증명자 시간을 제공합니다.

[PLONK 개요](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### 이것이 Zcash에 어떤 이점을 주나요?

NU5와 함께 활성화된 Orchard 차폐 풀은 Zcash 네트워크에서 이 새로운 증명 시스템을 구현한 것입니다. 이는 Sprout와 Sapling 사이에 사용된 것과 동일한 turnstile 설계로 보호되며, 오래된 차폐 풀을 점진적으로 퇴역시키려는 의도를 갖고 있습니다. 이는 완전히 신뢰 불필요한 증명 시스템으로의 이전을 장려하여 통화 기반의 건전성에 대한 신뢰를 강화하고, 전반적으로 Zcash의 구현 복잡성과 공격 표면을 줄입니다. 2022년 중반 NU5가 활성화된 이후 재귀 증명의 통합이 가능해졌습니다(비록 이것이 아직 완성되지는 않았지만). 또한 여러 프라이버시 향상도 부수적으로 이루어졌습니다. 입력/출력을 대체하는 'Actions'의 도입은 거래 메타데이터의 양을 줄이는 데 도움이 되었습니다. 

신뢰 설정은 일반적으로 조정하기 어렵고 시스템적 위험을 제시했습니다. 주요 프로토콜 업그레이드마다 이를 반복해야 했을 것입니다. 이를 제거하는 것은 새로운 프로토콜 업그레이드를 안전하게 구현하는 데 상당한 개선을 가져옵니다. 

재귀 증명 합성은 무제한의 계산을 압축하고 감사 가능한 분산 시스템을 만드는 잠재력을 지니며, 특히 Proof of Stake로의 전환과 함께 Zcash를 매우 강력하게 만듭니다. 이는 또한 Zcash Shielded Assets와 같은 확장과, 향후 수년간 Zcash에서 높은 수준의 풀 노드 사용 시 Layer 1 용량을 개선하는 데에도 유용합니다.


## 더 넓은 생태계에서의 Halo 

Electric Coin Company는 Protocol Labs, Filecoin Foundation, Ethereum Foundation과 함께 Halo 연구개발을 탐색하기 위한 계약을 체결했으며, 여기에는 해당 기술이 각자의 네트워크에서 어떻게 사용될 수 있는지도 포함됩니다. 이 계약은 생태계 전반과 Web 3.0을 위해 더 나은 확장성, 상호운용성, 프라이버시를 제공하는 것을 목표로 합니다.

또한 Halo 2는 [MIT 및 Apache 2.0 오픈소스 라이선스](https://github.com/zcash/halo2#readme) 하에 제공되므로, 생태계의 누구나 이 증명 시스템을 사용해 구축할 수 있습니다.

### Filecoin

배포 이후 halo2 라이브러리는 zkEVM과 같은 프로젝트들에 채택되었으며, Halo 2를 Filecoin Virtual Machine의 증명 시스템에 통합할 가능성이 있습니다. Filecoin은 수많은 비용이 큰 spacetime 증명 / replication 증명을 필요로 합니다. Halo2는 공간 사용량을 압축하고 네트워크를 더 잘 확장하는 데 핵심적인 역할을 할 것입니다.

[Zooko와 함께한 Filecoin Foundation 영상](https://www.youtube.com/watch?v=t4XOdagc9xw)

또한 Filecoin 저장소 결제를 ZEC로 할 수 있다면 Filecoin과 Zcash 생태계 모두에 매우 큰 이점이 있을 것입니다. 그렇게 되면 Zcash 차폐 전송에 존재하는 것과 동일한 수준의 프라이버시가 저장소 구매에도 제공됩니다. 이 지원은 Filecoin 저장소의 파일을 암호화할 수 있는 기능을 추가하고, 모바일 클라이언트가 Zcash 암호화 메모에 미디어나 파일을 **첨부**할 수 있도록 지원을 추가할 것입니다. 

[ECC x Filecoin 블로그 게시물](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

효율적인 검증 가능 지연 함수(VDF)를 위한 Halo 2 증명의 구현이 개발되고 있습니다. VDF는 다양한 잠재적 사용 사례를 가진 암호학적 프리미티브입니다. 

이는 범용 난수의 원천으로 사용될 수 있으며, 스마트 계약 애플리케이션뿐 아니라 Ethereum 및 다른 프로토콜의 Proof of Stake에서 리더 선출에도 사용될 수 있습니다.

ECC, Filecoin Foundation, Protocol Labs, Ethereum Foundation은 또한 GPU 및 ASIC 설계 가능성과 VDF 개발을 위해 하드웨어 가속 암호학 전문 업체인 [SupraNational](https://www.supranational.net/)과 협력할 예정입니다.

[Privacy and Scaling Exploration 그룹](https://appliedzkp.org/) 역시 Halo 2 증명이 Ethereum 생태계의 프라이버시와 확장성을 어떻게 개선할 수 있는지에 대한 다양한 방식을 연구하고 있습니다. 이 그룹은 Ethereum foundation 산하에 있으며, 영지식 증명과 암호학적 프리미티브 전반에 폭넓게 초점을 맞추고 있습니다. 

## Halo를 사용하는 다른 프로젝트

+ [Anoma, 프라이버시를 보존하는 멀티체인 원자적 스왑 프로토콜](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, Cardano의 L2 zkRollup](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, 프라이빗 L1 zkEVM 블록체인](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, Ethereum의 L2 zkRollup](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**추가 학습 자료**:

[zkp와 halo 2 소개 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Daira & Str4d와 함께하는 Halo 2 - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[기술 설명 블로그](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 커뮤니티 쇼케이스 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**문서**

[Halo 2 리소스](https://github.com/adria0/awesome-halo2)

[Halo 2 문서](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
