<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 수정"/>
</a>

# GitHub 저장소를 IPFS로 제공하기

## 소개

이 가이드에서는 IPFS CID를 사용해 제공되는 GitHub 저장소를 Git으로 복제할 수 있는 URL을 만드는 방법을 알아봅니다. 이를 통해 지역에 관계없이 콘텐츠를 이용할 수 있고, 검열에 저항하며, 중요한 정보를 지속적으로 백업할 수 있습니다!

참고: IPFS에 업로드한 데이터는 네트워크의 *모든* 사용자가 이용할 수 있습니다. 개인 정보나 민감한 데이터는 로컬에서 암호화하실 수 있습니다.


## IPFS Kubo 설치

설치 안내는 [여기](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)에서 확인하세요.

이 예시에서는 Linux을 사용하지만, 다른 OS 버전도 이용할 수 있습니다.

"ipfs --version"을 사용해 설치가 제대로 되었는지 확인합니다.


## 저장소 복제

먼저 호스팅할 Git 저장소를 선택하고 복제합니다.

명령 실행: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


이제 IPFS을 통해 복제할 수 있도록 준비합니다.

cd zechub
git update-server-info


Git 객체를 압축 해제합니다.

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

이렇게 하면 나중에 Git 저장소를 업데이트하더라도 IPFS이 객체를 중복 제거할 수 있습니다.


## IPFS에 추가하기

이 작업을 마치면 저장소를 제공할 준비가 됩니다. 이제 IPFS에 추가하기만 하면 됩니다.

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

생성된 CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

잘됐습니다! 이제 저장소가 네트워크에 업로드되었습니다.


## IPFS을 사용해 복제하기

이제 다음 명령어로 GitHub 저장소를 가져올 수 있습니다.

git clone http://ipfs.io/ipfs/"yourCID"

또는 로컬 IPFS 노드로 검색하고 가져올 수 있습니다.

마지막 참고 사항: IPFS의 저장소 폴더는 실제 GitHub 저장소의 업데이트를 반영하지 않습니다. 정기적으로 폴더를 다시 업로드하는 것이 좋습니다.
