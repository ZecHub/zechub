# Ledger Shielded ZEC 사용자 가이드

2026년 9월 23일, Ledger는 Ledger Wallet Desktop에 네이티브 shielded ZEC를 추가했습니다. 이제 하나의 Zcash 계정에서 투명 잔액과 Zcash의 Ironwood 풀에 있는 비공개 잔액을 모두 보유할 수 있습니다. 비공개 키는 Ledger에 그대로 유지되며, 모든 거래는 기기에서 검토 및 서명됩니다.

**데스크톱 전용.** Ledger의 발표에 따르면 shielded ZEC는 "Ledger Wallet Desktop에서만 사용할 수 있습니다. 현재 모바일 지원은 제공되지 않지만 곧 출시될 예정입니다." 데스크톱 앱에도 동일한 안내가 표시됩니다. 2026년 10월 15일 확인.

## 준비

- Zcash 앱을 실행하는 Ledger 기기: Nano S Plus, Nano X, Stax 또는 Flex. 현재 Zcash 앱은 기존 Nano S용으로 제작되지 않았습니다.
- [ledger.com](https://www.ledger.com)에서만 다운로드한 Ledger Wallet Desktop 4.21 이상. 이 가이드에서는 버전 4.24.0을 사용했습니다.
- Ledger에 설치된 최신 Zcash 앱(이 가이드 작성 당시 3.9.4).
- 테스트에 사용할 소량의 ZEC. 아래 모든 단계는 메인넷에서 0.001 ZEC로 수행했습니다. 각 거래에는 소액의 네트워크 수수료가 발생합니다(테스트에서는 0.00015 ZEC).
- 24개 단어 복구 문구는 종이에 보관하세요. 절대 컴퓨터에 입력하거나 공유하지 마세요.

## 단계별 가이드(Ledger Wallet Desktop)

**1. Zcash 앱 설치 또는 업데이트**
- Ledger Wallet을 열고 Ledger를 연결 및 잠금 해제한 다음 **My Ledger**를 엽니다. 기기에서 연결을 허용하세요.
- 앱 카탈로그에서 **Zcash**를 검색한 뒤 **Install**을 클릭합니다. 이미 설치되어 있다면 **Update**를 클릭하세요.
- Ledger에서 Zcash 앱을 엽니다. 화면에 "Zcash app is ready"라고 표시됩니다. 오른쪽으로 스크롤하여 **App info**에서 버전을 확인하세요.

**2. Zcash 계정 추가**
- Ledger Wallet에서 **Add account**를 선택합니다. **Select asset**에서 Zcash를 검색하고 래핑 토큰(예: Binance-Peg Zcash Token)이 아닌 **Zcash (ZEC)**를 선택하세요.
- Ledger에서 Zcash 앱을 연 상태로 있으면 Ledger Wallet이 계정을 찾습니다. **Select the accounts you want to add** 아래에서 선택하고 **Confirm**을 클릭하세요.
- 계정 페이지에는 **Available balance**, **Transparent balance**, **Private balance** 및 **Enable shielded** 버튼이 표시됩니다.

![데스크톱 전용 안내, 투명 잔액과 비공개 잔액, “Enable shielded” 버튼을 표시하는 Ledger Wallet Desktop의 Zcash 계정](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. 비공개 잔액 활성화**
- **Enable shielded**를 클릭합니다. **Enable Zcash private balance** 창에는 Birthday, UFVK, Device, Confirmation의 네 단계가 있습니다.
- **Birthday:** 새 계정의 경우 생일 블록 높이를 오늘 날짜로 유지하세요. 과거에 shielded ZEC를 받은 사실을 알고 있는 경우에만 "This account received shielded ZEC in the past"를 선택하세요. 블록 0부터 스캔하면 매우 오래 걸릴 수 있습니다.
- **UFVK 및 Device:** Ledger Wallet이 Ledger에 Unified Full Viewing Key(UFVK) 내보내기를 요청합니다. 기기 화면을 읽고 승인하세요. "Device connection lost"가 표시되면 Zcash 앱이 열려 있는지 확인하고 신속히 승인한 뒤 **Retry**를 클릭하세요.
- **UFVK successfully imported**가 표시되면 **Start sync**를 클릭합니다. 동기화가 완료되면 버튼이 "Last sync" 시간이 표시된 **Update balance**로 바뀝니다.
- 뷰잉 키는 컴퓨터에 유지됩니다. 이 키로 shielded 자금을 찾을 수는 있지만 사용할 수는 없습니다.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Ledger에서 ZEC를 받고 두 주소를 모두 확인**
- **Receive**를 클릭하고 Zcash 계정을 선택합니다. Ledger Wallet에는 **Address for Zcash 1**(t1으로 시작하는 투명 주소)과 **Private address for Zcash 1**(u1으로 시작하는 비공개 주소)이 표시됩니다. 이전 주소도 계속 유효합니다.
- Ledger에는 "Verify Zcash addresses"가 표시되고, 이어서 두 페이지에 걸친 **Private address**, 그다음 **Public Address**가 표시됩니다. 어느 주소를 공유하기 전에 모든 문자를 화면과 비교한 후 기기에서 확인하세요.
- 비공개 주소를 우선 사용하고, 송금인이 다른 방식을 지원하지 않을 때만 투명 주소를 사용하세요.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. 투명 ZEC를 비공개 잔액으로 이동**
- **Send**를 클릭합니다. **Self transfer**에서 **Send to private balance**를 선택하세요.
- 금액을 입력하거나 25%, 50%, 75% 또는 **Max**를 사용하세요. 네트워크 수수료를 확인한 뒤 **Review**를 클릭합니다.
- Ledger에서 다음 항목을 차례로 확인하세요. "Review transaction to send ZEC", "Transfer from public to private address", 금액, 두 페이지에 표시되는 출력 주소, 수수료 및 만료 높이. 출력 주소가 4단계의 비공개 주소와 일치하는지 확인한 뒤 **Sign transaction**에서 두 버튼을 모두 누르세요.
- Ledger Wallet에 **Transaction sent**가 표시됩니다. 거래 세부정보에서 유형은 **Private (Ironwood)**로 표시됩니다.
- Ledger Wallet은 자체 전송이 shielded 자금과 공개 주소를 연결한다고 안내합니다. 비공개 주소로 직접 받으면 연결되지 않습니다.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- 거래가 확인된 후 투명 잔액은 감소하고 비공개 잔액은 증가합니다. 새 shielded 자금은 사용할 만큼 충분한 확인 횟수를 얻을 때까지 "maturing"으로 표시됩니다.

![실드 적용 후 Zcash 계정: 투명 잔액이 줄고 비공개 잔액이 늘어나며 성숙 중으로 표시됨](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. 비공개 잔액에서 ZEC 보내기**
- 비공개 잔액을 사용할 수 있게 되면 **Send**를 클릭하고 **Transfer from**을 **Private balance**로 설정합니다.
- 수신자 주소를 붙여넣고 금액을 입력하세요. 수신자만 읽을 수 있는 최대 512바이트의 암호화된 **Memo (optional)**를 추가할 수 있습니다.
- Ledger에서 수신자, 금액 및 수수료를 검토한 다음 **Sign transaction**에서 두 버튼을 모두 누르세요.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## 알아두면 좋은 점

- Ledger에서 shielded ZEC는 현재 데스크톱 전용입니다(2026년 10월 15일 확인).
- Ledger Wallet의 비공개 잔액은 Ironwood 풀을 사용합니다.
- Ledger는 세무 자문가와 거래 내역에 대한 읽기 전용 접근 권한을 공유할 수 있다고 말합니다. 뷰잉 키를 가진 사람은 누구나 shielded 내역을 볼 수 있으므로, 의도한 경우에만 공유하세요.
- 이 가이드의 기기 화면은 Ledger의 Speculos 에뮬레이터(Nano S Plus)에서 Zcash 앱 3.9.4를 실행하고, Zcash 메인넷에서 Ledger Wallet Desktop 4.24.0에 연결하여 캡처했습니다. 실제 Ledger도 동일한 앱을 실행하며 같은 화면을 표시합니다.

## 추가 도움말

- [Ledger Wallet의 새로운 기능: 네이티브 Shielded Zcash 지원](https://www.ledger.com/blog-native-shielded-zcash-support)(Ledger의 발표)
- [Ledger 도움말 센터](https://support.ledger.com)
- [ZecHub Wallets 페이지](/using-zcash/wallets)
- ZecHub의 [Shielded Pools](/using-zcash/shielded-pools) 및 [Viewing Keys](/zcash-tech/viewing-keys)
- 또 다른 하드웨어 지갑 옵션: [Keystone Zashi 사용자 가이드](/guides/keystone-zashi)
