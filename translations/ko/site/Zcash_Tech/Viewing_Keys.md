<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 조회 키

실드 주소는 사용자가 Zcash 블록체인에서 가능한 한 적은 정보만 드러내면서 거래할 수 있게 해줍니다. 그렇다면 실드된 Zcash 거래와 관련된 민감한 정보를 특정 상대방에게 공개해야 할 때는 어떻게 될까요? 모든 실드 주소에는 조회 키가 포함되어 있습니다. 조회 키는 [ZIP 310](https://zips.z.cash/zip-0310)에서 도입되었고 Sapling 네트워크 업그레이드에서 프로토콜에 추가되었습니다. 조회 키는 사용자가 거래에 관한 정보를 선택적으로 공개할 수 있게 해주기 때문에 Zcash의 핵심적인 부분입니다.

### 왜 보기 키를 사용하나요?

사용자가 왜 굳이 이렇게 하려고 할까요? 이 문제에 관한 Electric Coin Co.의 블로그에서 말하길...

*- 거래소는 **spend authority** 키를 안전한 하드웨어에 유지한 채, 고객이 보호된 주소로 ZEC를 입금할 때 이를 감지하고자 할 수 있습니다. 거래소는 수신용 뷰잉 키를 생성해 인터넷에 연결된 **detection** 노드에 로드하고, 반면 지출 키는 더 안전한 시스템에 남겨둘 수 있습니다.*

*- 수탁기관은 감사인에게 자신의 Zcash 보유 내역에 대한 가시성을 제공해야 할 수 있습니다. 수탁기관은 각 실드 주소에 대해 전체 조회 키를 생성하여 해당 키를 감사인과 공유할 수 있습니다. 그러면 감사인은 해당 주소들의 잔액을 검증하고, 그 주소들로 들어오고 나간 과거 거래 활동을 검토할 수 있습니다.*

*- 거래소는 실드된 주소에서 입금하는 고객에 대해 고객확인 실사(due diligence) 검사를 수행해야 할 수 있습니다. 거래소는 이러한 강화된 실사 절차의 일환으로 고객의 실드된 주소에 대한 뷰잉 키를 요청하고, 이를 사용해 고객의 실드된 거래 활동을 검토할 수 있습니다.*

### 보는 키를 찾는 방법

#### zcashd

* *./zcash-cli listaddresses*를 사용하여 알려진 모든 주소를 나열합니다.

* 그런 다음 UA 또는 Sapling 실드 주소에 대해 다음 명령을 실행합니다

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* 오른쪽 상단 모서리에서 "Backup"을 선택하고, 휴대폰 인증을 완료한 다음, 표시되는 보기 키를 그대로 복사하세요.

### 뷰잉 키 사용 방법

#### zcashd

* 모든 vkey 또는 ukey와 함께 다음을 사용하세요:

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* 오른쪽 상단 모서리에서 "Account"를 선택한 다음, 오른쪽 하단 모서리에 있는 "+"를 클릭하여 보기 키를 추가 및 가져오고 '읽기 전용' 계정을 추가합니다.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* 브라우저를 [여기](https://zcashblockexplorer.com/vk)로 열고 결과가 나올 때까지 기다리세요! 참고: 이 결과는 이제 zcashblockexplorer 노드에서 제공되므로, 이 정보에 대해 zcashblockexplorer.com의 소유자를 신뢰하게 됩니다

### 자료

훌륭한 기술이지만, 뷰잉 키는 필요한 경우에 한해 사용하는 것이 권장됩니다.

뷰잉 키에 관한 이 튜토리얼을 확인해 보세요. 더 깊이 알아보고 싶다면 아래에 이 주제에 관한 자료 목록이 있습니다:

- [ECC, Viewing Key 설명하기](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, 선택적 공개와 Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key 비디오 프레젠테이션](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)