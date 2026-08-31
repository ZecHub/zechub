<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly 뉴스레터

ZecWeekly는 매주 일요일 아침에 발행되는 뉴스레터입니다. 여기에는 한 주 동안 Zcash 생태계에서 일어난 모든 소식이 포함됩니다. 뉴스는 커뮤니티 구성원들이 매주 선별하며, 관련된 모든 링크가 뉴스레터에 추가됩니다. 뉴스레터 구독은 [여기](https://zechub.substack.com/)에서 해주세요.

## 기여하기

뉴스레터 기여는 한 명의 기여자가 해당 주차의 판을 준비하고, 현재 현상금 또는 조율 스레드를 따르며, 주간 링크 준비가 끝난 뒤 pull request를 제출할 때 가장 원활하게 진행됩니다. ZecHub가 해당 판의 날짜를 게시하거나 확인하기 전에 미래 주차의 판을 제출하지 마세요. 너무 이른 pull request는 주 후반의 업데이트를 놓치거나, 지정된 큐레이터와 충돌하거나, 잘못된 마감일을 사용하는 경우가 많습니다.

### 1. 현재 판 확인하기

작성 시작 전에:

- 현재 뉴스레터 작업이 무엇인지 [ZEC Bounties ](https://bounties.zechub.wiki/)에서 확인하세요.
- 배정될 때까지 기다리세요

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. 리포지토리 포크하기

GitHub가 처음이라면, 다음 워크플로를 사용하세요:

1. [ZecHub repository](https://github.com/ZecHub/zechub)를 엽니다.
2. **Fork**를 클릭하고 자신의 GitHub 계정 아래에 포크를 만듭니다.
3. 자신의 포크에서 해당 판을 위한 새 브랜치를 만듭니다. `digest-may-30-2026`처럼 명확한 브랜치 이름이 도움이 됩니다.
4. pull request의 대상이 기본 리포지토리 `ZecHub/zechub`, 기본 브랜치 `main`이 되도록 확인하세요.

명령줄을 사용한다면, 같은 워크플로는 다음과 같습니다:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME`을 자신의 GitHub 사용자 이름으로 바꾸세요. 위 URL은 예시용 자리표시자이며, 작성된 그대로는 열리지 않습니다.

### 3. 뉴스레터 파일 만들기

시작점으로 [newsletter template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)을 사용하세요. 뉴스레터 판은 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 폴더에 들어갑니다.

파일을 만들 때:

- 이슈에서 요청한 형식이나 최근 승인된 판에서 사용한 파일명 형식에 맞추세요.
- 작업에서 다른 형식을 요구하지 않는 한 템플릿과 같은 섹션 순서를 유지하세요.
- 해당 주의 링크만 추가하세요.
- 독자가 왜 중요한지 이해할 수 있도록 각 링크에 짧고 명확한 설명을 작성하세요.
- 필요하다면 영어가 아닌 출처를 영어로 번역하거나 요약하세요.
- pull request를 열기 전에 모든 링크를 확인하세요.

### 4. 적절한 시점에 링크 수집하기

ZecWeekly는 보통 해당 주의 Zcash 생태계 활동을 다루며 주말 무렵에 발행됩니다. 가장 안전한 타이밍은 다음과 같습니다:

- 현재 뉴스레터 이슈나 작업이 게시된 뒤에 링크 수집을 시작하세요.
- 해당 주가 아직 진행 중일 때는 초안을 유지하세요.
- 주 후반 업데이트를 확인한 뒤, 요청된 제출일에 가깝게 pull request를 제출하세요.
- 해당 날짜의 작업이 존재하기 전이나 ZecHub가 준비하라고 확인하기 전에 미래 주차의 뉴스레터를 제출하지 마세요.

이슈에 특정 날짜까지 제출하라고 되어 있다면 그 날짜를 따르세요. 이 페이지와 현재 이슈 사이에 충돌이 있다면 현재 이슈를 따르세요.

### 5. pull request 열기

뉴스레터 파일이 준비되면:

1. 변경 사항을 자신의 포크에 커밋하세요.
2. `main` 브랜치의 `ZecHub/zechub`로 pull request를 여세요.
3. `Zcash Ecosystem Digest | May 30th`처럼 해당 판에 맞는 제목을 사용하세요.
4. 검토자가 작업과 과제를 연결할 수 있도록 pull request 본문에 이슈를 링크하세요.

pull request 본문 예시:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

pull request를 연 뒤에는 리뷰 코멘트를 확인하세요. ZecHub가 수정을 요청하면, 같은 판에 대해 두 번째 pull request를 여는 대신 같은 브랜치를 업데이트하세요.

### 실제 예시

승인된 제출의 예시로 다음과 같은 병합된 뉴스레터 pull request를 참고하세요:

- [Zcash Ecosystem Digest | 4월 11일](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 3월 28일](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 2월 14일](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

자신의 작업을 예시와 비교할 때는 파일 위치, 제목 형식, 섹션 순서, 링크 설명, 그리고 pull request가 올바른 작업으로 다시 연결되는지에 집중하세요.

### 피해야 할 일반적인 실수

- 판 날짜나 작업이 확인되기 전에 pull request를 여는 것.
- 이미 연결된 pull request가 있는 이슈에서 작업하는 것.
- `ZecHub/zechub` 대신 자신의 포크로 pull request를 제출하는 것.
- 잘못된 파일명을 사용하거나 `newsletter` 폴더 밖에 파일을 두는 것.
- 이전 판을 복사해 놓고 날짜, 링크, 설명을 모두 업데이트하지 않는 것.
- 잘못된 주의 링크를 추가하는 것.
- 깨진 링크, 중복 링크, 또는 템플릿의 자리표시자 텍스트를 남겨두는 것.
- 리뷰 코멘트 이후 원래 브랜치를 업데이트하는 대신 새 pull request를 여는 것.

### 최종 체크리스트

리뷰를 요청하기 전에, 다음을 확인하세요:

- 이슈 또는 작업 날짜가 자신의 뉴스레터 파일과 일치합니다.
- 같은 이슈나 판을 이미 다루고 있는 다른 열린 pull request가 없습니다.
- 파일이 `newsletter` 폴더에 있습니다.
- 템플릿 섹션이 모두 완성되어 있습니다.
- 모든 링크가 작동하고 유용한 설명이 있습니다.
- pull request 본문이 올바른 이슈를 링크합니다.
- 검토자가 수정을 요청할 경우 편집할 수 있습니다.

## 지난 판

[ZecWeekly 아카이브](https://zechub.substack.com/p/archive)
