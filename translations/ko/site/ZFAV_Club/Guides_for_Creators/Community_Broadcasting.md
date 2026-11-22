<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# VDO.Ninja와 OBS Studio를 사용한 커뮤니티 방송

이 짧은 튜토리얼은 [DWeb Camp 2023](https://dwebcamp.org/)에서 펠로우와 자원봉사자들이 함께 만들었습니다. 이 실습의 목표는 오프라인 MESH 네트워크에 연결된 스마트폰을 활용해 협업으로 영상을 녹화하고 스트리밍하는 것입니다.

오픈소스 소프트웨어인 [OBS Studio (Open Broadcaster software)](https://obsproject.com/)와 [VDO.Ninja](https://vdo.ninja/)를 사용합니다. 이 소프트웨어는 컴퓨터에 다운로드해 로컬에서 실행할 수 있습니다.

## OBS Studio (Open Broadcaster software)

OBS Studio는 여러 운영체제에서 사용할 수 있는 무료 오픈소스 녹화 및 라이브 스트리밍 소프트웨어입니다. 2012년에 처음 출시되었으며, 게임 스트리밍 커뮤니티와 독립 영상 콘텐츠 제작자들 사이에서 상당한 인기를 얻고 있습니다.

OBS Studio의 사용자 인터페이스는 처음 사용하는 사람에게 다소 복잡해 보일 수 있습니다. OBS Studio는 “미리보기”와 “방송”이라는 두 개의 창으로 나뉩니다. 미리보기 창에는 사용할 수 있는 영상 소스(웹캠, Iriun Webcam, OBS Virtual Camera, 비디오 및 브라우저 소스 등)가 “장면”으로 표시되고, “방송” 창에는 라이브 스트림이 표시됩니다.

VDO.ninja의 원격 카메라 스트림을 OBS Studio로 가져오려면, “소스 > 추가 > 브라우저”를 선택해 새 “브라우저 소스”를 추가합니다. 새 창에서 VDO.Ninja의 소스 URL을 입력하고 “소스 표시”를 선택합니다.

이제 원격 스트림 방송을 시작할 수 있습니다.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/)는 모바일 기기를 라이브 스트리밍 카메라로 바꿔주는 무료 오픈소스 웹 애플리케이션입니다. 소프트웨어를 다운로드해 로컬 컴퓨터에 배포하거나 [온라인 버전을 https://vdo.ninja](https://vdo.ninja/).에서 바로 사용할 수 있습니다.

VDO.Ninja 인터페이스는 간단합니다. 모바일 기기의 웹 브라우저에서 VDO.Ninja를 열고 “카메라를 OBS에 추가”를 선택하면 됩니다. 그런 다음 기기 목록에서 카메라와 오디오 장치를 선택하고 “시작”을 클릭합니다. 그러면 OBS Studio에 추가할 수 있는 “보기” 링크가 생성됩니다.

## VDO.Ninja로 커뮤니티 통화 진행하기

데스크톱이나 노트북의 웹 브라우저에서 [VDO.ninja](http://VDO.ninja)에 접속합니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


새 방을 만들고 커뮤니티 통화 라이브 스트림을 직접 진행하려면 “방 만들기”를 클릭합니다.

다음 화면에서 방 설정에 필요한 기본 정보를 입력하라는 메시지가 표시됩니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

방을 만들면 다음 화면에서 진행자가 다양한 제어 옵션을 사용할 수 있습니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


사람들이 방에 참여하면 진행자인 사용자는 각자의 영상 및 오디오와 함께 모든 소스 옵션과 제어 기능을 볼 수 있습니다.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## 자주 묻는 질문

- OBS Studio를 사용하려면 어떤 종류의 그래픽 카드가 필요한가요?

성능이 좋은 그래픽 카드와 넉넉한 메모리를 갖춘 개인용 컴퓨터를 사용할 수 있습니다. 또는 하드웨어 인코더 [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)를 사용할 수도 있습니다.
- OBS에서 실시간 번역과 자막을 지원하나요?

이 기능을 제공하는 것으로 보이는 커뮤니티 제작 플러그인이 있습니다. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- OBS Studio용 플러그인을 직접 개발할 수 있나요?

네, OBS는 Lua와 Python 스크립팅을 지원합니다. 오버레이와 웹뷰용으로도 JavaScript가 있습니다.

- 방송 중 화면을 검게 페이드하거나 장면 전환을 사용하나요?

제작자인 사용자가 결정하면 됩니다!

- 스트리밍할 때 지연이 발생하나요?

대부분 스트리밍 대상에 따라 달라집니다. 예를 들어, YouTube는 방송 전에 서버에서 영상을 처리하므로 1분 이상 지연될 수 있습니다.

- 저사양 컴퓨터에서 OBS를 사용하거나 크로마키를 적용할 때 오디오가 끊깁니다

하드웨어 인코더를 사용하거나 StreamYard를 사용하세요.
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) 또는 [RiverSide.FM](http://riverside.fm/)

## 감사의 말

- Ryan
- Ajay
- Arky

## 자료

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

업무 시간: 미디어 및 디지털 이벤트 커뮤니티
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
