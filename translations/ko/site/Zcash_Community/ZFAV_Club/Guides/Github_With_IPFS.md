<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS를 사용하여 Github 저장소 제공

## 소개

이 가이드에서는 IPFS CID를 사용하여 제공되는 GitHub 저장소에 대한 git cloneable URL을 생성하는 방법을 배우게 됩니다. 이는 지리적 지역과 관계없이 콘텐츠의 가용성을 보장하고 검열 저항성 및 중요한 정보의 지속 가능한 백업으로 유용합니다!

참고: IPFS에 업로드된 데이터는 *모든* 네트워크 사용자에게 제공됩니다. 개인/민감한 데이터를 로컬에서 암호화하는 것이 좋습니다.


## IPFS Kubo 설치

[여기](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)에서 제공된 설치 지침을 따르세요.

이 예제에서는 Linux를 사용하지만, 다른 OS 버전도 이용 가능합니다. 

"ipfs --version" 명령어로 설치가 성공했는지 확인하세요.


## 저장소 클론

시작으로, 호스팅하고 싶은 Git 저장소를 선택하고 그 저장소를 클론하세요:

실행 명령: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


이제 IPFS를 통해 클론할 준비가 되었습니다.

cd zechub
git update-server-info


Git의 객체를 풀어주세요:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

이 작업을 수행하면 나중에 Git 저장소를 업데이트할 경우 IPFS가 객체를 중복 제거하도록 허용합니다.


## IPFS에 추가

그 후, 해당 저장소는 제공 준비가 되었습니다. 남은 일은 IPFS에 추가하는 것입니다:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

결과 CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

좋습니다! 이제 저장소가 네트워크에 업로드되었습니다.


## IPFS를 사용하여 클론

이제 다음과 같이 GitHub 저장소를 검색하고 복구할 수 있어야 합니다:

git clone http://ipfs.io/ipfs/"yourCID"

대안적으로 로컬 IPFS 노드를 사용하여 검색 및 복구가 가능합니다. 

마지막 참고 사항: IPFS의 repo 폴더는 실제 GitHub 저장소와 함께 업데이트되지 않습니다. 정기적으로 폴더를 다시 업로드하는 것이 좋습니다.
