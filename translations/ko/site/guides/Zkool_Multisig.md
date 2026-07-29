# Zkool 멀티시그 가이드

이 가이드는 Zkool을 사용하여 멀티시그 트랜잭션을 수행하는 단계별 절차를 안내합니다. 계정 생성, 자금 송수신 및 멀티시그를 위한 분산 키 생성(DKG) 설정 방법을 포함합니다. 주요 단계마다 스크린샷이 포함되어 있습니다.

## 튜토리얼

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 1. 계정 생성

1. **Zkool 앱**을 열고 **New Account**(새로운 계정)으로 이동합니다.

![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. **Account Name**(계정 이름)을 입력하세요 (예: Anabelle).

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)

4. 필요 시 **Use Internal Change**(내부 변경 사용) 또는 **Restore Account**(계정 복원)을 선택할 수 있습니다.

5. 생성 후, 계정은 **Account List**(계정 목록)에 나타납니다.

![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)

## 2. 자금 수신

각 계정은 여러 가지 주소 유형을 생성합니다:

**Unified Address**(통합 주소)  
**Orchard only Address**(오차드 전용 주소)  
**Sapling Address**(사플링 주소)  
**Transparent Address**(투명 주소)

필요한 유형을 선택하고, 자금 수신을 위해 이를 공유하세요.

![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)

## 3. 자금 송금

1. **Recipient**(수신자) 섹션으로 이동합니다.

![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)

3. **recipients address**(수신자 주소)를 입력하세요.

4. **amount**(금액)과 선택적으로 **memo**(메모)를 지정합니다.

5. 트랜잭션 세부 정보를 확인하고 **confirm**(확인)을 클릭합니다.

완료되면, 계정 목록에서 잔액이 업데이트됩니다.

![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)

## 4. 멀티시그 트랜잭션 수행: 분산 키 생성(DKG) 설정(멀티시그)

Zkool의 멀티시그는 **Distributed Key Generation (DKG)**을 사용하여 여러 참여자가 공유 계정을 공동으로 제어하도록 보장합니다.

### 단계 1: DKG 시작

공유 지갑에 대한 **이름**을 선택하세요(예: Anabelle).

**참여자 수**를 설정하세요.

**참여자 ID**를 선택하세요.

필요한 **서명자 수**(임계값)를 정의합니다.

**자금 계정**을 선택합니다.

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)

### 단계 2: 참여자 주소 추가

- 각 참여자의 **Unified Address**(통합 주소)를 입력하세요(권장).

**참고:** Orchard 전용 또는 Sapling 전용 주소를 사용하는 경우, 멀티시그는 해당 풀(Orchard 또는 Sapling)에만 제한됩니다.  
이로 인해 공유 지갑은 다른 풀에서 자금을 수신할 수 없습니다.  
최대 호환성과 유연성을 위해 항상 **Unified Addresses**(통합 주소)를 사용하세요.

### 단계 3: DKG 라운드 실행

모든 참여자가 **라운드 1** 및 **라운드 2** 패키지를 교환할 때까지 기다립니다.

![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)

### 단계 4: 공유 주소 최종화

완료되면 **공유 주소**가 생성됩니다.

![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)

## 결론

Zkool을 사용하면 계정을 생성하고 자금을 송수신하며 **분산 키 생성(DKG)**을 통해 **멀티시그 지갑**을 설정할 수 있습니다. 이는 **보안 강화**와 **협업 및 비공개 자금 관리**를 보장합니다.
