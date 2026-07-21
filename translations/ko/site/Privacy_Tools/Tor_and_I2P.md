<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 왜 프라이버시가 중요한가

디지털 시대에 [프라이버시](https://www.privacyguides.org/en/)를 보호하는 것이 점점 더 중요해졌습니다. 일부 사람들은 프라이버시가 사라졌다고 생각할 수 있지만, 사실 그렇지 않습니다. 당신의 프라이버시는 위협받고 있으며, 이에 대해 걱정해야 합니다. 프라이버시는 권력을 다루는 것과 관련이 있기 때문에 매우 중요한 가치를 지니고 있습니다.

## Tor & I2P 기술

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor)은 애플리케이션의 연결을 위해 Tor 네트워크를 사용하는 프록시 도구입니다. Torbot은 이 작업을 수행하기 위해 트래픽을 Tor로 라우팅하여 이러한 애플리케이션에 대한 [프라이버시 및 익명성](https://www.torproject.org/)을 향상시킵니다.

## I2P 네트워크

I2P 네트워크는 또한 [Invisible Internet Project](https://geti2p.net/en/about/intro)라고 불리는 완전히 암호화된 피어투피어 오버레이 네트워크입니다. 이 네트워크는 메시지의 내용, 출처 및 목적지를 관찰자에게 숨기는 것을 보장합니다. 즉, 누구도 트래픽의 원점이나 목적지 또는 전송 중인 메시지의 실제 내용을 볼 수 없습니다. I2P에서 사용되는 암호화는 사용자의 프라이버시와 익명성을 높은 수준으로 보장합니다.

## Tor과 I2P는 공통된 기능이 있지만 중요한 차이점도 있습니다.

Tor과 I2P 모두 분산형이고 익명적인 피어투피어 네트워크이지만, I2P는 Tor에 비해 보안 수준이 더 높습니다. 그러나 I2P는 일반 인터넷에 접속할 수 없으며, 이 네트워크 내에서 이메일, 채팅 및 토렌트 다운로드와 같은 서비스에만 접근하도록 설계되었습니다. 반면 Tor는 I2P처럼 딥웹에 액세스할 수 있으며, 표면 웹의 웹사이트에도 일반 브라우저 역할을 수행하여 액세스할 수 있습니다.

*참고: Tor과 I2P의 유사점 및 차이점에 대한 더 많은 정보는 [여기](https://geti2p.net/en/comparison/tor)에서 확인하세요.*

## 스마트폰에서 Ywallet과 Tor 통합

Orbot은 스마트폰을 위한 비용 없는 가상 사설망(VPN)으로, 장치의 모든 애플리케이션 트래픽을 Tor 네트워크를 통해 전달합니다.

다음 단계에 따라 Zcash 지갑(Ywallet)에 Tor를 연결하세요:

1.  Orbot을 앱 스토어에서 다운로드하고 설치합니다.

2.  설치 후 환영 메시지가 나타납니다. 계속해서 *Orbot* 홈 페이지로 이동하고 *'Tor Enabled Apps'*를 클릭합니다.

3.  화면에 Tor 호환 애플리케이션을 보여주는 페이지가 나타납니다. *Ywallet* 앱을 찾아 선택되어 있는지 확인하세요.

4.  VPN 설정을 위한 연결 요청이 나타나며, 이는 Orbot이 네트워크 트래픽을 모니터링하도록 허용합니다. 이 권한이 승인되면 Orbot이 초기화됩니다.

5. 작업 표시줄 또는 Orbot 홈 페이지에서 Tor가 실행되고 있는지 확인하세요. 'Tor 네트워크에 연결됨'이라는 메시지를 보았을 때 확인됩니다.

* 동영상 튜토리얼은 [여기](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)에서 시청할 수 있습니다.

*참고: 모바일 네트워크가 Tor을 차단하는 경우, 대체로 브리지 서버를 사용하여 연결할 수 있습니다.*

## 컴퓨터/데스크탑에서 Torbot과 함께 Zcash 지갑 설정 방법

## Zcash에 Tor 지원이 있나요?

* 공식 웹사이트에서 Tor 브라우저를 다운로드할 수 있으며, 링크는 [여기](https://www.torproject.org/download/)에서 확인하세요.

Tor을 설치하는 가장 편리한 방법은 Tor Browser Bundle을 통해 설치하는 것입니다. 헤드리스 설치를 선호하는 경우, 별도로 Tor 데몬을 설치할 수 있습니다.

*참고: 기본적으로 Tor Browser Bundle은 tcp/9150에서 SOCKS 리스너를 노출시키며, Tor 데몬은 tcp/9050에서 SOCKS 리스너를 노출시킵니다.*

* 운영체제에 따라 Tor Project가 제공하는 설치 [지침](https://support.torproject.org/apt/)을 따르세요.

## Zcashd 지갑 설치

Zcashd는 Electric Coin Co.의 핵심 개발자들이 업데이트 및 유지 관리하는 공식 Linux 기반 전체 노드 지갑입니다. 이 지갑은 채굴, 트랜잭션 검증, 그리고 Zcash 송금 및 수신을 원하는 사용자에게 적합합니다.

* 공식 웹사이트에서 Zcashd 지갑을 다운로드할 수 있는 주소는 [여기](https://electriccoin.co/zcashd/)입니다.

* 지갑 설치: Zcash 지갑 개발자들이 제공한 튜토리얼 동영상 링크는 [여기](https://www.youtube.com/watch?v=hTKL0jPu7X0)에서 확인하세요.

## Tor을 사용하여 Zcashd 실행

* Zcashd를 Tor SOCKS 프록시로 구성하려면, 데몬 명령에 -proxy 명령줄 인수를 추가하면 됩니다.

예:

  $ zcashd -proxy=127.0.0.1:9050
      
대안적으로, 다음 줄을 zcash.conf 파일에 추가할 수 있습니다:

  proxy=127.0.0.1:9050

설정 변경이 적용되도록 하기 위해 zcashd를 다시 시작하는 것이 권장됩니다.

이것은 Tor 데몬이 사용되고 있다는 가정에 기반합니다. 만약 Tor Browser Bundle을 사용하고 있다면, 9050 대신 9150로 교체하세요.

또한, -listenonion 명령줄 인수를 추가하여 데몬이 노드가 접근 가능한 .onion 주소를 생성하도록 할 수 있습니다.
