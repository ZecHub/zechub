# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash로 로그인

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>중급 - 7분</span>

## 핵심 요약

- 비밀번호를 사용하는 대신 Zcash 주소를 제어하고 있음을 증명해 로그인합니다.
- 현재 사용되는 방식은 2가지입니다. **챌린지에 서명하기** 또는 **메모에 코드를 넣어 거래정보 보호 결제를 보내기**
- 거래정보 보호 주소는 잔액과 거래 내역을 숨기므로, 제어 권한을 증명해도 금융 정보가 노출되지 않습니다.
- 아직 초기 단계입니다. 비준된 표준이 없으며 구현 방식끼리 호환되지 않습니다.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 대상은 누구인가요?

- 개인 정보를 수집하지 않고 비밀번호 없이 로그인하는 기능을 만들고 싶은 개발자
- 모든 사이트에 이메일 주소를 제공하고 싶지 않은 사용자
- 금융 거래 내역을 계정과 연결하지 않고 로그인하고 싶은 모든 분

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 문제점

대부분의 로그인 방식은 무언가를 노출합니다.

- **비밀번호와 이메일**을 사용하면 신원과 연결된 계정이 만들어지고, 둘 다 결국 유출 데이터에 포함됩니다.
- **소셜 로그인**을 사용하면 신원 제공업체가 어느 사이트에 언제 로그인하는지 알게 됩니다.
- **투명 체인에서 지갑으로 로그인**하는 방식은 겉보기보다 더 심각합니다. 지갑을 연결하면 사이트에 전체 잔액과 거래 내역이 영구적으로 공개될 수 있습니다.

보통 편의성과 정보 공개 중 하나를 선택해야 합니다.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Zcash를 사용하는 이유

Zcash는 *제어 권한 증명*과 *금융 정보 공개*를 분리합니다.

- **거래정보 보호 주소**는 잔액과 거래 내역을 비공개로 유지하므로, 해당 주소를 보유하고 있음을 증명해도 보유한 자산에 관한 정보는 드러나지 않습니다.
- **암호화된 메모**에는 일회용 로그인 코드를 거래 안에 비공개로 담을 수 있습니다.
- **Viewing key**를 사용하면 선택적으로 정보를 공개할 수 있으므로, 앱에는 필요한 정보에 대한 읽기 권한만 제공할 수 있습니다.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 작동 방식

2가지 방식이 등장했습니다. 둘 다 앱에 사용자의 고정 식별자를 저장하고 비밀번호는 사용하지 않습니다.

### 방식 1: 챌린지에 서명하기

1. 앱이 무작위 일회용 챌린지를 생성합니다.
2. 사용자의 지갑이 주소에 연결된 키로 해당 챌린지에 서명합니다.
3. 앱이 서명을 검증하고 로그인시킵니다.

