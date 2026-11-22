<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHub에 기여하기

ZecHub는 사람들이 Zcash에 대해 배울 수 있도록 돕습니다. 이 페이지를 읽고 계신다면, 기여를 고려해 주셔서 정말 기쁩니다! 여러분의 기여는 [zechub.wiki](https://www.zechub.wiki/)와 다른 ZecHub 소셜 미디어에 반영됩니다.

### 새 기여자

ZecHub의 개요를 확인하려면 [README](https://github.com/ZecHub/zechub/blob/main/README.md)를 읽어 보세요.


### 시작하기

ZecHub는 커뮤니티 기여를 관리하기 위해 GitHub를 사용합니다. GitHub가 처음이시더라도 걱정하지 마세요! 커뮤니티 기여자로서 ZecHub에 참여하는 방법을 자세히 설명해 드리겠습니다. 채택된 기여에 대해서는 거래정보 보호 ZEC로 팁을 지급합니다. 보상 금액은 ZEC에서 고정되어 있지 않습니다. [보상 책정 방법](#how-rewards-are-set)을 확인하세요. 이 안내에서는 이슈를 열고, 풀 리퀘스트(PR)를 만들고, 검토한 뒤 병합하는 기여 워크플로의 개요를 살펴봅니다.


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

ZecHub에 기여하는 모든 내용은 [ZecHub 스타일 가이드](https://zechub.wiki/contribute/style-guide)를 따라야 합니다. 여기에는 위키, 문서, 소셜 미디어 콘텐츠가 포함됩니다.

### 기여 방법

ZecHub는 Zcash 사용자와 개발자를 위한 지원 및 자료 제공을 목표로 하는 커뮤니티 주도 프로젝트입니다. 주간 뉴스레터 작성, 지식 기반에 기여, 개발 프로젝트 지원 등 다양한 방식으로 ZecHub에 참여할 수 있습니다.

ZecHub가 현재 받고 있는 기여 유형은 다음과 같습니다.

### 보상 책정 방법

팁은 거래정보 보호 ZEC로 지급됩니다. 아래 제목에 표시되었던 ZEC 수치는 과거의 ZEC/USD 환율을 기준으로 한 역사적 스냅샷입니다. 현재 환율로 간주하지 마세요.

금액을 정하는 방법:

1. 작업을 [바운티 금액 정책](https://bounties.zechub.wiki/docs/bounty-amounts)의 USD 구간에 맞춥니다.
2. 해당 구간 안에서 목표 금액을 선택합니다. 자동으로 최고 금액을 선택하지는 않습니다.
3. 공개된 ZEC/USD 현물 환율로 환산해 바운티에 ZEC를 입력합니다.

```
zec_to_enter = usd_target / zec_usd_spot
```

소수점 아래 4자리까지 반올림합니다. 정책 파일이 유일한 기준입니다. 이 페이지와 정책 파일의 내용이 다르면 정책 파일을 따르세요.

지급된 작업은 [ZEC Bounties](https://bounties.zechub.wiki/)에 게시됩니다.

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

1. **병합됨** — PR이 저장소에 반영됩니다.
2. **보상 승인됨** — 후원자 또는 DAO가 보상 지급 의무와 금액에 동의합니다.
3. **지급됨** — ZEC가 거래정보 보호 통합 주소에 도달합니다.

기여가 병합되었다고 해서 그 자체로 보상이 승인되는 것은 아닙니다. 보상이 승인되었다고 해서 결제가 완료된 것도 아닙니다.

#### 개발 작업

Zcash 생태계를 구축하는 데 도움이 되는 승인된 개발 작업입니다. 위키, 새 지갑 또는 여러분이 생각해 낼 수 있는 모든 애플리케이션이 포함될 수 있습니다.

#### Zcash 튜토리얼(동영상)

아래에서 튜토리얼 예시를 확인하세요.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Zcash 앱에 관한 튜토리얼을 만들고 공유해 보상을 받으세요. zechub/tutorials에 PR을 제출하거나 Discord의 #video-content 채널로 동영상을 보내세요. 동영상이 기준을 충족하면 게시하고 팁을 지급하겠습니다.

#### ZecHub 위키 - 새 위키 페이지 게시

위키 사이트에서는 Zcash 교육 자료를 쉽고 이해하기 쉬운 형식으로 제공합니다. Zcash는 매우 발전된 기술이며 활발한 커뮤니티가 형성되어 있어, 아직 작성해야 할 문서가 더 많습니다. 다음 주제에 관한 문서 작성을 목표로 합니다.

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

이 주제들은 범위가 상당히 넓어 다룰 내용이 많습니다. 아이디어를 얻고 싶다면 현재 운영 중인 [위키 문서 사이트](https://zechub.wiki/)를 확인하고 빠진 내용이 있는지 살펴보세요. 작성할 내용을 정했다면 변경 사항을 작성하고 ZecHub 저장소에 PR을 제출하는 방법을 알아보세요. 모든 문서는 이 저장소에서 작성하고 관리합니다. 위키 페이지를 작성할 때는 [ZecHub 스타일 가이드](https://zechub.wiki/contribute/style-guide)를 따르고, 같은 섹션에 있는 기존 페이지를 구조 참고 자료로 활용하세요. PR을 제출한 후에는 Discord의 #zechub 섹션에서 @dismad, @squirrel 또는 @vito에게 메시지를 보내 주세요. 이들이 PR을 검토하고 사이트에 추가할 준비가 되면 병합합니다. 병합되면 문서를 ZecHub 웹사이트에 추가합니다. 문서가 준비되지 않은 경우 PR에서 수정 사항을 제안할 것입니다.

#### ZecHub 위키 - 위키 페이지 번역

ZecHub의 목표는 Zcash 커뮤니티의 누구나 기여할 수 있는 오픈 소스 교육 허브를 제공하는 것입니다. 이 허브의 가장 큰 성과 중 하나는 커뮤니티 구성원들이 ZecHub 자료를 각자의 언어로 번역하는 모습입니다.

참고: ZecHub 전체 페이지 번역은 주당 10페이지로 제한됩니다.

`translations/<locale>/site/`에 있는 엄선된 현지화 페이지는 소스 해시 매니페스트를 통해 영어 원문과 비교하여 추적합니다. 오래된 번역을 감지하는 방법, 동기화 워크플로, 보호 용어 검증에 관한 내용은 [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md)를 참조하세요.

#### ZecHub 위키 - 기존 문서 수정

문서의 정보가 정확하지 않은 경우도 있습니다. 괜찮습니다. 그래서 문서를 오픈 소스로 공개하는 것입니다! 위키 문서에서 수정이 필요한 부분을 발견하면 문서 하단으로 이동하세요. 하단에는 해당 문서의 GitHub 페이지 링크가 있습니다. 그곳에서 PR을 통해 수정 사항을 제안해 주세요.

#### ZecHub 위키 - 깨진 링크 수정

링크가 작동하지 않거나 중요한 부분의 철자가 틀린 것을 발견하면 문서 하단으로 이동하세요. 하단에는 해당 문서의 GitHub 페이지 링크가 있습니다. 그곳에서 PR을 통해 수정 사항을 제안해 주세요.

#### 뉴스레터 - 새 호 발행

생태계 주간 뉴스레터를 발행합니다. 참여하기에 아주 쉽고 부담도 적은 방법입니다! 뉴스레터는 매주 금요일이나 토요일에 발행됩니다. 뉴스레터를 작성하고 싶다면 Discord의 #zecweekly 섹션에서 @squirrel에게 메시지를 보내 알려 주세요.

그런 다음 [이 저장소의 뉴스레터 섹션](/newsletter/newsletterbasics.md)으로 이동해 PR을 제출하여 새 호를 작성할 수 있습니다. [템플릿](/newsletter/newslettertemplate.md)의 형식을 따라 주세요.

이렇게 하면 @squirrel 또는 (Discord의) 담당자가 새 뉴스레터 호가 준비된 것을 확인하고 검토한 뒤 저장소에 병합합니다. 병합이 완료되면 콘텐츠를 가져와 Substack에 게시합니다.

#### 뉴스레터 - 번역

현재 스페인어, 포르투갈어, 러시아어로 발행하고 있습니다. 번역본은 각 언어의 소셜 미디어에 게시되며, ZecHub 소셜 미디어를 통해 널리 알리기 위해 노력하고 있습니다.

뉴스레터를 현지 언어로 번역하고 싶다면 어느 채널에서 공유할지, 어떤 언어로 발행할지 알려 주세요. 공개 일정을 조율할 수 있습니다.

#### 팟캐스트 - ZecHub 소셜 미디어에 에피소드 게시

뉴스 프로그램, 팟캐스트, Twitter 토크 또는 기타 동영상이나 오디오 콘텐츠에 대한 아이디어가 있으신가요? Discord #video-content에서 알려 주시면 함께 이야기하겠습니다.

이 유형의 콘텐츠는 보상 금액이 조금 더 크므로, 지출을 승인하기 전에 ZecHub DAO에 제안서를 제출해야 합니다.

#### 창의적인 소셜 미디어 게시물

소셜 미디어에 게시할 새롭고 흥미로운 콘텐츠를 찾고 있습니다. [ZecHub 스타일 가이드](https://zechub.wiki/contribute/style-guide)에 부합하는 짧은 동영상, GIF, 밈 및 기타 창의적인 게시물을 받습니다. 보상 금액은 [바운티 금액 정책](https://bounties.zechub.wiki/docs/bounty-amounts)을 따릅니다.

뉴스레터와 팟캐스트의 썸네일을 디자인할 수도 있습니다. 디자인에 재능이 있다면 Discord의 #design에서 메시지를 보내 주세요.

#### 다른 아이디어가 있으신가요? 알려 주세요!

다른 제안이 있으신가요? Discord의 #general에서 알려 주세요. 함께 논의하고 ZecHub DAO가 지원할 수 있는지 알아보겠습니다.

### 마무리

업계에서 가장 존경받는 프로토콜 중 하나에 기여하는 일을 망설이지 말고 시작해 보세요. Zcash에 참여할 수 있는 좋은 방법입니다. 기여와 관련해 궁금한 점이 있으면 [Discord](#join-the-conversation)에서 알려 주세요.

감사합니다!
