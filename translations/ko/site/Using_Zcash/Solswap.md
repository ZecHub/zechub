# **Phantom Wallet에서 ZEC 스왑하는 방법**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

이미 Solana에서 ZEC을(를) 보유하고 있나요(예: 보유자에게 ZEC을(를) 지급하는 토큰을 통해)? 스왑하지 마세요. [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded)을(를) 사용하여 해당 토큰을 보호된 Zcash wallet로 옮기세요.

---

## **네이티브 ZEC인가요, ZEC 토큰인가요?**

Phantom에서 말하는 "ZEC"은(는) 서로 다른 두 자산을 의미할 수 있으므로, 무엇을 결제하는지 알아두세요.

- **Phantom에 내장된 Swap 버튼**은 Solana(또는 Phantom이(가) 지원하는 다른 네트워크)에서 ZEC의 토큰 표현을 제공합니다. 이는 네이티브 ZEC이(가) 아닙니다. 이는 Phantom 주소에 존재하며, Zcash 보호 기능이 없고, Zcash wallet은 이를 확인하거나 보호할 수 없습니다.
- **네이티브 ZEC**은(는) Zcash 블록체인에만 존재하며 Zcash 주소로 전송됩니다. 이를 얻으려면 Zcash 주소를 요청하는 서비스가 필요합니다. 예를 들어 [ZODL](https://zodl.com) 내 스왑, [DEX 페이지](/dex)의 옵션 중 하나, 또는 solswap.org에서 스왑 후 Zcash wallet으로 출금하는 방법(8단계)이 있습니다.

### 결제 전 확인

- **네트워크:** 수령하는 ZEC은(는) **Zcash** 네트워크에 있어야 합니다. Solana, Ethereum 또는 Base라고 표시되면 토큰입니다.
- **자산:** 네이티브 ZEC에는 토큰 계약 또는 민트 주소가 없습니다. 표시된다면 토큰입니다. Solana에는 유사한 이름의 "ZEC" 토큰도 많으므로 이름만으로 판단하지 마세요. Solana의 OmniBridge 토큰은 `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`이며, 이것 역시 토큰이지 네이티브 ZEC이(가) 아닙니다.
- **주소:** 네이티브 ZEC은(는) `t1`, `u1` 또는 `zs`로 시작하는 Zcash 주소로 전송됩니다. ZEC이(가) Phantom 주소로 전송된다면 토큰을 받는 것입니다.

---

##  **1단계: Swap 인터페이스 열기**
**Phantom 앱**을 실행하고 Phantom 브라우저에서 **[solswap.org](https://solswap.org/)**을 방문하세요. 주소는 직접 입력하세요. 이 사이트는 NEAR Intents에서 실행되며 Zcash 주소로 ZEC을(를) 전송할 수 있습니다.

Phantom 자체의 **Swap** 버튼에도 ZEC이(가) 표시되지만, 이는 네이티브 ZEC이(가) 아니라 위에서 설명한 토큰을 받게 됩니다.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **2단계: 입금을 위한 네트워크와 토큰 선택**
- **출발 네트워크**(예: *Ethereum* 또는 *Solana*)를 선택한 다음 스왑을 위해 입금하세요.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- **SOL, USDT 또는 USDC**와 같은 기본 토큰을 선택하세요.
- **대상 토큰**으로 **ZEC**을(를) 선택하세요.
- 스왑 인터페이스를 통해 Zcash을(를) 이용할 수 있는지 확인하세요.

![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

##  **3단계: 금액 입력 및 견적 검토**
- 스왑하려는 금액을 입력하세요.
- **solswap.org**에 표시된 수령 금액을 사용하세요. 이 경로에는 해당 견적이 적용됩니다.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **4단계: 가스 및 수수료 확인**
- 입금을 승인할 수 있도록 Phantom에 출발 체인의 가스 토큰을 충분히 보유하세요(Solana의 경우 *SOL*, Ethereum의 경우 *ETH*).
- 확인하기 전에 solswap 견적의 수수료 항목을 읽어보세요. Phantom의 내장 Swap에는 자체 수수료 체계가 적용됩니다(과거에는 0.85% Phantom 수수료와 네트워크 가스 및 브리징 수수료). 이 수치는 solswap.org 입금에는 적용되지 않습니다.

---

##  **5단계: 설정 조정(선택 사항)**
solswap.org에서 입금하기 전에 슬리피지와 화면에 표시된 최소 수령 견적을 검토하세요.

대신 Phantom 자체의 **Swap** 시트를 보고 있다면, 이 페이지 상단의 토큰 경로에 있는 것입니다. 이를 닫고 Phantom 브라우저에서 `solswap.org`을(를) 여세요.

---

##  **6단계: 스왑 확인**
- solswap.org에서 모든 스왑 세부 정보를 검토하세요.
- Phantom에서 입금을 확인하세요.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **7단계: 상태 모니터링**
- solswap.org 활동 내역에서 **Completed**로 표시될 때까지 입금을 추적하세요.
- Solana 또는 출발 체인의 거래 ID는 해당 활동 행과 그 네트워크의 체인 탐색기에서 확인할 수 있습니다.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **8단계: 네이티브 ZEC을(를) Zcash Wallet으로 출금**
스왑 후 ZEC은(는) solswap.org **Account** 잔액에 표시됩니다. 아직 Zcash 네트워크에 있지 않으며, Phantom에도 없습니다.

1. [directory](/wallets)에서 **Ironwood: Ready**로 표시된 Zcash wallet을 여세요. wallet에서 보호되었다고 표시하는 `u1`을(를) 복사하세요. `t1`도 사용할 수 있지만, 해당 입금은 보호할 때까지 공개됩니다.
2. solswap.org에서 **Account**로 이동하여 **Withdraw**를 탭하세요. **ZEC**을(를) 선택하고, 네트워크를 **Zcash**로 설정한 뒤 주소를 붙여넣고 확인하기 전에 첫 번째와 마지막 문자를 확인하세요.
3. **Received amount**와 **Fee**가 "–"로 유지되고 버튼이 작동하지 않는다면 잔액을 잃은 것이 아닙니다. 잔액은 Phantom 키 아래 NEAR Intents에 있습니다. [near.com](https://near.com)에서 마무리하세요. 동일한 Phantom wallet으로 로그인하고 **Move legacy assets**를 연 다음, ZEC 행에서 **Move**가 아닌 **Withdraw**를 탭하고, 네트워크를 **Zcash**로 설정한 뒤 동일한 `u1`을(를) 붙여넣으세요. Phantom은(는) **Sign Message**를 요청합니다. 요청이 `near.com`에서 왔고 메시지에 `"verifying_contract": "intents.near"`이(가) 명시된 경우에만 확인하세요. 이 해결 방법의 전체 화면은 [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded)에 있습니다.

---

## **다음 단계**
네이티브 ZEC이(가) Zcash wallet에 들어오면 [Using ZEC privately](/guides/using-zec-privately)을(를) 통해 보호 상태로 유지하세요.

Phantom의 Swap 버튼으로 구매한 ZEC 토큰은 Phantom에서 보호할 수 없습니다. 해당 토큰은 Solana의 OmniBridge 자산입니다. [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded)을(를) 사용하여 옮기세요.
