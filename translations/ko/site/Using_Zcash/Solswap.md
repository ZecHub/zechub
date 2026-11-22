# **ZEC을 Phantom 지갑에서 스왑하는 방법**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

이미 Solana에서 ZEC을 보유하고 계신가요(예를 들어 보유자에게 ZEC을 지급하는 토큰에서 받은 경우)? 스왑하지 마세요. 해당 토큰을 [을 사용해 거래정보 보호 기능이 있는 Zcash 지갑으로 옮기세요. ZEC을 Solana에서 받으셨나요? 거래정보 보호 기능이 있는 Zcash](/using-zcash/solana-zec-to-shielded)으로 옮기세요.

---

## **네이티브 ZEC인가요, ZEC 토큰인가요?**

Phantom에서 “”ZEC””는 서로 다른 2가지 자산을 뜻할 수 있으므로, 무엇을 결제하는지 확인하세요.

- **Phantom의 내장 스왑(Swap) 버튼**을 사용하면 Solana(또는 Phantom가 지원하는 다른 네트워크)에서 ZEC을 나타내는 토큰(Token)을 받을 수 있습니다. 이는 네이티브 ZEC이 아닙니다. 사용자의 Phantom 주소(Address)에 있으며, Zcash 거래정보 보호(shielded) 기능은 없고, Zcash 지갑(Wallet)에서는 이를 확인하거나 거래정보 보호 기능을 적용할 수 없습니다.
- **네이티브 ZEC**은 Zcash 블록체인(Blockchain)에만 존재하며 Zcash 주소로 전송됩니다. 이를 받으려면 사용자의 Zcash 주소를 요청하는 서비스를 이용해야 합니다. 예를 들어 [ZODL](https://zodl.com)에서 스왑하거나, [DEX 페이지](/dex)의 옵션 중 하나를 이용하거나, solswap.org를 이용한 다음 사용자의 Zcash 지갑으로 출금하면 됩니다(8단계).

### 결제 전에 확인하세요

- **네트워크:** 받는 ZEC은 **Zcash** 네트워크에 있어야 합니다. Solana, Ethereum 또는 Base이라고 표시되면 토큰입니다.
- **자산:** 네이티브 ZEC에는 토큰 컨트랙트나 민트 주소가 없습니다. 표시된다면 토큰입니다. Solana에는 비슷하게 생긴 “”ZEC”” 토큰도 많으므로, 이름만 보고 판단하지 마세요. Solana의 OmniBridge 토큰은 `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`입니다. 이 역시 토큰이지 네이티브 ZEC이 아닙니다.
- **주소:** 네이티브 ZEC은 Zcash 주소로 전송되며, 주소는 `t1`, `u1` 또는 `zs`로 시작합니다. ZEC이 Phantom 주소로 전송된다면 토큰을 받는 것입니다.

---

##  **1단계: 스왑 인터페이스 열기**
**Phantom 앱**을 실행하고 Phantom 브라우저에서 **[solswap.org](https://solswap.org/)**로 이동하세요. 주소를 직접 입력하세요. 이 사이트는 NEAR Intents에서 실행되며 ZEC을 Zcash 주소로 보낼 수 있습니다.

Phantom 자체 **스왑** 버튼에도 ZEC이 표시되지만, 앞서 설명한 토큰을 받게 되며 네이티브 ZEC은 받을 수 없습니다.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **2단계: 입금할 네트워크와 토큰 선택하기**
- **출발 네트워크**(예: *Ethereum* 또는 *Solana*)를 선택한 다음 스왑할 자산을 입금하세요.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- **SOL, USDT 또는 USDC** 같은 기준 토큰을 선택하세요.
- **ZEC**을 **도착 토큰**으로 선택하세요.
- 스왑 인터페이스에서 Zcash을 이용할 수 있는지 확인하세요.

![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **3단계: 금액 입력 및 견적 확인**
- 스왑할 금액을 입력하세요.
- **solswap.org**에 표시된 수령 금액을 사용하세요. 이 경로에는 해당 견적이 적용됩니다.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **4단계: 가스 및 수수료 확인**
- 입금을 승인할 수 있도록 Phantom에 출발 체인의 가스 토큰을 충분히 보유하세요(*Solana에서는 SOL*, Ethereum에서는 *ETH*).
- 확인하기 전에 solswap 견적의 수수료 항목을 읽어보세요. Phantom의 내장 스왑은 자체 수수료 체계를 사용합니다(과거에는 0.85%의 Phantom 수수료에 네트워크 가스비와 브리지 수수료가 추가되었습니다). 이 수치는 solswap.org 입금에는 적용되지 않습니다.

---

##  **5단계: 설정 조정(선택 사항)**
solswap.org에서 입금하기 전에 해당 화면의 슬리피지와 견적상 최소 수령액을 확인하세요.

대신 Phantom 자체 **스왑** 화면을 보고 있다면, 이 페이지 상단에서 설명한 토큰 경로를 이용 중인 것입니다. 화면을 닫고 Phantom 브라우저에서 `solswap.org`을 여세요.

---

##  **6단계: 스왑 확인**
- solswap.org에서 스왑 세부 정보를 모두 확인하세요.
- Phantom에서 입금을 확인하세요.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **7단계: 상태 확인**
- solswap.org 활동 내역에서 입금 상태가 **완료**로 표시될 때까지 추적하세요.
- Solana 또는 출발 체인 거래 ID는 해당 활동 내역 행과 그 네트워크의 체인 탐색기에서 확인할 수 있습니다.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **8단계: 네이티브 ZEC을 Zcash 지갑으로 출금하기**
스왑이 끝나면 solswap.org의 **계정** 잔액에 ZEC이 표시됩니다. 아직 Zcash 네트워크에 있는 것도 아니고, Phantom에 들어온 것도 아닙니다.

1. [directory](/wallets)에서 **Ironwood: 사용 가능**으로 표시된 Zcash 지갑을 여세요. 지갑에서 거래정보 보호 주소로 표시하는 `u1`을 복사하세요. `t1`도 사용할 수 있지만, 거래정보를 보호하기 전까지 입금 내역은 공개됩니다.
2. solswap.org에서 **계정**으로 이동해 **출금**을 누르세요. **ZEC**를 선택하고 네트워크를 **Zcash**으로 설정한 뒤 주소를 붙여 넣고 확인 전에 앞부분과 끝부분의 문자를 확인하세요.
3. **수령 금액**과 **수수료**가 “”–””로 계속 표시되고 버튼이 작동하지 않아도 잔액이 사라진 것은 아닙니다. 잔액은 NEAR Intents에서 사용자의 Phantom 키로 관리됩니다. [near.com](https://near.com)에서 절차를 마치세요. 동일한 Phantom 지갑으로 로그인하고 **기존 자산 이동**을 연 다음 ZEC 행에서 **이동**이 아니라 **출금**을 누르세요. 네트워크를 **Zcash**으로 설정하고 동일한 `u1`을 붙여 넣으세요. Phantom에서 **메시지 서명**을 요청합니다. 요청이 `near.com`에서 왔고 메시지에 `"verifying_contract": "intents.near"`이 명시된 경우에만 확인하세요. 이 우회 방법의 전체 화면은 [ZEC을 Solana에서 받으셨나요? 거래정보 보호 기능이 있는 Zcash](/using-zcash/solana-zec-to-shielded)으로 옮기세요.

---

## **다음 단계**
네이티브 ZEC이 Zcash 지갑에 들어오면 [ZEC을 비공개로 사용하기](/guides/using-zec-privately)를 통해 거래정보 보호 상태를 유지하세요.

Phantom의 스왑 버튼으로 구매한 ZEC 토큰은 Phantom에서 거래정보를 보호할 수 없습니다. 해당 토큰은 Solana의 OmniBridge 자산입니다. [ZEC을 Solana에서 받으셨나요? 거래정보 보호 기능이 있는 Zcash](/using-zcash/solana-zec-to-shielded)으로 옮기세요.
