<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Halo란 무엇인가?

Halo는 Electric Coin Co의 Sean Bowe가 개발한 신뢰 없는 재귀적 제로 지식 증명(ZKP) 시스템이다. 이 기술은 신뢰 설정을 제거하고 Zcash 블록체인의 확장성을 향상시킨다. Halo는 효율적이면서도 재귀적인 제로 지식 증명 체계로서, 과학적 돌лом으로 평가받고 있다.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**구성 요소**

간결한 다항식 약속 체계: 증명자가 다항식에 대한 짧은 문자열로 약속을 할 수 있게 해주며, 검증자는 약속된 다항식의 평가를 확인할 수 있다.

다항식 상호 오라클 증명: 검증자가 증명자(알고리즘)에게 자신의 선택에 따라 다항식 약속 체계를 사용하여 모든 약속을 열어보게 하며, 그 사이의 정체성을 확인한다. 

### 신뢰 설정 없음

zkSNARKs는 증명 및 검증을 위한 공통 참조 문자열(CRS)이라는 공개 매개변수에 의존한다. 이 CRS는 신뢰할 수 있는 당사자에 의해 사전에 생성되어야 한다. 최근까지 Aztec 네트워크와 Zcash가 수행한 복잡한 보안 다중 당사자 계산(MPC)과 같은 엄격한 절차가 필요했다.

이전에는 Zcash의 Sprout 및 Sapling 은폐 풀에서 BCTV14 및 Groth 16 zk 증명 시스템을 사용하였다. 이들은 보안성은 있었지만 한계도 있었다. 단일 애플리케이션에 묶여 확장성이 부족했으며, 생성식 의식(생성식 의식은 생성식 의식)에서 남은 "독한 폐기물"이 지속될 수 있었고, 사용자가 의식을 받아들일 수 있는 신뢰 요소가 있었다.

Halo는 타원 곡선의 주기를 반복하여 여러 번의 어려운 문제 인스턴스를 결합함으로써 계산 증명을 스스로에 대해 효율적으로 추론할 수 있게 하여, 신뢰 설정이 필요하지 않게 되었다. 이는 또한 의식에서 출력된 구조 참조 문자열이 업그레이드 가능하게 되어 스마트 컨트랙트와 같은 애플리케이션을 가능하게 한다.

Halo는 대규모 제로 지식 증명 시스템의 보안에 대해 사용자에게 두 가지 중요한 보장 제공한다. 첫째, 생성식 의식에 참여한 누구도 사기 거래를 실행하기 위한 비밀 백도어를 만들었음을 사용자가 증명할 수 있게 한다. 둘째, 시스템이 업데이트 및 변경을 겪으면서도 시간이 지나면서도 계속 보안성을 유지했음을 사용자가 입증할 수 있게 한다.

