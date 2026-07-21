<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = 제로 커널리티 서큐잇 넌인터랙티브 아규먼츠 오브 노우ledge
- 한쪽 당사자가 **어떤 정보를 알고 있음을 증명할 수 있게 해주되**, 그 정보 자체는 드러내지 않도록 합니다.
- Zcash는 ZK-SNARKs를 사용하여 거래가 유효함(올바른 금액, 미사용 입력)을 **보낸 사람, 받은 사람 또는 금액을 드러내지 않고** 증명합니다.
- "서큐잇"은 복잡한 명제조차도 검증이 빠르고 간단하게 이루어질 수 있음을 의미합니다.
- Orchard 풀은 **신뢰 설정이 필요 없는** Halo 2라는 ZK-SNARK 시스템을 사용합니다.

---

## 증명이란 무엇인가?

증명은 모든 수학의 기초입니다. 증명은 당신이 증명하려는 주장 또는 정리와, 그 정리가 증명되었음을 선언하기 위해 만들어진 도출 과정의 순서입니다. 예를 들어 삼각형의 각도 총합이 180°라는 것은 누구나 독립적으로 확인할 수 있습니다(검증자).

**증명**

증명자 ---> 주장 ---> 검증자 선택 ---> 승인/거부

(증명자와 검증자는 모두 알고리즘입니다)

컴퓨터 과학에서 효율적으로 검증 가능한 증명을 NP 증명이라고 합니다. 이러한 짧은 증명은 다항식 시간 내에 검증할 수 있습니다. 일반적인 아이디어는 "정리에 대한 해가 존재하며, 그 해는 검증자에게 전달되어 확인된다"는 것입니다.


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


NP 언어에서 두 가지 조건이 충족되어야 합니다:

완전성: 진실한 주장은 검증자가 승인합니다(정직한 증명자가 검증에 도달할 수 있도록 허용).

신뢰성: 거짓된 주장에는 증명이 존재하지 않습니다(모든 부정행위를 시도하는 증명자 전략에도 불구하고, 잘못된 주장을 올바르게 증명할 수 없습니다).


### 상호작용적 및 확률적 증명

**상호작용**: 단순히 증명을 읽는 것이 아니라, 검증자는 여러 메시지 라운드를 통해 증명자와 오가하는 대화에 참여합니다.

**난수성**: 검증자가 증명자에게 요청하는 것은 무작위이며, 증명자는 각 요청에 대해 올바르게 답해야 합니다. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


상호작용과 난수성을 함께 사용하면 확률 다항 시간(PPT) 내에서 맹검 검증자에게 주장이 증명될 수 있습니다.

상호작용 증명은 NP 증명보다 더 효율적으로 검증할 수 있나요?

NP 증명 vs IP 증명:

|  명제   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  예      |  예   |
|    CO-NP     |  아니오       |  예   |
|    #P        |  아니오       |  예   |
|    PSPACE    |  no       |  yes   |


NP - 문장에 대한 해가 존재함

CO-NP - 문장에 해가 없음을 증명함

#P - 문장에 몇 개의 해가 있는지 세는 것

PSPACE  - 서로 다른 문장들의 교대를 증명하는 것

### 제로 커널이란 무엇인가?

검증자가 상호작용 후 계산할 수 있는 내용은 이전에 증명할 수 있었던 것과 동일하다. 증명자와 검증자 간의 다단계 상호작용은 검증자의 계산 능력을 증가시키지 않는다.

**시뮬레이션 Paradigm**

이 실험은 암호학 전반에 걸쳐 존재한다. "실제 시점"과 "시뮬레이션 시점"을 제시한다.

실제 시점: 증명자와 검증자(P,V) 간의 모든 가능한 상호작용 역사

시뮬레이션 시점: 검증자가 증명자와 검증자 간의 모든 가능한 상호작용을 시뮬레이션함

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

다항 시간 구분자는 실제 또는 시뮬레이션 시점을 보고 있는지 판단하려고 시도하고, 두 가지 모두에서 샘플을 반복적으로 요청한다.

