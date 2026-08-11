<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# VDO.Ninja와 OBS Studio를 사용한 커뮤니티 방송

이 짧은 튜토리얼은 [DWeb Camp 2023](https://dwebcamp.org/) 기간에 펠로우와 자원봉사자들로 이루어진 그룹이 만들었습니다. 이 실습의 목표는 오프라인 MESH 네트워크에 연결된 스마트폰 기기를 활용해 협업 영상 녹화와 스트리밍을 하는 것입니다.

우리는 두 가지 오픈소스 소프트웨어인 [OBS Studio (Open Broadcaster software)](https://obsproject.com/)와 [VDO.Ninja](https://vdo.ninja/)를 사용합니다. 이 소프트웨어들은 다운로드하여 여러분의 컴퓨터에서 로컬로 실행할 수 있습니다.

## OBS Studio (Open Boardcaster software)

OBS Studio는 녹화와 라이브 스트리밍을 위한 자유 오픈소스 소프트웨어이며 여러 운영체제에서 사용할 수 있습니다. 이 소프트웨어는 2012년에 처음 공개되었고 게임 스트리밍 커뮤니티와 독립 영상 콘텐츠 제작자들 사이에서 상당히 큰 지지를 받고 있습니다.

OBS Studio의 사용자 인터페이스는 처음 사용하는 사용자에게는 꽤 부담스럽게 보일 수 있습니다. OBS studio는 "Preview"와 "Broadcast"라는 두 개의 창으로 나뉩니다. Preview 창은 "Scenes"라고 불리는 사용 가능한 영상들(웹캠, Iriun Webcam, OBS Virtual Camera, Video 및 Browser source 같은 다양한 카메라)을 보여주고, "Broadcast"는 라이브 스트림을 보여줍니다.

VDO.ninja의 원격 카메라 스트림을 OBS Studio로 스트리밍하려면, 먼저 "Sources > Add > Browser"에서 새로운 "Browser Source"를 추가합니다. 새 창에서 VDO.Ninja의 소스 URL을 입력하고 "Make source visible"을 선택할 수 있습니다.

이제 원격 스트림 방송을 시작할 수 있습니다.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/)는 모바일 기기를 라이브 스트리밍 카메라로 바꿔주는 자유 오픈소스 웹 애플리케이션입니다. 이 소프트웨어는 다운로드하여 여러분의 로컬 컴퓨터에 배포할 수도 있고, [온라인 버전 https://vdo.ninja](https://vdo.ninja/)을 직접 사용할 수도 있습니다.

VOD.Ninja 인터페이스는 간단합니다. 모바일 기기의 웹 브라우저에서 VDO.Ninja를 열고 "Add your camera to OBS"를 선택하기만 하면 됩니다. 그러면 기기 목록에서 카메라와 오디오 장치를 선택하고 "Start"를 클릭하게 됩니다. 그런 다음 OBS Studio에 추가할 수 있는 "view" 링크를 받게 됩니다.

## VDO.Ninja로 커뮤니티 콜 연출하기

데스크톱/노트북의 웹 브라우저로 [VDO.ninja](http://VDO.ninja)에 접속하는 것부터 시작하세요.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


새 방을 만들고 직접 커뮤니티 콜 라이브스트림을 연출하려면 Create a Room을 클릭하세요.

다음 화면에서는 방을 설정하기 위한 기본 정보를 묻습니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

방이 생성되면, 디렉터는 다음 화면에서 사용할 수 있는 많은 제어 옵션을 갖게 됩니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


사람들이 여러분의 방에 참여하면 디렉터인 여러분은 그들의 비디오와 오디오와 함께 모든 소스 옵션과 제어 항목이 나타나는 것을 보게 됩니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## FAQ

- OBS Studio에는 어떤 종류의 비디오 그래픽 카드가 필요하나요?

좋은 그래픽 카드와 많은 메모리를 갖춘 개인용 컴퓨터를 사용할 수 있고, 또는 하드웨어 인코더 [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)를 사용할 수도 있습니다.
- OBS에서는 라이브 번역과 자막을 할 수 있나요?

그러한 기능을 제공하는 것으로 보이는 커뮤니티 기여 플러그인이 몇 가지 있습니다. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- OBS Studio용 플러그인을 직접 개발할 수 있나요?

네, OBS는 lua와 python 스크립팅을 지원합니다. 또한 오버레이와 웹뷰를 위한 JavaScript도 지원합니다.

- 라이브 페이드 투 블랙이나 전환 효과를 사용하나요?

그건 프로듀서인 여러분에게 달려 있습니다!

- 스트리밍할 때 지연 시간이 있나요?

이는 주로 어디로 스트리밍하느냐에 따라 달라집니다. 예를 들어 YouTube는 방송되기 전에 서버에서 수행되는 비디오 처리 때문에 1분 이상 지연될 수 있습니다.

- 느린 컴퓨터에서 OBS를 사용하고 그린 스크리닝도 할 때 오디오가 끊깁니다

하드웨어 인코더를 사용하거나 stream yard를 사용하세요.
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) 또는 [RiverSide.FM](http://riverside.fm/)을 사용하세요.

## 크레딧

- Ryan
- Ajay
- Arky

## 자료

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

오피스 아워: 미디어 및 디지털 이벤트 커뮤니티
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
