<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# SOL/USDC에서 ZEC로 스왑하기: encrypt.trade 사용법

> Solana에서 SOL 또는 USDC를 스왑해 ZEC로 보내세요. 크로스체인 단계는 NEAR Intents을 통해 진행됩니다.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## 요약

* [encrypt.trade](https://encrypt.trade/zec)는 SOL 또는 USDC를 암호화된 토큰(encrypted tokens)(eSOL/eUSDC)으로 래핑한 다음, NEAR Intents을 통해 ZEC로 스왑합니다.
* 금액은 Solana에서 숨겨지지만, 지갑 주소와 앱 사용 내역은 공개됩니다.
* ZEC는 투명 주소(t1/t3)로만 전송되므로, 거래정보 보호를 적용하기 전까지 Zcash 체인에서 확인할 수 있습니다.
* ZEC가 도착하면 즉시 지갑에서 거래정보 보호를 적용하세요.
* 앱과 NEAR Intents 모두 규정 준수를 위해 지갑을 심사합니다.

---

## 핵심 설명
[**encrypt.trade**](https://encrypt.trade/zec)는 JMD Labs Inc.가 운영하는 Solana 앱입니다. Solana에서 **SOL 또는 USDC**를 스왑해 **Zcash(ZEC)**로 보낼 수 있습니다. 먼저 토큰을 암호화된 버전으로 래핑해 Solana에서 금액을 숨긴 다음, NEAR Intents을 통해 ZEC로 스왑합니다.

이 스왑은 일부 측면에서는 프라이버시를 보호하지만, 모든 측면에서 그런 것은 아닙니다. 앱의 [문서](https://docs.encifher.io/docs)에 따르면 체인과의 상호작용은 익명으로 이루어지지 않습니다. 지갑이 앱을 사용했다는 사실은 다른 사람이 볼 수 있지만, 얼마를 옮겼는지는 알 수 없습니다. ZEC도 투명 주소로 도착하므로, 거래정보 보호를 적용하기 전까지 Zcash 체인에서 확인할 수 있습니다.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  스왑 전에 알아둘 점
- **Solana 측면.** 래핑하면 금액은 숨겨지지만, 지갑 주소와 앱 사용 내역은 공개됩니다. [모범 사례](https://docs.encifher.io/docs/best-practices)에서는 단순히 래핑하고 스왑한 뒤 다시 래핑을 해제하면 거래를 서로 연결할 수 있다고 경고합니다.
- **암호화.** 암호화된 잔액은 하드웨어 보안 영역(TEE) 안에서 오프체인으로 처리됩니다. 개발자들의 [논문](https://eprint.iacr.org/2026/1504)에 따르면, 이 방식은 암호화만으로 보호되는 것이 아니라 TEE의 무결성, 신뢰할 수 있는 임계값 키 관리, 클라우드 증명 루트에 의존합니다.
- **크로스체인 단계.** NEAR Intents을 통해 ZEC로 스왑이 전달되며, 독립적인 솔버가 주문을 체결합니다.
- **Zcash 측면.** NEAR Intents에서는 [투명 주소만](https://docs.near-intents.org/resources/chain-support) ZEC에 지원된다고 안내합니다. 2026년 9월에 이 안내서를 확인했을 당시 encrypt.trade의 ZEC 입력란에서도 투명 주소(t1 또는 t3)만 허용했습니다. 투명 주소에서는 거래정보 보호를 적용할 때까지 잔액과 수신한 전송 내역을 누구나 볼 수 있습니다.
- **심사.** 앱은 연결된 지갑을 TRM 및 Chainalysis 등의 데이터베이스와 대조하며, [규정 준수 페이지](https://docs.encifher.io/docs/compliance)에 따르면 정당한 법적 사유가 있는 경우 암호화된 기록을 검토할 수 있습니다. NEAR Intents도 자체적으로 [심사](https://docs.near-intents.org/security-compliance/risk-and-compliance)를 진행합니다.

---

###  1단계: Solana 지갑 연결
**Chrome 또는 Firefox**에서 [encrypt.trade](https://encrypt.trade/zec)에 접속해 **Phantom**, **Solflare** 또는 **Slope** 지갑을 연결하세요. 지갑에 거래 수수료로 쓸 SOL과 거래하려는 토큰이 충분히 있는지 확인하세요. 연결하면 자산을 래핑할 준비가 완료됩니다.


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  2단계: 토큰 래핑
**Wrap** 섹션으로 이동하세요. **SOL** 또는 **USDC**를 선택하고 금액을 입력한 다음 확인하세요. 앱은 자산을 잠그고 **암호화된 버전(eSOL 또는 eUSDC)**을 발행합니다. 스왑하려는 금액과 다른 금액을 래핑하면 두 금액을 서로 연결하기 어려워지지만, 지갑이 앱을 사용했다는 사실까지 숨겨지지는 않습니다.




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  3단계: ZODL 지갑 준비
ZODL에서 관리하는 Zcash 지갑인 [**ZODL**](https://zodl.com)를 다운로드하세요. Receive 화면에서 **Zcash 투명 주소**(t1로 시작)를 복사하세요. 현재 encrypt.trade에서는 ZEC에 거래정보 보호 주소나 통합 주소를 사용할 수 없습니다. 계속 진행하기 전에 seed phrase를 안전하게 보관하세요.


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  4단계: 스왑
**encrypt.trade**로 돌아가 **Swap**으로 이동하세요. **eSOL/eUSDC -> ZEC**를 선택하고 ZODL 투명 주소를 붙여 넣은 다음, 세부 정보를 확인하고 확정하세요.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents**가 크로스체인 전송을 처리해 **ZEC**를 ZODL 지갑으로 보냅니다. 몇 분 정도 걸릴 수 있습니다. NEAR Intents에서는 크로스체인 스왑에 최대 15분이 걸릴 수 있다고 안내합니다.



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  5단계: ZEC에 거래정보 보호 적용
ZEC가 도착하면 ZODL의 **Shield** 옵션을 사용해 [거래정보 보호 구역](/using-zcash/shielded-pools)으로 옮기세요. 그때까지는 누구나 잔액을 확인할 수 있는 투명 주소에 보관됩니다. 거래정보 보호를 적용하면 이후의 활동은 보호되지만, 수신 전송과 거래정보 보호 적용 거래는 체인에 계속 표시됩니다. 링크를 항상 확인하고, 주소를 재사용하지 말고, 먼저 소액으로 테스트하세요.

---

###  관련 서비스와 도움을 받을 수 있는 곳
- **encrypt.trade**는 JMD Labs Inc.가 운영하는 앱입니다. [개인정보 보호정책](https://encrypt.trade/privacy)에 따르면 IP 주소, 브라우저와 기기 정보 등의 기술 데이터를 수집하고, 스왑 전에 지갑 주소, 최근 내역과 잔액을 규정 준수 서비스 제공업체에 전송합니다. 또한 최대 5년 동안 로그와 자금세탁 방지 심사 결과를 보관할 수 있습니다. [이용 약관](https://encrypt.trade/terms)에서는 위치를 숨기기 위해 VPN이나 프록시를 사용하는 것을 금지합니다. 지원 문의: help@encifher.io 또는 앱에서 연결되는 [Telegram 그룹](https://t.me/+ZWHGMW4ZHXQwYTZl)을 이용하세요.
- **NEAR Intents**는 크로스체인 단계를 처리하고 ZEC를 전송합니다. [1Click API 이용 약관](https://docs.near-intents.org/security-compliance/terms-of-service)과 near.com/privacy의 개인정보 보호정책을 확인하고, [NEAR Intents Explorer](https://explorer.near-intents.org)에서 스왑을 추적하세요. 도움이 필요하면 [NEAR Intents Telegram](https://t.me/near_intents)에서 문의하세요.

약관과 지원 주소는 변경될 수 있으므로, 큰 금액을 스왑하기 전에 최신 내용을 확인하세요. 더 넓은 맥락은 [비커스터디형 거래소](/using-zcash/non-custodial-exchanges)에서 확인하세요.

---

**Solana**, **Zcash**, **NEAR Intents**를 결합하면 **encrypt.trade**를 통해 SOL 또는 USDC에서 ZEC로 빠르게 이동할 수 있습니다. Solana에서 금액을 숨기지만 처음부터 끝까지 프라이버시를 보장하지는 않으므로, ZEC가 도착하면 거래정보 보호를 적용하세요.