두 시점이 "계산적으로 구분 불가능"하다는 것은 모든 구분 알고리즘/전략에 대해, 실제 또는 시뮬레이션 시점으로부터 다항 수의 샘플을 받은 후에도 확률이 >1/2인 경우이다.

**제로 커널 지식 증명**

상호작용 프로토콜(P,V)이 제로 커널임은, 모든 확률 다항 시간 검증자(정리가 올바를 때)에 대해 시뮬레이터(알고리즘)가 존재하여 실제와 시뮬레이션 시점의 확률 분포가 계산적으로 구분 불가능하다는 것이다.

상호작용 프로토콜은 단일 검증자가 있을 때 유용하다. 예를 들어, 제로 커널 '세금 증명' 애플리케이션에서 세무 감사관이다.

## SNARK란 무엇인가?

**간결한 비상호작용 지식 증명**

광의의 정의 - 진술이 참임을 간결하게 증명하는 것. 증명은 짧고 빠르게 검증되어야 한다. SNARK에서는 증명자가 검증자에게 단일 메시지를 전송한다. 이후 검증자는 수락하거나 거부할 수 있다.

예시 진술: "메시지(m)를 알고 있고, SHA256(m)=0인 경우"

zk-SNARK 증명은 메시지(m)에 대해 아무것도 드러내지 않는다.

**다항식**: 상수(예: 1, 2, 3), 변수(예: x, y, z), 변수의 지수(예: x², y³)를 포함하는 항들의 합

예시: "3x² + 8x + 17"

**산술 회로**: 다항식을 계산하기 위한 모델. 일반적으로 이는 각 노드에서 산술 연산이 수행되는 방향성 없는 순환 그래프로 정의될 수 있다. 회로는 덧셈 게이트, 곱셈 게이트 및 상수 게이트로 구성된다. 비트를 전선에 통해 운반하는 부울 회로와 마찬가지로 산술 회로는 정수를 운반한다.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

이 예시에서 증명자는 검증자가 산술 회로의 해를 알고 있음을 설득하고자 한다.

**커밋먼트**: 이를 위해 증명자는 회로와 관련된 모든 값(공개 및 비공개)을 커밋먼트에 넣습니다. 커밋먼트는 출력이 역전되지 않는 함수를 사용하여 입력값을 숨깁니다.

SHA-256은 커밋먼트 스키마에서 사용할 수 있는 해시 함수의 예입니다.

증명자가 값에 커밋한 후, 커밋먼트는 검증자에게 전달됩니다(검증자가 원래 값을 알아낼 수 없다는 것을 확신합니다). 증명자는 이후 그래프의 노드에 있는 각각의 값을 알고 있음을 검증자에게 보여줄 수 있습니다.

**피아트-샴리르 변환**

프로토콜을 *비상호적*으로 만들기 위해 증명자는 암호화 해시 함수를 사용하여 검증자의 대신 랜덤성을 생성합니다(숨겨진 도전에 사용됨). 이는 랜덤 오라클이라고 알려져 있습니다. 증명자는 이후 단일 메시지를 검증자에게 전송할 수 있으며, 검증자는 이를 확인할 수 있습니다.

일반 회로를 위한 SNARK를 형성하기 위해 두 가지 요소가 필요합니다:

기능 커밋먼트 스키마: 커미터는 다항식을 짧은 문자열로 커밋하고, 검증자는 커밋된 다항식의 주장된 평가를 확인할 수 있도록 합니다.

다항식 상호 오라클: 검증자가 증명자(알고리즘)에게 자신이 선택한 다양한 지점에서 커밋먼트를 열도록 요청하고, 다항식 커밋먼트 스키마를 사용하여 그들 사이의 정체성을 확인합니다.

**설정**

설정 절차는 회로를 요약하고 공개 파라미터를 출력함으로써 검증자에게 도움을 줍니다.

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**사전 처리 설정 유형**:

