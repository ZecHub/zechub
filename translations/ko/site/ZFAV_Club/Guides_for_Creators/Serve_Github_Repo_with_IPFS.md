<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# IPFS를 사용하여 GitHub 저장소 제공

## 소개

이 가이드에서는 IPFS CID를 사용하여 제공되는 GitHub 저장소에 대해 git clone 가능한 URL을 생성하는 방법을 배우게 됩니다.

이것은 지리적 지역, 검열 저항 및 귀중한 정보의 지속적인 백업을 보장하는 데 유용합니다!

참고: IPFS로 업로드된 데이터는 네트워크 사용자 모두에게 제공됩니다. 개인/민감한 데이터를 로컬에서 암호화하는 것이 좋습니다.

## IPFS Kubo 설치

[여기](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)에 제공된 설치 지침을 따르세요.

이 예제에서는 Linux를 사용하지만 다른 OS 버전도 이용 가능합니다.

설치가 성공했는지 확인하려면 `ipfs --version` 명령어를 실행하세요.

## 저장소 클론

시작으로, 호스팅하고 싶은 Git 저장소를 선택하고 그 저장소를 클론하세요:

실행 명령: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

이제 IPFS를 통해 클론할 준비가 되었습니다.

cd zechub git update-server-info

Git 객체를 풀어주세요:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

이 작업을 수행하면 나중에 Git 저장소를 업데이트할 경우 IPFS가 객체 중복 제거를 가능하게 합니다.

## IPFS에 추가

이 작업을 완료한 후, 해당 저장소는 제공 준비가 되었습니다. 남은 일은 그 저장소를 IPFS에 추가하는 것입니다:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

결과 CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

좋습니다! 이제 저장소가 네트워크에 업로드되었습니다.

## IPFS를 사용하여 클론

이제 다음과 같이 GitHub 저장소를 검색하고 가져올 수 있습니다:

git clone http://ipfs.io/ipfs/yourCID

대안적으로 로컬 IPFS 노드를 통해 검색 및 다운로드가 가능합니다.

마지막 참고 사항: IPFS에 있는 repo 폴더는 실제 GitHub 저장소와 함께 업데이트되지 않습니다. 정기적으로 폴더를 다시 업로드하는 것이 좋습니다.
