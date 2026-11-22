<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS에 웹사이트 게시하기 

![](/content-images/IPFS-40c2e22732.webp)

## IPFS 소개 

IPFS(InterPlanetary File System)는 파일을 탈중앙화 방식으로 저장하고 공유하기 위해 설계된 P2P 프로토콜이자 네트워크입니다. 

인터넷의 전통적인 클라이언트-서버 모델과 달리, IPFS에서는 중앙화된 서버가 콘텐츠를 저장하고 배포하는 데 의존하지 않고 사용자들이 서로 직접 파일을 공유할 수 있습니다. 

IPFS의 파일은 *콘텐츠 주소 지정(content-addressing)* 방식으로 식별됩니다. 즉, 각 파일에는 그 내용에 기반한 고유한 해시, 곧 콘텐츠 식별자(CONTENT IDENTIFIER, CID)가 부여되며, 이 해시를 사용해 네트워크에서 파일을 가져옵니다.

IPFS는 콘텐츠를 CID로 식별되는 블록 단위로 저장합니다. 파일을 추가하면 내 노드에 저장될 뿐, 다른 노드로 자동 복사되지는 않습니다. 다른 독자들이 콘텐츠를 가져올 수 있도록 접근 가능한 사본을 온라인 상태로 유지하거나 원격 피닝을 설정하세요. [IPFS 지속성](https://docs.ipfs.tech/concepts/persistence/)을 참고하세요.

[IPFS 입문](https://blog.infura.io/post/an-introduction-to-ipfs) 읽어 보기



## 사이트 만들기 

이 예시에서는 간단한 웹사이트를 만듭니다. 

[예시 사이트](https://squirrel.surf)


**1단계:** 웹 디자인에 익숙하지 않다면, 먼저 제목, 본문, 다른 페이지/사이트로 연결되는 링크, 푸터 등 웹사이트의 주요 내용을 작성하세요.

**2단계:** [HTML 템플릿!](https://nicepage.com/html-templates)을 사용하세요. 작성한 텍스트를 알맞은 위치에 붙여 넣습니다. 원한다면 웹사이트용 .CSS 스타일시트도 만들 수 있습니다. 

**3단계:** 홈페이지를 사이트 폴더의 루트에 `index.html`로 두세요. 이미지와 CSS도 함께 포함하고, IPFS 게이트웨이 URL에서도 작동하도록 `style.css` 같은 상대 경로를 사용하세요.



## 노드 설정하기

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)은 노드를 대신 관리해 줍니다. 사이트를 공유하는 동안에는 계속 실행해 두세요.

[명령줄 방식](https://docs.ipfs.tech/how-to/command-line-quick-start/)을 사용하는 경우, 새 저장소를 한 번 초기화합니다:

```sh
ipfs init
```

그런 다음 노드를 시작하고 이 터미널을 열어 둡니다:

```sh
ipfs daemon
```

나머지 명령은 두 번째 터미널에서 실행하세요. IPFS Desktop이 이미 이 저장소를 관리하고 있다면 두 번째 데몬을 시작하지 마세요.

**IPFS에 사이트 폴더 추가하기**: 

IPFS Desktop에서 Add Folder 옵션을 사용해 웹사이트 파일이 들어 있는 폴더를 선택하세요.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

CLI 방식에서는 사이트 폴더의 상위 디렉터리에서 다음을 실행하세요:

```sh
ipfs add -r folder_name
```

`folder_name`를 폴더 이름으로 바꾸세요(공백이 포함된 이름은 따옴표로 감싸세요). 마지막 `added ... folder_name` 줄에 나오는 CID를 저장해 두세요. 이 CID는 `index.html`만이 아니라 디렉터리 전체를 식별합니다.


### IPFS에 사이트 피닝하기:

CLI의 `ipfs add` 명령은 기본적으로 가져온 콘텐츠를 로컬에 피닝합니다. 다음 명령으로 폴더 피닝을 확인하세요:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID`를 이전 단계의 CID로 바꾸세요. 출력에 `recursive`가 표시되어야 합니다. 피닝은 이 노드의 사본이 가비지 컬렉션으로 삭제되지 않도록 보호하지만, 꺼진 컴퓨터를 온라인 상태로 유지해 주지는 않습니다. 노드가 오프라인일 때도 접근 가능하게 하려면 [원격 피닝](https://docs.ipfs.tech/how-to/work-with-pinning-services/)을 설정하고, 원격 서비스에서 피닝이 완료되었는지 확인하세요.

### IPFS에서 웹사이트 접속하기: 

먼저 로컬 게이트웨이 `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/`에서 사이트를 확인하세요(데몬이 출력한 게이트웨이 포트가 다르다면 그 포트를 사용하세요). 끝의 슬래시 덕분에 상대 링크가 디렉터리 안에서 올바르게 해석됩니다.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` 같은 공개 게이트웨이는 접근 가능한 노드에서 콘텐츠를 가져올 수 있게 되면 사이트를 제공할 수 있습니다. 로컬 미리보기가 성공했다고 해서 공개적으로 접근 가능하다는 의미는 아닙니다.

이 예시의 CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System(IPNS)을 사용하면 웹사이트와 연결된 IPFS CID를 업데이트하면서도 고정된 링크를 계속 제공할 수 있습니다. 이는 키 형태로 제공됩니다. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFS 데스크톱 애플리케이션에서 사이트 폴더의 설정 메뉴를 열고 Publish to IPNS를 선택하세요.  

![](/content-images/IPNS-2fe62cc369.webp)

키: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

이 키로 게이트웨이를 통해 사이트를 볼 수도 있습니다: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link 
 
사이트가 만들어졌으니, 이제 URL이 해당 콘텐츠를 가리키도록 할 방법이 필요합니다. 

`example.com`의 경우, 다음 DNS 레코드를 추가하고 `YOUR_FOLDER_CID`를 디렉터리 CID로 바꾸세요:

| 유형 | 이름 | 값 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

일부 DNS 제공업체는 존(zone)을 자동으로 덧붙이므로, 그런 경우에는 `_dnslink`만 입력하세요. 위의 IPNS 이름을 사용하는 경우, 값으로 `dnslink=/ipns/YOUR_IPNS_NAME`를 대신 쓸 수도 있습니다. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)를 참고하세요.

![](/content-images/example-c2a9edb28b.webp)

DNS가 전파된 후 `https://ipfs.io/ipns/example.com/`에 접속해 보세요. `https://example.com/`에서 사이트를 직접 제공하려면 DNSLink를 지원하는 게이트웨이와 HTTPS 구성도 필요하며, TXT 레코드만으로는 이를 설정할 수 없습니다. [커스텀 도메인 가이드](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)를 따르세요.

축하합니다! 검열 저항성을 갖춘 웹사이트를 구축했습니다. 


**자료**

[IPFS 문서](https://docs.ipfs.tech)

[IPNS 문서](https://docs.ipfs.tech/concepts/ipns/)

[DNS link 문서](https://dnslink.io/#introduction)
