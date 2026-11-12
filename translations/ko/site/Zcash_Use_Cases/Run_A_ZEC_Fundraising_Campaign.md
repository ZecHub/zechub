# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> ZEC 모금 캠페인 운영하기

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  중급 - 10분
</span>

## TL;DR

- 캠페인 전용 지갑 계정과 실드 주소를 사용하여 다른 자금과 절대 섞이지 않게 하세요
- 권장 금액과 메모가 미리 입력된 결제 요청 링크 또는 QR 코드를 공유하세요
- 기부자를 노출하지 않고 진행 상황을 보여주세요. 직접 총액을 게시하거나 신뢰할 수 있는 검토자 한 명에게 viewing key를 제공하세요
- viewing key는 하나의 주소가 아니라 전체 계정을 대상으로 하므로, 캠페인에는 전용 계정이 필요합니다
- 약속한 날짜에 캠페인을 종료하고 자금의 사용처를 공개하세요

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 누구를 위한 가이드인가요?

- 하나의 목표를 위해 자금을 모으는 커뮤니티 그룹, 오픈소스 프로젝트 및 크리에이터
- ZEC에서 연말 또는 긴급 모금 활동을 진행하는 비영리단체
- 모든 기부를 공개하지 않으면서도 기부자가 캠페인을 신뢰하길 원하는 모든 사람

미국 비영리단체라면 영수증 및 IRS 양식에 관해 먼저 [미국 비영리단체로서 비공개 기부 받기](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)를 읽어보세요.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 문제점

대부분의 암호화폐 모금은 기부자가 총액이 늘어나는 모습을 볼 수 있도록 투명 주소를 사용합니다. 하지만 이 방식은 모든 기부와 금액, 도착 시점, 그리고 자금이 다음에 어디로 이동하는지를 보여줍니다. 의도적으로 비공개 기부를 하는 기부자는 이러한 프라이버시를 잃게 되며, 누구나 캠페인 이후 자금의 흐름을 추적할 수 있습니다.

완전히 비공개인 캠페인에는 반대의 문제가 있습니다. 기부자는 목표가 달성되었는지 또는 자금이 어떻게 사용되었는지 알 수 없습니다.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 왜 Zcash인가요?

실드된 ZEC를 사용하면 각 기부는 온체인에서 비공개로 유지되며, 총액, 진행률 표시줄 또는 검토자를 위한 읽기 전용 접근 권한 중 무엇을 보여줄지 직접 결정할 수 있습니다. 기부자는 [메모](/using-zcash/memos)에 메시지를 남길 수 있고, 누가 기부했는지 다른 사람이 보지 못하는 상태에서 감사 인사를 전할 수 있습니다.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 필요한 것

- 별도 계정을 만들 수 있는 실드된 [지갑](/wallets)
- 웹사이트, 소셜 게시물 또는 포럼 스레드 형태의 캠페인 페이지
- 목표, 종료일 및 자금 사용 계획

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 단계별 가이드

### 1단계: 목표와 규칙 정하기

시작하기 전에 다음을 작성하세요:
- 모금 목표 금액과 사용처
- 종료일
- 목표보다 많이 또는 적게 모금했을 때의 처리 방법
- 자금을 관리하는 사람과 지출 승인에 두 명 이상이 필요한지 여부([비공개 커뮤니티 자금고 운영하기](/zcash-use-cases/private-community-treasury) 참고)

캠페인 페이지에 이를 게시하세요. 처음부터 무엇을 할 것인지 밝히는 캠페인은 기부자의 신뢰를 얻습니다.

### 2단계: 캠페인용 별도 계정 만들기

이 캠페인에만 사용할 새 계정을 지갑에서 만들고, 그 계정의 실드 주소를 복사하세요. 캠페인을 분리하면 총액을 쉽게 확인할 수 있으며, 나중에 viewing key를 공유할 경우 특히 중요합니다. viewing key는 전체 계정의 활동을 보여주기 때문입니다([Viewing Keys](/zcash-tech/viewing-keys)).

### 3단계: 결제 요청 링크와 QR 코드 만들기

[결제 요청 URI](/using-zcash/payment-request-uris)는 기부자를 위해 주소, 권장 금액 및 메모를 입력해 주는 `zcash:` 링크입니다. ZecHub의 [결제 요청 생성기](/tools)를 사용해 만든 뒤 링크와 QR 코드로 공유하세요.

