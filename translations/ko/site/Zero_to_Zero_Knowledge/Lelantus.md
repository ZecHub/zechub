# Zero to Zero Knowledge: Lelantus 프로토콜

**시리즈:** Zero to Zero Knowledge

오늘은 **Lelantus**를 살펴보겠습니다!

2019년에 출시된 이 프로토콜은 Zerocoin을 기반으로 합니다. **Firo** 통화(이전 명칭 Zcoin)에서 프라이버시를 보호하는 온체인 거래를 가능하게 하는 데 사용됩니다. 일부 면에서는 Zcash와 비슷하지만, 대부분의 측면에서 뚜렷이 다릅니다.

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Zcash와 Firo 프로토콜의 기반

- **Zcash** - **Zerocash** 프로토콜을 기반으로 합니다  
- **Firo (Zcoin)** - **Zerocoin** 프로토콜을 기반으로 합니다

![Zerocash vs Zerocoin comparison](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Firo 프라이버시 프로토콜의 진화

Zcash와 마찬가지로, Firo는 익명 결제를 위해 거래정보 보호 주소를 사용합니다.

**타임라인:**
- **Zerocoin** - 건전성 증명이 깨졌습니다
- **Sigma** - 고정 액면가 시스템
- **Lelantus 1.0** - 올바른 보안 증명이 없었습니다

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Sigma 프로토콜의 한계

Zcoin/Firo의 이전 버전에서 사용된 Σ (Sigma) 프로토콜에는 큰 한계가 있었습니다. 사용자는 고정 액면가로만 민팅할 수 있었습니다.

이로 인해 익명성 집합이 작아졌고, 민팅과 상환 작업 사이에 타이밍 공격이 발생할 가능성이 생겼습니다(또한 “오염된 거스름돈” 문제도 있었습니다).

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Lelantus가 프라이버시를 개선하는 방법

**Lelantus**는 하나의 더 큰 집합에서 민팅할 수 있게 하여 고정 액면가 문제를 해결합니다.

주요 이점:
- 고정 액면가에 따른 익명성 집합을 없앱니다
- 소각과 상환 사이의 타이밍 공격을 줄입니다
- 오염된 거스름돈 문제를 없앱니다

**한계**: 현재 집합 크기는 **65,000 코인**으로 제한됩니다.

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## 코인 커밋먼트

**코인 커밋먼트(coin commitment)**는 코인 일련번호와 코인 가치를 인코딩하는 이중 블라인드 커밋먼트입니다.

이는 Zcash의 **노트(Notes)**와 비슷한 방식으로 작동합니다.

코인이 생성될 때(민팅 또는 지출 거래를 통해) 코인 커밋먼트가 원장에 게시되고 저장됩니다.

![Coin commitment diagram](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## 베이스코인 < - > Zerocoin 모델

Lelantus는 전통적인 **베이스코인 < - > Zerocoin** 모델을 사용합니다.

**중요한 특징**: 이제 잔액과 금액을 숨긴 채 일부만 상환하고 나머지를 보유할 수 있습니다.

Zcash와 마찬가지로, 투명 거래는 사용자가 명시적으로 선택해야 합니다.

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## 다중 후보 중 하나 증명

Lelantus는 입력의 출처를 공개하지 않고, 트러스트 셋업 없이 잔액을 증명하는 데 필요한 입력값을 추출하기 위해 **다중 후보 중 하나 증명(One-of-Many Proofs)**을 활용합니다.

이 증명은 **Triptych**에서도 사용됩니다(CryptoNote 스레드에서 언급했습니다).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## 네트워크 계층 프라이버시: Dandelion++

Firo 노드는 Zcash의 Magicbean과 동일한 네트워크 매직 값을 사용합니다.

Monero와 마찬가지로, Firo는 거래를 전파하는 노드의 IP 주소를 난독화해 프라이버시를 강화하는 **Dandelion++**를 구현했습니다.

**Dandelion++ 단계:**
- **줄기 단계** - 거래를 모든 피어가 아닌 무작위 노드 1개에 전달합니다
- **솜털 단계** - 무작위로 시작한 뒤 일반 가십 모드로 전환됩니다

이로 인해 네트워크 분석을 통해 거래의 출처를 추적하기가 훨씬 어려워집니다.

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## 향후 계획: Lelantus-Spark

**Lelantus-Spark**(2023년 후반 출시 예정)는 **ZIP-32 스타일 파생 방식**과 다각화 주소를 사용해 사용자가 선택할 수 있는 2단계 가시성을 도입합니다.

또한 다음 기능을 지원합니다.
- 다중 서명
- 사용자 정의 기밀 자산

이러한 기능은 Zcash Shielded Assets와 유사합니다.

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**원본 스레드 작성자: ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 스레드를 바탕으로 작성되었습니다.*
