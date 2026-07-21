<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHub에 기여하기

ZecHub는 사람들이 Zcash를 배울 수 있도록 도와줍니다. 이 페이지를 읽고 있다면, 당신이 기여하고자 한다는 점에 매우 흥분되어 있습니다! 당신이 제공하는 모든 기여는 [zechub.wiki](https://www.zechub.wiki/) 및 기타 ZecHub 소셜 미디어에 반영됩니다.

### 새롭게 참여하는 사람들

ZecHub에 대한 개요를 얻기 위해 [README](https://github.com/ZecHub/zechub/blob/main/README.md)를 읽으세요.

### 시작하기

ZecHub는 GitHub을 사용하여 커뮤니티 기여를 관리합니다. GitHub이 처음이라면 걱정하지 마세요! ZecHub의 커뮤니티 기여자로서 어떻게 참여할 수 있는지 설명해 드릴 것입니다. 우리가 승인한 기여에 대해 ZEC로 팁을 지급합니다. 이 가이드에서는 이슈를 열고, pull request(PR)를 생성하고, 검토 및 PR을 병합하는 기여 워크플로우의 개요를 제공합니다.

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

먼저, [커뮤니티 링크](https://zechub.wiki/zcash-community/community-links)에서 대화에 참여해 보세요.

### 스타일 가이드

ZecHub에 기여하는 모든 내용은 [ZecHub 스타일 가이드](https://github.com/ZecHub/zechub/blob/main/styles/guide.md)를 따르어야 합니다. 이는 위키, 문서 및 소셜 미디어 콘텐츠 모두 포함됩니다.

### 기여할 수 있는 방법

ZecHub는 Zcash 사용자와 개발자를 지원하고 자원을 제공하기 위해 커뮤니티 주도의 프로젝트입니다. ZecHub에 참여할 수 있는 방법은 많습니다. 주간 뉴스레터에 글을 쓰거나, 우리의 지식 기반에 기여하거나, 개발 프로젝트에 도움을 줄 수도 있습니다.

ZecHub가 현재 받아들이는 기여 유형은 다음과 같습니다:

#### 개발 작업 - 승인된 PR당 0.12에서 0.5 ZEC

Zcash 생태계를 구축하는 데 도움이 되는 모든 승인된 개발 작업. 이는 위키, 새로운 지갑 또는 생각할 수 있는 어떤 애플리케이션도 포함됩니다.

#### Zcash 튜토리얼 (동영상) - 튜토리얼당 최대 0.15 ZEC

다음은 예시 튜토리얼입니다:

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

Zcash 앱에 대한 튜토리얼을 만들고 공유하여 보상을 받으세요. zechub/tutorials에 PR을 제출하거나 Discord의 #video-content 채널로 동영상을 보내주세요. 동영상이 우리의 기준에 부합하면, 그것을 게시하고 당신에게 팁을 지급합니다.

#### ZecHub 위키 - 새 위키 페이지 출판당 최대 0.08 ZEC

우리의 위키 사이트는 Zcash 교육 자료를 쉽게 이해할 수 있도록 제공합니다. Zcash는 매우 고급 기술이며 생생한 커뮤니티가 있기 때문에, 여전히 더 많은 문서를 작성해야 합니다. 우리의 목표는 다음과 같은 문서를 작성하는 것입니다:

```
- Zcash 및 관련 기술
- ZEC (Zcash 통화) 사용 사례
- 새 사용자 가이드
- Zcash 커뮤니티 및 생태계
- 프라이버시 생태계 및 도구
```

이 영역은 매우 광범위하므로, 작업할 수 있는 것이 많습니다. 영감을 얻고 싶다면 현재 [wiki-docs 사이트](https://zechub.wiki/)를 확인하고 빠진 부분을 살펴보세요. 작성하고자 하는 내용을 결정한 후 변경 사항을 만들고 PR을 제출하는 방법을 배우세요. 모든 문서는 이 저장소에서 생성되고 유지됩니다. 위키 페이지 작성을 할 때 [docs 템플릿](https://github.com/ZecHub/zechub/blob/main/template.md)을 사용하고 [ZecHub 스타일](https://zechub.wiki/contribute/style-guide)을 따르세요. PR을 제출한 후, Discord의 #zechub 섹션에서 @dismad, @squirrel 또는 @vito에게 메시지를 보내어 PR을 검토하고 병합할 준비가 되었는지 확인해 주세요. 병합되면 그들은 문서를 ZecHub 웹사이트에 추가합니다. 문서가 준비되지 않았다면, 그들은 PR에서 편집 제안을 제공합니다.

#### ZecHub 위키 - 문서에 승인된 수정당 0.015 ZEC

가끔 우리의 문서 정보는 정확하지 않을 수 있습니다. 괜찮습니다. 이것이 바로 우리가 오픈소스로 공개한 이유입니다! 위키 문서에서 변경이 필요한 것을 발견하면, 문서의 하단(그리고 GitHub 페이지로 연결된 링크)으로 이동하여 PR을 통해 수정을 제안하세요.

#### ZecHub 위키 - 손상된 링크 복구당 0.005 ZEC

손상된 링크나 중요한 오타를 발견하면 문서의 하단(그리고 GitHub 페이지로 연결된 링크)으로 이동하여 PR을 통해 변경을 제안하세요.

#### 뉴스레터 - 에디션당 0.05 ZEC

우리는 생태계 주간 뉴스레터를 출판합니다. 이는 참여하기 매우 쉬운 방법입니다! 뉴스레터는 매주 금요일 또는 토요일에 발송됩니다. 뉴스레터를 쓰고 싶다면, Discord의 #zecweekly 섹션에서 @squirrel에게 알려주세요.

그 후, 이 저장소의 [뉴스레터 섹션](/newsletter/newsletterbasics.md)으로 이동하여 새로운 에디션을 만들기 위한 pull request를 제출하세요. 사용된 형식은 이 [템플릿](/newsletter/newslettertemplate.md)을 따르세요.

이 작업을 완료한 후, @squirrel 또는 (Discord에서)는 당신의 새 뉴스레터 에디션이 준비되었음을 확인하고 검토 및 저장소에 병합합니다. 병합된 후, 그들은 내용을 Substack으로 게시합니다.

#### 팟캐스트 - ZecHub 소셜 미디어에 게시된 에피소드당 0.25 ZEC

뉴스 쇼, 팟캐스트, 트위터 토론 또는 기타 비디오/오디오 콘텐츠 아이디어가 있습니까? Discord의 #video-content 채널에 알려주세요. 이야기해 보겠습니다.

이 유형의 콘텐츠에 대한 보상은 약간 더 큽니다. 따라서 승인 전에 ZecHub DAO에 제안을 제출해야 합니다.

#### 다른 아이디어가 있습니까? 알려주세요!

다른 제안이 있으십니까? Discord의 #general 채널에서 우리에게 말해 주세요. 이야기하고, ZecHub DAO가 이를 지원할 수 있는지 살펴보겠습니다.

### 마무리

Zcash 생태계 중 가장 존경받는 프로토콜 중 하나에 기여하는 것을 망설이지 마세요. 이는 Zcash에 참여하기 위한 훌륭한 방법입니다. 기여에 대해 궁금한 점이 있다면, [Discord](#join-the-conversation)에서 알려주세요.

감사합니다!