[Sean Bowes의 Dystopia Labs 설명](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### 재귀 증명

재귀 증명 구성은 한 개의 증명이 실제로 무한히 많은 다른 증명의 올바름을 인증할 수 있게 하여, 대량의 계산(및 정보)를 압축할 수 있다. 이는 확장성에 필수적인 요소이며, 특히 네트워크를 수평적으로 확장하면서도 참여자 그룹이 나머지 네트워크의 신뢰성을 믿도록 허용한다.

Halo가 등장하기 전에는 재귀 증명 구성에 대규모 계산 비용과 신뢰 설정이 필요했다. 주요 발견 중 하나는 **중첩된 분담**이라는 기술이다. 이 기술은 내적 곱 논증을 기반으로 한 다항식 약속 체계를 사용하여 재귀 구성이 가능하게 하여, 성능을 크게 향상시키고 신뢰 설정을 피할 수 있게 한다.

[Halo 논문](https://eprint.iacr.org/2019/1021.pdf)에서는 이 다항식 약속 체계를 완전히 설명하고, 그 안에 새로운 집합 기술이 존재함을 발견했다. 이 기술은 독립적으로 생성된 증명의 대량을 단일 증명을 검증하는 것만큼 빠르게 검증할 수 있게 한다. 이는 Zcash에서 사용했던 이전 zk-SNARKs보다 훨씬 더 나은 선택지가 될 수 있다.


### Halo 2

Halo 2는 Rust로 작성된 고성능 zk-SNARK 구현으로, 신뢰 설정이 필요하지 않으면서 Zcash의 확장성을 위한 기반을 마련한다.

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

이것은 **축적 체계**라는 우리의 접근법의 일반화를 포함한다. 이 새로운 형식화는 중첩된 분담 기술이 실제로 어떻게 작동하는지를 드러낸다. 증명을 **축적자**(accumulator)라고 불리는 객체에 추가함으로써, 증명들이 축적자의 이전 상태에 대해 추론하게 되면, 현재 축적자의 상태만 확인함으로써 모든 이전 증명이 올바른지(귀납법을 통해) 확인할 수 있다.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



동시에, 다른 많은 팀들도 Sonic(Halo 1에서 사용됨)보다 더 효율적인 새로운 다항식 IOP를 발견하고 있었다. 그 중 가장 효율적인 것은 PLONK이며, 이는 애플리케이션별 요구사항에 따라 효율적인 구현을 설계하는 데 큰 유연성을 제공하며 Sonic 대비 5배 더 빠른 증명 시간을 제공한다.

[PLONK 개요](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### 이는 Zcash에 어떤 이점을 주나?

Orchard 은폐 풀은 NU5와 함께 활성화되었으며, 이는 Zcash 네트워크에서 새 증명 체계의 구현이다. Sprout과 Sapling 사이에 사용된 동일한 게이트 디자인을 사용하여 오래된 은폐 풀을 점진적으로 폐지하려는 의도를 가지고 있다. 이는 완전히 신뢰 없는 증명 체계로의 이주를 장려하며, 통화 기반의 타당성에 대한 확신을 강화하고 Zcash 전반의 구현 복잡성과 공격 표면을 줄인다. 2022년 중반 NU5가 활성화된 이후 재귀 증명의 통합이 가능해졌으며(완전히 완료되지는 않았지만), 여러 가지 개인정보 보호 향상도 간접적으로 이루어졌다. 'Actions'을 입력/출력으로 대체함으로써 거래 메타데이터 양을 줄이는 데 도움을 주었다.

신뢰 설정은 일반적으로 조율하기 어렵고 시스템적 위험을 제시한다. 각각의 주요 프로토콜 업그레이드마다 반복해야 한다. 이를 제거함으로써 새로운 프로토콜 업그레이드를 안전하게 구현하는 데 있어 중요한 개선이 이루어진다.

재귀 증명 구성은 무한한 양의 계산을 압축하여 감사 가능한 분산 시스템을 만들 수 있는 잠재력을 가지고 있으며, 이는 특히 Proof of Stake로의 전환에 따라 Zcash가 매우 강력해질 수 있게 한다. 또한, Zcash 보호 자산 및 향후 몇 년 동안 완전 노드 사용량 상위 레벨에서 Layer 1 용량 개선에도 유용하다.


## 더 넓은 생태계 내의 Halo

Electric Coin Company는 Protocol Labs, Filecoin Foundation, Ethereum Foundation과 협약을 맺어 Halo R&D를 탐구하고 있다. 이 기술이 각각의 네트워크에서 어떻게 사용될 수 있는지에 대해 연구한다. 이 협약은 생태계 간의 더 나은 확장성, 상호 운용성 및 개인정보 보호를 제공하는 것을 목표로 한다. Web 3.0을 위한 것이다.

또한 Halo 2는 [MIT 및 Apache 2.0 오픈소스 라이선스](https://github.com/zcash/halo2#readme)에 따라 배포되어, 생태계 내의 누구라도 증명 체계를 사용하여 구축할 수 있다.

### Filecoin

배포 이후 halo2 라이브러리는 zkEVM과 같은 프로젝트에서 채택되었으며, Filecoin 가상 머신의 증명 시스템에 Halo 2가 통합될 가능성이 있다. Filecoin은 많은 비용이 드는 시간/복제 증명을 필요로 한다. Halo2는 공간 사용량을 압축하고 네트워크 확장성을 향상시키는 데 핵심적인 역할을 할 것이다.

[Filecoin Foundation의 Zooko와 함께한 동영상](https://www.youtube.com/watch?v=t4XOdagc9xw)

또한, Filecoin 저장소 지불이 ZEC로 이루어질 수 있다면, 이는 Zcash 은폐 전송에서 존재하는 것과 동일한 수준의 개인정보 보호를 제공할 것이다. 이 지원은 Filecoin 저장소에 파일을 암호화하고 모바일 클라이언트가 Zcash 암호화 메모에 **붙임**으로써 미디어나 파일을 첨부할 수 있도록 지원하는 기능도 추가할 수 있다.

[ECC x Filecoin 블로그 게시물](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

효율적인 검증 지연 함수(VDF)를 위한 Halo 2 증명의 구현이 진행 중이다. VDF는 다양한 잠재적 용도가 있는 암호학적 원시이다.

스마트 계약 응용 프로그램에서 일반 목적의 난수 생성에 사용될 수 있으며, Ethereum 및 기타 프로토콜에서 Proof of Stake의 리더 선출에도 사용될 수 있다.

ECC, Filecoin Foundation, Protocol Labs, Ethereum Foundation은 또한 [SupraNational](https://www.supranational.net/), 하드웨어 가속 암호화에 특화된 업체와 협력하여 VDF의 GPU 및 ASIC 설계 개발을 진행할 예정이다.

[Privacy and Scaling Exploration 그룹](https://appliedzkp.org/)은 또한 Halo 2 증명이 Ethereum 생태계의 개인정보 보호 및 확장성에 어떻게 기여할 수 있는지 다양한 방법을 연구하고 있다. 이 그룹은 Ethereum Foundation에 속해 있으며, 제로 지식 증명과 암호학적 원시에 대한 광범위한 집중을 하고 있다.

## Halo를 사용하는 다른 프로젝트들

+ [Anoma, 개인정보 보호 다중 체인 원자 교환 프로토콜](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, Cardano 상의 L2 zkRollup](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, 개인정보 보호 L1 zkEVM 블록체인](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, Ethereum 상의 L2 zkRollup](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**추가 학습 자료**:

[zkp 및 Halo 2 소개 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2, Daira & Str4d와 함께 - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[기술 설명 블로그](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 커뮤니티 발표 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**문서**

[Halo 2 자료](https://github.com/adria0/awesome-halo2)

[Halo 2 문서](https://zcash.github.io/halo2/)

[Halo 2 GitHub](https://github.com/zcash/halo2)
