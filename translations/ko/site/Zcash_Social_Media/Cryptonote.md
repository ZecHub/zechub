# 제로에서 제로 지식: 크립토노트 프로토콜

**시리즈:** 제로에서 제로 지식

오늘은 흥미로운 주제입니다!  
**크립토노트**(CryptoNote) 프로토콜은 강력한 체인 상의 프라이버시를 제공합니다. 오늘 우리는 이 프로토콜의 주요 기능과 여러 유명한 프라이버시 프로젝트에서 어떻게 구현되었는지 배우겠습니다.

![크립토노트 소개](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## 배경

원래의 크립토노트 화이트페이퍼는 **"니콜라스 반 세버하겐"(Nicolas van Saberhagen)**이라는 의사명으로 발표되었습니다.  

**바이트코인**(Bytecoin)은 이 프로토콜을 처음 구현한 암호화폐였습니다. 오늘날 가장 잘 알려진 크립토노트를 사용하는 프로젝트는 **모네로**(Monero, XMR)입니다. 또한 터틀코인(TurtleCoin), 에온(Aeon) 및 기타 여러 프로젝트에서도 사용되었습니다.

---

## 크립토노트의 핵심 기능

크립토노트 프로토콜은 세 가지 주요 기능을 제공합니다:

1. **거래의 추적 불가성과 연결 불가성**(Untraceability and Unlinkability)
2. **평등한 작업 증명**(Egalitarian Proof of Work) (ASIC에 강함)
3. **동적인 발행량**(Dynamic emission)

---

## 1. 추적 불가성 - 링 서명(Ring Signatures)

추적 불가성은 주로 **링 서명**(Ring Signatures)을 사용하여 달성됩니다.

거래를 보내는 경우, 당신의 실제 공개 키는 여러 개의 유인자 키(decoy keys)와 혼합되며("링") - 모두 동일한 암호량을 포함합니다. 이로 인해 실제로 코인을 보낸 사람이 누구인지 알아내는 것이 매우 어렵습니다.

**링 크기**(Ring size)는 익명 집합에 큰 영향을 미칩니다. 더 큰 링은 더 나은 프라이버시를 제공합니다.

![링 서명 설명](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Zcash와의 비교**:  
Zcash의 익명 집합은 주어진 보호 풀에서 *언제든지* 이루어진 거래 총 수(일반적인 크립토노트 링 크기보다 훨씬 큽니다).

---

## 링 CT (Confidential Transactions)

**링 CT**(Ring CT) 모델은 크립토노트 기반 암호화폐의 프라이버시를 크게 개선했습니다.

보내는 사람을 숨기는 것뿐만 아니라, **발신자와 수신자 간의 거래 금액도 흐리게** 만듭니다.

![링 CT 다이어그램](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

이는 다음과 같은 기술을 사용합니다:
- 타원 곡선 암호학(Elliptic Curve Cryptography)
- 페데런 커밋먼트(Pedersen Commitments)
- 동형 암호(Homomorphic Encryption)

**증명**(Proofs)은 실제 값이 없으면서도 금액이 0보다 크고 유효한 범위 내에 있음을 보여줍니다.

**스텔스 주소**(Stealth Addresses)는 수신자에게 일회용 주소를 추가합니다.

![스텔스 주소 + 증명](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. 평등한 작업 증명 (ePoW)

크립토노트는 ASIC에 강하도록 설계되어 더 공정한 채굴 시스템을 만들려고 합니다.

**크립토나이트**(CryptoNight) 알고리즘(메모리 힘든 함수)을 사용합니다. 비트코인의 SHA256과 달리, 크립토나이트는 CPU, GPU 및 ASIC 채굴자 간의 격차를 줄이는 데 설계되었습니다.

**크립토나이트 단계:**
1. 의사난수 데이터로 큰 메모리 영역(스크래치패드)을 초기화
2. 스크래치패드에 많은 읽기/쓰기 작업 수행
3. 전체 스크래치패드 해싱하여 최종 값을 생성

![크립토나이트 채굴](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(참고: 모네로는 이후 크립토나이트에서 다른 알고리즘으로 이전했습니다.)

---

## 3. 동적 발행량

비트코인의 갑작스러운 반감 사건과 달리, 크립토노트는 **부드럽게 감소하는 블록 보상**(smoothly decreasing block reward)을 사용합니다.

이로 인해 시간에 따른 발행 곡선이 훨씬 부드러워집니다.

![동적 발행량 곡선](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**Zcash와의 연관성**:  
Zcash 개발자들은 미래에 "Zcash Posterity Fund"를 통해 더 부드러운 발행 곡선을 구현하는 것에 대해 논의한 바 있습니다.

---

## 결론

크립토노트는 체인 상 프라이버시에 대한 강력하고 검증된 접근 방식임이 입증되었습니다. 그의 많은 혁신은 더 넓은 프라이버시 코인 생태계에 영향을 미쳤습니다.

일부 연구자들은 결국 크립토노트 기능과 신뢰 없는 제로 지식 보호 풀을 결합할 수 있을 것으로 생각합니다.

---

**원본 트레드: ZecHub(@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*이 페이지는 원래의 Zero to Zero Knowledge 트레드를 바탕으로 ZecHub 위키를 위해 작성되었습니다.*
