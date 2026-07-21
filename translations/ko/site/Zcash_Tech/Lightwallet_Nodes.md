<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash 라이트월릿 노드

## 소개

프라이버시 중심의 암호화폐인 Zcash는 전체 블록체인 기록을 다운로드하지 않아도 Zcash 블록체인과 상호작용할 수 있는 "라이트월릿 노드"라는 기능을 지원합니다. 이 위키 페이지에서는 라이트월릿 노드에 대한 개요, "라이트월릿d" 서비스가 Zcash 생태계에서 수행하는 역할, 현재 제공되는 라이트월릿 노드 서버 목록, 그리고 Ywallet과 Zingo와 같은 인기 있는 지갑 앱에서 서버를 변경하는 방법을 설명합니다.

## 라이트월릿d 서비스

"라이트월릿d"(lightwalletd) 서비스는 "라이트월릿 데몬"(lightwallet daemon)의 줄임말로, Zcash 라이트월릿 노드 생태계에서 중요한 역할을 수행합니다. 이 서비스는 가벼운 클라이언트(라이트월릿)가 효과적으로 작동하기 위해 필요한 정보를 제공하는 중개자 역할을 합니다. 다음은 라이트월릿d 서비스에 대한 간단한 설명입니다:

__데이터 집합기__: 라이트월릿d는 Zcash 블록체인에서 거래 정보, 블록 데이터 및 쉴드 풀 정보와 같은 데이터를 수집합니다.

__간편한 검증__: 라이트월릿d는 이 데이터의 간단한 검증을 수행하여, 라이트월릿이 전체 블록체인을 검증하지 않아도 필요한 정보에 접근할 수 있도록 합니다.

__프라이버시 보호__: 서비스는 Zcash 사용자의 프라이버시를 보호하기 위해 그들의 시각 키나 개인 거래 정보를 노출시키지 않도록 합니다.

__효율적인 동기화__: 라이트월릿d는 라이트월릿에 대한 효율적인 동기화를 가능하게 하여, Zcash 블록체인과 최신 상태로 맞추는 데 필요한 시간과 자원을 크게 줄입니다.


## 현재 제공되는 라이트월릿d 서버 목록

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## 모바일 지갑에서 서버 변경 방법

라이트월릿 노드 서버를 변경하는 것은 상대적으로 간단합니다. 애플리케이션 내의 고급 설정을 찾아 접근하세요.

__Ywallet/Zingo/Zashi/eZcash 열기__: 원하는 지갑을 기기에서 실행합니다.

#### Ywallet:

Ywallet에서는 오른쪽 상단 모서리에 있는 톱니바퀴 아이콘으로 이동하여 Zcash 탭으로 들어갑니다. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

Zingo에서는 왼쪽 상단 모서리에 있는 해amburger 메뉴에서 설정을 클릭하고 아래로 스크롤합니다.

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

Zashi에서는 오른쪽 상단 모서리에 있는 톱니바퀴 아이콘으로 이동하여 고급 설정을 선택하고, 그 후 서버를 선택합니다.

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

eZcash에서는 왼쪽 상단 모서리에 있는 해amburger 메뉴에서 설정을 클릭하고, 고급 설정으로 이동합니다.

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## 결론

Zcash의 라이트월릿 노드와 라이트월릿d 서비스는 사용자가 블록체인과 상호작용하는 데 편리하고 프라이버시를 보호하는 방법을 제공합니다. 서버 변경 기능은 필요에 따라 가장 적합한 노드를 선택할 수 있는 유연성을 제공합니다.
