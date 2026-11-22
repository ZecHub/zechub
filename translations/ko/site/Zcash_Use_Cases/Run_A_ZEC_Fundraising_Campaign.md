# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> ZEC 모금 캠페인 진행하기

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  중급 - 10분
</span>

## 요약

- 캠페인 전용 지갑 계정과 거래정보 보호 주소를 만들어 다른 자금과 섞이지 않게 하세요.
- 권장 금액과 메모가 미리 입력된 결제 요청 링크나 QR 코드를 공유하세요.
- 후원자를 드러내지 않고 진행 상황을 보여 주세요. 직접 총액을 게시하거나 신뢰할 수 있는 검토자 한 명에게 viewing key를 제공하세요.
- viewing key는 주소 하나가 아니라 계정 전체를 보여 주므로 캠페인 전용 계정을 만드세요.
- 약속한 날짜에 캠페인을 마감하고 자금 사용 내역을 공개하세요.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 대상

- 하나의 목표를 위해 모금하는 커뮤니티 단체, 오픈 소스 프로젝트 및 창작자
- ZEC에서 연말 또는 긴급 모금 활동을 진행하는 비영리 단체
- 모든 후원 내역을 공개하지 않으면서도 후원자가 캠페인을 신뢰하기를 원하는 모든 사람

미국 비영리 단체라면 영수증과 IRS 양식에 관한 내용을 먼저 [미국 비영리 단체로서 비공개 후원금 받기](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)에서 확인하세요.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 문제점

대부분의 암호화폐 모금 활동에서는 투명 주소를 사용해 후원자가 모금액이 늘어나는 모습을 확인할 수 있게 합니다. 하지만 이렇게 하면 모든 후원 내역과 금액, 입금 시점, 자금의 다음 사용처도 공개됩니다. 의도적으로 비공개 후원을 하는 사람은 프라이버시를 잃고, 누구나 캠페인 이후 자금의 흐름을 추적할 수 있습니다.

완전히 비공개로 진행하면 반대로 목표액 달성 여부나 자금 사용처를 후원자가 확인할 수 없습니다.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 왜 Zcash인가요?

거래정보 보호 ZEC를 사용하면 각 후원 내역이 온체인에서 비공개로 유지되며, 공개할 정보를 직접 선택할 수 있습니다. 총액, 진행률 표시줄 또는 검토자를 위한 읽기 전용 접근 권한을 보여 줄 수 있습니다. 후원자는 [메모](/using-zcash/memos)에 메시지를 남길 수 있으며, 누구도 후원자를 알 수 없게 하면서 감사 인사를 전할 수 있습니다.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 준비물

- 별도의 계정을 만들 수 있는 거래정보 보호 [지갑](/wallets)
- 캠페인 페이지: 웹사이트, 소셜 미디어 게시물 또는 포럼 게시글
- 모금 목표, 종료일, 자금 사용 계획

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 단계별 안내

### 1단계: 목표와 규칙 정하기

캠페인을 시작하기 전에 다음 내용을 작성하세요.
- 모금액과 자금의 사용처
- 종료일
- 목표액보다 더 많이 또는 적게 모금한 경우의 처리 방법
- 자금 관리 담당자와 지출 승인에 여러 사람의 동의가 필요한지 여부 ([비공개 커뮤니티 공동 기금 운영하기](/zcash-use-cases/private-community-treasury) 참조)

이 내용을 캠페인 페이지에 게시하세요. 무엇을 할지 미리 밝히는 캠페인일수록 후원자의 신뢰를 얻을 수 있습니다.

### 2단계: 캠페인 전용 계정 만들기

지갑에 새 계정을 만들고 이 캠페인에만 사용한 다음, 해당 계정의 거래정보 보호 주소를 복사하세요. 캠페인을 별도로 관리하면 총액을 쉽게 확인할 수 있습니다. 나중에 viewing key를 공유할 때도 중요합니다. viewing key는 계정 전체의 활동 내역을 보여 주기 때문입니다 ([Viewing Keys](/zcash-tech/viewing-keys)).

### 3단계: 결제 요청 링크와 QR 코드 만들기

[결제 요청 URI](/using-zcash/payment-request-uris)는 주소와 권장 금액, 후원자에게 전할 메모가 입력된 `zcash:` 링크입니다. ZecHub의 [결제 요청 생성기](/tools)로 링크를 만든 다음 링크와 QR 코드로 공유하세요.

