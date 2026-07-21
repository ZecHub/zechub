<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# VDO.Ninja와 OBS Studio를 이용한 커뮤니티 라이브 방송

이 짧은 튜토리얼은 [DWeb Camp 2023](https://dwebcamp.org/)에서 fellows 및 자원봉사자 그룹에 의해 작성되었습니다. 이 연습의 목적은 오프라인 MESH 네트워크에 연결된 스마트폰 장치를 사용하여 협업 비디오 녹화 및 스트리밍을 활용하는 것입니다.

우리는 두 개의 오픈소스 소프트웨어 [OBS Studio (Open Broadcaster software)](https://obsproject.com/)와 [VDO.Ninja](https://vdo.ninja/)를 사용합니다. 이 소프트웨어는 귀하의 컴퓨터에 다운로드하여 로컬에서 실행할 수 있습니다.

## OBS Studio (Open Broadcaster Software)

OBS Studio는 여러 운영체제에서 사용 가능한 무료 및 오픈소스 소프트웨어로서, 게임 스트리밍 커뮤니티와 독립 비디오 콘텐츠 제작자들 사이에서 꽤 많은 팬층을 가지고 있습니다. 이 소프트웨어는 2012년에 처음 출시되었습니다.

OBS Studio의 사용 인터페이스는 초보자에게 다소 어렵게 보일 수 있습니다. OBS Studio는 두 개의 창으로 구성되어 있으며, "Preview"와 "Broadcast"입니다. Preview 창에서는 사용 가능한 비디오(웹캠, Iriun 웹캠, OBS 가상 카메라, 비디오 및 브라우저 소스 등 다양한 카메라)를 보여주는 "Scenes"와 "Broadcast" 창에서는 라이브 스트리밍을 보여줍니다.

VDO.Ninja에서 원격 카메라 스트림을 OBS Studio로 스트리밍하려면 먼저 "Sources > Add > Browser"를 클릭하여 새로운 "Browser Source"를 추가합니다. 새 창에서 VDO.Ninja의 소스 URL을 제공하고 "Make source visible"을 선택합니다.

이제 원격 스트림을 방송할 수 있습니다.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/)는 모바일 장치를 라이브 스트리밍 카메라로 전환할 수 있는 무료 및 오픈소스 웹 애플리케이션입니다. 이 소프트웨어는 귀하의 로컬 컴퓨터에 다운로드하여 배포하거나, 또는 [https://vdo.ninja](https://vdo.ninja/)에서 직접 온라인 버전을 사용할 수 있습니다.

VDO.Ninja 인터페이스는 간단합니다. 모바일 장치의 웹 브라우저에 VDO.Ninja를 열고 "Add your camera to OBS"를 선택합니다. 그런 다음 장치 목록에서 카메라와 오디오 장치를 선택하고 "Start"를 클릭하면 "view" 링크를 얻을 수 있습니다. 이 링크는 OBS Studio에 추가할 수 있습니다.

## VDO.Ninja를 이용한 커뮤니티 콜 운영

먼저 데스크탑/노트북의 웹 브라우저에서 [VDO.ninja](http://VDO.ninja)로 이동합니다.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>

새로운 방을 만들고 자신의 커뮤니티 라이브 스트리밍을 운영하려면 "Create a Room"을 클릭합니다.

다음 화면에서는 방 설정에 필요한 기본 정보를 요청합니다.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

방이 생성되면 다음 화면에서 디렉터는 많은 제어 옵션을 사용할 수 있습니다.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

사람들이 방에 참여하면 디렉터는 모든 소스 옵션과 제어 기능이 그들의 비디오 및 오디오와 함께 나타나게 됩니다.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>

## FAQ

- OBS Studio 사용에 필요한 비디오 그래픽 카드 유형은 무엇인가요?

좋은 그래픽 카드와 많은 메모리가 있는 개인용 컴퓨터를 사용하거나, 또는 하드웨어 인코더 [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)를 사용할 수 있습니다.
- OBS는 라이브 번역 및 자막 기능을 제공하나요?

일부 커뮤니티에서 기여한 플러그인은 이러한 기능을 제공하는 것으로 보입니다. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)
- OBS Studio에 맞춤 플러그인을 개발할 수 있나요?

네, OBS는 Lua 및 Python 스크립팅을 지원하며, 오버레이와 웹뷰를 위한 JavaScript도 지원합니다.
- 라이브 방송 시 fade to black 또는 전환 효과를 사용하나요?

생산자인 당신 마음에 달려 있습니다!
- 스트리밍 중 지연 현상은 발생하나요?

스트리밍 목적지에 따라 다릅니다. 예를 들어, YouTube는 서버에서 비디오 처리가 완료되기 전까지 1분 이상의 지연이 있을 수 있습니다.

- 느린 컴퓨터에서 OBS 사용 시 오디오 중단 및 그린 스크린 작업 중 발생하는 문제

하드웨어 인코더를 사용하거나 스트리밍 야드를 사용하세요
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) 또는 [RiverSide.FM](http://riverside.fm/)

## 크레딧

- Ryan
- Ajay
- Arky

## 자료

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

오피스 시간: 미디어 및 디지털 이벤트 커뮤니티
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
