# 제로에서 제로 지식: Mnemonic Seed Phrases (암호구문)

**시리즈:** 제로에서 제로 지식

Mnemonic seed phrases는 암호화폐의 가장 중요한 요소 중 하나인 **자체 보관(self-custody)**을 뒷받침합니다.  
오늘은 seed phrase가 어떻게 생성되고, 지갑에서 사용되는지 배우겠습니다.

---

## Mnemonic Seed Phrases란 무엇인가요?

Recovery phrases는 오늘날 가장 일반적으로 사용되는 recovery phrase 유형인 **BIP-39** 명세에 의해 정의됩니다.

Recovery phrases의 생성은 먼저 **난수(randomness)**를 생성하는 것으로 시작됩니다. 더 많은 엔트로피(무질서도)는 보안을 높입니다. 대부분의 사용자에게 **128 비트**의 엔트로피가 충분합니다.

![Seed phrase concept](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

초기 엔트로피의 길이에 따라 recovery phrase는 **12에서 24개 단어**까지 구성됩니다.

---

## 단계별: 12단어 seed phrase 생성 방법

### 1. 엔트로피 생성
우리는 먼저 **128 비트**의 엔트로피를 생성합니다.

### 2. 체크섬 추가
**SHA256**을 사용하여 엔트로피를 해싱하고, 이 해시의 처음 몇 비트가 체크섬이 됩니다.
이렇게 하면 엔트로피에 고유한 지문(fingerprint)을 부여할 수 있습니다.

![Entropy + Checksum diagram](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. 11비트 조각으로 분할
총 132 비트(128 엔트로피 + 4 체크섬)는 **11비트** 단위의 조각으로 나뉩니다.

### 4. 단어 목록 매핑
각 11비트 시퀀스는 십진수(0-2047)로 변환됩니다.
BIP-39 단어 목록에는 정확히 **2048개의 단어**(영어, 스페인어, 중국어 등)가 포함되어 있습니다.

이 숫자들은 단어 목록에서 해당하는 단어를 찾는 데 사용됩니다.

![Word mapping example](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**결과:** 이제 우리는 보안되고 사람이 읽을 수 있는 12단어 recovery phrase를 가졌습니다!

---

## Recovery Phrase -> Seed -> 지불 주소

Recovery phrase를 사용하여 지갑은 지불 주소와 다양한 지갑 계정을 생성하기 위한 키를 생성할 수 있습니다.

생성된 키는 **결정적(deterministic)**입니다. 동일한 입력은 항상 동일한 출력을 만듭니다.

### Seed 생성
지갑 seed는 mnemonic phrase에서 **키 유도 함수(Key Derivation Function, KDF)**를 사용하여 도출됩니다:

- **Bitcoin**에서는 PBKDF2  
- **Zcash**에서는 Blake2b-256/512

이 과정은 **64바이트(512비트)**의 seed를 생성합니다.

![Seed to master keys](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### 마스터 키
seed는 두 개의 32바이트 시퀀스로 분할됩니다:
- **마스터 지출 키**
- **마스터 체인 코드**

이들은 **계층적 결정적(Hierarchical Deterministic, HD) 지갑**에서 자식 키 유도에 사용됩니다.

---

## Zcash 특별 기능 (ZIP-32)

Zcash에서는 **보기 권한(viewing authority)** 또는 **지출 권한(spending authority)**이 마스터 seed를 손상시키지 않고 하위 트리에 독립적으로 위임될 수 있습니다.

**ZIP-32**는 Zcash의 프라이버시 기능을 위해 적응된 계층적 결정적 키 생성 표준을 정의합니다.

**확장 지출 키(Expanded Spending Key)**에서 다음을 도출할 수 있습니다:
- 전체 보기 키(Full Viewing Key)
- 입력 보기 키(Incoming Viewing Key)
- 지불 주소 집합

다른 유도 메커니즘은 **보호된 풀**(Sapling & Orchard)에 송금자에게 제공하기에 적합한 외부 주소를 생성합니다.

![Zcash key derivation hierarchy](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash는 또한 **내부 주소**를 지원하여 Auto-Shielding과 같은 지갑 작업을 수행할 수 있습니다.

---

## 참고 자료

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Protocol Specification (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Shielded-by-default wallets overview](https://zechub.wiki)

---

**원본 트레드: ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*이 페이지는 원래의 Zero to Zero Knowledge 트레드를 기반으로 ZecHub 위키에 맞게 정리되었습니다.*
