# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash로 로그인하기

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>중급 - 7분</span>

## TL;DR

- 비밀번호를 사용하는 대신, Zcash 주소를 자신이 제어하고 있음을 증명해서 로그인합니다
- 현재 두 가지 방식이 사용됩니다: **챌린지에 서명하기**, 또는 **메모에 코드를 넣은 실드 결제 보내기**
- 실드 주소는 잔액과 거래 내역을 숨기므로, 제어권을 증명해도 당신의 금융 정보는 노출되지 않습니다
- 이 패턴은 아직 초기 단계입니다. 아직 비준된 표준은 없으며, 구현들끼리 상호 운용되지 않습니다

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 누구를 위한 것인가요?

- 개인정보를 수집하지 않고 비밀번호 없는 로그인을 구현하고 싶은 개발자
- 모든 사이트에 이메일 주소를 넘기고 싶지 않은 사용자
- 자신의 금융 거래 이력을 계정과 연결하지 않고 로그인하고 싶은 모든 사람

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 문제점

대부분의 로그인 방식은 무언가를 유출합니다:

- **비밀번호와 이메일**은 당신의 신원과 연결된 계정을 만들고, 둘 다 결국 유출 데이터 덤프에 포함되곤 합니다
- **소셜 로그인**은 신원 제공자에게 당신이 어디에 언제 로그인하는지 모두 알려줍니다
- **투명한 체인에서의 지갑 로그인**은 보기보다 더 나쁩니다. 지갑을 연결하는 것만으로도 사이트에 당신의 전체 잔액과 거래 내역이 영구적으로 넘어갈 수 있습니다

보통은 편의성과 정보 노출 사이에서 선택해야 합니다.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> 왜 Zcash인가요?

Zcash는 *제어권 증명*과 *금융 정보 공개*를 분리합니다:

- **실드 주소**는 잔액과 거래 내역을 비공개로 유지하므로, 그것을 보유하고 있음을 증명해도 무엇을 얼마나 보유하고 있는지는 드러나지 않습니다
- **암호화된 메모**는 거래 안에 일회용 로그인 코드를 비공개로 담을 수 있습니다
- **Viewing Key**는 선택적 공개를 가능하게 하므로, 앱은 꼭 필요한 정보에 대해서만 읽기 권한을 받고 그 이상은 받지 않을 수 있습니다

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 작동 방식

현재 두 가지 접근 방식이 등장했습니다. 두 방식 모두 앱이 당신을 위한 안정적인 식별자를 보유하고, 비밀번호는 보유하지 않는다는 점에서 끝납니다.

### 접근 방식 1: 챌린지에 서명하기

1. 앱이 무작위의 일회용 챌린지를 생성합니다
2. 당신의 지갑이 주소 뒤에 있는 키로 그 챌린지에 서명합니다
3. 앱이 서명을 검증하고 로그인시킵니다

아무것도 브로드캐스트되지 않으므로 수수료가 없고 블록을 기다릴 필요도 없습니다. 관련 명세는 [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304)이며, 아직 초안 상태이기 때문에 메시지 서명에 대한 지갑 지원은 제각각입니다.

### 접근 방식 2: 실드 결제로 증명하기

1. 앱이 일회용 코드를 생성하고 결제 요청을 표시합니다
2. 당신은 그 코드를 메모에 넣어 소액의 실드 거래를 보냅니다
3. 앱이 메모를 감시하다가 코드를 일치시키고 로그인시킵니다

이 방식은 오늘날 이미 메모를 지원하는 지갑들과 함께 작동하며, 그런 지갑은 대부분입니다. 대신 네트워크 수수료가 들고 확인을 기다려야 한다는 대가가 있습니다.

### 주소를 비공개로 유지하기

앱은 당신을 인식하기 위해 반드시 당신의 주소를 저장할 필요는 없습니다. 어떤 구현은 주소를 애플리케이션 전용 값과 함께 해시해서, 같은 사용자를 각 사이트마다 서로 다른 안정적인 식별자로 보이게 합니다. 이렇게 하면 사이트들이 정보를 대조해 당신의 계정들을 연결하는 것을 막을 수 있습니다.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 트레이드오프

이 위에 무언가를 구축하거나 실제로 의존하기 전에 이해해둘 가치가 있습니다.

| | 서명된 챌린지 | 실드 결제 |
|---|---|---|
| 비용 | 무료 | 로그인마다 네트워크 수수료 |
| 속도 | 즉시 | 확인을 기다림 |
| 지갑 지원 | 제한적, ZIP 304는 초안 | 폭넓음, 메모만 필요 |
| 체인 기록 남김 | 아니오 | 예, 거래가 존재함 |

공통된 한계:

