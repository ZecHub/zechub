# 제로에서 제로 지식으로: Lelantus 프로토콜

**시리즈:** 제로에서 제로 지식으로

오늘 우리는 **Lelantus**를 살펴보겠습니다!

2019년에 발표된 이 프로토콜은 Zerocoin을 기반으로 합니다. **Firo**(이전 이름: Zcoin) 통화에서 체인 상의 비공개 거래를 가능하게 하기 위해 사용됩니다. Zcash와 유사한 점도 있지만, 대부분의 측면에서는 명확히 다른 점이 있습니다.

![Lelantus 소개](https://pbs.twimg.com/media/Fsk18DgXsAEc0Ob.jpg)

---

## Zcash vs Firo 프로토콜 기초

- **Zcash** - **Zerocash** 프로토콜을 기반으로 함  
- **Firo (Zcoin)** - **Zerocoin** 프로토콜을 기반으로 함

![Zerocash vs Zerocoin 비교](https://pbs.twimg.com/media/Fsk2Fk7WcAA81ty.png)

---

## Firo의 개인정보 보호 프로토콜 진화

Zcash와 유사하게, Firo는 비공개 주소를 사용하여 익명 결제를 달성합니다.

**시간표:**
- **Zerocoin** - 안정성이 깨짐
- **Sigma** - 고정 금액 시스템 수정됨
- **Lelantus 1.0** - 올바른 보안 증명이 부족함

![프로토콜 진화](https://pbs.twimg.com/media/Fsk2NdaWAAAKVgH.png)

---

## Sigma 프로토콜의 한계

기존 Zcoin/Firo 버전에서 사용된 Σ (Sigma) 프로토콜에는 주요한 한계가 있었는데, 사용자가 고정 금액만 발행할 수 있었습니다.

이로 인해 익명 집합이 작아졌고, 발행과 환불 작업 사이의 타이밍 공격에 취약하게 되었으며, "오염된 잔금" 문제도 발생했습니다.

![Sigma 금액](https://pbs.twimg.com/media/Fsk2fxfWcAMUBDo.png)

---

## Lelantus가 개인정보 보호를 개선하는 방법

**Lelantus**는 고정 금액 문제를 해결하기 위해 단일 더 큰 집합에서 발행을 가능하게 합니다.

주요 이점:
- 고정 금액 익명 집합 제거
- 소멸/환불 간 타이밍 공격 감소
- 오염된 잔금 문제 제거

**한계**: 현재 세트 크기는 **65,000 코인**으로 제한됨.

![Lelantus 이점](https://pbs.twimg.com/media/Fsk2wK3X0AA6MEe.png)

---

## 코인 커밋먼트

**코인 커밋먼트**(coin commitment)는 코인 시리얼 번호와 코인 가치를 인코딩한 이중 블라인드 커밋먼트입니다.

이것은 Zcash의 **노트**(notes)와 유사하게 작동합니다.

코인이 생성될 때 (Mint 또는 Spend 거래를 통해), 이 커밋먼트는 공개되고 장부에 저장됩니다.

![코인 커밋먼트 다이어그램](https://pbs.twimg.com/media/Fsk3AWNX0AIHya8.png)

---

## Basecoin < - > Zerocoin 모델

Lelantus는 고전적인 **basecoin < - > zerocoin** 모델을 사용합니다.

**중요한 기능**: 이제 잔액을 증명하는 데 필요한 입력 값을 추출할 수 있으면서도, 입력 출처를 드러내지 않고, 신뢰 설정이 필요하지 않도록 유지하면서 부분 환불이 가능해졌습니다.

Zcash와 마찬가지로, 투명 거래는 사용자가 명시적으로 선택해야 합니다.

![Lelantus 흐름](https://pbs.twimg.com/media/Fsk3HrjXgAMgqmX.png)

---

## 하나 중 하나 증명

Lelantus는 **하나 중 하나 증명**(One-of-Many Proofs)을 사용하여 입력 출처를 드러내지 않고, 입력 값을 추출하여 잔액을 증명할 수 있습니다. 신뢰 설정도 필요하지 않습니다.

이 증명은 또한 **Triptych** (우리의 CryptoNote 스레드에서 언급됨)에도 사용됩니다.

![하나 중 하나 증명](https://pbs.twimg.com/media/Fsk3Z0nWIAAPD4k.jpg)

---

## 네트워크 계층 개인정보 보호: Dandelion++

Firo 노드는 Zcash의 Magicbean과 동일한 **네트워크 마법**(Network Magic)을 사용합니다.

Monero와 유사하게, Firo는 거래 방송자의 IP 주소를 암호화하여 개인정보 보호를 추가하기 위해 **Dandelion++**을 구현했습니다.

**Dandelion++ 단계:**
- **줄기 단계**(Stem phase) - 모든 피어 대신 하나의 무작위 노드에만 거래가 전달됨
- **털 단계**(Fluff phase) - 무작위로 시작되고, 일반적인 소문 퍼뜨리기 모드로 전환됨

이로 인해 네트워크 분석을 통해 거래의 출처를 추적하는 것이 훨씬 어려워집니다.

![Dandelion++ 설명](https://pbs.twimg.com/media/Fsk4A8VWcAU84MR.png)

---

## 미래: Lelantus-Spark

**Lelantus-Spark**(2023년 후반에 예정됨)는 **ZIP-32 스타일 유도**(derivation)와 분산 주소를 사용하여 두 가지 수준의 선택적 가시성을 도입합니다.

또한 다음과 같은 기능을 추가할 예정입니다:
- 다중 서명
- 사용자 정의 비공개 자산

이 기능은 Zcash Shielded Assets과 유사합니다.

![Lelantus-Spark 발표](https://pbs.twimg.com/media/Fsk4jXeXsAACQ3h.jpg)

---

**ZecHub(@ZecHub) 원본 스레드**  
https://x.com/ZecHub/status/1641902859800150017

---

*이 페이지는 ZecHub 위키를 위한 원본 Zero to Zero Knowledge 스레드에서 컴파일되었습니다.*
