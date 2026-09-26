<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly 뉴스레터

ZecWeekly는 매주 일요일 아침에 발행되는 뉴스레터입니다. Zcash 생태계에서 한 주 동안 발생한 모든 소식을 담습니다. 뉴스는 커뮤니티 구성원들이 매주 선별하며, 관련된 모든 링크가 뉴스레터에 추가됩니다. 뉴스레터를 [여기](https://zechub.substack.com/)에서 구독해 주세요.

## 기여하기

뉴스레터 기여는 한 명의 기여자가 해당 주차의 에디션을 준비하고, 현재의 바운티 또는 조율 스레드를 따르며, 주간 링크가 준비된 후 풀 리퀘스트를 제출할 때 가장 효과적입니다. ZecHub가 해당 에디션의 날짜를 게시하거나 확정하기 전에 미래 에디션을 제출하지 마세요. 너무 이른 풀 리퀘스트는 주 후반 업데이트를 놓치거나, 배정된 큐레이터와 충돌하거나, 잘못된 마감일을 사용할 수 있습니다.

### 1. 현재 에디션 확인하기

작성을 시작하기 전에:

- 현재 뉴스레터 작업은 [ZEC Bounties ](https://bounties.zechub.wiki/)에서 확인하세요.
- 배정될 때까지 기다리세요

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. 리포지토리 포크하기

GitHub가 처음이라면 다음 워크플로를 사용하세요:

1. [ZecHub 리포지토리](https://github.com/ZecHub/zechub)를 엽니다.
2. **Fork**를 클릭하고 본인의 GitHub 계정 아래에 포크를 만듭니다.
3. 포크에서 해당 에디션을 위한 새 브랜치를 만듭니다. `digest-may-30-2026`처럼 명확한 브랜치 이름이 도움이 됩니다.
4. 풀 리퀘스트의 기본 리포지토리가 `ZecHub/zechub`이고 기본 브랜치가 `main`인지 확인합니다.

명령줄을 사용한다면 동일한 워크플로는 다음과 같습니다:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME`을 본인의 GitHub 사용자 이름으로 바꾸세요. 위 URL은 자리 표시자이며, 작성된 그대로는 연결되지 않습니다.

### 3. 뉴스레터 파일 만들기

[뉴스레터 템플릿](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)을 시작점으로 사용하세요. 뉴스레터 에디션은 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 폴더에 속합니다.

파일을 만들 때:

- 이슈에서 요청한 파일명 형식 또는 최근 승인된 에디션에서 사용한 형식에 맞추세요.
- 작업에서 다른 형식을 요청하지 않는 한 템플릿과 동일한 섹션 순서를 유지하세요.
- 관련 주차의 링크만 추가하세요.
- 독자가 왜 중요한지 이해할 수 있도록 각 링크에 짧고 명확한 설명을 작성하세요.
- 필요하면 영어가 아닌 출처를 영어로 번역하거나 요약하세요.
- 풀 리퀘스트를 열기 전에 모든 링크를 확인하세요.

### 4. 적절한 시점에 링크 수집하기

ZecWeekly는 일반적으로 현재 주의 Zcash 생태계 활동을 다루며, 주말 무렵에 게시됩니다. 가장 안전한 일정은 다음과 같습니다:

- 현재 뉴스레터 이슈 또는 작업이 게시된 후 링크 수집을 시작하세요.
- 주가 아직 진행 중인 동안 초안을 유지하세요.
- 주 후반 업데이트를 확인한 뒤, 요청된 제출일에 가깝게 풀 리퀘스트를 제출하세요.
- 해당 날짜의 작업이 존재하거나 ZecHub가 준비해야 한다고 확인하기 전에는 미래 주차의 뉴스레터를 제출하지 마세요.

이슈에 특정 날짜까지 제출하라고 적혀 있다면 그 날짜를 따르세요. 이 페이지와 현재 이슈가 충돌하는 경우에는 현재 이슈를 따르세요.

### 5. 풀 리퀘스트 열기

뉴스레터 파일이 준비되면:

1. 변경 사항을 포크에 커밋합니다.
2. `main` 브랜치에서 `ZecHub/zechub`으로 풀 리퀘스트를 엽니다.
3. `Zcash Ecosystem Digest | May 30th`와 같이 에디션에 맞는 제목을 사용합니다.
4. 검토자가 작업을 해당 과제와 연결할 수 있도록 풀 리퀘스트 본문에 이슈를 연결합니다.

풀 리퀘스트 본문 예시:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

풀 리퀘스트를 연 후에는 검토 의견을 확인하세요. ZecHub가 수정을 요청하면 같은 에디션에 대해 두 번째 풀 리퀘스트를 열지 말고 동일한 브랜치를 업데이트하세요.

### 실제 예시

다음 병합된 뉴스레터 풀 리퀘스트를 승인된 제출물의 예시로 사용하세요:

- [Zcash 생태계 다이제스트 | 4월 11일](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 생태계 다이제스트 | 3월 28일](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 생태계 다이제스트 | 2월 14일](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

작업물을 예시와 비교할 때는 파일 위치, 제목 형식, 섹션 순서, 링크 설명, 그리고 풀 리퀘스트가 올바른 작업으로 다시 연결되는지에 집중하세요.

### 피해야 할 일반적인 실수

- 에디션 날짜 또는 작업이 확정되기 전에 풀 리퀘스트를 여는 것.
- 이미 연결된 풀 리퀘스트가 있는 이슈를 작업하는 것.
- `ZecHub/zechub` 대신 본인의 포크로 풀 리퀘스트를 제출하는 것.
- 잘못된 파일 이름을 사용하거나 `newsletter` 폴더 밖에 파일을 두는 것.
- 모든 날짜, 링크, 설명을 업데이트하지 않고 이전 에디션을 복사하는 것.
- 잘못된 주차의 링크를 추가하는 것.
- 템플릿의 깨진 링크, 중복 링크 또는 자리 표시자 텍스트를 남겨 두는 것.
- 검토 의견 후 원래 브랜치를 업데이트하는 대신 새 풀 리퀘스트를 여는 것.

### 최종 확인 목록

검토를 요청하기 전에 다음을 확인하세요:

- 이슈 또는 작업 날짜가 뉴스레터 파일과 일치합니다.
- 같은 이슈 또는 에디션을 이미 다루는 다른 열린 풀 리퀘스트가 없습니다.
- 파일이 `newsletter` 폴더에 있습니다.
- 템플릿 섹션이 완성되었습니다.
- 모든 링크가 작동하며 유용한 설명이 있습니다.
- 풀 리퀘스트 본문이 올바른 이슈에 연결됩니다.
- 검토자가 변경을 요청할 경우 수정할 수 있습니다.

## 이전 에디션

[ZecWeekly 아카이브](https://zechub.substack.com/p/archive)
