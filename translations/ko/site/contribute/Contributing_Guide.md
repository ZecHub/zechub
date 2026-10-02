<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHub에 기여하기

ZecHub는 사람들이 Zcash에 대해 배울 수 있도록 돕습니다. 이 페이지를 읽고 계신다면, 기여를 고려하고 계시다니 정말 기쁩니다! 여러분의 모든 기여는 [zechub.wiki](https://www.zechub.wiki/) 및 기타 ZecHub 소셜 미디어에 반영됩니다.

### 새로운 기여자

ZecHub의 개요를 확인하려면 [README](https://github.com/ZecHub/zechub/blob/main/README.md)를 읽어 보세요.


### 시작하기

ZecHub는 커뮤니티 기여를 관리하기 위해 GitHub를 사용합니다. GitHub가 처음이더라도 걱정하지 마세요! ZecHub의 커뮤니티 기여자로 참여하는 방법을 자세히 설명해 드리겠습니다. 승인된 기여에 대해서는 차폐된 ZEC로 팁을 지급합니다. 보상 금액은 ZEC에서 고정되어 있지 않습니다 — [보상 책정 방법](#how-rewards-are-set)을 참고하세요. 이 가이드에서는 이슈 생성, 풀 리퀘스트(PR) 작성, 검토 및 PR 병합까지의 기여 워크플로 개요를 확인할 수 있습니다.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### 대화에 참여하기

먼저 [커뮤니티 링크](https://zechub.wiki/zcash-community/community-links)에서 대화에 참여하세요.

### 스타일 가이드

ZecHub에 대한 모든 기여는 [ZecHub 스타일 가이드](https://zechub.wiki/contribute/style-guide)를 따라야 합니다. 여기에는 위키, 문서 및 소셜 미디어 콘텐츠가 포함됩니다.

### 기여할 수 있는 방법

ZecHub는 Zcash 사용자와 개발자에게 지원 및 리소스를 제공하는 것을 목표로 하는 커뮤니티 주도 프로젝트입니다. 주간 뉴스레터 작성, 지식 기반 기여 또는 개발 프로젝트 지원 등 ZecHub에 참여할 방법은 많습니다.

다음은 ZecHub가 현재 허용하는 기여 유형입니다.

### 보상 책정 방법

팁은 차폐된 ZEC로 지급됩니다. 아래 제목에 이전에 표시되었던 ZEC 수치는 과거 ZEC/USD 환율 기준의 기록용 스냅샷입니다. 이를 현재 환율로 간주하지 마세요.

금액 선정 방법:

1. 작업을 [바운티 금액 정책](https://bounties.zechub.wiki/docs/bounty-amounts)의 USD 구간에 맞춥니다.
2. 해당 범위 내에서 목표 금액을 선택합니다 — 자동으로 최고액을 선택하지는 않습니다.
3. 공개 ZEC/USD 현물가로 환산하고 바운티에 ZEC을 입력합니다:

```
zec_to_enter = usd_target / zec_usd_spot
```

소수점 넷째 자리까지 반올림하세요. 정책 파일은 유일한 기준입니다. 이 페이지와 해당 파일의 내용이 다를 경우 정책이 우선합니다.

지급된 작업은 [ZEC Bounties](https://bounties.zechub.wiki/)에 목록으로 표시됩니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

서로 다른 세 가지 상태:

1. **병합됨** — PR이 저장소에 수락되었습니다.
2. **보상 승인됨** — 후원자 또는 DAO가 보상을 지급해야 한다는 점과 그 금액에 동의했습니다.
3. **지급됨** — ZEC가 여러분의 차폐된 Unified Address에 도착했습니다.

기여가 병합되었다고 해서 보상이 자동으로 승인되는 것은 아닙니다. 승인된 보상도 지급이 완료된 것은 아닙니다.

#### 개발 작업

Zcash 생태계 구축에 도움이 되는 모든 승인된 개발 작업입니다. 여기에는 위키, 새로운 지갑 또는 생각할 수 있는 모든 애플리케이션이 포함될 수 있습니다.

#### Zcash 튜토리얼(동영상)

아래는 튜토리얼 예시입니다:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + Zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Zcash 앱에 관한 튜토리얼을 만들고 공유하여 보상을 받으세요. zechub/tutorials에 PR을 제출하거나 Discord의 #video-content 채널로 동영상을 보내세요. 동영상이 기준을 충족하면 게시하고 팁을 지급합니다.

#### ZecHub 위키 - 새 위키 페이지 게시

위키 사이트는 이해하기 쉽고 소화하기 좋은 형식으로 Zcash 교육 자료를 제공합니다. Zcash는 활발한 커뮤니티를 갖춘 매우 발전된 기술이므로, 아직 구축해야 할 문서가 더 있습니다. 우리의 목표는 다음에 관한 문서를 구축하는 것입니다:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

이 분야들은 상당히 광범위하므로 작업할 내용이 많습니다. 영감이 필요하다면 현재 [wiki-docs 사이트](https://zechub.wiki/)를 확인하여 무엇이 빠졌는지 살펴보세요. 작성할 내용을 정했다면 변경 작업을 시작하고 ZecHub 저장소에 PR을 제출하는 방법을 알아보세요. 모든 문서는 이 저장소에서 생성되고 관리됩니다. 위키 페이지를 작성할 때는 [ZecHub 스타일 가이드](https://zechub.wiki/contribute/style-guide)를 따르고, 같은 섹션의 기존 페이지를 구조적 참고 자료로 사용하세요. PR을 제출한 뒤 Discord의 #zechub 섹션에서 @dismad, @squirrel 또는 @vito에게 메시지를 보내주세요. 사이트에 추가할 준비가 되었다면 PR을 검토하고 병합할 것입니다. 병합되면 문서를 ZecHub 웹사이트에 추가합니다. 문서가 아직 준비되지 않았다면 PR에서 수정 제안을 드릴 것입니다.

#### ZecHub 위키 - 번역된 위키 페이지

ZecHub의 목표는 Zcash 커뮤니티의 누구나 기여할 수 있는 오픈 소스 교육 허브를 제공하는 것입니다. 이 허브의 가장 큰 성공 중 하나는 커뮤니티 구성원들이 ZecHub 자료를 현지 언어로 번역하는 모습을 보는 것입니다.

참고: ZecHub 글로벌 페이지 번역 제한은 주당 10페이지입니다.

`translations/<locale>/site/` 아래의 선별된 로케일 페이지는 소스 해시 매니페스트를 통해 영어 원본과 비교 추적됩니다. 최신성 감지, 동기화 워크플로 및 보호된 용어 검증에 대해서는 [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md)를 참고하세요.

#### ZecHub 위키 - 기존 문서 편집

때때로 문서의 정보가 정확하지 않을 수 있습니다. 괜찮습니다. 그래서 문서를 오픈 소스로 공개한 것입니다! 위키 문서에서 변경이 필요한 내용을 발견하면 문서 하단(해당 GitHub 페이지로 연결됨)으로 이동하여 PR을 통해 변경을 제안해 주세요.

#### ZecHub 위키 - 깨진 링크 수정

링크가 깨졌거나 중요한 내용의 철자가 잘못된 것을 발견하면 문서 하단(해당 GitHub 페이지로 연결됨)으로 이동하여 PR을 통해 변경을 제안해 주세요.

#### 뉴스레터 - 새 호 발행

우리는 생태계의 주간 뉴스레터를 제작합니다. 이는 매우 부담이 적고 쉽게 참여할 수 있는 방법입니다! 뉴스레터는 매주 금요일 또는 토요일에 발송됩니다. 뉴스레터를 작성하고 싶다면 Discord의 #zecweekly 섹션에서 @squirrel에게 메시지를 보내 알려주세요.

그런 다음 [이 저장소의 뉴스레터 섹션](https://github.com/ZecHub/zechub/blob/main/newsletter/newsletterbasics.md)으로 이동하여 새 뉴스레터 호를 만드는 풀 리퀘스트를 제출할 수 있습니다. 이 [템플릿](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)에서 사용된 형식을 따라주세요.

이 작업을 마치면 @squirrel 또는 (Discord에서) 새 뉴스레터 호가 준비된 것을 확인하고, 검토한 뒤 저장소에 병합할 것입니다. 병합된 후에는 콘텐츠를 가져와 Substack을 통해 게시합니다.

#### 뉴스레터 - 번역

현재 스페인어, 포르투갈어 및 러시아어 판이 있습니다. 번역본은 각자의 소셜 채널에 게시되며, ZecHub 소셜을 통해 최대한 널리 알리고 있습니다.

뉴스레터를 현지 언어로 번역하고 싶다면, 어떤 채널을 통해 공유할지와 어떤 언어로 뉴스레터를 발행할지 알려주세요. 그래야 발행을 조율할 수 있습니다.

#### 팟캐스트 - ZecHub 소셜에 에피소드 게시

뉴스 쇼, 팟캐스트, Twitter 토크 또는 기타 동영상/오디오 콘텐츠에 대한 아이디어가 있나요? Discord의 #video-content에서 알려주시면 논의하겠습니다.

이 유형의 콘텐츠에 대한 보상은 조금 더 크므로, 지출을 승인하기 전에 ZecHub의 DAO에 제안서를 제출해야 합니다.

#### 창의적인 소셜 미디어 게시물

소셜 미디어에 올릴 새롭고 흥미로운 콘텐츠를 원합니다. 짧은 동영상, GIF, 밈 및 기타 창의적인 게시물은 [ZecHub 스타일 가이드](https://zechub.wiki/contribute/style-guide)에 부합하는 경우 허용됩니다. 보상 규모는 [바운티 금액 정책](https://bounties.zechub.wiki/docs/bounty-amounts)을 따릅니다.

뉴스레터와 팟캐스트의 썸네일도 디자인할 수 있습니다. 디자인 재능이 있다면 Discord의 #design에서 메시지를 보내주세요.

#### 다른 아이디어가 있나요? 알려주세요!

다른 제안이 있나요? Discord의 #general에서 알려주세요. 함께 논의하고 ZecHub의 DAO가 이를 지원할지 알아볼 수 있습니다.

### 마무리

업계에서 가장 존경받는 프로토콜 중 하나에 기여하는 일을 주저하지 말고 시작해 주세요. 이는 Zcash에 참여할 좋은 방법입니다. 기여에 관해 궁금한 점이 있으면 [Discord](#join-the-conversation)에서 알려주세요.

감사합니다!
