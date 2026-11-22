<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# ZecWeekly 뉴스레터

ZecWeekly는 매주 일요일 아침에 발행되는 뉴스레터입니다. Zcash 생태계에서 한 주 동안 일어난 모든 소식을 담고 있습니다. 커뮤니티 구성원들이 매주 소식을 선별하고, 관련 링크를 모두 뉴스레터에 추가합니다. 뉴스레터를 구독하려면 [여기](https://zechub.substack.com/)를 클릭하세요.

## 기여하기

뉴스레터 기여는 한 명의 기여자가 해당 주의 에디션을 준비하고, 진행 중인 바운티 또는 조정 스레드를 확인한 뒤, 한 주의 링크가 준비되면 풀 리퀘스트를 제출하는 방식이 가장 원활합니다. ZecHub에서 해당 에디션의 날짜를 게시하거나 확인하기 전에 다음 에디션을 제출하지 마세요. 너무 일찍 제출된 풀 리퀘스트는 주 후반의 업데이트를 놓치거나, 배정된 큐레이터와 충돌하거나, 잘못된 마감일을 적용하는 경우가 많습니다.

### 1. 현재 에디션 확인하기

작성을 시작하기 전에 다음을 확인하세요.

- [ZEC Bounties](https://bounties.zechub.wiki/)에서 현재 뉴스레터 작업을 확인하세요.
- 담당자로 배정될 때까지 기다리세요.
- 뉴스레터 에디션은 [바운티 금액 정책](https://bounties.zechub.wiki/docs/bounty-amounts)의 XS 구간에 해당합니다. 진행 중인 바운티의 ZEC 수치가 실제 금액이며, 기여 가이드에 있는 이전 제목의 금액은 기준이 아닙니다.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. 저장소 포크하기

GitHub를 처음 사용한다면 다음 절차를 따르세요.

1. [ZecHub 저장소](https://github.com/ZecHub/zechub)를 여세요.
2. **포크**를 클릭하고 본인의 GitHub 계정에 포크를 만드세요.
3. 포크에서 에디션을 위한 새 브랜치를 만드세요. `digest-may-30-2026`처럼 알아보기 쉬운 브랜치 이름을 사용하는 것이 좋습니다.
4. 풀 리퀘스트의 기준 저장소가 `ZecHub/zechub`이고 기준 브랜치가 `main`인지 확인하세요.

명령줄을 사용하는 경우에도 절차는 다음과 같습니다.

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME`를 본인의 GitHub 사용자 이름으로 바꾸세요. 위 URL은 예시이며, 표시된 그대로는 연결되지 않습니다.

### 3. 뉴스레터 파일 만들기

[뉴스레터 템플릿](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)을 시작점으로 사용하세요. 뉴스레터 에디션은 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 폴더에 저장합니다.

파일을 만들 때는 다음 사항을 지키세요.

- 이슈에서 요청한 파일 이름 형식을 따르거나, 최근에 승인된 에디션에서 사용한 형식을 따르세요.
- 작업에서 다른 형식을 요청하지 않았다면 템플릿과 같은 섹션 순서를 유지하세요.
- 해당 주의 링크만 추가하세요.
- 각 링크가 왜 중요한지 독자가 알 수 있도록 짧고 명확한 설명을 작성하세요.
- 필요한 경우 영어가 아닌 출처를 영어로 번역하거나 요약하세요.
- 풀 리퀘스트를 열기 전에 모든 링크를 확인하세요.

### 4. 적절한 시기에 링크 모으기

ZecWeekly는 일반적으로 해당 주의 Zcash 생태계 활동을 다루며, 주말이 가까워질 무렵 발행됩니다. 다음과 같이 진행하는 것이 가장 안전합니다.

- 현재 뉴스레터 이슈나 작업이 게시된 후 링크를 모으기 시작하세요.
- 한 주가 진행되는 동안 초안을 작성해 두세요.
- 주 후반의 업데이트를 확인한 다음, 요청된 제출 날짜가 가까워지면 풀 리퀘스트를 제출하세요.
- 해당 날짜의 작업이 등록되거나 ZecHub에서 준비를 요청하기 전에 다음 주 뉴스레터를 제출하지 마세요.

이슈에 특정 날짜까지 제출하라고 명시되어 있다면 그 날짜를 따르세요. 이 페이지와 현재 이슈의 내용이 서로 다르면 현재 이슈를 따르세요.

### 5. 풀 리퀘스트 열기

뉴스레터 파일이 준비되면 다음 절차를 따르세요.

1. 변경 사항을 포크에 커밋하세요.
2. `main` 브랜치의 `ZecHub/zechub`로 풀 리퀘스트를 여세요.
3. `Zcash Ecosystem Digest | May 30th`처럼 에디션에 맞는 제목을 사용하세요.
4. 검토자가 작업을 해당 이슈와 연결할 수 있도록 풀 리퀘스트 본문에 이슈 링크를 추가하세요.

풀 리퀘스트 본문 예시:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

풀 리퀘스트를 연 뒤에는 검토 의견을 확인하세요. ZecHub에서 수정 사항을 요청하면 같은 에디션에 대해 두 번째 풀 리퀘스트를 여는 대신 같은 브랜치를 업데이트하세요.

### 실제 사례

승인된 제출물의 예시로 병합된 다음 뉴스레터 풀 리퀘스트를 참고하세요.

- [Zcash 생태계 다이제스트 | 4월 11일](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 생태계 다이제스트 | 3월 28일](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 생태계 다이제스트 | 2월 14일](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

예시와 본인의 작업을 비교할 때는 파일 위치, 제목 형식, 섹션 순서, 링크 설명, 그리고 풀 리퀘스트가 올바른 작업과 연결되어 있는지 확인하세요.

### 피해야 할 흔한 실수

- 에디션 날짜나 작업이 확인되기 전에 풀 리퀘스트 열기
- 이미 연결된 풀 리퀘스트가 있는 이슈를 작업하기
- `ZecHub/zechub`가 아닌 본인의 포크에 풀 리퀘스트 제출하기
- 파일 이름을 잘못 사용하거나 `newsletter` 폴더 밖에 파일 저장하기
- 날짜, 링크, 설명을 모두 업데이트하지 않고 이전 에디션 복사하기
- 잘못된 주의 링크 추가하기
- 작동하지 않는 링크, 중복 링크 또는 템플릿의 예시 문구를 그대로 남기기
- 검토 의견을 받은 뒤 원래 브랜치를 업데이트하는 대신 새 풀 리퀘스트 열기

### 최종 확인 목록

검토를 요청하기 전에 다음 사항을 확인하세요.

- 이슈 또는 작업 날짜와 뉴스레터 파일의 날짜가 일치합니다.
- 같은 이슈나 에디션을 다루는 다른 미병합 풀 리퀘스트가 없습니다.
- 파일이 `newsletter` 폴더에 있습니다.
- 템플릿의 섹션이 모두 작성되었습니다.
- 모든 링크가 작동하며 유용한 설명이 있습니다.
- 풀 리퀘스트 본문에 올바른 이슈 링크가 있습니다.
- 검토자가 변경을 요청하면 수정할 수 있습니다.

## 이전 에디션

[ZecWeekly 아카이브](https://zechub.substack.com/p/archive)
