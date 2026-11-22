# Zero to Zero Knowledge: CryptoNote 프로토콜

**시리즈:** Zero to Zero Knowledge

오늘은 흥미로운 주제를 살펴봅니다!  
**CryptoNote** 프로토콜은 강력한 온체인 프라이버시를 제공합니다. 오늘은 주요 기능과 여러 유명 프라이버시 프로젝트에서 이 프로토콜을 어떻게 구현했는지 알아보겠습니다.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## 배경

CryptoNote 백서는 **“Nicolas van Saberhagen”**이라는 필명으로 처음 발표되었습니다.  

**Bytecoin**은 이 프로토콜을 구현한 최초의 암호화폐였습니다. 오늘날 이 프로토콜을 사용하는 가장 잘 알려진 프로젝트는 **Monero (XMR)**입니다. TurtleCoin, Aeon 등 여러 프로젝트에서도 사용되었습니다.

---

## CryptoNote의 핵심 기능

CryptoNote 프로토콜은 다음 3가지 주요 기능을 제공합니다.

1. 거래의 **추적 불가능성 및 연결 불가능성**
2. **평등한 작업 증명**(ASIC 저항성) 
3. **동적 발행**

---

## 1. 추적 불가능성 - 링 서명

추적 불가능성은 주로 **링 서명**을 사용해 구현됩니다.

거래를 전송할 때 실제 공개 키는 같은 양의 코인을 보유한 여러 미끼 키와 섞입니다(이 키들의 집합을 “링”이라고 합니다). 따라서 실제로 누가 코인을 보냈는지 알아내기가 매우 어렵습니다.

**링 크기**는 익명성 집합에 큰 영향을 미칩니다. 링이 클수록 프라이버시가 강화됩니다.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Zcash과의 비교**:  
Zcash의 익명성 집합은 특정 거래정보 보호 구역에서 *지금까지* 발생한 전체 거래 수입니다(CryptoNote에서 일반적으로 사용하는 링 크기보다 훨씬 큽니다).

---

## Ring CT(기밀 거래)

**Ring CT** 모델은 CryptoNote 기반 코인의 프라이버시를 크게 개선했습니다.

Ring CT는 송신자만 숨기는 것이 아니라, 송신자와 수신자 사이의 **거래 금액도 난독화**합니다.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

다음 기술을 사용합니다.
- 타원 곡선 암호학
- 페더슨 커밋먼트
- 동형 암호화

**증명**을 사용하면 실제 값을 **공개하지 않고도** 금액이 0보다 크고 유효한 범위 안에 있음을 보일 수 있습니다.

**스텔스 주소**는 수신자에게 일회용 주소도 제공합니다.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. 평등한 작업 증명(ePoW)

CryptoNote는 ASIC에 저항하는 방식으로 더 공정한 채굴 시스템을 만드는 것을 목표로 합니다.

메모리 집약적인 함수인 **CryptoNight** 알고리즘을 사용합니다. Bitcoin의 SHA256과 달리 CryptoNight는 CPU, GPU, ASIC 채굴자 간의 성능 격차를 줄이도록 설계되었습니다.

**CryptoNight 단계:**
1. 넓은 메모리 영역(스크래치패드)에 의사 난수 데이터를 초기화합니다.
2. 스크래치패드에서 수많은 읽기/쓰기 작업을 수행합니다.
3. 전체 스크래치패드를 해시해 최종 값을 생성합니다.

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(참고: Monero은 이후 CryptoNight에서 벗어나 다른 알고리즘을 사용하게 되었습니다.)

---

## 3. 동적 발행

Bitcoin처럼 갑작스러운 반감기를 적용하는 대신, CryptoNote는 **점진적으로 감소하는 블록 보상**을 사용합니다.

이를 통해 시간이 지나면서 훨씬 완만한 발행 곡선을 만듭니다.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Zcash와의 연관성**:  
Zcash 개발자들은 향후 더 완만한 발행 곡선을 구현하는 방안을 논의했으며, “Zcash Posterity Fund”를 통해 구현할 가능성도 있습니다.

---

## 결론

CryptoNote는 온체인 프라이버시를 위한 강력하고 실전에서 검증된 접근 방식임을 입증했습니다. CryptoNote의 여러 혁신은 더 넓은 프라이버시 코인 생태계에도 영향을 미쳤습니다.

일부 연구자들은 CryptoNote의 기능을 신뢰가 필요 없는 영지식 거래정보 보호 구역과 결합할 수 있다고 봅니다.

---

**ZecHub의 원문 스레드(@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 스레드를 바탕으로 작성되었습니다.*
