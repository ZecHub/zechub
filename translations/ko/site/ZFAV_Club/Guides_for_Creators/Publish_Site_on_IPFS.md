<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# IPFS에 사이트 게시하기

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS 소개

IPFS(인터플래너터리 파일 시스템)은 파일을 저장하고 공유하는 탈중앙화 방식을 만들기 위해 설계된 피어 투 피어 프로토콜이자 네트워크입니다.

기존 인터넷의 클라이언트-서버 모델과 달리, IPFS를 사용하면 중앙 서버에 콘텐츠 저장과 배포를 맡기지 않고 사용자끼리 파일을 직접 공유할 수 있습니다.

IPFS의 파일은 *콘텐츠 주소 지정* 방식으로 식별합니다. 즉, 각 파일의 콘텐츠를 기준으로 고유한 해시 또는 콘텐츠 식별자(CONTENT IDENTIFIER, CID)가 생성되며, 이 해시를 사용해 네트워크에서 파일을 가져옵니다.

IPFS는 CID로 식별되는 블록 형태로 콘텐츠를 저장합니다. 파일을 추가하면 내 노드에 저장되지만, 다른 노드에 자동으로 복사되지는 않습니다. 다른 사용자가 파일을 가져올 수 있도록 온라인에서 접근 가능한 사본을 유지하거나 원격 고정을 설정하세요. 자세한 내용은 [IPFS 지속성](https://docs.ipfs.tech/concepts/persistence/)을 참조하세요.

**읽어 보기: [IPFS 소개](https://blog.infura.io/post/an-introduction-to-ipfs)**

## 사이트 만들기

이 예제에서는 간단한 웹사이트를 만듭니다.

[예제 사이트](https://squirrel.surf/)

**1단계:** 웹 디자인에 익숙하지 않다면 웹사이트의 제목, 본문, 다른 페이지나 사이트로 연결되는 링크, 바닥글을 포함해 주요 콘텐츠를 작성하세요.

**2단계:** [HTML 템플릿!](https://nicepage.com/html-templates)을 사용해 작성한 텍스트를 적절히 붙여 넣으세요. 원하는 경우 웹사이트용 .CSS 스타일시트도 만들 수 있습니다.

**3단계:** 사이트 폴더의 최상위 경로에 홈페이지를 `index.html`로 저장하세요. 이미지와 CSS 파일도 포함하고, `style.css` 같은 상대 경로를 사용해 IPFS 게이트웨이 URL에서도 제대로 작동하도록 하세요.

## 노드 설정하기

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)에서 노드를 관리합니다. 사이트를 공유하는 동안 계속 실행해 두세요.

[명령줄 방식](https://docs.ipfs.tech/how-to/command-line-quick-start/)을 사용하려면 새 저장소를 한 번 초기화하세요.

```sh
ipfs init
```

그런 다음 노드를 시작하고 이 터미널을 열어 두세요.

```sh
ipfs daemon
```

나머지 명령은 두 번째 터미널에서 실행하세요. IPFS Desktop에서 이미 이 저장소를 관리하고 있다면 데몬을 추가로 시작하지 마세요.

### **사이트 폴더를 IPFS에 추가하기**:

IPFS Desktop에서 Add Folder 옵션을 사용해 웹사이트 파일이 들어 있는 폴더를 선택하세요.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI 방식에서는 사이트 폴더의 상위 디렉터리에서 다음을 실행하세요.

```sh
ipfs add -r folder_name
```

`folder_name`을 폴더 이름으로 바꾸세요. 이름에 공백이 있으면 따옴표로 묶으세요. 마지막 `added ... folder_name` 줄에 표시되는 CID를 저장하세요. 이 CID는 `index.html`만이 아니라 디렉터리 전체를 식별합니다.

### IPFS에서 사이트 고정하기:

CLI의 `ipfs add` 명령은 기본적으로 가져온 콘텐츠를 로컬에 고정합니다. 다음 명령으로 폴더가 고정되었는지 확인하세요.

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID`을 이전 단계에서 가져온 CID로 바꾸세요. 출력에 `recursive`이라고 표시되어야 합니다. 고정하면 가비지 컬렉션으로부터 이 노드의 사본을 보호할 수 있지만, 컴퓨터를 끈 상태에서도 온라인으로 유지되는 것은 아닙니다. 노드가 오프라인일 때도 콘텐츠에 접근할 수 있도록 [원격 고정](https://docs.ipfs.tech/how-to/work-with-pinning-services/)을 설정하고 원격 서비스가 고정을 완료했는지 확인하세요.

### IPFS에서 웹사이트에 접근하기:

먼저 `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/`의 로컬 게이트웨이를 통해 사이트를 확인하세요. 포트가 다르면 데몬에 표시된 게이트웨이 포트를 사용하세요. 끝에 슬래시를 붙이면 상대 링크가 디렉터리 안에서 올바르게 연결됩니다.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` 같은 공개 게이트웨이는 접근 가능한 노드에서 콘텐츠를 가져올 수 있게 되면 사이트를 제공할 수 있습니다. 로컬 미리보기가 성공했다고 해서 공개적으로 접근할 수 있다는 뜻은 아닙니다.

이 예제에서 CID는 QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3입니다.

## IPNS

인터플래너터리 네이밍 시스템(IPNS)을 사용하면 웹사이트에 연결된 IPFS CID를 업데이트하면서도 고정 링크를 제공할 수 있습니다. 키 형태로 제공됩니다.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFS 데스크톱 애플리케이션에서 사이트 폴더의 설정 메뉴를 열고 Publish to IPNS을 선택하세요.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


키: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

게이트웨이를 통해 사이트를 보는 데에도 사용할 수 있습니다: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS 링크

사이트를 만들었으니 이제 URL이 콘텐츠를 가리키도록 설정해야 합니다.

`example.com`의 경우, 다음 DNS 레코드를 추가하고 `YOUR_FOLDER_CID`를 디렉터리 CID로 바꾸세요.

| 유형 | 이름 | 값 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

일부 DNS 제공업체는 영역 이름을 자동으로 덧붙이므로, 해당 입력란에는 `_dnslink`만 입력하세요. 위의 IPNS 이름을 사용하는 경우 값은 대신 `dnslink=/ipns/YOUR_IPNS_NAME`로 설정할 수 있습니다. 자세한 내용은 [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)을 참조하세요.


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS 전파가 완료된 후 `https://ipfs.io/ipns/example.com/`을 시도하세요. `https://example.com/`에서 사이트를 직접 제공하려면 DNSLink를 지원하는 게이트웨이와 HTTPS 설정도 필요합니다. TXT 레코드만으로는 이러한 설정이 완료되지 않습니다. [사용자 지정 도메인 안내](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)를 따르세요.

*축하합니다! 이제 검열에 강한 웹사이트를 갖추셨습니다.*

____

**자료**

[IPFS 문서](https://docs.ipfs.tech/)

[IPNS 문서](https://docs.ipfs.tech/concepts/ipns/)

[DNS 링크 문서](https://dnslink.io/#introduction)