- **기본적으로 계정 복구가 없습니다.** 복구 경로를 앱이 따로 설계하지 않는 한, 키를 잃으면 계정도 잃습니다
- **주소 재사용은 당신을 연결할 수 있습니다.** 여러 사이트에서 같은 주소를 사용하면 추적 문제가 다시 생기므로, 애플리케이션 전용 식별자가 중요합니다
- **비준된 표준이 없습니다.** 각 프로젝트마다 자체 방식이 있으므로, 한쪽을 위해 만든 로그인은 다른 쪽에서는 작동하지 않습니다
- **그 자체로 익명성을 보장하지는 않습니다.** 앱으로부터 당신의 금융 정보는 숨기지만, 앱은 당신이 로그인한 뒤 무엇을 하는지는 여전히 프로파일링할 수 있습니다

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 피해야 할 흔한 실수

- 챌린지 코드를 재사용하는 것. 모든 코드는 일회용이어야 하고 빨리 만료되어야 하며, 그렇지 않으면 탈취된 코드가 재사용 공격에 악용될 수 있습니다
- 로그인할 때 의미 있는 금액을 보내도록 사용자에게 요구하는 것. 결제는 증명 수단이므로 금액은 아주 적어야 합니다
- 애플리케이션 전용 식별자로 충분한데도 원시 주소를 저장하는 것
- 메시지 서명이 어디서나 작동한다고 가정하는 것. 사용자가 실제로 가지고 있는 지갑을 확인하세요
- 사후적으로 메모를 비밀처럼 취급하는 것. 메모는 발신자가 행동했음을 증명할 뿐, 비밀번호는 아닙니다

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 이를 탐구하는 프로젝트들

다음 프로젝트들은 [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon)의 **Zcash Login** 트랙을 위해 만들어졌습니다. 완성된 제품이라기보다 실험에 가깝고, 같은 아이디어도 얼마나 다르게 구현될 수 있는지 보여줍니다.

- **ZecAuth** - 다른 생태계에서 WalletConnect가 하는 역할과 비슷한 방향의 Zcash용 지갑 연결 프로토콜입니다. 앱은 QR 코드나 `zecauth://` 링크를 표시하며, 그 안에는 챌린지와 함께 로그인, 결제 요청, 보기 권한 같은 요청 기능이 담깁니다. 거래도 없고, 수수료도 없고, 체인 상호작용도 없습니다. 코드와 함께 문서화된 프로토콜 명세도 제공합니다
- **ZShield** - 실드 주소를 W3C DID와 OpenID Connect 신원으로 바꿉니다. 브라우저가 키쌍을 생성하고, 서버는 ZIP 304 스타일 인터페이스를 통해 nonce를 발급하며, 지갑이 그것에 서명하고, 서버는 JWT를 반환합니다. 결과가 OIDC와 호환되므로 기존 앱도 별도 맞춤 통합 없이 이를 사용할 수 있습니다
- **ZecPass** - 서명된 메모를 통해 소유권을 증명하며, 앱이 사용자의 주소를 전혀 알 수 없도록 설계되었습니다. 애플리케이션 범위의 해시를 안정적인 식별자로 파생하고, 챌린지를 일회용이면서 시간 제한이 있도록 유지하며, 바로 가져다 쓸 수 있는 React 버튼과 Node 검증 라이브러리를 함께 제공합니다
- **Portal** - 메모에 일회용 코드를 넣은 실드 거래를 보내 로그인하는 방식이며, 메인넷에서 동작합니다. 같은 흐름을 유료 콘텐츠 잠금 해제와 링크를 통한 송금 및 수금에도 재사용합니다
- **ZcashMe** - 실드 결제를 신원 증명의 수단으로 사용하며, 노트북에서 로그인할 때 브라우저 확장이 필요 없도록 데스크톱과 모바일 사이의 간극 해소에 초점을 맞춥니다
- **ZBooks** - 회계 및 지급 도구로, Zcash로 로그인하기를 그 자체가 제품이라기보다 재사용 가능한 인증 기본 요소로 다루며, Unified Full Viewing Key를 통해 자금 데이터도 읽어옵니다

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 관련 페이지

- [메모](/using-zcash/memos) - 암호화된 메모가 어떻게 작동하는지, 그리고 로그인 코드가 그 안에서 어떻게 전달되는지
- [Viewing Key](/zcash-tech/viewing-keys) - 지출 권한을 넘기지 않고 읽기 전용 접근 권한 부여하기
- [실드 ZEC로 기록 보관하기](/zcash-use-cases/keeping-records-with-shielded-zec) - 같은 선택적 공개 아이디어를 회계에 적용한 사례
- [신원을 연결하지 않고 돈 보내기](/zcash-use-cases/send-money-without-linking-identity) - 왜 주소 재사용이 프라이버시를 약화시키는지

<br/>