"캠페인 이름, 회신처: 이메일 또는 핸들" 같은 메모는 감사 인사나 영수증을 원하는 기부자에게 도움이 됩니다. 페이지에서 메모는 선택 사항임을 알려주세요.

### 4단계: 캠페인 페이지 공개하기

페이지에 다음을 포함하세요:
- 1단계에서 정한 목표, 종료일 및 규칙
- 실드 주소, QR 코드 및 링크
- 실드 지갑에서 기부하는 방법과 지갑을 구할 수 있는 곳
- 진행 상황을 보고할 방법(5단계)

주소는 한 곳에 고정하고, 기부자에게 그곳에서만 복사하도록 알리세요.

### 5단계: 기부자를 노출하지 않고 진행 상황 보고하기

다음 중 하나를 선택하고 페이지에 어떤 방식을 사용할지 명시하세요:
- **직접 총액 게시하기**: 예를 들어 매주 한 번, 캠페인 계정의 지갑 잔액을 기준으로 게시합니다
- **신뢰할 수 있는 검토자 한 명에게 viewing key 제공하기**: 이사회 구성원이나 기부자가 아는 커뮤니티 구성원 등이 총액을 공개적으로 확인합니다. incoming viewing key는 받은 기부를 보여주며, full viewing key는 지출도 보여줍니다([Viewing Keys](/zcash-tech/viewing-keys))

캠페인 페이지에 viewing key를 게시하지 마세요. 이를 가진 사람은 기부자의 연락처 정보를 포함해 모든 기부의 금액과 메모를 볼 수 있습니다.

### 6단계: 기부자에게 감사하기

메모에 연락처를 남긴 기부자에게 답장하세요. 먼저 허락을 받지 않고 기부자의 이름이나 금액을 공개하지 마세요.

### 7단계: 종료 및 보고하기

종료일에는:
- 캠페인이 종료되었음을 알리고 주소와 QR 코드를 제거하거나 업데이트하세요
- 최종 총액과 자금의 사용처를 게시하세요
- viewing key를 공유했다면 검토자에게 최종 총액과 지출을 확인해 달라고 요청하세요

[결제 공개](/zcash-tech/payment-disclosures)를 사용하면 언젠가 viewing key 없이 단일 결제를 증명할 수 있을지 모르지만, 표준은 아직 초안이므로 지금은 이에 의존하지 마세요.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 피해야 할 흔한 실수

- 일상적으로 사용하는 지갑 계정에서 캠페인을 운영하는 것
- 모든 기부자의 금액과 메모를 노출하는 viewing key를 게시하는 것
- 총액을 보여주기 쉽다는 이유로 투명 주소나 거래소 입금 주소를 사용하는 것
- 캠페인이 끝난 뒤에도 주소를 남겨두어, 처리 계획 없는 기부가 계속 도착하게 하는 것
- 자금의 사용처를 전혀 보고하지 않는 것

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 결과

다음을 할 수 있습니다:
- 모든 기부가 온체인에서 비공개로 유지되는 가운데 명확한 목표를 위해 ZEC 모금하기
- 기부자가 신뢰할 수 있는 진행 상황 보여주기
- 기부자를 노출하지 않고 공개 보고서와 함께 캠페인 종료하기

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 관련 자료

- [비공개로 기부받기](/zcash-use-cases/receive-donations-privately) - 캠페인 없이 지속적으로 기부받기
- [비공개 커뮤니티 자금고 운영하기](/zcash-use-cases/private-community-treasury) - 공동 자금을 위한 역할 및 승인
- [결제 요청 URI](/using-zcash/payment-request-uris) - 금액과 메모가 입력된 링크와 QR 코드
- [Viewing Keys](/zcash-tech/viewing-keys) - 검토자를 위한 읽기 전용 접근 권한
- [ZEC에 기부할 곳](/zcash-use-cases/where-to-donate-zec) - 이미 ZEC를 받는 비영리단체

<br/>

## 다음 단계

- [미국 비영리단체로서 비공개 기부 받기](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

처음이라면 여기서 시작하세요: [Zcash란 무엇인가요?](/start-here/what-is-zec-and-zcash)