“캠페인 이름, 답장 주소: 이메일 또는 사용자 이름”과 같은 메모는 감사 인사나 영수증을 원하는 후원자에게 도움이 됩니다. 메모는 선택 사항이라고 페이지에 안내하세요.

### 4단계: 캠페인 페이지 게시하기

페이지에 다음 내용을 포함하세요.
- 1단계에서 정한 목표, 종료일, 규칙
- 거래정보 보호 주소, QR 코드, 링크
- 거래정보 보호 지갑으로 후원하는 방법과 지갑을 구할 수 있는 곳
- 진행 상황을 알리는 방법 (5단계)

주소를 한 곳에 고정해 두고, 후원자에게는 그곳에서만 주소를 복사하라고 안내하세요.

### 5단계: 후원자를 드러내지 않고 진행 상황 알리기

방법을 하나 선택해 페이지에 명시하세요.
- **직접 총액을 게시하기**. 예를 들어 캠페인 계정의 지갑 잔액을 확인해 일주일에 한 번 게시할 수 있습니다.
- **신뢰할 수 있는 검토자 한 명에게 viewing key 제공하기**. 이사회 구성원이나 후원자가 잘 아는 커뮤니티 구성원에게 맡겨 총액을 공개적으로 확인하게 할 수 있습니다. 수신 viewing key는 받은 후원 내역을 보여 주며, 전체 viewing key는 지출 내역도 보여 줍니다 ([Viewing Keys](/zcash-tech/viewing-keys)).

캠페인 페이지에 viewing key를 게시하지 마세요. viewing key를 가진 사람은 누구나 후원자의 연락처를 포함해 모든 후원 금액과 메모를 볼 수 있습니다.

### 6단계: 후원자에게 감사 인사하기

메모에 연락처를 남긴 후원자에게 답장을 보내세요. 후원자에게 먼저 허락을 구하지 않고 이름이나 후원 금액을 공개하지 마세요.

### 7단계: 캠페인 마감 및 결과 보고하기

종료일에 다음을 진행하세요.
- 캠페인 종료를 알리고 주소와 QR 코드를 삭제하거나 업데이트하세요.
- 최종 모금액과 자금 사용처를 게시하세요.
- viewing key를 공유했다면 검토자에게 최종 금액과 지출 내역을 확인해 달라고 요청하세요.

[결제 공개 기능](/zcash-tech/payment-disclosures)을 통해 언젠가는 viewing key 없이도 단일 결제를 증명할 수 있게 될 수 있습니다. 하지만 아직 표준이 초안 단계이므로 지금은 이에 의존하지 마세요.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 피해야 할 흔한 실수

- 평소 사용하는 지갑 계정으로 캠페인 진행하기
- viewing key를 공개해 모든 후원자의 금액과 메모를 노출하기
- 총액을 보여 주기 쉽다는 이유로 투명 주소나 거래소 입금 주소 사용하기
- 캠페인 종료 후에도 주소를 계속 열어 두어 처리 계획 없이 후원이 들어오게 하기
- 자금 사용 내역을 한 번도 보고하지 않기

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 결과

다음과 같은 일이 가능합니다.
- ZEC 명확한 목표를 위한 모금 활동을 진행하면서 모든 후원 내역을 온체인에서 비공개로 유지하기
- 후원자가 신뢰할 수 있는 방식으로 진행 상황 알리기
- 후원자를 노출하지 않고 캠페인을 마감해 공개 보고서 게시하기

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 관련 문서

- [비공개로 후원금 받기](/zcash-use-cases/receive-donations-privately) - 캠페인 없이 정기적으로 후원금 받기
- [비공개 커뮤니티 공동 기금 운영하기](/zcash-use-cases/private-community-treasury) - 공동 자금의 역할과 승인 절차
- [결제 요청 URI](/using-zcash/payment-request-uris) - 금액과 메모가 입력된 링크와 QR 코드
- [Viewing Keys](/zcash-tech/viewing-keys) - 검토자를 위한 읽기 전용 접근 권한
- [기부할 곳 ZEC](/zcash-use-cases/where-to-donate-zec) - 이미 ZEC을 받는 비영리 단체

<br/>

## 다음 단계

- [미국 비영리 단체로서 비공개 후원금 받기](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

처음 시작하는 분이라면 여기서 시작하세요: [Zcash이란 무엇인가요](/start-here/what-is-zec-and-zcash)
