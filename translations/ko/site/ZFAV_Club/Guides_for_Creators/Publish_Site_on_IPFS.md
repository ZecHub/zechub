<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS에 사이트 게시

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS 소개

IPFS(InterPlanetary File System)는 파일을 저장하고 공유하는 분산된 방법을 만들기 위해 설계된 피어 투 피어 프로토콜 및 네트워크입니다.

인터넷의 전통적인 클라이언트-서버 모델과 달리 IPFS는 사용자가 서로 직접 파일을 공유할 수 있도록 하여, 중앙 집중식 서버에 의존하지 않고 콘텐츠를 저장하고 분배하는 것을 가능하게 합니다.

IPFS의 파일은 *콘텐츠 주소 지정* 방식으로 참조됩니다. 이는 각 파일이 내용 기반으로 고유한 해시 또는 CONTENT IDENTIFIER (CID)가 부여되며, 이 해시는 네트워크에서 파일을 검색하는 데 사용됩니다.

IPFS는 콘텐츠를 CID로 식별되는 블록 형태로 저장합니다. 파일을 추가하면 해당 파일은 사용자의 노드에 저장될 뿐, 다른 노드로 자동 복사되지는 않습니다. 다른 사용자가 파일을 검색할 수 있도록 접근 가능한 사본을 온라인 상태로 유지하거나 원격 피닝(remote pinning)을 설정하세요. [IPFS 지속성](https://docs.ipfs.tech/concepts/persistence/)을 참조하세요.

**읽기: [IPFS 소개](https://blog.infura.io/post/an-introduction-to-ipfs)**

## 사이트 생성

이 예시에서는 간단한 웹사이트를 생성합니다.

[예시 사이트](https://squirrel.surf/)

**1단계:** 웹 디자인에 익숙하지 않다면, 제목, 메인 본문 텍스트, 다른 페이지/사이트 및 푸터로 구성된 웹사이트의 주요 콘텐츠를 작성합니다.

**2단계:** [HTML 템플릿](https://nicepage.com/html-templates)을 사용하세요. 작성한 텍스트를 적절히 붙여넣고, 웹사이트에 대한 .CSS 스타일시트도 선택적으로 생성할 수 있습니다.

**3단계:** 홈페이지를 사이트 폴더의 루트에 있는 `index.html`에 넣으세요. 이미지와 CSS도 함께 포함하되, `style.css`와 같은 상대 경로를 사용하면 IPFS 게이트웨이 URL에서도 제대로 작동합니다.

## 노드 설정

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)이(가) 노드를 대신 관리해 줍니다. 사이트를 공유하는 동안에는 계속 실행해 두세요.

[명령줄 방식](https://docs.ipfs.tech/how-to/command-line-quick-start/)의 경우, 새 저장소를 한 번 초기화하세요:

```sh
ipfs init
```

그런 다음 노드를 시작하고 이 터미널을 열어 둔 채로 두세요:

```sh
ipfs daemon
```

나머지 명령은 두 번째 터미널에서 실행하세요. IPFS Desktop이 이미 이 저장소를 관리하고 있다면 두 번째 데몬을 시작하지 마세요.

### **사이트 폴더를 IPFS에 추가**:

IPFS Desktop에서 폴더 추가 옵션을 사용해 웹사이트 파일이 들어 있는 폴더를 선택합니다.

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI 방식을 사용하려면 사이트 폴더의 상위 디렉터리에서 다음 명령을 실행하세요:

```sh
ipfs add -r folder_name
```

`folder_name`을(를) 폴더 이름으로 바꾸세요(공백이 포함된 이름은 따옴표로 감싸세요). 마지막 `added ... folder_name` 줄의 CID를 저장하세요. 이 CID는 `index.html`만이 아니라 디렉터리 전체를 식별합니다.

### IPFS에 사이트 고정:

CLI `ipfs add` 명령은 가져온 콘텐츠를 기본적으로 로컬에 고정(pin)합니다. 다음 명령으로 폴더 고정 상태를 확인하세요:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID`을(를) 이전 단계에서 얻은 CID로 바꾸세요. 출력에는 `recursive`이(가) 표시되어야 합니다. 고정(pinning)은 이 노드의 사본이 가비지 컬렉션으로 삭제되지 않도록 보호하지만, 꺼진 컴퓨터를 온라인 상태로 유지해 주지는 않습니다. 노드가 오프라인일 때도 가용성을 확보하려면 [원격 고정](https://docs.ipfs.tech/how-to/work-with-pinning-services/)을 설정하고, 원격 서비스가 고정을 완료했는지 확인하세요.

### IPFS에서 사이트에 액세스:

먼저 `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/`의 로컬 게이트웨이를 통해 사이트를 확인하세요(데몬이 출력한 게이트웨이 포트가 다르다면 그 포트를 사용하세요). 끝에 붙은 슬래시 덕분에 상대 링크가 디렉터리 안에서 올바르게 연결됩니다.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/`와 같은 공개 게이트웨이는 접근 가능한 노드에서 콘텐츠를 가져올 수 있게 되면 이를 제공할 수 있습니다. 로컬 미리보기가 성공했다고 해서 공개적으로 이용 가능하다는 것이 증명되지는 않습니다.

우리의 경우 CID는 QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3입니다.

## IPNS

Interplanetary Naming System (IPNS)은 웹사이트와 연결된 IPFS CIDs를 업데이트할 수 있도록 하여 정적 링크를 제공합니다. 이는 키로 제공됩니다.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFS 데스크탑 애플리케이션에서 사이트 폴더의 설정 메뉴로 이동하여 IPNS에 게시를 선택합니다.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


키: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

이 키는 게이트웨이를 통해 사이트를 볼 수 있게 해줍니다: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS 링크

사이트가 생성되었으므로, 이제 URL을 콘텐츠로 연결하는 방법이 필요합니다.

`example.com`의 경우, 다음 DNS 레코드를 추가하고 `YOUR_FOLDER_CID`을(를) 사용자의 디렉터리 CID로 바꾸세요:

| 유형 | 이름 | 값 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

일부 DNS 제공업체는 영역(zone)을 자동으로 덧붙이므로, 그곳에는 `_dnslink`만 입력하면 됩니다. 위의 IPNS 이름을 사용하는 경우에는 값을 대신 `dnslink=/ipns/YOUR_IPNS_NAME`로 지정할 수 있습니다. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)를 참조하세요.

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS 전파가 완료된 후 `https://ipfs.io/ipns/example.com/`에 접속해 보세요. `https://example.com/`에서 사이트를 직접 제공하려면 DNSLink를 지원하는 게이트웨이와 HTTPS 구성도 필요합니다. TXT 레코드만으로는 이러한 설정이 이루어지지 않습니다. [사용자 지정 도메인 가이드](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)를 따르세요.

*축하합니다! 이제 검열에 강한 웹사이트가 있습니다.*

____

**자료**

[IPFS 문서](https://docs.ipfs.tech/)

[IPNS 문서](https://docs.ipfs.tech/concepts/ipns/)

[DNS 링크 문서](https://dnslink.io/#introduction)
