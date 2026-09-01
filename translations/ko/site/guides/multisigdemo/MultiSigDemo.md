# 멀티시그 데모

> **역사적 문서입니다. 이 안내는 더 이상 실행되지 않습니다.**
>
> 아래의 모든 단계는 `zcashd`에 의존하며, `zcashd`는 2026년 7월 18일 자동 지원 종료 중단에 도달했습니다. 이 페이지와 함께 제공된 7개의 스크립트는 `zcash-cli`를 통해 이를 구동하므로, 현재는 그 어느 것도 실행 중인 노드에 도달할 수 없습니다.
>
> 이 스크립트들은 기계적으로 포팅할 수 없습니다. 이들은 중단 전에 `zcashd`가 더 이상 사용하지 않도록 한 raw-transaction 및 wallet RPC(`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`)를 기반으로 구축되어 있습니다. Zallet는 이를 raw transaction hex가 아니라 PCZT에서 작동하는 새로운 메서드로 대체하며, 아직 베타 상태이고 많은 `zcashd` 메서드가 아직 포팅되지 않았습니다.
>
> 오늘날 Zcash에서 다자간 커스터디를 위해서는 [FROST 및 Threshold Custody](/zcash-tech/frost-threshold-custody)를 참고하세요. 여기에는 투명 멀티시그와의 직접 비교와 작동하는 [Ywallet FROST 데모](/guides/frostdemo/ywallet-frost-demo)가 포함되어 있습니다. 기존 노드를 `zcashd`에서 이전하려면 [Zebra 및 Zallet로의 마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참고하세요.
>
> 이 페이지는 투명 멀티시그 워크플로의 역사적 기록으로 보존됩니다.

이 데모는 `zcashd`가 필요하지만, `zcashd`는 2026년 7월 18일 중단되었으며 더 이상 실행되지 않습니다. 아래 내용은 어느 것도 라이브 체인에서 완료할 수 없습니다.

## 필요한 개인들로부터 공개 키 수집

* https://github.com/iancoleman/bip39
* `zcashd`를 사용하는 경우 UA를 생성하고 투명 수신자도 사용할 수 있습니다. 그런 다음 `getPubkey.sh`를 사용해 공개 키를 추출하세요.


## 2x 멀티시그(3명 중 2명) t3 주소 생성

멀티시그 주소와 리딤 스크립트를 생성하려면 createMultiSig.sh를 실행하세요. 필요한 것은 공개 키 3개입니다.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 첫 번째 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 거스름돈 주소용 두 번째 t3 

#### 참고: 이 예시에서는 pubk1,pubk4는 같은 사람이고, pubk2,pubk5도 같은 사람이며, 이하 동일합니다 ...

#### 참고2: 공개 키의 순서가 중요합니다! 이 점에 주의하세요!!!!


## t3 주소에 자금 입금

아무 지갑/수도꼭지(faucet)나 사용해 주소에 자금을 입금하세요.

## 멀티시그 트랜잭션 생성

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

여기서,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => 필요한 정보를 찾는 데 도움이 됩니다

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## 멀티시그 TX 서명

signMultiSigTX.sh를 열고 pk1,pk2, ... 변수에 개인 키를 추가하세요.
 

*** 터미널에 이것들을 직접 입력하는 것은 권장하지 않습니다. ***


모든 개인 키에 접근할 수 있다면 시간을 절약하기 위해 한 번에 모두 사용할 수 있습니다.
하지만 대부분의 실제 사례에서는 전 세계 각지의 사람들이 서명하게 되므로, 필요한 각 참여자가 서명한 뒤
서명 절차를 완료하기 위해 다른 사람들이 사용할 업데이트된 raxTX "hex" 출력을 다시 보내야 합니다.

첫 번째 tx를 만드는 사람은 자신의 개인 키로 서명한 뒤, 다른 참여자들이 서명해야 하는 업데이트된 rawTX hex를 전송하게 됩니다.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

이 tx에 서명하려면 세 개의 개인 키 중 최소 두 개가 서명해야 합니다. 제공한 공개 키가 `zcashd`의 T-address를 사용해 내보낸 것이라면, 다음과 같이 T 주소의 개인 키를 얻을 수 있습니다: 


`zcash-cli dumpprivkey "t-addr"`

이 명령은 `zcashd`와 함께 중단되었으며 오늘날에는 아무것도 반환하지 않습니다. 여기에는 데모가 키를 어떻게 얻었는지 보여주기 위한 기록으로만 남겨둡니다.


이 데모에서는 필요한 개인 키를 빠르게 분리하기 위해 iancoleman의 bip39를 사용했습니다.


## 서명된 TX 브로드캐스트

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 출처

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
