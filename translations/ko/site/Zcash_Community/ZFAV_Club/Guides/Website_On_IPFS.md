<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# IPFS에서 웹사이트 게시하기

![](/content-images/IPFS-40c2e22732.webp)

## IPFS 소개

IPFS(인터플래너터리 파일 시스템)은 파일을 저장하고 공유하는 탈중앙화 방식을 만들기 위해 설계된 피어 투 피어 프로토콜이자 네트워크입니다.

기존 인터넷의 클라이언트-서버 모델과 달리, IPFS에서는 사용자가 중앙 서버에 콘텐츠 저장과 배포를 맡기는 대신 서로 직접 파일을 공유할 수 있습니다.

IPFS의 파일은 콘텐츠 주소 지정(content-addressing) 방식으로 식별됩니다. 즉, 각 파일은 콘텐츠를 바탕으로 고유한 해시 또는 콘텐츠 식별자(CONTENT IDENTIFIER, CID)를 부여받으며, 네트워크에서 파일을 가져올 때 이 해시를 사용합니다.

IPFS는 CID로 식별되는 블록으로 콘텐츠를 저장합니다. 파일을 추가하면 사용자의 노드에 저장되며 다른 노드에 자동으로 복사되지는 않습니다. 다른 독자가 파일을 가져올 수 있도록 온라인 상태에서 접근할 수 있는 복사본을 유지하거나 원격 고정을 설정하세요. [IPFS 지속성](https://docs.ipfs.tech/concepts/persistence/)을 참조하세요.

[IPFS 소개](https://blog.infura.io/post/an-introduction-to-ipfs) 읽기



## 사이트 만들기

이 예시에서는 간단한 웹사이트를 만듭니다.

[예시 사이트](https://squirrel.surf)


**1단계:** 웹 디자인에 익숙하지 않다면 웹사이트의 제목, 본문 텍스트, 다른 페이지나 사이트로 연결되는 링크, 바닥글을 포함해 주요 콘텐츠를 작성하세요.

**2단계:** [HTML 템플릿!](https://nicepage.com/html-templates)을 사용하세요. 작성한 텍스트를 적절한 위치에 붙여 넣으세요. 선택 사항으로 웹사이트용 .CSS 스타일시트도 만들 수 있습니다.

**3단계:** 사이트 폴더의 루트에 홈페이지를 `index.html`로 저장하세요. 이미지와 CSS도 포함하고, IPFS 게이트웨이 URL에서도 작동하도록 `style.css`와 같은 상대 경로를 사용하세요.



## 노드 설정하기

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)에서 노드를 관리합니다. 사이트를 공유하는 동안 계속 실행해 두세요.

[명령줄 방식](https://docs.ipfs.tech/how-to/command-line-quick-start/)을 사용하려면 먼저 새 저장소를 초기화합니다.

```sh
ipfs init
```

그런 다음 노드를 시작하고 이 터미널을 열어 둡니다.

```sh
ipfs daemon
```

나머지 명령은 두 번째 터미널에서 실행하세요. IPFS Desktop에서 이미 이 저장소를 관리하고 있다면 두 번째 데몬을 시작하지 마세요.

**IPFS에 사이트 폴더 추가하기**:

IPFS Desktop에서 폴더 추가 옵션을 사용해 웹사이트 파일이 있는 폴더를 선택하세요.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

CLI 방식을 사용하려면 사이트 폴더의 상위 디렉터리에서 다음 명령을 실행하세요.

```sh
ipfs add -r folder_name
```

`folder_name`를 폴더 이름으로 바꾸세요(공백이 있는 이름은 따옴표로 묶으세요). 마지막 `added ... folder_name` 줄에 표시되는 CID를 저장하세요. 이 CID는 `index.html`만이 아니라 디렉터리 전체를 식별합니다.


### IPFS에서 사이트 고정하기:

CLI `ipfs add` 명령은 기본적으로 가져온 콘텐츠를 로컬에 고정합니다. 다음 명령으로 폴더가 고정되었는지 확인하세요.

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID`를 이전 단계에서 얻은 CID로 바꾸세요. 출력에 `recursive`라고 표시되어야 합니다. 고정하면 이 노드의 복사본이 가비지 수집되는 것을 방지하지만, 컴퓨터가 꺼져 있을 때도 온라인 상태를 유지해 주지는 않습니다. 노드가 오프라인일 때도 콘텐츠를 이용할 수 있도록 [원격 고정](https://docs.ipfs.tech/how-to/work-with-pinning-services/)을 설정하고 원격 서비스의 고정이 완료되었는지 확인하세요.

### IPFS에서 웹사이트에 접속하기:

먼저 `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/`의 로컬 게이트웨이에서 사이트를 확인하세요(데몬이 다른 게이트웨이 포트를 표시했다면 해당 포트를 사용하세요). 끝에 슬래시를 붙이면 상대 링크가 디렉터리 안에서 올바르게 연결됩니다.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/`와 같은 공개 게이트웨이는 접근 가능한 노드에서 콘텐츠를 가져올 수 있으면 사이트를 제공할 수 있습니다. 로컬 미리보기가 정상적으로 표시되어도 공개적으로 이용할 수 있다는 뜻은 아닙니다.

이 예시의 CID는 “QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3”입니다.


## IPNS

인터플래너터리 네이밍 시스템(IPNS)을 사용하면 IPFS CID를 업데이트하면서 정적 링크를 계속 제공할 수 있습니다. 키로 제공됩니다.

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFS 데스크톱 애플리케이션에서 사이트 폴더의 설정 메뉴를 열고 IPNS에 게시를 선택하세요.

![](/content-images/IPNS-2fe62cc369.webp)

키: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

게이트웨이를 통해 사이트를 보는 데에도 사용할 수 있습니다. https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS 링크
 
사이트를 만들었으니 이제 URL이 콘텐츠를 가리키도록 설정해야 합니다.

`example.com`의 경우, 이 DNS 레코드를 추가하고 `YOUR_FOLDER_CID`를 디렉터리 CID로 바꾸세요.

| 유형 | 이름 | 값 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

일부 DNS 제공업체는 영역 이름을 자동으로 추가하므로, 해당 입력란에는 `_dnslink`만 입력하세요. 위의 IPNS 이름을 사용하는 경우 값은 대신 `dnslink=/ipns/YOUR_IPNS_NAME`로 입력할 수 있습니다. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)을 참조하세요.

![](/content-images/example-c2a9edb28b.webp)

DNS 전파가 완료되면 `https://ipfs.io/ipns/example.com/`을 시도해 보세요. 사이트를 `https://example.com/`에서 직접 제공하려면 DNSLink을 지원하는 게이트웨이와 HTTPS 설정도 필요합니다. TXT 레코드만으로는 이러한 설정이 완료되지 않습니다. [사용자 지정 도메인 안내](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)를 따르세요.

축하합니다! 검열에 강한 웹사이트를 설정했습니다.


**자료**

[IPFS 문서](https://docs.ipfs.tech)

[IPNS 문서](https://docs.ipfs.tech/concepts/ipns/)

[DNS 링크 문서](https://dnslink.io/#introduction)
