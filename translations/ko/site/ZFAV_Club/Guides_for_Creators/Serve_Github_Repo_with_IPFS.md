<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS로 GitHub 저장소 제공하기

## 소개

이 가이드에서는 IPFS CID를 사용해 제공되는 GitHub 저장소를 Git으로 복제할 수 있는 URL을 만드는 방법을 알아봅니다.

이렇게 하면 지역에 관계없이 콘텐츠를 이용할 수 있고, 검열에 저항할 수 있으며, 중요한 정보를 지속적으로 백업할 수 있습니다.

참고: IPFS에 업로드된 데이터는 모든 네트워크 사용자가 이용할 수 있습니다. 개인 정보나 민감한 데이터는 로컬에서 암호화하는 것이 좋습니다.

## IPFS Kubo 설치

[여기](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)에 안내된 설치 지침을 따르세요.

이 예시에서는 Linux을 사용합니다. 다른 OS 버전도 사용할 수 있습니다.

ipfs –version을 실행해 설치가 성공적으로 완료되었는지 확인하세요.

## 저장소 복제

먼저 호스팅할 Git 저장소를 선택하고 복제합니다.

명령어 실행: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

이제 IPFS을 통해 복제할 수 있도록 준비합니다.

cd zechub git update-server-info

Git 객체 압축을 풉니다.

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

이렇게 하면 나중에 Git 저장소를 업데이트할 때 IPFS에서 객체를 중복 제거할 수 있습니다.

## IPFS에 추가

이 작업을 완료하면 저장소를 제공할 준비가 됩니다. 이제 IPFS에 추가하기만 하면 됩니다.

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

결과 CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

좋습니다! 이제 저장소가 네트워크에 업로드되었습니다.

## IPFS을 사용해 복제

이제 다음 명령어를 사용해 GitHub 저장소를 가져올 수 있습니다.

git clone http://ipfs.io/ipfs/yourCID

또는 로컬 IPFS 노드를 사용해 검색하고 가져올 수도 있습니다.

마지막 참고 사항: IPFS의 저장소 폴더는 실제 GitHub 저장소의 업데이트를 반영하지 않습니다. 정기적으로 폴더를 다시 업로드하는 것이 좋습니다.