아무것도 네트워크에 전파되지 않으므로 수수료가 없고 블록을 기다릴 필요도 없습니다. 관련 사양은 초안 상태인 [ZIP 304, Sapling 주소 서명](https://zips.z.cash/zip-0304)입니다. 따라서 메시지 서명에 대한 지갑 지원 여부는 지갑마다 다릅니다.

### 방식 2: 거래정보 보호 결제로 증명하기

1. 앱이 일회용 코드를 생성하고 결제 요청을 표시합니다.
2. 사용자가 해당 코드를 메모에 넣어 소액의 거래정보 보호 거래를 보냅니다.
3. 앱이 메모를 확인하고 코드를 대조한 뒤 로그인시킵니다.

대부분의 지갑을 포함해 현재 메모를 지원하는 지갑에서 사용할 수 있습니다. 다만 네트워크 수수료가 들고 확인을 기다려야 합니다.

### 주소를 비공개로 유지하기

앱은 사용자를 알아보기 위해 주소를 저장할 필요가 없습니다. 일부 구현에서는 주소와 앱별 값을 함께 해시하여, 같은 사용자라도 사이트마다 서로 다른 고정 식별자를 사용합니다. 이 방식은 사이트가 정보를 비교해 사용자의 계정을 연결하지 못하게 합니다.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 장단점

이를 기반으로 개발하거나 이용하기 전에 알아두어야 합니다.

| | 서명된 챌린지 | 거래정보 보호 결제 |
|---|---|---|
| 비용 | 무료 | 로그인할 때마다 네트워크 수수료 발생 |
| 속도 | 즉시 | 확인을 기다려야 함 |
| 지갑 지원 | 제한적, ZIP 304는 초안 상태 | 폭넓음, 메모만 있으면 됨 |
| 체인에 기록이 남는지 여부 | 아니요 | 예, 거래가 생성됨 |

공통적인 한계:

- **기본적으로 계정 복구 기능이 없습니다.** 앱에서 복구 절차를 마련하지 않았다면 키를 잃는 순간 계정도 잃게 됩니다.
- **주소를 재사용하면 사용자를 연결할 수 있습니다.** 여러 사이트에서 같은 주소를 사용하면 추적 문제가 다시 발생하므로, 앱별 식별자가 중요합니다.
- **비준된 표준이 없습니다.** 프로젝트마다 방식이 다르므로 한 프로젝트용 로그인은 다른 프로젝트에서 작동하지 않습니다.
- **이 방식만으로 익명성이 보장되지는 않습니다.** 금융 정보는 앱에 숨겨지지만, 앱은 사용자가 로그인한 뒤 어떤 활동을 하는지 계속 파악할 수 있습니다.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 피해야 할 흔한 실수

- 챌린지 코드를 재사용합니다. 코드를 캡처한 사람이 다시 사용할 수 없도록 각 코드는 일회용이어야 하며 빠르게 만료되어야 합니다.
- 로그인에 상당한 금액을 보내도록 요구합니다. 결제는 증명 수단이므로 금액은 아주 적어야 합니다.
- 앱별 식별자로 같은 목적을 달성할 수 있는데도 원본 주소를 저장합니다.
- 모든 곳에서 메시지 서명이 작동한다고 가정합니다. 사용자가 실제로 사용하는 지갑을 확인해야 합니다.
- 메모가 전송된 뒤에도 비밀이라고 여깁니다. 메모는 발신자가 특정 행동을 했다는 점을 증명할 뿐, 비밀번호는 아닙니다.

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 이 방식을 살펴보는 프로젝트

이 프로젝트들은 [ZecHub 해커톤 3.0](https://zechub.wiki/hackathon)의 **Zcash 로그인** 트랙을 위해 만들어졌습니다. 완성된 제품이라기보다 실험적인 프로젝트이며, 같은 아이디어를 얼마나 다양하게 구현할 수 있는지 보여줍니다.

- **ZecAuth** - 다른 생태계의 WalletConnect와 비슷한 방식으로 Zcash용 지갑 연결 프로토콜을 제공합니다. 앱은 챌린지와 함께 로그인, 결제 요청, 조회 권한 등 요청하는 기능을 담은 QR 코드 또는 `zecauth://` 링크를 표시합니다. 거래도 수수료도 체인 상호작용도 없습니다. 코드와 함께 문서화된 프로토콜 사양을 제공합니다.
- **ZShield** - 거래정보 보호 주소를 W3C DID와 OpenID Connect 신원으로 변환합니다. 브라우저가 키 쌍을 생성하고, 서버가 ZIP 304 스타일 인터페이스를 통해 논스를 발급하면 지갑이 이에 서명하고 서버가 JWT를 반환합니다. 결과가 OIDC와 호환되므로 기존 앱은 별도의 통합 작업 없이 이를 사용할 수 있습니다.
- **ZecPass** - 서명된 메모를 통해 소유권을 증명하며, 앱이 사용자의 주소를 전혀 알 수 없도록 설계되었습니다. 안정적인 식별자로 사용할 앱별 해시를 도출하고, 챌린지를 일회용으로 설정해 유효 시간을 제한합니다. 바로 사용할 수 있는 React 버튼과 Node 검증 라이브러리도 제공합니다.
- **Portal** - 메모에 일회용 코드를 넣은 거래정보 보호 거래를 메인넷에서 보내 로그인합니다. 같은 절차를 유료 콘텐츠 잠금 해제와 링크를 통한 송금 및 수금에도 사용합니다.
- **ZcashMe** - 거래정보 보호 결제를 신원 증명으로 사용하며, 노트북에서 로그인할 때 브라우저 확장 프로그램이 필요하지 않도록 데스크톱에서 모바일로 이어지는 사용 경험에 중점을 둡니다.
- **ZBooks** - Zcash 로그인을 제품 자체가 아니라 재사용 가능한 인증 요소로 다루는 회계 및 지급 도구이며, Unified Full Viewing Key를 통해 공동 기금 데이터를 읽습니다.

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 관련 페이지

- [메모](/using-zcash/memos) - 암호화된 메모의 작동 방식과 로그인 코드가 메모에 담기는 방식
- [Viewing Key](/zcash-tech/viewing-keys) - 자금 사용 권한을 넘기지 않고 읽기 전용 접근 권한을 제공하는 방법
- [거래정보 보호 ZEC](/zcash-use-cases/keeping-records-with-shielded-zec)로 기록 관리하기 - 회계에 적용되는 동일한 선택적 공개 아이디어
- [신원을 연결하지 않고 송금하기](/zcash-use-cases/send-money-without-linking-identity) - 주소 재사용이 프라이버시를 약화하는 이유

<br/>