회로별 신뢰 설정 - 회로당 한 번 실행됩니다. 특정 회로에 해당하며, 비밀 랜덤성(공통 참조 문자열)은 비밀로 유지되고 파괴해야 합니다.

이 방법에서 설정이 손상되면 불량한 증명자는 거짓 진술을 증명할 수 있습니다.

신뢰되지만 보편적인 설정 - 신뢰 설정을 단 한 번만 실행하면 여러 회로를 결정적으로 사전 처리할 수 있습니다.

투명 설정(신뢰 설정 없음) - 사전 처리 알고리즘은 전혀 비밀 랜덤성을 사용하지 않습니다.


**SNARK 증명 구축 유형**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): 신뢰 설정이 필요하지만, 검증이 매우 빠르게 이루어지는 짧은 증명을 제공합니다.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): 보편적인 신뢰 설정.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): 신뢰 설정이 필요하지 않지만, 증명이 약간 더 길거나 증명자가 실행하는 데 시간이 더 오래 걸릴 수 있습니다.

SNARKS are useful when multiple verifiers are needed such as a blockchain like Zcash or zk-Rollup such as [Aztec](https://docs.aztec.network) so that multiple validating nodes don't have to interact over several rounds with each proof. 

## Zcash에서 zk-SNARK는 어떻게 구현되나요?

일반적으로 제로 지식 증명은 정보를 드러내지 않고 프로토콜 내에서 정직한 행동을 강제하는 도구입니다.

Zcash는 개인 거래가 가능한 공개 블록체인입니다. zk-SNARK는 네트워크의 합의 규칙에 따라 비공개 거래가 유효함을 증명하면서도 거래에 대한 다른 세부 사항은 드러내지 않습니다.

[영상 설명](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - 이 강의에서 Ariel Gabizon이 Zcash 노트 커밋먼트 트리, 블라인드 다항식 평가 및 동형으로 숨겨진 도전과 그들이 네트워크에 어떻게 구현되는지 설명합니다.

Read the [Halo2 book](https://zcash.github.io/halo2/index.html) for more information.

## Other Zero-Knowledge Applications 

zk-SNARKS provide several advantages in a variety of different applications. Let's take a look at some examples.

**Scalability**: This is achieved by 'Outsourcing Computation'. There is no strict need for zero-knowledge for an L1 chain to verify the work of an off-chain service. Transactions are not necessarily private on a zk-EVM.

The advantage of a proof based Rollup (zk-Rollup) service is to process a batch of hundreds/thousands of transactions & the L1 is able to verify a succinct proof that all transactions were processed correctly, scaling the networks transaction throughput by a factor of 100 or 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperability**: This is achieved on a zk-Bridge by 'locking' assets on a source chain and proving to the target chain the assets have been locked (proof of consensus).

**Compliance**: Projects such as [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) are able to prove that a private transaction is compliant with local banking laws without revealing the details of the transaction. 

**Fighting Disinformation**: Among several examples outside of blockchain & cryptocurrency, the use of proof generation on images that have been processed by news & media outlets to enable viewers to independently verify the source of an image and all operations performed on it. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Further Learning: 

[Zero-Knowledge Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's with Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 and SNARKs without Trusted Setups - Sean Bowe on Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs with Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Chainlink article](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lecture 1: Introduction and History of ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Simple Explanation of Arithmetic Circuits - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability is Boring, Privacy is Dead: ZK-Proofs, What are They Good for?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Related Pages

- [Shielded Pools](/using-zcash/shielded-pools) — How ZK-SNARKs are used in Zcash value pools
- [Halo](/zcash-tech/halo) — Zcash's ZK-SNARK system that eliminates trusted setups
- [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security) - How future quantum risks relate to Zcash cryptography
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs built on ZK-SNARK technology
- [What is ZEC and Zcash](/start-here/what-is-zec-and-zcash) — Introduction to Zcash and its privacy model
- [Privacy as a Core Principle](/privacy/privacy-as-a-core-principle) — Why financial privacy matters
