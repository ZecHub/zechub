# Zero to Zero Knowledge: 신뢰 실행 환경(TEE)

**시리즈:** Zero to Zero Knowledge

Zero to Zero Knowledge가 새로운 주제로 돌아왔습니다!  
이번 주에는 **신뢰 실행 환경(TEE)**과 프라이버시 코인 및 기타 블록체인 애플리케이션에서의 활용 방식을 살펴봅니다.

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEE와 블록체인: 상호 보완적인 특성

블록체인과 TEE는 서로를 보완하는 강점을 지닙니다.

- **블록체인**은 가용성과 상태 지속성을 보장하고 전체 상태를 공개적으로 검증할 수 있게 하지만, 연산 능력에는 한계가 있습니다.
- **TEE**는 집약적인 연산 작업을 비공개로 수행할 수 있지만, 기본적으로 상태 지속성을 지원하지 않습니다.

두 기술을 결합하면 강력한 프라이버시 보호 시스템을 구축할 수 있습니다.

---

## Secret Network: TEE 기반 프라이버시

**Secret Network**는 TEE 기술(구체적으로 Intel SGX)을 활용해 암호화된 입력, 출력 및 상태에 대한 연산을 수행합니다.

모든 검증자 노드는 Intel SGX 칩을 실행합니다. 합의 계층과 연산 계층이 결합되어 있습니다.

- 거래는 보안 엔클레이브 내부에서 처리됩니다.
- 데이터는 **TEE 내부에서만** 복호화됩니다.

이는 프라이버시를 위해 **영지식 증명(zero-knowledge proofs)**을 사용하는 Zcash와 다릅니다. Zcash에서는 거래정보 보호 거래가 네트워크에 추가 정보를 공개하지 않은 채 공개적으로 전파되고 검증됩니다. Zcash 거래정보 보호 자산도 같은 원리를 따릅니다.

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Secret Network에서 TEE를 구현하는 방법에 대한 자세한 설명은 @l_woetzel이 작성한 다음 훌륭한 글을 참고하세요.  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Network가 키와 상태를 보호하는 방법

- 네트워크의 **합의 암호화 시드**는 각 검증자의 TEE 내부에 저장됩니다.
- 컨트랙트는 위조할 수 없는 고유한 암호화 키를 사용합니다.
- Secret 컨트랙트는 Cosmos SDK 연산 모듈에서 실행되지만, 암호화된 입력/출력과 상태를 지원합니다.

---

## 원격 증명

**원격 증명(Remote Attestation)**은 엔클레이브가 진짜 보안 하드웨어 환경에서 실행되고 있음을 증명하는 절차입니다.

이를 통해 원격 당사자는 다음을 확인할 수 있습니다.
- 올바른 애플리케이션이 실행 중인지
- 애플리케이션이 변조되지 않았는지
- Intel SGX 엔클레이브 내부에서 안전하게 실행되고 있는지

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

엔클레이브에는 외부에서 접근할 수 없는 개인 서명 키와 증명 키도 들어 있습니다.

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## 데이터 봉인

엔클레이브는 상태를 저장하지 않으므로, 때로는 신뢰할 수 없는 외부 메모리에 데이터를 저장해야 합니다.

**데이터 봉인(Data Sealing)**은 CPU에서 파생된 키를 사용해 엔클레이브 내부의 데이터를 암호화합니다. 암호화된 블록은 **동일한 시스템**에서만 봉인을 해제할 수 있습니다.

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network**도 기밀 ParaTime(예: Sapphire 및 Cipher)을 통해 TEE를 사용합니다.

암호화된 데이터는 스마트 컨트랙트와 함께 TEE에 들어갑니다. 엔클레이브를 떠나기 전에 데이터가 복호화되고 처리된 다음 다시 암호화됩니다.

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## 지분 증명 네트워크에서의 TEE

Secret과 Oasis를 비롯한 많은 지분 증명 블록체인은 합의 프레임워크로 **Tendermint**를 사용합니다.

지분 증명 검증자의 경우:
- 키를 안전하게 관리하고 평문으로 노출하지 않아야 합니다.
- 검증자는 계속 온라인 상태를 유지해야 합니다(다운타임에는 페널티가 부과됩니다).
- 서로 충돌하는 메시지에 서명하면 슬래싱이 발생할 수 있습니다.

**TEE**는 검증자 키를 안전하게 생성하고 사용하는 데 이상적입니다.

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash와 지분 증명 연구

Zcash는 지분 증명으로의 전환을 활발히 연구하고 있습니다.

- 연구 내용 읽기: https://electriccoin.co/blog/zcash-proof-of-stake-research/
- 다양한 지분 증명 설계와 프라이버시에 미치는 영향을 설명하는 Zcash Foundation 커뮤니티 콜의 다음 부분을 시청하세요.
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="지분 증명 설계"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**ZecHub의 원문 스레드 (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 스레드를 바탕으로 작성되었습니다.*
