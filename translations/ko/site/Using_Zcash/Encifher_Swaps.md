# **SOL/USDC -> ZEC 스왑: Encrypt.trade 사용**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Solana에서 Zcash로 스왑하며, 크로스체인 단계는 Near Intents를 통해 라우팅됩니다.*  

---

###  소개  
[**encrypt.trade**](https://encrypt.trade/zec)는 JMD Labs Inc.가 운영하는 Solana 앱입니다. Solana의 **SOL 또는 USDC**를 **Zcash (ZEC)**로 스왑할 수 있습니다. 먼저 토큰이 암호화된 버전으로 래핑되어 Solana에서 수량이 숨겨진 다음, Near Intents를 통해 ZEC로 스왑됩니다.

이 스왑은 일부 측면에서는 비공개이지만, 모든 면에서 그렇지는 않습니다. 앱의 자체 [문서](https://docs.encifher.io/docs)에 따르면 체인과의 상호작용은 익명이 아닙니다. 즉, 사람들이 지갑이 앱을 사용했다는 사실은 볼 수 있지만, 이동한 금액은 볼 수 없습니다. 또한 ZEC는 투명 주소로 도착하므로, 실드 처리하기 전까지 Zcash 체인에서 계속 공개됩니다.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  스왑 전에 알아둘 사항  
- **Solana 측.** 래핑은 금액을 숨기지만, 지갑 주소와 앱 사용 사실은 공개됩니다. [모범 사례](https://docs.encifher.io/docs/best-practices)에서는 단순히 래핑, 스왑, 언래핑을 하면 거래가 연결될 수 있다고 경고합니다.
- **암호화.** 암호화된 잔액은 하드웨어 엔클레이브(TEE) 내부에서 오프체인으로 처리됩니다. 개발자의 [논문](https://eprint.iacr.org/2026/1504)에 따르면 이는 암호화 기술만이 아니라 TEE 무결성, 정직한 임계값 키 관리, 클라우드 증명 루트에 의존합니다.
- **크로스체인 단계.** ZEC로의 스왑은 독립적인 솔버가 주문을 이행하는 Near Intents를 통해 라우팅됩니다.
- **Zcash 측.** Near Intents는 ZEC가 [투명 주소 전용](https://docs.near-intents.org/resources/chain-support)으로 지원된다고 명시하며, 2026년 9월에 이 가이드를 확인했을 때 encrypt.trade의 ZEC 입력란도 투명 주소(t1 또는 t3)만 허용했습니다. 투명 주소에서는 실드 처리하기 전까지 잔액과 수신 전송이 공개됩니다.
- **심사.** 앱은 연결하는 지갑을 TRM 및 Chainalysis 같은 데이터베이스로 확인하며, [컴플라이언스 페이지](https://docs.encifher.io/docs/compliance)에는 정당한 법적 사유가 있을 경우 암호화된 기록을 검토할 수 있다고 명시되어 있습니다. Near Intents도 자체 [심사](https://docs.near-intents.org/security-compliance/risk-and-compliance)를 수행합니다.

---

###  1단계: Solana 지갑 연결  
**Chrome 또는 Firefox**에서 [encrypt.trade](https://encrypt.trade/zec)를 방문하고 **Phantom**, **Solflare** 또는 **Slope** 지갑을 연결합니다. 지갑에 가스 수수료로 쓸 충분한 **SOL**과 거래하려는 토큰이 있는지 확인하세요. 연결되면 자산을 래핑할 준비가 됩니다.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  2단계: 토큰 래핑  
**Wrap** 섹션으로 이동합니다. **SOL** 또는 **USDC**를 선택하고 금액을 입력한 뒤 확인합니다. 앱이 자산을 잠그고 **암호화된 버전(eSOL 또는 eUSDC)**을 발행합니다. 스왑할 금액과 다른 금액을 래핑하면 금액을 기준으로 둘을 연결하기가 더 어려워지지만, 지갑이 앱을 사용했다는 사실까지 숨기지는 못합니다.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  3단계: ZODL 지갑 준비  
[**ZODL**](https://zodl.com)를 다운로드하세요. 이는 ZODL가 유지 관리하는 Zcash 지갑입니다. 수신 화면에서 **Zcash 투명 주소**(t1로 시작)를 복사합니다. 현재 encrypt.trade는 ZEC에 대해 실드 주소 또는 통합 주소를 허용하지 않습니다. 진행하기 전에 시드 구문을 안전하게 보관하세요.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  4단계: 스왑  
**encrypt.trade**로 돌아가 **Swap**으로 이동합니다. **eSOL/eUSDC -> ZEC**를 선택하고, ZODL 투명 주소를 붙여넣은 다음 세부 사항을 검토하고 확인합니다.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents**가 크로스체인 라우팅을 처리하고 **ZEC**를 ZODL 지갑으로 보냅니다. 몇 분 정도 걸릴 수 있습니다. Near Intents는 크로스체인 스왑에 최대 15분을 허용할 것을 권장합니다.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  5단계: ZEC 실드 처리  
ZEC가 도착하면 ZODL의 **Shield** 옵션을 사용하여 [실드 풀](/using-zcash/shielded-pools)로 이동하세요. 그전까지는 누구나 잔액을 볼 수 있는 투명 주소에 있습니다. 실드 처리는 이후 활동을 보호하지만, 수신 전송과 실드 처리 거래는 체인에 계속 공개됩니다. 항상 링크를 확인하고, 주소 재사용을 피하며, 먼저 소액으로 테스트하세요.  

---

###  관련 주체 및 도움받는 곳  
- **encrypt.trade**는 JMD Labs Inc.가 운영하는 앱입니다. [개인정보 처리방침](https://encrypt.trade/privacy)에 따르면 IP, 브라우저, 기기 세부 정보 같은 기술 데이터를 수집하고, 스왑 전에 지갑 주소, 최근 기록 및 잔액을 컴플라이언스 제공업체에 전송하며, 로그와 AML 심사 결과를 최대 5년간 보관할 수 있습니다. [이용 약관](https://encrypt.trade/terms)에서는 위치를 숨기기 위한 VPN 또는 프록시 사용을 금지합니다. 지원: help@encifher.io 또는 앱에서 연결되는 [Telegram 그룹](https://t.me/+ZWHGMW4ZHXQwYTZl).
- **Near Intents**는 크로스체인 단계를 라우팅하고 ZEC를 전달합니다. [1Click API 약관](https://docs.near-intents.org/security-compliance/terms-of-service)과 near.com/privacy의 개인정보 처리방침을 참고하고, [Near Intents Explorer](https://explorer.near-intents.org)에서 스왑을 추적하며, [Near Intents Telegram](https://t.me/near_intents)에서 도움을 요청하세요.

약관과 지원되는 주소는 변경될 수 있으므로, 큰 금액을 스왑하기 전에 최신 버전을 확인하세요. 더 넓은 관점은 [비수탁형 거래소](/using-zcash/non-custodial-exchanges)를 참고하세요.

---

**Solana**, **Zcash**, **Near Intents**를 결합하여 **encrypt.trade**는 SOL 또는 USDC에서 ZEC로 빠르게 이동할 수 있는 경로를 제공합니다. Solana에서는 금액을 숨기지만 처음부터 끝까지 비공개인 것은 아니므로, ZEC가 도착하면 실드 처리하세요.
