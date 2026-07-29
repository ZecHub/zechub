<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS에 사이트 게시

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## IPFS 소개

IPFS(InterPlanetary File System)는 파일을 저장하고 공유하는 분산된 방법을 만들기 위해 설계된 피어 투 피어 프로토콜 및 네트워크입니다.

인터넷의 전통적인 클라이언트-서버 모델과 달리 IPFS는 사용자가 서로 직접 파일을 공유할 수 있도록 하여, 중앙 집중식 서버에 의존하지 않고 콘텐츠를 저장하고 분배하는 것을 가능하게 합니다.

IPFS의 파일은 *콘텐츠 주소 지정* 방식으로 참조됩니다. 이는 각 파일이 내용 기반으로 고유한 해시 또는 CONTENT IDENTIFIER (CID)가 부여되며, 이 해시는 네트워크에서 파일을 검색하는 데 사용됩니다.

사용자가 IPFS에 파일을 추가하면 파일은 작은 조각들인 블록으로 나뉘고, 각 블록에는 CID가 부여됩니다. 이러한 블록들은 네트워크의 다른 노드에 저장되어, 파일이 여러 출처에서 쉽게 검색될 수 있도록 합니다.

이러한 방식은 중복성과 고장 허용성을 보장하면서도, 어떤 하나의 노드가 단일 고장 지점이나 통제 요소가 되는 것을 어렵게 만듭니다.

**읽기: [IPFS 소개](https://blog.infura.io/post/an-introduction-to-ipfs)**

## 사이트 생성

이 예시에서는 간단한 웹사이트를 생성합니다.

[예시 사이트](https://squirrel.surf/)

**1단계:** 웹 디자인에 익숙하지 않다면, 제목, 메인 본문 텍스트, 다른 페이지/사이트 및 푸터로 구성된 웹사이트의 주요 콘텐츠를 작성합니다.

**2단계:** [HTML 템플릿](https://nicepage.com/html-templates)을 사용하세요. 작성한 텍스트를 적절히 붙여넣고, 웹사이트에 대한 .CSS 스타일시트도 선택적으로 생성할 수 있습니다.

**3단계:** 디렉토리를 저장합니다. 모든 .html 페이지와 이미지는 동일한 폴더에 있어야 합니다.

## 노드 설정

[공식 사이트](https://docs.ipfs.tech/install/ipfs-desktop/)에서 IPFS를 다운로드하고 설치하세요.

### IPFS 초기화:

데스크탑 애플리케이션을 사용하는 경우, 초기화는 필요 없습니다.

터미널이나 명령 프롬프트를 사용하여 다음 명령어를 실행합니다: ipfs init

### **사이트 폴더를 IPFS에 추가**:

웹사이트 파일이 있는 폴더를 선택하고 "Add Folder" 옵션으로 이동합니다.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

터미널을 사용하는 경우, 다음 명령어를 실행하여 폴더를 IPFS에 재귀적으로 추가합니다: ipfs add -r folder_name

### IPFS에 사이트 고정:

웹사이트 파일이 IPFS에 추가된 후에는 그들이 네트워크에서 계속 이용 가능하도록 **고정**해야 합니다.

–

터미널을 사용하는 경우, 다음 명령어를 실행하세요: ipfs pin add **hash**

**hash** = 이전 단계에서 추가한 폴더의 CID입니다.

또는 [Pinata](https://pinata.cloud/) 또는 [Dolpin](https://dolpin.io/)과 같은 서비스를 사용하여 디렉토리를 고정할 수도 있습니다.

시간을 많이 절약할 수 있습니다!

–

### IPFS에서 사이트에 액세스:

이제 웹사이트는 IPFS에 게시되었으며, 폴더의 해시를 사용하여 액세스할 수 있습니다. 웹사이트에 액세스하려면 https://ipfs.io/ipfs/**hash**로 이동하세요.

**hash** = 폴더의 CID입니다.

우리의 경우 CID는 QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3입니다.

## IPNS

Interplanetary Naming System (IPNS)은 웹사이트와 연결된 IPFS CIDs를 업데이트할 수 있도록 하여 정적 링크를 제공합니다. 이는 키로 제공됩니다.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


IPFS 데스크탑 애플리케이션에서 사이트 폴더의 설정 메뉴로 이동하여 IPNS에 게시를 선택합니다.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


키: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

이 키는 게이트웨이를 통해 사이트를 볼 수 있게 해줍니다: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS 링크

사이트가 생성되었으므로, 이제 URL을 콘텐츠로 연결하는 방법이 필요합니다.

이미 웹 주소를 소유하고 있다면 _dnslink(your domain)의 TXT 레코드를 추가하여 새 레코드를 만들 수 있습니다. 제공업체에 따라 자동으로 채워질 수도 있습니다.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


네트워크를 통해 전파되기까지 시간이 걸릴 수 있습니다.

*축하합니다! 이제 검열에 강한 웹사이트가 있습니다.*

____

**자료**

[IPFS 문서](https://docs.ipfs.tech/)

[IPNS 문서](https://docs.ipfs.tech/concepts/ipns/)

[DNS 링크 문서](https://dnslink.io/#introduction)
