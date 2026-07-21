# 제로에서 제로 지식: 신뢰 실행 환경(TEE)

**시리즈:** 제로에서 제로 지식

제로에서 제로 지식이 새로운 주제로 돌아왔습니다!  
이번 주에는 **신뢰 실행 환경(Trusted Execution Environments, TEEs)**에 대해 다룹니다. 이는 프라이버시 코인 및 기타 블록체인 애플리케이션에서 어떻게 사용되는지 살펴보겠습니다.

![신뢰 실행 환경 소개](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEE와 블록체인: 보완적인 특성

블록체인과 TEE는 매우 보완적인 강점을 가지고 있습니다:

- **블록체인**은 가용성을 보장하고 상태 지속성을 제공하며 전체 상태의 공개 검증이 가능하지만, 계산 능력이 제한적입니다.  
- **TEE**는 암호화된 입력, 출력 및 상태에 대한 강력한 계산 작업을 수행할 수 있지만, 원ative 상태 지속성은 부족합니다.

둘을 결합하면 강력한 프라이버시 보존 시스템을 만들 수 있습니다.

---

## Secret Network: TEE 기반의 프라이버시

**Secret Network**은 TEE 기술(구체적으로 인텔 SGX)을 활용하여 암호화된 입력, 출력 및 상태에 대한 계산을 수행합니다.

모든 검증자 노드는 인텔 SGX 칩을 실행합니다. 합의와 계산 레이어는 다음과 같이 결합됩니다:

- 트랜잭션은 보안 엔클로저 내에서 처리됩니다.  
- 데이터는 **TEE 내부**에서만 복호화됩니다.

이는 Zcash가 **제로 지식 증명(zero-knowledge proofs)**을 사용하여 프라이버시를 보장하는 방식과 다릅니다. Zcash에서는 가리킨 트랜잭션이 네트워크에 추가 데이터 없이 공개적으로 브로드캐스트되고 검증됩니다. Zcash의 Shielded Assets도 동일한 원칙을 따릅니다.

![Secret Network TEE 다이어그램](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Secret Network에서 TEE가 어떻게 구현되는지에 대한 자세한 설명은 @l_woetzel의 이 훌륭한 기사에서 확인할 수 있습니다:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Network이 키와 상태를 보호하는 방법

- 네트워크의 **합의 암호화 시드**는 각 검증자의 TEE 내부에 저장됩니다.  
- 스마트 계약은 고유하고 위조 불가능한 암호화 키를 사용합니다.  
- Secret 계약은 Cosmos SDK 계산 모듈에서 실행되지만, 암호화된 입력/출력 및 상태를 지원합니다.

---

## 원격 인증

**원격 인증(Remote Attestation)**은 엔클로저가 진짜 보안 하드웨어 환경에서 실행되고 있는지를 증명하는 과정입니다.

이 과정을 통해 원격 당사자는 다음 사항을 확인할 수 있습니다:
- 올바른 애플리케이션이 실행 중인지  
- 애플리케이션이 손상되지 않았는지  
- 인텔 SGX 엔클로저 내부에서 안전하게 실행되고 있는지

![원격 인증 설명](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

엔클로저에는 외부에서 접근할 수 없는 개인 서명 및 인증 키도 포함되어 있습니다.

![엔클로저 키 보호](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## 데이터 암호화

엔클로저는 상태가 없기 때문에 때때로 신뢰할 수 없는 메모리에 데이터를 저장해야 합니다.  

**데이터 암호화(Data Sealing)**은 CPU에서 파생된 키를 사용하여 엔클로저 내부의 데이터를 암호화합니다. 암호화된 블록은 **동일한 시스템**에서만 해독될 수 있습니다.

![데이터 암호화 다이어그램](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network**도 confidential ParaTime(예: Sapphire 및 Cipher)을 통해 TEE를 사용합니다.

암호화된 데이터는 스마트 계약과 함께 TEE에 입력됩니다. 이 데이터는 엔클로저 내부에서 복호화, 처리, 재암호화되어 나옵니다.

![Oasis Network TEE 흐름](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## Proof-of-Stake 네트워크에서의 TEE

Secret 및 Oasis를 포함한 많은 Proof-of-Stake 블록체인은 **Tendermint**을 합의 프레임워크로 사용합니다.

PoS 검증자에 대해:
- 키는 보안하게 관리되어야 하며, 평문으로 노출될 수 없습니다.  
- 검증자는 온라인 상태를 유지해야 합니다(다운타임에는 벌금이 부과됩니다).  
- 충돌 메시지 서명은 슬래싱을 초래할 수 있습니다.

**TEE**는 검증자 키의 보안한 생성 및 사용에 이상적입니다.

![Tendermint & PoS 보안](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash과 Proof-of-Stake 연구

Zcash는 현재 **Proof-of-Stake**로의 이전을 적극적으로 연구하고 있습니다.

- 연구 내용 보기: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Zcash Foundation 커뮤니티 콜에서 다양한 PoS 설계와 그 프라이버시 영향에 대한 설명이 포함된 영상 시청:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**ZecHub(@ZecHub)의 원본 트레드**  
https://x.com/ZecHub/status/1633579659282587651

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 트레드에서 컴파일되었습니다.*
