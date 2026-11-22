# Zero to Zero Knowledge: 니모닉 seed phrase

**시리즈:** Zero to Zero Knowledge

니모닉 seed phrase는 암호화폐에서 가장 중요한 요소 중 하나인 **자기 보관**의 기반입니다.  
오늘은 지갑에서 seed phrase가 어떻게 생성되고 사용되는지 알아보겠습니다.

---

## 니모닉 seed phrase란 무엇인가요?

복구 문구는 오늘날 가장 널리 사용되는 복구 문구 형식인 **BIP-39** 사양으로 정의됩니다.

복구 문구는 **무작위성**을 생성하는 것부터 시작합니다. 엔트로피가 높을수록 보안성이 높아집니다. 대부분의 사용자에게는 **128비트**의 엔트로피면 충분하다고 여겨집니다.

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

초기 엔트로피의 길이에 따라 복구 문구는 **12~24개 단어**로 구성됩니다.

---

## 단계별 설명: 12단어 seed phrase 생성 방법

### 1. 엔트로피 생성
먼저 **128비트**의 엔트로피를 생성합니다.

### 2. 체크섬 추가
엔트로피를 **SHA256**으로 해시합니다. 이 해시의 처음 몇 비트가 체크섬이 됩니다.  
이를 통해 엔트로피를 고유하게 식별할 수 있습니다.

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. 11비트 단위로 분할
총 132비트(엔트로피 128비트 + 체크섬 4비트)를 11비트 단위로 나눕니다.

### 4. 단어 목록에 대응
각 11비트 시퀀스를 십진수(0~2047)로 변환합니다.  
BIP-39 단어 목록에는 정확히 **2,048개 단어**가 있습니다(영어, 스페인어, 중국어 등).

이 숫자를 사용해 단어 목록에서 해당 단어를 찾습니다.

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**결과:** 안전하고 사람이 읽을 수 있는 12단어 복구 문구가 완성됩니다!

---

## 복구 문구 -> seed -> 결제 주소

지갑은 복구 문구를 사용해 키를 생성하고, 이를 통해 결제 주소와 여러 지갑 계정을 만들 수 있습니다.

생성된 키는 **결정론적**입니다. 즉, 같은 입력에는 항상 같은 출력이 생성됩니다.

### seed 생성
지갑 seed는 니모닉 문구에서 **키 파생 함수(KDF)**를 사용해 파생됩니다.

- **Bitcoin**: PBKDF2  
- **Zcash**: Blake2b-256/512

이 과정을 통해 **64바이트(512비트)** seed가 생성됩니다.

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### 마스터 키
seed를 32바이트 시퀀스 2개로 나눕니다.
- **마스터 spending key**
- **마스터 체인 코드**

이 값들은 자식 키를 파생할 때 **계층적 결정론 지갑(HD 지갑)**에서 사용됩니다.

---

## Zcash의 특징 (ZIP-32)

Zcash에서는 마스터 seed를 손상시키지 않고 하위 트리의 **열람 권한** 또는 **사용 권한**을 각각 독립적으로 위임할 수 있습니다.

**ZIP-32**는 Zcash의 프라이버시 기능에 맞게 조정된 계층적 결정론 키 생성 표준을 정의합니다.

**확장 spending key**에서 다음을 파생합니다.
- Full Viewing Key
- Incoming Viewing Key
- 결제 주소 집합

서로 다른 파생 방식으로 거래정보 보호 구역(Sapling 및 Orchard)에서 송신자에게 제공하기 적합한 외부 주소를 생성합니다.

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash은 또한 자동 거래정보 보호와 같은 지갑 작업에 사용할 **내부 주소**도 지원합니다.

---

## 참고 자료

- [ZIP-32: 거래정보 보호 계층적 결정론 지갑](https://zips.z.cash/zip-0032)  
- [Zcash 프로토콜 사양 (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [기본 거래정보 보호 지갑 개요](https://zechub.wiki)

---

**원본 스레드 작성자: ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 스레드를 바탕으로 작성되었습니다.*
